/* =====================================================
   ALFHA SOLUCIONES DIGITALES - SCRIPT.JS
   Lógica Interactiva Dinámica y Animaciones Futuristicas
===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------
     1. PRELOADER CON CONTADOR & DESPEGUE DE COHETE
  ----------------------------------------------------- */
  const preloader = document.getElementById('rocket-loader');
  const progressFill = document.getElementById('loader-progress-fill');
  const percentText = document.getElementById('loader-percent');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      if (progressFill) progressFill.style.width = '100%';
      if (percentText) percentText.textContent = '100%';
      
      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('launching');
          setTimeout(() => {
            preloader.classList.add('fade-out');
          }, 600);
        }
      }, 300);
    } else {
      if (progressFill) progressFill.style.width = progress + '%';
      if (percentText) percentText.textContent = progress + '%';
    }
  }, 60);

  /* -----------------------------------------------------
     2. FONDO DE PARTÍCULAS INTERACTIVO EN CANVAS
  ----------------------------------------------------- */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    let particles = [];
    const particleCount = Math.min(Math.floor(width / 18), 85);
    
    let mouse = { x: null, y: null, radius: 150 };
    
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#00f2fe' : '#7000ff';
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        
        // Interactive reaction with cursor
        if (mouse.x && mouse.y) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            let angle = Math.atan2(dy, dx);
            let force = (mouse.radius - dist) / mouse.radius;
            this.x -= Math.cos(angle) * force * 3;
            this.y -= Math.sin(angle) * force * 3;
          }
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i + 1; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${1 - dist / 110 * 0.8})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* -----------------------------------------------------
     3. CURSOR GLOW FOLLOW
  ----------------------------------------------------- */
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  /* -----------------------------------------------------
     4. TYPEWRITER EFFECT EN HERO
  ----------------------------------------------------- */
  const typewriterTarget = document.getElementById('typewriter-text');
  if (typewriterTarget) {
    const phrases = [
      "experiencias digitales asombrosas.",
      "sitios web de alta conversión.",
      "sistemas web a medida.",
      "tiendas online interactivas.",
      "plataformas modernas y rápidas."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typewriterTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2200; // Pause at full phrase
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
      }

      setTimeout(type, speed);
    }
    type();
  }

  /* -----------------------------------------------------
     5. 3D TILT EFFECT EN CARDS & HERO IMAGE
  ----------------------------------------------------- */
  const tiltElements = document.querySelectorAll('.hero-image-wrapper, .card-servicio, .card-proyecto, .calculator-card');
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  /* -----------------------------------------------------
     6. COUNTER ANIMATION EN SECCIÓN ESTADÍSTICAS
  ----------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          let count = 0;
          const speed = target / 35;

          const updateCount = () => {
            count += speed;
            if (count < target) {
              counter.textContent = prefix + Math.ceil(count) + suffix;
              setTimeout(updateCount, 35);
            } else {
              counter.textContent = prefix + target + suffix;
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.getElementById('stats');
  if (statsSection) countObserver.observe(statsSection);

  /* -----------------------------------------------------
     7. FILTRADO DE PROYECTOS
  ----------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  /* -----------------------------------------------------
     8. CALCULADORA EXPRESS DE PRESUPUESTO
  ----------------------------------------------------- */
  const projectTypeInputs = document.querySelectorAll('input[name="project-type"]');
  const addonInputs = document.querySelectorAll('input[name="feature-addon"]');
  const estimatedPriceEl = document.getElementById('estimated-price');
  const sendQuoteBtn = document.getElementById('send-quote-whatsapp');

  function calculateTotal() {
    let total = 0;
    let selectedType = "";

    projectTypeInputs.forEach(input => {
      const parent = input.closest('.calc-box');
      if (input.checked) {
        total += parseInt(input.value);
        selectedType = parent.getAttribute('data-name');
        parent.classList.add('selected');
      } else {
        parent.classList.remove('selected');
      }
    });

    let selectedAddons = [];
    addonInputs.forEach(input => {
      const parent = input.closest('.calc-box');
      if (input.checked) {
        total += parseInt(input.value);
        selectedAddons.push(parent.getAttribute('data-name'));
        parent.classList.add('selected');
      } else {
        parent.classList.remove('selected');
      }
    });

    if (estimatedPriceEl) {
      estimatedPriceEl.textContent = '$' + total.toLocaleString('es-AR');
    }

    if (sendQuoteBtn) {
      let msg = `Hola Vanina! Quisiera cotizar un proyecto en ALFHA:\n- *Tipo*: ${selectedType}\n`;
      if (selectedAddons.length > 0) {
        msg += `- *Adicionales*: ${selectedAddons.join(', ')}\n`;
      }
      msg += `- *Estimado total*: $${total.toLocaleString('es-AR')}`;
      
      sendQuoteBtn.href = `https://wa.me/543425238984?text=${encodeURIComponent(msg)}`;
    }
  }

  projectTypeInputs.forEach(i => i.addEventListener('change', calculateTotal));
  addonInputs.forEach(i => i.addEventListener('change', calculateTotal));
  calculateTotal();

  /* -----------------------------------------------------
     9. MODAL DETALLE DE PROYECTOS
  ----------------------------------------------------- */
  const projectModal = document.getElementById('projectModal');
  if (projectModal) {
    projectModal.addEventListener('show.bs.modal', (e) => {
      const button = e.relatedTarget;
      const title = button.getAttribute('data-title');
      const img = button.getAttribute('data-img');
      const desc = button.getAttribute('data-desc');
      const tags = button.getAttribute('data-tags');

      document.getElementById('modal-title').textContent = title;
      document.getElementById('modal-img').src = img;
      document.getElementById('modal-desc').textContent = desc;

      const modalTagsBox = document.getElementById('modal-tags');
      modalTagsBox.innerHTML = '';
      if (tags) {
        tags.split(',').forEach(tag => {
          const span = document.createElement('span');
          span.className = 'tag-mini';
          span.textContent = tag.trim();
          modalTagsBox.appendChild(span);
        });
      }
    });
  }

  /* -----------------------------------------------------
     10. NAVBAR SCROLL EFFECT
  ----------------------------------------------------- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* -----------------------------------------------------
     11. COPIAR EMAIL AL PORTAPAPELES
  ----------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'vaninamariselcoria75@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
        }, 2000);
      });
    });
  }

});
