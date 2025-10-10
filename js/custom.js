// script.js - Fresh Fish Market E-Commerce with Razorpay & FREE WhatsApp Notifications

// Configuration
const CONFIG = {
    validPinCodes: ['712503', '712502', '712148'],
    bannerStartHour: 14, // 2:00 PM in 24-hour format
    sessionStorageKey: 'userPinCode',
    
    // Razorpay Configuration
    razorpayKey: 'rzp_live_RRtsemTmyPcpeX',
    businessName: 'Fresh Fish Market',
    businessDescription: 'Premium Quality Fish Delivery',
    businessLogo: '',
    
    // WhatsApp Configuration (Your Business Number)
    whatsapp: {
        adminPhone: '7890152617', // Your business number (10 digits, no +91)
        enableNotifications: true
    }   
};

// Fish products data with detailed information
const products = [
    { 
        id: 1, 
        name: 'Rohu Fish', 
        price: 1, 
        description: 'Fresh water fish, rich in omega-3', 
        icon: '🐟',
        longDescription: 'Rohu is one of the most popular freshwater fish in Bengali cuisine. Known for its tender meat and mild flavor.',
        origin: 'Freshwater ponds and rivers of West Bengal',
        bestFor: 'Bengali curry, Rohu Kalia, Fish fry',
        calories: '97',
        protein: '16.4g',
        fat: '1.4g',
        omega3: '0.6g',
        calcium: '45mg',
        iron: '1.2mg'
    },
    { 
        id: 2, 
        name: 'Katla Fish', 
        price: 320, 
        description: 'Large freshwater fish, perfect for curry', 
        icon: '🐠',
        longDescription: 'Katla is a prized freshwater fish known for its large size and rich taste.',
        origin: 'Local fish farms and rivers',
        bestFor: 'Katla Kalia, Macher Jhol, Steam preparations',
        calories: '111',
        protein: '17.8g',
        fat: '2.3g',
        omega3: '0.8g',
        calcium: '60mg',
        iron: '1.5mg'
    },
    { 
        id: 3, 
        name: 'Hilsa Fish', 
        price: 1140, 
        description: 'Premium Bengali delicacy', 
        icon: '🐟',
        longDescription: 'Hilsa (Ilish) is the queen of fish in Bengali cuisine.',
        origin: 'Bay of Bengal and Padma River',
        bestFor: 'Bhapa Ilish, Ilish Paturi, Sorshe Ilish',
        calories: '273',
        protein: '21.8g',
        fat: '19.5g',
        omega3: '2.8g',
        calcium: '180mg',
        iron: '2.1mg'
    },
    { 
        id: 4, 
        name: 'Pomfret', 
        price: 850, 
        description: 'Sea fish with delicate flavor', 
        icon: '🐠',
        longDescription: 'Pomfret is a premium sea fish with soft, white flesh and minimal bones.',
        origin: 'Arabian Sea and Bay of Bengal',
        bestFor: 'Tandoori, Pan fry, Butter garlic preparations',
        calories: '96',
        protein: '19g',
        fat: '1.7g',
        omega3: '1.1g',
        calcium: '80mg',
        iron: '0.9mg'
    },
    { 
        id: 5, 
        name: 'Prawns', 
        price: 450, 
        description: 'Fresh tiger prawns', 
        icon: '🦐',
        longDescription: 'Large tiger prawns are succulent and sweet.',
        origin: 'Coastal waters of Bay of Bengal',
        bestFor: 'Prawn curry, Tandoori prawns, Stir fry',
        calories: '85',
        protein: '20g',
        fat: '0.5g',
        omega3: '0.3g',
        calcium: '70mg',
        iron: '0.5mg'
    },
    { 
        id: 6, 
        name: 'Salmon', 
        price: 1850, 
        description: 'Imported Atlantic salmon', 
        icon: '🐟',
        longDescription: 'Premium Atlantic salmon is rich in omega-3 fatty acids.',
        origin: 'Imported from Norway/Scotland',
        bestFor: 'Grilled, Sushi, Teriyaki, Pan-seared',
        calories: '208',
        protein: '20g',
        fat: '13.4g',
        omega3: '3.5g',
        calcium: '12mg',
        iron: '0.8mg'
    },
    { 
        id: 7, 
        name: 'Tilapia', 
        price: 180, 
        description: 'Farm fresh tilapia', 
        icon: '🐠',
        longDescription: 'Tilapia is a mild-flavored, lean fish that is versatile and budget-friendly.',
        origin: 'Local aquaculture farms',
        bestFor: 'Fish fry, Curry, Grilled preparations',
        calories: '96',
        protein: '20.1g',
        fat: '1.7g',
        omega3: '0.2g',
        calcium: '10mg',
        iron: '0.6mg'
    },
    { 
        id: 8, 
        name: 'Sea Bass', 
        price: 680, 
        description: 'Premium sea bass', 
        icon: '🐟',
        longDescription: 'Sea bass has firm, white flesh with a mild, delicate flavor.',
        origin: 'Deep sea waters',
        bestFor: 'Steamed, Grilled, Baked preparations',
        calories: '124',
        protein: '23.6g',
        fat: '2.6g',
        omega3: '1.5g',
        calcium: '92mg',
        iron: '1.1mg'
    },
    { 
        id: 9, 
        name: 'Crab', 
        price: 750, 
        description: 'Fresh mud crabs', 
        icon: '🦀',
        longDescription: 'Fresh mud crabs are sweet and succulent.',
        origin: 'Mangrove areas and coastal regions',
        bestFor: 'Crab curry, Butter garlic crab, Crab cakes',
        calories: '87',
        protein: '18.1g',
        fat: '1.1g',
        omega3: '0.4g',
        calcium: '89mg',
        iron: '0.7mg'
    },
    { 
        id: 10, 
        name: 'Lobster', 
        price: 2850, 
        description: 'Live lobster', 
        icon: '🦞',
        longDescription: 'Premium live lobster is the ultimate luxury seafood.',
        origin: 'Deep sea waters',
        bestFor: 'Thermidor, Grilled, Butter preparations',
        calories: '90',
        protein: '19g',
        fat: '0.9g',
        omega3: '0.2g',
        calcium: '96mg',
        iron: '0.3mg'
    },
    { 
        id: 11, 
        name: 'Surmai', 
        price: 920, 
        description: 'King fish steaks', 
        icon: '🐟',
        longDescription: 'Surmai (King Fish) is a popular sea fish with firm texture.',
        origin: 'Arabian Sea and Bay of Bengal',
        bestFor: 'Fish steaks, Tandoori, Pan fry',
        calories: '139',
        protein: '22g',
        fat: '5.2g',
        omega3: '1.8g',
        calcium: '34mg',
        iron: '1.7mg'
    },
    { 
        id: 12, 
        name: 'Bangda', 
        price: 280, 
        description: 'Indian mackerel', 
        icon: '🐠',
        longDescription: 'Bangda (Indian Mackerel) is an oily fish with strong flavor.',
        origin: 'Coastal waters of India',
        bestFor: 'Rava fry, Curry, Recheado preparations',
        calories: '205',
        protein: '18.6g',
        fat: '13.9g',
        omega3: '2.6g',
        calcium: '12mg',
        iron: '1.6mg'
    }
];

// Global variables
let currentProduct = null;
let cartCount = 0;
let currentUserPin = '';
let cartItems = [];
let currentOrderDetails = null;

// Initialize the application
function init() {
    // Check if user has a stored PIN in session
    const storedPin = sessionStorage.getItem(CONFIG.sessionStorageKey);
    
    if (storedPin && CONFIG.validPinCodes.includes(storedPin)) {
        // User has valid PIN stored, skip modal
        currentUserPin = storedPin;
        document.getElementById('currentPin').textContent = 'PIN: ' + storedPin;
        document.getElementById('deliveryPin').value = storedPin;
        document.getElementById('pinModal').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
        loadProducts();
    } else {
        // No valid PIN stored, show modal
        document.getElementById('pinModal').style.display = 'block';
        document.getElementById('mainPage').style.display = 'none';
    }
    
    // Check time for banner
    checkTimeAndShowBanner();
    
    // Check every minute for time update
    setInterval(checkTimeAndShowBanner, 60000);
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup payment method toggle
    setupPaymentMethodToggle();
    
    // Request notification permission on load
    requestNotificationPermission();
}

// Request browser notification permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('✅ Notification permission granted');
            }
        });
    }
}

// Setup all event listeners
function setupEventListeners() {
    // PIN code input handler
    const pinInput = document.getElementById('pinCodeInput');
    if (pinInput) {
        pinInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verifyPinCode();
            }
        });
        
        pinInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^\d]/g, '');
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
            }
        });
    }
    
    // Phone number input handler
    const phoneInput = document.getElementById('customerPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^\d]/g, '');
            if (this.value.length === 10) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
            } else {
                this.classList.remove('is-valid');
            }
        });
    }
    
    // Weight selection handlers
    const weightInputs = document.querySelectorAll('input[name="weight"]');
    weightInputs.forEach(input => {
        input.addEventListener('change', calculateTotal);
    });
    
    // Quantity input handler
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('input', calculateTotal);
    }
}

// Check time and show/hide banner
function checkTimeAndShowBanner() {
    const now = new Date();
    const hours = now.getHours();
    
    // Show banner after 2:00 PM (14:00)
    if (hours >= CONFIG.bannerStartHour) {
        document.getElementById('deliveryBanner').style.display = 'block';
        document.getElementById('navbar').classList.add('with-banner');
    } else {
        document.getElementById('deliveryBanner').style.display = 'none';
        document.getElementById('navbar').classList.remove('with-banner');
    }
}

// Verify PIN code
function verifyPinCode() {
    const pinInput = document.getElementById('pinCodeInput');
    const pin = pinInput.value.trim();
    
    // Validate PIN format
    if (pin.length !== 6 || !/^\d{6}$/.test(pin)) {
        pinInput.classList.add('error-shake', 'is-invalid');
        setTimeout(() => {
            pinInput.classList.remove('error-shake');
        }, 500);
        return;
    }
    
    // Check if PIN is valid
    if (CONFIG.validPinCodes.includes(pin)) {
        // Store PIN in sessionStorage
        sessionStorage.setItem(CONFIG.sessionStorageKey, pin);
        currentUserPin = pin;
        
        // Update UI
        document.getElementById('currentPin').textContent = 'PIN: ' + pin;
        document.getElementById('deliveryPin').value = pin;
        document.getElementById('pinModal').style.display = 'none';
        document.getElementById('mainPage').style.display = 'block';
        
        // Load products
        loadProducts();
    } else {
        // Invalid PIN - show error modal
        document.getElementById('pinModal').style.display = 'none';
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('notAvailableModal').style.display = 'block';
    }
}

// Retry PIN code entry
function retryPinCode() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('notAvailableModal').style.display = 'none';
    document.getElementById('pinModal').style.display = 'block';
    document.getElementById('pinCodeInput').value = '';
    document.getElementById('pinCodeInput').classList.remove('is-invalid');
}

// Change PIN code (clear session and show modal)
function changePinCode() {
    // Clear session storage
    sessionStorage.removeItem(CONFIG.sessionStorageKey);
    currentUserPin = '';
    
    // Hide all pages
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('detailPage').style.display = 'none';
    document.getElementById('paymentPage').style.display = 'none';
    
    // Show PIN modal
    retryPinCode();
}

// Load products on main page
function loadProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    products.forEach(product => {
        const card = createProductCard(product);
        container.innerHTML += card;
    });
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="col-md-3 col-sm-6">
            <div class="product-card">
                <div class="badge-fresh">Fresh Daily</div>
                <div class="product-image">
                    <span style="font-size: 4rem;">${product.icon}</span>
                </div>
                <div class="card-body p-3">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="text-muted small">${product.description}</p>
                    <div class="price-tag mb-3">₹${product.price} per kg</div>
                    <button class="btn btn-add-cart w-100" onclick="showDetail(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Show main page
function showMainPage() {
    document.getElementById('mainPage').style.display = 'block';
    document.getElementById('detailPage').style.display = 'none';
    document.getElementById('paymentPage').style.display = 'none';
}

// Show product detail
function showDetail(productId) {
    currentProduct = products.find(p => p.id === productId);
    
    if (!currentProduct) return;
    
    // Update UI
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('detailPage').style.display = 'block';
    document.getElementById('paymentPage').style.display = 'none';
    
    // Update product details
    document.getElementById('detailName').textContent = currentProduct.name;
    document.getElementById('detailDescription').textContent = currentProduct.description;
    document.getElementById('detailPrice').textContent = `₹${currentProduct.price} per kg`;
    document.getElementById('detailImage').innerHTML = `<span style="font-size: 8rem;">${currentProduct.icon}</span>`;
    
    // Update description tab
    document.getElementById('detailLongDescription').textContent = currentProduct.longDescription;
    document.getElementById('detailOrigin').textContent = currentProduct.origin;
    document.getElementById('detailBestFor').textContent = currentProduct.bestFor;
    
    // Update nutritional info tab
    document.getElementById('detailCalories').textContent = currentProduct.calories + ' kcal';
    document.getElementById('detailProtein').textContent = currentProduct.protein;
    document.getElementById('detailFat').textContent = currentProduct.fat;
    document.getElementById('detailOmega3').textContent = currentProduct.omega3;
    document.getElementById('detailCalcium').textContent = currentProduct.calcium;
    document.getElementById('detailIron').textContent = currentProduct.iron;
    
    // Reset quantity and calculate total
    document.getElementById('quantity').value = 1;
    document.getElementById('weight500').checked = true;
    calculateTotal();
}

// Increase quantity
function increaseQuantity() {
    const input = document.getElementById('quantity');
    input.value = parseInt(input.value) + 1;
    calculateTotal();
}

// Decrease quantity
function decreaseQuantity() {
    const input = document.getElementById('quantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        calculateTotal();
    }
}

// Calculate total price
function calculateTotal() {
    if (!currentProduct) return;
    
    const weightElement = document.querySelector('input[name="weight"]:checked');
    const quantityElement = document.getElementById('quantity');
    
    if (!weightElement || !quantityElement) return;
    
    const weight = parseInt(weightElement.value);
    const quantity = parseInt(quantityElement.value) || 1;
    const pricePerKg = currentProduct.price;
    const weightInKg = weight / 1000;
    const total = pricePerKg * weightInKg * quantity;
    
    document.getElementById('totalPrice').textContent = `₹${total.toFixed(2)}`;
}

// Proceed to payment
function proceedToPayment() {
    if (!currentProduct) return;
    
    const weight = document.querySelector('input[name="weight"]:checked').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const pricePerKg = currentProduct.price;
    const weightInKg = weight / 1000;
    const total = pricePerKg * weightInKg * quantity;
    
    // Store current order details
    currentOrderDetails = {
        product: currentProduct,
        weight: weight,
        quantity: quantity,
        total: total
    };
    
    // Add to cart items
    const weightText = weight >= 1000 ? `${weight/1000}kg` : `${weight}g`;
    cartItems.push({
        productName: currentProduct.name,
        quantity: quantity,
        weight: weightText,
        price: total
    });
    
    // Update UI
    document.getElementById('detailPage').style.display = 'none';
    document.getElementById('paymentPage').style.display = 'block';
    
    // Update order summary
    document.getElementById('orderSummary').innerHTML = `
        <strong>${currentProduct.name}</strong><br>
        Quantity: ${quantity} x ${weightText}<br>
        Rate: ₹${pricePerKg} per kg
    `;
    document.getElementById('finalAmount').textContent = `₹${total.toFixed(2)}`;
    document.getElementById('payButtonAmount').textContent = `₹${total.toFixed(2)}`;
    
    // Update cart count
    cartCount++;
    document.getElementById('cartCount').textContent = cartCount;
    
    // Set delivery PIN
    document.getElementById('deliveryPin').value = currentUserPin;
}

// Go back to detail page from payment
function backToDetail() {
    if (currentOrderDetails && currentProduct) {
        document.getElementById('paymentPage').style.display = 'none';
        document.getElementById('detailPage').style.display = 'block';
        
        // Restore previous selection
        const weight = currentOrderDetails.weight;
        document.getElementById(`weight${weight}`).checked = true;
        document.getElementById('quantity').value = currentOrderDetails.quantity;
        calculateTotal();
    } else {
        showMainPage();
    }
}

// Setup payment method toggle
function setupPaymentMethodToggle() {
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const onlineInfo = document.getElementById('onlinePaymentInfo');
            const codInfo = document.getElementById('codPaymentInfo');
            
            if (this.value === 'online') {
                onlineInfo.style.display = 'block';
                codInfo.style.display = 'none';
            } else {
                onlineInfo.style.display = 'none';
                codInfo.style.display = 'block';
            }
        });
    });
}

// Process payment (Razorpay or COD)
function processPayment() {
    const form = document.getElementById('paymentForm');
    const nameInput = document.getElementById('customerName');
    const phoneInput = document.getElementById('customerPhone');
    const addressInput = document.getElementById('customerAddress');
    const landmarkInput = document.getElementById('customerLandmark');
    
    let isValid = true;
    
    // Validate all required fields
    [nameInput, phoneInput, addressInput].forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    // Validate phone number (10 digits)
    if (phoneInput.value.length !== 10) {
        isValid = false;
        phoneInput.classList.add('is-invalid');
    }
    
    if (!isValid) {
        alert('Please fill all required fields correctly');
        return;
    }
    
    // Get customer details
    const customerDetails = {
        name: nameInput.value,
        phone: phoneInput.value,
        address: addressInput.value,
        landmark: landmarkInput.value || '',
        pin: currentUserPin
    };
    
    // Check payment method
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (paymentMethod === 'online') {
        // Process Razorpay payment
        initiateRazorpayPayment(customerDetails);
    } else {
        // Process COD
        processCODOrder(customerDetails);
    }
}

// Initialize Razorpay payment
function initiateRazorpayPayment(customerDetails) {
    const amount = currentOrderDetails.total * 100; // Razorpay expects amount in paise
    
    const options = {
        key: CONFIG.razorpayKey,
        amount: amount,
        currency: 'INR',
        name: CONFIG.businessName,
        description: `Order for ${currentProduct.name}`,
        image: CONFIG.businessLogo,
        handler: function(response) {
            // Payment successful
            handlePaymentSuccess(response, customerDetails);
        },
        prefill: {
            name: customerDetails.name,
            contact: customerDetails.phone
        },
        notes: {
            product: currentProduct.name,
            weight: currentOrderDetails.weight + 'g',
            quantity: currentOrderDetails.quantity,
            address: customerDetails.address,
            landmark: customerDetails.landmark,
            pin: customerDetails.pin
        },
        theme: {
            color: '#667eea'
        },
        modal: {
            ondismiss: function() {
                console.log('Payment cancelled by user');
            }
        }
    };
    
    // Check if Razorpay is loaded
    if (typeof Razorpay !== 'undefined') {
        const rzp = new Razorpay(options);
        
        rzp.on('payment.failed', function(response) {
            alert('Payment failed. Please try again.');
            console.error('Payment failed:', response.error);
        });
        
        rzp.open();
    } else {
        alert('Payment gateway is not loaded. Please refresh the page and try again.');
    }
}

// Handle successful Razorpay payment
function handlePaymentSuccess(response, customerDetails) {
    // Show processing indicator
    document.getElementById('processingIndicator').style.display = 'block';
    
    // Generate order ID
    const orderId = 'ORD' + Date.now();
    
    // Store order details
    const orderData = {
        orderId: orderId,
        paymentId: response.razorpay_payment_id,
        product: currentProduct.name,
        amount: currentOrderDetails.total,
        customerDetails: customerDetails,
        timestamp: new Date().toISOString(),
        paymentMethod: 'Online Payment'
    };
    
    console.log('Order successful:', orderData);
    
    // Send WhatsApp notifications
    sendWhatsAppNotifications(orderData);
    
    // Hide processing indicator after 2 seconds
    setTimeout(() => {
        document.getElementById('processingIndicator').style.display = 'none';
        showSuccessModal(orderId, 'online', customerDetails);
    }, 2000);
}

// Process Cash on Delivery order
function processCODOrder(customerDetails) {
    // Show processing indicator
    document.getElementById('processingIndicator').style.display = 'block';
    
    // Generate order ID
    const orderId = 'COD' + Date.now();
    
    // Store order details
    const orderData = {
        orderId: orderId,
        product: currentProduct.name,
        amount: currentOrderDetails.total,
        customerDetails: customerDetails,
        timestamp: new Date().toISOString(),
        paymentMethod: 'Cash on Delivery'
    };
    
    console.log('COD Order placed:', orderData);
    
    // Send WhatsApp notifications
    sendWhatsAppNotifications(orderData);
    
    // Hide processing indicator after 2 seconds
    setTimeout(() => {
        document.getElementById('processingIndicator').style.display = 'none';
        showSuccessModal(orderId, 'cod', customerDetails);
    }, 2000);
}

// Send WhatsApp notifications (FREE - No API)

// Send order notification to Google Sheets
function sendWhatsAppNotifications(orderData) {
    const weight = currentOrderDetails.weight >= 1000 ? 
                   `${currentOrderDetails.weight/1000}kg` : 
                   `${currentOrderDetails.weight}g`;
    const quantity = currentOrderDetails.quantity;
    
    // Google Apps Script Web App URL
    const webhookUrl = 'https://script.google.com/macros/s/AKfycbykBg2S8bAVejZQxTZT-2nK3XiFkHAAh7EgM0hNSkghRa9-tXDnNsgj07fC2WG3ykRp/exec'; // Paste the URL you copied
    
    // Send order data to Google Sheets
    fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orderId: orderData.orderId,
            customerName: orderData.customerDetails.name,
            customerPhone: orderData.customerDetails.phone,
            product: orderData.product,
            amount: orderData.amount.toFixed(2),
            address: orderData.customerDetails.address,
            landmark: orderData.customerDetails.landmark || '',
            pin: orderData.customerDetails.pin,
            paymentMethod: orderData.paymentMethod,
            paymentId: orderData.paymentId || '',
            timestamp: new Date().toISOString()
        })
    })
    .then(() => {
        console.log('✅ Order sent to Google Sheets & Email notification sent!');
    })
    .catch(error => {
        console.error('❌ Error:', error);
    });
}

// Send order notification to your email (FREE backup)
function sendOrderEmail(orderData, whatsappLink) {
    const subject = `New Order ${orderData.orderId} - ${orderData.customerDetails.name}`;
    const body = `
New Order Received!

Order ID: ${orderData.orderId}
Customer: ${orderData.customerDetails.name}
Phone: +91${orderData.customerDetails.phone}
Product: ${orderData.product}
Amount: ₹${orderData.amount}

Address:
${orderData.customerDetails.address}
${orderData.customerDetails.landmark}
PIN: ${orderData.customerDetails.pin}

Payment: ${orderData.paymentMethod}

Click to send WhatsApp:
${whatsappLink}
    `;
    
    const mailtoLink = `mailto:your-email@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Silent email trigger
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => link.remove(), 100);
}

// Send to FREE webhook for automatic notifications
function sendToWebhook(orderData, adminMessage, customerMessage) {
    // Using Make.com (formerly Integromat) - 1000 free operations/month
    const webhookUrl = 'YOUR_MAKE_WEBHOOK_URL'; // Add your webhook URL here
    
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orderId: orderData.orderId,
            customerName: orderData.customerDetails.name,
            customerPhone: orderData.customerDetails.phone,
            product: orderData.product,
            amount: orderData.amount,
            address: orderData.customerDetails.address,
            landmark: orderData.customerDetails.landmark,
            pin: orderData.customerDetails.pin,
            paymentMethod: orderData.paymentMethod,
            paymentId: orderData.paymentId || '',
            adminPhone: CONFIG.whatsapp.adminPhone,
            adminMessage: adminMessage,
            customerMessage: customerMessage,
            timestamp: orderData.timestamp
        })
    })
    .then(response => {
        console.log('✅ Webhook notification sent');
    })
    .catch(error => {
        console.error('❌ Webhook failed:', error);
    });
}

// Play notification sound
function playNotificationSound() {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSx+zPDTgi0HHm7A7+OZSA0PVq/m77BdGAg+ltryxnMpBSh8yvHZjDoJF2S56+adUBALTqXh8bllHAU2j9XyzncsBS1+zPDTgjAHG2u+7uSaSwwOUqvm7q9aFgo9ldjxw3ElBSp6yPHaizYKGGO26+WcTw8KTKHf8rtlGwU0jdPyz3YqBS1+y/HYjTwIF2i76+OaTAoPVavl7bBcGQc9lt3yxHIoBSl6x/HZizUKGGG26+ScUBEJTKLi8rxjHAU2kdbyz3QpBSx+y/HYizYKF2S66+WVVBENXK/j8LxfHQc6ltzywnQqByl5yPDXiTkJGGC26+OaTQ4KTaXh8rpoHQY1j9TyznUrBSx9y/HYjDYKGGO76eWcTQ8LTaHg8MZjGwU1k9Xxz3ImBCh5yPHaizULF2S56+WaTxAJTqHi8rhlHQU1j9TyznYrBSx9y/HYjDYKGGO76eWcTQ8LTaHg8MZjGwU1k9Xxz3ImBCh5yPHaizULF2S56+WaTxAJTqHi8rhlHQU1j9TyznYrBSx9y/HYjDYKGGO76eWcTQ8LTaHg8MZjGwU1k9Xxz3ImBCh5yPHaizULF2S56+WaTxAJTqHi8rhlHQU1j9TyznYrBSx9y/HYjDYKGGO76eWcTQ8LTaHg8MZjGwU1k9Xxz3ImBCh5yPHaizULF2S56+WaTxAJTqHi8rhlHQU1j9TyznYrBSx9y/HYjDYKGGO76eWcTQ8LTaHg8MZjGwU1k9Xxz3ImBCh5yPHaizULF2S56+WaTxAJTqHi8rhlHQU1j9TyznYrBSx9y/HYjDYKGGO76eWcTQ8LTaHg8MZjGwU1k9Xxz3ImBCh5yPHaizULF2S56+WaTxAJTqHi8rhlHQU1j9TyznYrBSx9y/HYjDYKGGO76eWcTQ8LTaHg8MZjGwU1k9Xxz3ImBCh5yPHaizULF2S56+WaTxAJTqHi8rhlHQU1j9TyznYrBSx9y/HYjDYKGGO76eWcTQ8LTaHg8MZjGwU1k9Xxz3ImBCh5yPHaizULF2S56+WaTxAJTqHi8rhlHQU1j9TyznYrBSx9y/HYjDYKGGO76eWcTQ8LTaHg8MZjGwU1k9Xxz3ImBCh5yPHaizULF2S56+WaTxAJTqHi8rhlHQU1j9TyznYrBSx9y/HYjDYKGGO76eWcTQ8LTaHg8MZjGwU1k9Xxz3ImBCh5yPHaizULF2S56+WaTxAJTqHi8rhlHQU1j9TyznYrBSx9y/HYjDYKGGO76eWcTQ8LTaHg8MZjGwU=');
    audio.play().catch(e => console.log('Sound play failed:', e));
}

// Show admin notification card
function showAdminNotificationCard(orderId, customerName, amount, product, adminLink, customerLink) {
    const notificationDiv = document.createElement('div');
    notificationDiv.id = 'adminOrderNotification';
    notificationDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 380px;
        animation: slideInRight 0.5s ease-out, pulse 2s infinite;
        box-shadow: 0 8px 30px rgba(0,255,0,0.3);
    `;
    
    notificationDiv.innerHTML = `
        <div class="card border-success" style="border-width: 3px; background: linear-gradient(135deg, #ffffff 0%, #f0fff4 100%);">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5 class="text-success mb-0 fw-bold">
                        <i class="fas fa-bell fa-shake"></i> NEW ORDER!
                    </h5>
                    <button type="button" class="btn-close" onclick="document.getElementById('adminOrderNotification').remove()"></button>
                </div>
                <hr class="my-2 border-success">
                
                <div class="mb-2">
                    <small class="text-muted">Order ID</small>
                    <p class="mb-1 fw-bold">${orderId}</p>
                </div>
                
                <div class="mb-2">
                    <small class="text-muted">Customer</small>
                    <p class="mb-1 fw-bold">${customerName}</p>
                </div>
                
                <div class="mb-2">
                    <small class="text-muted">Product</small>
                    <p class="mb-1">${product}</p>
                </div>
                
                <div class="mb-3">
                    <small class="text-muted">Amount</small>
                    <h4 class="mb-0 text-success">₹${amount}</h4>
                </div>
                
                <div class="d-grid gap-2">
                    <a href="${adminLink}" target="_blank" class="btn btn-success btn-lg">
                        <i class="fab fa-whatsapp fa-lg"></i> View Full Order Details
                    </a>
                    <a href="${customerLink}" target="_blank" class="btn btn-outline-success">
                        <i class="fab fa-whatsapp"></i> Send Confirmation to Customer
                    </a>
                </div>
                
                <div class="alert alert-light mt-2 mb-0 py-2 small text-center">
                    <i class="fas fa-info-circle text-primary"></i> Click button to open WhatsApp with order details
                </div>
            </div>
        </div>
    `;
    
    // Add animations
    if (!document.getElementById('notificationAnimations')) {
        const style = document.createElement('style');
        style.id = 'notificationAnimations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes pulse {
                0%, 100% { box-shadow: 0 8px 30px rgba(0,255,0,0.3); }
                50% { box-shadow: 0 8px 40px rgba(0,255,0,0.6); }
            }
            .fa-shake {
                animation: shake 0.5s infinite;
            }
            @keyframes shake {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-10deg); }
                75% { transform: rotate(10deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notificationDiv);
    
    // Keep notification until clicked (don't auto-remove)
    console.log('✅ Admin notification displayed!');
}

// Show success modal
// Show success modal (Clean - no WhatsApp mention)
function showSuccessModal(orderId, paymentType, customerDetails) {
    document.getElementById('orderId').textContent = orderId;
    document.getElementById('confirmedPhone').textContent = '+91 ' + customerDetails.phone;
    
    // Simple success message
    const successModal = document.getElementById('successModal');
    successModal.querySelector('h3').textContent = '✅ Order Placed Successfully!';
    successModal.querySelector('.lead').textContent = 'Thank you for your order!';
    
    // Show modal
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('successModal').style.display = 'block';
}

// Close success modal
function closeModal() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('successModal').style.display = 'none';
    showMainPage();
    
    // Reset form
    document.getElementById('paymentForm').reset();
    document.getElementById('deliveryPin').value = currentUserPin;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Export functions for global access (used by onclick handlers)
window.verifyPinCode = verifyPinCode;
window.retryPinCode = retryPinCode;
window.changePinCode = changePinCode;
window.showMainPage = showMainPage;
window.showDetail = showDetail;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.proceedToPayment = proceedToPayment;
window.processPayment = processPayment;
window.closeModal = closeModal;
window.backToDetail = backToDetail;