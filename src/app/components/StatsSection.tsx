'use client';

import { useEffect, useRef, useState } from 'react';

/* ─── small viewport hook ─── */
function useIsMobile(bp = 768) {
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${bp}px)`);
        setMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [bp]);
    return mobile;
}

/* ─── animated counter ─── */
function useCountUp(target: number, duration: number, isVisible: boolean) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);
    useEffect(() => {
        if (!isVisible || hasAnimated.current) return;
        hasAnimated.current = true;
        const steps = 60;
        const stepDuration = duration / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += 1;
            setCount(Math.round((target * current) / steps));
            if (current >= steps) clearInterval(timer);
        }, stepDuration);
        return () => clearInterval(timer);
    }, [isVisible, target, duration]);
    return count;
}

/* ─── Premium SVG stat icons ─── */
const AwardIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5" />
        <path d="M7 13l-2 7 7-3 7 3-2-7" />
        <circle cx="12" cy="8" r="2" fill="currentColor" fillOpacity="0.2" />
    </svg>
);
const GlobeIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c-3 3.5-3 14.5 0 18" />
        <path d="M12 3c3 3.5 3 14.5 0 18" />
        <path d="M5.6 7c1.8.9 3.8 1.4 6.4 1.4s4.6-.5 6.4-1.4" strokeOpacity="0.45" />
        <path d="M5.6 17c1.8-.9 3.8-1.4 6.4-1.4s4.6.5 6.4 1.4" strokeOpacity="0.45" />
    </svg>
);
const CompassIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.18" />
        <circle cx="12" cy="12" r="1.1" fill="currentColor" />
    </svg>
);
const StarIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.9 5.9L21 9l-4.5 4.4 1.06 6.3L12 17l-5.56 2.7 1.06-6.3L3 9l6.1-.9L12 2z" />
        <path d="M12 2l2.9 5.9L21 9l-4.5 4.4 1.06 6.3L12 17l-5.56 2.7 1.06-6.3L3 9l6.1-.9L12 2z" fill="currentColor" fillOpacity="0.1" />
    </svg>
);

const stats = [
    { value: 15, suffix: '+', label: 'Years of Excellence', Icon: AwardIcon, description: 'Since 2009, crafting unforgettable Sri Lanka experiences' },
    { value: 5000, suffix: '+', label: 'Happy Travelers', Icon: GlobeIcon, description: 'Guests from 60+ countries who chose to explore with us' },
    { value: 50, suffix: '+', label: 'Curated Tours', Icon: CompassIcon, description: 'Carefully designed packages for every travel style' },
    { value: 98, suffix: '%', label: 'Satisfaction Rate', Icon: StarIcon, description: 'Our guests consistently rate their experience 5 stars' },
];

function StatCard({ stat, index, isVisible, isMobile }: {
    stat: typeof stats[0]; index: number; isVisible: boolean; isMobile: boolean;
}) {
    const count = useCountUp(stat.value, 2000, isVisible);
    const [hovered, setHovered] = useState(false);
    /* on mobile always show description */
    const showDesc = isMobile || hovered;

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? 'rgba(196,30,58,0.1)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${hovered ? 'rgba(196,30,58,0.4)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '20px',
                padding: isMobile ? '24px 20px' : '36px 28px',
                textAlign: 'center',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                cursor: 'default',
                transform: isVisible ? `translateY(0) scale(${hovered ? 1.03 : 1})` : 'translateY(40px)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${0.4 + index * 0.1}s`,
                boxShadow: hovered ? 'var(--shadow-red)' : 'none',
            }}
        >
            <div style={{
                marginBottom: '14px',
                color: hovered ? 'rgba(196,30,58,0.9)' : 'rgba(255,255,255,0.55)',
                filter: hovered ? 'drop-shadow(0 0 10px rgba(196,30,58,0.5))' : 'none',
                transform: hovered ? 'scale(1.18)' : 'scale(1)',
                transition: 'transform 0.3s ease, color 0.3s ease, filter 0.3s ease',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <stat.Icon />
            </div>
            <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: isMobile ? '2.2rem' : 'clamp(2.5rem, 4vw, 3.5rem)',
                fontWeight: 800,
                lineHeight: 1,
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '8px',
            }}>
                {count.toLocaleString()}{stat.suffix}
            </div>
            <div style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '0.94rem',
                fontWeight: 700,
                color: 'white',
                letterSpacing: '0.05em',
                marginBottom: showDesc ? '8px' : '0',
                transition: 'margin 0.3s',
            }}>
                {stat.label}
            </div>
            {/* description always visible on mobile, hover-only on desktop */}
            <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
                margin: 0,
                maxHeight: showDesc ? '80px' : '0',
                overflow: 'hidden',
                opacity: showDesc ? 1 : 0,
                transition: 'all 0.3s ease',
            }}>
                {stat.description}
            </p>
        </div>
    );
}

export default function StatsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section style={{ position: 'relative', padding: 'clamp(60px, 8vw, 120px) 0', overflow: 'hidden' }}>

            {/* ── Background ── */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url(https://images.unsplash.com/photo-1615836245337-f5b9b2303b1c?w=1920&q=60&auto=format&fit=crop)',
                backgroundSize: 'cover', backgroundPosition: 'center',
                /* skip fixed attachment on mobile — causes painting bugs */
                backgroundAttachment: isMobile ? 'scroll' : 'fixed',
                zIndex: 0,
            }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,15,0.88)', zIndex: 1 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(139,0,0,0.35) 0%, transparent 50%, rgba(10,10,15,0.5) 100%)', zIndex: 2 }} />

            <div ref={sectionRef} style={{
                maxWidth: '1400px', margin: '0 auto',
                padding: isMobile ? '0 16px' : '0 32px',
                position: 'relative', zIndex: 3,
            }}>

                {/* ── HEADER ── */}
                <div style={{
                    textAlign: 'center', marginBottom: isMobile ? '40px' : '60px',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'none' : 'translateY(30px)',
                    transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
                }}>
                    <div className="section-label" style={{ justifyContent: 'center', marginBottom: '16px' }}>
                        Our Track Record
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                        fontWeight: 700,
                        color: 'white',
                        margin: '0 0 14px',
                        lineHeight: 1.1,
                    }}>
                        Numbers That Tell
                        <span style={{ display: 'block', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                            Our Story
                        </span>
                    </h2>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: isMobile ? '1rem' : '1rem',
                        color: 'rgba(255,255,255,0.55)',
                        maxWidth: '480px',
                        margin: '0 auto',
                        lineHeight: 1.7,
                        padding: '0 8px',
                    }}>
                        Over a decade of crafting award-winning experiences across Sri Lanka.
                        Your perfect journey begins with our expertise.
                    </p>
                </div>

                {/* ── STATS GRID ── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: isMobile ? '12px' : '20px',
                }}>
                    {stats.map((stat, i) => (
                        <StatCard key={stat.label} stat={stat} index={i} isVisible={isVisible} isMobile={isMobile} />
                    ))}
                </div>

                {/* ── ABOUT STRIP ── */}
                <div style={{
                    marginTop: isMobile ? '52px' : '80px',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? '36px' : '60px',
                    alignItems: 'center',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'none' : 'translateY(30px)',
                    transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.6s',
                }}>

                    {/* Left — copy */}
                    <div>
                        <div className="section-label" style={{ marginBottom: '20px' }}>Our Story</div>
                        <h3 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(1.4rem, 4vw, 2.4rem)',
                            fontWeight: 700,
                            color: 'white',
                            lineHeight: 1.2,
                            marginBottom: '20px',
                        }}>
                            Sri Lanka's Most Loved<br />Travel Companion
                        </h3>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1rem',
                            color: 'rgba(255,255,255,0.65)',
                            lineHeight: 1.8,
                            marginBottom: '16px',
                        }}>
                            Red Elephant Travels &amp; Tours was born from a deep love of Sri Lanka — its ancient culture,
                            wild landscapes, and warm-hearted people. Founded in 2009, we have grown into one of the
                            island&apos;s most trusted travel specialists.
                        </p>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1rem',
                            color: 'rgba(255,255,255,0.65)',
                            lineHeight: 1.8,
                            marginBottom: '32px',
                        }}>
                            Every journey we craft is bespoke — designed around you, your rhythm, your vision.
                            Whether you seek the serenity of the highlands, the drama of the coast, or the wonder
                            of wildlife, we bring it to life, flawlessly.
                        </p>
                        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                            <a href="#contact" className="btn-primary">Start Your Journey</a>
                            <a href="/about" className="btn-outline" >Learn About Us</a>
                        </div>
                    </div>

                    {/* Right — image panel */}
                    <div style={{ position: 'relative' }}>
                        {/* Main image */}
                        <div style={{
                            borderRadius: '24px',
                            overflow: 'hidden',
                            height: isMobile ? '260px' : '400px',
                            position: 'relative',
                        }}>
                            <img
                                src="https://images.unsplash.com/photo-1560978813-ae1c6c5c77ec?w=800&q=80&auto=format&fit=crop"
                                alt="Sri Lanka travel"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {/* Award badge — inside image on mobile */}
                            <div style={{
                                position: 'absolute',
                                bottom: '16px', left: '16px',
                                background: 'rgba(10,10,15,0.85)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '14px',
                                padding: isMobile ? '12px 14px' : '16px 20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                            }}>
                                <div style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>🏆</div>
                                <div>
                                    <div style={{
                                        fontFamily: 'var(--font-accent)',
                                        fontSize: '0.9rem',
                                        color: 'var(--color-gold)',
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        fontWeight: 700,
                                    }}>Award Winning</div>
                                    <div style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: isMobile ? '0.74rem' : '0.82rem',
                                        color: 'white',
                                        fontWeight: 600,
                                    }}>Best Sri Lanka Tour Operator</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating years badge — pinned inside image frame on mobile, floating on desktop */}
                        <div style={{
                            position: 'absolute',
                            top: isMobile ? '16px' : '-20px',
                            right: isMobile ? '16px' : '-20px',
                            background: 'var(--gradient-primary)',
                            borderRadius: '16px',
                            padding: isMobile ? '14px 16px' : '20px',
                            boxShadow: 'var(--shadow-red-lg)',
                            textAlign: 'center',
                            minWidth: isMobile ? '90px' : '120px',
                        }}>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.8rem' : '2.2rem', fontWeight: 800, color: 'white' }}>15+</div>
                            <div style={{ fontFamily: 'var(--font-accent)', fontSize: '1.14rem', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Years<br />Experience</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
