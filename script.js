/**
 * Professional 3D Portfolio Script
 * Engineered for Tier-1 Tech (Google, Oracle, Meta)
 * - Three.js 3D Interactive Particle Network
 * - Real-time 3D Card Perspective Tilt & Glare Physics
 * - Recruiter AI Interactive Terminal Assistant
 * - Left Vertical Sidebar Scroll Spy & Mobile Drawer
 * - Dynamic Theme Persistence & Year
 */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------------------
  // 1. Three.js 3D Interactive Background Simulation
  // -------------------------------------------------------------------------
  const init3DBackground = () => {
    const canvas = document.getElementById('bg-canvas-3d');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Cloud
    const particleCount = 220;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x6366f1); // Indigo
    const color2 = new THREE.Color(0x06b6d4); // Cyan

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 60;
      positions[i + 1] = (Math.random() - 0.5) * 60;
      positions[i + 2] = (Math.random() - 0.5) * 40;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle 3D Wireframe Icosahedron floating in space
    const icoGeometry = new THREE.IcosahedronGeometry(8, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    scene.add(icoMesh);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const animate = () => {
      requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0004;

      icoMesh.rotation.x += 0.001;
      icoMesh.rotation.y += 0.0015;

      camera.position.x = targetX * 3;
      camera.position.y = -targetY * 3;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  };

  init3DBackground();

  // -------------------------------------------------------------------------
  // 2. 3D Perspective Tilt Physics with Specular Glare (Hero Card & Spotlights)
  // -------------------------------------------------------------------------
  const heroCard = document.getElementById('hero-3d-stage');
  const cardGlare = document.getElementById('card-glare');

  if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -14;
      const rotateY = ((x - centerX) / centerX) * 14;

      heroCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      if (cardGlare) {
        cardGlare.style.opacity = '1';
        cardGlare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.28) 0%, transparent 60%)`;
      }
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      if (cardGlare) {
        cardGlare.style.opacity = '0';
      }
    });
  }

  // Tilt effect for cards with [data-tilt]
  const tiltElements = document.querySelectorAll('[data-tilt]');
  tiltElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });

  // -------------------------------------------------------------------------
  // 3. Recruiter AI Terminal & Intelligence Chat System
  // -------------------------------------------------------------------------
  const chatForm = document.getElementById('chat-input-form');
  const chatInput = document.getElementById('chat-user-input');
  const dialogueScreen = document.getElementById('chat-dialogue-screen');
  const quickPromptBtns = document.querySelectorAll('.quick-chip-btn');

  const recruiterKnowledgeBase = [
    {
      keywords: ['why', 'hire', 'google', 'oracle', 'fit', 'candidate'],
      response: "Ravi brings a rare combination of strong theoretical foundations from VTU, proven algorithmic problem-solving in Python & C, and practical applied AI experience. His academic distinction (85.5% Pre-University, SGPA 7.0) reflects disciplined work ethic, intellectual agility, and immediate potential in high-scale distributed teams like Google or Oracle."
    },
    {
      keywords: ['tech', 'stack', 'languages', 'skills', 'programming'],
      response: "Ravi's core competencies: Languages (Python, C, SQL, JavaScript), AI & Machine Learning (Model training, data preprocessing, recommendation systems), Database Design (Relational schema modeling & complex queries), and CAED mathematical modeling. He emphasizes clean code, time complexity optimization, and scalable software design."
    },
    {
      keywords: ['food', 'packaging', 'ai', 'project', 'spoilage'],
      response: "Ravi's 'AI-Based Intelligent Food Packaging Recommendation System' is an end-to-end intelligent platform that mitigates food spoilage. It uses multi-factor algorithmic matching on moisture, oxidation risk, and storage conditions to recommend precise preservation packaging with real-time UI feedback."
    },
    {
      keywords: ['geometry', 'spatial', 'caed', 'suite', 'math'],
      response: "The 'Parametric & Spatial Geometry Suite' demonstrates deep spatial and mathematical computing. Ravi built models for geometric prisms, pyramids, and cones, incorporating programmatic mathematical checks for true lengths, dimensional clearance envelopes, and orthographic projections."
    },
    {
      keywords: ['contact', 'interview', 'schedule', 'email', 'phone', 'hire'],
      response: "You can reach Ravi immediately at ravishetty936@gmail.com or by phone at +91 7975139067. He is open for Software Engineer Internships and Full-Time Developer opportunities, including immediate technical screening rounds."
    },
    {
      keywords: ['education', 'college', 'vtu', 'ait', 'gpa', 'marks'],
      response: "Ravi is pursuing his Bachelor of Engineering in Electronics & Communication at Adichunchanagiri Institute of Technology (AIT, VTU) with a current SGPA of 7.0. Prior to this, he scored 85.5% in Pre-University (Sri Chaitanya) and 73.3% in SSLC (St. Joseph's)."
    }
  ];

  const appendMessage = (sender, text) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `dialogue-msg ${sender === 'user' ? 'user-msg' : 'bot-msg'}`;

    const avatar = sender === 'user' ? '&#128100;' : '&#129302;';
    const senderName = sender === 'user' ? 'You' : 'Recruiter AI';

    msgDiv.innerHTML = `
      <div class="msg-avatar-badge">${avatar}</div>
      <div class="msg-bubble">
        <p><strong>${senderName}:</strong> ${escapeHTML(text)}</p>
      </div>
    `;

    dialogueScreen.appendChild(msgDiv);
    dialogueScreen.scrollTop = dialogueScreen.scrollHeight;
  };

  const handleRecruiterQuery = (queryText) => {
    if (!queryText.trim()) return;

    appendMessage('user', queryText);

    // Simulate intelligent bot response
    setTimeout(() => {
      const lower = queryText.toLowerCase();
      let matched = recruiterKnowledgeBase.find(item => 
        item.keywords.some(kw => lower.includes(kw))
      );

      const botReply = matched 
        ? matched.response 
        : `Ravi is prepared for challenging software engineering roles. He specializes in Python, C, SQL, and Machine Learning. Would you like to schedule an interview or explore his GitHub at github.com/ravishetty936?`;

      appendMessage('bot', botReply);
    }, 380);
  };

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (val) {
        handleRecruiterQuery(val);
        chatInput.value = '';
      }
    });
  }

  quickPromptBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-query');
      if (query) {
        handleRecruiterQuery(query);
      }
    });
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, (tag) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // -------------------------------------------------------------------------
  // 4. Vertical Sidebar Navigation, Scroll Spy & Mobile Drawer
  // -------------------------------------------------------------------------
  const menuBtn = document.getElementById('menu-toggle-btn');
  const sidebar = document.getElementById('pro-sidebar');
  const backdrop = document.getElementById('drawer-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const openDrawer = () => {
    if (!sidebar) return;
    sidebar.classList.add('open');
    document.body.classList.add('drawer-open');
    if (backdrop) backdrop.classList.add('active');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    if (!sidebar) return;
    sidebar.classList.remove('open');
    document.body.classList.remove('drawer-open');
    if (backdrop) backdrop.classList.remove('active');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  };

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.contains('open') ? closeDrawer() : openDrawer();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
      closeDrawer();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) closeDrawer();
    });
  });

  // Scroll Spy for Left Sidebar
  const onScrollSpy = () => {
    const scrollPos = window.scrollY + 200;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScrollSpy, { passive: true });
  onScrollSpy();

  // -------------------------------------------------------------------------
  // 5. Theme Toggle System (Night / Light Mode Persistence)
  // -------------------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeSwitch = document.getElementById('mobile-theme-switch');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('ravi-pro-theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);

  const toggleTheme = () => {
    const cur = root.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('ravi-pro-theme', next);
  };

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeSwitch) mobileThemeSwitch.addEventListener('click', toggleTheme);

  // -------------------------------------------------------------------------
  // 6. Dynamic Copyright Year
  // -------------------------------------------------------------------------
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
