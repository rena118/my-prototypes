import { useState } from "react";
import {
  ArrowLeft, Camera, CaretRight, ChatCircleDots, Heart, Plus,
  Star, Trash, Users,
} from "@phosphor-icons/react";

/* ==================== 数据：社长端活动瞬间（移植学生端原型 MANAGE_MOMENTS） ==================== */

const MANAGE_MOMENT_SEED = {
  "校园足球友谊交流赛": [
    { id: "mg-1", author: "顾一然", role: "骨干", className: "初二（2）班", time: "10-30 16:35", caption: "赛前二十分钟的场地踩点，草皮比上周软，大家换长钉鞋更稳。", photos: ["assets/gallery-sports.jpg", "assets/moment-team-1.jpg"], likes: 8, liked: true, featured: true, commentList: [
      { author: "赵子易", role: "社长", text: "草皮软确实得换长钉，这条我记到赛前提醒里。", time: "10-30 16:48" },
      { author: "沈清越", role: "成员", text: "我只有短钉，明天能借一双吗？", time: "10-30 16:55" },
    ] },
    { id: "mg-2", author: "张子墨", role: "成员", className: "初二（4）班", time: "10-30 17:05", caption: "开场十分钟的角球机会，禁区里三个人同时抢点，差一点点就进了。", photos: ["assets/moment-team-2.jpg", "assets/moment-team-3.jpg", "assets/gallery-sports.jpg"], likes: 12, liked: false, featured: false, commentList: [
      { author: "顾一然", role: "骨干", text: "这个点跑位很好，差一点就是进球。", time: "10-30 17:12" },
      { author: "陈思语", role: "成员", text: "回看才发现三个人一起上去了。", time: "10-30 17:20" },
      { author: "赵子易", role: "社长", text: "下次角球按这个跑，落点再前压半步。", time: "10-30 18:02" },
    ] },
  ],
  "周三战术跑位与阵型协同训练": [
    { id: "mg-3", author: "赵子易", role: "社长", className: "初二（3）班", mine: true, time: "10-23 16:40", caption: "边路套边插上的第一组演练，节奏比上周快了不少。", photos: ["assets/moment-team-3.jpg"], likes: 9, liked: false, featured: false, commentList: [
      { author: "张子墨", role: "成员", text: "第二组跟着跑顺了，节奏确实快。", time: "10-23 16:58" },
    ] },
    { id: "mg-4", author: "沈清越", role: "成员", className: "初二（1）班", time: "10-23 17:10", caption: "右路拉开宽度之后的传中练习，落点终于稳定了。", photos: ["assets/gallery-sports.jpg", "assets/moment-team-1.jpg"], likes: 6, liked: false, featured: false, commentList: [
      { author: "顾一然", role: "骨干", text: "落点稳了很多，继续练这个点。", time: "10-23 17:24" },
    ] },
  ],
  "校际交流准备与体能恢复加练": [
    { id: "mg-5", author: "陈思语", role: "成员", className: "初二（2）班", time: "10-23 18:05", caption: "体能加练结束，跑道上最后一圈大家都咬着牙跟上了。", photos: ["assets/gallery-sports.jpg"], likes: 7, liked: false, featured: false, commentList: [
      { author: "赵子易", role: "社长", text: "最后一圈还能跟上就是进步。", time: "10-23 18:20" },
    ] },
  ],
  "学期初全员选拔与基础技术测试": [
    { id: "mg-6", author: "赵子易", role: "社长", className: "初二（3）班", mine: true, time: "09-25 18:00", caption: "学期初全员合影，新加入的初一同学第一次穿上队服。", photos: ["assets/moment-team-1.jpg", "assets/moment-team-2.jpg", "assets/moment-team-3.jpg"], likes: 15, liked: true, featured: false, commentList: [
      { author: "沈清越", role: "成员", text: "初一的小同学站中间，很有仪式感。", time: "09-25 18:12" },
      { author: "陈思语", role: "成员", text: "这张必须进学期材料。", time: "09-25 19:03" },
    ] },
  ],
};

const CAPTAIN = { name: "赵子易", role: "社长", className: "初二（3）班" };
const MEMBER_COUNT = 7;

export function manageMomentsOf(activity) {
  if (!activity) return [];
  return MANAGE_MOMENT_SEED[activity.title] || [];
}

function avatarColor(name) {
  let hash = 0;
  for (const ch of String(name || "")) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const colors = ["#2b9fc5", "#7c5cff", "#e8930c", "#22b573", "#e0566b", "#3f6fd8"];
  return colors[hash % colors.length];
}

/* 统一发布时间格式：10-30 17:12 */
const pad2 = (value) => String(value).padStart(2, "0");
export function momentNowTime() {
  const now = new Date();
  return `${pad2(now.getMonth() + 1)}-${pad2(now.getDate())} ${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
}
export function momentTimeText(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const full = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2}))?/);
  if (full) {
    const date = `${pad2(full[2])}-${pad2(full[3])}`;
    return full[4] ? `${date} ${pad2(full[4])}:${full[5]}` : date;
  }
  const short = raw.match(/^(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{2})/);
  if (short) return `${pad2(short[1])}-${pad2(short[2])} ${pad2(short[3])}:${short[4]}`;
  return raw;
}

function Avatar({ name, size = 30 }) {
  return <i className="mg-avatar" style={{ background: avatarColor(name), width: size, height: size }}>{String(name || "").charAt(0)}</i>;
}

// 只保留「社长」标签，骨干 / 成员等成员身份不再展示
function RoleChip({ role }) {
  if (role !== "社长") return null;
  return <span className="mg-role-chip is-leader">{role}</span>;
}

/* ==================== 两栏瞬间查看弹窗（复用 moment-viewer 样式，供我管理/我报名的三处共用） ==================== */

function MomentViewer({ list, startIndex, onClose, onLike, onComment, authorExtras, likeExtras, commentCountText }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [draft, setDraft] = useState("");
  if (!list || !list.length) return null;
  const moment = list[Math.max(0, Math.min(startIndex || 0, list.length - 1))];
  const photos = moment.photos || [];
  const multi = moment.type !== "video" && photos.length > 1;
  if (photoIndex > photos.length - 1) setPhotoIndex(0);
  const stepPhoto = (delta) => setPhotoIndex((value) => Math.min(Math.max(value + delta, 0), photos.length - 1));
  const send = () => {
    if (!draft.trim()) return;
    onComment?.(moment.id, draft.trim());
    setDraft("");
  };
  const commentCount = moment.commentList?.length || 0;
  return (
    <div className="moment-viewer" role="presentation" onClick={onClose}>
      <div className="moment-viewer-dialog" role="dialog" aria-modal="true" aria-label="查看活动瞬间" onClick={(event) => event.stopPropagation()}>
        <div className="moment-viewer-media">
          {multi ? <span className="moment-viewer-index">{photoIndex + 1} / {photos.length}</span> : null}
          {multi && photoIndex > 0 && <button type="button" className="moment-viewer-nav prev" onClick={() => stepPhoto(-1)} aria-label="上一张照片">‹</button>}
          {multi && photoIndex < photos.length - 1 && <button type="button" className="moment-viewer-nav next" onClick={() => stepPhoto(1)} aria-label="下一张照片">›</button>}
          <div className="moment-viewer-stage">
            {moment.type === "video" && moment.videoSrc
              ? <video src={moment.videoSrc} controls autoPlay />
              : moment.type === "video"
                ? <>
                  <img src={moment.cover || photos[0] || ""} alt={moment.caption || "活动视频"} />
                  <span className="video-play-badge gcard-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 6.6v10.8L18 12z" fill="currentColor" /></svg></span>
                  {moment.duration ? <span className="video-duration">{moment.duration}</span> : null}
                </>
                : <img src={photos[photoIndex] || photos[0] || ""} alt={moment.caption || "活动瞬间"} />}
          </div>
          {moment.type !== "video" && photos.length > 1 && (
            <div className="moment-viewer-photos">
              {photos.map((src, i) => (
                <button type="button" key={`${src}-${i}`} className={i === photoIndex ? "viewer-photo active" : "viewer-photo"} onClick={() => setPhotoIndex(i)} aria-label={`查看第 ${i + 1} 张`}>
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="moment-viewer-side">
          <div className="moment-viewer-info">
            <div className="moment-viewer-author">
              <i className="moment-mini-avatar" style={{ background: avatarColor(moment.author) }}>{String(moment.author || "").charAt(0)}</i>
              <b>{moment.author}</b>
              {authorExtras?.(moment)}
              <RoleChip role={moment.role} />
              <time>{moment.time}</time>
            </div>
            <strong className="moment-viewer-title">{moment.title || ""}</strong>
            <p>{moment.caption || "分享了现场素材，没有写感想。"}</p>
            <div className="moment-viewer-like-row">
              <button type="button" className={`moment-like${moment.liked ? " liked" : ""}`} onClick={() => onLike?.(moment.id)}>
                <Heart size={13} weight={moment.liked ? "fill" : "regular"} /><span>{moment.likes}</span>
              </button>
              {likeExtras?.(moment)}
            </div>
          </div>
          <div className="moment-comments">
            <div className="moment-comments-head"><span>评论</span><b>{commentCountText ? commentCountText(commentCount) : (commentCount ? `${commentCount} 条` : "")}</b></div>
            <div className="moment-comments-list">
              {commentCount
                ? moment.commentList.map((item, i) => (
                  <div className="moment-comment-item" key={`${item.author}-${i}`}>
                    <i className="moment-mini-avatar" style={{ background: avatarColor(item.author) }}>{String(item.author || "").charAt(0)}</i>
                    <div className="moment-comment-body">
                      <p><b>{item.author}</b><RoleChip role={item.role} />{item.time ? <time>{item.time}</time> : null}</p>
                      <span>{item.text}</span>
                    </div>
                  </div>
                ))
                : <p className="moment-comments-empty">还没有评论，来说第一句吧。</p>}
            </div>
            <div className="moment-comments-form">
              <input type="text" maxLength={100} value={draft} placeholder="说点什么…" onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); send(); } }} />
              <button type="button" className="moment-comments-send" onClick={send}>发送</button>
            </div>
          </div>
        </div>
        <button type="button" className="moment-viewer-close" onClick={onClose} aria-label="关闭预览">×</button>
      </div>
    </div>
  );
}

/* ==================== 我管理的 · 活动瞬间（独立页，移植 manage-moments.html） ==================== */

export function ManageMomentPage({ activity, club, onBack, onNotify }) {
  const [moments, setMoments] = useState(() => manageMomentsOf(activity).map((item) => ({ ...item, commentList: [...(item.commentList || [])] })));
  const [tab, setTab] = useState("all");
  const [picks, setPicks] = useState([]);
  const [caption, setCaption] = useState("");
  const [sideCollapsed, setSideCollapsed] = useState(false);
  const [viewer, setViewer] = useState(null); // { list, startIndex }
  const [deleteTarget, setDeleteTarget] = useState(null);

  const isMine = (moment) => moment.mine === true || moment.author === CAPTAIN.name;
  const featuredOf = () => moments.filter((item) => item.featured);
  const memberCount = () => new Set(moments.map((item) => item.author)).size;

  const shown = tab === "mine" ? moments.filter(isMine) : tab === "featured" ? moments.filter((item) => item.featured) : moments;

  const toggleLike = (id) => setMoments((previous) => previous.map((item) => item.id === id ? { ...item, liked: !item.liked, likes: item.likes + (item.liked ? -1 : 1) } : item));
  const toggleFeature = (id) => {
    setMoments((previous) => previous.map((item) => item.id === id ? { ...item, featured: !item.featured } : item));
    const target = moments.find((item) => item.id === id);
    onNotify?.(target?.featured ? "已取消精选。" : "已设为精选，社员端活动瞬间会优先展示这条。");
  };
  const addComment = (momentId, text) => {
    const time = momentNowTime();
    const entry = { author: CAPTAIN.name, role: CAPTAIN.role, time, text };
    setMoments((previous) => previous.map((item) => item.id === momentId ? { ...item, commentList: [...item.commentList, entry] } : item));
    setViewer((previous) => previous ? { ...previous, list: previous.list.map((item) => item.id === momentId ? { ...item, commentList: [...item.commentList, entry] } : item) } : previous);
  };
  const openViewer = (moment) => {
    const list = shown.map((item) => ({ ...item, title: activity.title }));
    const startIndex = Math.max(0, list.findIndex((item) => item.id === moment.id));
    setViewer({ list, startIndex });
  };
  const publish = () => {
    if (!picks.length && !caption.trim()) return;
    setMoments((previous) => [{
      id: `mg-${Date.now()}`, author: CAPTAIN.name, role: CAPTAIN.role, className: CAPTAIN.className, mine: true, time: momentNowTime(),
      caption: caption.trim(), photos: picks, likes: 0, liked: false, featured: false, commentList: [],
    }, ...previous]);
    setPicks([]); setCaption("");
    onNotify?.("分享已发布，同步到社团详情页「活动瞬间」。");
  };
  const confirmDelete = () => {
    if (!deleteTarget) return;
    setMoments((previous) => previous.filter((item) => item.id !== deleteTarget.id));
    setDeleteTarget(null);
    onNotify?.("已删除，这条分享不会出现在社团风采里了。");
  };

  const emptyCopy = tab === "mine"
    ? { title: "你还没有分享过这场活动", text: "在上方的发布区写一句感想，或选几张现场照片，就会出现在这里。" }
    : tab === "featured"
      ? { title: "还没有设为精选的分享", text: "点卡片右上角的「设为精选」，好的素材就会集中在这里。" }
      : { title: "还没有人分享这场活动的瞬间", text: "把现场照片传上来，这场活动就有了第一份记忆。" };

  return (
    <div className="manage-moment-page">
      <section className="mg-topbar">
        <button type="button" className="mg-back" onClick={onBack}><ArrowLeft size={14} /><span>返回社团活动</span></button>
        <div className="mg-topbar-main">
          <span className="mg-crumb">{club?.name || "我管理的社团"} / 活动瞬间</span>
          <div className="mg-title-row">
            <h2>{activity.title}</h2>
            <span className={`clean-status-pill ${activity.status || "upcoming"}`}><i className="status-dot" />{activity.statusLabel || activity.status || "待开展"}</span>
          </div>
        </div>
      </section>
      <div className={`mg-layout${sideCollapsed ? " is-side-hidden" : ""}`}>
        <aside className="mg-side">
          <div className="mg-side-panel">
            <div className="mg-side-head">
              <span>活动信息</span>
              <button type="button" className="mg-side-toggle" onClick={() => setSideCollapsed(true)} aria-expanded="false" title="收起活动信息"><span>收起</span><ArrowLeft size={13} /></button>
            </div>
            <section className="mg-side-sec">
              <h4><span>基本信息</span></h4>
              <dl className="mg-info-list">
                <div><dt>活动时间</dt><dd>{activity.date || `${activity.dateDay || ""} ${activity.dateTime || ""}`}</dd></div>
                <div><dt>活动地点</dt><dd>{activity.venue}</dd></div>
                <div><dt>参与对象</dt><dd>本社团正式成员（{MEMBER_COUNT} 人）</dd></div>
                <div><dt>组织负责人</dt><dd>{CAPTAIN.name}（学生社长）</dd></div>
                <div><dt>活动说明</dt><dd className="is-text">{activity.desc || "暂无特殊准备要求。"}</dd></div>
              </dl>
            </section>
            <section className="mg-side-sec">
              <h4><span>分享概览</span></h4>
              <div className="mg-stats">
                <div><strong>{moments.length}</strong><span>累计分享</span></div>
                <div><strong>{memberCount()}</strong><span>参与同学</span></div>
                <div><strong>{featuredOf().length}</strong><span>精选分享</span></div>
              </div>
            </section>
          </div>
          <button type="button" className="mg-side-reopen" onClick={() => setSideCollapsed(false)} aria-expanded="false" title="展开活动信息"><CaretRight size={13} /><span>展开信息</span></button>
        </aside>
        <div className="mg-main">
          <div className="mg-composer">
            <div className="mg-composer-head">
              <Avatar name={CAPTAIN.name} />
              <div className="mg-composer-who">
                <b>{CAPTAIN.name}</b>
                <span className="mg-role-chip is-leader">社长</span>
              </div>
            </div>
            <div className="mg-drop">
              <div className="mg-drop-grid">
                {!picks.length && (
                  <label className="mg-slot is-add">
                    <input type="file" accept="image/*" multiple hidden onChange={(event) => {
                      const files = Array.from(event.target.files || []).filter((file) => file.type.startsWith("image/")).slice(0, 3);
                      if (files.length) setPicks(files.map((file) => URL.createObjectURL(file)));
                      event.target.value = "";
                    }} />
                    <i className="mg-slot-icon"><Camera size={22} /></i>
                    <span className="mg-slot-text"><b>上传照片</b><em>最多 3 张，可一次多选</em></span>
                  </label>
                )}
                {picks.map((src, index) => (
                  <span className="mg-pick" key={`${src}-${index}`}>
                    <img src={src} alt="待发布的照片" />
                    <button type="button" className="mg-pick-remove" onClick={() => setPicks((items) => items.filter((_, idx) => idx !== index))} aria-label="移除">×</button>
                  </span>
                ))}
                {picks.length > 0 && picks.length < 3 && (
                  <label className="mg-slot is-more" title="继续添加照片">
                    <input type="file" accept="image/*" multiple hidden onChange={(event) => {
                      const files = Array.from(event.target.files || []).filter((file) => file.type.startsWith("image/")).slice(0, 3 - picks.length);
                      if (files.length) setPicks((items) => [...items, ...files.map((file) => URL.createObjectURL(file))]);
                      event.target.value = "";
                    }} />
                    <Plus size={13} /><em>还可加 {3 - picks.length} 张</em>
                  </label>
                )}
              </div>
            </div>
            <div className="mg-composer-foot">
              <div className="mg-caption-row">
                <span className="mg-caption-wrap">
                  <textarea className="mg-caption" rows={1} maxLength={120} value={caption} placeholder="说一句当时的心情（选填）" onChange={(event) => setCaption(event.target.value)} />
                  <span className={`mg-caption-count${caption.length >= 120 ? " is-full" : ""}`}>{caption.length}/120</span>
                </span>
                <button type="button" className="mg-publish" disabled={!picks.length && !caption.trim()} onClick={publish}>发布分享</button>
              </div>
            </div>
          </div>
          <div className="mg-tabs">
            <button type="button" className={`mg-tab${tab === "all" ? " is-on" : ""}`} onClick={() => setTab("all")}>全部分享<span>{moments.length}</span></button>
            <button type="button" className={`mg-tab${tab === "featured" ? " is-on" : ""}`} onClick={() => setTab("featured")}><Star size={12} />精选<span>{featuredOf().length}</span></button>
            <button type="button" className={`mg-tab${tab === "mine" ? " is-on" : ""}`} onClick={() => setTab("mine")}>我的分享<span>{moments.filter(isMine).length}</span></button>
          </div>
          <div className="mg-feed">
            {!shown.length ? (
              <div className="mg-empty">
                <span className="mg-empty-icon"><Camera size={24} /></span>
                <strong>{emptyCopy.title}</strong>
                <span>{emptyCopy.text}</span>
              </div>
            ) : shown.map((moment) => {
              const mine = isMine(moment);
              const photos = moment.photos || [];
              return (
                <article className={`mg-post${moment.featured ? " is-featured" : ""}`} key={moment.id}>
                  <div className="mg-post-head">
                    <Avatar name={moment.author} />
                    <b>{moment.author}</b>
                    <time>{moment.time}</time>
                    <button type="button" className={`feature-star${moment.featured ? " is-on" : ""}`} onClick={() => toggleFeature(moment.id)} aria-pressed={moment.featured ? "true" : "false"} title={moment.featured ? "取消精选" : "设为精选"}>
                      <Star size={12} weight={moment.featured ? "fill" : "regular"} /><span>{moment.featured ? "精选" : "设为精选"}</span>
                    </button>
                    {mine && <button type="button" className="mg-post-del" onClick={() => setDeleteTarget(moment)} aria-label="删除这条分享"><Trash size={13} /></button>}
                  </div>
                  <p className={`mg-post-text${moment.caption ? "" : " is-empty"}`}>{moment.caption || "分享了现场素材，没有写感想。"}</p>
                  {photos.length > 0 && (
                    <div className={`mg-post-photos is-${photos.length}`}>
                      {photos.map((src, index) => (
                        <button type="button" className="mg-photo" key={`${src}-${index}`} onClick={() => openViewer(moment)}>
                          <img src={src} alt="活动瞬间照片" />
                          {photos.length > 1 && index === 0 && <span className="mg-photo-count">{photos.length} 张</span>}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="mg-post-foot">
                    <button type="button" className={`mg-like${moment.liked ? " is-on" : ""}`} onClick={() => toggleLike(moment.id)}>
                      <Heart size={13} weight={moment.liked ? "fill" : "regular"} /><span>{moment.likes}</span>
                    </button>
                    <button type="button" className="mg-comment" onClick={() => openViewer(moment)}>
                      <ChatCircleDots size={13} /><span>{moment.commentList.length} 条评论</span>
                    </button>
                    {mine && <span className="mg-mine-tag">我的分享</span>}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      {viewer && (
        <MomentViewer
          list={viewer.list}
          startIndex={viewer.startIndex}
          onClose={() => setViewer(null)}
          onLike={toggleLike}
          onComment={addComment}
        />
      )}
      {deleteTarget && (
        <div className="moment-layer" role="presentation" onClick={() => setDeleteTarget(null)}>
          <section className="moment-confirm" role="dialog" aria-modal="true" aria-label="删除分享" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="moment-layer-close" onClick={() => setDeleteTarget(null)} aria-label="关闭">×</button>
            <span className="moment-confirm-icon"><Trash size={22} /></span>
            <h3>删除这条分享？</h3>
            <p>删除后，这些照片会同时从社团详情页「活动瞬间」移除，收到的点赞和评论一并清空，且无法恢复。</p>
            <div className="moment-layer-actions">
              <button type="button" className="secondary" onClick={() => setDeleteTarget(null)}>先不删</button>
              <button type="button" className="danger" onClick={confirmDelete}>确认删除</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

/* ==================== 社团活动 Tab 内：全部活动瞬间总览（ledger + mcard） ==================== */

/* ---------- 总览卡片：单张封面 + 卡片内多图切换（首张无上一张、末张无下一张） ---------- */

function MomentCard({ entry, onOpen }) {
  const [turnIndex, setTurnIndex] = useState(0);
  const photos = entry.moment.photos || [];
  const author = entry.moment.author || "社团成员";
  const multi = photos.length > 1;
  const turn = (delta) => (event) => { event.stopPropagation(); setTurnIndex((value) => Math.min(Math.max(value + delta, 0), photos.length - 1)); };
  return (
    <article className="mcard" key={entry.moment.id}>
      <button className="mcard-media" type="button" onClick={() => onOpen(entry)}>
        <img src={photos[turnIndex] || ""} alt={entry.act.title} loading="lazy" />
        <span className="mcard-activity">{entry.act.title}</span>
        <span className="mcard-count">{multi ? `${turnIndex + 1} / ${photos.length}` : "1 张"}</span>
        {multi && turnIndex > 0 && <span className="mcard-turn is-prev" role="button" aria-label="上一张照片" onClick={turn(-1)}>‹</span>}
        {multi && turnIndex < photos.length - 1 && <span className="mcard-turn is-next" role="button" aria-label="下一张照片" onClick={turn(1)}>›</span>}
      </button>
      <div className="mcard-foot">
        <i style={{ background: avatarColor(author) }}>{String(author).charAt(0)}</i>
        <span>{author}</span>
        <time>{entry.moment.time || ""}</time>
        <div className="mcard-actions"><button type="button" onClick={() => onOpen(entry)}>查看</button></div>
      </div>
    </article>
  );
}

export function ManageMomentsOverview({ activities, onBack, onNotify }) {
  const [filterId, setFilterId] = useState("all");
  const [viewer, setViewer] = useState(null);

  const actsWithMoments = activities.filter((act) => manageMomentsOf(act).length);
  const entries = [];
  activities.forEach((act) => {
    if (filterId !== "all" && act.title !== filterId) return;
    manageMomentsOf(act).forEach((moment) => entries.push({ act, moment }));
  });
  const covered = filterId === "all" ? actsWithMoments.length : entries.length ? 1 : 0;

  const groups = [];
  const groupIndex = {};
  entries.forEach((entry) => {
    const month = String(entry.act.dateDay || "").split(".")[0] || "—";
    if (!groupIndex[month]) {
      groupIndex[month] = { month, acts: {}, items: [] };
      groups.push(groupIndex[month]);
    }
    groupIndex[month].acts[entry.act.title] = true;
    groupIndex[month].items.push(entry);
  });

  const openViewer = (entry) => {
    const list = entries.map((item) => ({ ...item.moment, title: item.act.title }));
    setViewer({ list, startIndex: Math.max(0, entries.indexOf(entry)) });
  };

  return (
    <div className="manage-tab-content">
      <div className="ledger-subhead">
        <button type="button" className="ledger-back" onClick={onBack}><ArrowLeft size={13} />返回活动列表</button>
        <div className="ledger-subtitle">
          <h3>活动瞬间</h3>
          <span>共 {entries.length} 条 · 覆盖 {covered} 场活动</span>
        </div>
        <select className="ledger-select" aria-label="按活动筛选瞬间" value={filterId} onChange={(event) => setFilterId(event.target.value)}>
          <option value="all">全部活动</option>
          {actsWithMoments.map((act) => <option key={act.id} value={act.title}>{act.title}</option>)}
        </select>
      </div>
      <div className="ledger-toolbar"><span className="ledger-hint">按活动发生时间倒序，点击卡片可查看图片、点赞与评论</span></div>
      {groups.length ? groups.map((group) => (
        <section className="moment-group" key={group.month}>
          <h4>{group.month} 月 · {Object.keys(group.acts).length} 场活动<em>{group.items.length} 条</em></h4>
          <div className="moment-grid">
            {group.items.map((entry) => <MomentCard key={entry.moment.id} entry={entry} onOpen={openViewer} />)}
          </div>
        </section>
      )) : <div className="mgf-empty">还没有活动瞬间，回到活动列表分享第一条吧。</div>}
      {viewer && (
        <MomentViewer
          list={viewer.list}
          startIndex={viewer.startIndex}
          onClose={() => setViewer(null)}
          onLike={(id) => onNotify?.("原型演示：点赞状态仅在本页生效。")}
          onComment={(id, text) => onNotify?.("原型演示：评论已记录（仅演示）。")}
        />
      )}
    </div>
  );
}

export { MomentViewer, avatarColor as manageAvatarColor, CAPTAIN as MANAGE_CAPTAIN };
export default ManageMomentPage;
