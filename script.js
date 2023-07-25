function toggleStyle() {
  var styleLink = document.getElementById('style-link');
  var styleToggle = document.getElementById('style-toggle');

  if (styleToggle.checked) {
    styleLink.setAttribute('href', 'alt-style.css');
    localStorage.setItem('style', 'alt-style.css'); // Memorizza nella memoria locale
  } else {
    styleLink.setAttribute('href', 'style.css');
    localStorage.setItem('style', 'style.css'); // Memorizza nella memoria locale
  }
}

// Controlla se lo stile è ancora salvato nella memoria locale
var savedStyle = localStorage.getItem('style');
if (savedStyle) {
  document.getElementById('style-link').setAttribute('href', savedStyle);
  if (savedStyle === 'alt-style.css') {
    document.getElementById('style-toggle').checked = true;
  }
}



// Script per lo slideshow
let slideIndex = 0;
showSlides();

// Scorrimento automatico
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; 
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1} 
  slides[slideIndex-1].style.display = "block"; 
  setTimeout(showSlides, 4000); // Cambia l'immagine ogni 4 secondi
}


// Script per le funzioni del carrello e prodotti

// script.js
let cartItems = [];

// Function to load cart items from localStorage
function loadCart() {
  const storedCartItems = localStorage.getItem("cartItems");
  if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
    updateCart();
  }
}

// Function to save cart items to localStorage
function saveCart() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function addToCart(name, price) {
  cartItems.push({ name, price });
  saveCart();
  updateCart();
}

function updateCart() {
  const cartElement = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  let cartHTML = "";
  let total = 0;

  cartItems.forEach((item) => {
    cartHTML += `<li class="list-group-item">${item.name} - $${item.price}</li>`;
    total += item.price;
  });

  cartElement.innerHTML = cartHTML;
  totalElement.textContent = total;
}

function clearCart() {
  cartItems = [];
  saveCart();
  updateCart();
}

// Adding event listeners to buttons after the document is loaded
document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".product button");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productElement = event.target.parentElement;
      const productName = productElement.querySelector("h2").textContent;
      const productPrice = parseFloat(productElement.querySelector("p").textContent.split(": ")[1]);
      addToCart(productName, productPrice);
    });
  });

  const clearCartButton = document.querySelector(".cart button");
  clearCartButton.addEventListener("click", clearCart);

  // Load cart items from localStorage when the page loads
  loadCart();
});
