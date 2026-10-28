// Arama ve kopyalama. JavaScript kapalıysa site yine tam çalışır.
(function () {
  var norm = function (s) { return (s || '').toLocaleLowerCase('tr').trim(); };

  var list = document.getElementById('skill-list');
  var input = document.getElementById('q');
  var status = document.getElementById('sonuc');
  if (list && input) {
    var cards = Array.prototype.slice.call(list.querySelectorAll('.card'));
    var apply = function (q) {
      var terms = norm(q).split(/\s+/).filter(Boolean);
      var shown = 0;
      cards.forEach(function (c) {
        var hay = c.getAttribute('data-search') || '';
        var ok = terms.every(function (t) { return hay.indexOf(t) !== -1; });
        c.hidden = !ok;
        if (ok) shown++;
      });
      if (status) {
        status.textContent = terms.length
          ? (shown ? shown + ' skill bulundu.' : 'Sonuç yok. Farklı bir kelime dene ya da yeni bir skill öner.')
          : '';
      }
    };
    var initial = new URLSearchParams(window.location.search).get('q');
    if (initial) { input.value = initial; apply(initial); }
    input.addEventListener('input', function () { apply(input.value); });
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    if (!navigator.clipboard) return;
    btn.hidden = false;
    btn.addEventListener('click', function () {
      var el = document.querySelector(btn.getAttribute('data-copy'));
      if (!el) return;
      navigator.clipboard.writeText(el.textContent).then(function () {
        var old = btn.textContent;
        btn.textContent = 'Kopyalandı';
        setTimeout(function () { btn.textContent = old; }, 1600);
      });
    });
  });
})();
