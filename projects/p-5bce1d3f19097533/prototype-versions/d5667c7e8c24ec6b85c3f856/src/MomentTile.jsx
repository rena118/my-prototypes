import { useState } from "react";
import { Camera, ChatCircleDots, DotsThree, Heart, NotePencil, Star, Trash } from "@phosphor-icons/react";
import { momentTimeText } from "./ManageMomentPage.jsx";

const MOMENT_AVATAR_COLORS = ["#2b9fc5", "#7c5cff", "#e8930c", "#22b573", "#e0566b", "#3f6fd8"];
export function momentAvatarColor(name) {
  let hash = 0;
  for (const ch of String(name || "")) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return MOMENT_AVATAR_COLORS[hash % MOMENT_AVATAR_COLORS.length];
}

/* 活动瞬间卡片：「我报名的-分享活动瞬间」与「查看社团-活动瞬间」共用同一套结构与样式 */
export function MomentTile({ post, isMine, menuOpen, onToggleMenu, onCloseMenu, onOpen, onLike, onEdit, onDelete }) {
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
