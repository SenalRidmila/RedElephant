'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/* ====== DESIGN TOKENS ====== */
const bgSoft = '#FDFDFB'; // Ultra-clean paper-like background
const inkPrimary = '#1A1C1A';
const inkSecondary = '#4A4D4A';
const sageLeaf = '#5B6F5D';
const sandSilk = '#F5F2ED';
const highlight = '#D4AF37'; // Subtle gold for accent moments

export default function AdvancedWellnessPage() {
    const [headerActive, setHeaderActive] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', intention: 'Detox & Purify' });
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const handleScroll = () => setHeaderActive(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hash-scroll: when navigating from homepage card links like /wellness#rituals-ayurveda
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const timer = setTimeout(() => {
                const el = document.querySelector(hash);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 600);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <main style={{ background: bgSoft, color: inkPrimary, overflowX: 'hidden' }}>

            {/* 1. CINEMATIC HERO WITH FLOATING ELEMENTS */}
            <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <Image
                        src="/assets/spa-and-wellness/wellness.webp"
                        alt="Wellness Hero"
                        fill
                        style={{ objectFit: 'cover', opacity: 0.85 }}
                        priority
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(253,253,251,0) 0%, rgba(253,253,251,0.8) 70%, rgba(253,253,251,1) 100%)' }} />
                </div>

                {/* Floating "Live" Grain Overlay */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.03, pointerEvents: 'none', background: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

                <div style={{ position: 'relative', zIndex: 2, padding: '0 clamp(24px, 8vw, 120px)', width: '100%' }}>
                    <Revealer delay={200}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 30 }}>
                            <div style={{ width: 40, height: 1, background: sageLeaf }} />
                            <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.94rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: sageLeaf }}>Live in Balance</span>
                        </div>
                    </Revealer>

                    <Revealer delay={400} y={50}>
                        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3.5rem, 10vw, 8.5rem)', fontWeight: 300, lineHeight: 0.9, marginBottom: 40, letterSpacing: '-0.04em' }}>
                            Pure <br />
                            <span style={{ fontStyle: 'italic', fontWeight: 200, color: sageLeaf, marginLeft: '0.5em' }}>Sanctuary.</span>
                        </h1>
                    </Revealer>

                    <Revealer delay={600}>
                        <div style={{ maxWidth: 450, borderLeft: `1px solid ${sandSilk}`, paddingLeft: 30 }}>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', lineHeight: 1.7, color: inkSecondary, fontWeight: 300 }}>
                                A curated experience where time dissolves and the nervous system recalibrates. Beyond the surface, into the soul.
                            </p>
                        </div>
                    </Revealer>
                </div>

                {/* Vertical Scroll Indicator */}
                <div style={{ position: 'absolute', bottom: 40, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                    <span style={{ fontFamily: 'var(--font-accent)', fontSize: '1.14rem', letterSpacing: '0.2em', textTransform: 'uppercase', writingMode: 'vertical-rl', opacity: 0.4 }}>Scroll to Explore</span>
                    <div style={{ width: 1, height: 60, background: inkPrimary, opacity: 0.2, position: 'relative', overflow: 'hidden' }}>
                        <div className="line-flow" />
                    </div>
                </div>
            </section>

            {/* 2. THE PHILOSOPHY OF STILLNESS (BREATHING SECTION) */}
            <section style={{ padding: '160px 0', position: 'relative' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'center' }}>
                    <Revealer>
                        <div style={{ position: 'relative', paddingBottom: '120%' }}>
                            <Image
                                src="/assets/spa-and-wellness/Yoga.webp"
                                alt="Philosophy"
                                fill
                                style={{ objectFit: 'cover', borderRadius: '4px' }}
                            />
                            {/* Floating Card */}
                            <div style={{ position: 'absolute', bottom: -40, right: -40, background: sandSilk, padding: '40px', width: '70%', borderRadius: '2px', boxShadow: '0 30px 60px rgba(0,0,0,0.05)' }}>
                                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 300, marginBottom: 15 }}>The Silent Heart</h3>
                                <p style={{ fontSize: '1rem', lineHeight: 1.6, color: inkSecondary }}>"The quieter you become, the more you can hear." We invite you to listen to the whispers of your own body.</p>
                            </div>
                        </div>
                    </Revealer>

                    <div>
                        <Revealer delay={200}>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 300, marginBottom: 40, lineHeight: 1.1 }}>Beyond Ordinary <br />Healing.</h2>
                        </Revealer>
                        <Revealer delay={400}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                                <PhilosophyPoint
                                    num="01"
                                    title="Ancestral Roots"
                                    text="Drawing from 5,000 years of Hela Wedakama—the traditional Sri Lankan healing art."
                                />
                                <PhilosophyPoint
                                    num="02"
                                    title="Living Pharmacy"
                                    text="Freshly harvested botanicals, crushed and macerated by hand for every unique treatment."
                                />
                                <PhilosophyPoint
                                    num="03"
                                    title="Intentional Flow"
                                    text="A sequence designed to guide the mind from active thought into a meditative delta state."
                                />
                            </div>
                        </Revealer>
                    </div>
                </div>
            </section>

            {/* 3. INTERACTIVE RITUALS (EXPANDING CARDS) */}
            <section style={{ padding: '120px 0', background: sandSilk }}>
                <div style={{ padding: '0 clamp(24px, 8vw, 120px)', marginBottom: 80 }}>
                    <Revealer>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, margin: 0 }}>Healing Rituals</h2>
                            <p style={{ maxWidth: 300, fontSize: '1rem', opacity: 0.6 }}>Chosen by the season, tailored to your constitution.</p>
                        </div>
                    </Revealer>
                </div>

                <div style={{ display: 'flex', gap: 10, padding: '0 10px', height: '600px', flexWrap: 'nowrap' }} className="ritual-container">
                    <ExpandableRitual
                        title="Ayurvedic Rebirth"
                        img="/assets/spa-and-wellness/Ayurveda-Healing-Wellness.webp"
                        time="120 min"
                        tag="Signature"
                    />
                    <ExpandableRitual
                        title="Celestial Couple"
                        img="/assets/spa-and-wellness/Luxury-Couple-Spa-Experiences.webp"
                        time="180 min"
                        tag="Romantic"
                    />
                    <ExpandableRitual
                        title="Forest Immersion"
                        img="/assets/spa-and-wellness/wellness.webp"
                        time="90 min"
                        tag="Nature"
                    />
                </div>
            </section>

            {/* 4. THE LIVING WATER (NEW IMMERSIVE SECTION) */}
            <section style={{ padding: '160px 0', textAlign: 'center', background: '#fff' }}>
                <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
                    <Revealer>
                        <div className="water-emblem" style={{ marginBottom: 40 }}>
                            <svg width="60" height="60" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="48" fill="none" stroke={sageLeaf} strokeWidth="0.5" strokeDasharray="4 4" />
                                <path d="M50 30 Q60 50 50 70 Q40 50 50 30" fill={sageLeaf} opacity="0.4" />
                            </svg>
                        </div>
                    </Revealer>
                    <Revealer delay={200}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, marginBottom: 30 }}>Hydro-Therapeutic Flow</h2>
                    </Revealer>
                    <Revealer delay={400}>
                        <p style={{ fontSize: '1.2rem', color: inkSecondary, lineHeight: 1.8, marginBottom: 60, fontWeight: 300 }}>
                            Experience the transition from heat to ice. Our temperature-controlled spring water pools stimulate lymphatic drainage and boost cellular regeneration.
                        </p>
                    </Revealer>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 60, flexWrap: 'wrap' }}>
                        <StatItem val="32°C" label="Mineral Soak" />
                        <StatItem val="12°C" label="Crystal Plunge" />
                        <StatItem val="100%" label="Purity" />
                    </div>
                </div>
            </section>

            {/* ═══════ 4.5 SIGNATURE RITUALS (DEEP-LINKED FROM HOME) ═══════ */}
            <section style={{ background: bgSoft, padding: 'clamp(80px, 12vw, 160px) 0' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 6vw, 80px)' }}>
                    {/* Section header */}
                    <Revealer>
                        <div style={{ textAlign: 'center', marginBottom: 'clamp(60px, 10vw, 100px)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
                                <div style={{ width: 40, height: 1, background: sageLeaf, opacity: 0.4 }} />
                                <span style={{ fontFamily: 'var(--font-accent)', fontSize: '1.14rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: sageLeaf }}>Signature Experiences</span>
                                <div style={{ width: 40, height: 1, background: sageLeaf, opacity: 0.4 }} />
                            </div>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, margin: '0 0 20px', lineHeight: 1.1 }}>
                                Rituals for <em style={{ fontStyle: 'italic', color: sageLeaf }}>Deep Restoration</em>
                            </h2>
                            <p style={{ fontSize: '1rem', color: inkSecondary, lineHeight: 1.8, maxWidth: 520, margin: '0 auto', fontWeight: 300 }}>
                                Four pathways to inner stillness. Each ritual is crafted by our master therapists and tailored to your body's unique needs.
                            </p>
                        </div>
                    </Revealer>

                    {/* Ritual panels */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(60px, 10vw, 120px)' }}>

                        {/* 1. Ayurveda Healing */}
                        <div id="rituals-ayurveda" style={{ scrollMarginTop: 80 }}>
                            <Revealer>
                                <div className="ritual-detail-panel" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
                                    gap: 'clamp(30px, 5vw, 60px)',
                                    alignItems: 'center',
                                }}>
                                    {/* Image */}
                                    <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3' }}>
                                        <Image
                                            src="/assets/spa-and-wellness/Ayurveda-Healing-Wellness.webp"
                                            alt="Ayurveda Healing"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 50%)' }} />
                                        <div style={{
                                            position: 'absolute', top: 20, left: 20,
                                            background: 'rgba(255,255,255,0.9)',
                                            backdropFilter: 'blur(8px)',
                                            borderRadius: 50,
                                            padding: '6px 16px',
                                            fontFamily: 'var(--font-accent)',
                                            fontSize: '0.85rem', fontWeight: 700,
                                            letterSpacing: '0.15em', textTransform: 'uppercase',
                                            color: '#5B6F5D',
                                        }}>90 min</div>
                                    </div>
                                    {/* Content */}
                                    <div>
                                        <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.85rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#7B9E87', marginBottom: 12 }}>
                                            Traditional Ceylon Medicine
                                        </div>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, margin: '0 0 18px', lineHeight: 1.15 }}>
                                            Ayurveda Healing
                                        </h3>
                                        <p style={{ fontSize: '1rem', color: inkSecondary, lineHeight: 1.8, marginBottom: 28, fontWeight: 300 }}>
                                            Ancient herbal therapies aligned with your dosha — detox, restore and rebalance body and mind. Our vaidyas prepare each remedy from freshly harvested Sri Lankan botanicals.
                                        </p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30 }}>
                                            {['Personalised dosha assessment', 'Hand-ground herbal poultice therapy', 'Shirodhara oil flow meditation', 'Detox herbal steam infusion'].map((b, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7B9E87', opacity: 0.5, flexShrink: 0 }} />
                                                    <span style={{ fontSize: '1rem', color: inkSecondary, fontWeight: 300 }}>{b}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <a href="#enquiry" style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 10,
                                            background: 'transparent',
                                            border: `1px solid ${sageLeaf}`,
                                            color: sageLeaf,
                                            textDecoration: 'none',
                                            fontFamily: 'var(--font-accent)',
                                            fontSize: '0.9rem', fontWeight: 600,
                                            letterSpacing: '0.2em', textTransform: 'uppercase',
                                            padding: '14px 28px', borderRadius: 50,
                                            transition: 'all 0.35s ease',
                                        }}>
                                            Reserve This Ritual
                                        </a>
                                    </div>
                                </div>
                            </Revealer>
                        </div>

                        {/* 2. Couples Journey — reversed layout */}
                        <div id="rituals-couples" style={{ scrollMarginTop: 80 }}>
                            <Revealer>
                                <div className="ritual-detail-panel" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
                                    gap: 'clamp(30px, 5vw, 60px)',
                                    alignItems: 'center',
                                }}>
                                    {/* Content first (visually left on desktop) */}
                                    <div style={{ order: 1 }} className="ritual-text-col">
                                        <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.85rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 12 }}>
                                            Shared Bliss for Two
                                        </div>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, margin: '0 0 18px', lineHeight: 1.15 }}>
                                            Couples Journey
                                        </h3>
                                        <p style={{ fontSize: '1rem', color: inkSecondary, lineHeight: 1.8, marginBottom: 28, fontWeight: 300 }}>
                                            Synchronised rituals, rose petal baths and sunset massage in a private ocean-view villa. Reconnect with your partner in a space designed for shared tranquility.
                                        </p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30 }}>
                                            {['Private couples treatment suite', 'Synchronised four-hand massage', 'Rose petal bath ritual', 'Sunset champagne & fruit platter'].map((b, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A96E', opacity: 0.5, flexShrink: 0 }} />
                                                    <span style={{ fontSize: '1rem', color: inkSecondary, fontWeight: 300 }}>{b}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <a href="#enquiry" style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 10,
                                            background: 'transparent',
                                            border: '1px solid #C9A96E',
                                            color: '#C9A96E',
                                            textDecoration: 'none',
                                            fontFamily: 'var(--font-accent)',
                                            fontSize: '0.9rem', fontWeight: 600,
                                            letterSpacing: '0.2em', textTransform: 'uppercase',
                                            padding: '14px 28px', borderRadius: 50,
                                            transition: 'all 0.35s ease',
                                        }}>
                                            Reserve This Ritual
                                        </a>
                                    </div>
                                    {/* Image second (visually right on desktop) */}
                                    <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3', order: 2 }} className="ritual-img-col">
                                        <Image
                                            src="/assets/spa-and-wellness/Luxury-Couple-Spa-Experiences.webp"
                                            alt="Couples Journey"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 50%)' }} />
                                        <div style={{
                                            position: 'absolute', top: 20, right: 20,
                                            background: 'rgba(255,255,255,0.9)',
                                            backdropFilter: 'blur(8px)',
                                            borderRadius: 50,
                                            padding: '6px 16px',
                                            fontFamily: 'var(--font-accent)',
                                            fontSize: '0.85rem', fontWeight: 700,
                                            letterSpacing: '0.15em', textTransform: 'uppercase',
                                            color: '#C9A96E',
                                        }}>120 min</div>
                                    </div>
                                </div>
                            </Revealer>
                        </div>

                        {/* 3. Sunrise Yoga */}
                        <div id="rituals-yoga" style={{ scrollMarginTop: 80 }}>
                            <Revealer>
                                <div className="ritual-detail-panel" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
                                    gap: 'clamp(30px, 5vw, 60px)',
                                    alignItems: 'center',
                                }}>
                                    {/* Image */}
                                    <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3' }}>
                                        <Image
                                            src="/assets/spa-and-wellness/Yoga.webp"
                                            alt="Sunrise Yoga"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 50%)' }} />
                                        <div style={{
                                            position: 'absolute', top: 20, left: 20,
                                            background: 'rgba(255,255,255,0.9)',
                                            backdropFilter: 'blur(8px)',
                                            borderRadius: 50,
                                            padding: '6px 16px',
                                            fontFamily: 'var(--font-accent)',
                                            fontSize: '0.85rem', fontWeight: 700,
                                            letterSpacing: '0.15em', textTransform: 'uppercase',
                                            color: '#A89B7A',
                                        }}>75 min</div>
                                    </div>
                                    {/* Content */}
                                    <div>
                                        <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.85rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#A89B7A', marginBottom: 12 }}>
                                            Mountaintop Mindfulness
                                        </div>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, margin: '0 0 18px', lineHeight: 1.15 }}>
                                            Sunrise Yoga
                                        </h3>
                                        <p style={{ fontSize: '1rem', color: inkSecondary, lineHeight: 1.8, marginBottom: 28, fontWeight: 300 }}>
                                            Greet the dawn over mist-draped hills. Expert-led asanas, pranayama and guided meditation at an altitude where breathing itself becomes therapy.
                                        </p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30 }}>
                                            {['Mountain-peak open-air platform', 'Vinyasa, Hatha & Yin options', 'Guided pranayama & breath work', 'Post-session herbal wellness tea'].map((b, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#A89B7A', opacity: 0.5, flexShrink: 0 }} />
                                                    <span style={{ fontSize: '1rem', color: inkSecondary, fontWeight: 300 }}>{b}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <a href="#enquiry" style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 10,
                                            background: 'transparent',
                                            border: '1px solid #A89B7A',
                                            color: '#A89B7A',
                                            textDecoration: 'none',
                                            fontFamily: 'var(--font-accent)',
                                            fontSize: '0.9rem', fontWeight: 600,
                                            letterSpacing: '0.2em', textTransform: 'uppercase',
                                            padding: '14px 28px', borderRadius: 50,
                                            transition: 'all 0.35s ease',
                                        }}>
                                            Reserve This Ritual
                                        </a>
                                    </div>
                                </div>
                            </Revealer>
                        </div>

                        {/* 4. Total Wellness — reversed layout */}
                        <div id="rituals-wellness" style={{ scrollMarginTop: 80 }}>
                            <Revealer>
                                <div className="ritual-detail-panel" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
                                    gap: 'clamp(30px, 5vw, 60px)',
                                    alignItems: 'center',
                                }}>
                                    {/* Content first */}
                                    <div style={{ order: 1 }} className="ritual-text-col">
                                        <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.85rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#B8A0C8', marginBottom: 12 }}>
                                            Holistic Renewal Retreat
                                        </div>
                                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, margin: '0 0 18px', lineHeight: 1.15 }}>
                                            Total Wellness
                                        </h3>
                                        <p style={{ fontSize: '1rem', color: inkSecondary, lineHeight: 1.8, marginBottom: 28, fontWeight: 300 }}>
                                            A curated 3-day immersion: nutrition coaching, chakra balancing, sound healing and nature therapy. Complete restoration of body, mind and spirit.
                                        </p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 30 }}>
                                            {['3-day structured wellness programme', 'Personalised nutrition & detox plan', 'Chakra balancing & sound healing bowl', 'Nature immersion forest therapy walks'].map((b, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#B8A0C8', opacity: 0.5, flexShrink: 0 }} />
                                                    <span style={{ fontSize: '1rem', color: inkSecondary, fontWeight: 300 }}>{b}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <a href="#enquiry" style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 10,
                                            background: 'transparent',
                                            border: '1px solid #B8A0C8',
                                            color: '#B8A0C8',
                                            textDecoration: 'none',
                                            fontFamily: 'var(--font-accent)',
                                            fontSize: '0.9rem', fontWeight: 600,
                                            letterSpacing: '0.2em', textTransform: 'uppercase',
                                            padding: '14px 28px', borderRadius: 50,
                                            transition: 'all 0.35s ease',
                                        }}>
                                            Reserve This Ritual
                                        </a>
                                    </div>
                                    {/* Image second */}
                                    <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3', order: 2 }} className="ritual-img-col">
                                        <Image
                                            src="/assets/spa-and-wellness/wellness.webp"
                                            alt="Total Wellness"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 50%)' }} />
                                        <div style={{
                                            position: 'absolute', top: 20, right: 20,
                                            background: 'rgba(255,255,255,0.9)',
                                            backdropFilter: 'blur(8px)',
                                            borderRadius: 50,
                                            padding: '6px 16px',
                                            fontFamily: 'var(--font-accent)',
                                            fontSize: '0.85rem', fontWeight: 700,
                                            letterSpacing: '0.15em', textTransform: 'uppercase',
                                            color: '#B8A0C8',
                                        }}>3 days</div>
                                    </div>
                                </div>
                            </Revealer>
                        </div>
                    </div>
                </div>

                <style>{`
                    @media (max-width: 768px) {
                        .ritual-text-col { order: 2 !important; }
                        .ritual-img-col { order: 1 !important; }
                    }
                `}</style>
            </section>

            {/* 5. RESERVATION CONCIERGE */}
            <section id="enquiry" style={{ padding: '160px 0', background: sandSilk, position: 'relative' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 100 }}>
                    <div>
                        <Revealer>
                            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', fontWeight: 300, marginBottom: 30 }}>Begin the <br />Journey.</h2>
                            <p style={{ lineHeight: 1.8, color: inkSecondary, marginBottom: 40 }}>Our wellness concierge will contact you within 24 hours to personalize your itinerary.</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <ContactInfo icon="☏" text="+94 11 234 5678" />
                                <ContactInfo icon="✉" text="sanctuary@redelephant.com" />
                            </div>
                        </Revealer>
                    </div>

                    <Revealer delay={300}>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (!form.name.trim() || !form.email.trim()) {
                                setErrorMsg('Please fill in all required fields (Name and Email).');
                                return;
                            }
                            setErrorMsg('');
                            alert('Thank you! Your wellness journey inquiry has been received. Our concierge will be in touch shortly.');
                            setForm({ name: '', email: '', intention: 'Detox & Purify' });
                        }} style={{ background: '#fff', padding: '60px', borderRadius: '4px', boxShadow: '0 40px 100px rgba(0,0,0,0.03)' }}>
                            <div className="input-group">
                                <label>Your Name *</label>
                                <input type="text" placeholder="Gautama B." style={inputStyles} value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                            </div>
                            <div className="input-group">
                                <label>Email Address *</label>
                                <input type="email" placeholder="hello@calm.com" style={inputStyles} value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                            </div>
                            <div className="input-group">
                                <label>Intention</label>
                                <select style={inputStyles} value={form.intention} onChange={e => setForm({...form, intention: e.target.value})}>
                                    <option>Detox & Purify</option>
                                    <option>Stress Release</option>
                                    <option>Sleep Restoration</option>
                                    <option>Ayurvedic Immersion</option>
                                </select>
                            </div>
                            
                            {errorMsg && (
                                <div style={{ color: '#C41E3A', fontSize: '1.12rem', marginBottom: '20px', fontFamily: 'var(--font-body)' }}>
                                    {errorMsg}
                                </div>
                            )}

                            <button className="submit-btn" style={{
                                width: '100%',
                                background: inkPrimary,
                                color: '#fff',
                                border: 'none',
                                padding: '20px',
                                fontFamily: 'var(--font-accent)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                fontSize: '1.14rem',
                                cursor: 'pointer',
                                marginTop: errorMsg ? '0px' : '20px'
                            }}>
                                Send Enquiry
                            </button>
                        </form>
                    </Revealer>
                </div>
            </section>

            <style>{`
                .line-flow {
                    width: 100%;
                    height: 100%;
                    background: ${inkPrimary};
                    position: absolute;
                    top: -100%;
                    animation: lineMove 3s infinite;
                }
                @keyframes lineMove {
                    0% { top: -100%; }
                    100% { top: 100%; }
                }
                .ritual-container > div {
                    flex: 1;
                    transition: flex 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    border-radius: 4px;
                }
                .ritual-container > div:hover {
                    flex: 3;
                }
                .submit-btn:hover {
                    background: ${sageLeaf};
                    transition: 0.4s;
                }
                .input-group {
                    margin-bottom: 30px;
                }
                .input-group label {
                    font-family: var(--font-accent);
                    font-size: 0.67rem;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    color: ${sageLeaf};
                    display: block;
                    margin-bottom: 10px;
                }
                @media (max-width: 768px) {
                    .ritual-container {
                        flex-direction: column;
                        height: auto;
                    }
                    .ritual-container > div {
                        height: 300px;
                        flex: none !important;
                    }
                }
            `}</style>
        </main>
    );
}

/* HELPER COMPONENTS */

const inputStyles = {
    width: '100%',
    padding: '15px 0',
    border: 'none',
    borderBottom: `1px solid #eee`,
    outline: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem'
};

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
                transition: `all 1s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`
            }}
        >
            {children}
        </div>
    );
}

function PhilosophyPoint({ num, title, text }: { num: string, title: string, text: string }) {
    return (
        <div style={{ display: 'flex', gap: 30 }}>
            <span style={{ fontFamily: 'var(--font-accent)', color: sageLeaf, fontSize: '1rem', fontWeight: 600 }}>{num}</span>
            <div>
                <h4 style={{ margin: '0 0 10px', fontSize: '1.3rem', fontWeight: 400 }}>{title}</h4>
                <p style={{ margin: 0, color: inkSecondary, fontSize: '1rem', lineHeight: 1.5 }}>{text}</p>
            </div>
        </div>
    );
}

function ExpandableRitual({ title, img, time, tag }: { title: string, img: string, time: string, tag: string }) {
    return (
        <div style={{ position: 'relative' }}>
            <Image src={img} alt={title} fill style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 30, left: 30, color: '#fff' }}>
                <span style={{ fontSize: '1.14rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 10, display: 'block', color: 'rgba(255,255,255,0.7)' }}>{tag} — {time}</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 300, whiteSpace: 'nowrap' }}>{title}</h3>
            </div>
        </div>
    );
}

function StatItem({ val, label }: { val: string, label: string }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 300, color: sageLeaf, lineHeight: 1, marginBottom: 10 }}>{val}</div>
            <div style={{ fontFamily: 'var(--font-accent)', fontSize: '1.14rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5 }}>{label}</div>
        </div>
    );
}

function ContactInfo({ icon, text }: { icon: string, text: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 15, fontSize: '1.2rem', color: inkSecondary }}>
            <span style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: '50%', fontSize: '1rem' }}>{icon}</span>
            <span>{text}</span>
        </div>
    );
}
