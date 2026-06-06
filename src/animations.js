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
    const sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
      const animation = gsap.fromTo(section.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: config.animations.heroDuration * 0.5,
          stagger: config.animations.stagger,
          scrollTrigger: {
            trigger: section,
            start: config.animations.scrollTrigger.start,
            toggleActions: config.animations.scrollTrigger.toggleActions
          },
          ease: 'power3.out'
        }
      );

      this.animations.set(`scroll-section-${index}`, animation);
    });
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