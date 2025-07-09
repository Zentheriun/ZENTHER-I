// One-Zenther/src/js/main.js

import { setupThreeJSBackground } from './modules/three-setup.js';

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 1500);
});

// Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
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

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = parseInt(counter.textContent); // Use let for mutable current
        const increment = target / 100;

        const updateCounter = () => {
            if (current < target) {
                current = Math.ceil(current + increment);
                counter.textContent = current;
                requestAnimationFrame(updateCounter); // Use requestAnimationFrame for smoother animation
            } else {
                counter.textContent = target; // Ensure it ends on the exact target
            }
        };
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target); // Unobserve after animation starts
        }
    });
});

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Typing Animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.classList.add('typing');

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing');
        }
    }
    type();
}

// Start typing animation when page loads
setTimeout(() => {
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) {
        typeWriter(heroTitle, 'SANTIAGO YATE', 150);
    }
}, 2000);

// Floating Elements
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    const symbols = ['⚡', '🚀', '💎', '⭐', '🔥', '💫', '✨', '🎯'];

    setInterval(() => {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.fontSize = (Math.random() * 20 + 10) + 'px';
        element.style.animationDuration = (Math.random() * 10 + 5) + 's';
        container.appendChild(element);

        setTimeout(() => {
            element.remove();
        }, 15000);
    }, 3000);
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            this.reset();
        }, 2000);
    }, 2000);
});

// Add glitch effect randomly
function addGlitchEffect() {
    const elements = document.querySelectorAll('.hero-title, .section-title');
    const randomElement = elements[Math.floor(Math.random() * elements.length)];

    randomElement.classList.add('glitch');
    setTimeout(() => {
        randomElement.classList.remove('glitch');
    }, 500);
}

// Random glitch effect every 30 seconds
setInterval(addGlitchEffect, 30000);

// Easter egg: Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === konami.join(',')) {
        // Activate special mode
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = ''; // Remove animation after 10 seconds
        }, 10000);
        konamiCode = []; // Reset the code to prevent multiple activations
    }
});

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createFloatingElements();

    const canvas = document.querySelector('#bg-3d');
    const heroSection = document.querySelector('.hero-section');
    if (canvas && heroSection) {
        setupThreeJSBackground(canvas, heroSection);
    }
});