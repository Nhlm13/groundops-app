import React, { useState, useEffect, useRef } from "react";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@400;500;600;700&display=swap');`;

const css = `
${FONT}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --earth:  #edeae2;
  --bark:   #f5f2eb;
  --bark2:  #e8e4db;
  --moss:   #c4bfb0;
  --leaf:   #4a6d20;
  --lime:   #3d6b10;
  --dirt:   #7a6845;
  --sand:   #8a6e30;
  --stone:  #6a6658;
  --cream:  #1a1814;
  --danger: #c0442a;
  --warn:   #a06010;
  --mgr:    #2a5a95;
  --mgr-lt: #1a4a80;
}
body { background: var(--earth); font-family: 'Barlow', sans-serif; color: var(--cream); -webkit-tap-highlight-color: transparent; }
.app {
  max-width: 430px; min-height: 100dvh; margin: 0 auto;
  background: var(--earth); display: flex; flex-direction: column;
  position: relative;
}
.app::before {
  content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.5;
}
@keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
@keyframes slideIn { from { opacity:0; transform:translateX(32px); } to { opacity:1; transform:translateX(0); } }
@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }

.splash {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  padding: 36px 24px 60px; padding-top: calc(36px + env(safe-area-inset-top));
  position: relative; z-index: 1;
  animation: fadeUp 0.4s ease both; overflow-y: auto;
}
.logo-wrap { display: flex; flex-direction: column; align-items: center; margin-bottom: 32px; }
.logo-img { width: 72px; height: 72px; object-fit: contain; margin-bottom: 12px; }
.app-title { font-family: 'Bebas Neue', sans-serif; font-size: 42px; letter-spacing: 5px; color: var(--lime); line-height: 1; }
.app-sub { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; letter-spacing: 4px; color: var(--stone); text-transform: uppercase; margin-top: 4px; }
.select-label { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; letter-spacing: 3px; color: var(--stone); text-transform: uppercase; margin-bottom: 8px; align-self: flex-start; width: 100%; }

.truck-dropdown-wrap { position: relative; width: 100%; margin-bottom: 16px; }
.truck-dropdown-btn {
  width: 100%; background: var(--bark); border: 1.5px solid var(--moss);
  border-radius: 10px; padding: 14px 16px; display: flex; align-items: center;
  gap: 12px; cursor: pointer; transition: border-color 0.15s;
  font-family: 'Barlow', sans-serif; font-size: 15px; color: var(--cream);
}
.truck-dropdown-btn:hover { border-color: var(--lime); }
.truck-dropdown-btn.open { border-color: var(--lime); border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
.truck-dropdown-btn svg { flex-shrink: 0; }
.truck-dropdown-placeholder { color: var(--stone); flex: 1; }
.truck-dropdown-value { flex: 1; font-weight: 500; }
.truck-dropdown-chevron { margin-left: auto; color: var(--stone); transition: transform 0.2s; }
.truck-dropdown-chevron.open { transform: rotate(180deg); }
.truck-dropdown-list {
  position: absolute; top: 100%; left: 0; right: 0; z-index: 200;
  background: var(--bark); border: 1.5px solid var(--lime);
  border-top: none; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;
  max-height: 320px; overflow-y: auto; box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  -webkit-overflow-scrolling: touch;
}
.truck-dropdown-item {
  display: flex; align-items: center; gap: 12px; padding: 12px 16px;
  cursor: pointer; transition: background 0.12s; border-bottom: 1px solid rgba(196,191,176,0.4);
  font-family: 'Barlow', sans-serif; font-size: 15px; color: var(--cream);
}
.truck-dropdown-item:last-child { border-bottom: none; }
.truck-dropdown-item:hover { background: var(--bark2); }
.truck-dropdown-item.selected { background: rgba(74,109,32,0.08); color: var(--lime); }
.truck-dropdown-item svg { color: var(--stone); flex-shrink: 0; }
.truck-dropdown-item.selected svg { color: var(--lime); }

.btn-select-truck {
  width: 100%; padding: 14px; background: var(--lime); border: none;
  border-radius: 10px; font-family: 'Bebas Neue', sans-serif; font-size: 18px;
  letter-spacing: 3px; color: var(--earth); cursor: pointer;
  transition: opacity 0.2s, transform 0.1s; margin-bottom: 20px;
}
.btn-select-truck:active { opacity: 0.85; transform: scale(0.98); }

.back-btn {
  display: flex; align-items: center; gap: 6px; background: none; border: none;
  font-family: 'Barlow Condensed', sans-serif; font-size: 13px; letter-spacing: 1px;
  color: var(--stone); cursor: pointer; text-transform: uppercase; margin-bottom: 16px;
  padding: 0;
}
.back-btn svg { width: 14px; height: 14px; }

.error-msg {
  background: rgba(192,68,42,0.12); border: 1px solid var(--danger);
  border-radius: 8px; padding: 10px 14px; margin-top: 12px;
  font-size: 14px; color: var(--danger); text-align: center;
  animation: shake 0.3s ease;
}
.mgr-toggle {
  margin-top: 24px; text-align: center;
  font-family: 'Barlow Condensed', sans-serif; font-size: 13px;
  color: var(--mgr-lt); cursor: pointer; letter-spacing: 1px;
  text-decoration: underline; text-underline-offset: 3px;
}
.mgr-box { width: 100%; background: var(--bark); border: 1.5px solid var(--mgr); border-radius: 12px; padding: 20px; }
.mgr-box-header { display: flex; align-items: center; gap: 8px; margin-bottom: 18px; }
.mgr-box-header span { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--mgr-lt); letter-spacing: 2px; }
.mgr-input {
  width: 100%; background: var(--bark2); border: 1px solid var(--mgr);
  border-radius: 8px; padding: 14px; color: var(--cream);
  font-family: 'Barlow', sans-serif; font-size: 16px;
  text-align: center; letter-spacing: 4px; margin-bottom: 14px;
}
.mgr-input:focus { outline: none; border-color: var(--mgr-lt); }
.btn-mgr {
  width: 100%; padding: 14px; background: var(--mgr); border: none;
  border-radius: 10px; font-family: 'Bebas Neue', sans-serif; font-size: 19px;
  letter-spacing: 3px; color: #fff; cursor: pointer; transition: opacity 0.2s;
}
.btn-mgr:active { opacity: 0.85; }

.screen { flex: 1; display: flex; flex-direction: column; position: relative; z-index: 1; animation: fadeUp 0.35s ease both; height: 100dvh; }
.topbar {
  background: var(--bark); border-bottom: 3px solid var(--leaf);
  padding: 12px 16px 10px; padding-top: calc(12px + env(safe-area-inset-top));
  display: flex; align-items: center;
  justify-content: space-between; position: sticky; top: 0; z-index: 50;
}
.topbar-left { display: flex; align-items: center; gap: 10px; }
.topbar-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--lime); letter-spacing: 2px; }
.truck-pill {
  display: flex; align-items: center; gap: 5px; background: var(--moss);
  border-radius: 20px; padding: 4px 10px;
  font-family: 'Barlow Condensed', sans-serif; font-size: 13px; color: var(--lime); letter-spacing: 1px;
}
.truck-pill svg { width: 12px; height: 12px; }
.logout-btn {
  background: none; border: 1px solid var(--moss); border-radius: 6px;
  padding: 5px 10px; cursor: pointer;
  font-family: 'Barlow Condensed', sans-serif; font-size: 12px;
  color: var(--stone); letter-spacing: 1px; text-transform: uppercase;
}
.content { padding: 16px 16px 100px; overflow-y: auto; flex: 1; height: 0; }
.section-hd {
  font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 3px;
  color: var(--stone); text-transform: uppercase; margin-bottom: 10px;
  display: flex; align-items: center; gap: 8px;
}
.section-hd::after { content:''; flex:1; height:1px; background:var(--moss); }

.greeting {
  background: var(--bark); border: 1px solid var(--moss);
  border-left: 4px solid var(--lime); border-radius: 10px;
  padding: 14px 16px; margin-bottom: 18px; display: flex; align-items: center; gap: 14px;
}
.greeting-icon { width: 44px; height: 44px; border-radius: 10px; background: var(--moss); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.greeting-icon svg { width: 22px; height: 22px; color: var(--lime); }
.greet-name { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: var(--lime); line-height: 1; }
.greet-sub { font-size: 13px; color: var(--stone); margin-top: 3px; }

.action-card {
  background: var(--bark); border: 1px solid var(--moss);
  border-left: 4px solid var(--leaf); border-radius: 9px;
  padding: 14px 16px; margin-bottom: 10px;
  display: flex; align-items: center; gap: 14px; cursor: pointer;
  transition: background 0.15s;
}
.action-card:active { background: var(--bark2); }
.action-card-icon { width: 38px; height: 38px; border-radius: 8px; background: var(--moss); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.action-card-icon svg { width: 18px; height: 18px; color: var(--lime); }
.action-card-info { flex: 1; }
.action-card-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; color: var(--cream); }
.action-card-desc { font-size: 12px; color: var(--stone); margin-top: 2px; }
.action-card-arrow { color: var(--moss); }
.action-card-arrow svg { width: 16px; height: 16px; }
.status-chip { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; margin-top: 4px; display: inline-block; }
.chip-done { background: rgba(74,109,32,0.12); color: var(--lime); }
.chip-pending { background: rgba(160,96,16,0.12); color: var(--warn); }

.contact-card { background: var(--bark); border: 1px solid var(--moss); border-radius: 9px; padding: 13px 15px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; }
.contact-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--moss); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-family: 'Bebas Neue', sans-serif; font-size: 16px; color: var(--lime); letter-spacing: 1px; }
.contact-info { flex: 1; }
.contact-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; color: var(--cream); }
.contact-role { font-size: 12px; color: var(--stone); margin-top: 1px; }
.call-btn { width: 38px; height: 38px; border-radius: 50%; background: var(--lime); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: opacity 0.2s, transform 0.1s; flex-shrink: 0; }
.call-btn:active { opacity: 0.85; transform: scale(0.93); }
.call-btn svg { width: 16px; height: 16px; color: var(--earth); }

.receipt-upload { width: 100%; background: var(--bark2); border: 1.5px dashed var(--moss); border-radius: 8px; padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; transition: border-color 0.15s; }
.receipt-upload:hover { border-color: var(--lime); }
.receipt-upload svg { width: 24px; height: 24px; color: var(--stone); }
.receipt-upload span { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; color: var(--stone); letter-spacing: 1px; }
.success-banner { background: rgba(74,109,32,0.12); border: 1px solid var(--leaf); border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-family: 'Barlow Condensed', sans-serif; font-size: 14px; color: var(--lime); display: flex; align-items: center; gap: 8px; letter-spacing: 0.5px; }

.tool-cat-header { padding: 12px 14px; display: flex; align-items: center; gap: 10px; cursor: pointer; background: var(--bark); border: 1px solid var(--moss); border-radius: 10px; margin-bottom: 8px; }
.tool-cat-label { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px; color: var(--cream); flex: 1; }
.tool-cat-count { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; color: var(--stone); }
.chevron { width: 16px; height: 16px; color: var(--stone); transition: transform 0.22s; flex-shrink: 0; }
.chevron.open { transform: rotate(90deg); }
.tool-row { background: var(--bark); border: 1px solid var(--moss); border-radius: 9px; padding: 12px 14px; margin-bottom: 8px; display: flex; align-items: center; gap: 10px; }
.tool-info { flex: 1; min-width: 0; }
.tool-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 14px; color: var(--cream); }
.tool-avail { font-size: 12px; margin-top: 2px; }
.tool-avail.ok { color: var(--leaf); }
.tool-avail.low { color: var(--warn); }
.tool-avail.none { color: var(--danger); }
.qty-row { display: flex; align-items: center; gap: 8px; }
.qty-btn { width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--moss); background: var(--bark2); color: var(--cream); font-size: 16px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.1s; flex-shrink: 0; }
.qty-btn:active { background: var(--moss); }
.qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.qty-num { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--lime); min-width: 22px; text-align: center; }
.checkout-btn { padding: 7px 12px; background: var(--lime); border: none; border-radius: 8px; font-family: 'Bebas Neue', sans-serif; font-size: 13px; letter-spacing: 1px; color: var(--earth); cursor: pointer; transition: opacity 0.2s; white-space: nowrap; }
.checkout-btn:disabled { background: var(--moss); color: var(--stone); cursor: not-allowed; }
.checked-out-row { background: rgba(74,109,32,0.07); border: 1px solid rgba(74,109,32,0.25); border-radius: 9px; padding: 12px 14px; margin-bottom: 8px; display: flex; align-items: center; gap: 10px; }
.return-btn { padding: 7px 11px; background: none; border: 1px solid var(--leaf); border-radius: 8px; font-family: 'Bebas Neue', sans-serif; font-size: 13px; letter-spacing: 1px; color: var(--lime); cursor: pointer; white-space: nowrap; }
.return-btn:active { background: rgba(74,109,32,0.15); }
.co-qty-badge { background: var(--moss); border-radius: 6px; padding: 2px 7px; font-family: 'Bebas Neue', sans-serif; font-size: 15px; color: var(--lime); }

.mgr-topbar { background: #d8d4ca; border-bottom: 3px solid var(--mgr); padding: 12px 16px 10px; padding-top: calc(12px + env(safe-area-inset-top)); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
.mgr-topbar-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--mgr-lt); letter-spacing: 2px; }
.mgr-badge { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--mgr-lt); background: rgba(74,122,181,0.2); border: 1px solid var(--mgr); border-radius: 20px; padding: 4px 10px; }
.fleet-row { background: var(--bark); border: 1px solid var(--moss); border-radius: 9px; padding: 13px 15px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: background 0.15s; }
.fleet-row:active { background: var(--bark2); }
.fleet-truck-num { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--lime); letter-spacing: 1px; min-width: 36px; }
.fleet-info { flex: 1; }
.fleet-division { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px; color: var(--cream); }
.fleet-time { font-size: 12px; color: var(--stone); margin-top: 2px; }
.fleet-arrow { color: var(--moss); }
.truck-detail { animation: slideIn 0.3s ease both; }
.detail-stat { background: var(--bark); border: 1px solid var(--moss); border-radius: 9px; padding: 13px 15px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; }
.detail-stat-icon { width: 34px; height: 34px; border-radius: 8px; background: var(--moss); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.detail-stat-icon svg { width: 15px; height: 15px; color: var(--leaf); }
.detail-stat-info { flex: 1; }
.detail-stat-label { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; color: var(--stone); letter-spacing: 1px; text-transform: uppercase; }
.detail-stat-val { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; color: var(--cream); margin-top: 2px; }
.mgr-tool-row { background: var(--bark); border: 1px solid var(--moss); border-radius: 9px; padding: 12px 14px; margin-bottom: 8px; }
.mgr-tool-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.mgr-tool-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px; color: var(--cream); }
.mgr-tool-nums { display: flex; gap: 6px; }
.num-chip { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; padding: 2px 7px; border-radius: 4px; letter-spacing: 0.5px; }
.nc-total { background: rgba(122,122,106,0.2); color: var(--stone); }
.nc-out   { background: rgba(160,96,16,0.2); color: var(--warn); }
.nc-avail { background: rgba(74,109,32,0.2); color: var(--leaf); }
.truck-tag { background: var(--moss); border-radius: 4px; padding: 2px 6px; font-family: 'Barlow Condensed', sans-serif; font-size: 12px; color: var(--sand); }

.bottom-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; background: var(--bark); border-top: 2px solid var(--moss); display: flex; z-index: 100; padding-bottom: env(safe-area-inset-bottom); }
.bnav-btn { flex: 1; padding: 10px 4px 8px; background: none; border: none; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 3px; font-family: 'Barlow Condensed', sans-serif; font-size: 11px; color: var(--stone); letter-spacing: 1px; text-transform: uppercase; border-bottom: 3px solid transparent; transition: color 0.2s; }
.bnav-btn.active { color: var(--lime); border-bottom-color: var(--lime); }
.bnav-btn svg { width: 22px; height: 22px; }

.dot-cat-header { display: flex; align-items: center; gap: 10px; padding: 11px 14px; background: var(--bark2); border: 1px solid var(--moss); border-radius: 8px; margin-bottom: 6px; cursor: pointer; }
.dot-cat-label { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 13px; color: var(--stone); letter-spacing: 1px; text-transform: uppercase; flex: 1; }
.dot-item { display: flex; align-items: center; gap: 12px; padding: 11px 14px; background: var(--bark); border: 1px solid var(--moss); border-radius: 8px; margin-bottom: 5px; cursor: pointer; transition: background 0.12s; -webkit-tap-highlight-color: transparent; }
.dot-item:active { background: var(--bark2); }
.dot-item.checked { background: rgba(74,109,32,0.06); border-color: rgba(74,109,32,0.3); }
.dot-item.flagged { background: rgba(192,68,42,0.06); border-color: rgba(192,68,42,0.3); }
.dot-checkbox { width: 22px; height: 22px; border-radius: 6px; border: 2px solid var(--moss); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.15s; }
.dot-checkbox.checked { background: var(--lime); border-color: var(--lime); }
.dot-checkbox svg { width: 12px; height: 12px; color: var(--earth); }
.dot-item-label { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; color: var(--cream); flex: 1; line-height: 1.3; }
.dot-priority { font-family: 'Barlow Condensed', sans-serif; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; padding: 2px 6px; border-radius: 4px; flex-shrink: 0; }
.dot-priority.high { background: rgba(192,68,42,0.12); color: var(--danger); }
.dot-priority.medium { background: rgba(160,96,16,0.12); color: var(--warn); }
.dot-priority.low { background: rgba(74,109,32,0.12); color: var(--leaf); }
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
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>{paths[n]}</svg>;
};

const TRUCKS = Array.from({ length: 20 }, (_, i) => ({ id: i+1, label: `Truck ${i+1}`, pin: String(i+1) }));

const LANG_KEY = "jj_lang";
const LANGS = { en:"en", es:"es", pt:"pt" };
const FLAGS = { en:"🇺🇸", es:"🇪🇸", pt:"🇧🇷" };

function detectLang() {
  try { const s = localStorage.getItem(LANG_KEY); if (s && LANGS[s]) return s; } catch(e) {}
  const nav = (navigator.language || "en").toLowerCase();
  if (nav.startsWith("pt")) return "pt";
  if (nav.startsWith("es")) return "es";
  return "en";
}
function saveLang(lang) { try { localStorage.setItem(LANG_KEY, lang); } catch(e) {} }

// ── TRANSLATIONS ──────────────────────────────────────────────────────────────
const T = {
  en: {
    // App shell
    appSub:"Operations Center", selectTruck:"Select Your Truck", chooseTruck:"Choose a truck...",
    makeMyTruck:"Make This My Truck", signInAs: t=>`Sign In as ${t}`,
    notYourTruck:"Not your truck? Change it", truckToday:"Your truck from today",
    mgrZone:"Manager Zone", mgrPassword:"Password", enterMgrZone:"Enter Manager Zone",
    backToLogin:"← Back", signOut:"Sign Out",
    submitReceipt:"Submit a Receipt", receiptCard:"Receipt Submission",
    receiptSub:"Submit without logging into a truck",
    empResources:"Employee Resources", empResourcesSub:"Request time away & view company policies",
    backToResources:"Back to Employee Resources", back:"Back",
    // Receipt form
    yourName:"Your Name", namePlaceholder:"First & Last name", truck:"Truck",
    division:"Division", maintenance:"Maintenance", construction:"Construction",
    receiptType:"Receipt Type", fuel:"Fuel", materials:"Materials",
    toolsSupplies:"Tools / Supplies", other:"Other",
    part1:"Part 1 — General Information", part2Fuel:"Part 2 — Fuel Details",
    part2Purchase:"Part 2 — Purchase Details", gallons:"Gallons Pumped",
    gallonsPlaceholder:"e.g. 14.3", fuelType:"Fuel Type",
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
    // Home
    readyToRoll:"Ready to roll", dailyForms:"Daily Forms",
    morningRollout:"Morning Rollout", morningDesc:"Start-of-day checklist",
    trailerCheck:"Trailer Checklist", trailerDesc:"Pre-departure equipment check",
    dotCheck:"DOT Walk-Around", dotDesc:"Pre-trip vehicle inspection",
    comingSoon:"Coming Soon", pending:"Pending",
    contactMgr:"Contact a Manager", chooseMgr:"Choose a manager...",
    // Tools
    checkedOut:"Checked Out", toolInventory:"Tool Inventory",
    avail: n=>`${n} avail`, of:(a,b)=>`${a} of ${b} available`,
    noneAvail:"None available", allOut:"ALL OUT",
    checkOut:"Check Out", return_:"Return", since: t=>`Since ${t}`,
    // Nav
    home:"Home", receipts:"Receipts", tools:"Tools", hr:"HR",
    // Errors
    errName:"Please enter your name.", errDivision:"Please select a division.",
    errType:"Please select a receipt type.", errGallons:"Please enter gallons pumped.",
    errFuelType:"Please select a fuel type.", errLocation:"Please select where you fueled up.",
    errCost:"Please enter the total cost.", errVendor:"Please enter a vendor / merchant.",
    errTotal:"Please enter the total amount.", wrongPass:"Incorrect password.",
    // Manager
    fleet:"Fleet", activeTrucks:"Active Trucks", noTrucks:"No trucks signed in",
    signedIn: t=>`Signed in at ${t}`, noDivision:"No division selected",
    morningStatus:"Morning Rollout", trailerStatus:"Trailer Checklist",
    receiptsToday:"Receipts & Fuel Logs Today", noSubmissions:"No submissions today",
    toolsOut:"Tools Checked Out", noTools:"No tools checked out", loading:"Loading...",
    totalTools:"Total Tools", currentlyOut:"Currently Out", fullInventory:"Full Inventory",
    backHR:"Back to HR Portal",
    // DOT form
    dotTitle:"DOT Walk-Around Inspection", dotSubmit:"Submit Inspection",
    dotSubmitting:"Submitting...", dotFlagNote:"flagged High priority items",
    dotSuccess:"Inspection submitted!", dotNameLabel:"Inspector Name",
    dotNotes:"Notes", dotNotesPlaceholder:"Any issues or observations...",
    dotUncheckedWarning: n=>`${n} High priority ${n===1?"item":"items"} unchecked — will be flagged on submit`,
    // DOT categories
    dotCat_exterior:"Exterior Truck Check",
    dotCat_trailer:"Trailer Check",
    dotCat_fluid:"Fluid & Mechanical Check",
    dotCat_interior:"Interior Truck Check",
    dotCat_safety:"Safety & Miscellaneous",
    // DOT items
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
    dot_engine_oil:"Engine oil level",
    dot_coolant:"Coolant level",
    dot_brake_fluid:"Brake fluid",
    dot_transmission_fluid:"Transmission fluid",
    dot_fuel_level:"Fuel level",
    dot_hydraulic_fluids:"Hydraulic fluids (if applicable)",
    dot_seatbelts:"Seatbelts functioning",
    dot_horn:"Horn working",
    dot_gauges:"Gauges – fuel, temp, oil, air pressure normal",
    dot_fire_extinguisher:"Fire extinguisher present & charged",
    dot_first_aid:"First aid kit present & stocked",
    dot_loose_items_interior:"Loose items secured",
    dot_ppe:"PPE stored & accessible",
    dot_warning_triangles:"Warning triangles or cones present",
    dot_no_leaks:"No leaks under vehicle",
    dot_keys_removed:"Keys removed when not in use",
    // Uniform policy
    uniformTitle:"Uniform & Appearance",
    uniformSubtitle:"J & J & Son Lawncare — Employee Policy",
    uniformFooter:"At J & J & Son Lawncare, we take pride in our appearance. A clean, uniformed crew reflects the quality, professionalism, and standards of our work.",
    uSec_purpose:"Purpose",
    uSec_issuance:"Uniform Issuance",
    uSec_required:"Required Uniform",
    uSec_clean:"Cleanliness & Condition",
    uSec_appearance:"Appearance Standards",
    uSec_safety:"Safety Requirements",
    uSec_care:"Care & Responsibility",
    uSec_replacement:"Replacement Policy",
    uSec_noncompliance:"Non-Compliance",
    uSub_required:"Required", uSub_notAllowed:"Not Allowed",
    uSub_standards:"Standards", uSub_unacceptable:"Unacceptable",
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
  },

  es: {
    appSub:"Centro de Operaciones", selectTruck:"Elige tu Camión", chooseTruck:"Elige un camión...",
    makeMyTruck:"Este es mi Camión", signInAs: t=>`Entrar como ${t}`,
    notYourTruck:"¿No es tu camión? Cámbialo", truckToday:"Tu camión de hoy",
    mgrZone:"Manager Zone", mgrPassword:"Contraseña", enterMgrZone:"Entrar al Manager Zone",
    backToLogin:"← Volver", signOut:"Cerrar Sesión",
    submitReceipt:"Enviar un Recibo", receiptCard:"Envío de Recibo",
    receiptSub:"Envía sin iniciar sesión en un camión",
    empResources:"Recursos para Empleados", empResourcesSub:"Solicita tiempo libre y consulta las políticas",
    backToResources:"Volver a Recursos", back:"Volver",
    yourName:"Tu Nombre", namePlaceholder:"Nombre y Apellido", truck:"Camión",
    division:"División", maintenance:"Mantenimiento", construction:"Construcción",
    receiptType:"Tipo de Recibo", fuel:"Combustible", materials:"Materiales",
    toolsSupplies:"Herramientas / Suministros", other:"Otro",
    part1:"Parte 1 — Información General", part2Fuel:"Parte 2 — Detalles de Combustible",
    part2Purchase:"Parte 2 — Detalles de Compra", gallons:"Galones Cargados",
    gallonsPlaceholder:"ej. 14.3", fuelType:"Tipo de Combustible",
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
    morningRollout:"Salida de Mañana", morningDesc:"Lista de inicio del día",
    trailerCheck:"Lista del Remolque", trailerDesc:"Revisión antes de salir",
    dotCheck:"Inspección DOT", dotDesc:"Inspección pre-viaje del vehículo",
    comingSoon:"Próximamente", pending:"Pendiente",
    contactMgr:"Contactar a un Gerente", chooseMgr:"Elige un gerente...",
    checkedOut:"Llevado", toolInventory:"Inventario de Herramientas",
    avail: n=>`${n} disp.`, of:(a,b)=>`${a} de ${b} disponibles`,
    noneAvail:"No disponible", allOut:"AGOTADO",
    checkOut:"Llevar", return_:"Devolver", since: t=>`Desde ${t}`,
    home:"Inicio", receipts:"Recibos", tools:"Herramientas", hr:"Recursos",
    errName:"Por favor ingresa tu nombre.", errDivision:"Por favor elige una división.",
    errType:"Por favor elige el tipo de recibo.", errGallons:"Por favor ingresa los galones.",
    errFuelType:"Por favor elige el tipo de combustible.", errLocation:"Por favor indica dónde cargaste.",
    errCost:"Por favor ingresa el costo total.", errVendor:"Por favor ingresa el proveedor.",
    errTotal:"Por favor ingresa el monto total.", wrongPass:"Contraseña incorrecta.",
    fleet:"Flota", activeTrucks:"Camiones Activos", noTrucks:"No hay camiones activos",
    signedIn: t=>`Ingresó a las ${t}`, noDivision:"Sin división seleccionada",
    morningStatus:"Salida de Mañana", trailerStatus:"Lista del Remolque",
    receiptsToday:"Recibos y Combustible Hoy", noSubmissions:"Sin envíos hoy",
    toolsOut:"Herramientas Llevadas", noTools:"Sin herramientas llevadas", loading:"Cargando...",
    totalTools:"Total Herramientas", currentlyOut:"Actualmente Fuera", fullInventory:"Inventario Completo",
    backHR:"Volver al Portal",
    dotTitle:"Inspección DOT Pre-Viaje", dotSubmit:"Enviar Inspección",
    dotSubmitting:"Enviando...", dotFlagNote:"elementos de alta prioridad sin marcar",
    dotSuccess:"¡Inspección enviada!", dotNameLabel:"Nombre del Inspector",
    dotNotes:"Notas", dotNotesPlaceholder:"Problemas u observaciones...",
    dotUncheckedWarning: n=>`${n} ${n===1?"elemento":"elementos"} de alta prioridad sin marcar — se marcará al enviar`,
    dotCat_exterior:"Revisión Exterior del Camión",
    dotCat_trailer:"Revisión del Remolque",
    dotCat_fluid:"Revisión de Fluidos y Mecánica",
    dotCat_interior:"Revisión Interior del Camión",
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
    dot_engine_oil:"Nivel de aceite del motor",
    dot_coolant:"Nivel de refrigerante",
    dot_brake_fluid:"Fluido de frenos",
    dot_transmission_fluid:"Fluido de transmisión",
    dot_fuel_level:"Nivel de combustible",
    dot_hydraulic_fluids:"Fluidos hidráulicos (si aplica)",
    dot_seatbelts:"Cinturones de seguridad funcionando",
    dot_horn:"Bocina funcionando",
    dot_gauges:"Medidores – combustible, temperatura, aceite, presión normales",
    dot_fire_extinguisher:"Extintor presente y cargado",
    dot_first_aid:"Botiquín de primeros auxilios presente y abastecido",
    dot_loose_items_interior:"Objetos sueltos asegurados",
    dot_ppe:"EPP almacenado y accesible",
    dot_warning_triangles:"Triángulos o conos de advertencia presentes",
    dot_no_leaks:"Sin fugas debajo del vehículo",
    dot_keys_removed:"Llaves retiradas cuando no se usa",
    uniformTitle:"Uniforme y Apariencia",
    uniformSubtitle:"J & J & Son Lawncare — Política para Empleados",
    uniformFooter:"En J & J & Son Lawncare, nos enorgullecemos de nuestra apariencia. Una cuadrilla limpia y uniformada refleja la calidad, profesionalismo y estándares de nuestro trabajo.",
    uSec_purpose:"Propósito",
    uSec_issuance:"Entrega de Uniformes",
    uSec_required:"Uniforme Requerido",
    uSec_clean:"Limpieza y Condición",
    uSec_appearance:"Estándares de Apariencia",
    uSec_safety:"Requisitos de Seguridad",
    uSec_care:"Cuidado y Responsabilidad",
    uSec_replacement:"Política de Reemplazo",
    uSec_noncompliance:"Incumplimiento",
    uSub_required:"Requerido", uSub_notAllowed:"No Permitido",
    uSub_standards:"Estándares", uSub_unacceptable:"Inaceptable",
    uNote_clean:"Si el uniforme se ensucia demasiado durante el día, cámbiese por uno limpio si está disponible.",
    uNote_care:"La negligencia, pérdida o mal uso puede resultar en costos de reemplazo a cargo del empleado.",
    uItems_purpose:["Todos los empleados deben mantener una apariencia limpia y profesional en todo momento.","Las cuadrillas representan a la empresa en cada obra — el profesionalismo, la seguridad y la reputación importan."],
    uItems_issuance:["3–5 camisetas de la empresa al inicio del empleo o temporada","1–2 camisas de manga larga o sudaderas (temporada fría)","Guantes de trabajo según sea necesario","Equipo adicional (impermeables, chalecos de seguridad) según los requisitos del trabajo"],
    uItems_required:["Camiseta de la empresa — debe usarse en todo momento","Pantalones o shorts de trabajo apropiados","Botas de trabajo o calzado de seguridad adecuado","Guantes cuando se requiera para las tareas"],
    uItems_notAllowed:["Camisetas que no sean de la empresa en el sitio de trabajo","Ropa inapropiada en el sitio de trabajo"],
    uItems_standards:["Limpio al inicio de cada jornada laboral","Sin suciedad excesiva, manchas o residuos","Sin rasgaduras, roturas ni desgaste excesivo","Logotipos de la empresa visibles y no muy desvanecidos"],
    uItems_unacceptable:["Uniformes sucios del día anterior","Ropa rasgada o dañada","Olores fuertes por mala higiene personal"],
    uItems_appearance:["Se requiere higiene personal diaria","La ropa debe quedar bien — sin ropa muy holgada o caída","Sin logotipos inapropiados ni ropa que no sea de trabajo","Los sombreros deben ser de la marca de la empresa o lisos, usados correctamente"],
    uItems_safetyReq:["Se requieren guantes al manipular materiales u operar equipos","EPP adicional (gafas, protección auditiva, chalecos) cuando se requiera","No se permite ropa que represente un peligro de seguridad"],
    uItems_care:["Lave y mantenga sus uniformes","Mantenga los uniformes en buenas condiciones","Traiga ropa apropiada para las condiciones climáticas","La empresa reemplaza uniformes por desgaste normal a su discreción"],
    uItems_replacement:["Reporte uniformes dañados o desgastados a la gerencia","Los reemplazos se aprueban según la condición y aprobación de la gerencia","Las solicitudes excesivas de reemplazo por mal cuidado pueden negarse o cobrarse"],
    uItems_noncompliance:["Enviado a casa a cambiarse","Retirado del sitio de trabajo hasta cumplir","Acción disciplinaria por violaciones repetidas"],
  },

  pt: {
    appSub:"Central de Operações", selectTruck:"Escolha seu Caminhão", chooseTruck:"Escolha um caminhão...",
    makeMyTruck:"Esse é meu Caminhão", signInAs: t=>`Entrar como ${t}`,
    notYourTruck:"Não é seu caminhão? Mude", truckToday:"Seu caminhão de hoje",
    mgrZone:"Manager Zone", mgrPassword:"Senha", enterMgrZone:"Entrar no Manager Zone",
    backToLogin:"← Voltar", signOut:"Sair",
    submitReceipt:"Enviar um Recibo", receiptCard:"Envio de Recibo",
    receiptSub:"Envie sem entrar em um caminhão",
    empResources:"Recursos para Funcionários", empResourcesSub:"Solicite folga e veja as políticas da empresa",
    backToResources:"Voltar aos Recursos", back:"Voltar",
    yourName:"Seu Nome", namePlaceholder:"Nome e Sobrenome", truck:"Caminhão",
    division:"Divisão", maintenance:"Manutenção", construction:"Construção",
    receiptType:"Tipo de Recibo", fuel:"Combustível", materials:"Materiais",
    toolsSupplies:"Ferramentas / Suprimentos", other:"Outro",
    part1:"Parte 1 — Informações Gerais", part2Fuel:"Parte 2 — Detalhes do Combustível",
    part2Purchase:"Parte 2 — Detalhes da Compra", gallons:"Galões Abastecidos",
    gallonsPlaceholder:"ex. 14.3", fuelType:"Tipo de Combustível",
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
    morningRollout:"Saída da Manhã", morningDesc:"Lista de início do dia",
    trailerCheck:"Lista do Reboque", trailerDesc:"Verificação antes de sair",
    dotCheck:"Inspeção DOT", dotDesc:"Inspeção pré-viagem do veículo",
    comingSoon:"Em Breve", pending:"Pendente",
    contactMgr:"Contatar um Gerente", chooseMgr:"Escolha um gerente...",
    checkedOut:"Retirado", toolInventory:"Inventário de Ferramentas",
    avail: n=>`${n} disp.`, of:(a,b)=>`${a} de ${b} disponíveis`,
    noneAvail:"Indisponível", allOut:"ESGOTADO",
    checkOut:"Pegar", return_:"Devolver", since: t=>`Desde ${t}`,
    home:"Início", receipts:"Recibos", tools:"Ferramentas", hr:"RH",
    errName:"Por favor insira seu nome.", errDivision:"Por favor selecione uma divisão.",
    errType:"Por favor selecione o tipo de recibo.", errGallons:"Por favor insira os galões.",
    errFuelType:"Por favor selecione o tipo de combustível.", errLocation:"Por favor indique onde abasteceu.",
    errCost:"Por favor insira o custo total.", errVendor:"Por favor insira o fornecedor.",
    errTotal:"Por favor insira o valor total.", wrongPass:"Senha incorreta.",
    fleet:"Frota", activeTrucks:"Caminhões Ativos", noTrucks:"Nenhum caminhão ativo",
    signedIn: t=>`Entrou às ${t}`, noDivision:"Sem divisão selecionada",
    morningStatus:"Saída da Manhã", trailerStatus:"Lista do Reboque",
    receiptsToday:"Recibos e Combustível Hoje", noSubmissions:"Nenhum envio hoje",
    toolsOut:"Ferramentas Retiradas", noTools:"Nenhuma ferramenta retirada", loading:"Carregando...",
    totalTools:"Total de Ferramentas", currentlyOut:"Atualmente Fora", fullInventory:"Inventário Completo",
    backHR:"Voltar ao Portal",
    dotTitle:"Inspeção DOT Pré-Viagem", dotSubmit:"Enviar Inspeção",
    dotSubmitting:"Enviando...", dotFlagNote:"itens de alta prioridade sem marcar",
    dotSuccess:"Inspeção enviada!", dotNameLabel:"Nome do Inspetor",
    dotNotes:"Observações", dotNotesPlaceholder:"Problemas ou observações...",
    dotUncheckedWarning: n=>`${n} ${n===1?"item":"itens"} de alta prioridade sem marcar — será sinalizado ao enviar`,
    dotCat_exterior:"Verificação Exterior do Caminhão",
    dotCat_trailer:"Verificação do Reboque",
    dotCat_fluid:"Verificação de Fluidos e Mecânica",
    dotCat_interior:"Verificação Interior do Caminhão",
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
    dot_engine_oil:"Nível do óleo do motor",
    dot_coolant:"Nível do líquido de arrefecimento",
    dot_brake_fluid:"Fluido de freio",
    dot_transmission_fluid:"Fluido de transmissão",
    dot_fuel_level:"Nível de combustível",
    dot_hydraulic_fluids:"Fluidos hidráulicos (se aplicável)",
    dot_seatbelts:"Cintos de segurança funcionando",
    dot_horn:"Buzina funcionando",
    dot_gauges:"Medidores – combustível, temperatura, óleo, pressão normais",
    dot_fire_extinguisher:"Extintor presente e carregado",
    dot_first_aid:"Kit de primeiros socorros presente e abastecido",
    dot_loose_items_interior:"Itens soltos fixados",
    dot_ppe:"EPI armazenado e acessível",
    dot_warning_triangles:"Triângulos ou cones de advertência presentes",
    dot_no_leaks:"Sem vazamentos sob o veículo",
    dot_keys_removed:"Chaves removidas quando não estiver em uso",
    uniformTitle:"Uniforme e Aparência",
    uniformSubtitle:"J & J & Son Lawncare — Política para Funcionários",
    uniformFooter:"Na J & J & Son Lawncare, temos orgulho da nossa aparência. Uma equipe limpa e uniformizada reflete a qualidade, profissionalismo e os padrões do nosso trabalho.",
    uSec_purpose:"Propósito",
    uSec_issuance:"Entrega de Uniformes",
    uSec_required:"Uniforme Obrigatório",
    uSec_clean:"Limpeza e Condição",
    uSec_appearance:"Padrões de Aparência",
    uSec_safety:"Requisitos de Segurança",
    uSec_care:"Cuidado e Responsabilidade",
    uSec_replacement:"Política de Substituição",
    uSec_noncompliance:"Descumprimento",
    uSub_required:"Obrigatório", uSub_notAllowed:"Não Permitido",
    uSub_standards:"Padrões", uSub_unacceptable:"Inaceitável",
    uNote_clean:"Se o uniforme ficar excessivamente sujo durante o dia, troque por um reserva limpo, se disponível.",
    uNote_care:"Negligência, perda ou mau uso pode resultar em custos de substituição cobrados ao funcionário.",
    uItems_purpose:["Todos os funcionários devem manter uma aparência limpa e profissional em todos os momentos.","As equipes representam a empresa em cada obra — profissionalismo, segurança e reputação importam."],
    uItems_issuance:["3–5 camisetas da empresa no início do emprego ou temporada","1–2 camisas de manga longa ou moletons (temporada fria)","Luvas de trabalho conforme necessário","Equipamentos adicionais (capas de chuva, coletes de segurança) conforme necessário"],
    uItems_required:["Camiseta da empresa — usada em todos os momentos","Calças ou shorts de trabalho apropriados","Botas de trabalho ou calçado de segurança adequado","Luvas quando necessário para as tarefas"],
    uItems_notAllowed:["Camisetas que não sejam da empresa no local de trabalho","Roupas inadequadas no local de trabalho"],
    uItems_standards:["Limpo no início de cada dia de trabalho","Sem sujeira excessiva, manchas ou detritos","Sem rasgos, rupturas ou desgaste excessivo","Logotipos da empresa visíveis e não muito desbotados"],
    uItems_unacceptable:["Uniformes sujos do dia anterior","Roupas rasgadas ou danificadas","Odores fortes por má higiene pessoal"],
    uItems_appearance:["Higiene pessoal diária é obrigatória","A roupa deve servir bem — sem roupas muito largas ou caindo","Sem logotipos inadequados ou roupas que não sejam de trabalho","Bonés devem ser da marca da empresa ou lisos, usados corretamente"],
    uItems_safetyReq:["Luvas obrigatórias ao manusear materiais ou operar equipamentos","EPI adicional (óculos, proteção auditiva, coletes) quando necessário","Não é permitida roupa que represente risco de segurança"],
    uItems_care:["Lave e mantenha seus uniformes","Mantenha os uniformes em boas condições","Traga roupas apropriadas para as condições climáticas","A empresa substitui uniformes por desgaste normal a seu critério"],
    uItems_replacement:["Relate uniformes danificados ou desgastados à gerência","As substituições são aprovadas com base na condição e aprovação da gerência","Solicitações excessivas de substituição por mau cuidado podem ser negadas ou cobradas"],
    uItems_noncompliance:["Enviado para casa para se trocar","Removido do local de trabalho até estar em conformidade","Ação disciplinar por violações repetidas"],
  },
};

// ── LANGUAGE CONTEXT ──
const LangContext = React.createContext("en");
function useLang() { return React.useContext(LangContext); }
function useT()    { const lang = useLang(); return T[lang]; }

function FlagSelector({ lang, setLang }) {
  return (
    <div style={{display:"flex",gap:6,justifyContent:"flex-end",width:"100%",marginBottom:8}}>
      {Object.entries(FLAGS).map(([code,flag]) => (
        <button key={code} onClick={()=>{ saveLang(code); setLang(code); }}
          style={{background:lang===code?"var(--bark)":"transparent",border:lang===code?"1.5px solid var(--lime)":"1.5px solid transparent",borderRadius:8,padding:"4px 8px",fontSize:18,cursor:"pointer",transition:"all 0.15s",lineHeight:1,opacity:lang===code?1:0.5}}>
          {flag}
        </button>
      ))}
    </div>
  );
}

const CONTACTS = [
  { name:"Jonny", role:"General Manager",     initials:"JF", phone:"tel:+15085550001" },
  { name:"Jon",   role:"Mowing Manager",      initials:"JG", phone:"tel:+15085550002" },
  { name:"Tom",   role:"Residential Manager", initials:"TF", phone:"tel:+15085550003" },
  { name:"Joel",  role:"Commercial Manager",  initials:"JS", phone:"tel:+15085550004" },
  { name:"Katie", role:"Office Manager",      initials:"KR", phone:"tel:+15085550005" },
  { name:"Nikki", role:"IT & App Support",    initials:"NS", phone:"tel:+15084048480" },
];

const TOOL_INVENTORY = [
  { category:"Hand Tools", tools:[
    {id:"rake",name:"Rake",total:8},{id:"shovel",name:"Shovel",total:6},
    {id:"hoe",name:"Garden Hoe",total:5},{id:"trowel",name:"Hand Trowel",total:10},
    {id:"shears",name:"Pruning Shears",total:7},{id:"loppers",name:"Loppers",total:4},
    {id:"pitchfork",name:"Pitchfork",total:3},{id:"broom",name:"Push Broom",total:6},
  ]},
  { category:"Power Tools", tools:[
    {id:"blower",name:"Leaf Blower",total:6},{id:"trimmer",name:"String Trimmer",total:5},
    {id:"hedger",name:"Hedge Trimmer",total:4},{id:"chainsaw",name:"Chainsaw",total:2},
    {id:"edger",name:"Edger",total:3},
  ]},
  { category:"Trailer & Hauling", tools:[
    {id:"tarp",name:"Heavy Tarp",total:8},{id:"straps",name:"Tie-Down Straps",total:12},
    {id:"ramps",name:"Loading Ramps",total:4},{id:"wheelbarrow",name:"Wheelbarrow",total:5},
    {id:"buckets",name:"Buckets (5gal)",total:15},
  ]},
  { category:"Safety & PPE", tools:[
    {id:"gloves",name:"Work Gloves",total:20},{id:"glasses",name:"Safety Glasses",total:15},
    {id:"vest",name:"Safety Vest",total:10},{id:"earpro",name:"Ear Protection",total:10},
  ]},
];

// DOT structure — keys only, labels come from T
const DOT_CATEGORIES = [
  { key:"exterior", items:[
    {key:"tires_exterior",priority:"high"},{key:"lug_nuts",priority:"high"},
    {key:"lights_exterior",priority:"high"},{key:"mirrors",priority:"medium"},
    {key:"windshield",priority:"medium"},{key:"wipers",priority:"medium"},
    {key:"body_frame",priority:"medium"},
  ]},
  { key:"trailer", items:[
    {key:"tires_trailer",priority:"high"},{key:"lights_trailer",priority:"high"},
    {key:"hitch",priority:"high"},{key:"safety_chains",priority:"high"},
    {key:"trailer_brakes",priority:"high"},{key:"load_secured",priority:"high"},
    {key:"ramp_latch",priority:"medium"},
  ]},
  { key:"fluid", items:[
    {key:"engine_oil",priority:"medium"},{key:"coolant",priority:"medium"},
    {key:"brake_fluid",priority:"high"},{key:"transmission_fluid",priority:"medium"},
    {key:"fuel_level",priority:"low"},{key:"hydraulic_fluids",priority:"medium"},
  ]},
  { key:"interior", items:[
    {key:"seatbelts",priority:"high"},{key:"horn",priority:"medium"},
    {key:"gauges",priority:"medium"},{key:"fire_extinguisher",priority:"high"},
    {key:"first_aid",priority:"high"},{key:"loose_items_interior",priority:"medium"},
  ]},
  { key:"safety", items:[
    {key:"ppe",priority:"high"},{key:"warning_triangles",priority:"high"},
    {key:"no_leaks",priority:"high"},{key:"keys_removed",priority:"low"},
  ]},
];

const HIGH_PRIORITY_KEYS = [
  "tires_exterior","lug_nuts","lights_exterior",
  "tires_trailer","lights_trailer","hitch","safety_chains","trailer_brakes","load_secured",
  "brake_fluid","seatbelts","fire_extinguisher","first_aid",
  "ppe","warning_triangles","no_leaks",
];

const APPS_SCRIPT_URL     = "https://script.google.com/macros/s/AKfycbzKm07D55ohLfV45KGJN7WDGUlZL3qj1Ofpfn8P5gWiWm8yyDCZjsQbpfmptsm6EcBN/exec";
const DOT_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzW5asagcFUOEiL7_yz2gpgwIYhuQczcjY3tQKjDFNtH3-aU4nQjLxoFMgO562ePiDfSw/exec";

const HR_LINKS = [
  { name:"Time Off Request",   desc:"Submit Time Off Request",       url:"https://docs.google.com/forms/d/e/1FAIpQLSedVzxq3XCkB4TXwqvIGRtUVM6DRtaWmgYZtfcVZUoaAXVWeg/viewform?embedded=true" },
  { name:"Job Application",    desc:"Refer someone to the team",     url:"https://docs.google.com/forms/d/e/1FAIpQLSe405gWCY--4-chYWpku3PMaZ5zIl09W5HGCPUfDcbNuTuYYw/viewform?embedded=true" },
  { name:"Contact a Manager",  desc:"Send a message to management",  url:"https://docs.google.com/forms/d/e/1FAIpQLSfYI2b_yAxYk--McTBaVnToWfJjkWocWpaS6ZdJy98QaRtIIA/viewform?embedded=true" },
  { name:"Employee Handbook",  desc:"Company policies & procedures", url:"https://drive.google.com/file/d/1UPIOc2q7rs7h-VQcT6Cvv4eaG_-vePGs/preview" },
  { name:"Uniform Guidelines", desc:"Dress code & uniform standards", url:"inline" },
  { name:"Vehicle Guidelines", desc:"Fleet use & driving policies",  url:"" },
];

function getTodayStr() { return new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}); }
function getTimeStr()  { return new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}); }

// ── DOT WALKAROUND FORM ──────────────────────────────────────────────────────
function DOTWalkaroundForm({ truck, onBack, onDone }) {
  const t = useT();
  const [name,       setName]       = useState("");
  const [checks,     setChecks]     = useState({});
  const [notes,      setNotes]      = useState("");
  const [openCats,   setOpenCats]   = useState({exterior:true,trailer:true,fluid:true,interior:true,safety:true});
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [nameErr,    setNameErr]    = useState(false);

  const toggleCheck = key => setChecks(p => ({...p,[key]:!p[key]}));
  const toggleCat   = key => setOpenCats(p => ({...p,[key]:!p[key]}));

  const allItems      = DOT_CATEGORIES.flatMap(c => c.items);
  const uncheckedHigh = HIGH_PRIORITY_KEYS.filter(k => !checks[k]).length;
  const totalChecked  = allItems.filter(i => checks[i.key]).length;

  const handleSubmit = async () => {
    if (!name.trim()) { setNameErr(true); return; }
    setSubmitting(true);
    const today = new Date().toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric"});
    try {
      await fetch(DOT_APPS_SCRIPT_URL, {
        method:"POST", mode:"no-cors", headers:{"Content-Type":"text/plain"},
        body: JSON.stringify({ sheet:"DOT walkaround", date:today, time:getTimeStr(), truck:truck.label, name:name.trim(), division:"", checks, notes }),
      });
      setSubmitted(true);
    } catch(e) { console.warn(e); setSubmitted(true); }
    setSubmitting(false);
  };

  const inputStyle = {width:"100%",background:"var(--bark2)",border:"1px solid var(--moss)",borderRadius:8,padding:"12px 14px",color:"var(--cream)",fontFamily:"'Barlow',sans-serif",fontSize:15};

  if (submitted) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 0 16px",animation:"fadeUp 0.3s ease both"}}>
      <div style={{width:72,height:72,borderRadius:"50%",background:uncheckedHigh===0?"rgba(74,109,32,0.15)":"rgba(192,68,42,0.12)",border:`2px solid ${uncheckedHigh===0?"var(--leaf)":"var(--danger)"}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
        <Ic n={uncheckedHigh===0?"check":"alert"} style={{width:36,height:36,color:uncheckedHigh===0?"var(--lime)":"var(--danger)"}}/>
      </div>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:uncheckedHigh===0?"var(--lime)":"var(--danger)",letterSpacing:3,marginBottom:6}}>
        {uncheckedHigh===0?"PASS":"FLAGGED"}
      </div>
      {uncheckedHigh>0&&<div style={{fontSize:13,color:"var(--danger)",textAlign:"center",marginBottom:6}}>{uncheckedHigh} {t.dotFlagNote}</div>}
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
          <div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{truck.label} · {totalChecked}/{allItems.length} items</div>
        </div>
        {uncheckedHigh>0&&<div style={{background:"rgba(192,68,42,0.12)",border:"1px solid var(--danger)",borderRadius:6,padding:"3px 8px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--danger)",letterSpacing:1}}>{uncheckedHigh} HIGH</div>}
      </div>

      {/* Name */}
      <div style={{background:"var(--bark)",border:`1px solid ${nameErr?"var(--danger)":"var(--moss)"}`,borderRadius:10,padding:14,marginBottom:14}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:2,color:nameErr?"var(--danger)":"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.dotNameLabel}</div>
        <input style={{...inputStyle,borderColor:nameErr?"var(--danger)":"var(--moss)"}} type="text" placeholder={t.namePlaceholder} value={name} onChange={e=>{setName(e.target.value);setNameErr(false);}}/>
      </div>

      {/* Categories */}
      {DOT_CATEGORIES.map(cat => {
        const isOpen = openCats[cat.key];
        const checkedCount = cat.items.filter(i => checks[i.key]).length;
        return (
          <div key={cat.key} style={{marginBottom:8}}>
            <div className="dot-cat-header" onClick={()=>toggleCat(cat.key)}>
              <span className="dot-cat-label">{t[`dotCat_${cat.key}`]}</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--stone)",marginRight:6}}>{checkedCount}/{cat.items.length}</span>
              <Ic n="chev" className={`chevron ${isOpen?"open":""}`}/>
            </div>
            {isOpen && cat.items.map(item => {
              const isChecked = !!checks[item.key];
              const isFlagged = !isChecked && item.priority==="high";
              return (
                <div key={item.key} className={`dot-item ${isChecked?"checked":""} ${isFlagged?"flagged":""}`} onClick={()=>toggleCheck(item.key)}>
                  <div className={`dot-checkbox ${isChecked?"checked":""}`}>{isChecked&&<Ic n="check"/>}</div>
                  <span className="dot-item-label">{t[`dot_${item.key}`]}</span>
                  <span className={`dot-priority ${item.priority}`}>{item.priority}</span>
                </div>
              );
            })}
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

      {/* Warning */}
      {uncheckedHigh>0&&(
        <div style={{background:"rgba(192,68,42,0.08)",border:"1px solid rgba(192,68,42,0.3)",borderRadius:8,padding:"10px 14px",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
          <Ic n="alert" style={{width:14,height:14,color:"var(--danger)",flexShrink:0}}/>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--danger)",letterSpacing:0.3}}>{t.dotUncheckedWarning(uncheckedHigh)}</span>
        </div>
      )}

      <button disabled={submitting} onClick={handleSubmit}
        style={{width:"100%",padding:"16px",background:submitting?"var(--moss)":"var(--lime)",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:3,color:"var(--earth)",cursor:submitting?"not-allowed":"pointer",marginBottom:8,transition:"background 0.2s"}}>
        {submitting?t.dotSubmitting:t.dotSubmit}
      </button>
      <button onClick={onBack} style={{width:"100%",padding:"12px",background:"none",border:"1px solid var(--moss)",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:2,color:"var(--stone)",cursor:"pointer"}}>{t.cancel}</button>
    </div>
  );
}

// ── UNIFORM GUIDE ─────────────────────────────────────────────────────────────
function UniformGuideInline() {
  const t = useT();
  const [open, setOpen] = useState({});
  const tog = k => setOpen(p => ({...p,[k]:!p[k]}));

  const S = ({ k, icon, bg, titleKey, children }) => (
    <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:9,marginBottom:8,overflow:"hidden"}}>
      <div onClick={()=>tog(k)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",cursor:"pointer",background:open[k]?"var(--bark2)":"var(--bark)",transition:"background 0.15s"}}>
        <div style={{width:32,height:32,borderRadius:8,background:bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <Ic n={icon} style={{width:14,height:14,color:"var(--leaf)"}}/>
        </div>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)",flex:1}}>{t[titleKey]}</span>
        <Ic n="chev" style={{width:14,height:14,color:"var(--stone)",transition:"transform 0.2s",transform:open[k]?"rotate(90deg)":"none"}}/>
      </div>
      {open[k]&&<div style={{padding:"4px 14px 14px",borderTop:"1px solid var(--moss)",animation:"fadeUp 0.2s ease both"}}>{children}</div>}
    </div>
  );

  const Items = ({ items, color }) => (
    <ul style={{listStyle:"none",margin:"10px 0 0",display:"flex",flexDirection:"column",gap:7}}>
      {items.map((item,i)=>(
        <li key={i} style={{display:"flex",gap:8,alignItems:"flex-start",fontSize:13,color:color||"var(--stone)",lineHeight:1.5}}>
          <span style={{width:5,height:5,borderRadius:"50%",background:color||"var(--stone)",flexShrink:0,marginTop:5}}/>
          {item}
        </li>
      ))}
    </ul>
  );

  const Sub = ({ labelKey, danger }) => (
    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:2,textTransform:"uppercase",color:danger?"var(--danger)":"var(--stone)",marginTop:10}}>{t[labelKey]}</div>
  );

  const Note = ({ noteKey }) => (
    <div style={{marginTop:10,background:"rgba(74,109,32,0.08)",border:"1px solid rgba(74,109,32,0.2)",borderRadius:8,padding:"9px 12px",fontSize:12,color:"var(--leaf)",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:0.3,lineHeight:1.5}}>{t[noteKey]}</div>
  );

  return (
    <div style={{animation:"fadeUp 0.3s ease both"}}>
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--lime)",borderRadius:10,padding:"14px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:40,height:40,borderRadius:8,background:"var(--moss)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <Ic n="shield" style={{width:18,height:18,color:"var(--lime)"}}/>
        </div>
        <div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--lime)",letterSpacing:2,lineHeight:1}}>{t.uniformTitle}</div>
          <div style={{fontSize:12,color:"var(--stone)",marginTop:3}}>{t.uniformSubtitle}</div>
        </div>
      </div>

      <S k="purpose" icon="clip" bg="rgba(74,109,32,0.12)" titleKey="uSec_purpose">
        <Items items={t.uItems_purpose}/>
      </S>
      <S k="issuance" icon="box" bg="rgba(74,109,32,0.12)" titleKey="uSec_issuance">
        <Items items={t.uItems_issuance}/>
      </S>
      <S k="required" icon="check" bg="rgba(74,109,32,0.12)" titleKey="uSec_required">
        <Sub labelKey="uSub_required"/>
        <Items items={t.uItems_required}/>
        <Sub labelKey="uSub_notAllowed" danger/>
        <Items items={t.uItems_notAllowed} color="var(--danger)"/>
      </S>
      <S k="clean" icon="sun" bg="rgba(160,96,16,0.1)" titleKey="uSec_clean">
        <Sub labelKey="uSub_standards"/>
        <Items items={t.uItems_standards}/>
        <Sub labelKey="uSub_unacceptable" danger/>
        <Items items={t.uItems_unacceptable} color="var(--danger)"/>
        <Note noteKey="uNote_clean"/>
      </S>
      <S k="appearance" icon="shield" bg="rgba(42,90,149,0.1)" titleKey="uSec_appearance">
        <Items items={t.uItems_appearance}/>
      </S>
      <S k="safetyReq" icon="wrench" bg="rgba(192,68,42,0.1)" titleKey="uSec_safety">
        <Items items={t.uItems_safetyReq}/>
      </S>
      <S k="care" icon="undo" bg="rgba(122,104,69,0.1)" titleKey="uSec_care">
        <Items items={t.uItems_care}/>
        <Note noteKey="uNote_care"/>
      </S>
      <S k="replacement" icon="clock" bg="rgba(160,96,16,0.1)" titleKey="uSec_replacement">
        <Items items={t.uItems_replacement}/>
      </S>
      <S k="noncompliance" icon="del" bg="rgba(192,68,42,0.1)" titleKey="uSec_noncompliance">
        <Items items={t.uItems_noncompliance} color="var(--danger)"/>
      </S>

      <div style={{background:"rgba(74,109,32,0.07)",border:"1px solid rgba(74,109,32,0.2)",borderRadius:9,padding:"12px 14px",marginTop:4,fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--leaf)",lineHeight:1.5,letterSpacing:0.3}}>
        {t.uniformFooter}
      </div>
    </div>
  );
}

// ── TOOLS TAB ────────────────────────────────────────────────────────────────
function ToolsTab({ truck, checkouts, setCheckouts }) {
  const t = useT();
  const [openCats, setOpenCats] = useState({"Hand Tools":true});
  const [pending,  setPending]  = useState({});

  const totalOut  = id => Object.values(checkouts).flat().filter(c=>c.toolId===id).reduce((s,c)=>s+c.qty,0);
  const available = (id,total) => total - totalOut(id);
  const myCheckouts = checkouts[truck.id]||[];

  const checkout = (toolId,toolName,qty) => {
    if(qty<1) return;
    setCheckouts(prev=>({...prev,[truck.id]:[...(prev[truck.id]||[]),{toolId,toolName,qty,time:getTimeStr(),id:Date.now()}]}));
    setPending(p=>({...p,[toolId]:0}));
  };
  const returnTool = id => setCheckouts(prev=>({...prev,[truck.id]:(prev[truck.id]||[]).filter(c=>c.id!==id)}));

  return (
    <div>
      {myCheckouts.length>0&&(
        <>
          <div className="section-hd">{t.checkedOut}</div>
          {myCheckouts.map(co=>(
            <div key={co.id} className="checked-out-row">
              <Ic n="check" style={{width:13,height:13,color:"var(--lime)",flexShrink:0}}/>
              <div style={{flex:1}}><div className="tool-name">{co.toolName}</div><div style={{fontSize:11,color:"var(--stone)",marginTop:1}}>{t.since(co.time)}</div></div>
              <span className="co-qty-badge">×{co.qty}</span>
              <button className="return-btn" onClick={()=>returnTool(co.id)}>{t.return_}</button>
            </div>
          ))}
          <div style={{height:12}}/>
        </>
      )}
      <div className="section-hd">{t.toolInventory}</div>
      {TOOL_INVENTORY.map(cat=>{
        const avail  = cat.tools.reduce((s,tool)=>s+available(tool.id,tool.total),0);
        const isOpen = openCats[cat.category];
        return (
          <div key={cat.category}>
            <div className="tool-cat-header" onClick={()=>setOpenCats(o=>({...o,[cat.category]:!o[cat.category]}))}>
              <Ic n="box" style={{width:15,height:15,color:"var(--leaf)",flexShrink:0}}/>
              <span className="tool-cat-label">{cat.category}</span>
              <span className="tool-cat-count">{t.avail(avail)}</span>
              <Ic n="chev" className={`chevron ${isOpen?"open":""}`} style={{marginLeft:4}}/>
            </div>
            {isOpen&&cat.tools.map(tool=>{
              const avl = available(tool.id,tool.total);
              const qty = pending[tool.id]??0;
              return (
                <div key={tool.id} className="tool-row">
                  <div className="tool-info">
                    <div className="tool-name">{tool.name}</div>
                    <div className={`tool-avail ${avl===0?"none":avl<=2?"low":"ok"}`}>{avl===0?t.noneAvail:t.of(avl,tool.total)}</div>
                  </div>
                  {avl>0&&(
                    <div className="qty-row">
                      <button className="qty-btn" disabled={qty<=0} onClick={()=>setPending(p=>({...p,[tool.id]:Math.max(0,(p[tool.id]??0)-1)}))}> − </button>
                      <span className="qty-num">{qty}</span>
                      <button className="qty-btn" disabled={qty>=avl} onClick={()=>setPending(p=>({...p,[tool.id]:Math.min(avl,(p[tool.id]??0)+1)}))}> + </button>
                      <button className="checkout-btn" disabled={qty<1} onClick={()=>checkout(tool.id,tool.name,qty)}>{t.checkOut}</button>
                    </div>
                  )}
                  {avl===0&&<span style={{fontSize:11,color:"var(--danger)",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>{t.allOut}</span>}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ── CONTACT DROPDOWN ─────────────────────────────────────────────────────────
function ContactDropdown() {
  const t = useT();
  const [open,setOpen]         = useState(false);
  const [selected,setSelected] = useState(null);
  return (
    <div>
      <div className="truck-dropdown-wrap">
        <div className={`truck-dropdown-btn ${open?"open":""}`} onClick={()=>setOpen(o=>!o)}>
          <Ic n="phone" style={{width:16,height:16,color:selected?"var(--lime)":"var(--stone)"}}/>
          {selected?<span className="truck-dropdown-value">{selected.name} — {selected.role}</span>:<span className="truck-dropdown-placeholder">{t.chooseMgr}</span>}
          <Ic n="chevD" className={`truck-dropdown-chevron ${open?"open":""}`} style={{width:16,height:16}}/>
        </div>
        {open&&(
          <div className="truck-dropdown-list">
            {CONTACTS.map(c=>(
              <div key={c.name} className={`truck-dropdown-item ${selected?.name===c.name?"selected":""}`} onClick={()=>{setSelected(c);setOpen(false);}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:"var(--moss)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"'Bebas Neue',sans-serif",fontSize:12,color:"var(--lime)",letterSpacing:1}}>{c.initials}</div>
                <div><div style={{fontWeight:500,fontSize:14,color:"var(--cream)"}}>{c.name}</div><div style={{fontSize:12,color:"var(--stone)",marginTop:1}}>{c.role}</div></div>
                {selected?.name===c.name&&<Ic n="check" style={{width:14,height:14,marginLeft:"auto",color:"var(--lime)"}}/>}
              </div>
            ))}
          </div>
        )}
      </div>
      {selected&&(
        <div className="contact-card" style={{marginTop:10}}>
          <div className="contact-avatar">{selected.initials}</div>
          <div className="contact-info"><div className="contact-name">{selected.name}</div><div className="contact-role">{selected.role}</div></div>
          <a href={selected.phone} className="call-btn"><Ic n="phone"/></a>
        </div>
      )}
    </div>
  );
}

// ── HOME TAB ─────────────────────────────────────────────────────────────────
function HomeTab({ truck, division, onOpenDOT, dotComplete }) {
  const t   = useT();
  const day = getTodayStr();
  return (
    <div>
      <div className="greeting">
        <div className="greeting-icon"><Ic n="truck"/></div>
        <div><div className="greet-name">{truck.label}</div><div className="greet-sub">{day}</div></div>
      </div>

      <div className="section-hd">{t.dailyForms}</div>

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

      {/* Morning Rollout */}
      <div className="action-card" style={{opacity:0.6,cursor:"default"}}>
        <div className="action-card-icon"><Ic n="sun"/></div>
        <div className="action-card-info">
          <div className="action-card-name">{t.morningRollout}</div>
          <div className="action-card-desc">{t.morningDesc}</div>
          <span className="status-chip chip-pending">{t.comingSoon}</span>
        </div>
      </div>

      {/* Trailer Checklist */}
      <div className="action-card" onClick={()=>window.open("https://forms.gle/7GE4hZFKo9DUeuqf6","_blank")}>
        <div className="action-card-icon"><Ic n="clip"/></div>
        <div className="action-card-info">
          <div className="action-card-name">{t.trailerCheck}</div>
          <div className="action-card-desc">{t.trailerDesc}</div>
          <span className="status-chip chip-pending">{t.pending}</span>
        </div>
        <div className="action-card-arrow"><Ic n="chev"/></div>
      </div>

      <div className="section-hd" style={{marginTop:8}}>{t.contactMgr}</div>
      <ContactDropdown/>
    </div>
  );
}

// ── RECEIPT FLOW ─────────────────────────────────────────────────────────────
function NativeReceiptFlow({ truckLabel, divisionLabel, onGoHome, onClose }) {
  const t     = useT();
  const today = new Date().toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric"});
  const [step,       setStep]      = useState("form");
  const [submitting, setSubmitting] = useState(false);
  const [uploading,  setUploading]  = useState(false);
  const [photoUrl,   setPhotoUrl]   = useState("");
  const [formErr,    setFormErr]    = useState("");
  const photoRef = useRef();
  const [fields, setFields] = useState({name:"",division:divisionLabel||"",type:"",gallons:"",fuelType:"",atShop:null,vendor:"",total:"",notes:""});
  const set = (k,v) => { setFields(f=>({...f,[k]:v})); setFormErr(""); };
  const isFuel   = fields.type===t.fuel;
  const isWalkIn = !truckLabel;
  const displayTruck = truckLabel||"General Submission";

  const validate = () => {
    if(!fields.name.trim())    return t.errName;
    if(!fields.division)       return t.errDivision;
    if(!fields.type)           return t.errType;
    if(isFuel){
      if(!fields.gallons.trim()) return t.errGallons;
      if(!fields.fuelType)       return t.errFuelType;
      if(fields.atShop===null)   return t.errLocation;
      if(fields.atShop===false&&!fields.total.trim()) return t.errCost;
    } else {
      if(!fields.vendor.trim()) return t.errVendor;
      if(!fields.total.trim())  return t.errTotal;
    }
    return null;
  };

  const toBase64 = file => new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(",")[1]);r.onerror=rej;r.readAsDataURL(file);});

  const handleSubmit = async () => {
    const err=validate(); if(err){setFormErr(err);return;}
    setSubmitting(true);
    try {
      await fetch(APPS_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},
        body:JSON.stringify({sheet:"Receipts",date:today,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),name:fields.name,truck:displayTruck,division:fields.division,type:fields.type,vendor:isFuel?"Fuel":fields.vendor,gallons:isFuel?fields.gallons:"",fuelType:isFuel?fields.fuelType:"",location:isFuel?(fields.atShop?"Shop":"Gas Station"):"",total:isFuel?(fields.atShop?"":fields.total):fields.total,notes:fields.notes,sendEmail:true,emailTo:"admin@jandjandsonlawncare.com"})});
      setStep("photo");
    } catch(e){console.warn(e);}
    setSubmitting(false);
  };

  const handlePhoto = async e => {
    const file=e.target.files?.[0]; if(!file) return;
    setUploading(true);
    try {
      const b64=await toBase64(file);
      await fetch(APPS_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain"},
        body:JSON.stringify({sheet:"Receipts",photo:b64,photoMime:file.type||"image/jpeg",photoName:`receipt_${displayTruck.replace(/\s/g,"_")}_${Date.now()}.jpg`,photoOnly:true})});
      setPhotoUrl(URL.createObjectURL(file)); setStep("success");
    } catch(e){console.warn(e);}
    setUploading(false);
  };

  const reset = () => {setStep("form");setPhotoUrl("");setFormErr("");setFields({name:"",division:divisionLabel||"",type:"",gallons:"",fuelType:"",atShop:null,vendor:"",total:"",notes:""});};
  const inputStyle = {width:"100%",background:"var(--bark2)",border:"1px solid var(--moss)",borderRadius:8,padding:"12px 14px",color:"var(--cream)",fontFamily:"'Barlow',sans-serif",fontSize:15};

  const StepBar = ({done}) => (
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
      {["Details","Photo"].map((sl,i)=>{
        const active=done>i; const current=done===i;
        return (
          <React.Fragment key={i}>
            {i>0&&<div style={{flex:1,height:2,background:active?"var(--lime)":"var(--moss)",borderRadius:1}}/>}
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:active?"var(--moss)":current?"var(--lime)":"transparent",border:`2px solid ${active||current?"var(--lime)":"var(--moss)"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {active?<Ic n="check" style={{width:12,height:12,color:"var(--earth)"}}/>:<span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:current?"var(--earth)":"var(--stone)"}}>{i+1}</span>}
              </div>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,letterSpacing:1,color:active?"var(--stone)":current?"var(--lime)":"var(--stone)",textDecoration:active?"line-through":"none"}}>{sl}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );

  if(step==="form") return (
    <div style={{animation:"fadeUp 0.3s ease both"}}>
      <StepBar done={0}/>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:3,color:"var(--stone)",marginBottom:10}}>{t.part1}</div>
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:12,padding:16,marginBottom:14}}>
        <div style={{marginBottom:14}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.yourName}</div><input style={inputStyle} type="text" placeholder={t.namePlaceholder} value={fields.name} onChange={e=>set("name",e.target.value)}/></div>
        {!isWalkIn&&(<div style={{marginBottom:14}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.truck}</div><div style={{...inputStyle,color:"var(--stone)",background:"var(--bark)",cursor:"default",display:"flex",alignItems:"center",gap:8}}><Ic n="truck" style={{width:14,height:14,flexShrink:0}}/>{truckLabel}</div></div>)}
        <div style={{marginBottom:14}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.division}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
            {[t.maintenance,t.construction].map(o=>(<button key={o} onClick={()=>set("division",o)} style={{background:fields.division===o?"rgba(74,109,32,0.15)":"var(--bark2)",border:`1.5px solid ${fields.division===o?"var(--lime)":"var(--moss)"}`,borderRadius:8,padding:"11px 6px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:600,color:fields.division===o?"var(--lime)":"var(--stone)",cursor:"pointer",transition:"all 0.15s"}}>{o}</button>))}
          </div>
        </div>
        <div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.receiptType}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
            {[t.fuel,t.materials,t.toolsSupplies,t.other].map(o=>(<button key={o} onClick={()=>{set("type",o);set("gallons","");set("fuelType","");set("atShop",null);set("vendor","");set("total","");}} style={{background:fields.type===o?"rgba(74,109,32,0.15)":"var(--bark2)",border:`1.5px solid ${fields.type===o?"var(--lime)":"var(--moss)"}`,borderRadius:8,padding:"11px 6px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:600,color:fields.type===o?"var(--lime)":"var(--stone)",cursor:"pointer",transition:"all 0.15s"}}>{o}</button>))}
          </div>
        </div>
      </div>
      {isFuel&&(
        <div style={{animation:"fadeUp 0.25s ease both"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:3,color:"var(--warn)",marginBottom:10,display:"flex",alignItems:"center",gap:8}}>{t.part2Fuel}<span style={{flex:1,height:1,background:"rgba(160,96,16,0.3)",display:"block"}}/></div>
          <div style={{background:"var(--bark)",border:"1.5px solid rgba(160,96,16,0.3)",borderLeft:"4px solid var(--warn)",borderRadius:12,padding:16,marginBottom:14}}>
            <div style={{marginBottom:14}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.gallons}</div><input style={inputStyle} type="number" inputMode="decimal" placeholder={t.gallonsPlaceholder} value={fields.gallons} onChange={e=>set("gallons",e.target.value)}/></div>
            <div style={{marginBottom:14}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.fuelType}</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7}}>{[t.regular,t.diesel,t.premium].map(o=>(<button key={o} onClick={()=>set("fuelType",o)} style={{background:fields.fuelType===o?"rgba(74,109,32,0.15)":"var(--bark2)",border:`1.5px solid ${fields.fuelType===o?"var(--lime)":"var(--moss)"}`,borderRadius:8,padding:"11px 6px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:600,color:fields.fuelType===o?"var(--lime)":"var(--stone)",cursor:"pointer",transition:"all 0.15s"}}>{o}</button>))}</div>
            </div>
            <div style={{marginBottom:fields.atShop===false?14:0}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.whereDidYouFuel}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>{[{label:t.atShop,val:true},{label:t.gasStation,val:false}].map(({label,val})=>(<button key={label} onClick={()=>{set("atShop",val);if(val)set("total","");}} style={{background:fields.atShop===val?"rgba(74,109,32,0.15)":"var(--bark2)",border:`1.5px solid ${fields.atShop===val?"var(--lime)":"var(--moss)"}`,borderRadius:8,padding:"11px 6px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:600,color:fields.atShop===val?"var(--lime)":"var(--stone)",cursor:"pointer",transition:"all 0.15s"}}>{label}</button>))}</div>
            </div>
            {fields.atShop===false&&(<div style={{animation:"fadeUp 0.2s ease both"}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.totalCost}</div><input style={inputStyle} type="number" inputMode="decimal" placeholder="0.00" value={fields.total} onChange={e=>set("total",e.target.value)}/></div>)}
            {fields.atShop===true&&(<div style={{marginTop:12,background:"rgba(74,109,32,0.08)",border:"1px solid rgba(74,109,32,0.25)",borderRadius:8,padding:"10px 12px",fontSize:12,color:"var(--leaf)",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:0.5}}>{t.shopConfirm}</div>)}
          </div>
        </div>
      )}
      {fields.type&&!isFuel&&(
        <div style={{animation:"fadeUp 0.25s ease both"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:3,color:"var(--stone)",marginBottom:10}}>{t.part2Purchase}</div>
          <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:12,padding:16,marginBottom:14}}>
            <div style={{marginBottom:14}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.vendor}</div><input style={inputStyle} type="text" placeholder={t.vendorPlaceholder} value={fields.vendor} onChange={e=>set("vendor",e.target.value)}/></div>
            <div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6}}>{t.totalAmount}</div><input style={inputStyle} type="number" inputMode="decimal" placeholder="0.00" value={fields.total} onChange={e=>set("total",e.target.value)}/></div>
          </div>
        </div>
      )}
      {fields.type&&(
        <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:12,padding:16,marginBottom:14,animation:"fadeUp 0.2s ease both"}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6,display:"flex",alignItems:"center",gap:6}}>{t.notes}<span style={{color:"var(--moss)",fontSize:11,letterSpacing:1,textTransform:"none",fontWeight:400}}>(optional)</span></div>
          <textarea style={{...inputStyle,resize:"none",height:76}} placeholder={t.notesPlaceholder} value={fields.notes} onChange={e=>set("notes",e.target.value)}/>
        </div>
      )}
      {formErr&&<div className="error-msg" style={{marginBottom:12}}>{formErr}</div>}
      <button disabled={submitting} onClick={handleSubmit} style={{width:"100%",padding:"16px",background:submitting?"var(--moss)":"var(--lime)",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:3,color:"var(--earth)",cursor:submitting?"not-allowed":"pointer",marginBottom:8,transition:"background 0.2s"}}>{submitting?t.saving:t.nextPhoto}</button>
      {onClose&&<button onClick={onClose} style={{width:"100%",padding:"12px",background:"none",border:"1px solid var(--moss)",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:2,color:"var(--stone)",cursor:"pointer"}}>{t.cancel}</button>}
    </div>
  );

  if(step==="photo") return (
    <div style={{animation:"fadeUp 0.3s ease both"}}>
      <StepBar done={1}/>
      <div className="success-banner" style={{marginBottom:16}}><Ic n="check" style={{width:14,height:14,flexShrink:0}}/> {t.receiptSaved}</div>
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:12,padding:16,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
          <div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,color:"var(--cream)"}}>{fields.name}</div><div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{displayTruck} · {fields.division}</div></div>
          <div style={{textAlign:"right"}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--lime)",lineHeight:1}}>{isFuel&&fields.atShop?`${fields.gallons} gal`:`$${fields.total}`}</div><div style={{fontSize:11,color:"var(--stone)",marginTop:2}}>{fields.type}{isFuel?` · ${fields.fuelType}`:""}</div></div>
        </div>
        {isFuel&&<div style={{fontSize:12,color:"var(--stone)"}}>{fields.atShop?t.atShop:t.gasStation}{fields.gallons?` · ${fields.gallons} gal`:""}</div>}
        {!isFuel&&<div style={{fontSize:12,color:"var(--stone)"}}>{fields.vendor}</div>}
      </div>
      <div style={{fontSize:13,color:"var(--stone)",marginBottom:10}}>{t.photoDesc}</div>
      <input ref={photoRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={handlePhoto}/>
      <div className="receipt-upload" onClick={()=>!uploading&&photoRef.current.click()} style={{opacity:uploading?0.6:1,marginBottom:12,borderColor:uploading?"var(--moss)":"var(--leaf)",padding:"28px 16px"}}>
        <Ic n="camera" style={{width:32,height:32,color:uploading?"var(--stone)":"var(--lime)"}}/>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,letterSpacing:1,color:uploading?"var(--stone)":"var(--cream)"}}>{uploading?t.uploading:t.tapCamera}</span>
        <span style={{fontSize:11,color:"var(--stone)"}}>{t.required}</span>
      </div>
    </div>
  );

  return (
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

// ── HR ────────────────────────────────────────────────────────────────────────
function HRContent({ link }) {
  if(link.name==="Uniform Guidelines") return <UniformGuideInline/>;
  return <iframe src={link.url} style={{width:"100%",height:"calc(100dvh - 180px)",border:"none",display:"block",borderRadius:8}} title={link.name}/>;
}

function HRTab() {
  const t = useT();
  const [openHR,setOpenHR] = useState(null);
  return (
    <div>
      {!openHR?(
        <>
          <div className="section-hd">HR &amp; Employee Portal</div>
          {HR_LINKS.map(f=>(
            <div key={f.name} style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--mgr)",borderRadius:9,padding:"13px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:f.url?"pointer":"default",opacity:f.url?1:0.6}} onClick={()=>{if(f.url)setOpenHR(f);}}>
              <div style={{width:34,height:34,borderRadius:8,background:"rgba(74,122,181,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="shield" style={{width:15,height:15,color:"var(--mgr-lt)"}}/></div>
              <div style={{flex:1}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)"}}>{f.name}</div><div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{f.desc}</div></div>
              {f.url?<Ic n="chev" style={{width:16,height:16,color:"var(--moss)"}}/>:<span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:1,color:"var(--stone)",textTransform:"uppercase"}}>{t.comingSoon}</span>}
            </div>
          ))}
        </>
      ):(
        <div style={{animation:"fadeUp 0.3s ease both"}}>
          <button className="back-btn" style={{marginBottom:14}} onClick={()=>setOpenHR(null)}><Ic n="back"/> {t.backHR}</button>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,color:"var(--cream)",marginBottom:10}}>{openHR.name}</div>
          <HRContent link={openHR}/>
        </div>
      )}
    </div>
  );
}

function ReceiptTab({ truck, division, onGoHome }) {
  return (
    <div style={{padding:"16px 16px 100px"}}>
      <div className="section-hd">Submit a Receipt</div>
      <NativeReceiptFlow truckLabel={truck.label} divisionLabel={division} onGoHome={onGoHome}/>
    </div>
  );
}

// ── TRUCK HOME ────────────────────────────────────────────────────────────────
function TruckHome({ truck, initialDivision, onLogout, checkouts, setCheckouts }) {
  const t = useT();
  const [tab,         setTab]        = useState("home");
  const [showDOT,     setShowDOT]    = useState(false);
  const [dotComplete, setDotComplete] = useState(false);
  const [division]                   = useState(initialDivision||"");
  const myCheckoutCount = (checkouts[truck.id]||[]).reduce((s,c)=>s+c.qty,0);

  return (
    <div className="screen">
      <div className="topbar">
        <div className="topbar-left">
          <div className="topbar-title">J&amp;J &amp; Son</div>
          <div className="truck-pill"><Ic n="truck"/>{truck.label}</div>
        </div>
        <button className="logout-btn" onClick={onLogout}>{t.signOut}</button>
      </div>
      <div className="content" style={{padding:tab==="receipt"?"0":undefined}}>
        {tab==="home"&&!showDOT&&<HomeTab truck={truck} division={division} onOpenDOT={()=>setShowDOT(true)} dotComplete={dotComplete}/>}
        {tab==="home"&&showDOT&&(
          <div>
            <button className="back-btn" style={{marginBottom:14}} onClick={()=>setShowDOT(false)}><Ic n="back"/> {t.back}</button>
            <DOTWalkaroundForm truck={truck} onBack={()=>setShowDOT(false)} onDone={()=>{setShowDOT(false);setDotComplete(true);setTab("home");}}/>
          </div>
        )}
        {tab==="receipt"&&<ReceiptTab truck={truck} division={division} onGoHome={()=>setTab("home")}/>}
        {tab==="tools"  &&<ToolsTab truck={truck} checkouts={checkouts} setCheckouts={setCheckouts}/>}
        {tab==="hr"     &&<HRTab/>}
      </div>
      <nav className="bottom-nav">
        <button className={`bnav-btn ${tab==="home"?"active":""}`}    onClick={()=>{setTab("home");setShowDOT(false);}}><Ic n="home"/>{t.home}</button>
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
function MgrToolsTab({ checkouts }) {
  const allTools = TOOL_INVENTORY.flatMap(c=>c.tools.map(t=>({...t,category:c.category})));
  const totalOut = id => Object.values(checkouts).flat().filter(c=>c.toolId===id).reduce((s,c)=>s+c.qty,0);
  const trucksWithTool = id => { const res=[]; Object.entries(checkouts).forEach(([tid,cos])=>{const qty=cos.filter(c=>c.toolId===id).reduce((s,c)=>s+c.qty,0);if(qty>0)res.push({tid,qty});}); return res; };
  const toolsOut = allTools.filter(t=>totalOut(t.id)>0);
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:18}}>
        {[{label:"Total Tools",val:allTools.reduce((s,t)=>s+t.total,0),color:"var(--stone)"},{label:"Checked Out",val:Object.values(checkouts).flat().reduce((s,c)=>s+c.qty,0),color:"var(--warn)"},{label:"Available",val:allTools.reduce((s,t)=>s+(t.total-totalOut(t.id)),0),color:"var(--lime)"}].map(stat=>(
          <div key={stat.label} style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:10,padding:"12px 10px",textAlign:"center"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:stat.color,lineHeight:1}}>{stat.val}</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:9,color:"var(--stone)",letterSpacing:1,textTransform:"uppercase",marginTop:3}}>{stat.label}</div>
          </div>
        ))}
      </div>
      {toolsOut.length>0&&(<><div className="section-hd" style={{color:"var(--warn)"}}>Currently Out</div>{toolsOut.map(tool=>{const out=totalOut(tool.id);const trucks=trucksWithTool(tool.id);return(<div key={tool.id} className="mgr-tool-row"><div className="mgr-tool-top"><span className="mgr-tool-name">{tool.name}</span><div className="mgr-tool-nums"><span className="num-chip nc-total">{tool.total} total</span><span className="num-chip nc-out">{out} out</span><span className="num-chip nc-avail">{tool.total-out} left</span></div></div><div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:4}}>{trucks.map(t=><span key={t.tid} className="truck-tag">Truck {t.tid} ×{t.qty}</span>)}</div></div>);})}</>)}
      <div className="section-hd" style={{marginTop:16}}>Full Inventory</div>
      {TOOL_INVENTORY.map(cat=>(<div key={cat.category} style={{marginBottom:14}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--stone)",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>{cat.category}</div>{cat.tools.map(tool=>{const out=totalOut(tool.id);const avl=tool.total-out;return(<div key={tool.id} className="mgr-tool-row" style={{marginBottom:6}}><div className="mgr-tool-top"><span className="mgr-tool-name">{tool.name}</span><div className="mgr-tool-nums"><span className="num-chip nc-total">{tool.total}</span>{out>0&&<span className="num-chip nc-out">{out} out</span>}<span className={`num-chip ${avl===0?"nc-out":"nc-avail"}`}>{avl} avail</span></div></div></div>);})}</div>))}
    </div>
  );
}

const SHEETS_ID  = "1PMRNlpefHWFVRn59wfJH1za7tfIAmftAfG9kF4-dy4Q";
const SHEETS_KEY = "AIzaSyBj9Hxi1MUSq4MBToFxqKG1QDwJBu9PyJw";

function ManagerZone({ onLogout, checkouts, signIns }) {
  const [tab,            setTab]             = useState("fleet");
  const [selectedTruck,  setSelTruck]        = useState(null);
  const [receipts,       setReceipts]        = useState([]);
  const [receiptsLoading,setReceiptsLoading] = useState(false);
  const activeTrucks = Object.entries(signIns);

  useEffect(()=>{
    const fetchReceipts = async () => {
      setReceiptsLoading(true);
      const today = new Date().toLocaleDateString();
      try {
        const [r1,r2] = await Promise.all([
          fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/Receipts?key=${SHEETS_KEY}`).then(r=>r.json()),
          fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/Fuel%20Log?key=${SHEETS_KEY}`).then(r=>r.json()),
        ]);
        const parseRows=(data,type)=>{const rows=data.values||[];if(rows.length<2)return[];return rows.slice(1).filter(r=>r[0]===today).map(r=>({date:r[0]||"",time:r[1]||"",truck:r[2]||"",division:r[3]||"",type:r[4]||type,total:r[5]||"",merchant:r[6]||"",photoUrl:r[7]||""}));};
        setReceipts([...parseRows(r1,"Receipt"),...parseRows(r2,"Fuel")]);
      } catch(e){console.warn("Receipts fetch failed",e);}
      setReceiptsLoading(false);
    };
    fetchReceipts();
  },[]);

  const truckReceipts = truckId => receipts.filter(r=>r.truck===`Truck ${truckId}`);

  return (
    <div className="screen" style={{background:"#ddd9d0"}}>
      <div className="mgr-topbar">
        <div style={{display:"flex",alignItems:"center",gap:8}}><Ic n="shield" style={{width:15,height:15,color:"var(--mgr-lt)"}}/><div className="mgr-topbar-title">Manager Zone</div></div>
        <div style={{display:"flex",alignItems:"center",gap:8}}><span className="mgr-badge">Admin</span><button className="logout-btn" onClick={onLogout}>Out</button></div>
      </div>
      <div className="content" style={{background:"#ddd9d0"}}>
        {tab==="fleet"&&!selectedTruck&&(
          <>
            <div className="section-hd" style={{color:"var(--mgr)"}}>Active Trucks</div>
            {activeTrucks.length===0&&<div style={{textAlign:"center",padding:"30px 0",color:"var(--stone)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,letterSpacing:1,textTransform:"uppercase"}}>No trucks signed in</div>}
            {activeTrucks.map(([truckId,info])=>(
              <div key={truckId} className="fleet-row" onClick={()=>setSelTruck({truckId,...info})}>
                <Ic n="truck" style={{width:18,height:18,color:"var(--lime)",flexShrink:0}}/>
                <div className="fleet-truck-num">{truckId}</div>
                <div className="fleet-info"><div className="fleet-division">{info.division||"No division selected"}</div><div className="fleet-time">Signed in at {info.signInTime}</div></div>
                <div className="fleet-arrow"><Ic n="chev"/></div>
              </div>
            ))}
          </>
        )}
        {tab==="fleet"&&selectedTruck&&(
          <div className="truck-detail">
            <button className="back-btn" style={{marginBottom:16}} onClick={()=>setSelTruck(null)}><Ic n="back"/>Back to Fleet</button>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:"var(--lime)",letterSpacing:2,marginBottom:14}}>Truck {selectedTruck.truckId}</div>
            {[{icon:"clock",label:"Signed In",val:selectedTruck.signInTime},{icon:"home",label:"Division",val:selectedTruck.division||"Not selected"},{icon:"sun",label:"Morning Rollout",val:"Pending"},{icon:"clip",label:"Trailer Checklist",val:"Pending"}].map(s=>(
              <div key={s.label} className="detail-stat"><div className="detail-stat-icon"><Ic n={s.icon}/></div><div className="detail-stat-info"><div className="detail-stat-label">{s.label}</div><div className="detail-stat-val">{s.val}</div></div></div>
            ))}
            <div className="section-hd" style={{marginTop:8,color:"var(--mgr)"}}>Receipts & Fuel Logs Today</div>
            {receiptsLoading?<div style={{fontSize:13,color:"var(--stone)",padding:"8px 0"}}>Loading...</div>:truckReceipts(selectedTruck.truckId).length===0?<div style={{fontSize:13,color:"var(--stone)",padding:"8px 0"}}>No submissions today</div>:truckReceipts(selectedTruck.truckId).map((r,i)=>(
              <div key={i} style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:8,padding:"10px 13px",marginBottom:6}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)"}}>{r.type}</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--sand)"}}>{r.time}</div></div>
                <div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontSize:12,color:"var(--stone)"}}>{r.merchant||"—"}</div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"var(--lime)"}}>${r.total}</div></div>
                {r.photoUrl&&<div style={{display:"flex",alignItems:"center",gap:5,marginTop:6}}><Ic n="check" style={{width:12,height:12,color:"var(--lime)",flexShrink:0}}/><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,color:"var(--lime)",letterSpacing:1}}>Photo Uploaded</span></div>}
              </div>
            ))}
            <div className="section-hd" style={{marginTop:8}}>Tools Checked Out</div>
            {(checkouts[selectedTruck.truckId]||[]).length===0?<div style={{fontSize:13,color:"var(--stone)",padding:"12px 0"}}>No tools checked out</div>:(checkouts[selectedTruck.truckId]||[]).map(co=>(
              <div key={co.id} style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:8,padding:"10px 13px",marginBottom:6,display:"flex",alignItems:"center",gap:10}}>
                <div style={{flex:1}}><div className="tool-name">{co.toolName}</div><div style={{fontSize:11,color:"var(--stone)",marginTop:1}}>Since {co.time}</div></div>
                <span className="co-qty-badge">×{co.qty}</span>
              </div>
            ))}
          </div>
        )}
        {tab==="tools"&&<MgrToolsTab checkouts={checkouts}/>}
      </div>
      <nav className="bottom-nav" style={{background:"#d0ccc2",borderTopColor:"#b0aa9a"}}>
        <button className={`bnav-btn ${tab==="fleet"?"active":""}`} style={tab==="fleet"?{color:"var(--mgr-lt)",borderBottomColor:"var(--mgr)"}:{}} onClick={()=>{setTab("fleet");setSelTruck(null);}}><Ic n="truck"/>Fleet</button>
        <button className={`bnav-btn ${tab==="tools"?"active":""}`} style={tab==="tools"?{color:"var(--mgr-lt)",borderBottomColor:"var(--mgr)"}:{}} onClick={()=>setTab("tools")}><Ic n="wrench"/>Tools</button>
      </nav>
    </div>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
const MEMORY_KEY = "jj_truck_memory";
function getTodayDateStr() { return new Date().toLocaleDateString("en-US"); }
function loadMemory() { try{const raw=localStorage.getItem(MEMORY_KEY);if(!raw)return null;const mem=JSON.parse(raw);if(mem.date!==getTodayDateStr()){localStorage.removeItem(MEMORY_KEY);return null;}return mem;}catch(e){return null;} }
function saveMemory(truck) { try{localStorage.setItem(MEMORY_KEY,JSON.stringify({truckId:truck.id,date:getTodayDateStr()}));}catch(e){} }
function clearMemory() { try{localStorage.removeItem(MEMORY_KEY);}catch(e){} }

function LoginScreen({ onTruckLogin, onMgrLogin, lang, setLang }) {
  const t = useT();
  const memory = loadMemory();
  const rememberedTruck = memory?TRUCKS.find(tr=>tr.id===memory.truckId)||null:null;
  const [mode,        setMode]        = useState("truck");
  const [dropOpen,    setDropOpen]    = useState(false);
  const [selected,    setSel]         = useState(rememberedTruck);
  const [mgrPass,     setMgrPass]     = useState("");
  const [error,       setError]       = useState("");
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [hrOpen,      setHrOpen]      = useState(false);
  const [openHR,      setOpenHR]      = useState(null);

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
                {dropOpen&&<div className="truck-dropdown-list">{TRUCKS.map(tr=>(<div key={tr.id} className={`truck-dropdown-item ${selected?.id===tr.id?"selected":""}`} onClick={()=>{setSel(tr);setDropOpen(false);setError("");}}><Ic n="truck" style={{width:14,height:14}}/>{tr.label}{selected?.id===tr.id&&<Ic n="check" style={{width:14,height:14,marginLeft:"auto",color:"var(--lime)"}}/>}</div>))}</div>}
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
                    {HR_LINKS.map(f=>(
                      <div key={f.name} style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--mgr)",borderRadius:9,padding:"13px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:f.url?"pointer":"default",opacity:f.url?1:0.6}} onClick={()=>{if(f.url)setOpenHR(f);}}>
                        <div style={{width:34,height:34,borderRadius:8,background:"rgba(74,122,181,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="shield" style={{width:15,height:15,color:"var(--mgr-lt)"}}/></div>
                        <div style={{flex:1}}><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)"}}>{f.name}</div><div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{f.desc}</div></div>
                        {f.url?<Ic n="chev" style={{width:16,height:16,color:"var(--moss)"}}/>:<span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:1,color:"var(--stone)",textTransform:"uppercase"}}>{t.comingSoon}</span>}
                      </div>
                    ))}
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
          <div className="fuel-label" style={{marginBottom:8}}>{t.mgrPassword}</div>
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
  const [screen,    setScreen]    = useState("login");
  const [truck,     setTruck]     = useState(null);
  const [truckDiv,  setTruckDiv]  = useState("");
  const [checkouts, setCheckouts] = useState({});
  const [signIns,   setSignIns]   = useState({});
  const [lang,      setLang]      = useState(detectLang);

  const handleTruckLogin = t => {
    const time = getTimeStr();
    setSignIns(prev=>({...prev,[t.id]:{signInTime:time,division:""}}));
    setTruck(t); setTruckDiv(""); setScreen("truck");
  };
  const handleLogout = () => { setTruck(null); setTruckDiv(""); setScreen("login"); };

  return (
    <LangContext.Provider value={lang}>
      <style>{css}</style>
      <div className="app">
        {screen==="login"   &&<LoginScreen onTruckLogin={handleTruckLogin} onMgrLogin={()=>setScreen("manager")} lang={lang} setLang={setLang}/>}
        {screen==="truck"   &&truck&&<TruckHome truck={truck} initialDivision={truckDiv} onLogout={handleLogout} checkouts={checkouts} setCheckouts={setCheckouts}/>}
        {screen==="manager" &&<ManagerZone onLogout={()=>setScreen("login")} checkouts={checkouts} signIns={signIns}/>}
      </div>
    </LangContext.Provider>
  );
}
