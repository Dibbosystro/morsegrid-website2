(function () {
  var dds = document.querySelectorAll('.nav-dropdown');
  dds.forEach(function (dd) {
    var btn = dd.querySelector('.nav-dd-btn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = dd.classList.contains('open');
      dds.forEach(function (d) { d.classList.remove('open'); });
      if (!wasOpen) dd.classList.add('open');
    });
  });
  document.addEventListener('click', function () {
    dds.forEach(function (d) { d.classList.remove('open'); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') dds.forEach(function (d) { d.classList.remove('open'); });
  });
})();
