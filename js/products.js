/* ============================================================================
   LEGENDARY GAMER - Products JavaScript
   Product data, slider functionality, and affiliate integration
   ============================================================================ */

// ============================================================================
// PRODUCT DATA
// ============================================================================

const featuredProducts = [
    {
        id: 1,
        title: "Razer BlackWidow V4 75%",
        price: "$189.99",
        category: "peripherals",
        icon: "⌨️",
        affiliateLink: "https://amazon.com/dp/B0C4HL6YZQ",
        rating: 4.8,
        features: ["Mechanical Switches", "RGB Lighting", "Wireless", "Hot-Swappable"]
    },
    {
        id: 2,
        title: "Logitech G Pro X Superlight",
        price: "$149.99",
        category: "peripherals",
        icon: "🖱️",
        affiliateLink: "https://amazon.com/dp/B087LBSZTX",
        rating: 4.9,
        features: ["Ultra-Lightweight", "HERO 25K Sensor", "Wireless", "Gaming Grade"]
    },
    {
        id: 3,
        title: "SteelSeries Arctis Nova Pro",
        price: "$349.99",
        category: "peripherals",
        icon: "🎧",
        affiliateLink: "https://amazon.com/dp/B09ZXWKS7R",
        rating: 4.7,
        features: ["Hi-Res Audio", "Active Noise Canceling", "Wireless", "Pro Gaming"]
    },
    {
        id: 4,
        title: "ASUS ROG Swift PG279QM",
        price: "$699.99",
        category: "hardware",
        icon: "🖥️",
        affiliateLink: "https://amazon.com/dp/B093LQDY8C",
        rating: 4.6,
        features: ["240Hz", "1440p", "G-Sync", "IPS Panel"]
    },
    {
        id: 5,
        title: "Secretlab TITAN Evo 2022",
        price: "$549.00",
        category: "furniture",
        icon: "🪑",
        affiliateLink: "https://amazon.com/dp/B08R8VH2RG",
        rating: 4.8,
        features: ["Ergonomic Design", "Premium Materials", "4D Armrests", "Cold-Cure Foam"]
    },
    {
        id: 6,
        title: "Elgato Stream Deck MK.2",
        price: "$149.99",
        category: "streaming",
        icon: "🎛️",
        affiliateLink: "https://amazon.com/dp/B09738CV2G",
        rating: 4.8,
        features: ["15 LCD Keys", "Customizable", "Stream Control", "Plugin Ecosystem"]
    },
    {
        id: 7,
        title: "NVIDIA GeForce RTX 4070",
        price: "$599.99",
        category: "hardware",
        icon: "🎮",
        affiliateLink: "https://amazon.com/dp/B0BW4CGMHX",
        rating: 4.7,
        features: ["Ray Tracing", "DLSS 3", "4K Gaming", "Next-Gen Performance"]
    },
    {
        id: 8,
        title: "Blue Yeti USB Microphone",
        price: "$99.99",
        category: "streaming",
        icon: "🎤",
        affiliateLink: "https://amazon.com/dp/B00N1YPXW2",
        rating: 4.5,
        features: ["Studio Quality", "Multiple Patterns", "Zero-Latency", "Plug & Play"]
    },
    {
        id: 9,
        title: "Corsair K95 RGB Platinum XT",
        price: "$199.99",
        category: "peripherals",
        icon: "⌨️",
        affiliateLink: "https://amazon.com/dp/B08HM6D8MV",
        rating: 4.6,
        features: ["Cherry MX Switches", "iCUE RGB", "Dedicated Macro Keys", "Aircraft-Grade Aluminum"]
    },
    {
        id: 10,
        title: "Herman Miller x Logitech G Embody",
        price: "$1,395.00",
        category: "furniture",
        icon: "🪑",
        affiliateLink: "https://amazon.com/dp/B08C5QVP7B",
        rating: 4.9,
        features: ["Ergonomic Excellence", "Gaming Optimized", "12-Year Warranty", "Premium Build"]
    }
];

// ============================================================================
// PRODUCT SLIDER FUNCTIONALITY
// ============================================================================

class ProductSlider {
    constructor() {
        this.currentIndex = 0;
        this.products = featuredProducts;
        this.itemsPerView = this.getItemsPerView();
        this.track = null;
        this.prevBtn = null;
        this.nextBtn = null;
        
        this.init();
    }

    init() {
        this.track = document.getElementById('products-track');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');

        if (this.track) {
            this.render();
            this.bindEvents();
            this.updateButtons();
        }

        // Update items per view on resize
        window.addEventListener('resize', () => {
            this.itemsPerView = this.getItemsPerView();
            this.updateSlider();
        });
    }

    getItemsPerView() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        if (width <= 1024) return 3;
        return 4;
    }

    render() {
        this.track.innerHTML = '';
        
        this.products.forEach((product, index) => {
            const productCard = this.createProductCard(product, index);
            this.track.appendChild(productCard);
        });
    }

    createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="product-image">
                <div class="product-icon">${product.icon}</div>
                <div class="product-rating">
                    <span class="stars">${this.generateStars(product.rating)}</span>
                    <span class="rating-number">${product.rating}</span>
                </div>
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-features">
                    ${product.features.slice(0, 2).map(feature => 
                        `<span class="feature-tag">${feature}</span>`
                    ).join('')}
                </div>
                <div class="product-price">${product.price}</div>
                <a href="${product.affiliateLink}" target="_blank" rel="noopener" class="product-btn">
                    Buy Now
                    <span class="btn-icon">🚀</span>
                </a>
            </div>
        `;

        // Add click tracking
        card.addEventListener('click', () => {
            this.trackProductClick(product);
        });

        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '⭐';
        }
        
        if (hasHalfStar) {
            stars += '⭐';
        }
        
        return stars;
    }

    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Touch/swipe support
        this.bindTouchEvents();
        
        // Keyboard navigation
        this.bindKeyboardEvents();
    }

    bindTouchEvents() {
        let startX = 0;
        let endX = 0;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const deltaX = startX - endX;
            
            if (Math.abs(deltaX) > 50) { // Minimum swipe distance
                if (deltaX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }

    bindKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.products-slider')) {
                if (e.key === 'ArrowLeft') {
                    this.prevSlide();
                } else if (e.key === 'ArrowRight') {
                    this.nextSlide();
                }
            }
        });
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlider();
        }
    }

    nextSlide() {
        const maxIndex = this.products.length - this.itemsPerView;
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateSlider();
        }
    }

    updateSlider() {
        const cardWidth = 300 + 20; // card width + gap
        const translateX = -this.currentIndex * cardWidth;
        
        this.track.style.transform = `translateX(${translateX}px)`;
        this.updateButtons();
        
        // Add animation classes to visible cards
        this.animateVisibleCards();
    }

    updateButtons() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
            this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        }
        
        if (this.nextBtn) {
            const maxIndex = this.products.length - this.itemsPerView;
            this.nextBtn.disabled = this.currentIndex >= maxIndex;
            this.nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.5' : '1';
        }
    }

    animateVisibleCards() {
        const cards = this.track.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            const isVisible = index >= this.currentIndex && index < this.currentIndex + this.itemsPerView;
            
            if (isVisible) {
                card.classList.add('animate-in');
            }
        });
    }

    trackProductClick(product) {
        console.log(`Product clicked: ${product.title}`);
        
        // Track affiliate click (you can integrate with analytics here)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'affiliate_click', {
                'product_name': product.title,
                'product_price': product.price,
                'product_category': product.category
            });
        }
    }
}

// ============================================================================
// PRODUCT FILTERING
// ============================================================================

class ProductFilter {
    constructor(products) {
        this.allProducts = products;
        this.filteredProducts = products;
        this.activeCategory = 'all';
        this.activePriceRange = 'all';
        this.activeBrand = 'all';
    }

    filterByCategory(category) {
        this.activeCategory = category;
        this.applyFilters();
    }

    filterByPriceRange(range) {
        this.activePriceRange = range;
        this.applyFilters();
    }

    filterByBrand(brand) {
        this.activeBrand = brand;
        this.applyFilters();
    }

    applyFilters() {
        this.filteredProducts = this.allProducts.filter(product => {
            const categoryMatch = this.activeCategory === 'all' || product.category === this.activeCategory;
            const priceMatch = this.checkPriceRange(product.price, this.activePriceRange);
            const brandMatch = this.activeBrand === 'all' || this.checkBrand(product.title, this.activeBrand);
            
            return categoryMatch && priceMatch && brandMatch;
        });

        this.updateProductDisplay();
    }

    checkPriceRange(price, range) {
        if (range === 'all') return true;
        
        const numPrice = parseFloat(price.replace('$', '').replace(',', ''));
        
        switch (range) {
            case 'under-100':
                return numPrice < 100;
            case '100-300':
                return numPrice >= 100 && numPrice <= 300;
            case '300-600':
                return numPrice >= 300 && numPrice <= 600;
            case 'over-600':
                return numPrice > 600;
            default:
                return true;
        }
    }

    checkBrand(title, brand) {
        const titleLower = title.toLowerCase();
        const brandLower = brand.toLowerCase();
        return titleLower.includes(brandLower);
    }

    updateProductDisplay() {
        // This would update the product grid on shop page
        const productGrid = document.querySelector('.product-grid');
        if (productGrid) {
            this.renderFilteredProducts(productGrid);
        }
    }

    renderFilteredProducts(container) {
        container.innerHTML = '';
        
        this.filteredProducts.forEach((product, index) => {
            const productCard = this.createProductCard(product, index);
            container.appendChild(productCard);
        });
    }

    createProductCard(product, index) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <div class="product-icon">${product.icon}</div>
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${product.price}</div>
                <a href="${product.affiliateLink}" target="_blank" rel="noopener" class="product-btn">
                    Buy Now
                </a>
            </div>
        `;
        
        return card;
    }
}

// ============================================================================
// AUTO-PLAY FUNCTIONALITY
// ============================================================================

class AutoPlaySlider {
    constructor(slider, interval = 5000) {
        this.slider = slider;
        this.interval = interval;
        this.isPlaying = false;
        this.timer = null;
        
        this.init();
    }

    init() {
        this.start();
        
        // Pause on hover
        const sliderElement = document.querySelector('.products-slider');
        if (sliderElement) {
            sliderElement.addEventListener('mouseenter', () => this.pause());
            sliderElement.addEventListener('mouseleave', () => this.start());
        }

        // Pause when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
            } else {
                this.start();
            }
        });
    }

    start() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.timer = setInterval(() => {
                this.slider.nextSlide();
                
                // Reset to beginning when reaching the end
                const maxIndex = this.slider.products.length - this.slider.itemsPerView;
                if (this.slider.currentIndex >= maxIndex) {
                    setTimeout(() => {
                        this.slider.currentIndex = 0;
                        this.slider.updateSlider();
                    }, 1000);
                }
            }, this.interval);
        }
    }

    pause() {
        if (this.isPlaying) {
            this.isPlaying = false;
            clearInterval(this.timer);
        }
    }

    stop() {
        this.pause();
        this.slider.currentIndex = 0;
        this.slider.updateSlider();
    }
}

// ============================================================================
// PRODUCT RECOMMENDATIONS
// ============================================================================

class ProductRecommendations {
    constructor(products) {
        this.products = products;
    }

    getRecommendedProducts(currentProduct, count = 4) {
        // Simple recommendation based on category and price range
        const sameCategory = this.products.filter(p => 
            p.id !== currentProduct.id && 
            p.category === currentProduct.category
        );

        const currentPrice = parseFloat(currentProduct.price.replace('$', '').replace(',', ''));
        const priceRange = currentPrice * 0.3; // 30% price range
        
        const similarPrice = this.products.filter(p => {
            const productPrice = parseFloat(p.price.replace('$', '').replace(',', ''));
            return Math.abs(productPrice - currentPrice) <= priceRange && p.id !== currentProduct.id;
        });

        // Combine and prioritize
        const recommendations = [...sameCategory, ...similarPrice]
            .filter((product, index, self) => self.findIndex(p => p.id === product.id) === index)
            .slice(0, count);

        return recommendations;
    }

    displayRecommendations(container, recommendations) {
        container.innerHTML = '<h3>You might also like</h3>';
        
        const grid = document.createElement('div');
        grid.className = 'recommendations-grid';
        
        recommendations.forEach(product => {
            const card = this.createRecommendationCard(product);
            grid.appendChild(card);
        });
        
        container.appendChild(grid);
    }

    createRecommendationCard(product) {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.innerHTML = `
            <div class="rec-product-image">${product.icon}</div>
            <div class="rec-product-title">${product.title}</div>
            <div class="rec-product-price">${product.price}</div>
            <a href="${product.affiliateLink}" target="_blank" rel="noopener" class="rec-product-btn">
                View Product
            </a>
        `;
        
        return card;
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize product slider
    const productSlider = new ProductSlider();
    
    // Initialize auto-play (optional)
    const autoPlay = new AutoPlaySlider(productSlider, 6000);
    
    // Initialize product filter for shop page
    window.productFilter = new ProductFilter(featuredProducts);
    
    // Initialize recommendations
    window.productRecommendations = new ProductRecommendations(featuredProducts);
    
    // Make products data available globally
    window.featuredProducts = featuredProducts;
});

// ============================================================================
// AFFILIATE LINK TRACKING
// ============================================================================

function trackAffiliateClick(productId, productName, price) {
    // Track with Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'purchase_intent', {
            'product_id': productId,
            'product_name': productName,
            'value': parseFloat(price.replace('$', '').replace(',', '')),
            'currency': 'USD'
        });
    }
    
    // Track with Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'InitiateCheckout', {
            content_name: productName,
            value: parseFloat(price.replace('$', '').replace(',', '')),
            currency: 'USD'
        });
    }
    
    // Console log for debugging
    console.log(`Affiliate click tracked: ${productName} - ${price}`);
}

// ============================================================================
// PRICE COMPARISON
// ============================================================================

class PriceComparison {
    constructor() {
        this.retailers = [
            { name: 'Amazon', baseUrl: 'https://amazon.com/s?k=' },
            { name: 'Best Buy', baseUrl: 'https://bestbuy.com/site/searchpage.jsp?st=' },
            { name: 'Newegg', baseUrl: 'https://newegg.com/p/pl?d=' }
        ];
    }

    generateComparisonLinks(productName) {
        const searchTerm = encodeURIComponent(productName);
        return this.retailers.map(retailer => ({
            name: retailer.name,
            url: retailer.baseUrl + searchTerm
        }));
    }

    displayComparison(container, productName) {
        const links = this.generateComparisonLinks(productName);
        
        const comparisonDiv = document.createElement('div');
        comparisonDiv.className = 'price-comparison';
        comparisonDiv.innerHTML = `
            <h4>Compare Prices</h4>
            <div class="comparison-links">
                ${links.map(link => 
                    `<a href="${link.url}" target="_blank" rel="noopener" class="comparison-link">
                        ${link.name}
                    </a>`
                ).join('')}
            </div>
        `;
        
        container.appendChild(comparisonDiv);
    }
}

// Make available globally
window.PriceComparison = PriceComparison;