const audioPlayer = document.querySelector('#audio-player');

const playerCover = document.querySelector('#player-cover');
const playerTitle = document.querySelector('#player-title');
const playerArtist = document.querySelector('#player-artist');
const playerAlbum = document.querySelector('#player-album');

const previousButton = document.querySelector('#previous-button');
const nextButton = document.querySelector('#next-button');
const randomButton = document.querySelector('#random-button');
const repeatButton = document.querySelector('#repeat-button');

const commentsList = document.querySelector('#comments-list');
const commentForm = document.querySelector('#comment-form');
const commentUsername = document.querySelector('#comment-username');
const commentContent = document.querySelector('#comment-content');

const songs = document.querySelectorAll('.song');

let currentSongIndex = 0;
let randomMode = false;
let repeatMode = false;


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

    audioPlayer.src = `audio/${file}`;

    currentSongIndex = index;

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

        randomButton.textContent = ' ⮔ON';

    } else {

        randomButton.textContent = '⮔';

    }

});


repeatButton.addEventListener('click', () => {

    repeatMode = !repeatMode;

    if (repeatMode) {

        repeatButton.textContent = '⮔ ON';

    } else {

        repeatButton.textContent = '⮔';

    }

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