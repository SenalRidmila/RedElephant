const fs = require('fs');
const destStr = fs.readFileSync('src/app/data/destinations.ts', 'utf8');
const packStr = fs.readFileSync('src/app/data/packages.ts', 'utf8');

const mapPointsIds = [...packStr.matchAll(/mapPoints: \[([\s\S]*?)\]/g)].reduce((acc, m) => {
    const ptBlocks = m[1].split('},');
    ptBlocks.forEach(block => {
        const idM = block.match(/id: '([^']+)'/);
        const nameM = block.match(/name: '([^']+)'/);
        const typeM = block.match(/type: '([^']+)'/);
        const descM = block.match(/description: (?:'|")([^'"]+)(?:'|")/);
        const imgM = block.match(/image: '([^']+)'/);

        if (idM) {
            const id = idM[1];
            acc[id] = {
                id,
                name: nameM ? nameM[1] : "Destination",
                type: typeM ? typeM[1] : "Region",
                tagline: descM ? descM[1] : "Explore the wonders of Sri Lanka.",
                heroImage: imgM ? imgM[1] : "/assets/dest-anuradhapura-ruwanwelisaya.webp"
            };
        }
    });
    return acc;
}, {});

// Find IDs already correctly registered as top-level keys in destinations object
// Looking for something like 'cmbo': {
const dIds = [...destStr.matchAll(/\s+'?(\w+)'?:\s+\{\s+id:/g)].map(x => x[1]);
const missingIds = Object.keys(mapPointsIds).filter(id => !dIds.includes(id) && id !== 'cmbo');

let newContent = "";
let currentDestStr = destStr;

missingIds.forEach(id => {
    const d = mapPointsIds[id];
    const newAddition = `,
    '${id}': {
        id: '${id}',
        name: '${d.name.replace(/'/g, "\\'")}',
        type: '${d.type.replace(/'/g, "\\'")}',
        heroImage: '${d.heroImage}',
        gallery: [
            '${d.heroImage}'
        ],
        tagline: '${d.tagline.replace(/'/g, "\\'")}',
        description: 'Discover the captivating beauty and unique history of ${d.name.replace(/'/g, "\\'")}. Here, adventure meets tranquility in an unforgettable journey. Experience local culture, stunning landscapes, and memories that last a lifetime.',
        stats: {
            bestTime: 'Year Round',
            elevation: 'Varies',
            famousFor: '${d.type.replace(/'/g, "\\'")}'
        },
        attractions: [
            { name: 'Main Landmark', description: 'Behold the incredible centerpiece of the region, carrying untold stories from the past.', image: '${d.heroImage}' }
        ],
        activities: [
            { title: 'Local Immersion', desc: 'Dive into the everyday lifestyle and interact with the communities.' }
        ],
        cultural_insights: [
            { id: '${id}-culture', title: 'Rich Traditions', subtitle: 'Living History', description: 'A seamless blend of ancient practices living on in the modern day.', image: '${d.heroImage}', highlights: ['Local Arts', 'Folklore', 'Cuisine'] }
        ]
    }`;
    newContent += newAddition;
});

// Remove trailing bracket properly and append
currentDestStr = currentDestStr.replace(/\s*\}\s*$/, newContent + '\n}\n');
fs.writeFileSync('src/app/data/destinations.ts', currentDestStr);

console.log('Appended ' + missingIds.length + ' missing destinations.');
