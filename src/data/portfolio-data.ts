import type { Portfolio } from '../types'

function calcExperienceYears(): number {
  const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25
  const span1 = new Date(2018, 6).getTime() - new Date(2016, 5).getTime() // Jun 2016 – Jul 2018
  const span2 = Date.now()               - new Date(2019, 1).getTime() // Feb 2019 – present
  return Math.floor((span1 + span2) / MS_PER_YEAR)
}

export const yearsExperience = calcExperienceYears()

const data: Portfolio = {
  name: "Deepak Kumar Prasad",
  title: "Senior Application Architect",
  tagline: `${yearsExperience}+ years · Supply Chain Platforms · Python · Distributed Systems · 150+ Global Clients`,
  email: "deepak.prasad.ai@gmail.com",
  phone: "+91 88613 27919 & +1 (707) 733-3727",
  linkedin: "https://linkedin.com/in/dpkpr1",
  linkedinLabel: "linkedin.com/in/dpkpr1",
  github: "https://github.com/beingdpkpr",
  githubLabel: "github.com/beingdpkpr",
  location: "Bangalore, India · Open to Relocation",

  about: `Software Architect with ${yearsExperience}+ years designing large-scale supply chain planning platforms serving 150+ global clients. Deep expertise in distributed systems, solver integrations, multi-layer config frameworks, and performance engineering—delivering 50% compute reduction and 30% memory optimization in production environments. Proven ability to define technical direction, lead 10+ person engineering teams, and translate complex domain problems into scalable platform architecture.`,

  experience: [
    {
      title: "Senior Application Architect",
      company: "o9 Solutions",
      period: "Apr 2025 – Present",
      duration: "Current",
      location: "Bangalore, India",
      bullets: [
        "Architected the Supply Planning platform configuration framework — a multi-layer system (Product Default, Product Override, Project Config, Tenant Config) supporting namespace-partitioned overrides, hot-reload via atomic replacement, and schema-validated merge precedence; eliminated config drift across 150+ client deployments and enabled zero-downtime tenant onboarding",
        "Defined technical roadmap and led engineering team of 10+ developers: conducted architecture reviews, established coding standards, drove performance benchmarking culture, and mentored engineers on supply planning domain and distributed systems design.",
        "Managed people and performance for a team of 10+ engineers: owned hiring decisions, conducted regular 1:1s and performance reviews, and managed performance improvement plans (PIPs) to support engineer growth.",
      ],
    },
    {
      title: "Application Architect",
      company: "o9 Solutions",
      period: "Apr 2021 – Apr 2025",
      duration: "4 yrs",
      location: "Bangalore, India",
      bullets: [
        "Re-engineered core Supply Planning compute pipeline (TLB, MRP, IOP) with advanced parameterization and memory-efficient data structures, achieving 50% reduction in batch computation time and 30% decrease in memory usage across production environments",
        "Designed and integrated 6+ third-party optimization solvers with the o9 platform—including Samsung NSR solver using Boost serialization and Parquet-based data exchange—standardizing the solver integration contract and improving deployment scalability across client environments.",
        "Designed foundational Demand Netting and Order Promising plugins — mission-critical modules now serving 150+ clients globally",
        "Engineered productivity suite of 7 tools (Tenant Extractor, Builder, Performance Analyzer, Test Recorder/Runner, Rule Creator, Dataset Multiplier) improving consultant productivity by 25%, adopted by 100+ internal teams",
        "Established a modular plugin versioning system managing 30+ plugin variants, enabling independent deployment and customization per client without disrupting the core platform—reducing release risk and accelerating client onboarding cycles.",
      ],
    },
    {
      title: "Senior Software Engineer",
      company: "o9 Solutions",
      period: "Aug 2019 – Apr 2021",
      duration: "1 yr 8 mo",
      location: "Bangalore, India",
      bullets: [
        "Built and optimized core supply planning platform modules in Python and C++",
        "Collaborated with product teams to translate complex supply chain business requirements into technical specs",
        "Mentored junior engineers and contributed to hiring and onboarding processes",
        "Delivered performance improvements reducing API latency and improving batch throughput",
      ],
    },
    {
      title: "Python Developer (Contract)",
      company: "o9 Solutions",
      period: "Feb 2019 – Aug 2019",
      duration: "7 mo",
      location: "Bangalore, India",
      bullets: [
        "Developed Python-based supply planning plugins integrated into the o9 enterprise platform",
        "Rapidly onboarded onto large-scale codebase and delivered client-facing features within weeks",
      ],
    },
    {
      title: "Associate Engineer",
      company: "Primesoft Solutions Inc",
      period: "Jun 2016 – Jul 2018",
      duration: "2 yrs",
      location: "Bangalore, India",
      bullets: [
        "Architected workflow orchestration microservice leveraging Netflix Conductor for enterprise orchestration requirements",
        "Modernized a large-scale enterprise security platform by integrating 5+ Google APIs and refactoring core subsystems, improving system reliability and reducing technical debt across the codebase.",
        "Built Attendance & Visitor Management systems on Android, automating check-ins and reducing manual overhead by 70%",
      ],
    },
  ],

  projects: [
    {
      title: "Platform Configuration Framework",
      tags: ["Python", "Architecture", "Multi-layer Config", "Supply Chain", "Performance"],
      description: "Designed a multi-layer configuration system (Product Default → Product Override → Project Config → Tenant Config) with namespace-partitioned overrides, hot-reload via atomic replacement, and schema-validated merge precedence. Eliminated config drift across 150+ client deployments and enabled zero-downtime tenant onboarding.",
      highlight: "Zero config drift · 150+ clients",
    },
    {
      title: "Supply Planning Re-engineering",
      tags: ["Python", "PySpark", "Performance Engineering", "Enterprise", "Delta Lake", "OLAP"],
      description: "Re-architected critical supply planning components enabling advanced parameterization, achieving 50% faster batch runs and 30% lower memory footprint across 150+ client deployments.",
      highlight: "50% faster · 30% less memory",
    },
    {
      title: "Demand Netting & Order Promising",
      tags: ["Python", "Supply Chain", "Platform Design"],
      description: "Designed foundational Demand Netting and Order Promising plugins from scratch. Now mission-critical modules serving 150+ global clients with advanced configuration and enterprise-scale monitoring.",
      highlight: "150+ clients globally",
    },
    {
      title: "Solver Integration Suite",
      tags: ["C++", "Boost", "Parquet", "Systems", "Docker", "Kubernetes"],
      description: "Architected and delivered integrations for 6+ third-party optimization solvers including Samsung NSR, using Boost serialization and Parquet-based data exchange to improve reliability and deployment scalability.",
      highlight: "6+ solver integrations",
    },
    {
      title: "Developer Productivity Suite",
      tags: ["Python", "Tooling", "Internal Platform", "Efficiency"],
      description: "Engineered 7-tool productivity suite: Tenant Extractor, Builder, Performance Analyzer, Test Recorder/Runner, Rule Creator, and Dataset Multiplier. Adopted by 100+ internal teams, improving consultant productivity 25%.",
      highlight: "100+ teams · 25% productivity gain",
    },
    {
      title: "Workflow Orchestration Microservice",
      tags: ["Java", "Netflix Conductor", "Microservices"],
      description: "Architected enterprise workflow orchestration microservice by customizing Netflix Conductor for complex enterprise requirements. Integrated into production infrastructure handling business-critical workflows.",
      highlight: "Enterprise-scale orchestration",
    },
  ],

  skills: [
    { category: "Languages", items: ["Python", "Java", "C / C++", "SQL"] },
    { category: "Frameworks & Libraries", items: ["FastAPI", "Angular", "ReactJS", "Streamlit", "Boost (C++)", "LangGraph"] },
    { category: "Data & Messaging", items: ["PostgreSQL", "Parquet", "ETL Pipelines", "Data Serialization", "RDBMS"] },
    { category: "DevOps & Infrastructure", items: ["Docker", "Kubernetes", "CI/CD", "Linux", "Git"] },
    { category: "Architecture", items: ["Distributed Systems", "Microservices", "Multi-layer Config Frameworks", "API Design", "Performance Optimization", "Solver Integration"] },
    { category: "Domain", items: ["Supply Chain Planning (MRP, TLB, IOP, Demand Netting, Order Promising)", "Technical Leadership", "People Management"] },
    { category: "AI & Automation", items: ["LLM Orchestration (LangGraph, multi-agent patterns)", "Claude API", "Python automation tooling"] },
    { category: "Spoken Languages", items: ["English", "Hindi", "Manipuri", "Bhojpuri", "German"] },
  ],

  education: [
    {
      degree: "Bachelor of Engineering — Computer Science",
      institution: "Sri Jayachamarajendra College of Engineering (SJCE), Mysore",
      year: "2016",
      detail: "Aug 2012 – May 2016",
      gpa: "8.01 / 10",
      projects: [
        {
          title: "Gender Recognition based on Palm-print",
          description: "Captured palm-print images and classified gender based on biometric dimensions such as palm width and finger length using image processing techniques.",
          tech: "MATLAB, Image Processing",
        },
        {
          title: "Congestion Control for Computer Networks",
          description: "Implemented priority-based load-shedding to manage congestion in high-traffic networks.",
          tech: "C Programming",
        },
        {
          title: "Web Tutorial",
          description: "Developed a text and video-based e-learning website offering tutorial content to assist student learning.",
          tech: "HTML, CSS, JavaScript",
        },
      ],
    },
    {
      degree: "All India Senior Secondary Certificate Examination (AISSCE)",
      institution: "Jawahar Navodaya Vidyalaya, Bishnupur (JNV) · Class XII with Science (CBSE)",
      year: "2011",
      detail: "Year of Completion: 2011",
      gpa: "89.8%",
      achievements: [
        "Secured high distinction in Mathematics (100/100).",
        "Represented school at the Regional Mathematics Exhibition.",
      ],
    },
    {
      degree: "All India Secondary Certificate Examination (AISCE)",
      institution: "Jawahar Navodaya Vidyalaya, Bishnupur (JNV) · Class X (CBSE)",
      year: "2009",
      detail: "Year of Completion: 2009",
      gpa: "88.8%",
      achievements: [
        "Represented school at the Regional Table Tennis tournament.",
        "Scored 99/100 in Mathematics.",
      ],
    },
  ],

  certifications: [
    {
      name: "Design for Performance Architect",
      issuer: "o9 Solutions · Credly",
      year: "Oct 2023",
      type: "course",
      verify: "https://www.credly.com/badges/fdab58f7-336c-4254-be95-11fcab229d88/linked_in_profile",
    },
    {
      name: "Claude AI Development",
      issuer: "Anthropic Education · 3 courses",
      year: "Apr 2026",
      type: "specialization",
      verify: "https://verify.skilljar.com/c/rps263ifdqdw",
      courses: [
        { name: "Model Context Protocol: Advanced Topics", verify: "https://verify.skilljar.com/c/rps263ifdqdw" },
        { name: "Introduction to Agent Skills", verify: "https://verify.skilljar.com/c/m8q9aj7ogvav" },
        { name: "Claude 101", verify: "https://verify.skilljar.com/c/v6yf6n8cepzs" },
      ],
    },
    {
      name: "Python for Everybody",
      issuer: "University of Michigan · Coursera Specialization (5 courses)",
      year: "May 2017",
      type: "specialization",
      verify: "https://coursera.org/verify/specialization/UMHX9HMEFYZ6",
      courses: [
        { name: "Programming for Everybody (Getting Started with Python)", verify: "https://coursera.org/verify/F29FV3UC9NSU" },
        { name: "Python Data Structures", verify: "https://coursera.org/verify/B9TUDRJRDRMM" },
        { name: "Using Python to Access Web Data", verify: "https://coursera.org/verify/4BYNZT4XLYM6" },
        { name: "Using Databases with Python", verify: "https://coursera.org/verify/ELRK5WCFW6HG" },
        { name: "Capstone: Retrieving, Processing, and Visualizing Data with Python", verify: "https://coursera.org/verify/QEXUR86WJK2A" },
      ],
    },
    {
      name: "Introduction to Data Science",
      issuer: "IBM · Coursera Specialization (4 courses)",
      year: "Jan 2021",
      type: "specialization",
      verify: "https://coursera.org/verify/specialization/RVJWUCUESX9A",
      courses: [
        { name: "What is Data Science?", verify: "https://coursera.org/verify/GMA24YMD3N26" },
        { name: "Tools for Data Science", verify: "https://coursera.org/verify/PCEAYQV8O2WL" },
        { name: "Data Science Methodology", verify: "https://coursera.org/verify/HN5VWMX9L685" },
        { name: "Databases and SQL for Data Science with Python", verify: "https://coursera.org/verify/A5J445CLAHHC" },
      ],
    },
    {
      name: "Programming Foundations with JavaScript, HTML and CSS",
      issuer: "Duke University · Coursera · WITH HONORS",
      year: "Dec 2017",
      type: "course",
      verify: "https://coursera.org/verify/GFYAS78H7D7L",
    },
    {
      name: "IBM Blockchain Foundation for Developers",
      issuer: "IBM · Coursera",
      year: "Dec 2017",
      type: "course",
      verify: "https://coursera.org/verify/CQRKEMJ5S7MR",
    },
  ],

  testimonials: [
    {
      name: 'Rahul Bajaj',
      title: 'Senior Manager — Supply Chain Planning',
      company: 'o9 Solutions',
      relationship: 'Rahul managed Deepak directly',
      date: 'April 2025',
      linkedinUrl: 'https://www.linkedin.com/in/dpkpr1/details/recommendations/?detailScreenTabIndex=0',
      text: "I had the pleasure of working with Deepak during our joint stint at o9, and his technical/programming expertise was truly top-notch. He consistently delivered clean, efficient solutions and approached every challenge with a thoughtful, problem-solving mindset. He has a very high ability of exploring new technologies to solve a problem. Beyond technical skill, Deepak is a great team player—reliable and always ready to help others. His contribution made a real difference, and I'd highly recommend him for any role that values strong programming skill and collaboration.",
    },
    {
      name: 'Yashad Kasar',
      title: 'Product Manager — Supply Chain',
      company: 'o9 Solutions',
      relationship: 'Yashad was senior to Deepak',
      date: 'June 2020',
      linkedinUrl: 'https://www.linkedin.com/in/dpkpr1/details/recommendations/?detailScreenTabIndex=0',
      text: 'Worked with Deepak on Industry Solutions projects at o9. I find him to be an extremely diligent, hard working and focused person. He is also a team player and I have experienced it first hand. His development skills are great and he is surely an asset for any team he works with.',
    },
    {
      name: 'Vinayak Samant',
      title: 'Consultant — Supply Chain Product Management, Development & Implementations',
      company: 'o9 Solutions',
      relationship: 'Vinayak managed Deepak directly',
      date: 'March 2020',
      linkedinUrl: 'https://www.linkedin.com/in/dpkpr1/details/recommendations/?detailScreenTabIndex=0',
      text: 'Deepak played the role of a developer in our team. He was very diligent, hard-working and always enthusiastic about learning new technologies. His hunger for knowledge and skills is very visible while working with him. He is also very flexible with work and owns up the complete software development included testing to a great extent. This is a very rare combination I have seen. Any dev assignment was delivered with very high quality in terms of both code and usability (UI perspective).',
    },
    {
      name: 'Dhanesh Pai',
      title: 'Project Manager',
      company: 'PrimeSoft IP Solutions',
      relationship: 'Dhanesh managed Deepak directly',
      date: 'March 2018',
      text: "I have known Deepak in my capacity as his Project Manager for over two years, during which he worked on cloud-native application backend and frontend development. He is proficient in Java, Python, C/C++, and AngularJS and is a full stack developer. Deepak is a quick learner and hardworking — consistently the top performer in my team. He is highly intelligent with strong analytical skills and excellent communication skills; his written work is both clear and concise. He is an excellent team player who has helped team members during shortfalls and crisis situations, actively participated in sprint planning and standups, and is skilled at pushing back professionally when needed. He went well beyond project requirements in quantity and quality, completing additional research and professional certifications throughout. Deepak demonstrated great perseverance and initiative in all fields — he has my highest endorsement.",
    },
  ],

}

export default data
