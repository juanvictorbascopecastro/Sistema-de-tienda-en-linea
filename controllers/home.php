<?php

class Home extends Controller{
    function __construct() {
        parent::__construct();
        $this->view->data['id'] = 1;
        $this->view->data['title'] = 'Inicio';
    }

    public function render(){
      $this->view->data['promocionados'] = $this->model->promocion(); 
      $this->view->render('home/index');//hacemos referencia a la vista
    }	
    public function getData() {
        $datos = $this->model->promocion(); 
        $this->ResponseData($datos);
    }
}

?>