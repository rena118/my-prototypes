(function () {
  var CLOCK = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M12 7.6V12l3 1.8"/></svg>';
  var PIN = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.4s6.2-5.4 6.2-10.2A6.2 6.2 0 0 0 5.8 10.2C5.8 15 12 20.4 12 20.4Z"/><circle cx="12" cy="10" r="2.2"/></svg>';
  var GRID = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3.4" y="3.4" width="7.2" height="7.2" rx="1.8"/><rect x="13.4" y="3.4" width="7.2" height="7.2" rx="1.8"/><rect x="3.4" y="13.4" width="7.2" height="7.2" rx="1.8"/><rect x="13.4" y="13.4" width="7.2" height="7.2" rx="1.8"/></svg>';
  var EDIT = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M15.6 4.6a2 2 0 0 1 2.8 2.8L8.2 17.6l-3.6 1 1-3.6Z"/><path d="m13.8 6.4 2.8 2.8"/></svg>';
  var CHECK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.6 4.4 4.4L19 7.4"/></svg>';
  var DOC = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.6h7.4L18 8.2v12.2H6Z"/><path d="M13.2 3.8v4.6h4.6"/><path d="M8.8 13.2h6.4M8.8 16.4h4.6"/></svg>';
  var TRASH = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4.6 6.8h14.8"/><path d="M9 6.8V4.6h6v2.2"/><path d="M6.6 6.8 7.4 20h9.2l.8-13.2"/></svg>';

  var ctx = null;
  var refs = null;
  var currentIndex = -1;

  function statusClass(value) {
    if (value === '待开展') return 'upcoming';
    if (value === '进行中') return 'ongoing';
    return 'ended';
  }

  function attendanceDone(activity) {
    if (activity.attendanceDone != null) return activity.attendanceDone;
    return activity.state !== '待开展' && activity.attendance.indexOf('待') === -1 && activity.attendance.indexOf('应到') === -1;
  }

  function recordDone(activity) {
    if (activity.recordDone != null) return activity.recordDone;
    return activity.record === '已填活动记录';
  }

  function opRow(action, label, icon, extraClass) {
    return '<button type="button" class="ad-op' + (extraClass || '') + '" data-act="' + action + '">' +
        '<span class="ad-op-icon">' + icon + '</span>' +
        '<span class="ad-op-label">' + label + '</span>' +
      '</button>';
  }

  // 区块外壳：统一的小标题 + 卡片内容
  function section(title, inner) {
    return '<section class="ad-sec"><h3>' + title + '</h3><div class="ad-sec-body">' + inner + '</div></section>';
  }

  function render(index) {
    var club = ctx && ctx.getClub();
    if (!club) return;
    var activity = club.activities[index];
    if (!activity) return;
    currentIndex = index;

    var isUpcoming = activity.state === '待开展';
    var aDone = attendanceDone(activity);
    var rDone = recordDone(activity);
    var shareCount = window.StudentMoments.posts(activity.id).length;

    // 详情页「活动管理」按钮：待开展=编辑/删除；待点名=编辑；已点名待填=编辑/修改考勤；已点名已填=编辑/修改考勤/修改记录
    var ops = [];
    var archived = ctx.isArchived ? ctx.isArchived() : false;
    if (!archived) {
      ops.push(opRow('activity:edit', '编辑活动', EDIT));
      if (isUpcoming) {
        ops.push(opRow('activity:delete', '删除活动', TRASH, ' is-danger'));
      } else if (aDone) {
        ops.push(opRow('activity:attendance', '修改考勤', CHECK));
        if (rDone) ops.push(opRow('activity:record', '修改记录', DOC));
      }
    }

    var basicInner = '<p class="ad-sec-text">' + (activity.desc || '暂无活动说明') + '</p>' +
      (activity.attachment
        ? '<div class="ad-attach">' +
            '<span class="ad-attach-icon">PDF</span>' +
            '<div class="ad-attach-main"><strong>' + activity.attachment + '</strong><span>活动附件</span></div>' +
          '</div>'
        : '');
    var attendanceInner = '<p class="ad-sec-text">' + (activity.attendance || '暂无考勤记录') + '</p>';
    var recordInner = '<p class="ad-sec-text">' + (activity.record || '暂无活动记录') + '</p>' +
      (activity.recordText ? '<p class="ad-sec-note">' + activity.recordText + '</p>' : '');

    refs.content.innerHTML =
      '<div class="ad-hero">' +
        '<div class="ad-hero-top">' +
          '<em class="state-em ' + statusClass(activity.state) + '">' + activity.state + '</em>' +
          '<span class="ad-hero-day">' + activity.day + ' ' + activity.week + '</span>' +
        '</div>' +
        '<h2>' + activity.title + '</h2>' +
        '<div class="ad-hero-meta">' +
          '<span>' + CLOCK + activity.time + '</span>' +
          '<span>' + PIN + activity.venue + '</span>' +
        '</div>' +
      '</div>' +
      section('活动说明及附件', basicInner) +
      section('考勤记录', attendanceInner) +
      section('活动记录', recordInner) +
      (ops.length
        ? '<section class="ad-ops">' +
            '<h3>活动管理</h3>' +
            '<div class="ad-ops-grid">' + ops.join('') + '</div>' +
          '</section>'
        : '');

    refs.bar.innerHTML =
      '<button type="button" class="btn btn-primary ad-moments-btn" data-ap="moments">' + GRID + '查看活动瞬间（' + shareCount + '）</button>';
    refs.bar.hidden = false;
  }

  function open(index) {
    if (!refs) return;
    render(index);
    refs.host.hidden = false;
    refs.host.classList.remove('show');
    void refs.host.offsetWidth;
    refs.host.classList.add('show');
    refs.content.scrollTop = 0;
  }

  function close() {
    if (!refs || refs.host.hidden) return;
    refs.host.classList.remove('show');
    currentIndex = -1;
    window.setTimeout(function () {
      if (refs.host.classList.contains('show')) return;
      refs.host.hidden = true;
      refs.content.innerHTML = '';
      refs.bar.innerHTML = '';
      refs.bar.hidden = true;
    }, 260);
  }

  function refresh() {
    if (!refs || refs.host.hidden || currentIndex < 0) return;
    render(currentIndex);
  }

  function init(options) {
    ctx = options || {};
    refs = {
      host: document.getElementById('activityPage'),
      content: document.getElementById('activityPageContent'),
      bar: document.getElementById('activityPageBar')
    };
    if (!refs.host) return;

    document.addEventListener('click', function (event) {
      var el = event.target.closest('[data-ap]');
      if (!el) return;
      var act = el.getAttribute('data-ap');
      if (act === 'back') {
        close();
        return;
      }
      if (act === 'moments') {
        var club = ctx.getClub();
        var activity = club && club.activities[currentIndex];
        if (!activity) return;
        location.href = 'activity-moments.html?id=' + encodeURIComponent(activity.id) + '&from=' + encodeURIComponent(ctx.from || 'manage');
      }
    });
  }

  window.ActivityPage = { init: init, open: open, close: close, refresh: refresh };
})();
