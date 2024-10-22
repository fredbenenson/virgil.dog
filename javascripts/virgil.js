$(function() {

  var setup = function() {

    virgil = $('<div/>')

    background_virgil = virgil.clone()
    big_virgil = virgil.clone()
    small_virgil = virgil.clone()

    virgil_image = $('<img/>')
    virgil_image.attr('src', 'images/virgil_recurred.jpg')

    virgil.attr('class', 'virgil')
    virgil.appendTo('body');

    background_virgil.attr('class', 'background_virgil')
    background_virgil.appendTo(virgil);
    background_virgil_image = virgil_image.clone()
    background_virgil_image.appendTo(background_virgil);

    big_virgil.attr('class', 'big_virgil')
    big_virgil.appendTo(virgil);
    big_virgil_image = virgil_image.clone();
    big_virgil_image.appendTo(big_virgil);

    small_virgil.attr('class', 'small_virgil')
    small_virgil.appendTo(virgil);
    small_virgil_image = virgil_image.clone()
    small_virgil_image.appendTo(small_virgil);

  }

var destroy = function() {
  $('.virgil').remove();
}

var recur_virgil = function() {

  destroy();
  setup();

  $(".virgil").transition({
      scale: [23, 23],
      rotate3d: [0,0,1,'-9.5deg'],
      duration: 5000,
      easing: 'easeInCubic',
      complete: function() {
        recur_virgil();
      }
    });
  $('.small_virgil img').transition({
    opacity: 1.0,
    duration: 3000
  })

  }

  recur_virgil();

});

