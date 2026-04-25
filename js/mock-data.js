// mock-data.js - Single source of truth for all fake data
// Contains Nepali names, companies, universities, etc.

export const mockCourses = [
  {
    id: 1,
    title: "Advanced React for Nepali Developers",
    category: "Information Technology",
    level: "Advanced Professional",
    instructor: "Dr. Ananya Sharma",
    rating: 4.9,
    enrolled: 2450,
    price: 4500,
    isFree: false,
    duration: "Comprehensive (20+ Hours)",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT3bHiN34SGXznQ10mj1b0r5sO8Y9Yyr_GiiS3dgstttvkNQTeXlfJ4JXtW8TdbjuHOKLfAvdhIE7j3QliHJbeoJwTxdhou0k1jx619Kn8XibvQPIsJLJTXrq6e6PS1mKQwY92wXG9DBIeGScjheHWppaPzCXrfjlauiJTmOtUZFN2r6GTUkzDQxbyXK8AAlbRqiwKrlD2E03V0oN99snqcF1-3i313hiwIT61rd44KaOffZIunJHXw6t8oqqu637BD76L4O6RSKE",
    description: "Build complex, enterprise-ready applications focusing on local use cases and optimization for Nepal's network conditions.",
    lessons: [
      { id: 101, title: "Module 1: Introduction & Architecture", duration: "45m" },
      { id: 102, title: "Module 2: Advanced State Management", duration: "2h 15m" },
      { id: 103, title: "Module 3: Database Design & Optimization", duration: "1h 40m" }
    ]
  },
  {
    id: 2,
    title: "Strategic Project Management & Agile Ops",
    category: "Business & Leadership",
    level: "Intermediate Mastery",
    instructor: "Prof. Rajesh Thapa",
    rating: 4.7,
    enrolled: 1120,
    price: 0,
    isFree: true,
    duration: "Medium (5-20 Hours)",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCw1l1P3ku8udz0y85ZjjNb6DITjEpwXnXxUkRL1XjfQQilSaB8JI_o37BWkAYWyPVI5JAX-EBYhb4U9ye6wex-BiNl4L0or9Zwy168Qz-M58AQoB6AMoUwNYn3kc12jh1BgVrtI8g7Pk3qSIpz8hkLI8ULaZsR6UCaHENHGx6b_xdGVzTvsDJ_KXdfqQ-vtoHkmKr_nQw11szp3jBkCn_iJFy8PPUe3fmQvy8nWWEH3tYTo1AarSVZLOSCDmrrIlbfw5kvE1NsYWI",
    description: "Master Agile methodologies tailored for Nepal's growing corporate sector. Lead teams effectively and deliver projects on time.",
    lessons: [
      { id: 201, title: "Agile Principles", duration: "1h 10m" },
      { id: 202, title: "Scrum Framework", duration: "1h 30m" }
    ]
  },
  {
    id: 3,
    title: "UX Research & Psychological Product Design",
    category: "Information Technology",
    level: "Intermediate Mastery",
    instructor: "Sarah Jenkins",
    rating: 4.8,
    enrolled: 3800,
    price: 3200,
    isFree: false,
    duration: "Medium (5-20 Hours)",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlYY6b2iqh9JDBbgi-N4i2Rto4ZMO-Sop36CBmE2CEJUUD24VvDGnueHFxZSHQxtPiYlYmK28y3pB0MJ79A3hZ_x5-GJ6WjQ6TunKDtsq0JissdmVNyjUHkWhRhqTS0kEIiJVZkLM824bZls0sZVNUwjSwvQFSnfNfqh0dEtqIeFK6aNHYkDYWFVbQupVc_gynRJw4mXXE6wfLCrdV3bc-gVpjjmNOIHx3a7EdkMijn3Ng268jHvUcIhemwH2lKiGIadDTX8qaAJ8",
    description: "Understand user psychology and conduct effective UX research to build products that resonate with the South Asian market.",
    lessons: [
      { id: 301, title: "Intro to User Psychology", duration: "50m" },
      { id: 302, title: "Conducting User Interviews", duration: "1h 20m" }
    ]
  },
  {
    id: 4,
    title: "Python for Financial Data Engineering",
    category: "Information Technology",
    level: "Advanced Professional",
    instructor: "Dr. Bibek Gupta",
    rating: 5.0,
    enrolled: 945,
    price: 5900,
    isFree: false,
    duration: "Comprehensive (20+ Hours)",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5eRi80pZ3mKH6EBw6Mb97aGJ-7EJHzm1lBN-A3LDeX28HIhcu25LDtrooTWE8NxXIU-iFmgrXvL4EBbyTl1nmIhp77FmAFBFw9KeEsTygLVaEewe8kGFE-nXdiouj8pqSeQ6yTxHm7VNtOwu4KMKr0v-AQupnZLbgrF0AovcgP8s_RBYewEsW6MLlv2bs4vzdY63YQL3wqtf2SNIYipfRGXbZkyAHxo5HchtHebuduUqhslOLb5F5X0ld-Nro_JMYgrAYk80sdhs",
    description: "Learn to process, analyze, and visualize complex financial data using Python. Perfect for aspiring Quants and Data Engineers.",
    lessons: [
      { id: 401, title: "Pandas for Finance", duration: "2h" },
      { id: 402, title: "Time Series Analysis", duration: "3h" }
    ]
  },
  {
    id: 5,
    title: "Technical Writing for Global SaaS",
    category: "Language & Humanities",
    level: "Beginner Foundation",
    instructor: "Emily Watson",
    rating: 4.6,
    enrolled: 540,
    price: 2500,
    isFree: false,
    duration: "Short ( < 5 Hours)",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFDXTuGlhye_WwSjnlVWeUsbJWOnh6wDD-RUByiBF5tS6C7HiZuTfYk33Kmu0eTm58sISVXxKv_1Xb-alpWqKVP-weAFXo7RIajkJtc4F1mpY9-GzLbBbVwZRmErnHSfYCDP-JvryiLcLExSGNrQEdnCq1HsGaua6LI3pqxovdpGEFuXp3l415fwqFu2yfSOtMY2rjRzRBVvtcAE3P6CqqEnCGNUfOC2nWjGyFN7zDVIiBLfxre5LK6HYHeq3W5WFyKt7fRCdwwTQ",
    description: "Master the art of creating clear, concise, and effective technical documentation for global software products.",
    lessons: [
      { id: 501, title: "Principles of Technical Writing", duration: "45m" },
      { id: 502, title: "API Documentation Basics", duration: "1h 10m" }
    ]
  },
  {
    id: 6,
    title: "Executive Communication Mastery",
    category: "Business & Leadership",
    level: "Advanced Professional",
    instructor: "Dr. Suresh Karki",
    rating: 4.9,
    enrolled: 890,
    price: 0,
    isFree: true,
    duration: "Short ( < 5 Hours)",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzrxzFa-Pr91qzJrar1_WccXv-9oy7e9fOxPnA0cZaRjvrg2mnxl8hbMjir-gZPfcSAsUDQB8G2Gnlpdkhd_mMqgyI0fcFed-URX-VEFog5Z2T56rXxN0Y50OfiUyCHTkptxywWTsw7aHPqguP7WDxr-xzD2tCL1nEltGTZLaD0zz9_Ltt-SWttwI2DuwQwh6ZFgy48T1NUkU8FyB56FDOu3azvIRrZd1Hnu5bFzFLWT9YY5DHTtKguFcLW_CNQnc8GD-eqnodkS8",
    description: "Develop the soft skills and communication strategies required for executive leadership roles in modern enterprises.",
    lessons: [
      { id: 601, title: "Effective Presentations", duration: "50m" },
      { id: 602, title: "Conflict Resolution", duration: "1h" }
    ]
  },
  {
    id: 7,
    title: "UI Design Fundamentals",
    category: "Information Technology",
    level: "Beginner Foundation",
    instructor: "Rita Maharjan",
    rating: 4.8,
    enrolled: 3100,
    price: 1500,
    isFree: false,
    duration: "Medium (5-20 Hours)",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsf-BtwdxSeaGRHhrXOcEH5fnnelZ6z9Jq1qIOH2My683CmcCrlphxeUK0VyMbJkXO9MxK6mBoeMFJVeng9Lv-u1ahZeIMx6L1jrc1xoF64cAHcqJsKGTlRgVwXQU-hEnsmtf0a2HYErSGun6QIvmNQ0bNK2hl5wvd4VQPzo5ke6NyWMxOKvpMcGNydHMFD5TPAaxqyL651pdQn3r6mgVaPbC-X9xEGMM5u8K37j44s3GO_awXdKFpQ8YRPe4fMaBrYxpfW0dB7lw",
    description: "Learn the core principles of UI design, typography, and color theory to create stunning digital interfaces.",
    lessons: [
      { id: 701, title: "Color Theory & Typography", duration: "1h 30m" },
      { id: 702, title: "Layout & Spacing", duration: "2h" }
    ]
  },
  {
    id: 8,
    title: "Mastering Docker for DevOps",
    category: "Information Technology",
    level: "Intermediate Mastery",
    instructor: "Sanjay Shrestha",
    rating: 4.9,
    enrolled: 1850,
    price: 3800,
    isFree: false,
    duration: "Medium (5-20 Hours)",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLf9fyKUNeELRbKqXFj_SRk7DfraJIzpM8-2oNbfzNohFwSQIMAfvf6DYMWjglKHvryOuGCPTS91kNffXzuDQM2uZWsS2hlNyiM7c9iCKXRn-DXqe91Y80RQTdlp36ZNIbTY4znR4wro9i-GGlKmyHwXN1nA-MIxsXdnxE22O-3rMqE-Vh_ljaks5lsDFDUyZ9i3JjCV2CT_6FKxg5VpShF0AMD7-Gx-Plie_4utmeL15oPivQLspabXiQoJ7r9DM8R4F3ZS7YYKA",
    description: "Learn containerization with Docker. A must-have skill for modern backend engineers and DevOps professionals.",
    lessons: [
      { id: 801, title: "Docker Basics", duration: "1h" },
      { id: 802, title: "Docker Compose", duration: "1h 45m" }
    ]
  },
  {
    id: 9,
    title: "AWS Cloud Practitioner Guide",
    category: "Information Technology",
    level: "Beginner Foundation",
    instructor: "Pooja K.C.",
    rating: 4.8,
    enrolled: 4200,
    price: 4000,
    isFree: false,
    duration: "Comprehensive (20+ Hours)",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXmXFxKbsmRIHawCgDfmpJ59cxTr59RLKlHS8pjMoWbvLFfR057GEYqm6zRlFzK36dZQ3MzzR7JZE9FBWRAKvOXvaipex8OGmGtDPsIw5xazNNwINDsaZB03CkEs_BVOk1Wpwzpo3OBsk8XroMpFjBYwOw70xQBBBywvKXo4LS9EX7s1DABwU7nxNuqkDL7Kp3jWCA2q2juNIHM4ekVOrxt2aTowZp8AQu6hEdheK7TBCc5yAMBAsbh6vVC2fQZzQ-7lLW1Z90LiU",
    description: "Start your cloud computing journey with this comprehensive guide to Amazon Web Services.",
    lessons: [
      { id: 901, title: "Cloud Concepts Overview", duration: "2h" },
      { id: 902, title: "Core AWS Services", duration: "4h" }
    ]
  },
  {
    id: 10,
    title: "Advanced API Design with GraphQL",
    category: "Information Technology",
    level: "Advanced Professional",
    instructor: "Nabin Bhattarai",
    rating: 4.7,
    enrolled: 1500,
    price: 3500,
    isFree: false,
    duration: "Medium (5-20 Hours)",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuKP9ntH-fIyMdxQut-5OV_QHnr6zqqF5potcB-g27RmyWd4AAdh--7ayuCCS0u893xHAuYbVfwuGvCKmPI3KObEQLKU8ixYlvuMW85HVA0Tg_Q-Zc7wE1reAT7eI4qRRy6PJUxTQtzdTxAmjv3rsv_glcBj2iYGQNSScaTsIYK96K-8m4uPaWhD6n5nB5Fl2WVEeKnJ8lEwdstx_tyK-Bo6o4ju54SCrUidJ0gsqXS3-UDXz0ijjSaijPYFekw64re03p_gOkVcE",
    description: "Design efficient and flexible APIs using GraphQL. Ideal for full-stack developers aiming to modernize their tech stack.",
    lessons: [
      { id: 1001, title: "GraphQL vs REST", duration: "1h" },
      { id: 1002, title: "Schema Design", duration: "2h" }
    ]
  },
  {
    id: 11,
    title: "Data Science with Python",
    category: "Information Technology",
    level: "Beginner Foundation",
    instructor: "Anita Gurung",
    rating: 4.9,
    enrolled: 5000,
    price: 4800,
    isFree: false,
    duration: "Comprehensive (20+ Hours)",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlnTxUfGfWeOLJuA_veDIh56IzeFGaXOxPnF9USCU3oE9f13XM2hzbWQSBHkkrN5jSrgQzwz5cANfM0O-VpQytHJ_gzl6tvj0WG2wASG59rbABm4xGnJftvtQBuMNAy4yRyCzHd4H-xgBGlvzERymoCrbA2yqCflabqtaNXnjTEN5x77sBq0pp6843HEqEnbqoKKeKPvJ8RrVvEoLUt1zYON0VrTwDAruQFhqOFmWZ0BchhGS6F14a3iJo1FaFx3GfV5QdJM2GSO0",
    description: "Learn to analyze data, create visualizations, and build predictive models using Python's data science ecosystem.",
    lessons: [
      { id: 1101, title: "NumPy & Pandas Basics", duration: "3h" },
      { id: 1102, title: "Data Visualization with Matplotlib", duration: "2h" }
    ]
  },
  {
    id: 12,
    title: "Full-Stack Bootcamp 2024",
    category: "Information Technology",
    level: "Intermediate Mastery",
    instructor: "Team LeapFrog",
    rating: 5.0,
    enrolled: 8000,
    price: 15000,
    isFree: false,
    duration: "Comprehensive (20+ Hours)",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQPUFuYxiQirBZztnlpmzLNgBCfL2eOdk3PMru_yx9vUFc8xMlgG__KNjv9MsGeVxJK88edjEQgZdKbVpmbkOohucC8-KqiXTZ_r7bU_RGiPjV25LGiaxoNLGwLMKuluUU-C25Z8QW62gIkTHG3WO5xoTuhcy7JaG6IQg4IfpmNBESqTi1884TPT3vJ0GHGywvsdNn5lZJYmscZlROXSy0HLAlfMHnwZKiA8KY13T1C5aYwCrV6w7MUtkGav0IyaeeI7OYy-ojWUU",
    description: "An intensive 24-week bootcamp covering everything from HTML/CSS to advanced React, Node.js, and deployment.",
    lessons: [
      { id: 1201, title: "Frontend Foundations", duration: "40h" },
      { id: 1202, title: "Backend & Databases", duration: "40h" }
    ]
  }
];

export const mockJobs = [
  {
    id: 1,
    title: "Senior Python Engineer",
    company: "CloudFactory",
    location: "Lalitpur, Nepal",
    type: "Full-time",
    salary: "रू 150,000 - 200,000 / mo",
    tags: ["Python", "AWS", "Backend"],
    postedDate: "2 days ago",
    logo: "CF",
    color: "text-primary-container",
    description: "We are looking for an experienced Python Engineer to join our core backend team. You will be responsible for building scalable APIs and optimizing data processing pipelines.",
    requirements: ["5+ years of Python experience", "Strong knowledge of AWS", "Experience with RESTful APIs"]
  },
  {
    id: 2,
    title: "FinTech Product Manager",
    company: "F1Soft",
    location: "Kathmandu, Nepal",
    type: "Hybrid",
    salary: "रू 120,000 - 180,000 / mo",
    tags: ["Product", "Agile", "Finance"],
    postedDate: "1 week ago",
    logo: "F1",
    color: "text-error",
    description: "Join Nepal's leading FinTech company to lead the development of next-generation digital payment solutions.",
    requirements: ["3+ years in Product Management", "Experience in FinTech", "Strong analytical skills"]
  },
  {
    id: 3,
    title: "AI Implementation Specialist",
    company: "Fusemachines",
    location: "Remote / Kathmandu",
    type: "Full-time",
    salary: "रू 180,000 - 250,000 / mo",
    tags: ["AI/ML", "Python", "Urgent"],
    postedDate: "3 days ago",
    logo: "FM",
    color: "text-primary",
    description: "Help enterprises integrate AI into their workflows. You will work with LLMs, computer vision, and predictive models.",
    requirements: ["Experience with Machine Learning frameworks", "Strong Python programming", "Client-facing experience"]
  },
  {
    id: 4,
    title: "Frontend Developer",
    company: "TechNest Nepal",
    location: "Kathmandu, Nepal",
    type: "Full-time",
    salary: "रू 60,000 - 90,000 / mo",
    tags: ["React", "JavaScript", "Frontend"],
    postedDate: "Oct 24, 2023",
    logo: "T",
    color: "text-primary",
    description: "Build beautiful and responsive user interfaces for our international clients using React and Tailwind CSS.",
    requirements: ["2+ years React experience", "Strong CSS/HTML skills", "Understanding of state management"]
  },
  {
    id: 5,
    title: "UI/UX Designer",
    company: "Creative Hub",
    location: "Lalitpur, Nepal",
    type: "Full-time",
    salary: "रू 70,000 - 100,000 / mo",
    tags: ["Figma", "Design", "Research"],
    postedDate: "Oct 21, 2023",
    logo: "C",
    color: "text-tertiary",
    description: "Design intuitive digital experiences. You will conduct user research and create high-fidelity prototypes in Figma.",
    requirements: ["Portfolio of past work", "Proficiency in Figma", "Understanding of UX principles"]
  },
  {
    id: 6,
    title: "Junior React Engineer",
    company: "Finleap Solutions",
    location: "Kathmandu, Nepal",
    type: "Full-time",
    salary: "रू 40,000 - 60,000 / mo",
    tags: ["React", "Entry Level"],
    postedDate: "Oct 18, 2023",
    logo: "F",
    color: "text-on-surface-variant",
    description: "Great opportunity for a recent graduate to join a fast-paced team and level up their React skills.",
    requirements: ["Basic knowledge of React", "Willingness to learn", "Good communication skills"]
  },
  {
    id: 7,
    title: "Senior Software Engineer",
    company: "Pinnacle Solutions Ltd.",
    location: "Kathmandu",
    type: "Full-time",
    salary: "रू 150,000 - 220,000 / mo",
    tags: ["React", "Node.js", "Full-stack"],
    postedDate: "2 days ago",
    logo: "P",
    color: "text-primary",
    description: "Lead development of our core SaaS platform. Architect solutions using React and Node.js.",
    requirements: ["5+ years experience", "Strong architectural patterns knowledge", "Mentorship skills"]
  },
  {
    id: 8,
    title: "UI/UX Design Intern",
    company: "Innovate Nepal",
    location: "Remote",
    type: "Internship",
    salary: "रू 15,000 - 25,000 / mo",
    tags: ["Figma", "Bento Design"],
    postedDate: "5 hours ago",
    logo: "IN",
    color: "text-tertiary",
    description: "Learn from senior designers while working on real-world projects.",
    requirements: ["Basic Figma knowledge", "Design sense", "Available for 3 months"]
  },
  {
    id: 9,
    title: "Financial Analyst",
    company: "Himalayan Capital",
    location: "Lalitpur",
    type: "Full-time",
    salary: "रू 80,000 - 120,000 / mo",
    tags: ["CFA", "Excel Expert"],
    postedDate: "Yesterday",
    logo: "H",
    color: "text-primary-container",
    description: "Analyze market trends and prepare financial models for investment decisions.",
    requirements: ["CFA level 1 minimum", "Advanced Excel", "Analytical mindset"]
  },
  {
    id: 10,
    title: "DevOps Engineer",
    company: "Logpoint",
    location: "Kathmandu",
    type: "Full-time",
    salary: "रू 130,000 - 180,000 / mo",
    tags: ["AWS", "Docker", "CI/CD"],
    postedDate: "1 week ago",
    logo: "L",
    color: "text-secondary",
    description: "Maintain and scale our cloud infrastructure ensuring high availability and security.",
    requirements: ["AWS Certification", "Experience with Docker/K8s", "CI/CD pipeline configuration"]
  }
];

export const mockQuizQuestions = [
  {
    question: "Which hook is used to manage complex state logic in React?",
    options: ["useState", "useEffect", "useReducer", "useContext"],
    correctAnswer: 2
  },
  {
    question: "What is the primary purpose of Docker?",
    options: ["Version control", "Containerization", "Database management", "Styling websites"],
    correctAnswer: 1
  },
  {
    question: "Which of the following is NOT an Agile methodology?",
    options: ["Scrum", "Kanban", "Waterfall", "Extreme Programming (XP)"],
    correctAnswer: 2
  },
  {
    question: "In Figma, what feature is used to create responsive layouts?",
    options: ["Auto Layout", "Components", "Variants", "Masking"],
    correctAnswer: 0
  },
  {
    question: "What does API stand for?",
    options: ["Automated Programming Interface", "Application Programming Interface", "Advanced Protocol Integration", "Application Process Integration"],
    correctAnswer: 1
  }
];

// Single user template, will be saved to localStorage upon mock login
export const defaultUser = {
  isLoggedIn: true,
  role: 'student',
  name: 'Aayush Shrestha',
  email: 'student@test.com',
  university: 'Tribhuvan University',
  bio: '',
  skills: ['HTML', 'CSS', 'JavaScript', 'React'],
  education: [
    { degree: "BSc Computer Science", institution: "Tribhuvan University", year: "2020 - 2024" }
  ],
  experience: [
    { title: "Frontend Developer Intern", company: "TechNest", duration: "Jan 2024 - Present" }
  ],
  enrolledCourses: [1, 7], // Course IDs
  appliedJobs: [
    { jobId: 4, status: 'Interview', date: '2023-10-24' },
    { jobId: 5, status: 'Screening', date: '2023-10-21' },
    { jobId: 6, status: 'Applied', date: '2023-10-18' }
  ],
  certificates: [
    { courseId: 1, courseName: 'Advanced React for Nepali Developers', issueDate: '2023-09-15', certId: 'LFC-2023-1042' },
    { courseId: 7, courseName: 'UI Design Fundamentals', issueDate: '2023-08-02', certId: 'LFC-2023-0891' }
  ]
};

// Skill gap mock data mapped to specific job titles
export const mockSkillGaps = {
  "Senior Full Stack Engineer - Fintech Division": {
    matchPercentage: 78,
    have: [
      { skill: "React.js", level: "Expert" },
      { skill: "Node.js", level: "Intermediate" },
      { skill: "SQL / PostgreSQL", level: "Expert" },
      { skill: "Tailwind CSS", level: "Expert" }
    ],
    missing: [
      "Docker & Kubernetes",
      "AWS Cloud Services",
      "GraphQL",
      "Unit Testing (Jest)"
    ],
    advice: "Your technical foundation in JavaScript and frontend frameworks is exceptional. However, the Senior level role you've selected requires infrastructure awareness. Specifically, the fintech sector values containerization (Docker) for secure, consistent deployments. Recommendation: Prioritize a Docker certification within the next 30 days. This single addition to your profile will increase your match rate to approximately 89%.",
    recommendedCourses: [8, 9, 10]
  },
  "Data Scientist II - Machine Learning Ops": {
    matchPercentage: 45,
    have: [
      { skill: "Python", level: "Intermediate" },
      { skill: "SQL", level: "Intermediate" }
    ],
    missing: [
      "Machine Learning Algorithms",
      "Pandas & NumPy",
      "Model Deployment (MLOps)"
    ],
    advice: "You have a basic understanding of Python and data querying, but lack the core data science libraries and MLOps experience required for a level II role. Recommendation: Focus heavily on Python data science libraries first, then move towards deployment.",
    recommendedCourses: [4, 11]
  }
};

