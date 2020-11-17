<?php

include_once('Db.php');
$dbi = Db::getDb();


switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET':
        $_get = validate_request($_GET);
        //table obligatoire
        $table = isset($_get['table']) ? $_get['table'] : null;
        $id = isset($_get['id']) ? $_get['id'] : null;
        $sorter = isset($_get['where']) ? $_get['where'] : null;
        $orderby = isset($_get['orderby']) ? $_get['orderby'] : null;
        echo Db::select('product', $id, $where, $orderby);
        break;
    case 'POST':
        $_post = validate_request($_POST);
        //table obligatoire
        $table = isset($_post['table']) ? $_post['table'] : null;
        $params = isset($_post['params']) ? $_post['params'] : null;
        echo 'Db::insert($table, $params)';
        break;
    case 'PUT':
        $_put = json_decode(file_get_contents('php://input'), true);
        $_put = validate_request($_put);
        //table et id obligatoire
        $table = isset($_put['table']) ? $_put['table'] : null;
        $id = isset($_put['id']) ? $_put['id'] : null;
        $params = isset($_put['params']) ? $_put['params'] : null;
        echo 'Db::update($table, $params)';
        break;
    case 'DELETE':
        $_del = json_decode(file_get_contents('php://input'), true);
        $_del = validate_request($_del);
        //table et id obligatoire
        $table = isset($_del['table']) ? $_del['table'] : null;
        $id = isset($_del['id']) ? $_del['id'] : null;
        echo 'Db::delete($table, $param)';
        break;
}

function validate_request($request)
{
    foreach ($request as $k => $v) {
        if(is_array($v)){
            validate_request($v);
        }
        else{
            $request[$k] = htmlspecialchars(strip_tags(stripslashes(trim($v))));
        }
    }
    return $request;
}


