var funciones = (function(window, document){
    var metodos = {
        producto: null,
        list: [],
        loginForm: null,
        registrarmeForm: null,
        pedidoForm: null,
        inicio: function(){
            //$("#myModal").modal();
            let this_ = this;
            $(".button-log a").click(function () {
                $(".overlay-login").fadeToggle(200);
                $(this).toggleClass('btn-open').toggleClass('btn-close');
            });    
            $('.overlay-close1').on('click', function () {
                this_.closeLogin();
            });
            $('.galssescart').on('submit', function(evt){
                evt.preventDefault();
                this_.mostrarCarrito();            
            });
            this.loginForm = index.get('form-login');
            this.registrarmeForm = index.get('form-registrame');

            this.loginForm.addEventListener('submit', function(evt){
                evt.preventDefault();
                this_.loginData();                   
            });

            this.registrarmeForm.addEventListener('submit', function(evt){
                evt.preventDefault();
                this_.Registrandome();                   
            });

            index.get('btnRegistrarme').addEventListener('click', function(evt){
                this_.closeLogin();
                
                this_.registrarmeForm.reset();
                this_.categoria = null;
                $('#RegistrarmeModal').modal('toggle');                   
            });
            this.getCarrito();
            index.get('limpiarCarrito').addEventListener('click', function(evt){
                this_.limpiarCarrito();
            })
            this.pedidoForm = index.get('form-pedido');
            this.pedidoForm.addEventListener('submit', function(evt){
                evt.preventDefault();
                this_.guardarPedido();                
            });
            index.get('btnUbicacion').addEventListener('click', function(evt){
                this_.getUbicacion();
            })
        },
        getCarrito(){
            let carrito = sessionStorage['carrito-innovation'];
            if(carrito) this.carrito_productos = JSON.parse(carrito);
        },
        loginData: function(){
            if(this.loginForm.email.value.trim() == ''){
                index.msjAdvertencia('¡El correo es requerido!');
                return;
            }
            if(this.loginForm.password.value.trim() == ''){
                index.msjAdvertencia('¡La contraseña de usuario es requerido!');
                return;
            }

            var formData = new FormData(); // objeto ya declarado para ajax sentencia creada por
                formData.append("email", this.loginForm.email.value);
                formData.append("password", this.loginForm.password.value);
                var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                var ajaxUrl = base_url+'/usuarios/loginUsuario';
                request.open("POST", ajaxUrl, true);
                //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(formData);
                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        console.log(request.responseText);
                        var objData = JSON.parse(request.responseText);
                        if(objData.estado){
                            if(objData.rol) window.location = base_url+'home';
                            else window.location = base_url+'cliente';
                            //index.msjCompletado(objData.msj);
                        }else{
                            index.msjError(objData.msj);
                        }
                    }
                }
        },
        Registrandome: function(){
            let this_ = this;
            if(this.registrarmeForm.nombre.value.trim() == ''){
                index.msjAdvertencia('¡Nombre es requerido!');
                return;
            }
            if(this.registrarmeForm.apellido.value.trim() == ''){
                index.msjAdvertencia('Apellido es requerido!');
                return;
            }
            if(this.registrarmeForm.telefono.value.trim() == ''){
                index.msjAdvertencia('Telefono es requerido!');
                return;
            }
            if(this.registrarmeForm.dni.value.trim() == ''){
                index.msjAdvertencia('¡Su DNI es requerido!');
                return;
            }
            const resValid = index.validarEmail(this.registrarmeForm.email.value.trim())
            if(!resValid.isValid){
                index.msjAdvertencia(resValid.msg);
                return;
            }
            if(this.registrarmeForm.password.value.trim() == ''){
                index.msjAdvertencia('¡La contraseña es requerido!');
                return;
            }
            if(this.registrarmeForm.password.value.trim().length <= 5){
                index.msjAdvertencia('¡La contraseña debe ser mayor a seis dígitos!');
                return;
            }
            var formData = new FormData(); // objeto ya declarado para ajax sentencia creada por
                formData.append("nombre", this.registrarmeForm.nombre.value);
                formData.append("apellido", this.registrarmeForm.apellido.value);
                formData.append("telefono", this.registrarmeForm.telefono.value);
                formData.append("dni", this.registrarmeForm.dni.value);
                formData.append("email", this.registrarmeForm.email.value);
                formData.append("password", this.registrarmeForm.password.value);
                var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                var ajaxUrl = base_url+'/cliente/nuevoCliente';
                request.open("POST", ajaxUrl, true);
                //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(formData);
                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        //console.log(request.responseText);
                        var objData = JSON.parse(request.responseText);
                        if(objData.estado){
                            index.msjCompletado(objData.msj);
                            this_.registrarmeForm.reset();
                            $('#RegistrarmeModal').modal('toggle');
                        }else{
                            index.msjError(objData.msj);
                        }
                    }
            }
        },
        closeLogin: function(){
            $(".overlay-login").fadeToggle(200);
            $(".button-log a").toggleClass('btn-open').toggleClass('btn-close');
            open = false;
        },
        carrito_productos: [],
        total: 0,
        mostrarCarrito: function(){
            let html = '', total = 0, precio = '';
            if(this.carrito_productos.length > 0){
                for(let i = 0; i < this.carrito_productos.length; i++){
                    if(this.carrito_productos[i].descuento) precio = `<span class="item_price">${this.carrito_productos[i].moneda} ${parseFloat(this.carrito_productos[i].precio) - parseFloat(this.carrito_productos[i].descuento)}</span> <del>${this.carrito_productos[i].moneda} ${this.carrito_productos[i].precio}</del>`;
                    else precio = `<span class="item_price">${this.carrito_productos[i].moneda} ${this.carrito_productos[i].precio}</span>`;
                    html = `${html}     <tr class="rem1">
                            <td class="invert">${this.carrito_productos[i].nombre}</td>
                            <td class="invert-image p-0">
                                <img src="${this.carrito_productos[i].imagen}" alt=" " class="img-responsive m-0" width="80px" height="80px">
                            </td>
                            <td class="invert">${precio} <td class="invert">
                                <div class="quantity">
                                    <div class="quantity-select">
                                        <div class="entry value-minus" onclick="funciones.minCarrito(${i})">&nbsp;</div>
                                        <div class="entry value">
                                            <span>${this.carrito_productos[i].cantidad}</span>
                                        </div>
                                        <div class="entry value-plus active" onclick="funciones.masCarrito(${i})">&nbsp;</div>
                                    </div>
                                </div>
                            </td>
                            <td class="invert">
                                <div class="rem">
                                    <div class="close1" onclick="funciones.quitarDeCarrito(${i})"> </div>
                                </div>
                            </td>
                        </tr>`;
                    total = total + ((this.carrito_productos[i].descuento ? (parseFloat(this.carrito_productos[i].precio) - parseFloat(this.carrito_productos[i].descuento)) : parseFloat(this.carrito_productos[i].precio)) * this.carrito_productos[i].cantidad)
                }
            }else{
                html = ` <tr class="rem1">
                            <td class="invert text-center" colspan="5"><strong>¡No hay productos agregado!</strong></td>
                        </tr>`;
            }
            html = `${html} <tr>
                                <td colspan="5" class="text-right" style="color: #000">
                                    <strong id="total-carrito">Total: Bs. ${total.toFixed(2)}</strong>
                                </td>
                            </tr>`;
            this.total = total;
            index.get('cantidad-productos').innerHTML = this.carrito_productos.length+' productos agregado';
            index.get('tabla-carrito').innerHTML = html;
            if(!$('#miCarrito').hasClass('in')) $('#miCarrito').modal();
        },
        quitarDeCarrito(index) {
            this.carrito_productos.splice(index, 1);
            this.mostrarCarrito();
            sessionStorage.setItem('carrito-innovation', JSON.stringify(this.carrito_productos));
        },
        minCarrito(position) {
            let producto = this.carrito_productos[position];
            if(producto.cantidad > 1){
                this.carrito_productos[position].cantidad = producto.cantidad - 1;
                this.mostrarCarrito();
            }else{
                index.Toast('¡Cantidad no válida!', 2000, 'warning');
            }
        },
        masCarrito(index){
            let producto = this.carrito_productos[index];
            this.carrito_productos[index].cantidad = producto.cantidad + 1;
            this.mostrarCarrito();
        },
        limpiarCarrito() {
            sessionStorage.removeItem('carrito-innovation');
            this.carrito_productos = [];
            this.mostrarCarrito();
        },
        getUbicacion(){
            if(!navigator.geolocation){
                index.msjAdvertencia('¡Permitir los permisos de ubicación!');
                return;
            }
            let this_ = this;
            navigator.geolocation.getCurrentPosition(function(geolocationPosition){
                this_.latitud = geolocationPosition.coords.latitude;
                this_.longitud = geolocationPosition.coords.longitude;
                index.Toast('Mi Ubicación: latitud: ' + this_.latitud + ', longitud: ' + this_.longitud, 3000, 'info');
            });
        },
        latitud: 0, longitud: 0,
        guardarPedido: async function(){
            if(!navigator.geolocation){
                index.msjAdvertencia('¡Permitir los permisos de ubicación!');
                return;
            }
            if(this.carrito_productos.length <= 0){
                index.msjAdvertencia('¡No hay productos agregado al carrito!');
                return;
            }
            if(this.pedidoForm.ciudad.value.trim() == ''){
                index.msjAdvertencia('¡Agrege la ciudad de entrega!');
                return;
            }
            if(this.pedidoForm.direccion.value.trim() == ''){
                index.msjAdvertencia('¡Agregar dirección de entrega!');
                return;
            }
            for(let  i = 0; i < this.carrito_productos.length; i++){
                delete this.carrito_productos[i].imagen;
            }
            let this_ = this;
            navigator.geolocation.getCurrentPosition(function(geolocationPosition){
                //console.log(geolocationPosition.coords)
                this_.latitud = geolocationPosition.coords.latitude;
                this_.longitud = geolocationPosition.coords.longitude;
                var formData = new FormData(); // objeto ya declarado para ajax sentencia creada por
                formData.append("idcliente", idcliente);
                formData.append("direccion", this_.pedidoForm.direccion.value);
                formData.append("ciudad", this_.pedidoForm.ciudad.value);
                formData.append("productos", JSON.stringify(this_.carrito_productos));
                formData.append("total", this_.total);
                formData.append("latitud", this_.latitud);
                formData.append("longitud", this_.longitud);
                var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                var ajaxUrl = base_url+'/cliente/registrarPedido';
                request.open("POST", ajaxUrl, true);
                //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(formData);
                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        console.log(request.responseText);
                        var objData = JSON.parse(request.responseText);
                        if(objData.estado){
                            //paypal.minicart.reset();
                            this_.limpiarCarrito();
                            index.msjCompletado(objData.msj);
                            //$('#miCarrito').hide();
                        }else{
                            index.msjError(objData.msj);
                        }
                    }
                }
            });
        }
     };
     return metodos;
 })(window, document);
 document.addEventListener("DOMContentLoaded", function(){
    funciones.inicio();
    //paypal.minicart.render();
    /*paypal.minicart.render({
        strings:{
            button:'Hacer Pedido',
            buttonAlt: "Total",
            subtotal: 'Total: ',
            empty: 'No hay productos en el carrito',
            shipping: 'Ex Shipping &amp Taxes'
        },
        target: '<button>a</button>',
    });
    paypal.minicart.cart.on('checkout', function (evt) {
        let productos_agregados = [];
        for (var i = 0; i < paypal.minicart.cart.items().length; i++){
            let data = paypal.minicart.cart.items()[i]._data;
            productos_agregados.push({
                 idproducto: data.idproducto,
                 nombre: data.item_name,
                 cantidad: data.quantity
            });
        }
        funciones.guardarPedido(productos_agregados);
        return;
    });*/
    /*let UI = {};
    UI.button = document.createElement('input'); 
    UI.button.type = 'submit'; 
    UI.button.id = 'submit';
    UI.button.value = config.strings.button || 'Checkout'; 
    UI.buttonclicked = config.strings.buttonclicked || 'Processing...';
    UI.summary.appendChild(UI.button);
    $.event.add(ui.cart, 'submit', function (e) { document.getElementById('submit').value = ui.buttonclicked;  _checkout(e); });*/
    /*googles.render();

    
    console.log(googles.cart);
    googles.cart.on('googles_checkout', function (evt) {
        var items, len, i;
        if (this.subtotal() > 0) {
            items = this.items();
            for (i = 0, len = items.length; i < len; i++) {}
        }
    });*/
 });