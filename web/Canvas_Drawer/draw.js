var canvas = document.createElement('canvas');
	canvas.width = 736;
	canvas.height = 560;
document.body.appendChild(canvas);

var time = 0;
window.setInterval(function(){
	CanvasDrawer(function(render, geometry) {

		/*
		Colisión círculo-rectángulo:
			render.clear();
			render.lineWidth(2);

			var p1 = [9, 6];
			var p2 = [13, 3];
			var rect = new geometry.rectangle( p1[0], p1[1], 5, 3 );

			render.setStyle('blue', 'rgba(0, 0, 255, 0.1)');
			render.drawRect(rect);

			var ang = (time/50) % 360;
			var dist = 8- Math.min(8, time/80);

			var vx = Math.cos(ang) * dist;
			var vy = Math.sin(ang) * dist;

			var cx = p1[0] + 2.5;
			var cy = p1[1] + 1.5;

			var circ = new geometry.circle(cx + vx, cy + vy, 1.5);

			render.setStyle('green', 'rgba(0, 255, 0, 0.1)');
			render.drawCircle(circ);


			var limitx = clamp( cx + vx, p1[0], p1[0] + 5 );
			var limity = clamp(cy + vy, p1[1], p1[1] + 3);


			render.strokeStyle('gray');
			render.drawLine(cx + vx, cy + vy, limitx, limity);

			render.strokeStyle('red');
			render.drawLinePart(cx + vx, cy + vy, limitx, limity, 1.5 );


			render.fillStyle('black');
			render.render.font = '20px Calibri';

			var dist = geometry.distance(cx + vx, cy + vy, limitx, limity);

			if(dist >= 1.5) {
				render.render.fillText('Distancia al borde del rectángulo: ' + dist, 64, 64);
				render.render.fillText('Distancia del borde del círculo al borde del rectángulo: ' + (dist - 1.5), 64, 96);
			}
			render.render.fillText(dist < 1.5 ? '¡Hay colisión!': 'No hay colisión', 64, 128);
		*/

		/*
		Colisión círculo-punto:
			render.clear();
			render.lineWidth(2);

			var circ = new geometry.circle( 12, 12, 3 );


			var pp = [16, 4];
			var angle = geometry.direction(pp[0], pp[1], circ.left, circ.top);

			var point = new geometry.circle(pp[0] + Math.cos(angle)*time/20, pp[1] + Math.sin(angle)*time/20, 0.13);


			if(!circ.collision_point(point.left, point.top))
				render.setStyle('green', 'rgba(0, 255, 0, 0.1)');
			else
				render.setStyle('gold', 'rgba(255, 255, 0, 0.1)');
			render.drawCircle(circ);


			render.strokeStyle('gray');
			render.drawLine( circ.left, circ.top, point.left, point.top );

			render.strokeStyle('red');
			render.drawLinePart( circ.left, circ.top, point.left, point.top, circ.radius );


			render.setStyle('black', 'blue');
			render.drawCircle(point);
		*/
		/*
		Colisión rectángulo-punto:
			render.clear();

			var punto = new geometry.circle(time/20, time/20, 0.13);
			var rect = new geometry.rectangle(4, 5, 5, 3);

			if(!rect.collision_point(punto.left, punto.top))
				render.setStyle('red', 'rgba(255, 0, 0, 0.1)');
			else
				render.setStyle('orange', 'rgba(255, 255, 0, 0.1)');
			render.drawRect(rect);

			render.strokeStyle('gray');
			render.drawLine( 0, punto.top, punto.left, punto.top );
			render.drawLine( punto.left, 0, punto.left, punto.top );

			render.fillStyle('blue');
			render.drawCircle(punto);
		*/
		render.clear();
		render.lineWidth(2);

		var circ1 = new geometry.circle(2 + time/20, 13 - time/20, 1.25);
		var circ2 = new geometry.circle(13 - time/20, 2 + time/20, 1.25);


		render.strokeStyle('gray');
		render.drawLine(circ1.left, circ1.top, circ2.left, circ2.top);

		if(!circ1.collision_circle(circ2))
			render.setStyle('green', 'rgba(0, 255, 0, 0.1)');
		else
			render.setStyle('orange', 'rgba(255, 255, 0, 0.1)');

		render.drawCircle(circ1);
		render.drawCircle(circ2);

		render.strokeStyle('red');
		render.drawLinePart(circ1.left, circ1.top, circ2.left, circ2.top, circ1.radius);
		render.drawLinePart(circ2.left, circ2.top, circ1.left, circ1.top, circ1.radius);

	}, canvas, {grid: {width: 32, height: 32}});
	time++;
}, 1000/24);


function clamp(val, min, max) {
	return Math.max(min, Math.min(max, val));
}