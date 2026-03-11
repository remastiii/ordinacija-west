/**
 * Ordinacija West - Main JavaScript
 * Modern and professional website functionality
 */

'use strict';

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

/**
 * Initialize all website functionality
 */
function initializeWebsite() {
    // Navigation
    initializeNavigation();
    initializeSmoothScrolling();
    initializeScrollSpy();
    
    // Hero
    initializeHeroVideo();
    
    // Animations
    initializeScrollAnimations();
    initializeLazyLoading();
    
    // Gallery
    initializeGallery();
    
    // Before & After Sliders
    initializeBeforeAfterSliders();
    
    // FAQ
    initializeFAQ();
    
    // Contact Form
    initializeContactForm();
    enhanceContactForm();
    
    // Back to Top
    initializeBackToTop();
    
    // Pricing tabs
    initializePricingTabs();
    
    // Mobile optimizations
    initializeMobileOptimizations();
    
    // Performance optimizations
    initializePerformanceOptimizations();
}

/**
 * Navigation functionality
 */
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                // Close all dropdowns
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    // Dropdown functionality for mobile
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                // Only prevent default on mobile
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Handle dropdown links
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const serviceType = this.dataset.service;
            
            if (serviceType) {
                e.preventDefault();
                
                // Navigate to services section
                const servicesSection = document.querySelector('#services');
                if (servicesSection) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = servicesSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Highlight specific service card
                    setTimeout(() => {
                        highlightServiceCard(serviceType);
                    }, 800);
                }
                
                // Close mobile menu
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Close dropdown
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
}

/**
 * Highlight specific service card
 */
function highlightServiceCard(serviceType) {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const title = card.querySelector('.service-title').textContent.toLowerCase();
        
        if ((serviceType === 'stomatology' && title.includes('stomatologija')) ||
            (serviceType === 'aesthetic' && title.includes('estetska'))) {
            
            // Add highlight effect
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 25px -5px rgba(44, 90, 160, 0.2), 0 10px 10px -5px rgba(44, 90, 160, 0.1)';
            card.style.borderColor = 'var(--primary-color)';
            card.style.border = '2px solid var(--primary-color)';
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
                card.style.border = '';
            }, 3000);
        }
    });
}

/**
 * Hero video functionality
 */
function initializeHeroVideo() {
    const video = document.querySelector('.hero-video-bg');
    
    if (!video) return;
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        video.pause();
        video.style.display = 'none';
        return;
    }
    
    // Ensure video plays properly
    video.addEventListener('loadeddata', function() {
        video.play().catch(function(error) {
            console.log('Video autoplay failed:', error);
            // Fallback: hide video if autoplay fails
            video.style.display = 'none';
        });
    });
    
    // Pause video when page is not visible (performance optimization)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            video.pause();
        } else {
            video.play().catch(function(error) {
                console.log('Video play failed:', error);
            });
        }
    });
    
    // Pause video when out of viewport (performance optimization)
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                video.play().catch(function(error) {
                    console.log('Video play failed:', error);
                });
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(video);
}

/**
 * Smooth scrolling for navigation links
 */
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[data-section]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll spy for active navigation
 */
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    
    if (sections.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Scroll animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay for staggered animation
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach((element, index) => {
        // Add staggered delays for elements in the same section
        const section = element.closest('section');
        const elementsInSection = section ? section.querySelectorAll('.fade-in') : [element];
        const elementIndex = Array.from(elementsInSection).indexOf(element);
        element.dataset.delay = elementIndex * 100;
        
        observer.observe(element);
    });
}

/**
 * Lazy loading for images
 */
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

/**
 * Gallery functionality
 */
function initializeGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Gallery item click handlers
    const galleryButtons = document.querySelectorAll('.gallery-btn');
    galleryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const galleryItem = this.closest('.gallery-item');
            const img = galleryItem.querySelector('img');
            const info = galleryItem.querySelector('.gallery-info');
            
            // Simple modal implementation (can be enhanced)
            showImageModal(img.src, info.querySelector('h4').textContent);
        });
    });
}

/**
 * Simple image modal
 */
function showImageModal(src, title) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-overlay">
            <div class="image-modal-content">
                <button class="image-modal-close" aria-label="Zatvori">&times;</button>
                <img src="${src}" alt="${title}" class="image-modal-img">
                <div class="image-modal-title">${title}</div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .image-modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        .image-modal-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            text-align: center;
        }
        .image-modal-img {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
            border-radius: 8px;
        }
        .image-modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .image-modal-title {
            color: white;
            margin-top: 1rem;
            font-size: 1.2rem;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    const closeModal = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    };
    
    modal.querySelector('.image-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.image-modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

/**
 * FAQ functionality
 */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
            
            // Handle keyboard accessibility
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
            
            // Make questions focusable
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
            
            // Update aria-expanded when toggled
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const isExpanded = item.classList.contains('active');
                        question.setAttribute('aria-expanded', isExpanded.toString());
                    }
                });
            });
            
            observer.observe(item, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    });
}

/**
 * Contact form functionality
 */
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const formSuccess = document.getElementById('form-success');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous validation
        clearFormErrors();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.opacity = '0';
        btnLoader.style.display = 'block';
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Form data:', data);
            
            // Hide form and show success message
            form.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                formSuccess.style.display = 'none';
                
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.opacity = '1';
                btnLoader.style.display = 'none';
            }, 5000);
            
        }, 2000);
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                clearFieldError(this);
            }
        });
    });
}

/**
 * Form validation
 */
function validateForm() {
    const form = document.getElementById('contact-form');
    const nameField = form.querySelector('#name');
    const phoneField = form.querySelector('#phone');
    const emailField = form.querySelector('#email');
    const messageField = form.querySelector('#message');
    const privacyField = form.querySelector('#privacy');
    
    let isValid = true;
    
    // Name validation
    if (!nameField.value.trim()) {
        showFieldError(nameField, 'Ime i prezime je obavezno');
        isValid = false;
    } else if (nameField.value.trim().length < 2) {
        showFieldError(nameField, 'Ime mora imati najmanje 2 karaktera');
        isValid = false;
    }
    
    // Phone validation
    const phonePattern = /^[\+]?[0-9\s\-\(\)]+$/;
    if (!phoneField.value.trim()) {
        showFieldError(phoneField, 'Telefon je obavezan');
        isValid = false;
    } else if (!phonePattern.test(phoneField.value.trim()) || phoneField.value.trim().length < 8) {
        showFieldError(phoneField, 'Unesite validan broj telefona');
        isValid = false;
    }
    
    // Email validation (optional but if provided must be valid)
    if (emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
            showFieldError(emailField, 'Unesite validan email');
            isValid = false;
        }
    }
    
    // Message validation
    if (!messageField.value.trim()) {
        showFieldError(messageField, 'Poruka je obavezna');
        isValid = false;
    } else if (messageField.value.trim().length < 10) {
        showFieldError(messageField, 'Poruka mora imati najmanje 10 karaktera');
        isValid = false;
    }
    
    // Privacy checkbox validation
    if (!privacyField.checked) {
        showFieldError(privacyField, 'Morate se složiti sa politikom privatnosti');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Validate individual field
 */
function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    
    switch (fieldName) {
        case 'name':
            if (!value) {
                showFieldError(field, 'Ime i prezime je obavezno');
            } else if (value.length < 2) {
                showFieldError(field, 'Ime mora imati najmanje 2 karaktera');
            } else {
                clearFieldError(field);
            }
            break;
            
        case 'phone':
            const phonePattern = /^[\+]?[0-9\s\-\(\)]+$/;
            if (!value) {
                showFieldError(field, 'Telefon je obavezan');
            } else if (!phonePattern.test(value) || value.length < 8) {
                showFieldError(field, 'Unesite validan broj telefona');
            } else {
                clearFieldError(field);
            }
            break;
            
        case 'email':
            if (value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    showFieldError(field, 'Unesite validan email');
                } else {
                    clearFieldError(field);
                }
            } else {
                clearFieldError(field);
            }
            break;
            
        case 'message':
            if (!value) {
                showFieldError(field, 'Poruka je obavezna');
            } else if (value.length < 10) {
                showFieldError(field, 'Poruka mora imati najmanje 10 karaktera');
            } else {
                clearFieldError(field);
            }
            break;
    }
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error');
    
    formGroup.classList.add('error');
    errorElement.textContent = message;
    field.setAttribute('aria-invalid', 'true');
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.form-error');
    
    formGroup.classList.remove('error');
    errorElement.textContent = '';
    field.removeAttribute('aria-invalid');
}

/**
 * Clear all form errors
 */
function clearFormErrors() {
    const formGroups = document.querySelectorAll('.form-group.error');
    formGroups.forEach(group => {
        group.classList.remove('error');
        const errorElement = group.querySelector('.form-error');
        const field = group.querySelector('input, textarea');
        
        if (errorElement) errorElement.textContent = '';
        if (field) field.removeAttribute('aria-invalid');
    });
}

/**
 * Back to top button
 */
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Mobile optimizations
 */
function initializeMobileOptimizations() {
    // Handle viewport height on mobile
    const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    
    // Touch event optimizations
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Improve touch scrolling on iOS
        document.body.style.webkitOverflowScrolling = 'touch';
    }
    
    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

/**
 * Performance optimizations
 */
function initializePerformanceOptimizations() {
    // Throttle scroll events
    let ticking = false;
    const scrollEvents = [];
    
    const updateScrollEvents = () => {
        scrollEvents.forEach(callback => callback());
        ticking = false;
    };
    
    const throttledScroll = (callback) => {
        scrollEvents.push(callback);
        if (!ticking) {
            requestAnimationFrame(updateScrollEvents);
            ticking = true;
        }
    };
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Handle resize events here
            const event = new Event('debouncedResize');
            window.dispatchEvent(event);
        }, 250);
    });
    
    // Preload critical resources
    const preloadLink = (href, as = 'fetch') => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        document.head.appendChild(link);
    };
    
    // Add loading states
    document.documentElement.classList.add('js-loaded');
}

/**
 * Analytics and tracking (placeholder)
 */
function initializeAnalytics() {
    // Google Analytics or other tracking code would go here
    // Track form submissions, button clicks, etc.
    
    const trackEvent = (category, action, label = null) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
        
        console.log('Event tracked:', { category, action, label });
    };
    
    // Track important user interactions
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a, button');
        if (target) {
            const text = target.textContent.trim();
            if (text.includes('Zakaži') || text.includes('Kontakt')) {
                trackEvent('User Engagement', 'CTA Click', text);
            }
        }
    });
}

// Initialize analytics
document.addEventListener('DOMContentLoaded', initializeAnalytics);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Log errors to analytics or error reporting service
});

// Service Worker registration (for caching and offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

/**
 * Initialize Pricing Tabs functionality
 */
function initializePricingTabs() {
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const pricingContents = document.querySelectorAll('.pricing-content');
    
    if (pricingTabs.length === 0) return;
    
    pricingTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            pricingTabs.forEach(t => t.classList.remove('active'));
            pricingContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(`${targetTab}-pricing`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

/**
 * WhatsApp integration with enhanced tracking
 */
function sendWhatsAppMessage(phoneNumber, message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Track WhatsApp click
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
            'phone_number': phoneNumber,
            'message_preview': message.substring(0, 50)
        });
    }
    
    window.open(whatsappURL, '_blank');
}

/**
 * Enhanced form submission with WhatsApp option
 */
function enhanceContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Add WhatsApp quick contact button
    const whatsappQuickBtn = document.createElement('button');
    whatsappQuickBtn.type = 'button';
    whatsappQuickBtn.className = 'btn btn-whatsapp btn-full';
    whatsappQuickBtn.style.marginBottom = '15px';
    whatsappQuickBtn.innerHTML = `
        <i class="fab fa-whatsapp"></i>
        Brzi kontakt preko WhatsApp-a
    `;
    
    whatsappQuickBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value || 'Potencijalni pacijent';
        const phone = document.getElementById('phone').value || '';
        const service = document.getElementById('service').value || 'opštu konsultaciju';
        
        let message = `Pozdrav, zanima me vaša usluga. `;
        if (name !== 'Potencijalni pacijent') {
            message += `Moje ime je ${name}. `;
        }
        if (phone) {
            message += `Moj broj telefona je ${phone}. `;
        }
        message += `Interesuje me ${service}. Kada mogu da dođem na termin?`;
        
        sendWhatsAppMessage('381643456789', message);
    });
    
    // Insert before submit button
    const submitBtn = contactForm.querySelector('#submit-btn');
    if (submitBtn) {
        submitBtn.parentNode.insertBefore(whatsappQuickBtn, submitBtn);
    }
}

/**
 * Initialize Before & After Comparison Sliders
 */
function initializeBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.comparison-slider');
    
    sliders.forEach(slider => {
        initializeSingleSlider(slider);
    });
}

function initializeSingleSlider(slider) {
    const container = slider.querySelector('.comparison-container');
    const afterImage = slider.querySelector('.comparison-after');
    const handle = slider.querySelector('.comparison-slider-handle');
    
    if (!container || !afterImage || !handle) return;
    
    let isDragging = false;
    let currentX = 50; // Start at 50% (middle)
    
    // Set initial position
    updateSliderPosition(currentX);
    
    // Mouse events
    handle.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', endDrag);
    
    // Touch events for mobile
    handle.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('touchmove', handleDrag, { passive: false });
    document.addEventListener('touchend', endDrag);
    
    // Click to move slider
    container.addEventListener('click', handleClick);
    
    // Keyboard support
    handle.addEventListener('keydown', handleKeyboard);
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('role', 'slider');
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');
    handle.setAttribute('aria-valuenow', '50');
    
    function startDrag(e) {
        isDragging = true;
        slider.style.cursor = 'grabbing';
        e.preventDefault();
    }
    
    function handleDrag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        
        const rect = container.getBoundingClientRect();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const x = ((clientX - rect.left) / rect.width) * 100;
        
        currentX = Math.max(0, Math.min(100, x));
        updateSliderPosition(currentX);
    }
    
    function endDrag() {
        if (isDragging) {
            isDragging = false;
            slider.style.cursor = 'grab';
        }
    }
    
    function handleClick(e) {
        if (isDragging) return;
        
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        currentX = Math.max(0, Math.min(100, x));
        
        // Smooth animation to new position
        afterImage.style.transition = 'clip-path 0.3s ease';
        handle.style.transition = 'left 0.3s ease';
        
        updateSliderPosition(currentX);
        
        // Remove transition after animation
        setTimeout(() => {
            afterImage.style.transition = '';
            handle.style.transition = '';
        }, 300);
    }
    
    function handleKeyboard(e) {
        let newX = currentX;
        
        switch(e.key) {
            case 'ArrowLeft':
                newX = Math.max(0, currentX - 5);
                break;
            case 'ArrowRight':
                newX = Math.min(100, currentX + 5);
                break;
            case 'Home':
                newX = 0;
                break;
            case 'End':
                newX = 100;
                break;
            default:
                return;
        }
        
        e.preventDefault();
        currentX = newX;
        
        // Smooth animation
        afterImage.style.transition = 'clip-path 0.2s ease';
        handle.style.transition = 'left 0.2s ease';
        
        updateSliderPosition(currentX);
        
        setTimeout(() => {
            afterImage.style.transition = '';
            handle.style.transition = '';
        }, 200);
    }
    
    function updateSliderPosition(x) {
        const clampedX = Math.max(0, Math.min(100, x));
        
        // Update clip path for after image
        afterImage.style.clipPath = `inset(0 ${100 - clampedX}% 0 0)`;
        
        // Update handle position
        handle.style.left = `${clampedX}%`;
        
        // Update ARIA value
        handle.setAttribute('aria-valuenow', Math.round(clampedX));
    }
    
    // Auto-animation on scroll into view (optional)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a subtle animation when the slider comes into view
                setTimeout(() => {
                    currentX = 75;
                    afterImage.style.transition = 'clip-path 1s ease';
                    handle.style.transition = 'left 1s ease';
                    updateSliderPosition(currentX);
                    
                    setTimeout(() => {
                        currentX = 25;
                        updateSliderPosition(currentX);
                        
                        setTimeout(() => {
                            currentX = 50;
                            updateSliderPosition(currentX);
                            
                            setTimeout(() => {
                                afterImage.style.transition = '';
                                handle.style.transition = '';
                            }, 500);
                        }, 500);
                    }, 500);
                }, 500);
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -10% 0px'
    });
    
    observer.observe(slider);
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeWebsite,
        validateForm,
        showFieldError,
        clearFieldError,
        initializePricingTabs,
        sendWhatsAppMessage,
        enhanceContactForm,
        initializeBeforeAfterSliders
    };
}