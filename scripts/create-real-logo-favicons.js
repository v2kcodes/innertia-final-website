const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

// Brand colors
const BRAND_COLORS = {
  primary: '#FF6B35',
  secondary: '#FF8C42',
  accent: '#FFA500',
  darkGray: '#3A3A3A',
  mediumGray: '#5A5A5A',
  lightGray: '#6A6A6A'
};

function createGradient(ctx, x1, y1, x2, y2, color1, color2, color3) {
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(0.5, color2);
  gradient.addColorStop(1, color3);
  return gradient;
}

function drawLogoLayer(ctx, size, offsetX = 0, offsetY = 0, colorType = 'orange') {
  const scale = size / 32; // Scale factor based on 32px base size

  ctx.save();
  ctx.translate(offsetX, offsetY);

  // Create appropriate gradient based on color type
  let gradient;
  if (colorType === 'orange') {
    gradient = createGradient(ctx, 0, 0, size, size,
      BRAND_COLORS.secondary, BRAND_COLORS.primary, '#E55A2B');
  } else if (colorType === 'darkGray') {
    gradient = createGradient(ctx, 0, 0, size, size,
      '#4A4A4A', BRAND_COLORS.darkGray, '#2A2A2A');
  } else {
    gradient = createGradient(ctx, 0, 0, size, size,
      BRAND_COLORS.lightGray, BRAND_COLORS.mediumGray, '#4A4A4A');
  }

  ctx.fillStyle = gradient;

  // Draw simplified curved shape optimized for small sizes
  ctx.beginPath();

  if (size >= 32) {
    // Detailed version for larger sizes
    ctx.moveTo(size * 0.2, size * 0.4);
    ctx.quadraticCurveTo(size * 0.2, size * 0.25, size * 0.35, size * 0.25);
    ctx.lineTo(size * 0.75, size * 0.25);
    ctx.quadraticCurveTo(size * 0.9, size * 0.25, size * 0.9, size * 0.4);
    ctx.lineTo(size * 0.9, size * 0.55);
    ctx.quadraticCurveTo(size * 0.9, size * 0.7, size * 0.75, size * 0.7);
    ctx.lineTo(size * 0.55, size * 0.7);
    ctx.quadraticCurveTo(size * 0.4, size * 0.7, size * 0.4, size * 0.85);
    ctx.lineTo(size * 0.4, size * 0.9);
    ctx.quadraticCurveTo(size * 0.4, size * 1.05, size * 0.55, size * 1.05);
    ctx.lineTo(size * 0.75, size * 1.05);
    ctx.quadraticCurveTo(size * 0.9, size * 1.05, size * 0.9, size * 0.9);
  } else {
    // Simplified version for very small sizes (16x16)
    ctx.moveTo(size * 0.25, size * 0.4);
    ctx.quadraticCurveTo(size * 0.25, size * 0.3, size * 0.35, size * 0.3);
    ctx.lineTo(size * 0.7, size * 0.3);
    ctx.quadraticCurveTo(size * 0.8, size * 0.3, size * 0.8, size * 0.4);
    ctx.lineTo(size * 0.8, size * 0.5);
    ctx.quadraticCurveTo(size * 0.8, size * 0.6, size * 0.7, size * 0.6);
    ctx.lineTo(size * 0.5, size * 0.6);
    ctx.quadraticCurveTo(size * 0.4, size * 0.6, size * 0.4, size * 0.7);
    ctx.lineTo(size * 0.4, size * 0.75);
    ctx.quadraticCurveTo(size * 0.4, size * 0.85, size * 0.5, size * 0.85);
    ctx.lineTo(size * 0.7, size * 0.85);
    ctx.quadraticCurveTo(size * 0.8, size * 0.85, size * 0.8, size * 0.75);
  }

  ctx.fill();

  // Add subtle highlights for depth
  if (size >= 24) {
    ctx.strokeStyle = colorType === 'orange' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = Math.max(1, scale * 0.5);
    ctx.stroke();
  }

  ctx.restore();
}

function createFavicon(size, filename) {
  console.log(`Creating ${filename} (${size}x${size})`);

  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Clear background
  ctx.clearRect(0, 0, size, size);

  // Draw layered logo with 3D effect
  const layerOffset = Math.max(1, Math.floor(size / 16));

  // Bottom layer (darkest) - positioned slightly down and right
  drawLogoLayer(ctx, size, layerOffset * 1.5, layerOffset * 1.5, 'darkGray');

  // Middle layer (medium gray) - positioned slightly down and right
  if (size >= 24) {
    drawLogoLayer(ctx, size, layerOffset, layerOffset, 'mediumGray');
  }

  // Top layer (orange) - main layer
  drawLogoLayer(ctx, size, 0, 0, 'orange');

  // Add small accent dots for recognition if size allows
  if (size >= 32) {
    ctx.fillStyle = BRAND_COLORS.accent;
    ctx.beginPath();
    ctx.arc(size * 0.3, size * 0.45, size * 0.04, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = BRAND_COLORS.darkGray;
    ctx.beginPath();
    ctx.arc(size * 0.7, size * 0.75, size * 0.03, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, '..', 'public', filename), buffer);

  return canvas;
}

function createICOFile() {
  console.log('Creating favicon.ico with multiple sizes');

  // For ICO, we'll use the 32x32 version as the main icon
  const canvas32 = createCanvas(32, 32);
  const ctx32 = canvas32.getContext('2d');

  ctx32.clearRect(0, 0, 32, 32);

  // Draw the same layered design for ICO
  drawLogoLayer(ctx32, 32, 2, 2, 'darkGray');
  drawLogoLayer(ctx32, 32, 1, 1, 'mediumGray');
  drawLogoLayer(ctx32, 32, 0, 0, 'orange');

  // Add accent dots
  ctx32.fillStyle = BRAND_COLORS.accent;
  ctx32.beginPath();
  ctx32.arc(32 * 0.3, 32 * 0.45, 32 * 0.04, 0, 2 * Math.PI);
  ctx32.fill();

  ctx32.fillStyle = BRAND_COLORS.darkGray;
  ctx32.beginPath();
  ctx32.arc(32 * 0.7, 32 * 0.75, 32 * 0.03, 0, 2 * Math.PI);
  ctx32.fill();

  const buffer = canvas32.toBuffer('image/png');

  // For simplicity, we'll save as PNG and rename to ICO
  // In production, you might want to use a proper ICO library
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.ico'), buffer);
}

async function generateAllFavicons() {
  try {
    console.log('🎨 Generating new favicon files with real logo design...');

    // Create all required favicon sizes
    createFavicon(16, 'favicon-16x16.png');
    createFavicon(32, 'favicon-32x32.png');
    createFavicon(180, 'apple-touch-icon.png');
    createFavicon(192, 'android-chrome-192x192.png');
    createFavicon(512, 'android-chrome-512x512.png');

    // Create ICO file
    createICOFile();

    // Update the main favicon.svg with the real logo
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <defs>
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF8C42;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#FF6B35;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#E55A2B;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="grayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4A4A4A;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#3A3A3A;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2A2A2A;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- 3D Layered Logo Design optimized for 32x32 -->
  <!-- Bottom layer -->
  <path d="M6 13 Q6 10 9 10 L23 10 Q26 10 26 13 L26 16 Q26 19 23 19 L17 19 Q14 19 14 22 L14 25 Q14 28 17 28 L23 28 Q26 28 26 25"
        fill="url(#grayGrad)" transform="translate(1.5,1.5)" opacity="0.8"/>

  <!-- Top layer -->
  <path d="M6 13 Q6 10 9 10 L23 10 Q26 10 26 13 L26 16 Q26 19 23 19 L17 19 Q14 19 14 22 L14 25 Q14 28 17 28 L23 28 Q26 28 26 25"
        fill="url(#orangeGrad)"/>

  <!-- Accent dots -->
  <circle cx="10" cy="14" r="1.2" fill="#FFA500"/>
  <circle cx="22" cy="24" r="1" fill="#3A3A3A" opacity="0.7"/>
</svg>`;

    fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.svg'), svgContent);

    console.log('✅ All favicon files generated successfully with real logo design!');
    console.log('📁 Generated files:');
    console.log('  - favicon.ico');
    console.log('  - favicon-16x16.png');
    console.log('  - favicon-32x32.png');
    console.log('  - apple-touch-icon.png (180x180)');
    console.log('  - android-chrome-192x192.png');
    console.log('  - android-chrome-512x512.png');
    console.log('  - favicon.svg (updated)');

  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

// Run the favicon generation
generateAllFavicons();