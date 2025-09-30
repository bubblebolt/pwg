'use client';

import { useState, useRef, useEffect } from 'react';
import { Candidate, JobRequisition } from '@/lib/types';
import { ArrowRightIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface TransferModalProps {
  candidate: Candidate;
  jobRequisitions: JobRequisition[];
  isOpen: boolean;
  onClose: () => void;
  onTransfer: (candidateId: string, toJR: string, action: 'copy' | 'move', notes?: string) => Promise<void>;
}

export default function TransferModal({ 
  candidate, 
  jobRequisitions, 
  isOpen, 
  onClose, 
  onTransfer 
}: TransferModalProps) {
  const [selectedJR, setSelectedJR] = useState('');
  const [transferAction, setTransferAction] = useState<'copy' | 'move'>('copy');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  // Filter out current JRs for the candidate
  const availableJRs = jobRequisitions.filter(jr => 
    jr.status === 'active' && !candidate.currentJRs.includes(jr.id)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClose = () => {
    if (!isLoading) {
      setSelectedJR('');
      setTransferAction('copy');
      setNotes('');
      setError('');
      setShowConfirmation(false);
      onClose();
    }
  };

  const handleTransfer = async () => {
    if (!selectedJR) {
      setError('Please select a Job Requisition');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onTransfer(candidate.id, selectedJR, transferAction, notes);
      handleClose();
    } catch (err) {
      setError('Transfer failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmTransfer = () => {
    setShowConfirmation(true);
  };

  const getActionDescription = () => {
    const selectedJRTitle = jobRequisitions.find(jr => jr.id === selectedJR)?.title || '';
    
    if (transferAction === 'copy') {
      return `Copy ${candidate.name} to ${selectedJRTitle}. The candidate will be available in both positions.`;
    } else {
      return `Move ${candidate.name} to ${selectedJRTitle}. The candidate will be removed from current positions.`;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 border border-gray-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ArrowRightIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Transfer Candidate</h3>
              <p className="text-sm text-gray-500">Move or copy candidate to another Job Requisition</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-150 p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Candidate Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                <p className="text-sm text-gray-500">{candidate.email}</p>
                <p className="text-xs text-gray-400">
                  Current JRs: {candidate.currentJRs.length}
                </p>
              </div>
            </div>
          </div>

          {/* Job Requisition Selection */}
          <div>
            <label htmlFor="jr-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Job Requisition
            </label>
            <select
              id="jr-select"
              value={selectedJR}
              onChange={(e) => setSelectedJR(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            >
              <option value="">Choose a Job Requisition...</option>
              {availableJRs.map((jr) => (
                <option key={jr.id} value={jr.id}>
                  {jr.title} - {jr.department} ({jr.location})
                </option>
              ))}
            </select>
            {availableJRs.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                No available Job Requisitions for transfer.
              </p>
            )}
          </div>

          {/* Transfer Action */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Transfer Action
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="transferAction"
                  value="copy"
                  checked={transferAction === 'copy'}
                  onChange={(e) => setTransferAction(e.target.value as 'copy' | 'move')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  disabled={isLoading}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">Copy</span>
                  </div>
                  <p className="text-sm text-gray-500 ml-5">
                    Candidate will be available in both positions
                  </p>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="transferAction"
                  value="move"
                  checked={transferAction === 'move'}
                  onChange={(e) => setTransferAction(e.target.value as 'copy' | 'move')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  disabled={isLoading}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">Move</span>
                  </div>
                  <p className="text-sm text-gray-500 ml-5">
                    Candidate will be moved to new position only
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="transfer-notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              id="transfer-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this transfer..."
              rows={3}
              className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <XMarkIcon className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Action Description */}
          {selectedJR && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Transfer Summary</h4>
                  <p className="text-sm text-blue-800">{getActionDescription()}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmTransfer}
            disabled={!selectedJR || isLoading}
            className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Transferring...
              </div>
            ) : (
              'Transfer Candidate'
            )}
          </button>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className="absolute inset-0 bg-white bg-opacity-95 rounded-xl flex items-center justify-center">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRightIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Confirm Transfer</h4>
              <p className="text-sm text-gray-600 mb-6 max-w-md">
                {getActionDescription()}
              </p>
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-150 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTransfer}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-150 disabled:opacity-50"
                >
                  {isLoading ? 'Transferring...' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
