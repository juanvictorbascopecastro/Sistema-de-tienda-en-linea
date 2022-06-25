<!DOCTYPE html>
<html lang="es">
<?php require 'views/template/header.php' ?>
<body>
    <?php require 'views/template/navbar.php' ?>
    <section class="banner-bottom-wthreelayouts">
		<div class="container-fluid">
			<div class="inner-sec-shop px-lg-5 px-3 mt-3">
				<div class="row">
                    <div class="col-sm-6">
                        <h3><i class="fa fa-folder"></i> CATEGORIAS </h3>
                    </div>
                    <div class="col-sm-6 text-right">
                        <button class="btn btn-primary submit" id="btnNew">Nueva Categoria</button>
                    </div>
					<div class="col-md-12 middle-slider my-4 mb-5">
                        <div class="checkout-left side-bar row">
                            <div class="col-md-12  checkout-left-basket">
                                <ul id="categorias">
                                    <li class="text-center">!No hay Registros¡</li>
                                    <!--<li>Total
                                        <i>-</i>
                                        <span>$986.00</span>
                                    </li>-->
                                </ul>
                            </div>

                        </div>
					</div>
				</div>
                <div class="row">
                    <?php require './views/categoria/add-categoria.php' ?>
                </div>
			</div>
		</div>
	</section>

    <?php require 'views/template/footer.php' ?>
</body>
</html>