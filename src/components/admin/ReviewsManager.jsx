import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Check, XCircle } from 'lucide-react';

export default function ReviewsManager() {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('adminToken');
  const authConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/reviews`);
      setReviews(res.data);
    } catch (err) { console.error('Failed to fetch reviews'); }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/reviews/${id}/approve`, {}, authConfig);
      setMessage('Review approved successfully!');
      setTimeout(() => setMessage(''), 3000);
      fetchReviews();
    } catch (err) { 
      setMessage('Error approving review.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/reviews/${id}`, authConfig);
        setMessage('Review deleted.');
        setTimeout(() => setMessage(''), 3000);
        fetchReviews();
      } catch (err) { 
        setMessage('Error deleting review.');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const [activeTab, setActiveTab] = useState('pending');

  const pendingReviews = reviews.filter(r => !r.approved);
  const liveReviews = reviews.filter(r => r.approved);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Review Moderation</h2>
      </div>

      {message && (
        <div className="bg-brand-500/20 text-brand-300 border border-brand-500/50 p-4 rounded-xl mb-6 flex items-center justify-center font-semibold text-sm">
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 mb-8 pb-4">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-6 py-2 rounded-xl font-semibold transition-all ${activeTab === 'pending' ? 'bg-brand-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          Pending Approvals ({pendingReviews.length})
        </button>
        <button
          onClick={() => setActiveTab('live')}
          className={`px-6 py-2 rounded-xl font-semibold transition-all ${activeTab === 'live' ? 'bg-brand-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
        >
          Approved Reviews ({liveReviews.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'pending' && (
        <div>
          {pendingReviews.length === 0 && <p className="text-slate-400 italic">No pending reviews found.</p>}
          <div className="space-y-4">
            {pendingReviews.map(rev => (
              <div key={rev._id} className="glass-panel p-6 rounded-3xl border border-yellow-500/30 flex items-center justify-between bg-yellow-500/5">
                 <div className="flex items-center gap-6">
                    <div>
                       <h4 className="text-lg font-bold text-white">{rev.name} <span className="text-yellow-400 text-xs ml-2 border border-yellow-400/50 px-2 py-0.5 rounded-full">PENDING</span></h4>
                       <p className="text-sm text-brand-400 mb-1">Rating: {(rev.rating || 5)}${"/5"}</p>
                       <p className="text-slate-300 text-sm max-w-2xl">"{rev.text}"</p>
                    </div>
                 </div>
                 <div className="shrink-0 flex items-center gap-2 flex-col md:flex-row">
                    <button onClick={() => handleApprove(rev._id)} className="flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold text-sm px-4 py-2 bg-green-500/10 rounded-xl transition-colors w-full md:w-auto">
                      <Check size={18}/> Approve
                    </button>
                    <button onClick={() => handleDelete(rev._id)} className="flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold text-sm px-4 py-2 bg-red-500/10 rounded-xl transition-colors w-full md:w-auto">
                      <Trash2 size={18}/> Delete
                    </button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'live' && (
        <div>
          {liveReviews.length === 0 && <p className="text-slate-400 italic">No live reviews found.</p>}
          <div className="space-y-4">
            {liveReviews.map(rev => (
              <div key={rev._id} className="glass-panel p-6 rounded-3xl border border-green-500/10 flex items-center justify-between">
                 <div className="flex items-center gap-6">
                    <div>
                       <h4 className="text-lg font-bold text-white">{rev.name}</h4>
                       <p className="text-sm text-brand-400 mb-1">Rating: {(rev.rating || 5)}${"/5"}</p>
                       <p className="text-slate-400 text-sm max-w-2xl line-clamp-2">"{rev.text}"</p>
                    </div>
                 </div>
                 <button onClick={() => handleDelete(rev._id)} className="shrink-0 flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold text-sm px-4 py-2 bg-red-500/10 rounded-xl transition-colors">
                   <Trash2 size={18}/> Delete
                 </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
