/* ============================================================
   ONLINE SYSTEM
   ============================================================ */
const Online = {
  currentRoom: null,
  channel: null,
  players: [],
  isHost: false,
  gameType: null,

  /* ===== Generate room code ===== */
  genCode(){
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for(let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  },

  /* ===== Avatar HTML helper ===== */
  avatarHTML(avatar, name){
    if(avatar){
      if(avatar.type === 'img') return `<img src="${avatar.value}" style="width:100%;height:100%;object-fit:cover">`;
      if(avatar.type === 'icon') return `<div style="background:${avatar.bg};width:100%;height:100%;display:flex;align-items:center;justify-content:center">${avatar.icon}</div>`;
    }
    const initials = (name||'?').trim().split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
    return `<div style="background:linear-gradient(135deg,#6366f1,#a855f7);width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:12px">${initials}</div>`;
  },

  /* ===== Create room ===== */
  async createRoom(gameType, isPrivate){
    if(!sb){ App.toast('اتصال برقرار نیست'); return; }
    const u = App.state.user;
    let code = this.genCode();
    let tries = 0;
    while(tries++ < 5){
      const exists = await API.getRoom(code);
      if(!exists) break;
      code = this.genCode();
    }

    const room = {
      room_code: code,
      game_type: gameType,
      host_id: u.username,
      host_name: u.name,
      host_avatar: u.avatar,
      is_private: isPrivate,
      status: 'waiting',
      current_players: 1,
      max_players: 2
    };

    const saved = await API.createRoom(room);
    if(!saved){ App.toast('خطا در ساخت اتاق'); return; }

    this.currentRoom = saved;
    this.isHost = true;
    this.gameType = gameType;

    if(isPrivate){
      this.showRoomCode(code);
    } else {
      this.enterLobby(saved);
    }
  },

  /* ===== Show room code (private) ===== */
  showRoomCode(code){
    App.openModal({
      icon: I.check,
      title: 'اتاق خصوصی ساخته شد',
      desc: 'این کد رو برای دوستت بفرست',
      btns: []
    });
    document.getElementById('mbox').innerHTML = `
      <div class="mico" style="background:linear-gradient(135deg,#8b5cf6,#6366f1)">${I.user}</div>
      <h3>اتاق خصوصی ساخته شد</h3>
      <p>این کد رو برای دوستت بفرست:</p>
      <div class="room-code-big" id="roomCodeBig">${code}</div>
      <button class="btn" id="copyCodeBtn" style="margin-bottom:10px">${I.check} کپی کد</button>
      <button class="btn ghost" id="goLobbyBtn">منتظر می‌مونم</button>
    `;
    document.getElementById('copyCodeBtn').onclick = () => {
      navigator.clipboard?.writeText(code);
      App.toast('کد کپی شد');
      App.haptic('success');
    };
    document.getElementById('goLobbyBtn').onclick = () => {
      App.closeModal();
      this.enterLobby(this.currentRoom);
    };
  },

  /* ===== Join room by code ===== */
  async joinRoom(code){
    if(!sb){ App.toast('اتصال برقرار نیست'); return; }
    const room = await API.getRoom(code.toUpperCase());
    if(!room){ App.toast('اتاق پیدا نشد'); App.haptic('error'); return; }
    if(room.status === 'playing'){ App.toast('این اتاق پر است'); return; }
    if(room.host_id === App.state.user.username){ App.toast('به اتاق خودت نمیتونی بپیوندی'); return; }

    const u = App.state.user;
    await API.updateRoom(room.id, {
      guest_id: u.username,
      guest_name: u.name,
      guest_avatar: u.avatar,
      current_players: 2,
      status: 'playing',
      updated_at: new Date().toISOString()
    });

    this.currentRoom = { ...room, guest_id: u.username, guest_name: u.name, guest_avatar: u.avatar };
    this.isHost = false;
    this.gameType = room.game_type;
    this.enterLobby(this.currentRoom);
  },

  /* ===== Join public room ===== */
  async joinPublicRoom(roomId){
    const { data } = await sb.from('rooms').select('*').eq('id', roomId).single();
    if(!data) return;
    this.joinRoom(data.room_code);
  },

  /* ===== Enter lobby ===== */
  enterLobby(room){
    App.haptic('success');
    this.renderLobby(room);
    this.connectPresence(room.room_code);
  },

  /* ===== Render lobby ===== */
  renderLobby(room){
    const g = GMAP[room.game_type];
    const u = App.state.user;
    const isHost = room.host_id === u.username;

    // حذف صفحه‌های دیگه
    document.getElementById('startScreen')?.classList.remove('on');
    document.getElementById('gameScreen')?.classList.remove('on');

    let lobby = document.getElementById('lobbyScreen');
    if(!lobby){
      lobby = document.createElement('div');
      lobby.id = 'lobbyScreen';
      lobby.className = 'screen';
      document.getElementById('app').appendChild(lobby);
    }
    lobby.classList.add('on');

    lobby.innerHTML = `
      <div class="topbar">
        <button class="tb-btn" onclick="Online.leaveRoom()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div class="tb-title">${t(g.nameKey)} - لابی</div>
        <div class="tb-round">${room.is_private ? '🔒 خصوصی' : '🌐 عمومی'}</div>
      </div>

      <div class="lobby-content">
        <div class="lobby-game-icon" style="--gc:${g.color}">${g.icon}</div>
        <h2 class="lobby-title">${t(g.nameKey)}</h2>
        <p class="lobby-sub">${t(g.descKey)}</p>

        <div class="lobby-players">
          <div class="lobby-player host">
            <div class="lp-avatar">${this.avatarHTML(room.host_avatar, room.host_name)}</div>
            <div class="lp-info"><b>${room.host_name}</b><span>میزبان</span></div>
            <div class="lp-status ready">آماده</div>
          </div>
          <div class="lobby-vs">VS</div>
          <div class="lobby-player guest empty" id="guestSlot">
            <div class="lp-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:24px;height:24px"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div class="lp-info"><b>در انتظار...</b><span>مهمان</span></div>
            <div class="lp-status waiting"><div class="spinner-sm"></div></div>
          </div>
        </div>

        <div class="lobby-code" onclick="navigator.clipboard?.writeText('${room.room_code}');App.toast('کد کپی شد')">
          کد اتاق: <span>${room.room_code}</span>
        </div>

        <button class="btn" id="lobbyActionBtn" disabled>
          ${isHost ? 'منتظر ورود مهمان...' : 'آماده‌ام!'}
        </button>
      </div>
    `;

    document.getElementById('lobbyActionBtn').onclick = () => {
      if(this.isHost) return;
      App.haptic('success');
      this.channel?.send({ type: 'broadcast', event: 'ready', payload: { username: u.username }});
      App.toast('آماده‌ای! منتظر شروع باش...');
    };
  },

  /* ===== Presence ===== */
  connectPresence(roomCode){
    if(this.channel) sb.removeChannel(this.channel);
    const u = App.state.user;

    this.channel = sb.channel('room:' + roomCode, {
      config: { presence: { key: u.username }, broadcast: { self: false } }
    });

    this.channel
      .on('presence', { event: 'sync' }, () => {
        const state = this.channel.presenceState();
        this.players = Object.values(state).flat();
        this.updateLobby();
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        App.toast('👋 ' + (newPresences[0]?.name || 'حریف') + ' وارد شد');
        App.haptic('success');
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        App.toast('🚪 حریف خارج شد');
      })
      .on('broadcast', { event: 'ready' }, () => {
        if(this.isHost){
          const btn = document.getElementById('lobbyActionBtn');
          if(btn){
            btn.disabled = false;
            btn.textContent = 'شروع بازی!';
            btn.onclick = () => this.startGame();
          }
        }
      })
      .on('broadcast', { event: 'game_start' }, () => {
        // شروع از طرف میزبان
        this.launchGame();
      })
      .subscribe(async (status) => {
        if(status === 'SUBSCRIBED'){
          await this.channel.track({
            username: u.username,
            name: u.name,
            avatar: u.avatar,
            joinedAt: Date.now()
          });
        }
      });
  },

  /* ===== Update lobby players ===== */
  updateLobby(){
    const guestSlot = document.getElementById('guestSlot');
    if(!guestSlot) return;

    const host = this.players.find(p => p.username === this.currentRoom.host_id);
    const guest = this.players.find(p => p.username !== this.currentRoom.host_id);

    if(guest){
      guestSlot.className = 'lobby-player guest';
      guestSlot.innerHTML = `
        <div class="lp-avatar">${this.avatarHTML(guest.avatar, guest.name)}</div>
        <div class="lp-info"><b>${guest.name}</b><span>مهمان</span></div>
        <div class="lp-status ready">آماده</div>
      `;
      if(this.isHost){
        const btn = document.getElementById('lobbyActionBtn');
        if(btn && btn.textContent.includes('منتظر')){
          btn.disabled = false;
          btn.textContent = 'شروع بازی!';
          btn.onclick = () => this.startGame();
        }
      }
    }
  },

  /* ===== Start game (host) ===== */
  startGame(){
    App.haptic('success');
    this.channel?.send({ type: 'broadcast', event: 'game_start', payload: {} });
    this.launchGame();
  },

  /* ===== Launch actual game ===== */
  launchGame(){
    const lobby = document.getElementById('lobbyScreen');
    if(lobby) lobby.classList.remove('on');

    document.getElementById('gameScreen').classList.add('on');
    const g = GMAP[this.gameType];
    document.getElementById('gtitle').textContent = t(g.nameKey);
    document.getElementById('gscore').innerHTML = `<span id="scoreVal">0</span>`;
    document.getElementById('gbody').innerHTML = '';
    document.getElementById('gview').classList.add('open');

    // اجرای بازی آنلاین
    const onlineGames = {
      hafto4: Games.hafto4Online,
      ttt: Games.tttOnline,
      chess: Games.chessOnline,
      checkers: Games.checkersOnline
    };
    const fn = onlineGames[this.gameType];
    if(fn) fn(this);
  },

  /* ===== Send / Listen ===== */
  send(event, data){
    if(!this.channel) return;
    this.channel.send({ type: 'broadcast', event, payload: { ...data, sender: App.state.user.username } });
  },
  on(event, cb){
    if(!this.channel) return;
    this.channel.on('broadcast', { event }, (payload) => {
      if(payload.payload.sender === App.state.user.username) return;
      cb(payload.payload);
    });
  },

  /* ===== Leave room ===== */
  async leaveRoom(){
    App.haptic('medium');
    if(this.currentRoom && this.isHost){
      await API.deleteRoom(this.currentRoom.id);
    }
    if(this.channel){ sb.removeChannel(this.channel); this.channel = null; }
    this.currentRoom = null;
    this.isHost = false;
    this.gameType = null;

    const lobby = document.getElementById('lobbyScreen');
    if(lobby) lobby.classList.remove('on');
    document.getElementById('gameScreen')?.classList.remove('on');
    document.getElementById('gview')?.classList.remove('open');
    document.getElementById('startScreen')?.classList.add('on');
    App.go('home');
  }
};
