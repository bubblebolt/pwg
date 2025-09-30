'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  FileTextOutlined,
  SendOutlined,
  UserOutlined,
  EditOutlined,
  RocketOutlined
} from '@ant-design/icons';
import QuickRoleProfileAgent from '@/components/QuickRoleProfileAgent';

export default function Home() {
  const [isQuickRoleAgentOpen, setIsQuickRoleAgentOpen] = useState(false);

  const handleQuickRoleComplete = (profile: any) => {
    console.log('Role Profile Generated:', profile);
    toast.success(`Role Profile Generated Successfully!\nRole: ${profile.roleTitle}\nCompetencies: ${profile.selectedCompetencies.length}\nEstimated Time: ${profile.estimatedTime} minutes`);
  };

  const features = [
    {
      title: 'Create Job Requisition',
      description: 'Design comprehensive job requisitions with evaluation criteria, prescreening questions, and competency assessments.',
      icon: <FileTextOutlined style={{ fontSize: '48px', color: '#74794f' }} />,
      href: '/job-requisition'
    },
    {
      title: 'Send Candidate Information',
      description: 'Share candidate details and application forms with stakeholders and team members.',
      icon: <SendOutlined style={{ fontSize: '48px', color: '#74794f' }} />,
      href: '/send-info'
    },
    {
      title: 'Candidate Management',
      description: 'Manage candidate applications, track progress, handle transfers, and maintain comprehensive records.',
      icon: <UserOutlined style={{ fontSize: '48px', color: '#74794f' }} />,
      href: '/candidates'
    },
    {
      title: 'Quick Role Profile',
      description: 'Create comprehensive role profiles in 5-10 minutes using AI-powered smart matching and competency analysis.',
      icon: <RocketOutlined style={{ fontSize: '48px', color: '#74794f' }} />,
      href: '/quick-role-profile-new'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9f5' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '32px' }}
        >
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
            TalentSphere
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '48px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ height: '4px', backgroundColor: '#74794f', borderRadius: '2px' }}
          ></motion.div>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', margin: '0 0 16px 0' }}>
            Streamline Your Recruitment Process
          </h2>
          <p style={{ fontSize: '18px', color: '#6b7280', maxWidth: '600px', margin: '0 auto 32px auto' }}>
            From job requisition creation to candidate assessment, TalentSphere provides 
            a comprehensive platform for modern recruitment management.
          </p>
          
          {/* Quick Role Profile Agent CTA */}
          <div style={{
            background: 'linear-gradient(135deg, #2596be 0%, #1e7a9e 100%)',
            borderRadius: '16px',
            padding: '32px',
            margin: '0 auto',
            maxWidth: '600px',
            color: 'white',
            boxShadow: '0 8px 32px rgba(37, 150, 190, 0.3)'
          }}>
            <RocketOutlined style={{ fontSize: '48px', marginBottom: '16px', display: 'block' }} />
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 12px 0' }}>
              Quick Role Profile Agent
            </h3>
            <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', margin: '0 0 24px 0' }}>
              Reduce role profile creation time from 30+ minutes to just 5-10 minutes with AI-powered smart matching
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.2)', 
                padding: '8px 16px', 
                borderRadius: '20px', 
                fontSize: '14px',
                fontWeight: '500'
              }}>
                ⚡ 4 Simple Steps
              </div>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.2)', 
                padding: '8px 16px', 
                borderRadius: '20px', 
                fontSize: '14px',
                fontWeight: '500'
              }}>
                🤖 AI Smart Matching
              </div>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.2)', 
                padding: '8px 16px', 
                borderRadius: '20px', 
                fontSize: '14px',
                fontWeight: '500'
              }}>
                ⏱️ 5-10 Minutes Total
              </div>
            </div>
            <Link href="/quick-role-profile-new">
              <Button
                type="primary"
                size="large"
                style={{
                  backgroundColor: 'white',
                  color: '#2596be',
                  borderColor: 'white',
                  fontWeight: '600',
                  padding: '12px 32px',
                  height: 'auto',
                  fontSize: '16px'
                }}
                icon={<RocketOutlined />}
              >
                Try Quick Role Profile Agent
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '24px',
            marginBottom: '48px'
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
            <Link
              key={index}
              href={feature.href}
              style={{
                display: 'block',
                padding: '32px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(116, 121, 79, 0.1)',
                border: '1px solid rgba(116, 121, 79, 0.15)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(-4px)';
                target.style.boxShadow = '0 8px 24px rgba(116, 121, 79, 0.2)';
                target.style.borderColor = 'rgba(116, 121, 79, 0.3)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = '0 4px 12px rgba(116, 121, 79, 0.1)';
                target.style.borderColor = 'rgba(116, 121, 79, 0.15)';
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-flex',
                  padding: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#f8f9f5',
                  marginBottom: '24px',
                  border: '2px solid rgba(116, 121, 79, 0.1)'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  color: '#111827', 
                  margin: '0 0 12px 0' 
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#6b7280', 
                  lineHeight: '1.6',
                  margin: '0'
                }}>
                  {feature.description}
                </p>
              </div>
            </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(116, 121, 79, 0.1)',
            border: '1px solid rgba(116, 121, 79, 0.15)',
            padding: '32px',
            marginBottom: '32px'
          }}
        >
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '32px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                500+
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Active Job Requisitions
              </div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                2,500+
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Candidates Managed
              </div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
                95%
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Success Rate
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          style={{
            background: 'linear-gradient(135deg, #74794f 0%, #5e6340 100%)',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            color: 'white'
          }}
        >
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
            Ready to Transform Your Recruitment?
          </h3>
          <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', margin: '0 0 24px 0', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Join thousands of companies using TalentSphere to streamline their hiring process 
            and find the best talent faster.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/job-requisition"
              style={{
                backgroundColor: 'white',
                color: '#74794f',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.2s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = '#f8f9f5';
                target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = 'white';
                target.style.transform = 'translateY(0)';
              }}
            >
              Create Your First Job Requisition
            </Link>
            <Link
              href="/candidates"
              style={{
                border: '2px solid white',
                color: 'white',
                padding: '10px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.2s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = 'white';
                target.style.color = '#74794f';
                target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = 'transparent';
                target.style.color = 'white';
                target.style.transform = 'translateY(0)';
              }}
            >
              View Candidates
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Quick Role Profile Agent Modal */}
      <QuickRoleProfileAgent
        visible={isQuickRoleAgentOpen}
        onClose={() => setIsQuickRoleAgentOpen(false)}
        onComplete={handleQuickRoleComplete}
      />
    </div>
  );
}
