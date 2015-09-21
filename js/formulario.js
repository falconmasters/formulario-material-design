// Recorrer los elementos y hacer que onchange ejecute una funcion para comprobar el valor de ese input
// (function(){

var formulario = document.formulario_registro,
	elementos = formulario.elements;

// Funcion que se ejecuta cuando el evento click es activado

var validar = function(e){
	var valido = true;
	// Recorremos todos los elementos del formulario
	for (var i = 0; i < elementos.length; i++) {
		// Identificamos si el elemento es de tipo texto, email, password, radio o checkbox
		if (elementos[i].type == "text" || elementos[i].type == "email" || elementos[i].type == "password") {
			// Si es tipo texto, email o password vamos a comprobar que esten completados los input
			if (elementos[i].value.length == 0) {
				console.log('El campo ' + elementos[i].name + ' esta incompleto');
				valido = false;
				elementos[i].className = elementos[i].className + " error";
			} else {
				elementos[i].className = elementos[i].className.replace(" error", ""); 
			}
		// Revisamos dentro de los radio button con name sexo que alguno de ellos este seleccionado
		} else if(elementos[i].type == "radio" && elementos[i].name == "sexo"){

			var opciones = document.getElementsByName('sexo');
			// Recorremos los radio button
			for (var o = 0; o <= opciones.length -1; o++) {
				if (opciones[o].checked) {
					var resultado = true;
					break;
				}
			}

			if (resultado !== true) {
				console.log('El campo sexo esta incompleto');
				var valido = false;
				elementos[i].parentNode.className = elementos[i].parentNode.className + " error";
			} else {
				// Eliminamos la clase Error del radio button
				elementos[i].parentNode.className = elementos[i].parentNode.className.replace(" error", "");
			}
		// Revisamos si el checkbox esta seleccionado
		} else if(elementos[i].type == "checkbox"){
			if (!elementos[i].checked) {
				console.log('checkbox no esta checkado');
				var valido = false;
				elementos[i].parentNode.className = elementos[i].parentNode.className + " error";
			} else {
				// Eliminamos la clase Error del radio button
				elementos[i].parentNode.className = elementos[i].parentNode.className.replace(" error", "");
			}
		}
	}

	// Prevenimos el envio de formularios
	if (valido == false) {
		console.log('No envia');
		e.preventDefault();
	} else {
		console.log('Envia');
		e.preventDefault();
		formulario.submit();
	}
};

var focusInput = function(){
	this.parentElement.children[1].className = "label active";
	this.parentElement.children[0].className = this.parentElement.children[0].className.replace("error", "");
};

var blurInput = function(){
	if (this.value <= 0) {
		this.parentElement.children[1].className = "label";
		this.parentElement.children[0].className = this.parentElement.children[0].className + " error";
	}
};

// --- Eventos ---
formulario.addEventListener("submit", validar);

for (var i = 0; i < elementos.length; i++) {
	if (elementos[i].type == "text" || elementos[i].type == "email" || elementos[i].type == "password") {
		elementos[i].addEventListener("focus", focusInput);
		elementos[i].addEventListener("blur", blurInput);
	}
}

// }())