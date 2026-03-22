'use client';

import Image from 'next/image';
import Link from 'next/link';

const footerLinks = {
    'Destinations': [
        { label: 'Hill Country', href: '/destinations/hillcountry' },
        { label: 'Cultural Triangle', href: '/destinations/cultural' },
        { label: 'Sun & Sand', href: '/destinations/beaches' },
        { label: 'Wildlife Safari', href: '/destinations/wildlife' },
        { label: 'Colombo City', href: '/destinations/colombo' },
        { label: 'Galle Fort', href: '/destinations/galle' },
    ],
    'Tour Types': [
        { label: 'Luxury Tours', href: '/packages' },
        { label: 'Honeymoon Packages', href: '/packages' },
        { label: 'Adventure Tours', href: '/packages' },
        { label: 'Group Travel', href: '/packages' },
        { label: 'Family Packages', href: '/packages' },
        { label: 'Wellness & Spa', href: '/wellness' },
    ],
    'Company': [
        { label: 'About Us', href: '/about' },
        { label: 'Our Team', href: '/about' },
        { label: 'Sustainability', href: '/about' },
        { label: 'Awards', href: '/about' },
        { label: 'Blog & Insights', href: '/#blog' },
        { label: 'Careers', href: '#' },
    ],
    'Support': [
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Booking Policy', href: '/booking-policy' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms & Conditions', href: '/terms-and-conditions' },
        { label: 'Sitemap', href: '/sitemap' },
    ],
};

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--color-dark)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
            {/* MAIN FOOTER */}
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 32px 40px' }}>
                <div className="footer-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                    gap: '48px',
                    marginBottom: '60px',
                }}>
                    {/* BRAND COLUMN */}
                    <div>
                        {/* Logo */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                <Image
                                    src="/assets/headder-logo.png"
                                    alt="Red Elephant Travels"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <div>
                                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: 'white' }}>
                                    Red Elephant
                                </div>
                                <div style={{ fontFamily: 'var(--font-accent)', fontSize: '0.85rem', letterSpacing: '0.25em', color: 'var(--color-gold)', textTransform: 'uppercase', fontWeight: 600 }}>
                                    Travels & Tours
                                </div>
                            </div>
                        </div>

                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1rem',
                            color: 'rgba(255,255,255,0.5)',
                            lineHeight: 1.8,
                            marginBottom: '24px',
                            maxWidth: '320px',
                        }}>
                            Sri Lanka's premier travel specialist, crafting extraordinary journeys since 2009.
                            Award-winning tours, luxury experiences, and memories that last a lifetime.
                        </p>

                        {/* CONTACT INFO */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                            {[
                                { icon: '📍', text: 'No. 123, Galle Road, Colombo 03, Sri Lanka' },
                                { icon: '📞', text: '+94 77 362 4847' },
                                { icon: '✉️', text: 'info@redelephanttravels.com' },
                            ].map((item) => (
                                <div key={item.icon} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                    <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
                                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.94rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* SOCIAL LINKS */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {[
                                { label: 'Facebook', icon: 'f', href: '#' },
                                { label: 'Instagram', icon: '◈', href: '#' },
                                { label: 'TripAdvisor', icon: '✈', href: '#' },
                                { label: 'WhatsApp', icon: '💬', href: 'https://wa.me/94773624847' },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target={s.href.startsWith('http') ? '_blank' : undefined}
                                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    aria-label={s.label}
                                    style={{
                                        width: '38px',
                                        height: '38px',
                                        borderRadius: '10px',
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'rgba(255,255,255,0.6)',
                                        fontSize: '1rem',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(196,30,58,0.2)';
                                        e.currentTarget.style.borderColor = 'rgba(196,30,58,0.4)';
                                        e.currentTarget.style.color = 'var(--color-primary-light)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                        e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                                        e.currentTarget.style.transform = 'none';
                                    }}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* LINK COLUMNS */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 style={{
                                fontFamily: 'var(--font-accent)',
                                fontSize: '1.14rem',
                                fontWeight: 700,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'var(--color-primary-light)',
                                marginBottom: '20px',
                            }}>
                                {title}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            style={{
                                                fontFamily: 'var(--font-body)',
                                                fontSize: '1.14rem',
                                                color: 'rgba(255,255,255,0.45)',
                                                textDecoration: 'none',
                                                transition: 'color 0.2s ease',
                                                display: 'block',
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* NEWSLETTER */}
                <div className="newsletter-wrapper" style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '20px',
                    padding: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '32px',
                    flexWrap: 'wrap',
                    marginBottom: '48px',
                }}>
                    <div className="newsletter-text" style={{ maxWidth: '400px' }}>
                        <h4 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            color: 'white',
                            marginBottom: '8px',
                        }}>
                            Get Exclusive Travel Deals
                        </h4>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1.14rem',
                            color: 'rgba(255,255,255,0.5)',
                            lineHeight: 1.6,
                        }}>
                            Subscribe for early-access offers, hidden gem destinations, and Sri Lanka travel inspiration.
                        </p>
                    </div>
                    <div className="newsletter-form" style={{ display: 'flex', gap: '8px', flex: '1 1 300px', maxWidth: '480px' }}>
                        <input
                            type="email"
                            className="newsletter-input"
                            placeholder="Your email address"
                            style={{
                                flex: 1,
                                width: '100%',
                                background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: '12px',
                                padding: '14px 20px',
                                color: 'white',
                                fontFamily: 'var(--font-body)',
                                fontSize: '1rem',
                                outline: 'none',
                                boxSizing: 'border-box',
                            }}
                        />
                        <button className="btn-primary" style={{ flexShrink: 0, padding: '14px 24px', fontSize: '0.9rem' }}>
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="footer-bottom" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '24px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    flexWrap: 'wrap',
                    gap: '16px',
                }}>
                    <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.3)',
                    }}>
                        © {new Date().getFullYear()} Red Elephant Travels & Tours. All rights reserved. Designed with ❤️ in Sri Lanka.
                    </p>
                    <div className="footer-bottom-links" style={{ display: 'flex', gap: '24px' }}>
                        {[
                            { label: 'Privacy Policy', href: '/privacy-policy' },
                            { label: 'Terms & Conditions', href: '/terms-and-conditions' },
                            { label: 'Sitemap', href: '/sitemap' }
                        ].map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '1.14rem',
                                    color: 'rgba(255,255,255,0.3)',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        input[type="email"]::placeholder { color: rgba(255,255,255,0.3); }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .newsletter-wrapper { padding: 24px !important; flex-direction: column !important; align-items: stretch !important; }
          .newsletter-text { max-width: 100% !important; }
          .newsletter-form { flex-direction: column !important; max-width: 100% !important; flex-basis: auto !important; }
          .newsletter-form .newsletter-input { flex: none !important; }
          .newsletter-form button { width: 100% !important; }
          .footer-bottom { flex-direction: column !important; gap: 20px !important; align-items: flex-start !important; }
          .footer-bottom-links { flex-wrap: wrap !important; gap: 16px !important; }
        }
      `}</style>
        </footer>
    );
}
