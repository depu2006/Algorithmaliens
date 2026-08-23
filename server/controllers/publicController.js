import { query } from '../db/db.js';
import { saveToFirestore } from '../db/firebaseAdmin.js';

export async function getServices(req, res) {
  try {
    const rows = await query.all("SELECT * FROM services WHERE isEnabled = 1 ORDER BY orderIndex ASC");
    // Parse JSON arrays
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

export async function getProducts(req, res) {
  try {
    const rows = await query.all("SELECT * FROM products WHERE isEnabled = 1 ORDER BY orderIndex ASC");
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

export async function getProjects(req, res) {
  try {
    const rows = await query.all("SELECT * FROM projects WHERE isEnabled = 1 ORDER BY orderIndex ASC");
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

export async function getEvents(req, res) {
  try {
    const rows = await query.all("SELECT * FROM events WHERE isEnabled = 1 ORDER BY orderIndex ASC");
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

export async function getGallery(req, res) {
  try {
    const rows = await query.all("SELECT * FROM gallery WHERE isEnabled = 1 ORDER BY orderIndex ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getTestimonials(req, res) {
  try {
    const rows = await query.all("SELECT * FROM testimonials WHERE isEnabled = 1 ORDER BY orderIndex ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getFAQ(req, res) {
  try {
    const rows = await query.all("SELECT * FROM faq WHERE isEnabled = 1 ORDER BY orderIndex ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getTeam(req, res) {
  try {
    const rows = await query.all("SELECT * FROM team WHERE isEnabled = 1 ORDER BY orderIndex ASC");
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

export async function getStatistics(req, res) {
  try {
    const rows = await query.all("SELECT * FROM statistics WHERE isEnabled = 1 ORDER BY orderIndex ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getInternships(req, res) {
  try {
    const rows = await query.all("SELECT * FROM internships WHERE isEnabled = 1 ORDER BY orderIndex ASC");
    const formatted = rows.map(r => ({
      ...r,
      skills: JSON.parse(r.skills)
    }));
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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

export async function submitContact(req, res) {
  try {
    const { name, email, phone, subject, message, type, company, service, projectDescription } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required' });
    }

    const submissionType = type || 'contact'; // 'contact' or 'book-call' or 'newsletter'

    const result = await query.run(
      `INSERT INTO contacts (name, email, phone, subject, company, service, projectDescription, message, type, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
      [
        name,
        email,
        phone || '',
        subject || '',
        company || null,
        service || null,
        projectDescription || null,
        message,
        submissionType
      ]
    );

    const contactData = {
      id: result.id,
      name,
      email,
      phone: phone || '',
      subject: subject || '',
      company: company || null,
      service: service || null,
      projectDescription: projectDescription || null,
      message,
      type: submissionType,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    // Dual-write to Firebase Firestore
    saveToFirestore('contacts', result.id, contactData);

    res.json({ success: true, message: 'Your message was submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

