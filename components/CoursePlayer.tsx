import React, { useState, useEffect } from 'react';
import { Course, ModuleData, Lesson } from '../types';
import { ChevronLeft, CheckCircle, Circle, PlayCircle, FileText, Menu, Download, X } from 'lucide-react';

interface CoursePlayerProps {
  course: Course;
  onBack: () => void;
}

// Dados mockados para o player (seriam vindos do DB em produção)
const MOCK_MODULES: ModuleData[] = [
  {
    title: 'Módulo 1: Fundamentos',
    lessons: [
      { id: 'l1', title: 'Boas vindas e Visão Geral', duration: '05:20', type: 'video', completed: true },
      { id: 'l2', title: 'O Cenário Atual da Advocacia', duration: '12:45', type: 'video', completed: true },
      { id: 'l3', title: 'Material de Apoio (PDF)', duration: '5 min', type: 'text', completed: false },
    ]
  },
  {
    title: 'Módulo 2: Engenharia de Prompts',
    lessons: [
      { id: 'l4', title: 'Estrutura de um Prompt Jurídico', duration: '15:30', type: 'video', completed: false },
      { id: 'l5', title: 'Evitando Alucinações', duration: '18:10', type: 'video', completed: false },
      { id: 'l6', title: 'Quiz Prático', duration: '10 min', type: 'quiz', completed: false },
    ]
  }
];

export const CoursePlayer: React.FC<CoursePlayerProps> = ({ course, onBack }) => {
  const [activeLesson, setActiveLesson] = useState<Lesson>(MOCK_MODULES[0].lessons[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Inicializar estado da sidebar baseado na largura da tela (Client-side only)
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setSidebarOpen(true);
    }
    
    const handleResize = () => {
       if (window.innerWidth >= 768) {
         setSidebarOpen(true);
       } else {
         setSidebarOpen(false);
       }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLessonClick = (lesson: Lesson) => {
      setActiveLesson(lesson);
      // Fecha a sidebar automaticamente no mobile ao selecionar uma aula
      if (window.innerWidth < 768) {
          setSidebarOpen(false);
      }
  };

  return (
    <div className="h-screen flex flex-col bg-juris-900 text-white overflow-hidden">
      {/* Top Bar */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-juris-800 bg-juris-900 shrink-0 z-30 relative shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-juris-800 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="overflow-hidden">
            <h1 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Curso</h1>
            <p className="text-white font-semibold truncate max-w-[200px] md:max-w-md">{course.title}</p>
          </div>
        </div>
        
        {/* Mobile Sidebar Toggle Button */}
        <button 
            onClick={() => setSidebarOpen(true)}
            className="md:hidden flex items-center gap-2 px-3 py-1.5 bg-juris-800 rounded-lg text-sm font-medium hover:bg-juris-700 transition-colors border border-juris-700"
        >
            <span>Aulas</span>
            <Menu className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-black relative z-0">
           {activeLesson.type === 'video' ? (
             <div className="flex-1 flex items-center justify-center bg-zinc-900">
                {/* Simulação de Player */}
                <div className="text-center p-4">
                   <div className="w-20 h-20 rounded-full bg-juris-accent/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <PlayCircle className="w-10 h-10 text-juris-accent" />
                   </div>
                   <p className="text-gray-400 font-mono text-sm md:text-base">Simulação de Vídeo: {activeLesson.title}</p>
                </div>
             </div>
           ) : (
             <div className="flex-1 flex items-center justify-center bg-white text-juris-900 p-8">
                <div className="max-w-2xl text-center">
                    <FileText className="w-16 h-16 text-juris-900 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4">{activeLesson.title}</h2>
                    <p className="mb-6">Este é um conteúdo de leitura ou exercício prático.</p>
                    <button className="flex items-center mx-auto gap-2 px-6 py-3 bg-juris-900 text-white rounded hover:bg-juris-800 transition-colors">
                        <Download className="w-4 h-4" /> Baixar Material
                    </button>
                </div>
             </div>
           )}
           
           {/* Lesson Navigation Footer */}
           <div className="h-16 bg-juris-900 border-t border-juris-800 flex items-center justify-between px-4 md:px-6 shrink-0">
                <button className="text-sm text-gray-400 hover:text-white">Anterior</button>
                <button className="px-4 md:px-6 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition-colors text-sm md:text-base">
                    Concluir Aula
                </button>
                <button className="text-sm text-gray-400 hover:text-white">Próxima</button>
           </div>
        </div>

        {/* Mobile Backdrop Overlay */}
        <div 
            className={`md:hidden absolute inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar Curriculum */}
        <div className={`
            bg-juris-900 border-l border-juris-800 flex flex-col
            transition-all duration-300 ease-in-out
            
            /* Mobile Layout (Slide Over) */
            fixed top-0 right-0 h-full z-50
            w-80 shadow-2xl
            ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}

            /* Desktop Layout (Flow) */
            md:relative md:shadow-none md:translate-x-0 md:z-auto
            ${sidebarOpen ? 'md:w-80' : 'md:w-0 md:border-l-0 md:overflow-hidden'}
        `}>
           <div className="p-4 border-b border-juris-800 bg-juris-800/50 flex items-center justify-between h-16 shrink-0">
              <div>
                  <h3 className="font-bold text-sm text-gray-300 uppercase">Conteúdo</h3>
                  <div className="flex items-center gap-2 mt-1">
                      <div className="h-1 w-20 bg-juris-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[15%]"></div>
                      </div>
                      <span className="text-xs text-gray-500">15%</span>
                  </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 text-gray-400 hover:text-white rounded-full hover:bg-juris-700 transition-colors">
                  <X className="w-5 h-5" />
              </button>
           </div>
           
           <div className="flex-1 overflow-y-auto">
              {MOCK_MODULES.map((module, mIdx) => (
                  <div key={mIdx} className="border-b border-juris-800">
                      <div className="px-4 py-3 bg-juris-900 font-semibold text-sm text-gray-200">
                          {module.title}
                      </div>
                      <ul>
                          {module.lessons.map((lesson) => (
                              <li key={lesson.id}>
                                  <button 
                                    onClick={() => handleLessonClick(lesson)}
                                    className={`w-full flex items-start text-left gap-3 px-4 py-3 hover:bg-juris-800 transition-colors border-l-2 ${activeLesson.id === lesson.id ? 'bg-juris-800 border-juris-accent' : 'border-transparent'}`}
                                  >
                                      <div className="mt-0.5 shrink-0">
                                        {lesson.completed ? (
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <Circle className="w-4 h-4 text-gray-600" />
                                        )}
                                      </div>
                                      <div>
                                          <span className={`text-sm block leading-tight mb-1 ${activeLesson.id === lesson.id ? 'text-white' : 'text-gray-400'}`}>
                                              {lesson.title}
                                          </span>
                                          <span className="text-xs text-gray-600 flex items-center gap-1">
                                              {lesson.type === 'video' ? <PlayCircle className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                                              {lesson.duration}
                                          </span>
                                      </div>
                                  </button>
                              </li>
                          ))}
                      </ul>
                  </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};