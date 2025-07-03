/* ============================================================================
   LEGENDARY GAMER - Games JavaScript
   Game data, filtering, and interactive features
   ============================================================================ */

// ============================================================================
// GAMES DATA
// ============================================================================

const gamesDatabase = [
    {
        id: 1,
        title: "Black Myth: Wukong",
        genre: "action",
        platform: ["pc", "playstation"],
        rating: 9.2,
        price: "$59.99",
        icon: "🐒",
        description: "Action RPG rooted in Chinese mythology",
        steamLink: "https://store.steampowered.com/app/2358720/Black_Myth_Wukong/",
        psLink: "https://www.playstation.com/en-us/games/black-myth-wukong/",
        category: "featured",
        releaseDate: "2024"
    },
    {
        id: 2,
        title: "Cyberpunk 2077",
        genre: "rpg",
        platform: ["pc", "playstation", "xbox"],
        rating: 8.5,
        price: "$29.99",
        icon: "🤖",
        description: "Open-world futuristic RPG",
        steamLink: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
        category: "popular",
        releaseDate: "2020"
    },
    {
        id: 3,
        title: "Call of Duty: Warzone",
        genre: "fps",
        platform: ["pc", "playstation", "xbox"],
        rating: 8.0,
        price: "Free",
        icon: "🔫",
        description: "Battle Royale FPS experience",
        steamLink: "https://www.callofduty.com/warzone",
        category: "popular",
        releaseDate: "2020"
    },
    {
        id: 4,
        title: "The Legend of Zelda: Tears of the Kingdom",
        genre: "action",
        platform: ["nintendo"],
        rating: 9.6,
        price: "$69.99",
        icon: "🗡️",
        description: "Epic adventure in Hyrule",
        nintendoLink: "https://www.nintendo.com/us/store/products/the-legend-of-zelda-tears-of-the-kingdom-switch/",
        category: "rated",
        releaseDate: "2023"
    },
    {
        id: 5,
        title: "FIFA 24",
        genre: "sports",
        platform: ["pc", "playstation", "xbox", "nintendo"],
        rating: 7.8,
        price: "$59.99",
        icon: "⚽",
        description: "Ultimate football simulation",
        steamLink: "https://store.steampowered.com/app/2420110/EA_SPORTS_FC_24/",
        category: "popular",
        releaseDate: "2023"
    },
    {
        id: 6,
        title: "Elden Ring",
        genre: "action",
        platform: ["pc", "playstation", "xbox"],
        rating: 9.4,
        price: "$39.99",
        icon: "💍",
        description: "Dark fantasy action RPG",
        steamLink: "https://store.steampowered.com/app/1245620/ELDEN_RING/",
        category: "rated",
        releaseDate: "2022"
    },
    {
        id: 7,
        title: "Counter-Strike 2",
        genre: "fps",
        platform: ["pc"],
        rating: 8.8,
        price: "Free",
        icon: "🎯",
        description: "Tactical FPS competitive gaming",
        steamLink: "https://store.steampowered.com/app/730/CounterStrike_2/",
        category: "popular",
        releaseDate: "2023"
    },
    {
        id: 8,
        title: "Baldur's Gate 3",
        genre: "rpg",
        platform: ["pc", "playstation"],
        rating: 9.5,
        price: "$59.99",
        icon: "🐉",
        description: "Turn-based RPG masterpiece",
        steamLink: "https://store.steampowered.com/app/1086940/Baldurs_Gate_3/",
        category: "rated",
        releaseDate: "2023"
    },
    {
        id: 9,
        title: "Gran Turismo 7",
        genre: "racing",
        platform: ["playstation"],
        rating: 8.2,
        price: "$49.99",
        icon: "🏎️",
        description: "Ultimate racing simulation",
        psLink: "https://www.playstation.com/en-us/games/gran-turismo-7/",
        category: "popular",
        releaseDate: "2022"
    },
    {
        id: 10,
        title: "Hollow Knight",
        genre: "indie",
        platform: ["pc", "playstation", "xbox", "nintendo"],
        rating: 9.0,
        price: "$14.99",
        icon: "🦋",
        description: "Atmospheric metroidvania adventure",
        steamLink: "https://store.steampowered.com/app/367520/Hollow_Knight/",
        category: "hidden",
        releaseDate: "2017"
    },
    {
        id: 11,
        title: "Starfield",
        genre: "rpg",
        platform: ["pc", "xbox"],
        rating: 7.5,
        price: "$69.99",
        icon: "🚀",
        description: "Space exploration RPG",
        steamLink: "https://store.steampowered.com/app/1716740/Starfield/",
        category: "new",
        releaseDate: "2023"
    },
    {
        id: 12,
        title: "Civilization VI",
        genre: "strategy",
        platform: ["pc", "playstation", "xbox", "nintendo"],
        rating: 8.9,
        price: "$29.99",
        icon: "🏛️",
        description: "Turn-based strategy empire building",
        steamLink: "https://store.steampowered.com/app/289070/Sid_Meiers_Civilization_VI/",
        category: "rated",
        releaseDate: "2016"
    }
];

// ============================================================================
// GAMES PAGE INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeGamesPage();
});

function initializeGamesPage() {
    initializePlatformFilter();
    initializeGenreFilter();
    initializeLoadMore();
    loadGames();
}

// ============================================================================
// GAME DISPLAY FUNCTIONS
// ============================================================================

let currentlyDisplayed = 8;
let currentFilter = { platform: 'all', genre: 'all', category: 'all' };

function loadGames() {
    const gamesGrid = document.getElementById('games-grid');
    if (!gamesGrid) return;
    
    const filteredGames = applyCurrentFilters();
    const gamesToShow = filteredGames.slice(0, currentlyDisplayed);
    
    gamesGrid.innerHTML = '';
    
    gamesToShow.forEach((game, index) => {
        const gameCard = createGameCard(game, index);
        gamesGrid.appendChild(gameCard);
    });
    
    // Update load more button
    updateLoadMoreButton(filteredGames.length);
    
    // Trigger animations
    setTimeout(() => {
        const cards = gamesGrid.querySelectorAll('.game-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 100);
        });
    }, 100);
}

function createGameCard(game, index) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.dataset.genre = game.genre;
    card.dataset.platform = game.platform.join(',');
    card.dataset.rating = game.rating;
    
    const platforms = game.platform.map(p => getPlatformIcon(p)).join(' ');
    const purchaseLinks = generatePurchaseLinks(game);
    
    card.innerHTML = `
        <div class="game-image">
            <div class="game-icon">${game.icon}</div>
            <div class="game-rating-badge">⭐ ${game.rating}</div>
            <div class="game-platforms">${platforms}</div>
            <div class="game-overlay">
                <button class="quick-info-btn" onclick="showGameInfo(${game.id})">ℹ️ Info</button>
                <button class="trailer-btn" onclick="openTrailer('${game.title}')">▶️ Trailer</button>
            </div>
        </div>
        <div class="game-content">
            <h3 class="game-title">${game.title}</h3>
            <p class="game-description">${game.description}</p>
            <div class="game-meta">
                <span class="game-genre">${game.genre.toUpperCase()}</span>
                <span class="game-year">${game.releaseDate}</span>
            </div>
            <div class="game-price">${game.price}</div>
            <div class="game-actions">
                ${purchaseLinks}
            </div>
        </div>
    `;
    
    return card;
}

function getPlatformIcon(platform) {
    const icons = {
        pc: '🖥️',
        playstation: '🎮',
        xbox: '🕹️',
        nintendo: '🎯'
    };
    return icons[platform] || '❓';
}

function generatePurchaseLinks(game) {
    let links = [];
    
    if (game.steamLink) {
        links.push(`<a href="${game.steamLink}" target="_blank" rel="noopener" class="purchase-btn steam">Steam</a>`);
    }
    
    if (game.psLink) {
        links.push(`<a href="${game.psLink}" target="_blank" rel="noopener" class="purchase-btn playstation">PlayStation</a>`);
    }
    
    if (game.xboxLink) {
        links.push(`<a href="${game.xboxLink}" target="_blank" rel="noopener" class="purchase-btn xbox">Xbox</a>`);
    }
    
    if (game.nintendoLink) {
        links.push(`<a href="${game.nintendoLink}" target="_blank" rel="noopener" class="purchase-btn nintendo">Nintendo</a>`);
    }
    
    return links.join('');
}

// ============================================================================
// FILTERING FUNCTIONS
// ============================================================================

function initializePlatformFilter() {
    const platformBtns = document.querySelectorAll('.platform-btn');
    
    platformBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            platformBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update filter and reload games
            currentFilter.platform = this.dataset.platform;
            currentlyDisplayed = 8;
            loadGames();
        });
    });
}

function initializeGenreFilter() {
    const genreFilter = document.getElementById('genre-filter');
    
    if (genreFilter) {
        genreFilter.addEventListener('change', function() {
            currentFilter.genre = this.value;
            currentlyDisplayed = 8;
            loadGames();
        });
    }
}

function applyCurrentFilters() {
    let filtered = [...gamesDatabase];
    
    // Filter by platform
    if (currentFilter.platform !== 'all') {
        filtered = filtered.filter(game => 
            game.platform.includes(currentFilter.platform)
        );
    }
    
    // Filter by genre
    if (currentFilter.genre !== 'all') {
        filtered = filtered.filter(game => game.genre === currentFilter.genre);
    }
    
    // Filter by category
    if (currentFilter.category !== 'all') {
        filtered = filtered.filter(game => game.category === currentFilter.category);
    }
    
    return filtered;
}

// ============================================================================
// LOAD MORE FUNCTIONALITY
// ============================================================================

function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentlyDisplayed += 4;
            loadGames();
        });
    }
}

function updateLoadMoreButton(totalGames) {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;
    
    if (currentlyDisplayed >= totalGames) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.textContent = `Load More Games (${totalGames - currentlyDisplayed} remaining)`;
    }
}

// ============================================================================
// GAME DISCOVERY FUNCTIONS
// ============================================================================

function filterGames(category) {
    currentFilter.category = category;
    currentlyDisplayed = 8;
    
    // Update active platform button to 'all' for discovery
    const platformBtns = document.querySelectorAll('.platform-btn');
    platformBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.platform === 'all') {
            btn.classList.add('active');
        }
    });
    
    currentFilter.platform = 'all';
    loadGames();
    
    // Scroll to games section
    document.getElementById('games-grid').scrollIntoView({
        behavior: 'smooth'
    });
}

// ============================================================================
// GAME INFO MODAL
// ============================================================================

function showGameInfo(gameId) {
    const game = gamesDatabase.find(g => g.id === gameId);
    if (!game) return;
    
    const modal = document.createElement('div');
    modal.className = 'game-info-modal';
    modal.innerHTML = `
        <div class="game-info-content">
            <button class="close-modal" onclick="closeGameInfo()">✕</button>
            <div class="game-info-header">
                <div class="game-info-icon">${game.icon}</div>
                <div class="game-info-details">
                    <h2>${game.title}</h2>
                    <div class="game-info-rating">
                        <span class="stars">${generateGameStars(game.rating)}</span>
                        <span class="rating-number">${game.rating}/10</span>
                    </div>
                    <div class="game-info-meta">
                        <span class="genre-tag">${game.genre.toUpperCase()}</span>
                        <span class="year-tag">${game.releaseDate}</span>
                    </div>
                </div>
            </div>
            <div class="game-info-body">
                <p class="game-full-description">${game.description}</p>
                <div class="game-info-platforms">
                    <h4>Available On:</h4>
                    <div class="platform-icons">
                        ${game.platform.map(p => `<span class="platform-icon">${getPlatformIcon(p)} ${p.charAt(0).toUpperCase() + p.slice(1)}</span>`).join('')}
                    </div>
                </div>
                <div class="game-info-price">
                    <h4>Price: <span class="price-highlight">${game.price}</span></h4>
                </div>
                <div class="game-info-actions">
                    ${generatePurchaseLinks(game)}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function closeGameInfo() {
    const modal = document.querySelector('.game-info-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function generateGameStars(rating) {
    const stars = Math.round(rating / 2); // Convert 10-point to 5-star
    let starString = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < stars) {
            starString += '⭐';
        } else {
            starString += '☆';
        }
    }
    
    return starString;
}

// ============================================================================
// TRAILER FUNCTIONALITY
// ============================================================================

function openTrailer(gameTitle) {
    // In a real implementation, you'd have actual trailer links
    const trailerModal = document.createElement('div');
    trailerModal.className = 'trailer-modal';
    trailerModal.innerHTML = `
        <div class="trailer-content">
            <button class="close-modal" onclick="closeTrailer()">✕</button>
            <div class="trailer-placeholder">
                <div class="trailer-icon">🎬</div>
                <h3>${gameTitle} Trailer</h3>
                <p>Trailer would be embedded here</p>
                <p>In a real implementation, this would show the actual game trailer</p>
                <button class="watch-youtube-btn" onclick="searchYouTube('${gameTitle} trailer')">
                    Search on YouTube
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(trailerModal);
    
    setTimeout(() => {
        trailerModal.classList.add('show');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function closeTrailer() {
    const modal = document.querySelector('.trailer-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function searchYouTube(query) {
    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(youtubeUrl, '_blank');
    closeTrailer();
}

// ============================================================================
// FOOTER FILTER FUNCTIONS
// ============================================================================

function filterByGenre(genre) {
    const genreFilter = document.getElementById('genre-filter');
    if (genreFilter) {
        genreFilter.value = genre;
        currentFilter.genre = genre;
        currentlyDisplayed = 8;
        loadGames();
        
        // Scroll to games section
        document.getElementById('games-grid').scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function trackGameClick(gameId, gameTitle, platform) {
    console.log(`Game clicked: ${gameTitle} on ${platform}`);
    
    // Track with analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'game_click', {
            'game_title': gameTitle,
            'platform': platform,
            'game_id': gameId
        });
    }
}

// ============================================================================
// GAME RECOMMENDATIONS
// ============================================================================

function getRecommendedGames(currentGame, count = 3) {
    return gamesDatabase
        .filter(game => game.id !== currentGame.id && game.genre === currentGame.genre)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, count);
}

// ============================================================================
// SEARCH FUNCTIONALITY
// ============================================================================

function searchGames(query) {
    const searchQuery = query.toLowerCase();
    const results = gamesDatabase.filter(game => 
        game.title.toLowerCase().includes(searchQuery) ||
        game.description.toLowerCase().includes(searchQuery) ||
        game.genre.toLowerCase().includes(searchQuery)
    );
    
    return results;
}

// ============================================================================
// PLATFORM LINK TRACKING
// ============================================================================

// Add click tracking to purchase buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('purchase-btn')) {
        const gameCard = e.target.closest('.game-card');
        const gameTitle = gameCard.querySelector('.game-title').textContent;
        const platform = e.target.textContent;
        
        trackGameClick(null, gameTitle, platform);
    }
});

// ============================================================================
// INITIALIZATION
// ============================================================================

// Auto-load games when page loads
window.addEventListener('load', function() {
    // Add any additional initialization here
    console.log('🎮 Games page loaded successfully!');
});