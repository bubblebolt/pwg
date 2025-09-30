'use client';

import React from 'react';
import { Modal, Button, Card, Typography, Space } from 'antd';
import { PlusOutlined, ThunderboltOutlined, ClockCircleOutlined, CloseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface JRModeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFullJR: () => void;
  onSelectQuickAssessment: () => void;
}

export default function JRModeSelectionModal({ 
  isOpen, 
  onClose, 
  onSelectFullJR, 
  onSelectQuickAssessment 
}: JRModeSelectionModalProps) {
  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
      closable={false}
      styles={{
        body: {
          padding: '0'
        }
      }}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 24px 0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <Title level={3} style={{ margin: 0, marginBottom: '8px', fontSize: '20px', color: '#111827' }}>
              Choose Your Creation Mode
            </Title>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              Select the mode that best fits your needs
            </Text>
          </div>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px'
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {/* Full JR Mode */}
            <Card
              hoverable
              onClick={onSelectFullJR}
              style={{
                flex: 1,
                border: '2px solid rgba(116, 121, 79, 0.2)',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: '#fafafa'
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#74794f',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <PlusOutlined style={{ fontSize: '24px', color: 'white' }} />
                </div>
                <Title level={3} style={{ margin: 0, marginBottom: '8px', fontSize: '20px', color: '#111827' }}>
                  Full Job Requisition
                </Title>
                <Text type="secondary" style={{ fontSize: '14px', lineHeight: '1.5' }}>
                  สร้าง Job Requisition แบบเต็มรูปแบบ<br/>
                  สำหรับการเปิดรับสมัครงานจริง
                </Text>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <Text strong style={{ fontSize: '14px', color: '#111827', display: 'block', marginBottom: '12px' }}>
                  กระบวนการ 5 ขั้นตอน:
                </Text>
                <ul style={{ fontSize: '13px', color: '#6b7280', margin: '0', paddingLeft: '16px', lineHeight: '1.6' }}>
                  <li>เลือก Role Profile</li>
                  <li>กรอกข้อมูลงาน</li>
                  <li>ตั้งค่าการประเมิน</li>
                  <li>ออกแบบ Rubric</li>
                  <li>ตรวจสอบและอนุมัติ</li>
                </ul>
              </div>
              
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#f0f0f0', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <Text style={{ fontSize: '12px', color: '#666' }}>
                  เหมาะสำหรับ: การเปิดรับสมัครงานจริง<br/>
                  ต้องการการอนุมัติจากผู้บริหาร
                </Text>
              </div>
            </Card>

            {/* Quick Assessment Mode */}
            <Card
              hoverable
              onClick={onSelectQuickAssessment}
              style={{
                flex: 1,
                border: '2px solid rgba(24, 144, 255, 0.3)',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: '#f6f8ff',
                position: 'relative'
              }}
              bodyStyle={{ padding: '24px' }}
            >
              <div style={{
                position: 'absolute',
                top: '-8px',
                right: '16px',
                backgroundColor: '#1890ff',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}>
                NEW
              </div>
              
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#1890ff',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <ThunderboltOutlined style={{ fontSize: '24px', color: 'white' }} />
                </div>
                <Title level={3} style={{ margin: 0, marginBottom: '8px', fontSize: '20px', color: '#111827' }}>
                  Quick Assessment
                </Title>
                <Text type="secondary" style={{ fontSize: '14px', lineHeight: '1.5' }}>
                  สร้าง Assessment แบบรวดเร็ว<br/>
                  สำหรับการประเมินผู้สมัครเท่านั้น
                </Text>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <Text strong style={{ fontSize: '14px', color: '#111827', display: 'block', marginBottom: '12px' }}>
                  กระบวนการ 4 ขั้นตอน:
                </Text>
                <ul style={{ fontSize: '13px', color: '#6b7280', margin: '0', paddingLeft: '16px', lineHeight: '1.6' }}>
                  <li>ตั้งค่าพื้นฐาน</li>
                  <li>เลือก Competency</li>
                  <li>ตรวจสอบคำถาม</li>
                  <li>สร้างและใช้งาน</li>
                </ul>
              </div>
              
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#e6f7ff', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <Text style={{ fontSize: '12px', color: '#1890ff' }}>
                  เหมาะสำหรับ: การประเมินผู้สมัคร<br/>
                  ใช้งานได้ทันที ไม่ต้องรออนุมัติ
                </Text>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Modal>
  );
}
