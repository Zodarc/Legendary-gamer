/* ============================================================================
   LEGENDARY GAMER - Shop JavaScript
   Shop page functionality, filtering, search, and product management
   ============================================================================ */

// ============================================================================
// SHOP INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeShop();
});

function initializeShop() {
    initializeFilters();
    initializeSearch();
    initializeViewToggle();
    initializeNewsletter();
    loadProducts();
    handleURLParameters();
}

// ============================================================================
// PRODUCT LOADING AND DISPLAY
// ============================================================================

function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    const loadingIndicator = document.getElementById('loading-indicator');
    const noResults = document.getElementById('no-results');
    
    // Show loading
    loadingIndicator.style.display = 'block';
    noResults.style.display = 'none';
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        displayProducts(window.featuredProducts || []);
        loadingIndicator.style.display = 'none';
    }, 800);
}

function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    const noResults = document.getElementById('no-results');
    
    if (products.length === 0) {
        productsGrid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    productsGrid.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = createShopProductCard(product, index);
        productsGrid.appendChild(productCard);
    });
    
    // Trigger scroll animations
    setTimeout(() => {
        const cards = productsGrid.querySelectorAll('.shop-product-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 100);
        });
    }, 100);
}

function createShopProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'shop-product-card';
    card.dataset.category = product.category;
    card.dataset.price = parseFloat(product.price.replace('$', '').replace(',', ''));
    card.dataset.rating = product.rating;
    card.dataset.title = product.title.toLowerCase();
    
    card.innerHTML = `
        <div class="shop-product-image">
            <div class="product-icon">${product.icon}</div>
            <div class="product-badge">⭐ ${product.rating}</div>
            <div class="quick-view-btn" onclick="openQuickView(${product.id})">👁️ Quick View</div>
        </div>
        <div class="shop-product-content">
            <h3 class="shop-product-title">${product.title}</h3>
            <div class="shop-product-features">
                ${product.features.slice(0, 3).map(feature => 
                    `<span class="feature-tag">${feature}</span>`
                ).join('')}
            </div>
            <div class="shop-product-rating">
                <span class="stars">${generateStars(product.rating)}</span>
                <span class="rating-count">(${Math.floor(Math.random() * 500) + 50} reviews)</span>
            </div>
            <div class="shop-product-price">
                <span class="current-price">${product.price}</span>
                <span class="original-price">$${(parseFloat(product.price.replace('$', '').replace(',', '')) * 1.2).toFixed(2)}</span>
            </div>
            <div class="shop-product-actions">
                <a href="${product.affiliateLink}" target="_blank" rel="noopener" class="shop-buy-btn" onclick="trackAffiliateClick(${product.id}, '${product.title}', '${product.price}')">
                    <span>Buy Now</span>
                    <span class="btn-icon">🚀</span>
                </a>
                <button class="wishlist-btn" onclick="toggleWishlist(${product.id})" title="Add to Wishlist">
                    ❤️
                </button>
                <button class="compare-btn" onclick="addToCompare(${product.id})" title="Add to Compare">
                    ⚖️
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    
    if (hasHalfStar) {
        stars += '⭐';
    }
    
    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }
    
    return stars;
}

// ============================================================================
// FILTERING FUNCTIONALITY
// ============================================================================

function initializeFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const brandFilter = document.getElementById('brand-filter');
    const sortFilter = document.getElementById('sort-filter');
    const clearFilters = document.getElementById('clear-filters');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', applyFilters);
    }
    
    if (brandFilter) {
        brandFilter.addEventListener('change', applyFilters);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', applyFilters);
    }
    
    if (clearFilters) {
        clearFilters.addEventListener('click', clearAllFilters);
    }
}

function applyFilters() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const brandFilter = document.getElementById('brand-filter').value;
    const sortFilter = document.getElementById('sort-filter').value;
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    
    let filteredProducts = window.featuredProducts || [];
    
    // Apply category filter
    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    // Apply price filter
    if (priceFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => {
            const price = parseFloat(product.price.replace('$', '').replace(',', ''));
            switch (priceFilter) {
                case 'under-100':
                    return price < 100;
                case '100-300':
                    return price >= 100 && price <= 300;
                case '300-600':
                    return price >= 300 && price <= 600;
                case 'over-600':
                    return price > 600;
                default:
                    return true;
            }
        });
    }
    
    // Apply brand filter
    if (brandFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.title.toLowerCase().includes(brandFilter.toLowerCase())
        );
    }
    
    // Apply search filter
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => 
            product.title.toLowerCase().includes(searchQuery) ||
            product.features.some(feature => feature.toLowerCase().includes(searchQuery)) ||
            product.category.toLowerCase().includes(searchQuery)
        );
    }
    
    // Apply sorting
    switch (sortFilter) {
        case 'price-low':
            filteredProducts.sort((a, b) => {
                const priceA = parseFloat(a.price.replace('$', '').replace(',', ''));
                const priceB = parseFloat(b.price.replace('$', '').replace(',', ''));
                return priceA - priceB;
            });
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => {
                const priceA = parseFloat(a.price.replace('$', '').replace(',', ''));
                const priceB = parseFloat(b.price.replace('$', '').replace(',', ''));
                return priceB - priceA;
            });
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            // For demo purposes, sort by ID (assuming higher ID = newer)
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            // Keep original featured order
            break;
    }
    
    displayProducts(filteredProducts);
    updateFilterCounts(filteredProducts.length);
}

function clearAllFilters() {
    document.getElementById('category-filter').value = 'all';
    document.getElementById('price-filter').value = 'all';
    document.getElementById('brand-filter').value = 'all';
    document.getElementById('sort-filter').value = 'featured';
    document.getElementById('search-input').value = '';
    
    applyFilters();
}

function updateFilterCounts(count) {
    const header = document.querySelector('.products-header h2');
    if (header) {
        header.textContent = `Premium Gaming Gear (${count} products)`;
    }
}

// ============================================================================
// SEARCH FUNCTIONALITY
// ============================================================================

function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(applyFilters, 300));
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', applyFilters);
    }
}

// ============================================================================
// VIEW TOGGLE FUNCTIONALITY
// ============================================================================

function initializeViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('products-grid');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            viewBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Toggle grid/list view
            const view = this.dataset.view;
            if (view === 'list') {
                productsGrid.classList.add('list-view');
            } else {
                productsGrid.classList.remove('list-view');
            }
        });
    });
}

// ============================================================================
// QUICK VIEW FUNCTIONALITY
// ============================================================================

function openQuickView(productId) {
    const product = (window.featuredProducts || []).find(p => p.id === productId);
    if (!product) return;
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="quick-view-content">
            <button class="close-modal" onclick="closeQuickView()">✕</button>
            <div class="quick-view-product">
                <div class="quick-view-image">
                    <div class="product-icon">${product.icon}</div>
                </div>
                <div class="quick-view-details">
                    <h2>${product.title}</h2>
                    <div class="quick-view-rating">
                        <span class="stars">${generateStars(product.rating)}</span>
                        <span class="rating-text">${product.rating}/5</span>
                    </div>
                    <div class="quick-view-price">${product.price}</div>
                    <div class="quick-view-features">
                        <h4>Key Features:</h4>
                        <ul>
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="quick-view-actions">
                        <a href="${product.affiliateLink}" target="_blank" rel="noopener" class="quick-view-buy-btn">
                            Buy Now - ${product.price}
                        </a>
                        <button class="quick-view-wishlist" onclick="toggleWishlist(${product.id})">
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add show class for animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    const modal = document.querySelector('.quick-view-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// ============================================================================
// WISHLIST FUNCTIONALITY
// ============================================================================

let wishlist = JSON.parse(localStorage.getItem('legendaryGamerWishlist')) || [];

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        // Remove from wishlist
        wishlist.splice(index, 1);
        showNotification('Removed from wishlist', 'info');
    } else {
        // Add to wishlist
        wishlist.push(productId);
        showNotification('Added to wishlist', 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('legendaryGamerWishlist', JSON.stringify(wishlist));
    
    // Update UI
    updateWishlistButtons();
}

function updateWishlistButtons() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        const productId = parseInt(btn.getAttribute('onclick').match(/\d+/)[0]);
        if (wishlist.includes(productId)) {
            btn.classList.add('active');
            btn.innerHTML = '💖';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '❤️';
        }
    });
}

// ============================================================================
// COMPARE FUNCTIONALITY
// ============================================================================

let compareList = JSON.parse(localStorage.getItem('legendaryGamerCompare')) || [];

function addToCompare(productId) {
    if (compareList.length >= 3) {
        showNotification('You can only compare up to 3 products', 'warning');
        return;
    }
    
    if (compareList.includes(productId)) {
        showNotification('Product already in compare list', 'info');
        return;
    }
    
    compareList.push(productId);
    localStorage.setItem('legendaryGamerCompare', JSON.stringify(compareList));
    showNotification(`Added to compare (${compareList.length}/3)`, 'success');
    
    updateCompareButtons();
}

function updateCompareButtons() {
    const compareBtns = document.querySelectorAll('.compare-btn');
    compareBtns.forEach(btn => {
        const productId = parseInt(btn.getAttribute('onclick').match(/\d+/)[0]);
        if (compareList.includes(productId)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ============================================================================
// NEWSLETTER FUNCTIONALITY
// ============================================================================

function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate newsletter signup
            showNotification('Thanks for subscribing! Welcome to the Legendary Gamer community! 🎮', 'success');
            
            // Clear form
            this.reset();
            
            // Track signup
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_signup', {
                    'email': email
                });
            }
        });
    }
}

// ============================================================================
// URL PARAMETER HANDLING
// ============================================================================

function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    
    if (category) {
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.value = category;
        }
    }
    
    if (search) {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = search;
        }
    }
    
    // Apply filters if parameters exist
    if (category || search) {
        setTimeout(() => {
            applyFilters();
        }, 500);
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">✕</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ============================================================================
// GLOBAL FILTER FUNCTIONS (for footer links)
// ============================================================================

function filterByCategory(category) {
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.value = category;
        applyFilters();
        
        // Scroll to products section
        document.getElementById('products-grid').scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// ============================================================================
// INITIALIZATION ON LOAD
// ============================================================================

// Update wishlist and compare buttons when products load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        updateWishlistButtons();
        updateCompareButtons();
    }, 1000);
});