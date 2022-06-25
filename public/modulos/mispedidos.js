var mispedidos = (function(window, document){
    var metodos = {
        list: [],
        inicio: function(){
            //let this_ = this;
            this.getPedidos();
        },
        getPedidos: function(){
            if(idcliente == null){
                funciones.closeLogin();
                return;
            }
            let this_ = this;
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url+'/cliente/getPedidos?idcliente='+idcliente;
            request.open("GET", ajaxUrl, true);
            //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send();
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    var objData = JSON.parse(request.responseText);
                    if(objData){
                        this_.list = objData;
                        if(objData.length <= 0){
                            index.get('tabla-pedidos').innerHTML = `<tr class="rem1">
                                                                        <td colspan="4" class="invert text-center"> ¡No hay registros! </td>
                                                                    </tr>`;
                        }else{
                            let html = '', estado = '', button = '';
                            for(let i = 0; i < objData.length; i++){
                                button = '';
                                if(objData[i].estado == 1){
                                    estado = `<span class="badge bg-danger text-white">Pendiente</span>`;
                                    button = `<button class="btn btn-default btn-sm" ped="${objData[i].idpedido}" onclick="mispedidos.cancelarPedido(this)"><i class="fa fa-times" aria-hidden="true"></i></button>`;
                                }else if(objData[i].estado == 2) estado = `<span class="badge bg-info text-white">Atendido</span>`;
                                else estado = `<span class="badge bg-secondary text-white">Concluido</span>`;
                                html = html + `<tr class="rem1">
								                <td class="invert">${index.getFecha(objData[i].fecha)}</td>
                                                <td class="invert">${objData[i].direccion}</td>
                                                <td class="invert">${estado}</td>
                                                <td class="invert">${parseFloat(objData[i].total).toFixed(2)}</td>
                                                <td class="invert">
                                                    <button class="btn btn-warning btn-sm" ped="${objData[i].idpedido}" onclick="mispedidos.detallesPedido(this)"><i class="fa fa-info-circle" aria-hidden="true"></i></button>
                                                    ${button}
                                                </td>
                                            </tr>`;
                            }
                            index.get('tabla-pedidos').innerHTML = html;
                            index.get('text-registros').innerHTML = objData.length + ' pedidos.';
                        }
                        
                    }else{
                        index.msjError('¡Ocurrio un error al cargar los datos!');
                    }
                }
            }
        },
        detallesPedido: function(elm){
            var idpedido = $(elm).attr('ped');
            let data = this.list.find(function(element) {
                return element.idpedido == idpedido;
            });
            this.getProductosPedido(data.idpedido);
        },
        getProductosPedido: function(idpedido){
            let this_ = this;
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url+'/cliente/getProductosPedido?idpedido='+idpedido;
            request.open("GET", ajaxUrl, true);
            //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send();
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    var objData = JSON.parse(request.responseText);
                    if(objData){
                        let html = '';
                        let total = 0;
                        for(let i = 0; i < objData.length; i++){
                            total = total + ((objData[i].descuento ? (parseFloat(objData[i].precio) - parseFloat(objData[i].descuento)) : parseFloat(objData[i].precio)) * objData[i].cantidad)
                            html = html + `<li>${objData[i].nombre}
                                                <i>-</i> CTD: ${objData[i].cantidad}
                                                <span>${objData[i].moneda} ${objData[i].precio} </span>
                                            </li>`;
                            //total = total + precio;
                        }
                        total = parseFloat(total).toFixed(2)
;                        html = html + `<li style="color: #000; font-weight: bold;">Total
                                            <i>-</i>
                                            <span>${objData[0].moneda +' '+(total)}</span>
                                        </li>`;
                        index.get('productos-pedido').innerHTML = html;
                    }else{
                        index.msjError('¡Ocurrio un error al cargar los datos!');
                    }
                }
            }
        },
        cancelarPedido: function(elm){
            var idpedido = $(elm).attr('ped');
            let this_ = this;
            Swal.fire({
                title: '¿Seguro que desea cancelar el pedido?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#B3ABAB',
                confirmButtonText: 'CANCELAR',
                cancelButtonText: 'NO CANCELAR'
            }).then((result) => {
                if (result.value) {
                    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    var ajaxUrl = base_url+'/cliente/cancelarPedido';
                    var formData = new FormData(); // objeto ya declarado para ajax sentencia creada por
                    formData.append("idpedido", idpedido);
                    
                    request.open("POST", ajaxUrl, true);
                    request.send(formData);
                    request.onreadystatechange = function(){
                        if(request.readyState == 4 && request.status == 200){
                            console.log(request.responseText);
                            var objData = JSON.parse(request.responseText);
                            if(objData.estado){
                                this_.getPedidos();
                                index.msjCompletado(objData.msj);
                            }else{
                                index.msjError(objData.msj);
                            }
                        }
                    }
                }
            }); 
        }
     };
     return metodos;
 })(window, document);
 mispedidos.inicio(); 