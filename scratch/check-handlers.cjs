const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('main.js', 'utf8');

const regex = /(onclick|onsubmit|onchange)="([^"]+)"/g;
let match;
const handlers = new Set();
while ((match = regex.exec(html)) !== null) {
  handlers.add(match[2]);
}

console.log('Total event handler expressions:', handlers.size);
for (const h of [...handlers].sort()) {
  // extract function name if window.xxx(...)
  const fnMatch = h.match(/window\.([a-zA-Z0-9_]+)/);
  if (fnMatch) {
    const fnName = fnMatch[1];
    const isDefined = js.includes('window.' + fnName) || js.includes('function ' + fnName);
    console.log(`${isDefined ? '✓' : '✗ MISSING:'} ${fnName}  -> (${h})`);
  } else {
    console.log(`  (inline): ${h}`);
  }
}

