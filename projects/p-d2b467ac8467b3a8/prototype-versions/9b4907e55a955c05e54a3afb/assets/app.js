(function () {
  var ICONS = {
    home: '<path d="M3.5 10.4 12 3.5l8.5 6.9"/><path d="M5.6 9.6V19a1.4 1.4 0 0 0 1.4 1.4h3.1v-5.2h3.8v5.2H17a1.4 1.4 0 0 0 1.4-1.4V9.6"/>',
    plaza: '<circle cx="12" cy="12" r="8.5"/><path d="m15.2 8.8-1.9 4.4-4.5 2 1.9-4.4 4.5-2Z"/>',
    declaration: '<path d="M13.5 3.5H7.2a1.7 1.7 0 0 0-1.7 1.7v13.6a1.7 1.7 0 0 0 1.7 1.7h9.6a1.7 1.7 0 0 0 1.7-1.7V8.5l-5-5Z"/><path d="M13.2 3.6v5.1h5"/><path d="M12 12.4v4.2M9.9 14.5h4.2"/>',
    joined: '<path d="M4.5 8.4h15v9.9a1.7 1.7 0 0 1-1.7 1.7H6.2a1.7 1.7 0 0 1-1.7-1.7V8.4Z"/><path d="M8.2 8.4V6.6a3.8 3.8 0 0 1 7.6 0v1.8"/>',
    manage: '<rect x="3.6" y="7.6" width="16.8" height="12" rx="2"/><path d="M8.6 7.6V5.4a1.6 1.6 0 0 1 1.6-1.6h3.6a1.6 1.6 0 0 1 1.6 1.6v2.2"/><path d="M3.6 12.6h16.8"/>',
    report: '<path d="M4.2 20V4.6"/><path d="M4.2 19.9h15.6"/><rect x="7" y="12.4" width="3.2" height="5.6" rx="0.8"/><rect x="12.4" y="8.6" width="3.2" height="9.4" rx="0.8"/><rect x="17.6" y="5.6" width="2.2" height="12.4" rx="0.8"/>'
  };

  var TABS = [
    { key: 'home', label: '首页', href: 'index.html', icon: ICONS.home },
    { key: 'plaza', label: '社团广场', icon: ICONS.plaza, toast: '社团广场页面建设中' },
    { key: 'declaration', label: '社团申报', href: 'declarations.html', icon: ICONS.declaration },
    { key: 'joined', label: '我报名的', icon: ICONS.joined, toast: '我报名的页面建设中' },
    { key: 'manage', label: '我管理的', icon: ICONS.manage, toast: '我管理的页面建设中' },
    { key: 'report', label: '社团报告', icon: ICONS.report, toast: '社团报告页面建设中' }
  ];

  var STATUS_BAR =
    '<span>9:41</span>' +
    '<span class="island"></span>' +
    '<span class="status-icons">' +
      '<svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" aria-hidden="true">' +
        '<rect x="0" y="7" width="2.4" height="4" rx="1"/><rect x="4" y="5" width="2.4" height="6" rx="1"/>' +
        '<rect x="8" y="3" width="2.4" height="8" rx="1"/><rect x="12" y="0.5" width="2.4" height="10.5" rx="1"/>' +
      '</svg>' +
      '<svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" aria-hidden="true">' +
        '<path d="M7.5 10.2 5.3 7.7a3.3 3.3 0 0 1 4.4 0L7.5 10.2Z"/>' +
        '<path d="M3.1 5.4a6.4 6.4 0 0 1 8.8 0l-1.2 1.3a4.7 4.7 0 0 0-6.4 0L3.1 5.4Z"/>' +
        '<path d="M.9 3a9.4 9.4 0 0 1 13.2 0l-1.2 1.3a7.7 7.7 0 0 0-10.8 0L.9 3Z"/>' +
      '</svg>' +
      '<svg width="22" height="11" viewBox="0 0 22 11" fill="none" aria-hidden="true">' +
        '<rect x="0.5" y="0.5" width="18" height="10" rx="3" stroke="currentColor" stroke-opacity="0.4"/>' +
        '<rect x="2" y="2" width="13" height="7" rx="2" fill="currentColor"/>' +
        '<path d="M20.5 4v3c.8-.3 1.3-.8 1.3-1.5S21.3 4.3 20.5 4Z" fill="currentColor" fill-opacity="0.4"/>' +
      '</svg>' +
    '</span>';

  document.querySelectorAll('[data-status-bar]').forEach(function (node) {
    node.innerHTML = STATUS_BAR;
  });

  document.querySelectorAll('[data-tabbar]').forEach(function (nav) {
    var active = nav.getAttribute('data-tabbar');
    nav.innerHTML = TABS.map(function (tab) {
      var cls = 'tab-item' + (tab.key === active ? ' active' : '');
      var inner =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        tab.icon + '</svg><span>' + tab.label + '</span>';
      if (tab.href) {
        return '<a class="' + cls + '" href="' + tab.href + '">' + inner + '</a>';
      }
      return '<button type="button" class="' + cls + '" data-toast="' + tab.toast + '">' + inner + '</button>';
    }).join('');
  });

  var toastEl = null;
  var toastTimer = null;

  function toast(message) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      var screen = document.querySelector('.phone-screen');
      (screen || document.body).appendChild(toastEl);
    }
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 1900);
  }

  window.protoToast = toast;

  document.addEventListener('click', function (event) {
    var target = event.target.closest ? event.target.closest('[data-toast]') : null;
    if (!target) return;
    if (target.tagName === 'A') event.preventDefault();
    toast(target.getAttribute('data-toast'));
  });

  var PHONE_W = 375;
  var PHONE_H = 812;

  function fitPhone() {
    var phone = document.querySelector('.phone');
    if (!phone) return;
    var scale = Math.min(1, (window.innerWidth - 16) / PHONE_W, (window.innerHeight - 16) / PHONE_H);
    phone.style.transform = scale < 1 ? 'scale(' + scale.toFixed(4) + ')' : '';
  }

  window.addEventListener('resize', fitPhone);
  window.addEventListener('orientationchange', fitPhone);
  fitPhone();
})();
