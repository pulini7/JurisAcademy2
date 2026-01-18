import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { chatService } from '../services/geminiService';
import { Button } from './Button';

export const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá! Sou a IA da JurisAcademy. Tem dúvidas sobre qual curso escolher para alavancar sua carreira jurídica?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Inicializa o chat sempre que o componente é montado para garantir sessão limpa
  useEffect(() => {
    chatService.startChat();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await chatService.sendMessage(userText);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Estou enfrentando uma instabilidade momentânea. Por favor, tente novamente em alguns instantes."
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

  return (
    <div className="bg-gradient-to-br from-juris-900 to-juris-800 rounded-2xl shadow-2xl overflow-hidden border border-juris-700 flex flex-col h-[600px] w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-juris-900/50 p-6 border-b border-juris-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-juris-accent p-2 rounded-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Juris Assistant</h3>
            <p className="text-juris-accent text-sm flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Online - Powered by Gemini
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <span className="text-gray-400 text-sm bg-juris-800 px-3 py-1 rounded-full border border-juris-700">
            Tire dúvidas sobre os cursos
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-juris-800/30">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-full bg-juris-700 flex items-center justify-center mr-3 flex-shrink-0 border border-juris-600">
                <Sparkles className="w-4 h-4 text-juris-gold" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-juris-accent text-white rounded-br-none'
                  : 'bg-white text-juris-900 rounded-bl-none shadow-md'
              }`}
            >
              {msg.text}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-juris-600 flex items-center justify-center ml-3 flex-shrink-0">
                <User className="w-4 h-4 text-gray-300" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-juris-700 flex items-center justify-center mr-3 border border-juris-600">
              <Sparkles className="w-4 h-4 text-juris-gold" />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-md">
              <Loader2 className="w-5 h-5 text-juris-accent animate-spin" />
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
            placeholder="Ex: Qual curso é melhor para contratos?"
            className="w-full bg-juris-800 text-white placeholder-gray-400 border border-juris-700 rounded-xl pl-4 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-juris-accent focus:border-transparent shadow-inner"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-juris-accent text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-juris-accent transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};