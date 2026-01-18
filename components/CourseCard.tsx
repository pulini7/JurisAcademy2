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
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-50 hover:shadow-2xl transition-all duration-700 ease-elegant flex flex-col h-full group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-juris-900/10 group-hover:bg-juris-900/0 transition-colors duration-700"></div>
        <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md text-juris-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm z-10">
          {course.level}
        </div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col relative z-10 bg-white">
        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4 font-medium">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1.5 text-juris-gold" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <BarChart className="w-4 h-4 mr-1.5 text-juris-gold" />
            Certificado
          </div>
        </div>

        <h3 className="text-2xl font-bold text-juris-900 mb-3 group-hover:text-juris-accent transition-colors duration-500 font-serif">{course.title}</h3>
        <p className="text-gray-500 mb-8 text-base flex-1 leading-relaxed font-light">{course.description}</p>
        
        <div className="space-y-3 mb-8">
          <p className="text-xs font-bold text-juris-accent uppercase tracking-widest mb-3">Destaques</p>
          {course.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-start text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Curriculum Toggle */}
        <div className="mb-8 border rounded-xl border-gray-100 overflow-hidden bg-gray-50/50 hover:border-juris-accent/20 transition-colors duration-500">
          <button 
            onClick={() => setShowCurriculum(!showCurriculum)}
            className="w-full flex items-center justify-between text-sm font-semibold text-juris-800 px-5 py-4 hover:bg-white transition-colors focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-juris-gold" />
              Grade Curricular
            </span>
            {showCurriculum ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>
          
          <div className={`transition-all duration-700 ease-elegant ${showCurriculum ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-white p-4 border-t border-gray-100">
               <div className="flex items-center justify-end mb-3">
                  <span className="text-[10px] uppercase font-bold text-juris-gold flex items-center gap-1 bg-juris-gold/10 px-2 py-1 rounded-full">
                    <Lock className="w-3 h-3" /> Exclusivo
                  </span>
               </div>
               <ul className="text-xs text-gray-500 space-y-3 overflow-y-auto max-h-64 pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                {course.modules.map((mod, idx) => (
                    <li key={idx} className="flex items-start justify-between gap-3 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors px-2 rounded animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                        <span className="leading-snug flex-1 font-medium">{mod}</span>
                        <Lock className="w-3 h-3 text-gray-300 mt-0.5 flex-shrink-0" aria-label="Bloqueado" />
                    </li>
                ))}
               </ul>
            </div>
          </div>
        </div>

        <div className="mt-auto border-t pt-6 border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 block uppercase tracking-wide">Investimento</span>
              <span className="text-3xl font-bold text-juris-900 group-hover:scale-105 transition-transform origin-left block font-serif">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(course.price)}
              </span>
            </div>
            <Button variant="primary" size="md" onClick={handleBuy} disabled={isBuying} className="shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform active:scale-95 transition-all duration-500 ease-elegant min-w-[140px] rounded-xl">
              {isBuying ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Matricular-se'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};