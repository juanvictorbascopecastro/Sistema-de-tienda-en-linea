<?php

class Productos extends Controller{
    function __construct() {
        parent::__construct();
        $this->view->data['id'] = 3;
        $this->view->data['title'] = 'Productos';
        $this->view->data['js'] = '/modulos/producto.js';
    }

    public function render(){
      $this->view->render('productos/index');//hacemos referencia a la vista
    }	
    public function getData() {
        if(isset($_GET['idcategoria'])){
            $idcategoria = $_GET['idcategoria'];
            if($idcategoria == 'ocultos'){
              $datos = $this->model->ocultos();
            }else if($idcategoria == 'promo'){
              $datos = $this->model->promocion();
            }else{
              $datos = $this->model->get($idcategoria);
            }
 
            $lista = [];
            foreach ($datos as $i => $value) {
                $url_img = '';
                if($value['imagen']){
                    $url_img = "data:image/jpeg;base64,".base64_encode($value['imagen']);
                }
                $prod = array(
                    'idproducto' => $value['idproducto'],
                    'nombre' => $value['nombre'],
                    'precio' => $value['precio'],
                    'moneda' => $value['moneda'],
                    'imagen' => $url_img,
                    'descuento' => $value['descuento'],
                    'estado' => $value['estado'],
                    'descripcion' => $value['descripcion'],
                    'idcategoria' => $value['idcategoria'],
                );
                array_push ($lista , $prod);
            }
            $this->ResponseData($lista);
        }else{
            $this->Response(false, '¡No se envio el ID de la categoria!');
        }
    }
    public function buscarProducto(){
      if(isset($_GET['text'])){
          $text = $_GET['text'];
          $datos = $this->model->search($text);
          $lista = [];
          foreach ($datos as $i => $value) {
              $url_img = '';
              if($value['imagen']){
                  $url_img = "data:image/jpeg;base64,".base64_encode($value['imagen']);
              }
              $prod = array(
                  'idproducto' => $value['idproducto'],
                  'nombre' => $value['nombre'],
                  'precio' => $value['precio'],
                  'moneda' => $value['moneda'],
                  'imagen' => $url_img,
                  'descuento' => $value['descuento'],
                  'estado' => $value['estado'],
                  'descripcion' => $value['descripcion'],
                  'idcategoria' => $value['idcategoria'],
              );
              array_push ($lista , $prod);
          }
          $this->ResponseData($lista);
      }
    }
    public function nuevoRegistro(){
      if(isset($_POST['nombre']) && isset($_POST['moneda']) && isset($_POST['precio']) && isset($_POST['idcategoria'])){
          if(!empty($_FILES['imagen']['tmp_name'])){
            $nombre = $_POST['nombre'];
            $moneda = $_POST['moneda'];
            $precio = $_POST['precio'];
            $idcategoria = $_POST['idcategoria'];
            $descripcion = $_POST['descripcion'];
            $foto=file_get_contents($_FILES['imagen']['tmp_name']);	
            
            $res = $this->model->insert([
              'nombre' => $nombre, 
              'moneda' => $moneda, 
              'precio' => $precio, 
              'idcategoria' => $idcategoria, 
              'descripcion' => $descripcion], $foto);

            if($res){
              $this->Response(true, 'Datos guardado correctamente');
            }else{
              $this->Response(false, '¡No se registranon lo datos!');
            }
          }else{
            $this->Response(false, '¡La imagen del producto no se envio correctamente!');
          }
      }else{
          $this->Response(false, '¡No se envio todos los campos requeridos!');
      }
    }
    public function editarRegistro(){
        if(isset($_POST['idproducto']) && isset($_POST['nombre']) && isset($_POST['moneda']) && isset($_POST['precio']) && isset($_POST['idcategoria'])){
            if(!empty($_FILES['imagen']['tmp_name'])){
              $foto=file_get_contents($_FILES['imagen']['tmp_name']);	
            }else{
              $foto = null;	
            }
            $idproducto = $_POST['idproducto'];
            $nombre = $_POST['nombre'];
            $moneda = $_POST['moneda'];
            $precio = $_POST['precio'];
            $idcategoria = $_POST['idcategoria'];
            $descripcion = $_POST['descripcion'];
            
            $res = $this->model->edit([
              'idproducto' => $idproducto,
              'nombre' => $nombre, 
              'moneda' => $moneda, 
              'precio' => $precio, 
              'idcategoria' => $idcategoria, 
              'descripcion' => $descripcion], $foto);

            if($res){
              $this->Response(true, 'Datos editado correctamente');
            }else{
              $this->Response(false, '¡No se editaron lo datos!');
            }
        }else{
            $this->Response(false, '¡No se envio todos los campos requeridos!');
        }
    }
    public function eliminarRegistro(){
      if(isset($_POST['idproducto'])){
              $idproducto = $_POST['idproducto'];
              $res = $this->model->delete(['idproducto' => $idproducto]);
              if($res){
                  $this->Response(true, 'Datos eliminado correctamente');
              }else{
                  $this->Response(false, '¡No se eliminaron lo datos!');
              }
          }else{
              $this->Response(false, '¡No se envio el ID de la categoria a eliminar!');
          }
    }
    public function actualizarDescuento(){
      if(isset($_POST['descuento']) && isset($_POST['idproducto'])){
          $idproducto = $_POST['idproducto'];
          $descuento = $_POST['descuento'];
          if($descuento == 0){
            $descuento = null;
          }
          $res = $this->model->update_descuento([
            'idproducto' => $idproducto, 
            'descuento' => $descuento]);
          if($res){
            $this->Response(true, 'Realizado correctamente');
          }else{
            $this->Response(false, '¡No se actualizó lo datos!');
          }
      }else{
          $this->Response(false, '¡No se envio todos los campos requeridos!');
      }
    }
    public function actualizarEstado(){
      if(isset($_POST['estado']) && isset($_POST['idproducto'])){
          $idproducto = $_POST['idproducto'];
          $estado = $_POST['estado'];
          $res = $this->model->update_estado([
            'idproducto' => $idproducto, 
            'estado' => $estado]);
          if($res){
            $this->Response(true, 'Realizado correctamente');
          }else{
            $this->Response(false, '¡No se actualizó lo datos!');
          }
      }else{
          $this->Response(false, '¡No se envio todos los campos requeridos!');
      }
    }
}

?>