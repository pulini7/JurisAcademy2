import { GoogleGenAI, Chat } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Você é o Consultor Sênior de Carreira da 'JurisAcademy', a maior escola de Direito e IA do Brasil.
Seu objetivo NÃO é apenas responder, é VENDER e CONVERTER interessados em alunos.

Nossos Diferenciais:
- Foco prático: Ensinamos a advogar, não a programar.
- Garantia de 7 dias.
- Certificado Válido.

Cursos (Use esses dados para recomendar):
1. Prompt Engineering Jurídico (Iniciante - R$ 497) -> Para quem quer escrever peças 10x mais rápido.
2. Compliance & Ética na Era da IA (Intermediário - R$ 697) -> Para quem quer consultoria e evitar riscos.
3. Legal Ops & Automação Full Stack (Avançado - R$ 997) -> Para quem quer criar 'fábricas de peças' e escalar escritório.

Técnicas de Venda para usar:
- Use Gatilhos de Urgência ("O mercado não espera").
- Quebre objeções (ex: "é difícil?", "não tenho tempo?").
- Termine sempre com uma pergunta ou chamada para ação (CTA).
- Seja empático, mas firme sobre a necessidade de modernização.
- Responda de forma curta (max 3 parágrafos), elegante e persuasiva.
`;

export class ChatService {
  private chat: Chat | null = null;
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  startChat() {
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.chat) {
      this.startChat();
    }

    try {
      const response = await this.chat!.sendMessage({ message });
      return response.text || "Desculpe, não consegui formular uma resposta no momento.";
    } catch (error) {
      console.error("Erro na comunicação com Gemini:", error);
      throw error;
    }
  }
}

export const chatService = new ChatService();
