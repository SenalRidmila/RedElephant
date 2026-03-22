'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-label="Scroll to top"
            style={{
                position: 'fixed',
                bottom: '28px', // Aligns vertically with the WhatsApp button
                left: '28px',
                zIndex: 9998,
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: hovered ? 'var(--color-primary)' : 'rgba(255,255,255,0.08)',
                border: hovered ? '1px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.15)',
                color: hovered ? 'white' : 'var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? 'all' : 'none',
                transform: visible 
                    ? (hovered ? 'translateY(-4px)' : 'translateY(0)') 
                    : 'translateY(20px)',
                transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: hovered 
                    ? '0 8px 25px rgba(196,30,58,0.4)' 
                    : '0 4px 15px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(8px)',
            }}
        >
            <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
        </button>
    );
}
