import React, { useState } from 'react';
import { MOCK_RECORDS } from '../constants';
import { Droplet, FileCheck, Wrench, AlertCircle, Plus } from 'lucide-react';

const Records: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Ledger' | 'Certificates'>('Ledger');

  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-lg font-bold text-center mb-4">Operational Records</h1>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition ${activeTab === 'Ledger' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
            onClick={() => setActiveTab('Ledger')}
          >
            Equipment Logs
          </button>
          <button 
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition ${activeTab === 'Certificates' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
            onClick={() => setActiveTab('Certificates')}
          >
            Health Certs
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {activeTab === 'Ledger' ? (
           <>
              <div className="grid grid-cols-3 gap-3 mb-4">
                  <RecordCategoryButton icon={<Droplet />} label="Waste Oil" />
                  <RecordCategoryButton icon={<Wrench />} label="Filter Replace" />
                  <RecordCategoryButton icon={<FileCheck />} label="Ice Machine" />
              </div>
              <h3 className="font-bold text-gray-700 text-sm mb-2">Recent Logs</h3>
              <div className="space-y-3">
                  {MOCK_RECORDS.filter(r => r.type !== 'Health Cert').map(record => (
                      <div key={record.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                          <div>
                              <p className="font-bold text-sm text-gray-800">{record.type} Log</p>
                              <p className="text-xs text-gray-500">{record.date} • {record.details}</p>
                          </div>
                          {record.status !== 'Normal' && (
                              <span className="bg-red-100 text-red-600 text-[10px] px-2 py-1 rounded-full font-bold">
                                  {record.status}
                              </span>
                          )}
                      </div>
                  ))}
              </div>
           </>
        ) : (
           <>
             <div className="flex justify-between items-center mb-2">
                 <h3 className="font-bold text-gray-700 text-sm">Staff Certificates</h3>
                 <button className="flex items-center text-xs text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg">
                     <Plus className="w-3 h-3 mr-1" /> Add New
                 </button>
             </div>
             
             {/* Alert for expired */}
             <div className="bg-red-50 border border-red-100 rounded-lg p-3 flex items-start mb-4">
                 <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                 <div>
                     <p className="text-sm font-bold text-red-700">Action Required</p>
                     <p className="text-xs text-red-600">2 employees have expiring health certificates.</p>
                 </div>
             </div>

             <div className="space-y-3">
                 <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold">JD</div>
                         <div>
                             <p className="font-bold text-sm text-gray-800">John Doe</p>
                             <p className="text-xs text-red-500 font-medium">Expired: Jan 10, 2023</p>
                         </div>
                     </div>
                     <button className="text-xs border border-gray-300 px-3 py-1 rounded">Upload</button>
                 </div>
                 
                 <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                     <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold">AS</div>
                         <div>
                             <p className="font-bold text-sm text-gray-800">Alice Smith</p>
                             <p className="text-xs text-green-600">Valid until: Dec 2024</p>
                         </div>
                     </div>
                     <button className="text-xs border border-gray-300 px-3 py-1 rounded">View</button>
                 </div>
             </div>
           </>
        )}
      </div>
    </div>
  );
};

const RecordCategoryButton: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
    <button className="flex flex-col items-center justify-center bg-white p-3 rounded-xl border border-gray-200 shadow-sm active:bg-gray-50">
        <div className="text-orange-500 mb-1">{icon}</div>
        <span className="text-[10px] text-gray-600 font-medium text-center">{label}</span>
    </button>
);

export default Records;
