export interface LinkedInProfile {
  name: string;
  headline: string;
  location: string;
  connections: number;
  profileUrl: string;
  profileImage?: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  location: string;
  description?: string;
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  duration: string;
}

export interface Skill {
  name: string;
  endorsements: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface AnalysisInsight {
  category: string;
  score: number;
  description: string;
  recommendations: string[];
}

export interface ProfileAnalysis {
  profile: LinkedInProfile;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  insights: AnalysisInsight[];
  overallScore: number;
  strengths: string[];
  areasForImprovement: string[];
  careerProgression: {
    totalYears: number;
    companiesWorked: number;
    averageTenure: number;
    careerGrowth: 'Ascending' | 'Lateral' | 'Varied';
  };
}