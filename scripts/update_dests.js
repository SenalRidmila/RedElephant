const fs = require('fs');
let destStr = fs.readFileSync('src/app/data/destinations.ts', 'utf8');

const newData = {
    'colombo': {
        name: 'Colombo',
        type: 'Capital City',
        heroImage: '/assets/bandaranaike-international-airport.webp',
        tagline: 'The Commercial Heart of Sri Lanka',
        description: 'A vibrant metropolis where modern high-rises overlook colonial-era buildings and the vast Indian Ocean. Colombo is the bustling commercial capital, offering a mix of street food, fine dining, shopping, and diverse cultural sites.',
        stats: { bestTime: 'November to April', elevation: '1 m', famousFor: 'Urban Culture & Shopping' },
        attractions: [
            { name: 'Galle Face Green', description: 'A vast urban park along the ocean, famous for spectacular sunsets and street food.', image: '/assets/bandaranaike-international-airport.webp' },
            { name: 'Gangaramaya Temple', description: 'A massive, eclectic Buddhist temple blending modern architecture with cultural essence.' }
        ],
        activities: [
            { title: 'Tuk-Tuk City Safari', desc: 'Zip through the chaotic but charming streets in a local tuk-tuk discovering hidden gems.' },
            { title: 'Culinary Walk', desc: 'Taste the diverse array of Sri Lankan street food from kottu to hoppers.' }
        ],
        cultural_insights: [
            { id: 'colombo-culture', title: 'A Melting Pot', subtitle: 'Modern Meets Tradition', description: 'Colombo represents the intersection of Sri Lanka’s past and future, heavily influenced by its colonial history.', image: '/assets/bandaranaike-international-airport.webp', highlights: ['Colonial Architecture', 'Urban Markets', 'Diverse Demographics'] }
        ]
    },
    'hikkaduwa': {
        name: 'Hikkaduwa',
        type: 'Snorkeling Haven',
        heroImage: '/assets/hikkaduwa-beach-1.webp',
        tagline: 'Vibrant Coral Reefs & Surf',
        description: 'Famous for its vibrant, shallow coral sanctuaries, Hikkaduwa is the original backpacker beach of Sri Lanka. Now an eclectic coastal town, it offers turtles swimming right up to the shore and consistent surfing waves.',
        stats: { bestTime: 'November to April', elevation: '0 m', famousFor: 'Coral Reefs & Sea Turtles' },
        attractions: [
            { name: 'Hikkaduwa Coral Sanctuary', description: 'A marine national park boasting colorful corals and schools of tropical fish.', image: '/assets/hikkaduwa-beach-1.webp' },
            { name: 'Narigama Beach', description: 'A wide stretch of golden sand, perfect for long walks and surfing.' }
        ],
        activities: [
            { title: 'Snorkeling with Turtles', desc: 'Swim alongside gentle sea turtles in their natural coral reef habitat.' },
            { title: 'Surfing', desc: 'Catch consistent breaks perfect for both beginner and intermediate surfers.' }
        ],
        cultural_insights: [
            { id: 'hikkaduwa-culture', title: 'The Surfing Pioneer', subtitle: 'Beach Lifestyle', description: 'Hikkaduwa pioneered Sri Lanka’s surf and beach party culture, fostering a deeply relaxed, bohemian lifestyle.', image: '/assets/hikkaduwa-beach-1.webp', highlights: ['Surf Culture', 'Beach Shacks', 'Turtle Conservation'] }
        ]
    },
    'unawatuna': {
        name: 'Unawatuna',
        type: 'Golden Bay',
        heroImage: '/assets/unawatuna-beach-1.webp',
        tagline: 'The Picturesque Curve',
        description: 'A banana-shaped beach lined with leaning palm trees and a vibrant coral reef, Unawatuna is one of Sri Lanka’s most universally beloved coastal spots. The water is exceptionally calm thanks to a protective reef.',
        stats: { bestTime: 'November to April', elevation: '0 m', famousFor: 'Calm Swimming & Beach Bars' },
        attractions: [
            { name: 'Japanese Peace Pagoda', description: 'A stunning white stupa offering panoramic views of the bay and the ocean.', image: '/assets/unawatuna-beach-1.webp' },
            { name: 'Jungle Beach', description: 'A secluded, pristine beach hidden within thick coastal vegetation.' }
        ],
        activities: [
            { title: 'Scuba Diving', desc: 'Dive historical wrecks and deep reefs with experienced PADI centers.' },
            { title: 'Rope Swings', desc: 'Experience the iconic Instagram-famous palm tree rope swings overlooking the water.' }
        ],
        cultural_insights: [
            { id: 'unawatuna-culture', title: 'Laid-back Horizons', subtitle: 'Southern Coast Vibe', description: 'A hub of Southern coastal culture mixing local fishing traditions with a thriving contemporary beach scene.', image: '/assets/unawatuna-beach-1.webp', highlights: ['Historical Myths', 'Sunset Dining', 'Coastal Community'] }
        ]
    },
    'mirissa': {
        name: 'Mirissa',
        type: 'Whale Watching Capital',
        heroImage: '/assets/mirissa-1.webp',
        tagline: 'Where the Blue Whales Roam',
        description: 'A stunning crescent beach renowned globally as one of the best locations on Earth to witness the elusive Blue Whale. The town has a highly relaxed, tropical surfer vibe that captivates every visitor.',
        stats: { bestTime: 'December to March', elevation: '2 m', famousFor: 'Blue Whales & Coconut Tree Hill' },
        attractions: [
            { name: 'Coconut Tree Hill', description: 'An iconic dome of red earth jutting into the sea, covered entirely in soaring palm trees.', image: '/assets/mirissa-1.webp' },
            { name: 'Secret Beach', description: 'A tiny, beautiful cove tucked away from the main stretch.' }
        ],
        activities: [
            { title: 'Blue Whale Safari', desc: 'Set sail into the deep Indian Ocean to encounter the largest animal to ever exist.' },
            { title: 'Surfing the Point', desc: 'Catch waves alongside local and international surfers at Mirissa’s right-hand point break.' }
        ],
        cultural_insights: [
            { id: 'mirissa-culture', title: 'Oceanic Giants', subtitle: 'Marine Deep', description: 'The town’s entire rhythm is dictated by the ocean and the awe-inspiring marine giants that pass just offshore.', image: '/assets/mirissa-1.webp', highlights: ['Marine Biology', 'Stilt Fishing', 'Tropical Lifestyle'] }
        ]
    },
    'wilpattu': {
        name: 'Wilpattu',
        type: 'National Park',
        heroImage: '/assets/wild-life/yala-national-park-sri-lanka-1.webp',
        tagline: 'The Land of Lakes',
        description: 'Sri Lanka’s largest and oldest national park, uniquely characterized by its "Villus" (natural, sand-rimmed water basins). It offers a highly authentic, uncrowded leopard and sloth bear safari experience.',
        stats: { bestTime: 'February to October', elevation: '15 m', famousFor: 'Leopards & Natural Lakes' },
        attractions: [
            { name: 'The Villu Lakes', description: 'Dozens of natural rainwater lakes drawing an incredible density of wildlife.', image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp' },
            { name: 'Kudiramalai Point', description: 'A legendary historical landing site featuring copper-colored sand and sheer cliffs dropping into the sea.' }
        ],
        activities: [
            { title: 'Remote Wildlife Tracking', desc: 'Embark on a quiet, extended jeep safari far from any crowds to track leopards and bears.' },
            { title: 'Birdwatching Expedition', desc: 'Spot endemic and migratory birds thriving around the unique Villu ecosystems.' }
        ],
        cultural_insights: [
            { id: 'wilpattu-culture', title: 'Ancient Origins', subtitle: 'Historical Landfalls', description: 'Legend states Prince Vijaya, the founder of the Sinhalese race, landed near Wilpattu in 543 BC.', image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp', highlights: ['Mythological History', 'Kudiramalai Lore', 'Conservation'] }
        ]
    },
    'minneriya': {
        name: 'Minneriya',
        type: 'National Park',
        heroImage: '/assets/wild-life/yala-national-park-sri-lanka-2.webp',
        tagline: 'The Great Elephant Gathering',
        description: 'Centered around an ancient tank built in the 3rd century, Minneriya becomes the stage for the largest gathering of Asian elephants on Earth during the dry season, an unforgettable natural spectacle.',
        stats: { bestTime: 'July to October', elevation: '100 m', famousFor: 'The Elephant Gathering' },
        attractions: [
            { name: 'Minneriya Tank', description: 'A massive 3rd-century reservoir whose receding shores provide fresh grass for hundreds of elephants.', image: '/assets/wild-life/yala-national-park-sri-lanka-2.webp' }
        ],
        activities: [
            { title: 'The Gathering Safari', desc: 'Witness up to 300 elephants feeding, bathing, and socializing on the exposed grassy banks.' }
        ],
        cultural_insights: [
            { id: 'minneriya-culture', title: 'Symbiosis of Man & Nature', subtitle: 'Ancient Engineering', description: 'The ancient reservoir that sustains this wildlife was engineered by King Mahasen, proving centuries of harmonious coexistence.', image: '/assets/wild-life/yala-national-park-sri-lanka-2.webp', highlights: ['Hydraulic Heritage', 'Elephant Herds', 'Eco-tourism'] }
        ]
    },
    'galoya': {
        name: 'Gal Oya',
        type: 'National Park',
        heroImage: '/assets/wild-life/yala-national-park-sri-lanka-1.webp',
        tagline: 'The Untouched Wilderness',
        description: 'One of Sri Lanka’s most secluded parks, famous for offering the only boat safari in the country. Here, elephants can be seen swimming from island to island in the enormous Senanayake Samudraya reservoir.',
        stats: { bestTime: 'March to December', elevation: '100 m', famousFor: 'Swimming Elephants & Boat Safaris' },
        attractions: [
            { name: 'Senanayake Samudraya', description: 'A sprawling, deeply scenic reservoir dotted with lush islands.', image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp' },
            { name: 'Monkey Mountain', description: 'A hike offering sweeping 360-degree views of the virgin canopy below.' }
        ],
        activities: [
            { title: 'Boat Safari', desc: 'Glide silently on the water to watch elephants grazing on the shores or swimming across the lake.' },
            { title: 'Vedda Village Visit', desc: 'Walk with the Chief of the Veddas (Sri Lanka’s indigenous people) to learn ancient foraging techniques.' }
        ],
        cultural_insights: [
            { id: 'galoya-culture', title: 'The Indigenous Veddas', subtitle: 'Ancient Hunter-Gatherers', description: 'The region is home to the last remaining groups of Sri Lanka’s aboriginal people, offering a glimpse into prehistoric living.', image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp', highlights: ['Aboriginal History', 'Forest Survival Skills', 'Untouched Jungles'] }
        ]
    },
    'udawalawe': {
        name: 'Udawalawe',
        type: 'National Park',
        heroImage: '/assets/wild-life/yala-national-park-sri-lanka-2.webp',
        tagline: 'Elephant Paradise',
        description: 'With a landscape of open plains and scrub jungle resembling the African savannah, Udawalawe guarantees incredible elephant sightings year-round along with fantastic birdlife.',
        stats: { bestTime: 'Year Round', elevation: '60 m', famousFor: 'Elephants & Elephant Transit Home' },
        attractions: [
            { name: 'Udawalawe Reservoir', description: 'The lifeblood of the park where massive herds congregate to bathe and drink.', image: '/assets/wild-life/yala-national-park-sri-lanka-2.webp' },
            { name: 'Elephant Transit Home', description: 'An incredibly ethical rehabilitation center that cares for orphaned elephant calves before releasing them.' }
        ],
        activities: [
            { title: 'Open Top Jeep Safari', desc: 'Cruise the expansive savannahs tracking elephants, water buffalo, and raptors.' },
            { title: 'Calf Milk Feeding', desc: 'Watch from a distance as orphaned elephant calves eagerly rush down for their scheduled milk feeding at the Transit Home.' }
        ],
        cultural_insights: [
            { id: 'udawalawe-culture', title: 'Ethical Conservation', subtitle: 'Wildlife Rescue', description: 'Udawalawe represents the forefront of ethical elephant conservation on the island, strictly prioritizing the rehabilitation and wild release of orphans.', image: '/assets/wild-life/yala-national-park-sri-lanka-2.webp', highlights: ['Orphan Rehabilitation', 'Anti-captivity Stance', 'Savannah Ecosystems'] }
        ]
    },
    'nuwaraeliya': {
        name: 'Nuwara Eliya',
        type: 'Hill Station',
        heroImage: '/assets/nuwara-eliya/nuwara-eliya-2.webp',
        tagline: 'Little England',
        description: 'Nestled amidst lush tea estates and mist-shrouded mountains, Nuwara Eliya is characterized by its crisp, cool climate and profoundly British colonial architecture, from red-brick post offices to manicured golf courses.',
        stats: { bestTime: 'February to April', elevation: '1,868 m', famousFor: 'Cool Climate & Tea Estates' },
        attractions: [
            { name: 'Lake Gregory', description: 'A picturesque lake in the center of town surrounded by blooming flowers and Victorian houses.', image: '/assets/nuwara-eliya/nuwara-eliya-2.webp' },
            { name: 'Hakgala Botanical Gardens', description: 'The second-largest botanical garden in Sri Lanka, boasting immense collections of roses and orchids.' }
        ],
        activities: [
            { title: 'Tea Estate Tours', desc: 'Wander exactly where the world’s finest tea is grown and engage in professional tea tasting sessions.' },
            { title: 'Victorian High Tea', desc: 'Soak in the colonial elegance at The Grand Hotel with a traditional afternoon high tea served on the lawn.' }
        ],
        cultural_insights: [
            { id: 'nuwaraeliya-culture', title: 'Colonial Retreats', subtitle: 'British Heritage', description: 'Once the premier escape for British planters seeking a cooler climate, the town still meticulously preserves its colonial sporting clubs and Tudor architecture.', image: '/assets/nuwara-eliya/nuwara-eliya-2.webp', highlights: ['Tudor Architecture', 'Horse Racing', 'Tea Planter Elite'] }
        ]
    },
    'hortonplains': {
        name: 'Horton Plains',
        type: 'National Park',
        heroImage: '/assets/nuwara-eliya/nuwara-eliya-2.webp',
        tagline: 'The Edge of the World',
        description: 'A beautifully bleak, windswept highland plateau of montane grasslands and cloud forests. It offers some of the most dramatic and rewarding trekking paths in the country, culminating in a precipitous 880-meter drop.',
        stats: { bestTime: 'January to March', elevation: '2,100 m', famousFor: 'World\'s End & Baker\'s Falls' },
        attractions: [
            { name: 'World\'s End', description: 'A sheer cliff plummeting nearly a kilometer down, offering views that stretch all the way to the southern ocean on clear mornings.', image: '/assets/nuwara-eliya/nuwara-eliya-2.webp' },
            { name: 'Baker\'s Falls', description: 'A freezing, cascading waterfall set amidst dense, twisting cloud-forest vegetation.' }
        ],
        activities: [
            { title: 'Dawn Trekking', desc: 'Hike the 9km circular trail just as the sun rises to beat the mist rolling into the valleys.' },
            { title: 'Endemic Wildlife Spotting', desc: 'Look out for Sambar deer grazing the plateau and the elusive Bear Monkey overhead.' }
        ],
        cultural_insights: [
            { id: 'hortonplains-culture', title: 'Montane Ecosystems', subtitle: 'Sky Islands', description: 'These high altitude plateaus act as \'sky islands\', harboring an incredibly unique set of flora and fauna found absolutely nowhere else on Earth.', image: '/assets/nuwara-eliya/nuwara-eliya-2.webp', highlights: ['Endemic Species', 'Cloud Forests', 'Geological Marvels'] }
        ]
    },
    'ella': {
        name: 'Ella',
        type: 'Mountain Village',
        heroImage: '/assets/ella/ella-1.webp',
        tagline: 'The Backpacker\'s Hill Retreat',
        description: 'A charming, utterly breathtaking village perched on a mountain gap. Ella has evolved into a vibrant hub for hikers, naturalists, and those seeking epic vistas across plunging ravines.',
        stats: { bestTime: 'January to May', elevation: '1,041 m', famousFor: 'Nine Arch Bridge & Ella Rock' },
        attractions: [
            { name: 'Nine Arch Bridge', description: 'A soaring, photogenic railway viaduct totally constructed from bricks and stone without a single piece of steel.', image: '/assets/ella/ella-1.webp' },
            { name: 'Little Adam\'s Peak', description: 'A rewarding, relatively easy hike culminating in narrow ridges and sweeping panoramas of the Ella gap.' },
            { name: 'Ella Rock', description: 'A dramatic, towering rock formation challenging hikers with a steep ascent.' }
        ],
        activities: [
            { title: 'Hiking & Trekking', desc: 'Navigate tea plantation trails to reach the summits of iconic peaks.' },
            { title: 'Chasing Waterfalls', desc: 'Swim in the cool, crystal pools at the base of the massive Ravana Falls.' }
        ],
        cultural_insights: [
            { id: 'ella-culture', title: 'The Ramayana Trail', subtitle: 'Myth & Legend', description: 'Ella is deeply connected to the ancient Indian epic, the Ramayana, with many caves and falls named after the demon-king Ravana.', image: '/assets/ella/ella-1.webp', highlights: ['Ravana Mythology', 'Backpacker Culture', 'Tea Country Views'] }
        ]
    },
    'kitulgala': {
        name: 'Kitulgala',
        type: 'Adventure Base',
        heroImage: '/assets/kitulgala/adventure-1.webp',
        tagline: 'The Adrenaline Capital',
        description: 'A deeply forested, wet-zone village sitting on the wide Kelani River. It serves as the undisputed premier destination for adventure sports and rainforest exploration in Sri Lanka.',
        stats: { bestTime: 'December to March', elevation: '110 m', famousFor: 'White Water Rafting' },
        attractions: [
            { name: 'Kelani River', description: 'A powerful, wide river featuring class II and III rapids coursing through lush jungle.', image: '/assets/kitulgala/adventure-1.webp' },
            { name: 'Belilena Cave', description: 'A prehistoric cave where the skeletal remains of the 12,000-year-old "Balangoda Man" were discovered.' }
        ],
        activities: [
            { title: 'White Water Rafting', desc: 'Navigate exciting rapids down the Kelani river guided by expert adventure teams.' },
            { title: 'Canyoning & Abseiling', desc: 'Slide down natural rock funnels and rappel down cascading waterfalls deep in the rainforest.' }
        ],
        cultural_insights: [
            { id: 'kitulgala-culture', title: 'River on Film', subtitle: 'Hollywood History', description: 'Kitulgala gained international fame as the primary filming location for the 1957 Oscar-winning epic "The Bridge on the River Kwai".', image: '/assets/kitulgala/adventure-1.webp', highlights: ['Film History', 'Prehistoric Fossils', 'Adventure Communties'] }
        ]
    },
    'knuckles': {
        name: 'Knuckles',
        type: 'Mountain Range',
        heroImage: '/assets/knuckles/knuckles-1.webp',
        tagline: 'The Untamed Highlands',
        description: 'A rugged, staggeringly beautiful mountain range resembling the knuckles of a clenched fist. Named a UNESCO World Heritage site, it holds some of the most undisturbed, isolated wilderness left on the island.',
        stats: { bestTime: 'June to August', elevation: '1,863 m', famousFor: 'Pristine Trekking & Biodiversity' },
        attractions: [
            { name: 'Cloud Forests', description: 'Densely packed, mist-shrouded forests rich in completely endemic species and hidden waterfalls.', image: '/assets/knuckles/knuckles-1.webp' },
            { name: 'Mini World\'s End', description: 'A spectacular cliff drop offering expansive views across sweeping emerald valleys.' }
        ],
        activities: [
            { title: 'Hardcore Trekking', desc: 'Take multi-day guided hikes camping in remote, completely wild environments far from civilization.' },
            { title: 'Isolated Village Visits', desc: 'Interact with Meemure village, an unbelievably secluded settlement holding tightly onto ancient agricultural ways.' }
        ],
        cultural_insights: [
            { id: 'knuckles-culture', title: 'The Lost World', subtitle: 'Untouched Biodiversity', description: 'The intense isolation has resulted in a hyper-endemic ecosystem, preserving species and traditional ways of life completely unaltered by modernity.', image: '/assets/knuckles/knuckles-1.webp', highlights: ['Hyper-Endemism', 'Remote Communities', 'Conservation Peaks'] }
        ]
    },
    'weligama': {
        name: 'Weligama',
        type: 'Surfing Bay',
        heroImage: '/assets/mirissa-1.webp',
        tagline: 'The Surfer\'s Sanctuary',
        description: 'Meaning "Sandy Village," Weligama is a massive, incredibly scenic bay with a shallow sandy bottom, making it the absolute best destination for surfing beginners in South Asia.',
        stats: { bestTime: 'November to April', elevation: '1 m', famousFor: 'Beginner Surfing & Taprobane Island' },
        attractions: [
            { name: 'Taprobane Island', description: 'A tiny, absurdly picturesque island sitting right in the surf break, occupied entirely by a neo-palladian mansion.', image: '/assets/mirissa-1.webp' },
            { name: 'Weligama Waves', description: 'Long, rolling, remarkably forgiving waves spreading consistently across the 2-kilometer bay.' }
        ],
        activities: [
            { title: 'Surf Camps', desc: 'Join one of the dozens of world-class surf schools operating straight off the sand.' },
            { title: 'Stilt Fishing Photography', desc: 'Witness and photograph the iconic, traditional method of stilt fishing practiced exclusively in the south.' }
        ],
        cultural_insights: [
            { id: 'weligama-culture', title: 'Stilts and Surfboards', subtitle: 'The new South Coast', description: 'A compelling juxtaposition where ancient local stilt fishermen cast lines right beside a booming, international modern surf-culture.', image: '/assets/mirissa-1.webp', highlights: ['Stilt Fishing', 'Surf Economy', 'Coastal Integration'] }
        ]
    },
    'sigiriya': {
        name: 'Sigiriya',
        type: 'Ancient Fortress',
        heroImage: '/assets/culture-package/sigiriya.webp',
        tagline: 'The Eighth Wonder of the World',
        description: 'An impossible fortress carved into a 200-meter-high sheer rock monolith jutting violently from the jungle plains. Built by a rogue King in the 5th century, it is universally considered Sri Lanka’s greatest ancient architectural marvel.',
        stats: { bestTime: 'January to April', elevation: '349 m', famousFor: 'The Lion Rock Fortress' },
        attractions: [
            { name: 'The Lion Paws', description: 'Colossal stone lion paws guarding the final, steepest ascent to the sky-palace summit.', image: '/assets/culture-package/sigiriya.webp' },
            { name: 'The Mirror Wall', description: 'A highly polished masonry wall so reflective the King could see himself, covered in ancient graffiti.' },
            { name: 'The Water Gardens', description: 'Incredibly advanced, symmetrical pleasure gardens containing functioning fountains that still operate during the rainy season.' },
            { name: 'Pidurangala Rock', description: 'A neighboring monolith offering the absolute best panoramic view of Sigiriya itself.' }
        ],
        activities: [
            { title: 'Climbing the Monolith', desc: 'Ascend the 1,200 steps past ancient frescoes and sheer drops to stand upon the ruins of the sky palace.' },
            { title: 'Sunrise at Pidurangala', desc: 'Take a brief, dark morning hike to witness the sun rising directly behind the iconic Lion Rock.' }
        ],
        cultural_insights: [
            { id: 'sigiriya-culture', title: 'Madness and Masterpiece', subtitle: 'The Parricide King', description: 'King Kashyapa built this extravagant, heavily fortified palace in the clouds entirely out of fear and guilt after murdering his father and seizing the throne.', image: '/assets/culture-package/sigiriya.webp', highlights: ['Ancient Hydro-Engineering', 'Fresco Maidens', 'Palatial Fortifications'] }
        ]
    }
};

for (const key in newData) {
    const d = newData[key];
    const regex = new RegExp(`'${key}': {[^}]*id: '${key}'[\\s\\S]*?cultural_insights: \\[\\s*\\{[\\s\\S]*?\\}\\s*\\]\\s*\\}`, "g");
    
    // Convert object to string replacement
    const replacement = `'${key}': {
        id: '${key}',
        name: '${d.name.replace(/'/g, "\\'")}',
        type: '${d.type.replace(/'/g, "\\'")}',
        heroImage: '${d.heroImage}',
        gallery: [
            '${d.heroImage}'
        ],
        tagline: '${d.tagline.replace(/'/g, "\\'")}',
        description: '${d.description.replace(/'/g, "\\'")}',
        stats: {
            bestTime: '${d.stats.bestTime}',
            elevation: '${d.stats.elevation}',
            famousFor: '${d.stats.famousFor.replace(/'/g, "\\'")}'
        },
        attractions: [
            ${d.attractions.map(a => `{ name: '${a.name.replace(/'/g, "\\'")}', description: '${a.description.replace(/'/g, "\\'")}'${a.image ? `, image: '${a.image}'` : ''} }`).join(',\n            ')}
        ],
        activities: [
            ${d.activities.map(a => `{ title: '${a.title.replace(/'/g, "\\'")}', desc: '${a.desc.replace(/'/g, "\\'")}' }`).join(',\n            ')}
        ],
        cultural_insights: [
            ${d.cultural_insights.map(c => `{ id: '${c.id}', title: '${c.title.replace(/'/g, "\\'")}', subtitle: '${c.subtitle.replace(/'/g, "\\'")}', description: '${c.description.replace(/'/g, "\\'")}', image: '${c.image}', highlights: ${JSON.stringify(c.highlights)} }`).join(',\n            ')}
        ]
    }`;

    destStr = destStr.replace(regex, replacement);
}

fs.writeFileSync('src/app/data/destinations.ts', destStr);
console.log('Updated real data for destinations.');
