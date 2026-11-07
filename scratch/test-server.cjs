fetch('http://localhost:3000/')
  .then(res => res.text())
  .then(html => {
    console.log('Server response code: 200 OK');
    console.log('HTML size:', html.length, 'bytes');
    console.log('Tab overview present:', html.includes('id="tab-overview"'));
    console.log('Tab packages present:', html.includes('id="tab-packages"'));
    console.log('Tab bookings present:', html.includes('id="tab-bookings"'));
    console.log('Tab finance present:', html.includes('id="tab-finance"'));
    console.log('Tab settings present:', html.includes('id="tab-settings"'));
  })
  .catch(err => {
    console.error('Fetch error:', err.message);
  });

