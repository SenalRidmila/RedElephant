'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/* ====== WEDDING & EVENTS DESIGN TOKENS ====== */
const bgPaper = '#FAF9F6';
const charcoal = '#1A1817';
const burgundy = '#5B2C2C';
const goldLeaf = '#D4AF37';

const venues = [
    {
        num: "01",
        title: "The Azure Coast",
        location: "Weligama Bay",
        desc: "A pristine private beach cove where the Indian Ocean plays the ceremony march. Sunset vows under silk-draped arcs and salted breezes.",
        img: "/assets/wedding-and-events/beach-weddign.webp",
        quote: "Where the sky meets the sea, and two hearts become one.",
        highlights: ["Private beachfront ceremony space", "Sunset & golden hour photography", "Floating floral arch installations", "Oceanside reception marquee", "On-site luxury changing suites"],
        capacity: "Up to 200 Guests",
        bestFor: "Tropical & Barefoot Luxury",
        bestSeason: "November – April",
        duration: "Half-day to 3-day packages",
    },
    {
        num: "02",
        title: "Mist-Crest Terrace",
        location: "Nuwara Eliya",
        desc: "Intimate highland vows surrounded by rolling emerald hills and ethereal cloud cover at 6,000ft. Sanctuary in the sky.",
        img: "/assets/wedding-and-events/misty-hills.webp",
        quote: "High above the world, love finds its most honest altitude.",
        highlights: ["Cloud-level open-air ceremony terrace", "Heritage colonial manor reception", "Tea estate garden strolls & portraits", "Horse-drawn carriage procession", "Bespoke highland florals & greenery"],
        capacity: "Up to 80 Guests",
        bestFor: "Intimate & Scenic Romance",
        bestSeason: "January – September",
        duration: "1 to 2-day curated packages",
    },
    {
        num: "03",
        title: "Heritage Estate",
        location: "Galle Fort",
        desc: "Colonial grandeur meets tropical lushness in a garden designed for 500 year-old stories. Grand galas in a living museum.",
        img: "/assets/wedding-and-events/weddinggg.webp",
        quote: "History becomes the most beautiful backdrop for a new beginning.",
        highlights: ["UNESCO-listed Dutch colonial ramparts", "300-year-old manicured garden venue", "Grand ballroom reception hall", "Candlelit cobblestone ceremony walk", "Exclusive fort-access evening events"],
        capacity: "Up to 500 Guests",
        bestFor: "Grand & Cultural Celebrations",
        bestSeason: "December – April",
        duration: "Full weekend bespoke packages",
    }
];

type Venue = typeof venues[0];

const inkSecondary = '#4A4D4A';
const sandSilk = '#F5F2ED';

const galleryItems = [
    { img: '/assets/wedding-and-events/beach-weddign.webp', label: 'Beach Ceremony', sub: 'Tropical Shore', mood: 'Golden hour waves, bare feet in warm sand, vows carried by the ocean breeze.' },
    { img: '/assets/wedding-and-events/weddinggg.webp', label: 'Garden Reception', sub: 'Colonial Estate', mood: 'Candlelit courtyards, centuries of colonial grandeur dressed in fresh flowers.' },
    { img: '/assets/wedding-and-events/misty-hills.webp', label: 'Highland Romance', sub: 'Cloud Nine', mood: 'Cloud cover at 6,000ft, emerald silence, and love that echoes across the hills.' },
    { img: '/assets/wedding-and-events/events.webp', label: 'Private Events', sub: 'Exclusive Venues', mood: 'Bespoke gatherings curated end-to-end, where every detail tells your story.' },
    { img: '/assets/wedding-and-events/wedding.webp', label: 'Intimate Vows', sub: 'Sunset Setting', mood: 'Soft light, fewer guests, and a moment of stillness that lasts a lifetime.' },
];

function GalleryMasonryCard({ img, label, sub, gridCol, height, delay, onClick }: {
    img: string, label: string, sub: string, gridCol: string, height: string, delay: number, onClick: () => void
}) {
    const [hovered, setHovered] = useState(false);
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="gallery-masonry-card"
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                gridColumn: gridCol,
                height,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 4,
                cursor: 'zoom-in',
                opacity: inView ? 1 : 0,
                transform: inView ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(30px)',
                transition: `opacity 1s ease ${delay}ms, transform 1.2s cubic-bezier(0.2,0.8,0.2,1) ${delay}ms`,
            }}
        >
            <Image src={img} alt={label} fill style={{ objectFit: 'cover', transform: hovered ? 'scale(1.07)' : 'scale(1.01)', transition: 'transform 1.8s cubic-bezier(0.2,0.8,0.2,1)', filter: 'brightness(0.65) saturate(0.85)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,24,23,0.9) 0%, rgba(26,24,23,0.2) 50%, transparent 100%)' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: hovered ? '100%' : '0%', height: 2, background: `linear-gradient(to right, ${goldLeaf}, transparent)`, transition: 'width 0.9s cubic-bezier(0.2,0.8,0.2,1)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(20px, 3vw, 32px)', transform: hovered ? 'translateY(0)' : 'translateY(6px)', transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1)' }}>
                <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.85rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: goldLeaf, marginBottom: 6 }}>{sub}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', fontWeight: 400, color: '#fff', lineHeight: 1.2 }}>{label}</div>
                <div style={{ marginTop: 12, overflow: 'hidden', maxHeight: hovered ? '24px' : '0', opacity: hovered ? 1 : 0, transition: 'max-height 0.4s ease, opacity 0.35s ease 0.08s', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-accent)', fontSize: '0.85rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
                    <span>View Story</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </div>
            </div>
        </div>
    );
}

/* ── GALLERY LIGHTBOX ─────────────────────────────────────── */
function GalleryLightbox({ index, onClose, onNav }: { index: number; onClose: () => void; onNav: (i: number) => void }) {
    const [visible, setVisible] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [sliding, setSliding] = useState<'left' | 'right' | null>(null);
    const touchStartX = useRef<number | null>(null);
    const item = galleryItems[index];
    const total = galleryItems.length;

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => setVisible(true));
        return () => { document.body.style.overflow = ''; };
    }, []);

    useEffect(() => { setImgLoaded(false); }, [index]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
            if (e.key === 'ArrowRight') handleNav((index + 1) % total);
            if (e.key === 'ArrowLeft') handleNav((index - 1 + total) % total);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    });

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 500);
    };

    const handleNav = (next: number) => {
        const dir: 'left' | 'right' = next > index || (index === total - 1 && next === 0) ? 'left' : 'right';
        setSliding(dir);
        setTimeout(() => { onNav(next); setSliding(null); }, 300);
    };

    return (
        <div
            onClick={handleClose}
            onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
                if (touchStartX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchStartX.current;
                touchStartX.current = null;
                if (Math.abs(dx) < 50) return;
                handleNav(dx < 0 ? (index + 1) % total : (index - 1 + total) % total);
            }}
            style={{
                position: 'fixed', inset: 0, zIndex: 10000,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: visible ? 'rgba(0,0,0,0.94)' : 'rgba(0,0,0,0)',
                backdropFilter: visible ? 'blur(24px)' : 'blur(0px)',
                transition: 'background 0.5s ease, backdrop-filter 0.5s ease',
            }}
        >
            {/* ─ Main image frame ─ */}
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 'min(1080px, 90vw)',
                    borderRadius: 10,
                    overflow: 'hidden',
                    boxShadow: '0 80px 200px rgba(0,0,0,0.85)',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(48px)',
                    transition: 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.2,0.8,0.2,1)',
                }}
            >
                {/* Sliding image container */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    opacity: sliding ? 0 : 1,
                    transform: sliding === 'left' ? 'translateX(-5%)' : sliding === 'right' ? 'translateX(5%)' : 'translateX(0)',
                    transition: sliding
                        ? 'opacity 0.28s ease, transform 0.28s ease'
                        : 'opacity 0.38s ease 0.05s, transform 0.38s ease 0.05s',
                }}>
                    <Image
                        src={item.img}
                        alt={item.label}
                        fill
                        priority
                        onLoad={() => setImgLoaded(true)}
                        style={{
                            objectFit: 'cover',
                            filter: imgLoaded ? 'brightness(0.9) saturate(0.9)' : 'blur(30px) brightness(0.7)',
                            transition: 'filter 0.7s ease',
                        }}
                    />
                    {/* Radial vignette */}
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)' }} />
                </div>

                {/* Caption bar */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: 'clamp(28px, 5vw, 48px) clamp(20px, 4vw, 40px) clamp(20px, 3.5vw, 36px)',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(16px)',
                    transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s',
                }}>
                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.85rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: goldLeaf, marginBottom: 8 }}>
                        {item.sub}
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 2.8vw, 2rem)', fontWeight: 300, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>
                        {item.label}
                    </div>
                    <p style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.88rem)', color: 'rgba(255,255,255,0.5)', fontWeight: 300, lineHeight: 1.7, maxWidth: 520, margin: 0 }}>
                        {item.mood}
                    </p>
                </div>
            </div>

            {/* ─ Counter dots ─ */}
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    position: 'absolute',
                    bottom: 'clamp(20px, 4vh, 40px)',
                    left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', gap: 8, alignItems: 'center',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.5s ease 0.35s',
                }}
            >
                {galleryItems.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => i !== index && handleNav(i)}
                        style={{
                            width: i === index ? 28 : 7, height: 7,
                            borderRadius: 4,
                            background: i === index ? goldLeaf : 'rgba(255,255,255,0.25)',
                            border: 'none', cursor: i === index ? 'default' : 'pointer', padding: 0,
                            transition: 'width 0.45s cubic-bezier(0.2,0.8,0.2,1), background 0.3s',
                        }}
                    />
                ))}
            </div>

            {/* ─ Prev / Next arrows ─ */}
            {[
                { label: '‹', dir: -1, side: 'left' as const },
                { label: '›', dir: +1, side: 'right' as const },
            ].map(({ label, dir, side }) => (
                <button
                    key={side}
                    onClick={e => { e.stopPropagation(); handleNav((index + dir + total) % total); }}
                    style={{
                        position: 'absolute', [side]: 'clamp(10px, 2.5vw, 28px)', top: '50%',
                        transform: 'translateY(-50%)',
                        width: 'clamp(40px, 5vw, 56px)', height: 'clamp(40px, 5vw, 56px)',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.07)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#fff', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.6rem', fontWeight: 200, lineHeight: 1,
                        transition: 'background 0.3s, transform 0.3s',
                        opacity: visible ? 1 : 0,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = `rgba(212,175,55,0.18)`; e.currentTarget.style.transform = 'translateY(-50%) scale(1.12)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
                >
                    {label}
                </button>
            ))}

            {/* ─ Close (✕) ─ */}
            <button
                onClick={e => { e.stopPropagation(); handleClose(); }}
                style={{
                    position: 'absolute', top: 'clamp(14px, 2.5vw, 26px)', right: 'clamp(14px, 2.5vw, 26px)',
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.4s ease 0.2s, background 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
            >
                ✕
            </button>

            {/* ─ Index pill (top-left) ─ */}
            <div style={{
                position: 'absolute', top: 'clamp(14px, 2.5vw, 26px)', left: 'clamp(14px, 2.5vw, 26px)',
                fontFamily: 'var(--font-accent)', fontSize: '1.14rem', letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.38)',
                opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease 0.25s',
            }}>
                {String(index + 1).padStart(2, '0')} <span style={{ color: goldLeaf }}>/</span> {String(total).padStart(2, '0')}
            </div>
        </div>
    );
}

/* ── VENUE DETAIL OVERLAY ────────────────────────────────── */
function VenueDetailOverlay({ venue, onClose }: { venue: Venue | null; onClose: () => void }) {
    const [visible, setVisible] = useState(false);
    const [contentIn, setContentIn] = useState(false);

    useEffect(() => {
        if (venue) {
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(() => {
                setVisible(true);
                setTimeout(() => setContentIn(true), 200);
            });
        } else {
            setVisible(false);
            setContentIn(false);
            document.body.style.overflow = '';
        }
    }, [venue]);

    const handleClose = () => {
        setVisible(false);
        setContentIn(false);
        setTimeout(onClose, 600);
    };

    if (!venue) return null;

    return (
        <div
            onClick={handleClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: visible ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0)',
                backdropFilter: visible ? 'blur(8px)' : 'blur(0px)',
                transition: 'background 0.6s ease, backdrop-filter 0.6s ease',
                display: 'flex', alignItems: 'flex-end',
            }}
        >
            {/* Drawer Panel */}
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    width: '100%',
                    maxHeight: '90vh',
                    background: charcoal,
                    borderRadius: '20px 20px 0 0',
                    overflow: 'hidden',
                    transform: visible ? 'translateY(0)' : 'translateY(100%)',
                    transition: 'transform 0.7s cubic-bezier(0.2,0.8,0.2,1)',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Hero Image Strip */}
                <div style={{ position: 'relative', height: 'clamp(180px, 35vh, 380px)', flexShrink: 0, overflow: 'hidden' }}>
                    <Image
                        src={venue.img} alt={venue.title} fill
                        style={{
                            objectFit: 'cover',
                            filter: 'brightness(0.5) saturate(0.8)',
                            transform: contentIn ? 'scale(1.03)' : 'scale(1.12)',
                            transition: 'transform 1.8s cubic-bezier(0.2,0.8,0.2,1)',
                        }}
                    />
                    {/* Gradient overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(26,24,23,0.9) 100%)' }} />

                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        style={{
                            position: 'absolute', top: 20, right: 20,
                            width: 44, height: 44, borderRadius: '50%',
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'background 0.3s',
                            fontSize: '1.3rem', lineHeight: 1,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    >
                        ✕
                    </button>

                    {/* Venue number floating */}
                    <span style={{
                        position: 'absolute', bottom: -20, right: 30,
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(80px, 15vw, 160px)',
                        fontWeight: 900, color: '#fff', opacity: 0.06, lineHeight: 1, pointerEvents: 'none',
                    }}>
                        {venue.num}
                    </span>

                    {/* Title over image */}
                    <div style={{
                        position: 'absolute', bottom: 30, left: 'clamp(24px, 5vw, 48px)',
                        opacity: contentIn ? 1 : 0, transform: contentIn ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.2,0.8,0.2,1) 0.3s',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                            <div style={{ width: 24, height: 1, background: goldLeaf }} />
                            <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.88rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: goldLeaf }}>{venue.location}</span>
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: 300, color: '#fff', margin: 0, lineHeight: 1 }}>{venue.title}</h2>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div style={{ overflowY: 'auto', flex: 1, padding: 'clamp(24px, 5vw, 48px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40 }}>

                    {/* Left col */}
                    <div style={{ opacity: contentIn ? 1 : 0, transform: contentIn ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.8s ease 0.45s, transform 0.9s cubic-bezier(0.2,0.8,0.2,1) 0.45s' }}>
                        {/* Quote */}
                        <blockquote style={{ borderLeft: `3px solid ${goldLeaf}`, paddingLeft: 20, margin: '0 0 32px', fontFamily: 'var(--font-heading)', fontSize: 'clamp(1rem, 2vw, 1.35rem)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
                            &ldquo;{venue.quote}&rdquo;
                        </blockquote>

                        {/* Desc */}
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '1rem', fontWeight: 300, marginBottom: 32 }}>{venue.desc}</p>

                        {/* Highlights */}
                        <div style={{ marginBottom: 0 }}>
                            <div style={{ fontFamily: 'var(--font-accent)', fontSize: '1.14rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: goldLeaf, marginBottom: 16 }}>Venue Highlights</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {venue.highlights.map((h, i) => (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'flex-start', gap: 12,
                                        opacity: contentIn ? 1 : 0,
                                        transform: contentIn ? 'translateX(0)' : 'translateX(-16px)',
                                        transition: `opacity 0.6s ease ${0.55 + i * 0.08}s, transform 0.7s cubic-bezier(0.2,0.8,0.2,1) ${0.55 + i * 0.08}s`,
                                    }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: goldLeaf, marginTop: 7, flexShrink: 0 }} />
                                        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.6 }}>{h}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right col — metadata cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, opacity: contentIn ? 1 : 0, transform: contentIn ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.8s ease 0.55s, transform 0.9s cubic-bezier(0.2,0.8,0.2,1) 0.55s' }}>
                        {[
                            { label: 'Capacity', value: venue.capacity, icon: '👥' },
                            { label: 'Best For', value: venue.bestFor, icon: '✦' },
                            { label: 'Best Season', value: venue.bestSeason, icon: '🌤' },
                            { label: 'Duration', value: venue.duration, icon: '⏱' },
                        ].map(m => (
                            <div key={m.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                                <span style={{ fontSize: '1.3rem' }}>{m.icon}</span>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: goldLeaf, marginBottom: 4 }}>{m.label}</div>
                                    <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 400 }}>{m.value}</div>
                                </div>
                            </div>
                        ))}

                        {/* Enquire CTA */}
                        <a href="#enquiry" onClick={handleClose} style={{
                            marginTop: 8,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                            background: burgundy,
                            color: '#fff', textDecoration: 'none',
                            padding: '18px 32px',
                            fontFamily: 'var(--font-accent)', fontSize: '0.94rem',
                            letterSpacing: '0.25em', textTransform: 'uppercase',
                            borderRadius: 4, transition: 'background 0.3s',
                        }}
                            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = goldLeaf}
                            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = burgundy}
                        >
                            Enquire About This Venue
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function WeddingsDetailPage() {
    const [scrolled, setScrolled] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
    const [selectedPackage, setSelectedPackage] = useState<string>('');
    const [guestCount, setGuestCount] = useState<string>('Intimate (2-30)');
    const [formState, setFormState] = useState({ name: '', email: '', date: '', vision: '' });
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hash-scroll: auto-open lightbox from homepage gallery cards (e.g. #gallery-2)
    useEffect(() => {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#gallery-')) {
            const idx = parseInt(hash.replace('#gallery-', ''), 10);
            if (!isNaN(idx) && idx >= 0 && idx < galleryItems.length) {
                // Scroll to the gallery section first, then open lightbox
                const timer = setTimeout(() => {
                    const el = document.getElementById('gallery');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Open lightbox shortly after scroll begins
                    setTimeout(() => setSelectedPhoto(idx), 400);
                }, 600);
                return () => clearTimeout(timer);
            }
        }
        // Also handle plain #gallery hash
        if (hash === '#gallery') {
            const timer = setTimeout(() => {
                const el = document.getElementById('gallery');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 600);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <main style={{ background: bgPaper, color: charcoal, overflowX: 'hidden' }}>

            {/* 1. EDITORIAL HERO */}
            <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <Image
                        src="/assets/wedding-and-events/weddinggg.webp"
                        alt="Royal Ceremony"
                        fill
                        style={{
                            objectFit: 'cover',
                            transform: scrolled ? 'scale(1.05)' : 'scale(1)',
                            transition: 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                            opacity: 0.9
                        }}
                        priority
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,24,23,0.8), transparent 60%)' }} />
                </div>

                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 900, padding: '0 24px' }}>
                    <Revealer delay={200}>
                        <span style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: '1.14rem',
                            letterSpacing: '0.4em',
                            textTransform: 'uppercase',
                            color: goldLeaf,
                            display: 'block',
                            marginBottom: 24
                        }}>
                            Bespoke Celebrations
                        </span>
                    </Revealer>

                    <Revealer delay={400} y={40}>
                        <h1 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
                            fontWeight: 300,
                            lineHeight: 0.95,
                            marginBottom: 40,
                            color: '#fff'
                        }}>
                            A Symphony <br />
                            <span style={{ fontStyle: 'italic', fontWeight: 200, color: goldLeaf }}>of Love.</span>
                        </h1>
                    </Revealer>

                    <Revealer delay={600}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <a href="#enquiry" style={{
                                padding: '18px 48px',
                                border: `1px solid ${goldLeaf}`,
                                color: '#fff',
                                textDecoration: 'none',
                                fontFamily: 'var(--font-accent)',
                                fontSize: '0.94rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3em',
                                borderRadius: '2px',
                                background: 'rgba(212,175,55,0.05)',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.3s'
                            }} onMouseEnter={e => e.currentTarget.style.background = goldLeaf} onMouseLeave={e => e.currentTarget.style.background = 'rgba(212,175,55,0.05)'}>
                                Start Planning
                            </a>
                        </div>
                    </Revealer>
                </div>
            </section>

            {/* 2. THE PHILOSOPHY OF CEREMONY */}
            <section style={{ padding: '160px 0', position: 'relative' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <Revealer>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, marginBottom: 40, lineHeight: 1.2 }}>
                            We don’t just host weddings.<br /> We <span style={{ color: burgundy, fontStyle: 'italic' }}>curate forever.</span>
                        </h2>
                    </Revealer>
                    <Revealer delay={200}>
                        <div style={{ width: 60, height: 1, background: goldLeaf, marginBottom: 40 }} />
                    </Revealer>
                    <Revealer delay={300}>
                        <p style={{ maxWidth: 700, fontSize: '1.3rem', lineHeight: 1.8, color: inkSecondary, fontWeight: 300 }}>
                            From the first petal to the final dance, every moment is stitched together with obsessive attention to detail. Our philosophy is rooted in "Emotional Luxury"—an experience that feels both grand in scale and deeply personal in sentiment.
                        </p>
                    </Revealer>
                </div>
            </section>

            {/* 3. NEXT-LEVEL PANORAMIC VENUE EXPLORER */}
            <PanoramicExplorer onVenueClick={(v) => setSelectedVenue(v)} />

            {/* Venue Detail Overlay */}
            <VenueDetailOverlay venue={selectedVenue} onClose={() => setSelectedVenue(null)} />

            {/* 4. MOMENTS GALLERY — linked from homepage */}
            <section id="gallery" style={{ padding: '120px 0', background: bgPaper }}>
                <div style={{ padding: '0 clamp(24px, 8vw, 100px)', marginBottom: 80 }}>
                    <Revealer>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                                    <div style={{ width: 36, height: 1, background: goldLeaf }} />
                                    <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.9rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: goldLeaf }}>Our Gallery</span>
                                </div>
                                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1 }}>
                                    Moments That <br />
                                    <em style={{ fontStyle: 'italic', fontWeight: 200, color: burgundy }}>Last Forever.</em>
                                </h2>
                            </div>
                            <p style={{ maxWidth: 360, fontSize: '1rem', lineHeight: 1.8, color: inkSecondary, fontWeight: 300 }}>
                                A curated edit of ceremonies, receptions, and private events captured across Sri Lanka's most extraordinary settings.
                            </p>
                        </div>
                    </Revealer>
                </div>

                {/* Masonry-style asymmetric grid */}
                <div style={{ padding: '0 clamp(24px, 8vw, 100px)', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'auto', gap: 16 }}>
                    <GalleryMasonryCard
                        img="/assets/wedding-and-events/beach-weddign.webp"
                        label="Beach Ceremony"
                        sub="Tropical Shore"
                        gridCol="1 / 8"
                        height="520px"
                        delay={0}
                        onClick={() => setSelectedPhoto(0)}
                    />
                    <GalleryMasonryCard
                        img="/assets/wedding-and-events/weddinggg.webp"
                        label="Garden Reception"
                        sub="Colonial Estate"
                        gridCol="8 / 13"
                        height="520px"
                        delay={100}
                        onClick={() => setSelectedPhoto(1)}
                    />
                    <GalleryMasonryCard
                        img="/assets/wedding-and-events/misty-hills.webp"
                        label="Highland Romance"
                        sub="Cloud Nine"
                        gridCol="1 / 5"
                        height="420px"
                        delay={200}
                        onClick={() => setSelectedPhoto(2)}
                    />
                    <GalleryMasonryCard
                        img="/assets/wedding-and-events/events.webp"
                        label="Private Events"
                        sub="Exclusive Venues"
                        gridCol="5 / 9"
                        height="420px"
                        delay={300}
                        onClick={() => setSelectedPhoto(3)}
                    />
                    <GalleryMasonryCard
                        img="/assets/wedding-and-events/wedding.webp"
                        label="Intimate Vows"
                        sub="Sunset Setting"
                        gridCol="9 / 13"
                        height="420px"
                        delay={400}
                        onClick={() => setSelectedPhoto(4)}
                    />
                </div>

                <style>{`
                    @media (max-width: 768px) {
                        .gallery-masonry-card {
                            grid-column: 1 / -1 !important;
                            height: 280px !important;
                        }
                    }
                `}</style>

                {/* Gallery Lightbox */}
                {selectedPhoto !== null && (
                    <GalleryLightbox
                        index={selectedPhoto}
                        onClose={() => setSelectedPhoto(null)}
                        onNav={(i) => setSelectedPhoto(i)}
                    />
                )}
            </section>

            {/* 5. THE SERVICE PILLARS (BURGUNDY BREATH) */}
            <section style={{ padding: '160px 24px', background: burgundy, color: bgPaper, margin: '120px 0' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 60 }}>
                    <Pillar num="01" title="The Concierge" text="A dedicated planner who learns your story, manages your vendors, and protects your peace." />
                    <Pillar num="02" title="The Floral Art" text="Sourcing the rarest blooms from the central highlands to create living sculptures for your aisle." />
                    <Pillar num="03" title="The Gastronomy" text="A menu that travels from traditional Hela flavors to modern global fusion, plated as art." />
                    <Pillar num="04" title="The Production" text="Cinematic lighting and sound that transforms a setting into an atmosphere of purely cinematic quality." />
                </div>
            </section>

            {/* 5. PACKAGE TIERS (FLOATING CARDS) */}
            <section style={{ padding: '120px 0', background: sandSilk }}>
                <div style={{ textAlign: 'center', marginBottom: 80 }}>
                    <Revealer>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 300 }}>Curated Packages</h2>
                        <p style={{ opacity: 0.6, fontSize: '1rem', marginTop: 10 }}>Starting points for a journey that is entirely yours.</p>
                    </Revealer>
                </div>

                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
                    <TierCard
                        title="Intimate Vows"
                        price="From $3,800"
                        features={['Up to 24 Guests', 'Private Beach Access', 'Minister & Music', 'Signature Cake']}
                        onSelect={() => { setSelectedPackage('Intimate Vows'); setGuestCount('Intimate (2-30)'); document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' }) }}
                    />
                    <TierCard
                        featured
                        title="Royal Celebration"
                        price="From $9,400"
                        features={['Up to 150 Guests', 'Grand Estate Venue', 'Cultural Performers', '7-Course Banquet', 'Full Event Decor']}
                        onSelect={() => { setSelectedPackage('Royal Celebration'); setGuestCount('Mid-Scale (30-150)'); document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' }) }}
                    />
                    <TierCard
                        title="Bespoke Gala"
                        price="Tailored"
                        features={['Unlimited Guests', 'Multi-day Event', 'Global Artist Booking', 'Private Island Option', 'VIP Concierge']}
                        onSelect={() => { setSelectedPackage('Bespoke Gala'); setGuestCount('Grand (150-500+)'); document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' }) }}
                    />
                </div>
            </section>

            {/* 6. ENQUIRY CONCIERGE (Burgundy Accents) */}
            <section id="enquiry" style={{ padding: '160px 24px', maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 100, alignItems: 'center' }}>
                    <div>
                        <Revealer>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 300, lineHeight: 1.1, marginBottom: 30 }}>Let's write <br />the <span style={{ color: burgundy, fontStyle: 'italic' }}>prologue.</span></h2>
                            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: inkSecondary }}>Every grand story begins with a single conversation. Our team is waiting to hear yours.</p>
                        </Revealer>
                    </div>

                    <Revealer delay={300}>
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!formState.name.trim() || !formState.email.trim() || !formState.date) {
                                    setErrorMsg('Please fill in all required fields (Name, Email, and Date).');
                                    return;
                                }
                                setErrorMsg('');
                                alert('Thank you! Your private event inquiry has been received. Our concierge will be in touch within 24 hours to begin crafting your prologue.');
                                setFormState({ name: '', email: '', date: '', vision: '' });
                                setSelectedPackage('');
                                setGuestCount('Intimate (2-30)');
                            }}
                            style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
                        >
                            <div className="input-group">
                                <label style={labelStyle}>Your Name *</label>
                                <input type="text" placeholder="e.g. Eleanor & James" style={inputStyle} value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
                            </div>
                            <div className="input-group">
                                <label style={labelStyle}>Email Address *</label>
                                <input type="email" placeholder="hello@example.com" style={inputStyle} value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
                            </div>
                            <div className="input-group">
                                <label style={labelStyle}>Proposed Date *</label>
                                <input type="date" style={inputStyle} value={formState.date} onChange={e => setFormState({...formState, date: e.target.value})} />
                            </div>
                            <div className="input-group">
                                <label style={labelStyle}>Guest Count</label>
                                <select style={inputStyle} value={guestCount} onChange={(e) => setGuestCount(e.target.value)}>
                                    <option value="Intimate (2-30)">Intimate (2-30)</option>
                                    <option value="Mid-Scale (30-150)">Mid-Scale (30-150)</option>
                                    <option value="Grand (150-500+)">Grand (150-500+)</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label style={labelStyle}>Selected Package</label>
                                <select style={inputStyle} value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)}>
                                    <option value="">I'm not sure yet</option>
                                    <option value="Intimate Vows">Intimate Vows</option>
                                    <option value="Royal Celebration">Royal Celebration</option>
                                    <option value="Bespoke Gala">Bespoke Gala</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label style={labelStyle}>The Vision</label>
                                <textarea placeholder="Tropical, Minimalist, Traditional Royal..." style={{ ...inputStyle, minHeight: 120 }} value={formState.vision} onChange={e => setFormState({...formState, vision: e.target.value})} />
                            </div>
                            
                            {errorMsg && (
                                <div style={{ color: '#C41E3A', fontSize: '1.12rem', marginTop: '-10px', marginBottom: '-10px', fontFamily: 'var(--font-body)' }}>
                                    {errorMsg}
                                </div>
                            )}

                            <button style={{
                                background: burgundy,
                                color: '#fff',
                                border: 'none',
                                padding: '24px',
                                fontFamily: 'var(--font-accent)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.3em',
                                fontSize: '1.14rem',
                                cursor: 'pointer',
                                transition: '0.4s'
                            }} onMouseEnter={e => e.currentTarget.style.background = charcoal} onMouseLeave={e => e.currentTarget.style.background = burgundy}>
                                Send Proposal Request
                            </button>
                        </form>
                    </Revealer>
                </div>
            </section>
        </main>
    );
}

/* HIGH-END COMPONENTS */

function PanoramicExplorer({ onVenueClick }: { onVenueClick: (v: Venue) => void }) {
    return (
        <section style={{ background: '#0D0C0B', position: 'relative', overflow: 'hidden' }}>
            {/* Film grain SVG filter — applied globally to this section */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="film-grain">
                        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                        <feBlend in="SourceGraphic" mode="overlay" result="blend" />
                        <feComposite in="blend" in2="SourceGraphic" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Ambient radial glow — warm centre light, cinema look */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
                background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(180,120,40,0.07) 0%, transparent 70%)',
            }} />

            {/* Section Header */}
            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(80px, 12vw, 160px) clamp(24px, 8vw, 120px) 60px' }}>
                <Revealer>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
                                <div style={{ width: 40, height: 1, background: goldLeaf }} />
                                <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.94rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: goldLeaf }}>
                                    Exclusive Collection
                                </span>
                            </div>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 300, lineHeight: 0.95, color: '#fff', letterSpacing: '-0.02em' }}>
                                Iconic <br />
                                <em style={{ fontWeight: 200, color: goldLeaf }}>Destinations.</em>
                            </h2>
                        </div>
                        {/* Film reel counter */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                            <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.96rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Click to Explore</span>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {venues.map((v, i) => (
                                    <div key={i} style={{ width: 32, height: 1, background: i === 0 ? goldLeaf : 'rgba(255,255,255,0.15)' }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </Revealer>
            </div>

            {/* Each Venue as its own cinematic panel */}
            {venues.map((venue, i) => (
                <VenueScrollPanel key={venue.num} venue={venue} index={i} onClick={() => onVenueClick(venue)} />
            ))}

            {/* Bottom padding */}
            <div style={{ height: 120 }} />
        </section>
    );
}

function VenueScrollPanel({ venue, index, onClick }: { venue: typeof venues[0], index: number, onClick: () => void }) {
    const [inView, setInView] = useState(false);
    const [hovered, setHovered] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setInView(true); } else { setInView(false); } },
            { threshold: 0.2 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const isEven = index % 2 === 0;
    // Warm cinematic tint per venue
    const tintColor = index === 0 ? 'rgba(200,150,60,0.12)' : index === 1 ? 'rgba(60,100,130,0.1)' : 'rgba(160,90,60,0.12)';

    return (
        <div
            ref={ref}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative',
                margin: '0 clamp(20px, 5vw, 60px) clamp(20px, 3vw, 40px)',
                borderRadius: 6,
                overflow: 'hidden',
                height: 'clamp(480px, 72vh, 780px)',
                cursor: 'pointer',
                // Cinematic widescreen feel — slight scale on hover
                transform: hovered ? 'scale(1.008)' : 'scale(1)',
                transition: 'transform 1.2s cubic-bezier(0.2,0.8,0.2,1)',
                boxShadow: hovered
                    ? '0 60px 140px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.15)'
                    : '0 30px 80px rgba(0,0,0,0.5)',
            }}
        >
            {/* ── base image ── */}
            <div style={{ position: 'absolute', inset: 0 }}>
                <Image
                    src={venue.img}
                    alt={venue.title}
                    fill
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center 30%',
                        transform: hovered ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        // CINEMATIC: higher brightness, slight desaturate
                        filter: 'brightness(0.72) saturate(0.75)',
                    }}
                />
            </div>

            {/* ── Warm cinematic color grade overlay ── */}
            <div style={{ position: 'absolute', inset: 0, background: tintColor, mixBlendMode: 'soft-light' }} />

            {/* ── Directional story gradient (soft, not black) ── */}
            <div style={{
                position: 'absolute', inset: 0,
                background: isEven
                    ? 'linear-gradient(105deg, rgba(10,8,6,0.82) 0%, rgba(10,8,6,0.35) 55%, transparent 100%)'
                    : 'linear-gradient(255deg, rgba(10,8,6,0.82) 0%, rgba(10,8,6,0.35) 55%, transparent 100%)',
            }} />

            {/* ── CinemaScope: top & bottom letterbox bands ── */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 'clamp(28px, 4vh, 48px)', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(1px)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 'clamp(38px, 5.5vh, 64px)', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(1px)' }} />

            {/* ── Film counter badge — top right ── */}
            <div style={{
                position: 'absolute', top: 'clamp(8px, 1.5vh, 16px)', right: 'clamp(16px, 3vw, 32px)',
                display: 'flex', alignItems: 'center', gap: 6,
                zIndex: 4,
            }}>
                <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.96rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)' }}>
                    {venue.num} / {String(venues.length).padStart(2, '0')}
                </span>
            </div>

            {/* ── Ghost number background watermark ── */}
            <span style={{
                position: 'absolute',
                bottom: -30,
                [isEven ? 'right' : 'left']: -10,
                fontSize: 'clamp(140px, 22vw, 260px)',
                lineHeight: 1,
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                color: '#fff',
                opacity: hovered ? 0.14 : 0.07,
                userSelect: 'none',
                pointerEvents: 'none',
                transition: 'opacity 0.8s ease',
                letterSpacing: '-0.05em',
            }}>
                {venue.num}
            </span>

            {/* ── Gold sweep line (top) ── */}
            <div style={{
                position: 'absolute',
                top: 'clamp(28px, 4vh, 48px)',  // just below letterbox
                left: isEven ? 0 : 'auto',
                right: isEven ? 'auto' : 0,
                width: hovered ? '60%' : '0%',
                height: 1,
                background: `linear-gradient(to ${isEven ? 'right' : 'left'}, ${goldLeaf}cc, transparent)`,
                transition: 'width 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                zIndex: 3,
            }} />

            {/* ── Main content area ── */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: `clamp(70px, 10vh, 100px) clamp(28px, 5vw, 64px) clamp(60px, 9vh, 96px)`,
                alignItems: isEven ? 'flex-start' : 'flex-end',
            }}>
                <div style={{
                    maxWidth: 540,
                    textAlign: isEven ? 'left' : 'right',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(50px)',
                    transition: `opacity 1.1s ease ${index * 120}ms, transform 1.4s cubic-bezier(0.2,0.8,0.2,1) ${index * 120}ms`,
                }}>
                    {/* Location pill */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, justifyContent: isEven ? 'flex-start' : 'flex-end' }}>
                        <div style={{ width: 24, height: 1, background: `${goldLeaf}cc` }} />
                        <span style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: '0.88rem',
                            letterSpacing: '0.28em',
                            textTransform: 'uppercase',
                            color: `${goldLeaf}dd`,
                            textShadow: `0 0 20px ${goldLeaf}66`,
                        }}>
                            {venue.location}
                        </span>
                        <div style={{ width: 24, height: 1, background: `${goldLeaf}cc` }} />
                    </div>

                    {/* Venue title */}
                    <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
                        fontWeight: 300,
                        color: '#fff',
                        marginBottom: 16,
                        lineHeight: 1.05,
                        letterSpacing: '-0.02em',
                        textShadow: '0 4px 40px rgba(0,0,0,0.6)',
                    }}>
                        {venue.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                        fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
                        lineHeight: 1.75,
                        color: 'rgba(255,255,255,0.65)',
                        fontWeight: 300,
                        maxWidth: 400,
                        marginBottom: 28,
                        textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                    }}>
                        {venue.desc}
                    </p>

                    {/* CTA pill */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 12,
                        background: hovered ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(8px)',
                        border: `1px solid ${hovered ? goldLeaf + '60' : 'rgba(255,255,255,0.12)'}`,
                        padding: '10px 20px',
                        borderRadius: 40,
                        transition: 'all 0.5s ease',
                        fontFamily: 'var(--font-accent)',
                        fontSize: '1.14rem',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: hovered ? goldLeaf : 'rgba(255,255,255,0.55)',
                    }}>
                        Explore Venue
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* HELPER COMPONENTS */

const labelStyle = {
    fontFamily: 'var(--font-accent)',
    fontSize: '1.14rem',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: burgundy,
    display: 'block',
    marginBottom: 10
};

const inputStyle = {
    width: '100%',
    padding: '16px 0',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${burgundy}33`,
    outline: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
};

function Pillar({ num, title, text }: { num: string, title: string, text: string }) {
    return (
        <Revealer>
            <div style={{ borderLeft: `1px solid ${bgPaper}33`, paddingLeft: 30 }}>
                <span style={{ fontFamily: 'var(--font-accent)', fontSize: '1.14rem', color: goldLeaf, display: 'block', marginBottom: 16 }}>{num}</span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 400, marginBottom: 16 }}>{title}</h4>
                <p style={{ opacity: 0.7, fontSize: '1rem', lineHeight: 1.7 }}>{text}</p>
            </div>
        </Revealer>
    );
}

function TierCard({ title, price, features, featured = false, onSelect }: { title: string, price: string, features: string[], featured?: boolean, onSelect?: () => void }) {
    return (
        <Revealer>
            <div style={{
                background: featured ? burgundy : '#fff',
                color: featured ? bgPaper : charcoal,
                padding: '60px 48px',
                borderRadius: '4px',
                boxShadow: '0 40px 100px rgba(0,0,0,0.03)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 300, marginBottom: 10 }}>{title}</h3>
                <div style={{ color: featured ? goldLeaf : burgundy, fontSize: '1.3rem', marginBottom: 40, fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{price}</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
                    {features.map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '1rem', opacity: 0.8 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: featured ? goldLeaf : burgundy }} />
                            {f}
                        </div>
                    ))}
                </div>
                <button 
                    onClick={onSelect}
                    style={{
                        padding: '16px 0',
                        background: featured ? goldLeaf : charcoal,
                        color: featured ? charcoal : '#fff',
                        border: 'none',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-accent)',
                        letterSpacing: '0.2em',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    Select Package
                </button>
            </div>
        </Revealer>
    );
}

function Revealer({ children, delay = 0, y = 30 }: { children: React.ReactNode, delay?: number, y?: number }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'none' : `translateY(${y}px)`,
                transition: `all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`
            }}
        >
            {children}
        </div>
    );
}
