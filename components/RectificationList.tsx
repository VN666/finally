import React, { useState } from 'react';
import { Filter, Search, ChevronDown, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { MOCK_RECTIFICATIONS } from '../constants';
import { RectificationOrder, UserRole } from '../types';

interface RectificationListProps {
  role: UserRole;
}

const RectificationList: React.FC<RectificationListProps> = ({ role }) => {
  const [activeTab, setActiveTab] = useState<'Pending' | 'Review' | 'Completed' | 'All'>('All');

  const getStatusColor = (status: RectificationOrder['status']) => {
    switch (status) {
      case 'Pending Rectification': return 'text-red-500 bg-red-50 border-red-100';
      case 'Pending Review': return 'text-blue-500 bg-blue-50 border-blue-100';
      case 'Completed': return 'text-green-500 bg-green-50 border-green-100';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const filteredList = MOCK_RECTIFICATIONS.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Pending') return item.status === 'Pending Rectification';
    if (activeTab === 'Review') return item.status === 'Pending Review';
    if (activeTab === 'Completed') return item.status === 'Completed';
    return true;
  });

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-lg font-bold text-center mb-4">Rectification Orders</h1>
        
        {/* Search & Filter */}
        <div className="flex space-x-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search store, issue..." 
              className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <button className="p-2 bg-gray-100 rounded-lg text-gray-600">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-between border-b border-gray-200">
          {['Pending', 'Review', 'Completed', 'All'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-2 text-sm font-medium px-2 ${
                activeTab === tab 
                  ? 'text-orange-500 border-b-2 border-orange-500' 
                  : 'text-gray-500'
              }`}
            >
              {tab === 'Pending' ? 'Rectify' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* List Content */}
      <div className="p-4 space-y-3">
        {filteredList.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-20 text-gray-400">
             <CheckCircle className="w-12 h-12 mb-2 opacity-20" />
             <p>No records found</p>
           </div>
        ) : (
          filteredList.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 active:scale-[0.99] transition-transform duration-100">
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs px-2 py-1 rounded border font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
                <span className="text-xs text-gray-400">{item.date}</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{item.storeName} • {item.source}</p>
              
              <div className="flex justify-end pt-2 border-t border-gray-50">
                {item.status === 'Pending Rectification' && (
                  <button className="text-sm bg-orange-500 text-white px-4 py-1.5 rounded-lg font-medium shadow-sm hover:bg-orange-600">
                    Fix Now
                  </button>
                )}
                {item.status === 'Pending Review' && role === UserRole.AREA_MANAGER && (
                  <button className="text-sm bg-blue-500 text-white px-4 py-1.5 rounded-lg font-medium shadow-sm">
                    Review
                  </button>
                )}
                {item.status === 'Completed' && (
                  <span className="text-sm text-green-600 font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" /> Verified
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RectificationList;
