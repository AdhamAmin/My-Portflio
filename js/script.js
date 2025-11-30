document.addEventListener('DOMContentLoaded', () => {
    loadIncludes();
    initTheme();
    injectBlobs();
    // Animations will be initialized after includes are loaded to ensure DOM is ready
});

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

async function loadIncludes() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
        try {
            const response = await fetch('includes/header.html');
            const data = await response.text();
            headerPlaceholder.innerHTML = data;
            initThemeToggle(); // Re-bind listener after loading

            // Re-run animations for header elements if needed
            gsap.from('header', { y: -50, opacity: 0, duration: 1, ease: 'power3.out' });
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    if (footerPlaceholder) {
        try {
            const response = await fetch('includes/footer.html');
            const data = await response.text();
            footerPlaceholder.innerHTML = data;
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }

    // Initialize main content animations
    initAnimations();
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.className = savedTheme;
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

    // Liquid background animation (simple version for now)
    gsap.to('.liquid-bg', {
        y: 20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}
