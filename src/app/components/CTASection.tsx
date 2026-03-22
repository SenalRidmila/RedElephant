'use client';

import { useEffect, useRef, useState } from 'react';

import { packages } from '../data/packages';

const crimson = '#C41E3A';
const gold = '#C9A96E';
const dark = '#1A1714';

const PACKAGES = [
    ...packages.map(p => `${p.title} – ${p.days} Days`),
    'Custom / Bespoke Package',
];

const TRUST = [
    { num: '01', title: 'Free Consultation', sub: 'Talk to our experts at no cost' },
    { num: '02', title: 'Tailor-Made Itineraries', sub: 'Every journey built just for you' },
    { num: '03', title: 'No Hidden Fees', sub: 'Transparent pricing, always' },
    { num: '04', title: '24 / 7 Support', sub: 'We\'re with you every step of the way' },
];

/* ── window width hook ── */
function useWindowWidth() {
    const [w, setW] = useState(0);
    useEffect(() => {
        const update = () => setW(window.innerWidth);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);
    return w;
}

/* ── field label wrapper ── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <label style={{
                fontFamily: 'var(--font-accent)', fontSize: '0.74rem',
                fontWeight: 700, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: gold,
            }}>
                {label}
            </label>
            {children}
        </div>
    );
}

export default function CTASection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', pkg: '', guests: '2', from: '', to: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

    const w = useWindowWidth();
    const isMobile = w > 0 && w <= 600;
    const isTablet = w > 0 && w <= 960;

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold: 0.08 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);

        // Check for URL params to pre-fill the form
        const params = new URLSearchParams(window.location.search);
        const pkgParam = params.get('package');
        const guestsParam = params.get('guests');
        if (pkgParam || guestsParam) {
            setForm(f => ({
                ...f,
                pkg: pkgParam || f.pkg,
                guests: guestsParam || f.guests
            }));
            
            // Scroll to form if redirected from a package page
            if (window.location.hash === '#contact') {
                setTimeout(() => {
                    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }

        return () => obs.disconnect();
    }, []);

    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setForm(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim()) {
            setErrorMsg('Please enter your Name and Email to continue.');
            return;
        }
        setErrorMsg('');
        setSending(true);
        setTimeout(() => { setSending(false); setSent(true); }, 1600);
    };

    const inputBase: React.CSSProperties = {
        width: '100%',
        padding: isMobile ? '12px 14px' : '14px 18px',
        background: 'rgba(255,255,255,0.07)',
        border: '1.5px solid rgba(255,255,255,0.14)',
        borderRadius: 12,
        color: 'white',
        fontFamily: 'var(--font-body)',
        fontSize: isMobile ? '1rem' : '0.92rem',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.25s, background 0.25s',
    };

    const focusStyle = (field: string): React.CSSProperties => ({
        ...inputBase,
        borderColor: focusedField === field ? gold : 'rgba(255,255,255,0.14)',
        background: focusedField === field ? 'rgba(255,255,255,0.11)' : 'rgba(255,255,255,0.07)',
    });

    /* ── layout values ── */
    const outerPadV = isMobile ? '60px' : isTablet ? '72px' : '100px';
    const outerPadH = isMobile ? '20px' : isTablet ? '32px' : '56px';
    const mainGrid = isTablet ? '1fr' : 'clamp(280px,36%,420px) 1fr';
    const mainGap = isMobile ? '40px' : isTablet ? '52px' : '80px';
    const pairGrid = isMobile ? '1fr' : '1fr 1fr';

    return (
        <section
            id="contact"
            ref={sectionRef}
            style={{ position: 'relative', overflow: 'hidden' }}
        >
            {/* Background image */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url(/assets/sigiriya-home-1.webp)',
                backgroundSize: 'cover', backgroundPosition: 'center',
                backgroundAttachment: isMobile ? 'scroll' : 'fixed',
            }} />

            {/* Dark-red gradient overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(10,6,4,0.97) 0%, rgba(90,10,20,0.93) 45%, rgba(20,10,14,0.97) 100%)',
            }} />

            {/* Gold glow top-left */}
            <div style={{
                position: 'absolute', top: -120, left: -120,
                width: 500, height: 500, borderRadius: '50%',
                background: `radial-gradient(circle, ${gold}18 0%, transparent 70%)`,
                pointerEvents: 'none',
            }} />
            {/* Crimson glow bottom-right */}
            <div style={{
                position: 'absolute', bottom: -80, right: -80,
                width: 420, height: 420, borderRadius: '50%',
                background: `radial-gradient(circle, ${crimson}22 0%, transparent 70%)`,
                pointerEvents: 'none',
            }} />

            {/* Floating rings */}
            {!isMobile && [300, 500, 700].map((s, i) => (
                <div key={i} style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: s, height: s, borderRadius: '50%',
                    border: `1px solid rgba(255,255,255,${0.025 - i * 0.007})`,
                    pointerEvents: 'none',
                }} />
            ))}

            {/* Content */}
            <div style={{
                maxWidth: 1280,
                margin: '0 auto',
                padding: `${outerPadV} ${outerPadH}`,
                boxSizing: 'border-box',
                position: 'relative', zIndex: 2,
                display: 'grid',
                gridTemplateColumns: mainGrid,
                gap: mainGap,
                alignItems: 'start',
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(36px)',
                transition: 'opacity 0.75s ease, transform 0.75s ease',
            }}>

                {/* ══ LEFT — Brand info ══ */}
                <div>
                    {/* Label */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <div style={{ width: 28, height: 2, background: gold, borderRadius: 2 }} />
                        <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: gold }}>
                            Plan Your Journey
                        </span>
                    </div>

                    {/* Headline */}
                    <h2 style={{
                        fontFamily: 'var(--font-heading)', fontWeight: 900,
                        fontSize: isMobile ? '2.4rem' : isTablet ? '2.8rem' : 'clamp(2.2rem, 3.8vw, 3.4rem)',
                        color: 'white', lineHeight: 1.06, letterSpacing: '-0.025em',
                        margin: '0 0 20px',
                    }}>
                        Your Dream<br />
                        <span style={{ background: `linear-gradient(90deg,${gold},#E8C990)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Sri Lanka
                        </span>
                        <br />Journey Awaits
                    </h2>

                    {/* Description */}
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: isMobile ? '0.92rem' : '0.96rem',
                        color: 'rgba(255,255,255,0.55)',
                        lineHeight: 1.8, margin: '0 0 32px',
                        maxWidth: isTablet ? '100%' : 360,
                    }}>
                        Tell us your dream and our expert travel designers will craft a completely bespoke itinerary — just for you. Every journey is unique. Yours will be extraordinary.
                    </p>

                    {/* Trust numbered badges */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 40 }}>
                        {TRUST.map((t, i) => (
                            <div key={t.num} style={{
                                display: 'flex', alignItems: 'center', gap: 16,
                                padding: '13px 0',
                                borderBottom: i < TRUST.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                            }}>
                                {/* Gold ordinal frame */}
                                <div style={{
                                    flexShrink: 0, width: 42, height: 42, borderRadius: 10,
                                    background: `linear-gradient(135deg, ${gold}1A 0%, ${gold}08 100%)`,
                                    border: `1px solid ${gold}44`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    position: 'relative', overflow: 'hidden',
                                }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: 11, height: 2, background: gold }} />
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: 2, height: 11, background: gold }} />
                                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: 11, height: 2, background: gold }} />
                                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: 2, height: 11, background: gold }} />
                                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 900, color: gold, letterSpacing: '0.04em' }}>
                                        {t.num}
                                    </span>
                                </div>
                                {/* Text */}
                                <div>
                                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.92rem', fontWeight: 700, color: 'rgba(255,255,255,0.88)', letterSpacing: '0.04em', marginBottom: 2 }}>
                                        {t.title}
                                    </div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.36)', lineHeight: 1.4 }}>
                                        {t.sub}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact links */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            {
                                href: 'tel:+94773157171', label: '+94 77 315 7171',
                                svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 010 1.18A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.72 6.72l1.28-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
                            },
                            {
                                href: 'mailto:info@redelephanttravels.com', label: 'info@redelephanttravels.com',
                                svg: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
                            },
                        ].map(c => (
                            <a key={c.label} href={c.href} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                                <div style={{
                                    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                                    background: `${gold}18`, border: `1px solid ${gold}33`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {c.svg}
                                </div>
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.45)' }}>
                                    {c.label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* ══ RIGHT — Enquiry Form ══ */}
                <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(28px)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: isMobile ? 18 : 24,
                    padding: isMobile ? '28px 20px' : isTablet ? '36px 32px' : '44px 48px',
                    boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    {/* Gold → crimson top bar */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${gold},${crimson},${gold})` }} />

                    {sent ? (
                        /* SUCCESS */
                        <div style={{ textAlign: 'center', padding: isMobile ? '32px 12px' : '48px 24px' }}>
                            <div style={{
                                width: 68, height: 68, borderRadius: '50%',
                                background: `linear-gradient(135deg,${gold}33,${gold}11)`,
                                border: `2px solid ${gold}66`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 22px', fontSize: '1.8rem', color: gold,
                            }}>✓</div>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: 'white', margin: '0 0 12px' }}>
                                Enquiry Sent!
                            </h3>
                            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: '0 0 28px' }}>
                                Thank you {form.name.split(' ')[0]}! Our team will be in touch within 24 hours to craft your perfect itinerary.
                            </p>
                            <button
                                onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', pkg: '', guests: '2', from: '', to: '', message: '' }); }}
                                style={{
                                    background: 'none', border: `1.5px solid ${gold}55`, color: gold,
                                    fontFamily: 'var(--font-accent)', fontSize: '0.84rem', fontWeight: 700,
                                    letterSpacing: '0.14em', textTransform: 'uppercase',
                                    padding: '12px 28px', borderRadius: 50, cursor: 'pointer', transition: 'all 0.25s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = `${gold}22`; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                            >
                                Send Another Enquiry
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <h3 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: isMobile ? '1.25rem' : '1.45rem',
                                fontWeight: 800, color: 'white',
                                margin: '0 0 24px', letterSpacing: '-0.01em',
                            }}>
                                Send an Enquiry
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 18 }}>

                                {/* Name / Email */}
                                <div style={{ display: 'grid', gridTemplateColumns: pairGrid, gap: 14 }}>
                                    <Field label="Full Name *">
                                        <input type="text" placeholder="e.g. John Smith"
                                            value={form.name} onChange={set('name')}
                                            onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                                            style={focusStyle('name')} />
                                    </Field>
                                    <Field label="Email Address *">
                                        <input type="email" placeholder="john@example.com"
                                            value={form.email} onChange={set('email')}
                                            onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                                            style={focusStyle('email')} />
                                    </Field>
                                </div>

                                {/* Phone / Guests */}
                                <div style={{ display: 'grid', gridTemplateColumns: pairGrid, gap: 14 }}>
                                    <Field label="Phone / WhatsApp">
                                        <input type="tel" placeholder="+1 234 567 8900"
                                            value={form.phone} onChange={set('phone')}
                                            onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)}
                                            style={focusStyle('phone')} />
                                    </Field>
                                    <Field label="Number of Guests">
                                        <input type="number" min="1" max="50" placeholder="2"
                                            value={form.guests} onChange={set('guests')}
                                            onFocus={() => setFocusedField('guests')} onBlur={() => setFocusedField(null)}
                                            style={focusStyle('guests')} />
                                    </Field>
                                </div>
                                
                                {errorMsg && (
                                    <div style={{ color: '#ff6b6b', fontSize: '0.97rem', fontFamily: 'var(--font-body)', background: 'rgba(255,107,107,0.1)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,107,107,0.2)' }}>
                                        {errorMsg}
                                    </div>
                                )}

                                {/* Package */}
                                <Field label="Package Interest">
                                    <select value={form.pkg} onChange={set('pkg')}
                                        onFocus={() => setFocusedField('pkg')} onBlur={() => setFocusedField(null)}
                                        style={{ ...focusStyle('pkg'), appearance: 'none', cursor: 'pointer' }}>
                                        <option value="" style={{ background: dark }}>Select a package…</option>
                                        {PACKAGES.map(p => <option key={p} value={p} style={{ background: dark }}>{p}</option>)}
                                    </select>
                                </Field>

                                {/* Dates */}
                                <div style={{ display: 'grid', gridTemplateColumns: pairGrid, gap: 14 }}>
                                    <Field label="Arrival Date">
                                        <input type="date" value={form.from} onChange={set('from')}
                                            onFocus={() => setFocusedField('from')} onBlur={() => setFocusedField(null)}
                                            style={{ ...focusStyle('from'), colorScheme: 'dark' }} />
                                    </Field>
                                    <Field label="Departure Date">
                                        <input type="date" value={form.to} onChange={set('to')}
                                            onFocus={() => setFocusedField('to')} onBlur={() => setFocusedField(null)}
                                            style={{ ...focusStyle('to'), colorScheme: 'dark' }} />
                                    </Field>
                                </div>

                                {/* Message */}
                                <Field label="Tell Us Your Dream">
                                    <textarea rows={4}
                                        placeholder="Share any special requests, interests or ideas for your Sri Lanka journey…"
                                        value={form.message} onChange={set('message')}
                                        onFocus={() => setFocusedField('msg')} onBlur={() => setFocusedField(null)}
                                        style={{ ...focusStyle('msg'), resize: 'vertical', minHeight: 104, lineHeight: 1.65 }} />
                                </Field>

                                {/* Submit */}
                                <button type="submit" disabled={sending} style={{
                                    width: '100%', padding: isMobile ? '15px 20px' : '16px 24px',
                                    background: sending ? 'rgba(201,169,110,0.4)' : `linear-gradient(135deg,${crimson},#A01530)`,
                                    border: 'none', borderRadius: 12, color: 'white',
                                    fontFamily: 'var(--font-accent)', fontSize: '0.87rem', fontWeight: 800,
                                    letterSpacing: '0.14em', textTransform: 'uppercase',
                                    cursor: sending ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                    boxShadow: sending ? 'none' : `0 8px 28px ${crimson}55`,
                                    transition: 'all 0.3s ease', marginTop: 4,
                                }}
                                    onMouseEnter={e => { if (!sending) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 40px ${crimson}77`; } }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = sending ? 'none' : `0 8px 28px ${crimson}55`; }}
                                >
                                    {sending ? (
                                        <>
                                            <span style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', display: 'inline-block', animation: 'ctaSpin 0.8s linear infinite' }} />
                                            Sending…
                                        </>
                                    ) : (
                                        <>
                                            Send My Enquiry
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                            </svg>
                                        </>
                                    )}
                                </button>

                                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.26)', textAlign: 'center', margin: '2px 0 0' }}>
                                    Your information is private and secure. We never share your details.
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* Global styles for this section */}
            <style>{`
                @keyframes ctaSpin { to { transform: rotate(360deg); } }
                #contact input::placeholder,
                #contact textarea::placeholder { color: rgba(255,255,255,0.22); }
                #contact input[type="date"]::-webkit-calendar-picker-indicator {
                    filter: invert(1) opacity(0.35); cursor: pointer;
                }
                #contact select option { background: #1A1714; color: white; }
            `}</style>
        </section>
    );
}
