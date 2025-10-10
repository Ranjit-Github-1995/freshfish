// script.js - Fresh Fish Market E-Commerce with Razorpay, Email & SMS Integration

// Configuration
const CONFIG = {
    validPinCodes: ['712503', '712502', '712148'],
    bannerStartHour: 14, // 2:00 PM in 24-hour format
    sessionStorageKey: 'userPinCode',
    
    // Razorpay Configuration - YOUR ACTUAL TEST KEYS
    razorpayKey: 'rzp_test_RQGKJzcpBu5zOY', // Your Razorpay Test Key ID
    businessName: 'Fresh Fish Market',
    businessDescription: 'Premium Quality Fish Delivery',
    businessLogo: '', // Optional: Add your business logo URL
    
    // Email Configuration - Gmail with EmailJS (UPDATE WITH YOUR KEYS)
    emailjs: {
        serviceId: 'service_g5o4cra',     // Your Gmail service ID from EmailJS
        templateId: 'template_jg1gd9w',   // Your template ID from EmailJS
        publicKey: 'URnmrhpzGQxp3Gv-r'    // PASTE YOUR PUBLIC KEY HERE
        // Note: NEVER put your Private Key in frontend code - it's only for server-side
    },
    
    // WhatsApp Configuration (No API needed)
    whatsapp: {
        businessNumber: '917890152617', // Added 91 prefix
        enableCustomerNotification: true,
        enableBusinessNotification: true
    }   
};

// Fish products data with detailed information
const products = [
    { 
        id: 1, 
        name: 'Rohu Fish', 
        price: 280, 
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

// Initialize EmailJS
function initializeEmailJS() {
    if (typeof emailjs !== 'undefined' && CONFIG.emailjs.publicKey !== 'URnmrhpzGQxp3Gv-r') {
        emailjs.init(CONFIG.emailjs.publicKey);
    }
}

// Initialize the application
function init() {
    // Initialize EmailJS
    initializeEmailJS();
    
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
    
    // Email input handler
    const emailInput = document.getElementById('customerEmail');
    if (emailInput) {
        emailInput.addEventListener('input', function(e) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(this.value)) {
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
    const emailInput = document.getElementById('customerEmail');
    const phoneInput = document.getElementById('customerPhone');
    const addressInput = document.getElementById('customerAddress');
    const landmarkInput = document.getElementById('customerLandmark');
    
    let isValid = true;
    
    // Validate all fields
    [nameInput, emailInput, phoneInput, addressInput].forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.classList.add('is-invalid');
    }
    
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
        email: emailInput.value,
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
            contact: customerDetails.phone,
            email: customerDetails.email
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
        paymentMethod: 'Online'
    };
    
    console.log('Order successful:', orderData);
    
    // Send confirmation email and SMS
    sendConfirmationEmail(orderData);
    sendConfirmationSMS(orderData);
    sendBrowserNotification(orderData);
    
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
        paymentMethod: 'COD'
    };
    
    console.log('COD Order placed:', orderData);
    
    // Send confirmation email and SMS
    sendConfirmationEmail(orderData);
    sendConfirmationSMS(orderData);
    sendBrowserNotification(orderData);
    
    // Hide processing indicator after 2 seconds
    setTimeout(() => {
        document.getElementById('processingIndicator').style.display = 'none';
        showSuccessModal(orderId, 'cod', customerDetails);
    }, 2000);
}

// Send confirmation email
function sendConfirmationEmail(orderData) {
    // Check if EmailJS is configured
    if (typeof emailjs === 'undefined' || CONFIG.emailjs.publicKey === 'URnmrhpzGQxp3Gv-r') {
        console.log('EmailJS not configured. Email would be sent with these details:', {
            to: orderData.customerDetails.email,
            subject: 'Order Confirmation - Fresh Fish Market',
            orderId: orderData.orderId,
            product: orderData.product,
            amount: orderData.amount
        });
        return;
    }
    
    // Prepare email parameters
    const emailParams = {
        to_email: orderData.customerDetails.email,
        to_name: orderData.customerDetails.name,
        order_id: orderData.orderId,
        product_name: orderData.product,
        amount: '₹' + orderData.amount,
        delivery_address: `${orderData.customerDetails.address}, ${orderData.customerDetails.landmark}, PIN: ${orderData.customerDetails.pin}`,
        payment_method: orderData.paymentMethod,
        order_date: new Date().toLocaleDateString(),
        delivery_time: '2-3 hours'
    };
    
    // Send email using EmailJS
    emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, emailParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
        }, function(error) {
            console.error('Email sending failed:', error);
        });
}

// Send confirmation SMS via WhatsApp
function sendConfirmationSMS(orderData) {
    const phone = orderData.customerDetails.phone;
    const name = orderData.customerDetails.name;
    const orderId = orderData.orderId;
    const amount = orderData.amount;
    const product = orderData.product;
    
    // Format message for WhatsApp
    const message = `
*🐟 ORDER CONFIRMATION - Fresh Fish Market*
%0A%0A
Dear ${name},%0A
Thank you for your order!%0A%0A
*Order Details:*%0A
📦 Order ID: ${orderId}%0A
🐠 Product: ${product}%0A
💰 Amount: ₹${amount}%0A
📱 Phone: +91 ${phone}%0A%0A
📍 *Delivery Address:*%0A
${orderData.customerDetails.address}%0A
${orderData.customerDetails.landmark}%0A
PIN: ${orderData.customerDetails.pin}%0A%0A
🚚 Expected Delivery: 2-3 hours%0A%0A
Thank you for shopping with us!%0A
*Fresh Fish Market* 🐟
    `.replace(/\n/g, '%0A');
    
    // Send to CUSTOMER's WhatsApp (Order Confirmation)
    if (CONFIG.whatsapp.enableCustomerNotification) {
        const customerWhatsAppUrl = `https://wa.me/91${phone}?text=${message}`;
        
        // Open WhatsApp in new tab for customer
        setTimeout(() => {
            window.open(customerWhatsAppUrl, '_blank');
            console.log('WhatsApp message opened for customer:', phone);
        }, 1000);
    }
    
    // Send to BUSINESS WhatsApp (New Order Notification)
    if (CONFIG.whatsapp.enableBusinessNotification) {
        const businessMessage = `
*🎉 NEW ORDER RECEIVED!*%0A
━━━━━━━━━━━━━━━━%0A
📦 Order ID: ${orderId}%0A
👤 Customer: ${name}%0A
📱 Phone: +91 ${phone}%0A
📧 Email: ${orderData.customerDetails.email}%0A
━━━━━━━━━━━━━━━━%0A
🐠 Product: ${product}%0A
💰 Amount: ₹${amount}%0A
💳 Payment: ${orderData.paymentMethod}%0A
━━━━━━━━━━━━━━━━%0A
📍 Delivery:%0A
${orderData.customerDetails.address}%0A
${orderData.customerDetails.landmark}%0A
PIN: ${orderData.customerDetails.pin}%0A
━━━━━━━━━━━━━━━━%0A
⏰ ${new Date().toLocaleString()}
        `.replace(/\n/g, '%0A');
        
        const businessWhatsAppUrl = `https://wa.me/${CONFIG.whatsapp.businessNumber}?text=${businessMessage}`;
        
        // Create a notification button for business
        const notificationDiv = document.createElement('div');
        notificationDiv.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;';
        notificationDiv.innerHTML = `
            <a href="${businessWhatsAppUrl}" target="_blank" class="btn btn-success btn-lg shadow">
                <i class="fab fa-whatsapp"></i> View Order in WhatsApp
            </a>
        `;
        document.body.appendChild(notificationDiv);
        
        // Remove after 10 seconds
        setTimeout(() => {
            notificationDiv.remove();
        }, 10000);
    }
    
    console.log('WhatsApp notifications prepared');
}

// Send confirmation email via Gmail (EmailJS)
function sendConfirmationEmail(orderData) {
    // Initialize EmailJS if not already done
    if (typeof emailjs !== 'undefined' && CONFIG.emailjs.publicKey !== 'URnmrhpzGQxp3Gv-r') {
        emailjs.init(CONFIG.emailjs.publicKey);
    } else {
        console.log('EmailJS not configured. Follow setup instructions below.');
        console.log('Email would be sent to:', orderData.customerDetails.email);
        showEmailSetupInstructions();
        return;
    }
    
    // Prepare email parameters
    const emailParams = {
        // To customer
        to_email: orderData.customerDetails.email,
        to_name: orderData.customerDetails.name,
        
        // Order details
        order_id: orderData.orderId,
        product_name: orderData.product,
        amount: '₹' + orderData.amount,
        quantity: currentOrderDetails.quantity,
        weight: currentOrderDetails.weight >= 1000 ? 
                `${currentOrderDetails.weight/1000}kg` : 
                `${currentOrderDetails.weight}g`,
        
        // Customer details
        customer_name: orderData.customerDetails.name,
        customer_phone: orderData.customerDetails.phone,
        customer_email: orderData.customerDetails.email,
        
        // Delivery details
        delivery_address: orderData.customerDetails.address,
        delivery_landmark: orderData.customerDetails.landmark || 'N/A',
        delivery_pin: orderData.customerDetails.pin,
        
        // Payment details
        payment_method: orderData.paymentMethod,
        payment_id: orderData.paymentId || 'N/A',
        
        // Time details
        order_date: new Date().toLocaleDateString(),
        order_time: new Date().toLocaleTimeString(),
        delivery_time: '2-3 hours',
        
        // Business details
        business_name: CONFIG.businessName,
        business_phone: CONFIG.whatsapp.businessNumber.substring(2), // Remove 91
        business_email: 'support@freshfishmarket.com' // Your business email
    };
    
    // Send email using EmailJS
    emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, emailParams)
        .then(function(response) {
            console.log('✅ Email sent successfully:', response);
            showNotification('Email sent to ' + orderData.customerDetails.email, 'success');
        }, function(error) {
            console.error('❌ Email sending failed:', error);
            showNotification('Email sending failed. Please check configuration.', 'error');
        });
}



// Show notification helper
function showNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '10000';
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i> ${message}
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Show success modal
function showSuccessModal(orderId, paymentType, customerDetails) {
    document.getElementById('orderId').textContent = orderId;
    document.getElementById('confirmedEmail').textContent = customerDetails.email;
    document.getElementById('confirmedPhone').textContent = '+91 ' + customerDetails.phone;
    
    // Update success message based on payment type
    const successModal = document.getElementById('successModal');
    if (paymentType === 'cod') {
        successModal.querySelector('h3').textContent = 'Order Placed Successfully!';
        successModal.querySelector('p').textContent = 'Your order has been confirmed for Cash on Delivery.';
    } else {
        successModal.querySelector('h3').textContent = 'Payment Successful!';
        successModal.querySelector('p').textContent = 'Your payment has been received successfully.';
    }
    
    // Show modal
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('successModal').style.display = 'block';
}

// Confirm payment (deprecated - replaced by processPayment)
function confirmPayment() {
    processPayment();
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
window.confirmPayment = confirmPayment;
window.closeModal = closeModal;
window.backToDetail = backToDetail;