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

/* ── LOGIN ── */
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
  padding: 12px 16px 10px; padding-top: calc(12px + env(safe-area-inset-top));
  display: flex; align-items: center;
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
// PIN = truck number as a string (truck 1 → "1", truck 20 → "20")
const TRUCKS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  label: `Truck ${i + 1}`,
  pin: String(i + 1),
}));

// Only Maintenance and Construction
const DIVISIONS = ["Maintenance", "Construction"];

const CONTACTS = [
  { name: "Jonny", role: "General Manager",     initials: "JF", phone: "tel:+15085550001" },
  { name: "Jon",   role: "Mowing Manager",      initials: "JG", phone: "tel:+15085550002" },
  { name: "Tom",   role: "Residential Manager", initials: "TF", phone: "tel:+15085550003" },
  { name: "Joel",  role: "Commercial Manager",  initials: "JS", phone: "tel:+15085550004" },
  { name: "Katie", role: "Office Manager",      initials: "KR", phone: "tel:+15085550005" },
  { name: "Nikki", role: "IT & App Support",    initials: "NS", phone: "tel:+15084048480" },
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

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzKm07D55ohLfV45KGJN7WDGUlZL3qj1Ofpfn8P5gWiWm8yyDCZjsQbpfmptsm6EcBN/exec";

// Dynamic numpad — max digits based on truck PIN length
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

// HR portal links
const HR_LINKS = [
  { name: "Time Off Request",      desc: "Submit Time Off Request",            url: "https://docs.google.com/forms/d/e/1FAIpQLSedVzxq3XCkB4TXwqvIGRtUVM6DRtaWmgYZtfcVZUoaAXVWeg/viewform?embedded=true" },
  { name: "Job Application",       desc: "Refer someone to the team",          url: "https://docs.google.com/forms/d/e/1FAIpQLSe405gWCY--4-chYWpku3PMaZ5zIl09W5HGCPUfDcbNuTuYYw/viewform?embedded=true" },
  { name: "Contact a Manager",     desc: "Send a message to management",       url: "https://docs.google.com/forms/d/e/1FAIpQLSfYI2b_yAxYk--McTBaVnToWfJjkWocWpaS6ZdJy98QaRtIIA/viewform?embedded=true" },
  { name: "Employee Handbook",     desc: "Company policies & procedures",      url: "https://drive.google.com/file/d/1UPIOc2q7rs7h-VQcT6Cvv4eaG_-vePGs/preview" },
  { name: "Uniform Guidelines",    desc: "Dress code & uniform standards",     url: "" },
  { name: "Vehicle Guidelines",    desc: "Fleet use & driving policies",       url: "" },
];

// ── CONTACT DROPDOWN ──
function ContactDropdown() {
  const [open,     setOpen]     = useState(false);
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <div className="truck-dropdown-wrap">
        <div className={`truck-dropdown-btn ${open?"open":""}`} onClick={()=>setOpen(o=>!o)}>
          <Ic n="phone" style={{width:16,height:16,color:selected?"var(--lime)":"var(--stone)"}}/>
          {selected
            ? <span className="truck-dropdown-value">{selected.name} — {selected.role}</span>
            : <span className="truck-dropdown-placeholder">Choose a manager...</span>
          }
          <Ic n="chevD" className={`truck-dropdown-chevron ${open?"open":""}`} style={{width:16,height:16}}/>
        </div>
        {open && (
          <div className="truck-dropdown-list">
            {CONTACTS.map(c=>(
              <div key={c.name} className={`truck-dropdown-item ${selected?.name===c.name?"selected":""}`}
                onClick={()=>{ setSelected(c); setOpen(false); }}>
                <div style={{width:28,height:28,borderRadius:"50%",background:"var(--moss)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontFamily:"'Bebas Neue',sans-serif",fontSize:12,color:"var(--lime)",letterSpacing:1}}>{c.initials}</div>
                <div>
                  <div style={{fontWeight:500,fontSize:14,color:"var(--cream)"}}>{c.name}</div>
                  <div style={{fontSize:12,color:"var(--stone)",marginTop:1}}>{c.role}</div>
                </div>
                {selected?.name===c.name && <Ic n="check" style={{width:14,height:14,marginLeft:"auto",color:"var(--lime)"}}/>}
              </div>
            ))}
          </div>
        )}
      </div>
      {selected && (
        <div className="contact-card" style={{marginTop:10}}>
          <div className="contact-avatar">{selected.initials}</div>
          <div className="contact-info">
            <div className="contact-name">{selected.name}</div>
            <div className="contact-role">{selected.role}</div>
          </div>
          <a href={selected.phone} className="call-btn"><Ic n="phone"/></a>
        </div>
      )}
    </div>
  );
}

function HomeTab({ truck, division }) {
  const day = getTodayStr();
  const formLinks = [
    { name: "Morning Rollout",   desc: "Start-of-day checklist",        url: "", icon: "sun" },
    { name: "Trailer Checklist", desc: "Pre-departure equipment check",  url: "https://forms.gle/7GE4hZFKo9DUeuqf6", icon: "clip" },
  ];

  return (
    <div>
      {/* Greeting */}
      <div className="greeting">
        <div className="greeting-icon"><Ic n="truck"/></div>
        <div>
          <div className="greet-name">{truck.label}</div>
          <div className="greet-sub">{day}</div>
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
            <span className={`status-chip chip-pending`}>
              {f.url?"Pending":"Coming Soon"}
            </span>
          </div>
          <div className="action-card-arrow"><Ic n="chev"/></div>
        </div>
      ))}

      {/* Contacts */}
      <div className="section-hd" style={{marginTop:8}}>Contact a Manager</div>
      <ContactDropdown />
    </div>
  );
}

// ── SHARED NATIVE RECEIPT FORM ──
// truckLabel = "Truck 3" or null (walk-in) | divisionLabel = pre-filled division or ""
function NativeReceiptFlow({ truckLabel, divisionLabel, onGoHome, onClose }) {
  const today = new Date().toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric"});

  const [step,       setStep]      = useState("form");
  const [submitting, setSubmitting] = useState(false);
  const [uploading,  setUploading]  = useState(false);
  const [photoUrl,   setPhotoUrl]   = useState("");
  const [formErr,    setFormErr]    = useState("");
  const photoRef = useRef();

  const [fields, setFields] = useState({
    name:         "",
    division:     divisionLabel || "",
    type:         "",           // Fuel | Materials | Tools/Supplies | Other
    // fuel-specific
    gallons:      "",
    fuelType:     "",           // Regular | Diesel | Premium
    atShop:       null,         // true = shop (no cost), false = gas station (cost required)
    // non-fuel
    vendor:       "",
    total:        "",
    // shared
    notes:        "",
  });
  const set = (k,v) => { setFields(f=>({...f,[k]:v})); setFormErr(""); };

  const isFuel    = fields.type === "Fuel";
  const isWalkIn  = !truckLabel;
  const displayTruck = truckLabel || "General Submission";

  // ── Validation ──
  const validate = () => {
    if (!fields.name.trim())     return "Please enter your name.";
    if (!fields.division)        return "Please select a division.";
    if (!fields.type)            return "Please select a receipt type.";
    if (isFuel) {
      if (!fields.gallons.trim()) return "Please enter gallons pumped.";
      if (!fields.fuelType)       return "Please select a fuel type.";
      if (fields.atShop === null) return "Please select where you fueled up.";
      if (fields.atShop === false && !fields.total.trim()) return "Please enter the total cost.";
    } else {
      if (!fields.vendor.trim()) return "Please enter a vendor / merchant.";
      if (!fields.total.trim())  return "Please enter the total amount.";
    }
    return null;
  };

  const toBase64 = file => new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result.split(",")[1]); r.onerror=rej; r.readAsDataURL(file); });

  const handleSubmit = async () => {
    const err = validate();
    if (err) { setFormErr(err); return; }
    setSubmitting(true);
    try {
      await fetch(APPS_SCRIPT_URL, {
        method:"POST", mode:"no-cors",
        headers:{"Content-Type":"text/plain"},
        body: JSON.stringify({
          sheet:    "Receipts",
          date:     today,
          time:     new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),
          name:     fields.name,
          truck:    displayTruck,
          division: fields.division,
          type:     fields.type,
          vendor:   isFuel ? "Fuel" : fields.vendor,
          gallons:  isFuel ? fields.gallons : "",
          fuelType: isFuel ? fields.fuelType : "",
          location: isFuel ? (fields.atShop ? "Shop" : "Gas Station") : "",
          total:    isFuel ? (fields.atShop ? "" : fields.total) : fields.total,
          notes:    fields.notes,
          sendEmail:    true,
          emailTo:      "admin@jandjandsonlawncare.com",
        }),
      });
      setStep("photo");
    } catch(e){ console.warn(e); }
    setSubmitting(false);
  };

  const handlePhoto = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const b64 = await toBase64(file);
      await fetch(APPS_SCRIPT_URL, {
        method:"POST", mode:"no-cors",
        headers:{"Content-Type":"text/plain"},
        body: JSON.stringify({ sheet:"Receipts", photo:b64, photoMime:file.type||"image/jpeg", photoName:`receipt_${displayTruck.replace(/\s/g,"_")}_${Date.now()}.jpg`, photoOnly:true }),
      });
      setPhotoUrl(URL.createObjectURL(file));
      setStep("success");
    } catch(e){ console.warn(e); }
    setUploading(false);
  };

  const reset = () => {
    setStep("form"); setPhotoUrl(""); setFormErr("");
    setFields({ name:"", division:divisionLabel||"", type:"", gallons:"", fuelType:"", atShop:null, vendor:"", total:"", notes:"" });
  };

  // ── Shared styles ──
  const inputStyle = { width:"100%", background:"var(--bark2)", border:"1px solid var(--moss)", borderRadius:8, padding:"12px 14px", color:"var(--cream)", fontFamily:"'Barlow',sans-serif", fontSize:15 };
  const Label = ({children,optional}) => (
    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:2,color:"var(--stone)",textTransform:"uppercase",marginBottom:6,display:"flex",alignItems:"center",gap:6}}>
      {children}{optional&&<span style={{color:"var(--moss)",fontSize:11,letterSpacing:1,textTransform:"none",fontWeight:400}}>(optional)</span>}
    </div>
  );
  const ToggleGroup = ({options, value, onChange, cols=2}) => (
    <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:7}}>
      {options.map(o=>(
        <button key={o} onClick={()=>onChange(o)}
          style={{background:value===o?"rgba(74,109,32,0.15)":"var(--bark2)",border:`1.5px solid ${value===o?"var(--lime)":"var(--moss)"}`,borderRadius:8,padding:"11px 6px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:600,color:value===o?"var(--lime)":"var(--stone)",cursor:"pointer",transition:"all 0.15s"}}>
          {o}
        </button>
      ))}
    </div>
  );
  const StepBar = ({done}) => (
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
      {["Details","Photo"].map((label,i)=>{
        const active = done > i; const current = done === i;
        return (
          <React.Fragment key={label}>
            {i>0 && <div style={{flex:1,height:2,background:active?"var(--lime)":"var(--moss)",borderRadius:1}}/>}
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:active?"var(--moss)":current?"var(--lime)":"transparent",border:`2px solid ${active||current?"var(--lime)":"var(--moss)"}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {active ? <Ic n="check" style={{width:12,height:12,color:"var(--earth)"}}/> : <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:current?"var(--earth)":"var(--stone)"}}>{i+1}</span>}
              </div>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,letterSpacing:1,color:active?"var(--stone)":current?"var(--lime)":"var(--stone)",textDecoration:active?"line-through":"none"}}>{label}</span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );

  // ── STEP: FORM ──
  if (step === "form") return (
    <div style={{animation:"fadeUp 0.3s ease both"}}>
      <StepBar done={0}/>

      {/* ── PART 1: General Info ── */}
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:3,color:"var(--stone)",marginBottom:10}}>Part 1 — General Information</div>
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:12,padding:16,marginBottom:14}}>

        {/* Name */}
        <div style={{marginBottom:14}}>
          <Label>Your Name</Label>
          <input style={inputStyle} type="text" placeholder="First & Last name" value={fields.name} onChange={e=>set("name",e.target.value)}/>
        </div>

        {/* Truck — pre-filled & locked if logged in, hidden if walk-in */}
        {!isWalkIn && (
          <div style={{marginBottom:14}}>
            <Label>Truck</Label>
            <div style={{...inputStyle,color:"var(--stone)",background:"var(--bark)",cursor:"default",display:"flex",alignItems:"center",gap:8}}>
              <Ic n="truck" style={{width:14,height:14,flexShrink:0}}/>{truckLabel}
            </div>
          </div>
        )}

        {/* Division */}
        <div style={{marginBottom:14}}>
          <Label>Division</Label>
          <ToggleGroup options={["Maintenance","Construction"]} value={fields.division} onChange={v=>set("division",v)} cols={2}/>
        </div>

        {/* Receipt Type */}
        <div>
          <Label>Receipt Type</Label>
          <ToggleGroup options={["Fuel","Materials","Tools / Supplies","Other"]} value={fields.type} onChange={v=>{ set("type",v); set("gallons",""); set("fuelType",""); set("atShop",null); set("vendor",""); set("total",""); }} cols={2}/>
        </div>
      </div>

      {/* ── PART 2: Fuel Details (slides in) ── */}
      {isFuel && (
        <div style={{animation:"fadeUp 0.25s ease both"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:3,color:"var(--warn)",marginBottom:10,display:"flex",alignItems:"center",gap:8}}>
            Part 2 — Fuel Details
            <span style={{flex:1,height:1,background:"rgba(160,96,16,0.3)",display:"block"}}/>
          </div>
          <div style={{background:"var(--bark)",border:"1.5px solid rgba(160,96,16,0.3)",borderLeft:"4px solid var(--warn)",borderRadius:12,padding:16,marginBottom:14}}>

            {/* Gallons */}
            <div style={{marginBottom:14}}>
              <Label>Gallons Pumped</Label>
              <input style={inputStyle} type="number" inputMode="decimal" placeholder="e.g. 14.3" value={fields.gallons} onChange={e=>set("gallons",e.target.value)}/>
            </div>

            {/* Fuel Type */}
            <div style={{marginBottom:14}}>
              <Label>Fuel Type</Label>
              <ToggleGroup options={["Regular","Diesel","Premium"]} value={fields.fuelType} onChange={v=>set("fuelType",v)} cols={3}/>
            </div>

            {/* Fueled where */}
            <div style={{marginBottom: fields.atShop===false ? 14 : 0}}>
              <Label>Where did you fuel up?</Label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                {[{label:"At the Shop",val:true},{label:"Gas Station",val:false}].map(({label,val})=>(
                  <button key={label} onClick={()=>{ set("atShop",val); if(val) set("total",""); }}
                    style={{background:fields.atShop===val?"rgba(74,109,32,0.15)":"var(--bark2)",border:`1.5px solid ${fields.atShop===val?"var(--lime)":"var(--moss)"}`,borderRadius:8,padding:"11px 6px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:600,color:fields.atShop===val?"var(--lime)":"var(--stone)",cursor:"pointer",transition:"all 0.15s"}}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cost — only if gas station */}
            {fields.atShop === false && (
              <div style={{animation:"fadeUp 0.2s ease both"}}>
                <Label>Total Cost ($)</Label>
                <input style={inputStyle} type="number" inputMode="decimal" placeholder="0.00" value={fields.total} onChange={e=>set("total",e.target.value)}/>
              </div>
            )}

            {/* Shop confirmation banner */}
            {fields.atShop === true && (
              <div style={{marginTop:12,background:"rgba(74,109,32,0.08)",border:"1px solid rgba(74,109,32,0.25)",borderRadius:8,padding:"10px 12px",fontSize:12,color:"var(--leaf)",fontFamily:"'Barlow Condensed',sans-serif",letterSpacing:0.5}}>
                ✓ No cost to record — shop fuel logged by gallons only.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Non-fuel details ── */}
      {fields.type && !isFuel && (
        <div style={{animation:"fadeUp 0.25s ease both"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:13,letterSpacing:3,color:"var(--stone)",marginBottom:10}}>Part 2 — Purchase Details</div>
          <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:12,padding:16,marginBottom:14}}>
            <div style={{marginBottom:14}}>
              <Label>Vendor / Merchant</Label>
              <input style={inputStyle} type="text" placeholder="e.g. Home Depot, Lowe's" value={fields.vendor} onChange={e=>set("vendor",e.target.value)}/>
            </div>
            <div>
              <Label>Total Amount ($)</Label>
              <input style={inputStyle} type="number" inputMode="decimal" placeholder="0.00" value={fields.total} onChange={e=>set("total",e.target.value)}/>
            </div>
          </div>
        </div>
      )}

      {/* ── Notes (always last) ── */}
      {fields.type && (
        <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:12,padding:16,marginBottom:14,animation:"fadeUp 0.2s ease both"}}>
          <Label optional>Notes</Label>
          <textarea style={{...inputStyle,resize:"none",height:76}} placeholder="Any additional details..." value={fields.notes} onChange={e=>set("notes",e.target.value)}/>
        </div>
      )}

      {formErr && <div className="error-msg" style={{marginBottom:12}}>{formErr}</div>}

      <button disabled={submitting} onClick={handleSubmit}
        style={{width:"100%",padding:"16px",background:submitting?"var(--moss)":"var(--lime)",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:18,letterSpacing:3,color:"var(--earth)",cursor:submitting?"not-allowed":"pointer",marginBottom:8,transition:"background 0.2s"}}>
        {submitting ? "Saving..." : "Next: Attach Photo →"}
      </button>
      {onClose && (
        <button onClick={onClose} style={{width:"100%",padding:"12px",background:"none",border:"1px solid var(--moss)",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:14,letterSpacing:2,color:"var(--stone)",cursor:"pointer"}}>
          Cancel
        </button>
      )}
    </div>
  );

  // ── STEP: PHOTO ──
  if (step === "photo") return (
    <div style={{animation:"fadeUp 0.3s ease both"}}>
      <StepBar done={1}/>

      <div className="success-banner" style={{marginBottom:16}}>
        <Ic n="check" style={{width:14,height:14,flexShrink:0}}/> Receipt saved! Now attach a photo.
      </div>

      {/* Summary card */}
      <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:12,padding:16,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,color:"var(--cream)"}}>{fields.name}</div>
            <div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{displayTruck} · {fields.division}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--lime)",lineHeight:1}}>
              {isFuel && fields.atShop ? `${fields.gallons} gal` : `$${fields.total}`}
            </div>
            <div style={{fontSize:11,color:"var(--stone)",marginTop:2}}>{fields.type}{isFuel?` · ${fields.fuelType}`:""}</div>
          </div>
        </div>
        {isFuel && <div style={{fontSize:12,color:"var(--stone)"}}>{fields.atShop?"At the Shop":"Gas Station"}{fields.gallons?` · ${fields.gallons} gal`:""}</div>}
        {!isFuel && <div style={{fontSize:12,color:"var(--stone)"}}>{fields.vendor}</div>}
      </div>

      <div style={{fontSize:13,color:"var(--stone)",marginBottom:10}}>
        Take a photo of the physical receipt — it will be saved directly to Drive.
      </div>

      <input ref={photoRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={handlePhoto}/>
      <div className="receipt-upload"
        onClick={()=>!uploading && photoRef.current.click()}
        style={{opacity:uploading?0.6:1,marginBottom:12,borderColor:uploading?"var(--moss)":"var(--leaf)",padding:"28px 16px"}}>
        <Ic n="camera" style={{width:32,height:32,color:uploading?"var(--stone)":"var(--lime)"}}/>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,letterSpacing:1,color:uploading?"var(--stone)":"var(--cream)"}}>
          {uploading ? "Uploading photo..." : "Tap to Open Camera"}
        </span>
        <span style={{fontSize:11,color:"var(--stone)"}}>REQUIRED</span>
      </div>
    </div>
  );

  // ── STEP: SUCCESS ──
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 0 16px",animation:"fadeUp 0.3s ease both"}}>
      <div style={{width:72,height:72,borderRadius:"50%",background:"rgba(74,109,32,0.15)",border:"2px solid var(--leaf)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
        <Ic n="check" style={{width:36,height:36,color:"var(--lime)"}}/>
      </div>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"var(--lime)",letterSpacing:3,marginBottom:4}}>All Done!</div>
      <div style={{fontSize:13,color:"var(--stone)",textAlign:"center",marginBottom:4}}>
        {isFuel ? `${fields.gallons} gal ${fields.fuelType}` : `${fields.vendor} · $${fields.total}`}
      </div>
      <div style={{fontSize:12,color:"var(--stone)",marginBottom:20}}>{fields.type} · {displayTruck} · {fields.division}</div>
      {photoUrl && <img src={photoUrl} alt="receipt" style={{width:"100%",borderRadius:8,border:"1px solid var(--moss)",marginBottom:16}}/>}
      <div style={{display:"flex",gap:8,width:"100%"}}>
        <button onClick={reset} style={{flex:1,padding:"14px",background:"var(--lime)",border:"none",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:2,color:"var(--earth)",cursor:"pointer"}}>
          Submit Another
        </button>
        <button onClick={onGoHome||onClose} style={{flex:1,padding:"14px",background:"none",border:"1px solid var(--moss)",borderRadius:10,fontFamily:"'Bebas Neue',sans-serif",fontSize:15,letterSpacing:2,color:"var(--stone)",cursor:"pointer"}}>
          {onGoHome ? "Go to Home" : "Done"}
        </button>
      </div>
    </div>
  );
}

// ── HR TAB ──
function HRTab() {
  const [openHR, setOpenHR] = useState(null);
  return (
    <div>
      {!openHR ? (
        <>
          <div className="section-hd">HR &amp; Employee Portal</div>
          {HR_LINKS.map(f=>(
            <div key={f.name}
              style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--mgr)",borderRadius:9,padding:"13px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:f.url?"pointer":"default",opacity:f.url?1:0.6}}
              onClick={()=>{ if(f.url) setOpenHR(f); }}>
              <div style={{width:34,height:34,borderRadius:8,background:"rgba(74,122,181,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <Ic n="shield" style={{width:15,height:15,color:"var(--mgr-lt)"}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)"}}>{f.name}</div>
                <div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{f.desc}</div>
              </div>
              {f.url
                ? <Ic n="chev" style={{width:16,height:16,color:"var(--moss)"}}/>
                : <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:1,color:"var(--stone)",textTransform:"uppercase"}}>Soon</span>
              }
            </div>
          ))}
        </>
      ) : (
        <div style={{animation:"fadeUp 0.3s ease both"}}>
          <button className="back-btn" style={{marginBottom:14}} onClick={()=>setOpenHR(null)}>
            <Ic n="back"/> Back to HR Portal
          </button>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,color:"var(--cream)",marginBottom:10}}>{openHR.name}</div>
          <iframe
            src={openHR.url}
            style={{width:"100%",height:"calc(100dvh - 180px)",border:"none",display:"block",borderRadius:8}}
            title={openHR.name}
          />
        </div>
      )}
    </div>
  );
}

// ── RECEIPT TAB (truck view) ──
function ReceiptTab({ truck, division, onGoHome }) {
  return (
    <div style={{padding:"16px 16px 100px"}}>
      <div className="section-hd">Submit a Receipt</div>
      <NativeReceiptFlow
        truckLabel={truck.label}
        divisionLabel={division}
        onGoHome={onGoHome}
      />
    </div>
  );
}

// ── TRUCK HOME ── (no Jobs tab)
function TruckHome({ truck, initialDivision, onLogout, checkouts, setCheckouts }) {
  const [tab,      setTab]    = useState("home");
  const [division]            = useState(initialDivision || "");
  const myCheckoutCount = (checkouts[truck.id]||[]).reduce((s,c)=>s+c.qty,0);

  return (
    <div className="screen">
      <div className="topbar">
        <div className="topbar-left">
          <div className="topbar-title">J&amp;J &amp; Son</div>
          <div className="truck-pill"><Ic n="truck"/>{truck.label}</div>
        </div>
        <button className="logout-btn" onClick={onLogout}>Sign Out</button>
      </div>
      <div className="content" style={{padding: tab==="receipt" ? "0" : undefined}}>
        {tab==="home"    && <HomeTab truck={truck} division={division}/>}
        {tab==="receipt" && <ReceiptTab truck={truck} division={division} onGoHome={()=>setTab("home")}/>}
        {tab==="tools"   && <ToolsTab truck={truck} division={division} checkouts={checkouts} setCheckouts={setCheckouts}/>}
        {tab==="hr"      && <HRTab/>}
      </div>
      <nav className="bottom-nav">
        <button className={`bnav-btn ${tab==="home"?"active":""}`}    onClick={()=>setTab("home")}><Ic n="home"/>Home</button>
        <button className={`bnav-btn ${tab==="receipt"?"active":""}`} onClick={()=>setTab("receipt")}><Ic n="camera"/>Receipts</button>
        <button className={`bnav-btn ${tab==="tools"?"active":""}`}   onClick={()=>setTab("tools")} style={{position:"relative"}}>
          <Ic n="wrench"/>Tools
          {myCheckoutCount>0&&<span style={{position:"absolute",top:6,right:"50%",transform:"translateX(8px)",background:"var(--warn)",borderRadius:"50%",width:15,height:15,fontSize:10,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Bebas Neue',sans-serif",color:"var(--earth)"}}>{myCheckoutCount}</span>}
        </button>
        <button className={`bnav-btn ${tab==="hr"?"active":""}`}      onClick={()=>setTab("hr")}><Ic n="shield"/>HR</button>
      </nav>
    </div>
  );
}

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

// ── MANAGER ZONE ── (no Jobs tab)
const SHEETS_ID  = "1PMRNlpefHWFVRn59wfJH1za7tfIAmftAfG9kF4-dy4Q";
const SHEETS_KEY = "AIzaSyBj9Hxi1MUSq4MBToFxqKG1QDwJBu9PyJw";

function ManagerZone({ onLogout, checkouts, signIns }) {
  const [tab,          setTab]        = useState("fleet");
  const [selectedTruck,setSelTruck]   = useState(null);
  const [receipts,     setReceipts]   = useState([]);
  const [receiptsLoading, setReceiptsLoading] = useState(false);

  const activeTrucks = Object.entries(signIns);

  useEffect(()=>{
    const fetchReceipts = async () => {
      setReceiptsLoading(true);
      const today = new Date().toLocaleDateString();
      try {
        const [r1, r2] = await Promise.all([
          fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/Receipts?key=${SHEETS_KEY}`).then(r=>r.json()),
          fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/Fuel%20Log?key=${SHEETS_KEY}`).then(r=>r.json()),
        ]);
        const parseRows = (data, type) => {
          const rows = data.values || [];
          if (rows.length < 2) return [];
          return rows.slice(1)
            .filter(r => r[0] === today)
            .map(r => ({
              date:     r[0] || "",
              time:     r[1] || "",
              truck:    r[2] || "",
              division: r[3] || "",
              type:     r[4] || type,
              total:    r[5] || "",
              merchant: r[6] || "",
              photoUrl: r[7] || "",
            }));
        };
        setReceipts([
          ...parseRows(r1, "Receipt"),
          ...parseRows(r2, "Fuel"),
        ]);
      } catch(e) { console.warn("Receipts fetch failed", e); }
      setReceiptsLoading(false);
    };
    fetchReceipts();
  },[]);

  const truckReceipts = (truckId) =>
    receipts.filter(r => r.truck === `Truck ${truckId}`);

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
              {icon:"clock", label:"Signed In",        val: selectedTruck.signInTime},
              {icon:"home",  label:"Division",          val: selectedTruck.division||"Not selected"},
              {icon:"sun",   label:"Morning Rollout",   val:"Pending"},
              {icon:"clip",  label:"Trailer Checklist", val:"Pending"},
            ].map(s=>(
              <div key={s.label} className="detail-stat">
                <div className="detail-stat-icon"><Ic n={s.icon}/></div>
                <div className="detail-stat-info">
                  <div className="detail-stat-label">{s.label}</div>
                  <div className="detail-stat-val">{s.val}</div>
                </div>
              </div>
            ))}

            <div className="section-hd" style={{marginTop:8,color:"var(--mgr)"}}>
              Receipts & Fuel Logs Today
            </div>
            {receiptsLoading ? (
              <div style={{fontSize:13,color:"var(--stone)",padding:"8px 0"}}>Loading...</div>
            ) : truckReceipts(selectedTruck.truckId).length === 0 ? (
              <div style={{fontSize:13,color:"var(--stone)",padding:"8px 0"}}>No submissions today</div>
            ) : truckReceipts(selectedTruck.truckId).map((r,i)=>(
              <div key={i} style={{background:"var(--bark)",border:"1px solid var(--moss)",borderRadius:8,padding:"10px 13px",marginBottom:6}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)"}}>{r.type}</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--sand)"}}>{r.time}</div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div style={{fontSize:12,color:"var(--stone)"}}>{r.merchant||"—"}</div>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,color:"var(--lime)"}}>${r.total}</div>
                </div>
                {r.photoUrl && (
                  <div style={{display:"flex",alignItems:"center",gap:5,marginTop:6}}>
                    <Ic n="check" style={{width:12,height:12,color:"var(--lime)",flexShrink:0}}/>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,color:"var(--lime)",letterSpacing:1}}>Photo Uploaded</span>
                  </div>
                )}
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
      {/* Manager nav — Fleet and Tools only */}
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
const MEMORY_KEY = "jj_truck_memory";

function getTodayDateStr() {
  return new Date().toLocaleDateString("en-US");
}

function loadMemory() {
  try {
    const raw = localStorage.getItem(MEMORY_KEY);
    if (!raw) return null;
    const mem = JSON.parse(raw);
    if (mem.date !== getTodayDateStr()) { localStorage.removeItem(MEMORY_KEY); return null; }
    return mem;
  } catch(e) { return null; }
}

function saveMemory(truck) {
  try {
    localStorage.setItem(MEMORY_KEY, JSON.stringify({ truckId: truck.id, date: getTodayDateStr() }));
  } catch(e) {}
}

function clearMemory() {
  try { localStorage.removeItem(MEMORY_KEY); } catch(e) {}
}

function LoginScreen({ onTruckLogin, onMgrLogin }) {
  const memory = loadMemory();
  const rememberedTruck = memory ? TRUCKS.find(t=>t.id===memory.truckId) || null : null;

  const [mode,         setMode]        = useState("truck");
  const [dropOpen,     setDropOpen]    = useState(false);
  const [selected,     setSel]         = useState(rememberedTruck);
  const [mgrPass,      setMgrPass]     = useState("");
  const [error,        setError]       = useState("");
  const [receiptOpen,  setReceiptOpen] = useState(false);
  const [hrOpen,       setHrOpen]      = useState(false);
  const [openHR,       setOpenHR]      = useState(null);

  const handleSelectTruck = (truck) => {
    saveMemory(truck);
    onTruckLogin(truck, "");
  };

  const handleChangeTruck = () => {
    clearMemory();
    setSel(null);
    setError("");
  };

  const tryMgr = () => {
    if (mgrPass === "ground25") onMgrLogin();
    else { setError("Incorrect password."); setMgrPass(""); }
  };

  return (
    <div className="splash">
      {/* Logo */}
      <div className="logo-wrap">
        <img className="logo-img"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjAwMCAyMDAwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsOiMzZDZiMTA7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjI7Ij48cmVjdCB3aWR0aD0iMjAwMCIgaGVpZ2h0PSIyMDAwIiBmaWxsPSJub25lIi8+PC9zdmc+"
          alt="J&J & Son"/>
        <div className="app-title">J&amp;J &amp; Son</div>
        <div className="app-sub">Operations Center</div>
      </div>

      {mode==="truck" && (
        <>
          {/* ── Truck selection or remembered truck ── */}
          {!rememberedTruck ? (
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
                <button className="btn-select-truck" onClick={()=>handleSelectTruck(selected)}>
                  Make This My Truck
                </button>
              )}
            </>
          ) : (
            /* Remembered truck — one tap to get in */
            <div style={{width:"100%",marginBottom:20,animation:"fadeUp 0.3s ease both"}}>
              <div style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--lime)",borderRadius:10,padding:"16px",marginBottom:12,display:"flex",alignItems:"center",gap:14}}>
                <div style={{width:44,height:44,borderRadius:10,background:"var(--moss)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Ic n="truck" style={{width:22,height:22,color:"var(--lime)"}}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:"var(--lime)",letterSpacing:2,lineHeight:1}}>{rememberedTruck.label}</div>
                  <div style={{fontSize:12,color:"var(--stone)",marginTop:3}}>Your truck from today</div>
                </div>
              </div>
              <button className="btn-select-truck" style={{marginBottom:8}} onClick={()=>handleSelectTruck(rememberedTruck)}>
                Sign In as {rememberedTruck.label}
              </button>
              <div style={{textAlign:"center"}}>
                <span onClick={handleChangeTruck}
                  style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,color:"var(--stone)",letterSpacing:1,cursor:"pointer",textDecoration:"underline",textUnderlineOffset:3}}>
                  Not your truck? Change it
                </span>
              </div>
            </div>
          )}

          <div className="mgr-toggle" onClick={()=>{ setMode("manager"); setError(""); }}>Manager Zone →</div>

          {/* ── WALK-IN RECEIPT SUBMISSION ── */}
          <div style={{width:"100%",marginTop:28}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:3,color:"var(--stone)",marginBottom:10,display:"flex",alignItems:"center",gap:8}}>
              Submit a Receipt
              <span style={{flex:1,height:1,background:"var(--moss)",display:"block"}}/>
            </div>
            {!receiptOpen ? (
              <div
                style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--leaf)",borderRadius:9,padding:"13px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}
                onClick={()=>setReceiptOpen(true)}>
                <div style={{width:34,height:34,borderRadius:8,background:"var(--moss)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Ic n="camera" style={{width:15,height:15,color:"var(--lime)"}}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)"}}>Receipt Submission</div>
                  <div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>Submit without logging into a truck</div>
                </div>
                <Ic n="chev" style={{width:16,height:16,color:"var(--moss)"}}/>
              </div>
            ) : (
              <NativeReceiptFlow
                truckLabel="General Submission"
                divisionLabel=""
                onClose={()=>setReceiptOpen(false)}
              />
            )}
          </div>

          {/* ── EMPLOYEE RESOURCES ── */}
          <div style={{width:"100%",marginTop:16}}>
            {!hrOpen ? (
              <div
                style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--mgr)",borderRadius:9,padding:"13px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:"pointer"}}
                onClick={()=>setHrOpen(true)}>
                <div style={{width:34,height:34,borderRadius:8,background:"rgba(74,122,181,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Ic n="shield" style={{width:15,height:15,color:"var(--mgr-lt)"}}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)"}}>Employee Resources</div>
                  <div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>Request time away &amp; view company policies</div>
                </div>
                <Ic n="chev" style={{width:16,height:16,color:"var(--moss)"}}/>
              </div>
            ) : (
              <div style={{animation:"fadeUp 0.3s ease both"}}>
                {!openHR ? (
                  <>
                    <button className="back-btn" style={{marginBottom:14}} onClick={()=>setHrOpen(false)}>
                      <Ic n="back"/> Back
                    </button>
                    <div className="section-hd">Employee Resources</div>
                    {HR_LINKS.map(f=>(
                      <div key={f.name}
                        style={{background:"var(--bark)",border:"1px solid var(--moss)",borderLeft:"4px solid var(--mgr)",borderRadius:9,padding:"13px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12,cursor:f.url?"pointer":"default",opacity:f.url?1:0.6}}
                        onClick={()=>{ if(f.url) setOpenHR(f); }}>
                        <div style={{width:34,height:34,borderRadius:8,background:"rgba(74,122,181,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <Ic n="shield" style={{width:15,height:15,color:"var(--mgr-lt)"}}/>
                        </div>
                        <div style={{flex:1}}>
                          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:14,color:"var(--cream)"}}>{f.name}</div>
                          <div style={{fontSize:12,color:"var(--stone)",marginTop:2}}>{f.desc}</div>
                        </div>
                        {f.url
                          ? <Ic n="chev" style={{width:16,height:16,color:"var(--moss)"}}/>
                          : <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:1,color:"var(--stone)",textTransform:"uppercase"}}>Soon</span>
                        }
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <button className="back-btn" style={{marginBottom:14}} onClick={()=>setOpenHR(null)}>
                      <Ic n="back"/> Back to Employee Resources
                    </button>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:15,color:"var(--cream)",marginBottom:10}}>{openHR.name}</div>
                    <iframe
                      src={openHR.url}
                      style={{width:"100%",height:"560px",border:"none",display:"block",borderRadius:8}}
                      title={openHR.name}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </>
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
          <div className="mgr-toggle" style={{color:"var(--stone)"}} onClick={()=>{setMode("truck");setError("");}}>← Back</div>
        </div>
      )}

      <div style={{marginTop:"auto",paddingTop:32,textAlign:"center"}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,color:"var(--moss)",letterSpacing:1,lineHeight:1.6}}>
          Created by Salerni Creative Co LLC<br/>All Rights Reserved
        </div>
      </div>
    </div>
  );
}

// ── ROOT ──
export default function App() {
  const [screen,    setScreen]    = useState("login");
  const [truck,     setTruck]     = useState(null);
  const [truckDiv,  setTruckDiv]  = useState("");
  const [checkouts, setCheckouts] = useState({});
  const [signIns,   setSignIns]   = useState({});

  const handleTruckLogin = (t) => {
    const time = getTimeStr();
    setSignIns(prev => ({ ...prev, [t.id]: { signInTime: time, division: "" } }));
    setTruck(t);
    setTruckDiv("");
    setScreen("truck");
  };

  const handleLogout = () => {
    // Don't clear memory on logout — remember the truck for next login
    setTruck(null);
    setTruckDiv("");
    setScreen("login");
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
            initialDivision={truckDiv}
            onLogout={handleLogout}
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
