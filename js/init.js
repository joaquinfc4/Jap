const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

  function miCarrito(){
    window.location = "cart.html"
  }

  function miPerfil(){
    window.location = "my-profile.html"
  }

  function cerrarSesion(){
    window.location = "index.html"
    localStorage.removeItem('email');
  }

  function dropdown(){
    let contenido = ""

    contenido = `<div class="dropdown">
    <a class="dropdown-toggle text-light bg-dark" href="#" id="dropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="text-wrap">
        ${localStorage.getItem('email')}
        </span>
    </a>
    <ul class="dropdown-menu" aria-labelledby="dropdownButton" data-bs-toggle="collapse">
        <li><a onclick="miCarrito()" class="dropdown-item" href="#">Mi carrito</a></li>
        <li><a onclick="miPerfil()" class="dropdown-item" href="#">Mi perfil</a></li>
        <li><a onclick="cerrarSesion()" class="dropdown-item" href="#">Cerrar sesión</a></li>
    </ul>
</div>`
    document.getElementById("usr").innerHTML += contenido;
  }

  dropdown();