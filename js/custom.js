// custom.js - Fresh Fish Market · Full Featured Build

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const CONFIG = {
    validPinCodes: ['712503', '712502', '712148'],
    bannerStartHour: 14,
    sessionStorageKey: 'userPinCode',
    razorpayKey: 'rzp_live_T8a5xzy3zVLPLR', // fallback only — primary key stored in Google Apps Script
    businessName: 'Fresh Fish Market',
    businessDescription: 'Premium Quality Fish Delivery',
    businessLogo: '',
    adminEmail: 'fresheverydayfish@gmail.com',
    webhookUrl: 'https://script.google.com/macros/s/AKfycbyKmcr_72OksKxFbSFI26Rd5RMjAHXWndySkN13TPayjy5I739hQVJ6NIDqBragkoip/exec',
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
    { id:1,  name:'Rohu Fish',   price:5,    description:'Fresh water fish, rich in omega-3',       icon:'🐟', longDescription:'Rohu is one of the most popular freshwater fish in Bengali cuisine. Known for its tender meat and mild flavor.', origin:'Freshwater ponds and rivers of West Bengal', bestFor:'Bengali curry, Rohu Kalia, Fish fry', calories:'97',  protein:'16.4g', fat:'1.4g',  omega3:'0.6g', calcium:'45mg',  iron:'1.2mg' },
    { id:2,  name:'Katla Fish',  price:320,  description:'Large freshwater fish, perfect for curry', icon:'🐠', longDescription:'Katla is a prized freshwater fish known for its large size and rich taste.', origin:'Local fish farms and rivers', bestFor:'Katla Kalia, Macher Jhol, Steam preparations', calories:'111', protein:'17.8g', fat:'2.3g',  omega3:'0.8g', calcium:'60mg',  iron:'1.5mg' },
    { id:3,  name:'Hilsa Fish',  price:1140, description:'Premium Bengali delicacy',                 icon:'🐟', longDescription:'Hilsa (Ilish) is the queen of fish in Bengali cuisine.', origin:'Bay of Bengal and Padma River', bestFor:'Bhapa Ilish, Ilish Paturi, Sorshe Ilish', calories:'273', protein:'21.8g', fat:'19.5g', omega3:'2.8g', calcium:'180mg', iron:'2.1mg' },
    { id:4,  name:'Pomfret',     price:850,  description:'Sea fish with delicate flavor',            icon:'🐠', longDescription:'Pomfret is a premium sea fish with soft, white flesh and minimal bones.', origin:'Arabian Sea and Bay of Bengal', bestFor:'Tandoori, Pan fry, Butter garlic preparations', calories:'96',  protein:'19g',   fat:'1.7g',  omega3:'1.1g', calcium:'80mg',  iron:'0.9mg' },
    { id:5,  name:'Prawns',      price:450,  description:'Fresh tiger prawns',                       icon:'🦐', longDescription:'Large tiger prawns are succulent and sweet.', origin:'Coastal waters of Bay of Bengal', bestFor:'Prawn curry, Tandoori prawns, Stir fry', calories:'85',  protein:'20g',   fat:'0.5g',  omega3:'0.3g', calcium:'70mg',  iron:'0.5mg' },
    { id:6,  name:'Salmon',      price:1850, description:'Imported Atlantic salmon',                 icon:'🐟', longDescription:'Premium Atlantic salmon is rich in omega-3 fatty acids.', origin:'Imported from Norway/Scotland', bestFor:'Grilled, Sushi, Teriyaki, Pan-seared', calories:'208', protein:'20g',   fat:'13.4g', omega3:'3.5g', calcium:'12mg',  iron:'0.8mg' },
    { id:7,  name:'Tilapia',     price:180,  description:'Farm fresh tilapia',                       icon:'🐠', longDescription:'Tilapia is a mild-flavored, lean fish that is versatile and budget-friendly.', origin:'Local aquaculture farms', bestFor:'Fish fry, Curry, Grilled preparations', calories:'96',  protein:'20.1g', fat:'1.7g',  omega3:'0.2g', calcium:'10mg',  iron:'0.6mg' },
    { id:8,  name:'Sea Bass',    price:680,  description:'Premium sea bass',                         icon:'🐟', longDescription:'Sea bass has firm, white flesh with a mild, delicate flavor.', origin:'Deep sea waters', bestFor:'Steamed, Grilled, Baked preparations', calories:'124', protein:'23.6g', fat:'2.6g',  omega3:'1.5g', calcium:'92mg',  iron:'1.1mg' },
    { id:9,  name:'Crab',        price:750,  description:'Fresh mud crabs',                          icon:'🦀', longDescription:'Fresh mud crabs are sweet and succulent.', origin:'Mangrove areas and coastal regions', bestFor:'Crab curry, Butter garlic crab, Crab cakes', calories:'87',  protein:'18.1g', fat:'1.1g',  omega3:'0.4g', calcium:'89mg',  iron:'0.7mg' },
    { id:10, name:'Lobster',     price:2850, description:'Live lobster',                             icon:'🦞', longDescription:'Premium live lobster is the ultimate luxury seafood.', origin:'Deep sea waters', bestFor:'Thermidor, Grilled, Butter preparations', calories:'90',  protein:'19g',   fat:'0.9g',  omega3:'0.2g', calcium:'96mg',  iron:'0.3mg' },
    { id:11, name:'Surmai',      price:920,  description:'King fish steaks',                         icon:'🐟', longDescription:'Surmai (King Fish) is a popular sea fish with firm texture.', origin:'Arabian Sea and Bay of Bengal', bestFor:'Fish steaks, Tandoori, Pan fry', calories:'139', protein:'22g',   fat:'5.2g',  omega3:'1.8g', calcium:'34mg',  iron:'1.7mg' },
    { id:12, name:'Bangda',      price:280,  description:'Indian mackerel',                          icon:'🐠', longDescription:'Bangda (Indian Mackerel) is an oily fish with strong flavor.', origin:'Coastal waters of India', bestFor:'Rava fry, Curry, Recheado preparations', calories:'205', protein:'18.6g', fat:'13.9g', omega3:'2.6g', calcium:'12mg',  iron:'1.6mg' }
];

// ─── STATE ────────────────────────────────────────────────────────────────────
let currentProduct      = null;
let cartCount           = 0;
let currentUserPin      = '';
let cartItems           = [];
let currentOrderDetails = null;

// ─── INIT ─────────────────────────────────────────────────────────────────────
function init() {
    loadStock();
    const storedPin = sessionStorage.getItem(CONFIG.sessionStorageKey);
    if (storedPin && CONFIG.validPinCodes.includes(storedPin)) {
        currentUserPin = storedPin;
        document.getElementById('currentPin').textContent = 'PIN: ' + storedPin;
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
    setInterval(loadStock, 60000);
    setupEventListeners();
}

// ─── BANNER ───────────────────────────────────────────────────────────────────
function checkTimeAndShowBanner() {
    const show = new Date().getHours() >= CONFIG.bannerStartHour;
    document.getElementById('deliveryBanner').style.display = show ? 'flex' : 'none';
    document.getElementById('navbar').classList.toggle('with-banner', show);
    const navbar = document.getElementById('navbar');
    const navH   = navbar.offsetHeight + (show ? 28 : 0);
    document.getElementById('cartDrawer').style.top = navH + 'px';
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
        sessionStorage.setItem(CONFIG.sessionStorageKey, pin);
        currentUserPin = pin;
        document.getElementById('currentPin').textContent = 'PIN: ' + pin;
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
function retryPinCode() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('notAvailableModal').style.display = 'none';
    document.getElementById('pinModal').style.display = 'block';
    document.getElementById('pinCodeInput').value = '';
    document.getElementById('pinCodeInput').classList.remove('is-invalid');
}
function changePinCode() {
    sessionStorage.removeItem(CONFIG.sessionStorageKey);
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

    const badge = outOfStock
        ? `<div class="badge-out-of-stock"><i class="fas fa-times-circle me-1"></i>Out of Stock</div>`
        : lowStock
            ? `<div class="badge-low-stock"><i class="fas fa-exclamation-triangle me-1"></i>Only ${stockLeft.toFixed(1)}kg left!</div>`
            : `<div class="badge-fresh"><i class="fas fa-leaf me-1"></i>Fresh Daily</div>`;

    const defaultPrice = (product.price * 0.5).toFixed(2);

    const body = outOfStock
        ? `<div class="product-body">
               <div class="product-name">${product.name}</div>
               <div class="product-desc">${product.description}</div>
               <div class="card-rate-label"><i class="fas fa-tag me-1"></i>₹${product.price}/kg</div>
               <button class="btn-out-of-stock" disabled>
                   <i class="fas fa-times-circle me-1"></i>Out of Stock
               </button>
           </div>`
        : `<div class="product-body">
               <div class="product-name">${product.name}</div>
               <div class="product-desc">${product.description}</div>
               <div class="card-rate-label"><i class="fas fa-tag me-1"></i>₹${product.price}/kg</div>
               <div class="card-weight-selector">
                   <label class="card-weight-label"><i class="fas fa-weight me-1"></i>Select Weight</label>
                   <div class="card-weight-btns">
                       <input type="radio" name="weight_${product.id}" id="w${product.id}_500" value="500" checked
                              onchange="updateCardPrice(${product.id}, ${product.price})">
                       <label class="card-w-btn" for="w${product.id}_500">500g</label>
                       <input type="radio" name="weight_${product.id}" id="w${product.id}_750" value="750"
                              onchange="updateCardPrice(${product.id}, ${product.price})">
                       <label class="card-w-btn" for="w${product.id}_750">750g</label>
                       <input type="radio" name="weight_${product.id}" id="w${product.id}_1000" value="1000"
                              onchange="updateCardPrice(${product.id}, ${product.price})">
                       <label class="card-w-btn" for="w${product.id}_1000">1 kg</label>
                   </div>
               </div>
               <div class="card-qty-row">
                   <label class="card-weight-label"><i class="fas fa-sort-numeric-up me-1"></i>Quantity</label>
                   <div class="card-qty-selector">
                       <button class="card-qty-btn" onclick="changeCardQty(${product.id}, -1, ${product.price})">
                           <i class="fas fa-minus"></i>
                       </button>
                       <span class="card-qty-display" id="card_qty_${product.id}">1</span>
                       <button class="card-qty-btn" onclick="changeCardQty(${product.id}, 1, ${product.price})">
                           <i class="fas fa-plus"></i>
                       </button>
                   </div>
               </div>
               <div class="card-price-row">
                   <span class="card-total-label"><i class="fas fa-receipt me-1"></i>Total</span>
                   <span class="card-total-price" id="card_price_${product.id}">₹${defaultPrice}</span>
               </div>
               <div class="card-action-btns">
                   <button class="btn-card-cart" onclick="addToCartFromCard(${product.id})">
                       <i class="fas fa-cart-plus me-1"></i>Add to Cart
                   </button>
                   <button class="btn-card-buy" onclick="buyNowFromCard(${product.id})">
                       <i class="fas fa-bolt me-1"></i>Buy Now
                   </button>
               </div>
           </div>`;

    return `
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="product-card ${outOfStock ? 'card-out-of-stock' : ''}">
                ${badge}
                <div class="product-image-wrap">
                    <span class="product-emoji">${product.icon}</span>
                </div>
                ${body}
            </div>
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
        priceEl.textContent     = '₹' + total.toFixed(2);
        priceEl.style.transform = 'scale(1.15)';
        priceEl.style.color     = '#06d6a0';
        setTimeout(() => { priceEl.style.transform = 'scale(1)'; priceEl.style.color = ''; }, 300);
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
        cartItems.push({ productId: product.id, productName: product.name, icon: product.icon,
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

    document.getElementById('orderProductIcon').textContent = product.icon;
    document.getElementById('orderSummary').innerHTML = `
        <strong>${product.name}</strong>
        <div style="margin-top:4px;color:var(--text-muted);font-size:.85rem;">
            ${quantity} × ${weightText} &nbsp;·&nbsp; ₹${product.price}/kg
        </div>`;
    document.getElementById('finalAmount').textContent     = '₹' + total.toFixed(2);
    document.getElementById('payButtonAmount').textContent = '₹' + total.toFixed(2);
    document.getElementById('deliveryPin').value = currentUserPin;

    window.scrollTo(0, 0);
    history.pushState({ page: 'payment' }, '', window.location.pathname);
}

// ─── CART CHECKOUT (all items, grand total) ───────────────────────────────────
function cartCheckout() {
    if (cartItems.length === 0) return;

    const grandTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

    let summaryHTML = '';
    cartItems.forEach(item => {
        summaryHTML += `
            <div class="checkout-item-row">
                <span class="checkout-item-icon">${item.icon}</span>
                <div class="checkout-item-detail">
                    <strong>${item.productName}</strong>
                    <small>${item.quantity} × ${item.weight} &nbsp;·&nbsp; ₹${item.pricePerKg}/kg</small>
                </div>
                <span class="checkout-item-price">₹${item.price.toFixed(2)}</span>
            </div>`;
    });

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

    document.getElementById('orderProductIcon').textContent = cartItems.length > 1 ? '🛒' : firstItem.icon;
    document.getElementById('orderSummary').innerHTML       = summaryHTML;
    document.getElementById('finalAmount').textContent      = '₹' + grandTotal.toFixed(2);
    document.getElementById('payButtonAmount').textContent  = '₹' + grandTotal.toFixed(2);
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
            <div class="cart-item-icon">${item.icon}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.productName}</div>
                <div class="cart-item-meta">${item.quantity} × ${item.weight}</div>
            </div>
            <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
            <button class="cart-item-remove" onclick="removeCartItem(${idx})">
                <i class="fas fa-trash"></i>
            </button>`;
        listEl.appendChild(div);
    });
    subEl.textContent = '₹' + subtotal.toFixed(2);
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

// ─── RAZORPAY — via Orders API (tracked in dashboard) ────────────────────────
function initiateRazorpayPayment(customerDetails) {
    const description = currentOrderDetails.isCartOrder
        ? `Cart Order (${cartItems.length} item${cartItems.length > 1 ? 's' : ''})`
        : `Order for ${currentProduct.name}`;

    const amount = currentOrderDetails.total;

    // Show loading spinner
    document.getElementById('processingIndicator').style.display = 'block';

    // Step 1: Create order via Google Apps Script (uses Razorpay Orders API)
    fetch(CONFIG.webhookUrl, {
        method:  'POST',
        mode:    'no-cors', // use no-cors to avoid CORS errors
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ type: 'create_order', amount })
    })
    .then(() => {
        // no-cors returns opaque response — call GAS via GET with params instead
        return fetch(CONFIG.webhookUrl + '?type=create_order&amount=' + amount);
    })
    .then(r => r.json())
    .then(order => {
        document.getElementById('processingIndicator').style.display = 'none';
        if (order.status === 'ok' && order.orderId) {
            openRazorpayWithOrder(order, description, customerDetails);
        } else {
            // Fallback to direct if order creation fails
            openRazorpayDirect(description, customerDetails);
        }
    })
    .catch(() => {
        document.getElementById('processingIndicator').style.display = 'none';
        openRazorpayDirect(description, customerDetails);
    });
}

// Open Razorpay WITH order_id (appears in dashboard Orders tab)
function openRazorpayWithOrder(order, description, customerDetails) {
    const options = {
        key:      order.keyId || CONFIG.razorpayKey,
        amount:   order.amount,
        currency: order.currency || 'INR',
        order_id: order.orderId,  // ← this is what makes it appear in dashboard
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
    const rzp = new Razorpay(options);
    rzp.on('payment.failed', r => { alert('Payment failed. Please try again.'); });
    rzp.open();
}

// Fallback — direct Razorpay (still works, proven)
function openRazorpayDirect(description, customerDetails) {
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
            pin:      customerDetails.pin
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
    const rzp = new Razorpay(options);
    rzp.on('payment.failed', r => { alert('Payment failed. Please try again.'); });
    rzp.open();
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

    const orderData = {
        orderId,
        paymentId:      response.razorpay_payment_id,
        product:        productSummary,
        icon:           currentOrderDetails.isCartOrder ? '🛒' : currentProduct.icon,
        weight:         weightText,
        quantity:       currentOrderDetails.quantity,
        pricePerKg:     currentOrderDetails.isCartOrder ? 'Multiple' : currentProduct.price,
        amount:         currentOrderDetails.total,
        customerDetails,
        timestamp:      new Date().toISOString(),
        stockRemaining: remaining
    };

    sendOrderToServer(orderData);

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

// ─── SINGLE ORDER NOTIFICATION (saves to sheet ONCE + sends email ONCE) ───────
function sendOrderToServer(orderData) {
    const d = orderData;

    fetch(CONFIG.webhookUrl, {
        method: 'POST',
        mode:   'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type:           'order_complete',
            orderId:        d.orderId,
            paymentId:      d.paymentId,
            customerName:   d.customerDetails.name,
            customerPhone:  d.customerDetails.phone,
            product:        d.product,
            quantity:       d.quantity,
            weight:         d.weight,
            pricePerKg:     d.pricePerKg,
            amount:         d.amount.toFixed(2),
            address:        d.customerDetails.address,
            landmark:       d.customerDetails.landmark || '',
            pin:            d.customerDetails.pin,
            stockRemaining: d.stockRemaining,
            timestamp:      d.timestamp
        })
    })
    .then(() => console.log('✅ Order sent to server'))
    .catch(e  => console.error('❌ Server error:', e));
}

// ─── MODALS ───────────────────────────────────────────────────────────────────
function showSuccessModal(orderId, customerDetails) {
    document.getElementById('orderId').textContent        = orderId;
    document.getElementById('confirmedPhone').textContent = '+91 ' + customerDetails.phone;
    document.getElementById('overlay').style.display       = 'block';
    document.getElementById('successModal').style.display  = 'block';
}
function closeModal() {
    document.getElementById('overlay').style.display      = 'none';
    document.getElementById('successModal').style.display = 'none';
    cartItems = []; cartCount = 0;
    document.getElementById('cartCount').textContent = 0;
    showMainPage();
    document.getElementById('paymentForm').reset();
    document.getElementById('deliveryPin').value = currentUserPin;
}

// ─── POPSTATE (browser back button) ──────────────────────────────────────────
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