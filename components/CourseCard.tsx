import React from 'react';
import { Course } from '../types';
import { Button } from './Button';
import { CheckCircle, Clock, BarChart } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-juris-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {course.level}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <BarChart className="w-4 h-4 mr-1" />
            Certificado
          </div>
        </div>

        <h3 className="text-xl font-bold text-juris-900 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-6 text-sm flex-1 leading-relaxed">{course.description}</p>
        
        <div className="space-y-2 mb-6">
          {course.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-start text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-juris-accent mr-2 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto border-t pt-4 border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 block">Investimento</span>
              <span className="text-2xl font-bold text-juris-900">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(course.price)}
              </span>
            </div>
            <Button variant="primary" size="sm" onClick={() => alert(`Matrícula iniciada para: ${course.title}`)}>
              Matricular-se
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};