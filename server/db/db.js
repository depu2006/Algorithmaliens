import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const DB_FILE = path.join(process.cwd(), 'database.sqlite');
const db = new sqlite3.Database(DB_FILE);

// Promisify DB methods
export const query = {
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  },
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  exec(sql) {
    return new Promise((resolve, reject) => {
      db.exec(sql, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
};

export async function initDb() {
  // 1. Create Tables
  await query.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await query.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      icon TEXT NOT NULL,
      description TEXT NOT NULL,
      tech TEXT NOT NULL,          -- JSON array of strings
      items TEXT NOT NULL,         -- JSON array of strings (deliverables)
      longDescription TEXT NOT NULL,
      benefits TEXT NOT NULL,      -- JSON array of strings
      isEnabled INTEGER DEFAULT 1,
      orderIndex INTEGER DEFAULT 0
    );
  `);

  await query.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      tagline TEXT NOT NULL,
      description TEXT NOT NULL,
      features TEXT NOT NULL,      -- JSON array of strings
      benefits TEXT NOT NULL,      -- JSON array of strings
      image TEXT NOT NULL,
      isEnabled INTEGER DEFAULT 1,
      orderIndex INTEGER DEFAULT 0
    );
  `);

  await query.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      highlights TEXT NOT NULL,    -- JSON array of strings
      winners TEXT,
      banner TEXT NOT NULL,
      gallery TEXT NOT NULL,       -- JSON array of strings
      isEnabled INTEGER DEFAULT 1,
      orderIndex INTEGER DEFAULT 0
    );
  `);

  await query.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      year INTEGER NOT NULL,
      date TEXT NOT NULL,
      description TEXT NOT NULL,
      highlights TEXT NOT NULL,    -- JSON array of strings
      winners TEXT,
      banner TEXT NOT NULL,
      gallery TEXT NOT NULL,       -- JSON array of strings
      isEnabled INTEGER DEFAULT 1,
      orderIndex INTEGER DEFAULT 0
    );
  `);

  await query.exec(`
    CREATE TABLE IF NOT EXISTS gallery (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'image',
      url TEXT NOT NULL,
      description TEXT NOT NULL,
      isEnabled INTEGER DEFAULT 1,
      orderIndex INTEGER DEFAULT 0
    );
  `);

  await query.exec(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      category TEXT NOT NULL,      -- 'client', 'internship', 'training', 'event'
      rating INTEGER DEFAULT 5,
      feedback TEXT NOT NULL,
      photo TEXT NOT NULL,
      isEnabled INTEGER DEFAULT 1,
      orderIndex INTEGER DEFAULT 0
    );
  `);

  await query.exec(`
    CREATE TABLE IF NOT EXISTS faq (
      id TEXT PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      isEnabled INTEGER DEFAULT 1,
      orderIndex INTEGER DEFAULT 0
    );
  `);

  await query.exec(`
    CREATE TABLE IF NOT EXISTS team (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      bio TEXT NOT NULL,
      photo TEXT NOT NULL,
      linkedin TEXT,
      twitter TEXT,
      github TEXT,
      isEnabled INTEGER DEFAULT 1,
      orderIndex INTEGER DEFAULT 0
    );
  `);

  await query.exec(`
    CREATE TABLE IF NOT EXISTS statistics (
      id TEXT PRIMARY KEY,
      value INTEGER NOT NULL,
      suffix TEXT NOT NULL,
      label TEXT NOT NULL,
      description TEXT NOT NULL,
      isEnabled INTEGER DEFAULT 1,
      orderIndex INTEGER DEFAULT 0
    );
  `);

  await query.exec(`
    CREATE TABLE IF NOT EXISTS internships (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      duration TEXT NOT NULL,
      skills TEXT NOT NULL,        -- JSON array of strings
      isEnabled INTEGER DEFAULT 1,
      orderIndex INTEGER DEFAULT 0
    );
  `);

  await query.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  await query.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      subject TEXT NOT NULL,
      company TEXT,
      service TEXT,
      projectDescription TEXT,
      message TEXT NOT NULL,
      type TEXT NOT NULL,          -- 'contact' or 'book-call'
      status TEXT NOT NULL DEFAULT 'new', -- 'new', 'contacted', 'in_progress', 'closed'
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Ensure optional contact columns exist (for migrations on existing DBs)
  const existingCols = await query.all("PRAGMA table_info(contacts);");
  const colNames = existingCols.map(c => c.name);
  if (!colNames.includes('company')) {
    await query.run("ALTER TABLE contacts ADD COLUMN company TEXT;");
  }
  // Add useful index for frequent admin queries
  await query.exec(`
    CREATE INDEX IF NOT EXISTS idx_contacts_status_createdAt ON contacts(status, createdAt);
  `);
  if (!colNames.includes('service')) {
    await query.run("ALTER TABLE contacts ADD COLUMN service TEXT;");
  }
  if (!colNames.includes('projectDescription')) {
    await query.run("ALTER TABLE contacts ADD COLUMN projectDescription TEXT;");
  }

  await query.exec(`
    CREATE TABLE IF NOT EXISTS password_resets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      token TEXT NOT NULL,
      expiresAt DATETIME NOT NULL,
      used INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Seed Admin User
  const defaultAdminUsername = process.env.ADMIN_DEFAULT_USERNAME || "info@algorithmaliens.com";
  
  // Migrate legacy 'admin' username to 'info@algorithmaliens.com' if present
  const legacyAdmin = await query.get("SELECT * FROM users WHERE username = ?", ["admin"]);
  if (legacyAdmin) {
    await query.run("UPDATE users SET username = ? WHERE id = ?", [defaultAdminUsername, legacyAdmin.id]);
    console.log(`[DB] Updated legacy admin username to ${defaultAdminUsername}`);
  }

  const adminExists = await query.get("SELECT * FROM users WHERE username = ?", [defaultAdminUsername]);
  if (!adminExists) {
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "admin123";
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(defaultPassword, salt);
    await query.run(
      "INSERT INTO users (username, passwordHash, role) VALUES (?, ?, ?)",
      [defaultAdminUsername, passwordHash, "admin"]
    );
    console.log(`[DB] Seeded default admin user (username: ${defaultAdminUsername}).`);
  }

  // 3. Seed dynamic content tables if empty
  await seedTableIfEmpty('services', [
    {
      id: "web-development",
      title: "Website Development",
      icon: "Cpu",
      description: "Marketing sites, portfolios, e-commerce and custom web apps.",
      tech: JSON.stringify(["React.js", "Next.js", "Webflow", "WordPress", "Tailwind CSS", "Node.js"]),
      items: JSON.stringify(["Business Websites", "Portfolio Websites", "E-Commerce Websites", "Custom Web Applications"]),
      longDescription: "From marketing sites to custom web apps engineered for speed, SEO and conversion. We build responsive, fast-loading, and secure websites that help you grow your business and establish a strong online presence.",
      benefits: JSON.stringify([
        "90+ Lighthouse scores for extreme loading speeds.",
        "SEO-ready architecture to grow organic search traffic.",
        "Pixel-perfect responsive design across desktops, tablets, and phones.",
        "Custom Content Management System (CMS) integrations."
      ]),
      orderIndex: 1
    },
    {
      id: "mobile-development",
      title: "Mobile App Development",
      icon: "Smartphone",
      description: "Native Android, iOS and cross-platform apps.",
      tech: JSON.stringify(["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "App Store Connect"]),
      items: JSON.stringify(["Android Apps", "iOS Apps", "Cross Platform Apps", "App Store Launch"]),
      longDescription: "Native and cross-platform mobile apps that feel premium and scale to millions. We design and develop mobile interfaces with smooth animations, offline-first local data syncing, and native hardware integrations.",
      benefits: JSON.stringify([
        "One codebase, two platforms with React Native or Flutter.",
        "Offline-first local database caching for uninterrupted operations.",
        "Push notifications campaigns setup to increase user retention.",
        "Fully integrated analytics tracking dashboards."
      ]),
      orderIndex: 2
    },
    {
      id: "ai-automation",
      title: "AI Automation",
      icon: "Sparkles",
      description: "Chatbots, voice agents and workflow automation.",
      tech: JSON.stringify(["OpenAI API", "LangChain", "n8n", "Make.com", "Vector DBs", "Python"]),
      items: JSON.stringify(["AI Chatbots", "AI Assistants", "Voice Agents", "Workflow Automation"]),
      longDescription: "AI agents, chatbots and workflow automation that actually move business metrics. We integrate state-of-the-art Large Language Models (LLMs) and robotic process automations directly into your active Slack, WhatsApp, or email workflows.",
      benefits: JSON.stringify([
        "24/7 automated support handling up to 90% of user queries.",
        "40+ hours saved per week by automating repetitive entry tasks.",
        "Instant lead scoring and response triggers.",
        "Drastically reduced operational overhead costs."
      ]),
      orderIndex: 3
    },
    {
      id: "custom-software",
      title: "Custom Software Solutions",
      icon: "Terminal",
      description: "SaaS platforms, enterprise apps and internal tools.",
      tech: JSON.stringify(["Node.js", "Express", "PostgreSQL", "React", "Docker", "AWS Essentials"]),
      items: JSON.stringify(["Enterprise Applications", "SaaS Platforms", "Internal Tools", "API Platforms"]),
      longDescription: "SaaS platforms, internal tools and enterprise systems engineered for scale. We design robust database schemas, secure RESTful APIs, and responsive management consoles to streamline your team's coordination and service management.",
      benefits: JSON.stringify([
        "Multi-tenant ready SaaS architecture built for subscription products.",
        "SOC-friendly secure server structures and encryptions.",
        "Detailed audit logging and activity tracking mechanisms.",
        "Granular Role-Based Access Control (RBAC) permissions."
      ]),
      orderIndex: 4
    }
  ]);

  await seedTableIfEmpty('products', [
    {
      id: "academy",
      title: "AlgorithmAliens Academy",
      tagline: "Learn. Build Products. Get Certified.",
      description: "An elite training and career-building platform designed to bridge the gap between classroom theories and real-world software engineering. Learn to design database structures, write production API routers, and ship front-end layouts under the guidance of active developers.",
      features: JSON.stringify(["Technical Courses", "Hands-on Workshops", "Industry-Recognized Certifications", "Guaranteed Internships", "Personalized Skill Development"]),
      benefits: JSON.stringify([
        "1-on-1 Mentorship from Senior Engineers",
        "Work on Live Industry Projects",
        "Dedicated Career Guidance & Placement Assistance"
      ]),
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
      orderIndex: 1
    },
    {
      id: "anx-clubs",
      title: "ANX Clubs",
      tagline: "Student Innovation Community",
      description: "A vibrant community ecosystem empowering students to lead, collaborate, code, and turn innovative ideas into fully functional startups. We set up student tech chapters in partner universities, organizing national hackathons, code sprints, and technical exhibitions.",
      features: JSON.stringify(["Coding Communities", "Technical Clubs in Colleges", "Innovation Programs", "Exclusive Hackathons", "Weekly Tech Workshops"]),
      benefits: JSON.stringify([
        "High-Value Professional Networking",
        "Leadership Opportunities in Student Chapters",
        "Building Real Open Source & Commercial Projects"
      ]),
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80",
      orderIndex: 2
    }
  ]);

  await seedTableIfEmpty('projects', [
    {
      id: "hack-it",
      title: "Hack It On Platform",
      description: "Annual hackathon registration and judging platform with live leaderboards, automated submission reviews, and real-time team matching systems.",
      highlights: JSON.stringify(["500+ Active Submissions", "Automated GitHub verification", "Collaborative judge grading panels"]),
      winners: "Team VoidLoop (1st Place), Team CipherX (2nd Place)",
      banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400"
      ]),
      orderIndex: 1
    },
    {
      id: "voice-agent",
      title: "AI Voice Agent",
      description: "Inbound voice agent answering, routing, and qualifying support calls 24/7 with human-like latency and natural language understanding.",
      highlights: JSON.stringify(["24/7 call management", "Under 1s voice response latency", "Integrates directly with CRM tables"]),
      winners: "Operational Deployment",
      banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400",
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400"
      ]),
      orderIndex: 2
    },
    {
      id: "team-control",
      title: "Team Control App",
      description: "Enterprise project tracking dashboard allowing coordinators to allocate tasks, track milestones, and view sprint velocity charts.",
      highlights: JSON.stringify(["Agile sprint charts", "Real-time socket alerts", "Integrated timesheets module"]),
      winners: "Proprietary Software",
      banner: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400"
      ]),
      orderIndex: 3
    }
  ]);

  await seedTableIfEmpty('events', [
    {
      id: "hack-it-on-2025",
      title: "Hack It On 2025",
      year: 2025,
      date: "September 12-14, 2025",
      description: "A flagship 48-hour national hackathon bringing together builders, designers, and innovators to create solutions for global challenges.",
      highlights: JSON.stringify([
        "500+ Participants across the country",
        "Mentorship from Top Tech Leaders",
        "Cash Prizes worth $10,000",
        "Tracks in Web3, AI/ML, and Sustainable Tech"
      ]),
      winners: "Team VoidLoop (1st Place), Team CipherX (2nd Place), Team CyberNova (3rd Place)",
      banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400"
      ]),
      orderIndex: 1
    },
    {
      id: "code-crack",
      title: "Code Crack",
      year: 2025,
      date: "November 22, 2025",
      description: "An intense competitive programming contest designed to challenge algorithmic thinking and problem-solving skills under tight time constraints.",
      highlights: JSON.stringify([
        "Over 1000 contestants online & offline",
        "10 complex algorithmic problems to solve in 3 hours",
        "Supported by top coding platforms",
        "Direct interviews for top performers"
      ]),
      winners: "Amit Sharma (Rank 1), Priyanjali Sen (Rank 2), Rohan Das (Rank 3)",
      banner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
        "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400"
      ]),
      orderIndex: 2
    },
    {
      id: "aarohan-aethronix-2026",
      title: "Aarohan Aethronix 2026",
      year: 2026,
      date: "February 18-20, 2026",
      description: "Algorithm Aliens proudly sponsored Aethronix 2026, a national-level hackathon hosted at MVSR Engineering College. The event brought together aspiring innovators and developers to build impactful solutions, fostering creativity, collaboration, and technological excellence.",
      highlights: JSON.stringify([
        "Sponsored national-level hackathon at MVSR College",
        "Hardware Prototype Exhibition",
        "Robo-Wars and drone racing events",
        "Collaborative project displays with engineering universities"
      ]),
      winners: "Project AgroBot (Best Hardware Innovation), Project AeroGlide (Runner Up)",
      banner: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
        "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400",
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400"
      ]),
      orderIndex: 3
    }
  ]);

  // Migration: remove unwanted gallery items from live DB
  const unwantedGalleryIds = ['g4', 'g5', 'g6', 'g7', 'g8'];
  for (const id of unwantedGalleryIds) {
    await query.run('DELETE FROM gallery WHERE id = ?', [id]);
  }

  await seedTableIfEmpty('gallery', [
    {
      id: "g1",
      title: "Hack It On 2025 Opening Ceremony",
      category: "events",
      type: "image",
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      description: "Opening keynote session and team formation at the national level hackathon.",
      orderIndex: 1
    },
    {
      id: "g2",
      title: "Craft Design Create: Mastering Canva",
      category: "workshops",
      type: "image",
      url: "/images/canva_workshop.jpeg",
      description: "A Canva workshop hosted by IEEE MVSR Student Branch and IEEE Computer Society on May 1, 2025.",
      orderIndex: 2
    },
    {
      id: "g9",
      title: "Internship Experience 1",
      category: "internships",
      type: "video",
      url: "/videos/video1.mp4",
      description: "An employee sharing their experience working with AlgorithmAliens during the internship.",
      orderIndex: 9
    },
    {
      id: "g10",
      title: "Internship Experience 2",
      category: "internships",
      type: "video",
      url: "/videos/video2.mp4",
      description: "An employee sharing their experience working with AlgorithmAliens during the internship.",
      orderIndex: 10
    },
    {
      id: "g11",
      title: "Internship Experience 3",
      category: "internships",
      type: "video",
      url: "/videos/video3.mp4",
      description: "An employee sharing their experience working with AlgorithmAliens during the internship.",
      orderIndex: 11
    },
    {
      id: "g12",
      title: "Students Joined Canva Workshop",
      category: "workshops",
      type: "image",
      url: "/images/students_joined.jpeg",
      description: "Students participating in the Craft Design Create: Mastering Canva workshop.",
      orderIndex: 12
    }
  ]);

  await seedTableIfEmpty('testimonials', [
    {
      id: "t1",
      name: "Sampath Kumar P",
      role: "Managing Director, Siris Engineering enterprises",
      category: "client",
      rating: 5,
      feedback: "AlgorithmAliens delivered a production-ready platform in 6 weeks. Easily the best engineering partner we've worked with.",
      photo: "",
      orderIndex: 1
    },
    {
      id: "t2",
      name: "Kashish perhwani",
      role: "EX Intern,App Development",
      category: "internship",
      rating: 5,
      feedback: "I shipped a real product during my internship. The mentorship transformed how I think about software.",
      photo: "",
      orderIndex: 2
    },
    {
      id: "t3",
      name: "Rajesh Kumar.",
      role: "CEO, RSP Engineering solutions",
      category: "client",
      rating: 5,
      feedback: "Thanks to Algorithm Aliens for bringing my business online. Their custom system has made it much easier to manage clients, track finances, and streamline daily operations. The solution is simple, efficient, and has helped improve the way I run my business. Highly recommended!",
      photo: "",
      orderIndex: 3
    },
    {
      id: "t4",
      name: "YASH NALAVADE",
      role: "EX Intern,ML Engineering",
      category: "internship",
      rating: 5,
      feedback: "I gained practical exposure and improved my understanding of technical concepts, problem-solving, and professional work culture. The tasks assigned to me were well-structured and helped me enhance my skills and confidence. I also appreciated the guidance and support provided by the team whenever required",
      photo: "",
      orderIndex: 6
    }
  ]);

  await seedTableIfEmpty('faq', [
    {
      id: "faq1",
      question: "What does AlgorithmAliens do?",
      answer: "AlgorithmAliens Pvt. Ltd. is a comprehensive tech house. We build state-of-the-art web interfaces, cross-platform apps, and AI automated pipelines for corporate clients, while running professional student chapters and bootcamps to mentor future engineers.",
      orderIndex: 1
    },
    {
      id: "faq2",
      question: "Where are you located?",
      answer: "We are headquartered in Hyderabad, India, operating primarily in a hybrid model to support local university chapters and global clients.",
      orderIndex: 2
    },
    {
      id: "faq3",
      question: "How long does a typical custom website build take?",
      answer: "A marketing site typically takes 3-4 weeks from discovery to launch, while complex SaaS applications or custom web apps take 6-12 weeks depending on requirements.",
      orderIndex: 3
    },
    {
      id: "faq4",
      question: "What are the requirements to join the Internship Programs?",
      answer: "We look for basic programming familiarity (e.g. JavaScript, Python) and, most importantly, a strong drive to build products. Candidates go through a brief technical review.",
      orderIndex: 4
    },
    {
      id: "faq5",
      question: "How do I schedule a free roadmap consultation?",
      answer: "You can click on any 'Book Free Consultation' or 'Book a Call' button, select a slot on our scheduling form, and we'll meet via video call to discuss your project.",
      orderIndex: 5
    }
  ]);

  await seedTableIfEmpty('team', [
    {
      id: "vasanth",
      name: "Beeram Vasanth Kumar Reddy",
      role: "Co-Founder & CEO",
      bio: "Visionary entrepreneur and software architect with a passion for building scalable tech products and fostering innovation ecosystems.",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
      orderIndex: 1
    },
    {
      id: "sairam",
      name: "Sai Ram Polsai",
      role: "Co-Founder & CTO",
      bio: "AI engineering researcher and automation expert. Sai Ram designs high-throughput systems and directs the core AI research labs.",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
      orderIndex: 2
    },
    {
      id: "satya",
      name: "Satya Pranav A",
      role: "Head of Engineering & Community",
      bio: "Lead Full-Stack developer overseeing community outreach programs like ANX Clubs and guiding the technical curriculum at the Academy.",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
      orderIndex: 3
    }
  ]);

  await seedTableIfEmpty('statistics', [
    {
      id: "projects",
      value: 120,
      suffix: "+",
      label: "Projects Completed",
      description: "Bespoke SaaS, mobile applications, and automation systems delivered globally.",
      orderIndex: 1
    },
    {
      id: "clients",
      value: 45,
      suffix: "+",
      label: "Clients Served",
      description: "Happy startups, educational institutes, and mid-sized enterprises.",
      orderIndex: 2
    },
    {
      id: "students",
      value: 2500,
      suffix: "+",
      label: "Students Trained",
      description: "Nurtured through AlgorithmAliens Academy courses and bootcamps.",
      orderIndex: 3
    },
    {
      id: "events",
      value: 15,
      suffix: "",
      label: "Events Conducted",
      description: "Hackathons, competitive programming challenges, and technology expos.",
      orderIndex: 4
    }
  ]);

  await seedTableIfEmpty('internships', [
    {
      id: "web-dev",
      title: "Web Development",
      description: "Master modern frontend libraries and backend databases. Learn state management, custom layouts, and API creation.",
      duration: "3 - 6 Months",
      skills: JSON.stringify(["React.js", "Node.js", "Express", "Bootstrap 5", "MongoDB", "SQL"]),
      orderIndex: 1
    },
    {
      id: "app-dev",
      title: "App Development",
      description: "Build robust, cross-platform Android and iOS mobile applications with native UI transitions and local data management.",
      duration: "3 - 6 Months",
      skills: JSON.stringify(["React Native", "Flutter", "Firebase", "Redux Toolkit", "REST APIs"]),
      orderIndex: 2
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      description: "Deep dive into model integration, large language models (LLMs), prompt engineering, and smart automation agents.",
      duration: "3 Months",
      skills: JSON.stringify(["OpenAI API", "LangChain", "Python", "NumPy & Pandas", "Vector Databases"]),
      orderIndex: 3
    },
    {
      id: "python",
      title: "Python Development",
      description: "Acquire strong programming foundations. Build web scrapers, automated scripts, backend routers, and data analytics tools.",
      duration: "2 - 4 Months",
      skills: JSON.stringify(["Python core", "Django", "Flask", "BeautifulSoup", "SQL databases"]),
      orderIndex: 4
    },
    {
      id: "full-stack",
      title: "Full Stack Development",
      description: "Become a complete developer. Take care of frontend styling, backend routing, server setups, cloud deployment, and CI/CD.",
      duration: "6 Months",
      skills: JSON.stringify(["MERN Stack", "TypeScript", "Docker", "AWS Essentials", "Git & GitHub"]),
      orderIndex: 5
    }
  ]);

  // Seed company info / settings
  const settingsCount = await query.get("SELECT COUNT(*) as count FROM settings");
  if (settingsCount.count === 0) {
    const defaultSettings = [
      { key: "company_name", value: "AlgorithmAliens" },
      { key: "company_tagline", value: "Engineering Innovation. Empowering Futures." },
      { key: "company_description", value: "We build digital products, deliver software solutions, and grow technology communities." },
      { key: "contact_email", value: "info@algorithmaliens.com" },
      { key: "contact_phone", value: "+91 XXXXXXXXXX" },
      { key: "contact_address", value: "Hyderabad, India" },
      { key: "linkedin_url", value: "https://linkedin.com/company/algorithmaliens" },
      { key: "twitter_url", value: "https://twitter.com/algo_aliens" },
      { key: "github_url", value: "https://github.com/algorithmaliens" },
      { key: "facebook_url", value: "https://facebook.com/algorithmaliens" },
      { key: "seo_title_default", value: "AlgorithmAliens — Engineering Innovation. Empowering Futures." },
      { key: "seo_description_default", value: "Official portal of AlgorithmAliens Pvt. Ltd. We engineer advanced web applications, iOS/Android apps, AI-powered automation solutions, and manage Academy training and ANX college clubs." }
    ];

    for (const setting of defaultSettings) {
      await query.run("INSERT INTO settings (key, value) VALUES (?, ?)", [setting.key, setting.value]);
    }
    console.log("[DB] Seeded default website settings.");
  }
}

async function seedTableIfEmpty(tableName, data) {
  const countRow = await query.get(`SELECT COUNT(*) as count FROM ${tableName}`);
  if (countRow.count === 0) {
    const fields = Object.keys(data[0]);
    const placeholders = fields.map(() => '?').join(', ');
    const sql = `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${placeholders})`;

    for (const row of data) {
      const params = fields.map(field => row[field]);
      await query.run(sql, params);
    }
    console.log(`[DB] Seeded table: ${tableName} with ${data.length} records.`);
  }
}
