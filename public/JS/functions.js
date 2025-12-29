const header=document.querySelector(".header");
const iconCart=header.lastElementChild;

//-----Funcion para abrir menu lateral izquierdo-----------------

const iconMenu=header.firstElementChild;
console.log(iconMenu);
const menu=document.querySelector(".menu");
iconMenu.addEventListener("click",()=>{
    menu.classList.toggle("menu--show");
    console.log("Ya aparecio el menu");

});
//-------------------------------
//----------Funcion para cerrar el menu lateral izquierdo
const iconCloseMenu=menu.querySelector(".menu__close-icon");
iconCloseMenu.addEventListener("click",()=>{
    menu.classList.replace("menu--show","menu--close");
    menu.classList.remove("menu--close");
    console.log("Ya se cerro el menu");
});
//---------------------

const cart=document.querySelector(".cart")
console.log(cart)

//--------------Funcion para abrir el carrito---------------
iconCart.addEventListener("click",() =>{
    cart.classList.toggle("cart--show");
    console.log("El carrito ya aparecio");
});
//-------------------------
//-----------Funcion para cerrar el carrito--------------
const iconCloseCart=cart.querySelector(".cart__close-icon");
console.log(iconCloseCart);
iconCloseCart.addEventListener("click",() => {
    cart.classList.replace("cart--show","cart--close");
    cart.classList.remove("cart--close")
    console.log("Ya se cerro el carrito");
});

//------------------------
let listaCarrito=[]
let id=0;
//----Generador de ids para los articulos
function generarIdObjeto(){
    id++;
    return id;
}
//-------------------
//---------Clase para cada articulo-----------------------
class articulo{
    constructor(articuloHTML,id){
        this.id=id;
        this.name=articuloHTML.querySelector(".products__title").textContent;
        this.price=articuloHTML.querySelector(".products__price").textContent;
        this.urlImagen=articuloHTML.querySelector(".products__img").src;
    }
    agregarACarrito(){
        listaCarrito.push(this);
        listaCarrito.forEach(function(a=this){console.dir(a)})
        actualizarVista();
    }
}
//------------------------------------

//-----Funcion para actualizar la vista de html
const actualizarVista= () => {
    const carritoContenedor=document.querySelector(".cart__container-items");
    carritoContenedor.innerHTML="";
    listaCarrito.forEach(producto=>{
        const nuevaFila=document.createElement("div");
        nuevaFila.classList.add("cart__container-Product");
        nuevaFila.setAttribute("data-id",producto.id);

        const imgProducto=document.createElement("img");
        const nombreProducto=document.createElement("p");
        const precioProducto=document.createElement("p");
        const iconEliminar=document.createElement("i");
        const imgEliminar=document.createElement("img");

        imgProducto.src=producto.urlImagen;
        imgProducto.classList.add("cart__product-img");
        nombreProducto.textContent=producto.name;
        precioProducto.textContent=producto.price;
        precioProducto.classList.add("cart__product-price");
        iconEliminar.classList.add("cart__product-Delete");
        imgEliminar.src= "/img/icons/iconoDelete.png";
        imgEliminar.classList.add("cart__product-iconDelete");
        iconEliminar.append(imgEliminar);

        //------Este metodo elimina objetos creados en el DOM
        iconEliminar.addEventListener("click",()=>{
            elimninarDeListaCarrito(producto.id);
            actualizarVista();
            contarElementos()
        })
        nuevaFila.append(imgProducto,nombreProducto,precioProducto,iconEliminar);
        carritoContenedor.append(nuevaFila);
    });   
}//--------------------------------------------------------------

//Funcion para contar los elementos del carrito
const contarElementos =()=>{
    const contador=document.querySelector(".header__contador");
    contador.textContent=listaCarrito.length;
}
//---------------------------------

//--------Metodo para que funcionen los botones de agregar------------------
document.querySelectorAll(".products__buttonAgregar").forEach(buton => {
    buton.addEventListener("click",()=>{
        const producto=buton.closest(".products__item");
        generarIdObjeto();
        const articuloSeleccionado=new articulo(producto,id);
        console.log(id)
        articuloSeleccionado.agregarACarrito();
        actualizarVista();
        contarElementos();

    });
});
//------------------------------------------------------
//Prueba logica eliminar en la lista
const elimninarDeListaCarrito=(idEliminarDeLista)=>{
    listaCarrito=listaCarrito.filter((producto)=>idEliminarDeLista!=producto.id);
}
