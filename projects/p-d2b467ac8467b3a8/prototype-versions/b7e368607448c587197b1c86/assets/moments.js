(function () {
  var KEY = 'proto.student.moments.v4';

  var ACTIVITIES = {
    'doc-next': { club: '校园纪录片社', title: '校园人物微纪录片初剪沟通会', status: '待开展', attend: '', when: '10.25 周五 · 15:30 - 17:00 · 影媒工作间 204' },
    'doc-next-2': { club: '校园纪录片社', title: '校园微纪录片补拍分工会', status: '待开展', attend: '', when: '10.30 周三 · 15:30 - 17:00 · 影媒工作间 204' },
    'doc-done': { club: '校园纪录片社', title: '影视摄影构图与手持云台实操训练', status: '已结束', attend: '已出勤', when: '10.18 周五 · 15:30 - 17:00 · 影媒工作间 204' },
    'doc-done-2': { club: '校园纪录片社', title: '纪录片选题与采访提纲工作坊', status: '已结束', attend: '已出勤', when: '10.11 周五 · 15:30 - 17:00 · 影媒工作间 204' },
    'doc-done-3': { club: '校园纪录片社', title: '校园故事采集与分镜设计', status: '已结束', attend: '请假', when: '10.04 周五 · 15:30 - 17:00 · 影媒工作间 204' },
    'reading-next': { club: '山海阅读会', title: '《山海经》异兽想象共读分享', status: '待开展', attend: '', when: '10.27 周日 · 12:30 - 13:30 · 图书馆 302' },
    'reading-done': { club: '山海阅读会', title: '秋日书单交换与主题共读', status: '已结束', attend: '已出勤', when: '10.13 周日 · 12:30 - 13:30 · 图书馆 302' },
    'm1': { club: '足球联盟', title: '校园足球友谊交流赛', status: '待开展', attend: '', when: '10.30 周三 · 16:20 - 17:50 · 西操场 1 号场地' },
    'm2': { club: '足球联盟', title: '周三战术跑位与阵型协同训练', status: '进行中', attend: '', when: '10.23 周三 · 16:20 - 17:40 · 西操场 1 号场地' },
    'm3': { club: '足球联盟', title: '校际交流准备与体能恢复训练', status: '已结束', attend: '已出勤', when: '10.23 周三 · 17:40 - 18:20 · 田径场环形跑道' },
    'm4': { club: '足球联盟', title: '上周三高位逼抢与协防专题演练', status: '已结束', attend: '待补考勤', when: '10.16 周三 · 16:20 - 17:30 · 西操场 2 号场地' },
    'm5': { club: '足球联盟', title: '周三传切配合与攻防转换实训', status: '已结束', attend: '已出勤', when: '10.09 周三 · 16:20 - 17:30 · 西操场 1 号场地' },
    'm6': { club: '足球联盟', title: '新学期基础传接球训练', status: '已结束', attend: '已出勤', when: '09.25 周三 · 16:20 - 17:30 · 西操场 1 号场地' },
    'doc-act-1': { club: '校园纪录片社', title: '校园微纪录片选题研讨与分镜脚本会', status: '待开展', attend: '', when: '10.25 周五 · 15:30 - 17:00 · 影视工作间 204' },
    'doc-act-2': { club: '校园纪录片社', title: '影视摄影构图与手持云台实操训练', status: '已结束', attend: '已出勤', when: '10.18 周五 · 15:30 - 17:00 · 影视工作间 204' }
  };

  var SEED = {
    'doc-next': [
      {
        author: '赵子易', role: '', time: '10-23 18:20',
        text: '第一次跟拍校园人物，从选题到分镜改了三次，今天终于把采访镜头全部拍完。',
        photos: ['assets/poster-drama.jpg', 'assets/work-football-2.jpg', 'assets/work-football-3.jpg'],
        video: null, likes: 12, liked: false,
        comments: [{ author: '林知夏', text: '第三个镜头的构图很好看！', time: '10-23 19:12' }]
      },
      {
        author: '周予安', role: '社长', time: '10-23 18:42',
        text: '给大家演示了一遍手持运镜的走位，课后可以照着这段练习。',
        photos: [], video: { poster: 'assets/poster-football.jpg', duration: 8 },
        likes: 9, liked: false, comments: []
      },
      {
        author: '林知夏', role: '', time: '10-23 19:05',
        text: '收工前拍了一张活动室，傍晚的光线刚刚好。',
        photos: ['assets/poster-reading.jpg'], video: null,
        likes: 5, liked: false, comments: []
      }
    ],
    'reading-next': [
      {
        author: '周予安', role: '社长', time: '10-27 13:05',
        text: '本周共读的异兽插画已经贴在活动室，大家记得来看。',
        photos: ['assets/poster-reading.jpg'], video: null,
        likes: 6, liked: false, comments: []
      }
    ],
    'm1': [
      {
        author: '顾一然', role: '', time: '10-29 20:15',
        text: '赛前把分组对抗的站位又过了一遍，明天友谊赛加油！',
        photos: ['assets/poster-football.jpg', 'assets/work-football-2.jpg'], video: null,
        likes: 8, liked: false,
        comments: [{ author: '赵子易', text: '明天 16:00 到场热身，别迟到。', time: '10-29 20:40' }]
      },
      {
        author: '赵子易', role: '社长', time: '10-29 21:02',
        text: '友谊赛出场分组和战术要点已上传附件，大家提前看一下。',
        photos: [], video: { poster: 'assets/poster-football.jpg', duration: 6 },
        likes: 11, liked: false, comments: []
      }
    ],
    'm2': [
      {
        author: '张子墨', role: '', time: '10-23 17:12',
        text: '边路快速渗透练了三组，最后一组终于打出配合了。',
        photos: ['assets/work-football-3.jpg'], video: null,
        likes: 5, liked: false, comments: []
      },
      {
        author: '赵子易', role: '社长', time: '10-23 17:26',
        text: '今天的跑位记录一下，下次训练继续按这个节奏。',
        photos: ['assets/work-football-2.jpg', 'assets/poster-football.jpg', 'assets/work-football-3.jpg'], video: null,
        likes: 7, liked: false, comments: []
      }
    ],
    'm3': [
      {
        author: '许嘉禾', role: '', time: '10-23 18:32',
        text: '体能恢复跑完了，拉伸的时候大家记得互相帮忙压腿。',
        photos: ['assets/poster-football.jpg'], video: null,
        likes: 4, liked: false, comments: []
      }
    ],
    'm4': [],
    'm5': [],
    'm6': [],
    'doc-act-1': [
      {
        author: '林小薇', role: '社长', time: '10-25 17:05',
        text: '选题会定下了「十一校园的一天」三个方向，分镜稿下周带来。',
        photos: ['assets/poster-drama.jpg'], video: null,
        likes: 6, liked: false, comments: []
      }
    ],
    'doc-act-2': [
      {
        author: '陈闻远', role: '', time: '10-18 17:08',
        text: '第一次用稳定器跟拍，走位还是有点抖，课后继续练。',
        photos: ['assets/poster-drama.jpg', 'assets/work-football-2.jpg'], video: null,
        likes: 9, liked: false, comments: []
      },
      {
        author: '林小薇', role: '社长', time: '10-18 17:30',
        text: '今天采集的素材已经整理进素材库，大家可以自行调取。',
        photos: [], video: { poster: 'assets/poster-drama.jpg', duration: 7 },
        likes: 7, liked: false, comments: []
      }
    ]
  };

  var cache = null;

  function read() {
    if (cache) return cache;
    try {
      cache = JSON.parse(localStorage.getItem(KEY) || '{}') || {};
    } catch (error) {
      cache = {};
    }
    return cache;
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(read()));
    } catch (error) {}
  }

  function clone(post) {
    return {
      author: post.author,
      role: post.role || '',
      time: post.time,
      text: post.text || '',
      photos: (post.photos || []).slice(),
      video: post.video ? { poster: post.video.poster, duration: post.video.duration } : null,
      likes: post.likes || 0,
      liked: Boolean(post.liked),
      comments: (post.comments || []).slice()
    };
  }

  function posts(id) {
    var store = read();
    if (!store[id]) {
      var seed = SEED[id] || [{
        author: '赵子易', role: '', time: '10-23 18:20',
        text: '活动顺利结束，记录一下今天的现场。',
        photos: ['assets/poster-reading.jpg'], video: null,
        likes: 5, liked: false, comments: []
      }];
      store[id] = seed.map(clone);
      save();
    }
    return store[id];
  }

  window.StudentMoments = {
    find: function (id) { return ACTIVITIES[id] || null; },
    activities: function (clubName) {
      return Object.keys(ACTIVITIES).filter(function (id) {
        return ACTIVITIES[id].club === clubName;
      }).map(function (id) {
        var meta = ACTIVITIES[id];
        return {
          id: id,
          club: meta.club,
          title: meta.title,
          status: meta.status,
          when: meta.when,
          count: posts(id).length
        };
      });
    },
    posts: posts,
    add: function (id, post) {
      posts(id).unshift(clone(post));
      save();
    },
    toggleLike: function (id, index) {
      var post = posts(id)[index];
      if (!post) return;
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      save();
    },
    addComment: function (id, index, comment) {
      var post = posts(id)[index];
      if (!post) return;
      post.comments.push(comment);
      save();
    }
  };
})();
