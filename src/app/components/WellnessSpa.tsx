'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ─── Palette ─── */
const sage = '#7B9E87';
const cream = '#F8F5EF';
const gold = '#C9A96E';
const dark = '#1E1E1C';
const muted = '#8A8478';

/* ─── Experience cards data ─── */
const experiences = [
    {
        id: 'ayurveda',
        title: 'Ayurveda Healing',
        subtitle: 'Traditional Ceylon Medicine',
        desc: 'Ancient herbal therapies aligned with your dosha — detox, restore and rebalance body and mind.',
        image: '/assets/spa-and-wellness/Ayurveda-Healing-Wellness.webp',
        duration: '90 min',
        accent: '#7B9E87',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
                <path d="M20 4C20 4 8 14 8 22C8 28.627 13.373 34 20 34C26.627 34 32 28.627 32 22C32 14 20 4 20 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M14 24C14 24 16 20 20 20C24 20 26 24 26 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 'couples',
        title: 'Couples Journey',
        subtitle: 'Shared Bliss for Two',
        desc: 'Synchronised rituals, rose petal baths and sunset massage in a private ocean-view villa.',
        image: '/assets/spa-and-wellness/Luxury-Couple-Spa-Experiences.webp',
        duration: '120 min',
        accent: '#C9A96E',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
                <circle cx="14" cy="12" r="5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="26" cy="12" r="5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M4 34C4 27.373 8.477 22 14 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M36 34C36 27.373 31.523 22 26 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M20 36C20 30 17 26 14 24M20 36C20 30 23 26 26 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 'yoga',
        title: 'Sunrise Yoga',
        subtitle: 'Mountaintop Mindfulness',
        desc: 'Greet the dawn over mist-draped hills. Expert-led asanas, pranayama and guided meditation.',
        image: '/assets/spa-and-wellness/Yoga.webp',
        duration: '75 min',
        accent: '#A89B7A',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
                <circle cx="20" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
                <path d="M20 12V20M20 20L12 28M20 20L28 28M14 32H26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 20H14M26 20H32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 'wellness',
        title: 'Total Wellness',
        subtitle: 'Holistic Renewal Retreat',
        desc: 'A curated 3-day immersion: nutrition coaching, chakra balancing, sound healing and nature therapy.',
        image: '/assets/spa-and-wellness/wellness.webp',
        duration: '3 days',
        accent: '#B8A0C8',
        icon: (
            <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
                <path d="M20 6C20 6 10 13 10 21C10 25.971 14.477 30 20 30C25.523 30 30 25.971 30 21C30 13 20 6 20 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M20 30V36M16 36H24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M15 19C15 19 17 22 20 22C23 22 25 19 25 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
];

/* ─── Floating spa droplets ─── */
interface Drop { id: number; x: number; size: number; delay: number; duration: number; opacity: number; }
function FloatingDroplets() {
    const [drops, setDrops] = useState<Drop[]>([]);
    useEffect(() => {
        setDrops(Array.from({ length: 14 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            size: 5 + Math.random() * 8,
            delay: Math.random() * 16,
            duration: 16 + Math.random() * 14,
            opacity: 0.15 + Math.random() * 0.3,
        })));
    }, []);
    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
            {drops.map(d => (
                <div key={d.id} style={{
                    position: 'absolute',
                    left: `${d.x}%`, top: 0,
                    width: d.size, height: d.size * 1.6,
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    background: `radial-gradient(ellipse at 35% 25%, ${sage}CC, ${sage}44)`,
                    opacity: d.opacity,
                    animation: `spaDropFall ${d.duration}s linear ${d.delay}s infinite`,
                }} />
            ))}
        </div>
    );
}

/* ─── Floating botanical SVG decoration ─── */
function BotanicalLeaf({ style }: { style: React.CSSProperties }) {
    return (
        <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
            <path d="M60 190 C60 190 10 130 10 80 C10 36 35 10 60 10 C85 10 110 36 110 80 C110 130 60 190 60 190Z"
                fill={sage} fillOpacity="0.08" stroke={sage} strokeOpacity="0.15" strokeWidth="1" />
            <path d="M60 190 L60 10" stroke={sage} strokeOpacity="0.1" strokeWidth="0.8" />
            <path d="M60 160 C60 160 35 130 20 110" stroke={sage} strokeOpacity="0.1" strokeWidth="0.6" />
            <path d="M60 140 C60 140 85 115 100 95" stroke={sage} strokeOpacity="0.1" strokeWidth="0.6" />
            <path d="M60 115 C60 115 30 95 15 70" stroke={sage} strokeOpacity="0.1" strokeWidth="0.6" />
            <path d="M60 95  C60 95  90 80 105 55" stroke={sage} strokeOpacity="0.1" strokeWidth="0.6" />
        </svg>
    );
}

/* ─── Floating orb ─── */
function PulseOrb({ size, top, left, delay, color }: { size: number; top: string; left: string; delay: number; color: string }) {
    return (
        <div style={{
            position: 'absolute', top, left,
            width: size, height: size,
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 35%, ${color}30, ${color}05)`,
            border: `1px solid ${color}18`,
            animation: `spaOrb 8s ease-in-out ${delay}s infinite`,
            pointerEvents: 'none',
        }} />
    );
}

/* ─── Stat counter ─── */
function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.3 });
        obs.observe(el); return () => obs.disconnect();
    }, []);
    return (
        <div ref={ref} style={{
            textAlign: 'center',
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: gold, letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</div>
            <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: muted, marginTop: '6px' }}>{label}</div>
        </div>
    );
}

/* ─── Experience card ─── */
function SpaCard({ exp, delay }: { exp: typeof experiences[0]; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
        obs.observe(el); return () => obs.disconnect();
    }, []);

    /* gentle 3-D tilt */
    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = cardRef.current; if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -7;
        el.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateZ(6px)`;
    };
    const handleLeave = () => {
        const el = cardRef.current; if (!el) return;
        el.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
        el.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateZ(0)';
        setTimeout(() => { if (el) el.style.transition = 'transform 0.08s linear'; }, 600);
    };

    return (
        <div ref={ref} style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(50px)',
            transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
        }}>
            <Link href={`/wellness#rituals-${exp.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div ref={cardRef}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => { setHovered(false); handleLeave(); }}
                    onMouseMove={handleMove}
                    style={{
                        background: 'white',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: hovered
                            ? '0 32px 64px rgba(0,0,0,0.12), 0 0 0 1.5px ' + exp.accent + '44'
                            : '0 4px 24px rgba(0,0,0,0.06)',
                        transition: 'box-shadow 0.4s ease',
                        cursor: 'pointer',
                        willChange: 'transform',
                    }}
                >
                    {/* Photo area */}
                    <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundImage: `url(${exp.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'transform 0.8s cubic-bezier(0.23,1,0.32,1)',
                            transform: hovered ? 'scale(1.07)' : 'scale(1)',
                        }} />
                        {/* Soft gradient overlay */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: `linear-gradient(to top, rgba(30,30,28,0.55) 0%, transparent 60%)`,
                        }} />
                        {/* Duration pill */}
                        <div style={{
                            position: 'absolute', top: '16px', right: '16px',
                            background: 'rgba(255,255,255,0.92)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '50px',
                            padding: '5px 14px',
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.88rem', fontWeight: 700,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: dark,
                        }}>{exp.duration}</div>
                        {/* Icon badge */}
                        <div style={{
                            position: 'absolute', bottom: '-20px', left: '24px',
                            width: '44px', height: '44px',
                            borderRadius: '14px',
                            background: 'white',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: exp.accent,
                            transition: 'transform 0.4s ease',
                            transform: hovered ? 'translateY(-4px) rotate(-6deg)' : 'none',
                        }}>
                            {exp.icon}
                        </div>
                    </div>

                    {/* Text area */}
                    <div style={{ padding: '36px 24px 28px' }}>
                        <div style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: '1.14rem', fontWeight: 700,
                            letterSpacing: '0.2em', textTransform: 'uppercase',
                            color: exp.accent, marginBottom: '6px',
                        }}>{exp.subtitle}</div>
                        <h3 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.3rem', fontWeight: 700,
                            color: dark, margin: '0 0 10px',
                            letterSpacing: '-0.01em',
                        }}>{exp.title}</h3>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1.14rem', color: muted,
                            lineHeight: 1.65, margin: '0 0 20px',
                        }}>{exp.desc}</p>
                        {/* Reserve link */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.94rem', fontWeight: 700,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            color: exp.accent,
                            transition: 'gap 0.3s ease',
                        }}>
                            <span>Explore Ritual</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                style={{ transform: hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}>
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

/* ─── Main component ─── */
export default function WellnessSpa() {
    const heroRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const [heroVis, setHeroVis] = useState(false);
    const [statsVis, setStatsVis] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

    /* scroll for parallax */
    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* hero reveal */
    useEffect(() => {
        const el = heroRef.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeroVis(true); obs.disconnect(); } }, { threshold: 0.1 });
        obs.observe(el); return () => obs.disconnect();
    }, []);

    /* stats bar reveal */
    useEffect(() => {
        const el = statsRef.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVis(true); obs.disconnect(); } }, { threshold: 0.2 });
        obs.observe(el); return () => obs.disconnect();
    }, []);

    /* mouse parallax on hero */
    const handleHeroMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = heroRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMousePos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        });
    }, []);

    /* scroll parallax offset */
    const sectionTop = heroRef.current?.getBoundingClientRect().top ?? 0;
    const parallaxY = typeof window !== 'undefined' ? (scrollY - (scrollY + sectionTop)) * 0.18 : 0;

    return (
        <section id="wellness-spa" style={{ background: cream, position: 'relative', overflow: 'hidden' }}>

            {/* ── Keyframe styles ── */}
            <style>{`
                @keyframes spaOrb {
                    0%, 100% { transform: scale(1)    translateY(0);    opacity: 0.6; }
                    50%       { transform: scale(1.12)  translateY(-18px); opacity: 1;   }
                }
                @keyframes breathe {
                    0%, 100% { transform: scale(1);    opacity: 0.5; }
                    50%       { transform: scale(1.18); opacity: 1;   }
                }
                @keyframes floatLeaf {
                    0%, 100% { transform: translateY(0) rotate(0deg);   }
                    50%       { transform: translateY(-14px) rotate(3deg); }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                @keyframes spaRipple {
                    0%   { transform: scale(0.85); opacity: 0.7; }
                    100% { transform: scale(1.8);  opacity: 0;   }
                }
                @keyframes spaDropFall {
                    0%   { transform: translateY(-40px) rotate(0deg); opacity: 0; }
                    8%   { opacity: 1; }
                    88%  { opacity: 0.7; }
                    100% { transform: translateY(110vh) rotate(180deg); opacity: 0; }
                }
                @keyframes spaBadgeFloat {
                    0%, 100% { transform: translateY(0) rotate(-1deg); }
                    50%       { transform: translateY(-10px) rotate(1deg); }
                }
                @keyframes spaQuotePulse {
                    0%, 100% { opacity: 0.55; }
                    50%       { opacity: 0.85; }
                }
                @keyframes spaLineGrow {
                    from { transform: scaleX(0); }
                    to   { transform: scaleX(1); }
                }
            `}</style>

            {/* ══════════ PART 1 — FULL-BLEED HERO STRIP ══════════ */}
            <div
                ref={heroRef}
                onMouseMove={handleHeroMouse}
                style={{
                    position: 'relative',
                    height: 'clamp(520px, 75vh, 820px)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {/* Parallax photo — scroll + mouse */}
                <div style={{
                    position: 'absolute', inset: '-12%',
                    backgroundImage: 'url(/assets/spa-and-wellness/wellness.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `translateY(${parallaxY}px) translate(${(mousePos.x - 0.5) * -16}px, ${(mousePos.y - 0.5) * -10}px)`,
                    transition: 'transform 0.9s cubic-bezier(0.23,1,0.32,1)',
                    willChange: 'transform',
                }} />

                {/* Dark veil */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(14,20,18,0.82) 0%, rgba(14,20,18,0.55) 55%, transparent 100%)' }} />

                {/* Spa droplets */}
                <FloatingDroplets />

                {/* Decorative orbs */}
                <PulseOrb size={340} top="10%" left="-6%" delay={0} color={sage} />
                <PulseOrb size={220} top="55%" left="55%" delay={2.5} color={gold} />
                <PulseOrb size={160} top="-5%" left="70%" delay={1.2} color={sage} />

                {/* Ripple rings around the gold orb */}
                <div style={{ position: 'absolute', top: '55%', left: '55%', width: 220, height: 220, borderRadius: '50%', border: `1px solid ${gold}40`, animation: 'spaRipple 4s ease-out infinite', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '55%', left: '55%', width: 220, height: 220, borderRadius: '50%', border: `1px solid ${gold}28`, animation: 'spaRipple 4s ease-out 1.4s infinite', pointerEvents: 'none' }} />

                {/* Botanical leaves */}
                <BotanicalLeaf style={{ width: 180, top: '-20px', right: '8%', opacity: 0.7, animation: 'floatLeaf 9s ease-in-out infinite' }} />
                <BotanicalLeaf style={{ width: 120, bottom: '6%', right: '28%', opacity: 0.5, animation: 'floatLeaf 11s ease-in-out 2s infinite', transform: 'scaleX(-1)' }} />

                {/* Hero copy */}
                <div style={{ position: 'relative', zIndex: 2, maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 40px' }}>

                    {/* Breathing circle accent */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                        <div style={{
                            width: '10px', height: '10px', borderRadius: '50%',
                            background: gold,
                            animation: 'breathe 3.5s ease-in-out infinite',
                            boxShadow: `0 0 0 6px ${gold}22`,
                        }} />
                        <span style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.94rem', fontWeight: 700,
                            letterSpacing: '0.28em', textTransform: 'uppercase',
                            color: gold,
                        }}>
                            Wellness &amp; Spa Sanctuary
                        </span>
                        <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${gold}55, transparent)` }} />
                    </div>

                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
                        fontWeight: 800,
                        color: 'white',
                        margin: '0 0 24px',
                        lineHeight: 1.05,
                        letterSpacing: '-0.03em',
                        maxWidth: '640px',
                        opacity: heroVis ? 1 : 0,
                        transform: heroVis ? 'translateY(0)' : 'translateY(32px)',
                        transition: 'opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.23,1,0.32,1) 0.2s',
                    }}>
                        Restore.<br />
                        <span style={{
                            background: `linear-gradient(90deg, ${gold}, #E8C990, ${gold})`,
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'shimmer 4s linear infinite',
                        }}>
                            Renew.
                        </span>{' '}
                        Reconnect.
                    </h2>

                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                        color: 'rgba(255,255,255,0.72)',
                        lineHeight: 1.75,
                        maxWidth: '480px',
                        margin: '0 0 40px',
                        opacity: heroVis ? 1 : 0,
                        transform: heroVis ? 'translateY(0)' : 'translateY(24px)',
                        transition: 'opacity 0.9s ease 0.35s, transform 0.9s cubic-bezier(0.23,1,0.32,1) 0.35s',
                    }}>
                        Step beyond ordinary relaxation into a sanctuary where ancient Ayurvedic traditions meet contemporary luxury — all set amidst Sri Lanka's breathtaking natural beauty.
                    </p>

                    {/* CTAs */}
                    <div style={{
                        display: 'flex', gap: '16px', flexWrap: 'wrap',
                        opacity: heroVis ? 1 : 0,
                        transform: heroVis ? 'translateY(0)' : 'translateY(24px)',
                        transition: 'opacity 0.9s ease 0.5s, transform 0.9s cubic-bezier(0.23,1,0.32,1) 0.5s',
                    }}>
                        <Link href="/wellness#enquiry" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            background: gold,
                            color: dark,
                            textDecoration: 'none',
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.86rem', fontWeight: 800,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            padding: '15px 32px', borderRadius: '50px',
                            boxShadow: `0 8px 32px ${gold}55`,
                            transition: 'transform 0.25s, box-shadow 0.25s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; }}
                        >
                            Book a Retreat
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                        <Link href="/wellness" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(12px)',
                            border: '1.5px solid rgba(255,255,255,0.3)',
                            color: 'white',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.86rem', fontWeight: 700,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            padding: '15px 32px', borderRadius: '50px',
                            transition: 'background 0.25s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.18)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.1)'; }}
                        >
                            View All Treatments
                        </Link>
                    </div>
                </div>

                {/* Scroll-down cue */}
                <div style={{
                    position: 'absolute', bottom: '32px', left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                    opacity: 0.5,
                    animation: 'spaOrb 2.8s ease-in-out infinite',
                }}>
                    <div style={{ width: '1px', height: '48px', background: `linear-gradient(to bottom, transparent, ${gold})` }} />
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: gold }} />
                </div>
            </div>

            {/* ══════════ PART 2 — STATS BAR ══════════ */}
            <div ref={statsRef} style={{
                background: dark,
                padding: '48px 40px',
                opacity: statsVis ? 1 : 0,
                transform: statsVis ? 'translateY(0)' : 'translateY(28px)',
                transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.23,1,0.32,1)',
            }}>
                <div style={{
                    maxWidth: '1280px', margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '40px',
                    alignItems: 'center',
                }}>
                    <StatItem value="20+" label="Signature Therapies" delay={0} />
                    <StatItem value="4" label="Expert Therapists" delay={100} />
                    <StatItem value="98%" label="Guest Satisfaction" delay={200} />
                    <StatItem value="∞" label="Moments of Calm" delay={300} />

                    {/* Divider line */}
                    <div style={{ display: 'none' }} />

                    {/* Quote */}
                    <div style={{
                        gridColumn: 'span 1',
                        borderLeft: `2px solid ${gold}44`,
                        paddingLeft: '24px',
                    }}>
                        <p style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1rem',
                            fontStyle: 'italic',
                            color: 'rgba(255,255,255,0.55)',
                            lineHeight: 1.7,
                            margin: 0,
                        }}>
                            &quot;The greatest wealth is to live content with little.&quot;
                        </p>
                        <p style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: '1.14rem',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: gold,
                            marginTop: '8px',
                        }}>— Plato</p>
                    </div>
                </div>
            </div>

            {/* ══════════ PART 3 — EXPERIENCE CARDS ══════════ */}
            <div style={{ padding: '100px 0 80px', position: 'relative' }}>
                {/* Botanicals */}
                <BotanicalLeaf style={{ width: 220, top: '-40px', left: '-30px', opacity: 0.5, animation: 'floatLeaf 12s ease-in-out infinite' }} />
                <BotanicalLeaf style={{ width: 160, bottom: '0', right: '-20px', opacity: 0.4, animation: 'floatLeaf 10s ease-in-out 3s infinite', transform: 'scaleX(-1) scaleY(-1)' }} />

                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

                    {/* Section heading */}
                    <div style={{ textAlign: 'center', marginBottom: '72px' }}>
                        {/* Ornamental line with circle */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ width: '60px', height: '1px', background: `linear-gradient(to right, transparent, ${sage})` }} />
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: sage, opacity: 0.6 }} />
                            <div style={{ width: '60px', height: '1px', background: `linear-gradient(to left, transparent, ${sage})` }} />
                        </div>
                        <div style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.94rem', fontWeight: 700,
                            letterSpacing: '0.24em', textTransform: 'uppercase',
                            color: sage, marginBottom: '16px',
                        }}>
                            Our Signature Experiences
                        </div>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                            fontWeight: 800, color: dark,
                            margin: '0 auto 16px',
                            letterSpacing: '-0.02em', lineHeight: 1.15,
                            maxWidth: '520px',
                        }}>
                            Rituals Crafted for{' '}
                            <span style={{ color: sage, fontStyle: 'italic' }}>Deep Restoration</span>
                        </h2>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1rem', color: muted,
                            lineHeight: 1.7, maxWidth: '460px',
                            margin: '0 auto',
                        }}>
                            Each treatment is a journey in itself — designed by our master therapists to harmonise your body, mind and spirit.
                        </p>
                    </div>

                    {/* Cards grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '28px',
                    }}>
                        {experiences.map((exp, i) => (
                            <SpaCard key={exp.id} exp={exp} delay={i * 120} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ══════════ PART 4 — FULL-WIDTH IMMERSIVE STRIP ══════════ */}
            <div style={{
                position: 'relative',
                height: 'clamp(300px, 42vh, 480px)',
                overflow: 'hidden',
                margin: '0 0 0',
            }}>
                {/* Background image */}
                <div style={{
                    position: 'absolute', inset: '-8%',
                    backgroundImage: 'url(/assets/spa-and-wellness/Yoga.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 30%',
                }} />
                {/* Overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to right, rgba(14,20,18,0.88) 0%, rgba(14,20,18,0.55) 50%, rgba(14,20,18,0.7) 100%)`,
                }} />
                {/* Content */}
                <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', textAlign: 'center',
                    padding: '40px 24px',
                }}>
                    <div style={{
                        fontFamily: 'var(--font-accent)',
                        fontSize: '0.9rem', fontWeight: 700,
                        letterSpacing: '0.28em', textTransform: 'uppercase',
                        color: gold, marginBottom: '20px',
                        animation: 'spaQuotePulse 3.5s ease-in-out infinite',
                    }}>
                        ✦ &nbsp; Begin Your Journey &nbsp; ✦
                    </div>
                    <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                        fontWeight: 800, color: 'white',
                        margin: '0 0 20px', letterSpacing: '-0.02em', lineHeight: 1.1,
                        maxWidth: '600px',
                    }}>
                        &quot;Silence is not empty.<br />
                        <span style={{ color: gold, fontStyle: 'italic' }}>It is full of answers.</span>&quot;
                    </h3>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem', color: 'rgba(255,255,255,0.6)',
                        maxWidth: '400px', lineHeight: 1.7, margin: '0 0 32px',
                    }}>
                        Book your personalised wellness retreat and let our therapists guide you toward profound inner peace.
                    </p>
                    <a href="#contact" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                        background: 'transparent',
                        border: `1.5px solid ${gold}`,
                        color: gold,
                        textDecoration: 'none',
                        fontFamily: 'var(--font-accent)',
                        fontSize: '0.96rem', fontWeight: 700,
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        padding: '14px 32px', borderRadius: '50px',
                        transition: 'background 0.3s, color 0.3s',
                    }}
                        onMouseEnter={e => {
                            const a = e.currentTarget as HTMLAnchorElement;
                            a.style.background = gold; a.style.color = dark;
                        }}
                        onMouseLeave={e => {
                            const a = e.currentTarget as HTMLAnchorElement;
                            a.style.background = 'transparent'; a.style.color = gold;
                        }}
                    >
                        Start My Retreat
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* ══════════ PART 5 — AYURVEDA FEATURE ROW ══════════ */}
            <div style={{ padding: '100px 0', background: cream }}>
                <div style={{
                    maxWidth: '1280px', margin: '0 auto', padding: '0 40px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '60px',
                    alignItems: 'center',
                }}>
                    {/* Left — stacked photos */}
                    <div style={{ position: 'relative', minHeight: '520px' }}>
                        {/* Main photo */}
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: '15%', bottom: '15%',
                            borderRadius: '28px', overflow: 'hidden',
                            boxShadow: '0 24px 64px rgba(0,0,0,0.14)',
                        }}>
                            <Image
                                src="/assets/spa-and-wellness/Ayurveda-Healing-Wellness.webp"
                                alt="Ayurveda Healing"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        {/* Accent photo */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0, right: 0,
                            width: '55%', height: '45%',
                            borderRadius: '20px', overflow: 'hidden',
                            boxShadow: '0 16px 48px rgba(0,0,0,0.18)',
                            border: `4px solid ${cream}`,
                        }}>
                            <Image
                                src="/assets/spa-and-wellness/Luxury-Couple-Spa-Experiences.webp"
                                alt="Couples Spa"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        {/* Floating badge — animated */}
                        <div style={{
                            position: 'absolute',
                            top: '24px', right: '12%',
                            background: 'white',
                            borderRadius: '16px',
                            padding: '14px 20px',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                            display: 'flex', alignItems: 'center', gap: '12px',
                            animation: 'spaBadgeFloat 6s ease-in-out infinite',
                        }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${sage}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                                    <path d="M12 2L9.5 9H2L7.5 13.5L5.5 21L12 16.5L18.5 21L16.5 13.5L22 9H14.5L12 2Z" stroke={sage} strokeWidth="1.8" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: dark }}>Top Rated</div>
                                <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: muted }}>Sri Lanka Wellness</div>
                            </div>
                        </div>
                    </div>

                    {/* Right — copy */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <div style={{ width: '32px', height: '2px', background: sage }} />
                            <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: sage }}>
                                Ancient Wisdom
                            </span>
                        </div>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                            fontWeight: 800, color: dark,
                            margin: '0 0 20px', letterSpacing: '-0.02em', lineHeight: 1.15,
                        }}>
                            5,000 Years of{' '}
                            <span style={{ color: sage, fontStyle: 'italic' }}>Healing Knowledge</span>
                        </h2>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1rem', color: muted,
                            lineHeight: 1.8, margin: '0 0 32px',
                        }}>
                            Sri Lanka&apos;s Ayurvedic tradition — the world&apos;s oldest holistic healing system — forms the heart of every treatment we offer. Using organic herbs, therapeutic oils and time-honoured techniques, our therapists address the root, not just the symptom.
                        </p>
                        {/* Feature list */}
                        {['Personalised dosha assessment', 'Organic cold-pressed herbal oils', 'Certified Ayurvedic practitioners', 'Post-treatment dietary guidance'].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                                <div style={{
                                    width: '22px', height: '22px', borderRadius: '50%',
                                    background: `${sage}15`,
                                    border: `1.5px solid ${sage}40`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                }}>
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={sage} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: dark }}>{item}</span>
                            </div>
                        ))}
                        <a href="#contact" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            background: sage,
                            color: 'white',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.96rem', fontWeight: 700,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            padding: '14px 28px', borderRadius: '50px',
                            marginTop: '12px',
                            boxShadow: `0 8px 28px ${sage}44`,
                            transition: 'transform 0.25s, box-shadow 0.25s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; }}
                        >
                            Explore Ayurveda
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
