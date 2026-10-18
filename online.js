const Online = {
  currentRoom: null, channel: null, isHost: false, gameType: null, _gameRunning: false, _broadcastHandlers: {},
  genCode(){ const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let code = ''; for(let i=0;i<6;i++) code += chars[Math.floor(Math.random()*chars.length)]; return code; },
  avatarHTML(avatar, name){
    if(avatar){
      if(avatar.type === 'img') return `<img src="${avatar.value}" style="width:100%;height:100%;object-fit:cover">`;
      if(avatar.type === 'icon') return `<div style="background:${avatar.bg};width:100%;height:100%;display:flex;align-items:center;justify-content:center">${avatar.icon}</div>`;
    }
    const initials = (name||'?').trim().split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
    return `<div style="background:linear-gradient(135deg,#6366f1,#a855f7);width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:12px">${initials}</div>`;
  },
  async createRoom(gameType, isPrivate){
    if(!sb){ App.toast('اتصال برقرار نیست'); return; }
    const u = App.state.user;
    let code = this.genCode();
    const room = { room_code:code, game_type:gameType, host_id:u.username, host_name:u.name, host_avatar:u.avatar,
      is_private:isPrivate, status:'waiting', current_players:1, max_players:2 };
    const saved = await API.createRoom(room);
    if(!saved){ App.toast('خطا در ساخت اتاق'); return; }
    this.currentRoom = saved; this.isHost = true; this.gameType = gameType; this._gameRunning = false;
    if(isPrivate) this.showRoomCode(code); else this.enterLobby(saved);
  },
  showRoomCode(code){
    document.getElementById('mbox').innerHTML = `
      <div class="mico" style="background:linear-gradient(135deg,#8b5cf6,#6366f1)">${I.user}</div>
      <h3>اتاق خصوصی ساخته شد</h3><p>این کد رو برای دوستت بفرست:</p>
      <div class="room-code-big">${code}</div>
      <button class="btn" id="copyCodeBtn" style="margin-bottom:10px">${I.check} کپی کد</button>
      <button class="btn ghost" id="goLobbyBtn">منتظر می‌مونم</button>`;
    document.getElementById('modal').classList.add('open');
    document.getElementById('copyCodeBtn').onclick = ()=>{ navigator.clipboard?.writeText(code); App.toast('کد کپی شد'); App.haptic('success'); };
    document.getElementById('goLobbyBtn').onclick = ()=>{ App.closeModal(); this.enterLobby(this.currentRoom); };
  },
  async joinRoom(code){
    if(!sb){ App.toast('اتصال برقرار نیست'); return; }
    const room = await API.getRoom(code.toUpperCase());
    if(!room){ App.toast('اتاق پیدا نشد'); return; }
    const u = App.state.user;
    if(room.host_id === u.username || room.guest_id === u.username){
      this.currentRoom = room; this.isHost = room.host_id === u.username; this.gameType = room.game_type;
      this.enterLobby(room); return;
    }
    if(room.status === 'playing'){ App.toast('این اتاق پر است'); return; }
    await API.updateRoom(room.id, { guest_id:u.username, guest_name:u.name, guest_avatar:u.avatar, current_players:2, status:'playing' });
    this.currentRoom = { ...room, guest_id:u.username, guest_name:u.name, guest_avatar:u.avatar };
    this.isHost = false; this.gameType = room.game_type;
    this.enterLobby(this.currentRoom);
  },
  async joinPublicRoom(roomId){
    const { data } = await sb.from('rooms').select('*').eq('id', roomId).single();
    if(data) this.joinRoom(data.room_code);
  },
  enterLobby(room){
    App.haptic('success');
    this.currentRoom = room; this._gameRunning = false;
    App.toast('وارد لابی شدی — منتظر حریف باش');
    // Simplified lobby for single-file
    document.getElementById('mbox').innerHTML = `
      <div class="mico">${GMAP[room.game_type]?.icon || I.game}</div>
      <h3>${t(GMAP[room.game_type]?.nameKey || 'بازی')} - لابی</h3>
      <p>کد اتاق: <b style="color:var(--gold);font-family:monospace;letter-spacing:2px">${room.room_code}</b></p>
      <p style="font-size:12px;color:var(--mut)">میزبان: ${room.host_name}${room.guest_name ? ' · مهمان: '+room.guest_name : ' · در انتظار مهمان...'}</p>
      <div class="mbtns">
        ${this.isHost && room.guest_id ? `<button class="btn" onclick="App.closeModal();Online.startGame()">شروع بازی</button>` : ''}
        <button class="btn ghost" onclick="App.closeModal();Online.leaveRoom()">خروج از اتاق</button>
      </div>`;
    document.getElementById('modal').classList.add('open');
  },
  startGame(){ App.toast('بازی آنلاین شروع شد (نسخه کامل در آپدیت بعدی)'); },
  async leaveRoom(){
    if(this.currentRoom && this.isHost) await API.deleteRoom(this.currentRoom.id);
    this.currentRoom = null; this.isHost = false; App.go('home');
  },
  send(){}, on(){}
};

/* ============================================================
   INIT
   ============================================================ */
