# Thimothi Raju — Personal Developer Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Status-Live%20%26%20Active-brightgreen?style=for-the-badge&logo=vercel&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

<p align="center">
  <strong>A modern, cinematic, high-performance personal developer portfolio built with React 19, TypeScript, Tailwind CSS v4, and interactive physics-based UI components.</strong>
</p>

[Explore Sections](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Contact](#-connect-with-me)

</div>

---

## 🌟 Overview

This portfolio showcases the academic achievements, technical skill set, certifications, and engineering projects of **Thimothi Raju**, a Computer Science and Engineering student at **VIT-AP University**.

Designed with rich aesthetics, sleek glassmorphism, dynamic animations, and tactile 3D interactions, it delivers an engaging first impression for recruiters, engineering leaders, and collaborators.

---

## 🚀 Key Features

### 1. 🎯 Cinematic Hero Section
- **Dynamic Signature & Branding**: Fluid typography featuring vertical text blur animations.
- **Theme Switcher**: Seamless instant toggle between Dark Mode and Light Mode.
- **Quick Navigation Dropdown**: Responsive navbar menu with hardware-accelerated smooth scrolling to any section.

### 2. 👤 About & Developer Identity
- **Story & Metrics**: Overview of engineering philosophy alongside animated counters for **9.54 CGPA** and **10+ Projects**.
- **Interactive 3D Tilt Card**: Profile card featuring perspective-tracking cursor tilt and animated `#C3E41D` lime gradient border sweeps.
- **Direct Connect CTA**: Quick email integration for opportunities and collaborations.

### 3. 💼 Education & Experience
- **Academic Milestones**:
  - **B.Tech CSE** — VIT-AP University (*9.54 CGPA*)
  - **Intermediate (MPC)** — Sri Chaitanya Junior College (*98.7%*)
  - **10th SSC** — Sun Shine E.M. High School (*99.33%*)
- **Career Roadmap**: Timeline view for professional engineering milestones and industry internships.
- **Micro-Interactions**: Real-time 3D tilt tracking with smooth easing on hover.

### 4. ⚡ Skills & Technology Matrix
- **7 Core Categories**:
  - Programming Languages (Java, Python, C)
  - Web Technologies (HTML, CSS, JavaScript)
  - Frameworks & Libraries (React.js, Node.js, Express.js)
  - Databases (MySQL, MongoDB)
  - Tools & Platforms (Git, GitHub, VS Code)
  - Soft Skills (Problem Solving, Teamwork, Time Management, Accountability)
  - Cloud & AWS (EC2, S3, IAM, RDS, VPC, CloudWatch, CloudFormation)
- **Authentic Brand Logos**: High-fidelity developer brand SVG icons with floating tooltips and brand-colored glows.
- **Continuous Marquee Ticker**: Infinite scrolling technology banner with pause-on-hover capability.

### 5. 📜 Interactive Certifications Wall
- **Realistic Hanging Rope Physics**: Polaroid-style certification cards suspended from realistic ropes that react to drag interactions and ambient wind physics.
- **Modal Inspection**: Full-screen certificate modal with direct verification links.

### 6. 🌐 Interactive 3D Globe & Contact Hub
- **Canvas-Rendered Rotating Globe**: 3D wireframe hemisphere globe with country landmass borders and animated pinging location markers.
- **Functional Contact Form**: Direct message delivery powered by FormSubmit.
- **Quick-Copy Actions**: One-click clipboard copy for phone number and email address with live confirmation feedback.

### 7. 🎬 Cinematic Animated Footer
- **Tilted Marquee Banner**: Continuous infinite banner subtly tilted at -3.5° with smooth blurred edge dissolves.
- **Live Local Time**: Real-time IST (Indian Standard Time) clock indicator.
- **Magnetic Social Pills**: Interactive floating pill links to GitHub, LinkedIn, LeetCode, and Instagram.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Bundler & Dev Server** | [Vite](https://vitejs.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/) |
| **Physics & Canvas** | HTML5 Canvas 2D / 3D wireframe math and Verlet rope integration |
| **Form Processing** | [FormSubmit](https://formsubmit.co/) |

---

## 📂 Project Structure

```text
portfolio_2027/
├── public/
│   ├── aws-icons/               # Official AWS architecture service icons
│   ├── images/                  # Project assets and portraits
│   └── profile.png              # Developer profile avatar
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── about-section.tsx          # Biography, stats, and profile tilt card
│   │       ├── certifications-section.tsx # Hanging rope polaroid certificates
│   │       ├── contact-section.tsx        # 3D rotating globe & email form
│   │       ├── education-section.tsx      # Academic journey & degrees
│   │       ├── experience-section.tsx     # Career milestones & roadmap
│   │       ├── footer-section.tsx         # Cinematic marquee & magnetic links
│   │       ├── portfolio-hero.tsx         # Hero banner, navbar, theme switch
│   │       ├── projects-section.tsx       # Featured project showcases
│   │       ├── skill-icons.tsx            # Brand SVG icons & metadata
│   │       ├── skills-section.tsx         # Categorized skills & marquee ticker
│   │       ├── tilt-card.tsx              # Reusable 3D tilt & lime gradient wrapper
│   │       ├── timeline-content.tsx       # Intersection observer animation wrapper
│   │       └── vertical-cut-reveal.tsx    # Text reveal animations
│   ├── App.tsx                  # Root application container
│   ├── demo.tsx                 # Main page layout composing all sections
│   ├── index.css                # Global design tokens, theme vars & keyframes
│   └── main.tsx                 # React DOM mount point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Timothy-Raju/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## 📬 Connect With Me

- **Email**: [rajupalanki1037@gmail.com](mailto:rajupalanki1037@gmail.com)
- **LinkedIn**: [linkedin.com/in/thimothi-raju](https://www.linkedin.com/in/thimothi-raju)
- **GitHub**: [github.com/Timothy-Raju](https://github.com/Timothy-Raju)
- **LeetCode**: [leetcode.com/u/fBAwIMcOGv](https://leetcode.com/u/fBAwIMcOGv/)

---

<div align="center">
  <sub>Crafted with passion, modern web standards, and precision engineering by <strong>Thimothi Raju</strong>.</sub>
</div>
