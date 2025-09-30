'use client';

import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Input, Button, Tag, Space, Typography, Card, Row, Col, Dropdown, Menu, Radio, Select, Spin, Divider, Alert, Badge, Progress, Tooltip } from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  CalendarOutlined, 
  MoreOutlined, 
  EyeOutlined, 
  FileTextOutlined, 
  ExclamationCircleOutlined, 
  CopyOutlined, 
  ArrowRightOutlined,
  ProfileOutlined,
  RocketOutlined,
  SearchOutlined,
  FilterOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { candidates, jobRequisitions } from '@/lib/data';
import { Candidate, JobRequisition, TransferRecord } from '@/lib/types';
import QuickRoleProfileAgent from '@/components/QuickRoleProfileAgent';

const { Title, Text } = Typography;

export default function CandidatesPage() {
  const [candidatesData, setCandidatesData] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isBlacklistModalOpen, setIsBlacklistModalOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedTransferAction, setSelectedTransferAction] = useState<'copy' | 'move' | null>(null);
  const [isQuickRoleAgentOpen, setIsQuickRoleAgentOpen] = useState(false);

  // Form instances
  const [tagForm] = Form.useForm();
  const [notesForm] = Form.useForm();
  const [blacklistForm] = Form.useForm();
  const [duplicateForm] = Form.useForm();
  const [transferForm] = Form.useForm();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setCandidatesData(candidates);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatAppliedDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    if (diffInDays < 14) return '1w ago';
    if (diffInDays < 21) return '2w ago';
    if (diffInDays < 28) return '3w ago';
    if (diffInDays < 35) return '4w ago';
    
    return format(date, 'MMM d, yyyy');
  };

  const handleAddTags = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsTagModalOpen(true);
    tagForm.setFieldsValue({ tags: candidate.tags || [] });
  };

  const handleViewReport = (candidate: Candidate) => {
    toast.success(`Opening report for ${candidate.name}`);
  };

  const handleViewCV = (candidate: Candidate) => {
    toast.success(`Opening CV for ${candidate.name}`);
  };

  const handleViewNotes = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsNotesModalOpen(true);
    notesForm.setFieldsValue({ notes: candidate.notes || '' });
  };

  const handleBlacklist = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsBlacklistModalOpen(true);
  };

  const handleDuplicate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDuplicateModalOpen(true);
  };

  const handleTransfer = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsTransferModalOpen(true);
    setSelectedTransferAction(null);
  };

  const handleViewProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsProfileModalOpen(true);
  };

  const handleTagSubmit = () => {
    const values = tagForm.getFieldsValue();
    if (selectedCandidate) {
      const updatedCandidates = candidatesData.map(candidate =>
        candidate.id === selectedCandidate.id
          ? { ...candidate, tags: values.tags }
          : candidate
      );
      setCandidatesData(updatedCandidates);
      toast.success('Tags updated successfully!');
    }
    setIsTagModalOpen(false);
  };

  const handleNotesSubmit = () => {
    const values = notesForm.getFieldsValue();
    if (selectedCandidate) {
      const updatedCandidates = candidatesData.map(candidate =>
        candidate.id === selectedCandidate.id
          ? { ...candidate, notes: values.notes }
          : candidate
      );
      setCandidatesData(updatedCandidates);
      toast.success('Notes updated successfully!');
    }
    setIsNotesModalOpen(false);
  };

  const handleBlacklistSubmit = () => {
    const values = blacklistForm.getFieldsValue();
    if (selectedCandidate) {
      const updatedCandidates = candidatesData.map(candidate =>
        candidate.id === selectedCandidate.id
          ? { ...candidate, status: 'blacklisted', blacklistReason: values.reason }
          : candidate
      );
      setCandidatesData(updatedCandidates);
      toast.success('Candidate blacklisted successfully!');
    }
    setIsBlacklistModalOpen(false);
  };

  const handleDuplicateSubmit = () => {
    const values = duplicateForm.getFieldsValue();
    if (selectedCandidate) {
      const newCandidate: Candidate = {
        ...selectedCandidate,
        id: Date.now().toString(),
        name: `${selectedCandidate.name} (Copy)`,
        email: `${selectedCandidate.email.split('@')[0]}+copy@${selectedCandidate.email.split('@')[1]}`,
        appliedDate: new Date(),
        status: 'applied',
        tags: [...(selectedCandidate.tags || []), 'duplicate'],
        notes: `Duplicated from ${selectedCandidate.name} - ${values.reason}`
      };
      setCandidatesData([...candidatesData, newCandidate]);
      toast.success('Candidate duplicated successfully!');
    }
    setIsDuplicateModalOpen(false);
  };

  const handleTransferSubmit = () => {
    const values = transferForm.getFieldsValue();
    if (selectedCandidate && selectedTransferAction) {
      const transferRecord: TransferRecord = {
        id: Date.now().toString(),
        candidateId: selectedCandidate.id,
        fromJR: selectedCandidate.originalJR,
        toJR: values.targetJR,
        action: selectedTransferAction,
        timestamp: new Date(),
        performedBy: 'Current User',
        notes: values.notes
      };

      const updatedCandidates = candidatesData.map(candidate =>
        candidate.id === selectedCandidate.id
          ? {
              ...candidate,
              originalJR: selectedTransferAction === 'move' ? values.targetJR : candidate.originalJR,
              currentJRs: selectedTransferAction === 'copy' 
                ? [...(candidate.currentJRs || []), values.targetJR]
                : [values.targetJR],
              transferHistory: [...(candidate.transferHistory || []), transferRecord]
            }
          : candidate
      );
      setCandidatesData(updatedCandidates);
      toast.success(`Candidate ${selectedTransferAction === 'copy' ? 'copied' : 'moved'} successfully!`);
    }
    setIsTransferModalOpen(false);
    setSelectedTransferAction(null);
  };

  const handleQuickRoleComplete = (profile: any) => {
    console.log('Role Profile Generated:', profile);
    toast.success(`Role Profile Generated Successfully!\nRole: ${profile.roleTitle}\nCompetencies: ${profile.selectedCompetencies.length}\nEstimated Time: ${profile.estimatedTime} minutes`);
  };

  const getDropdownMenu = (candidate: Candidate) => (
    <Menu>
      <Menu.Item key="notes" icon={<FileTextOutlined />} onClick={() => handleViewNotes(candidate)}>
        Notes
      </Menu.Item>
      <Menu.Item key="duplicate" icon={<CopyOutlined />} onClick={() => handleDuplicate(candidate)}>
        Duplicate
      </Menu.Item>
      <Menu.Item key="blacklist" icon={<ExclamationCircleOutlined />} onClick={() => handleBlacklist(candidate)}>
        Blacklist
      </Menu.Item>
      <Menu.Item key="transfer" icon={<ArrowRightOutlined />} onClick={() => handleTransfer(candidate)}>
        Transfer
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Candidate) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#74794f',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            {text.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: '500', color: '#111827' }}>{text}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Applied',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
      render: (date: Date) => (
        <div style={{ color: '#6b7280', fontSize: '14px' }}>
          {formatAppliedDate(date)}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string | undefined, record: Candidate) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {record.transferHistory?.some(t => t.action === 'copy') && (
            <Tooltip title="Copied to other JR">
              <CopyOutlined style={{ color: '#52c41a', fontSize: '12px' }} />
            </Tooltip>
          )}
          {record.transferHistory?.some(t => t.action === 'move') && (
            <Tooltip title="Moved from other JR">
              <ArrowRightOutlined style={{ color: '#1890ff', fontSize: '12px' }} />
            </Tooltip>
          )}
          <Tag color={status === 'applied' ? 'blue' : status === 'blacklisted' ? 'red' : 'default'}>
            {status || 'Applied'}
          </Tag>
        </div>
      ),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {tags?.map((tag, index) => (
            <Tag key={index} color="green" style={{ fontSize: '11px' }}>
              {tag}
            </Tag>
          )) || <span style={{ color: '#9ca3af', fontSize: '12px' }}>No tags</span>}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Candidate) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewReport(record)}
            style={{ color: '#74794f' }}
          >
            View Report
          </Button>
          <Button
            type="text"
            icon={<FileTextOutlined />}
            onClick={() => handleViewCV(record)}
            style={{ color: '#74794f' }}
          >
            CV
          </Button>
          <Dropdown overlay={getDropdownMenu(record)} trigger={['click']}>
            <Button
              type="text"
              icon={<MoreOutlined />}
              style={{ color: '#74794f' }}
            >
              More
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f8f9f5'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Spin size="large" />
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9f5' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '32px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <Title level={1} style={{ margin: '0 0 8px 0', color: '#111827' }}>
                Candidate Management
              </Title>
              <div style={{ width: '60px', height: '4px', backgroundColor: '#74794f', borderRadius: '2px' }}></div>
            </div>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsQuickRoleAgentOpen(true)}
                style={{
                  backgroundColor: '#74794f',
                  borderColor: '#74794f',
                  fontWeight: '600'
                }}
              >
                Quick Role Profile
              </Button>
            </Space>
          </div>
          
          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}
          >
            <Input
              placeholder="Search candidates..."
              prefix={<SearchOutlined style={{ color: '#9ca3af' }} />}
              style={{ flex: 1, maxWidth: '300px' }}
            />
            <Button icon={<FilterOutlined />}>
              Filter
            </Button>
            <Button>
              Export
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginBottom: '24px' }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card style={{ textAlign: 'center', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
                  {candidatesData.length}
                </div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>Total Candidates</div>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card style={{ textAlign: 'center', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a', marginBottom: '4px' }}>
                  {candidatesData.filter(c => c.status === 'applied').length}
                </div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>Active</div>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card style={{ textAlign: 'center', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4d4f', marginBottom: '4px' }}>
                  {candidatesData.filter(c => c.status === 'blacklisted').length}
                </div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>Blacklisted</div>
              </Card>
            </Col>
          </Row>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
            <Table
              columns={columns}
              dataSource={candidatesData}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} candidates`,
              }}
              style={{ marginTop: '16px' }}
            />
          </Card>
        </motion.div>
      </div>

      {/* Modals */}
      <Modal
        title="Add Tags"
        open={isTagModalOpen}
        onCancel={() => setIsTagModalOpen(false)}
        onOk={handleTagSubmit}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={tagForm} layout="vertical">
          <Form.Item
            name="tags"
            label="Tags"
            rules={[{ required: true, message: 'Please enter at least one tag' }]}
          >
            <Select
              mode="tags"
              placeholder="Enter tags"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Notes"
        open={isNotesModalOpen}
        onCancel={() => setIsNotesModalOpen(false)}
        onOk={handleNotesSubmit}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={notesForm} layout="vertical">
          <Form.Item
            name="notes"
            label="Notes"
          >
            <Input.TextArea rows={4} placeholder="Enter notes about this candidate" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Blacklist Candidate"
        open={isBlacklistModalOpen}
        onCancel={() => setIsBlacklistModalOpen(false)}
        onOk={handleBlacklistSubmit}
        okText="Blacklist"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <Form form={blacklistForm} layout="vertical">
          <Form.Item
            name="reason"
            label="Reason for Blacklisting"
            rules={[{ required: true, message: 'Please provide a reason' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter reason for blacklisting" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Duplicate Candidate"
        open={isDuplicateModalOpen}
        onCancel={() => setIsDuplicateModalOpen(false)}
        onOk={handleDuplicateSubmit}
        okText="Duplicate"
        cancelText="Cancel"
      >
        <Form form={duplicateForm} layout="vertical">
          <Form.Item
            name="reason"
            label="Reason for Duplication"
            rules={[{ required: true, message: 'Please provide a reason' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter reason for duplication" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Transfer Candidate"
        open={isTransferModalOpen}
        onCancel={() => {
          setIsTransferModalOpen(false);
          setSelectedTransferAction(null);
        }}
        onOk={handleTransferSubmit}
        okText="Transfer"
        cancelText="Cancel"
        okButtonProps={{ disabled: !selectedTransferAction }}
        width={600}
      >
        <div style={{ marginBottom: '24px' }}>
          <Text strong>Transfer Action:</Text>
          <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
            <div
              onClick={() => setSelectedTransferAction('copy')}
              style={{
                flex: 1,
                padding: '16px',
                border: selectedTransferAction === 'copy' ? '2px solid #52c41a' : '2px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: selectedTransferAction === 'copy' ? '#f6ffed' : 'white',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CopyOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
                <Text strong>Copy</Text>
              </div>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Candidate will be available in multiple Job Requisitions
              </Text>
            </div>
            <div
              onClick={() => setSelectedTransferAction('move')}
              style={{
                flex: 1,
                padding: '16px',
                border: selectedTransferAction === 'move' ? '2px solid #1890ff' : '2px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: selectedTransferAction === 'move' ? '#f0f9ff' : 'white',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <ArrowRightOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
                <Text strong>Move</Text>
              </div>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Candidate will be moved to a new Job Requisition
              </Text>
            </div>
          </div>
        </div>

        {selectedTransferAction && (
          <Form form={transferForm} layout="vertical">
            <Form.Item
              name="targetJR"
              label="Target Job Requisition"
              rules={[{ required: true, message: 'Please select target JR' }]}
            >
              <Select placeholder="Select target Job Requisition">
                {jobRequisitions.map(jr => (
                  <Select.Option key={jr.id} value={jr.title}>
                    {jr.title} - {jr.department}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {selectedCandidate && (
              <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                <Text strong>Original Job Requisition:</Text>
                <div style={{ marginTop: '4px' }}>
                  {selectedCandidate.originalJR || 'Not specified'}
                </div>
                {selectedCandidate.currentJRs && selectedCandidate.currentJRs.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <Text strong>Current JRs:</Text>
                    <div style={{ marginTop: '4px' }}>
                      {selectedCandidate.currentJRs.join(', ')}
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedCandidate && selectedCandidate.transferHistory && selectedCandidate.transferHistory.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <Text strong>Transfer History:</Text>
                <div style={{ 
                  maxHeight: '120px', 
                  overflowY: 'auto', 
                  marginTop: '8px',
                  padding: '8px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px'
                }}>
                  {selectedCandidate.transferHistory.map((transfer, index) => (
                    <div key={index} style={{ 
                      padding: '8px', 
                      borderBottom: index < selectedCandidate.transferHistory!.length - 1 ? '1px solid #e5e7eb' : 'none',
                      fontSize: '12px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '500' }}>
                          {transfer.action === 'copy' ? 'Copied' : 'Moved'} to {transfer.toJR}
                        </span>
                        <span style={{ color: '#6b7280' }}>
                          {format(transfer.timestamp, 'MMM d, yyyy')}
                        </span>
                      </div>
                      {transfer.fromJR && (
                        <div style={{ color: '#6b7280', marginTop: '2px' }}>
                          From: {transfer.fromJR}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Form>
        )}
      </Modal>

      <Modal
        title="Candidate Profile"
        open={isProfileModalOpen}
        onCancel={() => setIsProfileModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsProfileModalOpen(false)}>
            Close
          </Button>
        ]}
        width={800}
      >
        {selectedCandidate && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#74794f',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: '600'
              }}>
                {selectedCandidate.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <Title level={3} style={{ margin: '0 0 4px 0' }}>{selectedCandidate.name}</Title>
                <Text type="secondary">{selectedCandidate.email}</Text>
              </div>
            </div>
            
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Basic Information" size="small">
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>Applied Date:</Text> {format(selectedCandidate.appliedDate, 'MMM d, yyyy')}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>Status:</Text> 
                    <Tag color={selectedCandidate.status === 'applied' ? 'blue' : 'red'} style={{ marginLeft: '8px' }}>
                      {selectedCandidate.status || 'Applied'}
                    </Tag>
                  </div>
                  <div>
                    <Text strong>Tags:</Text>
                    <div style={{ marginTop: '4px' }}>
                      {selectedCandidate.tags?.map((tag, index) => (
                        <Tag key={index} color="green" style={{ marginBottom: '4px' }}>
                          {tag}
                        </Tag>
                      )) || <Text type="secondary">No tags</Text>}
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Job Requisition Info" size="small">
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>Original JR:</Text> {selectedCandidate.originalJR || 'Not specified'}
                  </div>
                  {selectedCandidate.currentJRs && selectedCandidate.currentJRs.length > 0 && (
                    <div style={{ marginBottom: '8px' }}>
                      <Text strong>Current JRs:</Text>
                      <div style={{ marginTop: '4px' }}>
                        {selectedCandidate.currentJRs.map((jr, index) => (
                          <Tag key={index} color="blue" style={{ marginBottom: '4px' }}>
                            {jr}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </Col>
            </Row>

            {selectedCandidate.notes && (
              <Card title="Notes" size="small" style={{ marginTop: '16px' }}>
                <Text>{selectedCandidate.notes}</Text>
              </Card>
            )}
          </div>
        )}
      </Modal>

      {/* Quick Role Profile Agent Modal */}
      <QuickRoleProfileAgent
        visible={isQuickRoleAgentOpen}
        onClose={() => setIsQuickRoleAgentOpen(false)}
        onComplete={handleQuickRoleComplete}
      />
    </div>
  );
}