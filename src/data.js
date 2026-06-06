/**
 * Data Module
 * Centralized data management for the CV website
 */

import { config } from './config.js';

export const experienceData = [
  {
    title: "Consultant Software Engineer",
    company: "Creadis S.A",
    period: "Nov 2021 - Present",
    description: "Wind Energy Sector - Control software for wind systems and turbine components, including plant start-up, reactive power management, lubrication control and load control. Worked through the full lifecycle: requirements definition, software architecture, implementation in C++ and Matlab/Simulink, and validation with unit tests.",
    achievements: ["Designed and implemented start-up and reactive power controllers for Vestas wind plants, and object-oriented design algorithms for Turbine Control", "Led system modularization and automated documentation and validation using LaTeX, Artificial Intelligence, and Simulink Test Harness", "Collaborated with international teams to integrate new load control functionality and improve system reliability"]
  },
  {
    title: "Software Engineer",
    company: "Ficosa S.L",
    period: "Feb 2018 - Nov 2021",
    description: "Automotive Sector - Developed critical C applications for Volkswagen Group parking assistance systems. Part of the ASPICE development chain from requirements definition to unit and integration testing, with a focus on traceability and safety.",
    achievements: ["Designed a rear-view camera calibration algorithm in C meeting the functional requirements", "Produced complete architectural documentation and contributed to the top-view camera system design", "Debugged complex issues through CAN, Ethernet and RTP trace analysis", "Developed a Python tool to automate Jira task generation, accelerating up to 90% the project planning"]
  },
  {
    title: "Telecommunications Engineering Degree",
    company: "Universitat Politècnica de Catalunya",
    period: "2013 - 2018",
    description: "Specialized in Electronic Systems. Thesis on Ficosa's PM automation tool.",
    achievements: ["Focus on Electronic Systems specialization", "Completed thesis on process automation tools development"]
  }
];

export const skillsData = {
  languages: [
    { name: "C++", level: 85 },
    { name: "C", level: 90 },
    { name: "Python", level: 80 },
    { name: "Matlab", level: 85 },
    { name: "Bash", level: 75 },
    { name: "Java", level: 70 },
    { name: "VisualBasic", level: 65 },
    { name: "SQL", level: 80 }
  ],
  control: [
    { name: "Matlab", level: 85 },
    { name: "Simulink", level: 85 }
  ],
  embedded: [
    { name: "Lauterbach TRACE32", level: 80 },
    { name: "J-Link (Segger)", level: 80 }
  ],
  automotive: [
    { name: "Vector Tools", level: 85 },
    { name: "ASPICE", level: 80 },
    { name: "Doors", level: 75 }
  ],
  projectManagement: [
    { name: "Jira", level: 85 },
    { name: "Excel", level: 90 },
    { name: "SVN", level: 80 }
  ],
  generalSoftware: [
    { name: "Git", level: 85 },
    { name: "Windows", level: 90 },
    { name: "Linux", level: 75 },
    { name: "CAN", level: 85 },
    { name: "ETH", level: 80 },
    { name: "RTP", level: 75 },
    { name: "Docker", level: 70 },
    { name: "LaTeX", level: 75 },
    { name: "Enterprise Architect", level: 70 }
  ]
};

export const projectsData = [
  {
    title: "Wind Turbine Control System",
    description: "Control software for wind systems and turbine components, including plant start-up, reactive power management, lubrication control and load control.",
    tech: ["C++", "Matlab/Simulink", "Vestas", "Siemens Energy"],
    link: "#",
    icon: "🌀",
    industry: "wind"
  },
  {
    title: "Rear View Camera Calibration",
    description: "Critical C application for Volkswagen Group parking assistance systems. Designed a rear-view camera calibration algorithm meeting functional requirements.",
    tech: ["C", "Volkswagen Group", "CAN", "Ethernet", "RTP"],
    link: "#",
    icon: "📷",
    industry: "automotive"
  },
  {
    title: "PM Automation Tool",
    description: "Telecommunications Engineering thesis on process automation tools development at Ficosa.",
    tech: ["Python", "Automation", "Process Management", "XML"],
    link: "#",
    icon: "⚙️",
    industry: "general"
  },
  {
    title: "Jira Task Automation",
    description: "Python tool to automate Jira task generation, accelerating project planning up to 90%.",
    tech: ["Python", "Jira", "Automation", "API"],
    link: "#",
    icon: "📊",
    industry: "general"
  },
  {
    title: "Documentation Generator",
    description: "Automated documentation and validation using LaTeX and Artificial Intelligence for system documentation.",
    tech: ["LaTeX", "AI", "Documentation", "Validation"],
    link: "#",
    icon: "📝",
    industry: "general"
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