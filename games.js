const STANDALONE = {"snakePro": "<!DOCTYPE html>\n<html lang=\"fa\" dir=\"rtl\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\">\n<title>🐍 مار و سیب</title>\n<style>\n@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700;900&display=swap');\n\n/* ===== تم‌های رنگی (فقط محیط) ===== */\nbody {\n  user-select: none; -webkit-user-select: none;\n  --bg: #0d0d0d;\n  --panel: #111111;\n  --snake1: #39ff14;\n  --snake2: #00cc0a;\n  --apple: #ff2d55;\n  --gold: #ffd60a;\n  --cyan: #00e5ff;\n  --border: rgba(57,255,20,0.18);\n  --btn-border: #39ff14;\n  --btn-text: #39ff14;\n  --btn-shadow: rgba(57,255,20,0.15);\n  --text-color: #eee;\n  --header-color: #39ff14;\n  --overlay-bg: rgba(0,0,0,0.92);\n  --hud-label: rgba(255,255,255,0.25);\n}\n\nbody.theme-night {\n  --bg: #0a0e1a;\n  --panel: #111827;\n  --border: rgba(129,140,248,0.18);\n  --btn-border: #818cf8;\n  --btn-text: #818cf8;\n  --btn-shadow: rgba(129,140,248,0.15);\n  --text-color: #e0e7ff;\n  --header-color: #818cf8;\n  --overlay-bg: rgba(10,14,26,0.95);\n  --hud-label: rgba(255,255,255,0.2);\n}\n\nbody.theme-day {\n  --bg: #f5f0e8;\n  --panel: #e8e0d0;\n  --border: rgba(249,115,22,0.25);\n  --btn-border: #f97316;\n  --btn-text: #f97316;\n  --btn-shadow: rgba(249,115,22,0.2);\n  --text-color: #2d1f0e;\n  --header-color: #f97316;\n  --overlay-bg: rgba(245,240,232,0.95);\n  --hud-label: rgba(0,0,0,0.25);\n}\n\nbody.theme-nature {\n  --bg: #0a1208;\n  --panel: #0f1a0d;\n  --border: rgba(74,222,128,0.18);\n  --btn-border: #4ade80;\n  --btn-text: #4ade80;\n  --btn-shadow: rgba(74,222,128,0.15);\n  --text-color: #d1fae5;\n  --header-color: #4ade80;\n  --overlay-bg: rgba(10,18,8,0.95);\n  --hud-label: rgba(255,255,255,0.2);\n}\n\nbody.theme-pink {\n  --bg: #1a0a14;\n  --panel: #1f0d18;\n  --border: rgba(236,72,153,0.18);\n  --btn-border: #ec4899;\n  --btn-text: #ec4899;\n  --btn-shadow: rgba(236,72,153,0.15);\n  --text-color: #fce7f3;\n  --header-color: #ec4899;\n  --overlay-bg: rgba(26,10,20,0.95);\n  --hud-label: rgba(255,255,255,0.2);\n}\n\nbody.theme-fire {\n  --bg: #1a0a05;\n  --panel: #1f0d08;\n  --border: rgba(251,146,60,0.18);\n  --btn-border: #fb923c;\n  --btn-text: #fb923c;\n  --btn-shadow: rgba(251,146,60,0.15);\n  --text-color: #fed7aa;\n  --header-color: #fb923c;\n  --overlay-bg: rgba(26,10,5,0.95);\n  --hud-label: rgba(255,255,255,0.2);\n}\n\nbody.theme-purple {\n  --bg: #0f071a;\n  --panel: #150a1f;\n  --border: rgba(168,85,247,0.18);\n  --btn-border: #a855f7;\n  --btn-text: #a855f7;\n  --btn-shadow: rgba(168,85,247,0.15);\n  --text-color: #ede9fe;\n  --header-color: #a855f7;\n  --overlay-bg: rgba(15,7,26,0.95);\n  --hud-label: rgba(255,255,255,0.2);\n}\n\n/* ===== استایل اصلی ===== */\n* { margin:0; padding:0; box-sizing:border-box; touch-action:none; }\n\nbody {\n  background: var(--bg);\n  font-family: 'Vazirmatn', sans-serif;\n  color: var(--text-color);\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 14px;\n  padding: 12px;\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n\nheader {\n  display:flex; align-items:center; justify-content:space-between;\n  width:100%; max-width:420px;\n}\n\n.logo {\n  font-size:22px; font-weight:900; letter-spacing:1px;\n  color: var(--header-color);\n  text-shadow: 0 0 14px var(--header-color);\n  transition: all 0.3s ease;\n}\n\n.hud {\n  display:flex; gap:12px;\n}\n\n.hud-box {\n  display:flex; flex-direction:column; align-items:center; gap:1px;\n}\n.hud-label {\n  font-size:8px; color: var(--hud-label); letter-spacing:2px;\n  transition: all 0.3s ease;\n}\n.hud-val {\n  font-size:18px; font-weight:900;\n  min-width:36px; text-align:center;\n}\n.hud-val.gold { color: var(--gold); text-shadow: 0 0 10px rgba(255,214,10,0.6); }\n.hud-val.green { color: var(--header-color); text-shadow: 0 0 10px var(--header-color); }\n.hud-val.cyan { color: var(--cyan); text-shadow: 0 0 10px rgba(0,229,255,0.6); }\n\n.arena {\n  position:relative;\n  border: 1.5px solid var(--border);\n  border-radius:10px;\n  overflow:hidden;\n  box-shadow: 0 0 0 1px var(--border), 0 0 40px var(--border);\n  transition: all 0.3s ease;\n}\ncanvas { display:block; }\n\n.overlay {\n  position:absolute; inset:0;\n  background: var(--overlay-bg);\n  backdrop-filter:blur(5px);\n  display:flex;\n  flex-direction:column;\n  align-items:center;\n  gap:12px;\n  z-index:10;\n  padding:20px 16px;\n  animation: fadeIn .25s ease;\n  transition: all 0.3s ease;\n}\n.overlay.hidden { display:none; }\n@keyframes fadeIn { from{opacity:0} to{opacity:1} }\n\n.overlay-center {\n  justify-content:center;\n}\n\n/* ===== فروشگاه و تم‌ها با اسکرول ===== */\n#shopMenu, #themeMenu {\n  justify-content: flex-start;\n  overflow-y: auto;\n  overflow-x: hidden;\n  -webkit-overflow-scrolling: touch;\n  touch-action: pan-y;\n  overscroll-behavior: contain;\n  padding: 12px 10px;\n  max-height: 100%;\n}\n\n.shop-scroll {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 0;\n  flex-shrink: 0;\n}\n\n/* اسکرول‌بار زیبا */\n#shopMenu::-webkit-scrollbar,\n#themeMenu::-webkit-scrollbar {\n  width: 3px;\n}\n#shopMenu::-webkit-scrollbar-track,\n#themeMenu::-webkit-scrollbar-track {\n  background: rgba(255,255,255,0.03);\n  border-radius: 10px;\n}\n#shopMenu::-webkit-scrollbar-thumb,\n#themeMenu::-webkit-scrollbar-thumb {\n  background: var(--btn-border);\n  border-radius: 10px;\n}\n\n/* ===== دکمه خروج در گوشه بالا ===== */\n.close-btn-top {\n  position: absolute;\n  top: 10px;\n  right: 12px;\n  background: none;\n  border: none;\n  color: var(--hud-label);\n  font-size: 24px;\n  cursor: pointer;\n  z-index: 15;\n  padding: 4px 8px;\n  transition: all 0.2s;\n  touch-action: manipulation;\n  line-height: 1;\n}\n.close-btn-top:hover {\n  color: var(--text-color);\n  transform: scale(1.1);\n}\n\n.ov-title {\n  font-size:32px; font-weight:900;\n  color: var(--header-color);\n  text-shadow: 0 0 24px var(--header-color);\n  transition: all 0.3s ease;\n  flex-shrink: 0;\n  text-align:center;\n}\n.ov-title.gold { color: var(--gold); text-shadow: 0 0 24px var(--gold); }\n.ov-sub {\n  font-size:13px; color: var(--hud-label);\n  text-align:center; line-height:1.8;\n  transition: all 0.3s ease;\n  flex-shrink: 0;\n}\n.ov-score {\n  font-size:48px; font-weight:900; color: var(--gold);\n  text-shadow: 0 0 24px var(--gold);\n}\n.ov-label { font-size:11px; color:rgba(255,214,10,0.4); letter-spacing:3px; }\n\n.btn {\n  padding:12px 36px;\n  background:transparent;\n  border:1.5px solid var(--btn-border);\n  color:var(--btn-text);\n  font-family:'Vazirmatn',sans-serif;\n  font-size:15px; font-weight:700;\n  border-radius:10px;\n  cursor:pointer;\n  transition:all .18s;\n  text-shadow: 0 0 10px var(--btn-border);\n  box-shadow: 0 0 14px var(--btn-shadow);\n  min-width:140px;\n  touch-action:manipulation;\n  flex-shrink: 0;\n}\n.btn:hover {\n  background:var(--btn-shadow);\n  box-shadow: 0 0 28px var(--btn-shadow);\n  transform:scale(1.04);\n}\n.btn-sm { padding:8px 24px; font-size:13px; min-width:100px; }\n.btn-gold { border-color:var(--gold); color:var(--gold); text-shadow: 0 0 10px var(--gold); box-shadow: 0 0 14px rgba(255,214,10,0.15); }\n.btn-gold:hover { background:rgba(255,214,10,0.1); box-shadow: 0 0 28px rgba(255,214,10,0.35); }\n.btn-red { border-color:#ff2d55; color:#ff2d55; text-shadow: 0 0 10px #ff2d55; box-shadow: 0 0 14px rgba(255,45,85,0.15); }\n.btn-red:hover { background:rgba(255,45,85,0.1); box-shadow: 0 0 28px rgba(255,45,85,0.35); }\n\n.speed-control {\n  display:flex;\n  gap:8px;\n  align-items:center;\n  background:rgba(255,255,255,0.03);\n  padding:8px 14px;\n  border-radius:30px;\n  border:1px solid var(--border);\n  flex-wrap:wrap;\n  justify-content:center;\n  transition: all 0.3s ease;\n  flex-shrink: 0;\n}\n.speed-control .sc-label {\n  font-size:11px;\n  color: var(--hud-label);\n  letter-spacing:1px;\n  margin-left:4px;\n  transition: all 0.3s ease;\n}\n.speed-btn {\n  padding:6px 14px;\n  border:1.5px solid var(--border);\n  border-radius:20px;\n  background:transparent;\n  color: var(--hud-label);\n  font-family:'Vazirmatn',sans-serif;\n  font-size:11px;\n  font-weight:700;\n  cursor:pointer;\n  transition:all .2s;\n  touch-action:manipulation;\n}\n.speed-btn:hover { border-color:var(--btn-border); color:var(--btn-text); }\n.speed-btn.active {\n  border-color:var(--btn-border);\n  color:var(--btn-text);\n  background:var(--btn-shadow);\n  box-shadow:0 0 20px var(--btn-shadow);\n}\n\n.shop-grid {\n  display:grid;\n  grid-template-columns:repeat(3,1fr);\n  gap:8px;\n  width:100%;\n  max-width:300px;\n  margin:4px 0;\n  flex-shrink: 0;\n}\n.shop-item {\n  background:rgba(255,255,255,0.04);\n  border:1.5px solid rgba(255,255,255,0.08);\n  border-radius:10px;\n  padding:10px 6px;\n  text-align:center;\n  cursor:pointer;\n  transition:all .2s;\n  touch-action:manipulation;\n}\n.shop-item:hover { border-color:var(--btn-border); }\n.shop-item.owned { border-color:var(--gold); background:rgba(255,214,10,0.05); }\n.shop-item.active-skin { border-color:var(--btn-border); box-shadow:0 0 20px var(--btn-shadow); }\n.shop-item.special { background:rgba(255,215,0,0.05); border-color:rgba(255,215,0,0.2); }\n.shop-item.special.active-skin { border-color:var(--gold); box-shadow:0 0 30px rgba(255,215,0,0.3); }\n.shop-item .si-color {\n  width:28px; height:28px;\n  border-radius:50%;\n  margin:0 auto 4px;\n  border:2px solid rgba(255,255,255,0.1);\n}\n.shop-item .si-color.special-glow {\n  animation: glowPulse 1.5s ease-in-out infinite;\n}\n@keyframes glowPulse {\n  0%,100% { box-shadow: 0 0 10px rgba(255,215,0,0.3); }\n  50% { box-shadow: 0 0 25px rgba(255,215,0,0.6); }\n}\n.shop-item .si-name { font-size:9px; color: var(--hud-label); }\n.shop-item .si-price { font-size:8px; color:var(--gold); }\n.shop-item .si-badge { font-size:7px; color:var(--btn-border); }\n.shop-item .si-badge.special-badge { color:var(--gold); }\n\n.section-title {\n  font-size:11px;\n  color: var(--hud-label);\n  letter-spacing:2px;\n  margin-top:4px;\n  flex-shrink: 0;\n}\n.section-title.gold {\n  color: var(--gold);\n}\n\n.dpad {\n  display:grid;\n  grid-template-columns:58px 58px 58px;\n  grid-template-rows:58px 58px 58px;\n  gap:4px;\n}\n.dp {\n  background:rgba(255,255,255,0.04);\n  border:1.5px solid var(--border);\n  border-radius:10px;\n  font-size:20px;\n  cursor:pointer;\n  display:flex; align-items:center; justify-content:center;\n  transition: all .1s;\n  -webkit-tap-highlight-color:transparent;\n  touch-action:manipulation;\n  color: var(--hud-label);\n}\n.dp:active { background:var(--btn-shadow); transform:scale(0.92); border-color:var(--btn-border); }\n\n.pause-btn {\n  position:absolute;\n  top:8px; left:8px;\n  z-index:5;\n  background:rgba(0,0,0,0.5);\n  border:1px solid var(--border);\n  border-radius:50%;\n  width:32px; height:32px;\n  color: var(--hud-label);\n  font-size:16px;\n  cursor:pointer;\n  display:flex; align-items:center; justify-content:center;\n  transition:all .2s;\n  touch-action:manipulation;\n}\n.pause-btn:hover {\n  background:rgba(255,255,255,0.1);\n  color: var(--text-color);\n}\n\n.level-tag {\n  font-size:10px; color: var(--hud-label);\n  letter-spacing:2px;\n  align-self:flex-end;\n  margin-bottom:-6px;\n  transition: all 0.3s ease;\n}\n\n.channel-logo {\n  position:fixed; \n  top:15px; \n  right:15px; \n  z-index:9999; \n  display:block; \n  width:48px; \n  height:48px; \n  border-radius:50%; \n  overflow:hidden; \n  border:2px solid var(--btn-border); \n  box-shadow:0 0 25px var(--btn-shadow); \n  transition:all .3s; \n  cursor:pointer;\n}\n.channel-logo:hover {\n  transform:scale(1.1); \n  box-shadow:0 0 40px var(--btn-shadow);\n}\n.channel-logo img {\n  width:100%; \n  height:100%; \n  object-fit:cover; \n  display:block;\n}\n\n#mainMenu, #pauseMenu, #gameOver {\n  justify-content:center;\n}\n\n.theme-item {\n  background:rgba(255,255,255,0.04);\n  border:1.5px solid rgba(255,255,255,0.08);\n  border-radius:10px;\n  padding:12px 10px;\n  text-align:center;\n  cursor:pointer;\n  transition:all .2s;\n  touch-action:manipulation;\n  min-width:80px;\n}\n.theme-item:hover { border-color:var(--btn-border); }\n.theme-item.owned { border-color:var(--gold); background:rgba(255,214,10,0.05); }\n.theme-item.active-theme { border-color:var(--btn-border); box-shadow:0 0 20px var(--btn-shadow); }\n.theme-item .ti-emoji { font-size:28px; display:block; margin-bottom:4px; }\n.theme-item .ti-name { font-size:9px; color: var(--hud-label); }\n.theme-item .ti-price { font-size:8px; color:var(--gold); }\n.theme-item .ti-badge { font-size:7px; color:var(--btn-border); }\n\n.theme-grid {\n  display:grid;\n  grid-template-columns:repeat(3,1fr);\n  gap:8px;\n  width:100%;\n  max-width:300px;\n  margin:4px 0;\n  flex-shrink: 0;\n}\n</style>\n</head>\n<body style=\"user-select:none;-webkit-user-select:none\">\n\n<header>\n  <div class=\"logo\">🐍 مار</div>\n  <div class=\"hud\">\n    <div class=\"hud-box\">\n      <span class=\"hud-label\">امتیاز</span>\n      <span class=\"hud-val gold\" id=\"scoreEl\">0</span>\n    </div>\n    <div class=\"hud-box\">\n      <span class=\"hud-label\">🪙 سکه</span>\n      <span class=\"hud-val cyan\" id=\"coinEl\">0</span>\n    </div>\n    <div class=\"hud-box\">\n      <span class=\"hud-label\">بهترین</span>\n      <span class=\"hud-val green\" id=\"bestEl\">0</span>\n    </div>\n  </div>\n</header>\n\n<div class=\"arena\" id=\"arena\">\n  <canvas id=\"c\"></canvas>\n  <button class=\"pause-btn\" id=\"pauseBtn\">⏸</button>\n\n  <!-- ===== منوی اصلی ===== -->\n  <div class=\"overlay overlay-center\" id=\"mainMenu\">\n    <div class=\"ov-title\">🐍 مار و سیب</div>\n    <div class=\"ov-sub\">سیب بخور · سکه جمع کن · تم و مار رنگی بخر!</div>\n    <button class=\"btn\" id=\"startBtn\">▶ شروع بازی</button>\n    <button class=\"btn btn-gold\" id=\"shopBtnFromMenu\">🛒 فروشگاه</button>\n    <button class=\"btn\" id=\"themeBtnFromMenu\" style=\"border-color:var(--gold); color:var(--gold); text-shadow:0 0 10px var(--gold); box-shadow:0 0 14px rgba(255,214,10,0.15);\">🎨 تم‌ها</button>\n    <div class=\"speed-control\">\n      <span class=\"sc-label\">⚡ سرعت بازی</span>\n      <button class=\"speed-btn\" data-speed=\"200\">🐢 آرام</button>\n      <button class=\"speed-btn active\" data-speed=\"150\">🐇 معمولی</button>\n      <button class=\"speed-btn\" data-speed=\"100\">🐆 تند</button>\n      <button class=\"speed-btn\" data-speed=\"60\">⚡ حرفه‌ای</button>\n    </div>\n  </div>\n\n  <!-- ===== مکث ===== -->\n  <div class=\"overlay overlay-center hidden\" id=\"pauseMenu\">\n    <div class=\"ov-title\" style=\"font-size:28px;\">⏸ مکث</div>\n    <button class=\"btn\" id=\"resumeBtn\">▶ ادامه بازی</button>\n    <button class=\"btn btn-sm\" id=\"exitBtn\">🏠 خروج از بازی</button>\n  </div>\n\n  <!-- ===== فروشگاه (مارهای رنگی) ===== -->\n  <div class=\"overlay hidden\" id=\"shopMenu\">\n    <button class=\"close-btn-top\" id=\"closeShopBtn\">✕</button>\n    <div class=\"shop-scroll\">\n      <div class=\"ov-title\" style=\"font-size:24px;\">🛒 فروشگاه</div>\n      <div style=\"font-size:15px; color:var(--gold); flex-shrink:0;\">🪙 <span id=\"shopCoin\">0</span> سکه</div>\n      <div class=\"section-title\">— مارهای رنگی —</div>\n      <div class=\"shop-grid\" id=\"shopGridSkins\"></div>\n    </div>\n  </div>\n\n  <!-- ===== تم‌ها (صفحه جداگانه) ===== -->\n  <div class=\"overlay hidden\" id=\"themeMenu\">\n    <button class=\"close-btn-top\" id=\"closeThemeBtn\">✕</button>\n    <div class=\"shop-scroll\">\n      <div class=\"ov-title\" style=\"font-size:24px;\">🎨 تم‌های محیط</div>\n      <div style=\"font-size:15px; color:var(--gold); flex-shrink:0;\">🪙 <span id=\"themeCoin\">0</span> سکه</div>\n      <div class=\"section-title gold\">— انتخاب تم —</div>\n      <div class=\"theme-grid\" id=\"themeGrid\"></div>\n    </div>\n  </div>\n\n  <!-- ===== Game Over ===== -->\n  <div class=\"overlay overlay-center hidden\" id=\"gameOver\">\n    <div class=\"ov-title\" style=\"color:#ff2d55; text-shadow:0 0 24px #ff2d55;\">💀 بازی تمام!</div>\n    <div class=\"ov-score\" id=\"finalScore\">0</div>\n    <div class=\"ov-label\">امتیاز نهایی</div>\n    <div class=\"speed-control\">\n      <span class=\"sc-label\">⚡ سرعت بازی</span>\n      <button class=\"speed-btn\" data-speed=\"200\">🐢 آرام</button>\n      <button class=\"speed-btn active\" data-speed=\"150\">🐇 معمولی</button>\n      <button class=\"speed-btn\" data-speed=\"100\">🐆 تند</button>\n      <button class=\"speed-btn\" data-speed=\"60\">⚡ حرفه‌ای</button>\n    </div>\n    <button class=\"btn\" id=\"restartBtn\">🔄 شروع مجدد</button>\n    <button class=\"btn btn-sm\" id=\"menuBtn\">🏠 منوی اصلی</button>\n  </div>\n</div>\n\n<div class=\"level-tag\">سطح <span id=\"lvlEl\">1</span></div>\n\n<div class=\"dpad\">\n  <div></div>\n  <div class=\"dp\" id=\"dpUp\">▲</div>\n  <div></div>\n  <div class=\"dp\" id=\"dpLeft\">◀</div>\n  <div class=\"dp\" id=\"dpCenter\" style=\"font-size:13px;opacity:.2\">✦</div>\n  <div class=\"dp\" id=\"dpRight\">▶</div>\n  <div></div>\n  <div class=\"dp\" id=\"dpDown\">▼</div>\n  <div></div>\n</div>\n\n<script>\n// ======================================================================\n// صدا\n// ======================================================================\nlet audioCtx = null;\nfunction initAudio() {\n  if(!audioCtx) {\n    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } \n    catch(e) {}\n  }\n}\nfunction playSound(type) {\n  try {\n    initAudio();\n    if(!audioCtx) return;\n    const osc = audioCtx.createOscillator();\n    const gain = audioCtx.createGain();\n    osc.connect(gain);\n    gain.connect(audioCtx.destination);\n    if(type === 'eat') {\n      osc.type = 'sine';\n      osc.frequency.setValueAtTime(523, audioCtx.currentTime);\n      osc.frequency.setValueAtTime(659, audioCtx.currentTime + 0.06);\n      osc.frequency.setValueAtTime(784, audioCtx.currentTime + 0.12);\n      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);\n      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);\n      osc.start(); osc.stop(audioCtx.currentTime + 0.25);\n    } \n    else if(type === 'die') {\n      osc.type = 'sawtooth';\n      osc.frequency.setValueAtTime(300, audioCtx.currentTime);\n      osc.frequency.linearRampToValueAtTime(80, audioCtx.currentTime + 0.4);\n      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);\n      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);\n      osc.start(); osc.stop(audioCtx.currentTime + 0.4);\n    } \n    else if(type === 'click') {\n      osc.type = 'sine';\n      osc.frequency.setValueAtTime(600, audioCtx.currentTime);\n      osc.frequency.setValueAtTime(800, audioCtx.currentTime + 0.04);\n      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);\n      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);\n      osc.start(); osc.stop(audioCtx.currentTime + 0.1);\n    }\n  } catch(e) {}\n}\n\n// ======================================================================\n// CANVAS\n// ======================================================================\nconst canvas = document.getElementById('c');\nconst ctx = canvas.getContext('2d');\nconst MAX_W = Math.min(window.innerWidth - 24, 420);\nconst COLS = 20, ROWS = 20;\nconst CELL = Math.floor(MAX_W / COLS);\nconst W = COLS * CELL, H = ROWS * CELL;\ncanvas.width = W; canvas.height = H;\ndocument.getElementById('arena').style.width = W + 'px';\ndocument.getElementById('arena').style.height = H + 'px';\n\n// ======================================================================\n// SKINS (مارها) + THEMES (تم‌های محیط)\n// ======================================================================\nconst SKINS = [\n  { id: 'green', name: 'سبز', color: '#39ff14', color2: '#00cc0a', price: 0, default: true, special: false },\n  { id: 'blue', name: 'آبی', color: '#3b82f6', color2: '#1d4ed8', price: 50, special: false },\n  { id: 'red', name: 'قرمز', color: '#ef4444', color2: '#b91c1c', price: 50, special: false },\n  { id: 'purple', name: 'بنفش', color: '#a855f7', color2: '#7c3aed', price: 50, special: false },\n  { id: 'pink', name: 'صورتی', color: '#ec4899', color2: '#be185d', price: 50, special: false },\n  { id: 'orange', name: 'نارنجی', color: '#f97316', color2: '#ea580c', price: 50, special: false },\n  { id: 'gold', name: '✨ طلایی', color: '#fbbf24', color2: '#d97706', price: 50, special: true },\n  { id: 'cyan_special', name: '💎 فیروزه‌ای', color: '#06b6d4', color2: '#0891b2', price: 50, special: true },\n  { id: 'lime_special', name: '🌟 لیمویی', color: '#a3e635', color2: '#65a30d', price: 50, special: true },\n];\n\nconst THEMES = [\n  { id: 'default', name: 'پیش‌فرض', emoji: '🌑', price: 0, default: true },\n  { id: 'night', name: 'شب مهتابی', emoji: '🌙', price: 50 },\n  { id: 'day', name: 'روز آفتابی', emoji: '☀️', price: 50 },\n  { id: 'nature', name: 'طبیعت', emoji: '🌿', price: 50 },\n  { id: 'pink', name: 'شیرینی', emoji: '🌸', price: 50 },\n  { id: 'fire', name: 'آتشین', emoji: '🔥', price: 50 },\n  { id: 'purple', name: 'بنفش رویایی', emoji: '💜', price: 50 },\n];\n\nlet ownedSkins = ['green'];\nlet activeSkin = 'green';\nlet ownedThemes = ['default'];\nlet activeTheme = 'default';\n\n// ======================================================================\n// STATE\n// ======================================================================\nlet snake, dir, nextDir, apple, score, coins = 0, best = 0;\nlet running = false, paused = false;\nlet gameLoopInterval = null;\nlet selectedSpeed = 150;\nlet currentSpeed = 150;\nlet frame = 0;\nlet particles = [];\n\nfunction loadData() {\n  try {\n    const saved = localStorage.getItem('snakeGameData');\n    if(saved) {\n      const data = JSON.parse(saved);\n      if(data.best) best = data.best;\n      if(data.coins) coins = data.coins;\n      if(data.ownedSkins) ownedSkins = data.ownedSkins;\n      if(data.activeSkin) activeSkin = data.activeSkin;\n      if(data.ownedThemes) ownedThemes = data.ownedThemes;\n      if(data.activeTheme) activeTheme = data.activeTheme;\n    }\n  } catch(e) {}\n}\nfunction saveData() {\n  try {\n    localStorage.setItem('snakeGameData', JSON.stringify({\n      best, coins, ownedSkins, activeSkin, ownedThemes, activeTheme\n    }));\n  } catch(e) {}\n}\nloadData();\ndocument.getElementById('bestEl').textContent = best;\ndocument.getElementById('coinEl').textContent = coins;\n\nfunction applyTheme(themeId) {\n  document.body.className = '';\n  if(themeId !== 'default') {\n    document.body.classList.add('theme-' + themeId);\n  }\n}\n\nfunction setSpeed(speed, btn) {\n  selectedSpeed = speed;\n  currentSpeed = speed;\n  document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));\n  if(btn) btn.classList.add('active');\n  if(running && gameLoopInterval) {\n    clearInterval(gameLoopInterval);\n    gameLoopInterval = setInterval(tick, currentSpeed);\n  }\n}\n\ndocument.querySelectorAll('.speed-btn').forEach(btn => {\n  btn.addEventListener('click', function(e) {\n    e.stopPropagation();\n    playSound('click');\n    setSpeed(parseInt(this.dataset.speed), this);\n  });\n});\n\ndocument.querySelectorAll('.speed-btn').forEach(b => {\n  if(parseInt(b.dataset.speed) === selectedSpeed) b.classList.add('active');\n});\n\n// ======================================================================\n// GAME LOGIC\n// ======================================================================\nfunction init() {\n  const mid = Math.floor(COLS/2);\n  snake = [{x: mid, y: Math.floor(ROWS/2)}, {x: mid-1, y: Math.floor(ROWS/2)}, {x: mid-2, y: Math.floor(ROWS/2)}];\n  dir = {x:1, y:0};\n  nextDir = {x:1, y:0};\n  score = 0;\n  frame = 0;\n  particles = [];\n  currentSpeed = selectedSpeed;\n  document.getElementById('scoreEl').textContent = '0';\n  document.getElementById('lvlEl').textContent = '1';\n  spawnApple();\n}\n\nfunction spawnApple() {\n  let pos;\n  do {\n    pos = {x: Math.floor(Math.random()*COLS), y: Math.floor(Math.random()*ROWS)};\n  } while (snake.some(s => s.x===pos.x && s.y===pos.y));\n  apple = pos;\n}\n\nfunction tick() {\n  if(paused) return;\n  frame++;\n  dir = {...nextDir};\n  const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};\n  head.x = (head.x + COLS) % COLS;\n  head.y = (head.y + ROWS) % ROWS;\n  \n  if (snake.some(s => s.x===head.x && s.y===head.y)) { endGame(); return; }\n  \n  snake.unshift(head);\n  \n  if (head.x === apple.x && head.y === apple.y) {\n    score += 10;\n    coins += 2;\n    if (score > best) best = score;\n    document.getElementById('scoreEl').textContent = score;\n    document.getElementById('bestEl').textContent = best;\n    document.getElementById('coinEl').textContent = coins;\n    saveData();\n    playSound('eat');\n    for (let i=0;i<14;i++) spawnParticle(apple.x*CELL+CELL/2, apple.y*CELL+CELL/2);\n    spawnApple();\n    const lvl = Math.floor(score/50)+1;\n    document.getElementById('lvlEl').textContent = lvl;\n    const newSpeed = Math.max(60, selectedSpeed - (lvl-1)*12);\n    if (newSpeed !== currentSpeed) {\n      currentSpeed = newSpeed;\n      clearInterval(gameLoopInterval);\n      gameLoopInterval = setInterval(tick, currentSpeed);\n    }\n  } else {\n    snake.pop();\n  }\n  draw();\n}\n\nfunction endGame() {\n  running = false;\n  clearInterval(gameLoopInterval);\n  playSound('die');\n  document.getElementById('finalScore').textContent = score;\n  document.getElementById('gameOver').classList.remove('hidden');\n  saveData();\n}\n\nfunction startGame() {\n  playSound('click');\n  init();\n  document.getElementById('mainMenu').classList.add('hidden');\n  document.getElementById('gameOver').classList.add('hidden');\n  document.getElementById('pauseMenu').classList.add('hidden');\n  document.getElementById('shopMenu').classList.add('hidden');\n  document.getElementById('themeMenu').classList.add('hidden');\n  running = true;\n  paused = false;\n  clearInterval(gameLoopInterval);\n  gameLoopInterval = setInterval(tick, currentSpeed);\n  draw();\n}\n\nfunction goToMainMenu() {\n  playSound('click');\n  running = false;\n  paused = false;\n  clearInterval(gameLoopInterval);\n  document.getElementById('mainMenu').classList.remove('hidden');\n  document.getElementById('gameOver').classList.add('hidden');\n  document.getElementById('pauseMenu').classList.add('hidden');\n  document.getElementById('shopMenu').classList.add('hidden');\n  document.getElementById('themeMenu').classList.add('hidden');\n  init();\n  draw();\n}\n\nfunction togglePause() {\n  if(!running) return;\n  playSound('click');\n  paused = !paused;\n  document.getElementById('pauseMenu').classList.toggle('hidden', !paused);\n}\n\n// ======================================================================\n// PARTICLES\n// ======================================================================\nfunction spawnParticle(x, y) {\n  const a = Math.random() * Math.PI * 2;\n  const s = 2 + Math.random() * 4;\n  particles.push({ x, y, vx: Math.cos(a)*s, vy: Math.sin(a)*s, life:1, r: 2+Math.random()*3 });\n}\n\n// ======================================================================\n// DRAW\n// ======================================================================\nfunction getSkinColor(part) {\n  const skin = SKINS.find(s => s.id === activeSkin) || SKINS[0];\n  if(part === 'head') return skin.color;\n  return skin.color2 || skin.color;\n}\n\nfunction draw() {\n  const bgColor = getComputedStyle(document.body).getPropertyValue('--bg').trim() || '#0d0d0d';\n  ctx.fillStyle = bgColor;\n  ctx.fillRect(0,0,W,H);\n\n  const borderColor = getComputedStyle(document.body).getPropertyValue('--border').trim() || 'rgba(57,255,20,0.03)';\n  ctx.strokeStyle = borderColor;\n  ctx.lineWidth = 1;\n  for (let x=0;x<COLS;x++) { ctx.beginPath(); ctx.moveTo(x*CELL,0); ctx.lineTo(x*CELL,H); ctx.stroke(); }\n  for (let y=0;y<ROWS;y++) { ctx.beginPath(); ctx.moveTo(0,y*CELL); ctx.lineTo(W,y*CELL); ctx.stroke(); }\n\n  for (let i=particles.length-1;i>=0;i--) {\n    const p=particles[i];\n    p.x+=p.vx; p.y+=p.vy; p.vy+=.12; p.life-=.04;\n    if(p.life<=0){particles.splice(i,1);continue;}\n    ctx.save();\n    ctx.globalAlpha=p.life;\n    ctx.beginPath(); ctx.arc(p.x,p.y,p.r*p.life,0,Math.PI*2);\n    ctx.fillStyle='#ff2d55'; ctx.shadowColor='#ff2d55'; ctx.shadowBlur=8;\n    ctx.fill(); ctx.restore();\n  }\n\n  const ax = apple.x*CELL, ay = apple.y*CELL;\n  const pulse = .85 + .15*Math.sin(frame*0.18);\n  ctx.save();\n  ctx.shadowColor='#ff2d55'; ctx.shadowBlur=18*pulse;\n  ctx.fillStyle='#ff2d55';\n  ctx.beginPath();\n  const r = CELL*.36*pulse;\n  ctx.arc(ax+CELL/2, ay+CELL/2+2, r, 0, Math.PI*2);\n  ctx.fill();\n  ctx.fillStyle='rgba(255,255,255,0.3)';\n  ctx.beginPath(); ctx.arc(ax+CELL/2-r*.3, ay+CELL/2-r*.2, r*.3, 0, Math.PI*2); ctx.fill();\n  ctx.strokeStyle='#7aff00'; ctx.lineWidth=1.5;\n  ctx.beginPath(); ctx.moveTo(ax+CELL/2, ay+CELL/2-r+1); ctx.quadraticCurveTo(ax+CELL/2+5, ay+2, ax+CELL/2+3, ay+4); ctx.stroke();\n  ctx.restore();\n\n  const headColor = getSkinColor('head');\n  const bodyColor = getSkinColor('body');\n  snake.forEach((seg, i) => {\n    const sx=seg.x*CELL, sy=seg.y*CELL;\n    const isHead = i===0;\n    ctx.save();\n    if(isHead) {\n      ctx.shadowColor=headColor; ctx.shadowBlur=18;\n      ctx.fillStyle=headColor;\n    } else {\n      ctx.shadowColor=bodyColor; ctx.shadowBlur=6;\n      ctx.fillStyle=bodyColor;\n    }\n    const pad = isHead?1:2;\n    const rad = isHead?4:3;\n    roundRect(ctx, sx+pad, sy+pad, CELL-pad*2, CELL-pad*2, rad);\n    ctx.fill();\n    if(isHead) {\n      ctx.fillStyle='#000'; ctx.shadowBlur=0;\n      const ex = dir.y===0 ? (dir.x>0 ? sx+CELL*.7 : sx+CELL*.3) : sx+CELL*.35;\n      const ey = dir.x===0 ? (dir.y>0 ? sy+CELL*.7 : sy+CELL*.3) : sy+CELL*.35;\n      const ex2 = dir.y===0 ? ex : sx+CELL*.65;\n      const ey2 = dir.x===0 ? ey : sy+CELL*.65;\n      ctx.beginPath(); ctx.arc(ex,ey,2,0,Math.PI*2); ctx.fill();\n      ctx.beginPath(); ctx.arc(ex2,ey2,2,0,Math.PI*2); ctx.fill();\n      ctx.fillStyle='#fff';\n      ctx.beginPath(); ctx.arc(ex+.5,ey-.5,1,0,Math.PI*2); ctx.fill();\n      ctx.beginPath(); ctx.arc(ex2+.5,ey2-.5,1,0,Math.PI*2); ctx.fill();\n    }\n    ctx.restore();\n  });\n}\n\nfunction roundRect(ctx, x,y,w,h,r) {\n  ctx.beginPath();\n  ctx.moveTo(x+r,y);\n  ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);\n  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);\n  ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);\n  ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y);\n  ctx.closePath();\n}\n\n// ======================================================================\n// SHOP (فروشگاه مارها)\n// ======================================================================\nfunction renderShop() {\n  const grid = document.getElementById('shopGridSkins');\n  grid.innerHTML = '';\n  \n  SKINS.forEach(skin => {\n    const div = document.createElement('div');\n    div.className = 'shop-item';\n    if(skin.special) div.classList.add('special');\n    if(ownedSkins.includes(skin.id)) div.classList.add('owned');\n    if(activeSkin === skin.id) div.classList.add('active-skin');\n    \n    let colorDiv = `<div class=\"si-color\" style=\"background:${skin.color};\"></div>`;\n    if(skin.special) {\n      colorDiv = `<div class=\"si-color special-glow\" style=\"background:${skin.color}; box-shadow: 0 0 20px ${skin.color};\"></div>`;\n    }\n    \n    div.innerHTML = `\n      ${colorDiv}\n      <div class=\"si-name\">${skin.name}</div>\n      ${ownedSkins.includes(skin.id) \n        ? (activeSkin === skin.id ? '<div class=\"si-badge\">✓ استفاده</div>' : '<div class=\"si-badge\">استفاده</div>')\n        : `<div class=\"si-price\">🪙 ${skin.price}</div>`\n      }\n    `;\n    div.addEventListener('click', () => shopActionSkin(skin));\n    grid.appendChild(div);\n  });\n  \n  document.getElementById('shopCoin').textContent = coins;\n}\n\nfunction shopActionSkin(skin) {\n  playSound('click');\n  if(activeSkin === skin.id) return;\n  \n  if(ownedSkins.includes(skin.id)) {\n    activeSkin = skin.id;\n    saveData();\n    renderShop();\n    return;\n  }\n  \n  if(coins >= skin.price) {\n    coins -= skin.price;\n    ownedSkins.push(skin.id);\n    activeSkin = skin.id;\n    document.getElementById('coinEl').textContent = coins;\n    saveData();\n    renderShop();\n  } else {\n    alert('سکه کافی نیست! 🪙');\n  }\n}\n\nfunction openShop() {\n  playSound('click');\n  document.getElementById('shopMenu').classList.remove('hidden');\n  renderShop();\n}\n\nfunction closeShop() {\n  playSound('click');\n  document.getElementById('shopMenu').classList.add('hidden');\n}\n\n// ======================================================================\n// THEMES (صفحه تم‌ها)\n// ======================================================================\nfunction renderThemes() {\n  const grid = document.getElementById('themeGrid');\n  grid.innerHTML = '';\n  \n  THEMES.forEach(theme => {\n    const div = document.createElement('div');\n    div.className = 'theme-item';\n    if(ownedThemes.includes(theme.id)) div.classList.add('owned');\n    if(activeTheme === theme.id) div.classList.add('active-theme');\n    \n    div.innerHTML = `\n      <span class=\"ti-emoji\">${theme.emoji}</span>\n      <div class=\"ti-name\">${theme.name}</div>\n      ${ownedThemes.includes(theme.id) \n        ? (activeTheme === theme.id ? '<div class=\"ti-badge\">✓ استفاده</div>' : '<div class=\"ti-badge\">استفاده</div>')\n        : `<div class=\"ti-price\">🪙 ${theme.price}</div>`\n      }\n    `;\n    div.addEventListener('click', () => shopActionTheme(theme));\n    grid.appendChild(div);\n  });\n  \n  document.getElementById('themeCoin').textContent = coins;\n}\n\nfunction shopActionTheme(theme) {\n  playSound('click');\n  if(activeTheme === theme.id) return;\n  \n  if(ownedThemes.includes(theme.id)) {\n    activeTheme = theme.id;\n    applyTheme(theme.id);\n    saveData();\n    renderThemes();\n    return;\n  }\n  \n  if(coins >= theme.price) {\n    coins -= theme.price;\n    ownedThemes.push(theme.id);\n    activeTheme = theme.id;\n    document.getElementById('coinEl').textContent = coins;\n    applyTheme(theme.id);\n    saveData();\n    renderThemes();\n  } else {\n    alert('سکه کافی نیست! 🪙');\n  }\n}\n\nfunction openThemes() {\n  playSound('click');\n  document.getElementById('themeMenu').classList.remove('hidden');\n  renderThemes();\n}\n\nfunction closeThemes() {\n  playSound('click');\n  document.getElementById('themeMenu').classList.add('hidden');\n}\n\n// ======================================================================\n// CONTROLS\n// ======================================================================\nfunction setDir(dx, dy) {\n  if(!running || paused) return;\n  if((dx===0 && dir.y!==dy*-1) || (dx!==0 && dir.x!==dx*-1)) {\n    if(dx!==0) nextDir={x:dx,y:0};\n    else nextDir={x:0,y:dy};\n  }\n}\n\ndocument.addEventListener('keydown', e => {\n  if(e.key === ' ' || e.key === 'Escape') {\n    e.preventDefault();\n    if(!document.getElementById('shopMenu').classList.contains('hidden')) {\n      closeShop();\n      return;\n    }\n    if(!document.getElementById('themeMenu').classList.contains('hidden')) {\n      closeThemes();\n      return;\n    }\n    if(!document.getElementById('pauseMenu').classList.contains('hidden')) {\n      togglePause();\n      return;\n    }\n    if(running) {\n      togglePause();\n    }\n  }\n  if(!running || paused) return;\n  if(e.key==='ArrowUp' && dir.y!==1) { e.preventDefault(); nextDir={x:0,y:-1}; }\n  else if(e.key==='ArrowDown' && dir.y!==-1) { e.preventDefault(); nextDir={x:0,y:1}; }\n  else if(e.key==='ArrowLeft' && dir.x!==-1) { e.preventDefault(); nextDir={x:1,y:0}; }\n  else if(e.key==='ArrowRight' && dir.x!==1) { e.preventDefault(); nextDir={x:-1,y:0}; }\n});\n\n['Up','Down','Left','Right'].forEach(dir => {\n  const el = document.getElementById('dp' + dir);\n  const map = {Up:[0,-1], Down:[0,1], Left:[1,0], Right:[-1,0]};\n  el.addEventListener('touchstart', e=>{e.preventDefault(); setDir(map[dir][0], map[dir][1]);}, {passive:false});\n  el.addEventListener('click', ()=>setDir(map[dir][0], map[dir][1]));\n});\n\nlet tx=0, ty=0;\ncanvas.addEventListener('touchstart', e=>{tx=e.touches[0].clientX; ty=e.touches[0].clientY;}, {passive:true});\ncanvas.addEventListener('touchend', e=>{\n  const dx=e.changedTouches[0].clientX-tx, dy=e.changedTouches[0].clientY-ty;\n  if(Math.abs(dx)<20 && Math.abs(dy)<20) return;\n  if(Math.abs(dx)>Math.abs(dy)) setDir(dx>0?1:-1, 0);\n  else setDir(0, dy>0?1:-1);\n}, {passive:true});\n\n// ======================================================================\n// BUTTONS\n// ======================================================================\ndocument.getElementById('startBtn').addEventListener('click', startGame);\ndocument.getElementById('restartBtn').addEventListener('click', startGame);\ndocument.getElementById('resumeBtn').addEventListener('click', togglePause);\ndocument.getElementById('pauseBtn').addEventListener('click', togglePause);\ndocument.getElementById('closeShopBtn').addEventListener('click', closeShop);\ndocument.getElementById('closeThemeBtn').addEventListener('click', closeThemes);\ndocument.getElementById('shopBtnFromMenu').addEventListener('click', openShop);\ndocument.getElementById('themeBtnFromMenu').addEventListener('click', openThemes);\ndocument.getElementById('menuBtn').addEventListener('click', goToMainMenu);\ndocument.getElementById('exitBtn').addEventListener('click', goToMainMenu);\n\n// ======================================================================\n// INIT\n// ======================================================================\napplyTheme(activeTheme);\ninit();\ndraw();\nconsole.log('🐍 بازی مار آماده است!');\nconsole.log('🎨 تم‌ها و فروشگاه جدا شدند!');\nconsole.log('✕ دکمه خروج بالا راست در هر دو صفحه!');\n<\\/script>\n</body>\n</html>", "rps": "<!DOCTYPE html>\n<html lang=\"fa\" dir=\"rtl\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\">\n<title>سنگ کاغذ قیچی</title>\n<style>\n@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;600;700;900&display=swap');\n\n* { margin:0; padding:0; box-sizing:border-box; }\n\n:root {\n  --bg:    #0c0c14;\n  --card:  #13131f;\n  --line:  rgba(255,255,255,0.07);\n  --txt:   #f0f0f8;\n  --dim:   rgba(240,240,248,0.35);\n  --rock:  #ff6b35;\n  --paper: #4cc9f0;\n  --sci:   #c77dff;\n  --win:   #06d6a0;\n  --lose:  #ff2d55;\n  --tie:   #ffd60a;\n}\n\nbody {\n  font-family: 'Vazirmatn', sans-serif;\n  background: var(--bg);\n  color: var(--txt);\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  overflow-x: hidden;\n  padding-bottom: 20px;\n}\n\n/* ── CHANNEL ── */\n.channel {\n  width: 100%;\n  text-align: center;\n  padding: 10px 0 8px;\n  font-size: 12px;\n  font-weight: 600;\n  color: rgba(255,255,255,0.28);\n  letter-spacing: 1.5px;\n  border-bottom: 1px solid var(--line);\n}\n\n/* ── TITLE ── */\n.title-wrap {\n  margin: 20px 0 6px;\n  text-align: center;\n}\n.title-wrap h1 {\n  font-size: 28px;\n  font-weight: 900;\n  letter-spacing: 1px;\n  background: linear-gradient(135deg, var(--rock), var(--paper), var(--sci));\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n.title-wrap p {\n  font-size: 11px;\n  color: var(--dim);\n  letter-spacing: 2px;\n  margin-top: 3px;\n}\n\n/* ── MODE SELECT ── */\n.mode-wrap {\n  display: flex;\n  gap: 8px;\n  margin: 14px 0 0;\n  padding: 0 20px;\n}\n.mode-btn {\n  flex: 1;\n  padding: 10px 0;\n  background: rgba(255,255,255,0.04);\n  border: 1.5px solid rgba(255,255,255,0.1);\n  border-radius: 10px;\n  color: var(--dim);\n  font-family: 'Vazirmatn', sans-serif;\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all .2s;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2px;\n}\n.mode-btn .mode-num {\n  font-size: 22px;\n  font-weight: 900;\n  color: rgba(255,255,255,0.15);\n  transition: all .2s;\n}\n.mode-btn:hover {\n  background: rgba(255,255,255,0.07);\n  border-color: rgba(255,255,255,0.25);\n}\n.mode-btn.active {\n  border-color: var(--paper);\n  background: rgba(76,201,240,0.08);\n  color: var(--txt);\n  box-shadow: 0 0 20px rgba(76,201,240,0.12);\n}\n.mode-btn.active .mode-num {\n  color: var(--paper);\n  text-shadow: 0 0 14px rgba(76,201,240,0.6);\n}\n\n/* ── SCOREBOARD ── */\n.scoreboard {\n  width: calc(100% - 40px);\n  max-width: 420px;\n  margin: 16px 0 0;\n  display: flex;\n  align-items: center;\n  gap: 0;\n  background: var(--card);\n  border: 1px solid var(--line);\n  border-radius: 16px;\n  overflow: hidden;\n}\n\n.score-side {\n  flex: 1;\n  padding: 14px 12px;\n  text-align: center;\n}\n.score-side.you { border-left: 1px solid var(--line); }\n\n.score-who {\n  font-size: 10px;\n  color: var(--dim);\n  letter-spacing: 2px;\n  margin-bottom: 4px;\n}\n.score-num {\n  font-size: 42px;\n  font-weight: 900;\n  line-height: 1;\n  transition: transform .1s;\n}\n.score-num.pop { animation: numPop .2s ease; }\n@keyframes numPop { 50%{transform:scale(1.35)} }\n\n.score-you  .score-num { color: var(--paper); text-shadow: 0 0 20px rgba(76,201,240,0.4); }\n.score-ai   .score-num { color: var(--rock);  text-shadow: 0 0 20px rgba(255,107,53,0.4); }\n\n.score-divider {\n  width: 60px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  padding: 10px 0;\n}\n\n/* pips */\n.pips {\n  display: flex;\n  gap: 4px;\n  justify-content: center;\n}\n.pip {\n  width: 8px; height: 8px;\n  border-radius: 50%;\n  background: rgba(255,255,255,0.08);\n  border: 1px solid rgba(255,255,255,0.12);\n  transition: all .3s;\n}\n.pip.you-win  { background: var(--paper); border-color: var(--paper); box-shadow: 0 0 8px var(--paper); }\n.pip.ai-win   { background: var(--rock);  border-color: var(--rock);  box-shadow: 0 0 8px var(--rock); }\n\n.target-label {\n  font-size: 10px;\n  color: var(--dim);\n  letter-spacing: 1px;\n}\n.target-num {\n  font-size: 18px;\n  font-weight: 900;\n  color: rgba(255,255,255,0.2);\n  line-height: 1;\n}\n\n/* ── BATTLE AREA ── */\n.battle {\n  width: calc(100% - 40px);\n  max-width: 420px;\n  margin: 14px 0 0;\n  background: var(--card);\n  border: 1px solid var(--line);\n  border-radius: 16px;\n  padding: 20px 16px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  min-height: 130px;\n  position: relative;\n  overflow: hidden;\n}\n\n.battle::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 70%);\n  pointer-events: none;\n}\n\n.fighter {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n}\n\n.fighter-label {\n  font-size: 10px;\n  color: var(--dim);\n  letter-spacing: 2px;\n}\n\n.fighter-emoji {\n  font-size: 52px;\n  line-height: 1;\n  transition: transform .15s;\n  filter: drop-shadow(0 0 0px transparent);\n}\n.fighter-emoji.you-glow  { filter: drop-shadow(0 0 16px var(--paper)); }\n.fighter-emoji.ai-glow   { filter: drop-shadow(0 0 16px var(--rock)); }\n.fighter-emoji.shake     { animation: shake .3s ease; }\n@keyframes shake { 25%{transform:rotate(-10deg) scale(1.1)} 75%{transform:rotate(10deg) scale(1.1)} 100%{transform:rotate(0) scale(1)} }\n\n.vs-badge {\n  width: 36px; height: 36px;\n  border-radius: 50%;\n  background: rgba(255,255,255,0.05);\n  border: 1px solid rgba(255,255,255,0.1);\n  display: flex; align-items:center; justify-content:center;\n  font-size: 12px; font-weight: 900;\n  color: var(--dim);\n  flex-shrink: 0;\n}\n\n/* result ribbon */\n.result-ribbon {\n  position: absolute;\n  bottom: 0; left: 0; right: 0;\n  text-align: center;\n  padding: 6px;\n  font-size: 13px;\n  font-weight: 700;\n  letter-spacing: 1px;\n  opacity: 0;\n  transition: opacity .3s;\n}\n.result-ribbon.show { opacity: 1; }\n.result-ribbon.win  { color: var(--win);  background: rgba(6,214,160,0.1); }\n.result-ribbon.lose { color: var(--lose); background: rgba(255,45,85,0.1); }\n.result-ribbon.tie  { color: var(--tie);  background: rgba(255,214,10,0.1); }\n\n/* ── CHOICES ── */\n.choices {\n  width: calc(100% - 40px);\n  max-width: 420px;\n  margin: 12px 0 0;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}\n\n.choice-btn {\n  background: var(--card);\n  border: 1.5px solid rgba(255,255,255,0.08);\n  border-radius: 14px;\n  padding: 16px 8px 12px;\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n  transition: all .18s;\n  -webkit-tap-highlight-color: transparent;\n}\n.choice-btn:hover { transform: translateY(-3px); }\n.choice-btn:active { transform: scale(.93); }\n\n.choice-btn.rock  { border-color: rgba(255,107,53,0.25); }\n.choice-btn.paper { border-color: rgba(76,201,240,0.25); }\n.choice-btn.sci   { border-color: rgba(199,125,255,0.25); }\n\n.choice-btn.rock:hover  { border-color: var(--rock);  background: rgba(255,107,53,0.08);  box-shadow: 0 8px 24px rgba(255,107,53,0.15); }\n.choice-btn.paper:hover { border-color: var(--paper); background: rgba(76,201,240,0.08); box-shadow: 0 8px 24px rgba(76,201,240,0.15); }\n.choice-btn.sci:hover   { border-color: var(--sci);   background: rgba(199,125,255,0.08); box-shadow: 0 8px 24px rgba(199,125,255,0.15); }\n\n.choice-btn.rock.selected  { border-color: var(--rock);  background: rgba(255,107,53,0.12);  box-shadow: 0 0 28px rgba(255,107,53,0.2); }\n.choice-btn.paper.selected { border-color: var(--paper); background: rgba(76,201,240,0.12); box-shadow: 0 0 28px rgba(76,201,240,0.2); }\n.choice-btn.sci.selected   { border-color: var(--sci);   background: rgba(199,125,255,0.12); box-shadow: 0 0 28px rgba(199,125,255,0.2); }\n\n.choice-btn:disabled { cursor: default; opacity: .5; pointer-events: none; }\n\n.choice-emoji { font-size: 34px; }\n.choice-label { font-size: 12px; font-weight: 600; color: var(--dim); }\n\n/* ── WIN OVERLAY ── */\n.win-overlay {\n  position: fixed; inset: 0;\n  background: rgba(7,7,20,.95);\n  backdrop-filter: blur(10px);\n  display: flex; flex-direction: column;\n  align-items: center; justify-content: center;\n  gap: 14px; z-index: 50;\n  animation: fadeIn .4s ease;\n}\n.win-overlay.hidden { display: none; }\n@keyframes fadeIn { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }\n\n.win-icon { font-size: 70px; }\n.win-title { font-size: 32px; font-weight: 900; }\n.win-title.you-win  { color: var(--paper); text-shadow: 0 0 30px rgba(76,201,240,.5); }\n.win-title.ai-win   { color: var(--rock);  text-shadow: 0 0 30px rgba(255,107,53,.5); }\n.win-sub { font-size: 13px; color: var(--dim); text-align: center; line-height: 1.8; }\n\n.win-stats {\n  display: flex; gap: 20px;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid var(--line);\n  border-radius: 12px;\n  padding: 14px 24px;\n}\n.win-stat { text-align: center; }\n.win-stat-num { font-size: 26px; font-weight: 900; color: var(--txt); }\n.win-stat-label { font-size: 10px; color: var(--dim); letter-spacing: 1px; }\n\n.play-again-btn {\n  margin-top: 4px;\n  padding: 14px 52px;\n  background: transparent;\n  border: 1.5px solid rgba(255,255,255,0.2);\n  border-radius: 50px;\n  color: var(--txt);\n  font-family: 'Vazirmatn', sans-serif;\n  font-size: 16px; font-weight: 700;\n  cursor: pointer; transition: all .18s;\n  letter-spacing: 1px;\n}\n.play-again-btn:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.5); transform: scale(1.04); }\n\n/* ── FOOTER ── */\n.footer {\n  margin-top: auto;\n  padding: 18px 0 4px;\n  font-size: 11px;\n  color: rgba(255,255,255,0.15);\n  letter-spacing: 1px;\n}\n\n/* ── THINKING ── */\n.thinking-dots span {\n  display: inline-block;\n  animation: dot .9s infinite;\n  font-size: 20px;\n}\n.thinking-dots span:nth-child(2) { animation-delay: .2s; }\n.thinking-dots span:nth-child(3) { animation-delay: .4s; }\n@keyframes dot { 0%,80%,100%{transform:scale(.4);opacity:.3} 40%{transform:scale(1);opacity:1} }\n</style>\n</head>\n<body style=\"user-select:none;-webkit-user-select:none\">\n\n\n\n<div class=\"title-wrap\">\n  <h1>سنگ کاغذ قیچی</h1>\n  <p>اول به چند برد می‌خوای بازی کنی؟</p>\n</div>\n\n<!-- Mode select -->\n<div class=\"mode-wrap\" id=\"modeWrap\">\n  <button class=\"mode-btn active\" onclick=\"setMode(3)\" data-mode=\"3\">\n    <span class=\"mode-num\">3</span>\n    <span>برد</span>\n  </button>\n  <button class=\"mode-btn\" onclick=\"setMode(5)\" data-mode=\"5\">\n    <span class=\"mode-num\">5</span>\n    <span>برد</span>\n  </button>\n  <button class=\"mode-btn\" onclick=\"setMode(10)\" data-mode=\"10\">\n    <span class=\"mode-num\">10</span>\n    <span>برد</span>\n  </button>\n</div>\n\n<!-- Scoreboard -->\n<div class=\"scoreboard\">\n  <div class=\"score-side score-you\">\n    <div class=\"score-who\">تو</div>\n    <div class=\"score-num\" id=\"youScore\">0</div>\n  </div>\n  <div class=\"score-divider\">\n    <div class=\"pips\" id=\"pips\"></div>\n    <div class=\"target-num\" id=\"targetNum\">3</div>\n    <div class=\"target-label\">هدف</div>\n  </div>\n  <div class=\"score-side score-ai\">\n    <div class=\"score-who\">کامپیوتر</div>\n    <div class=\"score-num\" id=\"aiScore\">0</div>\n  </div>\n</div>\n\n<!-- Battle -->\n<div class=\"battle\" id=\"battleArea\">\n  <div class=\"fighter\">\n    <div class=\"fighter-label\">تو</div>\n    <div class=\"fighter-emoji\" id=\"youEmoji\">🤔</div>\n  </div>\n  <div class=\"vs-badge\">VS</div>\n  <div class=\"fighter\">\n    <div class=\"fighter-label\">کامپیوتر</div>\n    <div class=\"fighter-emoji\" id=\"aiEmoji\" style=\"transform:scaleX(-1)\">🤖</div>\n  </div>\n  <div class=\"result-ribbon\" id=\"resultRibbon\"></div>\n</div>\n\n<!-- Choices -->\n<div class=\"choices\">\n  <button class=\"choice-btn rock\" onclick=\"play('rock')\">\n    <span class=\"choice-emoji\">🪨</span>\n    <span class=\"choice-label\">سنگ</span>\n  </button>\n  <button class=\"choice-btn paper\" onclick=\"play('paper')\">\n    <span class=\"choice-emoji\">📄</span>\n    <span class=\"choice-label\">کاغذ</span>\n  </button>\n  <button class=\"choice-btn sci\" onclick=\"play('scissors')\">\n    <span class=\"choice-emoji\">✂️</span>\n    <span class=\"choice-label\">قیچی</span>\n  </button>\n</div>\n\n<!-- Win Overlay -->\n<div class=\"win-overlay hidden\" id=\"winOverlay\">\n  <div class=\"win-icon\" id=\"winIcon\">🏆</div>\n  <div class=\"win-title\" id=\"winTitle\">بردی!</div>\n  <div class=\"win-sub\" id=\"winSub\">عالی بازی کردی!</div>\n  <div class=\"win-stats\">\n    <div class=\"win-stat\">\n      <div class=\"win-stat-num\" id=\"statYou\">0</div>\n      <div class=\"win-stat-label\">برد تو</div>\n    </div>\n    <div class=\"win-stat\">\n      <div class=\"win-stat-num\" id=\"statAi\">0</div>\n      <div class=\"win-stat-label\">برد AI</div>\n    </div>\n    <div class=\"win-stat\">\n      <div class=\"win-stat-num\" id=\"statTie\">0</div>\n      <div class=\"win-stat-label\">مساوی</div>\n    </div>\n  </div>\n  <button class=\"play-again-btn\" onclick=\"resetGame()\">دوباره بازی 🔄</button>\n</div>\n\n\n\n<script>\nconst EMOJIS   = { rock:'🪨', paper:'📄', scissors:'✂️' };\nconst NAMES    = { rock:'سنگ', paper:'کاغذ', scissors:'قیچی' };\nconst AI_ICONS = { rock:'🪨', paper:'📄', scissors:'✂️' };\n\n// wins[a] beats b\nconst BEATS = { rock:'scissors', scissors:'paper', paper:'rock' };\n\nlet target = 3, youWins = 0, aiWins = 0, ties = 0, rounds = 0;\nlet locked = false;\n\nfunction setMode(n) {\n  target = n;\n  document.querySelectorAll('.mode-btn').forEach(b => {\n    b.classList.toggle('active', +b.dataset.mode === n);\n  });\n  document.getElementById('targetNum').textContent = n;\n  resetGame(false);\n}\n\nfunction buildPips() {\n  const wrap = document.getElementById('pips');\n  wrap.innerHTML = '';\n  for (let i = 0; i < target; i++) {\n    const d = document.createElement('div');\n    d.className = 'pip';\n    d.id = 'pip_' + i;\n    wrap.appendChild(d);\n  }\n}\n\nfunction updatePips() {\n  for (let i = 0; i < target; i++) {\n    const p = document.getElementById('pip_' + i);\n    if (!p) continue;\n    p.className = 'pip';\n    if (i < youWins) p.classList.add('you-win');\n    else if (i < aiWins) p.classList.add('ai-win');\n  }\n}\n\nfunction play(choice) {\n  if (locked) return;\n  locked = true;\n\n  // disable buttons\n  document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);\n  document.querySelector('.choice-btn.' + (choice === 'scissors' ? 'sci' : choice))?.classList.add('selected');\n\n  // show thinking\n  document.getElementById('youEmoji').textContent   = EMOJIS[choice];\n  document.getElementById('youEmoji').className     = 'fighter-emoji shake';\n  document.getElementById('aiEmoji').textContent    = '🤔';\n  document.getElementById('aiEmoji').style.transform = 'scaleX(-1)';\n\n  setTimeout(() => {\n    const aiChoice = ['rock','paper','scissors'][Math.floor(Math.random()*3)];\n    const ribbon   = document.getElementById('resultRibbon');\n    rounds++;\n\n    let result, msg, ribbonClass;\n    if (choice === aiChoice) {\n      result = 'tie'; ties++;\n      msg = '🤝 مساوی — ادامه بده!';\n      ribbonClass = 'tie';\n    } else if (BEATS[choice] === aiChoice) {\n      result = 'win'; youWins++;\n      msg = '✅ بردی!';\n      ribbonClass = 'win';\n      // animate score\n      const el = document.getElementById('youScore');\n      el.textContent = youWins;\n      el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');\n    } else {\n      result = 'lose'; aiWins++;\n      msg = '❌ باختی!';\n      ribbonClass = 'lose';\n      const el = document.getElementById('aiScore');\n      el.textContent = aiWins;\n      el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');\n    }\n\n    document.getElementById('aiEmoji').textContent  = EMOJIS[aiChoice];\n    document.getElementById('aiEmoji').className    = 'fighter-emoji shake';\n    document.getElementById('youEmoji').className   = 'fighter-emoji ' + (result === 'win' ? 'you-glow' : result === 'lose' ? '' : '');\n    if (result === 'win')  document.getElementById('youEmoji').classList.add('you-glow');\n    if (result === 'lose') document.getElementById('aiEmoji').classList.add('ai-glow');\n\n    ribbon.textContent = msg;\n    ribbon.className   = 'result-ribbon show ' + ribbonClass;\n    updatePips();\n\n    // check game end\n    if (youWins >= target || aiWins >= target) {\n      setTimeout(() => showWinner(), 900);\n      return;\n    }\n\n    // re-enable after delay\n    setTimeout(() => {\n      ribbon.classList.remove('show');\n      document.querySelectorAll('.choice-btn').forEach(b => { b.disabled = false; });\n      document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));\n      document.getElementById('youEmoji').textContent = '🤔';\n      document.getElementById('youEmoji').className  = 'fighter-emoji';\n      document.getElementById('aiEmoji').textContent  = '🤖';\n      document.getElementById('aiEmoji').className   = 'fighter-emoji';\n      locked = false;\n    }, 1200);\n\n  }, 600);\n}\n\nfunction showWinner() {\n  const youWon = youWins >= target;\n  document.getElementById('winIcon').textContent  = youWon ? '🏆' : '🤖';\n  document.getElementById('winTitle').textContent = youWon ? 'بردی! 🎉' : 'باختی! 😅';\n  document.getElementById('winTitle').className   = 'win-title ' + (youWon ? 'you-win' : 'ai-win');\n  document.getElementById('winSub').textContent   = youWon ? 'عالی بازی کردی! کامپیوتر رو شکست دادی 💪' : 'کامپیوتر برد! دوباره امتحان کن 🔄';\n  document.getElementById('statYou').textContent  = youWins;\n  document.getElementById('statAi').textContent   = aiWins;\n  document.getElementById('statTie').textContent  = ties;\n  document.getElementById('winOverlay').classList.remove('hidden');\n}\n\nfunction resetGame(showStart = true) {\n  youWins = 0; aiWins = 0; ties = 0; rounds = 0; locked = false;\n  document.getElementById('youScore').textContent = '0';\n  document.getElementById('aiScore').textContent  = '0';\n  document.getElementById('youEmoji').textContent = '🤔';\n  document.getElementById('youEmoji').className   = 'fighter-emoji';\n  document.getElementById('aiEmoji').textContent  = '🤖';\n  document.getElementById('aiEmoji').className    = 'fighter-emoji';\n  document.getElementById('resultRibbon').className = 'result-ribbon';\n  document.getElementById('winOverlay').classList.add('hidden');\n  document.querySelectorAll('.choice-btn').forEach(b => { b.disabled = false; b.classList.remove('selected'); });\n  buildPips();\n}\n\n// init\nbuildPips();\n<\\/script>\n</body>\n</html>\n", "fruit": "<!DOCTYPE html>\n<html lang=\"fa\"><head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\">\n<style>\n@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700&display=swap');\n*{box-sizing:border-box;margin:0;padding:0}\nbody{font-family:'Vazirmatn',sans-serif;background:#0a0008;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:8px;direction:rtl;overflow:hidden;user-select:none}\n.wrap{width:100%;max-width:440px}\n.topbar{display:flex;justify-content:space-between;align-items:center;padding:4px 2px 6px}\n.st{text-align:center}\n.sn{font-size:18px;font-weight:700;color:#fff}\n.sl{font-size:9px;color:#3a2030;margin-top:1px}\n.sn.rd{color:#f87171}.sn.yl{color:#fbbf24}.sn.wh{color:#e2e8f0}.sn.or{color:#f97316}.sn.cy{color:#67e8f9}\ncanvas{display:block;width:100%;border-radius:16px;touch-action:none;cursor:crosshair}\n</style></head><body style=\"user-select:none;-webkit-user-select:none\">\n<div class=\"wrap\">\n  <div class=\"topbar\">\n    <div class=\"st\"><div class=\"sn yl\" id=\"sScore\">0</div><div class=\"sl\">امتیاز</div></div>\n    <div class=\"st\">\n      <div style=\"font-size:12px;color:#f97316;font-weight:700\">🍉 میوه‌برش ۲</div>\n      \n    </div>\n    <div class=\"st\" style=\"display:flex;gap:8px;align-items:flex-start\">\n      <div class=\"st\"><div class=\"sn rd\" id=\"sLives\">❤❤❤</div><div class=\"sl\">جان</div></div>\n      <div class=\"st\"><div class=\"sn cy\" id=\"sTime\">60</div><div class=\"sl\">ثانیه</div></div>\n      <div class=\"st\"><div class=\"sn wh\" id=\"sRec\">0</div><div class=\"sl\">رکورد</div></div>\n    </div>\n  </div>\n  <canvas id=\"c\"></canvas>\n</div>\n<script>\nconst canvas=document.getElementById('c');\nconst ctx=canvas.getContext('2d');\nconst W=440,H=640;\ncanvas.width=W;canvas.height=H;\n\n// ── fruit data ──\nconst FRUITS=[\n  {e:'🍉',c:'#ef4444',s:'#fca5a5',pts:1},\n  {e:'🍊',c:'#f97316',s:'#fed7aa',pts:1},\n  {e:'🍋',c:'#eab308',s:'#fef08a',pts:1},\n  {e:'🍇',c:'#a855f7',s:'#e9d5ff',pts:2},\n  {e:'🍓',c:'#ec4899',s:'#fbcfe8',pts:2},\n  {e:'🍍',c:'#84cc16',s:'#d9f99d',pts:3},\n  {e:'🥭',c:'#fb923c',s:'#fed7aa',pts:3},\n  {e:'🍑',c:'#f87171',s:'#fecaca',pts:2},\n];\n\n// ── state ──\nlet state='idle'; // idle|playing|dead\nlet score=0,lives=3,combo=0,comboTimer=0,level=1,levelProgress=0;\nlet timeLeft=60,gameInterval=null;\nlet items=[],particles=[],slashTrail=[],comboFx=[];\nlet spawnTimer=0,frameCount=0;\nlet powerActive={ice:0,fire:0}; // timestamps\nlet record=0;try{record=parseInt(localStorage.getItem('fsv2Rec')||0)}catch(e){}\ndocument.getElementById('sRec').textContent=record;\n\n// ── pre-render Japanese bg ──\nconst bgC=document.createElement('canvas');bgC.width=W;bgC.height=H;\nconst bgX=bgC.getContext('2d');\n(function(){\n  // night sky gradient\n  const sky=bgX.createLinearGradient(0,0,0,H);\n  sky.addColorStop(0,'#0a0008');sky.addColorStop(0.5,'#150010');sky.addColorStop(1,'#0d000a');\n  bgX.fillStyle=sky;bgX.fillRect(0,0,W,H);\n  // stars\n  for(let i=0;i<80;i++){\n    const x=Math.random()*W,y=Math.random()*H*0.7;\n    const r=Math.random()<0.15?1.5:0.8;\n    bgX.fillStyle=`rgba(255,220,220,${0.3+Math.random()*0.5})`;\n    bgX.beginPath();bgX.arc(x,y,r,0,Math.PI*2);bgX.fill();\n  }\n  // big red moon\n  const moonGlow=bgX.createRadialGradient(W*0.75,H*0.18,0,W*0.75,H*0.18,90);\n  moonGlow.addColorStop(0,'rgba(220,50,50,0.25)');moonGlow.addColorStop(1,'transparent');\n  bgX.fillStyle=moonGlow;bgX.beginPath();bgX.arc(W*0.75,H*0.18,90,0,Math.PI*2);bgX.fill();\n  bgX.fillStyle='#c0392b';bgX.shadowBlur=30;bgX.shadowColor='#e74c3c';\n  bgX.beginPath();bgX.arc(W*0.75,H*0.18,38,0,Math.PI*2);bgX.fill();\n  bgX.fillStyle='rgba(0,0,0,0.15)';bgX.beginPath();bgX.arc(W*0.75+8,H*0.18-6,28,0,Math.PI*2);bgX.fill();\n  bgX.shadowBlur=0;\n  // ground\n  const ground=bgX.createLinearGradient(0,H-70,0,H);\n  ground.addColorStop(0,'#1a0010');ground.addColorStop(1,'#0a0008');\n  bgX.fillStyle=ground;bgX.fillRect(0,H-70,W,70);\n  bgX.fillStyle='#2d0018';bgX.fillRect(0,H-70,W,3);\n  // bamboo trunks\n  const bambooPositions=[30,70,340,400];\n  bambooPositions.forEach(bx=>{\n    const bw=14+Math.random()*6;\n    const bh=H*0.55+Math.random()*80;\n    const g=bgX.createLinearGradient(bx,0,bx+bw,0);\n    g.addColorStop(0,'#1a3d1a');g.addColorStop(0.4,'#2d6b2d');g.addColorStop(0.7,'#246024');g.addColorStop(1,'#1a3d1a');\n    bgX.fillStyle=g;bgX.fillRect(bx,H-70-bh,bw,bh);\n    // nodes\n    for(let ny=H-70-bh+20;ny<H-70;ny+=45){\n      bgX.fillStyle='rgba(0,0,0,0.3)';bgX.fillRect(bx-1,ny,bw+2,3);\n      bgX.fillStyle='rgba(255,255,255,0.06)';bgX.fillRect(bx,ny+1,bw,1);\n    }\n    // leaves\n    for(let li=0;li<4;li++){\n      const lx=bx+(Math.random()-0.3)*60;\n      const ly=H-70-bh*0.3-li*70+Math.random()*30;\n      bgX.fillStyle='rgba(45,107,45,0.7)';\n      bgX.beginPath();bgX.ellipse(lx,ly,28,7,li%2===0?-0.5:0.5,0,Math.PI*2);bgX.fill();\n    }\n  });\n  // cherry blossom petals (static)\n  for(let i=0;i<18;i++){\n    const px=Math.random()*W,py=Math.random()*(H*0.7);\n    bgX.fillStyle=`rgba(255,182,193,${0.3+Math.random()*0.4})`;\n    bgX.save();bgX.translate(px,py);bgX.rotate(Math.random()*Math.PI*2);\n    bgX.beginPath();bgX.ellipse(0,0,5,3,0,0,Math.PI*2);bgX.fill();bgX.restore();\n  }\n  // Japanese pattern overlay on ground\n  bgX.strokeStyle='rgba(200,0,50,0.08)';bgX.lineWidth=1;\n  for(let gx=0;gx<W;gx+=20){bgX.beginPath();bgX.moveTo(gx,H-70);bgX.lineTo(gx,H);bgX.stroke();}\n})();\n\n// ── audio ──\nlet actx=null;\nfunction ac(){if(!actx)try{actx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){};return actx}\nfunction beep(t){\n  try{\n    const c=ac();if(!c)return;\n    const o=c.createOscillator(),g=c.createGain();\n    o.connect(g);g.connect(c.destination);\n    if(t==='slash'){o.type='sawtooth';o.frequency.setValueAtTime(700+Math.random()*500,c.currentTime);g.gain.setValueAtTime(0.07,c.currentTime);g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+0.1);o.start();o.stop(c.currentTime+0.1);}\n    else if(t==='gold'){[880,1100,1320].forEach((f,i)=>{const oo=c.createOscillator(),gg=c.createGain();oo.connect(gg);gg.connect(c.destination);oo.type='sine';oo.frequency.value=f;gg.gain.setValueAtTime(0.12,c.currentTime+i*0.07);gg.gain.exponentialRampToValueAtTime(0.001,c.currentTime+i*0.07+0.2);oo.start(c.currentTime+i*0.07);oo.stop(c.currentTime+i*0.07+0.2);});}\n    else if(t==='combo'){[440,554,659,880].forEach((f,i)=>{const oo=c.createOscillator(),gg=c.createGain();oo.connect(gg);gg.connect(c.destination);oo.type='sine';oo.frequency.value=f;gg.gain.setValueAtTime(0.1,c.currentTime+i*0.06);gg.gain.exponentialRampToValueAtTime(0.001,c.currentTime+i*0.06+0.15);oo.start(c.currentTime+i*0.06);oo.stop(c.currentTime+i*0.06+0.15);});}\n    else if(t==='bomb'){o.type='square';o.frequency.setValueAtTime(120,c.currentTime);o.frequency.linearRampToValueAtTime(40,c.currentTime+0.4);g.gain.setValueAtTime(0.18,c.currentTime);g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+0.5);o.start();o.stop(c.currentTime+0.5);}\n    else if(t==='ice'){o.type='sine';o.frequency.setValueAtTime(1200,c.currentTime);o.frequency.linearRampToValueAtTime(400,c.currentTime+0.3);g.gain.setValueAtTime(0.1,c.currentTime);g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+0.35);o.start();o.stop(c.currentTime+0.35);}\n    else if(t==='fire'){o.type='sawtooth';o.frequency.setValueAtTime(200,c.currentTime);o.frequency.setValueAtTime(600,c.currentTime+0.1);g.gain.setValueAtTime(0.12,c.currentTime);g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+0.3);o.start();o.stop(c.currentTime+0.3);}\n    else if(t==='miss'){o.type='sine';o.frequency.setValueAtTime(300,c.currentTime);o.frequency.linearRampToValueAtTime(150,c.currentTime+0.2);g.gain.setValueAtTime(0.08,c.currentTime);g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+0.25);o.start();o.stop(c.currentTime+0.25);}\n    else if(t==='lvup'){[523,659,784,1047].forEach((f,i)=>{const oo=c.createOscillator(),gg=c.createGain();oo.connect(gg);gg.connect(c.destination);oo.type='sine';oo.frequency.value=f;gg.gain.setValueAtTime(0.1,c.currentTime+i*0.08);gg.gain.exponentialRampToValueAtTime(0.001,c.currentTime+i*0.08+0.2);oo.start(c.currentTime+i*0.08);oo.stop(c.currentTime+i*0.08+0.2);});}\n  }catch(e){}\n}\n\n// ── slash input ──\nlet isSlashing=false,lastSX=0,lastSY=0;\nfunction getPos(e,rect){\n  const sx=W/rect.width,sy=H/rect.height;\n  if(e.touches)return{x:(e.touches[0].clientX-rect.left)*sx,y:(e.touches[0].clientY-rect.top)*sy};\n  return{x:(e.clientX-rect.left)*sx,y:(e.clientY-rect.top)*sy};\n}\ncanvas.addEventListener('mousedown',e=>{\n  if(state!=='playing'){if(state==='idle'||state==='dead')startGame();return;}\n  const r=canvas.getBoundingClientRect(),p=getPos(e,r);\n  isSlashing=true;lastSX=p.x;lastSY=p.y;slashTrail=[];\n});\ncanvas.addEventListener('mousemove',e=>{\n  if(!isSlashing||state!=='playing')return;\n  const r=canvas.getBoundingClientRect(),p=getPos(e,r);\n  doSlash(lastSX,lastSY,p.x,p.y);lastSX=p.x;lastSY=p.y;\n});\ncanvas.addEventListener('mouseup',()=>isSlashing=false);\ncanvas.addEventListener('touchstart',e=>{e.preventDefault();if(state!=='playing'){if(state==='idle'||state==='dead')startGame();return;}const r=canvas.getBoundingClientRect(),p=getPos(e,r);isSlashing=true;lastSX=p.x;lastSY=p.y;slashTrail=[];},{passive:false});\ncanvas.addEventListener('touchmove',e=>{e.preventDefault();if(!isSlashing||state!=='playing')return;const r=canvas.getBoundingClientRect(),p=getPos(e,r);doSlash(lastSX,lastSY,p.x,p.y);lastSX=p.x;lastSY=p.y;},{passive:false});\ncanvas.addEventListener('touchend',e=>{e.preventDefault();isSlashing=false;},{passive:false});\n\nfunction pLineDist(px,py,x1,y1,x2,y2){\n  const dx=x2-x1,dy=y2-y1,l2=dx*dx+dy*dy;\n  if(l2===0)return Math.hypot(px-x1,py-y1);\n  const t=Math.max(0,Math.min(1,((px-x1)*dx+(py-y1)*dy)/l2));\n  return Math.hypot(px-(x1+t*dx),py-(y1+t*dy));\n}\n\nfunction doSlash(x1,y1,x2,y2){\n  slashTrail.push({x:x2,y:y2,life:1});\n  if(slashTrail.length>20)slashTrail.shift();\n  items.forEach(item=>{\n    if(item.slashed||item.type==='exploding')return;\n    if(pLineDist(item.x,item.y,x1,y1,x2,y2)<item.r+10){\n      slashItem(item);\n    }\n  });\n}\n\nfunction slashItem(item){\n  item.slashed=true;\n  if(item.type==='bomb'){\n    item.type='exploding';item.explodeTimer=25;\n    beep('bomb');\n    for(let i=0;i<28;i++){const a=Math.random()*Math.PI*2,s=2+Math.random()*7;particles.push({x:item.x,y:item.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,r:3+Math.random()*4,color:'#f97316',type:'exp'});}\n    lives--;updateHUD();\n    comboFx.push({x:item.x,y:item.y-30,txt:'💥 بمب!',color:'#f87171',life:1,vy:-1.5});\n    combo=0;comboTimer=0;\n    if(lives<=0)setTimeout(endGame,400);\n    return;\n  }\n  if(item.type==='powerup'){\n    if(item.power==='ice'){powerActive.ice=Date.now()+5000;beep('ice');comboFx.push({x:item.x,y:item.y-30,txt:'❄️ یخ! کند شد',color:'#67e8f9',life:1,vy:-2});}\n    if(item.power==='fire'){powerActive.fire=Date.now()+6000;beep('fire');comboFx.push({x:item.x,y:item.y-30,txt:'🔥 آتش! ۲x امتیاز',color:'#f97316',life:1,vy:-2});}\n    for(let i=0;i<12;i++){const a=Math.random()*Math.PI*2,s=1+Math.random()*3;particles.push({x:item.x,y:item.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,r:2+Math.random()*3,color:item.power==='ice'?'#67e8f9':'#f97316',type:'pw'});}\n    return;\n  }\n  // fruit\n  const isGold=item.type==='gold';\n  const fireX=powerActive.fire>Date.now()?2:1;\n  const basePts=isGold?5:item.data.pts;\n  combo++;comboTimer=100;\n  const earned=basePts*fireX*(combo>=3?combo:1);\n  score+=earned;levelProgress+=earned;\n  const col=isGold?'#fbbf24':item.data.s;\n  beep(isGold?'gold':combo>=3?'combo':'slash');\n  comboFx.push({x:item.x,y:item.y-20,txt:'+'+(combo>=3?'🔥 x'+combo+' ':'')+earned+(isGold?' ⭐':''),color:col,life:1,vy:-2.2});\n  for(let i=0;i<18;i++){const a=Math.random()*Math.PI*2,s=1.5+Math.random()*4;particles.push({x:item.x,y:item.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,r:2+Math.random()*4,color:isGold?'#fbbf24':item.data.c,type:'fruit'});particles.push({x:item.x,y:item.y,vx:Math.cos(a)*s*.5,vy:Math.sin(a)*s*.5,life:.8,r:1+Math.random()*2,color:isGold?'#fef3c7':item.data.s,type:'juice'});}\n  item.halves=[{x:item.x,y:item.y,vx:-2-Math.random(),vy:-3-Math.random()*2,rot:0,rotV:-0.14,life:1},{x:item.x,y:item.y,vx:2+Math.random(),vy:-3-Math.random()*2,rot:0,rotV:0.14,life:1}];\n  // level up check\n  if(levelProgress>=30){levelProgress-=30;level++;beep('lvup');comboFx.push({x:W/2,y:H/2-40,txt:'🎋 لول '+level+'!',color:'#86efac',life:1.5,vy:-1.5});}\n  updateHUD();\n}\n\nfunction spawnItem(){\n  const now=Date.now();\n  const iceSlow=powerActive.ice>now;\n  const x=55+Math.random()*(W-110);\n  const baseSpd=11+level*0.6+Math.random()*3;\n  const spd=iceSlow?baseSpd*0.45:baseSpd;\n  const vx=(Math.random()-0.5)*2.5;\n  const rnd=Math.random();\n  if(rnd<0.13){\n    items.push({x,y:H+35,vx,vy:-spd,r:28,type:'bomb',slashed:false,rot:0,rotV:(Math.random()-0.5)*0.07});\n  } else if(rnd<0.2){\n    items.push({x,y:H+35,vx,vy:-spd*0.8,r:26,type:'gold',data:{e:'⭐',c:'#fbbf24',s:'#fef3c7',pts:5},slashed:false,rot:0,rotV:(Math.random()-0.5)*0.08,halves:null,goldTimer:120});\n  } else if(rnd<0.27){\n    const pw=Math.random()<0.5?'ice':'fire';\n    items.push({x,y:H+35,vx,vy:-spd*0.85,r:26,type:'powerup',power:pw,slashed:false,rot:0,rotV:(Math.random()-0.5)*0.06});\n  } else {\n    const data=FRUITS[Math.floor(Math.random()*FRUITS.length)];\n    items.push({x,y:H+35,vx,vy:-spd,r:28,type:'fruit',data,slashed:false,rot:0,rotV:(Math.random()-0.5)*0.06,halves:null});\n  }\n}\n\nfunction startGame(){\n  state='playing';score=0;lives=3;combo=0;comboTimer=0;level=1;levelProgress=0;timeLeft=60;\n  items=[];particles=[];slashTrail=[];comboFx=[];powerActive={ice:0,fire:0};\n  spawnTimer=0;frameCount=0;\n  clearInterval(gameInterval);\n  gameInterval=setInterval(()=>{timeLeft--;document.getElementById('sTime').textContent=timeLeft;if(timeLeft<=0){clearInterval(gameInterval);endGame();}},1000);\n  updateHUD();\n}\n\nfunction endGame(){\n  state='dead';isSlashing=false;clearInterval(gameInterval);\n  if(score>record){record=score;try{localStorage.setItem('fsv2Rec',record)}catch(e){}}\n  document.getElementById('sRec').textContent=record;\n}\n\nfunction updateHUD(){\n  document.getElementById('sScore').textContent=score;\n  const h=['❤❤❤','❤❤🖤','❤🖤🖤','🖤🖤🖤'];\n  document.getElementById('sLives').textContent=h[Math.max(0,3-lives)];\n}\n\nfunction update(){\n  frameCount++;\n  const spawnInt=Math.max(32,72-level*4);\n  if(spawnTimer++>=spawnInt){spawnTimer=0;spawnItem();}\n  if(comboTimer>0){comboTimer--;if(comboTimer===0)combo=0;}\n\n  items.forEach(item=>{\n    const iceActive=powerActive.ice>Date.now();\n    const gravMult=iceActive?0.12:0.28;\n    item.vy+=gravMult;item.x+=item.vx;item.y+=item.vy;item.rot+=item.rotV;\n    if(item.type==='gold'&&!item.slashed){item.goldTimer--;if(item.goldTimer<=0){item.slashed=true;}}\n    if(item.type==='exploding'){item.explodeTimer--;}\n    if(item.halves){item.halves.forEach(h=>{h.x+=h.vx;h.y+=h.vy;h.vy+=0.3;h.rot+=h.rotV;h.life-=0.022;});item.halves=item.halves.filter(h=>h.life>0);}\n    if(!item.slashed&&item.type==='fruit'&&item.y>H+55){\n      item.slashed=true;lives--;updateHUD();beep('miss');\n      comboFx.push({x:item.x,y:H-50,txt:'از دست رفت!',color:'#f87171',life:1,vy:-1});\n      combo=0;comboTimer=0;\n      if(lives<=0)setTimeout(endGame,300);\n    }\n  });\n  items=items.filter(item=>{\n    if(item.type==='exploding')return item.explodeTimer>0;\n    if(item.slashed&&(!item.halves||item.halves.length===0))return item.y<H+90;\n    return item.y<H+90;\n  });\n  particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.1;p.life-=0.032;p.r*=0.97;});\n  particles=particles.filter(p=>p.life>0);\n  slashTrail.forEach(s=>s.life-=0.1);slashTrail=slashTrail.filter(s=>s.life>0);\n  comboFx.forEach(e=>{e.y+=e.vy;e.life-=0.035;});comboFx=comboFx.filter(e=>e.life>0);\n}\n\n// animated petals\nconst petals=Array.from({length:14},()=>({x:Math.random()*W,y:Math.random()*H*0.8,vx:-0.3-Math.random()*0.5,vy:0.3+Math.random()*0.4,rot:Math.random()*Math.PI*2,rotV:(Math.random()-0.5)*0.02,size:4+Math.random()*5}));\n\nfunction draw(){\n  ctx.drawImage(bgC,0,0,W,H);\n\n  // animated petals\n  petals.forEach(p=>{\n    p.x+=p.vx;p.y+=p.vy;p.rot+=p.rotV;\n    if(p.x<-10)p.x=W+10;if(p.y>H+10)p.y=-10;\n    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);\n    ctx.fillStyle='rgba(255,182,193,0.55)';\n    ctx.beginPath();ctx.ellipse(0,0,p.size,p.size*0.5,0,0,Math.PI*2);ctx.fill();ctx.restore();\n  });\n\n  // ice overlay\n  const now=Date.now();\n  if(powerActive.ice>now){\n    const icePct=(powerActive.ice-now)/5000;\n    ctx.fillStyle=`rgba(103,232,249,${icePct*0.08})`;ctx.fillRect(0,0,W,H);\n    // ice bar\n    ctx.fillStyle='rgba(0,0,0,0.4)';ctx.beginPath();ctx.roundRect(10,H-22,W-20,7,3);ctx.fill();\n    ctx.fillStyle='#67e8f9';ctx.shadowBlur=8;ctx.shadowColor='#67e8f9';\n    ctx.beginPath();ctx.roundRect(10,H-22,(W-20)*icePct,7,3);ctx.fill();ctx.shadowBlur=0;\n    ctx.font='bold 9px Vazirmatn';ctx.fillStyle='#67e8f9';ctx.textAlign='left';ctx.fillText('❄️ یخ فعال',10,H-26);\n  }\n  // fire overlay\n  if(powerActive.fire>now){\n    const firePct=(powerActive.fire-now)/6000;\n    ctx.fillStyle=`rgba(249,115,22,${firePct*0.06})`;ctx.fillRect(0,0,W,H);\n    ctx.fillStyle='rgba(0,0,0,0.4)';ctx.beginPath();ctx.roundRect(10,H-22,W-20,7,3);ctx.fill();\n    ctx.fillStyle='#f97316';ctx.shadowBlur=8;ctx.shadowColor='#f97316';\n    ctx.beginPath();ctx.roundRect(10,H-22,(W-20)*firePct,7,3);ctx.fill();ctx.shadowBlur=0;\n    ctx.font='bold 9px Vazirmatn';ctx.fillStyle='#f97316';ctx.textAlign='left';ctx.fillText('🔥 آتش ۲x',10,H-26);\n  }\n\n  // particles\n  particles.forEach(p=>{ctx.globalAlpha=p.life;ctx.shadowBlur=p.type==='fruit'?8:4;ctx.shadowColor=p.color;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();});\n  ctx.globalAlpha=1;ctx.shadowBlur=0;\n\n  // items\n  items.forEach(item=>{\n    if(item.type==='exploding'){ctx.globalAlpha=item.explodeTimer/25;ctx.font='56px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('💥',item.x,item.y);ctx.globalAlpha=1;return;}\n    if(item.slashed&&item.halves){\n      item.halves.forEach(h=>{ctx.save();ctx.translate(h.x,h.y);ctx.rotate(h.rot);ctx.globalAlpha=h.life;ctx.font='32px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(item.type==='gold'?'⭐':item.data.e,0,0);ctx.restore();ctx.globalAlpha=1;});\n      return;\n    }\n    if(item.slashed)return;\n    ctx.save();ctx.translate(item.x,item.y);ctx.rotate(item.rot);\n    if(item.type==='bomb'){\n      ctx.shadowBlur=15;ctx.shadowColor='#ef4444';\n      ctx.font='50px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('💣',0,0);\n      ctx.shadowBlur=0;ctx.strokeStyle='rgba(239,68,68,0.35)';ctx.lineWidth=2;\n      ctx.beginPath();ctx.arc(0,0,item.r+6,0,Math.PI*2);ctx.stroke();\n    } else if(item.type==='powerup'){\n      const pc=item.power==='ice'?'#67e8f9':'#f97316';\n      ctx.shadowBlur=18;ctx.shadowColor=pc;\n      ctx.font='46px serif';ctx.textAlign='center';ctx.textBaseline='middle';\n      ctx.fillText(item.power==='ice'?'❄️':'🔥',0,0);ctx.shadowBlur=0;\n      ctx.strokeStyle=pc+'88';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,item.r+5,0,Math.PI*2);ctx.stroke();\n    } else if(item.type==='gold'){\n      const pulse=0.85+0.15*Math.sin(frameCount*0.18);\n      ctx.scale(pulse,pulse);\n      ctx.shadowBlur=22;ctx.shadowColor='#fbbf24';\n      ctx.font='48px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('⭐',0,0);\n      ctx.shadowBlur=0;\n      // countdown ring\n      const pct=item.goldTimer/120;\n      ctx.strokeStyle='rgba(251,191,36,0.7)';ctx.lineWidth=3;\n      ctx.beginPath();ctx.arc(0,0,item.r+8,-Math.PI/2,-Math.PI/2+pct*Math.PI*2);ctx.stroke();\n    } else {\n      const iceA=powerActive.ice>now;\n      ctx.shadowBlur=iceA?12:10;ctx.shadowColor=iceA?'#67e8f9':item.data.c;\n      ctx.font='50px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(item.data.e,0,0);\n      ctx.shadowBlur=0;\n      if(powerActive.fire>now){ctx.fillStyle='rgba(249,115,22,0.5)';ctx.font='13px serif';ctx.textBaseline='top';ctx.fillText('🔥',12,-18);}\n      ctx.fillStyle='rgba(0,0,0,0.6)';ctx.beginPath();ctx.arc(14,-14,10,0,Math.PI*2);ctx.fill();\n      ctx.fillStyle=item.data.s;ctx.font='bold 11px Vazirmatn';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(item.data.pts,14,-14);\n    }\n    ctx.restore();\n  });\n\n  // slash trail\n  if(slashTrail.length>1){\n    for(let i=1;i<slashTrail.length;i++){\n      const t0=slashTrail[i-1],t1=slashTrail[i];\n      ctx.strokeStyle=`rgba(255,200,200,${t1.life*0.85})`;\n      ctx.lineWidth=3.5*t1.life;ctx.lineCap='round';\n      ctx.shadowBlur=12;ctx.shadowColor='rgba(220,50,50,0.8)';\n      ctx.beginPath();ctx.moveTo(t0.x,t0.y);ctx.lineTo(t1.x,t1.y);ctx.stroke();\n    }\n    ctx.shadowBlur=0;\n  }\n\n  // combo effects\n  comboFx.forEach(e=>{ctx.globalAlpha=e.life;ctx.shadowBlur=8;ctx.shadowColor=e.color;ctx.fillStyle=e.color;ctx.font='bold 15px Vazirmatn';ctx.textAlign='center';ctx.fillText(e.txt,e.x,e.y);ctx.shadowBlur=0;ctx.globalAlpha=1;});\n\n  // combo bar\n  if(combo>=2){\n    const bw=160,bh=6,bx=(W-bw)/2,by=H-36;\n    ctx.fillStyle='rgba(0,0,0,0.45)';ctx.beginPath();ctx.roundRect(bx,by,bw,bh,3);ctx.fill();\n    const pct=comboTimer/100;\n    ctx.shadowBlur=8;ctx.shadowColor='#c0392b';\n    ctx.fillStyle=`hsl(${0+combo*8},90%,55%)`;\n    ctx.beginPath();ctx.roundRect(bx,by,bw*pct,bh,3);ctx.fill();ctx.shadowBlur=0;\n    ctx.font='bold 11px Vazirmatn';ctx.fillStyle='#ffcccc';ctx.textAlign='center';\n    ctx.fillText('🔥 COMBO x'+combo,W/2,by-5);\n  }\n\n  // level badge\n  if(state==='playing'){\n    ctx.font='bold 10px Vazirmatn';ctx.fillStyle='rgba(134,239,172,0.5)';ctx.textAlign='right';\n    ctx.fillText('🎋 لول '+level,W-8,H-8);\n    // score\n    ctx.font='bold 26px Vazirmatn';ctx.textAlign='center';\n    ctx.fillStyle='rgba(255,255,255,0.07)';ctx.fillText(score,W/2,46);\n    ctx.fillStyle='rgba(255,255,255,0.65)';ctx.fillText(score,W/2+1,45);\n    // timer warning\n    if(timeLeft<=10){\n      ctx.fillStyle=`rgba(239,68,68,${0.5+0.5*Math.sin(frameCount*0.2)})`;\n      ctx.font='bold 13px Vazirmatn';ctx.textAlign='center';\n      ctx.fillText('⏱ '+timeLeft,W/2,H-50);\n    }\n  }\n\n  // overlays\n  if(state==='idle'){\n    ctx.fillStyle='rgba(10,0,8,0.87)';ctx.fillRect(0,0,W,H);\n    ctx.font='58px serif';ctx.textAlign='center';ctx.fillText('🍉',W/2,H/2-100);\n    ctx.shadowBlur=25;ctx.shadowColor='#c0392b';\n    ctx.font='bold 28px Vazirmatn';ctx.fillStyle='#fff';ctx.fillText('میوه‌برش ۲',W/2,H/2-40);\n    ctx.shadowBlur=0;\n    ctx.font='bold 12px Vazirmatn';ctx.fillStyle='#c0392b';ctx.fillText('🎋 تم ژاپنی',W/2,H/2-10);\n    ctx.font='12px Vazirmatn';ctx.fillStyle='#999';\n    ctx.fillText('⭐ میوه طلایی ۵x  |  ❄️ یخ  |  🔥 آتش',W/2,H/2+18);\n    ctx.fillText('🎮 موس یا انگشت برای برش',W/2,H/2+42);\n    if(record>0){ctx.fillStyle='#fbbf24';ctx.fillText('رکورد: '+record,W/2,H/2+68);}\n    ctx.font='14px Vazirmatn';ctx.fillStyle='#c0392b';ctx.fillText('کلیک یا لمس کن',W/2,H/2+98);\n  }\n  if(state==='dead'){\n    ctx.fillStyle='rgba(10,0,8,0.9)';ctx.fillRect(0,0,W,H);\n    const isR=score>=record&&score>0;\n    ctx.font='54px serif';ctx.textAlign='center';ctx.fillText(isR?'🏆':'🌸',W/2,H/2-100);\n    ctx.shadowBlur=isR?22:0;ctx.shadowColor='#fbbf24';\n    ctx.font='bold 22px Vazirmatn';ctx.fillStyle=isR?'#fbbf24':'#fff';\n    ctx.fillText(isR?'رکورد جدید! 🎉':'بازی تموم شد!',W/2,H/2-48);ctx.shadowBlur=0;\n    ctx.font='bold 44px Vazirmatn';ctx.fillStyle='#f97316';ctx.fillText(score+' امتیاز',W/2,H/2+12);\n    ctx.font='14px Vazirmatn';ctx.fillStyle='#fbbf24';ctx.fillText('رکورد: '+record,W/2,H/2+52);\n    ctx.font='bold 11px Vazirmatn';ctx.fillStyle='#86efac';ctx.fillText('لول رسیدی: '+level,W/2,H/2+78);\n    ctx.font='12px Vazirmatn';ctx.fillStyle='#554';ctx.fillText('کلیک یا لمس کن',W/2,H/2+104);\n  }\n}\n\nfunction loop(){if(state==='playing')update();draw();requestAnimationFrame(loop);}\nloop();\n<\\/script>\n</body></html>\n", "flappy": "<!DOCTYPE html>\n<html lang=\"fa\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\">\n<style>\n@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700&display=swap');\n*{box-sizing:border-box;margin:0;padding:0}\nbody{font-family:'Vazirmatn',sans-serif;background:#060b18;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:8px;direction:rtl}\n.wrap{width:100%;max-width:400px}\n.topbar{display:flex;justify-content:space-between;align-items:center;padding:8px 4px}\n.stat{text-align:center}\n.sn{font-size:22px;font-weight:700;color:#fff}\n.sl{font-size:10px;color:#445;margin-top:1px}\n.sn.gold{color:#EF9F27}\n.sn.pur{color:#a78bfa}\ncanvas{display:block;width:100%;border-radius:18px;cursor:pointer;touch-action:none}\n.hint{text-align:center;font-size:11px;color:#334;padding:8px 0 2px}\n</style>\n</head>\n<body style=\"user-select:none;-webkit-user-select:none\">\n<div class=\"wrap\">\n  <div class=\"topbar\">\n    <div class=\"stat\"><div class=\"sn gold\" id=\"sScore\">0</div><div class=\"sl\">امتیاز</div></div>\n    <div class=\"stat\" style=\"text-align:center\"><div style=\"font-size:13px;color:#a78bfa;font-weight:700\">🐦 فلپی فارسی</div></div>\n    <div class=\"stat\"><div class=\"sn pur\" id=\"sRecord\">0</div><div class=\"sl\">رکورد</div></div>\n  </div>\n  <canvas id=\"c\"></canvas>\n  <div class=\"hint\" id=\"hint\">کلیک یا لمس کن تا شروع بشه</div>\n</div>\n\n<script>\nconst canvas=document.getElementById('c');\nconst ctx=canvas.getContext('2d');\nconst W=400,H=580;\ncanvas.width=W;canvas.height=H;\n\n// ---- constants ----\nconst GRAVITY=0.38;\nconst FLAP=-7.2;\nconst PIPE_W=58;\nconst GAP=148;\nconst PIPE_SPEED=2.6;\nconst BIRD_X=88;\nconst BIRD_R=16;\n\n// ---- state ----\nlet state='idle'; // idle | playing | dead\nlet bird={y:H/2,vy:0,rot:0,flap:0};\nlet pipes=[];\nlet score=0,frameCount=0;\nlet particles=[];\nlet record=0;try{record=parseInt(localStorage.getItem('flappyRec')||0)}catch(e){}\ndocument.getElementById('sRecord').textContent=record;\n\n// stars (static)\nconst STARS=Array.from({length:60},()=>({x:Math.random()*W,y:Math.random()*(H*0.55),r:0.5+Math.random()*1.5,a:0.3+Math.random()*0.7}));\n// clouds\nconst CLOUDS=[{x:60,y:60,s:0.8},{x:200,y:40,s:1},{x:320,y:70,s:0.7},{x:140,y:90,s:0.6}];\n\n// ---- audio ----\nlet actx=null;\nfunction ac(){if(!actx)try{actx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){};return actx}\nfunction beep(type){\n  try{\n    const c=ac();if(!c)return;\n    const o=c.createOscillator(),g=c.createGain();\n    o.connect(g);g.connect(c.destination);\n    if(type==='flap'){o.type='sine';o.frequency.setValueAtTime(520,c.currentTime);o.frequency.linearRampToValueAtTime(680,c.currentTime+0.06);g.gain.setValueAtTime(0.1,c.currentTime);g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+0.12);o.start();o.stop(c.currentTime+0.12);}\n    else if(type==='score'){o.type='sine';o.frequency.setValueAtTime(660,c.currentTime);o.frequency.setValueAtTime(880,c.currentTime+0.08);g.gain.setValueAtTime(0.12,c.currentTime);g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+0.2);o.start();o.stop(c.currentTime+0.2);}\n    else if(type==='die'){o.type='sawtooth';o.frequency.setValueAtTime(300,c.currentTime);o.frequency.linearRampToValueAtTime(80,c.currentTime+0.3);g.gain.setValueAtTime(0.15,c.currentTime);g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+0.35);o.start();o.stop(c.currentTime+0.35);}\n  }catch(e){}\n}\n\n// ---- input ----\nfunction doFlap(){\n  if(state==='idle'){startGame();return;}\n  if(state==='dead'){\n    setTimeout(()=>{state='idle';},300);\n    return;\n  }\n  bird.vy=FLAP;\n  bird.flap=8;\n  beep('flap');\n  // wing particles\n  for(let i=0;i<5;i++)particles.push({x:BIRD_X,y:bird.y,vx:-1-Math.random()*2,vy:(Math.random()-0.5)*2,life:1,color:'#fde68a'});\n}\ncanvas.addEventListener('click',doFlap);\ncanvas.addEventListener('touchstart',e=>{e.preventDefault();doFlap();},{passive:false});\ndocument.addEventListener('keydown',e=>{if(e.code==='Space'||e.code==='ArrowUp'){e.preventDefault();doFlap();}});\n\n// ---- game ----\nfunction startGame(){\n  state='playing';\n  bird={y:H/2,vy:0,rot:0,flap:0};\n  pipes=[];score=0;frameCount=0;particles=[];\n  document.getElementById('sScore').textContent=0;\n  document.getElementById('hint').textContent='';\n  bird.vy=FLAP;bird.flap=8;beep('flap');\n}\n\nfunction spawnPipe(){\n  const minTop=60,maxTop=H-GAP-80;\n  const topH=minTop+Math.random()*(maxTop-minTop);\n  pipes.push({x:W+10,topH,scored:false});\n}\n\nfunction update(){\n  frameCount++;\n  // spawn pipes\n  const interval=Math.max(55,90-Math.floor(score/5)*3);\n  if(frameCount%interval===0)spawnPipe();\n\n  // bird physics\n  bird.vy+=GRAVITY;\n  bird.vy=Math.min(bird.vy,10);\n  bird.y+=bird.vy;\n  bird.rot=Math.max(-25,Math.min(90,bird.vy*5));\n  if(bird.flap>0)bird.flap--;\n\n  // pipes\n  pipes.forEach(p=>{\n    p.x-=PIPE_SPEED+(score*0.04);\n    // score\n    if(!p.scored&&p.x+PIPE_W<BIRD_X-BIRD_R){\n      p.scored=true;score++;\n      document.getElementById('sScore').textContent=score;\n      beep('score');\n      // score particles\n      for(let i=0;i<8;i++)particles.push({x:BIRD_X,y:bird.y,vx:(Math.random()-0.5)*4,vy:-1-Math.random()*3,life:1,color:'#EF9F27'});\n    }\n  });\n  pipes=pipes.filter(p=>p.x>-PIPE_W-10);\n\n  // collision\n  // ceiling / floor\n  if(bird.y-BIRD_R<0||bird.y+BIRD_R>H-40){die();return;}\n  // pipes\n  for(const p of pipes){\n    if(BIRD_X+BIRD_R-4>p.x&&BIRD_X-BIRD_R+4<p.x+PIPE_W){\n      if(bird.y-BIRD_R+4<p.topH||bird.y+BIRD_R-4>p.topH+GAP){die();return;}\n    }\n  }\n\n  // particles\n  particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.1;p.life-=0.05;});\n  particles=particles.filter(p=>p.life>0);\n}\n\nfunction die(){\n  state='dead';\n  beep('die');\n  if(score>record){record=score;try{localStorage.setItem('flappyRec',record)}catch(e){}}\n  document.getElementById('sRecord').textContent=record;\n  document.getElementById('hint').textContent='کلیک کن تا دوباره بازی کنی';\n  // burst particles\n  for(let i=0;i<20;i++)particles.push({x:BIRD_X,y:bird.y,vx:(Math.random()-0.5)*8,vy:-2-Math.random()*5,life:1,color:i%2===0?'#f97316':'#fde68a'});\n}\n\n// ---- draw helpers ----\nfunction drawPipe(x,topH){\n  // pipe body gradient\n  const grad=ctx.createLinearGradient(x,0,x+PIPE_W,0);\n  grad.addColorStop(0,'#14532d');grad.addColorStop(0.35,'#22c55e');grad.addColorStop(0.65,'#16a34a');grad.addColorStop(1,'#0f3d20');\n\n  // top pipe\n  ctx.fillStyle=grad;\n  ctx.beginPath();ctx.roundRect(x,0,PIPE_W,topH-12,4);ctx.fill();\n  // top cap\n  const capG=ctx.createLinearGradient(x-6,0,x+PIPE_W+6,0);\n  capG.addColorStop(0,'#166534');capG.addColorStop(0.4,'#4ade80');capG.addColorStop(1,'#15803d');\n  ctx.fillStyle=capG;\n  ctx.beginPath();ctx.roundRect(x-6,topH-26,PIPE_W+12,26,6);ctx.fill();\n  // shine\n  ctx.fillStyle='rgba(255,255,255,0.08)';\n  ctx.beginPath();ctx.roundRect(x+6,2,10,topH-28,3);ctx.fill();\n\n  // bottom pipe\n  const bY=topH+GAP;\n  ctx.fillStyle=grad;\n  ctx.beginPath();ctx.roundRect(x,bY+12,PIPE_W,H-bY-12,4);ctx.fill();\n  // bottom cap\n  ctx.fillStyle=capG;\n  ctx.beginPath();ctx.roundRect(x-6,bY,PIPE_W+12,26,6);ctx.fill();\n  // shine\n  ctx.fillStyle='rgba(255,255,255,0.08)';\n  ctx.beginPath();ctx.roundRect(x+6,bY+28,10,H-bY-40,3);ctx.fill();\n}\n\nfunction drawBird(){\n  ctx.save();\n  ctx.translate(BIRD_X,bird.y);\n  ctx.rotate((bird.rot*Math.PI)/180);\n\n  // shadow\n  ctx.fillStyle='rgba(0,0,0,0.2)';\n  ctx.beginPath();ctx.ellipse(2,BIRD_R+2,BIRD_R*0.8,5,0,0,Math.PI*2);ctx.fill();\n\n  // body\n  const bodyG=ctx.createRadialGradient(-4,-4,2,0,0,BIRD_R);\n  bodyG.addColorStop(0,'#fde68a');bodyG.addColorStop(0.5,'#f59e0b');bodyG.addColorStop(1,'#d97706');\n  ctx.fillStyle=bodyG;\n  ctx.beginPath();ctx.arc(0,0,BIRD_R,0,Math.PI*2);ctx.fill();\n\n  // wing\n  const wingOff=bird.flap>0?-4:2;\n  ctx.fillStyle='#f97316';\n  ctx.beginPath();ctx.ellipse(-4,wingOff,10,6,0.4,0,Math.PI*2);ctx.fill();\n\n  // eye white\n  ctx.fillStyle='#fff';\n  ctx.beginPath();ctx.arc(7,-5,5,0,Math.PI*2);ctx.fill();\n  // eye pupil\n  ctx.fillStyle='#1e1b4b';\n  ctx.beginPath();ctx.arc(8,-5,2.5,0,Math.PI*2);ctx.fill();\n  // eye shine\n  ctx.fillStyle='#fff';\n  ctx.beginPath();ctx.arc(9,-6,1,0,Math.PI*2);ctx.fill();\n\n  // beak\n  ctx.fillStyle='#ea580c';\n  ctx.beginPath();ctx.moveTo(12,-2);ctx.lineTo(20,0);ctx.lineTo(12,3);ctx.closePath();ctx.fill();\n\n  ctx.restore();\n}\n\nfunction drawGround(){\n  // ground base\n  const gG=ctx.createLinearGradient(0,H-40,0,H);\n  gG.addColorStop(0,'#1a3a2a');gG.addColorStop(1,'#0c1e12');\n  ctx.fillStyle=gG;ctx.fillRect(0,H-40,W,40);\n  // grass top\n  ctx.fillStyle='#166534';ctx.fillRect(0,H-40,W,8);\n  ctx.fillStyle='#22c55e';ctx.fillRect(0,H-40,W,3);\n  // grid lines\n  ctx.strokeStyle='rgba(255,255,255,0.04)';ctx.lineWidth=1;\n  for(let x=0;x<W;x+=20){ctx.beginPath();ctx.moveTo(x,H-40);ctx.lineTo(x,H);ctx.stroke();}\n}\n\n// ---- main draw ----\nfunction draw(){\n  // sky gradient\n  const sky=ctx.createLinearGradient(0,0,0,H);\n  sky.addColorStop(0,'#060b18');sky.addColorStop(0.45,'#0d1f40');sky.addColorStop(0.75,'#0a2a1a');sky.addColorStop(1,'#061208');\n  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);\n\n  // stars\n  STARS.forEach(s=>{\n    const twinkle=0.5+0.5*Math.sin(Date.now()/800+s.x);\n    ctx.fillStyle=`rgba(255,255,255,${s.a*twinkle})`;\n    ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();\n  });\n\n  // moon\n  ctx.shadowBlur=30;ctx.shadowColor='#fde68a55';\n  ctx.fillStyle='#fef3c7';ctx.beginPath();ctx.arc(340,55,28,0,Math.PI*2);ctx.fill();\n  ctx.fillStyle='#0d1f40';ctx.beginPath();ctx.arc(350,47,22,0,Math.PI*2);ctx.fill();\n  ctx.shadowBlur=0;\n  // moon glow ring\n  const moonGlow=ctx.createRadialGradient(340,55,28,340,55,55);\n  moonGlow.addColorStop(0,'rgba(253,230,138,0.12)');moonGlow.addColorStop(1,'transparent');\n  ctx.fillStyle=moonGlow;ctx.beginPath();ctx.arc(340,55,55,0,Math.PI*2);ctx.fill();\n\n  // distant city silhouette\n  ctx.fillStyle='#0a1628';\n  const buildings=[[0,30,40,70],[45,20,30,80],[80,35,25,65],[110,15,35,85],[150,28,20,72],[175,10,40,90],[220,32,28,68],[255,18,32,82],[292,25,22,75],[320,35,30,65],[355,12,28,88],[388,30,18,70]];\n  buildings.forEach(([x,bh,w,yoff])=>{\n    ctx.fillRect(x,H-40-yoff-bh,w,bh+yoff);\n    // windows\n    ctx.fillStyle='rgba(255,220,100,0.15)';\n    for(let wy=H-40-yoff-bh+5;wy<H-40-yoff-10;wy+=12){\n      for(let wx=x+4;wx<x+w-4;wx+=8){\n        if(Math.random()>0.4)ctx.fillRect(wx,wy,4,6);\n      }\n    }\n    ctx.fillStyle='#0a1628';\n  });\n\n  // pipes\n  pipes.forEach(p=>drawPipe(p.x,p.topH));\n\n  // particles\n  particles.forEach(p=>{\n    ctx.globalAlpha=p.life;\n    ctx.fillStyle=p.color;\n    ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fill();\n  });\n  ctx.globalAlpha=1;\n\n  // ground\n  drawGround();\n\n  // bird\n  drawBird();\n\n  // score in-game\n  if(state==='playing'){\n    ctx.font='bold 32px Vazirmatn';ctx.textAlign='center';\n    ctx.fillStyle='rgba(255,255,255,0.15)';ctx.fillText(score,W/2,55);\n    ctx.fillStyle='rgba(255,255,255,0.85)';ctx.fillText(score,W/2+1,54);\n  }\n\n  // overlay\n  if(state==='idle'){\n    ctx.fillStyle='rgba(6,11,24,0.72)';ctx.fillRect(0,0,W,H);\n    ctx.font='52px serif';ctx.textAlign='center';ctx.fillText('🐦',W/2,H/2-80);\n    ctx.font='bold 28px Vazirmatn';ctx.fillStyle='#fff';ctx.fillText('فلپی فارسی',W/2,H/2-26);\n    ctx.font='14px Vazirmatn';ctx.fillStyle='#94a3b8';ctx.fillText('کلیک یا لمس = پرواز',W/2,H/2+12);\n    ctx.font='12px Vazirmatn';ctx.fillStyle='#475569';ctx.fillText('Space هم کار می‌کنه!',W/2,H/2+36);\n    if(record>0){ctx.font='13px Vazirmatn';ctx.fillStyle='#EF9F27';ctx.fillText('رکورد: '+record,W/2,H/2+62);}\n  }\n\n  if(state==='dead'){\n    ctx.fillStyle='rgba(6,11,24,0.78)';ctx.fillRect(0,0,W,H);\n    ctx.font='48px serif';ctx.textAlign='center';ctx.fillText(score>record-1&&score>0?'🏆':'💥',W/2,H/2-90);\n    ctx.font='bold 24px Vazirmatn';ctx.fillStyle='#fff';ctx.fillText(score===record&&score>0?'رکورد جدید!':'تموم شد!',W/2,H/2-40);\n    ctx.font='bold 44px Vazirmatn';ctx.fillStyle='#EF9F27';ctx.fillText(score,W/2,H/2+14);\n    ctx.font='14px Vazirmatn';ctx.fillStyle='#a78bfa';ctx.fillText('رکورد: '+record,W/2,H/2+48);\n    ctx.font='12px Vazirmatn';ctx.fillStyle='#475569';ctx.fillText('کلیک کن تا دوباره بازی کنی',W/2,H/2+76);\n  }\n}\n\nfunction loop(){\n  if(state==='playing')update();\n  draw();\n  requestAnimationFrame(loop);\n}\nloop();\n<\\/script>\n</body>\n</html>\n", "car": "<!DOCTYPE html>\n<html lang=\"fa\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>AI GAME - CYBER DRIFT PRO</title>\n\n<style>\n\n*{\nmargin:0;\npadding:0;\nbox-sizing:border-box;\nfont-family:tahoma;\n}\n\nbody{\noverflow:hidden;\nbackground:black;\ntouch-action:none;\n}\n\ncanvas{\ndisplay:block;\nbackground:#0f172a;\n}\n\n.ui{\nposition:fixed;\ntop:10px;\nwidth:100%;\ndisplay:flex;\njustify-content:space-around;\ncolor:white;\nfont-size:18px;\nz-index:10;\ntext-shadow:0 0 10px cyan;\n}\n\n.title{\nposition:fixed;\ntop:45px;\nwidth:100%;\ntext-align:center;\nfont-size:30px;\ncolor:#00ffff;\ntext-shadow:0 0 20px cyan;\nz-index:10;\n}\n\n.credit{\nposition:fixed;\nbottom:10px;\nwidth:100%;\ntext-align:center;\ncolor:white;\nfont-size:12px;\nopacity:.8;\nz-index:10;\n}\n\n.hearts{\nposition:fixed;\ntop:82px;\nleft:50%;\ntransform:translateX(-50%);\nfont-size:26px;\nz-index:10;\n}\n\n.menu,\n.shop{\nposition:fixed;\ninset:0;\nbackground:rgba(0,0,0,.85);\ndisplay:flex;\njustify-content:center;\nalign-items:center;\nflex-direction:column;\nz-index:20;\ncolor:white;\npadding:20px;\noverflow:auto;\n}\n\n.shop{\ndisplay:none;\n}\n\n.menu h1,\n.shop h1{\nfont-size:clamp(40px,10vw,80px);\nmargin-bottom:20px;\ncolor:#00ffff;\ntext-shadow:0 0 25px cyan;\n}\n\nbutton{\npadding:14px 30px;\nmargin:8px;\nborder:none;\nborder-radius:14px;\nbackground:#06b6d4;\ncolor:white;\nfont-size:18px;\ncursor:pointer;\n}\n\n.carBtn{\nwidth:260px;\n}\n\n</style>\n</head>\n<body style=\"user-select:none;-webkit-user-select:none\">\n\n<div class=\"ui\">\n<div>⭐ <span id=\"score\">0</span></div>\n<div>🪙 <span id=\"coins\">0</span></div>\n<div>⚡ <span id=\"speed\">1</span></div>\n</div>\n\n<div class=\"title\">\n🚗 AI GAME\n</div>\n\n<div class=\"hearts\" id=\"hearts\">\n❤️❤️❤️\n</div>\n\n\n\n<!-- MENU -->\n\n<div class=\"menu\" id=\"menu\">\n\n<h1>CYBER DRIFT</h1>\n\n<button onclick=\"startGame('easy')\">\n🟢 Easy\n</button>\n\n<button onclick=\"startGame('medium')\">\n🟡 Medium\n</button>\n\n<button onclick=\"startGame('hard')\">\n🔴 Hard\n</button>\n\n<button onclick=\"openShop()\">\n🛒 فروشگاه ماشین\n</button>\n\n</div>\n\n<!-- SHOP -->\n\n<div class=\"shop\" id=\"shop\">\n\n<h1>GARAGE</h1>\n\n<div id=\"garage\"></div>\n\n<button onclick=\"closeShop()\">\nبرگشت\n</button>\n\n</div>\n\n<canvas id=\"game\"></canvas>\n\n<script>\n\nconst canvas =\ndocument.getElementById(\"game\");\n\nconst ctx =\ncanvas.getContext(\"2d\");\n\ncanvas.width = innerWidth;\ncanvas.height = innerHeight;\n\nlet gameStarted = false;\n\nlet score = 0;\nlet speed = 1;\nlet lives = 3;\n\nlet enemyRate = 1200;\nlet enemySpeed = 7;\n\nlet coins =\nparseInt(localStorage.getItem(\"coins\")) || 0;\n\ndocument.getElementById(\"coins\").innerText =\ncoins;\n\n\n// ---------- CARS ----------\n\nconst cars = [\n\n{name:\"Neon Starter\",price:0,color:\"#00ffff\"},\n{name:\"Cyber X\",price:100,color:\"#22c55e\"},\n{name:\"Phantom GT\",price:250,color:\"#a855f7\"},\n{name:\"Turbo ZX\",price:350,color:\"#f59e0b\"},\n{name:\"Inferno R\",price:450,color:\"#ef4444\"},\n{name:\"AI Destroyer\",price:600,color:\"#ffffff\"}\n\n];\n\nlet owned =\nJSON.parse(localStorage.getItem(\"owned\")) || [0];\n\nlet selectedCar =\nparseInt(localStorage.getItem(\"selectedCar\")) || 0;\n\n\n// ---------- PLAYER ----------\n\nconst car = {\n\nx:canvas.width/2,\ny:canvas.height-180,\nwidth:42,\nheight:75,\nturn:0\n\n};\n\n\n// ---------- ARRAYS ----------\n\nlet roadLines = [];\nlet enemies = [];\nlet particles = [];\nlet roadCoins = [];\n\n\n// ---------- ROAD ----------\n\nfor(let i=0;i<20;i++){\n\nroadLines.push({\n\ny:i*80\n\n});\n\n}\n\n\n// ---------- AUDIO ----------\n\nconst audioCtx =\nnew(window.AudioContext ||\nwindow.webkitAudioContext)();\n\nfunction beep(freq,duration,type=\"square\"){\n\nconst osc = audioCtx.createOscillator();\nconst gain = audioCtx.createGain();\n\nosc.type = type;\nosc.frequency.value = freq;\n\nosc.connect(gain);\ngain.connect(audioCtx.destination);\n\nosc.start();\n\ngain.gain.setValueAtTime(.08,audioCtx.currentTime);\n\ngain.gain.exponentialRampToValueAtTime(\n0.0001,\naudioCtx.currentTime + duration\n);\n\nosc.stop(audioCtx.currentTime + duration);\n}\n\nfunction coinSound(){\n\nbeep(700,.05);\n\n}\n\nfunction crashSound(){\n\nbeep(100,.4,\"sawtooth\");\n\n}\n\n\n// ---------- START ----------\n\nfunction startGame(mode){\n\ndocument.getElementById(\"menu\").style.display =\n\"none\";\n\ngameStarted = true;\n\nif(mode===\"easy\"){\n\nenemyRate = 1500;\nenemySpeed = 6;\n\n}\n\nif(mode===\"medium\"){\n\nenemyRate = 1000;\nenemySpeed = 8;\n\n}\n\nif(mode===\"hard\"){\n\nenemyRate = 650;\nenemySpeed = 11;\n\n}\n\nspawnEnemies();\nspawnCoins();\n\nupdate();\n\n}\n\n\n// ---------- TOUCH ----------\n\nwindow.addEventListener(\"touchmove\",e=>{\n\nconst touch = e.touches[0];\n\ncar.x +=\n(touch.clientX - car.x)*0.12;\n\n});\n\n\n// ---------- ENEMIES ----------\n\nfunction spawnEnemies(){\n\nsetInterval(()=>{\n\nif(!gameStarted) return;\n\nenemies.push({\n\nx:100 + Math.random()*(canvas.width-200),\ny:-120,\nwidth:42,\nheight:75,\nspeed:enemySpeed + Math.random()*4\n\n});\n\n},enemyRate);\n\n}\n\n\n// ---------- COINS ----------\n\nfunction spawnCoins(){\n\nsetInterval(()=>{\n\nif(!gameStarted) return;\n\nroadCoins.push({\n\nx:110 + Math.random()*(canvas.width-220),\ny:-50,\nsize:14\n\n});\n\n},1200);\n\n}\n\n\n// ---------- PARTICLES ----------\n\nfunction explosion(x,y,color=\"orange\"){\n\nfor(let i=0;i<25;i++){\n\nparticles.push({\n\nx,\ny,\ndx:(Math.random()-.5)*10,\ndy:(Math.random()-.5)*10,\nsize:Math.random()*7,\ncolor\n\n});\n\n}\n\n}\n\n\n// ---------- DRAW CAR ----------\n\nfunction drawCar(x,y,color){\n\nctx.save();\n\nctx.translate(x,y);\n\nctx.rotate(car.turn);\n\nctx.shadowBlur = 25;\nctx.shadowColor = color;\n\nctx.fillStyle = color;\n\nctx.fillRect(-20,-35,40,70);\n\nctx.fillStyle = \"#111827\";\n\nctx.fillRect(-14,-18,28,25);\n\nctx.fillStyle = \"white\";\n\nctx.fillRect(-16,-34,8,8);\nctx.fillRect(8,-34,8,8);\n\nctx.fillStyle = \"red\";\n\nctx.fillRect(-16,26,8,8);\nctx.fillRect(8,26,8,8);\n\nctx.restore();\n\n}\n\n\n// ---------- UPDATE ----------\n\nfunction update(){\n\nif(!gameStarted) return;\n\nctx.clearRect(0,0,canvas.width,canvas.height);\n\n\n// road\n\nctx.fillStyle = \"#111827\";\n\nctx.fillRect(\n80,\n0,\ncanvas.width-160,\ncanvas.height\n);\n\n\n// borders\n\nctx.fillStyle = \"cyan\";\n\nctx.fillRect(70,0,5,canvas.height);\n\nctx.fillRect(\ncanvas.width-75,\n0,\n5,\ncanvas.height\n);\n\n\n// lines\n\nroadLines.forEach(l=>{\n\nl.y += 14;\n\nctx.fillStyle = \"white\";\n\nctx.fillRect(\ncanvas.width/2-5,\nl.y,\n10,\n50\n);\n\nif(l.y > canvas.height){\n\nl.y = -80;\n\n}\n\n});\n\n\n// player\n\ncar.x =\nMath.max(110,\nMath.min(canvas.width-110,car.x));\n\ndrawCar(\ncar.x,\ncar.y,\ncars[selectedCar].color\n);\n\n\n// enemies\n\nenemies.forEach((e,index)=>{\n\ne.y += e.speed;\n\ndrawCar(e.x,e.y,\"#ef4444\");\n\n\n// collision\n\nif(\n\ncar.x < e.x + 35 &&\ncar.x + 35 > e.x &&\ncar.y < e.y + 60 &&\ncar.y + 60 > e.y\n\n){\n\ncrashSound();\n\nexplosion(car.x,car.y,\"red\");\n\nnavigator.vibrate?.(200);\n\nlives--;\n\nupdateHearts();\n\nenemies.splice(index,1);\n\nif(lives <= 0){\n\nlocalStorage.setItem(\"coins\",coins);\n\nsetTimeout(()=>{\n\nlocation.reload();\n\n},1000);\n\n}\n\n}\n\n\n// remove\n\nif(e.y > canvas.height){\n\nscore += 10;\n\nenemies.splice(index,1);\n\n}\n\n});\n\n\n// coins\n\nroadCoins.forEach((c,index)=>{\n\nc.y += 9;\n\nctx.beginPath();\n\nctx.arc(c.x,c.y,c.size,0,Math.PI*2);\n\nctx.fillStyle = \"gold\";\n\nctx.shadowBlur = 15;\nctx.shadowColor = \"yellow\";\n\nctx.fill();\n\nctx.fillStyle = \"#111\";\n\nctx.font = \"14px Arial\";\n\nctx.fillText(\"🪙\",c.x-9,c.y+5);\n\n\n// collect\n\nconst dist =\nMath.hypot(\ncar.x-c.x,\ncar.y-c.y\n);\n\nif(dist < 40){\n\ncoins += 5;\n\ncoinSound();\n\ndocument.getElementById(\"coins\").innerText =\ncoins;\n\nlocalStorage.setItem(\"coins\",coins);\n\nroadCoins.splice(index,1);\n\n}\n\n\n// remove\n\nif(c.y > canvas.height){\n\nroadCoins.splice(index,1);\n\n}\n\n});\n\n\n// particles\n\nparticles.forEach((p,index)=>{\n\np.x += p.dx;\np.y += p.dy;\n\np.size *= .95;\n\nctx.fillStyle = p.color;\n\nctx.fillRect(\np.x,\np.y,\np.size,\np.size\n);\n\nif(p.size < .5){\n\nparticles.splice(index,1);\n\n}\n\n});\n\n\n// rain\n\nfor(let i=0;i<30;i++){\n\nctx.fillStyle =\n\"rgba(255,255,255,.12)\";\n\nctx.fillRect(\nMath.random()*canvas.width,\nMath.random()*canvas.height,\n2,\n14\n);\n\n}\n\n\n// ui\n\nspeed =\n1 + Math.floor(score/120);\n\ndocument.getElementById(\"score\").innerText =\nscore;\n\ndocument.getElementById(\"speed\").innerText =\nspeed;\n\nrequestAnimationFrame(update);\n\n}\n\n\n// ---------- HEARTS ----------\n\nfunction updateHearts(){\n\nlet text = \"\";\n\nfor(let i=0;i<lives;i++){\n\ntext += \"❤️\";\n\n}\n\ndocument.getElementById(\"hearts\").innerText =\ntext;\n\n}\n\n\n// ---------- SHOP ----------\n\nfunction openShop(){\n\ndocument.getElementById(\"shop\").style.display =\n\"flex\";\n\nrenderGarage();\n\n}\n\nfunction closeShop(){\n\ndocument.getElementById(\"shop\").style.display =\n\"none\";\n\n}\n\nfunction renderGarage(){\n\nconst garage =\ndocument.getElementById(\"garage\");\n\ngarage.innerHTML = \"\";\n\ncars.forEach((c,index)=>{\n\nconst btn =\ndocument.createElement(\"button\");\n\nbtn.className = \"carBtn\";\n\nif(owned.includes(index)){\n\nbtn.innerText =\n`🚗 ${c.name} - انتخاب`;\n\nbtn.onclick = ()=>{\n\nselectedCar = index;\n\nlocalStorage.setItem(\n\"selectedCar\",\nselectedCar\n);\n\nrenderGarage();\n\n};\n\n}else{\n\nbtn.innerText =\n`🚗 ${c.name} - 🪙 ${c.price}`;\n\nbtn.onclick = ()=>{\n\nif(coins >= c.price){\n\ncoins -= c.price;\n\nowned.push(index);\n\nlocalStorage.setItem(\n\"coins\",\ncoins\n);\n\nlocalStorage.setItem(\n\"owned\",\nJSON.stringify(owned)\n);\n\ndocument.getElementById(\"coins\").innerText =\ncoins;\n\nrenderGarage();\n\n}\n\n};\n\n}\n\ngarage.appendChild(btn);\n\n});\n\n}\n\n\n// ---------- RESIZE ----------\n\nwindow.addEventListener(\"resize\",()=>{\n\ncanvas.width = innerWidth;\ncanvas.height = innerHeight;\n\n});\n\n<\\/script>\n\n</body>\n</html>", "worldcup": "<!DOCTYPE html>\n<html lang=\"fa\" dir=\"rtl\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover\">\n    <title>ایران در جام جهانی</title>\n    <style>\n        /* ===== فونت استاندارد و سبک ===== */\n        @font-face {\n            font-family: 'Vazir';\n            src: local('Vazir'), local('Vazirmatn'), local('Vazirmatn-FD'),\n                 url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css') format('woff2');\n            font-weight: normal;\n            font-style: normal;\n            font-display: swap;\n        }\n\n        @font-face {\n            font-family: 'Vazir';\n            src: local('Vazir Bold'), local('Vazirmatn Bold'), local('Vazirmatn-FD-Bold');\n            font-weight: bold;\n            font-style: normal;\n            font-display: swap;\n        }\n\n        * {\n            box-sizing: border-box;\n            margin: 0;\n            padding: 0;\n        }\n\n        html, body {\n            height: 100%;\n            margin: 0;\n            padding: 0;\n            background: #04080a;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            font-family: 'Vazir', 'Segoe UI', Tahoma, 'Tahoma', sans-serif;\n            -webkit-font-smoothing: antialiased;\n            -moz-osx-font-smoothing: grayscale;\n        }\n\n        #iq-root {\n            font-family: 'Vazir', 'Segoe UI', Tahoma, 'Tahoma', sans-serif;\n            direction: rtl;\n            width: 100%;\n            max-width: 460px;\n            margin: 0 auto;\n            background: #04080a;\n            border-radius: 24px;\n            overflow: hidden;\n            position: relative;\n            border: 1px solid rgba(0, 100, 60, 0.3);\n            height: auto;\n            min-height: 100vh;\n            max-height: none;\n        }\n\n        #iq-root * {\n            box-sizing: border-box;\n            font-family: 'Vazir', 'Segoe UI', Tahoma, 'Tahoma', sans-serif;\n        }\n\n        /* ===== بقیه استایل‌ها ===== */\n        @keyframes gradMove {\n            0% {\n                background-position: 0% 50%\n            }\n            50% {\n                background-position: 100% 50%\n            }\n            100% {\n                background-position: 0% 50%\n            }\n        }\n        @keyframes floatBlob {\n            0%,\n            100% {\n                transform: translate(0, 0)\n            }\n            50% {\n                transform: translate(12px, -18px)\n            }\n        }\n        @keyframes shimmer {\n            0% {\n                background-position: -200% center\n            }\n            100% {\n                background-position: 200% center\n            }\n        }\n        @keyframes popIn {\n            0% {\n                transform: scale(1)\n            }\n            50% {\n                transform: scale(1.05)\n            }\n            100% {\n                transform: scale(1.02)\n            }\n        }\n        @keyframes fadeUp {\n            from {\n                opacity: 0;\n                transform: translateY(8px)\n            }\n            to {\n                opacity: 1;\n                transform: translateY(0)\n            }\n        }\n        @keyframes flagWave {\n            0%,\n            100% {\n                transform: skewX(0deg)\n            }\n            50% {\n                transform: skewX(-2deg)\n            }\n        }\n        @keyframes pulse {\n            0%,\n            100% {\n                opacity: .7\n            }\n            50% {\n                opacity: 1\n            }\n        }\n\n        #iq-bg {\n            position: absolute;\n            inset: 0;\n            pointer-events: none;\n            overflow: hidden\n        }\n        #iq-bg-g {\n            position: absolute;\n            inset: 0;\n            background: linear-gradient(135deg, #04080a, #001a0d, #060c04, #00100a);\n            background-size: 400% 400%;\n            animation: gradMove 10s ease infinite\n        }\n        .iq-blob {\n            position: absolute;\n            border-radius: 50%;\n            filter: blur(55px)\n        }\n        .iq-b1 {\n            width: 280px;\n            height: 280px;\n            background: rgba(0, 180, 80, 0.12);\n            top: -80px;\n            right: -60px;\n            animation: floatBlob 7s ease-in-out infinite\n        }\n        .iq-b2 {\n            width: 220px;\n            height: 220px;\n            background: rgba(255, 255, 255, 0.05);\n            bottom: -50px;\n            left: -40px;\n            animation: floatBlob 9s ease-in-out infinite reverse\n        }\n        .iq-b3 {\n            width: 160px;\n            height: 160px;\n            background: rgba(200, 30, 30, 0.08);\n            top: 45%;\n            left: 35%;\n            animation: floatBlob 6s ease-in-out infinite\n        }\n        #iq-grid {\n            position: absolute;\n            inset: 0;\n            background-image: linear-gradient(rgba(0, 200, 80, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 200, 80, 0.025) 1px, transparent 1px);\n            background-size: 22px 22px\n        }\n\n        #iq-c {\n            position: relative;\n            z-index: 2;\n            padding: 16px 14px 14px\n        }\n\n        /* header */\n        #iq-header {\n            text-align: center;\n            margin-bottom: 14px\n        }\n        #iq-flag-bar {\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            gap: 0;\n            margin-bottom: 8px;\n            border-radius: 8px;\n            overflow: hidden;\n            height: 20px;\n            animation: flagWave 4s ease-in-out infinite\n        }\n        .iq-fb {\n            height: 100%;\n            flex: 1\n        }\n        .iq-f1 {\n            background: #239f40\n        }\n        .iq-f2 {\n            background: #fff;\n            position: relative\n        }\n        .iq-f2::after {\n            content: '☪';\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            transform: translate(-50%, -50%);\n            font-size: 12px;\n            color: #239f40;\n            line-height: 1\n        }\n        .iq-f3 {\n            background: #ef4444\n        }\n        #iq-title {\n            font-size: 20px;\n            font-weight: 900;\n            letter-spacing: .5px;\n            margin-bottom: 4px;\n            background: linear-gradient(90deg, #22c55e, #fff, #ef4444, #fff, #22c55e);\n            background-size: 300% auto;\n            -webkit-background-clip: text;\n            background-clip: text;\n            -webkit-text-fill-color: transparent;\n            animation: shimmer 4s linear infinite\n        }\n        #iq-sub {\n            display: inline-flex;\n            align-items: center;\n            gap: 4px;\n            font-size: 10px;\n            font-weight: 700;\n            padding: 4px 14px;\n            border-radius: 20px;\n            background: rgba(34, 197, 94, 0.1);\n            color: #4ade80;\n            border: 1px solid rgba(34, 197, 94, 0.25)\n        }\n\n        /* progress */\n        #iq-prog-wrap {\n            margin-bottom: 12px\n        }\n        #iq-prog-top {\n            display: flex;\n            justify-content: space-between;\n            font-size: 10px;\n            color: #1a3d25;\n            margin-bottom: 4px\n        }\n        #iq-prog-top span:last-child {\n            color: #22c55e;\n            font-weight: 700\n        }\n        #iq-prog-bg {\n            height: 4px;\n            border-radius: 3px;\n            background: rgba(255, 255, 255, 0.05)\n        }\n        #iq-prog-fill {\n            height: 100%;\n            border-radius: 3px;\n            background: linear-gradient(90deg, #22c55e, #fff, #ef4444);\n            background-size: 200% auto;\n            animation: gradMove 3s linear infinite;\n            transition: width .5s ease\n        }\n\n        /* stats */\n        #iq-stats {\n            display: flex;\n            margin-bottom: 12px;\n            border: 1px solid rgba(255, 255, 255, 0.07);\n            border-radius: 14px;\n            overflow: hidden;\n            background: rgba(255, 255, 255, 0.02)\n        }\n        #iq-stats .iq-st {\n            flex: 1;\n            padding: 8px 4px;\n            text-align: center;\n            border-left: 1px solid rgba(255, 255, 255, 0.06)\n        }\n        #iq-stats .iq-st:last-child {\n            border-left: none\n        }\n        .iq-sn {\n            font-size: 16px;\n            font-weight: 900;\n            color: #fff\n        }\n        .iq-sn.gn {\n            color: #4ade80\n        }\n        .iq-sn.rd {\n            color: #f87171\n        }\n        .iq-sn.wh {\n            background: linear-gradient(90deg, #22c55e, #fff);\n            -webkit-background-clip: text;\n            background-clip: text;\n            -webkit-text-fill-color: transparent\n        }\n        .iq-sl {\n            font-size: 8px;\n            color: #1a3d25;\n            margin-top: 1px\n        }\n\n        /* question card */\n        #iq-qcard {\n            border: 1px solid rgba(34, 197, 94, 0.2);\n            border-radius: 18px;\n            padding: 16px 14px;\n            background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(255, 255, 255, 0.03), rgba(239, 68, 68, 0.04));\n            margin-bottom: 12px;\n            min-height: 100px;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: center;\n            text-align: center;\n            position: relative;\n            overflow: hidden\n        }\n        #iq-qcard::before {\n            content: '';\n            position: absolute;\n            inset: 0;\n            background: radial-gradient(ellipse at 50% 0%, rgba(34, 197, 94, 0.07) 0%, transparent 70%);\n            pointer-events: none\n        }\n        #iq-qicon {\n            font-size: 34px;\n            margin-bottom: 6px;\n            position: relative;\n            z-index: 1\n        }\n        #iq-qnum {\n            font-size: 9px;\n            color: #1a5c30;\n            margin-bottom: 4px;\n            font-weight: 700;\n            letter-spacing: 1px;\n            position: relative;\n            z-index: 1\n        }\n        #iq-qtext {\n            font-size: 14px;\n            color: #e8f5e0;\n            line-height: 1.7;\n            font-weight: 500;\n            position: relative;\n            z-index: 1;\n            word-break: break-word\n        }\n\n        /* options */\n        #iq-opts {\n            display: grid;\n            grid-template-columns: 1fr 1fr;\n            gap: 8px;\n            margin-bottom: 10px\n        }\n        .iq-opt {\n            border: 1px solid rgba(255, 255, 255, 0.08);\n            border-radius: 12px;\n            padding: 12px 8px;\n            background: rgba(255, 255, 255, 0.02);\n            color: #b0c8b0;\n            font-size: 12px;\n            cursor: pointer;\n            text-align: center;\n            font-family: 'Vazir', 'Segoe UI', Tahoma, 'Tahoma', sans-serif;\n            line-height: 1.3;\n            transition: all .18s;\n            font-weight: 500;\n            min-height: 44px;\n            word-break: break-word\n        }\n        .iq-opt:hover:not(:disabled) {\n            border-color: rgba(34, 197, 94, 0.55);\n            background: rgba(34, 197, 94, 0.1);\n            color: #fff;\n            transform: translateY(-1px);\n            box-shadow: 0 4px 16px rgba(34, 197, 94, 0.15)\n        }\n        .iq-opt:disabled {\n            cursor: default\n        }\n        .iq-opt.correct {\n            border-color: #22c55e;\n            background: rgba(34, 197, 94, 0.18);\n            color: #86efac;\n            animation: popIn .25s ease forwards\n        }\n        .iq-opt.wrong {\n            border-color: #ef4444;\n            background: rgba(239, 68, 68, 0.12);\n            color: #fca5a5\n        }\n        .iq-opt.dim {\n            border-color: rgba(255, 255, 255, 0.03);\n            background: rgba(255, 255, 255, 0.01);\n            color: #1a3d25;\n            opacity: .45\n        }\n\n        /* explain */\n        #iq-explain {\n            border: 1px solid rgba(34, 197, 94, 0.18);\n            border-radius: 12px;\n            padding: 12px;\n            background: rgba(34, 197, 94, 0.05);\n            margin-bottom: 12px;\n            font-size: 12px;\n            color: #86c896;\n            line-height: 1.7;\n            display: none\n        }\n        #iq-explain.show {\n            display: block;\n            animation: fadeUp .35s ease\n        }\n        #iq-explain-lbl {\n            font-size: 10px;\n            color: #22c55e;\n            font-weight: 700;\n            margin-bottom: 5px;\n            display: flex;\n            align-items: center;\n            gap: 4px\n        }\n\n        /* feedback */\n        #iq-feedback {\n            text-align: center;\n            font-size: 12px;\n            min-height: 18px;\n            margin-bottom: 6px;\n            color: #1a3d25;\n            font-weight: 500\n        }\n        #iq-feedback.win {\n            color: #4ade80\n        }\n        #iq-feedback.lose {\n            color: #f87171\n        }\n\n        /* next */\n        #iq-next {\n            width: 100%;\n            padding: 12px;\n            border: none;\n            border-radius: 12px;\n            background: linear-gradient(90deg, #15803d, #22c55e, #dcfce7, #22c55e, #15803d);\n            background-size: 200% auto;\n            animation: gradMove 3s linear infinite;\n            color: #052e16;\n            font-size: 13px;\n            font-weight: 900;\n            cursor: pointer;\n            font-family: 'Vazir', 'Segoe UI', Tahoma, 'Tahoma', sans-serif;\n            display: none;\n            letter-spacing: .3px\n        }\n        #iq-next:hover {\n            opacity: .88\n        }\n\n        /* footer */\n        #iq-footer {\n            text-align: center;\n            margin-top: 6px;\n            padding-top: 10px;\n            border-top: 1px solid rgba(255, 255, 255, 0.05)\n        }\n        #iq-footer-l {\n            font-size: 9px;\n            color: #1a3d25;\n            margin-bottom: 3px\n        }\n        #iq-footer-b {\n            display: inline-flex;\n            align-items: center;\n            gap: 4px;\n            font-size: 9px;\n            padding: 3px 12px;\n            border-radius: 20px;\n            font-weight: 700;\n            background: rgba(34, 197, 94, 0.1);\n            color: #4ade80;\n            border: 1px solid rgba(34, 197, 94, 0.25)\n        }\n\n        /* overlay */\n        #iq-ov {\n            position: absolute;\n            inset: 0;\n            z-index: 20;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: center;\n            background: rgba(4, 8, 10, 0.96);\n            padding: 20px;\n            border-radius: 24px;\n            text-align: center\n        }\n        #iq-ov-icon {\n            font-size: 48px;\n            margin-bottom: 10px\n        }\n        #iq-ov-title {\n            font-size: 20px;\n            font-weight: 900;\n            text-align: center;\n            background: linear-gradient(90deg, #22c55e, #fff, #ef4444);\n            background-size: 300% auto;\n            animation: shimmer 4s linear infinite;\n            -webkit-background-clip: text;\n            background-clip: text;\n            -webkit-text-fill-color: transparent;\n            margin-bottom: 4px\n        }\n        #iq-ov-score {\n            font-size: 38px;\n            font-weight: 900;\n            color: #fff;\n            margin: 8px 0\n        }\n        #iq-ov-sub {\n            font-size: 11px;\n            color: #1a3d25;\n            text-align: center;\n            margin-bottom: 16px;\n            line-height: 1.6\n        }\n        #iq-ov-play,\n        #iq-ov-play2 {\n            padding: 12px 36px;\n            border: none;\n            border-radius: 12px;\n            background: linear-gradient(90deg, #15803d, #22c55e);\n            color: #052e16;\n            font-size: 13px;\n            font-weight: 900;\n            cursor: pointer;\n            font-family: 'Vazir', 'Segoe UI', Tahoma, 'Tahoma', sans-serif\n        }\n        #iq-ov-play2 {\n            padding: 12px 36px;\n            border: none;\n            border-radius: 12px;\n            background: linear-gradient(90deg, #15803d, #22c55e);\n            color: #052e16;\n            font-size: 13px;\n            font-weight: 900;\n            cursor: pointer;\n            font-family: 'Vazir', 'Segoe UI', Tahoma, 'Tahoma', sans-serif\n        }\n\n        /* ===== ریسپانسیو برای موبایل ===== */\n        @media screen and (max-width: 480px) {\n            #iq-root {\n                max-width: 100%;\n                border-radius: 0;\n                min-height: 100vh;\n                border: none;\n            }\n\n            #iq-c {\n                padding: 12px 10px 10px;\n            }\n\n            #iq-title {\n                font-size: 17px;\n            }\n\n            #iq-qtext {\n                font-size: 13px;\n                line-height: 1.6;\n            }\n\n            .iq-opt {\n                font-size: 11px;\n                padding: 10px 6px;\n                min-height: 38px;\n            }\n\n            #iq-opts {\n                gap: 6px;\n            }\n\n            .iq-sn {\n                font-size: 14px;\n            }\n\n            #iq-qcard {\n                padding: 14px 10px;\n                min-height: 80px;\n            }\n\n            #iq-qicon {\n                font-size: 28px;\n            }\n\n            #iq-stats .iq-st {\n                padding: 6px 2px;\n            }\n\n            #iq-ov-title {\n                font-size: 17px;\n            }\n\n            #iq-ov-score {\n                font-size: 30px;\n            }\n\n            #iq-ov-play,\n            #iq-ov-play2 {\n                padding: 10px 28px;\n                font-size: 12px;\n            }\n        }\n\n        @media screen and (max-width: 360px) {\n            #iq-qtext {\n                font-size: 12px;\n            }\n\n            .iq-opt {\n                font-size: 10px;\n                padding: 8px 4px;\n                min-height: 34px;\n            }\n\n            #iq-title {\n                font-size: 15px;\n            }\n\n            #iq-flag-bar {\n                height: 16px;\n            }\n        }\n    </style>\n</head>\n<body style=\"user-select:none;-webkit-user-select:none\">\n\n    <div id=\"iq-root\">\n        <div id=\"iq-bg\">\n            <div id=\"iq-bg-g\"></div>\n            <div class=\"iq-blob iq-b1\"></div>\n            <div class=\"iq-blob iq-b2\"></div>\n            <div class=\"iq-blob iq-b3\"></div>\n            <div id=\"iq-grid\"></div>\n        </div>\n        <div id=\"iq-c\">\n            <div id=\"iq-header\">\n                <div id=\"iq-flag-bar\">\n                    <div class=\"iq-fb iq-f1\"></div>\n                    <div class=\"iq-fb iq-f2\"></div>\n                    <div class=\"iq-fb iq-f3\"></div>\n                </div>\n                <div id=\"iq-title\">🏆 ایران در جام جهانی</div>\n                <div id=\"iq-sub\">⚽ ۳۰ سوال ویژه</div>\n            </div>\n            <div id=\"iq-prog-wrap\">\n                <div id=\"iq-prog-top\">\n                    <span id=\"iq-qlbl\">سوال ۱ از ۳۰</span>\n                    <span id=\"iq-ptlbl\">۰ امتیاز</span>\n                </div>\n                <div id=\"iq-prog-bg\">\n                    <div id=\"iq-prog-fill\" style=\"width:3%\"></div>\n                </div>\n            </div>\n            <div id=\"iq-stats\">\n                <div class=\"iq-st\">\n                    <div class=\"iq-sn gn\" id=\"iq-sc\">0</div>\n                    <div class=\"iq-sl\">درست</div>\n                </div>\n                <div class=\"iq-st\">\n                    <div class=\"iq-sn rd\" id=\"iq-sw\">0</div>\n                    <div class=\"iq-sl\">اشتباه</div>\n                </div>\n                <div class=\"iq-st\">\n                    <div class=\"iq-sn wh\" id=\"iq-sp\">0</div>\n                    <div class=\"iq-sl\">امتیاز</div>\n                </div>\n            </div>\n            <div id=\"iq-qcard\">\n                <div id=\"iq-qicon\">🇮🇷</div>\n                <div id=\"iq-qnum\">سوال ۱</div>\n                <div id=\"iq-qtext\">...</div>\n            </div>\n            <div id=\"iq-opts\"></div>\n            <div id=\"iq-explain\">\n                <div id=\"iq-explain-lbl\">💡 می‌دونستی؟</div>\n                <div id=\"iq-explain-tx\"></div>\n            </div>\n            <div id=\"iq-feedback\"></div>\n            <button id=\"iq-next\" type=\"button\">سوال بعدی ←</button>\n            <div id=\"iq-footer\">\n                <div id=\"iq-footer-l\"></div>\n                <div id=\"iq-footer-b\"></div>\n            </div>\n        </div>\n        <div id=\"iq-ov\">\n            <div id=\"iq-ov-icon\">🇮🇷</div>\n            <div id=\"iq-ov-title\">ایران در جام جهانی</div>\n            <div id=\"iq-ov-sub\">۳۰ سوال ویژه درباره تاریخ تیم ملی ایران<br>در جام‌های جهانی فوتبال<br><span style=\"color:#22c55e\">از ۱۹۷۸ تا ۲۰۲۶ 🏆</span></div>\n            <button id=\"iq-ov-play\" type=\"button\">شروع بازی ⚽</button>\n        </div>\n    </div>\n\n    <script>\n        (function() {\n            const Q = [\n                { i: '🗓️', q: 'اولین حضور ایران در جام جهانی در چه سالی بود؟', o: ['۱۹۷۴', '۱۹۷۸', '۱۹۸۲', '۱۹۸۶'], a: '۱۹۷۸',\n                    e: 'ایران برای اولین بار در جام جهانی ۱۹۷۸ آرژانتین حضور پیدا کرد.' },\n                { i: '🇺🇸', q: 'اولین برد ایران در تاریخ جام جهانی مقابل کدام تیم بود؟', o: ['آمریکا', 'پرتغال', 'اسپانیا', 'مراکش'],\n                    a: 'آمریکا', e: 'ایران در جام جهانی ۱۹۹۸ فرانسه با نتیجه ۲ بر ۱ آمریکا را شکست داد.' },\n                { i: '⭐', q: 'بهترین عملکرد ایران از نظر امتیاز در جام جهانی مربوط به کدام دوره است？', o: ['۱۹۹۸', '۲۰۰۶', '۲۰۱۸',\n                        '۲۰۲۲'\n                    ], a: '۲۰۱۸', e: 'ایران در جام جهانی ۲۰۱۸ موفق به کسب ۴ امتیاز شد.' },\n                { i: '🔢', q: 'ایران در جام جهانی ۲۰۱۸ چند امتیاز کسب کرد؟', o: ['۲', '۳', '۴', '۶'], a: '۴',\n                    e: 'یک برد و یک مساوی باعث شد ایران ۴ امتیاز کسب کند.' },\n                { i: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', q: 'ایران در جام جهانی ۲۰۲۲ کدام تیم را شکست داد؟', o: ['آمریکا', 'انگلیس', 'ولز', 'هلند'],\n                    a: 'ولز', e: 'ایران با نتیجه ۲ بر صفر ولز را شکست داد.' },\n                { i: '⚽', q: 'اولین گل ایران در تاریخ جام جهانی را چه کسی به ثمر رساند؟', o: ['علی دایی', 'ایرج دانایی‌فرد',\n                        'مهدی مهدوی‌کیا', 'کریم باقری'\n                    ], a: 'ایرج دانایی‌فرد', e: 'او در بازی مقابل اسکاتلند در سال ۱۹۷۸ گلزنی کرد.' },\n                { i: '🇫🇷', q: 'ایران در جام جهانی ۱۹۹۸ در چه گروهی قرار داشت؟', o: ['گروه A', 'گروه B', 'گروه F', 'گروه H'],\n                    a: 'گروه F', e: 'ایران با آلمان، یوگسلاوی و آمریکا همگروه بود.' },\n                { i: '🇲🇦', q: 'حریف ایران در اولین مسابقه جام جهانی ۲۰۱۸ چه تیمی بود？', o: ['اسپانیا', 'پرتغال', 'مراکش',\n                        'روسیه'\n                    ], a: 'مراکش', e: 'ایران با گل به خودی مراکش ۱ بر صفر پیروز شد.' },\n                { i: '🥅', q: 'کدام بازیکن گل پیروزی ایران مقابل آمریکا در جام جهانی ۱۹۹۸ را به ثمر رساند؟', o: ['علی دایی',\n                        'حمید استیلی', 'جواد نکونام', 'مهدی طارمی'\n                    ], a: 'حمید استیلی', e: 'استیلی گل اول ایران را با ضربه سر وارد دروازه آمریکا کرد.' },\n                { i: '🏆', q: 'تیم ملی ایران تاکنون (تا جام جهانی ۲۰۲۶) چند بار به جام جهانی صعود کرده است؟', o: ['۵ بار', '۶ بار',\n                        '۷ بار', '۸ بار'\n                    ], a: '۷ بار', e: 'ایران در سال‌های ۱۹۷۸، ۱۹۹۸، ۲۰۰۶، ۲۰۱۴، ۲۰۱۸، ۲۰۲۲ و ۲۰۲۶ به جام جهانی رسیده است.' },\n                { i: '🇳🇬', q: 'ایران در جام جهانی ۲۰۱۴ اولین بازی خود را مقابل کدام تیم انجام داد؟', o: ['آرژانتین', 'نیجریه',\n                        'بوسنی', 'آلمان'\n                    ], a: 'نیجریه', e: 'اولین مسابقه ایران در جام جهانی ۲۰۱۴ مقابل نیجریه بود که با تساوی ۰-۰ به پایان رسید.' },\n                { i: '0️⃣', q: 'نتیجه دیدار ایران و نیجریه در جام جهانی ۲۰۱۴ چه بود؟', o: ['۱-۰ ایران', '۰-۰', '۱-۱',\n                        '۲-۱ نیجریه'\n                    ], a: '۰-۰', e: 'این مسابقه اولین امتیاز ایران در جام جهانی ۲۰۱۴ را به همراه داشت.' },\n                { i: '🇦🇷', q: 'ایران در جام جهانی ۲۰۱۴ با اختلاف یک گل مقابل کدام تیم شکست خورد؟', o: ['اسپانیا', 'آرژانتین',\n                        'فرانسه', 'پرتغال'\n                    ], a: 'آرژانتین', e: 'ایران تا دقایق پایانی مقاومت کرد اما با گل لیونل مسی ۱ بر ۰ شکست خورد.' },\n                { i: '🌟', q: 'چه بازیکنی گل پیروزی آرژانتین مقابل ایران در جام جهانی ۲۰۱۴ را به ثمر رساند؟', o: ['دی‌ماریا',\n                        'آگوئرو', 'لیونل مسی', 'هیگواین'\n                    ], a: 'لیونل مسی', e: 'مسی در وقت‌های پایانی بازی گل زد و آرژانتین را پیروز کرد.' },\n                { i: '🇪🇸', q: 'ایران در جام جهانی ۲۰۱۸ مقابل کدام تیم شکست خورد؟', o: ['پرتغال', 'اسپانیا', 'مراکش', 'روسیه'],\n                    a: 'اسپانیا', e: 'ایران با نتیجه ۱ بر ۰ مقابل اسپانیا شکست خورد.' },\n                { i: '⚽', q: 'گل پیروزی اسپانیا مقابل ایران در جام جهانی ۲۰۱۸ را چه کسی زد؟', o: ['داوید سیلوا', 'ایسکو',\n                        'دیگو کاستا', 'موراتا'\n                    ], a: 'دیگو کاستا', e: 'تنها گل مسابقه توسط دیگو کاستا به ثمر رسید.' },\n                { i: '🌍', q: 'ایران در جام جهانی ۲۰۲۲ در گروهی با کدام تیم‌ها قرار داشت؟', o: ['انگلیس، ولز و آمریکا',\n                        'فرانسه، دانمارک و تونس', 'برزیل، صربستان و سوئیس', 'اسپانیا، آلمان و ژاپن'\n                    ], a: 'انگلیس، ولز و آمریکا', e: 'ایران در گروه B جام جهانی ۲۰۲۲ با این سه تیم هم‌گروه بود.' },\n                { i: '🔴', q: 'نتیجه بازی ایران و انگلیس در جام جهانی ۲۰۲۲ چه بود؟', o: ['۲-۱ انگلیس', '۴-۰ انگلیس',\n                        '۶-۲ انگلیس', '۳-۲ انگلیس'\n                    ], a: '۶-۲ انگلیس', e: 'این مسابقه نخستین بازی ایران در جام جهانی ۲۰۲۲ بود.' },\n                { i: '🇺🇸', q: 'ایران در جام جهانی ۲۰۲۲ با شکست مقابل کدام تیم از صعود بازماند؟', o: ['ولز', 'آمریکا', 'انگلیس',\n                        'هلند'\n                    ], a: 'آمریکا', e: 'ایران در آخرین بازی مرحله گروهی با نتیجه ۱ بر ۰ مقابل آمریکا شکست خورد.' },\n                { i: '👨‍💼', q: 'سرمربی تیم ملی ایران در جام جهانی ۲۰۱۸ چه کسی بود؟', o: ['برانکو ایوانکوویچ',\n                        'کارلوس کی‌روش', 'دراگان اسکوچیچ', 'امیر قلعه‌نویی'\n                    ], a: 'کارلوس کی‌روش', e: 'کارلوس کی‌روش هدایت تیم ملی ایران را در جام جهانی ۲۰۱۸ بر عهده داشت.' },\n                { i: '1️⃣', q: 'ایران در جام جهانی ۱۹۷۸ موفق به کسب چند امتیاز شد؟', o: ['۰', '۱', '۲', '۳'], a: '۱',\n                    e: 'ایران با تساوی ۱-۱ مقابل اسکاتلند تنها امتیاز خود را در آن دوره کسب کرد.' },\n                { i: '🤍', q: 'کدام تیم در جام جهانی ۲۰۱۸ با گل به خودی مقابل ایران شکست خورد؟', o: ['پرتغال', 'اسپانیا',\n                        'مراکش', 'روسیه'\n                    ], a: 'مراکش', e: 'ایران با گل به خودی عزیز بوحدوز در دقایق پایانی ۱ بر ۰ پیروز شد.' },\n                { i: '🇩🇪', q: 'ایران در جام جهانی ۲۰۰۶ در کدام کشور حضور داشت؟', o: ['فرانسه', 'آلمان', 'آفریقای جنوبی',\n                        'برزیل'\n                    ], a: 'آلمان', e: 'جام جهانی ۲۰۰۶ به میزبانی آلمان برگزار شد.' },\n                { i: '🇵🇹', q: 'ایران در جام جهانی ۲۰۰۶ با کدام تیم اروپایی هم‌گروه بود؟', o: ['ایتالیا', 'آلمان', 'پرتغال',\n                        'اسپانیا'\n                    ], a: 'پرتغال', e: 'ایران در گروه D با پرتغال، مکزیک و آنگولا هم‌گروه بود.' },\n                { i: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', q: 'دومین پیروزی تاریخ ایران در جام جهانی مقابل کدام تیم به دست آمد؟', o: ['آمریکا',\n                        'مراکش', 'ولز', 'نیجریه'\n                    ], a: 'ولز', e: 'ایران در جام جهانی ۲۰۲۲ با نتیجه ۲ بر صفر ولز را شکست داد.' },\n                { i: '🎯', q: 'کدام بازیکن گل تساوی ایران مقابل پرتغال در جام جهانی ۲۰۱۸ را زد؟', o: ['سردار آزمون',\n                        'علیرضا جهانبخش', 'کریم انصاری‌فرد', 'مهدی طارمی'\n                    ], a: 'کریم انصاری‌فرد', e: 'او از روی نقطه پنالتی گل تساوی را وارد دروازه پرتغال کرد.' },\n                { i: '4️⃣', q: 'ایران تا پایان جام جهانی ۲۰۲۲ چند پیروزی در تاریخ جام جهانی کسب کرده بود？', o: ['۲', '۳', '۴',\n                        '۵'\n                    ], a: '۳', e: 'ایران مقابل آمریکا (۱۹۹۸)، مراکش (۲۰۱۸) و ولز (۲۰۲۲) پیروز شد.' },\n                { i: '🇮🇷', q: 'کدام گل‌های ایران مقابل ولز در جام جهانی ۲۰۲۲ را به ثمر رساندند؟', o: ['طارمی و آزمون',\n                        'چشمی و رضائیان', 'جهانبخش و مهدوی‌کیا', 'انصاری‌فرد و نوراللهی'\n                    ], a: 'چشمی و رضائیان', e: 'روزبه چشمی و رامین رضائیان گل‌های پیروزی ایران مقابل ولز را زدند.' },\n                { i: '🏟️', q: 'ایران در جام جهانی ۲۰۱۴ با کدام تیم آمریکای لاتین روبرو شد？', o: ['برزیل', 'اروگوئه',\n                        'آرژانتین', 'شیلی'\n                    ], a: 'آرژانتین', e: 'ایران در مرحله گروهی جام جهانی ۲۰۱۴ با آرژانتین روبرو شد و ۱-۰ باخت.' },\n                { i: '📅', q: 'ایران در جام جهانی ۲۰۲۶ در کدام کشورها شرکت می‌کند؟', o: ['ژاپن', 'آمریکا، کانادا، مکزیک',\n                        'آلمان', 'اسپانیا و پرتغال'\n                    ], a: 'آمریکا، کانادا، مکزیک', e: 'جام جهانی ۲۰۲۶ به صورت مشترک در آمریکا، کانادا و مکزیک برگزار می‌شود.' },\n            ];\n\n            let qi = 0,\n                corr = 0,\n                wrng = 0,\n                pts = 0,\n                done = false,\n                shuffled = [];\n\n            function shuffle(a) {\n                return [...a].sort(() => Math.random() - 0.5)\n            }\n\n            let ax = null;\n\n            function beep(w) {\n                try {\n                    if (!ax) ax = new(window.AudioContext || window.webkitAudioContext)();\n                    const o = ax.createOscillator(),\n                        g = ax.createGain();\n                    o.connect(g);\n                    g.connect(ax.destination);\n                    if (w) {\n                        o.type = 'sine';\n                        o.frequency.setValueAtTime(523, ax.currentTime);\n                        o.frequency.setValueAtTime(659, ax.currentTime + 0.1);\n                        o.frequency.setValueAtTime(784, ax.currentTime + 0.2);\n                        g.gain.setValueAtTime(0.15, ax.currentTime);\n                        g.gain.exponentialRampToValueAtTime(0.001, ax.currentTime + 0.45);\n                        o.start();\n                        o.stop(ax.currentTime + 0.45);\n                    } else {\n                        o.type = 'square';\n                        o.frequency.setValueAtTime(200, ax.currentTime);\n                        o.frequency.setValueAtTime(140, ax.currentTime + 0.15);\n                        g.gain.setValueAtTime(0.1, ax.currentTime);\n                        g.gain.exponentialRampToValueAtTime(0.001, ax.currentTime + 0.3);\n                        o.start();\n                        o.stop(ax.currentTime + 0.3);\n                    }\n                } catch (e) {}\n            }\n\n            const R = document.getElementById('iq-root');\n            const $ = id => R.querySelector('#' + id);\n\n            function startGame() {\n                qi = 0;\n                corr = 0;\n                wrng = 0;\n                pts = 0;\n                done = false;\n                shuffled = shuffle(Q);\n                $('iq-ov').style.display = 'none';\n                $('iq-sc').textContent = 0;\n                $('iq-sw').textContent = 0;\n                $('iq-sp').textContent = 0;\n                $('iq-ptlbl').textContent = '۰ امتیاز';\n                renderQ();\n            }\n\n            function renderQ() {\n                done = false;\n                const q = shuffled[qi];\n                $('iq-qicon').textContent = q.i;\n                $('iq-qnum').textContent = 'سوال ' + (qi + 1);\n                $('iq-qtext').textContent = q.q;\n                $('iq-qlbl').textContent = 'سوال ' + (qi + 1) + ' از ' + Q.length;\n                $('iq-prog-fill').style.width = (((qi + 1) / Q.length) * 100) + '%';\n                $('iq-explain').className = '';\n                $('iq-next').style.display = 'none';\n                $('iq-feedback').textContent = '';\n                $('iq-feedback').className = '';\n                const w = $('iq-opts');\n                w.innerHTML = '';\n                shuffle(q.o).forEach(opt => {\n                    const b = document.createElement('button');\n                    b.className = 'iq-opt';\n                    b.textContent = opt;\n                    b.type = 'button';\n                    b.addEventListener('click', () => pick(opt === q.a, b, q));\n                    w.appendChild(b);\n                });\n            }\n\n            function pick(ok, btn, q) {\n                if (done) return;\n                done = true;\n                R.querySelectorAll('.iq-opt').forEach(b => {\n                    b.disabled = true;\n                    if (b.textContent === q.a) b.className = 'iq-opt correct';\n                    else if (b === btn && !ok) b.className = 'iq-opt wrong';\n                    else b.className = 'iq-opt dim';\n                });\n                if (ok) {\n                    corr++;\n                    pts += 10;\n                    beep(true);\n                    $('iq-feedback').textContent = 'درسته! 🎉';\n                    $('iq-feedback').className = 'win';\n                } else {\n                    wrng++;\n                    beep(false);\n                    $('iq-feedback').textContent = 'اشتباه بود!';\n                    $('iq-feedback').className = 'lose';\n                }\n                $('iq-sc').textContent = corr;\n                $('iq-sw').textContent = wrng;\n                $('iq-sp').textContent = pts;\n                $('iq-ptlbl').textContent = pts + ' امتیاز';\n                $('iq-explain-tx').textContent = q.e;\n                $('iq-explain').className = 'show';\n                $('iq-next').style.display = 'block';\n                $('iq-next').textContent = qi < Q.length - 1 ? 'سوال بعدی ←' : 'نتیجه نهایی 🏆';\n            }\n\n            function nextQ() {\n                qi++;\n                if (qi >= Q.length) {\n                    showResult();\n                    return;\n                }\n                renderQ();\n            }\n\n            function showResult() {\n                const ov = $('iq-ov');\n                ov.style.display = 'flex';\n                const p = corr / Q.length;\n                let ic, tl, sb;\n                if (p >= 0.85) {\n                    ic = '🏆';\n                    tl = 'قهرمان!';\n                    sb = 'دانش فوتبالی‌تون بی‌نظیره!';\n                } else if (p >= 0.6) {\n                    ic = '⭐';\n                    tl = 'عالی!';\n                    sb = 'هوادار واقعی تیم ملی!';\n                } else if (p >= 0.4) {\n                    ic = '🇮🇷';\n                    tl = 'خوب بود!';\n                    sb = 'کمی بیشتر مطالعه کن!';\n                } else {\n                    ic = '⚽';\n                    tl = 'تلاش کن!';\n                    sb = 'تاریخ تیم ملی رو بخون!';\n                }\n                ov.innerHTML = `\n                    <div id=\"iq-ov-icon\">${ic}</div>\n                    <div id=\"iq-ov-title\">${tl}</div>\n                    <div id=\"iq-ov-score\" style=\"font-size:38px;font-weight:900;color:#fff;margin:8px 0\">${corr} / ${Q.length}</div>\n                    <div id=\"iq-ov-sub\" style=\"font-size:11px;color:#1a3d25;text-align:center;margin-bottom:16px;line-height:1.6\">${sb}<br>امتیاز: ${pts}<br><span style=\"color:#22c55e;font-weight:700\"></span></div>\n                    <button id=\"iq-ov-play2\" type=\"button\" style=\"padding:12px 36px;border:none;border-radius:12px;background:linear-gradient(90deg,#15803d,#22c55e);color:#052e16;font-size:13px;font-weight:900;cursor:pointer;font-family:'Vazir','Segoe UI',Tahoma,'Tahoma',sans-serif\">دوباره بازی ⚽</button>\n                `;\n                R.querySelector('#iq-ov-play2').addEventListener('click', startGame);\n            }\n\n            $('iq-next').addEventListener('click', nextQ);\n            $('iq-ov-play').addEventListener('click', startGame);\n            startGame();\n        })();\n    <\\/script>\n\n</body>\n</html>"};

const Games = {
  start(id){
    const map = {
      memory:this.memory, g2048:this.g2048, react:this.react, whack:this.whack,
      snake:this.snake, ttt:this.ttt, simon:this.simon, math:this.math,
      color:this.color, puzzle:this.puzzle
    };
    if(map[id]) map[id].call(this);
  },

  memory(){
    const ICONS = [I.brain,I.zap,I.target,I.snake,I.grid,I.medal,I.coin,I.star];
    const deck = [...ICONS,...ICONS].sort(()=>Math.random()-.5);
    let flipped=[], matched=0, moves=0, lock=false;
    const body = document.getElementById('gbody');
    body.innerHTML = `<div class="mgrid" id="mgrid">${deck.map((ic,i)=>`
      <div class="mcard" data-i="${i}"><div class="face back">${I.grid}</div><div class="face front">${ic}</div></div>`).join('')}</div>`;
    App.setGameScore(0);
    const grid = document.getElementById('mgrid');
    grid.onclick = e=>{
      const c = e.target.closest('.mcard'); if(!c||lock) return;
      const i = +c.dataset.i;
      if(c.classList.contains('flip')||c.classList.contains('done')) return;
      c.classList.add('flip'); flipped.push({c,i}); App.haptic('light');
      if(flipped.length===2){
        lock=true; moves++; App.setGameScore(moves);
        const [a,b] = flipped;
        if(deck[a.i]===deck[b.i]){
          setTimeout(()=>{ a.c.classList.add('done'); b.c.classList.add('done');
            matched++; flipped=[]; lock=false; App.haptic('success'); Sound.play('match');
            if(matched===ICONS.length){
              const val = Math.max(0, 120 - moves*2);
              const r = rewardGame('memory', val, {coins: Math.max(2, 18 - Math.floor(moves/2)), minRec:3});
              Sound.play('win');
              setTimeout(()=>{
                App.openModal({icon:I.trophy, title:t('great'),
                  desc:t('won_in_moves',{n:moves})+(r.newRec?'\n'+t('new_record'):''),
                  coins: r.coins,
                  btns:[
                    {label:t('replay'), onClick:()=>{App.closeModal();App.startGame('memory');}},
                    {label:t('exit'), ghost:1, onClick:()=>{App.closeModal();App.closeGame();}}
                  ]});
              },400);
            }
          },300);
        } else {
          setTimeout(()=>{ a.c.classList.remove('flip'); b.c.classList.remove('flip');
            flipped=[]; lock=false; App.haptic('soft'); },700);
        }
      }
    };
    App.state.gState = {};
  },

  g2048(){
    let grid = Array(16).fill(0), score=0, over=false;
    const body = document.getElementById('gbody');
    body.innerHTML = `<div class="g2048" id="g2048"></div>
      <button class="btn ghost" style="margin-top:16px;max-width:340px" id="r2048">${I.refresh} ${t('restart')}</button>`;
    App.setGameScore(0);
    const el = document.getElementById('g2048');
    const add = ()=>{
      const empty = grid.map((v,i)=>v?null:i).filter(v=>v!==null);
      if(!empty.length) return;
      const i = empty[Math.floor(Math.random()*empty.length)];
      grid[i] = Math.random()<.9?2:4;
    };
    const render = ()=>{ el.innerHTML = grid.map(v=>`<div class="tile ${v?'t'+v:''}">${v||''}</div>`).join(''); App.setGameScore(score); };
    const canMove = ()=>{
      for(let i=0;i<16;i++){
        if(!grid[i]) return true;
        const r=Math.floor(i/4), c=i%4;
        if(c<3 && grid[i]===grid[i+1]) return true;
        if(r<3 && grid[i]===grid[i+4]) return true;
      }
      return false;
    };
    const endGame = (won)=>{
      over = true;
      const r = rewardGame('g2048', score, {coins: Math.min(18, Math.max(1, Math.floor(score/250))), minRec:3});
      App.haptic(won?'success':'warning');
      setTimeout(()=>App.openModal({icon:won?I.trophy:I.medal, title:won?t('you_won'):t('game_over'),
        desc:t('final_score',{s:score})+(r.newRec?'\n'+t('new_record'):''), coins: r.coins,
        btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('g2048');}},
              {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]}),300);
    };
    const check = ()=>{
      if(over) return;
      if(grid.includes(2048)) return endGame(true);
      if(grid.every(v=>v) && !canMove()) return endGame(false);
    };
    const move = dir=>{
      if(over) return;
      const before = grid.join(',');
      for(let k=0;k<4;k++){
        const line = [];
        for(let i=0;i<4;i++){
          let r,c;
          if(dir===0){r=i;c=k} else if(dir===1){r=k;c=3-i}
          else if(dir===2){r=3-i;c=k} else {r=k;c=i}
          line.push(grid[r*4+c]);
        }
        const filtered = line.filter(v=>v); const merged = [];
        for(let i=0;i<filtered.length;i++){
          if(filtered[i]===filtered[i+1]){ merged.push(filtered[i]*2); score+=filtered[i]*2; i++; }
          else merged.push(filtered[i]);
        }
        while(merged.length<4) merged.push(0);
        for(let i=0;i<4;i++){
          let r,c;
          if(dir===0){r=i;c=k} else if(dir===1){r=k;c=3-i}
          else if(dir===2){r=3-i;c=k} else {r=k;c=i}
          grid[r*4+c] = merged[i];
        }
      }
      if(grid.join(',')!==before){ add(); render(); App.haptic('light'); Sound.play('tap'); check(); }
    };
    const onKey = e=>{
      const m={ArrowUp:0,ArrowRight:1,ArrowDown:2,ArrowLeft:3,w:0,d:1,s:2,a:3,W:0,D:1,S:2,A:3};
      if(m[e.key]!==undefined){ e.preventDefault(); move(m[e.key]); }
    };
    let sx=0,sy=0;
    const ts = e=>{ sx=e.touches[0].clientX; sy=e.touches[0].clientY; };
    const te = e=>{
      const dx=e.changedTouches[0].clientX-sx, dy=e.changedTouches[0].clientY-sy;
      if(Math.abs(dx)<20&&Math.abs(dy)<20) return;
      if(Math.abs(dx)>Math.abs(dy)) move(dx>0?1:3); else move(dy>0?2:0);
    };
    document.addEventListener('keydown', onKey);
    el.addEventListener('touchstart', ts, {passive:true});
    el.addEventListener('touchend', te, {passive:true});
    document.getElementById('r2048').onclick = ()=>App.startGame('g2048');
    add(); add(); render();
    App.state.gState = { destroy(){ document.removeEventListener('keydown', onKey); } };
  },

  react(){
    let state='idle', start=0, times=[], best=null, timer;
    const body = document.getElementById('gbody');
    const render = ()=>{
      const cfg = {
        idle:{cls:'',icon:I.zap,h:t('ready'),p:t('click_start')},
        wait:{cls:'ready',icon:I.target,h:t('wait'),p:t('wait_green')},
        go:{cls:'go',icon:I.zap,h:t('hit'),p:'⚡'},
        done:{cls:'',icon:I.medal,h:best+' ms',p:t('try_better')}
      }[state];
      body.innerHTML = `<div class="reactBox ${cfg.cls}" id="reactBox">${cfg.icon}<h4>${cfg.h}</h4><p>${cfg.p}</p>
        ${times.length?`<p style="margin-top:8px;font-size:11px">${t('last_times')}: ${times.slice(-3).join(', ')} ms</p>`:''}</div>`;
      document.getElementById('reactBox').onclick = click;
    };
    const click = ()=>{
      App.haptic('medium');
      if(state==='idle'||state==='done'){
        state='wait'; render();
        const delay = 1500 + Math.random()*2500;
        timer = setTimeout(()=>{ state='go'; start=performance.now(); render(); App.haptic('heavy'); }, delay);
      } else if(state==='wait'){
        clearTimeout(timer); state='done'; render(); App.toast(t('too_early'));
      } else if(state==='go'){
        const tt = Math.round(performance.now()-start);
        times.push(tt); best = best===null?tt:Math.min(best,tt);
        state='done'; render();
        // برای reaction هر بازی خوب پاداش می‌دهد، رکورد جدید بیشتر
        const base = tt<220?6 : tt<300?4 : tt<400?3 : tt<550?2 : 1;
        const r = rewardGame('react', best, {coins: base, minRec:2, recBonus:2});
        App.haptic('success'); Sound.play('score');
        if(r.coins) App.toast(`+${r.coins} ${t('coin')}`);
      }
    };
    render();
    App.state.gState = { destroy(){ clearTimeout(timer); } };
  },

  whack(){
    let score=0, time=30, running=false, tick, spawn;
    const body = document.getElementById('gbody');
    body.innerHTML = `
      <div style="display:flex;justify-content:space-between;width:100%;max-width:340px;margin-bottom:14px;gap:8px">
        <div class="gscore" style="flex:1;justify-content:center">${I.zap} ${t('time')}: <span id="whTime">30</span>s</div>
        <div class="gscore" style="flex:1;justify-content:center">${I.star} ${t('score')}: <span id="whScore">0</span></div>
      </div>
      <div class="wgrid" id="wgrid">${Array(9).fill(0).map((_,i)=>`<div class="hole" data-i="${i}"><div class="mole"></div></div>`).join('')}</div>
      <button class="btn" style="margin-top:18px;max-width:340px" id="whStart">${I.play} ${t('start')}</button>`;
    const grid = document.getElementById('wgrid');
    const spawnMole = ()=>{
      if(!running) return;
      grid.querySelectorAll('.hole').forEach(h=>h.classList.remove('up','hit'));
      grid.querySelector(`[data-i="${Math.floor(Math.random()*9)}"]`).classList.add('up');
      spawn = setTimeout(spawnMole, 700 + Math.random()*500);
    };
    grid.onclick = e=>{
      const h = e.target.closest('.hole'); if(!h||!running) return;
      if(h.classList.contains('up') && !h.classList.contains('hit')){
        h.classList.add('hit'); score++; document.getElementById('whScore').textContent = score;
        App.haptic('medium'); Sound.play('tap'); setTimeout(()=>h.classList.remove('up','hit'),150);
      }
    };
    document.getElementById('whStart').onclick = ()=>{
      running = true; score = 0; time = 30;
      document.getElementById('whScore').textContent = 0;
      document.getElementById('whTime').textContent = 30;
      document.getElementById('whStart').style.display = 'none';
      spawnMole();
      tick = setInterval(()=>{
        time--; document.getElementById('whTime').textContent = time;
        if(time<=0){
          clearInterval(tick); clearTimeout(spawn); running=false;
          grid.querySelectorAll('.hole').forEach(h=>h.classList.remove('up','hit'));
          const r = rewardGame('whack', score, {coins: Math.max(1, Math.floor(score/2.5)), minRec:2});
          App.haptic('success');
          App.openModal({icon:I.trophy, title:t('game_over'),
            desc:t('your_score',{s:score})+(r.newRec?'\n'+t('new_record'):''),
            coins: r.coins,
            btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('whack');}},
                  {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
        }
      },1000);
    };
    App.state.gState = { destroy(){ clearInterval(tick); clearTimeout(spawn); running=false; } };
  },

  snake(){
    const body = document.getElementById('gbody');
    body.innerHTML = `
      <div class="snake-wrap"><canvas id="snakeCanvas" width="320" height="320"></canvas></div>
      <div class="dpad">
        <div class="sp"></div><button class="dbtn" data-d="0">${I.up}</button><div class="sp"></div>
        <button class="dbtn" data-d="3">${I.left}</button><div class="sp"></div><button class="dbtn" data-d="1">${I.right}</button>
        <div class="sp"></div><button class="dbtn" data-d="2">${I.down}</button><div class="sp"></div>
      </div>`;
    const cv = document.getElementById('snakeCanvas');
    const ctx = cv.getContext('2d');
    const N = 16, S = cv.width/N;
    let snake = [{x:8,y:8}], dir = 1, food = rand(), score = 0, dead = false, tick;
    function rand(){ let p; do{ p={x:Math.floor(Math.random()*N),y:Math.floor(Math.random()*N)}; } while(snake.some(s=>s.x===p.x&&s.y===p.y)); return p; }
    const draw = ()=>{
      const cs = getComputedStyle(document.documentElement);
      ctx.fillStyle = cs.getPropertyValue('--card').trim()||'#151b2e';
      ctx.fillRect(0,0,cv.width,cv.height);
      ctx.strokeStyle = 'rgba(128,128,128,.06)'; ctx.lineWidth=1;
      for(let i=0;i<=N;i++){ ctx.beginPath(); ctx.moveTo(i*S,0); ctx.lineTo(i*S,cv.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0,i*S); ctx.lineTo(cv.width,i*S); ctx.stroke(); }
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.arc(food.x*S+S/2, food.y*S+S/2, S/2-2, 0, Math.PI*2); ctx.fill();
      snake.forEach((s,i)=>{
        const grd = ctx.createLinearGradient(s.x*S,s.y*S,(s.x+1)*S,(s.y+1)*S);
        if(i===0){ grd.addColorStop(0,'#a855f7'); grd.addColorStop(1,'#6366f1'); }
        else { grd.addColorStop(0,'#6366f1'); grd.addColorStop(1,'#3b82f6'); }
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.roundRect(s.x*S+1, s.y*S+1, S-2, S-2, 5); ctx.fill();
      });
      App.setGameScore(score);
    };
    const step = ()=>{
      if(dead) return;
      const h = {...snake[0]};
      if(dir===0) h.y--; else if(dir===1) h.x++; else if(dir===2) h.y++; else h.x--;
      if(h.x<0||h.y<0||h.x>=N||h.y>=N||snake.some(s=>s.x===h.x&&s.y===h.y)){
        dead = true; clearInterval(tick); App.haptic('error'); Sound.play('lose');
        const r = rewardGame('snake', score, {coins: Math.max(1, Math.floor(score/8)), minRec:2});
        App.openModal({icon:I.medal, title:t('you_lost'),
          desc:t('your_score',{s:score})+(r.newRec?'\n'+t('new_record'):''),
          coins: r.coins,
          btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('snake');}},
                {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
        return;
      }
      snake.unshift(h);
      if(h.x===food.x && h.y===food.y){ score+=10; food=rand(); App.haptic('success'); Sound.play('eat'); }
      else snake.pop();
      draw();
    };
    document.querySelectorAll('.dbtn').forEach(b=>{
      b.onclick = ()=>{
        const d = +b.dataset.d;
        if((d===0 && dir!==2)||(d===2 && dir!==0)||(d===1 && dir!==3)||(d===3 && dir!==1)) dir = d;
      };
    });
    const onKey = e=>{
      const m={ArrowUp:0,ArrowRight:1,ArrowDown:2,ArrowLeft:3};
      if(m[e.key]!==undefined){ e.preventDefault(); const d=m[e.key];
        if((d===0 && dir!==2)||(d===2 && dir!==0)||(d===1 && dir!==3)||(d===3 && dir!==1)) dir = d;
      }
    };
    document.addEventListener('keydown', onKey);
    tick = setInterval(step, 140);
    draw();
    App.state.gState = { destroy(){ clearInterval(tick); document.removeEventListener('keydown', onKey); } };
  },

  ttt(){
    let board = Array(9).fill(''), turn = 'x', over = false;
    const body = document.getElementById('gbody');
    const render = ()=>{
      body.innerHTML = `<div class="ttt" id="ttt">${board.map((v,i)=>`
        <div class="ttc ${v}" data-i="${i}">${v==='x'?I.xoX:v==='o'?I.xoO:''}</div>`).join('')}</div>
        <p style="margin-top:16px;color:var(--mut);font-size:13px">${over?'': (turn==='x'?'نوبت شما':'نوبت AI')}</p>`;
      if(!over) document.querySelectorAll('.ttc').forEach(c=>{
        c.onclick = ()=>{
          const i=+c.dataset.i; if(board[i]||over) return;
          board[i]='x'; App.haptic('light'); Sound.play('tap');
          if(check()) return;
          turn='o'; render();
          setTimeout(()=>{
            const empty = board.map((v,i)=>v?'':i).filter(v=>v!=='');
            if(!empty.length) return;
            // simple AI
            let move = empty[Math.floor(Math.random()*empty.length)];
            board[move]='o'; App.haptic('soft');
            if(check()) return;
            turn='x'; render();
          }, 400);
        };
      });
    };
    const check = ()=>{
      const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      for(const [a,b,c] of lines){
        if(board[a] && board[a]===board[b] && board[a]===board[c]){
          over=true; render();
          const won = board[a]==='x';
          if(won) App.setScore('ttt', (App.state.scores.ttt||0)+1);
          const r = rewardGame('ttt', won ? (App.state.scores.ttt||1) : 0, {coins: won?6:1, minRec:1});
          App.openModal({icon:won?I.trophy:I.medal, title:won?t('you_won'):t('you_lost'),
            coins:r.coins, btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('ttt');}},
                         {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
          return true;
        }
      }
      if(board.every(v=>v)){ over=true;
        const r = rewardGame('ttt', 0, {coins:3});
        App.openModal({icon:I.target, title:'مساوی!', coins:r.coins,
          btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('ttt');}},
                {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
        return true;
      }
      return false;
    };
    render();
    App.state.gState = {};
  },

  simon(){
    const colors = [
      {c:'#ef4444', glow:'rgba(239,68,68,.55)'},
      {c:'#10b981', glow:'rgba(16,185,129,.55)'},
      {c:'#3b82f6', glow:'rgba(59,130,246,.55)'},
      {c:'#f59e0b', glow:'rgba(245,158,11,.55)'}
    ];
    let seq=[], user=[], level=0, playing=false;
    const body = document.getElementById('gbody');
    body.innerHTML = `
      <div style="display:flex;justify-content:center;gap:10px;margin-bottom:14px;width:100%;max-width:280px">
        <div class="gscore" style="flex:1;justify-content:center">${I.star} سطح: <span id="simLevel">0</span></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;width:100%;max-width:280px" id="simonGrid">
        ${colors.map((col,i)=>`<div class="simon-btn" data-i="${i}" style="aspect-ratio:1;border-radius:22px;background:${col.c};opacity:.45;cursor:pointer;transition:all .18s cubic-bezier(.34,1.56,.64,1);box-shadow:0 6px 18px -6px ${col.glow};border:2px solid transparent"></div>`).join('')}
      </div>
      <p id="simonMsg" style="margin-top:20px;color:var(--mut);font-weight:600;font-size:14px">${t('ready')}</p>
      <button class="btn" style="margin-top:14px;max-width:280px" id="simonStart">${I.play} ${t('start')}</button>`;
    const btns = ()=>document.querySelectorAll('.simon-btn');
    const flash = (i)=>{
      const el = btns()[i];
      el.style.opacity='1';
      el.style.transform='scale(1.08)';
      el.style.boxShadow=`0 0 28px ${colors[i].glow}, 0 8px 20px -4px ${colors[i].glow}`;
      el.style.borderColor='rgba(255,255,255,.35)';
      setTimeout(()=>{
        el.style.opacity='.45';
        el.style.transform='';
        el.style.boxShadow=`0 6px 18px -6px ${colors[i].glow}`;
        el.style.borderColor='transparent';
      }, 320);
    };
    const playSeq = async ()=>{
      playing=true; document.getElementById('simonMsg').textContent = 'نگاه کن...';
      for(const i of seq){ await new Promise(r=>setTimeout(r, 480)); flash(i); Sound.play('tap'); }
      playing=false; user=[]; document.getElementById('simonMsg').textContent = 'نوبت تو!';
    };
    const next = ()=>{
      level++;
      seq.push(Math.floor(Math.random()*4));
      App.setGameScore(level);
      const lv = document.getElementById('simLevel'); if(lv) lv.textContent = level;
      playSeq();
    };
    document.getElementById('simonStart').onclick = ()=>{
      seq=[]; level=0; document.getElementById('simonStart').style.display='none';
      document.getElementById('simLevel').textContent = '0';
      next();
    };
    btns().forEach(b=>{
      b.onclick = ()=>{
        if(playing) return;
        const i = +b.dataset.i; flash(i); user.push(i); App.haptic('light'); Sound.play('tap');
        if(user[user.length-1] !== seq[user.length-1]){
          App.haptic('error'); Sound.play('lose');
          const r = rewardGame('simon', level, {mode:'level', minRec:2});
          App.openModal({icon:I.medal, title:t('game_over'), desc:'سطح: '+level+(r.newRec?'\n'+t('new_record'):''), coins:r.coins,
            btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('simon');}},
                  {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
          return;
        }
        if(user.length===seq.length) setTimeout(next, 550);
      };
    });
    App.state.gState = {};
  },

  math(){
    let score=0, combo=0, timer, time=30;
    const body = document.getElementById('gbody');
    const gen = ()=>{
      const diff = score > 80 ? 20 : score > 40 ? 15 : 10;
      const a = 1+Math.floor(Math.random()*diff), b = 1+Math.floor(Math.random()*diff);
      const op = ['+','-','×'][Math.floor(Math.random()*3)];
      let ans; if(op==='+') ans=a+b; else if(op==='-') ans=a-b; else ans=a*b;
      const opts = [ans];
      while(opts.length<4){ const n = ans + Math.floor(Math.random()*13)-6; if(!opts.includes(n) && n!==ans) opts.push(n); }
      return {q:`${a} ${op} ${b}`, ans, opts:opts.sort(()=>Math.random()-.5)};
    };
    const show = ()=>{
      const p = gen();
      body.innerHTML = `
        <div style="display:flex;justify-content:space-between;width:100%;max-width:320px;margin-bottom:12px;gap:8px">
          <div class="gscore" style="flex:1;justify-content:center">${I.zap} <span id="mTime">${time}</span>s</div>
          <div class="gscore" style="flex:1;justify-content:center">${I.star} ${score}</div>
          <div class="gscore" style="flex:1;justify-content:center;font-size:12px">🔥 ${combo}</div>
        </div>
        <div style="background:var(--card);border:1px solid var(--line);border-radius:20px;padding:28px 20px;width:100%;max-width:320px;text-align:center;margin-bottom:16px;box-shadow:0 8px 24px -12px var(--a1)">
          <div style="font-size:42px;font-weight:900;letter-spacing:2px;direction:ltr">${p.q}</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%;max-width:320px">
          ${p.opts.map(o=>`<button class="math-opt" data-v="${o}" style="padding:18px;font-size:20px;border-radius:16px">${o}</button>`).join('')}
        </div>`;
      document.querySelectorAll('.math-opt').forEach(b=>{
        b.onclick = ()=>{
          if(+b.dataset.v === p.ans){
            combo++; score += 10 + Math.min(combo*2, 10);
            App.haptic('success'); Sound.play('score');
          } else {
            combo = 0; App.haptic('error'); Sound.play('error');
          }
          App.setGameScore(score);
          show();
        };
      });
    };
    show();
    timer = setInterval(()=>{
      time--; const el=document.getElementById('mTime'); if(el) el.textContent=time;
      if(time<=0){
        clearInterval(timer);
        const r = rewardGame('math', score, {coins: Math.max(1, Math.floor(score/12)), minRec:3});
        App.openModal({icon:I.trophy, title:t('game_over'), desc:t('your_score',{s:score})+(r.newRec?'\n'+t('new_record'):''), coins:r.coins,
          btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('math');}},
                {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
      }
    },1000);
    App.state.gState = { destroy(){ clearInterval(timer); } };
  },

  color(){
    const cols = [
      {n:'قرمز',c:'#ef4444'},{n:'آبی',c:'#3b82f6'},{n:'سبز',c:'#10b981'},{n:'زرد',c:'#f59e0b'},
      {n:'بنفش',c:'#a855f7'},{n:'صورتی',c:'#ec4899'},{n:'نارنجی',c:'#f97316'},{n:'فیروزه',c:'#06b6d4'}
    ];
    let score=0, combo=0, time=35, tick;
    const body = document.getElementById('gbody');
    const next = ()=>{
      const word = cols[Math.floor(Math.random()*cols.length)];
      let ink = cols[Math.floor(Math.random()*cols.length)];
      // گاهی رنگ و کلمه یکی باشه تا سخت‌تر بشه
      if(Math.random() < 0.35) ink = word;
      const opts = [ink, ...cols.filter(c=>c.c!==ink.c).sort(()=>Math.random()-.5).slice(0,3)].sort(()=>Math.random()-.5);
      body.innerHTML = `
        <div style="display:flex;justify-content:space-between;width:100%;max-width:340px;margin-bottom:12px;gap:8px">
          <div class="gscore" style="flex:1;justify-content:center">${I.zap} <span id="cTime">${time}</span>s</div>
          <div class="gscore" style="flex:1;justify-content:center">${I.star} ${score}</div>
          <div class="gscore" style="flex:1;justify-content:center;font-size:12px">🔥 ${combo}</div>
        </div>
        <div class="color-hint" style="margin-bottom:12px">رنگ نوشته را انتخاب کن (نه معنی کلمه)</div>
        <div class="color-word" style="color:${ink.c};box-shadow:0 8px 28px -10px ${ink.c}66">${word.n}</div>
        <div class="color-opts">${opts.map(c=>`
          <button class="color-opt" style="background:${c.c};color:${c.c};box-shadow:0 6px 16px -4px ${c.c}88" data-c="${c.c}"></button>`).join('')}</div>`;
      document.querySelectorAll('.color-opt').forEach(b=>{
        b.onclick = ()=>{
          if(b.dataset.c === ink.c){
            combo++; score += 5 + Math.min(combo, 5);
            App.haptic('success'); Sound.play('score');
          } else {
            combo = 0; App.haptic('error'); Sound.play('error');
          }
          App.setGameScore(score);
          next();
        };
      });
    };
    next();
    tick = setInterval(()=>{
      time--; const el=document.getElementById('cTime'); if(el) el.textContent=time;
      if(time<=0){
        clearInterval(tick);
        const r = rewardGame('color', score, {coins: Math.max(1, Math.floor(score/12)), minRec:3});
        App.openModal({icon:I.trophy, title:t('game_over'), desc:t('your_score',{s:score})+(r.newRec?'\n'+t('new_record'):''), coins:r.coins,
          btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('color');}},
                {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
      }
    },1000);
    App.state.gState = { destroy(){ clearInterval(tick); } };
  },

  puzzle(){
    let grid = [1,2,3,4,5,6,7,8,0], empty=8, moves=0, solved=false;
    const body = document.getElementById('gbody');
    body.innerHTML = `<div style="display:flex;justify-content:center;width:100%;max-width:340px;margin-bottom:14px">
      <div class="gscore">${I.target} ${t('puzzle_u')}: <span id="pzMoves">0</span></div></div>
      <div class="puzzle-grid" id="puzzleGrid"></div>
      <button class="btn ghost" style="margin-top:16px;max-width:340px" id="pzNew">${I.refresh} ${t('restart')}</button>`;
    const gridEl = document.getElementById('puzzleGrid');
    const render = ()=>{
      gridEl.innerHTML = grid.map((v,i)=>{
        if(v === 0) return `<div class="pz-cell empty" data-i="${i}"></div>`;
        return `<div class="pz-cell" data-i="${i}">${v}</div>`;
      }).join('');
      document.getElementById('pzMoves').textContent = moves;
    };
    const isSolved = ()=>{ for(let i=0;i<8;i++) if(grid[i] !== i+1) return false; return grid[8] === 0; };
    const shuffle = ()=>{
      grid = [1,2,3,4,5,6,7,8,0]; empty = 8; moves = 0; solved = false;
      for(let i=0;i<200;i++){
        const neighbors = [];
        const r = Math.floor(empty/3), c = empty%3;
        if(r>0) neighbors.push(empty-3); if(r<2) neighbors.push(empty+3);
        if(c>0) neighbors.push(empty-1); if(c<2) neighbors.push(empty+1);
        const n = neighbors[Math.floor(Math.random()*neighbors.length)];
        grid[empty] = grid[n]; grid[n] = 0; empty = n;
      }
      render();
    };
    gridEl.onclick = e=>{
      if(solved) return;
      const cell = e.target.closest('.pz-cell'); if(!cell) return;
      const i = +cell.dataset.i;
      const r1 = Math.floor(i/3), c1 = i%3, r2 = Math.floor(empty/3), c2 = empty%3;
      if(Math.abs(r1-r2) + Math.abs(c1-c2) !== 1) return;
      grid[empty] = grid[i]; grid[i] = 0; empty = i; moves++; render(); App.haptic('light');
      if(isSolved()){
        solved = true;
        const val = Math.max(0, 2500 - moves*4);
        const r = rewardGame('puzzle', val, {coins: Math.max(3, 14 - Math.floor(moves/8)), minRec:3});
        App.haptic('success'); Sound.play('win');
        App.openModal({icon:I.trophy, title:t('you_won'),
          desc:t('won_in_moves',{n:moves})+(r.newRec?'\n'+t('new_record'):''), coins:r.coins,
          btns:[{label:t('replay'), onClick:()=>{App.closeModal();App.startGame('puzzle');}},
                {label:t('exit'), ghost:1, onClick:()=>{App.closeModal();App.closeGame();}}]});
      }
    };

    document.getElementById('pzNew').onclick = ()=>shuffle();
    shuffle();
    App.state.gState = {};
  },

  /* ===== Snake Pro (hub style) ===== */
  snakePro(){
    const body = document.getElementById('gbody');
    body.innerHTML = `
      <div class="snake-wrap" style="max-width:360px"><canvas id="spCanvas" width="360" height="360"></canvas></div>
      <div class="dpad" style="margin-top:12px">
        <div class="sp"></div><button class="dbtn" data-d="0">${I.up}</button><div class="sp"></div>
        <button class="dbtn" data-d="3">${I.left}</button><div class="sp"></div><button class="dbtn" data-d="1">${I.right}</button>
        <div class="sp"></div><button class="dbtn" data-d="2">${I.down}</button><div class="sp"></div>
      </div>
      <div style="margin-top:10px;font-size:12px;color:var(--mut)">سکه با خوردن سیب +۲</div>`;
    const cv = document.getElementById('spCanvas');
    const ctx = cv.getContext('2d');
    const N=18, S=cv.width/N;
    let snake=[{x:9,y:9},{x:8,y:9},{x:7,y:9}], dir=1, nextDir=1, food=null, score=0, dead=false, tick=null, coinsEarned=0;
    const randFood=()=>{ let p; do{p={x:Math.floor(Math.random()*N),y:Math.floor(Math.random()*N)};}while(snake.some(s=>s.x===p.x&&s.y===p.y)); return p; };
    food = randFood();
    const draw=()=>{
      const cs=getComputedStyle(document.documentElement);
      ctx.fillStyle=cs.getPropertyValue('--card').trim()||'#151b2e';
      ctx.fillRect(0,0,cv.width,cv.height);
      ctx.strokeStyle='rgba(128,128,128,.07)';
      for(let i=0;i<=N;i++){ ctx.beginPath();ctx.moveTo(i*S,0);ctx.lineTo(i*S,cv.height);ctx.stroke();
        ctx.beginPath();ctx.moveTo(0,i*S);ctx.lineTo(cv.width,i*S);ctx.stroke(); }
      // apple
      ctx.fillStyle='#ef4444'; ctx.beginPath(); ctx.arc(food.x*S+S/2,food.y*S+S/2,S/2-3,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='#22c55e'; ctx.fillRect(food.x*S+S/2-1, food.y*S+2, 2, 5);
      snake.forEach((s,i)=>{
        const grd=ctx.createLinearGradient(s.x*S,s.y*S,(s.x+1)*S,(s.y+1)*S);
        if(i===0){grd.addColorStop(0,'#34d399');grd.addColorStop(1,'#10b981');}
        else {grd.addColorStop(0,'#10b981');grd.addColorStop(1,'#059669');}
        ctx.fillStyle=grd;
        ctx.beginPath(); ctx.roundRect(s.x*S+1.5,s.y*S+1.5,S-3,S-3,6); ctx.fill();
        if(i===0){
          ctx.fillStyle='#0b0f1a';
          const ex = dir===1||dir===3 ? (dir===1?s.x*S+S*0.7:s.x*S+S*0.3) : s.x*S+S*0.35;
          const ey = dir===0||dir===2 ? (dir===2?s.y*S+S*0.7:s.y*S+S*0.3) : s.y*S+S*0.4;
          ctx.beginPath(); ctx.arc(ex,ey,2.2,0,Math.PI*2); ctx.fill();
          ctx.beginPath(); ctx.arc(ex+(dir===0||dir===2?S*0.3:0), ey+(dir===1||dir===3?S*0.25:0),2.2,0,Math.PI*2); ctx.fill();
        }
      });
      App.setGameScore(score);
    };
    const step=()=>{
      if(dead) return;
      dir=nextDir;
      const h={...snake[0]};
      if(dir===0)h.y--; else if(dir===1)h.x++; else if(dir===2)h.y++; else h.x--;
      if(h.x<0||h.y<0||h.x>=N||h.y>=N||snake.some(s=>s.x===h.x&&s.y===h.y)){
        dead=true; clearInterval(tick); Sound.play('lose'); App.haptic('error');
        const r=rewardGame('snakePro', score, {coins: Math.floor(score/12)+coinsEarned});
        App.openModal({icon:I.medal, title:t('game_over'), desc:t('your_score',{s:score})+(r.newRec?'\n'+t('new_record'):''),
          coins:r.coins, btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('snakePro');}},
            {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
        return;
      }
      snake.unshift(h);
      if(h.x===food.x&&h.y===food.y){
        score+=10; coinsEarned+=2; App.addCoins(2); Sound.play('eat'); App.haptic('success'); food=randFood();
      } else snake.pop();
      draw();
    };
    document.querySelectorAll('.dbtn').forEach(b=>{
      b.onclick=()=>{ const d=+b.dataset.d; if((d===0&&dir!==2)||(d===2&&dir!==0)||(d===1&&dir!==3)||(d===3&&dir!==1)) nextDir=d; Sound.play('tap'); };
    });
    const onKey=e=>{
      const m={ArrowUp:0,ArrowRight:1,ArrowDown:2,ArrowLeft:3};
      if(m[e.key]!==undefined){ e.preventDefault(); const d=m[e.key];
        if((d===0&&dir!==2)||(d===2&&dir!==0)||(d===1&&dir!==3)||(d===3&&dir!==1)) nextDir=d; }
    };
    document.addEventListener('keydown', onKey);
    tick=setInterval(step, 120); draw();
    App.state.gState={ destroy(){ clearInterval(tick); document.removeEventListener('keydown',onKey); } };
  },

  /* ===== Rock Paper Scissors ===== */
  rps(){
    const body=document.getElementById('gbody');
    let you=0, ai=0, target=3, ties=0, lock=false;
    const icons={rock:I.target, paper:I.grid, scissors:I.xo};
    const labels={rock:'سنگ', paper:'کاغذ', scissors:'قیچی'};
    const beats={rock:'scissors', scissors:'paper', paper:'rock'};
    const render=()=>{
      body.innerHTML=`
        <div style="display:flex;gap:8px;margin-bottom:14px;width:100%;max-width:340px">
          ${[3,5,10].map(n=>`<button class="btn ${target===n?'':'ghost'}" style="padding:10px;flex:1" data-t="${n}">${n} برد</button>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;width:100%;max-width:340px;margin-bottom:16px">
          <div class="gscore" style="flex:1;justify-content:center">تو: <b id="rpsYou">${you}</b></div>
          <div class="gscore" style="flex:1;justify-content:center;margin:0 8px">هدف: ${target}</div>
          <div class="gscore" style="flex:1;justify-content:center">AI: <b id="rpsAi">${ai}</b></div>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:20px;width:100%;max-width:340px;margin-bottom:18px;min-height:90px">
          <div id="rpsYouIcon" style="width:72px;height:72px;border-radius:20px;background:var(--card);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--a1)">${I.user}</div>
          <div style="font-weight:900;color:var(--gold)">VS</div>
          <div id="rpsAiIcon" style="width:72px;height:72px;border-radius:20px;background:var(--card);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--a2)">${I.zap}</div>
        </div>
        <div id="rpsMsg" style="min-height:24px;color:var(--mut);font-size:13px;margin-bottom:12px"></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:100%;max-width:340px">
          ${['rock','paper','scissors'].map(k=>`
            <button class="btn ghost" data-c="${k}" style="flex-direction:column;gap:6px;padding:16px 8px">
              <span style="width:28px;height:28px;display:flex">${icons[k]}</span>
              <span style="font-size:12px">${labels[k]}</span>
            </button>`).join('')}
        </div>`;
      body.querySelectorAll('[data-t]').forEach(b=>{
        b.onclick=()=>{ if(you||ai) return; target=+b.dataset.t; Sound.play('click'); render(); };
      });
      body.querySelectorAll('[data-c]').forEach(b=>{
        b.onclick=()=>play(b.dataset.c);
      });
    };
    const play=(choice)=>{
      if(lock) return; lock=true; Sound.play('tap');
      const aiChoice=['rock','paper','scissors'][Math.floor(Math.random()*3)];
      document.getElementById('rpsYouIcon').innerHTML=icons[choice];
      document.getElementById('rpsAiIcon').innerHTML=icons[aiChoice];
      let msg='';
      if(choice===aiChoice){ ties++; msg='مساوی'; Sound.play('click'); }
      else if(beats[choice]===aiChoice){ you++; msg='بردی!'; Sound.play('score'); App.haptic('success'); }
      else { ai++; msg='باختی'; Sound.play('error'); App.haptic('soft'); }
      document.getElementById('rpsMsg').textContent=msg+' — تو: '+labels[choice]+' | AI: '+labels[aiChoice];
      document.getElementById('rpsYou').textContent=you;
      document.getElementById('rpsAi').textContent=ai;
      App.setGameScore(you);
      if(you>=target||ai>=target){
        const won=you>=target;
        const r=rewardGame('rps', you, {coins: won?5+you:2});
        Sound.play(won?'win':'lose');
        setTimeout(()=>App.openModal({
          icon:won?I.trophy:I.medal, title:won?t('you_won'):t('you_lost'),
          desc:`${you} - ${ai}`, coins:r.coins,
          btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('rps');}},
                {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]
        }),400);
        return;
      }
      setTimeout(()=>{ lock=false; },700);
    };
    render();
    App.state.gState={};
  },

  /* ===== Fruit Slice (emoji fruits kept) ===== */
  fruit(){
    const body=document.getElementById('gbody');
    body.innerHTML=`<canvas id="fruitCv" width="360" height="480" style="width:100%;max-width:360px;border-radius:18px;background:var(--card);border:1px solid var(--line);touch-action:none"></canvas>
      <div style="margin-top:10px;font-size:12px;color:var(--mut)">بکش تا ببری · از بمب‌ها دوری کن</div>`;
    const cv=document.getElementById('fruitCv'), ctx=cv.getContext('2d');
    const W=360,H=480;
    const FRUITS=[{e:'🍉',pts:1},{e:'🍊',pts:1},{e:'🍋',pts:1},{e:'🍇',pts:2},{e:'🍓',pts:2},{e:'🍍',pts:3},{e:'🥭',pts:3}];
    let state='idle', score=0, lives=3, items=[], particles=[], trail=[], spawnT=0, frame=0;
    let slash=false, lx=0, ly=0;
    const spawn=()=>{
      const x=40+Math.random()*(W-80), spd=9+Math.random()*4;
      const r=Math.random();
      if(r<0.12) items.push({x,y:H+20,vx:(Math.random()-.5)*3,vy:-spd,r:26,type:'bomb',rot:0});
      else { const d=FRUITS[Math.floor(Math.random()*FRUITS.length)]; items.push({x,y:H+20,vx:(Math.random()-.5)*2.5,vy:-spd,r:28,type:'fruit',data:d,rot:0,slashed:false}); }
    };
    const dist=(px,py,x1,y1,x2,y2)=>{
      const dx=x2-x1,dy=y2-y1,l2=dx*dx+dy*dy||1;
      const tt=Math.max(0,Math.min(1,((px-x1)*dx+(py-y1)*dy)/l2));
      return Math.hypot(px-(x1+tt*dx),py-(y1+tt*dy));
    };
    const end=()=>{
      state='dead'; Sound.play('lose');
      const r=rewardGame('fruit', score, {coins:Math.floor(score/8)});
      App.openModal({icon:I.trophy,title:t('game_over'),desc:t('your_score',{s:score})+(r.newRec?'\n'+t('new_record'):''),
        coins:r.coins,btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('fruit');}},
          {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
    };
    const update=()=>{
      if(state!=='playing') return;
      frame++; spawnT++; if(spawnT>50){spawnT=0;spawn();}
      items.forEach(it=>{ it.vy+=0.25; it.x+=it.vx; it.y+=it.vy; it.rot+=0.04; });
      items=items.filter(it=>{
        if(it.slashed) return false;
        if(it.type==='fruit'&&it.y>H+40){ lives--; Sound.play('error'); if(lives<=0) end(); return false; }
        return it.y<H+50;
      });
      particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.life-=0.04;});
      particles=particles.filter(p=>p.life>0);
      trail.forEach(s=>s.life-=0.12); trail=trail.filter(s=>s.life>0);
      App.setGameScore(score);
    };
    const draw=()=>{
      const cs=getComputedStyle(document.documentElement);
      ctx.fillStyle=cs.getPropertyValue('--card').trim()||'#151b2e';
      ctx.fillRect(0,0,W,H);
      // lives
      ctx.font='16px Vazirmatn'; ctx.fillStyle='#f87171';
      ctx.fillText('جان: '+'●'.repeat(Math.max(0,lives))+'○'.repeat(Math.max(0,3-lives)), 12, 24);
      ctx.fillStyle=cs.getPropertyValue('--tx').trim(); ctx.font='bold 18px Vazirmatn';
      ctx.fillText(String(score), W-12-ctx.measureText(String(score)).width, 24);
      items.forEach(it=>{
        ctx.save(); ctx.translate(it.x,it.y); ctx.rotate(it.rot);
        if(it.type==='bomb'){ ctx.font='40px serif'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('💣',0,0); }
        else { ctx.font='42px serif'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(it.data.e,0,0); }
        ctx.restore();
      });
      particles.forEach(p=>{ ctx.globalAlpha=p.life; ctx.fillStyle=p.color; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); });
      ctx.globalAlpha=1;
      if(trail.length>1){
        for(let i=1;i<trail.length;i++){
          ctx.strokeStyle=`rgba(255,180,180,${trail[i].life})`; ctx.lineWidth=3*trail[i].life; ctx.lineCap='round';
          ctx.beginPath(); ctx.moveTo(trail[i-1].x,trail[i-1].y); ctx.lineTo(trail[i].x,trail[i].y); ctx.stroke();
        }
      }
      if(state==='idle'){
        ctx.fillStyle='rgba(0,0,0,.55)'; ctx.fillRect(0,0,W,H);
        ctx.fillStyle='#fff'; ctx.font='bold 20px Vazirmatn'; ctx.textAlign='center';
        ctx.fillText('میوه‌برش', W/2, H/2-20);
        ctx.font='13px Vazirmatn'; ctx.fillStyle='#94a3b8';
        ctx.fillText('لمس کن تا شروع شود', W/2, H/2+10);
      }
    };
    const doSlash=(x1,y1,x2,y2)=>{
      trail.push({x:x2,y:y2,life:1});
      items.forEach(it=>{
        if(it.slashed) return;
        if(dist(it.x,it.y,x1,y1,x2,y2)<it.r+8){
          it.slashed=true;
          if(it.type==='bomb'){ lives--; Sound.play('lose'); App.haptic('error'); if(lives<=0) end(); }
          else { score+=it.data.pts*(lives>0?1:1); Sound.play('slash'); App.haptic('light');
            for(let i=0;i<10;i++) particles.push({x:it.x,y:it.y,vx:(Math.random()-.5)*6,vy:(Math.random()-.5)*6,life:1,r:2+Math.random()*3,color:'#f97316'}); }
        }
      });
    };
    const pos=e=>{ const r=cv.getBoundingClientRect(); const sx=W/r.width,sy=H/r.height;
      if(e.touches) return {x:(e.touches[0].clientX-r.left)*sx,y:(e.touches[0].clientY-r.top)*sy};
      return {x:(e.clientX-r.left)*sx,y:(e.clientY-r.top)*sy}; };
    cv.onmousedown=e=>{ if(state!=='playing'){ state='playing'; lives=3; score=0; items=[]; Sound.play('click'); return; }
      const p=pos(e); slash=true; lx=p.x; ly=p.y; };
    cv.onmousemove=e=>{ if(!slash||state!=='playing')return; const p=pos(e); doSlash(lx,ly,p.x,p.y); lx=p.x; ly=p.y; };
    cv.onmouseup=()=>slash=false;
    cv.ontouchstart=e=>{ e.preventDefault(); if(state!=='playing'){ state='playing'; lives=3; score=0; items=[]; Sound.play('click'); return; }
      const p=pos(e); slash=true; lx=p.x; ly=p.y; };
    cv.ontouchmove=e=>{ e.preventDefault(); if(!slash||state!=='playing')return; const p=pos(e); doSlash(lx,ly,p.x,p.y); lx=p.x; ly=p.y; };
    cv.ontouchend=e=>{ e.preventDefault(); slash=false; };
    let raf;
    const loop=()=>{ update(); draw(); raf=requestAnimationFrame(loop); };
    loop();
    App.state.gState={ destroy(){ cancelAnimationFrame(raf); state='dead'; } };
  },

  /* ===== Flappy ===== */
  flappy(){
    const body=document.getElementById('gbody');
    body.innerHTML=`<canvas id="flCv" width="360" height="520" style="width:100%;max-width:360px;border-radius:18px;touch-action:none;background:var(--card);border:1px solid var(--line)"></canvas>
      <div style="margin-top:10px;font-size:12px;color:var(--mut)">لمس / کلیک = پرواز</div>`;
    const cv=document.getElementById('flCv'), ctx=cv.getContext('2d');
    const W=360,H=520, G=0.38, FLAP=-7, PW=50, GAP=140, BX=80, BR=14;
    let state='idle', bird={y:H/2,vy:0}, pipes=[], score=0, frame=0;
    const spawn=()=>{ const top=60+Math.random()*(H-GAP-140); pipes.push({x:W+10,top,scored:false}); };
    const die=()=>{
      state='dead'; Sound.play('lose');
      const r=rewardGame('flappy', score, {coins:Math.max(1,Math.floor(score/2))});
      App.openModal({icon:I.medal,title:t('game_over'),desc:t('your_score',{s:score})+(r.newRec?'\n'+t('new_record'):''),
        coins:r.coins,btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('flappy');}},
          {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
    };
    const update=()=>{
      if(state!=='playing') return;
      frame++; if(frame%75===0) spawn();
      bird.vy+=G; bird.vy=Math.min(bird.vy,10); bird.y+=bird.vy;
      pipes.forEach(p=>{
        p.x-=2.8;
        if(!p.scored && p.x+PW<BX){ p.scored=true; score++; Sound.play('score'); App.setGameScore(score); }
      });
      pipes=pipes.filter(p=>p.x>-PW-10);
      if(bird.y-BR<0||bird.y+BR>H-30){ die(); return; }
      for(const p of pipes){
        if(BX+BR-2>p.x && BX-BR+2<p.x+PW){
          if(bird.y-BR+2<p.top || bird.y+BR-2>p.top+GAP){ die(); return; }
        }
      }
    };
    const draw=()=>{
      const cs=getComputedStyle(document.documentElement);
      const bg=cs.getPropertyValue('--bg').trim()||'#0b0f1a';
      const card=cs.getPropertyValue('--card').trim()||'#151b2e';
      const a1=cs.getPropertyValue('--a1').trim()||'#6366f1';
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
      // ground
      ctx.fillStyle=card; ctx.fillRect(0,H-30,W,30);
      ctx.fillStyle=a1; ctx.fillRect(0,H-30,W,3);
      pipes.forEach(p=>{
        const grd=ctx.createLinearGradient(p.x,0,p.x+PW,0);
        grd.addColorStop(0,'#14532d'); grd.addColorStop(0.5,'#22c55e'); grd.addColorStop(1,'#14532d');
        ctx.fillStyle=grd;
        ctx.beginPath(); ctx.roundRect(p.x,0,PW,p.top-8,6); ctx.fill();
        ctx.beginPath(); ctx.roundRect(p.x,p.top+GAP+8,PW,H-30-(p.top+GAP+8),6); ctx.fill();
        ctx.fillStyle='#16a34a';
        ctx.beginPath(); ctx.roundRect(p.x-4,p.top-22,PW+8,18,6); ctx.fill();
        ctx.beginPath(); ctx.roundRect(p.x-4,p.top+GAP,PW+8,18,6); ctx.fill();
      });
      // bird
      ctx.save(); ctx.translate(BX,bird.y); ctx.rotate(Math.max(-0.5,Math.min(1.2,bird.vy*0.08)));
      const bgd=ctx.createRadialGradient(-4,-4,2,0,0,BR);
      bgd.addColorStop(0,'#fde68a'); bgd.addColorStop(1,'#f59e0b');
      ctx.fillStyle=bgd; ctx.beginPath(); ctx.arc(0,0,BR,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(6,-4,4,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='#0f172a'; ctx.beginPath(); ctx.arc(7,-4,2,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='#ea580c'; ctx.beginPath(); ctx.moveTo(10,-1); ctx.lineTo(18,1); ctx.lineTo(10,4); ctx.fill();
      ctx.restore();
      if(state==='playing'){
        ctx.font='bold 28px Vazirmatn'; ctx.textAlign='center'; ctx.fillStyle='rgba(255,255,255,.2)';
        ctx.fillText(String(score), W/2, 50);
        ctx.fillStyle='#fff'; ctx.fillText(String(score), W/2+1, 49);
      }
      if(state==='idle'){
        ctx.fillStyle='rgba(0,0,0,.5)'; ctx.fillRect(0,0,W,H);
        ctx.fillStyle='#fff'; ctx.font='bold 22px Vazirmatn'; ctx.textAlign='center';
        ctx.fillText('فلپی', W/2, H/2-16);
        ctx.font='13px Vazirmatn'; ctx.fillStyle='#94a3b8';
        ctx.fillText('لمس کن تا پرواز کنی', W/2, H/2+12);
      }
    };
    const flap=()=>{
      if(state==='idle'){ state='playing'; bird={y:H/2,vy:FLAP}; pipes=[]; score=0; frame=0; Sound.play('flap'); return; }
      if(state==='dead') return;
      bird.vy=FLAP; Sound.play('flap');
    };
    cv.onclick=flap;
    cv.ontouchstart=e=>{ e.preventDefault(); flap(); };
    let raf; const loop=()=>{ update(); draw(); raf=requestAnimationFrame(loop); }; loop();
    App.state.gState={ destroy(){ cancelAnimationFrame(raf); state='dead'; } };
  },

  /* ===== Cyber Car ===== */
  car(){
    const body=document.getElementById('gbody');
    body.innerHTML=`<canvas id="carCv" width="360" height="520" style="width:100%;max-width:360px;border-radius:18px;touch-action:none;background:#0f172a;border:1px solid var(--line)"></canvas>
      <div style="margin-top:10px;font-size:12px;color:var(--mut)">بکش چپ/راست · سکه جمع کن</div>`;
    const cv=document.getElementById('carCv'), ctx=cv.getContext('2d');
    const W=360,H=520;
    let state='idle', score=0, lives=3, px=W/2, enemies=[], coins=[], lines=[], frame=0;
    for(let i=0;i<12;i++) lines.push({y:i*50});
    const spawnE=()=>enemies.push({x:90+Math.random()*(W-180),y:-80,w:36,h:60,spd:4+Math.random()*3});
    const spawnC=()=>coins.push({x:100+Math.random()*(W-200),y:-40,r:10});
    let eTimer=0,cTimer=0;
    const dieHit=()=>{
      lives--; Sound.play('error'); App.haptic('error');
      if(lives<=0){
        state='dead'; Sound.play('lose');
        const r=rewardGame('car', score, {coins:Math.floor(score/15)});
        App.openModal({icon:I.medal,title:t('game_over'),desc:t('your_score',{s:score}),
          coins:r.coins,btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('car');}},
            {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
      }
    };
    const update=()=>{
      if(state!=='playing') return;
      frame++; eTimer++; cTimer++;
      if(eTimer>45){ eTimer=0; spawnE(); }
      if(cTimer>55){ cTimer=0; spawnC(); }
      lines.forEach(l=>{ l.y+=10; if(l.y>H) l.y=-40; });
      enemies.forEach(e=>{ e.y+=e.spd; });
      enemies=enemies.filter(e=>{
        if(e.y>H){ score+=5; return false; }
        if(Math.abs(px-e.x)<32 && Math.abs((H-90)-e.y)<50){ dieHit(); return false; }
        return true;
      });
      coins.forEach(c=>{ c.y+=8; });
      coins=coins.filter(c=>{
        if(c.y>H) return false;
        if(Math.hypot(px-c.x,(H-90)-c.y)<28){ score+=15; App.addCoins(1); Sound.play('coin'); return false; }
        return true;
      });
      App.setGameScore(score);
    };
    const draw=()=>{
      ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#1e293b'; ctx.fillRect(60,0,W-120,H);
      ctx.fillStyle='#06b6d4'; ctx.fillRect(55,0,5,H); ctx.fillRect(W-60,0,5,H);
      ctx.fillStyle='rgba(255,255,255,.25)';
      lines.forEach(l=>ctx.fillRect(W/2-4,l.y,8,28));
      // player car
      ctx.save(); ctx.translate(px,H-90);
      ctx.shadowBlur=16; ctx.shadowColor='#22d3ee';
      ctx.fillStyle='#22d3ee'; ctx.fillRect(-16,-28,32,56);
      ctx.fillStyle='#0f172a'; ctx.fillRect(-10,-12,20,22);
      ctx.fillStyle='#fff'; ctx.fillRect(-12,-26,8,6); ctx.fillRect(4,-26,8,6);
      ctx.fillStyle='#ef4444'; ctx.fillRect(-12,20,8,6); ctx.fillRect(4,20,8,6);
      ctx.restore();
      enemies.forEach(e=>{
        ctx.fillStyle='#ef4444'; ctx.shadowBlur=10; ctx.shadowColor='#ef4444';
        ctx.fillRect(e.x-16,e.y-28,32,56); ctx.shadowBlur=0;
      });
      coins.forEach(c=>{
        ctx.beginPath(); ctx.arc(c.x,c.y,c.r,0,Math.PI*2);
        ctx.fillStyle='#fbbf24'; ctx.shadowBlur=12; ctx.shadowColor='#fbbf24'; ctx.fill(); ctx.shadowBlur=0;
      });
      ctx.fillStyle='#fff'; ctx.font='12px Vazirmatn';
      ctx.fillText('جان: '+lives, 70, 24);
      if(state==='idle'){
        ctx.fillStyle='rgba(0,0,0,.6)'; ctx.fillRect(0,0,W,H);
        ctx.fillStyle='#22d3ee'; ctx.font='bold 22px Vazirmatn'; ctx.textAlign='center';
        ctx.fillText('سایبر دریفت', W/2, H/2-10);
        ctx.fillStyle='#94a3b8'; ctx.font='13px Vazirmatn';
        ctx.fillText('لمس کن تا شروع شود', W/2, H/2+18);
      }
    };
    cv.ontouchmove=e=>{ e.preventDefault(); const r=cv.getBoundingClientRect();
      px = ((e.touches[0].clientX-r.left)/r.width)*W; px=Math.max(90,Math.min(W-90,px)); };
    cv.onmousemove=e=>{ if(state!=='playing')return; const r=cv.getBoundingClientRect();
      px=((e.clientX-r.left)/r.width)*W; px=Math.max(90,Math.min(W-90,px)); };
    const start=()=>{ if(state==='playing')return; state='playing'; score=0; lives=3; enemies=[]; coins=[]; Sound.play('click'); };
    cv.onclick=start; cv.ontouchstart=e=>{ e.preventDefault(); start(); };
    let raf; const loop=()=>{ update(); draw(); raf=requestAnimationFrame(loop); }; loop();
    App.state.gState={ destroy(){ cancelAnimationFrame(raf); state='dead'; } };
  },

  /* ===== World Cup Quiz ===== */
  worldcup(){
    const Q=[
      {q:'اولین حضور ایران در جام جهانی؟', o:['۱۹۷۴','۱۹۷۸','۱۹۸۲','۱۹۸۶'], a:'۱۹۷۸'},
      {q:'اولین برد ایران مقابل کدام تیم بود؟', o:['آمریکا','پرتغال','اسپانیا','مراکش'], a:'آمریکا'},
      {q:'ایران در ۲۰۱۸ چند امتیاز گرفت؟', o:['۲','۳','۴','۶'], a:'۴'},
      {q:'ایران در ۲۰۲۲ کدام تیم را برد؟', o:['آمریکا','انگلیس','ولز','هلند'], a:'ولز'},
      {q:'اولین گل‌زن تاریخ ایران در جام جهانی؟', o:['علی دایی','ایرج دانایی‌فرد','مهدوی‌کیا','باقری'], a:'ایرج دانایی‌فرد'},
      {q:'سرمربی ایران در ۲۰۱۸؟', o:['برانکو','کی‌روش','اسکوچیچ','قلعه‌نویی'], a:'کی‌روش'},
      {q:'ایران تا ۲۰۲۶ چند بار به جام جهانی رفته؟', o:['۵','۶','۷','۸'], a:'۷'},
      {q:'گل تساوی مقابل پرتغال ۲۰۱۸؟', o:['آزمون','جهانبخش','انصاری‌فرد','طارمی'], a:'انصاری‌فرد'},
      {q:'حریف اول ایران در ۲۰۱۸؟', o:['اسپانیا','پرتغال','مراکش','روسیه'], a:'مراکش'},
      {q:'میزبان جام جهانی ۲۰۰۶؟', o:['فرانسه','آلمان','آفریقای جنوبی','برزیل'], a:'آلمان'}
    ].sort(()=>Math.random()-.5);
    let qi=0, corr=0, pts=0, done=false;
    const body=document.getElementById('gbody');
    const show=()=>{
      if(qi>=Q.length){
        const r=rewardGame('worldcup', pts, {coins:Math.floor(corr*1.5)+2});
        Sound.play(corr>=7?'win':'score');
        App.openModal({icon:I.trophy,title:'پایان آزمون',desc:`درست: ${corr}/${Q.length} · امتیاز: ${pts}`,
          coins:r.coins,btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('worldcup');}},
            {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
        return;
      }
      const cur=Q[qi]; done=false;
      const opts=[...cur.o].sort(()=>Math.random()-.5);
      body.innerHTML=`
        <div style="width:100%;max-width:360px">
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:12px;color:var(--mut)">
            <span>سوال ${qi+1}/${Q.length}</span><span>امتیاز: ${pts}</span>
          </div>
          <div style="height:6px;background:var(--card2);border-radius:4px;margin-bottom:16px;overflow:hidden">
            <div style="height:100%;width:${((qi)/Q.length)*100}%;background:var(--grad);border-radius:4px;transition:.3s"></div>
          </div>
          <div style="background:var(--card);border:1px solid var(--line);border-radius:18px;padding:18px;margin-bottom:14px;text-align:center">
            <div style="width:48px;height:48px;border-radius:14px;background:var(--grad);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;color:#fff">${I.trophy}</div>
            <div style="font-size:15px;font-weight:700;line-height:1.7">${cur.q}</div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px" id="wcOpts">
            ${opts.map(o=>`<button class="btn ghost" data-o="${o}" style="padding:14px 10px;font-size:13px">${o}</button>`).join('')}
          </div>
        </div>`;
      App.setGameScore(pts);
      document.querySelectorAll('#wcOpts .btn').forEach(b=>{
        b.onclick=()=>{
          if(done) return; done=true;
          const ok=b.dataset.o===cur.a;
          document.querySelectorAll('#wcOpts .btn').forEach(x=>{
            x.disabled=true;
            if(x.dataset.o===cur.a) x.style.borderColor='var(--ok)', x.style.background='rgba(16,185,129,.15)';
            else if(x===b&&!ok) x.style.borderColor='var(--no)', x.style.background='rgba(239,68,68,.12)';
          });
          if(ok){ corr++; pts+=10; Sound.play('score'); App.haptic('success'); }
          else { Sound.play('error'); App.haptic('soft'); }
          setTimeout(()=>{ qi++; show(); }, 700);
        };
      });
    };
    show();
    App.state.gState={};
  }
};
