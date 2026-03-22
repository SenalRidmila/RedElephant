'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/* ─── Category data ─── */
const categories = [
    {
        id: 'culture',
        label: 'Culture Tour',
        tagline: 'Ancient Kingdoms & Sacred Temples',
        desc: 'Wander through 2,500-year-old ruins, sacred dagobas, and vibrant colonial forts that tell the story of a timeless civilisation.',
        gradient: 'linear-gradient(160deg, rgba(44,24,16,0.55) 0%, rgba(139,38,53,0.7) 60%, rgba(196,30,58,0.82) 100%)',
        lightAccent: '#C41E3A',
        darkAccent: '#8B1A2A',
        num: '01',
        tag: '12 Experiences',
        featured: true,
        image: '/assets/tour-category/cultural.webp',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <path d="M8 40V20L24 8L40 20V40H28V30H20V40H8Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M20 40V32H28V40" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                <circle cx="24" cy="20" r="3" stroke="currentColor" strokeWidth="2.5" />
            </svg>
        ),
    },
    {
        id: 'nature',
        label: 'Nature Tour',
        tagline: 'Misty Hills & Lush Tea Gardens',
        desc: 'Breathe the crisp mountain air as you trek through emerald tea estates and cloud-draped highland forests.',
        gradient: 'linear-gradient(160deg, rgba(26,58,42,0.5) 0%, rgba(45,106,79,0.72) 60%, rgba(82,183,136,0.82) 100%)',
        lightAccent: '#52B788',
        darkAccent: '#2D6A4F',
        num: '02',
        tag: '9 Experiences',
        featured: false,
        image: '/assets/tour-category/nature.webp',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <path d="M24 4L12 22H20L10 40H38L28 22H36L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 'beach',
        label: 'Beach Tour',
        tagline: 'Turquoise Waters & Golden Sands',
        desc: 'Discover pristine coastlines where the Indian Ocean meets powder-white beaches and world-class surf breaks.',
        gradient: 'linear-gradient(160deg, rgba(10,42,74,0.5) 0%, rgba(21,101,192,0.7) 60%, rgba(66,165,245,0.82) 100%)',
        lightAccent: '#42A5F5',
        darkAccent: '#1565C0',
        num: '03',
        tag: '15 Experiences',
        featured: false,
        image: '/assets/tour-category/beach.webp',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <path d="M4 36C4 36 10 28 20 32C30 36 36 28 44 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M4 42C4 42 10 34 20 38C30 42 36 34 44 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M16 28C16 28 14 16 24 12C24 12 28 22 16 28Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M16 28L28 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 'wildlife',
        label: 'Wildlife Tour',
        tagline: 'Giants, Leopards & Rare Birds',
        desc: 'Track Asian elephants, elusive leopards and hundreds of endemic bird species across spectacular national parks.',
        gradient: 'linear-gradient(160deg, rgba(42,26,8,0.5) 0%, rgba(123,74,10,0.72) 60%, rgba(212,132,42,0.82) 100%)',
        lightAccent: '#D4842A',
        darkAccent: '#7B4A0A',
        num: '04',
        tag: '8 Experiences',
        featured: false,
        image: '/assets/tour-category/wildlife.webp',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <ellipse cx="18" cy="28" rx="10" ry="8" stroke="currentColor" strokeWidth="2.5" />
                <path d="M10 28C6 26 4 20 8 18C10 14 14 16 16 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M26 26C30 22 36 24 36 30C36 34 32 36 28 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="15" cy="26" r="1.5" fill="currentColor" />
                <path d="M18 36L16 44M22 36L24 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M10 20L8 12M26 20L28 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 'adventure',
        label: 'Adventure Tour',
        tagline: 'Rapids, Peaks & Thrilling Trails',
        desc: "Push your limits with white-water rafting, rock climbing, zip-lining and trekking through Sri Lanka's wild heartland.",
        gradient: 'linear-gradient(160deg, rgba(26,26,46,0.5) 0%, rgba(107,33,168,0.72) 60%, rgba(168,85,247,0.82) 100%)',
        lightAccent: '#A855F7',
        darkAccent: '#6B21A8',
        num: '05',
        tag: '11 Experiences',
        featured: false,
        image: '/assets/tour-category/adventure1.webp',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <path d="M6 38L18 18L26 28L32 20L42 38H6Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                <circle cx="36" cy="12" r="4" stroke="currentColor" strokeWidth="2.5" />
            </svg>
        ),
    },
];

/* ─── 3-D tilt hook ─── */
function useTilt(ref: React.RefObject<HTMLDivElement | null>) {
    const handleMove = useCallback((e: MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(8px)`;
    }, [ref]);

    const handleLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
        el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0)';
        setTimeout(() => { if (el) el.style.transition = 'transform 0.08s linear'; }, 600);
    }, [ref]);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transition = 'transform 0.08s linear';
        el.addEventListener('mousemove', handleMove);
        el.addEventListener('mouseleave', handleLeave);
        return () => {
            el.removeEventListener('mousemove', handleMove);
            el.removeEventListener('mouseleave', handleLeave);
        };
    }, [ref, handleMove, handleLeave]);
}

/* ─── Individual card ─── */
function CategoryCard({
    cat,
    delay,
    featured,
}: {
    cat: typeof categories[0];
    delay: number;
    featured?: boolean;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    useTilt(cardRef);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={wrapRef}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
                transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
                height: '100%',
            }}
        >
            <div
                ref={cardRef}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    position: 'relative',
                    height: featured ? '480px' : '370px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    willChange: 'transform',
                    boxShadow: hovered
                        ? `0 28px 60px rgba(0,0,0,0.18), 0 0 0 1px ${cat.lightAccent}44`
                        : '0 8px 32px rgba(0,0,0,0.10)',
                    transition: 'box-shadow 0.4s ease',
                }}
            >
                {/* ── Real photo layer (zooms slightly on hover) ── */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${cat.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.7s cubic-bezier(0.23,1,0.32,1)',
                    transform: hovered ? 'scale(1.08)' : 'scale(1.0)',
                    willChange: 'transform',
                }} />

                {/* ── Colour-tinted gradient overlay for legibility ── */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: cat.gradient,
                    mixBlendMode: 'multiply',
                    opacity: 0.72,
                }} />

                {/* ── Dark vignette at bottom to anchor text ── */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
                    pointerEvents: 'none',
                }} />

                {/* ── Subtle film-grain texture ── */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E") center/256px`,
                    opacity: 0.35, mixBlendMode: 'screen', pointerEvents: 'none',
                }} />

                {/* Large decorative number */}
                <div style={{
                    position: 'absolute',
                    top: '-10px', right: '-8px',
                    fontSize: featured ? '11rem' : '9rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-heading)',
                    color: 'rgba(255,255,255,0.06)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    userSelect: 'none',
                    transition: 'transform 0.6s ease',
                    transform: hovered ? 'translateY(-8px) scale(1.05)' : 'none',
                }}>
                    {cat.num}
                </div>

                {/* Icon circle */}
                <div style={{
                    position: 'absolute',
                    top: '28px', left: '28px',
                    width: featured ? '56px' : '48px',
                    height: featured ? '56px' : '48px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.12)',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '12px',
                    color: 'white',
                    backdropFilter: 'blur(8px)',
                    transition: 'background 0.3s, transform 0.4s cubic-bezier(0.23,1,0.32,1)',
                    transform: hovered ? 'scale(1.18) rotate(-8deg)' : 'scale(1)',
                }}>
                    {cat.icon}
                </div>

                {/* Tag pill */}
                <div style={{
                    position: 'absolute',
                    top: '28px', right: '20px',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: '50px',
                    padding: '5px 14px',
                    fontFamily: 'var(--font-accent)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.9)',
                }}>
                    {cat.tag}
                </div>

                {/* Bottom content — slides up on hover */}
                <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    padding: '28px 28px 32px',
                    transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
                    transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                    zIndex: 2,
                }}>
                    {/* Label */}
                    <div style={{
                        fontFamily: 'var(--font-accent)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: cat.lightAccent,
                        marginBottom: '8px',
                        transition: 'opacity 0.3s',
                    }}>
                        {cat.label}
                    </div>

                    {/* Tagline */}
                    <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: featured ? '1.65rem' : '1.25rem',
                        fontWeight: 700,
                        color: 'white',
                        margin: '0 0 10px',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                    }}>
                        {cat.tagline}
                    </h3>

                    {/* Description — slides in, only visible on hover */}
                    <div style={{
                        overflow: 'hidden',
                        maxHeight: hovered ? '80px' : '0px',
                        opacity: hovered ? 1 : 0,
                        transition: 'max-height 0.5s cubic-bezier(0.23,1,0.32,1), opacity 0.4s ease 0.1s',
                    }}>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1.14rem',
                            color: 'rgba(255,255,255,0.75)',
                            lineHeight: 1.6,
                            margin: '0 0 16px',
                        }}>
                            {cat.desc}
                        </p>
                    </div>

                    {/* CTA arrow */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontFamily: 'var(--font-accent)',
                        fontSize: '0.96rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'white',
                        transition: 'gap 0.3s ease',
                    }}>
                        <span>Explore</span>
                        <svg
                            width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            style={{
                                transform: hovered ? 'translateX(4px)' : 'translateX(0)',
                                transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
                            }}
                        >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </div>
                </div>

                {/* Gloss sheen on hover */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)',
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    pointerEvents: 'none',
                }} />
            </div>
        </div>
    );
}

/* ─── Main Section ─── */
export default function TourCategories() {
    const headingRef = useRef<HTMLDivElement>(null);
    const [headVis, setHeadVis] = useState(false);

    useEffect(() => {
        const el = headingRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setHeadVis(true); obs.disconnect(); } },
            { threshold: 0.2 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const [culture, nature, beach, wildlife, adventure] = categories;

    return (
        <section
            id="tour-categories"
            style={{
                background: '#F8F5F0',
                padding: '100px 0 120px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Huge background "TOURS" watermark */}
            <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 'clamp(8rem, 20vw, 18rem)',
                fontWeight: 900,
                fontFamily: 'var(--font-heading)',
                color: 'rgba(196,30,58,0.03)',
                letterSpacing: '-0.04em',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                pointerEvents: 'none',
                lineHeight: 1,
            }}>
                EXPLORE
            </div>

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>

                {/* ── Section heading ── */}
                <div ref={headingRef} style={{ marginBottom: '64px' }}>
                    {/* Eyebrow */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '18px',
                        opacity: headVis ? 1 : 0,
                        transform: headVis ? 'translateY(0)' : 'translateY(16px)',
                        transition: 'opacity 0.6s ease, transform 0.6s ease',
                    }}>
                        <div style={{ width: '36px', height: '2px', background: '#C41E3A', borderRadius: '2px' }} />
                        <span style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.94rem',
                            fontWeight: 700,
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            color: '#C41E3A',
                        }}>
                            Tour Categories
                        </span>
                        <div style={{ width: '36px', height: '2px', background: '#C41E3A', borderRadius: '2px' }} />
                    </div>

                    {/* Main heading + description — side by side on desktop */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                        gap: '32px',
                        flexWrap: 'wrap',
                    }}>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                            fontWeight: 800,
                            color: '#1C1A18',
                            margin: 0,
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                            maxWidth: '560px',
                            opacity: headVis ? 1 : 0,
                            transform: headVis ? 'translateY(0)' : 'translateY(24px)',
                            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
                        }}>
                            Every Journey,{' '}
                            <span style={{
                                color: '#C41E3A',
                                fontStyle: 'italic',
                            }}>
                                Perfectly Crafted
                            </span>
                        </h2>

                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1rem',
                            color: '#7A7060',
                            lineHeight: 1.75,
                            maxWidth: '360px',
                            margin: 0,
                            opacity: headVis ? 1 : 0,
                            transform: headVis ? 'translateY(0)' : 'translateY(24px)',
                            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
                        }}>
                            From misty highlands to sun-drenched beaches — choose your adventure and let us craft the experience of a lifetime in Sri Lanka.
                        </p>
                    </div>
                </div>

                {/* ── Asymmetric card grid ── */}
                {/* Row 1: Featured (wide) + Nature (narrow) */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px',
                    marginBottom: '20px',
                }}>
                    {/* This wrapper gives the featured card more weight */}
                    <div style={{ gridColumn: 'span 1' }}>
                        {/* Featured culture card — with extra inner glow accent */}
                        <div style={{ position: 'relative', height: '100%' }}>
                            <CategoryCard cat={culture} delay={0} featured />
                            {/* Floating label accent */}
                            <div style={{
                                position: 'absolute',
                                bottom: '32px',
                                left: '-16px',
                                background: '#C41E3A',
                                color: 'white',
                                fontFamily: 'var(--font-accent)',
                                fontSize: '0.88rem',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                padding: '8px 16px',
                                borderRadius: '0 50px 50px 0',
                                boxShadow: '4px 4px 20px rgba(196,30,58,0.35)',
                                pointerEvents: 'none',
                            }}>
                                Most Popular
                            </div>
                        </div>
                    </div>
                    <CategoryCard cat={nature} delay={100} />
                </div>

                {/* Row 2: Beach + Wildlife + Adventure */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '20px',
                }}>
                    <CategoryCard cat={beach} delay={200} />
                    <CategoryCard cat={wildlife} delay={300} />
                    <CategoryCard cat={adventure} delay={400} />
                </div>

                {/* ── Bottom CTA strip ── */}
                <div style={{
                    marginTop: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '24px',
                    flexWrap: 'wrap',
                }}>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem',
                        color: '#7A7060',
                        margin: 0,
                    }}>
                        Can't decide? Let our experts build a custom itinerary for you.
                    </p>
                    <a
                        href="#contact"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: '#C41E3A',
                            color: 'white',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            padding: '14px 32px',
                            borderRadius: '50px',
                            boxShadow: '0 8px 28px rgba(196,30,58,0.3)',
                            transition: 'transform 0.25s, box-shadow 0.25s, background 0.25s',
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 14px 36px rgba(196,30,58,0.4)';
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLAnchorElement).style.transform = '';
                            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 28px rgba(196,30,58,0.3)';
                        }}
                    >
                        Plan a Custom Tour
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* ── Responsive styles injected ── */}
            <style>{`
                @media (min-width: 768px) {
                    #tour-categories .hero-grid {
                        grid-template-columns: 1.6fr 1fr !important;
                    }
                }
                @media (max-width: 640px) {
                    #tour-categories {
                        padding: 72px 0 80px !important;
                    }
                }
            `}</style>
        </section>
    );
}
