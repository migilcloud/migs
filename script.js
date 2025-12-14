/* TYPING EFFECT */
const nameText = "Miguel Rosales";
let index = 0;

function typeEffect() {
  const element = document.getElementById("typed-name");
  if (!element) return;

  if (index < nameText.length) {
    element.textContent += nameText.charAt(index);
    index++;
    setTimeout(typeEffect, 120);
  }
}

window.onload = () => {
  typeEffect();
  initParticles();
  initScrollReveal();
  initTiltEffects();
  initSmoothScroll();
};


/* ADVANCED PARTICLE SYSTEM */

let canvas, ctx;
let particles = [];
let gridSquares = [];
let w, h;

function initParticles() {
  canvas = document.getElementById("particle-canvas");
  ctx = canvas.getContext("2d");

  resizeCanvas();

  generateParticles();
  generateGrid();

  animate();
}

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", () => {
  resizeCanvas();
  particles = [];
  gridSquares = [];
  generateParticles();
  generateGrid();
});

/* Small floating sparks */
function generateParticles() {
  const count = 70;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 1.3,
      speedY: (Math.random() - 0.5) * 1.3
    });
  }
}

/* Hologram grid squares */
function generateGrid() {
  const count = 45;

  for (let i = 0; i < count; i++) {
    gridSquares.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 30 + 10,
      alpha: Math.random() * 0.3 + 0.1,
      pulse: Math.random() * 0.01 + 0.005
    });
  }
}

/* Main animation loop */
function animate() {
  ctx.clearRect(0, 0, w, h);

  drawParticles();
  drawGrid();

  requestAnimationFrame(animate);
}

function drawParticles() {
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "#bb00ff";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#bb00ff";
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > w) p.speedX *= -1;
    if (p.y < 0 || p.y > h) p.speedY *= -1;
  });
}

function drawGrid() {
  gridSquares.forEach(g => {
    ctx.strokeStyle = `rgba(190, 0, 255, ${g.alpha})`;
    ctx.lineWidth = 1;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#bb00ff";
    ctx.strokeRect(g.x, g.y, g.size, g.size);

    g.alpha += g.pulse;
    if (g.alpha > 0.45 || g.alpha < 0.1) g.pulse *= -1;
  });
}


/* SCROLL REVEAL */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 120) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
}


/* 3D TILT EFFECT */
function initTiltEffects() {
  const tiltElements = document.querySelectorAll(".tilt");

  tiltElements.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      card.style.transform =
        `rotateY(${x * 0.03}deg) rotateX(${-y * 0.03}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateY(0deg) rotateX(0deg)";
    });
  });
}


/* SMOOTH SCROLL FOR HEX MENU */
function initSmoothScroll() {
  const links = document.querySelectorAll(".hex-nav .hex-btn");
  if (!links.length) return;

  links.forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");

      if (!targetId.startsWith("#")) return;

      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 40,
          behavior: "smooth"
        });
      }
    });
  });
}


/* OPTIONAL: PROJECT CLICK HANDLER */
function openProject(id) {
  alert(`🚀 Opening Project ${id}`);
}
