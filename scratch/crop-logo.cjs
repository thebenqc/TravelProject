const fs = require('fs');
const { PNG } = require('pngjs');

const srcPath = 'C:/Users/acer/.gemini/antigravity-ide/brain/79ca2093-fe0f-4ffa-bb67-b34e37b67512/.user_uploaded/media_1791699214679.png';
const outCirclePath = 'C:/Users/acer/.gemini/antigravity-ide/scratch/flynature-holidays/public/logo-circle.png';
const outCleanPath = 'C:/Users/acer/.gemini/antigravity-ide/scratch/flynature-holidays/public/logo-clean.png';

fs.createReadStream(srcPath)
  .pipe(new PNG())
  .on('parsed', function() {
    const src = this;
    console.log(`Original image: ${src.width}x${src.height}`);

    // 1. Crop true 1:1 square circle (height is 221, width centered at 335 / 2 = 167.5 -> startX = 57, size = 221)
    const squareSize = 221;
    const startX = Math.floor((src.width - squareSize) / 2); // 57
    const squarePNG = new PNG({ width: squareSize, height: squareSize });

    for (let y = 0; y < squareSize; y++) {
      for (let x = 0; x < squareSize; x++) {
        const srcIdx = ((y * src.width) + (startX + x)) << 2;
        const dstIdx = ((y * squareSize) + x) << 2;
        squarePNG.data[dstIdx] = src.data[srcIdx];
        squarePNG.data[dstIdx + 1] = src.data[srcIdx + 1];
        squarePNG.data[dstIdx + 2] = src.data[srcIdx + 2];
        squarePNG.data[dstIdx + 3] = src.data[srcIdx + 3];
      }
    }
    squarePNG.pack().pipe(fs.createWriteStream(outCirclePath));
    console.log(`Saved 1:1 circle logo to ${outCirclePath}`);

    // 2. Crop tight inner logo:
    // Let's find bounding box of non-white pixels inside the circle
    let minX = src.width, minY = src.height, maxX = 0, maxY = 0;
    for (let y = 30; y < src.height - 30; y++) {
      for (let x = startX + 30; x < startX + squareSize - 30; x++) {
        const idx = ((y * src.width) + x) << 2;
        const r = src.data[idx];
        const g = src.data[idx + 1];
        const b = src.data[idx + 2];
        // If not white/near-white
        if (r < 240 || g < 240 || b < 240) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    // Add padding of 14px
    const pad = 14;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(src.width, maxX + pad);
    maxY = Math.min(src.height, maxY + pad);

    const cropW = maxX - minX;
    const cropH = maxY - minY;
    console.log(`Inner logo bounding box: ${minX},${minY} ${cropW}x${cropH}`);

    const cleanPNG = new PNG({ width: cropW, height: cropH });
    for (let y = 0; y < cropH; y++) {
      for (let x = 0; x < cropW; x++) {
        const srcIdx = (((minY + y) * src.width) + (minX + x)) << 2;
        const dstIdx = ((y * cropW) + x) << 2;
        cleanPNG.data[dstIdx] = src.data[srcIdx];
        cleanPNG.data[dstIdx + 1] = src.data[srcIdx + 1];
        cleanPNG.data[dstIdx + 2] = src.data[srcIdx + 2];
        cleanPNG.data[dstIdx + 3] = src.data[srcIdx + 3];
      }
    }
    cleanPNG.pack().pipe(fs.createWriteStream(outCleanPath));
    console.log(`Saved clean inner logo to ${outCleanPath}`);
  });
