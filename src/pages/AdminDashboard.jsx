import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, MessageSquareQuote, Settings, LogOut } from 'lucide-react';
import ProjectsManager from '../components/admin/ProjectsManager';
import ReviewsManager from '../components/admin/ReviewsManager';
import SettingsPanel from '../components/admin/SettingsPanel';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Reviews', path: '/admin/reviews', icon: MessageSquareQuote },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex relative z-10">
      {/* Sidebar */}
      <aside className="w-64 glass-panel border-r border-white/10 flex flex-col p-6">
        <h2 className="text-2xl font-bold text-white mb-10 pb-4 border-b border-white/10">Admin Panel</h2>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link 
                key={item.name} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-brand-500 text-white font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all mt-auto"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <Routes>
          <Route path="/" element={<div className="glass-panel p-8 rounded-3xl"><h3 className="text-2xl text-white font-bold">Welcome to Dashboard</h3><p className="text-slate-400 mt-2">Manage your portfolio content here.</p></div>} />
          <Route path="/projects" element={<ProjectsManager />} />
          <Route path="/reviews" element={<ReviewsManager />} />
          <Route path="/settings" element={<SettingsPanel />} />
        </Routes>
      </main>
    </div>
  );
}
