'use strict';

// ===== CURSOR =====
(function() {
  const cursor = document.getElementById('cursor');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  (function loop() {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(loop);
  })();
})();

// ===== COUNT-UP =====
let statsTriggered = false;
function triggerStats() {
  if (statsTriggered) return;
  statsTriggered = true;
  const els = document.querySelectorAll('[data-count]');
  els.forEach(el => {
    const target = parseInt(el.dataset.count);
    const suffix = target >= 10 ? '+' : '';
    let val = 0;
    const inc = target / 50;
    const timer = setInterval(() => {
      val = Math.min(val + inc, target);
      el.textContent = Math.floor(val) + (val >= target ? suffix : '');
      if (val >= target) clearInterval(timer);
    }, 30);
  });
}

// ===== ULTRA SMOOTH SCROLL =====
(function() {
  if (window.innerWidth <= 1024) return;
  const track = document.getElementById('scrollTrack');
  const sections = Array.from(document.querySelectorAll('.section'));
  const dots = Array.from(document.querySelectorAll('.sdot'));
  const navIndicator = document.getElementById('navIndicator');
  const nav = document.getElementById('nav');
  const total = sections.length;
  let currentIdx = 0;
  let isAnimating = false;

  // Activate section
  function goToSection(idx) {
    if (idx < 0 || idx >= total) return;
    
    currentIdx = idx;
    isAnimating = true;

    // Move track
    track.style.transform = `translateY(-${currentIdx * 100}vh)`;
    track.style.setProperty('--current-index', currentIdx);

    // Toggle theme for navigation
    nav.classList.toggle('light-theme', currentIdx === 1);
    document.getElementById('sectionDots').classList.toggle('light-theme', currentIdx === 1);

    // Update active classes
    sections.forEach((s, i) => {
      if (i === currentIdx) {
        s.classList.add('active');
        // trigger count-up stats if in hero
        if (i === 0) triggerStats();
      } else {
        s.classList.remove('active');
      }
    });

    dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
    navIndicator.style.width = ((currentIdx / (total - 1)) * 100) + '%';
    nav.classList.toggle('compact', currentIdx > 0);

    // Prevent immediate multiple scrolls
    setTimeout(() => {
      isAnimating = false;
    }, 1200); // match css transition time
  }

  // Mouse wheel & touch
  let lastScrollTime = 0;
  const scrollCooldown = 1500; // 1.5 seconds cooldown between section jumps

  window.addEventListener('wheel', e => {
    const timeNow = new Date().getTime();
    if (timeNow - lastScrollTime < scrollCooldown) return;
    
    if (e.deltaY > 5) {
      goToSection(currentIdx + 1);
      lastScrollTime = timeNow;
    } else if (e.deltaY < -5) {
      goToSection(currentIdx - 1);
      lastScrollTime = timeNow;
    }
  }, { passive: true });

  // Touch swipe
  let touchStartY = 0;
  window.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', e => {
    const timeNow = new Date().getTime();
    if (timeNow - lastScrollTime < scrollCooldown) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    if (diff > 40) {
      goToSection(currentIdx + 1);
      lastScrollTime = timeNow;
    } else if (diff < -40) {
      goToSection(currentIdx - 1);
      lastScrollTime = timeNow;
    }
  }, { passive: true });

  // Keyboard
  window.addEventListener('keydown', e => {
    const timeNow = new Date().getTime();
    if (timeNow - lastScrollTime < scrollCooldown) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      goToSection(currentIdx + 1);
      lastScrollTime = timeNow;
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      goToSection(currentIdx - 1);
      lastScrollTime = timeNow;
    }
  });

  // Nav clicks
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSection(parseInt(dot.dataset.index));
      lastScrollTime = new Date().getTime();
    });
  });

  document.querySelectorAll('.nav-link[data-section]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      goToSection(parseInt(link.dataset.section));
      lastScrollTime = new Date().getTime();
    });
  });

  // Support CTA/Scroll buttons
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      goToSection(parseInt(btn.dataset.scrollTo));
      lastScrollTime = new Date().getTime();
    });
  });

  // Init
  goToSection(0);
})();

// ===== PLEXUS CONSTELLATION NETWORK =====
// IT Park style: dot grid + floating connected particles + mouse interaction
function initPlexus(canvas, baseHue, maxParticles, isLight = false) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  maxParticles = maxParticles || 80;
  let W = 0, H = 0;
  let nodes = [];
  let mouseX = -9999, mouseY = -9999;
  let phase = Math.random() * 6283; // random start phase

  function setSize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
    if (W === 0 || H === 0) {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    seedNodes();
  }

  function seedNodes() {
    nodes = [];
    const area = W * H;
    const count = Math.max(30, Math.min(maxParticles, Math.floor(area / 16000)));
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1.5
      });
    }
  }

  function render() {
    if (W === 0 || H === 0) { requestAnimationFrame(render); return; }
    ctx.clearRect(0, 0, W, H);
    phase += 0.004;

    // Living hue oscillation ±30 degrees
    const hue = ((baseHue + Math.sin(phase) * 30) % 360 + 360) % 360;

    // --- Layer 1: Static dot grid (like IT Park) ---
    const gridSpacing = 60;
    for (let gx = gridSpacing / 2; gx < W; gx += gridSpacing) {
      for (let gy = gridSpacing / 2; gy < H; gy += gridSpacing) {
        ctx.beginPath();
        ctx.arc(gx, gy, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)';
        ctx.fill();
      }
    }

    // --- Layer 2: Radial glow at center ---
    const grd = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.55);
    grd.addColorStop(0, isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.05)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    // --- Layer 3: Moving particles + connecting lines ---
    const n = nodes.length;
    const linkDist = 160;
    const mouseDist = 220;

    for (let i = 0; i < n; i++) {
      const a = nodes[i];
      // Move
      a.x += a.vx;
      a.y += a.vy;
      // Bounce
      if (a.x < 0 || a.x > W) a.vx *= -1;
      if (a.y < 0 || a.y > H) a.vy *= -1;
      a.x = Math.max(0, Math.min(W, a.x));
      a.y = Math.max(0, Math.min(H, a.y));

      // Draw node dot
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLight ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.45)';
      ctx.fill();

      // Connect to nearby nodes
      for (let j = i + 1; j < n; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < linkDist) {
          const opacity = (1 - dist / linkDist) * 0.35;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = isLight ? `rgba(0,0,0,${opacity * 0.4})` : `rgba(255,255,255,${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Connect to mouse cursor
      const mdx = a.x - mouseX;
      const mdy = a.y - mouseY;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < mouseDist) {
        const opacity = (1 - mDist / mouseDist) * 0.55;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = isLight ? `rgba(0,0,0,${opacity * 0.5})` : `rgba(255,255,255,${opacity})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }

    requestAnimationFrame(render);
  }

  // Track mouse globally (works with transform-based scroll)
  document.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  window.addEventListener('resize', setSize);
  setSize();
  render();
}

// ===== INTERACTIVE SERVICES TABS =====
(function() {
  const tabItems = document.querySelectorAll('.services-nav-item');
  const panels = document.querySelectorAll('.services-panel');
  let activeIndex = 0;
  let cycleTimer = null;
  let isPaused = false;

  function activateTab(index) {
    activeIndex = index;
    tabItems.forEach((el, i) => el.classList.toggle('active', i === index));
    panels.forEach((p, i) => {
      const target = tabItems[index].dataset.target;
      p.classList.toggle('active', p.dataset.panel === target);
    });
  }

  function nextTab() {
    activateTab((activeIndex + 1) % tabItems.length);
  }

  function startCycle() {
    stopCycle();
    cycleTimer = setInterval(() => {
      if (!isPaused) nextTab();
    }, 3500);
  }

  function stopCycle() {
    if (cycleTimer) {
      clearInterval(cycleTimer);
      cycleTimer = null;
    }
  }

  // Hover interaction
  tabItems.forEach((item, i) => {
    item.addEventListener('mouseenter', () => {
      isPaused = true;
      activateTab(i);
    });
  });

  // Resume cycling when mouse leaves the entire services nav area
  const navList = document.querySelector('.services-nav-list');
  if (navList) {
    navList.addEventListener('mouseleave', () => {
      isPaused = false;
      startCycle(); // restart timer fresh
    });
  }

  // Boot
  activateTab(0);
  startCycle();
})();

// ===== BOOT ALL CANVASES =====
(function() {
  initPlexus(document.getElementById('heroCanvas'), 240, 80, false);
  initPlexus(document.getElementById('servicesCanvas'), 265, 70, true);
  initPlexus(document.getElementById('teamCanvas'), 250, 75, false);
  initPlexus(document.getElementById('blogCanvas'), 240, 70, false);
  initPlexus(document.getElementById('contactCanvas'), 280, 60, false);
})();



// ===== MOBILE NAV HAMBURGER =====
(function() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  // Inject hamburger button
  const hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  hamburger.innerHTML = '<span></span><span></span><span></span>';

  // Inject mobile overlay
  const overlay = document.createElement('div');
  overlay.className = 'nav-mobile-overlay';
  overlay.innerHTML = `
    <a href="#s-hero" class="nav-link" data-mobile-section="0">Home</a>
    <a href="#s-services" class="nav-link" data-mobile-section="1">Services</a>
    <a href="#s-team" class="nav-link" data-mobile-section="2">Team</a>
    <a href="#s-blog" class="nav-link" data-mobile-section="3">Blog</a>
    <a href="#s-contact" class="nav-link" data-mobile-section="4">Contact</a>
  `;
  document.body.appendChild(overlay);

  // Only show hamburger on mobile
  function checkMobile() {
    if (window.innerWidth <= 1024) {
      if (!nav.querySelector('.nav-hamburger')) {
        nav.appendChild(hamburger);
      }
    } else {
      hamburger.remove();
      overlay.classList.remove('open');
      hamburger.classList.remove('open');
    }
  }
  checkMobile();
  window.addEventListener('resize', checkMobile);

  hamburger.addEventListener('click', () => {
    const isOpen = overlay.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Mobile nav links close overlay and scroll to section
  overlay.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
      const sectionId = link.getAttribute('href');
      const target = document.querySelector(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();

// ===== MOBILE SCROLL ANIMATIONS via IntersectionObserver =====
(function() {
  if (window.innerWidth > 1024) return; // Desktop uses custom scroll system
  
  const animChildren = document.querySelectorAll('.anim-child');
  // Force visible immediately on mobile (CSS already handles this, but reset any inline styles)
  animChildren.forEach(el => {
    el.style.opacity = '';
    el.style.transform = '';
  });

  // Make sections "active" when scrolled into view (for count-up etc.)
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.dataset.index === '0') {
          triggerStats();
        }
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
})();

// ===== MOBILE TAP TO REVEAL MEMBER CARD DETAILS =====
(function() {
  function initTapCards() {
    if (window.innerWidth > 1024) return;
    const cards = document.querySelectorAll('.member-card');
    cards.forEach(card => {
      card.addEventListener('click', function(e) {
        // Don't toggle if clicking on a link inside
        if (e.target.closest('a')) return;
        const isOpen = card.classList.contains('tapped');
        // Close all others
        cards.forEach(c => c.classList.remove('tapped'));
        // Toggle current
        if (!isOpen) card.classList.add('tapped');
      });
    });
  }
  // Run on load
  initTapCards();
  // Re-run on resize in case of orientation change
  window.addEventListener('resize', initTapCards);
})();