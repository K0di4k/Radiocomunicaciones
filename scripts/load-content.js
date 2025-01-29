document.addEventListener('DOMContentLoaded', () => {
    // Función para cargar scripts dinámicamente
    const loadScript = (url, callback) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        document.body.appendChild(script);
    };
  
    // Seleccionar la galería
    const gallery = document.querySelector('.gallery');
  
    // Cargar Calculadora Eléctrica
    document.getElementById('menu-voltajes')?.addEventListener('click', () => {
        fetch('./voltajes.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('botones').innerHTML = html;
                document.getElementById('antena').innerHTML = '';
                // Ocultar la galería
                if (gallery) gallery.style.display = 'none';
                // Cargar script DESPUÉS de insertar el HTML
                loadScript('scripts/calcular_elect.js', () => {
                    console.log('Script eléctrico cargado');
                });
            });
    });
  
    // Cargar Calculadora de Antenas
    document.getElementById('menu-antena')?.addEventListener('click', () => {
        fetch('./antena.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('antena').innerHTML = html;
                document.getElementById('botones').innerHTML = '';
                // Ocultar la galería
                if (gallery) gallery.style.display = 'none';
                // Cargar script DESPUÉS de insertar el HTML
                loadScript('scripts/antena.js', () => {
                    console.log('Script de antena cargado');
                });
            });
    });
  
    // Mostrar la galería nuevamente si lo deseas
    // Por ejemplo, al hacer clic en el enlace de "Inicio"
    document.getElementById('#')?.addEventListener('click', () => {
        if (gallery) gallery.style.display = 'block';
    });
  });
  