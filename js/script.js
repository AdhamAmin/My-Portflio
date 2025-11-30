document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initThemeToggle();
    initMobileMenu();
    setActiveLink();
    injectBlobs();
    initAnimations();
    initMasterpiece();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.className = savedTheme;
}

function injectBlobs() {
    const blobsHTML = `
        <div class="background-blobs">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
            <div class="blob blob-3"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', blobsHTML);
}

function initMasterpiece() {
    // Surprise: Interactive Mouse Trail
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    document.body.appendChild(trail);

    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;

        trail.style.transform = `translate(${trailX}px, ${trailY}px)`;
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Click Burst Effect
    document.addEventListener('click', (e) => {
        createBurst(e.clientX, e.clientY);
    });
}

function createBurst(x, y) {
    const burst = document.createElement('div');
    burst.className = 'burst';
    burst.style.left = x + 'px';
    burst.style.top = y + 'px';
    document.body.appendChild(burst);
}
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (document.body.classList.contains('light-theme')) {
                document.body.className = 'dark-theme';
                localStorage.setItem('theme', 'dark-theme');
            } else {
                document.body.className = 'light-theme';
                localStorage.setItem('theme', 'light-theme');
            }
        });
    }
}

function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate hamburger to X
            const spans = menuBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
                gsap.to(spans[1], { opacity: 0, duration: 0.3 });
                gsap.to(spans[2], { rotation: -45, y: -7, duration: 0.3 });
            } else {
                gsap.to(spans, { rotation: 0, y: 0, opacity: 1, duration: 0.3 });
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = menuBtn.querySelectorAll('span');
                gsap.to(spans, { rotation: 0, y: 0, opacity: 1, duration: 0.3 });
            });
        });
    }
}

function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        // Simple check: if href matches current page filename
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered entrance for main content
    gsap.from('.stagger-item', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
    });

    // Liquid background animation
    gsap.to('.liquid-bg', {
        y: 20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Scroll to Top Button Logic
    const scrollBtn = document.getElementById('scroll-top-btn');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Newsletter Form Submission (Google Sheets Stub)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            if (email) {
                // Here you would typically send data to Google Sheets via fetch
                console.log('Submitting email to Google Sheets:', email);
                alert('Thanks for subscribing! (Integration pending)');
                newsletterForm.reset();
            }
        });
    }
}
