<?php

class ProductosModel extends Model {
    public function __construct() {
        parent::__construct();
    }
    public function insert($datos, $foto){
        $query = $this->db->connect()->prepare('INSERT INTO producto (nombre, moneda, precio, idcategoria, imagen, descripcion, estado) VALUES (:nombre, :moneda, :precio, :idcategoria, :imagen, :descripcion, 1)');
        $res = $query->execute([
            'nombre' => $datos['nombre'], 
            'moneda' => $datos['moneda'],
            'precio' => $datos['precio'],
            'idcategoria' => $datos['idcategoria'],
            'imagen' => $foto,
            'descripcion' => $datos['descripcion']]);
        return $res;
    }
 
    public function get($idcategoria){
        try{
            $statement = $this->db->connect()->prepare('SELECT p.idproducto, p.idcategoria, p.nombre, p.descripcion, p.descuento, p.imagen, p.precio, p.moneda, p.estado, c.nombre AS categoria FROM producto p INNER JOIN categoria c ON c.idcategoria = p.idcategoria WHERE c.idcategoria = :idcategoria');  
            $statement->bindParam(":idcategoria", $idcategoria, PDO::PARAM_INT);
            $statement->execute();
            $data = $statement->fetchAll(PDO::FETCH_ASSOC);
            //var_dump($data);
		    return $data;
        }catch(PDOException $e){
            return [];
        }
    }

    public function promocion(){
        try{
            $statement = $this->db->connect()->query('SELECT p.idproducto, p.idcategoria, p.nombre, p.descripcion, p.descuento, p.imagen, p.precio, p.moneda, p.estado, c.nombre AS categoria FROM producto p INNER JOIN categoria c ON c.idcategoria = p.idcategoria WHERE p.descuento > 0');  
            //$statement->bindParam(":idcategoria", $idcategoria, PDO::PARAM_INT);
            $statement->execute();
            $data = $statement->fetchAll(PDO::FETCH_ASSOC);
            //var_dump($data);
		    return $data;
        }catch(PDOException $e){
            return [];
        }
        /*try{
            $result = $this->db->connect()->query('SELECT * FROM categoria');          
            $result->execute();
            $data = $result->fetchAll(PDO::FETCH_ASSOC);
            return $data;

        }catch(PDOException $e){
            return [];
        }*/
    }

    public function ocultos(){
        try{
            $statement = $this->db->connect()->prepare('SELECT p.idproducto, p.idcategoria, p.nombre, p.descripcion, p.descuento, p.imagen, p.precio, p.moneda, p.estado, c.nombre AS categoria FROM producto p INNER JOIN categoria c ON c.idcategoria = p.idcategoria WHERE p.estado = 0');  
            $statement->execute();
            $data = $statement->fetchAll(PDO::FETCH_ASSOC);
            //var_dump($data);
		    return $data;
        }catch(PDOException $e){
            return [];
        }
    }

    public function search($text){
        try{
            $statement = $this->db->connect()->prepare('SELECT p.idproducto, p.idcategoria, p.nombre, p.descripcion, p.descuento, p.imagen, p.precio, p.moneda, p.estado, c.nombre AS categoria FROM producto p INNER JOIN categoria c ON c.idcategoria = p.idcategoria WHERE p.nombre LIKE  (:text)');  
            //$statement->bindParam(':text', '%'.$text.'%', PDO::PARAM_STR);
            $statement->execute(array(':text' => $text.'%'));
            $data = $statement->fetchAll(PDO::FETCH_ASSOC);
            //var_dump($data);
		    return $data;
        }catch(PDOException $e){
            return [];
        }
    }

    public function edit($datos, $foto){
        if($foto == null){
            $query = $this->db->connect()->prepare('UPDATE producto SET nombre = :nombre, idcategoria = :idcategoria, precio = :precio, moneda = :moneda, descripcion = :descripcion WHERE idproducto = :idproducto');
            $res = $query->execute([
                'idproducto' => $datos['idproducto'], 
                'nombre' => $datos['nombre'], 
                'moneda' => $datos['moneda'],
                'precio' => $datos['precio'],
                'idcategoria' => $datos['idcategoria'],
                'descripcion' => $datos['descripcion']]);
        }else{
            $query = $this->db->connect()->prepare('UPDATE producto SET nombre = :nombre, idcategoria = :idcategoria, precio = :precio, moneda = :moneda,  imagen=:imagen, descripcion = :descripcion WHERE idproducto = :idproducto');
            $res = $query->execute([
                'idproducto' => $datos['idproducto'], 
                'nombre' => $datos['nombre'], 
                'moneda' => $datos['moneda'],
                'precio' => $datos['precio'],
                'idcategoria' => $datos['idcategoria'],
                'imagen' => $foto,
                'descripcion' => $datos['descripcion']]);
        }
        return $res;
    }

    public function delete($datos){
        $query = $this->db->connect()->prepare('DELETE FROM producto WHERE idproducto = :idproducto');
        $res = $query->execute(['idproducto' => $datos['idproducto']]);
        return $res;
    }

    public function update_descuento($datos){
        $query = $this->db->connect()->prepare('UPDATE producto SET descuento = :descuento WHERE idproducto = :idproducto');
        $res = $query->execute([
            'idproducto' => $datos['idproducto'],
            'descuento' => $datos['descuento']]);
        return $res;
    }

    public function update_estado($datos){
        $query = $this->db->connect()->prepare('UPDATE producto SET estado = :estado WHERE idproducto = :idproducto');
        $res = $query->execute([
            'idproducto' => $datos['idproducto'],
            'estado' => $datos['estado']]);
        return $res;
    }
}

?>