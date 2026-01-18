import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { Course, Instructor, Testimonial, ViewState } from '../types';
import { COURSES, INSTRUCTORS, TESTIMONIALS } from '../constants';

interface AppContextType {
  session: any;
  view: ViewState;
  setView: (view: ViewState) => void;
  courses: Course[];
  instructors: Instructor[];
  testimonials: Testimonial[];
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  isLoading: boolean;
  signOut: () => Promise<void>;
  getSelectedCourse: () => Course | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<any>(null);
  const [view, setView] = useState<ViewState>('landing');
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [instructors, setInstructors] = useState<Instructor[]>(INSTRUCTORS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) setView('dashboard');
      
      // Demo check
      if (!session && localStorage.getItem('juris_demo_user')) {
        setSession({ user: { email: 'demo@jurisacademy.com', user_metadata: { name: 'Dr. Demo' } } });
        if (window.location.hash !== '#landing') setView('dashboard');
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session && !localStorage.getItem('juris_demo_user')) {
        setView('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('juris_demo_user');
    setSession(null);
    setView('landing');
  };

  const getSelectedCourse = () => {
    return courses.find(c => c.id === selectedCourseId);
  };

  return (
    <AppContext.Provider value={{
      session,
      view,
      setView,
      courses,
      instructors,
      testimonials,
      selectedCourseId,
      setSelectedCourseId,
      isLoading,
      signOut,
      getSelectedCourse
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};