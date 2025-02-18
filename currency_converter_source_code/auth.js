// Show login or sign-up form based on user interaction
function showLoginForm() {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
}

function showSignupForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
}

// Handle Sign-up
document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (validateSignup(username, email, password)) {
        localStorage.setItem('user', JSON.stringify({ username, password }));
        alert('Sign-up successful! Please log in.');
        showLoginForm();
    } else {
        displayError('Please fill all fields correctly.');
    }
});

// Validate sign-up input
function validateSignup(username, email, password) {
    return username.trim() !== '' && email.includes('@') && password.length >= 6;
}

// Handle Login
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const loginUsername = document.getElementById('login-username').value;
    const loginPassword = document.getElementById('login-password').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.username === loginUsername && storedUser.password === loginPassword) {
        switchToConverter();
    } else {
        displayLoginError('Invalid username or password.');
    }
});

// Switch to converter page
function switchToConverter() {
    document.getElementById('auth-page').classList.add('hidden');
    document.getElementById('converter-page').classList.remove('hidden');
}

// Logout
function logout() {
    alert('Logged out successfully!');
    location.reload();
}

// Display errors
function displayError(message) {
    document.getElementById('error-message').textContent = message;
}

function displayLoginError(message) {
    document.getElementById('login-error-message').textContent = message;
}
