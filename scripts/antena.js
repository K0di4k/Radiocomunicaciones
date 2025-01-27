// scripts/antena.js
function initAntena() {
    const frequencySelect = document.getElementById('frequency');
    const customFreqGroup = document.getElementById('customFreqGroup');
    const sectionsSelect = document.getElementById('sections');
    const resultsDiv = document.getElementById('results');
    const btnCalcular = document.getElementById('btn-calcular');
    const btnReiniciar = document.getElementById('btn-reiniciar');
    const tramosContainer = document.getElementById('tramosContainer');

    if (!frequencySelect || !btnCalcular) return;

    // Mostrar/ocultar campos de tramos
    sectionsSelect.addEventListener('change', () => {
        tramosContainer.innerHTML = '';
        if (sectionsSelect.value === '2') {
            tramosContainer.innerHTML = `
                <div class="form-group">
                    <label>Longitud Tramo 1 (metros)</label>
                    <input type="number" step="0.01" id="tramo1" required>
                </div>
                <div class="form-group">
                    <label>Longitud Tramo 2 (metros)</label>
                    <input type="number" step="0.01" id="tramo2" required>
                </div>
            `;
        }
    });

    frequencySelect.addEventListener('change', () => {
        customFreqGroup.style.display = frequencySelect.value === 'other' ? 'block' : 'none';
    });

    btnCalcular.addEventListener('click', () => {
        // Cálculo de longitud de onda completa con factor de velocidad 95%
        const frequency = frequencySelect.value === 'other' 
            ? parseFloat(document.getElementById('customFrequency').value) 
            : parseFloat(frequencySelect.value);

        if (isNaN(frequency) || frequency <= 0) {
            alert('Ingrese una frecuencia válida');
            return;
        }

        const totalWaveLength = (285 / frequency).toFixed(2); // 285 = 300 * 0.95 (onda completa)
        const numSections = parseInt(sectionsSelect.value);
        
        let resultsHTML = `<p>Longitud de onda completa necesaria: ${totalWaveLength} metros</p>`;
        let optimalCut = [];
        let warning = '';

        if (numSections === 2) {
            const tramo1 = parseFloat(document.getElementById('tramo1').value);
            const tramo2 = parseFloat(document.getElementById('tramo2').value);
            
            if ([tramo1, tramo2].some(isNaN)) {
                alert('Ingrese longitudes válidas para los tramos');
                return;
            }

            const totalAvailable = tramo1 + tramo2;
            
            if (totalAvailable < totalWaveLength) {
                // Calcular media onda si no alcanza
                const mediaOnda = (142.5 / frequency).toFixed(2);
                warning = `<p class="warning">¡Longitud insuficiente! Considerar media onda (${mediaOnda} metros)</p>`;
            } else {
                // Optimizar cortes
                const needed = totalWaveLength;
                const bestFit = optimizeCuts(tramo1, tramo2, needed);
                
                optimalCut = [
                    `Tramo 1: ${bestFit[0].toFixed(2)}m (${bestFit[0] > tramo1 ? 'REQUIERE CORTAR' : 'OK'})`,
                    `Tramo 2: ${bestFit[1].toFixed(2)}m (${bestFit[1] > tramo2 ? 'REQUIERE CORTAR' : 'OK'})`
                ];
            }
        } else {
            optimalCut.push(`Longitud única requerida: ${totalWaveLength} metros`);
        }

        // Mostrar resultados
        resultsHTML += optimalCut.map(t => `<p>${t}</p>`).join('');
        resultsDiv.innerHTML = resultsHTML + warning;
        resultsDiv.style.display = 'block';
    });

    btnReiniciar.addEventListener('click', () => {
        document.getElementById('antennaForm').reset();
        customFreqGroup.style.display = 'none';
        resultsDiv.style.display = 'none';
        tramosContainer.innerHTML = '';
    });
}

function optimizeCuts(t1, t2, needed) {
    // Encontrar la combinación más eficiente
    const combinations = [
        [needed, 0],      // Usar solo el primer tramo
        [0, needed],      // Usar solo el segundo tramo
        [t1, needed - t1],// Maximizar uso del primer tramo
        [needed - t2, t2] // Maximizar uso del segundo tramo
    ];
    
    // Filtrar combinaciones válidas y ordenar por eficiencia
    return combinations
        .filter(([a, b]) => a <= t1 && b <= t2 && a >= 0 && b >= 0)
        .sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]))[0] || [t1, t2];
}

initAntena();