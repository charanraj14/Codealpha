document.addEventListener('DOMContentLoaded', () => {
    const songs = [
        { title: "Apna bana le", author: "Arijit Singh", url: "songs/ApnaBanale.mp3" },
        { title: "Badtameez Dill", author: "Benny Dayal", url: "songs/BadtameezDil.mp3" },
        { title: "Balam pichkari", author: "Shalmali Kholgade", url: "songs/Balampichkari.mp3" },
        { title: "Eyy bidda", author: "Nakash Aziz", url: "songs/Eyybidda.mp3" },
        { title: "Ninnila", author: "Armaan Malik", url: "songs/Ninnila.mp3" }
    ];

    let currentSongIndex = 0;
    const audio = document.getElementById('audio');
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const loopBtn = document.getElementById('loop');
    const likeBtn = document.getElementById('like');
    const songList = document.getElementById('song-list');
    const addSongBtn = document.getElementById('add-song');
    const songTitleInput = document.getElementById('song-title');
    const songAuthorInput = document.getElementById('song-author');
    const songFileInput = document.getElementById('song-file');

    let isPlaying = false;
    let isLooping = false;

    function loadSong(song) {
        title.textContent = song.title;
        author.textContent = song.author;
        audio.src = song.url;
    }

    function playSong() {
        audio.play();
        isPlaying = true;
        playPauseBtn.innerHTML = '&#9208;';
    }

    function pauseSong() {
        audio.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '&#9654;';
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(songs[currentSongIndex]);
        playSong();
    }

    function toggleLoop() {
        isLooping = !isLooping;
        audio.loop = isLooping;
        loopBtn.style.color = isLooping ? '#007BFF' : 'initial';
    }

    function toggleLike() {
        likeBtn.style.color = likeBtn.style.color === 'red' ? 'initial' : 'red';
    }

    function addSong() {
        const title = songTitleInput.value.trim();
        const author = songAuthorInput.value.trim();
        const file = songFileInput.files[0];
        if (title && author && file) {
            const url = URL.createObjectURL(file);
            songs.push({ title, author, url });
            updateSongList();
            songTitleInput.value = '';
            songAuthorInput.value = '';
            songFileInput.value = '';
        }
    }

    function deleteSong(index) {
        songs.splice(index, 1);
        if (index === currentSongIndex) {
            currentSongIndex = 0;
            loadSong(songs[currentSongIndex]);
        }
        updateSongList();
    }

    function updateSongList() {
        songList.innerHTML = '';
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = `${song.title} - ${song.author}`;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteSong(index));
            li.appendChild(deleteBtn);
            songList.appendChild(li);
        });
    }

    playPauseBtn.addEventListener('click', () => {
        isPlaying ? pauseSong() : playSong();
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    loopBtn.addEventListener('click', toggleLoop);
    likeBtn.addEventListener('click', toggleLike);
    addSongBtn.addEventListener('click', addSong);

    loadSong(songs[currentSongIndex]);
    updateSongList();
});
