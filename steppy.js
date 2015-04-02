(function($){

  $.fn.steppy = function(options){
    var opts = $.extend({
      itemSelector: '.slide',
      startIndex: 0,
      time: 500,
      disableAnimation: false,
      enableScroll: true,
      visibleClass: 'show',
      rollInClass: 'show-in',
      rollOutClass: 'show-out',
      overClass: 'up',
      underClass: 'down',
      beforeRoll: function(c, n){

      },
      afterRoll: function(c, n){

      }
    }, options);

    var waitTime = 1000;

    this.each(function(){
      var that = $(this);
      var slides = that.find(opts.itemSelector);
      var inAction = false;
      var currentSlide = slides.eq(opts.startIndex);
      var H = new Hammer(this);

      H.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

      currentSlide.addClass([
        opts.overClass,
        opts.visibleClass
      ].join(' '));

      if(opts.enableScroll){
        function doOnScroll(e){
          console.log(e.type);
          if(!inAction){
            if(e.deltaY < 0){
              slideTo(currentSlide.index() + 1);
            } else {
              slideTo(currentSlide.index() - 1);
            }
          }
        }

        that.on('mousewheel', function(e){
          waitTime = 1000;
          doOnScroll(e);
        });

        H.on('swipe', function(e){
          waitTime = 0;
          doOnScroll(e);
        });
      }

      that.data('steppy', {
        slideTo: slideTo
      });

      function slideTo(step){
        if(step < 0 || step >= slides.size()){
          return;
        }

        var animWay = -100;
        var slide = slides.eq(step);
        var moveSlide = currentSlide;

        if(currentSlide.index() === slide.index()){
          return;
        }

        inAction = true;

        if(currentSlide.index() > slide.index()){
          animWay = 0;
          slide.css({top: '-100%'});
          moveSlide = slide;
          currentSlide.addClass(opts.underClass).removeClass(opts.overClass);
          slide.addClass(opts.overClass).removeClass(opts.underClass);
        } else {
          currentSlide.addClass(opts.overClass).removeClass(opts.underClass);
          slide.addClass(opts.underClass).removeClass(opts.overClass);
        }

        currentSlide.addClass(opts.rollOutClass);
        slide.addClass([
          opts.visibleClass,
          opts.rollOutClass
        ].join(' '));

        opts.beforeRoll(currentSlide, slide);
        slides.trigger('steppy:start', [currentSlide, slide]);

        if(opts.disableAnimation){
          setTimeout(function(){
            animate()
          }, opts.time);
        } else {
          moveSlide.animate({top: animWay + '%'}, opts.time, animate);
        }

        function animate(){
          currentSlide.removeClass([
            opts.overClass,
            opts.underClass,
            opts.visibleClass,
            opts.rollOutClass
          ].join(' '));

          slide.removeClass([
            opts.rollInClass,
            opts.underClass
          ].join(' '))
          .addClass(opts.overClass);

          opts.afterRoll(currentSlide, slide);
          slides.trigger('steppy:finish', [currentSlide, slide]);

          currentSlide = slide;

          setTimeout(function(){
            inAction = false;
          }, waitTime);
        }
      }
    });

    return this;
  }

})(jQuery);
