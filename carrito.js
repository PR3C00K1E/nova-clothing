let carrito = JSON.parse(localStorage.getItem("carritoNOVA")) || [];

actualizarCarrito();


function actualizarCarrito() {

    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");
    const contador = document.getElementById("contador-carrito");

    lista.innerHTML = "";

    let suma = 0;
    let cantidadTotal = 0;


    carrito.forEach((producto, indice) => {

        const subtotal = producto.precio * producto.cantidad;

        suma += subtotal;
        cantidadTotal += producto.cantidad;


        const item = document.createElement("div");

        item.className = "item-carrito";

        item.innerHTML = `
            <div class="info-carrito">

                <strong>${producto.nombre}</strong><br>

                Talla: ${producto.talla}<br>

                Cantidad: ${producto.cantidad}<br>

                Precio: $${producto.precio.toLocaleString("es-CL")}<br>

                <strong>
                    Subtotal: $${subtotal.toLocaleString("es-CL")}
                </strong>

            </div>

            <button
                class="eliminar-carrito"
                onclick="eliminarDelCarrito(${indice})">
                ✕
            </button>
        `;

        lista.appendChild(item);
    });


    if (carrito.length === 0) {

        lista.innerHTML = `
            <p>Tu carrito está vacío.</p>
        `;
    }


    totalElemento.textContent =
        "$" + suma.toLocaleString("es-CL");

    contador.textContent = cantidadTotal;


    localStorage.setItem(
        "carritoNOVA",
        JSON.stringify(carrito)
    );
}


function eliminarDelCarrito(indice) {

    carrito.splice(indice, 1);

    actualizarCarrito();
}


function finalizarPedido() {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío.");

        return;
    }


    let mensaje = "Hola, quiero hacer este pedido:%0A%0A";

    let total = 0;


    carrito.forEach((producto) => {

        const subtotal = producto.precio * producto.cantidad;

        mensaje +=
            `• ${producto.nombre}%0A` +
            `Talla: ${producto.talla}%0A` +
            `Cantidad: ${producto.cantidad}%0A` +
            `Subtotal: $${subtotal.toLocaleString("es-CL")}%0A%0A`;

        total += subtotal;
    });


    mensaje +=
        `Total: $${total.toLocaleString("es-CL")}`;


    const telefono = "56912345678";

    const url =
        `https://wa.me/${telefono}?text=${mensaje}`;


    window.open(url, "_blank");
}