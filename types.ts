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
  content: string;
  created_at?: string;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface ChatResponse {
  message: string;
  messageId: string;
  conversationId: string;
}

export interface Note {
  id: string;
  lessonId: string;
  timestamp: string; // ex: "02:30"
  content: string;
  createdAt: number;
}

export interface Comment {
  id: string;
  lessonId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export type ViewState = 'landing' | 'auth' | 'dashboard' | 'player' | 'playground';