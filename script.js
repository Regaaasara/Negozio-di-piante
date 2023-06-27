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
