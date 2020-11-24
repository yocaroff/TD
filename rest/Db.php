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
            var_dump($e);
        }
        return $result;
    }

	static function select($table, $id, $where, $orderby){
		$param = [];
		if ($where == null){
			$where = "active = ?";
			$param[] = 1;
		}
		if ($id != null){
			$where .= " AND id = ?";
			$param[] = $id;
		}
		if ($orderby == null){
			$orderby = "id ASC";
		}
		$sql = "SELECT * FROM $table WHERE $where ORDER BY $orderby";

		$resp = self::query($sql, $param);
        $rows = Db::$stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($rows);
	}

	static function update($table, $id, $fields){
		$set = "";
		$param = [];
		// empèche la modification de l'id
		if (isset($fields) && isset($fields['id'])) {
			unset($fields['id']);
		}
		foreach($fields as $k => $v){
			$set .= $k."=?, ";
			$param[] = $v;
		}
		$set = substr($set, 0, -2);
		$where = "id = ?";
		$param[] = $id;
		$sql = "UPDATE $table SET $set WHERE $where";
		
		$resp = self::query($sql, $param);
		$resp = $resp && Db::$stmt->rowCount() == 1;
        return json_encode($resp);
	}

	static function delete($table, $id){
		$where = 'id =?';
		$param = [$id];
		$sql = "DELETE FROM $table WHERE $where";

		// echo $sql;
		// var_dump($param);

		$resp = self::query($sql, $param);
        return json_encode($resp);
	}

	static function insert($table, $fields) {
		// empèche la modification de l'id
		if (isset($fields) && isset($fields['id'])) {
			unset($fields['id']);
		};
		// permet d'insérer une ligne vierge
		if (!isset($fields)) {
			$fields = [];
			$fields['id'] = null;
		}
		$key = '';
		$value = '';
		$param = [];
		foreach($fields as $k => $v) {
			$key .= $k.', ';
			$value .= '?, ';
			$param[] = $v;
		};
		$key = substr($key, 0, -2);
		$value = substr($value, 0, -2);
		$sql = "INSERT INTO $table ($key) VALUES ($value)";

		$resp = self::query($sql, $param);
		if ($resp) {
			$resp = self::$db->lastInsertId();
		}
		return json_encode($resp);
	}

	public static function showTables() {
		$sql = "show tables";
		$param = null;
		
		$resp = self::query($sql, $param);
        $rows = Db::$stmt->fetchAll(PDO::FETCH_ASSOC);
		return json_encode($rows);
	}

}