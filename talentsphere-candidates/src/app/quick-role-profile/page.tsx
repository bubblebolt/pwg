'use client';

import React, { useState } from 'react';
import { Button, Card, Typography, Space, Divider, Steps, Form, Input, Select, Radio, Row, Col } from 'antd';
import { 
  UserOutlined, 
  BulbOutlined, 
  SettingOutlined, 
  CheckCircleOutlined,
  PlusOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  ProfileOutlined,
  RightOutlined,
  LeftOutlined,
  CloseOutlined,
  SearchOutlined,
  EditOutlined,
  ReloadOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default function QuickRoleProfilePage() {
  const [isQuickRoleAgentOpen, setIsQuickRoleAgentOpen] = useState(false);

  const handleQuickRoleComplete = (profile: any) => {
    console.log('Role Profile Generated:', profile);
    alert(`Role Profile Generated Successfully!\n\nRole: ${profile.roleTitle}\nCompetencies: ${profile.selectedCompetencies.length}\nEstimated Time: ${profile.estimatedTime} minutes`);
  };

  const features = [
    {
      icon: <ProfileOutlined style={{ fontSize: '32px', color: '#74794f' }} />,
      title: '4 Simple Steps',
      description: 'Quick Setup → AI Smart Match → Customize → Complete'
    },
    {
      icon: <BulbOutlined style={{ fontSize: '32px', color: '#74794f' }} />,
      title: 'AI Smart Matching',
      description: 'Intelligent analysis of 47+ competencies based on role title'
    },
    {
      icon: <ClockCircleOutlined style={{ fontSize: '32px', color: '#74794f' }} />,
      title: '5-10 Minutes Total',
      description: 'Reduce setup time from 30+ minutes to just 5-10 minutes'
    },
    {
      icon: <SettingOutlined style={{ fontSize: '32px', color: '#74794f' }} />,
      title: 'Fully Customizable',
      description: 'Add, remove, or modify competencies and questions as needed'
    }
  ];

  const benefits = [
    'Reduce role profile creation time by 80%',
    'AI-powered competency matching eliminates guesswork',
    'Pre-built question templates for each competency',
    'Automatic time estimation for interview planning',
    'Support for multiple languages and experience levels',
    'Export-ready role profiles for immediate use'
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9f5' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ marginBottom: '24px' }}>
            <ProfileOutlined style={{ fontSize: '64px', color: '#74794f', marginBottom: '16px' }} />
            <Title level={1} style={{ margin: '0 0 16px 0', color: '#111827' }}>
              Quick Role Profile
            </Title>
            <div style={{ width: '80px', height: '4px', backgroundColor: '#74794f', borderRadius: '2px', margin: '0 auto' }}></div>
          </div>
          
          <Paragraph style={{ fontSize: '20px', color: '#6b7280', maxWidth: '800px', margin: '0 auto 32px auto' }}>
            Transform your role profile creation process with AI-powered smart matching. 
            Create comprehensive role profiles in just 5-10 minutes instead of 30+ minutes.
          </Paragraph>

          <Button
            type="primary"
            size="large"
            onClick={() => setIsQuickRoleAgentOpen(true)}
            style={{
              backgroundColor: '#74794f',
              borderColor: '#74794f',
              fontWeight: '600',
              padding: '16px 40px',
              height: 'auto',
              fontSize: '18px'
            }}
            icon={<ProfileOutlined />}
          >
            Start Quick Role Profile
          </Button>
        </div>

        {/* Features Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '24px',
          marginBottom: '48px'
        }}>
          {features.map((feature, index) => (
            <Card
              key={index}
              style={{
                textAlign: 'center',
                border: '1px solid #e8e8e8',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(37, 150, 190, 0.1)'
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                {feature.icon}
              </div>
              <Title level={4} style={{ margin: '0 0 12px 0' }}>
                {feature.title}
              </Title>
              <Text type="secondary">
                {feature.description}
              </Text>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card style={{ marginBottom: '48px', borderRadius: '12px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
            How It Works
          </Title>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#f8f9f5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '2px solid #74794f'
              }}>
                <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#74794f' }}>1</Text>
              </div>
              <Title level={4} style={{ margin: '0 0 8px 0' }}>Quick Setup</Title>
              <Text type="secondary">Enter role title, experience level, and language</Text>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#f8f9f5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '2px solid #74794f'
              }}>
                <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#74794f' }}>2</Text>
              </div>
              <Title level={4} style={{ margin: '0 0 8px 0' }}>AI Smart Match</Title>
              <Text type="secondary">AI analyzes and suggests 4-5 key competencies</Text>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#f8f9f5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '2px solid #74794f'
              }}>
                <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#74794f' }}>3</Text>
              </div>
              <Title level={4} style={{ margin: '0 0 8px 0' }}>Customize</Title>
              <Text type="secondary">Add, remove, or modify competencies and questions</Text>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#f8f9f5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '2px solid #74794f'
              }}>
                <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#74794f' }}>4</Text>
              </div>
              <Title level={4} style={{ margin: '0 0 8px 0' }}>Complete</Title>
              <Text type="secondary">Generate your comprehensive role profile</Text>
            </div>
          </div>
        </Card>

        {/* Benefits */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '32px',
          marginBottom: '48px'
        }}>
          <Card style={{ borderRadius: '12px' }}>
            <Title level={3} style={{ marginBottom: '16px' }}>
              <CheckCircleOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
              Key Benefits
            </Title>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {benefits.map((benefit, index) => (
                <li key={index} style={{ marginBottom: '8px', color: '#6b7280' }}>
                  {benefit}
                </li>
              ))}
            </ul>
          </Card>
          
          <Card style={{ borderRadius: '12px' }}>
            <Title level={3} style={{ marginBottom: '16px' }}>
              <FileTextOutlined style={{ marginRight: '8px', color: '#2596be' }} />
              What You Get
            </Title>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <Text>4-5 relevant competencies with descriptions</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <Text>Sample interview questions for each competency</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <Text>Time estimation for interview planning</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <Text>Custom questions support</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <Text>Export-ready role profile</Text>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <Card style={{
          background: 'linear-gradient(135deg, #74794f 0%, #5e6340 100%)',
          borderRadius: '16px',
          textAlign: 'center',
          color: 'white',
          border: 'none'
        }}>
          <Title level={2} style={{ color: 'white', marginBottom: '16px' }}>
            Ready to Create Your First Role Profile?
          </Title>
          <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '18px', marginBottom: '32px' }}>
            Join thousands of recruiters who have streamlined their role profile creation process
          </Paragraph>
          <Button
            type="primary"
            size="large"
            onClick={() => setIsQuickRoleAgentOpen(true)}
            style={{
              backgroundColor: 'white',
              color: '#74794f',
              borderColor: 'white',
              fontWeight: '600',
              padding: '16px 40px',
              height: 'auto',
              fontSize: '18px'
            }}
            icon={<ProfileOutlined />}
          >
            Start Creating Now
          </Button>
        </Card>
      </div>

      {/* Quick Role Profile Agent Modal */}
      {isQuickRoleAgentOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '600px',
            width: '90%',
            textAlign: 'center'
          }}>
            <Title level={2} style={{ marginBottom: '16px' }}>Quick Role Profile</Title>
            <Text style={{ fontSize: '16px', color: '#666', marginBottom: '24px', display: 'block' }}>
              This feature has been moved to a dedicated page for better user experience.
            </Text>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <Button onClick={() => setIsQuickRoleAgentOpen(false)}>
                Close
              </Button>
              <Button 
                type="primary" 
                onClick={() => {
                  setIsQuickRoleAgentOpen(false);
                  window.open('/quick-role-profile-new', '_blank');
                }}
                style={{ backgroundColor: '#74794f', borderColor: '#74794f' }}
              >
                Go to New Page
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
