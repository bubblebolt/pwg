'use client';

import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Form, 
  Input, 
  Select, 
  Button, 
  Card, 
  Typography, 
  Row, 
  Col, 
  Space, 
  Divider, 
  Checkbox, 
  message, 
  Progress, 
  Alert,
  Tag
} from 'antd';
import { 
  CloseOutlined, 
  LeftOutlined, 
  RightOutlined, 
  ThunderboltOutlined,
  CheckCircleOutlined,
  UserOutlined,
  FileTextOutlined,
  EyeOutlined,
  EditOutlined,
  PlusOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

// -----------------------
// Types
// -----------------------
export type Level = "Entry" | "Mid" | "Senior" | "Executive";

export type Competency = {
  key: string;
  name: string;
  definition: string;
};

export type Question = {
  id: string;
  competencyKey: string;
  text: string;
  format: "open" | "mcq" | "audio";
  duration: number; // minutes
};

// -----------------------
// Data: TalentSphere Standard Competencies (47)
// -----------------------
export const COMPETENCIES: Competency[] = [
  { key: "analytical_thinking", name: "Analytical Thinking", definition: "Systematically examine information, identify patterns, draw logical conclusions using data." },
  { key: "conceptual_thinking", name: "Conceptual Thinking", definition: "Understand complex ideas, connect abstract concepts, simplify into frameworks." },
  { key: "problem_solving", name: "Problem Solving", definition: "Identify issues, analyze root causes, evaluate alternatives, implement solutions." },
  { key: "decision_making", name: "Decision Making", definition: "Assess options, weigh trade-offs, make timely choices with sound judgment." },
  { key: "learning_agility", name: "Learning Agility", definition: "Quickly acquire new knowledge and apply insights to novel situations." },
  { key: "self_awareness", name: "Self Awareness", definition: "Understand own strengths, weaknesses, emotions, and impact on others." },
  { key: "self_development", name: "Self Development", definition: "Continuously improve through deliberate learning and seeking growth opportunities." },
  { key: "adaptability", name: "Adaptability", definition: "Adjust approach and priorities in response to changing circumstances." },
  { key: "handling_uncertainty", name: "Handling Uncertainty", definition: "Remain effective despite ambiguous information or unclear direction." },
  { key: "resilience", name: "Resilience", definition: "Recover from setbacks, maintain composure under pressure, persist through adversity." },
  { key: "courage", name: "Courage", definition: "Face difficult situations, speak truth to power, take calculated risks." },
  { key: "trustworthiness", name: "Trustworthiness", definition: "Consistency between words and actions; reliability and integrity." },
  { key: "business_ethics", name: "Business Ethics", definition: "Apply moral principles and professional standards to ensure ethical conduct." },
  { key: "effective_communication", name: "Effective Communication", definition: "Convey information clearly, listen actively, facilitate meaningful dialogue." },
  { key: "emotional_intelligence", name: "Emotional Intelligence", definition: "Recognize, understand, and manage emotions to enhance relationships and performance." },
  { key: "persuasion", name: "Persuasion", definition: "Influence others through compelling arguments, negotiation, and win-win outcomes." },
  { key: "interpersonal_relationship_management", name: "Interpersonal Relationship Management", definition: "Build rapport, maintain positive professional relationships, navigate social dynamics." },
  { key: "promoting_collaboration", name: "Promoting Collaboration", definition: "Foster teamwork, encourage cooperation, enable people to work together effectively." },
  { key: "conflict_management", name: "Conflict Management", definition: "Address disagreements constructively, find common ground, facilitate resolution." },
  { key: "developing_and_empowering_people", name: "Developing & Empowering People", definition: "Help others grow via coaching, mentoring, and developmental opportunities." },
  { key: "building_inclusivity", name: "Building Inclusivity", definition: "Create environments where diverse perspectives are valued and leveraged." },
  { key: "team_building", name: "Team Building", definition: "Form cohesive groups, clarify roles and goals, develop high-performing teams." },
  { key: "building_employee_engagement", name: "Building Employee Engagement", definition: "Create conditions where employees feel motivated, valued, and invested." },
  { key: "building_networks", name: "Building Networks", definition: "Establish and maintain professional relationships that provide mutual value." },
  { key: "business_acumen", name: "Business Acumen", definition: "Understand how businesses operate: market dynamics, competition, industry trends." },
  { key: "financial_acumen", name: "Financial Acumen", definition: "Understand and decide based on financial data, budgets, and economic implications." },
  { key: "holistic_insights", name: "Holistic Insights", definition: "Understand global perspectives, cultural differences, and interconnected systems." },
  { key: "customer_orientation", name: "Customer Orientation", definition: "Understand and meet customer needs, anticipate expectations, deliver value." },
  { key: "stakeholder_management", name: "Stakeholder Management", definition: "Identify, engage, and balance the needs of various constituencies." },
  { key: "knowledge_management", name: "Knowledge Management", definition: "Capture, organize, share, and leverage organizational knowledge." },
  { key: "change_management", name: "Change Management", definition: "Guide individuals and organizations through transitions effectively." },
  { key: "organizational_governance", name: "Organizational Governance", definition: "Implement policies and oversight for ethical and compliant operations." },
  { key: "organizational_intelligence", name: "Organizational Intelligence", definition: "Navigate culture, politics, and informal networks to achieve objectives." },
  { key: "utilizing_technology", name: "Utilizing Technology", definition: "Leverage digital tools and platforms to enhance productivity and innovation." },
  { key: "risk_management", name: "Risk Management", definition: "Identify, assess, and mitigate potential threats to objectives." },
  { key: "crisis_management", name: "Crisis Management", definition: "Prepare for, respond to, and lead through emergency situations." },
  { key: "driving_business_competitiveness", name: "Driving Business Competitiveness", definition: "Build and leverage capabilities for sustainable competitive advantage." },
  { key: "strategic_thinking", name: "Strategic Thinking", definition: "See the big picture, anticipate trends, align actions with long-term objectives." },
  { key: "initiative_and_innovation", name: "Initiative & Innovation", definition: "Pursue new ideas and creative solutions to improve outcomes." },
  { key: "inspiring_visionary_leadership", name: "Inspiring & Visionary Leadership", definition: "Articulate a compelling vision and motivate others toward it." },
  { key: "maintaining_focus", name: "Maintaining Focus", definition: "Concentrate on priorities, minimize distractions, sustain attention on tasks." },
  { key: "attention_to_detail", name: "Attention to Detail", definition: "Ensure accuracy, completeness, and quality in work output." },
  { key: "planning_and_organizing", name: "Planning & Organizing", definition: "Structure activities, allocate resources, and sequence tasks efficiently." },
  { key: "taking_action", name: "Taking Action", definition: "Bias toward initiating activity, seizing opportunities, and driving momentum." },
  { key: "managing_resources", name: "Managing Resources", definition: "Optimize allocation of people, budget, time, and materials." },
  { key: "managing_work", name: "Managing Work", definition: "Coordinate tasks, monitor progress, and ensure successful completion." },
  { key: "driving_commitment", name: "Driving Commitment", definition: "Foster accountability, ownership, and follow-through." },
  { key: "outcome_driven", name: "Outcome-Driven", definition: "Relentless focus on achieving results and delivering value." },
  { key: "process_improvement", name: "Process Improvement", definition: "Identify inefficiencies and implement changes that enhance productivity." },
  { key: "quality_orientation", name: "Quality Orientation", definition: "Meet and exceed standards via continuous improvement and defect prevention." },
];

// -----------------------
// Helper Functions
// -----------------------
const uid = () => Math.random().toString(36).slice(2, 9);

const LEVEL_DURATIONS: Record<Level, number> = {
  Entry: 20,
  Mid: 30,
  Senior: 40,
  Executive: 45,
};

export function suggestCompetencies(role: string, level: Level): Competency[] {
  const r = (role || "").toLowerCase();
  let seeds: string[] = [];
  if (/(software|engineer|developer)/.test(r)) {
    seeds = [
      "problem_solving",
      "analytical_thinking",
      "utilizing_technology",
      "team_building",
      "effective_communication",
    ];
  } else if (/(product|pm)/.test(r)) {
    seeds = [
      "strategic_thinking",
      "stakeholder_management",
      "problem_solving",
      "promoting_collaboration",
      "customer_orientation",
    ];
  } else if (/(sales|account|bd)/.test(r)) {
    seeds = [
      "customer_orientation",
      "persuasion",
      "effective_communication",
      "building_networks",
      "outcome_driven",
    ];
  } else if (/(data|analyst|analytics|bi)/.test(r)) {
    seeds = [
      "analytical_thinking",
      "decision_making",
      "problem_solving",
      "attention_to_detail",
      "business_acumen",
    ];
  } else {
    // Generic baseline (role-agnostic)
    seeds = [
      "problem_solving",
      "effective_communication",
      "promoting_collaboration",
      "adaptability",
      "outcome_driven",
    ];
  }
  // Elevate for Senior/Executive
  if (level === "Senior" || level === "Executive") {
    seeds = Array.from(
      new Set([
        ...seeds,
        "strategic_thinking",
        "inspiring_visionary_leadership",
        "stakeholder_management",
      ])
    );
  }
  const map = new Map(COMPETENCIES.map((c) => [c.key, c] as const));
  return seeds.map((k) => map.get(k)!).filter(Boolean).slice(0, 5);
}

function generateQuestionText(competencyName: string, level: Level): string[] {
  const base = competencyName;
  const l = level;
  return [
    `Describe a recent situation where you demonstrated strong ${base.toLowerCase()}. What was the context and outcome?`,
    `How would you approach a scenario that challenges your ${base.toLowerCase()} at the ${l} level? Explain your reasoning.`,
    `Give a concrete example of tools or methods you use to strengthen your ${base.toLowerCase()}.`,
  ];
}

function makeQuestions(competencies: Competency[], level: Level): Question[] {
  const perComp = level === "Entry" ? 2 : level === "Mid" ? 2 : 3; // 2–3 per competency
  const res: Question[] = [];
  competencies.forEach((c) => {
    const texts = generateQuestionText(c.name, level).slice(0, perComp);
    texts.forEach((t, i) =>
      res.push({
        id: uid(),
        competencyKey: c.key,
        text: t,
        format: i === 1 && level !== "Entry" ? "audio" : "open",
        duration: Math.max(3, Math.min(8, Math.round(LEVEL_DURATIONS[level] / (competencies.length * perComp)))),
      })
    );
  });
  return res;
}

interface QuickAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickAssessmentModal({ isOpen, onClose }: QuickAssessmentModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1 state
  const [jrName, setJrName] = useState('');
  const [role, setRole] = useState('');
  const [level, setLevel] = useState<Level>('Mid');
  const [positions, setPositions] = useState<number>(1);

  // Step 2 state: selected competencies (3–7, avg ≈5)
  const [selected, setSelected] = useState<string[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Step 3 state: generated questions
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);

  const steps = [
    {
      title: 'Basic Setup',
      description: 'JR Metadata & Role Selection',
      icon: <UserOutlined />
    },
    {
      title: 'Competency Setup',
      description: 'Select & Review Competencies',
      icon: <FileTextOutlined />
    },
    {
      title: 'Question Review & Edit',
      description: 'Review and customize questions',
      icon: <EditOutlined />
    },
    {
      title: 'Preview & Create JR',
      description: 'Preview and create assessment',
      icon: <EyeOutlined />
    }
  ];

  const assessmentTypes = [
    { value: 'technical', label: 'Technical Assessment', description: 'Programming, system design, problem solving' },
    { value: 'behavioral', label: 'Behavioral Assessment', description: 'Leadership, communication, teamwork' },
    { value: 'cognitive', label: 'Cognitive Assessment', description: 'Logical reasoning, analytical thinking' },
    { value: 'mixed', label: 'Mixed Assessment', description: 'Combination of technical and behavioral' }
  ];

  const experienceLevels = [
    { value: 'Entry', label: 'Entry Level (0-2 years)', description: 'Fresh graduates, junior positions' },
    { value: 'Mid', label: 'Mid Level (2-5 years)', description: 'Experienced professionals' },
    { value: 'Senior', label: 'Senior Level (5+ years)', description: 'Senior and lead positions' },
    { value: 'Executive', label: 'Executive Level (10+ years)', description: 'C-level and senior executives' }
  ];

  const roles = [
    { value: 'fullstack', label: 'Full Stack Developer', description: 'Frontend and backend development' },
    { value: 'frontend', label: 'Frontend Developer', description: 'User interface and user experience' },
    { value: 'backend', label: 'Backend Developer', description: 'Server-side development and APIs' },
    { value: 'mobile', label: 'Mobile Developer', description: 'iOS and Android app development' },
    { value: 'devops', label: 'DevOps Engineer', description: 'Infrastructure and deployment' },
    { value: 'data', label: 'Data Engineer', description: 'Data pipelines and analytics' },
    { value: 'qa', label: 'QA Engineer', description: 'Quality assurance and testing' },
    { value: 'product', label: 'Product Manager', description: 'Product strategy and management' }
  ];

  const allCompetencies = [
    { id: 'analytical_thinking', name: 'Analytical Thinking', description: 'Ability to break down complex problems and analyze data systematically' },
    { id: 'communication', name: 'Communication', description: 'Clear and effective verbal and written communication skills' },
    { id: 'problem_solving', name: 'Problem Solving', description: 'Identifying issues and developing effective solutions' },
    { id: 'leadership', name: 'Leadership', description: 'Ability to guide, motivate, and influence others toward common goals' },
    { id: 'teamwork', name: 'Teamwork', description: 'Collaborating effectively with others to achieve shared objectives' },
    { id: 'adaptability', name: 'Adaptability', description: 'Flexibility and resilience in changing environments' },
    { id: 'technical_skills', name: 'Technical Skills', description: 'Proficiency in relevant technical tools and methodologies' },
    { id: 'customer_focus', name: 'Customer Focus', description: 'Understanding and meeting customer needs and expectations' },
    { id: 'innovation', name: 'Innovation', description: 'Generating new ideas and creative approaches to challenges' },
    { id: 'decision_making', name: 'Decision Making', description: 'Making sound judgments based on available information' },
    { id: 'time_management', name: 'Time Management', description: 'Effectively organizing and prioritizing tasks and activities' },
    { id: 'attention_to_detail', name: 'Attention to Detail', description: 'Thoroughness and accuracy in work processes' },
    { id: 'strategic_thinking', name: 'Strategic Thinking', description: 'Long-term planning and vision development' },
    { id: 'negotiation', name: 'Negotiation', description: 'Reaching mutually beneficial agreements with stakeholders' },
    { id: 'project_management', name: 'Project Management', description: 'Planning, executing, and delivering projects successfully' },
    { id: 'sales_skills', name: 'Sales Skills', description: 'Building relationships and closing deals effectively' },
    { id: 'marketing_knowledge', name: 'Marketing Knowledge', description: 'Understanding market dynamics and promotional strategies' },
    { id: 'financial_acumen', name: 'Financial Acumen', description: 'Understanding financial principles and business metrics' },
    { id: 'data_analysis', name: 'Data Analysis', description: 'Interpreting and deriving insights from data' },
    { id: 'programming', name: 'Programming Skills', description: 'Writing, testing, and maintaining code effectively' },
    { id: 'system_design', name: 'System Design', description: 'Designing scalable and efficient system architectures' },
    { id: 'quality_assurance', name: 'Quality Assurance', description: 'Ensuring products meet quality standards and requirements' },
    { id: 'user_experience', name: 'User Experience', description: 'Designing intuitive and user-friendly interfaces' },
    { id: 'database_management', name: 'Database Management', description: 'Designing and managing database systems' },
    { id: 'cloud_computing', name: 'Cloud Computing', description: 'Working with cloud platforms and services' },
    { id: 'cybersecurity', name: 'Cybersecurity', description: 'Protecting systems and data from security threats' },
    { id: 'devops', name: 'DevOps', description: 'Integrating development and operations processes' },
    { id: 'mobile_development', name: 'Mobile Development', description: 'Creating applications for mobile devices' },
    { id: 'web_development', name: 'Web Development', description: 'Building and maintaining web applications' },
    { id: 'artificial_intelligence', name: 'Artificial Intelligence', description: 'Developing and implementing AI solutions' },
    { id: 'machine_learning', name: 'Machine Learning', description: 'Building and training ML models' },
    { id: 'data_science', name: 'Data Science', description: 'Extracting insights from complex datasets' },
    { id: 'business_analysis', name: 'Business Analysis', description: 'Analyzing business processes and requirements' },
    { id: 'product_management', name: 'Product Management', description: 'Managing product development and lifecycle' },
    { id: 'operations_management', name: 'Operations Management', description: 'Optimizing business operations and processes' },
    { id: 'supply_chain', name: 'Supply Chain Management', description: 'Managing end-to-end supply chain processes' },
    { id: 'human_resources', name: 'Human Resources', description: 'Managing people and organizational development' },
    { id: 'training_development', name: 'Training & Development', description: 'Developing and delivering learning programs' },
    { id: 'performance_management', name: 'Performance Management', description: 'Managing and improving employee performance' },
    { id: 'recruitment', name: 'Recruitment', description: 'Identifying and attracting top talent' },
    { id: 'legal_compliance', name: 'Legal & Compliance', description: 'Ensuring adherence to laws and regulations' },
    { id: 'risk_management', name: 'Risk Management', description: 'Identifying and mitigating business risks' },
    { id: 'change_management', name: 'Change Management', description: 'Leading organizational transformation' },
    { id: 'stakeholder_management', name: 'Stakeholder Management', description: 'Managing relationships with key stakeholders' },
    { id: 'vendor_management', name: 'Vendor Management', description: 'Managing relationships with external partners' },
    { id: 'budget_management', name: 'Budget Management', description: 'Planning and controlling financial resources' },
    { id: 'reporting_analytics', name: 'Reporting & Analytics', description: 'Creating reports and analyzing business metrics' }
  ];

  // Auto-generate competencies based on role and experience level
  const generateCompetencies = (role: string, experienceLevel: string) => {
    const roleCompetencyMap: { [key: string]: string[] } = {
      'fullstack': ['programming', 'system_design', 'problem_solving', 'technical_skills', 'attention_to_detail'],
      'frontend': ['programming', 'user_experience', 'web_development', 'technical_skills', 'attention_to_detail'],
      'backend': ['programming', 'system_design', 'database_management', 'technical_skills', 'problem_solving'],
      'mobile': ['programming', 'mobile_development', 'user_experience', 'technical_skills', 'problem_solving'],
      'devops': ['devops', 'cloud_computing', 'system_design', 'technical_skills', 'problem_solving'],
      'data': ['data_analysis', 'data_science', 'machine_learning', 'technical_skills', 'analytical_thinking'],
      'qa': ['quality_assurance', 'attention_to_detail', 'technical_skills', 'problem_solving', 'testing'],
      'product': ['product_management', 'strategic_thinking', 'communication', 'stakeholder_management', 'business_analysis']
    };

    const levelCompetencyMap: { [key: string]: string[] } = {
      'entry': ['communication', 'teamwork', 'adaptability', 'time_management'],
      'mid': ['problem_solving', 'project_management', 'decision_making', 'customer_focus'],
      'senior': ['leadership', 'strategic_thinking', 'innovation', 'mentoring'],
      'executive': ['leadership', 'strategic_thinking', 'change_management', 'stakeholder_management']
    };

    const roleCompetencies = roleCompetencyMap[role] || ['communication', 'problem_solving', 'teamwork'];
    const levelCompetencies = levelCompetencyMap[experienceLevel] || ['communication', 'problem_solving'];
    
    // Combine and deduplicate
    const combinedCompetencies = [...new Set([...roleCompetencies, ...levelCompetencies])];
    
    // Return 3-7 competencies (average 5)
    const selectedIds = combinedCompetencies.slice(0, Math.min(7, Math.max(3, combinedCompetencies.length)));
    
    return selectedIds.map(id => allCompetencies.find(comp => comp.id === id)).filter(Boolean);
  };

  // Auto-generate questions based on selected competencies
  const generateQuestions = (competencies: any[], experienceLevel: string) => {
    const questions: any[] = [];
    let questionId = 1;

    const questionTemplates: { [key: string]: { [key: string]: string } } = {
      'programming': {
        'entry': 'Write a simple function to calculate the factorial of a number. Explain your approach.',
        'mid': 'Implement a function to find the longest common subsequence between two strings. Explain the time and space complexity.',
        'senior': 'Design and implement a scalable microservices architecture for an e-commerce platform. Explain your approach to service communication, data consistency, and fault tolerance.',
        'executive': 'How would you architect a system to handle 10 million concurrent users? Discuss scalability, reliability, and cost considerations.'
      },
      'problem_solving': {
        'entry': 'How would you debug a JavaScript function that is not returning the expected output?',
        'mid': 'Given a large dataset, how would you optimize a slow-running query? What tools and techniques would you use?',
        'senior': 'A production system is experiencing memory leaks and slow response times. Walk me through your debugging process and how you would identify and resolve these issues.',
        'executive': 'Your team is facing a critical system outage affecting 50,000 users. How do you prioritize and coordinate the response?'
      },
      'communication': {
        'entry': 'Describe a time when you had to explain a technical concept to a non-technical person.',
        'mid': 'How would you present a complex project proposal to senior management?',
        'senior': 'Tell me about a time when you had to communicate bad news to stakeholders. How did you handle it?',
        'executive': 'How do you ensure clear communication across multiple teams working on a large project?'
      },
      'leadership': {
        'entry': 'Describe a situation where you had to take initiative on a project.',
        'mid': 'Tell me about a time when you had to motivate a team member who was struggling.',
        'senior': 'Describe a time when you had to lead a team through a difficult challenge. How did you guide them?',
        'executive': 'How do you build and maintain a high-performing team culture?'
      },
      'system_design': {
        'entry': 'Explain the difference between SQL and NoSQL databases. When would you use each?',
        'mid': 'How would you design a URL shortener service like bit.ly? Include database schema and API design.',
        'senior': 'Design a real-time chat application that can handle 1 million concurrent users. Consider message delivery, scalability, and data persistence.',
        'executive': 'Design a global content delivery system. How would you ensure low latency and high availability?'
      }
    };

    competencies.forEach(competency => {
      const template = questionTemplates[competency.id];
      if (template) {
        const question = template[experienceLevel] || template['mid'];
        questions.push({
          id: questionId++,
          competency: competency.id,
          competencyName: competency.name,
          question: question,
          type: 'open',
          duration: experienceLevel === 'senior' || experienceLevel === 'executive' ? 30 : experienceLevel === 'mid' ? 20 : 15,
          difficulty: experienceLevel === 'senior' || experienceLevel === 'executive' ? 'Hard' : experienceLevel === 'mid' ? 'Medium' : 'Easy'
        });
      }
    });

    return questions;
  };

  // Check form validation in real-time
  React.useEffect(() => {
    const checkFormValidity = () => {
      if (currentStep === 0) {
        const isValid = assessmentName && assessmentName.trim() !== '' && experienceLevel && numberOfPositions > 0;
        setFormValid(isValid);
      } else if (currentStep === 1) {
        const isValid = selectedCompetencies.length > 0;
        setFormValid(isValid);
      } else if (currentStep === 2) {
        const isValid = generatedQuestions.length > 0;
        setFormValid(isValid);
      } else {
        setFormValid(true);
      }
    };

    checkFormValidity();
    
    // Listen to form changes
    const timer = setInterval(checkFormValidity, 500);
    return () => clearInterval(timer);
  }, [currentStep, assessmentName, experienceLevel, numberOfPositions, selectedCompetencies, generatedQuestions]);

  const handleNext = async () => {
    if (currentStep === 0) {
      try {
        await form.validateFields(['assessmentName', 'experienceLevel', 'numberOfPositions']);
        // Auto-generate competencies when moving to step 2
        const competencies = generateCompetencies(selectedRole, experienceLevel);
        setSelectedCompetencies(competencies);
        setCurrentStep(1);
      } catch (error) {
        console.log('Validation failed:', error);
      }
    } else if (currentStep === 1) {
      if (selectedCompetencies.length === 0) {
        message.error('Please select at least one competency.');
        return;
      }
      // Auto-generate questions when moving to step 3
      const questions = generateQuestions(selectedCompetencies, experienceLevel);
      setGeneratedQuestions(questions);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (generatedQuestions.length === 0) {
        message.error('No questions generated. Please check your selections.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      await handleCreate();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    message.success('Quick Assessment created successfully! Assessment link: https://assessment.talentsphere.ai/abc123');
    setIsLoading(false);
    onClose();
    
    // Reset form
    setCurrentStep(0);
    setAssessmentName('');
    setSelectedRole('');
    setCustomRole('');
    setExperienceLevel('mid');
    setNumberOfPositions(1);
    setSelectedCompetencies([]);
    setGeneratedQuestions([]);
    setEditingQuestion(null);
    form.resetFields();
  };

  const renderStep1 = () => {
    const suggestedCompetencies = generateCompetencies(selectedRole || customRole, experienceLevel);
    
    return (
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Title level={4} style={{ margin: 0, marginBottom: '6px', fontSize: '16px', color: '#262626' }}>
            Step 1: ตั้งค่าเริ่มต้น
          </Title>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            กรอกข้อมูลขั้นต่ำเพื่อเริ่มสร้าง Assessment
          </Text>
        </div>

        <Form form={form} layout="vertical" style={{ maxWidth: '600px' }}>
          <Form.Item
            label="JR Name"
            name="assessmentName"
            rules={[{ required: true, message: 'Please enter JR name' }]}
            style={{ marginBottom: '24px' }}
          >
            <Input
              placeholder="เช่น Sales Executive Assessment (Q4)"
              value={assessmentName}
              onChange={(e) => setAssessmentName(e.target.value)}
              size="large"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item
            label="Role / Position"
            name="selectedRole"
            style={{ marginBottom: '24px' }}
          >
            <Input
              placeholder="เช่น Software Engineer, Sales Executive, Product Manager"
              value={selectedRole || customRole}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedRole(value);
                setCustomRole(value);
              }}
              size="large"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item
            label="Experience Level"
            name="experienceLevel"
            rules={[{ required: true, message: 'Please select experience level' }]}
            style={{ marginBottom: '24px' }}
          >
            <Select
              value={experienceLevel}
              onChange={setExperienceLevel}
              size="large"
              style={{ borderRadius: '8px' }}
              placeholder="Select experience level"
            >
              {experienceLevels.map(level => (
                <Option key={level.value} value={level.value}>
                  <div>
                    <div style={{ fontWeight: '500' }}>{level.label}</div>
                    <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{level.description}</div>
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="# Positions"
            name="numberOfPositions"
            rules={[{ required: true, message: 'Please enter number of positions' }]}
            style={{ marginBottom: '24px' }}
          >
            <Input
              type="number"
              min={1}
              placeholder="1"
              value={numberOfPositions}
              onChange={(e) => setNumberOfPositions(parseInt(e.target.value) || 1)}
              size="large"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
        </Form>

        {/* Suggested Competencies Area */}
        <div style={{ marginTop: '32px' }}>
          <div style={{ marginBottom: '16px' }}>
            <Text strong style={{ fontSize: '14px', color: '#262626' }}>
              Suggested competencies based on role/level:
            </Text>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '8px',
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            minHeight: '60px'
          }}>
            {suggestedCompetencies.map((competency) => (
              <Tag
                key={competency.id}
                color="blue"
                style={{ 
                  fontSize: '12px',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  margin: '0'
                }}
              >
                {competency.name}
              </Tag>
            ))}
          </div>
          
          <Text type="secondary" style={{ fontSize: '12px', marginTop: '8px', display: 'block' }}>
            ระบบจะแนะนำสมรรถนะเบื้องต้นตามตำแหน่งและระดับที่เลือก
          </Text>
        </div>
      </div>
    );
  };

  const renderStep2 = () => {
    const showWarning = selectedCompetencies.length < 3 || selectedCompetencies.length > 7;
    
    return (
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Title level={4} style={{ margin: 0, marginBottom: '6px', fontSize: '16px', color: '#262626' }}>
            Step 2: เลือกสมรรถนะ (3–7 รายการ)
          </Title>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            ระบบเลือกสมรรถนะให้อัตโนมัติ คุณสามารถลบหรือเพิ่มได้ (แนะนำ 3–7 รายการ)
          </Text>
        </div>

      <div style={{ maxWidth: '800px' }}>
        {/* Header Actions */}
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              onClick={() => {
                // TODO: Open Add Competency Submodal
                message.info('Add Competency feature coming soon!');
              }}
            >
              เพิ่มสมรรถนะ
            </Button>
            <Button
              type="dashed"
              size="small"
              onClick={() => {
                const competencies = generateCompetencies(selectedRole || customRole, experienceLevel);
                setSelectedCompetencies(competencies);
                message.success('รีเซ็ตเป็นรายการที่แนะนำแล้ว!');
              }}
            >
              รีเซ็ตเป็นรายการที่แนะนำ
            </Button>
            <Button
              type="dashed"
              size="small"
              danger
              onClick={() => {
                setSelectedCompetencies([]);
                message.success('ล้างทั้งหมดแล้ว!');
              }}
            >
              ล้างทั้งหมด
            </Button>
          </div>
          <Text strong style={{ fontSize: '14px', color: '#1890ff' }}>
            เลือกแล้ว: {selectedCompetencies.length} รายการ
          </Text>
        </div>

        {/* Warning Banner */}
        {showWarning && (
          <Alert
            message={selectedCompetencies.length < 3 ? 
              `แนะนำให้เลือกอย่างน้อย 3 รายการ (ปัจจุบัน: ${selectedCompetencies.length})` : 
              `แนะนำให้เลือกไม่เกิน 7 รายการ (ปัจจุบัน: ${selectedCompetencies.length})`
            }
            type="info"
            showIcon
            style={{ marginBottom: '16px', borderRadius: '8px' }}
          />
        )}
        
        <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
          {selectedCompetencies.map((competency, index) => (
            <Card
              key={competency.id}
              size="small"
              style={{
                border: '1px solid #d9d9d9',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Text strong style={{ fontSize: '14px' }}>
                      {competency.name}
                    </Text>
                  </div>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <Text style={{ fontSize: '13px', color: '#666', lineHeight: '1.4' }}>
                      {competency.description}
                    </Text>
                  </div>
                </div>
                
                <Button
                  type="link"
                  size="small"
                  danger
                  onClick={() => {
                    const updatedCompetencies = selectedCompetencies.filter((_, i) => i !== index);
                    setSelectedCompetencies(updatedCompetencies);
                    message.success('ลบสมรรถนะแล้ว!');
                  }}
                >
                  ลบ
                </Button>
              </div>
            </Card>
          ))}
        </div>

        
        {selectedCompetencies.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            border: '2px dashed #d9d9d9', 
            borderRadius: '8px',
            backgroundColor: '#fafafa'
          }}>
            <Text type="secondary">ยังไม่มีสมรรถนะที่เลือก คลิก "เพิ่มสมรรถนะ" หรือ "รีเซ็ตเป็นรายการที่แนะนำ"</Text>
          </div>
        )}
      </div>
    </div>
    );
  };

  const renderStep3 = () => {
    // Group questions by competency
    const groupedQuestions = generatedQuestions.reduce((acc, question) => {
      if (!acc[question.competencyName]) {
        acc[question.competencyName] = [];
      }
      acc[question.competencyName].push(question);
      return acc;
    }, {} as { [key: string]: any[] });

    return (
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Title level={4} style={{ margin: 0, marginBottom: '6px', fontSize: '16px', color: '#262626' }}>
            Step 3: ทบทวนและแก้ไขคำถาม
          </Title>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            แก้ไข/สุ่มใหม่/ลบคำถาม หรือเพิ่มคำถามในแต่ละสมรรถนะ
          </Text>
        </div>

        <div style={{ maxWidth: '900px' }}>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            {Object.entries(groupedQuestions).map(([competencyName, questions]) => (
              <Card
                key={competencyName}
                size="small"
                style={{
                  border: '1px solid #d9d9d9',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>
                      {competencyName}
                    </Text>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      {selectedCompetencies.find(c => c.name === competencyName)?.description}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      type="dashed"
                      size="small"
                      onClick={() => {
                        const competencyQuestions = questions.map(q => {
                          const newQuestion = generateQuestions([{ id: q.competency }], experienceLevel)[0];
                          return newQuestion ? { ...newQuestion, id: q.id } : q;
                        });
                        const updatedQuestions = generatedQuestions.map(q => {
                          const newQ = competencyQuestions.find(cq => cq.id === q.id);
                          return newQ || q;
                        });
                        setGeneratedQuestions(updatedQuestions);
                        message.success('สุ่มคำถามใหม่ทั้งหมดในหมวดนี้แล้ว!');
                      }}
                    >
                      Regenerate All
                    </Button>
                    <Button
                      type="primary"
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        const competency = selectedCompetencies.find(c => c.name === competencyName);
                        if (competency) {
                          const newQuestion = generateQuestions([competency], experienceLevel)[0];
                          if (newQuestion) {
                            const newId = Math.max(...generatedQuestions.map(q => q.id), 0) + 1;
                            setGeneratedQuestions([...generatedQuestions, { ...newQuestion, id: newId }]);
                            message.success('เพิ่มคำถามใหม่แล้ว!');
                          }
                        }
                      }}
                    >
                      Add Question
                    </Button>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gap: '12px' }}>
                  {questions.map((question, index) => (
                    <div
                      key={question.id}
                      style={{
                        padding: '16px',
                        border: '1px solid #f0f0f0',
                        borderRadius: '6px',
                        backgroundColor: '#fafafa'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Text strong style={{ fontSize: '14px' }}>
                              Q{index + 1}
                            </Text>
                            <Tag color={question.difficulty === 'Hard' ? 'red' : question.difficulty === 'Medium' ? 'orange' : 'green'} style={{ fontSize: '11px' }}>
                              {question.difficulty}
                            </Tag>
                            <Tag style={{ fontSize: '11px' }}>
                              {question.duration} min
                            </Tag>
                          </div>
                          <div style={{ marginBottom: '12px' }}>
                            <Text style={{ fontSize: '14px', lineHeight: '1.5' }}>
                              {question.question}
                            </Text>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Button
                            type="link"
                            size="small"
                            onClick={() => setEditingQuestion(question.id)}
                            disabled={editingQuestion !== null}
                          >
                            Edit
                          </Button>
                          <Button
                            type="link"
                            size="small"
                            onClick={() => {
                              const newQuestion = generateQuestions([{ id: question.competency }], experienceLevel)[0];
                              if (newQuestion) {
                                const updatedQuestions = generatedQuestions.map(q => 
                                  q.id === question.id ? { ...newQuestion, id: question.id } : q
                                );
                                setGeneratedQuestions(updatedQuestions);
                                message.success('สุ่มคำถามใหม่แล้ว!');
                              }
                            }}
                            disabled={editingQuestion !== null}
                          >
                            Regenerate
                          </Button>
                          <Button
                            type="link"
                            size="small"
                            danger
                            onClick={() => {
                              const updatedQuestions = generatedQuestions.filter(q => q.id !== question.id);
                              setGeneratedQuestions(updatedQuestions);
                              message.success('ลบคำถามแล้ว!');
                            }}
                            disabled={editingQuestion !== null}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      
                      {editingQuestion === question.id ? (
                        <div style={{ marginBottom: '12px' }}>
                          <Input.TextArea
                            value={question.question}
                            onChange={(e) => {
                              const updatedQuestions = generatedQuestions.map(q => 
                                q.id === question.id ? { ...q, question: e.target.value } : q
                              );
                              setGeneratedQuestions(updatedQuestions);
                            }}
                            rows={3}
                            style={{ marginBottom: '8px' }}
                          />
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <Button
                              type="primary"
                              size="small"
                              onClick={() => setEditingQuestion(null)}
                            >
                              Save
                            </Button>
                            <Button
                              size="small"
                              onClick={() => setEditingQuestion(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ marginBottom: '12px' }}>
                          <Text style={{ fontSize: '14px', lineHeight: '1.5' }}>
                            {question.question}
                          </Text>
                        </div>
                      )}
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Button
                          type="link"
                          size="small"
                          onClick={() => setEditingQuestion(question.id)}
                          disabled={editingQuestion !== null}
                        >
                          Edit
                        </Button>
                        <Button
                          type="link"
                          size="small"
                          onClick={() => {
                            const newQuestions = generateQuestions([{ id: question.competency }], experienceLevel);
                            if (newQuestions.length > 0) {
                              const updatedQuestions = generatedQuestions.map(q => 
                                q.id === question.id ? { ...newQuestions[0], id: question.id } : q
                              );
                              setGeneratedQuestions(updatedQuestions);
                              message.success('Question regenerated!');
                            }
                          }}
                          disabled={editingQuestion !== null}
                        >
                          Regenerate
                        </Button>
                        <Button
                          type="link"
                          size="small"
                          danger
                          onClick={() => {
                            const updatedQuestions = generatedQuestions.filter(q => q.id !== question.id);
                            setGeneratedQuestions(updatedQuestions);
                            message.success('Question removed!');
                          }}
                          disabled={editingQuestion !== null}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          
          {generatedQuestions.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              border: '2px dashed #d9d9d9', 
              borderRadius: '8px',
              backgroundColor: '#fafafa'
            }}>
              <Text type="secondary">No questions generated. Please check your selections in previous steps.</Text>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStep4 = () => {
    // Group questions by competency for display
    const groupedQuestions = generatedQuestions.reduce((acc, question) => {
      if (!acc[question.competencyName]) {
        acc[question.competencyName] = [];
      }
      acc[question.competencyName].push(question);
      return acc;
    }, {} as { [key: string]: any[] });

    return (
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Title level={4} style={{ margin: 0, marginBottom: '6px', fontSize: '16px', color: '#262626' }}>
            Preview & Create JR
          </Title>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            Preview your assessment and create it instantly
          </Text>
        </div>

        <div style={{ maxWidth: '900px' }}>
          <Alert
            message="Ready to Create!"
            description="Your assessment will be created and activated immediately. No approval required."
            type="success"
            showIcon
            style={{ marginBottom: '24px', borderRadius: '8px' }}
          />

          <Row gutter={24}>
            {/* Candidate View */}
            <Col span={12}>
              <Card 
                title="Candidate View" 
                size="small"
                style={{ borderRadius: '8px', marginBottom: '16px' }}
              >
                <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '12px' }}>
                  What candidates will see
                </div>
                <div style={{ 
                  backgroundColor: '#f8f9fa', 
                  padding: '16px', 
                  borderRadius: '6px',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <Text strong style={{ fontSize: '14px' }}>{assessmentName}</Text>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {selectedRole ? roles.find(r => r.value === selectedRole)?.label : customRole || 'Custom Role'} • {experienceLevels.find(l => l.value === experienceLevel)?.label}
                    </Text>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <Text style={{ fontSize: '12px' }}>
                      {generatedQuestions.length} questions • {generatedQuestions.reduce((sum, q) => sum + q.duration, 0)} minutes total
                    </Text>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Questions will be presented one at a time with timer and progress indicator.
                  </div>
                </div>
              </Card>
            </Col>

            {/* Recruiter View */}
            <Col span={12}>
              <Card 
                title="Recruiter View" 
                size="small"
                style={{ borderRadius: '8px', marginBottom: '16px' }}
              >
                <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '12px' }}>
                  Competency breakdown & scoring
                </div>
                <div style={{ 
                  backgroundColor: '#f6f8ff', 
                  padding: '16px', 
                  borderRadius: '6px',
                  border: '1px solid #d6e4ff'
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <Text strong style={{ fontSize: '14px' }}>Competency Breakdown</Text>
                  </div>
                  {Object.entries(groupedQuestions).map(([competency, questions]) => (
                    <div key={competency} style={{ marginBottom: '8px', fontSize: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text>{competency}</Text>
                        <Text type="secondary">{questions.length} questions</Text>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #d6e4ff', fontSize: '12px', color: '#666' }}>
                    Auto-scoring based on competency performance
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          <Card style={{ borderRadius: '8px', marginBottom: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ fontSize: '16px' }}>Assessment Summary</Text>
            </div>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">JR Name:</Text>
                <Text strong>{assessmentName}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Role:</Text>
                <Text strong>{selectedRole ? roles.find(r => r.value === selectedRole)?.label : customRole || 'Not specified'}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Level:</Text>
                <Text strong>{experienceLevels.find(l => l.value === experienceLevel)?.label}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Positions:</Text>
                <Text strong>{numberOfPositions}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Competencies:</Text>
                <Text strong>{selectedCompetencies.length}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Questions:</Text>
                <Text strong>{generatedQuestions.length}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Duration:</Text>
                <Text strong>{generatedQuestions.reduce((sum, q) => sum + q.duration, 0)} minutes</Text>
              </div>
            </div>
          </Card>

          <div style={{ 
            padding: '16px', 
            backgroundColor: '#f6f8ff', 
            borderRadius: '8px',
            border: '1px solid #d6e4ff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ThunderboltOutlined style={{ color: '#1890ff' }} />
              <Text strong style={{ color: '#1890ff' }}>Quick Assessment Benefits</Text>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#666' }}>
              <li>Immediate activation - no approval needed</li>
              <li>Assessment link ready in seconds</li>
              <li>Auto-generated questions based on competencies</li>
              <li>Real-time candidate evaluation with competency scoring</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderStep1();
      case 1:
        return renderStep2();
      case 2:
        return renderStep3();
      case 3:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onClose}
        width={800}
        centered
        closable={false}
        styles={{
          body: { padding: '0' }
        }}
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
        }}
        footer={
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fafafa'
          }}>
            <Button
              icon={<LeftOutlined />}
              onClick={handlePrevious}
              disabled={currentStep === 0}
              size="large"
              style={{ 
                height: '48px',
                fontSize: '16px',
                borderRadius: '8px',
                padding: '0 24px'
              }}
            >
              Previous
            </Button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Text type="secondary" style={{ fontSize: '14px' }}>
                Step {currentStep + 1} of {steps.length}
              </Text>
              <Progress
                percent={((currentStep + 1) / steps.length) * 100}
                size="small"
                style={{ width: '100px' }}
                strokeColor="#1890ff"
                showInfo={false}
              />
            </div>

            <Button
              type="primary"
              icon={currentStep === steps.length - 1 ? <ThunderboltOutlined /> : <RightOutlined />}
              onClick={handleNext}
              disabled={!formValid}
              loading={isLoading}
              size="large"
              style={{ 
                height: '48px',
                fontSize: '16px',
                borderRadius: '8px',
                padding: '0 24px',
                background: formValid ? 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)' : '#d9d9d9',
                border: 'none',
                boxShadow: formValid ? '0 4px 12px rgba(24, 144, 255, 0.3)' : 'none'
              }}
            >
              {currentStep === steps.length - 1 ? 'Create Assessment' : 'Next'}
            </Button>
          </div>
        }
      >
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fafafa'
        }}>
          <div>
            <Title level={4} style={{ margin: 0, marginBottom: '6px', fontSize: '16px', color: '#262626' }}>
              {steps[currentStep].title}
            </Title>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Text type="secondary" style={{ fontSize: '14px' }}>
                Step {currentStep + 1} of {steps.length}
              </Text>
              <Progress
                percent={((currentStep + 1) / steps.length) * 100}
                size="small"
                style={{ width: '120px' }}
                strokeColor="#1890ff"
                showInfo={false}
              />
            </div>
          </div>
          <Button
            icon={<CloseOutlined />}
            onClick={onClose}
            type="text"
            size="large"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Close"
            aria-label="Close modal"
          />
        </div>
        
        {renderCurrentStep()}
      </Modal>
    </>
  );
}
