import CollectionPage from '../_collection/CollectionPage';

const heritageData = {
    id: 'heritage',
    title: 'Culture & Heritage',
    subtitle: 'Living History & Adventure',
    headline: 'A Living Legacy Across the Island',
    description: 'Beyond the ancient kingdoms, Sri Lanka\'s culture and heritage pulse through vibrant modern cities, colonial-era fortresses, remote adventure rivers, and untouched rainforests. These destinations offer a diverse richness that spans colonial history, natural wonder, and authentic local living — all in one small island.',
    heroImage: '/assets/culture-and-heritage-top-banner.webp',
    accentColor: '#E67E22',
    accentGradient: 'linear-gradient(135deg, #7B1E1E 0%, #E67E22 100%)',
    stats: [
        { value: '8', label: 'UNESCO Sites' },
        { value: '500+', label: 'Years Colonial History' },
        { value: '3', label: 'Major Heritage Hubs' },
        { value: '15+', label: 'Adventure Activities' },
    ],
    destinations: [
        {
            id: 'colombo',
            name: 'Colombo',
            type: 'Capital City',
            tagline: 'The Commercial Heart of Sri Lanka',
            image: '/assets/colombo-1.webp',
            description: 'A vibrant metropolis where modern high-rises overlook colonial-era buildings and the vast Indian Ocean. Colombo offers world-class dining, culture, and street food.',
            bestTime: 'Nov – Apr',
            famousFor: 'Urban Culture & Shopping',
            highlights: ['Galle Face Green', 'Gangaramaya Temple', 'Pettah Markets'],
        },
        {
            id: 'galle',
            name: 'Galle Fort',
            type: 'Colonial Heritage',
            tagline: 'A Living 400-Year-Old Fortress',
            image: '/assets/galle-1.webp',
            description: 'A UNESCO World Heritage fortress where Dutch-colonial architecture meets bustling Southern coastline culture. Boutique lanes, cafés, and elegant rampart sunset walks.',
            bestTime: 'Dec – Mar',
            famousFor: 'Dutch Fort & Boutique Lanes',
            highlights: ['Fort Ramparts', 'Lighthouse', 'Spice Route History'],
        },
        {
            id: 'kitulgala',
            name: 'Kitulgala',
            type: 'Adventure Capital',
            tagline: 'Whitewater Thrills in the Jungle',
            image: '/assets/kitulgala-1.webp',
            description: 'Set in lush, ancient rainforests along the Kelani River, Kitulgala is Sri Lanka\'s adrenaline capital — offering world-class white water rafting, canyoning, and jungle trekking.',
            bestTime: 'May – Dec',
            famousFor: 'White Water Rafting & Adventure',
            highlights: ['White Water Rafting', 'Canyoning', 'Bridge of River Kwai Site'],
        },
        {
            id: 'negombo',
            name: 'Negombo',
            type: 'Colonial Beach Town',
            tagline: 'Little Rome of the West Coast',
            image: '/assets/negombo-1.webp',
            description: 'A fascinating blend of Portuguese and Dutch colonial history, Catholic cathedrals, centuries-old fishing traditions, and a beautiful lagoon system just 30 minutes from the airport.',
            bestTime: 'Dec – Apr',
            famousFor: 'Seafood & Dutch Canals',
            highlights: ['St. Mary\'s Cathedral', 'Hamilton Canal', 'Fish Market'],
        },
    ],
    relatedTour: { label: 'Cultural Classic Package', href: '/tours/cultural-classic' },
};

export default function HeritagePage() {
    return <CollectionPage data={heritageData} />;
}
