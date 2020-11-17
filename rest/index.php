<?php

switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET':
        $_get = validate_request($_GET);
        //table obligatoire
        $table = isset($_get['table']) ? $_get['table'] : null;
        $id = isset($_get['id']) ? $_get['id'] : null;
        $sorter = isset($_get['sorter']) ? $_get['sorter'] : null;
        $where = isset($_get['where']) ? $_get['where'] : null;
        $orderby = isset($_get['orderby']) ? $_get['orderby'] : null;
        if (!$table) {
            echo 'Db::select($table, $id, $sorter, $orderby)';
        };
        break;
    case 'POST':
        $_post = validate_request($_POST);
        //table obligatoire
        $table = isset($_get['table']) ? $_get['table'] : null;
        $params = isset($_get['params']) ? $_get['params'] : null;
        if (!$table) {
            echo 'Db::insert($table, $params)';
        };
        break;
    case 'PUT':
        $_del = json_decode(file_get_contents('php://input'), true);
        //table et id obligatoire
        $table = isset($_get['table']) ? $_get['table'] : null;
        $id = isset($_get['id']) ? $_get['id'] : null;
        $params = isset($_get['params']) ? $_get['params'] : null;
        if (!$table && !$id) {
            echo 'Db::update($table, $params)';
        };
        break;
    case 'DELETE':
        $_del = json_decode(file_get_contents('php://input'), true);
        //table et id obligatoire
        $table = isset($_get['table']) ? $_get['table'] : null;
        $id = isset($_get['id']) ? $_get['id'] : null;
        if (!$table && !$id) {
            echo 'Db::delete($table, $params)';
        };
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


