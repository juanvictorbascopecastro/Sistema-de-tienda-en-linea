<!-- header -->
<header>
    <div class="row">
            <?php if(isset($_SESSION['usuario'])){ ?>
                <div class="col-md-3 top-info text-left mt-lg-4 dropdown">
                    <div class="address row" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <div class="col-lg-12 address-grid">
                            <div class="row address-info">
                                <div class="col-md-3 address-left text-center pl-0 pr-0">
                                    <i class="far fa-user mt-2"></i>
                                </div>
                                <div class="col-md-9 address-right text-left pl-0 pr-0">
                                    <h6><?php echo $_SESSION['usuario']['nombre'].' '.$_SESSION['usuario']['apellido']?></h6>
                                    <p> <?php echo $_SESSION['usuario']['email']?> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="<?= BASE_URL?>/logout"><i class="fa fa-power-off"></i> Cerrar sesión</a></li>
                            <li><a class="dropdown-item" href="#"><i class="fa fa-edit"></i> Editar Perfil</a></li>
                    </ul>
                </div>
            <?php }else{ ?>
                <div class="col-md-3 top-info text-left mt-lg-4">
					<h6>¡Necesita ayuda!</h6>
					<ul>
						<li>
							<i class="fas fa-phone"></i> Lamar</li>
						<li class="number-phone mt-3">+591 72872939</li>
					</ul>
				</div>
            <?php } ?>
        <div class="col-md-6 logo-w3layouts text-center">
            <h1 class="logo-w3layouts">
                <a class="navbar-brand" href="index.html">
                    INNOVATION </a>
            </h1>
        </div>

        <div class="col-md-3 top-info-cart text-right mt-lg-4">
            <ul class="cart-inner-info">
                <?php if(!isset($_SESSION['usuario'])){ ?>
                    <li class="button-log">
                        <a class="btn-open" href="#">
                            <span class="fa fa-user" aria-hidden="true"></span>
                        </a>
                    </li>
                <?php } ?>
                <li class="galssescart galssescart2 cart cart box_1">
                    <form action="#" method="post" class="last">
                        <input type="hidden" name="cmd" value="_cart">
                        <input type="hidden" name="display" value="1">
                        <button class="top_googles_cart" type="submit" name="submit" value="">
                            Mi Carrito
                            <i class="fas fa-cart-arrow-down"></i>
                        </button>
                    </form>
                </li>
            </ul>
            <!---->
            <?php require 'views/client/login.php' ?>
            <!---->
        </div>
    </div>
    <?php if($this->data['id'] == 1 || $this->data['id'] == 3){ ?>
        <div class="search">
            <div class="mobile-nav-button">
                <button id="trigger-overlay" type="button">
                    <i class="fas fa-search"></i>
                </button>
            </div>
            <!-- open/close -->
            <div class="overlay overlay-door">
                <button type="button" class="overlay-close">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
                <form action="#" method="post" class="d-flex" id="form-search">
                    <input class="form-control" type="search" name="search" placeholder="Buscar aqui..." required="">
                    <button type="submit" class="btn btn-primary submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>

            </div>
            <!-- open/close -->
        </div>
    <?php } ?>
    <label class="top-log mx-auto"></label>
    <nav class="navbar navbar-expand-lg navbar-light bg-light top-header mb-2">
        <button class="navbar-toggler mx-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">
                
            </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav nav-mega mx-auto">
                <li class="nav-item <?= $this->data['id'] == 0 ? 'active' : '' ?>">
                    <a class="nav-link ml-lg-0" href="<?php echo BASE_URL?>cliente">Inicio</a>
                </li>
                <li class="nav-item dropdown <?= $this->data['id'] == 1 ? 'active' : '' ?>">
                    <a class="nav-link dropdown-toggle" type="button" id="categoriasProducto" data-bs-toggle="dropdown" aria-expanded="false">
                        Productos
                    </a>
                    <ul class="dropdown-menu mega-menu">
                        <li>
                            <div class="row">
                                <div class="col-md-12 media-list span4 text-left">
                                    <h5 class="tittle-w3layouts-sub ml-4">Categorias</h5>
                                    <ul id="categorias" class="mt-2">
                                        <?php foreach ($this->data['categorias'] as $i => $value){
                                            echo '<li class="media-mini mt-3"><a href="'.BASE_URL.'cliente/productos?idcategoria='.$value['idcategoria'].'">'.$value['nombre'].'</a> </li>';
                                        }?>
                                    </ul>
                                </div>
                            </div>
                            <hr>
                        </li>
                    </ul>
                </li>
                <li class="nav-item <?= $this->data['id'] == 3 ? 'active' : '' ?>">
                    <a class="nav-link" href="<?= BASE_URL ?>cliente/productos?idcategoria=promo">Promociones</a>
                </li>
                <li class="nav-item <?= $this->data['id'] == 4 ? 'active' : '' ?>">
                    <a class="nav-link" href="<?= BASE_URL ?>cliente/pedidos">Mis Pedidos</a>
                </li>
                <!--<li class="nav-item">
                    <a class="nav-link" href="contact.html">Contactanos</a>
                </li>-->
            </ul>

        </div>
    </nav>
</header>
<?php require 'views/client/registrarme.php' ?>
	<?php require 'views/client/carrito-compras.php' ?>
<!-- //header -->