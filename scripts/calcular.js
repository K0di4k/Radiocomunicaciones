function calcular() {
    // Obtener elementos de resultados
    const resultados = {
        V: document.getElementById('voltaje-result'),
        I: document.getElementById('corriente-result'),
        R: document.getElementById('resistencia-result'),
        P: document.getElementById('potencia-result')
    };

    // Resetear resultados
    Object.values(resultados).forEach(el => {
        el.classList.add('d-none');
        el.querySelector('span').textContent = '-';
    });

    // Obtener valores de los inputs
    const V = parseFloat(document.getElementById('voltaje').value.replace(',', '.')) || null;
    const I = parseFloat(document.getElementById('corriente').value.replace(',', '.')) || null;
    const R = parseFloat(document.getElementById('resistencia').value.replace(',', '.')) || null;
    const P = parseFloat(document.getElementById('potencia').value.replace(',', '.')) || null;

    // Determinar valores proporcionados
    const valoresProporcionados = [];
    if (V !== null) valoresProporcionados.push('V');
    if (I !== null) valoresProporcionados.push('I');
    if (R !== null) valoresProporcionados.push('R');
    if (P !== null) valoresProporcionados.push('P');

    // Validar entrada
    if (valoresProporcionados.length < 2) {
        resultados.V.classList.remove('d-none');
        resultados.V.querySelector('span').textContent = 'Error: Ingresa al menos 2 valores';
        return;
    }

    // Variables para cálculos
    let calculadoV, calculadoI, calculadoR, calculadoP;

    // Realizar cálculos según las entradas
    if (V !== null && I !== null) {         // V e I
        calculadoR = V / I;
        calculadoP = V * I;
    } else if (V !== null && R !== null) {  // V y R
        calculadoI = V / R;
        calculadoP = (V ** 2) / R;
    } else if (I !== null && R !== null) {  // I y R
        calculadoV = I * R;
        calculadoP = (I ** 2) * R;
    } else if (V !== null && P !== null) {  // V y P
        calculadoI = P / V;
        calculadoR = (V ** 2) / P;
    } else if (I !== null && P !== null) {  // I y P
        calculadoV = P / I;
        calculadoR = P / (I ** 2);
    } else if (R !== null && P !== null) {  // R y P
        calculadoV = Math.sqrt(P * R);
        calculadoI = Math.sqrt(P / R);
    }

    // Mostrar resultados calculados
    if (typeof calculadoV !== 'undefined' && V === null) {
        resultados.V.classList.remove('d-none');
        resultados.V.querySelector('span').textContent = `${calculadoV.toFixed(2)} V`;
    }
    
    if (typeof calculadoI !== 'undefined' && I === null) {
        resultados.I.classList.remove('d-none');
        resultados.I.querySelector('span').textContent = `${calculadoI.toFixed(2)} A`;
    }
    
    if (typeof calculadoR !== 'undefined' && R === null) {
        resultados.R.classList.remove('d-none');
        resultados.R.querySelector('span').textContent = `${calculadoR.toFixed(2)} Ω`;
    }
    
    if (typeof calculadoP !== 'undefined' && P === null) {
        resultados.P.classList.remove('d-none');
        resultados.P.querySelector('span').textContent = `${calculadoP.toFixed(2)} W`;
    }
}

function reiniciar() {
    // Limpiar inputs
    document.querySelectorAll('input[type="number"]').forEach(input => input.value = '');
    
    // Ocultar y resetear resultados
    document.querySelectorAll('[id$="-result"]').forEach(result => {
        result.classList.add('d-none');
        result.querySelector('span').textContent = '-';
    });
}