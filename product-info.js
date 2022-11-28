let imagenes = "";



function mostrarProdRelacionados(ProdRelacionados) {
    for (const prodRelacionado of ProdRelacionados) {
        let contenido = ""
        contenido = `

                <div onclick="setProdID(${prodRelacionado.id})" class="card  mx-1 cursor-active" style="width: 18rem;">
                 <img src="${prodRelacionado.image}" class="card-img-top">
                    <div class="card-body">
                        <p class="card-text">${prodRelacionado.name}</p>
                    </div>
        `
        document.getElementById("prodRelacionados").innerHTML += contenido;
    }
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function mostrarComentarios(arrayObjetosComment) {

    let scoreTotal = ""
    let estrellasAmarillas = "";
    let estrellasVacias = ""
    for (const objetoComment of arrayObjetosComment) {
        let puntaje = objetoComment.score;


        let resultado = 5 - puntaje;
        estrellasAmarillas = `<span class="fa fa-star checked"></span>`.repeat(puntaje)
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

    imagenes =  `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${arrayImagenes[0]}" class="d-block w-100">
    </div>
    <div class="carousel-item">
      <img src="${arrayImagenes[1]}" class="d-block w-100">
    </div>
    <div class="carousel-item">
      <img src="${arrayImagenes[2]}" class="d-block w-100">
    </div>
    <div class="carousel-item">
      <img src="${arrayImagenes[3]}" class="d-block w-100">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div> `
    
        

        document.getElementById("cont_img").innerHTML += imagenes;


    
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
            comentar = `<h4 class="navbar navbar-expand-lg">Comentar</h4><br>
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
            <button class="btn btn-primary">Enviar</button>`

            document.getElementById("comentar").innerHTML += comentar;


            mostrarProdRelacionados(prodInfo.relatedProducts);
           

        })

    })



})

