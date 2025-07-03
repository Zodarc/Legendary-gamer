/* ============================================================================
   LEGENDARY GAMER - Tips JavaScript
   Tips and courses page functionality
   ============================================================================ */

// Sample tips data
const tipsData = [
    {
        id: 1,
        title: "Ultimate Gaming Setup Guide 2024",
        category: "setup",
        type: "Guide",
        readTime: "8 min read",
        icon: "🖥️",
        excerpt: "Build the perfect gaming setup on any budget with our comprehensive guide."
    },
    {
        id: 2,
        title: "Streaming for Beginners: Complete Roadmap",
        category: "streaming",
        type: "Tutorial",
        readTime: "12 min read",
        icon: "📹",
        excerpt: "Everything you need to know to start streaming and build your audience."
    },
    {
        id: 3,
        title: "Pro Gaming Skills: Reaction Time Training",
        category: "skills",
        type: "Training",
        readTime: "6 min read",
        icon: "🎯",
        excerpt: "Scientifically-proven methods to improve your gaming performance."
    },
    {
        id: 4,
        title: "Monetize Your Gaming Passion",
        category: "monetization",
        type: "Strategy",
        readTime: "15 min read",
        icon: "💰",
        excerpt: "Turn your gaming hobby into a profitable side hustle or full-time career."
    },
    {
        id: 5,
        title: "Gaming Productivity Hacks",
        category: "productivity",
        type: "Tips",
        readTime: "5 min read",
        icon: "⚡",
        excerpt: "Optimize your gaming sessions and balance gaming with life goals."
    }
];

// Initialize tips page
document.addEventListener('DOMContentLoaded', function() {
    initializeTipsPage();
});

function initializeTipsPage() {
    initializeCategoryFilter();
    loadTips();
    initializeNewsletter();
}

// Category filtering
function initializeCategoryFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter tips
            const category = this.dataset.category;
            filterTips(category);
        });
    });
}

// Load and display tips
function loadTips(category = 'all') {
    const tipsGrid = document.getElementById('tips-grid');
    if (!tipsGrid) return;
    
    let filteredTips = tipsData;
    
    if (category !== 'all') {
        filteredTips = tipsData.filter(tip => tip.category === category);
    }
    
    tipsGrid.innerHTML = '';
    
    filteredTips.forEach((tip, index) => {
        const tipCard = createTipCard(tip, index);
        tipsGrid.appendChild(tipCard);
    });
    
    // Trigger animations
    setTimeout(() => {
        const cards = tipsGrid.querySelectorAll('.tip-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 100);
        });
    }, 100);
}

// Create tip card element
function createTipCard(tip, index) {
    const card = document.createElement('div');
    card.className = 'tip-card';
    
    card.innerHTML = `
        <div class="tip-image">
            <div class="tip-icon">${tip.icon}</div>
            <div class="tip-type">${tip.type}</div>
        </div>
        <div class="tip-content">
            <h3 class="tip-title">${tip.title}</h3>
            <p class="tip-excerpt">${tip.excerpt}</p>
            <div class="tip-meta">
                <span class="read-time">📖 ${tip.readTime}</span>
                <span class="tip-category">${tip.category.toUpperCase()}</span>
            </div>
            <a href="#" class="tip-read-btn" onclick="openTip(${tip.id})">Read More</a>
        </div>
    `;
    
    return card;
}

// Filter tips by category
function filterTips(category) {
    loadTips(category);
}

// Open tip detail (placeholder function)
function openTip(tipId) {
    const tip = tipsData.find(t => t.id === tipId);
    if (!tip) return;
    
    alert(`Opening: ${tip.title}\n\nIn a real implementation, this would open the full article or redirect to a detailed page.`);
}

// Newsletter functionality
function initializeNewsletter() {
    const newsletterForm = document.getElementById('tips-newsletter');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate newsletter signup
            alert('Thanks for joining the Learning Community! 🎓\n\nYou\'ll receive weekly gaming tips and exclusive course discounts.');
            
            // Clear form
            this.reset();
        });
    }
}

// Course preview functionality
function showCoursePreview() {
    alert('Course Preview\n\n🎓 Complete Gaming Content Creator Masterclass\n\nWhat you\'ll learn:\n• Professional streaming setup\n• YouTube channel optimization\n• Content creation strategies\n• Monetization techniques\n• Community building\n\nIn a real implementation, this would show an actual course preview video.');
}

// Footer filter function
window.filterTips = filterTips;