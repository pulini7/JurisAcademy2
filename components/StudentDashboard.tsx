import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Play, Clock, Award, LogOut, Search, Gift, Sparkles, Zap, TrendingUp, Calendar, Download } from 'lucide-react';
import { Skeleton } from './Skeleton';

interface DashboardProps {
  onLogout: () => void;
  onSelectCourse: (courseId: string) => void;
}

export const StudentDashboard: React.FC<DashboardProps> = ({ onLogout, onSelectCourse }) => {
  const { session, courses, isLoading, setView, setSelectedCourseId } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra cursos (Simulado)
  const filteredCourses = courses.filter(c => 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseClick = (id: string) => {
    setSelectedCourseId(id);
    setView('player');
  };
  
  const handleDownloadCertificate = () => {
      alert("Gerando certificado em PDF... (Simulação)");
  };

  // Mock Data para Gamificação
  const weeklyActivity = [35, 60, 20, 85, 45, 10, 0]; // % de meta diária
  const currentDay = 4; // Quinta-feira (0-6)

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-juris-900 tracking-tight cursor-pointer" onClick={() => setView('landing')}>Juris<span className="text-juris-gold">Academy</span></span>
              <span className="ml-3 px-2 py-0.5 rounded text-xs font-semibold bg-juris-100 text-juris-800 uppercase hidden sm:inline-block">Área do Aluno</span>
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Buscar aulas, cursos ou documentos..." 
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:border-juris-accent focus:ring-0 rounded-lg transition-colors text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex items-center space-x-4">
               <button 
                  onClick={() => setView('playground')}
                  className="hidden md:flex items-center space-x-1 text-sm text-juris-accent font-medium hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100"
               >
                  <Sparkles className="w-4 h-4" />
                  <span>AI Playground</span>
               </button>

              <div className="flex items-center space-x-2 border-l pl-4 border-gray-200">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-juris-900 to-juris-700 text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {session?.user?.email?.[0].toUpperCase() || 'D'}
                 </div>
                 <div className="hidden md:flex flex-col">
                    <span className="text-sm font-medium text-gray-700 leading-none">
                        {session?.user?.user_metadata?.name || 'Doutor(a)'}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">Plano Pro</span>
                 </div>
              </div>
              <button onClick={onLogout} className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-gray-100" title="Sair">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome & Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Welcome */}
            <div className="lg:col-span-2">
                <h1 className="text-2xl font-bold text-juris-900 mb-1">
                    {isLoading ? <Skeleton className="w-64 h-8" /> : `Olá, ${session?.user?.user_metadata?.name || 'Doutor(a)'}.`}
                </h1>
                <p className="text-gray-500 mb-6">Você está a 2 aulas de concluir seu módulo atual.</p>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <Zap className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Ofensiva</p>
                            <p className="text-xl font-bold text-juris-900">4 Dias</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Horas Estudo</p>
                            <p className="text-xl font-bold text-juris-900">12.5h</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Nível</p>
                            <p className="text-xl font-bold text-juris-900">Júnior II</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Weekly Activity Chart (Visual Only) */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" /> Atividade Semanal
                    </h3>
                    <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">+12% vs. semana passada</span>
                </div>
                <div className="flex items-end justify-between h-24 gap-2">
                    {weeklyActivity.map((height, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1 w-full group cursor-pointer">
                            <div className="relative w-full flex justify-center">
                                <div 
                                    className={`w-full max-w-[12px] rounded-t-sm transition-all duration-500 ${idx === currentDay ? 'bg-juris-accent' : 'bg-gray-100 group-hover:bg-juris-accent/50'}`}
                                    style={{ height: `${height}%` }}
                                ></div>
                                {/* Tooltip */}
                                <div className="absolute -top-8 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {height}% Meta
                                </div>
                            </div>
                            <span className={`text-[10px] ${idx === currentDay ? 'font-bold text-juris-900' : 'text-gray-400'}`}>
                                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][idx]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="mb-6 flex justify-between items-end">
            <div>
                <h2 className="text-lg font-bold text-juris-900">Continuar Estudando</h2>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
             // Skeletons Loading State
             [1,2,3].map(i => (
                 <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[350px]">
                     <Skeleton className="w-full h-48 rounded-none" />
                     <div className="p-5 space-y-3">
                         <Skeleton className="w-3/4 h-6" />
                         <Skeleton className="w-1/2 h-4" />
                         <Skeleton className="w-full h-10 mt-4 rounded-lg" />
                     </div>
                 </div>
             ))
          ) : (
             <>
                {filteredCourses.slice(0, 2).map((course) => (
                    <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                    <div className="relative h-48">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => handleCourseClick(course.id)}
                                className="bg-white text-juris-900 rounded-full p-3 transform hover:scale-110 transition-transform shadow-xl"
                            >
                                <Play className="w-6 h-6 fill-current" />
                            </button>
                        </div>
                        {/* Progress Bar overlay */}
                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-700/30 backdrop-blur-sm">
                            <div className="h-full bg-gradient-to-r from-green-400 to-green-600 w-[35%] shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                        </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-juris-900 line-clamp-2 leading-tight">{course.title}</h3>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-6 mt-2">
                        <div className="flex items-center">
                            <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                            12/40h assistidas
                        </div>
                        <div className="flex items-center">
                            <Award className="w-3.5 h-3.5 mr-1.5 text-juris-gold" />
                            35% Concluído
                        </div>
                        </div>

                        <button 
                            onClick={() => handleCourseClick(course.id)}
                            className="mt-auto w-full py-2.5 bg-white border border-juris-accent text-juris-accent rounded-lg text-sm font-semibold hover:bg-juris-accent hover:text-white transition-all active:scale-95"
                        >
                            Continuar
                        </button>
                    </div>
                    </div>
                ))}
            </>
          )}
          
          {/* Certificate Card (Sugestão Aplicada) */}
          {!isLoading && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-2 opacity-50">
                    <Award className="w-12 h-12 text-gray-100" />
                 </div>
                 <div className="bg-green-50 p-3 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <Award className="w-8 h-8 text-green-600" />
                 </div>
                 <h3 className="font-bold text-juris-900 mb-2">Certificado Disponível</h3>
                 <p className="text-gray-500 text-xs mb-4">Você concluiu "Introdução à IA". Baixe seu certificado.</p>
                 <button onClick={handleDownloadCertificate} className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Download className="w-3 h-3" /> Baixar PDF
                 </button>
              </div>
          )}

          {/* Referral Card (#18) */}
          {!isLoading && (
              <div className="bg-gradient-to-br from-juris-900 to-juris-800 rounded-xl shadow-lg border border-juris-700 p-6 text-white flex flex-col justify-between relative overflow-hidden group">
                 <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-juris-gold/10 rounded-full blur-3xl group-hover:bg-juris-gold/20 transition-colors"></div>
                 <div>
                    <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                        <Gift className="w-6 h-6 text-juris-gold" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Indique e Ganhe</h3>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed">Traga um colega advogado para a JurisAcademy e ganhe <span className="text-juris-gold font-bold">R$ 100</span> em créditos na próxima mensalidade.</p>
                 </div>
                 <button className="w-full py-2.5 bg-juris-gold text-juris-900 hover:bg-yellow-400 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20">
                    Copiar Link de Indicação
                 </button>
              </div>
          )}

          {/* Explore Card */}
          {!isLoading && (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 text-center hover:bg-white hover:border-juris-accent/50 transition-all cursor-pointer group" onClick={() => window.open('#courses', '_self')}>
                <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Search className="w-6 h-6 text-gray-400 group-hover:text-juris-accent" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-juris-accent transition-colors">Explorar Catálogo</h3>
                <p className="text-xs text-gray-500 mt-2 max-w-[200px]">Conheça novos cursos de Compliance, LGPD e Gestão Legal.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};