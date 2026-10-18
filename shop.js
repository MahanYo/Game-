const Shop = {
  data: null, currentCategory: 'all', loading: false,
  async load(){
    if(this.data) return this.data;
    if(this.loading) return;
    this.loading = true;
    try{
      const prods = await API.getProducts();
      this.data = {
        products: prods || [],
        categories: this.defaultCategories(),
        admin_username: '@mahan',
        admin_note_fa: '📸 از این کد عکس بگیر و برای ادمین ارسال کن',
        admin_note_en: '📸 Screenshot this code and send it to admin'
      };
    }catch(e){ this.data = { products: [], categories: [], error: true }; }
    this.loading = false;
    return this.data;
  },
  defaultCategories(){
    return [
      { id: 'all', name: { fa: 'همه', en: 'All' }, color: '#6366f1' },
      { id: 'gifts', name: { fa: 'گیفت‌ها', en: 'Gifts' }, color: '#ec4899' },
      { id: 'stars', name: { fa: 'استارز', en: 'Stars' }, color: '#f59e0b' },
      { id: 'premium', name: { fa: 'پرمیوم', en: 'Premium' }, color: '#8b5cf6' },
      { id: 'stickers', name: { fa: 'استیکر', en: 'Stickers' }, color: '#10b981' }
    ];
  },
  loc(obj){ if(!obj) return ''; if(typeof obj === 'string') return obj; return obj[LANG] || obj.fa || obj.en || ''; },
  getCoins(){ return App.getCoins(); },
  genCode(productId){
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const rnd = n => Array.from({length:n}, ()=>chars[Math.floor(Math.random()*chars.length)]).join('');
    const prefix = (productId||'GIFT').replace(/[^a-z0-9]/gi,'').toUpperCase().slice(0,4).padEnd(4,'X');
    return `${prefix}-${rnd(4)}-${rnd(4)}`;
  },
  render(){
    if(!this.data) return `<div class="empty" style="padding:60px 20px">${I.refresh}<div>${t('loading')}</div></div>`;
    if(this.data.error) return `<div class="empty" style="padding:60px 20px">${I.target}<div>${t('shop_error')}</div>
      <button class="btn ghost" style="margin-top:16px;max-width:200px" onclick="Shop.reload()">${I.refresh}</button></div>`;
    const coins = this.getCoins();
    const cats = this.data.categories || [];
    const prods = (this.data.products||[]).filter(p => this.currentCategory==='all' || p.category===this.currentCategory);
    return `
      <div class="shop-hero"><div class="shop-hero-bg"></div>
        <div class="shop-hero-in">
          <div class="shop-ic">${I.coin}</div>
          <div><div class="shop-lbl">${t('your_balance')}</div><div class="shop-bal">${coins} <small>${t('coin')}</small></div></div>
          <button class="shop-hist-btn" onclick="Shop.showHistory()">${I.medal}</button>
        </div>
      </div>
      <div class="shop-cats" id="shopCats">${cats.map(c=>{
        const on = this.currentCategory===c.id;
        return `<button class="shop-cat ${on?'on':''}" data-c="${c.id}" style="--cc:${c.color||'var(--a1)'}">${this.loc(c.name)}</button>`;
      }).join('')}</div>
      ${prods.length ? `<div class="shop-grid">${prods.map(p=>this.card(p, coins)).join('')}</div>`
        : `<div class="empty" style="padding:40px 20px">${I.empty}<div>${t('shop_empty')}</div></div>`}`;
  },
  card(p, coins){
    const canAfford = coins >= p.price;
    const outOfStock = p.stock !== null && p.stock !== undefined && p.stock <= 0;
    const badge = (p.badge_fa || p.badge || p.badge_en) ? `<div class="shop-badge">${p.badge_fa || (p.badge&&p.badge.fa) || p.badge_en || p.badge || ''}</div>` : '';
    const stockInfo = (p.stock !== null && p.stock !== undefined)
      ? `<div class="shop-stock ${outOfStock?'no':''}">${outOfStock ? t('out_of_stock') : (p.stock + ' ' + t('left'))}</div>` : '';
    const name = p.name_fa || (p.name&&p.name.fa) || p.name_en || p.name || '';
    const media = p.lottie_data
  ? `<div class="lottie-box" data-lottie-id="shop-${p.id}"></div>`
  : `<img src="${p.image}" alt="" loading="lazy" onerror="this.style.display='none'">`;
const lottieBadge = p.lottie_data ? `<div class="badge-lottie">ویدیو</div>` : '';
return `<div class="shop-card ${outOfStock?'disabled':''}" onclick="Shop.openProduct('${p.id}')">
    ${badge}${lottieBadge}<div class="shop-img">${media}</div>
      <div class="shop-body"><div class="shop-name">${name}</div>
      <div class="shop-foot"><div class="shop-price ${canAfford?'':'no'}">${I.coin}<span>${p.price}</span></div>${stockInfo}</div></div></div>`;
  },
  bind(){
  const cats = document.getElementById('shopCats');
  if(cats) cats.querySelectorAll('.shop-cat').forEach(b=>{
    b.onclick = ()=>{ this.currentCategory = b.dataset.c; App.haptic(); App.go('shop'); };
  });
  if(typeof lottie === 'undefined') return;
  const boxes = document.querySelectorAll('.lottie-box[data-lottie-id]');
  boxes.forEach(box => {
    const key = box.dataset.lottieId;
    const pid = key.replace('shop-','');
    const product = (this.data?.products||[]).find(p => String(p.id) === pid);
    if(!product || !product.lottie_data) return;
    try{
      const data = typeof product.lottie_data === 'string'
        ? JSON.parse(product.lottie_data)
        : product.lottie_data;
      lottie.loadAnimation({
        container: box,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: data
      });
    }catch(e){ console.error('Lottie load error:', e); }
  });
},
  reload(){ this.data = null; this.load().then(()=>App.go('shop')); },
  openProduct(id){
  const p = (this.data.products||[]).find(x=>x.id===id); if(!p) return;
  App.haptic();
  const coins = this.getCoins();
  const canAfford = coins >= p.price;
  const outOfStock = p.stock !== null && p.stock !== undefined && p.stock <= 0;
  const stockInfo = (p.stock !== null && p.stock !== undefined)
    ? `<div class="pd-stock ${outOfStock?'no':''}">${outOfStock ? t('out_of_stock') : (t('stock')||'موجودی')+': '+p.stock}</div>` : '';
  const name = p.name_fa || (p.name&&p.name.fa) || p.name_en || '';
  const desc = p.desc_fa || (p.desc&&p.desc.fa) || p.desc_en || '';
  const btnLabel = outOfStock ? t('out_of_stock') : !canAfford ? t('not_enough') : `${I.coin} ${t('buy')} با ${p.price} ${t('coin')}`;
  const giftLink = p.gift_link || p.link || p.url || '';

  const media = p.lottie_data
    ? `<div class="lottie-box" id="pd-lottie"></div>`
    : `<img src="${p.image}" onerror="this.style.display='none'">`;

  document.getElementById('mbox').innerHTML = `
    <div class="pd-img">${media}</div>
    <h3 class="pd-title">${name}</h3>
    <div class="pd-desc">${desc}</div>
    <div class="pd-info"><div class="pd-price">${I.coin}<span>${p.price}</span> <small>${t('coin')}</small></div>${stockInfo}</div>
    <div class="pd-balance"><span>${t('your_balance')}:</span><b>${coins} ${t('coin')}</b></div>
    ${giftLink ? `<button class="gift-link-btn" onclick="window.open('${giftLink}','_blank')">${I.link} ${t('gift_link')}</button>` : ''}
    <div class="mbtns-row" style="margin-top:16px">
  <button class="btn ghost" onclick="App.closeModal()">${t('cancel')}</button>
  <button class="btn" id="pdBuy" ${(!canAfford||outOfStock)?'disabled':''}>${btnLabel}</button>
</div>`;
  document.getElementById('modal').classList.add('open');

  if(p.lottie_data && typeof lottie !== 'undefined'){
    const box = document.getElementById('pd-lottie');
    if(box){
      try{
        const data = typeof p.lottie_data === 'string' ? JSON.parse(p.lottie_data) : p.lottie_data;
        lottie.loadAnimation({
          container: box,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: data
        });
      }catch(e){ console.error('Lottie modal error:', e); }
    }
  }

  const buyBtn = document.getElementById('pdBuy');
  if(buyBtn && !buyBtn.disabled) buyBtn.onclick = ()=>this.confirmBuy(p);
},
  confirmBuy(p){
    App.haptic('medium');
    const coins = this.getCoins();
    const name = p.name_fa || (p.name&&p.name.fa) || p.name_en || '';
    const u = App.state.user || {};
    document.getElementById('mbox').innerHTML = `
      <div class="mico">${I.target}</div>
      <h3>${t('confirm_buy')}</h3>
      <p style="margin-bottom:10px">${name}<br><b style="color:var(--gold)">${p.price} ${t('coin')}</b></p>
      <div class="pd-balance" style="margin:0 0 12px"><span>${t('after_buy')}:</span><b>${coins - p.price} ${t('coin')}</b></div>
      <div class="field" style="text-align:right;margin-bottom:12px">
        <label style="font-size:12px;color:var(--mut);display:block;margin-bottom:6px">یوزرنیم ماتریکس خود را وارد کنید</label>
        <input type="text" id="buyUsername" value="${u.username||''}" maxlength="30" placeholder="username"
          style="width:100%;background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:12px;color:var(--tx);font-family:inherit;font-size:14px">
      </div>
      <div class="mbtns">
        <button class="btn ghost" onclick="Shop.openProduct('${p.id}')">${t('back')}</button>
        <button class="btn" id="confirmBuyBtn">${I.check} ${t('confirm')}</button>
      </div>`;
    document.getElementById('confirmBuyBtn').onclick = ()=>{
      const un = (document.getElementById('buyUsername').value||'').trim().replace(/[^a-zA-Z0-9_]/g,'').toLowerCase();
      if(!un || un.length < 2){ App.toast('یوزرنیم معتبر وارد کن'); return; }
      this.doBuy(p, un);
    };
  },
async doBuy(p, username){
  App.haptic('success');
  const coins = this.getCoins();
  if(coins < p.price){ App.toast(t('not_enough')); return; }

  const name = p.name_fa || (p.name&&p.name.fa) || p.name_en || '';
  const uid = username || App.state.user?.username || 'anon';

  // ⛔ جلوگیری از دوبار کلیک
  if(this._buying){ return; }
  this._buying = true;

  // ۱) اسپینر + دکمه غیرفعال
  document.getElementById('mbox').innerHTML = `
    <div class="mico success-anim" style="background:linear-gradient(135deg,#6366f1,#a855f7)">
      <div class="spinner-lg" style="border-color:rgba(255,255,255,.3);border-top-color:#fff"></div>
    </div>
    <h3>در حال ثبت سفارش...</h3>
    <p style="font-size:13px;color:var(--mut);line-height:1.7">
      <b>${name}</b><br>
      لطفاً صبر کن، داری ثبت می‌شه
    </p>`;

  // کسر سکه‌ها از قبل (رزرو)
  App.state.spent = (App.state.spent || 0) + p.price;
  App.save();
  App.renderHeader();

  const purchase = {
    user_id: uid,
    user_name: App.state.user?.name || 'کاربر',
    user_username: uid,
    product_id: p.id,
    product_name: name,
    product_image: p.image,
    lottie_data: p.lottie_data || null,
    price: p.price,
    status: 'pending',
    gift_link: p.gift_link || p.link || null
  };

  // ۲) حالا ثبت کن
  let saved = null;
  try{ saved = await API.createPurchase(purchase); }catch(e){ console.error(e); }

  // اگه دیتابیس خطا داد → سکه‌ها رو برگردون
  if(!saved){
    App.state.spent = Math.max(0, (App.state.spent||0) - p.price);
    App.save(); App.renderHeader();
    this._buying = false;
    this.openProduct(p.id); // برگرد به صفحه محصول
    App.toast('خطا در ثبت — دوباره تلاش کن');
    return;
  }

  // ۳) آپدیت موجودی (اختیاری)
  if(p.stock !== null && p.stock !== undefined && p.stock > 0){
    p.stock--;
    try{ await sb.from('products').update({ stock: p.stock }).eq('id', p.id); }catch(e){}
  }

  App.state.purchases = App.state.purchases || [];
  App.state.purchases.unshift({
    id: saved.id, productId: p.id, productName: name, productImage: p.image,
    lottieData: p.lottie_data || null,
    price: p.price, date: Date.now(), status: 'pending', username: uid
  });
  App.save();
  App.renderHeader();

  this._buying = false;

  // ۴) صفحه موفقیت
  this.showPending(name, uid);
  if(App.state.screen === 'shop') App.go('shop');
},
  showPending(productName, username){
    document.getElementById('mbox').innerHTML = `
      <div class="mico success-anim" style="background:linear-gradient(135deg,#10b981,#059669)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width:38px;height:38px"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h3 style="color:var(--ok)">سفارش ثبت شد</h3>
      <p style="margin:10px 0 6px;line-height:1.8">
        <b>${productName}</b><br>
        یوزرنیم: <b style="color:var(--a1)">${username}</b>
      </p>
      <p style="font-size:13px;color:var(--mut);line-height:1.7;margin-bottom:14px">
        سفارش شما در انتظار تایید ادمین است.<br>
        بعد از تایید، گیفت/محصول برات ارسال می‌شه.
      </p>
      <div class="mbtns"><button class="btn" id="pendingOk">${t('got_it')||'باشه'}</button></div>`;
    document.getElementById('pendingOk').onclick = ()=>{
      App.closeModal();
      App.go('shop');
      App.renderHeader();
    };
  },
    async showHistory(){
  App.haptic();

  // ۱) فوراً مودال رو با لودینگ باز کن
  document.getElementById('mbox').innerHTML = `
    <div class="mico">${I.medal}</div>
    <h3>${t('my_purchases')}</h3>
    <div style="display:flex;flex-direction:column;align-items:center;gap:14px;padding:40px 0">
      <div class="spinner-lg"></div>
      <div style="font-size:13px;color:var(--mut)">${t('loading')}</div>
    </div>`;
  document.getElementById('modal').classList.add('open');

  // ۲) حالا از دیتابیس بگیر
  const uid = App.state.user?.username || 'anon';
  let list = [];
  try{ list = await API.getMyPurchases(uid); }catch(e){}

  if(list.length){
    const prods = (this.data?.products || []);
    list = list.map(pu => {
      if(!pu.lottie_data && pu.product_id){
        const prod = prods.find(x => String(x.id) === String(pu.product_id));
        if(prod && prod.lottie_data) return { ...pu, lottie_data: prod.lottie_data };
      }
      return pu;
    });
  }

  if(!list.length && App.state.purchases?.length){
    list = App.state.purchases.map(p=>({
      product_name:p.productName, product_image:p.productImage,
      lottie_data:p.lottieData, code:p.code, status:p.status||'pending',
      created_at:new Date(p.date).toISOString()
    }));
  }

  const rows = list.length ? list.map((pu,i)=>{
    const media = pu.lottie_data
      ? `<div id="hist-lottie-${i}" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center"></div>`
      : `<img src="${pu.product_image||''}" onerror="this.style.display='none'">`;
    return `
      <div class="hist-item">
        <div class="hist-img">${media}</div>
        <div class="hist-info">
          <b>${pu.product_name}</b>
          <span class="hist-code">${pu.code || ''}</span>
          <span class="hist-date">${new Date(pu.created_at).toLocaleDateString('fa-IR')}</span>
        </div>
        <div class="hist-status ${pu.status}">${pu.status==='pending'?t('pending'):pu.status==='approved'?t('done'):'رد شد'}</div>
      </div>`;
  }).join('') : `<div class="empty" style="padding:30px 10px">${I.empty}<div>${t('no_purchases')}</div></div>`;

  // ۳) جایگزین لودینگ با لیست واقعی
  document.getElementById('mbox').innerHTML = `
    <div class="mico">${I.medal}</div><h3>${t('my_purchases')}</h3>
    <div class="hist-list">${rows}</div>
    <div class="mbtns" style="margin-top:16px"><button class="btn ghost" onclick="App.closeModal()">${t('cancel')}</button></div>`;

  if(typeof lottie !== 'undefined'){
    setTimeout(()=>{
      list.forEach((pu, i) => {
        if(pu.lottie_data){
          const box = document.getElementById('hist-lottie-'+i);
          if(box){
            try{
              const anim = typeof pu.lottie_data === 'string' ? JSON.parse(pu.lottie_data) : pu.lottie_data;
              lottie.loadAnimation({
                container: box, renderer: 'svg', loop: true, autoplay: true, animationData: anim
              });
            }catch(e){ console.error('History lottie error:', e); }
          }
        }
      });
    }, 50);
  }
},

};

/* ============================================================
   SETTINGS (with Support & Channel)
   ============================================================ */
