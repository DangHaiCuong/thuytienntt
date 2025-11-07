// Enhanced animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Namecard 3D tilt effect
    const namecard = document.querySelector('.namecard');
    
    if (namecard) {
        namecard.addEventListener('mousemove', function(e) {
            const rect = namecard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            namecard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        namecard.addEventListener('mouseleave', function() {
            namecard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    }

    // Link cards 3D tilt effect
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateX(0)';
        });
    });

    // Parallax effect for orbs based on mouse movement
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        const orbs = document.querySelectorAll('.gradient-orb');
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 30;
            const x = mouseX * speed - speed / 2;
            const y = mouseY * speed - speed / 2;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Smooth scroll reveal
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.namecard-wrapper, .links-section, .footer');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Floating decorations random movement
    const decorations = document.querySelectorAll('.decoration');
    
    decorations.forEach((decoration, index) => {
        // Random initial position
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        decoration.style.left = randomX + '%';
        decoration.style.top = randomY + '%';
        
        // Random animation delay
        decoration.style.animationDelay = -(Math.random() * 15) + 's';
        
        // Random animation duration
        decoration.style.animationDuration = (10 + Math.random() * 10) + 's';
    });

    // Avatar click effect
    const avatar = document.querySelector('.avatar');
    
    if (avatar) {
        avatar.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
            
            // Add bounce animation
            this.style.transform = 'scale(1.1) rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 500);
        });
    }

    // Status dot enhanced pulse
    const statusDot = document.querySelector('.status-dot');
    if (statusDot) {
        setInterval(() => {
            statusDot.style.transform = 'scale(1.3)';
            setTimeout(() => {
                statusDot.style.transform = 'scale(1)';
            }, 300);
        }, 3000);
    }

    // Copy email on click
    const emailCard = document.querySelector('.email');
    if (emailCard) {
        emailCard.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.querySelector('.link-handle').textContent;
            
            // Try to copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showToast('📧 Email copied to clipboard!');
                });
            } else {
                // Fallback: open mailto link
                window.location.href = this.href;
            }
        });
    }

    // Toast notification function
    function showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: linear-gradient(135deg, #ff1b6b, #ff6b9d);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(255, 27, 107, 0.5);
            z-index: 9999;
            opacity: 0;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
            toast.style.opacity = '1';
        }, 10);

        // Animate out
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Enhanced chip animation
    const chipLines = document.querySelectorAll('.chip-line');
    setInterval(() => {
        chipLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '0.3';
                setTimeout(() => {
                    line.style.opacity = '1';
                }, 100);
            }, index * 100);
        });
    }, 3000);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Reset all transforms
            namecard.style.transform = '';
            linkCards.forEach(card => {
                card.style.transform = '';
            });
        }
    });

    // Performance optimization: reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.querySelectorAll('.gradient-orb').forEach(orb => {
            orb.style.animation = 'none';
        });
    }

    // Add entrance animation
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Prevent context menu on certain elements
document.addEventListener('contextmenu', function(e) {
    if (e.target.closest('.avatar') || e.target.closest('.link-card')) {
        e.preventDefault();
    }
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// ============================================
// 🧸🍬 Interactive Teddy Bears & Candies
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('interactiveElements');
    
    // Kawaii items - teddy bears holding hearts
    const items = [
        '🐻❤️', '🐻❤️', '🐻❤️', '🐻❤️', '🐻❤️',  // teddy bears with hearts
        '🐻❤️', '🐻❤️', '🐻❤️', '🐻❤️', '🐻❤️'   // more bears with hearts
    ];
    
    const interactiveItems = [];
    
    // Function to create kawaii SVG characters
    function createKawaiiSVG(type) {
        const colors = {
            mint: '#7DFFEA',
            lightPink: '#FFD4F0', 
            lavender: '#E5D4FF',
            peach: '#FFE5D4',
            brown: '#D4A373',
            darkBrown: '#8B6F47'
        };
        
        switch(type) {
            case '🐻❤️': // Kawaii Bear Holding Heart (Candy style)
                const bearColor = Math.random() > 0.5 ? colors.brown : colors.peach;
                const gradId = 'grad' + Math.random().toString(36).substr(2, 9);
                const heartGradId2 = 'heartGrad' + Math.random().toString(36).substr(2, 9);
                const bgHeartGradId = 'bgHeartGrad' + Math.random().toString(36).substr(2, 9);
                return `
                    <svg viewBox="0 0 140 140" width="110" height="110">
                        <defs>
                            <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#7DFFEA;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#A78BFA;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#FDA4AF;stop-opacity:1" />
                            </linearGradient>
                            <linearGradient id="${heartGradId2}" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#FF1B6B;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#FF6B9D;stop-opacity:1" />
                            </linearGradient>
                            <linearGradient id="${bgHeartGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#FFD4F0;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#FDA4AF;stop-opacity:1" />
                            </linearGradient>
                            <filter id="shadowBear">
                                <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#A78BFA" flood-opacity="0.5"/>
                            </filter>
                        </defs>
                        
                        <!-- Background Big Heart (like candy wrapper) - Faded -->
                        <path d="M 70 125 Q 30 90 30 60 Q 30 30 52 30 Q 70 30 70 52 Q 70 30 88 30 Q 110 30 110 60 Q 110 90 70 125 Z" 
                              fill="url(#${bgHeartGradId})" opacity="0.15"/>
                        
                        <!-- Left Ear -->
                        <circle cx="42" cy="35" r="16" fill="url(#${gradId})" filter="url(#shadowBear)"/>
                        <circle cx="42" cy="35" r="13" fill="${bearColor}"/>
                        <circle cx="42" cy="35" r="8" fill="#FFF5E6"/>
                        
                        <!-- Right Ear -->
                        <circle cx="98" cy="35" r="16" fill="url(#${gradId})" filter="url(#shadowBear)"/>
                        <circle cx="98" cy="35" r="13" fill="${bearColor}"/>
                        <circle cx="98" cy="35" r="8" fill="#FFF5E6"/>
                        
                        <!-- Head (Bigger and rounder) -->
                        <circle cx="70" cy="60" r="36" fill="url(#${gradId})" filter="url(#shadowBear)"/>
                        <circle cx="70" cy="60" r="32" fill="${bearColor}"/>
                        
                        <!-- Shine on head -->
                        <ellipse cx="55" cy="50" rx="12" ry="16" fill="rgba(255,255,255,0.5)"/>
                        <ellipse cx="58" cy="53" rx="6" ry="9" fill="rgba(255,255,255,0.3)"/>
                        
                        <!-- Body (Shorter and rounder) -->
                        <ellipse cx="70" cy="100" rx="32" ry="28" fill="url(#${gradId})" filter="url(#shadowBear)"/>
                        <ellipse cx="70" cy="100" rx="28" ry="24" fill="${bearColor}"/>
                        
                        <!-- Belly patch -->
                        <ellipse cx="70" cy="100" rx="18" ry="16" fill="#FFF5E6" opacity="0.8"/>
                        
                        <!-- Left Arm (holding heart) -->
                        <ellipse cx="46" cy="95" rx="12" ry="22" fill="${bearColor}" transform="rotate(-20 46 95)"/>
                        <ellipse cx="44" cy="102" rx="8" ry="8" fill="#FFF5E6"/>
                        
                        <!-- Right Arm (holding heart) -->
                        <ellipse cx="94" cy="95" rx="12" ry="22" fill="${bearColor}" transform="rotate(20 94 95)"/>
                        <ellipse cx="96" cy="102" rx="8" ry="8" fill="#FFF5E6"/>
                        
                        <!-- Front Heart (Held by bear) - Bigger and centered -->
                        <g transform="translate(70, 100)">
                            <path d="M 0 -20 Q -22 -34 -22 -14 Q -22 0 0 16 Q 22 0 22 -14 Q 22 -34 0 -20 Z" 
                                  fill="url(#${heartGradId2})" filter="url(#shadowBear)"/>
                            <ellipse cx="-8" cy="-10" rx="7" ry="9" fill="rgba(255,255,255,0.6)"/>
                            <ellipse cx="-6" cy="-7" rx="3" ry="5" fill="rgba(255,255,255,0.4)"/>
                        </g>
                        
                        <!-- Eyes (Bigger and cuter) -->
                        <circle cx="58" cy="58" r="5" fill="#2D3748"/>
                        <circle cx="82" cy="58" r="5" fill="#2D3748"/>
                        <circle cx="59.5" cy="57" r="2.5" fill="white"/>
                        <circle cx="83.5" cy="57" r="2.5" fill="white"/>
                        
                        <!-- Blush -->
                        <ellipse cx="44" cy="66" rx="10" ry="7" fill="#FF6B9D" opacity="0.6"/>
                        <ellipse cx="96" cy="66" rx="10" ry="7" fill="#FF6B9D" opacity="0.6"/>
                        
                        <!-- Nose -->
                        <ellipse cx="70" cy="68" rx="6" ry="5" fill="#2D3748"/>
                        <ellipse cx="68" cy="67" rx="2.5" ry="2.5" fill="white" opacity="0.8"/>
                        
                        <!-- Mouth - Happy smile -->
                        <path d="M 60 74 Q 70 80 80 74" stroke="#2D3748" stroke-width="3" fill="none" stroke-linecap="round"/>
                        
                        <!-- Small hearts floating around (like candy decorations) -->
                        <path d="M 20 40 Q 17 36 20 36 Q 23 36 20 40 Z" fill="#FDA4AF" opacity="0.6"/>
                        <path d="M 118 70 Q 115 66 118 66 Q 121 66 118 70 Z" fill="#7DFFEA" opacity="0.6"/>
                        <path d="M 25 100 Q 22 96 25 96 Q 28 96 25 100 Z" fill="#A78BFA" opacity="0.6"/>
                    </svg>
                `;
            
            case '🐻': // Kawaii Bear with gradient border
                const bearBody = Math.random() > 0.5 ? colors.mint : colors.lightPink;
                const gradientId = 'grad' + Math.random().toString(36).substr(2, 9);
                return `
                    <svg viewBox="0 0 120 120" width="90" height="90">
                        <defs>
                            <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#7DFFEA;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#A78BFA;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#FDA4AF;stop-opacity:1" />
                            </linearGradient>
                            <filter id="shadow">
                                <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#A78BFA" flood-opacity="0.5"/>
                            </filter>
                        </defs>
                        
                        <!-- Left Ear Border -->
                        <circle cx="30" cy="35" r="18" fill="url(#${gradientId})" filter="url(#shadow)"/>
                        <circle cx="30" cy="35" r="15" fill="${bearBody}"/>
                        <circle cx="30" cy="35" r="10" fill="#FFEEF8"/>
                        
                        <!-- Right Ear Border -->
                        <circle cx="90" cy="35" r="18" fill="url(#${gradientId})"/>
                        <circle cx="90" cy="35" r="15" fill="${bearBody}"/>
                        <circle cx="90" cy="35" r="10" fill="#FFEEF8"/>
                        
                        <!-- Head Border -->
                        <circle cx="60" cy="70" r="42" fill="url(#${gradientId})" filter="url(#shadow)"/>
                        <circle cx="60" cy="70" r="38" fill="${bearBody}"/>
                        
                        <!-- Shine/Highlight -->
                        <ellipse cx="45" cy="58" rx="12" ry="16" fill="rgba(255,255,255,0.6)"/>
                        <ellipse cx="50" cy="62" rx="6" ry="8" fill="rgba(255,255,255,0.4)"/>
                        
                        <!-- Eyes -->
                        <circle cx="50" cy="68" r="4" fill="#8B5CF6"/>
                        <circle cx="70" cy="68" r="4" fill="#8B5CF6"/>
                        <circle cx="51" cy="67" r="2" fill="white"/>
                        <circle cx="71" cy="67" r="2" fill="white"/>
                        
                        <!-- Blush -->
                        <ellipse cx="40" cy="78" rx="8" ry="5" fill="#FB7185" opacity="0.5"/>
                        <ellipse cx="80" cy="78" rx="8" ry="5" fill="#FB7185" opacity="0.5"/>
                        
                        <!-- Nose -->
                        <ellipse cx="60" cy="76" rx="5" ry="4" fill="#F472B6"/>
                        
                        <!-- Mouth -->
                        <path d="M 52 82 Q 60 86 68 82" stroke="#8B5CF6" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                        <circle cx="55" cy="82" r="1.5" fill="#8B5CF6" opacity="0.6"/>
                        <circle cx="65" cy="82" r="1.5" fill="#8B5CF6" opacity="0.6"/>
                    </svg>
                `;
            
            case '🐰': // Kawaii Bunny with gradient border
                const bunnyBody = Math.random() > 0.5 ? colors.lavender : colors.lightPink;
                const bunnyGradId = 'grad' + Math.random().toString(36).substr(2, 9);
                return `
                    <svg viewBox="0 0 120 120" width="90" height="90">
                        <defs>
                            <linearGradient id="${bunnyGradId}" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#7DFFEA;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#A78BFA;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#FDA4AF;stop-opacity:1" />
                            </linearGradient>
                            <filter id="shadow2">
                                <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#A78BFA" flood-opacity="0.5"/>
                            </filter>
                        </defs>
                        
                        <!-- Left Ear Border -->
                        <ellipse cx="40" cy="25" rx="13" ry="32" fill="url(#${bunnyGradId})" filter="url(#shadow2)"/>
                        <ellipse cx="40" cy="25" rx="10" ry="28" fill="${bunnyBody}"/>
                        <ellipse cx="40" cy="25" rx="6" ry="20" fill="#FFEEF8"/>
                        
                        <!-- Right Ear Border -->
                        <ellipse cx="80" cy="25" rx="13" ry="32" fill="url(#${bunnyGradId})"/>
                        <ellipse cx="80" cy="25" rx="10" ry="28" fill="${bunnyBody}"/>
                        <ellipse cx="80" cy="25" rx="6" ry="20" fill="#FFEEF8"/>
                        
                        <!-- Head Border -->
                        <circle cx="60" cy="75" r="38" fill="url(#${bunnyGradId})" filter="url(#shadow2)"/>
                        <circle cx="60" cy="75" r="34" fill="${bunnyBody}"/>
                        
                        <!-- Shine -->
                        <ellipse cx="48" cy="65" rx="10" ry="14" fill="rgba(255,255,255,0.6)"/>
                        
                        <!-- Bow on head -->
                        <ellipse cx="50" cy="45" rx="8" ry="6" fill="#FDA4AF"/>
                        <ellipse cx="62" cy="45" rx="8" ry="6" fill="#FDA4AF"/>
                        <circle cx="56" cy="45" r="4" fill="#FB7185"/>
                        
                        <!-- Eyes -->
                        <circle cx="50" cy="72" r="4" fill="#8B5CF6"/>
                        <circle cx="70" cy="72" r="4" fill="#8B5CF6"/>
                        <circle cx="51" cy="71" r="2" fill="white"/>
                        <circle cx="71" cy="71" r="2" fill="white"/>
                        
                        <!-- Blush -->
                        <ellipse cx="42" cy="80" rx="7" ry="5" fill="#FB7185" opacity="0.5"/>
                        <ellipse cx="78" cy="80" rx="7" ry="5" fill="#FB7185" opacity="0.5"/>
                        
                        <!-- Nose -->
                        <ellipse cx="60" cy="80" rx="4" ry="3" fill="#F472B6"/>
                        
                        <!-- Mouth -->
                        <path d="M 60 83 L 60 87" stroke="#8B5CF6" stroke-width="2.5" stroke-linecap="round"/>
                        <path d="M 60 87 Q 54 90 50 88" stroke="#8B5CF6" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                        <path d="M 60 87 Q 66 90 70 88" stroke="#8B5CF6" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                    </svg>
                `;
            
            case '🍭': // Kawaii Lollipop with gradient
                const lolliGradId = 'grad' + Math.random().toString(36).substr(2, 9);
                return `
                    <svg viewBox="0 0 100 100" width="80" height="80">
                        <defs>
                            <linearGradient id="${lolliGradId}" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#7DFFEA;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#A78BFA;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#FDA4AF;stop-opacity:1" />
                            </linearGradient>
                            <filter id="shadow3">
                                <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#A78BFA" flood-opacity="0.5"/>
                            </filter>
                        </defs>
                        <!-- Stick with border -->
                        <rect x="46" y="55" width="8" height="40" fill="url(#${lolliGradId})" rx="4"/>
                        <rect x="48" y="57" width="4" height="38" fill="#E8E8E8" rx="2"/>
                        
                        <!-- Candy border -->
                        <circle cx="50" cy="35" r="26" fill="url(#${lolliGradId})" filter="url(#shadow3)"/>
                        <circle cx="50" cy="35" r="22" fill="${colors.mint}"/>
                        
                        <!-- Swirl pattern -->
                        <path d="M 35 30 Q 50 25 65 30" stroke="white" stroke-width="4" fill="none" opacity="0.8" stroke-linecap="round"/>
                        <path d="M 37 38 Q 50 33 63 38" stroke="white" stroke-width="4" fill="none" opacity="0.6" stroke-linecap="round"/>
                        <circle cx="50" cy="35" r="8" fill="white" opacity="0.3"/>
                        
                        <!-- Face -->
                        <circle cx="43" cy="34" r="2.5" fill="#8B5CF6"/>
                        <circle cx="57" cy="34" r="2.5" fill="#8B5CF6"/>
                        <circle cx="44" cy="33" r="1.2" fill="white"/>
                        <circle cx="58" cy="33" r="1.2" fill="white"/>
                        <path d="M 45 40 Q 50 43 55 40" stroke="#8B5CF6" stroke-width="2" fill="none" stroke-linecap="round"/>
                        <ellipse cx="38" cy="38" rx="4" ry="3" fill="#FB7185" opacity="0.5"/>
                        <ellipse cx="62" cy="38" rx="4" ry="3" fill="#FB7185" opacity="0.5"/>
                    </svg>
                `;
            
            case '🍬': // Kawaii Candy with gradient border
                const candyGradId = 'grad' + Math.random().toString(36).substr(2, 9);
                const candyInnerGradId = 'grad' + Math.random().toString(36).substr(2, 9);
                return `
                    <svg viewBox="0 0 120 120" width="75" height="75">
                        <defs>
                            <linearGradient id="${candyGradId}" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#7DFFEA;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#A78BFA;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#FDA4AF;stop-opacity:1" />
                            </linearGradient>
                            <linearGradient id="${candyInnerGradId}" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style="stop-color:#FFD4F0;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#7DFFEA;stop-opacity:1" />
                            </linearGradient>
                            <filter id="shadow4">
                                <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#A78BFA" flood-opacity="0.5"/>
                            </filter>
                        </defs>
                        <!-- Wrapper left with border -->
                        <path d="M 28 55 L 10 60 L 28 65 Z" fill="url(#${candyGradId})"/>
                        <path d="M 28 57 L 14 60 L 28 63 Z" fill="#FFE5F0"/>
                        <!-- Wrapper right with border -->
                        <path d="M 92 55 L 110 60 L 92 65 Z" fill="url(#${candyGradId})"/>
                        <path d="M 92 57 L 106 60 L 92 63 Z" fill="#FFE5F0"/>
                        <!-- Candy body border -->
                        <ellipse cx="60" cy="60" rx="34" ry="24" fill="url(#${candyGradId})" filter="url(#shadow4)"/>
                        <ellipse cx="60" cy="60" rx="30" ry="20" fill="url(#${candyInnerGradId})"/>
                        <!-- Stripes -->
                        <ellipse cx="48" cy="60" rx="4" ry="18" fill="white" opacity="0.5"/>
                        <ellipse cx="72" cy="60" rx="4" ry="18" fill="white" opacity="0.5"/>
                        <ellipse cx="60" cy="60" rx="3" ry="16" fill="white" opacity="0.3"/>
                        <!-- Face -->
                        <circle cx="53" cy="57" r="2.5" fill="#8B5CF6"/>
                        <circle cx="67" cy="57" r="2.5" fill="#8B5CF6"/>
                        <circle cx="54" cy="56" r="1.2" fill="white"/>
                        <circle cx="68" cy="56" r="1.2" fill="white"/>
                        <path d="M 55 64 Q 60 67 65 64" stroke="#8B5CF6" stroke-width="2" fill="none" stroke-linecap="round"/>
                        <ellipse cx="47" cy="61" rx="4" ry="3" fill="#FB7185" opacity="0.5"/>
                        <ellipse cx="73" cy="61" rx="4" ry="3" fill="#FB7185" opacity="0.5"/>
                    </svg>
                `;
            
            case '🎀': // Kawaii Bow with gradient
                const bowGradId = 'grad' + Math.random().toString(36).substr(2, 9);
                return `
                    <svg viewBox="0 0 110 110" width="75" height="75">
                        <defs>
                            <linearGradient id="${bowGradId}" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#FDA4AF;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#F472B6;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#FDA4AF;stop-opacity:1" />
                            </linearGradient>
                            <filter id="shadow5">
                                <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#F472B6" flood-opacity="0.5"/>
                            </filter>
                        </defs>
                        <!-- Left loop top -->
                        <path d="M 30 55 Q 15 30 35 20 Q 50 28 42 50 Z" fill="url(#${bowGradId})" filter="url(#shadow5)"/>
                        <path d="M 32 55 Q 20 35 35 27 Q 45 32 40 50 Z" fill="#FFD4F0"/>
                        <!-- Left loop bottom -->
                        <path d="M 30 55 Q 15 80 35 90 Q 50 82 42 60 Z" fill="#FDA4AF"/>
                        <path d="M 32 55 Q 20 75 35 83 Q 45 78 40 60 Z" fill="#FFC4DD"/>
                        <!-- Right loop top -->
                        <path d="M 80 55 Q 95 30 75 20 Q 60 28 68 50 Z" fill="url(#${bowGradId})"/>
                        <path d="M 78 55 Q 90 35 75 27 Q 65 32 70 50 Z" fill="#FFD4F0"/>
                        <!-- Right loop bottom -->
                        <path d="M 80 55 Q 95 80 75 90 Q 60 82 68 60 Z" fill="#FDA4AF"/>
                        <path d="M 78 55 Q 90 75 75 83 Q 65 78 70 60 Z" fill="#FFC4DD"/>
                        <!-- Center knot -->
                        <circle cx="55" cy="55" r="16" fill="#F472B6" filter="url(#shadow5)"/>
                        <circle cx="55" cy="55" r="12" fill="#FFD4F0"/>
                        <ellipse cx="50" cy="50" rx="4" ry="6" fill="white" opacity="0.7"/>
                    </svg>
                `;
            
            case '🌸': // Kawaii Flower with gradient
                const flowerGradId = 'grad' + Math.random().toString(36).substr(2, 9);
                return `
                    <svg viewBox="0 0 110 110" width="75" height="75">
                        <defs>
                            <linearGradient id="${flowerGradId}" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#7DFFEA;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#A78BFA;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#FDA4AF;stop-opacity:1" />
                            </linearGradient>
                            <filter id="shadow6">
                                <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#FDA4AF" flood-opacity="0.5"/>
                            </filter>
                        </defs>
                        <!-- Petals with borders -->
                        <g filter="url(#shadow6)">
                            <ellipse cx="55" cy="25" rx="14" ry="20" fill="url(#${flowerGradId})"/>
                            <ellipse cx="55" cy="25" rx="11" ry="17" fill="#FFD4F0"/>
                            
                            <ellipse cx="80" cy="42" rx="14" ry="20" fill="url(#${flowerGradId})" transform="rotate(72 55 55)"/>
                            <ellipse cx="80" cy="42" rx="11" ry="17" fill="#FFD4F0" transform="rotate(72 55 55)"/>
                            
                            <ellipse cx="72" cy="78" rx="14" ry="20" fill="url(#${flowerGradId})" transform="rotate(144 55 55)"/>
                            <ellipse cx="72" cy="78" rx="11" ry="17" fill="#FFD4F0" transform="rotate(144 55 55)"/>
                            
                            <ellipse cx="38" cy="78" rx="14" ry="20" fill="url(#${flowerGradId})" transform="rotate(216 55 55)"/>
                            <ellipse cx="38" cy="78" rx="11" ry="17" fill="#FFD4F0" transform="rotate(216 55 55)"/>
                            
                            <ellipse cx="30" cy="42" rx="14" ry="20" fill="url(#${flowerGradId})" transform="rotate(288 55 55)"/>
                            <ellipse cx="30" cy="42" rx="11" ry="17" fill="#FFD4F0" transform="rotate(288 55 55)"/>
                        </g>
                        <!-- Center -->
                        <circle cx="55" cy="55" r="18" fill="#FDA4AF"/>
                        <circle cx="55" cy="55" r="14" fill="#FEF08A"/>
                        <circle cx="55" cy="55" r="10" fill="#FACC15"/>
                        <!-- Face -->
                        <circle cx="50" cy="53" r="2" fill="#8B5CF6"/>
                        <circle cx="60" cy="53" r="2" fill="#8B5CF6"/>
                        <circle cx="51" cy="52" r="1" fill="white"/>
                        <circle cx="61" cy="52" r="1" fill="white"/>
                        <path d="M 51 58 Q 55 60 59 58" stroke="#8B5CF6" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                        <ellipse cx="46" cy="56" rx="2" ry="1.5" fill="#FB7185" opacity="0.5"/>
                        <ellipse cx="64" cy="56" rx="2" ry="1.5" fill="#FB7185" opacity="0.5"/>
                    </svg>
                `;
            
            case '💗': // Kawaii Heart with gradient border
                const heartGradId = 'grad' + Math.random().toString(36).substr(2, 9);
                const heartInnerGradId = 'grad' + Math.random().toString(36).substr(2, 9);
                return `
                    <svg viewBox="0 0 120 120" width="80" height="80">
                        <defs>
                            <linearGradient id="${heartGradId}" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#7DFFEA;stop-opacity:1" />
                                <stop offset="50%" style="stop-color:#A78BFA;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#FDA4AF;stop-opacity:1" />
                            </linearGradient>
                            <linearGradient id="${heartInnerGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#FFD4F0;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#FDA4AF;stop-opacity:1" />
                            </linearGradient>
                            <filter id="shadow7">
                                <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#FDA4AF" flood-opacity="0.6"/>
                            </filter>
                        </defs>
                        <!-- Heart border -->
                        <path d="M 60 100 Q 25 70 25 45 Q 25 22 43 22 Q 60 22 60 42 Q 60 22 77 22 Q 95 22 95 45 Q 95 70 60 100 Z" 
                              fill="url(#${heartGradId})" filter="url(#shadow7)"/>
                        <!-- Heart body -->
                        <path d="M 60 94 Q 30 68 30 46 Q 30 28 43 28 Q 60 28 60 44 Q 60 28 77 28 Q 90 28 90 46 Q 90 68 60 94 Z" 
                              fill="url(#${heartInnerGradId})"/>
                        <!-- Shine/Highlight -->
                        <ellipse cx="45" cy="40" rx="10" ry="15" fill="white" opacity="0.6"/>
                        <ellipse cx="50" cy="45" rx="5" ry="8" fill="white" opacity="0.4"/>
                        <!-- Face -->
                        <circle cx="52" cy="55" r="2.5" fill="#8B5CF6"/>
                        <circle cx="68" cy="55" r="2.5" fill="#8B5CF6"/>
                        <circle cx="53" cy="54" r="1.2" fill="white"/>
                        <circle cx="69" cy="54" r="1.2" fill="white"/>
                        <path d="M 54 63 Q 60 67 66 63" stroke="#8B5CF6" stroke-width="2" fill="none" stroke-linecap="round"/>
                        <ellipse cx="46" cy="60" rx="4" ry="3" fill="#FB7185" opacity="0.6"/>
                        <ellipse cx="74" cy="60" rx="4" ry="3" fill="#FB7185" opacity="0.6"/>
                    </svg>
                `;
            
            default:
                return `<span style="font-size: 60px;">${type}</span>`;
        }
    }
    
    // Create items with pop-in animation
    items.forEach((emoji, index) => {
        setTimeout(() => {
            createItem(emoji);
        }, index * 150); // Stagger the pop-in effect
    });
    
    function createItem(emoji) {
        const item = document.createElement('div');
        item.className = 'interactive-item';
        
        // Create kawaii character based on emoji type
        const svgContent = createKawaiiSVG(emoji);
        item.innerHTML = svgContent;
        
        // Adaptive spacing based on screen size
        const isMobile = window.innerWidth < 768;
        const minDistance = isMobile ? 100 : 150;
        const edgeMargin = isMobile ? 60 : 100;
        
        // Calculate available space
        const availableWidth = window.innerWidth - 2 * edgeMargin - 100;
        const availableHeight = window.innerHeight - 2 * edgeMargin - 100;
        
        // Grid-based distribution for better spreading
        const totalItems = items.length;
        const cols = Math.max(2, Math.floor(Math.sqrt(totalItems * (availableWidth / availableHeight))));
        const rows = Math.ceil(totalItems / cols);
        
        const index = interactiveItems.length;
        const col = index % cols;
        const row = Math.floor(index / cols);
        
        // Calculate grid cell size
        const cellWidth = availableWidth / cols;
        const cellHeight = availableHeight / rows;
        
        // Position within cell with some randomness
        const randomOffsetX = (Math.random() - 0.5) * Math.min(cellWidth * 0.5, 60);
        const randomOffsetY = (Math.random() - 0.5) * Math.min(cellHeight * 0.5, 60);
        
        const x = edgeMargin + col * cellWidth + cellWidth / 2 + randomOffsetX;
        const y = edgeMargin + row * cellHeight + cellHeight / 2 + randomOffsetY;
        
        // Ensure within bounds
        const finalX = Math.max(edgeMargin, Math.min(window.innerWidth - edgeMargin - 100, x));
        const finalY = Math.max(edgeMargin, Math.min(window.innerHeight - edgeMargin - 100, y));
        
        item.style.left = finalX + 'px';
        item.style.top = finalY + 'px';
        
        // Physics properties
        item.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
        };
        item.isDragging = false;
        
        container.appendChild(item);
        interactiveItems.push(item);
        
        // Mouse/Touch events for dragging
        let offsetX, offsetY;
        
        function startDrag(e) {
            e.preventDefault();
            item.isDragging = true;
            item.classList.add('dragging');
            
            const touch = e.touches ? e.touches[0] : e;
            offsetX = touch.clientX - item.offsetLeft;
            offsetY = touch.clientY - item.offsetTop;
            
            item.velocity.x = 0;
            item.velocity.y = 0;
        }
        
        function drag(e) {
            if (!item.isDragging) return;
            
            const touch = e.touches ? e.touches[0] : e;
            let newX = touch.clientX - offsetX;
            let newY = touch.clientY - offsetY;
            
            // Keep within bounds
            newX = Math.max(0, Math.min(window.innerWidth - 60, newX));
            newY = Math.max(0, Math.min(window.innerHeight - 60, newY));
            
            item.style.left = newX + 'px';
            item.style.top = newY + 'px';
        }
        
        function endDrag(e) {
            if (!item.isDragging) return;
            
            item.isDragging = false;
            item.classList.remove('dragging');
            
            // Add velocity based on drag speed
            if (e.changedTouches || e.type === 'mouseup') {
                item.velocity.x = (Math.random() - 0.5) * 5;
                item.velocity.y = (Math.random() - 0.5) * 5;
            }
        }
        
        // Mouse events
        item.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
        
        // Touch events for mobile
        item.addEventListener('touchstart', startDrag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', endDrag);
        
        // Click effect - bounce, sparkle and confetti!
        item.addEventListener('click', function(e) {
            if (!item.isDragging) {
                // Bounce animation
                item.style.animation = 'bearBounce 0.6s ease';
                
                // Reset animation after it's done
                setTimeout(() => {
                    item.style.animation = '';
                }, 600);
                
                // Create sparkle effect
                createSparkles(e.clientX, e.clientY);
                
                // Create confetti effect!
                createConfetti(e.clientX, e.clientY);
                
                // Add random velocity for fun movement
                item.velocity.x = (Math.random() - 0.5) * 8;
                item.velocity.y = (Math.random() - 0.5) * 8;
            }
        });
    }
    
    // Function to create sparkle effect on click
    function createSparkles(x, y) {
        const sparkleCount = 8;
        const colors = ['#FF1B6B', '#FF6B9D', '#7DFFEA', '#A78BFA', '#FDA4AF'];
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                box-shadow: 0 0 10px currentColor;
            `;
            
            document.body.appendChild(sparkle);
            
            // Animate sparkle
            const angle = (Math.PI * 2 * i) / sparkleCount;
            const velocity = 3 + Math.random() * 2;
            const tx = Math.cos(angle) * velocity * 30;
            const ty = Math.sin(angle) * velocity * 30;
            
            sparkle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 600,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => sparkle.remove();
        }
    }
    
    // Function to create confetti effect!
    function createConfetti(x, y) {
        const confettiCount = 20;
        const confettiShapes = ['💖', '💕', '💗', '⭐', '✨', '🌟', '🌸', '🌺', '🎀'];
        const colors = ['#FF1B6B', '#FF6B9D', '#7DFFEA', '#A78BFA', '#FDA4AF', '#FFC2D1', '#45cafc'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const useEmoji = Math.random() > 0.5;
            
            if (useEmoji) {
                confetti.textContent = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
                confetti.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    font-size: ${12 + Math.random() * 12}px;
                    pointer-events: none;
                    z-index: 10000;
                    user-select: none;
                `;
            } else {
                confetti.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${5 + Math.random() * 10}px;
                    height: ${5 + Math.random() * 10}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                    pointer-events: none;
                    z-index: 10000;
                    box-shadow: 0 0 10px currentColor;
                `;
            }
            
            document.body.appendChild(confetti);
            
            // Animate confetti with physics
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 4;
            const tx = Math.cos(angle) * velocity * 50;
            const ty = Math.sin(angle) * velocity * 50 - 100; // Shoot upward
            const rotation = Math.random() * 720 - 360;
            
            confetti.animate([
                { 
                    transform: 'translate(0, 0) rotate(0deg) scale(1)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(${tx}px, ${ty + 200}px) rotate(${rotation}deg) scale(0.5)`, 
                    opacity: 0 
                }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => confetti.remove();
        }
    }
    
    // Physics simulation - floating and bouncing
    function animate() {
        interactiveItems.forEach((item, index) => {
            if (item.isDragging) return;
            
            let x = parseFloat(item.style.left);
            let y = parseFloat(item.style.top);
            
            // Apply velocity
            x += item.velocity.x;
            y += item.velocity.y;
            
            // Stronger friction to slow down movement
            item.velocity.x *= 0.98;
            item.velocity.y *= 0.98;
            
            // Bounce off walls with more dampening
            const margin = 20;
            if (x <= margin) {
                item.velocity.x = Math.abs(item.velocity.x) * 0.7;
                x = margin;
            } else if (x >= window.innerWidth - 80) {
                item.velocity.x = -Math.abs(item.velocity.x) * 0.7;
                x = window.innerWidth - 80;
            }
            
            if (y <= margin) {
                item.velocity.y = Math.abs(item.velocity.y) * 0.7;
                y = margin;
            } else if (y >= window.innerHeight - 80) {
                item.velocity.y = -Math.abs(item.velocity.y) * 0.7;
                y = window.innerHeight - 80;
            }
            
            // Very subtle floating effect - different phase for each item
            const time = Date.now() / 2000;
            const floatX = Math.sin(time + index * 1.3) * 0.3;
            const floatY = Math.cos(time + index * 1.7) * 0.3;
            
            item.velocity.x += floatX * 0.02;
            item.velocity.y += floatY * 0.02;
            
            // Stop tiny movements to prevent drift
            if (Math.abs(item.velocity.x) < 0.01) item.velocity.x = 0;
            if (Math.abs(item.velocity.y) < 0.01) item.velocity.y = 0;
            
            item.style.left = x + 'px';
            item.style.top = y + 'px';
        });
        
        requestAnimationFrame(animate);
    }
    
    // Start animation loop
    animate();
    
    // Recreate items on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            interactiveItems.forEach(item => {
                const x = parseFloat(item.style.left);
                const y = parseFloat(item.style.top);
                
                // Keep items within new bounds
                item.style.left = Math.min(x, window.innerWidth - 60) + 'px';
                item.style.top = Math.min(y, window.innerHeight - 60) + 'px';
            });
        }, 200);
    });
    
    // ============================================
    // 🎉 Easter Eggs - Fun surprises!
    // ============================================
    
    // Easter egg 1: Click on name = BIG confetti explosion!
    const nameElement = document.querySelector('.card-nickname');
    if (nameElement) {
        let clickCount = 0;
        nameElement.addEventListener('click', function(e) {
            clickCount++;
            
            // Create massive confetti explosion!
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    createConfetti(
                        e.clientX + (Math.random() - 0.5) * 100, 
                        e.clientY + (Math.random() - 0.5) * 100
                    );
                }, i * 20);
            }
            
            // Special message after 3 clicks
            if (clickCount === 3) {
                showToast('🎉 Bạn đã tìm ra easter egg! 💖✨');
                clickCount = 0;
            }
        });
    }
    
    // Easter egg 2: Click on profile photo = rainbow effect!
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create rainbow sparkles
            const rainbowColors = ['#FF1B6B', '#FF6B9D', '#FFC2D1', '#45cafc', '#7DFFEA', '#A78BFA', '#FDA4AF'];
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
    const sparkle = document.createElement('div');
                    sparkle.style.cssText = `
                        position: fixed;
                        left: ${e.clientX}px;
                        top: ${e.clientY}px;
                        width: ${10 + Math.random() * 15}px;
                        height: ${10 + Math.random() * 15}px;
                        background: ${rainbowColors[i % rainbowColors.length]};
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 10000;
                        box-shadow: 0 0 20px currentColor;
                    `;
                    
    document.body.appendChild(sparkle);

                    const angle = (Math.PI * 2 * i) / 30;
                    const distance = 50 + Math.random() * 100;
                    const tx = Math.cos(angle) * distance;
                    const ty = Math.sin(angle) * distance;
                    
                    sparkle.animate([
                        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                        { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
                    ], {
                        duration: 800 + Math.random() * 400,
                        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }).onfinish = () => sparkle.remove();
                }, i * 30);
            }
            
            showToast('✨ Xinh quá! Rainbow magic! 🌈💖');
        });
    }
    
    // Easter egg 3: Double click anywhere = hearts rain!
    let lastClickTime = 0;
    document.addEventListener('click', function(e) {
        const currentTime = Date.now();
        if (currentTime - lastClickTime < 300) {
            // Double click detected!
            createHeartsRain(e.clientX, e.clientY);
        }
        lastClickTime = currentTime;
    });
    
    function createHeartsRain(x, y) {
        const hearts = ['💖', '💕', '💗', '💓', '💝'];
        for (let i = 0; i < 15; i++) {
    setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.cssText = `
                    position: fixed;
                    left: ${x + (Math.random() - 0.5) * 200}px;
                    top: ${y - 50}px;
                    font-size: ${20 + Math.random() * 20}px;
                    pointer-events: none;
                    z-index: 9999;
                    user-select: none;
                `;
                
                document.body.appendChild(heart);
                
                const fallDistance = 300 + Math.random() * 200;
                const drift = (Math.random() - 0.5) * 100;
                
                heart.animate([
                    { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 1 },
                    { transform: `translate(${drift}px, ${fallDistance}px) rotate(${Math.random() * 360}deg) scale(0.5)`, opacity: 0 }
                ], {
                    duration: 2000 + Math.random() * 1000,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }).onfinish = () => heart.remove();
            }, i * 80);
        }
    }
    
    // ============================================
    // 🎵 FLOATING VINYL MUSIC PLAYER
    // ============================================
    
    const audioPlayer = document.getElementById('audioPlayer');
    const floatingVinyl = document.getElementById('floatingVinyl');
    const musicPopup = document.getElementById('musicPopup');
    const popupClose = document.getElementById('popupClose');
    const playBtnMini = document.getElementById('playBtnMini');
    const audioFileInput = document.getElementById('audioFile');
    const songNameMini = document.getElementById('songNameMini');
    const volumeMini = document.getElementById('volumeMini');
    const vinylDisc = document.querySelector('.vinyl-disc-simple');
    
    let isPlaying = false;
    let currentSongIndex = 0;
    let playlist = [];
    let musicLoaded = false;
    
    // ============================================
    // 🎵 AUTO-PLAY MUSIC ON PAGE LOAD
    // ============================================
    
    // List of songs in the music folder
    const defaultPlaylist = [
        { file: 'music/APT..mp3', name: 'APT.', lyrics: null }
    ];
    
    // Try to auto-load first available song
    function autoLoadMusic() {
        if (!musicLoaded) {
            // Try to load the first song from the playlist
            tryLoadSong(0);
        }
    }
    
    function tryLoadSong(index) {
        if (index >= defaultPlaylist.length) {
            console.log('No music files found in music folder');
            return;
        }
        
        const song = defaultPlaylist[index];
        
        // Test if file exists
        fetch(song.file)
            .then(response => {
                if (response.ok) {
                    // File exists, load it
                    loadSongFromPath(song.file, song.name, song.lyrics);
                    currentSongIndex = index;
                    playlist = defaultPlaylist;
                    musicLoaded = true; // Mark as loaded
                } else {
                    // Try next song
                    tryLoadSong(index + 1);
                }
            })
            .catch(() => {
                // Try next song
                tryLoadSong(index + 1);
            });
    }
    
    function loadSongFromPath(path, name, lyrics) {
        audioPlayer.src = path;
        songNameMini.textContent = name;
        
        // Enable loop
        audioPlayer.loop = true;
        
        // Set volume directly
        audioPlayer.volume = 0.5;
        
        // Auto-play immediately
        const playPromise = audioPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                playBtnMini.textContent = '⏸️';
                vinylDisc.style.animationPlayState = 'running';
                
                // Fade in volume smoothly
                let currentVol = 0.1;
                const targetVolume = 0.7;
                const fadeInterval = setInterval(() => {
                    if (currentVol < targetVolume) {
                        currentVol += 0.05;
                        audioPlayer.volume = Math.min(currentVol, targetVolume);
                    } else {
                        clearInterval(fadeInterval);
                    }
                }, 100);
            }).catch(error => {
                // Auto-play was prevented by browser, try on first click
                console.log('Auto-play prevented, will start on first interaction:', error);
                
                const startOnClick = () => {
                    audioPlayer.play().then(() => {
                        isPlaying = true;
                        playBtnMini.textContent = '⏸️';
                        vinylDisc.style.animationPlayState = 'running';
                    });
                    document.removeEventListener('click', startOnClick);
                };
                
                document.addEventListener('click', startOnClick, { once: true });
            });
        }
    }
    
    // Auto-load music when page loads
    // Try immediate autoplay
    setTimeout(autoLoadMusic, 500);
    
    // Fallback: auto-play on first user interaction
    const enableAutoplay = () => {
        if (!musicLoaded) {
            autoLoadMusic();
            musicLoaded = true;
        }
        // Remove listeners after first interaction
        document.removeEventListener('click', enableAutoplay);
        document.removeEventListener('keydown', enableAutoplay);
        document.removeEventListener('touchstart', enableAutoplay);
        document.removeEventListener('scroll', enableAutoplay);
    };
    
    // Listen for ANY user interaction
    document.addEventListener('click', enableAutoplay);
    document.addEventListener('keydown', enableAutoplay);
    document.addEventListener('touchstart', enableAutoplay);
    document.addEventListener('scroll', enableAutoplay);
    
    // Toggle popup when clicking vinyl
    floatingVinyl.addEventListener('click', function() {
        musicPopup.classList.toggle('active');
    });
    
    // Close popup
    popupClose.addEventListener('click', function() {
        musicPopup.classList.remove('active');
    });
    
    // Load audio file
    audioFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            audioPlayer.src = url;
            audioPlayer.loop = true; // Enable loop for uploaded files too
            
            // Update song name
            const songName = file.name.replace(/\.[^/.]+$/, "");
            songNameMini.textContent = songName;
            
            // Auto play
            audioPlayer.play();
            isPlaying = true;
            playBtnMini.textContent = '⏸️';
            vinylDisc.style.animationPlayState = 'running';
            
            showToast('🎵 Đang phát: ' + songName + ' (lặp lại)');
        }
    });
    
    // Play/Pause toggle
    playBtnMini.addEventListener('click', function() {
        if (!audioPlayer.src) {
            showToast('⚠️ Vui lòng chọn file nhạc trước!');
            return;
        }
        
        if (isPlaying) {
            audioPlayer.pause();
            playBtnMini.textContent = '▶️';
            vinylDisc.style.animationPlayState = 'paused';
        } else {
            audioPlayer.play();
            playBtnMini.textContent = '⏸️';
            vinylDisc.style.animationPlayState = 'running';
        }
        isPlaying = !isPlaying;
    });
    
    // Volume control
    volumeMini.addEventListener('input', function() {
        audioPlayer.volume = this.value / 100;
    });
    
    // Set initial volume
    audioPlayer.volume = 0.7;
    
    // Audio now loops automatically via HTML attribute
    // No need for 'ended' event listener
    
});
