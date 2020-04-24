<?php 

// $mahasiswa = [
// 	[
// 		"nama" => "Indra Putra",
// 		"alamat" => "JL Kapas Krampung",
// 		"jurusan" => "Sistem Informasi",
// 	],
// 	[
// 		"nama" => "Ahmad Epri",
// 		"alamat" => "JL Jedong",
// 		"jurusan" => "Teknik Kimia",
// 	],
// ];

$dbh = new PDO('mysql:host=localhost;dbname=db_barber','root','');
$db = $dbh->prepare('SELECT * FROM produk');
$db->execute();
$mahasiswa = $db->fetchAll(PDO::FETCH_ASSOC);

$data = json_encode($mahasiswa);
echo $data;

 ?>