'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { destinations } from '../../data/destinations';

const baseDark = '#090A09'; // Extremely deep slate/charcoal
const muted = '#939A95';
const gold = '#C9A96E';
const subtleBorder = 'rgba(255, 255, 255, 0.04)';
const glassBg = 'rgba(255, 255, 255, 0.02)';

export default function DestinationDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const [scrolled, setScrolled] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY);
        const handleResize = () => setIsMobile(window.innerWidth < 900);

        handleResize(); // init
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 404 Handle
    const data = destinations[id];
    if (!data) {
        return (
            <>
                <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: baseDark, padding: 24 }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: 16 }}>404</div>
                        <p style={{ fontFamily: 'var(--font-body)', color: muted, marginBottom: 24 }}>Destination not found.</p>
                        <button onClick={() => router.push('/tours/cultural-classic')} style={{ background: gold, color: baseDark, padding: '12px 28px', borderRadius: 50, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-accent)', fontSize: '0.84rem', letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 800 }}>← Back to Tour</button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div style={{ background: baseDark, minHeight: '100vh', color: 'white', overflowX: 'hidden', position: 'relative' }}>

            {/* Ambient Background Blur Entities for high-end aesthetic */}
            <div style={{ position: 'absolute', top: '15%', left: '-15%', width: '40%', height: '30%', background: `${gold}11`, borderRadius: '50%', filter: 'blur(140px)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', top: '55%', right: '-15%', width: '40%', height: '30%', background: 'rgba(30,50,40,0.25)', borderRadius: '50%', filter: 'blur(160px)', pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '30%', height: '20%', background: `${gold}08`, borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0 }} />

            <style>{`
                @keyframes fadeUpIn {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .stagger-1 { animation: fadeUpIn 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s both; }
                .stagger-2 { animation: fadeUpIn 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s both; }
                .stagger-3 { animation: fadeUpIn 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s both; }
                
                .glass-card {
                    background: ${glassBg};
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border: 1px solid ${subtleBorder};
                    border-radius: 20px;
                    padding: 30px;
                    transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
                    cursor: crosshair;
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.03), 0 10px 30px rgba(0,0,0,0.3);
                }
                .glass-card:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: ${gold}55;
                    transform: translateY(-8px);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 60px rgba(0,0,0,0.6);
                }
                .glass-card:hover img {
                    transform: scale(1.08) !important;
                }
                .glass-card:hover .att-title {
                    color: ${gold};
                }

                .activity-card {
                    background: rgba(255, 255, 255, 0.015);
                    border: 1px solid rgba(255, 255, 255, 0.04);
                    border-radius: 28px;
                    padding: 48px 40px;
                    position: relative;
                    overflow: hidden;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
                    transform: translateY(0);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                }
                .activity-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 100% 0%, rgba(201, 169, 110, 0.15) 0%, transparent 60%);
                    opacity: 0;
                    transition: opacity 0.7s ease;
                    pointer-events: none;
                }
                .activity-card::after {
                    content: '';
                    position: absolute;
                    bottom: 0; left: 0; right: 0; height: 3px;
                    background: ${gold};
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .activity-card:hover {
                    transform: translateY(-12px) scale(1.02);
                    background: rgba(255, 255, 255, 0.035);
                    border-color: rgba(201, 169, 110, 0.3);
                    box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 60px rgba(201, 169, 110, 0.1);
                    z-index: 10;
                }
                .activity-card:hover::before {
                    opacity: 1;
                }
                .activity-card:hover::after {
                    transform: scaleX(1);
                }
                .activity-card:hover .act-num {
                    color: ${gold};
                    transform: scale(1.1) translateX(8px);
                    text-shadow: 0 0 20px rgba(201, 169, 110, 0.5);
                }
                .act-num {
                    transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
                    font-size: 4.5rem;
                    font-weight: 900;
                    font-family: var(--font-heading);
                    color: rgba(255, 255, 255, 0.05);
                    line-height: 1;
                    margin-bottom: 24px;
                }
                @media (max-width: 900px) {
                    .activity-card { padding: 32px 24px; }
                    .act-num { font-size: 3.5rem; margin-bottom: 16px; }
                }

                .accom-card {
                    display: flex;
                    align-items: center;
                    margin-bottom: 80px;
                    border-radius: 20px;
                    background: rgba(255,255,255,0.015);
                    border: 1px solid rgba(255,255,255,0.03);
                    backdrop-filter: blur(10px);
                    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
                    position: relative;
                }
                .accom-card:hover {
                    background: rgba(255,255,255,0.025);
                    border-color: rgba(201, 169, 110, 0.15);
                }
                .accom-img-col {
                    width: 50%;
                    padding: 24px;
                }
                .accom-text-col {
                    width: 50%;
                    padding: 40px 60px;
                }
                .accom-img-wrapper {
                    width: 100%;
                    height: 380px;
                    border-radius: 12px;
                    overflow: hidden;
                    position: relative;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                }
                .accom-img-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .accom-card:hover .accom-img-wrapper img {
                    transform: scale(1.08);
                }
                .accom-feature-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-family: var(--font-accent);
                    font-size: 0.77rem;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    color: rgba(255,255,255,0.7);
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.05);
                    padding: 8px 16px;
                    border-radius: 50px;
                    margin-right: 12px;
                    margin-bottom: 12px;
                }
                
                @media (max-width: 900px) {
                    .accom-card {
                        flex-direction: column !important;
                        margin-bottom: 40px;
                    }
                    .accom-img-col, .accom-text-col {
                        width: 100% !important;
                        padding: 24px !important;
                    }
                    .accom-img-wrapper { height: 280px; }
                }
            `}</style>

            {/* HERO SECTION */}
            <div style={{
                position: 'relative',
                height: isMobile ? '80vh' : '90vh',
                minHeight: 600,
                width: '100%',
                overflow: 'hidden'
            }}>
                {/* Cinematic Parallax Images */}
                <div style={{
                    position: 'absolute', inset: -60,
                    backgroundImage: `url(${data.heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `translateY(${scrolled * 0.4}px) scale(1.05)`,
                    filter: 'brightness(0.6) saturate(0.85)',
                    willChange: 'transform'
                }} />

                {/* Refined Luxury Dark Gradients */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(9,10,9,0.1) 0%, rgba(9,10,9,0.6) 50%, rgba(9,10,9,1) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 30%, rgba(9,10,9,0.5) 100%)' }} />

                {/* Hero Content */}
                <div style={{
                    position: 'absolute',
                    bottom: isMobile ? 50 : 100,
                    left: 0, right: 0,
                    maxWidth: 1440,
                    margin: '0 auto',
                    padding: isMobile ? '0 24px' : '0 64px',
                    zIndex: 10
                }}>
                    <button onClick={() => router.back()} style={{
                        background: 'rgba(255,255,255,0.05)', border: `1px solid ${subtleBorder}`, backdropFilter: 'blur(12px)',
                        color: 'white', padding: '12px 28px', borderRadius: 50, cursor: 'pointer', fontFamily: 'var(--font-accent)',
                        fontSize: '0.77rem', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 40, display: 'inline-flex', alignItems: 'center', gap: 10,
                        transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }} onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    }} onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.borderColor = subtleBorder;
                    }}>
                        <span>&larr;</span> Back to Map
                    </button>

                    <div className="stagger-1" style={{ display: 'inline-flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                        <div style={{ width: 40, height: 1, background: gold }} />
                        <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '.25em', textTransform: 'uppercase', color: gold }}>
                            {data.type}
                        </span>
                    </div>

                    <h1 className="stagger-2" style={{
                        fontFamily: 'var(--font-heading)', fontSize: isMobile ? 'clamp(2.5rem, 10vw, 3.8rem)' : 'clamp(4rem, 8vw, 8.5rem)',
                        fontWeight: 900, color: 'white', margin: '0 0 20px', letterSpacing: '-.03em', lineHeight: 0.95,
                        textShadow: '0 20px 40px rgba(0,0,0,0.5)', wordWrap: 'break-word'
                    }}>
                        {data.name}
                    </h1>

                    <p className="stagger-3" style={{
                        fontFamily: 'var(--font-body)', fontSize: isMobile ? '1.15rem' : '1.8rem',
                        color: 'rgba(255,255,255,0.7)', fontWeight: 300, margin: 0, letterSpacing: '0em', maxWidth: 880,
                        lineHeight: 1.4
                    }}>
                        {data.tagline}
                    </p>
                </div>
            </div>

            {/* HIGH END STATS STRIP */}
            <div style={{ borderBottom: `1px solid ${subtleBorder}`, borderTop: `1px solid ${subtleBorder}`, background: glassBg, backdropFilter: 'blur(10px)', position: 'relative', zIndex: 5 }}>
                <div style={{
                    maxWidth: 1440, margin: '0 auto', padding: isMobile ? '40px 24px' : '50px 64px',
                    display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 30 : 60
                }}>
                    <div>
                        <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.72rem', color: muted, letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 12 }}>Best Time to Visit</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.4rem', color: 'white', fontWeight: 400 }}>{data.stats.bestTime}</div>
                    </div>
                    <div>
                        <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.72rem', color: muted, letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 12 }}>Elevation</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.4rem', color: 'white', fontWeight: 400 }}>{data.stats.elevation}</div>
                    </div>
                    <div>
                        <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.72rem', color: muted, letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 12 }}>Famous For</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.4rem', color: gold, fontWeight: 400 }}>{data.stats.famousFor}</div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT ZONE */}
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: isMobile ? '80px 24px 100px' : '140px 64px 180px', boxSizing: 'border-box', position: 'relative', zIndex: 10 }}>

                {/* Description Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '5fr 6fr', gap: isMobile ? 40 : 100, marginBottom: isMobile ? 100 : 180 }}>
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 900, color: 'white', margin: '0 0 40px', letterSpacing: '-.02em', lineHeight: 1.05 }}>
                            The Story of <br /><span style={{ color: gold }}>{data.name}</span>
                        </h2>
                    </div>
                    <div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '1.1rem' : '1.35rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.9, margin: 0, fontWeight: 300 }}>
                            {data.description}
                        </p>
                    </div>
                </div>

                {/* Key Attractions - Cinematic Grid */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 60 }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '2rem' : '3rem', fontWeight: 800, color: 'white', margin: 0, letterSpacing: '-.02em' }}>
                        Key Attractions
                    </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))', gap: 32 }}>
                    {data.attractions.map((attraction, idx) => (
                        <div key={idx} className="glass-card">
                            {attraction.image && (
                                <div style={{
                                    width: '100%', height: 280, marginBottom: 30, borderRadius: 12, overflow: 'hidden',
                                    position: 'relative'
                                }}>
                                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', zIndex: 1, pointerEvents: 'none' }} />
                                    <img src={attraction.image} alt={attraction.name} className="att-image" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)' }} onError={(e) => (e.currentTarget.style.display = 'none')} />
                                </div>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: gold, fontWeight: 800 }}>
                                    {String(idx + 1).padStart(2, '0')}
                                </div>
                                <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.1)' }} />
                            </div>
                            <h4 className="att-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'white', margin: '0 0 16px', transition: 'color 0.4s' }}>
                                {attraction.name}
                            </h4>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                                {attraction.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* THINGS TO DO */}
                {data.activities && data.activities.length > 0 && (
                    <div style={{ marginTop: isMobile ? 120 : 200 }}>
                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 80 }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: -40, left: -40, fontSize: '10rem', color: 'rgba(255,255,255,0.02)', fontFamily: 'var(--font-heading)', fontWeight: 900, pointerEvents: 'none', lineHeight: 1, zIndex: -1 }}>02</div>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: gold }} />
                                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.87rem', color: gold, letterSpacing: '.25em', textTransform: 'uppercase' }}>Curated Experiences</div>
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 900, color: 'white', margin: 0, letterSpacing: '-.02em', lineHeight: 1.05 }}>
                                    Things To Do
                                </h3>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 32 }}>
                            {data.activities.map((activity, idx) => (
                                <div key={idx} className="activity-card" style={{ marginTop: (!isMobile && idx % 2 !== 0) ? 60 : 0 }}>
                                    <div className="act-num">
                                        {String(idx + 1).padStart(2, '0')}
                                    </div>
                                    <div style={{ position: 'relative', zIndex: 2 }}>
                                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', fontWeight: 800, color: 'white', margin: '0 0 16px', letterSpacing: '-.01em', lineHeight: 1.2 }}>
                                            {activity.title}
                                        </h4>
                                        <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '1.1rem' : '1.25rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, margin: 0, fontWeight: 300 }}>
                                            {activity.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* CULTURAL INSIGHTS SECTION */}
            {data.cultural_insights && data.cultural_insights.length > 0 && (
                <div style={{ position: 'relative', zIndex: 10, background: '#050505', padding: isMobile ? '80px 24px 100px' : '140px 64px 180px', borderTop: `1px solid ${subtleBorder}` }}>
                    <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                        
                        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 80 }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: -50, left: -40, fontSize: '12rem', color: 'rgba(255,255,255,0.015)', fontFamily: 'var(--font-heading)', fontWeight: 900, pointerEvents: 'none', lineHeight: 1, zIndex: 0 }}>03</div>
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: gold }} />
                                        <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.87rem', color: gold, letterSpacing: '.25em', textTransform: 'uppercase' }}>Local Heritage</div>
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 900, color: 'white', margin: 0, letterSpacing: '-.02em', lineHeight: 1.05, wordWrap: 'break-word', maxWidth: '100%' }}>
                                        Cultural Insights
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div>
                            {data.cultural_insights.map((insight, idx) => (
                                <div key={idx} className="accom-card" style={{ flexDirection: (!isMobile && idx % 2 !== 0) ? 'row-reverse' : undefined }}>
                                    <div className="accom-img-col">
                                        <div className="accom-img-wrapper">
                                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)', zIndex: 1 }} />
                                            <img src={insight.image} alt={insight.title} onError={(e) => (e.currentTarget.style.display = 'none')} />
                                        </div>
                                    </div>
                                    <div className="accom-text-col">
                                        <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.77rem', color: gold, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>
                                            {insight.subtitle}
                                        </div>
                                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: 800, color: 'white', margin: '0 0 24px', letterSpacing: '-.02em', lineHeight: 1.1 }}>
                                            {insight.title}
                                        </h4>
                                        <p style={{ fontFamily: 'var(--font-body)', fontSize: isMobile ? '1.1rem' : '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, margin: '0 0 32px', fontWeight: 300 }}>
                                            {insight.description}
                                        </p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {insight.highlights.map((highlight, hIdx) => (
                                                <div key={hIdx} className="accom-feature-chip">
                                                    <span style={{ color: gold }}>✦</span> {highlight}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            )}


        </div>
    );
}
