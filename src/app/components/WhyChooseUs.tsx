'use client';

import { useEffect, useRef, useState } from 'react';

const features = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M16 3C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3Z" stroke="currentColor" strokeWidth="1.6" />
                <path d="M16 9v7l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="16" cy="16" r="2" fill="currentColor" />
            </svg>
        ),
        number: '15+',
        label: 'Years of Expertise',
        title: 'Decades of Mastery',
        desc: 'Over 15 years crafting unforgettable journeys across Sri Lanka. Our deep local roots mean you experience the island through the eyes of a true insider.',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M16 28s-11-7.5-11-15A11 11 0 0 1 27 13c0 7.5-11 15-11 15Z" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="16" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
        ),
        number: '200+',
        label: 'Destinations',
        title: 'Island-Wide Reach',
        desc: 'From misty Ella peaks to golden Mirissa shores — we know every hidden temple, secret beach, and breathtaking viewpoint across Sri Lanka.',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M28 11.5A12 12 0 0 0 5.2 17.8L4 26l8.2-1.2A12 12 0 1 0 28 11.5Z" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 16h8M16 12v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
        number: '24/7',
        label: 'Support',
        title: 'Always By Your Side',
        desc: 'Our dedicated team is available around the clock. Whether a last-minute change or a midnight query — we\'re just one call away.',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="4" width="24" height="24" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M10 16h12M16 10l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        number: '100%',
        label: 'Tailored Trips',
        title: 'Bespoke by Design',
        desc: 'Every itinerary crafted uniquely for you — your pace, your passions, your budget. No cookie-cutter packages. Just pure personalised travel.',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M16 4l3.09 6.26L26 11.27l-5 4.87 1.18 6.86L16 19.77l-6.18 3.23L11 16.14 6 11.27l6.91-1.01L16 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
        ),
        number: '5★',
        label: 'Rated by Travellers',
        title: 'Excellence Recognised',
        desc: 'Consistently rated 5 stars by travellers from across the globe. Our commitment to quality and warmth speaks through every single review.',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path d="M8 20c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="16" cy="10" r="3" stroke="currentColor" strokeWidth="1.6" />
                <path d="M4 28h24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M4 24c2-2 4-1 6 0s4 2 6 0 4-2 6 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
        ),
        number: '5000+',
        label: 'Happy Travellers',
        title: 'Trust Built on Joy',
        desc: 'More than 5,000 happy travellers from 60+ countries — and counting. Their smiles are our greatest achievement and our strongest motivation.',
    },
];

function useInView(threshold = 0.12) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setInView(true); obs.disconnect(); }
        }, { threshold });
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, inView };
}

export default function WhyChooseUs() {
    const { ref, inView } = useInView();
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section
            ref={ref}
            id="why-choose-us"
            style={{
                position: 'relative',
                padding: 'clamp(72px,9vw,120px) 0',
                background: '#F8F5F0',
                overflow: 'hidden',
            }}
        >
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: `radial-gradient(circle at 20% 20%, rgba(196,30,58,0.04) 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, rgba(196,30,58,0.03) 0%, transparent 50%)`,
            }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: 'clamp(52px,7vw,80px)',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(28px)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                        <div style={{ height: '1px', width: '36px', background: 'linear-gradient(90deg, transparent, #C41E3A)' }} />
                        <span style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.3em',
                            textTransform: 'uppercase', color: '#C41E3A',
                        }}>
                            Why Choose Us
                        </span>
                        <div style={{ height: '1px', width: '36px', background: 'linear-gradient(90deg, #C41E3A, transparent)' }} />
                    </div>

                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                        fontWeight: 800,
                        color: '#1C1A18',
                        lineHeight: 1.15,
                        margin: '0 0 18px',
                        letterSpacing: '-0.02em',
                    }}>
                        Journeys Crafted With <span style={{ color: '#C41E3A' }}>Heart</span>
                    </h2>

                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(0.9rem, 1.4vw, 1.02rem)',
                        color: '#7A7060',
                        maxWidth: '520px',
                        lineHeight: 1.8,
                        margin: 0,
                    }}>
                        Red Elephant Travels isn&apos;t just a travel company — it&apos;s your gateway to the soul of Sri Lanka, guided by passion, precision, and genuine care.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px,100%), 1fr))',
                    gap: 'clamp(14px, 2vw, 22px)',
                }}>
                    {features.map((f, i) => {
                        const active = hovered === i;
                        return (
                            <div
                                key={i}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                style={{
                                    position: 'relative',
                                    background: '#FFFFFF',
                                    borderRadius: '18px',
                                    padding: '32px 28px 28px',
                                    border: `1.5px solid ${active ? '#C41E3A' : 'rgba(0,0,0,0.06)'}`,
                                    boxShadow: active
                                        ? '0 16px 48px rgba(196,30,58,0.1), 0 4px 16px rgba(0,0,0,0.06)'
                                        : '0 2px 16px rgba(0,0,0,0.05)',
                                    transition: 'border-color 0.3s ease, box-shadow 0.35s ease, transform 0.35s ease',
                                    transform: active
                                        ? 'translateY(-5px)'
                                        : inView ? 'translateY(0)' : 'translateY(36px)',
                                    opacity: inView ? 1 : 0,
                                    transitionDelay: inView ? `${i * 0.07}s` : '0s',
                                    cursor: 'default',
                                    overflow: 'hidden',
                                }}
                            >
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0,
                                    height: '3px',
                                    background: 'linear-gradient(90deg, #8B0000, #C41E3A)',
                                    transform: active ? 'scaleX(1)' : 'scaleX(0)',
                                    transformOrigin: 'left',
                                    transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
                                    borderRadius: '18px 18px 0 0',
                                }} />

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <div style={{
                                        width: '52px', height: '52px', borderRadius: '14px',
                                        background: active ? 'rgba(196,30,58,0.08)' : '#F5F2EE',
                                        border: `1px solid ${active ? 'rgba(196,30,58,0.2)' : 'rgba(0,0,0,0.05)'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: active ? '#C41E3A' : '#9E9080',
                                        transition: 'all 0.3s ease',
                                        flexShrink: 0,
                                    }}>
                                        {f.icon}
                                    </div>
                                    <div style={{
                                        fontFamily: 'var(--font-heading)',
                                        fontSize: '1.9rem',
                                        fontWeight: 800,
                                        color: active ? '#C41E3A' : '#E8E2DA',
                                        letterSpacing: '-0.03em',
                                        lineHeight: 1,
                                        transition: 'color 0.35s ease',
                                    }}>
                                        {f.number}
                                    </div>
                                </div>

                                <div style={{
                                    display: 'inline-block',
                                    fontFamily: 'var(--font-accent)',
                                    fontSize: '0.85rem', fontWeight: 700,
                                    letterSpacing: '0.16em', textTransform: 'uppercase',
                                    color: '#C41E3A',
                                    background: 'rgba(196,30,58,0.07)',
                                    padding: '3px 10px', borderRadius: '50px',
                                    marginBottom: '10px',
                                }}>
                                    {f.label}
                                </div>

                                <h3 style={{
                                    fontFamily: 'var(--font-heading)',
                                    fontSize: '1.28rem', fontWeight: 700,
                                    color: '#1C1A18',
                                    margin: '0 0 10px',
                                    letterSpacing: '-0.01em',
                                }}>
                                    {f.title}
                                </h3>

                                <p style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '0.98rem',
                                    color: active ? '#5A5040' : '#9A9080',
                                    lineHeight: 1.78,
                                    margin: 0,
                                    transition: 'color 0.3s ease',
                                }}>
                                    {f.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div style={{
                    marginTop: 'clamp(52px,7vw,84px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'clamp(12px,2vw,28px)',
                    flexWrap: 'wrap',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s',
                }}>
                    {[
                        { text: 'Award-Winning' },
                        { text: 'Secure Bookings' },
                        { text: 'Sustainable Travel' },
                        { text: 'Luxury Options' },
                    ].map(b => (
                        <div key={b.text} style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '10px 18px',
                            background: '#FFFFFF',
                            border: '1px solid rgba(0,0,0,0.07)',
                            borderRadius: '50px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        }}>
                            <span style={{
                                fontFamily: 'var(--font-accent)',
                                fontSize: '1rem', fontWeight: 600,
                                letterSpacing: '0.07em', textTransform: 'uppercase',
                                color: '#7A7060',
                                whiteSpace: 'nowrap',
                            }}>{b.text}</span>
                        </div>
                    ))}
                    <a href="#contact"
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            background: 'linear-gradient(135deg, #8B0000, #C41E3A)',
                            color: 'white', textDecoration: 'none',
                            fontFamily: 'var(--font-accent)', fontWeight: 700,
                            fontSize: '0.96rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                            padding: '13px 28px', borderRadius: '50px',
                            boxShadow: '0 6px 24px rgba(196,30,58,0.3)',
                            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Start Planning
                    </a>
                </div>
            </div>
        </section>
    );
}
