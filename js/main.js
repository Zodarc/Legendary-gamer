/* ============================================================================
   LEGENDARY GAMER - Main JavaScript
   Core functionality and interactivity
   ============================================================================ */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ============================================================================
// APP INITIALIZATION
// ============================================================================

function initializeApp() {
    initNavigation();
    initScrollAnimations();
    initHeroAnimations();
    initParticleEffects();
    initLazyLoading();
    initSmoothScrolling();
    initPerformanceOptimizations();
    
    // Add loading class removal after everything loads
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 500);
    });
}

// ============================================================================
// NAVIGATION
// ============================================================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });

        // Close mobile menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Active navigation link based on scroll position
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current) && current !== '') {
            link.classList.add('active');
        }
    });

    // Special case for home page
    if (window.scrollY < 200) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '#') {
                link.classList.add('active');
            }
        });
    }
}

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate, .category-card, .content-card, .product-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Add staggered animation for multiple elements
                if (entry.target.closest('.categories-grid, .content-grid')) {
                    const siblings = entry.target.parentElement.children;
                    Array.from(siblings).forEach((sibling, index) => {
                        setTimeout(() => {
                            sibling.classList.add('in-view');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================================================
// HERO ANIMATIONS
// ============================================================================

function initHeroAnimations() {
    const titleWords = document.querySelectorAll('.title-word');
    
    // Animate title words on load
    titleWords.forEach((word, index) => {
        setTimeout(() => {
            word.classList.add('animate');
        }, index * 200);
    });

    // Parallax effect for hero visual
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroVisual.style.transform = `translateY(${rate}px)`;
        });
    }

    // Mouse move effect for floating icons
    const floatingIcons = document.querySelector('.floating-icons');
    if (floatingIcons) {
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const icons = floatingIcons.querySelectorAll('.icon');
            icons.forEach((icon, index) => {
                const x = (mouseX - 0.5) * (10 + index * 5);
                const y = (mouseY - 0.5) * (10 + index * 5);
                icon.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
}

// ============================================================================
// PARTICLE EFFECTS
// ============================================================================

function initParticleEffects() {
    // Create floating particles in the background
    createParticles();
    
    // Particle effects on button hover
    const ctaButtons = document.querySelectorAll('.cta-button, .product-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            createButtonParticles(this);
        });
    });
}

function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.body.appendChild(particleContainer);

    function addParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (3 + Math.random() * 2) + 's';
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 5000);
    }

    // Add particles periodically
    setInterval(addParticle, 2000);
}

function createButtonParticles(button) {
    const rect = button.getBoundingClientRect();
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = '#00ffff';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).addEventListener('finish', () => {
            particle.remove();
        });
    }
}

// ============================================================================
// LAZY LOADING
// ============================================================================

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyVideos = document.querySelectorAll('video[data-src]');
    
    const lazyLoadObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.tagName === 'IMG') {
                    element.src = element.dataset.src;
                    element.removeAttribute('data-src');
                } else if (element.tagName === 'VIDEO') {
                    element.src = element.dataset.src;
                    element.removeAttribute('data-src');
                    element.load();
                }
                
                element.classList.add('loaded');
                lazyLoadObserver.unobserve(element);
            }
        });
    });

    lazyImages.forEach(img => lazyLoadObserver.observe(img));
    lazyVideos.forEach(video => lazyLoadObserver.observe(video));
}

// ============================================================================
// SMOOTH SCROLLING
// ============================================================================

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================================================
// PERFORMANCE OPTIMIZATIONS
// ============================================================================

function initPerformanceOptimizations() {
    // Throttle scroll events
    let scrollTimer = null;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', function() {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function() {
            if (originalScrollHandler) originalScrollHandler();
        }, 10);
    });

    // Preload critical resources
    preloadCriticalResources();
    
    // Add GPU acceleration to animated elements
    const animatedElements = document.querySelectorAll('.hero-visual, .floating-icons, .monitor-glow');
    animatedElements.forEach(element => {
        element.classList.add('gpu-accelerated');
    });
}

function preloadCriticalResources() {
    // Preload critical CSS for other pages
    const criticalPages = ['shop.html', 'games.html', 'tips.html', 'legendarytv.html', 'about.html'];
    
    criticalPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
    });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Generate random number between min and max
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// ============================================================================
// CATEGORY INTERACTIONS
// ============================================================================

// Add click handlers for category cards
document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            if (category) {
                // Navigate to shop page with category filter
                window.location.href = `shop.html?category=${category}`;
            }
        });
        
        // Add pulse effect on hover
        card.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    });
});

// ============================================================================
// CONTENT CARD INTERACTIONS
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    const contentCards = document.querySelectorAll('.content-card');
    
    contentCards.forEach(card => {
        card.addEventListener('click', function() {
            // Navigate to tips page or specific content
            window.location.href = 'tips.html';
        });
    });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could implement error reporting here
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

// ============================================================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================================================

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }
});

// Focus management for better accessibility
function manageFocus() {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('.modal'); // If you add modals later
    
    if (modal) {
        const focusableContent = modal.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        document.addEventListener('keydown', function(e) {
            const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
            
            if (!isTabPressed) return;
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        });
    }
}

// ============================================================================
// CONSOLE STYLING (Fun Easter Egg)
// ============================================================================

console.log('%c🎮 LEGENDARY GAMER 🎮', 'color: #00ffff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ffff;');
console.log('%cYour Loadout, Your Legacy', 'color: #b833ff; font-size: 14px; font-weight: bold;');
console.log('%cWelcome to the code, fellow gamer! 🚀', 'color: #39ff14; font-size: 12px;');