'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, Tag, Button, Timeline, Spin, message } from 'antd';
import { 
  ArrowLeftOutlined, 
  UserOutlined, 
  CopyOutlined, 
  ArrowRightOutlined,
  ClockCircleOutlined,
  LinkOutlined
} from '@ant-design/icons';
import { candidates as initialCandidates } from '@/lib/data';
import { Candidate, TransferRecord } from '@/lib/types';

export default function CandidateProfile() {
  const params = useParams();
  const router = useRouter();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const candidateId = params.id as string;
    const foundCandidate = initialCandidates.find(c => c.id === candidateId);
    
    if (foundCandidate) {
      setCandidate(foundCandidate);
    } else {
      message.error('Candidate not found');
      router.push('/');
    }
    
    setLoading(false);
  }, [params.id, router]);

  const getJRName = (jrId: string) => {
    const jrNames: { [key: string]: string } = {
      'jr-1': 'Software Engineer - Frontend',
      'jr-2': 'Software Engineer - Backend', 
      'jr-3': 'Product Manager',
      'jr-4': 'UX Designer',
      'jr-5': 'Data Analyst'
    };
    return jrNames[jrId] || jrId;
  };

  const getJRLink = (jrId: string) => {
    return `/jobs/${jrId}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'copy':
        return <CopyOutlined style={{ color: '#52c41a' }} />;
      case 'move':
        return <ArrowRightOutlined style={{ color: '#1890ff' }} />;
      default:
        return <UserOutlined style={{ color: '#74794f' }} />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'copy':
        return 'green';
      case 'move':
        return 'blue';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8f9f5', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!candidate) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8f9f5', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Candidate not found</h2>
          <Button onClick={() => router.push('/')}>Back to Candidates</Button>
        </div>
      </div>
    );
  }

  // Create timeline items
  const timelineItems = [
    {
      dot: <UserOutlined style={{ color: '#74794f' }} />,
      children: (
        <div>
          <h4 style={{ margin: '0 0 4px 0', color: '#111827' }}>Applied</h4>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6b7280' }}>
            Applied to{' '}
            <a 
              href={getJRLink(candidate.originalJR)} 
              style={{ color: '#74794f', textDecoration: 'none' }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              <LinkOutlined style={{ marginRight: '4px' }} />
              {getJRName(candidate.originalJR)}
            </a>
          </p>
          <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>
            {formatDate(candidate.appliedDate)}
          </p>
        </div>
      )
    },
    ...candidate.transferHistory.map((transfer: TransferRecord) => ({
      dot: getActionIcon(transfer.action),
      children: (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h4 style={{ margin: '0', color: '#111827' }}>
              {transfer.action === 'copy' ? 'Copied' : 'Moved'}
            </h4>
            <Tag color={getActionColor(transfer.action)}>
              {transfer.action.toUpperCase()}
            </Tag>
          </div>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6b7280' }}>
            {transfer.action === 'move' && transfer.fromJR ? (
              <>
                Moved from{' '}
                <a 
                  href={getJRLink(transfer.fromJR)} 
                  style={{ color: '#74794f', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  <LinkOutlined style={{ marginRight: '4px' }} />
                  {getJRName(transfer.fromJR)}
                </a>
                {' '}to{' '}
                <a 
                  href={getJRLink(transfer.toJR)} 
                  style={{ color: '#74794f', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  <LinkOutlined style={{ marginRight: '4px' }} />
                  {getJRName(transfer.toJR)}
                </a>
              </>
            ) : (
              <>
                Copied to{' '}
                <a 
                  href={getJRLink(transfer.toJR)} 
                  style={{ color: '#74794f', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  <LinkOutlined style={{ marginRight: '4px' }} />
                  {getJRName(transfer.toJR)}
                </a>
              </>
            )}
          </p>
          {transfer.notes && (
            <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#8b8b8b', fontStyle: 'italic' }}>
              "{transfer.notes}"
            </p>
          )}
          <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>
            {formatDate(transfer.timestamp)} by {transfer.performedBy}
          </p>
        </div>
      )
    }))
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9f5' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => router.push('/')}
            style={{ marginBottom: '16px' }}
          >
            Back to Candidates
          </Button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#74794f',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(116, 121, 79, 0.2)'
            }}>
              <UserOutlined style={{ color: 'white', fontSize: '24px' }} />
            </div>
            <div>
              <h1 style={{ 
                fontSize: '28px', 
                fontWeight: 'bold', 
                color: '#111827', 
                margin: '0 0 4px 0' 
              }}>
                {candidate.name}
              </h1>
              <p style={{ 
                fontSize: '16px', 
                color: '#6b7280', 
                margin: '0 0 4px 0' 
              }}>
                {candidate.email}
              </p>
              <p style={{ 
                fontSize: '14px', 
                color: '#9ca3af', 
                margin: '0' 
              }}>
                Applied: {formatDate(candidate.appliedDate)}
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Current Status */}
          <Card 
            title="Current Status" 
            style={{ 
              border: '1px solid rgba(116, 121, 79, 0.2)',
              borderRadius: '12px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h4 style={{ margin: '0 0 8px 0', color: '#111827' }}>Status & Tags</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {candidate.status && (
                    <Tag color={candidate.status.includes('Blacklisted') ? 'red' : 'blue'}>
                      {candidate.status}
                    </Tag>
                  )}
                  {candidate.tags.map((tag, index) => (
                    <Tag key={index} color="green">{tag}</Tag>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ margin: '0 0 8px 0', color: '#111827' }}>Current Job Requisitions</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {candidate.currentJRs.map((jr, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      padding: '8px 12px',
                      backgroundColor: '#f8f9f5',
                      borderRadius: '6px',
                      border: '1px solid rgba(116, 121, 79, 0.1)'
                    }}>
                      <LinkOutlined style={{ color: '#74794f' }} />
                      <a 
                        href={getJRLink(jr)} 
                        style={{ 
                          color: '#74794f', 
                          textDecoration: 'none',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                      >
                        {getJRName(jr)}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {candidate.notes && (
                <div>
                  <h4 style={{ margin: '0 0 8px 0', color: '#111827' }}>Notes</h4>
                  <p style={{ 
                    margin: '0', 
                    padding: '12px', 
                    backgroundColor: '#f8f9f5', 
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#6b7280',
                    border: '1px solid rgba(116, 121, 79, 0.1)'
                  }}>
                    {candidate.notes}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Transfer History */}
          <Card 
            title="Transfer History" 
            style={{ 
              border: '1px solid rgba(116, 121, 79, 0.2)',
              borderRadius: '12px'
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <UserOutlined style={{ color: '#74794f' }} />
                <span style={{ fontWeight: '500', color: '#111827' }}>Original JR:</span>
                <a 
                  href={getJRLink(candidate.originalJR)} 
                  style={{ 
                    color: '#74794f', 
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  <LinkOutlined style={{ marginRight: '4px' }} />
                  {getJRName(candidate.originalJR)}
                </a>
              </div>
            </div>
            
            <Timeline
              items={timelineItems}
              style={{ marginTop: '16px' }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}




