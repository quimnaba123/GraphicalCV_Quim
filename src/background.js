/**
 * 3D Background Module
 * Handles Three.js particle system and rendering
 */

import * as THREE from 'three';

/**
 * 3D Background Renderer class
 */
export class BackgroundRenderer {
  constructor(config) {
    this.config = config.threeJS;
    this.canvas = document.getElementById('bg-canvas');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.animationId = null;
    this.time = 0;
    this.isInitialized = false;
  }

  /**
   * Initialize the 3D background
   */
  init() {
    if (this.isInitialized) {
      console.warn('Background already initialized');
      return;
    }

    try {
      this.initScene();
      this.initCamera();
      this.initRenderer();
      this.initParticles();
      this.addResizeListener();
      this.startAnimation();
      this.isInitialized = true;
      console.log('3D Background initialized successfully');
    } catch (error) {
      console.error('Failed to initialize 3D Background:', error);
      this.cleanup();
    }
  }

  /**
   * Initialize the Three.js scene
   */
  initScene() {
    this.scene = new THREE.Scene();
  }

  /**
   * Initialize the camera
   */
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = this.config.rotationSpeed.x;
  }

  /**
   * Initialize the renderer
   */
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: this.config.optimizeRendering
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
  }

  /**
   * Create and initialize particle system
   */
  initParticles() {
    const { particleCount, particleSize, colors } = this.config;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colorsArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
      colorsArray[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const material = new THREE.PointsMaterial({
      size: particleSize,
      vertexColors: true,
      transparent: true,
      opacity: colors.gradientStart,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  /**
   * Add resize event listener
   */
  addResizeListener() {
    const handleResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
  }

  /**
   * Start the animation loop
   */
  startAnimation() {
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.update();
    };
    animate();
  }

  /**
   * Update particle animation
   */
  update() {
    if (!this.particles) return;

    this.time += 0.001;

    this.particles.rotation.x = this.time * this.config.rotationSpeed.x;
    this.particles.rotation.y = this.time * this.config.rotationSpeed.y;

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Cleanup and dispose resources
   */
  cleanup() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }

    if (this.camera) {
      this.camera = null;
    }

    if (this.scene) {
      this.scene = null;
    }

    if (this.particles) {
      this.particles.geometry.dispose();
      this.particles.material.dispose();
      this.particles = null;
    }
  }

  /**
   * Check if renderer is active
   * @returns {boolean}
   */
  isActive() {
    return this.isInitialized && this.renderer !== null;
  }
}

/**
 * Create and initialize background renderer
 * @param {object} config - Configuration object
 * @returns {BackgroundRenderer} Renderer instance
 */
export function createBackground(config) {
  return new BackgroundRenderer(config);
}