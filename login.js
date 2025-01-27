// Track current form mode (login or signup)
let isSignUpMode = false;
// Toggle between Login and Sign-Up form
function toggleForm() {
    const formTitle = document.getElementById("form-title");
    const actionButton = document.getElementById("action-button");
    const toggleLink = document.getElementById("toggle-link");

    if (isSignUpMode) {
        formTitle.textContent = "Log in";
        actionButton.textContent = "Log in";
        toggleLink.innerHTML = "New user? <span onclick=\"toggleForm()\">Sign Up</span>";
        isSignUpMode = false;
    } else {
        formTitle.textContent = "Sign Up";
        actionButton.textContent = "Sign Up";
        toggleLink.innerHTML = "Already have an account? <span onclick=\"toggleForm()\">Log in</span>";
        isSignUpMode = true;
    }
}

// Handle Form Submission
document.getElementById("authentication").onsubmit = function (event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (isSignUpMode) {
        signUp(username, email, password);
    } else {
        logIn(username, email, password);
    }
};

// Sign-Up Function
function signUp(username, email, password) {
    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email is already registered
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email is already registered. Please log in.',
          }).then(() => {
            toggleForm(); 
          });
        return;
    }

    // Add new user to localStorage
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    Swal.fire({
        title: "Sign-Up Successful!",
        text: "You can now log in.",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        toggleForm(); 
      });
      
}

// Log-In Function
function logIn(username, email, password) {
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verify user credentials
    const user = users.find(
        user => user.username === username && user.email === email && user.password === password
    );

    if (user) {
        Swal.fire({
            title: "Welcome Back!",
            text: `Welcome back, ${user.username}!`,
            icon: "success",
            confirmButtonText: "Thanks"
          });
          
        window.location.href = "home.html";
    } else {
        Swal.fire({
            title: "Error",
            text: "Incorrect username, email, or password!",
            icon: "error",
            confirmButtonText: "Try Again"
          });
    }
}u