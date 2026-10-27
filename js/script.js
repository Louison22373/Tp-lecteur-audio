const audioPlayer = document.querySelector('#audio-player');

const playerCover = document.querySelector('#player-cover');
const playerTitle = document.querySelector('#player-title');
const playerArtist = document.querySelector('#player-artist');
const playerAlbum = document.querySelector('#player-album');

const previousButton = document.querySelector('#previous-button');
const nextButton = document.querySelector('#next-button');
const randomButton = document.querySelector('#random-button');
const repeatButton = document.querySelector('#repeat-button');

console.log('Bouton suivant :', nextButton);
console.log('Bouton précédent :', previousButton);

const songs = document.querySelectorAll('.song');

let currentSongIndex = 0;
let randomMode = false;
let repeatMode = false;

randomButton.addEventListener('click', () => {

    randomMode = !randomMode;

    if (randomMode) {

        randomButton.textContent = '↬ ON';

    } else {

        randomButton.textContent = '↬';

    }

});

function playSong(index) {

    if (index < 0 || index >= songs.length) {
        return;
    }

    const song = songs[index];

    playerTitle.textContent = song.dataset.title;
    playerArtist.textContent = song.dataset.artist;
    playerAlbum.textContent = song.dataset.album;

    playerCover.src = `images/${song.dataset.cover}`;

    audioPlayer.src = `audio/${song.dataset.file}`;

    currentSongIndex = index;

    audioPlayer.play();
}


songs.forEach((song, index) => {

    song.addEventListener('click', () => {

        playSong(index);

    });

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


repeatButton.addEventListener('click', () => {

    repeatMode = !repeatMode;

    if (repeatMode) {

        repeatButton.textContent = '⟳ ON';

    } else {

        repeatButton.textContent = '⟳';

    }

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