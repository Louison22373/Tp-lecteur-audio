<?php

require_once('connexion.php');

$songId = $_GET['song_id'];

$request = $db->prepare('
    SELECT username, content, created_at
    FROM comments
    WHERE song_id = ?
    ORDER BY created_at DESC
');

$request->execute([$songId]);

$comments = $request->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');

echo json_encode($comments);