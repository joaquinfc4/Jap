let costo = undefined;
let cantidad = undefined;
let subTotal = undefined;
let costoenvio = undefined;
let total = undefined;
let tarjetaCred = document.getElementById("tarjeta-credito");
let transBanc = document.getElementById("transferencia-bancaria");
/* let tarjetaCredLabel = document.getElementById("tarjeta-credito-label");
let transBancLabel = document.getElementById("transferencia-bancaria-label"); */





formulario.addEventListener('submit', (event) => {
  if (!formulario.checkValidity()) {
      
      event.preventDefault();
      event.stopPropagation();
  }

  formulario.classList.add('was-validated');
});

/* function showError() {
  
  if (!tarjetaCred.checked && !transBanc.checked) {
      tarjetaCred.setCustomValidity("a")
  } else if (tarjetaCred.checked || transBanc.checked) {
      tarjetaCred.setCustomValidity("")
  }

  if (!tarjetaCred.validity.valid) {
      tarjetaCred.classList.add("block");
      tarjetaCredLabel.classList.add("red-link");
      transBanc.classList.add("block");
      transBancLabel.classList.add("red-link");
  } else if (tarjetaCred.validity.valid) {
      tarjetaCred.classList.remove("block");
      tarjetaCredLabel.classList.remove("red-link");
  }
} */

;
function disableRadio(){
  
  if (tarjetaCred.checked) {
    document.getElementById("num-tarjeta").disabled = false;
    document.getElementById("cod-seg").disabled = false;
    document.getElementById("vencimiento").disabled = false;

    document.getElementById("num-cuenta").disabled = true;
    document.getElementById("forma-de-pago").innerHTML = "Tarjeta de crédito"

  } else if (transBanc.checked) {
    document.getElementById("num-cuenta").disabled = false;

    document.getElementById("num-tarjeta").disabled = true;
    document.getElementById("cod-seg").disabled = true;
    document.getElementById("vencimiento").disabled = true;
    document.getElementById("forma-de-pago").innerHTML = "Transferencia bancaria"
  }
}

function costos() {
  let premium = document.getElementById("premium")
  let express = document.getElementById("express")
  let standard = document.getElementById("standard")
  
  if (premium.checked) {

    costoenvio = subTotal * 0.15
    document.getElementById("costo-envio").innerHTML = costoenvio;
    document.getElementById("total").innerHTML = subTotal + costoenvio;

  } else if (express.checked) {

    costoenvio = subTotal * 0.07
    document.getElementById("costo-envio").innerHTML = costoenvio;
    document.getElementById("total").innerHTML = subTotal + costoenvio;

  } else if (standard.checked){

    costoenvio = subTotal * 0.05
    document.getElementById("costo-envio").innerHTML = costoenvio;
    document.getElementById("total").innerHTML = subTotal + costoenvio;

  } else {
    costoenvio = "Seleccione el tipo de envío"
    document.getElementById("total").innerHTML = "Debe seleccionar el costo de envío para visualizar el total";
  }
}



function mostrarCostos() {
  let contenido = ""
  contenido = `<div class="card col-6 mt-3 mb-4">
        <div class="list-group list-group-flush">
          <div class="list-group-item  text-muted">
            <div class="row">
              <div class="col">
                <p>Subtotal</p>
              </div>
              <div class="col text-end">
                <p id="subTotal">${subTotal}</p>
              </div>
              <div class="description-cost">
                <small>Costo unitario del producto por cantidad</small>
              </div>
            </div>
            
          </div>
          <div class="list-group-item text-muted">
            <div class="row">
              <div class="col">
                <p>Costo de envío</p>
              </div>
              
              <div class="col text-end">
                <p id="costo-envio">${costoenvio}</p>
              </div>

              <div class="description-cost">
                <small>Segun el tipo de envío</small>
              </div>
            </div>
          </div>

          <div class="list-group-item">
            <div class="row">
              <div class="col  text-muted">
                <p>Total ($)</p>
              </div>
              <div class="col text-end">
                <p id="total">${total}</p>
              </div>
            </div>
          </div>
          
        </div>


      </div>`
  document.getElementById("costos").innerHTML = contenido;
}

function cambiarSubTotal() {

  cantidad = document.getElementById("cantidad").value
  subTotal = costo * cantidad
  document.getElementById("subTotal").innerHTML = subTotal;
  mostrarCostos()
  costos()
}



function mostrarCarrito(articles) {


  for (const article of articles) {

    costo = article.unitCost;


    let contenido = ""

    contenido = ` <table class="table">
<thead>
  <tr>
    <th scope="col"></th>
    <th scope="col">Nombre</th>
    <th scope="col">Costo</th>
    <th scope="col">Cantidad</th>
    <th scope="col">Subtotal</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row"><img src="${article.image}"  width="75px" height="50px"></th>
    <td>${article.name}</td>
    <td>${article.currency} ${article.unitCost}</td>
    <td><input type="number" id="cantidad" value="1" oninput="cambiarSubTotal()" min="1"></td>
    <td id="subTotal">${article.unitCost}</td>
  </tr>
</tbody>
</table> `

    document.getElementById("productos").innerHTML += contenido;

  }
}

document.addEventListener("DOMContentLoaded", function () {
  getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(resultado => {
    let prodCart = resultado.data.articles;


    mostrarCarrito(prodCart)
    cambiarSubTotal()
    mostrarCostos()
    costos()
    
  })

})

