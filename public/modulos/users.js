var users = (function(window, document){
    var metodos = {
        usuario: null,
        list: [],
        inicio: function(){
            let this_ = this;
            index.get('btnNew').addEventListener('click', function(evt){
                index.get('form-user').reset();
                this_.categoria = null;
                $('#addUserModal').modal('toggle');                    
            });
        	index.get('form-user').addEventListener('submit', function(evt){
                evt.preventDefault();
                this_.saveData();                    
            });
            this.getUsuarios();
        },
        getUsuarios: function(){
            let this_ = this;
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url+'/usuarios/getData';
            request.open("GET", ajaxUrl, true);
            //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send();
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    var objData = JSON.parse(request.responseText);
                    if(objData){
                        let html = '';
                        let button = '';
                        this_.list = objData;
                        for(let i = 0; i < objData.length; i++){
                            if(objData[i].estado == '1') button = `<button class="btn btn-sm btn-warning" user="${objData[i].idpersona}" onclick="users.activarUsuario(this)"><i class="fa fa-times"></i></button>`;
                            else button = `<button class="btn btn-sm btn-success" user="${objData[i].idpersona}" onclick="users.activarUsuario(this)"><i class="fa fa-check"></i></button>`;
                            html = html + `<tr class="rem1">
                                            <td class="invert">${objData[i].nombre}</td>
                                            <td class="invert">${objData[i].apellido}</td>
                                            <td class="invert">${objData[i].telefono}</td>
                                            <td class="invert">${objData[i].email}</td>
                                            <td class="invert">${objData[i].rol}</td>
                                            <td class="invert">
                                                ${button}
                                                <button class="btn btn-sm btn-danger" user="${objData[i].idpersona}" onclick="users.eliminarUsuario(this)"><i class="fa fa-trash"></i></button>
                                            </td>
                                        </tr>`;
                        }
                        index.get('text-registros').innerHTML = objData.length+' empleados';
                        index.get('tabla-usuarios').innerHTML = html;
                    }else{
                        index.msjError('¡Ocurrio un error al cargar los datos!');
                    }
                }
            }
        },
        saveData: function(){
            let this_ = this;
            let formulario = index.get('form-user');
            if(formulario.nombre.value.trim() == ''){
                index.msjAdvertencia('¡Nombre de la usuario es requerido!');
                return;
            }
            if(formulario.apellido.value.trim() == ''){
                index.msjAdvertencia('Apellido de la usuario es requerido!');
                return;
            }
            if(formulario.telefono.value.trim() == ''){
                index.msjAdvertencia('Telefono de la usuario es requerido!');
                return;
            }
            if(formulario.rol.value.trim() == ''){
                index.msjAdvertencia('¡Asignar un rol de usuario!');
                return;
            }
            const resValid = index.validarEmail(formulario.email.value.trim())
            if(!resValid.isValid){
                index.msjAdvertencia(resValid.msg);
                return;
            }
            if(formulario.password.value.trim() == ''){
                index.msjAdvertencia('¡La contraseña es requerido!');
                return;
            }
            if(formulario.password.value.trim().length <= 5){
                index.msjAdvertencia('¡La contraseña debe ser mayor a seis dígitos!');
                return;
            }
            var formData = new FormData(); // objeto ya declarado para ajax sentencia creada por
                formData.append("nombre", formulario.nombre.value);
                formData.append("apellido", formulario.apellido.value);
                formData.append("telefono", formulario.telefono.value);
                formData.append("rol", formulario.rol.value);
                formData.append("email", formulario.email.value);
                formData.append("password", formulario.password.value);
                var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                var ajaxUrl = base_url+'/usuarios/nuevoRegistro';
                request.open("POST", ajaxUrl, true);
                //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send(formData);
                request.onreadystatechange = function(){
                    if(request.readyState == 4 && request.status == 200){
                        //console.log(request.responseText);
                        var objData = JSON.parse(request.responseText);
                        if(objData.estado){
                            index.msjCompletado(objData.msj);
                            this_.getUsuarios();
                            formulario.reset();
                            $('#addUserModal').modal('toggle');
                        }else{
                            index.msjError(objData.msj);
                        }
                    }
            }
        },
        eliminarUsuario: function(elm){
            this.usuario = {};
            var idpersona = $(elm).attr('user');
            let data = this.list.find(function(element) {
                return element.idpersona == idpersona;
            });

            let this_ = this;
            Swal.fire({
                title: '¿Seguro que desea eliminar a '+data.nombre+' '+data.apellido+'?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#B3ABAB',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'No Eliminar'
            }).then((result) => {
                if (result.value) {
                    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    var ajaxUrl = base_url+'/usuarios/eliminarRegistro';
                    var formData = new FormData(); // objeto ya declarado para ajax sentencia creada por
                    formData.append("idpersona", idpersona);
                    
                    request.open("POST", ajaxUrl, true);
                    request.send(formData);
                    request.onreadystatechange = function(){
                        if(request.readyState == 4 && request.status == 200){
                            var objData = JSON.parse(request.responseText);
                            if(objData.estado){
                                this_.getUsuarios();
                                index.msjCompletado(objData.msj);
                            }else{
                                index.msjError(objData.msj);
                            }
                        }
                    }
                }
            }); 
        },
        activarUsuario(elm){
            this.usuario = {};
            var idpersona = $(elm).attr('user');
            let data = this.list.find(function(element) {
                return element.idpersona == idpersona;
            });
            let this_ = this;
            Swal.fire({
                title: '¿Seguro que desea '+(data.estado ? 'desactivar' : 'activar')+' a '+data.nombre+' '+data.apellido+'?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#B3ABAB',
                confirmButtonText: 'SI',
                cancelButtonText: 'NO'
            }).then((result) => {
                if (result.value) {
                    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    var ajaxUrl = base_url+'/usuarios/desactivarUsuario';
                    var formData = new FormData(); // objeto ya declarado para ajax sentencia creada por
                    formData.append("idpersona", idpersona);
                    formData.append("estado", (data.estado == '1' ? 0 : 1));
                    
                    request.open("POST", ajaxUrl, true);
                    request.send(formData);
                    request.onreadystatechange = function(){
                        if(request.readyState == 4 && request.status == 200){
                            //console.log(request.responseText);
                            var objData = JSON.parse(request.responseText);
                            if(objData.estado){
                                this_.getUsuarios();
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
 users.inicio();