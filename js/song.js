function handleLoginFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Your login validation logic here (e.g., checking credentials)
    if (loginSuccessful) {
      window.location.href = 'path/to/song.html'; // Redirect to song page
    } else {
      // Handle login failure (e.g., display an error message)
    }
  }
  
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', handleLoginFormSubmit);