$(function(){
  var $cloundList = $('.cloudRecipes .list-wrapper');


  $cloundList.on('touchend', '.items .item-wrap .more', function(){
    var _this = $(this);
    var $configlist = _this.closest('.item-wrap').next();
    if(!_this.attr('flag')){
      _this.attr('flag',true);
      var h = $configlist.height();
      $configlist.css('height', 'auto')
      $configlist.addClass('ani');
      _this.find('i').addClass('ani')
    }else {
      _this.removeAttr('flag');
      $configlist.css('height', '0');
      $configlist.removeClass('ani');
      _this.find('i').removeClass('ani')
    }

  })
})
