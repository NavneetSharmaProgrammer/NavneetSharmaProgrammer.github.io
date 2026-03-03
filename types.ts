
export interface Project {
  id: string;
  title: string;
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

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  type: 'Internship' | 'Trainee' | 'Job';
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  id?: string;
  focus?: string;
}

export interface CourseModule {
  title: string;
  topics: string[];
}
