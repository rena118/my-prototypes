(function () {
  var ICONS = {
    clubs: '<circle cx="9.2" cy="8.6" r="3.1"/><path d="M3.6 19.4a5.6 5.6 0 0 1 11.2 0"/><path d="M16.4 6.3a2.9 2.9 0 0 1 0 5.8"/><path d="M17.6 13.8a4.4 4.4 0 0 1 2.8 4.1"/>',
    review: '<rect x="4.4" y="3.6" width="15.2" height="16.8" rx="2.4"/><path d="M8.4 8.4h7.2M8.4 12h7.2M8.4 15.6h4.4"/>',
    credits: '<circle cx="12" cy="9.4" r="5"/><path d="m9.6 13.8-1.2 6 3.6-2 3.6 2-1.2-6"/><path d="m10.4 9.2 1.3 1.4 2.2-2.4"/>',
    report: '<path d="M4.2 20V4.6"/><path d="M4.2 19.9h15.6"/><rect x="7" y="12.4" width="3.2" height="5.6" rx="0.8"/><rect x="12.4" y="8.6" width="3.2" height="9.4" rx="0.8"/><rect x="17.6" y="5.6" width="2.2" height="12.4" rx="0.8"/>'
  };

  var TABS = [
    { key: 'clubs', label: '社团', href: 'clubs.html', icon: ICONS.clubs },
    { key: 'review', label: '社团审核', href: 'applications.html', icon: ICONS.review, dot: true },
    { key: 'credits', label: '学分审核', href: 'credits.html', icon: ICONS.credits, dot: true },
    { key: 'report', label: '分析报告', href: 'report.html', icon: ICONS.report }
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

  var CAPSULE =
    '<div class="mp-capsule" aria-hidden="true">' +
      '<span class="mp-capsule-dots"><i></i><i></i><i></i></span>' +
      '<span class="mp-capsule-divider"></span>' +
      '<span class="mp-capsule-circle"></span>' +
    '</div>';

  document.querySelectorAll('.nav-bar').forEach(function (nav) {
    if (nav.querySelector('.mp-capsule')) return;
    nav.insertAdjacentHTML('beforeend', CAPSULE);
  });

  /* ---------- 小程序底部弹层选择器（替代原生 select） ---------- */
  function buildPicker() {
    var host = document.querySelector('.phone-screen') || document.body;
    var mask = document.createElement('div');
    mask.className = 'mp-picker-mask';
    mask.innerHTML =
      '<div class="mp-picker-sheet">' +
        '<div class="mp-picker-head">' +
          '<button type="button" class="mp-picker-cancel">取消</button>' +
          '<span class="mp-picker-title"></span>' +
          '<button type="button" class="mp-picker-done">完成</button>' +
        '</div>' +
        '<div class="mp-picker-list"></div>' +
      '</div>';
    host.appendChild(mask);
    return mask;
  }

  function upgradeSelect(select) {
    if (select.dataset.mpPickerReady) return;
    select.dataset.mpPickerReady = '1';

    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = select.className + ' mp-picker-trigger';
    select.style.display = 'none';
    select.parentNode.insertBefore(trigger, select.nextSibling);

    var mask = null;
    var tempIndex = 0;
    var options = function () {
      return Array.prototype.slice.call(select.options);
    };

    function syncLabel() {
      var opts = options();
      var current = opts.filter(function (o) { return o.value === select.value; })[0];
      var placeholder = opts.filter(function (o) { return o.value === ''; })[0];
      var empty = !current || current.value === '';
      trigger.textContent = empty
        ? (placeholder ? placeholder.textContent : (opts[0] ? opts[0].textContent : '请选择'))
        : current.textContent;
      trigger.classList.toggle('is-placeholder', empty);
    }

    function close() {
      if (mask) mask.classList.remove('show');
    }

    function commit(index) {
      var opts = (mask && mask._opts) || [];
      var target = opts[index];
      if (!target) return close();
      select.value = target.value;
      syncLabel();
      select.dispatchEvent(new Event('change', { bubbles: true }));
      close();
    }

    function open() {
      if (!mask) {
        mask = buildPicker();
        mask.addEventListener('click', function (event) {
          if (event.target === mask) return close();
          var option = event.target.closest('.mp-picker-option');
          if (option) return commit(Number(option.getAttribute('data-index')));
          if (event.target.closest('.mp-picker-cancel')) return close();
          if (event.target.closest('.mp-picker-done')) return commit(tempIndex);
        });
      }
      var list = mask.querySelector('.mp-picker-list');
      mask.querySelector('.mp-picker-title').textContent = select.getAttribute('data-picker-title') || '请选择';
      var opts = options().filter(function (o) { return o.value !== ''; });
      tempIndex = 0;
      opts.forEach(function (o, i) { if (o.value === select.value) tempIndex = i; });
      list.innerHTML = opts.map(function (o, i) {
        return '<button type="button" class="mp-picker-option' + (i === tempIndex ? ' selected' : '') +
          '" data-index="' + i + '">' + o.textContent + '</button>';
      }).join('');
      mask._opts = opts;
      requestAnimationFrame(function () { mask.classList.add('show'); });
    }

    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      open();
    });

    select._mpSync = syncLabel;
    syncLabel();
  }

  document.querySelectorAll('select[data-mp-picker]').forEach(upgradeSelect);

  window.protoSyncPickers = function () {
    document.querySelectorAll('select[data-mp-picker]').forEach(function (select) {
      if (select._mpSync) select._mpSync();
    });
  };

  document.querySelectorAll('[data-tabbar]').forEach(function (nav) {
    var active = nav.getAttribute('data-tabbar');
    nav.innerHTML = TABS.map(function (tab) {
      var cls = 'tab-item' + (tab.key === active ? ' active' : '');
      var inner =
        '<span class="tab-ico">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + tab.icon + '</svg>' +
          (tab.dot ? '<i class="tab-dot" aria-hidden="true"></i>' : '') +
        '</span>' +
        '<span>' + tab.label + '</span>';
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

  /* ---------- 通用底部弹层 ---------- */
  var sheetMask = null;
  var sheetCallback = null;

  function ensureSheet() {
    if (sheetMask) return sheetMask;
    var host = document.querySelector('.phone-screen') || document.body;
    sheetMask = document.createElement('div');
    sheetMask.className = 'mp-sheet-mask';
    sheetMask.innerHTML =
      '<div class="mp-sheet" role="dialog" aria-modal="true">' +
        '<div class="mp-sheet-handle"></div>' +
        '<div class="mp-sheet-head">' +
          '<span class="mp-sheet-title"></span>' +
          '<button type="button" class="mp-sheet-close" aria-label="关闭">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="mp-sheet-body"></div>' +
        '<div class="mp-sheet-foot" hidden></div>' +
      '</div>';
    host.appendChild(sheetMask);
    sheetMask.addEventListener('click', function (event) {
      if (event.target === sheetMask) return closeSheet();
      if (event.target.closest('.mp-sheet-close')) return closeSheet();
    });
    return sheetMask;
  }

  function closeSheet() {
    if (sheetMask) sheetMask.classList.remove('show');
  }

  window.protoSheet = function (options) {
    var mask = ensureSheet();
    mask.querySelector('.mp-sheet-title').textContent = options.title || '';
    mask.querySelector('.mp-sheet-body').innerHTML = options.body || '';
    var foot = mask.querySelector('.mp-sheet-foot');
    if (options.footer) {
      foot.innerHTML = options.footer;
      foot.hidden = false;
    } else {
      foot.innerHTML = '';
      foot.hidden = true;
    }
    mask.classList.toggle('tall', !!options.tall);
    requestAnimationFrame(function () { mask.classList.add('show'); });
    if (options.onMount) options.onMount(mask);
  };

  window.protoCloseSheet = closeSheet;

  window.protoConfirm = function (title, message, onConfirm) {
    window.protoSheet({
      title: title,
      body: '<p class="t-confirm-text">' + message + '</p>',
      footer: '<div class="sheet-foot-actions">' +
        '<button type="button" class="btn btn-secondary" data-sheet-close>取消</button>' +
        '<button type="button" class="btn btn-primary danger" data-sheet-ok>确认</button>' +
      '</div>'
    });
    sheetCallback = onConfirm;
  };

  document.addEventListener('click', function (event) {
    if (event.target.closest('[data-sheet-close]')) return closeSheet();
    if (event.target.closest('[data-sheet-ok]')) {
      closeSheet();
      if (sheetCallback) sheetCallback();
      return;
    }
  });

  var PHONE_W = 375;
  var PHONE_H = 812;

  var embedded = false;
  try {
    embedded = window.self !== window.top;
  } catch (error) {
    embedded = true;
  }
  if (embedded) document.documentElement.classList.add('embedded');

  function fitPhone() {
    if (embedded) return;
    var phone = document.querySelector('.phone');
    if (!phone) return;
    var scale = Math.min(1, (window.innerWidth - 16) / PHONE_W, (window.innerHeight - 16) / PHONE_H);
    phone.style.transform = scale < 1 ? 'scale(' + scale.toFixed(4) + ')' : '';
  }

  window.addEventListener('resize', fitPhone);
  window.addEventListener('orientationchange', fitPhone);
  fitPhone();
})();
