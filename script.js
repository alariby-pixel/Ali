const SYSTEMS_CONFIG = [
  { id: 1, title: 'منظومة مدرسة الساحل المالية', url: 'https://script.google.com/macros/s/AKfycbwm3VszZws7SK7jZgUqak2QVRo8XvLADibqenrRNxj0HrwZFplbVN5VHu3OW0GSltJnlQ/exec', description: 'إدارة الرسوم الدراسية والحسابات والتقارير المالية.' },
  { id: 2, title: 'منظومة الشؤون الفنية والهندسية', url: 'https://script.google.com/macros/s/AKfycbwMDEh4_o5WPMR4udAsKrOKl7tc2a0tLSz6n1jwuvvx059jjvdLcJp3Je_fTgd8soHb/exec', description: 'إدارة أعمال الصيانة والأصول والمشروعات الفنية والهندسية.' },
  { id: 3, title: 'منظومة وزارة التربية والتعليم', url: 'https://nec.gov.ly/SRS/UserLogin.aspx?value=login', description: 'الوصول إلى الخدمات الإلكترونية الخاصة بوزارة التربية والتعليم.' },
  { id: 4, title: 'منظومة شؤون الطلبة والامتحانات', url: 'https://edu-libya.com/student/admin/login', description: 'إدارة بيانات الطلبة والنتائج والامتحانات.' },
  { id: 5, title: 'منظومة احتساب نتيجة الشهادتين', url: 'https://alariby-pixel.github.io/alsahal/', description: 'حاسبة احترافية لحساب النتائج.' },
  { id: 6, title: 'منصة الضرائب', url: 'https://ly.tax/', description: 'الخدمات الإلكترونية لمصلحة الضرائب.' },
  { id: 7, title: 'بوابة إعداد الموازنة العامة', url: 'https://budget.mopaf.info/login', description: 'منظومة إعداد الموازنة العامة.' },
  { id: 8, title: 'مركز المناهج والمقررات الدراسية', url: 'https://t.me/Manahej2026', description: 'الوصول إلى المناهج والمقررات الدراسية.' },
  { id: 9, title: 'بوابة إعلان نتيجة الشهادة الإعدادية والثانوية', url: 'https://finalresults.nec.gov.ly/', description: 'الاستعلام عن نتائج الشهادتين الإعدادية والثانوية.' }
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
    window.addEventListener('scroll', function () { navbar.classList.toggle('scrolled', window.scrollY > 60); }, { passive: true });
    toggle.addEventListener('click', function () { navInfo.classList.toggle('open'); toggle.setAttribute('aria-expanded', navInfo.classList.contains('open')); });
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
    if (page === 'home' && typeof AOS !== 'undefined') { setTimeout(function () { AOS.refresh(); }, 100); }
    if (page === 'calculator') { var d2 = document.getElementById('calcDisplay2'); if (d2 && !d2._init) { initCalc2(); } }
    if (page === 'exchange') { var c2 = document.getElementById('exCashRate2'); if (c2 && !c2._init) { initExchange2(); } }
    if (page === 'weather') { var p2 = document.getElementById('prayerList2'); if (p2 && !p2._init) { fetchWeather2(); fetchPrayerTimes2(); p2._init = true; } }
    if (page === 'calendar') { renderCalendar(); }
    if (page === 'notes') { renderNotes(); }
    if (page === 'reminders') { renderReminders(); }
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

  function renderPrayersTo(listId, cdId, prayers, currentPrayer) {
    var list = document.getElementById(listId);
    var cd = document.getElementById(cdId);
    if (!list) return;
    list.innerHTML = '';
    prayers.forEach(function (p, i) { list.innerHTML += '<div class="prayer-item" data-idx="' + i + '"><span class="prayer-name">' + p.name + '</span><span class="prayer-time">' + p.time + '</span></div>'; });
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
    renderSystems('');
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
  });
})();
