<div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close pb-0" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-3 mx-auto mw-100">
				<h3 class="text-center">Nueva Usuario</h3>
                <div class="login newsletter">
                    <form id="form-user">
                        <section class="creditly-wrapper wrapper">
                            <div class="information-wrapper">
                                <div class="first-row form-group">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="controls">
                                                <label class="control-label">Nombre </label>
                                                <input class="billing-address-name form-control" type="text" name="nombre" placeholder="Obligatorio.">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="controls">
                                                <label class="control-label">Apellido </label>
                                                <input class="billing-address-name form-control" type="text" name="apellido" placeholder="Obligatorio.">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="controls">
                                        <label class="control-label">Teléfono </label>
                                        <input class="billing-address-name form-control" type="text" name="telefono" placeholder="Obligatorio">
                                    </div>
                                    <div class="controls">
                                        <label class="control-label">Rol de Usuario </label>
                                        <select class="form-control option-w3ls" id="select-categoria" name="rol">
                                            <option value="vendedor">Vendedor</option>
                                            <option value="admin">Administrador</option>
                                        </select>
                                    </div>
                                    <div class="controls mt-4">
                                        <label class="control-label">Correo de acceso </label>
                                        <input class="billing-address-name form-control" type="email" name="email" placeholder="">
                                    </div>
                                    <div class="controls">
                                        <label class="control-label">Contraseña </label>
                                        <input class="billing-address-name form-control" type="password" name="password" placeholder="">
                                    </div>
                                </div>
                            </div>
						</section>
                        <div class="text-center">
                            <button type="submit" class="btn btn-primary submit mb-4"> <i class="fa fa-save"></i> Guardar</button>
                        </div>
                    </form>
                    <!--<p class="text-center">
                        <a href="#">No thanks I want to pay full Price</a>
                    </p>-->
                </div>
            </div>

        </div>
    </div>
</div>