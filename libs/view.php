<?php

class View {
    function __construct() {
        //echo 'EJECUTANDO LA VIEW</br>';
    }
    function render($nombre) {
        require 'views/' . $nombre . '.php';

    }
}

?>