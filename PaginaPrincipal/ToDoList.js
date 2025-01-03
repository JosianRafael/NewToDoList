class listado {
    constructor(titulo, descripcion) {
        this.titulo = titulo;             // Clase principal donde recibimos como constructor el titulo y la descripcion.
        this.descripcion = descripcion;
    }
}

let estado_sin_completar = 'Sin completar';
let estado_completado = 'Completado'; 


class UI {
    addProductList(listados) {
        const product_list = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="flex overflow-x-auto space-x-6 p-4">
                <div
                    class="flex-shrink-0 flex flex-col rounded-lg border border-muted bg-[#f5f5f5] p-6 shadow-sm transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg w-80"
                    data-v0-t="card">
                    <div class="flex flex-col space-y-1.5 p-6">
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-muted-foreground">
                                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                                    <path d="m15 5 4 4"></path>
                                </svg>
                            </div>
                            <h3 class="whitespace-nowrap tracking-tight text-2xl font-semibold text-[#6b46c1]">${listados.titulo}:</h3>
                        </div>
                        <div class="p-6">
                            <p class="text-[#4a5568]">•${listados.descripcion}</p>
                        </div>
                    </div>
                    <a href="#" name="delete" class="text-center inline-block px-4 py-2 bg-red-600 text-white font-semibold text-sm rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                        Eliminar
                    </a>
                    <a id="completed" href="#" name="completed" class="text-center inline-block mt-3 px-4 py-2 bg-gray-600 text-white font-semibold text-sm rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white-500 focus:ring-offset-2">
                     <span id="btn" name="btn"> ${estado_sin_completar} </span>
                    </a>
                </div>
            </div>
        `;
        product_list.appendChild(element);
    }

    resetform(){
        document.getElementById('formulario').reset();
    }

    deleteProductList(element) {
        if (element.name === 'delete') {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esta acción.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminarlo!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    element.parentElement.parentElement.parentElement.remove();
                    Swal.fire(
                        'Eliminado!',
                        'El Task List ha sido eliminado correctamente.',
                        'success'
                    )
                }
            })
        }
    }
};


// Eventos del DOM
document.getElementById('formulario').addEventListener('submit', function(e) {
    Swal.fire({
        title: 'El Task List ha sido agregado correctamente',
        text: "Ahora puedes ver tus tareas.",
        icon: 'success',                          // Biblioteca para usar alertas en JS. (Alerta de confirm).
        confirmButtonColor: '#28a745',
        confirmButtonText: '¡Genial!',
    });
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;

    const listados = new listado(titulo, descripcion); // Creamos una nueva instancia de la clase principal listado.
    
    const ui = new UI(); // Creamos una nueva instancia dela clase Ui o mas bien de la interfaz.
    
    ui.addProductList(listados);
    ui.resetform();
    
   e.preventDefault();  // Evento por predeterminado para evitar el comportamiento del formulario en este caso.
});

document.getElementById('product-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteProductList(e.target);
});


// Escuchar el clic en todo el contenedor donde se generan los elementos dinámicos
document.getElementById('product-list').addEventListener('click', function(e) {
    // Verifica si el clic fue en el enlace con el atributo name="completed"
    if (e.target && e.target.closest('a[name="completed"]')) {
        e.preventDefault(); // Prevenir la acción predeterminada del enlace

        // Encuentra el enlace y el span dentro del botón "completed"
        const completedBtn = e.target.closest('a[name="completed"]');
        const span = completedBtn.querySelector('span[name="btn"]');
        
        if (span.textContent.trim() === estado_sin_completar) {
            span.textContent = estado_completado; // Cambiar el texto a 'Completado'
            completedBtn.classList.remove('bg-gray-600', 'hover:bg-gray-700'); // Remover las clases de color gris
            completedBtn.classList.add('bg-green-600', 'hover:bg-green-700'); // Agregar clases de color verde
            
            // Mostrar alerta de tarea completada
            Swal.fire({
                title: '¡Tarea completada exitosamente!',
                text: 'Ahora tu tarea se muestra como completada.',
                icon: 'success',                         
                confirmButtonColor: '#28a745',
                confirmButtonText: '¡Perfecto!',
            });
        } else {
            span.textContent = estado_sin_completar; // Cambiar de nuevo a 'Sin completar'
            completedBtn.classList.remove('bg-green-600', 'hover:bg-green-700'); // Remover las clases de color verde
            completedBtn.classList.add('bg-gray-600', 'hover:bg-gray-700'); // Agregar clases de color gris

            // Mostrar alerta de tarea en proceso de completarse
            Swal.fire({
                title: '¡La tarea está en proceso de completarse!',
                text: 'Ahora tu tarea volvio a la normalidad',
                icon: 'info',                         
                confirmButtonColor: '#3085d6',
                confirmButtonText: '¡Entendido!',
            });
        }
    }
});



document.getElementById('nombre').addEventListener('click', function(e) {
    let nombre = '';

    while (true) {
        nombre = prompt("Ingrese su nombre de usuario: ");
        
        if (nombre !== null && nombre.trim() !== '') {
            this.innerHTML = nombre;
            Swal.fire({
                title: `¡Bienvenido ${nombre}! Nos alegra que estés aquí.`,
                text: `Haz accedido como ${nombre}, mucha suerte en tus taretas.`,
                icon: 'success',                          // Biblioteca para usar alertas en JS. (Alerta de confirm).
                confirmButtonColor: '#28a745',
                confirmButtonText: '¡Genial!',
            });
            break; // Salir del bucle si se ha ingresado un nombre válido
        } else {
            alert("Error al introducir tu nombre. Por favor introduzca un nombre. Inténtalo de nuevo.");
        }
    }
});













