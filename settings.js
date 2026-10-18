const Settings = {
  THEMES:['dark','light','neon','ocean','sunset','forest','royal'],
  THEME_COLORS:{
    dark:['#0b0f1a','#6366f1','#151b2e'], light:['#f4f6fb','#6366f1','#ffffff'],
    neon:['#0a0014','#ff00ff','#00ffff'], ocean:['#041424','#0ea5e9','#06b6d4'],
    sunset:['#1a0a15','#f97316','#ec4899'], forest:['#0a1410','#10b981','#84cc16'],
    royal:['#0f0a1e','#8b5cf6','#fbbf24']
  },
  render(){
    const s = App.state.settings;
    return `
      <div class="sect-title">${I.gear} ${t('settings_title')}</div>
      <div class="set-group">
        <div class="set-item" id="set-lang"><div class="sic">${I.game}</div>
          <div class="sin"><b>${t('language')}</b><span>${t('language_d')}</span></div>
          <div class="sval">${I18N[s.lang].name}</div><div class="sarrow">${I.arrowL}</div></div>
        <div class="set-item" id="set-theme"><div class="sic">${I.star}</div>
          <div class="sin"><b>${t('theme')}</b><span>${t('theme_d')}</span></div>
          <div class="sval">${t('theme_'+s.theme)}</div><div class="sarrow">${I.arrowL}</div></div>
      </div>
      <div class="set-group">
        <div class="set-item"><div class="sic">${I.zap}</div>
          <div class="sin"><b>${t('vibration')}</b><span>${t('vibration_d')}</span></div>
          <div class="switch ${s.vibrate?'on':''}" id="set-vib"></div></div>
        <div class="set-item"><div class="sic">${I.play}</div>
          <div class="sin"><b>${t('sound')}</b><span>${t('sound_d')}</span></div>
          <div class="switch ${s.sound?'on':''}" id="set-snd"></div></div>
      </div>
      <div class="set-group">
        <div class="set-item" id="set-support" onclick="window.open('https://abarsayeh.ir/Dariush','_blank')">
          <div class="sic">${I.support}</div>
          <div class="sin"><b>${t('support')}</b><span>${t('support_d')}</span></div>
          <div class="sval">Dariush</div><div class="sarrow">${I.arrowL}</div>
        </div>
        <div class="set-item" id="set-channel" onclick="window.open('https://abarsayeh.ir/Gamehub','_blank')">
          <div class="sic">${I.star}</div>
          <div class="sin"><b>${t('channel')}</b><span>${t('channel_d')}</span></div>
          <div class="sval">Gamehub</div><div class="sarrow">${I.arrowL}</div>
        </div>
      </div>
      <div class="set-group">
        <div class="set-item" id="set-edit"><div class="sic">${I.user}</div>
          <div class="sin"><b>${t('edit_profile')}</b><span>${App.state.user?.name||''}</span></div>
          <div class="sarrow">${I.arrowL}</div></div>
        <div class="set-item" id="set-about"><div class="sic">${I.medal}</div>
          <div class="sin"><b>${t('about')}</b><span>${t('about_d')}</span></div>
          <div class="sarrow">${I.arrowL}</div></div>
        <div class="set-item" id="set-reset"><div class="sic" style="background:color-mix(in srgb,var(--no) 20%,transparent);color:var(--no)">${I.target}</div>
          <div class="sin"><b style="color:var(--no)">${t('reset')}</b><span>${t('reset_d')}</span></div>
          <div class="sarrow">${I.arrowL}</div></div>
      </div>`;
  },
  bind(){
    const $ = id=>document.getElementById(id);
    $('set-lang').onclick = ()=>{ App.haptic(); this.pickLanguage(); };
    $('set-theme').onclick = ()=>{ App.haptic(); this.pickTheme(); };
    $('set-vib').onclick = ()=>{
      App.state.settings.vibrate = !App.state.settings.vibrate;
      $('set-vib').classList.toggle('on', App.state.settings.vibrate);
      App.save(); App.haptic('medium');
    };
    $('set-snd').onclick = ()=>{
      App.state.settings.sound = !App.state.settings.sound;
      $('set-snd').classList.toggle('on', App.state.settings.sound);
      App.save(); App.haptic('medium');
    };
    $('set-edit').onclick = ()=>{ App.haptic(); this.editProfile(); };
    $('set-about').onclick = ()=>{ App.haptic();
      App.openModal({icon:I.medal, title:t('about'), desc:t('about_text'),
        btns:[{label:'OK', onClick:()=>App.closeModal()}]});
    };
    $('set-reset').onclick = ()=>{ App.haptic();
      App.openModal({icon:I.target, title:t('confirm_reset'), desc:t('confirm_reset_d'),
        btns:[
          {label:t('yes_delete'), onClick:()=>{
            localStorage.removeItem('gh_data');
            App.state.scores = {}; App.state.user = null;
            App.closeModal(); App.toast(t('reset_done'));
            setTimeout(()=>location.reload(), 800);
          }},
          {label:t('cancel'), ghost:1, onClick:()=>App.closeModal()}
        ]});
    };
  },
  pickLanguage(){
    const langs = Object.keys(I18N);
    const html = `<div class="lang-list">${langs.map(l=>`
      <div class="lang-opt ${App.state.settings.lang===l?'on':''}" data-l="${l}">
        <div class="flag">${I18N[l].flag}</div>
        <div class="lname">${I18N[l].name}<span>${I18N[l].dir==='rtl'?'RTL':'LTR'}</span></div>
        <div class="check">${I.check}</div>
      </div>`).join('')}</div>`;
    App.openModal({icon:I.game, title:t('language'), desc:'', btns:[]});
    document.getElementById('mbox').innerHTML = `
      <div class="mico">${I.game}</div><h3>${t('language')}</h3>
      <div style="max-height:50vh;overflow-y:auto;margin:12px 0;text-align:right">${html}</div>
      <button class="btn ghost" id="langClose">${t('cancel')}</button>`;
    document.getElementById('langClose').onclick = ()=>App.closeModal();
    document.querySelectorAll('.lang-opt').forEach(el=>{
      el.onclick = ()=>{
        const l = el.dataset.l;
        App.state.settings.lang = l; LANG = l; App.applyDir(); App.save();
        App.closeModal(); App.renderHeader(); App.renderNav(); App.go('settings'); App.haptic('success');
      };
    });
  },
  pickTheme(){
    const html = `<div class="themes">${this.THEMES.map(th=>{
      const c = this.THEME_COLORS[th];
      return `<div class="theme-opt ${App.state.settings.theme===th?'on':''}" data-t="${th}" style="background:linear-gradient(135deg,${c[0]},${c[2]})">
        <div class="dot" style="background:linear-gradient(90deg,${c[1]},${c[2]})"></div></div>`;
    }).join('')}</div>`;
    App.openModal({icon:I.star, title:t('theme'), desc:'', btns:[]});
    document.getElementById('mbox').innerHTML = `
      <div class="mico">${I.star}</div><h3>${t('theme')}</h3>
      <div style="margin:12px 0;text-align:right">${html}</div>
      <button class="btn ghost" id="thClose">${t('cancel')}</button>`;
    document.getElementById('thClose').onclick = ()=>App.closeModal();
    document.querySelectorAll('.theme-opt').forEach(el=>{
      el.onclick = ()=>{
        const th = el.dataset.t;
        App.state.settings.theme = th; App.applyTheme(th); App.save();
        App.closeModal(); App.go('settings'); App.haptic('success');
      };
    });
  },
  editProfile(){
    const u = App.state.user;
    const AVS = [
      {bg:'#6366f1',icon:I.user},{bg:'#a855f7',icon:I.brain},{bg:'#06b6d4',icon:I.zap},
      {bg:'#ef4444',icon:I.target},{bg:'#10b981',icon:I.snake},{bg:'#f59e0b',icon:I.medal},
      {bg:'#ec4899',icon:I.star},{bg:'#8b5cf6',icon:I.trophy}
    ];
    const initials = (u.name||'?').trim().split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
    let cur = u.avatar;
    const render = ()=>{
      let prev = '';
      if(cur){ if(cur.type==='img') prev = `<img src="${cur.value}">`;
        else prev = `<div style="background:${cur.bg};width:100%;height:100%;display:flex;align-items:center;justify-content:center">${cur.icon}</div>`;
      } else prev = `<div style="background:var(--grad);width:100%;height:100%;display:flex;align-items:center;justify-content:center">${initials}</div>`;
      return `<div class="mico">${I.user}</div><h3>${t('edit_profile')}</h3>
        <div class="avatar-preview" style="margin:16px auto">${prev}</div>
        <div class="field" style="text-align:right"><label>${t('step_name')}</label>
        <input type="text" id="epName" value="${u.name}" maxlength="30" style="width:100%;background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:12px;color:var(--tx);font-family:inherit"></div>
        <div class="field" style="text-align:right;margin-top:10px"><label>Username</label>
        <input type="text" id="epUser" value="${u.username}" maxlength="20" style="width:100%;background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:12px;color:var(--tx);font-family:inherit"></div>
        <div class="avatar-grid" style="margin:12px auto">${AVS.map((a,i)=>`<div class="avatar-opt ${cur&&cur.type==='icon'&&cur.idx===i?'on':''}" data-i="${i}" style="background:${a.bg}">${a.icon}</div>`).join('')}</div>
        <button class="btn ghost" id="epUp" style="margin:8px auto 14px;max-width:220px;display:flex">${t('upload')}</button>
<input type="file" id="epFile" accept="image/*" style="display:none">
<div class="mbtns-row"><button class="btn ghost" id="epCancel">${t('cancel')}</button>
<button class="btn" id="epSave">${I.check} ${t('saved')}</button></div>`;
    };
    App.openModal({icon:I.user, title:'', desc:'', btns:[]});
    document.getElementById('mbox').innerHTML = render();
    const bind = ()=>{
      document.getElementById('epName').oninput = e=>{ u.name = e.target.value; };
      document.getElementById('epUser').oninput = e=>{ u.username = e.target.value.replace(/[^a-z0-9_]/gi,'').toLowerCase(); e.target.value = u.username; };
      document.querySelectorAll('.avatar-opt').forEach(el=>{
        el.onclick = ()=>{ const i = +el.dataset.i; cur = {type:'icon', idx:i, bg:AVS[i].bg, icon:AVS[i].icon};
          document.getElementById('mbox').innerHTML = render(); bind(); };
      });
      document.getElementById('epUp').onclick = ()=>document.getElementById('epFile').click();
      document.getElementById('epFile').onchange = e=>{
        const f = e.target.files[0]; if(!f) return;
        if(f.size > 2*1024*1024){ App.toast('Max 2MB'); return; }
        const r = new FileReader();
        r.onload = ev=>{ cur = {type:'img', value:ev.target.result}; document.getElementById('mbox').innerHTML = render(); bind(); };
        r.readAsDataURL(f);
      };
      document.getElementById('epCancel').onclick = ()=>App.closeModal();
      document.getElementById('epSave').onclick = ()=>{
        if(u.name.length<2){ App.toast(t('invalid_name')); return; }
        App.state.user.name = u.name; App.state.user.username = u.username; App.state.user.avatar = cur;
        App.save(); App.closeModal(); App.toast(t('profile_updated')); App.haptic('success');
        App.renderHeader(); App.go('profile');
      };
    };
    bind();
  }
};

/* ============================================================
   ONLINE (simplified essential)
   ============================================================ */
