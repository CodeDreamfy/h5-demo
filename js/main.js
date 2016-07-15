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
  })

})
