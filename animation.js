
// animation.js
window.onload = function() {
    gsap.to('.logo-container', { duration: 1, opacity: 1, y: -50, ease: 'power1.out' });
    gsap.to('#logo', { duration: 1, scale: 1.2, yoyo: true, repeat: -1, ease: 'power1.inOut' });
};
