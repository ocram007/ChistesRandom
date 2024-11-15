document.addEventListener('DOMContentLoaded', function () {
    const texto = document.getElementById('chiste');
    const boton = document.getElementById('generar-chiste');
    const spinner = document.getElementById('spinner');

    function chistes() {
        texto.textContent = 'Cargando...';
        spinner.style.display = 'inline-block';
        boton.disabled = true;



        fetch('https://v2.jokeapi.dev/joke/Any?lang=es&safe-mode')
            .then(response => response.json())
            .then(data => {
                if (data.type === 'single') {
                    texto.textContent = data.joke;
                } else if (data.type === 'twopart') {
                    texto.textContent = `${data.setup} - ${data.delivery}`;
                }
            })
            .catch(error => {
                texto.textContent = 'Error al obtener el chiste.';
                console.error('Error del fetch:', error);
            })
            .then(() => {
                spinner.style.display = 'none';
                boton.disabled = false;
            });
    }
    boton.addEventListener('click', chistes);
});
