/*
 Autor: Daniel Felipe García Gómez. (Bygdle, NiuWeb)
        www.bygdle.xyz
        
 Scripts que facilitan la repetición de operaciones.
*/
function repeat(n, callback) {
	//Repite un callback n veces, mientras callback no devuelva nada.
	//De lo contrario, la función devolverá lo que callback devuelva.
	//Pasa a callback el número de iteración actual (de 0 a n-1)

	if(!n || typeof(callback) !== 'function')
		return;

	var i = 0;
		n = Math.abs(n);

	while(i < n) {
		var result = callback(i);
		if(result !== undefined)
			return result;
	}
}

function array_copy_amount(array, value_or_callback) {
	//Crea una copia de un arreglo con cada valor repetido
	//una cantidad determinada de veces.
	//el parámetro `value_or_callback` puede ser un número
	//o una función, en cuyo caso se ejecutará y se tomará en
	//cuenta el resultado de ésta; también se le pasarán
	//dos parámetros: el valor actual y el índice del valor.

	var result = [];
	for(var i = 0; i < array.length; i++) {

		var val = array[i];
		var am = 0;
		if(typeof(value_or_callback) == 'function')
			am = value_or_callback(val, i);
		else if(typeof(value_or_callback) == 'number')
			am = value_or_callback;

		var j = 0;
		while(j < am) {
			result.push(val);
			j++;
		}

	}
	return result;

}
function foreach(object, callback) {
	//Ejecuta un callback por cada índice del arreglo (o propiedad del objeto)
	//dado.
	//Si object es un arreglo, pasa al callback el índice actual y el valor de dicho índice.
	//Si object es un objeto, pasa al callback el número de la propiedad actual, el nombre
	//y el valor de ésta.
	if(object.__proto__.constructor == Array) {

		for(var i = 0; i < object.length; i++)
			callback(i, object[i]);

	}
	else if(object.__proto__.constructor == Object) {
		var n = 0;
		for(var i in object) {
			callback(n, i, object[i]);
			n++;
		}
	}
}