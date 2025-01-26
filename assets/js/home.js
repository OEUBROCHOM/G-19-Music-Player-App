/*SHOW NAVBAR*/
const showMenu = (headerToggle, navbarId) =>{
    const toggleBtn = document.getElementById(headerToggle),
    nav = document.getElementById(navbarId)
    
    // Validate that variables exist
    if(headerToggle && navbarId){
        toggleBtn.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
            // change icon
            toggleBtn.classList.toggle('bx-x')
        })
    }
}
showMenu('header-toggle','navbar')

/*LINK ACTIVE*/
const linkColor = document.querySelectorAll('.nav__link')

function colorLink(){
    linkColor.forEach(l => l.classList.remove('active'))
    this.classList.add('active')
}

linkColor.forEach(l => l.addEventListener('click', colorLink));

// text populars
// const text = document.querySelector(".sec-text");

// const textLoad = () => {
//   setTimeout(() => {
//     text.textContent = "Popular songs";
//   }, 0);

//   setTimeout(() => {
//     text.textContent = "Explore your favorite songs";
//   }, 4000);

//   setTimeout(() => {
//     text.textContent = "YouTuber";
//   }, 8000);
// }

// textLoad();
// setInterval(textLoad, 12000);

/*SLIDER JS*/

var TrandingSlider = new Swiper('.tranding-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");
let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});
const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;
    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}
const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}
const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);
document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

//function to handle the sweet alert in the sibmit button
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('newsletterForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally
        console.log('Form submitted!'); // Check if this message appears in the console

        // Get the email input value
        const email = document.getElementById('emailInput').value;

        // Validate the email (simple check)
        if (email && email.includes('@')) {
            // Show SweetAlert2 success message
            Swal.fire({
                title: 'Success!',
                text: 'You have successfully subscribed to our newsletter.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#ff6b6b', // Match your button color
            }).then(() => {
                // Clear the input field after submission
                document.getElementById('emailInput').value = '';
            });
        } else {
            // Show SweetAlert2 error message for invalid email
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a valid email address.',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#ff6b6b', // Match your button color
            });
        }
    });
});

//Handle Placeholder Change
function updatePlaceholder() {
    const input = document.getElementById('emailInput');
    const isMobile = window.innerWidth <= 767.98; // Check if screen is tablet or smartphone

    // Update placeholder based on screen size
    if (isMobile) {
        input.placeholder = input.getAttribute('data-placeholder-mobile');
    } else {
        input.placeholder = input.getAttribute('data-placeholder-desktop');
    }
}

// Run on page load
updatePlaceholder();

// Run on window resize
window.addEventListener('resize', updatePlaceholder);


// Voice Control JavaScript
const voiceControlBtn = document.getElementById('voice-control-btn');

// Check if the browser supports the Web Speech API
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    // Configure the recognition settings
    recognition.continuous = false; // Stop after one command
    recognition.interimResults = false; // Only final results
    recognition.lang = 'en-US'; // Set language

    // Start recognition when the button is clicked
    voiceControlBtn.addEventListener('click', () => {
        recognition.start();
        voiceControlBtn.innerHTML = '<i class="fas fa-microphone"></i> Listening...'; // Change button text
    });

    // Handle the result event
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase(); // Get the recognized text
        voiceControlBtn.innerHTML = '<i class="fas fa-microphone"></i>'; // Reset button text

        // Control the music player based on the recognized command
        if (transcript.includes('play')) {
            playSong(); // Call your play function
        } else if (transcript.includes('pause')) {
            pauseSong(); // Call your pause function
        } else if (transcript.includes('next')) {
            nextSong(); // Call your next function
        } else if (transcript.includes('previous')) {
            previousSong(); // Call your previous function
        } else {
            alert('Command not recognized. Please say "play", "pause", "next", or "previous".');
        }
    };

    // Handle errors
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        voiceControlBtn.innerHTML = '<i class="fas fa-microphone"></i>'; // Reset button text
        alert('Error: ' + event.error);
    };

    // Stop recognition when the user stops speaking
    recognition.onspeechend = () => {
        recognition.stop();
        voiceControlBtn.innerHTML = '<i class="fas fa-microphone"></i>'; // Reset button text
    };
} else {
    // Browser does not support the Web Speech API
    voiceControlBtn.style.display = 'none'; // Hide the button
    alert('Your browser does not support voice control.');
}

// Define music control functions
function playSong() {
    // Logic to play the song
    const audio = document.querySelector('.audio'); // Adjust selector as needed
    audio.play();
    console.log('Playing song...');
}

function pauseSong() {
    // Logic to pause the song
    const audio = document.querySelector('.audio'); // Adjust selector as needed
    audio.pause();
    console.log('Pausing song...');
}

function nextSong() {
    // Logic to play the next song
    console.log('Playing next song...');
}

function previousSong() {
    // Logic to play the previous song
    console.log('Playing previous song...');
}
