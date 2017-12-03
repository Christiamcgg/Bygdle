window.addEventListener('load', function() {

    const game = document.getElementById('game'); //Obtener el DIV donde estarán las parejas
    const span = document.getElementById('score'); //El elemento donde se mostrará el puntaje
    if(!game) //Si el DIV no existe
        return; //Terminar el código

    game.innerHTML = ''; //Vaciar el DIV

    var images = [
    //Crearemos un arreglo donde colocaremos los nombres de todas las imágenes
    //Como las parejas tienen el mismo nombre pero están en directorios distintos,
    //sólo será necesario guardar el nombre de la imagen
    
        'imagen_0.png',
        'imagen_1.png',
        'imagen_2.png',
        'imagen_3.png',
        'imagen_4.png',
        'imagen_5.png',
        'imagen_6.png',
        'imagen_7.png',
        'imagen_8.png',
        'imagen_9.png',
        'imagen_10.png',
        'imagen_11.png',
        'imagen_12.png',
        'imagen_13.png'

    ]

    //Los directorios donde se ubican las imágenes
    //Si son 2 directorios, significa que hay dos imágenes por pareja, una en cada uno.
    var pairs = [ 'imagenes/par1', 'imagenes/par2' ];

    const max_score = images.length; //Obtener la cantidad de parejas (puntaje máximo)
    var score = 0; //Puntaje actual: 0 


    //Aquí se guardarán todas las imágenes: Si hay 14 parejas y dos imágenes por cada
    //una, entonces habrá un total de 28: 14 con el primer directorio, y 14 con el segundo
    var all_images = [];

    for(var i = 0; i < pairs.length; i++) {
        for(var j = 0; j < images.length; j++) {

            //Guardaremos en el arreglo las imágenes como objetos con dos propiedades:
            //El nombre de la imagen, y la ruta completa (el nombre más el directorio)
            all_images.push( {
                name:  images[j], 
                path: pairs[i] +  '/' + images[j]
            });
        }
    }
    all_images = shuffle(all_images); //Desordenamos la lista
    console.log(all_images);

    for(var i = 0; i < all_images.length; i++) {
        //Ahora, recorremos esta lista e imprimimos en el DOM cada imagen

        var img = document.createElement( 'img' );

            //Para el estilo CSS
            img.setAttribute('class', 'image-box');

            //Un par de propiedades para guardar el nombre y ruta de la imagen
            img.img_path = all_images[i].path;
            img.img_name = all_images[i].name;

            img.src = 'imagenes/unknown.png'; //La imagen que se mostrará, será la del "signo desconocido".
            img.on = false; //¿Se ha "desplegado" la imagen, o no?

            //Agregar un evento 'onclick' a la imagen
            img.addEventListener( 'click', function() {
                //!Aquí viene la magia!
                if(!this.on) { //Sólo si la imagen no se ha desplegado
                    this.on = true;
                    this.src = this.img_path;


                    //Todo esto para desactivar la imagen dentro de 2s
                    var self = this; //Un alias de la imagen actual para poder acceder desde el timeout
                    this.timeout = window.setTimeout( function() {
                        self.on = false; //Desactivar la imagen
                        self.src = 'imagenes/unknown.png'; //Volver a ícono de desconocido
                    }, 2000);

                    for(var j = 0; j < all_images.length; j++) { //Recorrer todas las imágenes

                        //Si la imagen que se está revisando NO es igual a la que está ejecutando el evento,
                        //y está activado
                        if( all_images[j].image !== this && all_images[j].image.on 
                            && all_images[j].image.img_name == this.img_name //Y pertenece a la pareja
                        ){
                            //Limpiar el interval que las desactiva
                            window.clearTimeout(this.timeout);
                            window.clearTimeout(all_images[j].image.timeout);
                            score++; //Sumar 1 al puntaje
                            
                            span.innerText = score; //Imprimir el puntaje en el DOM

                            if(score == max_score) { //Si se ha obtenido el puntaje máximo
                                alert( '¡Has ganado!' );
                                window.clearInterval(aug);
                            }
                        }
                    }
                }

            });

        game.appendChild(img);

        //Añadimos una nueva propiedad al índice de la lista,
        //con el elemento HTML de la imagen
        all_images[i].image = img; 

    }





    //CONTADOR DE TIEMPO
    const time = document.getElementById('time'); //Elemento donde se mostrará el tiempo
    var timer = 0;
    var aug = window.setInterval(function() {

        timer++;
        var seg = timer % 60; //Obtener los segundos
        var min = Math.floor(timer/60); //Obtener los minutos

        if(seg < 10)
            seg = "0" + seg.toString();
        if(min < 10)
            min = "0" + min.toString();

        time.innerText = min + ': ' + seg;

    }, 1000);
});



function irandom(n) { //Devolver un número aleatorio entre 0 y n - 1
    return Math.floor( Math.random() * n );
}
function shuffle( array ) { //Devolver una copia desordenada de el arreglo dado
    var copy = array.slice();
    var shuf = [];

    while(copy.length) {
        var pos = irandom(copy.length);
        shuf.push(copy[ pos ]);
        copy.splice(pos, 1);
    }
    return shuf;
}