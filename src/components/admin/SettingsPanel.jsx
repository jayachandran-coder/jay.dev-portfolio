export default function SettingsPanel() {
  const handleSave = (e) => {
    e.preventDefault();
    alert("In this lightweight version, Admin credentials are managed securely via the .env file. Please edit your .env file on the server to change the username or password for maximum security.");
  };

  return (
    <div className="glass-panel p-8 rounded-3xl border border-white/10 max-w-2xl">
      <h3 className="text-2xl font-bold text-white mb-6">Settings</h3>
      
      <div className="bg-brand-500/10 border border-brand-500/30 text-brand-200 p-4 rounded-xl mb-6 text-sm">
        For security purposes of this lightweight database, please update your <strong>ADMIN_USERNAME</strong> and <strong>ADMIN_PASSWORD</strong> locally inside your <code>.env</code> file.
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">New Admin Username</label>
          <input className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white opacity-50" placeholder="admin" disabled />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">New Password</label>
          <input className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white opacity-50" type="password" placeholder="********" disabled />
        </div>
        
        <div className="pt-2">
          <button type="submit" className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-6 rounded-xl transition-colors">Update Credentials</button>
        </div>
      </form>
    </div>
  );
}
