import React from 'react';
import { Timeline, Tag, Card } from 'antd';
import { UserOutlined, CopyOutlined, ArrowRightOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Candidate, TransferRecord } from '@/lib/types';

interface CandidateJourneyProps {
  candidate: Candidate;
}

const CandidateJourney: React.FC<CandidateJourneyProps> = ({ candidate }) => {
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  // Create timeline items
  const timelineItems = [
    {
      dot: <UserOutlined style={{ color: '#74794f' }} />,
      children: (
        <div>
          <h4 style={{ margin: '0 0 4px 0', color: '#111827' }}>Applied</h4>
          <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6b7280' }}>
            Applied to <strong>{getJRName(candidate.originalJR)}</strong>
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
                From <strong>{getJRName(transfer.fromJR)}</strong> to <strong>{getJRName(transfer.toJR)}</strong>
              </>
            ) : (
              <>
                Copied to <strong>{getJRName(transfer.toJR)}</strong>
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
    <Card 
      title="Candidate Journey" 
      size="small"
      style={{ 
        marginTop: '16px',
        border: '1px solid rgba(116, 121, 79, 0.2)',
        borderRadius: '8px'
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <UserOutlined style={{ color: '#74794f' }} />
          <span style={{ fontWeight: '500', color: '#111827' }}>Original JR:</span>
          <Tag color="default">{getJRName(candidate.originalJR)}</Tag>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowRightOutlined style={{ color: '#74794f' }} />
          <span style={{ fontWeight: '500', color: '#111827' }}>Current JRs:</span>
          {candidate.currentJRs.map((jr, index) => (
            <Tag key={index} color="blue">{getJRName(jr)}</Tag>
          ))}
        </div>
      </div>
      
      <Timeline
        items={timelineItems}
        style={{ marginTop: '16px' }}
      />
    </Card>
  );
};

export default CandidateJourney;