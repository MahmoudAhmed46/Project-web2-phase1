<?php
$server="localhost";
$username="root";
$password="";
$databaseName="EvetDetails";
$con=new mysqli($server,$username,$password,$databaseName);
if($con->connect_error){
    die("can't connect to database");
}
if(isset($_POST['object'])){
    $val=json_decode($_POST['object'],true);
    for($i=0;$i<count($val);$i++){
        $Name=$val[$i]['Name'];
        $Type=$val[$i]['eventType'];
        $Target=$val[$i]['eventTarget'];
        $Time=$val[$i]['eventTime'];
        $q="insert into Event values('$Name','$Type','$Target','$Time')";
        $con->query($q);
        if($con->affected_rows>0)
            echo "Inserted Successufly";
        else
            echo "Sorry: Insertion Faild";
    }
}
if(isset($_GET['getObject'])){
    $sql="select * from Event order by EventTime";
    if($res=$con->query($sql)){
        $records=array();
        if($res->num_rows > 0){
         while($rec=$res->fetch_assoc()){
             array_push($records,$rec);
         }
         echo json_encode($records);
        }
    }
}