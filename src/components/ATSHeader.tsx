'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface ATSHeaderProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  onExport: () => void;
  totalCandidates: number;
  filteredCount: number;
}

export interface FilterOptions {
  status: string;
  tags: string[];
  dateRange: {
    start?: Date;
    end?: Date;
  };
  sortBy: 'name' | 'date' | 'status';
  sortOrder: 'asc' | 'desc';
}

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'Blacklisted', label: 'Blacklisted' },
  { value: 'Multi-role', label: 'Multi-role' },
  { value: 'Re-applied', label: 'Re-applied' },
];

const sortOptions = [
  { value: 'date', label: 'Applied Date' },
  { value: 'name', label: 'Name' },
  { value: 'status', label: 'Status' },
];

export default function ATSHeader({ onSearch, onFilter, onExport, totalCandidates, filteredCount }: ATSHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    tags: [],
    dateRange: {},
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      status: '',
      tags: [],
      dateRange: {},
      sortBy: 'date',
      sortOrder: 'desc'
    };
    setFilters(defaultFilters);
    onFilter(defaultFilters);
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      {/* Header Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filteredCount}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalCandidates}</span> candidates
          </div>
          {filteredCount !== totalCandidates && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
        <button
          onClick={onExport}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search candidates by name or email..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            showFilters
              ? 'border-blue-500 text-blue-700 bg-blue-50'
              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
          }`}
        >
          <FunnelIcon className="h-4 w-4 mr-2" />
          Filters
          {Object.values(filters).some(value =>
            Array.isArray(value) ? value.length > 0 : value !== '' && value !== 'date' && value !== 'desc'
          ) && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Active
            </span>
          )}
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status-filter"
                value={filters.status}
                onChange={(e) => handleFilterChange({ status: e.target.value })}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label htmlFor="sort-by-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort-by-filter"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value as FilterOptions['sortBy'] })}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label htmlFor="sort-order-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Order
              </label>
              <select
                id="sort-order-filter"
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange({ sortOrder: e.target.value as FilterOptions['sortOrder'] })}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>

            {/* Quick Actions */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
