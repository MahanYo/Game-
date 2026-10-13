const I = {
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>',
  game:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="6"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  trophy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 1012 0V2z"/></svg>',
  coin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M15 9.5a3 3 0 00-3-1.5c-1.5 0-3 .9-3 2.5s1.5 2 3 2.5 3 1 3 2.5-1.5 2.5-3 2.5a3 3 0 01-3-1.5"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  brain:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96.44 2.5 2.5 0 01-2.96-3.08 3 3 0 01-.34-5.58 2.5 2.5 0 011.32-4.24 2.5 2.5 0 011.98-3A2.5 2.5 0 019.5 2z"/><path d="M14.5 2A2.5 2.5 0 0012 4.5v15a2.5 2.5 0 004.96.44 2.5 2.5 0 002.96-3.08 3 3 0 00.34-5.58 2.5 2.5 0 00-1.32-4.24 2.5 2.5 0 00-1.98-3A2.5 2.5 0 0014.5 2z"/></svg>',
  grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  zap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  target:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  snake:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c0-3 2-5 5-5h3c3 0 5 2 5 5s-2 5-5 5H8c-3 0-5-2-5-5z"/><circle cx="17" cy="9" r="1" fill="currentColor"/><path d="M20 12v3a3 3 0 003 3"/></svg>',
  xo:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  xoO:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="8"/></svg>',
  xoX:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  down:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>',
  left:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  right:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  medal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15" r="6"/><path d="M9 9L7 2h10l-2 7M12 12l.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95L10.2 17.5l.35-2L9.1 14.1l2-.3z"/></svg>',
  empty:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z"/></svg>',
  refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  arrowL:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  arrowR:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>'
};

const GAMES = [
  {id:'memory', icon:I.brain, color:'#6366f1', nameKey:'memory', descKey:'memory_d', unitKey:'memory_u'},
  {id:'g2048', icon:I.grid, color:'#a855f7', nameKey:'g2048', descKey:'g2048_d', unitKey:'g2048_u'},
  {id:'react', icon:I.zap, color:'#06b6d4', nameKey:'react', descKey:'react_d', unitKey:'react_u'},
  {id:'whack', icon:I.target, color:'#ef4444', nameKey:'whack', descKey:'whack_d', unitKey:'whack_u'},
  {id:'snake', icon:I.snake, color:'#10b981', nameKey:'snake', descKey:'snake_d', unitKey:'snake_u'},
  {id:'ttt', icon:I.xo, color:'#f59e0b', nameKey:'ttt', descKey:'ttt_d', unitKey:'ttt_u'},
  {id:'simon', icon:I.grid, color:'#ec4899', nameKey:'simon', descKey:'simon_d', unitKey:'simon_u'},
  {id:'math', icon:I.zap, color:'#8b5cf6', nameKey:'math', descKey:'math_d', unitKey:'math_u'},
  {id:'color', icon:I.target, color:'#06b6d4', nameKey:'color', descKey:'color_d', unitKey:'color_u'},
  {id:'puzzle', icon:I.grid, color:'#f97316', nameKey:'puzzle', descKey:'puzzle_d', unitKey:'puzzle_u'}
];
const GMAP = Object.fromEntries(GAMES.map(g=>[g.id,g]));

const App = {
  state:{
    user:null,
    scores:{},
    coins:0,
    spent:0,
    purchases:[],
    notifications:[],
    notifUnread:0,
    settings:{vibrate:true,sound:true,lang:'fa',theme:'dark'},
    screen:'home',
    game:null,
    gState:null
  },

  init(){
    try{
      const s = JSON.parse(localStorage.getItem('gh_data')||'{}');
      this.state.settings = {...this.state.settings, ...(s.settings||{})};
      this.state.scores = s.scores||{};
      this.state.user = s.user||null;
      this.state.coins = s.coins || 0;
      this.state.spent = s.spent || 0;
      this.state.purchases = s.purchases || [];
    }catch(e){}

    LANG = this.state.settings.lang || 'fa';
    this.applyTheme(this.state.settings.theme);
    this.applyDir();

    document.getElementById('gback').onclick = ()=>this.closeGame();
    document.getElementById('modal').onclick = e=>{
      if(e.target.id==='modal') this.closeModal();
    };

    if(!this.state.user){
      this.showRegister();
    } else {
      this.startApp();
    }

    // Supabase: init shop + notifications
    if(typeof Shop !== 'undefined'){
      Shop.load().then(()=>{ if(this.state.screen==='shop') this.go('shop'); });
    }
    this.loadNotifications();
    this.subscribeNotifications();
  },

  startApp(){
    this.renderHeader();
    this.renderNav();
    this.go('home');
  },

  save(){
    localStorage.setItem('gh_data', JSON.stringify({
      user:this.state.user,
      scores:this.state.scores,
      settings:this.state.settings,
      coins:this.state.coins || 0,
      spent:this.state.spent || 0,
      purchases:this.state.purchases || []
    }));
  },

  applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name=theme-color]');
    const colors = {dark:'#0b0f1a',light:'#f4f6fb',neon:'#0a0014',ocean:'#041424',sunset:'#1a0a15',forest:'#0a1410',royal:'#0f0a1e'};
    if(meta) meta.content = colors[theme]||'#0b0f1a';
  },

  applyDir(){
    document.documentElement.dir = I18N[LANG]?.dir || 'rtl';
    document.documentElement.lang = LANG;
  },

  haptic(type='light'){
    if(!this.state.settings.vibrate) return;
    try{
      const d = {light:15, medium:30, heavy:50, soft:10, error:[30,40,30], success:[20,30,20], warning:40};
      if(navigator.vibrate) navigator.vibrate(d[type]||20);
    }catch(e){}
  },

  toast(msg){
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(()=>el.classList.remove('show'), 2200);
  },

  openModal({icon=I.trophy, title, desc, coins, btns}){
    document.getElementById('mbox').innerHTML = `
      <div class="mico">${icon}</div>
      <h3>${title}</h3>
      <p>${desc||''}</p>
      ${coins > 0 ? `<div class="coin-reward">${I.coin} +${coins} ${t('coin')}</div>` : ''}
      <div class="mbtns">${btns.map(b=>`<button class="btn ${b.ghost?'ghost':''}" data-act="${b.act||''}">${b.label}</button>`).join('')}</div>`;
    document.getElementById('modal').classList.add('open');
    document.querySelectorAll('#mbox .btn').forEach((el,i)=>{
      el.onclick = ()=>{ const fn = btns[i].onClick; if(fn) fn(); };
    });
  },

  closeModal(){ document.getElementById('modal').classList.remove('open'); },

  /* ===== Register ===== */
  showRegister(){
    const reg = document.getElementById('reg');
    reg.classList.add('open');
    this.regStep = 0;
    this.regData = {name:'',username:'',avatar:null};
    this.renderReg();
  },
  renderReg(){
    const reg = document.getElementById('reg');
    const d = this.regData;
    const step = this.regStep;

    let steps = `<div class="steps">${[0,1,2,3].map(i=>`<div class="dot ${i<=step?'on':''}"></div>`).join('')}</div>`;

    if(step===0){
      reg.innerHTML = `
        <div class="logo">${I.game}</div>
        <h1>${t('welcome')}</h1>
        <p class="sub">${t('welcome_sub').replace(/\n/g,'<br>')}</p>
        <div class="actions"><button class="btn" id="regNext">${I.play} ${t('start')}</button></div>`;
      document.getElementById('regNext').onclick = ()=>{ this.haptic('medium'); this.regStep=1; this.renderReg(); };
    }
    else if(step===1){
      reg.innerHTML = `
        ${steps}
        <h1>${t('step_name')}</h1>
        <p class="sub">${t('name_hint')}</p>
        <div class="field">
          <label>${t('profile')}</label>
          <input type="text" id="regName" placeholder="${t('name_ph')}" value="${d.name}" maxlength="30" autocomplete="off">
        </div>
        <div class="actions">
          <button class="btn ghost" id="regBack">${t('back')}</button>
          <button class="btn" id="regNext" disabled>${t('next')}</button>
        </div>`;
      const inp = document.getElementById('regName');
      const next = document.getElementById('regNext');
      inp.oninput = ()=>{ d.name = inp.value.trim(); next.disabled = d.name.length<2; };
      if(d.name.length>=2) next.disabled=false;
      setTimeout(()=>inp.focus(), 200);
      document.getElementById('regBack').onclick = ()=>{ this.haptic(); this.regStep=0; this.renderReg(); };
      next.onclick = ()=>{ if(d.name.length<2) return; this.haptic('medium'); this.regStep=2; this.renderReg(); };
    }
    else if(step===2){
      reg.innerHTML = `
        ${steps}
        <h1>${t('step_user')}</h1>
        <p class="sub">${t('user_hint')}</p>
        <div class="field">
          <label>Username</label>
          <div class="wrap">
            <span class="pre">@</span>
            <input type="text" id="regUser" placeholder="${t('user_ph')}" value="${d.username}" maxlength="20" autocomplete="off">
          </div>
        </div>
        <div class="actions">
          <button class="btn ghost" id="regBack">${t('back')}</button>
          <button class="btn" id="regNext" disabled>${t('next')}</button>
        </div>`;
      const inp = document.getElementById('regUser');
      const next = document.getElementById('regNext');
      const valid = v=>/^[a-zA-Z0-9_]{3,}$/.test(v);
      inp.oninput = ()=>{ d.username = inp.value.trim().toLowerCase().replace(/[^a-z0-9_]/g,''); inp.value=d.username; next.disabled = !valid(d.username); };
      if(valid(d.username)) next.disabled=false;
      setTimeout(()=>inp.focus(), 200);
      document.getElementById('regBack').onclick = ()=>{ this.haptic(); this.regStep=1; this.renderReg(); };
      next.onclick = ()=>{ if(!valid(d.username)) return; this.haptic('medium'); this.regStep=3; this.renderReg(); };
    }
    else{
      const AVS = [
        {bg:'#6366f1',icon:I.user},{bg:'#a855f7',icon:I.brain},{bg:'#06b6d4',icon:I.zap},
        {bg:'#ef4444',icon:I.target},{bg:'#10b981',icon:I.snake},{bg:'#f59e0b',icon:I.medal},
        {bg:'#ec4899',icon:I.star},{bg:'#8b5cf6',icon:I.trophy}
      ];
      const initials = (d.name||'?').trim().split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
      const cur = d.avatar;
      const preview = cur
        ? (cur.type==='img' ? `<img src="${cur.value}">` : `<div style="background:${cur.bg};width:100%;height:100%;display:flex;align-items:center;justify-content:center">${cur.icon}</div>`)
        : `<div style="background:var(--grad);width:100%;height:100%;display:flex;align-items:center;justify-content:center">${initials}</div>`;

      reg.innerHTML = `
        ${steps}
        <h1>${t('step_avatar')}</h1>
        <p class="sub">${t('avatar_sub')}</p>
        <div class="avatar-preview" id="avPrev">${preview}</div>
        <div class="avatar-grid" id="avGrid">
          ${AVS.map((a,i)=>`<div class="avatar-opt ${cur&&cur.type==='icon'&&cur.idx===i?'on':''}" data-i="${i}" style="background:${a.bg}">${a.icon}</div>`).join('')}
        </div>
        <button class="btn ghost upload-btn" id="avUp">${t('upload')}</button>
        <input type="file" id="avFile" accept="image/*" style="display:none">
        <div class="actions" style="margin-top:20px">
          <button class="btn ghost" id="regBack">${t('back')}</button>
          <button class="btn" id="regDone">${I.check} ${t('confirm')}</button>
        </div>`;

      document.getElementById('avGrid').onclick = e=>{
        const el = e.target.closest('.avatar-opt'); if(!el) return;
        const i = +el.dataset.i;
        d.avatar = {type:'icon', idx:i, bg:AVS[i].bg, icon:AVS[i].icon};
        this.haptic();
        this.renderReg();
      };
      document.getElementById('avUp').onclick = ()=>document.getElementById('avFile').click();
      document.getElementById('avFile').onchange = e=>{
        const f = e.target.files[0]; if(!f) return;
        if(f.size > 2*1024*1024){ this.toast('Max 2MB'); return; }
        const r = new FileReader();
        r.onload = ev=>{ d.avatar = {type:'img', value:ev.target.result}; this.renderReg(); };
        r.readAsDataURL(f);
      };
      document.getElementById('regBack').onclick = ()=>{ this.haptic(); this.regStep=2; this.renderReg(); };
      document.getElementById('regDone').onclick = ()=>{
        this.haptic('success');
        this.state.user = {
          name: d.name,
          username: d.username,
          avatar: d.avatar || null,
          createdAt: Date.now()
        };
        this.save();
        document.getElementById('reg').classList.remove('open');
        this.startApp();
        this.toast(t('welcome_user')+' '+d.name+'!');
        this.loadNotifications();
      };
    }
  },

  renderHeader(){
    const u = this.state.user;
    if(!u){ document.getElementById('header').innerHTML=''; return; }
    const initials = (u.name||'?').trim().split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
    let av = '';
    if(u.avatar){
      if(u.avatar.type==='img') av = `<img src="${u.avatar.value}" onerror="this.remove()">`;
      else av = `<div style="background:${u.avatar.bg};width:100%;height:100%;display:flex;align-items:center;justify-content:center">${u.avatar.icon}</div>`;
    } else av = initials;

    document.getElementById('header').innerHTML = `
      <div class="avatar" onclick="App.go('profile')">${av}</div>
      <div class="hinfo">
        <div class="hi">${t('welcome_user')} 👋</div>
        <div class="hn">${u.name}</div>
      </div>
      <div class="hcoin" onclick="App.go('shop')">${I.coin}<span>${App.getCoins()}</span></div>
      <div class="hnotif" onclick="App.go('notifications')">
        ${I.bell}
        ${this.state.notifUnread > 0 ? `<span class="notif-badge">${this.state.notifUnread}</span>` : ''}
      </div>
      <div class="hset" onclick="App.go('settings')">${I.gear}</div>`;
  },

  renderNav(){
    const items = [
      {id:'home', name:t('home'), icon:I.home},
      {id:'games', name:t('games'), icon:I.game},
      {id:'profile', name:t('profile'), icon:I.user},
      {id:'rank', name:t('rank'), icon:I.trophy}
    ];
    document.getElementById('nav').innerHTML = items.map(it=>`
      <button class="navb ${this.state.screen===it.id?'on':''}" onclick="App.go('${it.id}')">
        ${it.icon}<span>${it.name}</span>
      </button>`).join('');
  },

  go(screen){
    this.state.screen = screen;
    this.renderHeader(); this.renderNav();
    const m = document.getElementById('main');
    m.classList.remove('fade'); void m.offsetWidth; m.classList.add('fade');
    m.scrollTop = 0;
    const views = {
      home:()=>this.viewHome(),
      games:()=>this.viewGames(),
      profile:()=>this.viewProfile(),
      rank:()=>this.viewRank(),
      notifications:()=>this.viewNotifications(),
      settings:()=>Settings.render(),
      shop:()=>(typeof Shop !== 'undefined') ? Shop.render() : ''
    };
    m.innerHTML = views[screen] ? views[screen]() : '';
    if(screen==='settings') Settings.bind();
    if(screen==='shop' && typeof Shop !== 'undefined') Shop.bind();
    if(screen==='notifications') this.markAllRead();
  },

  viewHome(){
    const played = Object.keys(this.state.scores).length;
    return `
      <div class="hero">
        <h2>${t('welcome_user')} ${this.state.user.name.split(' ')[0]} 🎮</h2>
        <p>${t('welcome_sub').split('\n')[1]||''}</p>
        <div class="stats">
          <div class="stat"><b>${this.getCoins()}</b><span>${t('coin')}</span></div>
          <div class="stat"><b>${played}</b><span>${t('active_games')}</span></div>
          <div class="stat"><b>${GAMES.length}</b><span>${t('total_games')}</span></div>
        </div>
      </div>
      <div class="sect-title">${I.zap} ${t('suggested')}</div>
      <div class="games">${GAMES.slice(0,4).map(g=>this.gameCard(g)).join('')}</div>
      <div class="sect-title">${I.game} ${t('all_games')}</div>
      <div class="games">${GAMES.slice(4).map(g=>this.gameCard(g)).join('')}</div>`;
  },

  viewGames(){
    return `<div class="sect-title">${I.game} ${t('all_games')}</div>
      <div class="games">${GAMES.map(g=>this.gameCard(g)).join('')}</div>`;
  },

  viewProfile(){
    const u = this.state.user;
    const initials = (u.name||'?').trim().split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
    let av = '';
    if(u.avatar){
      if(u.avatar.type==='img') av = `<img src="${u.avatar.value}">`;
      else av = `<div style="background:${u.avatar.bg};width:100%;height:100%;display:flex;align-items:center;justify-content:center">${u.avatar.icon}</div>`;
    } else av = initials;
    const played = Object.keys(this.state.scores).length;
    const rows = GAMES.filter(g=>this.state.scores[g.id]).map(g=>{
      const v = this.state.scores[g.id];
      return `<div class="sitem">
        <div class="sicon" style="--gc:${g.color}">${g.icon}</div>
        <div class="sinfo"><b>${t(g.nameKey)}</b><span>${t('record')}</span></div>
        <div class="sval">${v} <small style="font-size:10px;color:var(--mut);font-weight:600">${t(g.unitKey)}</small></div>
      </div>`;
    }).join('');
    return `
      <div class="pcard">
        <div class="pavatar">${av}</div>
        <h3>${u.name}</h3>
        <div class="un">@${u.username}</div>
        <div class="pstats">
          <div class="pstat"><b>${this.getCoins()}</b><span>${t('coin')}</span></div>
          <div class="pstat"><b>${played}</b><span>${t('played_games')}</span></div>
          <div class="pstat"><b>${Object.keys(this.state.scores).length}</b><span>${t('records_count')}</span></div>
        </div>
      </div>
      <button class="btn ghost" style="margin-bottom:18px" onclick="Settings.editProfile()">${I.user} ${t('edit_profile')}</button>
      <div class="sect-title">${I.medal} ${t('your_records')}</div>
      ${rows?`<div class="score-list">${rows}</div>`:`<div class="empty">${I.empty}<div>${t('not_played')}</div></div>`}`;
  },

  viewRank(){
    const sorted = [...GAMES].map(g=>({g,v:this.state.scores[g.id]||0})).sort((a,b)=>b.v-a.v);
    return `<div class="sect-title">${I.trophy} ${t('top_players')}</div>
      <div class="score-list">${sorted.map((x,i)=>`
        <div class="sitem">
          <div class="sicon" style="--gc:${x.g.color}">${i===0?I.trophy:x.g.icon}</div>
          <div class="sinfo"><b>${t(x.g.nameKey)}</b><span>${t('rank_n',{n:i+1})}</span></div>
          <div class="sval">${x.v}</div>
        </div>`).join('')}</div>`;
  },

  viewNotifications(){
    const uid = this.state.user?.username || 'anon';
    const list = this.state.notifications.filter(n=>n.target==='all' || n.target===uid);
    if(!list.length) return `<div class="empty" style="padding:60px 20px">${I.bell}<div>${t('no_notifications')||'اعلانی نداری'}</div></div>`;
    return `<div class="sect-title">${I.bell} ${t('notifications')||'اعلان‌ها'}</div>
      <div style="display:flex;flex-direction:column;gap:10px">${list.map(n=>{
        const unread = !(n.read_by||[]).includes(uid);
        return `<div class="notif-item ${unread?'unread':''}">
          <div class="notif-ico ${n.type}">${n.type==='success'?I.check:n.type==='warning'?I.target:I.bell}</div>
          <div class="notif-body">
            <b>${n.title_fa}</b>
            <p>${n.body_fa}</p>
            <span>${new Date(n.created_at).toLocaleString('fa-IR')}</span>
          </div>
        </div>`;
      }).join('')}</div>`;
  },

  gameCard(g){
    const best = this.state.scores[g.id]||0;
    return `<div class="gcard" style="--gc:${g.color}" onclick="App.startGame('${g.id}')">
      <div class="gicon">${g.icon}</div>
      <div class="gname">${t(g.nameKey)}</div>
      <div class="gbest">${I.star}<span>${best>0?best+' '+t(g.unitKey):t('no_record')}</span></div>
    </div>`;
  },

  /* ===== Coins ===== */
  getCoins(){
    return Math.max(0, (this.state.coins || 0) - (this.state.spent || 0));
  },

  addCoins(n){
    if(!n || n<=0) return 0;
    this.state.coins = (this.state.coins || 0) + n;
    this.save();
    this.renderHeader();
    return n;
  },

  setScore(gid, val){
    const cur = this.state.scores[gid]||0;
    if(val>cur){ this.state.scores[gid]=val; this.save(); return true; }
    return false;
  },

  /* ===== Notifications ===== */
  async loadNotifications(){
    if(typeof API === 'undefined') return;
    try{
      this.state.notifications = await API.getNotifications();
      this.updateUnreadCount();
    }catch(e){}
  },

  updateUnreadCount(){
    const uid = this.state.user?.username || 'anon';
    const unread = this.state.notifications.filter(n=>
      !(n.read_by||[]).includes(uid) && (n.target==='all' || n.target===uid)
    );
    this.state.notifUnread = unread.length;
    this.renderHeader();
  },

  markAllRead(){
    const uid = this.state.user?.username || 'anon';
    this.state.notifications.forEach(n=>{
      if(!(n.read_by||[]).includes(uid) && (n.target==='all' || n.target===uid)){
        if(typeof API !== 'undefined') API.markNotificationRead(n.id, uid);
      }
    });
    setTimeout(()=>{ this.state.notifUnread = 0; this.renderHeader(); }, 400);
  },

  subscribeNotifications(){
    if(!supabase) return;
    supabase.channel('user-notifs-'+Date.now())
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, (payload)=>{
        const n = payload.new;
        const uid = this.state.user?.username || 'anon';
        if(n.target !== 'all' && n.target !== uid) return;
        this.state.notifications.unshift(n);
        this.updateUnreadCount();
        this.toast('📬 ' + n.title_fa);
        if(this.state.screen==='notifications') this.go('notifications');
      })
      .subscribe();
  },

  /* ===== Game ===== */
  startGame(id){
    this.haptic('medium');
    this.state.game = id;
    const g = GMAP[id];
    document.getElementById('gtitle').textContent = t(g.nameKey);
    document.getElementById('gscore').innerHTML = `${I.star}<span id="scoreVal">0</span>`;
    document.getElementById('gbody').innerHTML = '';
    document.getElementById('gview').classList.add('open');
    if(this.state.gState?.destroy) try{ this.state.gState.destroy(); }catch(e){}
    this.state.gState = {};
    Games.start(id);
  },

  closeGame(){
    if(this.state.gState?.destroy) try{ this.state.gState.destroy(); }catch(e){}
    this.state.gState=null; this.state.game=null;
    document.getElementById('gview').classList.remove('open');
    this.renderHeader(); this.renderNav();
  },

  setGameScore(v){ const el=document.getElementById('scoreVal'); if(el) el.textContent=v; }
};