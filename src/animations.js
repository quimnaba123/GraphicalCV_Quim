/**
 * Animations Module
 * Handles GSAP animations and transitions
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { config } from './config.js';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Animation Manager class
 */
export class AnimationManager {
  constructor() {
    this.animations = new Map();
    this.isInitialized = false;
  }

  /**
   * Initialize all animations
   */
  init() {
    if (this.isInitialized) {
      console.warn('Animations already initialized');
      return;
    }

    try {
      this.initHeroAnimations();
      this.initScrollAnimations();
      this.isInitialized = true;
      console.log('Animations initialized successfully');
    } catch (error) {
      console.error('Failed to initialize animations:', error);
    }
  }

  /**
   * Initialize hero section animations
   */
  initHeroAnimations() {
    const heroElements = ['#about h1', '#about p', '#about a'];
    const { heroDuration, heroDelay } = config.animations;

    heroElements.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (!element) {
        console.warn(`Hero element ${selector} not found`);
        return;
      }

      const animation = gsap.from(element, {
        duration: heroDuration,
        y: 50,
        opacity: 0,
        delay: heroDelay * index,
        ease: 'power3.out'
      });

      this.animations.set(`hero-${selector}`, animation);
    });
  }

  /**
   * Initialize scroll-triggered animations
   */
  initScrollAnimations() {
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      const animation = gsap.fromTo(item,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          ease: 'power3.out'
        }
      );

      this.animations.set(`timeline-${index}`, animation);
    });

    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      const animation = gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          ease: 'power3.out'
        }
      );

      this.animations.set(`project-${index}`, animation);
    });

    // Animate skills chart
    const skillsChart = document.querySelector('#skills-d3');
    if (skillsChart) {
      const chartAnimation = gsap.fromTo(skillsChart,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: skillsChart,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          ease: 'elastic.out(1, 0.5)'
        }
      );

      this.animations.set('skills-chart', chartAnimation);
    }
  }

  /**
   * Animate specific elements
   * @param {string[]} selectors - Element selectors
   * @param {object} options - Animation options
   */
  animateElements(selectors, options = {}) {
    const duration = options.duration || 0.8;
    const delay = options.delay || 0;
    const stagger = options.stagger || 0.1;

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element, index) => {
        gsap.from(element, {
          duration,
          y: 50,
          opacity: 0,
          delay: delay + (stagger * index),
          ease: options.ease || 'power3.out'
        });
      });
    });
  }

  /**
   * Animate elements on scroll
   * @param {string} selector - Element selector
   * @param {object} options - Animation options
   */
  animateOnScroll(selector, options = {}) {
    const { start = 'top 80%', toggleActions = 'play none none reverse' } = options;
    const duration = options.duration || 0.8;
    const stagger = options.stagger || 0.1;
    const ease = options.ease || 'power3.out';

    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      gsap.fromTo(element,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions
          },
          ease
        }
      );
    });
  }

  /**
   * Play a specific animation
   * @param {string} animationKey - Animation key
   */
  playAnimation(animationKey) {
    const animation = this.animations.get(animationKey);
    if (animation) {
      animation.restart();
    }
  }

  /**
   * Pause all animations
   */
  pauseAllAnimations() {
    this.animations.forEach((animation) => {
      animation.pause();
    });
  }

  /**
   * Resume all animations
   */
  resumeAllAnimations() {
    this.animations.forEach((animation) => {
      animation.play();
    });
  }

  /**
   * Cleanup all animations
   */
  cleanup() {
    this.animations.forEach((animation) => {
      animation.kill();
    });
    this.animations.clear();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    this.isInitialized = false;
  }

  /**
   * Check if animations are initialized
   * @returns {boolean}
   */
  isActive() {
    return this.isInitialized;
  }
}

/**
 * Smooth scroll handler
 */
class SmoothScrollHandler {
  constructor() {
    this.isActive = false;
  }

  /**
   * Initialize smooth scroll
   */
  init() {
    if (this.isActive) {
      console.warn('Smooth scroll already initialized');
      return;
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', this.handleAnchorClick.bind(this));
    });

    this.isActive = true;
    console.log('Smooth scroll initialized successfully');
  }

  /**
   * Handle anchor click events
   * @param {MouseEvent} event - Click event
   */
  handleAnchorClick(event) {
    const anchor = event.currentTarget;
    const href = anchor.getAttribute('href');

    if (href === '#' || !href) {
      return;
    }

    event.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  /**
   * Cleanup smooth scroll
   */
  cleanup() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.removeEventListener('click', this.handleAnchorClick);
    });
    this.isActive = false;
  }
}

/**
 * Create and initialize animation manager
 * @returns {AnimationManager} Animation manager instance
 */
export function createAnimationManager() {
  return new AnimationManager();
}

/**
 * Create and initialize smooth scroll handler
 * @returns {SmoothScrollHandler} Smooth scroll handler instance
 */
export function createSmoothScroll() {
  return new SmoothScrollHandler();
}