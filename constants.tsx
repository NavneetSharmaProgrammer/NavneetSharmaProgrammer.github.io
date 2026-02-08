export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  videoUrl?: string; // New field for hover reveal
  link?: string;
  date: string;
  stat?: string;
  keyTech?: string;
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
  role: "Data Scientist & AI Engineer",
  location: "NOIDA, UTTAR PRADESH",
  email: "navneetsharmaprogrammer@gmail.com",
  phone: "+91-8630066072",
  systemId: "NS_8630066072",
  linkedIn: "https://www.linkedin.com/in/navneet-sharma-590862241",
  youtube: "https://www.youtube.com/@CodingWithNavneet",
  github: "https://github.com/NavneetSharmaProgrammer",
  instagram: "https://www.instagram.com/navneet_sharma_/",
  whatsapp: "https://wa.me/918630066072",
  resumeUrl: "https://drive.google.com/file/d/17NcRr-YBBp9gAW5n9evWhQsAHjQHKI7Q/view?usp=sharing",
  summary: "Navneet Sharma here. Data Scientist & AI Engineer. Specializing in Generative AI, RAG Pipelines, and Predictive Analytics.",
  currentStatus: "ONLINE / OPEN TO WORK",
  currentRole: "Data Science Trainee @ Croma Campus Pvt. Ltd."
};

export const PROJECTS: Project[] = [
  {
    id: "rag-ai",
    title: "RAG AI TEACHING ASSISTANT",
    description: "Built a semantic search engine. It transcribes video using OpenAI Whisper, embeds text into a Vector DB, and answers queries using LangChain.",
    tags: ["NLP", "VectorDB", "LLM"],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://cdn.pixabay.com/video/2023/10/22/186115-877653483_large.mp4", // Abstract network
    date: "2025",
    stat: "FLAGSHIP AI",
    keyTech: "Python, ChromaDB, OpenAI API"
  },
  {
    id: "vidsnap-ai",
    title: "VidSnapAI",
    description: "Engineered a 100% automated pipeline. It uses ElevenLabs for AI voiceovers and FFmpeg to stitch visuals/audio via a Flask backend.",
    tags: ["Auto-Gen", "SaaS", "CV"],
    imageUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40139-425296497_large.mp4", // Abstract tech
    date: "2025",
    stat: "Automated 100% of Workflow",
    keyTech: "Flask, FFmpeg, ElevenLabs"
  },
  {
    id: "social-graph-miner",
    title: "SOCIAL GRAPH MINER",
    description: "Developed a custom Python scraper to map 5,000+ influencer nodes in the Bangalore tech community.",
    tags: ["Data Mining", "Network Analysis"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://cdn.pixabay.com/video/2020/12/09/58498-490320950_large.mp4", // Abstract connections
    date: "2024",
    stat: "5,000+ Nodes Mapped",
    keyTech: "Python, BeautifulSoup, NetworkX"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  { 
    title: "Core Logic", 
    skills: ["Python", "SQL (T-SQL)", "C++"] 
  },
  { 
    title: "AI/ML Frameworks", 
    skills: ["Scikit-Learn", "TensorFlow", "PyTorch", "LangChain", "OpenAI API", "Whisper"] 
  },
  { 
    title: "Data Ops", 
    skills: ["Pandas", "NumPy", "BeautifulSoup", "NetworkX"] 
  },
  { 
    title: "Visualization", 
    skills: ["Power BI (DAX)", "Matplotlib", "Seaborn"] 
  },
  { 
    title: "Development", 
    skills: ["Flask", "React.js", "Tailwind CSS", "Git/GitHub", "Docker", "FFmpeg"] 
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Data Science Professional", issuer: "Croma Campus", date: "SEP 2025" },
  { title: "Python Bootcamp: Zero to Hero", issuer: "CodeWithHarry", date: "SEP 2025" },
  { title: "Web Development Internship", issuer: "Micro Info Tech Services", date: "JUN 2025" },
  { title: "TCS iON Career Edge", issuer: "Tata Consultancy Services", date: "JAN 2025" }
];