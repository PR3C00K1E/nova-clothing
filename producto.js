const productos = {
    poleron: {
        nombre: "Polerón NOVA",
        precio: 29990,
        imagen: "imagenes/poleron.jpg",
        descripcion: "Polerón urbano NOVA Clothing. Cómodo y perfecto para cualquier ocasión.",
        tallas: ["XS", "S", "M", "L", "XL"]
    },

    polera: {
        nombre: "Polera Oversize",
        precio: 19990,
        imagen: "imagenes/polera.jpg",
        descripcion: "Polera oversize NOVA Clothing. Diseño urbano y cómodo para todos los días.",
        tallas: ["S", "M", "L", "XL"]
    },

    cargo: {
        nombre: "Pantalón Cargo",
        precio: 34990,
        imagen: "imagenes/cargo.jpg",
        descripcion: "Pantalón cargo NOVA Clothing. Estilo urbano con un diseño cómodo y versátil.",
        tallas: ["S", "M", "L", "XL"]
    }
};


const parametros = new URLSearchParams(window.location.search);
const productoSeleccionado = parametros.get("producto");

const producto = productos[productoSeleccionado];

if (!producto) {
    document.body.innerHTML = "<h1>Producto no encontrado</h1>";
} else {

    document.querySelector(".producto-imagen-grande img").src = producto.imagen;
    document.querySelector(".producto-imagen-grande img").alt = producto.nombre;

    document.querySelector(".informacion-producto h2").textContent =
        producto.nombre;

    document.querySelector(".precio-producto").textContent =
        "$" + producto.precio.toLocaleString("es-CL");

    document.querySelector(".informacion-producto > p:nth-of-type(2)").textContent =
        producto.descripcion;

    const contenedorTallas = document.querySelector(".tallas");

    contenedorTallas.innerHTML = "";

    producto.tallas.forEach(talla => {
        const boton = document.createElement("button");

        boton.textContent = talla;

        boton.onclick = () => seleccionarTalla(talla);

        contenedorTallas.appendChild(boton);
    });
}


let tallaSeleccionada = "";
let cantidad = 1;


function seleccionarTalla(talla) {

    tallaSeleccionada = talla;

    document.getElementById("talla-seleccionada").textContent =
        "Talla seleccionada: " + talla;
}


function cambiarCantidad(numero) {

    cantidad += numero;

    if (cantidad < 1) {
        cantidad = 1;
    }

    document.getElementById("cantidad").textContent =
        cantidad;
}


function agregarProducto() {

    if (tallaSeleccionada === "") {
        alert("Primero selecciona una talla.");
        return;
    }

    const productoParaCarrito = {

        nombre: producto.nombre,

        precio: producto.precio,

        talla: tallaSeleccionada,

        cantidad: cantidad
    };


    let carrito =
        JSON.parse(localStorage.getItem("carritoNOVA")) || [];

    carrito.push(productoParaCarrito);

    localStorage.setItem(
        "carritoNOVA",
        JSON.stringify(carrito)
    );
    
    
    alert("¡Producto agregado al carrito!");


    window.location.href = "index.html#carrito";
}