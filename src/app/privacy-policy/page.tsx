'use client';

import React from 'react';

const C = {
    dark: '#1A1714',
    cream: '#F8F5F0',
    gold: '#C9A96E',
    crimson: '#C41E3A',
    muted: '#8A8074',
    white: '#FFFFFF',
    border: 'rgba(0,0,0,0.06)'
};

const SECTIONS = [
    {
        title: "1. Information We Collect",
        p: "We collect information that you provide to us directly, such as your name, email address, phone number, and mailing address when you make a booking or contact us. We may also collect payment information, travel preferences, and dietary requirements to ensure your journey is tailored to your needs."
    },
    {
        title: "2. How We Use Your Information",
        p: "Your information is used to process bookings, provide travel services, communicate with you about your trip, and for marketing purposes (with your consent). We may also use your information to improve our website and services, and to comply with legal obligations."
    },
    {
        title: "3. Information Sharing",
        p: "We do not sell or rent your personal information to third parties. We may share your information with our service providers (e.g., hotels, transportation companies, guides) for the purpose of fulfilling your travel arrangements. We may also share your information as required by law or to protect our rights."
    },
    {
        title: "4. Data Security",
        p: "We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, loss, or misuse. This includes using encryption, secure servers, and regular security audits."
    },
    {
        title: "5. Your Rights",
        p: "You have the right to access, correct, or delete your personal information. You also have the right to object to or restrict certain types of data processing. To exercise these rights, please contact our data protection officer at hello@redelephant.com."
    }
];

export default function PrivacyPolicyPage() {
    return (
        <main style={{ background: C.cream, minHeight: '100vh', paddingBottom: 120 }}>
            <style>{`
                .policy-card {
                    background: ${C.white};
                    padding: 60px;
                    border-radius: 32px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.03);
                    border: 1px solid ${C.border};
                    margin-top: -60px;
                    position: relative;
                    z-index: 10;
                }
                .policy-title {
                    font-family: var(--font-heading);
                    font-size: 1.6rem;
                    color: ${C.dark};
                    margin-bottom: 24px;
                    font-weight: 800;
                    letter-spacing: -0.01em;
                }
                .policy-text {
                    font-family: var(--font-body);
                    font-size: 1.15rem;
                    line-height: 1.9;
                    color: ${C.muted};
                    margin-bottom: 48px;
                    font-weight: 300;
                }
                @media (max-width: 640px) {
                    .policy-card { padding: 40px 24px; margin-top: -40px; }
                    .policy-title { font-size: 1.4rem; }
                    .policy-text { font-size: 1rem; }
                }
            `}</style>

            {/* HEADER */}
            <section style={{ 
                padding: '160px 24px 120px', textAlign: 'center', background: C.dark, color: C.white,
                overflow: 'hidden', position: 'relative'
            }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'url(/assets/wellness-hero.webp)',
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    opacity: 0.25, filter: 'grayscale(0.5)'
                }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <div style={{ width: 40, height: 1, background: C.gold }} />
                        <span style={{ 
                            fontFamily: 'var(--font-accent)', fontSize: '0.85rem', color: C.gold, 
                            letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700 
                        }}>Your Data Matters</span>
                        <div style={{ width: 40, height: 1, background: C.gold }} />
                    </div>
                    <h1 style={{ 
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
                        margin: 0, fontWeight: 900, letterSpacing: '-0.02em' 
                    }}>Privacy Policy</h1>
                </div>
            </section>

            {/* CONTENT */}
            <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>
                <div className="policy-card">
                    {SECTIONS.map((sec, i) => (
                        <div key={i}>
                            <h2 className="policy-title">{sec.title}</h2>
                            <p className="policy-text">{sec.p}</p>
                            {i < SECTIONS.length - 1 && <div style={{ height: 1, background: C.border, marginBottom: 48 }} />}
                        </div>
                    ))}
                    <div style={{ marginTop: 40, borderTop: `1px solid ${C.border}`, padding: '40px 0 0', textAlign: 'center' }}>
                         <p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '1.2rem' }}>Last updated: March 20, 2026</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
