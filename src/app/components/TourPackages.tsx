'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/* ─── tokens ─── */
const crimson = '#C41E3A';
const gold = '#C9A96E';
const dark = '#1A1714';
const ivory = '#F8F5F0';
const muted = '#8A8074';

/* ─── data ─── */
const packages = [
    {
        id: 'cultural-classic',
        category: 'culture',
        title: 'Cultural Classic',
        subtitle: "Sri Lanka's Ancient Heart",
        image: '/assets/culture-package/sigiriya.webp',
        price: 1290,
        duration: '7 Days / 6 Nights',
        group: 'Up to 12',
        difficulty: 'Easy',
        badge: 'Best Seller',
        badgeColor: crimson,
        highlights: ['Sigiriya Rock Fortress', 'Temple of the Tooth', 'Dambulla Cave Temple', 'Polonnaruwa Ruins'],
        accent: '#B97C3A',
        rating: 4.9,
        reviews: 312,
    },
    {
        id: 'coastal-escape',
        category: 'beach',
        title: 'Coastal Escape',
        subtitle: 'Sun, Surf & Serenity',
        image: '/assets/hikkaduwa-beach-1.webp',
        price: 980,
        duration: '5 Days / 4 Nights',
        group: 'Up to 10',
        difficulty: 'Easy',
        badge: 'Popular',
        badgeColor: '#2D9CDB',
        highlights: ['Hikkaduwa Reef Snorkelling', 'Mirissa Whale Watching', 'Unawatuna Sunset Beach', 'Galle Fort Walk'],
        accent: '#2D9CDB',
        rating: 4.8,
        reviews: 195,
    },
    {
        id: 'wildlife-safari',
        category: 'wildlife',
        title: 'Ultimate Safari',
        subtitle: 'Giants, Leopards & Wild Skies',
        image: '/assets/yala-national-park-1.webp',
        price: 1490,
        duration: '6 Days / 5 Nights',
        group: 'Up to 8',
        difficulty: 'Moderate',
        badge: 'Premium',
        badgeColor: '#D4842A',
        highlights: ['Yala Leopard Safari', 'Minneriya Elephant Gathering', 'Udawalawe Sunrise Drive', 'Expert Naturalist Guide'],
        accent: '#D4842A',
        rating: 4.9,
        reviews: 178,
    },
    {
        id: 'highland-retreat',
        category: 'nature',
        title: 'Highland Retreat',
        subtitle: 'Tea, Mist & Mountain Trails',
        image: '/assets/horton-plains-1.webp',
        price: 1150,
        duration: '6 Days / 5 Nights',
        group: 'Up to 10',
        difficulty: 'Moderate',
        badge: 'Scenic',
        badgeColor: '#52B788',
        highlights: ["World's End Hike", 'Tea Factory Tour', 'Nine Arch Bridge', 'Nuwara Eliya Gardens'],
        accent: '#52B788',
        rating: 4.8,
        reviews: 241,
    },
    {
        id: 'adventure-rush',
        category: 'adventure',
        title: 'Adventure Rush',
        subtitle: 'Rapids, Peaks & Adrenaline',
        image: '/assets/kitulgala-1.webp',
        price: 1080,
        duration: '5 Days / 4 Nights',
        group: 'Up to 8',
        difficulty: 'Challenging',
        badge: 'Thrilling',
        badgeColor: '#A855F7',
        highlights: ['Kitulgala White Water Rafting', 'Rock Climbing Ella', 'Zip-line Adventures', 'Rain Forest Trekking'],
        accent: '#A855F7',
        rating: 4.7,
        reviews: 143,
    },
    {
        id: 'honeymoon-bliss',
        category: 'beach',
        title: 'Honeymoon Bliss',
        subtitle: 'Romance Across the Island',
        image: '/assets/honeymoon-in-beach.webp',
        price: 2490,
        duration: '10 Days / 9 Nights',
        group: 'Couple',
        difficulty: 'Easy',
        badge: '✦ Luxury',
        badgeColor: '#F0A0B8',
        highlights: ['Private Beach Villa', 'Couples Spa Ritual', 'Sunset Sailing', 'Fine Dining by the Sea'],
        accent: '#C4687A',
        rating: 5.0,
        reviews: 88,
    },
];

const tabs = [
    { key: 'all', label: 'All Packages' },
    { key: 'culture', label: 'Culture' },
    { key: 'beach', label: 'Beach' },
    { key: 'wildlife', label: 'Wildlife' },
    { key: 'nature', label: 'Nature' },
    { key: 'adventure', label: 'Adventure' },
];

/* ─── tilt card ─── */
function PackageCard({ pkg, delay }: { pkg: typeof packages[0]; delay: number }) {
    const router = useRouter();
    const cardRef = useRef<HTMLDivElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const el = wrapRef.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.08 });
        obs.observe(el); return () => obs.disconnect();
    }, []);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = cardRef.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
        const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
        el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateZ(8px)`;
    };
    const onLeave = () => {
        const el = cardRef.current; if (!el) return;
        el.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
        el.style.transform = 'none';
        setTimeout(() => { if (el) el.style.transition = 'transform 0.08s linear'; }, 600);
    };

    const handleClick = () => {
        setExiting(true);
        setTimeout(() => router.push(`/tours/${pkg.id}`), 800);
    };

    return (
        <div ref={wrapRef} style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(48px)',
            transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
            position: 'relative',
        }}>
            {/* exit fade overlay */}
            {exiting && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    background: '#ffffff',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: '32px',
                    animation: 'tpFadeIn 0.3s ease forwards',
                }}>
                    <div style={{ position: 'relative', width: 80, height: 80 }}>
                        <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(192, 57, 43, 0.1)', borderTopColor: '#C0392B', borderRadius: '50%', animation: 'tpSpinOuter 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite' }} />
                        <div style={{ position: 'absolute', inset: 12, border: '2px solid rgba(212, 132, 42, 0.1)', borderBottomColor: '#D4842A', borderRadius: '50%', animation: 'tpSpinInner 2s linear infinite reverse' }} />
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 10, height: 10, borderRadius: '50%', background: '#C0392B', boxShadow: '0 0 12px rgba(192, 57, 43, 0.4)', animation: 'tpPulse 1.5s ease-in-out infinite' }} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '0.87rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#666', fontWeight: 600, margin: 0 }}>
                            Curating Journey...
                        </p>
                    </div>
                    <style>{`
                        @keyframes tpSpinOuter { to { transform: rotate(360deg); } }
                        @keyframes tpSpinInner { to { transform: rotate(360deg); } }
                        @keyframes tpPulse { 0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 1; transform: translate(-50%, -50%) scale(1.3); } }
                    `}</style>
                </div>
            )}
            <div ref={cardRef} onClick={handleClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => { setHovered(false); onLeave(); }}
                onMouseMove={onMove}
                style={{
                    background: 'white',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    willChange: 'transform',
                    boxShadow: hovered
                        ? `0 32px 64px rgba(0,0,0,0.13), 0 0 0 1.5px ${pkg.accent}44`
                        : '0 4px 24px rgba(0,0,0,0.07)',
                    transition: 'box-shadow 0.4s ease',
                    cursor: 'pointer',
                    display: 'flex', flexDirection: 'column',
                }}
            >
                {/* Photo */}
                <div style={{ position: 'relative', height: '230px', overflow: 'hidden', flexShrink: 0 }}>
                    <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url(${pkg.image})`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        transition: 'transform 0.7s cubic-bezier(0.23,1,0.32,1)',
                        transform: hovered ? 'scale(1.07)' : 'scale(1)',
                    }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,14,10,0.6) 0%, transparent 55%)' }} />

                    {/* Badge */}
                    <div style={{
                        position: 'absolute', top: '14px', left: '14px',
                        background: pkg.badgeColor,
                        color: 'white',
                        fontFamily: 'var(--font-accent)',
                        fontSize: '0.85rem', fontWeight: 800,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        padding: '5px 12px', borderRadius: '50px',
                        boxShadow: `0 4px 12px ${pkg.badgeColor}55`,
                    }}>{pkg.badge}</div>

                    {/* Rating */}
                    <div style={{
                        position: 'absolute', top: '14px', right: '14px',
                        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '50px', padding: '4px 10px',
                        fontFamily: 'var(--font-accent)', fontSize: '0.94rem',
                        color: gold, fontWeight: 700,
                        display: 'flex', alignItems: 'center', gap: '4px',
                    }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill={gold}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        {pkg.rating}
                    </div>

                    {/* Price tag */}
                    <div style={{
                        position: 'absolute', bottom: '14px', right: '14px',
                        background: 'rgba(255,255,255,0.95)',
                        borderRadius: '12px', padding: '6px 14px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                    }}>
                        <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.96rem', fontWeight: 700, letterSpacing: '0.1em', color: muted, textTransform: 'uppercase' }}>From </span>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: dark }}>${pkg.price}</span>
                    </div>
                </div>

                {/* Content */}
                <div style={{ padding: '22px 22px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Label */}
                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: pkg.accent, marginBottom: '5px' }}>{pkg.subtitle}</div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: dark, margin: '0 0 12px', letterSpacing: '-0.01em' }}>{pkg.title}</h3>

                    {/* Meta row */}
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '14px' }}>
                        {[
                            { icon: '🕐', text: pkg.duration },
                            { icon: '👥', text: pkg.group },
                            { icon: '⚡', text: pkg.difficulty },
                        ].map(m => (
                            <div key={m.text} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-body)', fontSize: '1.14rem', color: muted }}>
                                <span style={{ fontSize: '1rem' }}>{m.icon}</span>{m.text}
                            </div>
                        ))}
                    </div>

                    {/* Highlights */}
                    <div style={{
                        overflow: 'hidden',
                        maxHeight: hovered ? '100px' : '0',
                        opacity: hovered ? 1 : 0,
                        transition: 'max-height 0.45s cubic-bezier(0.23,1,0.32,1), opacity 0.35s ease 0.05s',
                        marginBottom: hovered ? '14px' : '0',
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {pkg.highlights.slice(0, 3).map(h => (
                                <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: pkg.accent, flexShrink: 0 }} />
                                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: muted }}>{h}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.96rem', color: muted }}>{pkg.reviews} reviews</span>
                        <span style={{
                            background: hovered ? pkg.accent : 'transparent',
                            border: `1.5px solid ${pkg.accent}`,
                            color: hovered ? 'white' : pkg.accent,
                            fontFamily: 'var(--font-accent)', fontSize: '1rem', fontWeight: 800,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            padding: '9px 20px', borderRadius: '50px', cursor: 'pointer',
                            display: 'inline-flex', alignItems: 'center', gap: '7px',
                            transition: 'background 0.3s, color 0.3s',
                        }}>
                            View Details
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Main ─── */
export default function TourPackages() {
    const [active, setActive] = useState('all');
    const headRef = useRef<HTMLDivElement>(null);
    const [headVis, setHeadVis] = useState(false);

    useEffect(() => {
        const el = headRef.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeadVis(true); obs.disconnect(); } }, { threshold: 0.15 });
        obs.observe(el); return () => obs.disconnect();
    }, []);

    const filtered = active === 'all' ? packages : packages.filter(p => p.category === active);

    return (
        <section id="tour-packages" style={{ background: ivory, padding: '100px 0 110px', position: 'relative', overflow: 'hidden' }}>
            <style>{`@keyframes tpFadeIn { from { opacity:0 } to { opacity:1 } }`}</style>

            {/* ghost watermark */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                fontSize: 'clamp(6rem, 18vw, 15rem)', fontWeight: 900,
                fontFamily: 'var(--font-heading)', color: `${crimson}04`,
                letterSpacing: '-0.04em', whiteSpace: 'nowrap',
                userSelect: 'none', pointerEvents: 'none', lineHeight: 1,
            }}>PACKAGES</div>

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px,4vw,48px)', position: 'relative' }}>

                {/* Heading */}
                <div ref={headRef} style={{ marginBottom: '52px' }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px',
                        opacity: headVis ? 1 : 0, transform: headVis ? 'none' : 'translateY(16px)',
                        transition: 'opacity 0.6s ease, transform 0.6s ease',
                    }}>
                        <div style={{ width: '32px', height: '2px', background: crimson, borderRadius: '2px' }} />
                        <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.79rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: crimson }}>
                            Featured Packages
                        </span>
                        <div style={{ width: '32px', height: '2px', background: crimson, borderRadius: '2px' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 800,
                            color: dark, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1,
                            opacity: headVis ? 1 : 0, transform: headVis ? 'none' : 'translateY(20px)',
                            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
                        }}>
                            Handpicked for{' '}
                            <span style={{ color: crimson, fontStyle: 'italic' }}>Every Traveller</span>
                        </h2>
                        <p style={{
                            fontFamily: 'var(--font-body)', fontSize: '1.14rem', color: muted,
                            lineHeight: 1.7, maxWidth: '340px', margin: 0,
                            opacity: headVis ? 1 : 0, transform: headVis ? 'none' : 'translateY(20px)',
                            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
                        }}>
                            Each package is carefully curated by our travel experts — blending iconic sights, hidden gems and authentic local experiences.
                        </p>
                    </div>
                </div>

                {/* Filter tabs */}
                <div style={{
                    display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px',
                }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActive(tab.key)}
                            style={{
                                fontFamily: 'var(--font-accent)', fontSize: '0.94rem', fontWeight: 700,
                                letterSpacing: '0.12em', textTransform: 'uppercase',
                                padding: '10px 22px', borderRadius: '50px', cursor: 'pointer',
                                border: active === tab.key ? 'none' : `1.5px solid rgba(0,0,0,0.1)`,
                                background: active === tab.key ? crimson : 'white',
                                color: active === tab.key ? 'white' : muted,
                                boxShadow: active === tab.key ? `0 6px 20px ${crimson}44` : 'none',
                                transition: 'all 0.25s ease',
                            }}
                        >{tab.label}</button>
                    ))}
                </div>

                {/* Cards grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '24px',
                }}>
                    {filtered.map((pkg, i) => (
                        <PackageCard key={pkg.id} pkg={pkg} delay={i * 90} />
                    ))}
                </div>

                {/* View all CTA */}
                <div style={{ textAlign: 'center', marginTop: '60px' }}>
                    <a href="/packages" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '12px',
                        background: dark, color: 'white',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-accent)', fontSize: '0.86rem', fontWeight: 700,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        padding: '16px 40px', borderRadius: '50px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                        transition: 'background 0.25s, transform 0.25s',
                    }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = crimson; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = dark; (e.currentTarget as HTMLAnchorElement).style.transform = ''; }}
                    >
                        View All Packages
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
