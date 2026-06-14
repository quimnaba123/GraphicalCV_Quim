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
      this.initSceneWithElements();
      this.initCamera();
      this.initRenderer();
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
    this.camera.position.set(0, 2, 12);
    this.camera.lookAt(0, 2, 0);
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
   * Create and initialize 3D scene with automotive and wind elements
   */
  initSceneWithElements() {
    this.scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 8);
    this.scene.add(directionalLight);

    // Create automotive element (car with rear view camera)
    this.createAutomotiveElement();

    // Create wind industry element (turbine)
    this.createWindElement();

    // Add ambient particles
    this.createParticles();
  }

  /**
   * Create automotive element (car with rear view camera)
   */
  createAutomotiveElement() {
    const carGroup = new THREE.Group();

    // Car body (modern sedan)
    const carBodyGeometry = new THREE.BoxGeometry(4, 1.2, 2);
    const carMaterial = new THREE.MeshPhongMaterial({
      color: 0x3366cc,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    const carBody = new THREE.Mesh(carBodyGeometry, carMaterial);
    carGroup.add(carBody);

    // Car roof
    const roofGeometry = new THREE.BoxGeometry(2.5, 0.8, 1.8);
    const roofMaterial = new THREE.MeshPhongMaterial({
      color: 0x3366cc,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(-0.2, 1, 0);
    carGroup.add(roof);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32);
    const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });

    const wheelPositions = [
      [-1.5, -0.7, 0.8], [1.5, -0.7, 0.8],
      [-1.5, -0.7, -0.8], [1.5, -0.7, -0.8]
    ];

    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(...pos);
      carGroup.add(wheel);
    });

    // Rear view camera
    const cameraGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 16);
    const cameraMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 0.5
    });
    const camera = new THREE.Mesh(cameraGeometry, cameraMaterial);
    camera.position.set(0, 0.6, 1.05);
    camera.rotation.x = Math.PI / 2;
    carGroup.add(camera);

    // Camera display/monitor
    const displayGeometry = new THREE.PlaneGeometry(0.8, 0.6);
    const displayMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      side: THREE.DoubleSide
    });
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.set(0, 1.8, 1.3);
    display.rotation.x = -0.5;
    carGroup.add(display);

    // Position car in scene
    carGroup.position.set(-4, 0, 0);
    carGroup.rotation.y = 0.3;

    // Add car to scene
    this.scene.add(carGroup);

    // Store reference for animation
    this.automotiveElement = carGroup;

    // Add ambient light for car
    const carLight = new THREE.PointLight(0xffffff, 1, 10);
    carLight.position.set(-4, 2, 2);
    this.scene.add(carLight);
  }

  /**
   * Create wind industry element (turbine)
   */
  createWindElement() {
    const turbineGroup = new THREE.Group();

    // Tower
    const towerGeometry = new THREE.CylinderGeometry(0.5, 0.8, 8, 32);
    const towerMaterial = new THREE.MeshPhongMaterial({
      color: 0x666666,
      transparent: true,
      opacity: 0.9
    });
    const tower = new THREE.Mesh(towerGeometry, towerMaterial);
    tower.position.y = 4;
    turbineGroup.add(tower);

    // Nacelle
    const nacelleGeometry = new THREE.BoxGeometry(1.5, 1, 1);
    const nacelleMaterial = new THREE.MeshPhongMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.9
    });
    const nacelle = new THREE.Mesh(nacelleGeometry, nacelleMaterial);
    nacelle.position.y = 8;
    turbineGroup.add(nacelle);

    // Rotor
    const rotorGroup = new THREE.Group();
    rotorGroup.position.y = 8;

    // Hub
    const hubGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const hubMaterial = new THREE.MeshPhongMaterial({
      color: 0x555555,
      transparent: true,
      opacity: 0.9
    });
    const hub = new THREE.Mesh(hubGeometry, hubMaterial);
    rotorGroup.add(hub);

    // Blades
    const bladeGeometry = new THREE.BoxGeometry(0.1, 3, 0.4);
    const bladeMaterial = new THREE.MeshPhongMaterial({
      color: 0x3366cc,
      transparent: true,
      opacity: 0.9
    });

    for (let i = 0; i < 3; i++) {
      const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
      blade.position.y = 1.5;
      const angle = (i * Math.PI * 2) / 3;
      blade.rotation.z = angle;
      blade.rotation.x = Math.PI / 2;
      rotorGroup.add(blade);
    }

    turbineGroup.add(rotorGroup);

    // Position turbine in scene
    turbineGroup.position.set(4, 0, 0);

    // Add turbine to scene
    this.scene.add(turbineGroup);

    // Store reference for animation
    this.windElement = turbineGroup;
  }

  /**
   * Create and initialize particle system
   */
  createParticles() {
    const { particleCount, particleSize } = this.config;
    const colors = {
      primary: new THREE.Color(0x3366cc),
      secondary: new THREE.Color(0x336699)
    };

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colorsArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      // Alternate between primary and secondary colors
      const color = Math.random() > 0.5 ? colors.primary : colors.secondary;
      colorsArray[i] = color.r;
      colorsArray[i + 1] = color.g;
      colorsArray[i + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const material = new THREE.PointsMaterial({
      size: particleSize,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
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
   * Update animation for all elements
   */
  update() {
    if (!this.particles) return;

    this.time += 0.001;

    // Rotate particles
    this.particles.rotation.x = this.time * this.config.rotationSpeed.x;
    this.particles.rotation.y = this.time * this.config.rotationSpeed.y;

    // Animate wind turbine rotor
    if (this.windElement) {
      this.windElement.rotation.y += 0.02;
    }

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Cleanup and dispose windElementresources
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