const SYSTEMS_CONFIG = [
  { id: 1, title: 'منظومة مدرسة الساحل المالية', url: 'https://script.google.com/macros/s/AKfycbyW_8kg6Z7a1yj6bbcTmQ6m3G4Xic7Owlu6kAuGM3VsdzgLyv1FBMxfb-sWNyv9jXn1Ug/exec', description: 'إدارة الرسوم الدراسية والحسابات والتقارير المالية.' },
  { id: 2, title: 'منظومة الشؤون الفنية والهندسية', url: 'https://script.google.com/macros/s/AKfycby-qbBb24mMxUaW1uLSxTODgnX_98UueEgEhj1OXUOMnv9QCA6m3N5-1uvbsKmlvlJN/exec', description: 'إدارة أعمال الصيانة والأصول والمشروعات الفنية والهندسية.' },
  { id: 3, title: 'منظومة وزارة التربية والتعليم', url: 'https://nec.gov.ly/SRS/UserLogin.aspx?value=login', description: 'الوصول إلى الخدمات الإلكترونية الخاصة بوزارة التربية والتعليم.' },
  { id: 4, title: 'منظومة شؤون الطلبة والامتحانات', url: 'https://edu-libya.com/student/admin/login', description: 'إدارة بيانات الطلبة والنتائج والامتحانات.' },
  { id: 6, title: 'منظومة بيانات التعليم', url: 'https://sis.moe.gov.ly/Account/Login', description: 'مقدمة من مركز المعلومات والتوثيق.', _logo: 'assets/images/10.png' },
  { id: 7, title: 'بوابة إعداد الموازنة العامة', url: 'https://budget.mopaf.info/login', description: 'منظومة إعداد الموازنة العامة.' },
  { id: 8, title: 'مركز المناهج والمقررات الدراسية', url: 'https://t.me/Manahej2026', description: 'الوصول إلى المناهج والمقررات الدراسية.' },
  { id: 10, title: 'منصة الضرائب', url: 'https://ly.tax/', description: 'الخدمات الإلكترونية لمصلحة الضرائب.', _logo: 'assets/images/6.png' },
  { id: 9, title: 'منظومة احتساب نتيجة الشهادتين', url: 'https://alariby-pixel.github.io/alsahal/', description: 'حاسبة احترافية لحساب النتائج.', _logo: 'assets/images/1.png' },
  { id: 5, title: 'بوابة إعلان نتيجة الشهادة الإعدادية والثانوية', url: 'https://finalresults.nec.gov.ly/', description: 'الاستعلام عن نتائج الشهادتين الإعدادية والثانوية.', _logo: 'assets/images/3.png' },
  { id: 11, title: 'منصة حجز العملة الأجنبية', url: 'https://fcms.cbl.gov.ly/', description: 'التابعة لمصرف ليبيا المركزي.', _logo: 'assets/images/11.png' }
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
      if (progress >= 100) { progress = 100; clearInterval(interval); }
      loaderBar.style.width = progress + '%';
      loaderPercent.textContent = Math.floor(progress) + '%';
      loaderText.textContent = progress < 100 ? 'جاري تحميل المنظومات...' : 'تم التحميل بنجاح!';
      if (progress >= 100) {
        setTimeout(function () {
          loader.classList.add('hidden');
          document.body.style.overflow = '';
          if (typeof AOS !== 'undefined') { AOS.init({ duration: 800, once: true, offset: 80, easing: 'ease-out-cubic' }); }
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
    document.getElementById('heroClock').textContent = timeStr;
    document.getElementById('heroDate').textContent = dateStr;
  }

  /* ===== NAVBAR ===== */
  function initNavbar() {
    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () { navbar.classList.toggle('scrolled', window.scrollY > 60); }, { passive: true });
  }

  /* ===== SIDEBAR ===== */
  function initSidebar() {
    var toggle = document.getElementById('sidebarToggle');
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebarOverlay');
    var close = document.getElementById('sidebarClose');
    if (!sidebar) return;
    function open() { sidebar.classList.add('open'); overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
    function closeFn() { sidebar.classList.remove('open'); overlay.classList.remove('active'); document.body.style.overflow = ''; }
    if (toggle) toggle.addEventListener('click', open);
    if (close) close.addEventListener('click', closeFn);
    if (overlay) overlay.addEventListener('click', closeFn);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeFn(); });

    document.querySelectorAll('.sidebar-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var page = this.getAttribute('data-page');
        if (page) { navigateTo(page); }
        closeFn();
      });
    });

    /* Sidebar dropdown toggles */
    document.querySelectorAll('.sidebar-dropdown-toggle').forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var group = this.closest('.sidebar-group');
        if (group) group.classList.toggle('open');
      });
    });
  }

  /* ===== PAGE NAVIGATION ===== */
  function navigateTo(page) {
    document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('active'); });
    document.querySelectorAll('.sidebar-item').forEach(function (i) { i.classList.remove('active'); });
    var target = document.querySelector('.page[data-page="' + page + '"]');
    var sidebarItem = document.querySelector('.sidebar-item[data-page="' + page + '"]');
    if (target) target.classList.add('active');
    if (sidebarItem) sidebarItem.classList.add('active');
    if (window.lenis) { window.lenis.scrollTo(0, { immediate: true }); } else { window.scrollTo(0, 0); }
    if (page !== 'settings') { _editingSysId = null; }
    if (page === 'home' && typeof AOS !== 'undefined') { setTimeout(function () { AOS.refresh(); }, 100); }
    if (page === 'calculator') { var d2 = document.getElementById('calcDisplay2'); if (d2 && !d2._init) { initCalc2(); } }
    if (page === 'exchange') { var c2 = document.getElementById('exCashRate2'); if (c2 && !c2._init) { initExchange2(); } }
    if (page === 'weather') { var p2 = document.getElementById('prayerList2'); if (p2 && !p2._init) { fetchWeather2(); fetchPrayerTimes2(); p2._init = true; } }
    if (page === 'calendar') { renderCalendar(); }
    if (page === 'notes') { renderNotes(); }
    if (page === 'reminders') { renderReminders(); }
    if (page === 'image2pdf') { initImage2Pdf(); }
    if (page === 'qrcode') { initQRCode(); }
    if (page === 'markdown') { initMarkdown(); }
    if (page === 'advanced-todo') { renderATodo(); }
    if (page === 'timetable') { renderTimetable(); }
    if (page === 'journal') { renderJournal(); }
    if (page === 'daily-quote') { showRandomQuote(); }
    if (page === 'settings') { initSettings(); }
    if (page === 'units') { initUnits(); }
    if (page === 'date-converter') { initDateConverter(); }
    if (page === 'age-calc') { initAgeCalc(); }
    if (page === 'date-diff') { initDateDiff(); }
    if (page === 'password-gen') { initPasswordGen(); }
    if (page === 'ip-calc') { initIpCalc(); }
    if (page === 'word-count') { initWordCount(); }
    if (page === 'grade-calc') { initGradeCalc(); }
    if (page === 'exam-editor') { initExamEditor(); }
    if (page === 'ai-chat') { }
    if (page === 'islamic') { initIslamic(); }
    if (page === 'prophets') { initProphets(); }
    if (page === 'great100') { initGreat100(); }
    if (page === 'map') { initMap(); }
    if (page === 'expense') { initExpense(); }
    if (page === 'football') { initFootball(); }
    if (page === 'fitness') { initFitness(); }
  }

  /* ===== HIJRI DATE ===== */
  function fetchHijriDate() {
    var now = new Date();
    var day = String(now.getDate()).padStart(2, '0');
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var year = now.getFullYear();
    var url = 'https://api.aladhan.com/v1/gToH?date=' + day + '-' + month + '-' + year;
    fetch(url).then(function (r) { return r.json(); }).then(function (d) {
      if (d.data && d.data.hijri) {
        var h = d.data.hijri;
        var hijriStr = h.day + ' ' + h.month.ar + ' ' + h.year + ' هـ';
        document.getElementById('heroHijri').textContent = hijriStr;
      }
    }).catch(function () {});
  }

  /* ===== PARTICLES ===== */
  function initParticles() {
    var canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var mouseX = -1000, mouseY = -1000;
    function resize() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
    resize(); window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', function (e) { var r = canvas.getBoundingClientRect(); mouseX = e.clientX - r.left; mouseY = e.clientY - r.top; });
    canvas.addEventListener('mouseleave', function () { mouseX = -1000; mouseY = -1000; });
    for (var i = 0; i < 80; i++) { particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 2 + 0.5, speedX: (Math.random() - 0.5) * 0.4, speedY: (Math.random() - 0.5) * 0.4, opacity: Math.random() * 0.5 + 0.1 }); }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        p.x += p.speedX; p.y += p.speedY;
        var dx = mouseX - p.x, dy = mouseY - p.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) { var force = (120 - dist) / 120 * 0.5; p.x -= dx / dist * force; p.y -= dy / dist * force; }
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0; if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = 'rgba(148, 163, 184, ' + p.opacity + ')'; ctx.fill();
      });
      particles.forEach(function (p, i) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = p.x - particles[j].x, dy = p.y - particles[j].y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = 'rgba(148, 163, 184, ' + (0.04 * (1 - dist / 120)) + ')'; ctx.lineWidth = 0.5; ctx.stroke(); }
        }
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ===== GSAP HERO ===== */
  function animateHero() {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo('#heroLogo', { y: 50, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)' })
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
    if (query && query.trim()) { var q = query.trim(); filtered = SYSTEMS_CONFIG.filter(function (s) { return s.title.includes(q) || s.description.includes(q); }); }
    document.getElementById('resultsCount').textContent = filtered.length;
    document.getElementById('heroTotal').textContent = filtered.length;
    if (filtered.length === 0) { grid.innerHTML = ''; noResults.style.display = 'block'; return; }
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
      card.innerHTML = '<div class="card-glow"></div><div class="card-image-wrap"><img src="' + imgSrc + '" alt="' + system.title + '" loading="lazy" /></div><span class="card-index">' + system.id + '</span><div class="card-body"><h3 class="card-title">' + titleHtml + '</h3><p class="card-desc">' + descHtml + '</p><div class="card-footer"><a href="' + system.url + '" class="card-btn" target="_blank" rel="noopener"><span>فتح المنظومة</span><i class="fas fa-arrow-left"></i></a></div></div>';
      grid.appendChild(card);
    });
    if (typeof AOS !== 'undefined') { AOS.refresh(); }
    document.querySelectorAll('.system-card').forEach(function (card) { initTilt(card); initMouseGlow(card); });
  }

  function highlightText(text, query) { var idx = text.indexOf(query); if (idx === -1) return text; return text.substring(0, idx) + '<mark>' + text.substring(idx, idx + query.length) + '</mark>' + text.substring(idx + query.length); }
  function initTilt(card) {
    card.addEventListener('mousemove', function (e) { var r = card.getBoundingClientRect(); var x = e.clientX - r.left, y = e.clientY - r.top; card.style.transform = 'perspective(1200px) rotateX(' + ((y - r.height/2) / (r.height/2) * -6) + 'deg) rotateY(' + ((x - r.width/2) / (r.width/2) * 6) + 'deg) scale3d(1.02,1.02,1.02)'; });
    card.addEventListener('mouseleave', function () { card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'; });
  }
  function initMouseGlow(card) {
    var glow = document.createElement('div'); glow.className = 'card-mouse-glow'; card.appendChild(glow);
    card.addEventListener('mousemove', function (e) { var r = card.getBoundingClientRect(); glow.style.background = 'radial-gradient(circle 120px at ' + (e.clientX - r.left) + 'px ' + (e.clientY - r.top) + 'px, rgba(245,176,65,0.06), transparent)'; glow.classList.add('active'); });
    card.addEventListener('mouseleave', function () { glow.classList.remove('active'); });
  }

  /* ===== SEARCH ===== */
  function initSearch() {
    var input = document.getElementById('searchInput');
    var clearBtn = document.getElementById('searchClear');
    var debounceTimer;
    input.addEventListener('input', function () {
      clearBtn.classList.toggle('visible', !!input.value.trim());
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () { renderSystems(input.value); }, 200);
    });
    clearBtn.addEventListener('click', function () { input.value = ''; clearBtn.classList.remove('visible'); renderSystems(''); input.focus(); });
  }

  /* ===== PROGRESS BAR ===== */
  function initProgressBar() {
    var bar = document.getElementById('progressBar');
    window.addEventListener('scroll', function () { var p = document.documentElement.scrollHeight - window.innerHeight; bar.style.width = (p > 0 ? (window.scrollY / p) * 100 : 0) + '%'; }, { passive: true });
  }

  /* ===== BACK TO TOP ===== */
  function initBackToTop() {
    var btn = document.getElementById('backToTop'); if (!btn) return;
    window.addEventListener('scroll', function () { btn.classList.toggle('visible', window.scrollY > 500); }, { passive: true });
    btn.addEventListener('click', function () { if (window.lenis) { window.lenis.scrollTo(0, { duration: 1.5 }); } else { window.scrollTo({ top: 0, behavior: 'smooth' }); } });
  }

  /* ===== LENIS ===== */
  function initLenis() {
    if (typeof Lenis !== 'undefined') {
      window.lenis = new Lenis({ duration: 1.2, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, orientation: 'vertical', smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.5 });
      function raf(time) { window.lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    }
  }

  /* ===== THEME TOGGLE ===== */
  function initThemeToggle() {
    var toggle = document.getElementById('themeToggle');
    var icon = toggle.querySelector('i');
    if (localStorage.getItem('theme') === 'light') { document.documentElement.setAttribute('data-theme', 'light'); icon.className = 'fas fa-sun'; }
    toggle.addEventListener('click', function () {
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) { document.documentElement.removeAttribute('data-theme'); icon.className = 'fas fa-moon'; localStorage.setItem('theme', 'dark'); }
      else { document.documentElement.setAttribute('data-theme', 'light'); icon.className = 'fas fa-sun'; localStorage.setItem('theme', 'light'); }
    });
  }

  /* ===== WEATHER CODES ===== */
  var WMO_CODES = { 0: { icon: 'fa-sun', desc: 'سماء صافية' }, 1: { icon: 'fa-sun', desc: 'صافي بشكل عام' }, 2: { icon: 'fa-cloud-sun', desc: 'غائم جزئياً' }, 3: { icon: 'fa-cloud', desc: 'غائم' }, 45: { icon: 'fa-smog', desc: 'ضباب' }, 48: { icon: 'fa-smog', desc: 'ضباب كثيف' }, 51: { icon: 'fa-cloud-rain', desc: 'رذاذ خفيف' }, 53: { icon: 'fa-cloud-rain', desc: 'رذاذ متوسط' }, 55: { icon: 'fa-cloud-rain', desc: 'رذاذ كثيف' }, 61: { icon: 'fa-cloud-showers-heavy', desc: 'مطر خفيف' }, 63: { icon: 'fa-cloud-showers-heavy', desc: 'مطر متوسط' }, 65: { icon: 'fa-cloud-showers-heavy', desc: 'مطر غزير' }, 80: { icon: 'fa-cloud-rain', desc: 'زخات مطر خفيفة' }, 81: { icon: 'fa-cloud-rain', desc: 'زخات مطر متوسطة' }, 82: { icon: 'fa-cloud-rain', desc: 'زخات مطر غزيرة' }, 95: { icon: 'fa-bolt', desc: 'عاصفة رعدية' }, 96: { icon: 'fa-bolt', desc: 'عاصفة رعدية مع برد' }, 99: { icon: 'fa-bolt', desc: 'عاصفة رعدية شديدة' } };

  /* ===== FETCH WEATHER ===== */
  var _weatherData = null;
  function setWeatherAll(data) {
    var w = WMO_CODES[data.weathercode] || { icon: 'fa-question', desc: '--' };
    var icon = '<i class="fas ' + w.icon + '"></i>';
    var temp = Math.round(data.temperature_2m) + '°C';
    var feels = Math.round(data.apparent_temperature) + '°C';
    var hum = data.relative_humidity_2m + '%';
    var wind = Math.round(data.wind_speed_10m) + ' كم/س';
    var els1 = document.getElementById('weatherIcon'); if (els1) els1.innerHTML = icon;
    var els2 = document.getElementById('weatherIcon2'); if (els2) els2.innerHTML = icon;
    var et1 = document.getElementById('weatherTemp'); if (et1) et1.textContent = temp;
    var et2 = document.getElementById('weatherTemp2'); if (et2) et2.textContent = temp;
    var ed1 = document.getElementById('weatherDesc'); if (ed1) ed1.textContent = w.desc;
    var ed2 = document.getElementById('weatherDesc2'); if (ed2) ed2.textContent = w.desc;
    var ef1 = document.getElementById('weatherFeels'); if (ef1) ef1.textContent = feels;
    var ef2 = document.getElementById('weatherFeels2'); if (ef2) ef2.textContent = feels;
    var eh1 = document.getElementById('weatherHumidity'); if (eh1) eh1.textContent = hum;
    var eh2 = document.getElementById('weatherHumidity2'); if (eh2) eh2.textContent = hum;
    var ew1 = document.getElementById('weatherWind'); if (ew1) ew1.textContent = wind;
    var ew2 = document.getElementById('weatherWind2'); if (ew2) ew2.textContent = wind;
  }

  function fetchWeather() {
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=32.285684&longitude=20.231585&current=temperature_2m,relative_humidity_2m,apparent_temperature,weathercode,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&forecast_days=2';
    fetch(url).then(function (r) { return r.json(); }).then(function (d) {
      _weatherData = d.current;
      setWeatherAll(d.current);
    }).catch(function () {});
  }

  function fetchWeather2() {
    if (_weatherData) { setWeatherAll(_weatherData); return; }
    fetchWeather();
  }

  /* ===== PRAYER TIMES ===== */
  var _prayerData = null;
  function fetchPrayerTimes() {
    var now = new Date();
    var ds = String(now.getDate()).padStart(2, '0') + '-' + String(now.getMonth()+1).padStart(2, '0') + '-' + now.getFullYear();
    var url = 'https://api.aladhan.com/v1/timings?latitude=32.285684&longitude=20.231585&method=3&timezonestring=Africa/Tripoli&date=' + ds;
    fetch(url).then(function (r) { return r.json(); }).then(function (d) {
      if (d.data && d.data.timings) {
        _prayerData = d.data;
        renderPrayers(d.data);
      }
    }).catch(function () {});
  }

  function fetchPrayerTimes2() {
    if (_prayerData) { renderPrayers(_prayerData); return; }
    var now = new Date();
    var ds = String(now.getDate()).padStart(2, '0') + '-' + String(now.getMonth()+1).padStart(2, '0') + '-' + now.getFullYear();
    var url = 'https://api.aladhan.com/v1/timings?latitude=32.285684&longitude=20.231585&method=3&timezonestring=Africa/Tripoli&date=' + ds;
    fetch(url).then(function (r) { return r.json(); }).then(function (d) { if (d.data && d.data.timings) { _prayerData = d.data; renderPrayers(d.data); } }).catch(function () {});
  }

  function to12h(time) {
    var parts = time.split(':');
    var h = parseInt(parts[0]), m = parts[1];
    var period = h >= 12 ? 'م' : 'ص';
    var h12 = h % 12 || 12;
    return h12 + ':' + m + ' ' + period;
  }

  function renderPrayersTo(listId, cdId, prayers) {
    var list = document.getElementById(listId);
    var cd = document.getElementById(cdId);
    if (!list) return;
    list.innerHTML = '';
    prayers.forEach(function (p, i) { list.innerHTML += '<div class="prayer-item" data-idx="' + i + '"><span class="prayer-name">' + p.name + '</span><span class="prayer-time">' + to12h(p.time) + '</span></div>'; });
    var now = new Date();
    var currentTime = now.getHours() * 60 + now.getMinutes();
    var cp = -1;
    for (var ci = prayers.length - 1; ci >= 0; ci--) { var parts = prayers[ci].time.split(':'); if (currentTime >= parseInt(parts[0])*60+parseInt(parts[1])) { cp = ci; break; } }
    var nextIdx = cp + 1;
    if (cd) {
      if (nextIdx < prayers.length) {
        var nextP = prayers[nextIdx];
        var np = nextP.time.split(':');
        var diff = (parseInt(np[0])*60+parseInt(np[1])) - currentTime;
        if (diff > 0) { cd.textContent = 'متبقي ' + Math.floor(diff/60) + ' ساعة ' + (diff%60) + ' دقيقة لصلاة ' + nextP.name; }
        else { cd.textContent = 'حان وقت صلاة ' + prayers[cp].name; }
      } else { cd.textContent = 'انتهت صلوات اليوم'; }
    }
    var items = list.querySelectorAll('.prayer-item');
    if (items[cp]) items[cp].classList.add('active');
  }

  function renderPrayers(data) {
    var t = data.timings;
    var prayers = [{ name: 'الفجر', time: t.Fajr }, { name: 'الشروق', time: t.Sunrise }, { name: 'الظهر', time: t.Dhuhr }, { name: 'العصر', time: t.Asr }, { name: 'المغرب', time: t.Maghrib }, { name: 'العشاء', time: t.Isha }];
    renderPrayersTo('prayerList', 'prayerCountdown', prayers);
    renderPrayersTo('prayerList2', 'prayerCountdown2', prayers);
  }

  /* ===== EXCHANGE (panel) ===== */
  function initExchange() {
    var cashIn = document.getElementById('exCashRate');
    var chequeIn = document.getElementById('exChequeRate');
    var amountIn = document.getElementById('exAmount');
    if (!cashIn) return;
    var saved = Store.get('exchangeRates', { cash: '6.20', cheque: '6.25' });
    cashIn.value = saved.cash; chequeIn.value = saved.cheque;
    function calc() {
      var cash = parseFloat(cashIn.value) || 0, cheque = parseFloat(chequeIn.value) || 0, amount = parseFloat(amountIn.value) || 0;
      if (cash <= 0 || cheque <= 0 || amount <= 0) { ['exBuyUsd1','exSellLyd1','exProfit1','exPercent1','exBuyUsd2','exSellLyd2','exProfit2','exPercent2'].forEach(function (id) { document.getElementById(id).textContent = '--'; }); return; }
      var buyUsd1 = amount / cash, sellLyd1 = buyUsd1 * cheque, profit1 = sellLyd1 - amount, pct1 = (profit1 / amount) * 100;
      var buyUsd2 = amount / cheque, sellLyd2 = buyUsd2 * cash, profit2 = sellLyd2 - amount, pct2 = (profit2 / amount) * 100;
      document.getElementById('exBuyUsd1').textContent = buyUsd1.toFixed(2) + ' $';
      document.getElementById('exSellLyd1').textContent = sellLyd1.toFixed(2) + ' د.ل';
      document.getElementById('exProfit1').textContent = (profit1 >= 0 ? '+' : '') + profit1.toFixed(2) + ' د.ل';
      document.getElementById('exPercent1').textContent = (pct1 >= 0 ? '+' : '') + pct1.toFixed(2) + '%';
      document.getElementById('exBuyUsd2').textContent = buyUsd2.toFixed(2) + ' $';
      document.getElementById('exSellLyd2').textContent = sellLyd2.toFixed(2) + ' د.ل';
      document.getElementById('exProfit2').textContent = (profit2 >= 0 ? '+' : '') + profit2.toFixed(2) + ' د.ل';
      document.getElementById('exPercent2').textContent = (pct2 >= 0 ? '+' : '') + pct2.toFixed(2) + '%';
    }
    cashIn.addEventListener('input', calc); chequeIn.addEventListener('input', calc); amountIn.addEventListener('input', calc);
    document.getElementById('exSaveBtn').addEventListener('click', function () { Store.set('exchangeRates', { cash: cashIn.value, cheque: chequeIn.value }); var s = this.querySelector('span'); s.textContent = 'تم الحفظ ✓'; var self = this; setTimeout(function () { s.textContent = 'حفظ الأسعار'; }, 2000); });
    calc();
  }

  /* ===== EXCHANGE (page) ===== */
  function initExchange2() {
    var cashIn = document.getElementById('exCashRate2');
    var chequeIn = document.getElementById('exChequeRate2');
    var amountIn = document.getElementById('exAmount2');
    if (!cashIn) return;
    cashIn._init = true;
    var saved = Store.get('exchangeRates', { cash: '6.20', cheque: '6.25' });
    cashIn.value = saved.cash; chequeIn.value = saved.cheque;
    function calc() {
      var cash = parseFloat(cashIn.value) || 0, cheque = parseFloat(chequeIn.value) || 0, amount = parseFloat(amountIn.value) || 0;
      if (cash <= 0 || cheque <= 0 || amount <= 0) { ['exBuyUsd1_2','exSellLyd1_2','exProfit1_2','exPercent1_2','exBuyUsd2_2','exSellLyd2_2','exProfit2_2','exPercent2_2'].forEach(function (id) { document.getElementById(id).textContent = '--'; }); return; }
      var buyUsd1 = amount / cash, sellLyd1 = buyUsd1 * cheque, profit1 = sellLyd1 - amount, pct1 = (profit1 / amount) * 100;
      var buyUsd2 = amount / cheque, sellLyd2 = buyUsd2 * cash, profit2 = sellLyd2 - amount, pct2 = (profit2 / amount) * 100;
      document.getElementById('exBuyUsd1_2').textContent = buyUsd1.toFixed(2) + ' $';
      document.getElementById('exSellLyd1_2').textContent = sellLyd1.toFixed(2) + ' د.ل';
      document.getElementById('exProfit1_2').textContent = (profit1 >= 0 ? '+' : '') + profit1.toFixed(2) + ' د.ل';
      document.getElementById('exPercent1_2').textContent = (pct1 >= 0 ? '+' : '') + pct1.toFixed(2) + '%';
      document.getElementById('exBuyUsd2_2').textContent = buyUsd2.toFixed(2) + ' $';
      document.getElementById('exSellLyd2_2').textContent = sellLyd2.toFixed(2) + ' د.ل';
      document.getElementById('exProfit2_2').textContent = (profit2 >= 0 ? '+' : '') + profit2.toFixed(2) + ' د.ل';
      document.getElementById('exPercent2_2').textContent = (pct2 >= 0 ? '+' : '') + pct2.toFixed(2) + '%';
    }
    cashIn.addEventListener('input', calc); chequeIn.addEventListener('input', calc); amountIn.addEventListener('input', calc);
    document.getElementById('exSaveBtn2').addEventListener('click', function () { Store.set('exchangeRates', { cash: cashIn.value, cheque: chequeIn.value }); var s = this.querySelector('span'); s.textContent = 'تم الحفظ ✓'; var self = this; setTimeout(function () { s.textContent = 'حفظ الأسعار'; }, 2000); });
    calc();
  }

  /* ===== CALCULATOR 1 (tool card) ===== */
  function initCalculator() {
    var display = document.getElementById('calcDisplay'); if (!display) return;
    var current = '0', operator = null, previous = null, reset = false;
    function update() { display.textContent = current; }
    document.querySelectorAll('#toolsSection .calc-btn, #toolsSection .calc-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = this.getAttribute('data-val');
        if (this.classList.contains('num')) { if (reset || current === '0') { current = val; reset = false; } else { current += val; } update(); }
        else if (val === 'C') { current = '0'; operator = null; previous = null; reset = false; update(); }
        else if (val === '±') { current = String(parseFloat(current) * -1); update(); }
        else if (val === '%') { current = String(parseFloat(current) / 100); update(); }
        else if (val === '=') { if (operator && previous !== null) { var a = parseFloat(previous), b = parseFloat(current); var r = operator === '+' ? a+b : operator === '-' ? a-b : operator === '*' ? a*b : (b !== 0 ? a/b : 'خطأ'); current = String(r); operator = null; previous = null; reset = true; update(); } }
        else { if (operator && !reset) { var a = parseFloat(previous||'0'), b = parseFloat(current); if (val === '+') current = String(a+b); else if (val === '-') current = String(a-b); else if (val === '*') current = String(a*b); else if (val === '/' && b !== 0) current = String(a/b); else if (val === '/' && b === 0) current = 'خطأ'; } operator = val; previous = current; reset = true; update(); }
      });
    });
  }

  /* ===== CALCULATOR 2 (page) ===== */
  function initCalc2() {
    var display = document.getElementById('calcDisplay2'); if (!display) return;
    display._init = true;
    var current = '0', operator = null, previous = null, reset = false;
    function update() { display.textContent = current; }
    document.querySelectorAll('.page[data-page="calculator"] .calc-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = this.getAttribute('data-val');
        if (this.classList.contains('num')) { if (reset || current === '0') { current = val; reset = false; } else { current += val; } update(); }
        else if (val === 'C') { current = '0'; operator = null; previous = null; reset = false; update(); }
        else if (val === '±') { current = String(parseFloat(current) * -1); update(); }
        else if (val === '%') { current = String(parseFloat(current) / 100); update(); }
        else if (val === '=') { if (operator && previous !== null) { var a = parseFloat(previous), b = parseFloat(current); var r = operator === '+' ? a+b : operator === '-' ? a-b : operator === '*' ? a*b : (b !== 0 ? a/b : 'خطأ'); current = String(r); operator = null; previous = null; reset = true; update(); } }
        else { if (operator && !reset) { var a = parseFloat(previous||'0'), b = parseFloat(current); if (val === '+') current = String(a+b); else if (val === '-') current = String(a-b); else if (val === '*') current = String(a*b); else if (val === '/' && b !== 0) current = String(a/b); else if (val === '/' && b === 0) current = 'خطأ'; } operator = val; previous = current; reset = true; update(); }
      });
    });
  }

  /* ===== CALENDAR ===== */
  var _calMonth = new Date().getMonth();
  var _calYear = new Date().getFullYear();
  var _hijriMonths = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];

  function islamicDate(year, month, day) {
    var greg = new Date(year, month, day);
    var gd = greg.getDate(), gm = greg.getMonth()+1, gy = greg.getFullYear();
    var jd = Math.floor((1461*(gy+4800+Math.floor((gm-14)/12)))/4) + Math.floor((367*(gm-2-12*Math.floor((gm-14)/12)))/12) - Math.floor((3*Math.floor((gy+4900+Math.floor((gm-14)/12))/100))/4) + gd - 32075;
    var l = jd - 1948440 + 10632;
    var n = Math.floor((l-1)/10631);
    l = l - 10631*n + 354;
    var j = (Math.floor((10985-l)/5316)) * (Math.floor((50*l)/17719)) + (Math.floor(l/5670)) * (Math.floor((43*l)/15238));
    l = l - (Math.floor((30-j)/15)) * (Math.floor((17719*j)/50)) - (Math.floor(j/16)) * (Math.floor((15238*j)/43)) + 29;
    var m = Math.floor((24*l)/709);
    var d = l - Math.floor((709*m)/24);
    var y = 30*n + j - 30;
    return { day: d, month: m, year: y };
  }

  function renderCalendar() {
    var grid = document.getElementById('calGrid');
    var title = document.getElementById('calNavTitle');
    if (!grid) return;
    var firstDay = new Date(_calYear, _calMonth, 1).getDay();
    var daysInMonth = new Date(_calYear, _calMonth + 1, 0).getDate();
    var today = new Date();
    var dayHeaders = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
    title.textContent = MONTHS[_calMonth] + ' ' + _calYear;
    grid.innerHTML = '';
    dayHeaders.forEach(function (d) { grid.innerHTML += '<div class="cal-header">' + d + '</div>'; });
    for (var i = 0; i < firstDay; i++) { grid.innerHTML += '<div></div>'; }
    for (var d = 1; d <= daysInMonth; d++) {
      var hijri = islamicDate(_calYear, _calMonth, d);
      var isToday = (d === today.getDate() && _calMonth === today.getMonth() && _calYear === today.getFullYear());
      grid.innerHTML += '<div class="cal-day' + (isToday ? ' today' : '') + '"><span class="cal-greg">' + d + '</span><span class="cal-hijri">' + hijri.day + ' ' + _hijriMonths[hijri.month-1] + '</span></div>';
    }
  }

  function initCalendarNav() {
    var prev = document.getElementById('calPrev');
    var next = document.getElementById('calNext');
    if (!prev) return;
    prev.addEventListener('click', function () { _calMonth--; if (_calMonth < 0) { _calMonth = 11; _calYear--; } renderCalendar(); });
    next.addEventListener('click', function () { _calMonth++; if (_calMonth > 11) { _calMonth = 0; _calYear++; } renderCalendar(); });
  }

  /* ===== NOTES ===== */
  function getNotes() { return Store.get('notes', []); }
  function saveNotes(arr) { Store.set('notes', arr); }

  function renderNotes() {
    var list = document.getElementById('notesList');
    if (!list) return;
    var notes = getNotes();
    if (notes.length === 0) { list.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px 0;">لا توجد مهام أو ملاحظات. أضف مهمة جديدة!</p>'; return; }
    list.innerHTML = '';
    notes.forEach(function (n, i) {
      list.innerHTML += '<div class="note-item' + (n.done ? ' done' : '') + '"><div class="note-check' + (n.done ? ' done' : '') + '" data-idx="' + i + '">' + (n.done ? '<i class="fas fa-check"></i>' : '') + '</div><span class="note-text">' + n.text + '</span><button class="note-del" data-idx="' + i + '"><i class="fas fa-times"></i></button></div>';
    });
    list.querySelectorAll('.note-check').forEach(function (c) {
      c.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-idx'));
        var notes = getNotes();
        if (notes[idx]) { notes[idx].done = !notes[idx].done; saveNotes(notes); renderNotes(); }
      });
    });
    list.querySelectorAll('.note-del').forEach(function (b) {
      b.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-idx'));
        var notes = getNotes();
        notes.splice(idx, 1); saveNotes(notes); renderNotes();
      });
    });
  }

  function initNotes() {
    var input = document.getElementById('noteInput');
    var btn = document.getElementById('noteAddBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var text = input.value.trim();
      if (!text) return;
      var notes = getNotes();
      notes.push({ text: text, done: false });
      saveNotes(notes);
      input.value = '';
      renderNotes();
    });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') btn.click(); });
  }

  /* ===== REMINDERS ===== */
  function getReminders() { return Store.get('reminders', []); }
  function saveReminders(arr) { Store.set('reminders', arr); }

  function renderReminders() {
    var list = document.getElementById('remList');
    if (!list) return;
    var rems = getReminders();
    if (rems.length === 0) { list.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:40px 0;">لا توجد تذكيرات. أضف تذكيراً جديداً!</p>'; return; }
    list.innerHTML = '';
    rems.sort(function (a, b) { return new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time); });
    rems.forEach(function (r, i) {
      var isPast = new Date(r.date + 'T' + r.time) < new Date();
      list.innerHTML += '<div class="rem-item' + (r.done ? ' done' : '') + '"><div class="rem-icon"><i class="fas ' + (isPast ? 'fa-check-circle' : 'fa-clock') + '"></i></div><div class="rem-info"><div class="rem-title">' + r.title + '</div><div class="rem-datetime">' + r.date + ' ' + r.time + '</div></div><div class="rem-actions"><button class="rem-done-btn" data-idx="' + i + '"><i class="fas fa-check"></i></button><button class="rem-del-btn" data-idx="' + i + '"><i class="fas fa-trash"></i></button></div></div>';
    });
    list.querySelectorAll('.rem-done-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-idx'));
        var rems = getReminders();
        if (rems[idx]) { rems[idx].done = !rems[idx].done; saveReminders(rems); renderReminders(); }
      });
    });
    list.querySelectorAll('.rem-del-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-idx'));
        var rems = getReminders();
        rems.splice(idx, 1); saveReminders(rems); renderReminders();
      });
    });
  }

  function initReminders() {
    var title = document.getElementById('remTitle');
    var date = document.getElementById('remDate');
    var time = document.getElementById('remTime');
    var btn = document.getElementById('remAddBtn');
    if (!btn) return;
    var now = new Date();
    date.value = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
    time.value = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    btn.addEventListener('click', function () {
      var t = title.value.trim();
      if (!t) return;
      var rems = getReminders();
      rems.push({ title: t, date: date.value, time: time.value, done: false });
      saveReminders(rems);
      title.value = '';
      renderReminders();
    });
    title.addEventListener('keydown', function (e) { if (e.key === 'Enter') btn.click(); });
  }

  /* ===== IMAGE TO PDF ===== */
  var _pdfFiles = [];
  function initImage2Pdf() {
    if (window._img2pdfInit) return; window._img2pdfInit = true;
    var input = document.getElementById('pdfInput');
    var selectBtn = document.getElementById('pdfSelectBtn');
    var convertBtn = document.getElementById('pdfConvertBtn');
    var preview = document.getElementById('pdfPreview');
    if (!selectBtn) return;
    selectBtn.addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function () {
      _pdfFiles = Array.from(input.files);
      preview.innerHTML = '';
      _pdfFiles.forEach(function (f) {
        var reader = new FileReader();
        reader.onload = function (e) { preview.innerHTML += '<img src="' + e.target.result + '" />'; };
        reader.readAsDataURL(f);
      });
      convertBtn.disabled = _pdfFiles.length === 0;
    });
    convertBtn.addEventListener('click', function () {
      if (typeof jspdf === 'undefined' && typeof window.jspdf === 'undefined') { alert('مكتبة jsPDF لم يتم تحميلها بعد، حاول مرة أخرى.'); return; }
      var PDF = window.jspdf ? window.jspdf.jsPDF : jspdf.jsPDF;
      var pdf = new PDF('p', 'mm', 'a4');
      var pw = 210, ph = 297, margin = 10;
      var promises = _pdfFiles.map(function (f) {
        return new Promise(function (res) {
          var reader = new FileReader();
          reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
              var iw = img.width, ih = img.height;
              var maxW = pw - 2 * margin, maxH = ph - 2 * margin;
              var scale = Math.min(maxW / iw, maxH / ih);
              var w = iw * scale, h = ih * scale;
              var x = (pw - w) / 2, y = (ph - h) / 2;
              res({ data: e.target.result, w: w, h: h, x: x, y: y });
            };
            img.src = e.target.result;
          };
          reader.readAsDataURL(f);
        });
      });
      Promise.all(promises).then(function (results) {
        results.forEach(function (r, i) {
          if (i > 0) pdf.addPage();
          pdf.addImage(r.data, 'JPEG', r.x, r.y, r.w, r.h);
        });
        pdf.save('output.pdf');
      });
    });

    /* PDF to image */
    var pdf2Input = document.getElementById('pdf2imgInput');
    var pdf2Select = document.getElementById('pdf2imgSelectBtn');
    var pdf2Convert = document.getElementById('pdf2imgConvertBtn');
    var pdf2Preview = document.getElementById('pdf2imgPreview');
    if (!pdf2Select) return;
    pdf2Select.addEventListener('click', function () { pdf2Input.click(); });
    pdf2Input.addEventListener('change', function () {
      pdf2Convert.disabled = !pdf2Input.files.length;
      pdf2Preview.innerHTML = '<span style="color:var(--text-muted);font-size:13px;">تم اختيار: ' + pdf2Input.files[0].name + '</span>';
    });
    pdf2Convert.addEventListener('click', function () {
      var file = pdf2Input.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function (e) {
        var data = e.target.result;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = function () {
          canvas.width = img.width; canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          var link = document.createElement('a');
          link.download = file.name.replace('.pdf', '') + '.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
        };
        img.src = data;
      };
      reader.readAsDataURL(file);
    });
  }

  /* ===== QR CODE ===== */
  var _qrInstance = null;
  function initQRCode() {
    if (window._qrInit) return; window._qrInit = true;
    var startBtn = document.getElementById('qrStartBtn');
    var stopBtn = document.getElementById('qrStopBtn');
    var resultDiv = document.getElementById('qrResult');
    var fileBtn = document.getElementById('qrFileBtn');
    var fileInput = document.getElementById('qrFileInput');
    if (!startBtn) return;

    startBtn.addEventListener('click', function () {
      if (typeof Html5Qrcode === 'undefined') { resultDiv.textContent = 'مكتبة QR لم يتم تحميلها بعد.'; return; }
      resultDiv.textContent = 'جاري تشغيل الكاميرا...';
      _qrInstance = new Html5Qrcode('qrReader');
      _qrInstance.start({ facingMode: 'environment' }, { fps: 10, qrbox: 250 }, function (text) {
        resultDiv.innerHTML = '<strong>النتيجة:</strong> ' + text;
        if (_qrInstance) { _qrInstance.stop(); _qrInstance = null; }
        startBtn.style.display = ''; stopBtn.style.display = 'none';
      }, function () {});
      startBtn.style.display = 'none'; stopBtn.style.display = '';
    });

    stopBtn.addEventListener('click', function () {
      if (_qrInstance) { _qrInstance.stop(); _qrInstance = null; }
      startBtn.style.display = ''; stopBtn.style.display = 'none';
    });

    fileBtn.addEventListener('click', function () { fileInput.click(); });
    fileInput.addEventListener('change', function () {
      var f = fileInput.files[0]; if (!f) return;
      if (typeof Html5Qrcode === 'undefined') { resultDiv.textContent = 'مكتبة QR لم يتم تحميلها بعد.'; return; }
      Html5Qrcode.scanFile(f, true).then(function (text) {
        resultDiv.innerHTML = '<strong>النتيجة:</strong> ' + text;
      }).catch(function () { resultDiv.textContent = 'لم يتم العثور على QR في الصورة.'; });
    });
  }

  /* ===== MARKDOWN EDITOR ===== */
  function initMarkdown() {
    if (window._mdInit) return; window._mdInit = true;
    var input = document.getElementById('mdInput');
    var output = document.getElementById('mdOutput');
    var saveBtn = document.getElementById('mdSaveBtn');
    var saveHtmlBtn = document.getElementById('mdSaveHtmlBtn');
    var clearBtn = document.getElementById('mdClearBtn');
    if (!input) return;

    function render() {
      if (typeof marked !== 'undefined') { output.innerHTML = marked.parse(input.value); }
      else { output.innerHTML = input.value.replace(/\n/g, '<br>'); }
    }
    input.addEventListener('input', render);

    if (typeof marked !== 'undefined') {
      var savedMd = Store.get('markdown', '');
      if (savedMd) { input.value = savedMd; render(); }
      input.addEventListener('input', function () { Store.set('markdown', input.value); });
    }

    saveBtn.addEventListener('click', function () {
      var blob = new Blob([input.value], { type: 'text/markdown' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'note.md'; a.click();
    });

    saveHtmlBtn.addEventListener('click', function () {
      var html = typeof marked !== 'undefined' ? marked.parse(input.value) : input.value;
      var blob = new Blob(['<!DOCTYPE html><html dir="rtl"><head><meta charset="utf-8"><title>Note</title></head><body>' + html + '</body></html>'], { type: 'text/html' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'note.html'; a.click();
    });

    clearBtn.addEventListener('click', function () { input.value = ''; render(); Store.set('markdown', ''); });
  }

  /* ===== ADVANCED TODO ===== */
  function getATodos() { return Store.get('atodos', []); }
  function saveATodos(arr) { Store.set('atodos', arr); }
  var _atodoFilter = 'all';

  function renderATodo() {
    var list = document.getElementById('atodoList');
    if (!list) return;
    var todos = getATodos();
    var filtered = _atodoFilter === 'all' ? todos : _atodoFilter === 'done' ? todos.filter(function (t) { return t.done; }) : todos.filter(function (t) { return t.priority === _atodoFilter && !t.done; });
    if (filtered.length === 0) { list.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:30px 0;">لا توجد مهام</p>'; return; }
    list.innerHTML = '';
    filtered.forEach(function (t, i) {
      var idx = todos.indexOf(t);
      var prioClass = 'priority-' + t.priority;
      list.innerHTML += '<div class="atodo-item ' + prioClass + (t.done ? ' done' : '') + '"><div class="atodo-check' + (t.done ? ' done' : '') + '" data-idx="' + idx + '">' + (t.done ? '<i class="fas fa-check"></i>' : '') + '</div><span class="atodo-text">' + t.text + '</span><span class="atodo-meta">' + (t.date || '') + '</span><button class="atodo-del" data-idx="' + idx + '"><i class="fas fa-times"></i></button></div>';
    });
    list.querySelectorAll('.atodo-check').forEach(function (c) {
      c.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-idx'));
        var todos = getATodos();
        if (todos[idx]) { todos[idx].done = !todos[idx].done; saveATodos(todos); renderATodo(); }
      });
    });
    list.querySelectorAll('.atodo-del').forEach(function (b) {
      b.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-idx'));
        var todos = getATodos();
        todos.splice(idx, 1); saveATodos(todos); renderATodo();
      });
    });
  }

  function initATodo() {
    var input = document.getElementById('atodoInput');
    var priority = document.getElementById('atodoPriority');
    var date = document.getElementById('atodoDate');
    var btn = document.getElementById('atodoAddBtn');
    if (!btn) return;
    date.value = new Date().toISOString().split('T')[0];

    btn.addEventListener('click', function () {
      var text = input.value.trim(); if (!text) return;
      var todos = getATodos();
      todos.push({ text: text, priority: priority.value, date: date.value, done: false });
      saveATodos(todos); input.value = ''; renderATodo();
    });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') btn.click(); });

    document.querySelectorAll('.atodo-filter').forEach(function (f) {
      f.addEventListener('click', function () {
        document.querySelectorAll('.atodo-filter').forEach(function (x) { x.classList.remove('active'); });
        this.classList.add('active');
        _atodoFilter = this.getAttribute('data-filter');
        renderATodo();
      });
    });
  }

  /* ===== TIMETABLE ===== */
  function getTt() { return Store.get('timetable', []); }
  function saveTt(arr) { Store.set('timetable', arr); }
  var _ttDays = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];

  function renderTimetable() {
    var wrap = document.getElementById('ttGridWrap');
    if (!wrap) return;
    var entries = getTt();
    var table = '<table><thead><tr><th>اليوم</th>';
    var times = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
    times.forEach(function (t) { table += '<th>' + t + '</th>'; });
    table += '</tr></thead><tbody>';
    _ttDays.forEach(function (day) {
      table += '<tr><th>' + day + '</th>';
      times.forEach(function (time) {
        var found = entries.filter(function (e) { return e.day === day && e.start <= time && e.end > time; });
        table += '<td>' + (found.length ? '<span class="tt-entry">' + found[0].name + '</span><span class="tt-time">' + found[0].start + '-' + found[0].end + '</span>' : '') + '</td>';
      });
      table += '</tr>';
    });
    table += '</tbody></table>';
    wrap.innerHTML = table;
  }

  function initTimetable() {
    var name = document.getElementById('ttName');
    var day = document.getElementById('ttDay');
    var start = document.getElementById('ttStart');
    var end = document.getElementById('ttEnd');
    var btn = document.getElementById('ttAddBtn');
    var printBtn = document.getElementById('ttPrintBtn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var n = name.value.trim(); if (!n) return;
      var entries = getTt();
      entries.push({ name: n, day: day.value, start: start.value, end: end.value });
      saveTt(entries); name.value = ''; renderTimetable();
    });

    printBtn.addEventListener('click', function () { window.print(); });
  }

  /* ===== JOURNAL ===== */
  function getJournal() { return Store.get('journal', []); }
  function saveJournal(arr) { Store.set('journal', arr); }

  function renderJournal() {
    var list = document.getElementById('journalList');
    if (!list) return;
    var entries = getJournal();
    if (entries.length === 0) { list.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:30px 0;">لا توجد يوميات بعد</p>'; return; }
    list.innerHTML = '';
    entries.slice().reverse().forEach(function (e, ri) {
      var i = entries.length - 1 - ri;
      list.innerHTML += '<div class="journal-entry"><h4>' + e.title + '</h4><div class="journal-date">' + e.date + '</div><p>' + e.body + '</p><button class="journal-del" data-idx="' + i + '"><i class="fas fa-trash"></i> حذف</button></div>';
    });
    list.querySelectorAll('.journal-del').forEach(function (b) {
      b.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-idx'));
        var entries = getJournal();
        entries.splice(idx, 1); saveJournal(entries); renderJournal();
      });
    });
  }

  function initJournal() {
    var title = document.getElementById('journalTitle');
    var body = document.getElementById('journalBody');
    var btn = document.getElementById('journalSaveBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var t = title.value.trim(); if (!t) return;
      var b = body.value.trim(); if (!b) return;
      var entries = getJournal();
      var now = new Date();
      var ds = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
      entries.push({ title: t, body: b, date: ds });
      saveJournal(entries); title.value = ''; body.value = ''; renderJournal();
    });
    body.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.ctrlKey) btn.click(); });
  }

  /* ===== DAILY QUOTE ===== */
  var _quotes = [
    { text: 'من جدّ وجد، ومن زرع حصد.', author: 'مثل عربي' },
    { text: 'العلم نور والجهل ظلام.', author: 'مثل عربي' },
    { text: 'اتق الله حيثما كنت.', author: 'حديث شريف' },
    { text: 'خير الناس أنفعهم للناس.', author: 'حديث شريف' },
    { text: 'من سار على الدرب وصل.', author: 'مثل عربي' },
    { text: 'لا تؤجل عمل اليوم إلى الغد.', author: 'حكمة' },
    { text: 'الصبر مفتاح الفرج.', author: 'مثل عربي' },
    { text: 'الأيام مدرسة.', author: 'مثل عربي' },
    { text: 'رب ضارة نافعة.', author: 'مثل عربي' },
    { text: 'النجاح 1% موهبة و99% عمل.', author: 'توماس إديسون' },
    { text: 'الطريق إلى النجاح يبدأ بخطوة.', author: 'حكمة' },
    { text: 'التكنولوجيا مجرد أداة. الناس يصنعون الفرق.', author: 'حكمة' }
  ];

  function showRandomQuote() {
    var textEl = document.getElementById('quoteText');
    var authorEl = document.getElementById('quoteAuthor');
    if (!textEl) return;
    var q = _quotes[Math.floor(Math.random() * _quotes.length)];
    textEl.textContent = q.text;
    authorEl.textContent = '— ' + q.author;
  }

  function initDailyQuote() {
    var btn = document.getElementById('quoteRefreshBtn');
    if (btn) btn.addEventListener('click', showRandomQuote);
  }

  /* ===== SETTINGS ===== */
  var ADMIN_HASH = 'MzIxNjlAYWRtIW4=';

  function _checkPin(input) {
    try { return btoa(input + '@adm!n') === ADMIN_HASH; } catch (e) { return false; }
  }

  function initSettings() {
    var lockEl = document.getElementById('settingsLock');
    var contentEl = document.getElementById('settingsContent');
    if (!lockEl || !contentEl) return;

    lockEl.style.display = 'flex';
    contentEl.style.display = 'none';

    var pinInput = document.getElementById('settingsPin');
    var unlockBtn = document.getElementById('settingsUnlockBtn');
    var errorDiv = document.getElementById('settingsPinError');
    if (!unlockBtn) return;

    /* Remove old listeners by cloning */
    var newBtn = unlockBtn.cloneNode(true);
    unlockBtn.parentNode.replaceChild(newBtn, unlockBtn);
    var newPin = pinInput.cloneNode(true);
    pinInput.parentNode.replaceChild(newPin, pinInput);

    newBtn.addEventListener('click', function () {
      if (_checkPin(newPin.value)) {
        lockEl.style.display = 'none';
        contentEl.style.display = 'block';
        errorDiv.textContent = '';
        renderSysList();
        initSysManager();
      } else {
        errorDiv.textContent = '❌ رمز خطأ، حاول مرة أخرى';
        newPin.value = '';
      }
    });

    newPin.addEventListener('keydown', function (e) { if (e.key === 'Enter') newBtn.click(); });
  }

  function initSysManager() {
    var nameInput = document.getElementById('sysName');
    var urlInput = document.getElementById('sysUrl');
    var logoInput = document.getElementById('sysLogo');
    var addBtn = document.getElementById('sysAddBtn');
    var resetBtn = document.getElementById('sysResetBtn');
    if (!addBtn) return;

    /* Remove old listeners by cloning */
    var newAdd = addBtn.cloneNode(true);
    addBtn.parentNode.replaceChild(newAdd, addBtn);
    var newReset = resetBtn.cloneNode(true);
    resetBtn.parentNode.replaceChild(newReset, resetBtn);

    newAdd.addEventListener('click', function () {
      var name = nameInput.value.trim();
      var url = urlInput.value.trim();
      if (!name || !url) { alert('الرجاء إدخال اسم ورابط المنظومة'); return; }
      var sys = getCustomSystems();
      var id = Date.now();
      var logoFile = logoInput.files[0];
      if (logoFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
          sys.push({ id: id, title: name, url: url, description: 'منظومة مضافة يدوياً', _custom: true, _logo: e.target.result });
          saveCustomSystems(sys);
          nameInput.value = ''; urlInput.value = ''; logoInput.value = '';
          renderSysList();
          reloadSystems();
        };
        reader.readAsDataURL(logoFile);
      } else {
        sys.push({ id: id, title: name, url: url, description: 'منظومة مضافة يدوياً', _custom: true });
        saveCustomSystems(sys);
        nameInput.value = ''; urlInput.value = '';
        renderSysList();
        reloadSystems();
      }
    });

    newReset.addEventListener('click', function () {
      if (confirm('سيتم استعادة المنظومات الافتراضية وحذف جميع الإضافات. هل أنت متأكد؟')) {
        localStorage.removeItem('portal_customSystems');
        window._allSystems = null;
        initSystems();
        renderSysList();
        alert('تم استعادة المنظومات الافتراضية');
      }
    });

    /* Download config button */
    var dlBtn = document.getElementById('sysDownloadBtn');
    if (dlBtn) {
      var newDl = dlBtn.cloneNode(true);
      dlBtn.parentNode.replaceChild(newDl, dlBtn);
      newDl.addEventListener('click', function () {
        downloadServerConfig();
      });
    }

    /* Copy config button */
    var copyBtn = document.getElementById('sysCopyBtn');
    if (copyBtn) {
      var newCopy = copyBtn.cloneNode(true);
      copyBtn.parentNode.replaceChild(newCopy, copyBtn);
      newCopy.addEventListener('click', function () {
        var ta = document.getElementById('sysConfigText');
        if (!ta.value) { alert('لا توجد بيانات للنسخ'); return; }
        ta.select();
        try { document.execCommand('copy'); alert('تم النسخ!'); } catch (e) { alert('تعذر النسخ، حدد النص يدوياً'); }
      });
    }

    /* JSONBin auto-sync buttons */
    var jsonBinIdEl = document.getElementById('sysJsonBinId');
    var jsonKeyEl = document.getElementById('sysJsonKey');
    var jsonSaveBtn = document.getElementById('sysJsonSaveBtn');
    var savedCfg = getJsonBinConfig();
    if (jsonBinIdEl && savedCfg.binId) jsonBinIdEl.value = savedCfg.binId;
    if (jsonKeyEl && savedCfg.masterKey) jsonKeyEl.value = savedCfg.masterKey;
    if (jsonSaveBtn) {
      var newJsonSave = jsonSaveBtn.cloneNode(true);
      jsonSaveBtn.parentNode.replaceChild(newJsonSave, jsonSaveBtn);
      newJsonSave.addEventListener('click', function () {
        var binId = jsonBinIdEl.value.trim();
        var key = jsonKeyEl.value.trim();
        if (!binId) { alert('الرجاء إدخال معرف JSONBin'); return; }
        saveJsonBinConfig(binId, key);
        syncToJsonBin();
        alert('تم حفظ إعدادات JSONBin والتزامن مع السحابة ✓');
      });
    }

    /* Update config textarea after any change */
    updateConfigTextarea();
  }

  function getCustomSystems() {
    return Store.get('customSystems', []);
  }
  function saveCustomSystems(arr) {
    Store.set('customSystems', arr);
  }

  /* ===== JSONBin Auto-Sync ===== */
  function getJsonBinConfig() {
    return { binId: Store.get('jsonbin_id', ''), masterKey: Store.get('jsonbin_key', '') };
  }
  function saveJsonBinConfig(binId, masterKey) {
    Store.set('jsonbin_id', binId);
    Store.set('jsonbin_key', masterKey);
  }
  async function fetchJsonBinConfig() {
    var cfg = getJsonBinConfig();
    if (!cfg.binId) return null;
    try {
      var headers = {};
      if (cfg.masterKey) headers['X-Master-Key'] = cfg.masterKey;
      var res = await fetch('https://api.jsonbin.io/v3/b/' + cfg.binId + '/latest', { headers: headers });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      var data = await res.json();
      return data.record || data;
    } catch (e) { return null; }
  }
  async function pushJsonBinConfig(configObj) {
    var cfg = getJsonBinConfig();
    if (!cfg.binId || !cfg.masterKey) return false;
    try {
      var res = await fetch('https://api.jsonbin.io/v3/b/' + cfg.binId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Master-Key': cfg.masterKey },
        body: JSON.stringify(configObj)
      });
      return res.ok;
    } catch (e) { return false; }
  }
  function buildFullConfig() {
    var overrides = getOverrides();
    var custom = getCustomSystems();
    var all = SYSTEMS_CONFIG.map(function (s) {
      var o = overrides[s.id];
      return o ? { id: s.id, title: o.title, url: o.url, description: s.description, _logo: o._logo || undefined } : s;
    });
    all = all.concat(custom);
    return all;
  }
  function syncToJsonBin() {
    var cfg = getJsonBinConfig();
    if (!cfg.binId || !cfg.masterKey) return;
    pushJsonBinConfig({ systems: buildFullConfig() });
  }
  function initSystems() {
    var cfg = getJsonBinConfig();
    if (cfg.binId) {
      fetchJsonBinConfig().then(function (data) {
        if (data && data.systems && data.systems.length > 0) {
          var overrides = getOverrides();
          var custom = getCustomSystems();
          var merged = data.systems.map(function (s) {
            var o = overrides[typeof s.id === 'number' ? s.id : ''];
            return o ? { id: s.id, title: o.title, url: o.url, description: s.description, _logo: o._logo || undefined } : s;
          });
          custom.forEach(function (c) {
            if (!merged.some(function (m) { return m.id === c.id; })) merged.push(c);
          });
          window._allSystems = merged;
          renderSystemsData(merged);
          updateCounts(merged.length);
          return;
        }
        loadLocalSystems();
      }).catch(function () { loadLocalSystems(); });
    } else {
      loadLocalSystems();
    }
  }
  function loadLocalSystems() {
    var custom = getCustomSystems();
    var overrides = getOverrides();
    var all = SYSTEMS_CONFIG.map(function (s) {
      var o = overrides[s.id];
      return o ? { id: s.id, title: o.title, url: o.url, description: s.description, _logo: o._logo || undefined } : s;
    });
    all = all.concat(custom);
    window._allSystems = all;
    renderSystemsData(all);
    updateCounts(all.length);
  }
  function updateCounts(n) {
    var totalEl = document.getElementById('resultsCount');
    var heroEl = document.getElementById('heroTotal');
    if (totalEl) totalEl.textContent = n;
    if (heroEl) heroEl.textContent = n;
  }
  function downloadServerConfig() {
    var blob = new Blob([JSON.stringify({ systems: buildFullConfig() }, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'systems-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function updateConfigTextarea() {
    var ta = document.getElementById('sysConfigText');
    if (!ta) return;
    ta.value = JSON.stringify({ systems: buildFullConfig() }, null, 2);
  }
  function renderSystemsData(arr) {
    var grid = document.getElementById('systemsGrid');
    var noResults = document.getElementById('noResults');
    if (!grid) return;
    document.getElementById('resultsCount').textContent = arr.length;
    document.getElementById('heroTotal').textContent = arr.length;
    if (arr.length === 0) { grid.innerHTML = ''; if (noResults) noResults.style.display = 'block'; return; }
    if (noResults) noResults.style.display = 'none';
    grid.innerHTML = '';
    arr.forEach(function (system) {
      var card = document.createElement('article');
      card.className = 'system-card';
      card.setAttribute('role', 'listitem');
      card.setAttribute('data-aos', 'fade-up');
      card.setAttribute('data-aos-delay', '100');
      var imgSrc = system._logo || ('assets/images/' + system.id + '.png');
      card.innerHTML = '<div class="card-glow"></div><div class="card-image-wrap"><img src="' + imgSrc + '" alt="' + system.title + '" loading="lazy" /></div><span class="card-index">' + system.id + '</span><div class="card-body"><h3 class="card-title">' + system.title + '</h3><p class="card-desc">' + system.description + '</p><div class="card-footer"><a href="' + system.url + '" class="card-btn" target="_blank" rel="noopener"><span>فتح المنظومة</span><i class="fas fa-arrow-left"></i></a></div></div>';
      grid.appendChild(card);
    });
    if (typeof AOS !== 'undefined') { AOS.refresh(); }
    document.querySelectorAll('.system-card').forEach(function (card) { initTilt(card); initMouseGlow(card); });
  }
  function reloadSystems() {
    var q = document.getElementById('searchInput');
    if (q && q.value.trim()) {
      renderSystemsData(filterSystems(q.value.trim()));
    } else {
      initSystems();
    }
    syncToJsonBin();
  }
  function filterSystems(q) {
    var all = window._allSystems || SYSTEMS_CONFIG;
    return all.filter(function (s) { return s.title.includes(q) || s.description.includes(q); });
  }

  var _editingSysId = null;

  /* ===== SYSTEM OVERRIDES (for built-in systems) ===== */
  function getOverrides() {
    return Store.get('overrides', {});
  }
  function saveOverrides(obj) {
    Store.set('overrides', obj);
  }

  function renderSysList() {
    var list = document.getElementById('settingsSysList');
    if (!list) return;
    var overrides = getOverrides();
    var custom = getCustomSystems();
    var all = [];
    SYSTEMS_CONFIG.forEach(function (s) {
      var o = overrides[s.id];
      all.push(o ? { title: o.title, url: o.url, id: s.id, description: s.description, _logo: o._logo || undefined, _overridden: true } : s);
    });
    all = all.concat(custom);
    list.innerHTML = '';
    all.forEach(function (sys, idx) {
      var isCustom = idx >= SYSTEMS_CONFIG.length;
      var imgSrc = sys._logo || ('assets/images/' + sys.id + '.png');
      var item = document.createElement('div');
      item.className = 'settings-sys-item' + (_editingSysId === sys.id ? ' editing' : '');
      if (_editingSysId === sys.id) item.setAttribute('data-edit-id', sys.id);
      var img = document.createElement('img');
      img.src = imgSrc;
      img.alt = sys.title;
      item.appendChild(img);
      var info = document.createElement('div');
      info.className = 'sys-info';
      if (_editingSysId === sys.id) {
        var inpName = document.createElement('input');
        inpName.type = 'text';
        inpName.className = 'edit-name';
        inpName.value = sys.title;
        inpName.placeholder = 'اسم المنظومة';
        info.appendChild(inpName);
        var inpUrl = document.createElement('input');
        inpUrl.type = 'url';
        inpUrl.className = 'edit-url';
        inpUrl.value = sys.url;
        inpUrl.placeholder = 'رابط المنظومة';
        info.appendChild(inpUrl);
        var inpLogo = document.createElement('input');
        inpLogo.type = 'file';
        inpLogo.className = 'edit-logo';
        inpLogo.accept = 'image/*';
        info.appendChild(inpLogo);
      } else {
        var strong = document.createElement('strong');
        strong.textContent = sys.title;
        info.appendChild(strong);
        var span = document.createElement('span');
        span.textContent = sys.url;
        info.appendChild(span);
      }
      item.appendChild(info);
      if (_editingSysId === sys.id) {
        var saveBtn = document.createElement('button');
        saveBtn.className = 'sys-save';
        saveBtn.innerHTML = '<i class="fas fa-check"></i> حفظ';
        saveBtn.setAttribute('data-idx', idx);
        saveBtn.setAttribute('data-id', sys.id);
        item.appendChild(saveBtn);
        var cancelBtn = document.createElement('button');
        cancelBtn.className = 'sys-cancel';
        cancelBtn.innerHTML = '<i class="fas fa-times"></i> إلغاء';
        item.appendChild(cancelBtn);
      } else {
        var editBtn = document.createElement('button');
        editBtn.className = 'sys-edit';
        editBtn.innerHTML = '<i class="fas fa-pen"></i> تعديل';
        editBtn.setAttribute('data-id', sys.id);
        item.appendChild(editBtn);
        if (isCustom) {
          var delBtn = document.createElement('button');
          delBtn.className = 'sys-del';
          delBtn.innerHTML = '<i class="fas fa-trash"></i> حذف';
          delBtn.setAttribute('data-id', sys.id);
          item.appendChild(delBtn);
        }
      }
      list.appendChild(item);
    });
    attachSysEvents();
  }

  function attachSysEvents() {
    var list = document.getElementById('settingsSysList');
    if (!list) return;
    list.querySelectorAll('.sys-edit').forEach(function (b) {
      b.addEventListener('click', function () {
        _editingSysId = Number(this.getAttribute('data-id'));
        renderSysList();
      });
    });
    list.querySelectorAll('.sys-cancel').forEach(function (b) {
      b.addEventListener('click', function () {
        _editingSysId = null;
        renderSysList();
      });
    });
    list.querySelectorAll('.sys-save').forEach(function (b) {
      b.addEventListener('click', function () {
        var idx = Number(this.getAttribute('data-idx'));
        var id = Number(this.getAttribute('data-id'));
        var item = this.closest('.settings-sys-item');
        if (!item) return;
        var newName = item.querySelector('.edit-name').value.trim();
        var newUrl = item.querySelector('.edit-url').value.trim();
        if (!newName || !newUrl) { alert('الرجاء إدخال اسم ورابط المنظومة'); return; }
        var logoFile = item.querySelector('.edit-logo').files[0];

        if (idx < SYSTEMS_CONFIG.length) {
          /* Built-in system → save override */
          var overrides = getOverrides();
          overrides[id] = { title: newName, url: newUrl };
          if (logoFile) {
            (function (oid, ov) {
              var r = new FileReader();
              r.onload = function (e) { ov[oid]._logo = e.target.result; saveOverrides(ov); _editingSysId = null; renderSysList(); reloadSystems(); };
              r.readAsDataURL(logoFile);
            })(id, overrides);
            return;
          }
          saveOverrides(overrides);
        } else {
          /* Custom system → edit in place */
          var custom = getCustomSystems();
          var relIdx = idx - SYSTEMS_CONFIG.length;
          if (relIdx >= 0 && relIdx < custom.length) {
            custom[relIdx].title = newName;
            custom[relIdx].url = newUrl;
            if (logoFile) {
              var reader = new FileReader();
              reader.onload = function (e) {
                custom[relIdx]._logo = e.target.result;
                saveCustomSystems(custom);
                _editingSysId = null;
                renderSysList();
                reloadSystems();
              };
              reader.readAsDataURL(logoFile);
              return;
            }
            saveCustomSystems(custom);
          }
        }
        _editingSysId = null;
        renderSysList();
        reloadSystems();
      });
    });
    list.querySelectorAll('.sys-del').forEach(function (b) {
      b.addEventListener('click', function () {
        var id = Number(this.getAttribute('data-id'));
        var custom = getCustomSystems();
        for (var j = 0; j < custom.length; j++) {
          if (custom[j].id === id) { custom.splice(j, 1); saveCustomSystems(custom); renderSysList(); reloadSystems(); return; }
        }
      });
    });
  }

  /* ===== ISLAMIC LIBRARY ===== */
  var ADHKAR_DATA = {
    morning: [
      { text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ', source: 'مسلم 4/2088' },
      { text: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ', source: 'الترمذي 5/466' },
      { text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ', source: 'البخاري 7/150 (سيد الاستغفار)' },
      { text: 'اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ: أَنَّكَ أَنْتَ اللهُ لَا إِلَهَ إِلَّا أَنْتَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ', source: 'أبو داود 4/317' },
      { text: 'اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ', source: 'أبو داود 4/318' },
      { text: 'أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ', source: 'أحمد 3/406' },
      { text: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي (3 مرات)، اللَّهُمَّ عَافِنِي فِي سَمْعِي (3 مرات)، اللَّهُمَّ عَافِنِي فِي بَصَرِي (3 مرات)، لَا إِلَهَ إِلَّا أَنْتَ', source: 'أبو داود 4/324' },
      { text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي', source: 'أبو داود 4/362' },
      { text: 'أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ (3 مرات)', source: 'مسلم 4/1728', count: 3 },
      { text: 'حَسْبِيَ اللهُ لَا إِلَهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ (7 مرات)', source: 'أبو داود 4/321', count: 7 },
      { text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، عَلَيْكَ تَوَكَّلْتُ، وَأَنْتَ رَبُّ الْعَرْشِ الْكَرِيمِ، مَا شَاءَ اللهُ كَانَ، وَمَا لَمْ يَشَأْ لَمْ يَكُنْ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ', source: 'أبو داود 4/322' },
      { text: 'بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ (3 مرات)', source: 'أبو داود 4/323', count: 3 },
      { text: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ نَبِيًّا (3 مرات)', source: 'أبو داود 4/318', count: 3 },
      { text: 'يَا حَيُّ يَا قَيُّومُ، بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ', source: 'النسائي 3/206' },
      { text: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ (10 مرات)', source: 'مسلم 1/305', count: 10 },
      { text: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ (100 مرة)', source: 'مسلم 4/2071', count: 100 },
      { text: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ (10 مرات)', source: 'البخاري 7/67', count: 10 },
      { text: 'سُبْحَانَ اللهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ (100 مرة)', source: 'مسلم 4/2071', count: 100 },
      { text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا', source: 'ابن ماجه 1/92' },
      { text: 'أَسْتَغْفِرُ اللهَ وَأَتُوبُ إِلَيْهِ (100 مرة)', source: 'مسلم 4/2075', count: 100 }
    ],
    evening: [
      { text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا', source: 'مسلم 4/2088' },
      { text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ', source: 'الترمذي 5/466' },
      { text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ', source: 'البخاري 7/150 (سيد الاستغفار)' },
      { text: 'اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ: أَنَّكَ أَنْتَ اللهُ لَا إِلَهَ إِلَّا أَنْتَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ', source: 'أبو داود 4/317' },
      { text: 'اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ', source: 'أبو داود 4/318' },
      { text: 'أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ', source: 'أحمد 3/406' },
      { text: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي (3 مرات)، اللَّهُمَّ عَافِنِي فِي سَمْعِي (3 مرات)، اللَّهُمَّ عَافِنِي فِي بَصَرِي (3 مرات)، لَا إِلَهَ إِلَّا أَنْتَ', source: 'أبو داود 4/324' },
      { text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي', source: 'أبو داود 4/362' },
      { text: 'أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ (3 مرات)', source: 'مسلم 4/1728', count: 3 },
      { text: 'حَسْبِيَ اللهُ لَا إِلَهَ إِلَّا هُوَ، عَلَيْهِ تَوَكَّلْتُ، وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ (7 مرات)', source: 'أبو داود 4/321', count: 7 },
      { text: 'بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ، وَهُوَ السَّمِيعُ الْعَلِيمُ (3 مرات)', source: 'أبو داود 4/323', count: 3 },
      { text: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ نَبِيًّا (3 مرات)', source: 'أبو داود 4/318', count: 3 },
      { text: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ (10 مرات)', source: 'مسلم 1/305', count: 10 },
      { text: 'يَا حَيُّ يَا قَيُّومُ، بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ', source: 'النسائي 3/206' },
      { text: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ (100 مرة)', source: 'مسلم 4/2071', count: 100 },
      { text: 'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ (10 مرات)', source: 'البخاري 7/67', count: 10 },
      { text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا', source: 'ابن ماجه 1/92' },
      { text: 'أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ — وَقُلْ هُوَ اللهُ أَحَدٌ (3 مرات) — وَالْمُعَوِّذَتَان (3 مرات)', source: 'الترمذي 5/567', count: 3 }
    ],
    prayer: [
      { text: 'سُبْحَانَ اللهِ (33 مرة) — وَالْحَمْدُ لِلَّهِ (33 مرة) — وَاللهُ أَكْبَرُ (33 مرة) — ثُمَّ: لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', source: 'مسلم 1/418' },
      { text: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ', source: 'مسلم 1/414' },
      { text: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ', source: 'أبو داود 2/86' },
      { text: 'أَسْتَغْفِرُ اللهَ (3 مرات) — اللَّهُمَّ أَنْتَ السَّلَامُ...', source: 'مسلم 1/414' }
    ],
    sleep: [
      { text: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا', source: 'البخاري 11/126' },
      { text: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ (3 مرات)', source: 'أبو داود 4/311' },
      { text: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ', source: 'البخاري 11/126' },
      { text: 'آيَةُ الْكُرْسِيِّ — سُورَةُ الْإِخْلَاصِ — الْمُعَوِّذَتَان (3 مرات)', source: 'البخاري 9/62' }
    ],
    other: [
      { text: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', source: 'البقرة 201' },
      { text: 'سُبْحَانَ اللهِ وَبِحَمْدِهِ، سُبْحَانَ اللهِ الْعَظِيمِ', source: 'متفق عليه' },
      { text: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', source: 'مسلم 4/2076' },
      { text: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ', source: 'البخاري 6/408' },
      { text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ', source: 'أبو داود 4/362' },
      { text: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ نَبِيًّا (3 مرات)', source: 'أبو داود 4/318' }
    ]
  };

  var TAWHID_CHAPTERS = [
    { title: 'باب فضل التوحيد وما يكفر من الذنوب', text: 'قال الله تعالى: {الَّذِينَ آمَنُوا وَلَمْ يَلْبِسُوا إِيمَانَهُم بِظُلْمٍ أُولَٰئِكَ لَهُمُ الْأَمْنُ وَهُم مُّهْتَدُونَ} [الأنعام: 82]. وعن عبادة بن الصامت رضي الله عنه قال: قال رسول الله صلى الله عليه وسلم: "من شهد أن لا إله إلا الله وحده لا شريك له، وأن محمداً عبده ورسوله، وأن عيسى عبد الله ورسوله... أدخله الله الجنة على ما كان من العمل". متفق عليه.' },
    { title: 'باب من حقق التوحيد دخل الجنة بغير حساب', text: 'عن حصين بن عبد الرحمن قال: كنت عند سعيد بن جبير فقال: أيكم رأى الكوكب الذي انقض البارحة؟ فقلت: أنا. ثم قال: أما إني كنت في الصلاة. وذلك أني طعنت. ثم قال: إن رسول الله صلى الله عليه وسلم قال: "تعرض الفتن على القلوب كالحصير عوداً عوداً..." الحديث.' },
    { title: 'باب الخوف من الشرك', text: 'قال الله تعالى: {إِنَّ اللَّهَ لَا يَغْفِرُ أَن يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَٰلِكَ لِمَن يَشَاءُ} [النساء: 48]. وعن عبد الله بن مسعود رضي الله عنه أن النبي صلى الله عليه وسلم قال: "إن أخوف ما أخاف عليكم الشرك الأصغر". قالوا: وما الشرك الأصغر يا رسول الله؟ قال: "الرياء". رواه أحمد.' },
    { title: 'باب الدعاء إلى شهادة أن لا إله إلا الله', text: 'قال الله تعالى: {قُلْ هَٰذِهِ سَبِيلِي أَدْعُو إِلَى اللَّهِ ۚ عَلَىٰ بَصِيرَةٍ أَنَا وَمَنِ اتَّبَعَنِي} [يوسف: 108]. وعن ابن عباس رضي الله عنهما أن النبي صلى الله عليه وسلم لما بعث معاذاً إلى اليمن قال: "إنك تأتي قوماً من أهل الكتاب، فليكن أول ما تدعوهم إليه شهادة أن لا إله إلا الله". متفق عليه.' },
    { title: 'باب التوبة إلى الله والاستغفار', text: 'قال الله تعالى: {وَتُوبُوا إِلَى اللَّهِ جَمِيعًا أَيُّهَ الْمُؤْمِنُونَ لَعَلَّكُمْ تُفْلِحُونَ} [النور: 31]. وعن أبي هريرة رضي الله عنه قال: سمعت رسول الله صلى الله عليه وسلم يقول: "والله إني لأستغفر الله وأتوب إليه في اليوم أكثر من سبعين مرة". رواه البخاري.' },
    { title: 'باب وجوب محبة الله ورسوله', text: 'قال الله تعالى: {قُلْ إِن كَانَ آبَاؤُكُمْ وَأَبْنَاؤُكُمْ وَإِخْوَانُكُمْ وَأَزْوَاجُكُمْ وَعَشِيرَتُكُمْ وَأَمْوَالٌ اقْتَرَفْتُمُوهَا وَتِجَارَةٌ تَخْشَوْنَ كَسَادَهَا وَمَسَاكِنُ تَرْضَوْنَهَا أَحَبَّ إِلَيْكُم مِّنَ اللَّهِ وَرَسُولِهِ وَجِهَادٍ فِي سَبِيلِهِ فَتَرَبَّصُوا حَتَّىٰ يَأْتِيَ اللَّهُ بِأَمْرِهِ} [التوبة: 24]. وعن أنس رضي الله عنه أن النبي صلى الله عليه وسلم قال: "لا يؤمن أحدكم حتى أكون أحب إليه من والده وولده والناس أجمعين". متفق عليه.' },
    { title: 'باب الخشية والخوف من الله', text: 'قال الله تعالى: {إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ} [فاطر: 28]. وعن ابن مسعود رضي الله عنه قال: قال النبي صلى الله عليه وسلم: "اللهم إني أسألك الهدى والتقى والعفاف والغنى". رواه مسلم.' },
    { title: 'باب التوكل على الله', text: 'قال الله تعالى: {وَعَلَى اللَّهِ فَتَوَكَّلُوا إِن كُنتُم مُّؤْمِنِينَ} [المائدة: 23]. وعن عمر بن الخطاب رضي الله عنه قال: سمعت رسول الله صلى الله عليه وسلم يقول: "لو أنكم تتوكلون على الله حق توكله لرزقكم كما يرزق الطير، تغدو خماصاً وتروح بطاناً". رواه الترمذي.' },
    { title: 'باب الرجاء والطمع في رحمة الله', text: 'قال الله تعالى: {إِنَّ رَبَّكَ وَاسِعُ الْمَغْفِرَةِ} [النجم: 32]. وعن أبي هريرة رضي الله عنه قال: سمعت رسول الله صلى الله عليه وسلم يقول: "جعل الله الرحمة مائة جزء، فأمسك عنده تسعة وتسعين، وأنزل في الأرض جزءاً واحداً". متفق عليه.' },
    { title: 'باب الصبر على البلاء', text: 'قال الله تعالى: {إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ} [الزمر: 10]. وعن أبي سعيد الخدري رضي الله عنه أن النبي صلى الله عليه وسلم قال: "ما يصيب المؤمن من نصب ولا وصب ولا هم ولا حزن ولا أذى ولا غم، حتى الشوكة يشاكها، إلا كفر الله بها من خطاياه". متفق عليه.' }
  ];

  function initIslamic() {
    if (document.getElementById('isTabs').dataset._init === '1') return;
    document.getElementById('isTabs').dataset._init = '1';

    /* Tab switching */
    document.querySelectorAll('#isTabs .is-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('#isTabs .is-tab').forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        document.querySelectorAll('.is-pane').forEach(function (p) { p.classList.remove('active'); });
        document.getElementById('is' + this.getAttribute('data-is').replace(/^\w/, function (c) { return c.toUpperCase(); })).classList.add('active');
      });
    });

    /* Quran: populate surah list */
    var select = document.getElementById('quranSurahSelect');
    var surahNames = ['الفاتحة','البقرة','آل عمران','النساء','المائدة','الأنعام','الأعراف','الأنفال','التوبة','يونس','هود','يوسف','الرعد','إبراهيم','الحجر','النحل','الإسراء','الكهف','مريم','طه','الأنبياء','الحج','المؤمنون','النور','الفرقان','الشعراء','النمل','القصص','العنكبوت','الروم','لقمان','السجدة','الأحزاب','سبأ','فاطر','يس','الصافات','ص','الزمر','غافر','فصلت','الشورى','الزخرف','الدخان','الجاثية','الأحقاف','محمد','الفتح','الحجرات','ق','الذاريات','الطور','النجم','القمر','الرحمن','الواقعة','الحديد','المجادلة','الحشر','الممتحنة','الصف','الجمعة','المنافقون','التغابن','الطلاق','التحريم','الملك','القلم','الحاقة','المعارج','نوح','الجن','المزمل','المدثر','القيامة','الإنسان','المرسلات','النبأ','النازعات','عبس','التكوير','الانفطار','المطففين','الانشقاق','البروج','الطارق','الأعلى','الغاشية','الفجر','البلد','الشمس','الليل','الضحى','الشرح','التين','العلق','القدر','البينة','الزلزلة','العاديات','القارعة','التكاثر','العصر','الهمزة','الفيل','قريش','الماعون','الكوثر','الكافرون','النصر','المسد','الإخلاص','الفلق','الناس'];
    surahNames.forEach(function (name, i) {
      var opt = document.createElement('option');
      opt.value = i + 1;
      opt.textContent = (i + 1) + '. ' + name;
      select.appendChild(opt);
    });

    document.getElementById('quranGoBtn').addEventListener('click', fetchSurah);

    /* Adhkar: tabs */
    document.querySelectorAll('#adhkarTabs .adhkar-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('#adhkarTabs .adhkar-tab').forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        renderAdhkar(this.getAttribute('data-ad'));
      });
    });
    renderAdhkar('morning');

    /* Tawhid: render chapters */
    renderTawhid();

    /* Hadith: search */
    document.getElementById('hadithSearchBtn').addEventListener('click', searchHadith);
    document.getElementById('hadithQuery').addEventListener('keydown', function (e) { if (e.key === 'Enter') searchHadith(); });

    /* Aqeedah: tabs */
    document.querySelectorAll('#aqeedahTabs .adhkar-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('#aqeedahTabs .adhkar-tab').forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        renderAqeedah(this.getAttribute('data-aq'));
      });
    });
    renderAqeedah('usool');
  }

  function fetchSurah() {
    var num = document.getElementById('quranSurahSelect').value;
    if (!num) return;
    var el = document.getElementById('quranVerses');
    el.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:20px;">جاري تحميل السورة...</div>';
    fetch('https://api.alquran.cloud/v1/surah/' + num)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.code === 200 && data.data) {
          var verses = data.data.ayahs;
          el.innerHTML = '';
          verses.forEach(function (ayah) {
            var div = document.createElement('div');
            div.className = 'quran-ayah';
            div.innerHTML = '<span class="quran-ayah-num">' + ayah.numberInSurah + '</span><span class="quran-ayah-text">' + ayah.text + '</span>';
            el.appendChild(div);
          });
          document.getElementById('quranReading').style.display = 'block';
        } else {
          el.innerHTML = '<div style="text-align:center;color:#ef4444;">تعذر تحميل السورة</div>';
        }
      })
      .catch(function () {
        el.innerHTML = '<div style="text-align:center;color:#ef4444;">خطأ في الاتصال</div>';
      });
  }

  function renderAdhkar(cat) {
    var el = document.getElementById('adhkarContent');
    var list = ADHKAR_DATA[cat] || [];
    if (list.length === 0) { el.innerHTML = '<div style="text-align:center;color:var(--text-muted);">لا توجد أذكار</div>'; return; }
    el.innerHTML = '';
    list.forEach(function (item) {
      var div = document.createElement('div');
      div.className = 'adhkar-item';
      var html = '<div class="adhkar-text">' + item.text + '</div>';
      if (item.source) html += '<div class="adhkar-source">📖 ' + item.source + '</div>';
      if (item.count) html += '<span class="adhkar-count">' + item.count + ' مرة</span>';
      div.innerHTML = html;
      el.appendChild(div);
    });
  }

  function renderTawhid() {
    var el = document.getElementById('tawhidChapters');
    el.innerHTML = '';
    TAWHID_CHAPTERS.forEach(function (ch, i) {
      var div = document.createElement('div');
      div.className = 'tawhid-chapter';
      div.innerHTML = '<div class="tawhid-chapter-title"><span>' + (i + 1) + '.</span> ' + ch.title + '<span class="arrow"><i class="fas fa-chevron-down"></i></span></div><div class="tawhid-chapter-body"><div class="tawhid-chapter-text">' + ch.text + '</div></div>';
      div.querySelector('.tawhid-chapter-title').addEventListener('click', function () {
        div.classList.toggle('open');
      });
      el.appendChild(div);
    });
  }

  function searchHadith() {
    var q = document.getElementById('hadithQuery').value.trim();
    if (!q) { document.getElementById('hadithResult').textContent = 'الرجاء إدخال نص للبحث'; return; }
    document.getElementById('hadithResult').innerHTML = 'جاري البحث في الموسوعة الحديثية...';
    window.open('https://dorar.net/hadith/search?q=' + encodeURIComponent(q), '_blank');
    document.getElementById('hadithResult').innerHTML = '<a href="https://dorar.net/hadith/search?q=' + encodeURIComponent(q) + '" target="_blank" rel="noopener" style="color:var(--electric-blue);">تم فتح نتائج البحث في نافذة جديدة — اضغط هنا إذا لم تفتح</a>';
  }

  /* ===== AQEEDAH DATA ===== */
  var USOOL_TEXT = [
    { title: 'مقدمة', text: 'اعلم - رحمك الله - أنه يجب علينا تعلم أربع مسائل:<br><br>الأولى: العلم، وهو معرفة الله ومعرفة نبيه ومعرفة دين الإسلام بالأدلة.<br>الثانية: العمل به.<br>الثالثة: الدعوة إليه.<br>الرابعة: الصبر على الأذى فيه.<br><br>والدليل قوله تعالى: {بسم الله الرحمن الرحيم} {وَالْعَصْرِ * إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ * إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ}.' },
    { title: 'المسألة الأولى: معرفة الله', text: 'إذا قيل لك: من ربك؟ فقل: ربي الله الذي رباني وربى جميع العالمين بنعمه، وهو معبودي ليس لي معبود سواه. والدليل قوله تعالى: {الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ}. وكل من سوى الله فهو عالم، وأنا واحد من ذلك العالم.<br><br>وإذا قيل لك: بم عرفت ربك؟ فقل: بآياته ومخلوقاته. ومن آياته: الليل والنهار والشمس والقمر. ومن مخلوقاته: السماوات السبع والأرضون السبع ومن فيهن وما بينهما. والدليل قوله تعالى: {وَمِنْ آيَاتِهِ اللَّيْلُ وَالنَّهَارُ وَالشَّمْسُ وَالْقَمَرُ} وقوله تعالى: {إِنَّ رَبَّكُمُ اللَّهُ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ فِي سِتَّةِ أَيَّامٍ}.' },
    { title: 'المسألة الثانية: معرفة النبي', text: 'إذا قيل لك: من نبيك؟ فقل: محمد بن عبد الله بن عبد المطلب بن هاشم، وهاشم من قريش، وقريش من العرب، والعرب من ذرية إسماعيل بن إبراهيم الخليل، عليه وعلى نبينا أفضل الصلاة والسلام.<br><br>فعمره: ثلاث وستون سنة، منها أربعون قبل النبوة، وثلاث وعشرون نبياً رسولاً. نُبِّئَ بـ {اقْرَأْ} وأُرسل بـ {الْمُدَّثِّرُ}. وبلده مكة، وهاجر إلى المدينة.<br><br>بعثه الله إلى الناس كافة، وحرمة اتباعه على كل أحد. والدليل قوله تعالى: {قُلْ يَا أَيُّهَا النَّاسُ إِنِّي رَسُولُ اللَّهِ إِلَيْكُمْ جَمِيعًا}.' },
    { title: 'المسألة الثالثة: معرفة دين الإسلام', text: 'دين الإسلام: هو الاستسلام لله بالتوحيد، والانقياد له بالطاعة، والبراءة من الشرك وأهله.<br><br>وهو ثلاث مراتب: الإسلام، والإيمان، والإحسان. وكل مرتبة لها أركان.<br><br><span class="aqeedah-highlight">المرتبة الأولى: الإسلام</span><br>أركان الإسلام خمسة: شهادة أن لا إله إلا الله وأن محمداً رسول الله، وإقام الصلاة، وإيتاء الزكاة، وصوم رمضان، وحج بيت الله الحرام.<br><br>فدليل الشهادة قوله تعالى: {شَهِدَ اللَّهُ أَنَّهُ لَا إِلَٰهَ إِلَّا هُوَ}. ودليل الصلاة والزكاة قوله تعالى: {وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ حُنَفَاءَ وَيُقِيمُوا الصَّلَاةَ وَيُؤْتُوا الزَّكَاةَ}. ودليل الصوم قوله تعالى: {يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ}. ودليل الحج قوله تعالى: {وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ}.<br><br><span class="aqeedah-highlight">المرتبة الثانية: الإيمان</span><br>أركان الإيمان ستة: أن تؤمن بالله، وملائكته، وكتبه، ورسله، واليوم الآخر، وبالقدر خيره وشره. والدليل قوله تعالى: {آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ}.<br><br><span class="aqeedah-highlight">المرتبة الثالثة: الإحسان</span><br>الإحسان: أن تعبد الله كأنك تراه، فإن لم تكن تراه فإنه يراك. والدليل قوله تعالى: {إِنَّ اللَّهَ مَعَ الَّذِينَ اتَّقَوْا وَالَّذِينَ هُمْ مُحْسِنُونَ}.' },
    { title: 'شروط لا إله إلا الله', text: 'لا إله إلا الله لها شروط: العلم المنافي للجهل، واليقين المنافي للشك، والإخلاص المنافي للشرك، والصدق المنافي للكذب، والمحبة المنافي للبغض، والانقياد المنافي للترك، والقبول المنافي للرد.<br><br>والدليل على كل شرط من الكتاب والسنة. وتنقسم التوحيد إلى ثلاثة أقسام: توحيد الربوبية، وتوحيد الألوهية، وتوحيد الأسماء والصفات.' },
    { title: 'توحيد الربوبية', text: 'توحيد الربوبية: هو إفراد الله بأفعاله، كالخلق والرزق والإحياء والإماتة وتدبير الأمور. وقد أقرَّ به المشركون، ولم يدخلهم في الإسلام. والدليل قوله تعالى: {قُلْ مَنْ يَرْزُقُكُمْ مِنَ السَّمَاءِ وَالْأَرْضِ ۚ أَمَّنْ يَمْلِكُ السَّمْعَ وَالْأَبْصَارَ ۚ وَمَنْ يُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَيُخْرِجُ الْمَيِّتَ مِنَ الْحَيِّ ۚ وَمَنْ يُدَبِّرُ الْأَمْرَ ۚ فَسَيَقُولُونَ اللَّهُ ۚ فَقُلْ أَفَلَا تَتَّقُونَ}.' },
    { title: 'توحيد الألوهية', text: 'توحيد الألوهية: هو إفراد الله بالعبادة، كالدعاء والخوف والرجاء والتوكل والذبح والنذر وغير ذلك من أنواع العبادة. وهو معنى لا إله إلا الله، وبه اختلفت الرسل مع أقوامهم. والدليل قوله تعالى: {وَلَقَدْ بَعَثْنَا فِي كُلِّ أُمَّةٍ رَسُولًا أَنِ اعْبُدُوا اللَّهَ وَاجْتَنِبُوا الطَّاغُوتَ}.' },
    { title: 'توحيد الأسماء والصفات', text: 'توحيد الأسماء والصفات: هو الإيمان بما وصف الله به نفسه ووصفه به رسوله صلى الله عليه وسلم من الأسماء والصفات، إثباتاً بلا تشبيه، وتنزيهاً بلا تعطيل. والدليل قوله تعالى: {لَيْسَ كَمِثْلِهِ شَيْءٌ ۖ وَهُوَ السَّمِيعُ الْبَصِيرُ}.' }
  ];

  var QAWAID_TEXT = [
    { title: 'القاعدة الأولى', text: 'إن المشركين الذين قاتلهم رسول الله صلى الله عليه وسلم مقرون بأن الله تعالى هو الخالق الرزاق المدبر، وأنه الذي خلق السماوات والأرض، ومع ذلك لم يدخلهم في الإسلام، والدليل قوله تعالى: {قُلْ مَنْ يَرْزُقُكُمْ مِنَ السَّمَاءِ وَالْأَرْضِ ۚ أَمَّنْ يَمْلِكُ السَّمْعَ وَالْأَبْصَارَ ۚ وَمَنْ يُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَيُخْرِجُ الْمَيِّتَ مِنَ الْحَيِّ ۚ وَمَنْ يُدَبِّرُ الْأَمْرَ ۚ فَسَيَقُولُونَ اللَّهُ ۚ فَقُلْ أَفَلَا تَتَّقُونَ}.' },
    { title: 'القاعدة الثانية', text: 'إنهم يقولون: ما دعوناهم وتوجهنا إليهم إلا لطلب القربة والشفاعة. فدليل القربة قوله تعالى: {وَالَّذِينَ اتَّخَذُوا مِنْ دُونِهِ أَوْلِيَاءَ مَا نَعْبُدُهُمْ إِلَّا لِيُقَرِّبُونَا إِلَى اللَّهِ زُلْفَىٰ}. ودليل الشفاعة قوله تعالى: {وَيَعْبُدُونَ مِنْ دُونِ اللَّهِ مَا لَا يَضُرُّهُمْ وَلَا يَنْفَعُهُمْ وَيَقُولُونَ هَٰؤُلَاءِ شُفَعَاؤُنَا عِنْدَ اللَّهِ}. والشفاعة نوعان: شفاعة منفية (وهي التي تُطلب من غير الله فيما لا يقدر عليه إلا الله)، وشفاعة مثبتة (وهي التي تُطلب من الله وحده، ويشفع بها من أذن له).' },
    { title: 'القاعدة الثالثة', text: 'إن النبي صلى الله عليه وسلم ظهر على أناس متفرقين في عباداتهم: منهم من يعبد الملائكة، ومنهم من يعبد الأنبياء، ومنهم من يعبد الصالحين، ومنهم من يعبد الأشجار والأحجار. فقاتلهم رسول الله صلى الله عليه وسلم ولم يفرق بينهم. والدليل قوله تعالى: {وَقَاتِلُوهُمْ حَتَّىٰ لَا تَكُونَ فِتْنَةٌ وَيَكُونَ الدِّينُ كُلُّهُ لِلَّهِ}.' },
    { title: 'القاعدة الرابعة', text: 'إن مشركي زماننا أغلظ شركاً من المشركين الأولين؛ لأن الأولين يشركون في الرخاء ويخلصون في الشدة، ومشركو زماننا شركهم دائم في الرخاء والشدة. والدليل قوله تعالى: {فَإِذَا رَكِبُوا فِي الْفُلْكِ دَعَوُا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ فَلَمَّا نَجَّاهُمْ إِلَى الْبَرِّ إِذَا هُمْ يُشْرِكُونَ}.' }
  ];

  var FIFTY_QA = [
    { q: 'من ربك؟', a: 'ربي الله الذي خلقني ورزقني ورباني وربى جميع العالمين بنعمه.' },
    { q: 'ما دينك؟', a: 'ديني الإسلام: الاستسلام لله بالتوحيد والانقياد له بالطاعة والبراءة من الشرك وأهله.' },
    { q: 'من نبيك؟', a: 'نبيي محمد بن عبد الله بن عبد المطلب صلى الله عليه وسلم.' },
    { q: 'بم أرسل الله محمداً؟', a: 'أرسله بالهدى ودين الحق ليظهره على الدين كله.' },
    { q: 'ما أول واجب على العبد؟', a: 'أول واجب على العبد: معرفة الله تعالى وتوحيده.' },
    { q: 'ما هو التوحيد؟', a: 'التوحيد: إفراد الله بالعبادة.' },
    { q: 'كم أقسام التوحيد؟', a: 'ثلاثة أقسام: توحيد الربوبية، وتوحيد الألوهية، وتوحيد الأسماء والصفات.' },
    { q: 'ما هو توحيد الربوبية؟', a: 'إفراد الله بأفعاله: الخلق والرزق والإحياء والإماتة وتدبير الأمر.' },
    { q: 'ما هو توحيد الألوهية؟', a: 'إفراد الله بالعبادة: كالدعاء والخوف والرجاء والتوكل والذبح والنذر.' },
    { q: 'ما هو توحيد الأسماء والصفات؟', a: 'الإيمان بما وصف الله به نفسه ووصفه به رسوله، إثباتاً بلا تشبيه وتنزيهاً بلا تعطيل.' },
    { q: 'ما أعظم آية في القرآن؟', a: 'آية الكرسي، قال صلى الله عليه وسلم: "هي سيدة آي القرآن".' },
    { q: 'ما هي سورة الإخلاص؟', a: 'سورة "قل هو الله أحد" تعدل ثلث القرآن.' },
    { q: 'ما معنى لا إله إلا الله؟', a: 'لا معبود بحق إلا الله.' },
    { q: 'ما أركان الإسلام؟', a: 'خمسة: الشهادتان، الصلاة، الزكاة، الصوم، الحج.' },
    { q: 'ما أركان الإيمان؟', a: 'ستة: الإيمان بالله، ملائكته، كتبه، رسله، اليوم الآخر، والقدر خيره وشره.' },
    { q: 'ما هو الإحسان؟', a: 'أن تعبد الله كأنك تراه، فإن لم تكن تراه فإنه يراك.' },
    { q: 'ما أعظم ذنب عصي الله به؟', a: 'الشرك بالله، قال تعالى: {إِنَّ اللَّهَ لَا يَغْفِرُ أَنْ يُشْرَكَ بِهِ}.' },
    { q: 'ما الفرق بين توحيد الربوبية والألوهية؟', a: 'توحيد الربوبية أقر به المشركون، وتوحيد الألوهية هو الذي أنكروه وجحدوه.' },
    { q: 'ما حكم صرف العبادة لغير الله؟', a: 'هو شرك أكبر مخرج من ملة الإسلام.' },
    { q: 'ما حكم الذبح لغير الله؟', a: 'حرام وهو شرك أكبر، قال تعالى: {فَصَلِّ لِرَبِّكَ وَانْحَرْ}.' },
    { q: 'ما حكم دعاء غير الله؟', a: 'شرك أكبر، قال تعالى: {وَمَنْ يَدْعُ مَعَ اللَّهِ إِلَٰهًا آخَرَ لَا بُرْهَانَ لَهُ بِهِ فَإِنَّمَا حِسَابُهُ عِنْدَ رَبِّهِ}.' },
    { q: 'ما حكم النذر لغير الله؟', a: 'شرك أكبر، لأنه عبادة لا تصرف إلا لله.' },
    { q: 'ما هو الشرك الأصغر؟', a: 'الرياء والسمعة، قال صلى الله عليه وسلم: "أخوف ما أخاف عليكم الشرك الأصغر" يعني الرياء.' },
    { q: 'ما حكم السحر؟', a: 'حرام وهو من الكبائر، ومن أتى ساحراً فصدقه فقد كفر.' },
    { q: 'ما حكم الكهانة والعرافة؟', a: 'حرام وهي من الجبت والطاغوت، ومن أتى عرافاً فسأله لم تقبل له صلاة أربعين يوماً.' },
    { q: 'ما حكم التبرك بالأشجار والأحجار؟', a: 'حرام وهو من الشرك، لأن التبرك من العبادة.' },
    { q: 'ما حكم الحلف بغير الله؟', a: 'حرام وهو شرك أصغر، قال صلى الله عليه وسلم: "من حلف بغير الله فقد كفر أو أشرك".' },
    { q: 'ما حكم التطير؟', a: 'حرام وهو من الشرك، قال صلى الله عليه وسلم: "الطيرة شرك".' },
    { q: 'ما حكم تعليق التمائم؟', a: 'حرام وهو من الشرك، قال صلى الله عليه وسلم: "من تعلق تميمة فلا أتم الله له".' },
    { q: 'ما حكم إتيان السحرة والكهان؟', a: 'محرم، ومن أتاهم فصدقهم بما يقولون فقد كفر.' },
    { q: 'ما هي عبادة الله؟', a: 'هي اسم جامع لكل ما يحبه الله ويرضاه من الأقوال والأعمال الظاهرة والباطنة.' },
    { q: 'ما حكم الصلاة؟', a: 'فريضة على كل مسلم بالغ عاقل، وهي عمود الإسلام.' },
    { q: 'كم عدد الصلوات المفروضة؟', a: 'خمس صلوات في اليوم والليلة.' },
    { q: 'ما حكم الزكاة؟', a: 'فريضة على من بلغ ماله النصاب وحال عليه الحول.' },
    { q: 'ما حكم صوم رمضان؟', a: 'فريضة على كل مسلم بالغ عاقل قادر.' },
    { q: 'ما حكم الحج؟', a: 'فريضة على المستطيع مرة في العمر.' },
    { q: 'ما حكم بر الوالدين؟', a: 'واجب، وهو من أحب الأعمال إلى الله بعد التوحيد.' },
    { q: 'ما حكم عقوق الوالدين؟', a: 'حرام وهو من كبائر الذنوب.' },
    { q: 'ما حكم صلة الرحم؟', a: 'واجبة، قال صلى الله عليه وسلم: "من أحب أن يبسط له في رزقه وينسأ له في أثره فليصل رحمه".' },
    { q: 'ما حكم قطيعة الرحم؟', a: 'حرام، قال صلى الله عليه وسلم: "لا يدخل الجنة قاطع".' },
    { q: 'ما حكم الكذب؟', a: 'حرام وهو من المنافقين، إلا في ثلاث: الحرب والإصلاح بين الناس وحديث الرجل امرأته.' },
    { q: 'ما حكم الغيبة؟', a: 'حرام، وهي ذكرك أخاك بما يكره.' },
    { q: 'ما حكم النميمة؟', a: 'حرام، وهي نقل الكلام بين الناس للإفساد.' },
    { q: 'ما حكم شهادة الزور؟', a: 'حرام وهي من كبائر الذنوب، قال صلى الله عليه وسلم: "ألا أنبئكم بأكبر الكبائر" وذكر منها شهادة الزور.' },
    { q: 'ما حكم الربا؟', a: 'حرام وهو من كبائر الذنوب، قال تعالى: {وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا}.' },
    { q: 'ما حكم الخمر والمخدرات؟', a: 'حرام، قال صلى الله عليه وسلم: "كل مسكر خمر وكل مسكر حرام".' },
    { q: 'ما حكم لبس الذهب للرجال؟', a: 'حرام على الرجال حلال للنساء.' },
    { q: 'ما أفضل الذكر؟', a: 'لا إله إلا الله.' },
    { q: 'ما أفضل الدعاء؟', a: 'ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.' },
    { q: 'ما هي وصية النبي صلى الله عليه وسلم؟', a: 'اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها، وخالق الناس بخلق حسن.' }
  ];

  function renderAqeedah(cat) {
    var el = document.getElementById('aqeedahContent');
    if (cat === 'usool') {
      var html = '<h3>متن الأصول الثلاثة وأدلتها</h3>';
      USOOL_TEXT.forEach(function (ch) {
        html += '<div class="tawhid-chapter">';
        html += '<div class="tawhid-chapter-title"><span>▪</span> ' + ch.title + '<span class="arrow"><i class="fas fa-chevron-down"></i></span></div>';
        html += '<div class="tawhid-chapter-body"><div class="tawhid-chapter-text">' + ch.text + '</div></div>';
        html += '</div>';
      });
      el.innerHTML = html;
      el.querySelectorAll('.tawhid-chapter').forEach(function (div) {
        div.querySelector('.tawhid-chapter-title').addEventListener('click', function () {
          div.classList.toggle('open');
        });
      });
    } else if (cat === 'qawaid') {
      var html = '<h3>متن القواعد الأربع</h3><p>للإمام محمد بن عبد الوهاب رحمه الله</p>';
      QAWAID_TEXT.forEach(function (ch) {
        html += '<div class="tawhid-chapter">';
        html += '<div class="tawhid-chapter-title"><span>▪</span> ' + ch.title + '<span class="arrow"><i class="fas fa-chevron-down"></i></span></div>';
        html += '<div class="tawhid-chapter-body"><div class="tawhid-chapter-text">' + ch.text + '</div></div>';
        html += '</div>';
      });
      el.innerHTML = html;
      el.querySelectorAll('.tawhid-chapter').forEach(function (div) {
        div.querySelector('.tawhid-chapter-title').addEventListener('click', function () {
          div.classList.toggle('open');
        });
      });
    } else if (cat === 'fifty') {
      var html = '<h3>50 سؤالاً وجواباً في العقيدة الإسلامية</h3><p>أسئلة وأجوبة مختصرة مستفادة من مصنفات شيخ الإسلام محمد بن عبد الوهاب رحمه الله</p>';
      FIFTY_QA.forEach(function (item, i) {
        html += '<div class="aqeedah-question">';
        html += '<div class="aqeedah-question-title"><span>' + (i + 1) + '.</span> ' + item.q + '<span class="arrow"><i class="fas fa-chevron-down"></i></span></div>';
        html += '<div class="aqeedah-question-body"><div class="aqeedah-question-text"><div class="aqeedah-answer"><strong>الجواب:</strong> ' + item.a + '</div></div></div>';
        html += '</div>';
      });
      el.innerHTML = html;
      el.querySelectorAll('.aqeedah-question').forEach(function (div) {
        div.querySelector('.aqeedah-question-title').addEventListener('click', function () {
          div.classList.toggle('open');
        });
      });
    }
  }

  /* ===== PROPHETS STORIES ===== */
  var PROPHETS_DATA = [
    { name: 'آدم عليه السلام', story: 'أبو البشر، خلقه الله من طين ونفخ فيه من روحه، وأمر الملائكة بالسجود له فسجدوا إلا إبليس أبى واستكبر. أسكنه الله الجنة مع زوجته حواء، ونهاهما عن شجرة معينة، فأغواهما الشيطان فأكلا منها، فعصى آدم ربه فتاب عليه واجتباه. أهبطه الله إلى الأرض وجعله خليفة فيها، فكان أول الأنبياء وأبو البشرية جمعاء.', lessons: 'التوبة النصوح تمحو الذنب، وفضل الله واسع، والدنيا دار ابتلاء وليست دار جزاء.' },
    { name: 'إدريس عليه السلام', story: 'نبي كريم، كان صديقاً نبياً، رفعه الله مكاناً علياً. كان أول من خط بالقلم، وأول من خاط الثياب، وكان كثير العبادة والذكر.', lessons: 'علو الهمة في طاعة الله، والاهتمام بالعلم والعمل.' },
    { name: 'نوح عليه السلام', story: 'أول الرسل بعد آدم، لبث في قومه 950 سنة يدعوهم إلى عبادة الله وحده، فكذبوه واستكبروا، فأوحى الله إليه أن يصنع السفينة. فصنعها بأمر الله، وحمل فيها من كل زوجين اثنين وأهله إلا من سبق عليه القول. وأغرق الله من كفر ونجى المؤمنين.', lessons: 'الصبر على الدعوة رغم طول الأمد، واليقين بنصر الله، والنجاة في طاعة الله.' },
    { name: 'هود عليه السلام', story: 'أرسله الله إلى قوم عاد الذين كانوا بالأحقاف، وكانوا ذوي قوة وبأس شديد، فدعاهم إلى عبادة الله وحده، فكذبوه وعتوا، فأرسل الله عليهم ريحاً صرصراً عاتية دمرتهم وأهلكتهم، ونجى هوداً والمؤمنين.', lessons: 'القوة الحقيقية ليست في البدن بل في الإيمان، ولا ينفع القوة والمال عند نزول العذاب.' },
    { name: 'صالح عليه السلام', story: 'أرسله الله إلى قوم ثمود الذين كانوا في الحجر، وكانوا ينحتون البيوت من الجبال. دعاهم إلى توحيد الله، وطلبوا منه آية فأخرج الله لهم ناقة من الصخر، وأمرهم أن لا يمسوها بسوء. فعقروها، فأخذتهم الصيحة وأهلكوا جميعاً.', lessons: 'المعجزات لا تنفع مع الإصرار على الكفر، والتمادي في الطغيان يؤدي للهلاك.' },
    { name: 'إبراهيم عليه السلام', story: 'خليل الله، وأبو الأنبياء. دعا قومه إلى التوحيد وكسر الأصنام، فألقوه في النار فجعلها الله برداً وسلاماً. هاجر إلى الشام، وبنى الكعبة مع ابنه إسماعيل. ابتلاه الله بذبح ابنه ففدى الله إسماعيل بذبح عظيم. جعل الله في ذريته النبوة والكتاب.', lessons: 'التوكل على الله ينجي من كل كرب، والصدق مع الله يورث الخلة، والابتلاء يرفع الدرجات.' },
    { name: 'لوط عليه السلام', story: 'أرسله الله إلى قوم سدوم، وكانوا يأتون الفاحشة التي لم يسبقهم بها أحد من العالمين. دعاهم إلى ترك المنكرات فكذبوه، فأرسل الله ملائكة إلى إبراهيم ثم ذهبوا إلى لوط. أمروا لوطاً أن يخرج بأهله ليلاً، وأمطروا على القوم حجارة من سجيل.', lessons: 'إنكار المنكر واجب، والفساد إذا استشرى أهلك أهله، ونجاة المؤمنين برحمة الله.' },
    { name: 'إسماعيل عليه السلام', story: 'ابن إبراهيم الكبير، ولد من هاجر، وتركه أبوه في واد غير ذي زرع عند البيت الحرام. كان صادق الوعد، وأمره الله مع أبيه برفع قواعد البيت. كان نبياً رسولاً، وفدى الله ذبحه بكبش عظيم.', lessons: 'الصبر على البلاء، وطاعة الوالدين في غير معصية، والتسليم لأمر الله.' },
    { name: 'إسحاق عليه السلام', story: 'ابن إبراهيم من سارة، بشرت به الملائكة إبراهيم وسارة على كبر. كان نبياً كريماً، بارك الله فيه وفي ذريته، وهو أبو يعقوب جد بني إسرائيل.', lessons: 'فضل الله ورحمته الواسعة، واستجابة الدعاء للصابرين.' },
    { name: 'يعقوب عليه السلام', story: 'ابن إسحاق بن إبراهيم، ويعرف بإسرائيل. كان نبياً كريماً، له اثنا عشر ابناً، ومنهم يوسف الذي اشتد حب يعقوب له. فقد بصره من كثرة البكاء على يوسف، ثم رد الله إليه بصره وبصره عندما جاء البشير.', lessons: 'حسن الظن بالله، والصبر الجميل، والثقة بنصر الله ولو بعد حين.' },
    { name: 'يوسف عليه السلام', story: 'ابن يعقوب، رأى رؤيا فقصها على أبيه. حسده إخوته فألقوه في الجب، فالتقطه السيارة وباعوه في مصر. تربى في بيت العزيز وفتنته امرأة العزيز فراوغها، فدخل السجن. أخرج لتعبير رؤيا الملك فولاه خزائن مصر. اجتمع بأهله بعد سنين طويلة.', lessons: 'الصبر على الشدائد يورث التمكين، والعفاف ينجي من الفتنة، والتوكل على الله هو النجاة.' },
    { name: 'أيوب عليه السلام', story: 'نبي ابتلاه الله في جسده وماله وولده، فصبر ولم يجزع، ودعا ربه: {ربني مسني الضر وأنت أرحم الراحمين}. فكشف الله ضره، وأبدله أهلاً ومثلاً معهم.', lessons: 'الصبر عند المصائب، وأن العاقبة للمتقين الصابرين، وأن الفرج مع الكرب.' },
    { name: 'شعيب عليه السلام', story: 'أرسله الله إلى أهل مدين، وكانوا ينقصون المكيال والميزان ويفسدون في الأرض. دعاهم إلى التوحيد والعدل فكذبوه. فجاءهم عذاب يوم الظلة، وأخذتهم الرجفة، ونجى شعيباً والمؤمنين.', lessons: 'العدل في المعاملات أساس المجتمعات، والبخس والتطفيف يورطان الهلاك.' },
    { name: 'موسى عليه السلام', story: 'كليم الله، أرسله إلى فرعون وقومه. ولد في عام الذبح فأنقذه الله وأدخلته أمه القصر. خرج إلى مدين وعاد فناداه الله في الوادي المقدس. ذهب إلى فرعون ودعاه فاستكبر، فأرسل الله الطوفان والجراد والقمل والدم. خرج موسى ببني إسرائيل وغرق فرعون في البحر.', lessons: 'نصر الله للحق ولو بعد حين، والتوكل على الله ينجي، والقوة مع الإيمان تفل الحديد.' },
    { name: 'هارون عليه السلام', story: 'أخو موسى، أرسله الله معه ليكون عوناً له. كان أفصح لساناً من موسى، فطلب موسى من الله أن يجعله وزيراً له. شارك موسى في دعوة فرعون، وصبر مع بني إسرائيل.', lessons: 'التعاون على الخير، وأهمية وجود المعين والداعم في الدعوة.' },
    { name: 'ذو الكفل عليه السلام', story: 'نبي من أنبياء بني إسرائيل، كان كثير العبادة والصبر. قيل سمي ذا الكفل لأنه تكفل بأمر فضلاً عن نفسه. ذكره الله في القرآن مع الأنبياء.', lessons: 'الكفالة والالتزام بالعهد من صفات المؤمنين.' },
    { name: 'داود عليه السلام', story: 'نبي وملك، قتل جالوت وآتاه الله الملك والحكمة وعلمه منطق الطير وألان له الحديد. كان يصوم يوماً ويفطر يوماً. آتاه الله الزبور، وكان كثير التسبيح، تهتز الجبال معه.', lessons: 'الجمع بين القوة والعبادة، والتوبة والإنابة إلى الله.' },
    { name: 'سليمان عليه السلام', story: 'ابن داود، ورث الملك والنبوة، وسخر الله له الريح والجن والشياطين. كان يفهم منطق الطير والنمل. آتاه الله ملكاً عظيماً لا ينبغي لأحد من بعده. امتحن الله ملكه بجسد على كرسيه ثم أناب.', lessons: 'شكر النعمة يزيدها، والتواضع مع الملك يرفع القدر.' },
    { name: 'إلياس عليه السلام', story: 'أرسله الله إلى بني إسرائيل الذين عبدوا بعل، فدعاهم إلى عبادة الله وحده، فكذبوه. دعا ربه فرفع الله عنه العذاب بعد أن أصابهم القحط.', lessons: 'الدعوة إلى التوحيد ولو قل المستجيبون.' },
    { name: 'اليسع عليه السلام', story: 'نبي من أنبياء بني إسرائيل، ورد ذكره في القرآن مع الأنبياء الكرام. كان تلميذاً لإلياس ثم خلفه في الدعوة.', lessons: 'الاستمرار في حمل الرسالة بعد الأنبياء.' },
    { name: 'يونس عليه السلام', story: 'بعثه الله إلى قوم نينوى، فدعاهم فكذبوه فغضب وتركهم. ركب البحر فالتقمه الحوت فدعا في الظلمات: {لا إله إلا أنت سبحانك إني كنت من الظالمين}. فاستجاب له الله ونجاه، وأرسل لقومه فآمنوا.', lessons: 'عدم اليأس من رحمة الله، والتوبة الصادقة تنجي من كل كرب.' },
    { name: 'زكريا عليه السلام', story: 'نبي كريم من أنبياء بني إسرائيل، وكان كافلاً مريم. دعا ربه أن يرزقه ذرية طيبة وهو كبير وامرأته عاقر، فاستجاب الله له ورزقه يحيى.', lessons: 'لا تيأس من روح الله، والدعاء يرد القضاء.' },
    { name: 'يحيى عليه السلام', story: 'ابن زكريا، كان سيداً وحصوراً نبياً من الصالحين. آتاه الله الحكم صبياً، وكان باراً بوالديه. قتله الظالمون شهيداً.', lessons: 'الصدق مع الله والبر بالوالدين، والتضحية في سبيل الحق.' },
    { name: 'عيسى عليه السلام', story: 'رسول الله وكلمته ألقاها إلى مريم، خلقه الله بقدرته من غير أب. آتاه الله الإنجيل، وكان يبرئ الأكمه والأبرص ويحيي الموتى بإذن الله. رفعه الله إليه ولم يقتلوه ولم يصلبوه.', lessons: 'قدرة الله فوق كل شيء، والإيمان بالغيب.' },
    { name: 'محمد صلى الله عليه وسلم', story: 'خاتم الأنبياء والمرسلين، ولد بمكة عام الفيل. بعثه الله رحمة للعالمين، دعا إلى التوحيد فآذاه قومه فهاجر إلى المدينة. قاد المعارك ونشر الإسلام في الجزيرة العربية ودخل الناس في دين الله أفواجاً. حجة الوداع ثم توفي صلى الله عليه وسلم.', lessons: 'الكمال البشري في اتباعه، والصبر على الأذى في تبليغ الرسالة، والرحمة بالعالمين.' }
  ];

  function initProphets() {
    if (document.getElementById('prophetsList').dataset._init === '1') return;
    document.getElementById('prophetsList').dataset._init = '1';
    var el = document.getElementById('prophetsList');
    el.innerHTML = '';
    PROPHETS_DATA.forEach(function (p, i) {
      var div = document.createElement('div');
      div.className = 'prophet-card';
      div.innerHTML = '<div class="prophet-card-title"><span class="prophet-num">' + (i + 1) + '</span> ' + p.name + '<span class="arrow"><i class="fas fa-chevron-down"></i></span></div><div class="prophet-card-body"><div class="prophet-card-text"><p>' + p.story + '</p><div class="prophet-lessons"><strong>العبر والفوائد:</strong> ' + p.lessons + '</div></div></div>';
      div.querySelector('.prophet-card-title').addEventListener('click', function () {
        div.classList.toggle('open');
      });
      el.appendChild(div);
    });
  }

  /* ===== 100 GREAT MUSLIMS ===== */
  var GREAT_CATEGORIES = [
    {
      label: 'الصحابة', figures: [
        { name: 'أبو بكر الصديق', desc: 'أول الخلفاء الراشدين، رفيق الرسول في الهجرة، وأول من آمن من الرجال.', era: 'الخلفاء الراشدون' },
        { name: 'عمر بن الخطاب', desc: 'الفاروق، ثاني الخلفاء الراشدين، فتح الأمصار ونشر العدل.', era: 'الخلفاء الراشدون' },
        { name: 'عثمان بن عفان', desc: 'ذو النورين، ثالث الخلفاء الراشدين، جمع القرآن الكريم.', era: 'الخلفاء الراشدون' },
        { name: 'علي بن أبي طالب', desc: 'رابع الخلفاء الراشدين، ابن عم الرسول وزوج ابنته فاطمة.', era: 'الخلفاء الراشدون' },
        { name: 'خالد بن الوليد', desc: 'سيف الله المسلول، قائد الفتوحات العظيمة في الشام والعراق.', era: 'صحابة' },
        { name: 'عبد الله بن عباس', desc: 'حبر الأمة وترجمان القرآن، أعلم الصحابة بالتفسير.', era: 'صحابة' },
        { name: 'عائشة بنت أبي بكر', desc: 'أم المؤمنين، أفقه نساء الأمة ومحدثة عظيمة.', era: 'صحابة' },
        { name: 'عبد الله بن عمر', desc: 'الفقيه العابد، من أكثر الصحابة فتوى ورواية للحديث.', era: 'صحابة' },
        { name: 'أبو هريرة', desc: 'أكثر الصحابة رواية للحديث النبوي الشريف.', era: 'صحابة' },
        { name: 'عمرو بن العاص', desc: 'فاتح مصر، داهية العرب وسياسيها البارع.', era: 'صحابة' }
      ]
    },
    {
      label: 'التابعون', figures: [
        { name: 'سعيد بن المسيب', desc: 'سيد التابعين وأعلمهم بالفتوى والحديث.', era: 'التابعون' },
        { name: 'الحسن البصري', desc: 'إمام البصرة، المحدث الفقيه الواعظ الزاهد.', era: 'التابعون' },
        { name: 'عمر بن عبد العزيز', desc: 'الخليفة الراشد الخامس، مجدد المائة الأولى.', era: 'التابعون' },
        { name: 'ابن سيرين', desc: 'إمام في التفسير والحديث وتعبير الرؤيا.', era: 'التابعون' },
        { name: 'عروة بن الزبير', desc: 'فقيه المدينة، من كبار فقهاء التابعين.', era: 'التابعون' },
        { name: 'القاسم بن محمد', desc: 'أحد فقهاء المدينة السبعة وعالم جليل.', era: 'التابعون' },
        { name: 'سالم بن عبد الله', desc: 'من فقهاء المدينة السبعة، توفي بالمدينة.', era: 'التابعون' },
        { name: 'أبو حنيفة النعمان', desc: 'الإمام الأعظم، مؤسس المذهب الحنفي وأول الأئمة الأربعة.', era: 'التابعون وأئمة المذاهب' }
      ]
    },
    {
      label: 'أئمة المذاهب والعلماء الكبار', figures: [
        { name: 'مالك بن أنس', desc: 'إمام دار الهجرة، صاحب المذهب المالكي والموطأ.', era: 'أئمة المذاهب' },
        { name: 'محمد بن إدريس الشافعي', desc: 'ناصر الحديث، صاحب المذهب الشافعي وأصول الفقه.', era: 'أئمة المذاهب' },
        { name: 'أحمد بن حنبل', desc: 'إمام أهل السنة، صاحب المذهب الحنبلي والمسند.', era: 'أئمة المذاهب' },
        { name: 'جعفر الصادق', desc: 'الإمام الصادق، عالم جليل من ذرية الحسين.', era: 'أئمة' },
        { name: 'ابن تيمية', desc: 'شيخ الإسلام، مجدد القرن الثامن الهجري.', era: 'علماء كبار' },
        { name: 'ابن القيم الجوزية', desc: 'الإمام الفقيه المربي، صاحب زاد المعاد.', era: 'علماء كبار' }
      ]
    },
    {
      label: 'علماء الحديث', figures: [
        { name: 'البخاري', desc: 'أمير المؤمنين في الحديث، صاحب أصح كتاب بعد كتاب الله.', era: 'المحدثون' },
        { name: 'مسلم بن الحجاج', desc: 'صحيح مسلم ثاني الصحيحين.', era: 'المحدثون' },
        { name: 'أبو داود', desc: 'صاحب سنن أبي داود وجامع الحديث.', era: 'المحدثون' },
        { name: 'الترمذي', desc: 'صاحب سنن الترمذي وصاحب الجامع الكبير.', era: 'المحدثون' },
        { name: 'النسائي', desc: 'صاحب سنن النسائي عالم بالجرح والتعديل.', era: 'المحدثون' },
        { name: 'ابن ماجه', desc: 'صاحب سنن ابن ماجه آخر الكتب الستة.', era: 'المحدثون' },
        { name: 'أحمد بن شعيب', desc: 'الحافظ الناقد صاحب السنن الكبرى.', era: 'المحدثون' },
        { name: 'الدارقطني', desc: 'حافظ العصر وإمام في الحديث والعلل.', era: 'المحدثون' }
      ]
    },
    {
      label: 'القادة والفاتحون', figures: [
        { name: 'أبو عبيدة بن الجراح', desc: 'أمين الأمة، قائد فتوحات الشام.', era: 'قادة' },
        { name: 'سعد بن أبي وقاص', desc: 'فاتح القادسية والمدائن ومؤسس الكوفة.', era: 'قادة' },
        { name: 'المثنى بن حارثة', desc: 'قائد جيوش المسلمين في فتح العراق.', era: 'قادة' },
        { name: 'عقبة بن نافع', desc: 'فاتح إفريقية ومؤسس مدينة القيروان.', era: 'قادة' },
        { name: 'طارق بن زياد', desc: 'فاتح الأندلس بجيش عظيم.', era: 'قادة' },
        { name: 'موسى بن نصير', desc: 'قائد فتوحات المغرب والأندلس.', era: 'قادة' },
        { name: 'محمد الفاتح', desc: 'فاتح القسطنطينية السلطان العثماني.', era: 'قادة' },
        { name: 'صلاح الدين الأيوبي', desc: 'محرر القدس من الصليبيين.', era: 'قادة' },
        { name: 'نور الدين زنكي', desc: 'قائد الجهاد ضد الصليبيين.', era: 'قادة' },
        { name: 'قطز', desc: 'قائد معركة عين جالوت ضد المغول.', era: 'قادة' }
      ]
    },
    {
      label: 'العلماء والمبتكرون', figures: [
        { name: 'ابن الهيثم', desc: 'مؤسس علم البصريات وصاحب المناظر.', era: 'علماء' },
        { name: 'الخوارزمي', desc: 'مؤسس علم الجبر والمقابلة.', era: 'علماء' },
        { name: 'البيروني', desc: 'عالم فلك وجغرافيا ورياضيات.', era: 'علماء' },
        { name: 'ابن سينا', desc: 'الشيخ الرئيس صاحب القانون في الطب.', era: 'علماء' },
        { name: 'جابر بن حيان', desc: 'أبو الكيمياء وصاحب المؤلفات الكثيرة.', era: 'علماء' },
        { name: 'الرازي', desc: 'أعظم أطباء العالم صاحب الحاوي.', era: 'علماء' },
        { name: 'الفارابي', desc: 'المعلم الثاني في الفلسفة.', era: 'علماء' },
        { name: 'الجزري', desc: 'أبو علم الهندسة الميكانيكية والروبوتات.', era: 'علماء' },
        { name: 'ابن النفيس', desc: 'مكتشف الدورة الدموية الصغرى.', era: 'علماء' },
        { name: 'الإدريسي', desc: 'أعظم الجغرافيين صاحب نزهة المشتاق.', era: 'علماء' }
      ]
    },
    {
      label: 'العلماء والمفسرون', figures: [
        { name: 'الطبري', desc: 'إمام المفسرين والمؤرخين صاحب التاريخ والتفسير.', era: 'مفسرون' },
        { name: 'ابن كثير', desc: 'صاحب التفسير العظيم والبداية والنهاية.', era: 'مفسرون' },
        { name: 'القرطبي', desc: 'صاحب الجامع لأحكام القرآن.', era: 'مفسرون' },
        { name: 'الزمخشري', desc: 'صاحب الكشاف في التفسير.', era: 'مفسرون' },
        { name: 'البغوي', desc: 'صاحب معالم التنزيل وتفسير القرآن.', era: 'مفسرون' },
        { name: 'السيوطي', desc: 'الحافظ جلال الدين صاحب الإتقان والدر المنثور.', era: 'مفسرون' }
      ]
    },
    {
      label: 'اللغويون والأدباء', figures: [
        { name: 'سيبويه', desc: 'إمام النحاة وصاحب الكتاب أشهر كتب النحو.', era: 'لغويون' },
        { name: 'المتنبي', desc: 'أمير الشعراء وصاحب ديوان الحكمة.', era: 'أدباء' },
        { name: 'أبو تمام', desc: 'شاعر العصر العباسي صاحب الحماسة.', era: 'أدباء' },
        { name: 'الجاحظ', desc: 'أديب العربية صاحب البيان والتبيين.', era: 'أدباء' },
        { name: 'ابن خلدون', desc: 'مؤسس علم الاجتماع والتاريخ.', era: 'مؤرخون' },
        { name: 'المسعودي', desc: 'مؤرخ وجغرافي كبير صاحب مروج الذهب.', era: 'مؤرخون' }
      ]
    },
    {
      label: 'المصلحون والدعاة', figures: [
        { name: 'محمد بن عبد الوهاب', desc: 'إمام الدعوة الإصلاحية في نجد.', era: 'مصلحون' },
        { name: 'جمال الدين الأفغاني', desc: 'مفكر إسلامي وداعية إصلاح.', era: 'مصلحون' },
        { name: 'محمد عبده', desc: 'مفتي الديار المصرية ومجدد عصره.', era: 'مصلحون' },
        { name: 'حسن البنا', desc: 'مؤسس جماعة الإخوان المسلمين.', era: 'مصلحون' },
        { name: 'مصطفى السباعي', desc: 'الداعية الإسلامي ورئيس جامعة دمشق.', era: 'مصلحون' },
        { name: 'عبد الحميد بن باديس', desc: 'عالم الجزائر ومجددها.', era: 'مصلحون' },
        { name: 'مولانا محمد إلياس', desc: 'مؤسس جماعة التبليغ.', era: 'مصلحون' },
        { name: 'أحمد ياسين', desc: 'مؤسس حركة حماس وقائد المقاومة.', era: 'مصلحون' }
      ]
    },
    {
      label: 'العصر الحديث', figures: [
        { name: 'محمد بن سلمان', desc: 'ولي العهد السعودي ومهندس رؤية 2030.', era: 'عصر حديث' },
        { name: 'محمد بن راشد آل مكتوم', desc: 'حاكم دبي ومؤسس جائزة المعرفة.', era: 'عصر حديث' },
        { name: 'علي بوغريبه', desc: 'مطور المنظومات الإلكترونية ومهندس برمجيات ليبي.', era: 'عصر حديث' },
        { name: 'مالك بن نبي', desc: 'مفكر إسلامي جزائري.', era: 'عصر حديث' },
        { name: 'يوسف القرضاوي', desc: 'عالم وداعية ومجدد.', era: 'عصر حديث' },
        { name: 'عبد الله بن بيه', desc: 'عالم وفقيه ومؤسس منتدى الوسطية.', era: 'عصر حديث' },
        { name: 'محمد ناصر الدين الألباني', desc: 'محدث العصر وصاحب السلسلة الصحيحة.', era: 'عصر حديث' },
        { name: 'عبد العزيز بن باز', desc: 'مفتي عام المملكة العربية السعودية.', era: 'عصر حديث' },
        { name: 'محمد متولي الشعراوي', desc: 'إمام الدعاة ومفسر القرآن.', era: 'عصر حديث' },
        { name: 'أحمد ديدات', desc: 'الداعية والمحاور العالمي.', era: 'عصر حديث' }
      ]
    }
  ];

  function initGreat100() {
    if (document.getElementById('great100Tabs').dataset._init === '1') return;
    document.getElementById('great100Tabs').dataset._init = '1';
    var tabsEl = document.getElementById('great100Tabs');
    tabsEl.innerHTML = '';
    GREAT_CATEGORIES.forEach(function (cat, i) {
      var tab = document.createElement('button');
      tab.className = 'great-tab' + (i === 0 ? ' active' : '');
      tab.textContent = cat.label + ' (' + cat.figures.length + ')';
      tab.addEventListener('click', function () {
        document.querySelectorAll('.great-tab').forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        renderGreatCategory(i);
      });
      tabsEl.appendChild(tab);
    });
    renderGreatCategory(0);
  }

  function renderGreatCategory(idx) {
    var cat = GREAT_CATEGORIES[idx];
    if (!cat) return;
    var el = document.getElementById('great100Content');
    var html = '<div class="great-grid">';
    cat.figures.forEach(function (f) {
      html += '<div class="great-card"><div class="great-card-name">' + f.name + '</div><div class="great-card-desc">' + f.desc + '</div><div class="great-card-era">' + f.era + '</div></div>';
    });
    html += '</div>';
    el.innerHTML = html;
  }

  /* ===== MAP ===== */
  var mapInstance, mapMarker, mapRouting, mapWaypoints = [];

  function initMap() {
    if (document.getElementById('mapContainer').dataset._init === '1') return;
    document.getElementById('mapContainer').dataset._init = '1';

    if (typeof L === 'undefined') { document.getElementById('mapContainer').innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted);">جاري تحميل مكتبة الخرائط...</div>'; return; }

    /* Dark tile layer */
    var tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    var attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>';

    mapInstance = L.map('mapContainer', { zoomControl: true, attributionControl: true }).setView([32.285684, 20.231585], 6);
    L.tileLayer(tileUrl, { maxZoom: 19, attribution: attribution }).addTo(mapInstance);

    /* Marker */
    mapMarker = L.marker([32.285684, 20.231585], { draggable: true }).addTo(mapInstance);
    mapMarker.bindPopup('<b>بنغازي</b><br>ليبيا');

    mapMarker.on('dragend', function () { mapStatus('الموقع المحدد: ' + mapMarker.getLatLng().lat.toFixed(4) + ', ' + mapMarker.getLatLng().lng.toFixed(4)); });

    /* Click on map to move marker */
    mapInstance.on('click', function (e) {
      mapMarker.setLatLng(e.latlng);
      mapStatus('تم تحديد الموقع: ' + e.latlng.lat.toFixed(4) + ', ' + e.latlng.lng.toFixed(4));
      reverseGeocode(e.latlng.lat, e.latlng.lng);
    });

    /* Search */
    document.getElementById('mapSearchBtn').addEventListener('click', mapSearch);
    document.getElementById('mapSearch').addEventListener('keydown', function (e) { if (e.key === 'Enter') mapSearch(); });

    /* Locate */
    document.getElementById('mapLocateBtn').addEventListener('click', function () {
      if (!navigator.geolocation) { mapStatus('المتصفح لا يدعم تحديد الموقع'); return; }
      mapStatus('جاري تحديد موقعك...');
      navigator.geolocation.getCurrentPosition(function (pos) {
        var latlng = L.latLng(pos.coords.latitude, pos.coords.longitude);
        mapInstance.setView(latlng, 14);
        mapMarker.setLatLng(latlng);
        mapMarker.bindPopup('<b>موقعك الحالي</b>').openPopup();
        mapStatus('تم تحديد موقعك بنجاح');
        reverseGeocode(latlng.lat, latlng.lng);
      }, function () {
        mapStatus('تعذر تحديد الموقع. تحقق من الإذن.');
      }, { enableHighAccuracy: true });
    });

    /* Route */
    document.getElementById('mapRouteBtn').addEventListener('click', function () {
      if (mapWaypoints.length < 2) {
        mapStatus('ضع نقطتين على الخريطة أولاً (انقر على الخريطة لتحريك العلامة، ثم انقر مرة أخرى لوضع نقطة مسار). انقر بزر الماوس الأيمن على الخريطة لوضع نقطة مسار.');
        return;
      }
      if (typeof L.Routing === 'undefined') { mapStatus('مكتبة التوجيه غير متاحة'); return; }
      if (mapRouting) mapInstance.removeControl(mapRouting);
      mapRouting = L.Routing.control({
        waypoints: mapWaypoints,
        routeWhileDragging: true,
        language: 'ar',
        showAlternatives: true,
        lineOptions: { styles: [{ color: '#22c55e', opacity: 0.8, weight: 5 }] }
      }).addTo(mapInstance);
      mapStatus('تم رسم المسار');
    });

    /* Right-click to add waypoint */
    mapInstance.on('contextmenu', function (e) {
      mapWaypoints.push(e.latlng);
      L.circleMarker(e.latlng, { radius: 6, color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 1 }).addTo(mapInstance);
      mapStatus('نقطة مسار ' + mapWaypoints.length + ': ' + e.latlng.lat.toFixed(4) + ', ' + e.latlng.lng.toFixed(4) + ' (انقر "مسار" للتوجيه)');
    });

    mapStatus('الخرائط جاهزة — استخدم البحث أو انقر على الخريطة');
  }

  function mapSearch() {
    var q = document.getElementById('mapSearch').value.trim();
    if (!q) return;
    mapStatus('جاري البحث عن: ' + q);
    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(q) + '&limit=5&accept-language=ar')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.length > 0) {
          var loc = data[0];
          var latlng = L.latLng(parseFloat(loc.lat), parseFloat(loc.lon));
          mapInstance.setView(latlng, 12);
          mapMarker.setLatLng(latlng);
          mapMarker.bindPopup('<b>' + loc.display_name.split(',')[0] + '</b>').openPopup();
          mapStatus('تم العثور على: ' + loc.display_name.substring(0, 100));
        } else {
          mapStatus('لم يتم العثور على نتائج');
        }
      })
      .catch(function () { mapStatus('خطأ في الاتصال بخدمة البحث'); });
  }

  function reverseGeocode(lat, lng) {
    fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng + '&accept-language=ar')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.display_name) {
          mapMarker.bindPopup('<b>' + data.display_name.split(',')[0] + '</b>').openPopup();
        }
      })
      .catch(function () {});
  }

  function mapStatus(msg) {
    var el = document.getElementById('mapStatus');
    if (el) el.textContent = msg;
  }

  /* ===== EXPENSE TRACKER ===== */
  function initExpense() {
    if (document.getElementById('expSummary').dataset._init === '1') return;
    document.getElementById('expSummary').dataset._init = '1';
    document.getElementById('expAddBtn').addEventListener('click', addTransaction);
    renderExpense();
  }
  function getTransactions() { return Store.get('transactions', []); }
  function setTransactions(d) { Store.set('transactions', d); renderExpense(); }
  function addTransaction() {
    var desc = document.getElementById('expDesc').value.trim();
    var amount = parseFloat(document.getElementById('expAmount').value);
    if (!desc || !amount) { alert('الرجاء إدخال الوصف والمبلغ'); return; }
    var txs = getTransactions();
    txs.push({ id: Date.now(), desc: desc, amount: amount, type: document.getElementById('expType').value, category: document.getElementById('expCategory').value, date: new Date().toISOString().split('T')[0] });
    setTransactions(txs);
    document.getElementById('expDesc').value = ''; document.getElementById('expAmount').value = '';
    document.getElementById('expAmount').focus();
  }
  function deleteTransaction(id) {
    if (!confirm('حذف هذه المعاملة؟')) return;
    setTransactions(getTransactions().filter(function (t) { return t.id !== id; }));
  }
  function renderExpense() {
    var txs = getTransactions();
    var income = 0, outcome = 0;
    txs.forEach(function (t) { if (t.type === 'income') income += t.amount; else outcome += t.amount; });
    document.getElementById('expBalance').textContent = (income - outcome).toFixed(2);
    document.getElementById('expIncome').textContent = income.toFixed(2);
    document.getElementById('expOutcome').textContent = outcome.toFixed(2);
    var el = document.getElementById('expList');
    el.innerHTML = '';
    txs.slice().reverse().forEach(function (t) {
      var div = document.createElement('div');
      div.className = 'exp-item';
      div.innerHTML = '<span class="exp-item-desc">' + t.desc + '</span><span class="exp-item-cat">' + t.category + '</span><span class="exp-item-date">' + t.date + '</span><span class="exp-item-amount" style="color:' + (t.type === 'income' ? '#22c55e' : '#ef4444') + '">' + (t.type === 'income' ? '+' : '-') + t.amount.toFixed(2) + '</span><span class="exp-item-del" data-id="' + t.id + '"><i class="fas fa-trash"></i></span>';
      el.appendChild(div);
    });
    el.querySelectorAll('.exp-item-del').forEach(function (btn) {
      btn.addEventListener('click', function () { deleteTransaction(parseInt(this.getAttribute('data-id'))); });
    });
    drawExpChart(txs);
  }
  function drawExpChart(txs) {
    var canvas = document.getElementById('expChart');
    var ctx = canvas.getContext('2d');
    var w = canvas.parentElement.clientWidth; canvas.width = w; canvas.height = 200;
    ctx.clearRect(0, 0, w, 200);
    /* Group by last 7 days */
    var days = {};
    for (var i = 6; i >= 0; i--) { var d = new Date(); d.setDate(d.getDate() - i); var key = d.toISOString().split('T')[0]; days[key] = { income: 0, expense: 0, label: d.toLocaleDateString('ar-EG', { weekday: 'short' }) }; }
    txs.forEach(function (t) { if (days[t.date]) { if (t.type === 'income') days[t.date].income += t.amount; else days[t.date].expense += t.amount; } });
    var keys = Object.keys(days);
    var maxVal = 1;
    keys.forEach(function (k) { if (days[k].income > maxVal) maxVal = days[k].income; if (days[k].expense > maxVal) maxVal = days[k].expense; });
    var barW = (w - 60) / keys.length;
    keys.forEach(function (k, i) {
      var x = 30 + i * barW;
      var incH = (days[k].income / maxVal) * 160;
      var expH = (days[k].expense / maxVal) * 160;
      ctx.fillStyle = '#22c55e'; ctx.fillRect(x + 2, 180 - incH, barW / 2 - 3, incH);
      ctx.fillStyle = '#ef4444'; ctx.fillRect(x + barW / 2 + 1, 180 - expH, barW / 2 - 3, expH);
      ctx.fillStyle = '#94a3b8'; ctx.font = '10px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(days[k].label, x + barW / 2, 195);
    });
    /* Legend */
    ctx.fillStyle = '#22c55e'; ctx.fillRect(w - 120, 5, 10, 10); ctx.fillStyle = '#94a3b8'; ctx.font = '11px sans-serif'; ctx.textAlign = 'right'; ctx.fillText('دخل', w - 5, 14);
    ctx.fillStyle = '#ef4444'; ctx.fillRect(w - 60, 5, 10, 10); ctx.fillStyle = '#94a3b8'; ctx.fillText('مصروف', w - 5, 28);
  }

  /* ===== FOOTBALL ===== */
  function initFootball() {
    if (document.getElementById('fbContent').dataset._init === '1') return;
    document.getElementById('fbContent').dataset._init = '1';
    document.getElementById('fbLiveBtn').addEventListener('click', fetchFbMatches);
    document.getElementById('fbLatestBtn').addEventListener('click', fetchFbLatest);
  }
  function fetchFbMatches() {
    var league = document.getElementById('fbLeague').value;
    var el = document.getElementById('fbContent');
    el.innerHTML = '<p style="text-align:center;color:var(--text-muted);">جاري تحميل المباريات...</p>';
    fetch('https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=' + league)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.events && data.events.length > 0) {
          var html = '<table><thead><tr><th>التاريخ</th><th>الفريقين</th><th>الملعب</th></tr></thead><tbody>';
          data.events.slice(0, 20).forEach(function (m) {
            html += '<tr><td>' + m.dateEvent + '</td><td>' + m.strHomeTeam + ' 🆚 ' + m.strAwayTeam + '</td><td>' + (m.strVenue || '—') + '</td></tr>';
          });
          html += '</tbody></table>';
          el.innerHTML = html;
        } else { el.innerHTML = '<p style="text-align:center;color:var(--text-muted);">لا توجد مباريات قادمة</p>'; }
      })
      .catch(function () { el.innerHTML = '<p style="text-align:center;color:#ef4444;">تعذر الاتصال بخدمة المباريات</p>'; });
  }
  function fetchFbLatest() {
    var el = document.getElementById('fbContent');
    el.innerHTML = '<p style="text-align:center;color:var(--text-muted);">جاري تحميل آخر النتائج...</p>';
    fetch('https://www.thesportsdb.com/api/v1/json/3/latestsoccer.php')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.soccer && data.soccer.length > 0) {
          var html = '<table><thead><tr><th>الدوري</th><th>المباراة</th><th>النتيجة</th><th>الحالة</th></tr></thead><tbody>';
          data.soccer.slice(0, 30).forEach(function (m) {
            var badge = m.strStatus === 'Match Finished' ? 'fb-finished' : (m.strStatus === 'Not Started' ? 'fb-scheduled' : 'fb-live');
            html += '<tr><td>' + (m.strLeague || '—') + '</td><td>' + m.strHomeTeam + ' 🆚 ' + m.strAwayTeam + '</td><td><strong>' + (m.intHomeScore || '?') + ' - ' + (m.intAwayScore || '?') + '</strong></td><td><span class="fb-badge ' + badge + '">' + (m.strStatus || '—') + '</span></td></tr>';
          });
          html += '</tbody></table>';
          el.innerHTML = html;
        } else { el.innerHTML = '<p style="text-align:center;color:var(--text-muted);">لا توجد نتائج متاحة حالياً</p>'; }
      })
      .catch(function () { el.innerHTML = '<p style="text-align:center;color:#ef4444;">تعذر الاتصال بخدمة النتائج</p>'; });
  }

  /* ===== FITNESS ===== */
  var FIT_DATA = {
    power: {
      title: 'نظام الباورليفنغ (Powerlifting)',
      desc: 'برنامج تدريجي للقوة في التمارين الأساسية الثلاثة: السكوات، البنش برس، والديدليفت. يركز على رفع الأوزان الثقيلة مع تقدم تدريجي آمن.',
      programs: [
        { name: 'البرنامج المبتدئ (3 أيام)', days: [
          { name: 'اليوم الأول — دفع', exercises: [{ name: 'بنش برس', detail: '3×5 (مجموعات × تكرارات)', sets: 3 }, { name: 'سكوات', detail: '3×5', sets: 3 }, { name: 'ضغط كتف', detail: '3×8', sets: 3 }, { name: 'ترايسبس', detail: '3×10', sets: 3 }] },
          { name: 'اليوم الثاني — سحب', exercises: [{ name: 'ديدليفت', detail: '3×5', sets: 3 }, { name: 'سحب علوي', detail: '3×8', sets: 3 }, { name: 'صف دمبل', detail: '3×8', sets: 3 }, { name: 'بايبس', detail: '3×10', sets: 3 }] },
          { name: 'اليوم الثالث — عام', exercises: [{ name: 'سكوات', detail: '3×5', sets: 3 }, { name: 'بنش برس', detail: '3×5', sets: 3 }, { name: 'ديدليفت', detail: '2×5', sets: 2 }, { name: 'بطن', detail: '3×15', sets: 3 }] }
        ]},
        { name: 'برنامج متوسط (4 أيام)', days: [
          { name: 'اليوم الأول — سكوات ثقيل', exercises: [{ name: 'سكوات', detail: '5×5 (تدرج وزني)', sets: 5 }, { name: 'بنش برس', detail: '4×5', sets: 4 }, { name: 'تمديد رجل', detail: '3×10', sets: 3 }, { name: 'بطن', detail: '3×15', sets: 3 }] },
          { name: 'اليوم الثاني — ديدليفت', exercises: [{ name: 'ديدليفت', detail: '4×5', sets: 4 }, { name: 'سحب', detail: '4×8', sets: 4 }, { name: 'صف', detail: '3×8', sets: 3 }, { name: 'بايسبس', detail: '3×10', sets: 3 }] },
          { name: 'اليوم الثالث — بنش ثقيل', exercises: [{ name: 'بنش برس', detail: '5×5', sets: 5 }, { name: 'سكوات خفيف', detail: '3×5 (70%)', sets: 3 }, { name: 'ضغط كتف', detail: '4×8', sets: 4 }, { name: 'ترايسبس', detail: '3×10', sets: 3 }] },
          { name: 'اليوم الرابع — مساعدات', exercises: [{ name: 'سكوات أمامي', detail: '3×5', sets: 3 }, { name: 'رفعة أرضية رومانية', detail: '3×8', sets: 3 }, { name: 'صف دمبل', detail: '3×10', sets: 3 }, { name: 'شد كتف', detail: '3×12', sets: 3 }] }
        ]}
      ]
    },
    body: {
      title: 'نظام كمال الأجسام (Bodybuilding)',
      desc: 'برنامج تضخيم عضلي بتقسيم (Split) أيام العضلات لزيادة الكتلة العضلية والتعريف.',
      programs: [
        { name: 'برنامج Push/Pull/Legs (6 أيام)', days: [
          { name: 'اليوم الأول — دفع (صدر + كتف + تراي)', exercises: [{ name: 'بنش برس دمبل', detail: '4×10-12', sets: 4 }, { name: 'ضغط كتف دمبل', detail: '4×10-12', sets: 4 }, { name: 'طيران جانبي', detail: '3×15', sets: 3 }, { name: 'كابل كروس', detail: '3×12', sets: 3 }, { name: 'ترايسبس', detail: '3×12-15', sets: 3 }] },
          { name: 'اليوم الثاني — سحب (ظهر + باي)', exercises: [{ name: 'سحب علوي واسع', detail: '4×10', sets: 4 }, { name: 'صف بالبار', detail: '4×10', sets: 4 }, { name: 'سحب سفلي', detail: '3×12', sets: 3 }, { name: 'بايسبس بار', detail: '3×12', sets: 3 }, { name: 'بايسبس دمبل', detail: '3×12', sets: 3 }] },
          { name: 'اليوم الثالث — أرجل', exercises: [{ name: 'سكوات', detail: '4×10', sets: 4 }, { name: 'ضغط رجل', detail: '3×12', sets: 3 }, { name: 'تمديد رجل', detail: '3×15', sets: 3 }, { name: 'ثني رجل', detail: '3×15', sets: 3 }, { name: 'رفعة سمانة', detail: '4×15', sets: 4 }] },
          { name: 'اليوم الرابع — دفع (تكرار مع تنوع)', exercises: [{ name: 'بنش إنكلاين', detail: '4×10', sets: 4 }, { name: 'دمبل فلاي', detail: '3×12', sets: 3 }, { name: 'ضغط كتف أمامي', detail: '4×10', sets: 4 }, { name: 'رفرفة خلفي', detail: '3×15', sets: 3 }, { name: 'ترايسبس كابل', detail: '3×15', sets: 3 }] },
          { name: 'اليوم الخامس — سحب (تكرار مع تنوع)', exercises: [{ name: 'صف دمبل', detail: '4×10', sets: 4 }, { name: 'سحب علوي ضيق', detail: '4×10', sets: 4 }, { name: 'هاي روب', detail: '3×12', sets: 3 }, { name: 'بايسبس تركيز', detail: '3×12', sets: 3 }, { name: 'بايسبس مطرقة', detail: '3×12', sets: 3 }] },
          { name: 'اليوم السادس — أرجل + بطن', exercises: [{ name: 'ديدليفت روماني', detail: '4×10', sets: 4 }, { name: 'طعن', detail: '3×12', sets: 3 }, { name: 'رفعة سمانة', detail: '4×20', sets: 4 }, { name: 'بطن علوي', detail: '3×15', sets: 3 }, { name: 'بطن سفلي', detail: '3×15', sets: 3 }] }
        ]},
        { name: 'نصائح التغذية للضخامة', days: [
          { name: 'السعرات', exercises: [{ name: 'فائض سعري', detail: '300-500 سعرة فوق الصيانة يومياً', sets: 1 }, { name: 'بروتين', detail: '1.6-2 غم لكل كغم من وزن الجسم', sets: 1 }, { name: 'كربوهيدرات', detail: '4-6 غم/كغم', sets: 1 }, { name: 'دهون صحية', detail: '0.8-1 غم/كغم', sets: 1 }, { name: 'وجبات', detail: '4-6 وجبات يومياً', sets: 1 }] },
          { name: 'مكملات موصى بها', exercises: [{ name: 'واي بروتين', detail: '30غ بعد التمرين', sets: 1 }, { name: 'كرياتين', detail: '5غ يومياً', sets: 1 }, { name: 'أوميغا 3', detail: '1000مغ يومياً', sets: 1 }] }
        ]}
      ]
    },
    endurance: {
      title: 'نظام القوة والتحمل (Strength & Endurance)',
      desc: 'برنامج يجمع بين القوة العضلية والتحمل القلبي التنفسي لتطوير اللياقة الشاملة.',
      programs: [
        { name: 'برنامج المبتدئين (4 أيام)', days: [
          { name: 'اليوم الأول — قوة الجزء العلوي + كارديو', exercises: [{ name: 'بنش برس', detail: '3×8-10', sets: 3 }, { name: 'سحب علوي', detail: '3×8-10', sets: 3 }, { name: 'ضغط كتف', detail: '3×10', sets: 3 }, { name: 'جري', detail: '20 دقيقة (مستوى 5-6/10)', sets: 1 }] },
          { name: 'اليوم الثاني — قوة الأرجل + HIIT', exercises: [{ name: 'سكوات', detail: '3×8-10', sets: 3 }, { name: 'ديدليفت روماني', detail: '3×10', sets: 3 }, { name: 'طعن', detail: '3×10', sets: 3 }, { name: 'HIIT', detail: '8 جولات: 30ث سبريد / 30ث راحة', sets: 8 }] },
          { name: 'اليوم الثالث — دائري (Circuit)', exercises: [{ name: 'دمبل ثراستر', detail: '4×12', sets: 4 }, { name: 'بيربي', detail: '4×10', sets: 4 }, { name: 'صف بار', detail: '4×12', sets: 4 }, { name: 'قفز صندوق', detail: '4×10', sets: 4 }, { name: 'بطن دراجة', detail: '4×20', sets: 4 }] },
          { name: 'اليوم الرابع — تحمل طويل', exercises: [{ name: 'جري أو سباحة', detail: '30-40 دقيقة', sets: 1 }, { name: 'تمارين وزن جسم', detail: '3 جولات: ضغط 15 + سكوات 20 + بلانك 45ث', sets: 3 }] }
        ]},
        { name: 'برنامج متقدم (5 أيام)', days: [
          { name: 'اليوم الأول — قوة قصوى', exercises: [{ name: 'سكوات', detail: '5×5 (85-90%)', sets: 5 }, { name: 'بنش برس', detail: '5×5', sets: 5 }, { name: 'جري', detail: '15 دقيقة', sets: 1 }] },
          { name: 'اليوم الثاني — تحمل عضلي', exercises: [{ name: 'تمارين دائرة', detail: '5 جولات — تمرين لكل عضلة 15 تكرار', sets: 5 }, { name: 'تجديف', detail: '2000م', sets: 1 }] },
          { name: 'اليوم الثالث — قوة + كارديو', exercises: [{ name: 'ديدليفت', detail: '4×5', sets: 4 }, { name: 'سحب', detail: '4×8', sets: 4 }, { name: 'جري تلال', detail: '8×100م صعود', sets: 8 }] },
          { name: 'اليوم الرابع — HIIT', exercises: [{ name: 'دمبل ثراستر', detail: 'EMOM 12 دقيقة', sets: 12 }, { name: 'بيربي', detail: '3×15', sets: 3 }, { name: 'قفز', detail: '3×20', sets: 3 }] },
          { name: 'اليوم الخامس — تحمل طويل', exercises: [{ name: 'جري', detail: '5-10 كم', sets: 1 }, { name: 'تمدد وإطالة', detail: '15 دقيقة', sets: 1 }] }
        ]}
      ]
    }
  };

  function initFitness() {
    if (document.getElementById('fitContent').dataset._init === '1') return;
    document.getElementById('fitContent').dataset._init = '1';
    document.querySelectorAll('#fitTabs .adhkar-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        document.querySelectorAll('#fitTabs .adhkar-tab').forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        renderFitness(this.getAttribute('data-fit'));
      });
    });
    renderFitness('power');
    /* Load saved checkboxes */
    renderFitness('power');
  }
  function renderFitness(cat) {
    var data = FIT_DATA[cat];
    if (!data) return;
    var el = document.getElementById('fitContent');
    var html = '<h3 style="margin-bottom:6px;color:var(--text-primary);">' + data.title + '</h3><p style="color:var(--text-secondary);font-size:13px;margin-bottom:16px;">' + data.desc + '</p>';
    var key = 'fit_ck_' + cat;
    var saved = Store.get(key, {});
    var totalCk = 0, doneCk = 0;
    data.programs.forEach(function (prog, pi) {
      html += '<div class="fit-program"><div class="fit-program-title"><i class="fas fa-check-circle"></i> ' + prog.name + '</div><div class="fit-program-body">';
      prog.days.forEach(function (day, di) {
        html += '<div class="fit-day"><div class="fit-day-name"><i class="fas fa-calendar-day"></i> ' + day.name + '</div>';
        day.exercises.forEach(function (ex, ei) {
          var cid = cat + '_' + pi + '_' + di + '_' + ei;
          var checked = saved[cid] ? 'checked' : '';
          totalCk++; if (checked) doneCk++;
          html += '<div class="fit-exercise"><input type="checkbox" class="fit-check" data-cid="' + cid + '" ' + checked + '><span class="fit-ex-name">' + ex.name + '</span><span class="fit-ex-detail">' + ex.detail + '</span></div>';
        });
        html += '</div>';
      });
      html += '</div></div>';
    });
    var pct = totalCk > 0 ? Math.round(doneCk / totalCk * 100) : 0;
    html += '<div class="fit-progress"><div class="fit-progress-bar" style="width:' + pct + '%;"></div></div><p style="text-align:center;font-size:13px;color:var(--text-muted);">تقدمك: ' + doneCk + '/' + totalCk + ' (' + pct + '%)</p>';
    el.innerHTML = html;
    el.querySelectorAll('.fit-check').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var key2 = 'fit_ck_' + cat;
        var s = Store.get(key2, {});
        s[this.getAttribute('data-cid')] = this.checked ? 1 : 0;
        Store.set(key2, s);
        renderFitness(cat);
      });
    });
  }

  function escHtml(str) {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode(str));
    return d.innerHTML;
  }

  /* ===== UNITS CONVERTER ===== */
  function initUnits() {
    if (document.getElementById('unitsTabs').dataset._init === '1') return;
    document.getElementById('unitsTabs').dataset._init = '1';

    var tabs = document.querySelectorAll('#unitsTabs .tool-tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        document.querySelectorAll('.uc-content').forEach(function (c) { c.style.display = 'none'; });
        var id = 'uc' + this.getAttribute('data-unit').replace(/^\w/, function (c) { return c.toUpperCase(); });
        var el = document.getElementById(id);
        if (el) el.style.display = 'flex';
      });
    });

    var lengthFactors = { m: 1, cm: 0.01, mm: 0.001, km: 1000, ft: 0.3048, in: 0.0254, mi: 1609.344 };
    var weightFactors = { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495, t: 1000 };

    document.querySelectorAll('#ucLength .uc-input').forEach(function (inp) {
      inp.addEventListener('input', function () { ucConvert(this, 'ucLength', lengthFactors, 6); });
    });
    document.querySelectorAll('#ucWeight .uc-input').forEach(function (inp) {
      inp.addEventListener('input', function () { ucConvert(this, 'ucWeight', weightFactors, 6); });
    });
    document.querySelectorAll('#ucTemp .uc-input').forEach(function (inp) {
      inp.addEventListener('input', function () { ucConvertTemp(this); });
    });
  }

  function ucConvert(changed, containerId, factors, decimals) {
    var val = parseFloat(changed.value);
    if (isNaN(val) || !isFinite(val)) { val = 0; changed.value = 0; }
    var unit = changed.getAttribute('data-u');
    var base = val * (1 / factors[unit]);
    document.querySelectorAll('#' + containerId + ' .uc-input').forEach(function (inp) {
      var u = inp.getAttribute('data-u');
      if (u !== unit) { inp.value = (base * factors[u]).toFixed(decimals); }
    });
  }

  function ucConvertTemp(changed) {
    var val = parseFloat(changed.value);
    if (isNaN(val) || !isFinite(val)) { val = 0; changed.value = 0; }
    var unit = changed.getAttribute('data-u');
    var celsius;
    if (unit === 'celsius') { celsius = val; }
    else if (unit === 'fahrenheit') { celsius = (val - 32) * 5 / 9; }
    else if (unit === 'kelvin') { celsius = val - 273.15; }
    document.querySelectorAll('#ucTemp .uc-input').forEach(function (inp) {
      var u = inp.getAttribute('data-u');
      if (u === unit) return;
      if (u === 'celsius') inp.value = celsius.toFixed(2);
      else if (u === 'fahrenheit') inp.value = (celsius * 9 / 5 + 32).toFixed(2);
      else if (u === 'kelvin') inp.value = (celsius + 273.15).toFixed(2);
    });
  }

  /* ===== DATE CONVERTER ===== */
  function initDateConverter() {
    if (document.getElementById('dcTabs').dataset._init === '1') return;
    document.getElementById('dcTabs').dataset._init = '1';

    var tabs = document.querySelectorAll('#dcTabs .tool-tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        document.querySelectorAll('.dc-pane').forEach(function (c) { c.style.display = 'none'; });
        document.getElementById('dc' + this.getAttribute('data-dc').replace(/^\w/, function (c) { return c.toUpperCase(); })).style.display = 'flex';
      });
    });

    document.getElementById('dcGtohBtn').addEventListener('click', function () {
      var d = document.getElementById('dcGDay').value.padStart(2, '0');
      var m = document.getElementById('dcGMonth').value.padStart(2, '0');
      var y = document.getElementById('dcGYear').value;
      if (!d || !m || !y) { document.getElementById('dcGtohResult').textContent = '❌ الرجاء إدخال التاريخ كاملاً'; return; }
      var el = document.getElementById('dcGtohResult');
      el.textContent = 'جاري التحميل...';
      fetch('https://api.aladhan.com/v1/gToH?date=' + d + '-' + m + '-' + y)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.code === 200 && data.data) {
            var h = data.data.hijri;
            el.innerHTML = '<span style="font-size:22px;color:#fff;">' + h.day + ' ' + h.month.ar + ' ' + h.year + ' هـ</span><br/><span style="font-size:13px;color:var(--text-muted);">' + h.weekday.ar + '</span>';
          } else { el.textContent = '❌ تعذر التحويل'; }
        })
        .catch(function () { el.textContent = '❌ خطأ في الاتصال'; });
    });

    document.getElementById('dcHtogBtn').addEventListener('click', function () {
      var d = document.getElementById('dcHDay').value.padStart(2, '0');
      var m = document.getElementById('dcHMonth').value.padStart(2, '0');
      var y = document.getElementById('dcHYear').value;
      if (!d || !m || !y) { document.getElementById('dcHtogResult').textContent = '❌ الرجاء إدخال التاريخ كاملاً'; return; }
      var el = document.getElementById('dcHtogResult');
      el.textContent = 'جاري التحميل...';
      fetch('https://api.aladhan.com/v1/hToG?date=' + d + '-' + m + '-' + y)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.code === 200 && data.data) {
            var g = data.data.gregorian;
            el.innerHTML = '<span style="font-size:22px;color:#fff;">' + g.day + ' ' + g.month.en + ' ' + g.year + ' م</span><br/><span style="font-size:13px;color:var(--text-muted);">' + g.weekday.en + '</span>';
          } else { el.textContent = '❌ تعذر التحويل'; }
        })
        .catch(function () { el.textContent = '❌ خطأ في الاتصال'; });
    });
  }

  /* ===== AGE CALCULATOR ===== */
  function initAgeCalc() {
    if (document.getElementById('acCalcBtn').dataset._init === '1') return;
    document.getElementById('acCalcBtn').dataset._init = '1';

    document.getElementById('acCalcBtn').addEventListener('click', function () {
      var birthVal = document.getElementById('acBirth').value;
      if (!birthVal) { document.getElementById('acResult').innerHTML = '<span style="color:var(--text-muted);">الرجاء إدخال تاريخ الميلاد</span>'; return; }
      var birth = new Date(birthVal);
      var now = new Date();
      if (birth > now) { document.getElementById('acResult').innerHTML = '<span style="color:#ef4444;">تاريخ الميلاد لا يمكن أن يكون في المستقبل</span>'; return; }
      var diff = now - birth;
      var msInYear = 365.25 * 24 * 60 * 60 * 1000;
      var msInMonth = msInYear / 12;
      var years = Math.floor(diff / msInYear);
      var months = Math.floor((diff % msInYear) / msInMonth);
      var days = Math.floor((diff % msInYear % msInMonth) / (24 * 60 * 60 * 1000));
      var hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      var minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
      var el = document.getElementById('acResult');
      el.innerHTML = '<span class="ac-age">' + years + '</span><span class="ac-detail">سنة</span><div class="ac-grid"><div class="ac-grid-item"><span class="num">' + months + '</span><span class="lbl">شهر</span></div><div class="ac-grid-item"><span class="num">' + days + '</span><span class="lbl">يوم</span></div><div class="ac-grid-item"><span class="num">' + hours + '</span><span class="lbl">ساعة</span></div><div class="ac-grid-item"><span class="num">' + minutes + '</span><span class="lbl">دقيقة</span></div><div class="ac-grid-item"><span class="num">' + Math.floor(diff / (24 * 60 * 60 * 1000)) + '</span><span class="lbl">إجمالي الأيام</span></div><div class="ac-grid-item"><span class="num">' + Math.floor(diff / (60 * 60 * 1000)) + '</span><span class="lbl">إجمالي الساعات</span></div></div>';
    });
  }

  /* ===== DATE DIFFERENCE ===== */
  function initDateDiff() {
    if (document.getElementById('ddCalcBtn').dataset._init === '1') return;
    document.getElementById('ddCalcBtn').dataset._init = '1';

    document.getElementById('ddCalcBtn').addEventListener('click', function () {
      var sVal = document.getElementById('ddStart').value;
      var eVal = document.getElementById('ddEnd').value;
      if (!sVal || !eVal) { document.getElementById('ddResult').innerHTML = '<span style="color:var(--text-muted);">الرجاء إدخال التاريخين</span>'; return; }
      var start = new Date(sVal);
      var end = new Date(eVal);
      if (end < start) { var tmp = end; end = start; start = tmp; }
      var diff = end - start;
      var totalDays = Math.floor(diff / (24 * 60 * 60 * 1000));
      var totalHours = Math.floor(diff / (60 * 60 * 1000));
      var totalMinutes = Math.floor(diff / (60 * 1000));
      var years = end.getFullYear() - start.getFullYear();
      var months = end.getMonth() - start.getMonth();
      var days = end.getDate() - start.getDate();
      if (days < 0) { months--; var prevMonth = new Date(end.getFullYear(), end.getMonth(), 0); days += prevMonth.getDate(); }
      if (months < 0) { years--; months += 12; }
      var el = document.getElementById('ddResult');
      el.innerHTML = '<span class="dd-big">' + totalDays + '</span><span class="dd-detail">يوم</span><div class="ac-grid"><div class="ac-grid-item"><span class="num">' + years + '</span><span class="lbl">سنة</span></div><div class="ac-grid-item"><span class="num">' + months + '</span><span class="lbl">شهر</span></div><div class="ac-grid-item"><span class="num">' + days + '</span><span class="lbl">يوم</span></div><div class="ac-grid-item"><span class="num">' + totalHours + '</span><span class="lbl">ساعة</span></div><div class="ac-grid-item"><span class="num">' + totalMinutes + '</span><span class="lbl">دقيقة</span></div></div>';
    });
  }

  /* ===== PASSWORD GENERATOR ===== */
  function initPasswordGen() {
    if (document.getElementById('pgGenBtn').dataset._init === '1') return;
    document.getElementById('pgGenBtn').dataset._init = '1';

    var lengthInput = document.getElementById('pgLength');
    var lengthVal = document.getElementById('pgLengthVal');
    lengthInput.addEventListener('input', function () { lengthVal.textContent = this.value; });

    document.getElementById('pgGenBtn').addEventListener('click', generatePassword);
    document.getElementById('pgCopyBtn').addEventListener('click', function () {
      var out = document.getElementById('pgOutput');
      if (!out.value) return;
      out.select();
      navigator.clipboard.writeText(out.value);
      var orig = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i>';
      this.style.background = 'linear-gradient(135deg,#16a34a,#22c55e)';
      var self = this;
      setTimeout(function () { self.innerHTML = orig; self.style.background = ''; }, 1500);
    });
  }

  function generatePassword() {
    var length = parseInt(document.getElementById('pgLength').value);
    var useUpper = document.getElementById('pgUpper').checked;
    var useLower = document.getElementById('pgLower').checked;
    var useNumbers = document.getElementById('pgNumbers').checked;
    var useSymbols = document.getElementById('pgSymbols').checked;
    var chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!chars) { document.getElementById('pgOutput').value = 'حدد خياراً واحداً على الأقل'; return; }
    var result = '';
    for (var i = 0; i < length; i++) { result += chars.charAt(Math.floor(Math.random() * chars.length)); }
    document.getElementById('pgOutput').value = result;
    var entropy = Math.log2(chars.length) * length;
    var bar = document.getElementById('pgStrength');
    var pct = Math.min(100, (entropy / 128) * 100);
    var color = '#ef4444';
    if (entropy >= 80) color = '#22c55e';
    else if (entropy >= 60) color = '#eab308';
    bar.innerHTML = '<div class="pg-strength-bar" style="width:' + pct + '%;background:' + color + ';"></div>';
  }

  /* ===== IP CALCULATOR ===== */
  function initIpCalc() {
    if (document.getElementById('ipCalcBtn').dataset._init === '1') return;
    document.getElementById('ipCalcBtn').dataset._init = '1';

    document.getElementById('ipCalcBtn').addEventListener('click', function () {
      var ipStr = document.getElementById('ipInput').value.trim();
      var mask = parseInt(document.getElementById('ipMask').value);
      if (!ipStr) { document.getElementById('ipResult').innerHTML = '<span style="color:var(--text-muted);">الرجاء إدخال عنوان IP</span>'; return; }
      var octets = ipStr.split('.').map(function (o) { return parseInt(o, 10); });
      if (octets.length !== 4 || octets.some(function (o) { return isNaN(o) || o < 0 || o > 255; })) {
        document.getElementById('ipResult').innerHTML = '<span style="color:#ef4444;">عنوان IP غير صالح</span>'; return;
      }
      var maskBits = '1'.repeat(mask) + '0'.repeat(32 - mask);
      var maskOctets = [];
      for (var i = 0; i < 4; i++) {
        maskOctets.push(parseInt(maskBits.substr(i * 8, 8), 2));
      }
      var network = octets.map(function (o, idx) { return o & maskOctets[idx]; });
      var broadcast = octets.map(function (o, idx) { return o | (~maskOctets[idx] & 255); });
      var html = '<table><tr><th>الخاصية</th><th>القيمة</th></tr>';
      html += '<tr><td>العنوان</td><td>' + octets.join('.') + '</td></tr>';
      html += '<tr><td>قناع الشبكة</td><td>' + maskOctets.join('.') + ' /' + mask + '</td></tr>';
      html += '<tr><td>الشبكة</td><td>' + network.join('.') + '</td></tr>';
      html += '<tr><td>البث</td><td>' + broadcast.join('.') + '</td></tr>';
      html += '<tr><td>عدد الأجهزة</td><td>' + (mask < 32 ? Math.pow(2, 32 - mask) - 2 : 1) + '</td></tr>';
      html += '</table><table style="margin-top:10px;"><tr><th>Octet</th><th>عشري</th><th>ثنائي</th><th>سداسي عشر</th></tr>';
      octets.forEach(function (o, idx) {
        html += '<tr><td>' + (idx + 1) + '</td><td>' + o + '</td><td>' + o.toString(2).padStart(8, '0') + '</td><td>' + o.toString(16).padStart(2, '0').toUpperCase() + '</td></tr>';
      });
      html += '</table>';
      document.getElementById('ipResult').innerHTML = html;
    });
  }

  /* ===== WORD COUNTER ===== */
  function initWordCount() {
    if (document.getElementById('wcInput').dataset._init === '1') return;
    document.getElementById('wcInput').dataset._init = '1';

    document.getElementById('wcInput').addEventListener('input', function () {
      var text = this.value;
      var words = text.trim() ? text.trim().split(/\s+/).length : 0;
      var chars = text.length;
      var charsNoSpace = text.replace(/\s/g, '').length;
      var lines = text ? text.split('\n').length : 0;
      document.getElementById('wcWords').textContent = words;
      document.getElementById('wcChars').textContent = chars;
      document.getElementById('wcCharsNoSpace').textContent = charsNoSpace;
      document.getElementById('wcLines').textContent = lines;
    });
  }

  /* ===== GRADE CALCULATOR ===== */
  function initGradeCalc() {
    if (document.getElementById('gcCalcBtn').dataset._init === '1') return;
    document.getElementById('gcCalcBtn').dataset._init = '1';

    document.getElementById('gcCalcBtn').addEventListener('click', function () {
      var max = parseFloat(document.getElementById('gcMax').value);
      var score = parseFloat(document.getElementById('gcScore').value);
      if (!max || max <= 0) { document.getElementById('gcResult').innerHTML = '<span style="color:#ef4444;">الدرجة الكبرى يجب أن تكون أكبر من صفر</span>'; return; }
      if (isNaN(score) || score < 0) { document.getElementById('gcResult').innerHTML = '<span style="color:#ef4444;">الدرجة المتحصل عليها غير صحيحة</span>'; return; }
      var pct = (score / max) * 100;
      var grade, color;
      if (pct >= 85) { grade = 'ممتاز'; color = '#22c55e'; }
      else if (pct >= 75) { grade = 'جيد جداً'; color = '#3b82f6'; }
      else if (pct >= 65) { grade = 'جيد'; color = '#eab308'; }
      else if (pct >= 50) { grade = 'مقبول'; color = '#f97316'; }
      else { grade = 'راسب / ضعيف'; color = '#ef4444'; }
      var el = document.getElementById('gcResult');
      el.innerHTML = '<span class="gc-pct" style="color:' + color + ';">' + pct.toFixed(2) + '%</span><span class="gc-grade" style="color:' + color + ';">' + grade + '</span><span class="gc-label">' + score + ' من ' + max + '</span>';
    });
  }

  /* ===== EXAM EDITOR ===== */
  function initExamEditor() {
    if (document.getElementById('examA4').dataset._init === '1') return;
    document.getElementById('examA4').dataset._init = '1';

    var a4 = document.getElementById('examA4');
    var saved = Store.get('exam_content', '');
    if (saved) a4.innerHTML = saved;

    /* Toolbar commands */
    document.querySelectorAll('#examToolbar .ex-btn[data-cmd]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cmd = this.getAttribute('data-cmd');
        document.execCommand(cmd, false, null);
        a4.focus();
      });
    });

    /* Font size */
    document.getElementById('exFontSize').addEventListener('change', function () {
      document.execCommand('fontSize', false, this.value);
      a4.focus();
    });

    /* Heading */
    document.getElementById('exHeading').addEventListener('change', function () {
      var val = this.value;
      if (val) { document.execCommand('formatBlock', false, '<' + val + '>'); }
      else { document.execCommand('formatBlock', false, '<p>'); }
      this.value = '';
      a4.focus();
    });

    /* Table */
    document.getElementById('exTableBtn').addEventListener('click', function () {
      var rows = prompt('عدد الصفوف:', '3');
      if (!rows) return;
      var cols = prompt('عدد الأعمدة:', '3');
      if (!cols) return;
      var html = '<table>';
      for (var r = 0; r < parseInt(rows); r++) {
        html += '<tr>';
        for (var c = 0; c < parseInt(cols); c++) {
          html += '<td> </td>';
        }
        html += '</tr>';
      }
      html += '</table>';
      document.execCommand('insertHTML', false, html);
      a4.focus();
    });

    /* Clear */
    document.getElementById('exClearBtn').addEventListener('click', function () {
      if (confirm('مسح محتوى الامتحان بالكامل؟')) {
        a4.innerHTML = '<div style="text-align:center;margin-bottom:20px;"><h2>الامتحان</h2></div><p>اكتب أسئلة الامتحان هنا...</p>';
        Store.set('exam_content', a4.innerHTML);
      }
    });

    /* Auto-save on input */
    var saveTimer;
    a4.addEventListener('input', function () {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(function () { Store.set('exam_content', a4.innerHTML); }, 500);
    });

    /* Save button */
    document.getElementById('examSaveBtn').addEventListener('click', function () {
      Store.set('exam_content', a4.innerHTML);
      var orig = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> تم الحفظ';
      this.style.background = 'linear-gradient(135deg,#16a34a,#22c55e)';
      var self = this;
      setTimeout(function () { self.innerHTML = orig; self.style.background = ''; }, 2000);
    });

    /* Export Word */
    document.getElementById('examWordBtn').addEventListener('click', function () {
      var style = '<style>body{font-family:"Traditional Arabic","Times New Roman",serif;direction:rtl;padding:40px;font-size:14pt;line-height:1.8;}table{border-collapse:collapse;width:100%;margin:10px 0;}td,th{border:1px solid #94a3b8;padding:6px 10px;text-align:center;}</style>';
      var fullHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>الامتحان</title>' + style + '</head><body>' + a4.innerHTML + '</body></html>';
      var blob = new Blob([fullHtml], { type: 'application/msword' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'الامتحان.doc';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });

    /* Export PDF using html2pdf */
    document.getElementById('examPdfBtn').addEventListener('click', function () {
      var btn = this;
      var orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
      btn.disabled = true;
      var opt = { margin: 10, filename: 'الامتحان.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
      if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(a4).save().then(function () {
          btn.innerHTML = orig; btn.disabled = false;
        });
      } else {
        /* Fallback: print */
        window.print();
        btn.innerHTML = orig; btn.disabled = false;
      }
    });

    /* WhatsApp */
    document.getElementById('examWhatsBtn').addEventListener('click', function () {
      var text = a4.innerText.trim();
      if (!text) { alert('الامتحان فارغ'); return; }
      var msg = encodeURIComponent('الامتحان:\n\n' + text.substring(0, 4000) + '\n\nتم إرسال الامتحان عبر موقع المنظومات الإلكترونية');
      window.open('https://wa.me/218917503180?text=' + msg, '_blank');
    });
  }

  /* ===== OVERRIDE RENDER SYSTEMS ===== */
  var _origRenderSystems = renderSystems;
  function renderSystems(query) {
    var all = window._allSystems || SYSTEMS_CONFIG;
    var filtered = all;
    if (query && query.trim()) { var q = query.trim(); filtered = all.filter(function (s) { return s.title.includes(q) || s.description.includes(q); }); }
    document.getElementById('resultsCount').textContent = filtered.length;
    document.getElementById('heroTotal').textContent = filtered.length;
    if (filtered.length === 0) { document.getElementById('systemsGrid').innerHTML = ''; document.getElementById('noResults').style.display = 'block'; return; }
    document.getElementById('noResults').style.display = 'none';
    renderSystemsData(filtered);
  }

  /* ===== STORE HELPER ===== */
  var Store = {
    get: function (key, def) { try { var v = JSON.parse(localStorage.getItem('portal_' + key)); return v !== null ? v : def; } catch (e) { return def; } },
    set: function (key, val) { try { localStorage.setItem('portal_' + key, JSON.stringify(val)); } catch (e) {} }
  };

  /* ===== FOOTER YEAR ===== */
  document.getElementById('footerYear').textContent = new Date().getFullYear();

  /* ===== INIT ===== */
  document.addEventListener('DOMContentLoaded', function () {
    document.body.style.overflow = 'hidden';
    initLoader();
    updateClock();
    setInterval(updateClock, 1000);
    initNavbar();
    initSidebar();
    initParticles();
    initSearch();
    initSystems();
    initProgressBar();
    initBackToTop();
    initThemeToggle();
    initLenis();
    initExchange();
    initCalculator();
    fetchWeather();
    fetchPrayerTimes();
    fetchHijriDate();
    initCalendarNav();
    initNotes();
    initReminders();
    initATodo();
    initTimetable();
    initJournal();
    initDailyQuote();
    initUnits();
    initDateConverter();
    initAgeCalc();
    initDateDiff();
    initPasswordGen();
    initIpCalc();
    initWordCount();
    initGradeCalc();
    initExamEditor();
    initIslamic();
  });
})();
