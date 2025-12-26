import React from 'react';
import { Bell, ChevronRight, AlertCircle, Calendar, Video, ClipboardCheck, FileText, Activity, User } from 'lucide-react';
import { UserRole, InspectionTask } from '../types';
import { MOCK_NOTIFICATIONS, MOCK_INSPECTIONS } from '../constants';

interface DashboardProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ role, setRole }) => {
  const pendingInspections = MOCK_INSPECTIONS.filter(i => i.status === 'Pending').slice(0, 3);

  return (
    <div className="p-4 space-y-4">
      {/* Header & Role Switcher */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Hello, User</h1>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value as UserRole)}
          className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2"
        >
          <option value={UserRole.STORE_MANAGER}>Store Manager</option>
          <option value={UserRole.AREA_MANAGER}>Area Manager</option>
          <option value={UserRole.EMPLOYEE}>Employee</option>
        </select>
      </div>

      {/* Announcement Banner */}
      <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded shadow-sm flex items-start">
        <Bell className="text-orange-500 w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-700">
          <p className="font-semibold">Notice</p>
          <p>{MOCK_NOTIFICATIONS[0]}</p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-4 gap-4 bg-white p-4 rounded-xl shadow-sm">
        <ActionButton icon={<ClipboardCheck />} label="Self Check" color="text-blue-500" badge={1} />
        <ActionButton icon={<Video />} label="Video Audit" color="text-purple-500" />
        <ActionButton icon={<AlertCircle />} label="Rectify" color="text-red-500" badge={3} />
        <ActionButton icon={<Activity />} label="Progress" color="text-green-500" />
        <ActionButton icon={<FileText />} label="Records" color="text-orange-500" />
        <ActionButton icon={<Calendar />} label="Schedule" color="text-teal-500" />
        {role === UserRole.AREA_MANAGER && (
          <ActionButton icon={<ClipboardCheck />} label="Review" color="text-indigo-500" badge={5} />
        )}
        <ActionButton icon={<User />} label="Profile" color="text-gray-500" />
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard title="Self-Check Rate" value="98%" trend="+2%" />
        <StatCard title="Rectify Rate" value="92%" trend="-1%" warning />
      </div>

      {/* To-Do List / Pending Tasks */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-800">Pending Tasks</h2>
          <span className="text-xs text-orange-500 font-medium">View All</span>
        </div>
        <div className="divide-y divide-gray-50">
          {pendingInspections.map((task) => (
            <div key={task.id} className="p-4 flex items-center justify-between active:bg-gray-50 transition">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-10 rounded-full ${task.type === 'Video' ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
                <div>
                  <h3 className="font-medium text-gray-800 text-sm">{task.title}</h3>
                  <p className="text-xs text-gray-500">Due: {task.date} • {task.type}</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-orange-100 text-orange-600 text-xs rounded-full font-medium">
                Start
              </button>
            </div>
          ))}
          {pendingInspections.length === 0 && (
            <div className="p-6 text-center text-gray-400 text-sm">
              No pending tasks. Good job!
            </div>
          )}
        </div>
      </div>

       {/* Top Problems Section */}
       <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="font-bold text-gray-800 mb-3">Top Issues This Month</h2>
          <div className="space-y-3">
             <ProgressBar label="Uniform Compliance" percent={15} color="bg-red-500" />
             <ProgressBar label="Floor Cleanliness" percent={12} color="bg-orange-500" />
             <ProgressBar label="Equipment Safety" percent={8} color="bg-yellow-500" />
          </div>
       </div>
    </div>
  );
};

const ActionButton: React.FC<{ icon: React.ReactNode; label: string; color: string; badge?: number }> = ({ icon, label, color, badge }) => (
  <div className="flex flex-col items-center space-y-2 cursor-pointer relative">
    <div className={`p-3 bg-gray-50 rounded-lg ${color}`}>
      {icon}
    </div>
    {badge ? (
      <span className="absolute top-0 right-2 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full border-2 border-white">
        {badge}
      </span>
    ) : null}
    <span className="text-[10px] text-gray-600 font-medium text-center leading-tight">{label}</span>
  </div>
);

const StatCard: React.FC<{ title: string; value: string; trend: string; warning?: boolean }> = ({ title, value, trend, warning }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm">
    <p className="text-xs text-gray-500 mb-1">{title}</p>
    <div className="flex items-end justify-between">
      <span className={`text-2xl font-bold ${warning ? 'text-red-500' : 'text-gray-800'}`}>{value}</span>
      <span className={`text-xs px-1.5 py-0.5 rounded ${warning ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
        {trend}
      </span>
    </div>
  </div>
);

const ProgressBar: React.FC<{ label: string; percent: number; color: string }> = ({ label, percent, color }) => (
  <div>
    <div className="flex justify-between text-xs mb-1">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-800">{percent}%</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-1.5">
      <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

export default Dashboard;