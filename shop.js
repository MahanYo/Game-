const Shop = {
  data: null,
  currentCategory: 'all',
  loading: false,

  /* ===== Load products ===== */
  async load(){
    if(this.data) return this.data;
    if(this.loading) return;
    this.loading = true;
    try{
      const prods = await API.getProducts();
      this.data = {
        products: prods || [],
        categories: this.defaultCategories(),
        admin_username: '@ViDoXaiBot',
        admin_note_fa: '📸 از این کد عکس بگیر و برای ادمین ارسال کن',
        admin_note_en: '📸 Screenshot this code and send it to admin'
      };
    }catch(e){
      this.data = { products: [], categories: [], error: true };
    }
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

  /* ===== Localized field ===== */
  loc(obj){
    if(!obj) return '';
    if(typeof obj === 'string') return obj;
    return obj[LANG] || obj.fa || obj.en || '';
  },

  /* ===== Coins ===== */
  getCoins(){
    return App.getCoins();
  },

  /* ===== Unique code ===== */
  genCode(productId){
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const rnd = n => Array.from({length:n}, ()=>chars[Math.floor(Math.random()*chars.length)]).join('');
    const prefix = (productId||'GIFT').replace(/[^a-z0-9]/gi,'').toUpperCase().slice(0,4).padEnd(4,'X');
    return `${prefix}-${rnd(4)}-${rnd(4)}`;
  },

  /* ===== Render shop ===== */
  render(){
    if(!this.data){
      return `<div class="empty" style="padding:60px 20px">
        ${I.refresh}<div>${t('loading')||'در حال بارگذاری...'}</div>
      </div>`;
    }
    if(this.data.error){
      return `<div class="empty" style="padding:60px 20px">
        ${I.target}<div>${t('shop_error')||'خطا در بارگذاری محصولات'}</div>
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
        : `<div class="empty" style="padding:40px 20px">${I.empty}<div>${t('shop_empty')||'محصولی در این دسته نیست'}</div></div>`}`;
  },

  card(p, coins){
    const canAfford = coins >= p.price;
    const outOfStock = p.stock !== null && p.stock !== undefined && p.stock <= 0;
    const badge = (p.badge_fa || p.badge_en) ? `<div class="shop-badge">${p.badge_fa || p.badge_en}</div>` : '';
    const stockInfo = (p.stock !== null && p.stock !== undefined)
      ? `<div class="shop-stock ${outOfStock?'no':''}">${outOfStock ? (t('out_of_stock')||'ناموجود') : (p.stock + ' ' + (t('left')||'باقی'))}</div>`
      : '';

    return `<div class="shop-card ${outOfStock?'disabled':''}" onclick="Shop.openProduct('${p.id}')">
      ${badge}
      <div class="shop-img">
        <img src="${p.image}" alt="" loading="lazy" onerror="this.style.display='none';this.parentNode.innerHTML='${I.target}'">
      </div>
      <div class="shop-body">
        <div class="shop-name">${p.name_fa || p.name_en}</div>
        <div class="shop-foot">
          <div class="shop-price ${canAfford?'':'no'}">${I.coin}<span>${p.price}</span></div>
          ${stockInfo}
        </div>
      </div>
    </div>`;
  },

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
      <h3 class="pd-title">${p.name_fa || p.name_en}</h3>
      <div class="pd-desc">${p.desc_fa || p.desc_en || ''}</div>
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

  confirmBuy(p){
    App.haptic('medium');
    const coins = this.getCoins();
    document.getElementById('mbox').innerHTML = `
      <div class="mico">${I.target}</div>
      <h3>${t('confirm_buy')||'تایید خرید'}</h3>
      <p>${p.name_fa || p.name_en}<br><b style="color:var(--gold)">${p.price} ${t('coin')}</b></p>
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
  async doBuy(p){
    App.haptic('success');
    const code = this.genCode(p.product_id || p.id);
    const uid = App.state.user?.username || 'anon';

    const purchase = {
      user_id: uid,
      user_name: App.state.user?.name || 'کاربر',
      user_username: App.state.user?.username || 'anon',
      product_id: p.id,
      product_name: p.name_fa || p.name_en,
      product_image: p.image,
      price: p.price,
      code: code,
      status: 'pending'
    };

    // Send to Supabase
    let saved = null;
    try{
      saved = await API.createPurchase(purchase);
    }catch(e){
      console.error('purchase error:', e);
    }

    if(!saved){
      App.toast('خطا در ثبت خرید، دوباره تلاش کن');
      return;
    }

    // Deduct coins
    App.state.spent = (App.state.spent || 0) + p.price;

    // Decrease stock locally + in DB
    if(p.stock !== null && p.stock !== undefined && p.stock > 0){
      p.stock--;
      try{
        await supabase.from('products').update({ stock: p.stock }).eq('id', p.id);
      }catch(e){}
    }

    // Save local purchase history
    App.state.purchases = App.state.purchases || [];
    App.state.purchases.unshift({
      id: saved.id,
      productId: p.id,
      productName: purchase.product_name,
      productImage: p.image,
      price: p.price,
      code: code,
      date: Date.now(),
      status: 'pending'
    });

    App.save();
    App.renderHeader();
    this.showCode({ ...purchase, ...saved, code });
  },

  /* ===== Show code ===== */
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
      <p style="margin-bottom:14px">${purchase.product_name || purchase.productName}</p>

      <div class="code-box">
        <div class="code-label">${t('your_code')||'کد خرید شما'}</div>
        <div class="code-val" id="codeVal">${purchase.code}</div>
        <button class="code-copy" id="codeCopy">${I.check} ${t('copy_code')||'کپی کد'}</button>
      </div>

      <div class="code-note">
        ${note}
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
  async showHistory(){
    App.haptic();
    const uid = App.state.user?.username || 'anon';

    let list = [];
    try{
      list = await API.getMyPurchases(uid);
    }catch(e){}

    // Fallback to local if empty
    if(!list.length && App.state.purchases?.length){
      list = App.state.purchases.map(p=>({
        product_name: p.productName,
        product_image: p.productImage,
        code: p.code,
        status: p.status || 'pending',
        created_at: new Date(p.date).toISOString()
      }));
    }

    const rows = list.length ? list.map(pu=>`
      <div class="hist-item">
        <div class="hist-img"><img src="${pu.product_image || ''}" onerror="this.style.display='none'"></div>
        <div class="hist-info">
          <b>${pu.product_name}</b>
          <span class="hist-code">${pu.code}</span>
          <span class="hist-date">${new Date(pu.created_at).toLocaleDateString('fa-IR')}</span>
        </div>
        <div class="hist-status ${pu.status}">${
          pu.status==='pending' ? (t('pending')||'در انتظار')
          : pu.status==='approved' ? (t('done')||'تحویل شد')
          : 'رد شد'
        }</div>
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
