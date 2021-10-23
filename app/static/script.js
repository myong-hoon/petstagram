// Sticky Navigation Menu JS Code
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
console.log(scrollBtn);
let val;
window.onscroll = function () {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("sticky");
        scrollBtn.style.display = "block";
    } else {
        nav.classList.remove("sticky");
        scrollBtn.style.display = "none";
    }

}

// Side NavIgation Menu JS Code
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function () {
    navBar.classList.add("active");
    menuBtn.style.opacity = "0";
    menuBtn.style.pointerEvents = "none";
    body.style.overflow = "hidden";
    scrollBtn.style.pointerEvents = "none";
}
cancelBtn.onclick = function () {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
    body.style.overflow = "auto";
    scrollBtn.style.pointerEvents = "auto";
}

// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        navBar.classList.remove("active");
        menuBtn.style.opacity = "1";
        menuBtn.style.pointerEvents = "auto";
    });
}


//슬라이더

let slides = document.querySelector('.slides'),
    slide = document.querySelectorAll('.slides li'),
    currentIdx = 0,
    slideCount = slide.length,
    prevBtn = document.querySelector('.prev'),
    slideWidth = 330,
    slideMargin = 30,
    nextBtn = document.querySelector('.next');

slides.style.width = (slideWidth + slideMargin) * slideCount - slideMargin + 'px';

function moveSlide(num) {
    slides.style.left = -num * 350 + 'px';
    currentIdx = num;
}

nextBtn.addEventListener('click', function () {
    if (currentIdx < slideCount - 1 && currentIdx >= 0) {
        moveSlide(currentIdx + 1);
        console.log(currentIdx);
    } else {
        moveSlide(0);
        console.log(currentIdx);
    }
});
prevBtn.addEventListener('click', function () {
    if (currentIdx > 0) {
        moveSlide(currentIdx - 1);
        console.log(currentIdx);
    } else {
        moveSlide(0);
        console.log(currentIdx);
    }
});

function slid_count(){

    slide = document.querySelectorAll('.slides li')
    currentIdx = 0
    slideCount = slide.length
}



// 검색창

var oldVal = "";
$(".input_types").on("change keyup paste", function () {
    var currentVal = $(this).val();
    if (currentVal == oldVal) {
        pet_list_cre()
    } else {
        search(currentVal)
    }
});

//정렬조건

array_type=$("#array").val();
