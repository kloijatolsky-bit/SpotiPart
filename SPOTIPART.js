const playlist = [

    {
        id: 1,
        title: "All Too Well",
        artist: "Taylor Swift",
        album: "Red",
        duration: "5:29",

        // Album cover location
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJV7dSKwjMZDENwAc8suPRR1QsrDiDFavW_3pu5Z2rvA&s",

        // MP3 music location
        audio: "songs/all-too-well.mp3"
    },

    {
        id: 2,
        title: "cardigan",
        artist: "Taylor Swift",
        album: "Folklore",
        duration: "4:00",

        // Album cover location
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEh2KpbN5jx0EgNOYhmvro00rgMx1HXTRaO1AtihEj4A&s=10",

        // MP3 music location
        audio: "songs/Taylor Swift - cardigan (Official Lyric Video).mp3"
    },
    {
        id: 3,
        title: "I Think They Call This Love",
        artist: "Elliot James Reay",
        album: "Single",
        duration: "3:16",

        // Album cover location
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrySlnzUw9rvQLwgxUT1DhWAKcoW1opk_76amACMSRfw&s=10",

        // MP3 music location
        audio: "songs/Elliot James Reay - I Think They Call This Love (Lyrics).mp3"
    },

    {
        id: 4,
        title: "Chanel",
        artist: "Frank Ocean",
        album: "Single",
        duration: "3:30",

        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8tT9oEKK6iauHhqw16J9VszhuxGgqTiyMDsYSDmu94Q&s=10",

        audio: "songs/Frank+Ocean+-+Chanel+(+Lyrics) [l_8sYrH3lb0].mp3"
    },

    {
        id: 5,
        title: "Trust Issues",
        artist: "Drake",
        album: "Single",
        duration: "4:45",

        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzZNWsdb7iBURoLsjyzxehmAwFZHL15BYScLriuITIuA&s=10",

        audio: "songs/Drake - Trust Issues (Lyrics) - (original Kbps).mp3"
    },


    {
        id: 6,
        title: "Daisies",
        artist: "Justin Bieber",
        album: "SWAG",
        duration: "2:56",

        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-W4Irqex1NBJ2DjXx9AVlAY0APkUCC1PxoriErzJynA&s=10E",

        audio: "songs/Justin Bieber - DAISIES (Lyrics).mp3"
    },

    {
        id: 7,
        title: "One More Night",
        artist: "Maroon 5",
        album: "Overexposed",
        duration: "3:42",

        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDOQYdSKVMLyE-NrxaqK0NHZ32JrGrc9IVZLUpMkAPfQ&s=10",

        audio: "songs/Maroon 5 - One More Night (Lyric Video).mp3"
    },

    {
        id: 8,
        title: "Angel Of My Dreams",
        artist: "JADE",
        album: "That's Showbiz Baby!",
        duration: "3:19",

        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsbx33G7R3dZcbA8FNWh4cS1YtDAGXBynrQ1Bm8MDGBw&s=10",

        audio: "songs/JADE+-+Angel+Of+My+Dreams+(Lyric+Video) [ZP3XMEayaVo].mp3"
    },

    {
        id: 9,
        title: "her",
        artist: "JVKE",
        album: "Single",
        duration: "2:22",

        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMJwssb_mU1hvfCltlTWnmh3EZnrmtSg-jyWWzdo2iHQ&s",

        audio: "songs/JVKE - her (Lyrics).mp3"
    },

    {
        id: 10,
        title: "A Thousand Years",
        artist: "John Michael Howell, JVKE, ZVC",
        album: "Single",
        duration: "3:00",

        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF57Ui2gD6_q-Ts1rT6nNL6YZ6iWTixMgiSKvlm4Sikw&s",

        audio: "songs/John Michael Howell, JVKE, ZVC - A Thousand Years (Lyrics).mp3"
    }


];


// =====================================
// 2. SELECT HTML ELEMENTS
// =====================================

const tracksContainer = document.getElementById("tracksContainer");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const playerArt = document.getElementById("playerArt");
const currentTime = document.getElementById("currentTime");
const totalDuration = document.getElementById("totalDuration");
const searchInput = document.getElementById("searchInput");
const playAllBtn = document.getElementById("playAllBtn");


// =====================================
// 3. CREATE AUDIO PLAYER
// =====================================

const audio = new Audio();

// Default volume: 80%
audio.volume = 0.8;

let currentTrackIndex = 0;
let isPlaying = false;


// =====================================
// 4. FORMAT SONG TIME
// =====================================

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;

}


// =====================================
// 5. DISPLAY SONGS
// =====================================

function createTrackItem(song, number, trackIndex) {
    const item = document.createElement("div");
    item.className = "track-item";
    item.innerHTML = `
        <span>${number}</span>
        <div class="track-info">
            <img src="${song.image}" class="track-image" alt="Album cover">
            <div class="track-details">
                <div class="track-title">${song.title}</div>
                <div class="track-artist">${song.artist}</div>
            </div>
        </div>
        <span style="color:#888">${song.album}</span>
        <span style="color:#888">${song.duration}</span>
    `;
    item.addEventListener("click", () => playSongByIndex(trackIndex));
    return item;
}

function renderSongs(songsToDisplay = playlist) {
    tracksContainer.innerHTML = "";

    songsToDisplay.forEach(song => {
        const trackIndex = playlist.findIndex(item => item.id === song.id);
        const item = createTrackItem(song, trackIndex + 1, trackIndex);

        if (trackIndex === currentTrackIndex && isPlaying) {
            item.classList.add("playing");
        }

        tracksContainer.appendChild(item);
    });
}


// =====================================
// 6. PLAY SELECTED SONG
// =====================================

function playSongByIndex(index) {

    if (index < 0 || index >= playlist.length) {
        return;
    }

    currentTrackIndex = index;

    const song = playlist[currentTrackIndex];

    audio.src = song.audio;
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;
    playerArt.innerHTML = `<img src="${song.image}" alt="Album cover">`;
    progressBar.value = 0;
    currentTime.textContent = "0:00";
    totalDuration.textContent = "0:00";
    audio.play().then(() => {
        isPlaying = true;
        updatePlayButton();
        renderSongs();
    }).catch(error => {
        isPlaying = false;
        updatePlayButton();
        console.error("Audio playback error:", error);
        alert("Unable to play music. Please check your MP3 file path.");
    });
}


// =====================================
// 7. PLAY AND PAUSE
// =====================================

function togglePlay() {
    if (!audio.src) {
        playSongByIndex(0);
        return;
    }

    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play().then(() => {
            isPlaying = true;
            updatePlayButton();
            renderSongs();
        }).catch(error => {
            console.error("Playback error:", error);
        });
    }
    updatePlayButton();
}


// Update play button icon

function updatePlayButton() {
    playBtn.textContent = isPlaying ? "⏸" : "▶";
}


// =====================================
// 8. NEXT SONG
// =====================================

function nextSong() {
    playSongByIndex((currentTrackIndex + 1) % playlist.length);
}


// =====================================
// 9. PREVIOUS SONG
// =====================================

function previousSong() {
    playSongByIndex((currentTrackIndex - 1 + playlist.length) % playlist.length);
}


// =====================================
// 10. BUTTON EVENTS
// =====================================

playBtn.addEventListener("click", togglePlay);

nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", previousSong);

playAllBtn.addEventListener("click", () => playSongByIndex(0));


// =====================================
// 11. AUTOMATICALLY FINISH SONG
// =====================================

audio.addEventListener("ended", () => {

    isPlaying = false;

    updatePlayButton();

    renderSongs();

});


// =====================================
// 12. UPDATE PROGRESS BAR
// =====================================

audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const progress =
            (audio.currentTime / audio.duration) * 100;

        progressBar.value = progress;

        currentTime.textContent =
            formatTime(audio.currentTime);

    }

});


// =====================================
// 13. DISPLAY SONG DURATION
// =====================================

audio.addEventListener("loadedmetadata", () => {

    totalDuration.textContent =
        formatTime(audio.duration);

});


// =====================================
// 14. SEEK THROUGH THE SONG
// =====================================

progressBar.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progressBar.value / 100) * audio.duration;

    }

});


// =====================================
// 15. VOLUME CONTROL
// =====================================

volumeBar.addEventListener("input", () => {

    audio.volume = volumeBar.value / 100;

});


// =====================================
// 16. SEARCH SONGS
// =====================================

searchInput.addEventListener("input", (event) => {

    const searchTerm =
        event.target.value.toLowerCase();

    const filteredSongs = playlist.filter(song =>

        song.title.toLowerCase().includes(searchTerm) ||

        song.artist.toLowerCase().includes(searchTerm) ||

        song.album.toLowerCase().includes(searchTerm)

    );

    renderSongs(filteredSongs);

});


// =====================================
// 17. INITIALIZE WEBSITE
// =====================================


// =====================================
// 18. LIBRARY AND CREATE PLAYLIST
// =====================================

// Your personal playlists
let playlists = [
    {
        id: 1,
        name: "Favorites",
        songs: [1, 2]
    },
    {
        id: 2,
        name: "Chill Vibes",
        songs: [2, 3, 4, 5]
    }
];

let selectedPlaylistId = null;
let nextPlaylistId = 3;


// HTML elements
const createPlaylistBtn = document.getElementById("createPlaylistBtn");
const playlistList = document.getElementById("playlistList");
const libraryView = document.getElementById("libraryView");
const playlistView = document.getElementById("playlistView");
const libraryTracks = document.getElementById("libraryTracks");
const playlistTracks = document.getElementById("playlistTracks");
const playlistPlayBtn = document.getElementById("playlistPlayBtn");


// Switch between Library and Playlist screens
function showView(view) {
    if (libraryView) libraryView.hidden = view !== "library";
    if (playlistView) playlistView.hidden = view !== "playlist";
}


// Display all playlists in the sidebar
function renderPlaylistList() {
    if (!playlistList) return;

    playlistList.innerHTML = "";

    playlists.forEach((item) => {
        const li = document.createElement("li");
        const button = document.createElement("button");

        button.textContent = item.name;
        button.addEventListener("click", () => {
            openPlaylist(item.id);
        });

        li.appendChild(button);
        playlistList.appendChild(li);
    });
}


// Display all songs in the Library
function renderLibrary() {
    if (!libraryTracks) return;

    libraryTracks.innerHTML = "";

    playlist.forEach((song, index) => {
        libraryTracks.appendChild(createTrackItem(song, index + 1, index));
    });
}


// Create a new playlist
function createPlaylist() {
    const name = prompt("What would you like to name your playlist?");

    if (!name || !name.trim()) return;

    const newPlaylist = {
        id: nextPlaylistId++,
        name: name.trim(),
        songs: []
    };

    playlists.push(newPlaylist);

    renderPlaylistList();
    openPlaylist(newPlaylist.id);
}


// Open a selected playlist
function openPlaylist(id) {
    const selected = playlists.find(item => item.id === id);

    if (!selected) return;

    selectedPlaylistId = id;

    showView("playlist");

    const title = document.getElementById("playlistTitle");

    if (title) {
        title.textContent = selected.name;
    }

    renderPlaylistSongs(selected);
}


// Display songs inside a playlist
function renderPlaylistSongs(selected) {
    if (!playlistTracks) return;

    playlistTracks.innerHTML = "";

    if (selected.songs.length === 0) {
        playlistTracks.innerHTML = "<p>This playlist is empty. Add songs to it soon!</p>";
        return;
    }

    selected.songs.forEach((songId, index) => {
        const song = playlist.find(item => item.id === songId);
        if (!song) return;

        const trackIndex = playlist.findIndex(track => track.id === song.id);
        playlistTracks.appendChild(createTrackItem(song, index + 1, trackIndex));
    });
}


// Library navigation
document.querySelectorAll('[data-view="library"]').forEach(button => {
    button.addEventListener("click", () => {
        showView("library");
        renderLibrary();
    });
});


// Create Playlist button
if (createPlaylistBtn) {
    createPlaylistBtn.addEventListener("click", createPlaylist);
}


// Play Playlist button
if (playlistPlayBtn) {
    playlistPlayBtn.addEventListener("click", () => {
        const selected = playlists.find(
            item => item.id === selectedPlaylistId
        );

        if (!selected || selected.songs.length === 0) {
            alert("This playlist is empty!");
            return;
        }

        const firstSongIndex = playlist.findIndex(
            song => song.id === selected.songs[0]
        );

        playSongByIndex(firstSongIndex);
    });
}


// Initial playlist display
renderPlaylistList();
renderLibrary();

renderSongs();