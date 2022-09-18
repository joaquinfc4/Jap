let imagenes = "";

 function mostrarComentarios(arrayObjetosComment){
    
    let scoreTotal = ""
    let estrellasAmarillas = "";
    let estrellasVacias = ""
    for (const objetoComment of arrayObjetosComment) {
        let puntaje = objetoComment.score;
        
        
        let resultado = 5 - puntaje;
        estrellasAmarillas =  `<span class="fa fa-star checked"></span>`.repeat(puntaje)
        estrellasVacias = `<span class="fa fa-star"></span>`.repeat(resultado)
    
        scoreTotal = estrellasAmarillas + estrellasVacias;

        let contenido = ""
        
        contenido = `
        
            <p class="list-group-item"><span class="fw-bold"> ${objetoComment.user}</span> - ${objetoComment.dateTime} - 
            ${scoreTotal}
            <br>
            ${objetoComment.description}</p>
             
    `
        document.getElementById("comentarios").innerHTML += contenido;
    }
    
    
    
    
}
 



function mostrarImagenes(arrayImagenes) {
    for (const imagen of arrayImagenes) {
        imagenes = `<img src="${imagen}" width="350px class="img-thumbnail">`;

        document.getElementById("cont_img").innerHTML += imagenes;


    }
}


function mostrarInfo(prod) {
    
    let contenido = ""

    contenido = `<h4 class="navbar navbar-expand-lg">${prod.name}</h4><hr>
    
    <div class="container">
        <div class="row">
            <div class="col">
                <p><span  class="fw-bold">Precio</span><br>
                ${prod.currency} ${prod.cost}</p>

                <p><span  class="fw-bold">Descripción</span><br>
                ${prod.description}</p>

                <p><span  class="fw-bold">Categoría</span><br>
                ${prod.category}</p>

                <p><span  class="fw-bold">Cantidad de vendidos</span><br>
                ${prod.soldCount}</p>

                <p><span  class="fw-bold">Imágenes</p>
                ${imagenes}
                
                
            </div>
        </div>
    </div>
    <br>
    `

    document.getElementById("info").innerHTML += contenido;
}

/* function mostrarComentarios(arrayComentarios) {
    
    estrellas(commentInfo)
    

    for (const comentario of arrayComentarios) {
        
        let contenido = ""
        
        contenido = `
        
            <p class="list-group-item"><span class="fw-bold"> ${comentario.user}</span> - ${comentario.dateTime} - 
            ${scoreTotal}
            <br>
            ${comentario.description}</p>
             
    `
        document.getElementById("comentarios").innerHTML += contenido;
        
        
    }
    

}
 */
document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCT_INFO_URL + localStorage.getItem('prodID') + EXT_TYPE).then(resultado => {
        prodInfo = resultado.data;
        prodImages = resultado.data.images;
        mostrarInfo(prodInfo);
        mostrarImagenes(prodImages);
        
        

        getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem('prodID') + EXT_TYPE).then(resultado => {
            commentInfo = resultado.data;
            
            mostrarComentarios(commentInfo);
            
            let comentar = ""
            comentar =  `<h4 class="navbar navbar-expand-lg">Comentar</h4><br>
            Tu opinion <br>
            <textarea rows="2" cols="40"></textarea><br>
            Tu puntuación <br>
            <select>
              <option selected>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select><br>
            <button class="btn btn-dark">Enviar</button>`

            document.getElementById("comentar").innerHTML += comentar;
        })
        
    })

    

})

