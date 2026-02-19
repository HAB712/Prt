
    const typedSpan = document.getElementById('typed');
    const roles = ['full‑stack dev', 'ASP.NET dev', 'PHP artisan'];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    function typeEffect() {
      const currentRole = roles[roleIndex];
      if (isDeleting) typedSpan.textContent = currentRole.substring(0, charIndex - 1), charIndex--;
      else typedSpan.textContent = currentRole.substring(0, charIndex + 1), charIndex++;
      if (!isDeleting && charIndex === currentRole.length) { isDeleting = true; setTimeout(typeEffect, 2000); }
      else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeEffect, 300); }
      else setTimeout(typeEffect, isDeleting ? 60 : 100);
    }
    typeEffect();

    // Filter functionality (fixed)
    document.querySelectorAll('.filter').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        document.querySelectorAll('.project-item').forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

   
    function initAtv() {
      const cards = document.querySelectorAll('.atvImg');
      const titles = ['Web development', 'Responsive UI', 'Database integration'];
      const icons = ['fa-laptop-code', 'fa-pen-ruler', 'fa-database'];
      const descs = ['ASP.NET MVC, Web APIs, Laravel.', 'Pixel‑perfect, mobile‑first.', 'MySQL, SQL Server'];
      cards.forEach((card, idx) => {
        card.innerHTML = '';
        const container = document.createElement('div'); container.className = 'atvImg-container';
        const layers = document.createElement('div'); layers.className = 'atvImg-layers';
        const shine = document.createElement('div'); shine.className = 'atvImg-shine';
        const shadow = document.createElement('div'); shadow.className = 'atvImg-shadow';
        // content layer
        const contentDiv = document.createElement('div'); contentDiv.className = 'atvImg-rendered-layer';
        contentDiv.innerHTML = `<div class="service-content"><div class="title-wrapper"><i class="fas ${icons[idx]}"></i><h3>${titles[idx]}</h3></div><p class="service-desc">${descs[idx]}</p></div>`;
        layers.appendChild(contentDiv);
        // second layer for depth
        const extra = document.createElement('div'); extra.className = 'atvImg-rendered-layer'; extra.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 90%)';
        layers.appendChild(extra);
        container.appendChild(shadow); container.appendChild(layers); container.appendChild(shine);
        card.appendChild(container);
      });
      // atv tilt logic (abbreviated, but works with original mousemove from your code)
      attachTilt();
    }
    function attachTilt() {
      document.querySelectorAll('.atvImg').forEach(elem => {
        const container = elem.firstChild;
        const layers = elem.querySelectorAll('.atvImg-rendered-layer');
        const shine = elem.querySelector('.atvImg-shine');
        const total = layers.length;
        const w = elem.clientWidth || 350;
        elem.style.transform = `perspective(${w*3}px)`;
        elem.addEventListener('mousemove', e => {
          const rect = elem.getBoundingClientRect();
          const pageX = e.pageX, pageY = e.pageY;
          const bdst = window.scrollY;
          const offsetX = 0.52 - (pageX - rect.left - window.scrollX) / w;
          const offsetY = 0.52 - (pageY - rect.top - bdst) / (elem.clientHeight||280);
          const dy = (pageY - rect.top - bdst) - (elem.clientHeight/2);
          const dx = (pageX - rect.left - window.scrollX) - (w/2);
          const yRot = (offsetX - dx) * 0.07 * (320/w);
          const xRot = (dy - offsetY) * 0.1 * (320/w);
          let imgCSS = `rotateX(${xRot}deg) rotateY(${yRot}deg)`;
          if (container.className.includes(' over')) imgCSS += ' scale3d(1.05,1.05,1.05)';
          container.style.transform = imgCSS;
          const angle = (Math.atan2(dy, dx) * 180 / Math.PI - 90 + 360) % 360;
          const shineIntensity = (pageY - rect.top - bdst) / elem.clientHeight * 0.3;
          shine.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${shineIntensity}) 0%, transparent 80%)`;
          shine.style.transform = `translateX(${offsetX*total-0.1}px) translateY(${offsetY*total-0.1}px)`;
          let rev = total;
          layers.forEach(ly => {
            const factor = (rev * 2) / (320/w);
            ly.style.transform = `translateX(${offsetX * total * factor}px) translateY(${offsetY * total * factor}px)`;
            rev--;
          });
        });
        elem.addEventListener('mouseenter', () => { container.className += ' over'; });
        elem.addEventListener('mouseleave', () => {
          container.className = container.className.replace(' over','');
          container.style.transform = '';
          shine.style.cssText = '';
          layers.forEach(ly => ly.style.transform = '');
        });
      });
    }
    window.addEventListener('load', initAtv);

    // smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });