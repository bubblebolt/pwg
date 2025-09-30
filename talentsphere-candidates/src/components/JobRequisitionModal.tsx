'use client';

import React, { useState, useEffect } from 'react';
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
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  UploadOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  StarOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  BulbOutlined,
  RocketOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

interface RoleProfile {
  id: string;
  name: string;
  type: string;
  language: string;
  objective: string;
  description: string[];
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
}

interface CVCriteria {
  id: string;
  criteria: string;
  tag: string;
  weight: number;
}

interface PrescreeningQuestion {
  id: string;
  question: string;
  description: string;
  type: 'yesno' | 'multiple' | 'range' | 'date';
  correctAnswer?: string;
}

interface JobRequisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickRoleProfile?: () => void;
}

const roleProfiles: RoleProfile[] = [
  {
    id: '1',
    name: 'Test 15',
    type: 'Standard',
    language: 'TH',
    category: 'Engineering',
    difficulty: 'Medium',
    estimatedTime: '30 min',
    objective: 'พัฒนาระบบเทคโนโลยีที่ตอบโจทย์และขยายขนาดได้ตามการเติบโตของธุรกิจ ผ่านการเขียนโค้ดที่มีคุณภาพควบคู่กับการทำงานเป็นทีมแบบอไจล์ โดยถอดความต้องการทางธุรกิจมาสร้างเป็นระบบที่ทำงานได้ดีและบำรุงรักษาง่ายในระยะยาว',
    description: [
      'ออกแบบและพัฒนาซอฟต์แวร์โดยเลือกใช้เทคโนโลยีที่เหมาะสมตามมาตรฐานและแนวปฏิบัติที่ดีของอุตสาหกรรม',
      'ทำงานร่วมกับทีมแบบอไจล์อย่างมีประสิทธิภาพเพื่อส่งมอบคุณค่าเป็นระยะผ่านรอบการทำงานแต่ละสปรินต์',
      'รักษาคุณภาพโค้ดด้วยการทดสอบอย่างครอบคลุม ตรวจสอบโค้ดร่วมกับเพื่อนร่วมทีม และยึดมั่นในมาตรฐานการเขียนโค้ด',
      'แปลงความต้องการทางธุรกิจให้เป็นข้อกำหนดทางเทคนิคและพัฒนาเป็นโซลูชันที่ใช้งานได้จริง',
      'จัดทำเอกสารทางเทคนิคและปรับปรุงระบบอย่างต่อเนื่องผ่านการรีแฟคเตอร์โค้ดและนำนวัตกรรมมาใช้'
    ]
  },
  {
    id: '2',
    name: 'Project & Change Practitioner',
    type: 'Standard',
    language: 'TH',
    category: 'Management',
    difficulty: 'Hard',
    estimatedTime: '45 min',
    objective: 'จัดการโครงการและนำการเปลี่ยนแปลงในองค์กรอย่างมีประสิทธิภาพ',
    description: [
      'วางแผนและจัดการโครงการตามมาตรฐาน PMI',
      'ประสานงานกับทีมและผู้มีส่วนได้ส่วนเสีย',
      'ติดตามและรายงานความคืบหน้าของโครงการ',
      'จัดการความเสี่ยงและปัญหาที่เกิดขึ้น',
      'นำการเปลี่ยนแปลงในองค์กรอย่างเป็นระบบ'
    ]
  },
  {
    id: '3',
    name: 'Data & Insight Analyst',
    type: 'Standard',
    language: 'TH',
    category: 'Analytics',
    difficulty: 'Medium',
    estimatedTime: '35 min',
    objective: 'วิเคราะห์ข้อมูลและสร้างข้อมูลเชิงลึกเพื่อสนับสนุนการตัดสินใจทางธุรกิจ',
    description: [
      'รวบรวมและวิเคราะห์ข้อมูลจากแหล่งต่างๆ',
      'สร้างรายงานและแดชบอร์ดสำหรับผู้บริหาร',
      'ใช้เครื่องมือวิเคราะห์ข้อมูลเช่น SQL, Python, R',
      'สร้างแบบจำลองการทำนายและ Machine Learning',
      'ให้คำแนะนำเชิงกลยุทธ์จากข้อมูล'
    ]
  },
  {
    id: '4',
    name: 'Office & Admin Coordinator',
    type: 'Standard',
    language: 'TH',
    category: 'Administration',
    difficulty: 'Easy',
    estimatedTime: '25 min',
    objective: 'จัดการงานธุรการและประสานงานภายในองค์กร',
    description: [
      'จัดการเอกสารและระบบธุรการ',
      'ประสานงานระหว่างแผนกต่างๆ',
      'จัดเตรียมการประชุมและกิจกรรม',
      'ดูแลระบบข้อมูลและรายงาน',
      'สนับสนุนการทำงานของทีม'
    ]
  },
  {
    id: '5',
    name: 'Technical Engineer / Developer',
    type: 'Standard',
    language: 'TH',
    category: 'Engineering',
    difficulty: 'Hard',
    estimatedTime: '40 min',
    objective: 'พัฒนาระบบเทคโนโลยีที่ตอบโจทย์และขยายขนาดได้ตามการเติบโตของธุรกิจ',
    description: [
      'ออกแบบและพัฒนาซอฟต์แวร์โดยเลือกใช้เทคโนโลยีที่เหมาะสม',
      'ทำงานร่วมกับทีมแบบอไจล์อย่างมีประสิทธิภาพ',
      'รักษาคุณภาพโค้ดด้วยการทดสอบอย่างครอบคลุม',
      'แปลงความต้องการทางธุรกิจให้เป็นข้อกำหนดทางเทคนิค',
      'จัดทำเอกสารทางเทคนิคและปรับปรุงระบบอย่างต่อเนื่อง'
    ]
  },
  {
    id: '6',
    name: 'Sales & Relationship Executive',
    type: 'Standard',
    language: 'TH',
    category: 'Sales',
    difficulty: 'Medium',
    estimatedTime: '30 min',
    objective: 'สร้างและรักษาความสัมพันธ์กับลูกค้าเพื่อเพิ่มยอดขาย',
    description: [
      'สร้างและพัฒนาความสัมพันธ์กับลูกค้า',
      'เสนอขายผลิตภัณฑ์และบริการ',
      'ติดตามและดูแลลูกค้า',
      'วิเคราะห์ตลาดและโอกาสทางธุรกิจ',
      'บรรลุเป้าหมายยอดขายที่กำหนด'
    ]
  },
  {
    id: '7',
    name: 'Service & Frontline Associate',
    type: 'Standard',
    language: 'TH',
    category: 'Customer Service',
    difficulty: 'Easy',
    estimatedTime: '20 min',
    objective: 'ให้บริการลูกค้าอย่างมีคุณภาพและสร้างความพึงพอใจ',
    description: [
      'ให้บริการลูกค้าอย่างเป็นมิตรและมีประสิทธิภาพ',
      'แก้ไขปัญหาของลูกค้า',
      'ให้ข้อมูลและคำแนะนำเกี่ยวกับผลิตภัณฑ์',
      'รักษามาตรฐานการบริการ',
      'สร้างความพึงพอใจให้กับลูกค้า'
    ]
  }
];

export default function JobRequisitionModal({ isOpen, onClose, onQuickRoleProfile }: JobRequisitionModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<RoleProfile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formValid, setFormValid] = useState(false);

  // Check form validation in real-time
  React.useEffect(() => {
    const checkFormValidity = () => {
      if (currentStep === 1) {
        const jobTitle = form.getFieldValue('jobTitle');
        const headcount = form.getFieldValue('headcount');
        const isValid = jobTitle && jobTitle.trim() !== '' && headcount && headcount > 0;
        setFormValid(isValid);
      } else {
        setFormValid(true);
      }
    };

    checkFormValidity();
    
    // Listen to form changes
    const timer = setInterval(checkFormValidity, 500);
    return () => clearInterval(timer);
  }, [currentStep, form]);

  const steps = [
    {
      title: 'Choose a Role Profile',
      description: 'Select a role profile',
      icon: <UserOutlined />
    },
    {
      title: 'Job Details',
      description: 'Enter job information',
      icon: <FileTextOutlined />
    },
    {
      title: 'Configure Evaluation',
      description: 'Set up candidate evaluation',
      icon: <SettingOutlined />
    },
    {
      title: 'Design Rubric',
      description: 'Create evaluation criteria',
      icon: <BulbOutlined />
    },
    {
      title: 'Review & Create',
      description: 'Review and create JR',
      icon: <CheckCircleOutlined />
    }
  ];

  const filteredRoles = roleProfiles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = async () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      try {
        const values = await form.validateFields(['jobTitle', 'headcount']);
        if (!values.jobTitle || !values.headcount || values.headcount <= 0) {
          message.error('Please fill in all required fields');
          return;
        }
      } catch (error) {
        message.error('Please fill in all required fields');
        return; // Don't proceed if validation fails
      }
    }
    
    setIsLoading(true);
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsLoading(false);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRoleSelect = (role: RoleProfile) => {
    setSelectedRole(role);
  };

  const handleFinish = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      message.success('Job Requisition created successfully!');
      onClose();
    }, 1500);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'green';
      case 'Medium': return 'orange';
      case 'Hard': return 'red';
      default: return 'blue';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Engineering': return '#1890ff';
      case 'Management': return '#722ed1';
      case 'Analytics': return '#52c41a';
      case 'Administration': return '#fa8c16';
      case 'Sales': return '#eb2f96';
      case 'Customer Service': return '#13c2c2';
      default: return '#8c8c8c';
    }
  };

  const renderStep1 = () => (
    <div style={{ padding: '0' }}>
      {/* Search Section */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          marginBottom: '16px'
        }}>
          <SearchOutlined style={{ fontSize: '18px', color: '#1890ff' }} />
          <Text strong style={{ fontSize: '16px', color: '#262626' }}>Search Role Profiles</Text>
        </div>
        <Input
          size="large"
          placeholder="Search by role name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          style={{
            height: '48px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '2px solid #f0f0f0',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
          <Badge count={filteredRoles.length} style={{ backgroundColor: '#52c41a' }} />
          <Text style={{ fontSize: '14px', color: '#8c8c8c' }}>
            {searchTerm ? 'matching roles' : 'total roles'} available
          </Text>
        </div>
      </div>

      {/* Two Column Layout */}
      <Row gutter={24} style={{ height: '400px' }}>
        {/* Left Column - Role List */}
        <Col span={12}>
          <div style={{ 
            height: '100%', 
            overflowY: 'auto', 
            paddingRight: '12px',
            borderRight: '1px solid #f0f0f0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Title level={5} style={{ margin: 0, color: '#262626' }}>
                Available Roles
              </Title>
              {onQuickRoleProfile && (
                <Button
                  type="default"
                  size="small"
                  icon={<RocketOutlined />}
                  onClick={onQuickRoleProfile}
                  style={{
                    borderColor: '#2596be',
                    color: '#2596be',
                    fontSize: '12px',
                    height: '28px',
                    padding: '4px 12px'
                  }}
                >
                  Quick Role Profile
                </Button>
              )}
            </div>
            <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
              {filteredRoles.map((role, index) => (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelect(role)}
                  style={{
                    padding: '12px',
                    border: selectedRole?.id === role.id ? '2px solid #1890ff' : '1px solid #f0f0f0',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    backgroundColor: selectedRole?.id === role.id ? '#f6ffed' : '#fff',
                    transition: 'all 0.3s ease',
                    boxShadow: selectedRole?.id === role.id 
                      ? '0 2px 8px rgba(24, 144, 255, 0.15)' 
                      : '0 1px 3px rgba(0,0,0,0.06)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedRole?.id !== role.id) {
                      e.currentTarget.style.borderColor = '#40a9ff';
                      e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedRole?.id !== role.id) {
                      e.currentTarget.style.borderColor = '#f0f0f0';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: getCategoryColor(role.category),
                          borderRadius: '50%'
                        }} />
                        <Title level={5} style={{ margin: 0, fontSize: '14px', color: '#262626' }}>
                          {role.name}
                        </Title>
                      </div>
                      <Text style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '6px', display: 'block' }}>
                        {role.category}
                      </Text>
                      <Space wrap size="small">
                        <Tag color="blue" style={{ fontSize: '10px', padding: '1px 4px' }}>
                          {role.type}
                        </Tag>
                        <Tag color="green" style={{ fontSize: '10px', padding: '1px 4px' }}>
                          {role.language}
                        </Tag>
                        <Tag color={getDifficultyColor(role.difficulty)} style={{ fontSize: '10px', padding: '1px 4px' }}>
                          {role.difficulty}
                        </Tag>
                        <Tag color="purple" style={{ fontSize: '10px', padding: '1px 4px' }}>
                          {role.estimatedTime}
                        </Tag>
                      </Space>
                    </div>
                    {selectedRole?.id === role.id && (
                      <CheckCircleOutlined style={{ fontSize: '16px', color: '#52c41a' }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* Right Column - Selected Role Details */}
        <Col span={12}>
          <div style={{ height: '100%', paddingLeft: '12px' }}>
            {selectedRole ? (
              <div>
                <Title level={5} style={{ marginBottom: '16px', color: '#262626' }}>
                  Role Details
                </Title>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#fafafa',
                  borderRadius: '8px',
                  border: '1px solid #d9d9d9',
                  height: 'calc(100% - 50px)',
                  overflowY: 'auto'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: getCategoryColor(selectedRole.category),
                      borderRadius: '50%',
                      marginRight: '6px'
                    }} />
                    <Title level={4} style={{ margin: 0, fontSize: '16px', color: '#262626' }}>
                      {selectedRole.name}
                    </Title>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <Text strong style={{ fontSize: '13px', color: '#262626', display: 'block', marginBottom: '6px' }}>
                      Objective
                    </Text>
                    <Paragraph style={{ 
                      margin: 0, 
                      fontSize: '13px', 
                      color: '#595959', 
                      lineHeight: '1.4',
                      padding: '8px',
                      backgroundColor: '#fff',
                      borderRadius: '4px',
                      border: '1px solid #e8e8e8'
                    }}>
                      {selectedRole.objective}
                    </Paragraph>
                  </div>

                  <div>
                    <Text strong style={{ fontSize: '13px', color: '#262626', display: 'block', marginBottom: '6px' }}>
                      Job Description
                    </Text>
                    <div style={{ 
                      fontSize: '13px', 
                      color: '#595959', 
                      lineHeight: '1.4',
                      padding: '8px',
                      backgroundColor: '#fff',
                      borderRadius: '4px',
                      border: '1px solid #e8e8e8'
                    }}>
                      {selectedRole.description.map((item, index) => (
                        <div key={index} style={{ marginBottom: '4px', display: 'flex', alignItems: 'flex-start' }}>
                          <span style={{ 
                            color: '#52c41a', 
                            marginRight: '6px', 
                            fontSize: '12px',
                            lineHeight: '1.3'
                          }}>•</span>
                          <span style={{ flex: 1 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: '#8c8c8c'
              }}>
                <UserOutlined style={{ fontSize: '32px', marginBottom: '12px' }} />
                <Text style={{ fontSize: '14px' }}>Select a role to view details</Text>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );

  const renderStep2 = () => (
    <div style={{ padding: '0' }}>
      <Form form={form} layout="vertical">
        {/* Enhanced Selected Role Info */}
        <div style={{ 
          padding: '20px', 
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)', 
          borderRadius: '12px',
          marginBottom: '32px',
          border: '1px solid #91d5ff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            width: '60px',
            height: '60px',
            background: 'radial-gradient(circle, rgba(24,144,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%'
          }} />
          <Row gutter={24}>
            <Col span={12}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <UserOutlined style={{ color: '#1890ff' }} />
                <Text style={{ fontSize: '14px', color: '#8c8c8c' }}>Selected Role Profile:</Text>
              </div>
              <div>
                <Text strong style={{ fontSize: '18px', color: '#262626' }}>{selectedRole?.name}</Text>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <FileTextOutlined style={{ color: '#52c41a' }} />
                <Text style={{ fontSize: '14px', color: '#8c8c8c' }}>Application Form Language:</Text>
              </div>
              <div>
                <Tag color="green" style={{ fontSize: '14px', padding: '4px 12px' }}>{selectedRole?.language}</Tag>
              </div>
            </Col>
          </Row>
        </div>

        {/* Enhanced Job Title and Headcount */}
        <Row gutter={24} style={{ marginBottom: '32px' }}>
          <Col span={12}>
            <Form.Item
              label={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Text strong style={{ fontSize: '16px', color: '#262626' }}>Job Title</Text>
                  <Text style={{ color: '#ff4d4f' }}>*</Text>
                </div>
              }
              name="jobTitle"
              rules={[{ required: true, message: 'Please enter job title' }]}
            >
              <Input 
                size="large" 
                placeholder="Enter the job title" 
                style={{ 
                  height: '48px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '2px solid #f0f0f0',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#1890ff';
                  e.target.style.boxShadow = '0 4px 12px rgba(24, 144, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#f0f0f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Text strong style={{ fontSize: '16px', color: '#262626' }}>Headcount</Text>
                  <Text style={{ color: '#ff4d4f' }}>*</Text>
                </div>
              }
              name="headcount"
              rules={[{ required: true, message: 'Please enter headcount' }]}
            >
              <InputNumber
                size="large"
                min={1}
                max={100}
                style={{ 
                  width: '100%', 
                  height: '48px',
                  fontSize: '16px',
                  borderRadius: '8px'
                }}
                placeholder="Enter value"
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider style={{ margin: '32px 0', borderColor: '#f0f0f0' }} />

        {/* Enhanced Resume/CV Section */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#722ed1',
              borderRadius: '50%',
              marginRight: '12px'
            }} />
            <Title level={5} style={{ margin: 0, fontSize: '18px', color: '#262626' }}>
              Resume/CV
            </Title>
          </div>
          <Paragraph style={{ fontSize: '15px', color: '#8c8c8c', marginBottom: '20px' }}>
            Specify whether a CV is required for application.
          </Paragraph>
          <Form.Item name="resumeRequired" initialValue={true}>
            <Radio.Group>
              <Radio value={true} style={{ fontSize: '15px', color: '#262626' }}>
                <span style={{ marginLeft: '8px' }}>Required</span>
              </Radio>
              <Radio value={false} style={{ fontSize: '15px', color: '#262626' }}>
                <span style={{ marginLeft: '8px' }}>Not Required</span>
              </Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        {/* Enhanced Additional Form Fields Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#fa8c16',
              borderRadius: '50%',
              marginRight: '12px'
            }} />
            <Title level={5} style={{ margin: 0, fontSize: '18px', color: '#262626' }}>
              Additional Form Fields
            </Title>
          </div>
          <Paragraph style={{ fontSize: '15px', color: '#8c8c8c', marginBottom: '8px' }}>
            Create up to 5 additional form fields for reference, to get candidate information.
          </Paragraph>
          <Paragraph style={{ fontSize: '14px', color: '#bfbfbf', marginBottom: '20px' }}>
            เพิ่มคำถามได้สูงสุด 5 ข้อเพื่อเก็บข้อมูลเพิ่มเติม
          </Paragraph>
          <Button 
            type="dashed" 
            icon={<PlusOutlined />}
            size="large"
            style={{ 
              height: '48px',
              border: '2px dashed #d9d9d9',
              color: '#8c8c8c',
              fontSize: '15px',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#1890ff';
              e.currentTarget.style.color = '#1890ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#d9d9d9';
              e.currentTarget.style.color = '#8c8c8c';
            }}
          >
            เพิ่มคำถาม
          </Button>
        </div>
      </Form>
    </div>
  );

  const renderStep3 = () => (
    <div style={{ padding: '0' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Enhanced CV Prescreening */}
        <div style={{
          padding: '24px',
          border: '2px solid #f0f0f0',
          borderRadius: '12px',
          backgroundColor: '#fff',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Checkbox defaultChecked style={{ marginRight: '12px' }} />
            <Title level={5} style={{ margin: 0, fontSize: '18px', color: '#262626' }}>
              Enable CV Prescreening
            </Title>
          </div>
          <Paragraph style={{ fontSize: '15px', color: '#8c8c8c', marginBottom: '20px' }}>
            Define CV criteria (e.g., experience, education, key skills) to filter candidates.
          </Paragraph>
          <Row gutter={16} style={{ marginBottom: '12px' }}>
            <Col span={12}>
              <Input 
                placeholder="Enter Evaluation Criteria" 
                style={{ height: '40px', borderRadius: '6px' }} 
              />
            </Col>
            <Col span={8}>
              <Input 
                placeholder="Enter tag" 
                style={{ height: '40px', borderRadius: '6px' }} 
              />
            </Col>
            <Col span={4}>
              <Button type="primary" style={{ height: '40px', borderRadius: '6px' }}>
                Add
              </Button>
            </Col>
          </Row>
          <Alert
            message="Please enter at least one CV criterion."
            type="warning"
            showIcon
            style={{ marginBottom: '12px' }}
          />
          <Button type="link" size="small" style={{ padding: 0 }}>
            <InfoCircleOutlined style={{ marginRight: '4px' }} />
            Criteria Suggestions
          </Button>
        </div>

        {/* Enhanced Prescreening Questions */}
        <div style={{
          padding: '24px',
          border: '2px solid #f0f0f0',
          borderRadius: '12px',
          backgroundColor: '#fff',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Checkbox defaultChecked style={{ marginRight: '12px' }} />
            <Title level={5} style={{ margin: 0, fontSize: '18px', color: '#262626' }}>
              Enable Prescreening Questions
            </Title>
          </div>
          <Paragraph style={{ fontSize: '15px', color: '#8c8c8c', marginBottom: '8px' }}>
            Add up to 5 prescreening questions for candidates to complete. Answers will be scored and ranked.
          </Paragraph>
          <Paragraph style={{ fontSize: '14px', color: '#bfbfbf', marginBottom: '20px' }}>
            เพิ่มคำถามได้สูงสุด 5 ข้อเพื่อเก็บข้อมูลเพิ่มเติม
          </Paragraph>
          <Button 
            type="dashed" 
            icon={<PlusOutlined />}
            size="large"
            style={{ 
              height: '48px',
              border: '2px dashed #d9d9d9',
              color: '#8c8c8c',
              fontSize: '15px',
              borderRadius: '8px',
              marginBottom: '12px'
            }}
          >
            เพิ่มคำถาม
          </Button>
          <Alert
            message="Please enter at least one question."
            type="warning"
            showIcon
          />
        </div>

        {/* Enhanced Competency Assessment */}
        <div style={{
          padding: '24px',
          border: '2px solid #f0f0f0',
          borderRadius: '12px',
          backgroundColor: '#fff',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Checkbox defaultChecked style={{ marginRight: '12px' }} />
            <Title level={5} style={{ margin: 0, fontSize: '18px', color: '#262626' }}>
              Enable Competency Assessment
            </Title>
          </div>
          <Paragraph style={{ fontSize: '15px', color: '#8c8c8c', marginBottom: '20px' }}>
            Activate online competency assessments to evaluate candidates.
          </Paragraph>
          
          <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(135deg, #f6ffed 0%, #f0f9ff 100%)', 
            borderRadius: '8px',
            border: '1px solid #b7eb8f'
          }}>
            <Title level={5} style={{ marginBottom: '12px', fontSize: '16px', color: '#262626' }}>
              <SettingOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
              Assessment Details for {selectedRole?.name}
            </Title>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '20px', 
              fontSize: '15px', 
              color: '#595959',
              lineHeight: '1.6'
            }}>
              <li style={{ marginBottom: '8px' }}>⏱️ Duration: 30 minutes</li>
              <li style={{ marginBottom: '8px' }}>🎤 Format: Voice-powered online interview</li>
              <li style={{ marginBottom: '8px' }}>🌐 Language: Thai</li>
              <li style={{ marginBottom: '8px' }}>📱 Compatibility: Desktop and Mobile</li>
            </ul>
          </div>
        </div>
      </Space>
    </div>
  );

  const renderStep4 = () => (
    <div style={{ padding: '0' }}>
      <Title level={4} style={{ marginBottom: '32px', fontSize: '24px', color: '#262626' }}>
        <BulbOutlined style={{ marginRight: '12px', color: '#faad14' }} />
        Design Evaluation Rubric
      </Title>
      <div style={{
        padding: '32px',
        border: '2px solid #f0f0f0',
        borderRadius: '12px',
        backgroundColor: '#fff',
        textAlign: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <BulbOutlined style={{ fontSize: '48px', color: '#faad14', marginBottom: '16px' }} />
        </div>
        <Paragraph style={{ fontSize: '16px', color: '#8c8c8c', marginBottom: '24px' }}>
          Create a comprehensive evaluation rubric for the <strong>{selectedRole?.name}</strong> position.
        </Paragraph>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          size="large"
          style={{ 
            height: '48px',
            fontSize: '16px',
            borderRadius: '8px',
            padding: '0 32px'
          }}
        >
          Add Evaluation Criteria
        </Button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div style={{ padding: '0' }}>
      <Title level={4} style={{ marginBottom: '32px', fontSize: '24px', color: '#262626' }}>
        <CheckCircleOutlined style={{ marginRight: '12px', color: '#52c41a' }} />
        Review & Create Job Requisition
      </Title>
      <div style={{
        padding: '32px',
        border: '2px solid #f0f0f0',
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
      }}>
        <Title level={5} style={{ marginBottom: '24px', fontSize: '20px', color: '#262626' }}>
          Job Requisition Summary
        </Title>
        <Row gutter={24} style={{ marginBottom: '24px' }}>
          <Col span={12}>
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ fontSize: '14px', color: '#8c8c8c' }}>Role Profile:</Text>
              <div style={{ fontSize: '16px', color: '#262626', marginTop: '4px' }}>
                {selectedRole?.name}
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ fontSize: '14px', color: '#8c8c8c' }}>Job Title:</Text>
              <div style={{ fontSize: '16px', color: '#262626', marginTop: '4px' }}>
                {form.getFieldValue('jobTitle') || 'Not specified'}
              </div>
            </div>
          </Col>
        </Row>
        <Divider style={{ margin: '24px 0' }} />
        <Row gutter={24}>
          <Col span={12}>
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ fontSize: '14px', color: '#8c8c8c' }}>Headcount:</Text>
              <div style={{ fontSize: '16px', color: '#262626', marginTop: '4px' }}>
                {form.getFieldValue('headcount') || 'Not specified'}
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ fontSize: '14px', color: '#8c8c8c' }}>Resume Required:</Text>
              <div style={{ fontSize: '16px', color: '#262626', marginTop: '4px' }}>
                {form.getFieldValue('resumeRequired') ? 'Yes' : 'No'}
              </div>
            </div>
          </Col>
        </Row>
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
      case 4:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedRole !== null;
      case 1:
        const jobTitle = form.getFieldValue('jobTitle');
        const headcount = form.getFieldValue('headcount');
        return jobTitle && jobTitle.trim() !== '' && headcount && headcount > 0;
      default:
        return true;
    }
  };

  // Force enable Next button when form is valid
  const isFormValid = () => {
    if (currentStep === 1) {
      const jobTitle = form.getFieldValue('jobTitle');
      const headcount = form.getFieldValue('headcount');
      return jobTitle && jobTitle.trim() !== '' && headcount && headcount > 0;
    }
    return true;
  };

  if (showSuccess) {
    return (
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={400}
        centered
        closable={false}
      >
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <CheckCircleOutlined style={{ fontSize: '64px', color: '#52c41a', marginBottom: '24px' }} />
          <Title level={3} style={{ color: '#52c41a', marginBottom: '16px' }}>
            Success!
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#8c8c8c' }}>
            Job Requisition has been created successfully.
          </Paragraph>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <Title level={4} style={{ margin: 0, marginBottom: '6px', fontSize: '16px', color: '#262626' }}>
                {steps[currentStep].title}
              </Title>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Text type="secondary" style={{ fontSize: '14px' }}>
                  Step {currentStep + 1} of {steps.length}
                </Text>
                <Progress
                  percent={((currentStep + 1) / steps.length) * 100}
                  size="small"
                  style={{ width: '120px' }}
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                />
              </div>
            </div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={onClose}
              style={{ 
                border: 'none', 
                padding: '8px',
                borderRadius: '6px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            />
          </div>
        }
        open={isOpen}
        onCancel={onClose}
        width={900}
        centered
        closable={false}
        styles={{
          body: { padding: '0' }
        }}
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          top: 20
        }}
        bodyStyle={{ padding: '32px' }}
        footer={
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            padding: '20px 0',
            borderTop: '1px solid #f0f0f0'
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
            <div>
              {currentStep === steps.length - 1 ? (
                <Button 
                  type="primary" 
                  onClick={handleFinish}
                  loading={isLoading}
                  size="large"
                  style={{ 
                    height: '48px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    padding: '0 32px',
                    background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(24, 144, 255, 0.3)'
                  }}
                >
                  Create Job Requisition
                </Button>
              ) : (
                <Button
                  type="primary"
                  icon={<RightOutlined />}
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
                  Next
                </Button>
              )}
            </div>
          </div>
        }
      >
        {renderCurrentStep()}
      </Modal>
    </>
  );
}