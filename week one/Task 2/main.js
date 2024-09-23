let slideIndex = 1;
let startX = 0;
let endX = 0;
let slideInterval;

showSlide(slideIndex);
autoSlide();

function plusSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    var slide = document.getElementsByClassName("slides");
    var pagination = document.getElementsByClassName('pagination');
    if (n > slide.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slide.length; }

    for (let i = 0; i < slide.length; i++) {
        slide[i].style.display = "none";
        slide[i].style.opacity = "0"; 
    }

    for (let i = 0; i < pagination.length; i++) {
        pagination[i].className = pagination[i].className.replace('active', '');
    }

    slide[slideIndex - 1].style.display = "block";
    setTimeout(() => {
        slide[slideIndex - 1].style.opacity = "1"; 
    }, 10); 
    pagination[slideIndex - 1].className += " active";
}

function autoSlide() {
    slideInterval = setInterval(() => {
        plusSlide(1);
    }, 3000);
}

function pauseSlide() {
    clearInterval(slideInterval);
}

function resumeSlide() {
    autoSlide();
}

let slider = document.getElementById('slider');
slider.addEventListener('mouseover', pauseSlide);
slider.addEventListener('mouseout', resumeSlide);

slider.addEventListener('touchstart', handleTouchStart, false);
slider.addEventListener('touchmove', handleTouchMove, false);
slider.addEventListener('touchend', handleTouchEnd, false); 

function handleTouchStart(e) {
    const firstTouch = e.touches[0];
    startX = firstTouch.clientX;
}

function handleTouchMove(e) {
    if (!startX) return;
    endX = e.touches[0].clientX;
    let diff = startX - endX;

    e.preventDefault(); 
    if (diff > 50) {
        plusSlide(1);
    } else if (diff < -50) { 
        plusSlide(-1);
    }
    startX = 0;
}

function handleTouchEnd(e) {
    startX = 0; 
}
