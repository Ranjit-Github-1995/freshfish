// custom.js - Fresh Fish Market · Full Featured Build

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const CONFIG = {
    validPinCodes: ['712503', '712502', '712148'],
    deliveryStartHour: 6,    // deliveries start 6 AM
    deliveryEndHour: 20,     // orders after 8 PM go out next day
    sessionStorageKey: 'userPinCode',
    razorpayKey: 'rzp_live_T8a5xzy3zVLPLR',
    businessName: 'Fresh Fish Market',
    businessDescription: 'Premium Quality Fish Delivery',
    businessLogo: '',
    adminEmail: 'fresheverydayfish@gmail.com',
    webhookUrl: 'https://script.google.com/macros/s/AKfycbzvD-yfasct4HpVBNelsi1_hwPqzjtGG4SWKBOKrb-fAl43MOmSxIaTbEPxHdE63jze/exec',
    whatsapp: { adminPhone: '7890152617', enableNotifications: true }
};

// ─── STOCK MANAGEMENT ─────────────────────────────────────────────────────────
const DEFAULT_DAILY_LIMITS = {
    1:50, 2:40, 3:20, 4:25, 5:30,
    6:10, 7:35, 8:20, 9:15, 10:5, 11:20, 12:30
};
const STOCK_KEY      = 'ffm_stock';
const RESET_DATE_KEY = 'ffm_reset_date';

function loadStock() {
    const today = new Date().toDateString();
    if (localStorage.getItem(RESET_DATE_KEY) !== today || !localStorage.getItem(STOCK_KEY)) {
        resetStockToDaily();
    }
}
function resetStockToDaily() {
    const stock = {};
    products.forEach(p => { stock[p.id] = DEFAULT_DAILY_LIMITS[p.id] ?? 50; });
    localStorage.setItem(STOCK_KEY, JSON.stringify(stock));
    localStorage.setItem(RESET_DATE_KEY, new Date().toDateString());
}
function getStock(id) {
    const s = JSON.parse(localStorage.getItem(STOCK_KEY) || '{}');
    return s[id] !== undefined ? s[id] : (DEFAULT_DAILY_LIMITS[id] ?? 50);
}
function deductStock(id, grams, qty) {
    const soldKg = (grams / 1000) * qty;
    const s = JSON.parse(localStorage.getItem(STOCK_KEY) || '{}');
    s[id] = Math.max(0, (s[id] ?? DEFAULT_DAILY_LIMITS[id] ?? 50) - soldKg);
    localStorage.setItem(STOCK_KEY, JSON.stringify(s));
    return s[id];
}
function isOutOfStock(id) { return getStock(id) <= 0; }

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
const products = [
    { id:1,  name:'Rohu Fish',   price:4,    description:'Fresh water fish, rich in omega-3',       image:'images/rohu.webp', longDescription:'Rohu is one of the most popular freshwater fish in Bengali cuisine.', origin:'Freshwater ponds and rivers of West Bengal', bestFor:'Bengali curry, Rohu Kalia, Fish fry', calories:'97',  protein:'16.4g', fat:'1.4g',  omega3:'0.6g', calcium:'45mg',  iron:'1.2mg' },
    { id:2,  name:'Katla Fish',  price:320,  description:'Large freshwater fish, perfect for curry', image:'images/katla.webp', longDescription:'Katla is a prized freshwater fish known for its large size and rich taste.', origin:'Local fish farms and rivers', bestFor:'Katla Kalia, Macher Jhol, Steam preparations', calories:'111', protein:'17.8g', fat:'2.3g',  omega3:'0.8g', calcium:'60mg',  iron:'1.5mg' },
    { id:3,  name:'Hilsa Fish',  price:1140, description:'Premium Bengali delicacy',                 image:'images/hilsa.webp', longDescription:'Hilsa (Ilish) is the queen of fish in Bengali cuisine.', origin:'Bay of Bengal and Padma River', bestFor:'Bhapa Ilish, Ilish Paturi, Sorshe Ilish', calories:'273', protein:'21.8g', fat:'19.5g', omega3:'2.8g', calcium:'180mg', iron:'2.1mg' },
    { id:4,  name:'Pomfret',     price:850,  description:'Sea fish with delicate flavor',            image:'images/pomfret.webp', longDescription:'Pomfret is a premium sea fish with soft, white flesh and minimal bones.', origin:'Arabian Sea and Bay of Bengal', bestFor:'Tandoori, Pan fry, Butter garlic preparations', calories:'96',  protein:'19g',   fat:'1.7g',  omega3:'1.1g', calcium:'80mg',  iron:'0.9mg' },
    { id:5,  name:'Prawns',      price:450,  description:'Fresh tiger prawns',                       image:'images/Prawns.webp', longDescription:'Large tiger prawns are succulent and sweet.', origin:'Coastal waters of Bay of Bengal', bestFor:'Prawn curry, Tandoori prawns, Stir fry', calories:'85',  protein:'20g',   fat:'0.5g',  omega3:'0.3g', calcium:'70mg',  iron:'0.5mg' },
    //{ id:6,  name:'Salmon',      price:1850, description:'Imported Atlantic salmon',                 icon:'🐟', longDescription:'Premium Atlantic salmon is rich in omega-3 fatty acids.', origin:'Imported from Norway/Scotland', bestFor:'Grilled, Sushi, Teriyaki, Pan-seared', calories:'208', protein:'20g',   fat:'13.4g', omega3:'3.5g', calcium:'12mg',  iron:'0.8mg' },
    { id:7,  name:'Tilapia',     price:180,  description:'Farm fresh tilapia',                       image:'images/taliapia.webp', longDescription:'Tilapia is a mild-flavored, lean fish that is versatile and budget-friendly.', origin:'Local aquaculture farms', bestFor:'Fish fry, Curry, Grilled preparations', calories:'96',  protein:'20.1g', fat:'1.7g',  omega3:'0.2g', calcium:'10mg',  iron:'0.6mg' },
    //{ id:8,  name:'Sea Bass',    price:680,  description:'Premium sea bass',                         icon:'🐟', longDescription:'Sea bass has firm, white flesh with a mild, delicate flavor.', origin:'Deep sea waters', bestFor:'Steamed, Grilled, Baked preparations', calories:'124', protein:'23.6g', fat:'2.6g',  omega3:'1.5g', calcium:'92mg',  iron:'1.1mg' },
    //{ id:9,  name:'Crab',        price:750,  description:'Fresh mud crabs',                          image:'images/crab.webp', longDescription:'Fresh mud crabs are sweet and succulent.', origin:'Mangrove areas and coastal regions', bestFor:'Crab curry, Butter garlic crab, Crab cakes', calories:'87',  protein:'18.1g', fat:'1.1g',  omega3:'0.4g', calcium:'89mg',  iron:'0.7mg' },
//     { id:10, name:'Lobster',     price:2850, description:'Live lobster',                             icon:'🦞', longDescription:'Premium live lobster is the ultimate luxury seafood.', origin:'Deep sea waters', bestFor:'Thermidor, Grilled, Butter preparations', calories:'90',  protein:'19g',   fat:'0.9g',  omega3:'0.2g', calcium:'96mg',  iron:'0.3mg' },
//     { id:11, name:'Surmai',      price:920,  description:'King fish steaks',                         icon:'🐟', longDescription:'Surmai (King Fish) is a popular sea fish with firm texture.', origin:'Arabian Sea and Bay of Bengal', bestFor:'Fish steaks, Tandoori, Pan fry', calories:'139', protein:'22g',   fat:'5.2g',  omega3:'1.8g', calcium:'34mg',  iron:'1.7mg' },
//     { id:12, name:'Bangda',      price:280,  description:'Indian mackerel',                          icon:'🐠', longDescription:'Bangda (Indian Mackerel) is an oily fish with strong flavor.', origin:'Coastal waters of India', bestFor:'Rava fry, Curry, Recheado preparations', calories:'205', protein:'18.6g', fat:'13.9g', omega3:'2.6g', calcium:'12mg',  iron:'1.6mg' }
];

// ─── PRODUCT IMAGE ────────────────────────────────────────────────────────────
// Shows the product photo if it has one, otherwise the emoji (or a fish).
function productThumb(item, cls) {
    const p   = item.image ? item : (products.find(x => x.id === item.productId) || item);
    const alt = (p.name || item.productName || '').replace(/"/g, '');
    return p.image
        ? `<img src="${p.image}" alt="${alt}" class="${cls}" loading="lazy">`
        : `<span class="${cls}-emoji">${p.icon || '🐟'}</span>`;
}

// ─── STATE ────────────────────────────────────────────────────────────────────
let currentProduct      = null;
let cartCount           = 0;
let currentUserPin      = '';
let cartItems           = [];
let currentOrderDetails = null;

// ─── INIT ─────────────────────────────────────────────────────────────────────
function init() {
    loadStock();
    const storedPin = localStorage.getItem(CONFIG.sessionStorageKey);
    if (storedPin && CONFIG.validPinCodes.includes(storedPin)) {
        currentUserPin = storedPin;
        document.getElementById('currentPin').textContent = storedPin;
        document.getElementById('deliveryPin').value = storedPin;
        document.getElementById('pinModal').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
        loadProducts();
    } else {
        document.getElementById('pinModal').style.display = 'block';
        document.getElementById('mainPage').style.display = 'none';
    }
    checkTimeAndShowBanner();
    setInterval(checkTimeAndShowBanner, 60000);
    renderHeroSpecial();
    const yr = document.getElementById('ftYear');
    if (yr) yr.textContent = new Date().getFullYear();
    setInterval(loadStock, 60000);
    setupEventListeners();
}

// ─── DELIVERY SLOT ────────────────────────────────────────────────────────────
// Deliveries run 6 AM – 8 PM. Orders after 8 PM are delivered the next day.
function fmtHour(h) { return (h % 12 || 12) + (h < 12 ? ' AM' : ' PM'); }
function getDeliverySlot(now = new Date()) {
    const h = now.getHours();
    const start = fmtHour(CONFIG.deliveryStartHour), end = fmtHour(CONFIG.deliveryEndHour);
    if (h < CONFIG.deliveryStartHour) return { today: true,  text: `Today from ${start}` };
    if (h < CONFIG.deliveryEndHour)   return { today: true,  text: `Today by ${end}` };
    return { today: false, text: `Tomorrow from ${start}` };
}
// Hero "Today's special" card: change SPECIAL_ID to feature another fish
const SPECIAL_ID = 3;
function renderHeroSpecial() {
    const p = products.find(x => x.id === SPECIAL_ID);
    if (!p) return;
    const name = document.getElementById('hvName'), price = document.getElementById('hvPrice');
    if (name)  name.textContent  = p.name;
    if (price) price.textContent = '₹' + p.price.toLocaleString('en-IN') + '/kg';
    const img = document.getElementById('hvImg');
    if (img && p.image) img.src = p.image;
}
function updateDeliveryCopy() {
    const slot = getDeliverySlot();
    const announce = slot.today
        ? `Fresh catch, delivered the same day`
        : `Orders placed now arrive tomorrow from ${fmtHour(CONFIG.deliveryStartHour)}`;
    document.querySelectorAll('[data-delivery]').forEach(el => {
        const kind = el.dataset.delivery;
        el.textContent = kind === 'announce' ? announce
                       : kind === 'slot-lower' ? slot.text.charAt(0).toLowerCase() + slot.text.slice(1)
                       : slot.text;
    });
}

// ─── BANNER ───────────────────────────────────────────────────────────────────
function checkTimeAndShowBanner() {
    updateDeliveryCopy();
    document.getElementById('deliveryBanner').style.display = 'flex';
    const navbar = document.getElementById('navbar');
    navbar.classList.add('with-banner');
    document.getElementById('cartDrawer').style.top = (navbar.offsetHeight + 32) + 'px';
}

// ─── EVENT LISTENERS ──────────────────────────────────────────────────────────
function setupEventListeners() {
    const pinInput = document.getElementById('pinCodeInput');
    if (pinInput) {
        pinInput.addEventListener('keypress', e => { if (e.key === 'Enter') verifyPinCode(); });
        pinInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^\d]/g, '');
            this.classList.remove('is-invalid');
        });
    }
    const phoneInput = document.getElementById('customerPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^\d]/g, '');
            this.classList.toggle('is-valid', this.value.length === 10);
            if (this.value.length !== 10) this.classList.remove('is-valid');
        });
    }
}

// ─── PIN ──────────────────────────────────────────────────────────────────────
function verifyPinCode() {
    const pinInput = document.getElementById('pinCodeInput');
    const pin = pinInput.value.trim();
    if (pin.length !== 6 || !/^\d{6}$/.test(pin)) {
        pinInput.classList.add('error-shake', 'is-invalid');
        setTimeout(() => pinInput.classList.remove('error-shake'), 500);
        return;
    }
    if (CONFIG.validPinCodes.includes(pin)) {
        localStorage.setItem(CONFIG.sessionStorageKey, pin);
        currentUserPin = pin;
        document.getElementById('currentPin').textContent = pin;
        document.getElementById('deliveryPin').value = pin;
        document.getElementById('pinModal').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
        loadProducts();
    } else {
        document.getElementById('pinModal').style.display = 'none';
        document.getElementById('overlay').style.display  = 'block';
        document.getElementById('notAvailableModal').style.display = 'block';
    }
}
function pickPin(pin) {
    const input = document.getElementById('pinCodeInput');
    input.value = pin;
    input.classList.remove('is-invalid');
    verifyPinCode();
}
function retryPinCode() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('notAvailableModal').style.display = 'none';
    document.getElementById('pinModal').style.display = 'block';
    document.getElementById('pinCodeInput').value = '';
    document.getElementById('pinCodeInput').classList.remove('is-invalid');
}
function changePinCode() {
    localStorage.removeItem(CONFIG.sessionStorageKey);
    currentUserPin = '';
    ['mainPage','paymentPage'].forEach(id => document.getElementById(id).style.display = 'none');
    retryPinCode();
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
function loadProducts() {
    const c = document.getElementById('productsContainer');
    c.innerHTML = '';
    products.forEach(p => { c.innerHTML += createProductCard(p); });
}

function createProductCard(product) {
    const stockLeft  = getStock(product.id);
    const outOfStock = stockLeft <= 0;
    const lowStock   = !outOfStock && stockLeft <= 2;
    const defaultPrice = formatRupees(product.price * 0.5);

    const badge = outOfStock
        ? `<span class="pc-badge pc-badge-out"><i class="far fa-circle-xmark"></i>Sold out today</span>`
        : lowStock
            ? `<span class="pc-badge pc-badge-low"><i class="far fa-hourglass-half"></i>Only ${stockLeft.toFixed(1)} kg left</span>`
            : `<span class="pc-badge"><i class="far fa-sun"></i>Fresh today</span>`;

    const weights = [[500,'500 g'],[750,'750 g'],[1000,'1 kg']].map(([g,label]) => `
        <input type="radio" name="weight_${product.id}" id="w${product.id}_${g}" value="${g}" ${g===500?'checked':''}
               onchange="updateCardPrice(${product.id}, ${product.price})">
        <label for="w${product.id}_${g}">${label}</label>`).join('');

    const controls = outOfStock
        ? `<button class="pc-soldout" disabled><i class="far fa-bell"></i>Back tomorrow</button>`
        : `<div class="pc-field-label">Weight</div>
           <div class="pc-weights" role="radiogroup" aria-label="Weight">${weights}</div>
           <div class="pc-qty-row">
               <div class="pc-stepper" aria-label="Quantity">
                   <button type="button" aria-label="Decrease" onclick="changeCardQty(${product.id}, -1, ${product.price})">&minus;</button>
                   <span id="card_qty_${product.id}">1</span>
                   <button type="button" aria-label="Increase" onclick="changeCardQty(${product.id}, 1, ${product.price})">+</button>
               </div>
               <div class="pc-total">
                   <small>Total</small>
                   <strong class="card-total-price" id="card_price_${product.id}">${defaultPrice}</strong>
               </div>
           </div>
           <div class="pc-actions">
               <button type="button" class="pc-btn-cart" onclick="addToCartFromCard(${product.id})" aria-label="Add ${product.name} to cart" title="Add to cart">
                   <i class="ffi ffi-basket"></i><span>Add</span>
               </button>
               <button type="button" class="pc-btn-buy" onclick="buyNowFromCard(${product.id})">
                   Buy now<i class="far fa-circle-right"></i>
               </button>
           </div>`;

    return `
        <div class="col-xl-3 col-lg-4 col-sm-6">
            <article class="pc ${outOfStock ? 'pc-out' : ''}">
                <div class="pc-media">
                    ${productThumb(product, 'product-img')}
                    ${badge}
                    <span class="pc-price"><strong>₹${product.price.toLocaleString('en-IN')}</strong>/kg</span>
                </div>
                <div class="pc-body">
                    <h3 class="pc-name">${product.name}</h3>
                    <p class="pc-desc">${product.description}</p>
                    ${controls}
                </div>
            </article>
        </div>`;
}

// ─── CARD PRICE / QTY ─────────────────────────────────────────────────────────
function updateCardPrice(productId, pricePerKg) {
    const selected = document.querySelector(`input[name="weight_${productId}"]:checked`);
    const weight   = selected ? parseInt(selected.value) : 500;
    const qtyEl    = document.getElementById('card_qty_' + productId);
    const qty      = qtyEl ? parseInt(qtyEl.textContent) || 1 : 1;
    const total    = pricePerKg * (weight / 1000) * qty;
    const priceEl  = document.getElementById('card_price_' + productId);
    if (priceEl) {
        priceEl.textContent     = formatRupees(total);
        priceEl.classList.remove('pc-bump'); void priceEl.offsetWidth; priceEl.classList.add('pc-bump');
    }
}
function changeCardQty(productId, delta, pricePerKg) {
    const qtyEl = document.getElementById('card_qty_' + productId);
    if (!qtyEl) return;
    let qty = parseInt(qtyEl.textContent) || 1;
    qty = Math.max(1, qty + delta);
    qtyEl.textContent = qty;
    updateCardPrice(productId, pricePerKg);
}

// ─── ADD TO CART ──────────────────────────────────────────────────────────────
function addToCartFromCard(productId) {
    if (isOutOfStock(productId)) { alert('Sorry! This product is out of stock for today.'); return; }
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const selected  = document.querySelector(`input[name="weight_${productId}"]:checked`);
    const weight    = selected ? parseInt(selected.value) : 500;
    const qtyEl     = document.getElementById('card_qty_' + productId);
    const quantity  = qtyEl ? parseInt(qtyEl.textContent) || 1 : 1;
    const stockLeft = getStock(productId);
    const soldKg    = (weight / 1000) * quantity;

    if (soldKg > stockLeft) { alert(`Only ${stockLeft.toFixed(1)} kg available today.`); return; }

    const total      = product.price * (weight / 1000) * quantity;
    const weightText = weight >= 1000 ? `${weight/1000}kg` : `${weight}g`;

    const existingIdx = cartItems.findIndex(i => i.productName === product.name && i.weight === weightText);
    if (existingIdx >= 0) {
        cartItems[existingIdx].quantity += quantity;
        cartItems[existingIdx].price = product.price * (weight / 1000) * cartItems[existingIdx].quantity;
    } else {
        cartItems.push({ productId: product.id, productName: product.name, image: product.image, icon: product.icon,
            pricePerKg: product.price, weight: weightText, weightGrams: weight, quantity, price: total });
    }

    cartCount = cartItems.length;
    document.getElementById('cartCount').textContent = cartCount;
    const badge = document.getElementById('cartCountBadge');
    if (badge) badge.textContent = cartCount;
    renderCartDrawer();
    openCart();
}

// ─── BUY NOW ──────────────────────────────────────────────────────────────────
function buyNowFromCard(productId) {
    if (isOutOfStock(productId)) { alert('Sorry! This product is out of stock for today.'); return; }
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const selected  = document.querySelector(`input[name="weight_${productId}"]:checked`);
    const weight    = selected ? parseInt(selected.value) : 500;
    const qtyEl     = document.getElementById('card_qty_' + productId);
    const quantity  = qtyEl ? parseInt(qtyEl.textContent) || 1 : 1;
    const stockLeft = getStock(productId);
    const soldKg    = (weight / 1000) * quantity;

    if (soldKg > stockLeft) { alert(`Only ${stockLeft.toFixed(1)} kg available today.`); return; }

    const total      = product.price * (weight / 1000) * quantity;
    const weightText = weight >= 1000 ? `${weight/1000}kg` : `${weight}g`;

    currentProduct      = product;
    currentOrderDetails = { isCartOrder: false, product, weight, quantity, total };

    document.getElementById('mainPage').style.display    = 'none';
    document.getElementById('paymentPage').style.display = 'block';

    renderCheckoutSummary([{ productId: product.id, image: product.image, icon: product.icon, productName: product.name, quantity,
        weight: weightText, pricePerKg: product.price, price: total }], total);
    document.getElementById('deliveryPin').value = currentUserPin;
    window.scrollTo(0, 0);
    history.pushState({ page: 'payment' }, '', window.location.pathname);
}

// ─── CHECKOUT SUMMARY ─────────────────────────────────────────────────────────
function formatRupees(n) {
    return '₹' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function renderCheckoutSummary(items, total) {
    document.getElementById('orderSummary').innerHTML = items.map(item => `
        <div class="co-item">
            <div class="co-item-thumb">${productThumb(item, 'co-thumb-img')}</div>
            <div class="co-item-info">
                <div class="co-item-name">${item.productName}</div>
                <div class="co-item-meta">${item.quantity} × ${item.weight} · ₹${item.pricePerKg}/kg</div>
            </div>
            <div class="co-item-price">${formatRupees(item.price)}</div>
        </div>`).join('');
    const count = items.length;
    document.getElementById('coItemCount').textContent     = count + (count === 1 ? ' item' : ' items');
    document.getElementById('subtotalAmount').textContent  = formatRupees(total);
    document.getElementById('finalAmount').textContent     = formatRupees(total);
    document.getElementById('payButtonAmount').textContent = formatRupees(total);
    document.getElementById('mobilePayAmount').textContent = formatRupees(total);
}

// ─── CART CHECKOUT ────────────────────────────────────────────────────────────
function cartCheckout() {
    if (cartItems.length === 0) return;

    const grandTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const firstItem    = cartItems[0];
    const firstProduct = products.find(p => p.id === firstItem.productId) || products[0];
    currentProduct     = firstProduct;
    currentOrderDetails = {
        isCartOrder: true,
        weight:   firstItem.weightGrams || 500,
        quantity: cartItems.reduce((s, i) => s + i.quantity, 0),
        total:    grandTotal
    };

    closeCart();
    document.getElementById('mainPage').style.display    = 'none';
    document.getElementById('paymentPage').style.display = 'block';
    renderCheckoutSummary(cartItems, grandTotal);
    document.getElementById('deliveryPin').value = currentUserPin;
    window.scrollTo(0, 0);
}

// ─── CART DRAWER ──────────────────────────────────────────────────────────────
function openCart() {
    renderCartDrawer();
    document.getElementById('cartDrawer').classList.add('open');
}
function closeCart() {
    document.getElementById('cartDrawer').classList.remove('open');
}
function renderCartDrawer() {
    const listEl   = document.getElementById('cartItemsList');
    const emptyEl  = document.getElementById('cartEmpty');
    const footerEl = document.getElementById('cartFooter');
    const subEl    = document.getElementById('cartSubtotal');
    const badgeEl  = document.getElementById('cartCountBadge');

    if (badgeEl) badgeEl.textContent = cartItems.length;
    updateBasketTotal();
    listEl.innerHTML = '';

    if (cartItems.length === 0) {
        emptyEl.style.display  = 'block';
        footerEl.style.display = 'none';
        return;
    }
    emptyEl.style.display  = 'none';
    footerEl.style.display = 'block';

    let subtotal = 0;
    cartItems.forEach((item, idx) => {
        subtotal += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-icon">${productThumb(item, 'cart-thumb-img')}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.productName}</div>
                <div class="cart-item-meta">${item.quantity} × ${item.weight}</div>
            </div>
            <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
            <button class="cart-item-remove" onclick="removeCartItem(${idx})">
                <i class="far fa-trash-can"></i>
            </button>`;
        listEl.appendChild(div);
    });
    subEl.textContent = '₹' + subtotal.toFixed(2);
}
function updateBasketTotal() {
    const total = cartItems.reduce((sum, i) => sum + i.price, 0);
    const el = document.getElementById('basketTotal');
    if (el) el.textContent = formatRupees(total).replace('.00', '');
    document.getElementById('cartCount').textContent = cartItems.length;
}
function removeCartItem(idx) {
    cartItems.splice(idx, 1);
    cartCount = cartItems.length;
    document.getElementById('cartCount').textContent = cartCount;
    const badge = document.getElementById('cartCountBadge');
    if (badge) badge.textContent = cartCount;
    renderCartDrawer();
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
function showMainPage() {
    document.getElementById('mainPage').style.display    = 'block';
    document.getElementById('paymentPage').style.display = 'none';
    loadProducts();
    if (history.state !== 'main') history.pushState('main', '', window.location.pathname);
}

// ─── PAYMENT FORM ─────────────────────────────────────────────────────────────
function processPayment() {
    const nameInput     = document.getElementById('customerName');
    const phoneInput    = document.getElementById('customerPhone');
    const addressInput  = document.getElementById('customerAddress');
    const landmarkInput = document.getElementById('customerLandmark');

    let valid = true;
    [nameInput, phoneInput, addressInput, landmarkInput].forEach(el => {
        if (!el.value.trim()) { valid = false; el.classList.add('is-invalid'); }
        else el.classList.remove('is-invalid');
    });
    if (phoneInput.value.length !== 10) { valid = false; phoneInput.classList.add('is-invalid'); }
    if (!valid) { alert('Please fill all required fields including Landmark'); return; }

    if (!currentOrderDetails.isCartOrder) {
        const soldKg = (currentOrderDetails.weight / 1000) * currentOrderDetails.quantity;
        if (soldKg > getStock(currentProduct.id)) {
            alert('Stock reduced. Please go back and adjust quantity.'); return;
        }
    }

    initiateRazorpayPayment({
        name:     nameInput.value,
        phone:    phoneInput.value,
        address:  addressInput.value,
        landmark: landmarkInput.value,
        pin:      currentUserPin
    });
}

// ─── RAZORPAY ─────────────────────────────────────────────────────────────────
function initiateRazorpayPayment(customerDetails) {
    const description = currentOrderDetails.isCartOrder
        ? `Cart Order (${cartItems.length} item${cartItems.length > 1 ? 's' : ''})`
        : `Order for ${currentProduct.name}`;

    const options = {
        key:      CONFIG.razorpayKey,
        amount:   Math.round(currentOrderDetails.total * 100),
        currency: 'INR',
        name:     CONFIG.businessName,
        description,
        handler:  response => handlePaymentSuccess(response, customerDetails),
        prefill:  { name: customerDetails.name, contact: customerDetails.phone },
        notes: {
            address:  customerDetails.address,
            landmark: customerDetails.landmark,
            pin:      customerDetails.pin,
            product:  currentOrderDetails.isCartOrder
                ? cartItems.map(i => i.productName).join(', ')
                : currentProduct.name
        },
        theme: { color: '#00b4d8' },
        modal: { ondismiss: () => console.log('Payment cancelled') },
        config: {
            display: {
                blocks: { banks: { name: 'Pay using UPI', instruments: [{ method: 'upi' }] } },
                sequence: ['block.banks'],
                preferences: { show_default_blocks: true }
            }
        }
    };

    if (typeof Razorpay !== 'undefined') {
        const rzp = new Razorpay(options);
        rzp.on('payment.failed', r => { alert('Payment failed. Please try again.'); console.error(r.error); });
        setTimeout(() => rzp.open(), 1500);
    } else {
        alert('Payment gateway not loaded. Please refresh.');
    }
}

// ─── PAYMENT SUCCESS ──────────────────────────────────────────────────────────
function handlePaymentSuccess(response, customerDetails) {
    document.getElementById('processingIndicator').style.display = 'block';

    const orderId = 'FFM' + Date.now();
    let productSummary, weightText, remaining;

    if (currentOrderDetails.isCartOrder) {
        cartItems.forEach(item => deductStock(item.productId, item.weightGrams || 500, item.quantity));
        productSummary = cartItems.map(i => `${i.productName} (${i.quantity}×${i.weight})`).join(', ');
        weightText     = cartItems.map(i => i.weight).join(', ');
        remaining      = '';
    } else {
        remaining      = deductStock(currentProduct.id, currentOrderDetails.weight, currentOrderDetails.quantity);
        productSummary = currentProduct.name;
        weightText     = currentOrderDetails.weight >= 1000
            ? `${currentOrderDetails.weight/1000} kg`
            : `${currentOrderDetails.weight}g`;
    }

    const payload = {
        type:           'order_complete',
        orderId,
        paymentId:      response.razorpay_payment_id,
        customerName:   customerDetails.name,
        customerPhone:  customerDetails.phone,
        product:        productSummary,
        quantity:       currentOrderDetails.quantity,
        weight:         weightText,
        pricePerKg:     currentOrderDetails.isCartOrder ? 'Multiple' : currentProduct.price,
        amount:         currentOrderDetails.total.toFixed(2),
        address:        customerDetails.address,
        landmark:       customerDetails.landmark || '',
        pin:            customerDetails.pin,
        stockRemaining: remaining || '',
        timestamp:      new Date().toISOString()
    };

    // Send to Google Apps Script via form submission (no CORS issues)
    sendViaForm(payload);

    setTimeout(() => {
        document.getElementById('processingIndicator').style.display = 'none';
        showSuccessModal(orderId, customerDetails);
        cartItems = [];
        cartCount = 0;
        document.getElementById('cartCount').textContent = 0;
        const badge = document.getElementById('cartCountBadge');
        if (badge) badge.textContent = 0;
        renderCartDrawer();
    }, 2000);
}

// ─── SEND ORDER DATA TO GAS (multiple methods for reliability) ────────────────
function sendViaForm(payload) {
    // Method 1: XMLHttpRequest (most reliable for GAS)
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', CONFIG.webhookUrl, true);
        xhr.setRequestHeader('Content-Type', 'text/plain'); // GAS accepts text/plain without CORS preflight
        xhr.onload = function() {
            console.log('✅ XHR response:', xhr.responseText);
        };
        xhr.onerror = function() {
            console.log('XHR failed, trying method 2...');
            sendViaGETRequest(payload);
        };
        xhr.send(JSON.stringify(payload));
        console.log('✅ Order sent via XHR');
    } catch(err) {
        console.error('XHR error:', err);
        sendViaGETRequest(payload);
    }
}

// Method 2: GET request with encoded payload
function sendViaGETRequest(payload) {
    try {
        const encoded = encodeURIComponent(JSON.stringify(payload));
        const url     = CONFIG.webhookUrl + '?data=' + encoded;
        const img     = new Image();
        img.src       = url;
        console.log('✅ Order sent via GET');

        // Also try fetch no-cors as backup
        fetch(CONFIG.webhookUrl, {
            method:  'POST',
            mode:    'no-cors',
            headers: { 'Content-Type': 'text/plain' },
            body:    JSON.stringify(payload)
        }).then(() => console.log('✅ Backup fetch sent'))
          .catch(e  => console.error('Backup fetch failed:', e));

    } catch(err) {
        console.error('GET method failed:', err);
    }
}

// ─── MODALS ───────────────────────────────────────────────────────────────────
function showSuccessModal(orderId, customerDetails) {
    document.getElementById('orderId').textContent        = orderId;
    document.getElementById('confirmedPhone').textContent = '+91 ' + customerDetails.phone;
    const slot = getDeliverySlot();
    document.getElementById('confirmedSlot').textContent = slot.text.charAt(0).toLowerCase() + slot.text.slice(1);
    document.getElementById('overlay').style.display       = 'block';
    document.getElementById('successModal').style.display  = 'block';
}
function closeModal() {
    document.getElementById('overlay').style.display      = 'none';
    document.getElementById('successModal').style.display = 'none';
    cartItems = []; cartCount = 0;
    renderCartDrawer();
    showMainPage();
    document.getElementById('paymentForm').reset();
    document.getElementById('deliveryPin').value = currentUserPin;
}

// ─── POPSTATE ─────────────────────────────────────────────────────────────────
window.addEventListener('popstate', function(e) {
    const state = e.state;
    if (!state || state === 'main') {
        document.getElementById('mainPage').style.display    = 'block';
        document.getElementById('paymentPage').style.display = 'none';
        loadProducts();
    }
});

// ─── BOOT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);

window.verifyPinCode     = verifyPinCode;
window.retryPinCode      = retryPinCode;
window.pickPin           = pickPin;
window.changePinCode     = changePinCode;
window.showMainPage      = showMainPage;
window.processPayment    = processPayment;
window.closeModal        = closeModal;
window.openCart          = openCart;
window.closeCart         = closeCart;
window.removeCartItem    = removeCartItem;
window.cartCheckout      = cartCheckout;
window.buyNowFromCard    = buyNowFromCard;
window.updateCardPrice   = updateCardPrice;
window.addToCartFromCard = addToCartFromCard;
window.changeCardQty     = changeCardQty;
