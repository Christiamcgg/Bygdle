function CanvasDrawer(callback, canvas, options) {

    if(!(canvas instanceof HTMLCanvasElement)) {
        console.error('Invalid HTMLCanvasElement');
        return;
    }
    if(!(callback instanceof Function)) {
        console.error('Invalid callback function');
        return;
    }
    if(!options || !(options instanceof Object)) {
        console.warn('Undefined options, using defaults.');
        options = {grid: {width: 32, height: 32}};
    }
    let _ = function() {
        console.warn('Malformed grid option, using default.');
        options.grid = {width: 32, height: 32};
    }
    if(!options.grid || typeof(options.grid) !== 'object') {
        _();
    }
    if(typeof(options.grid.width) !== 'number' || typeof(options.grid.height) !== 'number') {
        _();
    }


    //Geometría
    var Geometry = (function() {
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
            var closestX = clamp(circle.left, this.left, this.left + this.width);
            var closestY = clamp(circle.top, this.top, this.top + this.height);

            var distanceX = circle.left - closestX;
            var distanceY = circle.top - closestY;

            var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
            return distanceSquared < (circle.radius * circle.radius);
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

        return Geometry;
    })();

    var render = canvas.getContext('2d');

    function get_real_pos( x, y, origin ) {
        var w = options.grid.width;
        var h = options.grid.height;
        return {x: x*w, y: y*w};
    };

    var alias = {};
    alias.render = render;
    alias.lineWidth = function(width) {
        render.lineWidth = width;
    }
    alias.fillStyle = function(style) {
        render.fillStyle = style;
    }
    alias.strokeStyle = function(style) {
        render.strokeStyle = style;
    }
    alias.setStyle = function(stroke, fill) {
        if(typeof(fill) == 'string')
            alias.fillStyle(fill);
        if(typeof(stroke) == 'string')
            alias.strokeStyle(stroke);
    }
    alias.clear = function(fill) {
        render.clearRect(0, 0, canvas.width, canvas.height);
        if(fill) 
            render.fillRect(0, 0, canvas.width, canvas.height);
    }

    alias.fillRect = function(rectangle) {
        if(! (rectangle instanceof Geometry.rectangle)) {
            console.error('Trying to draw a non-rectangle object');
            return;
        }
        var pos1 = get_real_pos(rectangle.left, rectangle.top);
        var pos2 = get_real_pos(rectangle.width, rectangle.height, [0, 0]);
        render.fillRect(pos1.x, pos1.y, pos2.x, pos2.y);
    };
    alias.strokeRect = function(rectangle) {
        if(! (rectangle instanceof Geometry.rectangle)) {
            console.error('Trying to draw a non-rectangle object');
            return;
        }
        var pos1 = get_real_pos(rectangle.left, rectangle.top);
        var pos2 = get_real_pos(rectangle.width, rectangle.height, [0, 0]);
        render.strokeRect(pos1.x, pos1.y, pos2.x, pos2.y);
    };
    alias.drawRect = function(rectangle) {
        alias.fillRect(rectangle);
        alias.strokeRect(rectangle);
    }
    alias.fillCircle = function(circle) {
        if(! (circle instanceof Geometry.circle)) {
            console.error('Trying to draw a non-circle object');
            return;
        }
        var pos = get_real_pos(circle.left, circle.top);
        render.beginPath();
        render.arc(pos.x, pos.y, circle.radius * options.grid.width, 0, Math.PI*2);
        render.fill();
    }
    alias.strokeCircle = function(circle) {
        if(! (circle instanceof Geometry.circle)) {
            console.error('Trying to draw a non-circle object');
            return;
        }
        var pos = get_real_pos(circle.left, circle.top);
        render.beginPath();
        render.arc(pos.x, pos.y, circle.radius * options.grid.width, 0, Math.PI*2);
        render.stroke();
    }
    alias.drawCircle = function(circle) {
        alias.fillCircle(circle);
        alias.strokeCircle(circle);
    }
    alias.drawLine = function(x1, y1, x2, y2) {
        render.beginPath();

        var pos1 = get_real_pos(x1, y1);
        var pos2 = get_real_pos(x2, y2);

        render.moveTo(pos1.x, pos1.y);
        render.lineTo(pos2.x, pos2.y);

        render.stroke();
    }
    alias.drawLinePart = function(x1, y1, x2, y2, size) {
        var angle = Geometry.direction(x1, y1, x2, y2);
        var posx = size * Math.cos(angle);
        var posy = size * Math.sin(angle);
        alias.drawLine(x1, y1, x1 + posx, y1 + posy);
    }

    callback(alias, Geometry);
};