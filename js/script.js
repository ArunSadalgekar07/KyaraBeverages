/**
 * Kyara Beverages Website JavaScript
 * Handles navigation, form validation, and interactive features
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
    initializeAnimations();
    initializeScrollProgress();
    initializeRevealAnimations();
});

/**
 * Navigation Menu Functionality
 */
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
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

/**
 * Scroll Effects and Navbar Styling
 */
function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Navbar background opacity based on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        // Hide/show navbar on scroll (optional feature)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature, .product-card, .about-text');
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Contact Form Functionality
 */
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (!form) return;

    // Form field elements
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    
    // Error message elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Real-time validation
    nameField.addEventListener('blur', () => validateName());
    emailField.addEventListener('blur', () => validateEmail());
    messageField.addEventListener('blur', () => validateMessage());

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            submitForm();
        } else {
            showFormStatus('Please correct the errors above.', 'error');
        }
    });

    /**
     * Validate name field
     */
    function validateName() {
        const name = nameField.value.trim();
        
        if (name.length < 2) {
            showFieldError(nameError, 'Name must be at least 2 characters long.');
            return false;
        } else if (name.length > 50) {
            showFieldError(nameError, 'Name must be less than 50 characters.');
            return false;
        } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
            showFieldError(nameError, 'Name can only contain letters, spaces, hyphens, and apostrophes.');
            return false;
        }
        
        hideFieldError(nameError);
        return true;
    }

    /**
     * Validate email field
     */
    function validateEmail() {
        const email = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showFieldError(emailError, 'Email address is required.');
            return false;
        } else if (!emailRegex.test(email)) {
            showFieldError(emailError, 'Please enter a valid email address.');
            return false;
        } else if (email.length > 100) {
            showFieldError(emailError, 'Email address is too long.');
            return false;
        }
        
        hideFieldError(emailError);
        return true;
    }

    /**
     * Validate message field
     */
    function validateMessage() {
        const message = messageField.value.trim();
        
        if (message.length < 10) {
            showFieldError(messageError, 'Message must be at least 10 characters long.');
            return false;
        } else if (message.length > 1000) {
            showFieldError(messageError, 'Message must be less than 1000 characters.');
            return false;
        }
        
        hideFieldError(messageError);
        return true;
    }

    /**
     * Show field error
     */
    function showFieldError(errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            errorElement.parentElement.querySelector('input, textarea').style.borderColor = '#e74c3c';
        }
    }

    /**
     * Hide field error
     */
    function hideFieldError(errorElement) {
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            errorElement.parentElement.querySelector('input, textarea').style.borderColor = '#e0e0e0';
        }
    }

    /**
     * Submit form (simulation)
     */
    function submitForm() {
        const submitButton = form.querySelector('.submit-button');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonIcon = submitButton.querySelector('i');
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        buttonText.textContent = 'Sending...';
        buttonIcon.className = 'fas fa-spinner fa-spin';
        
        // Simulate form submission delay
        setTimeout(() => {
            // Reset button state
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
            buttonText.textContent = 'Send Message';
            buttonIcon.className = 'fas fa-paper-plane';
            
            // Show success message
            showFormStatus('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            // Reset form
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                hideFormStatus();
            }, 5000);
            
        }, 2000); // 2 second delay to simulate network request
    }

    /**
     * Show form status message
     */
    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = `form-status ${type}`;
            formStatus.style.display = 'block';
            
            // Scroll to status message
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    /**
     * Hide form status message
     */
    function hideFormStatus() {
        if (formStatus) {
            formStatus.style.display = 'none';
            formStatus.className = 'form-status';
        }
    }
}

/**
 * Initialize scroll-triggered animations
 */
function initializeAnimations() {
    // Counter animation for statistics (if needed in future)
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                counter.textContent = Math.floor(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
    }

    // Parallax effect for hero section
    function initParallax() {
        const hero = document.querySelector('.hero');
        
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                if (window.innerWidth > 768) { // Only on desktop
                    hero.style.transform = `translateY(${rate}px)`;
                }
            });
        }
    }

    // Initialize parallax if supported
    if (window.innerWidth > 768) {
        initParallax();
    }
}

/**
 * Utility Functions
 */

// Debounce function for performance optimization
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

// Throttle function for scroll events
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

// Add error handling for any uncaught errors
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could send error to analytics service here
});

// Handle promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Could send error to analytics service here
});

/**
 * Scroll Progress Bar
 */
function initializeScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', throttle(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + '%';
    }, 10));
}

/**
 * Reveal Animations on Scroll
 */
function initializeRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100); // Stagger animation
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Advanced Interactive Features
 */
function initializeAdvancedFeatures() {
    // Cursor trail effect (subtle)
    let mouseTrail = [];
    const trailLength = 8;
    
    document.addEventListener('mousemove', (e) => {
        mouseTrail.push({
            x: e.clientX,
            y: e.clientY,
            timestamp: Date.now()
        });
        
        if (mouseTrail.length > trailLength) {
            mouseTrail.shift();
        }
        
        // Clean up old trail points
        mouseTrail = mouseTrail.filter(point => 
            Date.now() - point.timestamp < 500
        );
    });
    
    // Smooth page transitions
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced product card interactions
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });
    
    // Typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeTimer = setInterval(() => {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                if (i > originalText.length) {
                    clearInterval(typeTimer);
                }
            }, 50);
        }, 1500);
    }
}

/**
 * Loading Screen Management
 */
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 600);
        }, 1200);
    });
}

/**
 * Back to Top Button
 */
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }, 100));
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Enhanced Image Loading
 */
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.setAttribute('data-loaded', 'false');
        
        if (img.complete) {
            img.setAttribute('data-loaded', 'true');
        } else {
            img.addEventListener('load', () => {
                img.setAttribute('data-loaded', 'true');
            });
        }
    });
}

// Initialize advanced features
document.addEventListener('DOMContentLoaded', () => {
    initializeLoadingScreen();
    initializeBackToTop();
    initializeImageLoading();
    setTimeout(initializeAdvancedFeatures, 1000);
});

// Expose some functions globally for potential external use
window.KyaraBeverages = {
    initializeNavigation,
    initializeScrollEffects,
    initializeContactForm,
    initializeScrollProgress,
    initializeRevealAnimations,
    debounce,
    throttle
};
