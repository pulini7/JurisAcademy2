import React from 'react';
import { FAQ_ITEMS } from './constants';
import { LandingPage } from './components/LandingPage';
import { Auth } from './components/Auth';
import { StudentDashboard } from './components/StudentDashboard';
import { CoursePlayer } from './components/CoursePlayer';
import { Playground } from './components/Playground';
import { AppProvider, useApp } from './contexts/AppContext';

const AppContent: React.FC = () => {
  const { 
      view, 
      setView, 
      session, 
      courses, 
      instructors, 
      testimonials, 
      signOut, 
      getSelectedCourse, 
      setSelectedCourseId 
  } = useApp();

  const handleLogin = () => {
    setView('dashboard');
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setView('player');
  };

  // Router Logic
  switch (view) {
    case 'auth':
        return <Auth onLogin={handleLogin} onBack={() => setView('landing')} />;
    
    case 'dashboard':
        if (!session) return <Auth onLogin={handleLogin} onBack={() => setView('landing')} />;
        return <StudentDashboard onLogout={signOut} onSelectCourse={handleSelectCourse} />;

    case 'player':
        if (!session) return <Auth onLogin={handleLogin} onBack={() => setView('landing')} />;
        const activeCourse = getSelectedCourse();
        if (!activeCourse) return <StudentDashboard onLogout={signOut} onSelectCourse={handleSelectCourse} />;
        return <CoursePlayer course={activeCourse} onBack={() => setView('dashboard')} />;

    case 'playground':
        if (!session) return <Auth onLogin={handleLogin} onBack={() => setView('landing')} />;
        return <Playground />;

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

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;