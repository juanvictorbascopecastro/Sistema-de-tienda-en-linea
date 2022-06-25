<!DOCTYPE html>
<html lang="es">
<?php require 'views/template/header.php' ?>
<body>
	<div class="banner-top container-fluid" id="home">
		<?php require 'views/client/header.php' ?>
		<!-- banner -->
		<div class="banner">
			<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
				<ol class="carousel-indicators">
					<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
					<li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
				</ol>
				<div class="carousel-inner" role="listbox">
					<div class="carousel-item active">
						<div class="carousel-caption text-center">
							<h3>Prendas Para Varones
								<!--<span>Cool summer sale 50% off</span>-->
							</h3>
							<a href="<?= BASE_URL ?>cliente/productos?idcategoria=<?= $this->data['categorias'][0]['idcategoria']?>" class="btn btn-sm animated-button gibson-three mt-4">Productos</a>
						</div>
					</div>
					<div class="carousel-item item4">
						<div class="carousel-caption text-center">
							<h3>Prendas para Mujeres
							</h3>
							<a href="<?= BASE_URL ?>cliente/productos?idcategoria=<?= $this->data['categorias'][0]['idcategoria']?>" class="btn btn-sm animated-button gibson-three mt-4">Productos</a>

						</div>
					</div>
					<div class="carousel-item item2">
						<div class="carousel-caption text-center">
							<h3>Diferentes productos
								
							</h3>
							<a href="<?= BASE_URL ?>cliente/productos?idcategoria=<?= $this->data['categorias'][0]['idcategoria']?>" class="btn btn-sm animated-button gibson-three mt-4">Productos</a>
						</div>
					</div>
				</div>
				<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="sr-only">Previous</span>
				</a>
				<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="sr-only">Next</span>
				</a>
			</div>
			<!--//banner -->
		</div>
	</div>

    <?php require 'views/template/footer.php' ?>
	<script src="<?= BASE_URL; ?>public/modulos/funciones.js"></script>
	<?php require 'views/client/promocion.php' ?>
</body>
</html>