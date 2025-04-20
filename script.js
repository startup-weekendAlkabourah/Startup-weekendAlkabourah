// Mobile menu toggle
document.getElementById('navbarToggle').addEventListener('click', function () {
    document.getElementById('navbarMenu').classList.toggle('active');
    this.classList.toggle('active');
});

// Schedule tabs function
function showDay(dayId, event) {
    // Hide all days
    document.querySelectorAll('.schedule-day').forEach(day => {
        day.classList.remove('active');
    });

    // Deactivate all tabs
    document.querySelectorAll('.schedule-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected day
    document.getElementById(dayId).classList.add('active');

    // Activate clicked tab
    event.currentTarget.classList.add('active');
}

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (document.getElementById('navbarMenu').classList.contains('active')) {
                document.getElementById('navbarMenu').classList.remove('active');
                document.getElementById('navbarToggle').classList.remove('active');
            }
        }
    });
});

// Active section tracking
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-link');
    const heroLinks = document.querySelectorAll('.hero-nav-link');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        // Update navbar links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Update hero nav links
        heroLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Special case for home section
        if (window.scrollY < 100) {
            document.querySelector('.navbar-link[href="#hero"]').classList.add('active');
            document.querySelector('.hero-nav-link[href="#hero"]').classList.add('active');
        }
    });
});

// Animation on scroll
const animateElements = document.querySelectorAll('.animate');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

animateElements.forEach(element => {
    observer.observe(element);
});

// Initialize first day as active
document.addEventListener('DOMContentLoaded', function () {
    const firstTab = document.querySelector('.schedule-tab');
    if (firstTab) {
        showDay('day1', { currentTarget: firstTab });
    }
});