//Esto iría en game.js
window.addEventListener( 'load', function() {

    var canvas = document.getElementById('game');
    var render = canvas.getContext( '2d' );


    const sprite = {
        player: new Sprite('source/sprites/spr_player.png', 8)
    };

    var i = 0;
    window.setInterval( function() {

        render.clearRect( 0, 0, canvas.width, canvas.height );
        draw_sprite(render, sprite.player, i, 32, 32);
        i++;

    }, 1000 / 60 );


} );