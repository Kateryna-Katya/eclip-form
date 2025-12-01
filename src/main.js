/* =========================================
   CONFIG & UTILS
   ========================================= */
const allowClickSelectors = [
  '.header__burger',
  '.header__link',
  '.header__cta',
  '#burger-btn',
  '#nav-menu'
];

function isAllowedClick(target) {
  return allowClickSelectors.some(sel => target.closest && target.closest(sel));
}

/* =========================================
   MAIN INITIALIZATION (WAIT FOR ASSETS)
   ========================================= */
window.addEventListener('load', () => {
  
  // 0. Library Checks
  const hasGSAP = typeof gsap !== 'undefined';
  const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
  const hasLenis = typeof Lenis !== 'undefined';
  const hasLucide = typeof lucide !== 'undefined';

  if (hasGSAP && hasScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Initialize Icons
  if (hasLucide) lucide.createIcons();

  // 2. Mobile Menu Logic
  try {
    const burgerBtn = document.getElementById('burger-btn');
    const navMenu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.header__link, .header__cta');

    if (burgerBtn && navMenu) {
      burgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');

        if (isOpen) {
          burgerBtn.innerHTML = '<i data-lucide="x"></i>';
          document.body.style.overflow = 'hidden';
        } else {
          burgerBtn.innerHTML = '<i data-lucide="menu"></i>';
          document.body.style.overflow = '';
        }
        if (hasLucide) lucide.createIcons();
      });

      links.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          if (burgerBtn) burgerBtn.innerHTML = '<i data-lucide="menu"></i>';
          document.body.style.overflow = '';
          if (hasLucide) lucide.createIcons();
        });
      });
    }
  } catch (err) {
    console.error('Mobile menu error:', err);
  }

  // 3. GSAP Animations
  try {
    if (hasGSAP) {
      
      // --- A. HERO SECTION ---
      const tlHero = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

      // Текст Hero
      if (document.querySelector('.hero__badge-pill')) {
         tlHero.from('.hero__badge-pill', { y: 20, opacity: 0, duration: 0.6 })
               .from('.hero__title-center', { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
               .from('.hero__desc-center', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
               .from('.hero__btns-center', { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");
      }

      // 3D Интерфейс
      if (document.querySelector('.interface-card')) {
        tlHero.to('.interface-card', { 
            opacity: 1, 
            rotateX: 10, 
            y: 0, 
            startAt: { y: 100, rotateX: 45 }, 
            duration: 1.2,
            ease: "back.out(1.7)"
        }, "-=0.4");
      }

      // Боковые плашки
      if (document.querySelector('.badge-left')) {
        tlHero.to('.badge-left', { opacity: 1, x: 0, duration: 0.6 }, "-=0.8");
        tlHero.to('.badge-right', { opacity: 1, x: 0, duration: 0.6 }, "-=0.6");
      }

      // Симуляция чата в Hero
      setTimeout(() => {
          const typing = document.querySelector('.typing-indicator');
          const hiddenMsg = document.querySelector('.hidden-msg');
          
          if (typing && hiddenMsg) {
              const msgContainer = typing.closest('.msg');
              if (msgContainer) msgContainer.style.display = 'none'; 
              
              hiddenMsg.style.display = 'flex'; 
              gsap.from(hiddenMsg, { opacity: 0, y: 10, duration: 0.5 });
          }
      }, 3500);

      // --- B. BENEFITS SECTION ---
      if (document.querySelector('.benefits-grid')) {
          gsap.from('.benefit-card', {
            scrollTrigger: {
                trigger: '.benefits-grid',
                start: 'top 90%',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1
          });
      }

      // --- C. PLATFORM (BENTO) SECTION ---
      if (document.querySelector('.section-header')) {
        gsap.from('.section-header', {
            scrollTrigger: {
                trigger: '#platform',
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8
        });
      }

      if (document.querySelector('.bento-grid')) {
          gsap.from('.bento-card', {
            scrollTrigger: {
                trigger: '.bento-grid',
                start: 'top 85%',
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1
          });
      }

      // --- D. INNOVATIONS SECTION ---
      if (document.querySelector('.innovations-layout')) {
          gsap.from('.innovations-layout', {
              scrollTrigger: {
                  trigger: '#innovations',
                  start: 'top 80%'
              },
              y: 40,
              opacity: 0,
              duration: 0.8
          });
      }

      // --- E. BLOG SECTION ---
      if (document.querySelector('.blog-grid')) {
          gsap.from('.blog-card', {
            scrollTrigger: {
                trigger: '.blog-grid',
                start: 'top 85%',
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15
          });
      }
    }
  } catch (err) {
    console.error('Animation error:', err);
  }

  // 4. Accordion Logic (Innovations)
  try {
      const accItems = document.querySelectorAll('.accordion-item');
      if (accItems.length > 0) {
          accItems.forEach(item => {
              item.addEventListener('click', () => {
                  // Закрываем другие (аккордеон)
                  accItems.forEach(otherItem => {
                      if (otherItem !== item) otherItem.classList.remove('active');
                  });
                  // Тогглим текущий
                  item.classList.toggle('active');
              });
          });
      }
  } catch (err) {
      console.error('Accordion error:', err);
  }

  // 5. Smooth Scroll (Lenis)
  if (hasLenis) {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      // Исправление для мобильных
      touchMultiplier: 2, 
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  // 6. Safe Link Blocking (Specific to your requirements)
  try {
    document.querySelectorAll('.cmsmasters-blog__post a, .entry-title a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (isAllowedClick(e.target)) return;
        e.preventDefault();
      });
    });
    } catch (e) { }
    
  // 7. Contact Form Logic
  const contactForm = document.getElementById('form-request');
  const successMsg = document.getElementById('success-msg');
  const resetBtn = document.getElementById('reset-form-btn');
  
  // Elements for Captcha
  const mathQuestion = document.getElementById('math-question');
  const captchaInput = document.getElementById('captcha-input');
  const captchaError = document.getElementById('captcha-error');

  let captchaResult = 0;

  // Generate Math Captcha
  const initCaptcha = () => {
      const n1 = Math.floor(Math.random() * 10);
      const n2 = Math.floor(Math.random() * 10);
      captchaResult = n1 + n2;
      if(mathQuestion) mathQuestion.textContent = `${n1} + ${n2} = ?`;
      if(captchaInput) captchaInput.value = '';
      if(captchaError) captchaError.style.display = 'none';
  };

  // Init on load
  initCaptcha();

  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          // Validate Captcha
          if (parseInt(captchaInput.value) !== captchaResult) {
              captchaError.style.display = 'block';
              captchaInput.style.borderColor = '#EF4444';
              // Анимация тряски для поля при ошибке
              gsap.fromTo(captchaInput, { x: -5 }, { x: 5, duration: 0.1, repeat: 3, yoyo: true });
              return;
          }

          // If Valid
          captchaError.style.display = 'none';
          captchaInput.style.borderColor = '#E2E8F0';

          // Simulate AJAX
          const btn = contactForm.querySelector('button[type="submit"]');
          const originalText = btn.innerHTML;
          
          btn.innerHTML = '<span>Отправка...</span>';
          btn.style.opacity = '0.8';
          btn.disabled = true;

          setTimeout(() => {
              // Success Action
              // contactForm.style.display = 'none'; <--- ЭТУ СТРОКУ МЫ УБРАЛИ
              successMsg.style.display = 'flex';  // Показываем оверлей поверх формы
              
              // Reset button state
              btn.innerHTML = originalText;
              btn.style.opacity = '1';
              btn.disabled = false;
              
              // Refresh Icon in success message
              if (hasLucide) lucide.createIcons();
          }, 1500);
      });
  }

  // Reset form functionality ("Отправить еще")
  if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
          e.preventDefault(); // Чтобы не скроллило вверх
          contactForm.reset(); // Очищаем поля
          initCaptcha(); // Новая капча
          
          // Плавно скрываем сообщение
          gsap.to(successMsg, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                  successMsg.style.display = 'none';
                  successMsg.style.opacity = 1; // Возвращаем для следующего раза
              }
          });
      });
  }

});