(function () {
  var CURRENT_TERM = '2026-2027 学年上学期';

  var COVERS = {
    reading: 'assets/poster-reading.jpg',
    drama: 'assets/poster-drama.jpg',
    football: 'assets/poster-football.jpg',
    robot: 'assets/poster-robot.jpg'
  };

  var CLUBS = [
    {
      id: 'football', name: '足球联盟', category: '体育', cover: 'football',
      captain: '赵子安', contact: '138 0000 9218', capacity: 30, members: 18,
      short: '面向喜欢足球的同学，开展日常训练、友谊赛和校园足球活动。',
      recruitment: '有基础或愿意长期参加训练的同学均可申请。',
      intro: '足球联盟是学校历史最久的体育社团之一，面向全校喜欢足球的同学开放。社团每周安排固定训练，并组织校内友谊赛与校际交流赛。',
      plan: '每周四开展常规训练，学期内组织校园友谊赛与校际交流赛，学期末进行队内总结赛。',
      applyEnd: '2026 年 9 月 20 日', cd: [3, 8, 24, 36], state: 'open', term: CURRENT_TERM,
      events: [
        { md: '10.23', wd: '周四', title: '校园友谊赛', time: '16:20-18:00', venue: '西操场' },
        { md: '10.30', wd: '周四', title: '日常训练', time: '16:20-18:00', venue: '西操场' },
        { md: '11.06', wd: '周四', title: '校际交流赛', time: '15:00-17:00', venue: '东操场' },
        { md: '11.13', wd: '周四', title: '日常训练', time: '16:20-18:00', venue: '西操场' },
        { md: '11.20', wd: '周四', title: '队内对抗赛', time: '16:20-18:00', venue: '西操场' }
      ],
      showcase: {
        works: [
          { title: '校运会入场式集锦', creators: '赵子安、陈牧', desc: '记录社团在校运会开幕式上的方阵与助威瞬间。', photos: ['assets/poster-football.jpg', 'assets/work-football-2.jpg', 'assets/work-football-3.jpg'], uploader: '赵子安', uploadedAt: '10-20 16:40' },
          { title: '训练日常纪实', creators: '王昱', desc: '一次完整训练课的跟拍，从热身到分组对抗。', photos: ['assets/work-football-2.jpg'], video: { poster: 'assets/poster-football.jpg', duration: 5 }, uploader: '赵子安', uploadedAt: '10-18 09:12' }
        ],
        honors: [
          { title: '校园足球联赛亚军', receivedAt: '2026-06-20', desc: '在 2025-2026 学年校园足球联赛中获得亚军。', photos: ['assets/work-football-3.jpg', 'assets/work-football-2.jpg', 'assets/poster-football.jpg'], uploader: '赵子安', uploadedAt: '06-28 20:15' }
        ]
      }
    },
    {
      id: 'drama', name: '光影戏剧社', category: '艺术', cover: 'drama',
      captain: '李若彤', contact: '139 0000 1860', capacity: 24, members: 24,
      short: '从剧本、表演到舞台设计，共同完成一场属于学生的校园演出。',
      recruitment: '欢迎表演、编剧、灯光与舞美方向的同学。',
      intro: '光影戏剧社由一群热爱舞台的同学组成，从剧本创作、表演排练到灯光舞美，全部由学生自主完成。',
      plan: '每周六开展剧本围读与片段排练，学期末完成舞台走位、全剧联排与校内展演。',
      applyEnd: '2026 年 9 月 20 日', cd: [3, 8, 24, 36], state: 'full', term: CURRENT_TERM,
      events: [
        { md: '10.25', wd: '周六', title: '剧本围读', time: '15:30-17:30', venue: '报告厅' },
        { md: '11.01', wd: '周六', title: '片段排练', time: '15:30-17:30', venue: '报告厅' },
        { md: '11.08', wd: '周六', title: '舞台走位', time: '14:00-17:00', venue: '报告厅' },
        { md: '11.15', wd: '周六', title: '全剧联排', time: '14:00-17:00', venue: '报告厅' },
        { md: '11.22', wd: '周六', title: '校内展演', time: '19:00-20:30', venue: '报告厅' }
      ],
      showcase: {
        works: [
          { title: '校园短剧《回声》', creators: '李若彤、陈牧', desc: '原创校园题材短剧，2026 春季戏剧周演出。', photos: ['assets/poster-drama.jpg'], uploader: '李若彤', uploadedAt: '05-18 10:26' }
        ],
        honors: [
          { title: '校园戏剧周最佳剧目', receivedAt: '2026-05-16', desc: '原创剧目《回声》获评最佳剧目。', photos: ['assets/poster-drama.jpg'], uploader: '李若彤', uploadedAt: '05-22 14:05' }
        ]
      }
    },
    {
      id: 'reading', name: '山海阅读会', category: '人文', cover: 'reading',
      captain: '周予安', contact: '137 0000 2648', capacity: 36, members: 21,
      short: '一起读、一起聊，从一本书延伸到更广阔的世界。',
      recruitment: '愿意稳定参加共读与分享活动。',
      intro: '山海阅读会希望把阅读变成一件可以分享的事。每两周一次共读，由成员轮流领读，并在学期末整理共读手记。',
      plan: '每两周一次共读分享，学期末整理共读手记并完成一次主题分享。',
      applyEnd: '2026 年 9 月 20 日', cd: null, state: 'closed', term: CURRENT_TERM,
      events: [
        { md: '10.27', wd: '周一', title: '共读分享', time: '12:30-13:20', venue: '图书馆 302' },
        { md: '11.03', wd: '周一', title: '共读分享', time: '12:30-13:20', venue: '图书馆 302' },
        { md: '11.10', wd: '周一', title: '主题分享', time: '12:30-13:20', venue: '图书馆 302' },
        { md: '11.17', wd: '周一', title: '共读分享', time: '12:30-13:20', venue: '图书馆 302' },
        { md: '11.24', wd: '周一', title: '学期手记整理', time: '12:30-13:20', venue: '图书馆 302' }
      ],
      showcase: {
        works: [
          { title: '共读手记 · 第一辑', creators: '周予安、林知夏', desc: '收录本学期前四次共读的读书笔记与讨论摘录。', photos: ['assets/poster-reading.jpg'], uploader: '周予安', uploadedAt: '06-12 21:08' }
        ],
        honors: [
          { title: '校园阅读推广优秀社团', receivedAt: '2026-06-10', desc: '因持续开展共读活动获评优秀社团。', photos: ['assets/poster-reading.jpg'], uploader: '周予安', uploadedAt: '06-15 09:40' }
        ]
      }
    },
    {
      id: 'documentary', name: '校园纪录片社', category: '艺术', cover: 'drama',
      captain: '林小薇', contact: '139 1102 3344', capacity: 20, members: 12,
      short: '记录校园真实故事，学习拍摄与剪辑技巧，创作微纪录片并举办期末放映会。',
      recruitment: '欢迎对纪实摄影、视频剪辑与故事采写感兴趣的同学。',
      intro: '校园纪录片社用镜头记录真实的校园故事，成员在拍摄、采访与剪辑中完成属于自己的微纪录片。',
      plan: '拍摄两部校园人物志微纪录片，学期末举行公开放映交流。',
      applyEnd: '2026 年 9 月 20 日', cd: [3, 8, 24, 36], state: 'open', term: CURRENT_TERM,
      events: [
        { md: '10.25', wd: '周六', title: '初剪沟通会', time: '15:30-17:00', venue: '影媒工作间 204' },
        { md: '11.08', wd: '周六', title: '外拍实践', time: '09:00-12:00', venue: '校园内' },
        { md: '11.15', wd: '周六', title: '素材整理', time: '15:30-17:00', venue: '影媒工作间 204' },
        { md: '11.22', wd: '周六', title: '剪辑工作坊', time: '15:30-17:00', venue: '影媒工作间 204' },
        { md: '11.29', wd: '周六', title: '期末放映会', time: '18:30-20:00', venue: '报告厅' }
      ],
      showcase: {
        works: [
          { title: '微纪录片《早读之前》', creators: '林小薇、沈清越', desc: '记录清晨校园里最早开始工作的一群人。', photos: ['assets/poster-drama.jpg'], uploader: '林小薇', uploadedAt: '09-26 18:30' }
        ],
        honors: [
          { title: '校园影像展优秀作品', receivedAt: '2026-06-24', desc: '《早读之前》入选校园影像展优秀作品。', photos: ['assets/poster-drama.jpg'], uploader: '林小薇', uploadedAt: '06-30 11:20' }
        ]
      }
    }
  ];

  var JOIN_KEY = 'proto-student-my-join';
  var DEFAULT_JOIN = { documentary: true };

  function getJoin() {
    try {
      var raw = window.localStorage.getItem(JOIN_KEY);
      if (!raw) return Object.assign({}, DEFAULT_JOIN);
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : Object.assign({}, DEFAULT_JOIN);
    } catch (error) {
      return Object.assign({}, DEFAULT_JOIN);
    }
  }

  function setJoin(map) {
    try {
      window.localStorage.setItem(JOIN_KEY, JSON.stringify(map));
    } catch (error) {
      /* 嵌入态下存储可能不可用，原型内状态以当前页为准 */
    }
  }

  window.PLAZA = {
    CURRENT_TERM: CURRENT_TERM,
    COVERS: COVERS,
    CLUBS: CLUBS,
    getJoin: getJoin,
    setJoin: setJoin,
    find: function (id) {
      return CLUBS.filter(function (club) { return club.id === id; })[0] || null;
    }
  };
})();
