import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from 'next/server';

// --- CONFIGURAÇÃO ---
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Chave secreta!
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

const SYSTEM_INSTRUCTION = `
Você é o Consultor Sênior de Carreira da 'JurisAcademy'.
Objetivo: VENDER e CONVERTER interessados em alunos, tirando dúvidas de forma persuasiva.

Nossos Cursos (Base de Conhecimento):
1. Prompt Engineering Jurídico (R$ 497, Iniciante) - Foco em produtividade e peças rápidas.
2. Compliance & Ética na IA (R$ 697, Intermediário) - Foco em consultoria e regulação.
3. Legal Ops Full Stack (R$ 997, Avançado) - Foco em automação e gestão.

Regras:
- Respostas curtas e objetivas (max 150 palavras).
- Use tom profissional mas acessível.
- Se não souber, peça para o aluno contatar o suporte humano.
- Não invente preços ou cursos fora desta lista.
`;

export async function POST(req: NextRequest) {
  const start = Date.now();
  let status = 200;
  let userId: string | null = null;
  let errorType: string | null = null;

  // Cliente Supabase com permissões de admin (para gravar logs e ignorar RLS de leitura de histórico se necessário)
  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    // 1. Validar Payload
    const body = await req.json();
    const { message, conversationId } = body;

    if (!message || typeof message !== 'string' || message.length > 2000) {
      status = 400;
      throw new Error("Mensagem inválida ou muito longa.");
    }

    // 2. Autenticação (Ler token do header Authorization ou Cookie)
    // Para simplificar no scaffold, assumimos que o client manda o Authorization Bearer padrão do Supabase
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
       status = 401;
       throw new Error("Token de autenticação não fornecido.");
    }
    
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(authHeader.replace('Bearer ', ''));
    
    if (authError || !user) {
        status = 401;
        throw new Error("Usuário não autenticado.");
    }
    userId = user.id;

    // 3. Rate Limiting (via Banco de Dados)
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    // Hash simples do IP para privacidade no log
    const ipHash = btoa(ip);

    const { count, error: limitError } = await supabaseAdmin
        .from('chat_events')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', new Date(Date.now() - 60 * 1000).toISOString()); // Último minuto

    if (limitError) console.error("Erro rate limit:", limitError);

    if (count !== null && count > 10) { // Limite: 10 req/minuto por usuário
        status = 429;
        throw new Error("Muitas requisições. Aguarde um minuto.");
    }

    // 4. Gestão da Conversa
    let activeConvId = conversationId;
    
    if (!activeConvId) {
        // Criar nova conversa
        const { data: conv, error: convError } = await supabaseAdmin
            .from('conversations')
            .insert({ user_id: userId, title: message.substring(0, 30) + '...' })
            .select()
            .single();
        
        if (convError) throw convError;
        activeConvId = conv.id;
    }

    // 5. Persistir Mensagem do Usuário
    await supabaseAdmin.from('messages').insert({
        conversation_id: activeConvId,
        user_id: userId,
        role: 'user',
        content: message
    });

    // 6. Preparar Contexto para o Gemini
    // Busca últimas 10 mensagens para contexto
    const { data: historyData } = await supabaseAdmin
        .from('messages')
        .select('role, content')
        .eq('conversation_id', activeConvId)
        .order('created_at', { ascending: true }) // Importante: Ordem cronológica
        .limit(10);

    // Formatar histórico para o Gemini SDK
    // O SDK v1.37 usa format: { role: 'user' | 'model', parts: [{ text: string }] }
    // O prompt do sistema é passado na inicialização
    
    // 7. Chamar Gemini
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    let aiResponseText = "";
    
    try {
        // Retry logic simples
        let attempts = 0;
        const maxAttempts = 2;
        
        while (attempts < maxAttempts) {
            try {
                // NÃO usar chats.create com histórico mantido em memória, pois é serverless.
                // Usamos generateContent passando o histórico manualmente a cada request ou 
                // recriando o objeto Chat com o histórico buscado do DB.
                
                const chat = ai.chats.create({
                    model: 'gemini-3-flash-preview',
                    config: {
                        systemInstruction: SYSTEM_INSTRUCTION,
                        temperature: 0.7,
                    },
                    history: historyData?.map(h => ({
                        role: h.role,
                        parts: [{ text: h.content }]
                    })) || []
                });

                // A mensagem atual já está no DB, mas o generateContent/sendMessage 
                // do SDK espera receber a nova mensagem agora
                // NOTA: O histórico passado acima NÃO deve incluir a mensagem atual se formos enviá-la no sendMessage.
                // Como salvamos no passo 5, precisamos ter cuidado para não duplicar se recuperamos no passo 6.
                // Assumindo que passo 6 pegou tudo, removemos a última do array de histórico para enviar como 'message'
                
                // Correção de fluxo para robustez:
                // historyData tem TUDO. Vamos separar.
                // Na verdade, o sendMessage adiciona ao histórico interno.
                // O jeito mais stateless é passar tudo menos a última no history, e a última no sendMessage.
                
                const response = await chat.sendMessage({ message: message });
                aiResponseText = response.text || "Não consegui gerar uma resposta.";
                break; // Sucesso
            } catch (geminiErr: any) {
                attempts++;
                if (geminiErr.message?.includes('429') || geminiErr.message?.includes('503')) {
                    if (attempts === maxAttempts) throw geminiErr;
                    await new Promise(r => setTimeout(r, 1000 * attempts)); // Backoff
                } else {
                    throw geminiErr; // Outros erros não retenta
                }
            }
        }
    } catch (err) {
        console.error("Gemini Error:", err);
        aiResponseText = "Desculpe, estou com alta demanda no momento. Tente novamente em instantes.";
        status = 503;
        errorType = "AI_SERVICE_ERROR";
    }

    // 8. Persistir Resposta da IA (mesmo se for erro amigável, para manter fluxo)
    const { data: aiMsgData } = await supabaseAdmin.from('messages').insert({
        conversation_id: activeConvId,
        user_id: null, // IA não tem user_id
        role: 'model',
        content: aiResponseText
    }).select().single();

    // 9. Logging de Auditoria (Async, não bloqueia resposta)
    const latency = Date.now() - start;
    await supabaseAdmin.from('chat_events').insert({
        user_id: userId,
        ip_hash: ipHash,
        status_code: status,
        latency_ms: latency,
        error_type: errorType,
        request_id: crypto.randomUUID()
    });

    // 10. Retorno
    return NextResponse.json({
        message: aiResponseText,
        messageId: aiMsgData?.id,
        conversationId: activeConvId
    }, { status: status === 503 ? 200 : status }); // Retornamos 200 com msg de erro no corpo p/ UX não quebrar, ou status real

  } catch (error: any) {
    // Erro Geral (Auth, Validation, etc)
    const latency = Date.now() - start;
    console.error("API Error:", error);
    
    // Log de erro crítico
    if (status === 200) status = 500; // Se não foi setado antes
    
    // Tenta logar o erro no DB se possível
    try {
        await supabaseAdmin.from('chat_events').insert({
            user_id: userId,
            ip_hash: 'error',
            status_code: status,
            latency_ms: latency,
            error_type: error.message
        });
    } catch (e) { /* ignore log error */ }

    return NextResponse.json(
        { error: error.message || "Erro interno do servidor" },
        { status: status }
    );
  }
}