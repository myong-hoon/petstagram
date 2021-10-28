let heartClick = false


function forum(forumLists) {
    temp_doc = ''
    for (let i = 0; i < forumLists.length; i++) {
        console.log(
            forumLists[i]['type'],
            forumLists[i]['del'],
            forumLists[i]['img'],
            forumLists[i]['id'],
            forumLists[i]['note']
        )
        if (forumLists[i]['type'] != 'new') {
            temp_doc = "ㄴ"
        }
        if (forumLists[i]['del'] == 'true') {
            temp_doc += "삭제된 내용입니다."

        } else {
            temp_doc += `<img
            class="forumImg"
            src="${forumLists[i]['img']} "
            alt=""> ${forumLists[i]['id']} / ${forumLists[i]['note']}`
        }

        
        
        $("#formmm").append(temp_doc)
        $("#formmm").append('<br>')
    }

}

function imgAdd(img) {
    $("#topImgBox").append(`<img src="${img}" alt="" class="topImg">`)

}

function idAdd(userId) {
    $("#topImgNameBox").append(`<label for="">${userId}</label>`)

}

function tagAdd(tag) {
    for (let i = 0; i < tag.length; i++) {
        a = `<label> #${tag[i]}</label>`
        $("#tagBox")
            .append(a)
            .append(" ")
    }
}

function HeartBarAdd(accumulateHeart,monthlyHeart,weekiyHeart) {
    $("#heartBar").append(
        `<span class="label label-danger" id="HeartBar">Heart : 누적 ${accumulateHeart} 월간 ${monthlyHeart} 주간 ${weekiyHeart}  </span>`
    )

}

function goo(){ 

    $("#gogo").append(board_form)
    imgAdd(img)
    idAdd(userId)
    HeartBarAdd(accumulateHeart,monthlyHeart,weekiyHeart)
    
    tagAdd(tag)
    forum(forumLists)



}

let img = ""
let userId='ddd'

let forumLists=[{'type':'new',
'del':false,
'img':'11',
'id':'hthoon',
'note':'HI'}]
let tag=['#강아지스타그램']

let accumulateHeart =1
let monthlyHeart =1
let weekiyHeart = 1

let board_form =`
<script>

function heartOnClick(){

    if(heartClick == true){
        heart.style.color = "red"
        heartClick = false
    }
    else if(heartClick == false){
        heart.style.color = "black"
        heartClick = true
    }

}
</script>
<div class="boardBox">
<div class="boardNavBox">
    <div class="topImgBox" id="topImgBox"></div>
    <div class="topImgNameBox" id="topImgNameBox"></div>
    <div class="topRightHeartBar" id="heartBar"></div>

    <div class="topRightHeart" id="topRightHeart">
    <span class="glyphicon glyphicon-heart" aria-hidden="true" onclick="heartOnClick()" id="heart"></span>
    </div>

</div>

<div class="boardImgBox">
    <img
        class="mainImg"
        src="https://img.huffingtonpost.com/asset/5ec601832500000f1eeb1d4f.jpeg?cache=WuaLzjSHpx&ops=1778_1000"
        alt="">

    <div class="tagBox" id="tagBox"></div>
</div>

<div id='formmm' style="padding: 10px 10px 10px 10px; border:1px solid #999999; border-radius: px;"></div>
<div style="padding: 10px 10px 10px 10px; border:1px solid #999999; border-radius: px;">
<input type="text" style="border-radius: 10%;">
</div>

</div>`

