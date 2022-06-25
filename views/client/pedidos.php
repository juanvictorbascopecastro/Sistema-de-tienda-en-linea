<!DOCTYPE html>
<html lang="es">
<?php require 'views/template/header.php' ?>
<body>
    <div class="banner-top container-fluid" id="home">
		<?php require 'views/client/header.php' ?>
        
	</div>
    <section class="banner-bottom-wthreelayouts py-lg-3">
		<div class="container">
			<div class="inner-sec-shop px-lg-1">
				<h3 class="tittle-w3layouts my-lg-4 mt-3">Mis Pedidos </h3>
				<div class="checkout-left row mb-5">
                    <div class="col-md-8 checkout-right">
                        <h4>Registros:
                            <span id="text-registros">0 pedidos</span>
                        </h4>
                        <table class="timetable_sub">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Dirección</th>
                                    <th>Ciudad</th>
                                    <th>Estado</th>
                                    <th>Total</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody id="tabla-pedidos">
                                <tr class="rem1">
                                    <td colspan="4" class="invert text-center"> ¡No hay registros! </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
					<div class="col-md-4 checkout-left-basket mt-3">
						<h4>Detalles de pedido</h4>
						<ul id="productos-pedido">
							<li class="text-center">Seleccionar Pedidos</li>
						</ul>
					</div>
					<div class="clearfix"> </div>

				</div>
			</div>

		</div>
	</section>
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
	<script src="<?= BASE_URL; ?>public/modulos/funciones.js"></script>
    <?php require 'views/template/footer.php' ?>
	<?php require 'views/client/promocion.php' ?>
</body>
</html>