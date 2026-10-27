const audioPlayer = document.querySelector('#audio-player');

const playerCover = document.querySelector('#player-cover');
const playerTitle = document.querySelector('#player-title');
const playerArtist = document.querySelector('#player-artist');
const playerAlbum = document.querySelector('#player-album');

const songs = document.querySelectorAll('.song');

console.log('Nombre de chansons trouvées :', songs.length);

songs.forEach(song => {

    song.addEventListener('click', () => {

        console.log('Chanson cliquée :', song.dataset.title);

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

        audioPlayer.play();

    });

});