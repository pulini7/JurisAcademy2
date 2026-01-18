import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Play, Clock, Award, LogOut, Search, Gift, Sparkles } from 'lucide-react';
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
                  className="hidden md:flex items-center space-x-1 text-sm text-juris-accent font-medium hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full"
               >
                  <Sparkles className="w-4 h-4" />
                  <span>AI Playground</span>
               </button>

              <div className="flex items-center space-x-2">
                 <div className="w-8 h-8 rounded-full bg-juris-900 text-white flex items-center justify-center font-bold text-sm">
                    {session?.user?.email?.[0].toUpperCase() || 'D'}
                 </div>
                 <span className="text-sm font-medium text-gray-700 hidden md:block">
                     {session?.user?.user_metadata?.name || 'Doutor(a)'}
                 </span>
              </div>
              <button onClick={onLogout} className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Sair">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Banner */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-juris-900">
             {isLoading ? <Skeleton className="w-64 h-8" /> : 'Meus Cursos'}
          </h1>
          <p className="text-gray-500">Continue sua jornada de especialização.</p>
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
                    <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                    <div className="relative h-48">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => handleCourseClick(course.id)}
                                className="bg-white text-juris-900 rounded-full p-3 transform hover:scale-110 transition-transform"
                            >
                                <Play className="w-6 h-6 fill-current" />
                            </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                            <div className="h-full bg-green-500 w-[35%]"></div>
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-juris-900 line-clamp-2 h-12">{course.title}</h3>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                        <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            12/40h assistidas
                        </div>
                        <div className="flex items-center">
                            <Award className="w-3 h-3 mr-1" />
                            Progresso: 35%
                        </div>
                        </div>

                        <button 
                            onClick={() => handleCourseClick(course.id)}
                            className="w-full py-2 bg-juris-accent text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Continuar Assistindo
                        </button>
                    </div>
                    </div>
                ))}
            </>
          )}

          {/* Referral Card (#18) */}
          {!isLoading && (
              <div className="bg-gradient-to-br from-juris-900 to-juris-800 rounded-xl shadow-sm border border-juris-700 p-6 text-white flex flex-col justify-between relative overflow-hidden group">
                 <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-juris-gold/20 rounded-full blur-2xl group-hover:bg-juris-gold/30 transition-colors"></div>
                 <div>
                    <div className="bg-juris-gold/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                        <Gift className="w-6 h-6 text-juris-gold" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Indique e Ganhe</h3>
                    <p className="text-gray-300 text-sm mb-4">Traga um colega advogado para a JurisAcademy e ganhe <span className="text-juris-gold font-bold">R$ 100</span> em créditos.</p>
                 </div>
                 <button className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                    Copiar Link de Indicação
                 </button>
              </div>
          )}

          {/* Explore Card */}
          {!isLoading && (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 text-center hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => window.open('#courses', '_self')}>
                <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                    <span className="text-2xl font-light text-gray-400">+</span>
                </div>
                <h3 className="font-semibold text-gray-900">Explorar Catálogo</h3>
                <p className="text-xs text-gray-500 mt-1">Conheça novos cursos para sua carreira</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};