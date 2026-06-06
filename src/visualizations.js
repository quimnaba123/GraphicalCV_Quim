/**
 * Data Visualization Module
 * Handles D3.js charts and visualizations
 */

import * as d3 from 'd3';
import { config } from './config.js';
import { skillsData } from './data.js';

/**
 * D3 Visualization Renderer class
 */
export class VisualizationRenderer {
  constructor() {
    this.charts = new Map();
    this.isInitialized = false;
  }

  /**
   * Initialize all charts
   */
  init() {
    if (this.isInitialized) {
      console.warn('Charts already initialized');
      return;
    }

    try {
      this.initSkillsChart();
      this.isInitialized = true;
      console.log('D3 Charts initialized successfully');
    } catch (error) {
      console.error('Failed to initialize D3 Charts:', error);
    }
  }

  /**
   * Initialize multi-skill category chart
   */
  initSkillsChart() {
    const container = d3.select('#skills-d3');

    if (container.empty()) {
      console.warn('Skills chart container not found');
      return;
    }

    // Clear any existing content
    container.selectAll('*').remove();

    const skillsConfig = config.skills;
    const categories = skillsConfig.categories;
    const maxLevel = skillsConfig.maxLevel;

    // Create SVG
    const svg = container
      .append('svg')
      .attr('width', '100%')
      .attr('height', '500')
      .attr('viewBox', `0 0 600 500`);

    const centerX = 300;
    const centerY = 250;
    const radius = 180;

    // Draw background circles
    this.drawBackgroundCircles(svg, centerX, centerY, radius, skillsConfig.radar.levels);

    // Draw axes and labels
    this.drawAxesAndLabels(svg, centerX, centerY, radius, categories, skillsConfig.categoryColors);

    // Draw data for each category
    this.drawCategoryData(svg, centerX, centerY, radius, categories, skillsConfig.categoryColors, maxLevel);

    // Store chart reference
    this.charts.set('skills', svg);
  }

  /**
   * Draw background circles for skills chart
   * @param {d3.Selection} svg - SVG element
   * @param {number} centerX - Center X coordinate
   * @param {number} centerY - Center Y coordinate
   * @param {number} radius - Maximum radius
   * @param {number} levels - Number of levels
   */
  drawBackgroundCircles(svg, centerX, centerY, radius, levels) {
    const levelStep = radius / levels;

    for (let i = 1; i <= levels; i++) {
      const levelRadius = levelStep * i;

      svg.append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', levelRadius)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(255, 255, 255, 0.1)')
        .attr('stroke-width', 1);
    }
  }

  /**
   * Draw axes and labels for skills chart
   * @param {d3.Selection} svg - SVG element
   * @param {number} centerX - Center X coordinate
   * @param {number} centerY - Center Y coordinate
   * @param {number} radius - Maximum radius
   * @param {string[]} labels - Category labels
   * @param {object} categoryColors - Color configuration for categories
   */
  drawAxesAndLabels(svg, centerX, centerY, radius, labels, categoryColors) {
    const axes = labels.length;
    const angleSlice = (Math.PI * 2) / axes;

    labels.forEach((label, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const labelRadius = radius + 40;
      const x = centerX + Math.cos(angle) * labelRadius;
      const y = centerY + Math.sin(angle) * labelRadius;

      // Draw axis line
      svg.append('line')
        .attr('class', 'radar-axis')
        .attr('x1', centerX)
        .attr('y1', centerY)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', categoryColors[label] || 'rgba(255, 255, 255, 0.3)')
        .attr('stroke-width', 2);

      // Draw label
      svg.append('text')
        .attr('class', 'radar-label')
        .attr('x', centerX + Math.cos(angle) * labelRadius)
        .attr('y', centerY + Math.sin(angle) * labelRadius)
        .text(label)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('fill', categoryColors[label] || config.colors.white60)
        .attr('font-size', '12px')
        .attr('font-weight', 'bold');
    });
  }

  /**
   * Draw data for each skill category
   * @param {d3.Selection} svg - SVG element
   * @param {number} centerX - Center X coordinate
   * @param {number} centerY - Center Y coordinate
   * @param {number} radius - Maximum radius
   * @param {string[]} categories - Category names
   * @param {object} categoryColors - Color configuration for categories
   * @param {number} maxLevel - Maximum skill level
   */
  drawCategoryData(svg, centerX, centerY, radius, categories, categoryColors, maxLevel) {
    const skillKeys = Object.keys(skillsData);

    categories.forEach((category, i) => {
      const categorySkills = skillsData[category] || [];
      if (categorySkills.length === 0) return;

      const angleSlice = (Math.PI * 2) / categories.length;
      const angle = angleSlice * i - Math.PI / 2;

      // Calculate average level for this category
      const avgLevel = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
      const categoryRadius = (avgLevel / maxLevel) * radius;

      // Draw data point for this category
      const dataPointX = centerX + Math.cos(angle) * categoryRadius;
      const dataPointY = centerY + Math.sin(angle) * categoryRadius;

      svg.append('circle')
        .attr('cx', dataPointX)
        .attr('cy', dataPointY)
        .attr('r', 8)
        .attr('fill', categoryColors[category])
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .attr('opacity', 0)
        .transition()
        .duration(800)
        .delay(i * 200)
        .attr('opacity', 0.9);

      // Draw category name with level
      svg.append('text')
        .attr('x', dataPointX)
        .attr('y', dataPointY - 15)
        .text(`${category}: ${Math.round(avgLevel)}%`)
        .attr('text-anchor', 'middle')
        .attr('fill', categoryColors[category])
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .attr('opacity', 0)
        .transition()
        .duration(800)
        .delay(i * 200)
        .attr('opacity', 1);

      // Draw individual skill levels for this category
      categorySkills.forEach((skill, skillIndex) => {
        const skillAngle = angleSlice * i - Math.PI / 2;
        const skillAngleOffset = (skillIndex - categorySkills.length / 2) * 0.1;
        const skillAngleWithOffset = skillAngle + skillAngleOffset;

        const skillRadius = (skill.level / maxLevel) * radius * 0.5;
        const skillPointX = centerX + Math.cos(skillAngleWithOffset) * skillRadius;
        const skillPointY = centerY + Math.sin(skillAngleWithOffset) * skillRadius;

        svg.append('circle')
          .attr('cx', skillPointX)
          .attr('cy', skillPointY)
          .attr('r', 4)
          .attr('fill', categoryColors[category])
          .attr('opacity', 0.7)
          .attr('opacity', 0)
          .transition()
          .duration(800)
          .delay(i * 200 + skillIndex * 50)
          .attr('opacity', 0.7);
      });
    });
  }

  /**
   * Draw data polygon for skills
   * @param {d3.Selection} svg - SVG element
   * @param {number} centerX - Center X coordinate
   * @param {number} centerY - Center Y coordinate
   * @param {number} radius - Maximum radius
   */
  drawDataPolygon(svg, centerX, centerY, radius) {
    const dataValues = [0.95, 0.90, 0.85, 0.75, 0.80];
    const axes = config.d3.axes.labels.length;
    const angleSlice = (Math.PI * 2) / axes;

    // Calculate data points
    const dataPoints = dataValues.map((value, i) => ({
      x: centerX + Math.cos(angleSlice * i - Math.PI / 2) * radius * value,
      y: centerY + Math.sin(angleSlice * i - Math.PI / 2) * radius * value
    }));

    // Draw data polygon with animation
    svg.append('polygon')
      .datum(dataPoints)
      .attr('class', 'radar-data')
      .attr('fill', config.colors.d3.radar.colors.fill)
      .attr('stroke', config.colors.d3.radar.colors.stroke)
      .attr('stroke-width', config.colors.d3.radar.colors.strokeWidth)
      .attr('points', (d) => d.map(p => `${p.x},${p.y}`).join(' '))
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .attr('opacity', config.colors.d3.radar.colors.fill.replace(/[\d.]+\)$/, '0.5)'));
  }

  /**
   * Update chart data
   * @param {string} chartType - Type of chart
   * @param {object} newData - New data for the chart
   */
  updateChartData(chartType, newData) {
    const chart = this.charts.get(chartType);
    if (!chart) {
      console.warn(`Chart ${chartType} not found`);
      return;
    }

    try {
      // Re-initialize the chart with new data
      if (chartType === 'skills') {
        this.initSkillsChart();
      }
    } catch (error) {
      console.error(`Failed to update ${chartType} chart:`, error);
    }
  }

  /**
   * Cleanup all charts
   */
  cleanup() {
    this.charts.forEach((svg) => {
      svg.remove();
    });
    this.charts.clear();
    this.isInitialized = false;
  }

  /**
   * Check if charts are initialized
   * @returns {boolean}
   */
  isActive() {
    return this.isInitialized;
  }
}

/**
 * Create and initialize visualization renderer
 * @returns {VisualizationRenderer} Renderer instance
 */
export function createVisualizationRenderer() {
  return new VisualizationRenderer();
}