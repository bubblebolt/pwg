'use client';

import { useState, useRef, useEffect } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { Candidate } from '@/lib/types';

interface ActionMenuProps {
  candidate: Candidate;
  onViewNotes: () => void;
  onViewBlacklist: () => void;
  onEditTags: () => void;
}

export default function ActionMenu({ candidate, onViewNotes, onViewBlacklist, onEditTags }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      label: 'View Notes',
      onClick: onViewNotes,
      className: 'text-green-700 hover:bg-green-50'
    },
    {
      label: 'Edit Tags',
      onClick: onEditTags,
      className: 'text-blue-700 hover:bg-blue-50'
    }
  ];

  if (candidate.status === 'Blacklisted') {
    menuItems.unshift({
      label: 'View Blacklist',
      onClick: onViewBlacklist,
      className: 'text-red-700 hover:bg-red-50'
    });
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Ellipsis Menu Button with Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-150"
        aria-label="More actions"
      >
        <EllipsisHorizontalIcon className="h-4 w-4" />
      </button>
      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500 rounded-full">
        {candidate.cvVersion}
      </span>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm font-medium ${item.className} transition-colors duration-150`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
