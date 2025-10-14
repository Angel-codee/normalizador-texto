const fs = require('fs');
// Importamos el nuevo paquete
const diacritics = require('diacritics');
const textoEntrada = fs.readFileSync('entrada.txt', 'utf-8');
// Aplicamos ambas transformaciones en cadena
const textoNormalizado =
diacritics.remove(textoEntrada.toLowerCase());
console.log('Texto normalizado (sin tildes y en minúsculas):');
console.log(textoNormalizado);
// Guardamos el texto normalizado en un nuevo archivo llamado
'salida.txt'
fs.writeFileSync('salida.txt', textoNormalizado);
console.log('\n¡ El texto modificado se ha guardado en “salida.txt”');