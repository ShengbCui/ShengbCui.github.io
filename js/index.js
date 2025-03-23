// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize all functions
    initParticlesBackground();
    initNameAnimation();
    initNavbarScroll();
    initBackToTop();
    initDarkMode();
    initSmoothScroll();
    initTiltEffects();
    animateOnScroll();
    initGSAPAnimations();
    
    // Navbar behavior on scroll
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            });
        }
    }
    
    // Back to top button
    function initBackToTop() {
        const backToTopButton = document.querySelector('.back-to-top');
        
        if (backToTopButton) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('show');
                } else {
                    backToTopButton.classList.remove('show');
                }
            });
            
            backToTopButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Dark mode toggle
    function initDarkMode() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-mode');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }
        
        // Toggle theme on button click
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                
                if (document.body.classList.contains('dark-mode')) {
                    localStorage.setItem('theme', 'dark');
                    if (themeIcon) {
                        themeIcon.classList.remove('fa-moon');
                        themeIcon.classList.add('fa-sun');
                    }
                } else {
                    localStorage.setItem('theme', 'light');
                    if (themeIcon) {
                        themeIcon.classList.remove('fa-sun');
                        themeIcon.classList.add('fa-moon');
                    }
                }
            });
        }
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                // Skip if it's an empty href or just "#"
                if (this.getAttribute('href') === '#' || this.getAttribute('href') === '') {
                    return;
                }
                
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    
                    if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                }
            });
        });
    }
    
    // Initialize particles.js background
    function initParticlesBackground() {
        if (document.getElementById('particles-js')) {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#3a506b"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#3a506b",
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 0.8
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }
    }
    
    // Initialize name animation
    function initNameAnimation() {
        const textElements = document.querySelectorAll('.text-animate');
        textElements.forEach((el, index) => {
            el.style.setProperty('--char-index', index);
        });
    }
    
    // Initialize tilt effect for cards
    function initTiltEffects() {
        const tiltElements = document.querySelectorAll('.blog-card, .research-card');
        
        if (window.innerWidth > 768) {
            VanillaTilt.init(tiltElements, {
                max: 5,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
                scale: 1.03,
                perspective: 1000
            });
        }
    }
    
    // Initialize GSAP animations
    function initGSAPAnimations() {
        // Only initialize if GSAP is available
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            // Register ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);
            
            // Research cards animation
            gsap.utils.toArray('.research-card').forEach((card, i) => {
                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                        toggleActions: "play none none none"
                    },
                    delay: i * 0.1
                });
            });
            
            // Method badges animation
            gsap.utils.toArray('.method-badge').forEach((badge, i) => {
                gsap.from(badge, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.5,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: badge,
                        start: "top bottom-=80",
                        toggleActions: "play none none none"
                    },
                    delay: i * 0.05
                });
            });
            
            // Publication items animation
            gsap.utils.toArray('.publication-item').forEach((item) => {
                gsap.from(item, {
                    x: -100,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom-=100",
                        toggleActions: "play none none none"
                    }
                });
            });
            
            // Blog cards animation
            gsap.utils.toArray('.blog-card').forEach((card, i) => {
                gsap.from(card, {
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                        toggleActions: "play none none none"
                    },
                    delay: i * 0.2
                });
            });
            
            // Contact info animation
            gsap.utils.toArray('.contact-info-item').forEach((item, i) => {
                gsap.from(item, {
                    y: 50,
                    opacity: 0,
                    duration: 0.6,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom-=80",
                        toggleActions: "play none none none"
                    },
                    delay: i * 0.15
                });
            });
            
            // Section headers animation
            gsap.utils.toArray('.section-header').forEach((header) => {
                const elements = header.querySelectorAll('h2, .section-divider, .section-subtitle');
                
                gsap.from(elements, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: header,
                        start: "top bottom-=150",
                        toggleActions: "play none none none"
                    }
                });
            });
        }
    }
    
    // Animation on scroll (fallback if GSAP is not available)
    function animateOnScroll() {
        // Only use this if GSAP is not available
        if (typeof gsap === 'undefined') {
            const animateElements = document.querySelectorAll('.research-card, .publication-item, .blog-card, .method-badge, .contact-info-item');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            animateElements.forEach(element => {
                observer.observe(element);
            });
        }
    }
    
    // Handle active nav links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            if (window.scrollY >= (sectionTop - navbarHeight - 50)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add service worker for offline functionality
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
});