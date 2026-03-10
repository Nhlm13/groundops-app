import { useState } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@400;500;600;700&display=swap');`;

const css = `
${FONT}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --earth:  #16150f;
  --bark:   #24221a;
  --bark2:  #2e2c20;
  --moss:   #3a4628;
  --leaf:   #5f7d30;
  --lime:   #96c235;
  --dirt:   #7a6845;
  --sand:   #c4a96a;
  --stone:  #7a7a6a;
  --mist:   #c8c8b4;
  --cream:  #eeead8;
  --danger: #c0442a;
  --warn:   #c07a28;
  --mgr:    #4a7ab5;
  --mgr-lt: #6a9ad5;
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
.app-sub { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; letter-spacing: 4px; color: var(--stone); text-transform: uppercase; margin-top: 5px; margin-bottom: 28px; }

.select-label { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; letter-spacing: 3px; color: var(--stone); text-transform: uppercase; margin-bottom: 12px; align-self: flex-start; }
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
.num-sub { font-family: 'Barlow Condensed', sans-serif; font-size: 8px; letter-spacing: 2px; color: var(--stone); }
.num-btn.zero { grid-column: 2; }

.btn-enter { width: 100%; padding: 14px; margin-top: 16px; background: var(--lime); border: none; border-radius: 10px; font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 3px; color: var(--earth); cursor: pointer; transition: opacity 0.2s, transform 0.1s; }
.btn-enter:disabled { background: var(--moss); color: var(--stone); cursor: not-allowed; }
.btn-enter:not(:disabled):active { opacity: 0.85; transform: scale(0.98); }
.no-truck-msg { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; color: var(--stone); text-align: center; padding: 30px 0 10px; letter-spacing: 1px; }
.mgr-toggle { margin-top: 22px; text-align: center; font-family: 'Barlow Condensed', sans-serif; font-size: 13px; color: var(--mgr-lt); cursor: pointer; letter-spacing: 1px; text-decoration: underline; text-underline-offset: 3px; }
.error-msg { background: rgba(192,68,42,0.15); border: 1px solid var(--danger); border-radius: 8px; padding: 10px 14px; margin-top: 12px; font-size: 13px; color: var(--danger); text-align: center; animation: shake 0.3s ease; }
@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }

.mgr-login-box { width: 100%; }
.mgr-login-header { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
.mgr-login-header span { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--mgr-lt); letter-spacing: 2px; }
.login-label { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; letter-spacing: 3px; color: var(--stone); text-transform: uppercase; margin-bottom: 8px; }
.mgr-input { width: 100%; background: var(--bark2); border: 1px solid var(--mgr); border-radius: 8px; padding: 14px; color: var(--cream); font-family: 'Barlow', sans-serif; font-size: 16px; text-align: center; letter-spacing: 4px; margin-bottom: 14px; }
.mgr-input:focus { outline: none; border-color: var(--mgr-lt); }
.btn-mgr { width: 100%; padding: 14px; background: var(--mgr); border: none; border-radius: 10px; font-family: 'Bebas Neue', sans-serif; font-size: 19px; letter-spacing: 3px; color: #fff; cursor: pointer; transition: opacity 0.2s; }
.btn-mgr:active { opacity: 0.85; }

.screen { flex: 1; display: flex; flex-direction: column; position: relative; z-index: 1; animation: fadeUp 0.35s ease both; }
.topbar { background: var(--bark); border-bottom: 3px solid var(--leaf); padding: 12px 16px 10px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
.topbar-left { display: flex; align-items: center; gap: 10px; }
.topbar-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--lime); letter-spacing: 2px; }
.truck-pill { display: flex; align-items: center; gap: 5px; background: var(--moss); border-radius: 20px; padding: 4px 10px; font-family: 'Barlow Condensed', sans-serif; font-size: 12px; color: var(--lime); letter-spacing: 1px; }
.truck-pill svg { width: 12px; height: 12px; }
.logout-btn { background: none; border: 1px solid var(--moss); border-radius: 6px; padding: 5px 10px; cursor: pointer; font-family: 'Barlow Condensed', sans-serif; font-size: 10px; color: var(--stone); letter-spacing: 1px; text-transform: uppercase; }

.content { padding: 16px 16px 90px; overflow-y: auto; flex: 1; }
.section-hd { font-family: 'Bebas Neue', sans-serif; font-size: 13px; letter-spacing: 3px; color: var(--stone); text-transform: uppercase; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
.section-hd::after { content:''; flex:1; height:1px; background:var(--moss); }

.greeting { background: var(--bark); border: 1px solid var(--moss); border-left: 4px solid var(--lime); border-radius: 10px; padding: 14px 16px; margin-bottom: 18px; display: flex; align-items: center; gap: 14px; }
.greeting-icon { width: 44px; height: 44px; border-radius: 10px; background: var(--moss); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.greeting-icon svg { width: 24px; height: 24px; color: var(--lime); }
.greet-name { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: var(--lime); line-height: 1; }
.greet-sub { font-size: 12px; color: var(--stone); margin-top: 3px; }

.job-card { background: var(--bark); border: 1px solid var(--moss); border-left: 4px solid var(--leaf); border-radius: 9px; padding: 13px 14px; margin-bottom: 9px; }
.job-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; color: var(--cream); margin-bottom: 4px; }
.job-meta { display: flex; gap: 12px; flex-wrap: wrap; }
.job-meta span { font-size: 11px; color: var(--stone); display: flex; align-items: center; gap: 3px; }
.job-meta span svg { width: 10px; height: 10px; color: var(--leaf); }
.job-status-chip { display: inline-block; margin-top: 8px; font-family: 'Barlow Condensed', sans-serif; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; }
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
.cat-count { font-size: 11px; color: var(--stone); margin-top: 1px; }
.chevron { width: 16px; height: 16px; color: var(--stone); transition: transform 0.22s; flex-shrink: 0; }
.chevron.open { transform: rotate(90deg); }
.form-list { border-top: 1px solid var(--moss); }
.form-item { display: flex; align-items: center; justify-content: space-between; padding: 13px 15px; border-bottom: 1px solid rgba(58,70,40,0.5); cursor: pointer; transition: background 0.15s; }
.form-item:last-child { border-bottom: none; }
.form-item:active { background: rgba(58,70,40,0.35); }
.form-item-left { display: flex; align-items: center; gap: 10px; }
.form-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--moss); flex-shrink: 0; }
.form-name { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; color: var(--cream); font-weight: 600; }
.form-desc { font-size: 11px; color: var(--stone); margin-top: 1px; }
.open-badge { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: var(--lime); background: rgba(96,194,53,0.1); border: 1px solid rgba(96,194,53,0.25); border-radius: 5px; padding: 3px 8px; flex-shrink: 0; white-space: nowrap; }

.sub-card { background: var(--bark); border: 1px solid var(--moss); border-radius: 9px; padding: 13px 14px; margin-bottom: 9px; display: flex; align-items: center; gap: 12px; }
.sub-icon { width: 34px; height: 34px; border-radius: 8px; background: var(--moss); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sub-icon svg { width: 15px; height: 15px; color: var(--leaf); }
.sub-name { font-family: 'Barlow Condensed', sans-serif; font-size: 14px; color: var(--cream); font-weight: 600; }
.sub-meta { font-size: 11px; color: var(--stone); margin-top: 2px; }
.sub-time { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; color: var(--sand); margin-left: auto; flex-shrink: 0; }

/* ── TOOLS ── */
.tool-cat-header { padding: 12px 14px; display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; background: var(--bark); border: 1px solid var(--moss); border-radius: 10px; margin-bottom: 8px; }
.tool-cat-label { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; color: var(--cream); flex: 1; }
.tool-cat-count { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; color: var(--stone); }
.tool-row { background: var(--bark); border: 1px solid var(--moss); border-radius: 9px; padding: 12px 14px; margin-bottom: 8px; display: flex; align-items: center; gap: 10px; }
.tool-info { flex: 1; min-width: 0; }
.tool-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 15px; color: var(--cream); }
.tool-avail { font-size: 11px; margin-top: 2px; }
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
.return-btn { padding: 8px 12px; background: none; border: 1px solid var(--leaf); border-radius: 8px; font-family: 'Bebas Neue', sans-serif; font-size: 13px; letter-spacing: 1px; color: var(--lime); cursor: pointer; white-space: nowrap; }
.return-btn:active { background: rgba(150,194,53,0.15); }
.co-qty-badge { background: var(--moss); border-radius: 6px; padding: 3px 8px; font-family: 'Bebas Neue', sans-serif; font-size: 16px; color: var(--lime); }

/* Manager tools */
.mgr-tool-row { background: var(--bark); border: 1px solid var(--moss); border-radius: 9px; padding: 12px 14px; margin-bottom: 8px; }
.mgr-tool-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.mgr-tool-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; color: var(--cream); }
.mgr-tool-nums { display: flex; gap: 8px; }
.num-chip { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; padding: 2px 8px; border-radius: 4px; letter-spacing: 0.5px; }
.nc-total { background: rgba(122,122,106,0.2); color: var(--stone); }
.nc-out { background: rgba(192,122,40,0.2); color: var(--warn); }
.nc-avail { background: rgba(96,125,48,0.2); color: var(--leaf); }
.mgr-tool-trucks { font-size: 11px; color: var(--stone); display: flex; flex-wrap: wrap; gap: 4px; }
.truck-tag { background: var(--moss); border-radius: 4px; padding: 2px 7px; font-family: 'Barlow Condensed', sans-serif; font-size: 11px; color: var(--sand); }

/* Manager */
.mgr-topbar { background: #12181f; border-bottom: 3px solid var(--mgr); padding: 12px 16px 10px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
.mgr-topbar-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--mgr-lt); letter-spacing: 2px; }
.mgr-badge { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--mgr-lt); background: rgba(74,122,181,0.2); border: 1px solid var(--mgr); border-radius: 20px; padding: 4px 10px; }
.activity-item { background: var(--bark); border: 1px solid var(--moss); border-left: 4px solid var(--leaf); border-radius: 8px; padding: 12px 14px; margin-bottom: 9px; animation: fadeUp 0.3s ease both; }
.activity-item.hr-form { border-left-color: var(--sand); }
.activity-item.team-form { border-left-color: var(--mgr); }
.act-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 3px; }
.act-form { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; color: var(--cream); }
.act-time { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; color: var(--stone); }
.act-truck { font-size: 12px; color: var(--sand); display: flex; align-items: center; gap: 4px; margin-top: 2px; }
.act-truck svg { width: 11px; height: 11px; }
.act-cat { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: var(--stone); margin-top: 4px; }
.view-sheet-btn { display: flex; align-items: center; gap: 6px; background: rgba(74,122,181,0.12); border: 1px solid var(--mgr); border-radius: 7px; padding: 9px 14px; margin-top: 8px; font-family: 'Barlow Condensed', sans-serif; font-size: 11px; color: var(--mgr-lt); letter-spacing: 1px; text-transform: uppercase; cursor: pointer; width: 100%; justify-content: center; transition: background 0.2s; }
.view-sheet-btn:active { background: rgba(74,122,181,0.28); }
.view-sheet-btn svg { width: 13px; height: 13px; }

.bottom-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; background: var(--bark); border-top: 2px solid var(--moss); display: flex; z-index: 100; padding-bottom: env(safe-area-inset-bottom); }
.bnav-btn { flex: 1; padding: 10px 4px 8px; background: none; border: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; font-family: 'Barlow Condensed', sans-serif; font-size: 10px; color: var(--stone); letter-spacing: 1px; text-transform: uppercase; border-bottom: 3px solid transparent; transition: color 0.2s; }
.bnav-btn.active { color: var(--lime); border-bottom-color: var(--lime); }
.bnav-btn.active.mgr-tab { color: var(--mgr-lt); border-bottom-color: var(--mgr); }
.bnav-btn svg { width: 18px; height: 18px; }
`;

// ── Icons ──
const Ic = ({ n, ...p }) => {
  const d = {
    leaf:   <><path d="M2 22 16 8"/><path d="M3.5 11.5A10 10 0 0 1 14 2c0 5.52-4.48 10-10 10a9.96 9.96 0 0 1-.5-.5z"/></>,
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

const TRUCK_JOBS = {
  1: [
    { name: "Hartwell Estate",  address: "4201 Oak Ridge Dr",    time: "7:00 AM", status: "active" },
    { name: "Maple Commons",    address: "77 Maple Commons Way", time: "1:00 PM", status: "next"   },
  ],
  2: [{ name: "Crestview HOA", address: "Crestview Blvd Zone 2", time: "8:30 AM", status: "active" }],
  3: [
    { name: "Dunbar Residence", address: "912 Pinehurst Ln",      time: "9:00 AM", status: "active" },
    { name: "Birch Park",       address: "33 Birch Park Circle",  time: "2:00 PM", status: "next"   },
  ],
};

const FORM_CATS = [
  { id: "ops", label: "Daily Operations", icon: "truck", colorClass: "ci-ops",
    forms: [
      { name: "Trailer Checklist",    desc: "Pre-departure equipment check" },
      { name: "Morning Runthrough",   desc: "Daily startup & safety review" },
      { name: "Property Walkthrough", desc: "On-site condition report" },
    ]},
  { id: "hr", label: "HR & Admin", icon: "clip", colorClass: "ci-hr",
    forms: [
      { name: "Time Off Request", desc: "Submit leave for approval" },
      { name: "Document Upload",  desc: "Tax docs & employment forms" },
      { name: "Job Application",  desc: "Refer someone to the team" },
    ]},
  { id: "team", label: "Team & Skills", icon: "star", colorClass: "ci-team",
    forms: [
      { name: "Team Member Profile",              desc: "Music, food, favorites & more" },
      { name: "Skills Assessment — Gardening",    desc: "Rate your gardening knowledge" },
      { name: "Skills Assessment — Construction", desc: "Construction skills self-review" },
      { name: "Skills Assessment — Maintenance",  desc: "Equipment & maintenance proficiency" },
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
              const qty = pending[tool.id] ?? 1;
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
                      <button className="qty-btn" disabled={qty <= 1} onClick={() => setPending(p => ({...p, [tool.id]: Math.max(1, (p[tool.id]??1)-1)}))}> − </button>
                      <span className="qty-num">{qty}</span>
                      <button className="qty-btn" disabled={qty >= avl} onClick={() => setPending(p => ({...p, [tool.id]: Math.min(avl, (p[tool.id]??1)+1)}))}> + </button>
                      <button className="checkout-btn" onClick={() => checkout(tool.id, tool.name, qty)}>
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
  const toolsAvail = allTools.filter(t => totalOut(t.id) === 0);

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
      <div className="logo-mark"><Ic n="leaf" /></div>
      <div className="app-title">GroundOps</div>
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
function TruckHome({ truck, onLogout, checkouts, setCheckouts }) {
  const [tab,  setTab]  = useState("jobs");
  const [open, setOpen] = useState({ ops: true, hr: false, team: false });
  const jobs = TRUCK_JOBS[truck.id] || [];
  const subs = TRUCK_SUBMISSIONS[truck.id] || [];
  const toggle = id => setOpen(o => ({ ...o, [id]: !o[id] }));
  const myCheckoutCount = (checkouts[truck.id] || []).reduce((s,c)=>s+c.qty,0);

  return (
    <div className="screen">
      <div className="topbar">
        <div className="topbar-left">
          <div className="topbar-title">GroundOps</div>
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
            {jobs.length === 0
              ? <div style={{textAlign:"center",padding:"30px 0",color:"var(--stone)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,letterSpacing:1,textTransform:"uppercase"}}>No jobs assigned yet</div>
              : jobs.map((j,i) => (
                <div key={i} className="job-card" style={{borderLeftColor:j.status==="active"?"var(--lime)":"var(--dirt)"}}>
                  <div className="job-name">{j.name}</div>
                  <div className="job-meta">
                    <span><Ic n="clock"/>{j.time}</span>
                    <span><Ic n="map"/>{j.address}</span>
                  </div>
                  <span className={`job-status-chip ${j.status==="active"?"chip-active":"chip-next"}`}>
                    {j.status==="active"?"In Progress":"Up Next"}
                  </span>
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
                        <span className="open-badge">Open →</span>
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
function ManagerZone({ onLogout, checkouts }) {
  const [tab, setTab] = useState("activity");
  return (
    <div className="screen" style={{background:"#0f141a"}}>
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
      <div className="content" style={{background:"#0f141a"}}>
        {tab === "activity" && (
          <>
            <div className="section-hd" style={{color:"var(--mgr)"}}>All Recent Activity</div>
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
                const hasJobs = !!TRUCK_JOBS[t.id];
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
      <nav className="bottom-nav" style={{background:"#1a2233",borderTopColor:"#2a3a50"}}>
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
  // Shared checkout state — lives at root so manager can see all trucks
  const [checkouts, setCheckouts] = useState({});

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
            checkouts={checkouts} setCheckouts={setCheckouts} />
        )}
        {screen === "manager" && (
          <ManagerZone onLogout={() => setScreen("login")} checkouts={checkouts} />
        )}
      </div>
    </>
  );
}
