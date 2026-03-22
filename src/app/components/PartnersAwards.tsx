'use client';
import { useEffect, useRef, useState } from 'react';

const dark = '#1A1714';
const gold = '#C9A96E';
const muted = '#8A8074';

/* ── Partners (using inline SVG logos for reliability) ── */
const partners = [
    {
        name: 'TripAdvisor',
        svg: (
            <svg viewBox="0 0 120 40" width="110" height="36" fill="currentColor">
                <circle cx="20" cy="20" r="10" opacity="0.9" />
                <circle cx="20" cy="20" r="5" fill="white" opacity="0.9" />
                <text x="36" y="26" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="700">TripAdvisor</text>
            </svg>
        ),
    },
    {
        name: 'Booking.com',
        svg: (
            <svg viewBox="0 0 130 40" width="110" height="36" fill="currentColor">
                <rect x="0" y="10" width="22" height="22" rx="4" opacity="0.85" />
                <text x="8" y="26" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="900" fill="white">B.</text>
                <text x="28" y="26" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700">Booking.com</text>
            </svg>
        ),
    },
    {
        name: 'Lonely Planet',
        svg: (
            <svg viewBox="0 0 140 40" width="120" height="36" fill="currentColor">
                <circle cx="18" cy="20" r="12" opacity="0.7" strokeWidth="2" stroke="currentColor" fill="none" />
                <text x="12" y="24" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="900" fill="currentColor">LP</text>
                <text x="36" y="26" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700">Lonely Planet</text>
            </svg>
        ),
    },
    {
        name: 'SLTDA',
        svg: (
            <svg viewBox="0 0 110 40" width="90" height="36" fill="currentColor">
                <rect x="0" y="8" width="26" height="26" rx="6" opacity="0.8" />
                <text x="5" y="26" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="900" fill="white">SL</text>
                <text x="32" y="26" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700">SLTDA</text>
            </svg>
        ),
    },
    {
        name: 'Expedia',
        svg: (
            <svg viewBox="0 0 110 40" width="90" height="36" fill="currentColor">
                <polygon points="10,8 22,8 16,28" opacity="0.7" />
                <text x="28" y="26" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700">Expedia</text>
            </svg>
        ),
    },
    {
        name: 'Airbnb',
        svg: (
            <svg viewBox="0 0 100 40" width="85" height="36" fill="currentColor">
                <path d="M20 8 C14 8 10 14 10 20 C10 28 20 36 20 36 C20 36 30 28 30 20 C30 14 26 8 20 8 Z" opacity="0.8" />
                <circle cx="20" cy="20" r="5" fill="white" opacity="0.9" />
                <text x="36" y="26" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700">Airbnb</text>
            </svg>
        ),
    },
];

const awards = [
    { year: '2024', title: "Asia's Best Boutique Tour Operator", body: 'Asia Travel Awards', icon: '🏆', accent: gold },
    { year: '2023', title: 'Excellence in Eco-Tourism', body: 'Sri Lanka Tourism Awards', icon: '🌿', accent: '#52B788' },
    { year: '2022', title: 'Top-Rated Safari Experiences', body: 'TripAdvisor Travellers\' Choice', icon: '⭐', accent: '#F4C430' },
    { year: '2021', title: 'Best Luxury Travel Company', body: 'World Travel Awards', icon: '💎', accent: '#9B7EBD' },
];

function useReveal(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
        obs.observe(el); return () => obs.disconnect();
    }, [threshold]);
    return { ref, vis };
}

function AwardCard({ award, delay }: { award: typeof awards[0]; delay: number }) {
    const { ref, vis } = useReveal(0.08);
    const [hov, setHov] = useState(false);
    return (
        <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(36px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}ms` }}>
            <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
                background: hov ? dark : 'white',
                borderRadius: '20px', padding: '28px 24px',
                borderTop: `3px solid ${hov ? award.accent : 'transparent'}`,
                boxShadow: hov ? `0 20px 50px rgba(0,0,0,0.12), 0 0 0 1px ${award.accent}33` : '0 3px 16px rgba(0,0,0,0.06)',
                transform: hov ? 'translateY(-5px)' : 'none',
                transition: 'all 0.35s cubic-bezier(0.23,1,0.32,1)', cursor: 'default',
            }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{
                        width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                        background: `${award.accent}15`, border: `1.5px solid ${award.accent}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.4rem',
                        transform: hov ? 'scale(1.12) rotate(-5deg)' : 'none',
                        transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
                    }}>{award.icon}</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: award.accent, marginBottom: '5px' }}>{award.year} Award</div>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 800, color: hov ? 'white' : dark, margin: '0 0 5px', lineHeight: 1.25, letterSpacing: '-0.01em' }}>{award.title}</h4>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', color: hov ? 'rgba(255,255,255,0.45)' : muted, margin: 0 }}>{award.body}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PartnersAwards() {
    const partnersRef = useRef<HTMLDivElement>(null);
    const { ref: headRef, vis: headVis } = useReveal(0.15);

    /* Infinite logo scroll */
    useEffect(() => {
        const el = partnersRef.current; if (!el) return;
        let pos = 0;
        let raf: number;
        const tick = () => {
            pos += 0.5;
            if (pos >= el.scrollWidth / 2) pos = 0;
            el.scrollLeft = pos;
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        const pause = () => cancelAnimationFrame(raf);
        const resume = () => { raf = requestAnimationFrame(tick); };
        el.addEventListener('mouseenter', pause);
        el.addEventListener('mouseleave', resume);
        return () => { cancelAnimationFrame(raf); el.removeEventListener('mouseenter', pause); el.removeEventListener('mouseleave', resume); };
    }, []);

    return (
        <section id="partners-awards" style={{ background: '#F8F5F0', padding: '100px 0 110px', position: 'relative', overflow: 'hidden' }}>

            <style>{`
                @keyframes paFloat  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-8px)} }
                @keyframes paSpin   { from{transform:rotate(0)} to{transform:rotate(360deg)} }
            `}</style>

            {/* Decorative bg ring */}
            <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '500px', height: '500px', borderRadius: '50%', border: `1px solid ${gold}12`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '360px', height: '360px', borderRadius: '50%', border: `1px solid ${gold}18`, pointerEvents: 'none' }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(20px,4vw,48px)', position: 'relative' }}>

                {/* Section heading */}
                <div ref={headRef} style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '16px', opacity: headVis ? 1 : 0, transform: headVis ? 'none' : 'translateY(16px)', transition: 'all 0.6s ease' }}>
                        <div style={{ width: '40px', height: '1px', background: `linear-gradient(to right, transparent, ${gold})` }} />
                        <svg viewBox="0 0 24 24" width="14" height="14" fill={gold} opacity={0.7}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        <div style={{ width: '40px', height: '1px', background: `linear-gradient(to left, transparent, ${gold})` }} />
                    </div>
                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: gold, marginBottom: '14px', opacity: headVis ? 1 : 0, transform: headVis ? 'none' : 'translateY(12px)', transition: 'all 0.6s ease 0.1s' }}>Trusted Worldwide</div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.9rem,3.8vw,3rem)', fontWeight: 800, color: dark, margin: '0 auto 16px', letterSpacing: '-0.02em', lineHeight: 1.1, maxWidth: '540px', opacity: headVis ? 1 : 0, transform: headVis ? 'none' : 'translateY(18px)', transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s' }}>
                        Recognised by the World's <span style={{ color: gold, fontStyle: 'italic' }}>Best</span>
                    </h2>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.14rem', color: muted, lineHeight: 1.7, maxWidth: '440px', margin: '0 auto', opacity: headVis ? 1 : 0, transition: 'opacity 0.7s ease 0.25s' }}>
                        Over a decade of award-winning excellence and global partnerships make Red Elephant the most trusted name in Sri Lanka travel.
                    </p>
                </div>

                {/* Award cards grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '80px' }}>
                    {awards.map((a, i) => <AwardCard key={a.title} award={a} delay={i * 100} />)}
                </div>

                {/* Partner logos marquee */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.88rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: muted }}>Official Partners &amp; Listed On</div>
                </div>

                {/* Faded edges mask */}
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to right, #F8F5F0, transparent)', zIndex: 2, pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(to left, #F8F5F0, transparent)', zIndex: 2, pointerEvents: 'none' }} />
                    <div ref={partnersRef} style={{ display: 'flex', gap: '0', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', alignItems: 'center', padding: '8px 0' }}>
                        {/* Duplicate for seamless loop */}
                        {[...partners, ...partners].map((p, i) => (
                            <div key={`${p.name}-${i}`} style={{ flexShrink: 0, padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted, opacity: 0.65, transition: 'opacity 0.3s, color 0.3s', cursor: 'default' }}
                                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.opacity = '1'; d.style.color = dark; }}
                                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.opacity = '0.65'; d.style.color = muted; }}
                            >
                                {p.svg}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust badges row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '56px' }}>
                    {[
                        { icon: '🔒', label: 'Secure Booking', sub: '256-bit SSL Encrypted' },
                        { icon: '✈️', label: 'ATOL Protected', sub: 'Air Travel Organiser Licence' },
                        { icon: '🌱', label: 'Carbon Neutral', sub: 'Certified Eco-Operator' },
                        { icon: '🤝', label: '24/7 Support', sub: 'Always Here for You' },
                    ].map(b => (
                        <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', borderRadius: '14px', padding: '14px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', flex: '1 1 200px', maxWidth: '260px' }}>
                            <div style={{ fontSize: '1.6rem', flexShrink: 0 }}>{b.icon}</div>
                            <div>
                                <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.96rem', fontWeight: 700, color: dark, letterSpacing: '0.04em' }}>{b.label}</div>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.94rem', color: muted }}>{b.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
