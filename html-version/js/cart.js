// Unified Cart & Wishlist helpers
(function () {
  const CART_KEY = 'rhyll_cart_v1';
  const WISHLIST_KEY = 'rhyll_wishlist_v1';

  // Notification helper
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 5rem;
      right: 1rem;
      background-color: var(--slate-900);
      color: var(--white);
      padding: 1rem 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Notification animations (once)
  if (!document.getElementById('rhyll-notify-style')) {
    const style = document.createElement('style');
    style.id = 'rhyll-notify-style';
    style.textContent = `
      @keyframes slideIn { from { transform: translateX(100%); opacity:0 } to { transform: translateX(0); opacity:1 } }
      @keyframes slideOut { from { transform: translateX(0); opacity:1 } to { transform: translateX(100%); opacity:0 } }
    `;
    document.head.appendChild(style);
  }

  // Cart functions
  function getCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart || []));
      updateCartUI();
    } catch (e) { console.error('saveCart failed', e); }
  }

  function addToCart(productId, quantity = 1) {
    const id = Number(productId);
    if (Number.isNaN(id)) { console.warn('addToCart: invalid id', productId); return; }
    const cart = getCart();
    const idx = cart.findIndex(i => Number(i.productId) === id);
    if (idx > -1) {
      cart[idx].quantity = Math.max(0, (cart[idx].quantity || 0) + Number(quantity));
    } else {
      cart.push({ productId: id, quantity: Math.max(1, Number(quantity) || 1) });
    }
    saveCart(cart);
    showNotification('Product added to cart!');
  }

  function removeFromCart(productId) {
    const id = Number(productId);
    const cart = getCart().filter(i => Number(i.productId) !== id);
    saveCart(cart);
  }

  function updateCartQuantity(productId, newQuantity) {
    const id = Number(productId);
    const cart = getCart();
    const idx = cart.findIndex(i => Number(i.productId) === id);
    if (idx === -1) return;
    if (newQuantity <= 0) {
      cart.splice(idx, 1);
    } else {
      cart[idx].quantity = Number(newQuantity);
    }
    saveCart(cart);
  }

  function getCartTotal() {
    const cart = getCart();
    let total = 0;
    cart.forEach(item => {
      if (typeof getProductById === 'function') {
        const product = getProductById(Number(item.productId));
        if (product) total += (product.price || 0) * (Number(item.quantity) || 0);
      }
    });
    return total;
  }

  function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartUI();
  }

  // Wishlist functions
  function getWishlist() {
    try { const raw = localStorage.getItem(WISHLIST_KEY); return raw ? JSON.parse(raw) : []; } catch (e) { return []; }
  }

  function saveWishlist(list) { try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(list || [])); updateCartUI(); } catch (e) { } }

  function addToWishlist(productId) {
    const id = Number(productId);
    if (Number.isNaN(id)) return;
    const list = getWishlist();
    if (!list.includes(id)) { list.push(id); saveWishlist(list); showNotification('Product added to wishlist!'); }
  }

  function removeFromWishlist(productId) { const id = Number(productId); saveWishlist(getWishlist().filter(i => i !== id)); }

  function isInWishlist(productId) { return getWishlist().includes(Number(productId)); }

  function toggleWishlist(productId) { if (isInWishlist(productId)) { removeFromWishlist(productId); showNotification('Product removed from wishlist'); } else { addToWishlist(productId); } }

  // UI sync
  function updateCartUI() {
    try {
      const cart = getCart();
      const total = cart.reduce((s, i) => s + (Number(i.quantity) || 0), 0);
      const el = document.getElementById('cart-count');
      if (el) { el.textContent = total || ''; el.style.display = total ? 'inline-block' : 'none'; }
      // If on cart page, call renderCart if available
      if (typeof renderCart === 'function') renderCart();
    } catch (e) { console.error(e); }
  }

  // Expose functions globally (attach to window)
  window.getCart = getCart;
  window.saveCart = saveCart;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateCartQuantity = updateCartQuantity;
  window.getCartTotal = getCartTotal;
  window.clearCart = clearCart;
  window.getWishlist = getWishlist;
  window.saveWishlist = saveWishlist;
  window.addToWishlist = addToWishlist;
  window.removeFromWishlist = removeFromWishlist;
  window.isInWishlist = isInWishlist;
  window.toggleWishlist = toggleWishlist;
  window.updateCartUI = updateCartUI;
  // backward-compatible alias some code might call
  window.updateHeaderCounts = updateCartUI;

  // run once on load to sync UI
  document.addEventListener('DOMContentLoaded', updateCartUI);

})();