import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  ChartLineUp,
  MagnifyingGlass,
  Flag,
  Clock,
  CheckCircle,
  WarningCircle,
  X,
  CaretRight,
  CaretLeft,
  CalendarBlank,
  MapPin,
  User,
  Users,
  ClipboardText,
  ArrowClockwise,
  Phone,
  CaretDown,
  CaretUp,
  Sparkle,
  Star,
  Medal,
  Student,
  ChatCircleDots,
  Certificate,
  PuzzlePiece,
  SealCheck,
  Quotes,
  Check,
  Camera,
  Trophy,
  ArrowLeft,
  ImageSquare,
  Eye
} from '@phosphor-icons/react';

const CURRENT_TERM = '2026-2027 学年上学期';

// 对齐学生手机端社团广场 / 社团详情的社团名录
const PLAZA_CLUBS = [
  {
    id: 'football',
    name: '足球联盟',
    category: '体育',
    captain: '赵子安',
    contact: '138 0000 9218',
    cover: 'assets/poster-football.jpg',
    members: 18,
    capacity: 30,
    short: '面向喜欢足球的同学，开展日常训练、友谊赛和校园足球活动。',
    recruitment: '有基础或愿意长期参加训练的同学均可申请。',
    intro: '足球联盟是学校历史最久的体育社团之一，面向全校喜欢足球的同学开放。社团每周安排固定训练，并组织校内友谊赛与校际交流赛。',
    plan: '每周四开展常规训练，学期内组织校园友谊赛与校际交流赛，学期末进行队内总结赛。',
    events: [
      { md: '10.23', wd: '周四', title: '校园友谊赛', time: '16:20-18:00', venue: '西操场' },
      { md: '10.30', wd: '周四', title: '日常训练', time: '16:20-18:00', venue: '西操场' },
      { md: '11.06', wd: '周四', title: '校际交流赛', time: '15:00-17:00', venue: '东操场' },
      { md: '11.13', wd: '周四', title: '日常训练', time: '16:20-18:00', venue: '西操场' },
      { md: '11.20', wd: '周四', title: '队内对抗赛', time: '16:20-18:00', venue: '西操场' }
    ],
    term: CURRENT_TERM,
    state: 'open',
    applyEnd: '2026 年 9 月 20 日',
    timeParts: { days: '3', hours: '08', mins: '24', secs: 36 },
    applyEnded: false,
    isOpen: true,
  },
  {
    id: 'ai-robot',
    name: '机器人探索社',
    category: '科技',
    captain: '陈闻远',
    contact: '136 0000 5306',
    cover: 'assets/poster-robot.jpg',
    members: 12,
    capacity: 20,
    short: '围绕结构搭建、编程和创意挑战，完成可展示的机器人作品。',
    recruitment: '对机械、编程或创意设计感兴趣即可。',
    intro: '机器人探索社聚焦结构搭建、编程控制与创意挑战，成员以小组形式完成可展示的机器人作品，并参与校内外科创活动。',
    plan: '每周五开展结构搭建与编程训练，学期中完成一次作品展示，学期末参加校级科创挑战赛。',
    events: [
      { md: '10.24', wd: '周五', title: '结构搭建训练', time: '15:30-17:00', venue: '创客教室 301' },
      { md: '10.31', wd: '周五', title: '编程控制训练', time: '15:30-17:00', venue: '创客教室 301' },
      { md: '11.07', wd: '周五', title: '作品方案评审', time: '15:30-17:00', venue: '创客教室 301' },
      { md: '11.14', wd: '周五', title: '机器人联调', time: '15:30-17:00', venue: '创客教室 301' },
      { md: '11.21', wd: '周五', title: '校内科创挑战赛', time: '14:00-17:00', venue: '科技楼报告厅' }
    ],
    term: CURRENT_TERM,
    state: 'open',
    applyEnd: '2026 年 9 月 20 日',
    timeParts: { days: '2', hours: '11', mins: '03', secs: 12 },
    applyEnded: false,
    isOpen: true,
  },
  {
    id: 'drama',
    name: '光影戏剧社',
    category: '艺术',
    captain: '李若彤',
    contact: '139 0000 1860',
    cover: 'assets/poster-drama.jpg',
    members: 24,
    capacity: 24,
    short: '从剧本、表演到舞台设计，共同完成一场属于学生的校园演出。',
    recruitment: '欢迎表演、编剧、灯光与舞美方向的同学。',
    intro: '光影戏剧社由一群热爱舞台的同学组成，从剧本创作、表演排练到灯光舞美，全部由学生自主完成。',
    plan: '每周六开展剧本围读与片段排练，学期末完成舞台走位、全剧联排与校内展演。',
    events: [
      { md: '10.25', wd: '周六', title: '剧本围读', time: '15:30-17:30', venue: '报告厅' },
      { md: '11.01', wd: '周六', title: '片段排练', time: '15:30-17:30', venue: '报告厅' },
      { md: '11.08', wd: '周六', title: '舞台走位', time: '14:00-17:00', venue: '报告厅' },
      { md: '11.15', wd: '周六', title: '全剧联排', time: '14:00-17:00', venue: '报告厅' },
      { md: '11.22', wd: '周六', title: '校内展演', time: '19:00-20:30', venue: '报告厅' }
    ],
    term: CURRENT_TERM,
    state: 'full',
    applyEnd: '2026 年 9 月 20 日',
    timeParts: { days: '3', hours: '08', mins: '24', secs: 36 },
    applyEnded: false,
    isOpen: false, // 名额已满
  },
  {
    id: 'reading',
    name: '山海阅读会',
    category: '人文',
    captain: '周予安',
    contact: '137 0000 2648',
    cover: 'assets/poster-reading.jpg',
    members: 21,
    capacity: 36,
    short: '一起读、一起聊，从一本书延伸到更广阔的世界。',
    recruitment: '愿意稳定参加共读与分享活动。',
    intro: '山海阅读会希望把阅读变成一件可以分享的事。每两周一次共读，由成员轮流领读，并在学期末整理共读手记。',
    plan: '每两周一次共读分享，学期末整理共读手记并完成一次主题分享。',
    events: [
      { md: '10.27', wd: '周一', title: '共读分享', time: '12:30-13:20', venue: '图书馆 302' },
      { md: '11.03', wd: '周一', title: '共读分享', time: '12:30-13:20', venue: '图书馆 302' },
      { md: '11.10', wd: '周一', title: '主题分享', time: '12:30-13:20', venue: '图书馆 302' },
      { md: '11.17', wd: '周一', title: '共读分享', time: '12:30-13:20', venue: '图书馆 302' },
      { md: '11.24', wd: '周一', title: '学期手记整理', time: '12:30-13:20', venue: '图书馆 302' }
    ],
    term: CURRENT_TERM,
    state: 'closed',
    applyEnd: '2026 年 9 月 20 日',
    applyEnded: true,
    isOpen: false, // 已截止
  }
];

// 风采上传人展示：仅保留姓名，时间统一为「MM-DD HH:mm」
const showcaseUploader = (uploader) => (uploader || '学生社长').split(' · ')[0];
const showcaseUploadTime = (date, index) => {
  const times = ['16:40', '09:12', '18:30', '20:15', '10:26', '14:05'];
  return `${(date || '').slice(5)} ${times[index % times.length]}`;
};

// 对齐学生桌面端申报真实数据（包含待审核、已通过、未通过及教师审核意见）
const INITIAL_PROPOSAL_RECORDS = [
  {
    id: 'prop-1',
    term: '2026-2027 学年上学期',
    name: '城市观察社',
    category: '人文',
    status: 'pending', // 'pending' | 'approved' | 'rejected'
    statusText: '待审核',
    captain: '赵子易',
    capacity: 30,
    submittedAt: '2026-09-15 14:30',
    cover: 'assets/poster-reading.jpg',
    venueDesc: '需容纳30人且配有投影的多媒体教室（近西操场）',
    short: '记录城市空间与变迁，开展社会学微调研与摄影走访。',
    recruitment: '对城市空间、社会调查与摄影写作感兴趣的同学。',
    phone: '138 0000 9218'
  },
  {
    id: 'prop-2',
    term: '2026-2027 学年上学期',
    name: '校园纪录片社',
    category: '艺术',
    status: 'approved',
    statusText: '已通过',
    captain: '赵子易',
    capacity: 20,
    submittedAt: '2026-09-12 16:10',
    cover: 'assets/poster-drama.jpg',
    venue: '影视工作室',
    short: '用镜头捕捉校园真实生活与师生故事，创作原创短片。',
    recruitment: '欢迎对摄影剪辑、导演与编导感兴趣的同学。',
    phone: '138 0000 9218'
  },
  {
    id: 'prop-3',
    term: '2026-2027 学年上学期',
    name: '古诗词吟诵社',
    category: '人文',
    status: 'rejected',
    statusText: '未通过',
    captain: '赵子易',
    capacity: 25,
    submittedAt: '2026-09-06 10:15',
    cover: 'assets/poster-reading.jpg',
    venue: '图书馆 302',
    venueDesc: '周三下午使用，需配备古琴及朗诵长桌',
    teacherFeedback: {
      teacher: '李明',
      time: '2026-09-08 15:40',
      reason: '本学期活动计划未填写完整，图书馆 302 周三已有课程占用，请调整场地说明或补充活动计划后重新申报。'
    },
    short: '经典古诗词诵读、诗意鉴赏与古风雅集活动。',
    recruitment: '热爱中国古代文学与古风朗诵表达。',
    phone: '138 0000 9218'
  }
];

// 可选学期名录
const ENROLL_TERM_OPTIONS = [
  '2026-2027 学年上学期',
  '2025-2026 学年下学期',
  '2025-2026 学年上学期'
];

// 对齐学生桌面端真实数据的【社团风采】数据（作品集锦 + 荣誉时刻，参考图1）
const CLUB_SHOWCASE_DATA = {
  football: {
    works: [
      {
        id: "w1",
        title: "《校园足球战术手册》",
        creator: "足球联盟 · 集体创作",
        desc: "整理 12 套常用站位与跑位路线，配 36 张手绘图解，已作为新社员训练教材。",
        cover: "assets/gallery-sports.jpg",
        photos: ["assets/moment-team-1.jpg", "assets/moment-team-2.jpg"],
        date: "2026-10-20",
        uploader: "赵子安 · 社长上传"
      },
      {
        id: "w2",
        title: "《颠球百日打卡》记录册",
        creator: "赵子安 · 社长",
        desc: "连续 100 天颠球打卡影像与数据曲线，最好成绩单次 214 个。",
        cover: "assets/gallery-sports.jpg",
        photos: ["assets/moment-team-3.jpg"],
        date: "2026-10-12",
        uploader: "赵子安 · 社长上传"
      },
      {
        id: "w3",
        title: "守门员扑救动作拆解图",
        creator: "陈沐阳",
        desc: "以慢动作截图拆解侧扑、单手托球等 8 个标准动作。",
        cover: "assets/gallery-sports.jpg",
        date: "2026-09-30",
        uploader: "赵子安 · 社长上传"
      },
      {
        id: "w4",
        title: "「班级联赛」策划案",
        creator: "李一诺",
        desc: "面向全校 24 个班级的迷你联赛方案，含赛程编排与安全预案。",
        cover: "assets/gallery-sports.jpg",
        date: "2026-09-22",
        uploader: "赵子安 · 社长上传"
      },
      {
        id: "w5",
        title: "足球社队徽设计稿（第三版）",
        creator: "苏晓",
        desc: "以盾牌与星星为元素的新版队徽，经全员投票定为社团新形象。",
        cover: "assets/gallery-sports.jpg",
        date: "2026-09-15",
        uploader: "赵子安 · 社长上传"
      }
    ],
    honors: [
      {
        id: "h1",
        title: "校园足球联赛 · 冠军",
        time: "2026-10",
        desc: "在校级足球联赛决赛中斩获总冠军。",
        cover: "assets/cert-fb-h1.png",
        date: "2026-10-24",
        uploader: "赵子安 · 社长上传"
      },
      {
        id: "h2",
        title: "优秀学生社团",
        time: "2026-06",
        desc: "获评学校本学年五星级优秀学生社团。",
        cover: "assets/cert-fb-h3.png",
        date: "2026-06-20",
        uploader: "赵子安 · 社长上传"
      },
      {
        id: "h3",
        title: "最佳组织奖",
        time: "2026-05",
        desc: "校园体育文化节优秀赛事组织奖。",
        cover: "assets/cert-fb-h4.png",
        date: "2026-05-18",
        uploader: "赵子安 · 社长上传"
      }
    ]
  },
  drama: {
    works: [
      {
        id: "dw1",
        title: "校园人物微纪录片《微光》",
        creator: "林小薇 · 导演",
        desc: "记录食堂师傅与保洁阿姨的一天，成片入选校电视台展播。",
        cover: "assets/gallery-art.jpg",
        photos: ["assets/moment-anime-1.png"],
        date: "2026-10-18",
        uploader: "林小薇 · 社长上传"
      },
      {
        id: "dw2",
        title: "秋日落叶分镜手绘稿",
        creator: "纪录片社创作一组",
        desc: "全套 28 镜分镜手绘草图，包含光影与焦段标注。",
        cover: "assets/gallery-art.jpg",
        date: "2026-10-05",
        uploader: "林小薇 · 社长上传"
      }
    ],
    honors: [
      {
        id: "dh1",
        title: "校原创短视频大赛 · 一等奖",
        time: "2026-09",
        desc: "作品《微光》荣获校第十二届短视频大赛一等奖。",
        cover: "assets/cert-dr-h1.png",
        date: "2026-09-28",
        uploader: "林小薇 · 社长上传"
      },
      {
        id: "dh2",
        title: "校园美育特别贡献社团",
        time: "2026-06",
        desc: "为校园戏剧节及各类校级活动提供高水平影像支持。",
        cover: "assets/cert-dr-h3.png",
        date: "2026-06-15",
        uploader: "林小薇 · 社长上传"
      }
    ]
  },
  'ai-robot': {
    works: [
      {
        id: "rw1",
        title: "双足巡线避障车装配图纸",
        creator: "陈闻远、机械组",
        desc: "采用自主设计的 3D 打印轻量化底盘与红外测距算法。",
        cover: "assets/gallery-tech.jpg",
        date: "2026-10-15",
        uploader: "陈闻远 · 社长上传"
      },
      {
        id: "rw2",
        title: "机械抓手控制固件代码 (v2.1)",
        creator: "编程组集体",
        desc: "优化 PID 闭环电机响应，抓取准确率提升至 96%。",
        cover: "assets/gallery-tech.jpg",
        date: "2026-09-28",
        uploader: "陈闻远 · 社长上传"
      }
    ],
    honors: [
      {
        id: "rh1",
        title: "青少年科创挑战赛 · 二等奖",
        time: "2026-05",
        desc: "市级青少年机器人创意设计挑战赛团体二等奖。",
        cover: "assets/cert-fb-h5.png",
        date: "2026-05-20",
        uploader: "陈闻远 · 社长上传"
      }
    ]
  },
  reading: {
    works: [
      {
        id: "rw1",
        title: "《山海经》异兽想象图集",
        creator: "读书会共读小组",
        desc: "汇编 15 幅神话异兽手绘插图与现代神话考证笔记。",
        cover: "assets/gallery-humanities.jpg",
        date: "2026-09-25",
        uploader: "周予安 · 社长上传"
      }
    ],
    honors: [
      {
        id: "rh1",
        title: "书香校园 · 十佳读书社团",
        time: "2026-04",
        desc: "获评海淀区“书香校园”十佳学生读书组织。",
        cover: "assets/cert-rd-h1.png",
        date: "2026-04-23",
        uploader: "周予安 · 社长上传"
      }
    ]
  }
};

// 对齐学生桌面端真实数据的【全部活动瞬间】数据（14份分享 · 覆盖6场活动，参考图2）
const CLUB_MOMENTS_DATA = {
  football: {
    summary: { total: 14, covered: 6 },
    activities: [
      { id: "all", name: "全部活动" },
      { id: "act-1", name: "校园足球友谊交流赛" },
      { id: "act-2", name: "周三战术跑位与阵型协同训练" },
      { id: "act-3", name: "校际交流准备与体能恢复加练" },
      { id: "act-4", name: "上周三高位逼抢与协防专题演练" },
      { id: "act-5", name: "周三传切配合与攻防转换实训" },
      { id: "act-6", name: "学期初全员选拔与基础技术测试" }
    ],
    moments: [
      {
        id: "m1",
        actId: "act-1",
        actName: "校园足球友谊交流赛",
        photo: "assets/moment-team-1.jpg",
        author: "顾一然",
        time: "活动前 1 天",
        isFeatured: true,
        text: "赛前双方互相鼓劲加油，场面非常热烈！"
      },
      {
        id: "m2",
        actId: "act-1",
        actName: "校园足球友谊交流赛",
        photo: "assets/moment-team-2.jpg",
        author: "张子墨",
        time: "活动前 18 小时",
        isFeatured: false,
        text: "热身准备很充分，大家状态都很饱满。"
      },
      {
        id: "m3",
        actId: "act-2",
        actName: "周三战术跑位与阵型协同训练",
        photo: "assets/moment-team-3.jpg",
        author: "顾一然",
        time: "16:10",
        isFeatured: true,
        text: "教练指导中场跑位细节，收获很大。"
      },
      {
        id: "m4",
        actId: "act-2",
        actName: "周三战术跑位与阵型协同训练",
        photo: "assets/gallery-sports.jpg",
        author: "沈清越",
        time: "16:15",
        isFeatured: false,
        text: "阵型保持得很紧凑，攻防转换速度加快了。"
      },
      {
        id: "m5",
        actId: "act-2",
        actName: "周三战术跑位与阵型协同训练",
        photo: "assets/moment-team-1.jpg",
        author: "赵子易",
        time: "16:18",
        isFeatured: true,
        text: "边路传中与包抄射门训练，非常过瘾！"
      },
      {
        id: "m6",
        actId: "act-3",
        actName: "校际交流准备与体能恢复加练",
        photo: "assets/moment-team-2.jpg",
        author: "陈思语",
        time: "17:45",
        isFeatured: true,
        text: "慢跑放松与肌肉拉伸，恢复体能准备迎接大考。"
      },
      {
        id: "m7",
        actId: "act-3",
        actName: "校际交流准备与体能恢复加练",
        photo: "assets/moment-team-3.jpg",
        author: "许嘉禾",
        time: "17:50",
        isFeatured: false,
        text: "喝水休息时讨论刚才战术失误点，反思很有价值。"
      },
      {
        id: "m8",
        actId: "act-4",
        actName: "上周三高位逼抢与协防专题演练",
        photo: "assets/gallery-sports.jpg",
        author: "顾一然",
        time: "10-16 18:10",
        isFeatured: false,
        text: "前场逼抢要讲究默契，今天压迫感打出来了。"
      },
      {
        id: "m9",
        actId: "act-4",
        actName: "上周三高位逼抢与协防专题演练",
        photo: "assets/moment-team-1.jpg",
        author: "张子墨",
        time: "10-16 18:30",
        isFeatured: false,
        text: "协防补位意识增强，防守反击越来越纯熟。"
      },
      {
        id: "m10",
        actId: "act-5",
        actName: "周三传切配合与攻防转换实训",
        photo: "assets/moment-team-2.jpg",
        author: "赵子易",
        time: "10-09 18:00",
        isFeatured: true,
        text: "两肋直塞打身后，成功打进两个漂亮进球！"
      },
      {
        id: "m11",
        actId: "act-5",
        actName: "周三传切配合与攻防转换实训",
        photo: "assets/moment-team-3.jpg",
        author: "周天羽",
        time: "10-09 19:20",
        isFeatured: true,
        text: "全队复盘讨论，社长总结战术亮点。"
      },
      {
        id: "m12",
        actId: "act-6",
        actName: "学期初全员选拔与基础技术测试",
        photo: "assets/gallery-sports.jpg",
        author: "顾一然",
        time: "09-25 18:00",
        isFeatured: true,
        text: "新学期第一课，大家测试成绩普遍有提高。"
      },
      {
        id: "m13",
        actId: "act-6",
        actName: "学期初全员选拔与基础技术测试",
        photo: "assets/moment-team-1.jpg",
        author: "李一诺",
        time: "09-25 18:15",
        isFeatured: false,
        text: "折返跑和颠球测试，新生很有拼搏精神。"
      },
      {
        id: "m14",
        actId: "act-6",
        actName: "学期初全员选拔与基础技术测试",
        photo: "assets/moment-team-2.jpg",
        author: "陈沐阳",
        time: "09-25 18:40",
        isFeatured: true,
        text: "守门员单项摸底，扑救基本功很扎实。"
      }
    ]
  },
  drama: {
    summary: { total: 8, covered: 4 },
    activities: [
      { id: "all", name: "全部活动" },
      { id: "dact-1", name: "校园人物微纪录片初剪沟通会" },
      { id: "dact-2", name: "校园微纪录片补拍分工会" },
      { id: "dact-3", name: "影视摄影构图与手持云台实操训练" },
      { id: "dact-4", name: "纪录片选题与采访提纲工作坊" }
    ],
    moments: [
      {
        id: "dm1",
        actId: "dact-1",
        actName: "校园人物微纪录片初剪沟通会",
        photo: "assets/moment-anime-1.png",
        author: "林小薇",
        time: "15:40",
        isFeatured: true,
        text: "讨论剪辑节奏，各小组分镜衔接很顺。"
      },
      {
        id: "dm2",
        actId: "dact-2",
        actName: "校园微纪录片补拍分工会",
        photo: "assets/moment-anime-2.png",
        author: "张同学",
        time: "昨天",
        isFeatured: false,
        text: "明确了外拍设备分工，明天开拍。"
      },
      {
        id: "dm3",
        actId: "dact-3",
        actName: "影视摄影构图与手持云台实操训练",
        photo: "assets/gallery-art.jpg",
        author: "陈同学",
        time: "10-18 16:30",
        isFeatured: true,
        text: "三轴稳定器跟拍练习，运镜平稳度大幅提高。"
      }
    ]
  }
};

// 【我报名的社团】报名申请记录（包含当前学期三大状态及历史学期记录）
const INITIAL_ENROLL_APPLICATIONS = [
  // 当前学期：2026-2027 学年上学期
  {
    id: 'enroll-1',
    term: '2026-2027 学年上学期',
    clubId: 'radio',
    clubName: '校园广播站',
    category: '人文',
    cover: 'assets/poster-reading.jpg',
    captain: '周予安',
    contact: '137 0000 2648',
    status: 'pending', // 待审核
    statusText: '待审核',
    submittedAt: '2026-09-12 14:20',
    note: '已协助孩子提交入团意向，等待学生社长周予安审核录用。'
  },
  {
    id: 'enroll-2',
    term: '2026-2027 学年上学期',
    clubId: 'football',
    clubName: '足球联盟',
    category: '体育',
    cover: 'assets/poster-football.jpg',
    captain: '赵子安',
    contact: '138 0000 9218',
    status: 'passed', // 已通过
    statusText: '已通过',
    submittedAt: '2026-09-02 10:15',
    passedAt: '2026-09-04 16:30',
    note: '孩子已正式录用为该社团团员。'
  },
  {
    id: 'enroll-2b',
    term: '2026-2027 学年上学期',
    clubId: 'documentary',
    clubName: '校园纪录片社',
    category: '艺术',
    cover: 'assets/poster-drama.jpg',
    captain: '林小薇',
    contact: '139 0000 8122',
    status: 'passed', // 已通过
    statusText: '已通过',
    submittedAt: '2026-09-02 10:15',
    passedAt: '2026-09-04 16:30',
    note: '孩子已正式录用为该社团团员。'
  },
  {
    id: 'enroll-3',
    term: '2026-2027 学年上学期',
    clubId: 'drama-acting',
    clubName: '光影戏剧社',
    category: '艺术',
    cover: 'assets/poster-reading.jpg',
    captain: '李若彤',
    contact: '139 0000 1860',
    status: 'rejected', // 未通过
    statusText: '未通过',
    submittedAt: '2026-09-05 11:30',
    feedback: '社长审核意见：本社团招募名额已满，优先录用了有舞台台词基础的高年级同学。'
  },
  // 历史学期：2025-2026 学年下学期
  {
    id: 'enroll-hist-1',
    term: '2025-2026 学年下学期',
    clubId: 'reading',
    clubName: '山海阅读会',
    category: '人文',
    cover: 'assets/poster-reading.jpg',
    captain: '周予安',
    contact: '137 0000 2648',
    status: 'passed',
    statusText: '已通过',
    submittedAt: '2026-03-02 09:20',
    passedAt: '2026-03-05 14:10',
    note: '该学期社团已圆满结课，已完成全部研读任务。'
  },
  {
    id: 'enroll-hist-2',
    term: '2025-2026 学年下学期',
    clubId: 'football',
    clubName: '足球联盟',
    category: '体育',
    cover: 'assets/poster-football.jpg',
    captain: '赵子安',
    contact: '138 0000 9218',
    status: 'rejected',
    statusText: '未通过',
    submittedAt: '2026-03-03 16:40',
    feedback: '社长审核意见：本学期足球梯队选拔名额已满。'
  },
  // 历史学期：2025-2026 学年上学期
  {
    id: 'enroll-hist-3',
    term: '2025-2026 学年上学期',
    clubId: 'mun',
    clubName: '模拟联合国社',
    category: '人文',
    cover: 'assets/poster-reading.jpg',
    captain: '张越',
    contact: '138 0000 7712',
    status: 'passed',
    statusText: '已通过',
    submittedAt: '2025-09-06 14:00',
    passedAt: '2025-09-10 11:20',
    note: '该学期社团已圆满结课，已代表学校参加校际研讨交流。'
  }
];

export default function App() {
  // 当前处于的视图页面：'main' (广场/报告) | 'proposeCenter' (社团申报专区) | 'proposeForm' (申报表单)
  const [currentView, setCurrentView] = useState('main');

  // 当前激活的双 Tab：'plaza' (社团广场) | 'report' (分析报告)
  const [activeTab, setActiveTab] = useState('plaza');

  // 当前演示数据为孩子已有社团记录；后续接入真实数据后由记录状态决定
  const childState = 'joined';

  // 分析报告：AI 解读弹层开合（与学生手机端 analysis.html 一致，点悬浮按钮打开）
  const [reportAiOpen, setReportAiOpen] = useState(false);

  // 孩子的社团申报列表（支持修改重新提交、撤回、新建）
  const [proposalRecords, setProposalRecords] = useState(INITIAL_PROPOSAL_RECORDS);
  const [editingProposal, setEditingProposal] = useState(null); // 当前正在编辑的申请
  const [selectedProposalTerm, setSelectedProposalTerm] = useState(CURRENT_TERM); // 申报列表学期筛选
  const [isGuideOpen, setIsGuideOpen] = useState(false); // 申报说明弹窗

  // 孩子的社团草稿箱数据（初始 1 条草稿，对齐学生桌面端截图 1 中的“我的草稿 (1)”）
  const [draftRecords, setDraftRecords] = useState([
    {
      id: 'draft-1',
      name: '深空天文观测社',
      category: '科技',
      capacity: 25,
      updatedAt: '2026-09-18 10:20',
      short: '利用课余时间开展夜间星空观测与天文摄影研讨。',
      recruitment: '对天文学基础与望远镜操作感兴趣的同学。',
      venue: '实验楼天台',
      venueDesc: '需要开阔无光污染天台，配备安全围栏与电源',
      plan: '每周四晚常规观测，每月组织一次深空天体摄影展。',
      phone: '138 0000 9218'
    }
  ]);
  const [isDraftsModalOpen, setIsDraftsModalOpen] = useState(false);
  const [viewingDetailRecord, setViewingDetailRecord] = useState(null);

  // 当前所选学期过滤后的申报记录
  const visibleProposalRecords = proposalRecords.filter(
    record => (record.term || CURRENT_TERM) === selectedProposalTerm
  );

  // 【我报名的社团】报名申请列表状态（支持学期切换、待审核取消报名、未通过重新报名）
  const [enrollApplications, setEnrollApplications] = useState(INITIAL_ENROLL_APPLICATIONS);
  const [selectedEnrollTerm, setSelectedEnrollTerm] = useState('2026-2027 学年上学期');
  const [viewingClubDetail, setViewingClubDetail] = useState(null);
  const [detailTab, setDetailTab] = useState('info'); // 'info' (社团详情) | 'showcase' (社团风采，对齐图1)
  const [showcaseSubTab, setShowcaseSubTab] = useState('works'); // 'works' (作品集锦) | 'honors' (荣誉时刻)
  const [viewingClubMoments, setViewingClubMoments] = useState(null); // 当前查看全部活动瞬间的社团
  const [selectedMomentActivity, setSelectedMomentActivity] = useState('all'); // 全部活动瞬间当前选中的活动筛选
  const [previewMomentItem, setPreviewMomentItem] = useState(null); // 预览活动瞬间大图
  const [navHistory, setNavHistory] = useState('main'); // 返回上一页的来源 ('main' | 'myApplications')
  const [isPendingExpanded, setIsPendingExpanded] = useState(false); // 待审核是否展开
  const [viewingRejectedItem, setViewingRejectedItem] = useState(null); // 弹窗查看未通过详情
  const [applyReason, setApplyReason] = useState('');
  const [reapplyingItem, setReapplyingItem] = useState(null); // 当前正在重新报名的申请

  // 当前所选学期过滤后的报名记录
  const visibleEnrollApplications = enrollApplications.filter(
    app => (app.term || '2026-2027 学年上学期') === selectedEnrollTerm
  );

  // 取消报名（针对待审核状态）
  const handleCancelEnroll = (record) => {
    if (confirm(`确定要取消社团【${record.clubName}】的报名申请吗？\n取消后将释放招募名额，可重新选报其他社团。`)) {
      setEnrollApplications(prev => prev.filter(item => item.id !== record.id));
      alert(`已成功取消【${record.clubName}】的报名申请！`);
    }
  };

  // 重新报名（针对未通过状态）
  const handleReapply = (record) => {
    const targetClub = PLAZA_CLUBS.find(c => c.name === record.clubName || record.clubName.includes(c.name)) || {
      name: record.clubName,
      category: record.category,
      captain: record.captain,
      cover: record.cover,
      short: '社团招募选拔',
      recruitment: '欢迎感兴趣的同学加入。'
    };
    setReapplyingItem(record);
    setCurrentClubForApply(targetClub);
    setApplyReason('');
    setModalType('applyModal');
  };

  // 确认提交报名申请（代孩子报名或重新报名）
  const handleConfirmApply = () => {
    if (!currentClubForApply) return;
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const nowTime = `2026-${month}-${day} ${hours}:${minutes}`;

    if (reapplyingItem) {
      // 重新报名更新该记录为“待审核”
      setEnrollApplications(prev => prev.map(item => {
        if (item.id === reapplyingItem.id) {
          return {
            ...item,
            status: 'pending',
            statusText: '待审核',
            submittedAt: `${nowTime} (重新报名)`,
            note: applyReason.trim() ? `补充说明：${applyReason.trim()}` : '已重新提交入团申请，等待学生社长审核录用。',
            feedback: null
          };
        }
        return item;
      }));
      setReapplyingItem(null);
      alert(`已为孩子重新提交【${currentClubForApply.name}】的入团报名申请！`);
    } else {
      // 全新代报名
      const newEnroll = {
        id: `enroll-${Date.now()}`,
        clubId: currentClubForApply.id || `club-${Date.now()}`,
        clubName: currentClubForApply.name,
        category: currentClubForApply.category,
        cover: currentClubForApply.cover || 'assets/poster-reading.jpg',
        captain: currentClubForApply.captain,
        contact: currentClubForApply.contact || '',
        status: 'pending',
        statusText: '待审核',
        submittedAt: nowTime,
        note: applyReason.trim() ? `申请说明：${applyReason.trim()}` : '已协助孩子提交入团意向，等待学生社长审核录用。'
      };
      setEnrollApplications(prev => [newEnroll, ...prev]);
      alert(`已成功提交【${currentClubForApply.name}】的入团报名申请！\n可在【我报名的】中跟进审核状态。`);
    }

    setModalType(null);
    setApplyReason('');
    setCurrentView('myApplications');
  };

  // 表单状态
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('人文');
  const [formCapacity, setFormCapacity] = useState('30');
  const [formPhone, setFormPhone] = useState('138 0000 9218');
  const [formShort, setFormShort] = useState('');
  const [formRecruitment, setFormRecruitment] = useState('');
  const [formVenue, setFormVenue] = useState('图书馆 302');
  const [formVenueDesc, setFormVenueDesc] = useState('');
  const [formPlan, setFormPlan] = useState('');

  // 倒计时动态跳秒仿真
  const [secondsTick, setSecondsTick] = useState(36);
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsTick((prev) => (prev > 0 ? prev - 1 : 59));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 分类筛选
  const [selectedCategory, setSelectedCategory] = useState('全部');

  // 学期筛选与「仅看可报名」开关（对齐学生手机端社团广场）
  const [selectedTerm, setSelectedTerm] = useState(CURRENT_TERM);
  const [onlyJoinable, setOnlyJoinable] = useState(false);

  // 搜索关键字
  const [searchKey, setSearchKey] = useState('');

  // 全屏图片预览（招新海报 / 作品集锦 / 荣誉时刻）
  const [gallery, setGallery] = useState(null);
  const galleryDragX = useRef(0);

  const openGallery = (media, index = 0, title = '', sub = '') => {
    setGallery({ media, index, title, sub });
  };
  const stepGallery = (dir) => {
    setGallery((prev) => {
      if (!prev) return prev;
      const next = prev.index + dir;
      if (next < 0 || next >= prev.media.length) return prev;
      return { ...prev, index: next };
    });
  };

  useEffect(() => {
    if (!gallery) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setGallery(null);
      if (event.key === 'ArrowLeft') stepGallery(-1);
      if (event.key === 'ArrowRight') stepGallery(1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gallery]);

  // 弹窗控制：'applyModal' | 'recordsModal' | null
  const [modalType, setModalType] = useState(null);
  const [currentClubForApply, setCurrentClubForApply] = useState(null);

  // 打开申报表单（新建或修改）
  const handleOpenForm = (record = null) => {
    if (record) {
      setEditingProposal(record);
      setFormName(record.name || '');
      setFormCategory(record.category || '人文');
      setFormCapacity(String(record.capacity || '30'));
      setFormPhone(record.phone || '138 0000 9218');
      setFormShort(record.short || '');
      setFormRecruitment(record.recruitment || '');
      setFormVenue(record.venue || '图书馆 302');
      setFormVenueDesc(record.venueDesc || '');
      setFormPlan(record.plan || '每周三下午开展常规研读，期中举办全校雅集展示。');
    } else {
      setEditingProposal(null);
      setFormName('');
      setFormCategory('人文');
      setFormCapacity('30');
      setFormPhone('138 0000 9218');
      setFormShort('');
      setFormRecruitment('');
      setFormVenue('创客多媒体教室');
      setFormVenueDesc('');
      setFormPlan('');
    }
    setCurrentView('proposeForm');
  };

  // 提交申报表单（保存草稿、暂存修改或提交教师审核）
  const handleSubmitForm = (isDraft = false) => {
    // 检查是否属于已有申报记录（比如撤回后修改、未通过修改）
    const isExistingProposal = editingProposal && proposalRecords.some(p => p.id === editingProposal.id);

    if (isDraft) {
      if (isExistingProposal) {
        // 暂存修改：对齐桌面端，保留在申报列表中，更新内容，不重新提交审核
        setProposalRecords(prev => prev.map(item => {
          if (item.id === editingProposal.id) {
            return {
              ...item,
              name: formName.trim() || item.name,
              category: formCategory,
              capacity: Number(formCapacity) || 30,
              short: formShort,
              recruitment: formRecruitment,
              venue: formVenue,
              venueDesc: formVenueDesc,
              plan: formPlan,
              phone: formPhone,
              updatedAt: '刚刚 (已暂存修改)'
            };
          }
          return item;
        }));
        alert('已暂存修改内容，可随时重新提交。');
      } else {
        // 新建或草稿箱草稿：存入草稿箱
        const draftItem = {
          id: editingProposal ? editingProposal.id : `draft-${Date.now()}`,
          name: formName.trim() || '未命名社团草稿',
          category: formCategory,
          capacity: Number(formCapacity) || 30,
          short: formShort,
          recruitment: formRecruitment,
          venue: formVenue,
          venueDesc: formVenueDesc,
          plan: formPlan,
          phone: formPhone,
          updatedAt: '刚刚'
        };
        setDraftRecords(prev => [draftItem, ...prev.filter(d => d.id !== draftItem.id)]);
        alert('草稿保存成功！可在社团申报页右上角【我的草稿】中继续编辑。');
      }
      setCurrentView('proposeCenter');
      return;
    }

    if (!formName.trim()) {
      alert('请输入社团名称！');
      return;
    }

    if (editingProposal) {
      // 从草稿箱移出（如果是草稿直接提交）
      setDraftRecords(prev => prev.filter(d => d.id !== editingProposal.id));

      // 修改已有记录（已撤回重新提交、未通过重新提交等）
      setProposalRecords(prev => {
        const exists = prev.some(item => item.id === editingProposal.id);
        if (exists) {
          return prev.map(item => {
            if (item.id === editingProposal.id) {
              return {
                ...item,
                name: formName,
                category: formCategory,
                capacity: Number(formCapacity) || 30,
                short: formShort,
                recruitment: formRecruitment,
                venue: formVenue,
                venueDesc: formVenueDesc,
                plan: formPlan,
                phone: formPhone,
                status: 'pending',
                statusText: '待审核',
                submittedAt: '刚刚 (已修改重提)',
                withdrawnAt: null,
                teacherFeedback: null
              };
            }
            return item;
          });
        } else {
          // 原本是草稿，直接转入已提交申报列表
          const newSubmitted = {
            id: editingProposal.id,
            term: selectedProposalTerm,
            name: formName,
            category: formCategory,
            captain: '赵子易',
            capacity: Number(formCapacity) || 30,
            status: 'pending',
            statusText: '待审核',
            submittedAt: '刚刚',
            cover: 'assets/poster-football.jpg',
            venue: formVenue,
            venueDesc: formVenueDesc,
            short: formShort,
            recruitment: formRecruitment,
            phone: formPhone
          };
          return [newSubmitted, ...prev];
        }
      });
      alert('申报已重新提交，等待学校教师审核！');
    } else {
      // 新建记录
      const newRec = {
        id: `prop-${Date.now()}`,
        term: selectedProposalTerm,
        name: formName,
        category: formCategory,
        captain: '赵子易',
        capacity: Number(formCapacity) || 30,
        status: 'pending',
        statusText: '待审核',
        submittedAt: '刚刚',
        cover: 'assets/poster-football.jpg',
        venue: formVenue,
        venueDesc: formVenueDesc,
        short: formShort,
        recruitment: formRecruitment,
        phone: formPhone
      };
      setProposalRecords(prev => [newRec, ...prev]);
      alert('社团申报已提交，等待学校教师审核！');
    }
    setCurrentView('proposeCenter');
  };

  // 撤回申报（完全对齐学生手机端：留在当前页面，状态变更为已撤回）
  const handleWithdraw = (record) => {
    if (confirm(`确定要撤回社团【${record.name}】的申报吗？\n撤回后教师将无法审核，你可修改后重新提交。`)) {
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const nowTime = `2026-${month}-${day} ${hours}:${minutes}`;

      setProposalRecords(prev => prev.map(item => {
        if (item.id === record.id) {
          return {
            ...item,
            status: 'withdrawn',
            statusText: '已撤回',
            withdrawnAt: nowTime
          };
        }
        return item;
      }));
    }
  };

  // 当前学期内孩子已报名的社团（待审核 / 已通过）
  const enrolledClub = (club) => enrollApplications.find(
    app => app.term === CURRENT_TERM
      && (app.clubId === club.id || club.name.includes(app.clubName))
      && (app.status === 'pending' || app.status === 'passed')
  );

  // 过滤后的社团名录
  const filteredClubs = PLAZA_CLUBS.filter(club => {
    const matchTerm = club.term === selectedTerm;
    const matchCat = selectedCategory === '全部' || club.category === selectedCategory;
    const matchKey = club.name.includes(searchKey) || club.short.includes(searchKey) || club.recruitment.includes(searchKey);
    const matchJoinable = !onlyJoinable || (club.state === 'open' && club.capacity > club.members && !enrolledClub(club));
    return matchTerm && matchCat && matchKey && matchJoinable;
  });

  return (
    <div className="device-wrapper">
      {/* 手机容器 */}
      <div className="phone-container">
        {/* 系统状态栏 */}
        <div className="status-bar">
          <span>09:41</span>
          <div className="status-bar-icons">
            <span style={{ fontSize: '10px' }}>5G</span>
            <span>●●●</span>
          </div>
        </div>

        {/* 微信小程序自定义导航栏（避让微信右上角胶囊） */}
        <div className="wechat-nav-bar">
          <div
            className="wechat-nav-left"
            onClick={() => {
              if (currentView === 'proposeForm') {
                setCurrentView('proposeCenter');
              } else if (currentView === 'clubDetail' || currentView === 'clubMoments') {
                setCurrentView(navHistory || 'main');
              } else if (currentView === 'proposeCenter' || currentView === 'myApplications') {
                setCurrentView('main');
              } else {
                alert('返回学校移动端');
              }
            }}
          >
            <CaretLeft size={18} weight="bold" />
            <span>返回</span>
          </div>

          <div className="wechat-nav-title">
            {currentView === 'proposeCenter'
              ? '社团申报'
              : currentView === 'myApplications'
              ? '我报名的社团'
              : currentView === 'clubDetail'
              ? (viewingClubDetail ? viewingClubDetail.name : '社团详情')
              : currentView === 'clubMoments'
              ? (viewingClubMoments ? `${viewingClubMoments.name} · 全部活动瞬间` : '全部活动瞬间')
              : currentView === 'proposeForm'
              ? (editingProposal ? '修改社团申报' : '代孩子申报新社团')
              : (activeTab === 'plaza' ? '社团广场' : '分析报告')}
          </div>

          {/* 微信原生胶囊避让区 */}
          <div className="wechat-capsule-placeholder">
            <span className="capsule-dot">···</span>
            <span className="capsule-divider"></span>
            <span className="capsule-circle"></span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 视图 1：主页双 Tab（社团广场 / 分析报告）                   */}
        {/* ========================================================= */}
        {currentView === 'main' && (
          <>
            {/* Tab 1：【社团广场】（公域：全校社团名录、选报、建团代办） */}
            {activeTab === 'plaza' && (
              <div className="tab-content">

                {/* 1. 双服务入口：【社团申报】 + 【我报名的】（保留 tab 切换） */}
                <div className="service-twin-card">
                  {/* 左：社团申报（点击进入对齐桌面端的社团申报专区页） */}
                  <div
                    className="service-twin-half"
                    onClick={() => setCurrentView('proposeCenter')}
                  >
                    <div className="service-icon-wrap blue">
                      <Flag size={15} weight="fill" />
                    </div>
                    <div className="service-text-group">
                      <span className="service-title">社团申报</span>
                    </div>
                  </div>

                  {/* 右：我报名的 */}
                  <div
                    className="service-twin-half"
                    onClick={() => setCurrentView('myApplications')}
                  >
                    <div className="service-icon-wrap amber">
                      <ClipboardText size={15} weight="fill" />
                    </div>
                    <div className="service-text-group">
                      <span className="service-title">我报名的</span>
                    </div>
                    {enrollApplications.filter(a => a.status === 'pending').length > 0 && (
                      <span className="service-badge">
                        {enrollApplications.filter(a => a.status === 'pending').length}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. 搜索框 */}
                <div className="search-full-width">
                  <div className="plaza-search-box">
                    <MagnifyingGlass size={16} color="#64748b" />
                    <input
                      className="plaza-search-input"
                      placeholder="搜索社团名称"
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                    />
                  </div>
                </div>

                {/* 3. 筛选行：类别 / 学期 / 仅看可报名（对齐学生手机端） */}
                <div className="filter-row">
                  <select
                    className="filter-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="选择社团类别"
                  >
                    {['全部', '体育', '艺术', '科技', '人文'].map((cat) => (
                      <option key={cat} value={cat}>{cat === '全部' ? '全部类别' : cat}</option>
                    ))}
                  </select>
                  <select
                    className="filter-select"
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                    aria-label="选择学期"
                  >
                    {ENROLL_TERM_OPTIONS.map((term) => (
                      <option key={term} value={term}>{term}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className={`filter-toggle ${onlyJoinable ? 'on' : ''}`}
                    onClick={() => setOnlyJoinable((prev) => !prev)}
                  >
                    仅看可报名
                  </button>
                </div>

                {/* 4. 统计行 */}
                <div className="plaza-summary">
                  <span>{selectedTerm === CURRENT_TERM ? '本学期' : selectedTerm}共 {filteredClubs.length} 个社团</span>
                </div>

                {/* 5. 社团卡片列表（左图右文 + 底部截止时间与操作） */}
                <div className="plaza-list">
                  {filteredClubs.map((club) => {
                    const seats = Math.max(club.capacity - club.members, 0);
                    const applied = enrolledClub(club);
                    const isFull = club.state === 'full' || seats <= 0;
                    const canApply = club.state === 'open' && !isFull && !applied;
                    const openDetail = () => {
                      setViewingClubDetail(club);
                      setDetailTab('info');
                      setNavHistory('main');
                      setCurrentView('clubDetail');
                    };
                    const handleAction = (event) => {
                      event.stopPropagation();
                      if (applied) {
                        if (confirm(`确定要取消【${club.name}】的报名吗？\n取消后可重新选报其他社团。`)) {
                          setEnrollApplications(prev => prev.filter(item => item.id !== applied.id));
                          alert(`已取消【${club.name}】的报名。`);
                        }
                        return;
                      }
                      if (club.state === 'closed') {
                        openDetail();
                        return;
                      }
                      if (!canApply) return;
                      setCurrentClubForApply(club);
                      setApplyReason('');
                      setModalType('applyModal');
                    };

                    return (
                      <article key={club.id} className="plaza-card" onClick={openDetail}>
                        <div className="plaza-card-head">
                          <div className="plaza-card-head-left">
                            <h3>{club.name}</h3>
                            <span className="tag tag-cat">{club.category}</span>
                          </div>
                        </div>

                        <div className="plaza-card-main">
                          <div className="plaza-card-cover" style={{ backgroundImage: `url('${club.cover}')` }} />
                          <div className="plaza-card-body">
                            <div className="info-row">
                              <span className="info-label">社团简介：</span>
                              <span className="info-text">{club.short}</span>
                            </div>
                            <div className="info-row">
                              <span className="info-label">招新说明：</span>
                              <span className="info-text">{club.recruitment}</span>
                            </div>
                            <div className="info-row">
                              <span className="info-label">学生社长：</span>
                              <span className="info-inline">
                                {club.captain}
                                {club.contact && (
                                  <span className="phone-chip">
                                    <Phone size={9} weight="bold" />
                                    {club.contact}
                                  </span>
                                )}
                              </span>
                            </div>
                            <div className="info-row">
                              <span className="info-label">成员名额：</span>
                              <span className="info-inline">
                                {club.members} / {club.capacity} 人
                                {seats > 0
                                  ? <span className="seat-chip">剩余名额 {seats}</span>
                                  : <span className="seat-chip full">名额已满</span>}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="plaza-card-foot">
                          {club.state === 'closed' ? (
                            <span className="plaza-deadline muted">报名截止：{club.applyEnd}</span>
                          ) : (
                            <span className="plaza-deadline">
                              距报名截止：{club.timeParts?.days || '0'}天 {club.timeParts?.hours || '00'}小时 {club.timeParts?.mins || '00'}分 {String(secondsTick).padStart(2, '0')}秒
                            </span>
                          )}

                          {applied ? (
                            <button type="button" className="btn btn-joined" onClick={handleAction}>取消报名</button>
                          ) : club.state === 'closed' ? (
                            <button type="button" className="btn btn-secondary" onClick={handleAction}>查看社团</button>
                          ) : isFull ? (
                            <span className="tip-wrap" data-tip="该社团人员已达上限，暂时不能报名哦~先看看其他社团吧">
                              <button type="button" className="btn btn-primary" disabled>代孩子报名</button>
                            </span>
                          ) : (
                            <button type="button" className="btn btn-primary" onClick={handleAction}>代孩子报名</button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>

                {filteredClubs.length === 0 && (
                  <div className="plaza-empty">
                    <strong>没有找到匹配的社团</strong>
                    <span>可以换一个关键词，或取消当前筛选条件后再试。</span>
                  </div>
                )}
              </div>
            )}

        {/* ========================================================= */}
        {/* Tab 2：【分析报告】（完全复用学生手机端 analysis.html）   */}
        {/* ========================================================= */}
        {activeTab === 'report' && (
          <>
            <div className="tab-content rp-report has-fab">
              {childState === 'joined' ? (
                <>
                  {/* 报告封面（与学生手机端 analysis.html 完全一致） */}
                  <section className="rp-hero">
                    <span className="rp-hero-eyebrow">2026—2027 学年 · 上学期</span>
                    <div className="rp-badge rp-badge-side">
                      <span className="rp-badge-cap">已获得学分</span>
                      <b>6<em>学分</em></b>
                      <span className="rp-badge-hours">12 学时</span>
                    </div>
                    <h1>我的社团学期<em>图鉴</em></h1>
                    <p className="rp-hero-sub">赵子易 · 数据截至 2026 年 10 月 26 日</p>

                    <div className="rp-personas">
                      <span className="rp-persona tone-blue">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6l2.6 6 6.4.5-4.9 4.2 1.5 6.3L12 16.3 6.4 19.6l1.5-6.3L3 9.1l6.4-.5z" /></svg>
                        高频到场
                      </span>
                      <span className="rp-persona tone-amber">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.3-4.4A7.5 7.5 0 1 1 20 11.5Z" /></svg>
                        分享达人
                      </span>
                      <span className="rp-persona tone-violet">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6l2.6 6 6.4.5-4.9 4.2 1.5 6.3L12 16.3 6.4 19.6l1.5-6.3L3 9.1l6.4-.5z" /></svg>
                        精选常客
                      </span>
                      <span className="rp-persona tone-green">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><rect x="3.4" y="7.4" width="17.2" height="12.2" rx="2" /><path d="M8.4 7.4V5.3a1.6 1.6 0 0 1 1.6-1.6h4a1.6 1.6 0 0 1 1.6 1.6v2.1" /></svg>
                        多社团玩家
                      </span>
                    </div>
                  </section>

                  {/* 01 数据总览 */}
                  <section className="rp-sec">
                    <div className="rp-sec-head"><span className="rp-sec-no">01</span><h2>数据总览</h2></div>
                    <div className="rp-grid">
                      <article className="rp-metric">
                        <span className="rp-metric-ico">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true"><rect x="3.4" y="7.4" width="17.2" height="12.2" rx="2" /><path d="M8.4 7.4V5.3a1.6 1.6 0 0 1 1.6-1.6h4a1.6 1.6 0 0 1 1.6 1.6v2.1" /><path d="M3.4 12.4h17.2" /></svg>
                        </span>
                        <strong>2<em>个</em></strong>
                        <span className="rp-metric-label">我的社团</span>
                        <span className="rp-metric-note">我管理 1 个 · 我加入 1 个</span>
                      </article>
                      <article className="rp-metric">
                        <span className="rp-metric-ico">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.6" y="5.4" width="16.8" height="15" rx="2.4" /><path d="M3.6 10h16.8M8.4 3.4v4M15.6 3.4v4" /></svg>
                        </span>
                        <strong>6<em>场</em></strong>
                        <span className="rp-metric-label">活动出勤</span>
                        <span className="rp-metric-note">共 9 场 · 出勤率 67%</span>
                      </article>
                      <article className="rp-metric">
                        <span className="rp-metric-ico">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.3-4.4A7.5 7.5 0 1 1 20 11.5Z" /></svg>
                        </span>
                        <strong>4<em>条</em></strong>
                        <span className="rp-metric-label">活动分享</span>
                        <span className="rp-metric-note">精选 2 条</span>
                      </article>
                      <article className="rp-metric">
                        <span className="rp-metric-ico">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true"><ellipse cx="12" cy="7" rx="7" ry="3.2" /><path d="M5 7v5c0 1.8 3.1 3.2 7 3.2s7-1.4 7-3.2V7" /><path d="M5 12v5c0 1.8 3.1 3.2 7 3.2s7-1.4 7-3.2v-5" /></svg>
                        </span>
                        <strong>12<em>学时</em></strong>
                        <span className="rp-metric-label">已认定学时</span>
                        <span className="rp-metric-note">已申请 12 学时</span>
                      </article>
                    </div>
                  </section>

                  {/* 02 我管理的 */}
                  <section className="rp-sec">
                    <div className="rp-sec-head"><span className="rp-sec-no">02</span><h2>我管理的</h2></div>
                    <div className="rp-grid">
                      <article className="rp-metric">
                        <span className="rp-metric-ico">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true"><circle cx="9.2" cy="8.6" r="3.1" /><path d="M3.6 19.4a5.6 5.6 0 0 1 11.2 0" /><path d="M16.4 6.3a2.9 2.9 0 0 1 0 5.8" /><path d="M17.6 13.8a4.4 4.4 0 0 1 2.8 4.1" /></svg>
                        </span>
                        <strong>16<em>/ 30 人</em></strong>
                        <span className="rp-metric-label">社团成员</span>
                        <span className="rp-metric-note">入社率 53%</span>
                      </article>
                      <article className="rp-metric">
                        <span className="rp-metric-ico">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3.6" y="5.4" width="16.8" height="15" rx="2.4" /><path d="M3.6 10h16.8M8.4 3.4v4M15.6 3.4v4" /></svg>
                        </span>
                        <strong>13<em>场</em></strong>
                        <span className="rp-metric-label">本学期活动</span>
                        <span className="rp-metric-note">已开展 8 · 待开展 5</span>
                      </article>
                      <article className="rp-metric">
                        <span className="rp-metric-ico">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.4" /><path d="M12 7.4V12l3 1.8" /></svg>
                        </span>
                        <strong>86<em>%</em></strong>
                        <span className="rp-metric-label">全社平均出勤率</span>
                        <span className="rp-metric-note">按 8 场已开展活动统计</span>
                      </article>
                      <article className="rp-metric">
                        <span className="rp-metric-ico">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.3-4.4A7.5 7.5 0 1 1 20 11.5Z" /></svg>
                        </span>
                        <strong>8<em>条</em></strong>
                        <span className="rp-metric-label">成员分享</span>
                        <span className="rp-metric-note">参与成员 4 人</span>
                      </article>
                      <article className="rp-metric">
                        <span className="rp-metric-ico">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6l2.6 6 6.4.5-4.9 4.2 1.5 6.3L12 16.3 6.4 19.6l1.5-6.3L3 9.1l6.4-.5z" /></svg>
                        </span>
                        <strong>3<em>条</em></strong>
                        <span className="rp-metric-label">我设精选</span>
                        <span className="rp-metric-note">展示在社团活动瞬间</span>
                      </article>
                    </div>
                  </section>

                  {/* 03 活动参与 */}
                  <section className="rp-sec">
                    <div className="rp-sec-head"><span className="rp-sec-no">03</span><h2>活动参与</h2></div>
                    <div className="rp-clubs">
                      <article className="rp-club">
                        <div className="rp-club-head">
                          <div>
                            <div className="rp-club-title">足球联盟<span className="rp-role">社长</span></div>
                            <span className="rp-club-sub">体育 · 已点名 5 场</span>
                          </div>
                          <span className="rp-club-rate">60<em>%</em></span>
                        </div>
                        <div className="rp-bar"><i style={{ width: '60%' }} /></div>
                        <div className="rp-nums">
                          <span className="is-p">出勤 <em>3</em> 场</span>
                          <span className="is-a">缺勤 <em>1</em> 场</span>
                          <span className="is-l">请假 <em>1</em> 场</span>
                        </div>
                      </article>
                      <article className="rp-club">
                        <div className="rp-club-head">
                          <div>
                            <div className="rp-club-title">光影戏剧社</div>
                            <span className="rp-club-sub">艺术 · 已点名 4 场</span>
                          </div>
                          <span className="rp-club-rate">75<em>%</em></span>
                        </div>
                        <div className="rp-bar"><i style={{ width: '75%' }} /></div>
                        <div className="rp-nums">
                          <span className="is-p">出勤 <em>3</em> 场</span>
                          <span className="is-a">缺勤 <em>0</em> 场</span>
                          <span className="is-l">请假 <em>1</em> 场</span>
                        </div>
                      </article>
                    </div>
                    <p className="rp-note">出勤率＝正常出勤场次 / 已点名场次；请假与缺勤不计入出勤。</p>
                  </section>

                  {/* 04 活动分享 */}
                  <section className="rp-sec">
                    <div className="rp-sec-head"><span className="rp-sec-no">04</span><h2>活动分享</h2></div>
                    <div className="rp-share-grid">
                      <div className="rp-share-stat"><span>我的分享</span><strong>4<em>条</em></strong></div>
                      <div className="rp-share-stat"><span>收到点赞</span><strong>62<em>次</em></strong></div>
                      <div className="rp-share-stat"><span>收到评论</span><strong>14<em>条</em></strong></div>
                      <div className="rp-share-stat is-feat"><span>被设为精选</span><strong>2<em>条</em></strong></div>
                    </div>

                    <div className="rp-wall">
                      <article className="rp-polaroid">
                        <span className="rp-tape" aria-hidden="true" />
                        <div className="rp-photo"><img src="assets/work-football-2.jpg" alt="校园足球联赛首轮的活动瞬间" /></div>
                        <div className="rp-p-body">
                          <div className="rp-p-top">
                            <strong>校园足球联赛首轮</strong>
                            <span className="rp-star">
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6l2.6 6 6.4.5-4.9 4.2 1.5 6.3L12 16.3 6.4 19.6l1.5-6.3L3 9.1l6.4-.5z" /></svg>
                              精选
                            </span>
                          </div>
                          <p className="rp-p-text">联赛首轮首发，开场那次边路回追把对方的直塞断下来了，赛后队长专门在更衣室提了一句。</p>
                          <div className="rp-p-meta">
                            <span className="rp-p-club">足球联盟</span>
                            <span>9 月 12 日 19:20</span>
                            <span>14 赞</span>
                            <span>3 评论</span>
                          </div>
                        </div>
                      </article>

                      <article className="rp-polaroid">
                        <span className="rp-tape" aria-hidden="true" />
                        <div className="rp-photo"><img src="assets/work-football-3.jpg" alt="校园友谊赛的活动瞬间" /></div>
                        <div className="rp-p-body">
                          <div className="rp-p-top">
                            <strong>校园友谊赛</strong>
                            <span className="rp-star">
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6l2.6 6 6.4.5-4.9 4.2 1.5 6.3L12 16.3 6.4 19.6l1.5-6.3L3 9.1l6.4-.5z" /></svg>
                              精选
                            </span>
                          </div>
                          <p className="rp-p-text">和摄影社联队的友谊赛，他们帮我们拍了好多照片，这张是我最喜欢的一张。</p>
                          <div className="rp-p-meta">
                            <span className="rp-p-club">足球联盟</span>
                            <span>10 月 23 日 18:20</span>
                            <span>21 赞</span>
                            <span>5 评论</span>
                          </div>
                        </div>
                      </article>
                    </div>

                    <p className="rp-note">仅展示被社长设为精选的活动分享；点赞与评论为社团成员的互动数据。</p>
                  </section>

                  {/* 05 学分结果 */}
                  <section className="rp-sec">
                    <div className="rp-sec-head"><span className="rp-sec-no">05</span><h2>学分结果</h2></div>
                    <div className="rp-cert">
                      <div className="rp-cert-paper">
                        <span className="rp-cert-eyebrow">2026—2027 学年 · 上学期</span>
                        <h3>社团学时证书</h3>
                        <p className="rp-cert-name">赵子易</p>
                        <div className="rp-cert-roles">
                          <div className="rp-cert-role is-leader">
                            <span className="rp-cert-role-bar" aria-hidden="true" />
                            <div className="rp-cert-role-items">
                              <div><strong>16<em>人</em></strong><span>管理成员</span></div>
                              <div><strong>13<em>场</em></strong><span>组织活动</span></div>
                              <div><strong>13<em>学时</em></strong><span>已核定</span></div>
                              <div><strong>6<em>学分</em></strong><span>认定学分</span></div>
                            </div>
                          </div>
                          <div className="rp-cert-role is-member">
                            <span className="rp-cert-role-bar" aria-hidden="true" />
                            <div className="rp-cert-role-items">
                              <div><strong>2<em>个</em></strong><span>参与社团</span></div>
                              <div><strong>6<em>场</em></strong><span>活动出勤</span></div>
                              <div><strong>4<em>条</em></strong><span>活动分享</span></div>
                              <div><strong>12<em>学时</em></strong><span>已核定</span></div>
                              <div><strong>6<em>学分</em></strong><span>认定学分</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rp-cert-stub">
                        <div className="rp-cert-stub-main">
                          <span className="rp-cert-stub-label">本学期已核定</span>
                          <strong>25<em>学时</em></strong>
                          <span className="rp-cert-credit">认定 12 学分</span>
                        </div>
                        <div className="rp-seal rp-seal-stamp" aria-hidden="true">
                          <span>社团</span>
                          <strong>学时</strong>
                          <em>专用章</em>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 收尾 */}
                  <section className="rp-closing">
                    <div className="rp-closing-seal" aria-hidden="true">
                      <span>2026</span>
                      <strong>秋</strong>
                      <em>分析报告</em>
                    </div>
                    <div className="rp-closing-text">
                      <h2>这一学期，留下你的社团痕迹</h2>
                      <p>从签到到精选，下学期等你回来。</p>
                    </div>
                  </section>
                </>
              ) : (
              /* 新生/未入团空态引导 */
              <div className="empty-guide-card">
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                  <Compass size={28} weight="duotone" />
                </div>
                <div className="empty-guide-title">暂无本学期社团记录</div>
                <div className="empty-guide-desc">
                  当前孩子尚未加入或创办社团。新学期社团招新已开放，可前往【社团广场】浏览并协助代报名。
                </div>
                <button
                  className="empty-jump-btn"
                  onClick={() => setActiveTab('plaza')}
                >
                  前往社团广场选报社团
                </button>
              </div>
            )}
            </div>
            {/* AI 解读悬浮按钮（与学生手机端 analysis.html 一致） */}
            <button type="button" className="rp-ai-fab" onClick={() => setReportAiOpen(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.4l1.9 5.4 5.4 1.9-5.4 1.9L12 17l-1.9-5.4L4.7 9.7l5.4-1.9z" /></svg>
              <span>AI 解读</span>
            </button>

            {/* AI 解读弹层 */}
            <div
              className={`mp-sheet-mask${reportAiOpen ? ' show' : ''}`}
              onClick={(e) => { if (e.target === e.currentTarget) setReportAiOpen(false); }}
            >
              <div className="mp-sheet">
                <div className="mp-sheet-handle" />
                <div className="mp-sheet-head">
                  <span className="mp-sheet-title">AI 解读 · 我的学期报告</span>
                  <button
                    type="button"
                    className="mp-sheet-close"
                    aria-label="关闭"
                    onClick={() => setReportAiOpen(false)}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
                  </button>
                </div>
                <div className="mp-sheet-body rp-ai-body">
                  <p className="rp-ai-scope">2 个社团 · 9 场活动 · 4 条分享 · 数据截至 2026-10-26</p>

                  <div className="rp-ai-hero">
                    <strong>这学期你在 2 个社团里到场 6 次、分享 4 条，稳稳的常驻选手。</strong>
                    <div className="rp-ai-tags">
                      <span className="tone-blue">到场小达人</span>
                      <span className="tone-violet">分享常客</span>
                      <span className="tone-amber">精选常客</span>
                    </div>
                  </div>

                  <section className="rp-ai-block">
                    <h4>我的高光</h4>
                    <p>「校园足球联赛首轮」的分享被社长设为精选，社团成员都能在活动瞬间里看到。</p>
                  </section>
                  <section className="rp-ai-block">
                    <h4>需要关注</h4>
                    <ul>
                      <li className="warn">「足球联盟」出勤率 60%，是你几个社团里最低的，下次别错过签到。</li>
                      <li className="warn">距离满勤还差 6 学时，再参加 3 场活动就能补上。</li>
                      <li className="good">你有 2 条精选分享，可以在活动瞬间里回看。</li>
                    </ul>
                  </section>
                  <section className="rp-ai-block">
                    <h4>别忘记</h4>
                    <ul>
                      <li className="normal">3 场活动的出勤还没点名，结果稍后更新。</li>
                    </ul>
                  </section>
                  <section className="rp-ai-block">
                    <h4>下学期小目标</h4>
                    <p>下学期多参加 2 场活动，把出勤率守在 90% 以上，再冲 2 条精选。</p>
                  </section>
                  <p className="rp-ai-foot">AI 生成内容仅供参考</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 底部双 Tab 导航栏：仅在主页时展示 */}
        <div className="bottom-tab-bar">
          <button
            className={`tab-btn ${activeTab === 'plaza' ? 'active' : ''}`}
            onClick={() => setActiveTab('plaza')}
          >
            <Compass size={22} weight={activeTab === 'plaza' ? 'fill' : 'regular'} />
            <span className="tab-btn-text">社团广场</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'report' ? 'active' : ''}`}
            onClick={() => setActiveTab('report')}
          >
            <ChartLineUp size={22} weight={activeTab === 'report' ? 'fill' : 'regular'} />
            <span className="tab-btn-text">分析报告</span>
          </button>
        </div>
      </>
    )}

    {/* ========================================================= */}
    {/* 视图 2：【社团申报专区】（完全对齐学生手机端）               */}
    {/* ========================================================= */}
    {currentView === 'proposeCenter' && (
      <div className="propose-page-wrapper">
        <div className="propose-scroll-content decl-scroll">
          {/* 1. 顶部提示行：申报开放信息 + 申报说明入口（对齐学生手机端） */}
          <section className="guide-panel">
            <div className="guide-head">
              <span className="guide-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5.5A2 2 0 0 1 6 3.5h5v16H6a2 2 0 0 0-2 2v-16Z" />
                  <path d="M20 5.5a2 2 0 0 0-2-2h-5v16h5a2 2 0 0 1 2 2v-16Z" />
                </svg>
              </span>
              <div className="guide-copy">
                <strong>本学期社团申报开放中</strong>
                <span>9 月 1 日—9 月 20 日 · 最多申报 1 个社团</span>
              </div>
            </div>
            <div className="guide-actions">
              <button type="button" className="guide-action" onClick={() => setIsGuideOpen(true)}>
                申报说明
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
            </div>
          </section>

          {/* 2. 学期筛选 + 申报条数 + 我的草稿入口（对齐学生手机端工具栏） */}
          <div className="list-toolbar">
            <select
              value={selectedProposalTerm}
              onChange={(e) => setSelectedProposalTerm(e.target.value)}
              aria-label="选择学期"
            >
              {ENROLL_TERM_OPTIONS.map(term => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>
            <div className="list-toolbar-right">
              <span className="list-count">共 {visibleProposalRecords.length} 条申报</span>
              <button
                type="button"
                className="drafts-entry-pill"
                onClick={() => setIsDraftsModalOpen(true)}
              >
                我的草稿<span className="drafts-count-badge">({draftRecords.length})</span>
              </button>
            </div>
          </div>

          {/* 3. 申报记录卡片列表（状态、教师意见、操作按钮对齐学生手机端） */}
          <div>
            {visibleProposalRecords.map(record => {
              const statusCls =
                record.status === 'approved' ? 'passed' : record.status === 'withdrawn' ? 'neutral' : record.status;
              const isVenueDemand = Boolean(record.venueDesc) && !record.venue;
              const venueLabel = isVenueDemand ? '场地说明' : '拟用场地';
              const venueText = isVenueDemand
                ? record.venueDesc
                : `${record.venue || '学校统筹安排'}${record.venueDesc ? ` · 场地说明：${record.venueDesc}` : ''}`;

              return (
                <article key={record.id} className="card decl-card">
                  <div className="decl-head">
                    <div className="decl-head-left">
                      <button
                        type="button"
                        className="decl-title"
                        onClick={() => setViewingDetailRecord(record)}
                      >
                        {record.name}
                      </button>
                      <span className="tag tag-cat">{record.category}</span>
                    </div>
                    <span className={`status-badge ${statusCls}`}>
                      <i />
                      {record.statusText}
                    </span>
                  </div>

                  <div className="decl-main">
                    <div className="decl-cover" style={{ backgroundImage: `url(${record.cover})` }} />
                    <div className="decl-body">
                      <div className="decl-meta">
                        <span>申报社长：<b>{record.captain}</b></span>
                        <span>计划人数：<b>{record.capacity} 人</b></span>
                      </div>
                      <div className="decl-meta">
                        <span>提交时间：<b>{record.submittedAt}</b></span>
                      </div>
                      <div className="decl-venue">
                        <b>{venueLabel}：</b>{venueText}
                      </div>
                    </div>
                  </div>

                  {record.status === 'rejected' && record.teacherFeedback && (
                    <div className="decl-feedback">
                      <div className="fb-head">
                        <strong>教师审核意见</strong>
                        <span>审核教师：{record.teacherFeedback.teacher}</span>
                        <span>（{record.teacherFeedback.time}）</span>
                      </div>
                      <p>{record.teacherFeedback.reason}</p>
                    </div>
                  )}

                  <div className="decl-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setViewingDetailRecord(record)}
                    >
                      查看
                    </button>
                    {record.status === 'pending' && (
                      <button
                        type="button"
                        className="btn btn-danger-text"
                        onClick={() => handleWithdraw(record)}
                      >
                        撤回
                      </button>
                    )}
                    {(record.status === 'rejected' || record.status === 'withdrawn') && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleOpenForm(record)}
                      >
                        修改
                      </button>
                    )}
                    {record.status === 'approved' && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => alert(`进入【${record.name}】社长管理后台`)}
                      >
                        进入管理
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {visibleProposalRecords.length === 0 && (
            <div className="empty-state">
              <strong>暂无该学期的申报记录</strong>
              <span>当前学期尚未提交社团申报，可点击底部【代孩子申报新社团】发起新社团。</span>
            </div>
          )}
        </div>

        {/* 4. 底部常驻主按钮（保持家长端文案不变） */}
        <div className="action-bar">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleOpenForm(null)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            代孩子申报新社团
          </button>
        </div>
      </div>
    )}

    {/* ========================================================= */}
    {/* 视图 3：【申报社团录入表单】（完全对齐学生桌面端截图 2）       */}
    {/* ========================================================= */}
    {currentView === 'proposeForm' && (
      <div className="propose-page-wrapper">
        {/* 上部独立滚动内容区（保证长表单自如滚动，绝不被按钮遮挡） */}
        <div className="propose-scroll-content form-scroll-padding">
          {/* 顶部规则提示条 / 已撤回或退回反馈横幅 */}
          {editingProposal?.status === 'withdrawn' ? (
            <div className="declaration-form-feedback-alert neutral">
              <div className="alert-head">
                <strong>社团申报已撤回</strong>
                {editingProposal.withdrawnAt && <span>撤回时间：{editingProposal.withdrawnAt}</span>}
              </div>
              <p className="alert-reason">申报已撤回，可在此修改内容并重新提交审核；若稍后再填，可点击下方“暂存修改”。</p>
            </div>
          ) : editingProposal?.status === 'rejected' && editingProposal.teacherFeedback ? (
            <div className="declaration-form-feedback-alert rejected">
              <div className="alert-head">
                <strong>教师审核退回意见</strong>
                <span>审核教师：{editingProposal.teacherFeedback.teacher}</span>
              </div>
              <p className="alert-reason">{editingProposal.teacherFeedback.reason}</p>
            </div>
          ) : (
            <div className="form-tip-banner">
              <span>📖 本学期申报开放中：9月1日 — 9月20日。学校发布的说明可随时查看。</span>
            </div>
          )}

          {/* 分区 1：基本信息 */}
          <div className="form-section-card">
            <div className="form-section-title">基本信息</div>
            
            <div className="form-item">
              <label className="form-label required">社团名称</label>
              <input
                className="form-input"
                placeholder="例如：校区摄影社、古风吟诵社"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>

            <div className="form-item">
              <label className="form-label required">社团类别</label>
              <div className="form-category-chips">
                {['人文', '科技', '体育', '艺术'].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    className={`cat-chip ${formCategory === cat ? 'active' : ''}`}
                    onClick={() => setFormCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row-2col">
              <div className="form-item">
                <label className="form-label required">社长</label>
                <input className="form-input readonly" value="赵子易" readOnly />
                <span className="form-sub-tip">当前申报学生，审核通过后为社长</span>
              </div>
              <div className="form-item">
                <label className="form-label required">计划人数上限</label>
                <input
                  className="form-input"
                  type="number"
                  value={formCapacity}
                  onChange={(e) => setFormCapacity(e.target.value)}
                />
              </div>
            </div>

            <div className="form-item">
              <label className="form-label required">社团封面</label>
              <div className="form-cover-picker">
                <div className="cover-thumb active">
                  <img src="assets/poster-football.jpg" alt="封面" />
                  <span className="cover-tag">经典体育</span>
                </div>
                <div className="cover-thumb">
                  <img src="assets/poster-reading.jpg" alt="封面" />
                  <span className="cover-tag">人文书香</span>
                </div>
                <div className="cover-thumb">
                  <img src="assets/poster-drama.jpg" alt="封面" />
                  <span className="cover-tag">戏剧艺术</span>
                </div>
                <div className="cover-thumb upload-btn">
                  <span>+ 上传</span>
                </div>
              </div>
            </div>

            <div className="form-item">
              <label className="form-label required">社团简介</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="用几句话介绍社团想做什么、希望一起完成什么"
                value={formShort}
                onChange={(e) => setFormShort(e.target.value)}
              />
            </div>
          </div>

          {/* 分区 2：招新与联系 */}
          <div className="form-section-card">
            <div className="form-section-title">招新与联系</div>
            
            <div className="form-item">
              <label className="form-label required">联系电话</label>
              <input
                className="form-input"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
              />
              <span className="form-sub-tip">将向本校学生公开，用于社团咨询</span>
            </div>

            <div className="form-item">
              <label className="form-label">招募说明</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="例如：希望每周能稳定参加活动，对招募感兴趣即可"
                value={formRecruitment}
                onChange={(e) => setFormRecruitment(e.target.value)}
              />
            </div>
          </div>

          {/* 分区 3：活动场地 */}
          <div className="form-section-card">
            <div className="form-section-title">活动场地</div>
            
            <div className="form-item">
              <label className="form-label">拟用场地</label>
              <input
                className="form-input"
                placeholder="例如：图书馆 302、创客空间、西操场"
                value={formVenue}
                onChange={(e) => setFormVenue(e.target.value)}
              />
            </div>

            <div className="form-item">
              <label className="form-label">场地说明</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="例如：每周一次，约 20 人，需要带投影的多媒体教室"
                value={formVenueDesc}
                onChange={(e) => setFormVenueDesc(e.target.value)}
              />
            </div>
          </div>

          {/* 分区 4：申报材料 */}
          <div className="form-section-card">
            <div className="form-section-title">申报材料</div>
            <div className="form-item">
              <label className="form-label">活动计划</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="请说明本学期拟开展的主要活动"
                value={formPlan}
                onChange={(e) => setFormPlan(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 底部吸底固定操作栏：置于整个容器底部，永不遮挡上方内容 */}
        <div className="propose-fixed-bottom-bar form-bottom-btns">
          <button
            className="form-draft-btn"
            onClick={() => handleSubmitForm(true)}
          >
            {editingProposal && (editingProposal.status === 'withdrawn' || editingProposal.status === 'rejected')
              ? '暂存修改'
              : '保存草稿'}
          </button>
          <button
            className="form-submit-btn"
            onClick={() => handleSubmitForm(false)}
          >
            {editingProposal && (editingProposal.status === 'withdrawn' || editingProposal.status === 'rejected')
              ? '重新提交申报'
              : '提交申报'}
          </button>
        </div>
      </div>
    )}

    {/* ========================================================= */}
    {/* 弹窗：【申报说明】（对齐学生手机端）                        */}
    {/* ========================================================= */}
    {isGuideOpen && (
      <div className="modal-mask" onClick={() => setIsGuideOpen(false)}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-dialog-header">
            <span className="modal-dialog-title">社团申报说明</span>
            <button className="modal-dialog-close" onClick={() => setIsGuideOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="modal-dialog-body">
            <p className="sheet-lead">
              本学期学生社团由学生自主发起。准备申报社团的同学，请在提交前阅读以下说明。
            </p>

            <section className="guide-block">
              <h4><span>一</span>申报要求</h4>
              <ul>
                <li>请在学校开放的申报时间内提交；社团应有明确的共同兴趣、活动目标和本学期计划。</li>
                <li>请准确选择社团类别，并合理填写计划人数、联系方式和场地需求。</li>
                <li>场地需求不等于实际预约，具体活动场地仍在发布活动时分别填写。</li>
              </ul>
            </section>

            <section className="guide-block">
              <h4><span>二</span>填写与审核</h4>
              <ul>
                <li>请按表单要求补充招新海报、活动计划及其他所需材料。</li>
                <li>教师将依据申报内容审核；被退回后，可根据意见修改原申报并重新提交。</li>
              </ul>
            </section>

            <section className="guide-block">
              <h4><span>三</span>通过后的责任</h4>
              <p>社团成立后，社长应公平组织招新，持续发布活动并如实沉淀参与记录。</p>
            </section>

            <div className="attach-card">
              <span className="attach-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
                  <path d="M14 3v5h5" />
                </svg>
              </span>
              <div className="attach-main">
                <strong>社团申报材料参考模板.pdf</strong>
                <span>申报材料填写参考</span>
              </div>
              <button type="button" className="attach-action" onClick={() => alert('文件下载能力建设中')}>
                下载
              </button>
            </div>

            <p className="sheet-contact">申报咨询：学生发展中心（知行楼 302 室）· 李老师</p>
          </div>
          <div className="modal-dialog-foot">
            <button className="btn btn-primary" onClick={() => setIsGuideOpen(false)}>我知道了</button>
          </div>
        </div>
      </div>
    )}

    {/* ========================================================= */}
    {/* 弹窗：【我的草稿】（对齐学生手机端）                        */}
    {/* ========================================================= */}
    {isDraftsModalOpen && (
      <div className="modal-mask" onClick={() => setIsDraftsModalOpen(false)}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-dialog-header">
            <span className="modal-dialog-title">我的草稿 ({draftRecords.length})</span>
            <button className="modal-dialog-close" onClick={() => setIsDraftsModalOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="modal-dialog-body">
            {draftRecords.length === 0 ? (
              <div className="drafts-empty">草稿箱空空如也，暂无保存的草稿</div>
            ) : (
              <>
                {draftRecords.map(draft => (
                  <article key={draft.id} className="draft-record-card">
                    <strong className="draft-name">{draft.name}</strong>
                    <div className="draft-meta">类别：{draft.category}</div>
                    <div className="draft-time">保存时间：{draft.updatedAt}</div>
                    <div className="draft-actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          if (confirm(`确认删除草稿【${draft.name}】吗？`)) {
                            setDraftRecords(prev => prev.filter(d => d.id !== draft.id));
                          }
                        }}
                      >
                        删除
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setIsDraftsModalOpen(false);
                          handleOpenForm(draft);
                        }}
                      >
                        继续编辑
                      </button>
                    </div>
                  </article>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    )}

    {/* ========================================================= */}
    {/* 弹窗：【社团申报详情查看】                                  */}
    {/* ========================================================= */}
    {viewingDetailRecord && (
      <div className="modal-mask" onClick={() => setViewingDetailRecord(null)}>
        <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
          <div className="modal-dialog-header">
            <span className="modal-dialog-title">申报详情 · {viewingDetailRecord.name}</span>
            <button className="modal-dialog-close" onClick={() => setViewingDetailRecord(null)}>
              <X size={16} />
            </button>
          </div>
          <div className="modal-dialog-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{viewingDetailRecord.name}</span>
                <span className={`proposal-status-badge ${viewingDetailRecord.status}`}>{viewingDetailRecord.statusText}</span>
              </div>

              {viewingDetailRecord.status === 'withdrawn' && (
                <div className="withdrawn-feedback-box" style={{ margin: '0 0 2px 0' }}>
                  <div className="feedback-header">
                    <strong>社团申报已撤回</strong>
                    {viewingDetailRecord.withdrawnAt && <span className="feedback-time">({viewingDetailRecord.withdrawnAt})</span>}
                  </div>
                  <p className="feedback-content">申报已撤回，可修改后重新提交；若不再需要可直接删除。</p>
                </div>
              )}

              {viewingDetailRecord.status === 'rejected' && viewingDetailRecord.teacherFeedback && (
                <div className="teacher-feedback-box" style={{ margin: '0 0 2px 0' }}>
                  <div className="feedback-header">
                    <strong>教师审核意见</strong>
                    <span className="feedback-meta">审核教师：{viewingDetailRecord.teacherFeedback.teacher}</span>
                  </div>
                  <p className="feedback-content">{viewingDetailRecord.teacherFeedback.reason}</p>
                </div>
              )}

              <div style={{ fontSize: '12px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div><strong>社团类别：</strong>{viewingDetailRecord.category}</div>
                <div><strong>申报学生：</strong>{viewingDetailRecord.captain}</div>
                <div><strong>计划人数：</strong>{viewingDetailRecord.capacity} 人</div>
                <div><strong>提交时间：</strong>{viewingDetailRecord.submittedAt}</div>
                {viewingDetailRecord.withdrawnAt && (
                  <div><strong>撤回时间：</strong>{viewingDetailRecord.withdrawnAt}</div>
                )}
                <div>
                  <strong>{viewingDetailRecord.venueDesc && !viewingDetailRecord.venue ? '场地需求：' : '拟用场地：'}</strong>
                  {viewingDetailRecord.venueDesc && !viewingDetailRecord.venue
                    ? viewingDetailRecord.venueDesc
                    : viewingDetailRecord.venue
                    ? (viewingDetailRecord.venueDesc ? `${viewingDetailRecord.venue}（说明：${viewingDetailRecord.venueDesc}）` : viewingDetailRecord.venue)
                    : '学校统筹安排'}
                </div>
                <div><strong>社团简介：</strong>{viewingDetailRecord.short || '暂无'}</div>
                <div><strong>招募要求：</strong>{viewingDetailRecord.recruitment || '暂无'}</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '10px 14px', borderTop: '1px solid #f1f5f9' }}>
            <button className="prop-btn text" onClick={() => setViewingDetailRecord(null)}>关闭</button>
            {viewingDetailRecord.status === 'pending' && (
              <button
                className="prop-btn text"
                onClick={() => {
                  const target = viewingDetailRecord;
                  setViewingDetailRecord(null);
                  handleWithdraw(target);
                }}
              >
                撤回
              </button>
            )}
            {viewingDetailRecord.status === 'withdrawn' && (
              <button
                className="prop-btn primary"
                onClick={() => {
                  const target = viewingDetailRecord;
                  setViewingDetailRecord(null);
                  handleOpenForm(target);
                }}
              >
                修改
              </button>
            )}
            {viewingDetailRecord.status === 'rejected' && (
              <button
                className="prop-btn primary"
                onClick={() => {
                  const target = viewingDetailRecord;
                  setViewingDetailRecord(null);
                  handleOpenForm(target);
                }}
              >
                修改
              </button>
            )}
          </div>
        </div>
      </div>
    )}

        {/* ========================================================= */}
        {/* 视图 4：【我报名的社团】（改版：主视图聚焦已通过，待审核收起，未通过胶囊） */}
        {/* ========================================================= */}
        {currentView === 'myApplications' && (() => {
          const pendingList = visibleEnrollApplications.filter(r => r.status === 'pending');
          const passedList = visibleEnrollApplications.filter(r => r.status === 'passed');
          const rejectedList = visibleEnrollApplications.filter(r => r.status === 'rejected');

          return (
            <div className="my-app-page-wrapper">
              <div className="my-app-scroll-content">
                {/* 顶部学期切换选择器与快捷操作条 */}
                <div className="enroll-top-bar">
                  <div className="enroll-term-selector-wrap">
                    <select
                      className="enroll-term-select"
                      value={selectedEnrollTerm}
                      onChange={(e) => setSelectedEnrollTerm(e.target.value)}
                    >
                      {ENROLL_TERM_OPTIONS.map(term => (
                        <option key={term} value={term}>
                          {term} {term === '2026-2027 学年上学期' ? '(当前)' : ''}
                        </option>
                      ))}
                    </select>
                    <CaretDown size={11} weight="bold" className="enroll-select-arrow" />
                  </div>

                  <div className="enroll-top-right-group">
                    {rejectedList.length > 0 && selectedEnrollTerm === '2026-2027 学年上学期' && (
                      <button
                        type="button"
                        className="enroll-rejected-pill"
                        onClick={() => setViewingRejectedItem(rejectedList[0])}
                        title="点击查看未通过反馈"
                      >
                        <span className="dot" />
                        <span>{rejectedList.length} 条未通过 ›</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 待审核折叠条（仅在存在待审核项时展示，默认收纳占1行，整行点击可展开） */}
                {pendingList.length > 0 && (
                  <div
                    className="enroll-pending-alert-bar"
                    onClick={() => setIsPendingExpanded(!isPendingExpanded)}
                  >
                    <div className="pending-summary-left">
                      <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', flex: 1, minWidth: 0, gap: '6px' }}>
                        <span className="pending-indicator-dot" />
                        <span className="pending-text-main">
                          <strong>{pendingList.length}</strong> 个社团报名审核中（{pendingList.map(p => p.clubName).join('、')}）
                        </span>
                      </div>
                      <div className="pending-toggle-btn">
                        <span>{isPendingExpanded ? '收起' : '查看'}</span>
                        <CaretDown
                          size={11}
                          weight="bold"
                          style={{
                            transform: isPendingExpanded ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.2s'
                          }}
                        />
                      </div>
                    </div>

                    {isPendingExpanded && (
                      <div className="pending-expanded-drawer">
                        {pendingList.map(record => {
                          return (
                            <div key={record.id} className="pending-compact-item">
                              <img src={record.cover} alt="" className="pending-item-cover" />
                              <div className="pending-item-info">
                                <div className="pending-item-name-row">
                                  <span className="pending-item-name">{record.clubName}</span>
                                  <span className="pending-item-tag">{record.category}</span>
                                </div>
                                <div className="pending-item-sub">
                                  社长：{record.captain} · 提交于 {record.submittedAt?.slice(5, 16) || record.submittedAt}
                                </div>
                              </div>
                              <div className="pending-item-actions">
                                <button
                                  type="button"
                                  className="pending-item-cancel-btn"
                                  onClick={() => handleCancelEnroll(record)}
                                >
                                  取消报名
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* 主视图内容区域 */}
                {visibleEnrollApplications.length === 0 ? (
                  <div className="enroll-empty-card">
                    <span>该学期暂无任何社团报名记录</span>
                    {selectedEnrollTerm === '2026-2027 学年上学期' && (
                      <button
                        type="button"
                        className="enroll-go-plaza-btn"
                        onClick={() => {
                          setCurrentView('main');
                          setActiveTab('plaza');
                        }}
                      >
                        前往社团广场选报
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    {/* 已通过的在研社团主列表（核心突出：社团风采、活动瞬间与成果） */}
                    {passedList.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div className="enroll-section-header">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>孩子已加入的社团</span>
                            <span className="count-badge">{passedList.length}</span>
                          </div>
                        </div>

                        {passedList.map((record, index) => {
                          // 第一个卡片（足球联盟）做丰富数据展示，第二个卡片（纪录片社）做无数据状态展示
                          const hasData = index === 0;
                          const clubKey = record.clubId === 'football' ? 'football' : (record.clubId === 'drama' ? 'drama' : 'football');
                          const showcase = CLUB_SHOWCASE_DATA[clubKey] || CLUB_SHOWCASE_DATA.football;
                          const momentsObj = CLUB_MOMENTS_DATA[clubKey] || CLUB_MOMENTS_DATA.football;
                          const thumb1 = momentsObj.moments[0]?.photo || 'assets/moment-team-1.jpg';
                          const thumb2 = momentsObj.moments[1]?.photo || 'assets/moment-team-2.jpg';
                          const thumb3 = momentsObj.moments[2]?.photo || 'assets/moment-team-3.jpg';
                          // 按钮内联展示的数量：活动瞬间份数、作品集锦与荣誉时刻条目数
                          const momentsTotal = hasData ? (momentsObj.summary?.total || 14) : 0;
                          const worksCount = hasData ? (showcase.works?.length || 5) : 0;
                          const honorsCount = hasData ? (showcase.honors?.length || 3) : 0;
                          const matchedPlazaClub = PLAZA_CLUBS.find(c => c.name === record.clubName || record.clubName.includes(c.name)) || {
                            id: record.clubId || 'football',
                            name: record.clubName,
                            category: record.category,
                            captain: record.captain,
                            contact: record.contact,
                            cover: record.cover,
                            short: '面向喜欢足球的同学，开展日常训练、友谊赛和校园足球活动。',
                            recruitment: '有兴趣或愿意长期参加活动的同学均可申请。',
                            members: 18,
                            capacity: 30
                          };

                          return (
                            <div key={record.id} className="enroll-joined-card">
                              {/* 头部：点击卡片头部整块直接进入社团详情 */}
                              <div
                                className="joined-card-header"
                                onClick={() => {
                                  setViewingClubDetail(matchedPlazaClub);
                                  setDetailTab('info');
                                  setNavHistory('myApplications');
                                  setCurrentView('clubDetail');
                                }}
                                title="点击查看社团详情"
                              >
                                <div className="joined-card-left-group">
                                  <div className="joined-card-thumb-wrap">
                                    <img src={record.cover} alt={record.clubName} className="joined-card-thumb-img" />
                                    <span className="joined-card-category-tag">{record.category}</span>
                                  </div>
                                  <div className="joined-card-title-meta">
                                    <div className="joined-card-title-row">
                                      <span className="joined-card-title">{record.clubName}</span>
                                      <span className="joined-card-passed-pill">已通过</span>
                                    </div>
                                    <div className="joined-card-leader-text">
                                      <span>学生社长：{record.captain}</span>
                                      {record.contact && <span style={{ color: '#64748b', marginLeft: '6px' }}>{record.contact}</span>}
                                    </div>
                                    <div className="joined-card-time-text">
                                      通过时间：{record.passedAt || record.submittedAt}
                                    </div>
                                  </div>
                                </div>

                                <div className="joined-card-arrow-wrap">
                                  <CaretRight size={14} weight="bold" />
                                </div>
                              </div>

                              {/* 社团风采与活动瞬间沉淀区 */}
                              <div
                                className="enroll-joined-features-box"
                                style={hasData
                                  ? { margin: 0 }
                                  : { margin: 0, background: 'transparent', border: 'none', padding: 0 }}
                              >
                                {hasData ? (
                                  <>
                                    {/* 3张缩略图横排，点击直达相册 */}
                                    <div
                                      className="enroll-thumbs-strip"
                                      title="点击查看全部活动瞬间"
                                      onClick={() => {
                                        setViewingClubMoments(matchedPlazaClub);
                                        setSelectedMomentActivity('all');
                                        setNavHistory('myApplications');
                                        setCurrentView('clubMoments');
                                      }}
                                    >
                                      <div className="enroll-thumb-item">
                                        <img src={thumb1} alt="" className="enroll-thumb-img" />
                                      </div>
                                      <div className="enroll-thumb-item">
                                        <img src={thumb2} alt="" className="enroll-thumb-img" />
                                      </div>
                                      <div className="enroll-thumb-item">
                                        <img src={thumb3} alt="" className="enroll-thumb-img" />
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <div className="enroll-empty-thumbs-placeholder">
                                    <Camera size={13} color="#94a3b8" />
                                    <span>暂无活动记录</span>
                                  </div>
                                )}
                              </div>

                              {/* 底栏双主操作按钮：50:50 等宽排列，按钮内联展示数量，无数据置灰 */}
                              <div className="joined-card-actions-row">
                                <button
                                  type="button"
                                  className={`joined-action-btn ${hasData ? 'showcase' : 'disabled'}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (hasData) {
                                      setViewingClubDetail(matchedPlazaClub);
                                      setDetailTab('showcase');
                                      setNavHistory('myApplications');
                                      setCurrentView('clubDetail');
                                    } else {
                                      showToast('本社团本学期暂未发布风采内容');
                                    }
                                  }}
                                >
                                  <Trophy size={13} weight={hasData ? 'fill' : 'regular'} />
                                  <span className="joined-action-copy">
                                    社团风采
                                    <em>作品 {worksCount} 荣誉 {honorsCount}</em>
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  className={`joined-action-btn ${hasData ? 'moments' : 'disabled'}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (hasData) {
                                      setViewingClubMoments(matchedPlazaClub);
                                      setSelectedMomentActivity('all');
                                      setNavHistory('myApplications');
                                      setCurrentView('clubMoments');
                                    } else {
                                      showToast('活动尚未开展，精彩瞬间沉淀中');
                                    }
                                  }}
                                >
                                  <Camera size={13} weight={hasData ? 'fill' : 'regular'} />
                                  <span>活动瞬间 {momentsTotal}</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* 如果仅有未录用记录且在历史学期，平铺展示提示 */}
                    {passedList.length === 0 && pendingList.length === 0 && rejectedList.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {rejectedList.map(record => (
                          <div key={record.id} className="enroll-record-card">
                            <div className="enroll-card-main">
                              <div className="enroll-cover-wrap">
                                <img src={record.cover} alt={record.clubName} className="enroll-cover-img" />
                                <span className="enroll-cover-tag">{record.category}</span>
                              </div>
                              <div className="enroll-info-block">
                                <div className="enroll-title-row">
                                  <span className="enroll-club-title">{record.clubName}</span>
                                  <span className="enroll-status-badge rejected">未通过</span>
                                </div>
                                <div className="enroll-meta-lines">
                                  <div className="enroll-meta-row">
                                    <span>学生社长：</span>
                                    <span>{record.captain}</span>
                                  </div>
                                  <div className="enroll-meta-row">
                                    <span>反馈原因：</span>
                                    <span style={{ color: '#ef4444' }}>{record.feedback || '名额已满'}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="enroll-card-actions">
                              <button
                                type="button"
                                className="enroll-btn primary"
                                onClick={() => handleReapply(record)}
                              >
                                <ArrowClockwise size={12} weight="bold" />
                                <span>重新报名</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })()}

        {/* ========================================================= */}
        {/* 视图 5：【社团主页与风采展厅】（完全对齐学生桌面端图1）       */}
        {/* ========================================================= */}
        {currentView === 'clubDetail' && viewingClubDetail && (() => {
          const club = viewingClubDetail;
          const clubKey = club.id === 'football' ? 'football' : (club.id === 'drama' ? 'drama' : (club.id === 'ai-robot' ? 'ai-robot' : (club.id === 'reading' ? 'reading' : 'football')));
          const showcase = CLUB_SHOWCASE_DATA[clubKey] || CLUB_SHOWCASE_DATA.football;
          const seats = (club.capacity || 30) - (club.members || 18);
          // 判断孩子是否已经是该社团成员
          const isJoined = enrollApplications.some(app => (app.clubId === club.id || club.name.includes(app.clubName)) && app.status === 'passed');
          const events = club.events || [];
          const showcaseItems = showcaseSubTab === 'works' ? (showcase.works || []) : (showcase.honors || []);
          const openPoster = () => openGallery([{ type: 'image', src: club.cover }], 0, club.name, '招新海报');
          const openShowcase = (item) => {
            const media = [item.cover, ...(item.photos || [])].map(src => ({ type: 'image', src }));
            openGallery(media, 0, item.title, showcaseSubTab === 'works' ? '作品集锦' : '荣誉时刻');
          };

          return (
            <div className="club-detail-page-wrapper">
              <div className="club-detail-scroll-content">
                {/* 1. 顶部社团 Hero（封面 + 渐变遮罩 + 底部信息） */}
                <div className="detail-hero">
                  <div className="detail-hero-img" style={{ backgroundImage: `url('${club.cover || 'assets/poster-football.jpg'}')` }} />
                  <div className="detail-hero-body">
                    <div className="detail-hero-tags">
                      <span className="tag tag-cat light">{club.category}</span>
                    </div>
                    <h1>{club.name}</h1>
                    <div className="detail-hero-meta">
                      <div className="meta-row">
                        <span>社长 {club.captain}</span>
                        {club.contact && (
                          <span className="meta-phone">
                            <Phone size={10} weight="bold" />
                            {club.contact}
                          </span>
                        )}
                      </div>
                      <div className="meta-row">
                        <span>成员 {club.members || 18} / {club.capacity || 30} 人</span>
                        {seats > 0
                          ? <span>剩余名额 {seats}</span>
                          : <span className="meta-seat full">名额已满</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. 一级主 Tab 切换栏（社团详情 vs 社团风采） */}
                <nav className="detail-tabs">
                  <button
                    type="button"
                    className={detailTab === 'info' ? 'active' : ''}
                    onClick={() => setDetailTab('info')}
                  >
                    社团详情
                  </button>
                  <button
                    type="button"
                    className={detailTab === 'showcase' ? 'active' : ''}
                    onClick={() => setDetailTab('showcase')}
                  >
                    社团风采
                  </button>
                </nav>

                {/* 3. Tab 1 内容：社团详情 */}
                {detailTab === 'info' && (
                  <div className="detail-pane">
                    <section className="detail-text-block">
                      <h2>社团简介</h2>
                      <p>{club.intro || club.short}</p>
                    </section>
                    <section className="detail-text-block">
                      <h2>招新说明</h2>
                      <p>{club.recruitment}</p>
                    </section>

                    <section className="detail-card detail-materials-card">
                      <div className="material-block">
                        <div className="detail-card-head">
                          <h2>招新海报</h2>
                          <button type="button" className="poster-hint" onClick={openPoster}>点击查看大图</button>
                        </div>
                        <figure className="recruit-poster" role="button" tabIndex={0} aria-label="查看招新海报大图" onClick={openPoster}>
                          <img src={club.cover} alt={`${club.name}招新海报`} />
                        </figure>
                      </div>

                      <div className="material-block">
                        <h2>活动计划</h2>
                        <p>{club.plan || '暂无活动计划'}</p>
                      </div>

                      <div className="material-block">
                        <div className="detail-card-head">
                          <h2>近期活动</h2>
                          <span>共 {events.length} 场</span>
                        </div>
                        <ol className="event-timeline">
                          {events.map((event, index) => (
                            <li key={`${event.md}-${event.title}`} className={index === 0 ? 'next' : ''}>
                              <span className="event-node">
                                <strong>{event.md}</strong>
                                <span>{event.wd}</span>
                              </span>
                              <div className="event-info">
                                <h3>
                                  {event.title}
                                  {index === 0 && <span className="event-next-badge">下一场</span>}
                                </h3>
                                <p className="event-info-meta"><span>{event.time} · {event.venue}</span></p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </section>
                  </div>
                )}

                {/* 4. Tab 2 内容：社团风采（作品集锦 / 荣誉时刻） */}
                {detailTab === 'showcase' && (
                  <div className="detail-pane">
                    <div className="sc-tabs">
                      <button
                        type="button"
                        className={`sc-tab ${showcaseSubTab === 'works' ? 'active' : ''}`}
                        onClick={() => setShowcaseSubTab('works')}
                      >
                        <Camera size={13} weight="bold" />
                        作品集锦 ({showcase.works?.length || 0})
                      </button>
                      <button
                        type="button"
                        className={`sc-tab ${showcaseSubTab === 'honors' ? 'active' : ''}`}
                        onClick={() => setShowcaseSubTab('honors')}
                      >
                        <Medal size={13} weight="fill" />
                        荣誉时刻 ({showcase.honors?.length || 0})
                      </button>
                    </div>

                    <div className="sc-list">
                      {showcaseItems.map((item, index) => {
                        const photos = [item.cover, ...(item.photos || [])];
                        return (
                          <article className="sc-card" key={item.id}>
                            <div
                              className="sc-thumb"
                              role="button"
                              tabIndex={0}
                              aria-label={`查看${item.title}`}
                              onClick={() => openShowcase(item)}
                            >
                              <img src={item.cover} alt={item.title} />
                              <span className="sc-badge">
                                {photos.length > 1 ? `${photos.length} 张` : <Eye size={10} weight="bold" />}
                              </span>
                            </div>
                            <div className="sc-body">
                              <h3>
                                {showcaseSubTab === 'honors' && <Trophy size={13} weight="fill" />}
                                <span>{item.title}</span>
                              </h3>
                              {showcaseSubTab === 'works' ? (
                                <p className="sc-field is-work"><span>创作者：</span><b>{item.creator}</b></p>
                              ) : (
                                <p className="sc-field is-honor"><span>获奖时间：</span><b>{item.date}</b></p>
                              )}
                              {item.desc && <p className="sc-desc">{item.desc}</p>}
                              <p className="sc-foot">{showcaseUploader(item.uploader)} · {showcaseUploadTime(item.date, index)}</p>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 底部悬浮操作 Bar */}
              <div className="detail-fixed-footer">
                {isJoined ? (
                  <button
                    type="button"
                    className="detail-footer-btn"
                    style={{ background: '#10b981' }}
                    onClick={() => {
                      setViewingClubMoments(club);
                      setSelectedMomentActivity('all');
                      setNavHistory('clubDetail');
                      setCurrentView('clubMoments');
                    }}
                  >
                    <CheckCircle size={16} weight="bold" />
                    <span>孩子已是正式团员 · 查看活动瞬间</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="detail-footer-btn"
                    disabled={!club.isOpen || club.applyEnded || seats <= 0}
                    onClick={() => {
                      setCurrentClubForApply(club);
                      setModalType('applyModal');
                    }}
                  >
                    {club.applyEnded ? '报名已截止' : (club.isOpen && seats > 0 ? '代孩子报名' : '名额已满')}
                  </button>
                )}
              </div>
            </div>
          );
        })()}

        {/* ========================================================= */}
        {/* 视图 6：【全部活动瞬间聚合页】（完全对齐学生桌面端图2）       */}
        {/* ========================================================= */}
        {currentView === 'clubMoments' && viewingClubMoments && (() => {
          const club = viewingClubMoments;
          const clubKey = club.id === 'football' ? 'football' : (club.id === 'drama' ? 'drama' : 'football');
          const momentsData = CLUB_MOMENTS_DATA[clubKey] || CLUB_MOMENTS_DATA.football;
          const currentList = selectedMomentActivity === 'all'
            ? momentsData.moments
            : momentsData.moments.filter(m => m.actId === selectedMomentActivity);

          return (
            <div className="club-moments-page-wrapper">
              <div className="club-moments-scroll-content">
                {/* 1. 统计横幅与活动滑动筛选条 (对齐图2顶部) */}
                <div className="moments-header-banner">
                  <div className="moments-stat-title-row">
                    <span className="moments-stat-title">本学期活动瞬间</span>
                    <span className="moments-stat-badge">共 {momentsData.summary?.total || 14} 份分享 · 覆盖 {momentsData.summary?.covered || 6} 场活动</span>
                  </div>

                  {/* 横向滑动筛选胶囊 (对齐图2全部活动下拉) */}
                  <div className="moments-scroll-pills">
                    {(momentsData.activities || []).map(act => (
                      <div
                        key={act.id}
                        className={`moments-pill-item ${selectedMomentActivity === act.id ? 'active' : ''}`}
                        onClick={() => setSelectedMomentActivity(act.id)}
                      >
                        {act.name}
                      </div>
                    ))}
                  </div>

                  <p className="moments-hint-text">
                    按活动时间汇总成员分享；右上角带“精选”为社长推荐，点击任一卡片可放大查看。
                  </p>
                </div>

                {/* 2. 2列网格瀑布流照片卡片 (对齐图2卡片列表) */}
                <div className="moments-grid-flow">
                  {currentList.map(moment => (
                    <div
                      key={moment.id}
                      className="moment-card-box"
                      onClick={() => setPreviewMomentItem(moment)}
                    >
                      <div className="moment-photo-container">
                        <img src={moment.photo} alt={moment.actName} className="moment-photo-img" />
                        {moment.isFeatured && (
                          <span className="moment-featured-tag">精选</span>
                        )}
                        <span className="moment-act-overlay-tag">{moment.actName}</span>
                      </div>
                      <div className="moment-card-info-row">
                        <span className="moment-author-name">{moment.author}</span>
                        <span>{moment.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

        {/* ========================================================= */}
        {/* 弹窗：活动精彩瞬间大图查看 (对齐图2点击放大)                 */}
        {/* ========================================================= */}
        {previewMomentItem && (
          <div className="modal-mask" onClick={() => setPreviewMomentItem(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '340px' }}>
              <div className="modal-dialog-header">
                <span className="modal-dialog-title">活动瞬间分享</span>
                <button className="modal-dialog-close" onClick={() => setPreviewMomentItem(null)}>
                  <X size={16} />
                </button>
              </div>
              <div className="modal-dialog-body" style={{ padding: '12px' }}>
                <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', background: '#0f172a', position: 'relative' }}>
                  <img src={previewMomentItem.photo} alt={previewMomentItem.actName} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  {previewMomentItem.isFeatured && (
                    <span style={{ position: 'absolute', top: '8px', right: '8px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '4px' }}>
                      精选
                    </span>
                  )}
                </div>
                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{previewMomentItem.actName}</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                    <span>分享人：<strong>{previewMomentItem.author}</strong></span>
                    <span>{previewMomentItem.time}</span>
                  </div>
                  {previewMomentItem.text && (
                    <p style={{ fontSize: '12px', color: '#475569', background: '#f8fafc', padding: '8px', borderRadius: '6px', margin: '4px 0 0' }}>
                      “{previewMomentItem.text}”
                    </p>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 14px', borderTop: '1px solid #f1f5f9' }}>
                <button className="prop-btn text" onClick={() => setPreviewMomentItem(null)}>关闭</button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 弹窗：未通过原因查看与重新申报指引                             */}
        {/* ========================================================= */}
        {viewingRejectedItem && (
          <div className="modal-mask" onClick={() => setViewingRejectedItem(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '340px' }}>
              <div className="modal-dialog-header">
                <span className="modal-dialog-title">报名审核反馈 · {viewingRejectedItem.clubName}</span>
                <button className="modal-dialog-close" onClick={() => setViewingRejectedItem(null)}>
                  <X size={16} />
                </button>
              </div>
              <div className="modal-dialog-body" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                  <img src={viewingRejectedItem.cover} alt="" style={{ width: '44px', height: '56px', borderRadius: '6px', objectFit: 'cover' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '12px' }}>
                    <strong style={{ fontSize: '13px', color: '#0f172a' }}>{viewingRejectedItem.clubName}</strong>
                    <span style={{ color: '#64748b' }}>学生社长：{viewingRejectedItem.captain}</span>
                    <span style={{ color: '#94a3b8', fontSize: '11px' }}>提交时间：{viewingRejectedItem.submittedAt}</span>
                  </div>
                </div>

                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px 12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#b91c1c', marginBottom: '4px' }}>
                    社长审核反馈（未通过）：
                  </div>
                  <div style={{ fontSize: '12px', color: '#991b1b', lineHeight: 1.5 }}>
                    {viewingRejectedItem.feedback || '很抱歉，本期报名人数较多，社团名额已满。感谢你对本科目的热情，欢迎关注其他社团或下学期再次选报！'}
                  </div>
                </div>

                <div style={{ fontSize: '11.5px', color: '#64748b', lineHeight: 1.5 }}>
                  💡 提示：本学期选课招新期内，您仍可协助孩子选择其他未招满的社团重新报名。
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '10px 14px', borderTop: '1px solid #f1f5f9' }}>
                <button className="prop-btn text" onClick={() => setViewingRejectedItem(null)}>关闭</button>
                <button
                  className="prop-btn primary"
                  onClick={() => {
                    const item = viewingRejectedItem;
                    setViewingRejectedItem(null);
                    handleReapply(item);
                  }}
                >
                  <ArrowClockwise size={12} weight="bold" />
                  <span>重新报名此社团</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 弹窗：【代孩子报名社团】                                     */}
        {/* ========================================================= */}
        {modalType === 'applyModal' && currentClubForApply && (
          <div className="modal-mask" onClick={() => setModalType(null)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-dialog-header">
                <span className="modal-dialog-title">代孩子报名 · {currentClubForApply.name}</span>
                <button className="modal-dialog-close" onClick={() => setModalType(null)}>
                  <X size={16} />
                </button>
              </div>
              <div className="modal-dialog-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '12px', color: '#475569' }}>
                    报名申请将直接提交至目标社团学生社长【{currentClubForApply.captain}】审核，审核通过后正式确立团员关系。
                  </div>
                  <div className="form-item">
                    <label className="form-label">特长或申请意向说明（选填）</label>
                    <textarea
                      className="form-textarea"
                      rows={3}
                      placeholder="可简述孩子的兴趣特长或参团意向，便于学生社长了解"
                      value={applyReason}
                      onChange={(e) => setApplyReason(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '10px 14px', borderTop: '1px solid #f1f5f9' }}>
                <button className="prop-btn text" onClick={() => setModalType(null)}>取消</button>
                <button className="prop-btn primary" onClick={handleConfirmApply}>确认提交报名</button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 全屏图片预览：招新海报 / 作品集锦 / 荣誉时刻（支持多图切换）  */}
        {/* ========================================================= */}
        {gallery && (
          <div className="gallery-mask" onClick={() => setGallery(null)}>
            <div className="gallery-head" onClick={(e) => e.stopPropagation()}>
              <div className="gallery-head-text">
                <strong>{gallery.title}</strong>
                {gallery.sub && <span>{gallery.sub}</span>}
              </div>
              <button type="button" className="gallery-close" aria-label="关闭预览" onClick={() => setGallery(null)}>
                <X size={14} />
              </button>
            </div>

            <div
              className="gallery-stage"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => { galleryDragX.current = e.clientX; }}
              onPointerUp={(e) => {
                const dx = e.clientX - galleryDragX.current;
                if (Math.abs(dx) > 45) stepGallery(dx < 0 ? 1 : -1);
                galleryDragX.current = 0;
              }}
            >
              <img src={gallery.media[gallery.index].src} alt={gallery.title} draggable={false} />
              {gallery.media.length > 1 && gallery.index > 0 && (
                <button type="button" className="gallery-nav prev" aria-label="上一张" onClick={() => stepGallery(-1)}>
                  <CaretLeft size={16} weight="bold" />
                </button>
              )}
              {gallery.media.length > 1 && gallery.index < gallery.media.length - 1 && (
                <button type="button" className="gallery-nav next" aria-label="下一张" onClick={() => stepGallery(1)}>
                  <CaretRight size={16} weight="bold" />
                </button>
              )}
            </div>

            <div className="gallery-foot" onClick={(e) => e.stopPropagation()}>
              {gallery.media.length > 1 && (
                <div className="gallery-dots">
                  {gallery.media.map((media, index) => (
                    <button
                      key={`${media.src}-${index}`}
                      type="button"
                      className={`gallery-dot ${index === gallery.index ? 'on' : ''}`}
                      aria-label={`查看第 ${index + 1} 张`}
                      onClick={() => setGallery((prev) => ({ ...prev, index }))}
                    />
                  ))}
                </div>
              )}
              <span className="gallery-count">
                {gallery.media.length > 1 ? `${gallery.index + 1} / ${gallery.media.length}` : ''}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
