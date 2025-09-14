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
            isPlaying = false;
        } else {
            backgroundMusic.play().catch(e => {
                console.log('Audio play failed:', e);
                showMessage('Click to play music 🎵');
            });
            musicToggle.textContent = '⏸️';
            isPlaying = true;
        }
    });

    // Set volume
    backgroundMusic.volume = 0.3;

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link, .cta-button').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simple visibility check - ensure all poetry content is visible
    const poetryCards = document.querySelectorAll('.poetry-card');
    poetryCards.forEach(card => {
        card.style.opacity = '1';
        card.style.visibility = 'visible';
        card.style.display = 'block';
    });

    const poetryLines = document.querySelectorAll('.line');
    poetryLines.forEach(line => {
        line.style.opacity = '1';
        line.style.visibility = 'visible';
        line.style.display = 'block';
    });

    // Professional name cards effects
    const nameCards = document.querySelectorAll('.name-card.professional');
    nameCards.forEach(card => {
        card.addEventListener('click', function() {
            // Subtle heart effect
            createSubtleHeart(this);
        });
    });

    // Subtle heart effect for name cards
    function createSubtleHeart(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 3; i++) {
            createFloatingHeart(centerX, centerY);
        }
    }

    function createFloatingHeart(x, y) {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '16px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.userSelect = 'none';
        
        document.body.appendChild(heart);

        // Animate the heart
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 50;
        const life = 1500 + Math.random() * 500;

        let currentX = x;
        let currentY = y;
        let opacity = 1;
        let scale = 1;

        const startTime = performance.now();

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = elapsed / life;

            if (progress >= 1) {
                if (document.body.contains(heart)) {
                    document.body.removeChild(heart);
                }
                return;
            }

            currentX += Math.cos(angle) * velocity * 0.016;
            currentY += Math.sin(angle) * velocity * 0.016 - (elapsed * 0.0003);
            opacity = 1 - progress;
            scale = 1 - progress * 0.3;

            heart.style.left = currentX + 'px';
            heart.style.top = currentY + 'px';
            heart.style.opacity = opacity;
            heart.style.transform = `scale(${scale})`;

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }

    // Show message function
    function showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '100px';
        messageDiv.style.left = '50%';
        messageDiv.style.transform = 'translateX(-50%)';
        messageDiv.style.background = 'rgba(225, 112, 85, 0.9)';
        messageDiv.style.color = 'white';
        messageDiv.style.padding = '10px 20px';
        messageDiv.style.borderRadius = '25px';
        messageDiv.style.zIndex = '10000';
        messageDiv.style.transition = 'opacity 0.3s ease';
        messageDiv.style.fontSize = '0.9rem';
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(messageDiv)) {
                    document.body.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }

    // Add subtle click effect to poetry cards
    const clickablePoetryCards = document.querySelectorAll('.poetry-card');
    clickablePoetryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Create subtle ripple effect
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
            ripple.style.background = 'rgba(225, 112, 85, 0.2)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (this.contains(ripple)) {
                    this.removeChild(ripple);
                }
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

    console.log('✨ Professional Poetry Website Loaded ✨');
});

// Contact Form Functionality
function sendWhatsApp() {
    const name = document.getElementById('senderName').value.trim();
    const message = document.getElementById('messageText').value.trim();
    
    if (!name || !message) {
        alert('Please fill in both your name and message before sending.');
        return;
    }
    
    // Format the message for WhatsApp
    const whatsappMessage = `Hi! My name is ${name}.\n\n${message}\n\n(Sent from your Poetry Collection website)`;
    
    // WhatsApp number with India country code (+91)
    const phoneNumber = "919988169600"; // Your WhatsApp number
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
    
    // Clear the form
    document.getElementById('messageForm').reset();
    
    // Show success message
    showMessage('Redirecting to WhatsApp... 📱');
}

function sendEmail() {
    const name = document.getElementById('senderName').value.trim();
    const message = document.getElementById('messageText').value.trim();
    
    if (!name || !message) {
        alert('Please fill in both your name and message before sending.');
        return;
    }
    
    // Format the email
    const subject = `Message from ${name} - Poetry Collection Website`;
    const body = `Hi,\n\nMy name is ${name}.\n\n${message}\n\nBest regards,\n${name}\n\n(Sent from your Poetry Collection website)`;
    
    // Your email address
    const emailAddress = "1056skay@gmail.com"; // Your email address
    
    const emailURL = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = emailURL;
    
    // Clear the form
    document.getElementById('messageForm').reset();
    
    // Show success message
    showMessage('Opening your email client... ✉️');
}

function directWhatsApp() {
    // Your WhatsApp number
    const phoneNumber = "919988169600"; // Your WhatsApp number
    const message = "Hi! I visited your beautiful poetry collection website and wanted to connect with you.";
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

function directEmail() {
    // Your email address
    const emailAddress = "1056skay@gmail.com"; // Your email address
    const subject = "Hello from your Poetry Collection website visitor";
    const body = "Hi,\n\nI visited your beautiful poetry collection website and wanted to reach out to you.\n\nBest regards";
    
    const emailURL = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = emailURL;
}

// Enhanced form validation and user experience
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('messageForm');
    if (form) {
        const nameInput = document.getElementById('senderName');
        const messageInput = document.getElementById('messageText');
        
        // Add real-time character count for message
        if (messageInput) {
            const charCounter = document.createElement('div');
            charCounter.className = 'char-counter';
            charCounter.style.cssText = 'text-align: right; font-size: 0.8rem; color: #666; margin-top: 0.5rem;';
            messageInput.parentNode.appendChild(charCounter);
            
            messageInput.addEventListener('input', function() {
                const count = this.value.length;
                charCounter.textContent = `${count} characters`;
                
                if (count > 500) {
                    charCounter.style.color = '#e74c3c';
                    charCounter.textContent = `${count} characters (Consider keeping it concise)`;
                } else {
                    charCounter.style.color = '#666';
                }
            });
        }
        
        // Add placeholder animations
        [nameInput, messageInput].forEach(input => {
            if (input) {
                input.addEventListener('focus', function() {
                    this.style.transform = 'scale(1.02)';
                    this.style.transition = 'transform 0.3s ease';
                });
                
                input.addEventListener('blur', function() {
                    this.style.transform = 'scale(1)';
                });
            }
        });
    }
});