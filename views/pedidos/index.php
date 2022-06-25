<!DOCTYPE html>
<html lang="es">
<?php require 'views/template/header.php' ?>
<body>
    <?php require 'views/template/navbar.php' ?>

    <section class="banner-bottom-wthreelayouts">
		<div class="container-fluid">
			<div class="inner-sec-shop px-lg-4 px-3">
				<h3 class="my-lg-4 my-4 mb-0 pb-0"><i class="fa fa-cart-arrow-down"></i> PEDIDOS </h3>
				<div class="checkout-left row mt-0 mb-4">
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
					<div class="col-md-4 side-bar checkout-left-basket mt-5 pl-4 pr-3">
						<ul id="productos-pedido">
							<li class="text-center">Seleccionar Pedidos</li>
						</ul>
					</div>
					<div class="clearfix"> </div>

				</div>
			</div>
		</div>
	</section>

    <?php require 'views/template/footer.php' ?>
</body>
</html>