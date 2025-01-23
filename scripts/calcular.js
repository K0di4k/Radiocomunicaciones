function calcular() {

    const resultados = {
        V: document.getElementById('voltaje-result'),
        I: document.getElementById('corriente-result'),
        R: document.getElementById('resistencia-result'),
        P: document.getElementById('potencia-result')
    };


    Object.values(resultados).forEach(el => {
        el.classList.add('d-none');
        el.querySelector('span').textContent = '-';
    });


    const V = parseFloat(document.getElementById('voltaje').value.replace(',', '.')) || null;
    const I = parseFloat(document.getElementById('corriente').value.replace(',', '.')) || null;
    const R = parseFloat(document.getElementById('resistencia').value.replace(',', '.')) || null;
    const P = parseFloat(document.getElementById('potencia').value.replace(',', '.')) || null;


    const valoresProporcionados = [];
    if (V !== null) valoresProporcionados.push('V');
    if (I !== null) valoresProporcionados.push('I');
    if (R !== null) valoresProporcionados.push('R');
    if (P !== null) valoresProporcionados.push('P');


    if (valoresProporcionados.length < 2) {
        resultados.V.classList.remove('d-none');
        resultados.V.querySelector('span').textContent = 'Error: Ingresa al menos 2 valores';
        return;
    }


    let calculadoV, calculadoI, calculadoR, calculadoP;


    if (V !== null && I !== null) {
        calculadoR = V / I;
        calculadoP = V * I;
    } else if (V !== null && R !== null) {
        calculadoI = V / R;
        calculadoP = (V ** 2) / R;
    } else if (I !== null && R !== null) {
        calculadoV = I * R;
        calculadoP = (I ** 2) * R;
    } else if (V !== null && P !== null) {
        calculadoI = P / V;
        calculadoR = (V ** 2) / P;
    } else if (I !== null && P !== null) {
        calculadoV = P / I;
        calculadoR = P / (I ** 2);
    } else if (R !== null && P !== null) {
        calculadoV = Math.sqrt(P * R);
        calculadoI = Math.sqrt(P / R);
    }


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

    document.querySelectorAll('input[type="number"]').forEach(input => input.value = '');


    document.querySelectorAll('[id$="-result"]').forEach(result => {
        result.classList.add('d-none');
        result.querySelector('span').textContent = '-';
    });
}