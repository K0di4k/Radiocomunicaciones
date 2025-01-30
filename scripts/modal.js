document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.clickable-image');

    images.forEach(img => {
        img.addEventListener('click', async (e) => {
            // Cargar modal desde modal.html
            const modalContent = await fetch('modal.html').then(response => response.text());
            document.body.insertAdjacentHTML('beforeend', modalContent);

            // Obtener datos de la imagen clickeada
            const img1 = e.target.dataset.img1; // Ruta de la primera imagen adicional
            const img2 = e.target.dataset.img2; // Ruta de la segunda imagen adicional
            const regionName = e.target.closest('.frame').querySelector('.name').textContent; // Nombre de la región
            const caption1 = e.target.dataset.caption1; // Texto descriptivo para la primera imagen
            const caption2 = e.target.dataset.caption2; // Texto descriptivo para la segunda imagen

            // Actualizar el modal con los datos obtenidos
            const modalImage1 = document.getElementById('modal-image1');
            const modalImage2 = document.getElementById('modal-image2');
            const modalName = document.getElementById('region-name');
            const captionElement1 = document.getElementById('caption1'); // Elemento para el texto de la primera imagen
            const captionElement2 = document.getElementById('caption2'); // Elemento para el texto de la segunda imagen

            if (modalImage1 && modalImage2 && modalName && captionElement1 && captionElement2) {
                modalImage1.src = img1; // Asignar la primera imagen adicional
                modalImage2.src = img2; // Asignar la segunda imagen adicional
                modalName.textContent = regionName; // Asignar el nombre de la región
                captionElement1.textContent = caption1; // Asignar el texto descriptivo de la primera imagen
                captionElement2.textContent = caption2; // Asignar el texto descriptivo de la segunda imagen
            }

            // Mostrar el modal
            const modal = new bootstrap.Modal(document.getElementById('imageModal'));
            modal.show();

            // Eliminar el modal del DOM cuando se cierre
            document.getElementById('imageModal').addEventListener('hidden.bs.modal', () => {
                document.getElementById('imageModal').remove();
            });
        });
    });
});