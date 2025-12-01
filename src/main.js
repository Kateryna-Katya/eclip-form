// 1. Инициализация иконок
lucide.createIcons();

// 2. Плавный скролл (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 3. Логика мобильного меню
document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burger-btn');
    const navMenu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.header__link, .header__cta');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            // Переключаем класс active
            navMenu.classList.toggle('active');

            // Проверяем, открыто меню или нет, чтобы сменить иконку
            const isOpen = navMenu.classList.contains('active');

            if (isOpen) {
                burgerBtn.innerHTML = '<i data-lucide="x"></i>';
                // Блокируем скролл body, когда меню открыто
                document.body.style.overflow = 'hidden';
            } else {
                burgerBtn.innerHTML = '<i data-lucide="menu"></i>';
                document.body.style.overflow = '';
            }

            // Важно: перерисовываем иконку после вставки HTML
            lucide.createIcons();
        });

        // Закрытие при клике на ссылку
        links.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                burgerBtn.innerHTML = '<i data-lucide="menu"></i>';
                document.body.style.overflow = '';
                lucide.createIcons();
            });
        });
    }
});