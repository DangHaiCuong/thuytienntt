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

// Create 3D Bear models using spheres
function createBearModel() {
    const bearGroup = new THREE.Group();

    // Bear body (main sphere)
    const bodyGeometry = new THREE.SphereGeometry(2, 32, 32);
    const bearMaterial = new THREE.MeshPhongMaterial({
        color: 0xffc0cb,
        shininess: 30,
        emissive: 0xff69b4,
        emissiveIntensity: 0.2
    });
    const body = new THREE.Mesh(bodyGeometry, bearMaterial);
    bearGroup.add(body);

    // Bear head
    const headGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const head = new THREE.Mesh(headGeometry, bearMaterial);
    head.position.y = 2.5;
    bearGroup.add(head);

    // Bear ears
    const earGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const leftEar = new THREE.Mesh(earGeometry, bearMaterial);
    leftEar.position.set(-1, 3.5, 0.2);
    bearGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, bearMaterial);
    rightEar.position.set(1, 3.5, 0.2);
    bearGroup.add(rightEar);

    // Bear snout
    const snoutGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const snoutMaterial = new THREE.MeshPhongMaterial({
        color: 0xffb6c1,
        shininess: 20
    });
    const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
    snout.position.set(0, 2.3, 1.3);
    bearGroup.add(snout);

    // Bear arms
    const armGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const leftArm = new THREE.Mesh(armGeometry, bearMaterial);
    leftArm.position.set(-2, 0.5, 0.5);
    bearGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, bearMaterial);
    rightArm.position.set(2, 0.5, 0.5);
    bearGroup.add(rightArm);

    // Bear legs
    const legGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const leftLeg = new THREE.Mesh(legGeometry, bearMaterial);
    leftLeg.position.set(-1, -2, 0);
    bearGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, bearMaterial);
    rightLeg.position.set(1, -2, 0);
    bearGroup.add(rightLeg);

    return bearGroup;
}

// Add multiple 3D bears to the scene
const bears3D = [];
const bearPositions = [
    { x: -20, y: 10, z: -20 },
    { x: 25, y: -15, z: -15 },
    { x: -15, y: -10, z: -25 },
    { x: 20, y: 15, z: -30 }
];

bearPositions.forEach((pos, index) => {
    const bear = createBearModel();
    bear.position.set(pos.x, pos.y, pos.z);
    bear.scale.set(0.5, 0.5, 0.5);
    scene.add(bear);
    bears3D.push({
        mesh: bear,
        baseY: pos.y,
        speed: 0.5 + Math.random() * 0.5,
        rotationSpeed: 0.005 + Math.random() * 0.01
    });
});

// Add lights for 3D bears
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xff69b4, 1, 100);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffc0cb, 0.8, 100);
pointLight2.position.set(-10, -10, 10);
scene.add(pointLight2);

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

    // Animate 3D bears
    bears3D.forEach((bearObj, index) => {
        const time = Date.now() * 0.001;

        // Float animation
        bearObj.mesh.position.y = bearObj.baseY + Math.sin(time * bearObj.speed) * 3;

        // Rotation animation
        bearObj.mesh.rotation.y += bearObj.rotationSpeed;
        bearObj.mesh.rotation.x = Math.sin(time * bearObj.speed * 0.5) * 0.1;

        // Slight scale pulse
        const scale = 0.5 + Math.sin(time * bearObj.speed * 2) * 0.05;
        bearObj.mesh.scale.set(scale, scale, scale);
    });

    // Animate lights
    pointLight1.position.x = Math.sin(time * 0.5) * 20;
    pointLight1.position.z = Math.cos(time * 0.5) * 20;

    pointLight2.position.x = Math.cos(time * 0.7) * 20;
    pointLight2.position.z = Math.sin(time * 0.7) * 20;

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
