const Games = {
  start(id){
    const map = {memory:this.memory, g2048:this.g2048, react:this.react, whack:this.whack, snake:this.snake, ttt:this.ttt};
    map[id].call(this);
  },

  /* ===== Memory ===== */
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
              const newRec = App.setScore('memory', Math.max(0, 100 - moves*3));
              setTimeout(()=>{
                App.openModal({icon:I.trophy, title:t('great'),
                  desc:t('won_in_moves',{n:moves})+(newRec?'\n'+t('new_record'):''),
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

  /* ===== 2048 ===== */
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
    const check = ()=>{
      if(grid.includes(2048)){ over=true; App.haptic('success'); App.setScore('g2048',score);
        setTimeout(()=>App.openModal({icon:I.trophy, title:t('you_won'),
          desc:t('final_score',{s:score}),
          btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('g2048');}},
                {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]}),300); return; }
      if(grid.every(v=>v) && !canMove()){ over=true; App.haptic('warning'); App.setScore('g2048',score);
        setTimeout(()=>App.openModal({icon:I.medal, title:t('game_over'),
          desc:t('final_score',{s:score}),
          btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('g2048');}},
                {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]}),300); }
      else App.setScore('g2048',score);
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

  /* ===== Reaction ===== */
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
        state='done'; render(); App.setScore('react', best); App.haptic('success');
      }
    };
    render();
    App.state.gState = { destroy(){ clearTimeout(timer); } };
  },

  /* ===== Whack ===== */
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
          const newRec = App.setScore('whack', score);
          App.haptic('success');
          App.openModal({icon:I.trophy, title:t('game_over'),
            desc:t('your_score',{s:score})+(newRec?'\n'+t('new_record'):''),
            btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('whack');}},
                  {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
        }
      },1000);
    };
    App.state.gState = { destroy(){ clearInterval(tick); clearTimeout(spawn); running=false; } };
  },

  /* ===== Snake ===== */
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
        const newRec = App.setScore('snake', score);
        App.openModal({icon:I.medal, title:t('you_lost'),
          desc:t('your_score',{s:score})+(newRec?'\n'+t('new_record'):''),
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

  /* ===== Tic Tac Toe ===== */
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
      if(w.p==='x'){ wins++; App.haptic('success');
        App.openModal({icon:I.trophy, title:t('you_won'), desc:t('great'),
          btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('ttt');}},
                {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
      } else if(w.p==='o'){ App.haptic('error');
        App.openModal({icon:I.medal, title:t('you_lost'), desc:'',
          btns:[{label:t('replay'),onClick:()=>{App.closeModal();App.startGame('ttt');}},
                {label:t('exit'),ghost:1,onClick:()=>{App.closeModal();App.closeGame();}}]});
      } else { App.haptic('medium');
        App.openModal({icon:I.target, title:t('draw'), desc:'',
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
  }
};
