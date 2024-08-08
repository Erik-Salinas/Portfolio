
const d = document;

function contactForm() {
    const form = d.querySelector(".contact__form"), //* <form>
        //* Seleccionando todos los elementos del formulario que tengan el atributo 'required'
        inputs = d.querySelectorAll(".contact__form [required]");

    // console.log(inputs);

    //* Recorriendo inputs del formulario.
    inputs.forEach(input => {
        const span = d.createElement("span"); //* Creando etiqueta <span>
        //* Agregando id a cada <span> con el valor del atributo 'name' de los inputs
        span.id = input.name;
        //* Agregando el valor del atributo 'title' como contenido de texto a los <span>
        span.textContent = input.title;
        //* Agregando a cada <span> la clase '.contact-form-error' y la clase '.none'
        span.classList.add("contact-form-error", "none");
        //* Agregando cada <span> como hermano siguiente de cada input
        input.insertAdjacentElement("afterend", span);

    });

    //? Evento 'keyup' se activa al soltar una tecla
    d.addEventListener("keyup", e => {
        if (e.target.matches(".contact__form [required]")) { //* Al escribir en un input...
            let input = e.target, //* Guardando elemento que genera el evento
                //* Guardando valor del atributo 'pattern' o el 'data-pattern' creado en el <texarea>
                pattern = input.pattern || input.dataset.pattern;
            // console.log(input,pattern);

            //* Si los inputs tienen expresiones regulares y los inputs no estan vacios...
            if (pattern && input.value !== "") {
                // console.log("El input tiene patron");
                let regex = new RegExp(pattern); //* Guardando expresion regular de los inputs
                //* Si no existe una coincidencia del RegExp y el texto ingresado
                return !regex.exec(input.value)
                    //* Se agrega id con el valor del 'name' de los inputs y se agrega la clase .is-active
                    ? d.getElementById(input.name).classList.add("is-active")
                    //*Se agrega id con el valor del 'name' de los inputs y se elimina la clase .is-active
                    : d.getElementById(input.name).classList.remove("is-active");
            }


            if (!pattern) { //* Si los inputs no tienen expresiones regulares...
                // console.log("El input no tiene patron");
                return input.value === "" //* Si los inputs estan vacios
                    //* Se agrega id con el valor del 'name' de los inputs y se agrega la clase .is-active
                    ? d.getElementById(input.name).classList.add("is-active")
                    //* Se agrega id con el valor del 'name' de los inputs y se elimina la clase .is-active
                    : d.getElementById(input.name).classList.remove("is-active");

            }
        }
    });

    //? Evento 'submit' para enviar formulario
    d.addEventListener("submit", e => {
        //*Quitando evento por defecto del submit que lo que hace es enviar datos a un servidor
        e.preventDefault();
        const loader = d.querySelector(".contact__form-group--loader"), //* <div> loader
        response = d.querySelector(".contact__form-response ");//* <div> mensaje al enviar formulario
        loader.classList.remove("none"); //* Eliminando clase .none al loader

        fetch("https://formsubmit.co/ajax/salinas.erik2002@gmail.com", {
            method: "POST", //* Enviando formulario por el método POST
            //*El objeto FormData envía el formulario(el elemento que origina el evento) al servidor(la API),
            //*es importante que todas las cajas de texto tengan l atributo 'name' ya que FormData los parsea.
            body: new FormData(e.target)
        })



            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(json => {
                console.log(json);
                loader.classList.add('none'); //* Agregando clase .none al loader
                response.classList.remove("none"); //* Eliminando clase .none al mensaje de formulario enviado
                //* 'json.message' es un mensaje que tiene la API 'formsubmit'
                response.innerHTML = `<p class="message">Mensaje enviado</p>`;
                //* Limpiando formulario, reset() lo que hace es quitar el texto escrito en el formulario
                form.reset();
            })
            .catch(err => {
                console.log(err);
                let message = err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
                response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
            })
            .finally(() => {
                //*Se esperan 15s más para que se ejecute este setTimeout() haciendo que se agregue la clase
                //*.none al mensaje del formulario enviando.
                setTimeout(() => {
                    response.classList.add("none");
                }, 30000);
            });
    });
}

//? Al cargar el documento se ejecuta todo
d.addEventListener('DOMContentLoaded', contactForm);