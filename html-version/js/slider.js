// Product Slider
class ProductSlider {
  constructor(containerId, products) {
    this.container = document.getElementById(containerId);
    this.products = products;
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.isAutoPlay = true;

    if (this.container) {
      this.init();
    }
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.startAutoPlay();
  }

  render() {
    const slidesHTML = this.products.map((product, index) => `
      <div class="slider-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
        <div class="slider-content">
          <div class="slider-image-container">
            <img src="${product.image}" alt="${product.name}" class="slider-image">
          </div>
          <div class="slider-info">
            <div class="mb-2">
              <span class="badge badge-blue">${product.category}</span>
            </div>
            <h3 class="text-3xl font-bold text-slate-900 mb-4">${product.name}</h3>
            <p class="text-slate-600 text-lg mb-6">${product.description}</p>
            <div class="flex items-center gap-6 mb-8">
              <div class="text-4xl font-bold text-blue-600">£${product.price}</div>
              <div class="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg">
                <span class="text-lg font-semibold text-slate-900">★ ${product.rating}</span>
                <span class="text-sm text-slate-600">Rating</span>
              </div>
            </div>
            <div class="flex gap-4">
              <a href="product-detail.html?id=${product.id}" class="btn btn-primary">View Details</a>
              <button onclick="addToCart(${product.id})" class="btn btn-outline">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    const dotsHTML = this.products.map((_, index) => `
      <button class="slider-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
    `).join('');

    this.container.innerHTML = `
      <div class="slider-wrapper">
        ${slidesHTML}
      </div>
      <button class="slider-nav-btn prev">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="slider-nav-btn next">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
      <div class="slider-dots">
        ${dotsHTML}
      </div>
    `;
  }

  attachEventListeners() {
    const prevBtn = this.container.querySelector('.slider-nav-btn.prev');
    const nextBtn = this.container.querySelector('.slider-nav-btn.next');
    const dots = this.container.querySelectorAll('.slider-dot');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.goToPrevious());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.goToNext());
    }

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        this.goToSlide(index);
      });
    });
  }

  goToSlide(index) {
    this.stopAutoPlay();
    this.currentIndex = index;
    this.updateSlides();
  }

  goToPrevious() {
    this.stopAutoPlay();
    this.currentIndex = (this.currentIndex - 1 + this.products.length) % this.products.length;
    this.updateSlides();
  }

  goToNext() {
    this.stopAutoPlay();
    this.currentIndex = (this.currentIndex + 1) % this.products.length;
    this.updateSlides();
  }

  updateSlides() {
    const slides = this.container.querySelectorAll('.slider-slide');
    const dots = this.container.querySelectorAll('.slider-dot');

    slides.forEach((slide, index) => {
      if (index === this.currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  startAutoPlay() {
    if (this.isAutoPlay) {
      this.autoPlayInterval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.products.length;
        this.updateSlides();
      }, 5000);
    }
  }

  stopAutoPlay() {
    this.isAutoPlay = false;
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}

// Category Slider
class CategorySlider {
  constructor(containerId, title, category, products) {
    this.container = document.getElementById(containerId);
    this.title = title;
    this.category = category;
    this.products = products;

    if (this.container) {
      this.init();
    }
  }

  init() {
    this.render();
    this.attachEventListeners();
  }

  render() {
    const productsHTML = this.products.map(product => `
      <div class="product-card">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <button onclick="toggleWishlist(${product.id})" class="wishlist-btn" title="Add to Wishlist">
            <i class="far fa-heart"></i>
          </button>
          ${product.rating > 4.8 ? '<span class="product-badge">Top Rated</span>' : ''}
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
          </div>
        </div>
      </div>
    `).join('');

    this.container.innerHTML = `
      <div class="container">
        <div class="category-header">
          <div>
            <h2 class="text-3xl font-bold text-slate-900">${this.title}</h2>
            <p class="text-slate-600 mt-1">Browse our selection of ${this.category.toLowerCase()}</p>
          </div>
          <a href="products.html?category=${this.category}" class="text-blue-600 font-semibold">
            View All →
          </a>
        </div>
        <div class="category-scroll-container">
          <div class="category-products" id="${this.category}-products">
            ${productsHTML}
          </div>
          <button class="category-scroll-btn left" data-category="${this.category}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button class="category-scroll-btn right" data-category="${this.category}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const leftBtn = this.container.querySelector('.category-scroll-btn.left');
    const rightBtn = this.container.querySelector('.category-scroll-btn.right');
    const productsContainer = this.container.querySelector('.category-products');

    if (leftBtn && productsContainer) {
      leftBtn.addEventListener('click', () => {
        productsContainer.scrollBy({ left: -300, behavior: 'smooth' });
      });
    }

    if (rightBtn && productsContainer) {
      rightBtn.addEventListener('click', () => {
        productsContainer.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
  }
}

// Hero Slider
class HeroSlider {
  constructor(containerId, slides) {
    this.container = document.getElementById(containerId);
    this.slides = slides;
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.isAutoPlay = true;
    if (this.container) {
      this.init();
    }
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.startAutoPlay();
  }

  render() {
    const slidesHTML = this.slides.map((slide, index) => `
      <div class="hero-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
        <div class="hero-slide-split">
          <div class="hero-slide-text-side">
            <h1 class="hero-slide-title">${slide.title}</h1>
            <p class="hero-slide-text">${slide.text}</p>
            <div class="flex gap-4">
              <a href="${slide.btn1.href}" class="${slide.btn1.class}">${slide.btn1.text}</a>
              <a href="${slide.btn2.href}" class="${slide.btn2.class}">${slide.btn2.text}</a>
            </div>
          </div>
          <div class="hero-slide-image-side" style="background-image: url('${slide.image}')">
            <!-- Overlay and realistic image background -->
          </div>
        </div>
      </div>
    `).join('');

    const dotsHTML = this.slides.map((_, index) => `
      <button class="hero-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
    `).join('');

    this.container.innerHTML = `
      <div class="hero-slider-wrapper">
        ${slidesHTML}
      </div>
      <div class="hero-slider-nav">
        <button class="hero-nav-btn prev">&#9664;</button>
        <button class="hero-nav-btn next">&#9654;</button>
      </div>
      <div class="hero-slider-dots">
        ${dotsHTML}
      </div>
    `;
  }

  attachEventListeners() {
    const prevBtn = this.container.querySelector('.hero-nav-btn.prev');
    const nextBtn = this.container.querySelector('.hero-nav-btn.next');
    const dots = this.container.querySelectorAll('.hero-dot');
    if (prevBtn) prevBtn.addEventListener('click', () => this.goToPrevious());
    if (nextBtn) nextBtn.addEventListener('click', () => this.goToNext());
    dots.forEach(dot => {
      dot.addEventListener('click', e => {
        const idx = parseInt(e.target.dataset.index);
        this.goToSlide(idx);
      });
    });
  }

  goToSlide(index) {
    this.stopAutoPlay();
    this.currentIndex = index;
    this.updateSlides();
  }

  goToPrevious() {
    this.stopAutoPlay();
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateSlides();
  }

  goToNext() {
    this.stopAutoPlay();
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlides();
  }

  updateSlides() {
    const slides = this.container.querySelectorAll('.hero-slide');
    const dots = this.container.querySelectorAll('.hero-dot');
    slides.forEach((s, i) => {
      if (i === this.currentIndex) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
    dots.forEach((d, i) => {
      if (i === this.currentIndex) {
        d.classList.add('active');
      } else {
        d.classList.remove('active');
      }
    });
  }

  startAutoPlay() {
    if (this.isAutoPlay) {
      this.autoPlayInterval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlides();
      }, 5000);
    }
  }

  stopAutoPlay() {
    this.isAutoPlay = false;
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
  }
}

