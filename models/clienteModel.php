<?php

class ClienteModel extends Model {
    public function __construct() {
        parent::__construct();
    }
    public function selectCategorias(){
        try{
            $result = $this->db->connect()->query('SELECT * FROM categoria');          
            $result->execute();
            $data = $result->fetchAll(PDO::FETCH_ASSOC);
            return $data;

        }catch(PDOException $e){
            return [];
        }
    }

    public function insert($datos){
        $query = $this->db->connect()->prepare('CALL pa_insert_cliente (:nombre, :apellido, :telefono, :dni, :email, :password)');
        $res = $query->execute([
            'nombre' => $datos['nombre'], 
            'apellido' => $datos['apellido'],
            'telefono' => $datos['telefono'],
            'dni' => $datos['dni'],
            'email' => $datos['email'],
            'password' => $datos['password']
        ]);
        return $res;
    }

    public function insert_pedido($datos){
        $query = $this->db->connect()->prepare('INSERT INTO pedidos (idcliente, fecha, estado, total, direccion, ciudad, latitud, longitud) VALUES (:idcliente, NOW(), 1, :total, :direccion, :ciudad, :latitud, :longitud)');
        $res = $query->execute(['idcliente' => $datos['idcliente'], 'total' => $datos['total'], 'direccion' => $datos['direccion'], 'ciudad' => $datos['ciudad'], 'latitud' => $datos['latitud'], 'longitud' => $datos['longitud']]);

        if($res){
			$id = $this->db->connect()->lastInsertId();
            $query2 = $this->db->connect()->prepare('INSERT INTO producto_pedido (idpedido, idproducto, cantidad) VALUES (:idpedido, :idproducto, :cantidad)');
			for($i = 0; $i < count($datos['productos']); $i++) {
			 	$arrOption = array(
					':idpedido'=> $id,
					':idproducto'=> $datos['productos'][$i]['idproducto'],
					':cantidad'=> $datos['productos'][$i]['cantidad'],
				);
				$res = $query2->execute($arrOption);
			}
            return $res;
		}
        return $res;
    }

    public function pedidos($idcliente){
        try{
            $statement = $this->db->connect()->prepare('SELECT * FROM pedidos  WHERE idcliente = :idcliente');  
            $statement->bindParam(":idcliente", $idcliente, PDO::PARAM_INT);
            $statement->execute();
            $data = $statement->fetchAll(PDO::FETCH_ASSOC);
            //var_dump($data);
		    return $data;
        }catch(PDOException $e){
            return [];
        }
    }

    public function productos_pedido($idpedido){
        try{
            $statement = $this->db->connect()->prepare('SELECT pp.idproducto_pedido, pp.idproducto, pp.cantidad, p.nombre, p.precio, p.moneda, p.descuento FROM producto_pedido pp INNER JOIN producto p ON p.idproducto = pp.idproducto  WHERE pp.idpedido = :idpedido');  
            $statement->bindParam(":idpedido", $idpedido, PDO::PARAM_INT);
            $statement->execute();
            $data = $statement->fetchAll(PDO::FETCH_ASSOC);
            //var_dump($data);
		    return $data;
        }catch(PDOException $e){
            return [];
        }
    }
    public function delete_pedido($idpedido){
        $query = $this->db->connect()->prepare('CALL pa_delete_pedido(:idpedido)');
        $res = $query->execute(['idpedido' => $idpedido]);
        return $res;
    }

}

?>