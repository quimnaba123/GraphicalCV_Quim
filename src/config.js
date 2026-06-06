/**
 * Configuration Module
 * Centralized configuration for the CV website
 */

export const config = {
  // 3D Background settings
  threeJS: {
    particleCount: 1500,
    particleSize: 0.05,
    rotationSpeed: {
      x: 0.5,
      y: 0.3
    },
    colors: {
      particle: null,
      gradientStart: 0.8,
      gradientEnd: 0.2
    }
  },

  // Animation settings
  animations: {
    heroDuration: 1.5,
    heroDelay: 0.3,
    stagger: 0.1,
    scrollTrigger: {
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  },

  // D3.js settings
  d3: {
    radar: {
      levels: 5,
      radius: 150,
      padding: 30,
      colors: {
        fill: 'rgba(59, 130, 246, 0.5)',
        stroke: 'rgb(59, 130, 246)',
        strokeWidth: 2
      }
    },
    axes: {
      labels: ['C++', 'C', 'Python', 'Matlab', 'CAN']
    }
  },

  // Skills configuration
  skills: {
    categories: ['languages', 'control', 'embedded', 'automotive', 'projectManagement', 'generalSoftware'],
    categoryColors: {
      languages: 'rgba(59, 130, 246, 0.6)',
      control: 'rgba(139, 92, 246, 0.6)',
      embedded: 'rgba(236, 72, 153, 0.6)',
      automotive: 'rgba(34, 197, 94, 0.6)',
      projectManagement: 'rgba(249, 115, 22, 0.6)',
      generalSoftware: 'rgba(20, 184, 166, 0.6)'
    },
    maxLevel: 90
  },

  // UI colors
  colors: {
    primary: 'rgb(59, 130, 246)',
    secondary: 'rgb(139, 92, 246)',
    white: 'rgba(255, 255, 255, 0.9)',
    white60: 'rgba(255, 255, 255, 0.6)',
    white50: 'rgba(255, 255, 255, 0.5)',
    white40: 'rgba(255, 255, 255, 0.4)',
    blue400: 'rgb(96, 165, 250)',
    blue500: 'rgb(59, 130, 246)',
    blue50020: 'rgba(59, 130, 246, 0.2)'
  },

  // Performance settings
  performance: {
    useRAF: true,
    debounceDelay: 100,
    optimizeRendering: true
  }
};