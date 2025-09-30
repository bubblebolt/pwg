'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Candidate } from '@/lib/types';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ChartBarIcon, DocumentTextIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import ActionMenu from './ActionMenu';

interface CandidateRowProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (candidateId: string) => void;
  onUpdateTags: (candidateId: string, tags: string[]) => void;
  onUpdateNotes: (candidateId: string, notes: string) => void;
  onViewNotes: (candidate: Candidate) => void;
  onViewBlacklist: (candidate: Candidate) => void;
  onEditTags: (candidate: Candidate) => void;
  onTransfer: (candidate: Candidate) => void;
}

export default function CandidateRow({
  candidate,
  isSelected,
  onSelect,
  onUpdateTags,
  onUpdateNotes,
  onViewNotes,
  onViewBlacklist,
  onEditTags,
  onTransfer
}: CandidateRowProps) {
  const [showActions, setShowActions] = useState(false);

  const formatAppliedDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays < 7) {
      return `${diffInDays}d ago${format(date, 'MMM d, yyyy')}`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks}w ago${format(date, 'MMM d, yyyy')}`;
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-gray-100 text-gray-800 border-gray-200';
    if (status.includes('Blacklisted')) return 'bg-red-100 text-red-800 border-red-200';
    if (status.includes('Multi-role')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (status.includes('Re-applied')) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <tr
      className={`hover:bg-gray-50 transition-colors duration-150 ${
        isSelected ? 'bg-blue-50 border-blue-200' : ''
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Checkbox */}
      <td className="px-8 py-5 whitespace-nowrap">
        <div className="flex items-center">
          <input
            id={`select-${candidate.id}`}
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(candidate.id)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            aria-label={`Select ${candidate.name}`}
          />
        </div>
      </td>

      {/* Candidate Info */}
      <td className="px-8 py-5 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-semibold text-gray-900">
              {candidate.name}
            </div>
            <div className="text-sm text-gray-500">
              {candidate.email}
            </div>
          </div>
        </div>
      </td>

      {/* Applied Date */}
      <td className="px-8 py-5 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {formatAppliedDate(candidate.appliedDate)}
        </div>
      </td>

      {/* Status */}
      <td className="px-8 py-5 whitespace-nowrap">
        {candidate.status ? (
          <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full shadow-sm border ${getStatusColor(candidate.status)}`}>
            {candidate.status}
          </span>
        ) : (
          <span className="text-sm text-gray-400 font-medium">—</span>
        )}
      </td>

      {/* Tags */}
      <td className="px-8 py-5 whitespace-nowrap">
        {candidate.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {candidate.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200"
              >
                {tag}
              </span>
            ))}
            {candidate.tags.length > 2 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                +{candidate.tags.length - 2}
              </span>
            )}
            <button
              onClick={() => {
                // Handle tag editing - could open modal
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium ml-1"
            >
              Edit
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              // Handle tag adding - could open modal
            }}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            + Add tags
          </button>
        )}
      </td>

      {/* Actions */}
      <td className="px-8 py-5 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-2">
          {/* View Report Button */}
          <button className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150">
            <ChartBarIcon className="h-4 w-4 mr-2" />
            View Report
          </button>

          {/* CV Button with Badge */}
          <div className="relative">
            <button className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-150">
              <DocumentTextIcon className="h-4 w-4 mr-2" />
              CV
            </button>
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500 rounded-full">
              {candidate.cvVersion}
            </span>
          </div>

          {/* Transfer Button */}
          <button
            onClick={() => onTransfer(candidate)}
            className="inline-flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-150"
          >
            <ArrowRightIcon className="h-4 w-4 mr-2" />
            Transfer
          </button>

          {/* Action Menu */}
          <ActionMenu
            candidate={candidate}
            onViewNotes={() => onViewNotes(candidate)}
            onViewBlacklist={() => onViewBlacklist(candidate)}
            onEditTags={() => onEditTags(candidate)}
          />
        </div>
      </td>
    </tr>
  );
}
