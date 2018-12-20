(function() {
    "use strict";
    var regalo = document.getElementById('regalo');
    document.addEventListener('DOMContentLoaded', function(){

        var map = L.map('mapa').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([51.5, -0.09]).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();
        
        //campos datos usuarios
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var email = document.getElementById('email');
        
        //campos paso
        var pase_dia = document.getElementById('pase_dia');
        var pase_dos = document.getElementById('pase_dos');
        var pase_completo = document.getElementById('pase_completo');

        //botones y divs
        var calcular = document.getElementById('calcular');
        var errordiv = document.getElementById('error');
        var botonregistro = document.getElementById('btnRegistro');
        var resultado = document.getElementById('lista-productos');
        var suma = document.getElementById('suma-total');
        //extras
        var etiquetas = document.getElementById('etiquetas'); 
        var camisas = document.getElementById('camisa_evento');
        calcular.addEventListener('click', calcularMontos);
        pase_dia.addEventListener('blur', Mostrardias);
        pase_dos.addEventListener('blur', Mostrardias);
        pase_completo.addEventListener('blur', Mostrardias);
        

        nombre.addEventListener('blur', validarcampo);
        apellido.addEventListener('blur', validarcampo);
        email.addEventListener('blur', validarcampo);
        email.addEventListener('blur', validaremail);
        function validaremail() {
            if (email.value.indexOf("@") > -1) {
                errordiv.style.display = 'none';
            } else{
                errordiv.style.display = 'block';
                errordiv.innerHTML = "correo no valido";
            }
        }

        function validarcampo() {
            if (nombre.value == '') {
                errordiv.style.display = 'block';
                errordiv.innerHTML = "esto es obligatorio";
            } else{
                errordiv.style.display = 'none';
            }
        }
        function calcularMontos (event){
            event.preventDefault();
            if (regalo.value === '') {
                alert("elegir regalo");
                regalo.focus();
            } else{
                var boletodia = parseInt(pase_dia.value, 10) || 0,
                    boleto2dias = parseInt(pase_dos.value, 10) || 0,
                    boletocompleto = parseInt(pase_completo.value,  10) || 0,
                    cantcamisas = parseInt(camisas.value, 10) || 0,
                    cantetiquetas = parseInt(etiquetas.value, 10) || 0;
                
                var totalpagar = (boletodia*30) + (boleto2dias*45) + (boletocompleto*50) + (cantcamisas * 10) + (cantetiquetas *2);
                var listadoProductos = [];
                if (boletodia >= 1) {
                    listadoProductos.push(boletodia + ' pases por dia');
                }
                if (boleto2dias >= 1) {
                    listadoProductos.push(boleto2dias + ' pases 2 dias');
                }
                if (boletocompleto >= 1) {
                    listadoProductos.push(boletocompleto + ' pases completo');
                }
                if (cantcamisas >= 1) {
                    listadoProductos.push(cantcamisas + ' camisas');
                }
                if (cantetiquetas >= 1) {
                    listadoProductos.push(cantetiquetas + ' etiqeutas');
                }
                resultado.innerHTML = '';
               for (let i = 0; i < listadoProductos.length; i++) {
                    resultado.innerHTML += listadoProductos[i] + '</br>';
               }
               suma.innerHTML = '$' + totalpagar.toFixed(2);
            }
        }
        function Mostrardias() {
            var boletodia = parseInt(pase_dia.value, 10) || 0,
                boleto2dias = parseInt(pase_dos.value, 10) || 0,
                boletocompleto = parseInt(pase_completo.value, 10) || 0;
            
            var diaselegidos = [];
            if (boletodia > 0) {
                diaselegidos.push('viernes')
            }

            if (boleto2dias > 0) {
                diaselegidos.push('viernes', 'sabado')
            } 

            if (boletocompleto > 0) {
                diaselegidos.push('viernes', 'sabado', 'domingo')
            }
            var dias = document.getElementsByClassName("contenido-dia");
            for (var i = 0; i < dias.length; i++) {
                dias[i].style.display = "none";
            }
            for (let i = 0; i < diaselegidos.length; i++) {
                 document.getElementById(diaselegidos[i]).style.display = 'block';
            }
        }
    }); //DOMloaded
})();

$(function(){
    'use strict'
    $('div.ocultar').hide();
    $('#talleres').show();
    $('.menu-programa a').on('click', function(){
        $('div.ocultar').hide();
        var enlace = $(this).attr('href');
        $(enlace).fadeIn(1000);
        $(enlace).show();
        
        return false;
    })



    //animaciones para numeros
    $('.resumen-evento li:nth-child(1) p').animateNumber({number: 6}, 2000);
    $('.resumen-evento li:nth-child(2) p').animateNumber({ number: 15 }, 2000);
    $('.resumen-evento li:nth-child(3) p').animateNumber({ number: 3 }, 2000);
    $('.resumen-evento li:nth-child(4) p').animateNumber({ number: 9 }, 2000);

    //conteo regresivo
    $('.cuenta-regresiva').countdown('2018/08/18', function (event) {
            $('#dias').html(event.strftime('%D'));
            $('#horas').html(event.strftime('%H'));
            $('#minutos').html(event.strftime('%M'));
            $('#segundos').html(event.strftime('%S'));
            
        });
    

})