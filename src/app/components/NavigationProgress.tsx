'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * Full-screen cinematic curtain page transition.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  idle: nothing                                                   │
 * │  entering: curtain plays   @keyframes curtainIn  (bottom → 0)   │
 * │  holding:  curtain stays full-screen (navigation happens here)  │
 * │  exiting:  curtain plays   @keyframes curtainOut (0 → top)      │
 * │  idle again                                                      │
 * └─────────────────────────────────────────────────────────────────┘
 */

type Phase = 'idle' | 'entering' | 'holding' | 'exiting';

export default function PageTransition() {
    const pathname = usePathname();
    const prevPath = useRef(pathname);
    const [phase, setPhase] = useState<Phase>('idle');
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clear = () => { if (timer.current) clearTimeout(timer.current); };

    // Called when user clicks an internal link
    const begin = () => {
        clear();
        setPhase('entering');
        // After enter animation completes (~500ms), hold
        timer.current = setTimeout(() => setPhase('holding'), 520);
    };

    // Called when new page has landed
    const finish = () => {
        clear();
        setPhase('exiting');
        // After exit animation completes (~580ms), go idle
        timer.current = setTimeout(() => setPhase('idle'), 600);
    };

    // --- Click interception ---
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest('a');
            if (!anchor) return;
            const href = anchor.getAttribute('href');
            if (!href) return;
            if (
                href.startsWith('#') ||
                href.startsWith('http') ||
                href.startsWith('//') ||
                href.startsWith('mailto') ||
                href.startsWith('tel')
            ) return;
            const dest = href.split('#')[0];
            if (dest === '' || dest === pathname) return;
            begin();
        };
        document.addEventListener('click', onDocClick, true);
        return () => document.removeEventListener('click', onDocClick, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    // --- Pathname change = new page ready ---
    useEffect(() => {
        if (pathname !== prevPath.current) {
            prevPath.current = pathname;
            // Small delay so new page paints before revealing
            timer.current = setTimeout(finish, 60);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    if (phase === 'idle') return null;

    // Pick animation class by phase
    const animName =
        phase === 'entering' ? 'curtainIn' :
            phase === 'exiting' ? 'curtainOut' :
                'none';
    const animDuration =
        phase === 'entering' ? '0.52s' :
            phase === 'exiting' ? '0.58s' :
                '0s';

    return (
        <>
            <style>{`
                @keyframes curtainIn {
                    from { transform: translateY(100%); }
                    to   { transform: translateY(0%);   }
                }
                @keyframes curtainOut {
                    from { transform: translateY(0%);    }
                    to   { transform: translateY(-100%); }
                }
                @keyframes curtainSpinRing {
                    to { transform: rotate(360deg); }
                }
                @keyframes curtainPulse {
                    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
                    50%      { opacity: 1;   transform: translate(-50%, -50%) scale(1.35); }
                }
            `}</style>

            {/* ─────── Curtain ─────── */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 999998,
                    background: 'linear-gradient(160deg, #1A0404 0%, #200505 60%, #160303 100%)',
                    animationName: animName !== 'none' ? animName : undefined,
                    animationDuration: animDuration,
                    animationTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
                    animationFillMode: 'forwards',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 28,
                }}
            >
                {/* Ambient warm glow */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(200,30,30,0.1) 0%, transparent 70%)',
                }} />

                {/* Only show spinner while holding (not while animating) */}
                {phase === 'holding' && (
                    <>
                        {/* Outer ring */}
                        <div style={{ position: 'relative', width: 64, height: 64 }}>
                            <div style={{
                                position: 'absolute', inset: 0,
                                border: '1.5px solid rgba(200,30,30,0.12)',
                                borderTopColor: 'rgba(220,50,50,0.85)',
                                borderRadius: '50%',
                                animationName: 'curtainSpinRing',
                                animationDuration: '1.8s',
                                animationTimingFunction: 'linear',
                                animationIterationCount: 'infinite',
                            }} />
                            <div style={{
                                position: 'absolute', inset: 10,
                                border: '1px solid rgba(200,30,30,0.07)',
                                borderBottomColor: 'rgba(240,80,80,0.45)',
                                borderRadius: '50%',
                                animationName: 'curtainSpinRing',
                                animationDuration: '1.3s',
                                animationTimingFunction: 'linear',
                                animationIterationCount: 'infinite',
                                animationDirection: 'reverse',
                            }} />
                            {/* Centre diamond */}
                            <div style={{
                                position: 'absolute',
                                top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%) rotate(45deg)',
                                width: 6, height: 6,
                                background: 'rgba(220,50,50,0.9)',
                                boxShadow: '0 0 14px rgba(220,50,50,0.6)',
                                animationName: 'curtainPulse',
                                animationDuration: '1.8s',
                                animationTimingFunction: 'ease-in-out',
                                animationIterationCount: 'infinite',
                            }} />
                        </div>

                        {/* Brand label */}
                        <div style={{
                            fontFamily: 'Georgia, "Times New Roman", serif',
                            fontSize: '1.14rem',
                            letterSpacing: '0.4em',
                            textTransform: 'uppercase',
                            color: 'rgba(220,60,60,0.45)',
                        }}>
                            Red Elephant
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
