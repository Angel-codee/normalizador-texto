const fs = require('fs');
const axios = require('axios');
// La dirección de nuestra API de Ollama local
const OLLAMA_API_URL = 'http://localhost:11434/api/generate';
// Función principal asíncrona
async function parafrasearTexto() {
try {
// 1. Leer el texto original a parafrasear
const textoOriginal = fs.readFileSync('entrada.txt', 'utf-8');
console.log(`Original: "${textoOriginal}"`);
// 2. ¡LA CLAVE! Construir un prompt de "instrucción"
const promptCompleto = `
Actúa como un escritor experto.
Paráfrasea el siguiente texto, manteniendo el significado original pero usando palabras y estructuras
de oración diferentes.
No añadas ninguna explicación o comentario introductorio. Solo entrega el texto parafraseado.
TEXTO A PARAFRASEAR:
"${textoOriginal}"
`;
// 3. Preparar el cuerpo (payload) para la API
const datosParaAPI = {
model: "mistral",
prompt: promptCompleto, // ¡Usamos nuestro nuevo prompt!
stream: false
};
// 4. Realizar la petición (el resto del código es igual)
console.log('Parafraseando texto (esto puede tardar)...');
const respuestaAPI = await axios.post(OLLAMA_API_URL, datosParaAPI);
// 5. Extraer y guardar la respuesta
const textoParafraseado = respuestaAPI.data.response.trim(); // .trim() quita espacios extra
fs.writeFileSync('salida.txt', textoParafraseado);
console.log('¡Éxito! Texto parafraseado guardado en "salida.txt"');
console.log('Respuesta:', textoParafraseado);
} catch (error) {
console.error(' Ha ocurrido un error:');
if (error.code === 'ECONNREFUSED') {
console.error('Error: No se pudo conectar. ¿Está Ollama corriendo?');
} else {
console.error(error.message);
}
}
}
// No olvides llamar a la nueva función
parafrasearTexto();