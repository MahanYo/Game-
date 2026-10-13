/* ============================================================
   ONLINE SYSTEM — Auto-sync version
   ============================================================ */
const Online = {
  currentRoom: null,
  channel: null,
  players: [],
  isHost: false,
  gameType: null,
  _pollTimer: null,
  _roomSub: null,
  _heartbeat: null,
  _gameRunning: false,   // 👈 فلگ جدید

  /* ===== Generate room code ===== */
  genCode(){
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for(let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  },

  /* ===== Avatar HTML ===== */
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
    this._gameRunning = false;

    localStorage.setItem('gh_current_room', JSON.stringify({
      code: code, gameType: gameType, isHost: true
    }));

    if(isPrivate){
      this.showRoomCode(code);
    } else {
      this.enterLobby(saved);
    }
  },

  /* ===== Show room code ===== */
  showRoomCode(code){
    App.openModal({ icon: I.check, title: '', desc: '', btns: [] });
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

  /* ===== Join room ===== */
  async joinRoom(code){
    if(!sb){ App.toast('اتصال برقرار نیست'); return; }
    const room = await API.getRoom(code.toUpperCase());
    if(!room){ App.toast('اتاق پیدا نشد'); App.haptic('error'); return; }

    const u = App.state.user;

    // اگه خودم میزبانم
    if(room.host_id === u.username){
      this.currentRoom = room;
      this.isHost = true;
      this.gameType = room.game_type;
      this._gameRunning = false;
      this.enterLobby(room);
      return;
    }

    // اگه قبلاً مهمان این اتاق بودم (رفرش)
    if(room.guest_id === u.username){
      this.currentRoom = room;
      this.isHost = false;
      this.gameType = room.game_type;
      this._gameRunning = false;
      this.enterLobby(room);
      return;
    }

    // اگه اتاق پره
    if(room.status === 'playing'){ App.toast('این اتاق پر است'); return; }

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
    this._gameRunning = false;

    localStorage.setItem('gh_current_room', JSON.stringify({
      code: room.room_code, gameType: room.game_type, isHost: false
    }));

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
    this.currentRoom = room;
    this._gameRunning = false;   // 👈 ریست فلگ

    // پاک کردن کانال قبلی
    this.cleanup();

    this.renderLobby(room);
    this.connectPresence(room.room_code);
    this.watchRoomChanges(room.id);
  },

  /* ===== Cleanup ===== */
  cleanup(){
    if(this._pollTimer){ clearInterval(this._pollTimer); this._pollTimer = null; }
    if(this._heartbeat){ clearInterval(this._heartbeat); this._heartbeat = null; }
    if(this._roomSub){ try{ sb.removeChannel(this._roomSub); }catch(e){} this._roomSub = null; }
    if(this.channel){ try{ sb.removeChannel(this.channel); }catch(e){} this.channel = null; }
  },

  /* ===== Render lobby ===== */
  renderLobby(room){
    // 👈 اگه بازی در جریانه، لابی رو نشون نده
    if(this._gameRunning) return;
    if(!room) return;

    const g = GMAP[room.game_type];
    if(!g) return;
    const u = App.state.user;
    const isHost = room.host_id === u.username;

    // مخفی کردن بقیه صفحه‌ها
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('on'));

    let lobby = document.getElementById('lobbyScreen');
    if(!lobby){
      lobby = document.createElement('div');
      lobby.id = 'lobbyScreen';
      lobby.className = 'screen';
      document.getElementById('app').appendChild(lobby);
    }
    lobby.classList.add('on');

    // اطلاعات مهمان
    const guest = room.guest_id ? {
      name: room.guest_name,
      avatar: room.guest_avatar
    } : null;

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
          <div class="lobby-player guest ${guest ? '' : 'empty'}" id="guestSlot">
            ${guest ? `
              <div class="lp-avatar">${this.avatarHTML(guest.avatar, guest.name)}</div>
              <div class="lp-info"><b>${guest.name}</b><span>مهمان</span></div>
              <div class="lp-status ready">آماده</div>
            ` : `
              <div class="lp-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:24px;height:24px"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div class="lp-info"><b>در انتظار...</b><span>مهمان</span></div>
              <div class="lp-status waiting"><div class="spinner-sm"></div></div>
            `}
          </div>
        </div>

        <div class="lobby-code" onclick="navigator.clipboard?.writeText('${room.room_code}');App.toast('کد کپی شد')">
          کد اتاق: <span>${room.room_code}</span>
        </div>

        <button class="btn" id="lobbyActionBtn">
          ${isHost ? (guest ? 'شروع بازی!' : 'منتظر ورود مهمان...') : 'آماده‌ام!'}
        </button>
      </div>
    `;

    const btn = document.getElementById('lobbyActionBtn');
    if(isHost){
      btn.disabled = !guest;
      if(guest){
        btn.onclick = () => this.startGame();
      }
    } else {
      btn.onclick = () => {
        App.haptic('success');
        this.channel?.send({ type: 'broadcast', event: 'ready', payload: { username: u.username }});
        App.toast('آماده‌ای! منتظر شروع باش...');
        btn.textContent = '✓ آماده';
        btn.disabled = true;
      };
    }
  },

  /* ===== Watch room changes (Realtime روی جدول rooms) ===== */
  watchRoomChanges(roomId){
    this._roomSub = sb.channel('room-watch:' + roomId + ':' + Date.now())
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'rooms',
        filter: `id=eq.${roomId}`
      }, (payload) => {
        const updated = payload.new;
        this.currentRoom = { ...this.currentRoom, ...updated };
        // 👈 فقط اگه بازی در جریان نیست رندر کن
        if(!this._gameRunning){
          this.renderLobby(this.currentRoom);
        }
        if(updated.guest_id && this.isHost && !this._gameRunning){
          App.haptic('success');
        }
      })
      .on('postgres_changes', {
        event: 'DELETE',
        schema: 'public',
        table: 'rooms',
        filter: `id=eq.${roomId}`
      }, () => {
        if(this._gameRunning){
          // اتاق حذف شد ولی بازی در جریانه — بازیکن رو بیرون ببر
          App.toast('اتاق بسته شد');
          this.leaveRoom();
        } else {
          App.toast('اتاق بسته شد');
          this.leaveRoom();
        }
      })
      .subscribe();
  },

  /* ===== Presence + Broadcast ===== */
  async connectPresence(roomCode){
    // پاک کردن کانال قبلی
    if(this.channel){
      try{ await sb.removeChannel(this.channel); }catch(e){}
      this.channel = null;
    }

    const u = App.state.user;
    const channelName = `room:${roomCode}`;   // 👈 یکسان برای هر دو

    this.channel = sb.channel(channelName, {
      config: {
        presence: { key: u.username },
        broadcast: { self: false }
      }
    });

    this.channel
      .on('presence', { event: 'sync' }, () => {
        const state = this.channel.presenceState();
        this.players = Object.values(state).flat();
        this.updateLobbyFromPresence();
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        const who = newPresences[0];
        if(who && who.username !== u.username && !this._gameRunning){
          App.toast('👋 ' + (who.name || 'حریف') + ' وارد شد');
          App.haptic('success');
        }
        const state = this.channel.presenceState();
        this.players = Object.values(state).flat();
        this.updateLobbyFromPresence();
      })
      .on('presence', { event: 'leave' }, () => {
        const state = this.channel.presenceState();
        this.players = Object.values(state).flat();
        this.updateLobbyFromPresence();
      })
      .on('broadcast', { event: 'ready' }, () => {
        if(this.isHost && !this._gameRunning){
          const btn = document.getElementById('lobbyActionBtn');
          if(btn){
            btn.disabled = false;
            btn.textContent = 'شروع بازی!';
            btn.onclick = () => this.startGame();
          }
          App.haptic('success');
        }
      })
      .on('broadcast', { event: 'game_start' }, () => {
        // 👈 فقط اگه بازی شروع نشده باشه
        if(!this._gameRunning){
          this.launchGame();
        }
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

  /* ===== Update lobby from presence ===== */
  updateLobbyFromPresence(){
    // 👈 اگه بازی در جریانه، کاری نکن
    if(this._gameRunning) return;
    if(!this.currentRoom) return;

    const u = App.state.user;
    const host = this.currentRoom.host_id;

    const otherPlayer = this.players.find(p => 
      p.username && 
      p.username !== u.username && 
      p.username !== host
    );

    // اگه هنوز توی DB مهمان نیست ولی توی presence هست، دستی اضافه کن
    if(otherPlayer && !this.currentRoom.guest_id){
      this.currentRoom.guest_id = otherPlayer.username;
      this.currentRoom.guest_name = otherPlayer.name;
      this.currentRoom.guest_avatar = otherPlayer.avatar;
      this.renderLobby(this.currentRoom);
    }

    // اگه مهمان از presence رفته ولی توی DB هست
    if(!otherPlayer && this.currentRoom.guest_id && !this.isHost){
      // مهمان (خودم) رفت، نادیده بگیر
    } else if(!otherPlayer && this.currentRoom.guest_id && this.isHost){
      // حریف خارج شد
      this.currentRoom.guest_id = null;
      this.currentRoom.guest_name = null;
      this.currentRoom.guest_avatar = null;
      this.renderLobby(this.currentRoom);
    }
  },

  /* ===== Start game (host) ===== */
  startGame(){
    if(this._gameRunning) return;   // 👈 جلوگیری از شروع دوباره
    App.haptic('success');
    this.channel?.send({ type: 'broadcast', event: 'game_start', payload: {} });
    this.launchGame();
  },

  /* ===== Launch game ===== */
  launchGame(){
    if(this._gameRunning) return;   // 👈 جلوگیری از رفرش دوباره
    this._gameRunning = true;       // 👈 فعال کردن فلگ

    const lobby = document.getElementById('lobbyScreen');
    if(lobby) lobby.classList.remove('on');

    const g = GMAP[this.gameType];
    if(!g) return;
    document.getElementById('gtitle').textContent = t(g.nameKey);
    document.getElementById('gscore').innerHTML = `<span id="scoreVal">0</span>`;
    document.getElementById('gbody').innerHTML = '';
    document.getElementById('gview').classList.add('open');

    // مطمئن شو کانال آماده‌ست
    setTimeout(() => {
      const onlineGames = {
        hafto4: Games.hafto4Online,
        ttt: Games.tttOnline,
        chess: Games.chessOnline
      };
      const fn = onlineGames[this.gameType];
      if(fn) fn(this);
    }, 500);
  },

  /* ===== Send / Listen ===== */
  send(event, data){
    if(!this.channel) return;
    this.channel.send({ 
      type: 'broadcast', 
      event, 
      payload: { ...data, sender: App.state.user.username } 
    });
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
    this._gameRunning = false;   // 👈 ریست فلگ
    this.cleanup();
    if(this.currentRoom && this.isHost){
      await API.deleteRoom(this.currentRoom.id);
    }
    this.currentRoom = null;
    this.isHost = false;
    this.gameType = null;

    localStorage.removeItem('gh_current_room');

    const lobby = document.getElementById('lobbyScreen');
    if(lobby) lobby.classList.remove('on');
    document.getElementById('gview')?.classList.remove('open');
    document.getElementById('startScreen')?.classList.add('on');
    App.go('home');
  }
};
