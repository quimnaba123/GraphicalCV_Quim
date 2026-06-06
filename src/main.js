/**
 * Main Application Module
 * Orchestrates all components and initializes the application
 */

import { config } from './config.js';
import { createBackground } from './background.js';
import { createVisualizationRenderer } from './visualizations.js';
import { createUIRenderer } from './ui.js';
import { createAnimationManager, createSmoothScroll } from './animations.js';

/**
 * Application Manager class
 */
export class ApplicationManager {
  constructor() {
    this.background = null;
    this.visualizations = null;
    this.ui = null;
    this.animations = null;
    this.smoothScroll = null;
    this.isInitialized = false;
    this.components = new Map();
  }

  /**
   * Initialize the entire application
   */
  async init() {
    if (this.isInitialized) {
      console.warn('Application already initialized');
      return;
    }

    try {
      console.log('Starting application initialization...');

      // Initialize all components in sequence
      await this.initBackground();
      await this.initVisualizations();
      await this.initUI();
      await this.initAnimations();

      this.isInitialized = true;
      console.log('Application initialized successfully');
    } catch (error) {
      console.error('Failed to initialize application:', error);
      this.cleanup();
      throw error;
    }
  }

  /**
   * Initialize background renderer
   */
  async initBackground() {
    console.log('Initializing background renderer...');
    this.background = createBackground(config);
    this.background.init();
    this.components.set('background', this.background);
  }

  /**
   * Initialize visualization renderer
   */
  async initVisualizations() {
    console.log('Initializing visualization renderer...');
    this.visualizations = createVisualizationRenderer();
    this.visualizations.init();
    this.components.set('visualizations', this.visualizations);
  }

  /**
   * Initialize UI components
   */
  async initUI() {
    console.log('Initializing UI components...');
    this.ui = createUIRenderer();
    this.ui.init();
    this.components.set('ui', this.ui);
  }

  /**
   * Initialize animations
   */
  async initAnimations() {
    console.log('Initializing animations...');
    this.animations = createAnimationManager();
    this.animations.init();

    this.smoothScroll = createSmoothScroll();
    this.smoothScroll.init();

    this.components.set('animations', this.animations);
    this.components.set('smoothScroll', this.smoothScroll);
  }

  /**
   * Update component data
   * @param {string} component - Component name
   * @param {object} data - New data
   */
  updateComponent(component, data) {
    const componentInstance = this.components.get(component);
    if (componentInstance && typeof componentInstance.update === 'function') {
      componentInstance.update(data);
    }
  }

  /**
   * Get component instance
   * @param {string} component - Component name
   * @returns {object} Component instance or null
   */
  getComponent(component) {
    return this.components.get(component) || null;
  }

  /**
   * Check if application is initialized
   * @returns {boolean}
   */
  isActive() {
    return this.isInitialized;
  }

  /**
   * Get application status
   * @returns {object} Status information
   */
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      components: {
        background: this.background?.isActive(),
        visualizations: this.visualizations?.isActive(),
        ui: this.ui?.isActive(),
        animations: this.animations?.isActive(),
        smoothScroll: this.smoothScroll?.isActive
      }
    };
  }

  /**
   * Cleanup all components and resources
   */
  cleanup() {
    console.log('Cleaning up application resources...');

    // Reverse cleanup order
    this.smoothScroll?.cleanup();
    this.animations?.cleanup();
    this.visualizations?.cleanup();
    this.background?.cleanup();
    this.ui?.cleanup();

    // Clear component references
    this.components.clear();

    // Reset initialization state
    this.isInitialized = false;
  }
}

/**
 * Initialize application when DOM is ready
 */
let appManager = null;

async function initApp() {
  if (appManager) {
    console.warn('Application already initialized');
    return;
  }

  try {
    appManager = new ApplicationManager();
    await appManager.init();
    return appManager;
  } catch (error) {
    console.error('Application initialization failed:', error);
    throw error;
  }
}

/**
 * Get current app manager instance
 * @returns {ApplicationManager|null}
 */
export function getAppManager() {
  return appManager;
}

/**
 * Initialize application
 * @returns {Promise<ApplicationManager>}
 */
export async function init() {
  return initApp();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
 } else {
  init().catch((error) => {
    console.error('Application initialization error:', error);
  });
}