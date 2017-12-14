/*
 Autor: Daniel Felipe García Gómez. (Bygdle, NiuWeb)
        www.bygdle.xyz
        
 Este script es una alternativa mejorada del operador typeof, 
 pues toma en cuenta todos los tipos de dato que hay (NaN, Infinity, Array, storage, etc.) y
 no sólo los más ámplios (null, undefined, number, string, boolean, object, function).
*/
function TypeOf( value ) {

    switch(value) {
        case null:
            return 'null';
        break;
        case undefined:
            return 'undefined';
        break;

        default:
            var string = value.__proto__.constructor.toString();
            var type;

            string.replace(/^function (\w+)\(\)/i, function() {
                type = arguments[1].toLowerCase();
            });

            if(type == 'number') {
                if(isNaN(value))
                    return 'NaN';
                else if(!isFinite(value))
                    return 'Infinity';
            }

            return type;
        break;
    }

}