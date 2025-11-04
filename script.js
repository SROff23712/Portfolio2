// Navigation Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Typing Animation for Terminal
const typingTexts = [
    'npm start',
    'git push origin main',
    'console.log("Hello World!")',
    'const portfolio = "awesome";',
    'docker run -d app',
    'npm install react',
];
let currentTextIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

function typeText() {
    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeText, typingSpeed);
}

// Start typing animation
if (typingElement) {
    typeText();
}

// Particle Canvas Animation
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, i) => {
            particle.update();
            particle.draw();
            
            // Connect nearby particles
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.strokeStyle = `rgba(0, 217, 255, ${0.1 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Smooth Scroll for Navigation Links
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

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-content').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Animate Skill Progress Bars
const skillBarsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.getAttribute('data-width');
            progressBar.style.width = width + '%';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-progress').forEach(bar => {
    skillBarsObserver.observe(bar);
});

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_d7njcwe';
const EMAILJS_TEMPLATE_ID = 'template_q7i0xbw';
const EMAILJS_PUBLIC_KEY = 'ASiWwQmS1ecY5_x8Q';

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY,
        });
        console.log('✅ EmailJS initialisé avec la clé:', EMAILJS_PUBLIC_KEY);
    } else {
        console.error('❌ EmailJS SDK non chargé ! Vérifiez que le script CDN est présent dans le HTML.');
    }
})();

// Form Submission avec EmailJS
// Attendre que le DOM soit complètement chargé
(function() {
    function initContactForm() {
        console.log('🔧 Initialisation du formulaire de contact...');
        
        const contactForm = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const formMessage = document.getElementById('formMessage');

        console.log('📋 Éléments trouvés:', {
            contactForm: contactForm ? '✅' : '❌',
            submitBtn: submitBtn ? '✅' : '❌',
            formMessage: formMessage ? '✅' : '❌'
        });

        if (!contactForm || !submitBtn) {
            console.error('❌ Formulaire ou bouton non trouvé');
            console.error('ContactForm:', contactForm);
            console.error('SubmitBtn:', submitBtn);
            return;
        }

        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        console.log('✅ Éléments internes:', {
            btnText: btnText ? '✅' : '❌',
            btnLoader: btnLoader ? '✅' : '❌'
        });
        
        console.log('✅ Formulaire de contact initialisé avec succès !');

        // Fonction pour envoyer l'email
        async function sendEmail() {
            console.log('📧 sendEmail() appelée');
            
            // Vérifier que EmailJS est chargé
            if (typeof emailjs === 'undefined') {
                console.error('❌ EmailJS n\'est pas chargé !');
                formMessage.textContent = '✗ Erreur : EmailJS n\'est pas chargé. Vérifiez votre connexion internet.';
                formMessage.className = 'form-message error';
                return;
            }
            
            // Valider le formulaire
            if (!contactForm.checkValidity()) {
                console.log('⚠️ Formulaire invalide');
                contactForm.reportValidity();
                return;
            }
            
            console.log('✅ Formulaire valide, préparation de l\'envoi...');
            
            // Désactiver le bouton et afficher le loader
            submitBtn.disabled = true;
            btnText.textContent = 'Envoi...';
            btnText.style.display = 'inline';
            btnLoader.style.display = 'inline-block';
            formMessage.textContent = '';
            formMessage.className = 'form-message';
            
            try {
                // Vérifier que les clés EmailJS sont configurées
                console.log('🔑 Vérification des clés EmailJS...');
                console.log('Service ID:', EMAILJS_SERVICE_ID);
                console.log('Template ID:', EMAILJS_TEMPLATE_ID);
                console.log('Public Key:', EMAILJS_PUBLIC_KEY ? 'Configuré' : 'Non configuré');
                
                if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
                    EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
                    EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
                    throw new Error('EmailJS n\'est pas configuré. Veuillez configurer vos clés API dans script.js');
                }
                
                // Envoyer l'email via EmailJS SDK avec sendForm
                console.log('📤 Envoi de l\'email via EmailJS...');
                
                const response = await emailjs.sendForm(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    contactForm
                );
                
                console.log('✅ Email envoyé avec succès !', response);
                
                // Succès
                formMessage.textContent = '✓ Message envoyé avec succès ! Je vous répondrai bientôt.';
                formMessage.className = 'form-message success';
                contactForm.reset();
                
                // Animation de succès sur le bouton
                submitBtn.style.background = '#27c93f';
                btnText.textContent = 'Envoyé ! ✓';
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
                
                // Réinitialiser après 3 secondes
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    btnText.textContent = 'Envoyer';
                }, 3000);
                
            } catch (error) {
                console.error('❌ Erreur lors de l\'envoi:', error);
                console.error('Détails de l\'erreur:', {
                    status: error.status,
                    text: error.text,
                    message: error.message
                });
                
                // Afficher un message d'erreur détaillé
                let errorMessage = '✗ Erreur lors de l\'envoi. ';
                if (error.text) {
                    errorMessage += error.text;
                } else if (error.message) {
                    errorMessage += error.message;
                } else {
                    errorMessage += 'Veuillez réessayer ou me contacter directement par email.';
                }
                
                formMessage.textContent = errorMessage;
                formMessage.className = 'form-message error';
                
                // Réactiver le bouton
                submitBtn.disabled = false;
                btnText.textContent = 'Envoyer';
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
            }
        }
        
        // Gestionnaire de clic sur le bouton
        console.log('📌 Attachement de l\'event listener sur le bouton...');
        submitBtn.addEventListener('click', function(e) {
            console.log('🖱️ Bouton cliqué !');
            e.preventDefault();
            e.stopPropagation();
            sendEmail();
            return false;
        });
        console.log('✅ Event listener attaché sur le bouton');
        
        // Gestionnaire de soumission du formulaire (au cas où)
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            sendEmail();
            return false;
        });
    }

    // Attendre que le DOM soit complètement chargé
    console.log('⏳ État du DOM:', document.readyState);
    if (document.readyState === 'loading') {
        console.log('📡 Attente du chargement du DOM...');
        document.addEventListener('DOMContentLoaded', function() {
            console.log('✅ DOM chargé, initialisation du formulaire...');
            initContactForm();
        });
    } else {
        // DOM déjà chargé
        console.log('✅ DOM déjà chargé, initialisation immédiate...');
        initContactForm();
    }
})();

// Tech Icons Hover Effect
document.querySelectorAll('.tech-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.1) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 500);
    }
});

// Code Rain Animation Enhancement
function createCodeRain() {
    const codeRain = document.querySelector('.code-rain');
    if (!codeRain) return;
    
    const codeSnippets = [
        'const code = "awesome";',
        'function develop() { return innovation; }',
        'class Developer { constructor() { this.skills = []; } }',
        'npm install creativity',
        'git commit -m "New feature"',
        'console.log("Hello World!");',
        'const portfolio = { amazing: true };',
        'async function create() { await magic(); }'
    ];
    
    for (let i = 0; i < 10; i++) {
        const codeElement = document.createElement('div');
        codeElement.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        codeElement.style.position = 'absolute';
        codeElement.style.left = Math.random() * 100 + '%';
        codeElement.style.fontFamily = 'Fira Code, monospace';
        codeElement.style.fontSize = '12px';
        codeElement.style.color = 'rgba(57, 255, 20, 0.1)';
        codeElement.style.animation = `rain ${15 + Math.random() * 10}s linear infinite`;
        codeElement.style.animationDelay = Math.random() * 5 + 's';
        codeElement.style.whiteSpace = 'nowrap';
        codeRain.appendChild(codeElement);
    }
}

createCodeRain();

// Glitch Effect on Hover for Code Elements
document.querySelectorAll('.code-block, .code-line').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.animation = 'glitch 0.3s';
    });
});

// Add glitch animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
    }
`;
document.head.appendChild(style);

// Terminal Window Drag Effect (Visual Only)
const terminalWindow = document.querySelector('.terminal-window');
if (terminalWindow) {
    let isPressed = false;
    let startX, startY;
    
    terminalWindow.addEventListener('mousedown', (e) => {
        isPressed = true;
        startX = e.clientX;
        startY = e.clientY;
        terminalWindow.style.cursor = 'grabbing';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isPressed) return;
        
        const x = e.clientX - startX;
        const y = e.clientY - startY;
        
        terminalWindow.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    document.addEventListener('mouseup', () => {
        isPressed = false;
        terminalWindow.style.cursor = 'grab';
        terminalWindow.style.transform = 'translate(0, 0)';
    });
}


// Console Easter Egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        console.log('%c🎉 Code Konami activé ! 🎉', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
        console.log('%cVous êtes un développeur incroyable !', 'color: #ff006e; font-size: 16px;');
        
        // Add special effect
        document.body.style.animation = 'rainbow 2s';
    }
});

// Rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

