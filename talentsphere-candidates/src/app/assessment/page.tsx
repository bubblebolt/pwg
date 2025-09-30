'use client';

import React from 'react';
import { EditOutlined } from '@ant-design/icons';

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <EditOutlined style={{ fontSize: '32px', color: '#f97316' }} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Take Assessment
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Conduct competency assessments and evaluate candidates through structured interview processes
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                This feature will provide:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-left">
                  <h3 className="font-medium text-gray-900 mb-2">Competency Assessments</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Structured evaluation forms</li>
                    <li>• Rating scales and criteria</li>
                    <li>• Automated scoring</li>
                  </ul>
                </div>
                
                <div className="text-left">
                  <h3 className="font-medium text-gray-900 mb-2">Interview Management</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Schedule interviews</li>
                    <li>• Record interview notes</li>
                    <li>• Generate assessment reports</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
