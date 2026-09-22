document.addEventListener('DOMContentLoaded', () => {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const preloader = document.getElementById('app-loader');
  const progressFill = document.getElementById('loader-progress-fill');
  const percentText = document.getElementById('loader-percent');
  const typedText = document.getElementById('loader-typed');

  const loaderMessages = [
    'Cargando nuevas ideas',
    'Ordenando proyectos',
    'Escribiendo experiencias',
    'Listo'
  ];

  let progress = motionPreference.matches ? 100 : 0;
  let messageIndex = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 11) + 6;
    progress = Math.min(progress, 100);

    if (progressFill) progressFill.style.width = `${progress}%`;
    if (percentText) percentText.textContent = `${progress}%`;

    const nextIndex = Math.min(Math.floor(progress / 28), loaderMessages.length - 1);
    if (typedText && nextIndex !== messageIndex) {
      messageIndex = nextIndex;
      typedText.textContent = loaderMessages[messageIndex];
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => preloader?.classList.add('fade-out'), motionPreference.matches ? 0 : 450);
    }
  }, 75);

  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let mouse = { x: null, y: null };
    let particles = [];
    const palette = ['#ff7a6b', '#8ee6d1', '#3159ff', '#c6b7ff'];

    function buildParticles() {
      const count = Math.min(Math.floor(width / 22), 70);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 2 + 1,
        color: palette[Math.floor(Math.random() * palette.length)]
      }));
    }

    function animateParticles() {
      if (motionPreference.matches) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.hypot(dx, dy);

          if (distance > 0 && distance < 130) {
            particle.x -= (dx / distance) * 1.8;
            particle.y -= (dy / distance) * 1.8;
          }
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);

          if (distance < 112) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(17, 24, 39, ${0.13 - distance / 1000})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animateParticles);
    }

    window.addEventListener('mousemove', (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      buildParticles();
    });

    buildParticles();
    animateParticles();
    motionPreference.addEventListener('change', (event) => {
      if (!event.matches) animateParticles();
    });
  }

  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow) {
    window.addEventListener('mousemove', (event) => {
      if (motionPreference.matches) return;
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    });
  }

  const tiltElements = document.querySelectorAll('.card-proyecto, .portrait-card');
  tiltElements.forEach((element) => {
    element.addEventListener('mousemove', (event) => {
      if (motionPreference.matches) return;
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = '';
    });
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach((card) => {
        const matches = filter === 'all' || card.getAttribute('data-category') === filter;

        // Apply the latest filter immediately, including keyboard visibility.
        card.hidden = !matches;
      });
    });
  });

  const projectModal = document.getElementById('projectModal');
  if (projectModal) {
    projectModal.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;
      if (!button) return;

      const title = button.getAttribute('data-title') || 'Proyecto';
      const card = button.closest('.card-proyecto');
      const sourceImage = card.querySelector('.proyecto-img-box img');

      document.getElementById('modal-title').textContent = title;
      const modalImage = document.getElementById('modal-img');
      modalImage.src = sourceImage.getAttribute('src');
      modalImage.alt = sourceImage.alt;
      document.getElementById('modal-desc').replaceChildren(
        ...[...card.querySelectorAll('.proyecto-content > p')].map((paragraph) => paragraph.cloneNode(true))
      );

      const modalTagsBox = document.getElementById('modal-tags');
      modalTagsBox.replaceChildren(...[...card.querySelectorAll('.tag-mini')].map((tag) => tag.cloneNode(true)));
    });
  }

  const navbar = document.querySelector('.navbar');
  const scrollBar = document.getElementById('scroll-progress-bar');
  const backToTop = document.getElementById('back-to-top');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressWidth = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    navbar?.classList.toggle('scrolled', scrollTop > 50);
    if (scrollBar) scrollBar.style.width = `${progressWidth}%`;
    backToTop?.classList.toggle('show', scrollTop > 440);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: motionPreference.matches ? 'instant' : 'smooth' });
  });

  const revealTargets = document.querySelectorAll(
    '.section-heading, .about-text, .about-points > div, .tech-badge, .card-proyecto, .timeline-item, .contact-panel, .hero-copy, .hero-visual'
  );

  revealTargets.forEach((element) => element.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (!entry.isIntersecting) return;

      setTimeout(() => entry.target.classList.add('visible'), motionPreference.matches ? 0 : (index % 5) * 80);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  revealTargets.forEach((element) => revealObserver.observe(element));

  const navLinks = document.querySelectorAll('.navbar .nav-link[href^="#"]');
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active-scroll', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-38% 0px -56% 0px' });

  sections.forEach((section) => navObserver.observe(section));

  document.querySelectorAll('.navbar a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('menu');
      if (menu?.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      }
    });
  });

  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = document.getElementById('contact-email').textContent.trim();
      const status = document.getElementById('copy-email-status');
      try {
        if (!navigator.clipboard) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(email);
        status.textContent = 'Correo copiado.';
      } catch {
        status.textContent = 'No se pudo copiar. Podés seleccionar el correo o abrirlo con el enlace.';
      }
    });
  }
});
