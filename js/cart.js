let costo = null;
let cantidad = null;
let subTotal = null;

function cambiarSubTotal() {

  cantidad = document.getElementById("cantidad").value
  subTotal = costo * cantidad
  document.getElementById("subTotal").innerHTML = subTotal
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


  })

})