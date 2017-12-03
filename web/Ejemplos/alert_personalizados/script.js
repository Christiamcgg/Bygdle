//Aquí probaremos las alertas
window.addEventListener('load', function() {

	var open_alert = document.getElementById('open-alert');
	var open_confirm = document.getElementById('open-confirm');
	var open_prompt = document.getElementById('open-prompt');

	var confirm_response = document.getElementById('confirm-response');
	var prompt_response = document.getElementById('prompt-response');

	open_alert.addEventListener('click', function() {
		var message = new MessageBox.alert('¡Has abierto un mensaje de alerta!');
			message.onaccept = function() {
				console.log( 'La alerta se ha cerrado' );
			};
	});

	open_confirm.addEventListener('click', function() {
		var message = new MessageBox.confirm( '¿Estás seguro de que deseas aceptar?' );
		message.onresponse = function( opt ) {
			if(opt) { //Si se ha aceptado
				confirm_response.innerText = '(aceptado)';
				console.log('aceptado');
			}
			else { //Si se ha cancelado
				confirm_response.innerText = '(cancelado)';
				console.log('cancelado');
			}
		}
	});
	open_prompt.addEventListener('click', function(text) {

		var message = new MessageBox.prompt( 'Ingrese su mensaje:', 'Mensaje...', 'number' );
		message.onresponse = function(text) {
			prompt_response.innerHTML = '<em>(Texto: ' + text + ')</em>';
			console.log('Text: ', text);
		}

	});

});