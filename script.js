document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    let isMenuOpen = false;

    // Handle Navbar Scrolled State
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // Toggle Mobile Menu
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenu.classList.add('mobile-menu-active');
            // Change to 'X' icon
            menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            mobileMenu.classList.remove('mobile-menu-active');
            // Change back to burger icon
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // Smooth Scroll effect for internal links (overriding native if needed, though native works great via html class scroll-smooth)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active Link Highlighting on Scroll (Scroll Spy)
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-link'); // Already selected above as mobileLinks, but reselecting/aliasing is fine, actually let's just use what's there

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4 // Trigger when 40% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Update Desktop Nav
                desktopNavLinks.forEach(link => {
                    link.classList.remove('text-brand-accent');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('text-brand-accent');
                    }
                });

                // Update Mobile Nav
                mobileLinks.forEach(link => {
                    link.classList.remove('text-brand-accent');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('text-brand-accent');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
});
