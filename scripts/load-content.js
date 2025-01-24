document.getElementById('menu-voltajes').addEventListener('click', function(event) {
    event.preventDefault(); 
    
    
    fetch('../modulos/voltajes.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar el archivo');
        }
        return response.text();
      })
      .then(html => {
        document.getElementById('botones').innerHTML = html;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });