const text = "Live Music";
    const speed = 100;
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            document.getElementById("text").innerHTML += text.charAt(i);
            i++;
                setTimeout(typeWriter, speed);
            }
        }

window.onload = typeWriter;

document.querySelectorAll('.music-player').forEach((player) => {
    const audio = player.querySelector('.audio-player');
    const playPauseBtn = player.querySelector('.toggle-play-pause');
    const playPauseIcon = playPauseBtn.querySelector('span');
    const progressBar = player.querySelector('.progress-bar');
    const volumeBar = player.querySelector('.volume-bar');
  
    // Play/Pause toggle
    playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
        // Pause all other players
        document.querySelectorAll('.audio-player').forEach((otherAudio) => {
          if (otherAudio !== audio) {
            otherAudio.pause();
            otherAudio.parentElement.querySelector('.toggle-play-pause span').textContent = 'play_arrow';
          }
        });
  
        audio.play();
        playPauseIcon.textContent = 'pause';
      } else {
        audio.pause();
        playPauseIcon.textContent = 'play_arrow';
      }
    });
  
    // Update progress bar as audio plays
    audio.addEventListener('timeupdate', () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.value = progress || 0;
    });
  
    // Seek functionality
    progressBar.addEventListener('input', () => {
      audio.currentTime = (progressBar.value / 100) * audio.duration;
    });
  
    // Volume control
    volumeBar.addEventListener('input', () => {
      audio.volume = volumeBar.value;
    });
  
    // Reset play button and progress when audio ends
    audio.addEventListener('ended', () => {
      playPauseIcon.textContent = 'play_arrow';
      progressBar.value = 0;
    });
  });

  function showSignInForm(button) {
    // Check if a form is already displayed below this song
    const song = button.parentElement;
    const existingForm = song.nextElementSibling;

    if (existingForm && existingForm.classList.contains('sign-in-form')) {
        // If a form already exists, remove it
        existingForm.remove();
    } else {
        // Create the sign-in form
        const form = document.createElement('div');
        form.className = 'sign-in-form';
        form.innerHTML = `
            <h2>Sign In</h2>
            <form>
                <input type="text" placeholder="Username" required>
                <input type="password" placeholder="Password" required>
                <button type="submit">Sign In</button>
            </form>
        `;

        // Insert the form after the clicked song
        song.insertAdjacentElement('afterend', form);
    }
}

function showSignInAlert() {
  // Create the alert container
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'fixed';
  alertContainer.style.top = '50%';
  alertContainer.style.left = '50%';
  alertContainer.style.transform = 'translate(-50%, -50%)';
  alertContainer.style.padding = '20px';
  alertContainer.style.backgroundColor = '#fff';
  alertContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  alertContainer.style.borderRadius = '10px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.zIndex = '1000';

  // Add the alert message
  const alertMessage = document.createElement('p');
  alertMessage.innerText = 'You need to sign in to play.';
  alertMessage.style.marginBottom = '20px';
  alertMessage.style.fontSize = '16px';
  alertMessage.style.color = '#333';
  alertContainer.appendChild(alertMessage);

  // Create "Sign In" button
  const signInButton = document.createElement('button');
  signInButton.innerText = 'Sign In';
  signInButton.style.padding = '10px 20px';
  signInButton.style.marginRight = '10px';
  signInButton.style.backgroundColor = '#3085d6';
  signInButton.style.color = '#fff';
  signInButton.style.border = 'none';
  signInButton.style.borderRadius = '5px';
  signInButton.style.cursor = 'pointer';
  signInButton.addEventListener('click', () => {
      window.location.href = '../longin.html'; // Redirect to login.html
  });

  // Create "Cancel" button
  const cancelButton = document.createElement('button');
  cancelButton.innerText = 'Cancel';
  cancelButton.style.padding = '10px 20px';
  cancelButton.style.backgroundColor = '#d33';
  cancelButton.style.color = '#fff';
  cancelButton.style.border = 'none';
  cancelButton.style.borderRadius = '5px';
  cancelButton.style.cursor = 'pointer';
  cancelButton.addEventListener('click', () => {
      document.body.removeChild(alertContainer); // Close alert
  });

  // Append buttons to the alert container
  alertContainer.appendChild(signInButton);
  alertContainer.appendChild(cancelButton);

  // Append the alert container to the body
  document.body.appendChild(alertContainer);
}

// Add the button to the body
document.body.appendChild(button);



