export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  modules: string[];
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  duration: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz';
  completed?: boolean;
}

export interface ModuleData {
  title: string;
  lessons: Lesson[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  enrolledCourses: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}