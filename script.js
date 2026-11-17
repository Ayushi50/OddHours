(function () {
  'use strict';

  /* ===== SETTINGS: fill these in before launch ===== */
  var CONFIG = {
    // WhatsApp number with country code, digits only. Example for India: '919876543210'. Leave '' to hide the chat link behaviour.
    whatsappNumber: '',
    // Form service URL, e.g. 'https://formspree.io/f/xxxxxxxx'. Leave '' to fall back to opening the visitor's email app.
    formEndpoint: '',
    email: 'ayushipandey316@gmail.com'
  };

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.getElementById('theme-toggle');
  function syncThemeLabel() {
    var dark = root.getAttribute('data-theme') !== 'light';
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('oddhours-theme', next); } catch (e) {}
    syncThemeLabel();
  });
  syncThemeLabel();

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menu-toggle');
  var navLinks = document.getElementById('nav-links');
  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', function () {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  /* ---------- WhatsApp links ---------- */
  var waHref = CONFIG.whatsappNumber
    ? 'https://wa.me/' + CONFIG.whatsappNumber.replace(/\D/g, '') + '?text=' + encodeURIComponent("Hi OddHours! I'd like to start a project.")
    : null;
  document.querySelectorAll('.wa-link').forEach(function (a) {
    if (waHref) { a.setAttribute('href', waHref); a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); }
  });

  /* ---------- Scroll progress line ---------- */
  var progBar = document.querySelector('.progress i');
  function updateProgress() {
    var d = document.documentElement;
    var max = d.scrollHeight - d.clientHeight;
    progBar.style.transform = 'scaleX(' + (max > 0 ? d.scrollTop / max : 0) + ')';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- Logo: clock hands spin when clicked ---------- */
  document.querySelectorAll('.wordmark').forEach(function (w) {
    w.addEventListener('click', function () {
      if (reduceMotion) return;
      w.classList.remove('spin'); void w.offsetWidth; w.classList.add('spin');
    });
  });

  /* ---------- Hero collage follows the mouse ---------- */
  var collage = document.getElementById('collage');
  var heroEl = document.querySelector('.hero');
  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    heroEl.addEventListener('pointermove', function (e) {
      var r = heroEl.getBoundingClientRect();
      collage.style.setProperty('--mx', (((e.clientX - r.left) / r.width) - .5) * 2);
      collage.style.setProperty('--my', (((e.clientY - r.top) / r.height) - .5) * 2);
    });
    heroEl.addEventListener('pointerleave', function () {
      collage.style.setProperty('--mx', 0); collage.style.setProperty('--my', 0);
    });
  }

  /* ---------- Confetti burst (used when a message is sent) ---------- */
  function confetti(fromEl) {
    if (reduceMotion || !fromEl.animate) return;
    var r = fromEl.getBoundingClientRect();
    var colors = ['var(--ac)', 'var(--co)', 'var(--sun)'];
    for (var i = 0; i < 18; i++) {
      var s = document.createElement('span');
      s.className = 'confetti';
      s.style.background = colors[i % 3];
      s.style.left = (r.left + r.width / 2 - 7) + 'px';
      s.style.top = (r.top + r.height / 2 - 7) + 'px';
      document.body.appendChild(s);
      var ang = Math.random() * Math.PI * 2, dist = 70 + Math.random() * 120;
      var a = s.animate([
        { transform: 'translate(0,0) scale(1) rotate(0deg)', opacity: 1 },
        { transform: 'translate(' + Math.cos(ang) * dist + 'px,' + (Math.sin(ang) * dist + 40) + 'px) scale(.3) rotate(' + (Math.random() * 360) + 'deg)', opacity: 0 }
      ], { duration: 900 + Math.random() * 400, easing: 'cubic-bezier(.2,.8,.3,1)' });
      a.onfinish = (function (el) { return function () { el.remove(); }; })(s);
    }
  }

  /* ---------- Typing effect ---------- */
  var phrases = [
    'I need a website for my business…',
    'I need a logo that feels like us…',
    'I need a brand that stands out…'
  ];
  var typedEl = document.getElementById('typed-text');
  if (!reduceMotion) {
    var p = 0, i = 0, deleting = false;
    typedEl.textContent = '';
    (function tick() {
      var phrase = phrases[p];
      if (!deleting) {
        i++;
        typedEl.textContent = phrase.slice(0, i);
        if (i === phrase.length) { deleting = true; return setTimeout(tick, 1800); }
        return setTimeout(tick, 55);
      }
      i--;
      typedEl.textContent = phrase.slice(0, i);
      if (i === 0) { deleting = false; p = (p + 1) % phrases.length; return setTimeout(tick, 350); }
      setTimeout(tick, 25);
    })();
  }

  /* ---------- Hero service picker ---------- */
  var services = [
    { title: 'Website creation', text: 'Custom, mobile-first websites that are fast and easy to update.', chip: 'Website', price: 'Packages from ₹3,000' },
    { title: 'Branding', text: 'Colours, type, voice and guidelines so everything feels like one brand.', chip: 'Branding', price: 'Pricing: coming soon' },
    { title: 'Logo design', text: 'One distinctive mark that works everywhere, in every file format you need.', chip: 'Logo', price: 'Pricing: coming soon' }
  ];
  var pPrice = document.getElementById('preview-price');
  var opts = document.querySelectorAll('.svc-opt');
  var pTitle = document.getElementById('preview-title');
  var pText = document.getElementById('preview-text');
  var pArt = document.getElementById('preview-art');
  var pCta = document.getElementById('preview-cta');
  function select(idx) {
    var s = services[idx];
    opts.forEach(function (o) { o.setAttribute('aria-pressed', String(Number(o.dataset.index) === idx)); });
    pTitle.textContent = s.title;
    pText.textContent = s.text;
    pPrice.textContent = s.price;
    pArt.setAttribute('data-kind', String(idx));
    collage.setAttribute('data-focus', ['site', 'brand', 'logo'][idx]);
    pCta.setAttribute('data-service', s.chip);
  }
  opts.forEach(function (o) {
    o.addEventListener('click', function () { select(Number(o.dataset.index)); });
  });
  select(0);

  /* ---------- Preselect the contact chip from any "start / quote" link ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-service]');
    if (!a) return;
    var input = document.querySelector('.chips input[value="' + a.getAttribute('data-service') + '"]');
    if (input) input.checked = true;
    // Picking a pricing package pre-fills the message (without overwriting anything the visitor typed).
    var pkg = a.getAttribute('data-package');
    var msg = document.getElementById('f-msg');
    if (pkg && msg && (msg.value.trim() === '' || msg.value.indexOf("I'm interested in the ") === 0)) {
      msg.value = "I'm interested in the " + pkg + " package.";
    }
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in-view'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in-view'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  var sendBtn = document.getElementById('send-btn');
  var sendLabel = sendBtn.querySelector('.btn-label');
  var rules = [
    { id: 'f-name', err: 'e-name', msg: 'Please tell us your name.' },
    { id: 'f-email', err: 'e-email', msg: 'Please enter a valid email address.' },
    { id: 'f-msg', err: 'e-msg', msg: 'Please add a short message.' }
  ];

  function validate() {
    var firstBad = null;
    rules.forEach(function (r) {
      var f = document.getElementById(r.id), e = document.getElementById(r.err);
      var ok = f.checkValidity() && f.value.trim() !== '';
      f.setAttribute('aria-invalid', ok ? 'false' : 'true');
      e.textContent = ok ? '' : r.msg;
      if (!ok && !firstBad) firstBad = f;
    });
    return firstBad;
  }
  rules.forEach(function (r) {
    document.getElementById(r.id).addEventListener('input', function () {
      this.setAttribute('aria-invalid', 'false'); document.getElementById(r.err).textContent = '';
    });
  });

  function showDone() {
    confetti(sendBtn);
    form.classList.add('sent');
    var done = form.querySelector('.form-done');
    if (done) done.focus({ preventScroll: true });
  }
  function showError(msg) {
    status.className = 'form-status err';
    status.textContent = msg;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = ''; status.className = 'form-status';

    // Spam trap: real visitors never fill this in.
    if (form.querySelector('[name="_gotcha"]').value) { showDone(); return; }

    var firstBad = validate();
    if (firstBad) { showError('Please fix the highlighted fields.'); firstBad.focus(); return; }

    var chip = form.querySelector('input[name="service"]:checked');
    var service = chip ? chip.value : 'Not specified';
    var name = document.getElementById('f-name').value.trim();
    var email = document.getElementById('f-email').value.trim();
    var message = document.getElementById('f-msg').value.trim();

    if (CONFIG.formEndpoint) {
      // Real submission to your form service (Formspree, Getform, Basin, etc.).
      sendBtn.disabled = true; sendLabel.textContent = 'Sending…';
      var data = new FormData();
      data.append('name', name); data.append('email', email); data.append('service', service); data.append('message', message);
      data.append('_subject', 'New project enquiry: ' + service);
      fetch(CONFIG.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (res) { if (!res.ok) throw new Error('bad status'); showDone(); })
        .catch(function () { showError('Sorry, that did not send. Please try again, or email us at ' + CONFIG.email + '.'); })
        .then(function () { sendBtn.disabled = false; sendLabel.textContent = 'Send it over'; });
      return;
    }

    // No form service connected yet: open the visitor's email app with the message pre-filled.
    var subject = 'New project enquiry: ' + service;
    var body = 'Name: ' + name + '\nEmail: ' + email + '\nNeeds: ' + service + '\n\n' + message;
    window.location.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    confetti(sendBtn);
    status.className = 'form-status ok';
    status.textContent = 'Opening your email app. If nothing opens, email us directly at ' + CONFIG.email + '.';
  });

  /* ---------- "Start a project" (nav): jump to the form and put the cursor in it ---------- */
  var startBtn = document.querySelector('.nav-actions .btn');
  if (startBtn) {
    startBtn.addEventListener('click', function () {
      setTimeout(function () {
        var first = document.getElementById('f-name');
        if (first) first.focus({ preventScroll: true });
      }, reduceMotion ? 0 : 700);
    });
  }
})();
