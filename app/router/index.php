<?php

include_once $_SERVER['DOCUMENT_ROOT'] . '/rest/Db.php';

if (isset($_POST) && isset($_POST['route'])) {
    $_post = validate_request($_POST); //Nettoyer la requête
    $resp = []; //Pour stocker la reponse
    $viewPath = $_SERVER['DOCUMENT_ROOT'] . '/app/view/'; //Chemin vers les vues
    $id = isset($_post['id']) ? $_post['id'] : null; //id ou pas id ?
    switch ($_post["route"]) {
        //TODO 
        //indice : file_get_contents()
    }
    echo json_encode($resp);
}

function validate_request($request)
{
    foreach ($request as $k => $v) {
        if (is_array($v)) {
            validate_request($v);
        } else {
            $request[$k] = htmlspecialchars(strip_tags(stripslashes(trim($v))));
        }
    }
    return $request;
}
