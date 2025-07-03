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
        const current = parseInt(counter.textContent);
        const increment = target / 100;

        if (current < target) {
            counter.textContent = Math.ceil(current + increment);
            setTimeout(() => animateCounters(), 20);
        }
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
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

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createFloatingElements();
});

// Three.js Background Animation
const canvas = document.querySelector('#bg-3d');
const heroSection = document.querySelector('.hero-section');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, heroSection.clientWidth / heroSection.clientHeight, 0.1, 1000);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x6366f1, 0.8);
directionalLight.position.set(10, 10, 5);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0x8b5cf6, 1, 100);
pointLight.position.set(-10, -10, -5);
scene.add(pointLight);

// Create geometric shapes
const shapes = [];
const geometries = [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(0.8, 32, 32),
    new THREE.TorusGeometry(0.8, 0.3, 16, 100),
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.TetrahedronGeometry(1, 0),
    new THREE.DodecahedronGeometry(1, 0),
    new THREE.ConeGeometry(0.8, 1.5, 8),
    new THREE.CylinderGeometry(0.5, 0.5, 1.5, 8)
];

// Create multiple shape groups
for (let i = 0; i < 60; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = new THREE.MeshPhongMaterial({
        wireframe: Math.random() > 0.5,
        transparent: true,
        opacity: Math.random() * 0.6 + 0.2,
        color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6)
    });

    const mesh = new THREE.Mesh(geometry, material);

    // Position
    mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20 - 5
    );

    // Rotation
    mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );

    // Scale
    const scale = Math.random() * 1.5 + 0.5;
    mesh.scale.set(scale, scale, scale);

    // Animation properties
    mesh.userData = {
        rotationSpeed: {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        },
        floatSpeed: Math.random() * 0.02 + 0.01,
        originalY: mesh.position.y,
        hue: Math.random()
    };

    shapes.push(mesh);
    scene.add(mesh);
}

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Update mouse interaction
    targetX = mouseX * 2;
    targetY = mouseY * 2;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Animate shapes
    shapes.forEach((shape, index) => {
        // Rotation
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;

        // Floating movement
        shape.position.y = shape.userData.originalY + Math.sin(time + index) * 2;
        shape.position.x += Math.sin(time * 0.5 + index) * 0.01;
        shape.position.z += Math.cos(time * 0.3 + index) * 0.01;

        // Color animation
        const hue = (shape.userData.hue + time * 0.1) % 1;
        shape.material.color.setHSL(hue, 0.8, 0.6);

        // Opacity pulsing
        shape.material.opacity = 0.3 + Math.sin(time * 2 + index) * 0.2;
    });

    renderer.render(scene, camera);
}

// Handle resize
function onResize() {
    const width = heroSection.clientWidth;
    const height = heroSection.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

window.addEventListener('resize', onResize);

// Start animation
animate();

// Performance optimization
let isVisible = true;
document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
});

// Pause animation when not visible to save resources
function optimizedAnimate() {
    if (isVisible) {
        animate();
    } else {
        requestAnimationFrame(optimizedAnimate);
    }
}

// Scroll-based animation speed
window.addEventListener('scroll', () => {
    const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    shapes.forEach(shape => {
        shape.userData.rotationSpeed.x *= (1 + scrollProgress * 0.5);
        shape.userData.rotationSpeed.y *= (1 + scrollProgress * 0.5);
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === konami.join(',')) {
        // Activate special mode
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);