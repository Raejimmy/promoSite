document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Custom cursor
    const cursor = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .visual-element, .scroll-indicator');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '50px';
                cursor.style.height = '50px';
                cursor.style.background = 'rgba(230, 57, 70, 0.2)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '30px';
                cursor.style.height = '30px';
                cursor.style.background = 'rgba(230, 57, 70, 0.3)';
            });
        });
    }
    
    // Scroll animations
    // Synopsis section
    gsap.to('.synopsis-text', {
        scrollTrigger: {
            trigger: '.synopsis',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 1
    });
    
    gsap.to('.quote', {
        scrollTrigger: {
            trigger: '.quote',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 1
    });
    
    // Character section
    gsap.to('.character-info', {
        scrollTrigger: {
            trigger: '.character',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        x: 0,
        duration: 1
    });
    
    // Visual elements section
    gsap.to('.visual-element', {
        scrollTrigger: {
            trigger: '.visuals',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8
    });
    
    // Coming soon section
    gsap.to('.release-info', {
        scrollTrigger: {
            trigger: '.coming-soon',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 1
    });
    
    // Particle effects
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Resize canvas when window is resized
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = this.getRandomColor();
            this.opacity = Math.random() * 0.5 + 0.2;
            this.lifespan = Math.random() * 100 + 50;
            this.age = 0;
        }
        
        getRandomColor() {
            const colors = [
                'rgba(230, 57, 70, 0.8)',  // Red
                'rgba(255, 165, 0, 0.8)',  // Orange
                'rgba(255, 215, 0, 0.8)'   // Gold
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.age++;
            
            // Reset particle if it goes off screen or exceeds lifespan
            if (this.x < 0 || this.x > canvas.width || 
                this.y < 0 || this.y > canvas.height || 
                this.age > this.lifespan) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity * (1 - this.age / this.lifespan);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Create particles
    const particles = [];
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20)); // Adjust based on screen size
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
    
    // Dragon silhouette animation
    function createDragonSilhouette() {
        const dragonSilhouette = document.createElement('div');
        dragonSilhouette.classList.add('dragon-silhouette');
        document.body.appendChild(dragonSilhouette);
        
        // Random position and size
        const size = Math.random() * 100 + 50;
        const startX = -size;
        const startY = Math.random() * (window.innerHeight - 200) + 100;
        const duration = Math.random() * 10 + 10;
        
        // Set initial position and style
        dragonSilhouette.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size / 2}px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='%23e63946' d='M448 0L384 64h-96L224 0v128l-32-32-32 32-32-32-32 32V0H64v96H0v32h128v64H64v32h64v64H0v32h128v64H64v32h64v64H0v32h96v32h32v-32h64v32h32v-32h64v32h32v-32h64v32h32v-32h96v-32h32v-32h-32v-64h32v-32h-32v-64h32v-32h-32v-64h32v-32h-32V96h32V64h-32V32h-32V0h-32zm0 128v64h-96v32h96v64h-96v32h96v64h-96v32h96v64H128v-64h96v-32h-96v-64h96v-32h-96v-64h96v-32h-96V128h320z'/%3E%3C/svg%3E");
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            left: ${startX}px;
            top: ${startY}px;
            opacity: 0.2;
            z-index: 5;
            filter: drop-shadow(0 0 10px rgba(230, 57, 70, 0.5));
            pointer-events: none;
        `;
        
        // Animate the dragon
        gsap.to(dragonSilhouette, {
            left: window.innerWidth + size,
            duration: duration,
            ease: "power1.inOut",
            onComplete: () => {
                dragonSilhouette.remove();
                // Schedule next dragon after a random delay
                setTimeout(createDragonSilhouette, Math.random() * 15000 + 5000);
            }
        });
    }
    
    // Start dragon animation with initial delay
    setTimeout(createDragonSilhouette, 5000);
    
    // Add CSS for dragon silhouette
    const style = document.createElement('style');
    style.textContent = `
        .dragon-silhouette {
            animation: fly 2s infinite alternate ease-in-out;
        }
        
        @keyframes fly {
            0% { transform: translateY(0) rotate(2deg); }
            100% { transform: translateY(20px) rotate(-2deg); }
        }
    `;
    document.head.appendChild(style);
});
