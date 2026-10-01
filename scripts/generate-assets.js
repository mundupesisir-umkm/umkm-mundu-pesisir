const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  const root = path.resolve(__dirname, '..');
  const generatedOg = 'C:\\Users\\Catwis\\.gemini\\antigravity-ide\\brain\\905dae19-0185-4e19-bdb7-d217ee4d636f\\og_banner_mundupesisir_1790874354294.jpg';
  const logoPath = path.join(root, 'public', 'Mundupesisir.png');
  const publicDir = path.join(root, 'public');
  const appDir = path.join(root, 'app');

  console.log('1. Processing OG Image (1200x630)...');
  await sharp(generatedOg)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'og-image.jpg'));
  console.log('✓ public/og-image.jpg created successfully');

  console.log('2. Processing Favicons and Icons from Mundupesisir.png...');
  // 48x48 (Google Search official recommendation)
  await sharp(logoPath)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'icon-48x48.png'));
  console.log('✓ public/icon-48x48.png created');

  // 96x96
  await sharp(logoPath)
    .resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'icon-96x96.png'));
  console.log('✓ public/icon-96x96.png created');

  // 192x192 (PWA / Android)
  await sharp(logoPath)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'icon-192x192.png'));
  console.log('✓ public/icon-192x192.png created');

  // 512x512 (PWA splash / high-res)
  await sharp(logoPath)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(publicDir, 'icon-512x512.png'));
  console.log('✓ public/icon-512x512.png created');

  // 180x180 (Apple Touch Icon)
  await sharp(logoPath)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ public/apple-touch-icon.png created');

  // 48x48 and 32x32 for favicon.ico
  // A standard ICO can contain PNG data or 32/48px
  const iconBuffer = await sharp(logoPath)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), iconBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), iconBuffer);
  console.log('✓ public/favicon.ico and app/favicon.ico updated (48x48 lightweight PNG-ICO)');
}

main().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
