
const databaseUrl = 'https://erb-reatime-crud-default-rtdb.asia-southeast1.firebasedatabase.app/playlists.json';
const songsUrl = 'https://erb-reatime-crud-default-rtdb.asia-southeast1.firebasedatabase.app/songs.json';

const playlistsContainer = document.getElementById('playlists');
const createPlaylistBtn = document.getElementById('createPlaylistBtn');
const createPlaylistForm = document.getElementById('createPlaylistForm');

// Fetch playlists from database
async function fetchPlaylists() {
  try {
    const response = await axios.get(databaseUrl);
    const playlists = response.data;
    playlistsContainer.innerHTML = '';

    if (playlists) {
      Object.keys(playlists).forEach(id => {
        const playlist = playlists[id];
        const card = document.createElement('div');
        card.className = 'ui-cards';
        card.innerHTML = `
          <div class="cards">
            <div class= "pics">
                <img src="${playlist.image || 'https://via.placeholder.com/150'}" class="card-img-top image" alt="${playlist.type}">
            </div>
            <div class="card-body">
              <h1 class="card-title songs-title">${playlist.type}</h1>
              <p class="card-text songs-text">${playlist.description}</p>
              <div class="buttons">
                    <a href="javascript:void(0)" onclick="document.getElementById('bbb-${id}').style.display='block'">
                        <button class="playlist-btn"> Open Playlist</button>
                    </a>

                    <div id="bbb-${id}" class="light-box">
                        <a href="javascript:void(0)" class="close" onclick="document.getElementById('bbb-${id}').style.display='none'">Close</a>
                        
                        <div class="upsongs">
                          <p class="pop_name">My Favorites</p>
                          <button class="btn btn-primary upload-song-btn" data-playlist-id="${id}">Upload your song</button> 
                        </div>
                        <table cellspacing="0" cellpadding="0">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Song Title</th>
                                    <th>Artist</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="songsTableBody-${id}">
                                <!-- Songs will be dynamically added here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="menu-button" data-playlist-id="${id}">&bull;&bull;&bull;</div>
          </div>
        `;

        playlistsContainer.appendChild(card);

        // Fetch songs for this playlist
        fetchSongs(id);
      });

      // Attach event listeners for menu buttons
      document.querySelectorAll('.menu-button').forEach(button => {
        button.addEventListener('click', (event) => {
          const playlistId = event.target.getAttribute('data-playlist-id');
          showMenu(playlistId);
        });
      });
    }
  } catch (error) {
    console.error('Error fetching playlists:', error);
  }
}

// Fetch songs from database for a specific playlist
async function fetchSongs(playlistId) {
  try {
    const response = await axios.get(songsUrl);
    const songs = response.data;
    const tableBody = document.getElementById(`songsTableBody-${playlistId}`);
    tableBody.innerHTML = '';

    if (songs) {
      let index = 1; // Initialize index to 1 for each playlist
      Object.keys(songs).forEach(id => {
        const song = songs[id];
        if (song.playlistId === playlistId) {
          const newRow = document.createElement('tr');

          newRow.innerHTML = `
            <td>${index++}</td>
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>
              <button class="table-button center" onclick="openMusicPlayer('${song.title}', '${song.artist}', '${song.image}', '${song.file}')">Go to Music Player</button>
            </td>
          `;

          tableBody.appendChild(newRow);
        }
      });
    }
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}

// Show menu for playlist actions
function showMenu(id) {
  Swal.fire({
    title: 'Playlist Options',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
  }).then(result => {
    if (result.isConfirmed) {
      // Call the deletePlaylist function when the user confirms the deletion
      deletePlaylist(id);
    }
  });
}

// Attach event listeners for menu buttons dynamically (each playlist card)
document.querySelectorAll('.menu-button').forEach(button => {
  button.addEventListener('click', (event) => {
    const playlistId = event.target.getAttribute('data-playlist-id');
    showMenu(playlistId); // Show confirmation modal for that specific playlist
  });
});

// Delete playlist and its associated songs
async function deletePlaylist(id) {
  try {
    // Delete the playlist from Firebase
    await axios.delete(`https://erb-reatime-crud-default-rtdb.asia-southeast1.firebasedatabase.app/playlists/${id}.json`);
    console.log(`Playlist with ID ${id} deleted.`);

    // Fetch all songs and delete those associated with the playlist
    const response = await axios.get('https://erb-reatime-crud-default-rtdb.asia-southeast1.firebasedatabase.app/songs.json');
    const songs = response.data;

    if (songs) {
      // Iterate over all songs and delete those related to the playlist
      Object.keys(songs).forEach(async songId => {
        const song = songs[songId];
        if (song.playlistId === id) {
          await axios.delete(`https://erb-reatime-crud-default-rtdb.asia-southeast1.firebasedatabase.app/songs/${songId}.json`);
          console.log(`Song with ID ${songId} deleted.`);
        }
      });
    }

    // Re-fetch the playlists after deletion
    fetchPlaylists();
    Swal.fire('Deleted!', 'The playlist and its songs have been deleted.', 'success');
  } catch (error) {
    console.error('Error deleting playlist:', error);
    Swal.fire('Error!', 'Failed to delete the playlist.', 'error');
  }
}



// Handle playlist creation
createPlaylistForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const type = document.getElementById('playlistType').value;
  const description = document.getElementById('playlistDescription').value;
  const imageFile = document.getElementById('playlistImage').files[0];

  const reader = new FileReader();
  reader.onload = async () => {
    const imageUrl = reader.result;

    try {
      await axios.post(databaseUrl, {
        type,
        description,
        image: imageUrl,
      });

      fetchPlaylists();
      Swal.fire('Success!', 'Playlist created successfully.', 'success');
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  } else {
    reader.onload();
  }

  const modal = bootstrap.Modal.getInstance(document.getElementById('createPlaylistModal'));
  modal.hide();
});

// Initialize
createPlaylistBtn.addEventListener('click', () => {
  const modal = new bootstrap.Modal(document.getElementById('createPlaylistModal'));
  modal.show();
});

fetchPlaylists();

// Handle click on "Upload your song" button
document.addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('upload-song-btn')) {
    const playlistId = event.target.getAttribute('data-playlist-id');
    Swal.fire({
      title: '<span style="color: green;">UPLOAD NEW SONG</span>',
      html: `
        <form id="uploadSongForm">
          <div class="mb-3">
            <label for="songTitle" style="color: gray;" text-align: left;" class="form-label">SONG TITLE</label>
            <input type="text" class="form-control" id="songTitle" placeholder="Enter song title" required>
          </div>
          <div class="mb-3">
            <label for="songArtist" style="color: gray;" class="form-label">ARTIST</label>
            <input type="text" class="form-control" id="songArtist" placeholder="Enter artist name" required>
          </div>
          <div class="mb-3">
            <label for="songImage" style="color: gray;" class="form-label">UPLOAD IMAGE</label>
            <input type="file" class="form-control" id="songImage" accept="image/*" required>
          </div>
          <div class="mb-3">
            <label for="songFile" style="color: gray;" class="form-label">UPLOAD SONG</label>
            <input type="file" class="form-control" id="songFile" accept="audio/*" required>
          </div>
          <button type="submit" class="btn btn-primary">Add New Song</button>
        </form>
      `,
      showConfirmButton: false,

      didOpen: () => {
        // Select all labels inside the SweetAlert content
        const labels = document.querySelectorAll('#uploadSongForm label');
        labels.forEach((label) => {
          label.style.display = 'block'; // Makes each label block-level
          label.style.textAlign = 'left'; // Aligns text to the left
        });
      },
    });

    // Handle form submission
    document.getElementById('uploadSongForm').addEventListener('submit', async (e) => {
      e.preventDefault();

      const songTitle = document.getElementById('songTitle').value;
      const songArtist = document.getElementById('songArtist').value;
      const songImageFile = document.getElementById('songImage').files[0];
      const songFile = document.getElementById('songFile').files[0];

      const imageReader = new FileReader();
      const songReader = new FileReader();

      imageReader.onload = async () => {
        const songImageUrl = imageReader.result;

        songReader.onload = async () => {
          const songFileUrl = songReader.result;

          try {
            await axios.post(songsUrl, {
              title: songTitle,
              artist: songArtist,
              image: songImageUrl,
              file: songFileUrl,
              playlistId: playlistId,
            });

            fetchSongs(playlistId);

            Swal.fire('Success!', 'New song added successfully.', 'success');
          } catch (error) {
            console.error('Error uploading song:', error);
          }
        };

        if (songFile) {
          songReader.readAsDataURL(songFile);
        }
      };

      if (songImageFile) {
        imageReader.readAsDataURL(songImageFile);
      }
    });
  }
});

// Function to open music player modal
function openMusicPlayer(title, artist, image, file) {
  const musicPlayerModal = document.createElement('div');
  musicPlayerModal.className = 'modal fade';
  musicPlayerModal.id = 'musicPlayerModal';
  musicPlayerModal.tabIndex = -1;
  musicPlayerModal.setAttribute('aria-labelledby', 'musicPlayerModalLabel');
  musicPlayerModal.setAttribute('aria-hidden', 'true');
  musicPlayerModal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="musicPlayerModalLabel">${title} - ${artist}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex flex-column align-items-center">
            <img src="${image}" class="img-fluid mb-3" alt="${title}" style="max-width: 300px;">
            <audio id="audioPlayer" controls>
              <source src="${file}" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
            <div class="mt-3">
              <button class="btn btn-secondary" onclick="skipTrack(-1)">Previous</button>
              <button class="btn btn-secondary" onclick="skipTrack(1)">Next</button>
            </div>
            <div class="mt-3">
              <label for="volumeControl">Volume:</label>
              <input type="range" id="volumeControl" min="0" max="1" step="0.01" value="1" onchange="setVolume(this.value)">
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(musicPlayerModal);
  const modal = new bootstrap.Modal(document.getElementById('musicPlayerModal'));
  modal.show();

  // Set volume control
  const audioPlayer = document.getElementById('audioPlayer');
  const volumeControl = document.getElementById('volumeControl');
  volumeControl.addEventListener('input', () => {
    audioPlayer.volume = volumeControl.value;
  });
}

// Function to skip tracks (dummy implementation)
function skipTrack(direction) {
  Swal.fire('Info', `Skipping ${direction > 0 ? 'next' : 'previous'} track.`, 'info');
}

// Function to set volume
function setVolume(volume) {
  const audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.volume = volume;
}



// Toggle sidebar for smartphones
const headerToggle = document.getElementById('header-toggle');
const nav = document.getElementById('navbar'); // Ensure your navbar has an ID of "navbar"

headerToggle.addEventListener('click', () => {
  nav.classList.toggle('show-menu'); // Toggle the "show-menu" class
});
