
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
  github?: string;
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
  role: "AI/ML Developer & Python Backend Engineer",
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
  summary: "Python Backend Developer & Data Scientist. Specialized in RAG Pipelines, GenAI & Scalable ML Models. Seeking first full-time deployment in AI/ML roles.",
  mission: "Engineering. Data. Driven.",
  about: "I am a Python Backend Developer and Data Scientist-in-training, specializing in building robust data pipelines and intelligent GenAI systems. I don't just study algorithms—I build them. My engineering philosophy is rooted in hands-on system architecture, from optimizing complex SQL databases to developing and deploying functional machine learning models. Today, my primary execution thread is focused on Applied Generative AI. I am actively architecting systems that can 'think' and 'search' using frameworks like LangChain and ChromaDB, and I build the modular Python/Flask backends that bring these concepts to life.",
  idleMode: "When I am not actively coding, my focus shifts to continuous system upgrades: reverse-engineering hardware, exploring advancements in vector embeddings, and refining my data science workflows to stay at the cutting edge of LLM research.",
  currentStatus: "[ RECENT BCA GRADUATE // DATA SCIENCE TRAINEE ]"
};

export const PROJECTS: Project[] = [
  {
    id: "rag-ta",
    title: "RAG AI Teaching Assistant",
    brief: {
      constraint: "Students waste hours manually scrubbing through video lectures to find specific concepts or answers.",
      strategy: "Engineered a context-aware AI pipeline that transcribes audio via Whisper, converts text into vector embeddings in ChromaDB, and uses an LLM for Q&A.",
      outcome: "Enabled context-aware semantic search and accurate Q&A over video lecture archives."
    },
    tags: ["Python", "LangChain", "ChromaDB", "Whisper", "Vector Search"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/NavneetSharmaProgrammer",
    date: "2025",
    stat: "SEMANTIC SEARCH & LLMs",
    type: 'AI'
  },
  {
    id: "vidsnap-ai",
    title: "VidSnapAI Pipeline",
    brief: {
      constraint: "Video editing is a highly manual, time-consuming workflow requiring expensive software.",
      strategy: "Built a modular Flask backend handling async media processing, integrating AI voiceover APIs and FFmpeg.",
      outcome: "Automated 100% of the workflow, programmatically stitching audio and video."
    },
    tags: ["Python", "Flask", "FFmpeg", "REST APIs", "Gen-AI"],
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/NavneetSharmaProgrammer",
    date: "2025",
    stat: "GEN-AI PIPELINE",
    type: 'GEN'
  },
  {
    id: "hotel-analytics",
    title: "Hotel Booking Predictor",
    brief: {
      constraint: "Hotels lose revenue due to unpredictable booking cancellations.",
      strategy: "Processed 119,000+ records, cleaned missing values, engineered 10+ temporal features, and evaluated classification models.",
      outcome: "Identified seasonal trends and market behaviors, forecasting cancellations with high accuracy."
    },
    tags: ["Python", "Pandas", "Scikit-Learn", "EDA", "SQL", "Power BI"],
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/NavneetSharmaProgrammer",
    date: "2025",
    stat: "DATA ANALYTICS & CLASSIFICATION",
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
    title: "CORE PYTHON & SCRIPTING", 
    skills: ["Python (OOP & Advanced)", "Scripting & Automation", "Multithreading & Async", "Regex", "Error Handling & Debugging"] 
  },
  { 
    title: "AI, LLMs & GEN-AI", 
    skills: ["RAG", "LLMs", "LangChain", "OpenAI API (GPT, Whisper)", "Vector DBs (Chroma, Pinecone)", "Semantic Search"] 
  },
  { 
    title: "ML & DEEP LEARNING", 
    skills: ["End-to-End Pipelines", "Scikit-Learn", "TensorFlow & Keras", "Feature Engineering", "Model Tuning", "ML Algorithms"] 
  },
  { 
    title: "DATA ENGINEERING", 
    skills: ["Pandas", "NumPy", "EDA", "Matplotlib & Seaborn", "Web Scraping (BS4, Requests)"] 
  },
  { 
    title: "DATABASE ARCHITECTURE", 
    skills: ["SQL Architecture", "MS SQL Server & T-SQL", "MySQL", "Advanced Querying", "Stored Procedures & Triggers", "Data Structures"] 
  },
  { 
    title: "BI & REPORTING", 
    skills: ["Power BI (DAX)", "Advanced Excel", "Pivot Tables", "MIS Reporting", "Business Analytics"] 
  },
  { 
    title: "BACKEND & DEV TOOLS", 
    skills: ["Node.js", "Python Flask", "REST APIs", "Git & GitHub", "Jupyter Notebook", "Postman", "FFmpeg", "HTML/CSS"] 
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
