const audioPlayer = document.querySelector('#audio-player');

const playerCover = document.querySelector('#player-cover');
const playerTitle = document.querySelector('#player-title');
const playerArtist = document.querySelector('#player-artist');
const playerAlbum = document.querySelector('#player-album');

const previousButton = document.querySelector('#previous-button');
const nextButton = document.querySelector('#next-button');

const songs = document.querySelectorAll('.song');

let currentSongIndex = 0;


// Fonction pour jouer une chanson
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


// Cliquer sur une chanson
songs.forEach((song, index) => {

    song.addEventListener('click', () => {

        playSong(index);

    });

});


// Bouton suivant
nextButton.addEventListener('click', () => {

    let nextIndex = currentSongIndex + 1;

    if (nextIndex >= songs.length) {
        nextIndex = 0;
    }

    playSong(nextIndex);

});


// Bouton précédent
previousButton.addEventListener('click', () => {

    let previousIndex = currentSongIndex - 1;

    if (previousIndex < 0) {
        previousIndex = songs.length - 1;
    }

    playSong(previousIndex);

});


// Passer automatiquement à la chanson suivante
audioPlayer.addEventListener('ended', () => {

    let nextIndex = currentSongIndex + 1;

    if (nextIndex >= songs.length) {
        nextIndex = 0;
    }

    playSong(nextIndex);

});