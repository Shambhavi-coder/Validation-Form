// Get form elements
const form = document.getElementById('registrationForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Get error elements
const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const passwordStrength = document.getElementById('passwordStrength');

// Add event listeners for real-time validation
fullNameInput.addEventListener('input', validateFullName);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

// Form submit event listener
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields before submission
    const isNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
        // If all validations pass, show success message
        alert('Registration successful!');
        form.reset();
        clearPasswordStrength();
    }
});

// Validation Functions

function validateFullName() {
    const fullName = fullNameInput.value.trim();
    
    if (fullName.length < 5) {
        showError(fullNameInput, fullNameError, 'Name must be at least 5 characters long');
        return false;
    }
    
    if (!/^[a-zA-Z\s]*$/.test(fullName)) {
        showError(fullNameInput, fullNameError, 'Name should only contain letters and spaces');
        return false;
    }
    
    hideError(fullNameInput, fullNameError);
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    
    if (!email.includes('@')) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    }
    
    // More comprehensive email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    }
    
    hideError(emailInput, emailError);
    return true;
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    
    if (phone === '1234567890') {
        showError(phoneInput, phoneError, 'Please enter a valid phone number');
        return false;
    }
    
    if (!/^\d{10}$/.test(phone)) {
        showError(phoneInput, phoneError, 'Phone number must be 10 digits');
        return false;
    }
    
    hideError(phoneInput, phoneError);
    return true;
}

function validatePassword() {
    const password = passwordInput.value;
    const fullName = fullNameInput.value.trim().toLowerCase();
    
    if (password.length < 8) {
        showError(passwordInput, passwordError, 'Password must be at least 8 characters long');
        return false;
    }
    
    if (password.toLowerCase() === 'password') {
        showError(passwordInput, passwordError, 'Password cannot be "password"');
        return false;
    }
    
    if (password.toLowerCase() === fullName) {
        showError(passwordInput, passwordError, 'Password cannot be your name');
        return false;
    }
    
    // Check password strength
    updatePasswordStrength(password);
    
    hideError(passwordInput, passwordError);
    return true;
}

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (password !== confirmPassword) {
        showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
        return false;
    }
    
    hideError(confirmPasswordInput, confirmPasswordError);
    return true;
}

// Helper Functions

function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.add('is-invalid');
    input.classList.add('shake');
    setTimeout(() => input.classList.remove('shake'), 500);
}

function hideError(input, errorElement) {
    errorElement.textContent = '';
    input.classList.remove('is-invalid');
}

function updatePasswordStrength(password) {
    let strength = 0;
    
    // Check for length
    if (password.length >= 8) strength++;
    
    // Check for mixed case
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    
    // Check for numbers
    if (password.match(/\d/)) strength++;
    
    // Check for special characters
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    
    // Update strength indicator
    passwordStrength.className = 'password-strength';
    if (strength === 0) {
        passwordStrength.style.width = '0';
    } else if (strength <= 2) {
        passwordStrength.classList.add('strength-weak');
    } else if (strength === 3) {
        passwordStrength.classList.add('strength-medium');
    } else {
        passwordStrength.classList.add('strength-strong');
    }
}

function clearPasswordStrength() {
    passwordStrength.className = 'password-strength';
    passwordStrength.style.width = '0';
}

// Password Toggle Functionality
document.getElementById('togglePassword').addEventListener('click', function() {
    togglePasswordVisibility(passwordInput, this);
});

document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
    togglePasswordVisibility(confirmPasswordInput, this);
});

function togglePasswordVisibility(input, button) {
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    button.querySelector('i').classList.toggle('bi-eye');
    button.querySelector('i').classList.toggle('bi-eye-slash');
}