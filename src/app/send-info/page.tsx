'use client';

import React from 'react';
import { SendOutlined } from '@ant-design/icons';

export default function SendInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SendOutlined style={{ fontSize: '32px', color: '#10b981' }} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Send Candidate Information
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Share candidate details and application forms with stakeholders and team members
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                This feature will allow you to:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-left">
                  <h3 className="font-medium text-gray-900 mb-2">Share Candidate Profiles</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Send candidate information via email</li>
                    <li>• Generate shareable links</li>
                    <li>• Control access permissions</li>
                  </ul>
                </div>
                
                <div className="text-left">
                  <h3 className="font-medium text-gray-900 mb-2">Application Forms</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Distribute application forms</li>
                    <li>• Track form submissions</li>
                    <li>• Manage form templates</li>
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
