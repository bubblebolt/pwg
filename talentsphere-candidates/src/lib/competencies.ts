export interface Competency {
  id: string;
  name: string;
  category: string;
  description: string;
  sampleQuestions: string[];
  estimatedTime: number; // in minutes
}

export const competencies: Competency[] = [
  // Technical Skills
  {
    id: 'tech-1',
    name: 'Programming Languages',
    category: 'Technical',
    description: 'Proficiency in programming languages relevant to the role',
    sampleQuestions: [
      'What programming languages are you most comfortable with?',
      'Can you walk me through a complex algorithm you implemented?',
      'How do you stay updated with new programming languages?'
    ],
    estimatedTime: 15
  },
  {
    id: 'tech-2',
    name: 'System Design',
    category: 'Technical',
    description: 'Ability to design scalable and maintainable systems',
    sampleQuestions: [
      'How would you design a URL shortener service?',
      'Explain the trade-offs between microservices and monoliths',
      'How do you handle database scaling challenges?'
    ],
    estimatedTime: 20
  },
  {
    id: 'tech-3',
    name: 'Database Management',
    category: 'Technical',
    description: 'Knowledge of database design, optimization, and management',
    sampleQuestions: [
      'Explain the difference between SQL and NoSQL databases',
      'How do you optimize slow database queries?',
      'Describe your experience with database migrations'
    ],
    estimatedTime: 12
  },
  {
    id: 'tech-4',
    name: 'Cloud Computing',
    category: 'Technical',
    description: 'Experience with cloud platforms and services',
    sampleQuestions: [
      'What cloud platforms have you worked with?',
      'How do you ensure security in cloud deployments?',
      'Explain your experience with containerization'
    ],
    estimatedTime: 15
  },
  {
    id: 'tech-5',
    name: 'DevOps & CI/CD',
    category: 'Technical',
    description: 'Knowledge of development operations and continuous integration',
    sampleQuestions: [
      'Describe your CI/CD pipeline setup',
      'How do you handle deployment rollbacks?',
      'What monitoring tools do you use?'
    ],
    estimatedTime: 18
  },
  {
    id: 'tech-6',
    name: 'API Development',
    category: 'Technical',
    description: 'Experience in designing and implementing APIs',
    sampleQuestions: [
      'How do you design RESTful APIs?',
      'Explain API versioning strategies',
      'How do you handle API rate limiting?'
    ],
    estimatedTime: 12
  },
  {
    id: 'tech-7',
    name: 'Frontend Development',
    category: 'Technical',
    description: 'Skills in frontend technologies and frameworks',
    sampleQuestions: [
      'What frontend frameworks do you prefer and why?',
      'How do you ensure responsive design?',
      'Explain your approach to state management'
    ],
    estimatedTime: 15
  },
  {
    id: 'tech-8',
    name: 'Backend Development',
    category: 'Technical',
    description: 'Server-side development and architecture skills',
    sampleQuestions: [
      'How do you structure backend applications?',
      'Explain your approach to error handling',
      'How do you ensure backend security?'
    ],
    estimatedTime: 15
  },
  {
    id: 'tech-9',
    name: 'Testing & QA',
    category: 'Technical',
    description: 'Knowledge of testing methodologies and quality assurance',
    sampleQuestions: [
      'What testing strategies do you implement?',
      'How do you write effective unit tests?',
      'Explain your approach to integration testing'
    ],
    estimatedTime: 12
  },
  {
    id: 'tech-10',
    name: 'Security',
    category: 'Technical',
    description: 'Understanding of cybersecurity principles and practices',
    sampleQuestions: [
      'How do you implement authentication and authorization?',
      'What security vulnerabilities should developers be aware of?',
      'Explain your approach to data encryption'
    ],
    estimatedTime: 15
  },

  // Soft Skills
  {
    id: 'soft-1',
    name: 'Communication',
    category: 'Soft Skills',
    description: 'Ability to communicate effectively with team members and stakeholders',
    sampleQuestions: [
      'How do you explain technical concepts to non-technical stakeholders?',
      'Describe a time when you had to communicate bad news to a client',
      'How do you handle miscommunication in a team?'
    ],
    estimatedTime: 10
  },
  {
    id: 'soft-2',
    name: 'Leadership',
    category: 'Soft Skills',
    description: 'Ability to lead and guide team members',
    sampleQuestions: [
      'Describe a time when you had to lead a challenging project',
      'How do you motivate team members during difficult times?',
      'What is your approach to mentoring junior developers?'
    ],
    estimatedTime: 12
  },
  {
    id: 'soft-3',
    name: 'Problem Solving',
    category: 'Soft Skills',
    description: 'Analytical thinking and creative problem-solving abilities',
    sampleQuestions: [
      'Describe the most challenging technical problem you solved',
      'How do you approach debugging complex issues?',
      'What is your process for breaking down large problems?'
    ],
    estimatedTime: 10
  },
  {
    id: 'soft-4',
    name: 'Teamwork',
    category: 'Soft Skills',
    description: 'Ability to work effectively in team environments',
    sampleQuestions: [
      'Describe your ideal team dynamic',
      'How do you handle conflicts within a team?',
      'What role do you typically play in group projects?'
    ],
    estimatedTime: 8
  },
  {
    id: 'soft-5',
    name: 'Time Management',
    category: 'Soft Skills',
    description: 'Ability to manage time and prioritize tasks effectively',
    sampleQuestions: [
      'How do you prioritize tasks when everything seems urgent?',
      'Describe a time when you had to meet a tight deadline',
      'What tools do you use to manage your time?'
    ],
    estimatedTime: 8
  },
  {
    id: 'soft-6',
    name: 'Adaptability',
    category: 'Soft Skills',
    description: 'Ability to adapt to changing environments and requirements',
    sampleQuestions: [
      'How do you handle changing project requirements?',
      'Describe a time when you had to learn a new technology quickly',
      'How do you stay flexible in your approach to work?'
    ],
    estimatedTime: 8
  },
  {
    id: 'soft-7',
    name: 'Critical Thinking',
    category: 'Soft Skills',
    description: 'Ability to analyze information and make reasoned decisions',
    sampleQuestions: [
      'How do you evaluate different technical solutions?',
      'Describe a time when you had to make a difficult decision',
      'What factors do you consider when choosing between options?'
    ],
    estimatedTime: 10
  },
  {
    id: 'soft-8',
    name: 'Emotional Intelligence',
    category: 'Soft Skills',
    description: 'Ability to understand and manage emotions in professional settings',
    sampleQuestions: [
      'How do you handle stress in high-pressure situations?',
      'Describe a time when you had to manage a difficult client relationship',
      'How do you maintain professionalism during conflicts?'
    ],
    estimatedTime: 10
  },

  // Business Skills
  {
    id: 'business-1',
    name: 'Project Management',
    category: 'Business',
    description: 'Ability to plan, execute, and manage projects effectively',
    sampleQuestions: [
      'How do you break down a large project into manageable tasks?',
      'Describe your experience with agile methodologies',
      'How do you handle scope creep in projects?'
    ],
    estimatedTime: 15
  },
  {
    id: 'business-2',
    name: 'Business Analysis',
    category: 'Business',
    description: 'Ability to analyze business requirements and translate them into technical solutions',
    sampleQuestions: [
      'How do you gather and analyze business requirements?',
      'Describe a time when you had to bridge the gap between business and technical teams',
      'How do you ensure technical solutions meet business objectives?'
    ],
    estimatedTime: 12
  },
  {
    id: 'business-3',
    name: 'Stakeholder Management',
    category: 'Business',
    description: 'Ability to manage relationships with various stakeholders',
    sampleQuestions: [
      'How do you manage expectations with different stakeholders?',
      'Describe a time when you had to negotiate with stakeholders',
      'How do you ensure stakeholder satisfaction?'
    ],
    estimatedTime: 10
  },
  {
    id: 'business-4',
    name: 'Budget Management',
    category: 'Business',
    description: 'Ability to manage budgets and resources effectively',
    sampleQuestions: [
      'How do you estimate project costs?',
      'Describe a time when you had to work within a tight budget',
      'How do you justify technology investments to management?'
    ],
    estimatedTime: 12
  },
  {
    id: 'business-5',
    name: 'Risk Management',
    category: 'Business',
    description: 'Ability to identify and mitigate project and business risks',
    sampleQuestions: [
      'How do you identify potential risks in a project?',
      'Describe a time when you had to mitigate a significant risk',
      'What is your approach to contingency planning?'
    ],
    estimatedTime: 10
  },
  {
    id: 'business-6',
    name: 'Strategic Thinking',
    category: 'Business',
    description: 'Ability to think strategically and align actions with business goals',
    sampleQuestions: [
      'How do you align technical decisions with business strategy?',
      'Describe a time when you had to make a strategic technical decision',
      'How do you balance short-term needs with long-term goals?'
    ],
    estimatedTime: 12
  },

  // Domain Knowledge
  {
    id: 'domain-1',
    name: 'E-commerce',
    category: 'Domain Knowledge',
    description: 'Understanding of e-commerce platforms and business models',
    sampleQuestions: [
      'What are the key challenges in e-commerce development?',
      'How do you handle high-traffic periods in e-commerce?',
      'Describe your experience with payment gateway integration'
    ],
    estimatedTime: 12
  },
  {
    id: 'domain-2',
    name: 'Fintech',
    category: 'Domain Knowledge',
    description: 'Knowledge of financial technology and regulations',
    sampleQuestions: [
      'What are the key security considerations in fintech?',
      'How do you ensure compliance with financial regulations?',
      'Describe your experience with financial data processing'
    ],
    estimatedTime: 15
  },
  {
    id: 'domain-3',
    name: 'Healthcare',
    category: 'Domain Knowledge',
    description: 'Understanding of healthcare systems and compliance requirements',
    sampleQuestions: [
      'What are the key considerations for healthcare software?',
      'How do you ensure HIPAA compliance in your applications?',
      'Describe your experience with medical data management'
    ],
    estimatedTime: 15
  },
  {
    id: 'domain-4',
    name: 'Education',
    category: 'Domain Knowledge',
    description: 'Knowledge of educational technology and learning management systems',
    sampleQuestions: [
      'What are the key features of effective learning management systems?',
      'How do you design user-friendly educational interfaces?',
      'Describe your experience with online learning platforms'
    ],
    estimatedTime: 12
  },
  {
    id: 'domain-5',
    name: 'Gaming',
    category: 'Domain Knowledge',
    description: 'Understanding of game development and gaming industry',
    sampleQuestions: [
      'What are the key challenges in game development?',
      'How do you optimize game performance?',
      'Describe your experience with game engines'
    ],
    estimatedTime: 15
  },
  {
    id: 'domain-6',
    name: 'IoT',
    category: 'Domain Knowledge',
    description: 'Knowledge of Internet of Things technologies and applications',
    sampleQuestions: [
      'What are the key challenges in IoT development?',
      'How do you ensure security in IoT devices?',
      'Describe your experience with sensor data processing'
    ],
    estimatedTime: 15
  },
  {
    id: 'domain-7',
    name: 'AI/ML',
    category: 'Domain Knowledge',
    description: 'Understanding of artificial intelligence and machine learning',
    sampleQuestions: [
      'What machine learning algorithms are you familiar with?',
      'How do you handle data preprocessing for ML models?',
      'Describe your experience with model deployment'
    ],
    estimatedTime: 18
  },
  {
    id: 'domain-8',
    name: 'Blockchain',
    category: 'Domain Knowledge',
    description: 'Knowledge of blockchain technology and cryptocurrency',
    sampleQuestions: [
      'What are the key concepts in blockchain development?',
      'How do you ensure security in blockchain applications?',
      'Describe your experience with smart contracts'
    ],
    estimatedTime: 18
  },

  // Additional Skills
  {
    id: 'additional-1',
    name: 'Data Analysis',
    category: 'Additional Skills',
    description: 'Ability to analyze and interpret data',
    sampleQuestions: [
      'What data analysis tools do you use?',
      'How do you identify trends in data?',
      'Describe your experience with data visualization'
    ],
    estimatedTime: 12
  },
  {
    id: 'additional-2',
    name: 'User Experience Design',
    category: 'Additional Skills',
    description: 'Understanding of UX principles and user-centered design',
    sampleQuestions: [
      'How do you conduct user research?',
      'What is your approach to usability testing?',
      'How do you balance user needs with business requirements?'
    ],
    estimatedTime: 12
  },
  {
    id: 'additional-3',
    name: 'Documentation',
    category: 'Additional Skills',
    description: 'Ability to create clear and comprehensive documentation',
    sampleQuestions: [
      'How do you approach technical documentation?',
      'What tools do you use for documentation?',
      'How do you ensure documentation stays up-to-date?'
    ],
    estimatedTime: 8
  },
  {
    id: 'additional-4',
    name: 'Code Review',
    category: 'Additional Skills',
    description: 'Ability to review code and provide constructive feedback',
    sampleQuestions: [
      'What do you look for in a code review?',
      'How do you provide constructive feedback?',
      'How do you handle disagreements in code reviews?'
    ],
    estimatedTime: 8
  },
  {
    id: 'additional-5',
    name: 'Performance Optimization',
    category: 'Additional Skills',
    description: 'Ability to optimize application and system performance',
    sampleQuestions: [
      'How do you identify performance bottlenecks?',
      'What tools do you use for performance monitoring?',
      'Describe a time when you significantly improved performance'
    ],
    estimatedTime: 12
  },
  {
    id: 'additional-6',
    name: 'Mobile Development',
    category: 'Additional Skills',
    description: 'Experience in mobile application development',
    sampleQuestions: [
      'What mobile development frameworks do you use?',
      'How do you handle cross-platform development?',
      'Describe your experience with app store deployment'
    ],
    estimatedTime: 15
  },
  {
    id: 'additional-7',
    name: 'Internationalization',
    category: 'Additional Skills',
    description: 'Knowledge of building applications for global markets',
    sampleQuestions: [
      'How do you handle multiple languages in applications?',
      'What are the key considerations for internationalization?',
      'Describe your experience with localization'
    ],
    estimatedTime: 10
  }
];

export const experienceLevels = [
  { value: '2', label: 'Entry Level' },
  { value: '3', label: 'Junior Level' },
  { value: '4', label: 'Mid Level' },
  { value: '5', label: 'Senior Level' }
];

export const languages = [
  { value: 'th', label: 'Thai' },
  { value: 'en', label: 'English' }
];
