// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

camera.position.z = 50;

// Particle system
const particleCount = 1500;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const velocities = [];
const attractions = [];

for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 100;
    positions[i + 1] = (Math.random() - 0.5) * 100;
    positions[i + 2] = (Math.random() - 0.5) * 100;

    velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
    });
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Particle material with gradient
const particleMaterial = new THREE.PointsMaterial({
    size: 0.3,
    color: 0xff69b4,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Mouse interaction
const mouse = new THREE.Vector2();
const mouseWorld = new THREE.Vector3();
let mouseAttraction = false;

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    mouseWorld.set(
        mouse.x * 50,
        mouse.y * 50,
        0
    );
});

window.addEventListener('mousedown', () => {
    mouseAttraction = true;
});

window.addEventListener('mouseup', () => {
    mouseAttraction = false;
});

// Touch support for mobile
window.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    mouseWorld.set(mouse.x * 50, mouse.y * 50, 0);
    mouseAttraction = true;
});

window.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    mouseWorld.set(mouse.x * 50, mouse.y * 50, 0);
});

window.addEventListener('touchend', () => {
    mouseAttraction = false;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    const positions = particleSystem.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Get particle position
        let px = positions[i3];
        let py = positions[i3 + 1];
        let pz = positions[i3 + 2];

        // Apply velocity
        px += velocities[i].x;
        py += velocities[i].y;
        pz += velocities[i].z;

        // Mouse attraction/repulsion
        if (mouseAttraction) {
            const dx = mouseWorld.x - px;
            const dy = mouseWorld.y - py;
            const dz = mouseWorld.z - pz;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance > 0.1) {
                const force = 0.5 / distance;
                px += dx * force;
                py += dy * force;
                pz += dz * force;
            }
        }

        // Boundary check with bounce
        if (Math.abs(px) > 50) {
            velocities[i].x *= -1;
            px = Math.sign(px) * 50;
        }
        if (Math.abs(py) > 50) {
            velocities[i].y *= -1;
            py = Math.sign(py) * 50;
        }
        if (Math.abs(pz) > 50) {
            velocities[i].z *= -1;
            pz = Math.sign(pz) * 50;
        }

        // Update positions
        positions[i3] = px;
        positions[i3 + 1] = py;
        positions[i3 + 2] = pz;
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;

    // Slow rotation of the entire system
    particleSystem.rotation.y += 0.001;

    // Color shift over time (pink tones)
    const time = Date.now() * 0.0001;
    particleMaterial.color.setHSL((Math.sin(time) + 1) / 2 * 0.1 + 0.9, 0.8, 0.7);

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
