import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Scale, Facebook, Twitter, Linkedin, Instagram, ArrowRight, ShieldCheck, ChevronDown, Users } from 'lucide-react';
import { CourseCard } from './CourseCard';
import { Button } from './Button';
import { Course, Instructor, Testimonial } from '../types';

interface LandingPageProps {
  courses: Course[];
  instructors: Instructor[];
  testimonials: Testimonial[];
  faqItems: any[];
  onLoginClick: () => void;
}

// Componente utilitário para animação ao rolar a página
const RevealOnScroll: React.FC<{ children: React.ReactNode; className?: string; delay?: string }> = ({ children, className = "", delay = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} className={`${className} ${isVisible ? 'reveal-visible' : 'reveal-hidden'} ${delay}`}>
      {children}
    </div>
  );
};

export const LandingPage: React.FC<LandingPageProps> = ({ 
  courses, 
  instructors, 
  testimonials, 
  faqItems,
  onLoginClick 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const navLinkClass = "hover:text-juris-gold px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-juris-gold after:left-0 after:bottom-0 after:transition-all hover:after:w-full active:scale-95 active:text-yellow-500 transform";

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-juris-900/95 backdrop-blur-md border-b border-juris-800 text-white transition-all duration-300 animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
              <div className="bg-gradient-to-tr from-juris-gold to-yellow-500 p-1.5 rounded-lg shadow-lg shadow-yellow-500/20 group-hover:rotate-12 transition-transform duration-300 active:scale-90">
                <Scale className="h-6 w-6 text-juris-900" />
              </div>
              <span className="text-2xl font-bold tracking-tight select-none">Juris<span className="text-juris-gold">Academy</span></span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#problem" className={navLinkClass}>O Cenário</a>
                <a href="#courses" className={navLinkClass}>Cursos</a>
                <a href="#faculty" className={navLinkClass}>Docentes</a>
                <Button 
                    variant="secondary" 
                    size="sm" 
                    className="shadow-lg shadow-yellow-500/20 transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95 active:translate-y-0"
                    onClick={onLoginClick}
                >
                  Área do Aluno
                </Button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none active:scale-90 transition-transform"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-juris-800 border-t border-juris-700 animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#problem" className="block hover:bg-juris-700 px-3 py-2 rounded-md text-base font-medium active:bg-juris-600 transition-colors" onClick={() => setIsMenuOpen(false)}>O Cenário</a>
              <a href="#courses" className="block hover:bg-juris-700 px-3 py-2 rounded-md text-base font-medium active:bg-juris-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Cursos</a>
              <a href="#faculty" className="block hover:bg-juris-700 px-3 py-2 rounded-md text-base font-medium active:bg-juris-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Docentes</a>
              <div className="pt-4">
                <Button variant="secondary" className="w-full active:scale-95 transition-transform" onClick={() => { onLoginClick(); setIsMenuOpen(false); }}>Área do Aluno</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 bg-juris-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-juris-900 via-juris-900/95 to-juris-900"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-juris-700 bg-juris-800/80 backdrop-blur-sm mb-8 shadow-2xl animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            <span className="text-gray-200 text-sm font-medium tracking-wide">A Revolução Jurídica Começou</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight animate-fade-in-up delay-100">
            A IA não vai substituir advogados.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-juris-gold via-yellow-200 to-yellow-500 animate-pulse-slow">
              Advogados que usam IA vão.
            </span>
          </h1>
          
          <p className="mt-4 max-w-3xl mx-auto text-xl md:text-2xl text-gray-300 mb-10 font-light leading-relaxed animate-fade-in-up delay-200">
            Pare de perder horas em tarefas repetitivas. Aprenda a automatizar peças, analisar contratos em segundos e 
            <strong className="text-white font-semibold"> multiplicar o faturamento do seu escritório</strong> com as ferramentas certas.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5 animate-fade-in-up delay-300">
            <Button 
              variant="secondary" 
              size="lg" 
              className="text-lg px-10 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transform hover:-translate-y-1 transition-all duration-300 active:scale-95 active:translate-y-0"
              onClick={() => document.getElementById('courses')?.scrollIntoView({behavior: 'smooth'})}
            >
              Quero Me Atualizar Agora <ArrowRight className="ml-2 w-5 h-5 animate-bounce-x" />
            </Button>
          </div>

          <div className="mt-12 flex justify-center items-center space-x-8 text-gray-500 text-sm font-medium uppercase tracking-widest opacity-70 animate-fade-in delay-500">
            <span>Usado por advogados de:</span>
            <div className="flex space-x-6 grayscale opacity-60 hover:grayscale-0 transition-all duration-500">
               <span className="font-serif text-lg font-bold hover:text-white transition-colors cursor-default hover:scale-105 transform duration-300">Pinheiro Neto</span>
               <span className="font-serif text-lg font-bold hover:text-white transition-colors cursor-default hover:scale-105 transform duration-300">Mattos Filho</span>
               <span className="font-serif text-lg font-bold hover:text-white transition-colors cursor-default hover:scale-105 transform duration-300">Demarest</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll className="relative group">
               <div className="absolute top-0 left-0 w-full h-full bg-juris-accent/10 rounded-2xl transform rotate-3 transition-transform duration-500 group-hover:rotate-6"></div>
               <img 
                 src="https://images.unsplash.com/photo-1505664063603-28e48ca204eb?auto=format&fit=crop&q=80&w=1000" 
                 alt="Biblioteca Jurídica Tradicional" 
                 className="relative rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover h-[500px] w-full transform group-hover:scale-[1.02]"
               />
            </RevealOnScroll>
            
            <RevealOnScroll delay="delay-200">
              <h2 className="text-juris-accent font-bold uppercase tracking-wide mb-2">A Realidade Atual</h2>
              <h3 className="text-4xl font-extrabold text-juris-900 mb-6 leading-tight">
                O modelo tradicional de advocacia <span className="text-red-600 decoration-red-600 underline decoration-4 underline-offset-4">colapsou</span>.
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Enquanto você gasta 4 horas redigindo uma contestação padrão, um advogado júnior equipado com IA faz a mesma tarefa (com mais qualidade) em <strong>15 minutos</strong>.
              </p>
              <ul className="space-y-4 mb-8">
                {['Honorários achatados pela concorrência desleal.', 'Clientes exigindo respostas imediatas (efeito WhatsApp).', 'Sobrecarga de trabalho operacional e burocrático.'].map((item, i) => (
                    <li key={i} className="flex items-start hover:translate-x-2 transition-transform duration-300 group">
                      <div className="bg-red-100 p-1.5 rounded-full mr-3 mt-1 shrink-0 group-hover:bg-red-200 transition-colors">
                        <X className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                ))}
              </ul>
              <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-juris-gold to-yellow-300 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <p className="relative text-xl font-bold text-juris-900 border-l-4 border-juris-gold pl-4 py-4 bg-gray-50 rounded-r-lg">
                    A JurisAcademy é a ponte para o outro lado: onde você trabalha menos e ganha mais.
                  </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-16">
            <h2 className="text-juris-accent font-bold tracking-wide uppercase mb-2">Treinamentos de Elite</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-juris-900 mb-4">
              Escolha sua trilha de especialização
            </p>
            <p className="max-w-2xl text-xl text-gray-500 mx-auto">
              Metodologia validada por mais de 5.000 advogados em todo o Brasil.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <RevealOnScroll key={course.id} delay={`delay-${(index + 1) * 100}`}>
                <div className="relative h-full hover:-translate-y-2 transition-transform duration-500">
                  {index === 0 && (
                    <div className="absolute -top-4 inset-x-0 flex justify-center z-20">
                      <span className="bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider animate-bounce">
                        Mais Vendido
                      </span>
                    </div>
                  )}
                  <CourseCard course={course} />
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll className="mt-16 bg-white rounded-2xl p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 transform hover:shadow-2xl transition-all duration-300">
             <div className="flex items-center gap-4">
               <div className="bg-green-100 p-4 rounded-full animate-pulse-slow">
                 <ShieldCheck className="w-10 h-10 text-green-600" />
               </div>
               <div>
                 <h4 className="text-xl font-bold text-juris-900">Garantia Incondicional de 7 Dias</h4>
                 <p className="text-gray-600">Acesse o curso. Se não gostar, devolvemos 100% do seu dinheiro. Sem perguntas.</p>
               </div>
             </div>
             <Button variant="outline" className="shrink-0 hover:scale-105 active:scale-95 transition-transform" onClick={() => window.scrollTo(0,0)}>
               Ler Termos da Garantia
             </Button>
          </RevealOnScroll>
        </div>
      </section>

      {/* Faculty Section */}
      <section id="faculty" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-16">
            <h2 className="text-juris-accent font-bold tracking-wide uppercase mb-2">Corpo Docente</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-juris-900 mb-4">
              Aprenda com a Elite
            </p>
            <p className="max-w-2xl text-xl text-gray-500 mx-auto">
              Unimos a academia jurídica tradicional com a vanguarda tecnológica do Vale do Silício.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor, index) => (
              <RevealOnScroll key={instructor.id} delay={`delay-${index * 100}`} className="group text-center cursor-default">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-juris-accent blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full duration-500"></div>
                  <img 
                    src={instructor.image} 
                    alt={instructor.name} 
                    className="relative w-40 h-40 mx-auto rounded-full object-cover border-4 border-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out" 
                  />
                </div>
                <h3 className="text-xl font-bold text-juris-900 mb-1 group-hover:text-juris-accent transition-colors">{instructor.name}</h3>
                <p className="text-juris-accent font-semibold text-sm mb-3 uppercase tracking-wide">{instructor.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed px-2">{instructor.bio}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-16">
            <h2 className="text-3xl font-bold text-juris-900">Quem aplica, tem resultados</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <RevealOnScroll key={testimonial.id} delay={`delay-${index * 100}`}>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-default">
                  <div className="flex items-center mb-6">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4 border-2 border-juris-gold object-cover" />
                    <div>
                      <div className="font-bold text-juris-900">{testimonial.name}</div>
                      <div className="text-sm text-juris-accent font-medium">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[1,2,3,4,5].map(i => (
                      <Users key={i} className="w-4 h-4 text-juris-gold fill-current animate-pulse-slow" style={{ animationDelay: `${i * 100}ms` }} />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed">"{testimonial.content}"</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-12">
            <h2 className="text-3xl font-bold text-juris-900">Perguntas Frequentes</h2>
          </RevealOnScroll>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <RevealOnScroll key={index} delay={`delay-${index * 50}`}>
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-juris-accent/50 transition-colors duration-300">
                  <button
                    className="w-full px-6 py-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center focus:outline-none active:bg-gray-200"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-semibold text-juris-900 text-lg">{item.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                  </button>
                  <div 
                    className={`bg-white px-6 overflow-hidden transition-all duration-500 ease-in-out ${openFaqIndex === index ? 'max-h-96 py-5 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                  >
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-juris-950 text-gray-400 py-16 border-t border-juris-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-6 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                 <div className="bg-juris-gold/10 p-1.5 rounded-lg group-hover:bg-juris-gold/20 transition-colors active:scale-95 duration-200">
                  <Scale className="h-6 w-6 text-juris-gold group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">Juris<span className="text-juris-gold">Academy</span></span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                A primeira escola de tecnologia jurídica focada 100% em resultados práticos.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 active:scale-90 transform duration-200"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 active:scale-90 transform duration-200"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 active:scale-90 transform duration-200"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 active:scale-90 transform duration-200"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>
            {/* Links columns */}
            {[
              { title: "Cursos Populares", links: ["Prompt Engineering Jurídico", "Compliance & Ética AI"] },
              { title: "Institucional", links: ["Sobre Nós", "Blog Jurídico"] },
              { title: "Atendimento", links: ["contato@jurisacademy.com.br", "Av. Paulista, 1000 - SP"] }
            ].map((col, idx) => (
               <div key={idx}>
                <h3 className="text-white font-bold mb-6 text-lg">{col.title}</h3>
                <ul className="space-y-3 text-sm">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}><a href="#" className="hover:text-juris-gold transition-colors hover:translate-x-1 active:scale-95 inline-block duration-200">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-juris-900 pt-8 text-sm">
            <p>&copy; {new Date().getFullYear()} JurisAcademy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};