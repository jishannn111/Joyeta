/* ============================================================
   For Joyeta ❤️ — From Jishan
   All interactive behavior lives here.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initPetals();
  initFloatingHearts();
  initFireflies();
  initShootingStars();
  initCursorGlow();
  initRippleOnClick();
  initTypewriter();
  initScrollReveal();
  initQuotes();
  initForgiveButton();
  initMusic();
  initGlowHeartClick();
});

/* ---------------- Twinkling star field on canvas ---------------- */
function initStars() {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.documentElement.scrollHeight;
    const count = Math.floor((width * height) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.006,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, width, height);
    for (const s of stars) {
      const twinkle = 0.5 + 0.5 * Math.sin(t * s.speed + s.phase);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.25 + twinkle * 0.6})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
}

/* ---------------- Falling rose petals ---------------- */
function initPetals() {
  const layer = document.getElementById('petals-layer');
  const petals = ['🌸', '🌹', '🥀'];
  function spawn() {
    const el = document.createElement('span');
    el.className = 'petal';
    el.textContent = petals[Math.floor(Math.random() * petals.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
    el.style.animationDuration = (8 + Math.random() * 8) + 's';
    el.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
    layer.appendChild(el);
    setTimeout(() => el.remove(), 17000);
  }
  setInterval(spawn, 900);
  for (let i = 0; i < 6; i++) setTimeout(spawn, i * 300);
}

/* ---------------- Floating glowing hearts ---------------- */
function initFloatingHearts() {
  const layer = document.getElementById('hearts-layer');
  function spawn() {
    const el = document.createElement('span');
    el.className = 'float-heart';
    el.textContent = '❤';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.setProperty('--drift', (Math.random() * 100 - 50) + 'px');
    el.style.animationDuration = (10 + Math.random() * 8) + 's';
    el.style.fontSize = (0.8 + Math.random() * 1.4) + 'rem';
    layer.appendChild(el);
    setTimeout(() => el.remove(), 19000);
  }
  setInterval(spawn, 1400);
  for (let i = 0; i < 4; i++) setTimeout(spawn, i * 500);
}

/* ---------------- Fireflies ---------------- */
function initFireflies() {
  const layer = document.getElementById('fireflies-layer');
  const count = 18;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'firefly';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = Math.random() * 100 + 'vh';
    el.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px');
    el.style.setProperty('--dy', (Math.random() * 60 - 30) + 'px');
    el.style.animationDuration = (3 + Math.random() * 4) + 's';
    el.style.animationDelay = (Math.random() * 4) + 's';
    layer.appendChild(el);
  }
}

/* ---------------- Occasional shooting stars ---------------- */
function initShootingStars() {
  const layer = document.getElementById('shooting-stars-layer');
  function spawn() {
    const el = document.createElement('span');
    el.className = 'shooting-star';
    el.style.left = (20 + Math.random() * 60) + 'vw';
    el.style.top = (Math.random() * 30) + 'vh';
    layer.appendChild(el);
    setTimeout(() => el.remove(), 3300);
  }
  setInterval(spawn, 4500 + Math.random() * 3000);
}

/* ---------------- Cursor glow that follows pointer ---------------- */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (window.matchMedia('(hover: none)').matches) {
    glow.style.display = 'none';
    return;
  }
  window.addEventListener('pointermove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });
}

/* ---------------- Ripple effect on click ---------------- */
function initRippleOnClick() {
  const layer = document.getElementById('ripple-layer');
  document.addEventListener('click', (e) => {
    const el = document.createElement('span');
    el.className = 'ripple';
    el.style.left = e.clientX + 'px';
    el.style.top = e.clientY + 'px';
    layer.appendChild(el);
    setTimeout(() => el.remove(), 950);
  });
}

/* ---------------- Typewriter effect for the apology letter ---------------- */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  const caret = document.getElementById('caret');
  const fullText = el.getAttribute('data-full');
  el.textContent = '';

  let started = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        started = true;
        typeOut();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(el);

  function typeOut() {
    let i = 0;
    const speed = 22;
    function step() {
      if (i <= fullText.length) {
        el.textContent = fullText.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else if (caret) {
        caret.style.display = 'none';
      }
    }
    step();
  }
}

/* ---------------- Scroll-reveal animations ---------------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((item) => observer.observe(item));
}

/* ---------------- Rotating romantic quotes ---------------- */
function initQuotes() {
  const quotes = [
    "Love isn't about being perfect. It's about never giving up.",
    "Every love story is beautiful, but ours is my favorite.",
    "I still choose you.",
  ];
  const el = document.getElementById('quote-text');
  let index = 0;
  setInterval(() => {
    el.classList.add('fade');
    setTimeout(() => {
      index = (index + 1) % quotes.length;
      el.textContent = quotes[index];
      el.classList.remove('fade');
    }, 600);
  }, 4200);
}

/* ---------------- Forgive Me button: hearts, confetti, fireworks ---------------- */
function initForgiveButton() {
  const btn = document.getElementById('forgive-btn');
  const message = document.getElementById('forgive-message');
  let triggered = false;

  btn.addEventListener('click', () => {
    heartExplosion(btn);
    confettiBurst();
    fireworksBurst();
    if (!triggered) {
      triggered = true;
      setTimeout(() => message.classList.add('show'), 400);
    }
  });
}

function heartExplosion(originEl) {
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const count = 22;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'burst-heart';
    el.textContent = '❤';
    el.style.left = cx + 'px';
    el.style.top = cy + 'px';
    el.style.color = ['#ff5c8a', '#ff2f6e', '#f4c76b', '#9b5de5'][i % 4];
    el.style.fontSize = (1 + Math.random() * 1.4) + 'rem';
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
    const dist = 140 + Math.random() * 160;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    el.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.6)', opacity: 1 },
        { transform: `translate(${dx - rect.width / 2}px, ${dy - rect.height / 2}px) scale(1.1)`, opacity: 0 },
      ],
      { duration: 1100 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.3,1)' }
    );
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1700);
  }
}

function confettiBurst() {
  const colors = ['#ff5c8a', '#ff2f6e', '#f4c76b', '#9b5de5', '#fdf6ff'];
  const count = 60;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'confetti';
    const size = 6 + Math.random() * 6;
    el.style.width = size + 'px';
    el.style.height = size * 0.4 + 'px';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-2vh';
    el.style.borderRadius = '2px';
    const rot = Math.random() * 360;
    const fall = window.innerHeight + 100;
    const drift = (Math.random() - 0.5) * 200;
    el.animate(
      [
        { transform: `translate(0, 0) rotate(${rot}deg)`, opacity: 1 },
        { transform: `translate(${drift}px, ${fall}px) rotate(${rot + 360}deg)`, opacity: 0.9 },
      ],
      { duration: 2200 + Math.random() * 1200, easing: 'ease-in' }
    );
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }
}

function fireworksBurst() {
  const bursts = 3;
  for (let b = 0; b < bursts; b++) {
    setTimeout(() => {
      const cx = window.innerWidth * (0.25 + Math.random() * 0.5);
      const cy = window.innerHeight * (0.2 + Math.random() * 0.35);
      const colors = ['#ff5c8a', '#f4c76b', '#9b5de5', '#ff2f6e'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const sparks = 24;
      for (let i = 0; i < sparks; i++) {
        const el = document.createElement('span');
        el.className = 'firework';
        el.style.left = cx + 'px';
        el.style.top = cy + 'px';
        el.style.width = '4px';
        el.style.height = '4px';
        el.style.borderRadius = '50%';
        el.style.background = color;
        el.style.boxShadow = `0 0 6px 2px ${color}`;
        const angle = (Math.PI * 2 * i) / sparks;
        const dist = 90 + Math.random() * 60;
        el.animate(
          [
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * dist - 2}px, ${Math.sin(angle) * dist - 2}px) scale(0.3)`, opacity: 0 },
          ],
          { duration: 900, easing: 'ease-out' }
        );
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1000);
      }
    }, b * 250);
  }
}

/* ---------------- Little easter egg on the hero glow-heart ---------------- */
function initGlowHeartClick() {
  const heart = document.getElementById('glow-heart');
  if (!heart) return;
  heart.addEventListener('click', () => heartExplosion(heart));
  heart.style.cursor = 'pointer';
}

/* ---------------- Background music: YouTube IFrame API ---------------- */
const YT_VIDEO_ID = 'qoq8B8ThgEM';

function initMusic() {
  const overlay = document.getElementById('music-overlay');
  const toggleBtn = document.getElementById('music-toggle');
  const iconPlay = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  let player = null;
  let apiReady = false;
  let playerReady = false;
  let isPlaying = false;
  let startRequested = false;

  // Load the YouTube IFrame API script.
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);

  window.onYouTubeIframeAPIReady = () => {
    apiReady = true;
    player = new YT.Player('yt-mount', {
      height: '1',
      width: '1',
      videoId: YT_VIDEO_ID,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        loop: 1,
        playlist: YT_VIDEO_ID,
        modestbranding: 1,
      },
      events: {
        onReady: () => {
          playerReady = true;
          if (startRequested) startMusic();
        },
        onStateChange: (e) => {
          isPlaying = e.data === 1;
          updateIcon();
        },
      },
    });
  };

  function updateIcon() {
    iconPlay.style.display = isPlaying ? 'none' : 'block';
    iconPause.style.display = isPlaying ? 'block' : 'none';
  }

  function startMusic() {
    if (!playerReady) {
      startRequested = true;
      return;
    }
    try {
      player.playVideo();
    } catch (e) {
      /* ignore — API may still be initializing */
    }
  }

  function dismissOverlay() {
    overlay.classList.add('hidden');
  }

  function firstInteraction() {
    startMusic();
    dismissOverlay();
    document.removeEventListener('click', firstInteraction);
  }

  overlay.addEventListener('click', firstInteraction);
  document.addEventListener('click', firstInteraction, { once: true });

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!playerReady) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
      dismissOverlay();
    }
  });
}
