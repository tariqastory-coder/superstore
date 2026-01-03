// Authentication
function login(email, password) {
    // Simple mock authentication
    const users = [
        { id: 1, email: 'user@example.com', password: 'password123', name: 'John Doe' },
        { id: 2, email: 'jane@example.com', password: 'password456', name: 'Jane Smith' }
    ];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const userSession = {
            id: user.id,
            email: user.email,
            name: user.name
        };
        localStorage.setItem('user', JSON.stringify(userSession));
        return { success: true, user: userSession };
    }

    return { success: false, message: 'Invalid email or password' };
}

function signup(name, email, password) {
    // Simple mock signup
    if (!name || !email || !password) {
        return { success: false, message: 'All fields are required' };
    }

    if (password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters' };
    }

    const userSession = {
        id: Date.now(),
        email: email,
        name: name
    };

    localStorage.setItem('user', JSON.stringify(userSession));
    return { success: true, user: userSession };
}

function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}

function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(`${inputId}-error`);

    if (input) {
        input.style.borderColor = 'var(--red-500)';
    }

    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorDiv = document.getElementById(`${inputId}-error`);

    if (input) {
        input.style.borderColor = 'var(--slate-300)';
    }

    if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
}

function clearAllErrors() {
    const errorDivs = document.querySelectorAll('.error-message');
    errorDivs.forEach(div => {
        div.textContent = '';
        div.style.display = 'none';
    });

    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.style.borderColor = 'var(--slate-300)';
    });
}
