const sprites = {
    player: new Sprite( 'source/sprites/spr_player.png', 8 )
};



window.addEventListener( 'load', function() {

    //Obtener el elemento <canvas> del juego y su CanvasRenderingContext2D
    const Canvas = document.getElementById( 'game' );
    const Render = Canvas.getContext( '2d' );
    const FPS    = 30; //FPS del juego 



    var entities = [];

    var objPlayer = new Entity( sprites.player, entities );
        objPlayer.Proto.sprite_origin = {x:33, y: 33};

        objPlayer.Proto.event_create = function() {


            //Obtener una dirección aleatoria entre 0 y 2PI, sólo con ángulos
            //múltiplos de PI/4.
            var dir = Math.floor(8 * Math.random()) ;
            this.direction = dir * Math.PI/4; //Esta propiedad no está predefinida, es una "única" de esta entidad.

            //Definir la subimagen correspondiente al ángulo.
            this.image_index = dir;

        };
        objPlayer.Proto.event_step = function() {

            //Mover el jugador con una velocidad de 3, hacia el ángulo generado.
            this.x += Math.cos(this.direction) * 3;
            this.y -= Math.sin(this.direction) * 3;

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


    var i = 0;
    while(i < 5) {
        //Crear cinco instancias de objPlayer en posiciones aleatorias dentro de la escena
        
        var pos_x = Math.floor( Math.random() * Canvas.width );
        var pos_y = Math.floor( Math.random() * Canvas.height );
        instance_create(pos_x, pos_y, objPlayer);
        i++;
    }


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