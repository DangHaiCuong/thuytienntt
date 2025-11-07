// 2D Interactive effects with 3D card tilt - no Three.js needed!

// 3D Tilt effect for credit card
const card = document.querySelector('.bio-card-3d');

if (card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
}

// 2D Interactive effects - no Three.js needed!

// Smooth parallax effect for bears on mouse move
document.addEventListener('mousemove', (e) => {
    const bears = document.querySelectorAll('.cute-bear');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    bears.forEach((bear, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 30;
        const y = (mouseY - 0.5) * speed * 30;

        bear.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Interactive hover effects for bears
const bears = document.querySelectorAll('.cute-bear');
bears.forEach(bear => {
    bear.addEventListener('mouseenter', () => {
        bear.style.transform += ' scale(1.2) rotate(10deg)';
    });

    bear.addEventListener('mouseleave', () => {
        bear.style.transform = bear.style.transform.replace(' scale(1.2) rotate(10deg)', '');
    });

    // Click to make bear jump
    bear.addEventListener('click', () => {
        bear.style.animation = 'none';
        setTimeout(() => {
            bear.style.animation = '';
        }, 10);

        bear.classList.add('jumping');
        setTimeout(() => {
            bear.classList.remove('jumping');
        }, 600);
    });
});

// Particle attraction to mouse
const particles = document.querySelector('.particles');
if (particles) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        particles.style.setProperty('--mouse-x', x + 'px');
        particles.style.setProperty('--mouse-y', y + 'px');
    });
}

// Add sparkle effect on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Smooth card float animation
const card = document.querySelector('.bio-card');
let floatDirection = 1;
setInterval(() => {
    const currentTransform = card.style.transform || '';
    floatDirection = -floatDirection;
}, 4000);

// Profile picture upload/change functionality
const profilePicture = document.querySelector('.profile-picture');
const profileImg = document.getElementById('profileImg');

if (profilePicture && profileImg) {
    // Make profile picture clickable
    profilePicture.style.cursor = 'pointer';

    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    // Click to change picture
    profilePicture.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                profileImg.src = event.target.result;
                // Save to localStorage
                localStorage.setItem('profileImage', event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Load saved profile picture on page load
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        profileImg.src = savedImage;
    }

    // Add hover effect to indicate it's clickable
    profilePicture.addEventListener('mouseenter', () => {
        profilePicture.style.transform = 'scale(1.05)';
    });

    profilePicture.addEventListener('mouseleave', () => {
        profilePicture.style.transform = 'scale(1)';
    });
}

console.log('✨ Discord-style bio page loaded successfully!');
