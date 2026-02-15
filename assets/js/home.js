// ================================
// SCROLL ANIMATIONS
// ================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Add animation classes to elements when they scroll into view
document.addEventListener('DOMContentLoaded', () => {
    // Observe stats cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe hero content elements
    const heroElements = document.querySelectorAll('.greeting-text, .hero-title, .hero-role, .hero-description');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// ================================
// COUNTER ANIMATION FOR STATS
// ================================

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    let current = 0;
    const increment = target / 60;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 25);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ================================
// SCROLL INDICATOR ANIMATIONS
// ================================

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    // Bounce animation on load
    setTimeout(() => {
        scrollIndicator.style.animation = 'bounce 2s infinite';
    }, 2000);

    // Click to scroll
    scrollIndicator.addEventListener('click', () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    // Hide/show on scroll with fade
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
            scrollIndicator.style.pointerEvents = 'auto';
        }
        
        lastScroll = currentScroll;
    });
}

// ================================
// PARALLAX EFFECT ON SCROLL
// ================================

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 500);
    }
});

// ================================
// TYPING EFFECT FOR ROLE
// ================================

const roleElement = document.querySelector('.hero-role');
if (roleElement) {
    const roleText = roleElement.textContent;
    roleElement.textContent = '';
    
    setTimeout(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < roleText.length) {
                roleElement.textContent += roleText.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                roleElement.classList.add('typing-done');
            }
        }, 100);
    }, 800);
}

// ================================
// MOUSE MOVE PARALLAX FOR SHAPES
// ================================

document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.floating-shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ================================
// NAVBAR SCROLL EFFECT
// ================================

const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});