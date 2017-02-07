/*
*    Author is Nokey -- 木马人
*/

/************   START  MOVIE   ************/

// Assume Parametors
var screenHeight = $(window).height(),
    screenWidth = $(window).width(),
    moving = false,
    p_bar = $('.l-progress-bar'),
    p_txt = $('.l-persent'),
    can_click = false,
    can_next = false,

    center_img_boxs = $('.center-bg-image'),

    _ua = window.navigator.userAgent.toLowerCase(),
    _isMobile = /mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(_ua),
    tap_event_name = _isMobile ? 'touchend' : 'click';

$(window).on('resize', function(event) {
    // every stage height
    screenHeight = $(window).height();
    screenWidth = $(window).width();
    // center images
    centerBgImage(center_img_boxs);
});

/************    Aniamtion    ************/
var
    mountains = $('.mountain-wrap .mountain'),
    mountain_1 = $('#mountain_1'),
    mountain_2 = $('#mountain_2'),
    mountain_3 = $('#mountain_3'),
    mountain_4 = $('#mountain_4'),
    foothill = $('#foothill'),
    seal_flag = $('#seal_flag'),
    seal_open = $('#seal_open'),

    small_monkey = $('#small_monkey'),
    big_monkey = $('#big_monkey'),

    monkey_words = $('#monkey_words'),
    audio1 = document.getElementById('audio1'),

    answer_btn = $('#answer_btn'),

    question_index = 1;

function beforeAnswerAnimation(){
    moving = true;
    // mountain slides
    mountains.each(function(index, el) {
        $(el).addClass('crack');
    });

    seal_flag.addClass('hide');
    seal_open.addClass('hide');
    setTimeout(function(){
        seal_flag.addClass('envisible');
    }, 700);

    foothill.addClass('crack');

    setTimeout(function(){
        small_monkey.css({
            '-webkit-transform': 'scale(0)',
            'transform': 'scale(0)'
        });
    }, 200);

    setTimeout(function(){
        big_monkey.addClass('bounceIn');
    }, 500);
    setTimeout(function(){
        foothill.removeClass('crack');
    }, 500);
    setTimeout(function(){
        monkey_words.removeClass('hide');
        audio1.play();
    }, 1000);
    setTimeout(function(){
        answer_btn.addClass('bounceIn');
    }, 4000);
    setTimeout(function(){
        moving = false;
    }, 4500);
}

function qShow(id, callback){
    var question = $('#question' + id),
        audio = $('#audio_q' + id),
        q_txt_i = question.find('.q-txt-i'),
        q_option_a = question.find('.q'+id+'-option-a'),
        q_option_b = question.find('.q'+id+'-option-b'),
        q_option_c = question.find('.q'+id+'-option-c');

    question.removeClass('envisible');
    q_txt_i.length !== 0 && q_txt_i.addClass('flipInX');
    audio.length !== 0 && audio.get(0).play();

    setTimeout(function(){
        q_option_a.length !== 0 && q_option_a.addClass('flipInX');
    }, 500);
    setTimeout(function(){
        q_option_b.length !== 0 && q_option_b.addClass('flipInX');
    }, 1300);
    setTimeout(function(){
        q_option_c.length !== 0 && q_option_c.addClass('flipInX');
    }, 2100);
    setTimeout(function(){
        callback && callback();
    }, 3500);
}

function qHide(id, callback){
    var question = $('#question' + id),
        q_txt_i = question.find('.q-txt-i'),
        q_option_a = question.find('.q'+id+'-option-a'),
        q_option_b = question.find('.q'+id+'-option-b'),
        q_option_c = question.find('.q'+id+'-option-c'),
        checkmark = question.find('.mark-flag.bounceIn');

    q_txt_i.length !== 0 && q_txt_i.addClass('fadeOutDown');
    checkmark.length !== 0 && checkmark.removeClass('bounceIn');
    setTimeout(function(){
        q_option_a.length !== 0 && q_option_a.addClass('fadeOutDown');
    }, 200);
    setTimeout(function(){
        q_option_b.length !== 0 && q_option_b.addClass('fadeOutDown');
    }, 400);
    setTimeout(function(){
        q_option_c.length !== 0 && q_option_c.addClass('fadeOutDown');
    }, 600);
    setTimeout(function(){
        question.addClass('envisible');
        callback && callback();
    }, 1100);
}

function questionController(index){
    switch(index){
        case 1:
            setTimeout(function(){
                qShow(index, function(){
                    can_click = true;
                });
            }, 800);
            break;
        case 2:
            // Hide prev question
            qHide(index-1, function(){
                // Show current question
                qShow(index, function(){
                    can_click = true;
                });
            });

            break;
        case 3:
            // Hide prev question
            qHide(index-1, function(){
                // Show current question
                qShow(index, function(){
                    can_click = true;
                });
            });
            break;
        case 4:
            // Hide prev question
            qHide(index-1, function(){
                // Show current question
                qShow(index, function(){
                    can_click = true;
                });
            });
            break;
        case 5:
            // Hide prev question
            qHide(index-1, function(){
                // Show random end page
                showEndRandomly();
            });
            break;
    }
}

function randomNum(min, max){  // [min, max]
    return min + Math.floor(Math.random() * (max - min + 1));
}
function showEndRandomly(){
    var randomID = randomNum(1, $('.end-page-wrap').length);
        end_page = $('#end'+ randomID +'_page');
    console.log('randomID'+randomID);

    setTitle(randomID);
    setThumbnail(randomID);

    end_page.removeClass('envisible');

    end_page.find('.end'+ randomID +'-demon-i').addClass('bounceIn');
    end_page.find('.end'+ randomID +'-txt-i').addClass('fadeInUp');
    setTimeout(function(){
        end_page.find('.end'+ randomID +'-money-i').addClass('tada');
    }, 1000);
}
function setTitle(id){
    var title = $('title');
    switch(id){
        case 1:
            title.text('我是白骨精!Click to see how much you know the Monkey King!');
            break;
        case 2:
            title.text('我是佛祖!Click to see how much you know the Monkey King!');
            break;
        case 3:
            title.text('我是唐僧!Click to see how much you know the Monkey King!');
            break;
        case 4:
            title.text('我是猪八戒!Click to see how much you know the Monkey King!');
            break;
    }
}
function setThumbnail(id){
    $('#wx_pic').attr('src', 'images/thumbnail-'+ id +'.jpg');
}

$('.end-money-btn').on(tap_event_name, function(event) {
    $('#share_page').removeClass('hide envisible');
});


// Untie seal
seal_flag.on(tap_event_name, function(event) {
    beforeAnswerAnimation();
});

// Click btn and start answer
$('#answer_btn').on(tap_event_name, function(event) {
    if(!moving){
        // question
        monkey_words.addClass('hide');
        big_monkey.addClass('bounceOutUp');
        foothill.addClass('out');
        $('.cloud2, .cloud3').addClass('hide');

        // Question 'show' animation
        questionController(question_index, 'show');

        answer_btn.addClass('envisible');
    }
});

// Click option and aniamtion next question
$('.q-options').on(tap_event_name, '.q-option', function(event) {
    // The click is not be allowed when animation is running
    if(can_click){
        can_click = false;
        console.log($(this).data('option'));
        var option = $(this),
            opt_type = option.data('result');

        showOptionMark(opt_type, option);

        // if(opt_type === 'R'){
            // Question 'hide' animation
            setTimeout(function(){
                question_index++;
                questionController(question_index);
            }, 1000);
        // }else if(opt_type === 'W'){
        //     setTimeout(function(){
        //         $('.q'+question_index+'-answer')
        //             .removeClass('envisible')
        //             .addClass('bounceIn');
        //         setTimeout(function(){
        //             can_next = true;
        //         }, 800);
        //     }, 500);
        // }
    }
});
function showOptionMark(type, opt){
    var mark = null;
    if(type === 'R'){
        mark = opt.parent().find('.checkmark');
    }else if(type === 'W'){
        mark = opt.parent().find('.cross');
    }
    mark.css({
        'left': parseInt(opt.css('left'))-20+'px',
        'top': opt.css('top')
    });
    mark.addClass('bounceIn');
}


/**
 * Preload.js
 */
var indexID = 0,
    pre_files = [],
    loader = new createjs.LoadQueue(),

    assetPath = './music/',
    sounds = [
        {src: 'p-1.mp3', id: 'p-1'},
        {src: 'q1.mp3', id: 'q1'},
        {src: 'q2.mp3', id: 'q2'},
        {src: 'q3.mp3', id: 'q3'},
        {src: 'q4.mp3', id: 'q4'},
        {src: 'introduce.mp3', id: 'introduce'}
    ],
    bgm_instance = null,

    intro_timer = null,
    intro_bgm = null;

// add preload images
$('#content').find('img').each(function(i, e){
    pre_files.push({
        "id": "img" + indexID++,
        "src": $(e).attr('src')
    });
});

// add preload audios
for (var i = 0; i < sounds.length; i++) {
    pre_files.push({
        "id": "audio" + indexID++,
        "src": assetPath + sounds[i].src
    });
}

createjs.Sound.alternateExtensions = ["mp3"];

loader.installPlugin(createjs.Sound);
loader.addEventListener("complete", handleComplete);
loader.addEventListener('progress', handleProgress);
loader.addEventListener('error', handleError);
loader.loadManifest(pre_files);
createjs.Sound.registerSounds(sounds, assetPath);
function handleComplete(){
    console.log('Preload complete.');
    // center images
    centerBgImage(center_img_boxs);

    // hide loading
    var loading = $('.loading-wrap');
    loading.addClass('fadeOut');
    setTimeout(function(){
        loading.css('display', 'none');

        loopIntro();
        intro_bgm = createjs.Sound.play('introduce', {interrupt: createjs.Sound.INTERRUPT_ANY});
        intro_timer = setTimeout(function(){
            $('#introduce_wrap').addClass('fadeOut');
            setTimeout(function(){
                $('#introduce_wrap').css('display', 'none');
            }, 200);
        }, 18500);
    }, 200);

}
function handleProgress(e){
    var num = Math.floor(e.progress * 100);
    console.log(num);
    p_bar.css('width', num + '%');
    p_txt.text(num + '%');
}
function handleError(e){
    console.error(e.title);
    console.dir(e.data);
}
$('#jump_intro').on(tap_event_name, function(event) {
    intro_bgm.stop();
    clearTimeout(intro_timer);
    $('#introduce_wrap').addClass('fadeOut');
    setTimeout(function(){
        $('#introduce_wrap').css('display', 'none');
    }, 200);
});

// Show intro texts
var
    intro_txts = $('.intro-txt'),
    intro_index = 0,
    intro_txt_dis = screenHeight * 0.8;

function loopIntro(){ // seven txts
    if(intro_index < intro_txts.length){
        intro_txts
            .eq(intro_index++)
            .addClass('introBounceIn');
        setTimeout(function(){
            loopIntro();
        }, 3000);
    }
}



/***************    Tools     *****************/

// stop html swipe
$(document).on('touchmove', function(e){
    e.preventDefault();
});
// center image box
function centerBgImage(img_boxs){
    // use 'background-image' to improve aniamtion performance
    img_boxs.each(function(i) {
        var box = $(this),
            box_w = box.width(),
            box_h = box.height(),
            img_w = parseInt(box.attr('data-img-w')),
            img_h = parseInt(box.attr('data-img-h')),
            box_ratio = box_w / box_h,
            img_ratio = img_w / img_h;

        img_ratio > box_ratio ?
            box.css({
                'background-size': 'auto 105%'
            }) :
            box.css({
                'background-size': '105% auto'
            }) ;

    });
}
