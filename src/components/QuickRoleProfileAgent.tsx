'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Card, Tag, Checkbox, Space, Typography, Divider, Alert, Spin, Row, Col, Progress, Radio } from 'antd';
import { 
  BulbOutlined, 
  SettingOutlined, 
  CheckCircleOutlined,
  PlusOutlined,
  MinusOutlined,
  ReloadOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  CloseOutlined,
  EditOutlined,
  RocketOutlined,
  UserOutlined,
  SearchOutlined,
  LeftOutlined,
  RightOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { competencies, experienceLevels, languages, Competency } from '@/lib/competencies';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface QuickRoleProfileAgentProps {
  visible: boolean;
  onClose: () => void;
  onComplete: (profile: RoleProfile) => void;
}

interface RoleProfile {
  roleTitle: string;
  experienceLevel: string;
  language: string;
  selectedCompetencies: Competency[];
  customQuestions: string[];
  estimatedTime: number;
}

const QuickRoleProfileAgent: React.FC<QuickRoleProfileAgentProps> = ({
  visible,
  onClose,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCompetencies, setSelectedCompetencies] = useState<Competency[]>([]);
  const [isJRSetupModalOpen, setIsJRSetupModalOpen] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [editingQuestions, setEditingQuestions] = useState<{[key: string]: string}>({});
  const [jrForm] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customCompetencyForm] = Form.useForm();
  const [showAllCompetencies, setShowAllCompetencies] = useState(false);
  const [isBrowseAllOpen, setIsBrowseAllOpen] = useState(false);
  const [browseSearchTerm, setBrowseSearchTerm] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [questionTimes, setQuestionTimes] = useState<{[key: string]: number}>({});
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formValues, setFormValues] = useState<{[key: string]: any}>({});
  const [expandedCompetencies, setExpandedCompetencies] = useState<{[key: string]: boolean}>({});
  const [editingQuestion, setEditingQuestion] = useState<{compId: string, questionIndex: number} | null>(null);
  const [editingText, setEditingText] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Color system constants
  const colors = {
    primary: '#74794f',
    primaryHover: '#5a5f3f',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      muted: '#9ca3af'
    },
    background: {
      primary: '#ffffff',
      secondary: '#fafbfc',
      tertiary: '#f9fafb'
    },
    border: {
      light: '#e5e7eb',
      medium: '#d1d5db',
      dark: '#9ca3af'
    }
  };

  // Reset form when modal opens
  useEffect(() => {
    if (visible) {
      form.resetFields();
      setCurrentStep(0);
      setSelectedCompetencies([]);
      setQuestionTimes({});
      setIsGenerating(false);
      setFormErrors({});
      setIsFormValid(false);
      setExpandedCompetencies({});
    }
  }, [visible, form]);

  // Form validation effect
  useEffect(() => {
    const errors: {[key: string]: string} = {};
    
    if (!formValues.roleTitle || formValues.roleTitle.trim() === '') {
      errors.roleTitle = 'Role title is required';
    }
    
    if (!formValues.experienceLevel) {
      errors.experienceLevel = 'Experience level is required';
    }
    
    if (!formValues.language) {
      errors.language = 'Language is required';
    }
    
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [formValues]);

  // AI Smart Matching Logic
  const generateAISuggestions = (roleTitle: string, experienceLevel: string, additionalPrompt?: string) => {
    console.log('Generating AI suggestions for:', { roleTitle, experienceLevel, additionalPrompt });
    console.log('Available competencies:', competencies?.length || 0);
    
    if (!competencies || competencies.length === 0) {
      console.error('No competencies available');
      setFormErrors({ general: 'No competencies available. Please refresh and try again.' });
      return;
    }
    
    setIsGenerating(true);
    setFormErrors({}); // Clear any previous errors
    
    // Simulate AI processing time with progress indication
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        clearInterval(progressInterval);
      }
    }, 200);
    
    setTimeout(() => {
      try {
      const suggestions = getSmartSuggestions(roleTitle, experienceLevel);
        console.log('Generated suggestions:', suggestions.length);
      setSelectedCompetencies(suggestions);
      setIsGenerating(false);
        clearInterval(progressInterval);
      } catch (error) {
        console.error('Error generating suggestions:', error);
        setFormErrors({ general: 'Failed to generate suggestions. Please try again.' });
        setIsGenerating(false);
        clearInterval(progressInterval);
      }
    }, 2000);
  };

  const getSmartSuggestions = (roleTitle: string, experienceLevel: string): Competency[] => {
    const roleLower = roleTitle.toLowerCase();
    const suggestions: Competency[] = [];
    
    // Technical role patterns
    if (roleLower.includes('frontend') || roleLower.includes('ui') || roleLower.includes('react')) {
      const tech7 = competencies.find(c => c.id === 'tech-7');
      const tech1 = competencies.find(c => c.id === 'tech-1');
      const tech6 = competencies.find(c => c.id === 'tech-6');
      const additional2 = competencies.find(c => c.id === 'additional-2');

      if (tech7) suggestions.push(tech7);
      if (tech1) suggestions.push(tech1);
      if (tech6) suggestions.push(tech6);
      if (additional2) suggestions.push(additional2);
    }
    
    if (roleLower.includes('backend') || roleLower.includes('api') || roleLower.includes('server')) {
      const tech8 = competencies.find(c => c.id === 'tech-8');
      const tech1 = competencies.find(c => c.id === 'tech-1');
      const tech2 = competencies.find(c => c.id === 'tech-2');
      const tech3 = competencies.find(c => c.id === 'tech-3');

      if (tech8) suggestions.push(tech8);
      if (tech1) suggestions.push(tech1);
      if (tech2) suggestions.push(tech2);
      if (tech3) suggestions.push(tech3);
    }
    
    if (roleLower.includes('fullstack') || roleLower.includes('full-stack')) {
      const tech7 = competencies.find(c => c.id === 'tech-7');
      const tech8 = competencies.find(c => c.id === 'tech-8');
      const tech1 = competencies.find(c => c.id === 'tech-1');
      const tech2 = competencies.find(c => c.id === 'tech-2');

      if (tech7) suggestions.push(tech7);
      if (tech8) suggestions.push(tech8);
      if (tech1) suggestions.push(tech1);
      if (tech2) suggestions.push(tech2);
    }
    
    if (roleLower.includes('devops') || roleLower.includes('sre')) {
      const tech5 = competencies.find(c => c.id === 'tech-5');
      const tech4 = competencies.find(c => c.id === 'tech-4');
      const tech2 = competencies.find(c => c.id === 'tech-2');
      const tech10 = competencies.find(c => c.id === 'tech-10');

      if (tech5) suggestions.push(tech5);
      if (tech4) suggestions.push(tech4);
      if (tech2) suggestions.push(tech2);
      if (tech10) suggestions.push(tech10);
    }
    
    if (roleLower.includes('data') || roleLower.includes('analyst') || roleLower.includes('scientist')) {
      const domain7 = competencies.find(c => c.id === 'domain-7');
      const additional1 = competencies.find(c => c.id === 'additional-1');
      const tech3 = competencies.find(c => c.id === 'tech-3');
      const tech1 = competencies.find(c => c.id === 'tech-1');

      if (domain7) suggestions.push(domain7);
      if (additional1) suggestions.push(additional1);
      if (tech3) suggestions.push(tech3);
      if (tech1) suggestions.push(tech1);
    }
    
    if (roleLower.includes('product') || roleLower.includes('manager')) {
      const business1 = competencies.find(c => c.id === 'business-1');
      const business2 = competencies.find(c => c.id === 'business-2');
      const soft1 = competencies.find(c => c.id === 'soft-1');
      const soft2 = competencies.find(c => c.id === 'soft-2');
      const business6 = competencies.find(c => c.id === 'business-6');

      if (business1) suggestions.push(business1);
      if (business2) suggestions.push(business2);
      if (soft1) suggestions.push(soft1);
      if (soft2) suggestions.push(soft2);
      if (business6) suggestions.push(business6);
    }
    
    if (roleLower.includes('designer') || roleLower.includes('ux') || roleLower.includes('ui')) {
      const additional2 = competencies.find(c => c.id === 'additional-2');
      const tech7 = competencies.find(c => c.id === 'tech-7');
      const soft1 = competencies.find(c => c.id === 'soft-1');
      const soft3 = competencies.find(c => c.id === 'soft-3');

      if (additional2) suggestions.push(additional2);
      if (tech7) suggestions.push(tech7);
      if (soft1) suggestions.push(soft1);
      if (soft3) suggestions.push(soft3);
    }
    
    // Add common competencies based on experience level
    if (parseInt(experienceLevel) >= 5) {
      const soft2 = competencies.find(c => c.id === 'soft-2');
      const business1 = competencies.find(c => c.id === 'business-1');
      const soft7 = competencies.find(c => c.id === 'soft-7');

      if (soft2) suggestions.push(soft2);
      if (business1) suggestions.push(business1);
      if (soft7) suggestions.push(soft7);
    }
    
    // Add universal competencies
    const soft1 = competencies.find(c => c.id === 'soft-1');
    const soft3 = competencies.find(c => c.id === 'soft-3');
    const soft4 = competencies.find(c => c.id === 'soft-4');

    if (soft1) suggestions.push(soft1);
    if (soft3) suggestions.push(soft3);
    if (soft4) suggestions.push(soft4);
    
    // Remove duplicates and limit to 5
    const uniqueSuggestions = suggestions.filter((comp, index, self) => 
      index === self.findIndex(c => c.id === comp.id)
    ).slice(0, 5);

    // If no suggestions found, provide some default ones
    if (uniqueSuggestions.length === 0) {
      const soft1 = competencies.find(c => c.id === 'soft-1');
      const soft3 = competencies.find(c => c.id === 'soft-3');
      const soft4 = competencies.find(c => c.id === 'soft-4');
      const tech1 = competencies.find(c => c.id === 'tech-1');

      if (soft1) uniqueSuggestions.push(soft1);
      if (soft3) uniqueSuggestions.push(soft3);
      if (soft4) uniqueSuggestions.push(soft4);
      if (tech1) uniqueSuggestions.push(tech1);
    }
    
    return uniqueSuggestions;
  };

  const handleStep1Submit = (values: { roleTitle: string; experienceLevel: string; language: string; additionalPrompt?: string }) => {
    console.log('Step 1 submit values:', values);
    try {
    setCurrentStep(1);
    generateAISuggestions(values.roleTitle, values.experienceLevel, values.additionalPrompt);
    } catch (error) {
      console.error('Error in handleStep1Submit:', error);
      setFormErrors({ general: 'Failed to proceed to next step. Please try again.' });
    }
  };

  const handleGenerateQuestions = () => {
    if (selectedCompetencies.length === 0) {
      return; // Don't proceed if no competencies selected
    }
    
    setIsGeneratingQuestions(true);
    // Simulate AI generating questions for selected competencies
    setTimeout(() => {
      const competenciesToProcess = selectedCompetencies.length > 0 ? selectedCompetencies : competencies.slice(0, 3);
      const updatedCompetencies = competenciesToProcess.map(comp => ({
        ...comp,
        sampleQuestions: [
          `What is your experience with ${comp.name.toLowerCase()}?`,
          `Can you describe a challenging ${comp.name.toLowerCase()} project you worked on?`,
          `How do you approach ${comp.name.toLowerCase()} in your daily work?`
        ]
      }));
      setSelectedCompetencies(updatedCompetencies);
      
      // Initialize question times with default values
      const initialQuestionTimes: {[key: string]: number} = {};
      updatedCompetencies.forEach(comp => {
        (comp.sampleQuestions || []).forEach((_, idx) => {
          initialQuestionTimes[`${comp.id}-${idx}`] = 3; // Default 3 minutes per question
        });
      });
      setQuestionTimes(initialQuestionTimes);
      
      // Expand all competencies by default
      const expandedState: {[key: string]: boolean} = {};
      updatedCompetencies.forEach(comp => {
        expandedState[comp.id] = true;
      });
      setExpandedCompetencies(expandedState);
      
      setIsGeneratingQuestions(false);
      setCurrentStep(2);
    }, 2000);
  };

  const handleProceedToCustomize = () => {
    console.log('Proceeding to customize step 3');
    setCurrentStep(3);
  };

  const handleAddCustomCompetency = (values: { name: string; description: string; category: string; customCategoryName?: string }) => {
    const newCompetency: Competency = {
      id: `custom-${Date.now()}`,
      name: values.name,
      description: values.description,
      category: values.category === 'Other' ? values.customCategoryName || 'Other' : values.category,
      estimatedTime: 15, // Default time
      sampleQuestions: []
    };
    
    setSelectedCompetencies([...selectedCompetencies, newCompetency]);
    setIsAddingCustom(false);
    customCompetencyForm.resetFields();
    setCustomCategory('');
  };

  const handleSelectFromBrowse = (comp: Competency) => {
    // Check if already selected
    const isAlreadySelected = selectedCompetencies.some(c => c.id === comp.id);
    if (!isAlreadySelected) {
      setSelectedCompetencies([...selectedCompetencies, comp]);
    }
  };

  const handleAddQuestion = (compId: string) => {
    const newQuestion = `New question`;
    const updatedCompetencies = selectedCompetencies.map(comp => {
      if (comp.id === compId) {
        return {
          ...comp,
          sampleQuestions: [...(comp.sampleQuestions || []), newQuestion]
        };
      }
      return comp;
    });
    setSelectedCompetencies(updatedCompetencies);
    
    // Initialize time for the new question
    const comp = selectedCompetencies.find(c => c.id === compId);
    if (comp) {
      const questionIndex = (comp.sampleQuestions || []).length;
      setQuestionTimes(prev => ({
        ...prev,
        [`${compId}-${questionIndex}`]: 3 // Default 3 minutes
      }));
    }
  };

  const handleRemoveQuestion = (compId: string, questionIndex: number) => {
    const updatedCompetencies = selectedCompetencies.map(comp => {
      if (comp.id === compId) {
        const newQuestions = [...(comp.sampleQuestions || [])];
        newQuestions.splice(questionIndex, 1);
        return {
          ...comp,
          sampleQuestions: newQuestions
        };
      }
      return comp;
    });
    setSelectedCompetencies(updatedCompetencies);
    
    // Clean up question times for removed question and reindex remaining questions
    setQuestionTimes(prev => {
      const newTimes = { ...prev };
      const comp = selectedCompetencies.find(c => c.id === compId);
      if (comp) {
        const totalQuestions = (comp.sampleQuestions || []).length;
        // Remove the time for the deleted question
        delete newTimes[`${compId}-${questionIndex}`];
        // Reindex remaining questions after the deleted one
        for (let i = questionIndex + 1; i < totalQuestions; i++) {
          const oldKey = `${compId}-${i}`;
          const newKey = `${compId}-${i - 1}`;
          if (newTimes[oldKey] !== undefined) {
            newTimes[newKey] = newTimes[oldKey];
            delete newTimes[oldKey];
          }
        }
      }
      return newTimes;
    });
  };

  const handleRegenerateQuestion = (compId: string, questionIndex: number) => {
    const updatedCompetencies = selectedCompetencies.map(comp => {
      if (comp.id === compId) {
        const newQuestions = [...(comp.sampleQuestions || [])];
        newQuestions[questionIndex] = `Regenerated question about ${comp.name.toLowerCase()}`;
        return {
          ...comp,
          sampleQuestions: newQuestions
        };
      }
      return comp;
    });
    setSelectedCompetencies(updatedCompetencies);
  };

  const handleJRSetupComplete = (jrData: { jobTitle: string; experienceLevel: string; language: string }) => {
    // Update the form with JR data
    form.setFieldsValue({
      roleTitle: jrData.jobTitle,
      experienceLevel: jrData.experienceLevel,
      language: jrData.language
    });
    setIsJRSetupModalOpen(false);
    // Auto-proceed to step 2
    setCurrentStep(1);
    generateAISuggestions(jrData.jobTitle, jrData.experienceLevel);
  };

  const handleAcceptAll = () => {
    setCurrentStep(2);
  };

  const handleCustomize = () => {
    setCurrentStep(2);
  };


  const handleCompetencyToggle = (competency: Competency, checked: boolean) => {
    if (checked) {
      setSelectedCompetencies([...selectedCompetencies, competency]);
    } else {
      setSelectedCompetencies(selectedCompetencies.filter(c => c.id !== competency.id));
    }
  };


  const handleEditQuestion = (compId: string, questionIndex: number, newQuestion: string) => {
    setEditingQuestions(prev => ({
      ...prev,
      [`${compId}-${questionIndex}`]: newQuestion
    }));
  };

  const startEditing = (compId: string, questionIndex: number, currentQuestion: string) => {
    setEditingQuestion({ compId, questionIndex });
    setEditingText(currentQuestion);
    setIsRegenerating(false);
  };

  const saveEdit = () => {
    if (editingQuestion && editingText.trim()) {
      handleEditQuestion(editingQuestion.compId, editingQuestion.questionIndex, editingText.trim());
      setEditingQuestion(null);
      setEditingText('');
      setIsRegenerating(false);
    }
  };

  const cancelEdit = () => {
    setEditingQuestion(null);
    setEditingText('');
    setIsRegenerating(false);
  };

  const startRegenerating = (compId: string, questionIndex: number, currentQuestion: string) => {
    setEditingQuestion({ compId, questionIndex });
    setEditingText(currentQuestion);
    setIsRegenerating(true);
  };

  const saveRegenerate = () => {
    if (editingQuestion && editingText.trim()) {
      // Generate a new question based on competency name
      const comp = selectedCompetencies.find(c => c.id === editingQuestion.compId);
      const newQuestion = `What is your experience with ${comp?.name.toLowerCase()}?`;
      handleEditQuestion(editingQuestion.compId, editingQuestion.questionIndex, newQuestion);
      setEditingQuestion(null);
      setEditingText('');
      setIsRegenerating(false);
    }
  };

  const addNewQuestion = (compId: string) => {
    const comp = selectedCompetencies.find(c => c.id === compId);
    if (comp) {
      const newQuestion = `What is your experience with ${comp.name.toLowerCase()}?`;
      const updatedCompetencies = selectedCompetencies.map(c => {
        if (c.id === compId) {
          return {
            ...c,
            sampleQuestions: [...(c.sampleQuestions || []), newQuestion]
          };
        }
        return c;
      });
      setSelectedCompetencies(updatedCompetencies);
    }
  };

  const handleSaveQuestion = (compId: string, questionIndex: number) => {
    const questionKey = `${compId}-${questionIndex}`;
    const newQuestion = editingQuestions[questionKey];
    
    if (newQuestion && newQuestion.trim()) {
      setSelectedCompetencies(prev => prev.map(comp => {
        if (comp.id === compId) {
          const updatedQuestions = [...(comp.sampleQuestions || [])];
          updatedQuestions[questionIndex] = newQuestion.trim();
          return { ...comp, sampleQuestions: updatedQuestions };
        }
        return comp;
      }));
    }
    
    setEditingQuestions(prev => {
      const newState = { ...prev };
      delete newState[questionKey];
      return newState;
    });
  };



  const handleComplete = () => {
    const values = form.getFieldsValue();
    const totalTime = getTotalTime();
    
    const profile: RoleProfile = {
      roleTitle: values.roleTitle,
      experienceLevel: values.experienceLevel,
      language: values.language,
      selectedCompetencies,
      customQuestions: [],
      estimatedTime: totalTime
    };
    
    onComplete(profile);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const getTotalTime = () => {
    return selectedCompetencies.reduce((sum, comp) => {
      const competencyQuestions = (comp.sampleQuestions || []);
      const competencyTime = competencyQuestions.reduce((questionSum, _, idx) => {
        return questionSum + (questionTimes[`${comp.id}-${idx}`] || 3);
      }, 0);
      return sum + competencyTime;
    }, 0);
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
        <div style={{ maxWidth: '100%' }}>
            <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e5e7eb'
            }}>
              <Form
                    id="role-form"
                form={form}
                layout="vertical"
                onFinish={handleStep1Submit}
                  onValuesChange={(changedValues, allValues) => {
                    setFormValues(allValues);
                  }}
                    style={{ marginTop: '0' }}
              >
                <Form.Item
                  name="roleTitle"
              label={
                <div>
                  <Text strong style={{ color: '#111827', fontSize: '18px', fontWeight: '700', marginBottom: '4px', display: 'block' }}>Role Title</Text>
                  <Text style={{ color: '#4b5563', fontSize: '14px', fontWeight: '400', lineHeight: '1.4' }}>
                    {formErrors.roleTitle || 'Use clear and specific job titles to get better suggestions.'}
                  </Text>
                </div>
              }
              rules={[{ required: true, message: 'Role title is required' }]}
              style={{ marginBottom: '40px' }}
              validateStatus={formErrors.roleTitle ? 'error' : ''}
                >
                  <Input 
                    placeholder="Enter role title, e.g., Product Manager"
                    size="large"
                    aria-label="Role title"
                    aria-describedby="role-title-help"
                    style={{ 
                        height: '64px', 
                      fontSize: '16px',
                        borderRadius: '16px',
                      border: '2px solid #e5e7eb',
                        padding: '20px 24px',
                        backgroundColor: '#fafbfc',
                        transition: 'all 0.3s ease',
                        fontWeight: '500'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#74794f';
                        e.target.style.boxShadow = '0 0 0 6px rgba(116, 121, 79, 0.1)';
                        e.target.style.backgroundColor = 'white';
                        e.target.style.transform = 'translateY(-2px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                        e.target.style.backgroundColor = '#fafbfc';
                        e.target.style.transform = 'translateY(0)';
                    }}
                  />
                </Form.Item>
                
                <Form.Item
                  name="experienceLevel"
                    label={
                      <div>
                        <Text strong style={{ color: '#111827', fontSize: '18px', fontWeight: '700', marginBottom: '4px', display: 'block' }}>Experience Level</Text>
                        <Text style={{ color: '#4b5563', fontSize: '14px', fontWeight: '400', lineHeight: '1.4' }}>
                          {formErrors.experienceLevel || 'Select the appropriate experience level for this role.'}
                        </Text>
                      </div>
                    }
                  rules={[{ required: true, message: 'Experience level is required' }]}
                    style={{ marginBottom: '40px' }}
                  validateStatus={formErrors.experienceLevel ? 'error' : ''}
                >
                  <Select
                    placeholder="Select experience level"
                    size="large"
                    options={experienceLevels}
                    aria-label="Experience level"
                    aria-describedby="experience-level-help"
                    style={{ 
                        height: '64px',
                        borderRadius: '16px',
                        border: '2px solid #e5e7eb',
                        backgroundColor: '#fafbfc',
                        fontSize: '16px',
                        fontWeight: '500'
                    }}
                  />
                </Form.Item>
                
                      <Form.Item
                        name="language"
                    label={
                      <div>
                        <Text strong style={{ color: '#111827', fontSize: '18px', fontWeight: '700', marginBottom: '4px', display: 'block' }}>Primary Language</Text>
                        <Text style={{ color: '#4b5563', fontSize: '14px', fontWeight: '400', lineHeight: '1.4' }}>
                          {formErrors.language || 'Choose a primary language for generated suggestions.'}
                        </Text>
                      </div>
                    }
                        rules={[{ required: true, message: 'Primary language is required' }]}
                    style={{ marginBottom: '40px' }}
                        validateStatus={formErrors.language ? 'error' : ''}
                      >
                        <Radio.Group 
                          options={languages}
                          style={{ 
                            display: 'flex',
                        gap: '40px',
                        marginTop: '8px'
                          }}
                        />
                      </Form.Item>
                      
                      <Form.Item
                        name="additionalPrompt"
                    label={
                      <div>
                        <Text strong style={{ color: '#111827', fontSize: '18px', fontWeight: '700', marginBottom: '4px', display: 'block' }}>Additional Context (Optional)</Text>
                        <Text style={{ color: '#4b5563', fontSize: '14px', fontWeight: '400', lineHeight: '1.4' }}>
                          Add job description, requirements, or notes (optional).
                        </Text>
                      </div>
                    }
                    style={{ marginBottom: '40px' }}
                      >
                        <TextArea
                          placeholder="Add job description, requirements, or notes (optional)."
                      rows={4}
                          style={{ 
                            fontSize: '16px',
                        borderRadius: '16px',
                            border: '2px solid #e5e7eb',
                        transition: 'all 0.3s ease',
                        padding: '20px 24px',
                        backgroundColor: '#fafbfc',
                        fontWeight: '500'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#74794f';
                        e.target.style.boxShadow = '0 0 0 6px rgba(116, 121, 79, 0.1)';
                        e.target.style.backgroundColor = 'white';
                        e.target.style.transform = 'translateY(-2px)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                        e.target.style.backgroundColor = '#fafbfc';
                        e.target.style.transform = 'translateY(0)';
                          }}
                        />
                      </Form.Item>
                </Form>
                
                {/* Error Display */}
                {formErrors.general && (
                  <Alert
                    message="Error"
                    description={formErrors.general}
                    type="error"
                    showIcon
                          style={{ 
                      marginTop: '20px',
                      borderRadius: '8px',
                      border: '1px solid #ff4d4f'
                    }}
                  />
                )}
            </div>
          </div>
        );

      case 1:
        return (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {isGenerating ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 40px',
                backgroundColor: 'white',
                borderRadius: '20px',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e5e7eb',
                maxWidth: '600px',
                margin: '40px auto',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, rgba(116, 121, 79, 0.1) 0%, rgba(116, 121, 79, 0.05) 100%)',
                  borderRadius: '50%',
                  zIndex: 0
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                    border: '3px solid #74794f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                    margin: '0 auto 32px auto',
                    boxShadow: '0 8px 24px rgba(116, 121, 79, 0.2)'
                }}>
                  <Spin size="large" />
                </div>
                  <Title level={3} style={{ color: '#111827', margin: '0 0 12px 0', fontSize: '24px', fontWeight: '700' }}>
                  AI is Working
                </Title>
                  <Paragraph style={{ color: '#6b7280', fontSize: '16px', margin: '0 0 16px 0', fontWeight: '500' }}>
                  Analyzing your role and generating personalized suggestions...
                </Paragraph>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    marginTop: '16px'
                  }}>
                    <div 
                      className="shimmer"
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, #74794f 0%, #5a5f3f 100%)',
                        borderRadius: '3px',
                        animation: 'pulse 2s ease-in-out infinite'
                      }} 
                    />
                  </div>
                  <Text style={{ 
                    color: '#6b7280', 
                    fontSize: '14px', 
                    marginTop: '12px', 
                    display: 'block',
                    textAlign: 'center'
                  }}>
                    This usually takes 10-15 seconds...
                  </Text>
                </div>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <Text style={{
                      color: '#6b7280',
                      fontSize: '18px',
                      fontWeight: '500',
                      lineHeight: '1.5'
                    }}>
                      Choose competencies that align with your role requirements
                      </Text>
                    <div style={{
                      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                      color: '#74794f',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      boxShadow: '0 2px 8px rgba(116, 121, 79, 0.15)',
                      border: '1px solid rgba(116, 121, 79, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <CheckCircleOutlined style={{ fontSize: '16px' }} />
                      {selectedCompetencies.length} Competencies Selected
                    </div>
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                      <Input
                        placeholder="Search competencies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ 
                          flex: 1,
                          height: '48px',
                          borderRadius: '12px',
                          border: '2px solid #e5e7eb',
                          fontSize: '16px',
                          fontWeight: '500',
                          padding: '12px 16px',
                          backgroundColor: '#fafbfc',
                          transition: 'all 0.3s ease'
                        }}
                        prefix={<SearchOutlined style={{ color: '#6b7280', fontSize: '16px' }} />}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#74794f';
                          e.target.style.boxShadow = '0 0 0 4px rgba(116, 121, 79, 0.1)';
                          e.target.style.backgroundColor = 'white';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                          e.target.style.backgroundColor = '#fafbfc';
                        }}
                      />
                      <Space size="middle">
                        <Button 
                          type="primary"
                          onClick={() => setIsBrowseAllOpen(true)}
                          icon={<PlusOutlined />}
                          style={{
                            height: '48px',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            padding: '12px 20px',
                            background: 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(116, 121, 79, 0.25)'
                          }}
                        >
                          Browse All Competencies
                        </Button>
                        <Button 
                          type="dashed"
                          onClick={() => setIsAddingCustom(true)}
                          icon={<PlusOutlined />}
                          style={{
                            height: '48px',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            padding: '12px 20px',
                            borderColor: '#74794f',
                            color: '#74794f',
                            borderWidth: '2px',
                            borderStyle: 'dashed'
                          }}
                        >
                          Add Custom Competency
                        </Button>
                      </Space>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gap: '20px' }}>
                    {(searchTerm ?
                      competencies.filter(comp =>
                        comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        comp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        comp.category.toLowerCase().includes(searchTerm.toLowerCase())
                      ) :
                      selectedCompetencies
                    ).map((comp) => (
                      <div
                        key={comp.id}
                        style={{
                          border: '2px solid #e5e7eb',
                          borderRadius: '16px',
                          backgroundColor: '#ffffff',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                          transition: 'all 0.3s ease',
                          overflow: 'hidden',
                          marginBottom: '20px'
                        }}
                      >
                        {/* Competency Header */}
                        <div style={{
                          padding: '20px 24px',
                          borderBottom: '1px solid #f3f4f6',
                          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                          cursor: 'pointer'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                              <div style={{
                                  background: 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)',
                                  color: 'white',
                                  padding: '4px 12px',
                                borderRadius: '12px',
                                  fontSize: '12px',
                                  fontWeight: '600'
                              }}>
                                  {comp.category}
                              </div>
                                <Text style={{ 
                                  fontSize: '18px', 
                                  fontWeight: '700', 
                                  color: '#111827'
                                }}>
                                  {comp.name}
                    </Text>
                  </div>
                              <Text style={{ 
                                fontSize: '14px', 
                                color: '#6b7280',
                                lineHeight: '1.5'
                              }}>
                                {comp.description}
                  </Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Button 
                                type="text"
                                size="small"
                                icon={<DeleteOutlined />}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCompetencies(selectedCompetencies.filter(c => c.id !== comp.id));
                                }}
                      style={{
                                  color: '#ef4444',
                                  fontSize: '16px',
                                  width: '32px',
                                  height: '32px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: '8px',
                                  border: '1px solid #fecaca',
                                  backgroundColor: '#fef2f2'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = '#fee2e2';
                                  e.currentTarget.style.borderColor = '#fca5a5';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = '#fef2f2';
                                  e.currentTarget.style.borderColor = '#fecaca';
                                }}
                                title="Remove Competency"
                              />
                </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
              </>
            )}
          </div>
        );

      case 2:
        return (
          <div>
            {isGenerating ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 40px',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e5e7eb',
                maxWidth: '500px',
                margin: '40px auto'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#f0f9ff',
                  border: '2px solid #74794f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px auto'
                }}>
                  <Spin size="large" />
                </div>
                <Title level={4} style={{ color: '#111827', margin: '0 0 8px 0' }}>
                  Generating Questions
                </Title>
                <Paragraph style={{ color: '#6b7280', fontSize: '16px', margin: '0' }}>
                  AI is creating personalized questions for your selected competencies...
                </Paragraph>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '32px' }}>
                  <Text style={{
                    color: '#6b7280',
                    fontSize: '18px',
                    fontWeight: '500',
                    lineHeight: '1.5',
                    marginBottom: '24px',
                    display: 'block'
                  }}>
                    Review and customize AI-generated questions for your competencies
                  </Text>

                  {/* Simplified Metrics Display */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '48px',
                    marginBottom: '24px',
                    padding: '20px 24px',
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#10b981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <CheckCircleOutlined style={{ color: 'white', fontSize: '16px' }} />
                    </div>
                      <Text style={{ color: '#374151', fontSize: '16px', fontWeight: '600' }}>
                        {selectedCompetencies.length} Competencies Selected
                      </Text>
                  </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#3b82f6',
                          display: 'flex',
                          alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <FileTextOutlined style={{ color: 'white', fontSize: '16px' }} />
                    </div>
                      <Text style={{ color: '#374151', fontSize: '16px', fontWeight: '600' }}>
                        {selectedCompetencies.reduce((total, comp) => total + (comp.sampleQuestions?.length || 0), 0)} Questions
                      </Text>
                  </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#f59e0b',
                            display: 'flex',
                            alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <ClockCircleOutlined style={{ color: 'white', fontSize: '16px' }} />
                      </div>
                      <Text style={{ color: '#374151', fontSize: '16px', fontWeight: '600' }}>
                        {selectedCompetencies.reduce((total, comp) => {
                          const questions = comp.sampleQuestions || [];
                          return total + questions.reduce((questionTotal, _, idx) => {
                            const timeKey = `${comp.id}-${idx}`;
                            return questionTotal + (questionTimes[timeKey] || 3);
                          }, 0);
                        }, 0)} min Estimated
                      </Text>
                    </div>
                  </div>
                  <div style={{ marginTop: '24px' }}>
                    {selectedCompetencies.map((comp) => (
                      <div key={comp.id} style={{
                        marginBottom: '20px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '16px',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.3s ease',
                        overflow: 'hidden'
                      }}>
                        {/* Competency Header */}
                        <div 
                          style={{
                            padding: '20px 24px',
                            borderBottom: '1px solid #f3f4f6',
                            background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            const newExpanded = { ...expandedCompetencies };
                            newExpanded[comp.id] = !newExpanded[comp.id];
                            setExpandedCompetencies(newExpanded);
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label={`Toggle ${comp.name} competency details`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              const newExpanded = { ...expandedCompetencies };
                              newExpanded[comp.id] = !newExpanded[comp.id];
                              setExpandedCompetencies(newExpanded);
                            }
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <div style={{
                                  background: 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)',
                                  color: 'white',
                                  padding: '4px 12px',
                            borderRadius: '12px',
                                  fontSize: '12px',
                                  fontWeight: '600'
                                }}>
                                  {(comp.sampleQuestions || []).length} questions
                                </div>
                                <Text style={{ 
                                  fontSize: '18px', 
                                  fontWeight: '700', 
                                  color: '#111827'
                                }}>
                                  {comp.name}
                                </Text>
                              </div>
                              <Text style={{ 
                                fontSize: '14px', 
                                color: '#6b7280',
                                lineHeight: '1.5'
                              }}>
                                {comp.description}
                              </Text>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <RightOutlined style={{ 
                                fontSize: '16px', 
                                color: '#9ca3af',
                                transform: expandedCompetencies[comp.id] ? 'rotate(90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease'
                              }} />
                            </div>
                          </div>
                        </div>

                        {/* Questions Section */}
                        {expandedCompetencies[comp.id] && (
                          <div style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                              <Text style={{ 
                                fontSize: '16px', 
                                fontWeight: '600', 
                                color: '#374151'
                              }}>
                                Questions ({(comp.sampleQuestions || []).length})
                              </Text>
                              <Button
                                type="dashed"
                                size="small"
                                icon={<PlusOutlined />}
                                onClick={() => addNewQuestion(comp.id)}
                                style={{
                                  borderColor: '#74794f',
                                  color: '#74794f',
                                  fontWeight: '500'
                                }}
                              >
                                Add Question
                              </Button>
                            </div>
                          {(comp.sampleQuestions || []).map((question, idx) => (
                            <div key={idx} style={{
                                marginBottom: '12px',
                                padding: '16px',
                                backgroundColor: '#f9fafb',
                                borderRadius: '12px',
                                border: '1px solid #e5e7eb',
                                transition: 'all 0.2s ease'
                              }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                  <div style={{ flex: 1 }}>
                                    {editingQuestion && editingQuestion.compId === comp.id && editingQuestion.questionIndex === idx ? (
                                      <div>
                                        <TextArea
                                          value={editingText}
                                          onChange={(e) => setEditingText(e.target.value)}
                                          placeholder="Enter your question..."
                                          rows={2}
                                          style={{
                              marginBottom: '8px',
                              borderRadius: '6px',
                                            border: '1px solid #d1d5db'
                                          }}
                                        />
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                          <Button
                                            type="primary"
                                            size="small"
                                            onClick={isRegenerating ? saveRegenerate : saveEdit}
                                            style={{
                                              background: isRegenerating ? '#f59e0b' : '#74794f',
                                              borderColor: isRegenerating ? '#f59e0b' : '#74794f',
                                              borderRadius: '6px'
                                            }}
                                          >
                                            {isRegenerating ? 'Regenerate' : 'Save'}
                                          </Button>
                                          <Button
                                            size="small"
                                            onClick={cancelEdit}
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
                                        fontSize: '14px', 
                                        color: '#111827',
                                        lineHeight: '1.5',
                                        marginBottom: '8px',
                                        display: 'block'
                                      }}>
                                        {editingQuestions[`${comp.id}-${idx}`] || question}
                              </Text>
                                    )}
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                      <Text style={{ 
                                        fontSize: '12px', 
                                        color: '#6b7280',
                                        fontWeight: '500'
                                      }}>
                                        Time:
                              </Text>
                                      <Select
                                        size="small"
                                        value={questionTimes[`${comp.id}-${idx}`] || 3}
                                        onChange={(value) => {
                                          const newTimes = { ...questionTimes };
                                          newTimes[`${comp.id}-${idx}`] = value;
                                          setQuestionTimes(newTimes);
                                        }}
                                        style={{ width: '80px' }}
                                        options={[
                                          { value: 1, label: '1 min' },
                                          { value: 3, label: '3 min' },
                                          { value: 5, label: '5 min' },
                                          { value: 10, label: '10 min' }
                                        ]}
                                      />
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                <Button
                                  type="text"
                                  size="small"
                                  icon={<EditOutlined />}
                                        title="Edit Question"
                                        aria-label={`Edit question ${idx + 1} for ${comp.name}`}
                                        onClick={() => startEditing(comp.id, idx, question)}
                                  style={{
                                          color: '#6b7280',
                                          padding: '4px 8px',
                                          borderRadius: '6px',
                                          border: '1px solid #e5e7eb',
                                          background: '#f9fafb',
                                          minWidth: '32px',
                                          height: '32px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center'
                                        }}
                                />
                                <Button
                                  type="text"
                                  size="small"
                                  icon={<ReloadOutlined />}
                                        title="Regenerate Question"
                                        aria-label={`Regenerate question ${idx + 1} for ${comp.name}`}
                                        onClick={() => startRegenerating(comp.id, idx, question)}
                                  style={{
                                          color: '#6b7280',
                                          padding: '4px 8px',
                                          borderRadius: '6px',
                                          border: '1px solid #e5e7eb',
                                          background: '#f9fafb',
                                          minWidth: '32px',
                                          height: '32px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center'
                                        }}
                                />
                                <Button
                                  type="text"
                                  size="small"
                                        icon={<DeleteOutlined />}
                                        title="Remove Question"
                                        aria-label={`Remove question ${idx + 1} for ${comp.name}`}
                                        onClick={() => {
                                          if (confirm('Are you sure you want to remove this question?')) {
                                            handleRemoveQuestion(comp.id, idx);
                                          }
                                        }}
                                  style={{
                                          color: '#ef4444',
                                          padding: '4px 8px',
                                          borderRadius: '6px',
                                          border: '1px solid #fecaca',
                                          background: '#fef2f2',
                                          minWidth: '32px',
                                          height: '32px',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center'
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                            </div>
                          ))}
                        </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                
              </>
            )}
          </div>
        );

      case 3:
        return (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <Text style={{
                color: '#6b7280',
                fontSize: '18px',
                fontWeight: '500',
                lineHeight: '1.5',
                marginBottom: '24px',
                display: 'block'
              }}>
                Review your role profile before completing the setup
              </Text>
            </div>
            
            <Card style={{
              marginBottom: '24px',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <Title level={4} style={{ margin: 0, fontSize: '18px', color: '#111827' }}>Role Profile Summary</Title>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <FileTextOutlined style={{ fontSize: '14px', color: '#6b7280' }} />
                  <Text strong style={{ fontSize: '12px', color: '#6b7280' }}>Role Title</Text>
                  </div>
                  <div style={{ fontSize: '14px', color: '#111827', marginTop: '4px' }}>
                    {form.getFieldValue('roleTitle')}
                  </div>
                </div>
                <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <CheckCircleOutlined style={{ fontSize: '14px', color: '#6b7280' }} />
                  <Text strong style={{ fontSize: '12px', color: '#6b7280' }}>Experience Level</Text>
                  </div>
                  <div style={{ fontSize: '14px', color: '#111827', marginTop: '4px' }}>
                    {experienceLevels.find(l => l.value === form.getFieldValue('experienceLevel'))?.label}
                  </div>
                </div>
                <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <FileTextOutlined style={{ fontSize: '14px', color: '#6b7280' }} />
                  <Text strong style={{ fontSize: '12px', color: '#6b7280' }}>Language</Text>
                  </div>
                  <div style={{ fontSize: '14px', color: '#111827', marginTop: '4px' }}>
                    {languages.find(l => l.value === form.getFieldValue('language'))?.label}
                  </div>
                </div>
                <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <ClockCircleOutlined style={{ fontSize: '14px', color: '#6b7280' }} />
                  <Text strong style={{ fontSize: '12px', color: '#6b7280' }}>Total Time</Text>
                  </div>
                  <div style={{ fontSize: '14px', color: '#111827', marginTop: '4px' }}>
                    {getTotalTime()} minutes
                  </div>
                </div>
                <div style={{ padding: '8px', backgroundColor: '#f0f9ff', borderRadius: '6px', border: '1px solid #e0f2fe' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <CheckCircleOutlined style={{ fontSize: '14px', color: '#0369a1' }} />
                    <Text strong style={{ fontSize: '12px', color: '#0369a1' }}>Competencies</Text>
                  </div>
                  <div style={{ fontSize: '14px', color: '#111827', marginTop: '4px' }}>
                    {selectedCompetencies.length} selected
                  </div>
                </div>
                <div style={{ padding: '8px', backgroundColor: '#f0f9ff', borderRadius: '6px', border: '1px solid #e0f2fe' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <FileTextOutlined style={{ fontSize: '14px', color: '#0369a1' }} />
                    <Text strong style={{ fontSize: '12px', color: '#0369a1' }}>Questions</Text>
                  </div>
                  <div style={{ fontSize: '14px', color: '#111827', marginTop: '4px' }}>
                    {selectedCompetencies.reduce((total, comp) => total + (comp.sampleQuestions?.length || 0), 0)} total
                  </div>
                </div>
              </div>
            </Card>
            
            <Card style={{
              marginBottom: '24px',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <Title level={4} style={{ margin: 0, fontSize: '18px', color: '#111827' }}>Selected Competencies</Title>
                <div style={{
                  backgroundColor: '#f0f9ff',
                  color: '#74794f',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '600',
                  boxShadow: '0 2px 8px rgba(116, 121, 79, 0.15)'
                }}>
                  {selectedCompetencies.length} competencies
                </div>
              </div>
              <div style={{ display: 'grid', gap: '12px' }}>
                {selectedCompetencies.map((comp) => (
                  <div key={comp.id} style={{
                    padding: '20px',
                    background: '#f8f9fa',
                    borderRadius: '10px',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f9ff';
                    e.currentTarget.style.borderColor = '#74794f';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(116, 121, 79, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                  }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <Tag color="blue" style={{ margin: 0, fontSize: '10px', padding: '2px 6px' }}>{comp.category}</Tag>
                      <Text strong style={{ fontSize: '14px' }}>{comp.name}</Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: '13px', lineHeight: '1.4', marginBottom: '12px' }}>
                      {comp.description}
                    </Text>
                    {(comp.sampleQuestions || []).length > 0 && (
                      <div>
                        <Text strong style={{ fontSize: '12px', color: '#262626', marginBottom: '8px', display: 'block' }}>
                          Sample Questions:
                        </Text>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {(comp.sampleQuestions || []).map((q, idx) => (
                            <div key={idx} style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '12px',
                              backgroundColor: 'white',
                              borderRadius: '6px',
                              border: '1px solid #e9ecef',
                              fontSize: '12px'
                            }}>
                              <Text style={{ color: '#666', minWidth: '16px' }}>
                                {idx + 1}.
                              </Text>
                              <Text style={{ color: '#262626', flex: 1 }}>
                                {q}
                              </Text>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                backgroundColor: '#f0f9ff',
                                padding: '4px 8px',
                                borderRadius: '12px',
                                fontSize: '11px',
                                color: '#74794f',
                                fontWeight: '500'
                              }}>
                                <ClockCircleOutlined style={{ fontSize: '10px' }} />
                                <Input
                                  type="number"
                                  min={1}
                                  max={30}
                                  value={questionTimes[`${comp.id}-${idx}`] || 3}
                                  style={{
                                    width: '50px',
                                    height: '24px',
                                    fontSize: '11px',
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    textAlign: 'center',
                                    color: '#74794f',
                                    fontWeight: '500',
                                    padding: '0 4px'
                                  }}
                                  onChange={(e) => {
                                    const newTime = parseInt(e.target.value) || 3;
                                    setQuestionTimes(prev => ({
                                      ...prev,
                                      [`${comp.id}-${idx}`]: newTime
                                    }));
                                  }}
                                />
                                <Text style={{ fontSize: '10px', color: '#74794f' }}>min</Text>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );


      default:
        return null;
    }
  };

  return (
    <>
      <Modal
        title={null}
        open={visible}
        onCancel={handleClose}
        width="min(1200px, 95vw)"
        centered
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{
          top: 20,
          maxHeight: '95vh',
          padding: 0,
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)'
        }}
        styles={{
          body: {
            padding: 0,
            maxHeight: '90vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }
        }}
        footer={
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 48px',
            borderTop: '1px solid #e5e7eb',
            background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
            boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.08)',
            zIndex: 10,
            borderRadius: '0 0 24px 24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {currentStep > 0 && (
                <Button
                  size="large"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  aria-label="Go to previous step"
                  style={{
                    borderColor: '#d1d5db',
                    color: '#6b7280',
                    padding: '14px 28px',
                    height: '52px',
                    fontSize: '16px',
                    fontWeight: '600',
                    borderRadius: '12px',
                    backgroundColor: 'white',
                    transition: 'all 0.3s ease',
                    minWidth: '180px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#74794f';
                    e.currentTarget.style.color = '#74794f';
                    e.currentTarget.style.backgroundColor = '#f8f9f5';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(116, 121, 79, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.color = '#6b7280';
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                  }}
                >
                  <LeftOutlined style={{ marginRight: '8px', fontSize: '14px' }} />
                  Back
                </Button>
              )}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {currentStep === 0 && (
                <Button 
                  type="primary" 
                  size="large"
                  htmlType="submit"
                  form="role-form"
                  loading={isGenerating}
                  disabled={isGenerating || !isFormValid}
                  aria-label={isFormValid ? 'Generate AI suggestions for role' : 'Fill required fields to continue'}
                  style={{ 
                    background: isFormValid ? 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)' : 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)',
                    borderColor: isFormValid ? '#74794f' : '#d1d5db',
                    padding: '14px 36px',
                    height: '52px',
                    fontSize: '16px',
                    fontWeight: '700',
                    borderRadius: '12px',
                    boxShadow: isFormValid ? '0 6px 20px rgba(116, 121, 79, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    minWidth: '180px',
                    border: 'none',
                    cursor: isFormValid ? 'pointer' : 'not-allowed'
                  }}
                  onMouseEnter={(e) => {
                    if (!(e.currentTarget as HTMLButtonElement).disabled && isFormValid) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #5a5f3f 0%, #4a4f2f 100%)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(116, 121, 79, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!(e.currentTarget as HTMLButtonElement).disabled && isFormValid) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(116, 121, 79, 0.3)';
                    }
                  }}
                >
                  <BulbOutlined style={{ marginRight: '10px', fontSize: '16px' }} />
                  {isFormValid ? 'Generate Suggestions' : 'Fill Required Fields'}
                </Button>
              )}

              {currentStep === 1 && (
                <Button
                  type="primary"
                  size="large"
                  onClick={handleGenerateQuestions}
                  loading={isGeneratingQuestions}
                  disabled={selectedCompetencies.length === 0 || isGeneratingQuestions}
                  aria-label={selectedCompetencies.length === 0 ? 'Select competencies to continue' : 'Generate questions for selected competencies'}
                  style={{
                    background: selectedCompetencies.length === 0 ? 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)' : 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)',
                    borderColor: selectedCompetencies.length === 0 ? '#d1d5db' : '#74794f',
                    padding: '14px 36px',
                    height: '52px',
                    fontSize: '16px',
                    fontWeight: '700',
                    borderRadius: '12px',
                    boxShadow: selectedCompetencies.length === 0 ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 6px 20px rgba(116, 121, 79, 0.3)',
                    transition: 'all 0.3s ease',
                    minWidth: '180px',
                    border: 'none',
                    cursor: selectedCompetencies.length === 0 ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!(e.currentTarget as HTMLButtonElement).disabled && selectedCompetencies.length > 0) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #5a5f3f 0%, #4a4f2f 100%)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(116, 121, 79, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!(e.currentTarget as HTMLButtonElement).disabled && selectedCompetencies.length > 0) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(116, 121, 79, 0.3)';
                    }
                  }}
                >
                  {isGeneratingQuestions ? 'Generating...' : 'Next'}
                  <RightOutlined style={{ marginLeft: '10px', fontSize: '16px' }} />
                </Button>
              )}

              {currentStep === 2 && (
                <Button
                  type="primary"
                  size="large"
                  onClick={handleProceedToCustomize}
                  aria-label="Proceed to customize questions"
                  style={{
                    background: 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)',
                    borderColor: '#74794f',
                    padding: '14px 36px',
                    height: '52px',
                    fontSize: '16px',
                    fontWeight: '700',
                    borderRadius: '12px',
                    boxShadow: '0 6px 20px rgba(116, 121, 79, 0.3)',
                    transition: 'all 0.3s ease',
                    minWidth: '180px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #5a5f3f 0%, #4a4f2f 100%)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(116, 121, 79, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(116, 121, 79, 0.3)';
                  }}
                >
                  Next
                  <RightOutlined style={{ marginLeft: '10px', fontSize: '14px' }} />
                </Button>
              )}

              {currentStep === 3 && (
                <Button
                  type="primary"
                  size="large"
                  onClick={handleComplete}
                  aria-label="Complete role profile setup"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderColor: '#10b981',
                    padding: '14px 36px',
                    height: '52px',
                    fontSize: '16px',
                    fontWeight: '700',
                    borderRadius: '12px',
                    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)',
                    transition: 'all 0.3s ease',
                    minWidth: '180px',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.3)';
                  }}
                >
                  <CheckCircleOutlined style={{ marginRight: '10px', fontSize: '16px' }} />
                  Complete
                </Button>
              )}
            </div>
          </div>
        }
        destroyOnHidden
        closable={false}
      >
        {/* Enhanced Header */}
        <div 
          id="modal-title"
          style={{
            padding: '32px 48px 24px 48px',
          borderBottom: '1px solid #e5e7eb',
          background: 'linear-gradient(135deg, #f8f9f5 0%, #ffffff 100%)',
          flexShrink: 0,
            boxShadow: '0 4px 16px rgba(116, 121, 79, 0.08)',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div 
                role="img"
                aria-label={`Step ${currentStep + 1} of 4`}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #74794f 0%, #5a5f3f 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: '800',
                  boxShadow: '0 8px 24px rgba(116, 121, 79, 0.3)',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                {currentStep + 1}
              </div>
              <div>
                <Text style={{
                  color: '#111827',
                  fontSize: '28px',
                  fontWeight: '700',
                  display: 'block',
                  marginBottom: '6px',
                  letterSpacing: '-0.5px',
                  lineHeight: '1.2'
                }}>
                  {currentStep === 0 && 'Role Setup'}
                  {currentStep === 1 && 'Select Competencies'}
                  {currentStep === 2 && 'Customize Questions'}
                  {currentStep === 3 && 'Preview Role Profile'}
                </Text>
                <Text style={{ 
                  color: '#6b7280', 
                  fontSize: '16px',
                  fontWeight: '400',
                  letterSpacing: '0px',
                  lineHeight: '1.5'
                }}>
                  Step {currentStep + 1} of 4
                </Text>
              </div>
            </div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={handleClose}
              aria-label="Close modal"
              tabIndex={0}
              style={{
                color: '#8c8c8c',
                fontSize: '22px',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '14px',
                transition: 'all 0.3s ease',
                backgroundColor: 'transparent',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
                e.currentTarget.style.color = '#666';
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#8c8c8c';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClose();
                }
              }}
            />
          </div>

        </div>
        
        <div 
          id="modal-description"
          style={{
          flex: 1,
            overflowY: 'auto',
            padding: '32px 48px 120px 48px',
            background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)',
            minHeight: 0
          }}
        >
            {getStepContent()}
        </div>
      </Modal>

      {/* Browse All Competencies Modal */}
      <Modal
        title={
          <div style={{ textAlign: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
            <Title level={4} style={{ margin: 0, color: '#74794f' }}>
              <BulbOutlined style={{ marginRight: '8px' }} />
              Browse All Competencies
            </Title>
            <Text type="secondary">Choose competencies that align with your role requirements</Text>
          </div>
        }
        open={isBrowseAllOpen}
        onCancel={() => {
          setIsBrowseAllOpen(false);
          setBrowseSearchTerm('');
        }}
        footer={null}
        width={1000}
        style={{ top: 20 }}
      >
        <div style={{ padding: '24px' }}>
          {/* Enhanced Search and Filter Section */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
          <Input
                placeholder="Search by competency name, description, or category..."
            value={browseSearchTerm}
            onChange={(e) => setBrowseSearchTerm(e.target.value)}
            prefix={<SearchOutlined />}
                style={{
                  flex: 1,
                  height: '44px',
                  fontSize: '14px',
                  borderRadius: '8px'
                }}
              />
              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '13px',
                color: '#74794f',
                fontWeight: '600'
              }}>
                {competencies.filter(comp =>
                  browseSearchTerm === '' ||
                  comp.name.toLowerCase().includes(browseSearchTerm.toLowerCase()) ||
                  comp.description.toLowerCase().includes(browseSearchTerm.toLowerCase()) ||
                  comp.category.toLowerCase().includes(browseSearchTerm.toLowerCase())
                ).length} found
              </div>
        </div>
        
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {Array.from(new Set(competencies.map(comp => comp.category))).map(category => (
                <Button
                  key={category}
                  type={browseSearchTerm === category ? "primary" : "default"}
                  size="small"
                  style={{
                    borderRadius: '16px',
                    height: '28px',
                    fontSize: '12px',
                    backgroundColor: browseSearchTerm === category ? '#74794f' : '#f5f5f5',
                    color: browseSearchTerm === category ? 'white' : '#666',
                    border: 'none'
                  }}
                  onClick={() => setBrowseSearchTerm(browseSearchTerm === category ? '' : category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Enhanced Competency Grid */}
        <div style={{ 
            maxHeight: '450px',
          overflowY: 'auto',
          border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '20px',
            backgroundColor: '#fafafa'
          }}>
            <div style={{
              display: 'grid',
              gap: '16px',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
            }}>
            {competencies
              .filter(comp => 
                browseSearchTerm === '' || 
                comp.name.toLowerCase().includes(browseSearchTerm.toLowerCase()) ||
                comp.description.toLowerCase().includes(browseSearchTerm.toLowerCase()) ||
                comp.category.toLowerCase().includes(browseSearchTerm.toLowerCase())
              )
              .map((comp) => {
                const isSelected = selectedCompetencies.some(c => c.id === comp.id);
                return (
                  <Card 
                    key={comp.id} 
                    style={{ 
                      border: isSelected ? '2px solid #74794f' : '1px solid #e5e7eb',
                        borderRadius: '10px',
                      cursor: isSelected ? 'default' : 'pointer',
                      backgroundColor: isSelected ? '#f0f9ff' : 'white',
                        opacity: isSelected ? 0.8 : 1,
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                    }}
                    onClick={() => !isSelected && handleSelectFromBrowse(comp)}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = '#74794f';
                          e.currentTarget.style.boxShadow = '0 4px 16px rgba(116, 121, 79, 0.15)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', gap: '8px' }}>
                            <Tag
                              color="blue"
                              style={{
                                fontSize: '11px',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                fontWeight: '500'
                              }}
                            >
                              {comp.category}
                            </Tag>
                            <Text strong style={{ fontSize: '15px', color: '#262626' }}>
                              {comp.name}
                            </Text>
                        </div>
                          <Text
                            type="secondary"
                            style={{
                              fontSize: '13px',
                              lineHeight: '1.5',
                              display: 'block',
                              marginBottom: '12px'
                            }}
                          >
                          {comp.description}
                        </Text>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                          gap: '8px',
                        marginLeft: '12px'
                      }}>
                          {isSelected ? (
                            <Button
                              type="default"
                              size="small"
                              onClick={() => {
                                setSelectedCompetencies(selectedCompetencies.filter(c => c.id !== comp.id));
                              }}
                              style={{
                                backgroundColor: '#f6ffed',
                                borderColor: '#b7eb8f',
                                color: '#52c41a',
                                borderRadius: '6px',
                                fontSize: '11px',
                                height: '28px',
                                padding: '0 12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#d9f7be';
                                e.currentTarget.style.borderColor = '#95de64';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#f6ffed';
                                e.currentTarget.style.borderColor = '#b7eb8f';
                              }}
                            >
                              <CheckCircleOutlined style={{ marginRight: '4px' }} />
                              Selected
                            </Button>
                          ) : (
                            <Button
                              type="primary"
                              size="small"
                              onClick={() => {
                                setSelectedCompetencies([...selectedCompetencies, comp]);
                              }}
                              style={{
                                backgroundColor: '#74794f',
                                borderColor: '#74794f',
                                borderRadius: '6px',
                                fontSize: '11px',
                                height: '28px',
                                padding: '0 12px'
                              }}
                            >
                              <PlusOutlined style={{ marginRight: '4px' }} />
                              Select
                            </Button>
                          )}
                      </div>
                    </div>
                  </Card>
                );
              })}
          </div>
        </div>
        
          {/* Enhanced Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '13px', color: '#8c8c8c' }}>
              {selectedCompetencies.length} competencies selected
            </div>
            <Space>
              <Button
                size="large"
                onClick={() => {
                  setIsBrowseAllOpen(false);
                  setBrowseSearchTerm('');
                }}
                style={{
                  borderColor: '#d1d5db',
                  color: '#6b7280',
                  padding: '8px 24px',
                  height: '40px',
                  borderRadius: '6px'
                }}
              >
                Cancel
              </Button>
          <Button 
            type="primary"
                size="large"
            onClick={() => setIsBrowseAllOpen(false)}
            style={{ 
              backgroundColor: '#74794f', 
                  borderColor: '#74794f',
                  padding: '8px 32px',
                  height: '40px',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(116, 121, 79, 0.2)'
                }}
              >
                Apply ({selectedCompetencies.length} selected)
          </Button>
            </Space>
          </div>
        </div>
      </Modal>

      {/* Add Custom Competency Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <PlusOutlined style={{ color: '#74794f', fontSize: '20px' }} />
            <span style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
              Add Custom Competency
            </span>
          </div>
        }
        open={isAddingCustom}
        onCancel={() => {
          setIsAddingCustom(false);
          customCompetencyForm.resetFields();
        }}
        footer={null}
        width={600}
        styles={{
          body: { padding: '32px' }
        }}
      >
        <Form
          form={customCompetencyForm}
          layout="vertical"
          onFinish={handleAddCustomCompetency}
        >
          <Form.Item
            name="name"
              label={
                <div>
                  <Text strong style={{ color: '#111827', fontSize: '16px', fontWeight: '600', marginBottom: '4px', display: 'block' }}>
                    Competency Name
                  </Text>
                  <Text style={{ color: '#6b7280', fontSize: '14px' }}>
                    Enter a clear and specific competency name
                  </Text>
                </div>
              }
            rules={[{ required: true, message: 'Please enter competency name' }]}
          >
              <Input 
                placeholder="e.g., Machine Learning, Project Management" 
                size="large"
                style={{ borderRadius: '8px' }}
              />
          </Form.Item>
          
          <Form.Item
            name="category"
              label={
                <div>
                  <Text strong style={{ color: '#111827', fontSize: '16px', fontWeight: '600', marginBottom: '4px', display: 'block' }}>
                    Category
                  </Text>
                  <Text style={{ color: '#6b7280', fontSize: '14px' }}>
                    Choose the most appropriate category for this competency
                  </Text>
                </div>
              }
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Select 
              placeholder="Select category"
                size="large"
                style={{ borderRadius: '8px' }}
              onChange={(value) => setCustomCategory(value)}
            >
              <Select.Option value="Technical">Technical</Select.Option>
              <Select.Option value="Soft Skills">Soft Skills</Select.Option>
              <Select.Option value="Leadership">Leadership</Select.Option>
              <Select.Option value="Communication">Communication</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          
          {customCategory === 'Other' && (
            <Form.Item
              name="customCategoryName"
                label={
                  <div>
                    <Text strong style={{ color: '#111827', fontSize: '16px', fontWeight: '600', marginBottom: '4px', display: 'block' }}>
                      Custom Category Name
                    </Text>
                    <Text style={{ color: '#6b7280', fontSize: '14px' }}>
                      Specify a custom category name
                    </Text>
                  </div>
                }
              rules={[{ required: true, message: 'Please enter custom category name' }]}
            >
                <Input 
                  placeholder="Enter custom category name" 
                  size="large"
                  style={{ borderRadius: '8px' }}
                />
            </Form.Item>
          )}
          
          <Form.Item
            name="description"
              label={
                <div>
                  <Text strong style={{ color: '#111827', fontSize: '16px', fontWeight: '600', marginBottom: '4px', display: 'block' }}>
                    Description
                  </Text>
                  <Text style={{ color: '#6b7280', fontSize: '14px' }}>
                    Provide a detailed description of what this competency involves
                  </Text>
                </div>
              }
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea 
              placeholder="Describe what this competency involves..."
                rows={4}
                style={{ borderRadius: '8px' }}
            />
          </Form.Item>
          
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '12px', 
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <Button 
                onClick={() => {
                setIsAddingCustom(false);
                customCompetencyForm.resetFields();
                }}
                size="large"
                style={{ 
                  borderRadius: '8px',
                  height: '48px',
                  paddingLeft: '24px',
                  paddingRight: '24px'
                }}
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                size="large"
                style={{ 
                  borderRadius: '8px',
                  height: '48px',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                  background: '#74794f',
                  borderColor: '#74794f'
                }}
              >
                Add Competency
              </Button>
            </div>
        </Form>
      </Modal>

      {/* Full JR Setup Modal */}
      <Modal
      title={
        <div style={{ textAlign: 'center' }}>
          <Title level={3} style={{ margin: 0, color: '#74794f' }}>
            <FileTextOutlined style={{ marginRight: '8px' }} />
            Full Job Requisition Setup
          </Title>
          <Text type="secondary">Complete job requisition with detailed information</Text>
        </div>
      }
      open={isJRSetupModalOpen}
      onCancel={() => setIsJRSetupModalOpen(false)}
      footer={null}
      width={800}
      style={{ top: 20 }}
    >
      <Form
        form={jrForm}
        layout="vertical"
        onFinish={handleJRSetupComplete}
        style={{ padding: '24px 0' }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Job Title"
              rules={[{ required: true, message: 'Please enter job title' }]}
            >
              <Input placeholder="e.g., Senior Frontend Developer" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="department"
              label="Department"
              rules={[{ required: true, message: 'Please select department' }]}
            >
              <Select placeholder="Select department" size="large">
                <Select.Option value="engineering">Engineering</Select.Option>
                <Select.Option value="product">Product</Select.Option>
                <Select.Option value="design">Design</Select.Option>
                <Select.Option value="marketing">Marketing</Select.Option>
                <Select.Option value="sales">Sales</Select.Option>
                <Select.Option value="hr">Human Resources</Select.Option>
                <Select.Option value="finance">Finance</Select.Option>
                <Select.Option value="operations">Operations</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: 'Please enter location' }]}
            >
              <Input placeholder="e.g., Bangkok, Thailand" size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="employmentType"
              label="Employment Type"
              rules={[{ required: true, message: 'Please select employment type' }]}
            >
              <Select placeholder="Select employment type" size="large">
                <Select.Option value="full-time">Full-time</Select.Option>
                <Select.Option value="part-time">Part-time</Select.Option>
                <Select.Option value="contract">Contract</Select.Option>
                <Select.Option value="internship">Internship</Select.Option>
                <Select.Option value="remote">Remote</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="experienceLevel"
              label="Experience Level"
              rules={[{ required: true, message: 'Please select experience level' }]}
            >
              <Select placeholder="Select experience level" size="large">
                {experienceLevels.map(level => (
                  <Select.Option key={level.value} value={level.value}>
                    {level.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="language"
              label="Primary Language"
              rules={[{ required: true, message: 'Please select language' }]}
            >
              <Select placeholder="Select primary language" size="large">
                {languages.map(lang => (
                  <Select.Option key={lang.value} value={lang.value}>
                    {lang.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Job Description"
          rules={[{ required: true, message: 'Please enter job description' }]}
        >
          <TextArea 
            rows={4} 
            placeholder="Describe the role, responsibilities, and requirements..."
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="requirements"
          label="Key Requirements"
        >
          <TextArea 
            rows={3} 
            placeholder="List key requirements and qualifications..."
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="benefits"
          label="Benefits & Perks"
        >
          <TextArea 
            rows={2} 
            placeholder="List benefits, perks, and compensation details..."
            size="large"
          />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center', marginTop: '32px' }}>
          <Space size="large">
            <Button 
              size="large"
              onClick={() => setIsJRSetupModalOpen(false)}
              style={{ padding: '8px 24px' }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{
                backgroundColor: '#74794f',
                borderColor: '#74794f',
                padding: '8px 32px'
              }}
              icon={<RocketOutlined />}
            >
              Generate Role Profile
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>

    </>
  );
};

export default QuickRoleProfileAgent;
