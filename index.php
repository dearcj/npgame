<?php

$tableName = 'leaderboard';
$databaseName = 'level_game';

$conn = null;

 GetConnection($databaseName);
$submitQ = "INSERT INTO " . $tableName . "
            SET
                name=:name, lastname=:lastname, social_id=:social_id, score=:score";
$submitStatement = $conn->prepare($submitQ);

$selectQ = "SELECT name, lastname, score FROM " . $tableName . "  ORDER BY score ASC LIMIT 20";
$selectStatement = $conn->prepare($selectQ);



function SubmitScore($token_id, $name, $lastname, $score) {
  global $conn, $databaseName, $tableName, $submitStatement;

 $submitStatement->bindParam(":social_id", $token_id);
 $submitStatement->bindParam(":name", $name);
 $submitStatement->bindParam(":lastname", $lastname);
 $submitStatement->bindParam(":score", $score);
 if($submitStatement->execute()){
     return true;
 } else {
   return $submitStatement->errorInfo();
 }
};

function GetLeaderboard() {
  global $conn, $databaseName, $tableName, $selectStatement;
  if($selectStatement->execute()){
    $result = $selectStatement->fetchAll();
  }
 return $result;
}

function GetConnection() {
  global $conn, $databaseName;
        try{
          $conn = new PDO("mysql:host=" . "localhost" . ";dbname=" . $databaseName, "root", "admin");
          $conn->exec("set names utf8");
          $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
}

if (isset($_POST['func'])) {
 $func = $_POST['func'];
 if ($func == 'submit') {
   SubmitScore($_POST['social_id'], $_POST['name'], $_POST['last_name'], $_POST['score']);
 }

 if ($func == 'leaderboard') {
   echo json_encode(GetLeaderboard());
 }
}

/*con = GetConnection();

$query = "INSERT INTO
                " . $tableName . "
            SET
                name=:name, price=:price, description=:description, category_id=:category_id, created=:created";

    // prepare query
    $stmt = $this->conn->prepare($query);

    // sanitize
    $this->name=htmlspecialchars(strip_tags($this->name));
    $this->price=htmlspecialchars(strip_tags($this->price));
    $this->description=htmlspecialchars(strip_tags($this->description));
    $this->category_id=htmlspecialchars(strip_tags($this->category_id));
    $this->created=htmlspecialchars(strip_tags($this->created));

    // bind values
    $stmt->bindParam(":name", $this->name);
    $stmt->bindParam(":price", $this->price);
    $stmt->bindParam(":description", $this->description);
    $stmt->bindParam(":category_id", $this->category_id);
    $stmt->bindParam(":created", $this->created);

    // execute query
    if($stmt->execute()){
        return true;
    }
*/
 ?>
