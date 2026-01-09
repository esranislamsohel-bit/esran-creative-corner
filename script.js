// Initialize Swiper Slider
const swiper = new Swiper('.bannerSwiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Modal Handling
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const agreementModal = document.getElementById('agreementModal');
const orderSuccessModal = document.getElementById('orderSuccessModal');
const loginLink = document.getElementById('loginLink');
const registerLink = document.getElementById('registerLink');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const closeAgreementModal = document.getElementById('closeAgreementModal');
const closeSuccessModal = document.getElementById('closeSuccessModal');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const readAgreementBtn = document.getElementById('readAgreementBtn');
const viewOrderBtn = document.getElementById('viewOrderBtn');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('active');
});

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.add('active');
});

closeLoginModal.addEventListener('click', () => {
    loginModal.classList.remove('active');
});

closeRegisterModal.addEventListener('click', () => {
    registerModal.classList.remove('active');
});

closeAgreementModal.addEventListener('click', () => {
    agreementModal.classList.remove('active');
});

closeSuccessModal.addEventListener('click', () => {
    orderSuccessModal.classList.remove('active');
});

switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.remove('active');
    registerModal.classList.add('active');
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.remove('active');
    loginModal.classList.add('active');
});

// Agreement handling
readAgreementBtn.addEventListener('click', () => {
    agreementModal.classList.add('active');
});

viewOrderBtn.addEventListener('click', () => {
    orderSuccessModal.classList.remove('active');
    document.getElementById('myOrdersLink').click();
});

closeSuccessBtn.addEventListener('click', () => {
    orderSuccessModal.classList.remove('active');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
    }
    if (e.target === registerModal) {
        registerModal.classList.remove('active');
    }
    if (e.target === agreementModal) {
        agreementModal.classList.remove('active');
    }
    if (e.target === orderSuccessModal) {
        orderSuccessModal.classList.remove('active');
    }
});

// Agreement checkbox
const agreeTermsCheckbox = document.getElementById('agreeTerms');
const acceptAgreementBtn = document.getElementById('acceptAgreement');
const declineAgreementBtn = document.getElementById('declineAgreement');

agreeTermsCheckbox.addEventListener('change', () => {
    acceptAgreementBtn.disabled = !agreeTermsCheckbox.checked;
});

acceptAgreementBtn.addEventListener('click', () => {
    if (agreeTermsCheckbox.checked) {
        // Store agreement acceptance in localStorage
        localStorage.setItem('agreementAccepted', 'true');
        localStorage.setItem('agreementAcceptedDate', new Date().toISOString());
        
        // Hide agreement required message and show order form
        document.getElementById('agreementRequired').style.display = 'none';
        document.getElementById('orderForm').style.display = 'block';
        
        // Close agreement modal
        agreementModal.classList.remove('active');
        
        // Scroll to order form
        document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
    }
});

declineAgreementBtn.addEventListener('click', () => {
    agreementModal.classList.remove('active');
    alert('You must accept the agreement to place an order.');
});

// Check if agreement already accepted on page load
window.addEventListener('load', () => {
    const agreementAccepted = localStorage.getItem('agreementAccepted');
    if (agreementAccepted === 'true') {
        document.getElementById('agreementRequired').style.display = 'none';
        document.getElementById('orderForm').style.display = 'block';
    }
});

// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Store user in localStorage (for demo purposes)
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userLoggedIn', 'true');
    
    alert('Login successful! You can now place an order.');
    loginModal.classList.remove('active');
    
    // Update UI for logged in user
    updateUserUI();
});

// Register Form Submission
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const phone = document.getElementById('regPhone').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const deliveryEmail = document.getElementById('regDeliveryEmail').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Store user in localStorage
    const user = {
        name,
        phone,
        email,
        password, // Note: In real app, never store passwords in localStorage
        deliveryEmail,
        registeredDate: new Date().toISOString()
    };
    
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userLoggedIn', 'true');
    
    alert('Registration successful! You can now place an order.');
    registerModal.classList.remove('active');
    
    // Update UI for logged in user
    updateUserUI();
});

// Update UI for logged in user
function updateUserUI() {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        // Update login/register links to show user email
        document.getElementById('loginLink').textContent = 'My Account';
        document.getElementById('registerLink').style.display = 'none';
        
        // Add logout functionality
        const loginLink = document.getElementById('loginLink');
        loginLink.removeEventListener('click', () => {});
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('userLoggedIn');
                localStorage.removeItem('userEmail');
                location.reload();
            }
        });
    }
}

// Check login status on page load
window.addEventListener('load', () => {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    if (userLoggedIn === 'true') {
        updateUserUI();
    }
});

// Order Calculation
const serviceSelect = document.getElementById('service');
const quantityInput = document.getElementById('quantity');
const hasCouponCheckbox = document.getElementById('hasCoupon');
const couponSection = document.getElementById('couponSection');
const couponInput = document.getElementById('coupon');
const applyCouponBtn = document.getElementById('applyCoupon');
const couponMessage = document.getElementById('couponMessage');

// Coupon toggle
hasCouponCheckbox.addEventListener('change', () => {
    if (hasCouponCheckbox.checked) {
        couponSection.classList.remove('hidden');
    } else {
        couponSection.classList.add('hidden');
        couponInput.value = '';
        couponMessage.textContent = '';
        
        // Remove coupon from localStorage
        localStorage.removeItem('appliedCoupon');
        localStorage.removeItem('couponDiscount');
        localStorage.removeItem('couponUsed');
        
        calculateTotal();
    }
});

// Apply coupon
applyCouponBtn.addEventListener('click', () => {
    const couponCode = couponInput.value.trim().toUpperCase();
    
    // Check if user already used a coupon
    const couponUsed = localStorage.getItem('couponUsed');
    if (couponUsed === 'true') {
        couponMessage.textContent = 'You have already used a coupon. Only one coupon per user is allowed.';
        couponMessage.style.color = 'var(--accent-color)';
        return;
    }
    
    // Valid coupon codes (hidden from users)
    const validCoupons = {
        'ESC500': 500,
        'ESRAN100': 100,
        'CREATIVE200': 200,
        'WELCOME50': 50,
        'FIRSTORDER': 300
    };
    
    if (validCoupons[couponCode]) {
        couponMessage.textContent = `Coupon applied successfully! You got ৳${validCoupons[couponCode]} discount.`;
        couponMessage.style.color = 'var(--success-color)';
        
        // Store coupon in localStorage
        localStorage.setItem('appliedCoupon', couponCode);
        localStorage.setItem('couponDiscount', validCoupons[couponCode]);
        localStorage.setItem('couponUsed', 'true');
        
        calculateTotal();
    } else {
        couponMessage.textContent = 'Invalid coupon code. Please try again.';
        couponMessage.style.color = 'var(--accent-color)';
        
        localStorage.removeItem('appliedCoupon');
        localStorage.removeItem('couponDiscount');
        calculateTotal();
    }
});

// Calculate order total
function calculateTotal() {
    const servicePrice = parseInt(serviceSelect.value) || 0;
    const quantity = parseInt(quantityInput.value) || 1;
    const subtotal = servicePrice * quantity;
    
    // Get coupon discount
    let discount = 0;
    const couponDiscount = localStorage.getItem('couponDiscount');
    if (couponDiscount) {
        discount = parseInt(couponDiscount);
        if (discount > subtotal) discount = subtotal;
    }
    
    // Calculate cash out charge (1.5% of amount after discount)
    const amountAfterDiscount = subtotal - discount;
    const cashOutCharge = Math.ceil(amountAfterDiscount * 0.015);
    
    // Total to pay via Bkash
    const total = amountAfterDiscount + cashOutCharge;
    
    // Update display
    document.getElementById('serviceCost').textContent = `৳${subtotal}`;
    document.getElementById('discountAmount').textContent = `-৳${discount}`;
    document.getElementById('cashOutCharge').textContent = `৳${cashOutCharge}`;
    document.getElementById('totalAmount').textContent = `৳${total}`;
    document.getElementById('paymentAmount').textContent = `৳${total}`;
}

// Update calculation when service or quantity changes
serviceSelect.addEventListener('change', calculateTotal);
quantityInput.addEventListener('input', calculateTotal);

// Order form submission
document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    if (userLoggedIn !== 'true') {
        alert('Please login or register to place an order.');
        document.getElementById('loginLink').click();
        return;
    }
    
    // Check if agreement is accepted
    const agreementAccepted = localStorage.getItem('agreementAccepted');
    if (agreementAccepted !== 'true') {
        alert('Please read and accept the user agreement to place an order.');
        document.getElementById('readAgreementBtn').click();
        return;
    }
    
    const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
    const description = document.getElementById('description').value;
    const transactionId = document.getElementById('transactionId').value;
    
    if (!transactionId) {
        alert('Please enter your Bkash transaction ID.');
        return;
    }
    
    // Generate order number
    const orderNumber = 'ECC-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    
    // Get user data
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Calculate totals
    const servicePrice = parseInt(serviceSelect.value) || 0;
    const quantity = parseInt(quantityInput.value) || 1;
    const subtotal = servicePrice * quantity;
    
    let discount = 0;
    const couponDiscount = localStorage.getItem('couponDiscount');
    if (couponDiscount) {
        discount = parseInt(couponDiscount);
        if (discount > subtotal) discount = subtotal;
    }
    
    const amountAfterDiscount = subtotal - discount;
    const cashOutCharge = Math.ceil(amountAfterDiscount * 0.015);
    const total = amountAfterDiscount + cashOutCharge;
    
    // Create order object
    const order = {
        orderNumber,
        service: serviceText,
        servicePrice,
        quantity,
        subtotal,
        discount,
        cashOutCharge,
        total,
        transactionId,
        description,
        customerName: userData.name || 'N/A',
        customerEmail: userData.email || 'N/A',
        customerPhone: userData.phone || 'N/A',
        deliveryEmail: userData.deliveryEmail || 'N/A',
        orderDate: new Date().toISOString(),
        status: 'payment_successful', // Initial status
        statusHistory: [
            {
                status: 'order_placed',
                date: new Date().toISOString(),
                message: 'Order placed successfully'
            },
            {
                status: 'payment_successful',
                date: new Date().toISOString(),
                message: 'Payment verified via Bkash'
            }
        ]
    };
    
    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    orders.push(order);
    localStorage.setItem('userOrders', JSON.stringify(orders));
    
    // Clear coupon usage for next order
    localStorage.removeItem('appliedCoupon');
    localStorage.removeItem('couponDiscount');
    // Note: We keep couponUsed as true to prevent reuse
    
    // Reset form
    document.getElementById('orderForm').reset();
    couponSection.classList.add('hidden');
    hasCouponCheckbox.checked = false;
    couponInput.value = '';
    couponMessage.textContent = '';
    calculateTotal();
    
    // Show success modal
    document.getElementById('successOrderNumber').textContent = orderNumber;
    orderSuccessModal.classList.add('active');
    
    // Update recent orders display
    updateRecentOrders();
});

// Order Tracking
const trackOrderBtn = document.getElementById('trackOrderBtn');
const trackOrderInput = document.getElementById('trackOrderInput');
const orderStatusDisplay = document.getElementById('orderStatusDisplay');

trackOrderBtn.addEventListener('click', () => {
    const orderNumber = trackOrderInput.value.trim();
    
    if (!orderNumber) {
        alert('Please enter an order number.');
        return;
    }
    
    // Find order in localStorage
    const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    const order = orders.find(o => o.orderNumber === orderNumber);
    
    if (!order) {
        alert('Order not found. Please check your order number.');
        return;
    }
    
    // Display order status
    displayOrderStatus(order);
});

function displayOrderStatus(order) {
    // Show the status display section
    orderStatusDisplay.style.display = 'block';
    
    // Update order info
    document.getElementById('displayOrderNumber').textContent = order.orderNumber;
    document.getElementById('detailService').textContent = order.service;
    document.getElementById('detailAmount').textContent = `৳${order.total}`;
    document.getElementById('detailTransaction').textContent = order.transactionId;
    document.getElementById('detailEmail').textContent = order.deliveryEmail;
    
    // Format date
    const orderDate = new Date(order.orderDate);
    document.getElementById('orderDate').textContent = orderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Update status based on order status
    const statusSteps = {
        'order_placed': 0,
        'payment_successful': 1,
        'processing': 2,
        'ready': 3,
        'delivered': 4
    };
    
    const currentStatus = order.status;
    const currentStep = statusSteps[currentStatus] || 0;
    
    // Update status text
    let statusText = '';
    let statusColor = '';
    
    switch(currentStatus) {
        case 'order_placed':
            statusText = 'Order Placed';
            statusColor = 'var(--warning-color)';
            break;
        case 'payment_successful':
            statusText = 'Payment Successful';
            statusColor = 'var(--primary-color)';
            break;
        case 'processing':
            statusText = 'Processing';
            statusColor = 'var(--primary-color)';
            break;
        case 'ready':
            statusText = 'Ready to Deliver';
            statusColor = 'var(--warning-color)';
            break;
        case 'delivered':
            statusText = 'Delivered';
            statusColor = 'var(--success-color)';
            break;
        default:
            statusText = 'Unknown';
            statusColor = 'var(--gray-color)';
    }
    
    document.getElementById('orderStatusText').textContent = statusText;
    document.getElementById('orderStatusText').style.color = statusColor;
    
    // Update timeline steps
    const steps = ['paymentStep', 'processingStep', 'readyStep', 'deliveredStep'];
    
    // Reset all steps
    steps.forEach(stepId => {
        const step = document.getElementById(stepId);
        step.classList.remove('completed', 'active');
    });
    
    // Mark completed steps
    for (let i = 0; i < currentStep; i++) {
        if (i < steps.length) {
            document.getElementById(steps[i]).classList.add('completed');
        }
    }
    
    // Mark active step
    if (currentStep > 0 && currentStep <= steps.length) {
        document.getElementById(steps[currentStep - 1]).classList.add('active');
    }
    
    // Show completion message if delivered
    const completionMessage = document.getElementById('completionMessage');
    if (currentStatus === 'delivered') {
        completionMessage.style.display = 'block';
    } else {
        completionMessage.style.display = 'none';
    }
    
    // Update status texts
    document.getElementById('paymentStatus').textContent = currentStep >= 1 ? 'Successful' : 'Pending';
    document.getElementById('processingStatus').textContent = currentStep >= 2 ? 'Completed' : (currentStep === 1 ? 'In Progress' : 'Waiting');
    document.getElementById('readyStatus').textContent = currentStep >= 3 ? 'Completed' : (currentStep === 2 ? 'In Progress' : 'Waiting');
    document.getElementById('deliveredStatus').textContent = currentStep >= 4 ? 'Completed' : (currentStep === 3 ? 'In Progress' : 'Pending');
}

// Update recent orders list
function updateRecentOrders() {
    const ordersList = document.querySelector('.orders-list');
    const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    
    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-orders">
                <i class="fas fa-box-open"></i>
                <p>No orders found. Place your first order!</p>
            </div>
        `;
        return;
    }
    
    // Sort orders by date (newest first)
    orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    
    // Display up to 5 recent orders
    const recentOrders = orders.slice(0, 5);
    
    let ordersHTML = '';
    recentOrders.forEach(order => {
        const orderDate = new Date(order.orderDate);
        const formattedDate = orderDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        let statusBadge = '';
        let statusColor = '';
        
        switch(order.status) {
            case 'order_placed':
                statusBadge = 'Order Placed';
                statusColor = '#f39c12';
                break;
            case 'payment_successful':
                statusBadge = 'Payment Successful';
                statusColor = '#3498db';
                break;
            case 'processing':
                statusBadge = 'Processing';
                statusColor = '#9b59b6';
                break;
            case 'ready':
                statusBadge = 'Ready';
                statusColor = '#f1c40f';
                break;
            case 'delivered':
                statusBadge = 'Delivered';
                statusColor = '#27ae60';
                break;
        }
        
        ordersHTML += `
            <div class="order-item" data-order="${order.orderNumber}">
                <div class="order-item-header">
                    <h4>${order.service}</h4>
                    <span class="order-status" style="background: ${statusColor}">${statusBadge}</span>
                </div>
                <div class="order-item-details">
                    <p><strong>Order #:</strong> ${order.orderNumber}</p>
                    <p><strong>Date:</strong> ${formattedDate}</p>
                    <p><strong>Amount:</strong> ৳${order.total}</p>
                </div>
                <button class="btn btn-small track-this-order">Track Order</button>
            </div>
        `;
    });
    
    ordersList.innerHTML = ordersHTML;
    
    // Add event listeners to track buttons
    document.querySelectorAll('.track-this-order').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderNumber = e.target.closest('.order-item').getAttribute('data-order');
            trackOrderInput.value = orderNumber;
            
            // Find and display order
            const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
            const order = orders.find(o => o.orderNumber === orderNumber);
            
            if (order) {
                displayOrderStatus(order);
                // Scroll to order status display
                document.getElementById('orderStatusDisplay').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize recent orders on page load
window.addEventListener('load', () => {
    updateRecentOrders();
    
    // Check if we should auto-display an order from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const orderParam = urlParams.get('order');
    
    if (orderParam) {
        trackOrderInput.value = orderParam;
        trackOrderBtn.click();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 90,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize calculation on page load
calculateTotal();