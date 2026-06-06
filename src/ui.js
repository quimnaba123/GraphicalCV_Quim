/**
 * UI Components Module
 * Handles rendering of UI sections
 */

import { config } from './config.js';
import { experienceData, projectsData, getConfig } from './data.js';

/**
 * UI Renderer class
 */
export class UIRenderer {
  constructor() {
    this.elements = new Map();
    this.isInitialized = false;
  }

  /**
   * Initialize all UI components
   */
  init() {
    if (this.isInitialized) {
      console.warn('UI components already initialized');
      return;
    }

    try {
      this.initTimeline();
      this.initProjectsGrid();
      this.isInitialized = true;
      console.log('UI components initialized successfully');
    } catch (error) {
      console.error('Failed to initialize UI components:', error);
    }
  }

  /**
   * Initialize timeline section
   */
  initTimeline() {
    const timelineContainer = document.getElementById('timeline');

    if (!timelineContainer) {
      console.warn('Timeline container not found');
      return;
    }

    // Clear existing content
    timelineContainer.innerHTML = '';

    // Create timeline items
    experienceData.forEach((exp, index) => {
      const item = this.createTimelineItem(exp, index);
      timelineContainer.appendChild(item);
    });

    // Cache container for later updates
    this.elements.set('timeline', timelineContainer);
  }

  /**
   * Create a single timeline item
   * @param {object} exp - Experience data
   * @param {number} index - Item index
   * @returns {HTMLElement} Timeline item element
   */
  createTimelineItem(exp, index) {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.setAttribute('data-index', index);

    item.innerHTML = `
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <div class="timeline-header">
          <div class="timeline-title">
            <h3 class="timeline-title-text">${exp.title}</h3>
            <p class="timeline-company">${exp.company}</p>
          </div>
          <span class="timeline-period">${exp.period}</span>
        </div>
        <p class="timeline-description">${exp.description}</p>
        <ul class="timeline-achievements">
          ${exp.achievements.map(a => `
            <li class="timeline-achievement">
              <span class="achievement-icon"></span>
              ${a}
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    return item;
  }

  /**
   * Initialize projects grid section
   */
  initProjectsGrid() {
    const projectsContainer = document.getElementById('projects-grid');

    if (!projectsContainer) {
      console.warn('Projects container not found');
      return;
    }

    // Clear existing content
    projectsContainer.innerHTML = '';

    // Create project cards
    projectsData.forEach((project, index) => {
      const card = this.createProjectCard(project, index);
      projectsContainer.appendChild(card);
    });

    // Cache container for later updates
    this.elements.set('projects', projectsContainer);
  }

  /**
   * Create a single project card
   * @param {object} project - Project data
   * @param {number} index - Card index
   * @returns {HTMLElement} Project card element
   */
  createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-index', index);

    card.innerHTML = `
      <div class="project-image">
        <span class="project-icon">${project.icon || '🎨'}</span>
      </div>
      <div class="project-info">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.tech.map(t => `
            <span class="tech-tag">${t}</span>
          `).join('')}
        </div>
        <a href="${project.link}" class="project-link">
          View Project
          <span class="arrow-icon">→</span>
        </a>
      </div>
    `;

    return card;
  }

  /**
   * Update timeline data
   * @param {object[]} newData - New timeline data
   */
  updateTimeline(newData) {
    const timelineContainer = this.elements.get('timeline');
    if (!timelineContainer) {
      console.warn('Timeline container not found');
      return;
    }

    try {
      // Clear and re-render
      timelineContainer.innerHTML = '';
      newData.forEach((exp, index) => {
        const item = this.createTimelineItem(exp, index);
        timelineContainer.appendChild(item);
      });

      console.log('Timeline updated successfully');
    } catch (error) {
      console.error('Failed to update timeline:', error);
    }
  }

  /**
   * Update projects data
   * @param {object[]} newData - New projects data
   */
  updateProjects(newData) {
    const projectsContainer = this.elements.get('projects');
    if (!projectsContainer) {
      console.warn('Projects container not found');
      return;
    }

    try {
      // Clear and re-render
      projectsContainer.innerHTML = '';
      newData.forEach((project, index) => {
        const card = this.createProjectCard(project, index);
        projectsContainer.appendChild(card);
      });

      console.log('Projects updated successfully');
    } catch (error) {
      console.error('Failed to update projects:', error);
    }
  }

  /**
   * Cleanup all UI components
   */
  cleanup() {
    this.elements.forEach((element) => {
      element.innerHTML = '';
    });
    this.elements.clear();
    this.isInitialized = false;
  }

  /**
   * Check if UI components are initialized
   * @returns {boolean}
   */
  isActive() {
    return this.isInitialized;
  }
}

/**
 * Create and initialize UI renderer
 * @returns {UIRenderer} Renderer instance
 */
export function createUIRenderer() {
  return new UIRenderer();
}