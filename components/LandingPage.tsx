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
          // Pequeno delay para garantir que o usuário veja a animação começar
          setTimeout(() => setIsVisible(true), 100);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} className={`${className} transition-all duration-1000 ease-out ${isVisible ? 'reveal-visible' : 'reveal-hidden'} ${delay}`}>
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

  const navLinkClass = "hover:text-juris-gold px-3 py-2 rounded-md text-sm font-medium transition-all duration-500 ease-elegant relative group";

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-juris-900/80 backdrop-blur-xl border-b border-white/10 text-white transition-all duration-700 ease-elegant animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
              <div className="bg-gradient-to-tr from-juris-gold to-yellow-500 p-1.5 rounded-lg shadow-lg shadow-yellow-500/20 group-hover:rotate-12 transition-transform duration-500 ease-bounce-gentle active:scale-90">
                <Scale className="h-6 w-6 text-juris-900" />
              </div>
              <span className="text-2xl font-bold tracking-tight select-none">Juris<span className="text-juris-gold">Academy</span></span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['O Cenário', 'Cursos', 'Docentes'].map((item, idx) => {
                   const href = `#${item === 'O Cenário' ? 'problem' : item === 'Docentes' ? 'faculty' : 'courses'}`;
                   return (
                    <a key={idx} href={href} className={navLinkClass}>
                        {item}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-juris-gold transition-all duration-500 ease-elegant group-hover:w-full"></span>
                    </a>
                   );
                })}
                <Button 
                    variant="secondary" 
                    size="sm" 
                    className="shadow-lg shadow-yellow-500/20 transform hover:-translate-y-1 transition-all duration-500 ease-elegant active:scale-95 active:translate-y-0"
                    onClick={onLoginClick}
                >
                  Área do Aluno
                </Button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none active:scale-90 transition-transform duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-juris-800/95 backdrop-blur-xl border-t border-juris-700 animate-fade-in">
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
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 bg-juris-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Imagem de fundo com zoom lento e suave */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 animate-pulse-slow"></div>
          {/* Overlay gradiente mais suave */}
          <div className="absolute inset-0 bg-gradient-to-b from-juris-900 via-juris-900/80 to-juris-900"></div>
          {/* Elementos decorativos flutuantes */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-juris-accent/20 rounded-full blur-[100px] animate-float"></div>
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-juris-gold/10 rounded-full blur-[120px] animate-float delay-500"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-2xl animate-fade-in-up hover:bg-white/10 transition-colors duration-500 cursor-default">
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-gray-200 text-sm font-medium tracking-wide">A Revolução Jurídica Começou</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight mb-8 leading-[1.1] animate-fade-in-up delay-100">
            A IA não vai substituir advogados.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-juris-gold via-yellow-200 to-yellow-600">
              Advogados que usam IA vão.
            </span>
          </h1>
          
          <p className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl text-gray-400 mb-12 font-light leading-relaxed animate-fade-in-up delay-200">
            Pare de perder horas em tarefas repetitivas. Automatize peças, analise contratos em segundos e 
            <strong className="text-white font-semibold"> multiplique o faturamento do seu escritório</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up delay-300">
            <Button 
              variant="secondary" 
              size="lg" 
              className="text-lg px-12 py-5 shadow-[0_0_40px_rgba(251,191,36,0.2)] hover:shadow-[0_0_60px_rgba(251,191,36,0.4)] transform hover:-translate-y-1 transition-all duration-500 ease-elegant active:scale-95 active:translate-y-0"
              onClick={() => document.getElementById('courses')?.scrollIntoView({behavior: 'smooth'})}
            >
              Quero Me Atualizar Agora <ArrowRight className="ml-2 w-5 h-5 animate-bounce-x" />
            </Button>
            <Button 
                variant="outline"
                size="lg"
                className="text-lg px-12 py-5 border-white/20 text-white hover:bg-white/5 hover:border-white/40 transition-all duration-500 ease-elegant"
                onClick={() => document.getElementById('problem')?.scrollIntoView({behavior: 'smooth'})}
            >
                Entender o Método
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <RevealOnScroll className="relative group perspective-1000">
               {/* 3D Effect Container */}
               <div className="absolute top-4 left-4 w-full h-full bg-juris-accent/5 rounded-3xl transform rotate-3 transition-transform duration-700 ease-elegant group-hover:rotate-6"></div>
               <div className="absolute -top-4 -left-4 w-full h-full border border-gray-100 rounded-3xl transform -rotate-2 transition-transform duration-700 ease-elegant group-hover:-rotate-3"></div>
               <img 
                 src="https://images.unsplash.com/photo-1505664063603-28e48ca204eb?auto=format&fit=crop&q=80&w=1000" 
                 alt="Biblioteca Jurídica Tradicional" 
                 className="relative rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 ease-elegant object-cover h-[600px] w-full transform group-hover:scale-[1.02] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
               />
            </RevealOnScroll>
            
            <RevealOnScroll delay="delay-200">
              <h2 className="text-juris-accent font-bold uppercase tracking-widest text-sm mb-4">A Realidade Atual</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-juris-900 mb-8 leading-tight">
                O modelo tradicional <br />
                <span className="relative inline-block">
                    colapsou
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-500/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                    </svg>
                </span>.
              </h3>
              <p className="text-xl text-gray-500 mb-8 leading-relaxed font-light">
                Enquanto você gasta 4 horas redigindo uma contestação padrão, um advogado júnior equipado com IA faz a mesma tarefa (com mais qualidade) em <strong>15 minutos</strong>.
              </p>
              <ul className="space-y-6 mb-10">
                {['Honorários achatados pela concorrência desleal.', 'Clientes exigindo respostas imediatas (efeito WhatsApp).', 'Sobrecarga de trabalho operacional e burocrático.'].map((item, i) => (
                    <li key={i} className="flex items-start p-4 rounded-xl hover:bg-red-50 transition-colors duration-500 group cursor-default">
                      <div className="bg-red-100 p-2 rounded-full mr-4 shrink-0 group-hover:scale-110 transition-transform duration-500">
                        <X className="w-5 h-5 text-red-600" />
                      </div>
                      <span className="text-gray-700 text-lg">{item}</span>
                    </li>
                ))}
              </ul>
              <div className="relative group overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-juris-gold to-yellow-300 opacity-20 group-hover:opacity-30 transition duration-700"></div>
                  <p className="relative text-xl font-medium text-juris-900 p-6 border-l-4 border-juris-gold">
                    A JurisAcademy é a ponte para o outro lado: onde você trabalha menos e ganha mais.
                  </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-32 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-20">
            <h2 className="text-juris-accent font-bold tracking-widest uppercase text-sm mb-4">Treinamentos de Elite</h2>
            <p className="text-4xl md:text-5xl font-serif font-bold text-juris-900 mb-6">
              Escolha sua trilha de especialização
            </p>
            <p className="max-w-2xl text-xl text-gray-500 mx-auto font-light">
              Metodologia validada por mais de 5.000 advogados em todo o Brasil.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course, index) => (
              <RevealOnScroll key={course.id} delay={`delay-${(index + 1) * 100}`}>
                <div className="relative h-full transform transition-all duration-700 ease-elegant hover:-translate-y-4 hover:shadow-2xl">
                  {index === 0 && (
                    <div className="absolute -top-5 inset-x-0 flex justify-center z-20">
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-6 py-2 rounded-full shadow-lg uppercase tracking-widest">
                        Mais Vendido
                      </span>
                    </div>
                  )}
                  <CourseCard course={course} />
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll className="mt-24 glass rounded-3xl p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-10 hover:bg-white transition-all duration-700 border border-white/40">
             <div className="flex items-center gap-6">
               <div className="bg-green-50 p-6 rounded-2xl">
                 <ShieldCheck className="w-12 h-12 text-green-600" />
               </div>
               <div>
                 <h4 className="text-2xl font-bold text-juris-900 mb-2">Garantia Incondicional de 7 Dias</h4>
                 <p className="text-gray-600 text-lg font-light">Acesse o curso. Se não gostar, devolvemos 100% do seu dinheiro. Sem perguntas.</p>
               </div>
             </div>
             <Button variant="outline" className="shrink-0 px-8 py-4 text-base hover:scale-105 active:scale-95 transition-transform duration-500 ease-elegant" onClick={() => window.scrollTo(0,0)}>
               Ler Termos da Garantia
             </Button>
          </RevealOnScroll>
        </div>
      </section>

      {/* Faculty Section */}
      <section id="faculty" className="py-32 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-20">
            <h2 className="text-juris-accent font-bold tracking-widest uppercase text-sm mb-4">Corpo Docente</h2>
            <p className="text-4xl md:text-5xl font-serif font-bold text-juris-900 mb-6">
              Aprenda com a Elite
            </p>
            <p className="max-w-2xl text-xl text-gray-500 mx-auto font-light">
              Unimos a academia jurídica tradicional com a vanguarda tecnológica do Vale do Silício.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {instructors.map((instructor, index) => (
              <RevealOnScroll key={instructor.id} delay={`delay-${index * 100}`} className="group text-center cursor-default">
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-juris-accent blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-full scale-150"></div>
                  <div className="relative w-48 h-48 mx-auto rounded-full p-1 bg-gradient-to-tr from-gray-100 to-gray-200 group-hover:from-juris-gold group-hover:to-juris-accent transition-colors duration-700">
                    <img 
                        src={instructor.image} 
                        alt={instructor.name} 
                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-700 ease-elegant" 
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-juris-900 mb-2 group-hover:text-juris-accent transition-colors duration-500">{instructor.name}</h3>
                <p className="text-juris-accent font-semibold text-sm mb-4 uppercase tracking-widest">{instructor.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed px-2 font-light">{instructor.bio}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-juris-900 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-juris-accent/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-juris-gold/5 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Quem aplica, tem resultados</h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <RevealOnScroll key={testimonial.id} delay={`delay-${index * 100}`}>
                <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 relative hover:bg-white/10 transition-all duration-700 ease-elegant hover:-translate-y-2 group cursor-default">
                  <div className="flex items-center mb-8">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full mr-5 border-2 border-juris-gold object-cover" />
                    <div>
                      <div className="font-bold text-white text-lg">{testimonial.name}</div>
                      <div className="text-sm text-juris-gold font-medium">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex mb-6">
                    {[1,2,3,4,5].map(i => (
                      <Users key={i} className="w-5 h-5 text-juris-gold fill-current animate-pulse-slow" style={{ animationDelay: `${i * 100}ms` }} />
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg font-light italic">"{testimonial.content}"</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-juris-900">Perguntas Frequentes</h2>
          </RevealOnScroll>
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <RevealOnScroll key={index} delay={`delay-${index * 50}`}>
                <div className="border-b border-gray-100 pb-4">
                  <button
                    className="w-full py-6 text-left bg-white hover:bg-gray-50 transition-colors flex justify-between items-center focus:outline-none group rounded-xl px-4"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium text-juris-900 text-xl group-hover:text-juris-accent transition-colors duration-300">{item.question}</span>
                    <div className={`p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-all duration-500 ${openFaqIndex === index ? 'bg-juris-accent text-white rotate-180' : 'text-gray-500'}`}>
                        <ChevronDown className="w-6 h-6" />
                    </div>
                  </button>
                  <div 
                    className={`px-4 overflow-hidden transition-all duration-700 ease-elegant ${openFaqIndex === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-gray-500 leading-relaxed text-lg font-light pt-2">{item.answer}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-gray-500 py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-8 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
                 <div className="bg-juris-900 p-2 rounded-xl group-hover:scale-110 transition-transform duration-500 ease-bounce-gentle">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-juris-900 tracking-tight">Juris<span className="text-juris-gold">Academy</span></span>
              </div>
              <p className="text-lg leading-relaxed mb-8 font-light text-gray-400">
                A primeira escola de tecnologia jurídica focada 100% em resultados práticos.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-300 hover:text-juris-accent transition-colors hover:scale-125 transform duration-300"><Facebook className="w-6 h-6" /></a>
                <a href="#" className="text-gray-300 hover:text-juris-accent transition-colors hover:scale-125 transform duration-300"><Twitter className="w-6 h-6" /></a>
                <a href="#" className="text-gray-300 hover:text-juris-accent transition-colors hover:scale-125 transform duration-300"><Linkedin className="w-6 h-6" /></a>
                <a href="#" className="text-gray-300 hover:text-juris-accent transition-colors hover:scale-125 transform duration-300"><Instagram className="w-6 h-6" /></a>
              </div>
            </div>
            {/* Links columns */}
            {[
              { title: "Cursos Populares", links: ["Prompt Engineering Jurídico", "Compliance & Ética AI", "Legal Ops Full Stack"] },
              { title: "Institucional", links: ["Sobre Nós", "Blog Jurídico", "Trabalhe Conosco"] },
              { title: "Atendimento", links: ["contato@jurisacademy.com.br", "Av. Paulista, 1000 - SP", "Suporte ao Aluno"] }
            ].map((col, idx) => (
               <div key={idx}>
                <h3 className="text-juris-900 font-bold mb-8 text-lg">{col.title}</h3>
                <ul className="space-y-4 text-base font-light">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}><a href="#" className="hover:text-juris-accent transition-colors hover:translate-x-2 inline-block duration-300 ease-elegant">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-10 text-sm flex justify-between items-center text-gray-400 font-light">
            <p>&copy; {new Date().getFullYear()} JurisAcademy.</p>
            <p>Feito para o futuro do Direito.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};