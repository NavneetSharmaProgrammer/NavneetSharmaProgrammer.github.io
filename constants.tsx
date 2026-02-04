export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
  date: string;
  stat?: string;
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

export const PROFILE = {
  name: "Navneet Sharma",
  role: "Aspiring Data Scientist & Full-Stack Developer",
  location: "NOIDA, UTTAR PRADESH",
  email: "navneetsharmaprogrammer@gmail.com",
  systemId: "NS_8630066072",
  linkedIn: "https://www.linkedin.com/in/navneetsharma-590862241",
  youtube: "https://www.youtube.com/@CodingWithNavneet",
  github: "https://github.com/NavneetSharmaProgrammer",
  instagram: "https://www.instagram.com/navneet_sharma_/",
  // CURRENT RESUME URL
  resumeUrl: "https://drive.google.com/file/d/17NcRr-YBBp9gAW5n9evWhQsAHjQHKI7Q/view?usp=sharing", 
  summary: "Aspiring Data Scientist & Full-Stack Developer with a First Division BCA. Specializing in AI/ML Pipelines and Power BI Analytics.",
  currentStatus: "Current: Data Science Trainee @ Croma Campus Pvt. Ltd."
};

export const PROJECTS: Project[] = [
  {
    id: "rag-ai",
    title: "RAG AI TEACHING ASSISTANT",
    description: "Semantic-aware assistant. Decodes lecture streams via Whisper & answers queries using LangChain vector search.",
    tags: ["NLP", "VECTOR-DB"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    date: "2025",
    stat: "FLAGSHIP AI"
  },
  {
    id: "vidsnap-ai",
    title: "VidSnapAI",
    description: "Orchestrated pipeline for viral content generation. Integrates ElevenLabs audio & FFmpeg video stitching via Flask.",
    tags: ["AUTO-GEN", "FLASK"],
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    date: "2025",
    stat: "GEN-AI PRODUCT"
  },
  {
    id: "sales-forecast",
    title: "SALES FORECAST MODEL",
    description: "Predictive modeling pipeline using Regression algorithms to forecast revenue trends with 85% Accuracy.",
    tags: ["SCIKIT-LEARN", "PREDICTIVE"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    date: "2024",
    stat: "ANALYTICS ENGINE"
  },
  {
    id: "thrift-by-musk",
    title: "THRIFT BY MUSK",
    description: "Sustainable fashion resale platform designed for peer-to-peer clothing exchange.",
    tags: ["E-COMMERCE", "MERN"],
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800",
    link: "https://thriftbymusk.vercel.app/",
    date: "2024",
    stat: "WEB MODULE"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  { 
    title: "Core Logic", 
    skills: ["Python (Pandas, NumPy, Scikit-Learn)", "NLP & RAG Pipelines", "Flask APIs"] 
  },
  { 
    title: "Analytics Engine", 
    skills: ["Power BI (DAX, Modeling)", "Advanced Excel (VBA)", "SQL (T-SQL, MySQL)"] 
  },
  { 
    title: "Frontend/Full-Stack", 
    skills: ["React.js / Next.js", "Redux.js", "Tailwind CSS"] 
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Data Science Professional", issuer: "Croma Campus", date: "Present" },
  { title: "Python Bootcamp: Zero to Hero", issuer: "CodeWithHarry", date: "SEP 2025" },
  { title: "Web Development Internship", issuer: "Micro Info Tech (MITS206093)", date: "JUN 2025" },
  { title: "TCS iON Career Edge", issuer: "Tata Consultancy Services", date: "JAN 2025" },
  { title: "Responsive Web Design", issuer: "freeCodeCamp", date: "DEC 2024" }
];
