<div class="modal fade" id="addProductoModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header pb-0">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body p-0 pb-3 ml-5 mr-5 mw-100">
				<h3 class="text-center">Nueva Producto</h3>
                <div class="login newsletter mt-2">
                    <form id="form-producto" class="creditly-card-form agileinfo_form">
							<section class="creditly-wrapper wrapper">
								<div class="information-wrapper">
									<div class="first-row form-group">
										<div class="controls">
											<label class="control-label">Nombre </label>
											<input class="billing-address-name form-control" type="text" name="nombre" placeholder="Obligatorio.">
										</div>
                                        <div class="row">
                                            <div class="col-sm-8">
                                                <div class="controls">
                                                    <label class="control-label">Precio </label>
                                                    <input class="billing-address-name form-control" type="text" name="precio" placeholder="Obligatorio.">
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="controls">
                                                <label class="control-label">Moneda </label>
                                                    <select class="form-control option-w3ls" name="moneda">
                                                        <option value="Bs.">Bs.</option>
                                                        <option value="$">$</option>
                                                        <option value="€">€</option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="controls">
											<label class="control-label">Seleccionar Imagen </label>
											<input class="billing-address-name form-control" type="file" name="imagen" id="selectImage" placeholder="Obligatorio.">
										</div>
										<div class="controls">
											<label class="control-label">Descripcion: </label>
											<input class="form-control" type="text" placeholder="Opcional." name="descripcion">
										</div>
										<div class="controls">
											<label class="control-label">Seleccionar Categoria </label>
											<select class="form-control option-w3ls" id="select-categoria" name="idcategoria">
												<option>Office</option>
												<option>Home</option>
												<option>Commercial</option>

											</select>
										</div>
                                        <div class="controls text-right mt-4 mb-0">
                                            <button type="submit" class="btn btn-primary submit mb-4"> <i class="fa fa-save"></i> Guardar</button>
										</div>
									</div>
								</div>
							</section>
						</form>
                    <!--<p class="text-center">
                        <a href="#">No thanks I want to pay full Price</a>
                    </p>-->
                </div>
            </div>

        </div>
    </div>
</div>