function mostrarAutos (arrayAutos) {
    for (const auto of arrayAutos) {
        
    
    let contenido = ""
    
    contenido = `
            <div onclick="setCatID(${auto.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${auto.image}" alt="${auto.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${auto.name}</h4>
                            <small class="text-muted">${auto.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${auto.description}</p>
                    </div>
                </div>
            </div>
            `;
            
            document.getElementById("listado").innerHTML += contenido;
        }

}

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(AUTOS_URL).then(resultado => {
        if (resultado.status == "ok") {
            let listaAutos = resultado.data.products;
            mostrarAutos(listaAutos);
        } else {
            alert("Algo salió mal: " + resultado.data);
        }
    })
})