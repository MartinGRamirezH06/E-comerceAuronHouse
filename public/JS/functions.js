const header=document.querySelector(".header");
const iconCart=header.firstElementChild;

const cart=document.querySelector(".cart")
console.log(cart)
//Funcion para abrir el carrito
iconCart.addEventListener("click",() =>{
    cart.classList.toggle("--showCart");
    console.log("El carrito ya aparecio");
});
//Funcion para cerrar el carrito
const iconCloseCart=cart.querySelector(".--selectorClose");
console.log(iconCloseCart);
iconCloseCart.addEventListener("click",() => {
    cart.classList.replace("--showCart","--closeCart");
    console.log("Ya se cerro el carrito");
});
//Clase para cada articulo
const listaCarrito=[]

class articulo{
    constructor(articuloHTML){
        this.name=articuloHTML.querySelector(".__title").textContent;
        this.price=articuloHTML.querySelector(".__price").textContent;
        this.urlImagen=articuloHTML.querySelector(".__img").src;
    }
    agregarACarrito(){
        listaCarrito.push(this);
        listaCarrito.forEach(function(a=this){console.dir(a)})
        // console.log("Se añadio a carrito: "+listaCarrito);
    }
}
//Metodo para que funcionen los botones de agregar
document.querySelectorAll(".__buttonAgregar").forEach(buton => {
    buton.addEventListener("click",()=>{
        const producto=buton.closest(".__item");
        const articuloSeleccionado=new articulo(producto);
        articuloSeleccionado.agregarACarrito();
    });
});

