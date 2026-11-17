(function () {
  var CURRENT_TERM = '2026-2027 学年第一学期';

  var COVERS = {
    reading: 'assets/poster-reading.jpg',
    drama: 'assets/poster-drama.jpg',
    football: 'assets/poster-football.jpg',
    robot: 'assets/poster-robot.jpg'
  };

  var TERMS = ['2026-2027 学年第二学期', CURRENT_TERM, '2025-2026 学年第二学期'];

  var CLUBS = [
    {
      id: 1, name: '围棋社', category: '文史学院', cover: 'reading', term: CURRENT_TERM,
      advisor: '张可可', leader: '赵晨', grade: '八年级', className: '八年级（3）班', phone: '188 3333 1026',
      members: 3, capacity: 35, pendingJoins: 3, activities: 2, lastActivityAt: '10月12日',
      status: '进行中', origin: '从上学期延续',
      intro: '面向对围棋感兴趣的同学，开展棋艺交流、对弈复盘与校园棋类活动。',
      recruitment: '招募愿意规律参与、遵守对弈礼仪并乐于交流的同学。',
      plan: '每周开展一次棋艺交流与对弈复盘，学期中组织校园棋类友谊赛。',
      proposedVenue: '图书馆研讨室', venueDescription: '', venueArrangement: '图书馆研讨室',
      submittedBy: '学生本人提交', submittedAt: '2026-08-18 16:20',
      membersList: [
        { name: '赵晨', className: '八年级（3）班', role: '学生社长', source: '社团申报通过', joinedAt: '2026-02-25 16:20' },
        { name: '王嘉宁', className: '八年级（5）班', role: '成员', source: '自主报名', joinedAt: '2026-09-13 19:22' },
        { name: '李沐阳', className: '七年级（2）班', role: '成员', source: '教师添加', joinedAt: '2026-09-18 15:26' }
      ],
      activityList: [
        { name: '第 2 次围棋对弈与复盘', time: '10月12日 16:30—17:30', venue: '图书馆研讨室', state: '已结束', summary: '正常出勤 2 人 · 请假 1 人 · 已填写活动记录' },
        { name: '第 1 次围棋友谊赛准备', time: '10月5日 16:30—17:30', venue: '图书馆研讨室', state: '已结束', summary: '正常出勤 3 人 · 待填写活动记录' }
      ],
      history: [
        { title: '延续至本学期', detail: '由 2025—2026 学年第二学期“围棋社”延续，赵晨继续担任学生社长。', time: '2026年8月20日 09:30' },
        { title: '社团首次成立', detail: '社团申报审核通过，赵晨成为学生社长。', time: '2026年2月14日 10:14' }
      ]
    },
    {
      id: 2, name: '街舞社', category: '艺术学院', cover: 'drama', term: CURRENT_TERM,
      advisor: '王静', leader: '林小满', grade: '高一', className: '高一（2）班', phone: '186 1028 6742',
      members: 34, capacity: 40, pendingJoins: 5, activities: 8, lastActivityAt: '10月15日',
      status: '进行中', origin: '本学期新申报',
      intro: '面向喜欢街舞的同学，开展基础训练、编舞排练与校园展演。',
      recruitment: '欢迎零基础但愿意持续参加训练的同学。',
      plan: '每周两次常规集训，学期末完成迎新展演作品。',
      proposedVenue: '舞蹈教室', venueDescription: '需要带镜面墙的舞蹈教室', venueArrangement: '舞蹈教室',
      submittedBy: '学生本人提交', submittedAt: '2026-08-22 10:05',
      membersList: [
        { name: '林小满', className: '高一（2）班', role: '学生社长', source: '社团申报通过', joinedAt: '2026-08-22 10:05' },
        { name: '陈一诺', className: '高一（4）班', role: '成员', source: '自主报名', joinedAt: '2026-09-12 18:40' },
        { name: '苏晓', className: '高二（1）班', role: '成员', source: '自主报名', joinedAt: '2026-09-14 20:10' },
        { name: '周乐', className: '高一（6）班', role: '成员', source: '教师添加', joinedAt: '2026-09-20 09:15' }
      ],
      activityList: [
        { name: '迎新展演编舞排练（三）', time: '10月15日 17:00—19:00', venue: '舞蹈教室', state: '已结束', summary: '正常出勤 28 人 · 请假 6 人 · 已填写活动记录' },
        { name: '迎新展演编舞排练（二）', time: '10月11日 17:00—19:00', venue: '舞蹈教室', state: '已结束', summary: '正常出勤 30 人 · 缺勤 4 人 · 已填写活动记录' },
        { name: '基础律动训练', time: '10月18日 17:00—19:00', venue: '舞蹈教室', state: '未开始', summary: '待发布活动记录' }
      ],
      history: [
        { title: '社团首次成立', detail: '社团申报审核通过，林小满成为学生社长。', time: '2026年8月22日 10:05' }
      ]
    },
    {
      id: 3, name: '国学研习社', category: '文史学院', cover: 'reading', term: CURRENT_TERM,
      advisor: '张可可', leader: '顾言', grade: '九年级', className: '九年级（1）班', phone: '135 2086 3917',
      members: 22, capacity: 25, pendingJoins: 0, activities: 3, lastActivityAt: '9月24日',
      status: '已提前结束', origin: '从上学期延续',
      intro: '面向希望系统学习传统文化与经典文本的同学，开展经典诵读、主题研习与文化实践。',
      recruitment: '招募愿意持续参与文本研读、讨论与文化实践的同学。',
      plan: '每两周围绕一部经典开展文本研读，并在学期中组织一次传统文化主题分享。',
      proposedVenue: '图书馆研讨室', venueDescription: '希望安排一间可容纳 25 人围坐讨论、可使用投影的安静教室。', venueArrangement: '多功能教室',
      submittedBy: '学生本人提交', submittedAt: '2026-08-19 17:35',
      endReason: '学生社长因阶段性学业安排无法继续组织活动',
      membersList: [
        { name: '顾言', className: '九年级（1）班', role: '学生社长', source: '社团申报通过', joinedAt: '2026-02-21 17:35' },
        { name: '许知夏', className: '九年级（3）班', role: '成员', source: '自主报名', joinedAt: '2026-09-11 18:40' }
      ],
      activityList: [
        { name: '经典诵读与分享', time: '9月24日 16:30—17:30', venue: '多功能教室', state: '已结束', summary: '正常出勤 18 人 · 请假 4 人 · 已填写活动记录' }
      ],
      history: [
        { title: '提前结束本学期社团', detail: '因学生社长阶段性学业安排，教师确认提前结束', time: '2026年10月2日 15:40' },
        { title: '延续至本学期', detail: '由 2025—2026 学年第二学期“国学研习社”延续', time: '2026年8月19日 17:35' }
      ]
    },
    {
      id: 4, name: '阿卡贝拉社', category: '艺术学院', cover: 'drama', term: CURRENT_TERM,
      advisor: '李明远', leader: '唐语菲', grade: '高二', className: '高二（4）班', phone: '133 6675 2048',
      members: 16, capacity: 20, pendingJoins: 1, activities: 0, lastActivityAt: null,
      status: '进行中', origin: '本学期新申报',
      intro: '以无伴奏人声合唱为主要形式，开展声部训练与校园演出。',
      recruitment: '招募有一定音准基础、愿意参与声部配合的同学。',
      plan: '每周一次声部排练，学期末完成两首作品录制。',
      proposedVenue: '音乐教室', venueDescription: '', venueArrangement: '音乐教室',
      submittedBy: '学生本人提交', submittedAt: '2026-08-25 15:10',
      membersList: [
        { name: '唐语菲', className: '高二（4）班', role: '学生社长', source: '社团申报通过', joinedAt: '2026-08-25 15:10' },
        { name: '林可', className: '高二（2）班', role: '成员', source: '自主报名', joinedAt: '2026-09-15 12:30' }
      ],
      activityList: [],
      history: [
        { title: '社团首次成立', detail: '社团申报审核通过，唐语菲成为学生社长。', time: '2026年8月25日 15:10' }
      ]
    },
    {
      id: 5, name: '模拟联合国', category: '国际学院', cover: 'robot', term: CURRENT_TERM,
      advisor: '张可可', leader: '沈知行', grade: '高一', className: '高一（5）班', phone: '189 1153 8086',
      members: 42, capacity: 42, pendingJoins: 0, activities: 7, lastActivityAt: '10月16日',
      status: '进行中', origin: '从上学期延续',
      intro: '围绕国际议题开展模拟会议、立场文件写作与议事规则训练。',
      recruitment: '招募关注公共议题、愿意参与英文写作与表达的同学。',
      plan: '每月一次议题研讨，学期中组织校内模拟会议。',
      proposedVenue: '阶梯教室 201', venueDescription: '', venueArrangement: '阶梯教室 201',
      submittedBy: '学生本人提交', submittedAt: '2026-08-16 11:20',
      membersList: [
        { name: '沈知行', className: '高一（5）班', role: '学生社长', source: '社团申报通过', joinedAt: '2026-02-18 11:20' },
        { name: '方予安', className: '高一（3）班', role: '成员', source: '自主报名', joinedAt: '2026-09-10 16:45' },
        { name: '叶青禾', className: '高一（1）班', role: '成员', source: '自主报名', joinedAt: '2026-09-11 09:30' }
      ],
      activityList: [
        { name: '气候议题立场文件写作', time: '10月16日 16:00—18:00', venue: '阶梯教室 201', state: '已结束', summary: '正常出勤 40 人 · 请假 2 人 · 已填写活动记录' },
        { name: '议事规则训练', time: '10月9日 16:00—18:00', venue: '阶梯教室 201', state: '已结束', summary: '正常出勤 38 人 · 缺勤 4 人 · 待填写活动记录' }
      ],
      history: [
        { title: '延续至本学期', detail: '由 2025—2026 学年第二学期“模拟联合国”延续', time: '2026年8月16日 11:20' }
      ]
    },
    {
      id: 6, name: '造物工坊', category: '科技学院', cover: 'robot', term: CURRENT_TERM,
      advisor: '王静', leader: '陈屿', grade: '八年级', className: '八年级（6）班', phone: '136 9320 4511',
      members: 25, capacity: 30, pendingJoins: 2, activities: 9, lastActivityAt: '10月17日',
      status: '进行中', origin: '从上学期延续', hasEndRequest: true,
      intro: '以动手造物为主线，开展结构设计、开源硬件与作品迭代。',
      recruitment: '招募对动手制作与硬件编程感兴趣的同学。',
      plan: '每周一次工作坊，学期末完成一件可展示的造物作品。',
      proposedVenue: '创客空间', venueDescription: '', venueArrangement: '创客空间',
      submittedBy: '学生本人提交', submittedAt: '2026-08-14 14:30',
      membersList: [
        { name: '陈屿', className: '八年级（6）班', role: '学生社长', source: '社团申报通过', joinedAt: '2026-02-19 14:30' },
        { name: '韩思远', className: '八年级（6）班', role: '成员', source: '自主报名', joinedAt: '2026-09-09 17:20' },
        { name: '刘一航', className: '八年级（2）班', role: '成员', source: '自主报名', joinedAt: '2026-09-12 15:05' }
      ],
      activityList: [
        { name: '开源硬件工作坊（四）', time: '10月17日 16:00—18:00', venue: '创客空间', state: '已结束', summary: '正常出勤 23 人 · 请假 2 人 · 已填写活动记录' },
        { name: '结构设计迭代', time: '10月10日 16:00—18:00', venue: '创客空间', state: '已结束', summary: '正常出勤 22 人 · 缺勤 3 人 · 已填写活动记录' }
      ],
      history: [
        { title: '延续至本学期', detail: '由 2025—2026 学年第二学期“造物工坊”延续', time: '2026年8月14日 14:30' }
      ]
    },
    {
      id: 7, name: '校园跑酷社', category: '体育学院', cover: 'football', term: '2025-2026 学年第二学期',
      advisor: '李明远', leader: '周奕辰', grade: '九年级', className: '九年级（4）班', phone: '137 1816 5290',
      members: 19, capacity: 24, pendingJoins: 0, activities: 11, lastActivityAt: '6月12日',
      status: '本学期已结束', origin: '本学期新申报',
      intro: '面向喜爱跑酷与体能训练的同学，开展安全规范学习、基础训练与校园障碍体验。',
      recruitment: '招募愿意遵守训练规范、持续参与并关注同伴安全的同学。',
      plan: '每周开展一次基础训练与路线练习，学期中组织一次校园障碍挑战展示。',
      proposedVenue: '操场东侧体能训练区', venueDescription: '', venueArrangement: '操场东侧体能训练区',
      submittedBy: '学生本人提交', submittedAt: '2025-08-26 16:45',
      membersList: [
        { name: '周奕辰', className: '九年级（4）班', role: '学生社长', source: '社团申报通过', joinedAt: '2025-08-28 16:45' },
        { name: '许言', className: '九年级（2）班', role: '成员', source: '自主报名', joinedAt: '2025-09-03 12:16' }
      ],
      activityList: [
        { name: '校园障碍路线训练', time: '6月12日 16:30—18:00', venue: '操场东侧', state: '已结束', summary: '正常出勤 17 人 · 请假 2 人 · 已填写活动记录' }
      ],
      history: [
        { title: '学期结束并归档', detail: '2025—2026 学年第二学期社团运行结束，已归档。', time: '2026年7月10日 17:30' }
      ]
    }
  ];

  var APPLICATIONS = [
    {
      id: 101, term: CURRENT_TERM, name: '校园观鸟社', category: '科技学院', cover: 'robot',
      applicant: '许知夏', className: '七年级（3）班', capacity: 24, submittedBy: '学生本人提交',
      operator: '许知夏', phone: '138 5120 7634', submittedAt: '2026-09-16 16:24', status: '待审核',
      intro: '面向对鸟类观察与自然记录感兴趣的同学，开展校园观鸟、物种识别和自然保护主题交流。',
      recruitment: '招募愿意参与周末晨间观察、能够遵守校园活动规范的同学。',
      plan: '每周开展 1 次校园观鸟与记录活动，期中组织一次物种识别分享。',
      proposedVenue: '', venueDescription: '一间可存放观测器材的教室', posterName: '校园观鸟社招新海报.png',
      approvalHistory: [{ action: '提交申报', actor: '许知夏', time: '2026-09-16 16:24', detail: '学生本人提交' }]
    },
    {
      id: 102, term: CURRENT_TERM, name: '非遗手作社', category: '艺术学院', cover: 'drama',
      applicant: '宋晚晴', className: '八年级（1）班', capacity: 30, submittedBy: '教师代提交',
      operator: '李慧', phone: '139 4872 1206', submittedAt: '2026-09-15 18:07', status: '待审核',
      intro: '通过传统手作体验了解非遗技艺，并完成社团成员共同创作。',
      recruitment: '招募对传统手作感兴趣、愿意共同维护活动空间的同学。',
      plan: '每两周围绕一种传统手作开展体验与交流，并在学期末集中展示作品。',
      proposedVenue: '美术教室 3', venueDescription: '', posterName: '非遗手作社招新海报.png',
      approvalHistory: [{ action: '提交申报', actor: '李慧', time: '2026-09-15 18:07', detail: '教师代提交' }]
    },
    {
      id: 103, term: CURRENT_TERM, name: '数学建模社', category: '科技学院', cover: 'robot',
      applicant: '郭子扬', className: '高一（2）班', capacity: 20, submittedBy: '家长代提交',
      operator: '郭子扬家长', phone: '137 6982 4510', submittedAt: '2026-09-14 12:31', status: '待审核',
      intro: '围绕真实问题开展数学建模、数据分析和小组探究。',
      recruitment: '招募对数学应用、数据分析或编程有兴趣的同学。',
      plan: '每周开展一次主题研讨与小组练习，学期末完成一次建模成果分享。',
      proposedVenue: '', venueDescription: '普通教室，需学校协助安排', posterName: '数学建模社招新海报.png',
      approvalHistory: [{ action: '提交申报', actor: '郭子扬家长', time: '2026-09-14 12:31', detail: '家长代提交' }]
    },
    {
      id: 104, term: CURRENT_TERM, name: '光影摄影社', category: '艺术学院', cover: 'drama',
      applicant: '叶青禾', className: '九年级（4）班', capacity: 25, submittedBy: '学生本人提交',
      operator: '叶青禾', phone: '136 0274 8951', submittedAt: '2026-09-10 14:20', status: '已通过',
      intro: '通过校园摄影实践记录校园生活并交流影像表达。',
      recruitment: '招募对摄影和影像创作感兴趣的同学。',
      plan: '围绕校园主题开展摄影交流与作品展示。',
      proposedVenue: '美术教室 3', venueDescription: '', posterName: '光影摄影社招新海报.png',
      approvalHistory: [
        { action: '提交申报', actor: '叶青禾', time: '2026-09-10 14:20', detail: '学生本人提交' },
        { action: '审核通过', actor: '张可可', time: '2026-09-11 10:20', detail: '' }
      ]
    },
    {
      id: 105, term: CURRENT_TERM, name: '桌游设计社', category: '文史学院', cover: 'reading',
      applicant: '刘一航', className: '八年级（2）班', capacity: 18, submittedBy: '学生本人提交',
      operator: '刘一航', phone: '135 1602 4791', submittedAt: '2026-09-08 09:42', status: '已退回',
      intro: '通过桌游体验、规则设计与测试开展小组协作。',
      recruitment: '招募喜欢策略游戏和创意设计的同学。',
      plan: '每周开展桌游体验或设计测试，并沉淀规则原型。',
      proposedVenue: '图书馆研讨室', venueDescription: '', posterName: '桌游设计社招新海报.png',
      approvalHistory: [
        { action: '提交申报', actor: '刘一航', time: '2026-09-08 09:42', detail: '学生本人提交' },
        { action: '审核退回', actor: '张可可', time: '2026-09-09 14:10', detail: '请补充说明活动组织与安全安排' }
      ]
    },
    {
      id: 106, term: '2025-2026 学年第二学期', name: '校园电台社', category: '艺术学院', cover: 'drama',
      applicant: '方予安', className: '高一（5）班', capacity: 16, submittedBy: '学生本人提交',
      operator: '方予安', phone: '138 7609 5214', submittedAt: '2026-02-18 10:12', status: '已通过',
      intro: '围绕校园新闻、音乐和学生声音制作校园广播内容。',
      recruitment: '招募对播音、编辑和音频制作有兴趣的同学。',
      plan: '每周完成一次节目策划与制作，并在校园广播站播出。',
      proposedVenue: '多功能教室', venueDescription: '', posterName: '校园电台社招新海报.png',
      approvalHistory: [
        { action: '提交申报', actor: '方予安', time: '2026-02-18 10:12', detail: '学生本人提交' },
        { action: '审核通过', actor: '张可可', time: '2026-02-19 09:30', detail: '' }
      ]
    }
  ];

  var END_REQUESTS = [
    {
      id: 301, term: CURRENT_TERM, club: '造物工坊', clubId: 6, category: '科技学院', cover: 'robot',
      leader: '陈屿', grade: '八年级', className: '八年级（6）班', members: 25, activities: 9,
      reason: '课业时间调整，无法继续组织本学期社团活动',
      submittedBy: '学生本人提交', submittedAt: '2026-10-18 16:40', status: '待审核',
      approvalHistory: [{ action: '提交结束申请', actor: '陈屿', time: '2026-10-18 16:40', detail: '学生社长' }]
    },
    {
      id: 302, term: CURRENT_TERM, club: '国学研习社', clubId: 3, category: '文史学院', cover: 'reading',
      leader: '顾言', grade: '九年级', className: '九年级（1）班', members: 22, activities: 3,
      reason: '学生社长因阶段性学业安排无法继续组织活动',
      submittedBy: '学生本人提交', submittedAt: '2026-10-01 09:20', status: '已通过',
      approvalHistory: [
        { action: '提交结束申请', actor: '顾言', time: '2026-10-01 09:20', detail: '学生社长' },
        { action: '审核通过', actor: '张可可', time: '2026-10-02 15:40', detail: '同意提前结束本学期社团' }
      ]
    }
  ];

  var CONTINUATION_REQUESTS = [
    {
      id: 401, term: CURRENT_TERM, club: '校园跑酷社', category: '体育学院', cover: 'football',
      originalTerm: '2025-2026 学年第二学期', targetTerm: CURRENT_TERM,
      leader: '周奕辰', grade: '九年级', className: '九年级（4）班', phone: '137 1816 5290',
      retainedMembers: 16, capacity: 24, continueRecruiting: true,
      intro: '面向喜爱跑酷与体能训练的同学，开展安全规范学习、基础训练与校园障碍体验。',
      recruitment: '招募愿意遵守训练规范、持续参与并关注同伴安全的同学。',
      plan: '每周开展一次基础训练与路线练习，学期中组织一次校园障碍挑战展示。',
      proposedVenue: '操场东侧体能训练区', venueDescription: '',
      coverName: '沿用当前社团封面', posterName: '沿用当前招新海报',
      submittedBy: '学生本人提交', submittedAt: '2026-08-16 14:32', status: '待审核',
      approvalHistory: [{ action: '提交延续申请', actor: '周奕辰', time: '2026-08-16 14:32', detail: '学生社长' }]
    },
    {
      id: 402, term: CURRENT_TERM, club: '围棋社', category: '文史学院', cover: 'reading',
      originalTerm: '2025-2026 学年第二学期', targetTerm: CURRENT_TERM,
      leader: '赵晨', grade: '八年级', className: '八年级（3）班', phone: '188 3333 1026',
      retainedMembers: 3, capacity: 35, continueRecruiting: true,
      intro: '面向对围棋感兴趣的同学，开展棋艺交流、对弈复盘与校园棋类活动。',
      recruitment: '招募愿意规律参与、遵守对弈礼仪并乐于交流的同学。',
      plan: '每周开展一次棋艺交流与对弈复盘，学期中组织校园棋类友谊赛。',
      proposedVenue: '图书馆研讨室', venueDescription: '',
      coverName: '沿用当前社团封面', posterName: '沿用当前招新海报',
      submittedBy: '学生本人提交', submittedAt: '2026-08-15 10:08', status: '已通过',
      approvalHistory: [
        { action: '提交延续申请', actor: '赵晨', time: '2026-08-15 10:08', detail: '学生社长' },
        { action: '审核通过', actor: '张可可', time: '2026-08-16 09:12', detail: '同意延续至本学期' }
      ]
    }
  ];

  var CREDITS = [
    {
      id: 201, term: CURRENT_TERM, student: '林小满', className: '初二（1）班', club: '街舞社', clubId: 2,
      category: '艺术类', role: '学生社长', appliedHours: 12, leaderHours: null, teacherHours: 12,
      suggestedCredit: 2, submittedAt: '2026-09-16 10:21', status: '待审核', adjusted: '未调整',
      summary: '本学期作为社长全面负责街舞社的纳新组建、每周常规集训与期末迎新展演排练，全勤带队组织 6 场活动，带领 12 名成员共同进步。',
      attachments: [{ name: '街舞社常规训练考勤与期末展演成果单.pdf', size: '1.8MB' }],
      facts: { activitiesCount: 6, activitiesHours: 9.5, attendanceCount: 3, attendanceTotal: 6, attendanceDone: false, recordsCount: 1, recordsDone: false, membersCount: 12 },
      approvalHistory: [{ action: '提交社长学分申报', actor: '林小满（社长）', time: '2026-09-16 10:21', detail: '申报 12 小时（带队 9.5 小时），报送教师终审' }]
    },
    {
      id: 202, term: CURRENT_TERM, student: '王嘉宁', className: '初二（3）班', club: '围棋社', clubId: 1,
      category: '体育类', role: '成员', appliedHours: 8, leaderHours: 7, teacherHours: 7,
      suggestedCredit: 1.5, submittedAt: '2026-09-15 17:40', status: '待审核', adjusted: '已调整',
      summary: '本学期按时参加全部 4 场日常对弈与残局研讨，技战术摸底和对局达标；额外协助社长筹备社内快棋交流赛并负责赛程签到，累计投入约 1.5 小时。',
      attachments: [{ name: '王嘉宁_围棋社对局记录与快棋赛签到表.pdf', size: '860KB' }],
      facts: { attendedCount: 4, attendedHours: 6.5, discussionsCount: 4, featuredDiscussions: 1 },
      leaderAudit: { auditor: '赵晨', auditorRole: '社长', auditedAt: '2026-09-15 18:20', hours: 7, comment: '本学期常规对弈出勤良好，有 1 次请假已扣减相应学时；有持续的活动参与与分享，初审同意核定为 7 小时。' },
      approvalHistory: [
        { action: '提交学分申报', actor: '王嘉宁', time: '2026-09-15 17:40', detail: '申报 8 小时' },
        { action: '社长核定通过', actor: '赵晨（社长）', time: '2026-09-15 18:20', detail: '核定 7 小时：本学期常规对弈出勤良好，扣减 1 次请假学时' }
      ]
    },
    {
      id: 203, term: CURRENT_TERM, student: '李沐阳', className: '初一（2）班', club: '围棋社', clubId: 1,
      category: '体育类', role: '成员', appliedHours: 6, leaderHours: 6, teacherHours: 6,
      suggestedCredit: 1, submittedAt: '2026-09-14 13:06', status: '待审核', adjusted: '未调整',
      summary: '本学期参与 3 场对弈活动，完成 1 次活动记录整理，并在活动瞬间分享复盘笔记 2 次。',
      attachments: [{ name: '李沐阳_围棋社活动参与记录.pdf', size: '620KB' }],
      facts: { attendedCount: 3, attendedHours: 5, discussionsCount: 2, featuredDiscussions: 0 },
      leaderAudit: { auditor: '赵晨', auditorRole: '社长', auditedAt: '2026-09-14 16:32', hours: 6, comment: '参与稳定，复盘笔记质量较高，同意按 6 小时报送教师审核。' },
      approvalHistory: [
        { action: '提交学分申报', actor: '李沐阳', time: '2026-09-14 13:06', detail: '申报 6 小时' },
        { action: '社长核定通过', actor: '赵晨（社长）', time: '2026-09-14 16:32', detail: '核定 6 小时' }
      ]
    },
    {
      id: 204, term: CURRENT_TERM, student: '唐语菲', className: '高二（4）班', club: '阿卡贝拉社', clubId: 4,
      category: '艺术类', role: '学生社长', appliedHours: 10, leaderHours: null, teacherHours: 10,
      suggestedCredit: 1.5, submittedAt: '2026-09-12 09:40', status: '已通过', adjusted: '未调整',
      summary: '本学期完成社团组建与声部划分，组织 4 次声部排练，并带领成员完成两首作品的录制。',
      attachments: [{ name: '阿卡贝拉社排练考勤表.pdf', size: '740KB' }],
      facts: { activitiesCount: 4, activitiesHours: 8, attendanceCount: 4, attendanceTotal: 4, attendanceDone: true, recordsCount: 4, recordsDone: true, membersCount: 12 },
      approvalHistory: [
        { action: '提交社长学分申报', actor: '唐语菲（社长）', time: '2026-09-12 09:40', detail: '申报 10 小时' },
        { action: '教师审核通过', actor: '张可可', time: '2026-09-13 15:20', detail: '核定 10 小时，对应 1.5 学分' }
      ]
    },
    {
      id: 205, term: CURRENT_TERM, student: '周乐', className: '高一（6）班', club: '街舞社', clubId: 2,
      category: '艺术类', role: '成员', appliedHours: 9, leaderHours: 5, teacherHours: 5,
      suggestedCredit: 1, submittedAt: '2026-09-11 20:15', status: '已退回', adjusted: '已调整',
      summary: '本学期参与街舞社常规集训 5 次，参与迎新展演排练 2 次。',
      attachments: [{ name: '周乐_街舞社参与记录.pdf', size: '510KB' }],
      facts: { attendedCount: 5, attendedHours: 4.5, discussionsCount: 1, featuredDiscussions: 0 },
      leaderAudit: { auditor: '林小满', auditorRole: '社长', auditedAt: '2026-09-12 10:02', hours: 5, comment: '有 2 次活动缺勤记录，按实际参与核定为 5 小时。' },
      returnReason: '申报学时与社长核定时数差异较大，请补充缺席场次说明后重新提交。',
      approvalHistory: [
        { action: '提交学分申报', actor: '周乐', time: '2026-09-11 20:15', detail: '申报 9 小时' },
        { action: '社长核定通过', actor: '林小满（社长）', time: '2026-09-12 10:02', detail: '核定 5 小时' },
        { action: '教师审核退回', actor: '张可可', time: '2026-09-13 11:30', detail: '申请学时与核定时数差异较大，请补充说明' }
      ]
    }
  ];

  var STUDENTS = [
    { name: '王嘉宁', className: '八年级（5）班', grade: '八年级' },
    { name: '李沐阳', className: '七年级（2）班', grade: '七年级' },
    { name: '许知夏', className: '九年级（3）班', grade: '九年级' },
    { name: '陈一诺', className: '高一（4）班', grade: '高一' },
    { name: '苏晓', className: '高二（1）班', grade: '高二' }
  ];

  function findClub(id) {
    return CLUBS.filter(function (item) { return String(item.id) === String(id); })[0];
  }

  var DECISION_KEY = 'teacher-mobile-decisions';

  function loadDecisions() {
    try { return JSON.parse(localStorage.getItem(DECISION_KEY) || '{}'); } catch (error) { return {}; }
  }

  function getReview(type, id) {
    return loadDecisions()[type + '-' + id] || null;
  }

  function setReview(type, id, status, opinion) {
    var all = loadDecisions();
    all[type + '-' + id] = {
      status: status,
      opinion: opinion || '',
      time: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-')
    };
    try { localStorage.setItem(DECISION_KEY, JSON.stringify(all)); } catch (error) {}
  }

  function effectiveStatus(type, item) {
    var decision = getReview(type, item.id);
    return decision ? decision.status : item.status;
  }

  var DECLARE_KEY = 'teacher-mobile-declares';

  function getDeclares() {
    try { return JSON.parse(localStorage.getItem(DECLARE_KEY) || '[]'); } catch (error) { return []; }
  }

  function addDeclare(payload) {
    var list = getDeclares();
    list.unshift(payload);
    try { localStorage.setItem(DECLARE_KEY, JSON.stringify(list)); } catch (error) {}
  }

  window.TEACHER = {
    CURRENT_TERM: CURRENT_TERM,
    TERMS: TERMS,
    COVERS: COVERS,
    CLUBS: CLUBS,
    APPLICATIONS: APPLICATIONS,
    END_REQUESTS: END_REQUESTS,
    CONTINUATION_REQUESTS: CONTINUATION_REQUESTS,
    CREDITS: CREDITS,
    STUDENTS: STUDENTS,
    findClub: findClub,
    getReview: getReview,
    setReview: setReview,
    effectiveStatus: effectiveStatus,
    getDeclares: getDeclares,
    addDeclare: addDeclare,
    statusClass: function (status) {
      if (status === '待审核') return 'pending';
      if (status === '已通过') return 'passed';
      if (status === '已退回' || status === '未通过') return 'rejected';
      return 'neutral';
    }
  };
})();
