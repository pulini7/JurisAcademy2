import React, { useState, useEffect } from 'react';
import { COURSES as STATIC_COURSES, TESTIMONIALS as STATIC_TESTIMONIALS, FAQ_ITEMS, INSTRUCTORS as STATIC_INSTRUCTORS } from './constants';
import { supabase } from './services/supabaseClient';
import { Course, Instructor, Testimonial } from './types';
import { LandingPage } from './components/LandingPage';
import { Auth } from './components/Auth';
import { StudentDashboard } from './components/StudentDashboard';
import { CoursePlayer } from './components/CoursePlayer';

type ViewState = 'landing' | 'auth' | 'dashboard' | 'player';

const App: React.FC = () => {
  // State for data
  const [courses, setCourses] = useState<Course[]>(STATIC_COURSES);
  const [instructors, setInstructors] = useState<Instructor[]>(STATIC_INSTRUCTORS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(STATIC_TESTIMONIALS);
  
  // Navigation & User State
  const [view, setView] = useState<ViewState>('landing');
  const [session, setSession] = useState<any>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  useEffect(() => {
    // 1. Fetch Data
    const fetchData = async () => {
      const { data: coursesData } = await supabase.from('courses').select('*');
      if (coursesData && coursesData.length > 0) setCourses(coursesData);

      const { data: instructorsData } = await supabase.from('instructors').select('*');
      if (instructorsData && instructorsData.length > 0) setInstructors(instructorsData);

      const { data: testimonialsData } = await supabase.from('testimonials').select('*');
      if (testimonialsData && testimonialsData.length > 0) setTestimonials(testimonialsData);
    };

    fetchData();

    // 2. Check Auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Check for demo user
    if (localStorage.getItem('juris_demo_user')) {
        setSession({ user: { email: 'demo@jurisacademy.com' } });
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    setView('dashboard');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('juris_demo_user');
    setSession(null);
    setView('landing');
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setView('player');
  };

  const getSelectedCourse = () => {
      return courses.find(c => c.id === selectedCourseId) || courses[0];
  }

  // Router Logic
  switch (view) {
    case 'auth':
        return <Auth onLogin={handleLogin} onBack={() => setView('landing')} />;
    
    case 'dashboard':
        // If not logged in, force auth (unless it's just a quick state transition)
        if (!session) return <Auth onLogin={handleLogin} onBack={() => setView('landing')} />;
        return <StudentDashboard onLogout={handleLogout} onSelectCourse={handleSelectCourse} />;

    case 'player':
        if (!session) return <Auth onLogin={handleLogin} onBack={() => setView('landing')} />;
        return <CoursePlayer course={getSelectedCourse()} onBack={() => setView('dashboard')} />;

    case 'landing':
    default:
        return (
            <LandingPage 
                courses={courses}
                instructors={instructors}
                testimonials={testimonials}
                faqItems={FAQ_ITEMS}
                onLoginClick={() => {
                    if (session) {
                        setView('dashboard');
                    } else {
                        setView('auth');
                    }
                }}
            />
        );
  }
};

export default App;