$(function(){
  var $cloundList = $('.cloudRecipes .list-wrapper');

  $cloundList.on('touchend', '.items .item-wrap .more', function(){
    var _this = $(this);
    _this.find('i').addClass('ani');
    _this.prev().hide();
    _this.siblings('.title').addClass('ani');
    _this.closest('.item-wrap').next().show();
  })
})
