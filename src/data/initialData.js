// Instant Fallback Data — ensures clients see full content instantly (0ms load time)
// while fresh backend data silently syncs in the background.

export const initialFAQs = [
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
  },
  {
    id: "faq6",
    question: "What kind of projects do you take on?",
    answer: "Web and mobile apps, AI automations, SaaS platforms, and enterprise software. We work with startups and growing companies.",
    orderIndex: 6
  },
  {
    id: "faq7",
    question: "Do you offer ongoing support?",
    answer: "Yes — we offer support and continuous improvement retainers after launch.",
    orderIndex: 7
  },
  {
    id: "faq8",
    question: "Are your products available now?",
    answer: "AA Academy and ANX Clubs are live. Several flagship products are launching soon.",
    orderIndex: 8
  },
  {
    id: "faq9",
    question: "Can I partner on a product?",
    answer: "Yes — reach out via the contact form to discuss partnerships.",
    orderIndex: 9
  },
  {
    id: "faq10",
    question: "Are internships paid?",
    answer: "Our structured internships include a stipend and certification based on your performance.",
    orderIndex: 10
  },
  {
    id: "faq11",
    question: "What's the fastest way to reach you?",
    answer: "Email info@algorithmaliens.com or book a free consultation via the Book a Call page.",
    orderIndex: 11
  }
];

export const initialServices = [
  {
    id: "web-development",
    title: "Website Development",
    icon: "Globe",
    description: "Marketing sites, portfolios, e-commerce and custom web apps.",
    tech: ["React", "Vite", "Node.js", "Express", "TailwindCSS"],
    items: ["Responsive Web Design", "Custom Web Applications", "E-commerce Platforms", "CMS Integration"],
    longDescription: "High-performance web applications built with modern frontend frameworks and scalable backend architecture.",
    benefits: ["Sub-second page loads", "SEO optimized structure", "Responsive across all screens"]
  },
  {
    id: "mobile-development",
    title: "Mobile App Development",
    icon: "Smartphone",
    description: "Native Android, iOS and cross-platform apps.",
    tech: ["React Native", "Flutter", "Android SDK", "iOS"],
    items: ["Cross-platform Apps", "Native Android & iOS", "App Store Publishing", "Push Notifications"],
    longDescription: "Fluid mobile user experiences engineered for iOS and Android with offline synchronization and native device integrations.",
    benefits: ["Native performance", "Smooth UI animations", "App Store readiness"]
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    icon: "Bot",
    description: "Chatbots, voice agents and workflow automation.",
    tech: ["Python", "OpenAI API", "LangChain", "TensorFlow"],
    items: ["Conversational AI Agents", "Workflow Automation", "LLM Fine-tuning", "Voice Assistants"],
    longDescription: "Intelligent AI agents and workflow automations that handle support, process documents, and reduce manual tasks.",
    benefits: ["24/7 automated resolution", "Lower operational overhead", "Seamless API integration"]
  },
  {
    id: "custom-software",
    title: "Custom Software",
    icon: "Code",
    description: "SaaS platforms, enterprise apps and internal tools.",
    tech: ["Node.js", "Python", "SQLite / PostgreSQL", "Docker"],
    items: ["SaaS Architecture", "Enterprise Internal Tools", "API Integration", "Database Design"],
    longDescription: "Bespoke software solutions tailored to solve complex business operations and scale seamlessly.",
    benefits: ["Tailored logic", "Scalable cloud deployment", "Full code ownership"]
  }
];

export const initialTestimonials = [
  {
    id: "t1",
    name: "Kashish Perhwani",
    role: "EX Intern, App Development",
    category: "internship",
    rating: 5,
    feedback: "I shipped a real product during my internship. The mentorship transformed how I think about software."
  },
  {
    id: "t2",
    name: "Yash Nalavade",
    role: "EX Intern, ML Engineering",
    category: "internship",
    rating: 5,
    feedback: "I gained practical exposure and improved my understanding of technical concepts, problem-solving, and professional work culture. The tasks assigned to me were well-structured and helped me enhance my skills and confidence."
  },
  {
    id: "t3",
    name: "Rajesh Varma",
    role: "Founder, TechScale Solutions",
    category: "client",
    rating: 5,
    feedback: "AlgorithmAliens delivered a production-ready platform in 6 weeks. Easily the best engineering partner we've worked with."
  }
];

export const initialStatistics = [
  { id: "projects", value: 25, suffix: "+", label: "Projects Shipped", description: "Bespoke SaaS, mobile applications, and automation systems delivered." },
  { id: "clients", value: 5, suffix: "+", label: "Clients Served", description: "Happy startups, educational institutes, and mid-sized enterprises." },
  { id: "students", value: 60, suffix: "+", label: "Students Trained", description: "Learners empowered through workshops, ANX Chapters, and bootcamps." },
  { id: "events", value: 6, suffix: "+", label: "Events Hosted", description: "Hackathons, competitive coding challenges, and technology expos." }
];

export const initialProducts = [
  {
    id: "academy",
    title: "AlgorithmAliens Academy",
    tagline: "Skill-Based Software Training",
    description: "Hands-on, project-driven software development training designed to transform students into production-ready full-stack and AI software engineers.",
    features: ["Full-Stack Web Dev", "Mobile App Development", "AI Automation & Pipelines", "Production Code Reviews"],
    benefits: ["Real-world Industry Mentorship", "Verified Skill Certification", "Guaranteed Internship Opportunities"],
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "anx-clubs",
    title: "ANX Clubs",
    tagline: "Campus Engineering Chapters",
    description: "College-based student developer chapters fostering tech culture, hackathons, peer learning, and collaborative building across universities.",
    features: ["Hackathons & Workshops", "Peer-to-Peer Mentorship", "Student Innovation Labs", "Open-Source Projects"],
    benefits: ["University Level Recognition", "Leadership & Teamwork Experience", "Direct Corporate Connections"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80"
  }
];

export const initialInternships = [
  {
    id: "web-dev",
    title: "Web Development Track",
    description: "Build high-performance web applications using React, Vite, Node.js, and modern CSS frameworks.",
    duration: "2 - 3 Months",
    skills: ["React", "Node.js", "Express", "REST APIs", "Git"]
  },
  {
    id: "app-dev",
    title: "Mobile App Development",
    description: "Develop cross-platform mobile apps for Android and iOS using React Native and Flutter.",
    duration: "2 - 3 Months",
    skills: ["React Native", "Flutter", "Mobile UI", "API Integration", "State Management"]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Engineer AI agents, LLM pipelines, prompt workflows, and automated Python services.",
    duration: "3 Months",
    skills: ["Python", "OpenAI API", "LangChain", "Data Processing", "AI Agents"]
  }
];

export const initialGallery = [
  {
    id: "g1",
    title: "Canva Workshop Session",
    category: "workshops",
    type: "image",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
    description: "Students actively engaged during our hands-on UI/UX Canva Design workshop."
  },
  {
    id: "g2",
    title: "Interactive Q&A & Mentorship",
    category: "workshops",
    type: "image",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    description: "Mentors answering technical queries and providing design feedback."
  },
  {
    id: "g3",
    title: "Workshop Attendees & Certificate Ceremony",
    category: "workshops",
    type: "image",
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
    description: "Group photo of students celebrating workshop completion."
  }
];

export const initialEvents = [
  {
    id: "hack-it-on-2025",
    title: "Hack It On 2025",
    year: 2025,
    date: "October 12-14, 2025",
    description: "A 36-hour hackathon bringing together over 300 student developers to build AI solutions and full-stack web applications.",
    highlights: ["300+ Active Hacker Participants", "24 Industry Mentors", "Direct Hiring Referrals"],
    winners: "Team CyberX (Rank 1), Team Quantum (Rank 2)",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400"
    ]
  },
  {
    id: "aarohan-aethronix-2026",
    title: "Aarohan Aethronix 2026",
    year: 2026,
    date: "February 18-20, 2026",
    description: "Algorithm Aliens proudly sponsored Aethronix 2026, a national-level hackathon hosted at MVSR Engineering College bringing together aspiring innovators.",
    highlights: ["Sponsored national-level hackathon", "Hardware Prototype Exhibition", "Robo-Wars and drone racing events"],
    winners: "Project AgroBot (Best Hardware Innovation), Project AeroGlide (Runner Up)",
    banner: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400"
    ]
  }
];
