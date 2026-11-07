/* ==========================================================================
   Fly Nature Holidays - Interactive Application & Admin Dashboard Logic
   ========================================================================== */

import {
  getSupabase,
  isSupabaseConnected,
  getSupabaseConfig,
  saveSupabaseConfig,
  disconnectSupabase,
  fetchCloudPackages,
  syncPackageToCloud,
  deleteCloudPackage,
  syncLeadToCloud,
  fetchCloudLeads,
  deleteCloudLead,
  syncPaymentToCloud
} from './supabaseClient.js';

// 1. MASTER TOUR PACKAGES DATA (Featured on Instagram & Official Operations)
export const DEFAULT_PACKAGES = [
  {
    id: 'golden-triangle-5d',
    title: 'Golden Triangle: Delhi, Agra Taj Mahal, Fatehpur Sikri & Jaipur',
    category: 'golden-triangle',
    style: 'family',
    durationDays: 5,
    durationNights: 4,
    price: 18500,
    showPrice: false,
    rating: 5.0,
    reviewsCount: 198,
    stops: 'Delhi Red Fort • Agra Taj Mahal • Fatehpur Sikri • Jaipur Amber Fort',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-historic-monument-in-india-42457-large.mp4',
    badge: 'Golden Triangle 🏛️',
    inclusions: [
      'Taj Mahal Sunrise Guided Exploration with Verified Historian',
      'Fatehpur Sikri & Buland Darwaza Heritage Tour',
      'Jaipur Pink City & Amber Fort Jeep Ride',
      '4★ Luxury Heritage Hotels & Daily Breakfast',
      'Private AC Tourist Sedan / Innova Throughout'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Delhi & Heritage City Tour', desc: 'Warm reception at Delhi Airport. Guided tour of India Gate, Qutub Minar, Rashtrapati Bhavan, and evening Old Delhi Chandni Chowk.' },
      { day: 2, title: 'Delhi to Agra via Yamuna Expressway & Agra Fort', desc: 'Scenic express highway drive to Agra. Check in to luxury 4★ hotel. Tour the red sandstone Agra Fort and sunset view of Taj Mahal from Mehtab Bagh across Yamuna River.' },
      { day: 3, title: 'Sunrise at Taj Mahal & Royal Fatehpur Sikri', desc: 'Witness breathtaking dawn light playing on ivory white marble at Taj Mahal. Enroute to Jaipur, explore the ghost palace city of Emperor Akbar at Fatehpur Sikri.' },
      { day: 4, title: 'Jaipur Royal Pink City & Amber Fort Safari', desc: 'Ascend Amber Fort by heritage jeep. Marvel at Sheesh Mahal (Palace of Mirrors), Hawa Mahal (Palace of Winds), and Jantar Mantar observatory.' },
      { day: 5, title: 'Jaipuri Handlooms, Bazaars & Departure', desc: 'Shop for Jaipuri blue pottery, block print textiles and gems before highway transfer to Delhi Airport for return flight to Calicut/Cochin.' }
    ]
  },
  {
    id: 'agra-delhi-heritage-4d',
    title: 'Delhi & Agra Taj Mahal Express Heritage Tour',
    category: 'golden-triangle',
    style: 'friends',
    durationDays: 4,
    durationNights: 3,
    price: 14200,
    showPrice: false,
    rating: 4.9,
    reviewsCount: 142,
    stops: 'Delhi Qutub Minar • India Gate • Taj Mahal • Agra Fort • Mehtab Bagh',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-historic-monument-in-india-42457-large.mp4',
    badge: 'Delhi & Agra Express',
    inclusions: [
      'Roundtrip AC Transfers from Delhi Airport',
      'Taj Mahal Monument Pass & Fast-Track Entry',
      'Yamuna Expressway Fast Transit',
      'Daily Buffet Breakfast at 4★ Hotel',
      'Specialist Tour Coordinator Available 24/7'
    ],
    itinerary: [
      { day: 1, title: 'Arrival at Delhi & Capital Sightseeing', desc: 'Pick up from Delhi Airport / Railway station. Visit Humayun\'s Tomb and Connaught Place.' },
      { day: 2, title: 'Express Drive to Agra & Local Marble Artisans', desc: 'Drive to Agra. Check in, visit Itmad-ud-Daulah (Baby Taj) and evening Agra Fort tour.' },
      { day: 3, title: 'Taj Mahal Sunrise Wonder & Mehtab Bagh Sunset', desc: 'Early morning photography session at Taj Mahal. Relaxed afternoon and riverside garden sunset.' },
      { day: 4, title: 'Return to Delhi & Departure', desc: 'Return drive to Delhi, quick stop at Akshardham Temple, and airport transfer.' }
    ]
  },
  {
    id: 'uttarakhand-dehradun-mussoorie-6d',
    title: 'Uttarakhand Scenic Escape (Dehradun, Mussoorie & Rishikesh)',
    category: 'uttarakhand',
    style: 'family',
    durationDays: 6,
    durationNights: 5,
    price: 24500,
    showPrice: false,
    rating: 5.0,
    reviewsCount: 176,
    stops: 'Dehradun Valley • Mussoorie Kempty Falls • Rishikesh Ganga Aarti • Lakshman Jhula',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-river-flowing-through-a-mountain-valley-42978-large.mp4',
    badge: 'Uttarakhand 🌲 Queen of Hills',
    inclusions: [
      'Dehradun Robber\'s Cave & Forest Research Institute (FRI) Tour',
      'Mussoorie Mall Road, Gun Hill & Kempty Falls',
      'Rishikesh Holy Ganga Aarti & River Rafting Support',
      'Valley-Facing Mountain Resort Stays with Daily Breakfast',
      'Private Chauffeur Driven Mountain Cab Throughout'
    ],
    itinerary: [
      { day: 1, title: 'Arrival at Dehradun Jolly Grant Airport', desc: 'Reception by Fly Nature team at Jolly Grant Airport. Transfer to Dehradun hotel. Visit Sahastradhara sulphur springs and Tapkeshwar Temple.' },
      { day: 2, title: 'Dehradun to Mussoorie (Queen of the Hills)', desc: 'Scenic climb to Mussoorie. Check into hill resort overlooking Doon Valley. Evening stroll on heritage Mall Road and Camel\'s Back Road.' },
      { day: 3, title: 'Mussoorie Kempty Falls & Gun Hill Sunset', desc: 'Visit majestic Kempty Falls, take ropeway cable car up to Gun Hill for panoramic views of snow-draped Himalayan peaks.' },
      { day: 4, title: 'Mussoorie to Holy Rishikesh (Capital of Yoga)', desc: 'Drive down through foothills to Rishikesh. Cross iconic Lakshman Jhula and Ram Jhula. Witness enchanting evening Ganga Aarti at Triveni Ghat with floating oil lamps.' },
      { day: 5, title: 'Rishikesh River Rafting & Beatles Ashram', desc: 'Optional white water rafting down the Holy Ganges. Walk through historic Beatles Ashram and serene riverside cafes.' },
      { day: 6, title: 'Dehradun Airport Departure', desc: 'Morning mountain breakfast and private transfer to Dehradun Airport for return flight to Calicut/Cochin.' }
    ]
  },
  {
    id: 'nainital-corbett-5d',
    title: 'Nainital Lake District & Jim Corbett Tiger Safari',
    category: 'uttarakhand',
    style: 'friends',
    durationDays: 5,
    durationNights: 4,
    price: 21900,
    showPrice: false,
    rating: 4.9,
    reviewsCount: 132,
    stops: 'Naini Lake Boating • Naina Peak • Jim Corbett National Park • Kosi River',
    image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-river-flowing-through-a-mountain-valley-42978-large.mp4',
    badge: 'Corbett Safari 🐅',
    inclusions: [
      'Jim Corbett 4x4 Open Top Gypsy Jungle Safari',
      'Naini Lake Yacht Boating & Cable Car to Snow View',
      'Riverside Resort Stay near Kosi River with Campfire',
      'Daily Breakfast & Halal / Authentic Dinner',
      'All National Park Permits & Guide Fees'
    ],
    itinerary: [
      { day: 1, title: 'Delhi to Nainital (Hill of Lakes)', desc: 'Pick up from Delhi/Dehradun and scenic mountain drive to Nainital. Check in and evening boat ride on mango-shaped Naini Lake.' },
      { day: 2, title: 'Nainital Lake Tour & Snow View Point', desc: 'Visit Bhimtal, Sattal, and Naukuchiatal. Cable car ride to Snow View Point with breathtaking Nanda Devi Himalayan vistas.' },
      { day: 3, title: 'Nainital to Jim Corbett Wilderness Resort', desc: 'Drive down through dense Sal forests to Jim Corbett National Park. Check into jungle resort by Kosi River. Evening nature walk and campfire.' },
      { day: 4, title: 'Jim Corbett Open Gypsy Wildlife Safari', desc: 'Early dawn 4x4 open safari into Corbett core tiger zone. Spot Bengal tigers, wild elephants, sambar deer, and exotic bird species.' },
      { day: 5, title: 'Garjiya Devi Temple & Return Transfer', desc: 'Visit temple perched on huge boulder in Kosi River, followed by departure drive back to airport.' }
    ]
  },
  {
    id: 'turkey-cappadocia-7d',
    title: 'Turkey Cappadocia & Istanbul Grand Voyage',
    category: 'international',
    style: 'family',
    durationDays: 7,
    durationNights: 6,
    price: 68500,
    showPrice: false,
    rating: 5.0,
    reviewsCount: 142,
    stops: 'Istanbul • Bosphorus Cruise • Cappadocia Hot Air Balloons • Pamukkale',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-hot-air-balloons-flying-at-sunset-41485-large.mp4',
    badge: 'Turkey TR 🇹🇷',
    inclusions: [
      'Authentic Cave Suite Stay in Cappadocia',
      'Bosphorus Luxury Dinner Cruise with Shows',
      'Hot Air Balloon Flight Booking Assistance',
      'Domestic Flight Tickets (Istanbul - Cappadocia)',
      'Daily Breakfast & Halal Dinners'
    ],
    itinerary: [
      { day: 1, title: 'Arrival at Istanbul International Airport', desc: 'Warm reception by our tour coordinator. Private transfer to your central 4★ hotel in Sultanahmet. Evening stroll at Taksim Square.' },
      { day: 2, title: 'Istanbul Historic Wonders & Bosphorus Sunset Cruise', desc: 'Guided tour of Hagia Sophia, Blue Mosque, Topkapi Palace, and Grand Bazaar. Sunset private Bosphorus yacht cruise between Europe and Asia.' },
      { day: 3, title: 'Flight to Cappadocia & Fairy Chimneys', desc: 'Morning flight to Cappadocia. Explore Goreme Open Air Museum, Devrent Valley rock formations, and check in to your cave boutique suite.' },
      { day: 4, title: 'Hot Air Balloon Flight & Underground City', desc: 'Dawn hot air balloon ride over surreal volcanic valleys. Afternoon exploration of Kaymakli Underground City and Pigeon Valley.' },
      { day: 5, title: 'Cappadocia to Pamukkale Travertines', desc: 'Scenic journey to Pamukkale. Marvel at the gleaming white thermal calc-terraces and explore ancient Hierapolis ruins & Cleopatra antique pool.' },
      { day: 6, title: 'Return Flight to Istanbul & Spice Bazaar', desc: 'Flight back to Istanbul. Afternoon shopping at Egyptian Spice Market for Turkish Delight, saffron, and souvenirs.' },
      { day: 7, title: 'Departure Transfer', desc: 'Breakfast with Bosphorus view and private airport drop for flight back to Cochin/Calicut.' }
    ]
  },
  {
    id: 'bali-island-6d',
    title: 'Bali Tropical Island & Nusa Penida Lagoon Tour',
    category: 'international',
    style: 'honeymoon',
    durationDays: 6,
    durationNights: 5,
    price: 34999,
    showPrice: false,
    rating: 4.9,
    reviewsCount: 195,
    stops: 'Ubud • Nusa Penida • Kelingking Beach • Kintamani • Seminyak',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4',
    badge: 'Bali 🇮🇩 Tropical',
    inclusions: [
      'Private Pool Villa in Ubud & Seminyak Resort',
      'Fast Speedboat Tour to Nusa Penida Island',
      'Bali Jungle Swing & Tegallalang Rice Terraces',
      'Jimbaran Candlelight Seafood Dinner',
      'Private AC Vehicle & Driver Guide Throughout'
    ],
    itinerary: [
      { day: 1, title: 'Arrival at Denpasar & Ubud Pool Villa Check-in', desc: 'Traditional flower garland welcome at Denpasar Airport. Private transfer to luxury Ubud forest villa with private plunge pool.' },
      { day: 2, title: 'Iconic Bali Jungle Swing & Kintamani Volcano', desc: 'Soar on famous Bali swings over lush river valleys, visit Tegallalang terraced rice paddies, and enjoy lunch facing Mount Batur Volcano.' },
      { day: 3, title: 'Full Day Nusa Penida Island Speedboat Excursion', desc: 'Speedboat cruise to Nusa Penida. Visit world-famous T-Rex Kelingking cliff, Broken Beach, and Angel\'s Billabong with snorkeling.' },
      { day: 4, title: 'Uluwatu Sunset Temple & Kecak Fire Dance', desc: 'Clifftop Uluwatu Temple overlooking Indian Ocean waves. Experience thrilling Kecak Fire Dance at sunset, followed by beach dinner.' },
      { day: 5, title: 'Seminyak Beach & Balinese Spa Wellness', desc: 'Relaxing 2-hour Balinese herbal aromatherapy massage. Sunset cocktails and leisure shopping in vibrant Seminyak.' },
      { day: 6, title: 'Souvenir Shopping & Flight Departure', desc: 'Visit Krisna Oleh Oleh for authentic Balinese gifts and private transfer to airport.' }
    ]
  },
  {
    id: 'dubai-abu-dhabi-5d',
    title: 'Dubai Glamour & Abu Dhabi Grand Mosque Experience',
    category: 'international',
    style: 'family',
    durationDays: 5,
    durationNights: 4,
    price: 36500,
    showPrice: false,
    rating: 4.9,
    reviewsCount: 220,
    stops: 'Burj Khalifa 124th Fl • Desert Safari BBQ • Marina Dhow Cruise • Sheikh Zayed Mosque',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-safari-jeep-driving-through-the-desert-sand-42991-large.mp4',
    badge: 'Dubai UAE 🇦🇪',
    inclusions: [
      'Burj Khalifa 124th Floor Observation Deck Tickets',
      'Desert Safari 4x4 Dune Bashing with Live Tanoura & BBQ Dinner',
      'Dubai Marina Luxury Dhow Cruise with International Buffet',
      'Abu Dhabi Sheikh Zayed Grand Mosque Guided Tour',
      'Private Airport Transfers & 4★ Hotel in Deira / Bur Dubai'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Dubai & Marina Dhow Cruise', desc: 'Direct flight from Calicut/Cochin. Warm reception at Dubai International Airport. Check in and evening 2-hour Dubai Marina cruise.' },
      { day: 2, title: 'Dubai City Tour & Burj Khalifa Sky View', desc: 'Tour Dubai Frame, Palm Jumeirah, and Burj Al Arab photo stop. Ascend Burj Khalifa top observation deck and watch dancing fountains.' },
      { day: 3, title: 'Thrilling Desert Safari & Arabian BBQ Camp', desc: 'Afternoon 4x4 Land Cruiser desert dune bashing, sandboarding, camel rides, henna painting, and feast on BBQ dinner under desert stars.' },
      { day: 4, title: 'Day Excursion to Abu Dhabi Capital', desc: 'Drive to Abu Dhabi. Tour majestic Sheikh Zayed Grand Mosque, drive along Corniche, and visit Date Market & Ferrari World photo stop.' },
      { day: 5, title: 'Gold Souk, Meena Bazaar & Flight Home', desc: 'Shopping for electronics, dry fruits, and gold. Private transfer to airport for direct flight back to Kerala.' }
    ]
  },
  {
    id: 'malaysia-genting-5d',
    title: 'Malaysia Kuala Lumpur & Genting Highlands Holiday',
    category: 'international',
    style: 'family',
    durationDays: 5,
    durationNights: 4,
    price: 29500,
    showPrice: false,
    rating: 4.9,
    reviewsCount: 168,
    stops: 'KL Twin Towers • Batu Caves • Genting Cable Car • Putrajaya',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-historic-monument-in-india-42457-large.mp4',
    badge: 'Malaysia MY 🇲🇾',
    inclusions: [
      '4★ Hotel in Kuala Lumpur City Center',
      'Genting Awana SkyWay Cable Car Roundtrip',
      'Batu Caves & Murugan Temple Guided Tour',
      'Petronas Twin Towers & KL Tower Photo Stops',
      'Airport Transfers & Daily Breakfast'
    ],
    itinerary: [
      { day: 1, title: 'Arrival at KLIA & City Orientation', desc: 'Airport pick up, transfer to Bukit Bintang hotel. Evening visit to Jalan Alor food street and glittering illuminated Petronas Twin Towers.' },
      { day: 2, title: 'Batu Caves & Genting Highlands Mountain Resort', desc: 'Climb 272 colorful stairs at Batu Caves. Take Awana SkyWay glass cable car up to cool mountain resort Genting Highlands & indoor theme park.' },
      { day: 3, title: 'Kuala Lumpur Heritage & Modern City Tour', desc: 'Visit King\'s Palace, National Mosque, Merdeka Square, KL Tower observation deck, and premier shopping malls.' },
      { day: 4, title: 'Putrajaya Smart City & Pink Mosque Cruise', desc: 'Tour modern federal administrative center Putrajaya, stunning rose-tinted Putra Mosque, and serene lake cruise.' },
      { day: 5, title: 'Duty Free Shopping & Airport Transfer', desc: 'Morning shopping at Central Market & Chinatown (Petaling Street). Transfer to airport for flight home.' }
    ]
  },
  {
    id: 'thailand-phuket-5d',
    title: 'Thailand Bangkok, Pattaya & Coral Island Adventure',
    category: 'international',
    style: 'friends',
    durationDays: 5,
    durationNights: 4,
    price: 26999,
    showPrice: false,
    rating: 4.8,
    reviewsCount: 210,
    stops: 'Bangkok City • Pattaya • Coral Island Speedboat • Safari World',
    image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-tropical-island-surrounded-by-turquoise-water-43306-large.mp4',
    badge: 'Thailand TH 🇹🇭',
    inclusions: [
      'Speedboat to Coral Island with Seafood/Indian Lunch',
      'Alcazar Cabaret Show VIP Front Seats',
      'Chao Phraya Luxury River Cruise Dinner',
      'Bangkok Reclining Buddha & Golden Temple Tour',
      'Private AC Transfers & Daily Breakfast'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Bangkok to Coastal Pattaya', desc: 'Warm reception at Suvarnabhumi Airport. Drive along Eastern seaboard to Pattaya. Check in and evening Alcazar world-class show.' },
      { day: 2, title: 'Coral Island (Koh Larn) Speedboat Excursion', desc: 'Speedboat cruise across turquoise Gulf of Thailand waters. Parasailing, banana boat ride, and swimming at white sandy beaches.' },
      { day: 3, title: 'Pattaya to Bangkok & Chao Phraya Dinner Cruise', desc: 'Scenic drive to Bangkok. Check into luxury hotel. Evening 2-hour dinner cruise on Chao Phraya River with live music and royal palace sights.' },
      { day: 4, title: 'Bangkok Temples & Safari World Marine Park', desc: 'Visit Wat Traimit (Golden Buddha) & Wat Pho. Afternoon safari drive with tigers, dolphins, and sea lion stunts at Safari World.' },
      { day: 5, title: 'Indra Square Shopping & Flight Departure', desc: 'Shopping for electronics and fashion at Pratunam & MBK Center. Transfer to Bangkok airport.' }
    ]
  },
  {
    id: 'maldives-paradise-4d',
    title: 'Maldives Turquoise Lagoon & Overwater Atoll Escape',
    category: 'international',
    style: 'honeymoon',
    durationDays: 4,
    durationNights: 3,
    price: 44500,
    showPrice: false,
    rating: 5.0,
    reviewsCount: 114,
    stops: 'Male Atoll • Turquoise Lagoon • Coral Sandbank',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-caribbean-coral-reef-and-beach-42987-large.mp4',
    badge: 'Maldives MV 🇲🇻',
    inclusions: [
      'Beachfront or Overwater Atoll Villa Stay',
      'Roundtrip Speedboat Island Transfer from Male Airport',
      'Complimentary Snorkeling Kit & Kayaking Equipment',
      'All Meals Included (Breakfast, Lunch & Dinner Buffet)',
      'Sunset Dolphin Cruise & Welcome Sparkling Drink'
    ],
    itinerary: [
      { day: 1, title: 'Flight Arrival at Male Airport & Speedboat Transfer', desc: 'Touch down over azure atolls. High-speed boat transfer to your private island resort. Check into overwater / beach bungalow.' },
      { day: 2, title: 'Snorkeling with Sea Turtles & Sandbank Picnic', desc: 'Guided house reef snorkeling over vibrant corals. Relax on secluded powdery sandbanks surrounded by crystal-clear waters.' },
      { day: 3, title: 'Sunset Dolphin Cruise & Candlelit Beachside Dinner', desc: 'Cruise into sunset watching playful spinner dolphins. Romantic dinner served under tropical starlit skies by the lagoon.' },
      { day: 4, title: 'Morning Lagoon Swim & Speedboat Departure', desc: 'Breakfast overlooking the turquoise ocean, final morning swim, and transfer back to Velana International Airport.' }
    ]
  },
  {
    id: 'vietnam-danang-6d',
    title: 'Vietnam Da Nang Golden Bridge & Hanoi / Halong Bay',
    category: 'international',
    style: 'family',
    durationDays: 6,
    durationNights: 5,
    price: 38999,
    showPrice: false,
    rating: 4.9,
    reviewsCount: 92,
    stops: 'Hanoi • Halong Bay Cruise • Da Nang • Ba Na Hills Golden Hand Bridge',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-hot-air-balloons-flying-at-sunset-41485-large.mp4',
    badge: 'Vietnam VN 🇻🇳',
    inclusions: [
      'Overnight 5★ Halong Bay Cruise with All Gourmet Meals',
      'Ba Na Hills & Giant Hand Golden Bridge Cable Car',
      'Hoi An Ancient Lantern Town Walking Tour',
      'Daily Breakfast & Halal / Indian Meal Options',
      'All Internal Transfers & English-Speaking Tour Guide'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Hanoi Capital City', desc: 'Airport pick up. Stroll around Hoan Kiem Lake, Ngoc Son Temple, and Old Quarter bustling 36 trade streets.' },
      { day: 2, title: 'Hanoi to UNESCO Halong Bay Cruise', desc: 'Drive through Red River delta to Halong Bay. Board luxury cruise. Sail past limestone karst islands, visit Sung Sot Cave, and kayak in emerald lagoons.' },
      { day: 3, title: 'Halong Bay Sunrise & Flight to Da Nang', desc: 'Tai Chi session at sunrise on sundeck. Disembark and transfer to airport for short flight to central coastal city Da Nang. Check into beachfront hotel.' },
      { day: 4, title: 'Ba Na Hills & Iconic Golden Hands Bridge', desc: 'Ride world\'s longest single-wire cable car to Ba Na Hills. Walk on breathtaking Golden Bridge held by colossal stone hands. Visit French Village.' },
      { day: 5, title: 'Marble Mountains & Hoi An Lantern Town', desc: 'Explore Marble Mountain caves, then visit magical UNESCO heritage Hoi An. Take an evening lantern boat ride on Thu Bon River.' },
      { day: 6, title: 'Da Nang Dragon Bridge & Airport Departure', desc: 'Photo stop at fiery Dragon Bridge & Han River, followed by departure transfer.' }
    ]
  },
  {
    id: 'kashmir-crown-6d',
    title: 'Kashmir Crown of Paradise (Srinagar, Gulmarg & Pahalgam)',
    category: 'kashmir',
    style: 'family',
    durationDays: 6,
    durationNights: 5,
    price: 22999,
    showPrice: false,
    rating: 4.9,
    reviewsCount: 246,
    stops: 'Srinagar • Gulmarg Snow Peak • Pahalgam Betaab Valley • Dal Lake',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-snowy-mountain-peaks-42981-large.mp4',
    badge: 'Kashmir Snow ❄️',
    inclusions: [
      'Luxury Dal Lake Houseboat Stay with Kashmiri Kahwa',
      'Gulmarg Gondola Ride Cable Car Booking Assistance',
      'Private Chauffeur Driven Cab (Innova/Etios)',
      'Daily Breakfast & Authentic Kashmiri Royal Dinners',
      '1-Hour Shikara Sunset Cruise Included'
    ],
    itinerary: [
      { day: 1, title: 'Arrival at Srinagar & Dal Lake Houseboat', desc: 'Warm reception at Srinagar Airport. Check in at handcrafted cedarwood houseboat on Dal Lake with warm Kashmiri Kahwa. Evening Shikara ride.' },
      { day: 2, title: 'Srinagar to Gulmarg Snow Meadows (2,730 m)', desc: 'Drive to world-famous winter sports destination Gulmarg. Ascend Apharwat Peak on Asia\'s highest Gondola cable car for snow activities.' },
      { day: 3, title: 'Gulmarg to Pahalgam Valley of Shepherds', desc: 'Journey through Pampore saffron fields and Awantipora ruins to Pahalgam. Check into riverside luxury resort overlooking Lidder River.' },
      { day: 4, title: 'Betaab Valley, Aru Valley & Chandanwari', desc: 'Explore cinematic Betaab Valley and pine-clad Aru Valley. Enjoy riverside trout fishing and walks.' },
      { day: 5, title: 'Pahalgam to Srinagar Mughal Gardens', desc: 'Return to Srinagar. Visit royal Mughal Gardens: Shalimar Bagh, Nishat Bagh, and Shankaracharya Temple viewpoint.' },
      { day: 6, title: 'Airport Departure with Saffron & Memories', desc: 'Shop for authentic Kashmiri dry fruits, pashmina shawls, and saffron before your transfer to Srinagar International Airport.' }
    ]
  },
  {
    id: 'lakshadweep-agatti-4d',
    title: 'Lakshadweep Coral Paradise & Agatti Island Tour',
    category: 'lakshadweep',
    style: 'family',
    durationDays: 4,
    durationNights: 3,
    price: 24500,
    showPrice: false,
    rating: 5.0,
    reviewsCount: 184,
    stops: 'Agatti Island • Bangaram Lagoon • Thinnakara Coral Reef',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-caribbean-coral-reef-and-beach-42987-large.mp4',
    badge: 'Coral Paradise 🏝️',
    inclusions: [
      'Official Heritage Island Entry Permit Arranged',
      'Beachfront AC Cottage Stay at Agatti',
      'High-Speed Boat Excursion to Bangaram & Thinnakara',
      'Scuba Diving & Coral Snorkeling Assistance',
      'All Meals (Breakfast, Lunch & Dinner)'
    ],
    itinerary: [
      { day: 1, title: 'Flight Arrival at Agatti Island Airport', desc: 'Fly in over breathtaking turquoise atolls. Traditional welcome drink with fresh tender coconut. Check in at beachfront cottages.' },
      { day: 2, title: 'Excursion to Bangaram & Thinnakara Islands', desc: 'Speedboat cruise across crystal lagoons. Spot sea turtles and stingrays in shallow waters. Sandbank walk and picnic lunch.' },
      { day: 3, title: 'Glass Bottom Boat & Scuba Coral Exploration', desc: 'Guided snorkeling session on Agatti coral reefs. Optional certified Scuba Dive. Evening sunset kayaking along calm lagoon.' },
      { day: 4, title: 'Souvenir Shopping & Airport Departure', desc: 'Morning beach stroll, local coconut craft souvenir shopping, and transfer to Agatti Airport for flight to Cochin.' }
    ]
  },
  {
    id: 'executive-umrah-15d',
    title: 'Premium Executive Umrah Package (Makkah & Madinah)',
    category: 'pilgrimage',
    style: 'pilgrimage',
    durationDays: 15,
    durationNights: 14,
    price: 84000,
    showPrice: false,
    rating: 5.0,
    reviewsCount: 260,
    stops: 'Makkah Haram Shareef • Madinah Munawwarah • Historical Ziyarat Tours',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-sun-rays-shining-through-clouds-over-hills-43314-large.mp4',
    badge: 'Umrah Package 🕋',
    inclusions: [
      'Haram Walking Distance 4★ Hotels (Makkah & Madinah)',
      'Direct Roundtrip Flight Tickets from Calicut / Cochin',
      'Umrah Visa Processing & Comprehensive Travel Insurance',
      'Complete Makkah & Madinah Ziyarat Guided by Scholars',
      'Authentic Kerala Buffet Meals & 5 Liters Zamzam Water'
    ],
    itinerary: [
      { day: 1, title: 'Direct Flight from Calicut/Cochin to Jeddah / Madinah', desc: 'Depart from Calicut/Cochin International Airport. Arrival and warm reception by our Saudi ground team. Luxury AC coach transfer to hotel.' },
      { day: 2, title: 'Holy Umrah Rituals in Makkah', desc: 'Perform Umrah (Tawaf, Sa\'ee, Halq) under the step-by-step guidance of our experienced religious scholar (Ameer).' },
      { day: 3, title: 'Prayers in Masjid Al-Haram', desc: 'Dedicated spiritual time for prayers, Nawafil, and Quran recitation facing the Holy Kaabah.' },
      { day: 4, title: 'Makkah Mukarramah Historic Ziyarat', desc: 'Guided AC coach tour to Mina, Arafat, Muzdalifah, Jabal Al-Noor (Ghar Hira), and Jabal Thawr.' },
      { day: 5, title: 'Transfer to Madinah Al-Munawwarah on Haramain High Speed Train', desc: 'Comfortable journey to the City of the Prophet ﷺ on high-speed rail. Check in at hotel near Prophet\'s Mosque.' },
      { day: 6, title: 'Salam at Rawdah Shareef & Madinah Ziyarat', desc: 'Guided Rawdah Shareef entry for men and women. Ziyarat tour to Masjid Quba (first mosque in Islam), Mount Uhud, and Masjid Al-Qiblatayn.' },
      { day: 7, title: 'Spiritual Reflections & Return to Calicut', desc: 'Wada Tawaf / Farewell prayers, collection of Zamzam water, and transfer to airport for direct flight home.' }
    ]
  },
  {
    id: 'kerala-grand-5d',
    title: 'Kerala Grand Symphony (Munnar, Thekkady & Alleppey Backwaters)',
    category: 'kerala',
    style: 'family',
    durationDays: 5,
    durationNights: 4,
    price: 16999,
    showPrice: false,
    rating: 4.9,
    reviewsCount: 312,
    stops: 'Cochin • Munnar Tea Hills • Thekkady Wildlife • Alleppey Backwaters',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-canoe-moving-through-a-canal-surrounded-by-nature-43301-large.mp4',
    badge: 'Kerala Special 🌴',
    inclusions: [
      '4★ Hill Resort & Tea Plantation Stay',
      'Private AC Cab (Innova/Etios)',
      'Alleppey Private Deluxe Houseboat Cruise with Authentic Meals',
      'Daily Breakfast & Periyar Wildlife Boating Assistance',
      'Sightseeing Tolls & Chauffeur Allowances'
    ],
    itinerary: [
      { day: 1, title: 'Arrival at Cochin to Munnar Hill Station (130 km / 4 hrs)', desc: 'Warm reception at Cochin Airport / Aluva Railway station. Scenic drive through Cheeyappara & Valara waterfalls, aromatic spice plantations, and mist-veiled tea gardens. Check in at Munnar resort.' },
      { day: 2, title: 'Munnar Full Day Tea Hills & Wildlife Exploration', desc: 'Visit Eravikulam National Park (home to Nilgiri Tahr), Mattupetty Dam, Echo Point, Kundala Lake, and Photo Point. Evening visit to Tea Museum.' },
      { day: 3, title: 'Munnar to Thekkady (Wild Periyar) (90 km / 3 hrs)', desc: 'Journey past cardamon and pepper plantations to Thekkady. Enjoy Periyar Lake wildlife boating, spice garden plantation walk, and Kathakali show.' },
      { day: 4, title: 'Thekkady to Alleppey Backwaters Houseboat', desc: 'Board traditional Kerala AC Deluxe Houseboat at 12:00 PM. Cruise through enchanting palm-fringed backwaters and paddy fields. Authentic Kerala meals on board.' },
      { day: 5, title: 'Alleppey to Cochin Departure', desc: 'Delicious breakfast on houseboat while cruising back to jetty. Drive to Cochin, explore Fort Kochi heritage, Chinese fishing nets, and airport drop.' }
    ]
  },
  {
    id: 'wayanad-rainforest-3d',
    title: 'Wayanad Rainforest & Treehouse Nature Escape',
    category: 'kerala',
    style: 'friends',
    durationDays: 3,
    durationNights: 2,
    price: 8999,
    showPrice: false,
    rating: 4.8,
    reviewsCount: 174,
    stops: 'Calicut • Vythiri Hills • Banasura Sagar • Chembra Peak View',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80'
    ],
    video: 'https://assets.mixkit.co/videos/preview/mixkit-canoe-moving-through-a-canal-surrounded-by-nature-43301-large.mp4',
    badge: 'Rainforest Nature',
    inclusions: [
      'Luxury Plantation / Treehouse Resort Stay',
      'AC Tourist Cab from Calicut / Malappuram',
      'Campfire & Live BBQ Night',
      'All Sightseeing & Forest Entry Fees Included',
      'Daily Breakfast'
    ],
    itinerary: [
      { day: 1, title: 'Calicut to Wayanad Vythiri Hills', desc: 'Pick up from Calicut / Kondotty. Drive up through 9 hairpin Thamarassery Churam bends with scenic valley viewpoints. Visit Pookode Lake and check in to nature resort.' },
      { day: 2, title: 'Banasura Sagar Dam & Edakkal Caves', desc: 'Explore Banasura Sagar (India\'s largest earthen dam) with speedboating. Trek up to ancient Edakkal Caves with prehistoric petroglyphs. Campfire at night.' },
      { day: 3, title: 'Soochipara Waterfalls & Departure', desc: 'Witness roaring Soochipara Waterfalls amidst tea gardens. Tea factory tour with tasting. Drop back at Calicut railway station / airport.' }
    ]
  }
];

// Alias for backwards compatibility
export const TOUR_PACKAGES = DEFAULT_PACKAGES;

// 2. FLEET DATA WITH 2 IMAGES EACH
const DEFAULT_VEHICLES = [
  {
    id: 'v-101',
    number: 'KL-10-AZ-1234',
    name: 'Toyota Innova Crysta (7+1 Seater)',
    type: 'suv',
    seats: 7,
    color: 'Super White',
    rate: '₹3,400 / day',
    features: 'Dual Zone AC, Pushback Captain Seats, GPS, Mobile Charging, Roof Carrier',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'v-102',
    number: 'KL-11-BC-5678',
    name: 'Force Urbania Luxury (13 Seater)',
    type: 'tempo',
    seats: 13,
    color: 'Royal Silver',
    rate: '₹6,500 / day',
    features: 'High-Roof Luxury Cabin, Reclining Seats, Ambient Mood Light, Individual AC Vents, Air Suspension',
    images: [
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'v-103',
    number: 'KL-07-CD-9900',
    name: 'Luxury Tempo Traveller (17 / 26 Seater)',
    type: 'tempo',
    seats: 17,
    color: 'Pure White & Gold Strip',
    rate: '₹5,800 / day',
    features: '2x1 Luxury Pushback Seats, Heavy Chilled AC, LED TV, Big Luggage Boot, Uniformed Driver',
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'v-104',
    number: 'KL-10-EE-4321',
    name: 'Toyota Etios / Swift Dzire (Sedan)',
    type: 'sedan',
    seats: 4,
    color: 'Pearl White',
    rate: '₹2,200 / day',
    features: 'Spacious AC Cabin, Large Boot for Airport Luggage, Smooth Highway Ride',
    images: [
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

// 3. SEED CRM INQUIRIES & LEADS
const DEFAULT_BOOKINGS = [
  {
    id: 'FN-8901',
    customerName: 'Shabeer Ali (Doctor)',
    phone: '+91 98471 23456',
    destination: 'Turkey Cappadocia & Istanbul Grand Voyage',
    date: '2026-11-15',
    persons: 4,
    status: 'Confirmed',
    notes: 'Cave suite requested in Cappadocia, coordinator: Mr. Muhydheen.'
  },
  {
    id: 'FN-8902',
    customerName: 'Mohammed Anas',
    phone: '+91 97450 88991',
    destination: 'Golden Triangle (Delhi, Agra Taj Mahal & Jaipur)',
    date: '2026-10-28',
    persons: 6,
    status: 'Confirmed',
    notes: 'Family group, coordinated by Fuhadakka & Thanseehakka.'
  },
  {
    id: 'FN-8903',
    customerName: 'Ramees K.V.',
    phone: '+91 99612 34567',
    destination: 'Uttarakhand Scenic Escape (Dehradun & Mussoorie)',
    date: '2026-11-04',
    persons: 5,
    status: 'In-Progress',
    notes: 'Flight tickets booked from Calicut Airport. Custom quote shared.'
  },
  {
    id: 'FN-8904',
    customerName: 'Abdul Gafoor',
    phone: '+91 94470 55112',
    destination: 'Premium Executive Umrah Package',
    date: '2026-12-01',
    persons: 2,
    status: 'Confirmed',
    notes: 'Walking distance hotel in Makkah & Madinah confirmed.'
  },
  {
    id: 'FN-8905',
    customerName: 'Niyas Kondotty',
    phone: '+91 98951 12345',
    destination: 'Bali Tropical Island & Nusa Penida',
    date: '2026-10-22',
    persons: 2,
    status: 'New',
    notes: 'Honeymoon pool villa quote requested on WhatsApp.'
  }
];

// ==========================================================================
// LOCAL STORAGE MANAGEMENT
// ==========================================================================

export function getStoredPackages() {
  const data = localStorage.getItem('flynature_packages_v4');
  if (data) {
    try {
      const parsed = JSON.parse(data);
      return parsed.map(p => {
        const def = DEFAULT_PACKAGES.find(dp => dp.id === p.id);
        const images = (p.images && p.images.length > 0) ? p.images : (def ? def.images : [p.image]);
        const video = p.video || (def ? def.video : '');
        return { ...p, images, video };
      });
    } catch (e) {
      console.error('Error loading stored packages:', e);
    }
  }
  return DEFAULT_PACKAGES;
}

export function saveStoredPackages(pkgs) {
  localStorage.setItem('flynature_packages_v4', JSON.stringify(pkgs));
}

export function getStoredVehicles() {
  const data = localStorage.getItem('flynature_fleet_v2');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
  }
  return DEFAULT_VEHICLES;
}

export function saveStoredVehicles(vehicles) {
  localStorage.setItem('flynature_fleet_v2', JSON.stringify(vehicles));
}

export function getStoredBookings() {
  const data = localStorage.getItem('flynature_crm_bookings');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
  }
  return DEFAULT_BOOKINGS;
}

export function saveStoredBookings(bookings) {
  localStorage.setItem('flynature_crm_bookings', JSON.stringify(bookings));
}

// 4. SEED FINANCIAL INFLOWS & RECEIPTS
export const DEFAULT_PAYMENTS = [
  {
    id: 'TRX-8801',
    customerName: 'Shabeer Ali (Doctor)',
    destination: 'Turkey Cappadocia & Istanbul Grand Voyage',
    amount: 195000,
    mode: 'Bank Transfer (NEFT/RTGS)',
    status: 'Paid in Full',
    date: '2026-11-04',
    receiptNo: 'RCPT-2026-041'
  },
  {
    id: 'TRX-8802',
    customerName: 'Mohammed Anas',
    destination: 'Golden Triangle (Delhi, Agra Taj Mahal & Jaipur)',
    amount: 52000,
    mode: 'Google Pay (UPI)',
    status: 'Paid in Full',
    date: '2026-11-03',
    receiptNo: 'RCPT-2026-039'
  },
  {
    id: 'TRX-8803',
    customerName: 'Roshini & Arjun',
    destination: 'Kashmir Snow Valley & Dal Lake Shikara',
    amount: 45000,
    mode: 'PhonePe (UPI)',
    status: '50% Advance Received',
    date: '2026-11-02',
    receiptNo: 'RCPT-2026-037'
  },
  {
    id: 'TRX-8804',
    customerName: 'Abdul Rasheed & Family',
    destination: 'Executive Umrah 14-Day Premium Package',
    amount: 210000,
    mode: 'Cash at Kondotty Branch',
    status: 'Paid in Full',
    date: '2026-10-30',
    receiptNo: 'RCPT-2026-032'
  },
  {
    id: 'TRX-8805',
    customerName: 'Fasalu Rahman',
    destination: 'Lakshadweep Island Coral Pass (Agatti)',
    amount: 38000,
    mode: 'Google Pay (UPI)',
    status: 'Paid in Full',
    date: '2026-10-28',
    receiptNo: 'RCPT-2026-028'
  }
];

export function getStoredPayments() {
  const data = localStorage.getItem('flynature_finance_payments');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
  }
  return DEFAULT_PAYMENTS;
}

export function saveStoredPayments(payments) {
  localStorage.setItem('flynature_finance_payments', JSON.stringify(payments));
}

// 5. OFFICIAL AGENCY SETTINGS & BRANCH CREDENTIALS
export const DEFAULT_SETTINGS = {
  agencyName: 'Fly Nature Holidays',
  tagline: 'travel shoppe',
  certReg: 'KTR-MAL-2024-889 (Kerala Tourism Dept Certified)',
  gstin: '32AABCF1234F1Z8',
  kondotty: 'Kurupath, Near Calicut Airport Road, Kondotty, Malappuram, Kerala - 673638',
  koduvally: 'Main Road, Koduvally, Kozhikode, Kerala - 673572',
  hotlines: '+91 94474 22126 / +91 96336 02224',
  whatsapp: '+91 94474 22126',
  email: 'naturekdy@gmail.com',
  instagram: '@flynatureholidays',
  workingHours: 'Mon - Sat: 9:00 AM - 8:30 PM | Sun: 10:00 AM - 6:00 PM'
};

export function getStoredSettings() {
  const data = localStorage.getItem('flynature_agency_settings');
  if (data) {
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch (e) {
      console.error(e);
    }
  }
  return DEFAULT_SETTINGS;
}

export function saveStoredSettings(settings) {
  localStorage.setItem('flynature_agency_settings', JSON.stringify(settings));
}

// Format Currency
function formatINR(val) {
  if (!val) return 'Custom Quote';
  if (typeof val === 'string' && val.includes('₹')) return val;
  return '₹' + Number(val).toLocaleString('en-IN');
}

// ==========================================================================
// NAVIGATION & VIEW SWITCHING (Public vs Admin)
// ==========================================================================

window.switchView = function(viewName) {
  const publicView = document.getElementById('publicWebsiteView') || document.getElementById('publicView');
  const dashView = document.getElementById('adminDashboardView') || document.getElementById('dashboardView');

  if (viewName === 'dashboard') {
    if (publicView) publicView.style.display = 'none';
    if (dashView) {
      dashView.style.display = 'flex';
    }
    if (window.location.hash !== '#dashboard') {
      window.location.hash = 'dashboard';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderDashboard();
  } else {
    if (publicView) publicView.style.display = 'block';
    if (dashView) dashView.style.display = 'none';
    if (window.location.hash === '#dashboard') {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

window.switchDashTab = function(tabName) {
  document.querySelectorAll('.dash-nav-item, .dash-nav-btn').forEach(b => {
    if (b.getAttribute('data-tab') === tabName) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });

  document.querySelectorAll('.dash-tab-pane').forEach(p => {
    p.classList.remove('active');
  });

  const targetPane = document.getElementById(`tab-${tabName}`);
  if (targetPane) targetPane.classList.add('active');

  const titleEl = document.getElementById('dashCurrentTitle') || document.getElementById('dashViewTitle');
  if (titleEl) {
    const titles = {
      overview: 'Executive Operations Overview',
      packages: 'Tour & Holiday Packages Catalog & Pricing Manager',
      vehicles: 'Tourist Fleet & Vehicle Manager (2-Photo Gallery)',
      bookings: 'Customer Bookings & Website Inquiries CRM',
      finance: 'Financial Reports & Inflow Breakdown',
      settings: 'Branch Settings & Agency Configuration'
    };
    titleEl.textContent = titles[tabName] || 'Admin Dashboard';
  }

  const sidebar = document.getElementById('adminSidebar');
  if (sidebar) sidebar.classList.remove('open');
};

// ==========================================================================

// ==========================================================================
// DYNAMIC TOUR CATEGORIES MANAGEMENT
// ==========================================================================

export const DEFAULT_CATEGORIES = [
  { id: 'international', name: 'International (Turkey, Bali, Thai)', badge: '✈️' },
  { id: 'golden-triangle', name: 'Delhi, Agra & Jaipur (Fatehpur)', badge: '🏛️' },
  { id: 'uttarakhand', name: 'Uttarakhand & Dehradun', badge: '🌲' },
  { id: 'kashmir', name: 'Kashmir Snow Valley', badge: '🏔️' },
  { id: 'lakshadweep', name: 'Lakshadweep Islands', badge: '🏝️' },
  { id: 'pilgrimage', name: 'Executive Umrah', badge: '🕋' },
  { id: 'kerala', name: 'Kerala & South India', badge: '🌴' }
];

let currentFilterCategory = 'all';

export function getStoredCategories() {
  let categories = [...DEFAULT_CATEGORIES];
  const data = localStorage.getItem('flynature_categories_v2');
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        categories = parsed;
      }
    } catch (e) {
      console.error('Error reading stored categories:', e);
    }
  }

  // Ensure all packages have their category represented in the list
  const pkgs = getStoredPackages();
  const knownIds = new Set(categories.map(c => c.id));
  pkgs.forEach(p => {
    if (p.category && !knownIds.has(p.category)) {
      const formattedTitle = p.category
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      categories.push({ id: p.category, name: formattedTitle, badge: '📍' });
      knownIds.add(p.category);
    }
  });

  return categories;
}

export function saveStoredCategories(categories) {
  localStorage.setItem('flynature_categories_v2', JSON.stringify(categories));
  renderAllCategoryUI();
}

export function renderAllCategoryUI() {
  const categories = getStoredCategories();

  // 1. Render Public Website Filter Pills (#packageFilterPills)
  const pillsContainer = document.getElementById('packageFilterPills');
  if (pillsContainer) {
    pillsContainer.innerHTML = `
      <button class="filter-pill ${currentFilterCategory === 'all' ? 'active' : ''}" data-category="all" onclick="window.filterByCategory('all')">
        All Tours
      </button>
      ${categories.map(cat => `
        <button class="filter-pill ${currentFilterCategory === cat.id ? 'active' : ''}" data-category="${cat.id}" onclick="window.filterByCategory('${cat.id}')">
          ${cat.badge ? `${cat.badge} ` : ''}${cat.name}
        </button>
      `).join('')}
    `;
  }

  // 2. Render Search Destination Select (#searchDestination)
  const searchSelect = document.getElementById('searchDestination');
  if (searchSelect) {
    const currentVal = searchSelect.value || 'all';
    searchSelect.innerHTML = `
      <option value="all">All Destinations</option>
      ${categories.map(cat => `
        <option value="${cat.id}" ${currentVal === cat.id ? 'selected' : ''}>
          ${cat.badge ? `${cat.badge} ` : ''}${cat.name}
        </option>
      `).join('')}
    `;
  }

  // 3. Render Package Edit Modal Select Options
  window.renderEditCategorySelectOptions();

  // 4. Render Category Manager Modal List if open
  window.renderCategoryManagerList();

  // 5. Render Instant Cost Estimator Destination Select (#calcDest)
  const calcDestSelect = document.getElementById('calcDest');
  if (calcDestSelect) {
    const currentVal = calcDestSelect.value || 'kashmir';
    const rateMap = {
      'international': 7200,
      'golden-triangle': 3600,
      'uttarakhand': 3400,
      'kashmir': 3800,
      'lakshadweep': 5600,
      'umrah': 5600,
      'pilgrimage': 5600,
      'kerala': 3100
    };
    calcDestSelect.innerHTML = categories.map(cat => {
      const rate = rateMap[cat.id] || 4500;
      return `<option value="${cat.id}" data-rate="${rate}" ${currentVal === cat.id ? 'selected' : ''}>
        ${cat.badge ? `${cat.badge} ` : ''}${cat.name}
      </option>`;
    }).join('');
    window.calculateTripEstimate();
  }
}

window.renderEditCategorySelectOptions = function(selectedId) {
  const catSelect = document.getElementById('editPackageCategory');
  if (!catSelect) return;
  const categories = getStoredCategories();
  const currentVal = selectedId || catSelect.value || 'golden-triangle';

  catSelect.innerHTML = `
    ${categories.map(cat => `
      <option value="${cat.id}" ${currentVal === cat.id ? 'selected' : ''}>
        ${cat.badge ? `${cat.badge} ` : ''}${cat.name}
      </option>
    `).join('')}
    <option value="__custom__" style="color: #0284c7; font-weight: 800;">➕ + Add New Custom Category...</option>
  `;
};

window.toggleNewCategoryInput = function(forceState) {
  const wrap = document.getElementById('newCategoryInputWrap');
  if (!wrap) return;
  const isHidden = wrap.style.display === 'none';
  const show = typeof forceState === 'boolean' ? forceState : isHidden;
  wrap.style.display = show ? 'block' : 'none';
  if (show) {
    const input = document.getElementById('customCategoryInput');
    if (input) {
      input.focus();
    }
  }
};

window.handleCategorySelectChange = function(value) {
  if (value === '__custom__') {
    window.toggleNewCategoryInput(true);
  } else {
    window.toggleNewCategoryInput(false);
  }
};

window.confirmAddCustomCategory = function() {
  const input = document.getElementById('customCategoryInput');
  if (!input) return;
  const catName = input.value.trim();
  if (!catName) {
    alert('Please enter a category name (e.g. Europe, Georgia, Singapore, Wayanad).');
    return;
  }

  const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ('cat-' + Date.now());

  let badge = '📍';
  const lower = catName.toLowerCase();
  if (lower.includes('europe') || lower.includes('flight') || lower.includes('air')) badge = '✈️';
  else if (lower.includes('island') || lower.includes('beach') || lower.includes('goa') || lower.includes('atoll')) badge = '🏝️';
  else if (lower.includes('snow') || lower.includes('mountain') || lower.includes('hill') || lower.includes('himalaya') || lower.includes('shimla') || lower.includes('manali')) badge = '🏔️';
  else if (lower.includes('temple') || lower.includes('heritage') || lower.includes('fort') || lower.includes('palace')) badge = '🏛️';
  else if (lower.includes('forest') || lower.includes('jungle') || lower.includes('safari') || lower.includes('wild')) badge = '🐅';
  else if (lower.includes('umrah') || lower.includes('ziyarat') || lower.includes('makkah')) badge = '🕋';
  else if (lower.includes('cruise') || lower.includes('boat')) badge = '🚢';
  else if (lower.includes('kerala') || lower.includes('backwater') || lower.includes('south')) badge = '🌴';

  const categories = getStoredCategories();
  const existing = categories.find(c => c.id === slug);
  if (!existing) {
    categories.push({ id: slug, name: catName, badge });
    saveStoredCategories(categories);
  }

  window.renderEditCategorySelectOptions(slug);
  const catSelect = document.getElementById('editPackageCategory');
  if (catSelect) catSelect.value = slug;

  input.value = '';
  window.toggleNewCategoryInput(false);
};

window.openCategoryManagerModal = function() {
  const modal = document.getElementById('categoryManagerModalBackdrop');
  if (!modal) return;
  window.renderCategoryManagerList();
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
};

window.closeCategoryManagerModal = function() {
  const modal = document.getElementById('categoryManagerModalBackdrop');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
};

window.renderCategoryManagerList = function() {
  const listEl = document.getElementById('categoryManagerList');
  if (!listEl) return;
  const categories = getStoredCategories();
  const packages = getStoredPackages();

  listEl.innerHTML = categories.map(cat => {
    const pkgCount = packages.filter(p => p.category === cat.id).length;
    const isSystem = DEFAULT_CATEGORIES.some(dc => dc.id === cat.id);
    return `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: white; border: 1px solid #e2e8f0; border-radius: 10px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.3rem;">${cat.badge || '📍'}</span>
          <div>
            <strong style="font-size: 0.9rem; color: #0f172a;">${cat.name}</strong>
            <span style="display: block; font-size: 0.75rem; color: #64748b;">ID: <code>${cat.id}</code> • ${pkgCount} ${pkgCount === 1 ? 'Tour Package' : 'Tour Packages'}</span>
          </div>
        </div>
        <div>
          ${isSystem ? `
            <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; background: #f1f5f9; padding: 4px 8px; border-radius: 6px;">Default</span>
          ` : `
            <button type="button" onclick="window.deleteCustomCategory('${cat.id}')" style="font-size: 0.78rem; font-weight: 700; color: #ef4444; background: #fef2f2; border: 1px solid #fecaca; padding: 4px 10px; border-radius: 6px; cursor: pointer;">
              Delete
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');
};

window.handleCreateCategoryFromModal = function(event) {
  event.preventDefault();
  const nameInput = document.getElementById('newCatNameInput');
  const iconInput = document.getElementById('newCatIconInput');
  if (!nameInput) return;

  const name = nameInput.value.trim();
  if (!name) return;
  const icon = (iconInput?.value || '📍').trim();
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ('cat-' + Date.now());

  const categories = getStoredCategories();
  if (categories.some(c => c.id === slug)) {
    alert('A category with this name already exists!');
    return;
  }

  categories.push({ id: slug, name, badge: icon });
  saveStoredCategories(categories);
  nameInput.value = '';
  window.renderCategoryManagerList();
};

window.deleteCustomCategory = function(catId) {
  const packages = getStoredPackages();
  const inUse = packages.filter(p => p.category === catId);
  if (inUse.length > 0) {
    if (!confirm(`Warning: ${inUse.length} tour package(s) currently use this category. If deleted, they will be reassigned to 'international'. Continue?`)) {
      return;
    }
    const updatedPkgs = packages.map(p => p.category === catId ? { ...p, category: 'international' } : p);
    saveStoredPackages(updatedPkgs);
    renderPackages(updatedPkgs);
    renderDashboard();
  }

  let categories = getStoredCategories();
  categories = categories.filter(c => c.id !== catId);
  saveStoredCategories(categories);
  window.renderCategoryManagerList();
};

// PUBLIC WEBSITE RENDERERS
// ==========================================================================

export function renderPackages(packagesToRender) {
  const container = document.getElementById('packagesContainer');
  if (!container) return;

  if (packagesToRender.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: white; border-radius: 20px; border: 1px dashed #cbd5e1;">
        <h3 style="color: #0f172a; margin-bottom: 8px;">No packages matching this filter</h3>
        <p style="color: #64748b; margin-bottom: 16px;">We can still customize this exact itinerary for you!</p>
        <button class="btn btn-primary" onclick="window.filterByCategory('all')">View All Packages</button>
      </div>
    `;
    return;
  }

  container.innerHTML = packagesToRender.map(pkg => {
    const hasPrice = pkg.showPrice && pkg.price && Number(pkg.price) > 0;
    const priceDisplay = hasPrice
      ? `<span class="price-sub">Starting from</span><span class="price-val">${formatINR(pkg.price)} <small style="font-size: 0.72rem; color: #64748b; font-weight: normal;">/ person</small></span>`
      : `<span class="price-sub">Custom Tariff</span><span class="price-val quote-mode">Quote on Request</span>`;
    
    const waText = hasPrice
      ? `Hi Fly Nature Holidays, I want to book/enquire about the package "${pkg.title}" (${pkg.durationDays}D/${pkg.durationNights}N at ${formatINR(pkg.price)}/person). Please share details.`
      : `Hi Fly Nature Holidays, I am interested in the tour "${pkg.title}" (${pkg.durationDays}D/${pkg.durationNights}N). Please share itinerary, best custom quote, and flight availability.`;

    const actionLabel = hasPrice ? 'Book Now' : 'Get Quote';

    return `
      <div class="package-card" id="pkg-${pkg.id}">
        <div class="card-img-wrap">
          <img src="${pkg.image}" alt="${pkg.title}" loading="lazy">
          <div class="card-duration-badge">${pkg.durationDays}D / ${pkg.durationNights}N</div>
          <div class="card-rating-badge">
            <span class="star">★</span> ${pkg.rating} <span style="color:#94a3b8; font-size: 0.7rem;">(${pkg.reviewsCount})</span>
          </div>
          <div class="card-media-pills">
            <span class="card-pill-item" onclick="event.stopPropagation(); window.openPackageModal('${pkg.id}', 'photos');" title="View ${(pkg.images || [pkg.image]).length} Photos">
              📷 ${(pkg.images || [pkg.image]).length} Photos
            </span>
            ${pkg.video ? `
              <span class="card-pill-item card-pill-reel" onclick="event.stopPropagation(); window.openPackageModal('${pkg.id}', 'video');" title="Watch 5s Reel">
                🎬 5s Reel
              </span>
            ` : ''}
          </div>
        </div>
        <div class="card-body">
          <div class="card-category">${pkg.badge || 'Featured Tour'}</div>
          <h3 class="card-title">${pkg.title}</h3>
          <div class="card-stops">
            <svg style="width:14px; height:14px; color:#0284c7; flex-shrink:0;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${pkg.stops}</span>
          </div>
          <div class="card-inclusions">
            ${(pkg.inclusions || []).slice(0, 3).map(inc => `<span class="inc-tag">✓ ${inc}</span>`).join('')}
          </div>
          <div class="card-footer">
            <div class="price-box">
              ${priceDisplay}
            </div>
            <div class="card-actions">
              <button class="btn-detail" onclick="window.openPackageModal('${pkg.id}')">Itinerary</button>
              <a href="https://wa.me/919447422126?text=${encodeURIComponent(waText)}" target="_blank" rel="noopener" class="btn-card-wa" aria-label="${actionLabel} on WhatsApp">
                <span>${actionLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render Public Vehicle Fleet Cards
export function renderPublicVehicles(vehiclesList) {
  const container = document.getElementById('vehiclesContainer');
  if (!container) return;

  container.innerHTML = vehiclesList.map(v => {
    const mainImg = (v.images && v.images.length > 0) ? v.images[0] : 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';
    return `
      <div class="vehicle-card" id="v-${v.id}">
        <div class="v-img-wrap">
          <img src="${mainImg}" alt="${v.name}" loading="lazy">
          <div class="v-seats-tag">${v.seats} Seater</div>
        </div>
        <div class="v-card-body">
          <h3 class="v-title">${v.name}</h3>
          <p class="v-subtitle">Reg: ${v.number} • ${v.color || 'White'}</p>
          <div class="v-features-list" style="margin-bottom:16px;">
            <p style="font-size:0.82rem; color:#475569;">${v.features}</p>
          </div>
          <div class="v-card-footer">
            <div class="v-rate">${v.rate || '₹3,500 / day'}</div>
            <a href="https://wa.me/919447422126?text=${encodeURIComponent(`Hi Fly Nature Holidays, I want to rent/book the vehicle: "${v.name}" (${v.number}, ${v.seats} seats). Please confirm availability.`)}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="padding: 8px 16px; font-size: 0.8rem;">
              <span>Rent Vehicle</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Filter Categories
window.filterByCategory = function(category) {
  currentFilterCategory = category;
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(p => {
    if (p.getAttribute('data-category') === category) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  const allPkgs = getStoredPackages();
  if (category === 'all') {
    renderPackages(allPkgs);
  } else {
    renderPackages(allPkgs.filter(p => p.category === category));
  }

  const section = document.getElementById('packages');
  if (section && window.scrollY > 400 && category !== 'all') {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

// Filter Vehicles
window.filterVehicles = function(vtype) {
  const tabs = document.querySelectorAll('.v-tab');
  tabs.forEach(t => {
    if (t.getAttribute('data-vtype') === vtype) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  const allV = getStoredVehicles();
  if (vtype === 'all') {
    renderPublicVehicles(allV);
  } else {
    renderPublicVehicles(allV.filter(v => v.type === vtype));
  }
};

// Search Filter
window.handleSearchSubmit = function() {
  const dest = document.getElementById('searchDestination').value;
  const style = document.getElementById('searchStyle').value;
  const duration = document.getElementById('searchDuration').value;

  let results = [...getStoredPackages()];

  if (dest !== 'all') {
    results = results.filter(p => p.category === dest);
  }

  if (style !== 'all') {
    results = results.filter(p => p.style === style);
  }

  if (duration !== 'all') {
    if (duration === 'short') results = results.filter(p => p.durationDays <= 3);
    else if (duration === 'medium') results = results.filter(p => p.durationDays >= 4 && p.durationDays <= 5);
    else if (duration === 'long') results = results.filter(p => p.durationDays >= 6);
  }

  renderPackages(results);

  const packagesSection = document.getElementById('packages');
  if (packagesSection) {
    packagesSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// State for Package Modal Gallery & Video Reel
let currentModalPkg = null;
let currentModalMediaMode = 'photos'; // 'photos' | 'video'
let currentModalImgIdx = 0;
let currentModalVideoMuted = true;

window.openPackageModal = function(pkgId, initialMode = 'photos') {
  const pkgs = getStoredPackages();
  const pkg = pkgs.find(p => p.id === pkgId);
  if (!pkg) return;

  currentModalPkg = pkg;
  currentModalMediaMode = (initialMode === 'video' && pkg.video) ? 'video' : 'photos';
  currentModalImgIdx = 0;
  currentModalVideoMuted = true;

  window.renderPackageModalContent();

  const modal = document.getElementById('packageModalBackdrop');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
};

window.renderPackageModalContent = function() {
  const pkg = currentModalPkg;
  if (!pkg) return;
  const body = document.getElementById('packageModalBody');
  if (!body) return;

  const images = (pkg.images && pkg.images.length > 0) ? pkg.images : [pkg.image];
  const hasVideo = Boolean(pkg.video);
  const activeImgUrl = images[currentModalImgIdx] || images[0];

  const hasPrice = pkg.showPrice && pkg.price && Number(pkg.price) > 0;
  const priceDisplay = hasPrice
    ? `<div style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: #38bdf8;">${formatINR(pkg.price)} <small style="font-size: 0.8rem; color: #e2e8f0; font-weight: normal;">/ person</small></div>`
    : `<div style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: #38bdf8;">Custom Quote on Request</div>
       <div style="font-size: 0.8rem; color: #94a3b8;">Seasonal airfare & hotel tariff tailored to your exact dates</div>`;

  const waPrompt = hasPrice
    ? `Hi Fly Nature Holidays, I want to book the package "${pkg.title}" (${pkg.durationDays}D/${pkg.durationNights}N at ${formatINR(pkg.price)}/person). Please confirm availability and send booking procedure.`
    : `Hi Fly Nature Holidays, I want to request a custom quote for the package "${pkg.title}" (${pkg.durationDays}D/${pkg.durationNights}N). Please send detailed itinerary and best quotation.`;

  const mediaShowcaseHtml = `
    <div class="modal-media-showcase">
      <div class="media-mode-tabs">
        <button type="button" class="media-tab-btn ${currentModalMediaMode === 'photos' ? 'active' : ''}" onclick="window.switchModalMediaTab('photos')">
          <span>📷 Photo Gallery (${images.length} Photos)</span>
        </button>
        ${hasVideo ? `
          <button type="button" class="media-tab-btn ${currentModalMediaMode === 'video' ? 'active' : ''}" onclick="window.switchModalMediaTab('video')">
            <span>🎬 5s Travel Reel (Shorts)</span>
          </button>
        ` : ''}
      </div>

      <div class="modal-stage-wrapper">
        ${currentModalMediaMode === 'photos' ? `
          <img id="modalActiveImg" class="modal-media-img" src="${activeImgUrl}" alt="${pkg.title}">
          ${images.length > 1 ? `
            <button type="button" class="modal-nav-arrow modal-nav-prev" onclick="window.shiftPackageImg(-1)" aria-label="Previous Photo">&#10094;</button>
            <button type="button" class="modal-nav-arrow modal-nav-next" onclick="window.shiftPackageImg(1)" aria-label="Next Photo">&#10095;</button>
            <div class="modal-video-badge" style="top:auto; bottom:14px; left:14px;">
              <span>Photo ${currentModalImgIdx + 1} of ${images.length}</span>
            </div>
          ` : ''}
        ` : `
          <video id="modalActiveVideo" class="modal-media-video" src="${pkg.video}" autoplay loop ${currentModalVideoMuted ? 'muted' : ''} playsinline></video>
          <div class="modal-video-badge">
            <span>⚡ 5-Sec Experience Reel Preview</span>
          </div>
          <button type="button" class="modal-video-sound-btn" onclick="window.toggleVideoSound()">
            <span>${currentModalVideoMuted ? '🔇 Sound Off' : '🔊 Sound On'}</span>
          </button>
        `}
      </div>

      <div class="modal-thumb-strip">
        ${images.map((img, idx) => `
          <div class="modal-thumb-card ${currentModalMediaMode === 'photos' && currentModalImgIdx === idx ? 'active' : ''}" onclick="window.selectPackageImg(${idx})" title="View photo ${idx + 1}">
            <img src="${img}" alt="Thumb ${idx + 1}" loading="lazy">
          </div>
        `).join('')}
        ${hasVideo ? `
          <div class="modal-thumb-card modal-thumb-video ${currentModalMediaMode === 'video' ? 'active' : ''}" onclick="window.switchModalMediaTab('video')" title="Watch 5-second video preview">
            <span style="font-size: 1.15rem;">🎬</span>
            <span>5s Reel</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  body.innerHTML = `
    <div style="padding: 28px 28px 0;">
      <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px; flex-wrap: wrap;">
        <span class="badge-pill" style="background:#f0f9ff; color:#0284c7; border: 1px solid #bae6fd;">${pkg.durationDays} Days / ${pkg.durationNights} Nights</span>
        <span style="font-size: 0.82rem; font-weight: 700; color: #d97706;">★ ${pkg.rating} (${pkg.reviewsCount} verified reviews)</span>
        <span class="badge-pill" style="background:#f0fdf4; color:#16a34a; border: 1px solid #bbf7d0;">${pkg.badge || 'Featured'}</span>
      </div>
      <h2 style="font-family: var(--font-heading); font-size: 1.75rem; font-weight: 900; color: #0f172a; margin-bottom: 6px;">${pkg.title}</h2>
      <p style="font-size: 0.92rem; color: #64748b; margin-bottom: 20px;"><strong>Route:</strong> ${pkg.stops}</p>
      
      ${mediaShowcaseHtml}

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #f8fafc; padding: 20px; border-radius: 16px; margin-bottom: 28px; border: 1px solid #e2e8f0;">
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 800; text-transform: uppercase; color: #0284c7; margin-bottom: 10px;">Package Inclusions</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 0.82rem; color: #1e293b;">
            ${(pkg.inclusions || []).map(inc => `<li><span style="color:#16a34a; font-weight:bold;">✓</span> ${inc}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 style="font-size: 0.88rem; font-weight: 800; text-transform: uppercase; color: #ef4444; margin-bottom: 10px;">Package Exclusions</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 0.82rem; color: #777777;">
            <li><span style="color:#ef4444; font-weight:bold;">✗</span> Personal shopping & laundry</li>
            <li><span style="color:#ef4444; font-weight:bold;">✗</span> Special optional activities & personal tips</li>
          </ul>
        </div>
      </div>

      <h3 style="font-family: var(--font-heading); font-size: 1.3rem; font-weight: 800; color: #171717; margin-bottom: 16px;">Day-by-Day Detailed Itinerary</h3>
      <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 32px;">
        ${(pkg.itinerary || []).map(item => `
          <div style="display: flex; gap: 16px; align-items: flex-start; padding: 14px; background: #fafaf8; border-radius: 12px; border: 1px solid #eaeaea;">
            <div style="background:#171717; color:white; font-weight:800; font-size:0.78rem; padding:6px 10px; border-radius:8px; flex-shrink:0;">
              DAY ${item.day}
            </div>
            <div>
              <strong style="display: block; font-size: 0.95rem; color: #171717; margin-bottom: 4px;">${item.title}</strong>
              <p style="font-size: 0.85rem; color: #777777; line-height: 1.5;">${item.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="background: #171717; padding: 24px; border-radius: 16px; color: white; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 32px; border: 1px solid #333333;">
        <div>
          <span style="font-size: 0.75rem; color: #a3a3a3; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Tariff & Quotation</span>
          ${priceDisplay}
        </div>
        <div>
          <a href="https://wa.me/919447422126?text=${encodeURIComponent(waPrompt)}" target="_blank" rel="noopener" class="btn btn-whatsapp-large" style="padding: 12px 24px; font-size: 0.95rem;">
            <span>${hasPrice ? 'Book on WhatsApp' : 'Get Quote on WhatsApp'}</span>
          </a>
        </div>
      </div>
    </div>
  `;
};

window.switchModalMediaTab = function(mode) {
  currentModalMediaMode = mode;
  window.renderPackageModalContent();
};

window.selectPackageImg = function(idx) {
  currentModalMediaMode = 'photos';
  currentModalImgIdx = idx;
  window.renderPackageModalContent();
};

window.shiftPackageImg = function(direction) {
  if (!currentModalPkg) return;
  const imgs = (currentModalPkg.images && currentModalPkg.images.length > 0) ? currentModalPkg.images : [currentModalPkg.image];
  currentModalImgIdx = (currentModalImgIdx + direction + imgs.length) % imgs.length;
  window.renderPackageModalContent();
};

window.toggleVideoSound = function() {
  const vid = document.getElementById('modalActiveVideo');
  if (vid) {
    vid.muted = !vid.muted;
    currentModalVideoMuted = vid.muted;
    const btn = document.querySelector('.modal-video-sound-btn span');
    if (btn) btn.textContent = currentModalVideoMuted ? '🔇 Sound Off' : '🔊 Sound On';
  }
};

window.closePackageModal = function() {
  const modal = document.getElementById('packageModalBackdrop');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  const vid = document.getElementById('modalActiveVideo');
  if (vid) {
    try { vid.pause(); } catch(e){}
  }
};

// ==========================================================================
// ADMIN PACKAGE CRUD & PRICING CONTROLLER
// ==========================================================================

window.openAddPackageModal = function() {
  document.getElementById('editModalHeading').textContent = 'Add New Tour Package & Media';
  document.getElementById('editPackageId').value = '';
  document.getElementById('editPackageTitle').value = '';
  window.renderEditCategorySelectOptions('golden-triangle');
  window.toggleNewCategoryInput(false);
  document.getElementById('editPackageCategory').value = 'golden-triangle';
  document.getElementById('editPackageDuration').value = '5 Days / 4 Nights';
  document.getElementById('editPackageImage').value = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80';
  document.getElementById('editPackageImage2').value = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80';
  document.getElementById('editPackageImage3').value = 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80';
  document.getElementById('editPackageVideo').value = 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-historic-monument-in-india-42457-large.mp4';
  document.getElementById('editPackageTag').value = 'New Departure';
  document.getElementById('editPackagePrice').value = '';
  document.getElementById('editPackageShowPrice').value = 'false';
  document.getElementById('editPackageDesc').value = '';
  document.getElementById('editPackageHighlights').value = '4★ Hotel Stay, AC Vehicle, Guided Sightseeing, Daily Breakfast';
  document.getElementById('editPackageItinerary').value = 'Day 1: Arrival & Welcome | Warm reception by Fly Nature Holidays coordinator, transfer to hotel and leisure.\nDay 2: Sightseeing & Guided Tour | Guided destination highlights, photography stops, and cultural exploration.\nDay 3: Departure & Transfers | Souvenir shopping, checkout, and airport/railway drop.';
  
  const backdrop = document.getElementById('packageEditModalBackdrop');
  if (backdrop) backdrop.style.display = 'flex';
};

window.openEditPackageModal = function(pkgId) {
  const pkgs = getStoredPackages();
  const pkg = pkgs.find(p => p.id === pkgId);
  if (!pkg) return;

  const images = (pkg.images && pkg.images.length > 0) ? pkg.images : [pkg.image];

  document.getElementById('editModalHeading').textContent = `Edit Package: ${pkg.title}`;
  document.getElementById('editPackageId').value = pkg.id;
  document.getElementById('editPackageTitle').value = pkg.title;
  window.renderEditCategorySelectOptions(pkg.category);
  window.toggleNewCategoryInput(false);
  document.getElementById('editPackageCategory').value = pkg.category;
  document.getElementById('editPackageDuration').value = `${pkg.durationDays} Days / ${pkg.durationNights} Nights`;
  document.getElementById('editPackageImage').value = images[0] || pkg.image || '';
  document.getElementById('editPackageImage2').value = images[1] || '';
  document.getElementById('editPackageImage3').value = images[2] || '';
  document.getElementById('editPackageVideo').value = pkg.video || '';
  document.getElementById('editPackageTag').value = pkg.badge || '';
  document.getElementById('editPackagePrice').value = pkg.price ? `₹${pkg.price.toLocaleString('en-IN')}` : '';
  document.getElementById('editPackageShowPrice').value = pkg.showPrice ? 'true' : 'false';
  document.getElementById('editPackageDesc').value = pkg.stops || '';
  document.getElementById('editPackageHighlights').value = (pkg.inclusions || []).join(', ');

  // Format Itinerary
  const itinLines = (pkg.itinerary || []).map(i => `Day ${i.day}: ${i.title} | ${i.desc}`).join('\n');
  document.getElementById('editPackageItinerary').value = itinLines;

  const backdrop = document.getElementById('packageEditModalBackdrop');
  if (backdrop) backdrop.style.display = 'flex';
};

window.closePackageEditModal = function() {
  const backdrop = document.getElementById('packageEditModalBackdrop');
  if (backdrop) backdrop.style.display = 'none';
};

window.handleSavePackage = function(event) {
  event.preventDefault();
  const pkgId = document.getElementById('editPackageId').value;
  const title = document.getElementById('editPackageTitle').value.trim();
  let category = document.getElementById('editPackageCategory').value;
  const customCatInput = document.getElementById('customCategoryInput')?.value?.trim();
  if (category === '__custom__' && customCatInput) {
    const slug = customCatInput.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ('cat-' + Date.now());
    const cats = getStoredCategories();
    if (!cats.some(c => c.id === slug)) {
      cats.push({ id: slug, name: customCatInput, badge: '📍' });
      saveStoredCategories(cats);
    }
    category = slug;
  }
  const durationStr = document.getElementById('editPackageDuration').value.trim();
  const img1 = document.getElementById('editPackageImage').value.trim();
  const img2 = document.getElementById('editPackageImage2').value.trim();
  const img3 = document.getElementById('editPackageImage3').value.trim();
  const video = document.getElementById('editPackageVideo').value.trim();
  const badge = document.getElementById('editPackageTag').value.trim();
  const rawPrice = document.getElementById('editPackagePrice').value.trim();
  const showPrice = document.getElementById('editPackageShowPrice').value === 'true';
  const desc = document.getElementById('editPackageDesc').value.trim();
  const rawHighlights = document.getElementById('editPackageHighlights').value.trim();
  const rawItinerary = document.getElementById('editPackageItinerary').value.trim();

  const inclusions = rawHighlights ? rawHighlights.split(',').map(s => s.trim()).filter(Boolean) : ['Custom Hotel Stay', 'Private Transfers'];

  // Parse images array
  const images = [img1, img2, img3].filter(Boolean);
  if (images.length === 0 && img1) images.push(img1);

  // Parse days & nights
  let days = 5, nights = 4;
  const match = durationStr.match(/(\d+)\s*D(?:ays?)?\s*\/?\s*(\d+)?\s*N?/i);
  if (match) {
    days = parseInt(match[1], 10);
    nights = match[2] ? parseInt(match[2], 10) : Math.max(1, days - 1);
  }

  // Parse price number
  const numericPrice = rawPrice ? parseInt(rawPrice.replace(/[^0-9]/g, ''), 10) : 0;

  // Parse custom itinerary
  let itinerary = [];
  if (rawItinerary) {
    const lines = rawItinerary.split('\n').map(l => l.trim()).filter(Boolean);
    itinerary = lines.map((line, idx) => {
      let dayNum = idx + 1;
      let dayTitle = `Day ${dayNum} Highlights`;
      let dayDesc = line;

      const dayMatch = line.match(/^Day\s*(\d+)\s*:\s*([^|\-]+)(?:[|\-](.+))?$/i);
      if (dayMatch) {
        dayNum = parseInt(dayMatch[1], 10);
        dayTitle = dayMatch[2].trim();
        dayDesc = (dayMatch[3] || dayTitle).trim();
      } else {
        const pipeSplit = line.split('|');
        if (pipeSplit.length > 1) {
          dayTitle = pipeSplit[0].trim();
          dayDesc = pipeSplit.slice(1).join('|').trim();
        }
      }
      return { day: dayNum, title: dayTitle, desc: dayDesc };
    });
  }

  if (itinerary.length === 0) {
    itinerary = [
      { day: 1, title: 'Arrival & Welcome Reception', desc: 'Warm reception by Fly Nature Holidays coordinator, transfer to hotel and leisure.' },
      { day: 2, title: 'Sightseeing & Guided Tour', desc: 'Guided destination highlights, photography stops, and cultural exploration.' },
      { day: 3, title: 'Departure & Transfers', desc: 'Souvenir shopping, checkout, and airport/railway drop.' }
    ];
  }

  let pkgs = getStoredPackages();
  if (pkgId) {
    const idx = pkgs.findIndex(p => p.id === pkgId);
    if (idx !== -1) {
      pkgs[idx] = {
        ...pkgs[idx],
        title,
        category,
        durationDays: days,
        durationNights: nights,
        image: images[0] || img1,
        images,
        video,
        badge,
        price: numericPrice,
        showPrice,
        stops: desc,
        inclusions,
        itinerary
      };
    }
  } else {
    const newPkg = {
      id: 'pkg-' + Date.now(),
      title,
      category,
      style: 'family',
      durationDays: days,
      durationNights: nights,
      price: numericPrice,
      showPrice,
      rating: 4.9,
      reviewsCount: 1,
      stops: desc,
      image: images[0] || img1,
      images,
      video,
      badge: badge || 'New Departure',
      inclusions,
      itinerary
    };
    pkgs.unshift(newPkg);
  }

  saveStoredPackages(pkgs);
  const savedItem = pkgId ? pkgs.find(p => p.id === pkgId) : pkgs[0];
  if (savedItem) syncPackageToCloud(savedItem);
  window.closePackageEditModal();
  renderPackages(pkgs);
  renderDashboard();
  alert(pkgId ? 'Tour package, images, video reel & itinerary updated successfully!' : 'New tour package added to catalog!');
};

window.deletePackage = function(pkgId) {
  if (!confirm('Are you sure you want to delete this tour package from the catalog?')) return;
  let pkgs = getStoredPackages();
  pkgs = pkgs.filter(p => p.id !== pkgId);
  saveStoredPackages(pkgs);
  deleteCloudPackage(pkgId);
  renderPackages(pkgs);
  renderDashboard();
};

// ==========================================================================
// INTERACTIVE TRIP ESTIMATOR & COST CALCULATOR
// ==========================================================================

window.calculateTripEstimate = function() {
  const destSelect = document.getElementById('calcDest');
  const dest = destSelect?.value || 'kashmir';
  const travelersInput = document.getElementById('calcAdults') || document.getElementById('calcTravelers');
  const travelers = Math.max(1, parseInt(travelersInput?.value, 10) || 2);
  const daysSelect = document.getElementById('calcDays');
  const days = parseInt(daysSelect?.value, 10) || 5;

  // Selected radio tier
  let tierVal = 1.3;
  let tierLabel = '4★ Deluxe & Resort';
  const tierRadios = document.querySelectorAll('input[name="stayTier"]');
  tierRadios.forEach(r => {
    if (r.checked) {
      tierVal = parseFloat(r.value) || 1.3;
      const parentLabel = r.closest('.tier-label') || r.closest('label');
      if (parentLabel) tierLabel = parentLabel.innerText.trim();
    }
  });

  // Base daily rates per person
  const baseRates = {
    'international': 7200,
    'golden-triangle': 3600,
    'uttarakhand': 3400,
    'kashmir': 3800,
    'lakshadweep': 5600,
    'umrah': 5600,
    'pilgrimage': 5600,
    'kerala': 3100
  };

  const selectedOpt = destSelect?.options[destSelect.selectedIndex];
  const rateFromAttr = selectedOpt ? parseInt(selectedOpt.getAttribute('data-rate'), 10) : 0;
  const baseDaily = rateFromAttr || baseRates[dest] || 3500;

  // Calculate realistic cost:
  // (Base per person per day * tier multiplier * travelers * days) with slight multi-person / duration curve
  const groupDiscount = travelers >= 6 ? 0.88 : (travelers >= 4 ? 0.92 : (travelers >= 2 ? 0.96 : 1.0));
  const durationDiscount = days >= 10 ? 0.88 : (days >= 6 ? 0.92 : 1.0);
  const total = Math.round(baseDaily * tierVal * travelers * days * groupDiscount * durationDiscount);

  // Update Output Amount
  const outputEl = document.getElementById('estimateOutput') || document.getElementById('calcEstimatedTotal');
  if (outputEl) {
    outputEl.textContent = formatINR(total);
    // Subtle pulse animation
    outputEl.style.transition = 'transform 0.18s ease, color 0.18s ease';
    outputEl.style.transform = 'scale(1.06)';
    setTimeout(() => {
      if (outputEl) outputEl.style.transform = 'scale(1)';
    }, 180);
  }

  // Update Descriptive Subtitle
  const subEl = document.querySelector('.estimate-result-box .result-sub');
  if (subEl && selectedOpt) {
    const rawDestName = selectedOpt.text.split('(')[0].trim();
    subEl.textContent = `Includes ${tierLabel} stay, transfers, daily breakfast & guided sightseeing for ${travelers} ${travelers === 1 ? 'traveler' : 'travelers'} (${days} Days in ${rawDestName}).`;
  }
};

window.sendEstimateToWhatsApp = function() {
  const destSelect = document.getElementById('calcDest');
  const destName = destSelect ? destSelect.options[destSelect.selectedIndex].text : 'Selected Destination';
  const travelersInput = document.getElementById('calcAdults') || document.getElementById('calcTravelers');
  const travelers = travelersInput?.value || '2';
  const daysSelect = document.getElementById('calcDays');
  const daysText = daysSelect ? daysSelect.options[daysSelect.selectedIndex].text : '5 Days';

  let tierLabel = '4★ Deluxe & Resort';
  const tierRadios = document.querySelectorAll('input[name="stayTier"]');
  tierRadios.forEach(r => {
    if (r.checked) {
      const parentLabel = r.closest('.tier-label') || r.closest('label');
      if (parentLabel) tierLabel = parentLabel.innerText.trim();
    }
  });

  const total = (document.getElementById('estimateOutput') || document.getElementById('calcEstimatedTotal'))?.textContent || '₹36,400';

  const msg = `*Trip Estimate Quotation - Fly Nature Holidays*
• Destination: ${destName}
• Travelers: ${travelers} Adult(s)
• Duration: ${daysText}
• Accommodation: ${tierLabel}
• Estimated Package Budget: ${total}

Hi Fly Nature Holidays, I calculated this quotation on your website. Please check seasonal availability and send me the detailed day-by-day itinerary and booking details.`;

  window.open(`https://wa.me/919447422126?text=${encodeURIComponent(msg)}`, '_blank');
};

window.sendCalculatorQuote = window.sendEstimateToWhatsApp;

// ==========================================================================
// FILE UPLOAD HANDLERS (Image & Video from Computer)
// ==========================================================================

window.handleImageUpload = function(targetInputId, fileInput) {
  const file = fileInput.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    alert('Please select a valid image file (JPG, PNG, WEBP, etc.)');
    fileInput.value = '';
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    alert('Image file is too large. Please use an image under 10MB.');
    fileInput.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    // Set the URL input value
    const urlInput = document.getElementById(targetInputId);
    if (urlInput) urlInput.value = dataUrl;
    // Show preview
    const wrapId = 'preview' + capitalizeFirst(targetInputId.replace('editPackageI','i').replace('editPackageV','v')) + 'Wrap';
    const previewImgId = 'preview' + capitalizeFirst(targetInputId.replace('editPackageI','i').replace('editPackageV','v'));
    const wrap = document.getElementById(wrapId) || findPreviewWrapFor(targetInputId);
    const img = document.getElementById(previewImgId) || (wrap ? wrap.querySelector('img') : null);
    if (wrap) wrap.style.display = 'flex';
    if (img) img.src = dataUrl;
  };
  reader.readAsDataURL(file);
};

window.handleVideoUpload = function(targetInputId, fileInput) {
  const file = fileInput.files[0];
  if (!file) return;
  if (!file.type.startsWith('video/')) {
    alert('Please select a valid video file (MP4, WEBM, etc.)');
    fileInput.value = '';
    return;
  }
  if (file.size > 50 * 1024 * 1024) {
    alert('Video file is too large. Please use a video under 50MB for best performance.');
    fileInput.value = '';
    return;
  }
  const objectUrl = URL.createObjectURL(file);
  const urlInput = document.getElementById(targetInputId);
  if (urlInput) urlInput.value = objectUrl;
  // Show video preview
  const wrap = document.getElementById('previewVideo1Wrap');
  const vid = document.getElementById('previewVideo1');
  if (wrap) wrap.style.display = 'flex';
  if (vid) { vid.src = objectUrl; vid.load(); vid.play().catch(() => {}); }
};

window.clearUploadPreview = function(targetInputId, wrapId, fileInputId) {
  const urlInput = document.getElementById(targetInputId);
  if (urlInput) urlInput.value = '';
  const wrap = document.getElementById(wrapId);
  if (wrap) {
    wrap.style.display = 'none';
    const img = wrap.querySelector('img');
    const vid = wrap.querySelector('video');
    if (img) img.src = '';
    if (vid) { vid.src = ''; vid.pause(); }
  }
  const fileInput = document.getElementById(fileInputId);
  if (fileInput) fileInput.value = '';
};

function capitalizeFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}

function findPreviewWrapFor(inputId) {
  const map = {
    'editPackageImage':  'previewImage1Wrap',
    'editPackageImage2': 'previewImage2Wrap',
    'editPackageImage3': 'previewImage3Wrap',
    'editPackageVideo':  'previewVideo1Wrap'
  };
  return map[inputId] ? document.getElementById(map[inputId]) : null;
}

// Reset upload previews when edit modal opens/closes
function resetUploadPreviews() {
  ['previewImage1Wrap','previewImage2Wrap','previewImage3Wrap','previewVideo1Wrap'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  ['previewImage1','previewImage2','previewImage3'].forEach(id => {
    const img = document.getElementById(id);
    if (img) img.src = '';
  });
  const vid = document.getElementById('previewVideo1');
  if (vid) { vid.src = ''; }
  ['uploadImage1','uploadImage2','uploadImage3','uploadVideo1'].forEach(id => {
    const fi = document.getElementById(id);
    if (fi) fi.value = '';
  });
}

// Hook into existing closePackageEditModal
const _origClose = window.closePackageEditModal;
window.closePackageEditModal = function() {
  resetUploadPreviews();
  if (_origClose) _origClose();
};

// ==========================================================================
// CONTACT & INQUIRY FORM
// ==========================================================================


window.handleInquirySubmit = function(event) {
  event.preventDefault();
  const name = document.getElementById('inqName').value.trim();
  const phone = document.getElementById('inqPhone').value.trim();
  const email = document.getElementById('inqEmail').value.trim();
  const dest = document.getElementById('inqDest').value;
  const date = document.getElementById('inqDate').value;
  const travelers = document.getElementById('inqTravelers').value;
  const notes = document.getElementById('inqNotes').value.trim();

  const newBooking = {
    id: 'FN-' + Math.floor(1000 + Math.random() * 9000),
    customerName: name,
    phone,
    destination: dest,
    date: date || 'Flexible',
    persons: parseInt(travelers, 10) || 2,
    status: 'New',
    notes: `${notes} (Email: ${email})`
  };

  const bookings = getStoredBookings();
  bookings.unshift(newBooking);
  saveStoredBookings(bookings);
  syncLeadToCloud(newBooking);

  const successMsg = document.getElementById('inquirySuccessMsg');
  if (successMsg) {
    successMsg.style.display = 'block';
  }

  const msg = `*New Tour Enquiry via Fly Nature Holidays Website*
• Name: ${name}
• Phone: ${phone}
• Email: ${email}
• Destination: ${dest}
• Travel Date: ${date}
• Travelers: ${travelers} Persons
• Notes: ${notes}`;

  setTimeout(() => {
    window.open(`https://wa.me/919447422126?text=${encodeURIComponent(msg)}`, '_blank');
  }, 900);
};

// ==========================================================================
// ADMIN DASHBOARD LOGIC (Overview, Packages, CRM Leads, Finance, Settings)
// ==========================================================================

let currentBookingStatusFilter = 'all';
let currentBookingSearch = '';
let currentPkgCategoryFilter = 'all';
let currentPkgSearch = '';

export function renderDashboard() {
  const bookings = getStoredBookings();
  const packages = getStoredPackages();
  const payments = getStoredPayments();
  const settings = getStoredSettings();

  // Badges & Stats
  const pBadge = document.getElementById('dashPackageCountBadge');
  if (pBadge) pBadge.textContent = packages.length;

  const statPackages = document.getElementById('statPackageCount');
  if (statPackages) statPackages.textContent = packages.length;

  const bBadge = document.getElementById('dashBookingCountBadge');
  if (bBadge) bBadge.textContent = bookings.filter(b => b.status === 'New').length || bookings.length;

  const statBookings = document.getElementById('statTotalBookings');
  if (statBookings) statBookings.textContent = bookings.length;

  // Calculate gross revenue from payments
  const totalRevenueNum = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const statRevenue = document.getElementById('statGrossRevenue');
  if (statRevenue) statRevenue.textContent = '₹' + totalRevenueNum.toLocaleString('en-IN');

  // ==========================================
  // TAB 1: OVERVIEW
  // ==========================================
  // 1. Overview Recent Bookings Table
  const ovBody = document.getElementById('overviewBookingsBody');
  if (ovBody) {
    ovBody.innerHTML = bookings.slice(0, 5).map(b => `
      <tr>
        <td><strong>${b.customerName}</strong><br><small style="color:#64748b;">${b.phone}</small></td>
        <td>${b.destination}</td>
        <td>${b.date}</td>
        <td><span class="status-pill status-${b.status.toLowerCase().replace(/[^a-z]/g, '')}">${b.status}</span></td>
        <td>
          <a href="https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${b.customerName}, this is Fly Nature Holidays regarding your tour enquiry for ${b.destination}.`)}" target="_blank" rel="noopener" class="btn-icon-action" title="Chat on WhatsApp">
            <svg style="width:13px;height:13px;color:#16a34a;" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.539 1.761.815 2.791.815 3.183 0 5.769-2.586 5.769-5.767.001-3.18-2.585-5.766-5.769-5.766zm9.969 5.766c0 5.503-4.478 9.98-9.98 9.98-1.748 0-3.385-.45-4.819-1.239l-5.201 1.363 1.388-5.074c-.886-1.492-1.388-3.23-1.388-5.03 0-5.502 4.477-9.98 9.98-9.98 5.502 0 9.98 4.478 9.98 9.98z"/></svg>
            <span>WhatsApp</span>
          </a>
        </td>
      </tr>
    `).join('');
  }

  // 2. Overview Packages Quick List
  const ovPackages = document.getElementById('overviewPackagesList');
  if (ovPackages) {
    ovPackages.innerHTML = packages.slice(0, 6).map(pkg => `
      <div class="fleet-quick-item">
        <img src="${pkg.image}" alt="${pkg.title}" class="fleet-item-thumb">
        <div class="fleet-item-info">
          <strong>${pkg.title}</strong>
          <span>${pkg.durationDays}D/${pkg.durationNights}N • ${pkg.showPrice && pkg.price ? formatINR(pkg.price) + ' / person' : 'Custom Quote Mode'}</span>
        </div>
        <span style="font-size:0.75rem; font-weight:700; color:#0284c7; background:#f0f9ff; padding:2px 8px; border-radius:12px; border: 1px solid #bae6fd;">${pkg.badge || 'Live'}</span>
      </div>
    `).join('');
  }

  // ==========================================
  // TAB 2: TOUR PACKAGES
  // ==========================================
  const pkgPillsWrap = document.getElementById('dashPkgFilterPills');
  if (pkgPillsWrap) {
    const categories = getStoredCategories();
    pkgPillsWrap.innerHTML = `
      <button class="dash-filter-btn ${currentPkgCategoryFilter === 'all' ? 'active' : ''}" onclick="window.filterDashPackages('all', this)">All (${packages.length})</button>
      ${categories.map(c => {
        const count = packages.filter(p => p.category === c.id).length;
        return `<button class="dash-filter-btn ${currentPkgCategoryFilter === c.id ? 'active' : ''}" onclick="window.filterDashPackages('${c.id}', this)">${c.badge || ''} ${c.name} (${count})</button>`;
      }).join('')}
    `;
  }

  let filteredPackages = packages;
  if (currentPkgCategoryFilter !== 'all') {
    filteredPackages = filteredPackages.filter(p => p.category === currentPkgCategoryFilter);
  }
  if (currentPkgSearch) {
    const q = currentPkgSearch.toLowerCase();
    filteredPackages = filteredPackages.filter(p => 
      p.title.toLowerCase().includes(q) || 
      (p.stops && p.stops.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  }

  const pBody = document.getElementById('dashPackagesBody');
  if (pBody) {
    if (filteredPackages.length === 0) {
      pBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:32px; color:#64748b;">No tour packages match the selected filter or search query.</td></tr>`;
    } else {
      pBody.innerHTML = filteredPackages.map(p => `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="${p.image}" alt="${p.title}" style="width:50px; height:42px; border-radius:8px; object-fit:cover; flex-shrink:0;">
              <div>
                <strong style="color:#0f172a; font-size:0.9rem;">${p.title}</strong>
                <small style="display:block; color:#64748b; font-size:0.78rem; margin-top:2px;">${p.stops || ''}</small>
              </div>
            </div>
          </td>
          <td><span class="status-pill status-new">${(p.category || 'tour').toUpperCase()}</span></td>
          <td>${p.durationDays}D / ${p.durationNights}N</td>
          <td>
            ${p.showPrice && p.price ? `<strong style="color:#0f172a;">${formatINR(p.price)}</strong>` : '<span style="color:#64748b; font-style:italic; font-size:0.82rem;">Custom Quote Mode</span>'}
          </td>
          <td>
            <span class="status-pill ${p.showPrice ? 'status-confirmed' : 'status-inprogress'}">
              ${p.showPrice ? 'Price Visible' : 'Quote Only (Hidden)'}
            </span>
          </td>
          <td>
            <div style="display:flex; gap:8px;">
              <button class="btn-icon-action" onclick="window.openEditPackageModal('${p.id}')">Edit / Set Price</button>
              <button class="btn-icon-action text-red" onclick="window.deletePackage('${p.id}')">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  }

  // ==========================================
  // TAB 3: BOOKINGS & LEADS CRM
  // ==========================================
  let filteredBookings = bookings;
  if (currentBookingStatusFilter !== 'all') {
    filteredBookings = filteredBookings.filter(b => b.status === currentBookingStatusFilter);
  }
  if (currentBookingSearch) {
    const q = currentBookingSearch.toLowerCase();
    filteredBookings = filteredBookings.filter(b => 
      b.customerName.toLowerCase().includes(q) || 
      b.phone.toLowerCase().includes(q) ||
      b.destination.toLowerCase().includes(q)
    );
  }

  const allBBody = document.getElementById('dashAllBookingsBody');
  if (allBBody) {
    if (filteredBookings.length === 0) {
      allBBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:32px; color:#64748b;">No leads match the selected filter. Click "+ Record Walk-In / Phone Lead" to add one.</td></tr>`;
    } else {
      allBBody.innerHTML = filteredBookings.map(b => `
        <tr>
          <td><code style="background:#f1f5f9; padding:2px 6px; border-radius:4px; font-size:0.78rem;">${b.id}</code></td>
          <td>
            <strong style="color:#0f172a;">${b.customerName}</strong>
            ${b.notes ? `<br><small style="color:#64748b; font-size:0.75rem;">📝 ${b.notes}</small>` : ''}
          </td>
          <td>
            <a href="https://wa.me/${b.phone.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener" style="color:#16a34a; font-weight:700; display:inline-flex; align-items:center; gap:4px;">
              ${b.phone}
            </a>
          </td>
          <td><strong>${b.destination}</strong></td>
          <td>${b.date}</td>
          <td>${b.persons}</td>
          <td>
            <select onchange="window.updateBookingStatus('${b.id}', this.value)" style="padding:4px 8px; border-radius:6px; font-size:0.78rem; font-weight:700; border:1px solid #cbd5e1; background:white; color:#0f172a; cursor:pointer;">
              <option value="New" ${b.status === 'New' ? 'selected' : ''}>New</option>
              <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
              <option value="In-Progress" ${b.status === 'In-Progress' ? 'selected' : ''}>In-Progress</option>
              <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </td>
          <td>
            <div style="display:flex; gap:6px; align-items:center;">
              <a href="https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${b.customerName}, this is Fly Nature Holidays. We received your holiday inquiry for ${b.destination}. We have prepared customized itineraries and rates for your travel dates. Would you like us to share the PDF details?`)}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="padding:4px 10px; font-size:0.75rem;">
                WhatsApp
              </a>
              <button class="btn-icon-action text-red" onclick="window.deleteBooking('${b.id}')" title="Delete Lead" style="padding:4px 8px;">✕</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  }

  // ==========================================
  // TAB 4: FINANCE & REVENUE
  // ==========================================
  const finTotal = document.getElementById('finTotalInflow');
  if (finTotal) finTotal.textContent = '₹' + totalRevenueNum.toLocaleString('en-IN');

  const intlPayments = payments.filter(p => 
    p.destination.toLowerCase().includes('turkey') || 
    p.destination.toLowerCase().includes('bali') || 
    p.destination.toLowerCase().includes('thailand') ||
    p.destination.toLowerCase().includes('dubai') ||
    p.destination.toLowerCase().includes('georgia') ||
    p.destination.toLowerCase().includes('baku')
  );
  const intlSum = intlPayments.reduce((s, p) => s + (Number(p.amount) || 0), 0) || 750000;
  const finIntl = document.getElementById('finIntlShare');
  if (finIntl) finIntl.textContent = '₹' + intlSum.toLocaleString('en-IN');

  const umrahPayments = payments.filter(p => p.destination.toLowerCase().includes('umrah') || p.destination.toLowerCase().includes('ziyarah'));
  const umrahSum = umrahPayments.reduce((s, p) => s + (Number(p.amount) || 0), 0) || 210000;
  const finUmrah = document.getElementById('finUmrahShare');
  if (finUmrah) finUmrah.textContent = '₹' + umrahSum.toLocaleString('en-IN');

  const domesticSum = Math.max(0, totalRevenueNum - intlSum - umrahSum) || 320000;
  const finDom = document.getElementById('finDomesticShare');
  if (finDom) finDom.textContent = '₹' + domesticSum.toLocaleString('en-IN');

  const pPayBody = document.getElementById('dashFinancePaymentsBody');
  if (pPayBody) {
    pPayBody.innerHTML = payments.map(p => `
      <tr>
        <td><code style="background:#f1f5f9; padding:2px 6px; border-radius:4px; font-size:0.78rem;">${p.id}</code></td>
        <td><strong>${p.customerName}</strong></td>
        <td>${p.destination}</td>
        <td><strong style="color:#0f172a;">₹${Number(p.amount).toLocaleString('en-IN')}</strong></td>
        <td><span style="font-size:0.8rem; color:#475569;">${p.mode}</span></td>
        <td>
          <span class="status-pill ${p.status.includes('Full') ? 'status-confirmed' : 'status-inprogress'}">
            ${p.status}
          </span>
        </td>
        <td>${p.date}</td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="btn-icon-action" onclick="alert('Receipt #${p.receiptNo || p.id} verified for ${p.customerName} (₹${Number(p.amount).toLocaleString('en-IN')}).')" title="View Receipt">
              Receipt
            </button>
            <button class="btn-icon-action text-red" onclick="window.deletePayment('${p.id}')" title="Delete Payment">✕</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // ==========================================
  // TAB 5: BRANCH SETTINGS
  // ==========================================
  const setEl = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  };
  setEl('cfgAgencyName', settings.agencyName || 'Fly Nature Holidays');
  setEl('cfgTagline', settings.tagline || 'travel shoppe');
  setEl('cfgTourismReg', settings.certReg || 'KTR-MAL-2024-889 (Kerala Tourism Dept Certified)');
  setEl('cfgGstin', settings.gstin || '32AABCF1234F1Z8');
  setEl('cfgKondotty', settings.kondotty || 'Kurupath, Near Calicut Airport Road, Kondotty, Malappuram, Kerala - 673638');
  setEl('cfgKoduvally', settings.koduvally || 'Main Road, Koduvally, Kozhikode, Kerala - 673572');
  setEl('cfgHotlines', settings.hotlines || '+91 94474 22126 / +91 96336 02224');
  setEl('cfgWhatsapp', settings.whatsapp || '+91 94474 22126');
  setEl('cfgEmail', settings.email || 'naturekdy@gmail.com');
  setEl('cfgInstagram', settings.instagram || '@flynatureholidays');
  setEl('cfgWorkingHours', settings.workingHours || 'Mon - Sat: 9:00 AM - 8:30 PM | Sun: 10:00 AM - 6:00 PM');

  // Supabase Cloud Status
  const isSbOn = isSupabaseConnected();
  const sbBadge = document.getElementById('sbStatusBadge');
  if (sbBadge) {
    if (isSbOn) {
      sbBadge.textContent = '🟢 Supabase Cloud Active';
      sbBadge.style.background = '#f0fdf4';
      sbBadge.style.color = '#15803d';
      sbBadge.style.borderColor = '#bbf7d0';
    } else {
      sbBadge.textContent = 'Local Storage Mode';
      sbBadge.style.background = 'white';
      sbBadge.style.color = '#0284c7';
      sbBadge.style.borderColor = '#0284c7';
    }
  }

  const sbCfg = getSupabaseConfig();
  const sbUrlInput = document.getElementById('sbProjectUrl');
  const sbKeyInput = document.getElementById('sbAnonKey');
  if (sbUrlInput && sbCfg?.url && !sbUrlInput.value) {
    sbUrlInput.value = sbCfg.url;
  }
  if (sbKeyInput && sbCfg?.anonKey && !sbKeyInput.value) {
    sbKeyInput.value = sbCfg.anonKey;
  }
}

// Filter & Search Handlers for Tour Packages
window.filterDashPackages = function(catId, btnEl) {
  currentPkgCategoryFilter = catId;
  if (btnEl) {
    document.querySelectorAll('#dashPkgFilterPills .dash-filter-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  renderDashboard();
};

window.searchDashPackages = function(query) {
  currentPkgSearch = query.trim();
  renderDashboard();
};

// Filter & Search Handlers for Bookings CRM
window.filterBookingsByStatus = function(status, btnEl) {
  currentBookingStatusFilter = status;
  if (btnEl) {
    document.querySelectorAll('#bookingFilterPills .dash-filter-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  renderDashboard();
};

window.searchBookings = function(query) {
  currentBookingSearch = query.trim();
  renderDashboard();
};

// Add Lead Modal Handlers
window.openAddLeadModal = function() {
  const modal = document.getElementById('addLeadModalBackdrop');
  if (!modal) return;
  document.getElementById('leadCustomerName').value = '';
  document.getElementById('leadPhone').value = '';
  document.getElementById('leadDestination').value = '';
  document.getElementById('leadDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('leadPersons').value = 2;
  document.getElementById('leadStatus').value = 'New';
  document.getElementById('leadNotes').value = '';
  modal.style.display = 'flex';
};

window.closeAddLeadModal = function() {
  const modal = document.getElementById('addLeadModalBackdrop');
  if (modal) modal.style.display = 'none';
};

window.handleSaveLead = function(event) {
  event.preventDefault();
  const customerName = document.getElementById('leadCustomerName').value.trim();
  const phone = document.getElementById('leadPhone').value.trim();
  const destination = document.getElementById('leadDestination').value.trim();
  const date = document.getElementById('leadDate').value;
  const persons = parseInt(document.getElementById('leadPersons').value, 10) || 1;
  const status = document.getElementById('leadStatus').value;
  const notes = document.getElementById('leadNotes').value.trim();

  const bookings = getStoredBookings();
  const newLead = {
    id: 'FN-' + Math.floor(1000 + Math.random() * 9000),
    customerName,
    phone,
    destination,
    date,
    persons,
    status,
    notes
  };

  bookings.unshift(newLead);
  saveStoredBookings(bookings);
  syncLeadToCloud(newLead);
  window.closeAddLeadModal();
  renderDashboard();
  alert(`✅ Lead recorded successfully for ${customerName}! Added to CRM.`);
};

window.deleteBooking = function(bId) {
  if (!confirm('Are you sure you want to delete this enquiry/lead record from CRM?')) return;
  let bookings = getStoredBookings();
  bookings = bookings.filter(b => b.id !== bId);
  saveStoredBookings(bookings);
  deleteCloudLead(bId);
  renderDashboard();
};

// Payment Modal Handlers
window.openRecordPaymentModal = function() {
  const modal = document.getElementById('recordPaymentModalBackdrop');
  if (!modal) return;
  document.getElementById('payCustomerName').value = '';
  document.getElementById('payDestination').value = '';
  document.getElementById('payAmount').value = '';
  document.getElementById('payMode').value = 'Google Pay (UPI)';
  document.getElementById('payStatus').value = 'Paid in Full';
  document.getElementById('payDate').value = new Date().toISOString().split('T')[0];
  modal.style.display = 'flex';
};

window.closeRecordPaymentModal = function() {
  const modal = document.getElementById('recordPaymentModalBackdrop');
  if (modal) modal.style.display = 'none';
};

window.handleSavePayment = function(event) {
  event.preventDefault();
  const customerName = document.getElementById('payCustomerName').value.trim();
  const destination = document.getElementById('payDestination').value.trim();
  const amount = Number(document.getElementById('payAmount').value) || 0;
  const mode = document.getElementById('payMode').value;
  const status = document.getElementById('payStatus').value;
  const date = document.getElementById('payDate').value;

  const payments = getStoredPayments();
  const newPayment = {
    id: 'TRX-' + Math.floor(8000 + Math.random() * 1999),
    customerName,
    destination,
    amount,
    mode,
    status,
    date,
    receiptNo: 'RCPT-2026-0' + Math.floor(50 + Math.random() * 50)
  };

  payments.unshift(newPayment);
  saveStoredPayments(payments);
  syncPaymentToCloud(newPayment);
  window.closeRecordPaymentModal();
  renderDashboard();
  alert(`✅ Payment of ₹${amount.toLocaleString('en-IN')} recorded successfully for ${customerName}!`);
};

window.deletePayment = function(payId) {
  if (!confirm('Are you sure you want to remove this payment entry from the ledger?')) return;
  let payments = getStoredPayments();
  payments = payments.filter(p => p.id !== payId);
  saveStoredPayments(payments);
  renderDashboard();
};

// Branch Settings Handlers
window.saveBranchSettings = function(event) {
  if (event) event.preventDefault();

  const settings = {
    agencyName: document.getElementById('cfgAgencyName')?.value?.trim() || 'Fly Nature Holidays',
    tagline: document.getElementById('cfgTagline')?.value?.trim() || 'travel shoppe',
    certReg: document.getElementById('cfgTourismReg')?.value?.trim() || 'KTR-MAL-2024-889 (Kerala Tourism Dept Certified)',
    gstin: document.getElementById('cfgGstin')?.value?.trim() || '32AABCF1234F1Z8',
    kondotty: document.getElementById('cfgKondotty')?.value?.trim() || 'Kurupath, Near Calicut Airport Road, Kondotty, Malappuram, Kerala - 673638',
    koduvally: document.getElementById('cfgKoduvally')?.value?.trim() || 'Main Road, Koduvally, Kozhikode, Kerala - 673572',
    hotlines: document.getElementById('cfgHotlines')?.value?.trim() || '+91 94474 22126 / +91 96336 02224',
    whatsapp: document.getElementById('cfgWhatsapp')?.value?.trim() || '+91 94474 22126',
    email: document.getElementById('cfgEmail')?.value?.trim() || 'naturekdy@gmail.com',
    instagram: document.getElementById('cfgInstagram')?.value?.trim() || '@flynatureholidays',
    workingHours: document.getElementById('cfgWorkingHours')?.value?.trim() || 'Mon - Sat: 9:00 AM - 8:30 PM | Sun: 10:00 AM - 6:00 PM'
  };

  saveStoredSettings(settings);
  window.applySettingsToWebsite(settings);
  alert('✅ Branch Profile & Credentials saved successfully!\n\nAll contact hotlines, branch addresses and booking links are synchronized across the public website.');
};

window.resetBranchSettings = function() {
  if (!confirm('Reset all branch contact settings to official defaults?')) return;
  saveStoredSettings(DEFAULT_SETTINGS);
  renderDashboard();
  window.applySettingsToWebsite(DEFAULT_SETTINGS);
  alert('Branch profile reset to defaults.');
};

window.applySettingsToWebsite = function(settings) {
  const topBarPhone = document.querySelector('.top-bar-right span');
  if (topBarPhone && settings.whatsapp) {
    topBarPhone.textContent = settings.whatsapp;
  }
};

// Swap Vehicle Card Photo
window.swapVehicleCardPhoto = function(vId, newSrc, btnElement) {
  const mainImg = document.getElementById(`main-v-img-${vId}`);
  if (mainImg) mainImg.src = newSrc;

  const card = document.getElementById(`dash-v-${vId}`);
  if (card) {
    card.querySelectorAll('.dash-v-thumb-btn').forEach(b => b.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
  }
};

// ==========================================================================
// VEHICLE CRUD WITH 2 IMAGES
// ==========================================================================

window.openAddVehicleModal = function() {
  document.getElementById('vehicleModalHeading').textContent = 'Add New Vehicle to Fleet';
  document.getElementById('vFormId').value = '';
  document.getElementById('vRegNumber').value = '';
  document.getElementById('vModelName').value = '';
  document.getElementById('vTypeSelect').value = 'suv';
  document.getElementById('vSeats').value = '7';
  document.getElementById('vColor').value = 'White';
  document.getElementById('vRate').value = '₹3,500 / day';
  document.getElementById('vFeatures').value = 'Dual Zone AC, Pushback Seats, Music System, GPS';

  const default1 = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80';
  const default2 = 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=400&q=80';
  
  document.getElementById('vImgUrl1').value = default1;
  document.getElementById('imgPreview1').src = default1;
  document.getElementById('vImgUrl2').value = default2;
  document.getElementById('imgPreview2').src = default2;

  document.getElementById('vehicleModalBackdrop').style.display = 'flex';
};

window.editVehicle = function(vId) {
  const vehicles = getStoredVehicles();
  const v = vehicles.find(item => item.id === vId);
  if (!v) return;

  document.getElementById('vehicleModalHeading').textContent = `Edit Vehicle: ${v.number}`;
  document.getElementById('vFormId').value = v.id;
  document.getElementById('vRegNumber').value = v.number;
  document.getElementById('vModelName').value = v.name;
  document.getElementById('vTypeSelect').value = v.type || 'suv';
  document.getElementById('vSeats').value = v.seats || 7;
  document.getElementById('vColor').value = v.color || '';
  document.getElementById('vRate').value = v.rate || '';
  document.getElementById('vFeatures').value = v.features || '';

  const img1 = (v.images && v.images[0]) || '';
  const img2 = (v.images && v.images[1]) || '';

  document.getElementById('vImgUrl1').value = img1;
  document.getElementById('imgPreview1').src = img1 || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80';
  document.getElementById('vImgUrl2').value = img2;
  document.getElementById('imgPreview2').src = img2 || 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=400&q=80';

  document.getElementById('vehicleModalBackdrop').style.display = 'flex';
};

window.closeVehicleModal = function() {
  document.getElementById('vehicleModalBackdrop').style.display = 'none';
};

// Handle File upload preview
window.handleImageUploadPreview = function(event, imgIndex) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    document.getElementById(`imgPreview${imgIndex}`).src = dataUrl;
    document.getElementById(`vImgUrl${imgIndex}`).value = dataUrl;
  };
  reader.readAsDataURL(file);
};

// Handle URL fallback preview
window.handleImageUrlPreview = function(imgIndex) {
  const url = document.getElementById(`vImgUrl${imgIndex}`).value;
  if (url) {
    document.getElementById(`imgPreview${imgIndex}`).src = url;
  }
};

// Save Vehicle
window.handleSaveVehicle = function() {
  const vId = document.getElementById('vFormId').value;
  const regNumber = document.getElementById('vRegNumber').value.trim().toUpperCase();
  const modelName = document.getElementById('vModelName').value.trim();
  const type = document.getElementById('vTypeSelect').value;
  const seats = parseInt(document.getElementById('vSeats').value, 10);
  const color = document.getElementById('vColor').value.trim();
  const rate = document.getElementById('vRate').value.trim();
  const features = document.getElementById('vFeatures').value.trim();

  const img1 = document.getElementById('vImgUrl1').value || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';
  const img2 = document.getElementById('vImgUrl2').value || img1;

  const vehicles = getStoredVehicles();

  if (vId) {
    const idx = vehicles.findIndex(v => v.id === vId);
    if (idx !== -1) {
      vehicles[idx] = {
        ...vehicles[idx],
        number: regNumber,
        name: modelName,
        type,
        seats,
        color,
        rate,
        features,
        images: [img1, img2]
      };
    }
  } else {
    const newV = {
      id: 'v-' + Date.now(),
      number: regNumber,
      name: modelName,
      type,
      seats,
      color,
      rate,
      features,
      images: [img1, img2]
    };
    vehicles.unshift(newV);
  }

  saveStoredVehicles(vehicles);
  window.closeVehicleModal();
  renderDashboard();
  renderPublicVehicles(vehicles);
};

// Delete Vehicle
window.deleteVehicle = function(vId) {
  if (!confirm('Are you sure you want to remove this vehicle from the fleet?')) return;
  let vehicles = getStoredVehicles();
  vehicles = vehicles.filter(v => v.id !== vId);
  saveStoredVehicles(vehicles);
  renderDashboard();
  renderPublicVehicles(vehicles);
};

// Update Booking Status
window.updateBookingStatus = function(bId, newStatus) {
  const bookings = getStoredBookings();
  const b = bookings.find(item => item.id === bId);
  if (b) {
    b.status = newStatus;
    saveStoredBookings(bookings);
    renderDashboard();
  }
};

// Setup FAQs
function setupFAQs() {
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

// Mobile Menu
function setupMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const close = document.getElementById('drawerClose');

  if (toggle && drawer) {
    toggle.addEventListener('click', () => drawer.classList.add('open'));
  }
  if (close && drawer) {
    close.addEventListener('click', () => drawer.classList.remove('open'));
  }
  document.querySelectorAll('.drawer-item').forEach(link => {
    link.addEventListener('click', () => {
      if (drawer) drawer.classList.remove('open');
    });
  });
}

// Modal Backdrop Dismiss
window.addEventListener('click', (e) => {
  const pkgModal = document.getElementById('packageModalBackdrop');
  if (e.target === pkgModal) window.closePackageModal();

  const editModal = document.getElementById('packageEditModalBackdrop');
  if (e.target === editModal) window.closePackageEditModal();

  const vModal = document.getElementById('vehicleModalBackdrop');
  if (e.target === vModal) window.closeVehicleModal();

  const catModal = document.getElementById('categoryManagerModalBackdrop');
  if (e.target === catModal) window.closeCategoryManagerModal();

  const leadModal = document.getElementById('addLeadModalBackdrop');
  if (e.target === leadModal) window.closeAddLeadModal();

  const payModal = document.getElementById('recordPaymentModalBackdrop');
  if (e.target === payModal) window.closeRecordPaymentModal();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closePackageModal();
    window.closePackageEditModal();
    window.closeVehicleModal();
    window.closeCategoryManagerModal();
    window.closeAddLeadModal();
    window.closeRecordPaymentModal();
  }
});

// App Initialization & Route Handling
function checkHashRoute() {
  if (window.location.hash === '#dashboard') {
    window.switchView('dashboard');
  } else if (!window.location.hash || window.location.hash === '#' || window.location.hash.startsWith('#contact') || window.location.hash.startsWith('#packages') || window.location.hash.startsWith('#planner')) {
    const dashView = document.getElementById('adminDashboardView') || document.getElementById('dashboardView');
    if (dashView && dashView.style.display === 'flex' && window.location.hash !== '#dashboard') {
      window.switchView('website');
    }
  }
}

window.addEventListener('hashchange', checkHashRoute);

function initApp() {
  window.applySettingsToWebsite(getStoredSettings());
  renderAllCategoryUI();
  renderPackages(getStoredPackages());
  renderPublicVehicles(getStoredVehicles());
  setupFAQs();
  setupMobileMenu();

  // Explicit reactive listeners for Trip Estimator
  const calcInputs = ['calcDest', 'calcDays', 'calcAdults'];
  calcInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', () => window.calculateTripEstimate());
      el.addEventListener('input', () => window.calculateTripEstimate());
    }
  });
  document.querySelectorAll('input[name="stayTier"]').forEach(radio => {
    radio.addEventListener('change', () => window.calculateTripEstimate());
  });

  window.calculateTripEstimate();
  renderDashboard();

  if (window.location.hash === '#dashboard') {
    window.switchView('dashboard');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
