<?php

class App { 

	function __construct(){
		$url = isset($_GET['url']) ? $_GET['url'] : null;
		$url = rtrim($url, '/');
		$url = explode('/', $url);
		if(empty($url[0])){
			$this->loadHome();
			return false;
		}
		$archivoController = 'controllers/'.$url[0].'.php';		
		if(file_exists($archivoController)){ // verificamos si el archivo existe
			require_once $archivoController; // importamos el archivo php
			$controller = new $url[0];
			$controller->loadModel($url[0]); //llamamos al modelo

			$size_array = sizeof($url); //tamaño arreglo

			if($size_array > 1){ //verificames el metodo a ejecutar
				if($size_array > 2){ //verificamos los parametros
					$params = [];
					for($i = 2; $i < $size_array; $i++){ //recorremos cuantos parametros
						array_push($params, $url[$i]);
					}
					$controller->{$url[1]}($params);
				}else{
					$controller->{$url[1]}();
				}
			}else{
				$controller->render(); //mostramos la vista por defecto
			}
		}else{ // el archivo no existe
			$this->loadError(); // mostyramos por defecto la pagina de error	
		}
		
	}

	public function loadHome(){
		session_start();
		if(isset($_SESSION['usuario'])){
			if(isset($_SESSION['usuario']['rol'])){
				require_once 'controllers/home.php';
				$home = new Home();
				$home->loadModel('home');
				$home->render(); //carga la vista
			}else{
				require_once 'controllers/cliente.php';
				$cliente = new Cliente();
				$cliente->loadModel('cliente');
				$cliente->render(); //carga la vista
			}
		}else{
			require_once 'controllers/cliente.php';
			$cliente = new Cliente();
			$cliente->loadModel('cliente');
			$cliente->render(); //carga la vista
		}
	}
	private function loadError(){
		require_once 'controllers/errores.php';
		$controller = new Errores();
	}
}