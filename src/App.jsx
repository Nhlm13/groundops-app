import { useState, useEffect } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@400;500;600;700&display=swap');`;

const css = `
${FONT}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --earth:  #e8e4dc;
  --bark:   #f4f1eb;
  --bark2:  #ede9e0;
  --moss:   #b8b09a;
  --leaf:   #4a6d20;
  --lime:   #3d6b10;
  --dirt:   #7a6845;
  --sand:   #8a6e30;
  --stone:  #6a6658;
  --mist:   #4a4840;
  --cream:  #1a1814;
  --danger: #c0442a;
  --warn:   #a06010;
  --mgr:    #2a5a95;
  --mgr-lt: #1a4a80;
}
body { background: var(--earth); font-family: 'Barlow', sans-serif; color: var(--cream); -webkit-tap-highlight-color: transparent; }

.app {
  max-width: 430px; min-height: 100dvh;
  margin: 0 auto; background: var(--earth);
  display: flex; flex-direction: column;
  position: relative; overflow: hidden;
}
.app::before {
  content: '';
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.5;
}

.splash {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; padding: 36px 20px 60px;
  position: relative; z-index: 1;
  animation: fadeUp 0.45s ease both; overflow-y: auto;
}
@keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }

.logo-mark {
  width: 66px; height: 66px; border-radius: 16px;
  background: var(--moss); border: 2px solid var(--leaf);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 14px; box-shadow: 0 8px 28px rgba(96,196,53,0.15);
}
.logo-mark svg { width: 34px; height: 34px; color: var(--lime); }
.app-title { font-family: 'Bebas Neue', sans-serif; font-size: 40px; letter-spacing: 4px; color: var(--lime); line-height: 1; }
.app-sub { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; letter-spacing: 4px; color: var(--stone); text-transform: uppercase; margin-top: 5px; margin-bottom: 28px; }

.select-label { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; letter-spacing: 3px; color: var(--stone); text-transform: uppercase; margin-bottom: 12px; align-self: flex-start; }
.truck-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; width: 100%; margin-bottom: 24px; }
.truck-tile { background: var(--bark); border: 2px solid var(--moss); border-radius: 10px; padding: 10px 4px; display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer; transition: border-color 0.15s, background 0.15s, transform 0.1s; }
.truck-tile:active { transform: scale(0.94); }
.truck-tile.selected { border-color: var(--lime); background: rgba(150,194,53,0.12); }
.truck-tile svg { width: 22px; height: 22px; color: var(--stone); transition: color 0.15s; }
.truck-tile.selected svg { color: var(--lime); }
.truck-num { font-family: 'Bebas Neue', sans-serif; font-size: 18px; color: var(--stone); letter-spacing: 1px; line-height: 1; transition: color 0.15s; }
.truck-tile.selected .truck-num { color: var(--lime); }

.pin-section { width: 100%; background: var(--bark); border: 1px solid var(--moss); border-radius: 14px; padding: 20px; }
.pin-header { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
.selected-truck-badge { display: flex; align-items: center; gap: 6px; background: var(--moss); border-radius: 8px; padding: 6px 12px; }
.selected-truck-badge svg { width: 14px; height: 14px; color: var(--lime); }
.selected-truck-badge span { font-family: 'Bebas Neue', sans-serif; font-size: 17px; color: var(--lime); letter-spacing: 1px; }
.pin-dots { display: flex; gap: 12px; justify-content: center; margin-bottom: 18px; }
.pin-dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--moss); background: transparent; transition: background 0.15s, border-color 0.15s, transform 0.1s; }
.pin-dot.filled { background: var(--lime); border-color: var(--lime); transform: scale(1.1); }

.numpad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; }
.num-btn { background: var(--bark2); border: 1px solid var(--moss); border-radius: 10px; padding: 15px 8px; font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--cream); cursor: pointer; transition: background 0.1s, transform 0.1s; display: flex; flex-direction: column; align-items: center; gap: 1px; -webkit-tap-highlight-color: transparent; }
.num-btn:active { background: var(--moss); transform: scale(0.93); }
.num-sub { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; letter-spacing: 2px; color: var(--stone); }
.num-btn.zero { grid-column: 2; }

.btn-enter { width: 100%; padding: 14px; margin-top: 16px; background: var(--lime); border: none; border-radius: 10px; font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 3px; color: var(--earth); cursor: pointer; transition: opacity 0.2s, transform 0.1s; }
.btn-enter:disabled { background: var(--moss); color: var(--stone); cursor: not-allowed; }
.btn-enter:not(:disabled):active { opacity: 0.85; transform: scale(0.98); }
.no-truck-msg { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; color: var(--stone); text-align: center; padding: 30px 0 10px; letter-spacing: 1px; }
.mgr-toggle { margin-top: 22px; text-align: center; font-family: 'Barlow Condensed', sans-serif; font-size: 18px; color: var(--mgr-lt); cursor: pointer; letter-spacing: 1px; text-decoration: underline; text-underline-offset: 3px; }
.error-msg { background: rgba(192,68,42,0.15); border: 1px solid var(--danger); border-radius: 8px; padding: 10px 14px; margin-top: 12px; font-size: 18px; color: var(--danger); text-align: center; animation: shake 0.3s ease; }
@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }

.mgr-login-box { width: 100%; }
.mgr-login-header { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
.mgr-login-header span { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--mgr-lt); letter-spacing: 2px; }
.login-label { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; letter-spacing: 3px; color: var(--stone); text-transform: uppercase; margin-bottom: 8px; }
.mgr-input { width: 100%; background: var(--bark2); border: 1px solid var(--mgr); border-radius: 8px; padding: 14px; color: var(--cream); font-family: 'Barlow', sans-serif; font-size: 16px; text-align: center; letter-spacing: 4px; margin-bottom: 14px; }
.mgr-input:focus { outline: none; border-color: var(--mgr-lt); }
.btn-mgr { width: 100%; padding: 14px; background: var(--mgr); border: none; border-radius: 10px; font-family: 'Bebas Neue', sans-serif; font-size: 19px; letter-spacing: 3px; color: #fff; cursor: pointer; transition: opacity 0.2s; }
.btn-mgr:active { opacity: 0.85; }

.screen { flex: 1; display: flex; flex-direction: column; position: relative; z-index: 1; animation: fadeUp 0.35s ease both; }
.topbar { background: var(--bark); border-bottom: 3px solid var(--leaf); padding: 12px 16px 10px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
.topbar-left { display: flex; align-items: center; gap: 10px; }
.topbar-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--lime); letter-spacing: 2px; }
.truck-pill { display: flex; align-items: center; gap: 5px; background: var(--moss); border-radius: 20px; padding: 4px 10px; font-family: 'Barlow Condensed', sans-serif; font-size: 18px; color: var(--lime); letter-spacing: 1px; }
.truck-pill svg { width: 12px; height: 12px; }
.logout-btn { background: none; border: 1px solid var(--moss); border-radius: 6px; padding: 5px 10px; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-size: 14px; color: var(--stone); letter-spacing: 1px; text-transform: uppercase; }

.content { padding: 16px 16px 90px; overflow-y: auto; flex: 1; }
.section-hd { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 3px; color: var(--stone); text-transform: uppercase; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
.section-hd::after { content:''; flex:1; height:1px; background:var(--moss); }

.greeting { background: var(--bark); border: 1px solid var(--moss); border-left: 4px solid var(--lime); border-radius: 10px; padding: 14px 16px; margin-bottom: 18px; display: flex; align-items: center; gap: 14px; }
.greeting-icon { width: 44px; height: 44px; border-radius: 10px; background: var(--moss); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.greeting-icon svg { width: 24px; height: 24px; color: var(--lime); }
.greet-name { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: var(--lime); line-height: 1; }
.greet-sub { font-size: 18px; color: var(--stone); margin-top: 3px; }

.job-card { background: var(--bark); border: 1px solid var(--moss); border-left: 4px solid var(--leaf); border-radius: 9px; padding: 13px 14px; margin-bottom: 9px; }
.job-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; color: var(--cream); margin-bottom: 4px; }
.job-meta { display: flex; gap: 12px; flex-wrap: wrap; }
.job-meta span { font-size: 18px; color: var(--stone); display: flex; align-items: center; gap: 3px; }
.job-meta span svg { width: 10px; height: 10px; color: var(--leaf); }
.job-status-chip { display: inline-block; margin-top: 8px; font-family: 'Barlow Condensed', sans-serif; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; }
.chip-active { background: rgba(150,194,53,0.15); color: var(--lime); }
.chip-next { background: rgba(196,169,106,0.15); color: var(--sand); }

.cat-card { background: var(--bark); border: 1px solid var(--moss); border-radius: 12px; margin-bottom: 10px; overflow: hidden; }
.cat-header { padding: 13px 15px; display: flex; align-items: center; gap: 12px; cursor: pointer; user-select: none; }
.cat-icon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ci-ops { background: rgba(96,125,48,0.25); } .ci-hr { background: rgba(196,132,42,0.2); } .ci-team { background: rgba(74,122,181,0.2); }
.cat-icon svg { width: 17px; height: 17px; }
.ci-ops svg { color: var(--leaf); } .ci-hr svg { color: var(--sand); } .ci-team svg { color: var(--mgr-lt); }
.cat-info { flex: 1; }
.cat-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; color: var(--cream); }
.cat-count { font-size: 18px; color: var(--stone); margin-top: 1px; }
.chevron { width: 16px; height: 16px; color: var(--stone); transition: transform 0.22s; flex-shrink: 0; }
.chevron.open { transform: rotate(90deg); }
.form-list { border-top: 1px solid var(--moss); }
.form-item { display: flex; align-items: center; justify-content: space-between; padding: 13px 15px; border-bottom: 1px solid rgba(58,70,40,0.5); cursor: pointer; transition: background 0.15s; }
.form-item:last-child { border-bottom: none; }
.form-item:active { background: rgba(58,70,40,0.35); }
.form-item-left { display: flex; align-items: center; gap: 10px; }
.form-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--moss); flex-shrink: 0; }
.form-name { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; color: var(--cream); font-weight: 600; }
.form-desc { font-size: 18px; color: var(--stone); margin-top: 1px; }
.open-badge { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; color: var(--lime); background: rgba(96,194,53,0.1); border: 1px solid rgba(96,194,53,0.25); border-radius: 5px; padding: 3px 8px; flex-shrink: 0; white-space: nowrap; }

.sub-card { background: var(--bark); border: 1px solid var(--moss); border-radius: 9px; padding: 13px 14px; margin-bottom: 9px; display: flex; align-items: center; gap: 12px; }
.sub-icon { width: 34px; height: 34px; border-radius: 8px; background: var(--moss); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sub-icon svg { width: 15px; height: 15px; color: var(--leaf); }
.sub-name { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; color: var(--cream); font-weight: 600; }
.sub-meta { font-size: 18px; color: var(--stone); margin-top: 2px; }
.sub-time { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; color: var(--sand); margin-left: auto; flex-shrink: 0; }

/* ── TOOLS ── */
.tool-cat-header { padding: 12px 14px; display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; background: var(--bark); border: 1px solid var(--moss); border-radius: 10px; margin-bottom: 8px; }
.tool-cat-label { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; color: var(--cream); flex: 1; }
.tool-cat-count { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; color: var(--stone); }
.tool-row { background: var(--bark); border: 1px solid var(--moss); border-radius: 9px; padding: 12px 14px; margin-bottom: 8px; display: flex; align-items: center; gap: 10px; }
.tool-info { flex: 1; min-width: 0; }
.tool-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 15px; color: var(--cream); }
.tool-avail { font-size: 18px; margin-top: 2px; }
.tool-avail.ok { color: var(--leaf); }
.tool-avail.low { color: var(--warn); }
.tool-avail.none { color: var(--danger); }
.qty-row { display: flex; align-items: center; gap: 8px; }
.qty-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--moss); background: var(--bark2); color: var(--cream); font-size: 18px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.1s; flex-shrink: 0; }
.qty-btn:active { background: var(--moss); }
.qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.qty-num { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--lime); min-width: 24px; text-align: center; }
.checkout-btn { padding: 8px 14px; background: var(--lime); border: none; border-radius: 8px; font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 1px; color: var(--earth); cursor: pointer; transition: opacity 0.2s; white-space: nowrap; }
.checkout-btn:disabled { background: var(--moss); color: var(--stone); cursor: not-allowed; }
.checked-out-row { background: rgba(150,194,53,0.08); border: 1px solid rgba(150,194,53,0.25); border-radius: 9px; padding: 12px 14px; margin-bottom: 8px; display: flex; align-items: center; gap: 10px; }
.return-btn { padding: 8px 12px; background: none; border: 1px solid var(--leaf); border-radius: 8px; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 1px; color: var(--lime); cursor: pointer; white-space: nowrap; }
.return-btn:active { background: rgba(150,194,53,0.15); }
.co-qty-badge { background: var(--moss); border-radius: 6px; padding: 3px 8px; font-family: 'Bebas Neue', sans-serif; font-size: 16px; color: var(--lime); }

/* Manager tools */
.mgr-tool-row { background: var(--bark); border: 1px solid var(--moss); border-radius: 9px; padding: 12px 14px; margin-bottom: 8px; }
.mgr-tool-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.mgr-tool-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; color: var(--cream); }
.mgr-tool-nums { display: flex; gap: 8px; }
.num-chip { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; padding: 2px 8px; border-radius: 4px; letter-spacing: 0.5px; }
.nc-total { background: rgba(122,122,106,0.2); color: var(--stone); }
.nc-out { background: rgba(192,122,40,0.2); color: var(--warn); }
.nc-avail { background: rgba(96,125,48,0.2); color: var(--leaf); }
.mgr-tool-trucks { font-size: 18px; color: var(--stone); display: flex; flex-wrap: wrap; gap: 4px; }
.truck-tag { background: var(--moss); border-radius: 4px; padding: 2px 7px; font-family: 'Barlow Condensed', sans-serif; font-size: 18px; color: var(--sand); }

/* Manager */
.mgr-topbar { background: #d8d4ca; border-bottom: 3px solid var(--mgr); padding: 12px 16px 10px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
.mgr-topbar-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--mgr-lt); letter-spacing: 2px; }
.mgr-badge { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; color: var(--mgr-lt); background: rgba(74,122,181,0.2); border: 1px solid var(--mgr); border-radius: 20px; padding: 4px 10px; }
.activity-item { background: var(--bark); border: 1px solid var(--moss); border-left: 4px solid var(--leaf); border-radius: 8px; padding: 12px 14px; margin-bottom: 9px; animation: fadeUp 0.3s ease both; }
.activity-item.hr-form { border-left-color: var(--sand); }
.activity-item.team-form { border-left-color: var(--mgr); }
.act-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 3px; }
.act-form { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; color: var(--cream); }
.act-time { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; color: var(--stone); }
.act-truck { font-size: 18px; color: var(--sand); display: flex; align-items: center; gap: 4px; margin-top: 2px; }
.act-truck svg { width: 11px; height: 11px; }
.act-cat { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; color: var(--stone); margin-top: 4px; }
.view-sheet-btn { display: flex; align-items: center; gap: 6px; background: rgba(74,122,181,0.12); border: 1px solid var(--mgr); border-radius: 7px; padding: 9px 14px; margin-top: 8px; font-family: 'Barlow Condensed', sans-serif; font-size: 18px; color: var(--mgr-lt); letter-spacing: 1px; text-transform: uppercase; cursor: pointer; width: 100%; justify-content: center; transition: background 0.2s; }
.view-sheet-btn:active { background: rgba(74,122,181,0.28); }
.view-sheet-btn svg { width: 13px; height: 13px; }

.bottom-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; background: var(--bark); border-top: 2px solid var(--moss); display: flex; z-index: 100; padding-bottom: env(safe-area-inset-bottom); }
.bnav-btn { flex: 1; padding: 10px 4px 8px; background: none; border: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; font-family: 'Barlow Condensed', sans-serif; font-size: 14px; color: var(--stone); letter-spacing: 1px; text-transform: uppercase; border-bottom: 3px solid transparent; transition: color 0.2s; }
.bnav-btn.active { color: var(--lime); border-bottom-color: var(--lime); }
.bnav-btn.active.mgr-tab { color: var(--mgr-lt); border-bottom-color: var(--mgr); }
.bnav-btn svg { width: 26px; height: 26px; }
`;

// ── Icons ──
const Ic = ({ n, ...p }) => {
  const d = {
    leaf:   <><path d="M9 3 C7 3 6 4.5 6 6.5 L6 14 C6 14 5 14.5 5 16 L5 19 C5 20 5.5 21 7 21 L15 21 C16 21 17 20.5 17 19 L17 17.5 C17 16.5 16.5 16 16 15.5 L15.5 14.5 L15.5 10 C15.5 10 17 9.5 17 7.5 C17 5 15.5 3.5 14 3.5 C13 3.5 12.5 4 12 4.5 C11.5 4 11 3 9 3 Z" fill="currentColor" stroke="none"/><path d="M7 17 L17 17" stroke="white" strokeWidth="0.8" fill="none" strokeLinecap="round"/></>,
    truck:  <><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    clip:   <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></>,
    star:   <><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></>,
    doc:    <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    chev:   <><polyline points="9,18 15,12 9,6"/></>,
    clock:  <><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></>,
    map:    <><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
    bell:   <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
    sheets: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></>,
    del:    <><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></>,
    wrench: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>,
    box:    <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    check:  <><polyline points="20,6 9,17 4,12"/></>,
    undo:   <><polyline points="9,14 4,9 9,4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>{d[n]}</svg>;
};

// ── TOOL INVENTORY ──
// To update quantities: change the `total` number for each tool
const TOOL_INVENTORY = [
  {
    category: "Hand Tools",
    tools: [
      { id: "rake",      name: "Rake",            total: 8 },
      { id: "shovel",    name: "Shovel",           total: 6 },
      { id: "hoe",       name: "Garden Hoe",       total: 5 },
      { id: "trowel",    name: "Hand Trowel",      total: 10 },
      { id: "shears",    name: "Pruning Shears",   total: 7 },
      { id: "loppers",   name: "Loppers",          total: 4 },
      { id: "pitchfork", name: "Pitchfork",        total: 3 },
      { id: "broom",     name: "Push Broom",       total: 6 },
    ],
  },
  {
    category: "Power Tools",
    tools: [
      { id: "blower",    name: "Leaf Blower",      total: 6 },
      { id: "trimmer",   name: "String Trimmer",   total: 5 },
      { id: "hedger",    name: "Hedge Trimmer",    total: 4 },
      { id: "chainsaw",  name: "Chainsaw",         total: 2 },
      { id: "edger",     name: "Edger",            total: 3 },
    ],
  },
  {
    category: "Trailer & Hauling",
    tools: [
      { id: "tarp",      name: "Heavy Tarp",       total: 8 },
      { id: "straps",    name: "Tie-Down Straps",  total: 12 },
      { id: "ramps",     name: "Loading Ramps",    total: 4 },
      { id: "wheelbarrow", name: "Wheelbarrow",    total: 5 },
      { id: "buckets",   name: "Buckets (5gal)",   total: 15 },
    ],
  },
  {
    category: "Safety & PPE",
    tools: [
      { id: "gloves",    name: "Work Gloves",      total: 20 },
      { id: "glasses",   name: "Safety Glasses",   total: 15 },
      { id: "vest",      name: "Safety Vest",      total: 10 },
      { id: "earpro",    name: "Ear Protection",   total: 10 },
    ],
  },
];

// ── Other Data ──
const TRUCKS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1, label: `Truck ${i + 1}`,
  pin: String(1000 + (i + 1) * 11).slice(0, 4),
}));
const MGR_PASS = "ground25";

// Jobs loaded from Google Sheets — see fetchJobs() in App component
const SHEETS_ID  = "1RdaByCLstwdj0zkKfWnrExX5DWcaMFgld-H-w27BuUU";
const SHEETS_TAB = "Sheet 1";
const SHEETS_KEY = "AIzaSyBj9Hxi1MUSq4MBToFxqKG1QDwJBu9PyJw";

const FORM_CATS = [
  { id: "ops", label: "Daily Operations", icon: "truck", colorClass: "ci-ops",
    forms: [
      { name: "Trailer Checklist",    desc: "Pre-departure equipment check",   url: "https://forms.gle/7GE4hZFKo9DUeuqf6" },
      { name: "Morning Runthrough",   desc: "Daily startup & safety review",   url: "" },
      { name: "Property Walkthrough", desc: "On-site condition report",        url: "" },
    ]},
  { id: "hr", label: "HR & Admin", icon: "clip", colorClass: "ci-hr",
    forms: [
      { name: "Time Off Request",  desc: "Submit leave for approval",          url: "https://forms.gle/RbJWkvB21z3Ncfc18" },
      { name: "Document Upload",   desc: "Tax docs & employment forms",        url: "" },
      { name: "Job Application",   desc: "Refer someone to the team",          url: "https://forms.gle/1E7RovrzAax6znfv8" },
      { name: "Contact a Manager", desc: "Send a message to management",       url: "https://forms.gle/U2msqNE6uJZa267b8" },
    ]},
  { id: "team", label: "Team & Skills", icon: "star", colorClass: "ci-team",
    forms: [
      { name: "Team Member Info",                 desc: "Your profile & personal info",        url: "https://forms.gle/J63nza1gkYKDL7Lk7" },
      { name: "Skills Assessment — Gardening",    desc: "Rate your gardening knowledge",       url: "" },
      { name: "Skills Assessment — Construction", desc: "Construction skills self-review",     url: "" },
      { name: "Skills Assessment — Maintenance",  desc: "Equipment & maintenance proficiency", url: "" },
    ]},
];

const TRUCK_SUBMISSIONS = {
  1: [
    { form: "Morning Runthrough", when: "Today 6:52 AM" },
    { form: "Trailer Checklist",  when: "Today 6:40 AM" },
  ],
  2: [{ form: "Morning Runthrough", when: "Today 7:04 AM" }],
};

const ACTIVITY = [
  { form: "Morning Runthrough",   truck: "Truck 1", when: "6:52 AM",   type: "ops",       cat: "Daily Operations" },
  { form: "Trailer Checklist",    truck: "Truck 1", when: "6:40 AM",   type: "ops",       cat: "Daily Operations" },
  { form: "Morning Runthrough",   truck: "Truck 2", when: "7:04 AM",   type: "ops",       cat: "Daily Operations" },
  { form: "Time Off Request",     truck: "Truck 5", when: "Yesterday", type: "hr-form",   cat: "HR & Admin" },
  { form: "Skills — Maintenance", truck: "Truck 7", when: "Mar 7",     type: "team-form", cat: "Team & Skills" },
];

const NUMKEYS = [
  {v:"1",s:""},{v:"2",s:"ABC"},{v:"3",s:"DEF"},
  {v:"4",s:"GHI"},{v:"5",s:"JKL"},{v:"6",s:"MNO"},
  {v:"7",s:"PQRS"},{v:"8",s:"TUV"},{v:"9",s:"WXYZ"},
  {v:"del",s:""},{v:"0",s:""},{v:"enter",s:""},
];

// ── Tool Checkout Tab ──
function ToolsTab({ truck, checkouts, setCheckouts }) {
  const [openCats, setOpenCats] = useState({ "Hand Tools": true });
  const [pending, setPending]   = useState({}); // toolId -> qty to check out

  const toggleCat = c => setOpenCats(o => ({ ...o, [c]: !o[c] }));

  // How many of a tool are checked out across ALL trucks
  const totalOut = (toolId) =>
    Object.values(checkouts).flat().filter(c => c.toolId === toolId).reduce((s, c) => s + c.qty, 0);

  // This truck's checkouts
  const myCheckouts = checkouts[truck.id] || [];

  const available = (toolId, total) => total - totalOut(toolId);

  const checkout = (toolId, toolName, qty) => {
    if (qty < 1) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCheckouts(prev => ({
      ...prev,
      [truck.id]: [...(prev[truck.id] || []), { toolId, toolName, qty, time, id: Date.now() }],
    }));
    setPending(p => ({ ...p, [toolId]: 1 }));
  };

  const returnTool = (checkoutId) => {
    setCheckouts(prev => ({
      ...prev,
      [truck.id]: (prev[truck.id] || []).filter(c => c.id !== checkoutId),
    }));
  };

  return (
    <div>
      {/* My checked-out tools */}
      {myCheckouts.length > 0 && (
        <>
          <div className="section-hd">Checked Out</div>
          {myCheckouts.map(co => (
            <div key={co.id} className="checked-out-row">
              <Ic n="check" style={{width:14,height:14,color:"var(--lime)",flexShrink:0}} />
              <div style={{flex:1}}>
                <div className="tool-name">{co.toolName}</div>
                <div style={{fontSize:11,color:"var(--stone)",marginTop:2}}>Since {co.time}</div>
              </div>
              <span className="co-qty-badge">×{co.qty}</span>
              <button className="return-btn" onClick={() => returnTool(co.id)}>Return</button>
            </div>
          ))}
          <div style={{height:12}} />
        </>
      )}

      {/* Browse & check out */}
      <div className="section-hd">Tool Inventory</div>
      {TOOL_INVENTORY.map(cat => {
        const avail = cat.tools.reduce((s, t) => s + available(t.id, t.total), 0);
        const isOpen = openCats[cat.category];
        return (
          <div key={cat.category}>
            <div className="tool-cat-header" onClick={() => toggleCat(cat.category)}>
              <Ic n="box" style={{width:16,height:16,color:"var(--leaf)",flexShrink:0}} />
              <span className="tool-cat-label">{cat.category}</span>
              <span className="tool-cat-count">{avail} avail</span>
              <Ic n="chev" className={`chevron ${isOpen ? "open" : ""}`} style={{marginLeft:4}} />
            </div>
            {isOpen && cat.tools.map(tool => {
              const avl = available(tool.id, tool.total);
              const qty = pending[tool.id] ?? 0;
              return (
                <div key={tool.id} className="tool-row">
                  <div className="tool-info">
                    <div className="tool-name">{tool.name}</div>
                    <div className={`tool-avail ${avl === 0 ? "none" : avl <= 2 ? "low" : "ok"}`}>
                      {avl === 0 ? "None available" : `${avl} of ${tool.total} available`}
                    </div>
                  </div>
                  {avl > 0 && (
                    <div className="qty-row">
                      <button className="qty-btn" disabled={qty <= 0} onClick={() => setPending(p => ({...p, [tool.id]: Math.max(0, (p[tool.id]??0)-1)}))}> − </button>
                      <span className="qty-num">{qty}</span>
                      <button className="qty-btn" disabled={qty >= avl} onClick={() => setPending(p => ({...p, [tool.id]: Math.min(avl, (p[tool.id]??0)+1)}))}> + </button>
                      <button className="checkout-btn" disabled={qty < 1} onClick={() => checkout(tool.id, tool.name, qty)}>
                        Check Out
                      </button>
                    </div>
                  )}
                  {avl === 0 && (
                    <span style={{fontSize:11,color:"var(--danger)",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>ALL OUT</span>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ── Manager Tools Overview ──
function MgrToolsTab({ checkouts }) {
  // Build a flat list of all tools with checkout info
  const allTools = TOOL_INVENTORY.flatMap(c => c.tools.map(t => ({ ...t, category: c.category })));

  const totalOut = (toolId) =>
    Object.values(checkouts).flat().filter(c => c.toolId === toolId).reduce((s, c) => s + c.qty, 0);

  const trucksWithTool = (toolId) => {
    const result = [];
    Object.entries(checkouts).forEach(([truckId, cos]) => {
      const qty = cos.filter(c => c.toolId === toolId).reduce((s, c) => s + c.qty, 0);
      if (qty > 0) result.push({ truckId, qty });
    });
    return result;
  };

  const toolsOut = allTools.filter(t => totalOut(t.id) > 0);

  return (
    <div>
      {/* Summary stats */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:18}}>
        {[
          { label: "Total Tools", val: allTools.reduce((s,t)=>s+t.total,0), color: "var(--stone)" },
          { label: "Checked Out", val: Object.values(checkouts).flat().reduce((s,c)=>s+c.qty,0), color: "var(--warn)" },
          { label: "Available",   val: allTools.reduce((s,t)=>s+(t.total-totalOut(t.id)),0), color: "var(--lime)" },
        ].map(stat => (
          <div key={stat.label} style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:10,padding:"12px 10px",textAlign:"center"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:stat.color,lineHeight:1}}>{stat.val}</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:10,color:"var(--stone)",letterSpacing:1,textTransform:"uppercase",marginTop:3}}>{stat.label}</div>
          </div>
        ))}
      </div>

      {toolsOut.length > 0 && (
        <>
          <div className="section-hd" style={{color:"var(--warn)"}}>Currently Out</div>
          {toolsOut.map(tool => {
            const out = totalOut(tool.id);
            const trucks = trucksWithTool(tool.id);
            return (
              <div key={tool.id} className="mgr-tool-row">
                <div className="mgr-tool-top">
                  <span className="mgr-tool-name">{tool.name}</span>
                  <div className="mgr-tool-nums">
                    <span className="num-chip nc-total">{tool.total} total</span>
                    <span className="num-chip nc-out">{out} out</span>
                    <span className="num-chip nc-avail">{tool.total - out} left</span>
                  </div>
                </div>
                <div className="mgr-tool-trucks">
                  {trucks.map(t => (
                    <span key={t.truckId} className="truck-tag">Truck {t.truckId} ×{t.qty}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}

      <div className="section-hd" style={{marginTop:16}}>Full Inventory</div>
      {TOOL_INVENTORY.map(cat => (
        <div key={cat.category} style={{marginBottom:14}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,color:"var(--stone)",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>{cat.category}</div>
          {cat.tools.map(tool => {
            const out = totalOut(tool.id);
            const avl = tool.total - out;
            return (
              <div key={tool.id} className="mgr-tool-row" style={{marginBottom:6}}>
                <div className="mgr-tool-top">
                  <span className="mgr-tool-name">{tool.name}</span>
                  <div className="mgr-tool-nums">
                    <span className="num-chip nc-total">{tool.total}</span>
                    {out > 0 && <span className="num-chip nc-out">{out} out</span>}
                    <span className={`num-chip ${avl === 0 ? "nc-out" : "nc-avail"}`}>{avl} avail</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ════════════════════
//  LOGIN
// ════════════════════
function LoginScreen({ onTruckLogin, onMgrLogin }) {
  const [mode, setMode]     = useState("truck");
  const [selected, setSel]  = useState(null);
  const [pin, setPin]       = useState("");
  const [mgrPass, setMgr]   = useState("");
  const [error, setError]   = useState("");

  const handleKey = v => {
    setError("");
    if (v === "del")   { setPin(p => p.slice(0,-1)); return; }
    if (v === "enter") { tryLogin(); return; }
    if (pin.length < 4) setPin(p => p + v);
  };
  const tryLogin = () => {
    if (!selected) { setError("Select a truck first."); return; }
    if (selected.pin !== pin) { setError("Wrong PIN — try again."); setPin(""); return; }
    onTruckLogin(selected);
  };
  const tryMgr = () => {
    if (mgrPass === MGR_PASS) onMgrLogin();
    else { setError("Incorrect manager password."); setMgr(""); }
  };

  return (
    <div className="splash">
      <div className="logo-mark" style={{background:"transparent",border:"none",boxShadow:"none"}}><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyMDAwIDIwMDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyIgZmlsbD0iIzRhNmQyMCI+PHBhdGggZD0iTTE3OTguOCw3NzIuOTYzQzE3OTguOCw3NzIuOTE0IDE3OTguOCw3NzIuODY1IDE3OTguOCw3NzIuODE2TDE3OTguOCw3NzIuOTYxTDE3OTguOCw3NzIuOTYzWk0xNzk4LjgsNzcyLjk2M0MxNzk2LjUsODE2Ljc3NiAxNzkzLjQ1LDg1OC40NzMgMTc5MC45OCw4OTUuMDA1QzE3ODguOTQsOTI1LjIwMSAxNzg2LjQ1LDk1Ni4xMjYgMTc4My4wOSw5ODcuMTg2TDE3ODQuNTQsOTcxLjE1OEMxNzg0LjU0LDk3MS4xNTggMTYzOC4xOSw5MzAuOTE0IDE1NjIuNTIsOTI5LjIyNUMxNTYyLjUyLDkyOS4yMjUgMTM3Mi43Myw5MTEuODExIDEzMDguNTIsOTI1LjAzMkMxMzA4LjUyLDkyNS4wMzIgMTE2Ni40Niw5MzMuMDg2IDExMjEuMTksOTQ3LjQ4OEMxMTIxLjE5LDk0Ny40ODggMTEyNy42OSw5MzYuMDE3IDExOTUuNyw5MjAuOTYzQzExOTUuNyw5MjAuOTYzIDEyMTcuMDMsODkyLjIzMyAxMjMxLjAzLDkwMy45MDZDMTIzMS4wMyw5MDMuOTA2IDEyMzcuOTUsODg5LjU3NiAxMjQ5LjExLDg5Ni4zNTRDMTI0OS4xMSw4OTYuMzU0IDEyNTUuNzUsODcyLjI2MyAxMjg4LjQzLDg4Ny4zMTlDMTI4OC40Myw4ODcuMzE5IDEzMDQuNzEsODc0LjE0NCAxMzEzLjEyLDg3NC40OTVDMTMxMy4xMiw4NzQuNDk1IDEzMjYuNTMsODc1LjA2NCAxMzMzLjY3LDg3NC4yMzNDMTMzMy42Nyw4NzQuMjMzIDEzNTcuMTEsODUwLjI4MSAxMzk0LjIyLDg1Ny42MDhDMTM5NC4yMiw4NTcuNjA4IDE0NTIuODIsODU3LjczNCAxNDM4LjIxLDg3NS41NDJDMTQzOC4yMSw4NzUuNTQyIDE1MjIuODIsODExLjkwNiAxNDU1Ljc5LDcxNi41NzFDMTQ1NS43OSw3MTYuNTcxIDE0MDEuNjcsNjc4LjUxMyAxMzkzLjA3LDY4Ni42NDNDMTM5My4wNyw2ODYuNjQzIDE0MDYuNiw3MDAuMzIzIDEzODMuNTEsNzAxLjU1NUMxMzgzLjUxLDcwMS41NTUgMTM3OC43MSw3MDIuMTA0IDEzNzguNzYsNzA0LjI2OEMxMzc4Ljc2LDcwNC4yNjggMTM3MC45LDcwNi42NSAxMzY1Ljc3LDcwNy4yMTNDMTM2NS43Nyw3MDcuMjEzIDEzNjAuNTUsNzA2LjcwOCAxMzUxLjg4LDcxMi4zMTVDMTM1MS44OCw3MTIuMzE1IDEzNDUuMTcsNzExLjM1NSAxMzM4LjYsNzA4LjE2OEMxMzM4LjYsNzA4LjE2OCAxMzMzLjAyLDcxMS4zNTggMTMxOS44OCw3MDAuODQ1QzEzMTkuODgsNzAwLjg0NSAxMzA5LjUzLDcwMy4xMjMgMTMwNC4zNiw2OTIuNDAxQzEzMDQuMzYsNjkyLjQwMSAxMzA1Ljk4LDY4Ny4xNDUgMTMwOS4wNSw2ODcuOTM3QzEzMDkuMDUsNjg3LjkzNyAxMzA1LjEyLDY4My45MiAxMjk5Ljk2LDY5MS4wOTZDMTI5OS45Niw2OTEuMDk2IDEyOTUuNiw2OTIuNTIxIDEyOTMuODksNjkxLjM2OEMxMjkzLjg5LDY5MS4zNjggMTI5MC40Miw2OTAuMzQ2IDEyNzguMzgsNjk4LjA2QzEyNzguMzgsNjk4LjA2IDEyNjcuMzMsNzA3LjEyNSAxMjYwLjE2LDcwMi4xN0MxMjYwLjE2LDcwMi4xNyAxMjQzLjQ3LDY5NC45NDIgMTIzNi40MSw2ODcuNDA4QzEyMzYuNDEsNjg3LjQwOCAxMjM0LjUxLDY4My4wOTUgMTIyOC4xMiw2ODguMDQ5QzEyMjguMTIsNjg4LjA0OSAxMjE2LjYzLDY5Mi4xNzEgMTIwOS40Niw2ODUuMDE1QzEyMDkuNDYsNjg1LjAxNSAxMjAzLjU5LDY3OS42NTYgMTE5Ny4xMyw2NzUuOTQ3QzExOTcuMTMsNjc1Ljk0NyAxMTkwLjg1LDY2Ni4wMDUgMTIwMy45LDY1Ni40MDRDMTIwMy45LDY1Ni40MDQgMTIxNi45NCw2NDcuNTYyIDEyMTkuODksNjQ3LjQ0NUMxMjE5Ljg5LDY0Ny40NDUgMTIyMy40NCw2MzkuMTc3IDEyMDguNiw2NDcuMzYzQzEyMDguNiw2NDcuMzYzIDEyMDIuMTYsNjQ1LjYyNSAxMTk3LjU2LDY0MC44NjdDMTE5Ny41Niw2NDAuODY3IDExOTEuOTgsNjM1LjY0OSAxMTg0LjI3LDYzNi4yNUMxMTg0LjI3LDYzNi4yNSAxMTczLDYyOS45IDExNzIuMDQsNjIxLjQ0NkMxMTcyLjA0LDYyMS40NDYgMTE4MC41Nyw2MDguOTU3IDExODguNzgsNjA0LjM0NUMxMTg4Ljc4LDYwNC4zNDUgMTE4Ni40Miw1ODYuNjkgMTIxMS4zMyw1ODQuODQ1QzEyMTEuMzMsNTg0Ljg0NSAxMjM2LjYyLDU4MS4zMzYgMTI0MC40NCw1ODIuODg0QzEyNDAuNDQsNTgyLjg4NCAxMjM1LjIyLDU3NC4xMTkgMTIxMS4yMyw1NzYuMTUzQzEyMTEuMjMsNTc2LjE1MyAxMTg5LjQzLDU3My4zMjkgMTIyMy43Nyw1NDYuNzM3QzEyMjMuNzcsNTQ2LjczNyAxMjM4LjI1LDUzOS42MzQgMTI0Ny4zNiw1MzIuMTIzQzEyNDcuMzYsNTMyLjEyMyAxMjQ3Ljg5LDUyNy40OTUgMTI3OC4zNiw1MjguMDczQzEyNzguMzYsNTI4LjA3MyAxMjg4LjM0LDUyOC4wMDIgMTI5NC42MSw1MTguMzg5QzEyOTQuNjEsNTE4LjM4OSAxMjk5LjEyLDUxNC4zMjIgMTMwNS4xNyw1MTcuMTIxQzEzMDUuMTcsNTE3LjEyMSAxMzI1LjA2LDUxOC4yMDYgMTMwMy4wNyw1MTIuNzVDMTMwMy4wNyw1MTIuNzUgMTI5NC42Myw1MTAuMTI4IDEyNzguNjYsNTIxLjczMUMxMjc4LjY2LDUyMS43MzEgMTI2OSw1MjEuODg0IDEyNjQuNzEsNTE5Ljg0M0MxMjY0LjcxLDUxOS44NDMgMTI1Ny41OCw1MTcuODMzIDEyNDAsNTIxLjY2NkMxMjQwLDUyMS42NjYgMTIyMC42Myw1MDguODQzIDEyNDMuMjEsNDk4LjEwNEMxMjQzLjIxLDQ5OC4xMDQgMTI0OC4zMiw0OTYuOTIxIDEyNDkuNzEsNDg4LjIwNEMxMjQ5LjcxLDQ4OC4yMDQgMTI1Mi40Miw0NzUuMDYxIDEyNzEuNDMsNDc1LjAxOUMxMjcxLjQzLDQ3NS4wMTkgMTI3Ni4zMiw0NzcuOTMgMTI4NC41OSw0NjguODk4QzEyODQuNTksNDY4Ljg5OCAxMjkwLjQ4LDQ2Mi4xNiAxMzA0LjI3LDQ2My43NjlDMTMwNC4yNyw0NjMuNzY5IDEzMTUuNTcsNDY0Ljc5MiAxMzIyLjk4LDQ2My4zMzdDMTMyMi45OCw0NjMuMzM3IDEzMTcuMTEsNDU2LjY3NyAxMzA3LjM0LDQ1OC4yMzlDMTMwNy4zNCw0NTguMjM5IDEyODYuMzIsNDU4LjU3NiAxMzA5LjIxLDQ0MS43MDRDMTMwOS4yMSw0NDEuNzA0IDEzMTguMzUsNDQwLjMzOSAxMzE3LjQyLDQzNC4zMUMxMzE3LjQyLDQzNC4zMSAxMzE2LjE1LDQyOS41NzcgMTMyNy41Miw0MjMuOTJDMTMyNy41Miw0MjMuOTIgMTMzNi43Myw0MTQuNDY0IDEzNTYuOTEsNDIxLjY5N0MxMzU2LjkxLDQyMS42OTcgMTM1OC43OSw0MjUuNjk5IDEzNzAuNTQsNDE5LjQ2MkMxMzcwLjU0LDQxOS40NjIgMTM3NC41LDQxOS42MTkgMTM4My42MSw0MjMuMTU4QzEzODMuNjEsNDIzLjE1OCAxMzk0Ljc1LDQyMC44ODQgMTQwMC4yOCw0MjYuNjRDMTQwMC4yOCw0MjYuNjQgMTQxMi43LDQyNi4wODQgMTQxOC4zNSw0MjMuODQxQzE0MTguMzUsNDIzLjg0MSAxMzY3Ljg2LDQxNS40NjggMTQyMi42OSw0MDQuNDcxQzE0MjIuNjksNDA0LjQ3MSAxNDI1LDQwMC42MzggMTQwNy4xOSw0MDEuODA2QzE0MDcuMTksNDAxLjgwNiAxMzc3LjA1LDQwMi42MTIgMTQwNy4yLDM3Ny4xODRDMTQwNy4yLDM3Ny4xODQgMTQxNi4xNCwzNjIuNTY4IDE0NDMuOCwzNjQuMDk5QzE0NDMuOCwzNjQuMDk5IDE0NjguNzUsMzY0LjgxOCAxNDg1LjgyLDM2My43ODFDMTQ4NS44MiwzNjMuNzgxIDE0NDkuMDksMzU1LjU3NSAxNTAxLjksMzM4LjQ2N0MxNTAxLjksMzM4LjQ2NyAxNTE1LjAyLDMyNi43NDggMTUzNS40MiwzMzcuOTE2QzE1MzUuNDIsMzM3LjkxNiAxNTQ3LjAyLDM1MC4wMTkgMTU2MS41MSwzMzkuNTQyQzE1NjEuNTEsMzM5LjU0MiAxNTgyLjczLDMzMy4yOCAxNTk2LjM1LDM0NC44NTFDMTU5Ni4zNSwzNDQuODUxIDE2MDcuNTYsMzU1LjE3NiAxNTk4LjI3LDM1Ni4xMzFDMTU5OC4yNywzNTYuMTMxIDE1OTAuOTEsMzU4LjQ5NyAxNTg5LjUsMzYxLjkxN0MxNTg5LjUsMzYxLjkxNyAxNjE5LjM3LDM1Mi44MzkgMTYyOS44NywzNjIuNjE1QzE2MjkuODcsMzYyLjYxNSAxNjM2LjM2LDM3MC45OTkgMTY0MS44MSwzNzIuMzIxQzE2NDEuODEsMzcyLjMyMSAxNjY1LjkyLDM5MC40MTMgMTY1MC44OCwzOTkuMjg2QzE2NTAuODgsMzk5LjI4NiAxNjMwLjM2LDQwMi41MTkgMTYxOC40Nyw0MDguMDVDMTYxOC40Nyw0MDguMDUgMTYyNC4xNCw0MTEuMDE1IDE2NDIuMjMsNDA1LjIxMkMxNjQyLjIzLDQwNS4yMTIgMTY1Mi40Miw0MDYuMTQ4IDE2NDAuMDYsNDE1LjkyOEMxNjQwLjA2LDQxNS45MjggMTYzNS4zNCw0MTYuNTkxIDE2NDYuMzMsNDE3LjI0NkMxNjQ2LjMzLDQxNy4yNDYgMTY2OC4wNyw0MjAuNTgyIDE2NzYuODcsNDExLjk4OEMxNjc2Ljg3LDQxMS45ODggMTY4NS43LDQwMy45NjcgMTcwMi41MSw0MTQuNjY0QzE3MDIuNTEsNDE0LjY2NCAxNzI4LjA5LDQyMy45OTIgMTcyOS44MSw0MjkuMDE4QzE3MjkuODEsNDI5LjAxOCAxNzM0LjU0LDQzMy44NjIgMTczNC40NCw0MzYuMzA3QzE3MzQuNDQsNDM2LjMwNyAxNzMyLjk5LDQ0Mi4wNzkgMTc0MS4wMSw0NDguNDI3QzE3NDEuMDEsNDQ4LjQyNyAxNzU1LjkzLDQ2NS42ODIgMTczMy4yNyw0NzQuNzY3QzE3MzMuMjcsNDc0Ljc2NyAxNzI4LjQyLDQ3Ny4xNDQgMTczNy44MSw0NzkuOTA0QzE3MzcuODEsNDc5LjkwNCAxNzMzLjE3LDQ4Ny42ODIgMTcxNy4xMyw0OTAuOTg5QzE3MTcuMTMsNDkwLjk4OSAxNzIyLjc4LDQ5Ny4zOCAxNzMyLjIyLDQ5MC45MjhDMTczMi4yMiw0OTAuOTI4IDE3NDAuMjQsNDgzLjI1OCAxNzYzLjYxLDQ5Mi40ODZDMTc2My42MSw0OTIuNDg2IDE3ODEuODIsNDk0LjYxNCAxNzkwLjU0LDUwOC4xODlDMTc5MC41NCw1MDguMTg5IDE3OTUuNjIsNTIxLjcyMiAxNzg4LjQsNTI2LjQyNkMxNzg4LjQsNTI2LjQyNiAxNzkzLjY5LDUyOC45MDQgMTc5NS41Nyw1MzAuNzI0QzE3OTYuNjcsNTM5Ljg4NiAxNzk3LjYxLDU0OS4yMTcgMTc5OC40MSw1NTguNjg0QzE3OTguMzUsNTU4LjA2MSAxNzk4LjI5LDU1Ny43MjQgMTc5OC4yNiw1NTcuNzYxQzE3OTguMjYsNTU3Ljc2MSAxNzk2LjY1LDU1OS4xMiAxNzk2LjY3LDU2My4wMDVDMTc5Ni42Nyw1NjMuMDA1IDE3OTIuOTgsNTcxLjk5MSAxNzgyLjE2LDU3MS42MDJDMTc4Mi4xNiw1NzEuNjAyIDE3NzUuMTQsNTcxLjM3NCAxNzg3LjA0LDU3Ni4zMzhDMTc4Ny4wNCw1NzYuMzM4IDE3OTkuMDYsNTgzLjMwNSAxODAwLjIzLDU4NC40OTNMMTc5OS43LDY1Mi45M0MxNzk5LjcsNjUyLjkzNCAxNzk5LjY5LDY1Mi45MzggMTc5OS42OSw2NTIuOTQyTDE3OTkuNzYsNjUyLjkzN0wxNzk5LjcxLDY1Ny43NzRMMTc5OS42Niw2NTcuNzcyTDE3OTkuNSw2NzguODVDMTc5NC40OCw2ODMuNjUxIDE3ODMuMTQsNjkyLjE1IDE3NzIuMTksNjgzLjk4M0MxNzcyLjE5LDY4My45ODMgMTc2OS4xNCw2ODMuMTI3IDE3NjcuNzUsNjg1LjMyQzE3NjcuNzUsNjg1LjMyIDE3NTIuNTIsNjkzLjY0NCAxNzQwLjAxLDY5Mi44ODZDMTc0MC4wMSw2OTIuODg2IDE3MzQuNDcsNjkxLjgzMSAxNzI2Ljk2LDY5OC4wMjdDMTcyNi45Niw2OTguMDI3IDE3MTguNDcsNzAwLjk1NyAxNzExLjE1LDY5NC44NzhDMTcxMS4xNSw2OTQuODc4IDE3MDEuMTEsNjkwLjE3MSAxNjk0LjMzLDY4OS40MjRDMTY5NC4zMyw2ODkuNDI0IDE3MDMuMDksNjk3LjA5NyAxNzAxLjcxLDcwMC45MTdDMTcwMS43MSw3MDAuOTE3IDE2OTEuNjIsNzI0LjM4OCAxNjYxLjEsNzAzLjA0NUMxNjYxLjEsNzAzLjA0NSAxNjU4Ljk5LDcwMC4wNjIgMTY0Ny4yOCw3MDYuMDI1QzE2NDcuMjgsNzA2LjAyNSAxNjM2LjEzLDcxMi44OTEgMTYxOC44Niw2OTYuOTExQzE2MTguODYsNjk2LjkxMSAxNjExLjM3LDY4OS4xMTUgMTYyNi43Miw2ODkuNTMyQzE2MjYuNzIsNjg5LjUzMiAxNjM3LjMyLDY4Mi43MzggMTYxNy40Niw2ODcuMTU1QzE2MTcuNDYsNjg3LjE1NSAxNTcyLjMxLDcwMi40MjYgMTU2MC43MSw3MjIuNzE5QzE1NjAuNzEsNzIyLjcxOSAxNTA2LjM5LDc3NC4xMDQgMTU2MC44LDg2Ni45NjVDMTU2MC44LDg2Ni45NjUgMTU5MC44LDg5OS40NjggMTU2OS4xOSw4NjUuOTVDMTU2OS4xOSw4NjUuOTUgMTU4NS4xOCw4NDUuNDcgMTYwNy40NSw4NTUuMjY2QzE2MDcuNDUsODU1LjI2NiAxNjA1LjkyLDg2Ny4yMTYgMTYyNy4yLDg0MS42NDVDMTYyNy4yLDg0MS42NDUgMTYyNi4xOCw4MzkuODY3IDE2MjkuOTgsODM4LjA1MkMxNjI5Ljk4LDgzOC4wNTIgMTYzNS43LDgzNC42OTUgMTYzOC4yNSw4MzEuODE3QzE2MzguMjUsODMxLjgxNyAxNjM3LjM1LDgyNy4yMzUgMTY0OS4xNSw4MjguOTE2QzE2NDkuMTUsODI4LjkxNiAxNjU2LjY3LDgyNy43ODkgMTY2MS44Myw4MjIuODc4QzE2NjEuODMsODIyLjg3OCAxNjg3LjQ5LDgwOC4yODYgMTY5OC43Niw4MzQuMzg0QzE2OTguNzYsODM0LjM4NCAxNzAxLjQ0LDg0NC4zNTQgMTcwOC40Myw4MjguNDY2QzE3MDguNDMsODI4LjQ2NiAxNzE0LjM1LDgxMy4wNzMgMTcyMC40Nyw4MTEuNDkyQzE3MjAuNDcsODExLjQ5MiAxNzI4Ljg4LDgwOS44MDIgMTcyNi40Nyw4MDMuMjcyQzE3MjYuNDcsODAzLjI3MiAxNzI5LjMxLDc5MC4wMzEgMTc1Mi4wNiw3ODkuNTQ2QzE3NTIuMDYsNzg5LjU0NiAxNzU4LjI2LDc5Mi4yOTcgMTc2OC4xOCw3ODMuMDk5QzE3NjguMTgsNzgzLjA5OSAxNzcxLjksNzc5LjgwNCAxNzc5LjAzLDc3OC4yODNDMTc3OS4wMyw3NzguMjgzIDE3ODYuODksNzY3LjcwNiAxNzk4LjgsNzcyLjk2M1pNMTc5OC44LDc3Mi44MTZMMTgwMC45MSw2NzguOTI0QzE4MDIuMjgsNjc3LjYxMyAxODAxLjc3LDY3Ni41MDQgMTgwMi4wNiw2NzYuMTU5QzE4MDEuNyw3MDguNzEzIDE4MDAuNDUsNzQxLjMxIDE3OTguOCw3NzIuODE2Wk0xNTE5LjMyLDU5Ni4wMTVDMTUxOS4zMiw1OTYuMDE1IDE1MjMuMDIsNjEyLjQyNCAxNTI3LjEsNjE3LjAzQzE1MjcuMSw2MTcuMDMgMTUyOS44Niw2MTIuNDk3IDE1MjYuMDIsNjA1LjQxMkMxNTI2LjAyLDYwNS40MTIgMTUyMC41Miw1OTYuNjY2IDE1MTkuMzIsNTk2LjAxNVpNMTYwNS42NSw2MjguOTk0QzE2MDkuNjcsNjI1LjY2MyAxNTkwLjkzLDYyOC45MzIgMTU5MC45Myw2MjguOTMyQzE1ODIuMzIsNjI5LjIxNyAxNTc0Ljg4LDYzNy4zODYgMTU3NC44OCw2MzcuMzg2QzE1NTYuOTUsNjUyLjcwMiAxNTY5Ljc2LDY1MC43OTYgMTU2OS43Niw2NTAuNzk2QzE1OTMuODIsNjQ3LjkwOCAxNjA1LjY1LDYyOC45OTQgMTYwNS42NSw2MjguOTk0Wk0xNjcyLjA3LDY2Ni42MzFDMTY3Mi4wNyw2NjYuNjMxIDE2NjIuMjUsNjY2Ljg3MyAxNjYzLjczLDY2OS42NzdDMTY2My43Myw2NjkuNjc3IDE2NjYuMDgsNjcxLjU5OSAxNjczLjIyLDY3MC41MTVDMTY3My4yMiw2NzAuNTE1IDE2ODEuNTksNjY5LjExNCAxNjgzLjk0LDY2Ny40OEMxNjgzLjk0LDY2Ny40OCAxNjgxLjY5LDY2Ni4yODYgMTY3Mi4wNyw2NjYuNjMxWk0xNjQ5LjEzLDY3NS43NTRDMTYzOC4zMiw2NzYuMjk0IDE2NDAuOTYsNjc5LjA3MyAxNjQwLjk2LDY3OS4wNzNDMTY0My4yLDY4MC45OSAxNjUyLjE2LDY4MC4xMDEgMTY1Mi4xNiw2ODAuMTAxQzE2NjYuNTIsNjc2LjU0NSAxNjQ5LjEzLDY3NS43NTQgMTY0OS4xMyw2NzUuNzU0Wk0xMzUzLjc5LDY2NS45ODNDMTM1OS42NCw2NjcuOTExIDEzODIuNDcsNjc2LjEyNyAxNDAwLjM0LDY3NS4yNDNDMTQwMC4zNCw2NzUuMjQzIDEzOTQuNzYsNjY1LjA4MSAxMzgzLjg2LDY2MS43MjdDMTM4My44Niw2NjEuNzI3IDEzNzIuNjIsNjU2LjkxIDEzNjYuMjksNjYxLjcyM0MxMzY1LjU3LDY2Mi4yNjMgMTM1OS45NSw2NjMuOTg1IDEzNTcuNyw2NjMuOTIxQzEzNTIuODYsNjYzLjc4MyAxMzUwLjkxLDY2NS4wMzIgMTM1My43OSw2NjUuOTgzWk0xNjc0LjU2LDY3Ni4yMzdDMTY2Ni4yMiw2NzYuODMzIDE2NzQuMzEsNjc3LjY4NiAxNjc0LjMxLDY3Ny42ODZDMTY4MS42NCw2NzYuMzE4IDE2NzQuNTYsNjc2LjIzNyAxNjc0LjU2LDY3Ni4yMzdaTTE0NjQuNzcsNjE5Ljk4NEMxNDY3LjE0LDYxNi44MTYgMTQ1OC44OSw2MTkuNjk4IDE0NTguODksNjE5LjY5OEMxNDQ3LjYzLDYyMS40NDMgMTQ1MC44LDYzOC40NTYgMTQ1MC44LDYzOC40NTZDMTQ0OC4yOSw2NDYuMzUgMTQ2My43NSw2NzIuMTQyIDE0NjMuNzUsNjcyLjE0MkMxNDg2LjE3LDcxNC40MzcgMTQ5NS44Myw3MTcuNDI0IDE0OTQuOSw3MTYuMjk0QzE1MDIuMzUsNzA5Ljg4NSAxNTA5LDY1NC4yNDYgMTUxMC40MSw2NTQuMTcyQzE1MDYuODUsNjI0LjQ2OSAxNTAxLjgsNjM2LjI3NiAxNTAxLjgsNjM2LjI3NkMxNTAxLjM2LDY0Ni43MzUgMTQ5MS44LDY0NS4yMzkgMTQ5MS44LDY0NS4yMzlDMTQ4NS4xNiw2NDQuODQ0IDE0NzkuMDcsNjM3LjQ0OCAxNDc5LjA3LDYzNy40NDhDMTQ3NS44NCw2MzYuOTggMTQ2OS43MSw2MzMuODc4IDE0NjkuNzEsNjMzLjg3OEMxNDQ4LjQ2LDYyNi45MzYgMTQ2NC43Nyw2MTkuOTg0IDE0NjQuNzcsNjE5Ljk4NFpNMTQxNi4xNiw2MjMuOTc3QzE0MTYuMTYsNjIzLjk3NyAxNDA0LjY3LDYxOS41ODcgMTQxNi45Niw2MjguMTMzQzE0MTYuOTYsNjI4LjEzMyAxNDI0LjU1LDYzMy4zNjIgMTQyNy42Miw2MzQuMDg0QzE0MjcuNjIsNjM0LjA4NCAxNDI5LjU4LDYzMy4xMjkgMTQzMy40NSw2MzguOTkxQzE0MzMuNDUsNjM4Ljk5MSAxNDM3Ljc4LDY0OC42MzUgMTQ0MC4xOSw2MzcuOTg3QzE0NDAuMTksNjM3Ljk4NyAxNDQxLjgxLDYyOS41OTYgMTQ0MS40MSw2MjQuMjA3QzE0NDEuNDEsNjI0LjIwNyAxNDQwLjkxLDYxOS4wMTggMTQzNC41Miw2MTkuNDk4QzE0MzQuNTIsNjE5LjQ5OCAxNDI0LjkxLDYxOS4xMDYgMTQyNi45Myw2MjQuMjYxQzE0MjYuOTMsNjI0LjI2MSAxNDI4LjczLDYzMS4wNzYgMTQyNy44Myw2MzEuMzkzQzE0MjcuODMsNjMxLjM5MyAxNDIwLjkxLDYyNS4yNzEgMTQxNi4xNiw2MjMuOTc3Wk0xNjYwLjI3LDY0Ny45NThDMTY1OC4wOSw2NDYuMjM0IDE2NTAuMzYsNjU0LjA3NSAxNjUwLjM2LDY1NC4wNzVDMTY0NC45OCw2NTcuOTI1IDE2MzEuODIsNjU4Ljk0OCAxNjMxLjgyLDY1OC45NDhDMTYyOC45NSw2NTguOTk5IDE2MTUuNzQsNjYyLjAxNCAxNjE1Ljc0LDY2Mi4wMTRDMTYwNC4xOSw2NjkuNDkxIDE2MDMuMzEsNjc5LjUxOSAxNjAzLjMxLDY3OS41MTlDMTYxNC43LDY3OS4yMzcgMTY0NC43OCw2NjMuMTIxIDE2NDQuNzgsNjYzLjEyMUMxNjUzLjY2LDY1Ny42MzYgMTY2MC4yNyw2NDcuOTU4IDE2NjAuMjcsNjQ3Ljk1OFpNMTU3NS44Myw2MTUuNjI0QzE1NzUuNTMsNjE0LjQwMiAxNTcyLjE3LDYxOS44MjYgMTU3Mi4xNyw2MTkuODI2QzE1NjQuOTgsNjMwLjUzNCAxNTY4LjE2LDYzMS4wNjYgMTU2OC4xNiw2MzEuMDY2QzE1NzIuMDksNjMwLjMxNCAxNTc1LjE1LDYyMi4wODUgMTU3NS4xNSw2MjIuMDg1QzE1NzUuNzIsNjE5LjM0NiAxNTc1LjgzLDYxNS42MjQgMTU3NS44Myw2MTUuNjI0Wk0xNjkwLjQ1LDY0OC4wMDhDMTY4OC44Miw2NDcuNjUyIDE2ODQsNjUxLjY5NiAxNjg0LDY1MS42OTZDMTY4MC43MSw2NTIuNjU5IDE2NzMuOTgsNjU1LjYwNCAxNjczLjk4LDY1NS42MDRDMTY2OS45NCw2NTYuMTk1IDE2NjAuODksNjYyLjY1NyAxNjYwLjg5LDY2Mi42NTdDMTY1My45NSw2NjguNjQyIDE2NjMuMTUsNjY1LjI3NiAxNjYzLjE1LDY2NS4yNzZDMTY2My4zNyw2NjEuODQgMTY3Mi41NCw2NjAuNDU1IDE2NzIuNTQsNjYwLjQ1NUMxNjc2LjA4LDY1OS41ODkgMTY4My42LDY1NC41MzkgMTY4My42LDY1NC41MzlDMTY4NS45NCw2NTMuMDU4IDE2OTAuNDUsNjQ4LjAwOCAxNjkwLjQ1LDY0OC4wMDhaTTEzNTEuNDUsNjUwLjk5NkMxMzUxLjQ1LDY1MC45OTYgMTM1OC43MSw2NTYuMTQ2IDEzNjQuOTksNjU2LjIwOEMxMzY0Ljk5LDY1Ni4yMDggMTM2Ny44Niw2NTYuMTc0IDEzNjEuOTgsNjUzLjA5MkMxMzYxLjk4LDY1My4wOTIgMTM0OS42Nyw2NDguNzQ4IDEzNTEuNDUsNjUwLjk5NlpNMTUzNS43NSw2NjAuNDAyQzE1NDIuODgsNjU2LjY0NSAxNTYxLjEsNjI5Ljg3OSAxNTYxLjEsNjI5Ljg3OUMxNTY1LjI0LDYxNC41NzQgMTU1OS42Nyw2MTcuOTggMTU1OS42Nyw2MTcuOThDMTU1MC41OSw2MTkuMDEgMTU0Ny42OSw2MTIuMDM0IDE1NDcuNjksNjEyLjAzNEMxNTQ2LjU2LDU5Ny40MzIgMTU0MS45OSw2MDYuNTM0IDE1NDEuOTksNjA2LjUzNEMxNTMzLjk5LDYyMy42NzcgMTUzNS43NSw2NjAuNDAyIDE1MzUuNzUsNjYwLjQwMlpNMTM5Mi41Myw2NDMuMDc3QzEzNzguMTIsNjMxLjUxOSAxMzkxLjA4LDY0Ni4yMzcgMTM5MS4wOCw2NDYuMjM3QzE0MDkuNSw2NjIuMjg0IDEzOTIuNTMsNjQzLjA3NyAxMzkyLjUzLDY0My4wNzdaTTE2OTQuNTEsNjU3Ljg0NUMxNjkyLjkyLDY1OC4wOTcgMTY4OC4yMyw2NTkuODIgMTY4OC4yMyw2NTkuODJDMTY3OS42OCw2NjMuMzQxIDE2ODYuNzIsNjYzLjQyMyAxNjg2LjcyLDY2My40MjNDMTY5MS41NSw2NjMuMDk2IDE3MDAuOTcsNjU4Ljk3NCAxNzAwLjk3LDY1OC45NzRDMTcwNi4xMyw2NTYuMzgyIDE2OTQuNTEsNjU3Ljg0NSAxNjk0LjUxLDY1Ny44NDVaTTEzNzcuOTIsNjQzLjM5OUMxMzc1LjcxLDY0Mi45NzMgMTM3My4wNyw2NDQuNDIyIDEzNzMuMDcsNjQ0LjQyMkMxMzY4LjY1LDY0Ni44MDUgMTM3Ny4zMiw2NDguOTYxIDEzNzcuMzIsNjQ4Ljk2MUMxMzg0LjUxLDY1MC43NDUgMTM4NC4yMyw2NDguNDI0IDEzODQuMjMsNjQ4LjQyNEMxMzgzLjcsNjQzLjI0IDEzNzcuOTIsNjQzLjM5OSAxMzc3LjkyLDY0My4zOTlaTTE0OTIuNTgsNTg2Ljg2M0MxNDkyLjU4LDU4Ni44NjMgMTUwOS4yMiw2MDUuMzcgMTUwMy4xLDYwNy45NzdDMTUwMy4xLDYwNy45NzcgMTUwMS4yLDYwOC42OTggMTQ5OS43Miw2MDguODU4QzE0OTkuNzIsNjA4Ljg1OCAxNDk4LjYxLDYxMS41OTIgMTUxMC4yMSw2MTcuMTAzQzE1MTAuMjEsNjE3LjEwMyAxNTEzLjU1LDYxNy40MTcgMTUwNy42NCw2MDQuODY5QzE1MDcuNjQsNjA0Ljg2OSAxNTAwLjUxLDU5MS4wODggMTQ5Mi41OCw1ODYuODYzWk0xNDA1LjI3LDY1Ny4wODRDMTQwMy44MSw2NTguOTExIDE0MjIuNSw2NzguNzMyIDE0MjIuNSw2NzguNzMyQzE0MjUuMzUsNjgyLjc2MiAxNDU5LjMsNzAxLjMyNSAxNDU5LjMsNzAxLjMyNUMxNDU4LjQsNjkwLjU4NSAxNDM4LjE5LDY2MC45OTEgMTQzOC4xOSw2NjAuOTkxQzE0MzYuMzIsNjU0Ljk1MiAxNDA1LjI3LDY1Ny4wODQgMTQwNS4yNyw2NTcuMDg0Wk0xMzk1LjE3LDYzNS42NDZDMTM5NC4xMSw2MzUuNTEyIDE0MDYuMSw2NDcuMDU4IDE0MDYuMSw2NDcuMDU4QzE0MTYuOTYsNjUzLjUwMyAxNDIzLjY1LDY0OC4yNTggMTQyMy42NSw2NDguMjU4QzE0MjMuNzMsNjM5LjMxOCAxMzk1LjE3LDYzNS42NDYgMTM5NS4xNyw2MzUuNjQ2Wk0xNTM1LjE2LDcyMS42NTRDMTUzNi4wMiw3MTcuODkgMTU2NSw2OTguMzA0IDE1NjUsNjk4LjMwNEMxNTcwLjkxLDY5NS4wMzIgMTU4NC41OSw2ODIuOTUxIDE1ODQuNTksNjgyLjk1MUMxNTkwLjgsNjc3LjA0MiAxNjAyLjMxLDY2MC42NTYgMTYwMi4zMSw2NjAuNjU2QzE1OTcuNiw2NjEuODM3IDE1OTEuMDcsNjYwLjgyNCAxNTkxLjA3LDY2MC44MjRDMTU4Ni45Miw2NTUuMDQyIDE1ODQuNSw2NTguMDgzIDE1ODQuNSw2NTguMDgzQzE1NjcuNDUsNjYwLjE4MyAxNTU2LjU4LDY2Ny42NTIgMTU1Ni41OCw2NjcuNjUyQzE1MzMuOTgsNjgzLjExMiAxNTM0Ljk4LDcxNy44NDggMTUzNS4xNiw3MjEuNjU0Wk0xNTM1LjE2LDcyMS42NTRDMTUzNS4xMyw3MjEuNzg4IDE1MzUuMTQsNzIxLjkwMiAxNTM1LjE4LDcyMS45OTRDMTUzNS4xOCw3MjEuOTk0IDE1MzUuMTgsNzIxLjg3NyAxNTM1LjE2LDcyMS42NTRaTTE2MjYuODIsNjUyLjI3OUMxNjI2LjgyLDY1Mi4yNzkgMTYzNS42MSw2NTEuNTY5IDE2MzguMDgsNjUwLjYxNUMxNjM4LjA4LDY1MC42MTUgMTY0MC4wOCw2NTAuMTM0IDE2MzkuNTMsNjQ3Ljc5OUMxNjM5LjUzLDY0Ny43OTkgMTYzOS4yNCw2NDUuMjggMTYzMy43NCw2NDguNDdDMTYzMy43NCw2NDguNDcgMTYyNy41OCw2NTEuNTI4IDE2MjYuODIsNjUyLjI3OVpNMjAxLjE0Miw2MzQuMTRDMjAyLjU5OCw1NDEuNjY2IDIxMy4xNjQsNDUzLjU1MiAyNDQuNjAxLDM5Ni4zOTZDMzA2LjkxNywyODMuMDk4IDQ1OS43MzksMjM3LjU1OCA1ODYuODM3LDIxMy43NjdDNjE3LjIwNSwyMDguMDgyIDY0OS41MDMsMjAyLjEyMiA2ODMuNywxOTYuNDI1TDY4My40NDcsMTk1LjE1M0M4NTYuMTA0LDE2MC4zOTMgMTExNi40LDE1MS4zNzMgMTMxNy41OSwxODkuNTE0QzEyNzMuMzgsMjExLjYzOSA4NjQuODksNDIwLjk3OCA3NjIuNzk2LDY1Mi4wMzdDNzYyLjc5Niw2NTIuMDM3IDc2Ny43MzksNjUwLjc2NiA3MTAuODQzLDY3Mi41NDlDNzEwLjg0Myw2NzIuNTQ5IDU5Mi41NTUsNzM0LjU4MiA1NzAuNDQ0LDg1OS41NzlDNTcwLjQ0NCw4NTkuNTc5IDYzOCw2OTEuNTM2IDgxNS45NSw2NzYuNjM0QzgxNS45NSw2NzYuNjM0IDU1MS41NzQsNzk1LjQ4NSA1NDUuNzE0LDEwMDBMNTU0LjYxNywxMDA3LjA2QzU0Ni4zMDQsMTAwMS4xNyA1MzcuODU4LDk5NS4zNDggNTI5LjI3Niw5ODkuNjE0QzUzMC43MzEsOTcyLjIyMSA1NDEuMDQzLDg1OS4zMTEgNTY2LjY0Miw4MTkuMTc0QzU2Ni42NDIsODE5LjE3NCA2MDIuMzEzLDcwMi4wMTQgNjUzLjQ4Myw2MzcuMjAxQzY1My40ODMsNjM3LjIwMSA3MjIuMzA5LDUzOC4zMTggNzUyLjY4NSw1MTIuNjI2Qzc1OC45NjYsNTA4LjY4NSA3NjIuNTcsNTA2LjY1MyA3NjIuNTcsNTA2LjY1M0M3NjAuMTM4LDUwNy4wNTMgNzU2Ljc1Nyw1MDkuMTgxIDc1Mi42ODUsNTEyLjYyNkM3MTYuNDkyLDUzNS4zMzYgNTkxLjQyMiw2MjEuNDYyIDU1NS4wNyw3NDcuNjkyQzU1NS4wNyw3NDcuNjkyIDU1OC4wMTcsNjgyLjkyNCA2MTAuOTM3LDU5My4zODlDNjEwLjkzNyw1OTMuMzg5IDU1OC43OTIsNjM3LjM5NSA1MzYuMjMzLDcyMC42ODdDNTM2LjIzMyw3MjAuNjg3IDQ5MS4wOTgsNzkxLjYyMiA1MDcuMjM5LDkxNS45NTZDNTA3LjIzOSw5MTUuOTU2IDUxOC41ODgsOTYyLjcwOCA1MTkuODY4LDk4My4zOTdDNDk5Ljc5OCw5NzAuMjgyIDQ3OC45OTksOTU3LjYyMiA0NTcuNDQ3LDk0NS40ODlDNDU4LjIyMSw5MzEuODgyIDQ2Ni45NTIsNzkwLjY2MyA0OTguMzI0LDc0OC43MjNDNDk4LjMyNCw3NDguNzIzIDU2MC43MTMsNjAzLjg2NiA2MTkuMDAxLDU2MC45ODRDNjE5LjAwMSw1NjAuOTg0IDcyOS45Nyw0NDYuODg5IDc5Ni42NjMsNDI5LjA4NUM3OTYuNjYzLDQyOS4wODUgNjg0LjMyNCw0NDUuMDEzIDYxNi44NDcsNTExLjQ3MUM2MTYuODQ3LDUxMS40NzEgNTIxLjIxMiw1ODQuODYgNDg0LjYyMiw2OTkuNTY0QzQ4NC42MjIsNjk5LjU2NCA0MzMuOTc2LDgzMC4zNzMgNDUwLjAzNyw5NDEuMzU1QzQyMC44MzUsOTI1LjIwOCAzOTAuMjY4LDkxMC4wMjUgMzU4LjI3NSw4OTUuOTc2TDM2Ny42NzYsODk5LjIxQzM2OC40NjMsODU0LjA1OSAzMTYuODY1LDc0Ny40NzMgMzE2Ljg2NSw3NDcuNDczQzI4My4wODQsNjg4Ljk0NCAyMDEuMTQyLDYzNC4xNCAyMDEuMTQyLDYzNC4xNFpNMjAxLDY2OC45NDJDMjAwLjkyLDY1Ny4zMDggMjAwLjk2LDY0NS42OSAyMDEuMTQyLDYzNC4xNEwyMDEsNjY4Ljk0MlpNMjAxLDY2OC45NDJDMjc4Ljg5Myw3MzEuNDM5IDM0NC41MTQsODQ1LjY5OSAzNDQuNTE0LDg0NS42OTlDMzY0LjEwNiw4OTEuNDY4IDM1OS41Myw4OTUuNTQzIDM1Ny4yMjYsODk1LjUxNkMzMTAuOTI4LDg3NS4yNCAyNjEuNjQ5LDg1Ny4zMzcgMjA5LjIxLDg0Mi4zMTdMMjEwLjc2Myw4NzQuODA2QzIwNi41NjYsODEzLjc5MiAyMDEuNDkzLDc0MS4wNTcgMjAxLDY2OC45NDJaTTcwMy40MTMsMjY4LjkyNEM2ODQuOTUyLDI3OS44OTggNTgyLjI2OCwzNDIuNjU2IDU1MC45OSwzOTkuMDI4QzU1MC45OSwzOTkuMDI4IDQ3Mi4xMTUsNTAyLjA4IDQ3MC4xOTksNTMzLjEyM0M0NzAuMTk5LDUzMy4xMjMgNDI3Ljc0NCw2MjcuODg2IDQzMC45NDksNjcyLjZDNDMwLjk0OSw2NzIuNiA0MDguNzQ1LDc5NC41MjYgNDI4LjU1OCw4MjguOTI4QzQyOC41NTgsODI4LjkyOCA0NDIuNjM3LDY4Ny45NDYgNDgwLjM1NSw2NDcuMzUyQzQ4MC4zNTUsNjQ3LjM1MiA1MTMuMyw1NzUuMzg2IDU1Mi40MzMsNTQxLjk2MUM1NTIuNDMzLDU0MS45NjEgNTcxLjkyMSw1MTAuMDE3IDU3Ni40MTcsNTA2LjM4NEM1NzYuNDE3LDUwNi4zODQgNTM2LjAzMyw1MzUuNDgxIDUyOC45MzgsNTU1LjQxNUM1MjguNDMzLDU1Ny4xNTkgNTI4LjE4MSw1NTguMDg3IDUyOC4xODEsNTU4LjA4N0M1MjguMzU5LDU1Ny4yMTggNTI4LjYxNCw1NTYuMzI2IDUyOC45MzgsNTU1LjQxNUM1MzQuNDE2LDUzNi40ODEgNTY5LjYwOCw0MjEuMzQ4IDYzMy45OTQsMzUyLjk1OUM2MzMuOTk0LDM1Mi45NTkgNjg4LjQ3NiwyODAuOTUgNzAzLjQxMywyNjguOTI0Wk03MDMuNDEzLDI2OC45MjRDNzA1LjI2NSwyNjcuODI0IDcwNi4yNywyNjcuMjQ0IDcwNi4yNywyNjcuMjQ0QzcwNS42MjgsMjY3LjMzNiA3MDQuNjU4LDI2Ny45MjIgNzAzLjQxMywyNjguOTI0Wk00MTkuMzc4LDkxMC4wMkM0MTUuNDA0LDg5OS43MDEgMzg1Ljk3Nyw3OTkuMDY1IDM4NS45NzcsNzk5LjA2NUMzNzMuOTYxLDc3NS44ODMgMzY0Ljc0LDY3Ny41NzEgMzY0Ljc0LDY3Ny41NzFDMzUxLjI3Miw1OTcuODc2IDM1NS40MTIsNTIwLjgyNCAzNTUuNDEyLDUyMC44MjRDMzQ3Ljk5LDQ5NC42MzYgMzY3LjQzMSwzNDYuNDEzIDM2Ny40MzEsMzQ2LjQxM0MzNjEuODA2LDM0OC4wNTcgMzQ4LjM2Miw0MDcuMDE0IDM0OC4zNjIsNDA3LjAxNEMzMzEuMzI1LDQ1OC4xOTkgMzMyLjIzOSw1NzguODI0IDMzMi4yMzksNTc4LjgyNEMzMjkuNTMyLDU5Ny4yMTcgMzM1LjIwNiw2NzEuNzI5IDMzNS4yMDYsNjcxLjcyOUMzMjkuMzA1LDY1MS45NTggMjg4LjQxNiw1NjguNjU0IDI4OC40MTYsNTY4LjY1NEMyODIuMzU0LDU2OS41MjcgMzE5LjI1OCw2OTQuNzEyIDMxOS4yNTgsNjk0LjcxMkMzMTcuNDkzLDcxMC44MyAzNTguODI2LDc4Ny43MiAzNTguODI2LDc4Ny43MkMzNjAuNzE0LDgxMy4wNDIgNDE5LjM3OCw5MTAuMDIgNDE5LjM3OCw5MTAuMDJaTTQ2Ni4xNzEsMzg3Ljk3NEM0NjUuNjIxLDM2Ni41NjcgNDEyLjU3NSw0ODEuMDE2IDQxMi41NzUsNDgxLjAxNkMzNjcuMDE0LDU2NS45NDYgMzg0Ljc4MSw2OTQuOTQgMzg0Ljc4MSw2OTQuOTRDMzg3LjAyLDgxNi41MjQgNDEwLjc0Niw4MzYuMTk5IDQxMC43NDYsODM2LjE5OUMzOTUuODUyLDcxNS45NzggNDEzLjE2OCw2NTYuMzQgNDEzLjE2OCw2NTYuMzRDNDE0LjU1Nyw2MjMuMjkxIDQzNC4wMjIsNTUyLjQ1IDQzNC4wMjIsNTUyLjQ1QzQzNy43MDIsNDg4LjM1NSA0NjYuMTcxLDM4Ny45NzQgNDY2LjE3MSwzODcuOTc0Wk0xMjg5LjQsMTAxMy43QzEyOTEuNzMsMTAxMy4zNiAxMjkzLjMyLDEwMTMuMjEgMTI5NC4wMSwxMDEzLjNMMTI4OS40LDEwMTMuN1pNMTI4OS40LDEwMTMuN0MxMjY0LjgxLDEwMTcuMjkgMTE1Ny45OCwxMDQyLjYzIDExNTcuOTgsMTA0Mi42M0MxMTUzLjYsMTA0MS40NSAxMTQ5LjE0LDEwMjYuMDMgMTE0OS4xNCwxMDI2LjAzQzExOTYuODYsMTAxNy40NiAxMzE2LjQ2LDEwMDcuMTUgMTI4OS40LDEwMTMuN1pNMTc3Ny42LDEwMzEuNzZMMTc4Mi43NSw5OTAuMjkxQzE3ODEuMjMsMTAwNC4wOSAxNzc5LjUyLDEwMTcuOTQgMTc3Ny42LDEwMzEuNzZaTTE3NzcuMzIsMTAzMy43N0wxNzc3LjYsMTAzMS43NkwxNzc3LjM1LDEwMzMuNzdMMTc3Ny4zMiwxMDMzLjc3Wk0xNzc3LjMyLDEwMzMuNzdDMTc2NC4yOCwxMTI2LjY4IDE3NDEuNSwxMjE4LjY4IDE2OTguMDMsMTI5Mi41NEMxNjMyLjU2LDE0MDMuNzcgMTUwNi44LDE0ODMuMTUgMTM5OC4xNywxNTYyLjQyQzEyOTQuNiwxNjM4LjAxIDExNjUuNjQsMTcwNC45IDEwNDUuMzUsMTc3NC43N0wxMDQ4Ljg5LDE3NzIuNjVDMTA0OC44OSwxNzcyLjY1IDk4OC42NjIsMTQ0MC42NSA3MzEuNDYzLDExNjIuN0M3MzQuMTgxLDExMzUuODkgNzQ2Ljg4MiwxMDM4LjA2IDc4OC41MiwxMDI0LjhDNzg4LjUyLDEwMjQuOCA4MjEuMjUsMTAwNy43OCA4NTUuODM3LDk4Mi4xOTlDODU1LjgzNyw5ODIuMTk5IDg3Mi45Myw5NTguMDU2IDg5NS44MTQsOTU4LjY0M0M4OTUuODE0LDk1OC42NDMgODk3Ljk5MSw5MjguMjI0IDg5NC42OTksOTI0LjY1Qzg5NC42OTksOTI0LjY1IDg4OS4yODMsOTE0LjMyOSA4NzcuNzg2LDkwMS4wODZDODc3Ljc4Niw5MDEuMDg2IDg2OS43MTksODkxLjI4NiA4NjQuNDMzLDg3Ni42ODNDODY0LjQzMyw4NzYuNjgzIDg2Mi4yNTIsODcxLjk5NiA4NjMuNjE2LDg2OS4xMDZDODYzLjYxNiw4NjkuMTA2IDg2My45OTIsODU5Ljk1MiA4NTguMDg5LDg1Ny4wNDFDODU4LjA4OSw4NTcuMDQxIDg0MC40ODUsODM4LjYwNiA4NDUuNDkxLDgxMC42NTZDODQ1LjQ5MSw4MTAuNjU2IDg0Ny4zNzUsNzg0LjYzMiA4NjUuMzk1LDc2Ny43MjlDODY1LjM5NSw3NjcuNzI5IDg4MS4xNjMsNzQ4Ljg2MyA5MDQuNDg3LDc0My4yNjRDOTA0LjQ4Nyw3NDMuMjY0IDkyNi4yNTksNzMwLjk4NCA5NDEuOTg0LDczNC4wNDVDOTQxLjk4NCw3MzQuMDQ1IDk1Ny40Myw3MzAuMzQxIDk5My4xMDMsNzUyLjMyNkM5OTMuMTAzLDc1Mi4zMjYgMTAyNi4xNiw3NDUuNjA4IDEwMzUuMDgsNzUxLjQwNEMxMDM1LjA4LDc1MS40MDQgMTA2MS41Miw3NzMuMjQ3IDEwMDkuODcsNzk0LjkwMkMxMDA5Ljg3LDc5NC45MDIgMTAwNS41MSw3OTIuODU1IDEwMTIsODA3LjYxQzEwMTIsODA3LjYxIDEwMTYuNDUsODE4LjgzNiAxMDE3Ljc2LDg3MC4yNjhDMTAxNy43Niw4NzAuMjY4IDEwMjAuMzIsOTQxLjQ0NSA5ODcuMzYxLDkyOS45NDhDOTg3LjM2MSw5MjkuOTQ4IDk4NC44MzQsOTY5LjgzMyA5ODYuNjY5LDk3My4zMTdDOTg2LjY2OSw5NzMuMzE3IDEwMjMuMjUsOTc4Ljk0NSAxMTA2Ljc1LDEwMzYuNDNDMTEwNi43NSwxMDM2LjQzIDExNDUuOTMsMTExNC4zMiAxMTYzLjczLDEyMDIuNzJDMTE2My43MywxMjAyLjcyIDExODIuNzYsMTIyOS40MiAxMTU5LjYzLDEyNDkuMThDMTE1OS42MywxMjQ5LjE4IDExODkuMjcsMTMzMC44MSAxMTgyLjk1LDEzNjguMzdDMTE4Mi45NSwxMzY4LjM3IDExODEuNDgsMTUyNy42MiAxMTgyLjI4LDE1MzYuNzJDMTE4Mi4yOCwxNTM2LjcyIDExODQuMDcsMTU3OS4yNyAxMTU3LjUxLDE2MTguODJMMTE2NSwxNjI4Ljc5QzExNjUsMTYyOC43OSAxMjE3LjY1LDE1ODAuNSAxMjEzLjgsMTU2NS4zNUMxMjEzLjgsMTU2NS4zNSAxMzI1LjQ4LDEzODcuNTkgMTQyNi4yNiwxMzE5LjExQzE0MjYuMjYsMTMxOS4xMSAxNTU1LjE2LDExOTAuMjEgMTU5Ny42NiwxMTcwLjI3QzE1OTcuNjYsMTE3MC4yNyAxNzQyLjE4LDEwNjkgMTc1OS43OSwxMDY1Ljk5QzE3NTkuNzksMTA2NS45OSAxNjY5LjA3LDEwODEuMTYgMTU1Mi41NCwxMTY1LjkxQzE1NTIuNTQsMTE2NS45MSAxNDIxLjc4LDEyNDMuMDkgMTMxNy4yOCwxMzc4LjY3QzEzMTcuMjgsMTM3OC42NyAxMjIyLjQxLDE1MDMuMyAxMjE1Ljk3LDE1MjMuODNDMTIxNS45NywxNTIzLjgzIDEyMjEuNTYsMTM0NS4wNyAxMjIxLjAyLDEzMjAuODNDMTIyMS4wMiwxMzIwLjgzIDEyNzAuOTYsMTI2MC41OCAxMzU2Ljk2LDEyMDAuNzZDMTM1Ni45NiwxMjAwLjc2IDE1NDkuNDMsMTA1NS4xNyAxNzc3LjMyLDEwMzMuNzdaTTE3ODIuNzUsOTkwLjI5MUMxNzc5LjcyLDk5MC42MDIgMTY1OS4zLDEwMDMuMTEgMTU1Ni40MywxMDM5LjY2QzE1NTYuNDMsMTAzOS42NiAxMzU4LjM4LDExMDAuMDggMTIwOC41MywxMjExLjUzQzEyMDguNTMsMTIxMS41MyAxMTk3LjA1LDExODcuODMgMTE4OS41OSwxMTQ4LjQ0QzExODkuNTksMTE0OC40NCAxMjQyLjM1LDExNDMuODMgMTI1OS40NCwxMTM1LjA2QzEyNTkuNDQsMTEzNS4wNiAxMjMyLjg3LDExMzEuMjEgMTE4OS44NywxMTM3LjVDMTE4OS44NywxMTM3LjUgMTE4NC41NSwxMTMxLjc3IDExODIuMDksMTExNy42NkMxMTgyLjA5LDExMTcuNjYgMTMzNy42OSwxMDYzLjkgMTQ0OC45MiwxMDU0LjhDMTQ0OC45MiwxMDU0LjggMTMxNi4yNywxMDQ4LjgzIDExNzQuNzIsMTA4Mi41MkwxMTcwLjY4LDEwNzcuNThDMTE3MC42OCwxMDc3LjU4IDEzNjAuNiwxMDA3LjI3IDE1MzQuNjIsMTAxMy4yM0MxNTM0LjYyLDEwMTMuMjMgMTM0My40NCw5NTcuMjUxIDExMjMuOSwxMDAwQzExMjMuOSwxMDAwIDExMTAuMjIsOTk2LjUzOSAxMTMyLjQ4LDk5My4wNjdDMTEzMi40OCw5OTMuMDY3IDEzNTUuNyw5NTUuMTUxIDEzNDcuNzEsOTY0LjAxM0MxMzQ3LjcxLDk2NC4wMTMgMTI4Ny44NCw5ODYuOTE0IDEzNDguODIsOTcyLjcyNEMxMzQ4LjgyLDk3Mi43MjQgMTU1OS44NSw5MzEuMDQ2IDE3ODIuNzYsOTkwLjI3TDE3ODIuNzUsOTkwLjI5MVpNMTA2MC45NSwxMTkyLjMyQzEwNjEuMDcsMTE4Mi4yNyAxMDYxLjU2LDExNzUuNzQgMTA2MS41NiwxMTc1Ljc0QzEwNjAuMjgsMTE4MC4wMiAxMDYwLjE5LDExODUuNzMgMTA2MC45NSwxMTkyLjMyWk0xMDYwLjk1LDExOTIuMzJDMTA2MC43MiwxMjEyLjc4IDEwNjIuMDEsMTI0Ny44MiAxMDcyLjA4LDEyNzIuMTFDMTA3Mi4wOCwxMjcyLjExIDEwNjUuMjYsMTMyNi40MiAxMDc3LjUzLDEzNDYuMjNDMTA3Ny41MywxMzQ2LjIzIDEwOTIuNDgsMTQyMi43IDEwOTUuMjksMTQ0OS4wOEMxMDk1LjI5LDE0NDkuMDggMTEwNy42MSwxNTc3LjI5IDExMjQuNDUsMTU3NS41MkMxMTI0LjQ1LDE1NzUuNTIgMTExMy40OCwxNTE5LjgxIDExMzcuNzIsMTUwNy4yM0MxMTM3LjcyLDE1MDcuMjMgMTEyNy4yNiwxNDUxLjA5IDExMjguNjQsMTQyOS4xMUMxMTI4LjY0LDE0MjkuMTEgMTEwMy4zNywxMzcxLjIxIDExMDEuNjEsMTM1My4yNUMxMTAxLjYxLDEzNTMuMjUgMTA5MC4wNiwxMzAxLjMgMTA5My44OCwxMjg4LjhDMTA5My44OCwxMjg4LjggMTA2NS4wNywxMjI3LjgxIDEwNjAuOTUsMTE5Mi4zMlpNMTgwMC4yOSw2NTcuMzE2TDE4MDAuMjQsNjU3LjM0NUwxODAwLjI0LDY1Ny4zMzRMMTgwMC4yOSw2NTcuMzE2Wk0xNzk1LjQ3LDUyOS44OTlMMTc5NS40OSw1MzAuMDUzTDE3OTUuNDcsNTI5Ljg5M0wxNzk1LjQ3LDUyOS44OTlaTTY5OS45ODIsMTEyOS45N0M2NTcuOTM5LDEwODcuOTEgNjExLjA5NiwxMDQ3LjUxIDU1OC45NTUsMTAxMC4xNUM1NjEuMjgxLDEwMDIuNjcgNjEwLjM5Miw4NDcuMDI3IDY4Mi4xMjYsODEwLjQ3MkM2ODIuMTI2LDgxMC40NzIgNjUzLjI2MSw5MTkuOTg3IDY0NC4xMTYsOTM4LjIxOUM2NDQuMTE2LDkzOC4yMTkgNTUxLjk1Nyw5OTUuMTggNjY2LjEzOSw5NDguMzQ5QzY2Ni4xMzksOTQ4LjM0OSA2OTQuMzk2LDk0NC43NDMgNzA0LjU1OCw5NTEuOTJDNzA0LjU1OCw5NTEuOTIgNjI0LjQ5Myw5NjkuNzA1IDU4OS45NjEsMTAwMEM1ODkuOTYxLDEwMDAgNjc0LjM2Miw5NjAuMjI1IDc2Ny40MzIsMTAwMEM3NjcuNDMyLDEwMDAgNzI4LjA3NCwxMDEwLjIxIDcyMi40ODgsMTA0OS45NkM3MjIuNDg4LDEwNDkuOTYgNzA0LjQ2LDEwNjUuOTEgNjMyLjUxNywxMDMxLjg0QzYzMi41MTcsMTAzMS44NCA2NTIuNzksMTA1OS43MyA3MDMuODEsMTA4MS45MUM3MDMuODEsMTA4MS45MSA3MDIuNTYyLDExMTUuMTggNjk5Ljk4MiwxMTI5Ljk3Wk05NDMuNzkyLDE2NDQuMDVMOTE4LjQwMiwxNTgyLjc2QzkxOC40MDIsMTU4Mi43NiA4MzAuMTE1LDE0ODEuMjYgODA1LjA2NCwxNDY1LjU0QzgwNS4wNjQsMTQ2NS41NCA3MTQuODE4LDEzODMuODYgNjI5LjA1LDEzMzEuMzVDNjI5LjA1LDEzMzEuMzUgNTA5LjIwMiwxMjQzLjg5IDQ3NC40NzUsMTIxMS45NEM0NzQuNDc1LDEyMTEuOTQgMzc1LjM3MywxMTI0LjQ3IDM0Ny40OTMsMTA4My41NUwyNTYuNzc1LDk2My45NzRDMjU2Ljc3NSw5NjMuOTc0IDI3Ni41MDQsMTAzNi44IDM0NS44MTgsMTEyNy41MUMzNDUuODE4LDExMjcuNTEgMzU1Ljg1MiwxMTYxLjQ0IDQ3OC44NjMsMTI3MS4zOUM0NzguODYzLDEyNzEuMzkgNTg4LjEsMTM2NC4yMyA2MTEuNzUsMTM3MS41N0M2MTEuNzUsMTM3MS41NyA3MTAuMzQxLDE0NDYuOTggNzIyLjcwOCwxNDUzLjg2QzcyMi43MDgsMTQ1My44NiA4MzAuODEzLDE1NDIuMjQgODc2LjgxMywxNTkzLjc5Qzg3Ni44MTMsMTU5My43OSA5NTIuMDE0LDE2ODAgOTk2LjI2MywxNzcxLjgyQzk5OC44NDMsMTc4Mi4xMiAxMDAwLDE3ODcuNjkgMTAwMCwxNzg3LjY5TDEwMDEuNDYsMTc5Mi4zNEwxMDAwLDE3OTkuNjhDODY4LjMxNywxNzIwLjU5IDcyMC43NywxNjQ2Ljk0IDYwNC45NTIsMTU2Mi40MkM0OTYuMzI4LDE0ODMuMTUgMzcwLjU2MiwxNDAzLjc3IDMwNS4wOTQsMTI5Mi41NEMyMzkuNjI2LDExODEuMyAyMjEuMzA4LDEwMzAuNzggMjEyLjE0Myw4OTUuMDA1TDIxMi4wNTksODkzLjc2M0M1NTIuODQ0LDEwMDQuNjEgNzUzLjM1LDEyNDcuMjUgODY2Ljc0NSwxNDUxLjhDODUzLjUzNiwxNDMxLjQzIDgzNy41MTQsMTQxMC4yNyA4MTkuOTgyLDEzOTQuNTFDODE5Ljk4MiwxMzk0LjUxIDc4OC4wNTEsMTM0NC4wNiA3MDkuMzI4LDEyNzQuOTJDNzA5LjMyOCwxMjc0LjkyIDU4Ny4yODEsMTE2NC4yNSA1MTcuNDIsMTEzNS41M0M1MTcuNDIsMTEzNS41MyA2MDYuMTQzLDEyMDguMzcgNjI0LjkyLDEyMzIuMThDNjI0LjkyLDEyMzIuMTggNzExLjQ3NCwxMzIyLjMgNzQxLjc1LDEzNTAuOUM3NDEuNzUsMTM1MC45IDgzMS41NDYsMTQ2MC42MyA4NTcuNjUyLDE0OTUuNjhDODU3LjY1MiwxNDk1LjY4IDkxNi41OTEsMTU3Ny4xMSA5MjAuODYyLDE1ODQuOTNDOTIwLjg2MiwxNTg0LjkzIDkzMSwxNjExLjQ2IDk0My43OTIsMTY0NC4wNVpNOTQ2Ljk5NSwxNjIxLjcyQzk2NC41NDEsMTY2Ni4wOSA5NzcuMDIsMTcwNC4wOSA5ODUuNDQzLDE3MzIuNDlDOTc3LjE2OCwxNzA2LjMyIDk2My44NCwxNjY2LjA2IDk0Ni45OTUsMTYyMS43MlpNOTkzLjg3MiwxNzYyLjUyQzk5NC40ODIsMTc2NC44NCA5OTUuMDQzLDE3NjcuMDEgOTk1LjU1NiwxNzY5LjAyTDk5MC4xMDQsMTc1NS44NkM5OTEuNzA1LDE3NTkuMDggOTkyLjk4NiwxNzYxLjM3IDk5My44NzIsMTc2Mi41MlpNMTAwMy42NywxNzk5LjM1TDEwMDMuMTMsMTc5OS42OEwxMDAyLjAxLDE3OTQuMDhMMTAwMy42NywxNzk5LjM1Wk01MzEuNjQxLDg0OC4zNDdDNTMxLjY0MSw4NDguMzQ3IDUyNi4xODgsODk3LjA2NCA1MjcuMDQ4LDkwNS43NjFDNTI3LjA0OCw5MDUuNzYxIDUyMy44NTQsOTcwLjk1NCA1MjIuNjc3LDk2NS40OTZDNTIyLjY3Nyw5NjUuNDk2IDUxNy4zNjQsOTQ5LjEyNCA1MjIuNjM4LDkwNi4zOTJDNTIyLjYzOCw5MDYuMzkyIDUyNS45NzMsODU4LjAyMyA1MjkuMjA5LDg1Mi41MDZDNTI5LjIwOSw4NTIuNTA2IDUyOS41NTQsODM5LjYwNyA1MzEuNjQxLDg0OC4zNDdaIi8+PHBhdGggZD0iTTE3OTIuOCw3MzguMTRDMTc5Mi44OSw3MzAuNDA3IDE3OTIuODQsNzIzLjc0NCAxNzkzLjIsNzA4LjM0M0MxNzkzLjI3LDcwNS4wMDQgMTc5NC4yOCw3MDEuMDY0IDE3OTUuMTIsNjk4LjMyMUMxNzkzLjczLDY5Ni43MjkgMTc5Mi45Nyw2OTQuNTkxIDE3OTMuMTcsNjkyLjMyQzE3OTMuNDQsNjg5LjM4NSAxNzk1LjI3LDY4Ni45NjQgMTc5Ny43Niw2ODUuNzk5QzE3OTguMzMsNjgzLjMzIDE3OTkuMzEsNjgwLjgxOSAxODAwLjksNjc4LjA5NkMxODAzLjEzLDY3NC4yODYgMTgwOC4wNCw2NzMuMDA0IDE4MTEuODUsNjc1LjIzNUMxODE1LjY2LDY3Ny40NjYgMTgxNi45NCw2ODIuMzcxIDE4MTQuNzEsNjg2LjE4MUMxODEyLjc1LDY4OS41MzQgMTgxMyw2OTIuMjYzIDE4MTMuMjksNjk1LjY1M0MxODEzLjc3LDcwMS4yMDYgMTgxNC42NCw3MDcuOTA0IDE4MTMuMjEsNzE3Ljk3NUMxODEyLjE3LDcyNS4yODMgMTgxMC4xOCw3MzEuNTg2IDE4MDguOCw3MzguMzkyQzE4MDguNzMsNzQ0LjQ4NiAxODA4LjU5LDc1MS4xNzQgMTgwOC4xLDc2My4yNUMxODA3LjkzLDc2Ny4zNzUgMTgwNC42NSw3NzAuNjk1IDE4MDAuNTMsNzcwLjkxNEMxNzk2LjQxLDc3MS4xMzQgMTc5Mi43OSw3NjguMTgxIDE3OTIuMTksNzY0LjA5OEMxNzkwLjY2LDc1My43ODQgMTc5MS40LDc0NS42ODcgMTc5Mi44LDczOC4xNFoiIHN0eWxlPSJmaWxsOiM0YTZkMjA7IiBvcGFjaXR5PSIwIi8+PHBhdGggZD0iTTE3OTAuNDksNTU3LjUzNkMxNzkwLjE0LDU1NS4zNTYgMTc5MS42Myw1NTMuMzAzIDE3OTMuODEsNTUyLjk1NEMxNzk1Ljk5LDU1Mi42MDQgMTc5OC4wNCw1NTQuMDkxIDE3OTguMzksNTU2LjI3MUMxNzk4LjU0LDU1Ny4yMTMgMTc5OS41OSw1NjIuODcyIDE3OTMuMzYsNTY3LjA5QzE3OTEuNTQsNTY4LjMyNyAxNzg5LjA1LDU2Ny44NDggMTc4Ny44MSw1NjYuMDJDMTc4Ni41Nyw1NjQuMTkyIDE3ODcuMDUsNTYxLjcwMyAxNzg4Ljg4LDU2MC40NjVDMTc5MC42Miw1NTkuMjg0IDE3OTAuNTMsNTU3LjggMTc5MC40OSw1NTcuNTM2WiIvPjwvc3ZnPg==" alt="GroundForce" style={{width:66,height:66,objectFit:"contain"}}/></div>
      <div className="app-title">GroundForce</div>
      <div className="app-sub">Landscape Operations Hub</div>
      {mode === "truck" ? (
        <>
          <div className="select-label">Select Your Truck</div>
          <div className="truck-grid">
            {TRUCKS.map(t => (
              <div key={t.id} className={`truck-tile ${selected?.id===t.id?"selected":""}`}
                onClick={() => { setSel(t); setPin(""); setError(""); }}>
                <Ic n="truck" /><div className="truck-num">{t.id}</div>
              </div>
            ))}
          </div>
          {selected ? (
            <div className="pin-section">
              <div className="pin-header">
                <div className="selected-truck-badge"><Ic n="truck" /><span>{selected.label}</span></div>
                <span style={{fontSize:12,color:"var(--stone)",fontFamily:"'Barlow Condensed',sans-serif",marginLeft:4}}>— Enter PIN</span>
              </div>
              <div className="pin-dots">
                {[0,1,2,3].map(i => <div key={i} className={`pin-dot ${i<pin.length?"filled":""}`} />)}
              </div>
              <div className="numpad">
                {NUMKEYS.map(k => (
                  <button key={k.v} className={`num-btn ${k.v==="0"?"zero":""}`}
                    style={k.v==="enter"?{background:"var(--moss)",color:"var(--lime)"}:{}}
                    onClick={() => handleKey(k.v)}>
                    {k.v==="del" ? <Ic n="del" style={{width:20,height:20}}/> :
                     k.v==="enter" ? <Ic n="chev" style={{width:20,height:20,transform:"rotate(90deg)"}}/> : k.v}
                    {k.s && <span className="num-sub">{k.s}</span>}
                  </button>
                ))}
              </div>
              <button className="btn-enter" disabled={pin.length<4} onClick={tryLogin}>SIGN IN</button>
              {error && <div className="error-msg">{error}</div>}
            </div>
          ) : <div className="no-truck-msg">Tap your truck number above</div>}
          <div className="mgr-toggle" onClick={() => { setMode("manager"); setError(""); }}>Manager Zone →</div>
        </>
      ) : (
        <div className="pin-section mgr-login-box" style={{borderColor:"var(--mgr)"}}>
          <div className="mgr-login-header">
            <Ic n="shield" style={{width:20,height:20,color:"var(--mgr-lt)"}} /><span>Manager Zone</span>
          </div>
          <div className="login-label">Manager Password</div>
          <input className="mgr-input" type="password" placeholder="••••••••" value={mgrPass}
            onChange={e => { setMgr(e.target.value); setError(""); }}
            onKeyDown={e => e.key==="Enter" && tryMgr()} />
          <button className="btn-mgr" onClick={tryMgr}>ENTER MANAGER ZONE</button>
          {error && <div className="error-msg">{error}</div>}
          <div className="mgr-toggle" style={{color:"var(--stone)"}} onClick={() => { setMode("truck"); setError(""); }}>← Back to truck login</div>
        </div>
      )}
    </div>
  );
}

// ════════════════════
//  TRUCK HOME
// ════════════════════
function TruckHome({ truck, onLogout, checkouts, setCheckouts, jobs, jobsLoading, jobsError }) {
  const [tab,  setTab]  = useState("jobs");
  const [open, setOpen] = useState({ ops: true, hr: false, team: false });
  const truckJobs = jobs[truck.id] || [];
  const subs = TRUCK_SUBMISSIONS[truck.id] || [];
  const toggle = id => setOpen(o => ({ ...o, [id]: !o[id] }));
  const myCheckoutCount = (checkouts[truck.id] || []).reduce((s,c)=>s+c.qty,0);

  return (
    <div className="screen">
      <div className="topbar">
        <div className="topbar-left">
          <div className="topbar-title">GroundForce</div>
          <div className="truck-pill"><Ic n="truck" />{truck.label}</div>
        </div>
        <button className="logout-btn" onClick={onLogout}>Sign Out</button>
      </div>
      <div className="content">
        <div className="greeting">
          <div className="greeting-icon"><Ic n="truck" /></div>
          <div>
            <div className="greet-name">{truck.label}</div>
            <div className="greet-sub">Monday · March 9 · Ready to roll</div>
          </div>
        </div>

        {tab === "jobs" && (
          <>
            <div className="section-hd">Today's Jobs</div>
            {jobsLoading ? (
              <div style={{textAlign:"center",padding:"30px 0",color:"var(--stone)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,letterSpacing:1}}>Loading jobs...</div>
            ) : jobsError ? (
              <div style={{textAlign:"center",padding:"20px",color:"var(--danger)",fontSize:16}}>{jobsError}</div>
            ) : truckJobs.length === 0 ? (
              <div style={{textAlign:"center",padding:"30px 0",color:"var(--stone)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,letterSpacing:1,textTransform:"uppercase"}}>No jobs assigned today</div>
            ) : truckJobs.map((j,i) => (
                <div key={i} className="job-card" style={{borderLeftColor:j.status==="active"?"var(--lime)":"var(--dirt)"}}>
                  <div className="job-name">{j.name}</div>
                  <div className="job-meta">
                    <span><Ic n="clock"/>{j.time}</span>
                    <span><Ic n="map"/>{j.address}</span>
                  </div>
                  <span className={`job-status-chip ${j.status==="active"?"chip-active":"chip-next"}`}>
                    {j.status==="active"?"In Progress":"Up Next"}
                  </span>
                  {j.gate    && <div style={{fontSize:16,color:"var(--stone)",marginTop:6}}>🔒 {j.gate}</div>}
                  {j.notes   && <div style={{fontSize:16,color:"var(--stone)",marginTop:4}}>📋 {j.notes}</div>}
                  {j.contact && <div style={{fontSize:16,color:"var(--stone)",marginTop:4}}>📞 {j.contact}</div>}
                </div>
              ))}
            
          </>
        )}

        {tab === "forms" && (
          <>
            <div className="section-hd">Forms</div>
            {FORM_CATS.map(cat => (
              <div key={cat.id} className="cat-card">
                <div className="cat-header" onClick={() => toggle(cat.id)}>
                  <div className={`cat-icon ${cat.colorClass}`}><Ic n={cat.icon} /></div>
                  <div className="cat-info">
                    <div className="cat-name">{cat.label}</div>
                    <div className="cat-count">{cat.forms.length} forms</div>
                  </div>
                  <Ic n="chev" className={`chevron ${open[cat.id]?"open":""}`} />
                </div>
                {open[cat.id] && (
                  <div className="form-list">
                    {cat.forms.map(f => (
                      <div key={f.name} className="form-item">
                        <div className="form-item-left">
                          <div className="form-dot"/>
                          <div><div className="form-name">{f.name}</div><div className="form-desc">{f.desc}</div></div>
                        </div>
                        {f.url ? <a href={f.url} target="_blank" rel="noreferrer" className="open-badge">Open →</a> : <span className="open-badge" style={{opacity:0.35,cursor:"default"}}>Soon</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {tab === "tools" && (
          <ToolsTab truck={truck} checkouts={checkouts} setCheckouts={setCheckouts} />
        )}

        {tab === "mine" && (
          <>
            <div className="section-hd">Submissions</div>
            <div style={{fontSize:12,color:"var(--stone)",marginBottom:14}}>Recent form submissions from {truck.label}.</div>
            {subs.length === 0
              ? <div style={{textAlign:"center",padding:"30px 0",color:"var(--stone)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,letterSpacing:1,textTransform:"uppercase"}}>No submissions yet</div>
              : subs.map((s,i) => (
                <div key={i} className="sub-card">
                  <div className="sub-icon"><Ic n="doc"/></div>
                  <div><div className="sub-name">{s.form}</div><div className="sub-meta">Submitted · {truck.label}</div></div>
                  <div className="sub-time">{s.when}</div>
                </div>
              ))}
          </>
        )}
      </div>

      <nav className="bottom-nav">
        <button className={`bnav-btn ${tab==="jobs"?"active":""}`} onClick={()=>setTab("jobs")}><Ic n="map"/>Jobs</button>
        <button className={`bnav-btn ${tab==="forms"?"active":""}`} onClick={()=>setTab("forms")}><Ic n="clip"/>Forms</button>
        <button className={`bnav-btn ${tab==="tools"?"active":""}`} onClick={()=>setTab("tools")} style={{position:"relative"}}>
          <Ic n="wrench"/>Tools
          {myCheckoutCount > 0 && (
            <span style={{position:"absolute",top:6,right:"50%",transform:"translateX(8px)",background:"var(--warn)",borderRadius:"50%",width:16,height:16,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",color:"var(--earth)"}}>{myCheckoutCount}</span>
          )}
        </button>
        <button className={`bnav-btn ${tab==="mine"?"active":""}`} onClick={()=>setTab("mine")}><Ic n="doc"/>History</button>
      </nav>
    </div>
  );
}

// ════════════════════
//  MANAGER ZONE
// ════════════════════
function ManagerZone({ onLogout, checkouts, jobs, jobsLoading }) {
  const [tab, setTab] = useState("activity");
  return (
    <div className="screen" style={{background:"#ddd9d0"}}>
      <div className="mgr-topbar">
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <Ic n="shield" style={{width:16,height:16,color:"var(--mgr-lt)"}}/>
          <div className="mgr-topbar-title">Manager Zone</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span className="mgr-badge">Admin</span>
          <button className="logout-btn" onClick={onLogout}>Out</button>
        </div>
      </div>
      <div className="content" style={{background:"#ddd9d0"}}>
        {tab === "activity" && (
          <>
            <div className="section-hd" style={{color:"var(--mgr)"}}>Today's Jobs</div>
            {jobsLoading ? (
              <div style={{fontSize:18,color:"var(--stone)",marginBottom:14}}>Loading...</div>
            ) : Object.keys(jobs).length === 0 ? (
              <div style={{fontSize:18,color:"var(--stone)",marginBottom:14}}>No jobs in sheet for today.</div>
            ) : Object.entries(jobs).map(([truckId, truckJobs]) =>
              truckJobs.map((j, i) => (
                <div key={`${truckId}-${i}`} className="activity-item" style={{borderLeftColor:"var(--leaf)"}}>
                  <div className="act-top">
                    <div className="act-form">{j.name}</div>
                    <div className="act-time">{j.time}</div>
                  </div>
                  <div className="act-truck"><Ic n="truck"/>Truck {truckId}</div>
                  <div className="act-cat">{j.address}</div>
                  {j.status === "active" && <span className="chip-active" style={{fontSize:13,padding:"2px 8px",borderRadius:4,marginTop:6,display:"inline-block"}}>In Progress</span>}
                </div>
              ))
            )}
            <div style={{height:16}}/>
            <div className="section-hd" style={{color:"var(--mgr)"}}>All Recent Form Activity</div>
            {ACTIVITY.map((a,i) => (
              <div key={i} className={`activity-item ${a.type}`} style={{animationDelay:`${i*0.05}s`}}>
                <div className="act-top"><div className="act-form">{a.form}</div><div className="act-time">{a.when}</div></div>
                <div className="act-truck"><Ic n="truck"/>{a.truck}</div>
                <div className="act-cat">{a.cat}</div>
              </div>
            ))}
            <div style={{marginTop:22}}>
              <div className="section-hd" style={{color:"var(--mgr)"}}>Google Sheets</div>
              {["Daily Ops Responses","HR & Admin Responses","Team & Skills Responses"].map(s => (
                <button key={s} className="view-sheet-btn"><Ic n="sheets"/>{s}</button>
              ))}
            </div>
          </>
        )}
        {tab === "tools" && <MgrToolsTab checkouts={checkouts} />}
        {tab === "trucks" && (
          <>
            <div className="section-hd" style={{color:"var(--mgr)"}}>Truck Status</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
              {TRUCKS.map(t => {
                const hasJobs = !!(jobs[t.id] && jobs[t.id].length > 0);
                return (
                  <div key={t.id} style={{background:"var(--bark)",border:`1px solid ${hasJobs?"var(--leaf)":"var(--moss)"}`,borderRadius:9,padding:"10px 6px",display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    <Ic n="truck" style={{width:18,height:18,color:hasJobs?"var(--lime)":"var(--stone)"}}/>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:hasJobs?"var(--lime)":"var(--stone)",letterSpacing:1}}>{t.id}</div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:9,letterSpacing:1,textTransform:"uppercase",color:hasJobs?"var(--leaf)":"var(--stone)"}}>{hasJobs?"Active":"Idle"}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <nav className="bottom-nav" style={{background:"#d0ccc2",borderTopColor:"#b0aa9a"}}>
        <button className={`bnav-btn ${tab==="activity"?"active mgr-tab":""}`} onClick={()=>setTab("activity")}><Ic n="bell"/>Activity</button>
        <button className={`bnav-btn ${tab==="tools"?"active mgr-tab":""}`} onClick={()=>setTab("tools")}><Ic n="wrench"/>Tools</button>
        <button className={`bnav-btn ${tab==="trucks"?"active mgr-tab":""}`} onClick={()=>setTab("trucks")}><Ic n="truck"/>Trucks</button>
      </nav>
    </div>
  );
}

// ════════════════════
//  ROOT
// ════════════════════
export default function App() {
  const [screen,    setScreen]    = useState("login");
  const [truck,     setTruck]     = useState(null);
  const [checkouts, setCheckouts] = useState({});
  const [jobs,      setJobs]      = useState({});
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError,   setJobsError]   = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/${encodeURIComponent(SHEETS_TAB)}?key=${SHEETS_KEY}`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        const rows = data.values || [];
        if (rows.length < 2) { setJobsLoading(false); return; }
        const headers = rows[0].map(h => h.trim().toLowerCase());
        const iDate     = headers.findIndex(h => h.includes("date"));
        const iTruck    = headers.findIndex(h => h.includes("truck"));
        const iName     = headers.findIndex(h => h.includes("property") || h.includes("name"));
        const iAddress  = headers.findIndex(h => h.includes("address"));
        const iTime     = headers.findIndex(h => h.includes("time"));
        const iStatus   = headers.findIndex(h => h.includes("status"));
        const iDuration = headers.findIndex(h => h.includes("duration"));
        const iType     = headers.findIndex(h => h.includes("type"));
        const iNotes    = headers.findIndex(h => h.includes("notes") || h.includes("instruction"));
        const iGate     = headers.findIndex(h => h.includes("gate") || h.includes("access"));
        const iContact  = headers.findIndex(h => h.includes("contact"));

        const byTruck = {};
        rows.slice(1).forEach(row => {
          const rowDate   = row[iDate]   || "";
          const truckNum  = parseInt(row[iTruck]) || 0;
          const rowStatus = (row[iStatus] || "scheduled").toLowerCase();
          if (!truckNum) return;
          // Show today's jobs OR jobs with no date
          const dateMatch = !rowDate || rowDate === today;
          if (!dateMatch) return;
          if (!byTruck[truckNum]) byTruck[truckNum] = [];
          byTruck[truckNum].push({
            name:     row[iName]     || "Unnamed Job",
            address:  row[iAddress]  || "",
            time:     row[iTime]     || "",
            status:   rowStatus === "in progress" || rowStatus === "active" ? "active" : "next",
            duration: iDuration >= 0 ? row[iDuration] : "",
            type:     iType     >= 0 ? row[iType]     : "",
            notes:    iNotes    >= 0 ? row[iNotes]    : "",
            gate:     iGate     >= 0 ? row[iGate]     : "",
            contact:  iContact  >= 0 ? row[iContact]  : "",
          });
        });
        setJobs(byTruck);
        setJobsLoading(false);
      })
      .catch(err => {
        console.error("Sheets error:", err);
        setJobsError("Could not load jobs. Check connection.");
        setJobsLoading(false);
      });
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {screen === "login" && (
          <LoginScreen
            onTruckLogin={t => { setTruck(t); setScreen("truck"); }}
            onMgrLogin={() => setScreen("manager")}
          />
        )}
        {screen === "truck" && truck && (
          <TruckHome truck={truck} onLogout={() => { setTruck(null); setScreen("login"); }}
            checkouts={checkouts} setCheckouts={setCheckouts}
            jobs={jobs} jobsLoading={jobsLoading} jobsError={jobsError} />
        )}
        {screen === "manager" && (
          <ManagerZone onLogout={() => setScreen("login")} checkouts={checkouts} jobs={jobs} jobsLoading={jobsLoading} />
        )}
      </div>
    </>
  );
}
