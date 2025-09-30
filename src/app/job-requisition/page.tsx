'use client';

import React, { useState } from 'react';
import JobRequisitionModal from '@/components/JobRequisitionModal';
import { PlusOutlined, FileTextOutlined, EyeOutlined, EditOutlined, DeleteOutlined, ThunderboltOutlined, ClockCircleOutlined, RocketOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default function JobRequisitionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  // Mock data for job requisitions
  const jobRequisitions = [
    {
      id: 'jr-1',
      title: 'Senior Full Stack Developer',
      role: 'Technical Engineer / Developer',
      headcount: 2,
      candidates: 15,
      hired: 0,
      createdDate: new Date('2025-01-15'),
      status: 'Active',
      department: 'Engineering'
    },
    {
      id: 'jr-2',
      title: 'Product Manager',
      role: 'Project & Change Practitioner',
      headcount: 1,
      candidates: 8,
      hired: 1,
      createdDate: new Date('2025-01-10'),
      status: 'Active',
      department: 'Product'
    },
    {
      id: 'jr-3',
      title: 'Data Analyst',
      role: 'Data & Insight Analyst',
      headcount: 3,
      candidates: 22,
      hired: 0,
      createdDate: new Date('2025-01-08'),
      status: 'Active',
      department: 'Analytics'
    },
    {
      id: 'jr-4',
      title: 'UX Designer',
      role: 'Technical Engineer / Developer',
      headcount: 1,
      candidates: 12,
      hired: 0,
      createdDate: new Date('2025-01-05'),
      status: 'Inactive',
      department: 'Design'
    }
  ];

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks}w ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };


  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9f5' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' }}>
            Job Requisition Management
          </h1>
          <div style={{ width: '48px', height: '4px', backgroundColor: '#74794f', borderRadius: '2px' }}></div>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(116, 121, 79, 0.1)',
            border: '1px solid rgba(116, 121, 79, 0.15)',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              {jobRequisitions.filter(jr => jr.status === 'Active').length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Active JRs
            </div>
          </div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(116, 121, 79, 0.1)',
            border: '1px solid rgba(116, 121, 79, 0.15)',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              {jobRequisitions.filter(jr => jr.status === 'Inactive').length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Inactive JRs
            </div>
          </div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(116, 121, 79, 0.1)',
            border: '1px solid rgba(116, 121, 79, 0.15)',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              {jobRequisitions.reduce((sum, jr) => sum + jr.candidates, 0)}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              Total Candidates
            </div>
          </div>
        </div>

        {/* Job Requisitions Table */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(116, 121, 79, 0.1)', 
          border: '1px solid rgba(116, 121, 79, 0.15)', 
          overflow: 'hidden' 
        }}>
          <div style={{ 
            padding: '24px', 
            borderBottom: '1px solid rgba(116, 121, 79, 0.1)', 
            background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f0 100%)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 4px 0' }}>
                Job Requisitions
              </h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
                Manage job requisitions and track candidate progress
              </p>
            </div>
            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: '#74794f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  boxShadow: '0 2px 4px rgba(116, 121, 79, 0.2)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = '#5e6340';
                  target.style.boxShadow = '0 4px 8px rgba(116, 121, 79, 0.3)';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = '#74794f';
                  target.style.boxShadow = '0 2px 4px rgba(116, 121, 79, 0.2)';
                }}
              >
                <PlusOutlined style={{ fontSize: '16px' }} />
                New JR
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
              <thead style={{ backgroundColor: '#f8f9f5' }}>
                <tr>
                  <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#74794f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Job Title
                  </th>
                  <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#74794f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Role Profile
                  </th>
                  <th style={{ padding: '12px 24px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#74794f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Headcount
                  </th>
                  <th style={{ padding: '12px 24px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#74794f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Candidates
                  </th>
                  <th style={{ padding: '12px 24px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#74794f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Hired
                  </th>
                  <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#74794f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Created
                  </th>
                  <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#74794f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Status
                  </th>
                  <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#74794f', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: 'white' }}>
                {jobRequisitions.map((jr) => (
                  <tr key={jr.id} style={{ borderBottom: '1px solid rgba(116, 121, 79, 0.1)' }}>
                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                          {jr.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          {jr.department}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: '14px', color: '#111827' }}>
                        {jr.role}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', color: '#111827' }}>
                        {jr.headcount}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', color: '#111827' }}>
                        {jr.candidates}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', color: '#111827' }}>
                        {jr.hired}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: '14px', color: '#111827' }}>
                        {formatDate(jr.createdDate)}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        display: 'inline-flex',
                        padding: '4px 8px',
                        fontSize: '12px',
                        fontWeight: '500',
                        borderRadius: '9999px',
                        backgroundColor: jr.status === 'Active' ? '#dcfce7' : '#f3f4f6',
                        color: jr.status === 'Active' ? '#166534' : '#374151'
                      }}>
                        {jr.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: '500' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button 
                          style={{
                            color: 'white',
                            backgroundColor: '#74794f',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            padding: '8px 12px',
                            fontSize: '12px',
                            fontWeight: '500',
                            boxShadow: '0 2px 4px rgba(116, 121, 79, 0.2)',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          onMouseEnter={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.backgroundColor = '#5e6340';
                            target.style.boxShadow = '0 4px 8px rgba(116, 121, 79, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.backgroundColor = '#74794f';
                            target.style.boxShadow = '0 2px 4px rgba(116, 121, 79, 0.2)';
                          }}
                        >
                          <EyeOutlined style={{ fontSize: '12px' }} />
                          View
                        </button>
                        <button 
                          style={{
                            color: 'white',
                            backgroundColor: '#74794f',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            padding: '8px 12px',
                            fontSize: '12px',
                            fontWeight: '500',
                            boxShadow: '0 2px 4px rgba(116, 121, 79, 0.2)',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          onMouseEnter={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.backgroundColor = '#5e6340';
                            target.style.boxShadow = '0 4px 8px rgba(116, 121, 79, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.backgroundColor = '#74794f';
                            target.style.boxShadow = '0 2px 4px rgba(116, 121, 79, 0.2)';
                          }}
                        >
                          <EditOutlined style={{ fontSize: '12px' }} />
                          Edit
                        </button>
                        <button 
                          style={{
                            color: 'white',
                            backgroundColor: '#ef4444',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            padding: '8px 12px',
                            fontSize: '12px',
                            fontWeight: '500',
                            boxShadow: '0 2px 4px rgba(239, 68, 68, 0.2)',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          onMouseEnter={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.backgroundColor = '#dc2626';
                            target.style.boxShadow = '0 4px 8px rgba(239, 68, 68, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            const target = e.target as HTMLButtonElement;
                            target.style.backgroundColor = '#ef4444';
                            target.style.boxShadow = '0 2px 4px rgba(239, 68, 68, 0.2)';
                          }}
                        >
                          <DeleteOutlined style={{ fontSize: '12px' }} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>


      <JobRequisitionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onQuickRoleProfile={() => window.open('/quick-role-profile-new', '_blank')}
      />
    </div>
  );
}
