const fs = require('fs');
const axios = require('axios');
const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

async function generarTexto() {
    let promptTexto;
    try {
        // 1. Lectura del archivo de entrada
        promptTexto = fs.readFileSync('entrada.txt', 'utf-8');
        console.log(`💬 Enviando prompt: "${promptTexto.substring(0, 50)}..."`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('❌ Error: El archivo "entrada.txt" no se encontró. ¡Créalo y añade un prompt!');
        } else {
            console.error('❌ Error al leer el archivo:', error.message);
        }
        return; // Detiene la ejecución si no puede leer el archivo
    }

    try {
        // 2. Preparar el cuerpo (payload)
        const datosParaAPI = {
            model: "mistral",
            prompt: promptTexto,
            stream: false
        };

        // 3. Realizar la petición HTTP POST
        console.log('⏳ Esperando respuesta de Ollama (esto puede tardar)...');
        const respuestaAPI = await axios.post(OLLAMA_API_URL, datosParaAPI);

        // 4. Extraer y guardar la respuesta
        const respuestaTexto = respuestaAPI.data.response;
        fs.writeFileSync('salida.txt', respuestaTexto);

        console.log('✅ ¡Éxito! Respuesta guardada en "salida.txt"');
        console.log('Respuesta:', respuestaTexto);
        
    } catch (error) {
        console.error('❌ Ha ocurrido un error con la API de Ollama:');
        if (error.code === 'ECONNREFUSED') {
            console.error('Error: No se pudo conectar. ¿Está Ollama corriendo en http://localhost:11434?');
        } else if (error.response && error.response.status === 404) {
             console.error('Error 404: El modelo "mistral" puede no estar instalado. Ejecuta "ollama pull mistral"');
        } else {
            console.error(error.message);
        }
    }
}

// Ejecutar la función principal
generarTexto();