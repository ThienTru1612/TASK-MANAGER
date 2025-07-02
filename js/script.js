// Get necessary DOM elements
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

const signInForm = document.querySelector(".sign-in-form");
const signUpForm = document.querySelector(".sign-up-form");

// Input fields for the Sign In form
const emailLoginInput = signInForm.querySelector('input[type="text"]'); // Đổi từ usernameLoginInput thành emailLoginInput
const passwordLoginInput = signInForm.querySelector('input[type="password"]');
const loginButton = signInForm.querySelector('.btn.solid'); // Get the login button

// Input fields for the Sign Up form
const usernameRegisterInput = signUpForm.querySelector('input[type="text"]');
const emailRegisterInput = signUpForm.querySelector('input[type="email"]');
const passwordRegisterInput = signUpForm.querySelector('input[type="password"]');
const confirmPasswordRegisterInput = signUpForm.querySelectorAll('input[type="password"]')[1];
const signupSubmitBtn = document.getElementById("signup-submit-btn"); // Main submit button for the sign-up form

// Element to display messages (assuming it exists in signin.html)
const messageDisplay = document.getElementById("message-display");

// Password toggle icons
const togglePasswordIcons = document.querySelectorAll('.toggle-password');

// (Không còn biến registrationData và countdownTimer)

/**
 * Displays a message to the user.
 * @param {string} message The message to display.
 * @param {string} type The type of message ('success', 'error', 'info').
 */
function displayMessage(message, type = 'info') {
    if (messageDisplay) {
        messageDisplay.textContent = message;
        messageDisplay.className = `message-display ${type} show`; // Add class for styling and show
        messageDisplay.style.display = 'block'; // Make sure it's visible

        // Auto-hide the message after 5 seconds
        setTimeout(() => {
            messageDisplay.classList.remove('show');
            // Give time for fade-out animation before hiding completely
            setTimeout(() => {
                messageDisplay.style.display = 'none';
            }, 500); // Match CSS transition duration
        }, 5000);
    } else {
        // Fallback to console.log if messageDisplay element is not found
        console.log(`Message (${type}): ${message}`);
    }
}

/**
 * Clears the displayed message.
 */
function clearMessage() {
    if (messageDisplay) {
        messageDisplay.classList.remove('show');
        setTimeout(() => {
            messageDisplay.textContent = '';
            messageDisplay.className = 'message-display';
            messageDisplay.style.display = 'none';
        }, 500); // Match CSS transition duration
    }
}

/**
 * Sets the loading state for a button.
 * @param {HTMLButtonElement} button The button element.
 * @param {boolean} isLoading True to show loading, false to hide.
 */
function setLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        button.innerHTML = '<span class="spinner"></span>'; // Add spinner
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        // Restore original text based on button ID
        if (button.id === 'signup-submit-btn') {
            button.textContent = 'Sign up';
        } else if (button.value === 'Login') { // For login button
            button.value = 'Login';
        }
    }
}

// Switch between Sign In and Sign Up modes
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
    // Reset sign-up form when switching to it
    signUpForm.reset();
    signupSubmitBtn.value = 'Sign up'; // Reset button text
    clearMessage(); // Clear any messages
    // Re-enable input fields
    usernameRegisterInput.disabled = false;
    emailRegisterInput.disabled = false;
    passwordRegisterInput.disabled = false;
    confirmPasswordRegisterInput.disabled = false;
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
    // Reset sign-in form when switching to it
    signInForm.reset();
    clearMessage(); // Clear any messages
});

// Password visibility toggle
togglePasswordIcons.forEach(iconContainer => {
    iconContainer.addEventListener('click', () => {
        const targetId = iconContainer.dataset.target;
        const passwordInput = document.getElementById(targetId);
        const icon = iconContainer.querySelector('i');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Handle submit event for the Sign In form
signInForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    const email = emailLoginInput.value.trim(); // Lấy email thay vì username
    const password = passwordLoginInput.value;
    const rememberMe = document.getElementById('remember-me').checked;

    clearMessage(); // Clear previous messages

    if (!email || !password) {
        displayMessage('Vui lòng điền đầy đủ email và mật khẩu.', 'error');
        return;
    }

    setLoading(loginButton, true); // Show loading spinner

    // Create FormData to send data
    const formData = new FormData();
    formData.append('email', email); // Gửi email
    formData.append('password', password);
    formData.append('remember_me', rememberMe ? '1' : '0'); // Send remember me status

    try {
        // Send POST request to login.php
        const response = await fetch('../php/login.php', {
            method: 'POST',
            body: formData
        });

        // Parse JSON response
        const data = await response.json();

        if (data.status === 'success') {
            // Successful login
            displayMessage(data.message, 'success'); // Display success message
            sessionStorage.setItem('loggedInUsername', data.username); // Store username in sessionStorage
            // Give a short delay for the message to be seen before redirecting
            setTimeout(() => {
                window.location.href = '../html/dashboard.html'; // Redirect to the dashboard
            }, 1500); // Adjust delay as needed
        } else {
            // Login failed
            displayMessage("Lỗi đăng nhập: " + data.message, 'error'); // Display error message
        }
    } catch (error) {
        // Handle network or server errors
        console.error('Lỗi network hoặc server khi đăng nhập:', error);
        displayMessage('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.', 'error');
    } finally {
        setLoading(loginButton, false); // Hide loading spinner
    }
});

// Handle submit event for the Sign Up form
signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    clearMessage(); // Clear previous messages

    const username = usernameRegisterInput.value.trim();
    const email = emailRegisterInput.value.trim();
    const password = passwordRegisterInput.value;
    const confirm_password = confirmPasswordRegisterInput.value;

    // (Đã bỏ các xác thực phức tạp và OTP)
    if (!username || !email || !password || !confirm_password) {
        displayMessage('Vui lòng điền đầy đủ thông tin đăng ký.', 'error');
        return;
    }

    if (password !== confirm_password) {
        displayMessage('Mật khẩu xác nhận không khớp.', 'error');
        return;
    }

    setLoading(signupSubmitBtn, true); // Show loading spinner

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_password', confirm_password); // Vẫn gửi để backend kiểm tra khớp

    try {
        const response = await fetch('../php/register.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (data.status === 'success') {
            displayMessage(data.message, 'success'); // "Đăng ký thành công!"
            sessionStorage.setItem('loggedInUsername', data.username); // Lưu username vào sessionStorage
            // Chuyển hướng ngay lập tức sau khi đăng ký thành công và tự động đăng nhập
            setTimeout(() => {
                window.location.href = '../html/dashboard.html';
            }, 1500);
        } else {
            displayMessage("Lỗi: " + data.message, 'error');
        }
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        displayMessage('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.', 'error');
    } finally {
        setLoading(signupSubmitBtn, false); // Hide loading spinner
    }
});

// (Đã bỏ các logic liên quan đến "Resend OTP" và "Forgot Password")

// Dashboard related scripts (assuming this script is also used for dashboard.html)
// Các phần script dashboard này vẫn giữ nguyên
$(document).ready(function() {
    // Toggle user dropdown menu
    $('#userMenu').on('click', function() {
        $('#userDropdown').toggleClass('active');
    });

    // Close the dropdown if the user clicks outside of it
    $(document).on('click', function(event) {
        if (!$(event.target).closest('#userMenu').length) {
            $('#userDropdown').removeClass('active');
        }
    });

    // Placeholder for logout functionality
    $('#userDropdown li:last-child').on('click', function(e) {
        e.preventDefault();
        // In a real application, you would send an AJAX request to logout.php
        // For now, we'll just redirect
        window.location.href = '../php/logout.php';
    });
});