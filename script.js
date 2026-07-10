const SYSTEMS_CONFIG = [
  {
    id: 1,
    title: 'منظومة مدرسة الساحل المالية',
    url: 'https://script.google.com/macros/s/AKfycbxlzTFPc-GIUJ5cNH1Nrx6uZ1MCewILLZdfqn7XG-wM1S471PxGx_47RVUi5K7uv6WVrw/exec',
    description: 'إدارة الرسوم الدراسية والحسابات والتقارير المالية.'
  },
  {
    id: 2,
    title: 'منظومة الشؤون الفنية والهندسية',
    url: 'https://script.google.com/macros/s/AKfycbwMDEh4_o5WPMR4udAsKrOKl7tc2a0tLSz6n1jwuvvx059jjvdLcJp3Je_fTgd8soHb/exec',
    description: 'إدارة أعمال الصيانة والأصول والمشروعات الفنية والهندسية.'
  },
  {
    id: 3,
    title: 'منظومة وزارة التربية والتعليم',
    url: 'https://nec.gov.ly/SRS/UserLogin.aspx?value=login',
    description: 'الوصول إلى الخدمات الإلكترونية الخاصة بوزارة التربية والتعليم.'
  },
  {
    id: 4,
    title: 'منظومة شؤون الطلبة والامتحانات',
    url: 'https://edu-libya.com/student/admin/login',
    description: 'إدارة بيانات الطلبة والنتائج والامتحانات.'
  },
  {
    id: 5,
    title: 'منظومة احتساب نتيجة الشهادتين',
    url: 'https://alariby-pixel.github.io/alsahal/',
    description: 'حاسبة احترافية لحساب النتائج.'
  },
  {
    id: 6,
    title: 'منصة الضرائب',
    url: 'https://ly.tax/',
    description: 'الخدمات الإلكترونية لمصلحة الضرائب.'
  },
  {
    id: 7,
    title: 'بوابة إعداد الموازنة العامة',
    url: 'https://budget.mopaf.info/login',
    description: 'منظومة إعداد الموازنة العامة.'
  },
  {
    id: 8,
    title: 'مركز المناهج والمقررات الدراسية',
    url: 'https://t.me/Manahej2026',
    description: 'الوصول إلى المناهج والمقررات الدراسية.'
  }
];

(function () {
  'use strict';

  const DAYS = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

  /* ===== LOADER ===== */
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderPercent = document.getElementById('loaderPercent');
  const loaderText = document.getElementById('loaderText');

  function initLoader() {
    var progress = 0;
    var interval = setInterval(function () {
      progress += Math.random() * 10 + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      loaderBar.style.width = progress + '%';
      loaderPercent.textContent = Math.floor(progress) + '%';
      loaderText.textContent = progress < 100 ? 'جاري تحميل المنظومات...' : 'تم التحميل بنجاح!';
      if (progress >= 100) {
        setTimeout(function () {
          loader.classList.add('hidden');
          document.body.style.overflow = '';
          if (typeof AOS !== 'undefined') {
            AOS.init({ duration: 800, once: true, offset: 80, easing: 'ease-out-cubic' });
          }
          animateHero();
          animateCounters();
        }, 500);
      }
    }, 180);

    gsap.fromTo('.loader-icon', { scale: 0.6, opacity: 0, rotation: -30 }, { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.6)' });
    gsap.fromTo('.loader-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.3, ease: 'power3.out' });
    gsap.fromTo('.loader-progress', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.6, ease: 'power2.out' });
  }

  /* ===== CLOCK ===== */
  function updateClock() {
    var now = new Date();
    var h24 = now.getHours();
    var ampm = h24 >= 12 ? 'م' : 'ص';
    var h12 = h24 % 12 || 12;
    var h = String(h12).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    var s = String(now.getSeconds()).padStart(2, '0');
    var timeStr = h + ':' + m + ':' + s + ' ' + ampm;
    var dateStr = DAYS[now.getDay()] + '، ' + now.getDate() + ' ' + MONTHS[now.getMonth()] + ' ' + now.getFullYear();

    document.getElementById('navClock').textContent = timeStr;
    document.getElementById('heroClock').textContent = timeStr;
    document.getElementById('heroDate').textContent = dateStr;
    document.getElementById('navDate').textContent = dateStr;
  }

  /* ===== NAVBAR ===== */
  function initNavbar() {
    var navbar = document.getElementById('navbar');
    var toggle = document.getElementById('navToggle');
    var navInfo = document.getElementById('navInfo');

    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });

    toggle.addEventListener('click', function () {
      var isOpen = navInfo.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ===== HERO PARTICLES ===== */
  function initParticles() {
    var canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var mouseX = -1000, mouseY = -1000;

    function resize() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    canvas.addEventListener('mousemove', function (e) {
      var rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', function () {
      mouseX = -1000;
      mouseY = -1000;
    });

    for (var i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        p.x += p.speedX;
        p.y += p.speedY;

        var dx = mouseX - p.x;
        var dy = mouseY - p.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          var force = (120 - dist) / 120 * 0.5;
          p.x -= dx / dist * force;
          p.y -= dy / dist * force;
        }

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(148, 163, 184, ' + p.opacity + ')';
        ctx.fill();
      });

      particles.forEach(function (p, i) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = p.x - particles[j].x;
          var dy = p.y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(148, 163, 184, ' + (0.04 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  /* ===== GSAP HERO ANIMATION ===== */
  function animateHero() {
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('#heroLogo', { y: 50, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)' })
      .fromTo('#heroBadge', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
      .fromTo('#heroTitle', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.3')
      .fromTo('#heroSubtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
      .fromTo('#heroStats', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3')
      .fromTo('.scroll-indicator', { opacity: 0 }, { opacity: 0.5, duration: 0.5 }, '-=0.2');
  }

  /* ===== COUNTERS ===== */
  function animateCounters() {
    gsap.fromTo('#heroTotal', { textContent: 0 }, { textContent: SYSTEMS_CONFIG.length, duration: 1.5, ease: 'power2.out', snap: { textContent: 1 } });
  }

  /* ===== RENDER SYSTEMS ===== */
  function renderSystems(query) {
    var grid = document.getElementById('systemsGrid');
    var noResults = document.getElementById('noResults');
    var filtered = SYSTEMS_CONFIG;

    if (query && query.trim()) {
      var q = query.trim();
      filtered = SYSTEMS_CONFIG.filter(function (s) {
        return s.title.includes(q) || s.description.includes(q);
      });
    }

    document.getElementById('resultsCount').textContent = filtered.length;
    document.getElementById('heroTotal').textContent = filtered.length;

    if (filtered.length === 0) {
      grid.innerHTML = '';
      noResults.style.display = 'block';
      return;
    }

    noResults.style.display = 'none';
    grid.innerHTML = '';

    filtered.forEach(function (system) {
      var card = document.createElement('article');
      card.className = 'system-card';
      card.setAttribute('data-aos', 'fade-up');
      card.setAttribute('data-aos-delay', '100');
      card.setAttribute('role', 'listitem');

      var imgSrc = 'assets/images/' + system.id + '.png';
      var titleHtml = query ? highlightText(system.title, query) : system.title;
      var descHtml = query ? highlightText(system.description, query) : system.description;

      card.innerHTML =
        '<div class="card-glow"></div>' +
        '<div class="card-image-wrap">' +
          '<img src="' + imgSrc + '" alt="' + system.title + '" loading="lazy" />' +
        '</div>' +
        '<span class="card-index">' + system.id + '</span>' +
        '<div class="card-body">' +
          '<h3 class="card-title">' + titleHtml + '</h3>' +
          '<p class="card-desc">' + descHtml + '</p>' +
          '<div class="card-footer">' +
            '<a href="' + system.url + '" class="card-btn" target="_blank" rel="noopener">' +
              '<span>فتح المنظومة</span>' +
              '<i class="fas fa-arrow-left"></i>' +
            '</a>' +
          '</div>' +
        '</div>';

      grid.appendChild(card);
    });

    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }

    document.querySelectorAll('.system-card').forEach(function (card) {
      initTilt(card);
      initMouseGlow(card);
    });
  }

  /* ===== HIGHLIGHT ===== */
  function highlightText(text, query) {
    var idx = text.indexOf(query);
    if (idx === -1) return text;
    var before = text.substring(0, idx);
    var match = text.substring(idx, idx + query.length);
    var after = text.substring(idx + query.length);
    return before + '<mark>' + match + '</mark>' + after;
  }

  /* ===== 3D TILT ===== */
  function initTilt(card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width / 2;
      var cy = rect.height / 2;
      var rx = ((y - cy) / cy) * -6;
      var ry = ((x - cx) / cx) * 6;
      card.style.transform = 'perspective(1200px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale3d(1.02, 1.02, 1.02)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  /* ===== MOUSE GLOW ===== */
  function initMouseGlow(card) {
    var glow = document.createElement('div');
    glow.className = 'card-mouse-glow';
    card.appendChild(glow);

    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      glow.style.background = 'radial-gradient(circle 120px at ' + x + 'px ' + y + 'px, rgba(245, 176, 65, 0.06), transparent)';
      glow.classList.add('active');
    });

    card.addEventListener('mouseleave', function () {
      glow.classList.remove('active');
    });
  }

  /* ===== SEARCH ===== */
  function initSearch() {
    var input = document.getElementById('searchInput');
    var clearBtn = document.getElementById('searchClear');
    var debounceTimer;

    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      if (input.value.trim()) {
        clearBtn.classList.add('visible');
      } else {
        clearBtn.classList.remove('visible');
      }
      debounceTimer = setTimeout(function () {
        renderSystems(input.value);
      }, 200);
    });

    clearBtn.addEventListener('click', function () {
      input.value = '';
      clearBtn.classList.remove('visible');
      renderSystems('');
      input.focus();
    });
  }

  /* ===== PROGRESS BAR ===== */
  function initProgressBar() {
    var bar = document.getElementById('progressBar');
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }, { passive: true });
  }

  /* ===== BACK TO TOP ===== */
  function initBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  /* ===== LENIS ===== */
  var lenis;
  function initLenis() {
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.2,
        easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  /* ===== THEME TOGGLE ===== */
  function initThemeToggle() {
    var toggle = document.getElementById('themeToggle');
    var icon = toggle.querySelector('i');
    var saved = localStorage.getItem('theme');

    if (saved === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      icon.className = 'fas fa-sun';
    }

    toggle.addEventListener('click', function () {
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
      }
    });
  }

  /* ===== FOOTER YEAR ===== */
  document.getElementById('footerYear').textContent = new Date().getFullYear();

  /* ===== INIT ===== */
  document.addEventListener('DOMContentLoaded', function () {
    document.body.style.overflow = 'hidden';
    initLoader();
    updateClock();
    setInterval(updateClock, 1000);
    initNavbar();
    initParticles();
    initSearch();
    renderSystems('');
    initProgressBar();
    initBackToTop();
    initThemeToggle();
    initLenis();

    gsap.fromTo('.search-section', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power3.out' });
  });

})();
