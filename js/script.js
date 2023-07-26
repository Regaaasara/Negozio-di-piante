// Riferimento allo slider e allo stylesheet
var slider = document.getElementById("slider");
var stylesheetLink = document.getElementById("stylesheetLink");

// Funzione per aggiornare lo stylesheet in base alla posizione dello slider
function updateStylesheet() {
  var sliderValue = parseInt(slider.value);
  if (sliderValue === 0) {
    stylesheetLink.href = "./css/style.css";
  } else if (sliderValue === 1) {
    stylesheetLink.href = "./css/alt-style.css";
  }
  // Memorizza la posizione dello slider e lo stile corrente
  localStorage.setItem("preferredStylesheet", stylesheetLink.href);
  localStorage.setItem("sliderValue", sliderValue);
}

// Controlla se uno stile e la posizione dello slider sono memorizzati
var preferredStylesheet = localStorage.getItem("preferredStylesheet");
var storedSliderValue = localStorage.getItem("sliderValue");

if (preferredStylesheet && storedSliderValue) {
  // Imposta in base a ciò che è memorizzato
  stylesheetLink.href = preferredStylesheet;
  slider.value = storedSliderValue;
}

// Input dello slider
slider.addEventListener("input", updateStylesheet);

// Input per dispositivo mobile
slider.addEventListener("change", updateStylesheet);




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