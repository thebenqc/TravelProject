const fs = require('fs');

console.log('--- RUNNING FULL SYSTEM VERIFICATION ---');

const css = fs.readFileSync('index.css', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('main.js', 'utf8');

// 1. Verify Color Tokens
const requiredColorTokens = [
  '--brand-primary: #0284C7',
  '--brand-nature: #16A34A',
  '--brand-amber: #F59E0B',
  '--primary-black: #0F172A',
  '--text-grey: #64748B'
];
console.log('\n[1] Checking Brand Color Tokens in index.css:');
for (const token of requiredColorTokens) {
  const found = css.includes(token);
  console.log(` ${found ? '✓' : '✗'} ${token}`);
  if (!found) throw new Error(`Missing token: ${token}`);
}

// 2. Verify Tab Visibility CSS
console.log('\n[2] Checking Admin Tab Visibility CSS rules:');
const requiredCssRules = [
  '.dash-tab-pane {',
  'display: none !important',
  '.dash-tab-pane.active {',
  'display: block !important',
  '.dash-metrics-grid',
  '.metric-card',
  '.metric-value',
  '.status-pill',
  '.fleet-quick-list',
  '.settings-form-grid',
  '.finance-breakdown-card',
  '.dash-filter-btn'
];
for (const rule of requiredCssRules) {
  const found = css.includes(rule);
  console.log(` ${found ? '✓' : '✗'} ${rule}`);
  if (!found) throw new Error(`Missing CSS rule: ${rule}`);
}

// 3. Verify Admin Dashboard Tabs in HTML
console.log('\n[3] Checking all 5 Dashboard Tab sections in index.html:');
const requiredTabs = [
  'id="tab-overview"',
  'id="tab-packages"',
  'id="tab-bookings"',
  'id="tab-finance"',
  'id="tab-settings"'
];
for (const tab of requiredTabs) {
  const found = html.includes(tab);
  console.log(` ${found ? '✓' : '✗'} ${tab}`);
  if (!found) throw new Error(`Missing Tab: ${tab}`);
}

// 4. Verify Admin Modals in HTML
console.log('\n[4] Checking Admin Modals in index.html:');
const requiredModals = [
  'id="packageEditModalBackdrop"',
  'id="categoryManagerModalBackdrop"',
  'id="addLeadModalBackdrop"',
  'id="recordPaymentModalBackdrop"',
  'id="packageModalBackdrop"'
];
for (const modal of requiredModals) {
  const found = html.includes(modal);
  console.log(` ${found ? '✓' : '✗'} ${modal}`);
  if (!found) throw new Error(`Missing Modal: ${modal}`);
}

// 5. Verify Functions in main.js
console.log('\n[5] Checking Dashboard Controller Functions in main.js:');
const requiredFns = [
  'window.switchView',
  'window.switchDashTab',
  'window.filterDashPackages',
  'window.searchDashPackages',
  'window.filterBookingsByStatus',
  'window.searchBookings',
  'window.openAddLeadModal',
  'window.closeAddLeadModal',
  'window.handleSaveLead',
  'window.deleteBooking',
  'window.openRecordPaymentModal',
  'window.closeRecordPaymentModal',
  'window.handleSavePayment',
  'window.deletePayment',
  'window.saveBranchSettings',
  'window.resetBranchSettings',
  'window.openCategoryManagerModal',
  'window.closeCategoryManagerModal',
  'window.openAddPackageModal',
  'window.openEditPackageModal',
  'window.closePackageEditModal',
  'window.handleSavePackage',
  'window.deletePackage',
  'window.updateBookingStatus',
  'window.applySettingsToWebsite'
];
for (const fn of requiredFns) {
  const found = js.includes(fn);
  console.log(` ${found ? '✓' : '✗'} ${fn}`);
  if (!found) throw new Error(`Missing JS function: ${fn}`);
}

console.log('\n🎉 ALL SYSTEM VERIFICATION CHECKS PASSED SUCCESSFULLY!\n');

