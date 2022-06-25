<!DOCTYPE html>
<html lang="es">
<?php require 'views/template/header.php' ?>
<body>
    <div class="banner-top container-fluid" id="home">
		<?php require 'views/client/header.php' ?>
        
	</div>

    <section class="banner-bottom-wthreelayouts py-lg-2 py-3">
		<div class="container-fluid">
			<div class="inner-sec-shop px-lg-4 px-3">
				<h3 class="tittle-w3layouts mb-3" id="title"><?= $this->data['nombre_categoria']; ?></h3>
				<div class="row pb-4 mb-4" id="list-productos">
                    <div class="text-center col-sm-12 side-bar">
                        <strong>¡No se encontro registros!</strong>
                    </div>
				</div>
			</div>
		</div>
	</section>
    <script type="text/javascript">
        const idcategoria = "<?= $this->data['idcategoria']; ?>";
    </script>
    <?php if(isset($_SESSION['usuario'])){ ?>
        <script type="text/javascript">
            const idcliente = "<?= $_SESSION['usuario']['idcliente']; ?>";
            //const email_cliente = "<?= $_SESSION['usuario']['email']; ?>";
        </script>      
    <?php }else{ ?>
        <script type="text/javascript">
            const idcliente = null;
        </script>  
    <?php } ?>
    <?php require './views/client/detalles-producto.php' ?>
    <?php require 'views/template/footer.php' ?>
    <script src="<?= BASE_URL; ?>public/modulos/funciones.js"></script>
	<?php require 'views/client/promocion.php' ?>
</body>
</html>