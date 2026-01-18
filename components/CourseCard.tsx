import React, { useState } from 'react';
import { Course } from '../types';
import { Button } from './Button';
import { CheckCircle, Clock, BarChart, ChevronDown, ChevronUp, BookOpen, Lock, Loader2 } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const handleBuy = () => {
      setIsBuying(true);
      // Simula delay de checkout
      setTimeout(() => {
          setIsBuying(false);
          alert("Redirecionando para o Stripe Checkout (Ambiente Seguro)...");
      }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
        <div className="absolute top-4 right-4 bg-juris-900/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md z-10">
          {course.level}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col relative z-10 bg-white">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-juris-gold" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <BarChart className="w-4 h-4 mr-1 text-juris-gold" />
            Certificado
          </div>
        </div>

        <h3 className="text-xl font-bold text-juris-900 mb-2 group-hover:text-juris-accent transition-colors duration-300">{course.title}</h3>
        <p className="text-gray-600 mb-6 text-sm flex-1 leading-relaxed">{course.description}</p>
        
        <div className="space-y-2 mb-6">
          <p className="text-xs font-bold text-juris-accent uppercase tracking-wide mb-2">Destaques:</p>
          {course.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-start text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Curriculum Toggle */}
        <div className="mb-6 border rounded-lg border-gray-200 overflow-hidden bg-gray-50/50 hover:border-juris-accent/30 transition-colors">
          <button 
            onClick={() => setShowCurriculum(!showCurriculum)}
            className="w-full flex items-center justify-between text-sm font-semibold text-juris-800 px-4 py-3 hover:bg-gray-100 transition-colors focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-juris-gold" />
              Grade Curricular
            </span>
            {showCurriculum ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </button>
          
          <div className={`transition-all duration-500 ease-in-out ${showCurriculum ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-white p-3 border-t border-gray-100">
               <div className="flex items-center justify-end mb-2">
                  <span className="text-[10px] uppercase font-bold text-juris-gold flex items-center gap-1 bg-juris-gold/10 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3" /> Conteúdo Exclusivo Alunos
                  </span>
               </div>
               <ul className="text-xs text-gray-600 space-y-2 overflow-y-auto max-h-64 pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                {course.modules.map((mod, idx) => (
                    <li key={idx} className="flex items-start justify-between gap-3 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors px-1 rounded animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                        <span className="leading-snug flex-1 font-medium">{mod}</span>
                        <Lock className="w-3 h-3 text-gray-300 mt-0.5 flex-shrink-0" aria-label="Bloqueado" />
                    </li>
                ))}
               </ul>
            </div>
          </div>
        </div>

        <div className="mt-auto border-t pt-4 border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 block">Investimento</span>
              <span className="text-2xl font-bold text-juris-900 group-hover:scale-105 transition-transform origin-left block">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(course.price)}
              </span>
            </div>
            <Button variant="primary" size="sm" onClick={handleBuy} disabled={isBuying} className="shadow-md hover:shadow-lg transform active:scale-95 transition-all min-w-[120px]">
              {isBuying ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Matricular-se'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};