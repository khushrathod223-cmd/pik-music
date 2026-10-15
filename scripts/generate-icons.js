import fs from 'fs';
import zlib from 'zlib';

function createPNG(width, height, drawFn) {
  // Buffer for RGBA scanlines (width * 4 + 1 filter byte per row)
  const rowSize = width * 4 + 1;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type: None

    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawFn(x, y, width, height);
      const pxOffset = rowOffset + 1 + x * 4;
      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const deflated = zlib.deflateSync(rawData);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 6; // Color type: RGBA
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace
  const ihdr = makeChunk('IHDR', ihdrData);

  // IDAT
  const idat = makeChunk('IDAT', deflated);

  // IEND
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(4 + 4 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc >>> 0, 8 + len);
  return buf;
}

// CRC32 implementation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return crc ^ -1;
}

// Draw the PiK Music Logo Icon
function drawPiKIcon(x, y, w, h) {
  // Normalize coords [0..1]
  const nx = x / w;
  const ny = y / h;

  const dx = nx - 0.5;
  const dy = ny - 0.5;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Background dark midnight blue
  let r = 2;
  let g = 6;
  let b = 23;
  let a = 255;

  // Center radial blue sheen
  if (dist < 0.45) {
    const glow = 1 - dist / 0.45;
    r += Math.floor(glow * 10);
    g += Math.floor(glow * 40);
    b += Math.floor(glow * 90);
  }

  // Rounded outer frame neon cyan rim
  const cornerR = 0.2;
  const inBorderX = Math.abs(dx) > 0.43;
  const inBorderY = Math.abs(dy) > 0.43;
  if ((inBorderX || inBorderY) && Math.abs(dx) <= 0.47 && Math.abs(dy) <= 0.47) {
    r = 0;
    g = 229;
    b = 255;
    a = 220;
  }

  // Waveform bars in lower center
  if (ny > 0.65 && ny < 0.85 && Math.abs(dx) < 0.35) {
    const barIndex = Math.floor((nx - 0.15) / 0.1);
    const heights = [0.08, 0.14, 0.18, 0.12, 0.16, 0.09, 0.06];
    const targetH = heights[barIndex] || 0.05;
    if (Math.abs(ny - 0.75) < targetH) {
      r = 0;
      g = 229;
      b = 255;
    }
  }

  // "P" symbol in center-left
  if (nx >= 0.25 && nx <= 0.32 && ny >= 0.25 && ny <= 0.60) {
    r = 255;
    g = 255;
    b = 255;
  }
  if (nx >= 0.30 && nx <= 0.50 && ((ny >= 0.25 && ny <= 0.31) || (ny >= 0.42 && ny <= 0.48))) {
    r = 0;
    g = 229;
    b = 255;
  }
  if (nx >= 0.46 && nx <= 0.52 && ny >= 0.28 && ny <= 0.45) {
    r = 0;
    g = 229;
    b = 255;
  }

  // "K" symbol in center-right
  if (nx >= 0.58 && nx <= 0.64 && ny >= 0.25 && ny <= 0.60) {
    r = 255;
    g = 255;
    b = 255;
  }
  // diagonal legs of K
  const leg1 = Math.abs((nx - 0.62) - (0.42 - ny) * 0.8);
  const leg2 = Math.abs((nx - 0.62) - (ny - 0.42) * 0.8);
  if ((leg1 < 0.035 && nx > 0.62 && ny < 0.45) || (leg2 < 0.035 && nx > 0.62 && ny > 0.40 && ny < 0.62)) {
    r = 0;
    g = 229;
    b = 255;
  }

  // Glowing water droplets
  const d1 = Math.hypot(nx - 0.28, ny - 0.20);
  const d2 = Math.hypot(nx - 0.72, ny - 0.22);
  const d3 = Math.hypot(nx - 0.75, ny - 0.58);
  if (d1 < 0.025 || d2 < 0.022 || d3 < 0.02) {
    r = 255;
    g = 255;
    b = 255;
  }

  return [Math.min(255, r), Math.min(255, g), Math.min(255, b), a];
}

// Generate all standard PWA PNG icons
const icon192 = createPNG(192, 192, drawPiKIcon);
const icon512 = createPNG(512, 512, drawPiKIcon);
const icon180 = createPNG(180, 180, drawPiKIcon);

fs.writeFileSync('public/pwa-192x192.png', icon192);
fs.writeFileSync('public/pwa-512x512.png', icon512);
fs.writeFileSync('public/pwa-maskable-512x512.png', icon512);
fs.writeFileSync('public/apple-touch-icon.png', icon180);
fs.writeFileSync('public/favicon.ico', icon192);

console.log('Successfully generated all PWA PNG icon assets in public/');
