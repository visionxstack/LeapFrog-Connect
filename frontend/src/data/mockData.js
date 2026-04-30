export const mockData = {
  students: [
    { id: "s1", name: "Aarav Sharma", email: "aarav.sharma@demo.com", skills: ["React", "Node.js", "SQL"], readinessScore: 82, scoreHistory: [70, 73, 75, 77, 79, 80, 81, 82], courses: ["c1", "c3"], certificates: ["cert1"], applications: ["app1", "app2"], mentorRating: 0.88, submissionRate: 0.9, education: "BSc CSIT, Tribhuvan University", experience: "Intern - Kathmandu Labs", bio: "Frontend-focused engineer building scalable products.", publicProfile: true, profileUrl: "/profile/s1" },
    { id: "s2", name: "Priya Thapa", email: "priya.thapa@demo.com", skills: ["Python", "Data Analysis", "Power BI"], readinessScore: 74, scoreHistory: [79, 78, 77, 76, 75, 74, 73, 74], courses: ["c2", "c5"], certificates: ["cert2"], applications: ["app3"], mentorRating: 0.84, submissionRate: 0.82, education: "BCA, Pokhara University", experience: "Data Intern - Pokhara Insights", bio: "Data practitioner with strong business reporting skills.", publicProfile: true, profileUrl: "/profile/s2" },
    { id: "s3", name: "Bikash Karki", email: "bikash.karki@demo.com", skills: ["Java", "Spring Boot", "Microservices"], readinessScore: 69, scoreHistory: [76, 75, 74, 72, 71, 70, 69, 69], courses: ["c4"], certificates: [], applications: ["app4"], mentorRating: 0.8, submissionRate: 0.72, education: "BE Software, KU", experience: "Backend Trainee - Lalitpur Tech", bio: "Backend engineer with API design focus.", publicProfile: true, profileUrl: "/profile/s3" },
    { id: "s4", name: "Sita Rai", email: "sita.rai@demo.com", skills: ["UI/UX", "Figma", "Design Systems"], readinessScore: 77, scoreHistory: [72, 73, 74, 75, 76, 77, 77, 77], courses: ["c6"], certificates: [], applications: [], mentorRating: 0.86, submissionRate: 0.79, education: "BDes, Kathmandu University", experience: "Junior Designer", bio: "Designs intuitive digital experiences.", publicProfile: true, profileUrl: "/profile/s4" },
    { id: "s5", name: "Nabin Gurung", email: "nabin.gurung@demo.com", skills: ["DevOps", "Docker", "CI/CD"], readinessScore: 66, scoreHistory: [71, 70, 69, 68, 67, 66, 65, 66], courses: ["c7"], certificates: [], applications: ["app5"], mentorRating: 0.78, submissionRate: 0.74, education: "BSc IT, NCIT", experience: "Platform Intern", bio: "Automation-first cloud enthusiast.", publicProfile: true, profileUrl: "/profile/s5" },
    { id: "s6", name: "Kabita Adhikari", email: "kabita.adhikari@demo.com", skills: ["QA", "Automation", "Cypress"], readinessScore: 80, scoreHistory: [69, 71, 73, 75, 77, 78, 79, 80], courses: ["c8"], certificates: ["cert3"], applications: ["app6"], mentorRating: 0.9, submissionRate: 0.86, education: "BIT, Islington", experience: "QA Associate", bio: "Ensures product quality with robust test strategy.", publicProfile: true, profileUrl: "/profile/s6" },
    { id: "s7", name: "Rohan Tamang", email: "rohan.tamang@demo.com", skills: ["Flutter", "Firebase", "Dart"], readinessScore: 72, scoreHistory: [68, 69, 69, 70, 71, 71, 72, 72], courses: ["c1"], certificates: [], applications: ["app7"], mentorRating: 0.83, submissionRate: 0.8, education: "BIM, St. Xavier's", experience: "Mobile Intern", bio: "Builds performant mobile experiences.", publicProfile: true, profileUrl: "/profile/s7" },
    { id: "s8", name: "Mina Shrestha", email: "mina.shrestha@demo.com", skills: ["HR", "Recruiting", "Communication"], readinessScore: 63, scoreHistory: [70, 69, 68, 67, 66, 65, 64, 63], courses: ["c5"], certificates: [], applications: [], mentorRating: 0.76, submissionRate: 0.68, education: "BBA, KU", experience: "HR Trainee", bio: "People-first recruiter and coordinator.", publicProfile: false, profileUrl: "/profile/s8" },
    { id: "s9", name: "Anish Shahi", email: "anish.shahi@demo.com", skills: ["Cybersecurity", "Network", "SOC"], readinessScore: 85, scoreHistory: [78, 79, 80, 81, 82, 83, 84, 85], courses: ["c7", "c4"], certificates: ["cert4"], applications: ["app8"], mentorRating: 0.92, submissionRate: 0.91, education: "BSc CSIT, TU", experience: "Security Analyst Intern", bio: "Security-minded engineer for modern stacks.", publicProfile: true, profileUrl: "/profile/s9" },
    { id: "s10", name: "Pooja KC", email: "pooja.kc@demo.com", skills: ["Digital Marketing", "SEO", "Content"], readinessScore: 71, scoreHistory: [66, 67, 68, 69, 70, 70, 71, 71], courses: ["c8", "c2"], certificates: [], applications: ["app9"], mentorRating: 0.81, submissionRate: 0.77, education: "BBA, Ace Institute", experience: "Marketing Associate", bio: "Growth-focused marketer for tech products.", publicProfile: true, profileUrl: "/profile/s10" }
  ],
  employers: [
    { id: "e1", company: "Himal Tech", logo: "HT", jobPosts: ["j1", "j2"], industry: "Software" },
    { id: "e2", company: "NepaFin", logo: "NF", jobPosts: ["j3", "j4"], industry: "Fintech" },
    { id: "e3", company: "Pokhara Data Labs", logo: "PD", jobPosts: ["j5", "j6"], industry: "Analytics" },
    { id: "e4", company: "Lalitpur Cloud", logo: "LC", jobPosts: ["j7", "j8"], industry: "Cloud" },
    { id: "e5", company: "Everest Digital", logo: "ED", jobPosts: ["j9", "j10"], industry: "Digital Services" }
  ],
  courses: [
    { id: "c1", title: "Modern React for Nepal Startups", category: "Frontend", duration: "8 weeks", instructor: "Suman Koirala", price: 2999, enrolledCount: 325, modules: ["React Basics", "State Management", "APIs", "Deployment"], rating: 4.8, level: "Intermediate", description: "Build production React apps with Nepal-focused case studies.", has_quiz: true, has_certificate: true },
    { id: "c2", title: "Data Analytics with Python", category: "Data", duration: "10 weeks", instructor: "Nisha Basnet", price: 3499, enrolledCount: 290, modules: ["Python Refresher", "Pandas", "Visualization", "Business Dashboards"], rating: 4.7, level: "Intermediate", description: "Analyze and communicate insights with real business datasets.", has_quiz: true, has_certificate: true },
    { id: "c3", title: "Node.js Backend Engineering", category: "Backend", duration: "9 weeks", instructor: "Ritesh Poudel", price: 3199, enrolledCount: 210, modules: ["Express", "Auth", "Databases", "Scalable APIs"], rating: 4.6, level: "Intermediate", description: "Design robust backend services for web platforms.", has_quiz: true, has_certificate: true },
    { id: "c4", title: "Java Spring Boot Essentials", category: "Backend", duration: "12 weeks", instructor: "Pradip Ghimire", price: 3999, enrolledCount: 190, modules: ["Spring Core", "REST", "Security", "Testing"], rating: 4.5, level: "Advanced", description: "Enterprise backend development with Spring Boot.", has_quiz: true, has_certificate: true },
    { id: "c5", title: "Business Communication and Mentorship", category: "Soft Skills", duration: "6 weeks", instructor: "Asmita Joshi", price: 1999, enrolledCount: 360, modules: ["Communication", "Presentation", "Mentor Feedback", "Career Planning"], rating: 4.9, level: "Beginner", description: "Professional communication and workplace readiness.", has_quiz: true, has_certificate: true },
    { id: "c6", title: "UI/UX Design System Studio", category: "Design", duration: "7 weeks", instructor: "Kriti Maharjan", price: 2799, enrolledCount: 175, modules: ["Design Basics", "Figma", "Components", "Usability"], rating: 4.7, level: "Beginner", description: "Create scalable UI systems for products.", has_quiz: true, has_certificate: true },
    { id: "c7", title: "Cloud and DevOps Foundations", category: "DevOps", duration: "9 weeks", instructor: "Manish Adhikari", price: 3799, enrolledCount: 145, modules: ["Docker", "CI/CD", "Cloud Intro", "Monitoring"], rating: 4.6, level: "Intermediate", description: "Deliver software faster with modern DevOps practices.", has_quiz: true, has_certificate: true },
    { id: "c8", title: "Digital Growth and SEO", category: "Marketing", duration: "5 weeks", instructor: "Smriti Bhandari", price: 2499, enrolledCount: 220, modules: ["SEO Basics", "Content Strategy", "Performance Tracking", "Campaigns"], rating: 4.4, level: "Beginner", description: "Grow products using SEO and digital campaigns.", has_quiz: true, has_certificate: true }
  ],
  jobs: [
    { id: "j1", title: "Frontend Engineer", company: "Himal Tech", employerId: "e1", requiredSkills: ["React", "JavaScript", "REST"], salaryRange: "NPR 80,000 - 120,000", applicants: ["s1", "s7"], status: "Active", location: "Kathmandu", job_type: "Full-time", experienceLevel: "Mid", description: "Build delightful frontend experiences for SaaS products." },
    { id: "j2", title: "Junior Backend Developer", company: "Himal Tech", employerId: "e1", requiredSkills: ["Node.js", "SQL", "APIs"], salaryRange: "NPR 60,000 - 90,000", applicants: ["s3"], status: "Active", location: "Lalitpur", job_type: "Hybrid", experienceLevel: "Junior", description: "Implement backend services and integrations." },
    { id: "j3", title: "Data Analyst", company: "NepaFin", employerId: "e2", requiredSkills: ["Python", "Power BI", "SQL"], salaryRange: "NPR 70,000 - 110,000", applicants: ["s2", "s10"], status: "Active", location: "Kathmandu", job_type: "Full-time", experienceLevel: "Mid", description: "Drive product decisions with reliable analytics." },
    { id: "j4", title: "QA Automation Engineer", company: "NepaFin", employerId: "e2", requiredSkills: ["Cypress", "QA", "CI/CD"], salaryRange: "NPR 65,000 - 95,000", applicants: ["s6"], status: "Active", location: "Bhaktapur", job_type: "Hybrid", experienceLevel: "Junior", description: "Own test automation across releases." },
    { id: "j5", title: "BI Reporting Specialist", company: "Pokhara Data Labs", employerId: "e3", requiredSkills: ["Data Analysis", "Excel", "Communication"], salaryRange: "NPR 55,000 - 85,000", applicants: ["s2"], status: "Active", location: "Pokhara", job_type: "Full-time", experienceLevel: "Junior", description: "Build business reports for clients." },
    { id: "j6", title: "UI/UX Designer", company: "Pokhara Data Labs", employerId: "e3", requiredSkills: ["UI/UX", "Figma", "Prototyping"], salaryRange: "NPR 60,000 - 95,000", applicants: ["s4"], status: "Active", location: "Pokhara", job_type: "Remote", experienceLevel: "Mid", description: "Design polished, user-centered interfaces." },
    { id: "j7", title: "Cloud Support Engineer", company: "Lalitpur Cloud", employerId: "e4", requiredSkills: ["Cloud", "Linux", "Monitoring"], salaryRange: "NPR 70,000 - 100,000", applicants: ["s5"], status: "Active", location: "Lalitpur", job_type: "Full-time", experienceLevel: "Mid", description: "Support cloud workloads and reliability." },
    { id: "j8", title: "Security Associate", company: "Lalitpur Cloud", employerId: "e4", requiredSkills: ["Cybersecurity", "SOC", "Network"], salaryRange: "NPR 75,000 - 115,000", applicants: ["s9"], status: "Active", location: "Kathmandu", job_type: "Hybrid", experienceLevel: "Mid", description: "Strengthen platform security operations." },
    { id: "j9", title: "Growth Marketing Executive", company: "Everest Digital", employerId: "e5", requiredSkills: ["SEO", "Content", "Campaigns"], salaryRange: "NPR 50,000 - 80,000", applicants: ["s10"], status: "Active", location: "Biratnagar", job_type: "Remote", experienceLevel: "Junior", description: "Execute demand generation campaigns." },
    { id: "j10", title: "HR Talent Coordinator", company: "Everest Digital", employerId: "e5", requiredSkills: ["Recruiting", "Communication", "Coordination"], salaryRange: "NPR 45,000 - 70,000", applicants: ["s8"], status: "Active", location: "Kathmandu", job_type: "Full-time", experienceLevel: "Junior", description: "Coordinate hiring operations and interviews." }
  ],
  certificates: [
    { id: "cert1", studentId: "s1", courseId: "c1", issued_at: "2026-03-01", verification_code: "LF-2026-001", is_revoked: false },
    { id: "cert2", studentId: "s2", courseId: "c2", issued_at: "2026-03-11", verification_code: "LF-2026-002", is_revoked: false },
    { id: "cert3", studentId: "s6", courseId: "c8", issued_at: "2026-02-21", verification_code: "LF-2026-003", is_revoked: false },
    { id: "cert4", studentId: "s9", courseId: "c7", issued_at: "2026-01-30", verification_code: "LF-2026-004", is_revoked: false }
  ],
  applications: [
    { id: "app1", studentId: "s1", jobId: "j1", status: "Interview Scheduled" },
    { id: "app2", studentId: "s1", jobId: "j3", status: "Applied" },
    { id: "app3", studentId: "s2", jobId: "j3", status: "Applied" },
    { id: "app4", studentId: "s3", jobId: "j2", status: "Rejected" },
    { id: "app5", studentId: "s5", jobId: "j7", status: "Applied" },
    { id: "app6", studentId: "s6", jobId: "j4", status: "Hired" }
  ],
  kanban: {
    Applied: [{ id: "k1", name: "Priya Thapa", studentId: "s2", jobId: "j3" }],
    Interview: [{ id: "k2", name: "Aarav Sharma", studentId: "s1", jobId: "j1" }],
    Offer: [{ id: "k3", name: "Kabita Adhikari", studentId: "s6", jobId: "j4" }],
    Hired: [{ id: "k4", name: "Anish Shahi", studentId: "s9", jobId: "j8" }]
  },
  mentorAlerts: [
    { studentId: "s2", dropAmount: 5, alertSent: false },
    { studentId: "s8", dropAmount: 7, alertSent: true },
    { studentId: "s5", dropAmount: 4, alertSent: false }
  ],
  platformStats: {
    totalStudents: 3421,
    totalEmployers: 187,
    totalCourses: 128,
    placementsThisMonth: 96,
    atRiskStudents: 43
  }
}
