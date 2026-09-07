/**
 * Lenis Smooth Scroll Initialization
 * 
 * This script initializes Lenis smooth scrolling library with
 * optimized settings for a smooth and performant scrolling experience.
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLenis);
    } else {
        initLenis();
    }

    function initLenis() {
        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,          // Animation duration in seconds
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
            direction: 'vertical',  // Scroll direction
            gestureDirection: 'vertical', // Gesture scroll direction
            smooth: true,           // Enable smooth scrolling
            mouseMultiplier: 1,     // Mouse wheel speed multiplier
            smoothTouch: false,     // Disable smooth scrolling on touch devices for better performance
            touchMultiplier: 2,     // Touch scroll speed multiplier
            infinite: false,        // Disable infinite scrolling
        });

        // Animation frame loop for Lenis
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Handle anchor link clicks
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                
                // Check if it's a valid anchor (not just "#")
                if (href && href !== '#' && href !== '#0') {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const target = document.getElementById(targetId);
                    
                    if (target) {
                        // Scroll to the target element
                        lenis.scrollTo(target, {
                            offset: 0,
                            duration: 1.5,
                            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                        });
                    }
                }
            });
        });

        // GSAP ScrollTrigger Integration (if GSAP is available)
        if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
            // Sync Lenis with GSAP ScrollTrigger
            lenis.on('scroll', () => {
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.update();
                }
            });

            // Use GSAP ticker for better performance
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });

            // Disable GSAP's default lag smoothing
            gsap.ticker.lagSmoothing(0);
        }

        // Stop scrolling on specific events (e.g., when modals are open)
        const stopScroll = () => lenis.stop();
        const startScroll = () => lenis.start();

        // Bootstrap modal integration
        const modalElements = document.querySelectorAll('.modal');
        modalElements.forEach(modal => {
            modal.addEventListener('show.bs.modal', stopScroll);
            modal.addEventListener('hidden.bs.modal', startScroll);
        });

        // Also listen to document-level modal events
        document.addEventListener('show.bs.modal', stopScroll);
        document.addEventListener('hidden.bs.modal', startScroll);

        // Expose lenis instance globally (for use in other scripts)
        window.lenis = lenis;

        // Log initialization (can be removed in production)
        console.log('✓ Lenis Smooth Scroll initialized successfully');
    }

})();
