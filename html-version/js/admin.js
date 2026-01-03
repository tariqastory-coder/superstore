// Admin Portal Logic
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();

    const page = document.body.dataset.page;
    if (page === 'dashboard') {
        renderDashboardStats();
    } else if (page === 'products') {
        renderProductsTable();
    } else if (page === 'add-product') {
        initProductForm();
    }
});

function initSidebar() {
    const burger = document.getElementById('sidebar-burger');
    const sidebar = document.querySelector('.admin-sidebar');
    if (burger && sidebar) {
        burger.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
}

// Dashboard Functions
function renderDashboardStats() {
    const products = loadProducts();
    const totalItems = products.length;
    const activeItems = products.filter(p => p.inStock).length;
    const outOfStock = totalItems - activeItems;

    updateStat('total-products', totalItems);
    updateStat('active-products', activeItems);
    updateStat('out-of-stock', outOfStock);

    // Render recent products
    const recentList = document.getElementById('recent-products-list');
    if (recentList) {
        const recent = products.slice(-5).reverse();
        recentList.innerHTML = recent.map(p => `
            <tr>
                <td><img src="${p.image}" class="product-thumbnail" onerror="this.src='images/placeholder.png'"></td>
                <td>${p.name}</td>
                <td><span class="badge-status ${p.inStock ? 'status-active' : 'status-inactive'}">${p.inStock ? 'Active' : 'Inactive'}</span></td>
                <td>£${p.price.toFixed(2)}</td>
            </tr>
        `).join('');
    }
}

function updateStat(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

// Product Management Functions
function renderProductsTable() {
    const products = loadProducts();
    const tableBody = document.getElementById('products-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = products.map(p => `
        <tr>
            <td><img src="${p.image}" class="product-thumbnail" onerror="this.src='images/placeholder.png'"></td>
            <td>
                <div class="font-semibold">${p.name}</div>
                <div class="text-xs text-slate-500">ID: #${p.id}</div>
            </td>
            <td>${p.category}</td>
            <td>£${p.price.toFixed(2)}</td>
            <td>
                <span class="badge-status ${p.inStock ? 'status-active' : 'status-inactive'}">
                    ${p.inStock ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td>
                <button class="btn-icon btn-edit" onclick="editProduct(${p.id})" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="btn-icon btn-delete" onclick="confirmDelete(${p.id})" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

let deleteProductId = null;
function confirmDelete(id) {
    deleteProductId = id;
    const modal = document.getElementById('delete-modal');
    if (modal) modal.style.display = 'flex';
}

function closeDeleteModal() {
    deleteProductId = null;
    const modal = document.getElementById('delete-modal');
    if (modal) modal.style.display = 'none';
}

function deleteProduct() {
    if (deleteProductId === null) return;

    let products = loadProducts();
    products = products.filter(p => p.id !== deleteProductId);
    saveProducts(products);

    closeDeleteModal();
    renderProductsTable();
    showToast('Product deleted successfully');
}

function editProduct(id) {
    window.location.href = `admin-add-product.html?id=${id}`;
}

// Form Functions
let uploadedImageBase64 = null;

function initProductForm() {
    const form = document.getElementById('product-form');
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');

    // Check for edit mode
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        const product = getProductById(productId);
        if (product) {
            document.getElementById('form-title').textContent = 'Edit Product';
            document.getElementById('product-id').value = product.id;
            document.getElementById('name').value = product.name;
            document.getElementById('description').value = product.description;
            document.getElementById('price').value = product.price;
            document.getElementById('category').value = product.category;
            document.getElementById('status').checked = product.inStock;

            if (product.image) {
                showPreview(product.image);
                uploadedImageBase64 = product.image;
            }
        }
    }

    uploadArea.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleImageFile(file);
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) handleImageFile(file);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const products = loadProducts();

        const id = formData.get('id');
        const newProduct = {
            id: id ? parseInt(id) : Date.now(),
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            category: formData.get('category'),
            inStock: formData.get('status') === 'on',
            image: uploadedImageBase64 || 'images/placeholder.png',
            rating: id ? getProductById(id).rating : 0,
            reviews: id ? getProductById(id).reviews : 0
        };

        if (id) {
            const index = products.findIndex(p => p.id === parseInt(id));
            products[index] = newProduct;
        } else {
            products.push(newProduct);
        }

        saveProducts(products);
        showToast(id ? 'Product updated!' : 'Product added!');
        setTimeout(() => {
            window.location.href = 'admin-products.html';
        }, 1500);
    });
}

function handleImageFile(file) {
    if (!file.type.match('image.*')) {
        showToast('Please upload an image file (PNG, JPG, WEBP)', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedImageBase64 = e.target.result;
        showPreview(uploadedImageBase64);
    };
    reader.readAsDataURL(file);
}

function showPreview(src) {
    const preview = document.getElementById('image-preview');
    const previewImg = preview.querySelector('img');
    const uploadPrompt = document.getElementById('upload-prompt');

    previewImg.src = src;
    preview.style.display = 'block';
    if (uploadPrompt) uploadPrompt.style.display = 'none';
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: ${type === 'success' ? '#16a34a' : '#ef4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// CSS Animations for Toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
`;
document.head.appendChild(style);
