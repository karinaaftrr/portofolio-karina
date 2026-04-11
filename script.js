const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

const navLinks = document.querySelectorAll('.nav-link');
const currentPath = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  link.classList.remove('active');

  if (currentPath === href || (currentPath === "" && href === "index.html")) {
    link.classList.add('active');
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');

    if (href.includes('.html') && !href.startsWith('#')) return;

    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const collapse = document.querySelector('#navbarNav');
      if (collapse?.classList.contains('show')) {
        document.querySelector('.navbar-toggler')?.click();
      }

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

if (revealEls.length > 0) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));
}

const typedEl = document.getElementById('typed-text');

if (typedEl) {
  const roles = [
    'UI/UX Enthusiast',
    'Web Developer',
    'CS Student at Unila',
    'Project Manager'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = roles[roleIndex];
    charIndex += isDeleting ? -1 : 1;

    typedEl.textContent = current.substring(0, charIndex);

    let delay = isDeleting ? 50 : 90;

    if (!isDeleting && charIndex === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 1400);
}

const skillCards = document.querySelectorAll('.skill-card');

if (skillCards.length > 0) {
  skillCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();

      const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      card.style.transform =
        `translateY(-6px) rotateX(${-dy * 7}deg) rotateY(${dx * 7}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.45s cubic-bezier(0.22,1,0.36,1)';
    });
  });
}

const statNums = document.querySelectorAll('.stat-num');

if (statNums.length > 0) {
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const raw = el.textContent.trim();
      const match = raw.match(/^(\d+)(\D*)$/);

      if (!match) return;

      const target = parseInt(match[1], 10);
      const suffix = match[2];

      let current = 0;
      const step = Math.ceil(target / 30);

      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;

        if (current >= target) clearInterval(interval);
      }, 40);

      statObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statObserver.observe(el));
}

const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('theme') || 'light';

document.documentElement.dataset.theme = savedTheme === 'dark' ? 'dark' : '';
if (themeIcon) {
  themeIcon.className = savedTheme === 'dark'
    ? 'fa-solid fa-sun'
    : 'fa-solid fa-moon';
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.dataset.theme = isDark ? '' : 'dark';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    themeIcon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  });
}


