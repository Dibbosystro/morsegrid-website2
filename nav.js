// Desktop dropdowns: CSS :hover — no JS needed.
// Mobile (≤ 900px): overlay menu that drops below the nav pill.

(function () {
  var nav = document.querySelector('nav');
  if (!nav) return;

  // ── Hamburger button (injected into nav) ──────────────────────────────────
  var burger = document.createElement('button');
  burger.className = 'mg-burger';
  burger.setAttribute('aria-label', 'Open menu');
  burger.innerHTML =
    '<span class="mg-bar"></span>' +
    '<span class="mg-bar"></span>' +
    '<span class="mg-bar"></span>';
  nav.appendChild(burger);

  // ── Overlay (starts below the nav pill) ──────────────────────────────────
  var overlay = document.createElement('div');
  overlay.className = 'mg-mobile-menu';

  // — Nav items —
  var mmNav = document.createElement('div');
  mmNav.className = 'mg-mm-nav';

  nav.querySelectorAll('.nav-links > li').forEach(function (li) {
    var directA = li.querySelector(':scope > a');
    var ddBtn   = li.querySelector('.nav-dd-btn');
    var ddPanel = li.querySelector('.nav-dd-panel');

    if (directA) {
      var row = document.createElement('a');
      row.href = directA.href;
      row.className = 'mg-mm-row';
      row.textContent = directA.textContent.trim();
      mmNav.appendChild(row);

    } else if (ddBtn && ddPanel) {
      var labelText = '';
      ddBtn.childNodes.forEach(function (n) {
        if (n.nodeType === 3 && n.textContent.trim()) labelText = n.textContent.trim();
      });

      var toggleRow = document.createElement('div');
      toggleRow.className = 'mg-mm-row mg-mm-accordion';
      toggleRow.innerHTML =
        '<span>' + labelText + '</span>' +
        '<svg class="mg-mm-chev" width="20" height="20" viewBox="0 0 24 24"' +
        ' fill="none" stroke="currentColor" stroke-width="2"' +
        ' stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M6 9l6 6 6-6"/></svg>';

      var subList = document.createElement('div');
      subList.className = 'mg-mm-subs';

      ddPanel.querySelectorAll('a').forEach(function (pa) {
        var sub = document.createElement('a');
        sub.href = pa.href;
        sub.className = 'mg-mm-sub';
        sub.textContent = pa.textContent.trim();
        subList.appendChild(sub);
      });

      toggleRow.addEventListener('click', function () {
        var now = subList.classList.toggle('is-open');
        toggleRow.classList.toggle('is-open', now);
      });

      mmNav.appendChild(toggleRow);
      mmNav.appendChild(subList);
    }
  });

  overlay.appendChild(mmNav);

  // — Footer CTA: Book a call —
  var mmFooter = document.createElement('div');
  mmFooter.className = 'mg-mm-footer';

  var bookLink = nav.querySelector('.pill-dark');
  if (bookLink) {
    var bookClone = bookLink.cloneNode(true);
    mmFooter.appendChild(bookClone);
  }

  overlay.appendChild(mmFooter);
  document.body.appendChild(overlay);

  // ── Toggle ────────────────────────────────────────────────────────────────
  var isOpen = false;

  function openMenu() {
    isOpen = true;
    burger.classList.add('is-open');
    overlay.classList.add('is-open');
    nav.classList.add('mg-nav-open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    isOpen = false;
    burger.classList.remove('is-open');
    overlay.classList.remove('is-open');
    nav.classList.remove('mg-nav-open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    isOpen ? closeMenu() : openMenu();
  });
  overlay.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
})();
