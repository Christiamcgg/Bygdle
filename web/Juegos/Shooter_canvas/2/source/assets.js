function Sprite(src, number) {
    this.image = new Image();
    this.image.src = src;
    this.number = number;
}

function draw_sprite(render, src, index, x, y) {

    var frame_w = src.image.width / src.number; //El anchor de cada subimagen. Anchor total / número subimágenes
        index = index % src.number; //Limitar el índice dentro de cantidad de subimágenes.
        
    render.drawImage(
        src.image, //Imagen a dibujar
        frame_w * index, //Posición X desde la que se tomará la parte de la imagen que hay que dibujar
        0, //Posición X desde la que se tomará la parte de la imagen que hay que dibujar
        frame_w,  //Anchor de la parte de la imagen que se tomará
        src.image.height, //Altura de la imagen que se tomará
        x, //Posición x en el canvas donde dibujar la parte dada de la imagen
        y, //Posición x en el canvas donde dibujar la parte dada de la imagen
        frame_w, //Anchor con el que dibujar la parte dada de la imagen en el canvas
        src.image.height //Anchor con el que dibujar la parte dada de la imagen en el canvas
    );

}