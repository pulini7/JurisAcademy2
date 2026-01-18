import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from './Button';
import { FileText, Sparkles, AlertTriangle, ArrowLeft, Loader2 } from 'lucide-react';

export const Playground: React.FC = () => {
  const { setView } = useApp();
  const [contractText, setContractText] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!contractText.trim()) return;
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: `Analise o seguinte texto jurídico e identifique riscos, cláusulas abusivas ou oportunidades de melhoria. Seja técnico mas direto: \n\n${contractText.substring(0, 3000)}`
            })
        });
        
        const data = await response.json();
        setAnalysis(data.message);
    } catch (err) {
        setAnalysis("Erro ao analisar contrato. Tente novamente.");
    } finally {
        setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
         <div className="flex items-center gap-4">
            <button onClick={() => setView('dashboard')} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
                <h1 className="text-xl font-bold text-juris-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-juris-gold" />
                    Contract AI Playground
                </h1>
            </div>
         </div>
         <div className="text-xs text-gray-500 bg-yellow-100 px-3 py-1 rounded-full border border-yellow-200 font-medium">
            Ambiente Seguro (Anonimizado)
         </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-80px)]">
         {/* Input Area */}
         <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Texto do Contrato
                </span>
                <button className="text-xs text-juris-accent hover:underline" onClick={() => setContractText("CLÁUSULA 1. O pagamento será feito apenas se o CONTRATADO atingir 150% da meta, caso contrário haverá multa de 50% do valor do contrato em favor da CONTRATANTE.")}>
                    Inserir Exemplo
                </button>
            </div>
            <textarea 
                className="flex-1 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-juris-accent/20 font-mono text-sm"
                placeholder="Cole aqui a cláusula ou contrato que deseja analisar..."
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
            />
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <Button 
                    className="w-full" 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing || !contractText.trim()}
                >
                    {isAnalyzing ? <><Loader2 className="w-4 h-4 animate-spin mr-2"/> Analisando...</> : <><Sparkles className="w-4 h-4 mr-2"/> Analisar Riscos</>}
                </Button>
            </div>
         </div>

         {/* Output Area */}
         <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
            <div className="bg-juris-900 px-4 py-3 border-b border-juris-800">
                <span className="text-sm font-semibold text-white flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-juris-gold" /> Análise de Riscos
                </span>
            </div>
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50/50">
                {analysis ? (
                    <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {analysis}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                        <Sparkles className="w-16 h-16 mb-4" />
                        <p>A análise da IA aparecerá aqui</p>
                    </div>
                )}
            </div>
         </div>
      </div>
    </div>
  );
};