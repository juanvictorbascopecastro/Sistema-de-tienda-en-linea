<div class="modal fade" id="detallesProductoModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header pb-0">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body p-0 ml-5 mr-5 mw-100 mt-0">
                <div class="inner-sec-shop pt-0 mt-0 pb-4">
					<div class="row">
                        <div class="col-sm-12 col-md-8 single-right-left ">
                            <div class="grid images_3_of_2">
                                <img src="<?= BASE_URL; ?>public/images/d2.jpg" data-imagezoom="true" class="max-image" alt=" " id="image-details">
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-4 single-right-left simpleCart_shelfItem">
                            <h3 id="title-details">Prenda Nro 1</h3>
                            <p id="price-details"><span class="item_price">$ 0</span>
                                <del>$ 0</del>
                            </p>
                            <div class="rating1">
                                <ul class="stars">
                                    <li><a href="#"><i class="fa fa-star" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i class="fa fa-star" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i class="fa fa-star" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i class="fa fa-star" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i class="fa fa-star" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>

                            <h6>Detalles</h6>
                            <div class="description mt-1">
                                <h5 id="description-details">Sin descripción</h5>
                            </div>
                            <h6>Ofertar Producto</h6>
                            <div class="row mt-2">
                                <div class="col-sm-6">
                                    <div class="controls">
                                        <label class="control-label">Descontar </label>
                                        <input class="billing-address-name form-control" type="number" name="precio" placeholder="" id="precio-details">
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="controls">
                                        <label class="control-label">% Descuento </label>
                                        <input class="billing-address-name form-control" type="number" name="descuento" placeholder="" id="descuento-details">
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="controls">
                                        <label class="control-label">Nuevo Costo </label>
                                        <input class="billing-address-name form-control" type="number" name="nuevo_precio" placeholder="" id="nuevo-precio-details" disabled>
                                    </div>
                                </div>
                            </div>
                            <div class="occasion-cart mt-2 mb-3">
                                <button type="button" class="btn btn-primary" onclick="productos.guardarDescuento()">Registrar</button>
                            </div>
                            
                            <h6>Estado</h6>
                            <div class="occasional mt-2">
                                <div class="colr">
                                    <label class="radio"><input type="radio" name="estado" value="true"><i></i> Visible</label>
                                </div>
                                <div class="colr">
                                    <label class="radio"><input type="radio" name="estado" value="false"><i></i> Oculto</label>
                                </div>
                            </div>			
                        </div>
                        <div class="clearfix"> </div>
					</div>
				</div>
            </div>
        </div>
    </div>
</div>