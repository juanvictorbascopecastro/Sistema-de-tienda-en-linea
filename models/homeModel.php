<?php

class HomeModel extends Model {
    public function __construct() {
        parent::__construct();
    }
    
    public function promocion(){
        try{
            $statement = $this->db->connect()->query('SELECT p.idproducto, p.idcategoria, p.nombre, p.descripcion, p.descuento, p.imagen, p.precio, p.moneda, p.estado, c.nombre AS categoria FROM producto p INNER JOIN categoria c ON c.idcategoria = p.idcategoria WHERE p.descuento > 0');  
            $statement->execute();
            $data = $statement->fetchAll(PDO::FETCH_ASSOC);
		    return $data;
        }catch(PDOException $e){
            return [];
        }
    }

}

?>