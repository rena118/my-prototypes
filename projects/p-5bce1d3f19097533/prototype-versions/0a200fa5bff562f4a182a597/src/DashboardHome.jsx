import React, { useState, useMemo } from "react";
import {
  Clock,
  Compass,
  ArrowRight,
  Plus,
  Sparkle,
  MapPin,
  CalendarDots,
  Users,
  Camera,
  CaretDown,
  RocketLaunch,
  Medal,
  EyeSlash,
} from "@phosphor-icons/react";

export function DashboardHome({
  clubs = [],
  managedClubs = [],
  declarationRecords = [],
  onNavigate,
  onShowClub,
  onApplyClub,
  onOpenDeclaration,
  onNotify,
}) {
  // 学期筛选与时间配置状态
  const [selectedTerm, setSelectedTerm] = useState("2026-2027 学年上学期");

  // 顶部通报条演示状态：'declaration' | 'recruitment' | 'credit' | 'hidden'
  const [noticeState, setNoticeState] = useState("recruitment");
  // 是否包含具体截止倒计时（false 则为学校配置“不限时间”）
  const [hasDeadline, setHasDeadline] = useState(true);

  // 是否处于可自主申报社团状态（申报期，或不限时且非期末结项期）
  const canDeclare = noticeState === "declaration" || (!hasDeadline && noticeState !== "credit");

  // 待处理社长审核报名总数
  const pendingApplicantsTotal = managedClubs.reduce((acc, c) => acc + (c.pendingApplicants || 0), 0);

  // 学期维度统计指标
  const termStats = useMemo(() => {
    if (selectedTerm === "2026-2027 学年上学期") {
      return {
        joinedCount: 2,
        leaderCount: 1,
        memberCount: 1,
        attendanceCount: 6,
        attendanceSubText: "全勤",
        totalHours: "14.0",
        earnedCredits: "1.5",
        creditGoalHours: 18,
        creditGoalCredits: "2.0",
      };
    }
    return {
      joinedCount: 1,
      leaderCount: 1,
      memberCount: 0,
      attendanceCount: 12,
      attendanceSubText: "出勤 12/13 场",
      totalHours: "24.0",
      earnedCredits: "2.0",
      creditGoalHours: 18,
      creditGoalCredits: "2.0",
    };
  }, [selectedTerm]);

  // 广场速览：可申报时展示 4 个；无自主创办入口时，社团广场纵向拉伸展示 8 个彻底填满右侧
  const plazaClubs = useMemo(() => {
    return clubs.slice(0, canDeclare ? 4 : 8);
  }, [clubs, canDeclare]);

  return (
    <div className="student-dashboard-body">
      {/* 0. 演示控制标签条（便于实时体验 4 种业务状态与语义配色） */}
      <div className="notice-demo-toolbar">
        <div className="demo-toolbar-left">
          <span className="demo-toolbar-title">
            <Sparkle size={13} weight="fill" />
            通报条演示：
          </span>
          <div className="demo-chip-group">
            <button
              type="button"
              className={`demo-btn-chip chip-declaration ${noticeState === "declaration" ? "active" : ""}`}
              onClick={() => setNoticeState("declaration")}
            >
              🟣 1. 申报期间
            </button>
            <button
              type="button"
              className={`demo-btn-chip chip-recruitment ${noticeState === "recruitment" ? "active" : ""}`}
              onClick={() => setNoticeState("recruitment")}
            >
              🔵 2. 报名期间
            </button>
            <button
              type="button"
              className={`demo-btn-chip chip-credit ${noticeState === "credit" ? "active" : ""}`}
              onClick={() => setNoticeState("credit")}
            >
              🟠 3. 学分申请期间
            </button>
            <button
              type="button"
              className={`demo-btn-chip chip-hidden ${noticeState === "hidden" ? "active" : ""}`}
              onClick={() => setNoticeState("hidden")}
            >
              ⚪ 4. 常态静默 (隐藏)
            </button>
          </div>
        </div>

        <div className="demo-toolbar-right">
          <label className="demo-mode-toggle">
            <input
              type="checkbox"
              checked={hasDeadline}
              onChange={(e) => setHasDeadline(e.target.checked)}
            />
            <span>模拟“有限时”</span>
          </label>
        </div>
      </div>

      {/* 1. 顶部全局通报条：根据状态渲染不同语义配色、文案与 CTA */}
      {noticeState === "declaration" && (
        <div className="campus-notice-bar state-declaration">
          <div className="notice-left-wrap">
            <span className="notice-pill-tag">
              <RocketLaunch size={12} weight="fill" />
              社团申报中
            </span>
            <span className="notice-body-text">
              <strong>{selectedTerm}</strong> ·{" "}
              {hasDeadline ? (
                <>
                  学生社团自主申报开放至 <strong>9 月 15 日 18:00 (剩 4 天截止)</strong>，欢迎申报创办新社团。
                </>
              ) : (
                <>学生社团本学期常态开放自主申报，欢迎申报创办新社团。</>
              )}
            </span>
          </div>
          <button
            type="button"
            className="btn-notice-action"
            onClick={() => (onOpenDeclaration ? onOpenDeclaration() : onNavigate && onNavigate("manage"))}
          >
            <span>去申报社团</span>
            <ArrowRight size={13} weight="bold" />
          </button>
        </div>
      )}

      {noticeState === "recruitment" && (
        <div className="campus-notice-bar state-recruitment">
          <div className="notice-left-wrap">
            <span className="notice-pill-tag">
              <Sparkle size={12} weight="fill" />
              招新报名中
            </span>
            <span className="notice-body-text">
              <strong>{selectedTerm}</strong> ·{" "}
              {hasDeadline ? (
                <>
                  社团招新报名开放至 <strong>9 月 20 日 18:00 (剩 3 天截止)</strong>，全校 18 个学生社团开放申请。
                </>
              ) : (
                <>学生社团本学期常态开放报名申请，全校共 18 个学生社团开放选团。</>
              )}
            </span>
          </div>
          <button
            type="button"
            className="btn-notice-action"
            onClick={() => onNavigate && onNavigate("plaza")}
          >
            <span>进入社团广场 (18)</span>
            <ArrowRight size={13} weight="bold" />
          </button>
        </div>
      )}

      {noticeState === "credit" && (
        <div className="campus-notice-bar state-credit">
          <div className="notice-left-wrap">
            <span className="notice-pill-tag">
              <Medal size={12} weight="fill" />
              学分认定中
            </span>
            <span className="notice-body-text">
              <strong>{selectedTerm}</strong> ·{" "}
              {hasDeadline ? (
                <>
                  社团学时申请与学分认定开放至 <strong>1 月 15 日 18:00 (剩 5 天截止)</strong>，请及时提交本学期学分申请。
                </>
              ) : (
                <>本学期社团学时申请与学分认定已开启，请及时提交学分申请与证明材料。</>
              )}
            </span>
          </div>
          <button
            type="button"
            className="btn-notice-action"
            onClick={() => (onNavigate ? onNavigate("report") : onNotify && onNotify("已打开社团学分申请"))}
          >
            <span>去申请社团学分</span>
            <ArrowRight size={13} weight="bold" />
          </button>
        </div>
      )}

      {/* noticeState === 'hidden' 时高度为 0，完全隐藏，首屏自然上移 */}

      {/* 2. 主屏双栏布局系统：左主体 + 右专栏常驻 */}
      <div className="youth-grid-layout">
        {/* 左侧主体 */}
        <section className="youth-main-col">
          {/* A. 个人成长概览大卡片（无边框 KPI + 底部轻量待办） */}
          <article className="youth-card profile-growth-card">
            {/* 顶行：个人身份与学期切换 */}
            <div className="profile-identity-header">
              <div className="profile-user-group">
                <div className="profile-avatar-box">
                  <span>子易</span>
                </div>
                <div className="profile-title-col">
                  <div className="profile-name-row">
                    <span className="profile-name-text">赵子易</span>
                    <span className="profile-class-badge">初二 3 班</span>
                    <span className="profile-role-pill leader-pill">社长</span>
                    <span className="profile-role-pill member-pill">成员</span>
                  </div>
                </div>
              </div>

              <div className="profile-ctrls-group">
                <div className="term-select-wrapper">
                  <select
                    className="term-select-capsule"
                    value={selectedTerm}
                    onChange={(e) => {
                      setSelectedTerm(e.target.value);
                      onNotify && onNotify(`已切换学期：${e.target.value}`);
                    }}
                    aria-label="选择学期"
                  >
                    <option value="2026-2027 学年上学期">2026-2027 学年上学期</option>
                    <option value="2025-2026 学年下学期">2025-2026 学年下学期</option>
                    <option value="2025-2026 学年上学期">2025-2026 学年上学期</option>
                  </select>
                  <CaretDown size={12} weight="bold" className="term-select-caret" />
                </div>

                <button
                  type="button"
                  className="btn-open-report"
                  onClick={() => onNavigate("report")}
                >
                  <span>社团报告</span>
                  <ArrowRight size={12} weight="bold" />
                </button>
              </div>
            </div>

            {/* 中部：4 项无边框数据列（纯白通透、浅细竖分割线） */}
            <div className="borderless-kpi-grid">
              <div className="kpi-column">
                <span className="kpi-label">我的社团</span>
                <div className="kpi-value-line">
                  <strong className="kpi-big-num">{termStats.joinedCount}</strong>
                  <span className="kpi-unit">个</span>
                </div>
                <span className="kpi-sub-text">我管理 {termStats.leaderCount} 个 · 我加入 {termStats.memberCount} 个</span>
              </div>

              <div className="kpi-column">
                <span className="kpi-label">活动出勤</span>
                <div className="kpi-value-line">
                  <strong className="kpi-big-num">{termStats.attendanceCount}</strong>
                  <span className="kpi-unit">次</span>
                </div>
                <span className="kpi-sub-text">{termStats.attendanceSubText}</span>
              </div>

              <div className="kpi-column">
                <span className="kpi-label">实践时长</span>
                <div className="kpi-value-line">
                  <strong className="kpi-big-num">{termStats.totalHours}</strong>
                  <span className="kpi-unit">小时</span>
                </div>
                <span className="kpi-sub-text">学期日常活动累计</span>
              </div>

              <div className="kpi-column">
                <span className="kpi-label">已获学分</span>
                <div className="kpi-value-line">
                  <strong className="kpi-big-num">{termStats.earnedCredits}</strong>
                  <span className="kpi-unit">分</span>
                </div>
                <span className="kpi-sub-text">经学时申请与审核认定</span>
              </div>
            </div>

            {/* 底端：轻量待办条 */}
            <div className="kpi-bottom-alert-bar">
              <div className="alert-left">
                <span className="alert-amber-dot" />
                <span className="alert-text">
                  有 <strong>{pendingApplicantsTotal || 2} 名同学</strong> 申请加入你管理的社团，请在招新期内处理。
                </span>
              </div>
              <button
                type="button"
                className="btn-alert-review"
                onClick={() => onNavigate("manage")}
              >
                <span>前往审核 →</span>
              </button>
            </div>
          </article>

          {/* B. 我参与的社团与近期活动 */}
          <article className="youth-card my-clubs-card">
            <div className="clubs-section-header">
              <div className="clubs-header-left">
                <h3>我参与的社团与近期活动</h3>
                <span className="badge-clubs-count">2 个</span>
              </div>
            </div>

            <div className="clean-clubs-list">
              {managedClubs.map((club) => {
                const isLeader = club.role === "leader";
                const isFootball = club.id === "football";

                return (
                  <div key={club.id} className="clean-club-item-card">
                    <div className="club-card-layout">
                      <div className={`club-cover-banner ${club.cover || "football"}`} />
                      <div className="club-card-main">
                        <div className="club-name-row">
                          <div className="club-title-tags">
                            <h4 onClick={() => onShowClub(club)}>{club.name}</h4>
                            <span className="tag-club-cat">{club.category}</span>
                            {isLeader ? (
                              <span className="profile-role-pill leader-pill">社长</span>
                            ) : (
                              <span className="profile-role-pill member-pill">成员</span>
                            )}
                          </div>
                          {isLeader && (club.pendingApplicants || 0) > 0 && (
                            <span className="badge-pending-applicants">
                              {club.pendingApplicants} 人待入团审核
                            </span>
                          )}
                        </div>

                        <div className="club-inline-event-strip">
                          <div className="event-strip-main">
                            <CalendarDots size={14} weight="bold" className="event-strip-cal-icon" />
                            <span className="event-time-text">
                              {isFootball ? "10 月 23 日 (周三) 16:20" : "10 月 25 日 (周五) 15:30"}
                            </span>
                            <span className="event-venue-text">
                              <MapPin size={13} weight="fill" />
                              {isFootball ? "西操场 1 号场地" : "影媒工作间 204"}
                            </span>
                            <span className="event-name-text">
                              {isFootball ? "校园秋季友谊对抗赛" : "校园人物微纪录片初剪沟通会"}
                            </span>
                          </div>

                          <button
                            type="button"
                            className="event-strip-chat-btn"
                            title="查看活动精彩瞬间"
                            onClick={() => {
                              onNotify && onNotify(`已进入「${club.name}」活动精彩瞬间（6 份分享）`);
                              onShowClub(club);
                            }}
                          >
                            <Camera size={16} weight="regular" className="event-strip-chat-icon" />
                            <span>活动瞬间 6</span>
                          </button>
                        </div>

                        <div className="club-meta-actions-line">
                          <div className="club-facts-text">
                            <span>成员: {isFootball ? "16" : "12"} / {club.capacity} 人</span>
                          </div>

                          <div className="club-card-btns">
                            {isLeader ? (
                              <button
                                type="button"
                                className="btn-club-primary"
                                onClick={() => onNavigate("manage")}
                              >
                                管理社团
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn-club-primary"
                                onClick={() => onShowClub(club)}
                              >
                                进入社团
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </section>

        {/* 右侧专栏：社团广场常驻，无申报入口时纵向拉伸撑满 */}
        <aside className={`youth-side-col ${!canDeclare ? "stretch-col" : ""}`}>
          {/* 社团广场卡片 */}
          <article className={`youth-card plaza-clean-card ${!canDeclare ? "stretch-card" : ""}`}>
            <div className="plaza-header-row">
              <div className="plaza-title-with-count">
                <Compass size={17} weight="bold" className="plaza-compass-icon" />
                <h3>社团广场</h3>
              </div>
            </div>

            <div className="plaza-stream-list">
              {plazaClubs.map((club) => {
                const isOpen = club.state === "open";
                return (
                  <div key={club.id} className="plaza-stream-row">
                    <div className={`plaza-cover-thumb ${club.poster || "robot"}`} />
                    <div className="plaza-row-content">
                      <div className="plaza-row-top">
                        <span
                          className="plaza-club-name"
                          onClick={() => onShowClub(club)}
                          title={club.name}
                        >
                          {club.name}
                        </span>
                        <span className="plaza-cat-tag">{club.category}</span>
                      </div>
                      <div className="plaza-row-status">
                        <span className={`status-dot ${isOpen ? "open" : (club.state === "full" ? "full" : "closed")}`} />
                        <span className="status-label">{isOpen ? "可申请" : (club.state === "full" ? "已满额" : "已截止")}</span>
                        <span className="capacity-label">{club.members}/{club.capacity}人</span>
                      </div>
                    </div>
                    <div className="plaza-row-action">
                      <button
                        type="button"
                        className={isOpen ? "btn-plaza-apply-blue" : "btn-plaza-view-gray"}
                        onClick={() => (isOpen ? onApplyClub(club) : onShowClub(club))}
                      >
                        {isOpen ? "申请" : "查看"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="btn-browse-full-hall"
              onClick={() => onNavigate && onNavigate("plaza")}
            >
              <span>浏览完整社团广场 (18) →</span>
            </button>
          </article>

          {/* 自主创办新社团快捷入口：仅在可申报时展示，单色素雅风 */}
          {canDeclare && (
            <article className="youth-card clean-incubation-card">
              <h4>自主创办新社团</h4>
              <p>提交创办方案，经教师审批通过后即可成为社长开展招新。</p>
              <button
                type="button"
                className="btn-clean-create-club"
                onClick={() => (onOpenDeclaration ? onOpenDeclaration() : onNavigate("manage"))}
              >
                <Plus size={14} weight="bold" />
                <span>申报新社团</span>
              </button>
            </article>
          )}
        </aside>
      </div>
    </div>
  );
}
