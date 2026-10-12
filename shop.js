const Shop = {
  data: null,
  currentCategory: 'all',
  loading: false,

  /* ===== Load products.json ===== */
  async load(){
    if(this.data) return this.data;
    if(this.loading) return;
    this.loading = true;
    try{
      const res = await fetch('products.json?t='+Date.now());
      this.data = await res.json();
      this.loading = false;
      return this.data;
    }catch(e){
      this.loading = false;
      this.data = { admin_username:'', categories:[], products:[], error:true };
      return this.data;
    }
  },

  /* ===== Localized field helper ===== */
  loc(obj){
    if(!obj) return '';
    if(typeof obj === 'string') return obj;
    return obj[LANG] || obj.fa || obj.en || '';
  },

  /* ===== Coin helpers ===== */
  getCoins(){
    const earned = Object.values(App.state.scores).reduce((a,b)=>a+b,0);
    const spent = App.state.spent || 0;
    return Math.max(0, earned - spent);
  },

  /* ===== Generate unique code ===== */
  genCode(productId){
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const rnd = n => Array.from({length:n}, ()=>chars[Math.floor(Math.random()*chars.length)]).join('');
    const prefix = productId.replace(/[^a-z0-9]/gi,'').toUpperCase().slice(0,4).padEnd(4,'X');
    return `${prefix}-${rnd(4)}-${rnd(4)}`;
  },

  /* ===== Render shop screen ===== */
  render(){
    if(!this.data){
      return `<div class="empty" style="padding:60px 20px">
        ${I.refresh}<div>${t('loading')||'Loading...'}</div>
      </div>`;
    }
    if(this.data.error){
      return `<div class="empty" style="padding:60px 20px">
        ${I.target}<div>${t('shop_error')||'Failed to load products'}</div>
        <button class="btn ghost" style="margin-top:16px;max-width:200px" onclick="Shop.reload()">${I.refresh} ${t('replay')}</button>
      </div>`;
    }

    const coins = this.getCoins();
    const cats = this.data.categories || [];
    const prods = (this.data.products||[]).filter(p => this.currentCategory==='all' || p.category===this.currentCategory);

    return `
      <div class="shop-hero">
        <div class="shop-hero-bg"></div>
        <div class="shop-hero-in">
          <div class="shop-ic">${I.coin}</div>
          <div>
            <div class="shop-lbl">${t('your_balance')}</div>
            <div class="shop-bal">${coins} <small>${t('coin')}</small></div>
          </div>
          <button class="shop-hist-btn" onclick="Shop.showHistory()">${I.medal}</button>
        </div>
      </div>

      <div class="shop-cats" id="shopCats">
        ${cats.map(c=>{
          const on = this.currentCategory===c.id;
          return `<button class="shop-cat ${on?'on':''}" data-c="${c.id}" style="--cc:${c.color||'var(--a1)'}">
            ${this.loc(c.name)}
          </button>`;
        }).join('')}
      </div>

      ${prods.length ? `<div class="shop-grid">${prods.map(p=>this.card(p, coins)).join('')}</div>`
        : `<div class="empty" style="padding:40px 20px">${I.empty}<div>${t('shop_empty')||'No products in this category'}</div></div>`}`;
  },

  /* ===== Product card ===== */
  card(p, coins){
    const canAfford = coins >= p.price;
    const outOfStock = p.stock !== null && p.stock !== undefined && p.stock <= 0;
    const badge = p.badge ? `<div class="shop-badge">${this.loc(p.badge)}</div>` : '';
    const stockInfo = (p.stock !== null && p.stock !== undefined)
      ? `<div class="shop-stock ${outOfStock?'no':''}">${outOfStock ? t('out_of_stock')||'ناموجود' : (p.stock + ' ' + (t('left')||'باقی'))}</div>`
      : '';

    return `<div class="shop-card ${outOfStock?'disabled':''}" onclick="Shop.openProduct('${p.id}')">
      ${badge}
      <div class="shop-img">
        <img src="${p.image}" alt="" loading="lazy" onerror="this.style.display='none';this.parentNode.innerHTML='${I.target}'">
      </div>
      <div class="shop-body">
        <div class="shop-name">${this.loc(p.name)}</div>
        <div class="shop-foot">
          <div class="shop-price ${canAfford?'':'no'}">${I.coin}<span>${p.price}</span></div>
          ${stockInfo}
        </div>
      </div>
    </div>`;
  },

  /* ===== Bind events after render ===== */
  bind(){
    const cats = document.getElementById('shopCats');
    if(cats){
      cats.querySelectorAll('.shop-cat').forEach(b=>{
        b.onclick = ()=>{
          this.currentCategory = b.dataset.c;
          App.haptic();
          App.go('shop');
        };
      });
    }
  },

  /* ===== Reload ===== */
  reload(){
    this.data = null;
    this.load().then(()=>App.go('shop'));
  },

  /* ===== Product detail ===== */
  openProduct(id){
    const p = (this.data.products||[]).find(x=>x.id===id);
    if(!p) return;
    App.haptic();

    const coins = this.getCoins();
    const canAfford = coins >= p.price;
    const outOfStock = p.stock !== null && p.stock !== undefined && p.stock <= 0;
    const stockInfo = (p.stock !== null && p.stock !== undefined)
      ? `<div class="pd-stock ${outOfStock?'no':''}">${outOfStock ? (t('out_of_stock')||'ناموجود') : (t('stock')||'موجودی')+': '+p.stock}</div>`
      : '';

    const btnLabel = outOfStock ? (t('out_of_stock')||'ناموجود')
                    : !canAfford ? (t('not_enough')||'سکه کافی نداری')
                    : `${I.coin} ${t('buy')||'خرید'} با ${p.price} ${t('coin')}`;

    document.getElementById('mbox').innerHTML = `
      <div class="pd-img"><img src="${p.image}" onerror="this.style.display='none';this.parentNode.innerHTML='${I.target}'"></div>
      <h3 class="pd-title">${this.loc(p.name)}</h3>
      <div class="pd-desc">${this.loc(p.desc)}</div>
      <div class="pd-info">
        <div class="pd-price">${I.coin}<span>${p.price}</span> <small>${t('coin')}</small></div>
        ${stockInfo}
      </div>
      <div class="pd-balance">
        <span>${t('your_balance')}:</span>
        <b>${coins} ${t('coin')}</b>
      </div>
      <div class="mbtns" style="margin-top:16px">
        <button class="btn ghost" onclick="App.closeModal()">${t('cancel')}</button>
        <button class="btn" id="pdBuy" ${(!canAfford||outOfStock)?'disabled':''}>${btnLabel}</button>
      </div>`;
    document.getElementById('modal').classList.add('open');

    const buyBtn = document.getElementById('pdBuy');
    if(buyBtn && !buyBtn.disabled){
      buyBtn.onclick = ()=>this.confirmBuy(p);
    }
  },

  /* ===== Confirm buy ===== */
  confirmBuy(p){
    App.haptic('medium');
    const coins = this.getCoins();
    document.getElementById('mbox').innerHTML = `
      <div class="mico">${I.target}</div>
      <h3>${t('confirm_buy')||'تایید خرید'}</h3>
      <p>${this.loc(p.name)}<br><b style="color:var(--gold)">${p.price} ${t('coin')}</b></p>
      <div class="pd-balance" style="margin:8px 0 16px">
        <span>${t('after_buy')||'بعد از خرید'}:</span>
        <b>${coins - p.price} ${t('coin')}</b>
      </div>
      <div class="mbtns">
        <button class="btn ghost" onclick="Shop.openProduct('${p.id}')">${t('back')}</button>
        <button class="btn" id="confirmBuyBtn">${I.check} ${t('confirm')}</button>
      </div>`;
    document.getElementById('confirmBuyBtn').onclick = ()=>this.doBuy(p);
  },

  /* ===== Execute purchase ===== */
  doBuy(p){
    App.haptic('success');
    const code = this.genCode(p.id);
    const purchase = {
      id: 'p_'+Date.now()+'_'+Math.random().toString(36).slice(2,6),
      productId: p.id,
      productName: this.loc(p.name),
      productImage: p.image,
      price: p.price,
      code: code,
      date: Date.now(),
      status: 'pending'
    };

    // deduct coins
    App.state.spent = (App.state.spent || 0) + p.price;

    // decrease stock locally
    if(p.stock !== null && p.stock !== undefined && p.stock > 0){
      p.stock--;
    }

    // save purchase
    App.state.purchases = App.state.purchases || [];
    App.state.purchases.unshift(purchase);
    App.save();
    App.renderHeader();

    this.showCode(purchase);
  },

  /* ===== Show purchase code ===== */
  showCode(purchase){
    const admin = this.data.admin_username || '@admin';
    const note = this.loc({fa:this.data.admin_note_fa, en:this.data.admin_note_en}) || '';

    document.getElementById('mbox').innerHTML = `
      <div class="mico success-anim" style="background:linear-gradient(135deg,#10b981,#059669)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width:38px;height:38px">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h3 style="color:var(--ok)">${t('purchase_success')||'خرید موفق!'}</h3>
      <p style="margin-bottom:14px">${purchase.productName}</p>

      <div class="code-box">
        <div class="code-label">${t('your_code')||'کد خرید شما'}</div>
        <div class="code-val" id="codeVal">${purchase.code}</div>
        <button class="code-copy" id="codeCopy">${I.check} ${t('copy_code')||'کپی کد'}</button>
      </div>

      <div class="code-note">
        ${t('code_note')||'📸 از این کد عکس بگیر و برای ادمین ارسال کن'}
        <div class="code-admin">${admin}</div>
      </div>

      <div class="mbtns" style="margin-top:16px">
        <button class="btn" id="codeOk">${t('got_it')||'فهمیدم'}</button>
      </div>`;

    const copy = document.getElementById('codeCopy');
    copy.onclick = ()=>{
      const text = purchase.code;
      if(navigator.clipboard){
        navigator.clipboard.writeText(text).then(()=>{
          copy.innerHTML = `${I.check} ${t('copied')||'کپی شد'}`;
          App.haptic('success');
          setTimeout(()=>{ copy.innerHTML = `${I.check} ${t('copy_code')||'کپی کد'}`; }, 1500);
        }).catch(()=>App.toast(text));
      } else {
        App.toast(text);
      }
    };
    document.getElementById('codeOk').onclick = ()=>{
      App.closeModal();
      App.go('shop');
    };
  },

  /* ===== History ===== */
  showHistory(){
    App.haptic();
    const list = App.state.purchases || [];
    const rows = list.length ? list.map(pu=>`
      <div class="hist-item">
        <div class="hist-img"><img src="${pu.productImage}" onerror="this.style.display='none'"></div>
        <div class="hist-info">
          <b>${pu.productName}</b>
          <span class="hist-code">${pu.code}</span>
          <span class="hist-date">${new Date(pu.date).toLocaleDateString(LANG==='fa'?'fa-IR':'en-US')}</span>
        </div>
        <div class="hist-status ${pu.status}">${pu.status==='pending'?(t('pending')||'در انتظار'):(t('done')||'تحویل شد')}</div>
      </div>`).join('') : `<div class="empty" style="padding:30px 10px">${I.empty}<div>${t('no_purchases')||'هنوز خریدی نداری'}</div></div>`;

    document.getElementById('mbox').innerHTML = `
      <div class="mico">${I.medal}</div>
      <h3>${t('my_purchases')||'خریدهای من'}</h3>
      <div class="hist-list">${rows}</div>
      <div class="mbtns" style="margin-top:16px">
        <button class="btn ghost" onclick="App.closeModal()">${t('cancel')||'بستن'}</button>
      </div>`;
    document.getElementById('modal').classList.add('open');
  }
};
