import React from 'react';
import { Course } from '../types';
import { Play, Clock, Award, LogOut } from 'lucide-react';
import { COURSES } from '../constants';

interface DashboardProps {
  onLogout: () => void;
  onSelectCourse: (courseId: string) => void;
}

export const StudentDashboard: React.FC<DashboardProps> = ({ onLogout, onSelectCourse }) => {
  // Mock de cursos matriculados para a demo
  const enrolledCourses = [COURSES[0], COURSES[2]]; 

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-juris-900 tracking-tight">Juris<span className="text-juris-gold">Academy</span></span>
              <span className="ml-3 px-2 py-0.5 rounded text-xs font-semibold bg-juris-100 text-juris-800 uppercase">Área do Aluno</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                 <div className="w-8 h-8 rounded-full bg-juris-900 text-white flex items-center justify-center font-bold">D</div>
                 <span className="text-sm font-medium text-gray-700 hidden md:block">Dr. Demo</span>
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-juris-900">Meus Cursos</h1>
          <p className="text-gray-500">Continue sua jornada de especialização.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative h-48">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => onSelectCourse(course.id)}
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
                    onClick={() => onSelectCourse(course.id)}
                    className="w-full py-2 bg-juris-accent text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                    Continuar Assistindo
                </button>
              </div>
            </div>
          ))}

          {/* Card de Adicionar Mais Cursos */}
          <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 text-center hover:bg-gray-100 transition-colors cursor-pointer" onClick={onLogout}>
             <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                <span className="text-2xl font-light text-gray-400">+</span>
             </div>
             <h3 className="font-semibold text-gray-900">Explorar Catálogo</h3>
             <p className="text-xs text-gray-500 mt-1">Conheça novos cursos para sua carreira</p>
          </div>
        </div>
      </main>
    </div>
  );
};