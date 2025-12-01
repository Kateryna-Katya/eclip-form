// 1. Initialize Icons
lucide.createIcons();

// 2. Initialize Lenis (Smooth Scroll)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// 3. Mobile Menu Logic
const burgerBtn = document.getElementById('burger-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.header__link');

// Toggle Menu
burgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Change icon based on state
    const iconName = navMenu.classList.contains('active') ? 'x' : 'menu';
    // Re-render icon (simple implementation for Lucide)
    burgerBtn.innerHTML = `<i data-lucide="${iconName}"></i>`;
    lucide.createIcons();
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        burgerBtn.innerHTML = `<i data-lucide="menu"></i>`;
        lucide.createIcons();
    });
});