'use client';

import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, Steps, Form, Input, Select, Radio, Row, Col, Space, Divider, Badge, Tag, Progress, Alert, Spin } from 'antd';
import { 
  ProfileOutlined,
  RightOutlined,
  LeftOutlined,
  BulbOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined as SearchIcon,
  PlusOutlined,
  MinusOutlined,
  StarOutlined,
  RocketOutlined,
  UserOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  CheckOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { loadCompetencies, Competency } from '@/lib/csv-utils';

const { Title, Text, Paragraph } = Typography;

export default function QuickRoleProfileNewPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCompetencies, setSelectedCompetencies] = useState<Competency[]>([]);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [allCompetencies, setAllCompetencies] = useState<Competency[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [addingToCompetency, setAddingToCompetency] = useState<number | null>(null);
  const [customQuestionText, setCustomQuestionText] = useState('');

  // Load competencies on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const competencies = await loadCompetencies();
        setAllCompetencies(competencies);
      } catch (error) {
        console.error('Error loading competencies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const experienceLevels = [
    { value: 1, label: 'Operational', description: 'Entry-level positions' },
    { value: 2, label: 'Professional/Senior Professional', description: 'Mid-level with expertise' },
    { value: 3, label: 'First-Level Manager', description: 'Team leadership role' },
    { value: 4, label: 'Mid Level Manager', description: 'Department management' }
  ];

  const languages = [
    { value: 'th', label: 'Thai' },
    { value: 'en', label: 'English' }
  ];

  const handleStep1Submit = async (values: any) => {
    setIsGenerating(true);
    try {
      // Simulate AI processing with better feedback
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate AI suggestions based on role title
      const roleTitle = values.roleTitle?.toLowerCase() || '';
      
      // Simple AI logic to select relevant competencies
      let suggestions: Competency[] = [];
      
      // Technical roles
      if (roleTitle.includes('developer') || roleTitle.includes('engineer') || roleTitle.includes('programmer')) {
        suggestions = allCompetencies.filter(comp => 
          comp.name === 'Problem Solving' ||
          comp.name === 'Learning Agility' ||
          comp.name === 'Attention to Detail'
        ).slice(0, 3);
      }
      // Management roles
      else if (roleTitle.includes('manager') || roleTitle.includes('lead') || roleTitle.includes('director')) {
        suggestions = allCompetencies.filter(comp => 
          comp.name === 'Decision Making' ||
          comp.name === 'Effective Communication' ||
          comp.name === 'Team Building'
        ).slice(0, 3);
      }
      // Business roles
      else if (roleTitle.includes('business') || roleTitle.includes('analyst') || roleTitle.includes('consultant')) {
        suggestions = allCompetencies.filter(comp => 
          comp.name === 'Analytical Thinking' ||
          comp.name === 'Effective Communication' ||
          comp.name === 'Stakeholder Management'
        ).slice(0, 3);
      }
      // Default suggestions
      else {
        suggestions = allCompetencies.filter(comp => 
          comp.name === 'Problem Solving' ||
          comp.name === 'Effective Communication' ||
          comp.name === 'Adaptability'
        ).slice(0, 3);
      }
      
      setSelectedCompetencies(suggestions);
      setCurrentStep(1);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateQuestions = async () => {
    setIsGeneratingQuestions(true);
    try {
      // Simulate question generation with better feedback
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add sample questions to each competency (1 question per competency)
      const updatedCompetencies = selectedCompetencies.map(comp => ({
        ...comp,
        sampleQuestions: [
          `What is your experience with ${comp.name.toLowerCase()}?`
        ],
        questionTime: 3 // Default 3 minutes
      }));
      
      setSelectedCompetencies(updatedCompetencies);
      setCurrentStep(2);
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleComplete = () => {
    const profile = {
      roleTitle: form.getFieldValue('roleTitle'),
      experienceLevel: form.getFieldValue('experienceLevel'),
      language: form.getFieldValue('language'),
      selectedCompetencies,
      estimatedTime: selectedCompetencies.reduce((total, comp) => total + (comp.questionTime || 3), 0)
    };
    
    console.log('Role Profile Generated:', profile);
    alert(`Role Profile Generated Successfully!\n\nRole: ${profile.roleTitle}\nCompetencies: ${profile.selectedCompetencies.length}\nEstimated Time: ${profile.estimatedTime} minutes`);
  };

  // Filter competencies based on search term and sort selected first
  const filteredCompetencies = allCompetencies
    .filter(comp =>
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aSelected = selectedCompetencies.some(selected => selected.id === a.id);
      const bSelected = selectedCompetencies.some(selected => selected.id === b.id);
      
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return 0;
    });

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Card style={{ 
              borderRadius: '20px', 
              border: '2px solid #e2e8f0',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              background: 'white',
              overflow: 'hidden',
            }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)',
                padding: '32px',
                margin: '-24px -24px 32px -24px',
                borderRadius: '20px 20px 0 0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <UserOutlined style={{ color: 'white', fontSize: '28px' }} />
                  </div>
                  <div>
                    <Title level={2} style={{ margin: 0, color: 'white', fontSize: '28px', fontWeight: '600' }}>
                      Role Setup
                    </Title>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px', marginTop: '4px' }}>
                      Define the role requirements and specifications
                    </Text>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', marginBottom: '0' }}>
                  <div></div>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: '500' }}>
                    Step 1 of 4
                  </Text>
                </div>
                <Progress 
                  percent={25} 
                  showInfo={false}
                  strokeColor="rgba(255, 255, 255, 0.9)"
                  trailColor="rgba(255, 255, 255, 0.2)"
                  strokeWidth={6}
                  style={{ marginTop: '8px', marginBottom: '0' }}
                />
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleStep1Submit}
                initialValues={{ language: 'en' }}
                style={{ padding: '0 24px 24px 24px' }}
              >
                <Form.Item
                  name="roleTitle"
                  label={
                    <div style={{ marginBottom: '6px' }}>
                      <Text strong style={{ fontSize: '16px', color: '#1a202c' }}>Role Title</Text>
                      <Text type="secondary" style={{ fontSize: '13px', marginLeft: '8px' }}>
                        Be specific for better suggestions
                      </Text>
                    </div>
                  }
                  rules={[{ required: true, message: 'Please enter a role title!' }]}
                  style={{ marginBottom: '24px' }}
                >
                  <Input 
                    placeholder="Senior React Developer, Product Manager, Data Analyst..."
                    size="large"
                    style={{
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      padding: '14px 16px',
                      fontSize: '16px',
                      background: 'white',
                      height: '52px'
                    }}
                  />
                </Form.Item>

                <Row gutter={20}>
                  <Col span={12}>
                    <Form.Item
                      name="experienceLevel"
                      label={
                        <div>
                          <Text strong style={{ fontSize: '16px', color: '#1a202c' }}>Experience Level</Text>
                          <div style={{ fontSize: '12px', color: '#718096', marginTop: '4px' }}>
                            Select the appropriate experience level for this role
                          </div>
                        </div>
                      }
                      rules={[{ required: true, message: 'Please select an experience level!' }]}
                      style={{ marginBottom: '24px' }}
                    >
                      <Select 
                        placeholder="Choose experience level" 
                        size="large"
                        options={experienceLevels.map(level => ({
                          ...level,
                          label: level.label
                        }))}
                        style={{
                          borderRadius: '12px',
                          border: '2px solid #e2e8f0',
                          height: '52px'
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="language"
                      label={
                        <div style={{ marginBottom: '6px' }}>
                          <Text strong style={{ fontSize: '16px', color: '#1a202c' }}>Language</Text>
                        <Text type="secondary" style={{ fontSize: '13px', color: '#6b7280' }}>
                        </Text>
                      </div>
                      }
                      rules={[{ required: true, message: 'Please select a language!' }]}
                      style={{ marginBottom: '24px' }}
                    >
                      <Radio.Group style={{ display: 'flex', gap: '16px' }}>
                        {languages.map(lang => (
                          <Radio 
                            key={lang.value} 
                            value={lang.value} 
                            style={{ fontSize: '15px', color: '#374151' }}
                          >
                            {lang.label}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="additionalContext"
                  label={
                    <div style={{ marginBottom: '6px' }}>
                      <Text strong style={{ fontSize: '16px', color: '#1a202c' }}>Additional Context</Text>
                      <Text type="secondary" style={{ fontSize: '13px', marginLeft: '8px' }}>
                        Job description or additional requirements
                      </Text>
                    </div>
                  }
                  style={{ marginBottom: '32px' }}
                >
                  <Input.TextArea 
                    rows={3} 
                    placeholder="Paste your job description here or add specific requirements, skills, responsibilities, and qualifications for this role..."
                    style={{
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      padding: '14px 16px',
                      fontSize: '16px',
                      background: 'white',
                      resize: 'none'
                    }}
                  />
                </Form.Item>
              </Form>
            </Card>
          </div>
        );

      case 1:
        return (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Card style={{ 
              borderRadius: '20px', 
              border: '2px solid #e2e8f0',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              background: 'white',
              overflow: 'hidden',
              marginBottom: '24px',
              minHeight: '200px'
            }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)',
                padding: '32px',
                margin: '-24px -24px 32px -24px',
                borderRadius: '20px 20px 0 0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <CheckCircleOutlined style={{ color: 'white', fontSize: '28px' }} />
                  </div>
                  <div>
                    <Title level={2} style={{ margin: 0, color: 'white', fontSize: '28px', fontWeight: '600' }}>
                      Select Competencies
                    </Title>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px', marginTop: '4px' }}>
                      Choose the most relevant skills for this role
                    </Text>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div></div>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: '500' }}>
                    Step 2 of 4
                  </Text>
                </div>
                <Progress 
                  percent={50} 
                  showInfo={false}
                  strokeColor="rgba(255, 255, 255, 0.9)"
                  trailColor="rgba(255, 255, 255, 0.2)"
                  strokeWidth={6}
                  style={{ marginBottom: '0' }}
                />
              </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px', height: '800px' }}>
              {/* Left Side - Selected Competencies */}
              <Card style={{ 
                borderRadius: '20px', 
                border: '2px solid #e2e8f0',
                background: 'linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%)',
                height: '100%',
                boxShadow: '0 8px 32px rgba(116, 121, 79, 0.1)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <CheckCircleOutlined style={{ color: '#74794f', fontSize: '20px' }} />
                    <Title level={4} style={{ margin: 0, color: '#2d3748' }}>Selected Competencies</Title>
                  </div>
                  <Text type="secondary" style={{ fontSize: '16px' }}>
                    {selectedCompetencies.length} competencies selected
                  </Text>
                </div>
                
                  <div style={{ 
                    display: 'grid', 
                    gap: '16px',
                    maxHeight: '600px',
                    overflowY: 'auto',
                    paddingRight: '8px'
                  }}>
                  {selectedCompetencies.map((comp) => (
                    <Card key={comp.id} style={{ 
                      borderRadius: '16px', 
                      border: '1px solid #c6f6d5',
                      backgroundColor: 'white',
                      boxShadow: '0 4px 16px rgba(72, 187, 120, 0.1)',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <Text strong style={{ fontSize: '16px', color: '#2d3748', display: 'block', marginBottom: '8px' }}>
                            {comp.name}
                          </Text>
                          <Text style={{ color: '#718096', fontSize: '14px', lineHeight: '1.5' }}>
                            {comp.description}
                          </Text>
                        </div>
                        <Button
                          type="text"
                          icon={<MinusOutlined />}
                          style={{ color: '#e53e3e', marginLeft: '12px' }}
                          onClick={() => setSelectedCompetencies(prev => prev.filter(c => c.id !== comp.id))}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Right Side - All Competencies */}
              <Card style={{ 
                borderRadius: '20px', 
                border: '2px solid #e2e8f0',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <Title level={4} style={{ margin: 0, color: '#2d3748' }}>
                      All Competencies ({allCompetencies.length} Available)
                    </Title>
                  </div>
                  <Input
                    placeholder="Search competencies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      borderRadius: '16px',
                      border: '2px solid #e2e8f0',
                      padding: '12px 16px',
                      fontSize: '16px',
                      transition: 'all 0.3s ease'
                    }}
                    prefix={<SearchIcon style={{ color: '#a0aec0' }} />}
                  />
                </div>
                
                <div style={{ flex: 1, overflowY: 'auto', maxHeight: '620px' }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                    gap: '16px',
                    height: '100%'
                  }}>
                    {filteredCompetencies.map((comp) => {
                      const isSelected = selectedCompetencies.some(selected => selected.id === comp.id);
                      return (
                        <div
                          key={comp.id}
                          style={{
                            padding: '20px',
                            borderRadius: '16px',
                            border: isSelected ? '2px solid #48bb78' : '2px solid #e2e8f0',
                            backgroundColor: isSelected ? '#f0fff4' : 'white',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: isSelected ? '0 8px 24px rgba(72, 187, 120, 0.2)' : '0 4px 16px rgba(0, 0, 0, 0.05)',
                            height: '150px',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedCompetencies(prev => prev.filter(c => c.id !== comp.id));
                            } else {
                              setSelectedCompetencies(prev => [...prev, comp]);
                            }
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = '#74794f';
                              e.currentTarget.style.boxShadow = '0 8px 24px rgba(116, 121, 79, 0.15)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = '#e2e8f0';
                              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)';
                            }
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <Text strong style={{ 
                              fontSize: '16px', 
                              color: isSelected ? '#48bb78' : '#2d3748',
                              flex: 1
                            }}>
                              {comp.name}
                            </Text>
                            {isSelected && <CheckCircleOutlined style={{ color: '#48bb78', fontSize: '18px', marginLeft: '8px' }} />}
                          </div>
                          <Text style={{ color: '#718096', fontSize: '14px', lineHeight: '1.5', flex: 1, overflow: 'hidden' }}>
                            {comp.description}
                          </Text>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>
            </Card>
          </div>
        );

      case 2:
        return (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Card style={{ 
              borderRadius: '20px', 
              border: '2px solid #e2e8f0',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              background: 'white',
              overflow: 'hidden',
              marginBottom: '24px',
            }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)',
                padding: '32px',
                margin: '-24px -24px 32px -24px',
                borderRadius: '20px 20px 0 0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <EditOutlined style={{ color: 'white', fontSize: '28px' }} />
                  </div>
                  <div>
                    <Title level={2} style={{ margin: 0, color: 'white', fontSize: '28px', fontWeight: '600' }}>
                      Customize Questions
                    </Title>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px', marginTop: '4px' }}>
                      Review and customize interview questions
                    </Text>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div></div>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: '500' }}>
                    Step 3 of 4
                  </Text>
                </div>
                <Progress 
                  percent={75} 
                  showInfo={false}
                  strokeColor="rgba(255, 255, 255, 0.9)"
                  trailColor="rgba(255, 255, 255, 0.2)"
                  strokeWidth={6}
                  style={{ marginBottom: '0' }}
                />
              </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '24px', 
              marginBottom: '24px',
              padding: '20px',
              background: '#fafafa',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircleOutlined style={{ color: '#74794f', fontSize: '18px' }} />
                <Text strong style={{ fontSize: '15px', color: '#2d3748' }}>{selectedCompetencies.length} Competencies</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileTextOutlined style={{ color: '#74794f', fontSize: '18px' }} />
                <Text strong style={{ fontSize: '15px', color: '#2d3748' }}>
                  {selectedCompetencies.reduce((total, comp) => total + (comp.sampleQuestions?.length || 0), 0)} {selectedCompetencies.reduce((total, comp) => total + (comp.sampleQuestions?.length || 0), 0) === 1 ? 'Question' : 'Questions'}
                </Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ClockCircleOutlined style={{ color: '#74794f', fontSize: '18px' }} />
                <Text strong style={{ fontSize: '15px', color: '#2d3748' }}>
                  {selectedCompetencies.reduce((total, comp) => total + (comp.questionTime || 3), 0)} min Estimated
                </Text>
              </div>
            </div>
            
            <div style={{ display: 'grid', gap: '24px' }}>
              {selectedCompetencies.map((comp) => (
                <Card key={comp.id} style={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%)',
                    padding: '16px',
                    margin: '-16px -16px 16px -16px',
                    borderBottom: '1px solid #e2e8f0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <StarOutlined style={{ color: '#74794f', fontSize: '18px' }} />
                      <Text strong style={{ fontSize: '20px', color: '#1a202c' }}>{comp.name}</Text>
                      <Badge 
                        count={`${comp.sampleQuestions?.length || 0} ${(comp.sampleQuestions?.length || 0) === 1 ? 'question' : 'questions'}`} 
                        style={{ backgroundColor: '#74794f', fontSize: '12px' }}
                      />
                    </div>
                    <Text style={{ color: '#718096', fontSize: '15px', lineHeight: '1.5' }}>{comp.description}</Text>
                  </div>
                  
                  
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {comp.sampleQuestions?.map((question: string, idx: number) => (
                      <div key={idx} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        padding: '16px',
                        background: '#f8f9fa',
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb',
                        transition: 'all 0.2s ease',
                        marginBottom: '8px'
                      }}>
                        <div style={{ flex: 1, marginRight: '16px' }}>
                          {editingQuestion === `${comp.id}-${idx}` ? (
                            <div>
                              <Input.TextArea
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                rows={3}
                                style={{
                                  marginBottom: '12px',
                                  borderRadius: '8px',
                                  border: '2px solid #74794f'
                                }}
                                placeholder="Enter your question..."
                              />
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <Button
                                  type="primary"
                                  size="small"
                                  onClick={() => {
                                    if (editingText.trim() !== '') {
                                      const updatedCompetencies = selectedCompetencies.map(c => 
                                        c.id === comp.id ? {
                                          ...c,
                                          sampleQuestions: c.sampleQuestions?.map((q: string, i: number) => i === idx ? editingText : q) || []
                                        } : c
                                      );
                                      setSelectedCompetencies(updatedCompetencies);
                                    }
                                    setEditingQuestion(null);
                                    setEditingText('');
                                  }}
                                  style={{
                                    backgroundColor: '#74794f',
                                    borderColor: '#74794f',
                                    borderRadius: '6px'
                                  }}
                                >
                                  Save
                                </Button>
                                <Button
                                  size="small"
                                  onClick={() => {
                                    setEditingQuestion(null);
                                    setEditingText('');
                                  }}
                                  style={{
                                    borderRadius: '6px'
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Text style={{ 
                              fontSize: '15px', 
                              display: 'block', 
                              marginBottom: '12px',
                              color: '#2d3748',
                              lineHeight: '1.5'
                            }}>
                              {question}
                            </Text>
                          )}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ClockCircleOutlined style={{ color: '#718096', fontSize: '14px' }} />
                            <Text style={{ fontSize: '12px', color: '#718096', marginRight: '4px' }}>Time:</Text>
                            <Select
                              value={comp.questionTime || 3}
                              onChange={(value) => {
                                const updatedCompetencies = selectedCompetencies.map(c => 
                                  c.id === comp.id ? { ...c, questionTime: value } : c
                                );
                                setSelectedCompetencies(updatedCompetencies);
                              }}
                              style={{ 
                                width: '80px',
                                borderRadius: '6px'
                              }}
                              size="small"
                            >
                              <Select.Option value={1}>1 min</Select.Option>
                              <Select.Option value={2}>2 min</Select.Option>
                              <Select.Option value={3}>3 min</Select.Option>
                              <Select.Option value={4}>4 min</Select.Option>
                              <Select.Option value={5}>5 min</Select.Option>
                            </Select>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <Button 
                            icon={<EditOutlined />} 
                            size="small" 
                            title="Edit question"
                            onClick={() => {
                              setEditingQuestion(`${comp.id}-${idx}`);
                              setEditingText(question);
                            }}
                            style={{
                              borderRadius: '8px',
                              height: '32px',
                              width: '32px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderColor: '#d1d5db',
                              color: '#6b7280'
                            }}
                          />
                          <Button 
                            icon={<DeleteOutlined />} 
                            size="small" 
                            title="Delete question"
                            onClick={() => {
                              const updatedCompetencies = selectedCompetencies.map(c => 
                                c.id === comp.id ? {
                                  ...c,
                                  sampleQuestions: c.sampleQuestions?.filter((_: string, i: number) => i !== idx) || []
                                } : c
                              );
                              setSelectedCompetencies(updatedCompetencies);
                            }}
                            style={{
                              borderRadius: '8px',
                              height: '32px',
                              width: '32px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderColor: '#fca5a5',
                              color: '#dc2626',
                              backgroundColor: 'transparent'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#fef2f2';
                              e.currentTarget.style.borderColor = '#f87171';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.borderColor = '#fca5a5';
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    {isAddingCustom && addingToCompetency === comp.id ? (
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        padding: '16px',
                        background: '#f8f9fa',
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb',
                        transition: 'all 0.2s ease',
                        marginBottom: '8px'
                      }}>
                        <div style={{ flex: 1, marginRight: '16px' }}>
                          <Input.TextArea
                            value={customQuestionText}
                            onChange={(e) => setCustomQuestionText(e.target.value)}
                            rows={3}
                            style={{
                              marginBottom: '12px',
                              borderRadius: '8px',
                              border: '2px solid #74794f'
                            }}
                            placeholder="Enter your new question..."
                          />
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ClockCircleOutlined style={{ color: '#718096', fontSize: '14px' }} />
                            <Text style={{ fontSize: '12px', color: '#718096', marginRight: '4px' }}>Time:</Text>
                            <Select
                              value={3}
                              style={{ 
                                width: '80px',
                                borderRadius: '6px'
                              }}
                              size="small"
                            >
                              <Select.Option value={1}>1 min</Select.Option>
                              <Select.Option value={2}>2 min</Select.Option>
                              <Select.Option value={3}>3 min</Select.Option>
                              <Select.Option value={4}>4 min</Select.Option>
                              <Select.Option value={5}>5 min</Select.Option>
                            </Select>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => {
                              if (customQuestionText.trim() !== '') {
                                const updatedCompetencies = selectedCompetencies.map(c => 
                                  c.id === comp.id ? {
                                    ...c,
                                    sampleQuestions: [...(c.sampleQuestions || []), customQuestionText]
                                  } : c
                                );
                                setSelectedCompetencies(updatedCompetencies);
                              }
                              setIsAddingCustom(false);
                              setAddingToCompetency(null);
                              setCustomQuestionText('');
                            }}
                            style={{
                              backgroundColor: '#74794f',
                              borderColor: '#74794f',
                              borderRadius: '6px'
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            size="small"
                            onClick={() => {
                              setIsAddingCustom(false);
                              setAddingToCompetency(null);
                              setCustomQuestionText('');
                            }}
                            style={{
                              borderRadius: '6px'
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ 
                        marginTop: '16px', 
                        padding: '16px', 
                        background: '#f1f3f4', 
                        borderRadius: '12px', 
                        border: '1px solid #e5e7eb' 
                      }}>
                        <Button 
                          type="default" 
                          icon={<PlusOutlined />} 
                          title="Add new question to this competency"
                          onClick={() => {
                            setIsAddingCustom(true);
                            setAddingToCompetency(comp.id);
                            setCustomQuestionText('');
                          }}
                          style={{
                            width: '100%',
                            height: '40px',
                            borderRadius: '8px',
                            border: '1px solid #74794f',
                            color: '#74794f',
                            backgroundColor: 'white',
                            fontSize: '14px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#74794f';
                            e.currentTarget.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = '#74794f';
                          }}
                        >
                          Add Question
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            </Card>
          </div>
        );

      case 3:
        return (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Card style={{ 
              borderRadius: '20px', 
              border: '2px solid #e2e8f0',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              background: 'white',
              overflow: 'hidden',
              marginBottom: '24px',
            }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)',
                padding: '32px',
                margin: '-24px -24px 32px -24px',
                borderRadius: '20px 20px 0 0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <FileTextOutlined style={{ color: 'white', fontSize: '28px' }} />
                  </div>
                  <div>
                    <Title level={2} style={{ margin: 0, color: 'white', fontSize: '28px', fontWeight: '600' }}>
                      Preview & Complete
                    </Title>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px', marginTop: '4px' }}>
                      Review and finalize your role profile
                    </Text>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div></div>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', fontWeight: '500' }}>
                    Step 4 of 4
                  </Text>
                </div>
                <Progress 
                  percent={100} 
                  showInfo={false}
                  strokeColor="rgba(255, 255, 255, 0.9)"
                  trailColor="rgba(255, 255, 255, 0.2)"
                  strokeWidth={6}
                  style={{ marginBottom: '0' }}
                />
              </div>
            
            {/* Role Profile Summary */}
            <Card style={{ 
              borderRadius: '20px', 
              border: '2px solid #e2e8f0',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
              marginBottom: '32px',
              background: 'white'
            }}>
              <div style={{ padding: '24px' }}>
                <Title level={3} style={{ marginBottom: '24px', textAlign: 'center' }}>
                  Role Profile Summary
                </Title>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '20px', 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%)',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <UserOutlined style={{ fontSize: '24px', color: '#6b7280', marginBottom: '12px' }} />
                    <Text strong style={{ fontSize: '14px', color: '#2d3748', display: 'block', marginBottom: '8px' }}>Role Title</Text>
                    <Text style={{ fontSize: '16px', color: '#4a5568' }}>
                      {form.getFieldValue('roleTitle') || 'Not specified'}
                    </Text>
                  </div>
                  
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '20px', 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%)',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <ProfileOutlined style={{ fontSize: '24px', color: '#6b7280', marginBottom: '12px' }} />
                    <Text strong style={{ fontSize: '14px', color: '#2d3748', display: 'block', marginBottom: '8px' }}>Experience Level</Text>
                    <Text style={{ fontSize: '16px', color: '#4a5568' }}>
                      {experienceLevels.find(level => level.value === form.getFieldValue('experienceLevel'))?.label || 'Not specified'}
                    </Text>
                  </div>
                  
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '20px', 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%)',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <FileTextOutlined style={{ fontSize: '24px', color: '#6b7280', marginBottom: '12px' }} />
                    <Text strong style={{ fontSize: '14px', color: '#2d3748', display: 'block', marginBottom: '8px' }}>Language</Text>
                    <Text style={{ fontSize: '16px', color: '#4a5568' }}>
                      {languages.find(lang => lang.value === form.getFieldValue('language'))?.label || 'Not specified'}
                    </Text>
                  </div>
                  
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '20px', 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%)',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <ClockCircleOutlined style={{ fontSize: '24px', color: '#6b7280', marginBottom: '12px' }} />
                    <Text strong style={{ fontSize: '14px', color: '#2d3748', display: 'block', marginBottom: '8px' }}>Total Time</Text>
                    <Text style={{ fontSize: '16px', color: '#4a5568' }}>
                      {selectedCompetencies.reduce((total, comp) => total + (comp.questionTime || 3), 0)} minutes
                    </Text>
                  </div>

                  <div style={{ 
                    textAlign: 'center', 
                    padding: '20px', 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%)',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <CheckCircleOutlined style={{ fontSize: '24px', color: '#6b7280', marginBottom: '12px' }} />
                    <Text strong style={{ fontSize: '14px', color: '#2d3748', display: 'block', marginBottom: '8px' }}>Competencies</Text>
                    <Text style={{ fontSize: '16px', color: '#4a5568' }}>
                      {selectedCompetencies.length} selected
                    </Text>
                  </div>
                  
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '20px', 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #f1f3f4 100%)',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <BulbOutlined style={{ fontSize: '24px', color: '#6b7280', marginBottom: '12px' }} />
                    <Text strong style={{ fontSize: '14px', color: '#2d3748', display: 'block', marginBottom: '8px' }}>Questions</Text>
                    <Text style={{ fontSize: '16px', color: '#4a5568' }}>
                      {selectedCompetencies.reduce((total, comp) => total + (comp.sampleQuestions?.length || 0), 0)} total
                    </Text>
                  </div>
                </div>
              </div>
            </Card>

            <div style={{ display: 'grid', gap: '16px' }}>
              {selectedCompetencies.map((comp) => (
                <Card key={comp.id} style={{ 
                  borderRadius: '16px', 
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <StarOutlined style={{ color: '#74794f', fontSize: '16px' }} />
                    <Text strong style={{ fontSize: '16px', color: '#2d3748' }}>{comp.name}</Text>
                    <Badge 
                      count={`${comp.sampleQuestions?.length || 0} ${(comp.sampleQuestions?.length || 0) === 1 ? 'question' : 'questions'}`} 
                      style={{ backgroundColor: '#74794f', fontSize: '12px' }}
                    />
                  </div>
                  <Text style={{ color: '#718096', fontSize: '14px', marginBottom: '16px' }}>{comp.description}</Text>
                  
                  {/* Questions Preview */}
                  <div style={{ marginTop: '16px' }}>
                    <Text strong style={{ fontSize: '14px', color: '#2d3748', marginBottom: '12px', display: 'block' }}>
                      Sample Questions:
                    </Text>
                    {comp.sampleQuestions?.map((question: string, idx: number) => (
                      <div key={idx} style={{ 
                        marginBottom: '12px',
                        padding: '12px',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <Text style={{ fontSize: '14px', color: '#2d3748', flex: 1, marginRight: '12px' }}>
                            {idx + 1}. {question}
                          </Text>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ClockCircleOutlined style={{ color: '#74794f', fontSize: '12px' }} />
                            <Text style={{ fontSize: '12px', color: '#74794f', fontWeight: '600' }}>
                              {comp.questionTime || 3} min
                            </Text>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const steps = [
    {
      title: 'Role Setup',
      description: 'Enter role details',
      icon: <UserOutlined />
    },
    {
      title: 'Select Competencies',
      description: 'Choose relevant skills',
      icon: <CheckCircleOutlined />
    },
    {
      title: 'Customize Questions',
      description: 'Review and edit questions',
      icon: <EditOutlined />
    },
    {
      title: 'Preview & Complete',
      description: 'Finalize your profile',
      icon: <RocketOutlined />
    },
  ];

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f7fafc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
          <div style={{ marginTop: '24px' }}>
            <Text style={{ fontSize: '18px', color: '#718096' }}>Loading competencies...</Text>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9f5', padding: '24px 16px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={1} style={{ margin: '0 0 8px 0', color: '#1a202c', fontSize: '32px' }}>
            Quick Role Profile
          </Title>
          <Text style={{ fontSize: '16px', color: '#718096' }}>
            Create comprehensive role profiles with AI-powered smart matching
          </Text>
        </div>

        {/* Content */}
        <div style={{ marginBottom: '48px' }}>
          {renderStepContent()}
        </div>

        {/* Footer Navigation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '32px 0',
          borderTop: '2px solid #e2e8f0',
          background: 'linear-gradient(135deg, #fafafa 0%, #f8f9fa 100%)',
          borderRadius: '0 0 20px 20px',
          marginTop: '24px'
        }}>
          {/* Help text for screen readers */}
          <div id="back-help" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
            Navigate to the previous step in the role profile creation process
          </div>
          <div id="generate-help" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
            Generate AI-powered competency suggestions based on your role details
          </div>
          <div id="next-help" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
            Proceed to the next step in the role profile creation process
          </div>
          <Button
            type="default"
            size="large"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 0}
            icon={<LeftOutlined />}
            style={{ 
              minWidth: '160px',
              height: '56px',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '600',
              border: '2px solid #e2e8f0',
              color: '#4a5568',
              backgroundColor: 'white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f8f9fa';
              e.currentTarget.style.borderColor = '#74794f';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(116, 121, 79, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '3px solid rgba(116, 121, 79, 0.3)';
              e.currentTarget.style.outlineOffset = '2px';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = 'none';
            }}
          >
            Back
          </Button>
          
          {currentStep < steps.length - 1 && (
            <Button
              type="primary"
              size="large"
              onClick={() => {
                if (currentStep === 0) {
                  form.validateFields().then(handleStep1Submit).catch(() => {});
                } else if (currentStep === 1) {
                  handleGenerateQuestions();
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
              loading={isGenerating || isGeneratingQuestions}
              icon={undefined}
              style={{ 
                minWidth: currentStep === 0 ? '300px' : '180px',
                height: '56px',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: '600',
                background: currentStep === 0 
                  ? 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)' 
                  : 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)',
                border: 'none',
                boxShadow: '0 6px 20px rgba(116, 121, 79, 0.25)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(116, 121, 79, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(116, 121, 79, 0.25)';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '3px solid rgba(116, 121, 79, 0.4)';
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              {currentStep === 0 ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Generate AI Suggestions
                  <RightOutlined />
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Next Step
                  <RightOutlined />
                </span>
              )}
            </Button>
          )}
          
          {currentStep === steps.length - 1 && (
            <Button
              type="primary"
              size="large"
              onClick={handleComplete}
              icon={<FileTextOutlined />}
              style={{ 
                minWidth: '200px',
                height: '56px',
                borderRadius: '16px',
                fontSize: '16px',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)',
                border: 'none',
                boxShadow: '0 6px 20px rgba(116, 121, 79, 0.25)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(116, 121, 79, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(116, 121, 79, 0.25)';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '3px solid rgba(116, 121, 79, 0.4)';
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              Complete
            </Button>
          )}
        </div>
      </div>

    </div>
  );
}