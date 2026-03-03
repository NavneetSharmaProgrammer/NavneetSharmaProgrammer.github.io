
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
  role: "PYTHON BACKEND & DATA SCIENCE ENGINEER",
  subRole: "AI & ANALYTICS",
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
  summary: "Driven Data Science Practitioner and Python Developer specializing in Python backend architecture (Flask), Machine Learning pipelines, and advanced data visualization. Proven ability to translate raw data into actionable business intelligence and build end-to-end applications.",
  mission: "Translating raw data into actionable business intelligence.",
  currentStatus: "System Nominal"
};

export const PROJECTS: Project[] = [
  {
    id: "hotel-analytics",
    title: "Hotel Booking Analytics",
    brief: {
      constraint: "Processed a massive real-world dataset of 119,000+ records with missing values.",
      strategy: "Conducted deep EDA using Pandas, Matplotlib, and Seaborn to uncover cancellation drivers.",
      outcome: "Identified seasonal trends and market behaviors, preparing data for high-accuracy ML modeling."
    },
    tags: ["Python", "Pandas", "EDA", "Seaborn"],
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    date: "2025",
    stat: "DATA ANALYTICS",
    type: 'AI'
  },
  {
    id: "vidsnap-ai",
    title: "VidSnapAI Pipeline",
    brief: {
      constraint: "Manual video content creation workflows were highly inefficient.",
      strategy: "Engineered a Flask backend integrating FFmpeg and AI voiceover APIs for automated rendering.",
      outcome: "Reduced manual editing workflows by 100% through a fully automated content pipeline."
    },
    tags: ["Flask", "FFmpeg", "Python", "REST API"],
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    date: "2025",
    stat: "GEN-AI PIPELINE",
    type: 'GEN'
  },
  {
    id: "rag-ta",
    title: "RAG AI Teaching Assistant",
    brief: {
      constraint: "Difficulty in querying unstructured video lecture content efficiently.",
      strategy: "Built a RAG pipeline using OpenAI Whisper for transcription and vector embeddings for search.",
      outcome: "Enabled context-aware semantic search and accurate Q&A over video lecture archives."
    },
    tags: ["LLMs", "Vector Search", "Whisper", "RAG"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    date: "2025",
    stat: "SEMANTIC SEARCH",
    type: 'AI'
  }
];

export const WORK_LOG: ExperienceItem[] = [
  { 
    inst: "Croma Campus Pvt. Ltd.", 
    role: "Data Science Trainee", 
    date: "SEP 2025 - PRESENT", 
    active: true, 
    log: "Developing memory-efficient Python scripts for data wrangling and Scikit-Learn predictive models. Designing interactive Power BI dashboards with advanced DAX and T-SQL querying." 
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  { 
    title: "CORE & WEB", 
    skills: ["Python (OOP)", "Flask", "REST APIs", "Web Scraping", "HTML/CSS"] 
  },
  { 
    title: "DATA SCIENCE & ML", 
    skills: ["Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "Deep Learning", "EDA"] 
  },
  { 
    title: "DATABASES", 
    skills: ["MS SQL Server", "T-SQL", "MySQL", "Stored Procedures", "Triggers"] 
  },
  {
    title: "BI & TOOLS",
    skills: ["Power BI (DAX)", "Advanced Excel", "Git/GitHub", "FFmpeg", "LLMs"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { 
    title: "Professional in Data Science", 
    issuer: "Croma Campus", 
    date: "2025",
    focus: "Python Data Engineering • ML Modeling • SQL Architecture"
  },
  { 
    title: "Bachelor of Computer Applications", 
    issuer: "Maa Shakumbhari University", 
    date: "2025", 
    focus: "First Division • Software Engineering • Data Structures"
  },
  { 
    title: "Job Ready Data Science", 
    issuer: "CodeWithHarry", 
    date: "2025", 
    focus: "End-to-End ML Pipelines • Real-world Data Projects"
  },
  { 
    title: "Complete Python Bootcamp", 
    issuer: "CodeWithHarry", 
    date: "2025", 
    focus: "Advanced Python • Scripting • Automation"
  }
];
