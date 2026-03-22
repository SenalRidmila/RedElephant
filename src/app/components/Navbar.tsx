'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

/* ─── Data ─── */
const megaCols = [
    {
        title: 'Cultural Triangle',
        links: [
            { label: 'All Cultural Sites', href: '/destinations/cultural' },
            { label: 'Anuradhapura', href: '/destinations/anuradhapura' },
            { label: 'Polonnaruwa', href: '/destinations/polonnaruwa' },
            { label: 'Dambulla', href: '/destinations/dambulla' },
            { label: 'Sigiriya', href: '/destinations/sigiriya' },
            { label: 'Kandy', href: '/destinations/kandy' }
        ],
        subTitle: 'Hill Country',
        subLinks: [
            { label: 'All Hill Country', href: '/destinations/hillcountry' },
            { label: 'Nuwara Eliya', href: '/destinations/nuwaraeliya' },
            { label: 'Ella', href: '/destinations/ella' },
            { label: 'Hatton', href: '/destinations/hatton' },
            { label: 'Knuckles', href: '/destinations/knuckles' }
        ],
    },
    {
        title: 'Sun and Sand',
        links: [
            { label: 'All Beaches', href: '/destinations/beaches' },
            { label: 'Unawatuna', href: '/destinations/unawatuna' },
            { label: 'Galle & Fort', href: '/destinations/galle' },
            { label: 'Negombo', href: '/destinations/negombo' },
            { label: 'Hikkaduwa', href: '/destinations/hikkaduwa' },
            { label: 'Mirissa', href: '/destinations/mirissa' },
            { label: 'Weligama', href: '/destinations/weligama' }
        ],
    },
    {
        title: 'Wildlife',
        links: [
            { label: 'All Parks', href: '/destinations/wildlife' },
            { label: 'Yala National Park', href: '/destinations/yala' },
            { label: 'Udawalawe', href: '/destinations/udawalawe' },
            { label: 'Minneriya', href: '/destinations/minneriya' },
            { label: 'Wilpattu', href: '/destinations/wilpattu' },
            { label: 'Gal Oya', href: '/destinations/galoya' }
        ],
    },
    {
        title: 'Culture & Heritage',
        links: [
            { label: 'All Heritage', href: '/destinations/heritage' },
            { label: 'Colombo', href: '/destinations/colombo' },
            { label: 'Galle Fort', href: '/destinations/galle' },
            { label: 'Kitulgala Adventure', href: '/destinations/kitulgala' }
        ],
        subTitle: 'Air / Sea Ports',
        subLinks: [
            { label: 'All Ports', href: '#' },
            { label: 'Colombo Airport', href: '/destinations/airport' },
            { label: 'Hambantota Seaport', href: '#' }
        ],
    },
];

const leftLinks = ['Home', 'About Us', 'Weddings & Events'];
const rightLinks = ['Wellness', 'Contact'];

const MOBILE_BP = 1024; // px

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileDestOpen, setMobileDestOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    const megaRef = useRef<HTMLDivElement>(null);

    /* ── window width tracker + mount guard ── */
    useEffect(() => {
        setMounted(true);
        const check = () => setIsMobile(window.innerWidth <= MOBILE_BP);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    /* ── scroll tracker ── */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── body lock ── */
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    /* close mobile menu on resize to desktop */
    useEffect(() => {
        if (!isMobile) setMobileOpen(false);
    }, [isMobile]);

    /* ── helpers ── */
    // Link colors adapt: white over hero, dark red over light sections when scrolled
    const linkColor = scrolled ? 'rgba(28,26,24,0.72)' : 'rgba(255,255,255,0.88)';
    const linkHoverC = scrolled ? '#C41E3A' : 'white';
    const linkHoverB = scrolled ? 'rgba(196,30,58,0.07)' : 'rgba(255,255,255,0.08)';

    const baseLinkStyle: React.CSSProperties = {
        fontFamily: 'var(--font-accent)',
        fontSize: '0.88rem',
        fontWeight: 600,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        color: linkColor,
        textDecoration: 'none',
        padding: '8px 12px',
        borderRadius: '8px',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        transition: 'color 0.25s, background 0.25s',
    };

    const hoverIn = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        e.currentTarget.style.color = linkHoverC;
        e.currentTarget.style.background = linkHoverB;
    };
    const hoverOut = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        e.currentTarget.style.color = linkColor;
        e.currentTarget.style.background = 'none';
    };

    /* ── Pre-hydration skeleton (prevents SSR mismatch) ── */
    if (!mounted) return (
        <header style={{
            position: 'fixed', top: 0, left: 0, right: 0,
            zIndex: 1000, height: '72px',
            background: 'transparent',
        }} />
    );

    /* ─────────────────────────────────────── RENDER ─────────────────────────────────────── */
    return (
        <>
            <header style={{
                position: 'fixed',
                top: 0, left: 0, right: 0,
                zIndex: 1000,
                height: '72px',
                /* Not scrolled: transparent over hero. Scrolled: clean white. */
                background: scrolled
                    ? 'rgba(255,253,249,0.97)'
                    : mobileOpen ? 'rgba(255,253,249,0.97)' : 'transparent',
                backdropFilter: (scrolled || mobileOpen) ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: (scrolled || mobileOpen) ? 'blur(20px)' : 'none',
                borderBottom: scrolled
                    ? '1px solid rgba(0,0,0,0.07)'
                    : '1px solid transparent',
                boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.07)' : 'none',
                transition: 'background 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease',
            }}>
                <div style={{
                    maxWidth: '1440px',
                    margin: '0 auto',
                    height: '100%',
                    padding: '0 20px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>

                    {/* ------------------ MOBILE LAYOUT ------------------ */}
                    {isMobile && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            position: 'relative',
                            height: '72px',
                        }}>
                            {/* Logo � centred initially, slides left on scroll */}
                            <a href="/" style={{
                                position: 'absolute',
                                left: scrolled ? '0px' : '50%',
                                transform: scrolled ? 'translateX(0)' : 'translateX(-50%)',
                                transition: 'left 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                textDecoration: 'none',
                                zIndex: 2,
                            }}>
                                <div style={{
                                    position: 'relative',
                                    width: scrolled ? '40px' : '48px',
                                    height: scrolled ? '40px' : '48px',
                                    flexShrink: 0,
                                    transition: 'width 0.4s ease, height 0.4s ease',
                                }}>
                                    <Image src="/assets/headder-logo.png" alt="Red Elephant Travels" fill style={{ objectFit: 'contain' }} priority />
                                </div>
                                {/* Brand text � slides in on scroll */}
                                <div style={{
                                    overflow: 'hidden',
                                    maxWidth: scrolled ? '200px' : '0px',
                                    opacity: scrolled ? 1 : 0,
                                    transition: scrolled
                                        ? 'max-width 0.55s cubic-bezier(0.4,0,0.2,1) 0.15s, opacity 0.45s ease 0.25s'
                                        : 'max-width 0.3s ease, opacity 0.2s ease',
                                    whiteSpace: 'nowrap',
                                }}>
                                    <div style={{ lineHeight: 1.2, paddingRight: '4px' }}>
                                        <div style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontWeight: 700,
                                            fontSize: '1rem',
                                            color: linkColor,
                                            letterSpacing: '0.01em',
                                        }}>
                                            <span style={{ color: '#C41E3A' }}>Red</span> Elephant Travels
                                        </div>
                                    </div>
                                </div>
                            </a>

                            {/* Invisible spacer so hamburger sits at far right */}
                            <div style={{ flex: 1 }} />

                            {/* Hamburger � anchored to the right */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    gap: '5px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    zIndex: 3,
                                    outline: 'none',
                                    flexShrink: 0,
                                }}
                            >
                                {[0, 1, 2].map(idx => (
                                    <span key={idx} style={{
                                        display: 'block',
                                        width: (idx === 1 && !mobileOpen) ? '18px' : '24px',
                                        height: '2px',
                                        borderRadius: '2px',
                                        background: scrolled ? '#1C1A18' : 'white',
                                        transition: 'all 0.3s ease',
                                        transform: mobileOpen
                                            ? idx === 0 ? 'translateY(7px) rotate(45deg)'
                                                : idx === 2 ? 'translateY(-7px) rotate(-45deg)'
                                                    : 'none'
                                            : 'none',
                                        opacity: (mobileOpen && idx === 1) ? 0 : 1,
                                    }} />
                                ))}
                            </button>
                        </div>
                    )}
                    {/* ══════════════════ DESKTOP LAYOUT ══════════════════ */}
                    {!isMobile && (
                        <>
                            {/* LEFT NAV — hides on scroll, items migrate to right */}
                            <nav style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                                opacity: scrolled ? 0 : 1,
                                transform: scrolled ? 'translateX(50px)' : 'translateX(0)',
                                pointerEvents: scrolled ? 'none' : 'all',
                                transition: 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                                flexShrink: 0,
                            }}>
                                {leftLinks.map(label => (
                                    <Link key={label} href={label === 'Home' ? '/' : label === 'About Us' ? '/about' : label === 'Weddings & Events' ? '/weddings' : '#'}
                                        style={baseLinkStyle}
                                        onMouseEnter={hoverIn}
                                        onMouseLeave={hoverOut}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </nav>

                            {/* LOGO — centred at top, slides left on scroll */}
                            <Link
                                href="/"
                                style={{
                                    position: 'absolute',
                                    left: scrolled ? '20px' : '50%',
                                    transform: scrolled ? 'translateX(0)' : 'translateX(-50%)',
                                    transition: 'left 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    textDecoration: 'none',
                                    zIndex: 5,
                                    pointerEvents: 'all',
                                }}
                            >
                                {/* Logo image */}
                                <div style={{
                                    position: 'relative',
                                    width: scrolled ? '44px' : '52px',
                                    height: scrolled ? '44px' : '52px',
                                    flexShrink: 0,
                                    transition: 'width 0.4s ease, height 0.4s ease',
                                }}>
                                    <Image
                                        src="/assets/headder-logo.png"
                                        alt="Red Elephant Travels"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        priority
                                    />
                                </div>

                                {/* Brand text — slides in from left on scroll */}
                                <div style={{
                                    overflow: 'hidden',
                                    maxWidth: scrolled ? '240px' : '0px',
                                    opacity: scrolled ? 1 : 0,
                                    transition: scrolled
                                        ? 'max-width 0.55s cubic-bezier(0.4,0,0.2,1) 0.15s, opacity 0.45s ease 0.25s'
                                        : 'max-width 0.3s ease, opacity 0.2s ease',
                                    whiteSpace: 'nowrap',
                                }}>
                                    <div style={{ lineHeight: 1.15, paddingRight: '6px' }}>
                                        <div style={{
                                            fontFamily: 'var(--font-heading)',
                                            fontWeight: 700,
                                            fontSize: '1.15rem',
                                            color: linkColor,
                                            letterSpacing: '0.01em',
                                        }}>
                                            <span style={{ color: '#C41E3A' }}>Red</span> Elephant Travels
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* RIGHT NAV — always right, gains left items on scroll */}
                            <nav style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                                flexShrink: 0,
                            }}>
                                {/* Left items that migrate here on scroll */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '2px',
                                    overflow: 'hidden',
                                    maxWidth: scrolled ? '420px' : '0px',
                                    opacity: scrolled ? 1 : 0,
                                    transition: scrolled
                                        ? 'max-width 0.55s cubic-bezier(0.4,0,0.2,1) 0.1s, opacity 0.45s ease 0.2s'
                                        : 'max-width 0.3s ease, opacity 0.2s ease',
                                    pointerEvents: scrolled ? 'all' : 'none',
                                }}>
                                    {leftLinks.map(label => (
                                        <Link key={`r-${label}`}
                                            href={label === 'Home' ? '/' : label === 'About Us' ? '/about' : label === 'Weddings & Events' ? '/weddings' : '#'}
                                            style={{ ...baseLinkStyle, paddingLeft: '10px', paddingRight: '10px' }}
                                            onMouseEnter={hoverIn}
                                            onMouseLeave={hoverOut}
                                        >
                                            {label}
                                        </Link>
                                    ))}
                                    <div style={{ width: '1px', height: '16px', background: scrolled ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.15)', margin: '0 4px', flexShrink: 0 }} />
                                </div>

                                {/* Destinations mega */}
                                <div
                                    ref={megaRef}
                                    onMouseEnter={() => setMegaOpen(true)}
                                    onMouseLeave={() => setMegaOpen(false)}
                                    style={{ position: 'relative', height: '72px', display: 'flex', alignItems: 'center' }}
                                >
                                    <button
                                        style={baseLinkStyle}
                                        onMouseEnter={hoverIn}
                                        onMouseLeave={hoverOut}
                                    >
                                        Destinations
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                            style={{ transition: 'transform 0.2s', transform: megaOpen ? 'rotate(180deg)' : 'none' }}>
                                            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>

                                    {/* ─ Mega panel ─ */}
                                    <div style={{
                                        position: 'fixed',
                                        top: '72px',
                                        left: 0,
                                        right: 0,
                                        background: 'rgba(255,253,249,0.98)',
                                        backdropFilter: 'blur(20px)',
                                        WebkitBackdropFilter: 'blur(20px)',
                                        borderTop: '2px solid #C41E3A',
                                        borderBottom: '1px solid rgba(0,0,0,0.06)',
                                        padding: '36px 0 40px',
                                        opacity: megaOpen ? 1 : 0,
                                        pointerEvents: megaOpen ? 'all' : 'none',
                                        transform: megaOpen ? 'translateY(0)' : 'translateY(-10px)',
                                        transition: 'opacity 0.28s ease, transform 0.28s ease',
                                        zIndex: 999,
                                        boxShadow: '0 16px 48px rgba(0,0,0,0.10)',
                                    }}>
                                        <div style={{
                                            maxWidth: '1440px',
                                            margin: '0 auto',
                                            padding: '0 40px',
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(4,1fr)',
                                            gap: '40px',
                                        }}>
                                            {megaCols.map(col => (
                                                <div key={col.title}>
                                                    <h3 style={{
                                                        fontFamily: 'var(--font-accent)',
                                                        fontSize: '0.94rem',
                                                        fontWeight: 700,
                                                        letterSpacing: '0.18em',
                                                        textTransform: 'uppercase',
                                                        color: 'var(--color-primary-light)',
                                                        marginBottom: '12px',
                                                        paddingBottom: '8px',
                                                        borderBottom: '1px solid rgba(196,30,58,0.25)',
                                                    }}>{col.title}</h3>
                                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                        {col.links.map(l => (
                                                            <li key={l.label}>
                                                                <a href={l.href} style={{
                                                                    fontFamily: 'var(--font-body)', fontSize: '0.94rem',
                                                                    color: '#7A7060', textDecoration: 'none',
                                                                    display: 'block', padding: '2px 0',
                                                                    transition: 'color 0.2s, padding-left 0.2s',
                                                                }}
                                                                    onMouseEnter={e => { e.currentTarget.style.color = '#C41E3A'; e.currentTarget.style.paddingLeft = '6px'; }}
                                                                    onMouseLeave={e => { e.currentTarget.style.color = '#7A7060'; e.currentTarget.style.paddingLeft = '0'; }}
                                                                >{l.label}</a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    {col.subTitle && <>
                                                        <h3 style={{
                                                            fontFamily: 'var(--font-accent)', fontSize: '0.94rem', fontWeight: 700,
                                                            letterSpacing: '0.18em', textTransform: 'uppercase',
                                                            color: 'var(--color-primary-light)',
                                                            marginBottom: '12px', marginTop: '20px',
                                                            paddingBottom: '8px', borderBottom: '1px solid rgba(196,30,58,0.25)',
                                                        }}>{col.subTitle}</h3>
                                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                            {(col.subLinks ?? []).map(l => (
                                                                <li key={l.label}>
                                                                    <Link href={l.href} style={{
                                                                        fontFamily: 'var(--font-body)', fontSize: '0.94rem',
                                                                        color: '#7A7060', textDecoration: 'none',
                                                                        display: 'block', padding: '2px 0',
                                                                        transition: 'color 0.2s, padding-left 0.2s',
                                                                    }}
                                                                        onMouseEnter={e => { e.currentTarget.style.color = '#C41E3A'; e.currentTarget.style.paddingLeft = '6px'; }}
                                                                        onMouseLeave={e => { e.currentTarget.style.color = '#7A7060'; e.currentTarget.style.paddingLeft = '0'; }}
                                                                    >{l.label}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Regular right links */}
                                {rightLinks.map(label => (
                                    <Link key={label}
                                        href={label === 'Contact' ? '/contact' : label === 'Wellness' ? '/wellness' : '#'}
                                        style={baseLinkStyle}
                                        onMouseEnter={hoverIn}
                                        onMouseLeave={hoverOut}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </nav>
                        </>
                    )}
                </div>
            </header>

            {/* ═══════════════ MOBILE FULL-SCREEN OVERLAY ═══════════════ */}
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1200,
                background: '#FFFDF9',
                boxShadow: '-8px 0 40px rgba(0,0,0,0.08)',
                borderLeft: '1px solid rgba(0,0,0,0.06)',
                transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.42s cubic-bezier(0.4,0,0.2,1)',
                overflowY: 'auto',
                paddingTop: '0',
                paddingLeft: '0',
                paddingRight: '0',
                paddingBottom: '48px',
                display: isMobile ? 'block' : 'none',
            }}>
                {/* -- Sticky close bar at top of overlay -- */}
                <div style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    background: '#FFFDF9',
                    borderBottom: '1px solid rgba(0,0,0,0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 24px',
                }}>
                    {/* Mini logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ position: 'relative', width: '36px', height: '36px', flexShrink: 0 }}>
                            <Image src="/assets/headder-logo.png" alt="Logo" fill style={{ objectFit: 'contain' }} />
                        </div>
                        <div style={{ fontFamily: 'var(--font-heading)', color: '#1C1A18', fontWeight: 700, fontSize: '1.14rem' }}>
                            <span style={{ color: '#C41E3A' }}>Red</span> Elephant Travels
                        </div>
                    </div>
                    {/* ? Close button */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(196,30,58,0.08)',
                            border: '1.5px solid rgba(196,30,58,0.25)',
                            cursor: 'pointer',
                            flexShrink: 0,
                            transition: 'background 0.2s, border-color 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(196,30,58,0.15)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(196,30,58,0.08)'; }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 4L12 12M12 4L4 12" stroke="#C41E3A" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable nav items */}
                <div style={{ padding: '24px 24px 0' }}>
                    {/* Mobile nav items */}
                    {[...leftLinks, 'DESTINATIONS_SPECIAL', ...rightLinks].map((label) => {
                        /* ── Destinations accordion ── */
                        if (label === 'DESTINATIONS_SPECIAL') return (
                            <div key="dest" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                                <button
                                    onClick={() => setMobileDestOpen(v => !v)}
                                    style={{
                                        display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center',
                                        background: 'none', border: 'none', color: '#1C1A18',
                                        fontFamily: 'var(--font-accent)', fontSize: '1rem', fontWeight: 600,
                                        letterSpacing: '0.08em', textTransform: 'uppercase',
                                        padding: '18px 0', cursor: 'pointer', textAlign: 'left',
                                    }}
                                >
                                    Destinations
                                    <div style={{
                                        width: '28px', height: '28px', borderRadius: '50%',
                                        background: 'rgba(196,30,58,0.15)',
                                        border: '1px solid rgba(196,30,58,0.3)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0,
                                        transition: 'transform 0.25s',
                                        transform: mobileDestOpen ? 'rotate(180deg)' : 'none',
                                    }}>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="var(--color-primary-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Accordion body */}
                                <div style={{
                                    maxHeight: mobileDestOpen ? '1200px' : '0px',
                                    overflow: 'hidden',
                                    transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)',
                                }}>
                                    <div style={{ paddingBottom: '20px' }}>
                                        {megaCols.map(col => (
                                            <div key={col.title} style={{ marginBottom: '20px' }}>
                                                <div style={{
                                                    fontFamily: 'var(--font-accent)', fontSize: '0.88rem', fontWeight: 700,
                                                    letterSpacing: '0.18em', textTransform: 'uppercase',
                                                    color: 'var(--color-primary-light)',
                                                    marginBottom: '8px', paddingBottom: '6px',
                                                    borderBottom: '1px solid rgba(196,30,58,0.2)',
                                                }}>
                                                    {col.title}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                                                    {col.links.map(l => (
                                                         <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                                                             style={{
                                                                 display: 'block', color: '#7A7060', textDecoration: 'none',
                                                                 fontFamily: 'var(--font-body)', fontSize: '1.14rem',
                                                                 padding: '8px 0 8px 14px',
                                                                 borderLeft: '2px solid rgba(196,30,58,0.25)',
                                                                 transition: 'color 0.2s, border-color 0.2s',
                                                             }}
                                                         >{l.label}</Link>
                                                     ))}
                                                </div>
                                                {col.subTitle && <>
                                                    <div style={{
                                                        fontFamily: 'var(--font-accent)', fontSize: '0.88rem', fontWeight: 700,
                                                        letterSpacing: '0.18em', textTransform: 'uppercase',
                                                        color: 'var(--color-primary-light)',
                                                        marginBottom: '8px', marginTop: '14px', paddingBottom: '6px',
                                                        borderBottom: '1px solid rgba(196,30,58,0.2)',
                                                    }}>
                                                        {col.subTitle}
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        {(col.subLinks ?? []).map(l => (
                                                            <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                                                                style={{
                                                                    display: 'block', color: '#7A7060', textDecoration: 'none',
                                                                    fontFamily: 'var(--font-body)', fontSize: '1.14rem',
                                                                    padding: '8px 0 8px 14px',
                                                                    borderLeft: '2px solid rgba(196,30,58,0.25)',
                                                                    transition: 'color 0.2s',
                                                                }}
                                                            >{l.label}</Link>
                                                        ))}
                                                    </div>
                                                </>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );

                        /* ── Regular flat link ── */
                        return (
                            <div key={label} style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                                <Link
                                    href={label === 'Home' ? '/' : label === 'About Us' ? '/about' : label === 'Weddings & Events' ? '/weddings' : label === 'Wellness' ? '/wellness' : label === 'Contact' ? '/contact' : '#'}
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        display: 'block', color: '#1C1A18', textDecoration: 'none',
                                        fontFamily: 'var(--font-accent)', fontSize: '1rem', fontWeight: 600,
                                        letterSpacing: '0.08em', textTransform: 'uppercase',
                                        padding: '18px 0',
                                    }}
                                >
                                    {label}
                                </Link>
                            </div>
                        );
                    })}

                    {/* Contact CTA at bottom */}
                    <div style={{ marginTop: '36px' }}>
                        <Link href="/contact" onClick={() => setMobileOpen(false)} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                            background: 'var(--gradient-primary)',
                            color: 'white', textDecoration: 'none',
                            fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: '1rem',
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            padding: '14px 28px', borderRadius: '50px',
                            boxShadow: 'var(--shadow-red)',
                        }}>
                            Plan Your Trip
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                    </div>
                </div>  {/* end scrollable nav items */}
            </div>      {/* end mobile overlay panel */}
        </>
    );
}


