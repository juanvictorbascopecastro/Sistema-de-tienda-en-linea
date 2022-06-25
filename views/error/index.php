<!DOCTYPE html>
<html>
<head>
	<title>ERROR 404</title>
	<link href="<?= BASE_URL; ?>public/css/bootstrap.css" rel='stylesheet' type='text/css' />
	<link href="<?= BASE_URL; ?>public/css/style6.css" rel='stylesheet' type='text/css' />
	<link href="<?= BASE_URL; ?>public/css/style.css" rel='stylesheet' type='text/css' />
	<link href="<?= BASE_URL; ?>public/css/fontawesome-all.css" rel="stylesheet">
</head>
<body>
<section class="banner-bottom-wthreelayouts py-lg-5 py-3">
		<div class="container-fluid">
			<div class="error_page">
				<h4>404</h4>
				<p>¡Vaya! Página no encontrada</p>
				<form action="#" method="post">
					<input class="serch" type="search" name="serch" placeholder="Buscar aqui" required="">
					<button class="btn1">
						<i class="fa fa-search" aria-hidden="true"></i>
					</button>
					<div class="clearfix"> </div>
				</form>
				<ul class="footer-social text-center mt-lg-4 mt-3">

					<li class="mx-2">
						<a href="#">
							<span class="fab fa-facebook-f"></span>
						</a>
					</li>
					<li class="mx-2">
						<a href="#">
							<span class="fab fa-twitter"></span>
						</a>
					</li>
					<li class="mx-2">
						<a href="#">
							<span class="fab fa-google-plus-g"></span>
						</a>
					</li>
					<li class="mx-2">
						<a href="#">
							<span class="fab fa-linkedin-in"></span>
						</a>
					</li>
					<li class="mx-2">
						<a href="#">
							<span class="fas fa-rss"></span>
						</a>
					</li>
					<li class="mx-2">
						<a href="#">
							<span class="fab fa-vk"></span>
						</a>
					</li>
				</ul>
				<a class="b-home" href="<?php echo BASE_URL?>home">Volver al Inicio</a>
			</div>

		</div>
	</section>
</body>
</html>