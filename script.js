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

    // Future: Mobile Menu Toggle Logic
});
