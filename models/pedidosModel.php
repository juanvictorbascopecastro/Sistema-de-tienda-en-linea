<?php

class PedidosModel extends Model {
    public function __construct() {
        parent::__construct();
    }
    public function get(){
        try{
            $result = $this->db->connect()->query("SELECT p.idpedido, p.idcliente, p.fecha, p.estado, p.total, p.direccion, p.ciudad, p.latitud, p.longitud, c.dni, CONCAT(c.nombre, ' ', c.apellido) AS cliente, c.telefono, c.email FROM pedidos p INNER JOIN view_cliente c ON c.idcliente = p.idcliente");          
            $result->execute();
            $data = $result->fetchAll(PDO::FETCH_ASSOC);
            return $data;

        }catch(PDOException $e){
            return [];
        }
    }
    public function update_status($datos){
        try{
            $query = $this->db->connect()->prepare('UPDATE pedidos SET estado = estado+1 WHERE idpedido = :idpedido');
            $res = $query->execute(['idpedido' => $datos['idpedido']]);
            return $res;
        }catch(PDOException $e){
            return null;
        }
    }
}

?>