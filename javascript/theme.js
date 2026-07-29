/**
 * Gloria Academy & GIMS Journal - Universal Theme Manager
 * Automatically sets data-theme='light' or 'dark' on html element
 * and dynamically injects/binds the theme-toggle button on ALL pages.
 */

(function () {
    // 1. Instantly apply theme (on smaller screens <= 900px, default mode is strictly 'light')
    function applyResponsiveTheme() {
        const isSmallScreen = window.innerWidth <= 900;
        let activeTheme = 'light';

        if (isSmallScreen) {
            // On smaller screens (<= 900px), default mode is ALWAYS 'light'
            activeTheme = 'light';
        } else {
            // On desktop (> 900px), use saved preference or default to 'light'
            activeTheme = localStorage.getItem('theme') || 'light';
        }

        document.documentElement.setAttribute('data-theme', activeTheme);
    }

    // Apply instantly before DOM renders
    applyResponsiveTheme();

    // Re-check on window resize
    window.addEventListener('resize', applyResponsiveTheme);

    function updateToggleButton(btn, theme) {
        if (!btn) return;
        if (theme === 'light') {
            btn.innerHTML = '🌙 Dark Mode';
            btn.setAttribute('title', 'Switch to Dark Mode');
        } else {
            btn.innerHTML = '☀️ Light Mode';
            btn.setAttribute('title', 'Switch to Light Mode');
        }
    }

    function initThemeToggle() {
        let toggleBtn = document.getElementById('theme-toggle');
        const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';

        if (toggleBtn) {
            updateToggleButton(toggleBtn, activeTheme);

            if (!toggleBtn.dataset.bound) {
                toggleBtn.dataset.bound = 'true';
                toggleBtn.addEventListener('click', () => {
                    const currentTheme = document.documentElement.getAttribute('data-theme');
                    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
                    
                    document.documentElement.setAttribute('data-theme', nextTheme);
                    localStorage.setItem('theme', nextTheme);
                    
                    document.querySelectorAll('#theme-toggle, .theme-toggle-btn').forEach(btn => {
                        updateToggleButton(btn, nextTheme);
                    });
                });
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }
})();

/**
 * Gloria Academy - Mobile Hamburger Menu Toggle
 * Wires up #menu-toggle to show/hide the .row1 main nav on small screens.
 */
(function () {
    function initHamburger() {
        const toggleBtn = document.getElementById('menu-toggle');
        const nav = document.querySelector('.row1');
        if (!toggleBtn || !nav) return;

        let closeTimeout = null;

        function openMenu() {
            if (closeTimeout) {
                clearTimeout(closeTimeout);
                closeTimeout = null;
            }
            nav.classList.remove('closing');
            nav.classList.add('open');
            toggleBtn.setAttribute('aria-expanded', 'true');
            toggleBtn.textContent = '✕';
        }

        function closeMenu() {
            if (!nav.classList.contains('open') || nav.classList.contains('closing')) return;
            nav.classList.add('closing');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.textContent = '☰';

            closeTimeout = setTimeout(function () {
                nav.classList.remove('open');
                nav.classList.remove('closing');
                closeTimeout = null;
            }, 160);
        }

        toggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            (nav.classList.contains('open') && !nav.classList.contains('closing')) ? closeMenu() : openMenu();
        });

        // Close when clicking outside the nav and not on the toggle button
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && e.target !== toggleBtn) {
                closeMenu();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMenu();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHamburger);
    } else {
        initHamburger();
    }
})();

/**
 * Smooth Page Transition Interceptor
 * Intercepts navigation to internal .htm pages to animate page exit & entry
 */
(function () {
    function initPageTransitions() {
        if (window._pageTransitionsBound) return;
        window._pageTransitionsBound = true;

        document.addEventListener('click', function (e) {
            const anchor = e.target.closest('a');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            const target = anchor.getAttribute('target');

            // Skip anchor fragments, javascript/mailto/tel links, external tabs, or missing hrefs
            if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:') || target === '_blank') {
                return;
            }

            // Ensure destination is an internal link (.htm page or relative route)
            const isInternal = !href.includes('://') || href.includes(window.location.hostname);
            if (!isInternal) return;

            e.preventDefault();
            document.body.classList.add('page-exit');

            setTimeout(function () {
                window.location.href = href;
            }, 60);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPageTransitions);
    } else {
        initPageTransitions();
    }
})();


