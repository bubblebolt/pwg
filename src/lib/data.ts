import { Candidate, JobRequisition, TransferRecord } from './types';

export const jobRequisitions: JobRequisition[] = [
  {
    id: 'jr-001',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Bangkok',
    status: 'active'
  },
  {
    id: 'jr-002',
    title: 'Backend Developer',
    department: 'Engineering',
    location: 'Bangkok',
    status: 'active'
  },
  {
    id: 'jr-003',
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Bangkok',
    status: 'active'
  },
  {
    id: 'jr-004',
    title: 'Data Scientist',
    department: 'Analytics',
    location: 'Bangkok',
    status: 'active'
  },
  {
    id: 'jr-005',
    title: 'Product Manager',
    department: 'Product',
    location: 'Bangkok',
    status: 'active'
  },
  {
    id: 'jr-006',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Bangkok',
    status: 'paused'
  }
];

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@gmail.com',
    appliedDate: new Date('2025-09-03'),
    status: undefined,
    tags: [],
    cvVersion: 2,
    notes: 'Strong React experience, good communication skills. Follow up for technical interview.',
    originalJR: 'jr-001',
    currentJRs: ['jr-002'],
    transferHistory: [
      {
        id: 'transfer-5',
        candidateId: '1',
        fromJR: 'jr-001',
        toJR: 'jr-002',
        action: 'move',
        timestamp: new Date('2025-09-20'),
        performedBy: 'Emma Rodriguez',
        notes: 'Moved to backend role due to better fit'
      }
    ]
  },
  {
    id: '2',
    name: 'David Park',
    email: 'david.park@outlook.com',
    appliedDate: new Date('2025-09-03'),
    status: undefined,
    tags: [],
    cvVersion: 1,
    notes: 'Python developer with machine learning background. Consider for data science roles.',
    originalJR: 'jr-004',
    currentJRs: ['jr-004', 'jr-001'],
    transferHistory: [
      {
        id: 'transfer-6',
        candidateId: '2',
        fromJR: undefined,
        toJR: 'jr-001',
        action: 'copy',
        timestamp: new Date('2025-09-21'),
        performedBy: 'John Smith',
        notes: 'Also suitable for frontend development with Python skills'
      }
    ]
  },
  {
    id: '3',
    name: 'Maria Garcia',
    email: 'maria.garcia@yahoo.com',
    appliedDate: new Date('2025-09-03'),
    status: undefined,
    tags: [],
    cvVersion: 2,
    notes: 'UX/UI designer with 5+ years experience. Portfolio looks impressive.',
    originalJR: 'jr-003',
    currentJRs: ['jr-005'],
    transferHistory: [
      {
        id: 'transfer-7',
        candidateId: '3',
        fromJR: 'jr-003',
        toJR: 'jr-005',
        action: 'move',
        timestamp: new Date('2025-09-22'),
        performedBy: 'Lisa Chen',
        notes: 'Moved to product manager role due to strong design and communication skills'
      }
    ]
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.wilson@hotmail.com',
    appliedDate: new Date('2025-09-12'),
    status: 'Blacklisted',
    tags: [],
    cvVersion: 1,
    notes: 'Blacklisted due to previous employment issues. Do not hire.',
    originalJR: 'jr-002',
    currentJRs: ['jr-002'],
    transferHistory: []
  },
  {
    id: '5',
    name: 'Kevin Zhang',
    email: 'kevin.zhang@gmail.com',
    appliedDate: new Date('2025-09-12'),
    status: 'Blacklisted',
    tags: [],
    cvVersion: 1,
    notes: 'Blacklisted for failing background check. References provided false information.',
    originalJR: 'jr-001',
    currentJRs: ['jr-001'],
    transferHistory: []
  },
  {
    id: '6',
    name: 'Alex Rivera',
    email: 'alex.rivera@gmail.com',
    appliedDate: new Date('2025-09-12'),
    status: '3 Multi-role',
    tags: [],
    cvVersion: 2,
    notes: 'Applied for multiple positions. Strong full-stack developer. Consider for senior role.',
    originalJR: 'jr-001',
    currentJRs: ['jr-001', 'jr-002'],
    transferHistory: [
      {
        id: 'transfer-1',
        candidateId: '6',
        fromJR: 'jr-001',
        toJR: 'jr-002',
        action: 'copy',
        timestamp: new Date('2025-09-15'),
        performedBy: 'John Smith',
        notes: 'Strong candidate for backend role as well'
      }
    ]
  },
  {
    id: '7',
    name: 'Jessica Brown',
    email: 'jessica.brown@company.com',
    appliedDate: new Date('2025-09-15'),
    status: 'Blacklisted',
    tags: [],
    cvVersion: 1,
    notes: 'Blacklisted due to poor performance in previous role. Left company under investigation.',
    originalJR: 'jr-005',
    currentJRs: ['jr-005'],
    transferHistory: []
  },
  {
    id: '8',
    name: 'Tom Anderson',
    email: 'tom.anderson@gmail.com',
    appliedDate: new Date('2025-09-14'),
    status: '2 Re-applied',
    tags: [],
    cvVersion: 1,
    notes: 'Re-applied after initial rejection. Skills improved significantly. Worth reconsidering.',
    originalJR: 'jr-001',
    currentJRs: ['jr-001', 'jr-002', 'jr-003'],
    transferHistory: [
      {
        id: 'transfer-8',
        candidateId: '8',
        fromJR: undefined,
        toJR: 'jr-002',
        action: 'copy',
        timestamp: new Date('2025-09-23'),
        performedBy: 'Mike Johnson',
        notes: 'Strong backend skills as well'
      },
      {
        id: 'transfer-9',
        candidateId: '8',
        fromJR: undefined,
        toJR: 'jr-003',
        action: 'copy',
        timestamp: new Date('2025-09-24'),
        performedBy: 'Sarah Wilson',
        notes: 'Has some design experience'
      }
    ]
  },
  {
    id: '9',
    name: 'Rachel Kim',
    email: 'rachel.kim@hotmail.com',
    appliedDate: new Date('2025-09-16'),
    status: '4 Multi-role',
    tags: [],
    cvVersion: 2,
    notes: 'Applied for 4 different positions. Versatile candidate with strong technical background.',
    originalJR: 'jr-001',
    currentJRs: ['jr-001', 'jr-002', 'jr-003', 'jr-004'],
    transferHistory: [
      {
        id: 'transfer-2',
        candidateId: '9',
        fromJR: 'jr-001',
        toJR: 'jr-002',
        action: 'copy',
        timestamp: new Date('2025-09-17'),
        performedBy: 'Jane Doe',
        notes: 'Also suitable for backend development'
      },
      {
        id: 'transfer-3',
        candidateId: '9',
        fromJR: 'jr-001',
        toJR: 'jr-003',
        action: 'copy',
        timestamp: new Date('2025-09-18'),
        performedBy: 'Mike Johnson',
        notes: 'Has design experience'
      },
      {
        id: 'transfer-4',
        candidateId: '9',
        fromJR: 'jr-001',
        toJR: 'jr-004',
        action: 'copy',
        timestamp: new Date('2025-09-19'),
        performedBy: 'Sarah Wilson',
        notes: 'Strong analytical skills'
      }
    ]
  }
];

