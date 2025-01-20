// JavaScript to duplicate artist elements for seamless infinite scroll
const artistPopular = document.querySelector('.popular-artists');
const artists = artistPopular.innerHTML; // Save original content
 
// Duplicate the artists for a seamless loop
artistPopular.innerHTML += artists;


// JavaScript to toggle Play and Pause
document.querySelectorAll('.toggle-play-pause').forEach(button => {
button.addEventListener('click', () => {
const icon = button.querySelector('.material-symbols-outlined');
if (icon.textContent === 'play_arrow') {
      icon.textContent = 'pause';
} else {
     icon.textContent = 'play_arrow';
  }
});
});



// JavaScript to animate the popular artists section
const popularArtists = document.querySelector('.popular-artists');
    
popularArtists.addEventListener('mouseover', () => {
  popularArtists.style.animationPlayState = 'paused';
});

popularArtists.addEventListener('mouseout', () => {
  popularArtists.style.animationPlayState = 'running';
});




//For audio controls
document.addEventListener("DOMContentLoaded", () => {
  const musicItems = document.querySelectorAll(".music");

  musicItems.forEach((item, index) => {
    const audio = item.querySelector(".audio");
    const playPauseBtn = item.querySelector(".toggle-play-pause");
    const playIcon = playPauseBtn.querySelector(".play-icon");
    const previousBtn = item.querySelector(".previous");
    const nextBtn = item.querySelector(".next");

    // Play or Pause functionality
    playPauseBtn.addEventListener("click", () => {
      if (audio.paused) {
        // Pause all other audios
        document.querySelectorAll(".audio").forEach((aud) => aud.pause());
        document.querySelectorAll(".play-icon").forEach((icon) => {
          icon.textContent = "play_arrow";
        });

        // Play current audio
        audio.play();
        playIcon.textContent = "pause";
      } else {
        audio.pause();
        playIcon.textContent = "play_arrow";
      }
    });

    // Previous button functionality
    previousBtn.addEventListener("click", () => {
      const previousAudio =
        musicItems[index - 1]?.querySelector(".audio") || musicItems[musicItems.length - 1].querySelector(".audio");
      audio.pause();
      audio.currentTime = 0;
      previousAudio.play();
    });

    // Next button functionality
    nextBtn.addEventListener("click", () => {
      const nextAudio =
        musicItems[index + 1]?.querySelector(".audio") || musicItems[0].querySelector(".audio");
      audio.pause();
      audio.currentTime = 0;
      nextAudio.play();
    });

    // Reset play icon on audio end
    audio.addEventListener("ended", () => {
      playIcon.textContent = "play_arrow";
    });
  });
});


document.querySelectorAll(".music").forEach((musicItem) => {
  const audio = musicItem.querySelector(".audio");
  const playPauseBtn = musicItem.querySelector(".toggle-play-pause");
  const playIcon = playPauseBtn.querySelector(".play-icon");
  const volumeSlider = musicItem.querySelector(".volume-slider");

  playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
      // Play the audio
      audio.play();
      playIcon.textContent = "pause"; // Change icon to pause
      volumeSlider.classList.remove("d-none"); // Show volume slider
    } else {
      // Pause the audio
      audio.pause();
      playIcon.textContent = "play_arrow"; // Change icon to play
      volumeSlider.classList.add("d-none"); // Hide volume slider
    }
  });

  // Volume slider controls the audio volume
  volumeSlider.addEventListener("input", (event) => {
    audio.volume = event.target.value;
  });

  // Sync the slider when audio starts playing
  audio.addEventListener("play", () => {
    volumeSlider.value = audio.volume; // Ensure slider reflects current volume
    volumeSlider.classList.remove("d-none"); // Show slider when playing
  });

  // Hide the slider when the audio is paused
  audio.addEventListener("pause", () => {
    volumeSlider.classList.add("d-none");
  });
});


// JavaScript to control play/pause and volume slider visibility
document.querySelectorAll('.music').forEach((musicItem) => {
  const audio = musicItem.querySelector('.audio');
  const playPauseButton = musicItem.querySelector('.toggle-play-pause');
  const playIcon = playPauseButton.querySelector('.play-icon');
  const volumeSlider = musicItem.querySelector('.volume-slider');

  playPauseButton.addEventListener('click', () => {
    // Pause other audio tracks when one is played
    document.querySelectorAll('.audio').forEach((otherAudio) => {
      if (otherAudio !== audio) {
        otherAudio.pause();
        otherAudio.closest('.music').querySelector('.play-icon').textContent = 'play_arrow';
      }
    });

    if (audio.paused) {
      // Play the selected audio and show its volume slider
      audio.play();
      playIcon.textContent = 'pause';
      volumeSlider.classList.remove('d-none');
    } else {
      // Pause the selected audio and hide its volume slider
      audio.pause();
      playIcon.textContent = 'play_arrow';
      volumeSlider.classList.add('d-none');
    }
  });

  // Sync the volume slider with the audio volume
  volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
  });
});




