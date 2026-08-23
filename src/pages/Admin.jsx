import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  Lock, User, LogOut, Save, Plus, Trash2, Edit2, Upload, 
  FileText, Calendar, Users, Cpu, Layers, MessageSquare, 
  HelpCircle, GraduationCap, Briefcase, Activity, Check, X, 
  ShieldAlert, Sparkles, Smartphone, Terminal, Settings, RefreshCw, Eye
} from 'lucide-react';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(api.admin.isLoggedIn());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [listData, setListData] = useState([]);
  const [overviewStats, setOverviewStats] = useState(null);
  const [loadingList, setLoadingList] = useState(false);
  const [listError, setListError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  // Editing state
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [settingsData, setSettingsData] = useState({});
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError, setPwdError] = useState(null);
  const [pwdSuccess, setPwdSuccess] = useState(null);
  // Password reset (token) UI state
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetTokenInput, setResetTokenInput] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData(activeTab);
    }
  }, [isLoggedIn, activeTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      await api.admin.login(username, password);
      setIsLoggedIn(true);
      setActiveTab('dashboard');
    } catch (err) {
      setAuthError(err.message || 'Invalid credentials');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    api.admin.logout();
    setIsLoggedIn(false);
    setOverviewStats(null);
    setListData([]);
    setEditingItem(null);
  };

  const fetchData = async (tab) => {
    setLoadingList(true);
    setListError(null);
    setActionSuccess(null);
    try {
      if (tab === 'dashboard') {
        const stats = await api.admin.getStats();
        setOverviewStats(stats);
      } else if (tab === 'settings') {
        const settings = await api.admin.getSettings();
        setSettingsData(settings);
      } else {
        let data = [];
        if (tab === 'contacts') data = await api.admin.getContacts();
        if (tab === 'services') data = await api.admin.getServices();
        else if (tab === 'products') data = await api.admin.getProducts();
        else if (tab === 'projects') data = await api.admin.getProjects();
        else if (tab === 'events') data = await api.admin.getEvents();
        else if (tab === 'gallery') data = await api.admin.getGallery();
        else if (tab === 'testimonials') data = await api.admin.getTestimonials();
        else if (tab === 'faq') data = await api.admin.getFAQ();
        else if (tab === 'team') data = await api.admin.getTeam();
        else if (tab === 'statistics') data = await api.admin.getStatistics();
        else if (tab === 'internships') data = await api.admin.getInternships();
        setListData(data);
      }
    } catch (err) {
      console.error(err);
      setListError(err.message || 'Failed to fetch database content');
      if (err.message === 'Unauthorized') {
        handleLogout();
      }
    } finally {
      setLoadingList(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this record?')) return;
    setListError(null);
    setActionSuccess(null);
    try {
      if (activeTab === 'contacts') await api.admin.deleteContact(id);
      else if (activeTab === 'services') await api.admin.deleteService(id);
      else if (activeTab === 'products') await api.admin.deleteProduct(id);
      else if (activeTab === 'projects') await api.admin.deleteProject(id);
      else if (activeTab === 'events') await api.admin.deleteEvent(id);
      else if (activeTab === 'gallery') await api.admin.deleteGalleryItem(id);
      else if (activeTab === 'testimonials') await api.admin.deleteTestimonial(id);
      else if (activeTab === 'faq') await api.admin.deleteFAQ(id);
      else if (activeTab === 'team') await api.admin.deleteTeamMember(id);
      else if (activeTab === 'statistics') await api.admin.deleteStatistic(id);
      else if (activeTab === 'internships') await api.admin.deleteInternship(id);
      
      setActionSuccess('Record deleted successfully');
      fetchData(activeTab);
    } catch (err) {
      setListError(err.message || 'Failed to delete record');
    }
  };

  // Image Format Validation
  const validateImageUrl = (url) => {
    if (!url) return true;
    const cleanUrl = url.split('?')[0].split('#')[0];
    const isJpg = cleanUrl.toLowerCase().endsWith('.jpg') || cleanUrl.toLowerCase().endsWith('.jpeg');
    if (!isJpg) {
      alert('Format warning: We strongly recommend using high-quality .jpg or .jpeg images for site-wide visual compliance.');
    }
    return true;
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Enforce strict JPG check
    const extension = file.name.split('.').pop().toLowerCase();
    if (extension !== 'jpg' && extension !== 'jpeg') {
      alert('Action Blocked: Only JPG/JPEG file formats are supported.');
      e.target.value = ''; // clear input
      return;
    }

    setUploading(true);
    setListError(null);
    try {
      const response = await api.admin.uploadFile(file);
      if (response.success && response.url) {
        setEditingItem(prev => ({
          ...prev,
          [fieldName]: response.url
        }));
        setActionSuccess('Image uploaded successfully');
      } else {
        throw new Error('Upload response did not return file URL');
      }
    } catch (err) {
      setListError(err.message || 'Failed to upload image file');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    setListError(null);
    setActionSuccess(null);

    // Validate images before saving
    if (editingItem.image && !validateImageUrl(editingItem.image)) return;
    if (editingItem.photo && !validateImageUrl(editingItem.photo)) return;
    if (editingItem.banner && !validateImageUrl(editingItem.banner)) return;
    if (editingItem.url && activeTab === 'gallery' && editingItem.type === 'image' && !validateImageUrl(editingItem.url)) return;

    try {
      const isNew = !listData.some(item => item.id === editingItem.id);
      
      let res;
      if (activeTab === 'services') {
        res = isNew ? await api.admin.createService(editingItem) : await api.admin.updateService(editingItem.id, editingItem);
      } else if (activeTab === 'products') {
        res = isNew ? await api.admin.createProduct(editingItem) : await api.admin.updateProduct(editingItem.id, editingItem);
      } else if (activeTab === 'projects') {
        res = isNew ? await api.admin.createProject(editingItem) : await api.admin.updateProject(editingItem.id, editingItem);
      } else if (activeTab === 'events') {
        res = isNew ? await api.admin.createEvent(editingItem) : await api.admin.updateEvent(editingItem.id, editingItem);
      } else if (activeTab === 'gallery') {
        res = isNew ? await api.admin.createGalleryItem(editingItem) : await api.admin.updateGalleryItem(editingItem.id, editingItem);
      } else if (activeTab === 'testimonials') {
        res = isNew ? await api.admin.createTestimonial(editingItem) : await api.admin.updateTestimonial(editingItem.id, editingItem);
      } else if (activeTab === 'faq') {
        res = isNew ? await api.admin.createFAQ(editingItem) : await api.admin.updateFAQ(editingItem.id, editingItem);
      } else if (activeTab === 'team') {
        res = isNew ? await api.admin.createTeamMember(editingItem) : await api.admin.updateTeamMember(editingItem.id, editingItem);
      } else if (activeTab === 'statistics') {
        res = isNew ? await api.admin.createStatistic(editingItem) : await api.admin.updateStatistic(editingItem.id, editingItem);
      } else if (activeTab === 'internships') {
        res = isNew ? await api.admin.createInternship(editingItem) : await api.admin.updateInternship(editingItem.id, editingItem);
      }

      setActionSuccess('Data saved successfully');
      setEditingItem(null);
      fetchData(activeTab);
    } catch (err) {
      setListError(err.message || 'Failed to save configuration');
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setListError(null);
    setActionSuccess(null);
    try {
      await api.admin.updateSettings(settingsData);
      setActionSuccess('System settings synchronized');
      fetchData('settings');
    } catch (err) {
      setListError(err.message || 'Failed to save system settings');
    }
  };

  const createEmptyItem = () => {
    const id = Date.now().toString();
    switch (activeTab) {
      case 'services':
        return { id, title: '', icon: 'Cpu', description: '', tech: [], items: [], longDescription: '', benefits: [], image: '', isEnabled: 1, orderIndex: 0 };
      case 'products':
        return { id, title: '', tagline: '', description: '', features: [], benefits: [], image: '', isEnabled: 1, orderIndex: 0 };
      case 'projects':
        return { id, title: '', description: '', highlights: [], winners: '', banner: '', gallery: [], isEnabled: 1, orderIndex: 0 };
      case 'events':
        return { id, title: '', year: new Date().getFullYear(), date: '', description: '', highlights: [], winners: '', banner: '', gallery: [], isEnabled: 1, orderIndex: 0 };
      case 'gallery':
        return { id, title: '', category: 'events', type: 'image', url: '', description: '', isEnabled: 1, orderIndex: 0 };
      case 'testimonials':
        return { id, name: '', role: '', category: 'client', rating: 5, feedback: '', photo: '', isEnabled: 1, orderIndex: 0 };
      case 'faq':
        return { id, question: '', answer: '', isEnabled: 1, orderIndex: 0 };
      case 'team':
        return { id, name: '', role: '', bio: '', photo: '', linkedin: '', twitter: '', github: '', isEnabled: 1, orderIndex: 0 };
      case 'statistics':
        return { id, value: 0, suffix: '+', label: '', description: '', isEnabled: 1, orderIndex: 0 };
      case 'internships':
        return { id, title: '', description: '', duration: '', skills: [], isEnabled: 1, orderIndex: 0 };
      default:
        return null;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center px-4" style={{ backgroundColor: 'var(--dark-bg)' }}>
        <div className="admin-card-glass w-100" style={{ maxWidth: '420px' }}>
          <div className="text-center mb-4">
            <div className="d-inline-flex p-3 rounded-circle bg-opacity-10 bg-cyan mb-3" style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)' }}>
              <Lock className="text-cyan animate-pulse" size={32} />
            </div>
            <h2 className="text-gradient fw-bold">Control Deck</h2>
            <p className="text-muted-custom small">Authenticate to access database nodes</p>
          </div>

          {authError && (
            <div className="alert border-0 bg-opacity-10 bg-danger text-danger text-center py-2 px-3 mb-4 rounded-3" style={{ fontSize: '0.85rem' }}>
              <ShieldAlert className="d-inline-block me-2" size={16} />
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label text-muted-custom small mb-1">System ID</label>
              <div className="input-group">
                <span className="input-group-text border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'rgba(255,255,255,0.4)' }}>
                  <User size={18} />
                </span>
                <input 
                  type="text" 
                  className="form-control form-control-custom" 
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-muted-custom small mb-1">Security Code</label>
              <div className="input-group">
                <span className="input-group-text border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'rgba(255,255,255,0.4)' }}>
                  <Lock size={18} />
                </span>
                <input 
                  type="password" 
                  className="form-control form-control-custom" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-cyan w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-bold"
              disabled={authLoading}
            >
              {authLoading ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  Synchronizing...
                </>
              ) : (
                <>
                  <Activity size={18} />
                  Synchronize Node
                </>
              )}
            </button>
          </form>
          <div className="text-center mt-3">
            <button className="btn btn-link text-muted-custom small" onClick={async (e) => {
              e.preventDefault();
              const usernameToReset = username || 'admin';
              try {
                const res = await api.admin.forgotPassword(usernameToReset);
                if (res.token) {
                  alert('Reset token (dev): ' + res.token + '\nUse Reset form in Settings tab to complete password reset.');
                } else {
                  alert(res.message || 'If the account exists, reset instructions were sent.');
                }
              } catch (err) {
                alert(err.message || 'Failed to request reset');
              }
            }}>Forgot password?</button>
            {showResetForm ? (
              <div className="mt-3 p-3 border rounded bg-dark">
                {resetError && <div className="alert alert-danger py-2">{resetError}</div>}
                {resetSuccess && <div className="alert alert-success py-2">{resetSuccess}</div>}
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setResetLoading(true); setResetError(null); setResetSuccess(null);
                  try {
                    const res = await api.admin.resetPassword(resetTokenInput, resetNewPassword);
                    if (!res || res.error) throw new Error(res?.error || 'Failed to reset password');
                    setResetSuccess(res.message || 'Password reset successfully. Logging you in...');
                    // Attempt to login automatically with provided username (or default 'admin')
                    const usernameToUse = username || 'admin';
                    try {
                      await api.admin.login(usernameToUse, resetNewPassword);
                      setIsLoggedIn(true);
                      setActiveTab('dashboard');
                    } catch (loginErr) {
                      // If auto-login fails, show success and keep user on login form
                      console.warn('Auto-login failed after reset:', loginErr);
                    }
                    setResetTokenInput(''); setResetNewPassword('');
                    setShowResetForm(false);
                  } catch (err) {
                    setResetError(err.message || 'Failed to reset password');
                  } finally { setResetLoading(false); }
                }}>
                  <div className="mb-2">
                    <label className="form-label small text-muted">Reset Token</label>
                    <input className="form-control form-control-custom" value={resetTokenInput} onChange={e=>setResetTokenInput(e.target.value)} required />
                  </div>
                  <div className="mb-2">
                    <label className="form-label small text-muted">New Password</label>
                    <input type="password" className="form-control form-control-custom" value={resetNewPassword} onChange={e=>setResetNewPassword(e.target.value)} required />
                  </div>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-cyan" type="submit" disabled={resetLoading}>{resetLoading ? 'Resetting...' : 'Reset Password'}</button>
                    <button className="btn btn-link text-muted" onClick={(ev)=>{ev.preventDefault(); setShowResetForm(false); setResetError(null);}}>Cancel</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="mt-2">
                <button className="btn btn-link text-muted-custom small" onClick={(e)=>{e.preventDefault(); setShowResetForm(true);}}>Have a reset token? Use it</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'contacts', label: 'Contacts', icon: MessageSquare },
    { id: 'services', label: 'Services', icon: Cpu },
    { id: 'products', label: 'Products', icon: Smartphone },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'gallery', label: 'Gallery', icon: Eye },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'statistics', label: 'Stats', icon: FileText },
    { id: 'internships', label: 'Internships', icon: GraduationCap },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-vh-100 text-white" style={{ backgroundColor: 'var(--dark-bg)', paddingTop: '100px', paddingBottom: '60px' }}>
      <div className="container">
        
        {/* Header bar */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-5 border-bottom border-secondary pb-4">
          <div>
            <h1 className="text-gradient fw-bold mb-1">Administrative Terminal</h1>
            <p className="text-muted-custom small mb-0">Direct access to the core database services</p>
          </div>
          <button onClick={handleLogout} className="btn border border-secondary text-light px-3 py-2 d-flex align-items-center gap-2" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <LogOut size={16} />
            Disconnect Node
          </button>
        </div>

        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-lg-3">
            <div className="admin-card-glass p-3">
              <h5 className="text-cyan small fw-bold tracking-wider text-uppercase px-3 mb-3">Database Nodes</h5>
              <div className="d-flex flex-column gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setEditingItem(null); }}
                      className={`admin-sidebar-btn ${activeTab === tab.id ? 'active' : ''}`}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main workspace */}
          <div className="col-lg-9">
            {/* Status alerts */}
            {listError && (
              <div className="alert border-0 bg-opacity-10 bg-danger text-danger mb-4 py-2 px-3 d-flex align-items-center gap-2">
                <ShieldAlert size={18} />
                {listError}
              </div>
            )}
            {actionSuccess && (
              <div className="alert border-0 bg-opacity-10 bg-success text-success mb-4 py-2 px-3 d-flex align-items-center gap-2">
                <Check size={18} />
                {actionSuccess}
              </div>
            )}

            {/* Dashboard Overview */}
            {activeTab === 'dashboard' && overviewStats && (
              <div className="row g-4">
                <div className="col-12">
                  <div className="admin-card-glass">
                    <h3 className="text-gradient mb-4">Core System Overview</h3>
                    <div className="row g-3">
                      {[
                        { label: 'Website Services', value: overviewStats.totalServices, icon: Cpu },
                        { label: 'Active Products', value: overviewStats.totalProducts, icon: Smartphone },
                        { label: 'Projects & Work', value: overviewStats.totalProjects, icon: Layers },
                        { label: 'Events Hosted', value: overviewStats.totalEvents, icon: Calendar },
                        { label: 'User Testimonials', value: overviewStats.totalTestimonials, icon: MessageSquare },
                        { label: 'Inquiries Received', value: overviewStats.newInquiries, icon: HelpCircle, highlight: true },
                        { label: 'Consultations Hooked', value: overviewStats.newConsultations, icon: Activity, highlight: true },
                      ].map((card, idx) => {
                        const CardIcon = card.icon;
                        return (
                          <div key={idx} className="col-md-6 col-xl-4">
                            <div className="p-3 rounded-3 border border-secondary d-flex justify-content-between align-items-center" style={{ backgroundColor: card.highlight ? 'rgba(6, 182, 212, 0.05)' : 'rgba(255,255,255,0.02)' }}>
                              <div>
                                <span className="text-muted-custom small d-block mb-1">{card.label}</span>
                                <span className={`fs-3 fw-bold ${card.highlight ? 'text-cyan' : ''}`}>{card.value}</span>
                              </div>
                              <CardIcon size={28} className={card.highlight ? 'text-cyan animate-pulse' : 'text-muted-custom'} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Content List View (For items) */}
            {activeTab !== 'dashboard' && activeTab !== 'settings' && !editingItem && (
              <div className="admin-card-glass">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="text-gradient capitalize mb-0">{activeTab} Node Entries</h4>
                  <button 
                    onClick={() => setEditingItem(createEmptyItem())}
                    className="btn btn-cyan btn-sm d-flex align-items-center gap-2 py-2 px-3 fw-bold"
                  >
                    <Plus size={16} />
                    Insert Record
                  </button>
                </div>

                {loadingList ? (
                  <div className="text-center py-5">
                    <RefreshCw className="animate-spin text-cyan" size={36} />
                    <p className="text-muted-custom small mt-2">Loading data packets...</p>
                  </div>
                ) : listData.length === 0 ? (
                  <div className="text-center py-5 border border-dashed border-secondary rounded-3">
                    <HelpCircle className="text-muted-custom" size={48} />
                    <p className="text-muted-custom mt-2">No records stored in this database node</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table-custom">
                      <thead>
                        <tr>
                          <th>Record Identifiers</th>
                          <th>Details / Info</th>
                          <th>Status</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listData.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <span className="fw-bold d-block text-white">{item.title || item.name || item.question || item.label || item.id}</span>
                              <span className="text-muted-custom small font-monospace">{item.id}</span>
                            </td>
                            <td>
                              {activeTab === 'contacts' ? (
                                <div>
                                  <div className="fw-bold text-white small mb-1">{item.email} • {item.phone}</div>
                                  <div className="text-muted-custom small text-truncate" style={{ maxWidth: 420 }}>{item.message || item.projectDescription || ''}</div>
                                </div>
                              ) : (
                                <span className="text-muted-custom small d-inline-block text-truncate" style={{ maxWidth: '280px' }}>
                                  {item.description || item.bio || item.answer || item.tagline || item.feedback || `Order Index: ${item.orderIndex}`}
                                </span>
                              )}
                            </td>
                            <td>
                              {activeTab === 'contacts' ? (
                                <select
                                  className="form-select form-select-sm form-control-custom"
                                  value={item.status}
                                  onChange={async (e) => {
                                    try {
                                      await api.admin.updateContactStatus(item.id, e.target.value);
                                      setActionSuccess('Contact status updated');
                                      fetchData(activeTab);
                                    } catch (err) {
                                      setListError(err.message || 'Failed to update status');
                                    }
                                  }}
                                  style={{ minWidth: 160 }}
                                >
                                  <option value="new">New</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="in_progress">In Progress</option>
                                  <option value="closed">Closed</option>
                                </select>
                              ) : (
                                (item.isEnabled === 1 || item.isEnabled === undefined) ? (
                                  <span className="badge bg-opacity-10 bg-success text-success border border-success border-opacity-20 px-2 py-1">Active</span>
                                ) : (
                                  <span className="badge bg-opacity-10 bg-secondary text-light border border-secondary border-opacity-20 px-2 py-1">Disabled</span>
                                )
                              )}
                            </td>
                            <td className="text-end">
                              <div className="d-inline-flex gap-2">
                                <button 
                                  onClick={() => setEditingItem(item)}
                                  className="btn btn-sm btn-outline-info p-2"
                                  title="Edit Record"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button 
                                  onClick={() => handleDelete(item.id)}
                                  className="btn btn-sm btn-outline-danger p-2"
                                  title="Delete Record"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Dynamic Editing Form */}
            {editingItem && (
              <div className="admin-card-glass">
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
                  <h4 className="text-cyan fw-bold mb-0">
                    {listData.some(item => item.id === editingItem.id) ? 'Configure Record' : 'Create Record'}
                  </h4>
                  <button onClick={() => setEditingItem(null)} className="btn btn-sm border border-secondary text-light">
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleSaveItem}>
                  <div className="row g-3">
                    
                    {/* Primary Identifier */}
                    <div className="col-12 col-md-6">
                      <label className="form-label text-muted-custom small mb-1">System Key (ID)</label>
                      <input 
                        type="text" 
                        className="form-control-custom"
                        value={editingItem.id}
                        onChange={e => setEditingItem({ ...editingItem, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                        disabled={listData.some(item => item.id === editingItem.id)}
                        required
                      />
                    </div>

                    {/* Common fields based on tabs */}
                    {(editingItem.title !== undefined) && (
                      <div className="col-12 col-md-6">
                        <label className="form-label text-muted-custom small mb-1">Title</label>
                        <input 
                          type="text" 
                          className="form-control-custom"
                          value={editingItem.title}
                          onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                          required
                        />
                      </div>
                    )}

                    {(editingItem.name !== undefined) && (
                      <div className="col-12 col-md-6">
                        <label className="form-label text-muted-custom small mb-1">Full Name</label>
                        <input 
                          type="text" 
                          className="form-control-custom"
                          value={editingItem.name}
                          onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                          required
                        />
                      </div>
                    )}

                    {(editingItem.tagline !== undefined) && (
                      <div className="col-12">
                        <label className="form-label text-muted-custom small mb-1">Tagline</label>
                        <input 
                          type="text" 
                          className="form-control-custom"
                          value={editingItem.tagline}
                          onChange={e => setEditingItem({ ...editingItem, tagline: e.target.value })}
                        />
                      </div>
                    )}

                    {(editingItem.duration !== undefined) && (
                      <div className="col-12 col-md-6">
                        <label className="form-label text-muted-custom small mb-1">Duration</label>
                        <input 
                          type="text" 
                          className="form-control-custom"
                          value={editingItem.duration}
                          onChange={e => setEditingItem({ ...editingItem, duration: e.target.value })}
                        />
                      </div>
                    )}

                    {(editingItem.role !== undefined) && (
                      <div className="col-12 col-md-6">
                        <label className="form-label text-muted-custom small mb-1">System Role / Occupation</label>
                        <input 
                          type="text" 
                          className="form-control-custom"
                          value={editingItem.role}
                          onChange={e => setEditingItem({ ...editingItem, role: e.target.value })}
                        />
                      </div>
                    )}

                    {/* Numeric Statistics Value */}
                    {(editingItem.value !== undefined) && (
                      <div className="col-12 col-md-6">
                        <label className="form-label text-muted-custom small mb-1">Numeric Metric Value</label>
                        <input 
                          type="number" 
                          className="form-control-custom"
                          value={editingItem.value}
                          onChange={e => setEditingItem({ ...editingItem, value: parseInt(e.target.value) || 0 })}
                          required
                        />
                      </div>
                    )}

                    {(editingItem.suffix !== undefined) && (
                      <div className="col-12 col-md-6">
                        <label className="form-label text-muted-custom small mb-1">Suffix (e.g. +, %)</label>
                        <input 
                          type="text" 
                          className="form-control-custom"
                          value={editingItem.suffix}
                          onChange={e => setEditingItem({ ...editingItem, suffix: e.target.value })}
                        />
                      </div>
                    )}

                    {(editingItem.label !== undefined) && (
                      <div className="col-12 col-md-6">
                        <label className="form-label text-muted-custom small mb-1">Label</label>
                        <input 
                          type="text" 
                          className="form-control-custom"
                          value={editingItem.label}
                          onChange={e => setEditingItem({ ...editingItem, label: e.target.value })}
                        />
                      </div>
                    )}

                    {/* Descriptions */}
                    {(editingItem.description !== undefined) && (
                      <div className="col-12">
                        <label className="form-label text-muted-custom small mb-1">Overview Description</label>
                        <textarea 
                          className="form-control-custom"
                          rows={3}
                          value={editingItem.description}
                          onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                          required
                        />
                      </div>
                    )}

                    {(editingItem.longDescription !== undefined) && (
                      <div className="col-12">
                        <label className="form-label text-muted-custom small mb-1">Detailed Description (Long Description)</label>
                        <textarea 
                          className="form-control-custom"
                          rows={4}
                          value={editingItem.longDescription}
                          onChange={e => setEditingItem({ ...editingItem, longDescription: e.target.value })}
                        />
                      </div>
                    )}

                    {(editingItem.bio !== undefined) && (
                      <div className="col-12">
                        <label className="form-label text-muted-custom small mb-1">Short Bio</label>
                        <textarea 
                          className="form-control-custom"
                          rows={3}
                          value={editingItem.bio}
                          onChange={e => setEditingItem({ ...editingItem, bio: e.target.value })}
                        />
                      </div>
                    )}

                    {(editingItem.feedback !== undefined) && (
                      <div className="col-12">
                        <label className="form-label text-muted-custom small mb-1">Feedback Message</label>
                        <textarea 
                          className="form-control-custom"
                          rows={4}
                          value={editingItem.feedback}
                          onChange={e => setEditingItem({ ...editingItem, feedback: e.target.value })}
                          required
                        />
                      </div>
                    )}

                    {/* FAQ fields */}
                    {(editingItem.question !== undefined) && (
                      <div className="col-12">
                        <label className="form-label text-muted-custom small mb-1">Question</label>
                        <input 
                          type="text" 
                          className="form-control-custom"
                          value={editingItem.question}
                          onChange={e => setEditingItem({ ...editingItem, question: e.target.value })}
                          required
                        />
                      </div>
                    )}

                    {(editingItem.answer !== undefined) && (
                      <div className="col-12">
                        <label className="form-label text-muted-custom small mb-1">Answer</label>
                        <textarea 
                          className="form-control-custom"
                          rows={4}
                          value={editingItem.answer}
                          onChange={e => setEditingItem({ ...editingItem, answer: e.target.value })}
                          required
                        />
                      </div>
                    )}

                    {/* Array/List fields (Inputs stringified/parsed on edit) */}
                    {['tech', 'items', 'benefits', 'features', 'highlights', 'skills'].map((arrayField) => {
                      if (editingItem[arrayField] === undefined) return null;
                      return (
                        <div className="col-12" key={arrayField}>
                          <label className="form-label text-muted-custom small mb-1 capitalize">
                            {arrayField} (Comma-separated items)
                          </label>
                          <input 
                            type="text" 
                            className="form-control-custom"
                            placeholder="React, Vue, Node"
                            value={editingItem[arrayField].join(', ')}
                            onChange={e => setEditingItem({
                              ...editingItem,
                              [arrayField]: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')
                            })}
                          />
                        </div>
                      );
                    })}

                    {/* Dynamic Image Input with strict Validation */}
                    {['image', 'photo', 'banner', 'url'].map((imgField) => {
                      // Skip 'url' if category is video (in gallery)
                      if (editingItem[imgField] === undefined) return null;
                      if (imgField === 'url' && editingItem.type === 'video') return null;
                      return (
                        <div className="col-12 border-top border-secondary pt-3 mt-3" key={imgField}>
                          <label className="form-label text-muted-custom small mb-1 capitalize fw-bold text-cyan">
                            {imgField === 'url' ? 'Image File Source' : `${imgField} File Source (JPG format required)`}
                          </label>
                          
                          <div className="row g-2 align-items-center">
                            <div className="col">
                              <input 
                                type="text" 
                                className="form-control-custom"
                                placeholder="https://images.unsplash.com/photo-example.jpg"
                                value={editingItem[imgField] || ''}
                                onChange={e => {
                                  setEditingItem({ ...editingItem, [imgField]: e.target.value });
                                  validateImageUrl(e.target.value);
                                }}
                              />
                            </div>
                            <div className="col-auto">
                              <div className="position-relative">
                                <button type="button" className="btn border border-secondary text-light px-3 py-2 d-flex align-items-center gap-1">
                                  <Upload size={16} />
                                  {uploading ? 'Uploading...' : 'Upload JPG'}
                                </button>
                                <input 
                                  type="file" 
                                  accept=".jpg,.jpeg"
                                  className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                                  onChange={e => handleFileUpload(e, imgField)}
                                  disabled={uploading}
                                />
                              </div>
                            </div>
                          </div>
                          <span className="text-muted-custom d-block mt-1 font-monospace" style={{ fontSize: '0.75rem' }}>
                            * System restricts uploads and path updates strictly to .jpg/.jpeg formats.
                          </span>
                        </div>
                      );
                    })}

                    {/* Video URL for Gallery */}
                    {(editingItem.type !== undefined && editingItem.type === 'video' && editingItem.url !== undefined) && (
                      <div className="col-12">
                        <label className="form-label text-muted-custom small mb-1">Video Resource URL</label>
                        <input 
                          type="text" 
                          className="form-control-custom"
                          value={editingItem.url}
                          onChange={e => setEditingItem({ ...editingItem, url: e.target.value })}
                        />
                      </div>
                    )}

                    {/* Categories and types (Select menus) */}
                    {(editingItem.category !== undefined && activeTab === 'gallery') && (
                      <div className="col-12 col-md-6">
                        <label className="form-label text-muted-custom small mb-1">Gallery Node Category</label>
                        <select 
                          className="form-select form-control-custom"
                          value={editingItem.category}
                          onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                        >
                          <option value="events">Events</option>
                          <option value="workshops">Workshops</option>
                          <option value="internships">Internships</option>
                          <option value="team">Team</option>
                          <option value="projects">Projects</option>
                        </select>
                      </div>
                    )}

                    {(editingItem.type !== undefined && activeTab === 'gallery') && (
                      <div className="col-12 col-md-6">
                        <label className="form-label text-muted-custom small mb-1">Resource Format</label>
                        <select 
                          className="form-select form-control-custom"
                          value={editingItem.type}
                          onChange={e => setEditingItem({ ...editingItem, type: e.target.value, url: '' })}
                        >
                          <option value="image">Still Image</option>
                          <option value="video">Digital Video</option>
                        </select>
                      </div>
                    )}

                    {(editingItem.category !== undefined && activeTab === 'testimonials') && (
                      <div className="col-12 col-md-6">
                        <label className="form-label text-muted-custom small mb-1">Testimonial Context</label>
                        <select 
                          className="form-select form-control-custom"
                          value={editingItem.category}
                          onChange={e => setEditingItem({ ...editingItem, category: e.target.value })}
                        >
                          <option value="client">Client Project</option>
                          <option value="internship">Internship Track</option>
                          <option value="training">Academy Bootcamp</option>
                          <option value="event">National Event</option>
                        </select>
                      </div>
                    )}

                    {/* Social Media accounts for Team members */}
                    {(editingItem.linkedin !== undefined) && (
                      <div className="col-12 col-md-4">
                        <label className="form-label text-muted-custom small mb-1">LinkedIn Account</label>
                        <input 
                          type="text" 
                          className="form-control-custom"
                          value={editingItem.linkedin}
                          onChange={e => setEditingItem({ ...editingItem, linkedin: e.target.value })}
                        />
                      </div>
                    )}

                    {(editingItem.twitter !== undefined) && (
                      <div className="col-12 col-md-4">
                        <label className="form-label text-muted-custom small mb-1">Twitter Account</label>
                        <input 
                          type="text" 
                          className="form-control-custom"
                          value={editingItem.twitter}
                          onChange={e => setEditingItem({ ...editingItem, twitter: e.target.value })}
                        />
                      </div>
                    )}

                    {(editingItem.github !== undefined) && (
                      <div className="col-12 col-md-4">
                        <label className="form-label text-muted-custom small mb-1">GitHub Account</label>
                        <input 
                          type="text" 
                          className="form-control-custom"
                          value={editingItem.github}
                          onChange={e => setEditingItem({ ...editingItem, github: e.target.value })}
                        />
                      </div>
                    )}

                    {/* Ordering and toggle switches */}
                    <div className="col-6 col-md-3">
                      <label className="form-label text-muted-custom small mb-1">Index Weight (Sort Order)</label>
                      <input 
                        type="number" 
                        className="form-control-custom"
                        value={editingItem.orderIndex}
                        onChange={e => setEditingItem({ ...editingItem, orderIndex: parseInt(e.target.value) || 0 })}
                      />
                    </div>

                    <div className="col-6 col-md-3 d-flex align-items-end mb-2">
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          id="isEnabledSwitch"
                          checked={editingItem.isEnabled === 1 || editingItem.isEnabled === undefined}
                          onChange={e => setEditingItem({ ...editingItem, isEnabled: e.target.checked ? 1 : 0 })}
                        />
                        <label className="form-check-label text-muted-custom small" htmlFor="isEnabledSwitch">
                          Enable Record
                        </label>
                      </div>
                    </div>

                  </div>

                  {/* Form Submission */}
                  <div className="d-flex justify-content-end gap-3 border-top border-secondary pt-4 mt-4">
                    <button type="button" onClick={() => setEditingItem(null)} className="btn border border-secondary text-light px-4">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-cyan px-4 d-flex align-items-center gap-2">
                      <Save size={16} />
                      Commit Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Site Settings Tab Editor */}
            {activeTab === 'settings' && (
              <div className="admin-card-glass">
                <h4 className="text-gradient mb-4">Core System Settings</h4>
                
                <form onSubmit={handleSaveSettings}>
                  <div className="row g-3">
                    {Object.entries(settingsData).map(([key, value]) => (
                      <div className="col-12 col-md-6" key={key}>
                        <label className="form-label text-muted-custom small mb-1 font-monospace">{key}</label>
                        <input 
                          type="text" 
                          className="form-control-custom"
                          value={value}
                          onChange={e => setSettingsData({ ...settingsData, [key]: e.target.value })}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="d-flex justify-content-end mt-4 border-top border-secondary pt-4">
                    <button type="submit" className="btn btn-cyan px-4 d-flex align-items-center gap-2">
                      <Save size={16} />
                      Save System Settings
                    </button>
                  </div>
                </form>

                <hr className="my-4" />

                <h5 className="text-gradient mb-3">Change Admin Password</h5>
                {pwdError && <div className="alert alert-danger py-2">{pwdError}</div>}
                {pwdSuccess && <div className="alert alert-success py-2">{pwdSuccess}</div>}
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setPwdLoading(true); setPwdError(null); setPwdSuccess(null);
                  try {
                    const res = await api.admin.changePassword(currentPasswordInput, newPasswordInput);
                    if (!res || res.error) throw new Error(res?.error || 'Failed to change password');
                    setPwdSuccess(res.message || 'Password changed successfully');
                    setCurrentPasswordInput(''); setNewPasswordInput('');
                  } catch (err) {
                    setPwdError(err.message || 'Failed to change password');
                  } finally { setPwdLoading(false); }
                }}>
                  <div className="mb-3">
                    <label className="form-label text-muted-custom small mb-1">Current Password</label>
                    <input type="password" className="form-control form-control-custom" value={currentPasswordInput} onChange={e => setCurrentPasswordInput(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted-custom small mb-1">New Password</label>
                    <input type="password" className="form-control form-control-custom" value={newPasswordInput} onChange={e => setNewPasswordInput(e.target.value)} required />
                  </div>
                  <div className="d-flex justify-content-end mt-2">
                    <button type="submit" className="btn btn-outline-cyan px-4" disabled={pwdLoading}>{pwdLoading ? 'Updating...' : 'Change Password'}</button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;