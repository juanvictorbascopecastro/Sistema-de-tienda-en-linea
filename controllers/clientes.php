<?php

class Clientes extends Controller{
    function __construct() {
        parent::__construct();
        $this->view->data['id'] = 5;
        $this->view->data['title'] = 'Lista de Clientes';
        $this->view->data['js'] = '/modulos/clientes.js';
    }

    public function render(){
      $this->view->render('clientes/index');
    }	

    public function getData() {
        $datos = $this->model->get(); 
        $this->ResponseData($datos);
    }
}


?>