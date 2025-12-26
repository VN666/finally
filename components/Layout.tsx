import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, BarChart2, User, CheckCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-gray-200">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {children}
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 pb-safe z-50">
        <Link to="/" className={`flex flex-col items-center p-2 ${isActive('/') ? 'text-orange-500' : 'text-gray-400'}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/rectification" className={`flex flex-col items-center p-2 ${isActive('/rectification') ? 'text-orange-500' : 'text-gray-400'}`}>
          <div className="relative">
            <CheckCircle size={24} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full">3</span>
          </div>
          <span className="text-xs mt-1">Rectify</span>
        </Link>
        <Link to="/inspection" className={`flex flex-col items-center p-2 ${isActive('/inspection') ? 'text-orange-500' : 'text-gray-400'}`}>
          <ClipboardList size={24} />
          <span className="text-xs mt-1">Inspect</span>
        </Link>
        <Link to="/stats" className={`flex flex-col items-center p-2 ${isActive('/stats') ? 'text-orange-500' : 'text-gray-400'}`}>
          <BarChart2 size={24} />
          <span className="text-xs mt-1">Data</span>
        </Link>
        <Link to="/records" className={`flex flex-col items-center p-2 ${isActive('/records') ? 'text-orange-500' : 'text-gray-400'}`}>
          <User size={24} />
          <span className="text-xs mt-1">Records</span>
        </Link>
      </nav>
    </div>
  );
};

export default Layout;
