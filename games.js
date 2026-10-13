/* ============================================================
   FACE CARD SVG
   ============================================================ */
function faceSVG(rank, suit){
  const isRed = suit === 'H' || suit === 'D';
  const skin = '#f5c99b';
  const robe = isRed ? '#c81e1e' : '#1e293b';
  const robeDark = isRed ? '#991b1b' : '#0f172a';
  const crown = '#fbbf24';
  const crownDark = '#d97706';
  const hair = rank === 'Q' && isRed ? '#f59e0b' : (rank === 'Q' ? '#1c1917' : '#3f3f46');

  if(rank === 'K'){
    return `<svg viewBox="0 0 58 80" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="80" fill="#fef3c7"/><path d="M14 80 Q14 62 29 62 Q44 62 44 80 Z" fill="${robe}"/><path d="M29 62 L29 80" stroke="${robeDark}" stroke-width="1"/><ellipse cx="29" cy="42" rx="11" ry="13" fill="${skin}"/><path d="M18 38 Q18 28 29 28 Q40 28 40 38 Q40 34 36 32 Q32 30 29 30 Q26 30 22 32 Q18 34 18 38 Z" fill="${hair}"/><path d="M17 28 L20 20 L23 26 L26 18 L29 25 L32 18 L35 26 L38 20 L41 28 Z" fill="${crown}" stroke="${crownDark}" stroke-width="1"/><circle cx="20" cy="20" r="1.5" fill="#dc2626"/><circle cx="29" cy="18" r="1.5" fill="#2563eb"/><circle cx="38" cy="20" r="1.5" fill="#dc2626"/><circle cx="25" cy="42" r="1.3" fill="#18181b"/><circle cx="33" cy="42" r="1.3" fill="#18181b"/><path d="M24 48 Q26 46 29 47 Q32 46 34 48 Q32 49.5 29 49 Q26 49.5 24 48 Z" fill="${hair}"/></svg>`;
  }
  if(rank === 'Q'){
    return `<svg viewBox="0 0 58 80" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="80" fill="#fce7f3"/><path d="M13 80 Q13 60 29 60 Q45 60 45 80 Z" fill="${isRed?'#ec4899':'#6366f1'}"/><path d="M15 45 Q13 30 29 26 Q45 30 43 45 Q43 55 40 58 L18 58 Q15 55 15 45 Z" fill="${hair}"/><ellipse cx="29" cy="42" rx="10" ry="12" fill="${skin}"/><path d="M19 40 Q19 30 29 30 Q39 30 39 40 Q38 34 34 33 Q30 32 29 33 Q28 32 24 33 Q20 34 19 40 Z" fill="${hair}"/><path d="M19 30 L22 24 L25 28 L29 22 L33 28 L36 24 L39 30 Z" fill="${crown}" stroke="${crownDark}" stroke-width=".9"/><circle cx="29" cy="22" r="1.4" fill="#fff"/><ellipse cx="25" cy="42" rx="1.2" ry="1.5" fill="#18181b"/><ellipse cx="33" cy="42" rx="1.2" ry="1.5" fill="#18181b"/><path d="M25.5 48 Q29 47 32.5 48 Q31 50.5 29 50.5 Q27 50.5 25.5 48 Z" fill="#dc2626"/></svg>`;
  }
  if(rank === 'J'){
    return `<svg viewBox="0 0 58 80" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="80" fill="#e0e7ff"/><path d="M13 80 Q13 60 29 58 Q45 60 45 80 Z" fill="${robe}"/><circle cx="29" cy="68" r="3" fill="${crown}"/><rect x="25" y="54" width="8" height="6" fill="${skin}"/><ellipse cx="29" cy="42" rx="10" ry="12" fill="${skin}"/><path d="M18 38 Q18 26 29 26 Q40 26 40 38 Q39 32 36 30 Q32 28 29 28 Q26 28 22 30 Q19 32 18 38 Z" fill="${hair}"/><path d="M17 32 Q17 22 29 22 Q41 22 41 32 L41 35 L17 35 Z" fill="${robe}" stroke="${robeDark}" stroke-width=".8"/><rect x="16" y="34" width="26" height="2" fill="${crown}"/><path d="M35 24 Q42 16 44 22 Q42 20 40 24 Q42 22 42 26 Z" fill="${isRed?'#dc2626':'#2563eb'}"/><circle cx="25" cy="42" r="1.2" fill="#18181b"/><circle cx="33" cy="42" r="1.2" fill="#18181b"/></svg>`;
  }
  return '';
}

/* ============================================================
   GAMES
   ============================================================ */
const Games = {
  start(id){
    const map = {
      memory:this.memory, g2048:this.g2048, react:this.react, whack:this.whack,
      snake:this.snake, ttt:this.ttt, simon:this.simon, math:this.math,
      color:this.color, puzzle:this.puzzle
    };
    map[id].call(this);
  },

  /* ===== 1. Memory ===== */
  memory(){
    const ICONS = [I.brain,I.zap,I.target,I.snake,I.grid,I.medal,I.coin,I.star];
    const deck = [...ICONS,...ICONS].sort(()=>Math.random()-.5);
    let flipped=[], matched=0, moves=0, lock=false;
    const body = document.getElementById('gbody');
    body.innerHTML = `<div class="mgrid" id="mgrid">${deck.map((ic,i)=>`
      <div class="mcard" data-i="${i}">
        <div class="face back">${I.grid}</div>
        <div class="face front">${ic}</div>
      </div>`).join('')}</div>`;
    App.setGameScore(0);
    const grid = document.getElementById('mgrid');
    grid.onclick = e=>{
      const c = e.target.closest('.mcard'); if(!c||lock) return;
      const i = +c.dataset.i;
      if(c.classList.contains('flip')||c.classList.contains('done')) return;
      c.classList.add('flip'); flipped.push({c,i});
      App.haptic('light');
      if(flipped.length===2){
        lock=true; moves++; App.setGameScore(moves);
        const [a,b] = flipped;
        if(deck[a.i]===deck[b.i]){
          setTimeout(()=>{ a.c.classList.add('done'); b.c.classList.add('done');
            matched++; flipped=[]; lock=false; App.haptic('success');
            if(matched===ICONS.length){
              const coins = Math.max(1, 15 - moves);
              const newRec = App.setScore('memory', Math.max(0, 100 - moves*3));
              App.addCoins(coins);
              setTimeout(()=>{
                App.openModal({icon:I.trophy, title:t('great'),
                  desc:t('won_in_moves',{n:moves})+(newRec?'\n'+t('new_record'):''),
                  coins: coins,
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

  /* ===== 2. 2048 ===== */
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
      const coins = Math.min(20, Math.floor(score/300));
      App.setScore('g2048', score);
      if(coins > 0) App.addCoins(coins);
      App.haptic(won?'success':'warning');
      setTimeout(()=>App.openModal({icon:won?I.trophy:I.medal, title:won?t('you_won'):t('game_over'),
        desc:t('final_score',{s:score}),
        coins: coins,
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
      if(grid.join(',')!==before){ add(); render(); App.haptic('light'); check(); }
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

  /* ===== 3. Reaction ===== */
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
      body.innerHTML = `<div class="reactBox ${cfg.cls}" id="reactBox">
        ${cfg.icon}<h4>${cfg.h}</h4><p>${cfg.p}</p>
        ${times.length?`<p style="margin-top:8px;font-size:11px">${t('last_times')}: ${times.slice(-3).join(', ')} ms</p>`:''}
      </div>`;
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
        const newRec = App.setScore('react', best);
        let coins = 0;
        if(newRec){
          coins = tt<250?5 : tt<350?3 : tt<450?2 : tt<600?1 : 0;
          if(coins) App.addCoins(coins);
        }
        App.haptic('success');
        if(coins) App.toast(`+${coins} ${t('coin')}`);
      }
    };
    render();
    App.state.gState = { destroy(){ clearTimeout(timer); } };
  },

  /* ===== 4. Whack ===== */
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
        App.haptic('medium');
        setTimeout(()=>h.classList.remove('up','hit'),150);
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
          const coins = Math.floor(score/3);
          const newRec = App.setScore('whack', score);
          if(coins > 0) App.addCoins(coins);
          App.haptic('success');
          App.openModal({icon:I.trophy, title:t('game_over'),
            desc:t('your_score',{s:score})+(newRec?'\n'+t('new_record'):''),
            coins: coins,
            btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('whack');}},
                  {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
        }
      },1000);
    };
    App.state.gState = { destroy(){ clearInterval(tick); clearTimeout(spawn); running=false; } };
  },

  /* ===== 5. Snake ===== */
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
        dead = true; clearInterval(tick); App.haptic('error');
        const coins = Math.floor(score/3);
        const newRec = App.setScore('snake', score);
        if(coins > 0) App.addCoins(coins);
        App.openModal({icon:I.medal, title:t('you_lost'),
          desc:t('your_score',{s:score})+(newRec?'\n'+t('new_record'):''),
          coins: coins,
          btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('snake');}},
                {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
        return;
      }
      snake.unshift(h);
      if(h.x===food.x&&h.y===food.y){ score++; food = rand(); App.haptic('light'); }
      else snake.pop();
      draw();
    };
    const setDir = d=>{
      if((dir===0&&d===2)||(dir===2&&d===0)||(dir===1&&d===3)||(dir===3&&d===1)) return;
      dir = d;
    };
    document.querySelectorAll('.dbtn').forEach(b=>{ b.onclick = ()=>{ setDir(+b.dataset.d); App.haptic('light'); }; });
    const onKey = e=>{
      const m = {ArrowUp:0,ArrowRight:1,ArrowDown:2,ArrowLeft:3,w:0,d:1,s:2,a:3,W:0,D:1,S:2,A:3};
      if(m[e.key]!==undefined){ e.preventDefault(); setDir(m[e.key]); }
    };
    document.addEventListener('keydown', onKey);
    let sx=0,sy=0;
    cv.addEventListener('touchstart', e=>{ sx=e.touches[0].clientX; sy=e.touches[0].clientY; },{passive:true});
    cv.addEventListener('touchend', e=>{
      const dx=e.changedTouches[0].clientX-sx, dy=e.changedTouches[0].clientY-sy;
      if(Math.abs(dx)<20&&Math.abs(dy)<20) return;
      if(Math.abs(dx)>Math.abs(dy)) setDir(dx>0?1:3); else setDir(dy>0?2:0);
    },{passive:true});
    draw();
    tick = setInterval(step, 160);
    App.state.gState = { destroy(){ clearInterval(tick); document.removeEventListener('keydown', onKey); } };
  },

  /* ===== 6. Tic Tac Toe ===== */
  ttt(){
    let board = Array(9).fill(''), done=false, wins=0;
    const body = document.getElementById('gbody');
    body.innerHTML = `<div class="ttt" id="ttt">${Array(9).fill(0).map((_,i)=>`<div class="ttc" data-i="${i}"></div>`).join('')}</div>
      <button class="btn ghost" style="margin-top:18px;max-width:320px" id="tttNew">${I.refresh} ${t('new_game')}</button>`;
    App.setGameScore(wins);
    const el = document.getElementById('ttt');
    const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const render = ()=>{
      el.querySelectorAll('.ttc').forEach((c,i)=>{
        c.className = 'ttc' + (board[i]?' '+board[i]:'');
        c.innerHTML = board[i]==='x'?I.xoX:board[i]==='o'?I.xoO:'';
      });
      App.setGameScore(wins);
    };
    const winner = b=>{
      for(const L of LINES){ const [a,c,d]=L; if(b[a]&&b[a]===b[c]&&b[a]===b[d]) return {p:b[a],line:L}; }
      return b.every(v=>v)?{p:'draw'}:null;
    };
    const aiMove = ()=>{
      const empty = board.map((v,i)=>v?null:i).filter(v=>v!==null);
      if(!empty.length) return;
      for(const i of empty){ const b=[...board]; b[i]='o'; if(winner(b)?.p==='o'){ board[i]='o'; return; } }
      for(const i of empty){ const b=[...board]; b[i]='x'; if(winner(b)?.p==='x'){ board[i]='o'; return; } }
      if(!board[4]){ board[4]='o'; return; }
      const corners = [0,2,6,8].filter(i=>!board[i]);
      if(corners.length){ board[corners[Math.floor(Math.random()*corners.length)]]='o'; return; }
      board[empty[Math.floor(Math.random()*empty.length)]]='o';
    };
    const end = w=>{
      done = true;
      let coins = 0;
      if(w.p==='x'){ wins++; coins = 3; App.haptic('success');
        App.setScore('ttt', wins); App.addCoins(coins);
        App.openModal({icon:I.trophy, title:t('you_won'), desc:t('great'),
          coins: coins,
          btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('ttt');}},
                {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
      } else if(w.p==='o'){ App.haptic('error');
        App.openModal({icon:I.medal, title:t('you_lost'), desc:'',
          coins: 0,
          btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('ttt');}},
                {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
      } else { coins = 1; App.haptic('medium'); App.addCoins(coins);
        App.openModal({icon:I.target, title:t('draw'), desc:'',
          coins: coins,
          btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('ttt');}},
                {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
      }
    };
    el.onclick = e=>{
      const c = e.target.closest('.ttc'); if(!c||done) return;
      const i = +c.dataset.i; if(board[i]) return;
      board[i]='x'; App.haptic('light'); render();
      let w = winner(board); if(w) return end(w);
      setTimeout(()=>{
        aiMove(); render(); App.haptic('light');
        w = winner(board); if(w) end(w);
      }, 350);
    };
    document.getElementById('tttNew').onclick = ()=>App.startGame('ttt');
    render();
    App.state.gState = {};
  },

  /* ===== 7. Simon Says ===== */
  simon(){
    const COLORS = [
      {bg:'#ef4444', gl:'#fca5a5'},
      {bg:'#10b981', gl:'#6ee7b7'},
      {bg:'#3b82f6', gl:'#93c5fd'},
      {bg:'#f59e0b', gl:'#fcd34d'}
    ];
    let seq = [], input = [], level = 0, showing = false, dead = false;
    const body = document.getElementById('gbody');
    body.innerHTML = `
      <div class="simon-status" id="simonStatus">${t('ready')}</div>
      <div class="simon-grid" id="simonGrid">
        ${COLORS.map((c,i)=>`<div class="simon-btn" data-i="${i}" style="--c:${c.bg};--cg:${c.gl}"></div>`).join('')}
      </div>
      <div class="simon-level">${t('score')}: <span id="simonLevel">0</span></div>
      <button class="btn" style="margin-top:16px;max-width:340px" id="simonStart">${I.play} ${t('start')}</button>`;
    const grid = document.getElementById('simonGrid');
    const status = document.getElementById('simonStatus');
    const levelEl = document.getElementById('simonLevel');
    const flash = (i, dur=400) => new Promise(res=>{
      const el = grid.querySelector(`[data-i="${i}"]`);
      el.classList.add('active');
      setTimeout(()=>{ el.classList.remove('active'); setTimeout(res, 120); }, dur);
    });
    const showSeq = async ()=>{
      showing = true;
      status.textContent = t('watch');
      await new Promise(r=>setTimeout(r, 600));
      for(const i of seq) await flash(i);
      showing = false;
      input = [];
      status.textContent = t('your_turn');
    };
    const nextLevel = ()=>{
      level++;
      levelEl.textContent = level;
      App.setGameScore(level);
      seq.push(Math.floor(Math.random()*4));
      setTimeout(showSeq, 500);
    };
    const endGame = ()=>{
      dead = true;
      const coins = Math.min(20, Math.max(0, level - 1));
      const newRec = App.setScore('simon', Math.max(0, level - 1));
      if(coins > 0) App.addCoins(coins);
      App.haptic('success');
      App.openModal({icon:I.trophy, title:t('game_over'),
        desc:t('final_score',{s:level-1}) + (newRec?'\n'+t('new_record'):''),
        coins: coins,
        btns:[{label:t('replay'), onClick:()=>{App.closeModal();App.startGame('simon');}},
              {label:t('exit'), ghost:1, onClick:()=>{App.closeModal();App.closeGame();}}]});
    };
    grid.onclick = e=>{
      if(showing || dead) return;
      const btn = e.target.closest('.simon-btn');
      if(!btn) return;
      const i = +btn.dataset.i;
      flash(i, 200);
      App.haptic('light');
      input.push(i);
      const idx = input.length - 1;
      if(input[idx] !== seq[idx]){
        App.haptic('error');
        setTimeout(endGame, 300);
        return;
      }
      if(input.length === seq.length){
        setTimeout(nextLevel, 500);
      }
    };
    document.getElementById('simonStart').onclick = ()=>{
      document.getElementById('simonStart').style.display = 'none';
      seq = []; input = []; level = 0; dead = false;
      nextLevel();
    };
    App.state.gState = { destroy(){ dead = true; } };
  },

  /* ===== 8. Math Quiz ===== */
  math(){
    let score = 0, time = 30, current = null, tick, dead = false;
    const body = document.getElementById('gbody');
    body.innerHTML = `
      <div style="display:flex;justify-content:space-between;width:100%;max-width:340px;margin-bottom:14px;gap:8px">
        <div class="gscore" style="flex:1;justify-content:center">${I.zap} ${t('time')}: <span id="mTime">30</span>s</div>
        <div class="gscore" style="flex:1;justify-content:center">${I.star} ${t('score')}: <span id="mScore">0</span></div>
      </div>
      <div class="math-box" id="mathQ">?</div>
      <div class="math-opts" id="mathOpts"></div>
      <button class="btn" style="margin-top:16px;max-width:340px" id="mStart">${I.play} ${t('start')}</button>`;
    const qEl = document.getElementById('mathQ');
    const optEl = document.getElementById('mathOpts');
    const timeEl = document.getElementById('mTime');
    const scoreEl = document.getElementById('mScore');
    const startBtn = document.getElementById('mStart');
    const genProblem = ()=>{
      const ops = ['+','−','×'];
      const op = ops[Math.floor(Math.random()*ops.length)];
      let a, b, ans;
      if(op === '+'){ a = 5+Math.floor(Math.random()*45); b = 5+Math.floor(Math.random()*45); ans = a+b; }
      else if(op === '−'){ a = 20+Math.floor(Math.random()*50); b = 5+Math.floor(Math.random()*Math.min(a-5, 40)); ans = a-b; }
      else { a = 2+Math.floor(Math.random()*10); b = 2+Math.floor(Math.random()*10); ans = a*b; }
      const opts = [ans];
      let guard = 0;
      while(opts.length < 4 && guard++ < 50){
        const d = (Math.random() < .5 ? -1 : 1) * (1+Math.floor(Math.random()*10));
        const wrong = ans + d;
        if(wrong > 0 && !opts.includes(wrong)) opts.push(wrong);
      }
      opts.sort(()=>Math.random()-.5);
      current = {q:`${a} ${op} ${b}`, ans, opts};
      qEl.textContent = current.q + ' = ?';
      optEl.innerHTML = opts.map(o=>`<button class="math-opt" data-v="${o}">${o}</button>`).join('');
      optEl.querySelectorAll('.math-opt').forEach(b=>{
        b.onclick = ()=>{
          if(dead) return;
          const v = +b.dataset.v;
          if(v === current.ans){
            score++; scoreEl.textContent = score;
            b.style.background = 'var(--ok)'; b.style.color = '#fff';
            App.haptic('light');
            setTimeout(genProblem, 150);
          } else {
            b.style.background = 'var(--no)'; b.style.color = '#fff';
            App.haptic('error');
            setTimeout(()=>{ b.style.background = ''; b.style.color = ''; }, 300);
          }
        };
      });
    };
    const endGame = ()=>{
      dead = true;
      const coins = Math.floor(score/3);
      const newRec = App.setScore('math', score);
      if(coins > 0) App.addCoins(coins);
      App.haptic('success');
      App.openModal({icon:I.trophy, title:t('game_over'),
        desc:t('final_score',{s:score})+(newRec?'\n'+t('new_record'):''),
        coins: coins,
        btns:[{label:t('replay'), onClick:()=>{App.closeModal();App.startGame('math');}},
              {label:t('exit'), ghost:1, onClick:()=>{App.closeModal();App.closeGame();}}]});
    };
    startBtn.onclick = ()=>{
      startBtn.style.display = 'none';
      score = 0; time = 30; dead = false;
      timeEl.textContent = 30; scoreEl.textContent = 0;
      genProblem();
      tick = setInterval(()=>{
        time--; timeEl.textContent = time;
        if(time <= 0){ clearInterval(tick); endGame(); }
      }, 1000);
    };
    App.state.gState = { destroy(){ clearInterval(tick); dead = true; } };
  },

  /* ===== 9. Color Match ===== */
  color(){
    const COLORS = [
      {name:{fa:'قرمز',en:'Red',ar:'أحمر',tr:'Kırmızı',ru:'Красный',de:'Rot',es:'Rojo'}, hex:'#ef4444'},
      {name:{fa:'آبی',en:'Blue',ar:'أزرق',tr:'Mavi',ru:'Синий',de:'Blau',es:'Azul'}, hex:'#3b82f6'},
      {name:{fa:'سبز',en:'Green',ar:'أخضر',tr:'Yeşil',ru:'Зелёный',de:'Grün',es:'Verde'}, hex:'#10b981'},
      {name:{fa:'زرد',en:'Yellow',ar:'أصفر',tr:'Sarı',ru:'Жёлтый',de:'Gelb',es:'Amarillo'}, hex:'#f59e0b'}
    ];
    let score = 0, time = 30, current = null, tick, dead = false;
    const body = document.getElementById('gbody');
    body.innerHTML = `
      <div style="display:flex;justify-content:space-between;width:100%;max-width:340px;margin-bottom:14px;gap:8px">
        <div class="gscore" style="flex:1;justify-content:center">${I.zap} ${t('time')}: <span id="cTime">30</span>s</div>
        <div class="gscore" style="flex:1;justify-content:center">${I.star} ${t('score')}: <span id="cScore">0</span></div>
      </div>
      <div class="color-hint">${t('tap_word_color')}</div>
      <div class="color-word" id="colorWord">?</div>
      <div class="color-opts" id="colorOpts"></div>
      <button class="btn" style="margin-top:16px;max-width:340px" id="cStart">${I.play} ${t('start')}</button>`;
    const wordEl = document.getElementById('colorWord');
    const optsEl = document.getElementById('colorOpts');
    const timeEl = document.getElementById('cTime');
    const scoreEl = document.getElementById('cScore');
    const startBtn = document.getElementById('cStart');
    const newRound = ()=>{
      const wordIdx = Math.floor(Math.random()*4);
      let inkIdx = Math.floor(Math.random()*4);
      while(inkIdx === wordIdx) inkIdx = Math.floor(Math.random()*4);
      current = { answer: wordIdx };
      wordEl.textContent = COLORS[wordIdx].name[LANG] || COLORS[wordIdx].name.fa;
      wordEl.style.color = COLORS[inkIdx].hex;
      optsEl.innerHTML = COLORS.map((c,i)=>`<button class="color-opt" data-i="${i}" style="background:${c.hex}"></button>`).join('');
      optsEl.querySelectorAll('.color-opt').forEach(b=>{
        b.onclick = ()=>{
          if(dead) return;
          const i = +b.dataset.i;
          if(i === current.answer){
            score++; scoreEl.textContent = score;
            App.haptic('light');
            b.style.transform = 'scale(1.15)';
            setTimeout(()=>{ b.style.transform = ''; newRound(); }, 150);
          } else {
            App.haptic('error');
            b.style.opacity = '.3';
            setTimeout(()=>{ b.style.opacity = ''; }, 300);
          }
        };
      });
    };
    const endGame = ()=>{
      dead = true;
      const coins = Math.floor(score/3);
      const newRec = App.setScore('color', score);
      if(coins > 0) App.addCoins(coins);
      App.haptic('success');
      App.openModal({icon:I.trophy, title:t('game_over'),
        desc:t('final_score',{s:score})+(newRec?'\n'+t('new_record'):''),
        coins: coins,
        btns:[{label:t('replay'), onClick:()=>{App.closeModal();App.startGame('color');}},
              {label:t('exit'), ghost:1, onClick:()=>{App.closeModal();App.closeGame();}}]});
    };
    startBtn.onclick = ()=>{
      startBtn.style.display = 'none';
      score = 0; time = 30; dead = false;
      timeEl.textContent = 30; scoreEl.textContent = 0;
      newRound();
      tick = setInterval(()=>{
        time--; timeEl.textContent = time;
        if(time <= 0){ clearInterval(tick); endGame(); }
      }, 1000);
    };
    App.state.gState = { destroy(){ clearInterval(tick); dead = true; } };
  },

  /* ===== 10. Sliding Puzzle ===== */
  puzzle(){
    let grid = [], empty = 8, moves = 0, solved = false;
    const body = document.getElementById('gbody');
    body.innerHTML = `
      <div style="display:flex;justify-content:center;width:100%;max-width:340px;margin-bottom:14px">
        <div class="gscore">${I.target} ${t('puzzle_u')}: <span id="pzMoves">0</span></div>
      </div>
      <div class="puzzle-grid" id="puzzleGrid"></div>
      <button class="btn ghost" style="margin-top:16px;max-width:340px" id="pzNew">${I.refresh} ${t('restart')}</button>`;
    const gridEl = document.getElementById('puzzleGrid');
    const movesEl = document.getElementById('pzMoves');
    const render = ()=>{
      gridEl.innerHTML = grid.map((v,i)=>{
        if(v === 0) return `<div class="pz-cell empty" data-i="${i}"></div>`;
        return `<div class="pz-cell" data-i="${i}">${v}</div>`;
      }).join('');
      movesEl.textContent = moves;
    };
    const isSolved = ()=>{
      for(let i=0;i<8;i++) if(grid[i] !== i+1) return false;
      return grid[8] === 0;
    };
    const shuffle = ()=>{
      grid = [1,2,3,4,5,6,7,8,0];
      empty = 8; moves = 0; solved = false;
      for(let i=0;i<200;i++){
        const neighbors = [];
        const r = Math.floor(empty/3), c = empty%3;
        if(r>0) neighbors.push(empty-3);
        if(r<2) neighbors.push(empty+3);
        if(c>0) neighbors.push(empty-1);
        if(c<2) neighbors.push(empty+1);
        const n = neighbors[Math.floor(Math.random()*neighbors.length)];
        grid[empty] = grid[n]; grid[n] = 0; empty = n;
      }
      render();
    };
    gridEl.onclick = e=>{
      if(solved) return;
      const cell = e.target.closest('.pz-cell'); if(!cell) return;
      const i = +cell.dataset.i;
      const r1 = Math.floor(i/3), c1 = i%3;
      const r2 = Math.floor(empty/3), c2 = empty%3;
      if(Math.abs(r1-r2) + Math.abs(c1-c2) !== 1) return;
      grid[empty] = grid[i]; grid[i] = 0; empty = i;
      moves++; render(); App.haptic('light');
      if(isSolved()){
        solved = true;
        const coins = Math.max(3, 10 - Math.floor(moves/10));
        const newRec = App.setScore('puzzle', Math.max(0, 2000 - moves*3));
        App.addCoins(coins);
        App.haptic('success');
        App.openModal({icon:I.trophy, title:t('you_won'),
          desc:t('won_in_moves',{n:moves})+(newRec?'\n'+t('new_record'):''),
          coins: coins,
          btns:[{label:t('replay'), onClick:()=>{App.closeModal();App.startGame('puzzle');}},
                {label:t('exit'), ghost:1, onClick:()=>{App.closeModal();App.closeGame();}}]});
      }
    };
    document.getElementById('pzNew').onclick = ()=>shuffle();
    shuffle();
    App.state.gState = {};
  },
  /* ============================================================
   ONLINE: Tic Tac Toe
   ============================================================ */
tttOnline(Online){
  let board = Array(9).fill('');
  let mySymbol = Online.isHost ? 'x' : 'o';
  let myTurn = Online.isHost;
  let gameOver = false;
  const body = document.getElementById('gbody');

  function render(){
    body.innerHTML = `
      <div class="online-ttt">
        <div class="online-players-bar">
          <div class="opb ${Online.isHost?'active':''}">
            <div class="opb-av">${Online.avatarHTML(Online.currentRoom.host_avatar, Online.currentRoom.host_name)}</div>
            <div class="opb-name">${Online.currentRoom.host_name}</div>
            <div class="opb-sym">X</div>
          </div>
          <div class="opb-vs">VS</div>
          <div class="opb ${!Online.isHost?'active':''}">
            <div class="opb-av">${Online.avatarHTML(Online.currentRoom.guest_avatar, Online.currentRoom.guest_name)}</div>
            <div class="opb-name">${Online.currentRoom.guest_name}</div>
            <div class="opb-sym">O</div>
          </div>
        </div>
        <div class="ttt-grid" id="tttGrid">
          ${board.map((v,i) => `
            <div class="ttc ${v?'filled '+v:''}" data-i="${i}">
              ${v === 'x' ? I.xoX : v === 'o' ? I.xoO : ''}
            </div>
          `).join('')}
        </div>
        <div class="online-turn-info">${myTurn ? 'نوبت شما' : 'نوبت حریف...'}</div>
      </div>
    `;

    if(myTurn && !gameOver){
      document.querySelectorAll('.ttc').forEach(cell => {
        cell.onclick = () => makeMove(+cell.dataset.i);
      });
    }
  }

  function makeMove(i){
    if(!myTurn || board[i] || gameOver) return;
    board[i] = mySymbol;
    myTurn = false;
    App.haptic('light');
    render();
    Online.send('ttt_move', { index: i, symbol: mySymbol });
    const w = checkWinner();
    if(w) end(w);
  }

  Online.on('ttt_move', (data) => {
    board[data.index] = data.symbol;
    myTurn = true;
    App.haptic('light');
    render();
    const w = checkWinner();
    if(w) end(w);
  });

  function checkWinner(){
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(const [a,b,c] of lines){
      if(board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    if(board.every(v => v)) return 'draw';
    return null;
  }

  function end(w){
    gameOver = true;
    let coins = 0;
    if(w === mySymbol){ coins = 5; App.addCoins(coins); App.haptic('success'); }
    else if(w === 'draw'){ coins = 2; App.addCoins(coins); }
    setTimeout(() => {
      App.openModal({
        icon: w === mySymbol ? I.trophy : w === 'draw' ? I.target : I.medal,
        title: w === mySymbol ? 'بردی!' : w === 'draw' ? 'مساوی!' : 'باختی!',
        desc: w === mySymbol ? 'حریف رو شکست دادی!' : '',
        coins: coins,
        btns: [{label: 'خروج از اتاق', onClick: () => { App.closeModal(); Online.leaveRoom(); }}]
      });
    }, 500);
  }

  render();
},

/* ============================================================
   ONLINE: Hafto4
   ============================================================ */
hafto4Online(Online){
  // نسخه آنلاین بازی هفت و چهار
  // میزبان منطق بازی رو کنترل میکنه، مهمان فقط حرکاتش رو می‌فرسته
  const G = {
    deck: [], myHand: [], oppHand: [], table: [],
    myCaptured: [], oppCaptured: [], mySours: 0, oppSours: 0,
    lastCapturer: null, round: 1, turn: 'me', finished: false, busy: false
  };
  const isHost = Online.isHost;
  const SUITS = ['S','H','D','C'];
  const SUIT_CHARS = { S:'♠', H:'♥', D:'♦', C:'♣' };
  const RANKS = [1,2,3,4,5,6,7,8,9,10,11,12,13];
  const body = document.getElementById('gbody');

  function rankLabel(r){
    if(r === 1) return 'A'; if(r === 11) return 'J'; if(r === 12) return 'Q'; if(r === 13) return 'K';
    return String(r);
  }
  function isRed(s){ return s === 'H' || s === 'D'; }
  function isNumeral(r){ return r >= 1 && r <= 10; }
  function faNum(n){ return String(n).replace(/\d/g, d => ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'][+d]); }

  function findCaptures(played, table){
    const r = played.rank;
    if(r === 11) return table.filter(c => isNumeral(c.rank) || c.rank === 11);
    if(r === 13){ const k = table.find(c => c.rank === 13); return k ? [k] : []; }
    if(r === 12){ const q = table.find(c => c.rank === 12); return q ? [q] : []; }
    if(r > 10) return [];
    const need = 11 - r;
    if(need <= 0) return [];
    const nums = table.filter(c => isNumeral(c.rank));
    const single = nums.find(c => c.rank === need);
    if(single) return [single];
    for(let i=0;i<nums.length;i++) for(let j=i+1;j<nums.length;j++)
      if(nums[i].rank + nums[j].rank === need) return [nums[i], nums[j]];
    for(let i=0;i<nums.length;i++) for(let j=i+1;j<nums.length;j++) for(let k=j+1;k<nums.length;k++)
      if(nums[i].rank + nums[j].rank + nums[k].rank === need) return [nums[i], nums[j], nums[k]];
    return [];
  }

  function buildDeck(){
    const d = [];
    for(const s of SUITS) for(const r of RANKS) d.push({suit:s, rank:r, id:s+r});
    for(let i=d.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [d[i],d[j]]=[d[j],d[i]]; }
    return d;
  }

  function scoreHand(captured, sours){
    const b = { aces:0, jacks:0, clubs7:0, mostClubs:0, twoClubs:0, tenClubs:0, sour:0, total:0, _clubsCount:0 };
    b.aces = captured.filter(c => c.rank === 1).length;
    b.jacks = captured.filter(c => c.rank === 11).length;
    b.twoClubs = captured.some(c => c.suit === 'C' && c.rank === 2) ? 2 : 0;
    b.tenClubs = captured.some(c => c.suit === 'C' && c.rank === 10) ? 3 : 0;
    b.sour = sours * 5;
    b._clubsCount = captured.filter(c => c.suit === 'C').length;
    b.total = b.aces + b.jacks + b.twoClubs + b.tenClubs + b.sour;
    return b;
  }
  function finalizeScores(){
    const me = scoreHand(G.myCaptured, G.mySours);
    const op = scoreHand(G.oppCaptured, G.oppSours);
    if(me._clubsCount >= 7 && op._clubsCount < 7) me.clubs7 = 7;
    else if(op._clubsCount >= 7 && me._clubsCount < 7) op.clubs7 = 7;
    else {
      if(me._clubsCount > op._clubsCount && me._clubsCount > 3) me.mostClubs = 7;
      else if(op._clubsCount > me._clubsCount && op._clubsCount > 3) op.mostClubs = 7;
    }
    me.total += me.clubs7 + me.mostClubs;
    op.total += op.clubs7 + op.mostClubs;
    return { me, opp: op };
  }

  function cardHTML(card, opts = {}){
    const label = rankLabel(card.rank);
    const isFace = ['J','Q','K'].includes(label);
    const classes = ['card', isRed(card.suit) ? 'red' : ''];
    if(opts.playable) classes.push('playable');
    if(opts.clickable) classes.push('clickable');
    const center = isFace
      ? `<div class="face-svg">${faceSVG(label, card.suit)}</div>`
      : `<div class="center-suit">${SUIT_CHARS[card.suit]}</div>`;
    return `<div class="${classes.join(' ')}" data-id="${card.id}">
      <div class="crank">${label}</div><div class="csuit">${SUIT_CHARS[card.suit]}</div>
      ${center}
      <div class="crank-b">${label}</div><div class="csuit-b">${SUIT_CHARS[card.suit]}</div>
    </div>`;
  }

  function render(){
    const scores = finalizeScores();
    body.innerHTML = `
      <div class="online-h4">
        <div class="online-players-bar">
          <div class="opb ${!isHost?'active':''}">
            <div class="opb-av">${Online.avatarHTML(Online.currentRoom.host_avatar, Online.currentRoom.host_name)}</div>
            <div class="opb-name">${Online.currentRoom.host_name}</div>
            <div class="opb-score">${faNum(isHost ? scores.opp.total : scores.me.total)}</div>
          </div>
          <div class="opb-vs">VS</div>
          <div class="opb ${isHost?'active':''}">
            <div class="opb-av">${Online.avatarHTML(Online.currentRoom.guest_avatar, Online.currentRoom.guest_name)}</div>
            <div class="opb-name">${Online.currentRoom.guest_name}</div>
            <div class="opb-score">${faNum(isHost ? scores.me.total : scores.opp.total)}</div>
          </div>
        </div>
        <div class="h4-opp-cards">
          ${Array(Math.min(G.oppHand.length, 8)).fill(0).map(() => '<div class="opp-card"></div>').join('')}
        </div>
        <div class="h4-table">
          <div class="h4-label">زمین (${faNum(G.table.length)})</div>
          <div class="h4-table-cards">${G.table.map(c => cardHTML(c)).join('')}</div>
        </div>
        <div class="h4-my-hand">
          <div class="h4-label">دست شما (${faNum(G.myHand.length)})</div>
          <div class="h4-hand-cards">
            ${G.myHand.map(c => cardHTML(c, {
              playable: G.turn === 'me' && !G.busy && !G.finished,
              clickable: G.turn === 'me' && !G.busy && !G.finished
            })).join('')}
          </div>
        </div>
        <div class="online-turn-info">${G.turn === 'me' ? 'نوبت شما' : 'نوبت حریف...'}</div>
      </div>
    `;

    if(G.turn === 'me' && !G.busy && !G.finished){
      body.querySelectorAll('.h4-hand-cards .card').forEach(el => {
        el.onclick = () => {
          const card = G.myHand.find(c => c.id === el.dataset.id);
          if(card) requestPlay(card);
        };
      });
    }
  }

  function requestPlay(card){
    if(isHost) hostPlay(card, 'me');
    else Online.send('h4_play', { cardId: card.id });
  }

  function hostPlay(card, who){
    if(G.busy || G.finished) return;
    const hand = who === 'me' ? G.myHand : G.oppHand;
    const idx = hand.findIndex(c => c.id === card.id);
    if(idx === -1) return;
    hand.splice(idx, 1);
    const caps = findCaptures(card, G.table);
    G.busy = true;

    if(caps.length > 0){
      caps.forEach(c => {
        const i = G.table.findIndex(t => t.id === c.id);
        if(i !== -1) G.table.splice(i, 1);
      });
      const captured = who === 'me' ? G.myCaptured : G.oppCaptured;
      captured.push(card, ...caps);
      G.lastCapturer = who;
      if(G.table.length === 0){
        if(who === 'me') G.mySours++; else G.oppSours++;
      }
    } else {
      G.table.push(card);
    }
    App.haptic('light');
    setTimeout(() => hostAfterPlay(who), 200);
  }

  function hostAfterPlay(who){
    if(G.myHand.length === 0 && G.oppHand.length === 0){
      G.busy = true;
      hostNextRound();
      return;
    }
    if(who === 'me'){
      G.turn = 'opp'; G.busy = true;
    } else {
      G.turn = 'me'; G.busy = false;
    }
    syncState();
  }

  function hostNextRound(){
    if(G.table.length > 0 && G.lastCapturer){
      const t = G.lastCapturer === 'me' ? G.myCaptured : G.oppCaptured;
      t.push(...G.table);
      G.table = [];
    }
    G.round++;
    if(G.round > 6){ hostEndGame(); return; }
    for(let i=0;i<4;i++){
      if(G.deck.length > 0) G.myHand.push(G.deck.pop());
      if(G.deck.length > 0) G.oppHand.push(G.deck.pop());
    }
    G.turn = 'me'; G.busy = false;
    syncState();
  }

  function hostEndGame(){
    G.finished = true;
    if(G.table.length > 0 && G.lastCapturer){
      const t = G.lastCapturer === 'me' ? G.myCaptured : G.oppCaptured;
      t.push(...G.table);
      G.table = [];
    }
    syncState();
    Online.send('h4_end', { scores: { me: finalizeScores().me.total, opp: finalizeScores().opp.total }});
    showEnd();
  }

  function syncState(){
    render();
    if(isHost){
      Online.send('h4_state', {
        myHand: G.oppHand,
        table: G.table,
        myCaptured: G.oppCaptured,
        oppCaptured: G.myCaptured,
        mySours: G.oppSours,
        oppSours: G.mySours,
        round: G.round,
        turn: G.turn === 'me' ? 'opp' : 'me',
        busy: G.busy,
        finished: G.finished,
        lastCapturer: G.lastCapturer === 'me' ? 'opp' : (G.lastCapturer === 'opp' ? 'me' : null)
      });
    }
  }

  // Guest receiver
  Online.on('h4_state', (state) => {
    if(isHost) return;
    G.myHand = state.myHand || [];
    G.table = state.table || [];
    G.myCaptured = state.myCaptured || [];
    G.oppCaptured = state.oppCaptured || [];
    G.mySours = state.mySours || 0;
    G.oppSours = state.oppSours || 0;
    G.round = state.round || 1;
    G.turn = state.turn || 'me';
    G.busy = state.busy || false;
    G.finished = state.finished || false;
    G.lastCapturer = state.lastCapturer;
    render();
  });

  Online.on('h4_play', (data) => {
    if(!isHost) return;
    const card = G.oppHand.find(c => c.id === data.cardId);
    if(card) hostPlay(card, 'opp');
  });

  Online.on('h4_end', () => { if(!isHost) showEnd(); });

  function showEnd(){
    const scores = finalizeScores();
    const me = scores.me.total;
    const opp = scores.opp.total;
    const iWon = me > opp;
    const isTie = me === opp;
    let coins = iWon ? Math.max(8, Math.min(30, 10 + me)) : (isTie ? 5 : 2);
    App.addCoins(coins);
    App.setScore('hafto4', me);

    setTimeout(() => {
      App.openModal({
        icon: iWon ? I.trophy : isTie ? I.target : I.medal,
        title: iWon ? 'بردی!' : isTie ? 'مساوی!' : 'باختی!',
        desc: `امتیاز شما: ${faNum(me)} · حریف: ${faNum(opp)}`,
        coins: coins,
        btns: [{label: 'خروج از اتاق', onClick: () => { App.closeModal(); Online.leaveRoom(); }}]
      });
    }, 500);
  }

  // Host: شروع
  if(isHost){
    G.deck = buildDeck();
    for(let i=0;i<4;i++){
      G.myHand.push(G.deck.pop());
      G.oppHand.push(G.deck.pop());
    }
    for(let i=0;i<4;i++) G.table.push(G.deck.pop());
    G.turn = 'me';
    syncState();
  } else {
    render();
  }
},

/* ============================================================
   ONLINE: Checkers (ساده)
   ============================================================ */
checkersOnline(Online){
  // برای اختصار، فقط ساختار پایه
  const body = document.getElementById('gbody');
  body.innerHTML = `
    <div style="text-align:center;padding:40px 20px;color:var(--mut)">
      <h3 style="color:var(--tx);margin-bottom:12px">شطرنج / چکرز</h3>
      <p>این بازی در حال توسعه‌ست</p>
    </div>
  `;
}
};
