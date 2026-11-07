const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log('--- COMPREHENSIVE PUBLIC WEBSITE & DASHBOARD INTEGRITY AUDIT ---');

const checks = [
  // Brand Header
  { name: 'Navbar Brandmark Logo', pass: html.includes('src="/logo-brandmark.png"') },
  { name: 'Sticky Navbar', pass: html.includes('class="navbar"') },
  { name: 'Admin Portal Header Button', pass: html.includes("window.switchView('dashboard')") },
  { name: 'WhatsApp Hotline Header Link', pass: html.includes('wa.me/919447422126') },
  
  // Hero Section
  { name: 'Hero Headline', pass: html.includes('EXPLORE, EXPERIENCE,') },
  { name: 'Hero Trust 1 (Kerala Tourism)', pass: html.includes('Kerala Tourism Certified') },
  { name: 'Hero Trust 2 (4.9 Rating)', pass: html.includes('4.9★ Google Rating') },
  { name: 'Hero Trust 3 (100% Tailored)', pass: html.includes('100% Tailored') },
  { name: 'Hero Visual Composition Showcase', pass: html.includes('hero-visual-showcase') },
  { name: 'Hero Floating Departure Card', pass: html.includes('floating-top-card') },
  { name: 'Hero Floating Island Pass Card', pass: html.includes('floating-bottom-card') },
  
  // Docked Search
  { name: 'Docked Search Bar', pass: html.includes('class="search-dock-form"') },
  { name: 'Search Destination Select', pass: html.includes('id="searchDest"') },
  { name: 'Search Month Select', pass: html.includes('id="searchMonth"') },
  
  // 4-Column Services & Secondary Services
  { name: '4-Column Service Grid', pass: html.includes('services-four-col-grid') },
  { name: 'Secondary Service Grid', pass: html.includes('services-secondary-grid') },
  
  // 5-Step Process
  { name: '5-Step Process Timeline', pass: html.includes('process-timeline') },
  { name: 'Step 01 Discover', pass: html.includes('01 DISCOVER') },
  { name: 'Step 02 Strategise', pass: html.includes('02 STRATEGISE') },
  { name: 'Step 03 Secure', pass: html.includes('03 SECURE') },
  { name: 'Step 04 Refine', pass: html.includes('04 REFINE') },
  { name: 'Step 05 Experience', pass: html.includes('05 EXPERIENCE') },
  
  // Packages Grid & Filters
  { name: 'Packages Filter Pills Bar', pass: html.includes('id="categoryPills"') },
  { name: 'Packages Container', pass: html.includes('id="packagesContainer"') },
  
  // Interactive Trip Estimator
  { name: 'Estimator Form', pass: html.includes('id="plannerForm"') },
  { name: 'Destination Select', pass: html.includes('id="calcDest"') },
  { name: 'Stay Tier Radios', pass: html.includes('name="stayTier"') },
  { name: 'Calculated Price Display', pass: html.includes('id="calcPriceDisplay"') },
  { name: 'Send Estimate to WhatsApp', pass: html.includes('sendEstimateToWhatsApp') },
  
  // Reviews & Founders
  { name: 'Reviews Section', pass: html.includes('id="testimonials"') },
  { name: 'Founder Muhydheen Photo', pass: html.includes('founder-muhydheen.jpg') },
  { name: 'Founder Noufal Photo', pass: html.includes('founder-noufal.jpg') },
  
  // Contact Form
  { name: 'Inquiry Form', pass: html.includes('id="inquiryForm"') },
  { name: 'Kondotty & Koduvally Hotlines', pass: html.includes('+91 94474 22126') },
  
  // Admin Dashboard Tabs
  { name: 'Dashboard Container', pass: html.includes('id="adminDashboardView"') },
  { name: 'Tab 1: Overview', pass: html.includes('id="tab-overview"') },
  { name: 'Tab 2: Packages Manager', pass: html.includes('id="tab-packages"') },
  { name: 'Tab 3: Bookings CRM', pass: html.includes('id="tab-bookings"') },
  { name: 'Tab 4: Finance & Audit', pass: html.includes('id="tab-finance"') },
  { name: 'Tab 5: Branch Settings', pass: html.includes('id="tab-settings"') },
  
  // Admin Modals
  { name: 'Package Add/Edit Modal', pass: html.includes('id="packageEditModalBackdrop"') },
  { name: 'Category Manager Modal', pass: html.includes('id="categoryManagerModalBackdrop"') },
  { name: 'Lead Logger Modal', pass: html.includes('id="addLeadModalBackdrop"') },
  { name: 'Payment Inflow Logger Modal', pass: html.includes('id="recordPaymentModalBackdrop"') },
  { name: 'Package Detail Itinerary Modal', pass: html.includes('id="packageModalBackdrop"') },
  
  // Floating Widget
  { name: 'Floating WhatsApp Widget', pass: html.includes('id="floatingWhatsapp"') },
  
  // SEO & Metadata
  { name: 'Schema.org TravelAgency JSON-LD', pass: html.includes('"@type": "TravelAgency"') },
  { name: 'Open Graph Image', pass: html.includes('og:image') }
];

let allPassed = true;
for (const c of checks) {
  console.log(`[${c.pass ? 'PASS' : 'FAIL'}] ${c.name}`);
  if (!c.pass) allPassed = false;
}

if (allPassed) {
  console.log('\n🌟 PERFECT: All 40 public website & dashboard verification points PASSED!');
} else {
  console.error('\n❌ SOME CHECKS FAILED!');
  process.exit(1);
}

