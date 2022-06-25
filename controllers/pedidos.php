<?php

class Pedidos extends Controller{
    function __construct() {
        parent::__construct();
        $this->view->data['id'] = 2;
        $this->view->data['title'] = 'Pedidos';
        $this->view->data['js'] = '/modulos/pedido.js';
    }

    public function render(){
      $this->view->render('pedidos/index');//hacemos referencia a la vista
    }	
    public function getPedidos() {
        $datos = $this->model->get(); 
        $this->ResponseData($datos);
    }

    public function realizarEntrega(){
        if(isset($_POST['idpedido'])){
            $idpedido = $_POST['idpedido'];
            $res = $this->model->update_status(['idpedido' => $idpedido]);
            if($res){
                $this->Response(true, 'Datos actualizado correctamente');
            }else{
                $this->Response(false, '¡No se actualizaron lo datos!');
            }
        }else{
            $this->Response(false, '¡No se envio el ID del usuario a desactivar!');
        }
    }
}

?>