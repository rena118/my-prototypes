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
      applyEnd: '2026 年 9 月 20 日', cd: [3, 8, 24, 36], state: 'open', term: CURRENT_TERM,
      events: [
        { md: '10.23', wd: '周四', title: '校园友谊赛', time: '16:20', venue: '西操场' },
        { md: '10.30', wd: '周四', title: '日常训练', time: '16:20', venue: '西操场' },
        { md: '11.06', wd: '周四', title: '校际交流赛', time: '15:00', venue: '东操场' }
      ],
      showcase: {
        works: [
          { title: '校运会入场式集锦', creators: '赵子安、陈牧', desc: '记录社团在校运会开幕式上的方阵与助威瞬间。', image: 'assets/poster-football.jpg' },
          { title: '训练日常纪实', creators: '王昱', desc: '一次完整训练课的跟拍，从热身到分组对抗。', image: 'assets/poster-robot.jpg' }
        ],
        honors: [
          { title: '校园足球联赛亚军', receivedAt: '2026 年 6 月', desc: '在 2025-2026 学年校园足球联赛中获得亚军。', image: 'assets/poster-football.jpg' }
        ]
      }
    },
    {
      id: 'drama', name: '光影戏剧社', category: '艺术', cover: 'drama',
      captain: '李若彤', contact: '139 0000 1860', capacity: 24, members: 24,
      short: '从剧本、表演到舞台设计，共同完成一场属于学生的校园演出。',
      recruitment: '欢迎表演、编剧、灯光与舞美方向的同学。',
      intro: '光影戏剧社由一群热爱舞台的同学组成，从剧本创作、表演排练到灯光舞美，全部由学生自主完成。',
      applyEnd: '2026 年 9 月 20 日', cd: [3, 8, 24, 36], state: 'full', term: CURRENT_TERM,
      events: [
        { md: '10.25', wd: '周六', title: '剧本围读', time: '15:30', venue: '报告厅' },
        { md: '11.01', wd: '周六', title: '片段排练', time: '15:30', venue: '报告厅' }
      ],
      showcase: {
        works: [
          { title: '校园短剧《回声》', creators: '李若彤、陈牧', desc: '原创校园题材短剧，2026 春季戏剧周演出。', image: 'assets/poster-drama.jpg' }
        ],
        honors: [
          { title: '校园戏剧周最佳剧目', receivedAt: '2026 年 5 月', desc: '原创剧目《回声》获评最佳剧目。', image: 'assets/poster-drama.jpg' }
        ]
      }
    },
    {
      id: 'reading', name: '山海阅读会', category: '人文', cover: 'reading',
      captain: '周予安', contact: '137 0000 2648', capacity: 36, members: 21,
      short: '一起读、一起聊，从一本书延伸到更广阔的世界。',
      recruitment: '愿意稳定参加共读与分享活动。',
      intro: '山海阅读会希望把阅读变成一件可以分享的事。每两周一次共读，由成员轮流领读，并在学期末整理共读手记。',
      applyEnd: '2026 年 9 月 20 日', cd: null, state: 'closed', term: CURRENT_TERM,
      events: [
        { md: '10.27', wd: '周一', title: '共读分享', time: '12:30', venue: '图书馆 302' }
      ],
      showcase: {
        works: [
          { title: '共读手记 · 第一辑', creators: '周予安、林知夏', desc: '收录本学期前四次共读的读书笔记与讨论摘录。', image: 'assets/poster-reading.jpg' }
        ],
        honors: [
          { title: '校园阅读推广优秀社团', receivedAt: '2026 年 6 月', desc: '因持续开展共读活动获评优秀社团。', image: 'assets/poster-reading.jpg' }
        ]
      }
    },
    {
      id: 'documentary', name: '校园纪录片社', category: '艺术', cover: 'drama',
      captain: '林小薇', contact: '139 1102 3344', capacity: 20, members: 12,
      short: '记录校园真实故事，学习拍摄与剪辑技巧，创作微纪录片并举办期末放映会。',
      recruitment: '欢迎对纪实摄影、视频剪辑与故事采写感兴趣的同学。',
      intro: '校园纪录片社用镜头记录真实的校园故事，成员在拍摄、采访与剪辑中完成属于自己的微纪录片。',
      applyEnd: '2026 年 9 月 20 日', cd: [3, 8, 24, 36], state: 'open', term: CURRENT_TERM,
      events: [
        { md: '10.25', wd: '周六', title: '初剪沟通会', time: '15:30', venue: '影媒工作间 204' },
        { md: '11.08', wd: '周六', title: '外拍实践', time: '09:00', venue: '校园内' }
      ],
      showcase: {
        works: [
          { title: '微纪录片《早读之前》', creators: '林小薇、沈清越', desc: '记录清晨校园里最早开始工作的一群人。', image: 'assets/poster-drama.jpg' }
        ],
        honors: [
          { title: '校园影像展优秀作品', receivedAt: '2026 年 6 月', desc: '《早读之前》入选校园影像展优秀作品。', image: 'assets/poster-drama.jpg' }
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
