const PORTFOLIO_DATA = {
  "general": {
    "name": "Kailash Badu",
    "role": "Backend Developer & DevOps Engineer",
    "subtitle": "Passionate about Cloud Engineering & DevOps. Building the infrastructure that powers modern applications.",
    "email": "badukailash001@gmail.com",
    "resumeLink": "assets/Kailash_Badu_CV.pdf",
    "heroTyped": ["I build things for the web.", "I automate things.", "I live in the terminal."]
  },
  "about": {
    "image": "./assets/images/kailash-badu-ai.png",
    "paragraphs": [
      "Hey, I'm <strong>Kailash Badu</strong> — a Backend Developer & DevOps enthusiast based in Lalitpur, Nepal.",
      "Currently working at Jasper IT, where I build reliable web solutions and gained real-world experience in professional workflows and team collaboration. I bring hands-on corporate experience in web development with HTML, CSS, and JavaScript as my foundation.",
      "I'm pursuing my Bachelor's in Computer & Information Sciences at Tribhuvan University, alongside an intensive DevOps training program — actively building skills in cloud infrastructure, CI/CD pipelines, and automation.",
      "Highly motivated to grow into a dedicated DevOps & Cloud Engineering career."
    ],
    "stats": [
      { "num": "2.5+", "label": "Years Exp." },
      { "num": "20+", "label": "Projects" },
      { "num": "10+", "label": "Clients" }
    ],
    "education": [
      { "degree": "B.Sc. CSIT", "school": "Tribhuvan University", "period": "Jan 2022 – Jul 2026", "details": "Ongoing" },
      { "degree": "+2 Science", "school": "High School", "period": "Completed", "details": "GPA: 3.58" }
    ]
  },
  "tools": [
    { "name": "JavaScript", "icon": "fa-brands fa-js" },
    { "name": "GitHub", "icon": "fa-brands fa-github" },
    { "name": "Linux", "icon": "fa-brands fa-linux" },
    { "name": "Docker", "icon": "fa-brands fa-docker" },
    { "name": "AWS", "icon": "fa-brands fa-aws" },
    { "name": "SQL", "icon": "fa-solid fa-database" },
    { "name": "GH Actions", "icon": "fa-brands fa-github" },
    { "name": "Jenkins", "img": "https://img.icons8.com/color/48/jenkins.png" },
    { "name": "Kubernetes", "img": "https://img.icons8.com/color/48/kubernetes.png" },
    { "name": "Terraform", "img": "https://img.icons8.com/color/48/terraform.png" }
  ],
  "projects": [
    
    {
      "id": "edutrack",
      "category": "backend",
      "tag": "Dashboard",
      "title": "Edutrack",
      "description": "EduTrack is a full-stack Learning Management System built with the PERN stack (PostgreSQL, Express, React, Node.js).",
      "image": "./assets/images/edutrack.png",
      "liveUrl": "https://youtu.be/FJp91VXU-i0?si=ojC8p_ol9RjGss3g",
      "liveText": "Demo",
      "githubUrl": "https://github.com/kaibad/edutrack",
      "stack": [
        { "title": "TypeScript", "img": "https://img.icons8.com/color/48/typescript.png" },
        { "title": "PostgreSQL", "img": "https://img.icons8.com/color/48/postgreesql.png" },
        { "title": "Node.js", "img": "https://img.icons8.com/fluency/48/node-js.png" },
        { "title": "Express.js", "img": "https://img.icons8.com/ios/50/express-js.png", "bg": true }
      ]
    },
    {
      "id": "message-board",
      "category": "devops",
      "tag": "DevOps",
      "title": "Message Board",
      "description": "A 2-tier web application built with Flask and MySQL, containerized with Docker, deployed to Kubernetes using argo cd and Helm on AWS EKS.",
      "image": "./assets/images/message-board.png",
      // "liveUrl": "https://youtu.be/FJp91VXU-i0?si=ojC8p_ol9RjGss3g",
      // "liveText": "Demo",
      "githubUrl": "https://github.com/kaibad/message-board",
      "stack": [
        { "title": "Docker", "img": "https://img.icons8.com/fluency/48/docker.png" },
        { "title": "Kubernetes", "img": "https://img.icons8.com/color/48/kubernetes.png" },
        { "title": "Helm", "img": "https://img.icons8.com/external-flat-juicy-fish/60/external-development-devops-flat-flat-juicy-fish.png" },
        { "title": "Argo CD", "img": "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/argo-cd.webp" },
        { "title": "Github", "img": "https://img.icons8.com/color-glass/48/github--v1.png" },
        { "title": "AWS", "img": "https://img.icons8.com/nolan/64/amazon-web-services.png" },
      ]
    },
    {
      "id": "s3-terraform",
      "category": "devops",
      "tag": "Terraform",
      "title": "Static Site Hosting on S3",
      "description": "Static site hosting on S3 with Terraform IAC. Automate your infrastructure deployment with ease.",
      "image": "./assets/images/terraform-project.png",
      "liveText": "Demo",
      "githubUrl": "https://github.com/404bad/static-site-terraform",
      "stack": [
        { "title": "Terraform", "img": "https://img.icons8.com/color/48/terraform.png" },
        { "title": "S3", "img": "https://img.icons8.com/nolan/64/amazon-s3.png" },
      ]
    },
    {
      "id": "cicd-pokemon-practice",
      "category": "devops",
      "tag": "CICD",
      "title": "Pokemon",
      "description": "Pokemon static website automated with jenkins, github actions, S3 ,code build, code deploy, ECR. ",
      "image": "./assets/images/pokemon-cicd.png",
      "liveText": "Demo",
      "githubUrl": "https://github.com/404bad/pokemon.git",
      "stack": [
        { "title": "Jenkins", "img": "https://img.icons8.com/color/48/jenkins.png" },
        { "title": "S3", "img": "https://img.icons8.com/nolan/64/amazon-s3.png" },
        { "title": "CodeBuild", "img": "https://img.icons8.com/color-glass/48/github--v1.png" },
        { "title": "CodeDeploy", "img": "https://img.icons8.com/nolan/64/amazon-web-services.png" },
        
      ]
    },
    {
      "id": "codesage",
      "category": "backend",
      "tag": "Web App",
      "title": "CodeSage",
      "description": "CodeSage is an intelligent code review platform that leverages Google's Gemini API to provide automated, AI-powered code reviews.",
      "image": "./assets/images/codesage.webp",
      "liveUrl": "https://codesage-psi.vercel.app/",
      "githubUrl": "https://github.com/kaibad/codesage",
      "stack": [
        { "title": "Google Gemini", "img": "https://img.icons8.com/fluency/48/gemini-ai.png" },
        { "title": "TypeScript", "img": "https://img.icons8.com/color/48/typescript.png" },
        { "title": "PostgreSQL", "img": "https://img.icons8.com/color/48/postgreesql.png" },
        { "title": "Node.js", "img": "https://img.icons8.com/fluency/48/node-js.png" },
        { "title": "Express.js", "img": "https://img.icons8.com/ios/50/express-js.png", "bg": true },
        { "title": "Prisma ORM", "img": "https://img.icons8.com/color/48/prisma-orm.png" }
      ]
    },
    {
      "id": "dailyplanner",
      "category": "backend",
      "tag": "Web App",
      "title": "Daily Planner",
      "description": "Secure full-stack Daily Planner with JWT auth, MongoDB, TypeScript, and a responsive dark-themed UI built in vanilla JavaScript.",
      "image": "./assets//images/dailyplanner.webp",
      "liveUrl": "https://college-esb8.onrender.com/",
      "githubUrl": "https://github.com/404bad/college/tree/main/daily_planner",
      "stack": [
        { "title": "TypeScript", "img": "https://img.icons8.com/color/48/typescript.png" },
        { "title": "MongoDB", "img": "https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/external-mongodb-a-cross-platform-document-oriented-database-program-logo-filled-tal-revivo.png" },
        { "title": "Node.js", "img": "https://img.icons8.com/fluency/48/node-js.png" },
        { "title": "Express.js", "img": "https://img.icons8.com/ios/50/express-js.png", "bg": true }
      ]
    },
    {
      "id": "authwithmern",
      "category": "backend",
      "tag": "Backend",
      "title": "AuthWithMERN",
      "description": "A MERN app to learn authentication flows and sending emails using Mailtrap API. Features secure JWT auth, verify email, welcome emai, forgot and reset email.",
      "image": "./assets/images/authwithmern.webp",
      "liveUrl": "https://authwithmern.onrender.com/",
      "githubUrl": "https://github.com/404bad/AuthWithMERN",
      "stack": [
        { "title": "TypeScript", "img": "https://img.icons8.com/color/48/typescript.png" },
        { "title": "MongoDB", "img": "https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/external-mongodb-a-cross-platform-document-oriented-database-program-logo-filled-tal-revivo.png" },
        { "title": "Node.js", "img": "https://img.icons8.com/fluency/48/node-js.png" },
        { "title": "Express.js", "img": "https://img.icons8.com/ios/50/express-js.png", "bg": true }
      ]
    }
  ],
  "testimonials": [
    {
      "quote": "Kailash transformed our outdated website into a fast, modern WordPress platform. The design is clean, the performance improved significantly, and managing content is now effortless. Highly professional and easy to work with.",
      "author": "Sudip G. Magar",
      "role": "Infowave Solutions",
      "initials": "SGM"
    },
    {
      "quote": "What impressed us most about Kailash is his dedication and strong learning mindset. Whenever a new challenge came up, he took the time to research, experiment, and implement the best possible solution. He constantly improves his skills and applies modern practices to deliver high-quality static and WordPress websites.",
      "author": "Jimmy W.",
      "role": "Project Manager @ Jasper IT",
      "initials": "JW"
    }
  ],
  "socials": [
    { "name": "GitHub", "url": "https://github.com/kaibad" },
    { "name": "LinkedIn", "url": "https://linkedin.com/" }
  ],
  "terminalProfile": {
    "header": "KAILASH BADU — PROFILE",
    "name": "Kailash Badu",
    "role": "Backend Developer & DevOps Engineer",
    "location": "Pulchwok, Lalitpur, Nepal",
    "experience": "2.5+ years in web development",
    "focus": "CI/CD, containerization, backend architecture",
    "os": "Fedora Linux (btw)",
    "editor": "Vim",
    "shell": "Bash",
    "footer": "Building reliable web solutions from Kathmandu. Open to new opportunities."
  },
  "skills": {
    "languages": [
      { "name": "JavaScript", "level": "Intermediate", "bar": "████████░░░░" },
      { "name": "Python", "level": "Beginner", "bar": "███░░░░░░░░" },
      { "name": "SQL", "level": "Intermediate", "bar": "████████░░░░" },
      { "name": "Bash", "level": "Beginner", "bar": "███░░░░░░░░" }
    ],
    "frontend": "HTML5, CSS3, React",
    "backend": "Node.js, Express, REST APIs",
    "devops": [
      { "name": "Docker", "level": "Intermediate", "bar": "████████░░░░" },
      { "name": "Kubernetes", "level": "Beginner", "bar": "█████░░░░░░░" },
      { "name": "Terraform", "level": "Beginner", "bar": "█████░░░░░░░" },
      { "name": "GitHub Actions", "level": "Intermediate", "bar": "████████░░░░" },
      { "name": "Jenkins", "level": "Beginner", "bar": "█████░░░░░░░" },
      { "name": "Linux", "level": "Intermediate", "bar": "████████░░░░" },
      { "name": "AWS", "level": "Beginner", "bar": "█████░░░░░░░" },
      { "name": "CI/CD Pipelines", "level": "Beginner", "bar": "█████░░░░░░░" }
    ],
    "databases": "MySQL, PostgreSQL, MongoDB"
  },
  "experience": [
    {
      "period": "May 2023 – Present",
      "role": "Web Developer",
      "company": "Jasper IT",
      "location": "Lalitpur",
      "tasks": [
        "Build static websites with PHP, HTML, CSS & JavaScript",
        "Develop dynamic sites by customising WordPress themes",
        "Implement WooCommerce solutions for eCommerce clients",
        "Lead the development team & handle troubleshooting",
        "Ensure smooth, responsive & functional deliverables"
      ]
    }
  ],
  "contact": {
    "phone": "+977 9843952547",
    "email": "badukailash001@gmail.com",
    "linkedin": "linkedin.com/in/kailashbadu-9200142b3",
    "location": "Lalitpur, Nepal",
    "availability": "Open to freelance projects, full-time roles, and interesting open-source collaborations. Drop me a message and I'll get back within 24h."
  },
  "hobbies": [
    "🏏🏓 Cricket & Table Tennis",
    "💻 Building personal projects",
    "📚 Reading: systems design, technology, sci-fi, and philosophy",
    "🏔️ Weekend hiking, trail running, and nature exploration",
    "☕ Specialty coffee enthusiast — pour-over purist"
  ],
  "setup": {
    "os": "Fedora Linux x86_64",
    "shell": "Bash",
    "editor": "Vim",
    "browser": "Chrome",
    "terminal": "GNOME Terminal",
    "font": "JetBrains Mono"
  },
  "certifications": [
    {
      "title": "Professional DevOps Training Certificate",
      "issuer": "Broadway Infosys",
      "date": "2026",
      "image": "./assets/images/1777535333_11618_802757_page-0001.webp",
      "skills":[
          {"title": "Linux", "img": "https://img.icons8.com/color/48/linux.png"},
          {"title": "Bash", "img": "https://img.icons8.com/color/48/bash.png"},
          {"title": "Docker", "img": "https://img.icons8.com/color/48/docker.png"},
          {"title": "Kubernetes", "img": "https://img.icons8.com/color/48/kubernetes.png"},
          {"title": "Terraform", "img": "https://img.icons8.com/color/48/terraform.png"},
          {"title": "GitHub Actions", "img": "https://img.icons8.com/color/48/github.png"},
          {"title": "Jenkins", "img": "https://img.icons8.com/color/48/jenkins.png"},
          {"title": "AWS", "img": "https://img.icons8.com/nolan/64/amazon-web-services.png"}
        ]
    },
    {
      "title": "GitHub Foundations",
      "issuer": "CodeIT",
      "date": "2025",
      "image": "./assets/images/cert-github-opt.jpg"
    },
    {
      "title": "Database Fundamentals",
      "issuer": "CodeIT",
      "date": "2026",
      "image": "./assets/images/cert-db-opt.jpg"
    },
    {
      "title": "React Development",
      "issuer": "SikaiIT",
      "date": "2025",
      "image": "./assets/images/cert-react.webp"
    }
  ],
  "footer": {
    "tagline": "Architecting reliable systems and automating the future.",
    "description": "Backend Developer & DevOps enthusiast dedicated to building high-performance, scalable cloud infrastructures. Currently exploring the intersection of distributed systems and automation."
  }
};
