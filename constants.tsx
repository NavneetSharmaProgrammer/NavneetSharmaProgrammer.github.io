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
  location: "Noida, India",
  email: "navneetsharmaprogrammer@gmail.com",
  linkedIn: "https://www.linkedin.com/in/navneet-sharma-590862241",
  youtube: "https://tr.ee/Ri2vcwyJX4",
  github: "https://github.com/NavneetSharmaProgrammer",
  instagram: "https://tr.ee/vsIdfGEAju",
  summary: "Aspiring Data Scientist and Full-Stack Developer with a First Division BCA (2025). Specializing in Python (AI/ML) and Power BI for data analytics, backed by strong MERN Stack development skills. Proven ability to build deployed applications and secure data pipelines.",
};

export const PROJECTS: Project[] = [
  {
    id: "rag-ai",
    title: "RAG AI Assistant",
    description: "Video-to-Text Intelligence. Transcribes lectures using OpenAI Whisper and answers student queries using vector search (LangChain).",
    tags: ["LangChain", "OpenAI", "Python", "Whisper"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    date: "2025",
    stat: "Flagship"
  },
  {
    id: "vidsnap-ai",
    title: "VidSnapAI",
    description: "A GenAI pipeline that automates video creation using ElevenLabs for AI audio and FFmpeg for media processing via a Flask backend.",
    tags: ["Python", "Flask", "FFmpeg", "ElevenLabs"],
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    date: "2024",
    stat: "90% Efficiency Gain"
  },
  {
    id: "real-estate-ml",
    title: "Real Estate Valuation",
    description: "End-to-end ML pipeline predicting Gurgaon property prices using Stratified Shuffle Split and Custom Transformation Pipelines.",
    tags: ["Scikit-Learn", "Pipelines", "Pandas", "Math"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    date: "2024",
    stat: "Low RMSE"
  }
];

export const EXPERIENCE = [
  {
    role: "Data Science Trainee",
    company: "Croma Campus Pvt. Ltd.",
    period: "Sep 2025 - Present",
    desc: "Developing Python scripts for data cleaning and Scikit-Learn for predictive modeling. Mastering DAX and interactive Power BI dashboards."
  },
  {
    role: "Web Development Intern",
    company: "Micro Info Tech Services",
    period: "May 2025 - Jun 2025",
    desc: "Developed responsive pages using HTML5/CSS3/JS. Implemented Git workflows and authored technical documentation."
  },
  {
    role: "Web Development Intern",
    company: "UptoSkills",
    period: "Jan 2025 - Apr 2025",
    desc: "Built dynamic full-stack solutions using MERN Stack and Redux.js for state management."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  { title: "Data Science & AI", skills: ["Python", "Pandas", "NumPy", "Scikit-Learn", "NLP", "RAG Pipelines"] },
  { title: "BI & Analytics", skills: ["Power BI (DAX)", "SQL (T-SQL)", "Data Modeling", "Excel (VBA)"] },
  { title: "Full Stack", skills: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "Tailwind CSS"] }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Complete 2025 Python Bootcamp", issuer: "CodeWithHarry", date: "Sep 2025" },
  { title: "Web Development Internship", issuer: "Micro Info Tech Services", date: "Jun 2025" },
  { title: "TCS iON Career Edge", issuer: "Tata Consultancy Services", date: "Jan 2025" },
  { title: "Responsive Web Design", issuer: "freeCodeCamp", date: "Dec 2024" }
];
