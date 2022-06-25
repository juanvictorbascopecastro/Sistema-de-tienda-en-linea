var index = (function(window, document){
    var metodos = {
        inicio: function(){
            //let this_ = this;
        },
        get: function(id){
            return document.getElementById(id);
        },
        noSubmit: function(id){
            let elemento = document.getElementById(id);
            if(elemento){
                elemento.addEventListener('submit', function(e){
                    e.preventDefault();
                }, false);
            }
        },

        msjInfo: function(msj){
            //$('#app').removeClass("nav-sm"); // codigo que desplega el menu pequeño 
            //$('#app').addClass("nav-md");
            Swal.fire({ 
                type: 'info',
                title: msj,
                confirmButtonText: "ACEPTAR",
                confirmButtonColor: '#1565c0',
            });
        },
        msjAdvertencia: function(msj){
            //$('#app').removeClass("nav-sm"); // codigo que desplega el menu pequeño 
            //$('#app').addClass("nav-md");
            Swal.fire({ 
                type: 'warning',
                title: msj,
                confirmButtonText: "ACEPTAR",
                confirmButtonColor: '#1565c0',
            });
        },
        msjError: function(msj){
            //$('#app').removeClass("nav-sm"); // codigo que desplega el menu pequeño 
            //$('#app').addClass("nav-md");
            Swal.fire({ 
                type: 'error',
                title: 'Advertencia',
                text: msj,
                confirmButtonText: "ACEPTAR",
                confirmButtonColor: '#1565c0',
            });
        },

        msjCompletado: function(msj){
            Swal.fire({
                position: 'top-end',
                type: 'success',
                title: msj,
                showConfirmButton: false,
                timer: 1200
            });
        },
        Toast: function(msj, time = 2000, type = 'success') {
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: time,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
        
            Toast.fire({
                icon: type,
                title: msj
            });
        },
        isInt: function(x){
            var y = parseInt(x);
            if (isNaN(y)) 
                return false;
            return x == y && x.toString() == y.toString();
        },
        isFloat(num){
            if(num.match(/^-?\d+$/)){
              return true;
            }else if(num.match(/^\d+\.\d+$/)){
              return true;
            }else{
              return false;
            }
        },
        validarEmail(v) {
            const r = {msg: '', isValid: true};
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            r.isValid = (pattern.test(v));
            r.msg = (v === '') ? '¡El correo es requerido!' : '¡El correo no es válido!';
            return r;
        },
        getFecha: function(date){
            if(date == null || date == '') return '';
            var hoy = new Date();
            var fecha = new Date(date);
            if(fecha.getDate() == hoy.getDate()){
                return 'Hoy a las '+(fecha.getHours() < 10 ? '0'+fecha.getHours() : fecha.getHours())+':'+(fecha.getMinutes() < 10 ? '0'+fecha.getMinutes() : fecha.getMinutes())+':'+(fecha.getSeconds() < 10 ? '0'+fecha.getSeconds() : fecha.getSeconds());
            }else{
                return (fecha.getDate() < 10 ? '0'+fecha.getDate() : fecha.getDate())+'/'+((fecha.getMonth()+1) < 10 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1))+'/'+fecha.getFullYear()+' '
                +(fecha.getHours() < 10 ? '0'+fecha.getHours() : fecha.getHours())+':'+(fecha.getMinutes() < 10 ? '0'+fecha.getMinutes() : fecha.getMinutes())+':'+(fecha.getSeconds() < 10 ? '0'+fecha.getSeconds() : fecha.getSeconds());
            }
        },
        fecha: function(date){
            var fecha = new Date(date);
            return (fecha.getDate() < 10 ? '0'+fecha.getDate() : fecha.getDate())+'/'+((fecha.getMonth()+1) < 10 ? '0'+(fecha.getMonth()+1) : (fecha.getMonth()+1))+'/'+fecha.getFullYear()
        },
        hora: function(date){
            var fecha = new Date(date);
            return (fecha.getHours() < 10 ? '0'+fecha.getHours() : fecha.getHours())+':'+(fecha.getMinutes() < 10 ? '0'+fecha.getMinutes() : fecha.getMinutes())+':'+(fecha.getSeconds() < 10 ? '0'+fecha.getSeconds() : fecha.getSeconds())
        }
     };
     return metodos;
 })(window, document);
 index.inicio();
