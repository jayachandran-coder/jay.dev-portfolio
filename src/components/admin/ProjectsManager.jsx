import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', desc: '', img: '', imgs: [], tags: '', live: '', imageFiles: [] });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');
  const authConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
      setProjects(res.data);
    } catch { console.error('Failed to fetch projects'); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    const hasFiles = formData.imageFiles && formData.imageFiles.length > 0;
    const hasExisting = formData.imgs && formData.imgs.length > 0;

    if (!editingId && !hasFiles) {
      setMessage('At least one image file is required for new projects.');
      return;
    }

    setLoading(true);

    const parsedTags = typeof formData.tags === 'string'  
      ? formData.tags.split(',').filter(t => t.trim() !== '').map(t => t.trim()) 
      : (Array.isArray(formData.tags) ? formData.tags : []);

    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('desc', formData.desc);
    uploadData.append('live', formData.live);
    parsedTags.forEach(tag => uploadData.append('tags', tag));

    if (hasFiles) {
      // Append multiple files for upload
      formData.imageFiles.forEach(file => {
        uploadData.append('images', file);
      });
    } else if (editingId && hasExisting) {
      // Send the current list of images to retain
      uploadData.append('existingImgs', JSON.stringify(formData.imgs));
    }

    try {
      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${editingId}`, uploadData, authConfig);
        setMessage('Project updated successfully!');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, uploadData, authConfig);
        setMessage('Project created successfully!');
      }
      
      setTimeout(() => setMessage(''), 3000);
      setIsEditing(false);
      setFormData({ title: '', desc: '', img: '', imgs: [], tags: '', live: '', imageFiles: [] });
      setEditingId(null);
      fetchProjects();
    } catch (err) { 
      console.error('Save Project Error:', err.response?.data || err.message);
      setMessage(err.response?.data?.error || 'Error saving project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (project) => {
    setFormData({ 
      ...project, 
      imgs: Array.isArray(project.imgs) ? project.imgs : (project.img ? [project.img] : []),
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : '', 
      imageFiles: [] 
    });
    setEditingId(project._id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, authConfig);
        setMessage('Project deleted.');
        setTimeout(() => setMessage(''), 3000);
        fetchProjects();
      } catch { 
        setMessage('Error deleting project.');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="glass-panel p-8 rounded-3xl border border-white/10">
        <h3 className="text-2xl font-bold text-white mb-6">{editingId ? 'Edit Project' : 'Add Project'}</h3>
        
        {message && (
          <div className={`p-4 rounded-xl mb-6 flex items-center justify-center font-semibold ${message.includes('success') ? 'bg-green-500/20 text-green-300 border border-green-500/50' : 'bg-red-500/20 text-red-300 border border-red-500/50'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400">Project Title</label>
            <input className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none transition-colors" placeholder="e.g. Portfolio Website" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400">Description</label>
            <textarea className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white h-32 focus:border-brand-500 outline-none transition-colors" placeholder="Describe the project..." value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} required />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-400">Project Images {editingId && '(Uploading new files will replace current ones)'}</label>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={e => setFormData({...formData, imageFiles: Array.from(e.target.files)})} 
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-500/20 file:text-brand-300 hover:file:bg-brand-500/30 cursor-pointer" 
            />
            
            {/* New files preview */}
            {formData.imageFiles && formData.imageFiles.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-brand-400 font-semibold">Selected Files ({formData.imageFiles.length}):</p>
                <div className="flex flex-wrap gap-2">
                  {formData.imageFiles.map((file, idx) => (
                    <div key={idx} className="relative w-16 h-16 bg-slate-800 rounded-lg overflow-hidden border border-brand-500/50 flex items-center justify-center p-1">
                      <img src={URL.createObjectURL(file)} alt="new preview" className="w-full h-full object-contain rounded" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Existing files preview with deletion */}
            {editingId && formData.imgs && formData.imgs.length > 0 && (!formData.imageFiles || formData.imageFiles.length === 0) && (
              <div className="space-y-1">
                <p className="text-xs text-slate-400 font-semibold">Current Images ({formData.imgs.length}):</p>
                <div className="flex flex-wrap gap-2">
                  {formData.imgs.map((url, idx) => (
                    <div key={idx} className="relative w-16 h-16 bg-slate-800 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center p-1 group/img">
                      <img src={url} alt="existing preview" className="w-full h-full object-contain rounded" />
                      <button 
                        type="button" 
                        onClick={() => {
                          const remaining = formData.imgs.filter((_, i) => i !== idx);
                          setFormData({ ...formData, imgs: remaining });
                        }}
                        className="absolute -top-1.5 -right-1.5 bg-red-600 hover:bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-md opacity-0 group-hover/img:opacity-100 transition-opacity"
                        title="Remove Image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400">Tags (comma separated)</label>
            <input className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none transition-colors" placeholder="React, Node.js, MongoDB" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-400">Live Demo URL</label>
            <input className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none transition-colors" placeholder="https://..." value={formData.live} onChange={e => setFormData({...formData, live: e.target.value})} />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className={`bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-8 rounded-xl transition-all flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : 'Save Project'}
            </button>
            <button type="button" onClick={() => { setIsEditing(false); setMessage(''); }} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-xl transition-all">Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Projects</h2>
        <button onClick={() => { setIsEditing(true); setEditingId(null); setFormData({ title: '', desc: '', img: '', imgs: [], tags: '', live: '', imageFiles: [] }); }} className="bg-brand-500 hover:bg-brand-600 text-white flex items-center gap-2 px-4 py-2 rounded-xl">
          <Plus size={20} /> Add Project
        </button>
      </div>

      {message && (
        <div className="bg-brand-500/20 text-brand-300 border border-brand-500/50 p-4 rounded-xl mb-6 flex items-center justify-center font-semibold">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(proj => (
          <div key={proj._id} className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col">
            <div className="w-full aspect-video overflow-hidden bg-slate-900/50 flex items-center justify-center rounded-2xl mb-4 relative">
              <img src={proj.img} alt={proj.title} className="w-full h-full object-cover" />
              {proj.imgs && proj.imgs.length > 1 && (
                <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-xs font-semibold px-2 py-1 rounded-md backdrop-blur-sm border border-white/10">
                  {proj.imgs.length} Images
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{proj.desc}</p>
            <div className="flex gap-2 mt-auto pt-4 border-t border-white/10">
              <button onClick={() => startEdit(proj)} className="flex items-center gap-2 text-brand-400 hover:text-brand-300 font-semibold text-sm px-3 py-1.5 bg-brand-500/10 rounded-lg"><Pencil size={16}/> Edit</button>
              <button onClick={() => handleDelete(proj._id)} className="flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold text-sm px-3 py-1.5 bg-red-500/10 rounded-lg"><Trash2 size={16}/> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
