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

        function openMenu() {
            nav.classList.add('open');
            toggleBtn.setAttribute('aria-expanded', 'true');
            toggleBtn.textContent = '✕';
        }

        function closeMenu() {
            nav.classList.remove('open');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.textContent = '☰';
        }

        toggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            nav.classList.contains('open') ? closeMenu() : openMenu();
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


