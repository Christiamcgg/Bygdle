/*
 Autor: Daniel Felipe García Gómez. (Bygdle, NiuWeb)
        www.bygdle.xyz
        
 Scripts que facilitan la obtención de datos aleatoriamente
*/
function random(n) {
	//Devuelve un número real aleatorio entre 0 y n (éste nunca será generado).
	return Math.random() * n;
}
function irandom(n) {
	//Devuelve un número ENTERO aleatorio entre 0 y n (éste podrá generarse).
	return Math.floor( Math.random() * (n + 1) );
}
function choose() {
	//Devuelve cualquiera de los parámetros datos (no hay un límite para éstos)
	return arguments[  Math.floor(Math.random() * arguments.length)  ];
}
function shuffle(array) {
	//Desordena un arreglo aleatoriamente
	var shuffled = [];
	while(array.length) {

		var i = Math.floor( Math.random() * array.length );
		shuffled.push(array[i]);
		array.splice(i, 1);

	}
	for(var i = 0; i < shuffled.length; i++)
		array.push(shuffled[i]);
}
function shuffle_values(_array) {
	//Devuelve UNA COPIA desordenada de un arreglo
	array = _array.slice();
	var shuffled = [];
	while(array.length) {

		var i = Math.floor( Math.random() * array.length );
		shuffled.push(array[i]);
		array.splice(i, 1);

	}
	return shuffled;
}