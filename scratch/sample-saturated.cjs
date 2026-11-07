const fs = require('fs');
const { PNG } = require('pngjs');

fs.createReadStream('public/logo.png')
  .pipe(new PNG())
  .on('parsed', function() {
    const list = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (y * this.width + x) * 4;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;
        if (diff > 40) { // saturated color
          list.push({ x, y, r, g, b, hex: '#' + ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1) });
        }
      }
    }
    console.log('Total saturated pixels:', list.length);
    // group by color family
    const groups = {};
    for (const p of list) {
      const cr = Math.round(p.r / 32) * 32;
      const cg = Math.round(p.g / 32) * 32;
      const cb = Math.round(p.b / 32) * 32;
      const key = `${cr},${cg},${cb}`;
      if (!groups[key]) groups[key] = { count: 0, examples: [] };
      groups[key].count++;
      if (groups[key].examples.length < 3) groups[key].examples.push(p.hex);
    }
    console.log('Color groups:', groups);
  });

