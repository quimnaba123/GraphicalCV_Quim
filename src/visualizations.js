/**
 * Data Visualization Module
 * Handles D3.js charts and visualizations
 */

import * as d3 from 'd3';
import { config } from './config.js';

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
      this.initRadarChart();
      this.isInitialized = true;
      console.log('D3 Charts initialized successfully');
    } catch (error) {
      console.error('Failed to initialize D3 Charts:', error);
    }
  }

  /**
   * Initialize radar chart for skills
   */
  initRadarChart() {
    const container = d3.select('#skills-d3');

    if (container.empty()) {
      console.warn('Skills radar chart container not found');
      return;
    }

    // Get radar configuration
    const radarConfig = config.d3.radar;

    // Clear any existing content
    container.selectAll('*').remove();

    // Create SVG
    const svg = container
      .append('svg')
      .attr('width', '100%')
      .attr('height', '400')
      .attr('viewBox', `0 0 ${radarConfig.radius * 2 + 60} 400`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const centerX = radarConfig.radius + 30;
    const centerY = radarConfig.radius + 30;
    const radius = radarConfig.radius;

    // Draw background web (concentric polygons)
    this.drawWebBackground(svg, centerX, centerY, radius, radarConfig.levels);

    // Draw axes and labels
    this.drawAxesAndLabels(svg, centerX, centerY, radius, radarConfig.axes.labels);

    // Draw data polygon
    this.drawDataPolygon(svg, centerX, centerY, radius);

    // Store chart reference
    this.charts.set('radar', svg);
  }

  /**
   * Draw background web for radar chart
   * @param {d3.Selection} svg - SVG element
   * @param {number} centerX - Center X coordinate
   * @param {number} centerY - Center Y coordinate
   * @param {number} radius - Maximum radius
   * @param {number} levels - Number of levels
   */
  drawWebBackground(svg, centerX, centerY, radius, levels) {
    const levelStep = radius / levels;

    for (let i = 1; i <= levels; i++) {
      const levelRadius = levelStep * i;
      const innerRadius = levelStep * (i - 1);

      svg.append('path')
        .datum({ type: 'arcs' })
        .attr('class', 'web-layer')
        .attr('fill', 'none')
        .attr('stroke', 'rgba(255, 255, 255, 0.1)')
        .attr('stroke-width', 1)
        .attr('d', d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(levelRadius)
          .cornerRadius(5)
          .padAngle(0.05)
          .startAngle(0)
          .endAngle(Math.PI * 2));
    }
  }

  /**
   * Draw axes and labels for radar chart
   * @param {d3.Selection} svg - SVG element
   * @param {number} centerX - Center X coordinate
   * @param {number} centerY - Center Y coordinate
   * @param {number} radius - Maximum radius
   * @param {string[]} labels - Axis labels
   */
  drawAxesAndLabels(svg, centerX, centerY, radius, labels) {
    const axes = labels.length;
    const angleSlice = (Math.PI * 2) / axes;

    labels.forEach((label, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const labelRadius = radius + 30;
      const x = centerX + Math.cos(angle) * labelRadius;
      const y = centerY + Math.sin(angle) * labelRadius;

      // Draw axis line
      svg.append('line')
        .attr('class', 'radar-axis')
        .attr('x1', centerX)
        .attr('y1', centerY)
        .attr('x2', x)
        .attr('y2', y)
        .attr('stroke', 'rgba(255, 255, 255, 0.3)')
        .attr('stroke-width', 1);

      // Draw label
      svg.append('text')
        .attr('class', 'radar-label')
        .attr('x', centerX + Math.cos(angle) * labelRadius)
        .attr('y', centerY + Math.sin(angle) * labelRadius)
        .text(label)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('fill', config.colors.white60)
        .attr('font-size', '14px');
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
      if (chartType === 'radar') {
        this.initRadarChart();
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