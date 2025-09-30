'use client';

import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Radio,
  Checkbox,
  Button,
  Card,
  Tag,
  Space,
  Typography,
  Divider,
  Row,
  Col,
  Select,
  message,
  Tooltip,
  Badge,
  Progress,
  Alert
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
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Step 1 state
  const [jrName, setJrName] = useState('');
  const [role, setRole] = useState('');
  const [level, setLevel] = useState<Level>('Mid');
  const [positions, setPositions] = useState<number>(1);
  const [language, setLanguage] = useState<'thai' | 'english'>('thai');

  // Step 2 state: selected competencies (3–7, avg ≈5)
  const [selected, setSelected] = useState<string[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Step 3 state: generated questions
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);

  const experienceLevels = [
    { value: 'Entry', label: 'Entry Level (0-2 years)', description: 'Fresh graduates, junior positions' },
    { value: 'Mid', label: 'Mid Level (2-5 years)', description: 'Experienced professionals' },
    { value: 'Senior', label: 'Senior Level (5+ years)', description: 'Senior and lead positions' },
    { value: 'Executive', label: 'Executive Level (10+ years)', description: 'C-level and senior executives' }
  ];

  // Derived state
  const suggested = useMemo(() => suggestCompetencies(role, level), [role, level]);

  const selectedCompetencies = useMemo(
    () => COMPETENCIES.filter((c) => selected.includes(c.key)),
    [selected]
  );

  const groupedQuestions = useMemo(() => {
    const map = new Map<string, Question[]>();
    for (const q of questions) {
      if (!map.has(q.competencyKey)) map.set(q.competencyKey, []);
      map.get(q.competencyKey)!.push(q);
    }
    return map;
  }, [questions]);

  const totalDuration = useMemo(
    () => questions.reduce((sum, q) => sum + q.duration, 0),
    [questions]
  );

  // When entering Step 2, preload selected with suggested if empty
  useEffect(() => {
    if (currentStep === 1 && selected.length === 0 && suggested.length) {
      setSelected(suggested.map((c) => c.key));
    }
  }, [currentStep, selected.length, suggested]);

  // Handlers
  const handleGenerate = () => {
    const comps = selectedCompetencies.length ? selectedCompetencies : suggested;
    setQuestions(makeQuestions(comps, level));
  };

  const handleRegenerateQuestion = (id: string) => {
    setQuestions((prev) => {
      const q = prev.find((x) => x.id === id);
      if (!q) return prev;
      const comp = COMPETENCIES.find((c) => c.key === q.competencyKey)!;
      const options = generateQuestionText(comp.name, level);
      const newText = options[Math.floor(Math.random() * options.length)];
      const updated: Question = { ...q, id: uid(), text: newText };
      return prev.map((x) => (x.id === id ? updated : x));
    });
  };

  const handleRegenerateByCompetency = (ckey: string) => {
    setQuestions((prev) => {
      const comp = COMPETENCIES.find((c) => c.key === ckey)!;
      const texts = generateQuestionText(comp.name, level);
      return prev.map((q) =>
        q.competencyKey === ckey
          ? { ...q, id: uid(), text: texts[Math.floor(Math.random() * texts.length)] }
          : q
      );
    });
  };

  const handleEditQuestion = (id: string, text: string) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleAddQuestion = (ckey: string) => {
    const comp = COMPETENCIES.find((c) => c.key === ckey)!;
    const [text] = generateQuestionText(comp.name, level);
    setQuestions((prev) => [
      ...prev,
      {
        id: uid(),
        competencyKey: ckey,
        text,
        format: "open",
        duration: 5,
      },
    ]);
  };

  const removeCompetency = (ckey: string) => {
    setSelected((prev) => prev.filter((k) => k !== ckey));
    setQuestions((prev) => prev.filter((q) => q.competencyKey !== ckey));
  };

  const addCompetency = (ckey: string) => {
    setSelected((prev) => (prev.includes(ckey) ? prev : [...prev, ckey]));
  };

  const clearAll = () => {
    setSelected([]);
    setQuestions([]);
  };

  const handleNext = () => {
    if (currentStep === 0) {
      // Step 1 validation
      if (!jrName || !level) {
        message.error('Please fill in all required fields');
        return;
      }
      setCurrentStep(1);
    } else if (currentStep === 1) {
      // Step 2 validation
      if (selected.length === 0) {
        message.error('Please select at least one competency');
        return;
      }
      handleGenerate();
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = () => {
    const payload = {
      is_quick_assessment: true,
      name: jrName,
      role,
      level,
      positions,
      competencies: selected,
      questions,
    };
    console.log("CREATE_JR_PAYLOAD", payload);
    message.success('JR created successfully! Check console for payload.');
    onClose();
  };

  const renderStep1 = () => (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <Text type="secondary" style={{ fontSize: '16px', color: '#6b7280' }}>
          Set up basic information for your JR Assessment
        </Text>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <Form form={form} layout="vertical">
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Form.Item
                label={<span style={{ fontSize: '16px', fontWeight: '600', color: '#374151' }}>JR Name</span>}
                name="jrName"
                rules={[{ required: true, message: 'Please enter JR name' }]}
              >
                <Input
                  placeholder="เช่น Sales Executive Assessment Batch 2025"
                  value={jrName}
                  onChange={(e) => setJrName(e.target.value)}
                  size="large"
                  style={{ 
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    padding: '12px 16px',
                    fontSize: '16px',
                    transition: 'all 0.2s ease'
                  }}
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', fontWeight: '600', color: '#374151' }}>Role Profile</span>}
                name="role"
              >
                <Input
                  placeholder="e.g., Sales Executive, Software Engineer, Product Manager"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  size="large"
                  style={{ 
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    padding: '12px 16px',
                    fontSize: '16px',
                    transition: 'all 0.2s ease'
                  }}
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', fontWeight: '600', color: '#374151' }}>Experience Level</span>}
                name="level"
                rules={[{ required: true, message: 'Please select experience level' }]}
              >
                <Select
                  value={level}
                  onChange={setLevel}
                  size="large"
                  style={{ 
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    height: '48px'
                  }}
                  placeholder="Select experience level"
                >
                  {experienceLevels.map(level => (
                    <Option key={level.value} value={level.value}>
                      <div>
                        <div style={{ fontWeight: '500', fontSize: '15px' }}>{level.label}</div>
                        <div style={{ fontSize: '13px', color: '#9ca3af' }}>{level.description}</div>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', fontWeight: '600', color: '#374151' }}>Number of Positions</span>}
                name="positions"
                rules={[{ required: true, message: 'Please enter number of positions' }]}
              >
                <Input
                  type="number"
                  min={1}
                  placeholder="5"
                  value={positions}
                  onChange={(e) => setPositions(parseInt(e.target.value) || 1)}
                  size="large"
                  style={{ 
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    padding: '12px 16px',
                    fontSize: '16px'
                  }}
                />
              </Form.Item>
            </Col>
            
            <Col span={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', fontWeight: '600', color: '#374151' }}>Question Language</span>}
                name="language"
                rules={[{ required: true, message: 'Please select question language' }]}
              >
                <Select
                  value={language}
                  onChange={setLanguage}
                  size="large"
                  style={{ 
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    height: '48px'
                  }}
                  placeholder="Select question language"
                >
                  <Option value="thai">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px' }}>🇹🇭</span>
                      <span>Thai (ไทย)</span>
                    </div>
                  </Option>
                  <Option value="english">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px' }}>🇺🇸</span>
                      <span>English</span>
                    </div>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

    </div>
  );

  const renderStep2 = () => {
    const showWarning = selected.length < 3 || selected.length > 7;
    
    return (
      <div style={{ padding: '32px' }}>
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <Text type="secondary" style={{ fontSize: '16px', color: '#6b7280' }}>
            Select and customize competencies for your assessment
          </Text>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Header Section */}
          <div style={{ 
            marginBottom: '32px', 
            padding: '24px',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <Text strong style={{ fontSize: '18px', color: '#1e293b' }}>
                  Competency Selection
                </Text>
                <div style={{ marginTop: '4px' }}>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    Choose 3-7 competencies that best match your assessment needs
                  </Text>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  padding: '8px 16px',
                  backgroundColor: selected.length >= 3 && selected.length <= 7 ? '#dcfce7' : '#fef3c7',
                  borderRadius: '20px',
                  border: `1px solid ${selected.length >= 3 && selected.length <= 7 ? '#bbf7d0' : '#fde68a'}`
                }}>
                  <Text strong style={{ 
                    fontSize: '14px', 
                    color: selected.length >= 3 && selected.length <= 7 ? '#166534' : '#92400e'
                  }}>
                    {selected.length} selected
                  </Text>
                </div>
              </div>
            </div>
            
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => setAddOpen(true)}
              style={{
                borderRadius: '8px',
                height: '44px',
                padding: '0 20px',
                fontSize: '15px',
                fontWeight: '600',
                boxShadow: '0 2px 8px rgba(24, 144, 255, 0.2)'
              }}
            >
              Add Competency
            </Button>
          </div>

          {/* Warning Banner */}
          {showWarning && (
            <Alert
              message={selected.length < 3 ? 
                `แนะนำให้เลือกอย่างน้อย 3 รายการ (ปัจจุบัน: ${selected.length})` : 
                `แนะนำให้เลือกไม่เกิน 7 รายการ (ปัจจุบัน: ${selected.length})`
              }
              type="info"
              showIcon
              style={{ marginBottom: '16px', borderRadius: '8px' }}
            />
          )}
          
          {/* Competencies List */}
          <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
            {selected.map((ckey) => {
              const c = COMPETENCIES.find((x) => x.key === ckey);
              if (!c) return null;
              return (
                <div
                  key={ckey}
                  style={{
                    padding: '24px',
                    backgroundColor: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <Text strong style={{ fontSize: '18px', color: '#1f2937', fontWeight: '600' }}>
                          {c.name}
                        </Text>
                      </div>
                      
                      <div>
                        <Text style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.6' }}>
                          {c.definition}
                        </Text>
                      </div>
                    </div>
                    
                    <Button
                      type="text"
                      danger
                      size="small"
                      onClick={() => removeCompetency(ckey)}
                      style={{
                        borderRadius: '8px',
                        height: '32px',
                        padding: '0 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#ef4444',
                        border: '1px solid #fecaca'
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {selected.length === 0 && (
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

  const renderStep3 = () => (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Edit/regenerate/delete questions or add questions for each competency
        </Text>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {selectedCompetencies.map((comp) => {
            const qList = groupedQuestions.get(comp.key) || [];
            return (
              <div
                key={comp.key}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden'
                }}
              >
                <div style={{ 
                  padding: '20px 24px',
                  backgroundColor: '#f8fafc',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Text strong style={{ fontSize: '18px', color: '#1e293b' }}>
                        {comp.name}
                      </Text>
                      <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>
                        {comp.definition}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <Button
                        type="default"
                        size="small"
                        onClick={() => handleRegenerateByCompetency(comp.key)}
                        style={{ borderRadius: '6px' }}
                      >
                        Regenerate All
                      </Button>
                      <Button
                        type="primary"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => handleAddQuestion(comp.key)}
                        style={{ borderRadius: '6px' }}
                      >
                        Add Question
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {qList.length === 0 && (
                      <div style={{ 
                        textAlign: 'center', 
                        padding: '32px', 
                        border: '2px dashed #d1d5db', 
                        borderRadius: '8px',
                        backgroundColor: '#f9fafb'
                      }}>
                        <Text type="secondary" style={{ fontSize: '14px' }}>
                          No questions yet. Click "+ Add Question" to get started.
                        </Text>
                      </div>
                    )}
                    {qList.map((q) => (
                      <div
                        key={q.id}
                        style={{
                          padding: '20px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          backgroundColor: '#ffffff',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Text strong style={{ fontSize: '14px' }}>
                              Q{qList.indexOf(q) + 1}
                            </Text>
                            <Tag color="blue" style={{ fontSize: '11px' }}>
                              {q.format}
                            </Tag>
                            <Tag style={{ fontSize: '11px' }}>
                              {q.duration} min
                            </Tag>
                          </div>
                          <div style={{ marginBottom: '12px' }}>
                            {editingQuestion === q.id ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <Input.TextArea
                                  value={q.text}
                                  onChange={(e) => handleEditQuestion(q.id, e.target.value)}
                                  rows={3}
                                  style={{ fontSize: '14px' }}
                                />
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                  <span style={{ fontSize: '12px', color: '#666' }}>Duration (minutes):</span>
                                  <InputNumber
                                    min={1}
                                    max={30}
                                    value={q.duration}
                                    onChange={(value) => {
                                      if (value) {
                                        setQuestions(prev => prev.map(question => 
                                          question.id === q.id ? { ...question, duration: value } : question
                                        ));
                                      }
                                    }}
                                    style={{ width: '80px' }}
                                  />
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
                              <Text style={{ fontSize: '14px', lineHeight: '1.5' }}>
                                {q.text}
                              </Text>
                            )}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Button
                            type="link"
                            size="small"
                            onClick={() => setEditingQuestion(q.id)}
                            disabled={editingQuestion !== null}
                          >
                            Edit
                          </Button>
                          <Button
                            type="link"
                            size="small"
                            onClick={() => handleRegenerateQuestion(q.id)}
                            disabled={editingQuestion !== null}
                          >
                            Regenerate
                          </Button>
                          <Button
                            type="link"
                            size="small"
                            danger
                            onClick={() => handleDeleteQuestion(q.id)}
                            disabled={editingQuestion !== null}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {questions.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            border: '2px dashed #d9d9d9', 
            borderRadius: '8px',
            backgroundColor: '#fafafa'
          }}>
            <Text type="secondary">ยังไม่มีคำถามที่สร้าง กรุณาตรวจสอบการเลือกในขั้นตอนก่อนหน้า</Text>
          </div>
        )}
        
        {/* Footer with Duration */}
        {questions.length > 0 && (
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            backgroundColor: '#f6f8ff', 
            borderRadius: '8px',
            border: '1px solid #d6e4ff',
            textAlign: 'center'
          }}>
            <Text strong style={{ fontSize: '14px', color: '#1890ff' }}>
              Estimated duration: ~{totalDuration}m
            </Text>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Review and confirm before creating JR (for assessment only)
        </Text>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '900px' }}>
        {/* Candidate View */}
        <Card
          title="Candidate Experience Preview"
          size="small"
          style={{ 
            border: '1px solid #e2e8f0', 
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden'
          }}
        >
          <div style={{ padding: '0', backgroundColor: '#f8fafc' }}>
            {/* Mock Assessment Interface */}
            <div style={{ 
              backgroundColor: 'white', 
              margin: '20px', 
              borderRadius: '16px', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              border: '1px solid #e5e7eb'
            }}>
              {/* Header */}
              <div style={{ 
                padding: '24px', 
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#fafbfc'
              }}>
                <div>
                  <Text strong style={{ fontSize: '18px', color: '#1e293b', fontWeight: '600' }}>
                    Question 1 of {questions.length}
                  </Text>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '8px 12px',
                  backgroundColor: '#fef2f2',
                  borderRadius: '8px',
                  border: '1px solid #fecaca'
                }}>
                  <span style={{ fontSize: '16px' }}>⏰</span>
                  <Text style={{ fontSize: '16px', color: '#dc2626', fontWeight: '700' }}>
                    03:58
                  </Text>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div style={{ padding: '0 24px 20px', backgroundColor: '#fafbfc' }}>
                <div style={{ 
                  height: '6px', 
                  backgroundColor: '#e2e8f0', 
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: '20%', 
                    height: '100%', 
                    backgroundColor: '#3b82f6',
                    borderRadius: '3px',
                    boxShadow: '0 1px 3px rgba(59, 130, 246, 0.3)'
                  }}></div>
                </div>
              </div>
              
              {/* Question Content */}
              <div style={{ padding: '0 24px 32px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <Text style={{ fontSize: '16px', lineHeight: '1.7', color: '#374151' }}>
                    Please provide an example of a past situation where you had to analyze complex data to find the root cause of a problem, and explain what tools or analytical methods you used to gather data and make decisions to solve that problem.
                  </Text>
                </div>
                
                <div style={{ 
                  marginBottom: '28px',
                  padding: '16px',
                  backgroundColor: '#f0f9ff',
                  borderRadius: '8px',
                  border: '1px solid #bae6fd'
                }}>
                  <Text style={{ fontSize: '14px', color: '#0369a1', fontWeight: '500' }}>
                    Please answer the question by recording your voice in Thai within the specified time.
                  </Text>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      backgroundColor: '#1e40af',
                      borderColor: '#1e40af',
                      borderRadius: '10px',
                      height: '52px',
                      padding: '0 36px',
                      fontSize: '16px',
                      fontWeight: '600',
                      boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)'
                    }}
                  >
                    🎤 Record Answer
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Recruiter Controls */}
            <div style={{ 
              padding: '16px 20px', 
              backgroundColor: '#f1f5f9',
              borderTop: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <Text style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px', display: 'block' }}>
                Recruiter Controls
              </Text>
              <Button
                type="default"
                size="small"
                style={{
                  borderRadius: '6px',
                  height: '32px',
                  padding: '0 16px',
                  fontSize: '13px',
                  border: '1px solid #cbd5e1',
                  color: '#475569'
                }}
              >
                Next Question →
              </Button>
            </div>
          </div>
        </Card>

        {/* Recruiter Summary */}
        <Card
          title="Recruiter Summary"
          size="small"
          style={{ border: '1px solid #d9d9d9', borderRadius: '8px' }}
        >
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong style={{ fontSize: '13px' }}>JR Name:</Text>
                <Text style={{ fontSize: '13px' }}>{jrName || "—"}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong style={{ fontSize: '13px' }}>Role:</Text>
                <Text style={{ fontSize: '13px' }}>{role || "—"}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong style={{ fontSize: '13px' }}>Level:</Text>
                <Text style={{ fontSize: '13px' }}>{level}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong style={{ fontSize: '13px' }}># Positions:</Text>
                <Text style={{ fontSize: '13px' }}>{positions}</Text>
              </div>
              <div>
                <Text strong style={{ fontSize: '13px', display: 'block', marginBottom: '8px' }}>Competencies:</Text>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {selectedCompetencies.map((c) => (
                    <Tag key={c.key} style={{ fontSize: '11px', margin: '0' }}>
                      {c.name}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

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

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return jrName && level;
      case 1:
        return selected.length > 0;
      case 2:
        return questions.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={1000}
        centered
        closable={false}
        maskClosable={false}
        styles={{
          mask: { 
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)'
          },
          content: {
            padding: 0,
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 32px 64px rgba(0, 0, 0, 0.3)',
            backgroundColor: 'white',
            border: '1px solid #e2e8f0'
          }
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '28px 36px', 
          borderBottom: '1px solid #f1f5f9',
          backgroundColor: '#fafbfc'
        }}>
          <div>
            <Title level={3} style={{ 
              margin: 0, 
              fontSize: '24px', 
              color: '#1e293b', 
              fontWeight: '700',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Quick Assessment
            </Title>
          </div>
          
          {/* Step Indicators */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {[0, 1, 2, 3].map((step) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '700',
                    backgroundColor: step <= currentStep ? '#3b82f6' : '#f1f5f9',
                    color: step <= currentStep ? 'white' : '#94a3b8',
                    border: step === currentStep ? '3px solid #dbeafe' : '2px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    boxShadow: step <= currentStep ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
                  }}
                >
                  {step < currentStep ? '✓' : step + 1}
                </div>
                <Text 
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: step === currentStep ? '700' : '500',
                    color: step <= currentStep ? '#1e293b' : '#64748b'
                  }}
                >
                  {['Basic Setup', 'Competencies', 'Questions', 'Preview'][step]}
                </Text>
              </div>
            ))}
          </div>
          
          <Button
            type="text"
            icon={<CloseOutlined style={{ fontSize: '20px', color: '#9ca3af' }} />}
            onClick={onClose}
            style={{ 
              width: '40px', 
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close modal"
          />
        </div>


        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {renderCurrentStep()}
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '28px 36px', 
          borderTop: '1px solid #f1f5f9', 
          backgroundColor: '#fafbfc'
        }}>
          <Button
            type="default"
            icon={<LeftOutlined />}
            onClick={handlePrevious}
            disabled={currentStep === 0}
            style={{ 
              borderRadius: '12px',
              height: '52px',
              padding: '0 28px',
              fontSize: '16px',
              fontWeight: '600',
              border: '2px solid #e2e8f0',
              color: '#64748b',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}
          >
            ← Back
          </Button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Text type="secondary" style={{ fontSize: '14px', color: '#6b7280' }}>
              Step {currentStep + 1} of 4
            </Text>
          </div>

          {currentStep === 3 ? (
            <Button
              type="primary"
              onClick={handleCreate}
              style={{ 
                borderRadius: '12px',
                height: '52px',
                padding: '0 36px',
                fontSize: '16px',
                fontWeight: '700',
                backgroundColor: '#10b981',
                borderColor: '#10b981',
                boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)'
              }}
            >
              ✨ Create JR
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<RightOutlined />}
              onClick={handleNext}
              disabled={!canProceed()}
              style={{ 
                borderRadius: '12px',
                height: '52px',
                padding: '0 28px',
                fontSize: '16px',
                fontWeight: '700',
                backgroundColor: '#3b82f6',
                borderColor: '#3b82f6',
                boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)'
              }}
            >
              Next →
            </Button>
          )}
        </div>
      </Modal>

      {/* Add Competency Modal */}
      {addOpen && (
        <Modal
          open={addOpen}
          onCancel={() => setAddOpen(false)}
          footer={null}
          width={600}
          centered
          title="Add Competencies"
          styles={{
            mask: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
            content: {
              padding: 0,
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
              backgroundColor: 'white'
            }
          }}
        >
          <div style={{ padding: '24px' }}>
            <Input
              placeholder="Search by name or definition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ marginBottom: '16px' }}
              prefix={<PlusOutlined />}
            />
            
            <div style={{ maxHeight: '300px', overflow: 'auto' }}>
              {COMPETENCIES.filter((c) => {
                const q = search.trim().toLowerCase();
                if (!q) return !selected.includes(c.key);
                return (
                  !selected.includes(c.key) && (
                    c.name.toLowerCase().includes(q) ||
                    c.definition.toLowerCase().includes(q)
                  )
                );
              }).map((c) => (
                <div key={c.key} style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #f0f0f0',
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                      {c.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {c.definition}
                    </div>
                  </div>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => addCompetency(c.key)}
                    style={{ minWidth: '60px' }}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <Button type="primary" onClick={() => setAddOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
