//-----------OBJETO CONTENEDOR----------------
var Geometry = {

    //Las funciones constructoras de las figuras básicas
    rectangle: function(x, y, w, h) {
        this.left = x;
        this.top = y;
        this.width = w;
        this.height = h;
    },
    circle: function (x, y, r) {
        this.left = x;
        this.top = y;
        this.radius = r;
    },

    //Funciones normales para calcular distancia y ángulo entre dos puntos
    distance: function(x1, y1, x2, y2) {
        var vx = x2 - x1;
        var vy = y2 - y1;
        return Math.sqrt( vx*vx + vy*vy );
    },
    direction: function(x1, y1, x2, y2) {
        var vx = x2 - x1;
        var vy = y2 - y1;
        return Math.atan2( vy, vx );
    }
};


//---------------COLISIONES USANDO RECTÁNGULOS--------------

Geometry.rectangle.prototype.collision_point = function(x, y) {
//Rectángulo colisiona con punto (x, y)
    return (
        (x > this.left) && 
        (x < this.left + this.width) &&
        (y > this.top) &&
        (y < this.top + this.height)
    );
}

Geometry.rectangle.prototype.collision_rectangle = function(rect){
//Rectángulo colisiona con rectángulo
    if(! (rect instanceof Geometry.rectangle) ) {
        //Mostrar advertencia si no se pasa un rectángulo como parámetro
        console.warn('El valor argumentado NO es un rectángulo');
        return false;
    }

    var t_right  = this.left + this.width;
    var t_bottom = this.top  + this.height;
    
    var r_right  = rect.left + rect.width;
    var r_bottom = rect.top  + rect.height;

    return (
        (this.left < r_right) &&
        (t_right > rect.left) &&
        (this.top < r_bottom) &&
        (t_bottom > rect.top)
    );
};
Geometry.rectangle.prototype.collision_circle = function(circle) {
//Rectángulo colisiona con círculo

    if(! (circle instanceof Geometry.circle) ) {
        //Mostrar advertencia si no se pasa un círculo como parámetro
        console.warn('El valor argumentado NO es un círculo');
        return false;
    }
    // Limitar un valor a cierto rango
    function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val))
    }
    var border_x = clamp(circle.left, this.left, this.left + this.width);
    var border_y = clamp(circle.top, this.top, this.top + this.height);

    var border_dist = Geometry.distance( circle.left, circle.top, border_x, border_y );
    return border_dist < circle.radius;
}



//----------COLISIONES USANDO CÍRCULOS-------------

Geometry.circle.prototype.collision_point = function (x, y) {
//Círculo colisiona con punto (x, y)
    return Geometry.distance( this.left, this.top, x, y ) < this.radius;
}

Geometry.circle.prototype.collision_circle = function(circle){
//Círculo colisiona con círculo
    if(!(circle instanceof Geometry.circle)) {
        //Mostrar advertencia si no se pasa un círculo como parámetro
        console.warn('El valor argumentado NO es un círculo');
        return false;
    }

    var r_sum = this.radius + circle.radius;
    var p_dis = Geometry.distance( this.left, this.top, circle.left, circle.top );
    return r_sum > p_dis;

};
Geometry.circle.prototype.collision_rectangle = function(rectangle) {
//Círculo colisiona con rectángulo
    if(! (rectangle instanceof Geometry.rectangle)) {
        //Mostrar advertencia si no se pasa un rectángulo como parámetro
        console.warn('El valor argumentado NO es un rectángulo');
        return false;
    }
    return rectangle.collision_circle(this);
}


var a = new Geometry.rectangle(0, 0, 1, 1);
var b = new Geometry.circle(2, 2, Math.sqrt(2)+ 1e-5);

console.log(b.collision_rectangle(a))