import React, { useState } from 'react';
import { Course, ModuleData, Lesson } from '../types';
import { ChevronLeft, CheckCircle, Circle, PlayCircle, FileText, Menu, Download } from 'lucide-react';

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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-juris-900 text-white overflow-hidden">
      {/* Top Bar */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-juris-800 bg-juris-900 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-juris-800 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Curso</h1>
            <p className="text-white font-semibold truncate max-w-md">{course.title}</p>
          </div>
        </div>
        <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-juris-800 rounded"
        >
            <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-black relative">
           {activeLesson.type === 'video' ? (
             <div className="flex-1 flex items-center justify-center bg-zinc-900">
                {/* Simulação de Player */}
                <div className="text-center">
                   <div className="w-20 h-20 rounded-full bg-juris-accent/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <PlayCircle className="w-10 h-10 text-juris-accent" />
                   </div>
                   <p className="text-gray-400 font-mono">Simulação de Vídeo: {activeLesson.title}</p>
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
           <div className="h-16 bg-juris-900 border-t border-juris-800 flex items-center justify-between px-6">
                <button className="text-sm text-gray-400 hover:text-white">Aula Anterior</button>
                <button className="px-6 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition-colors">
                    Marcar como Concluída
                </button>
                <button className="text-sm text-gray-400 hover:text-white">Próxima Aula</button>
           </div>
        </div>

        {/* Sidebar Curriculum */}
        <div className={`${sidebarOpen ? 'w-80 translate-x-0' : 'w-0 translate-x-full md:w-0 md:translate-x-0'} transition-all duration-300 bg-juris-900 border-l border-juris-800 flex flex-col absolute md:relative right-0 h-full z-10`}>
           <div className="p-4 border-b border-juris-800 bg-juris-800/50">
              <h3 className="font-bold text-sm text-gray-300 uppercase">Conteúdo do Curso</h3>
              <div className="mt-2 h-1 bg-juris-800 rounded-full overflow-hidden">
                 <div className="h-full bg-green-500 w-[15%]"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">15% concluído</p>
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
                                    onClick={() => setActiveLesson(lesson)}
                                    className={`w-full flex items-start text-left gap-3 px-4 py-3 hover:bg-juris-800 transition-colors ${activeLesson.id === lesson.id ? 'bg-juris-800 border-l-2 border-juris-accent' : ''}`}
                                  >
                                      <div className="mt-0.5">
                                        {lesson.completed ? (
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <Circle className="w-4 h-4 text-gray-600" />
                                        )}
                                      </div>
                                      <div>
                                          <span className={`text-sm block ${activeLesson.id === lesson.id ? 'text-white' : 'text-gray-400'}`}>
                                              {lesson.title}
                                          </span>
                                          <span className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
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