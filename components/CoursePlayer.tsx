import React, { useState, useEffect, useRef } from 'react';
import { Course, ModuleData, Lesson, Note, Comment } from '../types';
import { ChevronLeft, CheckCircle, Circle, PlayCircle, FileText, Menu, Download, X, Settings, Moon, Sun, MoreVertical, Send, Bookmark, MessageSquare, MonitorPlay } from 'lucide-react';
import { Button } from './Button';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    confetti: any;
  }
}

interface CoursePlayerProps {
  course: Course;
  onBack: () => void;
}

// MOCK DATA
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
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'content' | 'notes' | 'comments'>('content');
  const [videoSpeed, setVideoSpeed] = useState(1);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  // Handle Resize
  useEffect(() => {
    if (window.innerWidth >= 1024) setSidebarOpen(true);
    const handleResize = () => {
       if (window.innerWidth >= 1024) setSidebarOpen(true);
       else setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLessonComplete = () => {
      // #3 Confetti Effect
      if (window.confetti) {
          window.confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
          });
      }
      
      // Update mock completion
      const nextLesson = MOCK_MODULES[0].lessons.find(l => !l.completed && l.id !== activeLesson.id);
      if (nextLesson) {
          setTimeout(() => {
             if(confirm("Aula concluída! Ir para a próxima?")) {
                 setActiveLesson(nextLesson);
             }
          }, 1000);
      }
  };

  const addNote = () => {
      if(!newNote.trim()) return;
      const note: Note = {
          id: Date.now().toString(),
          lessonId: activeLesson.id,
          timestamp: "02:15", // Mock current time
          content: newNote,
          createdAt: Date.now()
      };
      setNotes([note, ...notes]);
      setNewNote('');
  };

  const bgColor = darkMode ? 'bg-juris-900' : 'bg-gray-100';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const cardColor = darkMode ? 'bg-zinc-900' : 'bg-white';

  return (
    <div className={`h-screen flex flex-col ${bgColor} ${textColor} overflow-hidden transition-colors duration-300`}>
      
      {/* #4 Top Bar with Breadcrumbs */}
      <div className={`h-16 flex items-center justify-between px-4 border-b ${darkMode ? 'border-juris-800 bg-juris-900' : 'border-gray-200 bg-white'} shrink-0 z-30 relative shadow-sm`}>
        <div className="flex items-center gap-4">
          <button onClick={onBack} className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-juris-800' : 'hover:bg-gray-100'}`}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="hidden md:block">
             <nav className="flex text-xs text-gray-500 mb-0.5 space-x-2">
                 <span>Meus Cursos</span>
                 <span>/</span>
                 <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{course.title}</span>
             </nav>
             <h1 className="text-sm font-bold truncate max-w-md">{activeLesson.title}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            {/* #2 Dark Mode Toggle */}
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg ${darkMode ? 'bg-juris-800 hover:bg-juris-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}>
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors"
            >
                <Menu className="w-4 h-4" />
            </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative z-0">
           {/* Video Player / Content */}
           <div className={`flex-1 flex items-center justify-center ${darkMode ? 'bg-black' : 'bg-gray-200'} relative`}>
               {activeLesson.type === 'video' ? (
                 <div className="w-full h-full max-w-5xl max-h-[80vh] aspect-video relative group">
                    {/* #9 Simulated Pro Player */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                        <div className="text-center p-4">
                            <div className="w-20 h-20 rounded-full bg-juris-accent/20 flex items-center justify-center mx-auto mb-4 animate-pulse cursor-pointer hover:bg-juris-accent/40 transition-colors">
                                <PlayCircle className="w-10 h-10 text-juris-accent" />
                            </div>
                            <p className="text-gray-400 font-mono text-sm">Simulação de Vídeo: {activeLesson.title}</p>
                        </div>
                    </div>
                    {/* Controls Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex justify-between items-center text-white">
                            <div className="flex gap-4">
                                <button onClick={() => setVideoSpeed(videoSpeed === 1 ? 1.5 : videoSpeed === 1.5 ? 2 : 1)} className="text-xs font-bold border border-white/30 px-2 py-0.5 rounded hover:bg-white/20">
                                    {videoSpeed}x
                                </button>
                            </div>
                        </div>
                    </div>
                 </div>
               ) : (
                 <div className={`w-full h-full ${cardColor} overflow-y-auto p-8`}>
                    <div className="max-w-3xl mx-auto py-12">
                        <FileText className={`w-16 h-16 ${darkMode ? 'text-gray-600' : 'text-gray-300'} mx-auto mb-6`} />
                        <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activeLesson.title}</h2>
                        <div className={`prose ${darkMode ? 'prose-invert' : ''} max-w-none`}>
                            <p>Conteúdo de texto simulado para esta aula. Aqui estaria o material completo de leitura, com formatação rica, links e citações jurídicas.</p>
                            <div className="my-8 p-4 bg-yellow-500/10 border-l-4 border-yellow-500 rounded-r">
                                <p className="text-sm text-yellow-500 font-bold">Dica Prática:</p>
                                <p className="text-sm">Sempre verifique a fonte das jurisprudências citadas.</p>
                            </div>
                        </div>
                        <Button className="mt-8 flex items-center gap-2">
                            <Download className="w-4 h-4" /> Baixar PDF da Aula
                        </Button>
                    </div>
                 </div>
               )}
           </div>

           {/* Mobile Tabs */}
           <div className="lg:hidden h-12 flex border-t border-b border-gray-700 bg-juris-800">
                <button onClick={() => setActiveTab('content')} className={`flex-1 flex items-center justify-center gap-2 text-sm ${activeTab === 'content' ? 'text-juris-gold border-b-2 border-juris-gold' : 'text-gray-400'}`}>
                    <MonitorPlay className="w-4 h-4" /> Aula
                </button>
                <button onClick={() => setActiveTab('notes')} className={`flex-1 flex items-center justify-center gap-2 text-sm ${activeTab === 'notes' ? 'text-juris-gold border-b-2 border-juris-gold' : 'text-gray-400'}`}>
                    <Bookmark className="w-4 h-4" /> Notas
                </button>
                <button onClick={() => setActiveTab('comments')} className={`flex-1 flex items-center justify-center gap-2 text-sm ${activeTab === 'comments' ? 'text-juris-gold border-b-2 border-juris-gold' : 'text-gray-400'}`}>
                    <MessageSquare className="w-4 h-4" /> Chat
                </button>
           </div>
           
           {/* Lesson Navigation Footer */}
           <div className={`h-16 ${darkMode ? 'bg-juris-900 border-juris-800' : 'bg-white border-gray-200'} border-t flex items-center justify-between px-6 shrink-0 z-20`}>
                <button className="text-sm text-gray-500 hover:text-juris-accent font-medium">Anterior</button>
                <button onClick={handleLessonComplete} className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-500/20 active:scale-95 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Concluir Aula
                </button>
                <button className="text-sm text-gray-500 hover:text-juris-accent font-medium">Próxima</button>
           </div>
        </div>

        {/* Sidebar (Curriculum + Tools) */}
        <div className={`
            ${darkMode ? 'bg-juris-900 border-juris-800' : 'bg-gray-50 border-gray-200'} border-l flex flex-col
            transition-all duration-300 ease-in-out z-40
            fixed top-0 right-0 h-full w-96 shadow-2xl lg:shadow-none lg:relative lg:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:w-96'}
        `}>
           {/* Sidebar Header */}
           <div className={`h-16 flex items-center justify-between px-4 border-b ${darkMode ? 'bg-juris-800/50 border-juris-800' : 'bg-white border-gray-200'}`}>
              <div className="flex gap-4">
                 <button onClick={() => setActiveTab('content')} className={`text-sm font-bold pb-5 pt-5 border-b-2 transition-colors ${activeTab === 'content' ? 'border-juris-accent text-juris-accent' : 'border-transparent text-gray-500'}`}>
                    Conteúdo
                 </button>
                 <button onClick={() => setActiveTab('notes')} className={`text-sm font-bold pb-5 pt-5 border-b-2 transition-colors ${activeTab === 'notes' ? 'border-juris-accent text-juris-accent' : 'border-transparent text-gray-500'}`}>
                    Anotações
                 </button>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-gray-400">
                  <X className="w-5 h-5" />
              </button>
           </div>
           
           {/* Sidebar Content */}
           <div className={`flex-1 overflow-y-auto ${darkMode ? 'bg-juris-900' : 'bg-white'}`}>
              
              {/* TAB: CONTENT (Aulas) */}
              {activeTab === 'content' && (
                  <div>
                    {MOCK_MODULES.map((module, mIdx) => (
                        <div key={mIdx} className={`border-b ${darkMode ? 'border-juris-800' : 'border-gray-100'}`}>
                            <div className={`px-4 py-3 font-semibold text-xs uppercase tracking-wider ${darkMode ? 'bg-juris-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                                {module.title}
                            </div>
                            <ul>
                                {module.lessons.map((lesson) => (
                                    <li key={lesson.id}>
                                        <button 
                                            onClick={() => setActiveLesson(lesson)}
                                            className={`w-full flex items-start text-left gap-3 px-4 py-4 hover:bg-opacity-50 transition-colors border-l-4 ${activeLesson.id === lesson.id ? (darkMode ? 'bg-juris-800 border-juris-accent' : 'bg-blue-50 border-juris-accent') : 'border-transparent hover:bg-gray-50'}`}
                                        >
                                            <div className="mt-0.5 shrink-0">
                                                {lesson.completed ? (
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Circle className={`w-4 h-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                                                )}
                                            </div>
                                            <div>
                                                <span className={`text-sm block leading-tight mb-1 font-medium ${activeLesson.id === lesson.id ? (darkMode ? 'text-white' : 'text-blue-700') : (darkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                                                    {lesson.title}
                                                </span>
                                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                                    {lesson.duration} • {lesson.type}
                                                </span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                  </div>
              )}

              {/* TAB: NOTES (Anotações) */}
              {activeTab === 'notes' && (
                  <div className="p-4 h-full flex flex-col">
                      <div className="mb-4">
                          <textarea 
                             className={`w-full p-3 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-juris-accent ${darkMode ? 'bg-juris-800 text-white placeholder-gray-500' : 'bg-gray-100 text-gray-900 border-gray-200 border'}`}
                             rows={4}
                             placeholder="Digite sua anotação neste ponto do vídeo..."
                             value={newNote}
                             onChange={(e) => setNewNote(e.target.value)}
                          />
                          <Button size="sm" className="w-full mt-2" onClick={addNote}>Salvar Nota (02:15)</Button>
                      </div>
                      <div className="flex-1 overflow-y-auto space-y-3">
                          {notes.length === 0 && (
                              <p className="text-center text-gray-500 text-sm mt-10">Nenhuma anotação nesta aula.</p>
                          )}
                          {notes.map(note => (
                              <div key={note.id} className={`p-3 rounded-lg border ${darkMode ? 'bg-juris-800 border-juris-700' : 'bg-white border-gray-200'}`}>
                                  <div className="flex justify-between items-center mb-1">
                                      <span className="text-xs font-bold text-juris-accent cursor-pointer hover:underline">{note.timestamp}</span>
                                      <span className="text-[10px] text-gray-500">{new Date(note.createdAt).toLocaleDateString()}</span>
                                  </div>
                                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{note.content}</p>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
           </div>
        </div>
        
        {/* Mobile Backdrop */}
        {sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
      </div>
    </div>
  );
};