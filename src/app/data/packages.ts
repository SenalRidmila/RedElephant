export interface DayItinerary {
    day: number;
    title: string;
    description: string;
    highlights: string[];
    accommodation: string;
    meals: string;
    image?: string;
    location?: string;
    activity?: string;
}

export interface MapPoint {
    id: string;
    name: string;
    type: string;
    cx: number;
    cy: number;
    description: string;
    image?: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface TourPackage {
    id: string;
    category: string;
    title: string;
    subtitle: string;
    tagline: string;
    heroImage: string;
    galleryImages: string[];
    price: number;
    priceLabel: string;
    duration: string;
    days: number;
    nights: number;
    group: string;
    difficulty: string;
    badge: string;
    badgeColor: string;
    accent: string;
    rating: number;
    reviews: number;
    overview: string;
    highlights: string[];
    included: string[];
    excluded: string[];
    itinerary: DayItinerary[];
    departures: string;
    bestTime: string;
    startLocation: string;
    endLocation: string;
    mapPoints?: MapPoint[];
    mapRoutePoints?: string;
    faq?: FaqItem[];
}

export const packages: TourPackage[] = [
    {
        id: 'cultural-classic',
        category: 'culture',
        title: 'Cultural Classic',
        subtitle: "Sri Lanka's Grand Circle",
        tagline: 'Coast to ancient cities, misty highlands to wild safaris — one unforgettable loop',
        heroImage: '/assets/culture-package/sigiriya.webp',
        galleryImages: [
            '/assets/culture-package/sigiriya.webp',
            '/assets/negombo-1.webp',
            '/assets/anuradhapura/ruwanweliseya-anuradhapura-gallery-1.webp',
            '/assets/kandy/kandy-gallery-1.webp',
        ],
        price: 1890,
        priceLabel: 'per person (twin share)',
        duration: '9 Days / 8 Nights',
        days: 9,
        nights: 8,
        group: 'Up to 12',
        difficulty: 'Easy – Moderate',
        badge: 'Best Seller',
        badgeColor: '#C41E3A',
        accent: '#B97C3A',
        rating: 4.9,
        reviews: 312,
        overview: `Experience Sri Lanka's greatest hits in one sweeping 9-day loop. From the golden sands of Negombo to the ancient stupas of Anuradhapura, through the painted caves of Dambulla and the medieval ruins of Polonnaruwa, up to the misty hill-country tea trails of Hatton, then down into the wild heart of Yala National Park, and finally along the palm-fringed southern coast to the colonial charm of Galle Fort. Every landscape, every flavour, every era — captured in a single journey.`,
        highlights: [
            'Golden-hour beach walk in Negombo',
            'Explore the sacred city of Anuradhapura',
            'Dambulla Cave Temple frescoes',
            'Cycle through Polonnaruwa ancient city',
            'Witness the sacred Tooth Relic in Kandy',
            'Hike to World\'s End, Horton Plains via Hatton',
            'Leopard safari at Yala National Park',
            'Sunset stroll along Galle Fort ramparts',
        ],
        included: [
            'Private air-conditioned vehicle & driver for 9 days',
            '8 nights boutique accommodation (4-star)',
            'Daily breakfast + 4 cultural dinners',
            'Expert English-speaking historian guide',
            'All entrance fees to UNESCO sites & national parks',
            'Sigiriya sunrise permit',
            'Yala National Park full-day jeep safari',
            'Village bicycle tour (Polonnaruwa)',
            'Traditional cooking experience',
            'Airport transfers (arrival & departure)',
            'Bottled water throughout',
        ],
        excluded: [
            'International flights',
            'Travel insurance',
            'Personal expenses & gratuities',
            'Lunch & dinners not specified',
            'Optional hot-air balloon ride (+$220)',
        ],
        itinerary: [
            {
                day: 1, title: 'Airport Arrival → Negombo Beach',
                description: 'Your Red Elephant driver greets you at Bandaranaike International Airport and whisks you to the nearby coastal town of Negombo — just 15 minutes away. Settle into your beachfront boutique hotel, take a golden-hour stroll along the fishing-boat-dotted shoreline, and enjoy a welcome seafood dinner as the sun sets over the Indian Ocean.',
                highlights: ['Airport meet & greet', 'Negombo beach sunset walk', 'Dutch Canal boat ride', 'Welcome seafood dinner'],
                accommodation: 'Jetwing Beach, Negombo', meals: 'Dinner',
                image: '/assets/negombo-1.webp', location: 'Negombo',
                activity: 'Beach sunset walk',
            },
            {
                day: 2, title: 'Negombo → Anuradhapura',
                description: "Head north through lush paddy fields and coconut groves to Anuradhapura — Sri Lanka's first ancient capital, dating back to the 4th century BC. Visit the Sri Maha Bodhi, the sacred Ruwanwelisaya stupa gleaming white against the sky, and the vast Abhayagiri monastery complex. Witness the deeply moving evening puja ceremony as monks chant at sunset.",
                highlights: ['Sri Maha Bodhi — oldest historically documented tree', 'Ruwanwelisaya Great Stupa', 'Abhayagiri Monastery', 'Sunset puja ceremony'],
                accommodation: 'Ulagalla By Uga Escapes, Anuradhapura', meals: 'Breakfast, Dinner',
                image: '/assets/anuradhapura/ruwanweliseya-anuradhapura-gallery-1.webp', location: 'Anuradhapura',
                activity: 'Sacred city exploration',
            },
            {
                day: 3, title: 'Anuradhapura → Dambulla',
                description: 'Continue south to the Dambulla Cave Temple complex — a UNESCO masterpiece housing 153 Buddha statues and vivid ceiling frescoes painted across five sacred caves. After exploring this 2,000-year-old treasure, visit a traditional spice garden to discover cinnamon, pepper, and cardamom in their natural habitat. Settle into your heritage resort surrounded by jungle.',
                highlights: ['Dambulla 5-cave temple complex', 'Ancient frescoes & 153 Buddha statues', 'Spice garden tour & tasting', 'Heritage resort check-in'],
                accommodation: 'Sundaras Resort & Spa, Dambulla', meals: 'Breakfast, Lunch',
                image: '/assets/dambulla/dambulla-1.webp', location: 'Dambulla',
                activity: 'Cave temple exploration',
            },
            {
                day: 4, title: 'Sigiriya Rock → Polonnaruwa',
                description: "Rise before dawn for a private sunrise ascent of Sigiriya — the 5th-century rock fortress rising 200 metres above the jungle. Walk the Mirror Wall, admire the famous frescoes, and reach the lion-paw summit as golden light floods the plains. Afternoon drive to Polonnaruwa, the island's 11th-century medieval capital with perfectly preserved ruins.",
                highlights: ['Sigiriya pre-dawn private access', 'Fresco gallery of celestial maidens', 'Lion-paw summit panorama', 'Polonnaruwa arrival briefing'],
                accommodation: 'The Deer Park Heritage Hotel, Polonnaruwa', meals: 'Breakfast, Dinner',
                image: '/assets/culture-package/sigiriya.webp', location: 'Sigiriya / Polonnaruwa',
                activity: 'Rock fortress climb',
            },
            {
                day: 5, title: 'Polonnaruwa → Kandy',
                description: "The best way to feel Polonnaruwa is on two wheels. Cycle through the ancient citadel — past the Parakrama Samudra reservoir, the Vatadage circular relic house, and the Gal Vihara reclining Buddha. Afternoon transfer to Kandy, the last royal capital cradled in forested hills. Evening puja at the Temple of the Sacred Tooth Relic.",
                highlights: ['Guided bicycle tour of ruins', 'Gal Vihara reclining Buddha', 'Temple of the Tooth evening puja', 'Kandyan cultural dance performance'],
                accommodation: "Earl's Regency Hotel, Kandy", meals: 'Breakfast, Dinner',
                image: '/assets/pollonnaruwa/galviharaya-polonnaruwa.webp', location: 'Polonnaruwa / Kandy',
                activity: 'Bicycle tour & temple visit',
            },
            {
                day: 6, title: 'Kandy → Hatton (Hill Country)',
                description: "Board the legendary Kandy–Hatton rail journey — one of the world's most scenic train rides. Wind through emerald tea estates, misty tunnels, and dramatic valleys. On arrival in Hatton, visit a working tea factory and trek to the edge of World's End at Horton Plains, where the plateau drops 880 metres to the southern plains below.",
                highlights: ['Iconic Kandy–Hatton scenic rail journey', "World's End cliff viewpoint (Horton Plains)", 'Tea factory visit & tasting', 'Fog-draped plantation walk'],
                accommodation: 'Ceylon Tea Trails, Hatton', meals: 'Breakfast, Lunch, Afternoon Tea',
                image: '/assets/hatton/hatton-1.webp', location: 'Hatton / Horton Plains',
                activity: 'Scenic train & tea country',
            },
            {
                day: 7, title: 'Hatton → Yala National Park',
                description: "Descend from the cool highlands to the dry southern lowlands and the wild heart of Yala — Sri Lanka's premier national park, famous for having the highest leopard density in the world. Settle into your safari camp tucked at the park boundary. An afternoon game drive reveals elephants, sloth bears, crocodiles, and exotic birdlife.",
                highlights: ['Highland-to-lowland scenic drive', 'Afternoon jeep safari in Yala', 'Leopard & elephant spotting', 'Safari camp sundowner cocktails'],
                accommodation: 'Wild Coast Tented Lodge, Yala', meals: 'Breakfast, Dinner',
                image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp', location: 'Yala National Park',
                activity: 'Wildlife safari',
            },
            {
                day: 8, title: 'Yala → Galle Fort',
                description: "After a dawn safari for a final chance to spot the elusive leopard, drive along the palm-fringed southern coast to Galle — a 400-year-old Dutch colonial fortress and UNESCO World Heritage Site. Explore boutique shops in cobblestone lanes, climb the ramparts for panoramic ocean views, and enjoy a farewell dinner as the lighthouse beam sweeps across the bay.",
                highlights: ['Dawn safari in Yala', 'Southern coastal scenic drive', 'Galle Fort rampart sunset walk', 'Farewell dinner inside the fort'],
                accommodation: 'The Fort Bazaar, Galle', meals: 'Breakfast, Dinner',
                image: '/assets/galle-1.webp', location: 'Galle',
                activity: 'Coastal drive & fort exploration',
            },
            {
                day: 9, title: 'Galle → Airport Departure',
                description: "A leisurely final morning — stroll the Galle Fort ramparts one last time, browse the independent bookshops and gem dealers, and enjoy a farewell brunch at a colonial café. Your driver then transfers you along the scenic expressway to Bandaranaike International Airport for your departure, carrying home the ancient, wild, and beautiful spirit of Sri Lanka.",
                highlights: ['Morning Galle Fort stroll', 'Colonial-café farewell brunch', 'Scenic expressway transfer', 'Airport departure'],
                accommodation: 'N/A (departure day)', meals: 'Breakfast, Brunch',
                image: '/assets/bandaranaike-international-airport.webp', location: 'Galle / Airport',
                activity: 'Departure transfer',
            },
        ],
        departures: 'Daily year-round',
        bestTime: 'October – April (dry season)',
        startLocation: 'Colombo Airport (CMB)',
        endLocation: 'Colombo Airport (CMB)',
        mapPoints: [
            { id: 'airport', name: 'Airport', type: 'Arrival / Departure', cx: 21, cy: 90, description: 'Bandaranaike International Airport — your arrival & departure point.', image: '/assets/bandaranaike-international-airport.webp' },
            { id: 'negombo', name: 'Negombo', type: 'Beach Town', cx: 20, cy: 89, description: 'Golden beaches, Dutch canals & the freshest seafood on the west coast.', image: '/assets/negombo-1.webp' },
            { id: 'anuradhapura', name: 'Anuradhapura', type: 'Sacred City', cx: 38, cy: 54, description: "Sri Lanka's first ancient capital — sacred Buddhist city dating to 4th century BC.", image: '/assets/anuradhapura/ruwanweliseya-anuradhapura-gallery-1.webp' },
            { id: 'dambulla', name: 'Dambulla', type: 'Cave Temple', cx: 46, cy: 69, description: '153 Buddha statues and vivid frescoes in five sacred caves.', image: '/assets/dambulla/dambulla-1.webp' },
            { id: 'polonnaruwa', name: 'Polonnaruwa', type: 'Ancient City', cx: 57, cy: 66, description: "11th-century medieval capital with perfectly preserved ruins.", image: '/assets/pollonnaruwa/galviharaya-polonnaruwa.webp' },
            { id: 'kandy', name: 'Kandy', type: 'Royal Capital', cx: 45, cy: 87, description: 'Last royal capital & home of the Sacred Tooth Relic.', image: '/assets/kandy/kandy-1.webp' },
            { id: 'hatton', name: 'Hatton', type: 'Hill Country', cx: 44, cy: 100, description: "Tea trails, World's End & misty highland beauty.", image: '/assets/hatton/hatton-1.webp' },
            { id: 'yala', name: 'Yala', type: 'National Park', cx: 70, cy: 120, description: "Highest leopard density in the world — elephants, bears & exotic birdlife.", image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp' },
            { id: 'galle', name: 'Galle', type: 'Colonial Fort', cx: 32, cy: 127, description: '400-year-old Dutch fort — UNESCO gem on the southern coast.', image: '/assets/galle-1.webp' },
        ],
        mapRoutePoints: '21,90 20,89 38,54 46,69 57,66 45,87 44,100 70,120 32,127 21,90',
        faq: [
            { question: 'Can I climb Sigiriya if I have a fear of heights?', answer: 'The climb involves some exposed sections but there are safety railings throughout. Many people with mild vertigo complete it fine. We can arrange a guide to assist you at every step.' },
            { question: 'Is this tour suitable for children?', answer: 'Yes! The Cultural Classic is ideal for families. The Sigiriya climb is the most strenuous activity — children 7 and above typically manage it well with encouragement.' },
            { question: "What should I wear at religious sites?", answer: 'Both shoulders and knees must be covered at all Buddhist temples. We recommend light, breathable linen trousers and a scarf/shawl. Shoes must be removed at most temple entrances.' },
            { question: 'Is the tour operated privately or in a group?', answer: 'Your tour is fully private with your own vehicle, driver, and guide. You set the pace — if you want more time at Sigiriya or a shorter day, we accommodate you.' },
            { question: 'How strenuous is the Yala safari?', answer: 'The safari is entirely vehicle-based in a 4x4 jeep. No walking is required. Early morning departures can be chilly, so bring a light jacket.' },
        ],
    },
    {
        id: 'coastal-escape',
        category: 'beach',
        title: 'Coastal Escape',
        subtitle: 'Sun, Surf & Serenity',
        tagline: 'Five days of turquoise seas, whale songs & golden sands',
        heroImage: '/assets/hikkaduwa-beach-1.webp',
        galleryImages: [
            '/assets/hikkaduwa-beach-1.webp',
            '/assets/bentota-beach.webp',
            '/assets/galle-1.webp',
            '/assets/unawatuna-beach-1.webp',
            '/assets/hero-mirissa-whale.jpg',
        ],
        price: 980,
        priceLabel: 'per person (twin share)',
        duration: '5 Days / 4 Nights',
        days: 5,
        nights: 4,
        group: 'Up to 10',
        difficulty: 'Easy',
        badge: 'Popular',
        badgeColor: '#2D9CDB',
        accent: '#2D9CDB',
        rating: 4.8,
        reviews: 195,
        overview: `Sri Lanka's southern coastline is one of the Indian Ocean's most captivating stretches — a 200 km arc of palm-fringed beaches, thriving coral reefs, and sleepy fishing villages where time moves to the rhythm of the tides. This 5-day coastal journey takes you snorkelling above Hikkaduwa's rainbow reef, whale-watching off Mirissa (the world's top blue whale spot), exploring the Dutch-colonial ramparts of Galle Fort, and simply surrendering to the languid beauty of Unawatuna's golden crescent. Perfect for couples, families and solo travellers seeking sun, sea and soul.`,
        highlights: [
            'Snorkelling at Hikkaduwa coral reef',
            'Whale & dolphin watching off Mirissa',
            'Sunset walk on Galle Fort ramparts',
            'Sea turtle nesting beach night visit',
            'Unawatuna golden beach sunset',
            'Fresh-catch seafood BBQ dinner',
        ],
        included: [
            'Private vehicle & driver throughout',
            '4 nights boutique beach accommodation',
            'Daily breakfast + 2 seafood dinners',
            'Snorkelling equipment & boat',
            'Whale-watching boat trip (3h)',
            'Galle Fort walking tour with guide',
            'Airport transfers',
        ],
        excluded: [
            'International flights',
            'Travel insurance',
            'Personal expenses',
            'Optional surfing lessons',
            'Scuba diving',
        ],
        itinerary: [
            {
                day: 1, title: 'Arrival → Hikkaduwa',
                description: 'Arrive at Colombo and head south along the coastal highway, the Indian Ocean glittering to your right. Check into your beachside villa in Hikkaduwa and end the day with a sunset cocktail watching local fishermen haul in their nets.',
                highlights: ['Coastal highway scenic drive', 'Hikkaduwa beach arrival', 'Sunset cocktail on the beach'],
                accommodation: 'Coral Sands Hotel, Hikkaduwa', meals: 'Dinner',
                image: '/assets/hikkaduwa-beach-1.webp', location: 'Hikkaduwa',
                activity: 'Beach Relaxation',
            },
            {
                day: 2, title: 'Hikkaduwa Reef Snorkelling',
                description: "Spend the morning exploring Hikkaduwa's coral sanctuary — one of Sri Lanka's most vibrant reefs, home to sea turtles, parrot fish, moray eels and vivid coral gardens. Afternoon is free to surf, kayak, or simply read under a palm.",
                highlights: ['3-hour guided snorkelling tour', 'Sea turtle encounters', 'Coral garden exploration', 'Optional surf lesson'],
                accommodation: 'Coral Sands Hotel, Hikkaduwa', meals: 'Breakfast',
                image: '/assets/beach-activities/Snorkeling.webp', location: 'Hikkaduwa Reef',
                activity: 'Snorkelling',
            },
            {
                day: 3, title: 'Galle Fort → Mirissa',
                description: "Galle Fort is the best-preserved colonial fortification in Asia — a UNESCO World Heritage site where Dutch ramparts, colonial villas, boutique cafés and jewellery studios coexist in perfect harmony. Wander its cobblestone lanes, climbing the lighthouse for sweeping ocean views before continuing to the pristine bay of Mirissa.",
                highlights: ['Galle Fort guided walking tour', 'Dutch Reformed Church visit', 'Lighthouse panoramic views', 'Mirissa beach sunset'],
                accommodation: 'Paradise Beach Club, Mirissa', meals: 'Breakfast, Dinner',
                image: '/assets/galle-1.webp', location: 'Galle / Mirissa',
                activity: 'Heritage Tour',
            },
            {
                day: 4, title: 'Whale Watching → Unawatuna',
                description: "Set sail at dawn on a 3-hour whale watching expedition — Mirissa is the world's premier blue whale site, with sightings almost guaranteed between November and April. Spot blue whales, sperm whales, spinner dolphins and flying fish before taking a short drive to relax on Unawatuna's golden crescent.",
                highlights: ['Blue whale watching (3h boat trip)', 'Spinner dolphin encounters', 'Unawatuna beach afternoon', 'Fresh seafood dinner'],
                accommodation: 'The Sun House, Galle (Unawatuna Area)', meals: 'Breakfast, Dinner',
                image: '/assets/hero-mirissa-whale.jpg', location: 'Mirissa / Unawatuna',
                activity: 'Whale Watching Safari',
            },
            {
                day: 5, title: 'Unawatuna Beach → Departure',
                description: 'A final morning at Unawatuna — arguably Sri Lanka\'s most beautiful cove, framed by jungle-clad headlands and shallow turquoise waters. Enjoy a final dip in the ocean and souvenir shopping before your transfer north to Colombo airport.',
                highlights: ['Unawatuna golden beach morning', 'Souvenir shopping', 'Coastal market visit', 'Airport departure transfer'],
                accommodation: 'N/A (departure day)', meals: 'Breakfast',
                image: '/assets/unawatuna-beach-1.webp', location: 'Unawatuna / Colombo',
                activity: 'Departure',
            },
        ],
        departures: 'Daily year-round',
        bestTime: 'November – April (south coast)',
        startLocation: 'Colombo Airport (CMB)',
        endLocation: 'Colombo Airport (CMB)',
        mapPoints: [
            { id: 'colombo', name: 'Colombo / Airport', type: 'Arrival', cx: 21, cy: 90, description: 'Gateway city, your starting point.', image: '/assets/bandaranaike-international-airport.webp' },
            { id: 'hikkaduwa', name: 'Hikkaduwa', type: 'Snorkelling', cx: 26, cy: 115, description: 'Vibrant coral reef and sea turtle encounters.', image: '/assets/hikkaduwa-beach-1.webp' },
            { id: 'galle', name: 'Galle', type: 'UNESCO Fort', cx: 32, cy: 127, description: 'Best-preserved colonial fortress in Asia.', image: '/assets/galle-1.webp' },
            { id: 'unawatuna', name: 'Unawatuna', type: 'Golden Beach', cx: 34, cy: 128, description: "Sri Lanka's most beautiful cove beach.", image: '/assets/unawatuna-beach-1.webp' },
            { id: 'mirissa', name: 'Mirissa', type: 'Whale Watching', cx: 40, cy: 130, description: "World's #1 blue whale watching destination.", image: '/assets/mirissa-1.webp' },
        ],
        mapRoutePoints: '21,90 26,115 32,127 34,128 40,130',
        faq: [
            { question: "When is the best time for whale watching off Mirissa?", answer: 'November to April is peak whale-watching season. Blue whale sightings are almost guaranteed from December to March. We offer full refunds or free rescheduling if weather prevents sailing.' },
            { question: 'Can I learn to surf on this tour?', answer: 'Absolutely! We can add a surf lesson at Hikkaduwa or Unawatuna. Instructors are certified and the waves are beginner-friendly along the south coast in season.' },
            { question: 'Is the snorkelling suitable for non-swimmers?', answer: 'Yes — life jackets and basic snorkelling equipment are provided. Our guides stay close to non-swimmers. The Hikkaduwa reef is in a very calm, shallow area.' },
            { question: 'Are the beach accommodations directly on the beach?', answer: 'Yes. We select boutique properties with direct beach access. You can walk from your room onto the sand within 30 seconds.' },
        ],
    },
    {
        id: 'wildlife-safari',
        category: 'wildlife',
        title: 'Ultimate Safari',
        subtitle: 'Giants, Leopards & Wild Skies',
        tagline: "Sri Lanka's wilderness through the eyes of a naturalist",
        heroImage: '/assets/yala-national-park-1.webp',
        galleryImages: [
            '/assets/yala-national-park-1.webp',
            '/assets/wild-life/minneriya-national-park-1.webp',
            '/assets/wild-life/gal-oya-national-park-sri-lanka-1.webp',
            '/assets/wild-life/wilpattu-national-park-sri-lanka-1.webp',
        ],
        price: 1950,
        priceLabel: 'per person (twin share)',
        duration: '8 Days / 7 Nights',
        days: 8,
        nights: 7,
        group: 'Up to 8',
        difficulty: 'Moderate',
        badge: 'Premium',
        badgeColor: '#D4842A',
        accent: '#D4842A',
        rating: 4.9,
        reviews: 215,
        overview: `Sri Lanka is one of Asia's great wildlife destinations — a compact island that packs in leopards, elephants, sloth bears, blue whales and 400 species of bird within its borders. This 8-day Ultimate Safari is the most comprehensive wildlife circuit available. You'll track elusive leopards in the dense forests of Wilpattu, witness the greatest elephant gathering on Earth at Minneriya, embark on a unique boat safari in Gal Oya, get up close with herds in Udawalawe, scour Yala's high-density leopard zones, and finally head into the deep ocean off Mirissa to watch blue whales. Guided entirely by our expert naturalist with 15 years of tracking experience.`,
        highlights: [
            'Leopard & sloth bear tracking in Wilpattu',
            'Minneriya Elephant Gathering (up to 300 elephants)',
            'Exclusive boat safari in Gal Oya National Park',
            'Dawn leopard tracking in Yala National Park',
            'Blue whale watching expedition in Mirissa',
            'Expert naturalist guide (15 years experience)',
        ],
        included: [
            'All ground transport in 4WD safari jeep & AC van',
            '7 nights premium eco-lodge & camp accommodation',
            'Full board meals (breakfast, lunch, dinner)',
            'Expert naturalist guide throughout',
            'All national park entrance & jeep fees',
            'Gal Oya boat safari conservation fee',
            'Mirissa whale watching boat tour',
            'Airport transfers',
        ],
        excluded: [
            'International flights',
            'Travel insurance',
            'Alcoholic beverages',
            'Personal gratuities',
            'Optional night walks',
        ],
        itinerary: [
            {
                day: 1, title: 'Arrival → Wilpattu National Park',
                description: 'Your naturalist guide meets you at the airport. Drive north to Wilpattu National Park — Sri Lanka\'s largest and oldest reserve. Known for its "villus" (natural lakes), it\'s a prime territory for leopards and the elusive Sri Lankan sloth bear. Settle into your luxury tented camp.',
                highlights: ['Airport naturalist briefing', 'Drive to north-western dry zone', 'Campfire dinner under the stars'],
                accommodation: 'Mahoora Tented Safari Camp, Wilpattu', meals: 'Dinner',
                image: '/assets/wild-life/wilpattu-national-park-sri-lanka-2.webp', location: 'Wilpattu',
                activity: 'Arrival & Briefing',
            },
            {
                day: 2, title: 'Wilpattu Safari → Minneriya',
                description: 'Rise at dawn for a full-morning game drive in Wilpattu. The dense forest cover occasionally breaks to reveal shimmering lakes where leopards often come to drink. In the afternoon, journey to the Cultural Triangle to prepare for the Elephant Gathering.',
                highlights: ['Dawn Wilpattu game drive (4h)', 'Sloth bear & leopard tracking', 'Scenic drive to Habarana'],
                accommodation: 'Cinnamon Lodge, Habarana', meals: 'Breakfast, Lunch, Dinner',
                image: '/assets/wild-life/wilpattu-national-park-sri-lanka-1.webp', location: 'Wilpattu / Habarana',
                activity: 'Jeep Safari',
            },
            {
                day: 3, title: 'Minneriya Elephant Gathering → Gal Oya',
                description: 'The greatest wildlife spectacle in Asia unfolds before you. Up to 300 Asian elephants arrive at the Minneriya reservoir in the late afternoon. Watch breeding herds, bachelor groups, and calves interact. Afterwards, drive east to the remote, untouched wilderness of Gal Oya.',
                highlights: ['Minneriya Elephant Gathering game drive', 'Up to 300 elephants in one location', 'Nightfall arrival at eco-lodge'],
                accommodation: 'Gal Oya Lodge', meals: 'Breakfast, Lunch, Dinner',
                image: '/assets/wild-life/minneriya-national-park-1.webp', location: 'Minneriya / Gal Oya',
                activity: 'Elephant Safari',
            },
            {
                day: 4, title: 'Gal Oya Boat Safari',
                description: 'Gal Oya is the only national park in Sri Lanka where you can do a boat safari. Navigate the Senanayake Samudraya reservoir, watching for the incredible sight of wild elephants swimming between islands. Keep an eye out for crocodiles and rare birdlife along the shores.',
                highlights: ['Morning boat safari on reservoir', 'Swimming elephants', 'Indigenous Vedda tribe village visit (optional)', 'Jungle walk'],
                accommodation: 'Gal Oya Lodge', meals: 'Breakfast, Lunch, Dinner',
                image: '/assets/wild-life/gal-oya-national-park-sri-lanka-1.webp', location: 'Gal Oya',
                activity: 'Boat Safari',
            },
            {
                day: 5, title: 'Udawalawe — Elephants & Eagles',
                description: 'Drive south to Udawalawe National Park, one of the best places in Asia to see wild elephants at close range. An afternoon game drive reveals herds, buffalo, mongoose, crocodile and the regal serpent eagle in the tall savanna grass.',
                highlights: ['Southward scenic drive', 'Afternoon Udawalawe game drive (3h)', 'Serpent eagle & kingfisher sightings'],
                accommodation: 'Kalu\'s Hideaway, Embilipitiya', meals: 'Breakfast, Lunch, Dinner',
                image: '/assets/wild-life/udawalawe-national-park-1.webp', location: 'Udawalawe',
                activity: 'Jeep Safari',
            },
            {
                day: 6, title: 'Yala National Park — Leopard Territory',
                description: 'The big day. Yala Block 1 has the world\'s highest density of leopards — approximately 30 per 100 sq km. Your expert naturalist knows the territory intimately. Dawn and dusk game drives maximise sightings: leopards, sloth bears, wild boar, crocodile, and painted storks.',
                highlights: ['Dawn leopard tracking game drive (4h)', 'Block 1 — highest leopard density globally', 'Sunset game drive with naturalist'],
                accommodation: 'Wild Coast Tented Lodge, Yala', meals: 'Breakfast, Lunch, Dinner',
                image: '/assets/yala-national-park-1.webp', location: 'Yala',
                activity: 'Intensive Jeep Safari',
            },
            {
                day: 7, title: 'Yala → Mirissa Whale Watching',
                description: 'Leave the jungle behind and hit the southern coast. Settle into Mirissa and spend the afternoon at leisure. Tomorrow morning you trade the land giants for ocean giants on an expedition to find the elusive blue whale.',
                highlights: ['Morning coastline drive', 'Leisure afternoon on Mirissa Beach', 'Fresh seafood dinner on the sand'],
                accommodation: 'Paradise Beach Club, Mirissa', meals: 'Breakfast, Dinner',
                image: '/assets/mirissa-1.webp', location: 'Mirissa',
                activity: 'Coastal Relaxation',
            },
            {
                day: 8, title: 'Blue Whales → Departure',
                description: 'Set sail at dawn on a 3-hour expedition. Mirissa is the world\'s premier blue whale site, with frequent sightings of sperm whales and spinner dolphins. After returning ashore, your naturalist transfers you to Colombo Airport, concluding an extraordinary 8 days of wildlife.',
                highlights: ['Blue whale watching (3h boat trip)', 'Spinner dolphin encounters', 'Colombo airport transfer'],
                accommodation: 'N/A (departure day)', meals: 'Breakfast',
                image: '/assets/hero-mirissa-whale.jpg', location: 'Mirissa / Airport',
                activity: 'Ocean Expedition & Departure',
            },
        ],
        departures: 'Daily year-round (peak wildlife seasons applied per region)',
        bestTime: 'February – July (Yala), August – October (Minneriya)',
        startLocation: 'Colombo Airport (CMB)',
        endLocation: 'Colombo Airport (CMB)',
        mapPoints: [
            { id: 'colombo', name: 'Colombo', type: 'Arrival', cx: 20, cy: 88, description: 'International gateway city.', image: '/assets/bandaranaike-international-airport.webp' },
            { id: 'wilpattu', name: 'Wilpattu', type: 'Sloth Bears', cx: 37, cy: 54, description: 'Dense forest, natural lakes & elusive wildlife.', image: '/assets/wild-life/wilpattu-national-park-sri-lanka-1.webp' },
            { id: 'minneriya', name: 'Minneriya', type: 'Elephant Gathering', cx: 50, cy: 70, description: 'Up to 300 elephants gather at the ancient reservoir.', image: '/assets/wild-life/minneriya-national-park-1.webp' },
            { id: 'galoya', name: 'Gal Oya', type: 'Boat Safari', cx: 68, cy: 85, description: 'Swimming elephants & untouched lakes.', image: '/assets/wild-life/gal-oya-national-park-sri-lanka-1.webp' },
            { id: 'udawalawe', name: 'Udawalawe', type: 'Elephant Safari', cx: 48, cy: 108, description: 'Best place to see wild elephant herds.', image: '/assets/wild-life/udawalawe-national-park-1.webp' },
            { id: 'yala', name: 'Yala', type: 'Leopard Tracking', cx: 64, cy: 116, description: "World's highest density of leopards.", image: '/assets/yala-national-park-1.webp' },
            { id: 'mirissa', name: 'Mirissa', type: 'Blue Whales', cx: 40, cy: 130, description: "Ocean giants off the southern coast.", image: '/assets/hero-mirissa-whale.jpg' },
        ],
        mapRoutePoints: '20,88 37,54 50,70 68,85 48,108 64,116 40,130 20,88',
        faq: [
            { question: 'Is a leopard sighting guaranteed in Yala?', answer: 'No wildlife sighting can be 100% guaranteed — these are wild animals. However, Yala Block 1 has the world\'s highest leopard density and our expert naturalist has 15 years of tracking experience, giving you the best possible odds.' },
            { question: 'What is unique about Gal Oya?', answer: 'It is the only park offering boat safaris in Sri Lanka. It is incredibly remote and peaceful, and seeing wild elephants swim from island to island in the reservoir is a truly rare, world-class experience.' },
            { question: 'What should I bring on safari?', answer: 'Neutral-coloured clothing (khaki, olive, beige), sunscreen, a hat, insect repellent, binoculars, and a camera with a telephoto lens. We provide water and snacks on the jeep.' },
            { question: 'Are the game drives in open or closed vehicles?', answer: 'All land safaris use open-roof 4WD safari jeeps that seat 4–6 comfortably, allowing 360° wildlife viewing and photography without obstructions.' },
        ],
    },
    {
        id: 'highland-retreat',
        category: 'nature',
        title: 'Highland Retreat',
        subtitle: 'Tea, Mist & Mountain Trails',
        tagline: "Journey into the emerald roof of Sri Lanka",
        heroImage: '/assets/horton-plains-1.webp',
        galleryImages: [
            '/assets/horton-plains-1.webp',
            '/assets/kandy/kandy-1.webp',
            '/assets/nuwara-eliya/nuwara-eliya-1.webp',
            '/assets/ella/ella-1.webp',
        ],
        price: 1350,
        priceLabel: 'per person (twin share)',
        duration: '7 Days / 6 Nights',
        days: 7,
        nights: 6,
        group: 'Up to 10',
        difficulty: 'Moderate',
        badge: 'Scenic',
        badgeColor: '#52B788',
        accent: '#52B788',
        rating: 4.8,
        reviews: 241,
        overview: `The Sri Lankan highlands form one of the world's most dramatic tea landscapes — a rolling emerald quilt of perfectly manicured bushes draped over ancient peaks. This 7-day highland escape climbs from the sacred city of Kandy, into the colonial hill station of Nuwara Eliya, through the cloud forests of Horton Plains, and finally to the misty mountain village of Ella — culminating in one of the world's most beautiful rail rides.`,
        highlights: [
            "Temple of the Sacred Tooth Relic in Kandy",
            "Private tea factory & premium tea tasting",
            "World's End cliff walk at dawn (Horton Plains)",
            "Iconic train ride from Nuwara Eliya to Ella",
            "Nine Arch Bridge & Little Adam's Peak",
            "Colonial heritage walk in 'Little England'"
        ],
        included: [
            'Private AC vehicle & experienced driver/guide',
            '6 nights heritage & boutique accommodation',
            'Daily breakfast and dinner (Half Board)',
            'First-class train tickets (Nanu Oya to Ella)',
            'Horton Plains national park entrance fees',
            'Temple of the Tooth Relic entrance',
            'Tea factory private tour & tasting',
            'Airport transfers',
        ],
        excluded: [
            'International flights',
            'Travel insurance',
            'Personal expenses',
            'Lunch (allows local dining exploration)',
            'Optional hot air balloon over tea country',
        ],
        itinerary: [
            {
                day: 1, title: 'Arrival → Kandy',
                description: 'Arrive at Bandaranaike International Airport where your driver welcomes you. Drive to Kandy, the last royal capital of Sri Lanka. In the evening, witness a traditional Kandyan cultural dance and visit the sacred Temple of the Tooth Relic during the evening ceremony.',
                highlights: ['Airport welcome', 'Scenic drive into the hills', 'Kandyan cultural dance', 'Temple of the Tooth Relic'],
                accommodation: 'Amaya Hills, Kandy', meals: 'Dinner',
                image: '/assets/kandy/kandy-1.webp', location: 'Kandy',
                activity: 'Culture & Heritage'
            },
            {
                day: 2, title: 'Kandy → Nuwara Eliya',
                description: 'The road from Kandy to Nuwara Eliya is one of Asia\'s great drives — climbing through rubber estates, waterfalls, and terraced tea gardens as the temperature drops. En route, stop at Ramboda Falls. Arrive at your colonial-era hotel in Nuwara Eliya, nicknamed "Little England".',
                highlights: ['Peradeniya Botanical Gardens', 'Ramboda Falls', 'Scenic mountain drive', 'Colonial hotel check-in'],
                accommodation: 'Grand Hotel, Nuwara Eliya', meals: 'Breakfast, Dinner',
                image: '/assets/nuwara-eliya/nuwara-eliya-1.webp', location: 'Nuwara Eliya',
                activity: 'Scenic Drive & Sightseeing'
            },
            {
                day: 3, title: "Horton Plains & Tea Trails",
                description: "Set out at dawn for Horton Plains National Park — a mystical cloud forest plateau at 2,100m. Walk the 9km circuit to World's End, a sheer 880m escarpment. In the afternoon, visit a working tea factory to trace a single leaf from bush to cup, ending with a Golden Tips tasting.",
                highlights: ["World's End sheer cliff at dawn", "Baker's Falls", 'Private tea factory tour', 'Premium tea tasting session'],
                accommodation: 'Grand Hotel, Nuwara Eliya', meals: 'Breakfast, Dinner',
                image: '/assets/horton-plains-1.webp', location: 'Horton Plains / Nuwara Eliya',
                activity: 'Trekking & Tea Culture'
            },
            {
                day: 4, title: 'The World\'s Most Scenic Train Ride',
                description: "Board the famous blue train at Nanu Oya station for a mesmerising 3-hour journey to Ella. The train weaves through lush tea estates, dark tunnels, and pine forests, offering breathtaking valley views from the open windows. Arrive in the backpacker haven of Ella.",
                highlights: ['First-class train journey', 'Unmatched tea country views', 'Ella village exploration', 'Cafe culture in the mountains'],
                accommodation: '98 Acres Resort & Spa, Ella', meals: 'Breakfast, Dinner',
                image: '/assets/ella/ella-1.webp', location: 'Ella',
                activity: 'Iconic Train Journey'
            },
            {
                day: 5, title: "Ella's Iconic Landscapes",
                description: "Start the day with a gentle hike up Little Adam's Peak for a 360° panorama of the Ella Gap. Later, walk through the jungle to reach the spectacular Nine Arch Bridge just in time to watch a train curve across its colonial-era stone arches. Relax by the pool in the afternoon.",
                highlights: ["Little Adam's Peak viewpoint hike", 'Nine Arch Bridge photography', 'Ravana Falls', 'Sunset views over Ella Gap'],
                accommodation: '98 Acres Resort & Spa, Ella', meals: 'Breakfast, Dinner',
                image: '/assets/ella/ella-1.webp', location: 'Ella',
                activity: 'Hiking & Photography'
            },
            {
                day: 6, title: 'Ella → Colombo / West Coast',
                description: 'Begin your descent from the highlands back to the west coast. Stop briefly to admire the dramatic cascading waters of Ravana Falls before joining the highway to Colombo. Spend your final evening enjoying a farewell dinner overlooking the Indian Ocean.',
                highlights: ['Descent from the hills', 'Ravana Falls', 'Galle Face Green sunset', 'Farewell seafood dinner'],
                accommodation: 'Taj Samudra, Colombo', meals: 'Breakfast, Dinner',
                image: '/assets/colombo-1.webp', location: 'Colombo',
                activity: 'Descent & City Evening'
            },
            {
                day: 7, title: 'Colombo → Departure',
                description: 'Enjoy a leisurely breakfast and some last-minute souvenir shopping at a local boutique or tea emporium. Your driver will then transfer you to Bandaranaike International Airport in time for your onward flight, carrying a treasury of highland memories.',
                highlights: ['Leisurely breakfast', 'Last-minute tea shopping', 'Airport transfer'],
                accommodation: 'N/A (departure day)', meals: 'Breakfast',
                image: '/assets/bandaranaike-international-airport.webp', location: 'Airport',
                activity: 'Departure'
            },
        ],
        departures: 'Daily year-round',
        bestTime: "January – April (clearest skies in the highlands)",
        startLocation: 'Colombo Airport (CMB)',
        endLocation: 'Colombo Airport (CMB)',
        mapPoints: [
            { id: 'colombo', name: 'Colombo', type: 'Arrival', cx: 20, cy: 88, description: 'Your arrival gateway.', image: '/assets/bandaranaike-international-airport.webp' },
            { id: 'kandy', name: 'Kandy', type: 'Sacred City', cx: 42, cy: 82, description: 'Temple of the Tooth & Botanical Gardens.', image: '/assets/kandy/kandy-1.webp' },
            { id: 'nuwaraeliya', name: 'Nuwara Eliya', type: 'Tea Country', cx: 46, cy: 90, description: 'Colonial hill station inside emerald tea estates.', image: '/assets/nuwara-eliya/nuwara-eliya-1.webp' },
            { id: 'hortonplains', name: 'Horton Plains', type: "World's End Trek", cx: 44, cy: 93, description: "880m sheer cliff with views to infinity.", image: '/assets/horton-plains-1.webp' },
            { id: 'ella', name: 'Ella', type: 'Mountain Village', cx: 58, cy: 98, description: 'Iconic train ride & Nine Arch Bridge.', image: '/assets/ella/ella-1.webp' },
        ],
        mapRoutePoints: '20,88 42,82 46,90 44,93 58,98 20,88',
        faq: [
            { question: "How difficult is the World's End hike?", answer: "The Horton Plains circuit is a 9km walk on well-maintained trails taking 3–4 hours at a leisurely pace. There is one steep section near Baker's Falls. Good walking shoes are essential." },
            { question: 'Is the scenic train ride guaranteed?', answer: "We book train tickets in advance for the Nanu Oya to Ella route. This is one of the world's great rail journeys and demand is high, so booking early with us is recommended." },
            { question: 'Will it be cold in the highlands?', answer: 'Nuwara Eliya and Horton Plains can be cold — temperatures drop to 8–14°C at night and early morning. Pack one warm layer and a light jacket. Daytime can be comfortably warm.' },
            { question: 'Can I buy tea directly at the factory?', answer: 'Yes! Your private tea factory tour includes a tasting session and the opportunity to purchase premium teas directly from the source, including rare Silver Tips and Golden Tips.' },
        ],
    },
    {
        id: 'adventure-rush',
        category: 'adventure',
        title: 'Adventure Rush',
        subtitle: 'Rapids, Peaks & Adrenaline',
        tagline: 'Push your limits in the heart of Sri Lanka',
        heroImage: '/assets/kitulgala-1.webp',
        galleryImages: [
            '/assets/kitulgala-1.webp',
            '/assets/dambulla/knuckles.webp',
            '/assets/ella/ella-1.webp',
            '/assets/sunandsand/weligama-beach-sri-lanka1.webp',
        ],
        price: 1850,
        priceLabel: 'per person (twin share)',
        duration: '8 Days / 7 Nights',
        days: 8,
        nights: 7,
        group: 'Up to 8',
        difficulty: 'Challenging',
        badge: 'Thrilling',
        badgeColor: '#F97316',
        accent: '#F97316',
        rating: 4.9,
        reviews: 218,
        overview: `Sri Lanka is Southeast Asia's undiscovered adventure playground — where Grade 3–4 rapids tear through pristine jungle gorges, where rugged mountain ranges offer genuine technical climbing, and where world-class swells hit palm-fringed breaks. This 8-day adrenaline itinerary combines the rush of Kelani River white-water rafting, arduous trekking in the Knuckles Mountain Range, scaling the exposed faces of Ella Rock, tracking leopards in Yala, and finally riding the famous surfing waves on the southern coast at Weligama — all guided by certified professionals.`,
        highlights: [
            'Grade 3–4 white-water rafting in Kitulgala',
            'Full-day trekking in Knuckles Mountain Range',
            'Ella Rock technical climb & zipline',
            '4WD Wildlife Safari in Yala National Park',
            'Surfing lessons on Weligama beach',
            'Scenic train ride into the highlands',
        ],
        included: [
            'All adventure activity fees & gear',
            'Certified adventure/surf instructors',
            'Private 4WD transport & driver',
            '7 nights adventure lodge & camp accommodation',
            'Daily breakfast and 4 dinners',
            'Yala National Park entrance & jeep fees',
            'Medical first-aid kit throughout',
            'Airport transfers',
        ],
        excluded: [
            'International flights',
            'Travel insurance (mandatory for adventure sports)',
            'Personal expenses',
            'Lunches (for flexibility during activities)',
            'GoPro footage package (+$50)',
        ],
        itinerary: [
            {
                day: 1, title: 'Arrival → Kitulgala Jungle Camp',
                description: "Arrive and transfer to Kitulgala — Sri Lanka's adventure capital. Safety briefing from your certified guides, gear fitting, and an evening at the jungle camp with river sounds as your soundtrack.",
                highlights: ['Adventure safety briefing', 'Jungle camp arrival', 'Campfire dinner'],
                accommodation: 'Borderlands Adventure Camp, Kitulgala', meals: 'Dinner',
                image: '/assets/kitulgala-1.webp', location: 'Kitulgala',
                activity: 'Jungle Arrival'
            },
            {
                day: 2, title: 'White-Water Rafting → Kandy',
                description: "The Kelani River offers Asia's most consistent white water — Grade 3–4 rapids through a jungle gorge. Leap from rock platforms into calm pools and zip-line over the river. Afternoon transfer to Kandy for a cultural evening.",
                highlights: ['5km white-water rafting', 'Canyon rock jumping', 'Temple of the Tooth visit'],
                accommodation: 'OZO Kandy', meals: 'Breakfast, Dinner',
                image: '/assets/kitulgala-1.webp', location: 'Kitulgala / Kandy',
                activity: 'White-Water Rafting'
            },
            {
                day: 3, title: 'Knuckles Mountain Range Trekking',
                description: 'Venture into the Knuckles UNESCO World Heritage site. A challenging full-day hike through rare cloud forests, crossing cascading streams and reaching panoramic viewpoints of the central massif. You will encounter endemic flora and unique birdlife.',
                highlights: ['Knuckles full-day hike', 'Cloud forest exploration', 'Remote waterfall swimming'],
                accommodation: 'Corbet\'s Rest, Knuckles', meals: 'Breakfast, Packed Lunch, Dinner',
                image: '/assets/dambulla/knuckles.webp', location: 'Knuckles Range',
                activity: 'Mountain Trekking'
            },
            {
                day: 4, title: 'Scenic Train to Ella',
                description: "Board the legendary hill-country train heading south to Ella. Wind through dense pine forests and endless tea estates on a 4-hour journey. Settle into the backpacker mountain town of Ella and rest up for tomorrow's climb.",
                highlights: ['Iconic train journey', 'Ella village exploration', 'Cafe culture in the mountains'],
                accommodation: '98 Acres Resort, Ella', meals: 'Breakfast',
                image: '/assets/ella/ella-1.webp', location: 'Ella',
                activity: 'Highland Train Journey'
            },
            {
                day: 5, title: 'Ella Rock Climbing & Zipline',
                description: "Ella Rock (1,041m) offers genuine technical climbing on exposed ridges with epic valley views. After conquering the peak, fly across the tea estates on South Asia's longest zipline. Evening relaxation by the pool.",
                highlights: ['Ella Rock summit', 'Ravana Mega Zipline', 'Afternoon pool recovery'],
                accommodation: '98 Acres Resort, Ella', meals: 'Breakfast, Dinner',
                image: '/assets/ella/ella-1.webp', location: 'Ella',
                activity: 'Rock Climbing & Ziplining'
            },
            {
                day: 6, title: 'Yala National Park Safari',
                description: 'Descend from the highlands to the plains of Yala. Switch to a 4WD open-top jeep for a thrilling afternoon wildlife safari tracking leopards, sloth bears, elephants, and crocodiles through dense scrub jungle.',
                highlights: ['Descent to the coastal plains', 'Yala jeep safari (4h)', 'Leopard tracking'],
                accommodation: 'Yala Safari Beach Camp', meals: 'Breakfast, Dinner',
                image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp', location: 'Yala National Park',
                activity: '4WD Wildlife Safari'
            },
            {
                day: 7, title: 'Weligama Surfing Expedition',
                description: 'Travel west along the gorgeous southern coast to Weligama, Sri Lanka\'s premier surf destination. Join expert instructors for a 2-hour surf lesson catching perfectly rolling waves on a sandy break.',
                highlights: ['Southern coast drive', '2-hour surf lesson', 'Beachside seafood dinner', 'Weligama sunset'],
                accommodation: 'Weligama Bay Resort', meals: 'Breakfast',
                image: '/assets/sunandsand/weligama-beach-sri-lanka1.webp', location: 'Weligama Base',
                activity: 'Ocean Surfing'
             },
             {
                day: 8, title: 'Weligama Beach → Departure',
                description: "Enjoy a final morning surf session or a relaxing walk on the golden sands. Later, transfer back to Colombo Airport via the Southern Expressway, concluding an epic 8-day island adventure.",
                highlights: ['Morning beach relaxation', 'Expressway transfer', 'Colombo Airport departure'],
                accommodation: 'N/A (departure day)', meals: 'Breakfast',
                image: '/assets/bandaranaike-international-airport.webp', location: 'Airport',
                activity: 'Departure'
             },
        ],
        departures: 'Daily year-round',
        bestTime: 'October – April (higher water levels for rafting, best south coast surf)',
        startLocation: 'Colombo Airport (CMB)',
        endLocation: 'Colombo Airport (CMB)',
        mapPoints: [
            { id: 'colombo', name: 'Colombo', type: 'Arrival', cx: 20, cy: 88, description: 'Gateway and departure point.', image: '/assets/kitulgala-1.webp' },
            { id: 'kitulgala', name: 'Kitulgala', type: 'White Water Rafting', cx: 35, cy: 86, description: 'Grade 3-4 rapids on the wild Kelani River.', image: '/assets/kitulgala-1.webp' },
            { id: 'knuckles', name: 'Knuckles Range', type: 'Mountain Trekking', cx: 46, cy: 74, description: 'UNESCO cloud forest hiking.', image: '/assets/dambulla/knuckles.webp' },
            { id: 'ella', name: 'Ella', type: 'Rock Climbing', cx: 58, cy: 98, description: 'Technical climbing & epic ziplines.', image: '/assets/ella/ella-1.webp' },
            { id: 'yala', name: 'Yala', type: 'Wildlife Safari', cx: 64, cy: 116, description: 'Leopard tracking in dense jungles.', image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp' },
            { id: 'weligama', name: 'Weligama', type: 'Ocean Surfing', cx: 37, cy: 130, description: 'World-class surf breaks on the south coast.', image: '/assets/sunandsand/weligama-beach-sri-lanka1.webp' },
        ],
        mapRoutePoints: '20,88 35,86 46,74 58,98 64,116 37,130 20,88',
        faq: [
            { question: 'Do I need prior rafting or surfing experience?', answer: 'No prior experience is needed for rafting or surfing — our certified guides provide full safety briefings and lessons. For the hiking and rock climbing, a good level of physical fitness is required.' },
            { question: 'What is the minimum age for this adventure tour?', answer: 'Due to the physical nature of white-water rafting and the Knuckles trek, the recommended minimum age for this specific itinerary is 12 years old.' },
            { question: 'Is travel insurance mandatory?', answer: 'Yes — travel insurance covering adventure sports (rafting, surfing, trekking) is strictly mandatory for this tour. This package cannot be booked without confirmed coverage.' },
            { question: 'What if weather cancels an activity?', answer: 'Your safety is absolutely paramount. If river levels or coastal swells make an activity unsafe, we will seamlessly substitute an equally exciting alternative in the area.' },
        ],
    },
    {
        id: 'honeymoon-bliss',
        category: 'beach',
        title: 'Honeymoon Bliss',
        subtitle: 'Romance Across the Island',
        tagline: 'Your love story, written across paradise',
        heroImage: '/assets/honeymoon-in-beach.webp',
        galleryImages: [
            '/assets/honeymoon-in-beach.webp',
            '/assets/spa-and-wellness/Luxury-Couple-Spa-Experiences.webp',
            '/assets/culture-package/sigiriya.webp',
            '/assets/sunandsand/mirissa-sri-lanka-gallery-1.webp',
        ],
        price: 3250,
        priceLabel: 'per couple',
        duration: '12 Days / 11 Nights',
        days: 12,
        nights: 11,
        group: 'Couples Only',
        difficulty: 'Easy',
        badge: '✦ Luxury',
        badgeColor: '#F0A0B8',
        accent: '#C4687A',
        rating: 5.0,
        reviews: 142,
        overview: `Sri Lanka is a revelation for honeymooners — an island of extraordinary intimacy. This expanded 12-day bespoke journey weaves together the island's most romantic and exhilarating moments: a sunrise hot air balloon flight over ancient jungles, a private wildlife glamping experience under the stars in Yala, a candlelit catamaran dinner on the Indian Ocean, and an indulgent couples Ayurvedic ritual. Stay in seamlessly luxurious accommodations crafted specifically around the two of you in Sri Lanka's most celebrated romantic hideaways.`,
        highlights: [
            'Sunrise Hot Air Balloon ride & champagne breakfast',
            'Luxury tented glamping in Yala National Park',
            'Private beach villa with an infinity pool',
            'Couples Ayurvedic spa ritual (120 min)',
            'First-class scenic hill country train journey',
            'Private candlelit dinner on a deserted beach',
        ],
        included: [
            'Private luxury vehicle & chauffeur throughout',
            '11 nights luxury boutique & glamping accommodation',
            'Daily breakfast + 5 special romantic dinners',
            'Sunrise Hot Air Balloon flight in Dambulla',
            'Yala National Park private jeep safari',
            'Couples Ayurvedic spa ritual (120 min)',
            'First-class reserved train tickets to Ella',
            'Rose-petal turndown service each night',
            'Honeymoon amenity packages at each hotel',
            'Personalised concierge service 24/7',
        ],
        excluded: [
            'International flights',
            'Travel insurance',
            'Additional spa treatments',
            'Optional helicopter transfers (+$600)',
            'Personal shopping & gratuities',
        ],
        itinerary: [
            {
                day: 1, title: 'Arrival → Negombo Coastal Welcome',
                description: 'Your private chauffeur awaits with a personalised welcome board. Transfer to your Negombo beachside villa where a bottle of Laurent-Perrier Rosé Champagne greets you. Enjoy a spectacular sunset dinner at the water\'s edge.',
                highlights: ['Private airport welcome', 'Champagne villa arrival', 'Sunset dinner on beach terrace'],
                accommodation: 'Jetwing Blue, Negombo', meals: 'Dinner',
                image: '/assets/negombo-1.webp', location: 'Negombo',
                activity: 'Arrival & Relaxation'
            },
            {
                day: 2, title: 'Cultural Triangle — Sigiriya Sunset',
                description: 'Journey inland to the Cultural Triangle. Check into your luxury eco-lodge offering uninterrupted views of the Sigiriya Rock Fortress. Afternoon couples spa treatment followed by a secluded dinner in the jungle.',
                highlights: ['Cultural Triangle scenic drive', 'Luxury eco-lodge check-in', 'Private jungle dinner'],
                accommodation: 'Water Garden, Sigiriya', meals: 'Breakfast, Dinner',
                image: '/assets/culture-package/sigiriya.webp', location: 'Sigiriya',
                activity: 'Jungle Retreat'
            },
            {
                day: 3, title: 'Hot Air Ballooning & Ancient Ruins',
                description: 'Rise before dawn to take to the skies in a hot air balloon, drifting silently over jungle canopies and ancient lakes as the sun rises. Celebrate landing with a champagne breakfast. Later, climb the magnificent Sigiriya Rock Palace.',
                highlights: ['Sunrise Hot Air Balloon flight', 'Champagne landing breakfast', 'Sigiriya Rock Fortress climb'],
                accommodation: 'Water Garden, Sigiriya', meals: 'Breakfast',
                image: '/assets/culture-package/sigiriya.webp', location: 'Cultural Triangle',
                activity: 'Aerial Adventure'
            },
            {
                day: 4, title: 'Temple of the Tooth → Kandy',
                description: 'Travel to Kandy, the romantic hill capital cradled by mountains. Visit the golden-roofed Temple of the Tooth during the evening ceremony. Enjoy a private dinner overlooking Kandy Lake as the city illuminates.',
                highlights: ['Temple of the Tooth ceremony', 'Kandy Lake sunset walk', 'Rooftop dinner over the lake'],
                accommodation: 'The Kandy House', meals: 'Breakfast, Dinner',
                image: '/assets/kandy/kandy-1.webp', location: 'Kandy',
                activity: 'Heritage & Romance'
            },
            {
                day: 5, title: 'Nuwara Eliya — "Little England"',
                description: 'Wind your way up into the cool, misty highlands clothed in emerald tea estates. Arrive in Nuwara Eliya and enjoy a traditional British high tea at the Grand Hotel, followed by a romantic boat ride on Lake Gregory.',
                highlights: ['Mountain switchback drive', 'Grand Hotel High Tea', 'Lake Gregory boat ride'],
                accommodation: 'Heritance Tea Factory', meals: 'Breakfast',
                image: '/assets/tea-plantation-1.webp', location: 'Nuwara Eliya',
                activity: 'Highland Serenity'
            },
            {
                day: 6, title: 'Scenic Train to Ella',
                description: 'Board Sri Lanka\'s most famous train in a first-class reserved carriage. Watch the world transform from tropical lowland to misty mountain passes. A pre-packed picnic hamper and wine make the journey uniquely yours.',
                highlights: ['First-class reserved train carriage', 'Private picnic hamper & wine', 'Ella mountain arrival'],
                accommodation: '98 Acres Resort & Spa', meals: 'Breakfast, Picnic Lunch',
                image: '/assets/ella/ella-1.webp', location: 'Ella',
                activity: 'Iconic Train Ride'
            },
            {
                day: 7, title: 'Ella Mountain Vistas',
                description: 'A relaxed morning. Enjoy a couple\'s massage at the resort spa overlooking the Ella Gap. In the late afternoon, take a gentle walk to the Nine Arch Bridge to watch the evening train cross the colonial viaduct.',
                highlights: ['Couples spa morning', 'Nine Arch Bridge', 'Romantic sunset at Ella Gap'],
                accommodation: '98 Acres Resort & Spa', meals: 'Breakfast, Dinner',
                image: '/assets/ella/ella-1.webp', location: 'Ella Mountain',
                activity: 'Leisure & Vistas'
            },
            {
                day: 8, title: 'Yala Luxury Safari Glamping',
                description: 'Descend to the deep south and check into an ultra-luxury tented lodge on the edge of Yala National Park. Embark on a sunset open-top 4WD leopard safari, returning to a private bush dinner under the stars illuminated by lanterns.',
                highlights: ['Luxury tented lodge check-in', 'Evening 4WD leopard safari', 'Lantern-lit bush dinner'],
                accommodation: 'Wild Coast Tented Lodge', meals: 'Breakfast, Dinner',
                image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp', location: 'Yala',
                activity: 'Wildlife Glamping'
            },
            {
                day: 9, title: 'Yala → Mirissa Beach Villa',
                description: 'Wake to the sounds of the jungle. Travel west along the beautiful southern coastline to Mirissa. Check into your private beach villa with an ocean-facing infinity pool. The afternoon is entirely yours to relax on the golden sand.',
                highlights: ['Coastal drive', 'Private beach villa check-in', 'Infinity pool relaxation'],
                accommodation: 'Cape Weligama (Private Villa)', meals: 'Breakfast',
                image: '/assets/sunandsand/mirissa-sri-lanka-gallery-1.webp', location: 'Mirissa',
                activity: 'Coast Arrival'
            },
            {
                day: 10, title: 'Private Catamaran & Whales',
                description: 'A private two-person sunrise catamaran sail to watch majestic blue whales in the deep Indian Ocean. Return for a champagne lunch and a full-body Ayurvedic couple\'s ritual under a palm-thatch pavilion.',
                highlights: ['Private catamaran whale watching', 'Couples Ayurvedic ritual', 'Beachside champagne lunch'],
                accommodation: 'Cape Weligama (Private Villa)', meals: 'Breakfast, Lunch',
                image: '/assets/sunandsand/weligama-beach-sri-lanka1.webp', location: 'Indian Ocean',
                activity: 'Ocean Majesty'
            },
            {
                day: 11, title: 'Galle Fort → Candlelit Finale',
                description: 'Stroll the 17th-century ramparts of Galle Fort hand-in-hand, stopping at boutique jewellers and French-pastry cafés. Return to your villa for the ultimate finale: a private multi-course candlelit dinner arranged directly on the beach.',
                highlights: ['Galle Fort romantic walk', 'Boutique shopping', 'Farewell candlelit beach dinner'],
                accommodation: 'Cape Weligama (Private Villa)', meals: 'Breakfast, Dinner',
                image: '/assets/honeymoon-in-beach.webp', location: 'Galle Fort & Beach',
                activity: 'Heritage & Romance'
            },
            {
                day: 12, title: 'Farewell → Departure',
                description: 'A final breakfast in bed overlooking the ocean before your private chauffeur transfers you to Colombo airport via the expressway. Leave with twelve days of extraordinary memories.',
                highlights: ['Breakfast in bed', 'Private chauffeur airport transfer', 'Complimentary anniversary gift'],
                accommodation: 'N/A (departure day)', meals: 'Breakfast',
                image: '/assets/bandaranaike-international-airport.webp', location: 'Airport',
                activity: 'Departure'
            },
        ],
        departures: 'Any date — fully private',
        bestTime: 'Year-round (November – April for best hot air ballooning & south coast)',
        startLocation: 'Colombo Airport (CMB)',
        endLocation: 'Colombo Airport (CMB)',
        mapPoints: [
            { id: 'negombo', name: 'Negombo', type: 'Romantic Arrival', cx: 20, cy: 89, description: 'Champagne welcome at a beachside luxury villa.', image: '/assets/negombo-1.webp' },
            { id: 'sigiriya', name: 'Sigiriya', type: 'Hot Air Balloon', cx: 44, cy: 68, description: 'Sunrise balloon flight over ancient jungles.', image: '/assets/culture-package/sigiriya.webp' },
            { id: 'kandy', name: 'Kandy', type: 'Temple & Romance', cx: 45, cy: 87, description: 'Lakeside dinners and candlelit temple rituals.', image: '/assets/kandy/kandy-1.webp' },
            { id: 'nuwaraeliya', name: 'Nuwara Eliya', type: 'Tea Country', cx: 46, cy: 90, description: 'High tea and misty emerald plantations.', image: '/assets/tea-plantation-1.webp' },
            { id: 'ella', name: 'Ella', type: 'Highland Train', cx: 58, cy: 98, description: 'First-class carriage through the tea highlands.', image: '/assets/ella/ella-1.webp' },
            { id: 'yala', name: 'Yala', type: 'Safari Glamping', cx: 70, cy: 120, description: 'Luxury tented bush camps and leopards.', image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp' },
            { id: 'mirissa', name: 'Mirissa', type: 'Private Villa', cx: 40, cy: 130, description: 'Indian Ocean terrace villa and whale watching.', image: '/assets/sunandsand/mirissa-sri-lanka-gallery-1.webp' },
            { id: 'galle', name: 'Galle Fort', type: 'Heritage Walk', cx: 32, cy: 127, description: 'Cobblestone streets and colonial boutique cafes.', image: '/assets/honeymoon-in-beach.webp' },
        ],
        mapRoutePoints: '20,89 44,68 45,87 46,90 58,98 70,120 40,130 32,127 20,89',
        faq: [
            { question: 'Can we customise the itinerary completely?', answer: 'Absolutely — this is a fully private bespoke honeymoon. We build the itinerary around your preferences, whether that is extra spa days, a private cooking class, additional nights at a favourite property, or adding a helicopter transfer.' },
            { question: 'What luxury properties are included?', answer: 'We partner exclusively with 5-star properties including Cape Weligama, Aliya Resort Sigiriya, and Earl\'s Regency Kandy. Every property is personally inspected by our team and selected for romance, service, and setting.' },
            { question: 'Do you arrange surprise elements for honeymoons?', answer: "Yes! Simply brief us on your partner's preferences and we'll arrange surprises — rose petal turndown, private beach dinners, personalised gift hampers, or a message in a bottle on arrival. We love romance." },
            { question: 'Can we extend or shorten the tour duration?', answer: 'Of course. The 12-day itinerary is our most popular luxury honeymoon length, but we also design fully bespoke 7-day, 10-day and 14-day versions. Simply tell us your available dates and we will create something perfect.' },
        ],
    },
];

export function getPackageById(id: string): TourPackage | undefined {
    return packages.find(p => p.id === id);
}
