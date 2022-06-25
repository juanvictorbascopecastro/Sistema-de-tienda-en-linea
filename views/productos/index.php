<!DOCTYPE html>
<html lang="es">
<?php require 'views/template/header.php' ?>
<link href="<?= BASE_URL; ?>public/css/jquery-ui1.css" rel="stylesheet" type="text/css">
<link href="<?= BASE_URL; ?>public/css/flexslider.css" rel="stylesheet" type="text/css" media="screen" />
<body>
    <?php require 'views/template/navbar.php' ?>

    <section class="banner-bottom-wthreelayouts">
		<div class="container-fluid">
			<div class="inner-sec-shop px-lg-5 px-3">
				<h3 class="my-lg-4 my-4"><i class="fa fa-desktop"></i> PRODUCTOS </h3>
				
			</div>
			<div class="inner-sec-shop px-lg-4 px-3">
				<div class="row">
					<div class="side-bar col-lg-3" style="height: auto">
						<div>
							<h3 class="agileits-sear-head">Seleccionar Categoria</h3>
							<form action="#" method="post">
								<div class="controls">
									<select class="billing-address-name form-control" id="categorias">
										<option>Cargando...</option>
									</select>
								</div>
							</form>
						</div>
						<hr>
						<div class="search-hotel">
							<h3 class="agileits-sear-head">Buscar..</h3>
							<form action="#" method="post">
								<input class="billing-address-name form-control" type="search" name="search" placeholder="Buscar aquí..." required="" id="inputSearch">
								<button class="btn1" id="btnSearch" type="button">
										<i class="fas fa-search"></i>
								</button>
								<div class="clearfix"> </div>
							</form>
						</div>
						<!--<hr>
						<div>
							<h3 class="agileits-sear-head">Visualizar Por Estado</h3>
							<div class="occasional mt-1">
								<div class="colr">
									<label class="radio"><input type="radio" name="search-estado" value="true"><i></i> Visible</label>
								</div>
								<div class="colr">
									<label class="radio"><input type="radio" name="search-estado" value="false"><i></i> Oculto</label>
								</div>
							</div>	
						</div>
						<br>-->
						<hr>
						<div class="mt-3">
							<div>
								<button class="btn btn-primary btn-lg" type="button" style="width: 100%" id="btnAdd"> <i class="fa fa-plus"></i> Nuevo Producto</button>
							</div>
						</div>
					</div>
					<div class="left-ads-display col-lg-9">
						<div class="wrapper_top_shop">
							<div class="row" id="list-productos">
								<div class="col-lg-12 text-center">
									<strong>Cargando datos...</strong>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
                    <?php require './views/productos/add-producto.php' ?>
                    <?php require './views/productos/detalles.php' ?>
                </div>
			</div>
		</div>
	</section>

    <?php require 'views/template/footer.php' ?>
</body>
</html>