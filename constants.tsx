
export interface Project {
  id: string;
  title: string;
  // Replaced generic description with structured engineering brief
  brief: {
    constraint: string;
    strategy: string;
    outcome: string;
  };
  tags: string[];
  imageUrl: string;
  link?: string;
  date: string;
  stat?: string;
  type?: 'AI' | 'WEB' | 'GEN';
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  focus: string; // Added to show specific skills learned
}

export interface ExperienceItem {
    inst: string;
    role: string;
    date: string;
    active: boolean;
    log: string;
}

export const PROFILE = {
  name: "Navneet Sharma",
  role: "AI ENGINEER",
  subRole: "RETRIEVAL SYSTEMS",
  location: "NOIDA, INDIA",
  email: "navneetsharmaprogrammer@gmail.com",
  phone: "+91-8630066072",
  systemId: "NS_8630066072",
  linkedIn: "https://www.linkedin.com/in/navneet-sharma-590862241/",
  youtube: "https://www.youtube.com/@CodingWithNavneet",
  github: "https://github.com/NavneetSharmaProgrammer",
  instagram: "https://www.instagram.com/navneet_sharma_/",
  whatsapp: "https://wa.me/918630066072",
  resumeUrl: "https://drive.google.com/file/d/17NcRr-YBBp9gAW5n9evWhQsAHjQHKI7Q/view?usp=sharing",
  summary: "I design systems that transform unstructured data into usable intelligence. My work focuses on Retrieval-Augmented Generation (RAG) architectures, predictive modeling, and data infrastructure. I prioritize performance, clarity, and deployment viability over experimentation.",
  mission: "Building systems that scale beyond notebooks.",
  currentStatus: "System Nominal"
};

export const PROJECTS: Project[] = [
  {
    id: "rag-system",
    title: "Semantic Retrieval System",
    brief: {
      constraint: "Keyword search failed to capture context in unstructured video transcripts.",
      strategy: "Implemented Whisper for transcription & LangChain vector embeddings for semantic indexing.",
      outcome: "Reduced retrieval latency by 40% and enabled natural-language Q&A over media assets."
    },
    tags: ["Python", "Vector Search", "Whisper", "Flask"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    date: "2025",
    stat: "RAG PIPELINE",
    type: 'AI'
  },
  {
    id: "gen-media",
    title: "Autonomous Media Pipeline",
    brief: {
      constraint: "Manual content creation workflows bottlenecked production scale.",
      strategy: "Orchestrated ElevenLabs (TTS) and FFmpeg via Flask for deterministic rendering.",
      outcome: "Fully automated asset generation pipeline, eliminating manual editing cycles."
    },
    tags: ["Python", "FFmpeg", "API Orchestration", "Auto-Agents"],
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    date: "2025",
    stat: "AUTOMATION",
    type: 'GEN'
  },
  {
    id: "ecommerce-core",
    title: "Data-Driven E-Commerce",
    brief: {
      constraint: "Complex state updates causing layout shifts and UI lag.",
      strategy: "Centralized Redux architecture with selective re-render control.",
      outcome: "Achieved 98/100 Lighthouse performance score with zero CLS."
    },
    tags: ["React", "Redux", "Performance", "UX Metric"],
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800",
    link: "https://thriftbymusk.vercel.app/",
    date: "2024",
    stat: "HIGH PERFORMANCE",
    type: 'WEB'
  }
];

export const WORK_LOG: ExperienceItem[] = [
  { 
    inst: "Croma Campus", 
    role: "Data Science Trainee", 
    date: "SEP 2025 - PRESENT", 
    active: true, 
    log: "Developed predictive regression models and structured ETL workflows. Built Power BI dashboards translating raw data into executive-ready insights." 
  },
  { 
    inst: "Micro Info Tech", 
    role: "Web Development Intern", 
    date: "MAY 2025 - JUN 2025", 
    active: false, 
    log: "Optimized frontend architecture reducing load times. Standardized Git branching strategies to eliminate merge conflicts during deployment." 
  },
  { 
    inst: "UptoSkills", 
    role: "Full Stack Intern", 
    date: "JAN 2025 - APR 2025", 
    active: false, 
    log: "Built dynamic MERN solutions with Redux state management. Integrated backend REST APIs for production-grade data flow." 
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  { 
    title: "MACHINE LEARNING", 
    skills: ["Python", "Scikit-learn", "PyTorch", "Feature Engineering", "NLP"] 
  },
  { 
    title: "DATA INFRASTRUCTURE", 
    skills: ["SQL", "Vector Databases", "ETL Workflows", "Pandas", "RAG"] 
  },
  { 
    title: "DEPLOYMENT & INTERFACE", 
    skills: ["Flask", "React", "State Management", "API Integration", "Git"] 
  },
  {
    title: "VISUALIZATION",
    skills: ["Power BI", "DAX", "Matplotlib", "Data Modeling"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { 
    title: "Python Systems Engineering", 
    issuer: "CodeWithHarry", 
    date: "2025",
    focus: "Object-Oriented Design • API Integration • Flask Backends"
  },
  { 
    title: "Data Science Training", 
    issuer: "Croma Campus", 
    date: "2025", 
    focus: "ML Modeling • SQL Pipelines • BI Dashboards"
  },
  { 
    title: "Frontend Engineering Intern", 
    issuer: "Micro Info Tech", 
    date: "2025", 
    focus: "Performance Optimization • Git Workflow Standardization"
  },
];
