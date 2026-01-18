import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Button } from './Button';
import { Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
  onBack: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Cadastro realizado! Verifique seu e-mail.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onLogin();
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    // Simula um login para fins de preview
    localStorage.setItem('juris_demo_user', 'true');
    onLogin();
  };

  return (
    <div className="min-h-screen bg-juris-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
        <button 
            onClick={onBack}
            className="absolute top-4 left-4 text-gray-400 hover:text-juris-900 transition-colors"
        >
            <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-juris-900 mb-2">
              {isSignUp ? 'Criar Conta' : 'Área do Aluno'}
            </h2>
            <p className="text-gray-500">
              {isSignUp ? 'Junte-se à elite do Direito Digital' : 'Bem-vindo de volta, Doutor(a).'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-juris-accent focus:border-transparent outline-none transition-all"
                  placeholder="seu@escritorio.com.br"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-juris-accent focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full py-4 text-lg" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : (isSignUp ? 'Cadastrar' : 'Entrar')}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {isSignUp ? 'Já tem conta? ' : 'Ainda não é aluno? '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-juris-accent font-semibold hover:underline"
            >
              {isSignUp ? 'Fazer Login' : 'Matricule-se'}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
             <button 
               onClick={handleDemoLogin}
               className="w-full py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors text-sm font-medium"
             >
               Versão Demo (Visualizar Dashboard)
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};