document.addEventListener('DOMContentLoaded', function() {
    // Background music functionality
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    // Music toggle functionality
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.textContent = '🎵';
            musicToggle.classList.remove('playing');
            isPlaying = false;
        } else {
            backgroundMusic.play().catch(e => {
                console.log('Audio play failed:', e);
                // Show a gentle message if autoplay is blocked
                showMessage('Click to play music 🎵');
            });
            musicToggle.textContent = '⏸️';
            musicToggle.classList.add('playing');
            isPlaying = true;
        }
    });

    // Set volume
    backgroundMusic.volume = 0.3;

    // Auto-play attempt (might be blocked by browser)
    setTimeout(() => {
        backgroundMusic.play().then(() => {
            musicToggle.textContent = '⏸️';
            musicToggle.classList.add('playing');
            isPlaying = true;
        }).catch(e => {
            console.log('Autoplay prevented by browser');
        });
    }, 2000);

    // Smooth scrolling for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator.addEventListener('click', function() {
        document.querySelector('#love-messages').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate text lines in sequence
                const lines = entry.target.querySelectorAll('.line');
                lines.forEach((line, index) => {
                    setTimeout(() => {
                        line.style.animationPlayState = 'running';
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Name cards interactive effects
    const nameCards = document.querySelectorAll('.name-card');
    nameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.background = 'rgba(255, 255, 255, 0.25)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.background = 'rgba(255, 255, 255, 0.15)';
        });

        card.addEventListener('click', function() {
            // Create heart explosion effect
            createHeartExplosion(this);
        });
    });

    // Heart explosion effect for name cards
    function createHeartExplosion(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 15; i++) {
            createFloatingHeart(centerX, centerY);
        }
    }

    function createFloatingHeart(x, y) {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.userSelect = 'none';
        
        document.body.appendChild(heart);

        // Animate the heart
        const angle = Math.random() * Math.PI * 2;
        const velocity = 100 + Math.random() * 100;
        const life = 2000 + Math.random() * 1000;

        let currentX = x;
        let currentY = y;
        let opacity = 1;
        let scale = 1;

        const startTime = performance.now();

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = elapsed / life;

            if (progress >= 1) {
                document.body.removeChild(heart);
                return;
            }

            currentX += Math.cos(angle) * velocity * 0.016;
            currentY += Math.sin(angle) * velocity * 0.016 - (elapsed * 0.0005);
            opacity = 1 - progress;
            scale = 1 - progress * 0.5;

            heart.style.left = currentX + 'px';
            heart.style.top = currentY + 'px';
            heart.style.opacity = opacity;
            heart.style.transform = `scale(${scale})`;

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        const heroSection = document.querySelector('.hero-section');
        heroSection.style.transform = 'translateY(' + parallax + 'px)';
    });

    // Type writer effect for the main title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typewriter effect
    setTimeout(() => {
        const title = document.querySelector('.main-title');
        const originalText = title.textContent;
        typeWriter(title, originalText, 150);
    }, 1000);

    // Floating particles effect
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(255, 255, 255, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        
        // Random starting position
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        // Animate upward
        let currentY = window.innerHeight;
        const speed = 0.5 + Math.random() * 1;
        const sway = Math.random() * 2 - 1;
        let currentX = parseInt(particle.style.left);
        
        function animateParticle() {
            currentY -= speed;
            currentX += sway;
            
            particle.style.top = currentY + 'px';
            particle.style.left = currentX + 'px';
            
            if (currentY < -10) {
                document.body.removeChild(particle);
                return;
            }
            
            requestAnimationFrame(animateParticle);
        }
        
        requestAnimationFrame(animateParticle);
    }

    // Create particles periodically
    setInterval(createFloatingParticle, 2000);

    // Create romantic heart rain effect
    function createHeartRain() {
        const hearts = ['💖', '💕', '💗', '💘', '💝', '💞', '💓', '💜', '🌹', '✨'];
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = '-50px';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        heart.style.animation = `heartFall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (document.body.contains(heart)) {
                document.body.removeChild(heart);
            }
        }, 5000);
    }

    // Create heart rain every few seconds
    setInterval(createHeartRain, 3000);

    // Add romantic cursor trail
    let mouseTrail = [];
    document.addEventListener('mousemove', function(e) {
        mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
        
        // Limit trail length
        if (mouseTrail.length > 20) {
            mouseTrail.shift();
        }
        
        // Create heart at cursor occasionally
        if (Math.random() < 0.1) {
            createCursorHeart(e.clientX, e.clientY);
        }
    });

    function createCursorHeart(x, y) {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '12px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = 'cursorHeartFade 1s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (document.body.contains(heart)) {
                document.body.removeChild(heart);
            }
        }, 1000);
    }
    
    // Create romantic floating hearts continuously
    function createRomanticHeart() {
        const hearts = ['💕', '💖', '💝', '💗', '💓', '💘', '🌹', '✨'];
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.color = `hsl(${Math.random() * 60 + 300}, 70%, 80%)`;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1';
        heart.style.userSelect = 'none';
        
        // Random starting position from sides
        const side = Math.random() < 0.5 ? 'left' : 'right';
        if (side === 'left') {
            heart.style.left = '-50px';
            heart.style.top = Math.random() * window.innerHeight + 'px';
        } else {
            heart.style.right = '-50px';
            heart.style.top = Math.random() * window.innerHeight + 'px';
        }
        
        document.body.appendChild(heart);
        
        // Animate across screen with floating motion
        let currentX = side === 'left' ? -50 : window.innerWidth + 50;
        let currentY = parseInt(heart.style.top);
        const targetX = side === 'left' ? window.innerWidth + 50 : -50;
        const speed = 0.3 + Math.random() * 0.5;
        const floatAmplitude = 30 + Math.random() * 20;
        const floatSpeed = 0.02 + Math.random() * 0.02;
        let time = 0;
        
        function animateRomanticHeart() {
            time += floatSpeed;
            const direction = side === 'left' ? 1 : -1;
            currentX += speed * direction;
            const floatY = Math.sin(time) * floatAmplitude;
            
            heart.style.left = currentX + 'px';
            heart.style.top = (currentY + floatY) + 'px';
            heart.style.transform = `rotate(${Math.sin(time * 2) * 10}deg)`;
            
            if ((side === 'left' && currentX > window.innerWidth + 50) || 
                (side === 'right' && currentX < -50)) {
                document.body.removeChild(heart);
                return;
            }
            
            requestAnimationFrame(animateRomanticHeart);
        }
        
        requestAnimationFrame(animateRomanticHeart);
    }
    
    // Create romantic hearts periodically
    setInterval(createRomanticHeart, 4000);

    // Show message function
    function showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '20px';
        messageDiv.style.left = '50%';
        messageDiv.style.transform = 'translateX(-50%)';
        messageDiv.style.background = 'rgba(0, 0, 0, 0.8)';
        messageDiv.style.color = 'white';
        messageDiv.style.padding = '10px 20px';
        messageDiv.style.borderRadius = '25px';
        messageDiv.style.zIndex = '10000';
        messageDiv.style.transition = 'opacity 0.3s ease';
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }

    // Add click effect to shayari cards
    const shayariCards = document.querySelectorAll('.shayari-card');
    shayariCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                this.removeChild(ripple);
            }, 600);
        });
    });

    // Add CSS animation for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Smooth reveal of sections as user scrolls
    const sections = document.querySelectorAll('.shayari-section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });

    console.log('💖 Website loaded with love 💖');
    
    // Romantic welcome message
    setTimeout(() => {
        showRomanticWelcome();
    }, 2000);

    function showRomanticWelcome() {
        const welcome = document.createElement('div');
        welcome.innerHTML = `
            <div style="text-align: center; color: white;">
                <h3 style="font-family: 'Dancing Script', cursive; font-size: 2rem; margin-bottom: 10px;">
                    Welcome to our love story 💕
                </h3>
                <p style="font-size: 1.1rem; opacity: 0.9;">
                    Every word here is written with love ✨
                </p>
            </div>
        `;
        welcome.style.position = 'fixed';
        welcome.style.top = '50%';
        welcome.style.left = '50%';
        welcome.style.transform = 'translate(-50%, -50%)';
        welcome.style.background = 'linear-gradient(135deg, rgba(255, 182, 193, 0.9), rgba(255, 105, 180, 0.8))';
        welcome.style.padding = '30px 40px';
        welcome.style.borderRadius = '20px';
        welcome.style.border = '2px solid rgba(255, 255, 255, 0.3)';
        welcome.style.backdropFilter = 'blur(20px)';
        welcome.style.boxShadow = '0 20px 60px rgba(255, 105, 180, 0.4)';
        welcome.style.zIndex = '10000';
        welcome.style.animation = 'welcomeFadeIn 1s ease-out';
        
        document.body.appendChild(welcome);
        
        // Auto close after 4 seconds or click to close
        welcome.addEventListener('click', () => {
            welcome.style.animation = 'welcomeFadeOut 0.5s ease-in forwards';
            setTimeout(() => {
                if (document.body.contains(welcome)) {
                    document.body.removeChild(welcome);
                }
            }, 500);
        });
        
        setTimeout(() => {
            if (document.body.contains(welcome)) {
                welcome.style.animation = 'welcomeFadeOut 0.5s ease-in forwards';
                setTimeout(() => {
                    if (document.body.contains(welcome)) {
                        document.body.removeChild(welcome);
                    }
                }, 500);
            }
        }, 4000);
    }
});