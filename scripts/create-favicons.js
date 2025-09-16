const { createCanvas } = require('canvas');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Brand colors
const BRAND_COLORS = {
  primary: [255, 107, 53],    // #FF6B35
  secondary: [255, 140, 66],  // #FF8C42
  accent: [255, 165, 0],      // #FFA500
  white: [255, 255, 255]      // #FFFFFF
};

// Favicon configurations
const FAVICON_CONFIGS = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 }
];

/**
 * Create gradient fill
 */
function createGradient(ctx, size) {
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, `rgb(${BRAND_COLORS.primary.join(',')})`);
  gradient.addColorStop(0.5, `rgb(${BRAND_COLORS.secondary.join(',')})`);
  gradient.addColorStop(1, `rgb(${BRAND_COLORS.accent.join(',')})`);
  return gradient;
}

/**
 * Draw rounded rectangle
 */
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fill();
}

/**
 * Generate favicon canvas
 */
function generateFaviconCanvas(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Clear canvas with transparent background
  ctx.clearRect(0, 0, size, size);

  const center = size / 2;
  const padding = Math.max(2, size * 0.0625);
  const radius = center - padding;

  // Draw background circle with gradient
  const gradient = createGradient(ctx, size);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, 2 * Math.PI);
  ctx.fill();

  // Add subtle border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = Math.max(0.5, size * 0.03125);
  ctx.stroke();

  // Draw letter "I" design
  const letterWidth = size * 0.25;
  const letterHeight = size * 0.5;
  const letterX = center - letterWidth / 2;
  const letterY = center - letterHeight / 2;

  ctx.fillStyle = `rgb(${BRAND_COLORS.white.join(',')})`;

  // Top serif
  const serifHeight = letterWidth * 0.375;
  const cornerRadius = letterWidth * 0.1875;
  drawRoundedRect(ctx, letterX, letterY, letterWidth, serifHeight, cornerRadius);

  // Main stem
  const stemWidth = letterWidth * 0.5;
  const stemX = center - stemWidth / 2;
  const stemY = letterY + letterWidth * 0.25;
  const stemHeight = letterHeight * 0.75;
  drawRoundedRect(ctx, stemX, stemY, stemWidth, stemHeight, letterWidth * 0.125);

  // Bottom serif
  const bottomY = letterY + letterHeight - serifHeight;
  drawRoundedRect(ctx, letterX, bottomY, letterWidth, serifHeight, cornerRadius);

  // Accent dot
  const dotRadius = letterWidth * 0.15;
  const dotY = letterY - letterWidth * 0.3;
  ctx.beginPath();
  ctx.arc(center, dotY, dotRadius, 0, 2 * Math.PI);
  ctx.fill();

  return canvas;
}

/**
 * Generate all favicon files
 */
async function generateFavicons() {
  const publicDir = path.join(__dirname, '..', 'public');

  console.log('🎨 Generating brand-consistent favicons...\n');

  try {
    // Generate PNG favicons
    for (const config of FAVICON_CONFIGS) {
      console.log(`📱 Creating ${config.name} (${config.size}x${config.size}px)...`);

      const canvas = generateFaviconCanvas(config.size);
      const buffer = canvas.toBuffer('image/png');

      const outputPath = path.join(publicDir, config.name);
      await fs.promises.writeFile(outputPath, buffer);

      console.log(`   ✅ Saved: ${outputPath}`);
    }

    // Generate favicon.ico from 32x32 PNG
    console.log('🔧 Creating favicon.ico...');
    const canvas32 = generateFaviconCanvas(32);
    const png32Buffer = canvas32.toBuffer('image/png');

    // Convert PNG to ICO format using Sharp
    const icoBuffer = await sharp(png32Buffer)
      .resize(32, 32)
      .png()
      .toBuffer();

    const icoPath = path.join(publicDir, 'favicon.ico');
    await fs.promises.writeFile(icoPath, icoBuffer);
    console.log(`   ✅ Saved: ${icoPath}`);

    console.log('\n🎉 All favicons generated successfully!');
    console.log('\n📋 Generated files:');
    console.log('   • favicon.ico (32x32)');
    console.log('   • favicon-16x16.png');
    console.log('   • favicon-32x32.png');
    console.log('   • apple-touch-icon.png (180x180)');
    console.log('   • android-chrome-192x192.png');
    console.log('   • android-chrome-512x512.png');

    console.log('\n🔍 Next steps:');
    console.log('   1. Test favicons by visiting your website');
    console.log('   2. Check browser dev tools for 404 errors');
    console.log('   3. Verify PWA manifest integration');

  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

// Run the generation
if (require.main === module) {
  generateFavicons();
}

module.exports = { generateFavicons };