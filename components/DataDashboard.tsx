import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CHART_DATA } from '../constants';
import { Download, Calendar } from 'lucide-react';

const DataDashboard: React.FC = () => {
  return (
    <div className="min-h-full bg-gray-50 pb-6">
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex justify-between items-center">
        <h1 className="text-lg font-bold">Analytics</h1>
        <div className="flex space-x-2">
            <button className="p-2 bg-gray-100 rounded-full text-gray-600">
                <Calendar className="w-4 h-4" />
            </button>
            <button className="p-2 bg-gray-100 rounded-full text-gray-600">
                <Download className="w-4 h-4" />
            </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
            <p className="text-xs text-gray-500">Pass Rate</p>
            <p className="text-2xl font-bold text-gray-800">94.5%</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
            <p className="text-xs text-gray-500">Avg Score</p>
            <p className="text-2xl font-bold text-gray-800">88.2</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-orange-500">
            <p className="text-xs text-gray-500">Issues Found</p>
            <p className="text-2xl font-bold text-gray-800">142</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-purple-500">
            <p className="text-xs text-gray-500">Inspections</p>
            <p className="text-2xl font-bold text-gray-800">28</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Problem Distribution</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={CHART_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#eee" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={70} tick={{fontSize: 12}} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                            {CHART_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#F87171', '#FB923C', '#FBBF24', '#60A5FA'][index % 4]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Store Ranking */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-800">Store Rankings</h3>
            </div>
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 bg-gray-50 uppercase">
                    <tr>
                        <th className="px-4 py-3">Rank</th>
                        <th className="px-4 py-3">Store</th>
                        <th className="px-4 py-3 text-right">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        {rank: 1, name: 'Downtown Branch', score: 98},
                        {rank: 2, name: 'Westside Mall', score: 95},
                        {rank: 3, name: 'Airport Kiosk', score: 92},
                        {rank: 4, name: 'North Station', score: 88},
                        {rank: 5, name: 'Suburb Plaza', score: 85},
                    ].map((store, idx) => (
                        <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-600">#{store.rank}</td>
                            <td className="px-4 py-3 text-gray-800">{store.name}</td>
                            <td className="px-4 py-3 text-right font-bold text-gray-800">{store.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default DataDashboard;
