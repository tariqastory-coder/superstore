// Product Data (Refactored to use localStorage)
const INITIAL_PRODUCTS = [
  // Grocery
  {
    id: 1,
    name: "Organic Brown Rice 2kg",
    price: 8.99,
    category: "grocery",
    rating: 4.8,
    reviews: 342,
    image: "images/organic-brown-rice-2kg.jpg",
    description: "Premium organic brown rice sourced from sustainable farms. Perfect for daily meals.",
    inStock: true
  },
  {
    id: 2,
    name: "Extra Virgin Olive Oil 500ml",
    price: 12.99,
    category: "grocery",
    rating: 4.9,
    reviews: 215,
    image: "images/extra-virgin-olive-oil.jpg",
    description: "Cold-pressed extra virgin olive oil with authentic taste.",
    inStock: true
  },
  {
    id: 3,
    name: "Whole Wheat Bread Flour 1kg",
    price: 5.99,
    category: "grocery",
    rating: 4.7,
    reviews: 128,
    image: "images/whole-wheat-flour.png",
    description: "High-quality whole wheat flour for baking fresh bread at home.",
    inStock: true
  },
  {
    id: 4,
    name: "Mixed Vegetables Frozen 500g",
    price: 4.49,
    category: "grocery",
    rating: 4.6,
    reviews: 89,
    image: "images/frozen-mixed-vegetables.jpg",
    description: "Fresh frozen mixed vegetables including carrots, peas, and corn.",
    inStock: true
  },
  // Bakery
  {
    id: 5,
    name: "Artisan Sourdough Loaf",
    price: 6.49,
    category: "bakery",
    rating: 4.9,
    reviews: 267,
    image: "images/artisan-sourdough-loaf.jpg",
    description: "Traditional artisan sourdough bread baked fresh daily.",
    inStock: true
  },
  {
    id: 6,
    name: "Croissants Pack of 4",
    price: 7.99,
    category: "bakery",
    rating: 4.8,
    reviews: 412,
    image: "images/fresh-croissants.jpg",
    description: "Buttery, crispy croissants perfect for breakfast.",
    inStock: true
  },
  {
    id: 7,
    name: "Chocolate Chip Muffins 6pc",
    price: 5.49,
    category: "bakery",
    rating: 4.7,
    reviews: 156,
    image: "images/chocolate-chip-muffins.jpg",
    description: "Freshly baked chocolate chip muffins with premium chocolate.",
    inStock: true
  },
  // Baby Care
  {
    id: 8,
    name: "Gentle Baby Wipes 200pc",
    price: 8.99,
    category: "baby-care",
    rating: 4.9,
    reviews: 834,
    image: "images/baby-wipes.jpg",
    description: "Hypoallergenic baby wipes, soft and gentle on sensitive skin.",
    inStock: true
  },
  {
    id: 9,
    name: "Baby Formula 500g",
    price: 16.99,
    category: "baby-care",
    rating: 4.8,
    reviews: 523,
    image: "images/baby-formula.jpg",
    description: "Nutritious infant formula with essential vitamins and minerals.",
    inStock: true
  },
  {
    id: 10,
    name: "Infant Diaper Size S Pack",
    price: 19.99,
    category: "baby-care",
    rating: 4.7,
    reviews: 445,
    image: "images/baby-diapers.png",
    description: "Premium quality diapers with excellent absorbency.",
    inStock: true
  },
  // Health & Beauty
  {
    id: 11,
    name: "Natural Face Moisturizer 50ml",
    price: 14.99,
    category: "health-beauty",
    rating: 4.8,
    reviews: 321,
    image: "images/face-moisturizer-cream.png",
    description: "Lightweight natural moisturizer for all skin types.",
    inStock: true
  },
  {
    id: 12,
    name: "Whitening Toothpaste 100ml",
    price: 5.99,
    category: "health-beauty",
    rating: 4.6,
    reviews: 278,
    image: "images/whitening-toothpaste.jpg",
    description: "Effective whitening toothpaste with natural ingredients.",
    inStock: true
  },
  {
    id: 13,
    name: "Vitamin C Serum 30ml",
    price: 22.99,
    category: "health-beauty",
    rating: 4.9,
    reviews: 389,
    image: "images/vitamin-c-serum.png",
    description: "Brightening vitamin C serum for youthful glow.",
    inStock: true
  },
  // Household
  {
    id: 14,
    name: "Multi-Surface Cleaner 500ml",
    price: 3.99,
    category: "household",
    rating: 4.7,
    reviews: 612,
    image: "images/multi-surface-cleaner.png",
    description: "Effective cleaning solution for all household surfaces.",
    inStock: true
  },
  {
    id: 15,
    name: "Laundry Detergent 2L",
    price: 7.49,
    category: "household",
    rating: 4.8,
    reviews: 456,
    image: "images/laundry-detergent.png",
    description: "Powerful laundry detergent that removes tough stains.",
    inStock: true
  },
  {
    id: 16,
    name: "Dish Soap 750ml",
    price: 2.99,
    category: "household",
    rating: 4.6,
    reviews: 334,
    image: "images/dish-soap.png",
    description: "Gentle yet effective dish soap for sparkling clean dishes.",
    inStock: true
  },
  // Drinks
  {
    id: 17,
    name: "Orange Juice 1L Fresh",
    price: 4.99,
    category: "drinks",
    rating: 4.8,
    reviews: 267,
    image: "images/fresh-orange-juice.png",
    description: "Freshly squeezed orange juice packed with vitamin C.",
    inStock: true
  },
  {
    id: 18,
    name: "Green Tea Bags 50pc",
    price: 6.99,
    category: "drinks",
    rating: 4.7,
    reviews: 289,
    image: "images/green-tea-bags.jpg",
    description: "Premium quality organic green tea bags.",
    inStock: true
  },
  {
    id: 19,
    name: "Coffee Beans 250g",
    price: 9.99,
    category: "drinks",
    rating: 4.9,
    reviews: 423,
    image: "images/premium-coffee-beans.jpg",
    description: "Freshly roasted arabica coffee beans with rich flavor.",
    inStock: true
  },
  // Crockery
  {
    id: 20,
    name: "Ceramic Dinner Plates Set 6",
    price: 24.99,
    category: "crockery",
    rating: 4.8,
    reviews: 198,
    image: "images/ceramic-dinner-plates-set.jpg",
    description: "Elegant ceramic dinner plates, dishwasher safe.",
    inStock: true
  },
  {
    id: 21,
    name: "Stainless Steel Spoon Set 12",
    price: 15.99,
    category: "crockery",
    rating: 4.7,
    reviews: 156,
    image: "images/stainless-steel-spoon-set.jpg",
    description: "Durable stainless steel spoon set for everyday use.",
    inStock: true
  },
  {
    id: 22,
    name: "Glass Bowls Set 4",
    price: 12.99,
    category: "crockery",
    rating: 4.6,
    reviews: 234,
    image: "images/glass-bowls-set.jpg",
    description: "Clear glass bowls perfect for serving and storage.",
    inStock: true
  },
  // Additional Grocery Items
  {
    id: 23,
    name: "Organic Pasta 500g",
    price: 3.99,
    category: "grocery",
    rating: 4.7,
    reviews: 198,
    image: "images/whole-wheat-flour.png",
    description: "Premium organic pasta made from durum wheat semolina.",
    inStock: true
  },
  {
    id: 24,
    name: "Basmati Rice 5kg",
    price: 15.99,
    category: "grocery",
    rating: 4.9,
    reviews: 412,
    image: "images/rustic-sourdough-loaf.png",
    description: "Long grain basmati rice with authentic aroma and taste.",
    inStock: true
  },
  {
    id: 25,
    name: "Canned Tomatoes 400g",
    price: 1.99,
    category: "grocery",
    rating: 4.5,
    reviews: 156,
    image: "images/grocery-shopping-fresh-produce-and-products.jpg",
    description: "Premium quality canned tomatoes perfect for cooking.",
    inStock: true
  },
  {
    id: 26,
    name: "Honey Jar 500g",
    price: 8.49,
    category: "grocery",
    rating: 4.8,
    reviews: 234,
    image: "images/pile-of-coffee-beans.png",
    description: "Pure natural honey with rich flavor and nutrients.",
    inStock: true
  },
  // Additional Bakery Items
  {
    id: 27,
    name: "Baguette Fresh",
    price: 2.99,
    category: "bakery",
    rating: 4.8,
    reviews: 289,
    image: "images/fresh-croissants.jpg",
    description: "Classic French baguette baked fresh daily.",
    inStock: true
  },
  {
    id: 28,
    name: "Blueberry Scones 4pc",
    price: 6.49,
    category: "bakery",
    rating: 4.7,
    reviews: 167,
    image: "images/artisan-sourdough-loaf.jpg",
    description: "Delicious blueberry scones perfect for tea time.",
    inStock: true
  },
  {
    id: 29,
    name: "Cinnamon Rolls 6pc",
    price: 7.49,
    category: "bakery",
    rating: 4.9,
    reviews: 345,
    image: "images/rustic-sourdough-loaf.png",
    description: "Soft and fluffy cinnamon rolls with cream cheese frosting.",
    inStock: true
  },
  {
    id: 30,
    name: "Whole Grain Bread",
    price: 4.99,
    category: "bakery",
    rating: 4.6,
    reviews: 223,
    image: "images/whole-wheat-flour.png",
    description: "Nutritious whole grain bread packed with fiber.",
    inStock: true
  },
  // Additional Baby Care Items
  {
    id: 31,
    name: "Baby Shampoo 300ml",
    price: 7.99,
    category: "baby-care",
    rating: 4.8,
    reviews: 456,
    image: "images/baby-formula.jpg",
    description: "Gentle tear-free baby shampoo with natural ingredients.",
    inStock: true
  },
  {
    id: 32,
    name: "Baby Lotion 250ml",
    price: 9.49,
    category: "baby-care",
    rating: 4.7,
    reviews: 378,
    image: "images/baby-diapers.png",
    description: "Moisturizing baby lotion for soft and smooth skin.",
    inStock: true
  },
  {
    id: 33,
    name: "Baby Powder 200g",
    price: 5.99,
    category: "baby-care",
    rating: 4.6,
    reviews: 289,
    image: "images/whitening-toothpaste.jpg",
    description: "Talc-free baby powder that keeps skin dry and fresh.",
    inStock: true
  },
  {
    id: 34,
    name: "Feeding Bottles 3pc Set",
    price: 12.99,
    category: "baby-care",
    rating: 4.9,
    reviews: 512,
    image: "images/baby-wipes.jpg",
    description: "BPA-free baby feeding bottles with anti-colic design.",
    inStock: true
  },
  // Additional Health & Beauty Items
  {
    id: 35,
    name: "Shampoo 400ml",
    price: 8.99,
    category: "health-beauty",
    rating: 4.7,
    reviews: 423,
    image: "images/vitamin-serum.jpg",
    description: "Nourishing shampoo for healthy and shiny hair.",
    inStock: true
  },
  {
    id: 36,
    name: "Body Wash 500ml",
    price: 6.99,
    category: "health-beauty",
    rating: 4.6,
    reviews: 367,
    image: "images/whitening-toothpaste.jpg",
    description: "Refreshing body wash with natural extracts.",
    inStock: true
  },
  {
    id: 37,
    name: "Hand Cream 75ml",
    price: 4.99,
    category: "health-beauty",
    rating: 4.8,
    reviews: 298,
    image: "images/face-moisturizer-cream.png",
    description: "Intensive hand cream for soft and smooth hands.",
    inStock: true
  },
  {
    id: 38,
    name: "Sunscreen SPF 50 100ml",
    price: 11.99,
    category: "health-beauty",
    rating: 4.9,
    reviews: 445,
    image: "images/vitamin-serum.jpg",
    description: "Broad spectrum sunscreen for ultimate sun protection.",
    inStock: true
  },
  // Additional Household Items
  {
    id: 39,
    name: "Glass Cleaner 500ml",
    price: 3.49,
    category: "household",
    rating: 4.6,
    reviews: 234,
    image: "images/dish-soap.png",
    description: "Streak-free glass cleaner for sparkling windows.",
    inStock: true
  },
  {
    id: 40,
    name: "Toilet Cleaner 750ml",
    price: 4.49,
    category: "household",
    rating: 4.7,
    reviews: 389,
    image: "images/laundry-detergent.png",
    description: "Powerful toilet cleaner that removes stains and odors.",
    inStock: true
  },
  {
    id: 41,
    name: "Floor Cleaner 1L",
    price: 5.99,
    category: "household",
    rating: 4.8,
    reviews: 456,
    image: "images/multi-surface-cleaner.png",
    description: "Multi-purpose floor cleaner for all floor types.",
    inStock: true
  },
  {
    id: 42,
    name: "Fabric Softener 1.5L",
    price: 6.49,
    category: "household",
    rating: 4.7,
    reviews: 312,
    image: "images/dish-soap.png",
    description: "Fabric softener that leaves clothes soft and fragrant.",
    inStock: true
  },
  // Additional Drinks Items
  {
    id: 43,
    name: "Sparkling Water 1.5L",
    price: 1.99,
    category: "drinks",
    rating: 4.5,
    reviews: 178,
    image: "images/green-tea-bags.jpg",
    description: "Refreshing sparkling water with natural minerals.",
    inStock: true
  },
  {
    id: 44,
    name: "Apple Juice 1L",
    price: 4.49,
    category: "drinks",
    rating: 4.7,
    reviews: 234,
    image: "images/pile-of-coffee-beans.png",
    description: "Pure apple juice made from fresh apples.",
    inStock: true
  },
  {
    id: 45,
    name: "Herbal Tea Mix 40pc",
    price: 5.99,
    category: "drinks",
    rating: 4.6,
    reviews: 267,
    image: "images/fresh-orange-juice.png",
    description: "Assorted herbal tea bags with natural flavors.",
    inStock: true
  },
  {
    id: 46,
    name: "Hot Chocolate Mix 400g",
    price: 7.99,
    category: "drinks",
    rating: 4.8,
    reviews: 345,
    image: "images/pile-of-coffee-beans.png",
    description: "Rich and creamy hot chocolate mix for cozy moments.",
    inStock: true
  },
  // Additional Crockery Items
  {
    id: 47,
    name: "Coffee Mugs Set 6",
    price: 18.99,
    category: "crockery",
    rating: 4.7,
    reviews: 189,
    image: "images/glass-bowls-set.jpg",
    description: "Elegant ceramic coffee mugs perfect for daily use.",
    inStock: true
  },
  {
    id: 48,
    name: "Cutlery Set 24pc",
    price: 29.99,
    category: "crockery",
    rating: 4.9,
    reviews: 267,
    image: "images/stainless-steel-spoon-set.jpg",
    description: "Complete stainless steel cutlery set for 6 people.",
    inStock: true
  },
  {
    id: 49,
    name: "Serving Platter Large",
    price: 16.99,
    category: "crockery",
    rating: 4.6,
    reviews: 145,
    image: "images/stainless-steel-spoon-set.jpg",
    description: "Large ceramic serving platter for entertaining guests.",
    inStock: true
  },
  {
    id: 50,
    name: "Wine Glasses Set 4",
    price: 22.99,
    category: "crockery",
    rating: 4.8,
    reviews: 198,
    image: "images/ceramic-dinner-plates-set.jpg",
    description: "Crystal clear wine glasses for special occasions.",
    inStock: true
  }
];

let products = loadProducts();

function loadProducts() {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    return JSON.parse(storedProducts);
  } else {
    // Initial load
    localStorage.setItem('products', JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
}

function saveProducts(updatedProducts) {
  products = updatedProducts;
  localStorage.setItem('products', JSON.stringify(products));
}

// Header functionality
function initHeader() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const searchForm = document.getElementById('search-form');
  const mobileSearchForm = document.getElementById('mobile-search-form');

  // Mobile menu toggle
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
    });
  }

  // Search functionality
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }
  if (mobileSearchForm) {
    mobileSearchForm.addEventListener('submit', handleSearch);
  }

  // Update cart and wishlist counts
  updateHeaderCounts();
}

function handleSearch(e) {
  e.preventDefault();
  const searchInput = e.target.querySelector('input[name="search"]');
  if (searchInput && searchInput.value.trim()) {
    window.location.href = `products.html?search=${encodeURIComponent(searchInput.value)}`;
  }
}

// Cart and Wishlist Storage Helpers
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function getWishlist() {
  const wishlist = localStorage.getItem('wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
}

function toggleWishlist(id) {
  let wishlist = getWishlist();
  const index = wishlist.indexOf(id);

  if (index === -1) {
    wishlist.push(id);
  } else {
    wishlist.splice(index, 1);
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateHeaderCounts();

  // Update all buttons for this product
  document.querySelectorAll(`.wishlist-btn[data-product-id="${id}"]`).forEach(btn => {
    const icon = btn.querySelector('i');
    if (wishlist.includes(id)) {
      icon.classList.remove('far');
      icon.classList.add('fas');
      btn.classList.add('active');
    } else {
      icon.classList.remove('fas');
      icon.classList.add('far');
      btn.classList.remove('active');
    }
  });
}

function updateHeaderCounts() {
  const cart = getCart();
  const wishlist = getWishlist();

  const cartCount = document.getElementById('cart-count');
  const wishlistCount = document.getElementById('wishlist-count');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCount) {
    if (totalItems > 0) {
      cartCount.textContent = totalItems;
      cartCount.style.display = 'flex';
    } else {
      cartCount.style.display = 'none';
    }
  }

  if (wishlistCount) {
    if (wishlist.length > 0) {
      wishlistCount.textContent = wishlist.length;
      wishlistCount.style.display = 'flex';
    } else {
      wishlistCount.style.display = 'none';
    }
  }
}

// Share Modal
function openShareModal(productName) {
  const modal = document.getElementById('share-modal');
  if (modal) {
    modal.style.display = 'flex';
    modal.dataset.productName = productName;
  }
}

function closeShareModal() {
  const modal = document.getElementById('share-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function shareViaWhatsApp() {
  const modal = document.getElementById('share-modal');
  const productName = modal ? modal.dataset.productName : 'Featured Product';
  const text = `Check out this amazing product on Rhyll: "${productName}" - Premium groceries delivered to your door!`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, '_blank');
}


function shareViaFacebook() {
  const url = window.location.href;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(facebookUrl, '_blank');
}

function copyShareLink() {
  const modal = document.getElementById('share-modal');
  const productName = modal ? modal.dataset.productName : '';
  const url = `${window.location.origin}/products.html?featured=${encodeURIComponent(productName)}`;

  navigator.clipboard.writeText(url).then(() => {
    alert('Link copied to clipboard!');
  });
}

// Utility function to get product by ID
function getProductById(id) {
  const currentProducts = loadProducts(); // Always get fresh data
  return currentProducts.find(p => p.id === parseInt(id));
}

// Utility function to filter products
function filterProducts(category = null, searchQuery = null) {
  const currentProducts = loadProducts(); // Always get fresh data
  let filtered = currentProducts;

  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }

  return filtered;
}

// Card Mouse Effect
function initCardEffects() {
  document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Wishlist Persistence
function initWishlistState() {
  const wishlist = getWishlist();
  wishlist.forEach(id => {
    document.querySelectorAll(`.wishlist-btn[data-product-id="${id}"]`).forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.classList.add('active');
      }
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initCardEffects();
  setTimeout(initWishlistState, 100);

  // Check if user is logged in
  const user = getCurrentUser();
  updateAuthUI(user);
});

function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

function updateAuthUI(user) {
  const loginLink = document.getElementById('login-link');
  const signupBtn = document.getElementById('signup-btn');
  const accountLink = document.getElementById('account-link');
  const logoutBtn = document.getElementById('logout-btn');

  if (user) {
    if (loginLink) loginLink.style.display = 'none';
    if (signupBtn) signupBtn.style.display = 'none';
    if (accountLink) accountLink.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'block';
  } else {
    if (loginLink) loginLink.style.display = 'block';
    if (signupBtn) signupBtn.style.display = 'block';
    if (accountLink) accountLink.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
}

function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

document.addEventListener("DOMContentLoaded", () => {

  function initSlider(containerId, startIndex = 0, autoPlay = true, delay = 5000) {
    const slider = document.getElementById(containerId);
    if (!slider) return;

    const slides = slider.querySelectorAll(".slider-slide");
    const dots   = slider.querySelectorAll(".slider-dot");
    const prev   = slider.querySelector(".prev");
    const next   = slider.querySelector(".next");

    let current = startIndex;

    function update() {
      slides.forEach((s, i) => s.classList.toggle("active", i === current));
      dots.forEach((d, i) => d.classList.toggle("active", i === current));
    }

    function goNext() {
      current = (current + 1) % slides.length;
      update();
    }

    function goPrev() {
      current = (current - 1 + slides.length) % slides.length;
      update();
    }

    // Buttons
    if (next) next.addEventListener("click", goNext);
    if (prev) prev.addEventListener("click", goPrev);

    // Dots
    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        current = parseInt(dot.dataset.index);
        update();
      });
    });

    // Auto-play
    if (autoPlay) setInterval(goNext, delay);

    update(); // initial render
  }

  // Initialize both sliders
  initSlider("auto-slider", 1);        // starts on 2nd slide (yours has active=1)
  initSlider("featured1-slider", 1);   // same behavior
});

// Initialize sliders and featured products on page load
    document.addEventListener('DOMContentLoaded', () => {
      // Featured slider products
      const sliderProducts = [
        {
          id: 1,
          name: "Organic Brown Rice",
          price: 8.99,
          rating: 4.8,
          image: "images/organic-brown-rice-2kg.jpg",
          category: "Grocery",
          description: "Premium quality organic brown rice, perfect for healthy meals and family dinners."
        },
        {
          id: 5,
          name: "Artisan Sourdough Loaf",
          price: 6.49,
          rating: 4.9,
          image: "images/artisan-sourdough-loaf.jpg",
          category: "Bakery",
          description: "Freshly baked artisan sourdough with authentic flavor and texture."
        },
        {
          id: 13,
          name: "Vitamin C Serum 30ml",
          price: 22.99,
          rating: 4.9,
          image: "images/vitamin-c-serum.png",
          category: "Health & Beauty",
          description: "Brightening vitamin C serum for radiant and glowing skin."
        },
        {
          id: 19,
          name: "Coffee Beans 250g",
          price: 9.99,
          rating: 4.9,
          image: "images/premium-coffee-beans.jpg",
          category: "Drinks",
          description: "Single-origin specialty coffee beans with rich, complex flavors."
        }
      ];

      // Initialize featured slider
      new ProductSlider('featured-slider', sliderProducts);

      // Initialize category sliders
      const groceryProducts = filterProducts('grocery').slice(0, 6);
      const bakeryProducts = filterProducts('bakery').slice(0, 6);
      const babyProducts = filterProducts('baby-care').slice(0, 6);
      const healthBeautyProducts = filterProducts('health-beauty').slice(0, 6);
      const householdProducts = filterProducts('household').slice(0, 6);
      const drinksProducts = filterProducts('drinks').slice(0, 6);
      const crockeryProducts = filterProducts('crockery').slice(0, 6);

      new CategorySlider('grocery-slider', 'Grocery Essentials', 'grocery', groceryProducts);
      new CategorySlider('bakery-slider', 'Fresh Bakery', 'bakery', bakeryProducts);
      new CategorySlider('baby-care-slider', 'Baby Care', 'baby-care', babyProducts);
      new CategorySlider('health-beauty-slider', 'Health & Beauty', 'health-beauty', healthBeautyProducts);
      new CategorySlider('household-slider', 'Household Cleaning', 'household', householdProducts);
      new CategorySlider('drinks-slider', 'Drinks & Beverages', 'drinks', drinksProducts);
      new CategorySlider('crockery-slider', 'Crockery & Dining', 'crockery', crockeryProducts);

      // Render featured products
      const topProducts = [
        { id: 5, name: "Artisan Sourdough Loaf", price: 6.49, rating: 4.9, image: "images/artisan-sourdough-loaf.jpg" },
        { id: 9, name: "Baby Formula 500g", price: 16.99, rating: 4.8, image: "images/baby-formula.jpg" },
        { id: 13, name: "Vitamin C Serum 30ml", price: 22.99, rating: 4.9, image: "images/vitamin-c-serum.png" },
        { id: 19, name: "Coffee Beans 250g", price: 9.99, rating: 4.9, image: "images/premium-coffee-beans.jpg" }
      ];

      const featuredContainer = document.getElementById('featured-products');
      featuredContainer.innerHTML = topProducts.map(product => `
        <div class="product-card featured-product-card">
          <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <button onclick="toggleWishlist(${product.id})" class="wishlist-btn" title="Add to Wishlist">
              <i class="far fa-heart"></i>
            </button>
            <span class="product-badge">Featured</span>
          </div>
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-meta">
              <span class="product-price">£${product.price}</span>
              <span class="product-rating">
                <i class="fas fa-star" style="font-size: 0.75rem;"></i>
                ${product.rating}
              </span>
            </div>
            <div class="flex gap-2">
              <button onclick="addToCart(${product.id})" class="btn btn-primary btn-sm" style="flex: 1;">
                <i class="fas fa-shopping-cart"></i> Add to Cart
              </button>
              <a href="product-detail.html?id=${product.id}" class="btn btn-outline btn-sm">
                <i class="fas fa-eye"></i>
              </a>
              <button onclick="openShareModal('${product.name}')" class="btn btn-outline btn-sm" title="Share product">
                <i class="fas fa-share-alt"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('');
    });
    
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("featured2-slider");
  const slides = slider.querySelectorAll(".slider-slide");
  const dots = slider.querySelectorAll(".slider-dot");
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");

  let current = 1;

  function updateSlider() {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
  }

  function goNext() { current = (current + 1) % slides.length; updateSlider(); }
  function goPrev() { current = (current - 1 + slides.length) % slides.length; updateSlider(); }

  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);

  dots.forEach(dot => dot.addEventListener("click", () => {
    current = parseInt(dot.dataset.index);
    updateSlider();
  }));

  setInterval(goNext, 5000);
});
