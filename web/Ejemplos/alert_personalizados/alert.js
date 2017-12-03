var MessageBox = { //Un objeto con los diferentes tipos de emergente: alert, confirm y prompt.

    get_DOM: function() { //Esta función obtendrá todos los DIVs necesarios
        return {

            container: document.getElementById("message-container"),
            alert_box: document.getElementById("alert-box"),
            confirm_box: document.getElementById("confirm-box"),
            prompt_box: document.getElementById("prompt-box")

        };
    },

    alert: function(text) { //Se le ingresa el texto de la alerta

        var div = MessageBox.get_DOM(); //Obtenemos todos los elementos del DOM

        div.container.style.display = ''; //Eliminamos el 'display:none' del container para mostrarlo
        div.alert_box.style.display = ''; //Mostramos la caja de alerta

        div.confirm_box.style.display = 'none';
        div.prompt_box.style.display = 'none'; //Ocultamos las otras dos

        var content = div.alert_box.getElementsByClassName('content')[0]; //Obtenemos el DIV donde irá el contenido
        content.innerHTML = text; //Ponemos el contenido

        this.onaccept = function(){} //El evento que se ejecutará cuando se cierre el emergente.

        var self = this; //Un alias de la instancia actual para acceder a ella desde eventos
        var accept = div.alert_box.getElementsByClassName('accept')[0];
        accept.onclick = function() {

            self.onaccept();
            div.container.style.display = 'none';

        };
    },
    confirm: function(text, accept_caption, cancel_caption) {
    //Ésta recibe el texto de la pregunta, y opcionalmente el texto de los botones

        //Si el texto de los botones está vacío o no se ha especificado,
        //dejar un texto por defecto.

        if(!accept_caption || accept_caption.match(/^\s*$/i))
            accept_caption = "Aceptar";
        if(!cancel_caption || cancel_caption.match(/^\s*$/i))
            cancel_caption = "Cancelar";



        var div = MessageBox.get_DOM(); //Obtenemos todos los elementos del DOM

        div.container.style.display = ''; //Eliminamos el 'display:none' del container para mostrarlo
        div.confirm_box.style.display = ''; //Mostramos la caja de pregunta

        div.alert_box.style.display = 'none';
        div.prompt_box.style.display = 'none'; //Ocultamos las otras dos

        var content = div.confirm_box.getElementsByClassName('content')[0]; //Obtenemos el DIV donde irá el contenido
        content.innerHTML = text; //Ponemos el contenido

        this.onresponse = function(accepted){} //El evento que se ejecutará cuando se cierre el emergente.
        //Recibirá un parámetro: Si la pregunta ha sido aceptada (true) o cancelada (false).

        var self = this; //Un alias de la instancia actual para acceder a ella desde eventos
        var accept = div.confirm_box.getElementsByClassName('accept')[0];
            accept.innerText = accept_caption;
        accept.onclick = function() {

            self.onresponse( true );
            div.container.style.display = 'none';

        };
        var cancel = div.confirm_box.getElementsByClassName('cancel')[0];
            cancel.innerText = cancel_caption;
        cancel.onclick = function() {

            self.onresponse( false );
            div.container.style.display = 'none';

        };

    },
    prompt: function(text, placeholder, type) {
    //Recibe el texto del mensaje, el placeholder del input, y el tipo del input

        //Si el tipo está vacío
        if(!type || type.match(/^\s*$/i))
            type = "text";

        if(!placeholder || !type) //Si el tipo está vacío
            placeholder = "Ingrese el texto...";



        var div = MessageBox.get_DOM(); //Obtenemos todos los elementos del DOM

        div.container.style.display = ''; //Eliminamos el 'display:none' del container para mostrarlo
        div.prompt_box.style.display = ''; //Mostramos la caja de pregunta

        div.confirm_box.style.display = 'none';
        div.alert_box.style.display = 'none'; //Ocultamos las otras dos

        var content = div.prompt_box.getElementsByClassName('content')[0]; //Obtenemos el DIV donde irá el contenido
        content.innerHTML = text; //Ponemos el contenido

        var input = div.prompt_box.getElementsByClassName('textbox')[0];
            input.setAttribute('type', type);            
            input.setAttribute('placeholder', placeholder);
            input.value = ''; //Limpiar el contenido del input

        this.onresponse = function(text){} //El evento que se ejecutará cuando se cierre el emergente.
        //Recibirá un parámetro: el texto ingresado.

        var self = this; //Un alias de la instancia actual para acceder a ella desde eventos
        var accept = div.prompt_box.getElementsByClassName('accept')[0];
        accept.onclick = function() {

            self.onresponse( input.value );
            div.container.style.display = 'none';

        };

    }

}