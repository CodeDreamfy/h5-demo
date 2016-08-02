$(function(){
  var $machineStatus = $('.machine-status');
  var $mStatusContent = $machineStatus.find('.machine-content');
  var $machineWorkMode = $('.machine-workmode');
  var dpRem = parseInt($('html').css('fontSize')); //单位rem
  var h = ($mStatusContent.height()/dpRem).toFixed(6);
  $mStatusContent.find('.contwrap').css('height', h+'rem');
  $machineStatus.on('touchend', '.arrow', function(){
    var _this = $(this);
    var $contwrap = $mStatusContent.find('.contwrap');
    if(!_this.attr('flag')){
      _this.attr('flag', true);
      _this.find('i').addClass('slide')
      $contwrap.css({
        height: 0
      });
      $contwrap.addClass('slide')
    }else {
      _this.removeAttr('flag');
      _this.find('i').removeClass('slide');
      $contwrap.css('height', h+'rem');
      $contwrap.removeClass('slide')
    }

  })
  var mySwiper = new Swiper('.swiper-container', {
    slidesPerView : 4,
  });
  initUislide(eq1);


  $machineWorkMode.on('touchend', '.swiper-wrapper .swiper-slide', function(){
    var _this = $(this), _index = _this.index();
    _this.addClass('active').siblings().removeClass('active')
    switch(_index){
      case 0: initUislide(eq1); break;
      case 1: initUislide(eq2); break;
      case 2: initUislide(eq3); break;
      case 3: initUislide(eq4); break;
      case 4: initUislide(eq5); break;
      default: open();
    }


  })
  function initUislide(obj){
    $('.machine-turn').children().each(function(i,e){
      $(e).Uislidebar(obj[i]);
    });
  }

  function open(){
    window.open('/cloundlist','_self')
  }

  function basiceUislide(){
    var $uiSlideCont = $('.ui-slide-cont');
    var $uiBtn = $('.ui-slider-handle', $uiSlideCont);
    var o = {
      min: 0,
      max: 6,
      desc: ['夜间', '低档', '中档', '高档', '喷射', '自动']
    }

    var Width = $uiSlideCont.width();  //注意使用$.css('width')与$.width()的区别
    var moveStart,move,moveEnd;
    var winFont = parseInt($('html').css('fontSize'));
    var ml = $('.ui-slider-bar').position().left;  //距离左边的距离

    $uiBtn.find('span').text(o.desc[0]);
    //touchstart/touchend/touchmove
    $uiSlideCont.on('touchstart', '.ui-slider-bar', function(e){
      var g = e.originalEvent.touches[0];
      var s = range(g.pageX - ml);
      $uiBtn.stop(true, true).animate({left: correct(s).left}, 300);
      $uiBtn.find('span').text(o.desc[correct(s).site])

    }).on('touchstart', '.ui-slider-handle', function(e){
      var g = e.originalEvent.touches[0];
      moveStart = g.pageX - ml;
    }).on('touchmove', '.ui-slider-handle', function(e){
      var g = e.originalEvent.touches[0];
      moveEnd = g.pageX - ml;
      var distance = range(moveEnd);
      var _this = $(this);
      _this.stop(true,true).animate({left: distance}, 0);
      _this.find('span').text(o.desc[correct(distance).site])
      event.preventDefault();
    }).on('touchend', '.ui-slider-handle', function(e){
      var g = e.originalEvent.changedTouches[0];
      moveEnd = g.pageX - ml;
      var distance = range(moveEnd);
      var _this = $(this);
      _this.stop(true,true).animate({left: correct(distance).left}, 300);
      _this.find('span').text(o.desc[correct(distance).site])
      event.preventDefault();
    })

    var init = function(){
      $uiSlideCont.find('.ui-slider-handle').css('left',0);
      $uiSlideCont.find('.ui-slider-range').css('width',0);
      $uiSlideCont.find('.ui-slider-spot').empty();
      for(var i=0; i<o.max-1; i++){
        var $item = $('<div class="stalls-item pit"><b></b></div>');
        if(i==0){
          $item.addClass('stalls-item-first').append('<b class="b1"></b>');
        }
        $uiSlideCont.find('.ui-slider-spot').append($item);
      };
      for(var i=0; i<o.desc.length; i++){
        var $itemDesc = $('<div class="ui-slider-desc">'+o.desc[i]+'</div>')
        $uiSlideCont.find('.ui-slider-xlabel').append($itemDesc);
      }

    }
    init();

    //判断是否出界
    function range(d){
      if(d <= 0){
        d = 0;
      }else if(d >= Width){
        d = Width;
      }
      // console.log(d/winFont);
      return d;
    }
    //就近归位
    function correct(d){
      if(!d){
        d = 0;
      }
      var len = $('.ui-slider-spot').children().length; //存在几档
      var w = Width/len; //单位长度
      var integer = (d/w).toFixed(2);
      var t = Math.round(integer);
      var o = {
        left: ((t*w)/winFont).toFixed(6) + 'rem',
        site: t
      }
      return o;
    }

  };

})
