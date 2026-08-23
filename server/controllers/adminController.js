import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendResetEmail } from '../utils/mailer.js';
import { query } from '../db/db.js';

// --- AUTHENTICATION ---
export async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await query.get("SELECT * FROM users WHERE username = ?", [username]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'algorithm_aliens_secret_key_12345!',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- FORGOT PASSWORD (issue a reset token) ---
export async function forgotPassword(req, res) {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required' });

    const user = await query.get('SELECT * FROM users WHERE username = ?', [username]);
    if (!user) {
      // Do not reveal user existence — return generic success
      return res.json({ success: true, message: 'If the account exists, a reset token was issued' });
    }

    const token = crypto.randomBytes(24).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

    await query.run('INSERT INTO password_resets (userId, token, expiresAt) VALUES (?, ?, ?)', [user.id, token, expiresAt]);

    // Log token server-side for debugging
    console.log(`[Auth] Password reset token for user ${username}: ${token} (expires ${expiresAt})`);

    // Attempt to send email if possible. Priority: user's email (if present), then ADMIN_CONTACT_EMAIL env var.
    const recipient = user.email || process.env.ADMIN_CONTACT_EMAIL;
    if (recipient) {
      try {
        await sendResetEmail(recipient, token, { username });
      } catch (mailErr) {
        console.error('[Auth] Failed to send reset email:', mailErr);
      }
    }

    // For security, only return the token in API response when explicitly enabled via DEV_SHOW_TOKEN=true
    if (process.env.DEV_SHOW_TOKEN === 'true') {
      return res.json({ success: true, token, message: 'Development token returned. In production this is emailed.' });
    }

    return res.json({ success: true, message: 'If the account exists, password reset instructions have been sent.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- RESET PASSWORD USING TOKEN ---
export async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ error: 'Token and new password are required' });

    const row = await query.get('SELECT * FROM password_resets WHERE token = ? AND used = 0', [token]);
    if (!row) return res.status(400).json({ error: 'Invalid or used token' });

    const now = new Date();
    const expires = new Date(row.expiresAt);
    if (expires < now) return res.status(400).json({ error: 'Token expired' });

    const user = await query.get('SELECT * FROM users WHERE id = ?', [row.userId]);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(newPassword, salt);

    await query.run('UPDATE users SET passwordHash = ? WHERE id = ?', [passwordHash, user.id]);
    await query.run('UPDATE password_resets SET used = 1 WHERE id = ?', [row.id]);

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- CHANGE PASSWORD ---
export async function changePassword(req, res) {
  try {
    const userId = req.user && req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    if (!newPassword) return res.status(400).json({ error: 'New password is required' });
    if (!currentPassword) return res.status(400).json({ error: 'Current password is required' });

    const user = await query.get('SELECT * FROM users WHERE id = ?', [userId]);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = bcrypt.compareSync(currentPassword, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Current password is incorrect' });

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(newPassword, salt);

    await query.run('UPDATE users SET passwordHash = ? WHERE id = ?', [passwordHash, userId]);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- OVERVIEW STATS ---
export async function getOverviewStats(req, res) {
  try {
    const projectsCount = await query.get("SELECT COUNT(*) as count FROM projects");
    const servicesCount = await query.get("SELECT COUNT(*) as count FROM services");
    const productsCount = await query.get("SELECT COUNT(*) as count FROM products");
    const eventsCount = await query.get("SELECT COUNT(*) as count FROM events");
    const testimonialsCount = await query.get("SELECT COUNT(*) as count FROM testimonials");
    
    const newContacts = await query.get("SELECT COUNT(*) as count FROM contacts WHERE type = 'contact' AND status = 'new'");
    const newCalls = await query.get("SELECT COUNT(*) as count FROM contacts WHERE type = 'book-call' AND status = 'new'");

    res.json({
      totalProjects: projectsCount.count,
      totalServices: servicesCount.count,
      totalProducts: productsCount.count,
      totalEvents: eventsCount.count,
      totalTestimonials: testimonialsCount.count,
      newInquiries: newContacts.count,
      newConsultations: newCalls.count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- CONTACT SUBMISSIONS MANAGEMENT ---
export async function getContacts(req, res) {
  try {
    const rows = await query.all("SELECT * FROM contacts ORDER BY createdAt DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateContactStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'new', 'contacted', 'in_progress', 'closed'
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    await query.run("UPDATE contacts SET status = ? WHERE id = ?", [status, id]);
    res.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteContact(req, res) {
  try {
    const { id } = req.params;
    await query.run("DELETE FROM contacts WHERE id = ?", [id]);
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- CRUD: SERVICES ---
export async function getServices(req, res) {
  try {
    const rows = await query.all("SELECT * FROM services ORDER BY orderIndex ASC");
    const formatted = rows.map(r => ({
      ...r,
      tech: JSON.parse(r.tech),
      items: JSON.parse(r.items),
      benefits: JSON.parse(r.benefits)
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createService(req, res) {
  try {
    const { id, title, icon, description, tech, items, longDescription, benefits, isEnabled, orderIndex } = req.body;
    await query.run(
      `INSERT INTO services (id, title, icon, description, tech, items, longDescription, benefits, isEnabled, orderIndex)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, title, icon || 'Cpu', description, 
        JSON.stringify(tech || []), 
        JSON.stringify(items || []), 
        longDescription, 
        JSON.stringify(benefits || []), 
        isEnabled !== undefined ? isEnabled : 1, 
        orderIndex || 0
      ]
    );
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateService(req, res) {
  try {
    const { id } = req.params;
    const { title, icon, description, tech, items, longDescription, benefits, isEnabled, orderIndex } = req.body;
    await query.run(
      `UPDATE services 
       SET title = ?, icon = ?, description = ?, tech = ?, items = ?, longDescription = ?, benefits = ?, isEnabled = ?, orderIndex = ?
       WHERE id = ?`,
      [
        title, icon, description, 
        JSON.stringify(tech || []), 
        JSON.stringify(items || []), 
        longDescription, 
        JSON.stringify(benefits || []), 
        isEnabled !== undefined ? isEnabled : 1, 
        orderIndex || 0,
        id
      ]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteService(req, res) {
  try {
    const { id } = req.params;
    await query.run("DELETE FROM services WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- CRUD: PRODUCTS ---
export async function getProducts(req, res) {
  try {
    const rows = await query.all("SELECT * FROM products ORDER BY orderIndex ASC");
    const formatted = rows.map(r => ({
      ...r,
      features: JSON.parse(r.features),
      benefits: JSON.parse(r.benefits)
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createProduct(req, res) {
  try {
    const { id, title, tagline, description, features, benefits, image, isEnabled, orderIndex } = req.body;
    await query.run(
      `INSERT INTO products (id, title, tagline, description, features, benefits, image, isEnabled, orderIndex)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, title, tagline, description, 
        JSON.stringify(features || []), 
        JSON.stringify(benefits || []), 
        image || '', 
        isEnabled !== undefined ? isEnabled : 1, 
        orderIndex || 0
      ]
    );
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { title, tagline, description, features, benefits, image, isEnabled, orderIndex } = req.body;
    await query.run(
      `UPDATE products 
       SET title = ?, tagline = ?, description = ?, features = ?, benefits = ?, image = ?, isEnabled = ?, orderIndex = ?
       WHERE id = ?`,
      [
        title, tagline, description, 
        JSON.stringify(features || []), 
        JSON.stringify(benefits || []), 
        image, 
        isEnabled !== undefined ? isEnabled : 1, 
        orderIndex || 0,
        id
      ]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    await query.run("DELETE FROM products WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- CRUD: PROJECTS / PORTFOLIO ---
export async function getProjects(req, res) {
  try {
    const rows = await query.all("SELECT * FROM projects ORDER BY orderIndex ASC");
    const formatted = rows.map(r => ({
      ...r,
      highlights: JSON.parse(r.highlights),
      gallery: JSON.parse(r.gallery)
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createProject(req, res) {
  try {
    const { id, title, description, highlights, winners, banner, gallery, isEnabled, orderIndex } = req.body;
    await query.run(
      `INSERT INTO projects (id, title, description, highlights, winners, banner, gallery, isEnabled, orderIndex)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, title, description, 
        JSON.stringify(highlights || []), 
        winners || '', 
        banner || '', 
        JSON.stringify(gallery || []), 
        isEnabled !== undefined ? isEnabled : 1, 
        orderIndex || 0
      ]
    );
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const { title, description, highlights, winners, banner, gallery, isEnabled, orderIndex } = req.body;
    await query.run(
      `UPDATE projects 
       SET title = ?, description = ?, highlights = ?, winners = ?, banner = ?, gallery = ?, isEnabled = ?, orderIndex = ?
       WHERE id = ?`,
      [
        title, description, 
        JSON.stringify(highlights || []), 
        winners, 
        banner, 
        JSON.stringify(gallery || []), 
        isEnabled !== undefined ? isEnabled : 1, 
        orderIndex || 0,
        id
      ]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    await query.run("DELETE FROM projects WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- CRUD: EVENTS ---
export async function getEvents(req, res) {
  try {
    const rows = await query.all("SELECT * FROM events ORDER BY orderIndex ASC");
    const formatted = rows.map(r => ({
      ...r,
      highlights: JSON.parse(r.highlights),
      gallery: JSON.parse(r.gallery)
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createEvent(req, res) {
  try {
    const { id, title, year, date, description, highlights, winners, banner, gallery, isEnabled, orderIndex } = req.body;
    await query.run(
      `INSERT INTO events (id, title, year, date, description, highlights, winners, banner, gallery, isEnabled, orderIndex)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, title, year || 2026, date, description, 
        JSON.stringify(highlights || []), 
        winners || '', 
        banner || '', 
        JSON.stringify(gallery || []), 
        isEnabled !== undefined ? isEnabled : 1, 
        orderIndex || 0
      ]
    );
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    const { title, year, date, description, highlights, winners, banner, gallery, isEnabled, orderIndex } = req.body;
    await query.run(
      `UPDATE events 
       SET title = ?, year = ?, date = ?, description = ?, highlights = ?, winners = ?, banner = ?, gallery = ?, isEnabled = ?, orderIndex = ?
       WHERE id = ?`,
      [
        title, year, date, description, 
        JSON.stringify(highlights || []), 
        winners, 
        banner, 
        JSON.stringify(gallery || []), 
        isEnabled !== undefined ? isEnabled : 1, 
        orderIndex || 0,
        id
      ]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteEvent(req, res) {
  try {
    const { id } = req.params;
    await query.run("DELETE FROM events WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- CRUD: GALLERY ---
export async function getGallery(req, res) {
  try {
    const rows = await query.all("SELECT * FROM gallery ORDER BY orderIndex ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createGalleryItem(req, res) {
  try {
    const { id, title, category, type, url, description, isEnabled, orderIndex } = req.body;
    await query.run(
      `INSERT INTO gallery (id, title, category, type, url, description, isEnabled, orderIndex)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, category, type || 'image', url || '', description || '', isEnabled !== undefined ? isEnabled : 1, orderIndex || 0]
    );
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateGalleryItem(req, res) {
  try {
    const { id } = req.params;
    const { title, category, type, url, description, isEnabled, orderIndex } = req.body;
    await query.run(
      `UPDATE gallery 
       SET title = ?, category = ?, type = ?, url = ?, description = ?, isEnabled = ?, orderIndex = ?
       WHERE id = ?`,
      [title, category, type, url, description, isEnabled !== undefined ? isEnabled : 1, orderIndex || 0, id]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteGalleryItem(req, res) {
  try {
    const { id } = req.params;
    await query.run("DELETE FROM gallery WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- CRUD: TESTIMONIALS ---
export async function getTestimonials(req, res) {
  try {
    const rows = await query.all("SELECT * FROM testimonials ORDER BY orderIndex ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createTestimonial(req, res) {
  try {
    const { id, name, role, category, rating, feedback, photo, isEnabled, orderIndex } = req.body;
    await query.run(
      `INSERT INTO testimonials (id, name, role, category, rating, feedback, photo, isEnabled, orderIndex)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, role, category, rating || 5, feedback, photo || '', isEnabled !== undefined ? isEnabled : 1, orderIndex || 0]
    );
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateTestimonial(req, res) {
  try {
    const { id } = req.params;
    const { name, role, category, rating, feedback, photo, isEnabled, orderIndex } = req.body;
    await query.run(
      `UPDATE testimonials 
       SET name = ?, role = ?, category = ?, rating = ?, feedback = ?, photo = ?, isEnabled = ?, orderIndex = ?
       WHERE id = ?`,
      [name, role, category, rating, feedback, photo, isEnabled !== undefined ? isEnabled : 1, orderIndex || 0, id]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteTestimonial(req, res) {
  try {
    const { id } = req.params;
    await query.run("DELETE FROM testimonials WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- CRUD: FAQ ---
export async function getFAQ(req, res) {
  try {
    const rows = await query.all("SELECT * FROM faq ORDER BY orderIndex ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createFAQ(req, res) {
  try {
    const { id, question, answer, isEnabled, orderIndex } = req.body;
    await query.run(
      `INSERT INTO faq (id, question, answer, isEnabled, orderIndex)
       VALUES (?, ?, ?, ?, ?)`,
      [id, question, answer, isEnabled !== undefined ? isEnabled : 1, orderIndex || 0]
    );
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateFAQ(req, res) {
  try {
    const { id } = req.params;
    const { question, answer, isEnabled, orderIndex } = req.body;
    await query.run(
      `UPDATE faq SET question = ?, answer = ?, isEnabled = ?, orderIndex = ? WHERE id = ?`,
      [question, answer, isEnabled !== undefined ? isEnabled : 1, orderIndex || 0, id]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteFAQ(req, res) {
  try {
    const { id } = req.params;
    await query.run("DELETE FROM faq WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- CRUD: TEAM ---
export async function getTeam(req, res) {
  try {
    const rows = await query.all("SELECT * FROM team ORDER BY orderIndex ASC");
    const formatted = rows.map(r => ({
      ...r,
      social: {
        linkedin: r.linkedin,
        twitter: r.twitter,
        github: r.github
      }
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createTeamMember(req, res) {
  try {
    const { id, name, role, bio, photo, linkedin, twitter, github, isEnabled, orderIndex } = req.body;
    await query.run(
      `INSERT INTO team (id, name, role, bio, photo, linkedin, twitter, github, isEnabled, orderIndex)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, role, bio, photo || '', linkedin || '', twitter || '', github || '', isEnabled !== undefined ? isEnabled : 1, orderIndex || 0]
    );
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateTeamMember(req, res) {
  try {
    const { id } = req.params;
    const { name, role, bio, photo, linkedin, twitter, github, isEnabled, orderIndex } = req.body;
    await query.run(
      `UPDATE team 
       SET name = ?, role = ?, bio = ?, photo = ?, linkedin = ?, twitter = ?, github = ?, isEnabled = ?, orderIndex = ?
       WHERE id = ?`,
      [name, role, bio, photo, linkedin, twitter, github, isEnabled !== undefined ? isEnabled : 1, orderIndex || 0, id]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteTeamMember(req, res) {
  try {
    const { id } = req.params;
    await query.run("DELETE FROM team WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- CRUD: STATISTICS ---
export async function getStatistics(req, res) {
  try {
    const rows = await query.all("SELECT * FROM statistics ORDER BY orderIndex ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createStatistic(req, res) {
  try {
    const { id, value, suffix, label, description, isEnabled, orderIndex } = req.body;
    await query.run(
      `INSERT INTO statistics (id, value, suffix, label, description, isEnabled, orderIndex)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, value || 0, suffix || '', label, description || '', isEnabled !== undefined ? isEnabled : 1, orderIndex || 0]
    );
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateStatistic(req, res) {
  try {
    const { id } = req.params;
    const { value, suffix, label, description, isEnabled, orderIndex } = req.body;
    await query.run(
      `UPDATE statistics 
       SET value = ?, suffix = ?, label = ?, description = ?, isEnabled = ?, orderIndex = ?
       WHERE id = ?`,
      [value, suffix, label, description, isEnabled !== undefined ? isEnabled : 1, orderIndex || 0, id]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteStatistic(req, res) {
  try {
    const { id } = req.params;
    await query.run("DELETE FROM statistics WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- CRUD: INTERNSHIPS ---
export async function getInternships(req, res) {
  try {
    const rows = await query.all("SELECT * FROM internships ORDER BY orderIndex ASC");
    const formatted = rows.map(r => ({
      ...r,
      skills: JSON.parse(r.skills)
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createInternship(req, res) {
  try {
    const { id, title, description, duration, skills, isEnabled, orderIndex } = req.body;
    await query.run(
      `INSERT INTO internships (id, title, description, duration, skills, isEnabled, orderIndex)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, title, description, duration, JSON.stringify(skills || []), isEnabled !== undefined ? isEnabled : 1, orderIndex || 0]
    );
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateInternship(req, res) {
  try {
    const { id } = req.params;
    const { title, description, duration, skills, isEnabled, orderIndex } = req.body;
    await query.run(
      `UPDATE internships 
       SET title = ?, description = ?, duration = ?, skills = ?, isEnabled = ?, orderIndex = ?
       WHERE id = ?`,
      [title, description, duration, JSON.stringify(skills || []), isEnabled !== undefined ? isEnabled : 1, orderIndex || 0, id]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteInternship(req, res) {
  try {
    const { id } = req.params;
    await query.run("DELETE FROM internships WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// --- UPDATE SETTINGS ---
export async function getSettings(req, res) {
  try {
    const rows = await query.all("SELECT * FROM settings");
    const settingsMap = {};
    rows.forEach(r => {
      settingsMap[r.key] = r.value;
    });
    res.json(settingsMap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateSettings(req, res) {
  try {
    const settings = req.body; // Key-Value map
    for (const [key, value] of Object.entries(settings)) {
      await query.run(
        `INSERT INTO settings (key, value) VALUES (?, ?)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
        [key, String(value)]
      );
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
