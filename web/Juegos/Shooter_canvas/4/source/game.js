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
            this.image_index = Math.floor(8 * Math.random()); //Una subimagen aleatoria al inicio
        };
        objPlayer.Proto.event_step = function() {

            

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