import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const NAMES = ['Dra. Juliana (SP)', 'Dr. Carlos (RJ)', 'Dra. Fernanda (MG)', 'Dr. Ricardo (RS)', 'Dra. Amanda (BA)'];
const COURSES = ['Prompt Engineering', 'Legal Ops', 'Compliance IA'];

export const SocialProofToast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: '', course: '' });

  useEffect(() => {
    const showToast = () => {
      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
      const randomCourse = COURSES[Math.floor(Math.random() * COURSES.length)];
      setData({ name: randomName, course: randomCourse });
      setVisible(true);

      setTimeout(() => setVisible(false), 5000);
    };

    // Primeira exibição após 5s
    const initialTimer = setTimeout(showToast, 5000);
    
    // Intervalo de 30s
    const interval = setInterval(showToast, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-slide-in-left">
      <div className="bg-white rounded-lg shadow-xl border-l-4 border-green-500 p-4 flex items-center gap-3 max-w-xs">
        <div className="bg-green-100 rounded-full p-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div>
            <p className="text-sm font-bold text-gray-800">{data.name}</p>
            <p className="text-xs text-gray-500">Acabou de se matricular em <span className="text-juris-accent font-medium">{data.course}</span></p>
        </div>
      </div>
    </div>
  );
};