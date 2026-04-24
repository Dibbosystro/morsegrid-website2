// Desktop dropdowns: CSS :hover handles open/close.
// Mobile (<= 900px): inject hamburger + slide-down menu panel.

(function () {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // ── Inject hamburger button ────────────────────────────────────────────────
  const burger = document.createElement('button');
  burger.className = 'mg-burger';
  burger.setAttribute('aria-label', 'Open menu');
  burger.innerHTML = `
    <span class="mg-bar"></span>
    <span class="mg-bar"></span>
    <span class="mg-bar"></span>`;
  nav.appendChild(burger);

  // ── Build mobile menu ─────────────────────────────────────────────────────
  const menu = document.createElement('div');
  menu.className = 'mg-mobile-menu';
  menu.setAttribute('aria-hidden', 'true');

  const linksEl = document.createElement('div');
  linksEl.className = 'mg-mobile-links';

  nav.querySelectorAll('.nav-links > li').forEach(function (li) {
    var directLink = li.querySelector(':scope > a');
    var ddBtn      = li.querySelector('.nav-dd-btn');
    var ddPanel    = li.querySelector('.nav-dd-panel');

    if (directLink) {
      var a = document.createElement('a');
      a.href = directLink.href;
      a.textContent = directLink.textContent.trim();
      a.className = 'mg-ml-link';
      linksEl.appendChild(a);
    }

    if (ddBtn && ddPanel) {
      var label = ddBtn.childNodes[0] && ddBtn.childNodes[0].nodeType === 3
        ? ddBtn.childNodes[0].textContent.trim()
        : ddBtn.textContent.trim().replace(/\s+/g, ' ').split(' ')[0];

      var grp = document.createElement('div');
      grp.className = 'mg-ml-group';
      grp.textContent = label;
      linksEl.appendChild(grp);

      ddPanel.querySelectorAll('a').forEach(function (pa) {
        var sub = document.createElement('a');
        sub.href = pa.href;
        sub.textContent = pa.textContent.trim();
        sub.className = 'mg-ml-sub';
        linksEl.appendChild(sub);
      });
    }
  });

  menu.appendChild(linksEl);

  // CTA row
  var ctas = document.createElement('div');
  ctas.className = 'mg-mobile-ctas';
  nav.querySelectorAll('.nav-right > *').forEach(function (el) {
    var clone = el.cloneNode(true);
    if (clone.id === 'mgNavVoiceBtn') clone.removeAttribute('id');
    ctas.appendChild(clone);
  });
  menu.appendChild(ctas);

  document.body.appendChild(menu);

  // ── Toggle ────────────────────────────────────────────────────────────────
  var open = false;

  function openMenu() {
    open = true;
    burger.classList.add('is-open');
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
  }
  function closeMenu() {
    open = false;
    burger.classList.remove('is-open');
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
  }

  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    open ? closeMenu() : openMenu();
  });

  document.addEventListener('click', function (e) {
    if (open && !menu.contains(e.target)) closeMenu();
  });

  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
})();
