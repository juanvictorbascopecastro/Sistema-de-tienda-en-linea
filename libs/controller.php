<?php

class Controller {
    function __construct(){
        $this->session = new Session();
        $this->view = new View();
    }

    function loadModel($model){
		$url = 'models/' . $model . 'Model.php';
		if(file_exists($url)){
			require $url;
			$modelName = $model.'Model';
			$this->model = new $modelName();
		}
	}
	public function ResponseData($data) {
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
		die();
	}
	public function Response($estado, $msj) {
		$response = array('estado' => $estado, 'msj' => $msj);
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
		die();
	}
}

?>