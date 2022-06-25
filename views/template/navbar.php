<nav class="navbar navbar-expand-lg navbar-light bg-light top-header mb-2">

    <button class="navbar-toggler mx-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon">
            
        </span> 
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav nav-mega mx-auto">
            <li class="nav-item <?= $this->data['id'] == 1 ? 'active' : '' ?>">
                <a class="nav-link ml-lg-0" href="<?php echo BASE_URL?>home"><i class="fa fa-home"></i> Inicio</a>
            </li>
            <li class="nav-item <?= $this->data['id'] == 2 ? 'active' : '' ?>">
                <a class="nav-link ml-lg-0" href="<?php echo BASE_URL?>pedidos"><i class="fa fa-cart-arrow-down"></i> Pedidos</a>
            </li>
            <li class="nav-item <?= $this->data['id'] == 3 ? 'active' : '' ?>">
                <a class="nav-link ml-lg-0" href="<?php echo BASE_URL?>productos"><i class="fa fa-desktop"></i> Productos</a>
            </li>
            <li class="nav-item <?= $this->data['id'] == 4 ? 'active' : '' ?>">
                <a class="nav-link ml-lg-0" href="<?php echo BASE_URL?>categoria"><i class="fa fa-folder"></i> Categorias</a>
            </li>
            <li class="nav-item <?= $this->data['id'] == 5 ? 'active' : '' ?>">
                <a class="nav-link ml-lg-0" href="<?php echo BASE_URL?>clientes"><i class="fa fa-users"></i> Clientes</a>
            </li>
            <li class="nav-item <?= $this->data['id'] == 6 ? 'active' : '' ?>">
                <a class="nav-link ml-lg-0" href="<?php echo BASE_URL?>usuarios"><i class="fa fa-user"></i> Empleados</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="<?= BASE_URL?>/logout"><i class="fa fa-power-off"></i> Cerrar sesión</a>
            </li>
        </ul>
    </div>
</nav>