import { useState, useEffect, useRef } from "react";

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
  position: relative; overflow: hidden;
}
.app::before {
  content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.5;
}
@keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
@keyframes slideIn { from { opacity:0; transform:translateX(32px); } to { opacity:1; transform:translateX(0); } }
@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }

/* ── LOGIN ── */
.splash {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  padding: 36px 24px 60px; position: relative; z-index: 1;
  animation: fadeUp 0.4s ease both; overflow-y: auto;
}
.logo-wrap { display: flex; flex-direction: column; align-items: center; margin-bottom: 32px; }
.logo-img { width: 72px; height: 72px; object-fit: contain; margin-bottom: 12px; }
.app-title { font-family: 'Bebas Neue', sans-serif; font-size: 42px; letter-spacing: 5px; color: var(--lime); line-height: 1; }
.app-sub { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; letter-spacing: 4px; color: var(--stone); text-transform: uppercase; margin-top: 4px; }

.select-label { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; letter-spacing: 3px; color: var(--stone); text-transform: uppercase; margin-bottom: 8px; align-self: flex-start; width: 100%; }

/* Custom dropdown */
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
  position: absolute; top: 100%; left: 0; right: 0; z-index: 100;
  background: var(--bark); border: 1.5px solid var(--lime);
  border-top: none; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;
  max-height: 240px; overflow-y: auto; box-shadow: 0 8px 24px rgba(0,0,0,0.12);
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

/* PIN screen */
.pin-screen { width: 100%; animation: slideIn 0.3s ease both; }
.pin-truck-header {
  display: flex; align-items: center; gap: 10px; background: var(--bark);
  border: 1px solid var(--moss); border-left: 4px solid var(--lime);
  border-radius: 10px; padding: 14px 16px; margin-bottom: 20px;
}
.pin-truck-header svg { color: var(--lime); flex-shrink: 0; }
.pin-truck-name { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--lime); letter-spacing: 2px; }
.pin-truck-sub { font-size: 12px; color: var(--stone); margin-top: 1px; }
.back-btn {
  display: flex; align-items: center; gap: 6px; background: none; border: none;
  font-family: 'Barlow Condensed', sans-serif; font-size: 13px; letter-spacing: 1px;
  color: var(--stone); cursor: pointer; text-transform: uppercase; margin-bottom: 16px;
  padding: 0;
}
.back-btn svg { width: 14px; height: 14px; }
.pin-dots { display: flex; gap: 14px; justify-content: center; margin-bottom: 20px; }
.pin-dot {
  width: 16px; height: 16px; border-radius: 50%;
  border: 2px solid var(--moss); background: transparent;
  transition: background 0.15s, border-color 0.15s, transform 0.1s;
}
.pin-dot.filled { background: var(--lime); border-color: var(--lime); transform: scale(1.1); }
.numpad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 9px; }
.num-btn {
  background: var(--bark2); border: 1px solid var(--moss); border-radius: 10px;
  padding: 16px 8px; font-family: 'Bebas Neue', sans-serif; font-size: 24px;
  color: var(--cream); cursor: pointer; transition: background 0.1s, transform 0.1s;
  display: flex; align-items: center; justify-content: center;
  -webkit-tap-highlight-color: transparent;
}
.num-btn:active { background: var(--moss); transform: scale(0.93); }
.num-btn.zero { grid-column: 2; }
.btn-enter {
  width: 100%; padding: 14px; margin-top: 14px; background: var(--lime);
  border: none; border-radius: 10px; font-family: 'Bebas Neue', sans-serif;
  font-size: 20px; letter-spacing: 3px; color: var(--earth); cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
}
.btn-enter:disabled { background: var(--moss); color: var(--stone); cursor: not-allowed; }
.btn-enter:not(:disabled):active { opacity: 0.85; transform: scale(0.98); }
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

/* Manager login */
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

/* ── MAIN APP SCREEN ── */
.screen { flex: 1; display: flex; flex-direction: column; position: relative; z-index: 1; animation: fadeUp 0.35s ease both; }
.topbar {
  background: var(--bark); border-bottom: 3px solid var(--leaf);
  padding: 12px 16px 10px; display: flex; align-items: center;
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
.content { padding: 16px 16px 100px; overflow-y: auto; flex: 1; }
.section-hd {
  font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 3px;
  color: var(--stone); text-transform: uppercase; margin-bottom: 10px;
  display: flex; align-items: center; gap: 8px;
}
.section-hd::after { content:''; flex:1; height:1px; background:var(--moss); }

/* Greeting */
.greeting {
  background: var(--bark); border: 1px solid var(--moss);
  border-left: 4px solid var(--lime); border-radius: 10px;
  padding: 14px 16px; margin-bottom: 18px; display: flex; align-items: center; gap: 14px;
}
.greeting-icon {
  width: 44px; height: 44px; border-radius: 10px; background: var(--moss);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.greeting-icon svg { width: 22px; height: 22px; color: var(--lime); }
.greet-name { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: var(--lime); line-height: 1; }
.greet-sub { font-size: 13px; color: var(--stone); margin-top: 3px; }

/* Division selector */
.division-selector { margin-bottom: 20px; }
.division-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.division-tile {
  background: var(--bark); border: 1.5px solid var(--moss); border-radius: 10px;
  padding: 12px 14px; cursor: pointer; transition: border-color 0.15s, background 0.15s;
  font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 14px; color: var(--stone);
  letter-spacing: 0.5px; text-align: center;
}
.division-tile:active { transform: scale(0.97); }
.division-tile.selected { border-color: var(--lime); background: rgba(74,109,32,0.1); color: var(--lime); }

/* Action cards (forms) */
.action-card {
  background: var(--bark); border: 1px solid var(--moss);
  border-left: 4px solid var(--leaf); border-radius: 9px;
  padding: 14px 16px; margin-bottom: 10px;
  display: flex; align-items: center; gap: 14px; cursor: pointer;
  transition: background 0.15s;
}
.action-card:active { background: var(--bark2); }
.action-card-icon {
  width: 38px; height: 38px; border-radius: 8px; background: var(--moss);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.action-card-icon svg { width: 18px; height: 18px; color: var(--lime); }
.action-card-info { flex: 1; }
.action-card-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; color: var(--cream); }
.action-card-desc { font-size: 12px; color: var(--stone); margin-top: 2px; }
.action-card-arrow { color: var(--moss); }
.action-card-arrow svg { width: 16px; height: 16px; }
.status-chip {
  font-family: 'Barlow Condensed', sans-serif; font-size: 11px; letter-spacing: 1px;
  text-transform: uppercase; padding: 3px 8px; border-radius: 4px; margin-top: 4px; display: inline-block;
}
.chip-done { background: rgba(74,109,32,0.12); color: var(--lime); }
.chip-pending { background: rgba(160,96,16,0.12); color: var(--warn); }

/* Contact list */
.contact-card {
  background: var(--bark); border: 1px solid var(--moss); border-radius: 9px;
  padding: 13px 15px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px;
}
.contact-avatar {
  width: 40px; height: 40px; border-radius: 50%; background: var(--moss);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  font-family: 'Bebas Neue', sans-serif; font-size: 16px; color: var(--lime); letter-spacing: 1px;
}
.contact-info { flex: 1; }
.contact-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; color: var(--cream); }
.contact-role { font-size: 12px; color: var(--stone); margin-top: 1px; }
.call-btn {
  width: 38px; height: 38px; border-radius: 50%; background: var(--lime);
  border: none; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: opacity 0.2s, transform 0.1s; flex-shrink: 0;
}
.call-btn:active { opacity: 0.85; transform: scale(0.93); }
.call-btn svg { width: 16px; height: 16px; color: var(--earth); }

/* ── FUEL LOG TAB ── */
.fuel-form { background: var(--bark); border: 1px solid var(--moss); border-radius: 12px; padding: 18px; margin-bottom: 16px; }
.fuel-row { margin-bottom: 14px; }
.fuel-label { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; letter-spacing: 2px; color: var(--stone); text-transform: uppercase; margin-bottom: 6px; }
.fuel-input {
  width: 100%; background: var(--bark2); border: 1px solid var(--moss); border-radius: 8px;
  padding: 12px 14px; color: var(--cream); font-family: 'Barlow', sans-serif; font-size: 15px;
}
.fuel-input:focus { outline: none; border-color: var(--lime); }
.fuel-type-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.fuel-type-btn {
  background: var(--bark2); border: 1.5px solid var(--moss); border-radius: 8px;
  padding: 10px 6px; font-family: 'Barlow Condensed', sans-serif; font-size: 13px;
  font-weight: 600; color: var(--stone); cursor: pointer; text-align: center;
  transition: border-color 0.15s, background 0.15s;
}
.fuel-type-btn.selected { border-color: var(--lime); background: rgba(74,109,32,0.1); color: var(--lime); }
.receipt-upload {
  width: 100%; background: var(--bark2); border: 1.5px dashed var(--moss);
  border-radius: 8px; padding: 20px; display: flex; flex-direction: column;
  align-items: center; gap: 8px; cursor: pointer; transition: border-color 0.15s;
}
.receipt-upload:hover { border-color: var(--lime); }
.receipt-upload svg { width: 24px; height: 24px; color: var(--stone); }
.receipt-upload span { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; color: var(--stone); letter-spacing: 1px; }
.receipt-preview { width: 100%; border-radius: 8px; overflow: hidden; border: 1px solid var(--moss); }
.receipt-preview img { width: 100%; display: block; }
.btn-submit {
  width: 100%; padding: 14px; background: var(--lime); border: none; border-radius: 10px;
  font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 3px;
  color: var(--earth); cursor: pointer; transition: opacity 0.2s;
}
.btn-submit:disabled { background: var(--moss); color: var(--stone); cursor: not-allowed; }
.btn-submit:not(:disabled):active { opacity: 0.85; }
.success-banner {
  background: rgba(74,109,32,0.12); border: 1px solid var(--leaf);
  border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;
  font-family: 'Barlow Condensed', sans-serif; font-size: 14px; color: var(--lime);
  display: flex; align-items: center; gap: 8px; letter-spacing: 0.5px;
}

/* ── TOOLS TAB ── */
.tool-cat-header {
  padding: 12px 14px; display: flex; align-items: center; gap: 10px;
  cursor: pointer; background: var(--bark); border: 1px solid var(--moss);
  border-radius: 10px; margin-bottom: 8px;
}
.tool-cat-label { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px; color: var(--cream); flex: 1; }
.tool-cat-count { font-family: 'Barlow Condensed', sans-serif; font-size: 13px; color: var(--stone); }
.chevron { width: 16px; height: 16px; color: var(--stone); transition: transform 0.22s; flex-shrink: 0; }
.chevron.open { transform: rotate(90deg); }
.tool-row {
  background: var(--bark); border: 1px solid var(--moss); border-radius: 9px;
  padding: 12px 14px; margin-bottom: 8px; display: flex; align-items: center; gap: 10px;
}
.tool-info { flex: 1; min-width: 0; }
.tool-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 14px; color: var(--cream); }
.tool-avail { font-size: 12px; margin-top: 2px; }
.tool-avail.ok { color: var(--leaf); }
.tool-avail.low { color: var(--warn); }
.tool-avail.none { color: var(--danger); }
.qty-row { display: flex; align-items: center; gap: 8px; }
.qty-btn {
  width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--moss);
  background: var(--bark2); color: var(--cream); font-size: 16px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.1s; flex-shrink: 0;
}
.qty-btn:active { background: var(--moss); }
.qty-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.qty-num { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--lime); min-width: 22px; text-align: center; }
.checkout-btn {
  padding: 7px 12px; background: var(--lime); border: none; border-radius: 8px;
  font-family: 'Bebas Neue', sans-serif; font-size: 13px; letter-spacing: 1px;
  color: var(--earth); cursor: pointer; transition: opacity 0.2s; white-space: nowrap;
}
.checkout-btn:disabled { background: var(--moss); color: var(--stone); cursor: not-allowed; }
.checked-out-row {
  background: rgba(74,109,32,0.07); border: 1px solid rgba(74,109,32,0.25);
  border-radius: 9px; padding: 12px 14px; margin-bottom: 8px;
  display: flex; align-items: center; gap: 10px;
}
.return-btn {
  padding: 7px 11px; background: none; border: 1px solid var(--leaf);
  border-radius: 8px; font-family: 'Bebas Neue', sans-serif; font-size: 13px;
  letter-spacing: 1px; color: var(--lime); cursor: pointer; white-space: nowrap;
}
.return-btn:active { background: rgba(74,109,32,0.15); }
.co-qty-badge {
  background: var(--moss); border-radius: 6px; padding: 2px 7px;
  font-family: 'Bebas Neue', sans-serif; font-size: 15px; color: var(--lime);
}

/* ── MANAGER ZONE ── */
.mgr-topbar {
  background: #d8d4ca; border-bottom: 3px solid var(--mgr);
  padding: 12px 16px 10px; display: flex; align-items: center;
  justify-content: space-between; position: sticky; top: 0; z-index: 50;
}
.mgr-topbar-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--mgr-lt); letter-spacing: 2px; }
.mgr-badge {
  font-family: 'Barlow Condensed', sans-serif; font-size: 12px; letter-spacing: 2px;
  text-transform: uppercase; color: var(--mgr-lt); background: rgba(74,122,181,0.2);
  border: 1px solid var(--mgr); border-radius: 20px; padding: 4px 10px;
}
.fleet-row {
  background: var(--bark); border: 1px solid var(--moss); border-radius: 9px;
  padding: 13px 15px; margin-bottom: 8px; display: flex; align-items: center;
  gap: 12px; cursor: pointer; transition: background 0.15s;
}
.fleet-row:active { background: var(--bark2); }
.fleet-truck-num {
  font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--lime);
  letter-spacing: 1px; min-width: 36px;
}
.fleet-info { flex: 1; }
.fleet-division { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px; color: var(--cream); }
.fleet-time { font-size: 12px; color: var(--stone); margin-top: 2px; }
.fleet-arrow { color: var(--moss); }

/* Truck detail */
.truck-detail { animation: slideIn 0.3s ease both; }
.detail-stat {
  background: var(--bark); border: 1px solid var(--moss); border-radius: 9px;
  padding: 13px 15px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px;
}
.detail-stat-icon {
  width: 34px; height: 34px; border-radius: 8px; background: var(--moss);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.detail-stat-icon svg { width: 15px; height: 15px; color: var(--leaf); }
.detail-stat-info { flex: 1; }
.detail-stat-label { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; color: var(--stone); letter-spacing: 1px; text-transform: uppercase; }
.detail-stat-val { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 15px; color: var(--cream); margin-top: 2px; }

/* Manager tools overview */
.mgr-tool-row {
  background: var(--bark); border: 1px solid var(--moss); border-radius: 9px;
  padding: 12px 14px; margin-bottom: 8px;
}
.mgr-tool-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.mgr-tool-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 14px; color: var(--cream); }
.mgr-tool-nums { display: flex; gap: 6px; }
.num-chip { font-family: 'Barlow Condensed', sans-serif; font-size: 12px; padding: 2px 7px; border-radius: 4px; letter-spacing: 0.5px; }
.nc-total { background: rgba(122,122,106,0.2); color: var(--stone); }
.nc-out   { background: rgba(160,96,16,0.2); color: var(--warn); }
.nc-avail { background: rgba(74,109,32,0.2); color: var(--leaf); }
.truck-tag {
  background: var(--moss); border-radius: 4px; padding: 2px 6px;
  font-family: 'Barlow Condensed', sans-serif; font-size: 12px; color: var(--sand);
}

/* ── BOTTOM NAV ── */
.bottom-nav {
  position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 100%; max-width: 430px; background: var(--bark);
  border-top: 2px solid var(--moss); display: flex; z-index: 100;
  padding-bottom: env(safe-area-inset-bottom);
}
.bnav-btn {
  flex: 1; padding: 10px 4px 8px; background: none; border: none; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  font-family: 'Barlow Condensed', sans-serif; font-size: 11px; color: var(--stone);
  letter-spacing: 1px; text-transform: uppercase; border-bottom: 3px solid transparent;
  transition: color 0.2s;
}
.bnav-btn.active { color: var(--lime); border-bottom-color: var(--lime); }
.bnav-btn svg { width: 22px; height: 22px; }
`;

// ── Icons ──
const Ic = ({ n, ...p }) => {
  const paths = {
    truck:   <><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    chev:    <><polyline points="9,18 15,12 9,6"/></>,
    chevD:   <><polyline points="6,9 12,15 18,9"/></>,
    back:    <><polyline points="15,18 9,12 15,6"/></>,
    clip:    <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></>,
    shield:  <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    phone:   <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.83 5.83l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></>,
    fuel:    <><line x1="3" y1="22" x2="3" y2="2"/><path d="M3 10h12v12H3z"/><path d="M15 6l4 4"/><path d="M19 2v8"/></>,
    wrench:  <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>,
    home:    <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></>,
    check:   <><polyline points="20,6 9,17 4,12"/></>,
    camera:  <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></>,
    box:     <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    clock:   <><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></>,
    del:     <><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></>,
    sun:     <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></>,
    undo:    <><polyline points="9,14 4,9 9,4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>{paths[n]}</svg>;
};

// ── CONSTANTS ──
const TRUCKS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1, label: `Truck ${i + 1}`,
  pin: String(1000 + (i + 1) * 11).slice(0, 4),
}));

const DIVISIONS = ["Maintenance", "Construction", "Lighting & Irrigation", "Fine Gardening"];



const CONTACTS = [
  { name: "General Manager",     initials: "GM", phone: "tel:+15085550001" },
  { name: "Mowing Crew Manager", initials: "MC", phone: "tel:+15085550002" },
  { name: "Residential Manager", initials: "RM", phone: "tel:+15085550003" },
  { name: "Commercial Manager",  initials: "CM", phone: "tel:+15085550004" },
];

const TOOL_INVENTORY = [
  { category: "Hand Tools", tools: [
    { id: "rake",      name: "Rake",           total: 8 },
    { id: "shovel",    name: "Shovel",          total: 6 },
    { id: "hoe",       name: "Garden Hoe",      total: 5 },
    { id: "trowel",    name: "Hand Trowel",     total: 10 },
    { id: "shears",    name: "Pruning Shears",  total: 7 },
    { id: "loppers",   name: "Loppers",         total: 4 },
    { id: "pitchfork", name: "Pitchfork",       total: 3 },
    { id: "broom",     name: "Push Broom",      total: 6 },
  ]},
  { category: "Power Tools", tools: [
    { id: "blower",   name: "Leaf Blower",    total: 6 },
    { id: "trimmer",  name: "String Trimmer", total: 5 },
    { id: "hedger",   name: "Hedge Trimmer",  total: 4 },
    { id: "chainsaw", name: "Chainsaw",       total: 2 },
    { id: "edger",    name: "Edger",          total: 3 },
  ]},
  { category: "Trailer & Hauling", tools: [
    { id: "tarp",        name: "Heavy Tarp",       total: 8 },
    { id: "straps",      name: "Tie-Down Straps",  total: 12 },
    { id: "ramps",       name: "Loading Ramps",    total: 4 },
    { id: "wheelbarrow", name: "Wheelbarrow",      total: 5 },
    { id: "buckets",     name: "Buckets (5gal)",   total: 15 },
  ]},
  { category: "Safety & PPE", tools: [
    { id: "gloves",  name: "Work Gloves",    total: 20 },
    { id: "glasses", name: "Safety Glasses", total: 15 },
    { id: "vest",    name: "Safety Vest",    total: 10 },
    { id: "earpro",  name: "Ear Protection", total: 10 },
  ]},
];

const SHEETS_ID  = "1PMRNlpefHWFVRn59wfJH1za7tfIAmftAfG9kF4-dy4Q";
const SHEETS_KEY = "AIzaSyBj9Hxi1MUSq4MBToFxqKG1QDwJBu9PyJw";

const NUMKEYS = ["1","2","3","4","5","6","7","8","9","del","0","enter"];

function getTodayStr() {
  return new Date().toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric" });
}
function getTimeStr() {
  return new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
}

// ── TOOLS TAB ──
function ToolsTab({ truck, division, checkouts, setCheckouts }) {
  const [openCats, setOpenCats] = useState({ "Hand Tools": true });
  const [pending, setPending]   = useState({});

  const totalOut = id => Object.values(checkouts).flat().filter(c => c.toolId === id).reduce((s,c)=>s+c.qty,0);
  const available = (id, total) => total - totalOut(id);
  const myCheckouts = checkouts[truck.id] || [];

  const checkout = (toolId, toolName, qty) => {
    if (qty < 1) return;
    setCheckouts(prev => ({
      ...prev,
      [truck.id]: [...(prev[truck.id]||[]), { toolId, toolName, qty, time: getTimeStr(), id: Date.now() }],
    }));
    setPending(p => ({ ...p, [toolId]: 0 }));
  };
  const returnTool = id => setCheckouts(prev => ({ ...prev, [truck.id]: (prev[truck.id]||[]).filter(c=>c.id!==id) }));

  return (
    <div>
      {myCheckouts.length > 0 && (
        <>
          <div className="section-hd">Checked Out</div>
          {myCheckouts.map(co => (
            <div key={co.id} className="checked-out-row">
              <Ic n="check" style={{width:13,height:13,color:"var(--lime)",flexShrink:0}}/>
              <div style={{flex:1}}>
                <div className="tool-name">{co.toolName}</div>
                <div style={{fontSize:11,color:"var(--stone)",marginTop:1}}>Since {co.time}</div>
              </div>
              <span className="co-qty-badge">×{co.qty}</span>
              <button className="return-btn" onClick={()=>returnTool(co.id)}>Return</button>
            </div>
          ))}
          <div style={{height:12}}/>
        </>
      )}
      <div className="section-hd">Tool Inventory</div>
      {TOOL_INVENTORY.map(cat => {
        const avail = cat.tools.reduce((s,t)=>s+available(t.id,t.total),0);
        const isOpen = openCats[cat.category];
        return (
          <div key={cat.category}>
            <div className="tool-cat-header" onClick={()=>setOpenCats(o=>({...o,[cat.category]:!o[cat.category]}))}>
              <Ic n="box" style={{width:15,height:15,color:"var(--leaf)",flexShrink:0}}/>
              <span className="tool-cat-label">{cat.category}</span>
              <span className="tool-cat-count">{avail} avail</span>
              <Ic n="chev" className={`chevron ${isOpen?"open":""}`} style={{marginLeft:4}}/>
            </div>
            {isOpen && cat.tools.map(tool => {
              const avl = available(tool.id, tool.total);
              const qty = pending[tool.id] ?? 0;
              return (
                <div key={tool.id} className="tool-row">
                  <div className="tool-info">
                    <div className="tool-name">{tool.name}</div>
                    <div className={`tool-avail ${avl===0?"none":avl<=2?"low":"ok"}`}>
                      {avl===0?"None available":`${avl} of ${tool.total} available`}
                    </div>
                  </div>
                  {avl > 0 && (
                    <div className="qty-row">
                      <button className="qty-btn" disabled={qty<=0} onClick={()=>setPending(p=>({...p,[tool.id]:Math.max(0,(p[tool.id]??0)-1)}))}> − </button>
                      <span className="qty-num">{qty}</span>
                      <button className="qty-btn" disabled={qty>=avl} onClick={()=>setPending(p=>({...p,[tool.id]:Math.min(avl,(p[tool.id]??0)+1)}))}> + </button>
                      <button className="checkout-btn" disabled={qty<1} onClick={()=>checkout(tool.id,tool.name,qty)}>Check Out</button>
                    </div>
                  )}
                  {avl===0 && <span style={{fontSize:11,color:"var(--danger)",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:1}}>ALL OUT</span>}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ── FUEL LOG TAB ──
function FuelTab({ truck, division }) {
  const [gallons,   setGallons]   = useState("");
  const [cost,      setCost]      = useState("");
  const [fuelType,  setFuelType]  = useState("");
  const [receipt,   setReceipt]   = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting,setSubmitting]= useState(false);
  const fileRef = useRef();

  const handlePhoto = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setReceipt({ file, url });
  };

  const canSubmit = gallons && cost && fuelType;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    const now  = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
    // In production: upload receipt to Drive, get link, then append to sheet
    // For now we append all text fields
    try {
      const body = {
        values: [[date, time, `Truck ${truck.id}`, division || "—", gallons, cost, fuelType, receipt ? "[receipt attached]" : ""]],
      };
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/Fuel%20Log:append?valueInputOption=USER_ENTERED&key=${SHEETS_KEY}`,
        { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) }
      );
    } catch(e) { console.warn("Sheet append failed", e); }
    setSubmitting(false);
    setSubmitted(true);
    setGallons(""); setCost(""); setFuelType(""); setReceipt(null);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div>
      {submitted && (
        <div className="success-banner">
          <Ic n="check" style={{width:16,height:16,flexShrink:0}}/> Fuel log submitted successfully!
        </div>
      )}
      <div className="section-hd">Log a Fuel Stop</div>
      <div className="fuel-form">
        <div className="fuel-row">
          <div className="fuel-label">Auto-filled</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div style={{background:"var(--bark2)",border:"1px solid var(--moss)",borderRadius:8,padding:"10px 14px"}}>
              <div style={{fontSize:10,color:"var(--stone)",letterSpacing:1,textTransform:"uppercase",marginBottom:2}}>Truck</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"var(--lime)",letterSpacing:1}}>Truck {truck.id}</div>
            </div>
            <div style={{background:"var(--bark2)",border:"1px solid var(--moss)",borderRadius:8,padding:"10px 14px"}}>
              <div style={{fontSize:10,color:"var(--stone)",letterSpacing:1,textTransform:"uppercase",marginBottom:2}}>Division</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:600,color:"var(--cream)"}}>{division||"Not set"}</div>
            </div>
          </div>
        </div>

        <div className="fuel-row">
          <div className="fuel-label">Gallons Pumped</div>
          <input className="fuel-input" type="number" inputMode="decimal" placeholder="0.0"
            value={gallons} onChange={e=>setGallons(e.target.value)}/>
        </div>

        <div className="fuel-row">
          <div className="fuel-label">Total Cost ($)</div>
          <input className="fuel-input" type="number" inputMode="decimal" placeholder="0.00"
            value={cost} onChange={e=>setCost(e.target.value)}/>
        </div>

        <div className="fuel-row">
          <div className="fuel-label">Fuel Type</div>
          <div className="fuel-type-grid">
            {["Regular","Diesel","Premium"].map(t=>(
              <button key={t} className={`fuel-type-btn ${fuelType===t?"selected":""}`}
                onClick={()=>setFuelType(t)}>{t}</button>
            ))}
          </div>
        </div>

        <div className="fuel-row">
          <div className="fuel-label">Receipt Photo</div>
          <input ref={fileRef} type="file" accept="image/*" capture="environment"
            style={{display:"none"}} onChange={handlePhoto}/>
          {receipt ? (
            <div>
              <div className="receipt-preview"><img src={receipt.url} alt="receipt"/></div>
              <button style={{marginTop:8,width:"100%",background:"none",border:"1px solid var(--moss)",borderRadius:8,padding:"8px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--stone)",cursor:"pointer",letterSpacing:1}}
                onClick={()=>setReceipt(null)}>Remove Photo</button>
            </div>
          ) : (
            <div className="receipt-upload" onClick={()=>fileRef.current.click()}>
              <Ic n="camera"/>
              <span>Tap to capture receipt</span>
            </div>
          )}
        </div>

        <button className="btn-submit" disabled={!canSubmit||submitting} onClick={handleSubmit}>
          {submitting ? "Submitting..." : "Submit Fuel Log"}
        </button>
      </div>
    </div>
  );
}

// ── HOME TAB ──
function HomeTab({ truck, division, setDivision }) {
  const day = getTodayStr();
  const formLinks = [
    { name: "Morning Rollout",    desc: "Start-of-day checklist", url: "", icon: "sun" },
    { name: "Trailer Checklist",  desc: "Pre-departure equipment check", url: "https://forms.gle/7GE4hZFKo9DUeuqf6", icon: "clip" },
  ];

  return (
    <div>
      {/* Greeting */}
      <div className="greeting">
        <div className="greeting-icon"><Ic n="truck"/></div>
        <div>
          <div className="greet-name">{truck.label}</div>
          <div className="greet-sub">{day} · Ready to roll</div>
        </div>
      </div>

      {/* Division selector */}
      <div className="section-hd">Your Division</div>
      <div className="division-selector">
        <div className="division-grid">
          {DIVISIONS.map(d=>(
            <div key={d} className={`division-tile ${division===d?"selected":""}`}
              onClick={()=>setDivision(d)}>{d}</div>
          ))}
        </div>
      </div>

      {/* Forms */}
      <div className="section-hd">Daily Forms</div>
      {formLinks.map(f=>(
        <div key={f.name} className="action-card"
          onClick={()=>{ if(f.url) window.open(f.url,"_blank"); }}>
          <div className="action-card-icon"><Ic n={f.icon}/></div>
          <div className="action-card-info">
            <div className="action-card-name">{f.name}</div>
            <div className="action-card-desc">{f.desc}</div>
            <span className={`status-chip ${f.url?"chip-pending":"chip-pending"}`}>
              {f.url?"Pending":"Coming Soon"}
            </span>
          </div>
          <div className="action-card-arrow"><Ic n="chev"/></div>
        </div>
      ))}

      {/* Contacts */}
      <div className="section-hd" style={{marginTop:8}}>Contact a Manager</div>
      {CONTACTS.map(c=>(
        <div key={c.name} className="contact-card">
          <div className="contact-avatar">{c.initials}</div>
          <div className="contact-info">
            <div className="contact-name">{c.name}</div>
          </div>
          <a href={c.phone} className="call-btn"><Ic n="phone"/></a>
        </div>
      ))}
    </div>
  );
}

// ── TRUCK SCREEN ──
function TruckHome({ truck, onLogout, checkouts, setCheckouts }) {
  const [tab, setTab]         = useState("home");
  const [division, setDivision] = useState("");
  const myCheckoutCount = (checkouts[truck.id]||[]).reduce((s,c)=>s+c.qty,0);

  return (
    <div className="screen">
      <div className="topbar">
        <div className="topbar-left">
          <div className="topbar-title">GroundForce</div>
          <div className="truck-pill"><Ic n="truck"/>{truck.label}</div>
        </div>
        <button className="logout-btn" onClick={onLogout}>Sign Out</button>
      </div>
      <div className="content">
        {tab==="home"  && <HomeTab truck={truck} division={division} setDivision={setDivision}/>}
        {tab==="fuel"  && <FuelTab truck={truck} division={division}/>}
        {tab==="tools" && <ToolsTab truck={truck} division={division} checkouts={checkouts} setCheckouts={setCheckouts}/>}
      </div>
      <nav className="bottom-nav">
        <button className={`bnav-btn ${tab==="home"?"active":""}`}  onClick={()=>setTab("home")}><Ic n="home"/>Home</button>
        <button className={`bnav-btn ${tab==="fuel"?"active":""}`}  onClick={()=>setTab("fuel")}><Ic n="fuel"/>Fuel</button>
        <button className={`bnav-btn ${tab==="tools"?"active":""}`} onClick={()=>setTab("tools")} style={{position:"relative"}}>
          <Ic n="wrench"/>Tools
          {myCheckoutCount>0&&<span style={{position:"absolute",top:6,right:"50%",transform:"translateX(8px)",background:"var(--warn)",borderRadius:"50%",width:15,height:15,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",color:"var(--earth)"}}>{myCheckoutCount}</span>}
        </button>
      </nav>
    </div>
  );
}

// ── MANAGER TOOLS OVERVIEW ──
function MgrToolsTab({ checkouts }) {
  const allTools = TOOL_INVENTORY.flatMap(c=>c.tools.map(t=>({...t,category:c.category})));
  const totalOut = id => Object.values(checkouts).flat().filter(c=>c.toolId===id).reduce((s,c)=>s+c.qty,0);
  const trucksWithTool = id => {
    const res = [];
    Object.entries(checkouts).forEach(([tid,cos])=>{
      const qty = cos.filter(c=>c.toolId===id).reduce((s,c)=>s+c.qty,0);
      if(qty>0) res.push({tid,qty});
    });
    return res;
  };
  const toolsOut = allTools.filter(t=>totalOut(t.id)>0);
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:18}}>
        {[
          {label:"Total Tools", val:allTools.reduce((s,t)=>s+t.total,0), color:"var(--stone)"},
          {label:"Checked Out", val:Object.values(checkouts).flat().reduce((s,c)=>s+c.qty,0), color:"var(--warn)"},
          {label:"Available",   val:allTools.reduce((s,t)=>s+(t.total-totalOut(t.id)),0), color:"var(--lime)"},
        ].map(stat=>(
          <div key={stat.label} style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:10,padding:"12px 10px",textAlign:"center"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,color:stat.color,lineHeight:1}}>{stat.val}</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:9,color:"var(--stone)",letterSpacing:1,textTransform:"uppercase",marginTop:3}}>{stat.label}</div>
          </div>
        ))}
      </div>
      {toolsOut.length>0&&(
        <>
          <div className="section-hd" style={{color:"var(--warn)"}}>Currently Out</div>
          {toolsOut.map(tool=>{
            const out=totalOut(tool.id);
            const trucks=trucksWithTool(tool.id);
            return(
              <div key={tool.id} className="mgr-tool-row">
                <div className="mgr-tool-top">
                  <span className="mgr-tool-name">{tool.name}</span>
                  <div className="mgr-tool-nums">
                    <span className="num-chip nc-total">{tool.total} total</span>
                    <span className="num-chip nc-out">{out} out</span>
                    <span className="num-chip nc-avail">{tool.total-out} left</span>
                  </div>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:4}}>
                  {trucks.map(t=><span key={t.tid} className="truck-tag">Truck {t.tid} ×{t.qty}</span>)}
                </div>
              </div>
            );
          })}
        </>
      )}
      <div className="section-hd" style={{marginTop:16}}>Full Inventory</div>
      {TOOL_INVENTORY.map(cat=>(
        <div key={cat.category} style={{marginBottom:14}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--stone)",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>{cat.category}</div>
          {cat.tools.map(tool=>{
            const out=totalOut(tool.id);const avl=tool.total-out;
            return(
              <div key={tool.id} className="mgr-tool-row" style={{marginBottom:6}}>
                <div className="mgr-tool-top">
                  <span className="mgr-tool-name">{tool.name}</span>
                  <div className="mgr-tool-nums">
                    <span className="num-chip nc-total">{tool.total}</span>
                    {out>0&&<span className="num-chip nc-out">{out} out</span>}
                    <span className={`num-chip ${avl===0?"nc-out":"nc-avail"}`}>{avl} avail</span>
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

// ── MANAGER ZONE ──
function ManagerZone({ onLogout, checkouts, signIns }) {
  const [tab, setTab]             = useState("fleet");
  const [selectedTruck, setSelTruck] = useState(null);

  const activeTrucks = Object.entries(signIns);

  return (
    <div className="screen" style={{background:"#ddd9d0"}}>
      <div className="mgr-topbar">
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <Ic n="shield" style={{width:15,height:15,color:"var(--mgr-lt)"}}/>
          <div className="mgr-topbar-title">Manager Zone</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span className="mgr-badge">Admin</span>
          <button className="logout-btn" onClick={onLogout}>Out</button>
        </div>
      </div>
      <div className="content" style={{background:"#ddd9d0"}}>

        {tab==="fleet" && !selectedTruck && (
          <>
            <div className="section-hd" style={{color:"var(--mgr)"}}>Active Trucks</div>
            {activeTrucks.length===0&&(
              <div style={{textAlign:"center",padding:"30px 0",color:"var(--stone)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:14,letterSpacing:1,textTransform:"uppercase"}}>No trucks signed in</div>
            )}
            {activeTrucks.map(([truckId,info])=>(
              <div key={truckId} className="fleet-row" onClick={()=>setSelTruck({truckId,...info})}>
                <Ic n="truck" style={{width:18,height:18,color:"var(--lime)",flexShrink:0}}/>
                <div className="fleet-truck-num">{truckId}</div>
                <div className="fleet-info">
                  <div className="fleet-division">{info.division||"No division selected"}</div>
                  <div className="fleet-time">Signed in at {info.signInTime}</div>
                </div>
                <div className="fleet-arrow"><Ic n="chev"/></div>
              </div>
            ))}
          </>
        )}

        {tab==="fleet" && selectedTruck && (
          <div className="truck-detail">
            <button className="back-btn" style={{marginBottom:16}} onClick={()=>setSelTruck(null)}>
              <Ic n="back"/>Back to Fleet
            </button>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:"var(--lime)",letterSpacing:2,marginBottom:14}}>
              Truck {selectedTruck.truckId}
            </div>
            {[
              {icon:"clock", label:"Signed In",  val: selectedTruck.signInTime},
              {icon:"home",  label:"Division",   val: selectedTruck.division||"Not selected"},
              {icon:"sun",   label:"Morning Rollout",   val:"Pending"},
              {icon:"clip",  label:"Trailer Checklist", val:"Pending"},
              {icon:"fuel",  label:"Fuel Logs Today",   val:`${(checkouts[selectedTruck.truckId]||[]).length} entries`},
            ].map(s=>(
              <div key={s.label} className="detail-stat">
                <div className="detail-stat-icon"><Ic n={s.icon}/></div>
                <div className="detail-stat-info">
                  <div className="detail-stat-label">{s.label}</div>
                  <div className="detail-stat-val">{s.val}</div>
                </div>
              </div>
            ))}
            <div className="section-hd" style={{marginTop:8}}>Tools Checked Out</div>
            {(checkouts[selectedTruck.truckId]||[]).length===0
              ? <div style={{fontSize:13,color:"var(--stone)",padding:"12px 0"}}>No tools checked out</div>
              : (checkouts[selectedTruck.truckId]||[]).map(co=>(
                <div key={co.id} style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:8,padding:"10px 13px",marginBottom:6,display:"flex",alignItems:"center",gap:10}}>
                  <div style={{flex:1}}>
                    <div className="tool-name">{co.toolName}</div>
                    <div style={{fontSize:11,color:"var(--stone)",marginTop:1}}>Since {co.time}</div>
                  </div>
                  <span className="co-qty-badge">×{co.qty}</span>
                </div>
              ))
            }
          </div>
        )}

        {tab==="tools" && <MgrToolsTab checkouts={checkouts}/>}

      </div>
      <nav className="bottom-nav" style={{background:"#d0ccc2",borderTopColor:"#b0aa9a"}}>
        <button className={`bnav-btn ${tab==="fleet"?"active":""}`} style={tab==="fleet"?{color:"var(--mgr-lt)",borderBottomColor:"var(--mgr)"}:{}} onClick={()=>{setTab("fleet");setSelTruck(null);}}>
          <Ic n="truck"/>Fleet
        </button>
        <button className={`bnav-btn ${tab==="tools"?"active":""}`} style={tab==="tools"?{color:"var(--mgr-lt)",borderBottomColor:"var(--mgr)"}:{}} onClick={()=>setTab("tools")}>
          <Ic n="wrench"/>Tools
        </button>
      </nav>
    </div>
  );
}

// ── LOGIN SCREEN ──
function LoginScreen({ onTruckLogin, onMgrLogin }) {
  const [mode,     setMode]    = useState("truck");
  const [dropOpen, setDropOpen]= useState(false);
  const [selected, setSel]     = useState(null);
  const [pinStep,  setPinStep] = useState(false);
  const [pin,      setPin]     = useState("");
  const [mgrPass,  setMgrPass] = useState("");
  const [error,    setError]   = useState("");

  const handleKey = v => {
    setError("");
    if (v==="del")   { setPin(p=>p.slice(0,-1)); return; }
    if (v==="enter") {
      if(!selected) return;
      if(selected.pin !== pin){ setError("Wrong PIN — try again."); setPin(""); return; }
      onTruckLogin(selected);
      return;
    }
    if (pin.length<4) setPin(p=>p+v);
  };

  useEffect(()=>{
    if(pin.length===4){
      if(!selected) return;
      if(selected.pin !== pin){ setError("Wrong PIN — try again."); setPin(""); return; }
      onTruckLogin(selected);
    }
  },[pin]); // eslint-disable-line react-hooks/exhaustive-deps



  const tryMgr = () => {
    if (mgrPass === "ground25") onMgrLogin();
    else { setError("Incorrect password."); setMgrPass(""); }
  };

  return (
    <div className="splash">
      {/* Logo */}
      <div className="logo-wrap">
        <img className="logo-img"
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyMDAwIDIwMDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoyOyIgZmlsbD0iIzRhNmQyMCI+PHBhdGggZD0iTTE3OTguOCw3NzIuOTYzQzE3OTguOCw3NzIuOTE0IDE3OTguOCw3NzIuODY1IDE3OTguOCw3NzIuODE2TDE3OTguOCw3NzIuOTYxTDE3OTguOCw3NzIuOTYzWk0xNzk4LjgsNzcyLjk2M0MxNzk2LjUsODE2Ljc3NiAxNzkzLjQ1LDg1OC40NzMgMTc5MC45OCw4OTUuMDA1QzE3ODguOTQsOTI1LjIwMSAxNzg2LjQ1LDk1Ni4xMjYgMTc4My4wOSw5ODcuMTg2TDE3ODQuNTQsOTcxLjE1OEMxNzg0LjU0LDk3MS4xNTggMTYzOC4xOSw5MzAuOTE0IDE1NjIuNTIsOTI5LjIyNUMxNTYyLjUyLDkyOS4yMjUgMTM3Mi43Myw5MTEuODExIDEzMDguNTIsOTI1LjAzMkMxMzA4LjUyLDkyNS4wMzIgMTE2Ni40Niw5MzMuMDg2IDExMjEuMTksOTQ3LjQ4OEMxMTIxLjE5LDk0Ny40ODggMTEyNy42OSw5MzYuMDE3IDExOTUuNyw5MjAuOTYzQzExOTUuNyw5MjAuOTYzIDEyMTcuMDMsODkyLjIzMyAxMjMxLjAzLDkwMy45MDZDMTIzMS4wMyw5MDMuOTA2IDEyMzcuOTUsODg5LjU3NiAxMjQ5LjExLDg5Ni4zNTRDMTI0OS4xMSw4OTYuMzU0IDEyNTUuNzUsODcyLjI2MyAxMjg4LjQzLDg4Ny4zMTlDMTI4OC40Myw4ODcuMzE5IDEzMDQuNzEsODc0LjE0NCAxMzEzLjEyLDg3NC40OTVDMTMxMy4xMiw4NzQuNDk1IDEzMjYuNTMsODc1LjA2NCAxMzMzLjY3LDg3NC4yMzNDMTMzMy42Nyw4NzQuMjMzIDEzNTcuMTEsODUwLjI4MSAxMzk0LjIyLDg1Ny42MDhDMTM5NC4yMiw4NTcuNjA4IDE0NTIuODIsODU3LjczNCAxNDM4LjIxLDg3NS41NDJDMTQzOC4yMSw4NzUuNTQyIDE1MjIuODIsODExLjkwNiAxNDU1Ljc5LDcxNi41NzFDMTQ1NS43OSw3MTYuNTcxIDE0MDEuNjcsNjc4LjUxMyAxMzkzLjA3LDY4Ni42NDNDMTM5My4wNyw2ODYuNjQzIDE0MDYuNiw3MDAuMzIzIDEzODMuNTEsNzAxLjU1NUMxMzgzLjUxLDcwMS41NTUgMTM3OC43MSw3MDIuMTA0IDEzNzguNzYsNzA0LjI2OEMxMzc4Ljc2LDcwNC4yNjggMTM3MC45LDcwNi42NSAxMzY1Ljc3LDcwNy4yMTNDMTM2NS43Nyw3MDcuMjEzIDEzNjAuNTUsNzA2LjcwOCAxMzUxLjg4LDcxMi4zMTVDMTM1MS44OCw3MTIuMzE1IDEzNDUuMTcsNzExLjM1NSAxMzM4LjYsNzA4LjE2OEMxMzM4LjYsNzA4LjE2OCAxMzMzLjAyLDcxMS4zNTggMTMxOS44OCw3MDAuODQ1QzEzMTkuODgsNzAwLjg0NSAxMzA5LjUzLDcwMy4xMjMgMTMwNC4zNiw2OTIuNDAxQzEzMDQuMzYsNjkyLjQwMSAxMzA1Ljk4LDY4Ny4xNDUgMTMwOS4wNSw2ODcuOTM3QzEzMDkuMDUsNjg3LjkzNyAxMzA1LjEyLDY4My45MiAxMjk5Ljk2LDY5MS4wOTZDMTI5OS45Niw2OTEuMDk2IDEyOTUuNiw2OTIuNTIxIDEyOTMuODksNjkxLjM2OEMxMjkzLjg5LDY5MS4zNjggMTI5MC40Miw2OTAuMzQ2IDEyNzguMzgsNjk4LjA2QzEyNzguMzgsNjk4LjA2IDEyNjcuMzMsNzA3LjEyNSAxMjYwLjE2LDcwMi4xN0MxMjYwLjE2LDcwMi4xNyAxMjQzLjQ3LDY5NC45NDIgMTIzNi40MSw2ODcuNDA4QzEyMzYuNDEsNjg3LjQwOCAxMjM0LjUxLDY4My4wOTUgMTIyOC4xMiw2ODguMDQ5QzEyMjguMTIsNjg4LjA0OSAxMjE2LjYzLDY5Mi4xNzEgMTIwOS40Niw2ODUuMDE1QzEyMDkuNDYsNjg1LjAxNSAxMjAzLjU5LDY3OS42NTYgMTE5Ny4xMyw2NzUuOTQ3QzExOTcuMTMsNjc1Ljk0NyAxMTkwLjg1LDY2Ni4wMDUgMTIwMy45LDY1Ni40MDRDMTIwMy45LDY1Ni40MDQgMTIxNi45NCw2NDcuNTYyIDEyMTkuODksNjQ3LjQ0NUMxMjE5Ljg5LDY0Ny40NDUgMTIyMy40NCw2MzkuMTc3IDEyMDguNiw2NDcuMzYzQzEyMDguNiw2NDcuMzYzIDEyMDIuMTYsNjQ1LjYyNSAxMTk3LjU2LDY0MC44NjdDMTE5Ny41Niw2NDAuODY3IDExOTEuOTgsNjM1LjY0OSAxMTg0LjI3LDYzNi4yNUMxMTg0LjI3LDYzNi4yNSAxMTczLDYyOS45IDExNzIuMDQsNjIxLjQ0NkMxMTcyLjA0LDYyMS40NDYgMTE4MC41Nyw2MDguOTU3IDExODguNzgsNjA0LjM0NUMxMTg4Ljc4LDYwNC4zNDUgMTE4Ni40Miw1ODYuNjkgMTIxMS4zMyw1ODQuODQ1QzEyMTEuMzMsNTg0Ljg0NSAxMjM2LjYyLDU4MS4zMzYgMTI0MC40NCw1ODIuODg0QzEyNDAuNDQsNTgyLjg4NCAxMjM1LjIyLDU3NC4xMTkgMTIxMS4yMyw1NzYuMTUzQzEyMTEuMjMsNTc2LjE1MyAxMTg5LjQzLDU3My4zMjkgMTIyMy43Nyw1NDYuNzM3QzEyMjMuNzcsNTQ2LjczNyAxMjM4LjI1LDUzOS42MzQgMTI0Ny4zNiw1MzIuMTIzQzEyNDcuMzYsNTMyLjEyMyAxMjQ3Ljg5LDUyNy40OTUgMTI3OC4zNiw1MjguMDczQzEyNzguMzYsNTI4LjA3MyAxMjg4LjM0LDUyOC4wMDIgMTI5NC42MSw1MTguMzg5QzEyOTQuNjEsNTE4LjM4OSAxMjk5LjEyLDUxNC4zMjIgMTMwNS4xNyw1MTcuMTIxQzEzMDUuMTcsNTE3LjEyMSAxMzI1LjA2LDUxOC4yMDYgMTMwMy4wNyw1MTIuNzVDMTMwMy4wNyw1MTIuNzUgMTI5NC42Myw1MTAuMTI4IDEyNzguNjYsNTIxLjczMUMxMjc4LjY2LDUyMS43MzEgMTI2OSw1MjEuODg0IDEyNjQuNzEsNTE5Ljg0M0MxMjY0LjcxLDUxOS44NDMgMTI1Ny41OCw1MTcuODMzIDEyNDAsNTIxLjY2NkMxMjQwLDUyMS42NjYgMTIyMC42Myw1MDguODQzIDEyNDMuMjEsNDk4LjEwNEMxMjQzLjIxLDQ5OC4xMDQgMTI0OC4zMiw0OTYuOTIxIDEyNDkuNzEsNDg4LjIwNEMxMjQ5LjcxLDQ4OC4yMDQgMTI1Mi40Miw0NzUuMDYxIDEyNzEuNDMsNDc1LjAxOUMxMjcxLjQzLDQ3NS4wMTkgMTI3Ni4zMiw0NzcuOTMgMTI4NC41OSw0NjguODk4QzEyODQuNTksNDY4Ljg5OCAxMjkwLjQ4LDQ2Mi4xNiAxMzA0LjI3LDQ2My43NjlDMTMwNC4yNyw0NjMuNzY5IDEzMTUuNTcsNDY0Ljc5MiAxMzIyLjk4LDQ2My4zMzdDMTMyMi45OCw0NjMuMzM3IDEzMTcuMTEsNDU2LjY3NyAxMzA3LjM0LDQ1OC4yMzlDMTMwNy4zNCw0NTguMjM5IDEyODYuMzIsNDU4LjU3NiAxMzA5LjIxLDQ0MS43MDRDMTMwOS4yMSw0NDEuNzA0IDEzMTguMzUsNDQwLjMzOSAxMzE3LjQyLDQzNC4zMUMxMzE3LjQyLDQzNC4zMSAxMzE2LjE1LDQyOS41NzcgMTMyNy41Miw0MjMuOTJDMTMyNy41Miw0MjMuOTIgMTMzNi43Myw0MTQuNDY0IDEzNTYuOTEsNDIxLjY5N0MxMzU2LjkxLDQyMS42OTcgMTM1OC43OSw0MjUuNjk5IDEzNzAuNTQsNDE5LjQ2MkMxMzcwLjU0LDQxOS40NjIgMTM3NC41LDQxOS42MTkgMTM4My42MSw0MjMuMTU4QzEzODMuNjEsNDIzLjE1OCAxMzk0Ljc1LDQyMC44ODQgMTQwMC4yOCw0MjYuNjRDMTQwMC4yOCw0MjYuNjQgMTQxMi43LDQyNi4wODQgMTQxOC4zNSw0MjMuODQxQzE0MTguMzUsNDIzLjg0MSAxMzY3Ljg2LDQxNS40NjggMTQyMi42OSw0MDQuNDcxQzE0MjIuNjksNDA0LjQ3MSAxNDI1LDQwMC42MzggMTQwNy4xOSw0MDEuODA2QzE0MDcuMTksNDAxLjgwNiAxMzc3LjA1LDQwMi42MTIgMTQwNy4yLDM3Ny4xODRDMTQwNy4yLDM3Ny4xODQgMTQxNi4xNCwzNjIuNTY4IDE0NDMuOCwzNjQuMDk5QzE0NDMuOCwzNjQuMDk5IDE0NjguNzUsMzY0LjgxOCAxNDg1LjgyLDM2My43ODFDMTQ4NS44MiwzNjMuNzgxIDE0NDkuMDksMzU1LjU3NSAxNTAxLjksMzM4LjQ2N0MxNTAxLjksMzM4LjQ2NyAxNTE1LjAyLDMyNi43NDggMTUzNS40MiwzMzcuOTE2QzE1MzUuNDIsMzM3LjkxNiAxNTQ3LjAyLDM1MC4wMTkgMTU2MS41MSwzMzkuNTQyQzE1NjEuNTEsMzM5LjU0MiAxNTgyLjczLDMzMy4yOCAxNTk2LjM1LDM0NC44NTFDMTQ5Ni4zNSwzNDQuODUxIDE2MDcuNTYsMzU1LjE3NiAxNTk4LjI3LDM1Ni4xMzFDMTU5OC4yNywzNTYuMTMxIDE1OTAuOTEsMzU4LjQ5NyAxNTg5LjUsMzYxLjkxN0MxNTg5LjUsMzYxLjkxNyAxNjE5LjM3LDM1Mi44MzkgMTYyOS44NywzNjIuNjE1QzE2MjkuODcsMzYyLjYxNSAxNjM2LjM2LDM3MC45OTkgMTY0MS44MSwzNzIuMzIxQzE2NDEuODEsMzcyLjMyMSAxNjY1LjkyLDM5MC40MTMgMTY1MC44OCwzOTkuMjg2QzE2NTAuODgsMzk5LjI4NiAxNjMwLjM2LDQwMi41MTkgMTYxOC40Nyw0MDguMDVDMTYxOC40Nyw0MDguMDUgMTYyNC4xNCw0MTEuMDE1IDE2NDIuMjMsNDA1LjIxMkMxNjQyLjIzLDQwNS4yMTIgMTY1Mi40Miw0MDYuMTQ4IDE2NDAuMDYsNDE1LjkyOEMxNjQwLjA2LDQxNS45MjggMTYzNS4zNCw0MTYuNTkxIDE2NDYuMzMsNDE3LjI0NkMxNjQ2LjMzLDQxNy4yNDYgMTY2OC4wNyw0MjAuNTgyIDE2NzYuODcsNDExLjk4OEMxNjc2Ljg3LDQxMS45ODggMTY4NS43LDQwMy45NjcgMTcwMi41MSw0MTQuNjY0QzE3MDIuNTEsNDE0LjY2NCAxNzI4LjA5LDQyMy45OTIgMTcyOS44MSw0MjkuMDE4QzE3MjkuODEsNDI5LjAxOCAxNzM0LjU0LDQzMy44NjIgMTczNC40NCw0MzYuMzA3QzE3MzQuNDQsNDM2LjMwNyAxNzMyLjk5LDQ0Mi4wNzkgMTc0MS4wMSw0NDguNDI3QzE3NDEuMDEsNDQ4LjQyNyAxNzU1LjkzLDQ2NS42ODIgMTczMy4yNyw0NzQuNzY3QzE3MzMuMjcsNDc0Ljc2NyAxNzI4LjQyLDQ3Ny4xNDQgMTczNy44MSw0NzkuOTA0QzE3MzcuODEsNDc5LjkwNCAxNzMzLjE3LDQ4Ny42ODIgMTcxNy4xMyw0OTAuOTg5QzE3MTcuMTMsNDkwLjk4OSAxNzIyLjc4LDQ5Ny4zOCAxNzMyLjIyLDQ5MC45MjhDMTczMi4yMiw0OTAuOTI4IDE3NDAuMjQsNDgzLjI1OCAxNzYzLjYxLDQ5Mi40ODZDMTc2My42MSw0OTIuNDg2IDE3ODEuODIsNDk0LjYxNCAxNzkwLjU0LDUwOC4xODlDMTc5MC41NCw1MDguMTg5IDE3OTUuNjIsNTIxLjcyMiAxNzg4LjQsNTI2LjQyNkMxNzg4LjQsNTI2LjQyNiAxNzkzLjY5LDUyOC45MDQgMTc5NS41Nyw1MzAuNzI0QzE3OTYuNjcsNTM5Ljg4NiAxNzk3LjYxLDU0OS4yMTcgMTc5OC40MSw1NTguNjg0WiIvPjwvc3ZnPg=="
          alt="GroundForce"/>
        <div className="app-title">GroundForce</div>
        <div className="app-sub">Landscape Operations Hub</div>
      </div>

      {mode==="truck" && !pinStep && (
        <>
          <div className="select-label">Select Your Truck</div>
          <div className="truck-dropdown-wrap">
            <div className={`truck-dropdown-btn ${dropOpen?"open":""}`} onClick={()=>setDropOpen(o=>!o)}>
              <Ic n="truck" style={{width:16,height:16,color:selected?"var(--lime)":"var(--stone)"}}/>
              {selected
                ? <span className="truck-dropdown-value">{selected.label}</span>
                : <span className="truck-dropdown-placeholder">Choose a truck...</span>
              }
              <Ic n="chevD" className={`truck-dropdown-chevron ${dropOpen?"open":""}`} style={{width:16,height:16}}/>
            </div>
            {dropOpen && (
              <div className="truck-dropdown-list">
                {TRUCKS.map(t=>(
                  <div key={t.id} className={`truck-dropdown-item ${selected?.id===t.id?"selected":""}`}
                    onClick={()=>{ setSel(t); setDropOpen(false); setError(""); }}>
                    <Ic n="truck" style={{width:14,height:14}}/>
                    {t.label}
                    {selected?.id===t.id && <Ic n="check" style={{width:14,height:14,marginLeft:"auto",color:"var(--lime)"}}/>}
                  </div>
                ))}
              </div>
            )}
          </div>
          {selected && (
            <button className="btn-select-truck" onClick={()=>{ setPin(""); setError(""); setPinStep(true); }}>
              Make This My Truck
            </button>
          )}
          <div className="mgr-toggle" onClick={()=>{ setMode("manager"); setError(""); }}>Manager Zone →</div>
        </>
      )}

      {mode==="truck" && pinStep && selected && (
        <div className="pin-screen">
          <button className="back-btn" onClick={()=>{ setPinStep(false); setPin(""); setError(""); }}>
            <Ic n="back"/> Choose a different truck
          </button>
          <div className="pin-truck-header">
            <Ic n="truck" style={{width:20,height:20}}/>
            <div>
              <div className="pin-truck-name">{selected.label}</div>
              <div className="pin-truck-sub">Enter your 4-digit PIN to sign in</div>
            </div>
          </div>
          <div className="pin-dots">
            {[0,1,2,3].map(i=><div key={i} className={`pin-dot ${i<pin.length?"filled":""}`}/>)}
          </div>
          <div className="numpad">
            {NUMKEYS.map(k=>(
              <button key={k}
                className={`num-btn ${k==="0"?"zero":""}`}
                style={k==="enter"?{background:"var(--moss)",color:"var(--lime)"}:{}}
                onClick={()=>handleKey(k)}>
                {k==="del"   ? <Ic n="del"  style={{width:18,height:18}}/> :
                 k==="enter" ? <Ic n="chev" style={{width:18,height:18,transform:"rotate(90deg)"}}/> : k}
              </button>
            ))}
          </div>
          <button className="btn-enter" disabled={pin.length<4} onClick={tryLogin}>Sign In</button>
          {error && <div className="error-msg">{error}</div>}
        </div>
      )}

      {mode==="manager" && (
        <div className="mgr-box">
          <div className="mgr-box-header">
            <Ic n="shield" style={{width:18,height:18,color:"var(--mgr-lt)"}}/>
            <span>Manager Zone</span>
          </div>
          <div className="fuel-label" style={{marginBottom:8}}>Password</div>
          <input className="mgr-input" type="password" placeholder="••••••••"
            value={mgrPass} onChange={e=>{setMgrPass(e.target.value);setError("");}}
            onKeyDown={e=>e.key==="Enter"&&tryMgr()}/>
          <button className="btn-mgr" onClick={tryMgr}>Enter Manager Zone</button>
          {error && <div className="error-msg">{error}</div>}
          <div className="mgr-toggle" style={{color:"var(--stone)"}} onClick={()=>{setMode("truck");setError("");}}>← Back to truck login</div>
        </div>
      )}
    </div>
  );
}

// ── ROOT ──
export default function App() {
  const [screen,    setScreen]    = useState("login");
  const [truck,     setTruck]     = useState(null);
  const [checkouts, setCheckouts] = useState({});
  const [signIns,   setSignIns]   = useState({});

  const handleTruckLogin = t => {
    const time = getTimeStr();
    setSignIns(prev => ({ ...prev, [t.id]: { signInTime: time, division: "" } }));
    setTruck(t);
    setScreen("truck");
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {screen==="login" && (
          <LoginScreen
            onTruckLogin={handleTruckLogin}
            onMgrLogin={()=>setScreen("manager")}
          />
        )}
        {screen==="truck" && truck && (
          <TruckHome
            truck={truck}
            onLogout={()=>{ setTruck(null); setScreen("login"); }}
            checkouts={checkouts}
            setCheckouts={setCheckouts}
          />
        )}
        {screen==="manager" && (
          <ManagerZone
            onLogout={()=>setScreen("login")}
            checkouts={checkouts}
            signIns={signIns}
          />
        )}
      </div>
    </>
  );
}
