
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and tab contents
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            // Add active class to clicked button
            this.classList.add('active');

            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.querySelector(`.tab-content[data-tab="${tabId}"]`).classList.add('active');
        });
    });

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Rest of your existing JavaScript...
    //});


    //document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    window.addEventListener('load', function() {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);

        // Animate hero elements
        animateHero();
    });

    // Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    themeSwitch.addEventListener('change', function() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', this.checked ? 'dark' : 'light');
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        themeSwitch.checked = true;
        document.body.classList.add('dark-theme');
    }

    // Initialize Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#3a86ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#3a86ff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });

    // Animate project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1
        });
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Project modal
    const projectModal = document.querySelector('.project-modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-modal');

    document.addEventListener('click', function(e) {
        if (e.target.closest('.project-card')) {
            const card = e.target.closest('.project-card');
            // Here you would populate the modal with project details
            // For now we'll just show the modal
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    closeModal.addEventListener('click', function() {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    projectModal.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Testimonial slider
    if (document.querySelector('.testimonial-slider')) {
        const testimonialSlider = new Swiper('.testimonial-slider', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    }

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            if (name.value.trim() === '') {
                showError(name, 'Please enter your name');
                return;
            }

            if (email.value.trim() === '') {
                showError(email, 'Please enter your email');
                return;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'Please enter a valid email');
                return;
            }

            if (message.value.trim() === '') {
                showError(message, 'Please enter your message');
                return;
            }

            // Form is valid - you would typically send the data to a server here
            // For this example, we'll just show a success message
            showSuccess();
            this.reset();
        });
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = document.createElement('small');
        error.className = 'error-message';
        error.textContent = message;
        error.style.color = 'var(--accent-color)';
        formGroup.appendChild(error);

        input.style.borderColor = 'var(--accent-color)';

        setTimeout(() => {
            error.remove();
            input.style.borderColor = '#ddd';
        }, 3000);
    }


    function showSuccess() {
        const success = document.createElement('div');
        success.className = 'success-message';
        success.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Thank you! Your message has been sent successfully.</p>
        `;
        success.style.position = 'fixed';
        success.style.bottom = '30px';
        success.style.right = '30px';
        success.style.background = 'var(--primary-color)';
        success.style.color = 'white';
        success.style.padding = '15px 20px';
        success.style.borderRadius = '10px';
        success.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        success.style.zIndex = '1000';
        success.style.display = 'flex';
        success.style.alignItems = 'center';
        success.style.gap = '10px';
        success.style.animation = 'fadeInUp 0.5s ease';

        document.body.appendChild(success);

        setTimeout(() => {
            success.style.animation = 'fadeOutDown 0.5s ease';
            setTimeout(() => {
                success.remove();
            }, 500);
        }, 3000);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Hero animation
    function animateHero() {
        const titleWords = document.querySelectorAll('.title-word');
        const subtitle = document.querySelector('.hero-subtitle');
        const buttons = document.querySelector('.hero-btns');

        gsap.to(titleWords, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });

        gsap.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.8,
            ease: "power2.out"
        });

        gsap.to(buttons, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 1.2,
            ease: "power2.out"
        });
    }

    // Animate skill bars and radial progress
    const skillBars = document.querySelectorAll('.skill-progress');
    const radialProgress = document.querySelectorAll('.progress-fill');

    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });

    radialProgress.forEach(circle => {
        const value = circle.parentElement.getAttribute('data-value');
        const circumference = 2 * Math.PI * 70;
        const offset = circumference - (value / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });
});