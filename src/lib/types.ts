export interface JobRequisition {
  id: string;
  title: string;
  department: string;
  location: string;
  status: 'active' | 'paused' | 'closed';
}

export interface TransferRecord {
  id: string;
  candidateId: string;
  fromJR?: string;
  toJR: string;
  action: 'copy' | 'move';
  timestamp: Date;
  performedBy: string;
  notes?: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  appliedDate: Date;
  status?: string;
  tags: string[];
  cvVersion: number;
  notes?: string;
  originalJR: string;
  currentJRs: string[];
  transferHistory: TransferRecord[];
}

export type CandidateStatus = 'Blacklisted' | 'Multi-role' | 'Re-applied' | null;

