import React, { useState } from 'react';
import { Modal, Tabs, Card, Tag, Badge } from 'antd';
import { 
  SafetyOutlined, 
  FlagOutlined, 
  UserOutlined, 
  CloseOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Candidate } from '@/lib/types';
import CandidateJourney from './CandidateJourney';

interface Candidate360ViewProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
}

const Candidate360View: React.FC<Candidate360ViewProps> = ({ 
  candidate, 
  isOpen, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState('blacklist');

  if (!candidate) return null;

  const getBlacklistRecord = () => {
    if (candidate.status?.includes('Blacklisted')) {
      return {
        reason: candidate.notes || 'Skills Inadequate',
        date: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        blacklistedBy: 'Emma Rodriguez'
      };
    }
    return null;
  };

  const blacklistRecord = getBlacklistRecord();
  const notesCount = candidate.notes ? 1 : 0;

  const blacklistTab = (
    <div style={{ padding: '16px 0' }}>
      {blacklistRecord ? (
        <Card
          style={{
            border: '1px solid #ff4d4f',
            borderRadius: '8px',
            backgroundColor: '#fff2f0'
          }}
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            marginBottom: '16px' 
          }}>
            <SafetyOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />
            <h4 style={{ 
              margin: 0, 
              color: '#a8071a', 
              fontSize: '16px',
              fontWeight: '600'
            }}>
              Blacklist Record
            </h4>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <span style={{ color: '#262626', fontWeight: '500' }}>Reason:</span>
              <span style={{ 
                color: '#a8071a', 
                marginLeft: '8px',
                fontWeight: '500'
              }}>
                {blacklistRecord.reason}
              </span>
            </div>
            <div>
              <span style={{ color: '#262626', fontWeight: '500' }}>Date:</span>
              <span style={{ 
                color: '#a8071a', 
                marginLeft: '8px',
                fontWeight: '500'
              }}>
                {blacklistRecord.date}
              </span>
            </div>
            <div>
              <span style={{ color: '#262626', fontWeight: '500' }}>Blacklisted by:</span>
              <span style={{ 
                color: '#a8071a', 
                marginLeft: '8px',
                fontWeight: '500'
              }}>
                {blacklistRecord.blacklistedBy}
              </span>
            </div>
          </div>
        </Card>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          color: '#8c8c8c'
        }}>
          <SafetyOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
          <p style={{ margin: 0, fontSize: '16px' }}>
            No blacklist records found
          </p>
        </div>
      )}
    </div>
  );

  const notesTab = (
    <div style={{ padding: '16px 0' }}>
      {candidate.notes ? (
        <Card style={{ border: '1px solid #d9d9d9', borderRadius: '8px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            marginBottom: '16px' 
          }}>
            <FlagOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
            <h4 style={{ 
              margin: 0, 
              color: '#262626', 
              fontSize: '16px',
              fontWeight: '600'
            }}>
              Notes
            </h4>
          </div>
          
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#fafafa', 
            borderRadius: '6px',
            fontSize: '14px',
            color: '#595959',
            lineHeight: '1.5'
          }}>
            {candidate.notes}
          </div>
        </Card>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          color: '#8c8c8c'
        }}>
          <FlagOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
          <p style={{ margin: 0, fontSize: '16px' }}>
            No notes available
          </p>
        </div>
      )}
    </div>
  );

  const tabItems = [
    {
      key: 'blacklist',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SafetyOutlined />
          Blacklist & Flags
        </span>
      ),
      children: blacklistTab
    },
    {
      key: 'notes',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FlagOutlined />
          Notes
          {notesCount > 0 && (
            <Badge count={notesCount} size="small" />
          )}
        </span>
      ),
      children: notesTab
    }
  ];

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      closeIcon={<CloseOutlined />}
      style={{ top: 20 }}
    >
      <div>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: '#262626', 
            margin: '0 0 8px 0' 
          }}>
            Candidate 360° View
          </h1>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: 'normal', 
            color: '#262626', 
            margin: 0 
          }}>
            {candidate.name}
          </h2>
        </div>

        {/* Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          style={{ marginBottom: '16px' }}
        />

        {/* Candidate Journey */}
        <CandidateJourney candidate={candidate} />
      </div>
    </Modal>
  );
};

export default Candidate360View;
