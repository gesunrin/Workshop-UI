const STORAGE = {
  cart: 'gesunrinKanaCartV4',
  customer: 'gesunrinKanaCustomerV4',
  orders: 'gesunrinKanaOrdersV4',
  products: 'gesunrinKanaProductsV4',
  articles: 'gesunrinKanaArticlesV4',
  admin: 'gesunrinKanaAdminV4',
  lastOrder: 'gesunrinKanaLastOrderV4'
};

const defaultProducts = [
  {
    id: 'p1',
    nameKana: 'まっちゃ らて',
    name: 'Matcha Latte',
    categoryKana: 'どりんく',
    category: 'Drinks',
    price: 650,
    image: 'assets/images/matcha.jpg',
    desc: 'Smooth matcha latte with creamy milk and a gentle earthy finish.'
  },
  {
    id: 'p2',
    nameKana: 'ほうじちゃ らて',
    name: 'Hojicha Latte',
    categoryKana: 'どりんく',
    category: 'Drinks',
    price: 650,
    image: 'assets/images/Hojicha.jpg',
    desc: 'Roasted tea latte with a soft smoky aroma and warm mellow taste.'
  },
  {
    id: 'p3',
    nameKana: 'ぷあ おーばー こーひー',
    name: 'Pour Over Coffee',
    categoryKana: 'どりんく',
    category: 'Drinks',
    price: 600,
    image: 'assets/images/pour coffe.jpg',
    desc: 'Slow-brewed coffee with a clean body and balanced flavor.'
  },
  {
    id: 'p4',
    nameKana: 'すとろべりー さんど',
    name: 'Strawberry Sando',
    categoryKana: 'でざーと',
    category: 'Dessert',
    price: 500,
    image: 'assets/images/sando.jpg',
    desc: 'Soft bread with light cream and fresh strawberry slices.'
  },
  {
    id: 'p5',
    nameKana: 'むーんらいと けーき',
    name: 'Moonlight Cake',
    categoryKana: 'でざーと',
    category: 'Dessert',
    price: 480,
    image: 'assets/images/moonlight.jpg',
    desc: 'Light vanilla cake with smooth cream and a soft sweet finish.'
  },
  {
    id: 'p6',
    nameKana: 'ばたー とーすと',
    name: 'Butter Toast',
    categoryKana: 'ふーど',
    category: 'Food',
    price: 550,
    image: 'assets/images/butter-toast.jpg',
    desc: 'Warm toast with soft butter and a rich roasted aroma.'
  }
];

const defaultArticles = [
  {
    id: 'a1',
    categoryKana: 'かるちゃー',
    category: 'Culture',
    titleKana: 'まっちゃのしずかなじかん',
    title: 'A Calm Ritual Behind Matcha',
    image: 'assets/images/front.jpg',
    excerpt: 'Matcha can be more than a drink. It can be a small pause in the middle of the day.',
    body: 'At Gesunrin Cafe, matcha is served as a small ritual. The powder is whisked until soft foam appears, then blended with creamy milk. The goal is to create a slower moment for customers who want a quiet dine-in break.'
  },
  {
    id: 'a2',
    categoryKana: 'こーひー',
    category: 'Coffee',
    titleKana: 'ぷあおーばーのきれいなあじ',
    title: 'Why Pour Over Coffee Tastes Clean',
    image: 'assets/images/pour coffe.jpg',
    excerpt: 'Manual brewing gives the coffee room to release a clearer aroma and balanced taste.',
    body: 'Pour over coffee is made by slowly pouring hot water over ground coffee. The steady process helps extraction feel cleaner and more controlled. It is a good choice for customers who want to enjoy coffee without rushing.'
  },
  {
    id: 'a3',
    categoryKana: 'いんてりあ',
    category: 'Interior',
    titleKana: 'くらいぶらうんとあたたかいひかり',
    title: 'Dark Brown Tones and Warm Light',
    image: 'assets/images/living.jpg',
    excerpt: 'Deep wood colors, soft lighting, and a quiet room make the cafe feel warm and grounded.',
    body: 'Gesunrin Cafe uses deep brown colors and warm lighting to create a calm atmosphere. The visual tone is designed to feel mature, quiet, and comfortable for dine-in customers.'
  },
  {
    id: 'a4',
    categoryKana: 'でざーと',
    category: 'Dessert',
    titleKana: 'かるいふるーつさんど',
    title: 'A Light Fruit Sando for Dessert',
    image: 'assets/images/sando.jpg',
    excerpt: 'Strawberry sando brings a fresh sweet taste without feeling too heavy.',
    body: 'Strawberry sando is made with soft bread, light cream, and sliced fruit. It pairs well with tea or coffee and is easy to add to any dine-in order.'
  }
];

function getJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function normalizeProduct(product) {
  return {
    ...product,
    nameKana: product.nameKana || product.name || 'めにゅー',
    name: product.name || 'Menu Item',
    categoryKana: product.categoryKana || product.category || 'めにゅー',
    category: product.category || 'Menu',
    desc: product.desc || 'Cafe menu item.'
  };
}

function normalizeArticle(article) {
  return {
    ...article,
    titleKana: article.titleKana || article.title || 'きじ',
    title: article.title || 'Article',
    categoryKana: article.categoryKana || article.category || 'きじ',
    category: article.category || 'Article',
    excerpt: article.excerpt || '',
    body: article.body || ''
  };
}

function getProducts() {
  const saved = getJSON(STORAGE.products, null);
  if (!saved || !Array.isArray(saved) || saved.length === 0) {
    setJSON(STORAGE.products, defaultProducts);
    return defaultProducts;
  }
  return saved.map(normalizeProduct);
}

function getArticles() {
  const saved = getJSON(STORAGE.articles, null);
  if (!saved || !Array.isArray(saved) || saved.length === 0) {
    setJSON(STORAGE.articles, defaultArticles);
    return defaultArticles;
  }
  return saved.map(normalizeArticle);
}

function getCart() {
  return getJSON(STORAGE.cart, []);
}

function saveCart(cart) {
  setJSON(STORAGE.cart, cart);
  updateCartCount();
}

function getOrders() {
  return getJSON(STORAGE.orders, []);
}

function saveOrders(orders) {
  setJSON(STORAGE.orders, orders);
}

function yen(value) {
  return `¥${Number(value || 0).toLocaleString('en-US')}`;
}

function getQuery(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function escapeHTML(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function labelHTML(kana, english) {
  return `<span>${escapeHTML(kana)}</span><small>${escapeHTML(english)}</small>`;
}

function productNameHTML(product, tag = 'h3', className = 'product-card__name') {
  return `<${tag} class="${className}"><span>${escapeHTML(product.nameKana)}</span><small>${escapeHTML(product.name)}</small></${tag}>`;
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = count);
}

function toast(message) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

function addToCart(productId, qty = 1) {
  const product = getProducts().find(item => item.id === productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) existing.qty += qty;
  else cart.push({ id: productId, qty });
  saveCart(cart);
  toast(`${product.name} added to cart`);
}

function updateCartItem(productId, qty) {
  let cart = getCart();
  if (qty <= 0) cart = cart.filter(item => item.id !== productId);
  else cart = cart.map(item => item.id === productId ? { ...item, qty } : item);
  saveCart(cart);
  renderCartPage();
}

function cartDetails() {
  const products = getProducts();
  const details = getCart().map(item => {
    const product = products.find(product => product.id === item.id);
    if (!product) return null;
    return { ...product, qty: item.qty, lineTotal: product.price * item.qty };
  }).filter(Boolean);
  const subtotal = details.reduce((sum, item) => sum + item.lineTotal, 0);
  return { details, subtotal };
}

function productCard(product, compact = false) {
  return `<article class="product-card">
    <img class="product-card__img" src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" />
    <div class="product-card__body">
      <span class="tag">${labelHTML(product.categoryKana, product.category)}</span>
      ${productNameHTML(product)}
      <p class="product-card__desc">${escapeHTML(compact ? product.desc.slice(0, 86) + '...' : product.desc)}</p>
      <div class="product-card__footer"><strong class="price">${yen(product.price)}</strong><button class="btn-add" data-add-cart="${product.id}" aria-label="Add ${escapeHTML(product.name)}">+</button></div>
      <div class="card-actions"><a class="btn btn--ghost full" href="product-detail.html?id=${product.id}">しょうさい<span>Detail</span></a></div>
    </div>
  </article>`;
}

function articleCard(article) {
  return `<article class="article-card">
    <img class="article-card__img" src="${escapeHTML(article.image)}" alt="${escapeHTML(article.title)}" />
    <div class="article-card__body">
      <span class="tag">${labelHTML(article.categoryKana, article.category)}</span>
      <h3><span>${escapeHTML(article.titleKana)}</span><small>${escapeHTML(article.title)}</small></h3>
      <p>${escapeHTML(article.excerpt)}</p>
      <a class="section-link" href="article-detail.html?id=${article.id}">Read Article →</a>
    </div>
  </article>`;
}

function renderHome() {
  const popular = document.getElementById('popularProducts');
  const homeArticles = document.getElementById('homeArticles');
  if (popular) popular.innerHTML = getProducts().slice(0, 3).map(product => productCard(product, true)).join('');
  if (homeArticles) homeArticles.innerHTML = getArticles().slice(0, 3).map(articleCard).join('');
}

function renderCatalog() {
  const grid = document.getElementById('catalogProducts');
  const filters = document.getElementById('categoryFilters');
  const search = document.getElementById('productSearch');
  if (!grid) return;
  const products = getProducts();
  const categoryMap = new Map();
  products.forEach(item => categoryMap.set(item.category, item.categoryKana));
  const categories = [{ en: 'All', kana: 'すべて' }, ...[...categoryMap.entries()].map(([en, kana]) => ({ en, kana }))];
  let selected = 'All';
  let query = '';

  function draw() {
    const filtered = products.filter(product => {
      const byCategory = selected === 'All' || product.category === selected;
      const text = [product.name, product.nameKana, product.category, product.categoryKana, product.desc].join(' ').toLowerCase();
      const bySearch = text.includes(query.toLowerCase());
      return byCategory && bySearch;
    });
    grid.innerHTML = filtered.length ? filtered.map(product => productCard(product)).join('') : `<div class="empty-state panel"><h2>みつかりません</h2><p>No menu found.</p></div>`;
    if (filters) {
      filters.innerHTML = categories.map(category => `<button class="filter-pill ${category.en === selected ? 'active' : ''}" data-category="${escapeHTML(category.en)}"><span>${escapeHTML(category.kana)}</span><small>${escapeHTML(category.en)}</small></button>`).join('');
    }
  }

  filters?.addEventListener('click', event => {
    const btn = event.target.closest('[data-category]');
    if (!btn) return;
    selected = btn.dataset.category;
    draw();
  });
  search?.addEventListener('input', event => {
    query = event.target.value;
    draw();
  });
  draw();
}

function renderProductDetail() {
  const container = document.getElementById('productDetail');
  if (!container) return;
  const id = getQuery('id') || 'p1';
  const product = getProducts().find(item => item.id === id) || getProducts()[0];
  container.innerHTML = `<img class="detail-img" src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" />
    <div class="detail-copy">
      <p class="section-eyebrow">${labelHTML('しょうさい','Product Detail')}</p>
      ${productNameHTML(product, 'h1', 'detail-title')}
      <span class="tag">${labelHTML(product.categoryKana, product.category)}</span>
      <p>${escapeHTML(product.desc)}</p>
      <div class="detail-price">${yen(product.price)}</div>
      <div class="detail-actions">
        <button class="btn btn--primary" data-add-cart="${product.id}">かーとにいれる<span>Add to Cart</span></button>
        <a class="btn btn--ghost" href="cart.html">かーとをみる<span>View Cart</span></a>
      </div>
    </div>`;
}

function renderCartPage() {
  const list = document.getElementById('cartItems');
  const summary = document.getElementById('cartSummary');
  if (!list || !summary) return;
  const { details, subtotal } = cartDetails();
  if (!details.length) {
    list.innerHTML = `<div class="empty-state"><h2><span>かーとはからです</span><small>Your cart is empty.</small></h2><p>Choose items from the catalog first.</p><a class="btn btn--primary" href="catalog.html">かたろぐへ<span>Go to Catalog</span></a></div>`;
    summary.innerHTML = `<h2><span>まとめ</span><small>Summary</small></h2><div class="summary-row total"><span>Total</span><strong>${yen(0)}</strong></div>`;
    return;
  }
  list.innerHTML = details.map(item => `<div class="cart-item">
    <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" />
    <div>
      ${productNameHTML(item, 'h3', '')}
      <p>${escapeHTML(item.category)} · ${yen(item.price)}</p>
      <div class="qty-control">
        <button data-cart-qty="${item.id}" data-qty="${item.qty - 1}">−</button>
        <strong>${item.qty}</strong>
        <button data-cart-qty="${item.id}" data-qty="${item.qty + 1}">+</button>
        <button class="remove-btn" data-cart-qty="${item.id}" data-qty="0">Remove</button>
      </div>
    </div>
    <strong>${yen(item.lineTotal)}</strong>
  </div>`).join('');
  summary.innerHTML = `<h2><span>まとめ</span><small>Summary</small></h2>
    ${details.map(item => `<div class="summary-row"><span>${escapeHTML(item.name)} × ${item.qty}</span><span>${yen(item.lineTotal)}</span></div>`).join('')}
    <div class="summary-row total"><span>Total</span><strong>${yen(subtotal)}</strong></div>
    <a class="btn btn--primary full" href="checkout.html" style="margin-top:18px">ちぇっくあうと<span>Checkout</span></a>`;
}

function renderOrderSummary(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const { details, subtotal } = cartDetails();
  const customer = getJSON(STORAGE.customer, {});
  if (!details.length) {
    target.innerHTML = `<h2><span>まとめ</span><small>Summary</small></h2><p class="muted">Your cart is empty.</p><a class="btn btn--primary full" href="catalog.html">かたろぐへ<span>Go to Catalog</span></a>`;
    return;
  }
  target.innerHTML = `<h2><span>おーだーまとめ</span><small>Order Summary</small></h2>
    ${customer.name ? `<div class="summary-row"><span>Customer</span><span>${escapeHTML(customer.name)}</span></div><div class="summary-row"><span>Table</span><span>${escapeHTML(customer.table)}</span></div>` : ''}
    ${details.map(item => `<div class="summary-row"><span>${escapeHTML(item.name)} × ${item.qty}</span><span>${yen(item.lineTotal)}</span></div>`).join('')}
    <div class="summary-row total"><span>Total</span><strong>${yen(subtotal)}</strong></div>`;
}

function setupCheckout() {
  renderOrderSummary('checkoutSummary');
  const form = document.getElementById('checkoutForm');
  if (!form) return;
  const { details } = cartDetails();
  if (!details.length) {
    form.innerHTML = `<div class="empty-state"><h2><span>かーとはからです</span><small>Your cart is empty.</small></h2><p>Choose items before checkout.</p><a class="btn btn--primary" href="catalog.html">かたろぐへ<span>Go to Catalog</span></a></div>`;
    return;
  }
  const previous = getJSON(STORAGE.customer, {});
  Object.entries(previous).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value;
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    setJSON(STORAGE.customer, data);
    window.location.href = 'payment.html';
  });
}

function setupPayment() {
  renderOrderSummary('paymentSummary');
  const visual = document.getElementById('paymentVisual');
  const btn = document.getElementById('confirmPaymentBtn');
  const options = document.querySelectorAll('.payment-option');
  if (!visual || !btn) return;
  const { details, subtotal } = cartDetails();
  const customer = getJSON(STORAGE.customer, null);
  if (!details.length) {
    visual.innerHTML = `<div class="empty-state"><h2><span>かーとはからです</span><small>Your cart is empty.</small></h2><a class="btn btn--primary" href="catalog.html">かたろぐへ<span>Go to Catalog</span></a></div>`;
    btn.disabled = true;
    return;
  }
  if (!customer || !customer.name) {
    window.location.href = 'checkout.html';
    return;
  }

  function selectedPayment() {
    return document.querySelector('input[name="payment"]:checked')?.value || 'QRIS';
  }

  function drawVisual() {
    const method = selectedPayment();
    options.forEach(label => label.classList.toggle('active', label.querySelector('input').checked));
    if (method === 'QRIS') {
      visual.innerHTML = `<div class="qris-box"><div class="qr-code" aria-label="QRIS code"></div><strong>きゅーあーるあいえす</strong><small>QRIS</small><p>Total ${yen(subtotal)}</p></div>`;
    } else if (method === 'Debit') {
      visual.innerHTML = `<div class="cash-box"><strong>でびっと</strong><small>Debit at cashier</small><p>Total ${yen(subtotal)}</p></div>`;
    } else {
      visual.innerHTML = `<div class="cash-box"><strong>きゃっしゅ</strong><small>Cash at cashier</small><p>Total ${yen(subtotal)}</p></div>`;
    }
  }

  options.forEach(label => label.addEventListener('click', () => {
    label.querySelector('input').checked = true;
    drawVisual();
  }));
  drawVisual();

  btn.addEventListener('click', () => {
    const orders = getOrders();
    const now = new Date();
    const nextQueue = String(orders.length + 1).padStart(3, '0');
    const id = `GSN-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${String(orders.length + 1).padStart(4, '0')}`;
    const method = selectedPayment();
    const order = {
      id,
      queue: `A${nextQueue}`,
      createdAt: now.toISOString(),
      customer,
      items: details.map(item => ({ id: item.id, name: item.name, nameKana: item.nameKana, price: item.price, qty: item.qty, lineTotal: item.lineTotal })),
      total: subtotal,
      payment: method,
      paymentStatus: method === 'QRIS' ? 'Paid' : 'Pay at cashier',
      status: method === 'QRIS' ? 'Processing' : 'Waiting for cashier'
    };
    orders.unshift(order);
    saveOrders(orders);
    localStorage.setItem(STORAGE.lastOrder, id);
    saveCart([]);
    window.location.href = `invoice.html?id=${encodeURIComponent(id)}`;
  });
}

function getOrderById(id) {
  return getOrders().find(order => order.id === id) || getOrders()[0];
}

function renderInvoice() {
  const target = document.getElementById('invoiceView');
  if (!target) return;
  const id = getQuery('id') || localStorage.getItem(STORAGE.lastOrder);
  const order = getOrderById(id);
  if (!order) {
    target.innerHTML = `<div class="panel empty-state"><h2><span>いんぼいすはありません</span><small>No invoice yet.</small></h2><a class="btn btn--primary" href="catalog.html">おーだーする<span>Order Menu</span></a></div>`;
    return;
  }
  const created = new Date(order.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  target.innerHTML = `<div class="invoice-card">
    <div class="invoice-top">
      <div><div class="invoice-logo"><span>げすんりん かふぇ</span><small>Gesunrin Cafe</small></div><p class="invoice-id">Invoice ${escapeHTML(order.id)}</p><p>${created}</p></div>
      <div class="queue-number"><span>ばんごう</span><small>Queue Number</small><strong>${escapeHTML(order.queue)}</strong></div>
    </div>
    <div class="summary-row"><span>Customer</span><strong>${escapeHTML(order.customer.name)}</strong></div>
    <div class="summary-row"><span>Phone</span><strong>${escapeHTML(order.customer.phone)}</strong></div>
    <div class="summary-row"><span>Table</span><strong>${escapeHTML(order.customer.table)}</strong></div>
    <div class="summary-row"><span>Payment</span><strong>${escapeHTML(order.payment)} · ${escapeHTML(order.paymentStatus)}</strong></div>
    <table class="invoice-items"><thead><tr><th>Item</th><th>Qty</th><th>Total</th></tr></thead><tbody>${order.items.map(item => `<tr><td data-label="Item"><strong>${escapeHTML(item.nameKana || item.name)}</strong><small>${escapeHTML(item.name)}</small></td><td data-label="Qty">${item.qty}</td><td data-label="Total">${yen(item.lineTotal)}</td></tr>`).join('')}</tbody></table>
    <div class="summary-row total"><span>Total Payment</span><strong>${yen(order.total)}</strong></div>
    <div class="invoice-actions"><a class="btn btn--primary" href="history.html?highlight=${order.id}">おーだーをみる<span>View My Order</span></a><a class="btn btn--ghost" href="catalog.html">ついかする<span>Add More Items</span></a></div>
  </div>`;
  setTimeout(() => {
    if (document.body.dataset.page === 'invoice') window.location.href = `history.html?highlight=${encodeURIComponent(order.id)}`;
  }, 6500);
}

function renderHistory() {
  const target = document.getElementById('historyList');
  if (!target) return;
  const orders = getOrders();
  const highlight = getQuery('highlight');
  if (!orders.length) {
    target.innerHTML = `<div class="panel empty-state"><h2><span>りれきはありません</span><small>No order history yet.</small></h2><p>Your orders appear here after an invoice is created.</p><a class="btn btn--primary" href="catalog.html">おーだーする<span>Order Now</span></a></div>`;
    return;
  }
  target.innerHTML = orders.map(order => {
    const created = new Date(order.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    return `<article class="history-card ${order.id === highlight ? 'highlight' : ''}">
      <div class="history-head"><div><strong>${escapeHTML(order.id)}</strong><p class="history-meta">${created} · ${escapeHTML(order.customer.name)} · ${escapeHTML(order.customer.table)}</p></div><div><span class="status-badge">${escapeHTML(order.status)}</span><p class="history-meta">Queue <strong>${escapeHTML(order.queue)}</strong></p></div></div>
      <div class="history-items">${order.items.map(item => `<span><strong>${escapeHTML(item.nameKana || item.name)}</strong><small>${escapeHTML(item.name)} × ${item.qty} — ${yen(item.lineTotal)}</small></span>`).join('')}</div>
      <div class="history-meta">Payment: ${escapeHTML(order.payment)} · ${escapeHTML(order.paymentStatus)}</div>
      <div class="summary-row total"><span>Total</span><strong>${yen(order.total)}</strong></div>
      <div class="history-actions"><a class="btn btn--ghost" href="invoice.html?id=${order.id}">いんぼいす<span>Open Invoice</span></a></div>
    </article>`;
  }).join('');
}

function renderArticles() {
  const list = document.getElementById('articleList');
  if (list) list.innerHTML = getArticles().map(articleCard).join('');
}

function renderArticleDetail() {
  const target = document.getElementById('articleDetail');
  if (!target) return;
  const id = getQuery('id') || 'a1';
  const article = getArticles().find(item => item.id === id) || getArticles()[0];
  target.innerHTML = `<a class="back-link" href="articles.html">← Back to Articles</a><p class="section-eyebrow" style="margin-top:20px">${labelHTML(article.categoryKana, article.category)}</p><h1><span>${escapeHTML(article.titleKana)}</span><small>${escapeHTML(article.title)}</small></h1><img src="${escapeHTML(article.image)}" alt="${escapeHTML(article.title)}" /><p>${escapeHTML(article.body)}</p>`;
}

function requireAdmin() {
  const adminPages = ['admin-dashboard', 'admin-articles', 'admin-products', 'admin-users', 'admin-transactions'];
  if (adminPages.includes(document.body.dataset.page) && localStorage.getItem(STORAGE.admin) !== 'true') {
    window.location.href = 'login-admin.html';
  }
}

function setupLogin() {
  const form = document.getElementById('adminLoginForm');
  const message = document.getElementById('adminLoginMessage');
  if (!form) return;
  if (localStorage.getItem(STORAGE.admin) === 'true') {
    window.location.href = 'admin.html';
    return;
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.username === 'admin' && data.password === 'admin123') {
      localStorage.setItem(STORAGE.admin, 'true');
      window.location.href = 'admin.html';
    } else if (message) {
      message.textContent = 'Incorrect admin username or password.';
    }
  });
}

function setupLogout() {
  document.querySelectorAll('#adminLogoutBtn').forEach(btn => btn.addEventListener('click', () => {
    localStorage.removeItem(STORAGE.admin);
    window.location.href = 'login-admin.html';
  }));
}

function uniqueCustomers() {
  const map = new Map();
  getOrders().forEach(order => {
    const key = `${order.customer.phone}-${order.customer.email}`;
    const current = map.get(key) || { ...order.customer, totalOrders: 0 };
    current.totalOrders += 1;
    map.set(key, current);
  });
  return [...map.values()];
}

function renderDashboard() {
  const target = document.getElementById('dashboardStats');
  if (!target) return;
  const orders = getOrders();
  const stats = [
    ['きじ', 'Articles', getArticles().length],
    ['めにゅー', 'Products', getProducts().length],
    ['おきゃくさま', 'Customers', uniqueCustomers().length],
    ['とりひき', 'Transactions', orders.length]
  ];
  target.innerHTML = stats.map(([kana, label, value]) => `<div class="stat-card"><span>${escapeHTML(kana)}</span><small>${escapeHTML(label)}</small><strong>${value}</strong></div>`).join('');
}

function renderAdminArticles() {
  const table = document.getElementById('adminArticlesTable');
  const form = document.getElementById('adminArticleForm');
  if (!table) return;
  const draw = () => {
    table.innerHTML = getArticles().map(article => `<tr><td data-label="Title"><strong>${escapeHTML(article.titleKana)}</strong><small>${escapeHTML(article.title)}</small></td><td data-label="Category"><strong>${escapeHTML(article.categoryKana)}</strong><small>${escapeHTML(article.category)}</small></td><td data-label="Action"><button class="danger-btn" data-delete-article="${article.id}">Delete</button></td></tr>`).join('') || `<tr><td colspan="3">No articles yet.</td></tr>`;
  };
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const article = {
      id: `a${Date.now()}`,
      titleKana: data.title,
      title: data.title,
      categoryKana: data.category,
      category: data.category,
      image: data.image || 'assets/images/front.jpg',
      excerpt: data.body.slice(0, 110) + '...',
      body: data.body
    };
    setJSON(STORAGE.articles, [article, ...getArticles()]);
    form.reset();
    draw();
  });
  table.addEventListener('click', event => {
    const btn = event.target.closest('[data-delete-article]');
    if (!btn) return;
    setJSON(STORAGE.articles, getArticles().filter(article => article.id !== btn.dataset.deleteArticle));
    draw();
  });
  draw();
}

function renderAdminProducts() {
  const table = document.getElementById('adminProductsTable');
  const form = document.getElementById('adminProductForm');
  if (!table) return;
  const draw = () => {
    table.innerHTML = getProducts().map(product => `<tr><td data-label="Product"><strong>${escapeHTML(product.nameKana)}</strong><small>${escapeHTML(product.name)}</small></td><td data-label="Category"><strong>${escapeHTML(product.categoryKana)}</strong><small>${escapeHTML(product.category)}</small></td><td data-label="Price">${yen(product.price)}</td><td data-label="Action"><button class="danger-btn" data-delete-product="${product.id}">Delete</button></td></tr>`).join('') || `<tr><td colspan="4">No products yet.</td></tr>`;
  };
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const product = {
      id: `p${Date.now()}`,
      nameKana: data.name,
      name: data.name,
      categoryKana: data.category,
      category: data.category,
      price: Number(data.price),
      image: data.image || 'assets/images/matcha.jpg',
      desc: data.desc
    };
    setJSON(STORAGE.products, [product, ...getProducts()]);
    form.reset();
    draw();
  });
  table.addEventListener('click', event => {
    const btn = event.target.closest('[data-delete-product]');
    if (!btn) return;
    setJSON(STORAGE.products, getProducts().filter(product => product.id !== btn.dataset.deleteProduct));
    saveCart(getCart().filter(item => item.id !== btn.dataset.deleteProduct));
    draw();
  });
  draw();
}

function renderAdminUsers() {
  const table = document.getElementById('adminUsersTable');
  if (!table) return;
  const users = uniqueCustomers();
  table.innerHTML = users.length ? users.map(user => `<tr><td data-label="Name"><strong>${escapeHTML(user.name)}</strong></td><td data-label="Phone">${escapeHTML(user.phone)}</td><td data-label="Email">${escapeHTML(user.email)}</td><td data-label="Table">${escapeHTML(user.table)}</td><td data-label="Orders">${user.totalOrders}</td></tr>`).join('') : `<tr><td colspan="5">No customers from checkout yet.</td></tr>`;
}

function renderAdminTransactions() {
  const table = document.getElementById('adminTransactionsTable');
  if (!table) return;
  const draw = () => {
    const orders = getOrders();
    table.innerHTML = orders.length ? orders.map(order => `<tr><td data-label="Invoice"><strong>${escapeHTML(order.id)}</strong><br><span class="muted">Queue ${escapeHTML(order.queue)}</span></td><td data-label="Customer">${escapeHTML(order.customer.name)}<br><span class="muted">${escapeHTML(order.customer.table)}</span></td><td data-label="Method">${escapeHTML(order.payment)}<br><span class="muted">${escapeHTML(order.paymentStatus)}</span></td><td data-label="Total">${yen(order.total)}</td><td data-label="Status"><span class="status-badge">${escapeHTML(order.status)}</span></td><td data-label="Action"><div class="action-row"><button class="success-btn" data-status="Processing" data-order="${order.id}">Processing</button><button class="success-btn" data-status="Completed" data-order="${order.id}">Completed</button><button class="danger-btn" data-delete-order="${order.id}">Delete</button></div></td></tr>`).join('') : `<tr><td colspan="6">No transactions yet.</td></tr>`;
  };
  table.addEventListener('click', event => {
    const statusBtn = event.target.closest('[data-status]');
    const deleteBtn = event.target.closest('[data-delete-order]');
    if (statusBtn) {
      const orders = getOrders().map(order => order.id === statusBtn.dataset.order ? { ...order, status: statusBtn.dataset.status } : order);
      saveOrders(orders);
      draw();
    }
    if (deleteBtn) {
      saveOrders(getOrders().filter(order => order.id !== deleteBtn.dataset.deleteOrder));
      draw();
    }
  });
  draw();
}

function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!hamburger || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle('open', open);
    hamburger.classList.toggle('is-open', open);
    document.body.classList.toggle('mobile-nav-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
  };

  hamburger.addEventListener('click', () => {
    setOpen(!menu.classList.contains('open'));
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });
}

function setupGlobalClicks() {
  document.addEventListener('click', event => {
    const addBtn = event.target.closest('[data-add-cart]');
    if (addBtn) addToCart(addBtn.dataset.addCart);
    const qtyBtn = event.target.closest('[data-cart-qty]');
    if (qtyBtn) updateCartItem(qtyBtn.dataset.cartQty, Number(qtyBtn.dataset.qty));
  });
}

function init() {
  getProducts();
  getArticles();
  updateCartCount();
  setupMobileMenu();
  setupGlobalClicks();
  setupLogout();
  requireAdmin();

  const page = document.body.dataset.page;
  if (page === 'home') renderHome();
  if (page === 'catalog') renderCatalog();
  if (page === 'product-detail') renderProductDetail();
  if (page === 'cart') renderCartPage();
  if (page === 'checkout') setupCheckout();
  if (page === 'payment') setupPayment();
  if (page === 'invoice') renderInvoice();
  if (page === 'history') renderHistory();
  if (page === 'articles') renderArticles();
  if (page === 'article-detail') renderArticleDetail();
  if (page === 'login') setupLogin();
  if (page === 'admin-dashboard') renderDashboard();
  if (page === 'admin-articles') renderAdminArticles();
  if (page === 'admin-products') renderAdminProducts();
  if (page === 'admin-users') renderAdminUsers();
  if (page === 'admin-transactions') renderAdminTransactions();
}

document.addEventListener('DOMContentLoaded', init);
