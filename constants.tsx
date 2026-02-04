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
  role: "Aspiring Data Scientist | Python Practitioner",
  location: "Noida, Uttar Pradesh, India",
  email: "navneetsharmanonu@gmail.com",
  linkedIn: "https://www.linkedin.com/in/navneetsharma-590862241",
  youtube: "https://www.youtube.com/@CodingWithNavneet",
  github: "https://github.com/NavneetSharmaProgrammer",
  instagram: "https://www.instagram.com/navneet_sharma_/",
  // CURRENT RESUME URL
  resumeUrl: "https://drive.google.com/file/d/17NcRr-YBBp9gAW5n9evWhQsAHjQHKI7Q/view?usp=sharing", 
  summary: "BCA Graduate (First Division) from Maa Shakumbhari University. Specializing in AI/ML Pipelines, Predictive Modeling, and Power BI Analytics. I build scalable GenAI products and data-driven solutions.",
};

export const PROJECTS: Project[] = [
  {
    id: "rag-ai",
    title: "RAG AI Teaching Assistant",
    description: "Semantic-aware assistant that decodes lecture streams via OpenAI Whisper and answers queries using LangChain vector search.",
    tags: ["NLP", "Vector-DB", "LangChain"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    date: "2025",
    stat: "Flagship AI"
  },
  {
    id: "vidsnap-ai",
    title: "VidSnapAI",
    description: "Orchestrated pipeline for viral content generation. Integrates ElevenLabs audio synthesis and FFmpeg video stitching via Flask.",
    tags: ["GenAI", "Flask", "FFmpeg"],
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    date: "2025",
    stat: "Automation"
  },
  {
    id: "sales-forecast",
    title: "Sales Forecast Model",
    description: "Predictive modeling pipeline using Scikit-Learn to forecast revenue trends with 85% accuracy using historical sales data.",
    tags: ["Predictive", "ML", "Pandas"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    date: "2024",
    stat: "85% Accuracy"
  },
  {
    id: "ncaids",
    title: "NCAIDS Portal",
    description: "Modern, responsive website for Navneet College of AI & Data Science. Features dynamic admissions and academic tracking.",
    tags: ["React", "Bootstrap", "MySQL"],
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    date: "2024",
    stat: "Full Stack"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  { 
    title: "Core Logic (DS & AI)", 
    skills: ["Python", "Pandas", "NumPy", "Scikit-Learn", "NLP & RAG", "Computer Vision (OpenCV)", "Machine Learning"] 
  },
  { 
    title: "Analytics Engine", 
    skills: ["Power BI (DAX)", "Advanced Excel (VBA)", "SQL (T-SQL, MySQL)", "Tableau", "Data Modeling"] 
  },
  { 
    title: "Full Stack Array", 
    skills: ["React.js", "Next.js", "Redux.js", "Flask", "Node.js", "Tailwind CSS", "Git & GitHub"] 
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Data Science Professional", issuer: "Croma Campus", date: "Present" },
  { title: "Python Bootcamp: Zero to Hero", issuer: "CodeWithHarry", date: "Sep 2025" },
  { title: "Web Development (MITS206093)", issuer: "Micro Info Tech", date: "Jun 2025" },
  { title: "TCS iON Career Edge", issuer: "Tata Consultancy Services", date: "Jan 2025" },
  { title: "Responsive Web Design", issuer: "freeCodeCamp", date: "Dec 2024" }
];
