/**
 * Data Module
 * Centralized data management for the CV website
 */

import { config } from './config.js';

export const experienceData = [
  {
    title: "Senior Software Engineer",
    company: "Tech Company Inc.",
    period: "2021 - Present",
    description: "Leading development of enterprise applications and mentoring junior developers",
    achievements: ["Led team of 5 developers", "Reduced load times by 40%", "Implemented CI/CD pipeline"]
  },
  {
    title: "Full Stack Developer",
    company: "Digital Agency",
    period: "2018 - 2021",
    description: "Built responsive web applications using modern frameworks",
    achievements: ["Developed 20+ client projects", "Migrated legacy systems to React", "Improved SEO rankings by 60%"]
  },
  {
    title: "Frontend Developer",
    company: "StartUp Hub",
    period: "2016 - 2018",
    description: "Created interactive user interfaces and experience prototypes",
    achievements: ["Designed responsive layouts", "Implemented accessibility features", "Reduced bug rate by 35%"]
  }
];

export const skillsData = {
  frontend: [
    { name: "JavaScript", level: 95 },
    { name: "React", level: 90 },
    { name: "Vue", level: 85 },
    { name: "TypeScript", level: 80 }
  ],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "Python", level: 75 },
    { name: "PostgreSQL", level: 80 },
    { name: "Redis", level: 70 }
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "Docker", level: 80 },
    { name: "AWS", level: 75 },
    { name: "CI/CD", level: 85 }
  ]
};

export const projectsData = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack shopping experience with real-time inventory",
    tech: ["React", "Node.js", "MongoDB", "Redis"],
    link: "#",
    icon: "🛒"
  },
  {
    title: "Dashboard Analytics",
    description: "Real-time data visualization and reporting system",
    tech: ["Vue.js", "D3.js", "GraphQL", "PostgreSQL"],
    link: "#",
    icon: "📊"
  },
  {
    title: "Mobile App",
    description: "Cross-platform mobile application with social features",
    tech: ["React Native", "Firebase", "Redux"],
    link: "#",
    icon: "📱"
  },
  {
    title: "AI Integration",
    description: "Machine learning powered recommendation engine",
    tech: ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
    link: "#",
    icon: "🤖"
  },
  {
    title: "Cloud Infrastructure",
    description: "Scalable cloud architecture and DevOps pipeline",
    tech: ["AWS", "Docker", "Kubernetes", "Terraform"],
    link: "#",
    icon: "☁️"
  },
  {
    title: "Security Suite",
    description: "Comprehensive security monitoring and protection",
    tech: ["Node.js", "Redis", "WAF", "Logging"],
    link: "#",
    icon: "🔒"
  }
];

/**
 * Get configuration for a specific data type
 * @param {string} type - Type of data (experience, skills, projects)
 * @returns {object} Configuration object
 */
export function getConfig(type) {
  const configs = {
    experience: {
      containerId: 'timeline',
      itemClass: 'timeline-item',
      containerClass: 'timeline-container'
    },
    projects: {
      containerId: 'projects-grid',
      itemClass: 'project-card',
      containerClass: 'projects-container'
    }
  };
  return configs[type] || {};
}