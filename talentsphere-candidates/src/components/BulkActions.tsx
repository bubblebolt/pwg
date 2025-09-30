'use client';

import { useState } from 'react';
import { CheckIcon, XMarkIcon, TagIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';

interface BulkActionsProps {
  selectedCandidates: string[];
  onClearSelection: () => void;
  onBulkTag: (tag: string) => void;
  onBulkStatus: (status: string) => void;
  onBulkArchive: () => void;
}

const bulkStatusOptions = [
  { value: 'Blacklisted', label: 'Mark as Blacklisted', color: 'text-red-700 bg-red-100' },
  { value: 'Reviewed', label: 'Mark as Reviewed', color: 'text-blue-700 bg-blue-100' },
  { value: 'Interviewed', label: 'Mark as Interviewed', color: 'text-green-700 bg-green-100' },
];

const commonTags = [
  'Technical Interview',
  'Phone Screen',
  'Rejected',
  'Shortlisted',
  'Follow Up',
  'Urgent',
];

export default function BulkActions({
  selectedCandidates,
  onClearSelection,
  onBulkTag,
  onBulkStatus,
  onBulkArchive
}: BulkActionsProps) {
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [customTag, setCustomTag] = useState('');

  if (selectedCandidates.length === 0) return null;

  const handleCustomTag = () => {
    if (customTag.trim()) {
      onBulkTag(customTag.trim());
      setCustomTag('');
      setShowTagDropdown(false);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <CheckIcon className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-900">
              {selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? 's' : ''} selected
            </span>
          </div>

          <button
            onClick={onClearSelection}
            className="inline-flex items-center px-3 py-1 text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded-md transition-colors"
          >
            <XMarkIcon className="h-4 w-4 mr-1" />
            Clear
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Bulk Tag */}
          <div className="relative">
            <button
              onClick={() => setShowTagDropdown(!showTagDropdown)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <TagIcon className="h-4 w-4 mr-2" />
              Add Tag
            </button>
            {showTagDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="p-3">
                  <div className="space-y-2">
                    {commonTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          onBulkTag(tag);
                          setShowTagDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-3 pt-3">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleCustomTag()}
                        placeholder="Custom tag..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={handleCustomTag}
                        className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bulk Status */}
          <div className="relative">
            <button
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Change Status
            </button>
            {showStatusDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  {bulkStatusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onBulkStatus(option.value);
                        setShowStatusDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bulk Archive */}
          <button
            onClick={onBulkArchive}
            className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <ArchiveBoxIcon className="h-4 w-4 mr-2" />
            Archive
          </button>
        </div>
      </div>
    </div>
  );
}
