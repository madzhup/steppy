# steppy

```javascript
var slides = $('.slides').steppy({
  itemSelector: '.slide', //Selecor for child slides
  startIndex: 0, //Index of element to show first
  time: 500, //Animation time
  disableAnimation: false, //Enable/Disable animation (only css classes added)
  enableScroll: true, //Enable/Disable animation on scroll
  visibleClass: 'show', //CSS class for visible elements
  rollInClass: 'show-in', //CSS class for roll in element
  rollOutClass: 'show-out', //CSS class for roll out element
  overClass: 'up', //CSS class for over element(higher z-index)
  underClass: 'down', //CSS class for under element(lower z-index)
  beforeRoll: function(c, n){
    //Do something before animation
  },
  afterRoll: function(c, n){
    //Do something after animation
  }
}).data('steppy'); //Get instance methods

//Slide to element (index)
slides.slideTo(1);
```
