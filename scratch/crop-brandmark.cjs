const fs = require('fs');
const { PNG } = require('pngjs');

const srcPath = 'C:/Users/acer/.gemini/antigravity-ide/brain/79ca2093-fe0f-4ffa-bb67-b34e37b67512/.user_uploaded/media_1791699214679.png';
const outTextOnly = 'C:/Users/acer/.gemini/antigravity-ide/scratch/flynature-holidays/public/logo-brandmark.png';

fs.createReadStream(srcPath)
  .pipe(new PNG())
  .on('parsed', function() {
    const src = this;

    // The text and bars are centered horizontally around x=167 and y=110
    // Let's crop x from 135 to 235 (width 100), y from 75 to 145 (height 70)
    const cropX = 135;
    const cropY = 75;
    const cropW = 100;
    const cropH = 70;

    const outPNG = new PNG({ width: cropW, height: cropH });

    for (let y = 0; y < cropH; y++) {
      for (let x = 0; x < cropW; x++) {
        const srcIdx = (((cropY + y) * src.width) + (cropX + x)) << 2;
        const dstIdx = ((y * cropW) + x) << 2;
        outPNG.data[dstIdx] = src.data[srcIdx];
        outPNG.data[dstIdx + 1] = src.data[srcIdx + 1];
        outPNG.data[dstIdx + 2] = src.data[srcIdx + 2];
        outPNG.data[dstIdx + 3] = src.data[srcIdx + 3];
      }
    }

    outPNG.pack().pipe(fs.createWriteStream(outTextOnly));
    console.log(`Saved exact brandmark to ${outTextOnly}`);
  });
