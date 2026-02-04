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
  // UPDATE YOUR RESUME URL BELOW
  resumeUrl: "https://drive.google.com/file/d/17NcRr-YBBp9gAW5n9evWhQsAHjQHKI7Q/view?usp=sharing", 
  summary: "BCA Graduate (First Division) from Maa Shakumbhari University with a strong passion for Data Science, AI/ML, and Full-Stack Development. Skilled in Python, SQL, Excel, Tableau, and JavaScript. I share my learning journey on YouTube to inspire the tech community.",
};

export const PROJECTS: Project[] = [
  {
    id: "ncaids",
    title: "NCAIDS Portal",
    description: "Navneet College of Artificial Intelligence and Data Science website. Highlighting academic offerings with a dynamic UI and AI-personalized content paths.",
    tags: ["React", "Flask", "MySQL", "Bootstrap"],
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    date: "2024-2025",
    stat: "Full-Stack AI"
  },
  {
    id: "vidsnap-ai",
    title: "VidSnapAI",
    description: "An AI-powered content generator. Orchestrating scripts, ElevenLabs voiceovers, and FFmpeg stitching into a seamless viral reel pipeline.",
    tags: ["Python", "Flask", "FFmpeg", "ElevenLabs"],
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    date: "2025",
    stat: "Automation"
  },
  {
    id: "thrift-by-musk",
    title: "Thrift by Musk",
    description: "A sustainable fashion resale platform promoting circular economy through peer-to-peer clothing exchange.",
    tags: ["Full Stack", "JavaScript", "E-commerce"],
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800",
    date: "2024",
    stat: "Web Platform"
  },
  {
    id: "bank-analysis",
    title: "Bank Statement Analysis",
    description: "Financial intelligence tool that parses bank statements to extract actionable spending insights and health metrics.",
    tags: ["Python", "Pandas", "Power BI", "Finance"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    date: "2024",
    stat: "Data Analysis"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  { title: "Data Science & AI", skills: ["Python", "Pandas", "NumPy", "Scikit-Learn", "NLP", "Computer Vision (OpenCV)", "Machine Learning"] },
  { title: "BI & Analytics", skills: ["Microsoft Power BI", "SQL (T-SQL)", "Tableau", "Excel (VBA)", "Data Visualization"] },
  { title: "Full Stack", skills: ["React.js", "Node.js", "Flask", "HTML/CSS", "JavaScript", "Git & GitHub"] }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Complete 2025 Python Bootcamp", issuer: "CodeWithHarry", date: "Sep 2025" },
  { title: "Data Science Trainee", issuer: "Croma Campus", date: "Sep 2025 - Present" },
  { title: "Web Development Internship", issuer: "Micro Information Tech Services", date: "Jun 2025" },
  { title: "Web Development Intern", issuer: "UptoSkills", date: "Apr 2025" }
];
