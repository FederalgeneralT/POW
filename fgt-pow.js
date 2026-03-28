/* ===================================== */
/* HERO PARTICLES ANIMATION */
const canvas = document.getElementById('hero-particles');
const ctx = canvas.getContext('2d');
let particlesArray = [];
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initParticles();
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = '#E5B84A';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.shadowColor = '#D98A1C';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 120; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

/* ===================================== */
/* FADE-IN ON SCROLL */
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

/* ===================================== */
/* POW GALLERY FUNCTIONALITY WITH FLOAT EFFECT */
const galleryCards = document.querySelectorAll('.gallery-card');
let currentIndex = 0;

function showCard(index) {
  galleryCards.forEach((card, i) => {
    if (i === index) {
      card.style.transform = 'translateX(0) translateZ(50px) scale(1) rotateY(0deg)';
      card.style.opacity = '1';
      card.style.zIndex = '5';
    } else if (i < index) {
      card.style.transform = 'translateX(-180px) translateZ(-20px) scale(0.8) rotateY(-15deg)';
      card.style.opacity = '0.5';
      card.style.zIndex = '3';
    } else {
      card.style.transform = 'translateX(180px) translateZ(-20px) scale(0.8) rotateY(15deg)';
      card.style.opacity = '0.5';
      card.style.zIndex = '3';
    }
  });
}

document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryCards.length) % galleryCards.length;
  showCard(currentIndex);
});

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryCards.length;
  showCard(currentIndex);
});

showCard(currentIndex);

/* Smooth floating animation for gallery cards */
galleryCards.forEach(card => {
  let floatDirection = 1;
  setInterval(() => {
    const currentY = parseFloat(card.style.transform.match(/translateY\((-?\d+\.?\d*)px\)/)?.[1]) || 0;
    const newY = currentY + floatDirection * 0.3;
    card.style.transform = card.style.transform.replace(/translateY\((-?\d+\.?\d*)px\)/, `translateY(${newY}px)`);
    if (Math.abs(newY) > 10) floatDirection *= -1;
  }, 50);
});

/* ===================================== */
/* FLOATING ICONS RANDOM POSITIONS & SLOW FLOAT */
const floatingIcons = document.querySelectorAll('.floating-icon');
floatingIcons.forEach(icon => {
  icon.style.top = Math.random() * 90 + 'vh';
  icon.style.left = Math.random() * 90 + 'vw';
  let direction = Math.random() < 0.5 ? 1 : -1;
  setInterval(() => {
    let currentTop = parseFloat(icon.style.top);
    icon.style.top = currentTop + direction * 0.2 + 'px';
    if (currentTop > 90 || currentTop < 0) direction *= -1;
  }, 50);
});

/* ===================================== */
/* HERO PFP HOVER EFFECT */
const heroPFP = document.querySelector('.hero-bg-pfp');
heroPFP.addEventListener('mouseenter', () => {
  heroPFP.style.transform += ' scale(1.05)';
  heroPFP.style.boxShadow = '0 0 120px #E5B84A, 0 0 60px #D98A1C';
});
heroPFP.addEventListener('mouseleave', () => {
  heroPFP.style.transform = 'translate(-50%, -50%)';
  heroPFP.style.boxShadow = '0 0 100px #E5B84A80, 0 0 50px #D98A1C80';
});