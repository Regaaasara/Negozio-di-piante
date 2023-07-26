/* Totale dalla sessione corrente */
updateCartTotal();

/* Controlla gli eventi provocati dai bottoni */
document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName('addtocart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);});
}

/* Funzioni per aggiungere al carrello */

function addToCart(elem) {
    
    var sibs = [];
    var getprice;
    var getproductName;
    var cart = [];
     var stringCart;
    
    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue; // text node
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }
    //crea il prodotto
    var product = {
        productname : getproductName,
        price : getprice
    };
    //crea un JSON per memorizzare
    var stringProduct = JSON.stringify(product);

    
    if(!sessionStorage.getItem('cart')){
        
        cart.push(stringProduct);
        
        stringCart = JSON.stringify(cart);
       
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
    else {
        //reperisce dati esistenti
       cart = JSON.parse(sessionStorage.getItem('cart'));

        cart.push(stringProduct);

        stringCart = JSON.stringify(cart);
        //sovrascrive dati precedenti con quelli nuovi
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}
/* Calcolo del totale */
function updateCartTotal(){

    var total = 0;
    var price = 0;
    var items = 0;
    var productname = "";
    var carttable = "";
    if(sessionStorage.getItem('cart')) {
        
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        //numero degli elementi nel carrello
        items = cart.length;
        
        for (var i = 0; i < items; i++){
            
            var x = JSON.parse(cart[i]);
            
            price = parseFloat(x.price.split('€')[1]);
            productname = x.productname;
            
            carttable += "<tr><td>" + productname + "</td><td>€" + price.toFixed(2) + "</td></tr>";
            total += price;
        }
        
    }
    //aggiorna il totale su HTML
    document.getElementById("total").innerHTML = total.toFixed(2);
    //inserisce i prodotti nella tabella del carrello
    document.getElementById("carttable").innerHTML = carttable;
    //aggiorna i prodotti su HTML
    document.getElementById("itemsquantity").innerHTML = items;
}
//produce un feeback quando viene aggiunto un prodotto
function addedToCart(pname) {
  var message = pname + " &egrave; stato aggiunto al carrello";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  if(!alerts.classList.contains("message")){
     alerts.classList.add("message");
  }
}
/* Svuota carrello */
function emptyCart() {
    
    if(sessionStorage.getItem('cart')){
        sessionStorage.removeItem('cart');
        updateCartTotal();
      
      var alerts = document.getElementById("alerts");
      alerts.innerHTML = "";
      if(alerts.classList.contains("message")){
          alerts.classList.remove("message");
      }
    }
}