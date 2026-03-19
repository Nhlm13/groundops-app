import React, { useState, useEffect, useRef } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@400;500;600;700&display=swap');`;

const css = `
${FONT}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --earth:  #edeae2; --bark:   #f5f2eb; --bark2:  #e8e4db; --moss:   #c4bfb0;
  --leaf:   #4a6d20; --lime:   #3d6b10; --dirt:   #7a6845; --sand:   #8a6e30;
  --stone:  #6a6658; --cream:  #1a1814; --danger: #c0442a; --warn:   #a06010;
  --mgr:    #2a5a95; --mgr-lt: #1a4a80;
}
body { background: var(--earth); font-family: 'Barlow', sans-serif; color: var(--cream); -webkit-tap-highlight-color: transparent; }
.app { max-width: 430px; min-height: 100dvh; margin: 0 auto; background: var(--earth); display: flex; flex-direction: column; position: relative; }
.app::before { content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); opacity: 0.5; }
@keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
@keyframes slideIn { from { opacity:0; transform:translateX(32px); } to { opacity:1; transform:translateX(0); } }
@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }

.splash { flex:1; display:flex; flex-direction:column; align-items:center; padding:36px 24px 60px; padding-top:calc(36px + env(safe-area-inset-top)); position:relative; z-index:1; animation:fadeUp 0.4s ease both; overflow-y:auto; }
.logo-wrap { display:flex; flex-direction:column; align-items:center; margin-bottom:32px; }
.logo-img { width:72px; height:72px; object-fit:contain; margin-bottom:12px; }
.app-title { font-family:'Bebas Neue',sans-serif; font-size:42px; letter-spacing:5px; color:var(--lime); line-height:1; }
.app-sub { font-family:'Barlow Condensed',sans-serif; font-size:13px; letter-spacing:4px; color:var(--stone); text-transform:uppercase; margin-top:4px; }
.select-label { font-family:'Barlow Condensed',sans-serif; font-size:12px; letter-spacing:3px; color:var(--stone); text-transform:uppercase; margin-bottom:8px; align-self:flex-start; width:100%; }

.truck-dropdown-wrap { position:relative; width:100%; margin-bottom:16px; }
.truck-dropdown-btn { width:100%; background:var(--bark); border:1.5px solid var(--moss); border-radius:10px; padding:14px 16px; display:flex; align-items:center; gap:12px; cursor:pointer; transition:border-color 0.15s; font-family:'Barlow',sans-serif; font-size:15px; color:var(--cream); }
.truck-dropdown-btn:hover { border-color:var(--lime); }
.truck-dropdown-btn.open { border-color:var(--lime); border-bottom-left-radius:0; border-bottom-right-radius:0; }
.truck-dropdown-placeholder { color:var(--stone); flex:1; }
.truck-dropdown-value { flex:1; font-weight:500; }
.truck-dropdown-chevron { margin-left:auto; color:var(--stone); transition:transform 0.2s; }
.truck-dropdown-chevron.open { transform:rotate(180deg); }
.truck-dropdown-list { position:absolute; top:100%; left:0; right:0; z-index:200; background:var(--bark); border:1.5px solid var(--lime); border-top:none; border-bottom-left-radius:10px; border-bottom-right-radius:10px; max-height:320px; overflow-y:auto; box-shadow:0 8px 24px rgba(0,0,0,0.15); -webkit-overflow-scrolling:touch; }
.truck-dropdown-item { display:flex; align-items:center; gap:12px; padding:12px 16px; cursor:pointer; transition:background 0.12s; border-bottom:1px solid rgba(196,191,176,0.4); font-family:'Barlow',sans-serif; font-size:15px; color:var(--cream); }
.truck-dropdown-item:last-child { border-bottom:none; }
.truck-dropdown-item:hover { background:var(--bark2); }
.truck-dropdown-item.selected { background:rgba(74,109,32,0.08); color:var(--lime); }

.btn-select-truck { width:100%; padding:14px; background:var(--lime); border:none; border-radius:10px; font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:3px; color:var(--earth); cursor:pointer; transition:opacity 0.2s, transform 0.1s; margin-bottom:20px; }
.btn-select-truck:active { opacity:0.85; transform:scale(0.98); }
.back-btn { display:flex; align-items:center; gap:6px; background:none; border:none; font-family:'Barlow Condensed',sans-serif; font-size:13px; letter-spacing:1px; color:var(--stone); cursor:pointer; text-transform:uppercase; margin-bottom:16px; padding:0; }
.back-btn svg { width:14px; height:14px; }
.error-msg { background:rgba(192,68,42,0.12); border:1px solid var(--danger); border-radius:8px; padding:10px 14px; margin-top:12px; font-size:14px; color:var(--danger); text-align:center; animation:shake 0.3s ease; }
.mgr-toggle { margin-top:24px; text-align:center; font-family:'Barlow Condensed',sans-serif; font-size:13px; color:var(--mgr-lt); cursor:pointer; letter-spacing:1px; text-decoration:underline; text-underline-offset:3px; }
.mgr-box { width:100%; background:var(--bark); border:1.5px solid var(--mgr); border-radius:12px; padding:20px; }
.mgr-box-header { display:flex; align-items:center; gap:8px; margin-bottom:18px; }
.mgr-box-header span { font-family:'Bebas Neue',sans-serif; font-size:22px; color:var(--mgr-lt); letter-spacing:2px; }
.mgr-input { width:100%; background:var(--bark2); border:1px solid var(--mgr); border-radius:8px; padding:14px; color:var(--cream); font-family:'Barlow',sans-serif; font-size:16px; text-align:center; letter-spacing:4px; margin-bottom:14px; }
.mgr-input:focus { outline:none; border-color:var(--mgr-lt); }
.btn-mgr { width:100%; padding:14px; background:var(--mgr); border:none; border-radius:10px; font-family:'Bebas Neue',sans-serif; font-size:19px; letter-spacing:3px; color:#fff; cursor:pointer; transition:opacity 0.2s; }

.screen { flex:1; display:flex; flex-direction:column; position:relative; z-index:1; animation:fadeUp 0.35s ease both; height:100dvh; }
.topbar { background:var(--bark); border-bottom:3px solid var(--leaf); padding:12px 16px 10px; padding-top:calc(12px + env(safe-area-inset-top)); display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:50; }
.topbar-left { display:flex; align-items:center; gap:10px; }
.topbar-title { font-family:'Bebas Neue',sans-serif; font-size:20px; color:var(--lime); letter-spacing:2px; }
.truck-pill { display:flex; align-items:center; gap:5px; background:var(--moss); border-radius:20px; padding:4px 10px; font-family:'Barlow Condensed',sans-serif; font-size:13px; color:var(--lime); letter-spacing:1px; }
.truck-pill svg { width:12px; height:12px; }
.logout-btn { background:none; border:1px solid var(--moss); border-radius:6px; padding:5px 10px; cursor:pointer; font-family:'Barlow Condensed',sans-serif; font-size:12px; color:var(--stone); letter-spacing:1px; text-transform:uppercase; }
.content { padding:16px 16px 100px; overflow-y:auto; flex:1; height:0; }
.section-hd { font-family:'Bebas Neue',sans-serif; font-size:16px; letter-spacing:3px; color:var(--stone); text-transform:uppercase; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
.section-hd::after { content:''; flex:1; height:1px; background:var(--moss); }

.greeting { background:var(--bark); border:1px solid var(--moss); border-left:4px solid var(--lime); border-radius:10px; padding:14px 16px; margin-bottom:18px; display:flex; align-items:center; gap:14px; }
.greeting-icon { width:44px; height:44px; border-radius:10px; background:var(--moss); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.greeting-icon svg { width:22px; height:22px; color:var(--lime); }
.greet-name { font-family:'Bebas Neue',sans-serif; font-size:24px; color:var(--lime); line-height:1; }
.greet-sub { font-size:13px; color:var(--stone); margin-top:3px; }

.action-card { background:var(--bark); border:1px solid var(--moss); border-left:4px solid var(--leaf); border-radius:9px; padding:14px 16px; margin-bottom:10px; display:flex; align-items:center; gap:14px; cursor:pointer; transition:background 0.15s; }
.action-card:active { background:var(--bark2); }
.action-card-icon { width:38px; height:38px; border-radius:8px; background:var(--moss); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.action-card-icon svg { width:18px; height:18px; color:var(--lime); }
.action-card-info { flex:1; }
.action-card-name { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:15px; color:var(--cream); }
.action-card-desc { font-size:12px; color:var(--stone); margin-top:2px; }
.action-card-arrow { color:var(--moss); }
.action-card-arrow svg { width:16px; height:16px; }
.status-chip { font-family:'Barlow Condensed',sans-serif; font-size:11px; letter-spacing:1px; text-transform:uppercase; padding:3px 8px; border-radius:4px; margin-top:4px; display:inline-block; }
.chip-done { background:rgba(74,109,32,0.12); color:var(--lime); }
.chip-pending { background:rgba(160,96,16,0.12); color:var(--warn); }

.contact-card { background:var(--bark); border:1px solid var(--moss); border-radius:9px; padding:13px 15px; margin-bottom:8px; display:flex; align-items:center; gap:12px; }
.contact-avatar { width:40px; height:40px; border-radius:50%; background:var(--moss); display:flex; align-items:center; justify-content:center; flex-shrink:0; font-family:'Bebas Neue',sans-serif; font-size:16px; color:var(--lime); letter-spacing:1px; }
.contact-info { flex:1; }
.contact-name { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:15px; color:var(--cream); }
.contact-role { font-size:12px; color:var(--stone); margin-top:1px; }
.call-btn { width:38px; height:38px; border-radius:50%; background:var(--lime); border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:opacity 0.2s, transform 0.1s; flex-shrink:0; }
.call-btn svg { width:16px; height:16px; color:var(--earth); }

.receipt-upload { width:100%; background:var(--bark2); border:1.5px dashed var(--moss); border-radius:8px; padding:20px; display:flex; flex-direction:column; align-items:center; gap:8px; cursor:pointer; transition:border-color 0.15s; }
.receipt-upload:hover { border-color:var(--lime); }
.success-banner { background:rgba(74,109,32,0.12); border:1px solid var(--leaf); border-radius:8px; padding:12px 16px; margin-bottom:16px; font-family:'Barlow Condensed',sans-serif; font-size:14px; color:var(--lime); display:flex; align-items:center; gap:8px; letter-spacing:0.5px; }

.tool-cat-header { padding:12px 14px; display:flex; align-items:center; gap:10px; cursor:pointer; background:var(--bark); border:1px solid var(--moss); border-radius:10px; margin-bottom:8px; }
.tool-cat-label { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:14px; color:var(--cream); flex:1; }
.tool-cat-count { font-family:'Barlow Condensed',sans-serif; font-size:13px; color:var(--stone); }
.chevron { width:16px; height:16px; color:var(--stone); transition:transform 0.22s; flex-shrink:0; }
.chevron.open { transform:rotate(90deg); }
.tool-row { background:var(--bark); border:1px solid var(--moss); border-radius:9px; padding:12px 14px; margin-bottom:8px; display:flex; align-items:center; gap:10px; }
.tool-info { flex:1; min-width:0; }
.tool-name { font-family:'Barlow Condensed',sans-serif; font-weight:600; font-size:14px; color:var(--cream); }
.tool-avail { font-size:12px; margin-top:2px; }
.tool-avail.ok { color:var(--leaf); } .tool-avail.low { color:var(--warn); } .tool-avail.none { color:var(--danger); }
.qty-row { display:flex; align-items:center; gap:8px; }
.qty-btn { width:30px; height:30px; border-radius:8px; border:1px solid var(--moss); background:var(--bark2); color:var(--cream); font-size:16px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background 0.1s; flex-shrink:0; }
.qty-btn:disabled { opacity:0.3; cursor:not-allowed; }
.qty-num { font-family:'Bebas Neue',sans-serif; font-size:20px; color:var(--lime); min-width:22px; text-align:center; }
.checkout-btn { padding:7px 12px; background:var(--lime); border:none; border-radius:8px; font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:1px; color:var(--earth); cursor:pointer; white-space:nowrap; }
.checkout-btn:disabled { background:var(--moss); color:var(--stone); cursor:not-allowed; }
.checked-out-row { background:rgba(74,109,32,0.07); border:1px solid rgba(74,109,32,0.25); border-radius:9px; padding:12px 14px; margin-bottom:8px; display:flex; align-items:center; gap:10px; }
.return-btn { padding:7px 11px; background:none; border:1px solid var(--leaf); border-radius:8px; font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:1px; color:var(--lime); cursor:pointer; white-space:nowrap; }
.co-qty-badge { background:var(--moss); border-radius:6px; padding:2px 7px; font-family:'Bebas Neue',sans-serif; font-size:15px; color:var(--lime); }

.mgr-topbar { background:#d8d4ca; border-bottom:3px solid var(--mgr); padding:12px 16px 10px; padding-top:calc(12px + env(safe-area-inset-top)); display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:50; }
.mgr-topbar-title { font-family:'Bebas Neue',sans-serif; font-size:20px; color:var(--mgr-lt); letter-spacing:2px; }
.mgr-badge { font-family:'Barlow Condensed',sans-serif; font-size:12px; letter-spacing:2px; text-transform:uppercase; color:var(--mgr-lt); background:rgba(74,122,181,0.2); border:1px solid var(--mgr); border-radius:20px; padding:4px 10px; }
.fleet-row { background:var(--bark); border:1px solid var(--moss); border-radius:9px; padding:13px 15px; margin-bottom:8px; display:flex; align-items:center; gap:12px; cursor:pointer; transition:background 0.15s; }
.fleet-truck-num { font-family:'Bebas Neue',sans-serif; font-size:22px; color:var(--lime); letter-spacing:1px; min-width:36px; }
.fleet-info { flex:1; }
.fleet-division { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:14px; color:var(--cream); }
.truck-detail { animation:slideIn 0.3s ease both; }
.detail-stat { background:var(--bark); border:1px solid var(--moss); border-radius:9px; padding:13px 15px; margin-bottom:8px; display:flex; align-items:center; gap:12px; }
.detail-stat-icon { width:34px; height:34px; border-radius:8px; background:var(--moss); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.detail-stat-icon svg { width:15px; height:15px; color:var(--leaf); }
.detail-stat-info { flex:1; }
.detail-stat-label { font-family:'Barlow Condensed',sans-serif; font-size:12px; color:var(--stone); letter-spacing:1px; text-transform:uppercase; }
.detail-stat-val { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:14px; color:var(--cream); margin-top:2px; line-height:1.4; }
.mgr-tool-row { background:var(--bark); border:1px solid var(--moss); border-radius:9px; padding:12px 14px; margin-bottom:8px; }
.mgr-tool-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
.mgr-tool-name { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:14px; color:var(--cream); }
.mgr-tool-nums { display:flex; gap:6px; }
.num-chip { font-family:'Barlow Condensed',sans-serif; font-size:12px; padding:2px 7px; border-radius:4px; letter-spacing:0.5px; }
.nc-total { background:rgba(122,122,106,0.2); color:var(--stone); }
.nc-out { background:rgba(160,96,16,0.2); color:var(--warn); }
.nc-avail { background:rgba(74,109,32,0.2); color:var(--leaf); }
.truck-tag { background:var(--moss); border-radius:4px; padding:2px 6px; font-family:'Barlow Condensed',sans-serif; font-size:12px; color:var(--sand); }

.bottom-nav { position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:430px; background:var(--bark); border-top:2px solid var(--moss); display:flex; z-index:100; padding-bottom:env(safe-area-inset-bottom); }
.bnav-btn { flex:1; padding:10px 4px 8px; background:none; border:none; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:3px; font-family:'Barlow Condensed',sans-serif; font-size:11px; color:var(--stone); letter-spacing:1px; text-transform:uppercase; border-bottom:3px solid transparent; transition:color 0.2s; }
.bnav-btn.active { color:var(--lime); border-bottom-color:var(--lime); }
.bnav-btn svg { width:22px; height:22px; }

/* DOT checklist */
.dot-cat-header { display:flex; align-items:center; gap:10px; padding:12px 14px; border-radius:8px; margin-bottom:6px; cursor:pointer; transition:background 0.15s; -webkit-tap-highlight-color:transparent; }
.dot-cat-header.all-checked { background:rgba(74,109,32,0.1); border:1px solid rgba(74,109,32,0.3); }
.dot-cat-header.partial { background:var(--bark2); border:1px solid var(--moss); }
.dot-cat-header.none-checked { background:var(--bark2); border:1px solid var(--moss); }
.dot-cat-label { font-family:'Barlow Condensed',sans-serif; font-weight:700; font-size:13px; color:var(--stone); letter-spacing:1px; text-transform:uppercase; flex:1; }
.dot-cat-header.all-checked .dot-cat-label { color:var(--lime); }
.dot-item { display:flex; align-items:center; gap:12px; padding:11px 14px; background:var(--bark); border:1px solid var(--moss); border-radius:8px; margin-bottom:5px; cursor:pointer; transition:background 0.12s; -webkit-tap-highlight-color:transparent; }
.dot-item.checked { background:rgba(74,109,32,0.06); border-color:rgba(74,109,32,0.3); }
.dot-item.flagged { background:rgba(192,68,42,0.06); border-color:rgba(192,68,42,0.3); }
.dot-checkbox { width:22px; height:22px; border-radius:6px; border:2px solid var(--moss); display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.15s; }
.dot-checkbox.checked { background:var(--lime); border-color:var(--lime); }
.dot-checkbox svg { width:12px; height:12px; color:var(--earth); }
.dot-item-label { font-family:'Barlow Condensed',sans-serif; font-size:13px; color:var(--cream); flex:1; line-height:1.3; }
.dot-priority { font-family:'Barlow Condensed',sans-serif; font-size:10px; letter-spacing:1px; text-transform:uppercase; padding:2px 6px; border-radius:4px; flex-shrink:0; }
.dot-priority.high { background:rgba(192,68,42,0.12); color:var(--danger); }
.dot-priority.medium { background:rgba(160,96,16,0.12); color:var(--warn); }
.dot-priority.low { background:rgba(74,109,32,0.12); color:var(--leaf); }

/* Daily Briefing */
.briefing-section { background:var(--bark); border:1px solid var(--moss); border-radius:9px; margin-bottom:8px; overflow:hidden; }
.briefing-section-header { display:flex; align-items:center; gap:12px; padding:12px 14px; cursor:pointer; transition:background 0.15s; }
.briefing-section-header:hover { background:var(--bark2); }
.briefing-section-body { padding:4px 14px 14px; border-top:1px solid var(--moss); }
.briefing-item { display:flex; gap:8px; align-items:flex-start; font-size:13px; color:var(--stone); line-height:1.5; margin-top:8px; }
.briefing-item::before { content:''; width:5px; height:5px; border-radius:50%; background:var(--moss); flex-shrink:0; margin-top:5px; }
.briefing-ack { display:flex; align-items:center; gap:14px; background:var(--bark); border:1.5px solid var(--moss); border-radius:10px; padding:14px 16px; margin-top:14px; cursor:pointer; transition:border-color 0.15s; -webkit-tap-highlight-color:transparent; }
.briefing-ack.checked { border-color:var(--lime); background:rgba(74,109,32,0.06); }
.briefing-ack-box { width:24px; height:24px; border-radius:6px; border:2px solid var(--moss); display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.15s; }
.briefing-ack-box.checked { background:var(--lime); border-color:var(--lime); }
.briefing-ack-box svg { width:13px; height:13px; color:var(--earth); }
.briefing-ack-label { font-family:'Barlow Condensed',sans-serif; font-size:14px; color:var(--stone); line-height:1.4; }
.briefing-ack.checked .briefing-ack-label { color:var(--lime); }

/* Property Inspection */
.pi-check-row { display:flex; align-items:center; gap:12px; padding:12px 14px; background:var(--bark); border:1px solid var(--moss); border-radius:8px; margin-bottom:6px; cursor:pointer; transition:background 0.12s; -webkit-tap-highlight-color:transparent; }
.pi-check-row.checked { background:rgba(74,109,32,0.06); border-color:rgba(74,109,32,0.3); }
.pi-check-row.flagged { background:rgba(192,68,42,0.06); border-color:rgba(192,68,42,0.3); }
.pi-checkbox { width:22px; height:22px; border-radius:6px; border:2px solid var(--moss); display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.15s; }
.pi-checkbox.checked { background:var(--lime); border-color:var(--lime); }
.pi-checkbox svg { width:12px; height:12px; color:var(--earth); }
.pi-check-label { font-family:'Barlow Condensed',sans-serif; font-size:13px; color:var(--cream); flex:1; line-height:1.3; }
`;

const Ic = ({ n, ...p }) => {
  const paths = {
    truck:  <><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    chev:   <><polyline points="9,18 15,12 9,6"/></>,
    chevD:  <><polyline points="6,9 12,15 18,9"/></>,
    back:   <><polyline points="15,18 9,12 15,6"/></>,
    clip:   <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    phone:  <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.83 5.83l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></>,
    wrench: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>,
    home:   <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></>,
    check:  <><polyline points="20,6 9,17 4,12"/></>,
    camera: <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>,
    box:    <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    clock:  <><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></>,
    del:    <><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></>,
    sun:    <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></>,
    undo:   <><polyline points="9,14 4,9 9,4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></>,
    dot:    <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    alert:  <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    book:   <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
    map:    <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
    image:  <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>{paths[n]}</svg>;
};

const TRUCKS = Array.from({ length: 20 }, (_, i) => ({ id: i+1, label: `Truck ${i+1}` }));
const LANG_KEY = "jj_lang";
const LANGS = { en:"en", es:"es", pt:"pt" };
const FLAGS = { en:"🇺🇸", es:"🇪🇸", pt:"🇧🇷" };
function detectLang() { try { const s=localStorage.getItem(LANG_KEY); if(s&&LANGS[s])return s; } catch(e){} const nav=(navigator.language||"en").toLowerCase(); if(nav.startsWith("pt"))return"pt"; if(nav.startsWith("es"))return"es"; return"en"; }
function saveLang(l) { try{localStorage.setItem(LANG_KEY,l);}catch(e){} }

// ── TRANSLATIONS ──────────────────────────────────────────────────────────────
const T = {
  en: {
    appSub:"Operations Center", selectTruck:"Select Your Truck", chooseTruck:"Choose a truck...",
    makeMyTruck:"Make This My Truck", signInAs:t=>`Sign In as ${t}`,
    notYourTruck:"Not your truck? Change it", truckToday:"Your truck from today",
    mgrZone:"Manager Zone", mgrPassword:"Password", enterMgrZone:"Enter Manager Zone",
    backToLogin:"← Back", signOut:"Sign Out",
    submitReceipt:"Submit a Receipt", receiptCard:"Receipt Submission", receiptSub:"Submit without logging into a truck",
    empResources:"Employee Resources", empResourcesSub:"Request time away & view company policies",
    backToResources:"Back to Employee Resources", back:"Back",
    yourName:"Your Name", namePlaceholder:"First & Last name", truck:"Truck",
    division:"Division", maintenance:"Maintenance", construction:"Construction",
    receiptType:"Receipt Type", fuel:"Fuel", materials:"Materials", toolsSupplies:"Tools / Supplies", other:"Other",
    part1:"Part 1 — General Information", part2Fuel:"Part 2 — Fuel Details", part2Purchase:"Part 2 — Purchase Details",
    gallons:"Gallons Pumped", gallonsPlaceholder:"e.g. 14.3", fuelType:"Fuel Type",
    regular:"Regular", diesel:"Diesel", premium:"Premium",
    whereDidYouFuel:"Where did you fuel up?", atShop:"At the Shop", gasStation:"Gas Station",
    totalCost:"Total Cost ($)", shopConfirm:"✓ No cost to record — shop fuel logged by gallons only.",
    vendor:"Vendor / Merchant", vendorPlaceholder:"e.g. Home Depot, Lowe's",
    totalAmount:"Total Amount ($)", notes:"Notes", notesPlaceholder:"Any additional details...",
    nextPhoto:"Next: Attach Photo →", saving:"Saving...", cancel:"Cancel",
    receiptSaved:"Receipt saved! Now attach a photo.",
    photoDesc:"Take a photo of the physical receipt — it will be saved directly to Drive.",
    tapCamera:"Tap to Open Camera", uploading:"Uploading photo...", required:"REQUIRED",
    allDone:"All Done!", submitAnother:"Submit Another", goHome:"Go to Home", done:"Done",
    readyToRoll:"Ready to roll", dailyForms:"Daily Forms",
    dotCheck:"DOT Walk-Around", dotDesc:"Pre-trip vehicle inspection",
    dailyBriefing:"Daily Briefing", dailyBriefingDesc:"Start of day expectations & safety",
    propInspect:"Property Inspection", propInspectDesc:"On-site arrival & safety check",
    comingSoon:"Coming Soon", pending:"Pending",
    contactMgr:"Contact a Manager", chooseMgr:"Choose a manager...",
    checkedOut:"Checked Out", toolInventory:"Tool Inventory",
    avail:n=>`${n} avail`, of:(a,b)=>`${a} of ${b} available`,
    noneAvail:"None available", allOut:"ALL OUT",
    checkOut:"Check Out", return_:"Return", since:t=>`Since ${t}`,
    home:"Home", receipts:"Receipts", tools:"Tools", hr:"HR",
    errName:"Please enter your name.", errDivision:"Please select a division.",
    errType:"Please select a receipt type.", errGallons:"Please enter gallons pumped.",
    errFuelType:"Please select a fuel type.", errLocation:"Please select where you fueled up.",
    errCost:"Please enter the total cost.", errVendor:"Please enter a vendor / merchant.",
    errTotal:"Please enter the total amount.", wrongPass:"Incorrect password.",
    fleet:"Fleet", activeTrucks:"Active Trucks", noTrucks:"No trucks signed in",
    signedIn:t=>`Signed in at ${t}`, noDivision:"No division selected",
    receiptsToday:"Receipts & Fuel Logs Today", noSubmissions:"No submissions today",
    toolsOut:"Tools Checked Out", noTools:"No tools checked out", loading:"Loading...",
    totalTools:"Total Tools", currentlyOut:"Currently Out", fullInventory:"Full Inventory",
    backHR:"Back to HR Portal",
    // DOT
    dotTitle:"DOT Walk-Around Inspection", dotSubmit:"Submit Inspection",
    dotSubmitting:"Submitting...", dotFlagNote:"flagged High priority items",
    dotNameLabel:"Inspector Name", dotNotes:"Notes", dotNotesPlaceholder:"Any issues or observations...",
    dotUncheckedWarning:n=>`${n} High priority ${n===1?"item":"items"} unchecked — will be flagged on submit`,
    dotSelectAll:"Tap section header to check all",
    dotCat_exterior:"Exterior Truck Check", dotCat_trailer:"Trailer Check",
    dotCat_fluid:"Fluid & Mechanical Check", dotCat_interior:"Interior Truck Check",
    dotCat_safety:"Safety & Miscellaneous",
    dot_tires_exterior:"Tires – proper inflation, no visible damage",
    dot_lug_nuts:"Wheels & lug nuts secure",
    dot_lights_exterior:"Lights – headlights, tail lights, brake lights, turn signals functional",
    dot_mirrors:"Mirrors clean and properly adjusted",
    dot_windshield:"Windshield & windows clean, no cracks",
    dot_wipers:"Wipers working, washer fluid full",
    dot_body_frame:"Body & frame – no loose parts or damage",
    dot_tires_trailer:"Tires – proper inflation, no damage",
    dot_lights_trailer:"Lights & reflectors working",
    dot_hitch:"Hitch connection secure",
    dot_safety_chains:"Safety chains attached correctly",
    dot_trailer_brakes:"Trailer brakes functioning (if equipped)",
    dot_load_secured:"Load secured – tarps, equipment, or materials tied down",
    dot_ramp_latch:"Ramp/latch operational and safe",
    dot_engine_oil:"Engine oil level", dot_coolant:"Coolant level",
    dot_brake_fluid:"Brake fluid", dot_transmission_fluid:"Transmission fluid",
    dot_fuel_level:"Fuel level", dot_hydraulic_fluids:"Hydraulic fluids (if applicable)",
    dot_seatbelts:"Seatbelts functioning", dot_horn:"Horn working",
    dot_gauges:"Gauges – fuel, temp, oil, air pressure normal",
    dot_fire_extinguisher:"Fire extinguisher present & charged",
    dot_first_aid:"First aid kit present & stocked",
    dot_loose_items_interior:"Loose items secured",
    dot_ppe:"PPE stored & accessible",
    dot_warning_triangles:"Warning triangles or cones present",
    dot_no_leaks:"No leaks under vehicle",
    dot_keys_removed:"Keys removed when not in use",
    // Daily Briefing
    dbTitle:"Daily Briefing", dbSubtitle:"Review before starting your day",
    dbNameLabel:"Your Name", dbAckLabel:"I have read and acknowledge the above — I am ready to start my shift safely.",
    dbSubmit:"Submit & Start Day", dbSubmitting:"Submitting...",
    dbSec1:"Start of Day – Expectations", dbSec2:"Equipment Check",
    dbSec3:"Pre-Trip Safety Briefing", dbSec4:"Travel to Job Sites",
    dbItems1:["Arrive on time at the designated reporting location","Clock in using the company system (timeclock, app, or Sheets)","Check in with the crew lead or supervisor","Inspect your uniform and PPE (gloves, safety glasses, boots, long pants)","Check daily route sheet and assigned properties"],
    dbItems2:["Inspect mowers, spreaders, blowers, trimmers, and other tools","Verify fuel, oil, and maintenance status","Load necessary fertilizer products and materials","Ensure calibration logs and service sheets are available"],
    dbItems3:["Discuss weather and turf conditions","Review any special site instructions","Identify any hazards or obstacles"],
    dbItems4:["Follow the planned route unless directed otherwise","Drive safely and adhere to traffic laws","Check that all equipment and materials are secure in the truck"],
    // Property Inspection
    piTitle:"Property Inspection", piSubtitle:"Complete at each property before starting work",
    piNameLabel:"Your Name", piPropertyLabel:"Property Name / Address",
    piPropertyPlaceholder:"e.g. 123 Main St or Smith Residence",
    piSec1:"Arrival", piSec2:"Safety Check", piSec3:"Pre-Existing Damage",
    piArrival_parked:"Parked safely and respectfully",
    piArrival_hazards:"Inspected property for hazards, pets, irrigation, debris, or standing water",
    piArrival_unusual:"Unusual conditions reported to supervisor (if any)",
    piSafety_wet:"Wet or slippery surfaces noted before starting",
    piSafety_obstacles:"Obstacles marked or moved (toys, hoses, debris)",
    piSafety_pets:"Pets secured or confirmed absent",
    piDamage_noted:"Pre-existing damage noted (fences, irrigation heads, lawn features)",
    piDamageNotesLabel:"Describe any damage found",
    piDamageNotesPlaceholder:"Location and description of damage...",
    piDamagePhotoLabel:"Photo of damage (optional)",
    piTakePhoto:"Tap to photograph damage",
    piNotes:"Additional Notes", piNotesPlaceholder:"Any other observations...",
    piSubmit:"Submit Inspection", piSubmitting:"Submitting...",
    piAnotherProperty:"Inspect Another Property",
    piIncompleteWarning:"Please check all required items before submitting.",
    // Uniform policy
    uniformTitle:"Uniform & Appearance", uniformSubtitle:"J & J & Son Lawncare — Employee Policy",
    uniformFooter:"At J & J & Son Lawncare, we take pride in our appearance. A clean, uniformed crew reflects the quality, professionalism, and standards of our work.",
    uSec_purpose:"Purpose", uSec_issuance:"Uniform Issuance", uSec_required:"Required Uniform",
    uSec_clean:"Cleanliness & Condition", uSec_appearance:"Appearance Standards",
    uSec_safety:"Safety Requirements", uSec_care:"Care & Responsibility",
    uSec_replacement:"Replacement Policy", uSec_noncompliance:"Non-Compliance",
    uSub_required:"Required", uSub_notAllowed:"Not Allowed", uSub_standards:"Standards", uSub_unacceptable:"Unacceptable",
    uNote_clean:"If a uniform gets excessively dirty during the day, change into a clean backup if available.",
    uNote_care:"Negligence, loss, or misuse may result in replacement costs charged to the employee.",
    uItems_purpose:["All employees must maintain a clean, professional appearance at all times.","Crews represent the company on every job site — professionalism, safety, and reputation matter."],
    uItems_issuance:["3–5 company t-shirts at start of employment or season","1–2 long sleeve shirts or sweatshirts (seasonal)","Work gloves as needed","Additional gear (rain gear, safety vests) based on job requirements"],
    uItems_required:["Company-issued shirt — worn at all times","Appropriate work pants or shorts","Proper work boots or safety footwear","Gloves when required for tasks"],
    uItems_notAllowed:["Non-company shirts on job sites","Inappropriate clothing on job sites"],
    uItems_standards:["Clean at the start of each workday","Free of excessive dirt, stains, or debris","No rips, tears, or excessive wear","Company logos visible and not heavily faded"],
    uItems_unacceptable:["Dirty uniforms from the previous day","Torn or damaged clothing","Strong odors due to poor hygiene"],
    uItems_appearance:["Daily personal hygiene is required","Clothing must fit properly — no sagging or overly baggy clothing","No inappropriate logos or non-work attire","Hats must be company-branded or plain, worn properly"],
    uItems_safetyReq:["Gloves required when handling materials or operating equipment","Additional PPE (safety glasses, hearing protection, safety vests) worn when required","Clothing that creates a safety hazard is not permitted"],
    uItems_care:["Wash and maintain your uniforms","Keep uniforms in good condition","Bring appropriate clothing for weather conditions","Company replaces uniforms for normal wear and tear at its discretion"],
    uItems_replacement:["Report damaged or worn uniforms to management","Replacements are approved based on condition and management approval","Excessive replacement requests due to poor care may be denied or charged"],
    uItems_noncompliance:["Sent home to change","Removed from the job site until compliant","Disciplinary action for repeated violations"],
    // Vehicle Guidelines
    vehicleTitle:"Vehicle Guidelines", vehicleSubtitle:"J & J & Son Lawncare — Driver Policy",
    vehicleFooter:"Safe driving protects you, your coworkers, and the public. Thank you for representing J&J & Son Lawncare responsibly on the road.",
    vehicleAckLabel:"I have read and understand the J&J & Son Lawncare Vehicle Policy and agree to follow all guidelines.",
    vSec_shop:"At the Shop", vSec_road:"On the Road", vSec_property:"At a Property",
    vItems_shop:["Ensure truck and trailer are locked before leaving for the day","Report any repairs or maintenance needed to your supervisor","Keep the vehicle clean — wash and vacuum as necessary","Only authorized J&J employees may operate or ride in a company vehicle","Return keys to the key box in the shop"],
    vItems_road:["You must have a valid Massachusetts driver's license and DOT Medical card in your possession at all times","Obey all traffic, parking, and vehicle safety laws at all times","Hands-free only — use of handheld cell phones (including texting) while driving is strictly prohibited","Pull over safely before using your phone if you do not have a hands-free system","Do not operate a company vehicle under the influence of alcohol, drugs, or any medication that may impair your ability to drive","Unauthorized passengers are not permitted in company vehicles"],
    vItems_property:["Park safely and respectfully at all job sites","Secure the vehicle and its contents whenever you leave it unattended","Report any accidents, parking tickets, moving violations, theft, or damage to your manager within 24 hours","Cooperate fully with authorities in the event of an accident"],
    // End of Day
    eodTitle:"End of Day Checklist", eodSubtitle:"Complete before leaving for the day",
    eodNameLabel:"Your Name",
    eodAckLabel:"I have completed all end of day tasks and am ready to sign off.",
    eodSubmit:"Submit & Sign Off", eodSubmitting:"Submitting...",
    eodSec1:"Equipment", eodSec2:"Clocking Out",
    eodItems1:["Put away all additional tools used today in their proper place","Clean trailers of debris and organize for the next day","Wash and clean mowers and other equipment","Refuel and store all equipment properly","Record any maintenance issues for your supervisor"],
    eodItems2:["Clock out using the company system","Check out with your supervisor for feedback or updates","Leave the reporting location clean and organized","Drop off keys for any vehicles in the key box"],
    endOfDay:"End of Day", endOfDayDesc:"End of shift sign-off checklist",
  },

  es: {
    appSub:"Centro de Operaciones", selectTruck:"Elige tu Camión", chooseTruck:"Elige un camión...",
    makeMyTruck:"Este es mi Camión", signInAs:t=>`Entrar como ${t}`,
    notYourTruck:"¿No es tu camión? Cámbialo", truckToday:"Tu camión de hoy",
    mgrZone:"Manager Zone", mgrPassword:"Contraseña", enterMgrZone:"Entrar al Manager Zone",
    backToLogin:"← Volver", signOut:"Cerrar Sesión",
    submitReceipt:"Enviar un Recibo", receiptCard:"Envío de Recibo", receiptSub:"Envía sin iniciar sesión en un camión",
    empResources:"Recursos para Empleados", empResourcesSub:"Solicita tiempo libre y consulta las políticas",
    backToResources:"Volver a Recursos", back:"Volver",
    yourName:"Tu Nombre", namePlaceholder:"Nombre y Apellido", truck:"Camión",
    division:"División", maintenance:"Mantenimiento", construction:"Construcción",
    receiptType:"Tipo de Recibo", fuel:"Combustible", materials:"Materiales", toolsSupplies:"Herramientas / Suministros", other:"Otro",
    part1:"Parte 1 — Información General", part2Fuel:"Parte 2 — Detalles de Combustible", part2Purchase:"Parte 2 — Detalles de Compra",
    gallons:"Galones Cargados", gallonsPlaceholder:"ej. 14.3", fuelType:"Tipo de Combustible",
    regular:"Regular", diesel:"Diésel", premium:"Premium",
    whereDidYouFuel:"¿Dónde cargaste?", atShop:"En el Taller", gasStation:"Gasolinera",
    totalCost:"Costo Total ($)", shopConfirm:"✓ Sin costo — combustible del taller registrado por galones.",
    vendor:"Proveedor / Comercio", vendorPlaceholder:"ej. Home Depot, Lowe's",
    totalAmount:"Monto Total ($)", notes:"Notas", notesPlaceholder:"Detalles adicionales...",
    nextPhoto:"Siguiente: Adjuntar Foto →", saving:"Guardando...", cancel:"Cancelar",
    receiptSaved:"¡Recibo guardado! Ahora adjunta una foto.",
    photoDesc:"Toma una foto del recibo físico — se guardará en Drive.",
    tapCamera:"Toca para Abrir la Cámara", uploading:"Subiendo foto...", required:"OBLIGATORIO",
    allDone:"¡Todo Listo!", submitAnother:"Enviar Otro", goHome:"Ir al Inicio", done:"Listo",
    readyToRoll:"Listo para salir", dailyForms:"Formularios Diarios",
    dotCheck:"Inspección DOT", dotDesc:"Inspección pre-viaje del vehículo",
    dailyBriefing:"Briefing Diario", dailyBriefingDesc:"Expectativas y seguridad de inicio del día",
    propInspect:"Inspección de Propiedad", propInspectDesc:"Revisión de llegada y seguridad en sitio",
    comingSoon:"Próximamente", pending:"Pendiente",
    contactMgr:"Contactar a un Gerente", chooseMgr:"Elige un gerente...",
    checkedOut:"Llevado", toolInventory:"Inventario de Herramientas",
    avail:n=>`${n} disp.`, of:(a,b)=>`${a} de ${b} disponibles`,
    noneAvail:"No disponible", allOut:"AGOTADO",
    checkOut:"Llevar", return_:"Devolver", since:t=>`Desde ${t}`,
    home:"Inicio", receipts:"Recibos", tools:"Herramientas", hr:"Recursos",
    errName:"Por favor ingresa tu nombre.", errDivision:"Por favor elige una división.",
    errType:"Por favor elige el tipo de recibo.", errGallons:"Por favor ingresa los galones.",
    errFuelType:"Por favor elige el tipo de combustible.", errLocation:"Por favor indica dónde cargaste.",
    errCost:"Por favor ingresa el costo total.", errVendor:"Por favor ingresa el proveedor.",
    errTotal:"Por favor ingresa el monto total.", wrongPass:"Contraseña incorrecta.",
    fleet:"Flota", activeTrucks:"Camiones Activos", noTrucks:"No hay camiones activos",
    signedIn:t=>`Ingresó a las ${t}`, noDivision:"Sin división seleccionada",
    receiptsToday:"Recibos y Combustible Hoy", noSubmissions:"Sin envíos hoy",
    toolsOut:"Herramientas Llevadas", noTools:"Sin herramientas llevadas", loading:"Cargando...",
    totalTools:"Total Herramientas", currentlyOut:"Actualmente Fuera", fullInventory:"Inventario Completo",
    backHR:"Volver al Portal",
    dotTitle:"Inspección DOT Pre-Viaje", dotSubmit:"Enviar Inspección",
    dotSubmitting:"Enviando...", dotFlagNote:"elementos de alta prioridad sin marcar",
    dotNameLabel:"Nombre del Inspector", dotNotes:"Notas", dotNotesPlaceholder:"Problemas u observaciones...",
    dotUncheckedWarning:n=>`${n} ${n===1?"elemento":"elementos"} de alta prioridad sin marcar — se marcará al enviar`,
    dotSelectAll:"Toca el encabezado para marcar todos",
    dotCat_exterior:"Revisión Exterior del Camión", dotCat_trailer:"Revisión del Remolque",
    dotCat_fluid:"Revisión de Fluidos y Mecánica", dotCat_interior:"Revisión Interior del Camión",
    dotCat_safety:"Seguridad y Misceláneos",
    dot_tires_exterior:"Neumáticos – inflado correcto, sin daños visibles",
    dot_lug_nuts:"Ruedas y tuercas de rueda aseguradas",
    dot_lights_exterior:"Luces – faros, luces traseras, frenos, direccionales funcionando",
    dot_mirrors:"Espejos limpios y bien ajustados",
    dot_windshield:"Parabrisas y ventanas limpios, sin grietas",
    dot_wipers:"Limpiaparabrisas funcionando, agua llena",
    dot_body_frame:"Carrocería y chasis – sin piezas sueltas ni daños",
    dot_tires_trailer:"Neumáticos – inflado correcto, sin daños",
    dot_lights_trailer:"Luces y reflectores funcionando",
    dot_hitch:"Enganche del remolque asegurado",
    dot_safety_chains:"Cadenas de seguridad correctamente colocadas",
    dot_trailer_brakes:"Frenos del remolque funcionando (si tiene)",
    dot_load_secured:"Carga asegurada – lonas, equipos o materiales amarrados",
    dot_ramp_latch:"Rampa/pestillo operativo y seguro",
    dot_engine_oil:"Nivel de aceite del motor", dot_coolant:"Nivel de refrigerante",
    dot_brake_fluid:"Fluido de frenos", dot_transmission_fluid:"Fluido de transmisión",
    dot_fuel_level:"Nivel de combustible", dot_hydraulic_fluids:"Fluidos hidráulicos (si aplica)",
    dot_seatbelts:"Cinturones de seguridad funcionando", dot_horn:"Bocina funcionando",
    dot_gauges:"Medidores – combustible, temperatura, aceite, presión normales",
    dot_fire_extinguisher:"Extintor presente y cargado",
    dot_first_aid:"Botiquín de primeros auxilios presente y abastecido",
    dot_loose_items_interior:"Objetos sueltos asegurados",
    dot_ppe:"EPP almacenado y accesible",
    dot_warning_triangles:"Triángulos o conos de advertencia presentes",
    dot_no_leaks:"Sin fugas debajo del vehículo",
    dot_keys_removed:"Llaves retiradas cuando no se usa",
    dbTitle:"Briefing Diario", dbSubtitle:"Revisa antes de comenzar tu día",
    dbNameLabel:"Tu Nombre", dbAckLabel:"He leído y reconozco lo anterior — estoy listo para comenzar mi turno de forma segura.",
    dbSubmit:"Enviar y Comenzar el Día", dbSubmitting:"Enviando...",
    dbSec1:"Inicio del Día – Expectativas", dbSec2:"Revisión de Equipos",
    dbSec3:"Briefing de Seguridad Pre-Viaje", dbSec4:"Viaje a los Sitios de Trabajo",
    dbItems1:["Llegar a tiempo al lugar de presentación designado","Registrar entrada usando el sistema de la empresa","Reportarse con el líder de cuadrilla o supervisor","Inspeccionar uniforme y EPP (guantes, gafas, botas, pantalones largos)","Revisar la hoja de ruta diaria y las propiedades asignadas"],
    dbItems2:["Inspeccionar cortadoras, esparcidores, sopladores, recortadoras y otras herramientas","Verificar estado de combustible, aceite y mantenimiento","Cargar los productos fertilizantes y materiales necesarios","Asegurarse de que los registros de calibración estén disponibles"],
    dbItems3:["Analizar condiciones climáticas y del césped","Revisar instrucciones especiales del sitio","Identificar peligros u obstáculos"],
    dbItems4:["Seguir la ruta planificada a menos que se indique lo contrario","Conducir con seguridad y respetar las leyes de tránsito","Verificar que todos los equipos estén asegurados en el camión"],
    piTitle:"Inspección de Propiedad", piSubtitle:"Completa al llegar a cada propiedad",
    piNameLabel:"Tu Nombre", piPropertyLabel:"Nombre / Dirección de la Propiedad",
    piPropertyPlaceholder:"ej. 123 Calle Principal o Residencia García",
    piSec1:"Llegada", piSec2:"Revisión de Seguridad", piSec3:"Daños Pre-existentes",
    piArrival_parked:"Estacionado de forma segura y respetuosa",
    piArrival_hazards:"Propiedad inspeccionada por peligros, mascotas, irrigación, residuos o agua estancada",
    piArrival_unusual:"Condiciones inusuales reportadas al supervisor (si las hay)",
    piSafety_wet:"Superficies mojadas o resbaladizas identificadas antes de comenzar",
    piSafety_obstacles:"Obstáculos marcados o retirados (juguetes, mangueras, residuos)",
    piSafety_pets:"Mascotas aseguradas o confirmadas ausentes",
    piDamage_noted:"Daños pre-existentes identificados (cercas, cabezas de irrigación, características del jardín)",
    piDamageNotesLabel:"Describe el daño encontrado",
    piDamageNotesPlaceholder:"Ubicación y descripción del daño...",
    piDamagePhotoLabel:"Foto del daño (opcional)",
    piTakePhoto:"Toca para fotografiar el daño",
    piNotes:"Notas Adicionales", piNotesPlaceholder:"Otras observaciones...",
    piSubmit:"Enviar Inspección", piSubmitting:"Enviando...",
    piAnotherProperty:"Inspeccionar Otra Propiedad",
    piIncompleteWarning:"Por favor marca todos los elementos requeridos antes de enviar.",
    uniformTitle:"Uniforme y Apariencia", uniformSubtitle:"J & J & Son Lawncare — Política para Empleados",
    uniformFooter:"En J & J & Son Lawncare, nos enorgullecemos de nuestra apariencia. Una cuadrilla limpia y uniformada refleja la calidad, profesionalismo y estándares de nuestro trabajo.",
    uSec_purpose:"Propósito", uSec_issuance:"Entrega de Uniformes", uSec_required:"Uniforme Requerido",
    uSec_clean:"Limpieza y Condición", uSec_appearance:"Estándares de Apariencia",
    uSec_safety:"Requisitos de Seguridad", uSec_care:"Cuidado y Responsabilidad",
    uSec_replacement:"Política de Reemplazo", uSec_noncompliance:"Incumplimiento",
    uSub_required:"Requerido", uSub_notAllowed:"No Permitido", uSub_standards:"Estándares", uSub_unacceptable:"Inaceptable",
    uNote_clean:"Si el uniforme se ensucia demasiado durante el día, cámbiese por uno limpio si está disponible.",
    uNote_care:"La negligencia, pérdida o mal uso puede resultar en costos de reemplazo a cargo del empleado.",
    uItems_purpose:["Todos los empleados deben mantener una apariencia limpia y profesional en todo momento.","Las cuadrillas representan a la empresa en cada obra — el profesionalismo, la seguridad y la reputación importan."],
    uItems_issuance:["3–5 camisetas de la empresa al inicio del empleo o temporada","1–2 camisas de manga larga o sudaderas (temporada fría)","Guantes de trabajo según sea necesario","Equipo adicional según los requisitos del trabajo"],
    uItems_required:["Camiseta de la empresa — debe usarse en todo momento","Pantalones o shorts de trabajo apropiados","Botas de trabajo o calzado de seguridad adecuado","Guantes cuando se requiera"],
    uItems_notAllowed:["Camisetas que no sean de la empresa","Ropa inapropiada en el sitio de trabajo"],
    uItems_standards:["Limpio al inicio de cada jornada laboral","Sin suciedad excesiva, manchas o residuos","Sin rasgaduras, roturas ni desgaste excesivo","Logotipos de la empresa visibles"],
    uItems_unacceptable:["Uniformes sucios del día anterior","Ropa rasgada o dañada","Olores fuertes por mala higiene personal"],
    uItems_appearance:["Se requiere higiene personal diaria","La ropa debe quedar bien — sin ropa muy holgada","Sin logotipos inapropiados","Los sombreros deben ser de la marca o lisos"],
    uItems_safetyReq:["Guantes al manipular materiales u operar equipos","EPP adicional cuando se requiera","No se permite ropa que represente un peligro"],
    uItems_care:["Lave y mantenga sus uniformes","Mantenga los uniformes en buenas condiciones","Traiga ropa apropiada para las condiciones climáticas","La empresa reemplaza uniformes por desgaste normal a su discreción"],
    uItems_replacement:["Reporte uniformes dañados a la gerencia","Los reemplazos se aprueban según la condición","Las solicitudes excesivas pueden negarse o cobrarse"],
    uItems_noncompliance:["Enviado a casa a cambiarse","Retirado del sitio hasta cumplir","Acción disciplinaria por violaciones repetidas"],
    vehicleTitle:"Pautas de Vehículos", vehicleSubtitle:"J & J & Son Lawncare — Política de Conductores",
    vehicleFooter:"Conducir de forma segura te protege a ti, a tus compañeros y al público. Gracias por representar a J&J & Son Lawncare de manera responsable.",
    vehicleAckLabel:"He leído y entiendo la Política de Vehículos de J&J & Son Lawncare y acepto seguir todas las pautas.",
    vSec_shop:"En el Taller", vSec_road:"En la Carretera", vSec_property:"En la Propiedad",
    vItems_shop:["Asegúrate de que el camión y el remolque estén cerrados antes de irte","Reporta cualquier reparación o mantenimiento necesario a tu supervisor","Mantén el vehículo limpio — lávalo y aspíralo según sea necesario","Solo empleados autorizados de J&J pueden operar o viajar en un vehículo de la empresa","Devuelve las llaves a la caja de llaves en el taller"],
    vItems_road:["Debes tener una licencia de conducir de Massachusetts válida y tarjeta médica DOT en todo momento","Obedece todas las leyes de tránsito, estacionamiento y seguridad vial","Solo manos libres — el uso de teléfonos celulares (incluidos mensajes) mientras conduces está estrictamente prohibido","Detente de forma segura antes de usar tu teléfono si no tienes un sistema manos libres","No operes un vehículo de la empresa bajo la influencia de alcohol, drogas o medicamentos que afecten tu capacidad de conducir","Los pasajeros no autorizados no están permitidos en los vehículos de la empresa"],
    vItems_property:["Estaciona de forma segura y respetuosa en todos los sitios de trabajo","Asegura el vehículo y su contenido cuando lo dejes desatendido","Reporta accidentes, multas, violaciones de tránsito, robos o daños a tu gerente en 24 horas","Coopera plenamente con las autoridades en caso de accidente"],
    eodTitle:"Lista de Fin de Día", eodSubtitle:"Completa antes de irte por el día",
    eodNameLabel:"Tu Nombre",
    eodAckLabel:"He completado todas las tareas del fin del día y estoy listo para cerrar.",
    eodSubmit:"Enviar y Cerrar", eodSubmitting:"Enviando...",
    eodSec1:"Equipos", eodSec2:"Salida",
    eodItems1:["Guarda todas las herramientas adicionales usadas hoy en su lugar","Limpia los remolques de residuos y organízalos para el día siguiente","Lava y limpia cortadoras y otros equipos","Recarga y almacena correctamente todos los equipos","Registra cualquier problema de mantenimiento para tu supervisor"],
    eodItems2:["Registra la salida usando el sistema de la empresa","Consulta con tu supervisor para comentarios o actualizaciones","Deja el lugar de presentación limpio y organizado","Devuelve las llaves de cualquier vehículo en la caja de llaves"],
    endOfDay:"Fin del Día", endOfDayDesc:"Lista de cierre de turno",
  },

  pt: {
    appSub:"Central de Operações", selectTruck:"Escolha seu Caminhão", chooseTruck:"Escolha um caminhão...",
    makeMyTruck:"Esse é meu Caminhão", signInAs:t=>`Entrar como ${t}`,
    notYourTruck:"Não é seu caminhão? Mude", truckToday:"Seu caminhão de hoje",
    mgrZone:"Manager Zone", mgrPassword:"Senha", enterMgrZone:"Entrar no Manager Zone",
    backToLogin:"← Voltar", signOut:"Sair",
    submitReceipt:"Enviar um Recibo", receiptCard:"Envio de Recibo", receiptSub:"Envie sem entrar em um caminhão",
    empResources:"Recursos para Funcionários", empResourcesSub:"Solicite folga e veja as políticas da empresa",
    backToResources:"Voltar aos Recursos", back:"Voltar",
    yourName:"Seu Nome", namePlaceholder:"Nome e Sobrenome", truck:"Caminhão",
    division:"Divisão", maintenance:"Manutenção", construction:"Construção",
    receiptType:"Tipo de Recibo", fuel:"Combustível", materials:"Materiais", toolsSupplies:"Ferramentas / Suprimentos", other:"Outro",
    part1:"Parte 1 — Informações Gerais", part2Fuel:"Parte 2 — Detalhes do Combustível", part2Purchase:"Parte 2 — Detalhes da Compra",
    gallons:"Galões Abastecidos", gallonsPlaceholder:"ex. 14.3", fuelType:"Tipo de Combustível",
    regular:"Comum", diesel:"Diesel", premium:"Premium",
    whereDidYouFuel:"Onde você abasteceu?", atShop:"No Depósito", gasStation:"Posto de Gasolina",
    totalCost:"Custo Total ($)", shopConfirm:"✓ Sem custo — combustível do depósito registrado por galões.",
    vendor:"Fornecedor / Estabelecimento", vendorPlaceholder:"ex. Home Depot, Lowe's",
    totalAmount:"Valor Total ($)", notes:"Observações", notesPlaceholder:"Detalhes adicionais...",
    nextPhoto:"Próximo: Anexar Foto →", saving:"Salvando...", cancel:"Cancelar",
    receiptSaved:"Recibo salvo! Agora anexe uma foto.",
    photoDesc:"Tire uma foto do recibo físico — ela será salva no Drive.",
    tapCamera:"Toque para Abrir a Câmera", uploading:"Enviando foto...", required:"OBRIGATÓRIO",
    allDone:"Tudo Certo!", submitAnother:"Enviar Outro", goHome:"Ir para Início", done:"Pronto",
    readyToRoll:"Pronto para sair", dailyForms:"Formulários Diários",
    dotCheck:"Inspeção DOT", dotDesc:"Inspeção pré-viagem do veículo",
    dailyBriefing:"Briefing Diário", dailyBriefingDesc:"Expectativas e segurança de início do dia",
    propInspect:"Inspeção de Propriedade", propInspectDesc:"Chegada e verificação de segurança no local",
    comingSoon:"Em Breve", pending:"Pendente",
    contactMgr:"Contatar um Gerente", chooseMgr:"Escolha um gerente...",
    checkedOut:"Retirado", toolInventory:"Inventário de Ferramentas",
    avail:n=>`${n} disp.`, of:(a,b)=>`${a} de ${b} disponíveis`,
    noneAvail:"Indisponível", allOut:"ESGOTADO",
    checkOut:"Pegar", return_:"Devolver", since:t=>`Desde ${t}`,
    home:"Início", receipts:"Recibos", tools:"Ferramentas", hr:"RH",
    errName:"Por favor insira seu nome.", errDivision:"Por favor selecione uma divisão.",
    errType:"Por favor selecione o tipo de recibo.", errGallons:"Por favor insira os galões.",
    errFuelType:"Por favor selecione o tipo de combustível.", errLocation:"Por favor indique onde abasteceu.",
    errCost:"Por favor insira o custo total.", errVendor:"Por favor insira o fornecedor.",
    errTotal:"Por favor insira o valor total.", wrongPass:"Senha incorreta.",
    fleet:"Frota", activeTrucks:"Caminhões Ativos", noTrucks:"Nenhum caminhão ativo",
    signedIn:t=>`Entrou às ${t}`, noDivision:"Sem divisão selecionada",
    receiptsToday:"Recibos e Combustível Hoje", noSubmissions:"Nenhum envio hoje",
    toolsOut:"Ferramentas Retiradas", noTools:"Nenhuma ferramenta retirada", loading:"Carregando...",
    totalTools:"Total de Ferramentas", currentlyOut:"Atualmente Fora", fullInventory:"Inventário Completo",
    backHR:"Voltar ao Portal",
    dotTitle:"Inspeção DOT Pré-Viagem", dotSubmit:"Enviar Inspeção",
    dotSubmitting:"Enviando...", dotFlagNote:"itens de alta prioridade sem marcar",
    dotNameLabel:"Nome do Inspetor", dotNotes:"Observações", dotNotesPlaceholder:"Problemas ou observações...",
    dotUncheckedWarning:n=>`${n} ${n===1?"item":"itens"} de alta prioridade sem marcar — será sinalizado ao enviar`,
    dotSelectAll:"Toque no cabeçalho para marcar todos",
    dotCat_exterior:"Verificação Exterior do Caminhão", dotCat_trailer:"Verificação do Reboque",
    dotCat_fluid:"Verificação de Fluidos e Mecânica", dotCat_interior:"Verificação Interior do Caminhão",
    dotCat_safety:"Segurança e Miscelâneos",
    dot_tires_exterior:"Pneus – calibragem correta, sem danos visíveis",
    dot_lug_nuts:"Rodas e porcas das rodas fixadas",
    dot_lights_exterior:"Luzes – faróis, lanternas, freios, setas funcionando",
    dot_mirrors:"Espelhos limpos e bem ajustados",
    dot_windshield:"Para-brisa e janelas limpos, sem rachaduras",
    dot_wipers:"Limpadores funcionando, reservatório cheio",
    dot_body_frame:"Carroceria e chassi – sem peças soltas ou danos",
    dot_tires_trailer:"Pneus – calibragem correta, sem danos",
    dot_lights_trailer:"Luzes e refletores funcionando",
    dot_hitch:"Engate do reboque fixado",
    dot_safety_chains:"Correntes de segurança corretamente fixadas",
    dot_trailer_brakes:"Freios do reboque funcionando (se equipado)",
    dot_load_secured:"Carga fixada – lonas, equipamentos ou materiais amarrados",
    dot_ramp_latch:"Rampa/trinco operacional e seguro",
    dot_engine_oil:"Nível do óleo do motor", dot_coolant:"Nível do líquido de arrefecimento",
    dot_brake_fluid:"Fluido de freio", dot_transmission_fluid:"Fluido de transmissão",
    dot_fuel_level:"Nível de combustível", dot_hydraulic_fluids:"Fluidos hidráulicos (se aplicável)",
    dot_seatbelts:"Cintos de segurança funcionando", dot_horn:"Buzina funcionando",
    dot_gauges:"Medidores – combustível, temperatura, óleo, pressão normais",
    dot_fire_extinguisher:"Extintor presente e carregado",
    dot_first_aid:"Kit de primeiros socorros presente e abastecido",
    dot_loose_items_interior:"Itens soltos fixados",
    dot_ppe:"EPI armazenado e acessível",
    dot_warning_triangles:"Triângulos ou cones de advertência presentes",
    dot_no_leaks:"Sem vazamentos sob o veículo",
    dot_keys_removed:"Chaves removidas quando não estiver em uso",
    dbTitle:"Briefing Diário", dbSubtitle:"Revise antes de começar seu dia",
    dbNameLabel:"Seu Nome", dbAckLabel:"Li e reconheço o acima — estou pronto para iniciar meu turno com segurança.",
    dbSubmit:"Enviar e Iniciar o Dia", dbSubmitting:"Enviando...",
    dbSec1:"Início do Dia – Expectativas", dbSec2:"Verificação de Equipamentos",
    dbSec3:"Briefing de Segurança Pré-Viagem", dbSec4:"Viagem aos Locais de Trabalho",
    dbItems1:["Chegar na hora ao local de apresentação designado","Registrar entrada usando o sistema da empresa","Apresentar-se ao líder de equipe ou supervisor","Inspecionar uniforme e EPI (luvas, óculos, botas, calças compridas)","Verificar a folha de rota diária e as propriedades atribuídas"],
    dbItems2:["Inspecionar cortadores, distribuidores, sopradores, aparadores e outras ferramentas","Verificar estado de combustível, óleo e manutenção","Carregar os produtos fertilizantes e materiais necessários","Garantir que os registros de calibração estejam disponíveis"],
    dbItems3:["Discutir condições climáticas e do gramado","Revisar instruções especiais do local","Identificar riscos ou obstáculos"],
    dbItems4:["Seguir a rota planejada a menos que seja instruído de outra forma","Dirigir com segurança e respeitar as leis de trânsito","Verificar se todos os equipamentos estão fixados no caminhão"],
    piTitle:"Inspeção de Propriedade", piSubtitle:"Complete ao chegar em cada propriedade",
    piNameLabel:"Seu Nome", piPropertyLabel:"Nome / Endereço da Propriedade",
    piPropertyPlaceholder:"ex. Rua Principal 123 ou Residência Silva",
    piSec1:"Chegada", piSec2:"Verificação de Segurança", piSec3:"Danos Pré-existentes",
    piArrival_parked:"Estacionado de forma segura e respeitosa",
    piArrival_hazards:"Propriedade inspecionada por riscos, animais, irrigação, detritos ou água parada",
    piArrival_unusual:"Condições incomuns relatadas ao supervisor (se houver)",
    piSafety_wet:"Superfícies molhadas ou escorregadias identificadas antes de começar",
    piSafety_obstacles:"Obstáculos marcados ou removidos (brinquedos, mangueiras, detritos)",
    piSafety_pets:"Animais de estimação fixados ou confirmados ausentes",
    piDamage_noted:"Danos pré-existentes identificados (cercas, aspersores, elementos do jardim)",
    piDamageNotesLabel:"Descreva o dano encontrado",
    piDamageNotesPlaceholder:"Localização e descrição do dano...",
    piDamagePhotoLabel:"Foto do dano (opcional)",
    piTakePhoto:"Toque para fotografar o dano",
    piNotes:"Observações Adicionais", piNotesPlaceholder:"Outras observações...",
    piSubmit:"Enviar Inspeção", piSubmitting:"Enviando...",
    piAnotherProperty:"Inspecionar Outra Propriedade",
    piIncompleteWarning:"Por favor marque todos os itens obrigatórios antes de enviar.",
    uniformTitle:"Uniforme e Aparência", uniformSubtitle:"J & J & Son Lawncare — Política para Funcionários",
    uniformFooter:"Na J & J & Son Lawncare, temos orgulho da nossa aparência. Uma equipe limpa e uniformizada reflete a qualidade, profissionalismo e os padrões do nosso trabalho.",
    uSec_purpose:"Propósito", uSec_issuance:"Entrega de Uniformes", uSec_required:"Uniforme Obrigatório",
    uSec_clean:"Limpeza e Condição", uSec_appearance:"Padrões de Aparência",
    uSec_safety:"Requisitos de Segurança", uSec_care:"Cuidado e Responsabilidade",
    uSec_replacement:"Política de Substituição", uSec_noncompliance:"Descumprimento",
    uSub_required:"Obrigatório", uSub_notAllowed:"Não Permitido", uSub_standards:"Padrões", uSub_unacceptable:"Inaceitável",
    uNote_clean:"Se o uniforme ficar excessivamente sujo, troque por um reserva limpo, se disponível.",
    uNote_care:"Negligência, perda ou mau uso pode resultar em custos de substituição cobrados ao funcionário.",
    uItems_purpose:["Todos os funcionários devem manter uma aparência limpa e profissional em todos os momentos.","As equipes representam a empresa em cada obra — profissionalismo, segurança e reputação importam."],
    uItems_issuance:["3–5 camisetas da empresa no início do emprego ou temporada","1–2 camisas de manga longa ou moletons (temporada fria)","Luvas de trabalho conforme necessário","Equipamentos adicionais conforme necessário"],
    uItems_required:["Camiseta da empresa — usada em todos os momentos","Calças ou shorts de trabalho apropriados","Botas de trabalho ou calçado de segurança adequado","Luvas quando necessário"],
    uItems_notAllowed:["Camisetas que não sejam da empresa","Roupas inadequadas no local de trabalho"],
    uItems_standards:["Limpo no início de cada dia de trabalho","Sem sujeira excessiva, manchas ou detritos","Sem rasgos, rupturas ou desgaste excessivo","Logotipos da empresa visíveis"],
    uItems_unacceptable:["Uniformes sujos do dia anterior","Roupas rasgadas ou danificadas","Odores fortes por má higiene pessoal"],
    uItems_appearance:["Higiene pessoal diária é obrigatória","A roupa deve servir bem — sem roupas muito largas","Sem logotipos inadequados","Bonés devem ser da marca ou lisos"],
    uItems_safetyReq:["Luvas obrigatórias ao manusear materiais ou operar equipamentos","EPI adicional quando necessário","Não é permitida roupa que represente risco de segurança"],
    uItems_care:["Lave e mantenha seus uniformes","Mantenha os uniformes em boas condições","Traga roupas apropriadas para as condições climáticas","A empresa substitui uniformes por desgaste normal a seu critério"],
    uItems_replacement:["Relate uniformes danificados à gerência","As substituições são aprovadas com base na condição","Solicitações excessivas podem ser negadas ou cobradas"],
    uItems_noncompliance:["Enviado para casa para se trocar","Removido do local de trabalho até estar em conformidade","Ação disciplinar por violações repetidas"],
    vehicleTitle:"Diretrizes de Veículos", vehicleSubtitle:"J & J & Son Lawncare — Política de Motoristas",
    vehicleFooter:"Dirigir com segurança protege você, seus colegas e o público. Obrigado por representar a J&J & Son Lawncare com responsabilidade.",
    vehicleAckLabel:"Li e compreendo a Política de Veículos da J&J & Son Lawncare e concordo em seguir todas as diretrizes.",
    vSec_shop:"No Depósito", vSec_road:"Na Estrada", vSec_property:"Na Propriedade",
    vItems_shop:["Certifique-se de que o caminhão e o reboque estejam trancados antes de sair","Reporte qualquer reparo ou manutenção necessária ao seu supervisor","Mantenha o veículo limpo — lave e aspire conforme necessário","Somente funcionários autorizados da J&J podem operar ou viajar em um veículo da empresa","Devolva as chaves para a caixa de chaves no depósito"],
    vItems_road:["Você deve ter uma carteira de motorista de Massachusetts válida e cartão médico DOT em todos os momentos","Obedeça todas as leis de trânsito, estacionamento e segurança viária","Somente viva-voz — o uso de celulares (incluindo mensagens) ao dirigir é estritamente proibido","Pare com segurança antes de usar o telefone se não tiver um sistema viva-voz","Não opere um veículo da empresa sob influência de álcool, drogas ou medicamentos que afetem sua capacidade de dirigir","Passageiros não autorizados não são permitidos nos veículos da empresa"],
    vItems_property:["Estacione com segurança e respeito em todos os locais de trabalho","Proteja o veículo e seu conteúdo sempre que o deixar sem vigilância","Reporte acidentes, multas, infrações de trânsito, roubos ou danos ao seu gerente em 24 horas","Coopere plenamente com as autoridades em caso de acidente"],
    eodTitle:"Lista de Fim do Dia", eodSubtitle:"Complete antes de sair por hoje",
    eodNameLabel:"Seu Nome",
    eodAckLabel:"Completei todas as tarefas de fim de dia e estou pronto para encerrar.",
    eodSubmit:"Enviar e Encerrar", eodSubmitting:"Enviando...",
    eodSec1:"Equipamentos", eodSec2:"Saída",
    eodItems1:["Guarde todas as ferramentas adicionais usadas hoje em seu lugar","Limpe os reboques de detritos e organize-os para o dia seguinte","Lave e limpe cortadores e outros equipamentos","Abasteça e armazene todos os equipamentos adequadamente","Registre quaisquer problemas de manutenção para seu supervisor"],
    eodItems2:["Registre a saída usando o sistema da empresa","Converse com seu supervisor para feedback ou atualizações","Deixe o local de apresentação limpo e organizado","Devolva as chaves de quaisquer veículos na caixa de chaves"],
    endOfDay:"Fim do Dia", endOfDayDesc:"Lista de encerramento do turno",
  },
};

const LangContext = React.createContext("en");
function useLang() { return React.useContext(LangContext); }
function useT()    { const lang = useLang(); return T[lang]; }

function FlagSelector({ lang, setLang }) {
  return (
    <div style={{display:"flex",gap:6,justifyContent:"flex-end",width:"100%",marginBottom:8}}>
      {Object.entries(FLAGS).map(([code,flag]) => (
        <button key={code} onClick={()=>{saveLang(code);setLang(code);}}
          style={{background:lang===code?"var(--bark)":"transparent",border:lang===code?"1.5px solid var(--lime)":"1.5px solid transparent",borderRadius:8,padding:"4px 8px",fontSize:18,cursor:"pointer",transition:"all 0.15s",lineHeight:1,opacity:lang===code?1:0.5}}>
          {flag}
        </button>
      ))}
    </div>
  );
}

const CONTACTS = [
  {name:"Jonny",role:"General Manager",    initials:"JF",phone:"tel:+15085550001"},
  {name:"Jon",  role:"Mowing Manager",     initials:"JG",phone:"tel:+15085550002"},
  {name:"Tom",  role:"Residential Manager",initials:"TF",phone:"tel:+15085550003"},
  {name:"Joel", role:"Commercial Manager", initials:"JS",phone:"tel:+15085550004"},
  {name:"Katie",role:"Office Manager",     initials:"KR",phone:"tel:+15085550005"},
  {name:"Nikki",role:"IT & App Support",   initials:"NS",phone:"tel:+15084048480"},
];

const TOOL_INVENTORY = [
  {category:"Hand Tools",tools:[{id:"rake",name:"Rake",total:8},{id:"shovel",name:"Shovel",total:6},{id:"hoe",name:"Garden Hoe",total:5},{id:"trowel",name:"Hand Trowel",total:10},{id:"shears",name:"Pruning Shears",total:7},{id:"loppers",name:"Loppers",total:4},{id:"pitchfork",name:"Pitchfork",total:3},{id:"broom",name:"Push Broom",total:6}]},
  {category:"Power Tools",tools:[{id:"blower",name:"Leaf Blower",total:6},{id:"trimmer",name:"String Trimmer",total:5},{id:"hedger",name:"Hedge Trimmer",total:4},{id:"chainsaw",name:"Chainsaw",total:2},{id:"edger",name:"Edger",total:3}]},
  {category:"Trailer & Hauling",tools:[{id:"tarp",name:"Heavy Tarp",total:8},{id:"straps",name:"Tie-Down Straps",total:12},{id:"ramps",name:"Loading Ramps",total:4},{id:"wheelbarrow",name:"Wheelbarrow",total:5},{id:"buckets",name:"Buckets (5gal)",total:15}]},
  {category:"Safety & PPE",tools:[{id:"gloves",name:"Work Gloves",total:20},{id:"glasses",name:"Safety Glasses",total:15},{id:"vest",name:"Safety Vest",total:10},{id:"earpro",name:"Ear Protection",total:10}]},
];

const DOT_CATEGORIES = [
  { key:"exterior", label_en:"Exterior Truck Check",      label_es:"Revisión Exterior del Camión",    label_pt:"Verificação Exterior do Caminhão" },
  { key:"trailer",  label_en:"Trailer Check",             label_es:"Revisión del Remolque",           label_pt:"Verificação do Reboque" },
  { key:"fluid",    label_en:"Fluid & Mechanical Check",  label_es:"Revisión de Fluidos y Mecánica",  label_pt:"Verificação de Fluidos e Mecânica" },
  { key:"interior", label_en:"Interior Truck Check",      label_es:"Revisión Interior del Camión",    label_pt:"Verificação Interior do Caminhão" },
  { key:"safety",   label_en:"Safety & Miscellaneous",    label_es:"Seguridad y Misceláneos",         label_pt:"Segurança e Miscelâneos" },
];



const APPS_SCRIPT_URL    = "https://script.google.com/macros/s/AKfycbzKm07D55ohLfV45KGJN7WDGUlZL3qj1Ofpfn8P5gWiWm8yyDCZjsQbpfmptsm6EcBN/exec";
const DOT_SCRIPT_URL     = "https://script.google.com/macros/s/AKfycbx8yYJxNighLi69TprjUuAhOkFOQHIpKn0AtPzXh4uYSpXGJd-XrHWCsqA5ZPy-Zl9HUQ/exec";
const DB_SCRIPT_URL      = "https://script.google.com/macros/s/AKfycbx8yYJxNighLi69TprjUuAhOkFOQHIpKn0AtPzXh4uYSpXGJd-XrHWCsqA5ZPy-Zl9HUQ/exec";
const PI_SCRIPT_URL      = "https://script.google.com/macros/s/AKfycbx8yYJxNighLi69TprjUuAhOkFOQHIpKn0AtPzXh4uYSpXGJd-XrHWCsqA5ZPy-Zl9HUQ/exec";
const SIGNIN_SCRIPT_URL  = "https://script.google.com/macros/s/AKfycbx8yYJxNighLi69TprjUuAhOkFOQHIpKn0AtPzXh4uYSpXGJd-XrHWCsqA5ZPy-Zl9HUQ/exec";
const SHEETS_ID          = "1PMRNlpefHWFVRn59wfJH1za7tfIAmftAfG9kF4-dy4Q"; // Receipts spreadsheet
const OPS_SHEETS_ID      = "1agyca6kl07KhP41b0hFvWHqVhhEOu87uworuU-E3Ub8"; // DOT, Briefing, Property Inspection, History
const SHEETS_KEY         = "AIzaSyBj9Hxi1MUSq4MBToFxqKG1QDwJBu9PyJw";

const HR_LINKS = [
  {name:"Time Off Request",  desc:"Submit Time Off Request",      url:"https://docs.google.com/forms/d/e/1FAIpQLSedVzxq3XCkB4TXwqvIGRtUVM6DRtaWmgYZtfcVZUoaAXVWeg/viewform?embedded=true"},
  {name:"Job Application",   desc:"Refer someone to the team",    url:"https://docs.google.com/forms/d/e/1FAIpQLSe405gWCY--4-chYWpku3PMaZ5zIl09W5HGCPUfDcbNuTuYYw/viewform?embedded=true"},
  {name:"Contact a Manager", desc:"Send a message to management", url:"https://docs.google.com/forms/d/e/1FAIpQLSfYI2b_yAxYk--McTBaVnToWfJjkWocWpaS6ZdJy98QaRtIIA/viewform?embedded=true"},
  {name:"Employee Handbook", desc:"Company policies & procedures",url:"https://drive.google.com/file/d/1UPIOc2q7rs7h-VQcT6Cvv4eaG_-vePGs/preview"},
  {name:"Uniform Guidelines",desc:"Dress code & uniform standards",url:"inline"},
  {name:"Vehicle Guidelines",desc:"Fleet use & driving policies", url:"inline-vehicle"},
];

function getTodayStr()  { return new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}); }
function getTimeStr()   { return new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}); }
// ── KEY FIX: Use M/D/YYYY format to match sheet storage ──
function getTodayKey()  {
  const d = new Date();
  return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
}

// ── PROPERTY INSPECTION SUB-COMPONENTS (defined outside form to prevent focus loss) ──
function PICheckRow({ck, label, required, checks, onToggle}) {
  const isChecked = !!checks[ck];
  const isFlagged = required && !isChecked;
  return (
    <div className={`pi-check-row ${isChecked?"checked":""} ${isFlagged?"flagged":""}`} onClick={()=>onToggle(ck)}>
      <div className={`pi-checkbox ${isChecked?"checked":""}`}>{isChecked&&<Ic n="check"/>}</div>
      <span className="pi-check-label">{label}</span>
    </div>
  );
}

function PISection({sk, titleKey, isOpen, onToggle, children}) {
  const t = useT();
  return (
    <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:9,marginBottom:8,overflow:"hidden"}}>
      <div onClick={()=>onToggle(sk)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",cursor:"pointer",background:isOpen?"var(--bark2)":"var(--bark)",transition:"background 0.15s"}}>
        <div style={{width:28,height:28,borderRadius:7,background:"rgba(74,109,32,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <Ic n="map" style={{width:13,height:13,color:"var(--leaf)"}}/>
        </div>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)",flex:1}}>{t[titleKey]}</span>
        <Ic n="chev" style={{width:14,height:14,color:"var(--stone)",transition:"transform 0.2s",transform:isOpen?"rotate(90deg)":"none"}}/>
      </div>
      {isOpen&&<div style={{padding:"4px 14px 14px",borderTop:"1px solid var(--moss)"}}>{children}</div>}
    </div>
  );
}

// ── PROPERTY INSPECTION FORM ──────────────────────────────────────────────────
function PropertyInspectionForm({ truck, onBack, onDone }) {
  const t = useT();
  const photoRef = useRef();
  const [name,        setName]        = useState("");
  const [property,    setProperty]    = useState("");
  const [checks,      setChecks]      = useState({});
  const [damageNotes, setDamageNotes] = useState("");
  const [notes,       setNotes]       = useState("");
  const [photoPreview,setPhotoPreview]= useState(null);
  const [photoB64,    setPhotoB64]    = useState(null);
  const [photoMime,   setPhotoMime]   = useState(null);
  const [nameErr,     setNameErr]     = useState(false);
  const [propErr,     setPropErr]     = useState(false);
  const [formErr,     setFormErr]     = useState("");
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [openSecs,    setOpenSecs]    = useState({s1:true,s2:true,s3:false});

  const togSec      = k => setOpenSecs(p=>({...p,[k]:!p[k]}));
  const toggleCheck = key => { setChecks(p=>({...p,[key]:!p[key]})); setFormErr(""); };

  const inputStyle = {width:"100%",background:"var(--bark2)",border:"1px solid var(--moss)",borderRadius:8,padding:"12px 14px",color:"var(--cream)",fontFamily:"'Barlow',sans-serif",fontSize:15};

  const CORE_CHECKS = ["parked","hazards_inspected","wet_surfaces","obstacles","pets"];

  const handlePhoto = async e => {
    const file = e.target.files?.[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(URL.createObjectURL(file));
      setPhotoB64(reader.result.split(",")[1]);
      setPhotoMime(file.type||"image/jpeg");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if(!name.trim()){setNameErr(true);return;}
    if(!property.trim()){setPropErr(true);return;}
    const allCore = CORE_CHECKS.every(k=>checks[k]);
    if(!allCore){setFormErr(t.piIncompleteWarning);return;}
    setSubmitting(true);
    try {
      await fetch(PI_SCRIPT_URL,{
        method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},
        body:JSON.stringify({
          sheet:"Property Inspection",
          date:getTodayKey(), time:getTimeStr(),
          truck:truck.label, name:name.trim(), property:property.trim(),
          checks, damageNotes, notes,
          damagePhoto:    photoB64  || null,
          damagePhotoMime:photoMime || null,
        }),
      });
      setSubmitted(true);
    } catch(e){console.warn(e);setSubmitted(true);}
    setSubmitting(false);
  };

  const resetForNext = () => {
    setProperty(""); setChecks({}); setDamageNotes(""); setNotes("");
    setPhotoPreview(null); setPhotoB64(null); setPhotoMime(null);
    setFormErr(""); setPropErr(false); setSubmitted(false);
  };

  if(submitted) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 0 16px",animation:"fadeUp 0.3s ease both"}}>
      <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(74,109,32,0.15)",border:"2px solid var(--leaf)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
        <Ic n="check" style={{width:36,height:36,color:"var(--lime)"}}/>
      </div>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"var(--lime)",letterSpacing:3,marginBottom:4}}>{t.allDone}</div>
      <div style={{fontSize:13,color:"var(--stone)",marginBottom:4}}>{property}</div>
      <div style={{fontSize:12,color:"var(--stone)",marginBottom:24}}>{truck.label} · {name}</div>
      <div style={{display:"flex",gap:8,width:"100%"}}>
        <button onClick={resetForNext} style={{flex:1,padding:"14px",background:"var(--lime)",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:2,color:"var(--earth)",cursor:"pointer"}}>{t.piAnotherProperty}</button>
        <button onClick={onDone} style={{flex:1,padding:"14px",background:"none",border:"1px solid var(--moss)",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:2,color:"var(--stone)",cursor:"pointer"}}>{t.goHome}</button>
      </div>
    </div>
  );

  return (
    <div style={{animation:"fadeUp 0.3s ease both"}}>
      {/* Header */}
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--lime)",borderRadius:10,padding:"12px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:38,height:38,borderRadius:8,background:"var(--moss)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <Ic n="map" style={{width:17,height:17,color:"var(--lime)"}}/>
        </div>
        <div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"var(--lime)",letterSpacing:2,lineHeight:1}}>{t.piTitle}</div>
          <div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{t.piSubtitle}</div>
        </div>
      </div>

      {/* Name + Property */}
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:10,padding:14,marginBottom:14}}>
        <div style={{marginBottom:12}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:2,color:nameErr?"var(--danger)":"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.piNameLabel}</div>
          <input style={{...inputStyle,borderColor:nameErr?"var(--danger)":"var(--moss)"}} type="text" placeholder={t.namePlaceholder} value={name} onChange={e=>{setName(e.target.value);setNameErr(false);}}/>
        </div>
        <div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:2,color:propErr?"var(--danger)":"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.piPropertyLabel}</div>
          <input style={{...inputStyle,borderColor:propErr?"var(--danger)":"var(--moss)"}} type="text" placeholder={t.piPropertyPlaceholder} value={property} onChange={e=>{setProperty(e.target.value);setPropErr(false);}}/>
        </div>
      </div>

      {/* Arrival */}
      <PISection sk="s1" titleKey="piSec1" isOpen={openSecs.s1} onToggle={togSec}>
        <div style={{marginTop:8}}>
          <PICheckRow ck="parked"            label={t.piArrival_parked}   required checks={checks} onToggle={toggleCheck}/>
          <PICheckRow ck="hazards_inspected" label={t.piArrival_hazards}  required checks={checks} onToggle={toggleCheck}/>
          <PICheckRow ck="unusual_reported"  label={t.piArrival_unusual}           checks={checks} onToggle={toggleCheck}/>
        </div>
      </PISection>

      {/* Safety */}
      <PISection sk="s2" titleKey="piSec2" isOpen={openSecs.s2} onToggle={togSec}>
        <div style={{marginTop:8}}>
          <PICheckRow ck="wet_surfaces" label={t.piSafety_wet}       required checks={checks} onToggle={toggleCheck}/>
          <PICheckRow ck="obstacles"    label={t.piSafety_obstacles}  required checks={checks} onToggle={toggleCheck}/>
          <PICheckRow ck="pets"         label={t.piSafety_pets}       required checks={checks} onToggle={toggleCheck}/>
        </div>
      </PISection>

      {/* Damage */}
      <PISection sk="s3" titleKey="piSec3" isOpen={openSecs.s3} onToggle={togSec}>
        <div style={{marginTop:8}}>
          <PICheckRow ck="damage_noted" label={t.piDamage_noted} checks={checks} onToggle={toggleCheck}/>
          {checks.damage_noted && (
            <div style={{animation:"fadeUp 0.2s ease both",marginTop:8}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.piDamageNotesLabel}</div>
              <textarea style={{...inputStyle,resize:"none",height:72,marginBottom:10}} placeholder={t.piDamageNotesPlaceholder} value={damageNotes} onChange={e=>setDamageNotes(e.target.value)}/>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.piDamagePhotoLabel}</div>
              <input ref={photoRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={handlePhoto}/>
              {!photoPreview ? (
                <div onClick={()=>photoRef.current.click()} style={{display:"flex",alignItems:"center",gap:10,background:"var(--bark2)",border:"1.5px dashed var(--moss)",borderRadius:8,padding:"14px",cursor:"pointer"}}>
                  <Ic n="camera" style={{width:20,height:20,color:"var(--stone)"}}/>
                  <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--stone)",letterSpacing:1}}>{t.piTakePhoto}</span>
                </div>
              ) : (
                <div style={{position:"relative"}}>
                  <img src={photoPreview} alt="damage" style={{width:"100%",borderRadius:8,border:"1px solid var(--moss)",display:"block"}}/>
                  <button onClick={()=>{setPhotoPreview(null);setPhotoB64(null);setPhotoMime(null);}} style={{position:"absolute",top:6,right:6,background:"rgba(0,0,0,0.5)",border:"none",borderRadius:"50%",width:28,height:28,color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>✕</button>
                </div>
              )}
            </div>
          )}
        </div>
      </PISection>

      {/* Notes */}
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:10,padding:14,marginBottom:14}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6,display:"flex",alignItems:"center",gap:6}}>
          {t.piNotes}<span style={{color:"var(--moss)",fontSize:11,fontWeight:400,textTransform:"none",letterSpacing:0}}>(optional)</span>
        </div>
        <textarea style={{...inputStyle,resize:"none",height:68}} placeholder={t.piNotesPlaceholder} value={notes} onChange={e=>setNotes(e.target.value)}/>
      </div>

      {formErr && <div className="error-msg" style={{marginBottom:12}}>{formErr}</div>}

      <button disabled={submitting} onClick={handleSubmit}
        style={{width:"100%",padding:"16px",background:submitting?"var(--moss)":"var(--lime)",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:3,color:"var(--earth)",cursor:submitting?"not-allowed":"pointer",marginBottom:8,transition:"background 0.2s"}}>
        {submitting?t.piSubmitting:t.piSubmit}
      </button>
      <button onClick={onBack} style={{width:"100%",padding:"12px",background:"none",border:"1px solid var(--moss)",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:2,color:"var(--stone)",cursor:"pointer"}}>{t.cancel}</button>
    </div>
  );
}

// ── DOT WALKAROUND FORM ───────────────────────────────────────────────────────
function DOTWalkaroundForm({ truck, onBack, onDone }) {
  const lang = useLang();
  const t    = useT();
  const [name,       setName]       = useState("");
  const [checks,     setChecks]     = useState({});
  const [notes,      setNotes]      = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [nameErr,    setNameErr]    = useState(false);

  const toggleCheck = key => setChecks(p=>({...p,[key]:!p[key]}));
  const totalChecked = DOT_CATEGORIES.filter(c=>checks[c.key]).length;

  const handleSubmit = async () => {
    if(!name.trim()){setNameErr(true);return;}
    setSubmitting(true);
    try {
      await fetch(DOT_SCRIPT_URL,{
        method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},
        body:JSON.stringify({sheet:"DOT walkaround",date:getTodayKey(),time:getTimeStr(),truck:truck.label,name:name.trim(),division:"",checks,notes}),
      });
      setSubmitted(true);
    } catch(e){console.warn(e);setSubmitted(true);}
    setSubmitting(false);
  };

  const inputStyle = {width:"100%",background:"var(--bark2)",border:"1px solid var(--moss)",borderRadius:8,padding:"12px 14px",color:"var(--cream)",fontFamily:"'Barlow',sans-serif",fontSize:15};

  if(submitted) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 0 16px",animation:"fadeUp 0.3s ease both"}}>
      <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(74,109,32,0.15)",border:"2px solid var(--leaf)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
        <Ic n="check" style={{width:36,height:36,color:"var(--lime)"}}/>
      </div>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"var(--lime)",letterSpacing:3,marginBottom:6}}>PASS</div>
      <div style={{fontSize:12,color:"var(--stone)",marginBottom:24}}>{truck.label} · {name}</div>
      <button onClick={onDone} style={{width:"100%",padding:"14px",background:"var(--lime)",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:2,color:"var(--earth)",cursor:"pointer"}}>{t.goHome}</button>
    </div>
  );

  return (
    <div style={{animation:"fadeUp 0.3s ease both"}}>
      {/* Header */}
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--lime)",borderRadius:10,padding:"12px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:38,height:38,borderRadius:8,background:"var(--moss)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <Ic n="dot" style={{width:17,height:17,color:"var(--lime)"}}/>
        </div>
        <div style={{flex:1}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"var(--lime)",letterSpacing:2,lineHeight:1}}>{t.dotTitle}</div>
          <div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{truck.label} · {totalChecked}/{DOT_CATEGORIES.length} sections</div>
        </div>
      </div>

      {/* Name */}
      <div style={{background:"var(--bark)",border:`1px solid ${nameErr?"var(--danger)":"var(--moss)"}`,borderRadius:10,padding:14,marginBottom:14}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:2,color:nameErr?"var(--danger)":"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.dotNameLabel}</div>
        <input style={{...inputStyle,borderColor:nameErr?"var(--danger)":"var(--moss)"}} type="text" placeholder={t.namePlaceholder} value={name} onChange={e=>{setName(e.target.value);setNameErr(false);}}/>
      </div>

      {/* One checkbox per section */}
      {DOT_CATEGORIES.map(cat=>{
        const isChecked = !!checks[cat.key];
        const label = lang==="es"?cat.label_es:lang==="pt"?cat.label_pt:cat.label_en;
        return (
          <div key={cat.key}
            onClick={()=>toggleCheck(cat.key)}
            style={{display:"flex",alignItems:"center",gap:14,background:isChecked?"rgba(74,109,32,0.06)":"var(--bark)",border:`1px solid ${isChecked?"rgba(74,109,32,0.3)":"var(--moss)"}`,borderRadius:10,padding:"16px 14px",marginBottom:8,cursor:"pointer",transition:"all 0.15s",-webkitTapHighlightColor:"transparent"}}>
            <div style={{width:26,height:26,borderRadius:7,border:`2px solid ${isChecked?"var(--lime)":"var(--moss)"}`,background:isChecked?"var(--lime)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s"}}>
              {isChecked&&<Ic n="check" style={{width:13,height:13,color:"var(--earth)"}}/>}
            </div>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,color:isChecked?"var(--lime)":"var(--cream)",flex:1,lineHeight:1.3}}>{label}</span>
          </div>
        );
      })}

      {/* Notes */}
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:10,padding:14,marginBottom:14,marginTop:4}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6,display:"flex",alignItems:"center",gap:6}}>
          {t.dotNotes}<span style={{color:"var(--moss)",fontSize:11,fontWeight:400,textTransform:"none",letterSpacing:0}}>(optional)</span>
        </div>
        <textarea style={{...inputStyle,resize:"none",height:72}} placeholder={t.dotNotesPlaceholder} value={notes} onChange={e=>setNotes(e.target.value)}/>
      </div>

      <button disabled={submitting} onClick={handleSubmit}
        style={{width:"100%",padding:"16px",background:submitting?"var(--moss)":"var(--lime)",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:3,color:"var(--earth)",cursor:submitting?"not-allowed":"pointer",marginBottom:8,transition:"background 0.2s"}}>
        {submitting?t.dotSubmitting:t.dotSubmit}
      </button>
      <button onClick={onBack} style={{width:"100%",padding:"12px",background:"none",border:"1px solid var(--moss)",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:2,color:"var(--stone)",cursor:"pointer"}}>{t.cancel}</button>
    </div>
  );
}

// ── DAILY BRIEFING FORM ───────────────────────────────────────────────────────
function DailyBriefingForm({ truck, onBack, onDone }) {
  const t = useT();
  const [name,       setName]       = useState("");
  const [acked,      setAcked]      = useState(false);
  const [nameErr,    setNameErr]    = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [openSecs,   setOpenSecs]   = useState({s1:true,s2:false,s3:false,s4:false});
  const tog = k => setOpenSecs(p=>({...p,[k]:!p[k]}));
  const inputStyle = {width:"100%",background:"var(--bark2)",border:"1px solid var(--moss)",borderRadius:8,padding:"12px 14px",color:"var(--cream)",fontFamily:"'Barlow',sans-serif",fontSize:15};

  const handleSubmit = async () => {
    if(!name.trim()){setNameErr(true);return;}
    if(!acked)return;
    setSubmitting(true);
    try {
      await fetch(DB_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},
        body:JSON.stringify({sheet:"Daily Briefing",date:getTodayKey(),time:getTimeStr(),truck:truck.label,name:name.trim()})});
      setSubmitted(true);
    } catch(e){console.warn(e);setSubmitted(true);}
    setSubmitting(false);
  };

  const Section = ({sk,titleKey,items}) => {
    const isOpen=openSecs[sk];
    return (
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:9,marginBottom:8,overflow:"hidden"}}>
        <div onClick={()=>tog(sk)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",cursor:"pointer",background:isOpen?"var(--bark2)":"var(--bark)",transition:"background 0.15s"}}>
          <div style={{width:28,height:28,borderRadius:7,background:"rgba(74,109,32,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="clip" style={{width:13,height:13,color:"var(--leaf)"}}/></div>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)",flex:1}}>{t[titleKey]}</span>
          <Ic n="chev" style={{width:14,height:14,color:"var(--stone)",transition:"transform 0.2s",transform:isOpen?"rotate(90deg)":"none"}}/>
        </div>
        {isOpen&&<div style={{padding:"4px 14px 14px",borderTop:"1px solid var(--moss)"}}>{items.map((item,i)=><div key={i} className="briefing-item">{item}</div>)}</div>}
      </div>
    );
  };

  if(submitted) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 0 16px",animation:"fadeUp 0.3s ease both"}}>
      <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(74,109,32,0.15)",border:"2px solid var(--leaf)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}><Ic n="check" style={{width:36,height:36,color:"var(--lime)"}}/></div>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"var(--lime)",letterSpacing:3,marginBottom:6}}>{t.allDone}</div>
      <div style={{fontSize:12,color:"var(--stone)",marginBottom:24}}>{truck.label} · {name}</div>
      <button onClick={onDone} style={{width:"100%",padding:"14px",background:"var(--lime)",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:2,color:"var(--earth)",cursor:"pointer"}}>{t.goHome}</button>
    </div>
  );

  return (
    <div style={{animation:"fadeUp 0.3s ease both"}}>
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--lime)",borderRadius:10,padding:"12px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:38,height:38,borderRadius:8,background:"var(--moss)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="book" style={{width:17,height:17,color:"var(--lime)"}}/></div>
        <div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"var(--lime)",letterSpacing:2,lineHeight:1}}>{t.dbTitle}</div><div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{t.dbSubtitle}</div></div>
      </div>
      <div style={{background:"var(--bark)",border:`1px solid ${nameErr?"var(--danger)":"var(--moss)"}`,borderRadius:10,padding:14,marginBottom:14}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:2,color:nameErr?"var(--danger)":"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.dbNameLabel}</div>
        <input style={{...inputStyle,borderColor:nameErr?"var(--danger)":"var(--moss)"}} type="text" placeholder={t.namePlaceholder} value={name} onChange={e=>{setName(e.target.value);setNameErr(false);}}/>
      </div>
      <Section sk="s1" titleKey="dbSec1" items={t.dbItems1}/>
      <Section sk="s2" titleKey="dbSec2" items={t.dbItems2}/>
      <Section sk="s3" titleKey="dbSec3" items={t.dbItems3}/>
      <Section sk="s4" titleKey="dbSec4" items={t.dbItems4}/>
      <div className={`briefing-ack ${acked?"checked":""}`} onClick={()=>setAcked(a=>!a)} style={{marginTop:6}}>
        <div className={`briefing-ack-box ${acked?"checked":""}`}>{acked&&<Ic n="check"/>}</div>
        <span className="briefing-ack-label">{t.dbAckLabel}</span>
      </div>
      <button disabled={submitting||!acked||!name.trim()} onClick={handleSubmit}
        style={{width:"100%",padding:"16px",marginTop:14,background:(!acked||!name.trim()||submitting)?"var(--moss)":"var(--lime)",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:3,color:"var(--earth)",cursor:(!acked||!name.trim()||submitting)?"not-allowed":"pointer",marginBottom:8,transition:"background 0.2s"}}>
        {submitting?t.dbSubmitting:t.dbSubmit}
      </button>
      <button onClick={onBack} style={{width:"100%",padding:"12px",background:"none",border:"1px solid var(--moss)",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:2,color:"var(--stone)",cursor:"pointer"}}>{t.cancel}</button>
    </div>
  );
}

// ── VEHICLE GUIDELINES ────────────────────────────────────────────────────────
function VehicleGuideInline() {
  const t = useT();
  const [open,setOpen] = useState({});
  const tog = k => setOpen(p=>({...p,[k]:!p[k]}));
  const S = ({k,icon,bg,titleKey,children}) => (
    <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:9,marginBottom:8,overflow:"hidden"}}>
      <div onClick={()=>tog(k)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",cursor:"pointer",background:open[k]?"var(--bark2)":"var(--bark)",transition:"background 0.15s"}}>
        <div style={{width:32,height:32,borderRadius:8,background:bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n={icon} style={{width:14,height:14,color:"var(--leaf)"}}/></div>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)",flex:1}}>{t[titleKey]}</span>
        <Ic n="chev" style={{width:14,height:14,color:"var(--stone)",transition:"transform 0.2s",transform:open[k]?"rotate(90deg)":"none"}}/>
      </div>
      {open[k]&&<div style={{padding:"4px 14px 14px",borderTop:"1px solid var(--moss)",animation:"fadeUp 0.2s ease both"}}>{children}</div>}
    </div>
  );
  const Items = ({items}) => (
    <ul style={{listStyle:"none",margin:"10px 0 0",display:"flex",flexDirection:"column",gap:7}}>
      {items.map((item,i)=>(
        <li key={i} style={{display:"flex",gap:8,alignItems:"flex-start",fontSize:13,color:"var(--stone)",lineHeight:1.5}}>
          <span style={{width:5,height:5,borderRadius:"50%",background:"var(--stone)",flexShrink:0,marginTop:5}}/>{item}
        </li>
      ))}
    </ul>
  );
  return (
    <div style={{animation:"fadeUp 0.3s ease both"}}>
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--lime)",borderRadius:10,padding:"14px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:40,height:40,borderRadius:8,background:"var(--moss)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="truck" style={{width:18,height:18,color:"var(--lime)"}}/></div>
        <div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--lime)",letterSpacing:2,lineHeight:1}}>{t.vehicleTitle}</div><div style={{fontSize:12,color:"var(--stone)",marginTop:3}}>{t.vehicleSubtitle}</div></div>
      </div>
      <S k="shop"     icon="box"    bg="rgba(74,109,32,0.12)"  titleKey="vSec_shop">    <Items items={t.vItems_shop}/></S>
      <S k="road"     icon="truck"  bg="rgba(160,96,16,0.1)"   titleKey="vSec_road">    <Items items={t.vItems_road}/></S>
      <S k="property" icon="map"    bg="rgba(42,90,149,0.1)"   titleKey="vSec_property"><Items items={t.vItems_property}/></S>
      <div style={{background:"rgba(74,109,32,0.07)",border:"1px solid rgba(74,109,32,0.2)",borderRadius:9,padding:"12px 14px",marginTop:4,fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--leaf)",lineHeight:1.5,letterSpacing:0.3}}>{t.vehicleFooter}</div>
    </div>
  );
}

// ── END OF DAY FORM ───────────────────────────────────────────────────────────
function EndOfDayForm({ truck, onBack, onDone }) {
  const t = useT();
  const [name,       setName]       = useState("");
  const [acked,      setAcked]      = useState(false);
  const [nameErr,    setNameErr]    = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [openSecs,   setOpenSecs]   = useState({s1:true,s2:false});
  const tog = k => setOpenSecs(p=>({...p,[k]:!p[k]}));
  const inputStyle = {width:"100%",background:"var(--bark2)",border:"1px solid var(--moss)",borderRadius:8,padding:"12px 14px",color:"var(--cream)",fontFamily:"'Barlow',sans-serif",fontSize:15};

  const handleSubmit = async () => {
    if(!name.trim()){setNameErr(true);return;}
    if(!acked)return;
    setSubmitting(true);
    try {
      await fetch(DB_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},
        body:JSON.stringify({sheet:"End of Day",date:getTodayKey(),time:getTimeStr(),truck:truck.label,name:name.trim()})});
      setSubmitted(true);
    } catch(e){console.warn(e);setSubmitted(true);}
    setSubmitting(false);
  };

  const Section = ({sk,titleKey,items}) => {
    const isOpen=openSecs[sk];
    return (
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:9,marginBottom:8,overflow:"hidden"}}>
        <div onClick={()=>tog(sk)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",cursor:"pointer",background:isOpen?"var(--bark2)":"var(--bark)",transition:"background 0.15s"}}>
          <div style={{width:28,height:28,borderRadius:7,background:"rgba(74,109,32,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="clip" style={{width:13,height:13,color:"var(--leaf)"}}/></div>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)",flex:1}}>{t[titleKey]}</span>
          <Ic n="chev" style={{width:14,height:14,color:"var(--stone)",transition:"transform 0.2s",transform:isOpen?"rotate(90deg)":"none"}}/>
        </div>
        {isOpen&&<div style={{padding:"4px 14px 14px",borderTop:"1px solid var(--moss)"}}>
          {items.map((item,i)=><div key={i} className="briefing-item">{item}</div>)}
        </div>}
      </div>
    );
  };

  if(submitted) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 0 16px",animation:"fadeUp 0.3s ease both"}}>
      <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(74,109,32,0.15)",border:"2px solid var(--leaf)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}><Ic n="check" style={{width:36,height:36,color:"var(--lime)"}}/></div>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"var(--lime)",letterSpacing:3,marginBottom:6}}>{t.allDone}</div>
      <div style={{fontSize:12,color:"var(--stone)",marginBottom:24}}>{truck.label} · {name}</div>
      <button onClick={onDone} style={{width:"100%",padding:"14px",background:"var(--lime)",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:2,color:"var(--earth)",cursor:"pointer"}}>{t.goHome}</button>
    </div>
  );

  return (
    <div style={{animation:"fadeUp 0.3s ease both"}}>
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--lime)",borderRadius:10,padding:"12px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:38,height:38,borderRadius:8,background:"var(--moss)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="sun" style={{width:17,height:17,color:"var(--lime)"}}/></div>
        <div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,color:"var(--lime)",letterSpacing:2,lineHeight:1}}>{t.eodTitle}</div><div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{t.eodSubtitle}</div></div>
      </div>
      <div style={{background:"var(--bark)",border:`1px solid ${nameErr?"var(--danger)":"var(--moss)"}`,borderRadius:10,padding:14,marginBottom:14}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:2,color:nameErr?"var(--danger)":"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.eodNameLabel}</div>
        <input style={{...inputStyle,borderColor:nameErr?"var(--danger)":"var(--moss)"}} type="text" placeholder={t.namePlaceholder} value={name} onChange={e=>{setName(e.target.value);setNameErr(false);}}/>
      </div>
      <Section sk="s1" titleKey="eodSec1" items={t.eodItems1}/>
      <Section sk="s2" titleKey="eodSec2" items={t.eodItems2}/>
      <div className={`briefing-ack ${acked?"checked":""}`} onClick={()=>setAcked(a=>!a)} style={{marginTop:6}}>
        <div className={`briefing-ack-box ${acked?"checked":""}`}>{acked&&<Ic n="check"/>}</div>
        <span className="briefing-ack-label">{t.eodAckLabel}</span>
      </div>
      <button disabled={submitting||!acked||!name.trim()} onClick={handleSubmit}
        style={{width:"100%",padding:"16px",marginTop:14,background:(!acked||!name.trim()||submitting)?"var(--moss)":"var(--lime)",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:3,color:"var(--earth)",cursor:(!acked||!name.trim()||submitting)?"not-allowed":"pointer",marginBottom:8,transition:"background 0.2s"}}>
        {submitting?t.eodSubmitting:t.eodSubmit}
      </button>
      <button onClick={onBack} style={{width:"100%",padding:"12px",background:"none",border:"1px solid var(--moss)",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:2,color:"var(--stone)",cursor:"pointer"}}>{t.cancel}</button>
    </div>
  );
}

// ── UNIFORM GUIDE ─────────────────────────────────────────────────────────────
function UniformGuideInline() {
  const t = useT();
  const [open,setOpen] = useState({});
  const tog = k => setOpen(p=>({...p,[k]:!p[k]}));
  const S = ({k,icon,bg,titleKey,children}) => (
    <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:9,marginBottom:8,overflow:"hidden"}}>
      <div onClick={()=>tog(k)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",cursor:"pointer",background:open[k]?"var(--bark2)":"var(--bark)",transition:"background 0.15s"}}>
        <div style={{width:32,height:32,borderRadius:8,background:bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n={icon} style={{width:14,height:14,color:"var(--leaf)"}}/></div>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)",flex:1}}>{t[titleKey]}</span>
        <Ic n="chev" style={{width:14,height:14,color:"var(--stone)",transition:"transform 0.2s",transform:open[k]?"rotate(90deg)":"none"}}/>
      </div>
      {open[k]&&<div style={{padding:"4px 14px 14px",borderTop:"1px solid var(--moss)",animation:"fadeUp 0.2s ease both"}}>{children}</div>}
    </div>
  );
  const Items = ({items,color}) => (<ul style={{listStyle:"none",margin:"10px 0 0",display:"flex",flexDirection:"column",gap:7}}>{items.map((item,i)=>(<li key={i} style={{display:"flex",gap:8,alignItems:"flex-start",fontSize:13,color:color||"var(--stone)",lineHeight:1.5}}><span style={{width:5,height:5,borderRadius:"50%",background:color||"var(--stone)",flexShrink:0,marginTop:5}}/>{item}</li>))}</ul>);
  const Sub = ({labelKey,danger}) => <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:2,textTransform:"uppercase",color:danger?"var(--danger)":"var(--stone)",marginTop:10}}>{t[labelKey]}</div>;
  const Note = ({noteKey}) => <div style={{marginTop:10,background:"rgba(74,109,32,0.08)",border:"1px solid rgba(74,109,32,0.2)",borderRadius:8,padding:"9px 12px",fontSize:12,color:"var(--leaf)",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:0.3,lineHeight:1.5}}>{t[noteKey]}</div>;
  return (
    <div style={{animation:"fadeUp 0.3s ease both"}}>
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--lime)",borderRadius:10,padding:"14px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:40,height:40,borderRadius:8,background:"var(--moss)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="shield" style={{width:18,height:18,color:"var(--lime)"}}/></div>
        <div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--lime)",letterSpacing:2,lineHeight:1}}>{t.uniformTitle}</div><div style={{fontSize:12,color:"var(--stone)",marginTop:3}}>{t.uniformSubtitle}</div></div>
      </div>
      <S k="purpose"      icon="clip"   bg="rgba(74,109,32,0.12)"  titleKey="uSec_purpose">     <Items items={t.uItems_purpose}/></S>
      <S k="issuance"     icon="box"    bg="rgba(74,109,32,0.12)"  titleKey="uSec_issuance">    <Items items={t.uItems_issuance}/></S>
      <S k="required"     icon="check"  bg="rgba(74,109,32,0.12)"  titleKey="uSec_required">    <Sub labelKey="uSub_required"/><Items items={t.uItems_required}/><Sub labelKey="uSub_notAllowed" danger/><Items items={t.uItems_notAllowed} color="var(--danger)"/></S>
      <S k="clean"        icon="sun"    bg="rgba(160,96,16,0.1)"   titleKey="uSec_clean">       <Sub labelKey="uSub_standards"/><Items items={t.uItems_standards}/><Sub labelKey="uSub_unacceptable" danger/><Items items={t.uItems_unacceptable} color="var(--danger)"/><Note noteKey="uNote_clean"/></S>
      <S k="appearance"   icon="shield" bg="rgba(42,90,149,0.1)"   titleKey="uSec_appearance">  <Items items={t.uItems_appearance}/></S>
      <S k="safetyReq"    icon="wrench" bg="rgba(192,68,42,0.1)"   titleKey="uSec_safety">      <Items items={t.uItems_safetyReq}/></S>
      <S k="care"         icon="undo"   bg="rgba(122,104,69,0.1)"  titleKey="uSec_care">        <Items items={t.uItems_care}/><Note noteKey="uNote_care"/></S>
      <S k="replacement"  icon="clock"  bg="rgba(160,96,16,0.1)"   titleKey="uSec_replacement"> <Items items={t.uItems_replacement}/></S>
      <S k="noncompliance"icon="del"    bg="rgba(192,68,42,0.1)"   titleKey="uSec_noncompliance"><Items items={t.uItems_noncompliance} color="var(--danger)"/></S>
      <div style={{background:"rgba(74,109,32,0.07)",border:"1px solid rgba(74,109,32,0.2)",borderRadius:9,padding:"12px 14px",marginTop:4,fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--leaf)",lineHeight:1.5,letterSpacing:0.3}}>{t.uniformFooter}</div>
    </div>
  );
}

// ── TOOLS TAB ─────────────────────────────────────────────────────────────────
function ToolsTab({ truck, checkouts, setCheckouts }) {
  const t = useT();
  const [openCats,setOpenCats] = useState({"Hand Tools":true});
  const [pending,setPending]   = useState({});
  const totalOut  = id => Object.values(checkouts).flat().filter(c=>c.toolId===id).reduce((s,c)=>s+c.qty,0);
  const available = (id,total) => total-totalOut(id);
  const myCheckouts = checkouts[truck.id]||[];
  const checkout = (toolId,toolName,qty) => { if(qty<1)return; setCheckouts(prev=>({...prev,[truck.id]:[...(prev[truck.id]||[]),{toolId,toolName,qty,time:getTimeStr(),id:Date.now()}]})); setPending(p=>({...p,[toolId]:0})); };
  const returnTool = id => setCheckouts(prev=>({...prev,[truck.id]:(prev[truck.id]||[]).filter(c=>c.id!==id)}));
  return (
    <div>
      {myCheckouts.length>0&&(<><div className="section-hd">{t.checkedOut}</div>{myCheckouts.map(co=>(<div key={co.id} className="checked-out-row"><Ic n="check" style={{width:13,height:13,color:"var(--lime)",flexShrink:0}}/><div style={{flex:1}}><div className="tool-name">{co.toolName}</div><div style={{fontSize:11,color:"var(--stone)",marginTop:1}}>{t.since(co.time)}</div></div><span className="co-qty-badge">×{co.qty}</span><button className="return-btn" onClick={()=>returnTool(co.id)}>{t.return_}</button></div>))}<div style={{height:12}}/></>)}
      <div className="section-hd">{t.toolInventory}</div>
      {TOOL_INVENTORY.map(cat=>{
        const avail=cat.tools.reduce((s,tool)=>s+available(tool.id,tool.total),0);const isOpen=openCats[cat.category];
        return (<div key={cat.category}><div className="tool-cat-header" onClick={()=>setOpenCats(o=>({...o,[cat.category]:!o[cat.category]}))}>
          <Ic n="box" style={{width:15,height:15,color:"var(--leaf)",flexShrink:0}}/><span className="tool-cat-label">{cat.category}</span><span className="tool-cat-count">{t.avail(avail)}</span><Ic n="chev" className={`chevron ${isOpen?"open":""}`} style={{marginLeft:4}}/>
        </div>
        {isOpen&&cat.tools.map(tool=>{const avl=available(tool.id,tool.total);const qty=pending[tool.id]??0;return(<div key={tool.id} className="tool-row"><div className="tool-info"><div className="tool-name">{tool.name}</div><div className={`tool-avail ${avl===0?"none":avl<=2?"low":"ok"}`}>{avl===0?t.noneAvail:t.of(avl,tool.total)}</div></div>{avl>0&&(<div className="qty-row"><button className="qty-btn" disabled={qty<=0} onClick={()=>setPending(p=>({...p,[tool.id]:Math.max(0,(p[tool.id]??0)-1)}))}> − </button><span className="qty-num">{qty}</span><button className="qty-btn" disabled={qty>=avl} onClick={()=>setPending(p=>({...p,[tool.id]:Math.min(avl,(p[tool.id]??0)+1)}))}> + </button><button className="checkout-btn" disabled={qty<1} onClick={()=>checkout(tool.id,tool.name,qty)}>{t.checkOut}</button></div>)}{avl===0&&<span style={{fontSize:11,color:"var(--danger)",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>{t.allOut}</span>}</div>);})}
        </div>);
      })}
    </div>
  );
}

function ContactDropdown() {
  const t = useT();
  const [open,setOpen]=useState(false);
  const [selected,setSelected]=useState(null);
  return (
    <div>
      <div className="truck-dropdown-wrap">
        <div className={`truck-dropdown-btn ${open?"open":""}`} onClick={()=>setOpen(o=>!o)}>
          <Ic n="phone" style={{width:16,height:16,color:selected?"var(--lime)":"var(--stone)"}}/>
          {selected?<span className="truck-dropdown-value">{selected.name} — {selected.role}</span>:<span className="truck-dropdown-placeholder">{t.chooseMgr}</span>}
          <Ic n="chevD" className={`truck-dropdown-chevron ${open?"open":""}`} style={{width:16,height:16}}/>
        </div>
        {open&&(<div className="truck-dropdown-list">{CONTACTS.map(c=>(<div key={c.name} className={`truck-dropdown-item ${selected?.name===c.name?"selected":""}`} onClick={()=>{setSelected(c);setOpen(false);}}><div style={{width:28,height:28,borderRadius:"50%",background:"var(--moss)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"'Bebas Neue',sans-serif",fontSize:12,color:"var(--lime)",letterSpacing:1}}>{c.initials}</div><div><div style={{fontWeight:500,fontSize:14,color:"var(--cream)"}}>{c.name}</div><div style={{fontSize:12,color:"var(--stone)",marginTop:1}}>{c.role}</div></div>{selected?.name===c.name&&<Ic n="check" style={{width:14,height:14,marginLeft:"auto",color:"var(--lime)"}}/>}</div>))}</div>)}
      </div>
      {selected&&(<div className="contact-card" style={{marginTop:10}}><div className="contact-avatar">{selected.initials}</div><div className="contact-info"><div className="contact-name">{selected.name}</div><div className="contact-role">{selected.role}</div></div><a href={selected.phone} className="call-btn"><Ic n="phone"/></a></div>)}
    </div>
  );
}

// ── HOME TAB ──────────────────────────────────────────────────────────────────
function HomeTab({ truck, division, onOpenDOT, onOpenBriefing, onOpenPropInspect, onOpenEOD, dotComplete, briefingComplete, propInspectCount, eodComplete }) {
  const t   = useT();
  const day = getTodayStr();
  return (
    <div>
      <div className="greeting">
        <div className="greeting-icon"><Ic n="truck"/></div>
        <div><div className="greet-name">{truck.label}</div><div className="greet-sub">{day}</div></div>
      </div>
      <div className="section-hd">{t.dailyForms}</div>

      {/* Daily Briefing */}
      <div className="action-card" onClick={briefingComplete?undefined:onOpenBriefing} style={{opacity:briefingComplete?0.75:1,cursor:briefingComplete?"default":"pointer"}}>
        <div className="action-card-icon" style={{background:briefingComplete?"rgba(74,109,32,0.2)":"var(--moss)"}}>
          <Ic n={briefingComplete?"check":"book"} style={{width:18,height:18,color:"var(--lime)"}}/>
        </div>
        <div className="action-card-info">
          <div className="action-card-name">{t.dailyBriefing}</div>
          <div className="action-card-desc">{t.dailyBriefingDesc}</div>
          <span className={`status-chip ${briefingComplete?"chip-done":"chip-pending"}`}>{briefingComplete?t.done:t.pending}</span>
        </div>
        {!briefingComplete&&<div className="action-card-arrow"><Ic n="chev"/></div>}
      </div>

      {/* DOT Walk-Around */}
      <div className="action-card" onClick={dotComplete?undefined:onOpenDOT} style={{opacity:dotComplete?0.75:1,cursor:dotComplete?"default":"pointer"}}>
        <div className="action-card-icon" style={{background:dotComplete?"rgba(74,109,32,0.2)":"var(--moss)"}}>
          <Ic n={dotComplete?"check":"dot"} style={{width:18,height:18,color:"var(--lime)"}}/>
        </div>
        <div className="action-card-info">
          <div className="action-card-name">{t.dotCheck}</div>
          <div className="action-card-desc">{t.dotDesc}</div>
          <span className={`status-chip ${dotComplete?"chip-done":"chip-pending"}`}>{dotComplete?t.done:t.pending}</span>
        </div>
        {!dotComplete&&<div className="action-card-arrow"><Ic n="chev"/></div>}
      </div>

      {/* Property Inspection */}
      <div className="action-card" onClick={onOpenPropInspect}>
        <div className="action-card-icon" style={{background:propInspectCount>0?"rgba(74,109,32,0.2)":"var(--moss)"}}>
          <Ic n="map" style={{width:18,height:18,color:"var(--lime)"}}/>
        </div>
        <div className="action-card-info">
          <div className="action-card-name">{t.propInspect}</div>
          <div className="action-card-desc">{t.propInspectDesc}</div>
          <span className={`status-chip ${propInspectCount>0?"chip-done":"chip-pending"}`}>
            {propInspectCount>0?`${propInspectCount} done`:t.pending}
          </span>
        </div>
        <div className="action-card-arrow"><Ic n="chev"/></div>
      </div>

      {/* End of Day */}
      <div className="action-card" onClick={eodComplete?undefined:onOpenEOD} style={{opacity:eodComplete?0.75:1,cursor:eodComplete?"default":"pointer"}}>
        <div className="action-card-icon" style={{background:eodComplete?"rgba(74,109,32,0.2)":"var(--moss)"}}>
          <Ic n={eodComplete?"check":"sun"} style={{width:18,height:18,color:"var(--lime)"}}/>
        </div>
        <div className="action-card-info">
          <div className="action-card-name">{t.endOfDay}</div>
          <div className="action-card-desc">{t.endOfDayDesc}</div>
          <span className={`status-chip ${eodComplete?"chip-done":"chip-pending"}`}>{eodComplete?t.done:t.pending}</span>
        </div>
        {!eodComplete&&<div className="action-card-arrow"><Ic n="chev"/></div>}
      </div>

      <div className="section-hd" style={{marginTop:8}}>{t.contactMgr}</div>
      <ContactDropdown/>
    </div>
  );
}

// ── RECEIPT FLOW ──────────────────────────────────────────────────────────────
function NativeReceiptFlow({ truckLabel, divisionLabel, onGoHome, onClose }) {
  const t = useT();
  const today = getTodayKey();
  const [step,setStep]=useState("form");
  const [submitting,setSubmitting]=useState(false);
  const [uploading,setUploading]=useState(false);
  const [photoUrl,setPhotoUrl]=useState("");
  const [formErr,setFormErr]=useState("");
  const photoRef=useRef();
  const [fields,setFields]=useState({name:"",division:divisionLabel||"",type:"",gallons:"",fuelType:"",atShop:null,vendor:"",total:"",notes:""});
  const set=(k,v)=>{setFields(f=>({...f,[k]:v}));setFormErr("");};
  const isFuel=fields.type===t.fuel;const isWalkIn=!truckLabel;const displayTruck=truckLabel||"General Submission";
  const validate=()=>{if(!fields.name.trim())return t.errName;if(!fields.division)return t.errDivision;if(!fields.type)return t.errType;if(isFuel){if(!fields.gallons.trim())return t.errGallons;if(!fields.fuelType)return t.errFuelType;if(fields.atShop===null)return t.errLocation;if(fields.atShop===false&&!fields.total.trim())return t.errCost;}else{if(!fields.vendor.trim())return t.errVendor;if(!fields.total.trim())return t.errTotal;}return null;};
  const toBase64=file=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(",")[1]);r.onerror=rej;r.readAsDataURL(file);});
  const handleSubmit=async()=>{const err=validate();if(err){setFormErr(err);return;}setSubmitting(true);try{await fetch(APPS_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify({sheet:"Receipts",date:today,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),name:fields.name,truck:displayTruck,division:fields.division,type:fields.type,vendor:isFuel?"Fuel":fields.vendor,gallons:isFuel?fields.gallons:"",fuelType:isFuel?fields.fuelType:"",location:isFuel?(fields.atShop?"Shop":"Gas Station"):"",total:isFuel?(fields.atShop?"":fields.total):fields.total,notes:fields.notes,sendEmail:true,emailTo:"admin@jandjandsonlawncare.com"})});setStep("photo");}catch(e){console.warn(e);}setSubmitting(false);};
  const handlePhoto=async e=>{const file=e.target.files?.[0];if(!file)return;setUploading(true);try{const b64=await toBase64(file);await fetch(APPS_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},body:JSON.stringify({sheet:"Receipts",photo:b64,photoMime:file.type||"image/jpeg",photoName:`receipt_${displayTruck.replace(/\s/g,"_")}_${Date.now()}.jpg`,photoOnly:true})});setPhotoUrl(URL.createObjectURL(file));setStep("success");}catch(e){console.warn(e);}setUploading(false);};
  const reset=()=>{setStep("form");setPhotoUrl("");setFormErr("");setFields({name:"",division:divisionLabel||"",type:"",gallons:"",fuelType:"",atShop:null,vendor:"",total:"",notes:""});};
  const inputStyle={width:"100%",background:"var(--bark2)",border:"1px solid var(--moss)",borderRadius:8,padding:"12px 14px",color:"var(--cream)",fontFamily:"'Barlow',sans-serif",fontSize:15};
  const StepBar=({done})=>(<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>{["Details","Photo"].map((sl,i)=>{const active=done>i;const current=done===i;return(<React.Fragment key={i}>{i>0&&<div style={{flex:1,height:2,background:active?"var(--lime)":"var(--moss)",borderRadius:1}}/>}<div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:24,height:24,borderRadius:"50%",background:active?"var(--moss)":current?"var(--lime)":"transparent",border:`2px solid ${active||current?"var(--lime)":"var(--moss)"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{active?<Ic n="check" style={{width:12,height:12,color:"var(--earth)"}}/>:<span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:current?"var(--earth)":"var(--stone)"}}>{i+1}</span>}</div><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,letterSpacing:1,color:active?"var(--stone)":current?"var(--lime)":"var(--stone)",textDecoration:active?"line-through":"none"}}>{sl}</span></div></React.Fragment>);})}</div>);

  if(step==="form")return(
    <div style={{animation:"fadeUp 0.3s ease both"}}>
      <StepBar done={0}/>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:3,color:"var(--stone)",marginBottom:10}}>{t.part1}</div>
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:12,padding:16,marginBottom:14}}>
        <div style={{marginBottom:14}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.yourName}</div><input style={inputStyle} type="text" placeholder={t.namePlaceholder} value={fields.name} onChange={e=>set("name",e.target.value)}/></div>
        {!isWalkIn&&(<div style={{marginBottom:14}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.truck}</div><div style={{...inputStyle,color:"var(--stone)",background:"var(--bark)",cursor:"default",display:"flex",alignItems:"center",gap:8}}><Ic n="truck" style={{width:14,height:14,flexShrink:0}}/>{truckLabel}</div></div>)}
        <div style={{marginBottom:14}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.division}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>{[t.maintenance,t.construction].map(o=>(<button key={o} onClick={()=>set("division",o)} style={{background:fields.division===o?"rgba(74,109,32,0.15)":"var(--bark2)",border:`1.5px solid ${fields.division===o?"var(--lime)":"var(--moss)"}`,borderRadius:8,padding:"11px 6px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:600,color:fields.division===o?"var(--lime)":"var(--stone)",cursor:"pointer",transition:"all 0.15s"}}>{o}</button>))}</div></div>
        <div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.receiptType}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>{[t.fuel,t.materials,t.toolsSupplies,t.other].map(o=>(<button key={o} onClick={()=>{set("type",o);set("gallons","");set("fuelType","");set("atShop",null);set("vendor","");set("total","");}} style={{background:fields.type===o?"rgba(74,109,32,0.15)":"var(--bark2)",border:`1.5px solid ${fields.type===o?"var(--lime)":"var(--moss)"}`,borderRadius:8,padding:"11px 6px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:600,color:fields.type===o?"var(--lime)":"var(--stone)",cursor:"pointer",transition:"all 0.15s"}}>{o}</button>))}</div></div>
      </div>
      {isFuel&&(<div style={{animation:"fadeUp 0.25s ease both"}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:3,color:"var(--warn)",marginBottom:10,display:"flex",alignItems:"center",gap:8}}>{t.part2Fuel}<span style={{flex:1,height:1,background:"rgba(160,96,16,0.3)",display:"block"}}/></div><div style={{background:"var(--bark)",border:"1.5px solid rgba(160,96,16,0.3)",borderLeft:"4px solid var(--warn)",borderRadius:12,padding:16,marginBottom:14}}><div style={{marginBottom:14}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.gallons}</div><input style={inputStyle} type="number" inputMode="decimal" placeholder={t.gallonsPlaceholder} value={fields.gallons} onChange={e=>set("gallons",e.target.value)}/></div><div style={{marginBottom:14}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.fuelType}</div><div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7}}>{[t.regular,t.diesel,t.premium].map(o=>(<button key={o} onClick={()=>set("fuelType",o)} style={{background:fields.fuelType===o?"rgba(74,109,32,0.15)":"var(--bark2)",border:`1.5px solid ${fields.fuelType===o?"var(--lime)":"var(--moss)"}`,borderRadius:8,padding:"11px 6px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:600,color:fields.fuelType===o?"var(--lime)":"var(--stone)",cursor:"pointer",transition:"all 0.15s"}}>{o}</button>))}</div></div><div style={{marginBottom:fields.atShop===false?14:0}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.whereDidYouFuel}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>{[{label:t.atShop,val:true},{label:t.gasStation,val:false}].map(({label,val})=>(<button key={label} onClick={()=>{set("atShop",val);if(val)set("total","");}} style={{background:fields.atShop===val?"rgba(74,109,32,0.15)":"var(--bark2)",border:`1.5px solid ${fields.atShop===val?"var(--lime)":"var(--moss)"}`,borderRadius:8,padding:"11px 6px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:600,color:fields.atShop===val?"var(--lime)":"var(--stone)",cursor:"pointer",transition:"all 0.15s"}}>{label}</button>))}</div></div>{fields.atShop===false&&(<div style={{animation:"fadeUp 0.2s ease both"}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.totalCost}</div><input style={inputStyle} type="number" inputMode="decimal" placeholder="0.00" value={fields.total} onChange={e=>set("total",e.target.value)}/></div>)}{fields.atShop===true&&(<div style={{marginTop:12,background:"rgba(74,109,32,0.08)",border:"1px solid rgba(74,109,32,0.25)",borderRadius:8,padding:"10px 12px",fontSize:12,color:"var(--leaf)",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:0.5}}>{t.shopConfirm}</div>)}</div></div>)}
      {fields.type&&!isFuel&&(<div style={{animation:"fadeUp 0.25s ease both"}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:3,color:"var(--stone)",marginBottom:10}}>{t.part2Purchase}</div><div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:12,padding:16,marginBottom:14}}><div style={{marginBottom:14}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.vendor}</div><input style={inputStyle} type="text" placeholder={t.vendorPlaceholder} value={fields.vendor} onChange={e=>set("vendor",e.target.value)}/></div><div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.totalAmount}</div><input style={inputStyle} type="number" inputMode="decimal" placeholder="0.00" value={fields.total} onChange={e=>set("total",e.target.value)}/></div></div></div>)}
      {fields.type&&(<div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:12,padding:16,marginBottom:14,animation:"fadeUp 0.2s ease both"}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6,display:"flex",alignItems:"center",gap:6}}>{t.notes}<span style={{color:"var(--moss)",fontSize:11,letterSpacing:1,textTransform:"none",fontWeight:400}}>(optional)</span></div><textarea style={{...inputStyle,resize:"none",height:76}} placeholder={t.notesPlaceholder} value={fields.notes} onChange={e=>set("notes",e.target.value)}/></div>)}
      {formErr&&<div className="error-msg" style={{marginBottom:12}}>{formErr}</div>}
      <button disabled={submitting} onClick={handleSubmit} style={{width:"100%",padding:"16px",background:submitting?"var(--moss)":"var(--lime)",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:3,color:"var(--earth)",cursor:submitting?"not-allowed":"pointer",marginBottom:8,transition:"background 0.2s"}}>{submitting?t.saving:t.nextPhoto}</button>
      {onClose&&<button onClick={onClose} style={{width:"100%",padding:"12px",background:"none",border:"1px solid var(--moss)",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:2,color:"var(--stone)",cursor:"pointer"}}>{t.cancel}</button>}
    </div>
  );
  if(step==="photo")return(
    <div style={{animation:"fadeUp 0.3s ease both"}}>
      <StepBar done={1}/>
      <div className="success-banner" style={{marginBottom:16}}><Ic n="check" style={{width:14,height:14,flexShrink:0}}/> {t.receiptSaved}</div>
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:12,padding:16,marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}><div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,color:"var(--cream)"}}>{fields.name}</div><div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{displayTruck} · {fields.division}</div></div><div style={{textAlign:"right"}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--lime)",lineHeight:1}}>{isFuel&&fields.atShop?`${fields.gallons} gal`:`$${fields.total}`}</div><div style={{fontSize:11,color:"var(--stone)",marginTop:2}}>{fields.type}{isFuel?` · ${fields.fuelType}`:""}</div></div></div>{isFuel&&<div style={{fontSize:12,color:"var(--stone)"}}>{fields.atShop?t.atShop:t.gasStation}{fields.gallons?` · ${fields.gallons} gal`:""}</div>}{!isFuel&&<div style={{fontSize:12,color:"var(--stone)"}}>{fields.vendor}</div>}</div>
      <div style={{fontSize:13,color:"var(--stone)",marginBottom:10}}>{t.photoDesc}</div>
      <input ref={photoRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={handlePhoto}/>
      <div className="receipt-upload" onClick={()=>!uploading&&photoRef.current.click()} style={{opacity:uploading?0.6:1,marginBottom:12,borderColor:uploading?"var(--moss)":"var(--leaf)",padding:"28px 16px"}}>
        <Ic n="camera" style={{width:32,height:32,color:uploading?"var(--stone)":"var(--lime)"}}/>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,letterSpacing:1,color:uploading?"var(--stone)":"var(--cream)"}}>{uploading?t.uploading:t.tapCamera}</span>
        <span style={{fontSize:11,color:"var(--stone)"}}>{t.required}</span>
      </div>
    </div>
  );
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 0 16px",animation:"fadeUp 0.3s ease both"}}>
      <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(74,109,32,0.15)",border:"2px solid var(--leaf)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}><Ic n="check" style={{width:36,height:36,color:"var(--lime)"}}/></div>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"var(--lime)",letterSpacing:3,marginBottom:4}}>{t.allDone}</div>
      <div style={{fontSize:13,color:"var(--stone)",textAlign:"center",marginBottom:4}}>{isFuel?`${fields.gallons} gal ${fields.fuelType}`:`${fields.vendor} · $${fields.total}`}</div>
      <div style={{fontSize:12,color:"var(--stone)",marginBottom:20}}>{fields.type} · {displayTruck} · {fields.division}</div>
      {photoUrl&&<img src={photoUrl} alt="receipt" style={{width:"100%",borderRadius:8,border:"1px solid var(--moss)",marginBottom:16}}/>}
      <div style={{display:"flex",gap:8,width:"100%"}}>
        <button onClick={reset} style={{flex:1,padding:"14px",background:"var(--lime)",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:2,color:"var(--earth)",cursor:"pointer"}}>{t.submitAnother}</button>
        <button onClick={onGoHome||onClose} style={{flex:1,padding:"14px",background:"none",border:"1px solid var(--moss)",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:2,color:"var(--stone)",cursor:"pointer"}}>{onGoHome?t.goHome:t.done}</button>
      </div>
    </div>
  );
}

function HRContent({link}){
  if(link.name==="Uniform Guidelines") return <UniformGuideInline/>;
  if(link.name==="Vehicle Guidelines") return <VehicleGuideInline/>;
  return<iframe src={link.url} style={{width:"100%",height:"calc(100dvh - 180px)",border:"none",display:"block",borderRadius:8}} title={link.name}/>;
}}
function HRTab(){const t=useT();const[openHR,setOpenHR]=useState(null);return(<div>{!openHR?(<><div className="section-hd">HR &amp; Employee Portal</div>{HR_LINKS.map(f=>(<div key={f.name} style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--mgr)",borderRadius:9,padding:"13px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:f.url?"pointer":"default",opacity:f.url?1:0.6}} onClick={()=>{if(f.url)setOpenHR(f);}}><div style={{width:34,height:34,borderRadius:8,background:"rgba(74,122,181,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="shield" style={{width:15,height:15,color:"var(--mgr-lt)"}}/></div><div style={{flex:1}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)"}}>{f.name}</div><div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{f.desc}</div></div>{f.url?<Ic n="chev" style={{width:16,height:16,color:"var(--moss)"}}/>:<span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:1,color:"var(--stone)",textTransform:"uppercase"}}>{t.comingSoon}</span>}</div>))}</>):(<div style={{animation:"fadeUp 0.3s ease both"}}><button className="back-btn" style={{marginBottom:14}} onClick={()=>setOpenHR(null)}><Ic n="back"/> {t.backHR}</button><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,color:"var(--cream)",marginBottom:10}}>{openHR.name}</div><HRContent link={openHR}/></div>)}</div>);}
function ReceiptTab({truck,division,onGoHome}){return(<div style={{padding:"16px 16px 100px"}}><div className="section-hd">Submit a Receipt</div><NativeReceiptFlow truckLabel={truck.label} divisionLabel={division} onGoHome={onGoHome}/></div>);}

// ── FORM STATE PERSISTENCE ────────────────────────────────────────────────────
// Saves DOT/Briefing/PropInspect completion per truck, expires at 11pm same day
function getFormStateKey(truckId) { return `jj_forms_${truckId}`; }

function loadFormState(truckId) {
  try {
    const raw = localStorage.getItem(getFormStateKey(truckId));
    if (!raw) return null;
    const state = JSON.parse(raw);
    const now = new Date();
    const expiry = new Date();
    expiry.setHours(23, 0, 0, 0); // 11pm today
    // Expire if saved on a different day or after 11pm
    if (state.date !== getTodayDateStr()) { localStorage.removeItem(getFormStateKey(truckId)); return null; }
    if (now > expiry) { localStorage.removeItem(getFormStateKey(truckId)); return null; }
    return state;
  } catch(e) { return null; }
}

function saveFormState(truckId, dot, briefing, propCount, eod) {
  try {
    localStorage.setItem(getFormStateKey(truckId), JSON.stringify({
      date: getTodayDateStr(),
      dotComplete: dot,
      briefingComplete: briefing,
      propInspectCount: propCount,
      eodComplete: eod,
    }));
  } catch(e) {}
}

// ── TRUCK HOME ────────────────────────────────────────────────────────────────
function TruckHome({ truck, initialDivision, onLogout, checkouts, setCheckouts }) {
  const t = useT();
  const saved = loadFormState(truck.id);
  const [tab,              setTab]             = useState("home");
  const [activeForm,       setActiveForm]      = useState(null);
  const [dotComplete,      setDotComplete]     = useState(saved?.dotComplete      || false);
  const [briefingComplete, setBriefingComplete]= useState(saved?.briefingComplete || false);
  const [propInspectCount, setPropInspectCount]= useState(saved?.propInspectCount || 0);
  const [eodComplete,      setEodComplete]     = useState(saved?.eodComplete      || false);
  const [division]                             = useState(initialDivision||"");
  const myCheckoutCount = (checkouts[truck.id]||[]).reduce((s,c)=>s+c.qty,0);

  useEffect(() => {
    saveFormState(truck.id, dotComplete, briefingComplete, propInspectCount, eodComplete);
  }, [dotComplete, briefingComplete, propInspectCount, eodComplete, truck.id]);

  return (
    <div className="screen">
      <div className="topbar">
        <div className="topbar-left"><div className="topbar-title">J&amp;J &amp; Son</div><div className="truck-pill"><Ic n="truck"/>{truck.label}</div></div>
        <button className="logout-btn" onClick={onLogout}>{t.signOut}</button>
      </div>
      <div className="content" style={{padding:tab==="receipt"?"0":undefined}}>
        {tab==="home"&&!activeForm&&
          <HomeTab truck={truck} division={division}
            onOpenDOT={()=>setActiveForm("dot")}
            onOpenBriefing={()=>setActiveForm("briefing")}
            onOpenPropInspect={()=>setActiveForm("propinspect")}
            onOpenEOD={()=>setActiveForm("eod")}
            dotComplete={dotComplete}
            briefingComplete={briefingComplete}
            propInspectCount={propInspectCount}
            eodComplete={eodComplete}
          />
        }
        {tab==="home"&&activeForm==="dot"&&(
          <div><button className="back-btn" style={{marginBottom:14}} onClick={()=>setActiveForm(null)}><Ic n="back"/> {t.back}</button>
          <DOTWalkaroundForm truck={truck} onBack={()=>setActiveForm(null)} onDone={()=>{setActiveForm(null);setDotComplete(true);setTab("home");}}/></div>
        )}
        {tab==="home"&&activeForm==="briefing"&&(
          <div><button className="back-btn" style={{marginBottom:14}} onClick={()=>setActiveForm(null)}><Ic n="back"/> {t.back}</button>
          <DailyBriefingForm truck={truck} onBack={()=>setActiveForm(null)} onDone={()=>{setActiveForm(null);setBriefingComplete(true);setTab("home");}}/></div>
        )}
        {tab==="home"&&activeForm==="propinspect"&&(
          <div><button className="back-btn" style={{marginBottom:14}} onClick={()=>setActiveForm(null)}><Ic n="back"/> {t.back}</button>
          <PropertyInspectionForm truck={truck} onBack={()=>setActiveForm(null)} onDone={()=>{setActiveForm(null);setPropInspectCount(c=>c+1);setTab("home");}}/></div>
        )}
        {tab==="home"&&activeForm==="eod"&&(
          <div><button className="back-btn" style={{marginBottom:14}} onClick={()=>setActiveForm(null)}><Ic n="back"/> {t.back}</button>
          <EndOfDayForm truck={truck} onBack={()=>setActiveForm(null)} onDone={()=>{setActiveForm(null);setEodComplete(true);setTab("home");}}/></div>
        )}
        {tab==="receipt"&&<ReceiptTab truck={truck} division={division} onGoHome={()=>setTab("home")}/>}
        {tab==="tools"  &&<ToolsTab truck={truck} checkouts={checkouts} setCheckouts={setCheckouts}/>}
        {tab==="hr"     &&<HRTab/>}
      </div>
      <nav className="bottom-nav">
        <button className={`bnav-btn ${tab==="home"?"active":""}`}    onClick={()=>{setTab("home");setActiveForm(null);}}><Ic n="home"/>{t.home}</button>
        <button className={`bnav-btn ${tab==="receipt"?"active":""}`} onClick={()=>setTab("receipt")}><Ic n="camera"/>{t.receipts}</button>
        <button className={`bnav-btn ${tab==="tools"?"active":""}`}   onClick={()=>setTab("tools")} style={{position:"relative"}}>
          <Ic n="wrench"/>{t.tools}
          {myCheckoutCount>0&&<span style={{position:"absolute",top:6,right:"50%",transform:"translateX(8px)",background:"var(--warn)",borderRadius:"50%",width:15,height:15,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",color:"var(--earth)"}}>{myCheckoutCount}</span>}
        </button>
        <button className={`bnav-btn ${tab==="hr"?"active":""}`}      onClick={()=>setTab("hr")}><Ic n="shield"/>{t.hr}</button>
      </nav>
    </div>
  );
}

// ── MANAGER ───────────────────────────────────────────────────────────────────
function ManagerZone({ onLogout }) {
  const [history,     setHistory]    = useState([]);
  const [receipts,    setReceipts]   = useState([]);
  const [tab,         setTab]        = useState("forms");
  const [loading,     setLoading]    = useState(false);
  const [lastRefresh, setLastRefresh]= useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [r1, r2] = await Promise.all([
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${OPS_SHEETS_ID}/values/History?key=${SHEETS_KEY}`).then(r=>r.json()),
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/Receipts?key=${SHEETS_KEY}`).then(r=>r.json()),
      ]);

      // History: skip header, take last 50, reverse so newest first
      // Cols: Date=0, Time=1, Type=2, Truck=3, Employee=4, Detail=5, Status=6
      const hRows = (r1.values||[]).slice(1).slice(-50).reverse();
      setHistory(hRows.map(r=>({
        date:r[0]||"", time:r[1]||"", type:r[2]||"",
        truck:r[3]||"", name:r[4]||"", detail:r[5]||"", status:r[6]||"",
      })));

      // Receipts: skip header, take last 50, reverse so newest first
      // Cols: Date=0, Time=1, Truck=2, Division=3, Type=4, Total=5, Vendor=6, Photo=7
      const rRows = (r2.values||[]).slice(1).slice(-50).reverse();
      setReceipts(rRows.map(r=>({
        date:r[0]||"", time:r[1]||"", truck:r[2]||"",
        type:r[4]||"", total:r[5]||"", merchant:r[6]||"", photo:!!r[7],
      })));

      setLastRefresh(new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}));
    } catch(e){ console.warn("Fetch failed",e); }
    setLoading(false);
  };

  useEffect(()=>{
    fetchAll();
    const interval = setInterval(fetchAll, 10*60*1000);
    return ()=>clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const StatusBadge = ({status}) => {
    const pass = status && (status.startsWith("PASS") || status==="ACKNOWLEDGED" || status==="COMPLETE");
    const fail = status && (status.startsWith("FLAG") || status==="INCOMPLETE");
    const bg  = pass?"rgba(74,109,32,0.12)":fail?"rgba(192,68,42,0.12)":"var(--bark2)";
    const col = pass?"var(--lime)":fail?"var(--danger)":"var(--stone)";
    const bdr = pass?"var(--leaf)":fail?"var(--danger)":"var(--moss)";
    const lbl = status==="ACKNOWLEDGED"?"✓ Done":pass?"✓ "+status:fail?"✗ "+status:status||"—";
    return (
      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:1,
        background:bg,border:`1px solid ${bdr}`,borderRadius:4,padding:"2px 8px",
        color:col,textTransform:"uppercase",flexShrink:0,whiteSpace:"nowrap"}}>
        {lbl}
      </span>
    );
  };

  const TypePill = ({type}) => {
    const map = {
      "Daily Briefing":     {lbl:"Briefing", bg:"rgba(42,90,149,0.12)",  col:"var(--mgr-lt)"},
      "DOT Walk-Around":    {lbl:"DOT",      bg:"rgba(160,96,16,0.12)",  col:"var(--warn)"},
      "Property Inspection":{lbl:"Property", bg:"rgba(74,109,32,0.12)",  col:"var(--leaf)"},
      "End of Day":         {lbl:"End of Day",bg:"rgba(122,104,69,0.12)",col:"var(--dirt)"},
    };
    const c = map[type]||{lbl:type, bg:"var(--bark2)", col:"var(--stone)"};
    return (
      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:10,letterSpacing:1,
        background:c.bg,borderRadius:4,padding:"2px 7px",color:c.col,textTransform:"uppercase",flexShrink:0}}>
        {c.lbl}
      </span>
    );
  };

  const EmptyState = ({msg}) => (
    <div style={{textAlign:"center",padding:"48px 0",color:"var(--stone)",
      fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,letterSpacing:1,textTransform:"uppercase"}}>
      {loading?"Loading...":msg}
    </div>
  );

  const todayLabel = new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});

  return (
    <div className="screen" style={{background:"#ddd9d0"}}>
      <div className="mgr-topbar">
        <div style={{display:"flex",flexDirection:"column"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <Ic n="shield" style={{width:15,height:15,color:"var(--mgr-lt)"}}/>
            <div className="mgr-topbar-title">Manager Zone</div>
          </div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--stone)",letterSpacing:1,marginTop:1}}>{todayLabel}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span className="mgr-badge">Admin</span>
          <button className="logout-btn" onClick={onLogout}>Out</button>
        </div>
      </div>

      <div className="content" style={{background:"#ddd9d0"}}>
        {/* Refresh bar */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
          {lastRefresh
            ?<span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--stone)",letterSpacing:0.5}}>Updated {lastRefresh}</span>
            :<span/>}
          <button onClick={fetchAll} disabled={loading}
            style={{background:"none",border:"1px solid var(--moss)",borderRadius:6,padding:"4px 10px",
              fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--stone)",
              cursor:"pointer",letterSpacing:1,textTransform:"uppercase"}}>
            {loading?"…":"Refresh"}
          </button>
        </div>

        {/* Forms tab */}
        {tab==="forms"&&(
          <>
            <div className="section-hd" style={{color:"var(--mgr)"}}>Recent Activity ({history.length})</div>
            {history.length===0
              ?<EmptyState msg="No submissions yet"/>
              :history.map((r,i)=>(
                <div key={i} style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:9,padding:"12px 14px",marginBottom:8}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
                    <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--lime)",letterSpacing:1,lineHeight:1}}>{r.truck}</span>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,color:"var(--stone)"}}>{r.date} · {r.time}</span>
                    <TypePill type={r.type}/>
                    <div style={{marginLeft:"auto"}}><StatusBadge status={r.status}/></div>
                  </div>
                  {r.name&&<div style={{fontSize:12,color:"var(--stone)",marginBottom:r.detail?3:0}}>{r.name}</div>}
                  {r.detail&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--cream)",fontWeight:600}}>{r.detail}</div>}
                </div>
              ))
            }
          </>
        )}

        {/* Receipts tab */}
        {tab==="receipts"&&(
          <>
            <div className="section-hd" style={{color:"var(--mgr)"}}>Recent Receipts ({receipts.length})</div>
            {receipts.length===0
              ?<EmptyState msg="No receipts yet"/>
              :receipts.map((r,i)=>(
                <div key={i} style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:9,padding:"12px 14px",marginBottom:8}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--lime)",letterSpacing:1,lineHeight:1}}>{r.truck}</span>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,color:"var(--stone)"}}>{r.date} · {r.time}</span>
                    </div>
                    <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--lime)"}}>{r.total?`$${r.total}`:""}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)"}}>{r.merchant||"—"}</div>
                      <div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{r.type}</div>
                    </div>
                    {r.photo&&<span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--lime)",letterSpacing:1}}>✓ Photo</span>}
                  </div>
                </div>
              ))
            }
          </>
        )}
      </div>

      <nav className="bottom-nav" style={{background:"#d0ccc2",borderTopColor:"#b0aa9a"}}>
        <button className={`bnav-btn ${tab==="forms"?"active":""}`}
          style={tab==="forms"?{color:"var(--mgr-lt)",borderBottomColor:"var(--mgr)"}:{}}
          onClick={()=>setTab("forms")}>
          <Ic n="clip"/>Activity
        </button>
        <button className={`bnav-btn ${tab==="receipts"?"active":""}`}
          style={tab==="receipts"?{color:"var(--mgr-lt)",borderBottomColor:"var(--mgr)"}:{}}
          onClick={()=>setTab("receipts")}>
          <Ic n="camera"/>Receipts
        </button>
      </nav>
    </div>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
const MEMORY_KEY="jj_truck_memory";
function getTodayDateStr(){return new Date().toLocaleDateString("en-US");}
function loadMemory(){try{const raw=localStorage.getItem(MEMORY_KEY);if(!raw)return null;const mem=JSON.parse(raw);if(mem.date!==getTodayDateStr()){localStorage.removeItem(MEMORY_KEY);return null;}return mem;}catch(e){return null;}}
function saveMemory(truck){try{localStorage.setItem(MEMORY_KEY,JSON.stringify({truckId:truck.id,date:getTodayDateStr()}));}catch(e){}}
function clearMemory(){try{localStorage.removeItem(MEMORY_KEY);}catch(e){}}

function LoginScreen({ onTruckLogin, onMgrLogin, lang, setLang }) {
  const t=useT();
  const memory=loadMemory();
  const rememberedTruck=memory?TRUCKS.find(tr=>tr.id===memory.truckId)||null:null;
  const[mode,setMode]=useState("truck");
  const[dropOpen,setDropOpen]=useState(false);
  const[selected,setSel]=useState(rememberedTruck);
  const[mgrPass,setMgrPass]=useState("");
  const[error,setError]=useState("");
  const[receiptOpen,setReceiptOpen]=useState(false);
  const[hrOpen,setHrOpen]=useState(false);
  const[openHR,setOpenHR]=useState(null);
  const[activeTrucks,setActiveTrucks]=useState([]); // truck labels currently ACTIVE in sheet

  // Fetch which trucks are currently signed in so we can gray them out
  useEffect(()=>{
    const fetchActive = async () => {
      try {
        const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${OPS_SHEETS_ID}/values/Sign%20Ins?key=${SHEETS_KEY}`);
        const data = await res.json();
        const d = new Date();
        const formats = [
          `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`,
          `${String(d.getMonth()+1).padStart(2,"0")}/${String(d.getDate()).padStart(2,"0")}/${d.getFullYear()}`,
        ];
        const rows = (data.values||[]).slice(1);
        const active = rows
          .filter(r => formats.includes((r[0]||"").trim()) && r[4]==="ACTIVE")
          .map(r => r[1]); // col B = truck label
        setActiveTrucks(active);
      } catch(e) { /* silently fail — don't block login */ }
    };
    fetchActive();
  },[]);

  const isTruckInUse = tr => activeTrucks.includes(tr.label) && (!rememberedTruck || rememberedTruck.id !== tr.id);

  const handleSelectTruck = truck => { saveMemory(truck); onTruckLogin(truck,""); };
  const handleChangeTruck = () => { clearMemory(); setSel(null); setError(""); };
  const tryMgr = () => { if(mgrPass==="ground25")onMgrLogin(); else{setError(t.wrongPass);setMgrPass("");} };

  return (
    <div className="splash">
      <FlagSelector lang={lang} setLang={setLang}/>
      <div className="logo-wrap">
        <img className="logo-img" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwMCAyMDAwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsOiMzZDZiMTA7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7Ij48cmVjdCB3aWR0aD0iMjAwMCIgaGVpZ2h0PSIyMDAwIiBmaWxsPSJub25lIi8+PC9zdmc+" alt="J&J & Son"/>
        <div className="app-title">J&amp;J &amp; Son</div>
        <div className="app-sub">{t.appSub}</div>
      </div>
      {mode==="truck"&&(
        <>
          {!rememberedTruck?(
            <>
              <div className="select-label">{t.selectTruck}</div>
              <div className="truck-dropdown-wrap">
                <div className={`truck-dropdown-btn ${dropOpen?"open":""}`} onClick={()=>setDropOpen(o=>!o)}>
                  <Ic n="truck" style={{width:16,height:16,color:selected?"var(--lime)":"var(--stone)"}}/>
                  {selected?<span className="truck-dropdown-value">{selected.label}</span>:<span className="truck-dropdown-placeholder">{t.chooseTruck}</span>}
                  <Ic n="chevD" className={`truck-dropdown-chevron ${dropOpen?"open":""}`} style={{width:16,height:16}}/>
                </div>
                {dropOpen&&(
                  <div className="truck-dropdown-list">
                    {TRUCKS.map(tr=>{
                      const inUse = isTruckInUse(tr);
                      return (
                        <div key={tr.id}
                          className={`truck-dropdown-item ${selected?.id===tr.id?"selected":""}`}
                          onClick={()=>{ if(inUse)return; setSel(tr); setDropOpen(false); setError(""); }}
                          style={{opacity:inUse?0.45:1,cursor:inUse?"default":"pointer",background:inUse?"var(--bark2)":""}}>
                          <Ic n="truck" style={{width:14,height:14,color:inUse?"var(--stone)":"currentColor"}}/>
                          <span style={{flex:1}}>{tr.label}</span>
                          {inUse && <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:1,color:"var(--stone)",textTransform:"uppercase"}}>In Use</span>}
                          {selected?.id===tr.id&&!inUse&&<Ic n="check" style={{width:14,height:14,marginLeft:"auto",color:"var(--lime)"}}/>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              {selected&&<button className="btn-select-truck" onClick={()=>handleSelectTruck(selected)}>{t.makeMyTruck}</button>}
            </>
          ):(
            <div style={{width:"100%",marginBottom:20,animation:"fadeUp 0.3s ease both"}}>
              <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--lime)",borderRadius:10,padding:"16px",marginBottom:12,display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:44,height:44,borderRadius:10,background:"var(--moss)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="truck" style={{width:22,height:22,color:"var(--lime)"}}/></div>
                <div style={{flex:1}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:"var(--lime)",letterSpacing:2,lineHeight:1}}>{rememberedTruck.label}</div><div style={{fontSize:12,color:"var(--stone)",marginTop:3}}>{t.truckToday}</div></div>
              </div>
              <button className="btn-select-truck" style={{marginBottom:8}} onClick={()=>handleSelectTruck(rememberedTruck)}>{t.signInAs(rememberedTruck.label)}</button>
              <div style={{textAlign:"center"}}><span onClick={handleChangeTruck} style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--stone)",letterSpacing:1,cursor:"pointer",textDecoration:"underline",textUnderlineOffset:3}}>{t.notYourTruck}</span></div>
            </div>
          )}
          <div className="mgr-toggle" onClick={()=>{setMode("manager");setError("");}}>{t.mgrZone} →</div>
          <div style={{width:"100%",marginTop:28}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:3,color:"var(--stone)",marginBottom:10,display:"flex",alignItems:"center",gap:8}}>{t.submitReceipt}<span style={{flex:1,height:1,background:"var(--moss)",display:"block"}}/></div>
            {!receiptOpen?(
              <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--leaf)",borderRadius:9,padding:"13px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:"pointer"}} onClick={()=>setReceiptOpen(true)}>
                <div style={{width:34,height:34,borderRadius:8,background:"var(--moss)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="camera" style={{width:15,height:15,color:"var(--lime)"}}/></div>
                <div style={{flex:1}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)"}}>{t.receiptCard}</div><div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{t.receiptSub}</div></div>
                <Ic n="chev" style={{width:16,height:16,color:"var(--moss)"}}/>
              </div>
            ):(
              <NativeReceiptFlow truckLabel="General Submission" divisionLabel="" onClose={()=>setReceiptOpen(false)}/>
            )}
          </div>
          <div style={{width:"100%",marginTop:16}}>
            {!hrOpen?(
              <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--mgr)",borderRadius:9,padding:"13px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:"pointer"}} onClick={()=>setHrOpen(true)}>
                <div style={{width:34,height:34,borderRadius:8,background:"rgba(74,122,181,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="shield" style={{width:15,height:15,color:"var(--mgr-lt)"}}/></div>
                <div style={{flex:1}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)"}}>{t.empResources}</div><div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{t.empResourcesSub}</div></div>
                <Ic n="chev" style={{width:16,height:16,color:"var(--moss)"}}/>
              </div>
            ):(
              <div style={{animation:"fadeUp 0.3s ease both"}}>
                {!openHR?(
                  <>
                    <button className="back-btn" style={{marginBottom:14}} onClick={()=>setHrOpen(false)}><Ic n="back"/> {t.back}</button>
                    <div className="section-hd">{t.empResources}</div>
                    {HR_LINKS.map(f=>(<div key={f.name} style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--mgr)",borderRadius:9,padding:"13px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:f.url?"pointer":"default",opacity:f.url?1:0.6}} onClick={()=>{if(f.url)setOpenHR(f);}}><div style={{width:34,height:34,borderRadius:8,background:"rgba(74,122,181,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="shield" style={{width:15,height:15,color:"var(--mgr-lt)"}}/></div><div style={{flex:1}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)"}}>{f.name}</div><div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{f.desc}</div></div>{f.url?<Ic n="chev" style={{width:16,height:16,color:"var(--moss)"}}/>:<span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:1,color:"var(--stone)",textTransform:"uppercase"}}>{t.comingSoon}</span>}</div>))}
                  </>
                ):(
                  <>
                    <button className="back-btn" style={{marginBottom:14}} onClick={()=>setOpenHR(null)}><Ic n="back"/> {t.backToResources}</button>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,color:"var(--cream)",marginBottom:10}}>{openHR.name}</div>
                    <HRContent link={openHR}/>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}
      {mode==="manager"&&(
        <div className="mgr-box">
          <div className="mgr-box-header"><Ic n="shield" style={{width:18,height:18,color:"var(--mgr-lt)"}}/><span>Manager Zone</span></div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:8}}>{t.mgrPassword}</div>
          <input className="mgr-input" type="password" placeholder="••••••••" value={mgrPass} onChange={e=>{setMgrPass(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&tryMgr()}/>
          <button className="btn-mgr" onClick={tryMgr}>{t.enterMgrZone}</button>
          {error&&<div className="error-msg">{error}</div>}
          <div className="mgr-toggle" style={{color:"var(--stone)"}} onClick={()=>{setMode("truck");setError("");}}>{t.backToLogin}</div>
        </div>
      )}
      <div style={{marginTop:"auto",paddingTop:32,textAlign:"center"}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--moss)",letterSpacing:1,lineHeight:1.6}}>Created by Salerni Creative Co LLC<br/>All Rights Reserved</div>
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const[screen,setScreen]=useState("login");
  const[truck,setTruck]=useState(null);
  const[truckDiv,setTruckDiv]=useState("");
  const[checkouts,setCheckouts]=useState({});
  const[lang,setLang]=useState(detectLang);

  const postSignIn = async (tr) => {
    try {
      await fetch(SIGNIN_SCRIPT_URL,{
        method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},
        body:JSON.stringify({
          sheet:"Sign Ins", action:"signin",
          date:getTodayKey(), truck:tr.label,
          signInTime:getTimeStr(),
        }),
      });
    } catch(e){ console.warn("Sign-in post failed",e); }
  };

  const postSignOut = async (tr) => {
    try {
      await fetch(SIGNIN_SCRIPT_URL,{
        method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},
        body:JSON.stringify({
          sheet:"Sign Ins", action:"signout",
          date:getTodayKey(), truck:tr.label,
          signOutTime:getTimeStr(),
        }),
      });
    } catch(e){ console.warn("Sign-out post failed",e); }
  };

  const handleTruckLogin = tr => {
    setTruck(tr); setTruckDiv(""); setScreen("truck");
    postSignIn(tr);
  };

  const handleLogout = () => {
    if(truck) postSignOut(truck);
    setTruck(null); setTruckDiv(""); setScreen("login");
  };

  return (
    <LangContext.Provider value={lang}>
      <style>{css}</style>
      <div className="app">
        {screen==="login"   &&<LoginScreen onTruckLogin={handleTruckLogin} onMgrLogin={()=>setScreen("manager")} lang={lang} setLang={setLang}/>}
        {screen==="truck"   &&truck&&<TruckHome truck={truck} initialDivision={truckDiv} onLogout={handleLogout} checkouts={checkouts} setCheckouts={setCheckouts}/>}
        {screen==="manager" &&<ManagerZone onLogout={()=>setScreen("login")}/>}
      </div>
    </LangContext.Provider>
  );
}
