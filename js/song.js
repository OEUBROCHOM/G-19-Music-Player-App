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


// song
// const searchInput = document.querySelector('.form-control');
//             const cards = document.querySelectorAll('.cards');
    
//             searchInput.addEventListener('input', () => {
//                 const searchValue = searchInput.value.toLowerCase();
    
//                 cards.forEach((card) => {
//                     const title = card.querySelector('.songs-title').textContent.toLowerCase();
//                     const text = card.querySelector('.songs-text').textContent.toLowerCase();
    
//                     if (title.includes(searchValue) || text.includes(searchValue)) {
//                         card.style.display = 'block';
//                     } else {
//                         card.style.display = 'none';
//                     }
//                 });
//             });