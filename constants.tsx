export interface Project {
  id: string;
  title: string;
  description: string;
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
  role: "AI/ML ENGINEER | FULL-STACK ARCHITECT",
  subRole: "DATA STORYTELLER",
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
  summary: "BCA Graduate (First Division) specializing in the Neural-Data nexus. I bridge the gap between complex AI/ML pipelines and high-performance full-stack applications. Currently scaling data literacy and predictive accuracy as a Data Science Trainee @ Croma Campus.",
  mission: "Focus Areas: RAG Pipelines, Predictive Analytics, MERN Stack, & Generative AI.",
  currentStatus: "Current: Data Science Trainee @ Croma Campus"
};

export const PROJECTS: Project[] = [
  {
    id: "rag-ai",
    title: "RAG AI ASSISTANT",
    description: "Built a semantic-aware system that uses Whisper for transcription and LangChain vector search to answer queries directly from video metadata.",
    tags: ["NLP", "Vector-DB", "Whisper", "Flask"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    date: "2025",
    stat: "FLAGSHIP AI",
    type: 'AI'
  },
  {
    id: "vidsnap-ai",
    title: "VidSnap AI",
    description: "Autonomous Content Engine. Orchestrated a Generative AI pipeline that automates viral video creation via ElevenLabs & FFmpeg managed via Flask.",
    tags: ["Gen-AI", "ElevenLabs", "FFmpeg", "Python"],
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    date: "2025",
    stat: "GEN-AI PRODUCT",
    type: 'GEN'
  },
  {
    id: "thrift-by-musk",
    title: "Thrift by Musk",
    description: "E-Commerce Module. Boosted user retention by 30% through engineered 'Saved Items' and mobile-first responsiveness. Zero layout shifts (CLS).",
    tags: ["React", "Redux", "Vercel", "Performance"],
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800",
    link: "https://thriftbymusk.vercel.app/",
    date: "2024",
    stat: "WEB METRIC",
    type: 'WEB'
  }
];

export const WORK_LOG: ExperienceItem[] = [
  { 
    inst: "Croma Campus | Noida", 
    role: "Data Science Trainee", 
    date: "SEP 2025 - PRESENT", 
    active: true, 
    log: "Dashboard Mastery: Designed interactive Power BI dashboards with 100% curriculum mastery. Predictive Modeling: Engineering scripts for Regression and Classification models to solve real-world finance and retail datasets." 
  },
  { 
    inst: "Micro Info Tech Services", 
    role: "Web Development Intern", 
    date: "MAY 2025 - JUN 2025", 
    active: false, 
    log: "Design Fidelity: Delivered 100% pixel-perfect responsive pages. Workflow Optimization: Reduced code merge conflicts by 20% by instituting standardized Git branching strategies." 
  },
  { 
    inst: "UptoSkills | Remote", 
    role: "Web Development Intern", 
    date: "JAN 2025 - APR 2025", 
    active: false, 
    log: "Built dynamic MERN Stack solutions. Integrated Redux.js state management & backend APIs." 
  },
  { 
    inst: "Maa Shakumbhari University", 
    role: "BCA Graduate (1st Div)", 
    date: "2025 GRADUATE", 
    active: false, 
    log: "Result: First Division (Distinction in Software Engineering). Specialized in the Neural-Data nexus." 
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  { 
    title: "Cognitive (AI/ML)", 
    skills: ["Python", "Pandas", "Scikit-Learn", "PyTorch", "RAG Pipelines", "LangChain", "NLP", "OpenCV"] 
  },
  { 
    title: "Intelligence (BI)", 
    skills: ["Power BI", "DAX", "SQL (T-SQL)", "Advanced Excel (VBA)"] 
  },
  { 
    title: "Structure (Web)", 
    skills: ["React.js", "Next.js", "Node.js", "Express", "Redux", "Tailwind CSS"] 
  },
  {
    title: "Engine (Tools)",
    skills: ["Git", "Vercel", "Flask APIs", "FastAPI", "Docker", "VS Code"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Data Science Professional", issuer: "Croma Campus", date: "SEP 2025" },
  { title: "Python Bootcamp: Zero to Hero", issuer: "CodeWithHarry", date: "SEP 2025" },
  { title: "Web Development Internship", issuer: "Micro Info Tech Services", date: "JUN 2025" },
  { title: "TCS iON Career Edge", issuer: "Tata Consultancy Services", date: "JAN 2025" },
  { title: "Responsive Web Design", issuer: "freeCodeCamp", date: "DEC 2024" }
];