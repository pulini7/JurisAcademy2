import { Course, Testimonial, Instructor } from './types';

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Prompt Engineering Jurídico',
    description: 'Pare de usar o ChatGPT como um Google melhorado. Aprenda a criar comandos (prompts) que redigem petições iniciais, contestação e recursos com 90% de precisão técnica.',
    price: 497.00,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    features: ['Biblioteca de 500+ Prompts Jurídicos', 'Análise Contratual em Segundos', 'Estruturação de Teses Complexas'],
    level: 'Iniciante',
    duration: '20h'
  },
  {
    id: '2',
    title: 'Compliance & Ética na Era da IA',
    description: 'Proteja seus clientes e seu escritório. Domine a regulação de IA (EU AI Act, PL 2338/23) e implemente governança de dados para evitar alucinações e vazamentos.',
    price: 697.00,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    features: ['Adequação à LGPD e IA', 'Responsabilidade Civil de Algoritmos', 'Auditoria de Sistemas Autônomos'],
    level: 'Intermediário',
    duration: '35h'
  },
  {
    id: '3',
    title: 'Legal Ops & Automação Full Stack',
    description: 'A elite da advocacia não peticiona manualmente. Aprenda a conectar seu CRM com IA, automatizar fluxos de trabalho e criar "robôs" jurídicos sem saber programar.',
    price: 997.00,
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
    features: ['APIs do Gemini e OpenAI', 'Automação via n8n e Zapier', 'Dashboard de Jurimetria em Tempo Real'],
    level: 'Avançado',
    duration: '50h'
  }
];

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'i1',
    name: 'Dr. Roberto Mendes',
    role: 'Diretor Acadêmico',
    bio: 'Doutor em Direito pela USP e Pesquisador de IA em Stanford. Liderou a implementação de sistemas autônomos em escritórios Magic Circle.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'i2',
    name: 'Dra. Camila Yune',
    role: 'Especialista em Legal Ops',
    bio: 'Engenheira de Dados que virou Advogada. Criadora do método "Jurídico Ágil", utilizado por departamentos jurídicos da Fortune 500.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'i3',
    name: 'Prof. André Weber',
    role: 'Prompt Engineer Lead',
    bio: 'Ex-Google Brain. Especialista em fine-tuning de LLMs para o português jurídico e detecção de alucinações em contratos.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'i4',
    name: 'Dra. Sofia Alencar',
    role: 'Compliance & Regulação',
    bio: 'Autora do livro "O Direito dos Algoritmos". Consultora do Senado para o Marco Civil da Inteligência Artificial.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Dra. Ana Paula',
    role: 'Sócia de Grande Banca',
    content: 'Eu tinha medo da IA substituir meu trabalho. A JurisAcademy me mostrou que a IA substitui apenas a parte chata. Aumentei meu faturamento em 40% atendendo mais clientes.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 't2',
    name: 'Dr. Ricardo Gomes',
    role: 'Advogado Autônomo',
    content: 'O curso de Automação se pagou na primeira semana. Criei um fluxo que lê as publicações e já rascunha a resposta para mim. Inacreditável.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 't3',
    name: 'Mariana Silva',
    role: 'Head de Inovação',
    content: 'Didática impecável. Eles não ensinam "tecniquês", ensinam Direito com esteroides. Obrigatório para qualquer departamento jurídico moderno.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100'
  }
];

export const FAQ_ITEMS = [
  {
    question: "Preciso saber programar para fazer os cursos?",
    answer: "Não. 90% do conteúdo é focado em ferramentas 'No-Code' e engenharia de prompt em linguagem natural. O curso 'Full Stack' tem módulos introdutórios de lógica, mas é totalmente acessível para advogados."
  },
  {
    question: "Os cursos emitem certificado válido?",
    answer: "Sim. Todos os cursos possuem certificação de extensão universitária reconhecida, com carga horária e código de verificação de autenticidade para seu currículo ou LinkedIn."
  },
  {
    question: "E se eu não gostar do conteúdo?",
    answer: "Risco zero. Oferecemos garantia incondicional de 7 dias. Se você achar que o curso não revolucionou sua prática jurídica, devolvemos 100% do seu investimento."
  },
  {
    question: "Por quanto tempo tenho acesso?",
    answer: "O acesso é vitalício para a versão do curso adquirida, incluindo todas as atualizações que fizermos nos próximos 12 meses."
  }
];