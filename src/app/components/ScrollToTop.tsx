'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Resets scroll to the top of the page on every route change.
 * Fixes the "page appears mid-scroll" artifact in Next.js App Router.
 */
export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Run on pathname or hash change
        const handleHash = () => {
            const hash = window.location.hash;
            if (!hash) {
                // Instant jump to top
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            } else {
                // If there is a hash (e.g. #contact), jump to that element
                const id = hash.replace('#', '');
                setTimeout(() => {
                    const el = document.getElementById(id);
                    if (el) {
                        const y = el.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                }, 100);
            }
        };

        handleHash();
    }, [pathname]);

    // Also listen for hash changes on the same page
    useEffect(() => {
        const onHashChange = () => {
            const hash = window.location.hash;
            if (hash) {
                const id = hash.replace('#', '');
                const el = document.getElementById(id);
                if (el) {
                    const y = el.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }
        };
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    return null;
}
