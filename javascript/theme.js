/**
 * Gloria Academy & GIMS Journal - Universal Theme Manager
 * Automatically sets data-theme='light' or 'dark' on html element
 * and dynamically injects/binds the theme-toggle button on ALL pages.
 */

(function () {
    // 1. Instantly apply theme from localStorage (defaults to 'light')
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

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

        // Auto-inject theme button if header exists but button is missing
        if (!toggleBtn) {
            const headerNavTd = document.querySelector('.site-header table tr td:last-child') ||
                                document.querySelector('.site-header') ||
                                document.querySelector('header') ||
                                document.querySelector('.top-bar-table tr td:last-child') ||
                                document.querySelector('.row1') ||
                                document.body;
            if (headerNavTd) {
                toggleBtn = document.createElement('button');
                toggleBtn.id = 'theme-toggle';
                toggleBtn.className = 'theme-toggle-btn';
                toggleBtn.style.marginRight = '0.5rem';
                if (headerNavTd.firstChild) {
                    headerNavTd.insertBefore(toggleBtn, headerNavTd.firstChild);
                } else {
                    headerNavTd.appendChild(toggleBtn);
                }
            }
        }

        if (toggleBtn) {
            updateToggleButton(toggleBtn, activeTheme);

            // Avoid duplicate listeners
            if (!toggleBtn.dataset.bound) {
                toggleBtn.dataset.bound = 'true';
                toggleBtn.addEventListener('click', () => {
                    const currentTheme = document.documentElement.getAttribute('data-theme');
                    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
                    
                    document.documentElement.setAttribute('data-theme', nextTheme);
                    localStorage.setItem('theme', nextTheme);
                    
                    // Update all buttons if multiple exist
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
