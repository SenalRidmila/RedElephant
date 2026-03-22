'use client';

import { useEffect, useRef, useState } from 'react';

const destinations = [
    {
        id: 'hill-country',
        name: 'Hill Country',
        country: 'Central Sri Lanka',
        image: 'https://images.unsplash.com/photo-1583224964978-2257de73e4b1?w=800&q=80&auto=format&fit=crop',
        tags: ['Tea Trails', 'Waterfalls', 'Hiking'],
        duration: '3-5 Days',
        description: 'Undulating emerald hills blanketed in tea, misty mornings, and the charm of a cool highland escape.',
        featured: true,
        rating: 4.9,
        reviews: 248,
    },
    {
        id: 'cultural-triangle',
        name: 'Cultural Triangle',
        country: 'North Central',
        image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80&auto=format&fit=crop',
        tags: ['UNESCO', 'Temples', 'History'],
        duration: '4-6 Days',
        description: 'Ancient kingdoms, colossal dagobas and sacred cave temples that have withstood millennia.',
        featured: false,
        rating: 4.8,
        reviews: 312,
    },
    {
        id: 'sun-sand',
        name: 'Sun & Sand',
        country: 'Coastal Sri Lanka',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop',
        tags: ['Beaches', 'Surf', 'Luxury'],
        duration: '4-7 Days',
        description: 'Pristine golden shores, warm turquoise waters and world-class surfing destinations.',
        featured: false,
        rating: 4.9,
        reviews: 195,
    },
    {
        id: 'wildlife',
        name: 'Wildlife Safari',
        country: 'Yala & Minneriya',
        image: 'https://images.unsplash.com/photo-1608138278571-4b4a3dcf8a34?w=800&q=80&auto=format&fit=crop',
        tags: ['Elephants', 'Leopards', 'Birds'],
        duration: '2-3 Days',
        description: 'Encounter elusive leopards, herds of wild elephants and stunning bird-life in their natural habitat.',
        featured: false,
        rating: 4.7,
        reviews: 178,
    },
    {
        id: 'colombo',
        name: 'Colombo City',
        country: 'Western Province',
        image: 'https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?w=800&q=80&auto=format&fit=crop',
        tags: ['City', 'Food', 'Shopping'],
        duration: '1-2 Days',
        description: 'A vibrant cosmopolitan city where colonial history meets contemporary culture and cuisine.',
        featured: false,
        rating: 4.6,
        reviews: 134,
    },
    {
        id: 'galle',
        name: 'Galle Fort',
        country: 'Southern Province',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop',
        tags: ['Heritage', 'Colonial', 'Art'],
        duration: '1-2 Days',
        description: 'A 16th-century Dutch colonial fortress by the sea — boutique hotels, galleries and magical sunsets.',
        featured: false,
        rating: 4.8,
        reviews: 267,
    },
];

function DestinationCard({ dest, index }: { dest: typeof destinations[0]; index: number }) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), index * 100);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [index]);

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                gridRow: dest.featured ? 'span 2' : 'span 1',
                height: dest.featured ? '520px' : '245px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s, box-shadow 0.3s ease`,
                boxShadow: hovered ? '0 24px 60px rgba(196,30,58,0.25)' : '0 8px 30px rgba(0,0,0,0.3)',
            }}
        >
            {/* IMAGE */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${dest.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: hovered ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
                zIndex: 0,
            }} />

            {/* GRADIENT OVERLAY */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: hovered
                    ? 'linear-gradient(180deg, rgba(10,10,15,0.1) 0%, rgba(139,0,0,0.6) 60%, rgba(10,10,15,0.95) 100%)'
                    : 'linear-gradient(180deg, transparent 30%, rgba(10,10,15,0.95) 100%)',
                transition: 'background 0.5s ease',
                zIndex: 1,
            }} />

            {/* TOP BADGE */}
            <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                zIndex: 3,
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
            }}>
                {dest.featured && (
                    <span style={{
                        background: 'var(--gradient-primary)',
                        color: 'white',
                        fontFamily: 'var(--font-accent)',
                        fontSize: '1.14rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        boxShadow: 'var(--shadow-red)',
                    }}>
                        ✦ Featured
                    </span>
                )}
            </div>

            {/* RATING CHIP */}
            <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 3,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '20px',
                padding: '4px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'var(--font-accent)',
                fontSize: '0.96rem',
                color: 'var(--color-gold)',
                fontWeight: 600,
            }}>
                ★ {dest.rating}
            </div>

            {/* CONTENT */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                zIndex: 2,
                transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
            }}>
                {/* TAGS */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    {dest.tags.map((tag) => (
                        <span key={tag} style={{
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: 'rgba(255,255,255,0.85)',
                            fontFamily: 'var(--font-accent)',
                            fontSize: '1.14rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            padding: '3px 8px',
                            borderRadius: '10px',
                            textTransform: 'uppercase',
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                <p style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: '0.9rem',
                    color: 'var(--color-primary-light)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginBottom: '4px',
                }}>
                    {dest.country}
                </p>

                <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: dest.featured ? '1.8rem' : '1.25rem',
                    fontWeight: 700,
                    color: 'white',
                    margin: '0 0 6px 0',
                    lineHeight: 1.1,
                }}>
                    {dest.name}
                </h3>

                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.5,
                    margin: '0 0 14px 0',
                    opacity: hovered || dest.featured ? 1 : 0,
                    maxHeight: hovered || dest.featured ? '80px' : '0',
                    overflow: 'hidden',
                    transition: 'all 0.4s ease',
                }}>
                    {dest.description}
                </p>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.14rem',
                        color: 'rgba(255,255,255,0.5)',
                    }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {dest.duration}
                        <span style={{ margin: '0 4px', opacity: 0.4 }}>·</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 00-3-3.87" />
                            <path d="M16 3.13a4 4 0 010 7.75" />
                        </svg>
                        {dest.reviews} reviews
                    </div>

                    <button style={{
                        background: hovered ? 'var(--gradient-primary)' : 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '50px',
                        padding: '8px 16px',
                        color: 'white',
                        fontFamily: 'var(--font-accent)',
                        fontSize: '0.94rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.3s ease',
                        boxShadow: hovered ? 'var(--shadow-red)' : 'none',
                    }}>
                        Explore
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function DestinationsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [titleVisible, setTitleVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="destinations"
            ref={sectionRef}
            style={{
                background: 'var(--color-dark)',
                padding: 'clamp(60px, 8vw, 120px) 0',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* BG DECORATION */}
            <div style={{
                position: 'absolute',
                top: '-200px',
                right: '-200px',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(196,30,58,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
                {/* HEADER */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    marginBottom: '56px',
                    flexWrap: 'wrap',
                    gap: '24px',
                    opacity: titleVisible ? 1 : 0,
                    transform: titleVisible ? 'none' : 'translateY(30px)',
                    transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
                }}>
                    <div>
                        <div className="section-label" style={{ marginBottom: '16px' }}>
                            Discover Sri Lanka
                        </div>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                            fontWeight: 700,
                            color: 'white',
                            margin: 0,
                            lineHeight: 1.1,
                        }}>
                            Iconic Destinations<br />
                            <span style={{
                                background: 'var(--gradient-primary)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                                Await You
                            </span>
                        </h2>
                    </div>
                    <a href="#" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: 'var(--color-primary-light)',
                        fontFamily: 'var(--font-accent)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        padding: '8px 0',
                    }}>
                        View all destinations
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                </div>

                {/* GRID */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gridAutoRows: '240px',
                    gap: '16px',
                }}>
                    {destinations.map((dest, i) => (
                        <DestinationCard key={dest.id} dest={dest} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
