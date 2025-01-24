document.addEventListener('DOMContentLoaded', () => {
    // Cargar header
    fetch('./modulos/voltajes.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('botones').innerHTML = html;
        });

    // Cargar footer
    fetch('./modulos/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar').innerHTML = html;
        });
});