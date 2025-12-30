// Portfolio Scripts

document.addEventListener('DOMContentLoaded', () => {
    console.log('Rafael Ammon Portfolio Loaded');

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

    // Future: Mobile Menu Toggle Logic
});
