import { Routes, Route } from 'react-router-dom';
import PortfolioLayout from './pages/PortfolioLayout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-brand-500/30 overflow-x-hidden">
      {/* Global Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-900/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/40 blur-[120px]" />
      </div>
      
      <Routes>
        <Route path="/" element={<PortfolioLayout />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
