import { useEffect, useMemo, useRef, useState } from "react";
import { DashboardHome } from "./DashboardHome.jsx";
import {
  PatchClubDetailPage,
  PatchManageMomentsOverview,
  PatchManageMomentPage,
  PatchManageShowcase,
  PatchMyClubsPage,
} from "./FourDomainStudent.jsx";
import "./four-domain.css";
import { ManageMomentPage, ManageMomentsOverview, manageMomentsOf, MomentViewer, momentNowTime, momentTimeText } from "./ManageMomentPage.jsx";
import {
  ArrowClockwise,
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Buildings,
  CalendarCheck,
  CalendarDots,
  Camera,
  CaretDown,
  CaretRight,
  ChatCircleDots,
  CheckCircle,
  ClipboardText,
  Clock,
  Coins,
  Compass,
  CopySimple,
  Crown,
  DownloadSimple,
  DotsThree,
  Export,
  FileText,
  GraduationCap,
  House,
  Info,
  Lightbulb,
  MagnifyingGlass,
  MapPin,
  Medal,
  NotePencil,
  OrangeSlice,
  Plus,
  Paperclip,
  PaperPlaneTilt,
  Phone,
  PuzzlePiece,
  Sparkle,
  Star,
  Student,
  UserCircle,
  UserPlus,
  UploadSimple,
  Users,
  WarningCircle,
  X,
  Trash,
  Heart,
  ImageSquare,
  HandWaving,
} from "@phosphor-icons/react";

const currentTerm = "2026-2027 学年上学期";
const bootParams = typeof window === "undefined" ? new URLSearchParams() : new URLSearchParams(window.location.search);

const formatNowDateTime = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const formatNowDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 讨论配图示意图（原型内置素材，模拟上传，最多 3 张）
const discussionPhotoPool = [
  "assets/gallery-sports.jpg",
  "assets/gallery-art.jpg",
  "assets/gallery-tech.jpg",
  "assets/gallery-humanities.jpg",
];

// 活动精彩瞬间（原型示意）：成员围绕单场活动自由分享，仅社团成员可见。
// 不设置讨论主题，也不承载活动报名或审核。
const discussionSeeds = {
  "doc-done": {
    topic: "初剪作品中，哪个片段最打动你？",
    posts: [
      { id: "p1", author: "林小薇", role: "社长", time: "10-18 17:05", content: "我先来：三组跟拍跑过梧桐道的那一段，手持晃动的质感特别真实。", likes: 6, liked: false },
      { id: "p2", author: "陈沐阳", role: "成员", time: "10-18 17:22", content: "同意！还有食堂窗口阿姨打菜时的抓拍，光影很好看，建议正片保留。截图发给大家看看。", likes: 4, liked: true, featured: true, photos: ["assets/gallery-tech.jpg"] },
      { id: "p3", author: "苏晓", role: "成员", time: "10-18 18:40", content: "我觉得片头空镜可以再短一点，直接进入人物叙述更抓人。", likes: 2, liked: false },
    ],
  },
  "doc-next": {
    topic: null,
    posts: [
      { id: "p1", author: "李一诺", role: "成员", time: "10-22 12:10", content: "周五的沟通会需要提前看哪版素材？麻烦组长在群里同步一下链接。", likes: 1, liked: false },
      { id: "p2", author: "林小薇", role: "社长", time: "10-22 12:31", content: "会前请各组把初剪上传到共享盘「10.25 初审」文件夹，会上按小组顺序过片。", likes: 3, liked: false },
    ],
  },
  "reading-next": {
    topic: "你心目中的异兽长什么样？欢迎描述，周六分享会也可带手绘稿。",
    posts: [
      { id: "p1", author: "周予安", role: "社长", time: "10-24 09:00", content: "先起个头：我心中的毕方是青色羽毛、单足站立，叫声像木柴爆裂。", likes: 5, liked: false },
      { id: "p2", author: "何雨桐", role: "成员", time: "10-24 10:15", content: "我想画一个九尾狐与烛龙结合的形象，先放几张草稿灵感图，周六分享会带来手稿。", likes: 4, liked: true, featured: true, photos: ["assets/gallery-art.jpg", "assets/gallery-humanities.jpg"] },
      { id: "p3", author: "沈亦然", role: "成员", time: "10-25 20:02", content: "共读时注意到异兽多为「人面」，也许古人是在借兽拟人。", likes: 2, liked: false },
    ],
  },
};

// 社团层面的公开成果：由学生社长维护，作品须标明实际创作成员。
// 活动精彩瞬间不放在这里，它只向本社团正式成员展示。
const clubShowcaseSeeds = {
  default: {
    works: [
      { id: "work-1", title: "校园友谊赛精彩片段", creators: "赵子易、顾一然、沈清越", description: "由社团成员共同完成的赛事影像记录。", image: "assets/gallery-sports.jpg", uploadedAt: "2026-10-18 16:20" },
      { id: "work-2", title: "秋季训练战术手册", creators: "足球联盟训练小组", description: "整理本学期常规训练与战术复盘要点。", image: "assets/gallery-tech.jpg", uploadedAt: "2026-10-12 15:05" },
    ],
    honors: [
      { id: "honor-1", title: "校园社团风采展示优秀成果", receivedAt: "2026-10-20", description: "学校社团文化节成果展示。", image: "assets/gallery-sports.jpg", uploadedAt: "2026-10-21 09:30" },
    ],
  },
  documentary: {
    works: [
      { id: "doc-work-1", title: "《梧桐道上的奔跑》微纪录片", creators: "林小薇、陈沐阳、苏晓", description: "校园人物微纪录片创作片段。", image: "assets/gallery-tech.jpg", uploadedAt: "2026-10-19 17:40" },
      { id: "doc-work-2", title: "校园人物采访摄影集", creators: "校园纪录片社全体成员", description: "围绕校园劳动者与同学生活完成的摄影记录。", image: "assets/gallery-humanities.jpg", uploadedAt: "2026-10-16 14:25" },
    ],
    honors: [
      { id: "doc-honor-1", title: "校园影像节优秀展示作品", receivedAt: "2026-10-22", description: "校园影像节作品展。", image: "assets/gallery-art.jpg", uploadedAt: "2026-10-23 10:15" },
    ],
  },
  empty: { works: [], honors: [] },
};

const getClubShowcase = (club) => {
  if (club?.id?.includes("reading")) return clubShowcaseSeeds.empty;
  return clubShowcaseSeeds[club?.id?.includes("documentary") ? "documentary" : "default"];
};

const joinHistory = [
  {
    id: "history-drama-expired",
    name: "光影戏剧社",
    category: "艺术",
    status: "expired",
    term: currentTerm,
    reason: "提交于 2026-09-08，社长超时未审核，申请已自动失效。",
    time: "2026-09-15 18:00",
  },
  {
    id: "history-astronomy",
    name: "天文观测社",
    category: "科技",
    status: "rejected",
    term: currentTerm,
    reason: "社长审核未通过：本学期名额已满，建议下学期优先报名。",
    time: "2026-09-21 10:12",
  },
];

const clubs = [
  {
    id: "football",
    name: "足球联盟",
    category: "体育",
    captain: "赵子安",
    contact: "138 0000 9218",
    capacity: 30,
    members: 18,
    short: "面向喜欢足球的同学，开展日常训练、友谊赛和校园足球活动。",
    recruitment: "有基础或愿意长期参加训练的同学均可申请。",
    window: "报名截止：9 月 20 日",
    state: "open",
    poster: "football",
    term: currentTerm,
    continued: true,
    ended: false,
    applyEnd: "2026 年 9 月 20 日",
    applyEnded: false,
    countdown: "3天 8小时 24分 36秒",
    events: ["10 月 23 日 16:20-17:50 · 西操场 · 校园友谊赛", "10 月 30 日 16:20-17:50 · 西操场 · 日常训练"],
  },
  {
    id: "robot",
    name: "机器人探索社",
    category: "科技",
    captain: "陈闻远",
    contact: "136 0000 5306",
    capacity: 20,
    members: 12,
    short: "围绕结构搭建、编程和创意挑战，完成可展示的机器人作品。",
    recruitment: "对机械、编程或创意设计感兴趣即可。",
    window: "报名截止：9 月 20 日",
    state: "open",
    poster: "robot",
    term: currentTerm,
    continued: false,
    ended: false,
    applyEnd: "2026 年 9 月 20 日",
    applyEnded: false,
    countdown: "2天 11小时 03分 12秒",
    events: ["10 月 24 日 16:10-17:40 · 创客空间 · 结构搭建"],
  },
  {
    id: "drama",
    name: "光影戏剧社",
    category: "艺术",
    captain: "李若彤",
    contact: "139 0000 1860",
    capacity: 24,
    members: 24,
    short: "从剧本、表演到舞台设计，共同完成一场属于学生的校园演出。",
    recruitment: "欢迎表演、编剧、灯光与舞美方向的同学。",
    window: "已达计划人数",
    state: "full",
    poster: "drama",
    term: currentTerm,
    continued: true,
    ended: false,
    applyEnd: "2026 年 9 月 20 日",
    applyEnded: false,
    countdown: "3天 8小时 24分 36秒",
    events: ["10 月 25 日 15:30-17:30 · 报告厅 · 排练"],
  },
  {
    id: "reading",
    name: "山海阅读会",
    category: "人文",
    captain: "周予安",
    contact: "137 0000 2648",
    capacity: 36,
    members: 21,
    short: "一起读、一起聊，从一本书延伸到更广阔的世界。",
    recruitment: "愿意稳定参加共读与分享活动。",
    window: "本学期加入申请已结束",
    state: "closed",
    poster: "reading",
    term: currentTerm,
    continued: false,
    ended: false,
    applyEnd: "2026 年 9 月 20 日",
    applyEnded: true,
    events: ["10 月 27 日 12:30-13:20 · 图书馆 302 · 共读分享"],
  },
  {
    id: "astronomy",
    name: "天文观测社",
    category: "科技",
    captain: "宋子航",
    contact: "135 0000 6677",
    capacity: 25,
    members: 19,
    short: "观测星空天体，学习天文望远镜使用与天体物理基础常识。",
    recruitment: "对星空探索、天文学与摄影感兴趣的同学均可报名。",
    window: "报名截止：9 月 20 日",
    state: "open",
    poster: "robot",
    term: currentTerm,
    continued: true,
    ended: false,
    applyEnd: "2026 年 9 月 20 日",
    applyEnded: false,
    countdown: "3天 8小时 24分 36秒",
    events: ["10 月 28 日 19:30-21:00 · 顶楼天文台 · 观星实践"],
  },
  {
    id: "debate",
    name: "弘毅辩论社",
    category: "人文",
    captain: "苏沐阳",
    contact: "138 0000 4433",
    capacity: 24,
    members: 20,
    short: "思辨明理，以辩会友，提升逻辑思辨能力与公众表达风采。",
    recruitment: "热爱思辨表达，乐于团队协作与逻辑探讨。",
    window: "报名截止：9 月 20 日",
    state: "open",
    poster: "reading",
    term: currentTerm,
    continued: false,
    ended: false,
    applyEnd: "2026 年 9 月 20 日",
    applyEnded: false,
    countdown: "2天 14小时 10分 00秒",
    events: ["10 月 26 日 16:30-18:00 · 阶梯教室 101 · 友谊辩论赛"],
  },
  {
    id: "documentary",
    name: "校园纪录片社",
    category: "艺术",
    captain: "林小薇",
    contact: "139 1102 3344",
    capacity: 20,
    members: 12,
    short: "记录校园真实故事，学习拍摄与剪辑技巧，创作微纪录片并举办期末放映会。",
    recruitment: "欢迎对纪实摄影、视频剪辑与故事采写感兴趣的同学。",
    window: "报名截止：9 月 20 日",
    state: "open",
    poster: "drama",
    term: currentTerm,
    continued: true,
    ended: false,
    applyEnd: "2026 年 9 月 20 日",
    applyEnded: false,
    countdown: "3天 8小时 24分 36秒",
    events: ["10 月 25 日 15:30-17:00 · 影媒工作间 204 · 初剪沟通会"],
  },
  {
    id: "basketball",
    name: "青春篮球俱乐部",
    category: "体育",
    captain: "周天羽",
    contact: "136 0000 8899",
    capacity: 30,
    members: 28,
    short: "挥洒汗水，强健身心，组织全场战术配合对抗与投篮技术训练。",
    recruitment: "热爱篮球运动、身体健康、能够按时出勤训练。",
    window: "仅剩 2 个名额",
    state: "open",
    poster: "football",
    term: currentTerm,
    continued: true,
    ended: false,
    applyEnd: "2026 年 9 月 20 日",
    applyEnded: false,
    countdown: "1天 05小时 18分 20秒",
    events: ["10 月 24 日 16:30-18:00 · 室内篮球馆 · 全场半幅实战演练"],
  },
];

// 我参与和管理的社团列表（支持不同角色身份）
const managedClubsList = [
  {
    id: "football",
    name: "足球联盟",
    category: "体育",
    cover: "football",
    role: "leader",
    captain: "赵子易",
    phone: "138 0000 9218",
    teacher: "李明（体育组）",
    venue: "西操场 1 号场地",
    frequency: "每周三 16:20",
    capacity: 30,
    membersCount: 16,
    status: "ongoing",
    term: "2026-2027 学年上学期",
    summary: "面向喜欢足球的同学，开展日常训练、友谊赛和校园足球活动，强健体魄并体验团队协作。",
    pendingApplicants: 2,
    pendingCredits: 1,
    upcomingActivities: 1,
  },
  {
    id: "documentary",
    name: "校园纪录片社",
    category: "艺术",
    cover: "drama",
    role: "member",
    captain: "林小薇",
    phone: "139 1102 3344",
    teacher: "张艺华（艺术传媒组）",
    venue: "影媒工作间 204",
    frequency: "隔周五 15:30",
    capacity: 20,
    membersCount: 12,
    status: "ongoing",
    term: "2026-2027 学年上学期",
    summary: "记录校园真实故事，学习拍摄与剪辑技巧，创作校园微纪录片并举办期末放映会。",
    pendingApplicants: 0,
    pendingCredits: 0,
    upcomingActivities: 1,
  },
];

// 申报时间和创建数量均由教师端的学期方案决定；未配置的规则不在学生端展示。
// 由教师端“社团申报说明”配置；原型中使用当前生效的示例内容。
const declarationGuide = {
  title: "社团申报说明",
  attachment: "社团申报材料参考模板.pdf",
  attachmentMeta: "1.2 MB · PDF 文档",
  contact: "学生发展中心（知行楼 302 室） · 李老师",
  serviceTime: "每周一至周五 08:30—17:00",
};

const declarationConfig = {
  declarationTime: "9 月 1 日—9 月 20 日",
  maximumPerStudent: 1,
  showLeaderContactToStudents: true,
  venueMethods: { library: true, description: true },
};

const termOptions = [
  "2026-2027 学年上学期",
  "2025-2026 学年下学期",
  "2025-2026 学年上学期",
];

const initialDeclarationRecords = [
  {
    id: "declare-city",
    term: "2026-2027 学年上学期",
    name: "城市观察社",
    category: "人文",
    cover: "reading",
    leader: "赵子易",
    capacity: "30",
    venueType: "需求说明",
    venue: "需容纳30人且配有投影的多媒体教室（近西操场）",
    submittedAt: "2026-09-15 14:30",
    status: "pending",
    summary: "通过行走、调研与记录，观察城市历史建筑与街区变迁，形成学生调研集锦。",
    recruitment: "喜欢摄影、写作与城市探索的同学均可参加。",
    contact: "138 0000 9218",
    plan: "每两周开展一次实地考察与讨论分享，学期末整理城市调研手记展。",
    poster: "城市观察社-招新海报.png",
  },
  {
    id: "declare-film",
    term: "2026-2027 学年上学期",
    name: "校园纪录片社",
    category: "艺术",
    cover: "drama",
    leader: "赵子易",
    capacity: "20",
    venueType: "拟用场地",
    venue: "影视工作间",
    submittedAt: "2026-09-12 16:10",
    status: "passed",
    summary: "记录校园真实故事，学习拍摄与剪辑技巧，创作校园微纪录片。",
    recruitment: "对摄像、剪辑与采访感兴趣的同学。",
    contact: "138 0000 9218",
    plan: "拍摄两部校园人物志微纪录片，学期末举行公开放映交流。",
    poster: "校园纪录片社-招新海报.png",
  },
  {
    id: "declare-poetry",
    term: "2026-2027 学年上学期",
    name: "古诗词吟诵社",
    category: "人文",
    cover: "reading",
    leader: "赵子易",
    capacity: "25",
    venueType: "拟用场地",
    venue: "图书馆 302",
    venueNote: "周三下午使用，需配备古琴及朗诵长桌",
    submittedAt: "2026-09-06 10:15",
    status: "rejected",
    reviewer: "李明",
    reviewedAt: "2026-09-08 15:40",
    reason: "本学期活动计划未填写完整，图书馆 302 周三已有课程占用，请调整场地说明或补充活动计划后重新申报。",
    summary: "品味古典诗词之美，组织朗诵与创作交流，体验古风雅韵。",
    recruitment: "热爱诗词与朗诵的同学均可参加。",
    contact: "138 0000 9218",
    plan: "",
    poster: "古诗词吟诵社-招新海报.png",
  },
  {
    id: "declare-drama-prev",
    term: "2025-2026 学年下学期",
    name: "校园话剧社",
    category: "艺术",
    cover: "drama",
    leader: "赵子易",
    capacity: "25",
    venue: "小剧场",
    submittedAt: "2026-02-28 10:20",
    status: "passed",
    summary: "排演经典校园短剧，开展台词与肢体表演训练。",
    recruitment: "热爱戏剧表演的同学。",
    contact: "138 0000 9218",
    plan: "学期中举行春季戏剧周展演。",
    poster: "校园话剧社-招新海报.png",
  },
  {
    id: "declare-debate-prev",
    term: "2025-2026 学年上学期",
    name: "思辨辩论社",
    category: "人文",
    cover: "reading",
    leader: "赵子易",
    capacity: "20",
    venue: "阶梯教室 201",
    submittedAt: "2025-09-05 09:30",
    status: "passed",
    summary: "提升逻辑思辨与公开演讲能力，参加校际中学生辩论邀请赛。",
    recruitment: "思维敏捷、喜欢探讨公共议题的同学。",
    contact: "138 0000 9218",
    plan: "每周组织一场模拟辩论赛。",
    poster: "思辨辩论社-招新海报.png",
  },
];

const initialDeclarationDrafts = [
  { id: "draft-paper", name: "纸艺工坊", category: "艺术", summary: "探索纸艺创作与校园展示。", recruitment: "欢迎喜欢手作和设计的同学。", capacity: "20", plan: "每两周开展一次纸艺创作和作品交流。", updatedAt: "2026-09-13 16:20" },
];

const sideItems = [
  ["工作台", House],
  ["画像", UserCircle],
  ["选课", BookOpen],
  ["校本选课", Buildings],
  ["学习任务", ClipboardText],
  ["综合实践活动", PuzzlePiece],
  ["学生实践", GraduationCap],
  ["学生社团", Star],
  ["场地预约", MapPin],
  ["作业公示", FileText],
  ["学生评教", ClipboardText],
  ["校园币", Coins],
  ["徽章", Medal],
];

function formatCurrentDateTime() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function Header({ variant = "dashboard", onVariantChange }) {
  return (
    <header className="app-header">
      <div className="brand-block">
        <span className="brand-mark" aria-hidden="true">
          <OrangeSlice size={27} weight="fill" />
        </span>
        <span className="brand-name">果之</span>
        <span className="brand-divider" />
        <span className="platform-name">果之产研教育教学智能平台</span>
      </div>
      <div className="header-actions">
        {onVariantChange && (
          <div className="variant-switch-compact" title="切换学生端架构方案">
            <button
              type="button"
              className={`variant-switch-btn ${variant === "classic" ? "active" : ""}`}
              onClick={() => onVariantChange("classic")}
            >
              大厅版
            </button>
            <button
              type="button"
              className={`variant-switch-btn ${variant === "dashboard" ? "active" : ""}`}
              onClick={() => onVariantChange("dashboard")}
            >
              看板版
            </button>
          </div>
        )}
        <button className="header-icon-button" type="button" aria-label="通知">
          <Bell size={19} />
        </button>
        <button className="header-icon-button" type="button" aria-label="下载">
          <DownloadSimple size={19} />
        </button>
        <button className="profile-button" type="button" aria-label="个人中心">
          <span className="avatar">
            <Student size={19} weight="fill" />
          </span>
          <span>赵子易</span>
        </button>
      </div>
    </header>
  );
}

function Sidebar({ active = "学生社团", onSelect }) {
  return (
    <aside className="student-sidebar" aria-label="主导航">
      <nav>
        {sideItems.map(([label, Icon]) => {
          const isActive = label === active;
          return (
            <button
              key={label}
              type="button"
              className={`side-item ${isActive ? "active" : ""}`}
              onClick={() => onSelect && onSelect(label)}
            >
              <Icon size={17} weight={isActive ? "fill" : "regular"} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function PageHeader({ title, back, onBack, actions }) {
  return (
    <div className="page-header">
      <div className="page-title-row">
        {back && (
          <button type="button" className="back-button" onClick={onBack} aria-label="返回">
            <ArrowLeft size={18} weight="bold" />
          </button>
        )}
        <h1>{title}</h1>
      </div>
      {actions && <div className="page-task-actions">{actions}</div>}
    </div>
  );
}

function App() {
  const [homeVariant, setHomeVariant] = useState("dashboard"); // "dashboard" (实践看板) | "classic" (社团大厅)
  const [page, setPage] = useState(() => bootParams.get("page") || (typeof window !== "undefined" && window.__PROTO_PAGE__) || "home");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [onlyJoinable, setOnlyJoinable] = useState(false);
  const [selectedClub, setSelectedClub] = useState(() => (bootParams.get("page") || window.__PROTO_PAGE__) === "detail" ? clubs[0] : null);
  const [mineTab, setMineTab] = useState("joined");
  const [manageTab, setManageTab] = useState(() => bootParams.get("tab") || (typeof window !== "undefined" && window.__PROTO_TAB__) || "members");
  const [managedClubId, setManagedClubId] = useState("football");
  const [manageTerm, setManageTerm] = useState("2026-2027 学年上学期");
  const [manageViewMode, setManageViewMode] = useState("split"); // 默认方案二（左右双列分栏）；可随时秒切方案一（通栏看板）
  const [showClubDropdown, setShowClubDropdown] = useState(false);

  const currentManagedClub = useMemo(() => {
    return managedClubsList.find((c) => c.id === managedClubId) || managedClubsList[0];
  }, [managedClubId]);

  const [applyClub, setApplyClub] = useState(null);
  const [applyMode, setApplyMode] = useState("apply");
  const openApply = (club, mode = "apply") => {
    setApplyMode(mode);
    setApplyClub(club);
  };
  const [declarationTab, setDeclarationTab] = useState("all");
  const [declarationRecords, setDeclarationRecords] = useState(initialDeclarationRecords);

  useEffect(() => {
    // 确保开发环境 HMR 热更或初始挂载时，当前学期保持 3 条完整状态样例
    setDeclarationRecords((prev) => {
      const currentCount = (prev || []).filter((r) => r.term === "2026-2027 学年上学期").length;
      if (currentCount < 3) {
        return initialDeclarationRecords;
      }
      return prev;
    });
  }, []);
  const [declarationDrafts, setDeclarationDrafts] = useState(initialDeclarationDrafts);
  const [editingDraft, setEditingDraft] = useState(null);
  const [formMode, setFormMode] = useState("create"); // "create" | "draft" | "resubmit" | "withdrawn"
  const [withdrawRecord, setWithdrawRecord] = useState(null);
  const [deleteDeclarationRecord, setDeleteDeclarationRecord] = useState(null);
  const [showDeclarationGuide, setShowDeclarationGuide] = useState(false);
  const [detailRecord, setDetailRecord] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState("");
  const [renewalRequest, setRenewalRequest] = useState(null);
  const [detailFrom, setDetailFrom] = useState(() => bootParams.get("entry") || window.__PROTO_ENTRY__ || "home"); // 记录社团详情的来源页，用于返回
  const [detailView, setDetailView] = useState(() => bootParams.get("view") || window.__PROTO_VIEW__ || "detail");
  const [filters, setFilters] = useState({ term: currentTerm, continued: "all", ended: "all" });
  const [myJoin, setMyJoin] = useState({ football: "joined" });
  const [historyOpen, setHistoryOpen] = useState(false);
  const [discussionActivity, setDiscussionActivity] = useState(null);
  const [momentWall, setMomentWall] = useState(() => (bootParams.get("page") || window.__PROTO_PAGE__) === "moment-wall" ? {
    id: "doc-done",
    clubName: "校园纪录片社",
    title: "影视摄影构图与手持云台实操训练",
    day: "10.18",
    week: "周五",
    time: "15:30 - 17:00",
    venue: "影视工作间 204",
    status: "已结束",
    attendance: "已出勤",
    from: "mine",
  } : null);
  const [applyingCreditClub, setApplyingCreditClub] = useState(null);
  const [manageMomentActivity, setManageMomentActivity] = useState(null);
  // 学分申请状态机（学生端按钮：申请学分 → 撤回申请(未初审) → 初审中 → 终审中 → 查看学分）。
  // 状态由社长初审、教师终审推进；学生端仅在「未初审」阶段可撤回。
  // 原型以两条已加入社团预置「未初审」「终审通过」两种状态，便于核对撤回与查看结果。
  const [creditStates, setCreditStates] = useState({ "documentary-member": "pending", "reading-member": "approved" });
  // 学分申报内容留档：提交时写入，撤回后仍保留，供「查看申请」只读回看
  const [creditApplications, setCreditApplications] = useState({
    "documentary-member": {
      hours: "6.0",
      summary: "本学期参与了 3 次校园人物采访和 2 次剪辑工作，独立完成一段 2 分钟的采访片段粗剪，跟着社长学会了收音和三脚架布光。",
      file: "校园采访签到与剪辑记录.pdf",
      submittedAt: "2026-10-20 18:30",
    },
    "reading-member": {
      hours: "3.0",
      summary: "完成本学期两次主题共读，负责其中一次的书单整理与现场主持，并写了 3 篇读书笔记。",
      file: "共读签到与读书笔记.pdf",
      submittedAt: "2026-10-18 20:15",
    },
  });
  const [creditDetailClub, setCreditDetailClub] = useState(null);
  const [creditResultClub, setCreditResultClub] = useState(null);
  const [cancelClub, setCancelClub] = useState(null);
  const [mineFrom, setMineFrom] = useState("home"); // 记录「我报名的」来源页，用于返回

  const isAllTerms = filters.term === "全部学期";
  const activeTerm = filters.term && !isAllTerms ? filters.term : currentTerm;
  const activeFilterCount = [filters.term !== "" && filters.term !== currentTerm && !isAllTerms].filter(Boolean).length;
  const scopeText = isAllTerms ? "全部学期" : filters.term && filters.term !== currentTerm ? filters.term : "本学期";
  const joinedCount = Object.values(myJoin).filter((v) => v === "joined").length;
  const pendingCount = 1; // 机器人探索社申请审核中（静态示意）
  const openCount = clubs.filter((c) => c.state === "open" && myJoin[c.id] !== "joined").length;

  const visibleClubs = useMemo(() => clubs.filter((club) => {
    const keywordMatch = `${club.name}${club.captain}${club.short}`.includes(keyword.trim());
    const categoryMatch = !category || category === "全部" || club.category === category;
    const termMatch = isAllTerms || club.term === activeTerm;
    const continuedMatch = !filters.continued || filters.continued === "all" || (filters.continued === "yes") === Boolean(club.continued);
    const endedMatch = !filters.ended || filters.ended === "all" || (filters.ended === "yes") === Boolean(club.ended);
    const joinableMatch = !onlyJoinable || club.state === "open";
    return keywordMatch && categoryMatch && termMatch && continuedMatch && endedMatch && joinableMatch;
  }), [keyword, category, onlyJoinable, activeTerm, isAllTerms, filters]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };

  const submitRenewalRequest = (request) => {
    setRenewalRequest(null);
    setPage("manage");
    notify(`「${request.club.name}」延续到下学期（${request.targetTerm}）申请已提交，等待教师确认。`);
  };

  const navigate = (nextPage) => {
    setPage(nextPage);
    setSelectedClub(null);
    if (nextPage === "home") setHomeVariant("dashboard");
  };

  const showClub = (club, from = "home", view = "detail") => {
    // 不同入口的社团对象字段不一致（看板「我管理的」用 membersCount/cover/phone），统一补齐详情页所需字段
    setSelectedClub({
      ...club,
      poster: club.poster || club.cover,
      members: club.members ?? club.membersCount ?? 0,
      capacity: club.capacity ?? 24,
      state: club.state || "closed",
      events: club.events || [],
      contact: club.contact || club.phone,
      applyEnd: club.applyEnd || "2026 年 9 月 20 日",
      applyEnded: club.applyEnded ?? true,
    });
    setDetailFrom(from);
    setDetailView(view);
    setPage("detail");
  };

  const openMomentWall = (activity, from = "mine") => {
    setMomentWall({ ...activity, from });
    setDiscussionActivity(null);
    setPage("moment-wall");
  };

  const cancelJoin = (club) => {
    setCancelClub(club);
  };

  const confirmCancelJoin = () => {
    const club = cancelClub;
    setCancelClub(null);
    if (!club) return;
    setMyJoin((prev) => ({ ...prev, [club.id]: "" }));
    notify(`已取消「${club.name}」的报名。`);
  };

  const openDeclarationForm = (record = null, explicitMode = null) => {
    let mode = explicitMode;
    if (!mode) {
      if (record?.status === "rejected") {
        mode = "resubmit";
      } else if (record?.status === "withdrawn") {
        mode = "withdrawn";
      } else if (record?.id && record.id.startsWith("draft-")) {
        mode = "draft";
      } else {
        mode = record ? "draft" : "create";
      }
    }
    setFormMode(mode);
    setEditingDraft(record);
    setPage("declaration-form");
  };

  const saveDeclarationDraft = (draft) => {
    const nowTime = formatCurrentDateTime();
    if (formMode === "resubmit" || formMode === "withdrawn") {
      setDeclarationRecords((previous) =>
        previous.map((item) => (item.id === draft.id ? { ...item, ...draft, updatedAt: nowTime } : item))
      );
      navigate("applications");
      notify("已暂存修改内容，可随时重新提交。");
      return;
    }
    const draftWithTime = { ...draft, updatedAt: nowTime };
    setDeclarationDrafts((previous) => {
      const exists = previous.some((item) => item.id === draft.id);
      return exists ? previous.map((item) => item.id === draft.id ? draftWithTime : item) : [draftWithTime, ...previous];
    });
    setEditingDraft(draftWithTime);
    navigate("drafts");
    notify("草稿已保存，可在“我的草稿”中继续填写。");
  };

  const submitDeclaration = (draft) => {
    const nowTime = formatCurrentDateTime();
    if (draft.id && declarationRecords.some((item) => item.id === draft.id)) {
      setDeclarationRecords((previous) => previous.map((item) =>
        item.id === draft.id ? {
          ...item,
          ...draft,
          status: "pending",
          submittedAt: nowTime,
          reason: "",
          reviewer: "",
          reviewedAt: "",
          withdrawnAt: "",
        } : item
      ));
      navigate("applications");
      notify(`“${draft.name}”已重新提交申报，等待教师审核。`);
      return;
    }
    const record = {
      ...draft,
      id: `declare-${Date.now()}`,
      term: "2026-2027 学年上学期",
      name: draft.name || "未命名社团",
      category: draft.category || "人文",
      cover: draft.cover || "reading",
      customCover: draft.customCover || null,
      leader: "赵子易",
      capacity: draft.capacity || "25",
      venue: draft.venue || "创客空间（室内投影）",
      submittedAt: nowTime,
      status: "pending",
    };
    setDeclarationRecords((previous) => [record, ...previous]);
    setDeclarationDrafts((previous) => previous.filter((item) => item.id !== draft.id));
    navigate("applications");
    notify(`“${record.name}”已提交社团申报，等待教师审核。`);
  };

  const withdrawDeclaration = () => {
    if (!withdrawRecord) return;
    const record = withdrawRecord;
    const nowTime = formatCurrentDateTime();
    setDeclarationRecords((previous) => previous.map((item) =>
      item.id === record.id ? { ...item, status: "withdrawn", withdrawnAt: nowTime } : item
    ));
    setWithdrawRecord(null);
    notify(`“${record.name}”已撤回申报，可修改后重新提交。`);
  };

  const deleteDeclaration = () => {
    if (!deleteDeclarationRecord) return;
    const record = deleteDeclarationRecord;
    setDeclarationRecords((previous) => previous.filter((item) => item.id !== record.id));
    setDeleteDeclarationRecord(null);
    notify(`已删除“${record.name}”的申报记录。`);
  };

  const deleteDraft = (draftId) => {
    setDeclarationDrafts((previous) => previous.filter((item) => item.id !== draftId));
    notify("草稿已删除。");
  };

  const pageMetaConfig = {
    home: {
      title: "学生社团",
      back: false,
      actions: (
        <>
          <button type="button" className="btn-header-outline" onClick={() => navigate("report")}>社团报告</button>
          <button type="button" className="btn-header-outline" onClick={() => { setMineFrom("home"); navigate("mine"); }}>我报名的（2）</button>
          <button type="button" className="btn-header-outline" onClick={() => navigate("manage")}>
            我管理的（{managedClubsList.filter((c) => c.role === "leader").length}）
          </button>
          <button type="button" className="btn-header-primary" onClick={() => navigate("applications")}>社团申报（{Math.max(3, declarationRecords.filter((r) => r.term === "2026-2027 学年上学期").length)}）</button>
        </>
      ),
    },
    plaza: {
      title: "社团广场",
      back: true,
      onBack: () => navigate("home"),
      actions: (
        <button type="button" className="mine-entry-pill" onClick={() => { setMineFrom("plaza"); navigate("mine"); }}>
          <HandWaving size={16} weight="fill" />
          去看看我加入的社团吧
        </button>
      ),
    },
    applications: {
      title: "社团申报",
      back: true,
      onBack: () => navigate("home"),
      actions: (
        <>
          <button type="button" className="btn-header-outline" onClick={() => navigate("drafts")}>我的草稿（{declarationDrafts.length}）</button>
          <button type="button" className="btn-header-primary" onClick={() => openDeclarationForm()}>＋ 申报社团</button>
        </>
      ),
    },
    drafts: {
      title: "我的草稿",
      back: true,
      onBack: () => navigate("applications"),
      actions: null,
    },
    "declaration-form": {
      title: formMode === "resubmit" ? "修改社团申报" : (formMode === "draft" ? "编辑社团申报草稿" : "申报社团"),
      back: true,
      onBack: () => navigate(formMode === "draft" ? "drafts" : "applications"),
      actions: null,
    },
    "renewal-details": {
      title: "更新下一学期社团资料",
      back: true,
      onBack: () => navigate("manage"),
      actions: null,
    },
    mine: {
      title: "我报名的社团",
      back: true,
      onBack: () => navigate(mineFrom === "plaza" ? "plaza" : "home"),
      actions: (
        <button type="button" className="btn-header-outline is-negative" onClick={() => setHistoryOpen(true)}>
          <i className="header-negative-dot" aria-hidden="true" />
          查看未通过记录
        </button>
      ),
    },
    manage: {
      title: "我管理的社团",
      back: true,
      onBack: () => navigate("home"),
      actions: (
        <div className="manage-header-actions-group">
          <select
            className="term-select-capsule"
            value={manageTerm}
            onChange={(e) => {
              setManageTerm(e.target.value);
              notify(`已切换学期至：${e.target.value}`);
            }}
            aria-label="筛选学期"
          >
            <option value="2026-2027 学年上学期">2026-2027 学年上学期 (当前学期)</option>
            <option value="2025-2026 学年下学期">2025-2026 学年下学期 (已归档)</option>
            <option value="2025-2026 学年上学期">2025-2026 学年上学期 (已归档)</option>
          </select>
        </div>
      ),
    },
    report: {
      title: "社团报告",
      back: true,
      onBack: () => navigate("home"),
      actions: (
        <div className="term-select-wrapper">
          <select className="term-select-capsule" defaultValue={currentTerm} aria-label="筛选学期">
            <option value={currentTerm}>{currentTerm}（本学期）</option>
            <option value="2025-2026 学年下学期">2025-2026 学年下学期</option>
          </select>
          <CaretDown size={14} weight="bold" className="term-select-caret" />
        </div>
      ),
    },
    detail: {
      title: selectedClub ? selectedClub.name : "社团详情",
      back: true,
      onBack: () => navigate(detailFrom === "plaza" ? "plaza" : detailFrom === "mine" ? "mine" : "home"),
      actions: null,
    },
    "moment-wall": {
      title: "活动瞬间",
      back: true,
      onBack: () => {
        const backToDetail = momentWall?.from === "detail";
        setPage(backToDetail ? "detail" : "mine");
      },
      actions: null,
    },
  };

  const currentMeta = pageMetaConfig[page] || pageMetaConfig.home;

  return (
    <div className="app-shell">
      <Header
        variant={homeVariant}
        onVariantChange={(v) => {
          setHomeVariant(v);
          navigate(v === "classic" ? "plaza" : "home");
          notify(`已切换至：${v === "dashboard" ? "方案B · 学生实践看板" : "方案A · 社团广场"}`);
        }}
      />
      <Sidebar active="学生社团" onSelect={(item) => item === "学生社团" && navigate("home")} />
      <main className="workspace">
        <section className="content-panel">
          <PageHeader
            title={currentMeta.title}
            back={currentMeta.back}
            onBack={currentMeta.onBack}
            actions={currentMeta.actions}
          />
          <div className="page-content">
            {page === "home" && (
              <DashboardHome
                clubs={clubs}
                managedClubs={managedClubsList}
                declarationRecords={declarationRecords}
                onNavigate={navigate}
                onShowClub={showClub}
                onApplyClub={(club) => openApply(club)}
                onOpenDeclaration={() => openDeclarationForm()}
                onNotify={notify}
              />
            )}
            {page === "plaza" && (
              <HomePage
                clubs={visibleClubs}
                keyword={keyword}
                category={category}
                onlyJoinable={onlyJoinable}
                activeFilterCount={activeFilterCount}
                scopeText={scopeText}
                joinStats={{ joined: joinedCount, pending: pendingCount, open: openCount }}
                myJoin={myJoin}
                onKeyword={setKeyword}
                onCategory={setCategory}
                onToggleJoinable={() => setOnlyJoinable(!onlyJoinable)}
                onClearFilters={() => setFilters({ term: currentTerm, continued: "all", ended: "all" })}
                filters={filters}
                onFiltersChange={setFilters}
                onShowClub={(club) => showClub(club, "plaza")}
                onApplyClub={(club) => openApply(club)}
                onCancelJoin={cancelJoin}
              />
            )}
            {page === "mine" && <PatchMyClubsPage initialPendingOpen={bootParams.get("view") === "pending"} onShowClub={(club, view = "detail") => showClub(club, "mine", view)} onOpenMoment={(activity) => openMomentWall(activity, "mine")} onApplyCredit={setApplyingCreditClub} creditStates={creditStates} onWithdrawCredit={(club) => { setCreditStates((previous) => ({ ...previous, [club.id]: "withdrawn" })); notify(`已撤回「${club.name}」的学分申请，可随时重新申请。`); }} onViewCredit={setCreditResultClub} onViewCreditApplication={(club) => setCreditDetailClub(club)} onDemoCreditState={(clubId, state) => setCreditStates((previous) => ({ ...previous, [clubId]: state === "none" ? undefined : state }))} />}
            {page === "applications" && (
              <ApplicationsPage
                records={declarationRecords}
                onNavigate={navigate}
                onWithdraw={setWithdrawRecord}
                onDelete={setDeleteDeclarationRecord}
                onResubmit={(record) => openDeclarationForm({ ...record, updatedAt: formatCurrentDateTime() }, record.status === "withdrawn" ? "withdrawn" : "resubmit")}
                onShowDetail={setDetailRecord}
                onNotify={notify}
                onShowGuide={() => setShowDeclarationGuide(true)}
              />
            )}
            {page === "drafts" && (
              <DraftsPage
                drafts={declarationDrafts}
                onEdit={(draft) => openDeclarationForm(draft, "draft")}
                onDelete={deleteDraft}
              />
            )}
            {page === "declaration-form" && (
              <DeclarationForm
                draft={editingDraft}
                mode={formMode}
                showLeaderContactToStudents={declarationConfig.showLeaderContactToStudents}
                venueMethods={declarationConfig.venueMethods}
                onSave={saveDeclarationDraft}
                onSubmit={submitDeclaration}
                onShowGuide={() => setShowDeclarationGuide(true)}
              />
            )}
            {page === "renewal-details" && renewalRequest && (
              <RenewalDetailsPage
                request={renewalRequest}
                onBack={() => navigate("manage")}
                onSubmit={submitRenewalRequest}
              />
            )}
            {page === "manage-moments" && manageMomentActivity && (
              <ManageMomentPage
                activity={manageMomentActivity}
                club={currentManagedClub}
                onBack={() => { setManageMomentActivity(null); setManageTab("activities"); setPage("manage"); }}
                onNotify={notify}
              />
            )}
            {page === "manage" && (
              <ManagePage
                club={currentManagedClub}
                clubs={managedClubsList}
                currentClubId={managedClubId}
                onSelectClub={(id) => {
                  setManagedClubId(id);
                  notify(`已切换至社团「${managedClubsList.find((c) => c.id === id)?.name || ""}」管理工作台`);
                }}
                term={manageTerm}
                tab={manageTab}
                onTab={setManageTab}
                onNavigate={navigate}
                onNotify={notify}
                onOpenMomentPage={(act) => { setManageMomentActivity({ ...act, clubName: currentManagedClub.name }); setPage("manage-moments"); }}
                onOpenRenewalDetails={(request) => {
                  setRenewalRequest(request);
                  setPage("renewal-details");
                }}
                onSubmitRenewal={submitRenewalRequest}
              />
            )}
            {page === "report" && <ReportPage />}
            {page === "detail" && (
              <PatchClubDetailPage
                club={selectedClub}
                memberView={detailFrom === "mine"}
                joined={myJoin[selectedClub?.id] === "joined"}
                initialView={detailView}
                onOpenMoment={(activity) => openMomentWall(activity, "detail")}
                onNotify={notify}
                CardComponent={ClubRow}
                onApplyClub={(club) => openApply(club)}
                onCancelJoin={cancelJoin}
              />
            )}
            {page === "moment-wall" && momentWall && (
              <MomentWallPage
                activity={momentWall}
                onBack={() => setPage(momentWall.from === "detail" ? "detail" : "mine")}
                onNotify={notify}
              />
            )}
          </div>
        </section>
      </main>
      {applyClub && (
        <ApplyDialog
          club={applyClub}
          mode={applyMode}
          submitted={submitted}
          onClose={() => setApplyClub(null)}
          onSubmit={() => {
            setSubmitted(true);
            setMyJoin((prev) => ({ ...prev, [applyClub.id]: "joined" }));
            setApplyClub(null);
            notify(`已${applyMode === "reapply" ? "重新提交" : "提交"}「${applyClub.name}」的报名申请，等待社长处理。`);
          }}
        />
      )}
      {withdrawRecord && <WithdrawDeclarationDialog record={withdrawRecord} onClose={() => setWithdrawRecord(null)} onConfirm={withdrawDeclaration} />}
      {historyOpen && (
        <JoinHistoryDrawer
          onClose={() => setHistoryOpen(false)}
          onReapply={(item) => {
            const club = clubs.find((entry) => entry.name === item.name)
              || { id: item.id, name: item.name, category: item.category, poster: "reading" };
            setHistoryOpen(false);
            openApply(club, "reapply");
          }}
        />
      )}
      {cancelClub && (
        <ConfirmCancelDialog
          club={cancelClub}
          onClose={() => setCancelClub(null)}
          onConfirm={confirmCancelJoin}
        />
      )}
      {discussionActivity && page !== "moment-wall" && (
        <ActivityDiscussionDrawer
          activity={discussionActivity}
          onClose={() => setDiscussionActivity(null)}
          onNotify={notify}
        />
      )}
      {applyingCreditClub && (
        <StudentCreditApplicationDialog
          club={applyingCreditClub}
          initialApplication={creditApplications[applyingCreditClub.id]}
          status={creditStates[applyingCreditClub.id]}
          onClose={() => setApplyingCreditClub(null)}
          onSubmit={(hours, summary, file) => {
            const clubName = applyingCreditClub.name;
            const clubId = applyingCreditClub.id;
            setCreditApplications((previous) => ({ ...previous, [clubId]: { hours, summary, file, submittedAt: formatCurrentDateTime() } }));
            setCreditStates((previous) => ({ ...previous, [clubId]: "pending" }));
            setApplyingCreditClub(null);
            notify(`已提交「${clubName}」${hours} 小时的学分申请，等待社长审核。`);
          }}
        />
      )}
      {creditResultClub && (
        <CreditResultDialog club={creditResultClub} onClose={() => setCreditResultClub(null)} />
      )}
      {creditDetailClub && (
        <CreditApplicationDetailDialog
          club={creditDetailClub}
          application={creditApplications[creditDetailClub.id]}
          status={creditStates[creditDetailClub.id]}
          onClose={() => setCreditDetailClub(null)}
        />
      )}
      {deleteDeclarationRecord && (
        <DeleteDeclarationDialog
          record={deleteDeclarationRecord}
          onClose={() => setDeleteDeclarationRecord(null)}
          onConfirm={deleteDeclaration}
        />
      )}
      {detailRecord && (
        <DeclarationDetailDialog
          record={detailRecord}
          onClose={() => setDetailRecord(null)}
          onResubmit={(record) => {
            setDetailRecord(null);
            openDeclarationForm({ ...record, updatedAt: formatCurrentDateTime() }, record.status === "withdrawn" ? "withdrawn" : "resubmit");
          }}
          onWithdraw={(record) => {
            setDetailRecord(null);
            setWithdrawRecord(record);
          }}
          onDelete={(record) => {
            setDetailRecord(null);
            setDeleteDeclarationRecord(record);
          }}
          onManage={() => {
            setDetailRecord(null);
            navigate("manage");
          }}
        />
      )}
      {showDeclarationGuide && (
        <DeclarationGuideDialog
          onClose={() => setShowDeclarationGuide(false)}
          onDownload={() => notify(`已开始下载《${declarationGuide.attachment}》（原型演示）。`)}
        />
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

function SelectField({ label, value, onChange, options, className = "", hideLabelPrefix = false, placeholder = "" }) {
  const isPlaceholder = placeholder && value === "";
  return (
    <label className={`select-field ${className}${isPlaceholder ? " is-placeholder" : ""}`}>
      <span className="sr-only">{label}</span>
      <select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}>
        {placeholder && <option value="" disabled hidden>{placeholder}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "全部" || option === "全部类别"
              ? (hideLabelPrefix ? "全部" : `${label}：全部`)
              : (hideLabelPrefix ? option : `${label}：${option}`)}
          </option>
        ))}
      </select>
      <CaretDown size={14} weight="bold" />
    </label>
  );
}

function JoinHistoryDrawer({ onClose, onReapply }) {
  const [term, setTerm] = useState(currentTerm);
  // 记录只包含「未通过」「已失效」两类；学生主动撤回/取消的记录不在此展示
  const items = joinHistory.filter((item) => item.term === term && item.status !== "cancelled");

  return (
    <div className="drawer-backdrop" role="presentation" onClick={onClose}>
      <aside
        className="side-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="未通过记录"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="drawer-head">
          <h2>未通过记录</h2>
          <button className="dialog-close" type="button" onClick={onClose} aria-label="关闭">×</button>
        </header>
        <div className="drawer-body">
          <SelectField
            className="history-term"
            label="学期"
            value={term}
            onChange={setTerm}
            options={termOptions}
            hideLabelPrefix
          />
          <p className="drawer-note">含未通过和超时未审核自动失效的申请。</p>
          {items.map((item) => (
            <div key={item.id} className="history-item">
              <div className="history-item-head">
                <h3>{item.name}</h3>
                <span className="category-tag">{item.category}</span>
                <span className={`history-status ${item.status}`}>
                  {item.status === "rejected" ? "未通过" : "已失效"}
                </span>
              </div>
              <p className="history-reason">{item.reason}</p>
              <div className="history-item-foot">
                <span className="history-time">记录时间：{item.time}</span>
                {item.status === "rejected" && (
                  <button type="button" className="primary compact" onClick={() => onReapply(item)}>
                    重新报名
                  </button>
                )}
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="history-empty">
              <strong>该学期没有未通过记录</strong>
              <span>切换其他学期可查看对应记录。</span>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function ActivityDiscussionDrawer({ activity, onClose, onNotify }) {
  const seed = discussionSeeds[activity.id] || { topic: null, posts: [] };
  const [topic] = useState(seed.topic);
  const [posts, setPosts] = useState(seed.posts);
  const [draft, setDraft] = useState("");
  const [photos, setPhotos] = useState([]);
  const [preview, setPreview] = useState("");
  const [likes, setLikes] = useState(() => Object.fromEntries(seed.posts.map((post) => [post.id, post.likes])));
  const [likedIds, setLikedIds] = useState(() => new Set(seed.posts.filter((post) => post.liked).map((post) => post.id)));

  const toggleLike = (id) => {
    const wasLiked = likedIds.has(id);
    const next = new Set(likedIds);
    if (wasLiked) next.delete(id);
    else next.add(id);
    setLikedIds(next);
    setLikes((current) => ({ ...current, [id]: current[id] + (wasLiked ? -1 : 1) }));
  };

  const addPhoto = () => {
    if (photos.length >= 3) return;
    const candidate = discussionPhotoPool.find((src) => !photos.includes(src));
    if (candidate) setPhotos([...photos, candidate]);
  };

  const publish = () => {
    const content = draft.trim();
    if (!content && photos.length === 0) return;
    setPosts((current) => [...current, { id: `my-${current.length}`, author: "我", role: "成员", time: formatNowDateTime(), content: content || "（图片）", likes: 0, liked: false, photos: [...photos] }]);
    setDraft("");
    setPhotos([]);
    if (onNotify) onNotify("精彩瞬间已发布，仅社团成员可见。");
  };

  return (
    <div className="drawer-backdrop" role="presentation" onClick={onClose}>
      <aside
        className="side-drawer discussion-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="活动精彩瞬间"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="drawer-head">
          <h2>活动精彩瞬间</h2>
          <button className="dialog-close" type="button" onClick={onClose} aria-label="关闭">×</button>
        </header>
        <div className="drawer-body">
          <div className="discussion-activity-card">
            <span className="category-tag">{activity.clubName}</span>
            <h3>{activity.title}</h3>
            <p>{activity.day} {activity.week} · {activity.time} · {activity.venue}</p>
          </div>
          <div className="discussion-topic free">
            <span className="topic-label">仅本社团成员可见</span>
            <p>记录本场活动中值得分享的片段、感受或收获。</p>
          </div>
          <div className="discussion-post-list">
            {posts.length === 0 && <p className="discussion-empty">还没有人分享，来记录第一个精彩瞬间吧。</p>}
            {posts.map((post) => (
              <div className="discussion-post" key={post.id}>
                <span className={`discussion-avatar${post.role === "社长" ? " leader" : ""}`}>{post.author.slice(0, 1)}</span>
                <div className="discussion-post-main">
                  <div className="discussion-post-head">
                    <strong>{post.author}</strong>
                    {post.role === "社长" && <span className="leader-badge">社长</span>}
                    <span className="time">{post.time}</span>
                  </div>
                  <p>{post.content}</p>
                  {post.photos && post.photos.length > 0 && (
                    <div className={`discussion-post-photos count-${post.photos.length}`}>
                      {post.photos.map((src) => (
                        <img key={src} src={src} alt="精彩瞬间配图" onClick={() => setPreview(src)} />
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    className={likedIds.has(post.id) ? "liked" : ""}
                    onClick={() => toggleLike(post.id)}
                    aria-label="点赞"
                  >
                    <Heart size={14} weight={likedIds.has(post.id) ? "fill" : "regular"} /> {likes[post.id]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer className="discussion-composer">
          {photos.length > 0 && (
            <div className="composer-photo-preview">
              {photos.map((src) => (
                <span className="photo-thumb" key={src}>
                  <img src={src} alt="待发布配图" />
                  <button type="button" className="photo-remove" aria-label="移除图片" onClick={() => setPhotos(photos.filter((item) => item !== src))}>×</button>
                </span>
              ))}
              <em>{photos.length} / 3 张</em>
            </div>
          )}
          <div className="composer-row">
            <button
              type="button"
              className="composer-photo-btn"
              onClick={addPhoto}
              disabled={photos.length >= 3}
            >
              上传图片
            </button>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && publish()}
              placeholder={photos.length > 0 ? "给图片配句话（可选）…" : "说点什么…（仅社团成员可见）"}
            />
            <button type="button" className="primary" onClick={publish}>发布</button>
          </div>
        </footer>
        {preview && (
          <div className="photo-lightbox" role="presentation" onClick={() => setPreview("")}>
            <img src={preview} alt="配图预览" />
            <button type="button" className="dialog-close" aria-label="关闭" onClick={() => setPreview("")}>×</button>
          </div>
        )}
      </aside>
    </div>
  );
}

function HomePage({ clubs: shownClubs, keyword, category, onlyJoinable, activeFilterCount = 0, scopeText = "本学期", joinStats = { joined: 0, pending: 0, open: 0 }, myJoin = {}, filters = { term: "", continued: "", ended: "" }, onFiltersChange, onKeyword, onCategory, onToggleJoinable, onClearFilters, onShowClub, onApplyClub, onCancelJoin }) {
  return (
    <div className="home-page-body">
      <div className="toolbar home-toolbar">
        <label className="search">
          <MagnifyingGlass size={16} weight="bold" />
          <input value={keyword} onChange={(event) => onKeyword(event.target.value)} placeholder="请输入社团名称" />
        </label>
        <SelectField
          label="社团类别"
          value={category}
          onChange={onCategory}
          options={["全部", "体育", "艺术", "科技", "人文"]}
          placeholder="请选择社团类别"
          hideLabelPrefix
        />
        <SelectField
          label="学期"
          value={filters.term || currentTerm}
          onChange={(value) => onFiltersChange({ ...filters, term: value })}
          options={termOptions}
          hideLabelPrefix
        />
      </div>
      <div className="list-caption">
        <label className="check">
          <input type="checkbox" checked={onlyJoinable} onChange={onToggleJoinable} />
          仅看当前可报名的社团
        </label>
        <div className="caption-summary">
          <span>{scopeText}共 {shownClubs.length} 个正式社团</span>
          <span className="join-stats">我已加入 {joinStats.joined} · 待审核 {joinStats.pending} · 还可报名 {joinStats.open}</span>
          {activeFilterCount > 0 && (
            <button type="button" className="link-button clear-filter" onClick={onClearFilters}>清除筛选</button>
          )}
        </div>
      </div>
      <div className="club-list">
        {shownClubs.map((club) => (
          <ClubRow
            key={club.id}
            club={club}
            joined={myJoin[club.id]}
            onShow={() => onShowClub(club)}
            onApply={() => onApplyClub(club)}
            onCancel={onCancelJoin}
          />
        ))}
        {shownClubs.length === 0 && (
          <div className="empty">
            <strong>没有找到匹配的社团</strong>
            <span>可以换一个关键词，或取消当前筛选条件。</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ClubRow({ club, joined, hideViewButton = false, onShow, onApply, onCancel }) {
  const seats = Math.max(club.capacity - club.members, 0);
  const isFull = seats === 0;
  const isOpen = club.state === "open";
  const isJoined = joined === "joined";
  return (
    <article className={onShow ? "club-row" : "club-row static"} onClick={onShow}>
      <div className={`poster ${club.poster}`} aria-hidden="true" />
      <div className="club-core">
        <div className="club-name">
          <h3 className="club-title">{club.name}</h3>
          <span className="category-tag">{club.category}</span>
        </div>
        <p><span className="field-label">社团简介：</span>{club.short}</p>
        <p className="recruitment-line"><span className="field-label">招新说明：</span>{club.recruitment}</p>
        <div className="club-meta">
          <span className="meta-item"><span className="meta-label">社长</span>{club.captain}</span>
          {club.contact && (
            <span className="meta-item meta-phone">
              <Phone size={13} weight="bold" />
              {club.contact}
            </span>
          )}
          <span className="meta-item"><span className="meta-label">成员</span>{club.members} / {club.capacity} 人</span>
          {seats > 0 ? (
            <span className="meta-item meta-seats">剩余名额 <strong>{seats}</strong></span>
          ) : (
            <span className="meta-item meta-seats seats-empty">名额已满</span>
          )}
        </div>
      </div>
      <div className="club-action">
        {club.applyEnded ? (
          <span className="muted-copy">报名截止：{club.applyEnd}</span>
        ) : (
          <span className="deadline-countdown">距报名截止：{club.countdown}</span>
        )}
        {isJoined ? (
          <button
            type="button"
            className="action-button secondary danger-outline"
            onClick={(event) => {
              event.stopPropagation();
              onCancel(club);
            }}
          >
            取消报名
          </button>
        ) : isFull && !club.applyEnded ? (
          <div className="apply-full-wrap" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="action-button primary action-button-disabled"
              disabled
              aria-describedby={`apply-full-tip-${club.id}`}
            >
              申请报名
            </button>
            <span className="apply-full-tip" id={`apply-full-tip-${club.id}`} role="tooltip">
              该社团人员已达上限，暂时不能报名哦～先看看其他社团吧
            </span>
          </div>
        ) : isOpen ? (
          <button
            type="button"
            className="action-button primary"
            onClick={(event) => {
              event.stopPropagation();
              onApply();
            }}
          >
            申请报名
          </button>
        ) : hideViewButton ? null : (
          <button
            type="button"
            className="action-button secondary"
            onClick={(event) => {
              event.stopPropagation();
              onShow();
            }}
          >
            查看社团
          </button>
        )}
      </div>
    </article>
  );
}

function MyClubsPage({ onShowClub, onNavigate, onOpenMoment, onApplyCredit }) {
  const joinedClubs = [
    {
      id: "documentary-member",
      name: "校园纪录片社",
      category: "艺术",
      cover: "drama",
      leader: "林小薇",
      joinedAt: "2026-09-04",
      term: currentTerm,
      attendance: "3 / 3 场",
      hours: "6.0 小时",
      introduction: "记录校园真实故事，学习拍摄与剪辑技巧，创作校园微纪录片。",
      activities: [
        { id: "doc-next", day: "10.25", week: "周五", title: "校园人物微纪录片初剪沟通会", time: "15:30 - 17:00", venue: "影媒工作间 204", status: "待开展", attendance: "未开始", discussion: 2, description: "各创作小组带好初剪素材，集中讨论叙事节奏、镜头衔接与后续补拍安排。" },
        { id: "doc-next-2", day: "10.30", week: "周三", title: "校园微纪录片补拍分工会", time: "15:30 - 17:00", venue: "影媒工作间 204", status: "待开展", attendance: "未开始", discussion: 1, description: "确认补拍场景、采访对象与器材使用安排，完成外拍前的分工准备。" },
        { id: "doc-done", day: "10.18", week: "周五", title: "影视摄影构图与手持云台实操训练", time: "15:30 - 17:00", venue: "影媒工作间 204", status: "已结束", attendance: "已出勤", discussion: 4, topic: "初剪作品中，哪个片段最打动你？", description: "完成三轴稳定器校准、平移与低角度跟拍实训，并采集首期拍摄素材。" },
        { id: "doc-done-2", day: "10.11", week: "周五", title: "纪录片选题与采访提纲工作坊", time: "15:30 - 17:00", venue: "影媒工作间 204", status: "已结束", attendance: "已出勤", discussion: 6, description: "完成选题聚焦与采访提纲初稿，并确定各组的第一位采访对象。" },
        { id: "doc-done-3", day: "10.04", week: "周五", title: "校园故事采集与分镜设计", time: "15:30 - 17:00", venue: "影媒工作间 204", status: "已结束", attendance: "请假", discussion: 3, description: "围绕校园人物与场景梳理可拍素材，完成第一版分镜草图。" },
      ],
    },
    {
      id: "reading-member",
      name: "山海阅读会",
      category: "人文",
      cover: "reading",
      leader: "周予安",
      joinedAt: "2026-09-06",
      term: currentTerm,
      attendance: "2 / 2 场",
      hours: "3.0 小时",
      introduction: "一起读、一起聊，从一本书延伸到更广阔的世界。",
      activities: [
        { id: "reading-next", day: "10.27", week: "周日", title: "《山海经》异兽想象共读分享", time: "12:30 - 13:30", venue: "图书馆 302", status: "待开展", attendance: "未开始", discussion: 5, description: "围绕本周共读章节交流异兽形象、神话叙事与个人阅读发现。" },
        { id: "reading-done", day: "10.13", week: "周日", title: "秋日书单交换与主题共读", time: "12:30 - 13:30", venue: "图书馆 302", status: "已结束", attendance: "已出勤", discussion: 7, description: "完成秋日主题书单交换，并共同确定下一阶段阅读章节。" },
      ],
    },
    {
      id: "debate-member",
      name: "辩论社",
      category: "人文",
      cover: "reading",
      leader: "何思远",
      joinedAt: "2026-03-02",
      term: "2025-2026 学年下学期",
      attendance: "6 / 8 场",
      hours: "9.0 小时",
      introduction: "训练表达与思辨，参与校内外辩论赛事。",
      activities: [
        { id: "debate-done", day: "05.16", week: "周六", title: "校际辩论友谊赛", time: "14:00 - 16:30", venue: "报告厅", status: "已结束", attendance: "已出勤", discussion: 5, description: "与来访高校辩论队进行友谊赛，完成立论与自由辩论环节。" },
        { id: "debate-done-2", day: "05.09", week: "周六", title: "辩题拆解与立论训练", time: "14:00 - 16:00", venue: "教学楼 302", status: "已结束", attendance: "已出勤", discussion: 3, description: "围绕期末辩题完成资料检索、论点拆解与立论稿撰写。" },
      ],
    },
  ];
  const CHECKIN_TONES = { 已出勤: "present", 请假: "leave" };
  const toClubDetail = (club) => ({
    ...club,
    poster: club.cover,
    captain: club.leader,
    short: club.introduction,
    members: club.id === "documentary-member" ? 16 : 18,
    capacity: 24,
    state: "closed",
    window: "本学期已结束加入申请",
    recruitment: "欢迎对社团主题感兴趣、愿意持续参与活动的同学。",
    contact: "可在社团内与学生社长沟通",
    applyEnd: "2026 年 9 月 20 日",
    applyEnded: true,
    events: club.activities.map((activity) => `${activity.day} · ${activity.title}`),
    memberActivities: club.activities,
  });
  const [term, setTerm] = useState(currentTerm);
  const [expandedClubId, setExpandedClubId] = useState(joinedClubs[0].id);
  const [showApplications, setShowApplications] = useState(false);
  const [pendingWithdrawn, setPendingWithdrawn] = useState(false);

  const pendingApplication = {
    name: "机器人探索社",
    category: "科技",
    term: currentTerm,
    submittedAt: "2026-09-12 16:20",
    reason: "希望参与结构搭建与编程挑战，持续完成学期作品。",
  };
  const termClubs = joinedClubs.filter((club) => club.term === term);
  const showPending = pendingApplication.term === term;
  const showWithdrawn = showPending && pendingWithdrawn;

  const withdrawPending = () => {
    setPendingWithdrawn(true);
    setShowApplications(false);
  };

  return (
    <div className="my-clubs-page-body">
      <div className="my-clubs-toolbar">
        <SelectField
          className="my-clubs-term"
          label="学期"
          value={term}
          onChange={(value) => {
            setTerm(value);
            setShowApplications(false);
          }}
          options={termOptions}
        />
        <span className="my-clubs-term-hint">{term === currentTerm ? "本学期" : "历史学期"} · 已加入 {termClubs.length} 个社团</span>
      </div>

      {showPending && (
        <div className={`my-application-block${showApplications && !pendingWithdrawn ? " open" : ""}${showWithdrawn ? " withdrawn" : ""}`}>
          {showWithdrawn ? (
            <section className="my-application-notice withdrawn">
              <span className="notice-dot" aria-hidden="true" />
              <strong>已撤回「{pendingApplication.name}」的报名申请</strong>
              <span className="notice-sub">已撤回的申请不再保留在报名记录中</span>
            </section>
          ) : (
            <section className="my-application-notice">
              <span className="notice-dot" aria-hidden="true" />
              <strong>1 个报名申请待社长审核</strong>
              <span className="notice-sub">{pendingApplication.name} · 9-12 提交</span>
              <div className="notice-actions">
                <button type="button" className="notice-link" onClick={() => setShowApplications(!showApplications)}>
                  {showApplications ? "收起" : "查看申请"}
                  <CaretDown size={13} className={showApplications ? "rotated" : ""} />
                </button>
              </div>
            </section>
          )}

          {showApplications && !pendingWithdrawn && (
            <div className="join-application-list">
              <article className="join-application-row">
                <div className="join-application-cover robot" />
                <div className="join-application-main">
                  <div><span className="category-tag">{pendingApplication.category}</span><h2>{pendingApplication.name}</h2></div>
                  <p>提交于 {pendingApplication.submittedAt} · 等待社长审核</p>
                  <span>申请说明：{pendingApplication.reason}</span>
                </div>
                <span className="status waiting">等待社长审核</span>
                <button type="button" className="secondary compact" onClick={withdrawPending}>撤回申请</button>
              </article>
            </div>
          )}
        </div>
      )}

      <div className="my-clubs-section-title"><h2>已加入的社团</h2><span>{termClubs.length} 个</span></div>
      {termClubs.length === 0 ? (
        <div className="my-clubs-empty">
          <strong>该学期暂无社团记录</strong>
          <span>切换其他学期查看，或去社团广场报名感兴趣的社团。</span>
          <button type="button" className="secondary compact" onClick={() => onNavigate("plaza")}>去社团广场</button>
        </div>
      ) : (
        <div className="joined-club-group-list">
          {termClubs.map((club) => {
            const nextActivity = club.activities.find((activity) => activity.status === "待开展");
            const isExpanded = expandedClubId === club.id;
            return (
              <article className={`joined-club-group${isExpanded ? " expanded" : ""}`} key={club.id}>
                <div className="joined-club-group-head">
                  <div className={`joined-group-cover ${club.cover}`} />
                  <div className="joined-group-summary">
                    <div className="joined-group-title-row">
                      <h2>{club.name}</h2>
                      <span className="category-tag">{club.category}</span>
                    </div>
                    <p>社长：{club.leader}<i /> 加入于 {club.joinedAt}<i /> 出勤 {club.attendance}<i /> 累计 {club.hours}</p>
                  </div>
                  <div className="joined-group-next">
                    <span>下一场活动</span>
                    {nextActivity ? (
                      <>
                        <strong className="joined-group-next-title">{nextActivity.title}</strong>
                        <div className="joined-group-next-meta">
                          <span className="next-day">{nextActivity.day} {nextActivity.week}</span>
                          <span><Clock size={12} /> {nextActivity.time}</span>
                          <span><MapPin size={12} /> {nextActivity.venue}</span>
                        </div>
                      </>
                    ) : (
                      <strong className="joined-group-next-empty">暂未发布待开展活动</strong>
                    )}
                  </div>
                  {(() => {
                    const showcase = getClubShowcase(club);
                    const hasShowcase = showcase.works.length + showcase.honors.length > 0;
                    return <button type="button" className={`joined-showcase-entry ${hasShowcase ? "" : "is-empty"}`} onClick={() => onShowClub(toClubDetail(club), "showcase")}>
                      <span className="joined-showcase-icon"><Medal size={16} weight="fill" /></span>
                      <span><strong>社团成果荣誉</strong><small>{hasShowcase ? `${showcase.works.length} 件作品 ｜ ${showcase.honors.length} 项荣誉` : "社长还未上传作品与荣誉"}</small></span>
                      <CaretRight size={16} />
                    </button>;
                  })()}
                  <div className="joined-group-actions">
                    <button type="button" className="joined-report-link" onClick={() => onShowClub(toClubDetail(club))}>查看社团</button>
                    <button type="button" className="joined-credit-apply-link" onClick={() => onApplyCredit(club)}>申请学分</button>
                    <button type="button" className="joined-group-toggle" onClick={() => setExpandedClubId(isExpanded ? null : club.id)} aria-expanded={isExpanded}>
                      {isExpanded ? "收起" : "展开"} <CaretDown size={15} />
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div className="joined-group-activities">
                    <div className="joined-group-activities-head">
                      <span>近期活动 · 共 {club.activities.length} 场</span>
                      <em className="activities-scroll-hint">滚动查看全部</em>
                    </div>
                    <div className="member-activity-list" tabIndex={0} aria-label={`${club.name}活动列表，可滚动查看全部 ${club.activities.length} 场活动`}>
                      {club.activities.map((activity) => (
                        <article className="member-activity-card" key={activity.id}>
                          <div className="member-activity-date"><strong>{activity.day}</strong><span>{activity.week}</span></div>
                          <div className="member-activity-main">
                            <div className="member-activity-title"><h3>{activity.title}</h3><span className={`member-activity-status ${activity.status === "待开展" ? "upcoming" : "ended"}`}>{activity.status}</span>{CHECKIN_TONES[activity.attendance] ? <span className={`checkin-tag ${CHECKIN_TONES[activity.attendance]}`}>{activity.attendance}</span> : null}</div>
                            <div className="member-activity-meta"><span><Clock size={13} /> {activity.time}</span><span><MapPin size={13} /> {activity.venue}</span></div>
                            <div className="member-activity-foot">
                              <p>{activity.description}</p>
                              <button
                                type="button"
                                className="discuss-topic"
                                onClick={() => onOpenMoment({ ...activity, clubName: club.name })}
                                aria-label={`查看${activity.title}的精彩瞬间，共 ${activity.discussion} 份分享`}
                              >
                                <Camera size={14} />
                                <span className="discuss-topic-text">活动精彩瞬间 · {activity.discussion} 份分享</span>
                              </button>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="member-discussion-panel"
                            onClick={() => onOpenMoment({ ...activity, clubName: club.name })}
                            aria-label={`进入${activity.title}的活动精彩瞬间，共 ${activity.discussion} 份分享`}
                          >
                            <span className="discuss-orb">
                              <ChatCircleDots size={17} className="discuss-icon" />
                              <span className="discuss-count">{activity.discussion}</span>
                              <span className="discuss-spark" aria-hidden="true">✦</span>
                            </span>
                            <span className="discuss-hook">看看大家记录的瞬间</span>
                          </button>
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StudentCreditApplicationDialog({ club, initialApplication, status, onClose, onSubmit }) {
  const [hours, setHours] = useState(initialApplication?.hours || "");
  const [summary, setSummary] = useState(initialApplication?.summary || "");
  const [file, setFile] = useState(initialApplication?.file || "");
  const [error, setError] = useState("");
  const activities = club.activities || [];
  const autoHours = club.hours || "0 小时";
  const attendedCount = Number((String(club.attendance || "").match(/\d+/) || [0])[0]);
  const shareCount = activities.reduce((sum, item) => sum + (item.shares || item.discussion || 0), 0);
  const featuredCount = club.featuredMoments ?? 2;
  const autoFacts = [
    { label: "活动参加场次", value: attendedCount, unit: "场" },
    { label: "累计学时", value: autoHours.replace(" 小时", ""), unit: "小时" },
    { label: "活动分享次数", value: shareCount, unit: "次" },
    { label: "精选次数", value: featuredCount, unit: "次" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = Number(hours);
    if (!hours || Number.isNaN(value) || value <= 0) {
      setError("请填写申报学时");
      return;
    }
    if (value < 0.5 || Math.abs(value * 2 - Math.round(value * 2)) > 1e-9) {
      setError("申报学时需按 0.5 小时递增，且不少于 0.5 小时");
      return;
    }
    if (!summary.trim()) {
      setError("请填写收获与体会");
      return;
    }
    if (!file) {
      setError("请上传证明材料");
      return;
    }
    setError("");
    onSubmit(hours, summary, file);
  };

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <form className="dialog student-credit-application-dialog" onSubmit={handleSubmit} onClick={(event) => event.stopPropagation()} noValidate>
        <button type="button" className="dialog-close" onClick={onClose} aria-label="关闭">×</button>
        <span className="eyebrow">社团学分申请</span>
        <h2>{club.name}</h2>

        {status === "withdrawn" && initialApplication && (
          <p style={{ margin: "0 0 12px", padding: "8px 10px", borderRadius: 6, background: "#fffbeb", border: "1px solid #fde68a", color: "#92400e", fontSize: 12, lineHeight: 1.5 }}>
            上次申请已撤回，已带出撤回前填写的内容，可修改后重新提交。
          </p>
        )}

        <section className="credit-block">
          <div className="credit-block-head">
            <strong>本学期参与情况</strong>
          </div>
          <div className="credit-auto-grid">
            {autoFacts.map((item) => (
              <div className="credit-auto-item" key={item.label}>
                <span>{item.label}</span>
                <p><strong>{item.value}</strong><em>{item.unit}</em></p>
              </div>
            ))}
          </div>
        </section>

        <section className="credit-block">
          <div className="credit-block-head">
            <strong>需要你填写</strong>
            <span>带 <b>*</b> 为必填</span>
          </div>
          <label className="credit-field">
            <span className="credit-field-label"><b>*</b> 申报学时</span>
            <div className="student-credit-hours-input">
              <input type="number" min="0.5" step="0.5" value={hours} onChange={(event) => setHours(event.target.value)} placeholder="如 2.5" required />
              <span>小时</span>
            </div>
          </label>
          <label className="credit-field">
            <span className="credit-field-label"><b>*</b> 收获与体会</span>
            <textarea rows="4" value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="写下你在社团中的参与、收获与成长，例如掌握的技能、承担的分工、印象最深的一次活动…" required />
          </label>
          <div className="credit-field">
            <span className="credit-field-label"><b>*</b> 证明材料</span>
            {file ? (
              <button type="button" className="credit-upload has-file" onClick={() => setFile("")}>
                <span className="credit-upload-file">
                  <Paperclip size={15} />
                  {file}
                </span>
                <em>点击移除</em>
              </button>
            ) : (
              <button type="button" className="credit-upload" onClick={() => { setFile("社团活动签到与作品记录.pdf"); setError(""); }}>
                <Plus size={15} />
                <span>上传证明材料</span>
                <small>活动签到截图、作品照片或获奖证书</small>
              </button>
            )}
          </div>
          {error && <p className="credit-form-error">{error}</p>}
        </section>

        <div className="dialog-actions">
          <button type="button" className="secondary" onClick={onClose}>取消</button>
          <button type="submit" className="primary">提交申请</button>
        </div>
      </form>
    </div>
  );
}

function CreditResultDialog({ club, onClose }) {
  const hours = Number((String(club.hours || "").match(/[0-9.]+/) || [0])[0]);
  const credits = (hours / 5).toFixed(1);
  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <section className="dialog credit-result-dialog" role="dialog" aria-modal="true" aria-label="学分认定结果" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="dialog-close" onClick={onClose} aria-label="关闭">×</button>
        <div className="credit-result-hero">
          <span className="credit-result-badge"><CheckCircle size={26} weight="fill" /></span>
          <span className="eyebrow">社团学分认定</span>
          <h2>{club.name} · 学分认定通过</h2>
        </div>
        <div className="credit-result-metrics">
          <div className="credit-metric"><span>认定学时</span><p><strong>{hours.toFixed(1)}</strong><em>小时</em></p></div>
          <i className="credit-metric-divider" aria-hidden="true" />
          <div className="credit-metric"><span>认定学分</span><p><strong>{credits}</strong><em>学分</em></p></div>
        </div>
        <div className="dialog-actions">
          <button type="button" className="primary" onClick={onClose}>知道了</button>
        </div>
      </section>
    </div>
  );
}

function CreditApplicationDetailDialog({ club, application, onClose }) {
  const activities = club.activities || [];
  const autoHours = club.hours || "0 小时";
  const attendedCount = Number((String(club.attendance || "").match(/\d+/) || [0])[0]);
  const shareCount = activities.reduce((sum, item) => sum + (item.shares || item.discussion || 0), 0);
  const featuredCount = club.featuredMoments ?? 2;
  const autoFacts = [
    { label: "活动参加场次", value: attendedCount, unit: "场" },
    { label: "累计学时", value: autoHours.replace(" 小时", ""), unit: "小时" },
    { label: "活动分享次数", value: shareCount, unit: "次" },
    { label: "精选次数", value: featuredCount, unit: "次" },
  ];
  const data = application || {
    hours: autoHours.replace(" 小时", ""),
    summary: "本学期按时参加社团活动，完成分配的任务，并记录了参与过程。",
    file: "社团活动签到记录.pdf",
    submittedAt: "—",
  };
  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <section className="dialog student-credit-application-dialog credit-application-detail-dialog" role="dialog" aria-modal="true" aria-label="学分申请详情" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="dialog-close" onClick={onClose} aria-label="关闭">×</button>
        <span className="eyebrow">社团学分申请</span>
        <h2>{club.name}</h2>
        <p className="credit-detail-submitted"><Clock size={13} /><span>提交于 {data.submittedAt}</span></p>

        <section className="credit-block">
          <div className="credit-block-head">
            <strong>本学期参与情况</strong>
          </div>
          <div className="credit-auto-grid">
            {autoFacts.map((item) => (
              <div className="credit-auto-item" key={item.label}>
                <span>{item.label}</span>
                <p><strong>{item.value}</strong><em>{item.unit}</em></p>
              </div>
            ))}
          </div>
        </section>

        <section className="credit-block">
          <div className="credit-block-head">
            <strong>申报内容</strong>
          </div>
          <div className="credit-readonly-field is-hours">
            <span>申报学时</span>
            <p>{data.hours} 小时</p>
          </div>
          <div className="credit-readonly-field">
            <span>收获与体会</span>
            <p>{data.summary}</p>
          </div>
          <div className="credit-readonly-field is-file">
            <span>证明材料</span>
            <p><Paperclip size={14} />{data.file}</p>
          </div>
        </section>

        <div className="dialog-actions">
          <button type="button" className="secondary" onClick={onClose}>关闭</button>
        </div>
      </section>
    </div>
  );
}

function ApplicationsPage({ records, onNavigate, onWithdraw, onDelete, onResubmit, onShowDetail, onNotify, onShowGuide }) {
  const [term, setTerm] = useState("2026-2027 学年上学期");

  // 确保当前学期完整呈现 3 个不同状态的样例（待审核、已通过、未通过），若从上一版热更缓存导致数量不足则兜底
  const effectiveRecords = useMemo(() => {
    const currentItems = (records || []).filter((item) => item.term === "2026-2027 学年上学期");
    if (currentItems.length < 3) {
      return initialDeclarationRecords;
    }
    return records;
  }, [records]);

  const visibleRecords = useMemo(() => {
    return effectiveRecords.filter((item) => item.term === term);
  }, [effectiveRecords, term]);

  return (
    <div className="applications-page-body">
      <section className="declaration-guide-callout">
        <div className="declaration-guide-callout-copy">
          <BookOpen size={18} weight="duotone" aria-hidden="true" />
          <div>
            <strong>本学期社团申报开放中</strong>
            <span>{declarationConfig.declarationTime} · 最多申报 {declarationConfig.maximumPerStudent} 个社团</span>
          </div>
        </div>
        <div className="declaration-guide-callout-actions">
          <button type="button" className="text-button" onClick={onShowGuide}>查看申报说明 <CaretRight size={14} /></button>
        </div>
      </section>
      <div className="declaration-toolbar-compact">
        <div className="toolbar-left">
          <SelectField
            className="declaration-term"
            label="学期"
            value={term}
            onChange={setTerm}
            options={termOptions}
            hideLabelPrefix
          />
        </div>
        <div className="toolbar-right">
          <span className="declaration-count">
            {term} · 共 {visibleRecords.length} 条申报
          </span>
        </div>
      </div>

      <div className="declaration-cards-list">
        {visibleRecords.map((record) => (
          <article className="declaration-card" key={record.id}>
            <div className="declaration-card-cover-wrap">
              <div
                className={`declaration-card-poster ${record.cover || "reading"}`}
                style={record.customCover ? { backgroundImage: `url(${record.customCover})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
              />
              <span className="declaration-card-category-badge">{record.category}</span>
            </div>

            <div className="declaration-card-body">
              <div className="declaration-card-head">
                <div className="card-title-group">
                  <button
                    type="button"
                    className="declaration-card-title-link"
                    onClick={() => onShowDetail(record)}
                  >
                    {record.name}
                  </button>
                  {record.status === "pending" && (
                    <span className="status-badge pending">
                      <i className="badge-dot" />待审核
                    </span>
                  )}
                  {record.status === "passed" && (
                    <span className="status-badge passed">
                      <i className="badge-dot" />已通过
                    </span>
                  )}
                  {record.status === "rejected" && (
                    <span className="status-badge rejected">
                      <i className="badge-dot" />未通过
                    </span>
                  )}
                  {record.status === "withdrawn" && (
                    <span className="status-badge neutral">
                      <i className="badge-dot" />已撤回
                    </span>
                  )}
                </div>
              </div>

              <div className="declaration-card-meta">
                <span className="meta-item">
                  <span className="meta-label">申报社长：</span>
                  <span className="meta-value">{record.leader || "赵子易"}</span>
                </span>
                <span className="meta-divider" />
                <span className="meta-item">
                  <span className="meta-label">计划人数：</span>
                  <span className="meta-value">{record.capacity || "25"} 人</span>
                </span>
                <span className="meta-divider" />
                <span className="meta-item">
                  <span className="meta-label">提交时间：</span>
                  <span className="meta-value">{record.submittedAt}</span>
                </span>
              </div>

              <div className="declaration-card-venue-row">
                <span className="venue-row-label">
                  {record.venueType === "需求说明" ? "场地说明：" : "拟用场地："}
                </span>
                {record.venueType === "需求说明" ? (
                  <span className="venue-row-content is-desc">
                    <span className="venue-text">{record.venue}</span>
                  </span>
                ) : (
                  <span className="venue-row-content">
                    <span className="venue-name">{record.venue || "未指定"}</span>
                    {record.venueNote && (
                      <span className="venue-note-inline">
                        <span className="venue-note-split">·</span>
                        <span className="venue-note-label">场地说明：</span>
                        <span className="venue-note-text">{record.venueNote}</span>
                      </span>
                    )}
                  </span>
                )}
              </div>

              {record.status === "rejected" && (
                <div className="declaration-feedback-box">
                  <div className="feedback-head">
                    <strong>教师审核意见</strong>
                    {record.reviewer && <span className="feedback-reviewer">审核教师：{record.reviewer}</span>}
                    {record.reviewedAt && <span className="feedback-time">（{record.reviewedAt}）</span>}
                  </div>
                  <p className="feedback-reason">{record.reason}</p>
                </div>
              )}

              {record.status === "withdrawn" && (
                <div className="declaration-feedback-box neutral">
                  <div className="feedback-head">
                    <strong>社团申报已撤回</strong>
                    {record.withdrawnAt && <span className="feedback-time">（{record.withdrawnAt}）</span>}
                  </div>
                  <p className="feedback-reason">申报已撤回，可修改后重新提交；若不再需要可直接删除。</p>
                </div>
              )}

              <div className="declaration-card-actions">
                <button
                  type="button"
                  className="secondary btn-decl-detail"
                  onClick={() => onShowDetail(record)}
                >
                  查看
                </button>
                {record.status === "pending" && (
                  <button
                    type="button"
                    className="secondary danger-outline"
                    onClick={() => onWithdraw(record)}
                  >
                    撤回
                  </button>
                )}
                {record.status === "withdrawn" && (
                  <>
                    <button
                      type="button"
                      className="secondary danger-text"
                      onClick={() => onDelete(record)}
                    >
                      删除
                    </button>
                    <button
                      type="button"
                      className="primary btn-decl-resubmit"
                      onClick={() => onResubmit(record)}
                    >
                      修改
                    </button>
                  </>
                )}
                {record.status === "rejected" && (
                  <button
                    type="button"
                    className="primary btn-decl-resubmit"
                    onClick={() => onResubmit(record)}
                  >
                    修改
                  </button>
                )}
                {record.status === "passed" && (
                  <button
                    type="button"
                    className="primary btn-decl-manage"
                    onClick={() => {
                      onNavigate("manage");
                      onNotify(`已进入「${record.name}」社团管理工作台`);
                    }}
                  >
                    进入管理
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}

        {visibleRecords.length === 0 && (
          <div className="empty declaration-empty-card">
            <strong>暂无{term}的申报记录</strong>
            <span>当前学期尚未提交社团申报，可点击右上角【＋ 申报社团】发起新社团。</span>
          </div>
        )}
      </div>
    </div>
  );
}

function DeclarationDetailDialog({ record, onClose, onResubmit, onWithdraw, onDelete, onManage }) {
  if (!record) return null;

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog declaration-detail-dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="dialog-close" onClick={onClose} aria-label="关闭">×</button>

        <div className="detail-dialog-head">
          <div className="detail-dialog-title-row">
            <h2>{record.name}</h2>
            {record.status === "pending" && (
              <span className="status-badge pending"><i className="badge-dot" />待审核</span>
            )}
            {record.status === "passed" && (
              <span className="status-badge passed"><i className="badge-dot" />已通过</span>
            )}
            {record.status === "rejected" && (
              <span className="status-badge rejected"><i className="badge-dot" />未通过</span>
            )}
            {record.status === "withdrawn" && (
              <span className="status-badge neutral"><i className="badge-dot" />已撤回</span>
            )}
            <span className="category-tag">{record.category}</span>
            <span className="term-badge">{record.term}</span>
          </div>
          <div className="detail-dialog-sub">
            <span>提交时间：{record.submittedAt}</span>
            {record.reviewedAt && <span> · 审核时间：{record.reviewedAt}</span>}
            {record.withdrawnAt && <span> · 撤回时间：{record.withdrawnAt}</span>}
          </div>
        </div>

        <div className="detail-dialog-body">
          {record.status === "rejected" && (
            <div className="detail-feedback-banner rejected">
              <div className="banner-title">
                <strong>教师审核退回意见</strong>
                {record.reviewer && <span>（审核人：{record.reviewer}）</span>}
              </div>
              <p>{record.reason}</p>
            </div>
          )}

          {record.status === "withdrawn" && (
            <div className="detail-feedback-banner neutral">
              <div className="banner-title">
                <strong>社团申报已撤回</strong>
                {record.withdrawnAt && <span>（{record.withdrawnAt}）</span>}
              </div>
              <p>申报已撤回，可修改后重新提交；若不再需要该社团，可直接点击下方删除。</p>
            </div>
          )}

          {record.status === "pending" && (
            <div className="detail-feedback-banner pending">
              <strong>申报正在等待教师审核</strong>
              <p>申报已提交，学校教师将在申报周期内完成审核。在教师审核前，你可随时撤回修改。</p>
            </div>
          )}

          {record.status === "passed" && (
            <div className="detail-feedback-banner passed">
              <strong>社团申报已通过审核</strong>
              <p>社团已正式成立，你已获得社长权限。可在社团管理中发布活动、开展招新及管理成员。</p>
            </div>
          )}

          <div className="detail-info-block">
            <div className="detail-cover-preview">
              <div
                className={`detail-cover-img ${record.cover || "reading"}`}
                style={record.customCover ? { backgroundImage: `url(${record.customCover})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
              />
              <span className="detail-cover-caption">社团封面</span>
            </div>

            <div className="detail-meta-table">
              <div className="meta-row"><span className="meta-th">申报社长</span><span className="meta-td">{record.leader || "赵子易"}（当前账号学生）</span></div>
              <div className="meta-row"><span className="meta-th">联系电话</span><span className="meta-td">{record.contact || "138 0000 9218"}</span></div>
              <div className="meta-row"><span className="meta-th">计划人数</span><span className="meta-td">{record.capacity || "25"} 人</span></div>
              <div className="meta-row">
                <span className="meta-th">{record.venueType === "需求说明" ? "场地说明" : "拟用场地"}</span>
                <span className="meta-td">
                  {record.venue || "未指定"}
                </span>
              </div>
              {record.venueNote && (
                <div className="meta-row"><span className="meta-th">场地说明</span><span className="meta-td">{record.venueNote}</span></div>
              )}
            </div>
          </div>

          <div className="detail-text-section">
            <h3>社团简介</h3>
            <p>{record.summary || "暂无简介"}</p>
          </div>

          {record.recruitment && (
            <div className="detail-text-section">
              <h3>招新说明</h3>
              <p>{record.recruitment}</p>
            </div>
          )}

          {record.poster && (
            <div className="detail-text-section">
              <h3>招新海报</h3>
              <div className="detail-poster-tag">📎 {record.poster}</div>
            </div>
          )}

          <div className="detail-text-section">
            <h3>活动计划</h3>
            <p>{record.plan || "暂无活动计划"}</p>
          </div>
        </div>

        <div className="dialog-actions">
          <button type="button" className="secondary" onClick={onClose}>关闭</button>
          {record.status === "pending" && onWithdraw && (
            <button
              type="button"
              className="secondary danger-outline"
              onClick={() => {
                onClose();
                onWithdraw(record);
              }}
            >
              撤回
            </button>
          )}
          {record.status === "withdrawn" && (
            <>
              {onDelete && (
                <button
                  type="button"
                  className="secondary danger-text"
                  onClick={() => {
                    onClose();
                    onDelete(record);
                  }}
                >
                  删除
                </button>
              )}
              {onResubmit && (
                <button
                  type="button"
                  className="primary"
                  onClick={() => {
                    onClose();
                    onResubmit(record);
                  }}
                >
                  修改
                </button>
              )}
            </>
          )}
          {record.status === "rejected" && onResubmit && (
            <button
              type="button"
              className="primary"
              onClick={() => {
                onClose();
                onResubmit(record);
              }}
            >
              修改
            </button>
          )}
          {record.status === "passed" && onManage && (
            <button
              type="button"
              className="primary"
              onClick={() => {
                onClose();
                onManage();
              }}
            >
              进入管理
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function DeleteDraftDialog({ draft, onClose, onConfirm }) {
  if (!draft) return null;
  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <section className="dialog" role="dialog" aria-modal="true" aria-label="删除草稿" onClick={(e) => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose} aria-label="关闭">×</button>
        <span className="eyebrow">删除草稿</span>
        <h2>确定删除草稿“{draft.name || "未命名社团"}”？</h2>
        <p>删除后草稿内容无法恢复。如后续需要申报该社团，可重新发起申报。</p>
        <div className="dialog-actions">
          <button type="button" className="secondary" onClick={onClose}>取消</button>
          <button type="button" className="danger-button" onClick={onConfirm}>确认删除</button>
        </div>
      </section>
    </div>
  );
}

function DraftsPage({ drafts, onEdit, onDelete }) {
  const [deletingDraft, setDeletingDraft] = useState(null);

  const handleConfirmDelete = () => {
    if (deletingDraft) {
      onDelete(deletingDraft.id);
      setDeletingDraft(null);
    }
  };

  return (
    <div className="drafts-page-body">
      <div className="declaration-subbar">
        <div className="declaration-meta draft-meta">
          <strong>共 {drafts.length} 条</strong>
        </div>
      </div>
      <div className="standard-table-container">
        <table className="standard-table drafts-table" aria-label="我的草稿">
          <thead>
            <tr>
              <th className="col-index">序号</th>
              <th className="col-name">社团名称</th>
              <th className="col-category">社团类别</th>
              <th className="col-time">最后保存时间</th>
              <th className="col-action">操作</th>
            </tr>
          </thead>
          <tbody>
            {drafts.map((draft, index) => (
              <tr key={draft.id}>
                <td className="col-index">{index + 1}</td>
                <td className="col-name">
                  <button type="button" className="table-club-link" onClick={() => onEdit(draft)}>{draft.name || "未命名社团"}</button>
                </td>
                <td className="col-category">{draft.category || "未分类"}</td>
                <td className="col-time">{draft.updatedAt}</td>
                <td className="col-action">
                  <button type="button" className="table-op-link" onClick={() => onEdit(draft)}>继续填写</button>
                  <span className="table-op-divider">|</span>
                  <button type="button" className="table-op-link danger" onClick={() => setDeletingDraft(draft)}>删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {drafts.length === 0 && (
          <div className="empty declaration-empty">
            <strong>暂无草稿</strong>
            <span>未完成填写的社团申报会自动保存在这里。</span>
          </div>
        )}
      </div>

      {deletingDraft && (
        <DeleteDraftDialog
          draft={deletingDraft}
          onClose={() => setDeletingDraft(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

const coverPresetOptions = [
  { key: "reading", label: "悦读人文", category: "人文" },
  { key: "robot", label: "科技创客", category: "科技" },
  { key: "drama", label: "戏剧艺术", category: "艺术" },
  { key: "football", label: "体育竞技", category: "体育" },
];

function DeclarationForm({ draft, mode = "create", showLeaderContactToStudents, venueMethods = { library: true, description: true }, onSave, onSubmit, onShowGuide }) {
  const [form, setForm] = useState({
    id: `draft-${Date.now()}`,
    name: "",
    category: "",
    cover: "reading",
    customCover: null,
    summary: "",
    recruitment: "",
    capacity: "",
    contact: "138 0000 9218",
    venue: "",
    venueNote: "",
    poster: "",
    plan: "",
    updatedAt: formatCurrentDateTime(),
    ...(draft || {}),
  });
  const update = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));
  const save = () => onSave({ ...form, updatedAt: formatCurrentDateTime() });

  const handleCategoryChange = (val) => {
    update("category", val);
    if (form.cover !== "custom") {
      if (val === "科技") update("cover", "robot");
      else if (val === "艺术") update("cover", "drama");
      else if (val === "体育") update("cover", "football");
      else if (val === "人文") update("cover", "reading");
    }
  };

  const handleSave = () => {
    const finalCover = form.cover === "custom" && form.customCover ? "reading" : form.cover;
    const finalCustom = form.cover === "custom" ? form.customCover : null;
    onSave({ ...form, cover: finalCover, customCover: finalCustom, updatedAt: formatCurrentDateTime() });
  };

  const handleSubmit = () => {
    const finalCover = form.cover === "custom" && form.customCover ? "reading" : form.cover;
    const finalCustom = form.cover === "custom" ? form.customCover : null;
    onSubmit({ ...form, cover: finalCover, customCover: finalCustom, updatedAt: formatCurrentDateTime() });
  };

  return (
    <div className="declaration-form-body">
      <section className="declaration-guide-callout">
        <div className="declaration-guide-callout-copy">
          <BookOpen size={18} weight="duotone" aria-hidden="true" />
          <div>
            <strong>本学期社团申报开放中</strong>
            <span>{declarationConfig.declarationTime} · 最多申报 {declarationConfig.maximumPerStudent} 个社团</span>
          </div>
        </div>
        <div className="declaration-guide-callout-actions">
          <button type="button" className="text-button" onClick={onShowGuide}>查看申报说明 <CaretRight size={14} /></button>
        </div>
      </section>
      <div className="request-form-layout">
        <main className="request-form-main">
          {mode === "resubmit" && form.reason && (
            <div className="declaration-form-feedback-alert">
              <div className="alert-head">
                <strong>教师审核退回意见</strong>
                {form.reviewer && <span>审核教师：{form.reviewer}</span>}
                {form.reviewedAt && <span>（{form.reviewedAt}）</span>}
              </div>
              <p className="alert-reason">{form.reason}</p>
              <div className="alert-tip">请根据教师意见补充完善相关信息后重新提交审核。</div>
            </div>
          )}
          {mode === "withdrawn" && (
            <div className="declaration-form-feedback-alert neutral">
              <div className="alert-head">
                <strong>社团申报已撤回</strong>
                {form.withdrawnAt && <span>撤回时间：{form.withdrawnAt}</span>}
              </div>
              <p className="alert-reason">申报已撤回，可在此修改内容并重新提交审核；若稍后再填，可点击下方“暂存修改”。</p>
            </div>
          )}
          <section className="form-section">
            <div className="form-section-head"><h2>基本信息</h2></div>
            <div className="form-grid">
              <label><span className="field-label"><b>*</b> 社团名称</span><input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="例如：校园摄影社" /></label>
              <label><span className="field-label"><b>*</b> 社团类别</span><select value={form.category} onChange={(event) => handleCategoryChange(event.target.value)}><option value="">请选择社团类别</option><option>体育</option><option>艺术</option><option>科技</option><option>人文</option></select></label>
              <label><span className="field-label"><b>*</b> 社长</span><input value="赵子易" readOnly className="readonly-input" /><small>当前账号学生，申报通过后成为社长</small></label>
              <label><span className="field-label"><b>*</b> 计划人数上限</span><input type="number" min="1" value={form.capacity} onChange={(event) => update("capacity", event.target.value)} placeholder="请输入人数" /></label>

              <div className="form-field-cover full-span">
                <span className="field-label"><b>*</b> 社团封面</span>
                <div className="cover-grid-selector">
                  {coverPresetOptions.map((opt) => {
                    const isSelected = form.cover === opt.key;
                    return (
                      <div
                        key={opt.key}
                        className={`cover-card-item ${opt.key} ${isSelected ? "selected" : ""}`}
                        onClick={() => update("cover", opt.key)}
                        title={`选择 ${opt.label} 封面`}
                      >
                        <span className={`cover-radio-circle ${isSelected ? "checked" : ""}`}>
                          {isSelected && <i className="radio-dot" />}
                        </span>
                        <span className="cover-card-badge">{opt.label}</span>
                      </div>
                    );
                  })}

                  {form.customCover && (
                    <div
                      className={`cover-card-item custom-cover-item ${form.cover === "custom" ? "selected" : ""}`}
                      style={{ backgroundImage: `url(${form.customCover})`, backgroundSize: "cover", backgroundPosition: "center" }}
                      onClick={() => update("cover", "custom")}
                      title="选择自定义封面"
                    >
                      <button
                        type="button"
                        className="cover-delete-btn"
                        title="删除自定义图片"
                        onClick={(e) => {
                          e.stopPropagation();
                          update("customCover", null);
                          const fallback = form.category === "科技" ? "robot" : form.category === "艺术" ? "drama" : form.category === "体育" ? "football" : "reading";
                          update("cover", fallback);
                        }}
                      >
                        ✕
                      </button>
                      <span className={`cover-radio-circle ${form.cover === "custom" ? "checked" : ""}`}>
                        {form.cover === "custom" && <i className="radio-dot" />}
                      </span>
                      <span className="cover-card-badge">自定义</span>
                    </div>
                  )}

                  <label className="cover-card-upload-box" title="上传自定义封面图片">
                    <Plus size={28} className="upload-plus-icon" />
                    <span className="upload-plus-label">{form.customCover ? "重新上传" : "上传图片"}</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            update("customCover", ev.target.result);
                            update("cover", "custom");
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
                <div className="cover-selector-tip">
                  建议尺寸 16:9 或 4:3（支持 JPG、PNG，大小不超过 5MB）。封面将用于社团广场展示、社团详情和招新宣传卡片。
                </div>
              </div>

              <label className="full-span"><span className="field-label"><b>*</b> 社团简介</span><textarea value={form.summary} onChange={(event) => update("summary", event.target.value)} placeholder="用几句话介绍你们想做什么、希望一起完成什么" aria-label="社团简介" /></label>
            </div>
          </section>
          <section className="form-section">
            <div className="form-section-head"><h2>招新与联系</h2></div>
            <div className="form-grid">
              <label><span className="field-label"><b>*</b> 联系电话</span><input value={form.contact || ""} onChange={(event) => update("contact", event.target.value)} placeholder="请输入联系电话" /><small>{showLeaderContactToStudents ? "将向本校学生公开，用于社团咨询。" : "仅供学校管理人员联系社长。"}</small></label>
              <label className="full-span"><span className="field-label">招新说明</span><textarea value={form.recruitment} onChange={(event) => update("recruitment", event.target.value)} placeholder="例如：希望每周能稳定参加活动；对摄影感兴趣即可" aria-label="招新说明" /></label>
            </div>
          </section>
          <section className="form-section">
            <div className="form-section-head"><h2>活动场地</h2></div>
            <p className="field-description">请告诉学校你们倾向使用的场地；这不是最终安排，具体活动仍可分别填写实际场地。</p>
            <div className="venue-form-fields">
              {(!venueMethods || venueMethods.library) && (
                <div className="single-field">
                  <span className="field-label">拟用场地</span>
                  <div><button type="button" className="secondary compact" style={{ width: "fit-content" }}>请选择</button></div>
                </div>
              )}
              {(!venueMethods || venueMethods.description) && (
                <label className="single-field">
                  <span className="field-label">场地说明</span>
                  <textarea value={form.venueNote || ""} onChange={(event) => update("venueNote", event.target.value)} placeholder="例如：每周一次、约 20 人，需要可投影的室内空间" />
                </label>
              )}
            </div>
          </section>
          <section className="form-section">
            <div className="form-section-head no-line"><h2>申报材料</h2></div>
            <div className="form-grid">
              <label><span className="field-label"><b>*</b> 招新海报</span><div className="upload-field"><span className="upload-mark">＋</span><span>{form.poster || "上传图片"}</span><small>支持 JPG、PNG 格式</small></div></label>
              <label className="full-span"><span className="field-label"><b>*</b> 活动计划</span><textarea value={form.plan} onChange={(event) => update("plan", event.target.value)} placeholder="请说明本学期拟开展的主要活动" /></label>
            </div>
          </section>
          <div className="form-actions">
            <button className="secondary" onClick={handleSave}>
              {mode === "resubmit" || mode === "withdrawn" ? "暂存修改" : "保存草稿"}
            </button>
            <button className="primary" onClick={handleSubmit}>
              {mode === "resubmit" || mode === "withdrawn" ? "重新提交申报" : "提交申报"}
            </button>
          </div>
        </main>
        <aside className="request-form-aside">
          <section>
            <h2>申报流程</h2>
            <ol>
              <li><strong>提交申报</strong>：填写信息并提交，教师审核前可撤回修改。</li>
              <li><strong>教师审核</strong>：学校教师在申报周期内完成审核。</li>
              <li><strong>成立开展</strong>：审核通过后社团正式成立，你将作为社长开始招新与开展活动。</li>
            </ol>
            <p className="process-note">如被退回，可在“我的社团申报”中查看原因并修改重新提交。</p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function RenewalDetailsPage({ request, onBack, onSubmit }) {
  const { club, members, retainedMemberIds, targetTerm, capacity, continueRecruiting } = request;
  const [form, setForm] = useState({
    cover: club.cover || "football",
    summary: club.summary || "",
    recruitment: "",
    contact: club.phone || "",
    venue: club.venue || "",
    venueNote: "",
    posterName: "",
    plan: "",
  });
  const retainedMembers = members.filter((member) => retainedMemberIds.includes(member.id));
  const update = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));

  return (
    <div className="declaration-form-body renewal-details-page">
      <div className="request-form-layout">
        <main className="request-form-main">
          <section className="renewal-intro-card">
            <div>
              <strong>正在更新「{club.name}」下一学期资料</strong>
              <span>未修改的内容将沿用本学期资料。</span>
            </div>
            <button type="button" className="text-button" onClick={onBack}>返回社团管理</button>
          </section>

          <section className="form-section">
            <div className="form-section-head"><h2>基本信息</h2></div>
            <div className="form-grid">
              <label><span className="field-label">社团名称</span><input value={club.name} readOnly className="readonly-input" /></label>
              <label><span className="field-label">社团类别</span><input value={club.category} readOnly className="readonly-input" /></label>
              <label><span className="field-label">社长</span><input value={club.captain} readOnly className="readonly-input" /><small>由你申请延续，社长沿用本人。</small></label>
              <label><span className="field-label">计划人数上限</span><input value={`${capacity} 人`} readOnly className="readonly-input" /><small>已在延续安排中设置。</small></label>
              <div className="form-field-cover full-span">
                <span className="field-label">社团封面</span>
                <div className="renew-cover-grid" role="radiogroup" aria-label="选择下一学期社团封面">
                  {coverPresetOptions.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      className={`renew-cover-option ${option.key}${form.cover === option.key ? " selected" : ""}`}
                      aria-pressed={form.cover === option.key}
                      onClick={() => update("cover", option.key)}
                    >
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
                <div className="cover-selector-tip">如不调整，将沿用当前社团封面。</div>
              </div>
              <label className="full-span"><span className="field-label">社团简介</span><textarea value={form.summary} onChange={(event) => update("summary", event.target.value)} placeholder="用几句话介绍你们想做什么、希望一起完成什么" aria-label="社团简介" /></label>
            </div>
          </section>

          <section className="form-section">
            <div className="form-section-head"><h2>{continueRecruiting ? "招新与联系" : "联系信息"}</h2></div>
            <div className="form-grid">
              <label><span className="field-label">联系电话</span><input value={form.contact} onChange={(event) => update("contact", event.target.value)} /><small>将向本校学生公开，用于社团咨询。</small></label>
              {continueRecruiting && <label className="full-span"><span className="field-label">招新说明</span><textarea value={form.recruitment} onChange={(event) => update("recruitment", event.target.value)} placeholder="例如：希望每周能稳定参加活动；对足球感兴趣即可" aria-label="招新说明" /></label>}
            </div>
          </section>

          <section className="form-section">
            <div className="form-section-head"><h2>活动场地</h2></div>
            <p className="field-description">如下一学期有新的场地需求再修改；这不是最终安排，具体活动仍可分别填写实际场地。</p>
            <div className="venue-form-fields">
              <label className="single-field"><span className="field-label">拟用场地</span><input value={form.venue} onChange={(event) => update("venue", event.target.value)} placeholder="例如：西操场 1 号场地" /></label>
              <label className="single-field"><span className="field-label">场地说明</span><textarea value={form.venueNote} onChange={(event) => update("venueNote", event.target.value)} placeholder="例如：每周一次、约 20 人，需要可投影的室内空间" /></label>
            </div>
          </section>

          <section className="form-section">
            <div className="form-section-head no-line"><h2>申报材料</h2></div>
            <div className="form-grid">
              <div className="renewal-material-upload"><span className="field-label">招新海报</span><label className="upload-field"><span className="upload-mark">＋</span><span>{form.posterName || "上传图片"}</span><small>支持 JPG、PNG 格式</small><input type="file" accept="image/*" hidden onChange={(event) => update("posterName", event.target.files?.[0]?.name || "")} /></label></div>
              <label className="full-span"><span className="field-label">活动计划</span><textarea value={form.plan} onChange={(event) => update("plan", event.target.value)} placeholder="请说明下一学期拟开展的主要活动" /></label>
            </div>
          </section>

          <div className="form-actions renewal-page-actions">
            <button type="button" className="secondary" onClick={onBack}>取消更新</button>
            <button type="button" className="primary" onClick={() => onSubmit({ ...request, form })}>提交社团延续申请</button>
          </div>
        </main>
        <aside className="request-form-aside renewal-arrangement-aside">
          <section>
            <h2>延续安排</h2>
            <dl>
              <div><dt>目标学期</dt><dd>{targetTerm}</dd></div>
              <div><dt>下一学期社长</dt><dd>{club.captain}</dd></div>
              <div><dt>保留成员</dt><dd>{retainedMembers.length} 人</dd></div>
              <div><dt>人数上限</dt><dd>{capacity} 人</dd></div>
              <div><dt>是否招新</dt><dd>{continueRecruiting ? "继续招新" : "暂不招新"}</dd></div>
            </dl>
          </section>
          <section>
            <h2>说明</h2>
            <p>未修改的资料将沿用本学期内容。教师确认后，系统会建立下一学期的独立社团记录。</p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function ManagePage({
  club = managedClubsList[0],
  clubs = managedClubsList,
  currentClubId = "football",
  onSelectClub,
  term = "2026-2027 学年上学期",
  tab = "members",
  onTab,
  onNavigate,
  onNotify,
  onOpenMomentPage,
  onOpenRenewalDetails,
  onSubmitRenewal,
}) {
  const isArchived = term !== "2026-2027 学年上学期";
  // 活动卡片的「活动瞬间」分享数：优先取社长端瞬间数据，其次兜底活动 contributions
  const manageMomentCountOf = (act) => manageMomentsOf(act).length || act.contributions?.length || 0;
  const [showClubSwitcher, setShowClubSwitcher] = useState(false);
  const [reviewingApplicant, setReviewingApplicant] = useState(null);
  const [showApplicationHistory, setShowApplicationHistory] = useState(false);
  const [applicationHistoryFilter, setApplicationHistoryFilter] = useState("all");

  // 模拟两个社团各自独立的业务数据
  const [footballApplicants, setFootballApplicants] = useState([
    {
      id: "app-1",
      name: "王一帆",
      gender: "男",
      class: "初二（3）班",
      time: "2026-09-14 16:30",
      reason: "平时非常热爱足球运动，小学阶段是校队前锋，希望加入社团和大家一起系统训练，并有机会代表学校参加校际友谊赛！",
      phone: "139 0000 1234",
    },
    {
      id: "app-2",
      name: "林知夏",
      gender: "女",
      class: "初二（1）班",
      time: "2026-09-15 10:15",
      reason: "对足球战术分析和摄影摄像很感兴趣，希望能负责社团的日常训练记录、赛事摄影和社刊宣传，为球队做好后勤保障。",
      phone: "138 0000 5678",
    },
  ]);

  const [documentaryApplicants, setDocumentaryApplicants] = useState([
    {
      id: "app-doc-1",
      name: "唐小曼",
      gender: "女",
      class: "初二（4）班",
      time: "2026-09-16 11:20",
      reason: "擅长单反摄影与航拍，熟悉微电影视频剪辑，希望负责社团的剧照拍摄与期末微纪录片后期制作。",
      phone: "136 0000 8899",
    },
  ]);

  // 入团申请保留为只读过程记录；处理申请不会抹去学生曾经提交过的事实。
  const [footballApplicationHistory, setFootballApplicationHistory] = useState([
    {
      id: "football-history-1",
      name: "陈思语",
      class: "初二（2）班",
      phone: "134 0000 6789",
      reason: "平时很喜欢踢球，想和同学们一起参加每周三的常规训练，提升传接球配合能力。",
      status: "approved",
      submittedAt: "2026-09-08 10:24",
      handledAt: "2026-09-08 16:40",
      attempts: 1,
    },
    {
      id: "football-history-2",
      name: "周天羽",
      class: "初二（5）班",
      phone: "133 0000 7890",
      reason: "擅长中场跑动与组织策应，希望能加入足球联盟，和大家一起踢好每一场训练赛。",
      status: "approved",
      submittedAt: "2026-09-09 14:12",
      handledAt: "2026-09-09 17:05",
      attempts: 1,
    },
    {
      id: "football-history-3",
      name: "李晨曦",
      class: "初二（1）班",
      phone: "135 0000 8421",
      reason: "对足球很有兴趣，不过周三下午有时需要参加合唱团排练，希望能协调时间参与。",
      status: "rejected",
      submittedAt: "2026-09-07 09:16",
      handledAt: "2026-09-07 18:22",
      attempts: 2,
      note: "社团常规训练固定在每周三下午，时间安排存在冲突",
    },
  ]);
  const [documentaryApplicationHistory, setDocumentaryApplicationHistory] = useState([
    {
      id: "documentary-history-1",
      name: "苏沐阳",
      class: "初二（3）班",
      phone: "135 0000 1122",
      reason: "对校园人物纪录片拍摄非常感兴趣，希望系统学习镜头语言和手持稳定器运镜。",
      status: "approved",
      submittedAt: "2026-09-05 16:30",
      handledAt: "2026-09-06 09:10",
      attempts: 1,
    },
    {
      id: "documentary-history-2",
      name: "韩佳欣",
      class: "初二（2）班",
      phone: "137 0000 3344",
      reason: "平时喜欢用相机记录校园生活，擅长后期剪辑与配乐，希望加入社团一起创作。",
      status: "approved",
      submittedAt: "2026-09-06 11:08",
      handledAt: "2026-09-06 17:42",
      attempts: 1,
    },
  ]);

  const [footballMembers, setFootballMembers] = useState([
    { id: "m-1", name: "赵子易", role: "社长", class: "初二（3）班", joinDate: "2026-09-01", count: 6, phone: "138 0000 9218" },
    { id: "m-2", name: "顾一然", role: "成员", class: "初二（2）班", joinDate: "2026-09-03", count: 6, phone: "139 0000 2345" },
    { id: "m-3", name: "沈清越", role: "成员", class: "初二（1）班", joinDate: "2026-09-05", count: 5, phone: "137 0000 3456" },
    { id: "m-4", name: "张子墨", role: "成员", class: "初二（4）班", joinDate: "2026-09-06", count: 5, phone: "136 0000 4567" },
    { id: "m-5", name: "许嘉禾", role: "成员", class: "初二（3）班", joinDate: "2026-09-08", count: 4, phone: "135 0000 5678" },
    { id: "m-6", name: "陈思语", role: "成员", class: "初二（2）班", joinDate: "2026-09-08", count: 4, phone: "134 0000 6789" },
    { id: "m-7", name: "周天羽", role: "成员", class: "初二（5）班", joinDate: "2026-09-09", count: 4, phone: "133 0000 7890" },
  ]);

  const [documentaryMembers, setDocumentaryMembers] = useState([
    { id: "dm-1", name: "赵子易", role: "社长", class: "初二（3）班", joinDate: "2026-09-01", count: 4, phone: "138 0000 9218" },
    { id: "dm-2", name: "陈闻远", role: "成员", class: "初二（1）班", joinDate: "2026-09-02", count: 4, phone: "136 0000 5306" },
    { id: "dm-3", name: "苏沐阳", role: "成员", class: "初二（3）班", joinDate: "2026-09-05", count: 3, phone: "135 0000 1122" },
    { id: "dm-4", name: "韩佳欣", role: "成员", class: "初二（2）班", joinDate: "2026-09-06", count: 3, phone: "137 0000 3344" },
    { id: "dm-5", name: "宋可晴", role: "成员", class: "初二（5）班", joinDate: "2026-09-07", count: 3, phone: "139 0000 5566" },
  ]);

  const [footballActivities, setFootballActivities] = useState([
    {
      id: "act-1",
      title: "校园足球友谊交流赛",
      dateDay: "10.30",
      dateWeek: "周三",
      dateTime: "16:20 - 17:50",
      date: "10 月 30 日 16:20 - 17:50",
      venue: "西操场 1 号场地",
      status: "upcoming",
      statusLabel: "待开展",
      attendanceStatus: "pending",
      recordStatus: "pending",
      attendees: "应到 7 人",
      topic: "关于本次交流赛各位置战术分工的准备与反馈",
      topicDesc: "请各位置成员就下半场战术分工与轮换提出建议，社长将精选优秀建议用于赛前战术布置。",
      desc: "与初三年级足球爱好者开展学期友谊赛，请成员提前 10 分钟到场热身并穿着运动服球鞋。",
      attachments: [
        { name: "友谊赛战术演练与出场分组表.pdf", size: "840 KB" },
      ],
      isRecurring: false,
      recordSummary: "",
      recordPhotos: [],
      contributions: [
        { id: "c1", name: "顾一然", role: "成员", class: "初二（2）班", time: "活动前 1 天", text: "建议下半场采用 4-3-3 阵型，让新加入的初一学弟多打打边路配合。", isFeatured: true },
        { id: "c2", name: "张子墨", role: "成员", class: "初二（4）班", time: "活动前 18 小时", text: "已带好备用队服与守门员手套，热身活动听社长指挥。", isFeatured: false },
      ],
    },
    {
      id: "act-2",
      title: "周三战术跑位与阵型协同训练",
      dateDay: "10.23",
      dateWeek: "周三",
      dateTime: "16:20 - 17:40",
      date: "10 月 23 日 16:20 - 17:40",
      venue: "西操场 1 号场地",
      status: "ongoing",
      statusLabel: "进行中",
      attendanceStatus: "pending",
      recordStatus: "pending",
      attendees: "待点名（应到 7 人）",
      topic: "边路突破与中路包抄配合研讨",
      topicDesc: "请锋线与中场组员就传切接应时机发表看法与配合体会。",
      desc: "重点进行 3v2 边路快速渗透与包抄射门训练，请各小组长清点本组到位人数。",
      attachments: [
        { name: "3v2边路突破训练图解.png", size: "1.2 MB" },
      ],
      isRecurring: true,
      recordSummary: "",
      recordPhotos: [],
      contributions: [
        { id: "c3", name: "顾一然", role: "成员", class: "初二（2）班", time: "16:10", text: "今天重点演练边路套边插上，注意传中前抬头观察中路接应队员的身位。", isFeatured: true },
        { id: "c4", name: "沈清越", role: "成员", class: "初二（1）班", time: "16:15", text: "收到！今天我打右边前卫，会主动拉开宽度给中路拉出进攻纵深。", isFeatured: false },
        { id: "c5", name: "赵子易", role: "社长", class: "初二（3）班", time: "16:18", text: "注意保护支撑脚，射门动作尽量做完整，不要在禁区前沿粘球！", isFeatured: true },
      ],
    },
    {
      id: "act-3",
      title: "校际交流准备与体能恢复加练",
      dateDay: "10.23",
      dateWeek: "周三",
      dateTime: "17:40 - 18:20",
      date: "10 月 23 日 17:40 - 18:20",
      venue: "田径场环形跑道",
      status: "completed",
      statusLabel: "已结束",
      attendanceStatus: "completed",
      recordStatus: "pending",
      attendees: "正常出勤 7 人（全勤）",
      topic: "", // 自由研讨，无固定话题
      desc: "针对下月校际联赛进行间歇体能恢复拉伸加练，成员可自由交流训练心得与拉伸技巧。",
      attachments: [],
      isRecurring: false,
      recordSummary: "",
      recordPhotos: [],
      contributions: [
        { id: "c6", name: "陈思语", role: "成员", class: "初二（2）班", time: "17:45", text: "间歇跑 400 米拉伸之后腿部肌肉放松多了，建议大家多做静态拉伸避免乳酸堆积。", isFeatured: true },
        { id: "c7", name: "许嘉禾", role: "成员", class: "初二（3）班", time: "17:50", text: "跟着大家一起拉伸很有氛围，体能虽然累但是心情特别畅快！", isFeatured: false },
      ],
    },
    {
      id: "act-4",
      title: "上周三高位逼抢与协防专题演练",
      dateDay: "10.16",
      dateWeek: "周三",
      dateTime: "16:20 - 17:30",
      date: "10 月 16 日 16:20 - 17:30",
      venue: "西操场 2 号场地",
      status: "completed",
      statusLabel: "已结束",
      attendanceStatus: "pending",
      recordStatus: "pending",
      attendees: "待补考勤（应到 7 人）",
      topic: "高位逼抢的体能分配与回防呼应",
      desc: "高位逼抢战术专题演练，重点训练前场丢球后 5 秒立即反抢与阵型紧凑度。",
      attachments: [
        { name: "高位逼抢战术要点分工卡.pdf", size: "620 KB" },
      ],
      isRecurring: true,
      recordSummary: "",
      recordPhotos: [],
      contributions: [
        { id: "c8", name: "顾一然", role: "成员", class: "初二（2）班", time: "10-16 18:10", text: "前场逼抢需要前锋和前腰同步启动，如果后排没跟上容易被打反击空档。", isFeatured: true },
        { id: "c9", name: "张子墨", role: "成员", class: "初二（4）班", time: "10-16 18:30", text: "同意！丢球第一瞬间的呼应太重要了，大家一定要敢于出声喊队友回防！", isFeatured: false },
      ],
    },
    {
      id: "act-5",
      title: "周三传切配合与攻防转换实训",
      dateDay: "10.09",
      dateWeek: "周三",
      dateTime: "16:20 - 17:30",
      date: "10 月 09 日 16:20 - 17:30",
      venue: "西操场 1 号场地",
      status: "completed",
      statusLabel: "已结束",
      attendanceStatus: "completed",
      recordStatus: "pending",
      attendees: "正常出勤 6 人 · 请假 1 人",
      topic: "传切配合与体能分配复盘",
      desc: "传切配合专项体能训练，全体成员按时到场，出勤事实已记入系统考勤。",
      attachments: [],
      isRecurring: true,
      recordSummary: "",
      recordPhotos: [],
      contributions: [
        { id: "c10", name: "赵子易", role: "社长", class: "初二（3）班", time: "10-09 18:00", text: "今天的传切转移速度明显提升，但最后 15 分钟体能有所下滑，下周加强体能分配。", isFeatured: true },
        { id: "c11", name: "周天羽", role: "成员", class: "初二（5）班", time: "10-09 19:20", text: "今天跑动距离达标，感觉无球接应意识比上周进步很大！", isFeatured: true },
      ],
    },
    {
      id: "act-6",
      title: "学期初全员选拔与基础技术测试",
      dateDay: "09.25",
      dateWeek: "周三",
      dateTime: "16:00 - 17:30",
      date: "09 月 25 日 16:00 - 17:30",
      venue: "西操场 1 号场地",
      status: "completed",
      statusLabel: "已结束",
      attendanceStatus: "completed",
      recordStatus: "submitted",
      attendees: "正常出勤 7 人（全勤）",
      topic: "新学期训练目标与个人定位研讨",
      desc: "学期初足球联盟全员技术摸底，包含 50 米冲刺、折返跑及运球绕桩基本功测试。",
      attachments: [
        { name: "新学期摸底考核标准.pdf", size: "520 KB" },
      ],
      isRecurring: false,
      recordSummary: "新学期足球联盟首场正式集训与摸底测试圆满完成。7 名成员全员按时到场。进行了 50 米冲刺与绕桩运球测试，整体身体素质和球感良好。已完成各位置初步建组与骨干分工，现场纪律严明。",
      recordPhotos: ["新学期足球联盟全员合影.jpg", "绕桩运球测试实况.jpg", "战术板讲解抓拍.jpg"],
      contributions: [
        { id: "c12", name: "顾一然", role: "成员", class: "初二（2）班", time: "09-25 18:00", text: "摸底测试看大家底子都很扎实，期待本学期能代表社团打一场漂亮的友谊赛！", isFeatured: true },
        { id: "c13", name: "沈清越", role: "成员", class: "初二（1）班", time: "09-25 18:25", text: "体能测试达标，分工也明确了，咱们每周三风雨无阻练起来！", isFeatured: true },
        { id: "c14", name: "陈思语", role: "成员", class: "初二（2）班", time: "09-25 19:00", text: "第一次参加足球社团训练，社长和骨干带得很细心，收获很大。", isFeatured: false },
      ],
    },
  ]);

  const [documentaryActivities, setDocumentaryActivities] = useState([
    {
      id: "doc-act-1",
      title: "校园微纪录片选题研讨与分镜脚本会",
      dateDay: "10.25",
      dateWeek: "周五",
      dateTime: "15:30 - 17:00",
      date: "10 月 25 日 15:30 - 17:00",
      venue: "影视工作间 204",
      status: "upcoming",
      statusLabel: "待开展",
      attendanceStatus: "pending",
      recordStatus: "pending",
      attendees: "应到 5 人（待开展）",
      topic: "分镜头脚本征集与拍摄机位设计",
      desc: "围绕「十一校园的一天」开展选题立项与分镜头脚本设计，请各创作小组带好笔记本电脑或分镜稿纸。",
      recordSummary: "",
      recordPhotos: [],
      contributions: [
        { id: "dc-1", name: "陈闻远", role: "成员", class: "初二（1）班", time: "活动前 2 天", text: "我准备了一组食堂清晨准备早餐的延时摄影方案，脚本已经打印好。", isFeatured: true },
      ],
    },
    {
      id: "doc-act-2",
      title: "影视摄影构图与手持云台实操训练",
      dateDay: "10.18",
      dateWeek: "周五",
      dateTime: "15:30 - 17:00",
      date: "10 月 18 日 15:30 - 17:00",
      venue: "影视工作间 204",
      status: "completed",
      statusLabel: "已结束",
      attendanceStatus: "completed",
      recordStatus: "submitted",
      attendees: "正常出勤 5 人（全勤）",
      topic: "定焦镜头语言与稳定器实操心得",
      desc: "学习定焦镜头语言与稳定器运镜技巧，完成了首期拍摄素材采集实训。",
      recordSummary: "全体 5 名成员按时参加了手持三轴稳定器的校准、平移与低角度跟拍实训。采集有效素材 24 段，素材质量达到立项要求。",
      recordPhotos: ["影视摄影构图实训现场_1.jpg", "云台低角度跟拍镜头展示_2.jpg", "学员实操合影.jpg"],
      contributions: [
        { id: "dc-2", name: "苏沐阳", role: "成员", class: "初二（3）班", time: "10-18 17:40", text: "今天终于搞懂了低角度跟拍的平稳走位技巧，运镜不再有呼吸感晃动了！", isFeatured: true },
        { id: "dc-3", name: "韩佳欣", role: "成员", class: "初二（2）班", time: "10-18 18:10", text: "三轴调平还是需要多练习，今天的实操课收获满满。", isFeatured: false },
      ],
    },
  ]);

  const [footballCreditRequests, setFootballCreditRequests] = useState([
    {
      id: "cr-1",
      studentId: "m-2",
      studentName: "顾一然",
      class: "初二（2）班",
      role: "成员",
      attendedCount: 6,
      systemHours: 9.5,
      discussionsCount: 8,
      featuredCount: 2,
      declaredHours: 12,
      reviewedHours: null,
      studentReason: "本学期按时参加全部 6 场日常训练，技术摸底和体能测试均达标。协助社长组织友谊赛并带领新队员跑位。",
      extraContribution: "额外协助社长组织友谊赛场地布置与器材搬运累计 2.5 小时。",
      attachments: ["友谊赛器材搬运签收单.jpg"],
      leaderComment: "",
      status: "pending", // 待初审
      approvalHistory: [
        {
          action: "提交学分申请",
          actor: "提交人：顾一然（成员）",
          time: "2026-10-23 19:20",
        },
      ],
    },
    {
      id: "cr-2",
      studentId: "m-4",
      studentName: "张子墨",
      class: "初二（4）班",
      role: "成员",
      attendedCount: 4, // 缺勤 2 场，非全勤
      systemHours: 6.0,
      discussionsCount: 0, // 0 发言
      featuredCount: 0, // 0 精选
      declaredHours: 9.0, // 申请学时明显高于系统记录时长
      reviewedHours: null,
      studentReason: "参加了 4 场训练，因期中考试冲突请假 2 场。课余自行加练射门与体能，希望按 9 小时申请。",
      extraContribution: "",
      attachments: [],
      leaderComment: "社长退回意见：申请学时 9.0 小时与系统记录时长 6.0 小时不符，且未提供课外加练佐证材料，请按实际记录修改后重新提交。",
      status: "returned", // 已退回成员（来源：社长退回）
      approvalHistory: [
        {
          action: "提交学分申请",
          actor: "提交人：张子墨（成员）",
          time: "2026-10-24 14:15",
        },
        {
          action: "社长退回申请",
          actor: "审核人：赵子易（社长）",
          time: "2026-10-25 09:40",
        },
      ],
      changeHistory: [
        {
          field: "审核状态",
          from: "待社长审核",
          to: "已退回成员",
          actor: "赵子易（社长）",
          time: "2026-10-25 09:40",
        },
      ],
    },
    {
      id: "cr-3",
      studentId: "m-7",
      studentName: "周天羽",
      class: "初二（5）班",
      role: "成员",
      attendedCount: 5,
      systemHours: 8.0,
      discussionsCount: 3,
      featuredCount: 0, // 有发言但没有精选
      declaredHours: 10.0,
      reviewedHours: 10.0,
      studentReason: "常规训练出勤 5 场，协助器材室整理足球器材并负责每次训练后的点名记录。",
      extraContribution: "协助器材室整理与出勤核对累计 2 小时。",
      attachments: ["器材管理员证明.pdf"],
      leaderComment: "同意认定 10 小时，器材整理认真负责。",
      status: "teacherReturned", // 待社长重审（教师退回）
      approvalHistory: [
        {
          action: "提交学分申请",
          actor: "提交人：周天羽（成员）",
          time: "2026-10-22 10:30",
        },
        {
          action: "社长初审通过",
          actor: "初审人：赵子易（社长）",
          time: "2026-10-23 11:20",
        },
        {
          action: "教师退回申请",
          actor: "负责教师：李老师",
          time: "2026-10-25 16:40",
        },
      ],
      changeHistory: [
        {
          field: "审核状态",
          from: "待教师终审",
          to: "待社长重审",
          actor: "负责教师：李老师",
          time: "2026-10-25 16:40",
        },
      ],
      teacherReturnReason: "课外贡献学时 2 小时缺少带队教师签字单，请社长核实后调整建议学时或补充签字单。",
    },
    {
      id: "cr-4",
      studentId: "m-3",
      studentName: "沈清越",
      class: "初二（1）班",
      role: "成员",
      attendedCount: 5,
      systemHours: 8.0,
      discussionsCount: 6,
      featuredCount: 1,
      declaredHours: 8.0,
      reviewedHours: 8.0,
      studentReason: "参加了 5 场训练，无球接应意识提升明显，每周三坚持到场打卡与研讨交流。",
      extraContribution: "",
      attachments: [],
      leaderComment: "训练认真负责，出勤稳定，研讨积极，同意认定 8.0 小时。",
      status: "submitted", // 初审通过，已提交老师审核
      approvalHistory: [
        {
          action: "提交学分申请",
          actor: "提交人：沈清越（成员）",
          time: "2026-10-20 18:00",
        },
        {
          action: "社长初审通过",
          actor: "初审人：赵子易（社长）",
          time: "2026-10-21 09:30",
        },
      ],
    },
    {
      id: "cr-7",
      studentId: "m-8",
      studentName: "林知夏",
      class: "初二（3）班",
      role: "成员",
      attendedCount: 6,
      systemHours: 9.5,
      discussionsCount: 5,
      featuredCount: 1,
      declaredHours: 10.0,
      reviewedHours: 10.0,
      studentReason: "全勤参加本学期全部 6 场常规演练，积极参与战术复盘研讨，协助社长做好训练前热身准备。",
      extraContribution: "协助组织热身训练累计 0.5 小时。",
      attachments: ["热身带队记录.jpg"],
      leaderComment: "日常出勤全勤，态度积极认真，表现优秀，同意认定 10.0 小时。",
      teacherApproval: {
        teacherName: "李老师",
        approvedHours: 10.0,
        credits: 2.0,
        comment: "全勤且积极参与社团活动，带队表现良好，予以足额认定。",
        approvedAt: "2026-10-26 11:20",
      },
      status: "approved", // 教师已完成终审
      approvalHistory: [
        {
          action: "提交学分申请",
          actor: "提交人：林知夏（成员）",
          time: "2026-10-19 16:30",
        },
        {
          action: "社长初审通过",
          actor: "初审人：赵子易（社长）",
          time: "2026-10-20 10:15",
        },
        {
          action: "教师终审通过",
          actor: "负责教师：李老师",
          time: "2026-10-26 11:20",
        },
      ],
      changeHistory: [
        {
          field: "最终学分认定",
          from: "待教师审核",
          to: "认定 10.0 小时 (2.0 学分)",
          actor: "负责教师：李老师",
          time: "2026-10-26 11:20",
        },
      ],
    },
    {
      id: "cr-10",
      studentId: "m-11",
      studentName: "韩沐言",
      class: "初二（6）班",
      role: "成员",
      attendedCount: 5,
      systemHours: 8.0,
      discussionsCount: 6,
      featuredCount: 1,
      declaredHours: 10.0,
      reviewedHours: 10.0, // 社长建议 10.0，教师核减为 8.0（演示「已调」）
      studentReason: "参加 5 场训练，承担每次训练的球门网与标志盘收发，课外自主加练累计 1.5 小时。",
      extraContribution: "协助器材室整理与场地恢复累计 2 小时。",
      attachments: ["器材收发记录.jpg"],
      leaderComment: "出勤稳定，器材收发负责，课外贡献属实，同意建议认定 10.0 小时。",
      teacherApproval: {
        teacherName: "李老师",
        approvedHours: 8.0,
        credits: 1.6,
        comment: "经核对，课外加练 1.5 小时缺少指导记录，周末器材整理 0.5 小时非社团统一组织，合计核减 2.0 学时，核定 8.0 小时。",
        approvedAt: "2026-10-26 16:40",
      },
      status: "approved", // 教师审核通过（调整学时：社长 10.0 → 教师 8.0）
      approvalHistory: [
        {
          action: "提交学分申请",
          actor: "提交人：韩沐言（成员）",
          time: "2026-10-20 18:00",
        },
        {
          action: "社长审核通过",
          actor: "审核人：赵子易（社长）",
          time: "2026-10-21 09:30",
        },
        {
          action: "教师审核调整通过",
          actor: "负责教师：李老师",
          time: "2026-10-26 16:40",
          detail: "建议 10.0 小时 → 核定 8.0 小时",
        },
      ],
      changeHistory: [
        {
          field: "最终学时核定",
          from: "社长建议 10.0 小时",
          to: "教师核定 8.0 小时 (1.6 学分)",
          actor: "负责教师：李老师",
          time: "2026-10-26 16:40",
        },
      ],
    },
    {
      id: "cr-9",
      studentId: "m-10",
      studentName: "苏亦然",
      class: "初二（4）班",
      role: "成员",
      attendedCount: 5,
      systemHours: 8.0,
      discussionsCount: 4,
      featuredCount: 0,
      declaredHours: 10.0,
      reviewedHours: null, // 退回后社长建议学时不再成立，与「社长退回」保持一致显示 —
      studentReason: "本学期参加 5 场训练，承担器材清点与场地恢复，课外参与校际交流赛 1 场。",
      extraContribution: "校际交流赛随队参与 2 小时。",
      attachments: ["交流赛签到表.jpg"],
      leaderComment: "出勤稳定，器材清理认真，同意建议认定 10.0 小时。",
      teacherReturnReason: "校际交流赛 2 小时属体育组统一组织，不重复计入社团学时，退回成员按 8.0 小时重新申请。",
      status: "teacherReturnedToMember", // 已退回成员（来源：教师退回）
      approvalHistory: [
        {
          action: "提交学分申请",
          actor: "提交人：苏亦然（成员）",
          time: "2026-10-21 09:10",
        },
        {
          action: "社长审核通过",
          actor: "审核人：赵子易（社长）",
          time: "2026-10-22 15:40",
        },
        {
          action: "教师退回申请",
          actor: "负责教师：李老师",
          time: "2026-10-25 10:05",
        },
      ],
      changeHistory: [
        {
          field: "审核状态",
          from: "待教师审核",
          to: "已退回成员",
          actor: "负责教师：李老师",
          time: "2026-10-25 10:05",
        },
      ],
    },
    {
      id: "cr-5",
      studentId: "m-5",
      studentName: "许嘉禾",
      class: "初二（3）班",
      role: "成员",
      attendedCount: 3, // 缺勤 3 场
      systemHours: 4.5,
      discussionsCount: 1,
      featuredCount: 0,
      declaredHours: null, // 从未提交
      reviewedHours: null,
      studentReason: "",
      extraContribution: "",
      attachments: [],
      leaderComment: "",
      status: "unsubmitted", // 待提交
    },
  ]);

  const [documentaryCreditRequests, setDocumentaryCreditRequests] = useState([
    {
      id: "dcr-1",
      studentId: "dm-2",
      studentName: "陈闻远",
      class: "初二（1）班",
      role: "成员",
      attendedCount: 4,
      systemHours: 6.5,
      discussionsCount: 6,
      featuredCount: 2,
      featuredQuotes: ["我准备了一组食堂清晨准备早餐的延时摄影方案，脚本已经打印好。"],
      declaredHours: 8.0,
      reviewedHours: null,
      studentReason: "担任微纪录片摄影组长，完成选题策划并带队实操 4 次，额外整理器材 1.5 小时。",
      extraContribution: "协助社长整理器材间与手持云台设备标定累计 1.5 小时。",
      attachments: ["微纪录片分镜脚本手稿.pdf"],
      leaderComment: "",
      status: "pending",
    },
    {
      id: "dcr-2",
      studentId: "dm-3",
      studentName: "苏沐阳",
      class: "初二（3）班",
      role: "成员",
      attendedCount: 3,
      systemHours: 5.0,
      discussionsCount: 4,
      featuredCount: 1,
      featuredQuotes: ["今天终于搞懂了低角度跟拍的平稳走位技巧，运镜不再有呼吸感晃动了！"],
      declaredHours: 5.0,
      reviewedHours: 5.0,
      studentReason: "按时参加 3 次实训，掌握了云台调平与低角度运镜技能。",
      extraContribution: "",
      attachments: [],
      leaderComment: "实操态度端正，进步显著，同意认定 5.0 小时。",
      status: "submitted",
    },
    {
      id: "dcr-3",
      studentId: "dm-4",
      studentName: "韩佳欣",
      class: "初二（2）班",
      role: "成员",
      attendedCount: 3,
      systemHours: 5.0,
      discussionsCount: 3,
      featuredCount: 0,
      featuredQuotes: [],
      declaredHours: null,
      reviewedHours: null,
      studentReason: "",
      extraContribution: "",
      attachments: [],
      leaderComment: "",
      status: "unsubmitted",
    },
    {
      id: "dcr-4",
      studentId: "dm-5",
      studentName: "宋可晴",
      class: "初二（5）班",
      role: "成员",
      attendedCount: 3,
      systemHours: 5.0,
      discussionsCount: 2,
      featuredCount: 0,
      featuredQuotes: [],
      declaredHours: null,
      reviewedHours: null,
      studentReason: "",
      extraContribution: "",
      attachments: [],
      leaderComment: "",
      status: "unsubmitted",
    },
  ]);

  // 社长本人学分申报状态（分别对应当前社团）
  const [presidentCredits, setPresidentCredits] = useState({
    football: {
      status: "unsubmitted", // unsubmitted | submitted | returned | approved
      declaredHours: 15,
      summary: "本学期作为社长全面负责足球联盟的纳新组建、每周三常规训练与校园友谊赛组织。全勤组织 6 场活动，社团从 0 到 7 人健康持续运行。",
      submittedAt: "2026-10-24 16:20",
      approvalHistory: [
        { action: "提交学分申请", actor: "赵子易", time: "2026-10-24 16:20", detail: "申请 15 小时，等待负责老师审核" },
      ],
      changeHistory: [
        { field: "申请学时", from: "12 小时", to: "15 小时", actor: "赵子易", time: "2026-10-24 16:18" },
      ],
    },
    documentary: {
      status: "returned",
      declaredHours: 12,
      summary: "本学期担任校园纪录片社社长，负责选题立项、拍摄设备培训与两期微纪录片实拍创作，按计划完成学期阶段成果。",
      submittedAt: "2026-10-18 14:40",
      returnReason: "请补充活动记录整理完成情况，并明确本学期组织成果。",
      approvalHistory: [
        { action: "提交学分申请", actor: "赵子易", time: "2026-10-18 14:40", detail: "申请 12 小时" },
        { action: "退回修改", actor: "李明", time: "2026-10-20 10:15", detail: "请补充活动记录整理完成情况，并明确本学期组织成果。" },
      ],
      changeHistory: [
        { field: "收获与体会", from: "完成拍摄与剪辑任务", to: "补充了分镜组织与成员协作说明", actor: "赵子易", time: "2026-10-18 14:35" },
      ],
    },
  });

  const isDoc = club.id === "documentary";
  const applicants = isDoc ? documentaryApplicants : footballApplicants;
  const setApplicants = isDoc ? setDocumentaryApplicants : setFootballApplicants;
  const applicationHistory = isDoc ? documentaryApplicationHistory : footballApplicationHistory;
  const setApplicationHistory = isDoc ? setDocumentaryApplicationHistory : setFootballApplicationHistory;
  const members = isDoc ? documentaryMembers : footballMembers;
  const setMembers = isDoc ? setDocumentaryMembers : setFootballMembers;
  const activities = isDoc ? documentaryActivities : footballActivities;
  const setActivities = isDoc ? setDocumentaryActivities : setFootballActivities;
  const creditRequests = isDoc ? documentaryCreditRequests : footballCreditRequests;
  const setCreditRequests = isDoc ? setDocumentaryCreditRequests : setFootballCreditRequests;
  const myPresidentCredit = presidentCredits[club.id] || presidentCredits.football;

  const [memberKeyword, setMemberKeyword] = useState("");
  const [showPublishModal, setShowPublishModal] = useState(() => typeof window !== "undefined" && window.__PROTO_MODAL__ === "publish");
  const [activityWorkbench, setActivityWorkbench] = useState(null);
  const [attendanceModalActivity, setAttendanceModalActivity] = useState(null);
  const [recordModalActivity, setRecordModalActivity] = useState(null);
  const [discussionActivity, setDiscussionActivity] = useState(null); // 独立话题讨论二级页
  const [activityFilter, setActivityFilter] = useState("all"); // 活动状态筛选: "all" | "ongoing" | "upcoming" | "completed"
  const [showAllMoments, setShowAllMoments] = useState(() => bootParams.get("view") === "moments");
  const [openActionMenuId, setOpenActionMenuId] = useState(null); // 活动卡片更多操作菜单展开项
  const [editModalActivity, setEditModalActivity] = useState(null); // 编辑活动弹窗
  const [deleteModalActivity, setDeleteModalActivity] = useState(null); // 删除活动确认弹窗

  // 学分台账与审核相关状态
  const [creditTabFilter, setCreditTabFilter] = useState("all"); // "all" | "pending" | "submitted" | "approved" | "unsubmitted"
  const [creditKeyword, setCreditKeyword] = useState(""); // 学分台账成员搜索关键词
  const [reviewingCreditRecord, setReviewingCreditRecord] = useState(null); // 当前审核/查看的成员表单
  const [modalReviewedHours, setModalReviewedHours] = useState("");
  const [modalLeaderComment, setModalLeaderComment] = useState("");
  const [showPresidentCreditModal, setShowPresidentCreditModal] = useState(false);
  const [presidentViewOnly, setPresidentViewOnly] = useState(false); // true：只读查看已提交/已撤回的申请；false：可编辑申报
  const [presidentWithdrawConfirm, setPresidentWithdrawConfirm] = useState(false); // 社长撤回学分申请的二次确认
  const [presidentSummaryInput, setPresidentSummaryInput] = useState(myPresidentCredit.summary || "");
  const [presidentDeclaredHoursInput, setPresidentDeclaredHoursInput] = useState(myPresidentCredit.declaredHours || 15);
  const [showQuotesExpanded, setShowQuotesExpanded] = useState(false);
  // 旧说明弹窗仍保留给既有入口；社长工作台本身不展示折算结果。
  const [showCreditRuleModal, setShowCreditRuleModal] = useState(false);
  const [returnCreditModalRecord, setReturnCreditModalRecord] = useState(null); // 独立退回申报修改弹窗的目标记录
  const [recallConfirmRecord, setRecallConfirmRecord] = useState(null); // 撤回审核结果的二次确认目标记录
  const [returnReasonText, setReturnReasonText] = useState("");

  useEffect(() => {
    const handleOutsideClick = () => setOpenActionMenuId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // 教师后台配置（由学期方案统一控制）
  const [activityConfig] = useState({
    allowAttendance: true, // 考勤开关（教师端控制）
    allowMaterials: true,  // 开展材料开关（教师端控制）
    allowDynamic: true,    // 活动动态开关（教师端控制）
  });

  const handleToggleFeatured = (actId, contribId) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id !== actId) return act;
        const newContribs = (act.contributions || []).map((c) =>
          c.id === contribId ? { ...c, isFeatured: !c.isFeatured } : c
        );
        const updated = { ...act, contributions: newContribs };
        if (activityWorkbench && activityWorkbench.id === actId) {
          setActivityWorkbench(updated);
        }
        return updated;
      })
    );
    onNotify("已更新成员研讨精选状态，将实时作为学分与评价依据。");
  };

  const handleAddContribution = (actId, payload) => {
    const { text, photos = [] } = typeof payload === "string" ? { text: payload } : payload;
    if (!text?.trim() && !photos.length) return;
    const newContrib = {
      id: `c-${Date.now()}`,
      name: "赵子易",
      role: "社长",
      class: "初二（3）班",
      time: formatNowDateTime(),
      text: text?.trim() || "分享了活动现场照片。",
      photos,
      isFeatured: false,
    };
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id !== actId) return act;
        const updated = { ...act, contributions: [...(act.contributions || []), newContrib] };
        if (activityWorkbench && activityWorkbench.id === actId) {
          setActivityWorkbench(updated);
        }
        return updated;
      })
    );
    onNotify("精彩瞬间已发布。");
  };
  const [showEndModal, setShowEndModal] = useState(false);
  const [endReason, setEndReason] = useState("");
  const [showRenewModal, setShowRenewModal] = useState(() => typeof window !== "undefined" && window.__PROTO_MODAL__ === "renew");
  const [renewCapacity, setRenewCapacity] = useState(String(club.capacity || "30"));
  const [renewTargetTerm, setRenewTargetTerm] = useState("2026-2027 学年下学期");
  const [renewMemberIds, setRenewMemberIds] = useState(() => members.map((member) => member.id));
  const [renewRecruiting, setRenewRecruiting] = useState(true);

  // 社团生命周期状态与申请数据（支持延续/提前结束全生命周期流转与演示）
  const [clubLifecycles, setClubLifecycles] = useState({
    football: {
      status: "none", // "none" | "renew_pending" | "renew_returned" | "renew_approved" | "end_pending" | "end_returned" | "end_approved"
      renewData: {
        targetTerm: "2026-2027 学年下学期",
        capacity: 35,
        retainedMemberIds: ["m-1", "m-2", "m-3", "m-4", "m-7", "m-8"],
        continueRecruiting: true,
        submittedAt: "2026-10-28 14:30",
        teacherReturnReason: "下学期拟招人数超过学校体育场地核定承载上限（至多30人），请核实并调整计划人数上限后再报送。",
        teacherName: "李老师",
        returnedAt: "2026-10-29 10:15",
        approvedAt: "2026-10-30 09:20",
      },
      endData: {
        reason: "因足球场地于下月启动全封闭人工草坪改造，预计持续整学期，且骨干成员临近中考集中复习，社内协商决定提前结束本学期社团训练。",
        submittedAt: "2026-10-27 16:20",
        teacherReturnReason: "本学期尚有 2 场校际训练赛积分和体育器材清单尚未整理完毕，请先在系统补全活动记录与器材归还单后再提交。",
        teacherName: "李老师",
        returnedAt: "2026-10-28 11:30",
        approvedAt: "2026-10-29 15:40",
      },
    },
    documentary: {
      status: "none",
      renewData: {
        targetTerm: "2026-2027 学年下学期",
        capacity: 25,
        retainedMemberIds: ["dm-1", "dm-2", "dm-3"],
        continueRecruiting: true,
        submittedAt: "2026-10-29 11:00",
        teacherReturnReason: "器材室下学期拟升级4K摄像机，需补充设备使用与安全管护方案后再重提。",
        teacherName: "李老师",
        returnedAt: "2026-10-29 16:20",
        approvedAt: "2026-10-30 10:00",
      },
      endData: {
        reason: "因微纪录片后期制作工作站集中报修，无法开展视频剪辑教学，申请提前结束本学期社团。",
        submittedAt: "2026-10-28 09:30",
        teacherReturnReason: "请先将本学期已拍摄的 4 场素材归档至学校网盘，确认无遗漏后再行报备。",
        teacherName: "李老师",
        returnedAt: "2026-10-28 14:00",
        approvedAt: "2026-10-29 16:00",
      },
    },
  });

  const [lifecycleDetailModal, setLifecycleDetailModal] = useState(null); // { type: "renew" | "end" }
  const [withdrawConfirm, setWithdrawConfirm] = useState(null); // null | "renew" | "end" 撤回申请确认弹窗

  const currentLifecycle = clubLifecycles[club.id] || clubLifecycles.football;
  const lifecycleStatus = currentLifecycle.status;

  // 延续/提前结束按钮的禁用原因（悬停提示；undefined 表示可用）
  const renewDisabledReason = (() => {
    if (isArchived) return "历史学期已归档，不可操作";
    switch (lifecycleStatus) {
      case "renew_pending": return "延续申请正在审批中，不可重复发起";
      case "renew_returned": return "延续申请已被退回，请在顶部通报条中重新申请";
      case "renew_approved": return "本学期延续申请已通过，无需再次申请";
      case "end_pending":
      case "end_returned": return "提前结束申请正在处理中，不可申请延续";
      case "end_approved": return "社团已提前结束，不可申请延续";
      default: return undefined;
    }
  })();
  const endDisabledReason = (() => {
    if (isArchived) return "历史学期已归档，不可操作";
    switch (lifecycleStatus) {
      case "renew_pending":
      case "renew_returned": return "延续申请正在处理中，不可申请提前结束";
      case "end_pending": return "提前结束申请正在审批中，不可重复发起";
      case "end_returned": return "提前结束申请已被退回，请在顶部通报条中重新申请";
      case "end_approved": return "社团已提前结束，无需再申请";
      default: return undefined;
    }
  })();

  const setStatus = (newStatus, patchData = {}) => {
    setClubLifecycles((prev) => ({
      ...prev,
      [club.id]: {
        ...currentLifecycle,
        ...patchData,
        status: newStatus,
      },
    }));
  };

  const handleWithdrawApplication = (type) => {
    setWithdrawConfirm(type);
  };

  const confirmWithdrawApplication = () => {
    const type = withdrawConfirm;
    setWithdrawConfirm(null);
    setStatus("none");
    onNotify(`已撤回${type === "renew" ? "社团延续申请" : "提前结束申请"}，社团恢复正常运行。`);
  };

  const handleReapplyRenew = () => {
    setRenewCapacity(String(currentLifecycle.renewData?.capacity || club.capacity || 30));
    setRenewMemberIds(currentLifecycle.renewData?.retainedMemberIds || members.map((m) => m.id));
    setShowRenewModal(true);
  };

  const handleReapplyEnd = () => {
    setEndReason(currentLifecycle.endData?.reason || "");
    setShowEndModal(true);
  };

  const openRenewModal = () => {
    setRenewMemberIds(members.map((member) => member.id));
    setRenewCapacity(String(Math.max(Number(club.capacity) || 0, members.length)));
    setShowRenewModal(true);
  };

  const buildRenewalRequest = () => ({
    club,
    members,
    targetTerm: renewTargetTerm,
    capacity: renewCapacity,
    retainedMemberIds: renewMemberIds,
    continueRecruiting: renewRecruiting,
  });

  const toggleRenewMember = (member) => {
    if (member.role === "社长") return;
    setRenewMemberIds((previous) => (
      previous.includes(member.id)
        ? previous.filter((id) => id !== member.id)
        : [...previous, member.id]
    ));
  };

  const handleRenewClubSubmit = (e) => {
    e.preventDefault();
    if (Number(renewCapacity) < renewMemberIds.length) {
      onNotify(`人数上限不能少于拟保留的 ${renewMemberIds.length} 名成员。`);
      return;
    }
    const nowTime = formatNowDateTime();
    setShowRenewModal(false);
    setStatus("renew_pending", {
      renewData: {
        ...currentLifecycle.renewData,
        targetTerm: renewTargetTerm,
        capacity: Number(renewCapacity),
        retainedMemberIds: renewMemberIds,
        continueRecruiting: renewRecruiting,
        submittedAt: nowTime,
      },
    });
    onNotify(`「${club.name}」延续到下学期（${renewTargetTerm}）申请已提交，等待教师确认。`);
  };

  const handleOpenRenewalDetails = () => {
    if (Number(renewCapacity) < renewMemberIds.length) {
      onNotify(`人数上限不能少于拟保留的 ${renewMemberIds.length} 名成员。`);
      return;
    }
    setShowRenewModal(false);
    onOpenRenewalDetails(buildRenewalRequest());
  };

  const handleApproveApplicant = (applicant) => {
    if (isArchived) {
      onNotify("历史学期已归档，不可修改成员数据。");
      return;
    }
    const nextApplicants = applicants.filter((item) => item.id !== applicant.id);
    const nowTime = formatNowDateTime();
    const nowDate = formatNowDate();
    setApplicants(nextApplicants);
    setMembers((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        name: applicant.name,
        role: "成员",
        class: applicant.class,
        joinDate: nowDate,
        count: 0,
        phone: applicant.phone,
      },
    ]);
    setApplicationHistory((prev) => [{
      id: `${applicant.id}-approved-${Date.now()}`,
      name: applicant.name,
      class: applicant.class,
      phone: applicant.phone,
      reason: applicant.reason,
      status: "approved",
      submittedAt: applicant.time,
      handledAt: nowTime,
      attempts: 1,
    }, ...prev]);
    setReviewingApplicant(nextApplicants[0] || null);
    onNotify(`已同意「${applicant.name}」加入社团，当前共 ${members.length + 1} 名成员。`);
  };

  const handleRejectApplicant = (applicant, rejectNote = "") => {
    if (isArchived) return;
    const nextApplicants = applicants.filter((item) => item.id !== applicant.id);
    const nowTime = formatNowDateTime();
    setApplicants(nextApplicants);
    setApplicationHistory((prev) => [{
      id: `${applicant.id}-rejected-${Date.now()}`,
      name: applicant.name,
      class: applicant.class,
      phone: applicant.phone,
      reason: applicant.reason,
      status: "rejected",
      submittedAt: applicant.time,
      handledAt: nowTime,
      attempts: 1,
      note: rejectNote.trim() || undefined,
    }, ...prev]);
    setReviewingApplicant(nextApplicants[0] || null);
    onNotify(`已婉拒「${applicant.name}」的入团申请。`);
  };

  const handleOpenReview = (record) => {
    setReviewingCreditRecord(record);
    setModalReviewedHours(String(record.reviewedHours || record.declaredHours || record.systemHours));
    setModalLeaderComment(record.leaderComment || (record.status === "pending" ? "该同学出勤稳定，积极参与研讨，表现良好，同意认定。" : ""));
  };

  const handleConfirmReview = () => {
    if (isArchived || !reviewingCreditRecord) return;
    const hoursNum = Number(modalReviewedHours) || reviewingCreditRecord.systemHours;
    const nowTime = formatNowDateTime();
    setCreditRequests((prev) =>
      prev.map((item) =>
        item.id === reviewingCreditRecord.id
          ? {
            ...item,
            status: "submitted",
            reviewedHours: hoursNum,
            leaderComment: modalLeaderComment.trim() || "该同学出勤稳定，表现优异，同意认定。",
            approvalHistory: [
              ...(item.approvalHistory || [{ action: "提交学分申请", actor: item.studentName, time: "2026-10-23 19:20", detail: `申请 ${item.declaredHours || item.systemHours} 小时` }]),
              { action: "社长审核通过", actor: "赵子易", time: nowTime, detail: `建议认定 ${hoursNum} 小时` },
            ],
            changeHistory: [
              ...(item.changeHistory || []),
              ...(Number(item.declaredHours || item.systemHours) !== hoursNum ? [{ field: "社长建议学时", from: `${item.declaredHours || item.systemHours} 小时`, to: `${hoursNum} 小时`, actor: "赵子易", time: nowTime }] : []),
            ],
          }
          : item
      )
    );
    onNotify(`已完成「${reviewingCreditRecord.studentName}」的学分审核（认定 ${hoursNum} 小时），并提交给老师！`);
    setReviewingCreditRecord(null);
  };

  // 撤回修改：在老师未审核前，社长随时可撤回重新调整
  const handleRecallReview = (record) => {
    if (isArchived) return;
    const nowTime = formatNowDateTime();
    setCreditRequests((prev) =>
      prev.map((item) =>
        item.id === record.id
          ? {
            ...item,
            status: "pending",
            approvalHistory: [...(item.approvalHistory || []), { action: "撤回审核结果", actor: "赵子易", time: nowTime, detail: "恢复为待社长审核" }],
          }
          : item
      )
    );
    onNotify(`已撤回对「${record.studentName}」的审核，该申请已重新回到待审核状态。`);
    if (reviewingCreditRecord && reviewingCreditRecord.id === record.id) {
      setReviewingCreditRecord((prev) => ({ ...prev, status: "pending" }));
    }
  };

  // 打开独立退回弹窗
  const handleOpenReturnModal = (record) => {
    if (isArchived || !record) return;
    setReturnCreditModalRecord(record);
    setReturnReasonText("");
  };

  // 执行退回给成员：必须填写退回原因
  const handleExecuteReturnToStudent = () => {
    if (isArchived || !returnCreditModalRecord) return;
    if (!returnReasonText.trim()) {
      onNotify("请填写退回原因，以便同学针对性修改。");
      return;
    }
    const reason = returnReasonText.trim();
    const nowTime = formatNowDateTime();
    setCreditRequests((prev) =>
      prev.map((item) =>
        item.id === returnCreditModalRecord.id
          ? {
            ...item,
            status: "unsubmitted",
            leaderComment: `社长退回意见：${reason}`,
            approvalHistory: [...(item.approvalHistory || [{ action: "提交学分申请", actor: item.studentName, time: "2026-10-23 19:20", detail: `申请 ${item.declaredHours || item.systemHours} 小时` }]), { action: "退回修改", actor: "赵子易", time: nowTime, detail: reason }],
          }
          : item
      )
    );
    onNotify(`已将学分申请退回给「${returnCreditModalRecord.studentName}」（退回原因：${reason}）。`);
    setReturnCreditModalRecord(null);
    setReviewingCreditRecord(null);
    setReturnReasonText("");
  };

  const handleSubmitPresidentCredit = () => {
    if (isArchived) return;
    const hoursNum = Number(presidentDeclaredHoursInput) || myPresidentCredit.declaredHours || 15;
    const nowTime = formatNowDateTime();
    setPresidentCredits((prev) => ({
      ...prev,
      [club.id]: {
        ...myPresidentCredit,
        status: "submitted",
        declaredHours: hoursNum,
        summary: presidentSummaryInput,
        submittedAt: nowTime,
        withdrawnAt: "",
        returnReason: "",
        approvalHistory: [
          ...(myPresidentCredit.approvalHistory || []),
          { action: "提交学分申请", actor: "赵子易", time: nowTime, detail: `申请 ${hoursNum} 小时，等待负责老师审核` },
        ],
        changeHistory: [
          ...(myPresidentCredit.changeHistory || []),
          ...(myPresidentCredit.summary !== presidentSummaryInput ? [{ field: "收获与体会", from: myPresidentCredit.summary, to: presidentSummaryInput, actor: "赵子易", time: nowTime }] : []),
          ...(myPresidentCredit.declaredHours !== hoursNum ? [{ field: "申请学时", from: `${myPresidentCredit.declaredHours} 小时`, to: `${hoursNum} 小时`, actor: "赵子易", time: nowTime }] : []),
        ],
      },
    }));
    setShowPresidentCreditModal(false);
    onNotify(`社长学分申请（${hoursNum} 小时）已提交给老师审核！`);
  };

  const updateActivity = (updatedActivity, message) => {
    setActivities((prev) => prev.map((item) => item.id === updatedActivity.id ? updatedActivity : item));
    if (activityWorkbench && activityWorkbench.id === updatedActivity.id) {
      setActivityWorkbench(updatedActivity);
    }
    if (discussionActivity && discussionActivity.id === updatedActivity.id) {
      setDiscussionActivity(updatedActivity);
    }
    if (message) onNotify(message);
  };

  const handleDeleteActivityConfirm = (act) => {
    setActivities((prev) => prev.filter((item) => item.id !== act.id));
    if (activityWorkbench && activityWorkbench.id === act.id) {
      setActivityWorkbench(null);
    }
    if (discussionActivity && discussionActivity.id === act.id) {
      setDiscussionActivity(null);
    }
    onNotify(`已删除活动「${act.title}」`);
  };

  const handleEndClubSubmit = (e) => {
    e.preventDefault();
    if (!endReason.trim()) return;
    const reasonText = endReason.trim();
    const nowTime = formatNowDateTime();
    setShowEndModal(false);
    setEndReason("");
    setStatus("end_pending", {
      endData: {
        ...currentLifecycle.endData,
        reason: reasonText,
        submittedAt: nowTime,
      },
    });
    onNotify("提前结束申请已提交学校，等待指导教师审批确认。");
  };

  const filteredMembers = useMemo(() => {
    if (!memberKeyword.trim()) return members;
    const kw = memberKeyword.trim();
    return members.filter(
      (m) =>
        m.name.includes(kw) ||
        m.class.includes(kw) ||
        m.role.includes(kw) ||
        (m.phone && m.phone.includes(kw))
    );
  }, [members, memberKeyword]);

  const pendingCreditsCount = creditRequests.filter((c) => c.status === "pending" || c.status === "teacherReturned").length;
  const currentTab = tab || "members";

  const tabItems = [
    ["members", `成员名册（${members.length}）`],
    ["activities", `社团活动（${activities.length}）`],
    ["showcase", "成果荣誉（7）"],
    ["credits", `社团学分${pendingCreditsCount > 0 ? `（待审核 ${pendingCreditsCount}）` : ""}`],
  ];

  // 渲染 Tab 核心主体内容
  const renderTabContent = () => (
    <>
      {/* Tab 1: 成员名册（纯粹的名册主体 + 顶部新入团申请提醒条） */}
      {currentTab === "members" && (
        <div className="manage-tab-content">
          {/* 招新期新申请提醒条（当存在待审核入团申请时展示） */}
          {applicants.length > 0 && (
            <div className="applicant-pending-banner">
              <div className="banner-left">
                <span className="banner-badge">新入团申请</span>
                <span className="banner-text">
                  有 <strong>{applicants.length}</strong> 位同学申请加入社团，待你审核
                </span>
              </div>
              <div className="banner-right">
                <button
                  type="button"
                  className="banner-toggle-btn"
                  onClick={() => setReviewingApplicant(applicants[0])}
                >
                  去审核（{applicants.length}）›
                </button>
              </div>
            </div>
          )}

          {/* 正式成员名册主体 */}
          <div className="members-section">
            <div className="members-toolbar">
              <div className="toolbar-search-box">
                <MagnifyingGlass size={15} />
                <input
                  type="text"
                  placeholder="搜索成员姓名、班级或联系电话..."
                  value={memberKeyword}
                  onChange={(e) => setMemberKeyword(e.target.value)}
                />
                {memberKeyword && (
                  <button
                    type="button"
                    className="toolbar-search-clear"
                    onClick={() => setMemberKeyword("")}
                    aria-label="清空搜索"
                  >
                    ×
                  </button>
                )}
              </div>
              <div className="toolbar-right-actions">
                <span className="members-count-badge">
                  当前成员 <strong>{members.length}</strong> / {club.capacity} 人
                </span>
                <button
                  type="button"
                  className="secondary compact"
                  onClick={() => {
                    setApplicationHistoryFilter("all");
                    setShowApplicationHistory(true);
                  }}
                >
                  <ClipboardText size={14} /> 入团申请记录（{applicationHistory.length}）
                </button>
                <button
                  type="button"
                  className="secondary compact"
                  onClick={() => onNotify(`已导出「${club.name}」成员名单 Excel 表格。`)}
                >
                  <Export size={14} /> 导出成员名单
                </button>
              </div>
            </div>

            <div className="members-table-wrap">
              <table className="president-members-table">
                <thead>
                  <tr>
                    <th>成员姓名</th>
                    <th>身份</th>
                    <th>所在班级</th>
                    <th>加入日期</th>
                    <th>活动出勤</th>
                    <th>联系电话</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((m) => {
                      const classDisplay = m.class || `${m.grade || "初二"}（${m.classNo || "3 班"}）`;
                      const maxCount = isDoc ? 4 : 6;
                      const isFullAttendance = m.count >= maxCount && m.count > 0;
                      return (
                        <tr key={m.id}>
                          <td>
                            <strong className="member-name-text">{m.name}</strong>
                          </td>
                          <td>
                            {m.role === "社长" ? (
                              <span className="profile-role-pill leader-pill">社长</span>
                            ) : (
                              <span className="profile-role-pill member-pill">成员</span>
                            )}
                          </td>
                          <td>
                            <span className="member-class-badge">{classDisplay}</span>
                          </td>
                          <td className="member-tabular-cell">{m.joinDate}</td>
                          <td>
                            {m.count > 0 ? (
                              <div className="member-attendance-cell">
                                <span className="attendance-text">{m.count} 场</span>
                                {isFullAttendance && <span className="attendance-full-tag">全勤</span>}
                              </div>
                            ) : (
                              <span className="attendance-new-tag">新加入</span>
                            )}
                          </td>
                          <td className="member-tabular-cell">{m.phone}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="members-empty-cell">
                        <div className="members-empty-state">
                          <span>没有找到包含“{memberKeyword}”的成员</span>
                          <button type="button" className="text-button" onClick={() => setMemberKeyword("")}>
                            清空搜索条件
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 社团活动：活动发布、考勤、讨论与过程材料均以单场活动为对象 */}
      {currentTab === "activities" && (
        <div className="manage-tab-content">
          {showAllMoments ? (
            <ManageMomentsOverview
              activities={activities}
              onBack={() => setShowAllMoments(false)}
              onNotify={onNotify}
            />
          ) : <>
          {/* 纯净的活动管理工具栏（由左侧唯一大按钮统领发布，右侧杜绝重复） */}
          <div className="activities-toolbar">
            <div className="activities-filter-pills">
              <button
                type="button"
                className={`filter-pill-btn ${activityFilter === "all" ? "active" : ""}`}
                onClick={() => setActivityFilter("all")}
              >
                全部（{activities.length}）
              </button>
              <button
                type="button"
                className={`filter-pill-btn ${activityFilter === "ongoing" ? "active" : ""}`}
                onClick={() => setActivityFilter("ongoing")}
              >
                进行中（{activities.filter((a) => a.status === "ongoing").length}）
              </button>
              <button
                type="button"
                className={`filter-pill-btn ${activityFilter === "upcoming" ? "active" : ""}`}
                onClick={() => setActivityFilter("upcoming")}
              >
                待开展（{activities.filter((a) => a.status === "upcoming").length}）
              </button>
              <button
                type="button"
                className={`filter-pill-btn ${activityFilter === "completed" ? "active" : ""}`}
                onClick={() => setActivityFilter("completed")}
              >
                已结束（{activities.filter((a) => a.status === "completed").length}）
              </button>
            </div>
            <button
              type="button"
              className="ledger-enter"
              onClick={() => setShowAllMoments(true)}
              title="查看本社团全部活动瞬间"
            >
              <Camera size={13} />
              查看全部活动瞬间
              <em>{activities.reduce((sum, item) => sum + (item.contributions?.length || 0), 0)}</em>
              <CaretRight size={12} />
            </button>
          </div>

          <div className="event-cards-list">
            {(activityFilter === "all"
              ? activities
              : activities.filter((a) => a.status === activityFilter)
            ).map((act) => {
              const isUpcoming = act.status === "upcoming";
              const isOngoing = act.status === "ongoing";
              const isCompleted = act.status === "completed";

              const needsAttendance = act.attendanceStatus !== "completed";
              const needsRecord = act.recordStatus !== "submitted";

              return (
                <div className="clean-event-card" key={act.id}>
                  {/* 1. 左侧日期锚点：日与周几 */}
                  <div className="clean-date-badge">
                    <span className="clean-date-day">{act.dateDay || "10.23"}</span>
                    <span className="clean-date-week">{act.dateWeek || "周三"}</span>
                  </div>

                  {/* 2. 主体内容区：纯净自然流，无嵌套盒中盒 */}
                  <div className="clean-card-body">
                    {/* 顶栏：标题 + 状态角标 + 右侧操作按钮 */}
                    <div className="clean-card-header">
                      <div className="clean-title-group">
                        <strong
                          className="clean-title-text"
                          onClick={() => setActivityWorkbench(act)}
                          title="点击查看活动详情"
                        >
                          {act.title}
                        </strong>
                        <span className={`clean-status-pill ${act.status}`}>
                          <i className="status-dot" />
                          {act.statusLabel || (isUpcoming ? "待开展" : isOngoing ? "进行中" : "已结束")}
                        </span>
                      </div>

                      {/* 右侧动作群：直接在顶栏靠右排布，干净利落 */}
                      <div className="clean-actions-row">
                        {/* 优先级 1：考勤未完成（统一使用“考勤点名”） */}
                        {!isUpcoming && needsAttendance && (
                          <button
                            type="button"
                            className="btn-clean-primary"
                            disabled={isArchived}
                            onClick={() => setAttendanceModalActivity(act)}
                          >
                            考勤点名
                          </button>
                        )}

                        {/* 优先级 2：考勤已完成，但活动记录未填写 */}
                        {!isUpcoming && !needsAttendance && needsRecord && (
                          <button
                            type="button"
                            className="btn-clean-primary"
                            disabled={isArchived}
                            onClick={() => setRecordModalActivity(act)}
                          >
                            填写活动记录
                          </button>
                        )}

                        {/* 常驻白底次按钮：100% 稳定统一叫“查看详情”，绝不漂移 */}
                        <button
                          type="button"
                          className="btn-clean-secondary"
                          onClick={() => setActivityWorkbench(act)}
                        >
                          查看详情
                        </button>

                        <div className="clean-more-wrap">
                          <button
                            type="button"
                            className={`btn-clean-more ${openActionMenuId === act.id ? "active" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenActionMenuId((prev) => (prev === act.id ? null : act.id));
                            }}
                            title="更多操作"
                          >
                            <CaretDown size={12} weight="bold" />
                          </button>

                          {openActionMenuId === act.id && (
                            <div className="activity-action-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                              {/* 1. 全阶段均支持编辑活动信息 */}
                              <button
                                type="button"
                                className="activity-action-dropdown-item"
                                disabled={isArchived}
                                onClick={() => {
                                  setOpenActionMenuId(null);
                                  setEditModalActivity(act);
                                }}
                              >
                                <NotePencil size={14} /> 编辑活动信息
                              </button>

                              {/* 2. 考勤已做完时：更多里提供修改考勤事实入口 */}
                              {activityConfig.allowAttendance && act.attendanceStatus === "completed" && (
                                <button
                                  type="button"
                                  className="activity-action-dropdown-item"
                                  disabled={isArchived}
                                  onClick={() => {
                                    setOpenActionMenuId(null);
                                    setAttendanceModalActivity(act);
                                  }}
                                >
                                  <CheckCircle size={14} /> 修改考勤记录
                                </button>
                              )}

                              {/* 3. 活动记录已提交时：更多里提供修改图文小结入口 */}
                              {activityConfig.allowMaterials && act.recordStatus === "submitted" && (
                                <button
                                  type="button"
                                  className="activity-action-dropdown-item"
                                  disabled={isArchived}
                                  onClick={() => {
                                    setOpenActionMenuId(null);
                                    setRecordModalActivity(act);
                                  }}
                                >
                                  <FileText size={14} /> 修改活动记录
                                </button>
                              )}

                              {/* 4. 全阶段均支持删除本场活动（触发智能感知确认弹窗） */}
                              <button
                                type="button"
                                className="activity-action-dropdown-item text-danger"
                                disabled={isArchived}
                                onClick={() => {
                                  setOpenActionMenuId(null);
                                  setDeleteModalActivity(act);
                                }}
                              >
                                <Trash size={14} /> 删除本场活动
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 第二行：客观事实流（去掉机械的“时间：”“场地：”冒号，图标+中点连接） */}
                    <div className="clean-meta-line">
                      <span className="meta-fact">
                        <Clock size={13} className="fact-icon" />
                        <span>{act.dateTime || act.date}</span>
                      </span>
                      <span className="fact-dot">·</span>
                      <span className="meta-fact">
                        <MapPin size={13} className="fact-icon" />
                        <span>{act.venue}</span>
                      </span>

                      {!isUpcoming && (
                        <>
                          <span className="fact-dot">·</span>
                          <span className={`meta-fact ${act.attendanceStatus === "completed" ? "text-green" : "text-amber"}`}>
                            <Users size={13} className="fact-icon" />
                            <span>{act.attendees}</span>
                          </span>
                        </>
                      )}

                      {!isUpcoming && (
                        <>
                          <span className="fact-dot">·</span>
                          <span className={`meta-fact ${act.recordStatus === "submitted" ? "text-green" : "text-amber"}`}>
                            {act.recordStatus === "submitted" ? (
                              <><CheckCircle size={13} className="fact-icon" /> 已填活动记录</>
                            ) : (
                              <><NotePencil size={13} className="fact-icon" /> 未填活动记录</>
                            )}
                          </span>
                        </>
                      )}
                    </div>

                    {/* 第三行：活动说明（自然排版，不加粗笨前缀） */}
                    {act.desc && (
                      <p className="clean-desc-text">{act.desc}</p>
                    )}

                    {/* 第四行：附件居左，活动瞬间入口居右 */}
                    {((act.attachments && act.attachments.length > 0) || activityConfig.allowDynamic) && (
                      <div className="clean-footer-line">
                        {act.attachments && act.attachments.length > 0 && (
                          <div className="clean-attachments-group">
                            {act.attachments.map((att, idx) => (
                              <span
                                key={idx}
                                className="clean-att-pill"
                                onClick={() => onNotify(`正在打开附件预览/下载：「${att.name}」`)}
                                title="点击查看或下载附件"
                              >
                                <Paperclip size={12} />
                                <span className="att-name">{att.name}</span>
                                <span className="att-size">({att.size})</span>
                              </span>
                            ))}
                          </div>
                        )}

                        {activityConfig.allowDynamic && (
                          <div
                            className="clean-topic-link is-moment"
                            onClick={() => onOpenMomentPage?.(act)}
                            title="查看与分享本场活动的瞬间"
                          >
                            <Camera size={13} className="topic-icon" />
                            <span className="topic-name">活动瞬间</span>
                            <span className="topic-count">{manageMomentCountOf(act)} 份分享</span>
                            <CaretRight size={11} className="topic-arrow" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          </>}
        </div>
      )}

      {currentTab === "showcase" && <PatchManageShowcase club={club} isArchived={isArchived} onNotify={onNotify} />}

      {/* Tab 4: 社团学分（社长申报入口 + 全员认定台账） */}
      {currentTab === "credits" && (() => {
        const president = members.find((m) => m.role === "社长") || { name: "赵子易", class: "初二（3）班", role: "社长" };
        const attendedDone = activities.filter((a) => a.attendanceStatus === "completed").length;
        const recordedDone = activities.filter((a) => a.recordStatus === "submitted").length;
        const pendingInitial = creditRequests.filter((c) => c.status === "pending").length;
        const pendingRereview = creditRequests.filter((c) => c.status === "teacherReturned").length;
        const totalSeats = creditRequests.length + 1;
        const keyword = creditKeyword.trim();
        const hitKeyword = (name, cls) => !keyword || `${name}${cls || ""}`.includes(keyword);
        const reviewedStatuses = ["submitted", "teacherReturned", "teacherReturnedToMember", "approved"];
        const unsubmittedStatuses = ["unsubmitted", "returned", "teacherReturnedToMember"];

        const presidentGroup = ["submitted", "pendingTeacher"].includes(myPresidentCredit.status)
          ? "submitted"
          : myPresidentCredit.status === "approved"
          ? "approved"
          : "unsubmitted";

        const showPresident = hitKeyword(president.name, president.class)
          && (creditTabFilter === "all" || creditTabFilter === presidentGroup);

        const visibleMembers = creditRequests.filter((cr) => {
          if (!hitKeyword(cr.studentName, cr.class)) return false;
          if (creditTabFilter === "all") return true;
          if (creditTabFilter === "pending") return cr.status === "pending" || cr.status === "teacherReturned";
          if (creditTabFilter === "submitted") return cr.status === "submitted";
          if (creditTabFilter === "approved") return cr.status === "approved";
          if (creditTabFilter === "unsubmitted") return unsubmittedStatuses.includes(cr.status);
          return true;
        });
        const visibleCount = visibleMembers.length + (showPresident ? 1 : 0);

        const filterCounts = {
          all: totalSeats,
          pending: pendingInitial + pendingRereview,
          submitted: creditRequests.filter((c) => c.status === "submitted").length,
          approved: creditRequests.filter((c) => c.status === "approved").length,
          unsubmitted: creditRequests.filter((c) => unsubmittedStatuses.includes(c.status)).length,
        };

        const openPresidentModal = (viewOnly) => {
          setPresidentSummaryInput(myPresidentCredit.summary || "");
          setPresidentDeclaredHoursInput(myPresidentCredit.declaredHours || 15);
          setPresidentViewOnly(viewOnly);
          setShowPresidentCreditModal(true);
        };

        // 社长本人一行的展示态：申报入口 / 待教师审核 / 教师退回 / 已认定
        const presidentView = (() => {
          const st = myPresidentCredit.status;
          const hours = myPresidentCredit.declaredHours || 15;
          const viewLink = (
            <button type="button" className="cdk-link" onClick={() => openPresidentModal(true)}>查看详情</button>
          );
          if (st === "approved") {
            return {
              tone: "approved",
              label: `${Number((Number(hours) / 6).toFixed(1))} 学分`,
              hours,
              teacherHours: hours,
              info: null,
              action: viewLink,
            };
          }
          if (st === "submitted" || st === "pendingTeacher") {
            return {
              tone: "wait",
              label: "待教师审核",
              hours,
              teacherHours: "—",
              info: null,
              action: (
                <div className="cdk-actions">
                  <button
                    type="button"
                    className="cdk-link is-warn"
                    disabled={isArchived}
                    onClick={() => setPresidentWithdrawConfirm(true)}
                  >
                    撤回
                  </button>
                  {viewLink}
                </div>
              ),
            };
          }
          if (st === "returned") {
            return {
              tone: "returned",
              label: "教师退回修改",
              hours,
              teacherHours: "—",
              info: `【教师退回意见】${myPresidentCredit.returnReason || "教师已退回本次申请，请补充后重新提交。"}`,
              action: (
                <button type="button" className="cdk-apply" disabled={isArchived} onClick={() => openPresidentModal(false)}>
                  <NotePencil size={12} /> 立即申请
                </button>
              ),
            };
          }
          return {
            tone: "idle",
            label: "未申请",
            hours: "—",
            teacherHours: "—",
            info: null,
            action: (
              <button type="button" className="cdk-apply" disabled={isArchived} onClick={() => openPresidentModal(false)}>
                <NotePencil size={12} /> 立即申请
              </button>
            ),
          };
        })();

        // 成员一行的认定态与操作入口（弹窗沿用既有的学分审核工作台）
        const memberView = (cr) => {
          const viewLink = (
            <button type="button" className="cdk-link" onClick={() => handleOpenReview(cr)}>查看详情</button>
          );
          if (cr.status === "pending") {
            return {
              tone: "mine",
              label: "待我初审",
              info: null,
              action: (
                <button type="button" className="cdk-link is-primary" disabled={isArchived} onClick={() => handleOpenReview(cr)}>审核</button>
              ),
            };
          }
          if (cr.status === "teacherReturned") {
            return {
              tone: "mine",
              label: "待我重审",
              info: `【教师退回意见】${cr.teacherReturnReason || "教师退回了本次审核结果，请重新核定。"}`,
              action: (
                <button type="button" className="cdk-link is-primary" disabled={isArchived} onClick={() => handleOpenReview(cr)}>重新审核</button>
              ),
            };
          }
          if (cr.status === "submitted") {
            return {
              tone: "wait",
              label: "待教师审核",
              info: null,
              action: (
                <div className="cdk-actions">
                  <button
                    type="button"
                    className="cdk-link is-warn"
                    disabled={isArchived}
                    onClick={() => setRecallConfirmRecord(cr)}
                  >
                    撤回
                  </button>
                  {viewLink}
                </div>
              ),
            };
          }
          if (cr.status === "returned") {
            return {
              tone: "returned",
              label: "社长退回修改",
              info: `【社长退回意见】${(cr.leaderComment || "").replace(/^社长退回意见：/, "") || "已退回成员修改，请通知成员重新提交。"}`,
              action: viewLink,
            };
          }
          if (cr.status === "teacherReturnedToMember") {
            return {
              tone: "returned",
              label: "教师退回修改",
              info: `【教师退回意见】${cr.teacherReturnReason || "教师已退回成员修改。"}`,
              action: viewLink,
            };
          }
          if (cr.status === "approved") {
            const credits = cr.teacherApproval ? cr.teacherApproval.credits : null;
            return {
              tone: "approved",
              label: credits != null ? `${Number(credits)} 学分` : "—",
              info: null,
              action: viewLink,
            };
          }
          return { tone: "idle", label: "未申请", info: null, action: <span className="cdk-muted">—</span> };
        };

        // 「去处理」= 审核入口：直接打开下一个待处理申请的审核工作台
        const handleGoProcess = () => {
          const next = creditRequests.find((c) => c.status === "pending")
            || creditRequests.find((c) => c.status === "teacherReturned");
          if (next) handleOpenReview(next);
        };

        // 退回意见气泡：深色卡片，hover / focus 时展开
        const renderCreditState = (view) => (
          <span className={`cdk-state tone-${view.tone}`}>
            <i className="cdk-dot" />
            <span className="cdk-state-label">{view.label}</span>
            {view.info && (
              <span className="cdk-info" tabIndex={0}>
                <Info size={12} />
                <span className="cdk-info-tip" role="tooltip">{view.info}</span>
              </span>
            )}
          </span>
        );

        return (
          <div className="manage-tab-content cdk-page">
            {pendingCreditsCount > 0 && (
              <div className="cdk-alert">
                <span className="cdk-alert-icon"><WarningCircle size={17} weight="fill" /></span>
                <span className="cdk-alert-text">
                  有 <strong>{pendingCreditsCount}</strong> 份学分申请待你审核（
                  {pendingInitial > 0 ? `${pendingInitial}人待初审` : ""}
                  {pendingInitial > 0 && pendingRereview > 0 ? " · " : ""}
                  {pendingRereview > 0 ? `${pendingRereview}人待重审` : ""}
                  ）
                </span>
                <button type="button" className="cdk-alert-btn" disabled={isArchived} onClick={handleGoProcess}>
                  <Sparkle size={13} weight="fill" /> 去处理（{pendingCreditsCount}）
                </button>
              </div>
            )}

            <div className="cdk-toolbar">
              <div className="cdk-search">
                <MagnifyingGlass size={15} />
                <input
                  type="text"
                  value={creditKeyword}
                  onChange={(event) => setCreditKeyword(event.target.value)}
                  placeholder="搜索成员姓名、班级"
                />
                {creditKeyword && (
                  <button type="button" className="cdk-search-clear" onClick={() => setCreditKeyword("")} aria-label="清空搜索">×</button>
                )}
              </div>
              <select
                className="cdk-select"
                value={creditTabFilter}
                onChange={(event) => setCreditTabFilter(event.target.value)}
                aria-label="筛选学分认定状态"
              >
                <option value="all">全部成员（{filterCounts.all}）</option>
                <option value="pending">待我处理（{filterCounts.pending}）</option>
                <option value="submitted">待教师审核（{filterCounts.submitted}）</option>
                <option value="approved">已通过（{filterCounts.approved}）</option>
                <option value="unsubmitted">未申请（{filterCounts.unsubmitted}）</option>
              </select>
            </div>

            <div className="cdk-card">
              <table className="cdk-table">
                <thead>
                  <tr>
                    <th className="cdk-col-member">成员</th>
                    <th className="cdk-col-perf">活动参与与表现</th>
                    <th className="cdk-col-num">申报学时<span className="cdk-th-unit">小时</span></th>
                    <th className="cdk-col-num">社长核定<span className="cdk-th-unit">小时</span></th>
                    <th className="cdk-col-num">教师核定<span className="cdk-th-unit">小时</span></th>
                    <th className="cdk-col-credit">认定学分</th>
                    <th className="cdk-col-action">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {showPresident && (
                    <tr className="cdk-row">
                      <td>
                        <div className="cdk-member">
                          <div className="cdk-name-line">
                            <strong>{president.name}</strong>
                            <span className="cdk-role-pill"><Crown size={10} weight="fill" /> 社长</span>
                          </div>
                          <span className="cdk-class">{president.class}</span>
                        </div>
                      </td>
                      <td>
                        <div className="cdk-perf">
                          <span className="cdk-perf-main">组织 {activities.length}场 · 9.5h</span>
                          <span className="cdk-perf-sub">点名 {attendedDone}/{activities.length} · 记录 {recordedDone}/{activities.length}</span>
                        </div>
                      </td>
                      <td className="cdk-num">{presidentView.hours}</td>
                      <td className="cdk-num">—</td>
                      <td className="cdk-num">{presidentView.teacherHours}</td>
                      <td>{renderCreditState(presidentView)}</td>
                      <td className="cdk-action-cell">{presidentView.action}</td>
                    </tr>
                  )}

                  {visibleMembers.map((cr) => {
                    const view = memberView(cr);
                    const isFullAttendance = cr.attendedCount >= activities.length;
                    const leaderHours = reviewedStatuses.includes(cr.status) && cr.reviewedHours != null ? cr.reviewedHours : "—";
                    return (
                      <tr key={cr.id} className="cdk-row">
                        <td>
                          <div className="cdk-member">
                            <div className="cdk-name-line"><strong>{cr.studentName}</strong></div>
                            <span className="cdk-class">{cr.class}</span>
                          </div>
                        </td>
                        <td>
                          <div className="cdk-perf">
                            <span className="cdk-perf-main">
                              {cr.attendedCount}场 · {cr.systemHours}h
                              {isFullAttendance && <em className="cdk-full">全勤</em>}
                            </span>
                            <span className="cdk-perf-sub">
                              {cr.discussionsCount > 0 ? `${cr.discussionsCount}次分享` : "暂无分享"}
                              {cr.featuredCount > 0 && (
                                <em className="cdk-star"><Star size={9} weight="fill" />{cr.featuredCount}</em>
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="cdk-num">{cr.declaredHours != null ? cr.declaredHours : "—"}</td>
                        <td className="cdk-num">{leaderHours}</td>
                        <td className="cdk-num">{cr.teacherApproval ? cr.teacherApproval.approvedHours : "—"}</td>
                        <td>{renderCreditState(view)}</td>
                        <td className="cdk-action-cell">{view.action}</td>
                      </tr>
                    );
                  })}

                  {visibleCount === 0 && (
                    <tr>
                      <td colSpan={7} className="cdk-empty">暂无符合条件的成员</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <p className="cdk-foot">共 {totalSeats} 位社团成员（含社长）· 当前显示 {visibleCount} 位</p>
          </div>
        );
      })()}

    </>
  );



  if (discussionActivity) {
    return (
      <PatchManageMomentPage
        club={club}
        activity={activities.find((a) => a.id === discussionActivity.id) || discussionActivity}
        isArchived={isArchived}
        onBack={() => setDiscussionActivity(null)}
      />
    );
  }

  return (
    <div className="manage-page-body">
      {/* 历史学期归档警示条 */}
      {isArchived && (
        <div className="term-archive-banner">
          <div>
            <strong>📌 历史学期归档提示：</strong>
            <span>您当前正在查阅「{term}」的历史档案。该学期社团已结项归档，所有成员名册与活动出勤记录为客观历史事实，呈只读状态。</span>
          </div>
          <span className="badge-pill">历史归档</span>
        </div>
      )}

      {/* 生命周期状态演示切换工具条（方便体验与汇报演示） */}
      <div className="lifecycle-demo-bar">
        <div className="demo-bar-title">
          <span className="demo-sparkle">⚙️</span>
          <strong>生命周期审核演示：</strong>
          <span className="demo-hint">（点击快速切换审核状态，验证社长工作台感知与闭环交互）</span>
        </div>
        <div className="demo-chip-group">
          {[
            { key: "none", label: "🟢 正常运行", hint: "未发起任何申请" },
            { key: "renew_pending", label: "🟡 延续 · 待审核", hint: "社长已提交延续申请，等待教师审批" },
            { key: "renew_returned", label: "🔴 延续 · 教师退回", hint: "教师退回并附带修改意见" },
            { key: "renew_approved", label: "🔵 延续 · 教师通过", hint: "下学期社团关联已建立" },
            { key: "end_pending", label: "🟡 提前结束 · 待审核", hint: "社长已提交提前结束，等待审批" },
            { key: "end_returned", label: "🔴 提前结束 · 教师退回", hint: "教师退回并要求补齐材料" },
            { key: "end_approved", label: "⚫ 提前结束 · 教师通过", hint: "社团冻结并结项归档" },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              className={`demo-chip-btn ${lifecycleStatus === item.key ? "active" : ""}`}
              onClick={() => {
                setStatus(item.key);
                onNotify(`已切换生命周期演示状态为：「${item.label}」`);
              }}
              title={item.hint}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 生命周期顶部通告条 */}
      {lifecycleStatus === "renew_pending" && (
        <div className="lifecycle-banner banner-info">
          <div className="lifecycle-banner-content">
            <span style={{ fontSize: "16px" }}>ℹ️</span>
            <div>
              <strong>延续申请审批中：</strong>
              <span>你已于 {currentLifecycle.renewData?.submittedAt} 提交延续到「{currentLifecycle.renewData?.targetTerm}」的申请，正在等待负责教师审批确认。审批期间社团日常运行不受影响。</span>
            </div>
          </div>
          <div className="lifecycle-banner-actions">
            <button type="button" className="banner-action-btn secondary" onClick={() => setLifecycleDetailModal({ type: "renew" })}>查看申请</button>
            <button type="button" className="banner-action-btn secondary" onClick={() => handleWithdrawApplication("renew")}>撤回申请</button>
          </div>
        </div>
      )}

      {lifecycleStatus === "renew_returned" && (
        <div className="lifecycle-banner banner-warning">
          <div className="lifecycle-banner-content">
            <span style={{ fontSize: "16px" }}>⚠️</span>
            <div>
              <strong style={{ color: "#9a3412" }}>延续申请已被负责教师退回！</strong>
              <span>退回原因：“{currentLifecycle.renewData?.teacherReturnReason}”（{currentLifecycle.renewData?.returnedAt}）</span>
            </div>
          </div>
          <div className="lifecycle-banner-actions">
            <button type="button" className="banner-action-btn primary" onClick={handleReapplyRenew}>重新申请</button>
          </div>
        </div>
      )}

      {lifecycleStatus === "renew_approved" && (
        <div className="lifecycle-banner banner-success">
          <div className="lifecycle-banner-content">
            <span style={{ fontSize: "16px" }}>🎉</span>
            <div>
              <strong>延续申请已通过负责教师审核！</strong>
              <span>已成功建立「{currentLifecycle.renewData?.targetTerm}」新社团档案（保留 {currentLifecycle.renewData?.retainedMemberIds?.length || 26} 名老成员），可在学期切换器中查看或进入下学期招新准备。</span>
            </div>
          </div>
          <div className="lifecycle-banner-actions">
            <button type="button" className="banner-action-btn secondary" onClick={() => setLifecycleDetailModal({ type: "renew" })}>查看结果</button>
          </div>
        </div>
      )}

      {lifecycleStatus === "end_pending" && (
        <div className="lifecycle-banner banner-info">
          <div className="lifecycle-banner-content">
            <span style={{ fontSize: "16px" }}>ℹ️</span>
            <div>
              <strong>提前结束申请审批中：</strong>
              <span>你已于 {currentLifecycle.endData?.submittedAt} 提交提前结束本社团本学期运行的申请，正在等待负责教师审批。在教师确认前，当前社团活动与名册正常保持。</span>
            </div>
          </div>
          <div className="lifecycle-banner-actions">
            <button type="button" className="banner-action-btn secondary" onClick={() => setLifecycleDetailModal({ type: "end" })}>查看申请</button>
            <button type="button" className="banner-action-btn secondary" onClick={() => handleWithdrawApplication("end")}>撤回申请</button>
          </div>
        </div>
      )}

      {lifecycleStatus === "end_returned" && (
        <div className="lifecycle-banner banner-warning">
          <div className="lifecycle-banner-content">
            <span style={{ fontSize: "16px" }}>⚠️</span>
            <div>
              <strong style={{ color: "#9a3412" }}>提前结束申请已被负责教师退回！</strong>
              <span>退回原因：“{currentLifecycle.endData?.teacherReturnReason}”（{currentLifecycle.endData?.returnedAt}）</span>
            </div>
          </div>
          <div className="lifecycle-banner-actions">
            <button type="button" className="banner-action-btn primary" onClick={handleReapplyEnd}>重新申请</button>
          </div>
        </div>
      )}

      {lifecycleStatus === "end_approved" && (
        <div className="lifecycle-banner banner-archived">
          <div className="lifecycle-banner-content">
            <span style={{ fontSize: "16px" }}>📌</span>
            <div>
              <strong>本社团已于 {currentLifecycle.endData?.approvedAt} 经负责教师审核批准提前结束本学期运行。</strong>
              <span>所有成员名册与常规活动记录均已客观归档，日常发布已冻结。已沉淀事实正常用于学分认定。</span>
            </div>
          </div>
          <div className="lifecycle-banner-actions">
            <button type="button" className="banner-action-btn secondary" onClick={() => setLifecycleDetailModal({ type: "end" })}>查看结果</button>
          </div>
        </div>
      )}

      {/* 左右双列分栏工作台 */}
      <div className="manage-split-layout">
        {/* 左侧固定名片与快捷动作面板 */}
        <aside className="manage-split-left">
          <div className="split-sidebar-card">
            {/* 社团名称与下拉切换器（放在最上方，先确定操作上下文） */}
            <div className="split-title-row">
              <div className="club-dropdown-container">
                <button
                  type="button"
                  className="club-sidebar-title-btn"
                  onClick={() => setShowClubSwitcher((prev) => !prev)}
                >
                  <h2>{club.name}</h2>
                  <CaretDown size={15} weight="bold" />
                </button>
                {showClubSwitcher && (
                  <div className="club-dropdown-menu">
                    <div className="club-dropdown-header">切换我管理的社团（共 {clubs.length} 个）</div>
                    {clubs.map((c) => (
                      <div
                        key={c.id}
                        className={`club-dropdown-item ${c.id === club.id ? "active" : ""}`}
                        onClick={() => {
                          if (onSelectClub) onSelectClub(c.id);
                          setShowClubSwitcher(false);
                        }}
                      >
                        <div className="club-dropdown-item-left">
                          <strong>{c.name}</strong>
                          <span className="club-dropdown-tag">{c.category}</span>
                        </div>
                        <div className="club-dropdown-badges">
                          {c.pendingApplicants > 0 && (
                            <span className="badge-pill blue">{c.pendingApplicants} 申请待审</span>
                          )}
                          {c.pendingCredits > 0 && (
                            <span className="badge-pill green">{c.pendingCredits} 学分待审</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="split-title-badges">
                <span className="category-tag">{club.category}</span>
                {lifecycleStatus === "end_approved" ? (
                  <span className="status-badge" style={{ background: "#f1f5f9", color: "#64748b" }}>
                    <i className="badge-dot" style={{ background: "#94a3b8" }} /> 已提前结束
                  </span>
                ) : (
                  <span className="status-badge passed">
                    <i className="badge-dot" /> 进行中
                  </span>
                )}
              </div>
            </div>

            {/* 社团封面展示在社团标题和状态下方 */}
            <div className={`split-cover-img ${club.cover || "football"}`} />

            {/* 容量进度条块（点击可快速切换至名册） */}
            <div
              className="capacity-summary-card"
              onClick={() => onTab("members")}
              title="点击查看正式成员名册"
            >
              <div className="capacity-label-row">
                <span>正式成员</span>
                <strong>{members.length} / {club.capacity} 人</strong>
              </div>
              <div className="capacity-track">
                <div
                  className="capacity-fill"
                  style={{ width: `${Math.min(100, Math.round((members.length / club.capacity) * 100))}%` }}
                />
              </div>
            </div>

            {/* 真实属性列表（无指导教师、无假频次） */}
            <div className="split-meta-list">
              <div><span>社长姓名</span><strong>{club.captain}</strong></div>
              <div><span>常规场地</span><strong>{club.venue}</strong></div>
              <div><span>累计活动</span><strong>{activities.length} 场活动</strong></div>
            </div>

            {/* 核心操作区域（三个按钮常驻显示，不可用时置灰并在悬停时说明原因） */}
            <div className="split-actions-block">
              <button
                type="button"
                className="btn-primary-block"
                disabled={isArchived || lifecycleStatus === "end_approved"}
                title={isArchived ? "历史学期已归档，不可发布活动" : lifecycleStatus === "end_approved" ? "社团已提前结束，活动发布已冻结" : undefined}
                onClick={() => setShowPublishModal(true)}
              >
                ＋ 发布新活动
              </button>

              <button
                type="button"
                className="btn-outline-block"
                disabled={Boolean(renewDisabledReason)}
                title={renewDisabledReason}
                onClick={openRenewModal}
              >
                申请延续到下学期
              </button>
              <button
                type="button"
                className="sidebar-danger-link"
                disabled={Boolean(endDisabledReason)}
                title={endDisabledReason}
                onClick={() => setShowEndModal(true)}
              >
                申请提前结束
              </button>
            </div>
          </div>
        </aside>

        {/* 右侧核心任务工作区 */}
        <main className="manage-split-right">
          <section className="president-tabs-panel">
            <Tabs items={tabItems} active={currentTab} onChange={onTab} />
            {renderTabContent()}
          </section>
        </main>
      </div>

      {reviewingApplicant && (
        <ApplicantReviewDialog
          applicant={reviewingApplicant}
          applicants={applicants}
          club={club}
          memberCount={members.length}
          isArchived={isArchived}
          onSelectApplicant={setReviewingApplicant}
          onClose={() => setReviewingApplicant(null)}
          onApprove={handleApproveApplicant}
          onReject={handleRejectApplicant}
        />
      )}

      {showApplicationHistory && (
        <ApplicationHistoryDialog
          records={applicationHistory}
          filter={applicationHistoryFilter}
          onFilter={setApplicationHistoryFilter}
          onClose={() => setShowApplicationHistory(false)}
        />
      )}

      {/* 发布新活动弹窗 */}
      {showPublishModal && (
        <PublishActivityModal
          club={club}
          isDoc={isDoc}
          isArchived={isArchived}
          memberCount={members.length}
          onClose={() => setShowPublishModal(false)}
          onPublish={(newSessions, notificationMsg) => {
            setActivities((prev) => [...newSessions, ...prev]);
            setShowPublishModal(false);
            onNotify(notificationMsg);
          }}
        />
      )}

      {/* 提前结束社团申请弹窗 */}
      {showEndModal && (
        <div className="dialog-backdrop" onClick={() => setShowEndModal(false)}>
          <div className="dialog president-dialog end-club-dialog" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="dialog-close" onClick={() => setShowEndModal(false)}>✕</button>
            <h2>申请提前结束</h2>
            <p>提前结束不会删除已经发生的成员记录、活动记录与出勤事实；已参与的事实仍可正常用于学分认定。</p>
            <form onSubmit={handleEndClubSubmit}>
              <label>
                <span>申请说明 *</span>
                <textarea
                  required
                  placeholder="说明无法继续开展活动的原因，如场地改造、骨干成员时间冲突等。"
                  value={endReason}
                  onChange={(e) => setEndReason(e.target.value)}
                />
              </label>
              <div className="dialog-actions">
                <button type="button" className="secondary" onClick={() => setShowEndModal(false)}>取消</button>
                <button type="submit" className="danger-button">提交申请</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 申请延续到下学期弹窗 */}
      {showRenewModal && (
        <div className="dialog-backdrop" onClick={() => setShowRenewModal(false)}>
          <div className="dialog president-dialog renew-club-dialog" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="dialog-close" onClick={() => setShowRenewModal(false)}>✕</button>
            <h2>申请延续到下学期</h2>
            <p>延续后将新建「{club.name}」下一学期的记录，本学期数据全部保留，提交后由教师审核。</p>
            <form onSubmit={handleRenewClubSubmit} className="modal-form-grid">
              <div className="modal-two-cols">
                <label>
                  <span>延续目标学期</span>
                  <input type="text" disabled value={renewTargetTerm} />
                </label>
                <label>
                  <span>下学期计划人数上限 *</span>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    required
                    value={renewCapacity}
                    onChange={(e) => setRenewCapacity(e.target.value)}
                  />
                </label>
              </div>

              <section className="renew-leader-card" aria-label="下学期社长">
                <div>
                  <span>下一学期社长</span>
                  <strong>{club.captain}</strong>
                </div>
                <small>社长沿用本人。</small>
              </section>

              <section className="renew-members-section" aria-labelledby="renew-members-title">
                <div className="renew-section-heading">
                  <div>
                    <span id="renew-members-title">保留成员</span>
                    <small>默认带入当前有效成员，可按实际情况选择。</small>
                  </div>
                  <strong>已选 {renewMemberIds.length} 人</strong>
                </div>
                <div className="renew-member-list">
                  {members.map((member) => {
                    const isLeader = member.role === "社长";
                    const selected = renewMemberIds.includes(member.id);
                    return (
                      <label key={member.id} className={`renew-member-option${isLeader ? " is-leader" : ""}`}>
                        <input
                          type="checkbox"
                          checked={selected}
                          disabled={isLeader}
                          onChange={() => toggleRenewMember(member)}
                        />
                        <span className="renew-member-name">{member.name}</span>
                        <span className="renew-member-meta">{member.class} · {member.role}</span>
                        {isLeader && <em>须保留</em>}
                      </label>
                    );
                  })}
                </div>
                <p className="renew-inline-tip">毕业、离校等失效成员不会带入；教师确认时可调整成员。</p>
              </section>

              <section className="renew-recruiting-section" aria-labelledby="renew-recruiting-title">
                <div>
                  <span id="renew-recruiting-title">下一学期是否继续招新</span>
                  <small>{renewRecruiting ? `拟保留 ${renewMemberIds.length} 人，剩余名额可用于招新。` : "不开放新的入团申请。"}</small>
                </div>
                <div className="renew-choice-group" aria-label="是否继续招新">
                  <button
                    type="button"
                    className={renewRecruiting ? "selected" : ""}
                    aria-pressed={renewRecruiting}
                    onClick={() => setRenewRecruiting(true)}
                  >
                    继续招新
                  </button>
                  <button
                    type="button"
                    className={!renewRecruiting ? "selected" : ""}
                    aria-pressed={!renewRecruiting}
                    onClick={() => setRenewRecruiting(false)}
                  >
                    暂不招新
                  </button>
                </div>
              </section>

              <button
                type="button"
                className="renew-update-button"
                onClick={handleOpenRenewalDetails}
              >
                更新下一学期社团资料
                <ArrowRight size={15} weight="bold" />
              </button>
              <div className="dialog-actions">
                <button type="button" className="secondary" onClick={() => setShowRenewModal(false)}>取消</button>
                <button type="submit" className="primary">提交申请</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 考勤点名独立弹窗 */}
      {attendanceModalActivity && (
        <AttendanceModal
          activity={attendanceModalActivity}
          members={members}
          isArchived={isArchived}
          onClose={() => setAttendanceModalActivity(null)}
          onSave={updateActivity}
        />
      )}

      {/* 填写活动记录独立弹窗 */}
      {recordModalActivity && (
        <RecordModal
          activity={recordModalActivity}
          isArchived={isArchived}
          onClose={() => setRecordModalActivity(null)}
          onSave={updateActivity}
        />
      )}

      {/* 编辑活动信息独立弹窗 */}
      {editModalActivity && (
        <EditActivityModal
          activity={editModalActivity}
          onClose={() => setEditModalActivity(null)}
          onSave={(updated) => updateActivity(updated, `已成功保存对活动「${updated.title}」的修改`)}
        />
      )}

      {/* 智能删除活动确认弹窗 */}
      {deleteModalActivity && (
        <DeleteActivityModal
          activity={deleteModalActivity}
          onClose={() => setDeleteModalActivity(null)}
          onConfirm={handleDeleteActivityConfirm}
          onSwitchToEdit={(act) => setEditModalActivity(act)}
        />
      )}

      {/* 单场活动详情抽屉（Drawer）：一体化流式阅读，客观沉淀与研讨留痕 */}
      {activityWorkbench && (
        <ActivityDrawer
          activity={activityWorkbench}
          club={club}
          members={members}
          isArchived={isArchived}
          config={activityConfig}
          onClose={() => setActivityWorkbench(null)}
          onOpenAttendance={(act) => setAttendanceModalActivity(act)}
          onOpenRecord={(act) => setRecordModalActivity(act)}
          onOpenEdit={(act) => setEditModalActivity(act)}
          onOpenDelete={(act) => setDeleteModalActivity(act)}
          onOpenDiscussion={(act) => {
            setActivityWorkbench(null);
            setDiscussionActivity(act);
          }}
        />
      )}

      {/* 成员学分申报审核/查看工作台 */}
      {reviewingCreditRecord && (() => {
        const pendingQueue = creditRequests.filter((c) => c.status === "pending" || c.status === "teacherReturned");
        const currentIndexInQueue = pendingQueue.findIndex((c) => c.id === reviewingCreditRecord.id);
        const queueIndex = currentIndexInQueue >= 0 ? currentIndexInQueue + 1 : 1;
        const queueTotal = Math.max(pendingQueue.length, 1);

        return (
          <CreditReviewWorkbench
            record={reviewingCreditRecord}
            activityCount={activities.length}
            reviewedHours={modalReviewedHours}
            leaderComment={modalLeaderComment}
            isArchived={isArchived}
            queueIndex={queueIndex}
            queueTotal={queueTotal}
            onHours={setModalReviewedHours}
            onComment={setModalLeaderComment}
            onClose={() => setReviewingCreditRecord(null)}
            onApprove={handleConfirmReview}
            onRecall={() => setRecallConfirmRecord(reviewingCreditRecord)}
            onReturn={() => handleOpenReturnModal(reviewingCreditRecord)}
            onNotify={onNotify}
          />
        );
      })()}

      {/* 社团学分：撤回审核结果二次确认（与成员端撤回文案一致，简洁版） */}
      {recallConfirmRecord && (
        <div
          className="dialog-backdrop"
          role="presentation"
          onClick={() => setRecallConfirmRecord(null)}
          style={{ zIndex: 1150 }}
        >
          <section
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-label="撤回审核结果"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="dialog-close"
              onClick={() => setRecallConfirmRecord(null)}
              aria-label="关闭"
            >
              ×
            </button>
            <span className="eyebrow">撤回审核结果</span>
            <h2>{recallConfirmRecord.studentName}</h2>
            <p>撤回后本次审核结果作废，申请将回到「待社长审核」，需重新审核并报送教师。</p>
            <div className="dialog-actions">
              <button type="button" className="secondary" onClick={() => setRecallConfirmRecord(null)}>
                取消
              </button>
              <button
                type="button"
                className="primary danger"
                onClick={() => {
                  handleRecallReview(recallConfirmRecord);
                  setRecallConfirmRecord(null);
                }}
              >
                确认撤回
              </button>
            </div>
          </section>
        </div>
      )}

      {/* 独立弹窗：退回成员申报修改 */}
      {returnCreditModalRecord && (
        <div className="dialog-backdrop" onClick={() => setReturnCreditModalRecord(null)} style={{ zIndex: 1100 }}>
          <div className="dialog credit-return-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="dialog-close"
              onClick={() => setReturnCreditModalRecord(null)}
              aria-label="关闭"
            >
              ×
            </button>
            <span className="eyebrow" style={{ color: "#dc2626" }}>退回修改</span>
            <h2 style={{ fontSize: "16px", margin: "4px 0 8px 0", color: "#0f172a" }}>
              退回「{returnCreditModalRecord.studentName}」的学分申请？
            </h2>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 14px 0", lineHeight: 1.5 }}>
              退回后，申请记录将回到“未提交”状态。成员可查看退回原因并补充修改申请内容，修改后可重新提交给社长审核。
            </p>

            <div className="return-dialog-body">
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                退回原因（必填）：
              </label>
              <div className="quick-tags-row">
                <span
                  className="quick-reason-chip"
                  onClick={() => setReturnReasonText("课外贡献缺少证明材料，请补充附件后重新提交。")}
                >
                  + 课外贡献缺少证明
                </span>
                <span
                  className="quick-reason-chip"
                  onClick={() => setReturnReasonText("申请学时与系统记录时长不符，请核对后修改。")}
                >
                  + 申请学时与记录时长不符
                </span>
                <span
                  className="quick-reason-chip"
                  onClick={() => setReturnReasonText("请补充具体的学期成长收获与体会。")}
                >
                  + 请补充心得体会
                </span>
              </div>
              <textarea
                value={returnReasonText}
                onChange={(e) => setReturnReasonText(e.target.value)}
                placeholder="请明确写明退回原因，以便同学针对性修改..."
                rows={3}
                className="modal-textarea return-textarea"
                autoFocus
              />
            </div>

            <div className="dialog-actions" style={{ marginTop: 16 }}>
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  setReturnCreditModalRecord(null);
                  setReturnReasonText("");
                }}
              >
                取消
              </button>
              <button
                type="button"
                className="danger-button"
                onClick={handleExecuteReturnToStudent}
              >
                确认退回给成员
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 社长本人学分申报工作台 */}
      {showPresidentCreditModal && (
        <PresidentCreditWorkbench
          record={myPresidentCredit}
          activities={activities}
          memberCount={members.length}
          isArchived={isArchived}
          summary={presidentSummaryInput}
          declaredHours={presidentDeclaredHoursInput}
          onHours={setPresidentDeclaredHoursInput}
          onSummary={setPresidentSummaryInput}
          onClose={() => setShowPresidentCreditModal(false)}
          viewOnly={presidentViewOnly}
          onSubmit={handleSubmitPresidentCredit}
          onRecall={() => setPresidentWithdrawConfirm(true)}
          onNotify={onNotify}
          onSwitchDemoStatus={(newSt) => {
            setPresidentCredits((prev) => ({
              ...prev,
              [club.id]: {
                ...myPresidentCredit,
                status: newSt,
                returnReason: newSt === "returned" ? "实践活动学时佐证说明不够详实，请补充活动秩序册佐证。" : "",
              },
            }));
            setPresidentViewOnly(false);
          }}
        />
      )}

      {/* 社长撤回学分申请：二次确认（与成员端文案、按钮一致） */}
      {presidentWithdrawConfirm && (
        <div className="dialog-backdrop" role="presentation" onClick={() => setPresidentWithdrawConfirm(false)}>
          <section
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-label="撤回修改"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="dialog-close" onClick={() => setPresidentWithdrawConfirm(false)} aria-label="关闭">×</button>
            <span className="eyebrow">撤回修改</span>
            <h2>{club.name}</h2>
            <p>撤回后本次申请作废且无法恢复，认定学分需重新提交申请。</p>
            <div className="dialog-actions">
              <button type="button" className="secondary" onClick={() => setPresidentWithdrawConfirm(false)}>取消</button>
              <button
                type="button"
                className="primary danger"
                onClick={() => {
                  setPresidentCredits((prev) => ({
                    ...prev,
                    [club.id]: {
                      ...myPresidentCredit,
                      status: "withdrawn",
                      withdrawnAt: formatNowDateTime(),
                    },
                  }));
                  setPresidentWithdrawConfirm(false);
                  setShowPresidentCreditModal(false);
                  onNotify(`已撤回「${club.name}」的学分申请，可随时重新提交。`);
                }}
              >
                确认撤回
              </button>
            </div>
          </section>
        </div>
      )}

      {/* 学分折算规则弹窗 */}
      {showCreditRuleModal && (
        <div className="dialog-backdrop" onClick={() => setShowCreditRuleModal(false)}>
          <div className="dialog credit-rule-info-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="dialog-close"
              onClick={() => setShowCreditRuleModal(false)}
            >
              ✕
            </button>
            <h2>社团学分折算规则说明</h2>
            <div className="rule-content-body">
              <div className="rule-badge-card">
                <strong className="card-tag">成员学分规则</strong>
                <p>满 <strong>6 小时</strong> 得 <strong>3 学分</strong>；每超出 1 小时加 <strong>1 学分</strong>；最高封顶 <strong>6 学分</strong>。</p>
              </div>
              <div className="rule-badge-card">
                <strong className="card-tag gold">社长学分规则</strong>
                <p>满 <strong>8 小时</strong> 得 <strong>4 学分</strong>；每超出 1 小时加 <strong>1 学分</strong>；最高封顶 <strong>8 学分</strong>。</p>
              </div>
              <div className="rule-memo">
                <strong>📌 规则说明：</strong>
                <p>学分由学校教务/德育部门在学期初统一配置。期末由成员自主申请、社长依据客观出勤事实与研讨表现进行初审确认，最终报送负责教师进行认定并记入综合素质评价档案。</p>
              </div>
            </div>
            <div className="dialog-actions">
              <button
                type="button"
                className="primary compact"
                onClick={() => setShowCreditRuleModal(false)}
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 延续/提前结束 申请与审批档案详情弹窗 */}
      {lifecycleDetailModal && (
        <div className="dialog-backdrop" onClick={() => setLifecycleDetailModal(null)}>
          <div className="dialog president-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "580px" }}>
            <button type="button" className="dialog-close" onClick={() => setLifecycleDetailModal(null)}>✕</button>
            {lifecycleDetailModal.type === "renew" ? (
              <>
                <h2>延续申请 · 审批档案</h2>
                <div className="drawer-meta-grid" style={{ marginTop: "14px", marginBottom: "14px" }}>
                  <div><span>目标学期</span><strong>{currentLifecycle.renewData?.targetTerm}</strong></div>
                  <div><span>下一学期社长</span><strong>{club.captain}（沿用）</strong></div>
                  <div><span>拟招人数上限</span><strong>{currentLifecycle.renewData?.capacity} 人</strong></div>
                  <div><span>拟保留成员</span><strong>{currentLifecycle.renewData?.retainedMemberIds?.length || 26} 人</strong></div>
                  <div><span>提交时间</span><strong>{currentLifecycle.renewData?.submittedAt}</strong></div>
                  <div>
                    <span>当前审核状态</span>
                    <strong>
                      {lifecycleStatus === "renew_pending" && "🟡 教师审核中"}
                      {lifecycleStatus === "renew_returned" && "🔴 教师退回修改"}
                      {lifecycleStatus === "renew_approved" && "🟢 教师终审通过"}
                    </strong>
                  </div>
                </div>

                <h3 style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", margin: "16px 0 8px 0" }}>审批动态轨迹</h3>
                <div className="lifecycle-timeline">
                  <div className="lifecycle-step step-success">
                    <div className="step-meta">
                      <span className="step-title">社长提交延续申请</span>
                      <span className="step-time">{currentLifecycle.renewData?.submittedAt}</span>
                    </div>
                    <div className="step-content">
                      提交人：本人（社长）
                    </div>
                  </div>

                  {lifecycleStatus === "renew_returned" && (
                    <div className="lifecycle-step step-warning">
                      <div className="step-meta">
                        <span className="step-title" style={{ color: "#c2410c" }}>指导教师退回修改</span>
                        <span className="step-time">{currentLifecycle.renewData?.returnedAt}</span>
                      </div>
                      <div className="step-content" style={{ background: "#fff7ed", borderColor: "#fed7aa" }}>
                        <strong>审核人：负责教师</strong>
                        <p style={{ margin: "4px 0 0 0", color: "#9a3412" }}>
                          退回原因：“{currentLifecycle.renewData?.teacherReturnReason}”
                        </p>
                      </div>
                    </div>
                  )}

                  {lifecycleStatus === "renew_approved" && (
                    <div className="lifecycle-step step-success">
                      <div className="step-meta">
                        <span className="step-title" style={{ color: "#166534" }}>指导教师终审通过</span>
                        <span className="step-time">{currentLifecycle.renewData?.approvedAt}</span>
                      </div>
                      <div className="step-content" style={{ background: "#f0fdf4", borderColor: "#bbf7d0" }}>
                        <strong>审核人：负责教师</strong>
                        <p style={{ margin: "4px 0 0 0", color: "#166534" }}>
                          审核意见：“社团运行良好，出勤与研讨记录真实规范，准予延续至下一学期。”
                        </p>
                      </div>
                    </div>
                  )}

                  {lifecycleStatus === "renew_pending" && (
                    <div className="lifecycle-step step-pending">
                      <div className="step-meta">
                        <span className="step-title" style={{ color: "#2563eb" }}>等待指导教师审批中</span>
                        <span className="step-time">处理中</span>
                      </div>
                      <div className="step-content">
                        负责教师审核后，结果将同步至工作台。
                      </div>
                    </div>
                  )}
                </div>

                <div className="dialog-actions">
                  <button type="button" className="secondary" onClick={() => setLifecycleDetailModal(null)}>关闭</button>
                </div>
              </>
            ) : (
              <>
                <h2>提前结束申请 · 审批档案</h2>
                <div className="drawer-meta-grid" style={{ marginTop: "14px", marginBottom: "14px" }}>
                  <div><span>提交社长</span><strong>{club.captain}</strong></div>
                  <div><span>提交时间</span><strong>{currentLifecycle.endData?.submittedAt}</strong></div>
                  <div>
                    <span>当前审核状态</span>
                    <strong>
                      {lifecycleStatus === "end_pending" && "🟡 教师审核中"}
                      {lifecycleStatus === "end_returned" && "🔴 教师退回修改"}
                      {lifecycleStatus === "end_approved" && "⚫ 教师审核通过（已提前结束）"}
                    </strong>
                  </div>
                </div>

                <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "6px", fontSize: "12px", marginBottom: "14px" }}>
                  <strong style={{ display: "block", color: "#1e293b", marginBottom: "4px" }}>申请说明：</strong>
                  <span style={{ color: "#475569", lineHeight: 1.5 }}>{currentLifecycle.endData?.reason}</span>
                </div>

                <h3 style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", margin: "14px 0 8px 0" }}>审批动态轨迹</h3>
                <div className="lifecycle-timeline">
                  <div className="lifecycle-step step-success">
                    <div className="step-meta">
                      <span className="step-title">社长提交提前结束申请</span>
                      <span className="step-time">{currentLifecycle.endData?.submittedAt}</span>
                    </div>
                    <div className="step-content">
                      提交人：本人（社长）
                    </div>
                  </div>

                  {lifecycleStatus === "end_returned" && (
                    <div className="lifecycle-step step-warning">
                      <div className="step-meta">
                        <span className="step-title" style={{ color: "#c2410c" }}>指导教师退回申请</span>
                        <span className="step-time">{currentLifecycle.endData?.returnedAt}</span>
                      </div>
                      <div className="step-content" style={{ background: "#fff7ed", borderColor: "#fed7aa" }}>
                        <strong>审核人：负责教师</strong>
                        <p style={{ margin: "4px 0 0 0", color: "#9a3412" }}>
                          退回原因：“{currentLifecycle.endData?.teacherReturnReason}”
                        </p>
                      </div>
                    </div>
                  )}

                  {lifecycleStatus === "end_approved" && (
                    <div className="lifecycle-step step-success">
                      <div className="step-meta">
                        <span className="step-title" style={{ color: "#475569" }}>指导教师确认提前结束</span>
                        <span className="step-time">{currentLifecycle.endData?.approvedAt}</span>
                      </div>
                      <div className="step-content" style={{ background: "#f1f5f9", borderColor: "#cbd5e1" }}>
                        <strong>审核人：负责教师</strong>
                        <p style={{ margin: "4px 0 0 0", color: "#334155" }}>
                          审核意见：“情况属实，活动与器材归档完整，准予提前结项归档。”
                        </p>
                      </div>
                    </div>
                  )}

                  {lifecycleStatus === "end_pending" && (
                    <div className="lifecycle-step step-pending">
                      <div className="step-meta">
                        <span className="step-title" style={{ color: "#2563eb" }}>等待指导教师审批中</span>
                        <span className="step-time">处理中</span>
                      </div>
                      <div className="step-content">
                        负责教师审核后，社团状态将同步更新。
                      </div>
                    </div>
                  )}
                </div>

                <div className="dialog-actions">
                  <button type="button" className="secondary" onClick={() => setLifecycleDetailModal(null)}>关闭</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 撤回申请确认弹窗 */}
      {withdrawConfirm && (
        <div className="dialog-backdrop" role="presentation" onClick={() => setWithdrawConfirm(null)}>
          <section
            className="dialog confirm-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="撤回申请确认"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="dialog-close" onClick={() => setWithdrawConfirm(null)} aria-label="关闭">×</button>
            <span className="eyebrow">撤回申请</span>
            <h2>撤回{withdrawConfirm === "renew" ? "延续" : "提前结束"}申请？</h2>
            <p>撤回后顶部通报条消失，社团恢复正常运行；撤回前的申请内容保留在审批档案中，可随时重新申请。</p>
            <div className="dialog-actions">
              <button type="button" className="secondary" onClick={() => setWithdrawConfirm(null)}>取消</button>
              <button type="button" className="primary danger" onClick={confirmWithdrawApplication}>确认撤回</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

const PRESET_REJECT_REASONS = [
  "本学期招新名额已满",
  "优先招新高年级/有基础同学",
  "常规活动时间存在冲突",
  "申请说明不够完整，可补充后再次申请",
];

function ApplicantReviewDialog({
  applicant,
  applicants,
  club,
  memberCount,
  isArchived,
  onClose,
  onApprove,
  onReject,
}) {
  const currentIndex = Math.max(0, applicants.findIndex((item) => item.id === applicant.id));
  const remainingSpots = Math.max(0, (Number(club.capacity) || 30) - memberCount);
  const rejectPresetsKey = `applicant-reject-presets-${club.id || "club"}`;
  const [rejectingMode, setRejectingMode] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [quickComments, setQuickComments] = useState(() => {
    try {
      const saved = window.localStorage.getItem(rejectPresetsKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch (e) {}
    return PRESET_REJECT_REASONS;
  });
  const [newCommentDraft, setNewCommentDraft] = useState(null); // null=未在新增；""=新增中

  useEffect(() => {
    try {
      window.localStorage.setItem(rejectPresetsKey, JSON.stringify(quickComments));
    } catch (e) {}
  }, [quickComments, rejectPresetsKey]);

  const handleCommitNewComment = () => {
    const text = (newCommentDraft || "").trim();
    if (text) {
      setQuickComments((prev) => (prev.includes(text) ? prev : [...prev, text]));
    }
    setNewCommentDraft(null);
  };

  const handleRemoveComment = (comment) => {
    setQuickComments((prev) => prev.filter((item) => item !== comment));
  };

  useEffect(() => {
    setRejectingMode(false);
    setRejectReason("");
    setNewCommentDraft(null);
  }, [applicant.id]);

  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <section
        className="dialog applicant-review-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="审核入团申请"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="dialog-close" onClick={onClose} aria-label="关闭">×</button>
        <div className="applicant-review-head">
          <div className="applicant-review-title-row">
            <h2>入团申请审核</h2>
            <span className="applicant-step-pill">
              待审核 {currentIndex + 1} / {applicants.length}
            </span>
          </div>
          <span className="applicant-review-capacity">
            剩余名额 <strong>{remainingSpots}</strong> 人
          </span>
        </div>

        <div className="applicant-review-body">
          <div className="applicant-info-grid">
            <div className="info-item">
              <span className="info-label">申请同学</span>
              <strong className="info-value-name">{applicant.name}</strong>
            </div>
            <div className="info-item">
              <span className="info-label">所在班级</span>
              <span className="info-value">{applicant.class}</span>
            </div>
            <div className="info-item">
              <span className="info-label">联系电话</span>
              <span className="info-value">{applicant.phone || "—"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">申请时间</span>
              <span className="info-value">{applicant.time}</span>
            </div>
          </div>

          <div className="applicant-reason-box">
            <span className="reason-label">申请说明</span>
            <p>{applicant.reason || "暂无填写的理由说明"}</p>
          </div>

          {rejectingMode && (
            <div className="applicant-reject-box">
              <div className="reject-box-header">
                <label htmlFor="reject-reason-input">婉拒说明</label>
              </div>
              <input
                id="reject-reason-input"
                type="text"
                autoFocus
                placeholder="填写婉拒原因，将同步告知申请同学..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
              <div className="quick-comments-block">
                <span className="quick-comments-label">常用婉拒说明</span>
                <div className="quick-comments-list">
                  {quickComments.map((comment) => {
                    const isActive = rejectReason.trim() === comment;
                    return (
                      <div key={comment} className={`quick-comment-row ${isActive ? "is-active" : ""}`}>
                        <button
                          type="button"
                          className="quick-comment-text"
                          onClick={() => setRejectReason(isActive ? "" : comment)}
                        >
                          {comment}
                        </button>
                        <button
                          type="button"
                          className="quick-comment-del"
                          aria-label="删除该常用说明"
                          title="删除该常用说明"
                          onClick={() => handleRemoveComment(comment)}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                  {newCommentDraft !== null && (
                    <div className="quick-comment-row is-active">
                      <input
                        className="quick-comment-input"
                        autoFocus
                        value={newCommentDraft}
                        placeholder="输入婉拒说明，回车保存"
                        onChange={(event) => setNewCommentDraft(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") handleCommitNewComment();
                          if (event.key === "Escape") setNewCommentDraft(null);
                        }}
                        onBlur={handleCommitNewComment}
                      />
                      <button
                        type="button"
                        className="quick-comment-del"
                        aria-label="取消新增"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => setNewCommentDraft(null)}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="quick-comment-add"
                  onClick={() => setNewCommentDraft("")}
                >
                  ＋ 新增常用说明
                </button>
              </div>
            </div>
          )}
        </div>

        <footer className="applicant-review-footer">
          <span className="footer-tip">
            {applicants.length > 1
              ? "处理后将自动切换到下一位"
              : "处理后本批申请审核完毕"}
          </span>
          <div className="applicant-review-actions">
            {rejectingMode ? (
              <>
                <button
                  type="button"
                  className="secondary compact"
                  onClick={() => {
                    setRejectingMode(false);
                    setRejectReason("");
                  }}
                >
                  取消
                </button>
                <button
                  type="button"
                  className="danger-button compact"
                  disabled={isArchived}
                  onClick={() => onReject(applicant, rejectReason)}
                >
                  确认婉拒
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="secondary compact"
                  disabled={isArchived}
                  onClick={() => setRejectingMode(true)}
                >
                  婉拒
                </button>
                <button
                  type="button"
                  className="primary compact"
                  disabled={isArchived}
                  onClick={() => onApprove(applicant)}
                >
                  同意入团
                </button>
              </>
            )}
          </div>
        </footer>
      </section>
    </div>
  );
}

function ApplicationHistoryDialog({ records, filter, onFilter, onClose }) {
  const approvedCount = records.filter((r) => r.status === "approved").length;
  const rejectedCount = records.filter((r) => r.status === "rejected").length;
  const filteredRecords = filter === "all" ? records : records.filter((record) => record.status === filter);

  // 格式化时间：去掉月、日文字，统一表示为标准日期时间（如 2026-09-08 10:24）
  const formatCleanTime = (t) => {
    if (!t) return "—";
    return t.replace(/(\d+)\s*月\s*(\d+)\s*日/, (_, m, d) => `2026-${m.padStart(2, "0")}-${d.padStart(2, "0")}`);
  };

  // 默认按审核时间（或申请时间）倒序排列，最新处理的排在最前
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const timeA = formatCleanTime(a.handledAt || a.submittedAt || "").replace(/\s+/g, "");
    const timeB = formatCleanTime(b.handledAt || b.submittedAt || "").replace(/\s+/g, "");
    return timeB.localeCompare(timeA);
  });

  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <section
        className="dialog application-history-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="入团申请记录"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="dialog-close" onClick={onClose} aria-label="关闭">×</button>
        <header className="application-history-head">
          <div className="application-history-head-text">
            <span className="application-history-badge">只读记录</span>
            <h2>入团申请记录</h2>
            <p>保留已处理的报名事实，便于回顾本学期成员形成过程。</p>
          </div>
          <div className="application-history-filter" role="tablist" aria-label="申请记录筛选">
            <button
              type="button"
              className={filter === "all" ? "active" : ""}
              onClick={() => onFilter("all")}
            >
              全部（{records.length}）
            </button>
            <button
              type="button"
              className={filter === "approved" ? "active" : ""}
              onClick={() => onFilter("approved")}
            >
              已同意（{approvedCount}）
            </button>
            <button
              type="button"
              className={filter === "rejected" ? "active" : ""}
              onClick={() => onFilter("rejected")}
            >
              已婉拒（{rejectedCount}）
            </button>
          </div>
        </header>

        <div className="application-history-table-container">
          <table className="application-history-table">
            <colgroup>
              <col style={{ width: "200px" }} />
              <col style={{ width: "170px" }} />
              <col style={{ width: "120px" }} />
              <col style={{ width: "160px" }} />
              <col style={{ width: "auto" }} />
            </colgroup>
            <thead>
              <tr>
                <th>申请同学</th>
                <th>申请时间</th>
                <th>审核结果</th>
                <th>审核时间</th>
                <th>自荐理由 / 审核说明</th>
              </tr>
            </thead>
            <tbody>
              {sortedRecords.length > 0 ? (
                sortedRecords.map((record) => {
                  const isApproved = record.status === "approved";
                  return (
                    <tr key={record.id}>
                      <td className="applicant-cell">
                        <div className="history-applicant-info">
                          <div className="applicant-primary-line">
                            <strong className="applicant-name" title={record.name}>{record.name}</strong>
                            {record.attempts > 1 && (
                              <span className="attempts-pill" title={`本学期累计提交 ${record.attempts} 次入团申请`}>
                                第 {record.attempts} 次申请
                              </span>
                            )}
                          </div>
                          <span className="applicant-class-text">{record.class}</span>
                        </div>
                      </td>
                      <td className="time-cell">{formatCleanTime(record.submittedAt)}</td>
                      <td className="status-cell">
                        <span className={`status-pill ${isApproved ? "approved" : "rejected"}`}>
                          {isApproved ? "已同意" : "已婉拒"}
                        </span>
                      </td>
                      <td className="time-cell">{formatCleanTime(record.handledAt)}</td>
                      <td className="note-cell">
                        <div className="history-reasons-block">
                          {record.reason && (
                            <div className="student-apply-reason" title={`自荐理由：${record.reason}`}>
                              <span className="reason-inline-tag">自荐理由</span>
                              <span className="reason-text-body">{record.reason}</span>
                            </div>
                          )}
                          {record.note && (
                            <div className="leader-reject-note" title={`婉拒说明：${record.note}`}>
                              <span className="reject-inline-tag">婉拒说明</span>
                              <span className="reject-text-body">{record.note}</span>
                            </div>
                          )}
                          {!record.reason && !record.note && (
                            <span className="muted-dash">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="history-table-empty">
                    当前筛选条件下暂无申请记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="application-history-footer">
          <span className="footer-record-count">仅展示本学期已处理记录 · 共 {sortedRecords.length} 条</span>
          <button type="button" className="application-history-close-btn" onClick={onClose}>关闭</button>
        </footer>
      </section>
    </div>
  );
}

function AuditRail({ approvalHistory = [], changeHistory = [] }) {
  const [activeTab, setActiveTab] = useState("dynamic"); // 'dynamic' | 'change'

  return (
    <aside className="credit-audit-rail">
      <div className="credit-rail-tabs">
        <button
          type="button"
          className={`credit-rail-tab-btn ${activeTab === "dynamic" ? "active" : ""}`}
          onClick={() => setActiveTab("dynamic")}
        >
          审批动态 <span className="tab-badge">{approvalHistory.length}</span>
        </button>
        <button
          type="button"
          className={`credit-rail-tab-btn ${activeTab === "change" ? "active" : ""}`}
          onClick={() => setActiveTab("change")}
        >
          关键变更 <span className="tab-badge">{changeHistory.length}</span>
        </button>
      </div>

      <div className="credit-rail-body">
        {activeTab === "dynamic" ? (
          <div className="audit-timeline-v2">
            {approvalHistory && approvalHistory.length ? (
              approvalHistory.map((item, index) => (
                <div key={`${item.time}-${index}`} className="timeline-node-card">
                  <div className="timeline-node-dot" />
                  <div className="timeline-card-inner">
                    <div className="card-inner-head">
                      <strong>{item.action}</strong>
                      <time>{item.time}</time>
                    </div>
                    <div className="card-inner-sub">
                      <span>{item.actor}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="audit-empty">尚未提交，当前为草稿。</p>
            )}
          </div>
        ) : (
          <div className="audit-changes-v2">
            {changeHistory && changeHistory.length ? (
              changeHistory.map((item, index) => (
                <div key={`${item.time}-${index}`} className="audit-change-card">
                  <strong>{item.field}</strong>
                  <div className="change-values">
                    <del>{item.from || item.before}</del>
                    <ArrowRight size={12} />
                    <ins>{item.to || item.after}</ins>
                  </div>
                  <span className="change-actor">{item.actor} · {item.time}</span>
                </div>
              ))
            ) : (
              <p className="audit-empty">本次申请暂未产生字段调整。</p>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

function CreditReviewWorkbench({
  record,
  activityCount,
  reviewedHours,
  leaderComment,
  isArchived,
  onHours,
  onComment,
  onClose,
  onApprove,
  onRecall,
  onReturn,
  onNotify,
  queueIndex = 1,
  queueTotal = 3,
}) {
  const isSubmitted = record.status === "submitted";
  const isTeacherReturned = record.status === "teacherReturned";
  // 「已退回成员」合并了社长退回与教师退回两种来源，统一只读
  const isReturned = record.status === "returned" || record.status === "teacherReturnedToMember";
  const isApproved = record.status === "approved";
  // 已报送/已退回/已通过的申请一律只读，社长不可再改学时与评语
  const isLocked = isSubmitted || isApproved || isReturned || isArchived;
  const [detailsExpanded, setDetailsExpanded] = useState(true);

  // ---- 退回说明横幅：合并「已退回成员」后，靠首句 + 落款区分是谁退回 ----
  const isTeacherReturnedToMember = record.status === "teacherReturnedToMember";
  const isMemberReturnedByLeader = record.status === "returned";
  const isShowReturnBanner = isTeacherReturned || isTeacherReturnedToMember || isMemberReturnedByLeader;
  const returnBannerActor = (() => {
    if (isTeacherReturned || isTeacherReturnedToMember) {
      const hit = [...(record.approvalHistory || [])]
        .reverse()
        .find((item) => (item.action || "").includes("教师") && (item.action || "").includes("退回"));
      return `退回人：负责教师${hit ? ` · ${hit.time}` : ""}`;
    }
    if (isMemberReturnedByLeader) {
      const hit = [...(record.approvalHistory || [])]
        .reverse()
        .find((item) => (item.action || "").includes("社长") && (item.action || "").includes("退回"));
      return `退回人：赵子易（社长）${hit ? ` · ${hit.time}` : ""}`;
    }
    return "";
  })();
  // 退回原因统一去掉来源前缀（横幅标题已表明是谁退回，正文只留内容）
  const stripReturnPrefix = (text) =>
    (text || "")
      .replace(/^(负责教师?意见|负责老师意见|教师意见|社长退回意见|社长意见)[：:]\s*/, "")
      .trim();
  const returnBannerReason = stripReturnPrefix(
    isTeacherReturned || isTeacherReturnedToMember
      ? record.teacherReturnReason || "申请事实或证明材料不足，请核实后重拟建议学时。"
      : record.leaderComment || "申请内容与系统记录不符，请修改后重新提交。"
  );

  // 审批动态：彻底极简，只写“谁在什么时间干了啥”
  const approvalHistory = record.approvalHistory || [
    {
      action: "提交学分申请",
      actor: `提交人：${record.studentName}（成员）`,
      time: "2026-10-23 19:20",
    },
  ];

  const changeHistory =
    record.changeHistory ||
    (Number(reviewedHours || record.declaredHours || record.systemHours) !== Number(record.declaredHours || record.systemHours)
      ? [
          {
            field: "建议学时",
            from: `${record.declaredHours || record.systemHours} 小时`,
            to: `${reviewedHours} 小时`,
            actor: "社长初审调整",
            time: "刚刚",
          },
        ]
      : []);

  const [quickComments, setQuickComments] = useState([
    "本学期表现积极，予以推荐",
    "出勤全勤，态度认真",
    "训练刻苦，进步明显",
  ]);
  const [newCommentDraft, setNewCommentDraft] = useState(null); // null=未在新增；""=新增中

  const handleCommitNewComment = () => {
    const text = (newCommentDraft || "").trim();
    if (text) {
      setQuickComments((prev) => (prev.includes(text) ? prev : [...prev, text]));
    }
    setNewCommentDraft(null);
  };

  const handleRemoveComment = (comment) => {
    setQuickComments((prev) => prev.filter((item) => item !== comment));
  };

  const isFullAttendance = record.attendedCount >= activityCount;

  return (
    <div className="dialog-backdrop credit-workbench-backdrop" onClick={onClose}>
      <section
        className="credit-workbench"
        role="dialog"
        aria-modal="true"
        aria-label="学分审核"
        onClick={(event) => event.stopPropagation()}
      >
        {/* 顶部页头：纯粹业务标题 + 明确状态标签，人名留在内容区 */}
        <header className="credit-workbench-head">
          <div className="credit-workbench-head-title">
            <span className="workbench-title-tag">学分审核</span>
            <span
              className={`credit-unified-badge ${
                isApproved
                  ? "approved"
                  : isSubmitted
                  ? "submitted"
                  : isTeacherReturned
                  ? "teacherReturned"
                  : isReturned
                  ? "returned"
                  : "pending"
              }`}
            >
              <i className="badge-dot" />
              {isApproved
                ? "已通过"
                : isSubmitted
                ? "待教师审核"
                : isTeacherReturned
                ? `待社长重审 ${queueIndex}/${queueTotal}`
                : isReturned
                ? "已退回成员"
                : `待社长审核 ${queueIndex}/${queueTotal}`}
            </span>
          </div>
          <div className="credit-workbench-head-actions">
            <button type="button" className="dialog-close" onClick={onClose} aria-label="关闭">×</button>
          </div>
        </header>

        <div className="credit-workbench-layout">
          <AuditRail approvalHistory={approvalHistory} changeHistory={changeHistory} />

          <main className="credit-workbench-main">
            {/* 内容区域第一行：突出展示学生姓名、班级、角色标签与提交时间 */}
            <div className="credit-applicant-hero">
              <div className="applicant-hero-left">
                <h3 className="applicant-hero-name">{record.studentName} · {record.class}</h3>
                <span className="applicant-role-tag">成员</span>
              </div>
              <div className="applicant-hero-right">
                <span>提交于 2026-10-23 19:20</span>
              </div>
            </div>

            {/* 退回说明横幅：合并标签后靠首句与落款区分「社长退」与「教师退」 */}
            {isShowReturnBanner && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: 6,
                  padding: "10px 14px",
                  marginBottom: 10,
                  fontSize: 12,
                  color: "#991b1b",
                  lineHeight: 1.5,
                }}
              >
                <strong>
                  {isTeacherReturned ? "⚠️ 教师退回意见（待社长重审）：" : isTeacherReturnedToMember ? "⚠️ 教师退回意见：" : "⚠️ 社长退回意见："}
                </strong>
                <span>{returnBannerReason}</span>
                <span style={{ display: "block", marginTop: 3, fontSize: 11, color: "#b91c1c", opacity: 0.85 }}>
                  {returnBannerActor}
                </span>
              </div>
            )}

            {/* 第一部分：社团参与足迹 */}
            <section className="credit-workbench-section">
              <div className="credit-section-title">
                <h3>社团参与足迹</h3>
              </div>
              <div className="credit-footprint-grid">
                <div className="footprint-stat-card">
                  <div className="stat-main">
                    <strong>{record.attendedCount} 场 · {record.systemHours} 小时</strong>
                  </div>
                  <div className="stat-sub">
                    <span className={`fact-sub ${isFullAttendance ? "text-green" : ""}`}>
                      {isFullAttendance ? "全勤" : `出勤 ${record.attendedCount}/${activityCount} 场`}
                    </span>
                  </div>
                </div>
                <div className="footprint-stat-card">
                  <div className="stat-main">
                    <strong>{record.discussionsCount || 0} 次活动分享</strong>
                  </div>
                  {record.featuredCount > 0 ? (
                    <span className="featured-badge" title="社长在活动分享中评定的精选内容">
                      <Star size={11} weight="fill" /> {record.featuredCount} 次精选
                    </span>
                  ) : (
                    <div className="stat-sub">
                      <span className="featured-empty">暂无精选</span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 第二部分：成员申请内容 */}
            <section className="credit-workbench-section">
              <div className="credit-section-title">
                <h3>成员申请内容</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 600 }}>
                    申请学时：{record.declaredHours || record.systemHours} 小时
                  </span>
                  <button
                    type="button"
                    className="btn-applicant-toggle"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#2563eb",
                      fontSize: 12,
                      cursor: "pointer",
                      padding: "2px 6px",
                      borderRadius: 4,
                    }}
                    onClick={() => setDetailsExpanded((prev) => !prev)}
                  >
                    {detailsExpanded ? "收起详情 ▴" : "展开详情 ▾"}
                  </button>
                </div>
              </div>

              {detailsExpanded && (
                <div
                  className="declaration-custom-fields-body"
                  style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <div className="credit-read-field">
                    <span style={{ display: "block", fontSize: 12, color: "#64748b", marginBottom: 4, fontWeight: 500 }}>
                      收获与体会：
                    </span>
                    <p style={{ margin: 0, fontSize: 13, color: "#334155", lineHeight: 1.6, background: "#f8fafc", padding: "8px 12px", borderRadius: 6, border: "1px solid #edf2f7" }}>
                      {record.studentReason || "本学期按时参加全部 6 场日常训练，技术摸底和体能测试均达标。协助社长组织友谊赛并带领新队员跑位。"}
                    </p>
                  </div>

                  <div className="credit-read-field">
                    <span style={{ display: "block", fontSize: 12, color: "#64748b", marginBottom: 6, fontWeight: 500 }}>
                      证明材料
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {record.attachments && record.attachments.length > 0 ? (
                        record.attachments.map((file) => (
                          <div
                            key={file}
                            className="credit-attachment-tag"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "4px 8px",
                              borderRadius: 4,
                              background: "#f8fafc",
                              border: "1px solid #e2e8f0",
                              fontSize: 12,
                              color: "#475569",
                            }}
                          >
                            <Paperclip size={13} style={{ color: "#94a3b8" }} />
                            <span>{file}</span>
                          </div>
                        ))
                      ) : (
                        <div
                          className="credit-attachment-tag"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "4px 8px",
                            borderRadius: 4,
                            background: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            fontSize: 12,
                            color: "#475569",
                          }}
                        >
                          <Paperclip size={13} style={{ color: "#94a3b8" }} />
                          <span>友谊赛器材搬运签收单.jpg</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* 第三部分：社长审核意见 */}
            <section className="credit-workbench-section decision-section" style={{ borderLeft: "3px solid #2563eb", background: "#fbfdff" }}>
              <div className="credit-section-title">
                <h3>社长初审意见</h3>
                {isApproved && <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>初审记录已归档</span>}
              </div>
              <div className="credit-decision-grid" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#475569", fontWeight: 500 }}>
                  社长建议学时
                  <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ display: "inline-flex", alignItems: "center" }}>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        value={reviewedHours}
                        disabled={isLocked}
                        onChange={(event) => onHours(event.target.value)}
                        style={{
                          width: 86,
                          height: 30,
                          padding: "0 8px",
                          border: "1px solid #cbd5e1",
                          borderRadius: "5px 0 0 5px",
                          fontSize: 13,
                          color: "#1e293b",
                        }}
                      />
                      <em
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          height: 30,
                          padding: "0 8px",
                          border: "1px solid #cbd5e1",
                          borderLeft: 0,
                          borderRadius: "0 5px 5px 0",
                          background: "#f1f5f9",
                          color: "#64748b",
                          fontSize: 12,
                          fontStyle: "normal",
                        }}
                      >
                        小时
                      </em>
                    </div>

                    {/* 精致对比胶囊标签组合 */}
                    {Number(reviewedHours) !== Number(record.declaredHours || record.systemHours) ? (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "2px 8px",
                          borderRadius: 12,
                          background: "#fff7ed",
                          color: "#c2410c",
                          border: "1px solid #fed7aa",
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        已调整 · 原申请 {record.declaredHours || record.systemHours}h / 系统记录 {record.systemHours}h
                      </span>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "2px 8px",
                            borderRadius: 12,
                            background: "#f8fafc",
                            color: "#475569",
                            border: "1px solid #e2e8f0",
                            fontSize: 11,
                            fontWeight: 500,
                          }}
                        >
                          系统记录时长 {record.systemHours} 小时
                        </span>
                      </div>
                    )}
                  </div>
                </label>

                {/* 审核评语：评语文本框在上，快捷评语移到文本框底部 */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>社长评语</span>
                  <textarea
                    rows="3"
                    value={leaderComment}
                    disabled={isLocked}
                    onChange={(event) => onComment(event.target.value)}
                    placeholder="填写对同学本学期参与和表现的初审意见..."
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      resize: "vertical",
                      padding: "8px 10px",
                      border: "1px solid #cbd5e1",
                      borderRadius: 6,
                      fontSize: 13,
                      color: "#1e293b",
                      lineHeight: 1.5,
                      fontFamily: "inherit",
                    }}
                  />
                  {!isLocked && (
                    <div className="quick-comments-block">
                      <span className="quick-comments-label">常用评语</span>
                      <div className="quick-comments-list">
                        {quickComments.map((comment) => {
                          const isActive = leaderComment.trim() === comment;
                          return (
                            <div key={comment} className={`quick-comment-row ${isActive ? "is-active" : ""}`}>
                              <button
                                type="button"
                                className="quick-comment-text"
                                onClick={() => onComment(comment)}
                              >
                                {comment}
                              </button>
                              <button
                                type="button"
                                className="quick-comment-del"
                                aria-label="删除该常用评语"
                                title="删除该常用评语"
                                onClick={() => handleRemoveComment(comment)}
                              >
                                ×
                              </button>
                            </div>
                          );
                        })}
                        {newCommentDraft !== null && (
                          <div className="quick-comment-row is-active">
                            <input
                              className="quick-comment-input"
                              autoFocus
                              value={newCommentDraft}
                              placeholder="输入评语内容，回车保存"
                              onChange={(event) => setNewCommentDraft(event.target.value)}
                              onKeyDown={(event) => {
                                if (event.key === "Enter") handleCommitNewComment();
                                if (event.key === "Escape") setNewCommentDraft(null);
                              }}
                              onBlur={handleCommitNewComment}
                            />
                            <button
                              type="button"
                              className="quick-comment-del"
                              aria-label="取消新增"
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() => setNewCommentDraft(null)}
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        className="quick-comment-add"
                        onClick={() => setNewCommentDraft("")}
                      >
                        ＋ 新增常用评语
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 第四部分：教师终审结果（当教师完成审核时展示） */}
            {isApproved && (
              <section className="credit-workbench-section" style={{ borderLeft: "3px solid #16a34a", background: "#fbfdfc" }}>
                <div className="credit-section-title">
                  <h3>教师终审结果</h3>
                  <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>审核已完成</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "#334155" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span>核定学时：<strong>{record.teacherApproval?.approvedHours || record.reviewedHours || 10.0} 小时</strong></span>
                    <span style={{ background: "#edf9f0", color: "#16a34a", padding: "1px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>
                      计入 {record.teacherApproval?.credits || 2.0} 学分
                    </span>
                    <span style={{ color: "#94a3b8", fontSize: 11 }}>
                      审核教师：{record.teacherApproval?.teacherName || "李老师"} · {record.teacherApproval?.approvedAt || "2026-10-26 11:20"}
                    </span>
                  </div>
                  <p style={{ margin: 0, background: "#f8fafc", padding: "8px 12px", borderRadius: 6, border: "1px solid #edf2f7", fontSize: 12, color: "#475569" }}>
                    <strong>教师评语：</strong> {record.teacherApproval?.comment || "全勤且积极参与社团活动，带队表现良好，予以足额认定。"}
                  </p>
                </div>
              </section>
            )}
          </main>
        </div>

        {/* 底部栏 */}
        <footer className="credit-workbench-foot">
          {isApproved ? (
            <>
              <span style={{ fontSize: 12, color: "#64748b" }}>
                负责教师已完成学分认定并归档。
              </span>
              <button type="button" className="secondary compact" onClick={onClose}>
                关闭
              </button>
            </>
          ) : isSubmitted ? (
            <>
              <span style={{ fontSize: 12, color: "#64748b" }}>
                已报送教师审核；可在教师审阅前撤回修改。
              </span>
              <div>
                <button type="button" className="secondary compact is-danger" disabled={isArchived} onClick={onRecall}>
                  撤回修改
                </button>
                <button type="button" className="secondary compact" onClick={onClose}>
                  关闭
                </button>
              </div>
            </>
          ) : isReturned ? (
            <>
              <span style={{ fontSize: 12, color: "#64748b" }}>
                {isTeacherReturnedToMember
                  ? "教师退回，等待成员重新提交。"
                  : "已退回成员，等待重新提交。"}
              </span>
              <button type="button" className="secondary compact" onClick={onClose}>
                关闭
              </button>
            </>
          ) : (
            <>
              <span style={{ fontSize: 12, color: "#64748b" }}>
                {isTeacherReturned
                  ? "教师已退回，请核对后重新报送，或退回成员修改。"
                  : "审核通过后将报送教师核定；退回后成员可修改重新提交。"}
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className="secondary compact"
                  style={{ color: "#d97706", borderColor: "#fde68a" }}
                  disabled={isArchived}
                  onClick={onReturn}
                >
                  退回
                </button>
                <button type="button" className="primary compact" disabled={isArchived} onClick={onApprove}>
                  通过
                </button>
              </div>
            </>
          )}
        </footer>
      </section>
    </div>
  );
}

function PresidentCreditWorkbench({
  record,
  activities,
  memberCount,
  isArchived,
  summary,
  declaredHours,
  onHours,
  onSummary,
  onClose,
  onSubmit,
  onRecall,
  onNotify,
  onSwitchDemoStatus,
  viewOnly = false,
}) {
  const isWithdrawn = record.status === "withdrawn";
  const isUnsubmitted = record.status === "unsubmitted";
  const isReturned = record.status === "returned";
  const isSubmitted = record.status === "submitted" || record.status === "pendingTeacher";
  const isApproved = record.status === "approved";
  // 与「我报名的」一致：未申请、已撤回、退回修改可填写；查看态一律只读
  const editable = !viewOnly && (isUnsubmitted || isReturned || isWithdrawn);
  const [detailsExpanded, setDetailsExpanded] = useState(true);

  // 状态文案体系：严格杜绝“草稿态”与“退回重审”，社长作为申报人只叫“退回修改”
  const statusLabel = viewOnly && isWithdrawn
    ? "已撤回"
    : isWithdrawn
    ? "未申请"
    : isUnsubmitted
    ? "未申请"
    : isReturned
    ? "退回修改"
    : isSubmitted
    ? "待教师审核"
    : "已通过";

  const hoursValue = declaredHours !== undefined ? declaredHours : record.declaredHours || 15;

  // 计算组织事实4维度（严格对齐教师端）
  const completedAttendanceCount = activities.filter((item) => item.attendanceStatus === "completed").length;
  const isAttendanceAllCompleted = completedAttendanceCount >= activities.length;
  const completedRecordCount = activities.filter((item) => item.recordStatus === "submitted").length;
  const isRecordAllCompleted = completedRecordCount >= activities.length;

  return (
    <div className="dialog-backdrop credit-workbench-backdrop" onClick={onClose}>
      <section
        className="credit-workbench president-credit-workbench"
        role="dialog"
        aria-modal="true"
        aria-label="社长学分申请"
        onClick={(event) => event.stopPropagation()}
      >
        {/* 顶部页头：纯粹业务标题 + 状态徽章，带轻量状态预览切换 */}
        <header className="credit-workbench-head">
          <div className="credit-workbench-head-title">
            <span className="workbench-title-tag">社长学分申请</span>
            <span
              className={`credit-unified-badge ${
                isSubmitted
                  ? "submitted"
                  : isReturned
                  ? "teacherReturned"
                  : isApproved
                  ? "approved"
                  : isWithdrawn
                  ? "unsubmitted"
                  : "unsubmitted"
              }`}
            >
              <i className="badge-dot" />
              {statusLabel}
            </span>

            {/* 原型测试切换器：允许一键在 5 种状态间切换看效果 */}
            {onSwitchDemoStatus && (
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 10 }}>
                <span style={{ fontSize: 11, color: "#94a3b8" }}>演示:</span>
                {[
                  ["unsubmitted", "未申请"],
                  ["withdrawn", "已撤回"],
                  ["submitted", "待教师审核"],
                  ["returned", "退回修改"],
                  ["approved", "已通过"],
                ].map(([stKey, stName]) => (
                  <button
                    key={stKey}
                    type="button"
                    onClick={() => onSwitchDemoStatus(stKey)}
                    style={{
                      background: record.status === stKey ? "#1e293b" : "#f1f5f9",
                      color: record.status === stKey ? "#fff" : "#64748b",
                      border: "1px solid #e2e8f0",
                      borderRadius: 3,
                      padding: "1px 6px",
                      fontSize: 10,
                      cursor: "pointer",
                    }}
                  >
                    {stName}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="credit-workbench-head-actions">
            <button type="button" className="dialog-close" onClick={onClose} aria-label="关闭">×</button>
          </div>
        </header>

        <div className="credit-workbench-layout is-plain">
          <main className="credit-workbench-main">
            {/* 内容区域第一行：社长身份 Hero */}
            <div className="credit-applicant-hero">
              <div className="applicant-hero-left">
                <h3 className="applicant-hero-name">赵子易 · 初二（3）班</h3>
                <span className="applicant-role-tag" style={{ background: "#fefce8", color: "#854d0e", borderColor: "#fde047", fontWeight: 600 }}>
                  社长
                </span>
              </div>
              <div className="applicant-hero-right">
                <span>{record.submittedAt ? `最后提交于 ${record.submittedAt}` : "本学期履职情况申请"}</span>
              </div>
            </div>

            {/* 被教师退回时，顶部展示醒目的退回意见 Callout */}
            {isReturned && (
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: 6,
                  padding: "10px 14px",
                  marginBottom: 10,
                  fontSize: 12,
                  color: "#991b1b",
                  lineHeight: 1.5,
                }}
              >
                <strong>⚠️ 教师退回修改意见：</strong>
                <span>{record.returnReason || "实践活动学时佐证说明不够详实，请社长核实后调整申请学时或补充活动秩序册佐证。"}</span>
              </div>
            )}

            {/* 正文第一部分：社团组织情况（严格对齐用户提供的标准事实卡片规范） */}
            <section className="credit-workbench-section">
              <div className="credit-section-title">
                <h3>社团组织情况</h3>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  background: "#ffffff",
                  padding: "16px 0",
                }}
              >
                {/* 维度 1: 组织常规活动（带累计时长） */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5, padding: "0 18px", borderRight: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 18, color: "#1e293b", fontWeight: 700 }}>{activities.length} 场</span>
                    <span style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>/ 9.5 小时</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#64748b" }}>组织常规活动</span>
                </div>

                {/* 维度 2: 完成考勤点名（带完成度胶囊标签） */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5, padding: "0 18px", borderRight: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 18, color: "#1e293b", fontWeight: 700 }}>{completedAttendanceCount} 场已点</span>
                    <span
                      style={{
                        padding: "1px 6px",
                        borderRadius: 10,
                        background: isAttendanceAllCompleted ? "#edf9f0" : "#fff7ed",
                        color: isAttendanceAllCompleted ? "#29894c" : "#c2410c",
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      {isAttendanceAllCompleted ? "全部完成" : `待补点 ${activities.length - completedAttendanceCount} 场`}
                    </span>
                  </div>
                  <span style={{ fontSize: 12, color: "#64748b" }}>完成考勤点名</span>
                </div>

                {/* 维度 3: 整理活动记录（带填报状态胶囊标签） */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5, padding: "0 18px", borderRight: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 18, color: "#1e293b", fontWeight: 700 }}>{completedRecordCount} 场已填</span>
                    <span
                      style={{
                        padding: "1px 6px",
                        borderRadius: 10,
                        background: isRecordAllCompleted ? "#edf9f0" : "#fff7ed",
                        color: isRecordAllCompleted ? "#29894c" : "#c2410c",
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      {isRecordAllCompleted ? "全部完成" : `待整理 ${activities.length - completedRecordCount} 场`}
                    </span>
                  </div>
                  <span style={{ fontSize: 12, color: "#64748b" }}>整理活动记录</span>
                </div>

                {/* 维度 4: 带领社团成员（带正式成员标签） */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5, padding: "0 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 18, color: "#1e293b", fontWeight: 700 }}>{memberCount} 人</span>
                    <span
                      style={{
                        padding: "1px 6px",
                        borderRadius: 10,
                        background: "#eff6ff",
                        color: "#2563eb",
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    >
                      正式成员
                    </span>
                  </div>
                  <span style={{ fontSize: 12, color: "#64748b" }}>带领社团成员</span>
                </div>
              </div>
            </section>

            {/* 正文第二部分：申请内容（完全同审核申请） */}
            <section className="credit-workbench-section">
              <div className="credit-section-title">
                <h3>申请内容</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 600 }}>
                    申请学时：{hoursValue} 小时
                  </span>
                  <button
                    type="button"
                    className="btn-applicant-toggle"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#2563eb",
                      fontSize: 12,
                      cursor: "pointer",
                      padding: "2px 6px",
                      borderRadius: 4,
                    }}
                    onClick={() => setDetailsExpanded((prev) => !prev)}
                  >
                    {detailsExpanded ? "收起详情 ▴" : "展开详情 ▾"}
                  </button>
                </div>
              </div>

              {detailsExpanded && (
                <div
                  className="declaration-custom-fields-body"
                  style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 14 }}
                >
                  {/* 申请学时（编辑态与查看态） */}
                  <div className="credit-read-field">
                    <span style={{ display: "block", fontSize: 12, color: "#64748b", marginBottom: 6, fontWeight: 500 }}>
                      申请履职学时
                    </span>
                    {editable ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ display: "inline-flex", alignItems: "center" }}>
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            value={hoursValue}
                            disabled={isArchived}
                            onChange={(event) => onHours && onHours(event.target.value)}
                            style={{
                              width: 86,
                              height: 30,
                              padding: "0 8px",
                              border: "1px solid #cbd5e1",
                              borderRadius: "5px 0 0 5px",
                              fontSize: 13,
                              color: "#1e293b",
                            }}
                          />
                          <em
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              height: 30,
                              padding: "0 8px",
                              border: "1px solid #cbd5e1",
                              borderLeft: 0,
                              borderRadius: "0 5px 5px 0",
                              background: "#f1f5f9",
                              color: "#64748b",
                              fontSize: 12,
                              fontStyle: "normal",
                            }}
                          >
                            小时
                          </em>
                        </div>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "2px 8px",
                            borderRadius: 12,
                            background: "#f8fafc",
                            color: "#475569",
                            border: "1px solid #e2e8f0",
                            fontSize: 11,
                            fontWeight: 500,
                          }}
                        >
                          系统记录时长 9.5 小时
                        </span>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <strong style={{ fontSize: 15, color: "#1e293b" }}>{hoursValue} 小时</strong>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "2px 8px",
                            borderRadius: 12,
                            background: "#f8fafc",
                            color: "#475569",
                            border: "1px solid #e2e8f0",
                            fontSize: 11,
                            fontWeight: 500,
                          }}
                        >
                          系统记录时长 9.5 小时
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 收获与体会 */}
                  <div className="credit-read-field">
                    <span style={{ display: "block", fontSize: 12, color: "#64748b", marginBottom: 4, fontWeight: 500 }}>
                      收获与体会
                    </span>
                    {editable ? (
                      <textarea
                        rows="4"
                        value={summary}
                        disabled={isArchived}
                        onChange={(event) => onSummary(event.target.value)}
                        placeholder="总结本学期作为社长在社团建设、常规组织、活动演练与成果沉淀等方面的履职情况..."
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          resize: "vertical",
                          padding: "8px 10px",
                          border: "1px solid #cbd5e1",
                          borderRadius: 6,
                          fontSize: 13,
                          color: "#1e293b",
                          lineHeight: 1.5,
                          fontFamily: "inherit",
                        }}
                      />
                    ) : (
                      <p style={{ margin: 0, fontSize: 13, color: "#334155", lineHeight: 1.6, background: "#f8fafc", padding: "10px 12px", borderRadius: 6, border: "1px solid #edf2f7" }}>
                        {summary || "本学期全面负责社团组织与常规活动，按期完成考勤归档与成员组织建设。"}
                      </p>
                    )}
                  </div>

                  {/* 证明材料 */}
                  <div className="credit-read-field">
                    <span style={{ display: "block", fontSize: 12, color: "#64748b", marginBottom: 6, fontWeight: 500 }}>
                      证明材料
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      <div
                        className="credit-attachment-tag"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "4px 8px",
                          borderRadius: 4,
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          fontSize: 12,
                          color: "#475569",
                        }}
                      >
                        <Paperclip size={13} style={{ color: "#94a3b8" }} />
                        <span>2026上学期足球联盟活动总结与成果汇总.pdf</span>
                      </div>
                      {editable && !isArchived && (
                        <button
                          type="button"
                          className="secondary compact"
                          style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 26, fontSize: 12 }}
                          onClick={() => onNotify("已模拟选择佐证材料附件：「补充纪实成果.pdf」")}
                        >
                          <UploadSimple size={13} /> 上传附件
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* 若已通过，展示教师终审认定卡片 */}
            {isApproved && (
              <section className="credit-workbench-section" style={{ borderLeft: "3px solid #16a34a", background: "#fbfdfc" }}>
                <div className="credit-section-title">
                  <h3>教师终审认定</h3>
                  <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>终审已完成</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "#334155" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span>核定学时：<strong>{hoursValue} 小时</strong></span>
                    <span style={{ background: "#edf9f0", color: "#16a34a", padding: "1px 8px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>
                      计入 2.5 学分
                    </span>
                    <span style={{ color: "#94a3b8", fontSize: 11 }}>审核教师：李老师 · 2026-10-25 15:30</span>
                  </div>
                  <p style={{ margin: 0, background: "#f8fafc", padding: "8px 12px", borderRadius: 6, border: "1px solid #edf2f7", fontSize: 12, color: "#475569" }}>
                    <strong>教师评语：</strong> 本学期带领足球联盟组织扎实，常规训练全勤，友谊赛筹备得力，考核优秀，予以足额认定。
                  </p>
                </div>
              </section>
            )}
          </main>
        </div>

        {/* 底部栏 */}
        <footer className="credit-workbench-foot">
          {editable ? (
            <div style={{ marginLeft: "auto" }}>
              <button type="button" className="secondary compact" onClick={onClose}>
                取消
              </button>
              <button type="button" className="primary compact" disabled={isArchived} onClick={onSubmit}>
                {isReturned ? "修改并重新提交" : "提交老师审核"}
              </button>
            </div>
          ) : (
            <>
              <span style={{ fontSize: 12, color: "#64748b" }}>
                {isSubmitted
                  ? "已提交负责老师审核，可在老师终审前撤回。"
                  : isWithdrawn
                  ? "本次申请已撤回，可重新发起申请。"
                  : "负责老师已完成最终认定并计入学分。"}
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                {isSubmitted && (
                  <button type="button" className="danger-button compact" disabled={isArchived} onClick={onRecall}>
                    撤回学分申请
                  </button>
                )}
                <button type="button" className="secondary compact" onClick={onClose}>
                  关闭
                </button>
              </div>
            </>
          )}
        </footer>
      </section>
    </div>
  );
}

// 考勤点名独立弹窗：即办即走
function AttendanceModal({ activity, members, isArchived, onClose, onSave }) {
  const [attendance, setAttendance] = useState(() => {
    if (activity.attendance) return activity.attendance;
    return Object.fromEntries(
      members.map((member, index) => [
        member.id,
        activity.status === "completed"
          ? index === members.length - 1
            ? "absent"
            : "present"
          : "present",
      ])
    );
  });

  // 考勤类型只有三种：正常出勤 / 请假 / 缺勤（迟到已取消，出勤率与学时口径唯一）
  const presentCount = Object.values(attendance).filter((val) => val === "present").length;
  const leaveCount = Object.values(attendance).filter((val) => val === "leave").length;
  const absentCount = Object.values(attendance).filter((val) => val === "absent").length;

  const handleSelectAllPresent = () => {
    setAttendance(Object.fromEntries(members.map((m) => [m.id, "present"])));
  };

  const handleConfirm = () => {
    const attendeesText = `正常出勤 ${presentCount} 人${absentCount > 0 ? ` · 缺勤 ${absentCount} 人` : ""}${leaveCount > 0 ? ` · 请假 ${leaveCount} 人` : ""}${absentCount === 0 && leaveCount === 0 ? "（全勤）" : ""}`;
    onSave(
      {
        ...activity,
        attendance,
        attendanceStatus: "completed",
        attendanceRecorded: true,
        attendees: attendeesText,
        attendanceStats: {
          present: presentCount,
          leave: leaveCount,
          absent: absentCount,
          total: members.length,
        },
      },
      "本场考勤点名已确认并保存。"
    );
    onClose();
  };

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="task-action-modal attendance-task-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{activity.attendanceStatus === "completed" ? "查看与调整考勤" : "考勤点名"}</h3>
            <p className="modal-subtitle">{activity.title} · {activity.date} · {activity.venue}</p>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="关闭">✕</button>
        </div>

        <div className="modal-body">
          <div className="attendance-modal-toolbar">
            <button type="button" className="secondary compact" onClick={handleSelectAllPresent} disabled={isArchived}>
              一键全员到场
            </button>
            <div className="attendance-modal-stats">
              <span>应到 <strong>{members.length}</strong> 人</span>
              <span className="stat-divider" />
              <span className="stat-item stat-green">实到 <strong>{presentCount}</strong></span>
              {leaveCount > 0 && <span className="stat-item stat-blue">请假 <strong>{leaveCount}</strong></span>}
              {absentCount > 0 && <span className="stat-item stat-red">缺勤 <strong>{absentCount}</strong></span>}
            </div>
          </div>

          <div className="attendance-modal-list">
            {members.map((m) => (
              <div className="attendance-modal-row" key={m.id}>
                <div className="member-info">
                  <strong>{m.name}</strong>
                  <span className="member-meta">{m.class} · {m.role}</span>
                </div>
                <div className="status-selector" aria-label={`${m.name} 的考勤状态`}>
                  {[
                    ["present", "正常出勤"],
                    ["absent", "缺勤"],
                    ["leave", "请假"],
                  ].map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      disabled={isArchived}
                      className={attendance[m.id] === val ? `selected ${val}` : ""}
                      onClick={() => setAttendance((prev) => ({ ...prev, [m.id]: val }))}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="secondary" onClick={onClose}>取消</button>
          <button type="button" className="primary" onClick={handleConfirm} disabled={isArchived}>
            {activity.attendanceStatus === "completed" ? "保存出勤调整" : "确认并保存出勤事实"}
          </button>
        </div>
      </div>
    </div>
  );
}

// 填写活动记录独立弹窗：即办即走
function RecordModal({ activity, isArchived, onClose, onSave }) {
  const [summary, setSummary] = useState(
    activity.recordSummary || (activity.recordStatus === "submitted" ? "已完成本场活动的过程记录与材料整理。" : "")
  );
  const [photos, setPhotos] = useState(
    activity.recordPhotos || (activity.recordStatus === "submitted" ? ["现场训练与战术配合_1.jpg", "全员合影.jpg"] : [])
  );

  const handleAddPhoto = () => {
    const defaultNames = ["现场纪实合影.jpg", "训练战术图.jpg", "活动演练成果.jpg", "现场记录抓拍.jpg"];
    const nextName = defaultNames[photos.length % defaultNames.length] || `纪实照片_${photos.length + 1}.jpg`;
    setPhotos((prev) => [...prev, nextName]);
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    onSave(
      {
        ...activity,
        recordStatus: "submitted",
        recordSummary: summary,
        recordPhotos: photos,
      },
      "活动记录已成功保存并沉淀至档案。"
    );
    onClose();
  };

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="task-action-modal record-task-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{activity.recordStatus === "submitted" ? "查看与修改活动记录" : "填写活动记录"}</h3>
            <p className="modal-subtitle">{activity.title} · {activity.date} · {activity.venue}</p>
          </div>
          <button type="button" className="close-btn" onClick={onClose} aria-label="关闭">✕</button>
        </div>

        <div className="modal-body">
          <div className="record-form-section">
            <label className="field-label">
              <span>活动纪要 <strong className="required-star">*</strong></span>
              <span className="field-hint">简要记录本次活动的开展情况与现场要点</span>
            </label>
            <textarea
              className="record-textarea"
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="例：全员按时到场，重点开展传切配合与体能训练，既定战术演练达成预期，现场秩序良好。"
            />
          </div>

          <div className="record-form-section">
            <label className="field-label">
              <span>现场照片与成果</span>
              <span className="field-hint">上传现场合影、作品或训练瞬间，支持多张</span>
            </label>
            <div className="record-photos-grid">
              {photos.map((photo, idx) => (
                <div className="record-photo-chip" key={idx}>
                  <FileText size={16} />
                  <span className="photo-name">{photo}</span>
                  {!isArchived && (
                    <button type="button" className="remove-photo-btn" onClick={() => handleRemovePhoto(idx)}>✕</button>
                  )}
                </div>
              ))}
              {!isArchived && (
                <button type="button" className="upload-photo-btn" onClick={handleAddPhoto}>
                  <UploadSimple size={16} />
                  <span>添加现场照片</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="secondary" onClick={onClose}>取消</button>
          <button
            type="button"
            className="primary"
            onClick={handleConfirm}
            disabled={isArchived || !summary.trim()}
          >
            {activity.recordStatus === "submitted" ? "保存修改" : "保存活动记录"}
          </button>
        </div>
      </div>
    </div>
  );
}

// 学校场地库（分层分类展示，贴合 K12 十一系校情）
const VENUE_LIBRARY = [
  {
    category: "操场与体育场馆",
    options: [
      "西操场 1 号场地",
      "西操场 2 号场地",
      "田径场环形跑道",
      "室内篮球馆 A 馆",
      "室内篮球馆 B 馆",
      "风雨操场羽毛球区",
      "乒乓球馆",
    ],
  },
  {
    category: "专用与创新实训场室",
    options: [
      "影视工作间 204",
      "创客工坊 201",
      "光影戏剧排练厅",
      "合唱与室内乐排演厅 102",
      "书法美术工作坊 301",
      "无人机与航模实验室",
    ],
  },
  {
    category: "教学研讨与公共空间",
    options: [
      "行知楼 302 研讨室",
      "教学楼阶梯报告厅（北区）",
      "图书馆二层研学空间",
      "科技楼连廊展示区",
    ],
  },
];

// 计算两点时间差的时长文案
function calculateDurationText(startStr, endStr) {
  if (!startStr || !endStr) return "";
  const [sh, sm] = startStr.split(":").map(Number);
  const [eh, em] = endStr.split(":").map(Number);
  const diffMinutes = (eh * 60 + em) - (sh * 60 + sm);
  if (diffMinutes <= 0) return "结束时间需晚于开始时间";
  const hours = Math.floor(diffMinutes / 60);
  const mins = diffMinutes % 60;
  if (hours > 0 && mins > 0) return `活动时长：${hours} 小时 ${mins} 分钟（共 ${diffMinutes} 分钟）`;
  if (hours > 0) return `活动时长：${hours} 小时（共 ${diffMinutes} 分钟）`;
  return `活动时长：${mins} 分钟`;
}

// 周期性活动根据起止范围和指定周几计算活动场次
function getRecurringDates(startDateStr, endDateStr, weekdayName) {
  const weekMap = {
    "周日": 0,
    "周一": 1,
    "周二": 2,
    "周三": 3,
    "周四": 4,
    "周五": 5,
    "周六": 6,
  };
  const targetDay = weekMap[weekdayName] ?? 3;
  const start = new Date(`${startDateStr}T12:00:00`);
  const end = new Date(`${endDateStr}T12:00:00`);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
    return [];
  }
  const current = new Date(start);
  const diff = (targetDay - current.getDay() + 7) % 7;
  current.setDate(current.getDate() + diff);

  const dates = [];
  while (current <= end && dates.length < 24) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 7);
  }
  return dates;
}

// 发布新活动独立弹窗（轻量干净，无臃肿说教，一屏全览，贴合 1.0 简洁心智）
function PublishActivityModal({ club, isDoc, isArchived, memberCount, onClose, onPublish }) {
  // 1. 活动名称
  const [title, setTitle] = useState("");

  // 2. 活动时间
  const [singleDate, setSingleDate] = useState("2026-11-04");
  const [startTime, setStartTime] = useState("16:20");
  const [endTime, setEndTime] = useState("17:40");

  // 轻量周期性重复（默认单次不重复，勾选仅展示截止日期）
  const [isRepeating, setIsRepeating] = useState(false);
  const [endDate, setEndDate] = useState("2027-01-15"); // 默认到本学期末

  // 3. 场地设置（从场地库选择 或 手动输入）
  const defaultClubVenue = club.venue || (isDoc ? "影视工作间 204" : "西操场 1 号场地");
  const [venueMode, setVenueMode] = useState("library"); // "library" | "custom"
  const [selectedLibraryVenue, setSelectedLibraryVenue] = useState(defaultClubVenue);
  const [customVenue, setCustomVenue] = useState("");

  // 4. 活动说明与要求（对活动的准备）
  const [desc, setDesc] = useState("");

  // 5. 线上研讨（主题与说明，选填平铺）
  const [topic, setTopic] = useState("");
  const [topicDesc, setTopicDesc] = useState("");

  // 6. 相关附件
  const [attachments, setAttachments] = useState([]);

  // 计算所选单次日期的星期几
  const singleDateWeekday = useMemo(() => {
    if (!singleDate) return "";
    const d = new Date(`${singleDate}T12:00:00`);
    if (isNaN(d.getTime())) return "";
    const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return weekDays[d.getDay()];
  }, [singleDate]);

  // 计算当前活动时长
  const durationText = useMemo(() => {
    return calculateDurationText(startTime, endTime);
  }, [startTime, endTime]);

  // 计算周期性活动生成的场次
  const recurringDates = useMemo(() => {
    if (!isRepeating || !singleDateWeekday) return [];
    return getRecurringDates(singleDate, endDate, singleDateWeekday);
  }, [isRepeating, singleDate, endDate, singleDateWeekday]);

  // 处理附件本地选择上传
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newItems = files.map((f) => ({
      name: f.name,
      size: f.size > 1024 * 1024 ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(f.size / 1024)} KB`,
    }));
    setAttachments((prev) => [...prev, ...newItems]);
    e.target.value = "";
  };

  const handleAddSampleAttachment = (sample) => {
    if (attachments.some((a) => a.name === sample.name)) return;
    setAttachments((prev) => [...prev, sample]);
  };

  const handleRemoveAttachment = (idx) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  // 提交发布
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isArchived) return;
    if (!title.trim()) return;

    const finalVenue = (venueMode === "library" ? selectedLibraryVenue : customVenue).trim() || defaultClubVenue;
    const timeRangeStr = `${startTime} - ${endTime}`;

    if (!isRepeating) {
      const d = new Date(`${singleDate}T12:00:00`);
      const month = d.getMonth() + 1;
      const day = d.getDate();
      const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      const weekday = weekDays[d.getDay()];

      const newAct = {
        id: `act-${Date.now()}`,
        title: title.trim(),
        dateDay: `${month}.${String(day).padStart(2, "0")}`,
        dateWeek: weekday,
        dateTime: timeRangeStr,
        date: `${month} 月 ${day} 日 ${timeRangeStr}`,
        venue: finalVenue,
        status: "upcoming",
        statusLabel: "待开展",
        attendanceStatus: "pending",
        recordStatus: "pending",
        attendees: `应到 ${memberCount} 人`,
        desc: desc.trim() || "社团日常实践活动安排，请准时参加。",
        attachments: attachments,
        topic: topic.trim(),
        topicDesc: topicDesc.trim(),
        isRecurring: false,
        contributions: topic.trim()
          ? [
            {
              id: `c-${Date.now()}`,
              name: "赵子易",
              role: "社长",
              class: "初二（3）班",
              time: formatNowDateTime(),
              text: topicDesc.trim()
                ? `【本期研讨议题】${topic.trim()}。${topicDesc.trim()}`
                : `【本期研讨议题】${topic.trim()}。欢迎各位成员在活动前后留言交流！`,
              isFeatured: true,
            },
          ]
          : [],
      };

      onPublish([newAct], `新活动「${newAct.title}」已发布成功！已向社团全体 ${memberCount} 名成员推送通知。`);
    } else {
      // 周期性批量生成
      if (recurringDates.length === 0) return;
      const sessionCount = recurringDates.length;
      const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

      const sessions = recurringDates.map((sessionDate, index) => {
        const month = sessionDate.getMonth() + 1;
        const day = sessionDate.getDate();
        const weekday = weekDays[sessionDate.getDay()];
        return {
          id: `act-${Date.now()}-${index}`,
          title: title.trim(),
          dateDay: `${month}.${String(day).padStart(2, "0")}`,
          dateWeek: weekday,
          dateTime: timeRangeStr,
          date: `${month} 月 ${day} 日 ${timeRangeStr}`,
          venue: finalVenue,
          status: "upcoming",
          statusLabel: "待开展",
          attendanceStatus: "pending",
          recordStatus: "pending",
          attendees: `应到 ${memberCount} 人`,
          topic: "", // 周期性常规日程默认为自由交流，避免全学期重复同一主题
          desc: desc.trim() || "社团周期性常规活动安排，请全体成员按时到场参加。",
          recurrence: `每周固定 · 第 ${index + 1}/${sessionCount} 场`,
          isRecurring: true,
          attachments: [],
          contributions: [],
        };
      });

      onPublish(
        sessions,
        `已按周自动生成 ${sessionCount} 场常规活动日程，并向全体 ${memberCount} 名成员推送通知！`
      );
    }
  };

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <aside
        className="activity-drawer publish-activity-drawer-slim"
        onClick={(e) => e.stopPropagation()}
        aria-label="发布社团活动抽屉"
      >
        {/* 顶部标题区：清爽干净 */}
        <header className="publish-drawer-header-clean">
          <button type="button" className="activity-drawer-close" onClick={onClose} aria-label="关闭抽屉">✕</button>
          <div className="drawer-header-title-wrap">
            <h3>发布新活动</h3>
            <span className="drawer-sub-club">所属社团：<strong>{club.name}</strong></span>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="publish-clean-form">
          <div className="publish-clean-body">
            {/* 1. 活动名称 */}
            <div className="clean-field-row">
              <label className="clean-field-label">
                <span className="req-star">*</span> 活动名称
              </label>
              <div className="clean-field-control">
                <input
                  type="text"
                  className="clean-text-input"
                  required
                  placeholder="请输入社团活动名称（如：周三常规战术训练 / 校园友谊交流赛）"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            {/* 2. 活动时间 */}
            <div className="clean-field-row">
              <label className="clean-field-label">
                <span className="req-star">*</span> 活动时间
              </label>
              <div className="clean-field-control">
                <div className="time-select-group">
                  <input
                    type="date"
                    className="clean-date-input"
                    required
                    value={singleDate}
                    onChange={(e) => setSingleDate(e.target.value)}
                  />
                  {singleDateWeekday && <span className="clean-weekday-pill">{singleDateWeekday}</span>}
                  <input
                    type="time"
                    className="clean-time-input"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <span className="time-sep">至</span>
                  <input
                    type="time"
                    className="clean-time-input"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>

                {/* 轻量周期重复勾选行：紧凑、不突兀、无大横幅 */}
                <div className="repeat-toggle-row">
                  <label className="repeat-checkbox-label">
                    <input
                      type="checkbox"
                      checked={isRepeating}
                      onChange={(e) => setIsRepeating(e.target.checked)}
                    />
                    <span>每周固定按此时间重复</span>
                  </label>
                  {isRepeating && (
                    <div className="repeat-end-wrapper">
                      <span>截止至：</span>
                      <input
                        type="date"
                        className="clean-date-input compact"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                      <span className="repeat-count-tag">共 {recurringDates.length} 场日程</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3. 活动地点（从场地库选择 / 手动输入） */}
            <div className="clean-field-row">
              <label className="clean-field-label">
                <span className="req-star">*</span> 活动地点
              </label>
              <div className="clean-field-control">
                <div className="venue-radio-row">
                  <label className="venue-radio-label">
                    <input
                      type="radio"
                      name="venueMode"
                      value="library"
                      checked={venueMode === "library"}
                      onChange={() => setVenueMode("library")}
                    />
                    <span>从场地库选择</span>
                  </label>
                  <label className="venue-radio-label">
                    <input
                      type="radio"
                      name="venueMode"
                      value="custom"
                      checked={venueMode === "custom"}
                      onChange={() => setVenueMode("custom")}
                    />
                    <span>手动输入</span>
                  </label>
                </div>

                {venueMode === "library" ? (
                  <div className="venue-library-selected-row">
                    <div className="venue-pill-box">
                      <MapPin size={14} className="venue-pin-icon" />
                      <span className="venue-name">{selectedLibraryVenue}</span>
                      <span className="venue-default-tag">本社常规场地</span>
                    </div>
                    <button
                      type="button"
                      className="btn-change-venue-link"
                      onClick={() => {
                        const demoVenues = [defaultClubVenue, "第二报告厅", "实验楼 302 机器人实验室", "东校区体育馆"];
                        const nextIdx = (demoVenues.indexOf(selectedLibraryVenue) + 1) % demoVenues.length;
                        setSelectedLibraryVenue(demoVenues[nextIdx]);
                      }}
                      title="点击切换演示校内其他场地"
                    >
                      重新选择
                    </button>
                  </div>
                ) : (
                  <input
                    type="text"
                    className="clean-text-input"
                    required
                    placeholder="请输入活动场地或集合地点说明（如：西操场连廊前 / 科技楼台阶集合）"
                    value={customVenue}
                    onChange={(e) => setCustomVenue(e.target.value)}
                  />
                )}
              </div>
            </div>

            {/* 4. 活动说明（面向线下准备与要求，未标*即为选填） */}
            <div className="clean-field-row">
              <label className="clean-field-label">
                活动说明
              </label>
              <div className="clean-field-control">
                <textarea
                  className="clean-textarea-input"
                  rows={3}
                  placeholder="请输入活动说明或准备要求（如热身准备、运动鞋服自备等）"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
            </div>

            {/* 5. 相关附件（未标*即为选填） */}
            <div className="clean-field-row">
              <label className="clean-field-label">
                相关附件
              </label>
              <div className="clean-field-control">
                <div className="clean-upload-row">
                  <label className="clean-upload-btn">
                    <UploadSimple size={14} />
                    <span>上传附件</span>
                    <input
                      type="file"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </label>
                  <button
                    type="button"
                    className="clean-sample-btn"
                    onClick={() => handleAddSampleAttachment({ name: "活动战术与出场分组表.pdf", size: "840 KB" })}
                  >
                    + 示例分组表.pdf
                  </button>
                </div>

                {attachments.length > 0 && (
                  <div className="clean-attachment-chips">
                    {attachments.map((file, idx) => (
                      <span key={idx} className="clean-file-badge">
                        <Paperclip size={13} color="#2563eb" />
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">({file.size})</span>
                        <button
                          type="button"
                          className="btn-del-file"
                          title="删除附件"
                          onClick={() => handleRemoveAttachment(idx)}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* 底部操作条 */}
          <footer className="publish-drawer-footer-clean">
            <div className="footer-left-status">
              <span>
                {isRepeating
                  ? `周期日程：预计按周自动生成 ${recurringDates.length} 场活动`
                  : "单次活动日程"}
              </span>
            </div>
            <div className="footer-right-btns">
              <button type="button" className="btn-clean-secondary" onClick={onClose}>
                取消
              </button>
              <button
                type="submit"
                className="primary"
                disabled={isRepeating && recurringDates.length === 0}
              >
                {isRepeating ? `确认发布（生成 ${recurringDates.length} 场）` : "确认发布"}
              </button>
            </div>
          </footer>
        </form>
      </aside>
    </div>
  );
}

// 编辑活动信息独立弹窗
function EditActivityModal({ activity, onClose, onSave }) {
  const [title, setTitle] = useState(activity.title || "");

  // 提取起止时间
  const initialTimeParts = (activity.dateTime || "16:20 - 17:40").split("-").map((s) => s.trim());
  const [startTime, setStartTime] = useState(initialTimeParts[0] || "16:20");
  const [endTime, setEndTime] = useState(initialTimeParts[1] || "17:40");

  const [venueMode, setVenueMode] = useState(
    VENUE_LIBRARY.some((g) => g.options.includes(activity.venue)) ? "library" : "custom"
  );
  const [selectedLibraryVenue, setSelectedLibraryVenue] = useState(
    VENUE_LIBRARY.some((g) => g.options.includes(activity.venue)) ? activity.venue : "西操场 1 号场地"
  );
  const [customVenue, setCustomVenue] = useState(
    !VENUE_LIBRARY.some((g) => g.options.includes(activity.venue)) ? activity.venue : ""
  );

  const [topic, setTopic] = useState(activity.topic || "");
  const [topicDesc, setTopicDesc] = useState(activity.topicDesc || "");
  const [desc, setDesc] = useState(activity.desc || "");
  const [attachments, setAttachments] = useState(activity.attachments || []);

  const durationText = useMemo(() => {
    return calculateDurationText(startTime, endTime);
  }, [startTime, endTime]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newItems = files.map((f) => ({
      name: f.name,
      size: f.size > 1024 * 1024 ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(f.size / 1024)} KB`,
    }));
    setAttachments((prev) => [...prev, ...newItems]);
    e.target.value = "";
  };

  const handleRemoveAttachment = (idx) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const finalVenue = (venueMode === "library" ? selectedLibraryVenue : customVenue).trim() || activity.venue;
    const timeRangeStr = `${startTime} - ${endTime}`;

    onSave({
      ...activity,
      title: title.trim(),
      dateTime: timeRangeStr,
      date: activity.dateDay ? `${activity.dateDay.replace(".", " 月 ")} 日 ${timeRangeStr}` : `${(activity.date || "").split(" ")[0]} ${timeRangeStr}`,
      venue: finalVenue,
      desc: desc.trim(),
      attachments: attachments,
      topic: topic.trim(),
      topicDesc: topicDesc.trim(),
    });
    onClose();
  };

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog president-dialog publish-dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="dialog-close" onClick={onClose}>✕</button>
        <div className="publish-dialog-header">
          <h2>编辑活动信息</h2>
          <p>调整本场活动的主题、时间、场地、材料或研讨议题，修改后社团成员将同步获取最新信息。</p>
        </div>
        <form onSubmit={handleSubmit} className="modal-form-grid">
          <label>
            <span>活动主题 *</span>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例如：周三战术跑位与阵型协同训练"
            />
          </label>

          <div className="form-group-block">
            <label>
              <span>活动时段 *</span>
              <div className="time-range-row">
                <input
                  type="time"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <span className="time-to-separator">至</span>
                <input
                  type="time"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </label>
          </div>

          <div className="form-group-block">
            <label style={{ marginBottom: "6px" }}>
              <span>活动场地 *</span>
            </label>
            <div className="venue-radio-row" style={{ marginBottom: "8px" }}>
              <label className="venue-radio-label">
                <input
                  type="radio"
                  name="editVenueMode"
                  value="library"
                  checked={venueMode === "library"}
                  onChange={() => setVenueMode("library")}
                />
                <span>从场地库选择</span>
              </label>
              <label className="venue-radio-label">
                <input
                  type="radio"
                  name="editVenueMode"
                  value="custom"
                  checked={venueMode === "custom"}
                  onChange={() => setVenueMode("custom")}
                />
                <span>手动输入</span>
              </label>
            </div>

            {venueMode === "library" ? (
              <div className="venue-library-selected-row">
                <div className="venue-pill-box">
                  <MapPin size={14} className="venue-pin-icon" />
                  <span className="venue-name">{selectedLibraryVenue}</span>
                  <span className="venue-default-tag">本社常规场地</span>
                </div>
                <button
                  type="button"
                  className="btn-change-venue-link"
                  onClick={() => {
                    const demoVenues = ["西操场 1 号场地", "第二报告厅", "实验楼 302 机器人实验室", "东校区体育馆"];
                    const nextIdx = (demoVenues.indexOf(selectedLibraryVenue) + 1) % demoVenues.length;
                    setSelectedLibraryVenue(demoVenues[nextIdx]);
                  }}
                  title="点击切换演示校内其他场地"
                >
                  重新选择
                </button>
              </div>
            ) : (
              <input
                type="text"
                required
                placeholder="请输入活动场地或集合地点说明（如：西操场连廊前 / 科技楼台阶集合）"
                value={customVenue}
                onChange={(e) => setCustomVenue(e.target.value)}
              />
            )}
          </div>

          {/* 活动说明（面向线下准备与要求，未标*即为选填） */}
          <label>
            <span>活动说明</span>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="补充说明本场活动线下训练重点、装备准备或集合注意事项"
            />
          </label>

          {/* 相关附件（未标*即为选填） */}
          <div className="form-group-block">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <span style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>相关附件</span>
              <label className="btn-upload-file-label" style={{ padding: "4px 8px", fontSize: "11.5px" }}>
                <UploadSimple size={12} />
                <span>添加文件</span>
                <input
                  type="file"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {attachments.length > 0 && (
              <div className="attached-files-list">
                {attachments.map((file, idx) => (
                  <div key={idx} className="attached-file-pill">
                    <div className="attached-file-left">
                      <Paperclip size={14} color="#2563eb" />
                      <span style={{ fontWeight: 500 }}>{file.name}</span>
                      <span className="attached-file-size">({file.size})</span>
                    </div>
                    <button
                      type="button"
                      className="btn-remove-file"
                      title="移除附件"
                      onClick={() => handleRemoveAttachment(idx)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dialog-actions">
            <button type="button" className="secondary" onClick={onClose}>取消</button>
            <button type="submit" className="primary">保存修改</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 删除活动确认弹窗：语言温和通俗，无系统技术黑话，智能感知讨论与出勤
function DeleteActivityModal({ activity, onClose, onConfirm, onSwitchToEdit }) {
  const hasDiscussions = Boolean(activity.contributions && activity.contributions.length > 0);
  const discussionCount = activity.contributions?.length || 0;
  const hasAttendance = activity.attendanceStatus === "completed" || Boolean(activity.attendanceRecorded);
  const attendeeText = activity.attendees || "已完成出勤点名";

  const isRichActivity = hasDiscussions || hasAttendance;

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog president-dialog delete-confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="dialog-close" onClick={onClose}>✕</button>
        <h2 className="delete-dialog-title">确定要删除这场活动吗？</h2>
        <p className="delete-target-name">活动：<strong>{activity.title}</strong></p>

        {isRichActivity ? (
          <div className="delete-impact-warning-box">
            <div className="warning-lead">
              ⚠️ 这场活动已有同学们的参与记录，删除后将产生以下影响：
            </div>
            <ul className="warning-impact-list">
              {hasDiscussions && (
                <li>
                  活动下已有 <strong>{discussionCount} 份</strong> 成员精彩瞬间，删除后这些分享将无法找回。
                </li>
              )}
              {hasAttendance && (
                <li>
                  已为同学们完成过点名（{attendeeText}），删除后这次到场记录也将一并不复存在。
                </li>
              )}
            </ul>
            <div className="warning-tip-note">
              💡 <strong>温馨提示</strong>：如果只是活动时间、场地有变化，建议直接修改活动，无需删除。
            </div>
          </div>
        ) : (
          <p className="delete-simple-desc">
            删除后，这场活动将从社团活动安排中完全移除。
          </p>
        )}

        <div className="modal-footer delete-modal-footer">
          {isRichActivity ? (
            <>
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  onClose();
                  onSwitchToEdit(activity);
                }}
              >
                暂不删除，去修改活动
              </button>
              <button
                type="button"
                className="btn-danger-solid"
                onClick={() => {
                  onConfirm(activity);
                  onClose();
                }}
              >
                确认彻底删除
              </button>
            </>
          ) : (
            <>
              <button type="button" className="secondary" onClick={onClose}>取消</button>
              <button
                type="button"
                className="btn-danger-solid"
                onClick={() => {
                  onConfirm(activity);
                  onClose();
                }}
              >
                确认删除
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// 一体化活动详情抽屉（单页流式，信息准确完备、文案自然亲切、符合社长与成员心智）
function ActivityDrawer({
  activity,
  club,
  members = [],
  isArchived,
  config = {},
  onClose,
  onOpenAttendance,
  onOpenRecord,
  onOpenEdit,
  onOpenDelete,
  onOpenDiscussion,
}) {
  const [showMembersList, setShowMembersList] = useState(false);

  const isUpcoming = activity.status === "upcoming";
  const isOngoing = activity.status === "ongoing";
  const isCompleted = activity.status === "completed";
  const hasAttendance = activity.attendanceStatus === "completed" || activity.attendanceRecorded;
  const needsAttendance = !hasAttendance;
  const hasRecord = activity.recordStatus === "submitted";
  const needsRecord = !hasRecord;

  const isRecurring = Boolean(activity.isRecurring || activity.recurrence);
  const contributions = activity.contributions || [];
  const featuredContributions = contributions.filter((c) => c.isFeatured);
  const attachments = activity.attachments || [];

  // 计算时间、星期与时长文本
  const timeParts = (activity.dateTime || "").split("-").map((s) => s.trim());
  const startTime = timeParts[0] || "";
  const endTime = timeParts[1] || "";
  const durationText = useMemo(() => {
    return calculateDurationText(startTime, endTime);
  }, [startTime, endTime]);

  // 整理日期和星期文案
  const formattedDateWithWeek = useMemo(() => {
    const rawDate = activity.date || "";
    if (activity.dateWeek && !rawDate.includes("周")) {
      const parts = rawDate.split(" ");
      if (parts.length >= 4) {
        return `${parts[0]} ${parts[1]} ${parts[2]}（${activity.dateWeek}） ${activity.dateTime || ""}`.trim();
      }
      return `${rawDate}（${activity.dateWeek}）`;
    }
    return rawDate;
  }, [activity.date, activity.dateWeek, activity.dateTime]);

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <aside className="activity-drawer activity-profile-drawer" onClick={(e) => e.stopPropagation()} aria-label="活动详情抽屉">
        {/* 抽屉头部：归属社团、活动标题、状态与时空元信息 */}
        <header className="activity-drawer-header">
          <button type="button" className="activity-drawer-close" onClick={onClose} aria-label="关闭抽屉">✕</button>
          <div className="drawer-eyebrow">
            <span className="eyebrow-dot" />
            <span>社团活动详情 · {club?.name || "学生社团"}</span>
          </div>
          <h3>{activity.title}</h3>
          <div className="drawer-meta-line">
            <span>
              <Clock size={14} />
              {formattedDateWithWeek}
              {durationText && !durationText.includes("需晚于") ? ` · ${durationText.replace("活动时长：", "")}` : ""}
            </span>
            <span className="meta-divider" />
            <span>
              <MapPin size={14} />
              {activity.venue}
            </span>
            <span className="meta-divider" />
            {isUpcoming && <span className="status-badge pending"><i className="badge-dot" /> 待开展</span>}
            {isOngoing && <span className="status-badge ongoing"><i className="badge-dot" /> 进行中</span>}
            {isCompleted && <span className="status-badge completed"><i className="badge-dot" /> 已结束</span>}
          </div>
        </header>

        {/* 抽屉正文流式呈现 */}
        <div className="activity-drawer-body profile-stream-body">
          {/* Section 1: 活动安排与基本信息 */}
          <section className="drawer-section-card">
            <div className="section-header-flex">
              <h4 className="section-title">
                <CalendarDots size={16} color="#2563eb" /> 活动安排与基本信息
              </h4>
              {!isArchived && onOpenEdit && (
                <button
                  type="button"
                  className="link-btn-text"
                  onClick={() => {
                    onClose();
                    onOpenEdit(activity);
                  }}
                  title="修改本场活动基本信息"
                >
                  <NotePencil size={13} style={{ verticalAlign: "-2px", marginRight: "3px" }} />
                  编辑信息
                </button>
              )}
            </div>

            <div className="activity-detail-grid">
              <div>
                <span>活动时间</span>
                <strong>{formattedDateWithWeek}</strong>
                {durationText && !durationText.includes("需晚于") && (
                  <small className="field-sub-text">{durationText}</small>
                )}
              </div>
              <div>
                <span>活动场地</span>
                <strong>{activity.venue}</strong>
                <small className="field-sub-text">社团线下活动地点</small>
              </div>
              <div>
                <span>安排类型</span>
                <strong>{isRecurring ? "周期性常规日程" : "单次特别活动"}</strong>
                <small className="field-sub-text">
                  {isRecurring ? `每周${activity.dateWeek || "固定"}例行活动` : "专项阶段性活动"}
                </small>
              </div>
              <div>
                <span>参与对象</span>
                <strong>本社团正式成员（{members.length} 人）</strong>
                <small className="field-sub-text">赵子易（学生社长发布组织）</small>
              </div>
            </div>

            {/* 活动说明与准备要求 */}
            <div className="activity-description-block">
              <span>活动说明与准备要求</span>
              <p>{activity.desc || "暂无特殊准备要求，请全体成员提前 5 分钟到场参加。"}</p>
            </div>

            {/* 活动资料与附件（重要：完整呈现与下载） */}
            {attachments.length > 0 && (
              <div className="activity-attachments-block">
                <span className="block-label">
                  <Paperclip size={13} /> 活动材料与附件（{attachments.length} 个）
                </span>
                <div className="drawer-attachments-list">
                  {attachments.map((file, idx) => (
                    <div className="drawer-attachment-item" key={idx}>
                      <div className="att-file-info">
                        <FileText size={16} color="#2563eb" />
                        <div className="att-file-meta">
                          <span className="att-file-name" title={file.name}>{file.name}</span>
                          <span className="att-file-size">{file.size}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-file-download"
                        onClick={() => alert(`已触发下载附件：${file.name}`)}
                        title="下载或预览附件"
                      >
                        <DownloadSimple size={13} />
                        <span>下载</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Section 2: 成员出勤记录（受控显示，区分生命周期心智） */}
          {config.allowAttendance && (
            <section className="drawer-section-card">
              <div className="section-header-flex">
                <h4 className="section-title">
                  <CheckCircle size={16} color="#16a34a" /> 成员出勤记录
                </h4>
                {hasAttendance && !isArchived && (
                  <button
                    type="button"
                    className="link-btn-text"
                    onClick={() => onOpenAttendance(activity)}
                  >
                    修改考勤
                  </button>
                )}
              </div>

              {hasAttendance ? (
                /* 已完成出勤点名 */
                <div className="attendance-fact-box">
                  <div className="attendance-fact-summary">
                    <div className="attendance-summary-left">
                      <span className="fact-main-text">{activity.attendees || "全员到场"}</span>
                      <span className="fact-sub-tag">已如实计入考勤档案</span>
                    </div>
                    <button
                      type="button"
                      className="text-toggle-btn"
                      onClick={() => setShowMembersList(!showMembersList)}
                    >
                      {showMembersList ? "收起出勤明细 ▲" : "查看成员出勤明细 ▼"}
                    </button>
                  </div>
                  {showMembersList && (
                    <div className="attendance-compact-list">
                      {members.map((m, idx) => {
                        const status = activity.attendance
                          ? activity.attendance[m.id]
                          : idx === members.length - 1
                            ? "absent"
                            : "present";
                        return (
                          <div className="attendance-compact-item" key={m.id}>
                            <span className="member-name">{m.name}</span>
                            <span className="member-class">{m.class}</span>
                            <span className={`status-pill ${status}`}>
                              {status === "present"
                                ? "正常出勤"
                                : status === "leave"
                                  ? "请假"
                                  : "缺勤"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : isUpcoming ? (
                /* 待开展活动（未到点名时间）- 温和提示，不催促报错 */
                <div className="upcoming-callout-card">
                  <div className="callout-icon-wrap">
                    <Clock size={16} color="#3b82f6" />
                  </div>
                  <div className="callout-text">
                    <strong>活动尚未开始（待开展）</strong>
                    <p>活动开展时由社长在现场进行考勤点名，出勤情况将如实计入成员参与记录及学期末学分核定。</p>
                  </div>
                </div>
              ) : (
                /* 进行中或已结束未点名 - 任务引导卡片 */
                <div className="pending-task-callout">
                  <div className="callout-text">
                    <strong>{isOngoing ? "活动进行中 · 待现场点名" : "活动已结束 · 待补录出勤"}</strong>
                    <p>
                      {isOngoing
                        ? "请社长在活动现场完成点名确认，记录成员正常出勤情况。"
                        : "本场活动已结束，请社长尽快完成出勤点名，出勤记录将作为成员学时认定的客观凭据。"}
                    </p>
                  </div>
                  {!isArchived && (
                    <button
                      type="button"
                      className="primary compact"
                      onClick={() => onOpenAttendance(activity)}
                    >
                      考勤点名
                    </button>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Section 3: 活动纪要与现场成果（受控显示，区分生命周期心智） */}
          {config.allowMaterials && (
            <section className="drawer-section-card">
              <div className="section-header-flex">
                <h4 className="section-title">
                  <FileText size={16} color="#0284c7" /> 活动纪要与现场成果
                </h4>
                {hasRecord && !isArchived && (
                  <button
                    type="button"
                    className="link-btn-text"
                    onClick={() => onOpenRecord(activity)}
                  >
                    修改纪要
                  </button>
                )}
              </div>

              {hasRecord ? (
                /* 已提交活动纪要 */
                <div className="record-fact-box">
                  <p className="record-summary-content">
                    {activity.recordSummary || "已完成本场活动的过程记录与材料整理。"}
                  </p>
                  {activity.recordPhotos && activity.recordPhotos.length > 0 && (
                    <div className="record-photos-gallery">
                      <span className="gallery-title">现场照片与成果：</span>
                      <div className="gallery-chips-wrap">
                        {activity.recordPhotos.map((photo, i) => (
                          <div className="gallery-photo-chip" key={i}>
                            <Camera size={14} color="#0284c7" />
                            <span>{photo}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : isUpcoming ? (
                /* 待开展活动 - 温和提示 */
                <div className="upcoming-callout-card">
                  <div className="callout-icon-wrap">
                    <FileText size={16} color="#3b82f6" />
                  </div>
                  <div className="callout-text">
                    <strong>活动尚未开展（活动后填写）</strong>
                    <p>活动结束后，社长可在此填写活动纪要并上传现场照片与成果材料，沉淀为社团官方档案与风采记录。</p>
                  </div>
                </div>
              ) : (
                /* 进行中/已结束待填写 */
                <div className="pending-task-callout">
                  <div className="callout-text">
                    <strong>本场活动纪要待填写</strong>
                    <p>建议社长在活动结束后及时补充活动纪要及现场照片，沉淀为社团官方档案与风采记录。</p>
                  </div>
                  {!isArchived && (
                    <button
                      type="button"
                      className="primary compact"
                      onClick={() => onOpenRecord(activity)}
                    >
                      填写活动记录
                    </button>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Section 4: 活动精彩瞬间（成员围绕本场活动自由分享） */}
          {config.allowDynamic && (
            <section className="drawer-section-card">
              <div className="section-header-flex">
                <h4 className="section-title">
                  <Camera size={16} color="#8b5cf6" /> 活动精彩瞬间
                </h4>
                <button
                  type="button"
                  className="link-btn-text"
                  onClick={() => {
                    onClose();
                    onOpenDiscussion(activity);
                  }}
                >
                  查看活动瞬间 ›
                </button>
              </div>

              {/* 活动瞬间入口卡片：不设置讨论主题 */}
              <div
                className="drawer-discussion-bridge-card"
                onClick={() => {
                  onClose();
                  onOpenDiscussion(activity);
                }}
                title="查看或维护本场活动的精彩瞬间"
              >
                <div className="drawer-topic-header-row">
                  <span className="topic-badge-chip neutral">📷 成员分享</span>
                  <span className="topic-title-plain">成员可自由分享照片、视频片段或活动感受，不设固定讨论主题</span>
                </div>

                <div className="drawer-topic-stats-row">
                  <span>已有 <strong>{contributions.length}</strong> 份成员分享</span>
                  {featuredContributions.length > 0 && <span className="featured-pill-mini">★ {featuredContributions.length} 份精选展示</span>}
                  <span className="go-page-link">查看全部 ›</span>
                </div>
              </div>

              {/* 成员分享预览 */}
              {contributions.length > 0 ? (
                <div className="drawer-contrib-preview-list">
                  {contributions.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      className={`drawer-contrib-bubble ${item.isFeatured ? "featured" : ""}`}
                      onClick={() => {
                        onClose();
                        onOpenDiscussion(activity);
                      }}
                      title="点击查看活动瞬间详情"
                    >
                      <div className="bubble-author-row">
                        <span className="bubble-author-name">{item.name}</span>
                        <span className="bubble-author-role">{item.role}</span>
                        <span className="bubble-time">{item.time}</span>
                        {item.isFeatured && <span className="bubble-featured-star">★ 精选展示</span>}
                      </div>
                      <p className="bubble-text">{item.text}</p>
                    </div>
                  ))}
                  {contributions.length > 2 && (
                    <button
                      type="button"
                      className="btn-view-more-contribs"
                      onClick={() => {
                        onClose();
                        onOpenDiscussion(activity);
                      }}
                    >
                      查看全部 {contributions.length} 份分享 ›
                    </button>
                  )}
                </div>
              ) : (
                <div
                  className="drawer-contrib-empty-hint"
                  onClick={() => {
                    onClose();
                    onOpenDiscussion(activity);
                  }}
                >
                  暂无成员分享，点击记录本场活动的第一个精彩瞬间 ›
                </div>
              )}
            </section>
          )}
        </div>

        {/* 抽屉底部常驻操作条：完整闭环支持社长跟进，无需回退列表 */}
        <footer className="activity-drawer-footer">
          <div className="drawer-footer-left">
            {!isArchived && onOpenDelete && (
              <button
                type="button"
                className="btn-drawer-danger-text"
                onClick={() => {
                  onClose();
                  onOpenDelete(activity);
                }}
              >
                取消本场活动
              </button>
            )}
          </div>
          <div className="drawer-footer-right">
            {!isArchived && onOpenEdit && (
              <button
                type="button"
                className="btn-clean-secondary"
                onClick={() => {
                  onClose();
                  onOpenEdit(activity);
                }}
              >
                编辑活动信息
              </button>
            )}

            {/* 优先级 1：考勤未完成（待开展除外） */}
            {!isArchived && !isUpcoming && needsAttendance && (
              <button
                type="button"
                className="primary"
                onClick={() => onOpenAttendance(activity)}
              >
                考勤点名
              </button>
            )}

            {/* 优先级 2：考勤已完成，但活动记录未填写 */}
            {!isArchived && !isUpcoming && !needsAttendance && needsRecord && (
              <button
                type="button"
                className="primary"
                onClick={() => onOpenRecord(activity)}
              >
                填写活动记录
              </button>
            )}

            {/* 其他情况：完成浏览 */}
            {(isUpcoming || (!needsAttendance && !needsRecord) || isArchived) && (
              <button
                type="button"
                className="primary"
                onClick={onClose}
              >
                完成浏览
              </button>
            )}
          </div>
        </footer>
      </aside>
    </div>
  );
}

// 单场活动精彩瞬间页：社长可查看与维护，成员围绕活动自由分享。
function ActivityDiscussionPage({
  club,
  activity,
  members,
  isArchived,
  onBack,
  onToggleFeatured,
  onAddContribution,
  onNotify,
}) {
  const [filterTab, setFilterTab] = useState("all"); // "all" | "mine" | "featured"
  const [inputText, setInputText] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const contributions = activity.contributions || [];
  const featuredContributions = contributions.filter((c) => c.isFeatured);
  const displayedContributions = filterTab === "featured" ? featuredContributions : filterTab === "mine" ? contributions.filter((item) => item.name === "赵子易") : contributions;

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim() && !selectedPhotos.length) return;
    onAddContribution(activity.id, { text: inputText, photos: selectedPhotos });
    setInputText("");
    setSelectedPhotos([]);
    if (onNotify) onNotify("精彩瞬间已发布，仅社团成员可见。");
  };

  const isUpcoming = activity.status === "upcoming";
  const isOngoing = activity.status === "ongoing";
  const isCompleted = activity.status === "completed";

  // 统计指标
  const participantCount = new Set(contributions.map((c) => c.name)).size;

  return (
    <div className="activity-discussion-page-container">
      {/* 顶部返回与导航栏 */}
      <header className="discussion-page-header">
        <div className="discussion-header-left">
          <button type="button" className="btn-back-link" onClick={onBack}>
            <ArrowLeft size={16} /> 返回社团活动
          </button>
          <div className="discussion-header-titles">
            <div className="discussion-eyebrow">
              <span>{club.name}</span>
              <span className="eyebrow-sep">/</span>
              <span>活动精彩瞬间</span>
            </div>
            <div className="discussion-main-title-row">
              <h2>{activity.title}</h2>
              {isUpcoming && <span className="status-badge pending"><i className="badge-dot" /> 待开展</span>}
              {isOngoing && <span className="status-badge ongoing"><i className="badge-dot" /> 进行中</span>}
              {isCompleted && <span className="status-badge completed"><i className="badge-dot" /> 已结束</span>}
            </div>
          </div>
        </div>
        <div className="discussion-header-right">
          <div className="activity-quick-meta">
            <span><Clock size={14} /> {activity.date}</span>
            <span className="meta-divider" />
            <span><MapPin size={14} /> {activity.venue}</span>
          </div>
        </div>
      </header>

      {/* 主体两栏布局 */}
      <div className={`discussion-page-body ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
        {/* 左侧栏：活动说明与分享概览 */}
        <aside className="discussion-sidebar">
          <button type="button" className="moment-sidebar-toggle" onClick={() => setSidebarCollapsed((value) => !value)}>{sidebarCollapsed ? "展开信息" : "收起信息"}</button>
          {/* 1. 分享说明：不设置讨论主题 */}
          <div className="topic-focus-card free-topic">
            <div className="topic-card-header">
              <span className="topic-badge-icon">
                📷 成员分享
              </span>
            </div>
            <div className="topic-card-body">
              <h3 className="topic-card-title">记录本场活动的精彩片段</h3>
              <p className="topic-card-desc">社团成员可自由分享照片、视频或活动感受；仅本社团成员可见。</p>
            </div>
          </div>

          {/* 2. 活动基本档案信息 */}
          <div className="sidebar-info-card">
            <h4 className="sidebar-card-title">活动信息与约定</h4>
            <div className="sidebar-info-list">
              <div className="sidebar-info-item">
                <span className="info-lbl">活动时间</span>
                <span className="info-val">{activity.date}</span>
              </div>
              <div className="sidebar-info-item">
                <span className="info-lbl">活动场地</span>
                <span className="info-val">{activity.venue}</span>
              </div>
              <div className="sidebar-info-item">
                <span className="info-lbl">参与对象</span>
                <span className="info-val">本社团正式成员（{members.length} 人）</span>
              </div>
              <div className="sidebar-info-item">
                <span className="info-lbl">组织负责人</span>
                <span className="info-val">赵子易（学生社长）</span>
              </div>
              {activity.desc && (
                <div className="sidebar-info-item desc-item">
                  <span className="info-lbl">活动说明</span>
                  <p className="info-desc">{activity.desc}</p>
                </div>
              )}
            </div>
          </div>

          {/* 3. 分享概览 */}
          <div className="sidebar-stats-card">
            <div className="stat-stat-box">
              <span className="stat-num">{contributions.length}</span>
              <span className="stat-lbl">累计分享</span>
            </div>
            <div className="stat-stat-box highlight">
              <span className="stat-num">{featuredContributions.length}</span>
              <span className="stat-lbl">精选展示 ★</span>
            </div>
            <div className="stat-stat-box">
              <span className="stat-num">{participantCount}</span>
              <span className="stat-lbl">参与成员</span>
            </div>
          </div>
        </aside>

        {/* 右侧栏：分享流与发布区 */}
        <main className="discussion-main-stream">
          {/* 分享发布区 */}
          <div className="discussion-composer-card">
            <div className="composer-header">
              <span className="composer-as-user">
                以 <strong>赵子易（社长）</strong> 身份发布分享
              </span>
              <span className="composer-tip">可将优质内容设为精选展示</span>
            </div>
            <form onSubmit={handleSend}>
              <textarea
                className="composer-textarea"
                rows={3}
                placeholder="记录本场活动中值得分享的片段、感受或收获..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    handleSend(e);
                  }
                }}
              />
              <div className="composer-footer">
                <div className="quick-tags">
                  <button
                    type="button"
                    className="quick-tag-chip"
                    onClick={() => setInputText((prev) => prev ? `${prev} 建议大家注意传切节奏，下半场保持体能分配！` : "建议大家注意传切节奏，下半场保持体能分配！")}
                  >
                    + 记录现场片段
                  </button>
                  <button
                    type="button"
                    className="quick-tag-chip"
                    onClick={() => setInputText((prev) => prev ? `${prev} 防守时注意相互补位，多呼应！` : "防守时注意相互补位，多呼应！")}
                  >
                    + 分享活动收获
                  </button>
                </div>
                <div className="manage-moment-photo-picker" aria-label="选择分享配图">
                  {discussionPhotoPool.slice(0, 3).map((src) => <button type="button" key={src} className={selectedPhotos.includes(src) ? "selected" : ""} onClick={() => setSelectedPhotos((previous) => previous.includes(src) ? previous.filter((item) => item !== src) : previous.length < 3 ? [...previous, src] : previous)}><img src={src} alt="选择活动图片" /></button>)}
                </div>
                <button
                  type="submit"
                  className="primary compact btn-send-contrib"
                  disabled={(!inputText.trim() && !selectedPhotos.length) || isArchived}
                >
                  <PaperPlaneTilt size={14} /> 发布分享
                </button>
              </div>
            </form>
          </div>

          {/* 筛选过滤栏 */}
          <div className="stream-filter-toolbar">
            <div className="stream-tabs">
              <button
                type="button"
                className={`stream-tab-btn ${filterTab === "all" ? "active" : ""}`}
                onClick={() => setFilterTab("all")}
              >
                全部分享（{contributions.length}）
              </button>
              <button type="button" className={`stream-tab-btn ${filterTab === "mine" ? "active" : ""}`} onClick={() => setFilterTab("mine")}>我的分享</button>
              <button
                type="button"
                className={`stream-tab-btn featured-tab ${filterTab === "featured" ? "active" : ""}`}
                onClick={() => setFilterTab("featured")}
              >
                ★ 精选展示（{featuredContributions.length}）
              </button>
            </div>
            <span className="stream-hint-text">
              精选仅用于社团内展示；精彩瞬间本身不直接折算学时或学分
            </span>
          </div>

          {/* 发言列表 */}
          <div className="contributions-stream-list">
            {displayedContributions.length === 0 ? (
              <div className="stream-empty-state">
                {filterTab === "featured" ? (
                  <>
                    <p className="empty-title">暂无精选展示</p>
                    <p className="empty-sub">切换到「全部分享」，社长可将值得展示的内容设为精选。</p>
                  </>
                ) : (
                  <>
                    <p className="empty-title">本场活动暂无精彩瞬间</p>
                    <p className="empty-sub">在上方记录第一个值得分享的片段吧！</p>
                  </>
                )}
              </div>
            ) : (
              displayedContributions.map((item) => {
                const isFeatured = item.isFeatured;
                return (
                  <div className={`discussion-item-card ${isFeatured ? "is-featured" : ""}`} key={item.id}>
                    <div className="item-header-row">
                      <div className="item-user-info">
                        <div className={`user-avatar-circle role-${item.role}`}>
                          {item.name.slice(0, 1)}
                        </div>
                        <div className="user-details">
                          <div className="name-and-badges">
                            <strong className="user-name">{item.name}</strong>
                            <span className="user-class-tag">{item.class}</span>
                            <span className={`user-role-badge role-${item.role}`}>{item.role}</span>
                            {isFeatured && (
                              <span className="featured-crown-badge">
                                ★ 优质贡献
                              </span>
                            )}
                          </div>
                          <span className="post-time">{item.time}</span>
                        </div>
                      </div>

                      <div className="item-action-area">
                        {!isArchived && (
                          <button
                            type="button"
                            className={`btn-feature-action ${isFeatured ? "active" : ""}`}
                            onClick={() => {
                              onToggleFeatured(activity.id, item.id);
                              if (onNotify) {
                                onNotify(isFeatured ? `已取消「${item.name}」的精选展示。` : `已将「${item.name}」的分享设为精选展示。`);
                              }
                            }}
                          >
                            {isFeatured ? "★ 已设为精选展示（点击取消）" : "☆ 设为精选展示"}
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="item-content-text">{item.text}</p>
                    {item.photos?.length ? <div className="manage-moment-images">{item.photos.map((src) => <img key={src} src={src} alt="活动瞬间" />)}</div> : null}

                    {isFeatured && (
                      <div className="item-featured-banner">
                        <Star size={13} weight="fill" color="#eab308" />
                        <span>该内容已由社长设为精选展示，便于社团成员浏览。</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// ===== 学期报告（迁移自旧版学生端分析报告） =====

const reportClubs = [
  {
    id: "football",
    name: "足球联盟",
    category: "体育",
    members: 18,
    events: [
      { id: "fb-01", name: "校园足球联赛首轮", date: "9 月 12 日", time: "16:20", place: "西操场", note: "联赛首轮对阵高一联队，8 人制，请穿深色球衣并提前 15 分钟到场。" },
      { id: "fb-02", name: "常规训练", date: "9 月 19 日", time: "16:20", place: "西操场", recurring: "每周三", note: "传接球与分组对抗，新加入的同学优先参加。" },
      { id: "fb-03", name: "战术分析课", date: "9 月 26 日", time: "12:30", place: "体育组会议室", recurring: "每两周", note: "复盘首轮比赛录像，讲解边路进攻的跑位要求。" },
      { id: "fb-04", name: "师生友谊赛", date: "10 月 3 日", time: "15:00", place: "西操场", note: "与教师代表队进行友谊赛，赛后合影留念。" },
      { id: "fb-05", name: "体能训练", date: "10 月 10 日", time: "16:20", place: "田径场", recurring: "每周三", note: "折返跑与核心力量练习，请自备饮用水。" },
      { id: "fb-06", name: "校内八人制联赛", date: "10 月 17 日", time: "16:20", place: "西操场", note: "对阵高二年级代表队，胜者进入四强。" },
      { id: "fb-07", name: "校园友谊赛", date: "10 月 23 日", time: "16:20", place: "西操场", note: "与摄影社联队进行友谊赛，欢迎同学到场加油。" },
      { id: "fb-07b", name: "常规训练", date: "10 月 26 日", time: "16:20", place: "西操场", note: "定位球与防守站位练习，今天进行中。" },
      { id: "fb-08", name: "日常训练", date: "10 月 30 日", time: "16:20", place: "西操场", recurring: "每周三", note: "定位球与防守站位练习，全队参加。" },
      { id: "fb-09", name: "校内联赛半决赛", date: "11 月 6 日", time: "17:00", place: "西操场", note: "半决赛，请提前到场热身并带好护腿板。" },
      { id: "fb-10", name: "日常训练", date: "11 月 13 日", time: "16:20", place: "西操场", recurring: "每周三", note: "小场对抗与射门练习。" },
      { id: "fb-11", name: "校际交流赛", date: "11 月 20 日", time: "16:20", place: "西操场", note: "与兄弟学校球队交流比赛，需统一着装。" },
      { id: "fb-12", name: "学期总结训练", date: "11 月 27 日", time: "16:20", place: "西操场", note: "本学期最后一次集中训练，进行总结与表彰。" },
    ],
  },
  {
    id: "drama",
    name: "光影戏剧社",
    category: "艺术",
    members: 24,
    events: [
      { id: "dr-01", name: "剧本围读", date: "10 月 8 日", time: "15:30", place: "报告厅", note: "分发本学期剧本，逐角色试读并确认分工。" },
      { id: "dr-02", name: "分场排练", date: "10 月 15 日", time: "15:30", place: "报告厅", recurring: "每周四", note: "按场次分组排练，演员需提前熟悉台词。" },
      { id: "dr-03", name: "全剧联排", date: "10 月 21 日", time: "15:30", place: "报告厅", note: "灯光、音效与演员合练，检查换场衔接。" },
      { id: "dr-04", name: "校园艺术节展演", date: "10 月 24 日", time: "18:30", place: "报告厅", note: "面向全校演出，17:30 集合化妆并检查道具。" },
      { id: "dr-05", name: "演出复盘会", date: "11 月 5 日", time: "15:30", place: "阶梯教室", note: "回看演出录像，总结台词与走位问题。" },
      { id: "dr-06", name: "形体与台词训练", date: "11 月 12 日", time: "15:30", place: "舞蹈教室", recurring: "每两周", note: "基础形体练习与台词气息训练，请穿宽松衣物。" },
    ],
  },
];

const reportJoin = { football: "joined", drama: "joined", robot: "pending" };

// 考勤由社长按场次设置并统一确认，学生端只读结果。
const reportAttendance = {
  football: {
    "fb-01": { mode: "rollcall", status: "present", confirmedAt: "9 月 12 日 18:05" },
    "fb-02": { mode: "qr", status: "present", confirmedAt: "9 月 19 日 16:20" },
    "fb-03": { mode: "rollcall", status: "absent", confirmedAt: "9 月 26 日 12:45" },
    "fb-04": { mode: "rollcall", status: "leave", confirmedAt: "10 月 3 日 14:20", note: "已请假：校队集训冲突" },
    "fb-05": { mode: "qr", status: "pending", confirmedAt: "10 月 10 日 16:31" },
    "fb-06": { mode: "rollcall", status: "pending" },
    "fb-07": { mode: "qr", status: "present", confirmedAt: "10 月 23 日 16:22" },
    "fb-07b": { mode: "qr", status: "pending" },
  },
  drama: {
    "dr-01": { mode: "rollcall", status: "present", confirmedAt: "10 月 8 日 17:10" },
    "dr-02": { mode: "qr", status: "present", confirmedAt: "10 月 15 日 17:02" },
    "dr-03": { mode: "rollcall", status: "leave", confirmedAt: "10 月 21 日 14:05", note: "已请假：课程冲突" },
    "dr-04": { mode: "rollcall", status: "present", confirmedAt: "10 月 24 日 20:30" },
  },
};

const reportCreditApplications = {
  football: { hours: 6, status: "approved" },
  drama: { hours: 6, status: "approved" },
};

// 成员学分规则：满 6 学时得 3 学分，每超 1 学时加 1 学分，封顶 6 学分。
function reportCredits(hours = 0) {
  const value = Number(hours) || 0;
  if (value < 6) return 0;
  return Math.min(6, 3 + (value - 6));
}

// 封面 AI 播报员轮播文案
const AI_BROADCAST_LINES = [
  "要我把这学期讲给你听吗？",
  "点我，30 秒读完这学期",
];

function parsePostDate(text = "") {
  const match = text.match(/(\d+)\s*月\s*(\d+)\s*日/);
  return match ? { month: Number(match[1]), day: Number(match[2]) } : null;
}

const reportDiscussions = {
  football: {
    "fb-01": {
      topic: {
        source: "leader",
        title: "联赛首轮：最后十分钟我们靠什么稳住了局面？",
        intro: "社长发起：这场比赛的转折点在最后十分钟。可以聊聊你看到的跑位、传接选择，也可以说说自己在场上的感受。",
        author: "赵子安",
        createdAt: "9 月 12 日 18:20",
      },
      posts: [
        { id: "fb-01-p1", author: "赵子安", role: "社长", time: "9 月 12 日 18:22", text: "先说我自己的判断：最后阶段我们把边路压上去了，但中场没有跟着前顶，所以有一段时间后场出球很别扭。", featured: true },
        { id: "fb-01-p2", author: "我", role: "成员", time: "9 月 12 日 19:05", text: "我在右路，印象最深的是第 78 分钟那次回追。当时队长喊我先回到边线，等我到位后他才上抢，这一步把对方的传球路线堵死了。", featured: true },
        { id: "fb-01-p3", author: "林知夏", role: "成员", time: "9 月 12 日 20:10", text: "场边看得很清楚，最后十分钟大家没有再盲目往前压，而是先把球控在脚下，节奏一下就稳了。" },
        { id: "fb-01-p4", author: "顾一然", role: "成员", time: "9 月 13 日 08:40", text: "建议下次训练专门练一下领先后怎么控节奏，尤其是边后卫和中场的距离。" },
        { id: "fb-01-p5", author: "赵子安", role: "社长", time: "9 月 13 日 12:15", text: "收到，周三训练会加一组 5 分钟控球对抗，重点看丢球后的第一反应。" },
      ],
    },
    "fb-02": {
      topic: {
        source: "leader",
        title: "常规训练：新同学的第一次分组对抗",
        intro: "社长发起：这次训练加入了 4 位新同学，大家可以从配合、跑位和沟通三个角度给点建议。",
        author: "赵子安",
        createdAt: "9 月 19 日 18:30",
      },
      posts: [
        { id: "fb-02-p1", author: "我", role: "成员", time: "9 月 19 日 19:12", text: "第一次和学长们踢分组对抗，节奏比想象中快。印象最深的是接球前要先观察身后，不然很容易被逼到边线。", featured: true },
        { id: "fb-02-p2", author: "沈星野", role: "成员", time: "9 月 19 日 20:02", text: "新同学跑位很积极，几次反越位都跑出来了，就是最后一脚可以再稳一点。" },
        { id: "fb-02-p3", author: "赵子安", role: "社长", time: "9 月 20 日 09:10", text: "这次训练整体不错。下周会把传接球练习放在分组对抗前面，让大家先把脚下感觉找回来。" },
      ],
    },
    "fb-03": {
      topic: null,
      posts: [
        { id: "fb-03-p1", author: "林知夏", role: "成员", time: "9 月 26 日 13:05", text: "今天复盘的那段录像里，边路进攻的跑位其实有两次已经跑出来了，只是传球慢了半拍。", featured: true },
        { id: "fb-03-p2", author: "我", role: "成员", time: "9 月 26 日 13:20", text: "我也注意到了。感觉不是看不到，而是接球后习惯先停一下，等抬头的时候防守已经回收了。" },
        { id: "fb-03-p3", author: "顾一然", role: "成员", time: "9 月 26 日 14:02", text: "可以试试一脚出球，训练时把触球次数限制在两脚以内。" },
        { id: "fb-03-p4", author: "赵子安", role: "社长", time: "9 月 26 日 18:40", text: "这个建议不错，下次训练加一个两脚出球的小游戏，输的一组做折返跑。" },
      ],
    },
    "fb-04": {
      topic: {
        source: "leader",
        title: "师生友谊赛：赛后想听听大家的收获",
        intro: "社长发起：和教师代表队的比赛结果不重要，更想听听大家在场上发现了什么问题。",
        author: "赵子安",
        createdAt: "10 月 3 日 17:10",
      },
      posts: [
        { id: "fb-04-p1", author: "沈星野", role: "成员", time: "10 月 3 日 18:00", text: "教师队的传球很稳，很少丢球。我们在逼抢的时候太着急，几个人一起上，反而把中间漏了。" },
        { id: "fb-04-p2", author: "我", role: "成员", time: "10 月 3 日 19:30", text: "我也有同感。下次可以先把中路封住，再引他们把球传到边路。" },
      ],
    },
    "fb-05": {
      topic: null,
      posts: [
        { id: "fb-05-p1", author: "顾一然", role: "成员", time: "10 月 10 日 17:00", text: "今天的折返跑比上次多了一组，最后冲刺的时候腿有点沉，大家记得回去拉伸。" },
        { id: "fb-05-p2", author: "我", role: "成员", time: "10 月 10 日 17:20", text: "核心力量那组动作我第一次做，腰有点借力，下次想请社长帮忙看一下姿势。" },
        { id: "fb-05-p3", author: "赵子安", role: "社长", time: "10 月 10 日 18:05", text: "可以，下次训练前我单独带你过一遍动作，先把基础姿势固定住。" },
      ],
    },
    "fb-06": {
      topic: {
        source: "leader",
        title: "八人制联赛：四强战的防守站位怎么调？",
        intro: "社长发起：下一场对手喜欢打身后，大家可以结合这场比赛的失球聊聊防守站位。",
        author: "赵子安",
        createdAt: "10 月 17 日 18:40",
      },
      posts: [
        { id: "fb-06-p1", author: "我", role: "成员", time: "10 月 17 日 19:15", text: "第二个失球是边后卫和中卫之间空太大，对方一脚直塞就穿了。我觉得可以先收窄一点，把边路让给他们传中。", featured: true },
        { id: "fb-06-p2", author: "林知夏", role: "成员", time: "10 月 17 日 20:00", text: "同意，而且我们回追的时候都在看球，没有人看身后的前锋。" },
        { id: "fb-06-p3", author: "赵子安", role: "社长", time: "10 月 18 日 08:30", text: "这场先按你说的收窄防守，训练时我会专门练一下造越位的时机。" },
      ],
    },
    "fb-07": {
      topic: null,
      posts: [
        { id: "fb-07-p1", author: "我", role: "成员", time: "10 月 23 日 18:10", text: "和摄影社联队的友谊赛氛围很好，大家踢得比较放松。我觉得这种跨社团的比赛可以多组织几次。", featured: true },
        { id: "fb-07-p2", author: "沈星野", role: "成员", time: "10 月 23 日 19:20", text: "同意，而且他们帮我们拍了不少照片，已经在社团风采里了。" },
        { id: "fb-07-p3", author: "赵子安", role: "社长", time: "10 月 24 日 09:05", text: "下学期可以固定成每月一次，和不同社团约比赛。" },
      ],
    },
    "fb-07b": { topic: null, posts: [] },
  },
  drama: {
    "dr-04": {
      topic: {
        source: "leader",
        title: "艺术节展演：谢幕之后，想听听大家的复盘",
        intro: "社长发起：这次展演有很多第一次，欢迎从表演、灯光、道具任何一个角度说说你的感受。",
        author: "李若彤",
        createdAt: "10 月 24 日 21:30",
      },
      posts: [
        { id: "dr-04-p1", author: "李若彤", role: "社长", time: "10 月 24 日 21:35", text: "先谢谢大家。第三幕换场比联排时快了将近 20 秒，这是所有人配合的结果。", featured: true },
        { id: "dr-04-p2", author: "周予宁", role: "成员", time: "10 月 24 日 22:10", text: "灯光组在追光上还有一点抖，主要是换色时手忙了一下，下次可以把色纸提前分好。" },
      ],
    },
  },
};

function reportAttendanceSummary(records = {}) {
  const list = Object.values(records);
  return {
    total: list.length,
    present: list.filter((item) => item.status === "present").length,
    absent: list.filter((item) => item.status === "absent").length,
    leave: list.filter((item) => item.status === "leave").length,
    waiting: list.filter((item) => item.status === "pending").length,
  };
}

function normalizeReportEvent(event) {
  if (typeof event !== "string") return event;
  const parts = event.split(" · ");
  const when = parts[0] || "";
  const dateMatch = when.match(/(\d+)\s*月\s*(\d+)\s*日/);
  const timeMatch = when.match(/(\d{1,2}:\d{2})/);
  return {
    id: event,
    name: parts.length >= 3 ? parts[2] : (parts[1] || "社团活动"),
    date: dateMatch ? `${dateMatch[1]} 月 ${dateMatch[2]} 日` : "时间待定",
    time: timeMatch ? timeMatch[1] : "",
    place: parts.length >= 3 ? parts[1] : "地点待定",
    note: "",
  };
}

function reportEventMonthDay(event) {
  const match = String(event?.date || "").match(/(\d+)\s*月\s*(\d+)\s*日/);
  if (!match) return null;
  return { month: Number(match[1]), day: Number(match[2]) };
}

function ReportSection({ index, title, caption, children }) {
  return (
    <section className="report-section">
      <header className="report-section-head">
        <span className="report-section-index">{index}</span>
        <div>
          <h2>{title}</h2>
          {caption && <p>{caption}</p>}
        </div>
      </header>
      <div className="report-section-body">{children}</div>
    </section>
  );
}

function ReportPage() {
  const [aiOpen, setAiOpen] = useState(false);
  const [aiStatus, setAiStatus] = useState("idle");
  const [aiCopied, setAiCopied] = useState(false);
  const [aiLineIndex, setAiLineIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAiLineIndex((index) => (index + 1) % AI_BROADCAST_LINES.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (aiStatus !== "loading") return undefined;
    const timer = window.setTimeout(() => setAiStatus("done"), 1100);
    return () => window.clearTimeout(timer);
  }, [aiStatus]);

  useEffect(() => {
    if (!aiCopied) return undefined;
    const timer = window.setTimeout(() => setAiCopied(false), 2600);
    return () => window.clearTimeout(timer);
  }, [aiCopied]);

  const openAi = () => {
    setAiCopied(false);
    setAiStatus("loading");
    setAiOpen(true);
  };

  const joinedClubs = reportClubs.filter((club) => reportJoin[club.id] === "joined");
  const pendingClubs = reportClubs.filter((club) => reportJoin[club.id] === "pending");

  const perClub = joinedClubs.map((club) => {
    const records = reportAttendance[club.id] || {};
    const events = club.events.map(normalizeReportEvent);
    const tracked = events
      .filter((event) => records[event.id])
      .sort((a, b) => {
        const left = reportEventMonthDay(a) || { month: 0, day: 0 };
        const right = reportEventMonthDay(b) || { month: 0, day: 0 };
        return left.month - right.month || left.day - right.day;
      });
    const summary = reportAttendanceSummary(records);
    const board = reportDiscussions[club.id] || {};
    const myPosts = Object.entries(board).flatMap(([eventId, entry]) =>
      (entry.posts || [])
        .filter((post) => post.author === "我")
        .map((post) => ({ ...post, eventId, day: parsePostDate(post.time) })),
    );
    return {
      club,
      records,
      events,
      tracked,
      summary,
      myPosts,
      myFeatured: myPosts.filter((post) => post.featured),
      topics: Object.values(board).filter((entry) => entry.topic).length,
      application: reportCreditApplications[club.id],
    };
  });

  const totals = perClub.reduce((acc, item) => ({
    clubs: acc.clubs + 1,
    tracked: acc.tracked + item.tracked.length,
    present: acc.present + item.summary.present,
    absent: acc.absent + item.summary.absent,
    leave: acc.leave + item.summary.leave,
    waiting: acc.waiting + item.summary.waiting,
    posts: acc.posts + item.myPosts.length,
    featured: acc.featured + item.myFeatured.length,
    topics: acc.topics + item.topics,
    hoursEligible: acc.hoursEligible + item.summary.present * 2,
    hoursSubmitted: acc.hoursSubmitted + (item.application ? item.application.hours || 0 : 0),
    hoursApproved: acc.hoursApproved + (item.application?.status === "approved" ? item.application.hours || 0 : 0),
  }), {
    clubs: 0, tracked: 0, present: 0, absent: 0, leave: 0, waiting: 0,
    posts: 0, featured: 0, topics: 0,
    hoursEligible: 0, hoursSubmitted: 0, hoursApproved: 0,
  });

  const attended = totals.present;
  const rate = totals.tracked ? Math.round((attended / totals.tracked) * 100) : 0;

  const featuredList = perClub.flatMap((item) => item.myFeatured.map((post) => ({
    club: item.club,
    post,
    eventName: (item.events.find((event) => event.id === post.eventId) || {}).name || "社团活动",
  })));

  // 我的发言足迹：按"活动"归组统计我的发言，替代原来不易理解的发言日历
  const trail = perClub.flatMap((item, clubIndex) => {
    const byEvent = {};
    item.myPosts.forEach((post) => {
      if (!byEvent[post.eventId]) byEvent[post.eventId] = { count: 0, featured: 0, last: post.time };
      const row = byEvent[post.eventId];
      row.count += 1;
      if (post.featured) row.featured += 1;
      if (post.time > row.last) row.last = post.time;
    });
    return Object.entries(byEvent).map(([eventId, info]) => ({
      key: `${item.club.id}-${eventId}`,
      clubIndex,
      club: item.club,
      eventName: (item.events.find((event) => event.id === eventId) || {}).name || "社团活动",
      last: info.last,
      count: info.count,
      featured: info.featured,
    }));
  }).sort((a, b) => (a.last < b.last ? 1 : -1));

  const leaderClub = managedClubsList.find((club) => club.role === "leader");

  // 总览指标：按首页 KPI 口径合并同类项 —— 社团（管理+参与）/ 出勤（场次+已出勤）/ 分享（分享+精选）/ 学时（含已认定学分）
  const approvedCreditsNum = Number(reportCredits(totals.hoursApproved)) || 0;
  // football 既是「我管理的」也在 reportJoin 里为 joined，需按 id 去重，避免重复计数
  const leaderIds = new Set(managedClubsList.filter((club) => club.role === "leader").map((club) => club.id));
  const leaderOnlyCount = perClub.filter((item) => leaderIds.has(item.club.id)).length;
  const joinedOnlyCount = totals.clubs - leaderOnlyCount;
  const metrics = [
    {
      icon: <PuzzlePiece size={16} weight="bold" />,
      value: totals.clubs,
      unit: "个",
      label: "我的社团",
      note: `我管理 ${leaderOnlyCount} 个 · 我加入 ${joinedOnlyCount} 个`,
    },
    {
      icon: <CalendarDots size={16} weight="bold" />,
      value: attended,
      unit: "场",
      label: "活动出勤",
      note: `共 ${totals.tracked} 场 · 出勤率 ${rate}%`,
    },
    {
      icon: <ChatCircleDots size={16} weight="bold" />,
      value: totals.posts,
      unit: "条",
      label: "活动分享",
      note: `精选 ${totals.featured} 条`,
    },
    {
      icon: <Coins size={16} weight="bold" />,
      value: totals.hoursEligible,
      unit: "学时",
      label: "累计学时",
      // 无已认定学分时整条小字不显示
      note: approvedCreditsNum > 0 ? `已认定 ${approvedCreditsNum} 学分` : null,
    },
  ].filter(Boolean);

  const personas = [
    totals.tracked >= 6
      ? { icon: <Medal size={13} weight="fill" />, label: "高频到场" }
      : totals.tracked > 0
        ? { icon: <Student size={13} weight="fill" />, label: "稳定参与" }
        : null,
    totals.posts >= 5
      ? { icon: <ChatCircleDots size={13} weight="fill" />, label: "讨论活跃" }
      : totals.posts > 0
        ? { icon: <ChatCircleDots size={13} weight="fill" />, label: "偶尔发言" }
        : null,
    totals.featured >= 1 && { icon: <Star size={13} weight="fill" />, label: "金句制造者" },
    totals.clubs >= 2 && { icon: <PuzzlePiece size={13} weight="fill" />, label: "多社团玩家" },
  ].filter(Boolean);

  const termEvents = perClub.reduce((sum, item) => sum + item.events.length, 0);
  const maxHours = termEvents * 2;
  const creditsEarned = reportCredits(totals.hoursApproved);

  // 社长视角：全社口径（与「我的」出勤、发言区分）
  const leaderEvents = leaderClub ? (reportClubs.find((club) => club.id === leaderClub.id)?.events || []) : [];
  const leaderRecords = leaderClub ? reportAttendance[leaderClub.id] || {} : {};
  const leaderHeld = Object.keys(leaderRecords).length;
  const leaderBoardEntries = leaderClub ? Object.values(reportDiscussions[leaderClub.id] || {}) : [];
  const leaderPosts = leaderBoardEntries.reduce((sum, entry) => sum + (entry.posts || []).filter((post) => post.role !== "社长").length, 0);
  const leaderTopics = leaderBoardEntries.filter((entry) => entry.topic).length;
  const leaderFeatured = leaderBoardEntries.reduce((sum, entry) => sum + (entry.posts || []).filter((post) => post.featured).length, 0);
  const leaderVoices = new Set(leaderBoardEntries.flatMap((entry) => (entry.posts || []).filter((post) => post.role !== "社长").map((post) => post.author))).size;
  const leaderMembers = leaderClub?.membersCount || 0;
  const leaderCapacity = leaderClub?.capacity || 0;
  const leaderParticipation = leaderMembers ? Math.round((leaderVoices / leaderMembers) * 100) : 0;
  // 全社口径为示意值：原型只有「我」的考勤记录，没有全员点名数据
  const leaderAttendanceRate = 86;
  // 社长运营学时按已开展活动每场 4 学时计（个人口径，不按全社人次折算）
  const leaderHours = leaderHeld * 4;
  // 社长运营社团同样计入个人学时：已认定部分按 40% 示意
  const leaderApprovedHours = Math.round(leaderHours * 0.4);
  const leaderCredits = reportCredits(leaderApprovedHours);
  const totalHours = totals.hoursEligible + (leaderClub ? leaderHours : 0);
  const totalApprovedHours = totals.hoursApproved + (leaderClub ? leaderApprovedHours : 0);
  const totalCredits = reportCredits(totalApprovedHours);
  const totalMaxHours = maxHours + (leaderClub ? leaderEvents.length * 4 : 0);
  const totalProgress = totalMaxHours ? Math.round((totalHours / totalMaxHours) * 100) : 0;

  const leaderMetrics = leaderClub ? [
    { icon: <Student size={15} weight="bold" />, label: "社团成员", value: leaderMembers, unit: `/ ${leaderCapacity} 人`, note: `入社率 ${leaderCapacity ? Math.round((leaderMembers / leaderCapacity) * 100) : 0}%` },
    { icon: <CalendarDots size={15} weight="bold" />, label: "本学期活动", value: leaderEvents.length, unit: "场", note: `已开展 ${leaderHeld} · 待开展 ${Math.max(leaderEvents.length - leaderHeld, 0)}` },
    { icon: <Clock size={15} weight="bold" />, label: "全社平均出勤率", value: leaderAttendanceRate, unit: "%", note: `按 ${leaderHeld} 场已开展活动统计` },
    { icon: <ChatCircleDots size={15} weight="bold" />, label: "发起话题", value: leaderTopics, unit: "个", note: `覆盖 ${leaderTopics} 场活动` },
    { icon: <ChatCircleDots size={15} weight="bold" />, label: "成员发言", value: leaderPosts, unit: "条", note: `参与率 ${leaderParticipation}%` },
    { icon: <Star size={15} weight="bold" />, label: "我设精选", value: leaderFeatured, unit: "条", note: "可作为成员学分证据" },
  ] : [];

  const rateWord = rate >= 90 ? "几乎场场都在" : rate >= 75 ? "稳稳的常驻选手" : "正在熟悉社团的节奏";

  const clubRates = perClub
    .filter((item) => item.tracked.length >= 2)
    .map((item) => ({
      name: item.club.name,
      rate: Math.round((item.summary.present / item.tracked.length) * 100),
    }))
    .sort((a, b) => a.rate - b.rate);
  const weakestClub = clubRates[0];
  const hoursGap = Math.max(maxHours - totals.hoursEligible, 0);
  const pendingHours = Math.max(totals.hoursEligible - totals.hoursSubmitted, 0);
  const reviewingHours = Math.max(totals.hoursSubmitted - totals.hoursApproved, 0);

  const aiInsight = {
    range: `${totals.clubs} 个社团 · ${totals.tracked} 场活动 · ${totals.posts} 条发言`,
    headline: `这学期你在 ${totals.clubs} 个社团里到场 ${attended} 次、发言 ${totals.posts} 条，${rateWord}。`,
    tags: [
      { label: rate >= 90 ? "场场都在" : rate >= 75 ? "到场小达人" : "慢慢进入状态", tone: "blue" },
      { label: totals.posts >= 5 ? "讨论常驻" : "开始发声", tone: "violet" },
      { label: totals.featured ? "金句制造机" : "精选在等你", tone: "amber" },
    ],
    highlight: featuredList.length
      ? `「${featuredList[0].eventName}」的发言被社长设为精选，可以直接当学分证据。`
      : "下次在讨论里说出一个具体细节，社长更容易看见你。",
    watch: [
      weakestClub && weakestClub.rate < 85
        ? { tone: "warn", text: `「${weakestClub.name}」出勤率 ${weakestClub.rate}%，是你几个社团里最低的，下次别错过签到。` }
        : { tone: "good", text: "各个社团的出勤都保持在 85% 以上，状态很稳。" },
      hoursGap > 0
        ? { tone: "warn", text: `距离满勤还差 ${hoursGap} 学时，再参加 ${Math.ceil(hoursGap / 2)} 场活动就能补上。` }
        : { tone: "good", text: `满勤 ${maxHours} 学时已经拿满，没有缺漏。` },
      totals.featured
        ? { tone: "good", text: `你有 ${totals.featured} 条精选发言，可以直接拿去申请学分。` }
        : { tone: "warn", text: "还没有精选发言，讨论里说得具体一点更容易被社长选中。" },
    ],
    todo: [
      pendingHours > 0 && { tone: "warn", text: `还有 ${pendingHours} 学时没提交认定，截止前记得提交。` },
      reviewingHours > 0 && { tone: "normal", text: `${reviewingHours} 学时已提交，正在等审核，不用重复提交。` },
      totals.waiting > 0 && { tone: "normal", text: `${totals.waiting} 场活动的出勤还没点名，结果稍后更新。` },
    ].filter(Boolean).slice(0, 2),
    goal: `下学期多参加 2 场活动，把出勤率守在 90% 以上，再冲 2 条精选。`,
  };

  const aiText = [
    "【一句话总评】",
    aiInsight.headline,
    "",
    "【我的高光】",
    aiInsight.highlight,
    "",
    "【需要关注】",
    ...aiInsight.watch.map((item) => `· ${item.text}`),
    "",
    "【别忘记】",
    ...aiInsight.todo.map((item) => `· ${item.text}`),
    "",
    "【下学期小目标】",
    aiInsight.goal,
  ].join("\n");

  const copyAiInsight = () => {
    setAiCopied(true);
    const clipboard = navigator.clipboard;
    if (clipboard) clipboard.writeText(aiText).catch(() => { });
  };

  if (joinedClubs.length === 0) {
    return (
      <div className="report-page-body">
        <section className="report-hero">
          <span className="report-hero-orb report-hero-orb-a" aria-hidden="true" />
          <span className="report-hero-watermark" aria-hidden="true">2026</span>
          <div className="report-hero-main">
            <span className="report-hero-eyebrow">2026—2027 学年 · 上学期</span>
            <h1>我的社团学期<em>图鉴</em></h1>
            <p className="report-hero-sub">赵子易 · 数据截至 2026 年 10 月 26 日</p>
          </div>
        </section>
        <div className="report-empty-state">
          <strong>本学期还没有可统计的社团数据</strong>
          <span>加入社团并参加活动后，报告会自动汇总你的出勤、讨论与风采记录。</span>
        </div>
      </div>
    );
  }

  return (
    <div className="report-page-body">
      <section className="report-hero">
        <span className="report-hero-orb report-hero-orb-a" aria-hidden="true" />
        <span className="report-hero-orb report-hero-orb-b" aria-hidden="true" />
        <span className="report-hero-watermark" aria-hidden="true">2026</span>
        <div className="report-hero-main">
          <span className="report-hero-eyebrow">2026—2027 学年 · 上学期</span>
          <h1>我的社团学期<em>图鉴</em></h1>
          <p className="report-hero-sub">赵子易 · 数据截至 2026 年 10 月 26 日</p>
          <div className="report-personas">
            {personas.map((persona, index) => (
              <span className={`report-persona tone-${["blue", "amber", "violet", "green"][index % 4]}`} key={persona.label}>
                {persona.icon}
                {persona.label}
              </span>
            ))}
          </div>
          <p className="report-hero-index">报告包含：总览{leaderClub ? " · 我管理的社团" : ""} · 活动参与 · 讨论贡献 · 学时与学分</p>
        </div>
        <div className="report-hero-side">
          <button type="button" className="report-ai-broadcast" onClick={openAi} aria-label="打开 AI 解读，30 秒读懂这学期">
            <span className="report-ai-halo" aria-hidden="true"><Sparkle size={15} weight="fill" /></span>
            <span className="report-ai-bubble">
              <strong className="report-ai-bubble-title">AI 解读</strong>
              <span className="report-ai-bubble-line" key={aiLineIndex}>{AI_BROADCAST_LINES[aiLineIndex]}</span>
            </span>
          </button>
          <div className="report-credit-badge" role="img" aria-label={`已获得 ${creditsEarned} 学分，对应 ${totals.hoursApproved} 学时`}>
            <div className="report-badge-ring">
              <span className="report-badge-cap">已获得学分</span>
              <strong className="report-badge-value">{creditsEarned}<em>学分</em></strong>
              <span className="report-badge-hours">{totals.hoursApproved} 学时</span>
            </div>
          </div>
        </div>
      </section>

      <ReportSection index="01" title="总览" caption="本学期社团参与的关键数字，一屏看清整体节奏。">
        <div className="report-metrics">
          {metrics.map((metric) => (
            <article className="report-metric" key={metric.label}>
              <span className="report-metric-icon">{metric.icon}</span>
              <strong>{metric.value}<em>{metric.unit}</em></strong>
              <span className="report-metric-label">{metric.label}</span>
              {metric.note ? <span className="report-metric-note">{metric.note}</span> : null}
            </article>
          ))}
        </div>
      </ReportSection>

      {leaderClub && (
        <ReportSection
          index="02"
          title="我管理的社团"
          caption={`${leaderClub.name} · 作为社长，全社的成员、活动与讨论运营情况。`}
        >
          <div className="report-cockpit">
            <div className="cockpit-metrics">
              {leaderMetrics.map((metric) => (
                <article className="cockpit-metric" key={metric.label}>
                  <span className="cockpit-metric-icon">{metric.icon}</span>
                  <strong>{metric.value}<em>{metric.unit}</em></strong>
                  <span className="cockpit-metric-label">{metric.label}</span>
                  <span className="cockpit-metric-note">{metric.note}</span>
                </article>
              ))}
            </div>
          </div>
        </ReportSection>
      )}

      <ReportSection index={leaderClub ? "03" : "02"} title="社团活动参与" caption="按社团查看每场活动的考勤结果与出勤率。">
        <div className="report-club-rows">
          {perClub.map((item) => (
            <div className="report-club-row" key={item.club.id}>
              <div className="report-club-name">
                <strong>{item.club.name}</strong>
                <span>{item.club.category} · {item.club.members} 名成员</span>
              </div>
              <div className="report-club-bar">
                {[
                  ["present", item.summary.present],
                  ["absent", item.summary.absent],
                  ["leave", item.summary.leave],
                  ["pending", item.summary.waiting],
                ].filter(([, count]) => count > 0).map(([tone, count]) => (
                  <span className={`report-club-seg ${tone}`} style={{ flex: count }} key={tone} />
                ))}
              </div>
              <div className="report-club-nums">
                <span>出勤 <em>{item.summary.present}</em></span>
                <span>缺勤 <em>{item.summary.absent}</em></span>
                <span>请假 <em>{item.summary.leave}</em></span>
                <span>待确认 <em>{item.summary.waiting}</em></span>
              </div>
              <span className="report-club-rate">
                {item.tracked.length ? Math.round((item.summary.present / item.tracked.length) * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
        <p className="report-footnote">待确认的场次会在社长完成点名后更新；考勤分为正常出勤、请假、缺勤，出勤率＝正常出勤场次 / 应到场次，请假与缺勤不计入。</p>
      </ReportSection>

      <ReportSection index={leaderClub ? "04" : "03"} title="讨论贡献" caption="你在哪些活动讨论里发了言、说了什么，以及被社长精选的发言。">
        <div className="report-discussion">
          <div className="report-trail-card">
            <div className="report-card-head">
              <strong>我的发言足迹</strong>
              <span>共 {totals.posts} 条发言 · 参与 {trail.length} 场活动讨论</span>
            </div>
            {trail.length === 0 ? (
              <p className="report-empty">本学期你还没有参与活动讨论，去活动卡片右侧的讨论入口聊聊吧。</p>
            ) : (
              <div className="report-trail-list">
                {trail.map((row) => {
                  const [date, time] = row.last.split(" ");
                  return (
                    <div className="report-trail-row" key={row.key}>
                      <div className="report-trail-date">
                        <strong>{date}</strong>
                        <span>{time}</span>
                      </div>
                      <div className="report-trail-axis" aria-hidden="true">
                        <i className={`report-trail-node${row.featured > 0 ? " featured" : ""}`} />
                      </div>
                      <div className="report-trail-body">
                        <div className="report-trail-title">
                          <strong>{row.eventName}</strong>
                          <span className={`report-trail-club tone-${row.clubIndex === 0 ? "a" : "b"}`}>{row.club.name}</span>
                          {leaderClub && row.club.id === leaderClub.id && <span className="report-leader-flag">我是社长</span>}
                        </div>
                        <div className="report-trail-dots" aria-label={`${row.count} 条发言，其中 ${row.featured} 条精选`}>
                          {Array.from({ length: row.count }).map((_, dotIndex) => (
                            <i key={dotIndex} className={dotIndex < row.featured ? "gold" : ""} />
                          ))}
                        </div>
                        <span className="report-trail-meta">
                          {row.count} 条发言
                          {row.featured > 0 && <em><Star size={10} weight="fill" /> {row.featured} 条精选</em>}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="report-quotes">
            <div className="report-card-head">
              <strong>精选发言</strong>
              <span>{totals.featured} 条</span>
            </div>
            {featuredList.length === 0 ? (
              <p className="report-empty">还没有被社长设为精选的发言。</p>
            ) : (
              featuredList.map(({ club, post, eventName }) => (
                <figure className="report-quote" key={post.id}>
                  <span className="report-quote-mark" aria-hidden="true">“</span>
                  <blockquote>{post.text}</blockquote>
                  <figcaption>
                    <span>{club.name} · {eventName}</span>
                    {leaderClub && club.id === leaderClub.id && <span className="report-leader-flag">我是社长</span>}
                    <em><Star size={10} weight="fill" />精选</em>
                  </figcaption>
                </figure>
              ))
            )}
          </div>
        </div>
      </ReportSection>

      <ReportSection index={leaderClub ? "05" : "04"} title="学时与学分" caption="每场出勤折算成学时，学时再按成员规则折算成学分。">
        <div className="report-cert">
          <div className="report-cert-paper">
            <span className="report-cert-eyebrow">2026—2027 学年 · 上学期</span>
            <h3>社团学时证书</h3>
            <p className="report-cert-name">赵子易</p>
            {leaderClub && (
              <p className="report-cert-leader">
                作为 <em>{leaderClub.name}</em> 社长，管理 <em>{leaderMembers}</em> 名成员、组织 <em>{leaderEvents.length}</em> 场活动，累计 <em>{leaderHours}</em> 学时，折算 <em>{leaderCredits}</em> 学分，其中 <em>{leaderApprovedHours}</em> 学时已认定。
              </p>
            )}
            <p className="report-cert-body">
              本学期参与 <em>{totals.clubs}</em> 个社团，完成 <em>{attended}</em> 场活动出勤，
              累计 <em>{totals.hoursEligible}</em> 学时，折算 <em>{creditsEarned}</em> 学分；
              其中 <em>{totals.hoursApproved}</em> 学时已认定。
            </p>
            <div className="report-cert-foot">
              <div className="report-cert-meta">
                <span>统计区间 2026-09-01 至 2026-10-26</span>
                <span>每场出勤计 2 学时</span>
              </div>
              <div className="report-cert-seal" aria-hidden="true">
                <span>社团</span>
                <strong>学时</strong>
                <em>专用章</em>
              </div>
            </div>
          </div>
          <div className="report-cert-stub">
            <span className="report-cert-stub-label">{leaderClub ? "本学期累计（含社长运营）" : "本学期累计"}</span>
            <strong className="report-cert-total">{totalHours}<em>学时</em></strong>
            <span className="report-cert-credit">折算 {totalCredits} 学分</span>
            <div className="report-cert-progress" role="img" aria-label={`已完成 ${totalProgress}%`}>
              <i style={{ width: `${totalProgress}%` }} />
            </div>
            <p>满勤上限 {totalMaxHours} 学时 · 已完成 {totalProgress}%</p>
            <p className="report-cert-next">其中 {totalApprovedHours} 学时已认定。</p>
          </div>
        </div>
        <p className="report-footnote">本学期有 {totals.featured} 条精选发言可作为学分申请的证据。</p>
      </ReportSection>

      <section className="report-closing">
        <div className="report-seal" aria-hidden="true">
          <span>2026</span>
          <strong>秋</strong>
          <em>社团报告</em>
        </div>
        <div className="report-closing-text">
          <h2>这一学期，你在社团里留下了自己的痕迹。</h2>
          <p>
            从第一场活动的签到，到发言被社长设为精选，这些记录都留在了这份报告里。
            {leaderClub && `作为 ${leaderClub.name} 的社长，你还成功举办了 ${leaderHeld} 场活动、发起了 ${leaderTopics} 个讨论话题，并选出 ${leaderFeatured} 条精选发言。`}
            下学期第一场活动，等你回来。
          </p>
        </div>
      </section>

      {aiOpen && (
        <ReportAiDrawer
          insight={aiInsight}
          status={aiStatus}
          copied={aiCopied}
          onClose={() => setAiOpen(false)}
          onGenerate={() => {
            setAiCopied(false);
            setAiStatus("loading");
          }}
          onCopy={copyAiInsight}
        />
      )}
    </div>
  );
}

function ReportAiDrawer({ insight, status, copied, onClose, onGenerate, onCopy }) {
  return (
    <div className="drawer-backdrop" role="presentation" onClick={onClose}>
      <aside
        className="side-drawer report-ai-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="报告 AI 解读"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="report-ai-drawer-head">
          <span className="report-ai-orb" aria-hidden="true"><Sparkle size={16} weight="fill" /></span>
          <div className="report-ai-drawer-title">
            <strong>AI 解读 · 我的学期报告</strong>
            <span>{insight.range}</span>
          </div>
          <button type="button" className="report-ai-close" onClick={onClose} aria-label="关闭">
            <X size={15} weight="bold" />
          </button>
        </header>

        <div className="report-ai-drawer-body">
          {status === "loading" && (
            <div className="report-ai-loading">
              <span className="report-ai-loading-icon"><Sparkle size={20} weight="fill" /></span>
              <strong>基于本学期数据生成解读</strong>
              <span className="report-ai-scope">数据范围：{insight.range} · 数据截至 2026-10-26</span>
              <div className="report-ai-skeleton"><i /><i /><i /><i /><i /></div>
            </div>
          )}

          {status === "done" && (
            <div className="report-ai-content">
              <div className="report-ai-hero">
                <span className="report-ai-hero-orb" aria-hidden="true"><Sparkle size={15} weight="fill" /></span>
                <div className="report-ai-hero-main">
                  <p>{insight.headline}</p>
                  <div className="report-ai-chips">
                    {insight.tags.map((tag) => (
                      <span className={`report-ai-chip tone-${tag.tone}`} key={tag.label}>{tag.label}</span>
                    ))}
                  </div>
                </div>
              </div>
              <section>
                <h4><Star size={15} weight="fill" />我的高光</h4>
                <p className="report-ai-line">{insight.highlight}</p>
              </section>
              <section>
                <h4><Lightbulb size={15} weight="fill" />需要关注</h4>
                <ul className="report-ai-points">
                  {insight.watch.map((item) => (
                    <li className={`tone-${item.tone}`} key={item.text}>{item.text}</li>
                  ))}
                </ul>
              </section>
              {insight.todo.length > 0 && (
                <section>
                  <h4><Bell size={15} weight="fill" />别忘记</h4>
                  <ul className="report-ai-points">
                    {insight.todo.map((item) => (
                      <li className={`tone-${item.tone}`} key={item.text}>{item.text}</li>
                    ))}
                  </ul>
                </section>
              )}
              <section>
                <h4><Sparkle size={15} weight="fill" />下学期小目标</h4>
                <p className="report-ai-line">{insight.goal}</p>
              </section>
              <p className="report-ai-foot-note">生成时间 2026-10-26 16:35 · AI 生成内容仅供参考</p>
            </div>
          )}
        </div>

        {status === "done" && (
          <footer className="report-ai-drawer-foot">
            <button type="button" className="report-ai-secondary" onClick={onGenerate}>
              <ArrowClockwise size={14} />重新生成
            </button>
            <button type="button" className="report-ai-copy" onClick={onCopy}>
              <CopySimple size={14} />{copied ? "已复制" : "复制全文"}
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}

function ConfirmCancelDialog({ club, onClose, onConfirm }) {
  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <section className="dialog confirm-dialog" role="dialog" aria-modal="true" aria-label="取消报名确认">
        <button className="dialog-close" onClick={onClose} aria-label="关闭">×</button>
        <span className="eyebrow">取消报名</span>
        <h2>取消「{club.name}」的报名？</h2>
        <p>取消后本学期将无法参加该社团活动，再次加入需重新提交申请。</p>
        <div className="dialog-actions">
          <button type="button" className="secondary" onClick={onClose}>再想想</button>
          <button type="button" className="primary danger" onClick={onConfirm}>确认取消</button>
        </div>
      </section>
    </div>
  );
}

const CLUB_POSTER_IMAGES = {
  football: "assets/poster-football.jpg",
  robot: "assets/poster-robot.jpg",
  drama: "assets/poster-drama.jpg",
  reading: "assets/poster-reading.jpg",
};

function ClubDetail({ club, joined, memberView = false, initialView = "detail", onApply, onCancelJoin, onNavigate, onOpenMoment }) {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [posterOpen, setPosterOpen] = useState(false);
  const [previewEvent, setPreviewEvent] = useState(null);
  const [activeView, setActiveView] = useState(initialView);
  useEffect(() => setActiveView(initialView), [club?.id, initialView]);
  if (!club) return null;
  const events = club.events || [];
  const showcase = getClubShowcase(club);
  // 同一详情页由两个入口复用：只有从「我报名的」进入时才暴露成员专属的活动瞬间。
  const canViewMoments = memberView;
  const shownEvents = showAllEvents ? events : events.slice(0, 2);
  const posterSrc = CLUB_POSTER_IMAGES[club.poster] || CLUB_POSTER_IMAGES.drama;
  return (
    <div className="club-detail-body">
      <ClubRow
        club={club}
        joined={joined}
        hideViewButton
        onApply={() => onApply(club)}
        onCancel={onCancelJoin}
      />
      <nav className="club-profile-tabs" aria-label="社团内容导航">
        <button type="button" className={activeView === "detail" ? "active" : ""} onClick={() => setActiveView("detail")}>社团详情</button>
        <button type="button" className={activeView === "showcase" ? "active" : ""} onClick={() => setActiveView("showcase")}>社团风采</button>
        {canViewMoments && <button type="button" className={activeView === "moments" ? "active" : ""} onClick={() => setActiveView("moments")}>活动瞬间</button>}
      </nav>
      {activeView === "detail" && <div className="detail-columns">
        <section>
          <h2>社团介绍</h2>
          <p>{club.short} 社团审核通过后已面向本校学生展示，具体活动由学生社长安排发布。</p>
          <h2>招新说明</h2>
          <p>{club.recruitment}</p>
          <div className="recruit-poster-block">
            <div className="recruit-poster-head">
              <h2>招新海报</h2>
              <span>社长上传 · 点击可查看大图</span>
            </div>
            <figure
              className="recruit-poster"
              role="button"
              tabIndex={0}
              onClick={() => setPosterOpen(true)}
              onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && setPosterOpen(true)}
            >
              <img src={posterSrc} alt={`${club.name}招新海报`} />
              <span className="poster-top-label">2026 秋季招新</span>
              <figcaption>
                <strong>{club.name}</strong>
                <span className="poster-slogan">{club.short}</span>
                <span className="poster-meta">报名截止 {club.applyEnd} · {club.capacity} 个名额</span>
              </figcaption>
            </figure>
          </div>
        </section>
        <aside className="detail-aside">
          <h2>近期活动</h2>
          <ol className="event-timeline detail-timeline">
            {shownEvents.map((event, index) => {
              const parsed = parseEventLabel(event);
              const metaText = [parsed.time, parsed.venue].filter(Boolean).join(" · ");
              return (
                <li key={event} className={index === 0 ? "next" : ""}>
                  <span className="event-node" aria-hidden="true"><strong>{parsed.monthDay}</strong></span>
                  <div className="event-info">
                    <div className="event-info-head">
                      <h3>{parsed.title}</h3>
                      {index === 0 && <span className="event-next-badge">下一场</span>}
                    </div>
                    <p className="event-info-meta">
                      {metaText ? <span>{metaText}</span> : null}
                      {metaText ? <span className="event-meta-dot" aria-hidden="true">·</span> : null}
                      <button type="button" className="event-detail-link" onClick={() => setPreviewEvent(parsed)}>
                        活动详情 <CaretRight size={12} />
                      </button>
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
          {events.length > 2 && (
            <button type="button" className="show-all-activities" onClick={() => setShowAllEvents(!showAllEvents)}>
              {showAllEvents ? "收起" : `查看全部 ${events.length} 场活动`} <CaretDown size={15} className={showAllEvents ? "rotated" : ""} />
            </button>
          )}
        </aside>
      </div>}
      {activeView === "showcase" && <ClubShowcase club={club} showcase={showcase} />}
      {activeView === "moments" && canViewMoments && <MemberMomentsPanel club={club} onOpenMoment={onOpenMoment} />}
      {previewEvent && (
        <div className="dialog-backdrop" role="presentation" onClick={() => setPreviewEvent(null)}>
          <section className="dialog event-preview-dialog" role="dialog" aria-modal="true" aria-label="活动详情" onClick={(event) => event.stopPropagation()}>
            <button className="dialog-close" onClick={() => setPreviewEvent(null)} aria-label="关闭">×</button>
            <span className="eyebrow">{club.name} · 近期活动</span>
            <h2>{previewEvent.title}</h2>
            <dl className="event-preview-meta">
              <div><dt>活动日期</dt><dd>2026 年 {previewEvent.monthDay.replace(".", " 月 ")} 日</dd></div>
              <div><dt>活动时间</dt><dd>{previewEvent.time || "以社长通知为准"}</dd></div>
              <div><dt>活动地点</dt><dd>{previewEvent.venue || "以社长通知为准"}</dd></div>
            </dl>
            <p className="event-preview-note">
              {joined === "joined"
                ? "你已加入本社团，可在「活动瞬间」查看并分享本场活动的记录。"
                : "加入社团后，可在「我报名的」查看活动考勤、活动瞬间，并接收社长发布的活动通知。"}
            </p>
            <div className="dialog-actions">
              <button className="secondary" onClick={() => setPreviewEvent(null)}>关闭</button>
              {joined !== "joined" && onApply && <button className="primary" onClick={() => { setPreviewEvent(null); onApply(); }}>申请报名</button>}
            </div>
          </section>
        </div>
      )}
      {posterOpen && (
        <div className="dialog-backdrop" role="presentation" onClick={() => setPosterOpen(false)}>
          <div className="poster-preview" role="dialog" aria-modal="true" aria-label={`${club.name}招新海报`} onClick={(event) => event.stopPropagation()}>
            <button className="dialog-close" onClick={() => setPosterOpen(false)} aria-label="关闭">×</button>
            <img src={posterSrc} alt={`${club.name}招新海报`} />
          </div>
        </div>
      )}
    </div>
  );
}

function ClubShowcase({ club, showcase }) {
  const [type, setType] = useState("works");
  const items = showcase[type];
  const isWorks = type === "works";
  return (
    <section className="club-showcase-panel" aria-label={`${club.name}社团风采`}>
      <header className="showcase-panel-head">
        <div>
          <span className="eyebrow">社团风采</span>
          <h2>{club.name}的作品与荣誉</h2>
          <p>由学生社长统一维护；作品保留实际创作成员署名，面向全体学生公开。</p>
        </div>
      </header>
      <div className="showcase-tabs" role="tablist" aria-label="社团风采分类">
        <button type="button" className={isWorks ? "active" : ""} onClick={() => setType("works")}>作品集锦 <span>{showcase.works.length}</span></button>
        <button type="button" className={!isWorks ? "active" : ""} onClick={() => setType("honors")}>荣誉时刻 <span>{showcase.honors.length}</span></button>
      </div>
      {items.length ? <div className="student-showcase-grid">
        {items.map((item) => <article className="student-showcase-card" key={item.id}>
          <img src={item.image} alt={item.title} />
          <div className="student-showcase-card-body">
            <h3>{item.title}</h3>
            {isWorks && <p className="showcase-creators">创作成员：{item.creators}</p>}
            {!isWorks && item.receivedAt && <p className="showcase-date">获得时间：{item.receivedAt}</p>}
            {item.description && <p className="showcase-description">{item.description}</p>}
            <small>社长上传 · {momentTimeText(item.uploadedAt)}</small>
          </div>
        </article>)}
      </div> : <div className="club-showcase-empty"><Medal size={26} weight="duotone" /><strong>社长还未上传{isWorks ? "作品" : "荣誉"}</strong><span>后续上传后会在这里展示。</span></div>}
    </section>
  );
}

function MemberMomentsPanel({ club, onOpenMoment }) {
  const activities = club.memberActivities || [];
  return (
    <section className="member-moments-panel" aria-label={`${club.name}活动瞬间`}>
      <header className="moments-panel-head">
        <div><span className="eyebrow">仅社团成员可见</span><h2>活动瞬间</h2><p>成员可围绕每场活动分享图文记录，不另设讨论主题。</p></div>
      </header>
      {activities.length ? <div className="member-moment-activity-list">
        {activities.map((activity) => <article className="member-moment-activity" key={activity.id}>
          <div className="member-moment-date"><strong>{activity.day}</strong><span>{activity.week}</span></div>
          <div><h3>{activity.title}</h3><p><Clock size={13} /> {activity.time} <i /> <MapPin size={13} /> {activity.venue}</p></div>
          <button type="button" className="secondary compact" onClick={() => onOpenMoment?.({ ...activity, clubName: club.name })}><Camera size={15} /> {activity.discussion || 0} 份分享</button>
        </article>)}
      </div> : <div className="club-showcase-empty"><Camera size={26} weight="duotone" /><strong>暂未发布活动</strong><span>社长发布活动后，成员可在对应活动下分享精彩瞬间。</span></div>}
    </section>
  );
}

const MOMENT_AVATAR_COLORS = ["#2b9fc5", "#7c5cff", "#e8930c", "#22b573", "#e0566b", "#3f6fd8"];
function momentAvatarColor(name) {
  let hash = 0;
  for (const ch of String(name || "")) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return MOMENT_AVATAR_COLORS[hash % MOMENT_AVATAR_COLORS.length];
}

// 活动瞬间卡片：移植学生端 HTML 原型（student-club-html-pages moment-wall）的 moment-tile 结构
function MomentTile({ post, isMine, menuOpen, onToggleMenu, onCloseMenu, onOpen, onLike, onEdit, onDelete }) {
  const [photoStart, setPhotoStart] = useState(0);
  const pics = post.type === "video" ? [] : (post.photos || []);
  const multi = pics.length > 1;
  const stepPhoto = (delta) => setPhotoStart((value) => Math.min(Math.max(value + delta, 0), pics.length - 1));
  return <article className={`moment-tile${isMine ? " is-mine" : ""}`}>
    {isMine && <span className="moment-mine-flag">我的分享</span>}
    <button type="button" className="moment-tile-media" onClick={onOpen} aria-label="查看这份分享">
      {post.type === "video" ? (
        post.videoSrc && !post.cover ? <video src={post.videoSrc} muted playsInline preload="metadata" /> : <>
          <img src={post.cover || ""} alt="" />
          <span className="video-play-badge" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M9 6.6v10.8L18 12z" fill="currentColor" /></svg></span>
          <span className="video-duration">{post.duration || "00:00"}</span>
        </>
      ) : (
        <>
          <img src={pics[photoStart] || pics[0] || ""} alt="" />
          {multi && <>
            {photoStart > 0 && <span className="moment-tile-nav prev" role="button" aria-label="上一张照片" onClick={(event) => { event.stopPropagation(); stepPhoto(-1); }}>‹</span>}
            {photoStart < pics.length - 1 && <span className="moment-tile-nav next" role="button" aria-label="下一张照片" onClick={(event) => { event.stopPropagation(); stepPhoto(1); }}>›</span>}
            <span className="moment-tile-count">{photoStart + 1} / {pics.length}</span>
          </>}
        </>
      )}
      {post.featured && <i className="moment-tile-featured"><Star size={11} weight="fill" />精选</i>}
    </button>
    {isMine && (
      <div className={`moment-more-wrap${menuOpen ? " is-open" : ""}`}>
        {menuOpen && <div className="moment-menu-mask" onClick={onCloseMenu} />}
        <button type="button" className="moment-more" onClick={onToggleMenu} aria-label="更多操作" aria-haspopup="menu"><DotsThree size={14} weight="bold" /></button>
        <div className="moment-more-menu" role="menu">
          <button type="button" role="menuitem" onClick={() => { onCloseMenu(); onEdit?.(); }}><NotePencil size={13} />编辑</button>
          <button type="button" role="menuitem" className="is-danger" onClick={() => { onCloseMenu(); onDelete?.(); }}><Trash size={13} />删除</button>
        </div>
      </div>
    )}
    <div className="moment-tile-body">
      <p className="moment-tile-caption">{post.content && post.content.trim() ? post.content : <em className="moment-no-caption">分享了现场素材</em>}{post.edited && <i className="moment-edited">已编辑</i>}</p>
      <div className="moment-tile-foot">
        <i className="moment-mini-avatar" style={{ background: momentAvatarColor(post.author) }}>{post.author?.slice(0, 1)}</i>
        <b>{post.author}</b>
        {post.role === "社长" && <span className="moment-role-chip is-leader">社长</span>}
        {post.time ? <time className="moment-tile-time">{momentTimeText(post.time)}</time> : null}
        <button type="button" className="moment-comment-count" onClick={onOpen} aria-label="查看评论"><ChatCircleDots size={13} /><span>{post.comments.length}</span></button>
        <button type="button" className={`moment-like${post.liked ? " liked" : ""}`} onClick={onLike} aria-label="点赞"><Heart size={13} weight={post.liked ? "fill" : "regular"} /><span>{post.likes}</span></button>
      </div>
    </div>
  </article>;
}

// 活动瞬间评论：统一成 { author, text, time }，评论人显示真实成员姓名，时间按发布时刻顺延
const MOMENT_COMMENT_AUTHORS = ["顾一然", "沈清越", "林知夏", "周雨桐"];
function shiftMomentTime(base, minutes) {
  const matched = String(base || "").match(/^(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{2})/);
  if (!matched) return "";
  const date = new Date(2026, +matched[1] - 1, +matched[2], +matched[3], +matched[4] + minutes);
  const pad = (value) => String(value).padStart(2, "0");
  return `${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
function normalizeMomentComments(list, fallback, baseTime) {
  const source = list && list.length ? list : fallback;
  return source.map((item, index) => {
    const time = (typeof item === "object" && item.time) || shiftMomentTime(baseTime, 9 + index * 13);
    return typeof item === "string"
      ? { author: MOMENT_COMMENT_AUTHORS[index % MOMENT_COMMENT_AUTHORS.length], text: item, time }
      : { author: item.author || MOMENT_COMMENT_AUTHORS[index % MOMENT_COMMENT_AUTHORS.length], text: item.text || "", time };
  });
}

// 「我的分享」示例卡片：当前登录学生（赵子易）发布的素材，支持编辑 / 删除
const MOMENT_MINE_DEMO = {
  id: "moment-mine-demo",
  author: "赵子易",
  role: "成员",
  time: "10-18 18:05",
  content: "抓拍到了第一次完整合排的瞬间，大家的配合比上周默契多了。",
  likes: 5,
  liked: false,
  photos: ["assets/moment-team-1.jpg", "assets/moment-anime-1.png"],
  comments: [{ author: "林小薇", text: "拍得很好，这张构图特别稳！", time: "10-18 18:20" }],
};

// 独立的成员活动瞬间页：由「我报名的」或成员态详情进入，不复用旧的右侧讨论抽屉。
function MomentWallPage({ activity, onBack, onNotify }) {
  const seed = discussionSeeds[activity.id]?.posts || [];
  const [posts, setPosts] = useState(() => [MOMENT_MINE_DEMO, ...seed.map((item, index) => ({
    ...item,
    photos: item.photos?.length ? item.photos : (index % 2 ? ["assets/moment-team-1.jpg"] : ["assets/moment-anime-1.png", "assets/moment-anime-2.png"]),
    comments: normalizeMomentComments(item.comments, ["很有现场感！"], item.time),
  }))]);
  const [viewer, setViewer] = useState(null);
  const [showComposer, setShowComposer] = useState(() => bootParams.get("compose") === "1");
  const [text, setText] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const mediaInputRef = useRef(null);
  const [menuFor, setMenuFor] = useState(null);

  const toggleLike = (id) => setPosts((previous) => previous.map((post) => post.id === id ? {
    ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1),
  } : post));
  const composerHasMedia = Boolean(selectedVideo) || selectedPhotos.length > 0;
  const composerTip = selectedVideo
    ? "视频单独成一条，不能再加照片"
    : selectedPhotos.length >= 3 ? "已选满 3 张照片" : selectedPhotos.length ? `还能再加 ${3 - selectedPhotos.length} 张照片` : "";
  const closeComposer = () => { setShowComposer(false); setSelectedPhotos([]); setSelectedVideo(null); setText(""); };
  const publish = (event) => {
    event.preventDefault();
    if (!composerHasMedia) return;
    setPosts((previous) => [selectedVideo ? {
      id: `moment-${Date.now()}`, type: "video", author: "赵子易", role: "成员", time: momentNowTime(), content: text.trim(),
      likes: 0, liked: false, comments: [], videoSrc: selectedVideo, cover: "",
    } : {
      id: `moment-${Date.now()}`, author: "赵子易", role: "成员", time: momentNowTime(), content: text.trim(),
      likes: 0, liked: false, comments: [], photos: selectedPhotos,
    }, ...previous]);
    setText(""); setSelectedPhotos([]); setSelectedVideo(null); setShowComposer(false);
    onNotify?.("精彩瞬间已发布，仅本社团成员可见。");
  };
  const uploadMedia = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const video = files.find((file) => file.type.startsWith("video/"));
    if (video) {
      setSelectedVideo(URL.createObjectURL(video));
      setSelectedPhotos([]);
    } else {
      setSelectedPhotos(files.filter((file) => file.type.startsWith("image/")).slice(0, 3).map((file) => URL.createObjectURL(file)));
      setSelectedVideo(null);
    }
    event.target.value = "";
  };

  // 我的分享：编辑（弹窗改感想 / 移除照片）与删除（红色确认弹窗）
  const [editingPost, setEditingPost] = useState(null);
  const [editText, setEditText] = useState("");
  const [editPhotos, setEditPhotos] = useState([]);
  const [deletingPost, setDeletingPost] = useState(null);
  const closeEdit = () => { setEditingPost(null); setEditText(""); setEditPhotos([]); };
  const openEdit = (post) => {
    setEditingPost(post);
    setEditText(post.content || "");
    setEditPhotos(post.type === "video" ? [] : [...(post.photos || [])]);
  };
  const saveEdit = (event) => {
    event.preventDefault();
    if (!editingPost) return;
    setPosts((previous) => previous.map((post) => post.id === editingPost.id ? {
      ...post,
      content: editText.trim(),
      photos: post.type === "video" ? post.photos : editPhotos,
      edited: true,
    } : post));
    setViewer((previous) => previous && previous.id === editingPost.id ? {
      ...previous,
      content: editText.trim(),
      photos: previous.type === "video" ? previous.photos : editPhotos,
      edited: true,
    } : previous);
    closeEdit();
    onNotify?.("分享已更新，社团详情页「活动瞬间」里的这条也同步更新了。");
  };
  const confirmDelete = () => {
    if (!deletingPost) return;
    const removingId = deletingPost.id;
    setPosts((previous) => previous.filter((post) => post.id !== removingId));
    setViewer((previous) => previous && previous.id === removingId ? null : previous);
    setDeletingPost(null);
    onNotify?.("已删除，这条分享不会出现在社团风采里了。");
  };

  return <div className="moment-wall-page fd-member-moment-page">
    <section className="fd-member-moment-hero">
      <div className="fd-member-moment-main">
        <span className="fd-member-moment-tag">{activity.clubName || "我的社团"}</span>
        <div className="fd-member-moment-title-row">
          <h2>{activity.title}</h2>
          <span className={`member-activity-status ${activity.status === "待开展" ? "upcoming" : "ended"}`}>{activity.status || "已结束"}</span>
          {activity.attendance && activity.attendance !== "未开始" && <span className="checkin-tag present">{activity.attendance}</span>}
        </div>
        <div className="fd-member-moment-meta">
          <span><Clock size={13} />{activity.day || "10.18"} {activity.week || "周五"} · {activity.time || "以活动通知为准"}</span>
          <span><MapPin size={13} />{activity.venue || "以活动通知为准"}</span>
          <span><Camera size={13} />已有 <b>{posts.length}</b> 份分享</span>
        </div>
      </div>
      <button type="button" className="fd-member-moment-share" onClick={() => setShowComposer(true)}><Camera size={14} />分享这一刻</button>
    </section>
    {posts.length ? <section className="moment-wall" aria-label="活动瞬间列表">
      {posts.map((post) => <MomentTile
        key={post.id}
        post={post}
        isMine={post.author === "赵子易"}
        menuOpen={menuFor === post.id}
        onToggleMenu={() => setMenuFor(menuFor === post.id ? null : post.id)}
        onCloseMenu={() => setMenuFor(null)}
        onOpen={() => setViewer(post)}
        onLike={() => toggleLike(post.id)}
        onEdit={() => openEdit(post)}
        onDelete={() => setDeletingPost(post)}
      />)}
    </section> : <section className="moment-wall">
      <div className="moment-empty">
        <span className="moment-empty-icon"><Camera size={26} /></span>
        <strong>还没有人分享活动瞬间</strong>
        <span>传一张照片或一段视频，这场活动就有了第一份记忆。</span>
      </div>
    </section>}
    {showComposer && <div className="moment-composer is-layer" role="presentation" onClick={closeComposer}>
      <form className="moment-composer-card" onSubmit={publish} onClick={(event) => event.stopPropagation()}>
        <button type="button" className="moment-composer-close" onClick={closeComposer} aria-label="关闭分享">×</button>
        <div className="moment-composer-head"><strong>分享这一刻</strong></div>
        <div className="moment-composer-inner">
          <div className="moment-composer-media">
            <input ref={mediaInputRef} type="file" accept="image/*,video/*" multiple hidden onChange={uploadMedia} />
            {!composerHasMedia ? (
              <button type="button" className="moment-upload-btn" onClick={() => mediaInputRef.current?.click()}>
                <span className="moment-upload-icon"><UploadSimple size={18} /></span>
                <span className="moment-upload-text"><strong>上传照片或视频</strong><em>最多 3 张照片，或 1 段视频，二者不能同时发布</em></span>
              </button>
            ) : (
              <>
                <div className="moment-pick-list">
                  {selectedVideo && <span className="moment-pick"><video src={selectedVideo} muted playsInline /><i className="moment-pick-badge">视频</i><button type="button" className="moment-pick-remove" onClick={() => setSelectedVideo(null)} aria-label="移除">×</button></span>}
                  {selectedPhotos.map((src) => <span className="moment-pick" key={src}><img src={src} alt="待发布素材" /><button type="button" className="moment-pick-remove" onClick={() => setSelectedPhotos((items) => items.filter((item) => item !== src))} aria-label="移除">×</button></span>)}
                  {!selectedVideo && selectedPhotos.length < 3 && <button type="button" className="moment-pick-add" onClick={() => mediaInputRef.current?.click()} aria-label="继续添加">＋</button>}
                </div>
                <p className="moment-pick-tip"><Camera size={12} /><span>{composerTip}</span></p>
              </>
            )}
          </div>
          <div className="moment-composer-row">
            <input type="text" maxLength={120} value={text} onChange={(event) => setText(event.target.value)} placeholder="说一句当时的心情（选填）" />
            <button type="submit" className={`moment-publish${composerHasMedia ? "" : " is-idle"}`}>{!selectedVideo && selectedPhotos.length > 1 ? `发布 ${selectedPhotos.length} 张` : "发布"}</button>
          </div>
        </div>
      </form>
    </div>}
    {editingPost && <div className="moment-layer" role="presentation" onClick={closeEdit}>
      <form className="moment-edit-card" onSubmit={saveEdit} onClick={(event) => event.stopPropagation()}>
        <button type="button" className="moment-layer-close" onClick={closeEdit} aria-label="关闭编辑">×</button>
        <div className="moment-layer-head"><strong>编辑这条分享</strong><span>修改感想或移除照片后保存，会同步更新社团详情页「活动瞬间」里的这条。</span></div>
        {editingPost.type === "video" ? (
          <div className="moment-edit-media is-video"><video src={editingPost.videoSrc} muted playsInline /><i className="moment-pick-badge">视频</i></div>
        ) : (
          <div className="moment-edit-media">
            {editPhotos.map((src, index) => <span className="moment-edit-thumb" key={`${src}-${index}`}>
              <img src={src} alt="分享素材" />
              {editPhotos.length > 1 && <button type="button" className="moment-pick-remove" onClick={() => setEditPhotos((items) => items.filter((_, idx) => idx !== index))} aria-label="移除这张照片">×</button>}
            </span>)}
          </div>
        )}
        <textarea className="moment-edit-textarea" value={editText} onChange={(event) => setEditText(event.target.value)} maxLength={120} placeholder="补充一句当时的心情（选填）" autoFocus />
        <div className="moment-layer-actions">
          <button type="button" className="secondary" onClick={closeEdit}>取消</button>
          <button type="submit" className="primary">保存修改</button>
        </div>
      </form>
    </div>}
    {deletingPost && <div className="moment-layer" role="presentation" onClick={() => setDeletingPost(null)}>
      <section className="moment-confirm" role="dialog" aria-modal="true" aria-label="删除分享" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="moment-layer-close" onClick={() => setDeletingPost(null)} aria-label="关闭">×</button>
        <span className="moment-confirm-icon"><Trash size={22} /></span>
        <h3>删除这条分享？</h3>
        <p>删除后，{deletingPost.type === "video" ? "这段视频" : "这些图片"}会同时从社团详情页「活动瞬间」移除，收到的点赞和评论一并清空，且无法恢复。</p>
        <div className="moment-layer-actions">
          <button type="button" className="secondary" onClick={() => setDeletingPost(null)}>先不删</button>
          <button type="button" className="danger" onClick={confirmDelete}>确认删除</button>
        </div>
      </section>
    </div>}
    {viewer && <MomentViewer
      list={[{
        ...viewer,
        caption: viewer.content,
        commentList: viewer.comments,
        role: viewer.role && viewer.role !== "成员" ? viewer.role : null,
      }]}
      startIndex={0}
      onClose={() => setViewer(null)}
      onLike={(id) => { toggleLike(id); setViewer((value) => ({ ...value, liked: !value.liked, likes: value.likes + (value.liked ? -1 : 1) })); }}
      onComment={(id, text) => {
        const time = momentNowTime();
        setPosts((previous) => previous.map((post) => post.id === id ? { ...post, comments: [...post.comments, { author: "赵子易", text, time }] } : post));
        setViewer((previous) => ({ ...previous, comments: [...previous.comments, { author: "赵子易", text, time }] }));
      }}
      authorExtras={(moment) => <>
        {moment.author === "赵子易" && <span className="moment-viewer-owner">我的分享</span>}
        {moment.edited && <i className="moment-edited">已编辑</i>}
        {moment.featured && <i className="moment-tile-featured moment-viewer-featured"><Star size={11} weight="fill" />精选</i>}
      </>}
      likeExtras={(moment) => moment.author === "赵子易" ? <>
        <button type="button" className="moment-act" onClick={() => openEdit(moment)}><NotePencil size={12} />编辑</button>
        <button type="button" className="moment-act is-danger" onClick={() => setDeletingPost(moment)}><Trash size={12} />删除</button>
      </> : null}
      commentCountText={(n) => (n ? `共 ${n} 条` : "")}
    />}
  </div>;
}

function ShowcaseManagementPanel({ club, isArchived = false, onNotify }) {
  const initialShowcase = getClubShowcase(club);
  const [showcase, setShowcase] = useState(() => ({ works: [...initialShowcase.works], honors: [...initialShowcase.honors] }));
  const [type, setType] = useState("works");
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [creators, setCreators] = useState([]);
  const [description, setDescription] = useState("");
  const [receivedAt, setReceivedAt] = useState("");
  const [media, setMedia] = useState("assets/gallery-tech.jpg");
  const creatorOptions = ["赵子易", "顾一然", "沈清越", "林知夏", "全体成员"];
  const items = showcase[type];
  const isWork = type === "works";
  const closeEditor = () => { setEditing(false); setTitle(""); setCreators([]); setDescription(""); setReceivedAt(""); setMedia("assets/gallery-tech.jpg"); };
  const submit = (event) => {
    event.preventDefault();
    const value = title.trim() || (isWork ? "未命名作品" : "未命名荣誉");
    const next = isWork
      ? { id: `work-${Date.now()}`, title: value, creators: creators.length ? creators.join("、") : "社团成员", description: description.trim(), image: media, uploadedAt: formatNowDate() }
      : { id: `honor-${Date.now()}`, title: value, receivedAt: receivedAt || formatNowDate(), description: description.trim(), image: media, uploadedAt: formatNowDate() };
    setShowcase((previous) => ({ ...previous, [type]: [next, ...previous[type]] }));
    closeEditor();
    onNotify?.(`${isWork ? "作品" : "荣誉"}已登记，将在社团风采中公开展示。`);
  };
  return <div className="manage-tab-content showcase-management-panel">
    <div className="showcase-management-head">
      <div><h2>成果荣誉</h2><p>由学生社长维护；作品应填写实际创作成员，公开展示不等于教师逐项审核。</p></div>
      <button type="button" className="btn-header-primary" disabled={isArchived} onClick={() => setEditing(true)}><Plus size={16} /> {isWork ? "上传作品" : "登记荣誉"}</button>
    </div>
    <div className="showcase-tabs" role="tablist" aria-label="成果荣誉分类">
      <button type="button" className={isWork ? "active" : ""} onClick={() => setType("works")}>作品集锦 <span>{showcase.works.length}</span></button>
      <button type="button" className={!isWork ? "active" : ""} onClick={() => setType("honors")}>荣誉时刻 <span>{showcase.honors.length}</span></button>
    </div>
    {items.length ? <div className="student-showcase-grid manage-showcase-grid">{items.map((item) => <article className="student-showcase-card" key={item.id}><img src={item.image} alt={item.title} /><div className="student-showcase-card-body"><h3>{item.title}</h3>{isWork ? <p className="showcase-creators">创作成员：{item.creators}</p> : <p className="showcase-date">获得时间：{item.receivedAt}</p>}{item.description && <p className="showcase-description">{item.description}</p>}<div className="showcase-card-actions"><small>上传于 {item.uploadedAt}</small><button type="button" disabled={isArchived} onClick={() => onNotify?.("原型中可在这里编辑或删除该条内容")}>管理</button></div></div></article>)}</div> : <div className="club-showcase-empty"><Medal size={26} weight="duotone" /><strong>还没有{isWork ? "作品" : "荣誉"}</strong><span>{isArchived ? "历史学期内容只读。" : "点击右上角开始维护。"}</span></div>}
    {editing && <div className="dialog-backdrop" role="presentation" onClick={closeEditor}><form className="dialog showcase-editor-dialog" onSubmit={submit} onClick={(event) => event.stopPropagation()}><button type="button" className="dialog-close" onClick={closeEditor} aria-label="关闭">×</button><span className="eyebrow">{isWork ? "上传作品" : "登记荣誉"}</span><h2>{club.name}</h2><p>{isWork ? "作品公开展示时保留实际创作成员署名。" : "上传荣誉证明后，社团风采会公开展示。"}</p><label>{isWork ? "作品名称（可选）" : "荣誉名称（可选）"}<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder={isWork ? "未填写时显示为“未命名作品”" : "未填写时显示为“未命名荣誉”"} /></label><label>{isWork ? "作品媒体" : "荣誉证明"}<div className="showcase-media-options">{["assets/gallery-tech.jpg", "assets/gallery-art.jpg", "assets/cert-dr-h1.png"].map((src) => <button type="button" key={src} className={media === src ? "selected" : ""} onClick={() => setMedia(src)}><img src={src} alt="选择媒体" /></button>)}</div></label>{isWork ? <fieldset className="showcase-creators-picker"><legend>实际创作成员</legend>{creatorOptions.map((name) => <label key={name}><input type="checkbox" checked={creators.includes(name)} onChange={() => setCreators((previous) => name === "全体成员" ? (previous.includes(name) ? [] : [name]) : (previous.includes(name) ? previous.filter((item) => item !== name) : [...previous.filter((item) => item !== "全体成员"), name]))} />{name}</label>)}</fieldset> : <label>获得时间<input type="date" value={receivedAt} onChange={(event) => setReceivedAt(event.target.value)} /></label>}<label>说明（可选）<textarea rows={3} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="补充作品或荣誉的相关说明" /></label><div className="dialog-actions"><button type="button" className="secondary" onClick={closeEditor}>取消</button><button type="submit" className="primary">保存并公开展示</button></div></form></div>}
  </div>;
}

function parseEventLabel(event) {
  const parts = event.split("·").map((part) => part.trim());
  const head = parts[0] || "";
  const title = parts.length >= 3 ? parts[2] : parts[1] || event;
  const venue = parts.length >= 3 ? parts[1] : "";
  // 时间支持「10:00」与「10:00-12:30」两种写法，统一按原样展示
  const timePattern = "(\\d{1,2}:\\d{2}(?:\\s*[-–—~]\\s*\\d{1,2}:\\d{2})?)";
  let match = head.match(new RegExp(`(\\d{1,2})\\s*月\\s*(\\d{1,2})\\s*日(?:\\s*${timePattern})?`));
  if (match) {
    return { monthDay: `${match[1]}.${match[2]}`, time: match[3] || "", venue, title };
  }
  match = head.match(/(\d{1,2})\.(\d{1,2})/);
  if (match) {
    return { monthDay: `${match[1]}.${match[2]}`, time: head.replace(match[0], "").trim(), venue, title };
  }
  return { monthDay: "·", time: head, venue, title };
}

function ApplyDialog({ club, mode = "apply", onClose, onSubmit }) {
  return (
    <div className="dialog-backdrop" role="presentation">
      <section className="dialog apply-reason-dialog" role="dialog" aria-modal="true" aria-label="申请报名社团">
        <button className="dialog-close" onClick={onClose} aria-label="关闭">×</button>
        <span className="eyebrow">{mode === "reapply" ? "重新申请报名" : "申请报名社团"}</span>
        <h2>{club.name}</h2>
        <p>提交后将由学生社长审核，通过后你会成为本学期正式成员。</p>
        <label>
          申请说明
          <textarea
            rows={5}
            maxLength={200}
            placeholder="聊聊你为什么想加入，再展示一下你的才艺和能力，社长会更了解你哦～"
          />
        </label>
        <div className="dialog-actions">
          <button className="secondary" onClick={onClose}>暂不申请</button>
          <button className="primary" onClick={onSubmit}>{mode === "reapply" ? "重新提交申请" : "提交申请"}</button>
        </div>
      </section>
    </div>
  );
}

function WithdrawDeclarationDialog({ record, onClose, onConfirm }) {
  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <section className="dialog" role="dialog" aria-modal="true" aria-label="撤回社团申报" onClick={(e) => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose} aria-label="关闭">×</button>
        <span className="eyebrow">撤回社团申报</span>
        <h2>确定撤回“{record.name}”的申报？</h2>
        <p>撤回后教师将无法审核，你可修改后重新提交。</p>
        <div className="dialog-actions">
          <button type="button" className="secondary" onClick={onClose}>取消</button>
          <button type="button" className="danger-button" onClick={onConfirm}>确认撤回</button>
        </div>
      </section>
    </div>
  );
}

function DeleteDeclarationDialog({ record, onClose, onConfirm }) {
  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <section className="dialog" role="dialog" aria-modal="true" aria-label="删除社团申报" onClick={(e) => e.stopPropagation()}>
        <button className="dialog-close" onClick={onClose} aria-label="关闭">×</button>
        <span className="eyebrow">删除申报记录</span>
        <h2>确认删除“{record.name}”的申报？</h2>
        <p>删除后申报记录及材料将无法找回。若后续仍想创办社团，需重新发起申报。</p>
        <div className="dialog-actions">
          <button type="button" className="secondary" onClick={onClose}>取消</button>
          <button type="button" className="danger-button" onClick={onConfirm}>确认删除</button>
        </div>
      </section>
    </div>
  );
}

function Tabs({ items, active, onChange }) {
  return (
    <div className="tabs">
      {items.map(([value, label]) => (
        <button key={value} className={active === value ? "tab active" : "tab"} onClick={() => onChange(value)}>
          {label}
        </button>
      ))}
    </div>
  );
}

function TaskRow({ title, detail, action, onAction }) {
  return (
    <article className="task-row">
      <div>
        <h2>{title}</h2>
        <p>{detail}</p>
      </div>
      <button className="secondary compact" onClick={onAction}>{action}</button>
    </article>
  );
}

export default App;


function DeclarationGuideDialog({ onClose, onDownload }) {
  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <section className="dialog declaration-guide-dialog" role="dialog" aria-modal="true" aria-label={declarationGuide.title} onClick={(event) => event.stopPropagation()}>
        <button type="button" className="dialog-close" onClick={onClose} aria-label="关闭">×</button>
        <span className="eyebrow">本学期申报指引</span>
        <h2>{declarationGuide.title}</h2>
        <p className="declaration-guide-intro">本学期学生社团由学生自主发起。准备申报社团的同学，请在提交前阅读以下说明。</p>

        <div className="declaration-guide-content">
          <section>
            <h3>一、申报要求</h3>
            <ul>
              <li>请在学校开放的申报时间内提交；社团应有明确的共同兴趣、活动目标和本学期计划。</li>
              <li>请准确选择社团类别，并合理填写计划人数、联系方式和场地需求。</li>
              <li>场地需求不等于实际预约，具体活动场地仍在发布活动时分别填写。</li>
            </ul>
          </section>
          <section>
            <h3>二、填写与审核</h3>
            <ul>
              <li>请按表单要求补充招新海报、活动计划及其他所需材料。</li>
              <li>教师将依据申报内容审核；被退回后，可根据意见修改原申报并重新提交。</li>
            </ul>
          </section>
          <section>
            <h3>三、通过后的责任</h3>
            <p>社团成立后，社长应公平组织招新，持续发布活动并如实沉淀参与记录。</p>
          </section>
        </div>

        <div className="declaration-guide-attachment">
          <FileText size={20} weight="duotone" aria-hidden="true" />
          <div>
            <strong>{declarationGuide.attachment}</strong>
            <span>申报材料填写参考</span>
          </div>
          <button type="button" className="text-button" onClick={onDownload}>下载</button>
        </div>
        <div className="declaration-guide-contact">申报咨询：学生发展中心（知行楼 302 室） · 李老师</div>
        <div className="dialog-actions">
          <button type="button" className="primary" onClick={onClose}>我知道了</button>
        </div>
      </section>
    </div>
  );
}
