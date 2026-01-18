import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Lock, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';
import { supabase } from '../services/supabaseClient';
import { Button } from './Button';

export const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'Olá! Sou a IA da JurisAcademy. Tem dúvidas sobre qual curso escolher para alavancar sua carreira jurídica?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Verificar sessão ao montar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (!session) {
        setConversationId(null);
        // Resetar para mensagem inicial se deslogar
        setMessages([{
            id: 'welcome',
            role: 'model',
            content: 'Olá! Sou a IA da JurisAcademy. Faça login para receber uma consultoria personalizada.'
        }]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    if (!isAuthenticated) {
        // Fallback visual caso o botão não esteja desabilitado
        alert("Por favor, faça login para usar o assistente.");
        return;
    }

    const userText = input;
    const tempId = Date.now().toString();
    
    // Optimistic Update
    const userMessage: ChatMessage = {
      id: tempId,
      role: 'user',
      content: userText
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Em um app Next.js real, os cookies de sessão do Supabase vão automaticamente.
          // Se for client-side puro chamando Edge Function, precisaria do Bearer token.
        },
        body: JSON.stringify({
          message: userText,
          conversationId: conversationId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ${response.status}`);
      }

      const data = await response.json();
      
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      const botMessage: ChatMessage = {
        id: data.messageId,
        role: 'model',
        content: data.message
      };
      
      setMessages(prev => [...prev, botMessage]);

    } catch (error: any) {
      console.error("Erro no chat:", error);
      
      let errorMsg = "Ocorreu um erro inesperado. Tente novamente.";
      if (error.message.includes("429")) errorMsg = "Você enviou muitas mensagens. Aguarde um momento.";
      if (error.message.includes("401")) errorMsg = "Sessão expirada. Faça login novamente.";
      
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'model',
        content: `⚠️ ${errorMsg}`
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isAuthenticated) {
    return (
        <div className="bg-gradient-to-br from-juris-900 to-juris-800 rounded-2xl shadow-2xl overflow-hidden border border-juris-700 flex flex-col h-[600px] w-full max-w-4xl mx-auto items-center justify-center text-center p-8">
            <div className="bg-juris-700 p-4 rounded-full mb-6">
                <Lock className="w-12 h-12 text-juris-gold" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Acesso Exclusivo</h3>
            <p className="text-gray-400 mb-8 max-w-md">
                Para receber orientações personalizadas da nossa IA sobre sua carreira jurídica, é necessário estar logado.
            </p>
            <Button 
                variant="secondary" 
                onClick={() => {
                  const navBtn = document.querySelector('nav button:last-child') as HTMLElement;
                  if (navBtn) {
                    navBtn.click();
                  } else {
                    alert("Use o botão 'Área do Aluno' no topo para entrar.");
                  }
                }}
            >
                Fazer Login / Cadastrar
            </Button>
        </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-juris-900 to-juris-800 rounded-2xl shadow-2xl overflow-hidden border border-juris-700 flex flex-col h-[600px] w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-juris-900/50 p-6 border-b border-juris-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-juris-accent p-2 rounded-lg relative">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Juris Assistant</h3>
            <p className="text-gray-400 text-xs flex items-center">
              IA Especialista em Carreira Jurídica
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <span className="text-juris-gold/80 text-xs uppercase tracking-widest font-bold border border-juris-gold/20 px-3 py-1 rounded-full">
            Beta
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-juris-800/30">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-juris-700 flex items-center justify-center mr-3 flex-shrink-0 border border-juris-600 shadow-sm mt-1">
                <Sparkles className="w-4 h-4 text-juris-gold" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-juris-accent text-white rounded-br-none'
                  : 'bg-white text-juris-900 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-juris-600 flex items-center justify-center ml-3 flex-shrink-0 border border-juris-500 mt-1">
                <User className="w-4 h-4 text-gray-300" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start animate-pulse">
            <div className="w-8 h-8 rounded-full bg-juris-700 flex items-center justify-center mr-3 border border-juris-600">
              <Sparkles className="w-4 h-4 text-juris-gold" />
            </div>
            <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-none flex space-x-1 items-center">
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
               <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-juris-900 border-t border-juris-700">
        <div className="relative flex items-center max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ex: Como posso usar IA em contratos?"
            className="w-full bg-juris-800 text-white placeholder-gray-500 border border-juris-700 rounded-xl pl-5 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-juris-accent focus:border-transparent shadow-inner transition-all"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2.5 bg-juris-accent text-white rounded-lg hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-juris-accent transition-all transform active:scale-95"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-center text-xs text-gray-600 mt-3">
            A IA pode cometer erros. Verifique informações importantes.
        </p>
      </div>
    </div>
  );
};