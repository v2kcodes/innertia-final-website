const fs = require('fs');
const path = require('path');

/**
 * Favicon Generator Script
 * Creates brand-consistent favicon files for Innertia Software Solutions
 * Uses Canvas API to generate favicons with brand colors
 */

// Brand colors
const BRAND_COLORS = {
  primary: '#FF6B35',
  secondary: '#FF8C42',
  accent: '#FFA500',
  white: '#FFFFFF'
};

// Favicon configurations
const FAVICON_CONFIGS = [
  { name: 'favicon.ico', size: 32, format: 'ico' },
  { name: 'favicon-16x16.png', size: 16, format: 'png' },
  { name: 'favicon-32x32.png', size: 32, format: 'png' },
  { name: 'apple-touch-icon.png', size: 180, format: 'png' },
  { name: 'android-chrome-192x192.png', size: 192, format: 'png' },
  { name: 'android-chrome-512x512.png', size: 512, format: 'png' }
];

/**
 * Generate SVG content for favicon
 */
function generateFaviconSVG(size) {
  const padding = Math.max(2, size * 0.0625); // 6.25% padding
  const strokeWidth = Math.max(0.5, size * 0.03125); // 3.125% stroke
  const letterWidth = size * 0.25; // 25% of size for letter width
  const letterHeight = size * 0.5; // 50% of size for letter height
  const center = size / 2;
  const letterX = center - letterWidth / 2;
  const letterY = center - letterHeight / 2;

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BRAND_COLORS.primary};stop-opacity:1" />
      <stop offset="50%" style="stop-color:${BRAND_COLORS.secondary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${BRAND_COLORS.accent};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1" stdDeviation="${size/32}" flood-opacity="0.3" flood-color="#000000"/>
    </filter>
  </defs>

  <!-- Background circle with gradient -->
  <circle cx="${center}" cy="${center}" r="${center - padding}"
          fill="url(#brandGradient)"
          stroke="rgba(255,255,255,0.2)"
          stroke-width="${strokeWidth}"
          filter="url(#shadow)"/>

  <!-- Letter "I" with modern design -->
  <g fill="${BRAND_COLORS.white}">
    <!-- Top serif -->
    <rect x="${letterX}" y="${letterY}"
          width="${letterWidth}" height="${letterWidth * 0.375}"
          rx="${letterWidth * 0.1875}" />

    <!-- Main stem -->
    <rect x="${center - letterWidth * 0.25}" y="${letterY + letterWidth * 0.25}"
          width="${letterWidth * 0.5}" height="${letterHeight * 0.75}"
          rx="${letterWidth * 0.125}" />

    <!-- Bottom serif -->
    <rect x="${letterX}" y="${letterY + letterHeight - letterWidth * 0.375}"
          width="${letterWidth}" height="${letterWidth * 0.375}"
          rx="${letterWidth * 0.1875}" />

    <!-- Accent dot -->
    <circle cx="${center}" cy="${letterY - letterWidth * 0.3}"
            r="${letterWidth * 0.15}" />
  </g>
</svg>`.trim();
}

/**
 * Create HTML file to generate favicon using Canvas
 */
function createFaviconGeneratorHTML() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Favicon Generator - Innertia Software Solutions</title>
    <style>
        body { font-family: 'Inter', sans-serif; padding: 20px; background: #f8fafc; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        h1 { color: #FF6B35; margin-bottom: 30px; }
        .favicon-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin: 30px 0; }
        .favicon-item { text-align: center; padding: 20px; border: 2px solid #e5e7eb; border-radius: 8px; }
        canvas { border: 1px solid #d1d5db; border-radius: 4px; margin: 10px 0; }
        button { background: linear-gradient(135deg, #FF6B35, #FF8C42); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; margin: 10px 5px; }
        button:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3); }
        .status { padding: 15px; border-radius: 8px; margin: 20px 0; }
        .success { background: #d1fae5; color: #065f46; border-left: 4px solid #10b981; }
        .info { background: #dbeafe; color: #1e40af; border-left: 4px solid #3b82f6; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 Favicon Generator - Innertia Software Solutions</h1>
        <div class="status info">
            <strong>Instructions:</strong> Click "Generate All Favicons" to create brand-consistent favicon files.
            Right-click each generated favicon and "Save Image As" to download.
        </div>

        <button onclick="generateAllFavicons()">🚀 Generate All Favicons</button>
        <button onclick="downloadAllFavicons()">📥 Download All Favicons</button>

        <div id="status-message"></div>
        <div id="favicon-grid" class="favicon-grid"></div>
    </div>

    <script>
        const BRAND_COLORS = {
            primary: '#FF6B35',
            secondary: '#FF8C42',
            accent: '#FFA500',
            white: '#FFFFFF'
        };

        const FAVICON_CONFIGS = [
            { name: 'favicon-16x16.png', size: 16 },
            { name: 'favicon-32x32.png', size: 32 },
            { name: 'apple-touch-icon.png', size: 180 },
            { name: 'android-chrome-192x192.png', size: 192 },
            { name: 'android-chrome-512x512.png', size: 512 }
        ];

        function drawFavicon(canvas, size) {
            const ctx = canvas.getContext('2d');
            const center = size / 2;
            const padding = Math.max(2, size * 0.0625);
            const radius = center - padding;

            // Clear canvas
            ctx.clearRect(0, 0, size, size);

            // Create gradient
            const gradient = ctx.createLinearGradient(0, 0, size, size);
            gradient.addColorStop(0, BRAND_COLORS.primary);
            gradient.addColorStop(0.5, BRAND_COLORS.secondary);
            gradient.addColorStop(1, BRAND_COLORS.accent);

            // Draw background circle with shadow
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = size / 32;
            ctx.shadowOffsetY = 1;

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(center, center, radius, 0, 2 * Math.PI);
            ctx.fill();

            // Draw border
            ctx.shadowColor = 'transparent';
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = Math.max(0.5, size * 0.03125);
            ctx.stroke();

            // Draw letter "I"
            const letterWidth = size * 0.25;
            const letterHeight = size * 0.5;
            const letterX = center - letterWidth / 2;
            const letterY = center - letterHeight / 2;

            ctx.fillStyle = BRAND_COLORS.white;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = size / 64;
            ctx.shadowOffsetY = 1;

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

            ctx.shadowColor = 'transparent';
        }

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

        function generateFavicon(config) {
            const canvas = document.createElement('canvas');
            canvas.width = config.size;
            canvas.height = config.size;

            drawFavicon(canvas, config.size);

            return canvas;
        }

        function generateAllFavicons() {
            const grid = document.getElementById('favicon-grid');
            const statusMsg = document.getElementById('status-message');

            grid.innerHTML = '';
            statusMsg.innerHTML = '<div class="status success">✅ Generating favicons...</div>';

            FAVICON_CONFIGS.forEach(config => {
                const canvas = generateFavicon(config);

                const item = document.createElement('div');
                item.className = 'favicon-item';
                item.innerHTML = \`
                    <h3>\${config.name}</h3>
                    <div>Size: \${config.size}x\${config.size}px</div>
                \`;

                item.appendChild(canvas);

                const downloadBtn = document.createElement('button');
                downloadBtn.textContent = 'Download';
                downloadBtn.onclick = () => downloadFavicon(canvas, config.name);
                item.appendChild(downloadBtn);

                grid.appendChild(item);
            });

            statusMsg.innerHTML = '<div class="status success">✅ All favicons generated! Right-click to save or use download buttons.</div>';
        }

        function downloadFavicon(canvas, filename) {
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        }

        function downloadAllFavicons() {
            const canvases = document.querySelectorAll('canvas');
            canvases.forEach((canvas, index) => {
                setTimeout(() => {
                    downloadFavicon(canvas, FAVICON_CONFIGS[index].name);
                }, index * 500); // Stagger downloads
            });
        }

        // Auto-generate on load
        window.addEventListener('load', generateAllFavicons);
    </script>
</body>
</html>`;

  return html;
}

// Generate the favicon generator HTML file
const publicDir = path.join(__dirname, '..', 'public');
const generatorPath = path.join(publicDir, 'favicon-generator.html');

try {
  const html = createFaviconGeneratorHTML();
  fs.writeFileSync(generatorPath, html);

  console.log('✅ Favicon generator created at: /public/favicon-generator.html');
  console.log('📖 Instructions:');
  console.log('1. Open http://localhost:3000/favicon-generator.html in your browser');
  console.log('2. Click "Generate All Favicons"');
  console.log('3. Download each favicon file');
  console.log('4. Place them in the /public directory');
  console.log('5. Delete the favicon-generator.html file when done');

  // Also generate the favicon.ico file data
  const faviconIcoData = generateFaviconSVG(32);
  const icoPath = path.join(publicDir, 'favicon-template.svg');
  fs.writeFileSync(icoPath, faviconIcoData);

  console.log('✅ Favicon template SVG created at: /public/favicon-template.svg');

} catch (error) {
  console.error('❌ Error generating favicon files:', error);
}