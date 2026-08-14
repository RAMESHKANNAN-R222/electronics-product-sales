// -------------------------------------------------------------
// TECHPULSE ELECTRONICS - CORE APPLICATION LOGIC
// -------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // App State
    let cart = JSON.parse(localStorage.getItem('techpulse_cart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('techpulse_wishlist')) || [];
    let activeCategory = 'all';
    let searchQuery = '';
    let maxPrice = 2000;
    let sortBy = 'popular';
    let promoDiscount = 0;

    // DOM Element References
    const productsGrid = document.getElementById('productsGrid');
    const categoryTabs = document.querySelectorAll('.tab-btn');
    const searchInput = document.getElementById('searchInput');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const sortSelect = document.getElementById('sortSelect');
    
    const cartBtn = document.getElementById('cartBtn');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsList = document.getElementById('cartItemsList');
    
    const cartBadge = document.getElementById('cartBadge');
    const wishlistBadge = document.getElementById('wishlistBadge');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    const productModal = document.getElementById('productModal');
    const closeProductModalBtn = document.getElementById('closeProductModalBtn');
    
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Initialize Application
    function init() {
        renderProducts();
        updateCartBadge();
        updateWishlistBadge();
        setupEventListeners();
        loadSavedTheme();
    }

    // Filter & Sort Logic
    function getFilteredProducts() {
        return PRODUCTS.filter(product => {
            const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  product.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesPrice = product.price <= maxPrice;
            return matchesCategory && matchesSearch && matchesPrice;
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return b.reviewsCount - a.reviewsCount; // Default: popular
        });
    }

    // Render Products Grid
    function renderProducts() {
        const products = getFilteredProducts();

        if (products.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-state">
                    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <h3>No gadgets found</h3>
                    <p>Try adjusting your search query, price range, or category filters.</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = products.map(product => {
            const isWishlisted = wishlist.includes(product.id);
            return `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image-wrap">
                        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80'">
                        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                        <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="window.toggleWishlist('${product.id}', event)">
                            <svg width="18" height="18" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </button>
                    </div>
                    <div class="product-details">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-title" onclick="window.openProductModal('${product.id}')" style="cursor:pointer;">${product.name}</h3>
                        <div class="product-rating">
                            <span class="stars">★ ${product.rating}</span>
                            <span>(${product.reviewsCount} reviews)</span>
                        </div>
                        <div class="product-price-row">
                            <div class="price-box">
                                <span class="current-price">$${product.price.toFixed(2)}</span>
                                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                            </div>
                            <button class="add-cart-btn" onclick="window.addToCart('${product.id}')">
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Global Window Methods for inline onclicks
    window.addToCart = function(productId, qty = 1) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.qty += qty;
        } else {
            cart.push({ id: productId, product, qty });
        }

        saveCart();
        updateCartBadge();
        renderCartDrawer();
        showToast(`Added "${product.name}" to cart!`);
    };

    window.toggleWishlist = function(productId, event) {
        if (event) event.stopPropagation();
        const index = wishlist.indexOf(productId);
        if (index > -1) {
            wishlist.splice(index, 1);
            showToast('Removed from wishlist');
        } else {
            wishlist.push(productId);
            showToast('Saved to wishlist ❤️');
        }
        localStorage.setItem('techpulse_wishlist', JSON.stringify(wishlist));
        updateWishlistBadge();
        renderProducts();
    };

    window.openProductModal = function(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        const modalBody = document.getElementById('productModalBody');
        const specsHtml = Object.entries(product.specs || {}).map(([key, val]) => `
            <div class="spec-item">
                <span class="spec-key">${key}</span>
                <span class="spec-val">${val}</span>
            </div>
        `).join('');

        modalBody.innerHTML = `
            <div class="product-modal-grid">
                <div>
                    <img src="${product.image}" class="modal-product-img" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80'">
                </div>
                <div>
                    <span class="product-category">${product.category}</span>
                    <h2 style="font-size: 1.6rem; margin: 0.3rem 0;">${product.name}</h2>
                    <div class="product-rating" style="margin-bottom: 1rem;">
                        <span class="stars">★ ${product.rating}</span>
                        <span>(${product.reviewsCount} customer reviews)</span>
                    </div>
                    <div class="price-box" style="margin-bottom: 1rem;">
                        <span class="current-price" style="font-size: 1.8rem;">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="original-price" style="font-size: 1.1rem;">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 1rem;">${product.description}</p>
                    
                    <h4 style="margin-bottom: 0.5rem; font-size: 0.95rem;">Technical Specifications:</h4>
                    <div class="specs-list">${specsHtml}</div>

                    <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                        <button class="btn-primary" style="flex: 1; justify-content: center;" onclick="window.addToCart('${product.id}'); window.closeModal();">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        `;

        productModal.classList.add('active');
    };

    window.closeModal = function() {
        productModal.classList.remove('active');
        checkoutModal.classList.remove('active');
    };

    // Cart Drawer Management
    function saveCart() {
        localStorage.setItem('techpulse_cart', JSON.stringify(cart));
    }

    function updateCartBadge() {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartBadge.textContent = totalItems;
    }

    function updateWishlistBadge() {
        wishlistBadge.textContent = wishlist.length;
    }

    function renderCartDrawer() {
        if (cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="empty-state" style="padding: 3rem 0;">
                    <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    <p>Your shopping cart is empty</p>
                </div>
            `;
            updateCartSummary(0, 0);
            return;
        }

        cartItemsList.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.product.image}" class="cart-item-img" alt="${item.product.name}" onerror="this.src='https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=200&q=80'">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.product.name}</div>
                    <div class="cart-item-price">$${(item.product.price * item.qty).toFixed(2)}</div>
                    <div class="qty-control">
                        <button class="qty-btn" onclick="window.changeQty('${item.id}', -1)">-</button>
                        <span class="qty-num">${item.qty}</span>
                        <button class="qty-btn" onclick="window.changeQty('${item.id}', 1)">+</button>
                    </div>
                </div>
                <button class="remove-item-btn" onclick="window.removeFromCart('${item.id}')">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        `).join('');

        const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
        updateCartSummary(subtotal);
    }

    function updateCartSummary(subtotal) {
        const tax = subtotal * 0.08; // 8% tax
        const shipping = subtotal > 500 || subtotal === 0 ? 0 : 15.00;
        const grandTotal = Math.max(0, subtotal + tax + shipping - promoDiscount);

        document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('cartShipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
        document.getElementById('cartGrandTotal').textContent = `$${grandTotal.toFixed(2)}`;
    }

    window.changeQty = function(productId, delta) {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.qty += delta;
            if (item.qty <= 0) {
                window.removeFromCart(productId);
                return;
            }
            saveCart();
            updateCartBadge();
            renderCartDrawer();
        }
    };

    window.removeFromCart = function(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartBadge();
        renderCartDrawer();
        showToast('Item removed from cart');
    };

    window.applyPromoCode = function() {
        const input = document.getElementById('promoInput');
        const code = input.value.trim().toUpperCase();
        if (code === 'TECH20') {
            promoDiscount = 20.00;
            showToast('🎉 Promo code TECH20 applied ($20 OFF)');
            renderCartDrawer();
        } else {
            showToast('Invalid promo code. Try TECH20');
        }
    };

    // Event Listeners
    function setupEventListeners() {
        // Category Tabs
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                categoryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeCategory = tab.dataset.category;
                renderProducts();
            });
        });

        // Search Input
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderProducts();
        });

        // Price Filter
        priceRange.addEventListener('input', (e) => {
            maxPrice = parseFloat(e.target.value);
            priceValue.textContent = `$${maxPrice}`;
            renderProducts();
        });

        // Sort Selector
        sortSelect.addEventListener('change', (e) => {
            sortBy = e.target.value;
            renderProducts();
        });

        // Cart Drawer Toggles
        cartBtn.addEventListener('click', () => {
            renderCartDrawer();
            cartDrawer.classList.add('active');
            cartOverlay.classList.add('active');
        });

        closeCartBtn.addEventListener('click', closeCart);
        cartOverlay.addEventListener('click', closeCart);

        function closeCart() {
            cartDrawer.classList.remove('active');
            cartOverlay.classList.remove('active');
        }

        // Modal Close Triggers
        closeProductModalBtn.addEventListener('click', window.closeModal);
        closeCheckoutBtn.addEventListener('click', window.closeModal);

        // Checkout Trigger
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showToast('Please add items to cart before checkout');
                return;
            }
            closeCart();
            openCheckoutModal();
        });

        // Theme Toggle
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('techpulse_theme', newTheme);
            showToast(`Switched to ${newTheme} mode`);
        });
    }

    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('techpulse_theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
    }

    // Checkout Flow
    function openCheckoutModal() {
        const total = document.getElementById('cartGrandTotal').textContent;
        document.getElementById('checkoutPayAmount').textContent = total;
        checkoutModal.classList.add('active');
    }

    window.submitOrder = function(event) {
        event.preventDefault();
        const orderId = 'TP-' + Math.floor(100000 + Math.random() * 900000);
        
        cart = [];
        saveCart();
        updateCartBadge();
        window.closeModal();

        showToast(` Order #${orderId} confirmed! Thank you for buying.`);
    };

    // Toast Notifications
    function showToast(message) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <svg width="20" height="20" fill="none" stroke="var(--accent-primary)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>${message}</span>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    init();
});
