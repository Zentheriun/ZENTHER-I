// One-Zenther/src/js/modules/three-setup.js

import * as THREE from 'three';

export function setupThreeJSBackground(canvasElement, heroSectionElement) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, heroSectionElement.clientWidth / heroSectionElement.clientHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasElement, alpha: true, antialias: true });
    renderer.setSize(heroSectionElement.clientWidth, heroSectionElement.clientHeight);
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
    let isVisible = true;

    function animate() {
        if (isVisible) {
            requestAnimationFrame(animate);
        } else {
            // If not visible, request next frame only when visibility changes
            return;
        }

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
        const width = heroSectionElement.clientWidth;
        const height = heroSectionElement.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    window.addEventListener('resize', onResize);

    // Performance optimization: Pause animation when not visible to save resources
    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
        if (isVisible) {
            // Resume animation if it was paused
            animate();
        }
    });

    // Scroll-based animation speed
    window.addEventListener('scroll', () => {
        const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        shapes.forEach(shape => {
            // Adjust rotation speed based on scroll
            shape.userData.rotationSpeed.x = (Math.random() - 0.5) * 0.02 * (1 + scrollProgress * 0.5);
            shape.userData.rotationSpeed.y = (Math.random() - 0.5) * 0.02 * (1 + scrollProgress * 0.5);
        });
    });

    // Start animation
    animate();
}