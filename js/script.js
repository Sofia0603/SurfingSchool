import { animate, splitText, stagger, waapi, spring, eases } from './anime.esm.js';
const { linear, outExpo, cubicBezier } = eases;



document.addEventListener('DOMContentLoaded', () => {

    new WOW().init();


    const menuBtn = document.querySelector('.menu__btn');
    const menu = document.querySelector('.menu');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('menu--open');
    });

    // Функция для запуска анимации через IntersectionObserver
    function animateOnVisible(selector, animationCallback, options = {}) {
        const elements = document.querySelectorAll(selector);
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animationCallback(entry.target);
                    obs.unobserve(entry.target); // Если нужно анимацию один раз
                }
            });
        }, { threshold: 0.1, ...options }); // threshold можно менять

        elements.forEach(el => observer.observe(el));
    }

    // Пример: анимация меню
    animateOnVisible('.menu__list', (el) => {
        animate(el, {
            translateX: 300,
            duration: 500,
            easing: 'easeOutQuad'
        });
    });

    // Пример: splitText для абзацев
    const { words } = splitText('p', { words: { wrap: 'clip' } });
    animateOnVisible('p', () => {
        animate(words, {
            y: [
                { to: ['100%', '0%'] },
                { to: '-100%', delay: 750, ease: 'in(3)' }
            ],
            duration: 750,
            ease: 'out(3)',
            delay: stagger(100),
            loop: true,
        });
    });

    // splitText для заголовков
    const { chars } = splitText('.animate__title', { words: false, chars: true });
    animateOnVisible('.animate__title', () => {
        waapi.animate(chars, {
            translate: `0 -2rem`,
            delay: stagger(100),
            duration: 600,
            loop: true,
            alternate: true,
            ease: 'inOut(2)',
        });
    });

    const { charsTwo } = splitText('.reviews__title', { words: false, chars: true });
    animateOnVisible('.reviews__title', () => {
        waapi.animate(charsTwo, {
            translate: `0 -2rem`,
            delay: stagger(100),
            duration: 700,
            loop: true,
            alternate: true,
            ease: 'inOut(2)',
        });
    });

    // Кнопки
    animateOnVisible('.header__buttons a', (el) => {
        animate(el, {
            boxShadow: [
                { to: stagger([1, .25], {
                        modifier: v => `0 0 ${v * 30}px ${v * 20}px currentColor`,
                        from: 'center'
                    })
                },
                { to: 0 },
            ],
            delay: stagger(100, { from: 'center' }),
            loop: true
        });
    });


    // Изображение
    animateOnVisible('.about__img', (el) => {
        animate(el, {
            left: 'calc(7.75rem * 1.5)',
            borderRadius: 0,
        });
    });







});
