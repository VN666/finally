import React from 'react';
import { Plus, ChevronRight, FileText } from 'lucide-react';
import { MOCK_INSPECTIONS } from '../constants';

const InspectionList: React.FC = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex justify-between items-center">
        <h1 className="text-lg font-bold">Inspections</h1>
        <button className="flex items-center space-x-1 text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full text-sm font-medium">
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Group: Active / Pending */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pending Tasks</h2>
          <div className="space-y-3">
            {MOCK_INSPECTIONS.filter(i => i.status === 'Pending').map(item => (
              <InspectionCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Group: History */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6">History</h2>
          <div className="space-y-3">
            {MOCK_INSPECTIONS.filter(i => i.status === 'Completed').map(item => (
              <InspectionCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InspectionCard: React.FC<{ item: typeof MOCK_INSPECTIONS[0] }> = ({ item }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex justify-between items-center">
    <div className="flex items-start space-x-3">
        <div className="mt-1 bg-blue-50 p-2 rounded-lg text-blue-500">
            <FileText size={20} />
        </div>
        <div>
            <h3 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h3>
            <div className="text-xs text-gray-500 space-y-0.5">
                <p>{item.storeName} • {item.date}</p>
                {item.status === 'Completed' && (
                    <div className="flex items-center text-gray-700 mt-1">
                        <span className="font-semibold text-orange-600 mr-2">{item.score} pts</span>
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">
                            Issues: {item.rectifiedIssues}/{item.totalIssues}
                        </span>
                    </div>
                )}
            </div>
        </div>
    </div>
    
    <div className="flex flex-col items-end">
       {item.status === 'Pending' ? (
           <button className="text-xs bg-orange-500 text-white px-3 py-1.5 rounded-full">Start</button>
       ) : (
           <ChevronRight className="text-gray-300 w-5 h-5" />
       )}
    </div>
  </div>
);

export default InspectionList;
