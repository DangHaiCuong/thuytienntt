// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('canvas-container').appendChild(renderer.domElement);

camera.position.set(0, 0, 60);

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

// Create detailed, cute 3D Bear model
function createCuteBearModel() {
    const bearGroup = new THREE.Group();

    // Materials
    const bearMaterial = new THREE.MeshStandardMaterial({
        color: 0xffb3d9,
        roughness: 0.7,
        metalness: 0.1,
        emissive: 0xff69b4,
        emissiveIntensity: 0.15
    });

    const darkPinkMaterial = new THREE.MeshStandardMaterial({
        color: 0xff69b4,
        roughness: 0.5,
        metalness: 0.2
    });

    const whiteMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.1
    });

    const blackMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0.8
    });

    // BODY - Main rounded body
    const bodyGeometry = new THREE.SphereGeometry(2.5, 32, 32);
    bodyGeometry.scale(1, 1.1, 0.9);
    const body = new THREE.Mesh(bodyGeometry, bearMaterial);
    body.position.y = 0;
    bearGroup.add(body);

    // BELLY - Lighter colored belly
    const bellyGeometry = new THREE.SphereGeometry(1.8, 32, 32);
    bellyGeometry.scale(0.8, 1, 0.5);
    const belly = new THREE.Mesh(bellyGeometry, whiteMaterial);
    belly.position.set(0, 0.2, 1.9);
    bearGroup.add(belly);

    // HEAD - Large cute head
    const headGeometry = new THREE.SphereGeometry(2, 32, 32);
    headGeometry.scale(1, 0.95, 0.95);
    const head = new THREE.Mesh(headGeometry, bearMaterial);
    head.position.y = 3.5;
    bearGroup.add(head);
    bearGroup.userData.head = head;

    // EARS - Round fluffy ears
    const earGeometry = new THREE.SphereGeometry(0.8, 32, 32);

    const leftEar = new THREE.Mesh(earGeometry, bearMaterial);
    leftEar.position.set(-1.4, 4.8, 0);
    leftEar.scale.set(1, 0.8, 0.8);
    bearGroup.add(leftEar);
    bearGroup.userData.leftEar = leftEar;

    const rightEar = new THREE.Mesh(earGeometry, bearMaterial);
    rightEar.position.set(1.4, 4.8, 0);
    rightEar.scale.set(1, 0.8, 0.8);
    bearGroup.add(rightEar);
    bearGroup.userData.rightEar = rightEar;

    // EAR INSIDES - Pink inner ears
    const innerEarGeometry = new THREE.SphereGeometry(0.4, 32, 32);

    const leftInnerEar = new THREE.Mesh(innerEarGeometry, darkPinkMaterial);
    leftInnerEar.position.set(-1.4, 4.7, 0.3);
    leftInnerEar.scale.set(1, 0.7, 0.5);
    bearGroup.add(leftInnerEar);

    const rightInnerEar = new THREE.Mesh(innerEarGeometry, darkPinkMaterial);
    rightInnerEar.position.set(1.4, 4.7, 0.3);
    rightInnerEar.scale.set(1, 0.7, 0.5);
    bearGroup.add(rightInnerEar);

    // SNOUT - Cute rounded snout
    const snoutGeometry = new THREE.SphereGeometry(0.9, 32, 32);
    snoutGeometry.scale(1, 0.7, 0.8);
    const snout = new THREE.Mesh(snoutGeometry, whiteMaterial);
    snout.position.set(0, 3.2, 1.6);
    bearGroup.add(snout);

    // NOSE - Shiny black nose
    const noseGeometry = new THREE.SphereGeometry(0.35, 32, 32);
    noseGeometry.scale(1, 0.8, 0.7);
    const nose = new THREE.Mesh(noseGeometry, blackMaterial);
    nose.position.set(0, 3.7, 2.2);
    bearGroup.add(nose);

    // EYES - Big sparkly eyes
    const eyeWhiteGeometry = new THREE.SphereGeometry(0.45, 32, 32);

    const leftEyeWhite = new THREE.Mesh(eyeWhiteGeometry, whiteMaterial);
    leftEyeWhite.position.set(-0.7, 4, 1.7);
    bearGroup.add(leftEyeWhite);

    const rightEyeWhite = new THREE.Mesh(eyeWhiteGeometry, whiteMaterial);
    rightEyeWhite.position.set(0.7, 4, 1.7);
    bearGroup.add(rightEyeWhite);

    // Eye pupils
    const pupilGeometry = new THREE.SphereGeometry(0.25, 32, 32);

    const leftPupil = new THREE.Mesh(pupilGeometry, blackMaterial);
    leftPupil.position.set(-0.7, 4, 2.1);
    bearGroup.add(leftPupil);
    bearGroup.userData.leftPupil = leftPupil;

    const rightPupil = new THREE.Mesh(pupilGeometry, blackMaterial);
    rightPupil.position.set(0.7, 4, 2.1);
    bearGroup.add(rightPupil);
    bearGroup.userData.rightPupil = rightPupil;

    // Eye shine/sparkle
    const shineGeometry = new THREE.SphereGeometry(0.12, 16, 16);

    const leftShine = new THREE.Mesh(shineGeometry, whiteMaterial);
    leftShine.position.set(-0.6, 4.15, 2.25);
    bearGroup.add(leftShine);

    const rightShine = new THREE.Mesh(shineGeometry, whiteMaterial);
    rightShine.position.set(0.8, 4.15, 2.25);
    bearGroup.add(rightShine);

    // CHEEKS - Rosy cheeks
    const cheekGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    cheekGeometry.scale(0.6, 0.5, 0.3);

    const leftCheek = new THREE.Mesh(cheekGeometry, darkPinkMaterial);
    leftCheek.position.set(-1.3, 3.5, 1.5);
    bearGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeometry, darkPinkMaterial);
    rightCheek.position.set(1.3, 3.5, 1.5);
    bearGroup.add(rightCheek);

    // ARMS - Rounded arms with paws
    const armGeometry = new THREE.CapsuleGeometry(0.6, 1.8, 16, 32);

    const leftArm = new THREE.Mesh(armGeometry, bearMaterial);
    leftArm.position.set(-2.3, 0.5, 0.5);
    leftArm.rotation.z = 0.3;
    bearGroup.add(leftArm);
    bearGroup.userData.leftArm = leftArm;

    const rightArm = new THREE.Mesh(armGeometry, bearMaterial);
    rightArm.position.set(2.3, 0.5, 0.5);
    rightArm.rotation.z = -0.3;
    bearGroup.add(rightArm);
    bearGroup.userData.rightArm = rightArm;

    // PAWS - Rounded paws
    const pawGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    pawGeometry.scale(1, 0.7, 1);

    const leftPaw = new THREE.Mesh(pawGeometry, bearMaterial);
    leftPaw.position.set(-2.7, -0.8, 0.7);
    bearGroup.add(leftPaw);

    const rightPaw = new THREE.Mesh(pawGeometry, bearMaterial);
    rightPaw.position.set(2.7, -0.8, 0.7);
    bearGroup.add(rightPaw);

    // PAW PADS
    const padGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    padGeometry.scale(1, 0.5, 1);

    const leftPad = new THREE.Mesh(padGeometry, darkPinkMaterial);
    leftPad.position.set(-2.7, -1, 1.2);
    bearGroup.add(leftPad);

    const rightPad = new THREE.Mesh(padGeometry, darkPinkMaterial);
    rightPad.position.set(2.7, -1, 1.2);
    bearGroup.add(rightPad);

    // LEGS - Short cute legs
    const legGeometry = new THREE.CapsuleGeometry(0.7, 1.2, 16, 32);

    const leftLeg = new THREE.Mesh(legGeometry, bearMaterial);
    leftLeg.position.set(-1.2, -2, 0);
    bearGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeometry, bearMaterial);
    rightLeg.position.set(1.2, -2, 0);
    bearGroup.add(rightLeg);

    // FEET - Big rounded feet
    const footGeometry = new THREE.SphereGeometry(0.9, 32, 32);
    footGeometry.scale(0.8, 0.6, 1.2);

    const leftFoot = new THREE.Mesh(footGeometry, bearMaterial);
    leftFoot.position.set(-1.2, -3, 0.3);
    bearGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(footGeometry, bearMaterial);
    rightFoot.position.set(1.2, -3, 0.3);
    bearGroup.add(rightFoot);

    // FOOT PADS
    const footPadGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    footPadGeometry.scale(0.8, 0.4, 1);

    const leftFootPad = new THREE.Mesh(footPadGeometry, darkPinkMaterial);
    leftFootPad.position.set(-1.2, -3.3, 0.8);
    bearGroup.add(leftFootPad);

    const rightFootPad = new THREE.Mesh(footPadGeometry, darkPinkMaterial);
    rightFootPad.position.set(1.2, -3.3, 0.8);
    bearGroup.add(rightFootPad);

    return bearGroup;
}

// Add multiple 3D bears to the scene - positioned for visual appeal
const bears3D = [];
const bearPositions = [
    { x: -38, y: 18, z: 8 },
    { x: 42, y: -8, z: 6 },
    { x: -32, y: -18, z: 12 },
    { x: 38, y: 22, z: 10 },
    { x: -40, y: -5, z: 15 },
    { x: 40, y: 12, z: 14 },
    { x: 0, y: 28, z: 7 }
];

bearPositions.forEach((pos, index) => {
    const bear = createCuteBearModel();
    bear.position.set(pos.x, pos.y, pos.z);
    const scale = 1.2 + Math.random() * 0.3;
    bear.scale.set(scale, scale, scale);
    bear.castShadow = true;
    bear.receiveShadow = true;
    scene.add(bear);
    bears3D.push({
        mesh: bear,
        baseY: pos.y,
        baseRotationY: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
        rotationSpeed: 0.003 + Math.random() * 0.007,
        wavePhase: Math.random() * Math.PI * 2,
        bouncePhase: Math.random() * Math.PI * 2,
        isHovered: false,
        clickTime: 0,
        baseScale: scale
    });
});

// Add lights for 3D bears
const ambientLight = new THREE.AmbientLight(0xfff5f5, 0.8);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
mainLight.position.set(20, 30, 40);
mainLight.castShadow = true;
mainLight.shadow.mapSize.width = 2048;
mainLight.shadow.mapSize.height = 2048;
scene.add(mainLight);

const pointLight1 = new THREE.PointLight(0xff69b4, 2, 150);
pointLight1.position.set(10, 10, 20);
pointLight1.castShadow = true;
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffc0cb, 1.5, 150);
pointLight2.position.set(-10, -10, 20);
pointLight2.castShadow = true;
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xff1493, 1, 100);
pointLight3.position.set(0, 0, 30);
scene.add(pointLight3);

// Mouse interaction
const mouse = new THREE.Vector2();
const mouseWorld = new THREE.Vector3();
let mouseAttraction = false;

// Raycaster for bear interaction
const raycaster = new THREE.Raycaster();
let hoveredBear = null;

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    mouseWorld.set(
        mouse.x * 50,
        mouse.y * 50,
        0
    );

    // Check for bear hover
    raycaster.setFromCamera(mouse, camera);
    const bearMeshes = bears3D.map(b => b.mesh);
    const intersects = raycaster.intersectObjects(bearMeshes, true);

    // Reset previous hover
    if (hoveredBear) {
        hoveredBear.isHovered = false;
    }

    if (intersects.length > 0) {
        // Find which bear was intersected
        for (let bear of bears3D) {
            if (intersects[0].object.parent === bear.mesh ||
                intersects[0].object.parent.parent === bear.mesh) {
                bear.isHovered = true;
                hoveredBear = bear;
                document.body.style.cursor = 'pointer';
                break;
            }
        }
    } else {
        hoveredBear = null;
        document.body.style.cursor = 'default';
    }
});

window.addEventListener('mousedown', () => {
    mouseAttraction = true;
});

window.addEventListener('mouseup', () => {
    mouseAttraction = false;
});

// Click on bears for reaction
window.addEventListener('click', () => {
    if (hoveredBear) {
        hoveredBear.clickTime = Date.now();
        // Trigger jump/bounce animation
        hoveredBear.bouncePhase = 0;
    }
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

    // Animate 3D bears with interactions
    bears3D.forEach((bearObj, index) => {
        const time = Date.now() * 0.001;
        const timeSinceClick = (Date.now() - bearObj.clickTime) / 1000;

        // Float animation
        let yOffset = Math.sin(time * bearObj.speed + bearObj.bouncePhase) * 3;

        // Jump animation when clicked
        if (timeSinceClick < 0.8) {
            const jumpProgress = timeSinceClick / 0.8;
            yOffset += Math.sin(jumpProgress * Math.PI) * 8;
        }

        bearObj.mesh.position.y = bearObj.baseY + yOffset;

        // Rotation animation - look at mouse when hovered
        if (bearObj.isHovered) {
            const targetRotation = Math.atan2(
                camera.position.x - bearObj.mesh.position.x,
                camera.position.z - bearObj.mesh.position.z
            );
            bearObj.baseRotationY += (targetRotation - bearObj.baseRotationY) * 0.1;
            bearObj.mesh.rotation.y = bearObj.baseRotationY;

            // Scale up when hovered
            const hoverScale = bearObj.baseScale * 1.15;
            bearObj.mesh.scale.set(hoverScale, hoverScale, hoverScale);

            // Wiggle ears
            if (bearObj.mesh.userData.leftEar) {
                bearObj.mesh.userData.leftEar.rotation.z = Math.sin(time * 8) * 0.3;
                bearObj.mesh.userData.rightEar.rotation.z = Math.sin(time * 8 + Math.PI) * 0.3;
            }

            // Excited arm waving
            if (bearObj.mesh.userData.leftArm) {
                bearObj.mesh.userData.leftArm.rotation.z = 0.3 + Math.sin(time * 6) * 0.5;
                bearObj.mesh.userData.rightArm.rotation.z = -0.3 + Math.sin(time * 6 + Math.PI) * 0.5;
            }
        } else {
            // Normal rotation
            bearObj.baseRotationY += bearObj.rotationSpeed;
            bearObj.mesh.rotation.y = bearObj.baseRotationY;
            bearObj.mesh.rotation.x = Math.sin(time * bearObj.speed * 0.5) * 0.1;

            // Normal scale with pulse
            const scale = bearObj.baseScale + Math.sin(time * bearObj.speed * 2) * 0.08;
            bearObj.mesh.scale.set(scale, scale, scale);

            // Gentle ear movement
            if (bearObj.mesh.userData.leftEar) {
                bearObj.mesh.userData.leftEar.rotation.z = Math.sin(time * 2) * 0.1;
                bearObj.mesh.userData.rightEar.rotation.z = Math.sin(time * 2 + Math.PI) * 0.1;
            }

            // Subtle arm movement
            if (bearObj.mesh.userData.leftArm) {
                bearObj.mesh.userData.leftArm.rotation.z = 0.3 + Math.sin(time * 1.5) * 0.15;
                bearObj.mesh.userData.rightArm.rotation.z = -0.3 + Math.sin(time * 1.5 + Math.PI) * 0.15;
            }
        }

        // Head tilt
        if (bearObj.mesh.userData.head) {
            bearObj.mesh.userData.head.rotation.z = Math.sin(time * 1.2 + index) * 0.1;
        }

        // Eye tracking - pupils follow mouse
        if (bearObj.mesh.userData.leftPupil && bearObj.mesh.userData.rightPupil) {
            // Calculate direction to camera/mouse
            const lookAtX = (mouse.x - bearObj.mesh.position.x / 50) * 0.15;
            const lookAtY = (mouse.y - bearObj.mesh.position.y / 50) * 0.15;

            bearObj.mesh.userData.leftPupil.position.z = 2.1 + lookAtX;
            bearObj.mesh.userData.leftPupil.position.x = -0.7 + lookAtY;

            bearObj.mesh.userData.rightPupil.position.z = 2.1 + lookAtX;
            bearObj.mesh.userData.rightPupil.position.x = 0.7 + lookAtY;
        }
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
