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

function Entity(sprite, container) {

    this.container = container;

    this.Proto = {

        sprite_index: sprite,
        image_index: 0,
        image_speed: 0,

        sprite_origin: {x: 0, y: 0},

        x: 0,
        y: 0,


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