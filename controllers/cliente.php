<?php

class Cliente extends Controller{
    function __construct() {
        parent::__construct();
        $this->view->data['id'] = 0;
        $this->view->data['title'] = 'Inicio';
        $this->view->data['js'] = '/modulos/cliente.js';
    }

    public function render(){
      $this->view->data['categorias'] = $this->getCategoria();
      $this->view->render('client/index');
    }	
    public function productos(){
      $this->view->data['id'] = 1;
      $this->view->data['js'] = '/modulos/productos-cliente.js';
      $this->view->data['idcategoria'] = $_GET['idcategoria'];
      $this->view->data['categorias'] = $this->getCategoria();
      if($_GET['idcategoria'] == 'promo'){
        $this->view->data['id'] = 3;
        $this->view->data['nombre_categoria'] = 'Productos con descuentos';
      }else{
        foreach($this->view->data['categorias'] as $i => $item) {
          if($this->view->data['idcategoria'] == $item['idcategoria']){
            $this->view->data['nombre_categoria'] = $item['nombre'];
            break;
          }
        }
      }
     
      $this->view->render('client/productos');
    }	

    public function getCategoria() {
        $datos = $this->model->selectCategorias(); 
        return $datos;
    }

    public function nuevoCliente(){
        if(isset($_POST['nombre']) && isset($_POST['apellido']) && isset($_POST['telefono']) && isset($_POST['dni']) && isset($_POST['email']) && isset($_POST['password'])){
			
            $nombre = $_POST['nombre'];
            $apellido = $_POST['apellido'];
            $telefono = $_POST['telefono'];
            $dni = $_POST['dni'];
            $email = $_POST['email'];
            $password = crypt($_POST['password'], '$2a$07$asxx54ahjppf45sd87a5a4dDDGsystemdev$');

                  $res = $this->model->insert([
              'nombre' => $nombre, 
              'apellido' => $apellido, 
              'telefono' => $telefono, 
              'dni' => $dni,
              'email' => $email,
              'password' => $password
            ]);

            if($res){
                $this->Response(true, 'Datos guardado correctamente');
            }else{
                $this->Response(false, '¡No se registraron lo datos!');
            }
        }else{
            $this->Response(false, '¡Hay campos que no se enviaron correctamente!');
        }
    }

    public function registrarPedido(){
      if(isset($_POST['idcliente']) && isset($_POST['productos']) && isset($_POST['total']) && isset($_POST['direccion']) && isset($_POST['ciudad'])){
			
          $idcliente = $_POST['idcliente'];
          $total = $_POST['total'];
          $productos = json_decode($_POST['productos'], true);
          $direccion = $_POST['direccion'];
          $ciudad = $_POST['ciudad'];
          $latitud = $_POST['latitud'];
          $longitud = $_POST['longitud'];
          
          $res = $this->model->insert_pedido([
            'idcliente' => $idcliente, 
            'productos' => $productos, 
            'total' => $total,
            'direccion' => $direccion,
            'ciudad' => $ciudad,
            'latitud' => $latitud,
            'longitud' => $longitud,
          ]);

          if($res){
              $this->Response(true, 'Pedido registrado correctamente');
          }else{
              $this->Response(false, '¡No se registraron lo datos!');
          }
      }else{
          $this->Response(false, '¡Hay campos que no se enviaron correctamente!');
      }
    }
    public function pedidos(){
      $this->view->data['id'] = 4;
      $this->view->data['js'] = '/modulos/mispedidos.js';
      $this->view->data['categorias'] = $this->getCategoria();
      $this->view->render('client/pedidos');
    }	
    public function getPedidos() {
      if(isset($_GET['idcliente'])){
        $datos = $this->model->pedidos($_GET['idcliente']); 
        $this->ResponseData($datos);
      }else{
        $this->Response(false, '¡No se envio su ID de usuario!');
      }
    }
    public function getProductosPedido(){
      if(isset($_GET['idpedido'])){
        $datos = $this->model->productos_pedido($_GET['idpedido']); 
        $this->ResponseData($datos);
      }else{
        $this->Response(false, '¡No se envio su ID del pedido!');
      }
    }
    public function cancelarPedido(){
      if(isset($_POST['idpedido'])){
        $datos = $this->model->delete_pedido($_POST['idpedido']); 
        $this->Response(true, 'Pedido cancelado correctamente');
      }else{
        $this->Response(false, '¡No se envio su ID del pedido!');
      }
    }
}

?>