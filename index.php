<?php

require_once('connexion.php');

$request = $db->query('
    SELECT 
        songs.id,
        songs.title,
        songs.artist,
        songs.file,
        albums.name AS album_name,
        albums.cover
    FROM songs
    INNER JOIN albums ON songs.album_id = albums.id
    ORDER BY albums.name, songs.title
');

$songs = $request->fetchAll(PDO::FETCH_ASSOC);

?>

<!DOCTYPE html>
<html lang="fr">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Lecteur Audio</title>

    <link rel="stylesheet" href="style.css">

</head>

<body>

    <main class="app">

        <section class="player">

            <div class="cover">

                <img
                    id="player-cover"
                    src="images/default.jpg"
                    alt="Pochette de l'album"
                >

            </div>

            <div class="song-info">

                <h1 id="player-title">
                    Aucune chanson sélectionnée
                </h1>

                <h2 id="player-artist">
                    Aucun artiste
                </h2>

                <p id="player-album">
                    Aucun album
                </p>

                <audio id="audio-player" controls>
                    Votre navigateur ne supporte pas l'élément audio.
                </audio>
                <div class="player-buttons">

    <div class="player-buttons">

    <button id="previous-button">←</button>

    <button id="random-button">↬</button>

    <button id="next-button">→</button>

    <button id="repeat-button">⟳</button>

</div>

</div>

            </div>

        </section>


        <section class="songs">

            <h2>Mes chansons</h2>

            <div class="song-list">

                <?php foreach ($songs as $song): ?>

                    <article
                        class="song"
                        data-id="<?= $song['id'] ?>"
                        data-title="<?= htmlspecialchars($song['title']) ?>"
                        data-artist="<?= htmlspecialchars($song['artist']) ?>"
                        data-album="<?= htmlspecialchars($song['album_name']) ?>"
                        data-file="<?= htmlspecialchars($song['file']) ?>"
                        data-cover="<?= htmlspecialchars($song['cover']) ?>"
                    >

                        <div class="song-cover">

                            <img
                                src="images/<?= htmlspecialchars($song['cover']) ?>"
                                alt="Pochette de <?= htmlspecialchars($song['album_name']) ?>"
                            >

                        </div>

                        <div class="song-details">

                            <h3>
                                <?= htmlspecialchars($song['title']) ?>
                            </h3>

                            <p>
                                <?= htmlspecialchars($song['artist']) ?>
                            </p>

                            <span>
                                <?= htmlspecialchars($song['album_name']) ?>
                            </span>

                        </div>

                    </article>

                <?php endforeach; ?>

            </div>

        </section>

    </main>

    <script src="js/script.js"></script>

</body>

</html>