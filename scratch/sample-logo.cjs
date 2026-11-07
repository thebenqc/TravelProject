const fs = require('fs');
const { PNG } = require('pngjs');

function inspectImage(path) {
  fs.createReadStream(path)
    .pipe(new PNG())
    .on('parsed', function() {
      console.log(`\n=== File: ${path} (${this.width}x${this.height}) ===`);
      const colorMap = new Map();
      for (let i = 0; i < this.data.length; i += 4) {
        const a = this.data[i + 3];
        if (a < 50) continue;
        const r = this.data[i];
        const g = this.data[i + 1];
        const b = this.data[i + 2];
        if (r > 245 && g > 245 && b > 245) continue; // skip pure white
        const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
      }
      const sorted = Array.from(colorMap.entries()).sort((a,b) => b[1] - a[1]).slice(0, 15);
      console.log('Top distinct hex colors:', sorted);
    });
}

inspectImage('public/logo-circle.png');
inspectImage('public/logo-clean.png');
inspectImage('public/logo.png');
