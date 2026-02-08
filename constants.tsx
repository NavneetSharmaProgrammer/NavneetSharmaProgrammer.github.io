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
  role: "Senior AI Engineer & Data Architect",
  location: "NOIDA, INDIA",
  email: "navneetsharmaprogrammer@gmail.com",
  phone: "+91-8630066072",
  systemId: "NS_ARCHITECT_V4",
  linkedIn: "https://www.linkedin.com/in/navneet-sharma-590862241",
  youtube: "https://www.youtube.com/@CodingWithNavneet",
  github: "https://github.com/NavneetSharmaProgrammer",
  instagram: "https://www.instagram.com/navneet_sharma_/",
  whatsapp: "https://wa.me/918630066072",
  resumeUrl: "https://drive.google.com/file/d/17NcRr-YBBp9gAW5n9evWhQsAHjQHKI7Q/view?usp=sharing",
  summary: "Architecting high-dimensional AI solutions. Specializing in Enterprise RAG Systems, Computer Vision Pipelines, and Strategic Data Analytics. Bridging the gap between raw data and executive decision-making.",
  currentStatus: "SYSTEM ONLINE / ARCHITECTING",
  currentRole: "Lead Data Scientist @ Croma Campus"
};

export const PROJECTS: Project[] = [
  {
    id: "rag-ai",
    title: "RAG KNOWLEDGE ENGINE",
    description: "Enterprise-grade Semantic Search Architecture. Leverages Vector Embeddings and LLM orchestration to reduce information retrieval latency by 90% for educational datasets.",
    tags: ["NLP", "VectorDB", "LLM Ops"],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://cdn.pixabay.com/video/2023/10/22/186115-877653483_large.mp4", // Abstract network
    date: "2025",
    stat: "90% LATENCY REDUCTION",
    keyTech: "Python, ChromaDB, OpenAI API"
  },
  {
    id: "vidsnap-ai",
    title: "VidSnap AUTOMATION SUITE",
    description: "End-to-end Generative AI pipeline. Orchestrates ElevenLabs API and FFmpeg microservices to fully automate content production, reducing manual editing time to zero.",
    tags: ["Gen-AI", "SaaS Arch", "CV"],
    imageUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://cdn.pixabay.com/video/2020/05/25/40139-425296497_large.mp4", // Abstract tech
    date: "2025",
    stat: "100% WORKFLOW AUTOMATION",
    keyTech: "Flask, FFmpeg, ElevenLabs"
  },
  {
    id: "social-graph-miner",
    title: "GRAPH TOPOLOGY ANALYZER",
    description: "High-performance data mining engine mapping 5,000+ nodes in the tech ecosystem. Utilizes graph theory to identify key influence clusters and connectivity patterns.",
    tags: ["Graph Theory", "Big Data"],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://cdn.pixabay.com/video/2020/12/09/58498-490320950_large.mp4", // Abstract connections
    date: "2024",
    stat: "5K+ NODES MAPPED",
    keyTech: "Python, BeautifulSoup, NetworkX"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  { 
    title: "Computational Core", 
    skills: ["Python", "Advanced SQL", "C++ Optimization"] 
  },
  { 
    title: "AI & ML Architecture", 
    skills: ["Scikit-Learn", "TensorFlow", "PyTorch", "LangChain Orchestration", "LLM APIs", "Whisper"] 
  },
  { 
    title: "Data Engineering", 
    skills: ["Pandas Pipelines", "NumPy", "BeautifulSoup", "NetworkX Graph"] 
  },
  { 
    title: "Business Intelligence", 
    skills: ["Power BI (Advanced DAX)", "Matplotlib", "Seaborn Analytics"] 
  },
  { 
    title: "Full-Stack Ops", 
    skills: ["Flask Microservices", "React.js", "Docker Containerization", "GitOps", "FFmpeg"] 
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Data Science Professional", issuer: "Croma Campus", date: "SEP 2025" },
  { title: "Python Architecture: Zero to Hero", issuer: "CodeWithHarry", date: "SEP 2025" },
  { title: "Full Stack Engineering", issuer: "Micro Info Tech Services", date: "JUN 2025" },
  { title: "TCS iON Career Edge", issuer: "Tata Consultancy Services", date: "JAN 2025" }
];