$(function(){
  var $machineStatus = $('.machine-status');
  var $mStatusContent = $machineStatus.find('.machine-content');
  var $machineWorkMode = $('.machine-workmode');

  $machineStatus.on('click', '.arrow', function(){
    var _this = $(this);
    _this.find('i').toggleClass('deg');
    $mStatusContent.toggle();
  })

  var mySwiper = new Swiper('.swiper-container', {
    slidesPerView : 4,
  });


  +function(){
    var $uiSlideCont = $('.ui-slide-cont');
    var w = $uiSlideCont.width();
    var o = {
      min: 0,
      max: 6
    }
    var init = function(){
      $uiSlideCont.find('.ui-slider-handle').css('left',0);
      $uiSlideCont.find('.ui-slider-range').css('width',0);
      $uiSlideCont.find('.ui-slider-spot').empty()
      for(var i=0; i<o.max-1; i++){
        var $item = $('<div class="stalls-item"></div>');
        $uiSlideCont.find('.ui-slider-spot').append($item)
      }
    }
    init();

  }()

})
