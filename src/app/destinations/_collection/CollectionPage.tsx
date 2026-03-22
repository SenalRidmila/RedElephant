'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Destination {
    id: string;
    name: string;
    type: string;
    tagline: string;
    image: string;
    description: string;
    bestTime: string;
    famousFor: string;
    highlights: string[];
}

interface CollectionData {
    id: string;
    title: string;
    subtitle: string;
    headline: string;
    description: string;
    heroImage: string;
    accentColor: string;
    accentGradient: string;
    stats: { value: string; label: string }[];
    destinations: Destination[];
    relatedTour: { label: string; href: string };
}

export default function CollectionPage({ data }: { data: CollectionData }) {
    const router = useRouter();
    const [windowWidth, setWindowWidth] = useState(0);
    const [scrolled, setScrolled] = useState(0);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        const handleScroll = () => setScrolled(window.scrollY);
        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1100;

    const baseDark = '#07080A';
    const gold = '#C9A96E';
    const subtleBorder = 'rgba(255,255,255,0.06)';
    const accent = data.accentColor;

    return (
        <div style={{ background: baseDark, minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>

            {/* ═══════════ GLOBAL STYLES ═══════════ */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&display=swap');

                .coll-hero-img {
                    width: 100%; height: 100%; object-fit: cover;
                    transition: transform 12s ease;
                    will-change: transform;
                }
                .coll-hero-img:hover { transform: scale(1.04); }

                .stat-item {
                    padding: 32px 24px;
                    text-align: center;
                    transition: background 0.4s;
                }
                .stat-item:hover { background: rgba(255,255,255,0.03); }

                .dest-card {
                    position: relative;
                    border-radius: 24px;
                    overflow: hidden;
                    cursor: pointer;
                    transition: transform 0.6s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.6s;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid ${subtleBorder};
                    display: flex;
                    flex-direction: column;
                }
                .dest-card:hover {
                    transform: translateY(-12px);
                    box-shadow: 0 40px 80px rgba(0,0,0,0.7), 0 0 60px ${accent}22;
                    border-color: ${accent}55;
                }
                .dest-card-img {
                    width: 100%; height: 260px; object-fit: cover;
                    transition: transform 0.8s cubic-bezier(0.2,0.8,0.2,1);
                    display: block;
                }
                .dest-card:hover .dest-card-img { transform: scale(1.08); }

                .dest-card-body {
                    padding: 28px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .highlight-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.75rem;
                    font-family: 'Outfit', sans-serif;
                    text-transform: uppercase;
                    letter-spacing: 0.12em;
                    padding: 6px 14px;
                    border-radius: 50px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                    color: rgba(255,255,255,0.65);
                    white-space: nowrap;
                }

                .explore-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 28px;
                    border-radius: 50px;
                    border: none;
                    cursor: pointer;
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.82rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    transition: all 0.4s cubic-bezier(0.2,0.8,0.2,1);
                    background: ${accent};
                    color: #07080A;
                }
                .explore-btn:hover {
                    transform: translateX(4px);
                    box-shadow: 0 8px 30px ${accent}66;
                }

                .card-overlay {
                    position: absolute;
                    inset: 0; height: 260px;
                    background: linear-gradient(180deg, transparent 40%, rgba(7,8,10,0.85) 100%);
                    pointer-events: none;
                    z-index: 2;
                }

                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .fade-card {
                    animation: fadeSlideUp 0.7s cubic-bezier(0.2,0.8,0.2,1) both;
                }
                .fade-card:nth-child(1) { animation-delay: 0.05s; }
                .fade-card:nth-child(2) { animation-delay: 0.15s; }
                .fade-card:nth-child(3) { animation-delay: 0.25s; }
                .fade-card:nth-child(4) { animation-delay: 0.35s; }
                .fade-card:nth-child(5) { animation-delay: 0.45s; }
                .fade-card:nth-child(6) { animation-delay: 0.55s; }
                .fade-card:nth-child(7) { animation-delay: 0.65s; }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 20px;
                    border-radius: 50px;
                    background: rgba(255,255,255,0.06);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255,255,255,0.1);
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.78rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    font-weight: 600;
                    color: ${accent};
                    margin-bottom: 24px;
                }

                .cta-section {
                    background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
                    border: 1px solid ${subtleBorder};
                    border-radius: 32px;
                    padding: 80px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                @media (max-width: 1100px) {
                    .cta-section { padding: 60px 40px; }
                }
                @media (max-width: 640px) {
                    .cta-section { padding: 48px 24px; }
                    .stat-item { border-right: none; border-bottom: 1px solid ${subtleBorder}; }
                    .stat-item:last-child { border-bottom: none; }
                    .dest-card-img { height: 220px; }
                    .dest-card-body { padding: 20px; }
                    .dest-card:hover { transform: translateY(-6px); }
                }

                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 32px;
                }
                @media (max-width: 1100px) {
                    .grid-container {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 24px;
                    }
                }
                @media (max-width: 640px) {
                    .grid-container {
                        grid-template-columns: 1fr;
                        gap: 20px;
                    }
                }
            `}</style>

            {/* ═══════════ HERO ═══════════ */}
            <div style={{
                position: 'relative',
                height: isMobile ? '75vh' : '90vh',
                minHeight: isMobile ? 500 : 600,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                overflow: 'hidden',
                paddingBottom: isMobile ? 60 : 100,
            }}>
                {/* Parallax bg */}
                <div style={{
                    position: 'absolute', inset: -80,
                    backgroundImage: `url(${data.heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `translateY(${scrolled * 0.35}px)`,
                    filter: 'brightness(0.5) saturate(0.75)',
                    willChange: 'transform',
                }} />

                {/* Gradients */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(7,8,10,0) 0%, rgba(7,8,10,0.4) 40%, rgba(7,8,10,1) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at bottom left, ${accent}1A 0%, transparent 60%)` }} />

                {/* Accent blob */}
                <div style={{
                    position: 'absolute', top: '20%', right: '10%',
                    width: isMobile ? 250 : 500, height: isMobile ? 250 : 500, borderRadius: '50%',
                    background: `${accent}12`,
                    filter: 'blur(100px)', pointerEvents: 'none',
                }} />

                {/* Content wrapper */}
                <div style={{
                    position: 'relative',
                    padding: isMobile ? '0 24px' : '0 80px',
                    maxWidth: 1440, margin: '0 auto',
                    width: '100%',
                    zIndex: 10,
                }}>
                    <div className="hero-badge" style={{ marginBottom: isMobile ? 16 : 24 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: accent, display: 'inline-block' }} />
                        {data.subtitle}
                    </div>

                    <h1 style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: isMobile ? '2.1rem' : 'clamp(2.8rem, 5vw, 4.2rem)',
                        fontWeight: 900, color: 'white',
                        margin: '0 0 16px', lineHeight: 1.05,
                        letterSpacing: '-0.03em',
                        textShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        maxWidth: '800px'
                    }}>
                        {data.headline}
                    </h1>

                    <p style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: isMobile ? '0.92rem' : '1.15rem',
                        color: 'rgba(255,255,255,0.65)',
                        fontWeight: 300, maxWidth: isMobile ? '100%' : 650,
                        lineHeight: 1.6, margin: 0,
                    }}>
                        {data.description}
                    </p>

                    {/* Scroll indicator */}
                    {!isMobile && (
                        <div style={{
                            marginTop: 60,
                            display: 'flex', alignItems: 'center', gap: 16,
                        }}>
                            <div style={{ width: 50, height: 1, background: `${accent}88` }} />
                            <span style={{
                                fontFamily: 'Outfit, sans-serif', fontSize: '0.72rem',
                                letterSpacing: '0.2em', textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.4)',
                            }}>
                                Scroll to explore
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* ═══════════ STATS STRIP ═══════════ */}
            <div style={{
                background: 'rgba(255,255,255,0.02)',
                borderTop: `1px solid ${subtleBorder}`,
                borderBottom: `1px solid ${subtleBorder}`,
            }}>
                <div style={{
                    maxWidth: 1440, margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr' : `repeat(${data.stats.length}, 1fr)`,
                }}>
                    {data.stats.map((stat, i) => (
                        <div key={i} className="stat-item" style={{
                            borderBottom: (isMobile || isTablet) && i < Math.floor((data.stats.length - 1) / 2) * 2 ? `1px solid ${subtleBorder}` : 'none',
                            borderRight: (isMobile || isTablet) ? (i % 2 === 0 ? `1px solid ${subtleBorder}` : 'none') : i < data.stats.length - 1 ? `1px solid ${subtleBorder}` : 'none'
                        }}>
                            <div style={{
                                fontFamily: 'Outfit, sans-serif',
                                fontSize: isMobile ? '2rem' : '2.8rem',
                                fontWeight: 900, color: accent,
                                lineHeight: 1, marginBottom: 8,
                                background: data.accentGradient,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                {stat.value}
                            </div>
                            <div style={{
                                fontFamily: 'Outfit, sans-serif',
                                fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)',
                                letterSpacing: '0.1em', textTransform: 'uppercase',
                            }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══════════ DESTINATIONS GRID ═══════════ */}
            <div style={{
                maxWidth: 1440, margin: '0 auto',
                padding: isMobile ? '60px 20px 80px' : '100px 80px 140px',
            }}>
                {/* Section Header */}
                <div style={{
                    display: 'flex', flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end',
                    marginBottom: isMobile ? 48 : 72, gap: 32,
                }}>
                    <div>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 16,
                        }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent }} />
                            <span style={{
                                fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem',
                                color: accent, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600,
                            }}>
                                {data.destinations.length} Destinations
                            </span>
                        </div>
                        <h2 style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 3.5vw, 3rem)',
                            fontWeight: 900, color: 'white', margin: 0,
                            letterSpacing: '-0.02em', lineHeight: 1.1,
                        }}>
                            {data.title}
                        </h2>
                    </div>
                    <p style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: isMobile ? '0.9rem' : '1.05rem', color: 'rgba(255,255,255,0.5)',
                        maxWidth: 420, lineHeight: 1.7, margin: 0, fontWeight: 300,
                    }}>
                        Select any destination to explore its attractions, cultural insights, and curated experiences.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid-container">
                    {data.destinations.map((dest, idx) => (
                        <div
                            key={dest.id}
                            className="dest-card fade-card"
                            style={{
                                // First card is featured only on desktop
                                gridColumn: (windowWidth >= 1100 && idx === 0) ? 'span 2' : 'span 1',
                            }}
                            onClick={() => router.push(`/destinations/${dest.id}`)}
                            onMouseEnter={() => setHoveredCard(dest.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Image */}
                            <div style={{ position: 'relative', overflow: 'hidden' }}>
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="dest-card-img"
                                    style={{
                                        height: (windowWidth >= 1100 && idx === 0) ? 380 : 260,
                                    }}
                                    onError={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${accent}33, transparent)`; e.currentTarget.src = ''; }}
                                />
                                <div className="card-overlay" style={{ height: (windowWidth >= 1100 && idx === 0) ? 380 : 260 }} />

                                {/* Type badge */}
                                <div style={{
                                    position: 'absolute', top: 20, left: 20, zIndex: 3,
                                    background: 'rgba(7,8,10,0.65)',
                                    backdropFilter: 'blur(10px)',
                                    border: `1px solid ${accent}44`,
                                    borderRadius: 50, padding: '6px 16px',
                                    fontFamily: 'Outfit, sans-serif',
                                    fontSize: '0.7rem', letterSpacing: '0.15em',
                                    textTransform: 'uppercase', color: accent,
                                    fontWeight: 600,
                                }}>
                                    {dest.type}
                                </div>

                                {/* Explore arrow */}
                                {hoveredCard === dest.id && (
                                    <div style={{
                                        position: 'absolute', top: 20, right: 20, zIndex: 3,
                                        width: 44, height: 44, borderRadius: '50%',
                                        background: accent,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.2rem', color: '#07080A',
                                        transition: 'all 0.3s',
                                        animation: 'fadeSlideUp 0.2s ease both',
                                    }}>
                                        →
                                    </div>
                                )}
                            </div>

                            {/* Body */}
                            <div className="dest-card-body">
                                <div style={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontSize: '0.7rem', color: accent,
                                    letterSpacing: '0.15em', textTransform: 'uppercase',
                                    fontWeight: 600, marginBottom: 8,
                                }}>
                                    {dest.tagline}
                                </div>

                                <h3 style={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontSize: (windowWidth >= 1100 && idx === 0) ? '1.8rem' : '1.35rem',
                                    fontWeight: 900, color: 'white',
                                    margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.1,
                                }}>
                                    {dest.name}
                                </h3>

                                <p style={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontSize: '0.94rem', color: 'rgba(255,255,255,0.55)',
                                    lineHeight: 1.7, margin: '0 0 20px', fontWeight: 300,
                                    flex: 1,
                                }}>
                                    {dest.description}
                                </p>

                                {/* Info Row */}
                                <div style={{
                                    display: 'flex', gap: 20, marginBottom: 20,
                                    borderTop: `1px solid ${subtleBorder}`,
                                    paddingTop: 16,
                                }}>
                                    <div>
                                        <div style={{
                                            fontFamily: 'Outfit, sans-serif', fontSize: '0.65rem',
                                            color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
                                            letterSpacing: '0.1em', marginBottom: 4,
                                        }}>Best Time</div>
                                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', color: 'white', fontWeight: 600 }}>{dest.bestTime}</div>
                                    </div>
                                    <div style={{ width: 1, background: subtleBorder }} />
                                    <div>
                                        <div style={{
                                            fontFamily: 'Outfit, sans-serif', fontSize: '0.65rem',
                                            color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
                                            letterSpacing: '0.1em', marginBottom: 4,
                                        }}>Famous For</div>
                                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', color: 'white', fontWeight: 600 }}>{dest.famousFor}</div>
                                    </div>
                                </div>

                                {/* Highlights */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                                    {dest.highlights.map(h => (
                                        <span key={h} className="highlight-chip">
                                            <span style={{ width: 4, height: 4, borderRadius: '50%', background: accent, display: 'inline-block', flexShrink: 0 }} />
                                            {h}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <button
                                    className="explore-btn"
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        background: hoveredCard === dest.id ? accent : 'transparent',
                                        color: hoveredCard === dest.id ? '#07080A' : accent,
                                        border: `1.5px solid ${accent}`,
                                        padding: '12px 24px',
                                        fontSize: '0.78rem'
                                    }}
                                    onClick={e => { e.stopPropagation(); router.push(`/destinations/${dest.id}`); }}
                                >
                                    Explore {dest.name} <span style={{ fontSize: '1rem' }}>→</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ═══════════ CTA BANNER ═══════════ */}
                <div style={{ marginTop: isMobile ? 60 : 100 }}>
                    <div className="cta-section">
                        {/* Background accent blob */}
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 600, height: 300, borderRadius: '50%',
                            background: `${accent}0A`, filter: 'blur(80px)',
                            pointerEvents: 'none',
                        }} />

                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 12,
                            marginBottom: 24, position: 'relative',
                        }}>
                            <div style={{ width: 36, height: 1, background: gold }} />
                            <span style={{
                                fontFamily: 'Outfit, sans-serif',
                                fontSize: '0.72rem', color: gold,
                                letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600,
                            }}>Plan Your Journey</span>
                            <div style={{ width: 36, height: 1, background: gold }} />
                        </div>

                        <h3 style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: isMobile ? '2rem' : '3.2rem',
                            fontWeight: 900, color: 'white',
                            margin: '0 0 16px', lineHeight: 1.1,
                            letterSpacing: '-0.02em', position: 'relative',
                        }}>
                            Ready to Experience {data.title}?
                        </h3>

                        <p style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: isMobile ? '0.95rem' : '1.15rem',
                            color: 'rgba(255,255,255,0.55)',
                            maxWidth: 560, margin: '0 auto 40px',
                            lineHeight: 1.7, fontWeight: 300, position: 'relative',
                        }}>
                            Let our expert team design a bespoke itinerary around these stunning destinations — crafted entirely around you.
                        </p>

                        <div style={{
                            display: 'flex', gap: 14, justifyContent: 'center',
                            flexWrap: 'wrap', position: 'relative',
                        }}>
                            <button
                                className="explore-btn"
                                style={{ background: gold, color: '#07080A', padding: '14px 32px', fontSize: '0.82rem' }}
                                onClick={() => router.push(data.relatedTour.href)}
                            >
                                View {data.relatedTour.label} →
                            </button>
                            <button
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 10,
                                    padding: '14px 32px', borderRadius: 50, cursor: 'pointer',
                                    fontFamily: 'Outfit, sans-serif', fontSize: '0.82rem',
                                    fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                                    background: 'transparent',
                                    border: `1.5px solid ${subtleBorder}`,
                                    color: 'rgba(255,255,255,0.7)',
                                    transition: 'all 0.3s',
                                }}
                                onClick={() => router.push('/packages')}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'white'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = subtleBorder; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                            >
                                All Packages
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
