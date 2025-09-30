import { Candidate } from './types';

const API_BASE_URL = '/api';

export class CandidateAPI {
  static async getAllCandidates(): Promise<Candidate[]> {
    const response = await fetch(`${API_BASE_URL}/candidates`);
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch candidates');
    }
    
    return result.data;
  }

  static async getCandidate(id: string): Promise<Candidate> {
    const response = await fetch(`${API_BASE_URL}/candidates/${id}`);
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch candidate');
    }
    
    return result.data;
  }

  static async updateCandidate(id: string, data: Partial<Candidate>): Promise<Candidate> {
    const response = await fetch(`${API_BASE_URL}/candidates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to update candidate');
    }
    
    return result.data;
  }

  static async updateCandidateTags(id: string, tags: string[]): Promise<Candidate> {
    const response = await fetch(`${API_BASE_URL}/candidates/${id}/tags`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tags }),
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to update candidate tags');
    }
    
    return result.data;
  }

  static async deleteCandidate(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/candidates/${id}`, {
      method: 'DELETE',
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to delete candidate');
    }
  }

  static async createCandidate(data: Omit<Candidate, 'id'>): Promise<Candidate> {
    const response = await fetch(`${API_BASE_URL}/candidates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create candidate');
    }
    
    return result.data;
  }
}
