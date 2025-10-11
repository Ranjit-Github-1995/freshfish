// script.js - Fresh Fish Market with Razorpay UPI (Auto-Verified)

// Configuration
const CONFIG = {
    validPinCodes: ['712503', '712502', '712148'],
    bannerStartHour: 14,
    sessionStorageKey: 'userPinCode',
    
    // Razorpay Configuration
    razorpayKey: 'rzp_live_RRtsemTmyPcpeX',
    businessName: 'Fresh Fish',
    businessDescription: 'Premium Quality Fish Delivery',
    businessLogo: '',
    
    // WhatsApp Configuration
    whatsapp: {
        adminPhone: '7890152617',
        enableNotifications: true
    }   
};

// Fish products data
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
    setupEventListeners();
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
    
    const weightInputs = document.querySelectorAll('input[name="weight"]');
    weightInputs.forEach(input => {
        input.addEventListener('change', calculateTotal);
    });
    
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('input', calculateTotal);
    }
}

// Check time and show/hide banner
function checkTimeAndShowBanner() {
    const now = new Date();
    const hours = now.getHours();
    
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
    
    if (pin.length !== 6 || !/^\d{6}$/.test(pin)) {
        pinInput.classList.add('error-shake', 'is-invalid');
        setTimeout(() => {
            pinInput.classList.remove('error-shake');
        }, 500);
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

// Change PIN code
function changePinCode() {
    sessionStorage.removeItem(CONFIG.sessionStorageKey);
    currentUserPin = '';
    
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('detailPage').style.display = 'none';
    document.getElementById('paymentPage').style.display = 'none';
    
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
    
    document.getElementById('mainPage').style.display = 'none';
    document.getElementById('detailPage').style.display = 'block';
    document.getElementById('paymentPage').style.display = 'none';
    
    document.getElementById('detailName').textContent = currentProduct.name;
    document.getElementById('detailDescription').textContent = currentProduct.description;
    document.getElementById('detailPrice').textContent = `₹${currentProduct.price} per kg`;
    document.getElementById('detailImage').innerHTML = `<span style="font-size: 8rem;">${currentProduct.icon}</span>`;
    
    document.getElementById('detailLongDescription').textContent = currentProduct.longDescription;
    document.getElementById('detailOrigin').textContent = currentProduct.origin;
    document.getElementById('detailBestFor').textContent = currentProduct.bestFor;
    
    document.getElementById('detailCalories').textContent = currentProduct.calories + ' kcal';
    document.getElementById('detailProtein').textContent = currentProduct.protein;
    document.getElementById('detailFat').textContent = currentProduct.fat;
    document.getElementById('detailOmega3').textContent = currentProduct.omega3;
    document.getElementById('detailCalcium').textContent = currentProduct.calcium;
    document.getElementById('detailIron').textContent = currentProduct.iron;
    
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
    
    currentOrderDetails = {
        product: currentProduct,
        weight: weight,
        quantity: quantity,
        total: total
    };
    
    const weightText = weight >= 1000 ? `${weight/1000}kg` : `${weight}g`;
    cartItems.push({
        productName: currentProduct.name,
        quantity: quantity,
        weight: weightText,
        price: total
    });
    
    document.getElementById('detailPage').style.display = 'none';
    document.getElementById('paymentPage').style.display = 'block';
    
    document.getElementById('orderSummary').innerHTML = `
        <strong>${currentProduct.name}</strong><br>
        Quantity: ${quantity} x ${weightText}<br>
        Rate: ₹${pricePerKg} per kg
    `;
    document.getElementById('finalAmount').textContent = `₹${total.toFixed(2)}`;
    document.getElementById('payButtonAmount').textContent = `₹${total.toFixed(2)}`;
    
    cartCount++;
    document.getElementById('cartCount').textContent = cartCount;
    
    document.getElementById('deliveryPin').value = currentUserPin;
}

// Go back to detail page
function backToDetail() {
    if (currentOrderDetails && currentProduct) {
        document.getElementById('paymentPage').style.display = 'none';
        document.getElementById('detailPage').style.display = 'block';
        
        const weight = currentOrderDetails.weight;
        document.getElementById(`weight${weight}`).checked = true;
        document.getElementById('quantity').value = currentOrderDetails.quantity;
        calculateTotal();
    } else {
        showMainPage();
    }
}

// Process payment (Razorpay with UPI Priority)
function processPayment() {
    const form = document.getElementById('paymentForm');
    const nameInput = document.getElementById('customerName');
    const phoneInput = document.getElementById('customerPhone');
    const addressInput = document.getElementById('customerAddress');
    const landmarkInput = document.getElementById('customerLandmark');
    
    let isValid = true;
    
    [nameInput, phoneInput, addressInput].forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    if (phoneInput.value.length !== 10) {
        isValid = false;
        phoneInput.classList.add('is-invalid');
    }
    
    if (!isValid) {
        alert('Please fill all required fields correctly');
        return;
    }
    
    const customerDetails = {
        name: nameInput.value,
        phone: phoneInput.value,
        address: addressInput.value,
        landmark: landmarkInput.value || '',
        pin: currentUserPin
    };
    
    initiateRazorpayPayment(customerDetails);
}

// Initialize Razorpay payment with UPI as default
function initiateRazorpayPayment(customerDetails) {
    const amount = currentOrderDetails.total * 100;
    
    const options = {
        key: CONFIG.razorpayKey,
        amount: amount,
        currency: 'INR',
        name: CONFIG.businessName,
        description: `Order for ${currentProduct.name}`,
        image: CONFIG.businessLogo,
        handler: function(response) {
            // Payment verified by Razorpay - Now process order
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
        },
        // Show UPI as first option
        config: {
            display: {
                blocks: {
                    banks: {
                        name: 'Pay using UPI',
                        instruments: [
                            {
                                method: 'upi'
                            }
                        ]
                    }
                },
                sequence: ['block.banks'],
                preferences: {
                    show_default_blocks: true
                }
            }
        }
    };
    
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

// Handle successful payment (ONLY called after Razorpay verification)
function handlePaymentSuccess(response, customerDetails) {
    document.getElementById('processingIndicator').style.display = 'block';
    
    const orderId = 'ORD' + Date.now();
    
    const orderData = {
        orderId: orderId,
        paymentId: response.razorpay_payment_id,
        product: currentProduct.name,
        amount: currentOrderDetails.total,
        customerDetails: customerDetails,
        timestamp: new Date().toISOString(),
        paymentMethod: 'Online Payment (Razorpay)'
    };
    
    console.log('✅ Payment verified by Razorpay:', orderData);
    
    // Send to Google Sheets ONLY after payment is verified
    sendWhatsAppNotifications(orderData);
    
    setTimeout(() => {
        document.getElementById('processingIndicator').style.display = 'none';
        showSuccessModal(orderId, 'online', customerDetails);
    }, 2000);
}

// Send order notification to Google Sheets
function sendWhatsAppNotifications(orderData) {
    const weight = currentOrderDetails.weight >= 1000 ? 
                   `${currentOrderDetails.weight/1000}kg` : 
                   `${currentOrderDetails.weight}g`;
    const quantity = currentOrderDetails.quantity;
    
    const webhookUrl = 'https://script.google.com/macros/s/AKfycbykBg2S8bAVejZQxTZT-2nK3XiFkHAAh7EgM0hNSkghRa9-tXDnNsgj07fC2WG3ykRp/exec';
    
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
            quantity: quantity,
            weight: weight,
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

// Show success modal
function showSuccessModal(orderId, paymentType, customerDetails) {
    document.getElementById('orderId').textContent = orderId;
    document.getElementById('confirmedPhone').textContent = '+91 ' + customerDetails.phone;
    
    const successModal = document.getElementById('successModal');
    successModal.querySelector('h3').textContent = '✅ Payment Successful!';
    successModal.querySelector('.lead').textContent = 'Your payment has been verified and order is confirmed.';
    
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('successModal').style.display = 'block';
}

// Close success modal
function closeModal() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('successModal').style.display = 'none';
    showMainPage();
    
    document.getElementById('paymentForm').reset();
    document.getElementById('deliveryPin').value = currentUserPin;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Export functions for global access
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