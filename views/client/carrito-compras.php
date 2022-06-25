<div class="modal fade" id="miCarrito" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close pb-0" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body ml-3 mr-3 mb-3 mt-1">
                <div class="side-bar col-md-12">
                    <div class="text-center"><h5>CARRITO DE COMPRAS</h5></div>
					<span id="cantidad-productos">0 productos agregado</span>
					<table class="timetable_sub">
						<thead>
							<tr>
								<th>Producto</th>
								<th>Imagen</th>
								<th>Precio</th>
								<th>Cantidad</th>
								<th>Acción</th>
							</tr>
						</thead>
						<tbody id="tabla-carrito">
                            
						</tbody>
					</table>
                    <form class="row mt-3" id="form-pedido">
                        <div class="col-sm-12 col-md-6">
                            <div class="form-group">
                                <label class="mb-2">Ciudad</label>
                                <input type="text" class="form-control" name="ciudad" aria-describedby="emailHelp" placeholder="Ciudad de envio..." required="">
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <div class="form-group">
                                <label class="mb-2">Espesificar su dirección</label>
                                <input type="text" class="form-control" name="direccion" aria-describedby="emailHelp" placeholder="Direccion de entrega..." required="">
                            </div>
                        </div>
                        <div class="col-sm-12 text-right">
                            <button type="button" class="btn btn-default submit text-right" id="limpiarCarrito"> <i class="fa fa-times"></i> Limpiar Carrito</button>
                            <button type="button" class="btn btn-success submit text-right" id="btnUbicacion"> <i class="fa fa-map-marker"></i></button>
                            <button type="submit" class="btn btn-primary submit text-right">Hacer Pedido</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
</div>