/**
 * ==============================================================================
 * 备份副本：学生社团 · 我管理的社团（社长工作台）
 * 方案一：【通栏一体看板 + 极轻动态行动条 + 4 大聚合业务 Tab】（纵向通栏版）
 * 
 * 存档时间：2026-10-23
 * 设计特点：
 * 1. 紧凑型社团运行 Banner，顶部横向展示社团名、分类、指导教师、常驻场地与容量进度条；
 * 2. 极轻量动态行动提醒条（Action Strip），以通知横条形式呈现待审批申请、活动排期与学分初审；
 * 3. 4 大聚合 Tab：成员与团队、活动组织与考勤、成果与学分、社团名片与周期；
 * 4. 适合喜好经典通栏 B 端管理台、追求表格极致宽度的领导或评审场景。
 * ==============================================================================
 */

import React, { useState, useMemo } from "react";
import {
  Bell,
  CheckCircle,
  Crown,
  Export,
  GraduationCap,
  MagnifyingGlass,
} from "@phosphor-icons/react";

export function ManagePagePlan1Banner({
  club,
  term,
  applicants,
  members,
  activities,
  creditRequests,
  presidentCredit,
  isArchived,
  onApproveApplicant,
  onRejectApplicant,
  onApproveCredit,
  onSubmitPresidentCredit,
  onOpenPublishModal,
  onOpenEndModal,
  onNotify,
}) {
  const [tab, setTab] = useState("members");
  const [memberSubTab, setMemberSubTab] = useState("applicants");
  const [memberKeyword, setMemberKeyword] = useState("");

  const pendingCreditsCount = creditRequests.filter((c) => c.status === "pending").length;

  const tabItems = [
    ["members", `成员与团队（${applicants.length > 0 ? `待审 ${applicants.length}` : members.length}）`],
    ["activities", `活动组织与考勤（${activities.length}）`],
    ["credits", `成果与学分（${pendingCreditsCount > 0 ? `待审 ${pendingCreditsCount}` : "就绪"}）`],
    ["lifecycle", "社团名片与周期"],
  ];

  const filteredMembers = useMemo(() => {
    if (!memberKeyword) return members;
    return members.filter(
      (m) =>
        m.name.includes(memberKeyword) ||
        m.class.includes(memberKeyword) ||
        m.role.includes(memberKeyword)
    );
  }, [members, memberKeyword]);

  return (
    <div className="manage-plan1-banner-layout">
      {/* 紧凑型社团运行 Banner */}
      <section className="president-header-card compact">
        <div className="president-identity-left">
          <div className={`president-club-cover ${club.cover || "football"}`} />
          <div className="president-identity-info">
            <h2>
              <span>{club.name}</span>
              <span className="category-tag">{club.category}</span>
              <span className="status-badge passed"><i className="badge-dot" /> 本学期进行中</span>
              <span className="term-sub-tag">{term}</span>
            </h2>
            <div className="president-meta-list">
              <span>社长：<strong>{club.captain}</strong></span>
              <span className="meta-divider" />
              <span>指导教师：<strong>{club.teacher}</strong></span>
              <span className="meta-divider" />
              <span>常驻场地：<strong>{club.venue}</strong></span>
              <span className="meta-divider" />
              <span>频次：<strong>{club.frequency}</strong></span>
            </div>
          </div>
        </div>

        <div className="president-capacity-box">
          <div className="capacity-title-row">
            <span>正式成员容量</span>
            <strong>{members.length} / {club.capacity} 人（{Math.round((members.length / club.capacity) * 100)}%）</strong>
          </div>
          <div className="capacity-track">
            <div
              className="capacity-fill"
              style={{ width: `${Math.min(100, Math.round((members.length / club.capacity) * 100))}%` }}
            />
          </div>
          <span className="capacity-sub">
            本学期剩余 {Math.max(0, club.capacity - members.length)} 个招新名额 · 招新截止 9 月 20 日
          </span>
        </div>
      </section>

      {/* 极轻量动态行动提醒条 */}
      <div className="manage-alert-strip">
        <div className="alert-strip-left">
          <span className="alert-tag-item">
            <Bell size={16} /> <strong>待办提醒：</strong>
          </span>
          {applicants.length > 0 && (
            <span className="alert-tag-item">
              有 {applicants.length} 位同学提交了入团自荐
              <a className="alert-jump-link" onClick={() => { setTab("members"); setMemberSubTab("applicants"); }}>去审批 →</a>
            </span>
          )}
          <span className="meta-divider" />
          <span className="alert-tag-item">
            近期有 1 场活动待开展
            <a className="alert-jump-link" onClick={() => setTab("activities")}>查看排期 →</a>
          </span>
          {pendingCreditsCount > 0 && (
            <>
              <span className="meta-divider" />
              <span className="alert-tag-item">
                {pendingCreditsCount} 位成员提交了学分初审
                <a className="alert-jump-link" onClick={() => setTab("credits")}>去初审 →</a>
              </span>
            </>
          )}
        </div>
        <div>
          <button
            type="button"
            className="secondary compact"
            disabled={isArchived}
            onClick={onOpenPublishModal}
          >
            ＋ 发布活动
          </button>
        </div>
      </div>

      {/* 4 大 Tab 通栏区域 */}
      <section className="president-tabs-panel">
        <div className="tabs-bar">
          {tabItems.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`tab-btn ${tab === id ? "active" : ""}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab 1: 成员与团队 */}
        {tab === "members" && (
          <div className="manage-tab-content">
            <div className="sub-segment-tabs">
              <button
                type="button"
                className={`sub-segment-btn ${memberSubTab === "applicants" ? "active" : ""}`}
                onClick={() => setMemberSubTab("applicants")}
              >
                待审批入团申请（{applicants.length}）
              </button>
              <button
                type="button"
                className={`sub-segment-btn ${memberSubTab === "list" ? "active" : ""}`}
                onClick={() => setMemberSubTab("list")}
              >
                正式成员名册（{members.length}）
              </button>
            </div>

            {memberSubTab === "applicants" ? (
              <div>
                {applicants.length > 0 ? (
                  <div className="applicant-cards-list">
                    {applicants.map((app) => (
                      <div className="applicant-card" key={app.id}>
                        <div className="applicant-main-info">
                          <div className="applicant-head-row">
                            <strong className="applicant-name">{app.name}</strong>
                            <span className="applicant-tag">{app.gender}</span>
                            <span className="applicant-class-badge">{app.class}</span>
                            <span className="applicant-time-text">提交于 {app.time}</span>
                            <span className="applicant-phone-text">联系方式：{app.phone}</span>
                          </div>
                          <div className="applicant-reason-quote">
                            <strong>入团自荐理由：</strong>
                            <span>“{app.reason}”</span>
                          </div>
                        </div>
                        <div className="applicant-action-buttons">
                          <button
                            type="button"
                            className="primary compact btn-approve-applicant"
                            disabled={isArchived}
                            onClick={() => onApproveApplicant(app)}
                          >
                            同意入团
                          </button>
                          <button
                            type="button"
                            className="secondary compact btn-reject-applicant"
                            disabled={isArchived}
                            onClick={() => onRejectApplicant(app)}
                          >
                            婉拒
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="president-empty-box">
                    <CheckCircle size={36} className="empty-icon-check" />
                    <strong>当前暂无待处理入团申请</strong>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="members-toolbar">
                  <div className="toolbar-search-box">
                    <MagnifyingGlass size={16} />
                    <input
                      type="text"
                      placeholder="搜索成员姓名、班级或角色..."
                      value={memberKeyword}
                      onChange={(e) => setMemberKeyword(e.target.value)}
                    />
                  </div>
                  <div className="toolbar-right-actions">
                    <button
                      type="button"
                      className="secondary compact"
                      onClick={() => onNotify(`已导出「${club.name}」成员名册`)}
                    >
                      <Export size={14} /> 导出名册 Excel
                    </button>
                  </div>
                </div>

                <div className="members-table-wrap">
                  <table className="president-members-table">
                    <thead>
                      <tr>
                        <th>姓名</th>
                        <th>角色</th>
                        <th>班级</th>
                        <th>入团时间</th>
                        <th>出勤场次</th>
                        <th>联系电话</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMembers.map((m) => (
                        <tr key={m.id}>
                          <td><strong>{m.name}</strong></td>
                          <td>{m.role}</td>
                          <td>{m.class}</td>
                          <td>{m.joinDate}</td>
                          <td>{m.count} 场活动</td>
                          <td>{m.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: 活动组织 */}
        {tab === "activities" && (
          <div className="manage-tab-content">
            <div className="activity-cards-list">
              {activities.map((act) => (
                <div className="president-activity-card" key={act.id}>
                  <div className="activity-card-left">
                    <div className="activity-title-row">
                      <strong>{act.title}</strong>
                      <span className="status-badge passed">{act.statusLabel}</span>
                    </div>
                    <div className="activity-meta-row">
                      <span>时间：<strong>{act.date}</strong></span>
                      <span className="meta-divider" />
                      <span>场地：<strong>{act.venue}</strong></span>
                    </div>
                    <p className="activity-desc-text">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: 成果与学分 */}
        {tab === "credits" && (
          <div className="manage-tab-content">
            <section className="president-credit-module">
              <div className="president-credit-header">
                <h3>
                  <Crown size={18} weight="fill" color="#eab308" />
                  <span>我的社长履职学分申报（报送指导教师终审）</span>
                </h3>
              </div>
              <div className="credit-facts-grid">
                <div className="credit-fact-col">
                  <div className="fact-num">{activities.length} <small>场</small></div>
                  <div className="fact-lbl">组织活动</div>
                </div>
                <div className="credit-fact-col">
                  <div className="fact-num">9.5 <small>小时</small></div>
                  <div className="fact-lbl">实践时长</div>
                </div>
                <div className="credit-fact-col">
                  <div className="fact-num">100%</div>
                  <div className="fact-lbl">出勤率</div>
                </div>
                <div className="credit-fact-col">
                  <div className="fact-num">{members.length} <small>人</small></div>
                  <div className="fact-lbl">社团成员</div>
                </div>
              </div>
              <div className="president-credit-footer">
                <span>申报学时：<strong>{presidentCredit.declaredHours} 小时</strong></span>
                <button
                  type="button"
                  className="primary compact"
                  onClick={onSubmitPresidentCredit}
                >
                  提交社长学分申报
                </button>
              </div>
            </section>
          </div>
        )}

        {/* Tab 4: 社团名片与周期 */}
        {tab === "lifecycle" && (
          <div className="manage-tab-content">
            <div className="president-lifecycle-panel">
              <div className="lifecycle-section">
                <h3>社团档案快照</h3>
                <div>{club.name} · {club.category}</div>
              </div>
              <div className="lifecycle-section warning-zone">
                <h3>生命周期治理</h3>
                <button type="button" className="secondary danger-text" onClick={onOpenEndModal}>
                  申请提前结束社团
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
