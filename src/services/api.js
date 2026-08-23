const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Optional Firebase-backed implementations
import * as fb from './firebaseService';
const USE_FIREBASE = import.meta.env.VITE_USE_FIREBASE === 'true';

// Helper for authenticated headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  // --- PUBLIC API ENDPOINTS ---
  public: {
    async getServices() {
      const res = await fetch(`${API_BASE_URL}/public/services`);
      if (!res.ok) throw new Error('Failed to fetch services');
      return res.json();
    },
    async getProducts() {
      const res = await fetch(`${API_BASE_URL}/public/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
    async getProjects() {
      const res = await fetch(`${API_BASE_URL}/public/projects`);
      if (!res.ok) throw new Error('Failed to fetch portfolio projects');
      return res.json();
    },
    async getEvents() {
      const res = await fetch(`${API_BASE_URL}/public/events`);
      if (!res.ok) throw new Error('Failed to fetch events');
      return res.json();
    },
    async getGallery() {
      const res = await fetch(`${API_BASE_URL}/public/gallery`);
      if (!res.ok) throw new Error('Failed to fetch gallery items');
      return res.json();
    },
    async getTestimonials() {
      const res = await fetch(`${API_BASE_URL}/public/testimonials`);
      if (!res.ok) throw new Error('Failed to fetch testimonials');
      return res.json();
    },
    async getFAQ() {
      const res = await fetch(`${API_BASE_URL}/public/faq`);
      if (!res.ok) throw new Error('Failed to fetch FAQs');
      return res.json();
    },
    async getTeam() {
      const res = await fetch(`${API_BASE_URL}/public/team`);
      if (!res.ok) throw new Error('Failed to fetch team members');
      return res.json();
    },
    async getStatistics() {
      const res = await fetch(`${API_BASE_URL}/public/statistics`);
      if (!res.ok) throw new Error('Failed to fetch statistics');
      return res.json();
    },
    async getStats() {
      return this.getStatistics();
    },
    async getInternships() {
      const res = await fetch(`${API_BASE_URL}/public/internships`);
      if (!res.ok) throw new Error('Failed to fetch internship tracks');
      return res.json();
    },
    async getSettings() {
      const res = await fetch(`${API_BASE_URL}/public/settings`);
      if (!res.ok) throw new Error('Failed to fetch settings');
      return res.json();
    },
    async submitContact(data) {
      const firestorePromise = fb.submitContactToFirestore(data).catch(err => console.warn('Client Firestore save notice:', err.message));
      const res = await fetch(`${API_BASE_URL}/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      await firestorePromise;
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to submit query');
      }
      return res.json();
    }
  },

  // --- ADMIN API ENDPOINTS (AUTHENTICATED) ---
  admin: {
    async login(username, password) {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid credentials');
      
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      return data;
    },
    logout() {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    },
    isLoggedIn() {
      return !!localStorage.getItem('admin_token');
    },
    async getStats() {
      const res = await fetch(`${API_BASE_URL}/admin/stats`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Unauthorized');
      return res.json();
    },
    
    // Media Upload
    async uploadFile(file) {
      if (USE_FIREBASE) {
        // returns { url }
        return fb.uploadFileToStorage(file);
      }
      const formData = new FormData();
      formData.append('file', file);
      
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload file');
      return data;
    },

    // Contact Inquiries
    async getContacts() {
      if (USE_FIREBASE) return fb.getContactsFromFirestore();
      const res = await fetch(`${API_BASE_URL}/admin/contacts`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Unauthorized');
      return res.json();
    },
    async updateContactStatus(id, status) {
      if (USE_FIREBASE) return fb.updateContactStatusInFirestore(id, status);
      const res = await fetch(`${API_BASE_URL}/admin/contacts/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Failed to update status');
      return res.json();
    },
    async deleteContact(id) {
      const firestorePromise = fb.deleteContactFromFirestore(id).catch(err => console.warn('Client Firestore delete notice:', err.message));
      const res = await fetch(`${API_BASE_URL}/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      await firestorePromise;
      if (!res.ok) throw new Error('Failed to delete contact');
      return res.json();
    },

    // Services CRUD
    async getServices() {
      const res = await fetch(`${API_BASE_URL}/admin/services`, { headers: getAuthHeaders() });
      return res.json();
    },
    async createService(data) {
      const res = await fetch(`${API_BASE_URL}/admin/services`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async updateService(id, data) {
      const res = await fetch(`${API_BASE_URL}/admin/services/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async deleteService(id) {
      const res = await fetch(`${API_BASE_URL}/admin/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    },

    // Products CRUD
    async getProducts() {
      const res = await fetch(`${API_BASE_URL}/admin/products`, { headers: getAuthHeaders() });
      return res.json();
    },
    async createProduct(data) {
      const res = await fetch(`${API_BASE_URL}/admin/products`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async updateProduct(id, data) {
      const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async deleteProduct(id) {
      const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    },

    // Projects CRUD
    async getProjects() {
      const res = await fetch(`${API_BASE_URL}/admin/projects`, { headers: getAuthHeaders() });
      return res.json();
    },
    async createProject(data) {
      const res = await fetch(`${API_BASE_URL}/admin/projects`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async updateProject(id, data) {
      const res = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async deleteProject(id) {
      const res = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    },

    // Events CRUD
    async getEvents() {
      const res = await fetch(`${API_BASE_URL}/admin/events`, { headers: getAuthHeaders() });
      return res.json();
    },
    async createEvent(data) {
      const res = await fetch(`${API_BASE_URL}/admin/events`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async updateEvent(id, data) {
      const res = await fetch(`${API_BASE_URL}/admin/events/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async deleteEvent(id) {
      const res = await fetch(`${API_BASE_URL}/admin/events/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    },

    // Gallery CRUD
    async getGallery() {
      const res = await fetch(`${API_BASE_URL}/admin/gallery`, { headers: getAuthHeaders() });
      return res.json();
    },
    async createGalleryItem(data) {
      const res = await fetch(`${API_BASE_URL}/admin/gallery`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async updateGalleryItem(id, data) {
      const res = await fetch(`${API_BASE_URL}/admin/gallery/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async deleteGalleryItem(id) {
      const res = await fetch(`${API_BASE_URL}/admin/gallery/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    },

    // Testimonials CRUD
    async getTestimonials() {
      const res = await fetch(`${API_BASE_URL}/admin/testimonials`, { headers: getAuthHeaders() });
      return res.json();
    },
    async createTestimonial(data) {
      const res = await fetch(`${API_BASE_URL}/admin/testimonials`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async updateTestimonial(id, data) {
      const res = await fetch(`${API_BASE_URL}/admin/testimonials/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async deleteTestimonial(id) {
      const res = await fetch(`${API_BASE_URL}/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    },

    // FAQ CRUD
    async getFAQ() {
      const res = await fetch(`${API_BASE_URL}/admin/faq`, { headers: getAuthHeaders() });
      return res.json();
    },
    async createFAQ(data) {
      const res = await fetch(`${API_BASE_URL}/admin/faq`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async updateFAQ(id, data) {
      const res = await fetch(`${API_BASE_URL}/admin/faq/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async deleteFAQ(id) {
      const res = await fetch(`${API_BASE_URL}/admin/faq/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    },

    // Team CRUD
    async getTeam() {
      const res = await fetch(`${API_BASE_URL}/admin/team`, { headers: getAuthHeaders() });
      return res.json();
    },
    async createTeamMember(data) {
      const res = await fetch(`${API_BASE_URL}/admin/team`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async updateTeamMember(id, data) {
      const res = await fetch(`${API_BASE_URL}/admin/team/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async deleteTeamMember(id) {
      const res = await fetch(`${API_BASE_URL}/admin/team/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    },

    // Statistics CRUD
    async getStatistics() {
      const res = await fetch(`${API_BASE_URL}/admin/statistics`, { headers: getAuthHeaders() });
      return res.json();
    },
    async createStatistic(data) {
      const res = await fetch(`${API_BASE_URL}/admin/statistics`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async updateStatistic(id, data) {
      const res = await fetch(`${API_BASE_URL}/admin/statistics/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async deleteStatistic(id) {
      const res = await fetch(`${API_BASE_URL}/admin/statistics/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    },

    // Internships CRUD
    async getInternships() {
      const res = await fetch(`${API_BASE_URL}/admin/internships`, { headers: getAuthHeaders() });
      return res.json();
    },
    async createInternship(data) {
      const res = await fetch(`${API_BASE_URL}/admin/internships`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async updateInternship(id, data) {
      const res = await fetch(`${API_BASE_URL}/admin/internships/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    },
    async deleteInternship(id) {
      const res = await fetch(`${API_BASE_URL}/admin/internships/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return res.json();
    },

    // Settings CRUD
    async getSettings() {
      const res = await fetch(`${API_BASE_URL}/admin/settings`, { headers: getAuthHeaders() });
      return res.json();
    },
    async updateSettings(data) {
      const res = await fetch(`${API_BASE_URL}/admin/settings`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return res.json();
    }
    ,
    async changePassword(currentPassword, newPassword) {
      const res = await fetch(`${API_BASE_URL}/admin/change-password`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword })
      });
      return res.json();
    }
    ,
    async forgotPassword(username) {
      const res = await fetch(`${API_BASE_URL}/admin/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      return res.json();
    },
    async resetPassword(token, newPassword) {
      const res = await fetch(`${API_BASE_URL}/admin/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });
      return res.json();
    }
  }
};
