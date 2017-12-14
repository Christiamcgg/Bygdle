//-----------------SPRITES------------------
function Sprite(src, number) {
    this.image = new Image();
    this.image.src = src;
    this.number = number;
}

function draw_sprite(render, src, index, x, y) {

    var frame_w = src.image.width / src.number; 
        index = index % src.number; 
        
    render.drawImage(
        src.image, 
        frame_w * index, 
        0, 
        frame_w,  
        src.image.height, 
        x, 
        y, 
        frame_w, 
        src.image.height 
    );

}
//-------------ENTIDADES-------------
function Entity(sprite, container) {

    this.container = container;

    this.Proto = {

        sprite_index: sprite,
        image_index: 0,
        image_speed: 0,

        sprite_origin: {x: 0, y: 0},

        x: 0,
        y: 0,

        bbox: {
            type: Geometry.rectangle, //máscara de colisión rectangular
            data: [
                0, //left
                0, //top
                sprite.image.width, //width/radio
                sprite.image.height //height
            ]
        },


        event_create: function() {},
        event_step: function() {},
        event_collision: function() {}

    };

}

function instance_create(x, y, entity) {

    var instance = {};
    for(var i in entity.Proto) {
        instance[i] = entity.Proto[i];
    }
    instance.x = x;
    instance.y = y;
    instance.entity_index = entity;

    entity.container.push( instance );

    instance.event_create();
    return instance;
}


//---------CONTROL DE TECLADO-----------
var keyboard = {
    map: {},
    start: function() {

        window.addEventListener('keydown', function(ev) {
            var key = ev.which || ev.keyCode;
            keyboard.map[key] = true;
        });

        window.addEventListener('keyup', function(ev) {
            var key = ev.which || ev.keyCode;
            keyboard.map[key] = false;
        });

    },
    check: function(key) {
        return keyboard.map[key] == true; 
    }
};
const vk = {
    left: 37,
    up: 38, 
    right: 39, 
    down: 40,
    enter: 13,
    space: 32,
    tab: 9
};





