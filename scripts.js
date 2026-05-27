/* ========================================
   Magnifica Humanitas - Scripts
   ======================================== */

// --- Mobile Navigation Toggle ---
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMobile.classList.toggle('show');
    });

    // Close mobile nav on link click
    navMobile.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navMobile.classList.remove('show');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// --- FAQ Accordion ---
document.querySelectorAll('.faq-question').forEach(function (button) {
    button.addEventListener('click', function () {
        const answer = this.nextElementSibling;
        const isOpen = answer.classList.contains('open');

        // Close all other FAQs
        document.querySelectorAll('.faq-answer.open').forEach(function (openAnswer) {
            if (openAnswer !== answer) {
                openAnswer.classList.remove('open');
                openAnswer.previousElementSibling.setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle this FAQ
        if (isOpen) {
            answer.classList.remove('open');
            this.setAttribute('aria-expanded', 'false');
        } else {
            answer.classList.add('open');
            this.setAttribute('aria-expanded', 'true');
        }
    });
});

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navHeight = 60;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// --- Navbar hide/show on scroll ---
let lastScrollTop = 0;
const nav = document.getElementById('nav');

window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
}, { passive: true });

// --- Intersection Observer for fade-in animations ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections and cards
document.querySelectorAll('.card, .step, .chapter, .why-item, .quote, .faq-item').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Hero elements get immediate visibility
document.querySelector('.hero-content').style.opacity = '1';
