let listaProductos = [];
let min = undefined;
let max = undefined;
let search = undefined;

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function mostrarProductos(arrayProductos) {
    document.getElementById("listado").innerHTML = ``;
    for (const producto of arrayProductos) {

        if (!(producto.cost < min) && !(producto.cost > max)) {

            /* ((min == undefined && max == undefined) || (producto.cost >= min && producto.cost <= max) ||
            (producto.cost >= min && max == undefined) || (min == undefined && producto.cost <= max))  */

            if (search == undefined || search == "" || producto.name.toLowerCase().includes(search) || 
            producto.description.toLowerCase().includes(search)) {

                let contenido = ""
                contenido = `
                    <div onclick="setProdID(${producto.id})" class="list-group-item list-group-item-action cursor-active">
                        <div class="row">
                          <div class="col-3">
                              <img src="${producto.image}" alt="${producto.description}" class="img-thumbnail">
                          </div>
                            <div class="col">
                             <div class="d-flex w-100 justify-content-between">
                                  <h4 class="mb-1">${producto.name} - ${producto.currency} ${producto.cost} </h4>
                                 <small class="text-muted">${producto.soldCount} artículos</small>
                             </div>
                             <p class="mb-1">${producto.description}</p>
                         </div>
                     </div>
                 </div>
                    `;
                    
                    document.getElementById("listado").innerHTML += contenido; 
            } 
        }


    }
}


document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE).then(resultado => {
        if (resultado.status == "ok") {
            listaProductos = resultado.data.products;
            
            mostrarProductos(listaProductos);
            
            /* para evitar asincronias, que ocurra todo cuando la promesa se cargó */
            document.getElementById("rangeFilterCount").addEventListener("click", function () {
                if (document.getElementById("rangeFilterCountMin").value != "") {
                    min = parseInt(document.getElementById("rangeFilterCountMin").value);
                } else {
                    min = undefined
                }
        
                if (document.getElementById("rangeFilterCountMax").value != "") {
                    max = parseInt(document.getElementById("rangeFilterCountMax").value);
                } else {
                    max = undefined
                }
        
                mostrarProductos(listaProductos);
        
            })
        
            document.getElementById("clearRangeFilter").addEventListener("click", function () {
                min = undefined;
                max = undefined;
                document.getElementById("rangeFilterCountMax").value = "";
                document.getElementById("rangeFilterCountMin").value = "";
                mostrarProductos(listaProductos);
            })
        
            document.getElementById("sortByCount").addEventListener("click", function () {
                listaProductos.sort(function (a, b) {
        
                    return b.soldCount - a.soldCount;
        
                    /* if (a.soldCount > b.soldCount) {
                        return -1;
                    }
        
                    if (a.soldCount < b.soldCount) {
                        return 1;
                    }
                    return 0; */
                })
                mostrarProductos(listaProductos);
            })
        
            document.getElementById("sortAsc").addEventListener("click", function () {
                listaProductos.sort(function (a, b) {
                    return a.cost - b.cost;
                })
                mostrarProductos(listaProductos);
            })
        
            document.getElementById("sortDesc").addEventListener("click", function () {
                listaProductos.sort(function (a, b){
                    return b.cost - a.cost;
                })
                mostrarProductos(listaProductos);
            })

        } else {
            alert("Algo salió mal: " + resultado.data);
        }
    })
  
    document.getElementById("buscador").addEventListener("input", function (){
        search = document.getElementById("buscador").value;
        mostrarProductos(listaProductos);
    })
})
