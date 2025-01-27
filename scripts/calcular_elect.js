// scripts/calcular_elect.js
function initCalculadoraElectrica() {
    // Obtener elementos del DOM
    const voltajeInput = document.getElementById('voltaje');
    const corrienteInput = document.getElementById('corriente');
    const resistenciaInput = document.getElementById('resistencia');
    const potenciaInput = document.getElementById('potencia');
    const btnCalcular = document.getElementById('btn-calcular');
    const btnReiniciar = document.getElementById('btn-reiniciar');
    const resultados = document.querySelectorAll('#resultado [id$="-result"]');
    const resultadosContainer = document.querySelector('#resultado .d-grid');

    // Verificar que todos los elementos existen
    if (!voltajeInput || !corrienteInput || !resistenciaInput || !potenciaInput || !btnCalcular || !btnReiniciar) {
        console.error('Error: Faltan elementos esenciales en el DOM');
        return;
    }

    // Función para mostrar resultados
    const mostrarResultado = (id, valor) => {
        const elemento = document.getElementById(id);
        if (!elemento) return;
        elemento.querySelector('span').textContent = valor;
        elemento.classList.remove('d-none');
    };

    // Función para mostrar errores
    const mostrarError = (mensaje) => {
        let errorElement = document.getElementById('error-result');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = 'error-result';
            errorElement.className = 'alert alert-danger mb-0 py-2 d-none';
            errorElement.innerHTML = `<span class="fw-bold">${mensaje}</span>`;
            resultadosContainer.prepend(errorElement);
        }
        
        errorElement.querySelector('span').textContent = mensaje;
        errorElement.classList.remove('d-none');
    };

    // Función principal de cálculo
    const calcularValores = () => {
        // Ocultar resultados y errores previos
        resultados.forEach(resultado => resultado.classList.add('d-none'));
        document.getElementById('error-result')?.classList.add('d-none');

        // Obtener valores numéricos
        const V = parseFloat(voltajeInput.value);
        const I = parseFloat(corrienteInput.value);
        const R = parseFloat(resistenciaInput.value);
        const P = parseFloat(potenciaInput.value);

        // Validar cantidad de valores ingresados
        const valoresIngresados = [V, I, R, P].filter(v => !isNaN(v)).length;
        if (valoresIngresados !== 2) {
            mostrarError('Debes ingresar exactamente 2 valores');
            return;
        }

        // Objeto para guardar cálculos
        let calculado = {};

        try {
            // Todas combinaciones posibles de la Ley de Ohm y Potencia
            if (!isNaN(V) && !isNaN(I)) {
                calculado.R = V / I;
                calculado.P = V * I;
            } else if (!isNaN(V) && !isNaN(R)) {
                calculado.I = V / R;
                calculado.P = (V ** 2) / R;
            } else if (!isNaN(V) && !isNaN(P)) {
                calculado.I = P / V;
                calculado.R = (V ** 2) / P;
            } else if (!isNaN(I) && !isNaN(R)) {
                calculado.V = I * R;
                calculado.P = (I ** 2) * R;
            } else if (!isNaN(I) && !isNaN(P)) {
                calculado.V = P / I;
                calculado.R = P / (I ** 2);
            } else if (!isNaN(R) && !isNaN(P)) {
                calculado.V = Math.sqrt(P * R);
                calculado.I = Math.sqrt(P / R);
            }
        } catch (error) {
            console.error('Error en cálculo:', error);
            mostrarError('Error matemático: Verifica los valores ingresados');
            return;
        }

        // Actualizar campos y resultados
        const actualizarCampo = (input, valor) => {
            if (!valor || isNaN(valor)) return;
            input.value = valor.toFixed(2);
        };

        actualizarCampo(voltajeInput, calculado.V);
        actualizarCampo(corrienteInput, calculado.I);
        actualizarCampo(resistenciaInput, calculado.R);
        actualizarCampo(potenciaInput, calculado.P);

        // Mostrar resultados
        mostrarResultado('voltaje-result', `${voltajeInput.value} V`);
        mostrarResultado('corriente-result', `${corrienteInput.value} A`);
        mostrarResultado('resistencia-result', `${resistenciaInput.value} Ω`);
        mostrarResultado('potencia-result', `${potenciaInput.value} W`);
    };

    // Función de reinicio
    const reiniciarCampos = () => {
        [voltajeInput, corrienteInput, resistenciaInput, potenciaInput].forEach(input => {
            input.value = '';
        });
        resultados.forEach(resultado => {
            resultado.classList.add('d-none');
            resultado.querySelector('span').textContent = '-';
        });
        document.getElementById('error-result')?.classList.add('d-none');
    };

    // Event listeners
    btnCalcular.addEventListener('click', calcularValores);
    btnReiniciar.addEventListener('click', reiniciarCampos);
}

// Inicializar inmediatamente al cargar el script
initCalculadoraElectrica();