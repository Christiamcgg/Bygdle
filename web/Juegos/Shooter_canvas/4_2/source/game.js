const sprites = {
    player: new Sprite( 'source/sprites/spr_player.png', 8 )
};



window.addEventListener( 'load', function() {

    //Obtener el elemento <canvas> del juego y su CanvasRenderingContext2D
    const Canvas = document.getElementById( 'game' );
    const Render = Canvas.getContext( '2d' );
    const FPS    = 60; //FPS del juego 

    keyboard.start(Canvas);

    var entities = [];

    var objPlayer = new Entity( sprites.player, entities );
        objPlayer.Proto.sprite_origin = {x:33, y: 33};
        objPlayer.Proto.speed = 4;

        objPlayer.Proto.event_create = function() {
            this.image_index = Math.floor(8 * Math.random()); //Una subimagen aleatoria al inicio

            //Un objeto con dos arreglos en donde se almacenará la lista de teclas presionadas.
            //Esto para evitar que el jugador se quede quieto cuando se presionan simultáneamente
            //dos teclas contrarias como izquierda y derecha, o arriba y abajo.
            //La propiadad 'x' almacena las teclas horizontales (izquierda y derecha), y la propiedad
            //'y' las verticales.
            this.key_list = {x: [], y:[]};
        };
        objPlayer.Proto.event_step = function() {

            var kleft  = keyboard.check(vk.left);
            var kright = keyboard.check(vk.right);
            var kup    = keyboard.check(vk.up);
            var kdown  = keyboard.check(vk.down);

            var sumx = kright - kleft; //Obtener dirección horizontal (1, -1 o 0)
            var sumy = kdown - kup; //Obtener dirección vertical (1, -1 o 0)

           /* //Si no hay movimiento horizontal PERO se están presionando ambas teclas
            if(!sumx && kleft && kright) {
                //Mover en la dirección contraria de la ÚLTIMA tecla presionada
                sumx = -this.key_list.x[this.key_list.x.length - 1];

                if(!sumx) {//Si aún así no hay movimiento (tal vez la lista todavía está vacía)
                    sumx = [-1, 1][ Math.floor(Math.random() * 2) ]; //Mover en una dirección aleatoria
                    this.key_list.x.push(sumx); //Añadir dicha dirección a la lista
                }
            }

            else if(kleft || kright) {
                //De lo contrario (si hay movimiento),
                if(this.key_list.x[this.key_list.x.length - 1] !== sumx)
                    //Añadir la dirección horizontal (-1, 0 o 1) a la lista
                    this.key_list.x.push(sumx);
            }
            else //De lo contrario (si no hay movimiento)
                this.key_list.x.splice(0, this.key_list.x.length); //Vaciar la lista para liberar memoria


            //Si no hay movimiento vertical PERO se están presionando ambas teclas
            if(!sumy && kup && kdown) {
                //Mover en la dirección contraria de la ÚLTIMA tecla presionada
                sumy = -this.key_list.y[this.key_list.y.length - 1];

                if(!sumy) {//Si aún así no hay movimiento (tal vez la lista todavía está vacía)
                    sumy = [-1, 1][ Math.floor(Math.random() * 2) ]; //Mover en una dirección aleatoria
                    this.key_list.y.push(sumy); //Añadir dicha dirección a la lista
                }
            }

            else if(kup || kdown) { //De lo contrario (si aún hay movimiento),
                if(this.key_list.y[this.key_list.y.length - 1] !== sumy)
                    //Añadir la dirección vertical (-1, 0 o 1) a la lista
                    this.key_list.y.push(sumy);
            }
            else //Si no hay movimiento
                this.key_list.y.splice(0, this.key_list.y.length);*/

            var angl = Math.atan2(sumy, sumx); //Obtener el ángulo del movimiento

            var spdx = this.speed * Math.cos(angl) * Math.abs(sumx);
            var spdy = this.speed * Math.sin(angl) * Math.abs(sumy);

            //Mover la instancia
            this.x += spdx;
            this.y += spdy;

            //Obtener la subimagen dependiendo del ángulo. Cada PI/4 es una subimagen más,
            //en sentido antihorario.
            var img = -4 * angl/Math.PI;
            img = img < 0 ? 8 + img : img;

            if(sumx || sumy)
                this.image_index = img;

            //Mantener al jugador siempre dentro de la pantalla.
            if(this.x < 0)
                this.x = Canvas.width;
            if(this.y < 0)
                this.y = Canvas.height;
            if(this.x > Canvas.width)
                this.x = 0;
            if(this.y > Canvas.height)
                this.y = 0;

        };
        
    instance_create(Canvas.width/2, Canvas.height/2, objPlayer);



    window.setInterval(function() {

        Render.clearRect( 0, 0, Canvas.width, Canvas.height );
        for(var i = 0; i < entities.length; i++) {

            var instance = entities[i];

            draw_sprite(Render, 
                instance.sprite_index, 
                Math.floor(instance.image_index), 
                instance.x - instance.sprite_origin.x, 
                instance.y - instance.sprite_origin.y
            );
            instance.image_index += instance.image_speed;

            instance.event_step();

        }


    }, 1000/FPS );


} );