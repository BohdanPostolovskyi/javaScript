// Гамбургер меню
const smallWindow = 768;
const hamburgerButton  = document.querySelector(".hamburger");
const navigationMenu  = document.querySelector(".menu");

function toggleNavigationMenu() {
    navigationMenu .classList.toggle("active");
}
hamburgerButton .addEventListener("click", toggleNavigationMenu);

window.addEventListener("resize", function (event) {
    if (window.innerWidth <= smallWindow) {
        navigationMenu .classList.remove("active");
    }
});

// Карусель
let timer = 0;
const image = ['3.jpg','2.jpg','1.jpg'];
const carousel = document.getElementById('carousel');
const imageContainer = carousel.querySelector('#carousel-slides');
const krapkaContainer = carousel.querySelector('#indicators');

image.forEach(function(image) {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    const img = document.createElement('img');
    img.src = image;
    slide.appendChild(img);
    imageContainer.appendChild(slide);
});
const indicators = document.getElementById("indicators");
    if (indicators) {
        for (let i = 0; i < image.length; i++) {
            const div = document.createElement("div");
            div.classList.add("indicator");
            indicators.appendChild(div);
        }
    }
carousel.querySelector('#leftButton').addEventListener('click', function() {
    showCarouselSlide(currentSlideIndex - 1);
});
carousel.querySelector('#rightButton').addEventListener('click', function() {
    showCarouselSlide(currentSlideIndex + 1);
});
const krapka = carousel.querySelectorAll('.indicator');
krapka.forEach(function(dot, index) {
    dot.addEventListener('click', function() {
        showCarouselSlide(index);
    });
});

let currentSlideIndex = 0;
showCarouselSlide(currentSlideIndex);
function showCarouselSlide(index) {
    const slides = carousel.querySelectorAll('.slide');
    if (index < 0) {
        index = slides.length - 1;
    } else if (index >= slides.length) {
        index = 0;
    }
    const slideIndicators = document.getElementsByClassName("indicator");
    for (let i = 0; i < slideIndicators.length; i++) {
        slideIndicators[i].classList.remove("active");

        slideIndicators[index].classList.add("active");
    }
    clearInterval(timer);
    
    slides.forEach(function(slide) {
        slide.style.maxWidth = '0';
    });
    slides[index].style.maxWidth = '600px';
    

    currentSlideIndex = index; 
    timer = setInterval(() => {
        showCarouselSlide(currentSlideIndex+1);
    }, 2000);
}