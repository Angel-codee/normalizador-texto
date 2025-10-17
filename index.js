
const fs = require('fs');
const diacritics = require('diacritics');
const axios = require('axios'); // Nueva importación
// Función principal asíncrona
async function procesarTexto() {
try {
// 1. Leer y normalizar el texto (lógica que ya tenías)

const textoEntrada = fs.readFileSync('entrada.txt', 'utf-8');

const textoNormalizado =
diacritics.remove(textoEntrada.toLowerCase());
console.log('Texto normalizado:', textoNormalizado);
// 2. Preparar los datos para enviar a la API
const datosParaAPI = {
title: 'Texto desde script Node.js',
body: textoNormalizado,
userId: 1, // Un dato de ejemplo
};
// 3. Realizar la petición HTTP POST a una API de prueba
console.log('\nEnviando texto a la API de prueba...');
const respuestaAPI = await
axios.post('https://jsonplaceholder.typicode.com/posts',
datosParaAPI);
// 4. Mostrar la respuesta de la API en la consola
console.log('¡Respuesta recibida de la API!');
console.log('Status:', respuestaAPI.status);
console.log('Datos devueltos:', respuestaAPI.data);
} catch (error) {
console.error('Ha ocurrido un error:', error.message);
}
}
// Ejecutar la función principal
procesarTexto();