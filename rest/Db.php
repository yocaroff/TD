<?php
class Db
{
    private static $db = null;
    static function getDb()
    {
        if (self::$db === null) {
            // Paramètres de configuration DB
            $dsn = "mysql:host=localhost;port=3306;dbname=td";
            $user = "doudou";
            $pass = "doudou59";
            
            
            // Création de la connexion
            try {
                self::$db = new PDO(
                    $dsn,
                    $user,
                    $pass,
                    array(
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                        PDO::ATTR_PERSISTENT => true
                    )
                );
            } catch (PDOException $e) {
                var_dump($e);
            }
        }
        return self::$db;
    }

    private static $stmt = null;
    public static function query($sql, $params = null)
    {
        $result = false;
        try {
            $stmt = self::getDb()->prepare($sql); // requête préparée
            Db::$stmt = $stmt;
            $result = $stmt->execute($params);
        } catch (PDOException $e) {
            //var_dump($e);
        }
        return $result;
    }

	static function select($table, $id, $where, $orderby){
		$param = [];
		



        if (isset($id)) {
			$where .= " AND id = ?";
			$param[] = $id; 
			echo 'id';
		};
		if (isset($sorter)) {
			foreach($sorter as $k => $v){
				$where .= "AND ".$k." = ?";
				$param[] = $v;  
				echo 'sorter';
			};
		};
		$order = "id";
		if (isset($orderby)) {
			$order = "";
			foreach($orderby as $k){
				$order .= $k.", ";
			}
			$order = substr($order, 0, -2);
		}
		$sql = "SELECT * FROM $table WHERE $where ORDER BY $order";
		$resp = self::query($sql, $param);
        $rows = Db::$stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($rows);
	}



	// public function update($table, $paramètre){
	// 	$sql = "update $table";
	// 	$param = null;
	// 	if(!empty($paramètre)){
	// 		$param = [];
	// 		$str = '';
	// 		$tempo = '';
	// 		$sql .= ' set ';
	// 		foreach($paramètre as $key => $value){
	// 			if ($key == "id") {
	// 				$str = " where $key = ?";
	// 				$tempo = $value;
	// 			}
	// 			else {
	// 				$sql .= $key.' = ?, ';
	// 				$param[] = $value;
	// 			}
	// 		}
	// 		$sql = substr($sql, 0, -2);
	// 	}
	// 	$param[] = $tempo;
	// 	$sql .= $str;
	// 	if(!$connexion=self::$_instance->query($sql,$param)){
	// 		echo 'error';
	// 	};	
	// }

	// public function delete($table, $paramètre){
	// 	$sql = "delete from $table";
	// 	$param = null;
	// 	if(!empty($paramètre)){
	// 		$param = [];
	// 		$sql .= ' where';
	// 		foreach($paramètre as $key => $value){
	// 			$sql .= ' '.$key.' = ? and';
	// 			$param[] = $value;
	// 		}
	// 		$sql = substr($sql, 0, -4);
	// 	}
	// 	if(!$connexion=self::$_instance->query($sql,$param)){
	// 		echo 'error';
	// 	};	
	// }

	// public function insert($table, $paramètre){
	// 	$sql = "insert into $table ";
	// 	$col = '';
	// 	$val = '';
	// 	$param = null;
	// 	if(!empty($paramètre)){
	// 		$param = [];
	// 		foreach($paramètre as $key => $value){
	// 			$param[] = $value;
	// 			$col .= "$key, ";//$key
	// 			$val .= '?, ';//$value	
	// 		}
	// 		$col = substr($col, 0, -2);
	// 		$val = substr($val, 0, -2);
	// 	}
	// 	$sql .= '('.$col.') values ('.$val.')';
	// 	if(!$connexion=self::$_instance->query($sql,$param)){
	// 		echo 'error';
	// 	};
	// }

	// public function recup() {
	// 	$sql = "show tables";
		
	// 	if(!$connexion=self::$_instance->query($sql, null)){
	// 		echo 'error';
	// 	}else{
	// 		$rows = $connexion->fetchAll(PDO::FETCH_ASSOC);
	// 		if (count($rows) == 0) {
	// 			$rows = null;
	// 		}
	// 		return json_encode($rows);
	// 	}

	// }
}