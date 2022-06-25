var productos = (function(window, document){
    var metodos = {
        list_categorias: [],
        list_productos: [],
        producto: null,
        idcategoria: null,
        inicio: function(){
            let this_ = this;
            index.get('btnAdd').addEventListener('click', function(evt){ 
                index.get('form-producto').reset();
                this_.producto = null;
                if(this_.list_categorias.length <= 0) this_.getCategorias();     
                $('#addProductoModal').modal('toggle');      
            });
        	index.get('form-producto').addEventListener('submit', function(evt){
                evt.preventDefault();
                this_.guardarDatos();                    
            });
            this.getCategorias();   
            index.get('selectImage').onchange = function(e){
                this_.selectArchivo(e);
            }
            $('#categorias').on('change', function() {
                this_.idcategoria = this.value;
                this_.getProductos(this_.idcategoria);
            });
            $('#inputSearch').change(function(){
                var text = index.get('inputSearch').value;
                if(text.trim() != '') this_.getBuscar(text);
            });
            index.get('btnSearch').addEventListener('click', function(evt){ 
                var text = index.get('inputSearch').value;
                if(text.trim() != '') this_.getBuscar(text);      
            });
            $('input[type=radio][name="estado"]').change(function() {
                this_.actualizarEstado($(this).val());
            });
        },
        getCategorias: function(){
            let this_ = this;
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url+'/categoria/getData';
            request.open("GET", ajaxUrl, true);
            //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send();
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    var objData = JSON.parse(request.responseText);
                    if(objData){
                        let html = '';
                        this_.list_categorias = objData;
                        this_.idcategoria = objData[0].idcategoria;
                        this_.getProductos(this_.idcategoria);
                        for(let i = 0; i < objData.length; i++){
                            html = html + `<option value="${objData[i].idcategoria}">${objData[i].nombre}</option>`;
                        }
                        index.get('select-categoria').innerHTML = html;
                        html = html + `<option value="ocultos">Productos Desactivados</option>`;
                        index.get('categorias').innerHTML = html;
                    }else{
                        index.msjError('¡Ocurrio un error al cargar los datos!');
                    }
                }
            }
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
                    //console.log(request.responseText);
                    var objData = JSON.parse(request.responseText);
                    if(objData){
                        this_.list_productos = objData;
                        if(objData.length <= 0){
                            index.get('list-productos').innerHTML = `<div class="col-lg-12 text-center"><strong>¡No hay registros!</strong></div>`;
                        }else{
                            let html = '', precio = '', promocion = '';
                            for(let i = 0; i < objData.length; i++){
                                if(objData[i].descuento) {
                                    promocion = `<span class="product-new-top">Desc</span>`;
                                    precio = `<span class="money">${objData[i].moneda} ${parseFloat(objData[i].precio) - parseFloat(objData[i].descuento)}</span> <del>${objData[i].moneda} ${objData[i].precio}</del>`;
                                }else{
                                    promocion = '';
                                    precio = `<span class="money">${objData[i].moneda} ${objData[i].precio}</span>`;
                                }
                    
                                html = html + `<div class="col-md-3 product-men women_two shop-gd mt-1">
                                    <div class="product-googles-info googles">
                                        <div class="men-pro-item">
                                            <div class="men-thumb-item">
                                                <img src="${objData[i].imagen}" class="img-fluid" alt="">
                                                <div class="men-cart-pro">
                                                    <div class="inner-men-cart-pro">
                                                        <button class="link-product-add-cart" prod="${objData[i].idproducto}" onclick="productos.detallesProducto(this)">Detalles</button>
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
                                                                <span class="money">${precio}</span>
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
                                                        <button class="btn btn-primary btn-sm" item="${i}" onclick="productos.editarProducto(this)"><i class="fa fa-edit" aria-hidden="true"></i></button>
                                                        <button class="btn btn-danger btn-sm" item="${i}" onclick="productos.eliminarProducto(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
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
                            let html = '';
                            for(let i = 0; i < objData.length; i++){
                                if(objData[i].descuento) {
                                    promocion = `<span class="product-new-top">Desc</span>`;
                                    precio = `<span class="money">${objData[i].moneda} ${parseFloat(objData[i].precio) - parseFloat(objData[i].descuento)}</span> <del>${objData[i].moneda} ${objData[i].precio}</del>`;
                                }else{
                                    promocion = '';
                                    precio = `<span class="money">${objData[i].moneda} ${objData[i].precio}</span>`;
                                }
                                html = html + `<div class="col-md-3 product-men women_two shop-gd mt-1">
                                    <div class="product-googles-info googles">
                                        <div class="men-pro-item">
                                            <div class="men-thumb-item">
                                                <img src="${objData[i].imagen}" class="img-fluid" alt="">
                                                <div class="men-cart-pro">
                                                    <div class="inner-men-cart-pro">
                                                        <button class="link-product-add-cart" prod="${objData[i].idproducto}" onclick="productos.detallesProducto(this)">Detalles</button>
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
                                                        <button class="btn btn-primary btn-sm" item="${i}" onclick="productos.editarProducto(this)"><i class="fa fa-edit" aria-hidden="true"></i></button>
                                                        <button class="btn btn-danger btn-sm" item="${i}" onclick="productos.eliminarProducto(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
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
        imagen: null,
        selectArchivo: function(event){
            if (event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/jpg' || event.target.files[0].type === 'image/png') {
                //this.showImage(this.file);
                this.imagen = event.target.files[0];
                //var nav = window.URL || window.webkitURL;
                //const img = nav.createObjectURL(this.file);
                //this.showImage(img);
            }else{
                index.msjAdvertencia('!El archivo debe ser una imagen formato png, jpg, jpeg¡');
            }
        },
        guardarDatos: function(){
            let formulario = index.get('form-producto');
            let this_ = this;
            if(formulario.nombre.value.trim() == ''){
                index.msjAdvertencia('¡Nombre del producto es requerido!');
                return;
            }
            if(formulario.precio.value.trim() == ''){
                index.msjAdvertencia('Precio del producto es requerido!');
                return;
            }
            if(!index.isFloat(formulario.precio.value)){
                index.msjAdvertencia('Precio del producto debe ser un entero!');
                return;
            }
            if(formulario.idcategoria.value.trim() == ''){
                index.msjAdvertencia('¡Las categorias deben estar registradas por categorias, si no cuenta con categorias debe registrar algunas!');
                return;
            }
            if(formulario.moneda.value.trim() == ''){
                index.msjAdvertencia('El stock debe iniciar en un número entero!');
                return;
            }
            if(this.producto == null && this.imagen == null) {
                index.msjAdvertencia('¡Es necesario seleccionar una imegen!');
                return;
            }
            var formData = new FormData(); // objeto ya declarado para ajax sentencia creada por
                formData.append("nombre", formulario.nombre.value);
                formData.append("precio", formulario.precio.value);
                formData.append("moneda", formulario.moneda.value);
                formData.append("idcategoria", formulario.idcategoria.value);
                formData.append("imagen", this.imagen);
                formData.append("descripcion", formulario.descripcion.value);
                var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                var ajaxUrl;
                if(this.producto){
                    formData.append("idproducto", this.producto.idproducto);
                    ajaxUrl = base_url+'/productos/editarRegistro';
                }else{
                    ajaxUrl = base_url+'/productos/nuevoRegistro';
                }
                request.open("POST", ajaxUrl, true);
                //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(formData);
                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        //console.log(request.responseText);
                        var objData = JSON.parse(request.responseText);
                        if(objData.estado){
                            index.msjCompletado(objData.msj);
                            this_.getProductos(this_.idcategoria);
                            $('#addProductoModal').modal('toggle');
                        }else{
                            index.msjError(objData.msj);
                        }
                    }
                }
        },
        editarProducto(elm){
            var position = $(elm).attr('item');
            this.producto = this.list_productos[position];
            if(!this.producto) return;
            $('#addProductoModal').modal('toggle');
            let formulario = index.get('form-producto');
            formulario.idcategoria.value = this.producto.idcategoria;
            formulario.nombre.value = this.producto.nombre;
            formulario.precio.value = this.producto.precio;
            formulario.moneda.value = this.producto.moneda;
            formulario.descripcion.value = this.producto.descripcion;
        },
        eliminarProducto(elm){
            this.categoria = {};
            var position = $(elm).attr('item');
            let data = this.list_productos[position];
            let this_ = this;
            Swal.fire({
                title: '¿Seguro que desea eliminar '+data.nombre+'?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#B3ABAB',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'No Eliminar'
            }).then((result) => {
                if (result.value) {
                    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    var ajaxUrl = base_url+'/productos/eliminarRegistro';
                    var formData = new FormData(); // objeto ya declarado para ajax sentencia creada por
                    formData.append("idproducto", data.idproducto);
                    
                    request.open("POST", ajaxUrl, true);
                    request.send(formData);
                    request.onreadystatechange = function(){
                        if(request.readyState == 4 && request.status == 200){
                            //console.log(request.responseText);
                            var objData = JSON.parse(request.responseText);
                            if(objData.estado){
                                this_.getProductos(this_.idcategoria);
                                index.msjCompletado(objData.msj);
                            }else{
                                index.msjError(objData.msj);
                            }
                        }
                    }
                }
            }); 
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

            if(parseInt(this.producto.estado) > 0) $('input[name="estado"][value="true"]').prop('checked', true);
            else $('input[name="estado"][value="false"]').prop('checked', true);

            let precio = index.get('precio-details');
            let descuento = index.get('descuento-details');
            if(this.producto.descuento != null) {
                index.get('price-details').innerHTML = `<span class="item_price">${this.producto.moneda} ${parseFloat(this.producto.precio) - parseFloat(this.producto.descuento)}</span> <del>${this.producto.moneda} ${this.producto.precio}</del>`;
                precio.value = this.producto.descuento;
                let porcentaje = ((parseFloat(precio.value) * 100)/parseFloat(this_.producto.precio)).toFixed(2);
                descuento.value = porcentaje;
                index.get('nuevo-precio-details').value = (parseFloat(this_.producto.precio) - parseFloat(this.producto.descuento)).toFixed(2);
            }else{
                descuento.value = '';
                precio.value = '';
                index.get('nuevo-precio-details').value = '';
                index.get('price-details').innerHTML = `<span class="item_price">${this.producto.moneda} ${this.producto.precio}</span>`;
            }
            precio.oninput = function(event){
                if(!index.isFloat(precio.value)) return false;
                let porcentaje = ((parseFloat(precio.value) * 100)/parseFloat(this_.producto.precio)).toFixed(2);
                descuento.value = porcentaje;
                index.get('nuevo-precio-details').value = (parseFloat(this_.producto.precio) - parseFloat(precio.value)).toFixed(2);
            };
            descuento.oninput = function(event){
                if(!index.isFloat(descuento.value)) return false;
                let calculado = ((parseFloat(this_.producto.precio) * parseFloat(descuento.value))/100).toFixed(2);
                precio.value = calculado;
                index.get('nuevo-precio-details').value = (parseFloat(this_.producto.precio) - calculado).toFixed(2);
            };
        },
        guardarDescuento: function(){
            let cantidad = index.get('precio-details').value;
            if(!index.isFloat(cantidad)){
                index.msjAdvertencia('¡El descuento debe ser un número entero mayor a cero!');
                return;
            }
            let this_ = this;
            var formData = new FormData(); // objeto ya declarado para ajax sentencia creada por
                formData.append("descuento", cantidad);
                formData.append("idproducto", this.producto.idproducto);
                var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                var ajaxUrl = base_url+'/productos/actualizarDescuento';
                request.open("POST", ajaxUrl, true);
                //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(formData);
                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        //console.log(request.responseText);
                        var objData = JSON.parse(request.responseText);
                        if(objData.estado){
                            this_.getProductos(this_.idcategoria);
                            index.Toast(objData.msj);
                        }else{
                            index.msjError(objData.msj);
                        }
                    }
                }
        },
        actualizarEstado: function(val){
            if(this.producto == null) return;
            let this_ = this;
            var formData = new FormData(); // objeto ya declarado para ajax sentencia creada por
                formData.append("estado", (val == 'true' ? "1" : "0"));
                formData.append("idproducto", this.producto.idproducto);
                var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                var ajaxUrl = base_url+'/productos/actualizarEstado';
                request.open("POST", ajaxUrl, true);
                //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(formData);
                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        //console.log(request.responseText);
                        var objData = JSON.parse(request.responseText);
                        if(objData.estado){
                            this_.getProductos(this_.idcategoria);
                            index.Toast(objData.msj);
                        }else{
                            index.msjError(objData.msj);
                        }
                    }
                }
        },
     };
     return metodos;
 })(window, document);
 productos.inicio();