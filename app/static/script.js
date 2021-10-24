// Sticky Navigation Menu JS Code
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");

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
       
    } else {
        moveSlide(0);
      
    }
});
prevBtn.addEventListener('click', function () {
    if (currentIdx > 0) {
        moveSlide(currentIdx - 1);
      
    } else {
        moveSlide(0);
 
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
    var currentVal = $(this).val().replace('#','');
    if(currentVal.indexOf('#')===-1){
        if (currentVal == oldVal) {
            pet_list_cre()
        } else {
            search(currentVal)
            }
    }
    else{
        alert('한개의 태그만 검색하세요')
        $(".input_types").val('')
        pet_list_cre()
    }
});

$(document).ready(function () {
    $('#homebutton').get(0).click();
    array_check();
    best_pet();
});
function array_check(){
    arrayCheck=$("#array option:selected").attr('value')
    $.ajax({
        type:'POST',
        url:'/api/arrayCheck',
        data:{arrayCheck:arrayCheck},
        success:function(response){
            pet_list_cre();
        }
    })
}
function pet_list_cre() {
    $.ajax({
        type: 'GET',
        url: '/api/getPetList',
        data: {},
        success: function (response) {

            let pet_lists = response['pet_lists']
            let msg = response['result']
            
  
            $('#pet_list').empty()
            for (let i = 0; i < pet_lists.length; i++) {
                temp_html = `<li>
            <div class="wrapper">
                <div class="card front-face">
                    <img
                            src="${pet_lists[i]['img-url']}"
                            alt="Flip Card">
                </div>
                <div class="card back-face">
                    <img
                            src="${pet_lists[i]['img-url']}"
                            alt="Flip Card">
                    <div class="info">
                        <div class="title">${pet_lists[i]['name']}</div>
                        <p class="c_comment">${pet_lists[i]['note']}<br></p>
                        <p class="thumbs" >${pet_lists[i]['heart']}</p>
                    </div>
                    <ul>
                        <a class="fas fa-heart fa-2x" onclick="heartPet('${pet_lists[i]['name']}')"></a>
                    </ul>
                </div>

        </li>`
                // 마지막 리스트 작성하고나서 list 생성완료 콘솔로그 발생
                if (i === (pet_lists.length - 1)) {
                    $('#pet_list').append(temp_html)

                    break
                } else {

                    $('#pet_list').append(temp_html)
                }
            }
            slid_count()

        }
    });
}

function best_pet() {
    $.ajax({
        type: 'GET',
        url: '/api/bestpet',
        data: {},
        success: function (response) {

            let best_list = response['best']

            $('#name').text(`${best_list[0]['name']} 입니다.`)
            $('#home_title').append(`<li>
            <div class="wrapper" style="position: absolute; right: 10px; top:10px">
                <div class="card front-face">
                    <img
                            src="${best_list[0]['img-url']}"
                            alt="Flip Card">
                </div>
                <div class="card back-face">
                    <img
                            src="${best_list[0]['img-url']}"
                            alt="Flip Card">
                    <div class="info">
                        <div class="title">${best_list[0]['name']}</div>
                        <p class="c_comment">${best_list[0]['note']}<br></p>
                        <p class="thumbs" >${best_list[0]['heart']}</p>
                    </div>
                    <ul>
                        <a class="fas fa-heart fa-2x" onclick="heartPet('${best_list[0]['name']}')"></a>
                    </ul>
                </div>

        </li>`)
        }

    });
}

function search(pet_type) {
    $.ajax({
        type: 'GET',
        url: '/api/getPetList',
        data: {},
        success: function (response) {
            let j = 0
            let pet_lists = response['pet_lists']
            let msg = response['result']
            $('#pet_list').empty()
            for (let i = 0; i < pet_lists.length; i++) {
                for (let j = 0; j < pet_lists[i]['type'].replace('#','').split("#").length; j++){
                    if (pet_type === pet_lists[i]['type'].replace('#','').split("#")[j]) {
                    temp_html = `<li>
            <div class="wrapper">
                <div class="card front-face">
                    <img
                            src="${pet_lists[i]['img-url']}"
                            alt="Flip Card">
                </div>
                <div class="card back-face">
                    <img
                            src="${pet_lists[i]['img-url']}"
                            alt="Flip Card">
                    <div class="info">
                        <div class="title">${pet_lists[i]['name']}</div>
                        <p class="c_comment">${pet_lists[i]['note']}<br></p>



                        <!-- Like added -->
                        <p class="thumbs" onclick="heartPet()">${pet_lists[i]['heart']}</p>



                    </div>
                    <ul>
                        <a class="fas fa-heart fa-2x"></a>
                    </ul>
                </div>

        </li>`
                    $('#pet_list').append(temp_html)
                } else {

                }
            }
            }
            slid_count()

        }
    });
}

function heartPet(name) {
    $.ajax({
        type: 'POST',
        url: '/api/heart',
        data: {name_give: name},
        success: function (response) {
            alert(response['msg']);
            window.location.reload()
        }
    });
}
