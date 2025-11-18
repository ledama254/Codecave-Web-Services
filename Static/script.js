// Codecave Web Services - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== INTERSECTION OBSERVER FOR REVEAL ANIMATIONS =====
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ===== ANIMATED COUNTERS =====
    const metricValues = document.querySelectorAll('.metric-value');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = targetValue / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= targetValue) {
                        current = targetValue;
                        clearInterval(timer);
                    }
                    
                    if (targetValue === 99.9) {
                        target.textContent = current.toFixed(1) + '%';
                    } else if (targetValue === 3) {
                        target.textContent = Math.floor(current) + 'x';
                    } else {
                        target.textContent = Math.floor(current);
                    }
                }, 16);
                
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    metricValues.forEach(value => {
        counterObserver.observe(value);
    });

    // ===== E-COMMERCE CART FUNCTIONALITY =====
    let cartCount = 0;
    const cartIndicator = document.querySelector('.cart-indicator');
    const cartCountElement = document.querySelector('.cart-count');
    const cartToast = new bootstrap.Toast(document.getElementById('cartToast'));
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            cartCountElement.textContent = cartCount;
            cartIndicator.classList.remove('d-none');
            
            // Animate the cart icon
            cartIndicator.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIndicator.style.transform = 'scale(1)';
            }, 300);
            
            // Show toast notification
            cartToast.show();
            
            // Optional: Add item to cart data structure
            const productName = this.getAttribute('data-product');
            const productPrice = this.getAttribute('data-price');
            console.log(`Added to cart: ${productName} - KSh ${productPrice}`);
        });
    });

    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server
            // For demo purposes, we'll just show a success message
            
            // Create and show success alert
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
            alertDiv.innerHTML = `
                <strong>Thank you!</strong> Your message has been sent successfully. We'll get back to you within 24 hours.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            
            contactForm.appendChild(alertDiv);
            
            // Reset form
            contactForm.reset();
            
            // Scroll to alert
            alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // ===== DYNAMIC YEAR IN FOOTER =====
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // ===== BACKGROUND ORBS ANIMATION =====
    function createFloatingOrbs() {
        const orbsContainer = document.createElement('div');
        orbsContainer.className = 'orbs-container';
        orbsContainer.style.position = 'fixed';
        orbsContainer.style.top = '0';
        orbsContainer.style.left = '0';
        orbsContainer.style.width = '100%';
        orbsContainer.style.height = '100%';
        orbsContainer.style.pointerEvents = 'none';
        orbsContainer.style.zIndex = '-1';
        orbsContainer.style.overflow = 'hidden';
        
        const orb1 = document.createElement('div');
        orb1.className = 'floating-orb orb-1';
        
        const orb2 = document.createElement('div');
        orb2.className = 'floating-orb orb-2';
        
        const orb3 = document.createElement('div');
        orb3.className = 'floating-orb orb-3';
        
        orbsContainer.appendChild(orb1);
        orbsContainer.appendChild(orb2);
        orbsContainer.appendChild(orb3);
        
        document.body.appendChild(orbsContainer);
    }
    
    createFloatingOrbs();

    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    function highlightNavLink() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);

    // ===== INITIALIZE BOOTSTRAP COMPONENTS =====
    // Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // ===== ADDITIONAL INTERACTIVITY =====
    
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.transition = 'opacity 0.5s ease';
        img.style.opacity = '0';
    });

    console.log('Codecave Web Services website initialized successfully');
});