import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { initDb } from './db/db.js';
import { authenticateToken, authorizeAdmin } from './middleware/auth.js';
import * as publicCtrl from './controllers/publicController.js';
import * as adminCtrl from './controllers/adminController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup CORS
app.use(cors({
  origin: '*', // In development, allow all. You can restrict this to the frontend URL later.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Combined admin authentication + authorization middleware
const adminAuth = [authenticateToken, authorizeAdmin];

// Ensure uploads folder exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// --- MULTER FILE UPLOAD SETUP ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, 'img-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only images (jpg, jpeg, png, webp, gif) are allowed!'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Upload route
app.post('/api/upload', adminAuth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Construct the URL dynamically based on host
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({
    success: true,
    url: fileUrl,
    filename: req.file.filename
  });
});

// Error handling for Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});


// --- PUBLIC ROUTES ---
app.get('/api/public/services', publicCtrl.getServices);
app.get('/api/public/products', publicCtrl.getProducts);
app.get('/api/public/projects', publicCtrl.getProjects);
app.get('/api/public/events', publicCtrl.getEvents);
app.get('/api/public/gallery', publicCtrl.getGallery);
app.get('/api/public/testimonials', publicCtrl.getTestimonials);
app.get('/api/public/faq', publicCtrl.getFAQ);
app.get('/api/public/team', publicCtrl.getTeam);
app.get('/api/public/statistics', publicCtrl.getStatistics);
app.get('/api/public/internships', publicCtrl.getInternships);
app.get('/api/public/settings', publicCtrl.getSettings);
app.post('/api/public/contact', publicCtrl.submitContact);


// --- ADMIN ROUTES (AUTHENTICATED) ---
app.post('/api/admin/login', adminCtrl.login);

// Password reset flow (public)
app.post('/api/admin/forgot-password', adminCtrl.forgotPassword);
app.post('/api/admin/reset-password', adminCtrl.resetPassword);

// Protected dashboard summary & contacts
app.get('/api/admin/stats', adminAuth, adminCtrl.getOverviewStats);
app.get('/api/admin/contacts', adminAuth, adminCtrl.getContacts);
app.put('/api/admin/contacts/:id', adminAuth, adminCtrl.updateContactStatus);
app.delete('/api/admin/contacts/:id', adminAuth, adminCtrl.deleteContact);

// Protected Services
app.get('/api/admin/services', adminAuth, adminCtrl.getServices);
app.post('/api/admin/services', adminAuth, adminCtrl.createService);
app.put('/api/admin/services/:id', adminAuth, adminCtrl.updateService);
app.delete('/api/admin/services/:id', adminAuth, adminCtrl.deleteService);

// Protected Products
app.get('/api/admin/products', adminAuth, adminCtrl.getProducts);
app.post('/api/admin/products', adminAuth, adminCtrl.createProduct);
app.put('/api/admin/products/:id', adminAuth, adminCtrl.updateProduct);
app.delete('/api/admin/products/:id', adminAuth, adminCtrl.deleteProduct);

// Protected Projects/Portfolio
app.get('/api/admin/projects', adminAuth, adminCtrl.getProjects);
app.post('/api/admin/projects', adminAuth, adminCtrl.createProject);
app.put('/api/admin/projects/:id', adminAuth, adminCtrl.updateProject);
app.delete('/api/admin/projects/:id', adminAuth, adminCtrl.deleteProject);

// Protected Events
app.get('/api/admin/events', adminAuth, adminCtrl.getEvents);
app.post('/api/admin/events', adminAuth, adminCtrl.createEvent);
app.put('/api/admin/events/:id', adminAuth, adminCtrl.updateEvent);
app.delete('/api/admin/events/:id', adminAuth, adminCtrl.deleteEvent);

// Protected Gallery
app.get('/api/admin/gallery', adminAuth, adminCtrl.getGallery);
app.post('/api/admin/gallery', adminAuth, adminCtrl.createGalleryItem);
app.put('/api/admin/gallery/:id', adminAuth, adminCtrl.updateGalleryItem);
app.delete('/api/admin/gallery/:id', adminAuth, adminCtrl.deleteGalleryItem);

// Protected Testimonials
app.get('/api/admin/testimonials', adminAuth, adminCtrl.getTestimonials);
app.post('/api/admin/testimonials', adminAuth, adminCtrl.createTestimonial);
app.put('/api/admin/testimonials/:id', adminAuth, adminCtrl.updateTestimonial);
app.delete('/api/admin/testimonials/:id', adminAuth, adminCtrl.deleteTestimonial);

// Protected FAQ
app.get('/api/admin/faq', adminAuth, adminCtrl.getFAQ);
app.post('/api/admin/faq', adminAuth, adminCtrl.createFAQ);
app.put('/api/admin/faq/:id', adminAuth, adminCtrl.updateFAQ);
app.delete('/api/admin/faq/:id', adminAuth, adminCtrl.deleteFAQ);

// Protected Team
app.get('/api/admin/team', adminAuth, adminCtrl.getTeam);
app.post('/api/admin/team', adminAuth, adminCtrl.createTeamMember);
app.put('/api/admin/team/:id', adminAuth, adminCtrl.updateTeamMember);
app.delete('/api/admin/team/:id', adminAuth, adminCtrl.deleteTeamMember);

// Protected Statistics
app.get('/api/admin/statistics', adminAuth, adminCtrl.getStatistics);
app.post('/api/admin/statistics', adminAuth, adminCtrl.createStatistic);
app.put('/api/admin/statistics/:id', adminAuth, adminCtrl.updateStatistic);
app.delete('/api/admin/statistics/:id', adminAuth, adminCtrl.deleteStatistic);

// Protected Internships
app.get('/api/admin/internships', adminAuth, adminCtrl.getInternships);
app.post('/api/admin/internships', adminAuth, adminCtrl.createInternship);
app.put('/api/admin/internships/:id', adminAuth, adminCtrl.updateInternship);
app.delete('/api/admin/internships/:id', adminAuth, adminCtrl.deleteInternship);

// Protected Settings
app.get('/api/admin/settings', adminAuth, adminCtrl.getSettings);
app.put('/api/admin/settings', adminAuth, adminCtrl.updateSettings);

// Admin change password
app.put('/api/admin/change-password', adminAuth, adminCtrl.changePassword);


// Start server and initialize DB
dbInitAndStart();

async function dbInitAndStart() {
  try {
    console.log('[DB] Connecting and initializing SQLite database...');
    await initDb();
    console.log('[DB] Database initialized successfully.');

    const server = app.listen(PORT, () => {
      console.log(`[Server] Express API server running on port ${PORT}`);
      console.log(`[Server] API base: http://localhost:${PORT}/api`);
    });

    // Handle port already in use — kill old process and retry
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`\n[Server] Port ${PORT} is already in use.`);
        console.log(`[Server] Attempting to free port ${PORT}...`);

        import('child_process').then(({ execSync }) => {
          try {
            if (process.platform === 'win32') {
              // Windows: find and kill the PID using the port
              const result = execSync(`netstat -ano | findstr :${PORT}`).toString();
              const lines = result.trim().split('\n');
              const pids = new Set();
              lines.forEach(line => {
                const parts = line.trim().split(/\s+/);
                const pid = parts[parts.length - 1];
                if (pid && pid !== '0') pids.add(pid);
              });
              pids.forEach(pid => {
                try {
                  execSync(`taskkill /PID ${pid} /F`);
                  console.log(`[Server] Killed process PID ${pid}`);
                } catch (_) {}
              });
            } else {
              // Linux/Mac
              execSync(`fuser -k ${PORT}/tcp`);
            }

            // Small delay then retry
            setTimeout(() => {
              console.log(`[Server] Retrying on port ${PORT}...`);
              app.listen(PORT, () => {
                console.log(`[Server] Express API server running on port ${PORT}`);
                console.log(`[Server] API base: http://localhost:${PORT}/api`);
              });
            }, 1000);
          } catch (killErr) {
            console.error('[Server] Could not free port automatically. Please close the other process manually.');
            process.exit(1);
          }
        });
      } else {
        console.error('[Server] Server error:', err);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('[Server] Failed to initialize database and start server:', error);
    process.exit(1);
  }
}
