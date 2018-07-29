$(document).ready(function(){

  // MODAL
  var modalText = {
    roambi: {
      title: 'Pixfam.com',
      tag: 'EVENT PHOTO SHARING APP',
      detail: "Pixfam is a photo sharing mobile application that organizes photos taken by event's participants in one place.",
      link: 'https://play.google.com/store/apps/details?id=com.pixfam'
    },
    walker: {
      title: 'Past Questions Chat Bot',
      tag: 'ALOC Lite.',
      detail: 'We bring chat and game experience into learning for young school learners. Our solution keeps student engaged as they prepare for their various exams. With our app, learning is guaranteed to be fun.',
      link: 'https://play.google.com/store/apps/details?id=ng.aloc.lite'

    },
    powur: {
      title: 'JAMB CBT Games',
      tag: 'LEARN WITH FUN; PLAY FOR GLORY.',
      detail: 'Virtual Academic Games CBT practice platform for all students seeking university admission in Nigeria. Other cool features include M-Chats, Talk Zone, Friend finder, Predict & win and various Academic Games mode like Solo, Sage, Brag Arena.',
      link: 'https://play.google.com/store/apps/details?id=com.magbodo.aloc'
    },
    mystand: {
      title: 'Magbodo',
      tag: 'DON"T GET ZEROS.',
      detail: "Magbodo (Don't get Zeros) is an adventure based CBT practice platform with an engaging game story that unravels as students’ progresses in game levels. We use gaming concepts to increase student practice time and grade. Hey! Still wondering what we do? We make learning fun, reward witty performance and academic excellence is the new cool",
       link: 'http://magbodo.com'
    },
    never: {
      title: 'Git Hub',
      tag: 'PROJECTS IN PUBLIC SPACE.',
      detail: 'You can view my contribution in the public space of software developement.',
      link: 'https://github.com/Seunope'

    },
    themall: {
     title: 'ALOC',
      tag: 'Academic League of Champions.',
      detail: 'ALOC is an adventure based CBT practice platform with an engaging game story that unravels as students’ progresses in game levels. We use gaming concepts to increase student practice time and grade.',
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('./app/img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
              
    });
  }
})
