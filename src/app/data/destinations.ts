export interface Attraction {
    name: string;
    description: string;
    image?: string;
}

export interface Activity {
    title: string;
    desc: string;
}

export interface CulturalInsight {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    highlights: string[];
}

export interface DestinationData {
    id: string;
    name: string;
    type: string;
    heroImage: string;
    gallery: string[];
    tagline: string;
    description: string;
    stats: {
        bestTime: string;
        elevation: string;
        famousFor: string;
    };
    attractions: Attraction[];
    activities?: Activity[];
    cultural_insights?: CulturalInsight[];
}

export const destinations: Record<string, DestinationData> = {
    'anuradhapura': {
        id: 'anuradhapura',
        name: 'Anuradhapura',
        type: 'Sacred City',
        heroImage: '/assets/anuradhapura/ruwanweliseya-anuradhapura-gallery-1.webp',
        gallery: [
            '/assets/anuradhapura/ruwanweliseya-anuradhapura-gallery-1.webp',
            '/assets/culture-package/sigiriya.webp'
        ],
        tagline: 'The First Capital of Ancient Kings',
        description: 'Anuradhapura is the spiritual heart of Sri Lanka. Serving as the capital for over a millennium, it is a vast network of ancient palaces, giant stupas glistening white against the sky, and serene monasteries. Walking its grounds is traversing centuries of Buddhist history.',
        stats: {
            bestTime: 'May to September',
            elevation: '81 m',
            famousFor: 'Giant Stupas & Sacred Bodhi Tree'
        },
        attractions: [
            { name: 'Sri Maha Bodhiya', description: 'The oldest historically authenticated tree in the world, grown from a branch of the tree under which Buddha attained enlightenment. A living symbol of spiritual enlightenment and reverence.', image: '/assets/anuradhapura/sri-maha-bodiya-anuradhapura.webp' },
            { name: 'Ruwanweliseya Stupa', description: 'Known as the \'Great Stupa,\' it stands as a monumental testament to Sri Lanka\'s rich heritage and spiritual legacy, built by King Dutugemunu in 140 BC.', image: '/assets/anuradhapura/Ruwanweliseya-1.webp' },
            { name: 'Jetavanaramaya', description: 'A towering testament to ancient engineering and spiritual devotion. Once the third tallest structure in the ancient world, after the Pyramids of Giza.', image: '/assets/anuradhapura/jetavanaramaya-anuradhapura.webp' },
            { name: 'Abhayagiriya', description: 'An ancient monastic center that once housed 5,000 monks and served as a major university, standing as a testament to the spiritual and architectural prowess of ancient Sri Lanka.', image: '/assets/anuradhapura/abhayagiri-dagoba-anuradhapura.webp' },
            { name: 'Kuttam Pokuna (Twin Ponds)', description: 'Masterpieces of ancient hydrological engineering and architecture dating back to the 6th century.', image: '/assets/anuradhapura/kuttam-pokuna.webp' },
            { name: 'Thuparamaya', description: 'Believed to be the first dagoba built in Sri Lanka, marking a significant milestone in the spread of Buddhism across the island over 2,300 years ago.', image: '/assets/anuradhapura/thuparamaya-dagoba.webp' },
            { name: 'Lovamahapaya', description: 'Also known as the \'Brazen Palace,\' it stands as a majestic architectural marvel with its original nine stories resting on 1600 stone pillars.', image: '/assets/anuradhapura/lovamahapaya-anuradhapura.webp' },
            { name: 'Isurumuniya', description: 'Nestled amidst serene surroundings, it stands as a sacred sanctuary of art, famous for its ancient rock carvings including the \'Isurumuniya Lovers\'.', image: '/assets/anuradhapura/isurumuniya-anuradhapura.webp' },
            { name: 'Mirisaveti Stupa', description: 'Constructed over two millennia ago by King Dutugemunu, it stands as a silent sentinel of faith and devotion amidst tranquil surroundings.', image: '/assets/anuradhapura/mirisaveti-stupa-anuradhapura.webp' }
        ],
        activities: [
            { title: 'Private Helicopter Arrival & Tour', desc: 'Bypass the roads entirely by chartering a private luxury helicopter directly into the cultural triangle for breathtaking aerial views of the ancient stupas.' },
            { title: 'Exclusive Safari in Minneriya', desc: 'Embark on a private, highly-curated luxury jeep safari in nearby Minneriya National Park to witness the famous elephant gathering in sheer comfort.' },
            { title: 'Ayurvedic Wellness Retreat', desc: 'Rejuvenate your body and mind with authentic, premium Ayurvedic spa treatments available at elite wellness sanctuary resorts in the area.' },
            { title: 'Cycling Through Ancient Ruins', desc: 'Cycle across the expansive sacred city to discover monastic complexes, reservoirs, and ancient architecture spread across one of South Asia’s largest archaeological sites.' },
            { title: 'Heritage Walks & Archaeological Tours', desc: 'Join guided heritage walks to learn about the engineering, irrigation systems, and cultural achievements of Sri Lanka’s first ancient kingdom.' }
        ],
        cultural_insights: [
            { id: 'monastic-life', title: 'Ancient Monastic Disciplines', subtitle: 'Spiritual Heritage', description: 'Gain profound insights into the austere disciplines of the early monks who lived within these vast complexes, dedicating their lives to meditation, study, and the preservation of the Dhamma.', image: '/assets/anuradhapura/abhayagiri-dagoba-anuradhapura.webp', highlights: ['Meditation Practices', 'Ancient Scriptural Study', 'Monastic Architecture'] },
            { id: 'irrigation-marvels', title: 'Hydraulic Masterpieces', subtitle: 'Engineering Feats', description: 'Discover the incredibly advanced ancient irrigation networks built by early kings, featuring massive interconnected reservoirs that transformed dry lands into thriving agricultural hubs.', image: '/assets/anuradhapura/kuttam-pokuna.webp', highlights: ['Advanced Water Management', 'Royal Reservoirs', 'Agricultural Innovations'] }
        ]
    },
    'negombo': {
        id: 'negombo',
        name: 'Negombo',
        type: 'Beach Town',
        heroImage: '/assets/negombo-1.webp',
        gallery: [
            '/assets/negombo-1.webp',
            '/assets/hikkaduwa-beach-1.webp'
        ],
        tagline: 'Little Rome of the West Coast',
        description: 'Just north of the capital, Negombo is a bustling coastal town heavily influenced by centuries of colonial history. Known as "Little Rome" due to its numerous Catholic churches, it offers golden beaches, historically significant Dutch canals, and one of the largest fish markets on the island.',
        stats: {
            bestTime: 'December to April',
            elevation: '2 m',
            famousFor: 'Seafood, Dutch Canals & Beaches'
        },
        attractions: [
            { name: 'Negombo Beach Park', image: '/assets/negombo-1.webp', description: 'The golden sandy strip that runs alongside the resort hotels, spectacular for sunset walks.' },
            { name: 'Hamilton Canal', image: '/assets/boat-safari-1.webp', description: 'A 100km waterway constructed by the British in 1802, perfect for a slow boat ride viewing local life.' },
            { name: 'Negombo Fish Market', image: '/assets/negombo-1.webp', description: 'A vibrant and chaotic morning auction where giant tuna and thousands of fish of every shape and colour are traded.' },
            { name: 'St. Mary\'s Church', description: 'A massive pastel-pink cathedral featuring stunning European-style ceiling frescoes.' },
            { name: 'Negombo Lagoon', image: '/assets/boat-safari-1.webp', description: 'A large expanse of water famous for its harvest of lobsters, crabs, and prawns, fringed by mangrove swamps.' }
        ],
        activities: [
            { title: 'Private Luxury Catamaran Cruise', desc: 'Charter a high-end personal catamaran with a dedicated crew for spectacular sunset sailing across the Indian Ocean coastline.' },
            { title: 'Exclusive Lagoon Dining', desc: 'Experience a romantic, private 5-star dinner arranged right on the banks of the Negombo lagoon beneath the tropical night sky.' },
            { title: 'Boat Rides', desc: 'Explore the tranquil waters of Negombo Lagoon on scenic boat rides, offering opportunities for birdwatching, photography, and glimpses of traditional fishing villages.' },
            { title: 'Water Sports', desc: 'From jet skiing to kite surfing, Negombo offers a range of thrilling water sports activities for adventure enthusiasts looking to make a splash.' }
        ],
        cultural_insights: [
            { id: 'catholic-heritage', title: 'The Little Rome', subtitle: 'Colonial History', description: 'Trace the deep roots of Catholicism brought by the Portuguese, visible in the magnificent, pastel-hued churches and shrines that dot every corner of the town.', image: '/assets/negombo-1.webp', highlights: ['Portuguese Influence', 'Cathedral Architecture', 'Local Festivities'] },
            { id: 'fishing-traditions', title: 'The Coastal Lifeline', subtitle: 'Traditional Livelihoods', description: 'Witness the centuries-old traditional fishing practices using outrigger canoes (oruvas) and the bustling morning energy of one of the island’s most famous fish markets.', image: '/assets/boat-safari-1.webp', highlights: ['Traditional Orvuas', 'Dawn Fish Markets', 'Seafood Culture'] }
        ]
    },
    'kandy': {
        id: 'kandy',
        name: 'Kandy',
        type: 'Royal Capital',
        heroImage: '/assets/kandy/kandy-1.webp',
        gallery: [
            '/assets/kandy/kandy-1.webp',
            '/assets/kandy/kandy-gallery-1.webp'
        ],
        tagline: 'The Last Kingdom of Sri Lanka',
        description: 'Nestled deep in the central mountains and wrapped around a serene lake, Kandy is the cultural capital of Sri Lanka. It was the last independent stronghold of the Sinhalese Kings, resisting colonial powers for centuries. Today, it remains the spiritual centre of the island.',
        stats: {
            bestTime: 'January to April',
            elevation: '500 m',
            famousFor: 'Temple of the Tooth & Esala Perahera'
        },
        attractions: [
            { name: 'Temple of the Sacred Tooth Relic', image: '/assets/kandy/kandy-1.webp', description: 'A heavily fortified temple guarding the most sacred object in the Buddhist world: a tooth of the Buddha.' },
            { name: 'Kandy Lake (Kiri Muhuda)', image: '/assets/kandy/kandy-gallery-1.webp', description: 'An artificial lake built in 1807 by the last Sinhalese king, offering a peaceful promenade in the city center.' },
            { name: 'Peradeniya Botanical Gardens', image: '/assets/kandy/kandy-1.webp', description: '147 acres of incredible flora, originally built for Kandyan royalty, featuring giant Javan fig trees and 4,000 plant species.' },
            { name: 'Bahirawakanda Buddha Statue', image: '/assets/kandy/kandy-gallery-1.webp', description: 'An 88-foot high white Buddha statue perched on a hill, visible from everywhere in the city.' },
            { name: 'Udawattakele Forest Reserve', image: '/assets/kandy/kandy-1.webp', description: 'A historic forest sanctuary directly behind the Tooth Temple, once the exclusive pleasure garden of the Kings.' }
        ],
        activities: [
            { title: 'Viceroy Luxury Train Journey', desc: 'Experience the timeless colonial charm of a vintage luxury train carriage as you glide into the misty mountains of the tea country.' },
            { title: 'VIP Temple Access & Private Blessings', desc: 'Arrange for an exclusive, private guided tour of the Temple of the Sacred Tooth Relic accompanied by insights from a resident scholar.' },
            { title: 'Masterclass Culinary Experience', desc: 'Participate in a highly specialized, hands-on masterclass of fine Sri Lankan cuisine led by executive chefs using organic local spices.' },
            { title: 'Temple Visits & Rituals', desc: 'Experience the spiritual heart of Sri Lanka by visiting the Temple of the Sacred Tooth Relic and observing daily rituals, traditional offerings, and sacred ceremonies.' },
            { title: 'Cultural Dance Performances', desc: 'Enjoy authentic Kandyan cultural dance shows featuring traditional drumming, ceremonial costumes, and performances rooted in centuries-old heritage.' }
        ],
        cultural_insights: [
            { id: 'esala-perahera', title: 'The Grand Perahera', subtitle: 'Sacred Spectacle', description: 'Learn about the Esala Perahera, an ancient, breathtaking ten-day festival featuring fire-dancers, whip-crackers, and beautifully adorned elephants parading the sacred tooth relic.', image: '/assets/kandy/kandy-gallery-1.webp', highlights: ['Traditional Costumes', 'Sacred Rituals', 'Royal Drumming'] },
            { id: 'kandyan-art', title: 'Arts & Crafts Heritage', subtitle: 'Royal Artisans', description: 'Delve into the intricate world of Kandyan craftsmanship, from exquisite silver filigree and brasswork to the vibrant, symbolic motifs of traditional lacquer and handloom.', image: '/assets/kandy/kandy-1.webp', highlights: ['Silver Filigree', 'Traditional Lacquerwork', 'Handloom Textiles'] }
        ]
    },
    'galle': {
        id: 'galle',
        name: 'Galle',
        type: 'Colonial Fort & Coast',
        heroImage: '/assets/galle-1.webp',
        gallery: [
            '/assets/galle-1.webp',
            '/assets/hikkaduwa-beach-1.webp'
        ],
        tagline: 'A Living 400-Year-Old Fortress',
        description: 'Galle is a magical collision of European architecture and South Asian traditions. The UNESCO World Heritage Galle Fort, initially built by the Portuguese and extensively fortified by the Dutch in the 17th century, is the largest remaining fortress in Asia built by European occupiers.',
        stats: {
            bestTime: 'December to March',
            elevation: '0 m',
            famousFor: 'Dutch Fort & Boutique Lanes'
        },
        attractions: [
            { name: 'Galle Fort Ramparts', image: '/assets/galle-1.webp', description: 'Walk the thick stone walls encircling the peninsula, particularly spectacular at sunset.' },
            { name: 'Galle Lighthouse', image: '/assets/hikkaduwa-beach-1.webp', description: 'An iconic white lighthouse sitting gracefully beneath the shade of towering coconut palms.' },
            { name: 'Dutch Reformed Church', image: '/assets/galle-1.webp', description: 'Built in 1755, its floor is paved entirely with gravestones from the old Dutch cemetery.' },
            { name: 'Pedlar Street', image: '/assets/hikkaduwa-beach-1.webp', description: 'Narrow lanes bursting with luxury boutique shops, intimate cafes, colonial villas, and art galleries.' },
            { name: 'Flag Rock', image: '/assets/galle-1.webp', description: 'Historically a Portuguese bastion where sailors swung warnings to incoming ships, now a prime spot for sunset watching and cliff-diving locals.' }
        ],
        activities: [
            { title: 'Private Yacht Whale Watching', desc: 'Board an exclusive luxury motor yacht and cruise the deep blue waters off Mirissa to witness majestic Blue Whales in complete privacy.' },
            { title: 'Bespoke Gem & Jewelry Crafting', desc: 'Visit a master jeweler for a profoundly personal workshop detailing Sri Lanka\'s legendary sapphire trade, and design a custom piece.' },
            { title: 'VIP Spa & Wellness Retreat', desc: 'Indulge in an afternoon of absolute serenity at a world-class luxury spa combining ancient Ayurvedic techniques with modern pampering.' },
            { title: 'Explore Galle Fort on Foot', desc: 'Walk through the UNESCO-listed Galle Fort to discover colonial streets, boutiques, museums, cafés, and scenic ramparts overlooking the Indian Ocean.' },
            { title: 'Sunset at the Ramparts', desc: 'Enjoy golden-hour views along the fort walls, where ocean breezes and historic architecture create one of the most iconic sunset experiences in southern Sri Lanka.' }
        ],
        cultural_insights: [
            { id: 'dutch-architecture', title: 'Colonial Architecture', subtitle: 'Living History', description: 'Wander through the beautifully preserved grid pattern of streets within the fort, noting the distinct Dutch-colonial style characterized by thick walls, large verandas, and terracotta roofs.', image: '/assets/galle-1.webp', highlights: ['Dutch Vernacular Construction', 'Restored Villas', 'Historical Fortifications'] },
            { id: 'maritime-trade', title: 'The Ancient Spice Route', subtitle: 'Maritime Heritage', description: 'Understand Galle’s pivotal role as a historic trading hub, where Arab, Chinese, and European merchants converged for centuries to trade precious cinnamon, ivory, and gems.', image: '/assets/hikkaduwa-beach-1.webp', highlights: ['Spice Trade History', 'Naval Exhibits', 'Multicultural Roots'] }
        ]
    },
    'yala': {
        id: 'yala',
        name: 'Yala',
        type: 'National Park',
        heroImage: '/assets/wild-life/yala-national-park-sri-lanka-1.webp',
        gallery: [
            '/assets/wild-life/yala-national-park-sri-lanka-1.webp',
            '/assets/wild-life/yala-national-park-sri-lanka-2.webp'
        ],
        tagline: 'The Realm of the Leopard',
        description: 'Yala National Park forms a sprawling 979 square kilometers of forests, dry scrub, grassy plains, and brackish lagoons. It is world-renowned for having the highest density of leopards anywhere in the world, alongside tremendous populations of elephants, sloth bears, and crocodiles.',
        stats: {
            bestTime: 'February to July',
            elevation: '10 m to 30 m',
            famousFor: 'Leopard Safaris & Wildlife'
        },
        attractions: [
            { name: 'Yala Block 1', image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp', description: 'The most visited section of the park and the absolute best zone on the planet for spotting leopards.' },
            { name: 'Sithulpawwa Rock Temple', image: '/assets/wild-life/yala-national-park-sri-lanka-2.webp', description: 'An ancient rock monastery deep within the park that housed 12,000 monks in the 2nd century B.C.' },
            { name: 'Patangala Beach', image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp', description: 'A wild, totally untamed stretch of coastline where the jungle meets the stormy Indian Ocean.' },
            { name: 'Kumbukkan Oya', image: '/assets/wild-life/yala-national-park-sri-lanka-2.webp', description: 'A scenic river boundary drawing massive herds of elephants down for afternoon bathing.' },
            { name: 'Magul Maha Viharaya', image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp', description: 'Ancient ruins scattered throughout the jungle where King Kavan Tissa married Princess Vihara Maha Devi.' }
        ],
        activities: [
            { title: 'Exclusive Glamping Expeditions', desc: 'Stay in breathtaking 5-star canvas suites nestled deep within the wilderness, offering ultimate luxury while surrounded by roaming wildlife.' },
            { title: 'Private Gourmet Jungle Dining', desc: 'Dine under a canopy of endless stars where a private executive chef prepares a bespoke 5-course meal amidst the raw beauty of the jungle.' },
            { title: 'Premium Leopard Safari', desc: 'Take an extended expedition in a specialized, highly comfortable luxury 4x4 with Sri Lanka\'s most elite naturalist guides tracking apex leopards.' },
            { title: 'Jeep Safari', desc: 'Embark on a thrilling morning or afternoon jeep safari with experienced trackers to chase sightings of leopards, elephants, and bears.' },
            { title: 'Luxury Tented Camping', desc: 'Stay overnight in a luxury tented camp on the park\'s border to fall asleep to the sounds of the jungle and wake up to nature\'s symphony.' }
        ],
        cultural_insights: [
            { id: 'jungle-shrines', title: 'Hidden Monasteries', subtitle: 'Ancient Wilderness Ruins', description: 'Hidden deep within the leopard-dominated jungles are ancient Buddhist monastic settlements like Sithulpawwa, proving that spirituality thrived alongside wild nature for millennia.', image: '/assets/wild-life/yala-national-park-sri-lanka-2.webp', highlights: ['Rock Temples', 'Ancient Pilgrimage Paths', 'Jungle Ascetics'] },
            { id: 'conservation', title: 'Leopard Conservation', subtitle: 'Protecting the Apex', description: 'Learn about the critical conservation efforts and research underway to protect the Sri Lankan leopard, an endemic apex predator, ensuring a sustainable balance in the ecosystem.', image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp', highlights: ['Wildlife Tracking', 'Anti-Poaching Efforts', 'Eco-Tourism Impact'] }
        ]
    },
    'dambulla': {
        id: 'dambulla',
        name: 'Dambulla',
        type: 'Cave Temple',
        heroImage: '/assets/dambulla/dambulla-1.webp',
        gallery: [
            '/assets/dambulla/dambulla-1.webp'
        ],
        tagline: 'A Masterpiece of Buddhist Art',
        description: 'Dambulla is the largest and best-preserved cave temple complex in Sri Lanka. The towering rock, rising 160m over the surrounding plains, is heavily carved with over 80 documented caves. Five of these caves contain breathtaking statues and paintings tracking the life of Gautama Buddha.',
        stats: {
            bestTime: 'January to May',
            elevation: '340 m',
            famousFor: 'Cave Temples & Frescoes'
        },
        attractions: [
            { name: 'Cave of the Great Kings', image: '/assets/dambulla/dambulla-1.webp', description: 'The largest cave, dominated by a magnificent 15-meter reclining Buddha statue carved straight out of the bedrock.' },
            { name: 'The Golden Temple', image: '/assets/dambulla/dambulla-1.webp', description: 'A modern, massive golden Buddha statue that greets visitors at the base of the mountain.' },
            { name: 'Cave of the Divine King', image: '/assets/dambulla/dambulla-1.webp', description: 'The first and oldest cave, preserving original 2,000-year-old rock-paintings across the undulating ceiling.' },
            { name: 'Dambulla Produce Market', image: '/assets/dambulla/dambulla-1.webp', description: 'One of the largest vegetable distribution centres in Sri Lanka, offering a dizzying glimpse into local agriculture.' }
        ],
        activities: [
            { title: 'VIP Sunrise Jet Flight', desc: 'Take a mesmerizing private sunrise balloon flight drifting silently above ancient ruins, vast emerald jungles, and the iconic Sigiriya Rock.' },
            { title: 'Private Jungle Spa Escapes', desc: 'Surrender to absolute relaxation with an exclusive 5-star outdoor spa treatment set completely seamlessly into the surrounding wild rainforest.' },
            { title: 'Explore the Royal Caves', desc: 'Climb the 160-meter rock to explore the five magnificent caves, each filled with vibrant paintings and statues dating back to the 1st century BC.' },
            { title: 'Village & Jungle Tours', desc: 'Take a bullock cart ride or a catamaran trip through the village lakes in Habarana to experience authentic rural Sri Lankan life.' }
        ],
        cultural_insights: [
            { id: 'fresco-art', title: 'Ancient Frescoes', subtitle: 'Buddhist Masterpieces', description: 'Marvel at the intricate ceiling frescoes that flow across the vast undulating rock surfaces, depicting scenes from the Buddha’s life with remarkable preservation and color.', image: '/assets/dambulla/dambulla-1.webp', highlights: ['Mineral Pigments', 'Jataka Tales Murals', 'Restoration Techniques'] },
            { id: 'buddhist-sculpture', title: 'The Art of Sculpture', subtitle: 'Rock-Cut Devotion', description: 'Examine the evolution of Sinhalese sculptural art across centuries, from enormous reclining statues holding serene expressions to rows of seated figures carved directly from the living rock.', image: '/assets/dambulla/dambulla-1.webp', highlights: ['Rock Carving Techniques', 'Iconographic Postures', 'Scale and Proportion'] }
        ]
    },
    'polonnaruwa': {
        id: 'polonnaruwa',
        name: 'Polonnaruwa',
        type: 'Ancient City',
        heroImage: '/assets/pollonnaruwa/galviharaya-polonnaruwa.webp',
        gallery: [
            '/assets/pollonnaruwa/galviharaya-polonnaruwa.webp'
        ],
        tagline: 'The Medieval Capital',
        description: 'Polonnaruwa rose to prominence after the destruction of Anuradhapura in 993. It reached its zenith under King Parakramabahu I in the 12th century. The ruins are incredibly well-preserved, showcasing a compact and brilliant cluster of ancient Sinhalese art and architecture.',
        stats: {
            bestTime: 'May to September',
            elevation: '60 m',
            famousFor: 'Rock Buddhas & Cycling Tours'
        },
        attractions: [
            { name: 'Gal Vihara', image: '/assets/pollonnaruwa/galviharaya-polonnaruwa.webp', description: 'A staggeringly beautiful rock shrine featuring four Buddha statues carved continuously from a single granite wall.' },
            { name: 'The Vatadage', image: '/assets/pollonnaruwa/galviharaya-polonnaruwa.webp', description: 'An exquisitely carved circular relic house measuring 18 meters in diameter, representing the pinnacle of Polonnaruwa architecture.' },
            { name: 'Parakrama Samudra', image: '/assets/pollonnaruwa/galviharaya-polonnaruwa.webp', description: 'A colossal artificial irrigation lake so vast the ancients named it the "Sea of Parakrama".' },
            { name: 'The Royal Palace Complex', image: '/assets/pollonnaruwa/galviharaya-polonnaruwa.webp', description: 'The ruins of King Parakramabahu\'s palace, which originally stood seven stories tall and contained 1,000 rooms.' }
        ],
        activities: [
            { title: 'Historic Sunset Boat Ride', desc: 'Drift across the colossal ancient Parakrama Samudra reservoir on an exclusive sunset boat tour accompanied by premium evening refreshments.' },
            { title: 'Private Monkey Kingdom Tour', desc: 'Take a specialized, guided primate tour to observe the complex social behaviors of local monkeys as featured in major wildlife documentaries.' },
            { title: 'Cycling the Ancient City', desc: 'Polonnaruwa’s ruins are spread out but connected by flat roads, making cycling the best way to explore the Citadel, Quadrangle, and outlying monuments efficiently.' },
            { title: 'Visit the Archaeological Museum', desc: 'Start your journey at the museum to see models of the ancient buildings as they once stood, along with well-preserved artifacts from the kingdom.' }
        ],
        cultural_insights: [
            { id: 'stone-masonry', title: 'Granite Masterpieces', subtitle: 'Architectural Genius', description: 'Stand in awe before the Gal Vihara, where four immense, remarkably emotive Buddha statues were masterfully chiseled directly out of a single, solid piece of granite.', image: '/assets/pollonnaruwa/galviharaya-polonnaruwa.webp', highlights: ['Stone Carving Tools', 'Expressions of Serenity', 'Monolithic Construction'] },
            { id: 'royal-palaces', title: 'Medieval Grandeur', subtitle: 'The Royal Court', description: 'Visualize the former glory of King Parakramabahu’s reign by exploring the imposing brick ruins of his seven-story palace and the intricately carved Royal Council Chamber.', image: '/assets/pollonnaruwa/galviharaya-polonnaruwa.webp', highlights: ['Palace Layouts', 'Moonstone Carvings', 'Council Chamber Pillars'] }
        ]
    },
    'hatton': {
        id: 'hatton',
        name: 'Hatton',
        type: 'Hill Country',
        heroImage: '/assets/hatton/hatton-1.webp',
        gallery: [
            '/assets/hatton/hatton-1.webp'
        ],
        tagline: 'The Heart of the Tea Trails',
        description: 'Hatton serves as the gateway to Sri Lankaâ€™s misty, emerald-green tea country. Characterized by plunging waterfalls, pine-studded hills, colonial-era planter bungalows, and endless carpets of Ceylon Tea bushes handled by generations of skilled pluckers.',
        stats: {
            bestTime: 'December to April',
            elevation: '1,271 m',
            famousFor: 'Ceylon Tea & Cool Climate'
        },
        attractions: [
            { name: 'Castlereagh Reservoir', image: '/assets/hatton/hatton-1.webp', description: 'A mirror-like lake hidden in a deep valley, wrapped by dense pine forests and the finest tea estates.' },
            { name: 'Horton Plains National Park', image: '/assets/hatton/hatton-1.webp', description: 'A bleak but beautiful highland plateau leading to the dramatic 880-meter vertical drop known as World\'s End.' },
            { name: 'Adam\'s Peak (Sri Pada)', description: 'A towering, sharply pointed holy mountain. It is a major pilgrimage site due to a footprint rock formation at its summit.' },
            { name: 'Working Tea Factories', image: '/assets/hatton/hatton-1.webp', description: 'Step inside 19th-century colonial machines that withered, rolled, and fermented the leaves that conquered the globe.' }
        ],
        activities: [
            { title: 'Exclusive Heritage High Tea', desc: 'Partake in an exceptionally luxurious, multi-course high tea served by personal butlers on the rolling lawns of a restored 19th-century planter’s mansion.' },
            { title: 'Private Leopard Trail Trek', desc: 'Join an expert naturalist for an exclusive hike deep through the cloud forests identifying rare highland flora and tracking the elusive mountain leopard.' },
            { title: 'Scenic Tea Walks', desc: 'Wander through manicured tea gardens, breathe in the fresh mountain air, and watch tea pluckers at work in their vibrant attire.' },
            { title: 'Tea Factory Tours', desc: 'Visit a functioning tea factory to learn about the fermentation, rolling, and drying processes, followed by a fresh cup of world-class tea.' }
        ],
        cultural_insights: [
            { id: 'tea-history', title: 'The Ceylon Tea Story', subtitle: 'Colonial Era Legacy', description: 'Trace the fascinating history of how British planters replaced devastated coffee crops with tea bushes in the 1860s, creating an industry that still defines Sri Lanka globally.', image: '/assets/hatton/hatton-1.webp', highlights: ['James Taylor\'s Legacy', 'Vintage Machinery', 'Planter Lifestyle'] },
            { id: 'estate-workers', title: 'The Pluckers\' Craft', subtitle: 'Heart of the Estate', description: 'Acknowledge the incredible skill and difficult labor of the brightly clothed tea pluckers, predominantly women of Tamil descent, whose expertise drives the entire industry.', image: '/assets/hatton/hatton-1.webp', highlights: ['Plucking Techniques', 'Estate Communities', 'Two Leaves and a Bud'] }
        ]
    },
    'airport': {
        id: 'airport',
        name: 'Colombo Airport (CMB)',
        type: 'Arrival / Departure',
        heroImage: '/assets/bandaranaike-international-airport.webp',
        gallery: [
            '/assets/bandaranaike-international-airport.webp'
        ],
        tagline: 'The Gateway to Paradise',
        description: 'Bandaranaike International Airport is your first and final taste of Sri Lanka. Situated 30km north of the capital city Colombo and right next to the beach town of Negombo, it offers a rapid transit directly into your island adventure.',
        stats: {
            bestTime: 'Year round',
            elevation: '9 m',
            famousFor: 'Aviation & Transit'
        },
        attractions: [
            { name: 'Duty-Free Shopping', image: '/assets/bandaranaike-international-airport.webp', description: 'The airport is famously one of the few places in the world where you can buy refrigerators and massive televisions duty-free upon arrival.' },
            { name: 'Airport Lounges', image: '/assets/bandaranaike-international-airport.webp', description: 'Modern, comfortable relaxing zones with traditional Sri Lankan food selections.' },
            { name: 'Aviation Architecture', image: '/assets/bandaranaike-international-airport.webp', description: 'The terminal mixes modern glass panelling with distinct tropical aesthetics and local artwork.' }
        ],
        activities: [
            { title: 'Relaxing Lounge Transit', desc: 'Bypass regular transit queues and unwind in high-end VIP lounges offering private sleeping pods and premium local cuisine.' },
            { title: 'Duty-Free Shopping Spree', desc: 'Sri Lanka offers one of the few unique arrivals duty-free zones in the world where you can immediately purchase appliances and electronics.' },
            { title: 'Quick Negombo Lagoon Tour', desc: 'Use a layover to exit the airport and take a swift, breezy boat tour through the nearby Negombo lagoon system.' }
        ],
        cultural_insights: [
            { id: 'warm-welcome', title: 'The Ayubowan Greeting', subtitle: 'Local Hospitality', description: 'Experience the traditional Sri Lankan greeting, "Ayubowan" (May you live long), offered with pressed palms—a gesture that immediately immerses you in the island’s culture of warmth.', image: '/assets/bandaranaike-international-airport.webp', highlights: ['Meaning behind Ayubowan', 'Traditional Gestures', 'Island Warmth'] }
        ]
    },
    'hikkaduwa': {
        id: 'hikkaduwa',
        name: 'Hikkaduwa',
        type: 'Snorkeling Haven',
        heroImage: '/assets/hikkaduwa-beach-1.webp',
        gallery: [
            '/assets/hikkaduwa-beach-1.webp'
        ],
        tagline: 'Vibrant Coral Reefs & Surf',
        description: 'Famous for its vibrant, shallow coral sanctuaries, Hikkaduwa is the original backpacker beach of Sri Lanka. Now an eclectic coastal town, it offers turtles swimming right up to the shore and consistent surfing waves.',
        stats: {
            bestTime: 'November to April',
            elevation: '0 m',
            famousFor: 'Coral Reefs & Sea Turtles'
        },
        attractions: [
            { name: 'Hikkaduwa Coral Sanctuary', description: 'A marine national park boasting colorful corals and schools of tropical fish.', image: '/assets/hikkaduwa-beach-1.webp' },
            { name: 'Narigama Beach', description: 'A wide stretch of golden sand, perfect for long walks and surfing.' }
        ],
        activities: [
            { title: 'Snorkeling with Turtles', desc: 'Swim alongside gentle sea turtles in their natural coral reef habitat.' },
            { title: 'Surfing', desc: 'Catch consistent breaks perfect for both beginner and intermediate surfers.' }
        ],
        cultural_insights: [
            { id: 'hikkaduwa-culture', title: 'The Surfing Pioneer', subtitle: 'Beach Lifestyle', description: 'Hikkaduwa pioneered Sri Lanka’s surf and beach party culture, fostering a deeply relaxed, bohemian lifestyle.', image: '/assets/hikkaduwa-beach-1.webp', highlights: ["Surf Culture","Beach Shacks","Turtle Conservation"] }
        ]
    },
    'unawatuna': {
        id: 'unawatuna',
        name: 'Unawatuna',
        type: 'Golden Bay',
        heroImage: '/assets/unawatuna-beach-1.webp',
        gallery: [
            '/assets/unawatuna-beach-1.webp'
        ],
        tagline: 'The Picturesque Curve',
        description: 'A banana-shaped beach lined with leaning palm trees and a vibrant coral reef, Unawatuna is one of Sri Lanka’s most universally beloved coastal spots. The water is exceptionally calm thanks to a protective reef.',
        stats: {
            bestTime: 'November to April',
            elevation: '0 m',
            famousFor: 'Calm Swimming & Beach Bars'
        },
        attractions: [
            { name: 'Japanese Peace Pagoda', description: 'A stunning white stupa offering panoramic views of the bay and the ocean.', image: '/assets/unawatuna-beach-1.webp' },
            { name: 'Jungle Beach', description: 'A secluded, pristine beach hidden within thick coastal vegetation.' }
        ],
        activities: [
            { title: 'Scuba Diving', desc: 'Dive historical wrecks and deep reefs with experienced PADI centers.' },
            { title: 'Rope Swings', desc: 'Experience the iconic Instagram-famous palm tree rope swings overlooking the water.' }
        ],
        cultural_insights: [
            { id: 'unawatuna-culture', title: 'Laid-back Horizons', subtitle: 'Southern Coast Vibe', description: 'A hub of Southern coastal culture mixing local fishing traditions with a thriving contemporary beach scene.', image: '/assets/unawatuna-beach-1.webp', highlights: ["Historical Myths","Sunset Dining","Coastal Community"] }
        ]
    },
    'mirissa': {
        id: 'mirissa',
        name: 'Mirissa',
        type: 'Whale Watching Capital',
        heroImage: '/assets/mirissa-1.webp',
        gallery: [
            '/assets/mirissa-1.webp'
        ],
        tagline: 'Where the Blue Whales Roam',
        description: 'A stunning crescent beach renowned globally as one of the best locations on Earth to witness the elusive Blue Whale. The town has a highly relaxed, tropical surfer vibe that captivates every visitor.',
        stats: {
            bestTime: 'December to March',
            elevation: '2 m',
            famousFor: 'Blue Whales & Coconut Tree Hill'
        },
        attractions: [
            { name: 'Coconut Tree Hill', description: 'An iconic dome of red earth jutting into the sea, covered entirely in soaring palm trees.', image: '/assets/mirissa-1.webp' },
            { name: 'Secret Beach', description: 'A tiny, beautiful cove tucked away from the main stretch.' }
        ],
        activities: [
            { title: 'Blue Whale Safari', desc: 'Set sail into the deep Indian Ocean to encounter the largest animal to ever exist.' },
            { title: 'Surfing the Point', desc: 'Catch waves alongside local and international surfers at Mirissa’s right-hand point break.' }
        ],
        cultural_insights: [
            { id: 'mirissa-culture', title: 'Oceanic Giants', subtitle: 'Marine Deep', description: 'The town’s entire rhythm is dictated by the ocean and the awe-inspiring marine giants that pass just offshore.', image: '/assets/mirissa-1.webp', highlights: ["Marine Biology","Stilt Fishing","Tropical Lifestyle"] }
        ]
    },
    'colombo': {
        id: 'colombo',
        name: 'Colombo',
        type: 'Capital City',
        heroImage: '/assets/bandaranaike-international-airport.webp',
        gallery: [
            '/assets/bandaranaike-international-airport.webp'
        ],
        tagline: 'The Commercial Heart of Sri Lanka',
        description: 'A vibrant metropolis where modern high-rises overlook colonial-era buildings and the vast Indian Ocean. Colombo is the bustling commercial capital, offering a mix of street food, fine dining, shopping, and diverse cultural sites.',
        stats: {
            bestTime: 'November to April',
            elevation: '1 m',
            famousFor: 'Urban Culture & Shopping'
        },
        attractions: [
            { name: 'Galle Face Green', description: 'A vast urban park along the ocean, famous for spectacular sunsets and street food.', image: '/assets/bandaranaike-international-airport.webp' },
            { name: 'Gangaramaya Temple', description: 'A massive, eclectic Buddhist temple blending modern architecture with cultural essence.' }
        ],
        activities: [
            { title: 'Tuk-Tuk City Safari', desc: 'Zip through the chaotic but charming streets in a local tuk-tuk discovering hidden gems.' },
            { title: 'Culinary Walk', desc: 'Taste the diverse array of Sri Lankan street food from kottu to hoppers.' }
        ],
        cultural_insights: [
            { id: 'colombo-culture', title: 'A Melting Pot', subtitle: 'Modern Meets Tradition', description: 'Colombo represents the intersection of Sri Lanka’s past and future, heavily influenced by its colonial history.', image: '/assets/bandaranaike-international-airport.webp', highlights: ["Colonial Architecture","Urban Markets","Diverse Demographics"] }
        ]
    },
    'wilpattu': {
        id: 'wilpattu',
        name: 'Wilpattu',
        type: 'National Park',
        heroImage: '/assets/wild-life/yala-national-park-sri-lanka-1.webp',
        gallery: [
            '/assets/wild-life/yala-national-park-sri-lanka-1.webp'
        ],
        tagline: 'The Land of Lakes',
        description: 'Sri Lanka’s largest and oldest national park, uniquely characterized by its "Villus" (natural, sand-rimmed water basins). It offers a highly authentic, uncrowded leopard and sloth bear safari experience.',
        stats: {
            bestTime: 'February to October',
            elevation: '15 m',
            famousFor: 'Leopards & Natural Lakes'
        },
        attractions: [
            { name: 'The Villu Lakes', description: 'Dozens of natural rainwater lakes drawing an incredible density of wildlife.', image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp' },
            { name: 'Kudiramalai Point', description: 'A legendary historical landing site featuring copper-colored sand and sheer cliffs dropping into the sea.' }
        ],
        activities: [
            { title: 'Remote Wildlife Tracking', desc: 'Embark on a quiet, extended jeep safari far from any crowds to track leopards and bears.' },
            { title: 'Birdwatching Expedition', desc: 'Spot endemic and migratory birds thriving around the unique Villu ecosystems.' }
        ],
        cultural_insights: [
            { id: 'wilpattu-culture', title: 'Ancient Origins', subtitle: 'Historical Landfalls', description: 'Legend states Prince Vijaya, the founder of the Sinhalese race, landed near Wilpattu in 543 BC.', image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp', highlights: ["Mythological History","Kudiramalai Lore","Conservation"] }
        ]
    },
    'minneriya': {
        id: 'minneriya',
        name: 'Minneriya',
        type: 'National Park',
        heroImage: '/assets/wild-life/yala-national-park-sri-lanka-2.webp',
        gallery: [
            '/assets/wild-life/yala-national-park-sri-lanka-2.webp'
        ],
        tagline: 'The Great Elephant Gathering',
        description: 'Centered around an ancient tank built in the 3rd century, Minneriya becomes the stage for the largest gathering of Asian elephants on Earth during the dry season, an unforgettable natural spectacle.',
        stats: {
            bestTime: 'July to October',
            elevation: '100 m',
            famousFor: 'The Elephant Gathering'
        },
        attractions: [
            { name: 'Minneriya Tank', description: 'A massive 3rd-century reservoir whose receding shores provide fresh grass for hundreds of elephants.', image: '/assets/wild-life/yala-national-park-sri-lanka-2.webp' }
        ],
        activities: [
            { title: 'The Gathering Safari', desc: 'Witness up to 300 elephants feeding, bathing, and socializing on the exposed grassy banks.' }
        ],
        cultural_insights: [
            { id: 'minneriya-culture', title: 'Symbiosis of Man & Nature', subtitle: 'Ancient Engineering', description: 'The ancient reservoir that sustains this wildlife was engineered by King Mahasen, proving centuries of harmonious coexistence.', image: '/assets/wild-life/yala-national-park-sri-lanka-2.webp', highlights: ["Hydraulic Heritage","Elephant Herds","Eco-tourism"] }
        ]
    },
    'galoya': {
        id: 'galoya',
        name: 'Gal Oya',
        type: 'National Park',
        heroImage: '/assets/wild-life/yala-national-park-sri-lanka-1.webp',
        gallery: [
            '/assets/wild-life/yala-national-park-sri-lanka-1.webp'
        ],
        tagline: 'The Untouched Wilderness',
        description: 'One of Sri Lanka’s most secluded parks, famous for offering the only boat safari in the country. Here, elephants can be seen swimming from island to island in the enormous Senanayake Samudraya reservoir.',
        stats: {
            bestTime: 'March to December',
            elevation: '100 m',
            famousFor: 'Swimming Elephants & Boat Safaris'
        },
        attractions: [
            { name: 'Senanayake Samudraya', description: 'A sprawling, deeply scenic reservoir dotted with lush islands.', image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp' },
            { name: 'Monkey Mountain', description: 'A hike offering sweeping 360-degree views of the virgin canopy below.' }
        ],
        activities: [
            { title: 'Boat Safari', desc: 'Glide silently on the water to watch elephants grazing on the shores or swimming across the lake.' },
            { title: 'Vedda Village Visit', desc: 'Walk with the Chief of the Veddas (Sri Lanka’s indigenous people) to learn ancient foraging techniques.' }
        ],
        cultural_insights: [
            { id: 'galoya-culture', title: 'The Indigenous Veddas', subtitle: 'Ancient Hunter-Gatherers', description: 'The region is home to the last remaining groups of Sri Lanka’s aboriginal people, offering a glimpse into prehistoric living.', image: '/assets/wild-life/yala-national-park-sri-lanka-1.webp', highlights: ["Aboriginal History","Forest Survival Skills","Untouched Jungles"] }
        ]
    },
    'udawalawe': {
        id: 'udawalawe',
        name: 'Udawalawe',
        type: 'National Park',
        heroImage: '/assets/wild-life/yala-national-park-sri-lanka-2.webp',
        gallery: [
            '/assets/wild-life/yala-national-park-sri-lanka-2.webp'
        ],
        tagline: 'Elephant Paradise',
        description: 'With a landscape of open plains and scrub jungle resembling the African savannah, Udawalawe guarantees incredible elephant sightings year-round along with fantastic birdlife.',
        stats: {
            bestTime: 'Year Round',
            elevation: '60 m',
            famousFor: 'Elephants & Elephant Transit Home'
        },
        attractions: [
            { name: 'Udawalawe Reservoir', description: 'The lifeblood of the park where massive herds congregate to bathe and drink.', image: '/assets/wild-life/yala-national-park-sri-lanka-2.webp' },
            { name: 'Elephant Transit Home', description: 'An incredibly ethical rehabilitation center that cares for orphaned elephant calves before releasing them.' }
        ],
        activities: [
            { title: 'Open Top Jeep Safari', desc: 'Cruise the expansive savannahs tracking elephants, water buffalo, and raptors.' },
            { title: 'Calf Milk Feeding', desc: 'Watch from a distance as orphaned elephant calves eagerly rush down for their scheduled milk feeding at the Transit Home.' }
        ],
        cultural_insights: [
            { id: 'udawalawe-culture', title: 'Ethical Conservation', subtitle: 'Wildlife Rescue', description: 'Udawalawe represents the forefront of ethical elephant conservation on the island, strictly prioritizing the rehabilitation and wild release of orphans.', image: '/assets/wild-life/yala-national-park-sri-lanka-2.webp', highlights: ["Orphan Rehabilitation","Anti-captivity Stance","Savannah Ecosystems"] }
        ]
    },
    'nuwaraeliya': {
        id: 'nuwaraeliya',
        name: 'Nuwara Eliya',
        type: 'Hill Station',
        heroImage: '/assets/nuwara-eliya/nuwara-eliya-2.webp',
        gallery: [
            '/assets/nuwara-eliya/nuwara-eliya-2.webp'
        ],
        tagline: 'Little England',
        description: 'Nestled amidst lush tea estates and mist-shrouded mountains, Nuwara Eliya is characterized by its crisp, cool climate and profoundly British colonial architecture, from red-brick post offices to manicured golf courses.',
        stats: {
            bestTime: 'February to April',
            elevation: '1,868 m',
            famousFor: 'Cool Climate & Tea Estates'
        },
        attractions: [
            { name: 'Lake Gregory', description: 'A picturesque lake in the center of town surrounded by blooming flowers and Victorian houses.', image: '/assets/nuwara-eliya/nuwara-eliya-2.webp' },
            { name: 'Hakgala Botanical Gardens', description: 'The second-largest botanical garden in Sri Lanka, boasting immense collections of roses and orchids.' }
        ],
        activities: [
            { title: 'Tea Estate Tours', desc: 'Wander exactly where the world’s finest tea is grown and engage in professional tea tasting sessions.' },
            { title: 'Victorian High Tea', desc: 'Soak in the colonial elegance at The Grand Hotel with a traditional afternoon high tea served on the lawn.' }
        ],
        cultural_insights: [
            { id: 'nuwaraeliya-culture', title: 'Colonial Retreats', subtitle: 'British Heritage', description: 'Once the premier escape for British planters seeking a cooler climate, the town still meticulously preserves its colonial sporting clubs and Tudor architecture.', image: '/assets/nuwara-eliya/nuwara-eliya-2.webp', highlights: ["Tudor Architecture","Horse Racing","Tea Planter Elite"] }
        ]
    },
    'hortonplains': {
        id: 'hortonplains',
        name: 'Horton Plains',
        type: 'National Park',
        heroImage: '/assets/nuwara-eliya/nuwara-eliya-2.webp',
        gallery: [
            '/assets/nuwara-eliya/nuwara-eliya-2.webp'
        ],
        tagline: 'The Edge of the World',
        description: 'A beautifully bleak, windswept highland plateau of montane grasslands and cloud forests. It offers some of the most dramatic and rewarding trekking paths in the country, culminating in a precipitous 880-meter drop.',
        stats: {
            bestTime: 'January to March',
            elevation: '2,100 m',
            famousFor: 'World\'s End & Baker\'s Falls'
        },
        attractions: [
            { name: 'World\'s End', description: 'A sheer cliff plummeting nearly a kilometer down, offering views that stretch all the way to the southern ocean on clear mornings.', image: '/assets/nuwara-eliya/nuwara-eliya-2.webp' },
            { name: 'Baker\'s Falls', description: 'A freezing, cascading waterfall set amidst dense, twisting cloud-forest vegetation.' }
        ],
        activities: [
            { title: 'Dawn Trekking', desc: 'Hike the 9km circular trail just as the sun rises to beat the mist rolling into the valleys.' },
            { title: 'Endemic Wildlife Spotting', desc: 'Look out for Sambar deer grazing the plateau and the elusive Bear Monkey overhead.' }
        ],
        cultural_insights: [
            { id: 'hortonplains-culture', title: 'Montane Ecosystems', subtitle: 'Sky Islands', description: 'These high altitude plateaus act as \'sky islands\', harboring an incredibly unique set of flora and fauna found absolutely nowhere else on Earth.', image: '/assets/nuwara-eliya/nuwara-eliya-2.webp', highlights: ["Endemic Species","Cloud Forests","Geological Marvels"] }
        ]
    },
    'ella': {
        id: 'ella',
        name: 'Ella',
        type: 'Mountain Village',
        heroImage: '/assets/ella/ella-1.webp',
        gallery: [
            '/assets/ella/ella-1.webp'
        ],
        tagline: 'The Backpacker\'s Hill Retreat',
        description: 'A charming, utterly breathtaking village perched on a mountain gap. Ella has evolved into a vibrant hub for hikers, naturalists, and those seeking epic vistas across plunging ravines.',
        stats: {
            bestTime: 'January to May',
            elevation: '1,041 m',
            famousFor: 'Nine Arch Bridge & Ella Rock'
        },
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
            { id: 'ella-culture', title: 'The Ramayana Trail', subtitle: 'Myth & Legend', description: 'Ella is deeply connected to the ancient Indian epic, the Ramayana, with many caves and falls named after the demon-king Ravana.', image: '/assets/ella/ella-1.webp', highlights: ["Ravana Mythology","Backpacker Culture","Tea Country Views"] }
        ]
    },
    'kitulgala': {
        id: 'kitulgala',
        name: 'Kitulgala',
        type: 'Adventure Base',
        heroImage: '/assets/kitulgala/adventure-1.webp',
        gallery: [
            '/assets/kitulgala/adventure-1.webp'
        ],
        tagline: 'The Adrenaline Capital',
        description: 'A deeply forested, wet-zone village sitting on the wide Kelani River. It serves as the undisputed premier destination for adventure sports and rainforest exploration in Sri Lanka.',
        stats: {
            bestTime: 'December to March',
            elevation: '110 m',
            famousFor: 'White Water Rafting'
        },
        attractions: [
            { name: 'Kelani River', description: 'A powerful, wide river featuring class II and III rapids coursing through lush jungle.', image: '/assets/kitulgala/adventure-1.webp' },
            { name: 'Belilena Cave', description: 'A prehistoric cave where the skeletal remains of the 12,000-year-old "Balangoda Man" were discovered.' }
        ],
        activities: [
            { title: 'White Water Rafting', desc: 'Navigate exciting rapids down the Kelani river guided by expert adventure teams.' },
            { title: 'Canyoning & Abseiling', desc: 'Slide down natural rock funnels and rappel down cascading waterfalls deep in the rainforest.' }
        ],
        cultural_insights: [
            { id: 'kitulgala-culture', title: 'River on Film', subtitle: 'Hollywood History', description: 'Kitulgala gained international fame as the primary filming location for the 1957 Oscar-winning epic "The Bridge on the River Kwai".', image: '/assets/kitulgala/adventure-1.webp', highlights: ["Film History","Prehistoric Fossils","Adventure Communties"] }
        ]
    },
    'knuckles': {
        id: 'knuckles',
        name: 'Knuckles',
        type: 'Mountain Range',
        heroImage: '/assets/knuckles/knuckles-1.webp',
        gallery: [
            '/assets/knuckles/knuckles-1.webp'
        ],
        tagline: 'The Untamed Highlands',
        description: 'A rugged, staggeringly beautiful mountain range resembling the knuckles of a clenched fist. Named a UNESCO World Heritage site, it holds some of the most undisturbed, isolated wilderness left on the island.',
        stats: {
            bestTime: 'June to August',
            elevation: '1,863 m',
            famousFor: 'Pristine Trekking & Biodiversity'
        },
        attractions: [
            { name: 'Cloud Forests', description: 'Densely packed, mist-shrouded forests rich in completely endemic species and hidden waterfalls.', image: '/assets/knuckles/knuckles-1.webp' },
            { name: 'Mini World\'s End', description: 'A spectacular cliff drop offering expansive views across sweeping emerald valleys.' }
        ],
        activities: [
            { title: 'Hardcore Trekking', desc: 'Take multi-day guided hikes camping in remote, completely wild environments far from civilization.' },
            { title: 'Isolated Village Visits', desc: 'Interact with Meemure village, an unbelievably secluded settlement holding tightly onto ancient agricultural ways.' }
        ],
        cultural_insights: [
            { id: 'knuckles-culture', title: 'The Lost World', subtitle: 'Untouched Biodiversity', description: 'The intense isolation has resulted in a hyper-endemic ecosystem, preserving species and traditional ways of life completely unaltered by modernity.', image: '/assets/knuckles/knuckles-1.webp', highlights: ["Hyper-Endemism","Remote Communities","Conservation Peaks"] }
        ]
    },
    'weligama': {
        id: 'weligama',
        name: 'Weligama',
        type: 'Surfing Bay',
        heroImage: '/assets/mirissa-1.webp',
        gallery: [
            '/assets/mirissa-1.webp'
        ],
        tagline: 'The Surfer\'s Sanctuary',
        description: 'Meaning "Sandy Village," Weligama is a massive, incredibly scenic bay with a shallow sandy bottom, making it the absolute best destination for surfing beginners in South Asia.',
        stats: {
            bestTime: 'November to April',
            elevation: '1 m',
            famousFor: 'Beginner Surfing & Taprobane Island'
        },
        attractions: [
            { name: 'Taprobane Island', description: 'A tiny, absurdly picturesque island sitting right in the surf break, occupied entirely by a neo-palladian mansion.', image: '/assets/mirissa-1.webp' },
            { name: 'Weligama Waves', description: 'Long, rolling, remarkably forgiving waves spreading consistently across the 2-kilometer bay.' }
        ],
        activities: [
            { title: 'Surf Camps', desc: 'Join one of the dozens of world-class surf schools operating straight off the sand.' },
            { title: 'Stilt Fishing Photography', desc: 'Witness and photograph the iconic, traditional method of stilt fishing practiced exclusively in the south.' }
        ],
        cultural_insights: [
            { id: 'weligama-culture', title: 'Stilts and Surfboards', subtitle: 'The new South Coast', description: 'A compelling juxtaposition where ancient local stilt fishermen cast lines right beside a booming, international modern surf-culture.', image: '/assets/mirissa-1.webp', highlights: ["Stilt Fishing","Surf Economy","Coastal Integration"] }
        ]
    },
    'sigiriya': {
        id: 'sigiriya',
        name: 'Sigiriya',
        type: 'Ancient Fortress',
        heroImage: '/assets/culture-package/sigiriya.webp',
        gallery: [
            '/assets/culture-package/sigiriya.webp'
        ],
        tagline: 'The Eighth Wonder of the World',
        description: 'An impossible fortress carved into a 200-meter-high sheer rock monolith jutting violently from the jungle plains. Built by a rogue King in the 5th century, it is universally considered Sri Lanka’s greatest ancient architectural marvel.',
        stats: {
            bestTime: 'January to April',
            elevation: '349 m',
            famousFor: 'The Lion Rock Fortress'
        },
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
            { id: 'sigiriya-culture', title: 'Madness and Masterpiece', subtitle: 'The Parricide King', description: 'King Kashyapa built this extravagant, heavily fortified palace in the clouds entirely out of fear and guilt after murdering his father and seizing the throne.', image: '/assets/culture-package/sigiriya.webp', highlights: ["Ancient Hydro-Engineering","Fresco Maidens","Palatial Fortifications"] }
        ]
    }
}
