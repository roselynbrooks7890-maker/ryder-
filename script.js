document.addEventListener('DOMContentLoaded', () => {
    // 1. DYNAMIC HEADER SCROLL EFFECT & MOBILE MENU TOGGLE
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click and implement smooth scrolling for local links
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                // Smooth scrolling for same-page anchors
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            // Close mobile menu
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    
    // 2. FADE-IN ANIMATION (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' 
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        fadeInObserver.observe(el);
    });


    // 3. ANIMATED COUNTER FOR STATS (Home Page Only)
    function animateCounter(elementId, target) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let count = 0;
        const duration = 2000;
        const startTime = performance.now();

        function step(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            count = Math.floor(progress * target);
            element.textContent = count.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        requestAnimationFrame(step);
    }

    const statsSection = document.querySelector('.stats');
    let statsAnimated = false;

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    // Start the animations
                    animateCounter('propertiesSold', 1250);
                    animateCounter('happyClients', 850);
                    animateCounter('yearsExperience', 15);
                    animateCounter('awardsTaken', 25);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }); 

        statsObserver.observe(statsSection);
    }
});