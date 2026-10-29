import { CVData } from '../types/cv';

export const sampleCVData: CVData = {
  personal: {
    fullName: 'Alejandro Morales Navarro',
    jobTitle: 'Diseñador de Producto Senior & Frontend',
    email: 'alejandro.morales@ejemplo.com',
    phone: '+34 612 345 678',
    city: 'Madrid',
    country: 'España',
    address: 'Paseo de la Castellana 124',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    linkedin: 'linkedin.com/in/alejandromorales',
    portfolio: 'moralesdesign.dev',
    website: 'github.com/amorales'
  },
  summary: 'Diseñador de producto con más de 7 años de experiencia liderando interfaces web y sistemas de diseño para empresas tecnológicas y startups SaaS. Especializado en diseño de interacción, arquitectura de información y desarrollo frontend con React y Tailwind. Apasionado por simplificar flujos complejos y optimizar tasas de conversión mediante investigación cuantitativa y cualitativa.',
  experience: [
    {
      id: 'exp-1',
      position: 'Senior Product Designer & Design Systems Lead',
      company: 'Novatech Digital Solutions',
      city: 'Madrid, España',
      startDate: '2022',
      endDate: 'Presente',
      current: true,
      description: 'Liderazgo del equipo de diseño de producto compuesto por 5 diseñadores y colaboración directa con 18 ingenieros frontend.',
      highlights: [
        'Creación y mantenimiento del Design System utilizado por 4 productos SaaS, reduciendo los tiempos de entrega un 35%.',
        'Rediseño completo del flujo de onboarding y checkout, incrementando la conversión en un 24% durante el primer trimestre.',
        'Implementación de pruebas con usuarios semanales y métricas de usabilidad SUS (System Usability Scale).'
      ]
    },
    {
      id: 'exp-2',
      position: 'Product Designer UI/UX',
      company: 'Kroma Studio & Labs',
      city: 'Barcelona, España',
      startDate: '2019',
      endDate: '2022',
      current: false,
      description: 'Conceptualización y prototipado de aplicaciones web y móviles para clientes fintech y e-commerce.',
      highlights: [
        'Diseño integral de la app de banca móvil para FintechPay, con más de 200.000 usuarios activos mensuales.',
        'Colaboración en la especificación técnica de componentes y animaciones microinteractivas en Figma y Storybook.',
        'Optimización de la accesibilidad del producto obteniendo conformidad estándar WCAG 2.1 nivel AA.'
      ]
    },
    {
      id: 'exp-3',
      position: 'Diseñador Web & Frontend Junior',
      company: 'PixelForge Agency',
      city: 'Valencia, España',
      startDate: '2017',
      endDate: '2019',
      current: false,
      description: 'Desarrollo de sitios web corporativos y landing pages orientadas a captación de leads.',
      highlights: [
        'Desarrollo de más de 30 sitios web responsivos con optimización SEO técnica y Lighthouse 95+.',
        'Diseño de identidades visuales y material gráfico digital para campañas multimercado.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Máster en Diseño de Interacción y Experiencia de Usuario (UX/UI)',
      institution: 'Universidad Politécnica de Madrid',
      city: 'Madrid',
      startDate: '2017',
      endDate: '2018',
      current: false,
      description: 'Graduado con Mención de Honor en el proyecto final enfocado en interfaces conversacionales y diseño accesible.'
    },
    {
      id: 'edu-2',
      degree: 'Grado en Diseño y Creación Digital',
      institution: 'Universidad de Valencia',
      city: 'Valencia',
      startDate: '2013',
      endDate: '2017',
      current: false,
      description: 'Formación multidisciplinar en comunicación visual, prototipado interactivo y desarrollo web.'
    }
  ],
  skills: [
    { id: 'sk-1', name: 'Product Design & UX', level: 'Experto' },
    { id: 'sk-2', name: 'Design Systems & Tokens', level: 'Experto' },
    { id: 'sk-3', name: 'Figma & Prototyping', level: 'Experto' },
    { id: 'sk-4', name: 'React & TypeScript', level: 'Avanzado' },
    { id: 'sk-5', name: 'Tailwind CSS', level: 'Avanzado' },
    { id: 'sk-6', name: 'User Testing & Data', level: 'Avanzado' },
    { id: 'sk-7', name: 'Wireframing & Flowcharts', level: 'Experto' },
    { id: 'sk-8', name: 'Accesibilidad (WCAG)', level: 'Avanzado' }
  ],
  languages: [
    { id: 'lang-1', language: 'Español', proficiency: 'Nativo' },
    { id: 'lang-2', language: 'Inglés', proficiency: 'Fluido' },
    { id: 'lang-3', language: 'Francés', proficiency: 'Intermedio' }
  ],
  additionalSections: [
    {
      id: 'certifications',
      type: 'certifications',
      title: 'Certificaciones',
      enabled: true,
      items: [
        {
          id: 'cert-1',
          title: 'Enterprise Design Thinking Practitioner',
          subtitle: 'IBM',
          date: '2023',
          description: 'Metodologías ágiles de diseño centrado en el usuario y cocreación de soluciones.'
        },
        {
          id: 'cert-2',
          title: 'Google UX Design Professional Certificate',
          subtitle: 'Google / Coursera',
          date: '2021',
          description: 'Especialización en investigación cualitativa, wireframes y pruebas iterativas.'
        }
      ]
    },
    {
      id: 'projects',
      type: 'projects',
      title: 'Proyectos Destacados',
      enabled: true,
      items: [
        {
          id: 'proj-1',
          title: 'Aura UI - Open Source Design System',
          subtitle: 'Proyecto de código abierto',
          date: '2023 - 2024',
          description: 'Biblioteca de más de 45 componentes React accesibles con más de 1.800 estrellas en GitHub.'
        }
      ]
    }
  ],
  design: {
    template: 'modern',
    primaryColor: '#2563eb', // JobStep blue
    secondaryColor: '#1e293b',
    fontFamily: 'font-jakarta',
    spacing: 'normal',
    fontSize: 'base',
    photoShape: 'rounded',
    showSectionIcons: true,
    sectionOrder: ['personal', 'summary', 'experience', 'education', 'skills', 'languages', 'certifications', 'projects']
  }
};

export const emptyCVData: CVData = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    address: '',
    photoUrl: '',
    linkedin: '',
    portfolio: '',
    website: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  additionalSections: [
    {
      id: 'certifications',
      type: 'certifications',
      title: 'Certificaciones',
      enabled: false,
      items: []
    },
    {
      id: 'courses',
      type: 'courses',
      title: 'Cursos & Capacitaciones',
      enabled: false,
      items: []
    },
    {
      id: 'projects',
      type: 'projects',
      title: 'Proyectos',
      enabled: false,
      items: []
    },
    {
      id: 'awards',
      type: 'awards',
      title: 'Reconocimientos y Premios',
      enabled: false,
      items: []
    },
    {
      id: 'references',
      type: 'references',
      title: 'Referencias Profesionales',
      enabled: false,
      items: []
    }
  ],
  design: {
    template: 'modern',
    primaryColor: '#2563eb',
    secondaryColor: '#1e293b',
    fontFamily: 'font-jakarta',
    spacing: 'normal',
    fontSize: 'base',
    photoShape: 'rounded',
    showSectionIcons: true,
    sectionOrder: ['personal', 'summary', 'experience', 'education', 'skills', 'languages']
  }
};
