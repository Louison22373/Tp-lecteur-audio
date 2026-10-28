const audioPlayer = document.querySelector('#audio-player');

const playerCover = document.querySelector('#player-cover');
const playerTitle = document.querySelector('#player-title');
const playerArtist = document.querySelector('#player-artist');
const playerAlbum = document.querySelector('#player-album');

const previousButton = document.querySelector('#previous-button');
const nextButton = document.querySelector('#next-button');
const randomButton = document.querySelector('#random-button');
const repeatButton = document.querySelector('#repeat-button');
const fadeButton = document.querySelector('#fade-button');

const commentsList = document.querySelector('#comments-list');

const commentForm = document.querySelector('#comment-form');
const commentUsername = document.querySelector('#comment-username');
const commentContent = document.querySelector('#comment-content');

const songs = document.querySelectorAll('.song');

let currentSongIndex = 0;
let randomMode = false;
let repeatMode = false;
let fadeMode = false;
let userVolume = 1;
let isFading = false;

audioPlayer.addEventListener('volumechange', () => {

    if (!isFading) {
        userVolume = audioPlayer.volume;
    }

});

function playSong(index) {

    if (index < 0 || index >= songs.length) {
        return;
    }

    const song = songs[index];

    const id = song.dataset.id;
    const title = song.dataset.title;
    const artist = song.dataset.artist;
    const album = song.dataset.album;
    const file = song.dataset.file;
    const cover = song.dataset.cover;

    playerTitle.textContent = title;
    playerArtist.textContent = artist;
    playerAlbum.textContent = album;

    playerCover.src = `images/${cover}`;

    currentSongIndex = index;

    audioPlayer.src = `audio/${file}`;

    if (fadeMode) {
        isFading = true;
        audioPlayer.volume = 0;
        isFading = false;
    } else {
        audioPlayer.volume = userVolume;
    }

    audioPlayer.load();

    audioPlayer.play();

    loadComments(id);
}

async function loadComments(songId) {

    const response = await fetch(`get-comments.php?song_id=${songId}`);

    const comments = await response.json();

    commentsList.innerHTML = '';

    if (comments.length === 0) {
        commentsList.innerHTML = '<p>Aucun commentaire pour cette chanson.</p>';
        return;
    }

    comments.forEach(comment => {

        const article = document.createElement('article');

        article.classList.add('comment');

        article.innerHTML = `
            <strong>${comment.username}</strong>
            <p>${comment.content}</p>
            <small>${comment.created_at}</small>
        `;

        commentsList.appendChild(article);

    });

}

songs.forEach((song, index) => {

    song.addEventListener('click', () => {

        playSong(index);

    });

});

randomButton.addEventListener('click', () => {

    randomMode = !randomMode;

    if (randomMode) {
        randomButton.textContent = '⮔ ON';
    } else {
        randomButton.textContent = '⮔';
    }

});

repeatButton.addEventListener('click', () => {

    repeatMode = !repeatMode;

    if (repeatMode) {
        repeatButton.textContent = '⟳ ON';
    } else {
        repeatButton.textContent = '⟳';
    }

});

fadeButton.addEventListener('click', () => {

    fadeMode = !fadeMode;

    if (fadeMode) {
        fadeButton.textContent = '↪ ON';
    } else {
        fadeButton.textContent = '↪';

        isFading = true;
        audioPlayer.volume = userVolume;
        isFading = false;
    }

});

audioPlayer.addEventListener('timeupdate', () => {

    if (!fadeMode) {
        return;
    }

    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    if (currentTime <= 5) {

        isFading = true;

        audioPlayer.volume = userVolume * (currentTime / 5);

        isFading = false;

        return;
    }

    if (duration - currentTime <= 5 && duration - currentTime > 0) {

        isFading = true;

        audioPlayer.volume =
            userVolume * ((duration - currentTime) / 5);

        isFading = false;

        return;
    }

    isFading = true;

    audioPlayer.volume = userVolume;

    isFading = false;

});

nextButton.addEventListener('click', () => {

    let nextIndex;

    if (randomMode) {

        nextIndex = Math.floor(Math.random() * songs.length);

    } else {

        nextIndex = currentSongIndex + 1;

        if (nextIndex >= songs.length) {
            nextIndex = 0;
        }

    }

    playSong(nextIndex);

});

previousButton.addEventListener('click', () => {

    let previousIndex = currentSongIndex - 1;

    if (previousIndex < 0) {
        previousIndex = songs.length - 1;
    }

    playSong(previousIndex);

});

audioPlayer.addEventListener('ended', () => {

    if (repeatMode) {

        playSong(currentSongIndex);

        return;
    }

    let nextIndex;

    if (randomMode) {

        nextIndex = Math.floor(Math.random() * songs.length);

    } else {

        nextIndex = currentSongIndex + 1;

        if (nextIndex >= songs.length) {
            nextIndex = 0;
        }

    }

    playSong(nextIndex);

});

commentForm.addEventListener('submit', async (event) => {

    event.preventDefault();

    const username = commentUsername.value;
    const content = commentContent.value;

    const currentSong = songs[currentSongIndex];

    const songId = currentSong.dataset.id;

    const formData = new FormData();

    formData.append('username', username);
    formData.append('content', content);
    formData.append('song_id', songId);

    const response = await fetch('add-comment.php', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {

        commentContent.value = '';

        loadComments(songId);

    }

});