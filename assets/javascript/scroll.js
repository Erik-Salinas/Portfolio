let lastScrollTop = 0; // Guardar el último valor del scroll para comparar

window.addEventListener('scroll', function() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
     // `window.scrollY valor de desplazamiento vertical 
    // `document.documentElement.scrollTop`alternativa para  el desplazamiento.
    let projectCards = document.querySelectorAll('.project__card');

    if (scrollTop > lastScrollTop) {
        // Scroll hacia abajo
        projectCards.forEach(card => {
            card.classList.add('scroll-down'); // Añadir la clase
        });
    } else {
        // Scroll hacia arriba
        projectCards.forEach(card => {
            card.classList.remove('scroll-down'); // Eliminar la clase
        });
    }

    lastScrollTop = scrollTop; // Actualizar el último valor del scroll
});
