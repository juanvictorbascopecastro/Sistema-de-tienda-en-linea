var categorias = (function(window, document){
    var metodos = {
        categoria: null,
        list: [],
        inicio: function(){
            let this_ = this;
            index.get('btnNew').addEventListener('click', function(evt){
                index.get('form-categoria').reset();
                this_.categoria = null;
                $('#addCategoria').modal('toggle');                    
            });
        	index.get('form-categoria').addEventListener('submit', function(evt){
                evt.preventDefault();
                this_.saveData();                    
            });
            this.getCategorias();
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
                        this_.list = objData;
                        for(let i = 0; i < objData.length; i++){
                            html = html + `
                                        <li>
                                            <label class="mt-1"><i class="fa fa-angle-right" aria-hidden="true"></i> ${objData[i].nombre}</label>
                                            <span>
                                                <button class="btn btn-warning btn-sm submit" ctg="${objData[i].idcategoria}" onclick="categorias.editarCategoria(this)">Editar</button>
                                                <button class="btn btn-danger btn-sm submit" ctg="${objData[i].idcategoria}" onclick="categorias.eliminarCategoria(this)">Eliminar</button>
                                            </span>
                                        </li>`;
                        }
                        index.get('categorias').innerHTML = html;
                    }else{
                        index.msjError('¡Ocurrio un error al cargar los datos!');
                    }
                }
            }
        },
        saveData: function(){
            let this_ = this;
            let formulario = index.get('form-categoria');
            if(formulario.nombre.value.trim() != ''){
                var formData = new FormData(); // objeto ya declarado para ajax sentencia creada por
                formData.append("nombre", formulario.nombre.value);
                formData.append("descripcion", formulario.descripcion.value);
                var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                var ajaxUrl;
                if(this.categoria){
                    formData.append("idcategoria", this.categoria.idcategoria);
                    ajaxUrl = base_url+'/categoria/editarRegistro';
                }else{
                    ajaxUrl = base_url+'/categoria/nuevoRegistro';
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
                            this_.getCategorias();
                            $('#addCategoria').modal('toggle');
                        }else{
                            index.msjError(objData.msj);
                        }
                    }
                }
            }else{
                index.msjAdvertencia('¡Nombre de la categoria es requerido!');
            }
        },
        editarCategoria: function(elm){
            this.categoria = {};
            var idcategoria = $(elm).attr('ctg');
            this.categoria = this.list.find(function(element) {
                return element.idcategoria == idcategoria;
            });
            $('#addCategoria').modal('toggle');         
            let formulario = index.get('form-categoria');
            formulario.nombre.value = this.categoria.nombre;
            formulario.descripcion.value = this.categoria.descripcion;
        },
        eliminarCategoria: function(elm){
            this.categoria = {};
            var idcategoria = $(elm).attr('ctg');
            let data = this.list.find(function(element) {
                return element.idcategoria == idcategoria;
            });
            let this_ = this;
            Swal.fire({
                title: '¿Seguro que desea eliminar la categoria '+data.nombre+'?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#B3ABAB',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'No Eliminar'
            }).then((result) => {
                if (result.value) {
                    var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
                    var ajaxUrl = base_url+'/categoria/eliminarRegistro';
                    var formData = new FormData(); // objeto ya declarado para ajax sentencia creada por
                    formData.append("idcategoria", idcategoria);
                    
                    request.open("POST", ajaxUrl, true);
                    request.send(formData);
                    request.onreadystatechange = function(){
                        if(request.readyState == 4 && request.status == 200){
                            //console.log(request.responseText);
                            var objData = JSON.parse(request.responseText);
                            if(objData.estado){
                                this_.getCategorias();
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
 categorias.inicio();