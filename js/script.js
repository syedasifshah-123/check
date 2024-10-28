// Heade Scroll
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    // this.window.addEventListener("load", function () { 
        if (scrollTop < 1) {
            header.classList.remove('fixed');
            header.classList.remove('glassify');
        } else if (scrollTop > 40) {
            header.classList.remove('fixed');
            header.classList.add('glassify');
        } else {
            header.classList.add('fixed');
        }
    // });
    
});


const themeMenuSettingBtn = document.querySelector("[data-theme-setting-btn]");
const themeMenu = document.querySelector("[data-theme-menu]");
const navMenu = document.querySelector("[data-nav-menu]");
const navMenuBtn = document.querySelector("[data-nav-menu-btn]");

themeMenuSettingBtn.addEventListener("click", function () { 
    themeMenu.classList.toggle("active");

    if (themeMenu.classList.contains("active")) {
        
        if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
        }

    } 
});

navMenuBtn.addEventListener("click", function () {
    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        
        if (themeMenu.classList.contains("active")) {
            themeMenu.classList.remove("active");
        }
    } 
});


// Theme Changer

const setTheme = function (theme) {

    if (theme === 'auto') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', systemTheme);
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }

    localStorage.setItem('theme', theme);
    updateButtonState(theme);
};

/**
 * Initialize theme based on saved preference or default to 'auto'
 */

const storedTheme = localStorage.getItem('theme') || 'auto';
setTheme(storedTheme);

/**
 * Update active button state based on selected theme
 */

function updateButtonState(selectedTheme) {
    document.querySelectorAll('.item-list').forEach(btn => {
        const isActive = 
            (selectedTheme === 'dark' && btn.hasAttribute('data-dark-theme-btn')) ||
            (selectedTheme === 'light' && btn.hasAttribute('data-light-theme-btn')) ||
            (selectedTheme === 'auto' && btn.hasAttribute('data-auto-theme-btn'));
        btn.classList.toggle('active', isActive);
    });
}

/** 
 * Attach event listeners to theme buttons
 */

window.addEventListener('DOMContentLoaded', function () {
    
    const darkTheme = document.querySelector('[data-dark-theme-btn]');
    darkTheme.addEventListener('click', function () {
        setTheme('dark');
        themeMenu.classList.remove("active");
    });

    const lightTheme = document.querySelector('[data-light-theme-btn]');
    lightTheme.addEventListener('click', function () {
        setTheme('light');
        themeMenu.classList.remove("active");
    });


    const autoTheme = document.querySelector('[data-auto-theme-btn]');
    autoTheme.addEventListener('click', function () {
        setTheme('auto');
        themeMenu.classList.remove("active");
    });
});

/** 
 * Listen for system theme changes if 'auto' mode is active
 */

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'auto') {
        setTheme('auto');
    }
});



// Nav link

const marker = document.querySelector("[data-nav-marker]");
const navLink = document.querySelectorAll('[data-nav-link]');

function indicator(e) {
    marker.style.left = e.offsetLeft + "px";
    marker.style.width = e.offsetWidth + "px";
}

document.addEventListener('DOMContentLoaded', function () { 
    
    const homeLink = navLink[0];
    homeLink.style.color = "var(--on-primary)";
    indicator(homeLink);

});

navLink.forEach((link) => { 
    link.addEventListener("click", function (e) {

        navLink.forEach((l) => { l.style.color = "" });
        indicator(e.target);
        e.target.style.color = "var(--on-primary)";
        navMenu.classList.remove("active");

    });
});

window.addEventListener("resize", function () {
    const activeLink = [...navLink].find(link => link.style.color === "var(--on-primary)") || navLink[0];
    indicator(activeLink);
});