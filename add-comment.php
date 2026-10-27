<?php

require_once('connexion.php');

$username = $_POST['username'];
$content = $_POST['content'];
$songId = $_POST['song_id'];

$request = $db->prepare('
    INSERT INTO comments (username, content, song_id)
    VALUES (?, ?, ?)
');

$request->execute([
    $username,
    $content,
    $songId
]);

echo 'Commentaire ajouté';