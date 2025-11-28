import { ProfileAnalysis, LinkedInProfile, Experience, Education, Skill, AnalysisInsight } from '@/types/linkedin';

export const validateLinkedInUrl = (url: string): boolean => {
  const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
  return linkedinPattern.test(url);
};

export const extractUsernameFromUrl = (url: string): string => {
  const match = url.match(/linkedin\.com\/in\/([\w-]+)/);
  return match ? match[1] : '';
};

export const generateMockAnalysis = (profileUrl: string): ProfileAnalysis => {
  const username = extractUsernameFromUrl(profileUrl);
  
  // Mock profile data based on the provided URL
  const mockProfile: LinkedInProfile = {
    name: username === 'zair-tairov-55570920' ? 'Zair Tairov' : 'Professional Name',
    headline: username === 'zair-tairov-55570920' 
      ? 'Senior Software Engineer | Full-Stack Developer | Tech Lead'
      : 'Professional Title | Industry Expert | Leader',
    location: username === 'zair-tairov-55570920' ? 'Kazakhstan' : 'Location',
    connections: Math.floor(Math.random() * 500) + 100,
    profileUrl: profileUrl,
  };

  const mockExperience: Experience[] = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Company',
      duration: '2020 - Present',
      location: 'Remote',
      description: 'Leading development of scalable web applications and mentoring junior developers.'
    },
    {
      title: 'Software Developer',
      company: 'Previous Company',
      duration: '2018 - 2020',
      location: 'City, Country',
      description: 'Developed and maintained web applications using modern technologies.'
    },
    {
      title: 'Junior Developer',
      company: 'Startup Inc.',
      duration: '2016 - 2018',
      location: 'City, Country',
      description: 'Started career in software development, worked on various projects.'
    }
  ];

  const mockEducation: Education[] = [
    {
      school: 'University of Technology',
      degree: 'Bachelor\'s Degree',
      field: 'Computer Science',
      duration: '2012 - 2016'
    }
  ];

  const mockSkills: Skill[] = [
    { name: 'JavaScript', endorsements: 45, level: 'Expert' },
    { name: 'React', endorsements: 38, level: 'Advanced' },
    { name: 'Node.js', endorsements: 32, level: 'Advanced' },
    { name: 'TypeScript', endorsements: 28, level: 'Advanced' },
    { name: 'Python', endorsements: 25, level: 'Intermediate' },
    { name: 'AWS', endorsements: 22, level: 'Intermediate' },
    { name: 'Docker', endorsements: 18, level: 'Intermediate' },
    { name: 'MongoDB', endorsements: 15, level: 'Intermediate' }
  ];

  const mockInsights: AnalysisInsight[] = [
    {
      category: 'Profile Completeness',
      score: 85,
      description: 'Profile has most essential information filled out',
      recommendations: [
        'Add more detailed work descriptions',
        'Include portfolio links or projects',
        'Add professional certifications'
      ]
    },
    {
      category: 'Network Strength',
      score: 72,
      description: 'Good professional network with room for growth',
      recommendations: [
        'Connect with more industry professionals',
        'Engage more with posts and content',
        'Join relevant professional groups'
      ]
    },
    {
      category: 'Content Activity',
      score: 60,
      description: 'Limited content sharing and engagement',
      recommendations: [
        'Share industry insights regularly',
        'Comment on relevant posts',
        'Publish articles about expertise'
      ]
    },
    {
      category: 'Skills Validation',
      score: 78,
      description: 'Good skill endorsements with strong technical focus',
      recommendations: [
        'Seek more endorsements for key skills',
        'Add emerging technology skills',
        'Take skill assessments'
      ]
    }
  ];

  return {
    profile: mockProfile,
    experience: mockExperience,
    education: mockEducation,
    skills: mockSkills,
    insights: mockInsights,
    overallScore: 74,
    strengths: [
      'Strong technical background',
      'Consistent career progression',
      'Good skill endorsements',
      'Professional headline optimization'
    ],
    areasForImprovement: [
      'Increase content engagement',
      'Expand professional network',
      'Add more project details',
      'Include certifications'
    ],
    careerProgression: {
      totalYears: 8,
      companiesWorked: 3,
      averageTenure: 2.7,
      careerGrowth: 'Ascending'
    }
  };
};

export const exportAnalysisToJson = (analysis: ProfileAnalysis): string => {
  return JSON.stringify(analysis, null, 2);
};

export const exportAnalysisToText = (analysis: ProfileAnalysis): string => {
  return `
LinkedIn Profile Analysis Report
================================

Profile Information:
- Name: ${analysis.profile.name}
- Headline: ${analysis.profile.headline}
- Location: ${analysis.profile.location}
- Connections: ${analysis.profile.connections}

Overall Score: ${analysis.overallScore}/100

Career Progression:
- Total Experience: ${analysis.careerProgression.totalYears} years
- Companies Worked: ${analysis.careerProgression.companiesWorked}
- Average Tenure: ${analysis.careerProgression.averageTenure} years
- Growth Pattern: ${analysis.careerProgression.careerGrowth}

Top Skills:
${analysis.skills.slice(0, 5).map(skill => `- ${skill.name} (${skill.endorsements} endorsements, ${skill.level})`).join('\n')}

Strengths:
${analysis.strengths.map(strength => `- ${strength}`).join('\n')}

Areas for Improvement:
${analysis.areasForImprovement.map(area => `- ${area}`).join('\n')}

Analysis Insights:
${analysis.insights.map(insight => `
${insight.category} (Score: ${insight.score}/100):
${insight.description}
Recommendations:
${insight.recommendations.map(rec => `- ${rec}`).join('\n')}
`).join('\n')}
  `.trim();
};