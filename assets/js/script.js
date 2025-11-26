const productos = [
    { id: 1, nombre: "Manzana Roja kg", precio: 1600, descripcion: "Manzanas rojas frescas y crujientes, perfectas para comer directamente o preparar postres.", Imagen: "https://res.cloudinary.com/dqzwqkgzr/image/upload/v1703095938/FoodSys/Frutas/MAZR-I_j1kdmt.png"},
    { id: 2, nombre: "Frutilla kg", precio: 1500, descripcion: "Frutillas jugosas y dulces, ideales para batidos, postres o disfrutar al natural.", Imagen: "https://res.cloudinary.com/dqzwqkgzr/image/upload/v1703095931/FoodSys/Frutas/FRUP-50_a7rgoy.png"},
    { id: 3, nombre: "Durazno kg", precio: 1600, descripcion: "Duraznos maduros y aromáticos, perfectos para ensaladas de frutas o mermeladas caseras.", Imagen: "https://res.cloudinary.com/dqzwqkgzr/image/upload/v1703095934/FoodSys/Frutas/DUP-I_uaitms.png"},
    { id: 4, nombre: "Mango kg", precio: 3500, descripcion: "Mangos tropicales de pulpa dulce y jugosa, excelentes para jugos o comer frescos.", Imagen: "https://res.cloudinary.com/dqzwqkgzr/image/upload/v1703095926/FoodSys/Frutas/MAN-I_s9ysad.png"},
    { id: 5, nombre: "Palta Hass Chilena kg", precio: 3990, descripcion: "Paltas Hass cremosas de excelente calidad, perfectas para completos o tostadas.", Imagen: "https://res.cloudinary.com/dqzwqkgzr/image/upload/v1703095929/FoodSys/Frutas/PALHP-I_sidoqs.png"},
    { id: 6, nombre: "Cebolla Morada kg", precio: 1100, descripcion: "Cebollas moradas frescas, ideales para ensaladas, salsas y preparaciones crudas.", Imagen: "https://res.cloudinary.com/dqzwqkgzr/image/upload/v1703095924/FoodSys/Verduras/CBM-I_pr61jl.png"},
    { id: 7, nombre: "Papa lavada kg", precio: 700, descripcion: "Papas lavadas listas para cocinar, versátiles para purés, papas fritas o guisos.", Imagen: "https://res.cloudinary.com/dqzwqkgzr/image/upload/v1703095898/FoodSys/Verduras/PPSE-I_mbrmwz.jpg"},
    { id: 8, nombre: "Tomate larga vida kg", precio: 1300, descripcion: "Tomates firmes y duraderos, perfectos para ensaladas, salsas o consumo diario.", Imagen: "https://res.cloudinary.com/dqzwqkgzr/image/upload/v1703095935/FoodSys/Verduras/TOP-I_e5ffoj.png"},
    { id: 9, nombre: "Lechuga escarola un", precio: 400, descripcion: "Lechuga escarola fresca y crujiente, ideal para ensaladas saludables y nutritivas.", Imagen: "https://res.cloudinary.com/dqzwqkgzr/image/upload/v1703095945/FoodSys/Verduras/LEC%C3%91V-1U_lnhgvj.png"},
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contenedorProductos = document.getElementById("contenedor-productos");
const carritoItemsDiv = document.getElementById("carrito-items");
const carritoTotalSpan = document.getElementById("carrito-total");
const carritoBadge = document.getElementById("carrito-badge");

function mostrarProductos() {
    productos.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("col-12", "col-md-4", "mb-4");

        productoDiv.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="position-relative">
                    <img src="${producto.Imagen}" class="card-img-top" alt="${producto.nombre}">
                    <a href="assets/pages/descripcion.html?id=${producto.id}" class="btn btn-sm btn-success position-absolute top-0 end-0 m-2">
                        Ver más
                    </a>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-center">${producto.nombre}</h5>
                    <p class="card-text text-center text-success fw-bold">$${producto.precio.toLocaleString('es-CL')}</p>
                    <div class="text-center mb-3">
                        <label for="cantidad-${producto.id}" class="form-label">Cantidad:</label>
                        <input type="number" id="cantidad-${producto.id}" class="form-control w-50 mx-auto text-center" value="1" min="1">
                    </div>
                    <button class="btn btn-success mt-auto" onclick="agregarAlCarrito(${producto.id})">
                        <i class="bi bi-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>
            </div>
        `;

        contenedorProductos.appendChild(productoDiv);
    });
}

function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);

    // Intentar obtener la cantidad desde el input específico del producto o desde descripción
    let cantidad = 1;
    const cantidadInput = document.getElementById(`cantidad-${productoId}`) || document.getElementById('cantidad-producto');
    if (cantidadInput) {
        cantidad = parseInt(cantidadInput.value);
    }

    const itemExistente = carrito.find(item => item.id === productoId);

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.Imagen,
            cantidad: cantidad
        });
    }

    guardarCarrito();
    actualizarCarrito();
    mostrarAlerta(cantidad, producto.nombre);

    // Resetear el input de cantidad si existe
    if (document.getElementById(`cantidad-${productoId}`)) {
        document.getElementById(`cantidad-${productoId}`).value = 1;
    }
}

function mostrarAlerta(cantidad, nombreProducto) {
    let unidadTexto = '';

    if (nombreProducto.toLowerCase().includes(' kg')) {
        unidadTexto = 'kg de';
    } else if (nombreProducto.toLowerCase().includes(' un')) {
        unidadTexto = cantidad === 1 ? 'unidad de' : 'unidades de';
    } else {
        unidadTexto = cantidad === 1 ? 'unidad de' : 'unidades de';
    }

    const alertaHTML = `
        <div class="alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3"
             role="alert" style="z-index: 9999; min-width: 300px;">
            <strong>¡Producto agregado!</strong><br>
            Has añadido ${cantidad} ${unidadTexto} ${nombreProducto} al carrito.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', alertaHTML);

    setTimeout(() => {
        const alertas = document.querySelectorAll('.alert');
        alertas.forEach(alerta => {
            alerta.classList.remove('show');
            setTimeout(() => alerta.remove(), 150);
        });
    }, 3000);
}

function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    guardarCarrito();
    actualizarCarrito();
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarCarrito() {
    // Actualizar contenido del carrito si existe el elemento
    if (carritoItemsDiv) {
        if (carrito.length === 0) {
            carritoItemsDiv.innerHTML = '<p class="text-center text-muted py-5">Tu carrito está vacío</p>';
        } else {
            carritoItemsDiv.innerHTML = carrito.map(item => `
                <div class="carrito-item d-flex align-items-center justify-content-between">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="flex-grow-1 ms-3">
                        <h6 class="mb-0">${item.nombre}</h6>
                        <small class="text-muted">Cantidad: ${item.cantidad}</small>
                        <p class="text-success mb-0 fw-bold">$${(item.precio * item.cantidad).toLocaleString('es-CL')}</p>
                    </div>
                    <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `).join('');
        }
    }

    // Actualizar total si existe el elemento
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    if (carritoTotalSpan) {
        carritoTotalSpan.textContent = `$${total.toLocaleString('es-CL')}`;
    }

    // Actualizar badge si existe el elemento
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    if (carritoBadge) {
        carritoBadge.textContent = totalItems;
    }
}

function vaciarCarrito() {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
        carrito = [];
        guardarCarrito();
        actualizarCarrito();
    }
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    alert(`¡Gracias por tu compra!\n\nTotal: $${total.toLocaleString('es-CL')}`);

    carrito = [];
    guardarCarrito();
    actualizarCarrito();

    bootstrap.Offcanvas.getInstance(document.getElementById('carritoOffcanvas')).hide();
}

// Inicializar eventos solo si existen los botones
if (document.getElementById('btn-vaciar')) {
    document.getElementById('btn-vaciar').addEventListener('click', vaciarCarrito);
}
if (document.getElementById('btn-finalizar')) {
    document.getElementById('btn-finalizar').addEventListener('click', finalizarCompra);
}

// Mostrar productos solo si existe el contenedor
if (contenedorProductos) {
    mostrarProductos();
}

// Actualizar carrito siempre
actualizarCarrito();