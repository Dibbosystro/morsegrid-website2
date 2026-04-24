(function () {
  var dds = document.querySelectorAll('.nav-dropdown');
  dds.forEach(function (dd) {
    dd.addEventListener('mouseenter', function () { dd.classList.add('open'); });
    dd.addEventListener('mouseleave', function () { dd.classList.remove('open'); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') dds.forEach(function (d) { d.classList.remove('open'); });
  });
})();
