'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ─── Design tokens ─── */
const champagne = '#F0E6D3';
const gold = '#C9A96E';
const darkGold = '#A07840';
const rose = '#C4687A';
const ivory = '#FAF7F2';
const dark = '#1A1714';
const muted = '#8C8074';

/* ─── Petal particle ─── */
interface Petal { id: number; x: number; size: number; delay: number; duration: number; rotation: number; opacity: number; }

function FloatingPetals() {
    const [petals, setPetals] = useState<Petal[]>([]);
    useEffect(() => {
        setPetals(
            Array.from({ length: 18 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                size: 6 + Math.random() * 10,
                delay: Math.random() * 12,
                duration: 14 + Math.random() * 12,
                rotation: Math.random() * 360,
                opacity: 0.25 + Math.random() * 0.45,
            }))
        );
    }, []);

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
            <style>{`
                @keyframes petalFall {
                    0%   { transform: translateY(-60px) rotate(0deg) translateX(0); opacity: 0; }
                    10%  { opacity: 1; }
                    85%  { opacity: 0.8; }
                    100% { transform: translateY(110vh) rotate(720deg) translateX(40px); opacity: 0; }
                }
            `}</style>
            {petals.map(p => (
                <div key={p.id} style={{
                    position: 'absolute',
                    left: `${p.x}%`,
                    top: 0,
                    width: p.size,
                    height: p.size * 1.4,
                    borderRadius: '50% 0 50% 0',
                    background: `radial-gradient(ellipse at 30% 30%, #F9D7E0, #E8A4B8)`,
                    opacity: p.opacity,
                    transform: `rotate(${p.rotation}deg)`,
                    animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
                }} />
            ))}
        </div>
    );
}

/* ─── Section reveal hook ─── */
function useReveal(threshold = 0.12) {
    const ref = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
        obs.observe(el); return () => obs.disconnect();
    }, [threshold]);
    return { ref, vis };
}

/* ─── Gallery film-strip card ─── */
const gallery = [
    { src: '/assets/wedding-and-events/beach-weddign.webp', label: 'Beach Ceremony', sub: 'Tropical Shore' },
    { src: '/assets/wedding-and-events/weddinggg.webp', label: 'Garden Reception', sub: 'Colonial Estate' },
    { src: '/assets/wedding-and-events/misty-hills.webp', label: 'Highland Romance', sub: 'Cloud Nine' },
    { src: '/assets/wedding-and-events/events.webp', label: 'Private Events', sub: 'Exclusive Venues' },
    { src: '/assets/wedding-and-events/wedding.webp', label: 'Intimate Vows', sub: 'Sunset Setting' },
];

function GalleryCard({ item, index }: { item: typeof gallery[0]; index: number }) {
    const [hovered, setHovered] = useState(false);
    const { ref, vis } = useReveal(0.05);

    return (
        <div ref={ref} style={{
            flexShrink: 0,
            width: hovered ? 320 : 220,
            height: 420,
            borderRadius: '20px',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            transition: 'width 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease, opacity 0.7s ease, transform 0.7s cubic-bezier(0.23,1,0.32,1)',
            boxShadow: hovered ? '0 32px 72px rgba(0,0,0,0.25)' : '0 8px 32px rgba(0,0,0,0.12)',
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(60px)',
            transitionDelay: vis ? `${index * 80}ms` : '0ms',
        }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link href={`/weddings#gallery-${index}`} style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none', position: 'relative' }}>
                {/* Photo */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${item.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.7s cubic-bezier(0.23,1,0.32,1)',
                    transform: hovered ? 'scale(1.08)' : 'scale(1.02)',
                }} />
                {/* Gradient */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(20,14,10,0.85) 0%, rgba(20,14,10,0.2) 50%, transparent 100%)',
                }} />
                {/* Index number */}
                <div style={{
                    position: 'absolute', top: '18px', left: '18px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.94rem', fontWeight: 800,
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.1em',
                }}>0{index + 1}</div>
                {/* Bottom label */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '24px 20px',
                    transform: hovered ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
                }}>
                    <div style={{
                        fontFamily: 'var(--font-accent)',
                        fontSize: '0.85rem', fontWeight: 700,
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: gold, marginBottom: '4px',
                    }}>{item.sub}</div>
                    <div style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.15rem', fontWeight: 700,
                        color: 'white', lineHeight: 1.2,
                    }}>{item.label}</div>
                    {/* Chevron on hover */}
                    <div style={{
                        marginTop: '12px',
                        overflow: 'hidden',
                        maxHeight: hovered ? '28px' : '0px',
                        opacity: hovered ? 1 : 0,
                        transition: 'max-height 0.4s ease, opacity 0.3s ease 0.1s',
                    }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            fontFamily: 'var(--font-accent)',
                            fontSize: '1.14rem', fontWeight: 700,
                            letterSpacing: '0.14em', textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.7)',
                        }}>
                            <span>Explore</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

/* ─── Feature card ─── */
const features = [
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" width="26" height="26">
                <path d="M24 4L8 16V40H40V16L24 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M18 40V28H30V40" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M16 16C16 16 20 20 24 20C28 20 32 16 32 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        title: 'Iconic Venues',
        desc: 'Choose from cliff-top terraces, colonial plantation estates, private beach coves and mist-shrouded highland retreats.',
        accent: gold,
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" width="26" height="26">
                <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
                <path d="M24 12V24L32 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="24" cy="24" r="3" fill="currentColor" />
            </svg>
        ),
        title: 'Flawless Planning',
        desc: 'Our dedicated wedding concierge manages every detail — from florals and catering to logistics and on-the-day coordination.',
        accent: rose,
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" width="26" height="26">
                <path d="M24 6C24 6 10 18 10 28C10 35.18 16.27 41 24 41C31.73 41 38 35.18 38 28C38 18 24 6 24 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M17 30C17 30 19 26 24 26C29 26 31 30 31 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        title: 'Cultural Ceremonies',
        desc: 'Incorporate stunning Sri Lankan traditions — Poruwa ceremonies, kandyan drummers, oil-lamp processions and more.',
        accent: '#7B9E87',
    },
    {
        icon: (
            <svg viewBox="0 0 48 48" fill="none" width="26" height="26">
                <path d="M7 40L14 20L24 30L34 10L41 40H7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                <circle cx="38" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
            </svg>
        ),
        title: 'Private Events',
        desc: 'From intimate anniversaries to grand corporate galas — we craft experiences that leave every guest speechless.',
        accent: '#9B7EBD',
    },
];

function FeatureCard({ feat, delay }: { feat: typeof features[0]; delay: number }) {
    const { ref, vis } = useReveal(0.1);
    const [hovered, setHovered] = useState(false);
    return (
        <div ref={ref} style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'translateY(0)' : 'translateY(40px)',
            transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
        }}>
            <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '36px 28px',
                height: '100%',
                cursor: 'pointer',
                boxShadow: hovered
                    ? `0 24px 60px rgba(0,0,0,0.10), 0 0 0 1.5px ${feat.accent}44`
                    : '0 4px 20px rgba(0,0,0,0.06)',
                borderTop: `3px solid ${feat.accent}`,
                transition: 'box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)',
                transform: hovered ? 'translateY(-6px)' : 'none',
            }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Icon */}
                <div style={{
                    width: '56px', height: '56px',
                    borderRadius: '16px',
                    background: `${feat.accent}12`,
                    border: `1.5px solid ${feat.accent}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: feat.accent,
                    marginBottom: '20px',
                    transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
                    transform: hovered ? 'scale(1.12) rotate(-6deg)' : 'none',
                }}>
                    {feat.icon}
                </div>
                <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem', fontWeight: 700,
                    color: dark, margin: '0 0 10px',
                }}>{feat.title}</h3>
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.14rem', color: muted,
                    lineHeight: 1.7, margin: 0,
                }}>{feat.desc}</p>
            </div>
        </div>
    );
}

/* ─── Main export ─── */
export default function WeddingEvents() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [heroVis, setHeroVis] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

    /* hero reveal */
    useEffect(() => {
        const el = heroRef.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeroVis(true); obs.disconnect(); } }, { threshold: 0.1 });
        obs.observe(el); return () => obs.disconnect();
    }, []);

    /* subtle mouse-parallax on hero */
    const handleHeroMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = heroRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMousePos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        });
    }, []);

    const stripRef = useRef<HTMLDivElement>(null);

    /* auto-scroll the gallery strip slightly */
    useEffect(() => {
        const el = stripRef.current; if (!el) return;
        let frame: number;
        let pos = 0;
        const tick = () => {
            pos += 0.4;
            if (pos > el.scrollWidth - el.clientWidth) pos = 0;
            el.scrollLeft = pos;
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        const stop = () => cancelAnimationFrame(frame);
        el.addEventListener('mouseenter', stop);
        el.addEventListener('touchstart', stop, { passive: true });
        return () => { cancelAnimationFrame(frame); el.removeEventListener('mouseenter', stop); };
    }, []);

    /* counter */
    const statsRef = useRef<HTMLDivElement>(null);
    const [statsVis, setStatsVis] = useState(false);
    useEffect(() => {
        const el = statsRef.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVis(true); obs.disconnect(); } }, { threshold: 0.2 });
        obs.observe(el); return () => obs.disconnect();
    }, []);

    return (
        <section id="wedding-events" style={{ background: ivory, position: 'relative', overflow: 'hidden' }}>

            {/* Global keyframes */}
            <style>{`
                @keyframes wdFloat {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50%       { transform: translateY(-16px) rotate(4deg); }
                }
                @keyframes wdPulse {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50%       { transform: scale(1.14); opacity: 1; }
                }
                @keyframes wdShimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                @keyframes wdRing {
                    0%   { transform: scale(0.9); opacity: 0.8; }
                    100% { transform: scale(1.6);  opacity: 0; }
                }
                @keyframes wdSlideIn {
                    from { opacity: 0; transform: translateX(-40px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
            `}</style>

            {/* ══════════════ PART 1 — CINEMATIC HERO ══════════════ */}
            <div
                ref={heroRef}
                onMouseMove={handleHeroMouse}
                style={{
                    position: 'relative',
                    height: 'clamp(600px, 88vh, 940px)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {/* Background photo with mouse parallax */}
                <div style={{
                    position: 'absolute', inset: '-8%',
                    backgroundImage: 'url(/assets/wedding-and-events/beach-weddign.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `translate(${(mousePos.x - 0.5) * -18}px, ${(mousePos.y - 0.5) * -12}px)`,
                    transition: 'transform 0.9s cubic-bezier(0.23,1,0.32,1)',
                    willChange: 'transform',
                }} />

                {/* Rich layered overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(120deg, rgba(20,12,8,0.85) 0%, rgba(20,12,8,0.6) 45%, rgba(20,12,8,0.35) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 80% at 10% 60%, ${rose}22, transparent 60%)` }} />

                {/* Falling petals */}
                <FloatingPetals />

                {/* Decorative ring animation (behind content) */}
                <div style={{
                    position: 'absolute', bottom: '12%', right: '8%',
                    width: 280, height: 280, borderRadius: '50%',
                    border: `1px solid ${gold}30`,
                    animation: 'wdRing 4s ease-out infinite',
                    pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', bottom: '12%', right: '8%',
                    width: 280, height: 280, borderRadius: '50%',
                    border: `1px solid ${gold}20`,
                    animation: 'wdRing 4s ease-out 1.3s infinite',
                    pointerEvents: 'none',
                }} />

                {/* Gold ornamental line top */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: '3px',
                    background: `linear-gradient(to right, transparent, ${gold}, transparent)`,
                    opacity: 0.6,
                }} />

                {/* Hero content */}
                <div style={{ position: 'relative', zIndex: 3, maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 clamp(24px, 5vw, 80px)' }}>

                    {/* Eyebrow */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '12px',
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${gold}40`,
                        borderRadius: '50px',
                        padding: '8px 20px 8px 10px',
                        marginBottom: '32px',
                        opacity: heroVis ? 1 : 0,
                        transform: heroVis ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
                    }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: gold, animation: 'wdPulse 2.5s ease-in-out infinite' }} />
                        <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: gold }}>
                            Weddings &amp; Private Events
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                        fontWeight: 800,
                        color: 'white',
                        margin: '0 0 8px',
                        lineHeight: 1.0,
                        letterSpacing: '-0.03em',
                        maxWidth: '700px',
                        opacity: heroVis ? 1 : 0,
                        transform: heroVis ? 'translateY(0)' : 'translateY(36px)',
                        transition: 'opacity 0.9s ease 0.2s, transform 0.9s cubic-bezier(0.23,1,0.32,1) 0.2s',
                    }}>
                        Your Story,
                    </h1>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                        fontWeight: 800,
                        margin: '0 0 32px',
                        lineHeight: 1.0,
                        letterSpacing: '-0.03em',
                        maxWidth: '700px',
                        background: `linear-gradient(90deg, ${gold} 0%, #F0D4A0 40%, ${gold} 80%)`,
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: heroVis ? 'wdShimmer 5s linear infinite' : 'none',
                        opacity: heroVis ? 1 : 0,
                        transition: 'opacity 0.9s ease 0.35s',
                    }}>
                        Perfectly Told.
                    </h1>

                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                        color: 'rgba(255,255,255,0.72)',
                        lineHeight: 1.8,
                        maxWidth: '500px',
                        margin: '0 0 44px',
                        opacity: heroVis ? 1 : 0,
                        transform: heroVis ? 'translateY(0)' : 'translateY(24px)',
                        transition: 'opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s',
                    }}>
                        From barefoot beach ceremonies to grand colonial estate galas — we craft unforgettable weddings and private events against Sri Lanka's most breathtaking backdrops.
                    </p>

                    {/* CTAs */}
                    <div style={{
                        display: 'flex', gap: '16px', flexWrap: 'wrap',
                        opacity: heroVis ? 1 : 0,
                        transform: heroVis ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.9s ease 0.65s, transform 0.9s ease 0.65s',
                    }}>
                        {/* Primary — links to detail page */}
                        <Link href="/weddings" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '12px',
                            background: gold,
                            color: dark,
                            textDecoration: 'none',
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.86rem', fontWeight: 800,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            padding: '16px 36px', borderRadius: '50px',
                            boxShadow: `0 12px 40px ${gold}55`,
                            transition: 'transform 0.3s, box-shadow 0.3s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 20px 50px ${gold}66`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 12px 40px ${gold}55`; }}
                        >
                            View Full Story
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                        {/* Secondary */}
                        <a href="#contact" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '12px',
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(12px)',
                            border: '1.5px solid rgba(255,255,255,0.35)',
                            color: 'white',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.86rem', fontWeight: 700,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            padding: '16px 36px', borderRadius: '50px',
                            transition: 'background 0.3s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.18)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.1)'; }}
                        >
                            Request a Quote
                        </a>
                    </div>
                </div>

                {/* Floating corner badge */}
                <div style={{
                    position: 'absolute', bottom: '48px', right: 'clamp(24px, 6vw, 80px)',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(16px)',
                    border: `1.5px solid ${gold}40`,
                    borderRadius: '20px',
                    padding: '20px 24px',
                    textAlign: 'center',
                    zIndex: 3,
                    animation: 'wdFloat 6s ease-in-out infinite',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, color: gold, lineHeight: 1 }}>500+</div>
                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>Celebrations</div>
                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: `${gold}99` }}>crafted with love</div>
                </div>
            </div>

            {/* ══════════════ PART 2 — EXPANDABLE GALLERY STRIP ══════════════ */}
            <div style={{ background: dark, padding: '80px 0' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 60px)', marginBottom: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                        <div>
                            <div style={{
                                fontFamily: 'var(--font-accent)',
                                fontSize: '0.9rem', fontWeight: 700,
                                letterSpacing: '0.24em', textTransform: 'uppercase',
                                color: gold, marginBottom: '12px',
                            }}>Our Gallery</div>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                                fontWeight: 800, color: 'white',
                                margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1,
                            }}>
                                Moments That<br />
                                <span style={{ color: gold, fontStyle: 'italic' }}>Last Forever</span>
                            </h2>
                        </div>
                        <Link href="/weddings#gallery" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            fontFamily: 'var(--font-accent)', fontSize: '0.94rem', fontWeight: 700,
                            letterSpacing: '0.14em', textTransform: 'uppercase',
                            color: gold, textDecoration: 'none',
                            border: `1.5px solid ${gold}40`,
                            padding: '12px 24px', borderRadius: '50px',
                            transition: 'border-color 0.3s, background 0.3s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${gold}12`; (e.currentTarget as HTMLAnchorElement).style.borderColor = gold; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.borderColor = `${gold}40`; }}
                        >
                            View Full Gallery
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Accordion gallery strip */}
                <div
                    ref={stripRef}
                    style={{
                        display: 'flex',
                        gap: '16px',
                        padding: '0 clamp(24px, 4vw, 60px)',
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {gallery.map((item, i) => (
                        <GalleryCard key={item.src} item={item} index={i} />
                    ))}
                </div>
            </div>

            {/* ══════════════ PART 3 — FEATURE CARDS ══════════════ */}
            <div style={{ padding: '100px 0', background: ivory, position: 'relative' }}>
                {/* Decorative background text */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    fontSize: 'clamp(6rem, 16vw, 14rem)', fontWeight: 900,
                    fontFamily: 'var(--font-heading)',
                    color: `${gold}05`, letterSpacing: '-0.04em',
                    whiteSpace: 'nowrap', pointerEvents: 'none', lineHeight: 1,
                }}>FOREVER</div>

                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 60px)' }}>
                    {/* Heading */}
                    <div style={{ textAlign: 'center', marginBottom: '72px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '18px' }}>
                            <div style={{ width: '48px', height: '1px', background: `linear-gradient(to right, transparent, ${gold})` }} />
                            <svg viewBox="0 0 24 24" width="14" height="14" fill={rose} opacity={0.7}>
                                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
                            </svg>
                            <div style={{ width: '48px', height: '1px', background: `linear-gradient(to left, transparent, ${gold})` }} />
                        </div>
                        <div style={{ fontFamily: 'var(--font-accent)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: rose, marginBottom: '16px' }}>
                            Why Choose Us
                        </div>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                            fontWeight: 800, color: dark,
                            margin: '0 auto 16px',
                            letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: '540px',
                        }}>
                            Every Detail, Crafted with{' '}
                            <span style={{ color: rose, fontStyle: 'italic' }}>Intention</span>
                        </h2>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1rem', color: muted,
                            lineHeight: 1.7, maxWidth: '440px', margin: '0 auto',
                        }}>
                            Your dream celebration is our obsession. Our expert team has been creating magical weddings and events across Sri Lanka for over a decade.
                        </p>
                    </div>

                    {/* Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '24px',
                    }}>
                        {features.map((f, i) => <FeatureCard key={f.title} feat={f} delay={i * 110} />)}
                    </div>
                </div>
            </div>

            {/* ══════════════ PART 4 — SPLIT VISION SECTION ══════════════ */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                minHeight: '560px',
            }}>
                {/* Left — Photo */}
                <div style={{ position: 'relative', minHeight: '400px', overflow: 'hidden' }}>
                    <Image
                        src="/assets/wedding-and-events/weddinggg.webp"
                        alt="Wedding Ceremony"
                        fill
                        style={{ objectFit: 'cover', transition: 'transform 0.8s ease' }}
                    />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: `linear-gradient(to right, transparent 60%, ${ivory} 100%)`,
                    }} />
                    {/* Floating quote card */}
                    <div style={{
                        position: 'absolute', bottom: '32px', left: '32px',
                        background: 'rgba(255,255,255,0.92)',
                        backdropFilter: 'blur(16px)',
                        borderRadius: '16px',
                        padding: '20px 24px',
                        maxWidth: '260px',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                        animation: 'wdFloat 7s ease-in-out infinite',
                    }}>
                        <p style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1rem', fontStyle: 'italic',
                            color: dark, margin: '0 0 8px', lineHeight: 1.5,
                        }}>
                            "The best day of our lives — made even more magical."
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={gold}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                            ))}
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '1.14rem', color: muted }}>— Sarah & James</span>
                        </div>
                    </div>
                </div>

                {/* Right — Content */}
                <div style={{
                    background: champagne,
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    padding: 'clamp(48px, 6vw, 80px)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <div style={{ width: '28px', height: '2px', background: rose }} />
                        <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: rose }}>
                            Begin Here
                        </span>
                    </div>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                        fontWeight: 800, color: dark,
                        margin: '0 0 20px', letterSpacing: '-0.02em', lineHeight: 1.2,
                    }}>
                        Let's Plan Your <br />
                        <span style={{ color: rose, fontStyle: 'italic' }}>Perfect Day</span>
                    </h2>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '1rem', color: muted,
                        lineHeight: 1.8, margin: '0 0 32px',
                    }}>
                        Tell us your vision — whether it's an intimate ceremony for 20 or a grand celebration for 500. Our wedding planning team is ready to make it extraordinary.
                    </p>

                    {/* Steps */}
                    {[
                        { num: '01', text: 'Share your vision with our wedding planner' },
                        { num: '02', text: 'Choose your venue and preferred date' },
                        { num: '03', text: 'We handle every detail, you savour every moment' },
                    ].map(step => (
                        <div key={step.num} style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: rose, color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: 'var(--font-accent)', fontSize: '0.85rem', fontWeight: 800,
                                letterSpacing: '0.05em', flexShrink: 0,
                            }}>{step.num}</div>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: dark, lineHeight: 1.6, margin: '4px 0 0' }}>{step.text}</p>
                        </div>
                    ))}

                    {/* CTA buttons */}
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '12px' }}>
                        <Link href="/weddings" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            background: rose, color: 'white',
                            textDecoration: 'none',
                            fontFamily: 'var(--font-accent)', fontSize: '0.96rem', fontWeight: 700,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            padding: '14px 28px', borderRadius: '50px',
                            boxShadow: `0 8px 28px ${rose}44`,
                            transition: 'transform 0.25s, box-shadow 0.25s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; }}
                        >
                            Explore the Detail Page
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                        <a href="#contact" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            background: 'transparent',
                            border: `1.5px solid ${rose}55`,
                            color: rose,
                            textDecoration: 'none',
                            fontFamily: 'var(--font-accent)', fontSize: '0.96rem', fontWeight: 700,
                            letterSpacing: '0.12em', textTransform: 'uppercase',
                            padding: '14px 28px', borderRadius: '50px',
                            transition: 'background 0.25s',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${rose}10`; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>

            {/* ══════════════ PART 5 — STATS BAR ══════════════ */}
            <div ref={statsRef} style={{
                background: `linear-gradient(135deg, ${dark} 0%, #2C1A10 100%)`,
                padding: '60px clamp(24px, 5vw, 80px)',
            }}>
                <div style={{
                    maxWidth: '1280px', margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '40px',
                }}>
                    {[
                        { value: '500+', label: 'Weddings Celebrated' },
                        { value: '12', label: 'Years of Excellence' },
                        { value: '30+', label: 'Iconic Venues' },
                        { value: '100%', label: 'Bespoke & Tailored' },
                    ].map((s, i) => (
                        <div key={s.label} style={{
                            textAlign: 'center',
                            opacity: statsVis ? 1 : 0,
                            transform: statsVis ? 'translateY(0)' : 'translateY(24px)',
                            transition: `opacity 0.7s ease ${i * 100}ms, transform 0.7s ease ${i * 100}ms`,
                        }}>
                            <div style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(2rem, 4vw, 3rem)',
                                fontWeight: 800, color: gold,
                                letterSpacing: '-0.02em', lineHeight: 1,
                            }}>{s.value}</div>
                            <div style={{
                                fontFamily: 'var(--font-accent)',
                                fontSize: '0.88rem', fontWeight: 700,
                                letterSpacing: '0.16em', textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.45)', marginTop: '8px',
                            }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
