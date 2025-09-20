// script.js - minimal shop interactions
document.addEventListener('DOMContentLoaded', function(){
  const products = [
    {id:1,title:'قاب محافظ ژله‌ای',price:129000,desc:'انعطاف‌پذیر و ضدخش'},
    {id:2,title:'پاوربانک 10000mAh',price:359000,desc:'شارژ سریع و جمع‌وجور'},
    {id:3,title:'کابل تایپ‌سی فست',price:89000,desc:'سرعت بالا و دوام زیاد'},
    {id:4,title:'گلس محافظ صفحه',price:49000,desc:'ضد ضربه و بدون حباب'},
    {id:5,title:'هندزفری بلوتوث',price:499000,desc:'کیفیت صدای عالی و نویز کنسلینگ'}
  ];

  const productGrid = document.getElementById('productGrid');
  const cartBtn = document.getElementById('cartBtn');
  const cartModal = document.getElementById('cartModal');
  const closeCart = document.getElementById('closeCart');
  const cartItemsEl = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  let cart = [];

  function formatPrice(v){ return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

  function renderProducts(){
    productGrid.innerHTML = '';
    products.forEach(p=>{
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="product-img">${p.title.split(' ')[0]}</div>
        <div class="product-title">${p.title}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-price">${formatPrice(p.price)} تومان</div>
        <div style="display:flex;gap:0.5rem;margin-top:0.6rem">
          <button class="btn primary" data-id="${p.id}">افزودن به سبد</button>
          <button class="btn ghost" data-id="view-${p.id}">مشاهده</button>
        </div>
      `;
      productGrid.appendChild(card);
    });
    // attach listeners
    document.querySelectorAll('.card .btn.primary').forEach(b=>{
      b.addEventListener('click', ()=>{
        const id = +b.dataset.id;
        addToCart(id);
      });
    });
  }

  function addToCart(id){
    const p = products.find(x=>x.id===id);
    const item = cart.find(x=>x.id===id);
    if(item) item.qty++;
    else cart.push({id:p.id,title:p.title,price:p.price,qty:1});
    updateCartUI();
  }

  function updateCartUI(){
    cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0);
    cartItemsEl.innerHTML = '';
    let sum = 0;
    cart.forEach(i=>{
      sum += i.price * i.qty;
      const div = document.createElement('div');
      div.style.display='flex';div.style.justifyContent='space-between';div.style.alignItems='center';
      div.style.padding='0.45rem 0';
      div.innerHTML = `<div><strong>${i.title}</strong><div style="font-size:0.86rem;color:#456">${formatPrice(i.price)} × ${i.qty}</div></div>
      <div style="display:flex;gap:0.4rem"><button class="btn ghost" data-action="dec" data-id="${i.id}">-</button><button class="btn ghost" data-action="inc" data-id="${i.id}">+</button></div>`;
      cartItemsEl.appendChild(div);
    });
    cartTotal.textContent = formatPrice(sum);
    // attach +/- listeners
    cartItemsEl.querySelectorAll('button[data-action]').forEach(b=>{
      b.addEventListener('click', ()=>{
        const id = +b.dataset.id; const act = b.dataset.action;
        const it = cart.find(x=>x.id===id);
        if(!it) return;
        if(act==='inc') it.qty++;
        else it.qty = Math.max(0, it.qty-1);
        cart = cart.filter(x=>x.qty>0);
        updateCartUI();
      });
    });
  }

  // Cart modal
  cartBtn.addEventListener('click', ()=>{ cartModal.classList.add('show'); cartModal.setAttribute('aria-hidden','false'); });
  closeCart.addEventListener('click', ()=>{ cartModal.classList.remove('show'); cartModal.setAttribute('aria-hidden','true'); });
  checkoutBtn.addEventListener('click', ()=>{ alert('درگاه پرداخت آزمایشی — برای ادامه با فروشنده تماس بگیرید.'); });

  // contact form
  document.getElementById('sendMsg').addEventListener('click', ()=>{
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    if(!name || !email){ alert('نام و ایمیل را وارد کنید.'); return; }
    alert('پیام شما ثبت شد — متشکریم!');
    document.getElementById('contactForm').reset();
  });

  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  renderProducts();
});
