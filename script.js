// Portfolio Scripts

document.addEventListener('DOMContentLoaded', () => {
    console.log('Rafael Ammon Portfolio Loaded');

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Auto-detect animatable elements
    const animatables = document.querySelectorAll(
        '.geo-card, .paisagismo-card, .treinamento-card, .cert-card, .flip-card:not(.app-flip-card), .scroll-animate'
    );
    animatables.forEach((el, i) => {
        el.classList.add('scroll-animate');
        // Stagger delay for grid items
        const parent = el.parentElement;
        const siblings = parent ? Array.from(parent.querySelectorAll('.scroll-animate')) : [];
        const idx = siblings.indexOf(el);
        if (idx > 0) {
            el.style.transitionDelay = (idx * 0.1) + 's';
        }
        revealObserver.observe(el);
    });

    // ============================================
    // SCROLL SPY — Active nav link
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // Hero Video Carousel with Crossfade
    const videoElements = document.querySelectorAll('.hero-video');
    let currentVideoIndex = 0;
    const transitionInterval = 15000; // 15 seconds per video

    function rotateVideos() {
        const currentVideo = videoElements[currentVideoIndex];

        // Move to next video
        currentVideoIndex = (currentVideoIndex + 1) % videoElements.length;
        const nextVideo = videoElements[currentVideoIndex];

        // Start playing next video and add active class
        nextVideo.play();
        nextVideo.classList.add('active');

        // Wait for crossfade transition (2s) then remove active from previous
        setTimeout(() => {
            currentVideo.classList.remove('active');
        }, 2000); // Match CSS transition duration
    }

    // Start first video
    if (videoElements.length > 0) {
        videoElements[0].play();

        // Rotate videos every 15 seconds
        setInterval(rotateVideos, transitionInterval);
    }

    // ============================================
    // FLIP CARD INTERACTION
    // ============================================
    const flipCards = document.querySelectorAll('.flip-card');

    flipCards.forEach(card => {
        // Click on card to flip
        card.addEventListener('click', (e) => {
            // Don't flip if clicking the back button
            if (e.target.closest('.flip-back-btn')) {
                return;
            }

            // Close any other open cards first
            flipCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('flipped')) {
                    otherCard.classList.remove('flipped');
                }
            });

            // Toggle this card
            card.classList.add('flipped');
        });

        // Back button to close
        const backBtn = card.querySelector('.flip-back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.remove('flipped');
            });
        }
    });

    // Close flipped card when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.flip-card')) {
            flipCards.forEach(card => {
                card.classList.remove('flipped');
            });
        }
    });

    // Close flipped card with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            flipCards.forEach(card => {
                card.classList.remove('flipped');
            });
        }
    });

    // ============================================
    // DRAG TO SCROLL (mouse users)
    // ============================================
    const cardBackContents = document.querySelectorAll('.flip-card-back-content');

    cardBackContents.forEach(content => {
        let isDown = false;
        let startY;
        let scrollTop;

        content.addEventListener('mousedown', (e) => {
            if (e.target.closest('.flip-back-btn')) return;
            isDown = true;
            content.style.cursor = 'grabbing';
            startY = e.pageY - content.offsetTop;
            scrollTop = content.scrollTop;
            e.preventDefault();
        });

        content.addEventListener('mouseleave', () => {
            isDown = false;
            content.style.cursor = 'grab';
        });

        content.addEventListener('mouseup', () => {
            isDown = false;
            content.style.cursor = 'grab';
        });

        content.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const y = e.pageY - content.offsetTop;
            const walk = (y - startY) * 1.5;
            content.scrollTop = scrollTop - walk;
        });

        // Prevent wheel scroll from going beyond limits
        content.addEventListener('wheel', (e) => {
            const maxScroll = content.scrollHeight - content.clientHeight;
            const currentScroll = content.scrollTop;
            const delta = e.deltaY;

            // Block scroll if at top and trying to scroll up
            if (currentScroll <= 0 && delta < 0) {
                e.preventDefault();
                content.scrollTop = 0;
                return;
            }

            // Block scroll if at bottom and trying to scroll down
            if (currentScroll >= maxScroll && delta > 0) {
                e.preventDefault();
                content.scrollTop = maxScroll;
                return;
            }
        }, { passive: false });
    });

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            header.classList.toggle('nav-active');

            // Prevent scrolling when menu is open
            if (header.classList.contains('nav-active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            header.classList.remove('nav-active');
            document.body.style.overflow = '';
        });
    });

    // ============================================
    // APPS CAROUSEL LOGIC
    // ============================================
    const carousel = document.querySelector('.apps-carousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (carousel && prevBtn && nextBtn) {
        const scrollAmount = 410; // Card width (380) + gap (30)

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }
});
