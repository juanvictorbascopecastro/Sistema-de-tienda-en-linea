var productos_cliente = (function(window, document){
    var metodos = {
        producto: null,
        list: [],
        inicio: function(){
            let this_ = this;

            let searchForm = index.get('form-search');
            searchForm.addEventListener('submit', function(evt){
                evt.preventDefault();
                if(searchForm.search.value.trim() != ''){
                    index.get('title').innerHTML = 'Buscando ('+searchForm.search.value+')'
                    this_.getBuscar(searchForm.search.value);
                    toggleOverlay(); //cierra el buscador
                    searchForm.search.value = '';
                }
            })
            this.getProductos(idcategoria);   
        },
        
        getProductos: function(idcategoria){
            let this_ = this;
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url+'/productos/getData?idcategoria='+idcategoria;
            request.open("GET", ajaxUrl, true);
            //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send();
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    var objData = JSON.parse(request.responseText);
                    if(objData){
                        this_.list_productos = objData;
                        if(objData.length <= 0){
                            index.get('list-productos').innerHTML = `<div class="col-lg-12 text-center"><strong>¡No hay registros!</strong></div>`;
                        }else{
                            let html = '', promocion = '', precio = '';
                            for(let i = 0; i < objData.length; i++){
                                if(objData[i].descuento) {
                                    promocion = `<span class="product-new-top">Desc</span>`;
                                    precio = `<span class="money">${objData[i].moneda} ${parseFloat(objData[i].precio) - parseFloat(objData[i].descuento)}</span> <del>${objData[i].moneda} ${objData[i].precio}</del>`;
                                }else{
                                    promocion = '';
                                    precio = `<span class="money">${objData[i].moneda} ${objData[i].precio}</span>`;
                                }
                                html = html + `<div class="col-md-3 product-men women_two mt-1">
                                                <div class="product-googles-info googles">
                                                    <div class="men-pro-item">
                                                        <div class="men-thumb-item">
                                                            <img src="${objData[i].imagen}" class="img-fluid img-client" alt="">
                                                            <div class="men-cart-pro">
                                                                <div class="inner-men-cart-pro">
                                                                <button class="link-product-add-cart" prod="${objData[i].idproducto}" onclick="productos_cliente.detallesProducto(this)">Detalles</button>
                                                                </div>
                                                            </div>
                                                            ${promocion}
                                                        </div>
                                                        <div class="item-info-product">
                                                            <div class="info-product-price">
                                                                <div class="grid_meta">
                                                                    <div class="product_price">
                                                                        <h4>
                                                                            <a href="single.html">${objData[i].nombre}</a>
                                                                        </h4>
                                                                        <div class="grid-price mt-2">
                                                                            <span class="money ">${precio}</span>
                                                                        </div>
                                                                    </div>
                                                                    <ul class="stars">
                                                                        <li>
                                                                            <a href="#">
                                                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <i class="fa fa-star-half-o" aria-hidden="true"></i>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div class="googles single-item hvr-outline-out">
                                                                    <form id="form-cart">
                                                                        <input type="hidden" name="cmd" value="_cart">
                                                                        <input type="hidden" name="add" value="1">
                                                                        <input type="hidden" name="googles_item" value="Farenheit">
                                                                        <input type="hidden" name="amount" value="575.00">
                                                                        <button type="button"  prod="${objData[i].idproducto}" class="googles-cart pgoogles-cart" onclick="productos_cliente.agregarCarrito(this)">
                                                                            <i class="fas fa-cart-plus"></i>
                                                                        </button>
                        
                                                                        
                                                                    </form>
                        
                                                                </div>
                                                            </div>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;
                            }
                            index.get('list-productos').innerHTML = html;
                        }
                        
                    }else{
                        index.msjError('¡Ocurrio un error al cargar los datos!');
                    }
                }
            }
        },
        getBuscar: function(text){
            let this_ = this;
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url+'/productos/buscarProducto?text='+text;
            request.open("GET", ajaxUrl, true);
            //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send();
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    //console.log(request.responseText);
                    var objData = JSON.parse(request.responseText);
                    if(objData){
                        this_.list_productos = objData;
                        if(objData.length <= 0){
                            index.get('list-productos').innerHTML = `<div class="col-lg-12 text-center"><strong>¡No hay registros!</strong></div>`;
                        }else{
                            let html = '', promocion = '', precio = '';
                            for(let i = 0; i < objData.length; i++){
                                if(objData[i].descuento) {
                                    promocion = `<span class="product-new-top">Desc</span>`;
                                    precio = `<span class="money">${objData[i].moneda} ${parseFloat(objData[i].precio) - parseFloat(objData[i].descuento)}</span> <del>${objData[i].moneda} ${objData[i].precio}</del>`;
                                }else{
                                    promocion = '';
                                    precio = `<span class="money">${objData[i].moneda} ${objData[i].precio}</span>`;
                                }
                                html = html + `<div class="col-md-3 product-men women_two mt-1">
                                                <div class="product-googles-info googles">
                                                    <div class="men-pro-item">
                                                        <div class="men-thumb-item">
                                                            <img src="${objData[i].imagen}" class="img-fluid img-client" alt="">
                                                            <div class="men-cart-pro">
                                                                <div class="inner-men-cart-pro">
                                                                <button class="link-product-add-cart" prod="${objData[i].idproducto}" onclick="productos_cliente.detallesProducto(this)">Detalles</button>
                                                                </div>
                                                            </div>
                                                            ${promocion}
                                                        </div>
                                                        <div class="item-info-product">
                                                            <div class="info-product-price">
                                                                <div class="grid_meta">
                                                                    <div class="product_price">
                                                                        <h4>
                                                                            <a href="single.html">${objData[i].nombre}</a>
                                                                        </h4>
                                                                        <div class="grid-price mt-2">
                                                                            <span class="money ">${precio}</span>
                                                                        </div>
                                                                    </div>
                                                                    <ul class="stars">
                                                                        <li>
                                                                            <a href="#">
                                                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <i class="fa fa-star" aria-hidden="true"></i>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <i class="fa fa-star-half-o" aria-hidden="true"></i>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div class="googles single-item hvr-outline-out">
                                                                    <form id="form-cart">
                                                                        <input type="hidden" name="cmd" value="_cart">
                                                                        <input type="hidden" name="add" value="1">
                                                                        <input type="hidden" name="googles_item" value="Farenheit">
                                                                        <input type="hidden" name="amount" value="575.00">
                                                                        <button type="button"  prod="${objData[i].idproducto}" class="googles-cart pgoogles-cart" onclick="productos_cliente.agregarCarrito(this)">
                                                                            <i class="fas fa-cart-plus"></i>
                                                                        </button>
                        
                                                                        
                                                                    </form>
                        
                                                                </div>
                                                            </div>
                                                            <div class="clearfix"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;
                            }
                            index.get('list-productos').innerHTML = html;
                        }
                        
                    }else{
                        index.msjError('¡Ocurrio un error al cargar los datos!');
                    }
                }
            }
        },
        
        detallesProducto: function(elm){
            let this_ = this;
            var idproducto = $(elm).attr('prod');
            this.producto = this.list_productos.find(function(element) {
                return element.idproducto == idproducto;
            });
            if(!this.producto) return;
            $('#detallesProductoModal').modal('toggle');
            index.get('title-details').innerHTML = this.producto.nombre
            index.get('description-details').innerHTML = this.producto.descripcion == null || this.producto.descripcion == '' ? 'Sin descripción' : this.producto.descripcion;
            $("#image-details").attr("src", this.producto.imagen);

            if(this.producto.descuento != null) {
                index.get('price-details').innerHTML = `<span class="item_price">${this.producto.moneda} ${parseFloat(this.producto.precio) - parseFloat(this.producto.descuento)}</span> <del>${this.producto.moneda} ${this.producto.precio}</del>`;
            }else{
                index.get('price-details').innerHTML = `<span class="item_price">${this.producto.moneda} ${this.producto.precio}</span>`;
            }
        },
        agregarCarrito: function(e){
            if(idcliente == null){
                funciones.closeLogin();
                return ;
            }
            let this_ = this;
            var idproducto = $(e).attr('prod');
            this.producto = this.list_productos.find(function(element) {
                return element.idproducto == idproducto;
            });
            if(!this.producto) return;
            let precio = parseFloat(this.producto.precio);
            if(this.producto.descuento){
                precio = precio - parseFloat(this.producto.descuento);
            }
            let existe = funciones.carrito_productos.find(function(element) {
                return element.idproducto == idproducto;
              });
            if(existe){
                existe.cantidad = existe.cantidad + 1;
                const index = funciones.carrito_productos.indexOf(this.producto);
                funciones.carrito_productos[index] = existe;
            }else{
                existe = this.producto;
                existe.cantidad = 1;
                funciones.carrito_productos.push(existe);
            }
            sessionStorage.setItem('carrito-innovation', JSON.stringify(funciones.carrito_productos));
            /*if(this.producto.moneda == 'Bs.'){
                precio = precio / 6.82;
            }else if(this.producto.moneda == '€'){
                precio = precio / 7.72;
            }
		    paypal.minicart.cart.add({
                business: 'olivia@gmail.com', // Cuenta paypal para recibir el dinero
                item_name: this.producto.nombre,
                amount: precio,
                idproducto: this.producto.idproducto,
                currency_code: 'USD',  
			});*/
            index.Toast('Agregado al carrito', 1200);
            //paypal.minicart.cart.open;
        }
     };
     return metodos;
 })(window, document);
 productos_cliente.inicio();

 var triggerBttn = document.getElementById( 'trigger-overlay' ),
    overlay = document.querySelector( 'div.overlay' ),
    closeBttn = overlay.querySelector( 'button.overlay-close' );
    transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    support = { transitions : Modernizr.csstransitions };

    triggerBttn.addEventListener( 'click', toggleOverlay );
    closeBttn.addEventListener( 'click', toggleOverlay );

    function toggleOverlay() {
        if( classie.has( overlay, 'open' ) ) {
            classie.remove( overlay, 'open' );
            classie.add( overlay, 'close' );
            var onEndTransitionFn = function( ev ) {
                if( support.transitions ) {
                    if( ev.propertyName !== 'visibility' ) return;
                    this.removeEventListener( transEndEventName, onEndTransitionFn );
                }
                classie.remove( overlay, 'close' );
            };
            if( support.transitions ) {
                overlay.addEventListener( transEndEventName, onEndTransitionFn );
            }
            else {
                onEndTransitionFn();
            }
        }
        else if( !classie.has( overlay, 'close' ) ) {
            classie.add( overlay, 'open' );
        }
    }