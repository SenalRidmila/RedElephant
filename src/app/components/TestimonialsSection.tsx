'use client';

import { useEffect, useRef, useState } from 'react';

const testimonials = [
    {
        name: 'Sarah & James Mitchell',
        country: 'United Kingdom 🇬🇧',
        avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=100&q=80&fit=crop&auto=format',
        tour: 'Luxury Honeymoon Package',
        rating: 5,
        text: 'Red Elephant exceeded every expectation. Our honeymoon in Sri Lanka was nothing short of magical — from the misty hills of Nuwara Eliya to the golden beaches of Trincomalee. Every detail was perfection.',
        date: 'January 2025',
    },
    {
        name: 'Philippe Dubois',
        country: 'France 🇫🇷',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&fit=crop&auto=format',
        tour: 'Cultural Heritage Tour',
        rating: 5,
        text: 'An extraordinary journey through 2,500 years of history. The team\'s knowledge and local connections gave us access to experiences no guidebook could offer. The luxury of feeling truly welcomed.',
        date: 'December 2024',
    },
    {
        name: 'Emma & Tom Wilson',
        country: 'Australia 🇦🇺',
        avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&q=80&fit=crop&auto=format',
        tour: 'Wildlife Safari Adventure',
        rating: 5,
        text: 'We spotted leopards in Yala, watched hundreds of elephants gather at Minneriya, and fell in love with Sri Lanka\'s natural wonders. Red Elephant\'s guides are simply the best in the business.',
        date: 'November 2024',
    },
    {
        name: 'Aiko Matsumoto',
        country: 'Japan 🇯🇵',
        avatar: 'https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?w=100&q=80&fit=crop&auto=format',
        tour: 'Hill Country Tea Trail',
        rating: 5,
        text: 'The tea country of Sri Lanka is incomparably beautiful, and Red Elephant showed us all its hidden gems. Our guide Chaminda was incredibly knowledgeable. I will return next year without question.',
        date: 'October 2024',
    },
];

export default function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const startAutoPlay = () => {
        intervalRef.current = setInterval(() => {
            goTo((activeIndex + 1) % testimonials.length);
        }, 6000);
    };

    useEffect(() => {
        startAutoPlay();
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    const goTo = (idx: number) => {
        if (isAnimating) return;
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsAnimating(true);
        setTimeout(() => {
            setActiveIndex(idx);
            setIsAnimating(false);
        }, 300);
    };

    const t = testimonials[activeIndex];

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            style={{
                background: 'var(--color-dark-2)',
                padding: 'clamp(60px, 8vw, 120px) 0',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* DECORATIVE QUOTE */}
            <div style={{
                position: 'absolute',
                top: '40px',
                left: '5%',
                fontSize: '20rem',
                fontFamily: 'Georgia, serif',
                color: 'rgba(196,30,58,0.04)',
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
            }}>
                "
            </div>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
                {/* HEADER */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '60px',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'none' : 'translateY(30px)',
                    transition: 'all 0.7s ease',
                }}>
                    <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>
                        Guest Stories
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 700,
                        color: 'white',
                        margin: 0,
                    }}>
                        Words From Our
                        <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> Travelers</span>
                    </h2>
                </div>

                {/* TESTIMONIAL MAIN CARD */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    gap: '40px',
                    alignItems: 'center',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'none' : 'translateY(30px)',
                    transition: 'all 0.7s ease 0.2s',
                }}>
                    {/* LEFT - TRAVELER CARDS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {testimonials.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                style={{
                                    background: i === activeIndex ? 'rgba(196,30,58,0.15)' : 'rgba(255,255,255,0.04)',
                                    border: `1px solid ${i === activeIndex ? 'rgba(196,30,58,0.5)' : 'rgba(255,255,255,0.07)'}`,
                                    borderRadius: '14px',
                                    padding: '14px 18px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    textAlign: 'left',
                                    transform: i === activeIndex ? 'scale(1.02)' : 'scale(1)',
                                }}
                            >
                                <img
                                    src={item.avatar}
                                    alt={item.name}
                                    style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: i === activeIndex ? '2px solid var(--color-primary)' : '2px solid transparent',
                                        flexShrink: 0,
                                    }}
                                />
                                <div>
                                    <div style={{
                                        fontFamily: 'var(--font-accent)',
                                        fontSize: '1rem',
                                        fontWeight: 700,
                                        color: i === activeIndex ? 'white' : 'rgba(255,255,255,0.6)',
                                        lineHeight: 1.2,
                                    }}>
                                        {item.name.split('&')[0].trim()}
                                    </div>
                                    <div style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.94rem',
                                        color: 'rgba(255,255,255,0.4)',
                                    }}>
                                        {item.country}
                                    </div>
                                </div>
                                {i === activeIndex && (
                                    <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary-light)' }} />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* RIGHT - QUOTE AREA */}
                    <div style={{
                        background: 'rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '24px',
                        padding: '48px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* Quote mark */}
                        <div style={{
                            position: 'absolute',
                            top: '24px',
                            right: '32px',
                            fontFamily: 'Georgia, serif',
                            fontSize: '6rem',
                            color: 'rgba(196,30,58,0.12)',
                            lineHeight: 1,
                            userSelect: 'none',
                        }}>
                            "
                        </div>

                        {/* Stars */}
                        <div style={{
                            display: 'flex',
                            gap: '4px',
                            marginBottom: '24px',
                            opacity: isAnimating ? 0 : 1,
                            transition: 'opacity 0.3s',
                        }}>
                            {Array.from({ length: t.rating }).map((_, i) => (
                                <span key={i} style={{ color: 'var(--color-gold)', fontSize: '1.3rem' }}>★</span>
                            ))}
                        </div>

                        {/* Quote text */}
                        <blockquote style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                            fontStyle: 'italic',
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: 1.7,
                            margin: '0 0 32px',
                            opacity: isAnimating ? 0 : 1,
                            transform: isAnimating ? 'translateY(10px)' : 'translateY(0)',
                            transition: 'all 0.4s ease',
                        }}>
                            "{t.text}"
                        </blockquote>

                        {/* Tour badge */}
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(196,30,58,0.15)',
                            border: '1px solid rgba(196,30,58,0.3)',
                            borderRadius: '20px',
                            padding: '6px 14px',
                            marginBottom: '24px',
                            opacity: isAnimating ? 0 : 1,
                            transition: 'opacity 0.3s',
                        }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            <span style={{
                                fontFamily: 'var(--font-accent)',
                                fontSize: '0.94rem',
                                fontWeight: 600,
                                color: 'var(--color-primary-light)',
                                letterSpacing: '0.05em',
                            }}>
                                {t.tour}
                            </span>
                        </div>

                        {/* Author */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                            borderTop: '1px solid rgba(255,255,255,0.08)',
                            paddingTop: '24px',
                            opacity: isAnimating ? 0 : 1,
                            transition: 'opacity 0.3s',
                        }}>
                            <img
                                src={t.avatar}
                                alt={t.name}
                                style={{
                                    width: '52px',
                                    height: '52px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '2px solid var(--color-primary)',
                                }}
                            />
                            <div>
                                <div style={{ fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: '1rem', color: 'white' }}>
                                    {t.name}
                                </div>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)' }}>
                                    {t.country} · {t.date}
                                </div>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '0 0 24px 24px',
                            overflow: 'hidden',
                        }}>
                            <div style={{
                                height: '100%',
                                background: 'var(--gradient-primary)',
                                animation: 'progress 6s linear infinite',
                            }} />
                        </div>
                    </div>
                </div>

                {/* NAV DOTS */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            style={{
                                width: i === activeIndex ? '24px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                border: 'none',
                                background: i === activeIndex ? 'var(--color-primary-light)' : 'rgba(255,255,255,0.2)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                padding: 0,
                            }}
                        />
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        @media (max-width: 768px) {
          section#testimonials [style*="grid-template-columns: 1fr 2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
}
