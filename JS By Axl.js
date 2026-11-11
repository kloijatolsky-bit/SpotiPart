// ============================================================
// SPOTIPART - Beginner-Friendly Vanilla JavaScript
// Perfect for 1st Year BSIT Presentation
// Concepts: DOM Selection, Event Listeners, Arrays & Objects
// ============================================================

// 1. Data Source (Array of Objects)
// Instead of 180 lines of duplicate HTML, keep songs in a clean array!
const playlist = [
    { id: 1, title: "Title Alpha", artist: "Artist Alpha", album: "Album Alpha", duration: "2:45" },
    { id: 2, title: "Title Beta", artist: "Artist Beta", album: "Album Beta", duration: "3:12" },
    { id: 3, title: "Title Gamma", artist: "Artist Gamma", album: "Album Gamma", duration: "2:58" },
    { id: 4, title: "Title Delta", artist: "Artist Delta", album: "Album Delta", duration: "3:30" },
    { id: 5, title: "Title Epsilon", artist: "Artist Epsilon", album: "Album Epsilon", duration: "2:20" }
];

// 2. DOM Elements Selection
const tracksContainer = document.getElementById("tracksContainer");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const searchInput = document.getElementById("searchInput");

// State Variables
let currentTrackIndex = 0;
let isPlaying = false;
let audioProgress = 0;
let progressTimer = null;

// 3. Render Songs Dynamically (DRY Principle)
function renderSongs(songsToDisplay) {
    tracksContainer.innerHTML = ""; // Clear existing
    songsToDisplay.forEach((song, index) => {
        const item = document.createElement("div");
        item.className = "track-item" + (index === currentTrackIndex && isPlaying ? " playing" : "");
        item.innerHTML = `
            <span>${index + 1}</span>
            <div>
                <div class="track-title" style="font-weight:600">${song.title}</div>
                <div style="font-size:12px;color:#888">${song.artist}</div>
            </div>
            <span style="color:#888">${song.album}</span>
            <span style="color:#888">${song.duration}</span>
        `;
        item.addEventListener("click", () => playSongByIndex(index));
        tracksContainer.appendChild(item);
    });
}

// 4. Playback Logic
function playSongByIndex(index) {
    currentTrackIndex = index;
    const song = playlist[currentTrackIndex];
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;
    isPlaying = true;
    playBtn.textContent = "⏸";
    renderSongs(playlist);
}

function togglePlay() {
    isPlaying = !isPlaying;
    playBtn.textContent = isPlaying ? "⏸" : "▶";
    if (isPlaying && playerTitle.textContent === "Select a track") {
        playSongByIndex(0);
    }
}

// 5. Next & Previous Buttons
prevBtn.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    playSongByIndex(currentTrackIndex);
});

nextBtn.addEventListener("click", () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    playSongByIndex(currentTrackIndex);
});

playBtn.addEventListener("click", togglePlay);

// 6. Search Filter
searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = playlist.filter(song => 
        song.title.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term)
    );
    renderSongs(filtered);
});

// Initialize on load
renderSongs(playlist);