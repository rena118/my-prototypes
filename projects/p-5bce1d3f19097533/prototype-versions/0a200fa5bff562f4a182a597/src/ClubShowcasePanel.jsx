import { useState } from "react";
import { Camera, Chats, Palette, Trophy } from "@phosphor-icons/react";
import { MomentViewer, momentNowTime, momentTimeText } from "./ManageMomentPage.jsx";

/* ==================== 社团风采 / 活动瞬间（1:1 移植学生端原型 app.js 的 GALLERY_DATA / GALLERY_GENERIC） ==================== */

const CLUB_GALLERY = {
  football: {
    moments: [
      { id: "fb-m1", type: "image", cover: "assets/moment-team-1.jpg", photos: ["assets/moment-team-1.jpg", "assets/moment-team-2.jpg", "assets/moment-team-3.jpg"], title: "梧桐道边的绝杀瞬间", desc: "最后三分钟边路突破下底传中，门前抢点破门，全场沸腾！三张连着看才够味。", author: "赵子安", role: "社长", time: "10-23 17:42" },
      { id: "fb-m2", type: "video", cover: "assets/gallery-sports.jpg", title: "周四训练高光集锦", desc: "定点传接、绕杆变速与分组对抗的高光剪辑，剪辑：陈沐阳。", author: "陈沐阳", role: "成员", time: "10-22 20:15", duration: "02:36" },
      { id: "fb-m3", type: "image", cover: "assets/gallery-sports.jpg", title: "红蓝分组对抗第一回合", desc: "蓝队 2:1 险胜，新社员的跑位意识进步非常明显。", author: "李一诺", role: "成员", time: "10-16 18:03" },
      { id: "fb-m4", type: "image", cover: "assets/gallery-sports.jpg", title: "秋日傍晚的热身花絮", desc: "夕阳下的拉伸与绕环，配合呼吸节奏完成 15 组动态热身。", author: "苏晓", role: "成员", time: "10-09 17:26" },
      { id: "fb-m5", type: "video", cover: "assets/gallery-sports.jpg", title: "联赛首轮进球合集", desc: "五粒进球逐帧回放，含两记直接任意球，解说：赵子安。", author: "赵子安", role: "社长", time: "10-02 21:30", duration: "01:48" },
      { id: "fb-m6", type: "image", cover: "assets/gallery-sports.jpg", title: "秋季学期全家福", desc: "18 名新老社员在西操场完成本学期第一次合影。", author: "李一诺", role: "成员", time: "09-25 16:50" },
      { id: "fb-m7", type: "video", cover: "assets/gallery-sports.jpg", title: "新成员欢迎会片段", desc: "老社员展示花式颠球，欢迎 6 名新同学加入足球联盟。", author: "苏晓", role: "成员", time: "09-11 19:08", duration: "00:58" },
    ],
    works: [
      { id: "fb-w1", publishTime: "10-20 16:40", type: "image", cover: "assets/gallery-sports.jpg", title: "《校园足球战术手册》", creator: "足球联盟 · 集体创作", author: "赵子安", time: "2026-10-20", desc: "整理 12 套常用站位与跑位路线，配 36 张手绘图解，已作为新社员训练教材。" },
      { id: "fb-w2", publishTime: "10-12 15:22", type: "image", cover: "assets/gallery-sports.jpg", title: "《颠球百日打卡》记录册", creator: "赵子安 · 社长", author: "赵子安", time: "2026-10-12", desc: "连续 100 天颠球打卡影像与数据曲线，最好成绩单次 214 个。" },
      { id: "fb-w3", publishTime: "09-30 14:08", type: "image", cover: "assets/gallery-sports.jpg", title: "守门员扑救动作拆解图", creator: "陈沐阳", author: "赵子安", time: "2026-09-30", desc: "以慢动作截图拆解侧扑、单手托球等 8 个标准动作，配训练要点注解。" },
      { id: "fb-w4", publishTime: "09-22 17:35", type: "image", cover: "assets/gallery-sports.jpg", title: "「班级联赛」策划案", creator: "李一诺", author: "赵子安", time: "2026-09-22", desc: "面向全校 24 个班级的迷你联赛方案，含赛程编排、裁判安排与安全预案。" },
      { id: "fb-w5", publishTime: "09-15 16:12", type: "image", cover: "assets/gallery-sports.jpg", title: "足球社队徽设计稿（第三版）", creator: "苏晓", author: "赵子安", time: "2026-09-15", desc: "以盾牌与星星为元素的新版队徽，经全员投票定为社团新形象。" },
    ],
    honors: [
      { id: "fb-h1", cover: "assets/cert-fb-h1.png", author: "赵子安", title: "2026 校园足球联赛 · 冠军", time: "2026-06", publishTime: "06-15 16:40" },
      { id: "fb-h2", cover: "assets/gallery-sports.jpg", author: "赵子安", title: "市中学生七人制足球赛 · 八强", time: "2026-05", publishTime: "05-24 10:12" },
      { id: "fb-h3", cover: "assets/cert-fb-h3.png", author: "赵子安", title: "2025-2026 学年「优秀学生社团」", time: "2025-12", publishTime: "12-26 15:05" },
      { id: "fb-h4", cover: "assets/cert-fb-h4.png", author: "赵子安", title: "校园足球联赛「最佳射手」", time: "2026-06", publishTime: "06-15 16:52" },
      { id: "fb-h5", cover: "assets/cert-fb-h5.png", author: "赵子安", title: "校园足球联赛「体育道德风尚奖」", time: "2026-06", publishTime: "06-15 17:03" },
    ],
  },
  robot: {
    moments: [
      { id: "rb-m1", type: "image", cover: "assets/gallery-tech.jpg", title: "塔式结构承重挑战", desc: "限用 20 根木条搭建承重塔，冠军小组承重达到自重的 42 倍。", author: "陈闻远", role: "社长", time: "10-24 17:35" },
      { id: "rb-m2", type: "video", cover: "assets/gallery-tech.jpg", title: "邀请赛任务实况录像", desc: "自动分拣与循迹任务全程实录，最终以 92 分获得二等奖。", author: "李一诺", role: "成员", time: "10-18 20:02", duration: "03:12" },
      { id: "rb-m3", type: "image", cover: "assets/gallery-tech.jpg", title: "深夜调试：循迹算法攻坚", desc: "为解决弯道丢线问题，程序组连续三晚迭代 PID 参数。", author: "陈闻远", role: "社长", time: "10-10 22:41" },
      { id: "rb-m4", type: "image", cover: "assets/gallery-tech.jpg", title: "向全校展示社内作品", desc: "导览机器人现场为 200 余名同学讲解校园地图。", author: "苏晓", role: "成员", time: "09-27 15:18" },
      { id: "rb-m5", type: "video", cover: "assets/gallery-tech.jpg", title: "新赛季任务发布会回顾", desc: "发布本赛季「智慧校园」主题任务与小组分工。", author: "陈闻远", role: "社长", time: "09-14 16:44", duration: "01:05" },
    ],
    works: [
      { id: "rb-w1", publishTime: "10-18 19:05", type: "image", cover: "assets/gallery-tech.jpg", title: "「校园导览机器人」整机作品", creator: "机器人探索社 · 集体创作", author: "陈闻远", time: "2026-10-18", desc: "集语音讲解、避障巡航与地图投影于一体的第三代导览机器人。" },
      { id: "rb-w2", publishTime: "10-08 20:14", type: "image", cover: "assets/gallery-tech.jpg", title: "自动分拣程序 v2.3（编程作品）", creator: "陈闻远 · 社长", author: "陈闻远", time: "2026-10-08", desc: "基于颜色识别与路径优化的分拣程序，任务完成率提升至 96%。" },
      { id: "rb-w3", publishTime: "09-26 15:48", type: "image", cover: "assets/gallery-tech.jpg", title: "机械臂结构件设计图纸", creator: "李一诺", author: "陈闻远", time: "2026-09-26", desc: "六自由度机械臂全套零件图纸，含公差标注与装配顺序说明。" },
      { id: "rb-w4", publishTime: "09-12 16:30", type: "image", cover: "assets/gallery-tech.jpg", title: "3D 打印齿轮组实物集", creator: "苏晓", author: "陈闻远", time: "2026-09-12", desc: "从建模到打印完成的 12 组传动齿轮，用于社内结构教学。" },
    ],
    honors: [],
  },
  drama: {
    moments: [
      { id: "dr-m1", type: "image", cover: "assets/gallery-art.jpg", title: "第四幕对手戏排练现场", desc: "两位主演第一次完整走完全场，导演组当场定稿走位。", author: "李若彤", role: "社长", time: "10-25 18:20" },
      { id: "dr-m2", type: "video", cover: "assets/gallery-art.jpg", title: "舞台灯光初体验", desc: "灯光组首次独立完成追光与氛围光切换的完整串场。", author: "王一一", role: "成员", time: "10-19 21:05", duration: "01:32" },
      { id: "dr-m3", type: "image", cover: "assets/gallery-art.jpg", title: "汇演后台的最后一分钟", desc: "上台前全组围圈鼓劲，社长带着大家喊出社团口号。", author: "沈亦然", role: "成员", time: "10-12 19:30" },
      { id: "dr-m4", type: "image", cover: "assets/gallery-art.jpg", title: "《雷雨》定妆照花絮", desc: "摄影社同学友情掌镜，四组人物定妆照全部完成。", author: "李若彤", role: "社长", time: "09-28 17:12" },
      { id: "dr-m5", type: "video", cover: "assets/gallery-art.jpg", title: "围读会上的即兴片段", desc: "围读间隙的即兴小剧场，笑翻了整个排练厅。", author: "王一一", role: "成员", time: "09-20 20:40", duration: "00:47" },
    ],
    works: [
      { id: "dr-w1", publishTime: "10-15 18:22", type: "image", cover: "assets/gallery-art.jpg", title: "《雷雨》第四幕舞台美术设计", creator: "舞美组 · 集体创作", author: "李若彤", time: "2026-10-15", desc: "全套布景、道具与灯光氛围方案，含手绘气氛图 9 张。" },
      { id: "dr-w2", publishTime: "10-08 20:36", type: "video", cover: "assets/gallery-art.jpg", title: "原创短剧《课桌上的星空》排练纪实", creator: "光影戏剧社 · 集体创作", author: "李若彤", time: "2026-10-08", duration: "05:20", desc: "记录原创短剧从围读到联排的完整排练过程纪实短片。" },
      { id: "dr-w3", publishTime: "09-24 17:10", type: "image", cover: "assets/gallery-art.jpg", title: "校园文化节主题海报设计", creator: "沈亦然", time: "2026-09-24", desc: "以「幕布与星光」为意象的节庆主视觉，被文化节组委会采用。" },
      { id: "dr-w4", publishTime: "09-10 15:55", type: "image", cover: "assets/gallery-art.jpg", title: "《光影定格》舞台摄影作品集", creator: "王一一", time: "2026-09-10", desc: "收录近两学期 32 张舞台瞬间摄影，配现场手记。" },
    ],
    honors: [
      { id: "dr-h1", cover: "assets/cert-dr-h1.png", author: "李若彤", title: "市中学生戏剧节「最佳剧目奖」", time: "2026-05", publishTime: "05-21 09:36" },
      { id: "dr-h2", cover: "assets/gallery-art.jpg", author: "李若彤", title: "校园文化节「最佳舞台呈现」", time: "2026-06", publishTime: "06-12 20:18" },
      { id: "dr-h3", cover: "assets/cert-dr-h3.png", author: "李若彤", title: "2025-2026 学年「优秀学生社团」", time: "2025-12", publishTime: "12-24 14:47" },
      { id: "dr-h4", cover: "assets/cert-dr-h4.png", author: "李若彤", title: "校园文化节「最佳女演员」", time: "2026-06", publishTime: "06-12 20:24" },
    ],
  },
  reading: { moments: [], works: [], honors: [] },
  "reading-member": { moments: [], works: [], honors: [] },
};

const GALLERY_GENERIC = {
  "体育": {
    moments: [
      { id: "gn-m1", type: "image", cover: "assets/gallery-sports.jpg", title: "训练场上的专注瞬间", desc: "记录{club}同学在训练中的高光时刻。", author: "{captain}", role: "社长", time: "10-20 17:30" },
      { id: "gn-m2", type: "video", cover: "assets/gallery-sports.jpg", title: "活动集锦短片", desc: "本学期{club}活动的精彩片段合集。", author: "沈知远", role: "成员", time: "10-12 19:00", duration: "01:40" },
      { id: "gn-m3", type: "image", cover: "assets/gallery-sports.jpg", title: "学期合影", desc: "{club}全体成员的秋季学期合影。", author: "{captain}", role: "社长", time: "09-28 16:40" },
    ],
    works: [
      { id: "gn-w1", publishTime: "10-15 16:20", type: "image", cover: "assets/gallery-sports.jpg", title: "学期训练成果汇编", creator: "{club} · 集体创作", author: "{captain}", time: "2026-10-15", desc: "整理本学期训练要点与成果记录。" },
      { id: "gn-w2", publishTime: "09-28 15:40", type: "image", cover: "assets/gallery-sports.jpg", title: "社员个人训练手账", creator: "社员", author: "{captain}", time: "2026-09-28", desc: "社员自主整理的训练打卡与心得记录。" },
    ],
    honors: [
      { id: "gn-h1", cover: "assets/gallery-sports.jpg", author: "{captain}", title: "校园活动「优秀组织奖」", time: "2026-06", publishTime: "06-18 11:20" },
      { id: "gn-h2", cover: "assets/gallery-sports.jpg", author: "{captain}", title: "「优秀学生社团」提名", time: "2025-12", publishTime: "06-19 15:42" },
    ],
  },
  "科技": {
    moments: [
      { id: "gn-m1", type: "image", cover: "assets/gallery-tech.jpg", title: "创客空间里的探索瞬间", desc: "记录{club}同学动手实践的高光时刻。", author: "{captain}", role: "社长", time: "10-20 17:30" },
      { id: "gn-m2", type: "video", cover: "assets/gallery-tech.jpg", title: "项目实况短片", desc: "本学期{club}项目推进的精彩片段。", author: "沈知远", role: "成员", time: "10-12 19:00", duration: "01:40" },
      { id: "gn-m3", type: "image", cover: "assets/gallery-tech.jpg", title: "开放日展示", desc: "{club}在校园开放日的作品展示现场。", author: "{captain}", role: "社长", time: "09-28 16:40" },
    ],
    works: [
      { id: "gn-w1", publishTime: "10-15 16:20", type: "image", cover: "assets/gallery-tech.jpg", title: "学期项目成果报告", creator: "{club} · 集体创作", author: "{captain}", time: "2026-10-15", desc: "本学期项目的设计思路与成果总结。" },
      { id: "gn-w2", publishTime: "09-28 15:40", type: "image", cover: "assets/gallery-tech.jpg", title: "社员创意设计稿", creator: "社员", author: "{captain}", time: "2026-09-28", desc: "社员自主完成的创意设计作品。" },
    ],
    honors: [
      { id: "gn-h1", cover: "assets/gallery-tech.jpg", author: "{captain}", title: "科技节「优秀作品奖」", time: "2026-06", publishTime: "06-20 09:05" },
      { id: "gn-h2", cover: "assets/gallery-tech.jpg", author: "{captain}", title: "「优秀学生社团」提名", time: "2025-12", publishTime: "06-21 14:30" },
    ],
  },
  "艺术": {
    moments: [
      { id: "gn-m1", type: "image", cover: "assets/gallery-art.jpg", title: "排练厅里的高光瞬间", desc: "记录{club}同学创作与排练的精彩时刻。", author: "{captain}", role: "社长", time: "10-20 17:30" },
      { id: "gn-m2", type: "video", cover: "assets/gallery-art.jpg", title: "舞台片段集锦", desc: "本学期{club}演出与展示的精彩片段。", author: "沈知远", role: "成员", time: "10-12 19:00", duration: "01:40" },
      { id: "gn-m3", type: "image", cover: "assets/gallery-art.jpg", title: "学期合影", desc: "{club}全体成员的秋季学期合影。", author: "{captain}", role: "社长", time: "09-28 16:40" },
    ],
    works: [
      { id: "gn-w1", publishTime: "10-15 16:20", type: "image", cover: "assets/gallery-art.jpg", title: "学期创作作品集", creator: "{club} · 集体创作", author: "{captain}", time: "2026-10-15", desc: "收录本学期社员的代表性创作成果。" },
      { id: "gn-w2", publishTime: "09-28 15:40", type: "image", cover: "assets/gallery-art.jpg", title: "社员个人作品", creator: "社员", author: "{captain}", time: "2026-09-28", desc: "社员自主完成的个人创作。" },
    ],
    honors: [
      { id: "gn-h1", cover: "assets/gallery-art.jpg", author: "{captain}", title: "文化艺术节「优秀展示奖」", time: "2026-06", publishTime: "12-22 10:35" },
      { id: "gn-h2", cover: "assets/gallery-art.jpg", author: "{captain}", title: "「优秀学生社团」提名", time: "2025-12", publishTime: "12-23 16:10" },
    ],
  },
  "人文": {
    moments: [
      { id: "gn-m1", type: "image", cover: "assets/gallery-humanities.jpg", title: "共读分享的温暖瞬间", desc: "记录{club}同学交流分享的高光时刻。", author: "{captain}", role: "社长", time: "10-20 17:30" },
      { id: "gn-m2", type: "video", cover: "assets/gallery-humanities.jpg", title: "活动现场片段", desc: "本学期{club}活动的精彩片段合集。", author: "沈知远", role: "成员", time: "10-12 19:00", duration: "01:40" },
      { id: "gn-m3", type: "image", cover: "assets/gallery-humanities.jpg", title: "学期合影", desc: "{club}全体成员的秋季学期合影。", author: "{captain}", role: "社长", time: "09-28 16:40" },
    ],
    works: [
      { id: "gn-w1", publishTime: "10-15 16:20", type: "image", cover: "assets/gallery-humanities.jpg", title: "学期共读成果汇编", creator: "{club} · 集体创作", author: "{captain}", time: "2026-10-15", desc: "整理本学期共读笔记与分享成果。" },
      { id: "gn-w2", publishTime: "09-28 15:40", type: "image", cover: "assets/gallery-humanities.jpg", title: "社员个人创作", creator: "社员", author: "{captain}", time: "2026-09-28", desc: "社员围绕社团主题完成的个人创作。" },
    ],
    honors: [
      { id: "gn-h1", cover: "assets/gallery-humanities.jpg", author: "{captain}", title: "「优秀阅读推广活动」", time: "2026-06", publishTime: "12-24 11:48" },
      { id: "gn-h2", cover: "assets/gallery-humanities.jpg", author: "{captain}", title: "「优秀学生社团」提名", time: "2025-12", publishTime: "12-25 15:22" },
    ],
  },
};

const GALLERY_SUBTABS = [
  { key: "works", label: "作品集锦", emptyTitle: "还没有作品", emptyHint: "绘画、摄影、手工、编程……社员的作品整理好之后会陈列在这里。" },
  { key: "honors", label: "荣誉时刻", emptyTitle: "还没有荣誉记录", emptyHint: "获奖证书、颁奖现场的照片都可以传上来，留作社团共同的高光时刻。" },
];

/* ---------- 原型辅助函数 ---------- */

function galleryAvatarColor(name) {
  const palette = ["#5b8cff", "#7b5bff", "#f08a16", "#22a06b", "#e0566b", "#2a9dcf"];
  let sum = 0;
  for (let i = 0; i < String(name).length; i += 1) sum += String(name).charCodeAt(i);
  return palette[sum % palette.length];
}

function cleanAuthorName(name) {
  return String(name).replace(/\s*[·・]\s*(社\s*长|副社\s*长|成\s*员)\s*$/, "").trim();
}

function galleryAuthorOf(tab, item) {
  if (tab === "moments") return cleanAuthorName(item.author || "社团成员");
  return cleanAuthorName(item.author || item.uploader || "社长");
}

function galleryPhotosOf(item) {
  if (!item) return [];
  if (item.photos && item.photos.length) return item.photos.filter(Boolean).slice(0, 3);
  return item.cover ? [item.cover] : [];
}

function galleryTimeValue(item) {
  if (item && item.ts) return item.ts;
  const text = String((item && item.time) || "");
  const full = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (full) return new Date(+full[1], +full[2] - 1, +full[3]).getTime();
  const short = text.match(/^(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2})/);
  if (short) return new Date(2026, +short[1] - 1, +short[2], +short[3], +short[4]).getTime();
  return 0;
}

function getGalleryData(club) {
  const data = CLUB_GALLERY[club.id];
  if (data) return data;
  const raw = JSON.stringify(GALLERY_GENERIC[club.category] || GALLERY_GENERIC["人文"]);
  return JSON.parse(raw.split("{club}").join(club.name).split("{captain}").join(club.captain || club.leader || "社长"));
}

function gallerySortedList(club, tab) {
  return (getGalleryData(club)[tab] || []).slice().sort((a, b) => galleryTimeValue(b) - galleryTimeValue(a));
}

/* ---------- 卡片（对应原型 galleryCardHTML） ---------- */

function GalleryCard({ tab, item, onOpen }) {
  const isVideo = item.type === "video";
  const author = galleryAuthorOf(tab, item);
  const photos = galleryPhotosOf(item);
  const photoCount = isVideo ? 0 : photos.length;
  const [turnIndex, setTurnIndex] = useState(0);
  const turnable = tab === "moments" && photoCount > 1;
  const sublineHTML = tab === "works" && item.creator ? <span className="gcard-winner"><em>创作者</em>{item.creator}</span> : null;
  const metaTimeHTML = tab === "honors" && item.time ? <span className="gcard-winner is-time"><em>获奖时间</em>{item.time}</span> : null;
  const footTime = momentTimeText(item.publishTime || item.time || "");
  const turn = (delta) => (event) => { event.stopPropagation(); setTurnIndex((value) => Math.min(Math.max(value + delta, 0), photoCount - 1)); };
  const coverSrc = turnable ? photos[turnIndex] : item.cover;
  return (
    <button type="button" className={`gcard${tab === "honors" ? " gcard-honor" : ""}`} onClick={() => onOpen(item, turnIndex)}>
      <span className={`gcard-cover${!isVideo && photoCount > 1 && !turnable ? ` is-multi is-n${Math.min(photoCount, 3)}` : ""}`}>
        {isVideo && !item.cover && item.videoSrc
          ? <video className="gcard-video-cover" src={item.videoSrc} muted playsInline preload="metadata" />
          : !isVideo && photoCount > 1 && !turnable
            ? photos.slice(0, 3).map((src) => <img key={src} src={src} alt={item.title} loading="lazy" />)
            : coverSrc
              ? <img src={coverSrc} alt={item.title} loading="lazy" />
              : <span className="gcard-cover-empty"><Camera size={16} /> 暂无照片</span>}
        {isVideo && <>
          <span className="video-play-badge gcard-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 6.6v10.8L18 12z" fill="currentColor" /></svg></span>
          <span className="video-duration">{item.duration || "00:00"}</span>
        </>}
        {turnable && <>
          {turnIndex > 0 && <span className="gcard-turn is-prev" role="button" tabIndex={0} aria-label="上一张照片" onClick={turn(-1)} onKeyDown={(event) => (event.key === "Enter") && turn(-1)(event)}>‹</span>}
          {turnIndex < photoCount - 1 && <span className="gcard-turn" role="button" tabIndex={0} aria-label="下一张照片" onClick={turn(1)} onKeyDown={(event) => (event.key === "Enter") && turn(1)(event)}>›</span>}
          <span className="gcard-count">{turnIndex + 1} / {photoCount}</span>
        </>}
        {!isVideo && photoCount > 1 && !turnable && <span className="gcard-count"><Camera size={12} />{photoCount} 张</span>}
      </span>
      <span className="gcard-body">
        <span className={`gcard-title${tab === "moments" ? " is-lead" : ""}`}>{item.title}</span>
        {sublineHTML}
        {metaTimeHTML}
        {item.desc ? <span className={`gcard-desc${tab === "honors" ? " is-single" : ""}`}>{item.desc}</span> : null}
        <span className="gcard-foot">
          <i className="gcard-avatar" style={{ background: galleryAvatarColor(author) }}>{String(author).charAt(0)}</i>
          <b>{author}</b>
          {footTime ? <time>{footTime}</time> : null}
        </span>
      </span>
    </button>
  );
}

function GalleryGrid({ club, tab, onOpen }) {
  const list = gallerySortedList(club, tab);
  if (!list.length) return null;
  return <div className="gallery-grid">{list.map((item) => <GalleryCard key={item.id} tab={tab} item={item} onOpen={onOpen} />)}</div>;
}

/* ---------- 空状态（对应原型 galleryEmptyHTML） ---------- */

function GalleryEmpty({ tab, cta, tip }) {
  return (
    <div className={`gallery-empty is-${tab}`}>
      <span className="gallery-empty-art">{tab === "works" ? <Palette size={26} weight="duotone" /> : tab === "honors" ? <Trophy size={26} weight="duotone" /> : <Camera size={26} weight="duotone" />}</span>
      <strong>{tab === "works" ? "还没有作品" : tab === "honors" ? "还没有荣誉记录" : "还没有活动瞬间"}</strong>
      <p>{tab === "works"
        ? "绘画、摄影、手工、编程……社员的作品整理好之后会陈列在这里。"
        : tab === "honors"
          ? "获奖证书、颁奖现场的照片都可以传上来，留作社团共同的高光时刻。"
          : "活动结束后，把照片和当时的心情分享出来，这里就会长成社团的相册。"}</p>
      {cta}
      {tip ? <span className="gallery-empty-tip">{tip}</span> : null}
    </div>
  );
}

/* ---------- 详情弹窗（对应原型 openGalleryLightbox / openGalleryVideo / openGalleryHonor） ---------- */

export function GalleryDetail({ club, tab, item, startIndex, onClose, onNotify }) {
  const [playing, setPlaying] = useState(false);
  const photos = galleryPhotosOf(item);
  const multi = !item.type || item.type !== "video" ? photos.length > 1 : false;
  const [current, setCurrent] = useState(() => Math.min(Math.max(Number(startIndex) || 0, 0), Math.max(photos.length - 1, 0)));
  const author = galleryAuthorOf(tab, item);
  const sub = tab === "works"
    ? `${item.author ? "上传者：" : "创作者："}${author} · 发布时间 ${momentTimeText(item.publishTime || item.time)}`
    : tab === "honors"
      ? (item.time ? "获奖时间 " + momentTimeText(item.time) + " · " : "") + "上传者 " + author + (item.publishTime ? " · 发布时间 " + momentTimeText(item.publishTime) : "")
      : "发布人 " + author + " · 发布时间 " + momentTimeText(item.time);

  if (item.type === "video") {
    return (
      <div className="dialog-backdrop" role="presentation" onClick={onClose}>
        <div className="video-player-modal" role="dialog" aria-modal="true" aria-label="视频播放" onClick={(event) => event.stopPropagation()}>
          <button className="dialog-close" type="button" aria-label="关闭" onClick={onClose}>×</button>
          <div className={`video-player-stage${playing ? " playing" : ""}`}>
            {item.cover
              ? <img src={item.cover} alt={item.title} />
              : <video className="video-stage-native" src={item.videoSrc || ""} muted playsInline preload="metadata" />}
            <span className="video-cover-mask" aria-hidden="true" />
            <button className="video-play-button" type="button" aria-label="播放" onClick={() => { setPlaying(true); onNotify?.("原型演示：此处将接入社团活动视频播放"); }}>
              <svg viewBox="0 0 24 24"><path d="M8.4 5.6v12.8L19 12z" fill="currentColor" /></svg>
            </button>
            <div className="video-player-bar"><span>00:00</span><span className="video-progress"><i className="video-progress-fill" /></span><span>{item.duration || "00:00"}</span></div>
          </div>
          <div className="video-player-info">
            <strong>{item.title}</strong>
            <span className="video-info-meta">发布人 {author} · 发布时间 {momentTimeText(item.publishTime || item.time)}</span>
            {item.desc ? <p className="video-info-desc">{item.desc}</p> : null}
          </div>
        </div>
      </div>
    );
  }

  if (tab === "honors") {
    return (
      <div className="dialog-backdrop" role="presentation" onClick={onClose}>
        <div className="honor-photo-dialog" role="dialog" aria-modal="true" aria-label="荣誉详情" onClick={(event) => event.stopPropagation()}>
          <button className="dialog-close honor-photo-close" type="button" aria-label="关闭" onClick={onClose}>×</button>
          <div className="honor-photo-stage">
            {item.cover
              ? <img src={item.cover} alt={item.title} />
              : <span className="honor-photo-missing"><Camera size={24} /> 这份荣誉还没有上传照片</span>}
          </div>
          <div className="honor-photo-info">
            <h2>{item.title}</h2>
            {item.time ? <dl className="honor-photo-meta"><div className="honor-photo-meta-row"><dt>获奖时间</dt><dd>{item.time}</dd></div></dl> : null}
            {item.desc ? <p className="honor-photo-desc">{item.desc}</p> : null}
            <div className="honor-photo-uploader">
              <i className="gcard-avatar" style={{ background: galleryAvatarColor(author) }}>{String(author).charAt(0)}</i>
              <div><b>{author}</b><span>发布时间 · {momentTimeText(item.publishTime || item.time)}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <div className={`poster-preview gallery-lightbox${multi ? " is-multi" : ""}`} role="dialog" aria-modal="true" aria-label={item.title} onClick={(event) => event.stopPropagation()}>
        <button className="dialog-close" type="button" aria-label="关闭" onClick={onClose}>×</button>
        <div className="lightbox-stage">
          <img src={photos[current] || ""} alt={item.title} />
          {multi && <>
            <button type="button" className="lightbox-nav prev" aria-label="上一张" onClick={() => setCurrent((value) => (value - 1 + photos.length) % photos.length)}>‹</button>
            <button type="button" className="lightbox-nav next" aria-label="下一张" onClick={() => setCurrent((value) => (value + 1) % photos.length)}>›</button>
            <span className="lightbox-counter">{current + 1} / {photos.length}</span>
          </>}
        </div>
        <div className="gallery-lightbox-caption">
          <strong>{item.title}</strong>
          <span className="lightbox-meta">{sub}</span>
          {item.desc ? <span className="gallery-lightbox-desc">{item.desc}</span> : null}
        </div>
      </div>
    </div>
  );
}

/* ---------- 面板：mode = "gallery"（社团风采，二级 Tab） | "moments"（活动瞬间，一级 Tab） ---------- */

export function ClubShowcasePanel({ club, mode, onShare, onNotify }) {
  const [tab, setTab] = useState("works");
  const [detail, setDetail] = useState(null);
  const [viewIndex, setViewIndex] = useState(null);
  const [likeState, setLikeState] = useState({});
  const [commentState, setCommentState] = useState({});
  const counts = { works: gallerySortedList(club, "works").length, honors: gallerySortedList(club, "honors").length };
  const moments = gallerySortedList(club, "moments");
  const latest = moments[0];
  /* 活动瞬间：映射为「我管理的」查看器的 moment 结构（本地演示点赞 / 评论） */
  const momentList = moments.map((item) => ({
    id: item.id,
    author: item.author,
    role: item.role,
    time: item.time,
    title: item.title,
    caption: item.desc,
    type: item.type,
    videoSrc: item.videoSrc,
    duration: item.duration,
    cover: item.cover,
    photos: item.type === "video" ? [] : (item.photos || [item.cover]),
    likes: likeState[item.id]?.likes ?? 0,
    liked: likeState[item.id]?.liked ?? false,
    commentList: commentState[item.id] || [],
  }));
  const openDetail = (item, photoIndex) => {
    if (mode === "moments") {
      setViewIndex(momentList.findIndex((moment) => moment.id === item.id));
      return;
    }
    setDetail({ tab, item, photoIndex });
  };

  if (mode === "moments") {
    return (
      <div className="gallery-panel moments-panel">
        {moments.length ? (
          <div className="moments-head">
            <p className="moments-head-text"><Chats size={14} />
              社员在活动后分享的照片与感想 · 共 <b>{moments.length}</b> 条
              {latest && latest.time ? <i>最近更新 {latest.time}</i> : null}
            </p>
            <div className="gallery-subtabs-actions">
              {onShare
                ? <button type="button" className="gallery-share-entry" onClick={onShare}><Camera size={13} /><span>去分享瞬间</span></button>
                : <span className="gallery-upload-note"><Camera size={13} />活动瞬间由社团成员分享</span>}
            </div>
          </div>
        ) : null}
        {moments.length
          ? <GalleryGrid club={club} tab="moments" onOpen={openDetail} />
          : <GalleryEmpty tab="moments" cta={onShare ? <button type="button" className="gallery-empty-cta" onClick={onShare}><Camera size={14} />去分享瞬间</button> : null} tip={onShare ? "跳转到「我报名的」社团卡片发布，内容会同步到这里" : ""} />}
        {viewIndex !== null && viewIndex >= 0 && <MomentViewer
          list={momentList}
          startIndex={viewIndex}
          onClose={() => setViewIndex(null)}
          onLike={(id) => setLikeState((current) => {
            const prev = current[id] || { likes: 0, liked: false };
            return { ...current, [id]: { likes: prev.likes + (prev.liked ? -1 : 1), liked: !prev.liked } };
          })}
          onComment={(id, text) => setCommentState((current) => ({ ...current, [id]: [...(current[id] || []), { author: "赵子易", text, time: momentNowTime() }] }))}
          commentCountText={(n) => (n ? `共 ${n} 条` : "")}
        />}
      </div>
    );
  }

  const meta = GALLERY_SUBTABS.find((item) => item.key === tab);
  const total = counts.works + counts.honors;
  return (
    <div className="gallery-panel">
      <div className="gallery-subtabs-row">
        <div className="gallery-subtabs" role="tablist">
          {GALLERY_SUBTABS.map((item) => (
            <button type="button" key={item.key} role="tab" aria-selected={tab === item.key} className={`gallery-subtab${tab === item.key ? " active" : ""}`} onClick={() => setTab(item.key)}>
              {item.key === "works" ? <Palette size={13} /> : <Trophy size={13} />}{item.label}<em>{counts[item.key]}</em>
            </button>
          ))}
        </div>
        {total ? <div className="gallery-subtabs-actions"><span className="gallery-upload-note"><Trophy size={13} />作品与荣誉由社长上传</span></div> : null}
      </div>
      {counts[tab]
        ? <GalleryGrid club={club} tab={tab} onOpen={openDetail} />
        : <GalleryEmpty tab={tab} tip="作品与荣誉由社长统一上传，整理好之后会陈列在这里" />}
      {detail && <GalleryDetail club={club} tab={detail.tab} item={detail.item} startIndex={detail.photoIndex} onClose={() => setDetail(null)} onNotify={onNotify} />}
    </div>
  );
}
