import { useMemo, useState } from "react";
import { ClubShowcasePanel, GalleryDetail } from "./ClubShowcasePanel.jsx";
import { momentNowTime, momentTimeText } from "./ManageMomentPage.jsx";
import {
  ArrowLeft, Camera, CaretDown, CaretRight, Check, Clock, Heart, ImageSquare,
  MapPin, Medal, Paperclip, Plus, Star, Trophy, UploadSimple, Users, X,
} from "@phosphor-icons/react";

const gallery = {
  works: [
    { id: "w1", publishTime: "10-20 16:40", title: "《校园足球战术手册》", creator: "足球联盟 · 集体创作", desc: "整理 12 套常用站位与跑位路线，配 36 张手绘图解，已作为新成员训练教材。", cover: "assets/gallery-sports.jpg", date: "2026-10-20" },
    { id: "w2", publishTime: "10-12 15:22", title: "《颠球百日打卡》记录册", creator: "赵子安 · 社长", desc: "连续 100 天颠球打卡影像与数据曲线，最好成绩单次 214 个。", cover: "assets/gallery-sports.jpg", date: "2026-10-12" },
    { id: "w3", publishTime: "09-30 14:08", title: "守门员扑救动作拆解图", creator: "陈沐阳", desc: "以慢动作截图拆解侧扑、单手托球等 8 个标准动作。", cover: "assets/gallery-sports.jpg", date: "2026-09-30" },
    { id: "w4", publishTime: "09-22 17:35", title: "「班级联赛」策划案", creator: "李一诺", desc: "面向全校 24 个班级的迷你联赛方案，含赛程编排与安全预案。", cover: "assets/gallery-sports.jpg", date: "2026-09-22" },
    { id: "w5", publishTime: "09-15 16:12", title: "足球社队徽设计稿（第三版）", creator: "苏晓", desc: "以盾牌与星星为元素的新版队徽，经全员投票定为社团新形象。", cover: "assets/gallery-sports.jpg", date: "2026-09-15" },
  ],
  honors: [
    { id: "h1", publishTime: "10-24 09:40", title: "校园足球联赛 · 冠军", time: "2026-10-24", desc: "在校级联赛中获得冠军。", cover: "assets/cert-fb-h1.png", date: "2026-10-24" },
    { id: "h2", publishTime: "06-20 15:18", title: "优秀学生社团", time: "2026-06-20", desc: "获评本学年优秀学生社团。", cover: "assets/cert-fb-h3.png", date: "2026-06-20" },
    { id: "h3", publishTime: "05-18 10:26", title: "最佳组织奖", time: "2026-05-18", desc: "校园体育文化节最佳组织奖。", cover: "assets/cert-fb-h4.png", date: "2026-05-18" },
  ],
};

const momentPhotos = ["assets/moment-team-1.jpg", "assets/moment-team-2.jpg", "assets/moment-team-3.jpg"];

const memberClubs = [
  {
    id: "documentary-member", name: "校园纪录片社", category: "艺术", leader: "林小薇", joinedAt: "2026-09-04", attendance: "3 / 3 场", hours: "6.0 小时", cover: "assets/poster-drama.jpg", hasGallery: true, creditState: "done",
    works: 2, honors: 2,
    activities: [
      { id: "doc-next", day: "10.25", week: "周五", title: "校园人物微纪录片初剪沟通会", time: "15:30 - 17:00", venue: "影媒工作间 204", status: "待开展", attendance: "", shares: 2, desc: "各创作小组带好初剪素材，集中讨论叙事节奏、镜头衔接与后续补拍安排。" },
      { id: "doc-next-2", day: "10.30", week: "周三", title: "校园微纪录片补拍分工会", time: "15:30 - 17:00", venue: "影媒工作间 204", status: "待开展", attendance: "", shares: 3, desc: "确认补拍场景、采访对象与器材使用安排，完成外拍前的分工准备。" },
      { id: "doc-done", day: "10.18", week: "周五", title: "影视摄影构图与手持云台实操训练", time: "15:30 - 17:00", venue: "影媒工作间 204", status: "已结束", attendance: "已出勤", shares: 4, desc: "完成三轴稳定器校准、平移与低角度跟拍实训，并采集首期拍摄素材。" },
      { id: "doc-done-2", day: "10.11", week: "周五", title: "纪录片选题与采访提纲工作坊", time: "15:30 - 17:00", venue: "影媒工作间 204", status: "已结束", attendance: "已出勤", shares: 6, desc: "完成选题聚焦与采访提纲初稿，并确定各组的第一位采访对象。" },
      { id: "doc-done-3", day: "10.04", week: "周五", title: "校园故事采集与分镜设计", time: "15:30 - 17:00", venue: "影媒工作间 204", status: "已结束", attendance: "请假", shares: 3, desc: "围绕校园人物与场景梳理可拍素材，完成第一版分镜草图。" },
    ],
  },
  {
    id: "reading-member", name: "山海阅读会", category: "人文", leader: "周予安", joinedAt: "2026-09-06", attendance: "2 / 2 场", hours: "3.0 小时", cover: "assets/poster-reading.jpg", hasGallery: false,
    works: 0, honors: 0,
    activities: [
      { id: "reading-next", day: "10.27", week: "周日", title: "《山海经》异兽想象共读分享", time: "12:30 - 13:30", venue: "图书馆 302", status: "待开展", attendance: "", shares: 5, desc: "围绕本周共读章节交流异兽形象、神话叙事与个人阅读发现。" },
      { id: "reading-done", day: "10.13", week: "周日", title: "秋日书单交换与主题共读", time: "12:30 - 13:30", venue: "图书馆 302", status: "已结束", attendance: "已出勤", shares: 7, desc: "完成秋日主题书单交换，并共同确定下一阶段阅读章节。" },
    ],
  },
];

function detailClub(club) {
  return { ...club, poster: club.id.includes("reading") ? "reading" : "drama", short: club.id.includes("reading") ? "一起读、一起聊，从一本书延伸到更广阔的世界。" : "记录校园真实故事，学习拍摄与剪辑技巧，创作校园微纪录片。", captain: club.leader, members: club.id.includes("reading") ? 18 : 16, capacity: 24, memberActivities: club.activities, events: club.activities.map((a) => `${a.day} · ${a.title}`) };
}

export function PatchMyClubsPage({ onShowClub, onOpenMoment, onApplyCredit, initialPendingOpen = false, creditStates = {}, onWithdrawCredit, onViewCredit, onViewCreditApplication, onDemoCreditState }) {
  // 学分申请按钮状态机（正式规则）：
  // 申请学分（未申请）→ 提交后「撤回申请（未初审）」，学生可撤回，撤回后回到申请学分；
  // 社长确认初审后「初审中」，按钮置灰不可操作；负责教师终审核定中「终审中」，按钮置灰不可操作；
  // 终审核定通过后「查看学分」，点击查看学分认定结果。
  // 状态由社长初审、教师终审流程驱动，学生端仅在「未初审」阶段可撤回。
  const [expanded, setExpanded] = useState(memberClubs[0].id);
  const [showApplication, setShowApplication] = useState(initialPendingOpen);
  const [pendingWithdrawn, setPendingWithdrawn] = useState(false);
  const [withdrawConfirm, setWithdrawConfirm] = useState(false);
  const [creditWithdrawClub, setCreditWithdrawClub] = useState(null);
  return <div className="fd-mine">
    <div className="fd-mine-toolbar"><select aria-label="选择学期"><option>2026-2027 学年上学期</option><option>2025-2026 学年下学期</option></select>{onDemoCreditState && <label className="fd-demo-state"><span>原型演示 · 学分状态</span><select aria-label="演示切换学分状态" value={creditStates[expanded] || "none"} disabled={!expanded} onChange={(event) => onDemoCreditState(expanded, event.target.value)}><option value="none">未申请</option><option value="withdrawn">已撤回</option><option value="pending">待社长初审</option><option value="initial">社长初审中</option><option value="final">教师终审中</option><option value="approved">已认定</option></select></label>}</div>
    <div className={`my-application-block${showApplication && !pendingWithdrawn ? " open" : ""}${pendingWithdrawn ? " withdrawn" : ""}`}>
      {pendingWithdrawn ? <section className="my-application-notice withdrawn"><span className="notice-dot" aria-hidden="true" /><strong>已取消「机器人探索社」的报名申请</strong><span className="notice-sub">如需再报名，可重新提交申请</span></section> : <section className="my-application-notice"><span className="notice-dot" aria-hidden="true" /><strong>1 个报名申请待社长审核</strong><span className="notice-sub">机器人探索社</span><div className="notice-actions"><button type="button" className="notice-link" onClick={() => setShowApplication(!showApplication)}>{showApplication ? "收起" : "查看申请"}<CaretDown size={13} className={showApplication ? "rotated" : ""} /></button></div></section>}
      {showApplication && !pendingWithdrawn && <div className="join-application-list"><article className="join-application-row"><div className="join-application-cover robot" /><div className="join-application-main"><div><span className="category-tag">科技</span><h2>机器人探索社</h2></div><p>提交于 2026-09-12 16:20</p><span>申请说明：希望参与结构搭建与编程挑战，持续完成学期作品。</span></div><button type="button" className="secondary danger-outline compact" onClick={() => setWithdrawConfirm(true)}>取消报名</button></article></div>}
    </div>
    <div className="fd-section-title"><h2>已加入的社团</h2><span>2 个</span></div>
    <div className="fd-joined-list">{memberClubs.map((club) => { const open = expanded === club.id; const creditState = creditStates[club.id]; const next = club.activities.find((item) => item.status === "待开展"); return <article className={`fd-joined ${open ? "is-open" : ""}`} key={club.id}>
      <header className="fd-joined-head">
        <img src={club.cover} alt="" />
        <div className="fd-joined-summary"><div><h3>{club.name}</h3><em>{club.category}</em></div><p>出勤 {club.attendance}<i />累计 {club.hours}</p></div>
        <div className="fd-next"><span>下一场活动</span><strong>{next?.title || "暂未发布"}</strong>{next && <p><b>{next.day} {next.week}</b><Clock size={12} />{next.time}<MapPin size={12} />{next.venue}</p>}</div>
        <div className="fd-credit-wrap">
          {creditState === "approved" ? (
            <button className="fd-credit is-approved" type="button" onClick={() => onViewCredit?.(club)}>查看学分</button>
          ) : (
            <>
              {creditState === "pending" || creditState === "initial" || creditState === "final" ? (
                <button className="fd-credit is-view" type="button" onClick={() => onViewCreditApplication?.(club)}>查看学分申请</button>
              ) : (
                <button className="fd-credit" type="button" onClick={() => onApplyCredit(club)}>申请学分</button>
              )}
              {creditState === "pending" && <button type="button" className="fd-credit-sub is-danger" onClick={() => setCreditWithdrawClub(club)}>撤回学分申请</button>}
              {(creditState === "initial" || creditState === "final") && <span className="fd-credit-sub is-muted">审核中</span>}
            </>
          )}
        </div>
        <button className="fd-text-link" type="button" onClick={() => onShowClub(detailClub(club))}>查看社团</button>
        <button className="fd-text-link" type="button" onClick={() => setExpanded(open ? "" : club.id)}>{open ? "收起" : "展开"}<CaretDown size={12} /></button>
      </header>
      <button type="button" className={`fd-showcase-entry ${club.hasGallery ? "has-content" : "is-empty"}`} onClick={() => onShowClub(detailClub(club), "showcase")}>
        <span className="fd-trophy"><Trophy size={17} weight="fill" /></span><span><strong>社团成果荣誉</strong><small>{club.hasGallery ? `${club.works} 件作品 ｜ ${club.honors} 项荣誉` : "社长还未上传作品与荣誉"}</small></span><em>查看 <CaretRight size={12} /></em>
      </button>
      {open && <div className="fd-activity-area"><div className="fd-activity-area-head"><strong>社团活动 · 共 {club.activities.length} 场</strong><span>滚动查看全部</span></div><div className="fd-member-activities">{club.activities.map((activity) => <article className="fd-member-activity" key={activity.id}>
        <div className="fd-date"><strong>{activity.day}</strong><span>{activity.week}</span></div>
        <div className="fd-member-activity-main"><div><h4>{activity.title}</h4><em className={activity.status === "待开展" ? "upcoming" : "ended"}>{activity.status}</em>{activity.attendance && <em className="attendance">{activity.attendance}</em>}</div><p><Clock size={12} />{activity.time}<MapPin size={12} />{activity.venue}</p><span>{activity.desc}</span></div>
        <button type="button" className="member-moment-panel" onClick={() => onOpenMoment({ ...activity, discussion: activity.shares, clubName: club.name })} aria-label={`查看并分享「${activity.title}」的活动瞬间，已有 ${activity.shares} 份分享`}><span className="moment-stack"><img className="moment-stack-shot shot-0" src={momentPhotos[0]} alt="" /><img className="moment-stack-shot shot-1" src={momentPhotos[1]} alt="" /><span className="moment-stack-badge" aria-hidden="true"><Camera size={11} weight="bold" /></span></span><strong className="moment-panel-title">分享活动瞬间</strong><span className="moment-panel-hook">已有 {activity.shares} 份分享</span></button>
      </article>)}</div></div>}
    </article>; })}</div>
    {withdrawConfirm && <div className="dialog-backdrop" role="presentation" onClick={() => setWithdrawConfirm(false)}>
      <section className="dialog confirm-dialog" role="dialog" aria-modal="true" aria-label="取消报名" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="dialog-close" onClick={() => setWithdrawConfirm(false)} aria-label="关闭">×</button>
        <span className="eyebrow">取消报名</span>
        <h2>取消「机器人探索社」的报名？</h2>
        <p>取消后本学期将无法参加该社团活动，再次加入需重新提交申请。</p>
        <div className="dialog-actions">
          <button type="button" className="secondary" onClick={() => setWithdrawConfirm(false)}>再想想</button>
          <button type="button" className="primary danger" onClick={() => { setWithdrawConfirm(false); setPendingWithdrawn(true); setShowApplication(false); }}>确认取消</button>
        </div>
      </section>
    </div>}
    {creditWithdrawClub && <div className="dialog-backdrop" role="presentation" onClick={() => setCreditWithdrawClub(null)}>
      <section className="dialog" role="dialog" aria-modal="true" aria-label="撤回学分申请" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="dialog-close" onClick={() => setCreditWithdrawClub(null)} aria-label="关闭">×</button>
        <span className="eyebrow">撤回学分申请</span>
        <h2>{creditWithdrawClub.name}</h2>
        <p>撤回后本次申请作废且无法恢复，认定学分需重新提交申请。</p>
        <div className="dialog-actions">
          <button type="button" className="secondary" onClick={() => setCreditWithdrawClub(null)}>取消</button>
          <button type="button" className="primary danger" onClick={() => { onWithdrawCredit?.(creditWithdrawClub); setCreditWithdrawClub(null); }}>确认撤回</button>
        </div>
      </section>
    </div>}
  </div>;
}

function GalleryCards({ type, items, onPreview }) {
  return <div className="fd-gallery-grid">{items.map((item) => <button type="button" className={`fd-gallery-card ${type}`} key={item.id} onClick={() => onPreview(item)}><span className="fd-gallery-cover"><img src={item.cover} alt={item.title} /></span><span className="fd-gallery-body"><strong>{item.title}</strong>{type === "works" && item.creator && <span><em>创作者</em>{item.creator}</span>}{type === "honors" && item.time && <span><em>获奖时间</em>{item.time}</span>}{item.desc && <p>{item.desc}</p>}<small><b>赵</b>赵子安<i>社长上传</i><time>{item.date}</time></small></span></button>)}</div>;
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

export function PatchClubDetailPage({ club, memberView, joined = false, initialView = "detail", onOpenMoment, onNotify, CardComponent, onApplyClub, onCancelJoin }) {
  const [tab, setTab] = useState(initialView === "showcase" ? "gallery" : initialView === "moments" ? "moments" : "detail");
  const [posterOpen, setPosterOpen] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const cover = club?.poster === "reading" ? "assets/poster-reading.jpg" : club?.poster === "drama" ? "assets/poster-drama.jpg" : "assets/poster-football.jpg";
  // 近期活动：优先使用「我报名的」传入的成员活动，否则解析广场社团的 events 字符串
  const activities = useMemo(() => {
    if (club?.memberActivities?.length) return club.memberActivities;
    return (club?.events || []).map((event, index) => {
      const parsed = parseEventLabel(event);
      return { id: `evt-${index}`, day: parsed.monthDay, week: "", title: parsed.title, time: parsed.time, venue: parsed.venue, status: index === 0 ? "待开展" : "已结束" };
    });
  }, [club]);
  const shownActivities = activities.length ? activities : memberClubs[0].activities;
  const visibleActivities = showAllActivities ? shownActivities : shownActivities.slice(0, 2);
  const tabs = memberView ? [["detail", "社团详情"], ["gallery", "社团风采"], ["moments", "活动瞬间"]] : [["detail", "社团详情"], ["gallery", "社团风采"]];
  if (!club) return null;
  const isJoined = joined || memberView;
  return <div className="fd-detail">
    {CardComponent
      ? <CardComponent club={club} joined={isJoined ? "joined" : ""} hideViewButton onApply={() => onApplyClub?.(club)} onCancel={onCancelJoin} />
      : <section className="fd-club-hero"><img src={cover} alt={club.name} /><div className="fd-club-copy"><div><h2>{club.name}</h2><em>{club.category}</em></div><p><b>社团简介：</b>{club.short || "面向兴趣相同的同学，持续开展学生自主组织的社团活动。"}</p><p><b>招新说明：</b>有兴趣或愿意长期参加活动的同学均可申请。</p><div className="fd-club-facts"><span>社长 {club.captain || club.leader || "赵子安"}</span><span>☎ 138 0000 9218</span><span>成员 {club.members || 18} / {club.capacity || 30} 人</span><strong>剩余名额 {(club.capacity || 30) - (club.members || 18)}</strong></div></div><aside><span>距报名截止：3天 8小时24分</span><button type="button">{memberView ? "已加入社团" : "申请报名"}</button></aside></section>}
    <nav className="fd-detail-tabs">{tabs.map(([key, label]) => <button type="button" key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>{key === "gallery" && <Star size={13} />}{key === "moments" && <Camera size={13} />}{label}</button>)}</nav>
    {tab === "detail" && <div className="fd-detail-info">
      <section className="fd-detail-main">
        <div className="recruit-poster-block">
          <div className="recruit-poster-head">
            <h3>招新海报</h3>
          </div>
          <figure
            className="recruit-poster"
            role="button"
            tabIndex={0}
            onClick={() => setPosterOpen(true)}
            onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && setPosterOpen(true)}
          >
            <img src={cover} alt={`${club.name}招新海报`} />
            <figcaption><strong>{club.name}</strong><span className="poster-slogan">{club.short}</span></figcaption>
          </figure>
        </div>
        <h3>活动计划</h3>
        <p>{club.plan || "本学期按每周一次的节奏开展常规活动，学期末组织成果展示与总结分享。"}</p>
      </section>
      <aside className="fd-detail-aside">
        <h3>近期活动</h3>
        {shownActivities.length ? (
          <>
            <ol className="event-timeline detail-timeline">
              {visibleActivities.map((item, index) => {
                // 时间统一成「10:00-12:30」的时间段写法
                const metaText = [String(item.time || "").replace(/\s*[-–—~]\s*/g, "-"), item.venue].filter(Boolean).join(" · ");
                return (
                  <li key={item.id} className={index === 0 ? "next" : ""}>
                    <span className="event-node" aria-hidden="true"><strong>{item.day}</strong></span>
                    <div className="event-info">
                      <div className="event-info-head">
                        <h3>{item.title}</h3>
                        {index === 0 && item.status !== "已结束" && <span className="event-next-badge">下一场</span>}
                      </div>
                      <p className="event-info-meta">
                        {metaText ? <span>{metaText}</span> : null}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
            {shownActivities.length > 2 && (
              <button type="button" className="show-all-activities" onClick={() => setShowAllActivities(!showAllActivities)}>
                {showAllActivities ? "收起" : `查看全部 ${shownActivities.length} 场活动`} <CaretDown size={15} className={showAllActivities ? "rotated" : ""} />
              </button>
            )}
          </>
        ) : <p className="fd-empty-activities">社长还未发布活动，发布后将在这里展示。</p>}
      </aside>
    </div>}
    {tab === "gallery" && <ClubShowcasePanel club={club} mode="gallery" onNotify={onNotify} />}
    {tab === "moments" && memberView && (
      <ClubShowcasePanel
        club={club}
        mode="moments"
        onShare={shownActivities.length ? () => onOpenMoment({ ...shownActivities[0], clubName: club.name }) : undefined}
        onNotify={onNotify}
      />
    )}
    {posterOpen && <div className="fd-modal-mask" role="presentation" onClick={() => setPosterOpen(false)}>
      <section className="fd-preview" role="dialog" aria-modal="true" aria-label={`${club.name}招新海报`} onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={() => setPosterOpen(false)}><X size={18} /></button>
        <img src={cover} alt={`${club.name}招新海报`} />
        <div><h2>{club.name} · 招新海报</h2><p>{club.recruitment || "有兴趣或愿意长期参加活动的同学均可申请。"}</p><small>申报时上传</small></div>
      </section>
    </div>}
  </div>;
}

const manageActivities = [
  { id: "m1", day: "10.30", week: "周三", title: "校园足球友谊交流赛", state: "待开展", time: "16:20 - 17:50", venue: "西操场 1 号场地", desc: "与初三年级足球爱好者开展学期友谊赛，请社员提前 10 分钟到场热身并穿着运动服球鞋。", attachment: "友谊赛战术演练与出场分组表.pdf", shares: 2 },
  { id: "m2", day: "10.23", week: "周三", title: "周三战术跑位与阵型协同训练", state: "进行中", time: "16:20 - 17:40", venue: "西操场 1 号场地", desc: "重点进行 3v2 边路快速渗透与包抄射门训练，请各小组长清点本组到位人数。", attendance: "待点名（应到 7 人）", record: "未填活动记录", shares: 2 },
  { id: "m3", day: "10.23", week: "周三", title: "校际交流准备与体能恢复训练", state: "已结束", time: "17:40 - 18:20", venue: "田径场环形跑道", desc: "针对下月校际联赛进行间歇体能恢复拉伸训练，社员可自由交流训练心得与拉伸技巧。", attendance: "实到 7 人（全勤）", record: "未填活动记录", shares: 1 },
  { id: "m4", day: "10.16", week: "周三", title: "上周三高位逼抢与协防专题演练", state: "已结束", time: "16:20 - 17:30", venue: "西操场 2 号场地", desc: "高位逼抢战术专题演练，重点训练前场丢球后 5 秒立即反抢与阵型紧凑度。", attendance: "待补考勤（应到 7 人）", record: "未填活动记录", shares: 0 },
  { id: "m5", day: "10.09", week: "周三", title: "周三传切配合与攻防转换实训", state: "已结束", time: "16:20 - 17:30", venue: "西操场 1 号场地", desc: "传切配合专项体能训练，全体社员按时到场，出勤事实已记入系统考勤。", attendance: "正常出勤 6 人 · 请假 1 人", record: "未填活动记录", shares: 0 },
  { id: "m6", day: "09.25", week: "周三", title: "新学期基础传接球训练", state: "已结束", time: "16:20 - 17:30", venue: "西操场 1 号场地", desc: "完成新学期首次基础传接球与分组对抗训练。", attendance: "实到 7 人（全勤）", record: "已填活动记录", shares: 0 },
];

export function PatchManageActivities({ onOpenMoment }) {
  const [filter, setFilter] = useState("all");
  const [overview, setOverview] = useState(false);
  const total = manageActivities.reduce((sum, item) => sum + item.shares, 0);
  const shown = filter === "all" ? manageActivities : manageActivities.filter((item) => item.state === filter);
  if (overview) return <div className="fd-manage-content"><div className="fd-overview-head"><button type="button" onClick={() => setOverview(false)}><ArrowLeft size={13} />返回活动列表</button><div><h3>活动瞬间</h3><span>共 {total} 条 · 覆盖 3 场活动</span></div><select><option>全部活动</option>{manageActivities.filter((a) => a.shares).map((a) => <option key={a.id}>{a.title}</option>)}</select></div><div className="fd-overview-hint">按活动发生时间倒序，点击卡片可查看图片、点赞与评论</div><section className="fd-month-group"><h4>10 月 · 3 场活动 <em>{total} 条</em></h4><div className="fd-overview-grid">{manageActivities.filter((a) => a.shares).flatMap((a, ai) => Array.from({ length: a.shares }, (_, index) => <button type="button" key={`${a.id}-${index}`} onClick={() => onOpenMoment(a)}><span><img src={momentPhotos[(ai + index) % 3]} alt="" /><em>{a.title}</em><small>1 张</small></span><i>赵子安</i><time>10-{23 - index} 18:20</time><b>查看</b></button>))}</div></section></div>;
  return <div className="fd-manage-content"><div className="fd-activity-filters"><div>{[["all", "全部", manageActivities.length], ["进行中", "进行中", 1], ["待开展", "待开展", 1], ["已结束", "已结束", 4]].map(([key, label, count]) => <button type="button" key={key} className={filter === key ? "active" : ""} onClick={() => setFilter(key)}>{label}（{count}）</button>)}</div><button type="button" className="fd-all-moments" onClick={() => setOverview(true)}><Camera size={13} />查看全部活动瞬间 <b>{total}</b><CaretRight size={12} /></button></div><div className="fd-manage-activity-list">{shown.map((item) => <article key={item.id}><div className="fd-manage-date"><strong>{item.day}</strong><span>{item.week}</span></div><div className="fd-manage-activity-main"><header><h3>{item.title}</h3><em className={item.state}>{item.state}</em><button type="button">查看详情</button><button type="button">⌄</button></header><p><Clock size={12} />{item.time}<i /> <MapPin size={12} />{item.venue}{item.attendance && <><i /> <Users size={12} />{item.attendance}</>}{item.record && <><i /> <span className="warn">✎ {item.record}</span></>}</p><span>{item.desc}</span><footer>{item.attachment ? <small><Paperclip size={11} />{item.attachment}</small> : <small /> }<button type="button" onClick={() => onOpenMoment(item)}><Camera size={12} />活动瞬间 {item.shares} 份分享 <CaretRight size={11} /></button></footer></div></article>)}</div></div>;
}

export function PatchManageMomentsOverview({ activities, onBack, onOpenMoment }) {
  const [activityId, setActivityId] = useState("all");
  const moments = useMemo(() => activities.flatMap((activity, activityIndex) => (
    (activity.contributions || []).map((item, itemIndex) => ({
      ...item,
      activity,
      photo: item.photos?.[0] || momentPhotos[(activityIndex + itemIndex) % momentPhotos.length],
    }))
  )), [activities]);
  const visible = activityId === "all" ? moments : moments.filter((item) => item.activity.id === activityId);
  const covered = new Set(moments.map((item) => item.activity.id)).size;

  return <div className="fd-manage-content fd-all-moments-view">
    <div className="fd-overview-head">
      <button type="button" onClick={onBack}><ArrowLeft size={13} />返回活动列表</button>
      <div><h3>全部活动瞬间</h3><span>共 {moments.length} 份分享 · 覆盖 {covered} 场活动</span></div>
      <select aria-label="按活动筛选" value={activityId} onChange={(event) => setActivityId(event.target.value)}>
        <option value="all">全部活动</option>
        {activities.filter((item) => item.contributions?.length).map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
      </select>
    </div>
    <div className="fd-overview-hint">按活动时间汇总成员分享；点击任一卡片进入该场活动的活动瞬间。</div>
    {visible.length ? <section className="fd-month-group">
      <h4>本学期活动瞬间 <em>{visible.length} 份分享</em></h4>
      <div className="fd-overview-grid">{visible.map((item) => <button type="button" key={`${item.activity.id}-${item.id}`} onClick={() => onOpenMoment(item.activity)}>
        <span><img src={item.photo} alt="" /><em>{item.activity.title}</em>{item.isFeatured && <small>精选</small>}</span>
        <i>{item.name}</i><time>{item.time}</time><b>查看</b>
      </button>)}</div>
    </section> : <div className="fd-overview-empty"><Camera size={24} /><strong>暂无活动瞬间</strong><span>成员分享后会汇总显示在这里。</span></div>}
  </div>;
}

export function PatchManageMomentPage({ club, activity, onBack, isArchived = false }) {
  const [collapsed, setCollapsed] = useState(false);
  const [filter, setFilter] = useState("all");
  const [text, setText] = useState("");
  const [picks, setPicks] = useState([]);
  const [moments, setMoments] = useState([{ id: "mm1", author: "赵子安", mine: true, featured: true, text: "训练结束后大家一起完成了战术复盘，配合越来越默契。", photos: [momentPhotos[0], momentPhotos[1]], time: "10-23 18:20" }, { id: "mm2", author: "林知夏", mine: false, featured: false, text: "今天边路配合很顺，记录下这个精彩瞬间。", photos: [momentPhotos[2]], time: "10-23 18:42" }]);
  const shown = filter === "featured" ? moments.filter((m) => m.featured) : filter === "mine" ? moments.filter((m) => m.mine) : moments;
  const publish = () => { if ((!text.trim() && !picks.length) || isArchived) return; setMoments((items) => [{ id: `mm-${Date.now()}`, author: "赵子安", mine: true, featured: false, text: text || "分享了活动现场照片。", photos: picks.length ? picks : [momentPhotos[0]], time: "刚刚" }, ...items]); setText(""); setPicks([]); };
  return <div className="fd-manage-moment-page">
    <header>
      <button type="button" onClick={onBack}><ArrowLeft size={14} />返回社团活动</button>
      <div><p>{club.name} / 活动瞬间</p><h2>{activity.title}</h2></div>
      <em>{activity.state || "已结束"}</em>
    </header>
    <div className={`fd-manage-moment-layout ${collapsed ? "collapsed" : ""}`}>
      <aside>
        <button type="button" onClick={() => setCollapsed(!collapsed)}>{collapsed ? "展开信息" : <><span>收起</span><CaretRight size={12} /></>}</button>
        {!collapsed && <>
          <img src="assets/poster-football.jpg" alt="" />
          <h3>{activity.title}</h3>
          <dl>
            <div><dt>活动时间</dt><dd>{activity.day} {activity.time}</dd></div>
            <div><dt>活动场地</dt><dd>{activity.venue}</dd></div>
            <div><dt>参与对象</dt><dd>本社团正式成员（7 人）</dd></div>
            <div><dt>组织负责人</dt><dd>赵子安（学生社长）</dd></div>
          </dl>
          <div className="fd-side-stats"><span><b>{moments.length}</b>累计分享</span><span><b>{moments.filter((m) => m.featured).length}</b>精选展示</span><span><b>{new Set(moments.map((m) => m.author)).size}</b>参与成员</span></div>
        </>}
      </aside>
      <main>
        {collapsed && <p className="fd-collapsed-stats">{moments.length} 份分享 · {new Set(moments.map((m) => m.author)).size} 人参与 · {moments.reduce((n, m) => n + m.photos.length, 0)} 张照片</p>}
        <section className="fd-composer">
          <div><strong>分享本场活动的精彩片段</strong><span>仅本社团成员可见</span></div>
          <textarea maxLength={120} value={text} onChange={(event) => setText(event.target.value)} placeholder="写下活动中的感受、收获或有趣片段…" />
          <small className={text.length === 120 ? "limit" : ""}>{text.length}/120</small>
          <div className="fd-picks">
            {picks.map((src) => <span key={src}><img src={src} alt="" /><button type="button" onClick={() => setPicks((items) => items.filter((item) => item !== src))}><X size={11} /></button></span>)}
            {picks.length < 3 && <button type="button" className={picks.length ? "small" : "wide"} onClick={() => setPicks((items) => [...items, momentPhotos[items.length]])}><UploadSimple size={15} />{picks.length ? `还可加 ${3 - picks.length} 张` : "添加照片（最多 3 张）"}</button>}
          </div>
          <button type="button" className="fd-publish" disabled={(!text.trim() && !picks.length) || isArchived} onClick={publish}>发布分享</button>
        </section>
        <div className="fd-stream-tabs">{[["all", `全部分享（${moments.length}）`], ["mine", "我的分享"], ["featured", `★ 精选（${moments.filter((m) => m.featured).length}）`]].map(([key, label]) => <button type="button" key={key} className={filter === key ? "active" : ""} onClick={() => setFilter(key)}>{label}</button>)}</div>
        <div className="fd-manage-moment-grid">
          {shown.map((item) => {
            const toggleFeatured = () => setMoments((items) => items.map((moment) => (
              moment.id === item.id ? { ...moment, featured: !moment.featured } : moment
            )));
            return <article key={item.id}>
              <button type="button" className={item.featured ? "featured" : ""} onClick={toggleFeatured}>
                <Star size={12} weight={item.featured ? "fill" : "regular"} />
                {item.featured ? "精选" : "设为精选"}
              </button>
              <img src={item.photos[0]} alt="" />
              <div><strong>{item.author}</strong><time>{item.time}</time><p>{item.text}</p></div>
            </article>;
          })}
        </div>
      </main>
    </div>
  </div>;
}

export function PatchManageShowcase({ club, isArchived = false, onNotify }) {
  const [tab, setTab] = useState("works");
  const [items, setItems] = useState({ works: [...gallery.works.slice(0, 4)], honors: [...gallery.honors] });
  const [preview, setPreview] = useState(null);
  const [upload, setUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("2026-11-03");
  const [creators, setCreators] = useState(["全体成员"]);
  const [picker, setPicker] = useState(false);
  const [file, setFile] = useState(null);
  const members = ["赵子易", "顾一然", "沈清越", "张子墨", "许嘉禾", "陈思语", "周天羽"];
  const captain = club?.leader || "赵子易";
  const isWork = tab === "works";
  const openUpload = () => { setUpload(true); setTitle(""); setDesc(""); setFile(null); setCreators(["全体成员"]); setPicker(false); };
  const submit = () => {
    const next = isWork
      ? { id: `w-${Date.now()}`, title: title.trim() || "未命名作品", creator: creators.includes("全体成员") ? "全体成员" : creators.join("、"), desc: desc.trim(), cover: file?.url || "assets/gallery-sports.jpg", date: "2026-11-03", publishTime: momentNowTime() }
      : { id: `h-${Date.now()}`, title: title.trim() || "未命名荣誉", time, desc: desc.trim(), cover: file?.url || "assets/cert-fb-h5.png", date: "2026-11-03", publishTime: momentNowTime() };
    setItems((value) => ({ ...value, [tab]: [next, ...value[tab]] }));
    setUpload(false);
    onNotify?.(isWork ? "作品已发布，成员端「社团风采」立即可见。" : "荣誉已登记，成员端「社团风采」立即可见。");
  };
  const list = items[tab];
  return <div className="manage-tab-content mgf-content">
    <div className="mgf-hero">
      <div className="mgf-hero-text">
        <h3>作品与荣誉由社长统一上传</h3>
      </div>
      <div className="mgf-hero-actions">
        <button type="button" className="btn-clean-primary" disabled={isArchived} onClick={openUpload}>{isWork ? "＋ 上传作品" : "＋ 登记荣誉"}</button>
      </div>
    </div>
    <div className="mgf-subtabs-row">
      <div className="gallery-subtabs" role="tablist">
        <button type="button" role="tab" aria-selected={isWork} className={`gallery-subtab${isWork ? " active" : ""}`} onClick={() => setTab("works")}><Camera size={13} />作品集锦<em>{items.works.length}</em></button>
        <button type="button" role="tab" aria-selected={!isWork} className={`gallery-subtab${!isWork ? " active" : ""}`} onClick={() => setTab("honors")}><Medal size={13} />荣誉时刻<em>{items.honors.length}</em></button>
      </div>
      <span className="mgf-subtab-hint">{isWork ? "陈列社团的创作成果，支持图文与视频" : "记录社团获得的奖项与证书照片"}</span>
    </div>
    {list.length ? <div className="gallery-grid mgf-grid">{list.map((item) => (
      <div key={item.id} className={`gcard${!isWork ? " gcard-honor" : ""}`} role="button" tabIndex={0} onClick={() => setPreview(item)} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && setPreview(item)}>
        <span className="gcard-cover"><img src={item.cover} alt={item.title} loading="lazy" /></span>
        <span className="gcard-body">
          <span className="gcard-title">{item.title}</span>
          {isWork && item.creator && <span className="gcard-winner"><em>创作者</em>{item.creator}</span>}
          {!isWork && item.time && <span className="gcard-winner is-time"><em>获奖时间</em>{item.time}</span>}
          {item.desc && <span className={`gcard-desc${!isWork ? " is-single" : ""}`}>{item.desc}</span>}
          <span className="gcard-foot">
            <i className="gcard-avatar" style={{ background: "#2b9fc5" }}>{captain.charAt(0)}</i>
            <b>{captain}</b>
            <time>{momentTimeText(item.publishTime || item.date || item.time)}</time>
          </span>
        </span>
      </div>
    ))}</div> : <div className="mgf-empty">「{isWork ? "作品集锦" : "荣誉时刻"}」还没有内容，点右上角按钮上传第一份。</div>}
    {preview && <GalleryDetail
      club={club}
      tab={isWork ? "works" : "honors"}
      item={{ ...preview, time: preview.time || preview.date, publishTime: preview.publishTime || preview.date }}
      startIndex={0}
      onClose={() => setPreview(null)}
      onNotify={onNotify}
    />}
    {upload && <div className="dialog-backdrop" role="presentation" onClick={() => setUpload(false)}>
      <section className="dialog gallery-upload-dialog show-upload-dialog" role="dialog" aria-modal="true" aria-label={isWork ? "上传作品" : "登记荣誉"} onClick={(event) => event.stopPropagation()}>
        <button className="dialog-close" type="button" onClick={() => setUpload(false)} aria-label="关闭">×</button>
        <span className="eyebrow">{club?.name || "我管理的社团"} · 成果荣誉</span>
        <h2>{isWork ? "上传作品" : "登记荣誉"}</h2>
        <p className="upload-subtitle">{isWork ? "作品与介绍会原样陈列在「作品集锦」里。" : "荣誉证明、名称与说明会原样陈列在「荣誉时刻」里。"}</p>
        <label className="upload-drop">
          <input type="file" hidden accept={isWork ? "image/*,video/*" : "image/*"} onChange={(event) => {
            const picked = event.target.files && event.target.files[0];
            if (picked) setFile({ url: URL.createObjectURL(picked), isVideo: picked.type.startsWith("video/") });
            event.target.value = "";
          }} />
          <span className="upload-drop-body">
            {file ? <img src={file.url} alt="已选素材" /> : <>
              <span className="upload-drop-icon"><UploadSimple size={20} /></span>
              <strong>{isWork ? "上传作品" : "上传荣誉证明"}</strong>
              <span>{isWork ? "支持 JPG / PNG / MP4，建议 16:9 横图" : "支持 JPG / PNG，建议证书拍摄清晰、四角完整"}</span>
            </>}
          </span>
        </label>
        <label className="upload-field"><span>{isWork ? "作品名称" : "荣誉名称"}</span>
          <input type="text" maxLength={40} value={title} onChange={(event) => setTitle(event.target.value)} placeholder={isWork ? "例如：《校园足球战术手册》" : "例如：2026 校园足球联赛 · 冠军"} />
        </label>
        {isWork && (
          <div className="upload-field"><span>创作者</span>
            <div className="sh-picker">
              <button type="button" className={`sh-picker-trigger${picker ? " is-open" : ""}`} onClick={() => setPicker(!picker)} aria-haspopup="listbox" aria-expanded={picker}>
                <span className="sh-picker-text">{creators.includes("全体成员") ? "全体成员" : creators.length ? (creators.length <= 2 ? creators.join("、") : `已选 ${creators.length} 人`) : "请选择创作者"}</span>
                <CaretDown size={13} />
              </button>
              {picker && <div className="sh-picker-panel" role="listbox" aria-multiselectable="true">
                {["全体成员", ...members].map((name) => (
                  <button type="button" key={name} className={`sh-picker-option${creators.includes(name) ? " is-on" : ""}`} onClick={() => setCreators((current) => name === "全体成员" ? ["全体成员"] : current.includes(name) ? current.filter((item) => item !== name) : [...current.filter((item) => item !== "全体成员"), name])}>
                    <i className="sh-picker-box" />{name}
                  </button>
                ))}
              </div>}
            </div>
          </div>
        )}
        {!isWork && <label className="upload-field"><span>获奖时间</span><input type="date" value={time} onChange={(event) => setTime(event.target.value)} /></label>}
        <label className="upload-field"><span>{isWork ? "作品介绍" : "荣誉说明"}</span>
          <textarea rows={3} maxLength={120} value={desc} onChange={(event) => setDesc(event.target.value)} placeholder={isWork ? "介绍一下这件作品的创意来源、过程与亮点…" : "记录获奖故事、颁奖现场或想要感谢的人…"} />
          <em className="upload-count">{desc.length} / 120</em>
        </label>
        <div className="show-uploader">
          <i className="gcard-avatar" style={{ background: "#2b9fc5" }}>{captain.charAt(0)}</i>
          <div><b>{captain}</b><span>发布后成员端「社团风采」立即可见</span></div>
        </div>
        <div className="dialog-actions">
          <button className="secondary" type="button" onClick={() => setUpload(false)}>取消</button>
          <button className="primary" type="button" onClick={submit}>{isWork ? "发布作品" : "发布荣誉"}</button>
        </div>
      </section>
    </div>}
  </div>;
}
