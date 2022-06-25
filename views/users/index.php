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
                        <h3><i class="fa fa-user"></i> EMPLEADOS </h3>
                    </div>
                    <div class="col-sm-6 text-right">
                        <button class="btn btn-primary submit" id="btnNew">Nueva Empleado</button>
                    </div>
					<div class="col-md-12 middle-slider my-4 mb-5">
                        <div class="checkout-right">
                            <h4>Registros:
                                <span id="text-registros">0 empleados</span>
                            </h4>
                            <table class="timetable_sub">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Telefono</th>
                                        <th>Email</th>
                                        <th>Rol</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody id="tabla-usuarios">
                                    <tr class="rem1">
                                        <td class="invert text-center" colspan="6">Cargando registros...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
					</div>
				</div>
                <div class="row">
                    <?php require './views/users/add-user.php' ?>
                </div>
			</div>
		</div>
	</section>

    <?php require 'views/template/footer.php' ?>
</body>
</html>