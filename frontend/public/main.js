$(document).ready(function(){


    let currentDeviceWidth = window.outerHeight;
    let header = document.querySelector('header');
    document.addEventListener('scroll', () => {
        if (window.scrollY >= currentDeviceWidth) {
            header?.querySelectorAll('.b__nav ul li a').forEach(el => {el.style.color = '#000000'});
            header?.querySelectorAll('path').forEach(el => {el.style.fill = '#000000'});
            header.querySelector('.b__phone a').style.color = '#000000';
            header.style.backgroundColor = '#ffffffbd';
            header.style.boxShadow = '0px 20px 20px 20px #ffffffbd';
            header.style.padding = '1rem 0 0 0';
            header.querySelector('.b__nav').style.justifyContent = 'space-evenly';
            header.querySelector('.b__menu').style.justifyContent = 'space-between';
        }
        if (window.scrollY < currentDeviceWidth) {
            header?.querySelectorAll('.b__nav ul li a').forEach(el => {el.style.color = '#ffffff'});
            header?.querySelectorAll('path').forEach(el => {el.style.fill = '#ffffff'});
            header.querySelector('.b__phone a').style.color = '#ffffff';
            header.style.backgroundColor = 'unset';
            header.style.boxShadow = 'none';
            header.style.padding = '2rem 0';
            header.querySelector('.b__nav').style.justifyContent = 'space-between';
            header.querySelector('.b__menu').style.justifyContent = 'space-evenly';
        }
    })
    let photoCount = document.querySelectorAll('.b__itemPhoto').length;
   $('.b__itemPhoto img').on("mouseover", function() {
        console.log("mouseOver")
        let photoId = $(this).closest('.b_interier_item').attr('id');
        var defaultArr = [];
        var someVar = parseInt(photoId);
        var isExtremum = false;
        for (let i = 0; i < photoCount; i++) {
            defaultArr.push(i)
        }
        for (let i = photoCount; i >= parseInt(photoId); i--) {
            defaultArr[someVar] = i;
            someVar++
        }
        console.log(photoCount)
        for (let j = 0; j < photoCount; j++) {
            if(j == photoCount - 1 && !isExtremum){
                $(`#${j} .b__itemPhoto_description`)[0].classList.value = 'b__itemPhoto_description center_side';
            } else if (isExtremum){
                $(`#${j} .b__itemPhoto_description`)[0].classList.value = 'b__itemPhoto_description right_side';
            } else {
                if(defaultArr[j] < defaultArr[j+1]){
                    $(`#${j} .b__itemPhoto_description`)[0].classList.value = 'b__itemPhoto_description left_side';
                }
                else if (defaultArr[j] > defaultArr[j+1] && !isExtremum) {
                    $(`#${j} .b__itemPhoto_description`)[0].classList.value = 'b__itemPhoto_description center_side';
                    isExtremum = true;
                } 
                else {
                    $(`#${j} .b__itemPhoto_description`)[0].classList.value = 'b__itemPhoto_description right_side';
                }
            }
            $(`#${j} img`).css("z-index", `${defaultArr[j]}`)
        }
    })

    // $('.b__dateForSlide_container').slick({
    //     infinite: true,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     prevArrow: $('.prev_btn'),
    //     nextArrow: $('.next_btn'),
    //     fade: true,
    //     cssEase: 'linear',
    //     speed: 500,
    //   });
    $('.day_num').off('click').on('click', function() { 
        if ($(this).hasClass('c_available')){
            if ($('.c_checked').length !== 0) {
                $('.c_checked').removeClass('c_checked');
            }
            $(this).addClass('c_checked');
        }
    })
    $('.time').off('click').on('click', function() { 
        if ($(this).hasClass('m_available')){
            if ($('.m_checked ').length !== 0) {
                $('.m_checked ').removeClass('m_checked ');
            }
            $(this).addClass('m_checked ');
        }       
       
    })
})