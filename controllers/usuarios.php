<?php

class Usuarios extends Controller{

    function __construct() {
        parent::__construct();
        $this->view->data['id'] = 6;
        $this->view->data['title'] = 'Empleados';
        $this->view->data['js'] = '/modulos/users.js';
    }

    public function render(){
      $this->view->render('users/index');//hacemos referencia a la vista
    }
    public function getData() {
        $datos = $this->model->get(); 
        $this->ResponseData($datos);
    }
	public function nuevoRegistro(){
        if(isset($_POST['nombre']) && isset($_POST['apellido']) && isset($_POST['telefono']) && isset($_POST['rol']) && isset($_POST['email']) && isset($_POST['password'])){
			
            $nombre = $_POST['nombre'];
            $apellido = $_POST['apellido'];
            $telefono = $_POST['telefono'];
            $rol = $_POST['rol'];
            $email = $_POST['email'];
			$password = crypt($_POST['password'], '$2a$07$asxx54ahjppf45sd87a5a4dDDGsystemdev$');

            $res = $this->model->insert([
				'nombre' => $nombre, 
				'apellido' => $apellido, 
				'telefono' => $telefono, 
				'rol' => $rol,
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
    public function eliminarRegistro(){
        if(isset($_POST['idpersona'])){
            $idpersona = $_POST['idpersona'];
            $res = $this->model->delete(['idpersona' => $idpersona]);
            if($res){
                $this->Response(true, 'Datos eliminado correctamente');
            }else{
                $this->Response(false, '¡No se eliminaron lo datos!');
            }
        }else{
            $this->Response(false, '¡No se envio el ID de la categoria a eliminar!');
        }
    }
    public function desactivarUsuario(){
        if(isset($_POST['idpersona']) && isset($_POST['estado'])){
            $idpersona = $_POST['idpersona'];
            $estado = $_POST['estado'];
            $res = $this->model->update_status(['idpersona' => $idpersona, 'estado' => $estado]);
            if($res){
                $this->Response(true, 'Datos actualizado correctamente');
            }else{
                $this->Response(false, '¡No se actualizaron lo datos!');
            }
        }else{
            $this->Response(false, '¡No se envio el ID del usuario a desactivar!');
        }
    }    
    public function loginUsuario(){
        if(isset($_POST['email']) && isset($_POST['password'])){
			$email = $_POST['email'];
			$password = crypt($_POST['password'], '$2a$07$asxx54ahjppf45sd87a5a4dDDGsystemdev$');
            $res = $this->model->login([
				'email' => $email,
				'password' => $password
			]);
            if($res){
                if($res['estado'] == 1){
                    $this->session->setUsuarioSession($res);
                    $response = array('estado' => true, 'msj' => 'Datos correcto', 'rol' => (isset($res['rol']) ? true : false));
                    echo json_encode($response, JSON_UNESCAPED_UNICODE);
                    die();
                }else{
                    $this->Response(false, '¡Su cuenta se encutra desactivada temporalmente!');
                }
            }else{
                $this->Response(false, '¡Datos Icorrectos!');
            }
        }else{
            $this->Response(false, '¡El email y la contraseñá es necesario!');
        }
    }
}

?>