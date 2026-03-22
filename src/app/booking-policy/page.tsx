'use client';

import React from 'react';

const C = {
    dark: '#0A0705',
    cream: '#F8F5F0',
    gold: '#C9A96E',
    crimson: '#C41E3A',
    muted: '#8A8074',
    white: '#FFFFFF',
    border: 'rgba(0,0,0,0.06)'
};

const SECTIONS = [
    {
        title: "1. Reservation and Payment",
        p: "To confirm your reservation, a non-refundable deposit of 20% of the total tour cost is required at the time of booking. The remaining balance must be paid at least 45 days prior to the tour departure date. For bookings made within 45 days of departure, full payment is required at the time of reservation."
    },
    {
        title: "2. Cancellation and Refunds",
        p: "All cancellations must be submitted in writing. Our cancellation fees are as follows: More than 45 days before departure: Loss of deposit. 30-45 days before departure: 50% of the total tour cost. Less than 30 days before departure: 100% of the total tour cost."
    },
    {
        title: "3. Health and Fitness Requirements",
        p: "Travelers are responsible for ensuring that they are in good health and physically capable of performing the activities included in their chosen itinerary. If you have any medical conditions or dietary requirements, please inform us at the time of booking."
    },
    {
        title: "4. Passport and Visas",
        p: "Traveling to Sri Lanka requires a valid passport and an Electronic Travel Authorization (ETA). It is the traveler's responsibility to ensure that their documents are in order for entry into the country."
    },
    {
        title: "5. Travel Insurance",
        p: "We highly recommend that all travelers purchase comprehensive travel insurance covering trip cancellation, medical emergencies, and local evacuation. Red Elephant Travels & Tours is not responsible for any costs incurred due to unforeseen circumstances beyond our control."
    }
];

export default function BookingPolicyPage() {
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
                    backgroundImage: 'url(/assets/weddings-hero.webp)',
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    opacity: 0.25, filter: 'grayscale(0.5)'
                }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <div style={{ width: 40, height: 1, background: C.gold }} />
                        <span style={{ 
                            fontFamily: 'var(--font-accent)', fontSize: '0.85rem', color: C.gold, 
                            letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700 
                        }}>Guidelines & Terms</span>
                        <div style={{ width: 40, height: 1, background: C.gold }} />
                    </div>
                    <h1 style={{ 
                        fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
                        margin: 0, fontWeight: 900, letterSpacing: '-0.02em' 
                    }}>Booking Policy</h1>
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
                    
                    <div style={{ 
                        background: `${C.gold}05`, padding: '40px', borderRadius: 20, 
                        border: `1.5px solid ${C.gold}22`, textAlign: 'center' 
                    }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: 16 }}>Need more clarification?</h3>
                        <p style={{ color: C.muted, fontFamily: 'var(--font-body)', marginBottom: 24 }}>Our consultants are here to help you through the booking process.</p>
                        <a href="/contact" style={{ 
                            background: C.gold, color: C.dark, padding: '14px 32px', borderRadius: 50, 
                            textDecoration: 'none', fontWeight: 700, fontFamily: 'var(--font-accent)', 
                            fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em'
                        }}>Contact Support</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
