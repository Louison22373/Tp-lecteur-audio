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

</head>

<body>

    <h1>🎵 Lecteur Audio</h1>

    <h2>Mes chansons</h2>

    <?php foreach ($songs as $song): ?>

        <div>

            <h3><?= htmlspecialchars($song['title']) ?></h3>

            <p>
                Artiste : <?= htmlspecialchars($song['artist']) ?>
            </p>

            <p>
                Album : <?= htmlspecialchars($song['album_name']) ?>
            </p>

        </div>

        <hr>

    <?php endforeach; ?>

</body>

</html>