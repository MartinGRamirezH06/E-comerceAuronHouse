const header=document.querySelector(".header");
const iconCart=header.firstElementChild;

const cart=document.querySelector(".cart")
console.log(cart)
//--------------Funcion para abrir el carrito---------------
iconCart.addEventListener("click",() =>{
    cart.classList.toggle("--showCart");
    console.log("El carrito ya aparecio");
});
//-------------------------
//-----------Funcion para cerrar el carrito--------------
const iconCloseCart=cart.querySelector(".--selectorClose");
console.log(iconCloseCart);
iconCloseCart.addEventListener("click",() => {
    cart.classList.replace("--showCart","--closeCart");
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
        this.name=articuloHTML.querySelector(".__title").textContent;
        this.price=articuloHTML.querySelector(".__price").textContent;
        this.urlImagen=articuloHTML.querySelector(".__img").src;
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
    const carritoContenedor=document.querySelector(".__container-items");
    carritoContenedor.innerHTML="";
    listaCarrito.forEach(producto=>{
        const nuevaFila=document.createElement("div");
        nuevaFila.classList.add("__container-Product");
        nuevaFila.setAttribute("data-id",producto.id);

        const imgProducto=document.createElement("img");
        const nombreProducto=document.createElement("p");
        const precioProducto=document.createElement("p");
        const iconEliminar=document.createElement("i");
        const imgEliminar=document.createElement("img");

        imgProducto.src=producto.urlImagen;
        nombreProducto.textContent=producto.name;
        precioProducto.textContent=producto.price;
        precioProducto.classList.add("__price");
        iconEliminar.classList.add("--selectorDelete");
        imgEliminar.src= "/img/iconoDelete.png";
        imgEliminar.classList.add("__delete-icon");
        iconEliminar.append(imgEliminar);

        
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
    const contador=document.querySelector(".__contador");
    contador.textContent=listaCarrito.length;
}
//---------------------------------
//-------Funcion para eliminar objeto en lista en la vista
const iconRemoveCart=document.querySelectorAll(".--selectorDelete");
iconRemoveCart.forEach(producto =>{
    producto.addEventListener("click",()=>{
        const raizProducto=producto.parentElement;
        raizProducto.remove();
    })
})
//---------------------------
//--------Metodo para que funcionen los botones de agregar------------------
document.querySelectorAll(".__buttonAgregar").forEach(buton => {
    buton.addEventListener("click",()=>{
        const producto=buton.closest(".__item");
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
