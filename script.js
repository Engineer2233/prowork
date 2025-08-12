document.addEventListener('DOMContentLoaded', function() {
    // تهيئة نظام الإشعارات
    initNotifications();
    
    // تهيئة نظام التحديثات في الوقت الفعلي
    initRealTimeUpdates();
    // DOM Elements
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const paymentModal = document.getElementById('paymentModal');
    const bidModal = document.getElementById('bidModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const registerLink = document.querySelector('.register-link a');
    const loginLink = document.querySelector('.login-link a');
    const accountBtns = document.querySelectorAll('.account-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    const bidBtns = document.querySelectorAll('.bid-btn');
    const paymentOptions = document.querySelectorAll('.payment-option > input');
    const bankDetails = document.querySelector('.bank-details');
    const walletDetails = document.querySelector('.wallet-details');
    const cashDetails = document.querySelector('.cash-details');
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const searchBox = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-box button');
    const header = document.querySelector('header');
    const notificationBell = document.querySelector('.notification-bell');
    const notificationPanel = document.querySelector('.notification-panel');

    // Modal Functions
    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            closeModal(modal);
            // وظائف الإشعارات
    function initNotifications() {
        if (!notificationBell || !notificationPanel) return;
        
        // إظهار/إخفاء لوحة الإشعارات
        notificationBell.addEventListener('click', function(e) {
            e.preventDefault();
            notificationPanel.classList.toggle('show');
        });
        
        // إخفاء لوحة الإشعارات عند النقر خارجها
        document.addEventListener('click', function(e) {
            if (!notificationBell.contains(e.target) && !notificationPanel.contains(e.target)) {
                notificationPanel.classList.remove('show');
            }
        });
        
        // طلب إذن الإشعارات
        requestNotificationPermission();
    }
    
    function requestNotificationPermission() {
        if ('Notification' in window) {
            if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                Notification.requestPermission();
            }
        }
    }
    
    function showNotification(title, body, icon = 'favicon.svg') {
        // إشعار داخل الموقع
        if (notificationPanel) {
            const notificationItem = document.createElement('div');
            notificationItem.className = 'notification-item';
            notificationItem.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-bell"></i>
                </div>
                <div class="notification-content">
                    <h4>${title}</h4>
                    <p>${body}</p>
                    <small>${new Date().toLocaleTimeString()}</small>
                </div>
                <button class="notification-close">&times;</button>
            `;
            
            // إضافة الإشعار إلى اللوحة
            notificationPanel.prepend(notificationItem);
            
            // تحديث عدد الإشعارات
            updateNotificationCount();
            
            // إزالة الإشعار عند النقر على زر الإغلاق
            const closeBtn = notificationItem.querySelector('.notification-close');
            closeBtn.addEventListener('click', function() {
                notificationItem.remove();
                updateNotificationCount();
            });
        }
        
        // إشعار المتصفح
        if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification(title, {
                body: body,
                icon: icon
            });
            
            // إغلاق الإشعار تلقائيًا بعد 5 ثوانٍ
            setTimeout(() => {
                notification.close();
            }, 5000);
        }
    }
    
    function updateNotificationCount() {
        if (!notificationBell) return;
        
        const count = notificationPanel ? notificationPanel.querySelectorAll('.notification-item').length : 0;
        const badge = notificationBell.querySelector('.notification-badge');
        
        if (count > 0) {
            if (badge) {
                badge.textContent = count;
            } else {
                const newBadge = document.createElement('span');
                newBadge.className = 'notification-badge';
                newBadge.textContent = count;
                notificationBell.appendChild(newBadge);
            }
        } else if (badge) {
            badge.remove();
        }
    }
    
    // وظائف التحديثات في الوقت الفعلي
    function initRealTimeUpdates() {
        // محاكاة اتصال WebSocket
        simulateWebSocketConnection();
    }
    
    function simulateWebSocketConnection() {
        console.log('تم الاتصال بخدمة التحديثات في الوقت الفعلي');
        
        // محاكاة استلام تحديثات مختلفة
        setTimeout(() => {
            handleRealTimeUpdate({
                type: 'new_message',
                data: {
                    sender: 'أحمد محمد',
                    message: 'مرحبًا، هل يمكنك تقديم عرض أسعار لمشروعي؟'
                }
            });
        }, 10000);
        
        setTimeout(() => {
            handleRealTimeUpdate({
                type: 'payment_received',
                data: {
                    amount: 50,
                    service: 'تصميم شعار'
                }
            });
        }, 15000);
        
        setTimeout(() => {
            handleRealTimeUpdate({
                type: 'project_update',
                data: {
                    project: 'تطوير موقع ويب',
                    status: 'مكتمل'
                }
            });
        }, 20000);
    }
    
    function handleRealTimeUpdate(update) {
        console.log('تم استلام تحديث:', update);
        
        switch(update.type) {
            case 'new_message':
                showNotification(
                    'رسالة جديدة من ' + update.data.sender,
                    update.data.message
                );
                break;
                
            case 'payment_received':
                showNotification(
                    'تم استلام دفعة',
                    `تم استلام ${update.data.amount} دولار مقابل خدمة "${update.data.service}"`
                );
                updateWalletBalance(update.data.amount);
                break;
                
            case 'project_update':
                showNotification(
                    'تحديث المشروع',
                    `تم تحديث حالة مشروع "${update.data.project}" إلى ${update.data.status}`
                );
                break;
                
            default:
                console.log('نوع تحديث غير معروف:', update.type);
        }
    }
    
    function updateWalletBalance(amount) {
        const walletBalance = document.querySelector('.wallet-balance');
        if (walletBalance) {
            const currentBalance = parseFloat(walletBalance.textContent);
            walletBalance.textContent = (currentBalance + amount).toFixed(2);
            
            // إضافة تأثير بصري للتحديث
            walletBalance.classList.add('balance-updated');
            setTimeout(() => {
                walletBalance.classList.remove('balance-updated');
            }, 2000);
        }
    }
    
    // تهيئة نظام الدفع المباشر
    initDirectPayment();
    
    function initDirectPayment() {
        const directPayBtns = document.querySelectorAll('.direct-pay-btn');
        
        directPayBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const serviceId = this.dataset.serviceId;
                const servicePrice = this.dataset.price;
                const serviceName = this.dataset.name;
                
                // فتح نافذة الدفع المباشر
                openDirectPayment(serviceId, servicePrice, serviceName);
            });
        });
    }
    
    function openDirectPayment(serviceId, price, name) {
        if (!paymentModal) return;
        
        // تعبئة بيانات الخدمة في نموذج الدفع
        const serviceNameField = paymentModal.querySelector('#service-name');
        const servicePriceField = paymentModal.querySelector('#service-price');
        const serviceIdField = paymentModal.querySelector('#service-id');
        
        if (serviceNameField) serviceNameField.textContent = name;
        if (servicePriceField) servicePriceField.textContent = price + ' دولار';
        if (serviceIdField) serviceIdField.value = serviceId;
        
        // فتح النافذة
        openModal(paymentModal);
    }
});

// وظيفة للتحقق من اتصال الإنترنت وعرض إشعار عند الانقطاع
window.addEventListener('online', function() {
    const offlineMessage = document.querySelector('.offline-message');
    if (offlineMessage) {
        offlineMessage.style.display = 'none';
    }
});

window.addEventListener('offline', function() {
    let offlineMessage = document.querySelector('.offline-message');
    
    if (!offlineMessage) {
        offlineMessage = document.createElement('div');
        offlineMessage.className = 'offline-message';
        offlineMessage.innerHTML = '<i class="fas fa-wifi"></i> أنت غير متصل بالإنترنت. بعض الميزات قد لا تعمل بشكل صحيح.';
        document.body.appendChild(offlineMessage);
    }
    
    offlineMessage.style.display = 'block';
});
    }

    // Event Listeners for Modals
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            openModal(loginModal);
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            openModal(signupModal);
        });
    }

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            closeAllModals();
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Switch between login and signup
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(loginModal);
            openModal(signupModal);
        });
    }

    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(signupModal);
            openModal(loginModal);
        });
    }

    // Account Type Toggle
    accountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            accountBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Service Card Click
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            openModal(paymentModal);
        });
    });

    // Bid Button Click
    bidBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(bidModal);
        });
    });

    // Payment Options Toggle
    if (paymentOptions.length > 0) {
        // Show bank details by default
        bankDetails.style.display = 'block';

        paymentOptions.forEach(option => {
            option.addEventListener('change', function() {
                const paymentType = this.id;
                
                // Hide all payment details
                bankDetails.style.display = 'none';
                walletDetails.style.display = 'none';
                cashDetails.style.display = 'none';
                
                // Show selected payment details
                if (paymentType === 'bank') {
                    bankDetails.style.display = 'block';
                } else if (paymentType === 'wallet') {
                    walletDetails.style.display = 'block';
                } else if (paymentType === 'cash') {
                    cashDetails.style.display = 'block';
                }
            });
        });
    }

    // Testimonials Slider
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    if (testimonialSlider) {
        testimonialSlider.addEventListener('mousedown', dragStart);
        testimonialSlider.addEventListener('touchstart', dragStart);
        testimonialSlider.addEventListener('mouseup', dragEnd);
        testimonialSlider.addEventListener('touchend', dragEnd);
        testimonialSlider.addEventListener('mouseleave', dragEnd);
        testimonialSlider.addEventListener('mousemove', drag);
        testimonialSlider.addEventListener('touchmove', drag);
    }

    function dragStart(e) {
        e.preventDefault();
        if (e.type === 'touchstart') {
            startPos = e.touches[0].clientX;
        } else {
            startPos = e.clientX;
        }
        isDragging = true;
        testimonialSlider.style.cursor = 'grabbing';
    }

    function drag(e) {
        if (isDragging) {
            let currentPosition = 0;
            if (e.type === 'touchmove') {
                currentPosition = e.touches[0].clientX;
            } else {
                currentPosition = e.clientX;
            }
            const diff = currentPosition - startPos;
            currentTranslate = prevTranslate + diff;
            testimonialSlider.scrollLeft = -currentTranslate;
        }
    }

    function dragEnd() {
        isDragging = false;
        prevTranslate = currentTranslate;
        testimonialSlider.style.cursor = 'grab';
    }

    // Form Validation
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    const paymentForm = document.querySelector('.payment-modal .submit-btn');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (validateEmail(email) && password.length >= 6) {
                // Submit form or API call here
                alert('تم تسجيل الدخول بنجاح!');
                closeAllModals();
            } else {
                alert('يرجى التحقق من البريد الإلكتروني وكلمة المرور');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('signup-email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            if (
                fullname.length >= 3 && 
                validateEmail(email) && 
                phone.length >= 9 && 
                password.length >= 6 && 
                password === confirmPassword && 
                terms
            ) {
                // Submit form or API call here
                alert('تم إنشاء الحساب بنجاح!');
                closeAllModals();
            } else {
                alert('يرجى التحقق من جميع الحقول');
            }
        });
    }

    if (paymentForm) {
        paymentForm.addEventListener('click', function(e) {
            e.preventDefault();
            // Validate payment details based on selected option
            const selectedPayment = document.querySelector('input[name="payment"]:checked').id;
            let isValid = false;
            
            if (selectedPayment === 'bank') {
                const accountNumber = document.getElementById('account-number').value;
                const accountName = document.getElementById('account-name').value;
                isValid = accountNumber.length >= 5 && accountName.length >= 3;
            } else if (selectedPayment === 'wallet') {
                const phoneNumber = document.getElementById('phone-number').value;
                isValid = phoneNumber.length >= 9;
            } else if (selectedPayment === 'cash') {
                const address = document.getElementById('delivery-address').value;
                const phone = document.getElementById('delivery-phone').value;
                isValid = address.length >= 10 && phone.length >= 9;
            }
            
            if (isValid) {
                alert('تم تأكيد الدفع بنجاح!');
                closeAllModals();
            } else {
                alert('يرجى إكمال بيانات الدفع');
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Search Functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchBox.value.trim();
            if (searchTerm.length > 0) {
                // Redirect to search results page or filter content
                alert(`جاري البحث عن: ${searchTerm}`);
            }
        });
    }

    if (searchBox) {
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchBox.value.trim();
                if (searchTerm.length > 0) {
                    // Redirect to search results page or filter content
                    alert(`جاري البحث عن: ${searchTerm}`);
                }
            }
        });
    }

    // Scroll Animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .category-card, .service-card, .project-card, .step, .payment-card, .testimonial, .stat-card, .blog-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    // Add animation class to CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .feature-card, .category-card, .service-card, .project-card, .step, .payment-card, .testimonial, .stat-card, .blog-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});