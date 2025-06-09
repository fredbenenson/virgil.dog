$(function() {
  var animationPaused = false;
  var currentAnimation = null;
  var photoCarousel = null;

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
  if (animationPaused) return;

  destroy();
  setup();

  currentAnimation = $(".virgil").transition({
      scale: [23, 23],
      rotate3d: [0,0,1,'-9.5deg'],
      duration: 5000,
      easing: 'easeInCubic',
      complete: function() {
        if (!animationPaused) {
          recur_virgil();
        }
      }
    });
  $('.small_virgil img').transition({
    opacity: 1.0,
    duration: 3000
  })

  }

  // Photo carousel functionality
  var loadPhotos = function() {
    var photos = [
      'photos/0AE48E12-20DE-41DE-AEAD-74E72906322E_1_105_c.jpeg',
      'photos/1119BB8A-D07A-4C02-B8B9-B5AE856A3F7D_1_105_c.jpeg',
      'photos/180120A8-AF67-41C5-BE88-301149430253_1_105_c.jpeg',
      'photos/19AF8599-53AF-4121-A606-5631AF2DF53A_1_105_c.jpeg',
      'photos/1A2885D0-A175-4D15-A8CE-A5CF9A293F5D_1_105_c.jpeg',
      'photos/1D57B78B-1BE8-4799-BED5-898D6FC436DA_1_105_c.jpeg',
      'photos/2322E0F2-8DFD-46CC-8370-2EDF578F6C9B_1_102_o.jpeg',
      'photos/2AD61084-EE24-4399-9956-4358176668FA_1_105_c.jpeg',
      'photos/34434A07-F998-4C90-93C6-1C055A018867_1_105_c.jpeg',
      'photos/3614CF8B-2E4F-4A0D-A110-DDB91FC446F0_1_105_c.jpeg',
      'photos/3646EF4F-C531-4108-9D87-C9A3ACC16A3F_1_105_c.jpeg',
      'photos/36FF27F8-D528-4253-A5D2-A100939D4FA5_1_105_c.jpeg',
      'photos/3CD2376C-3029-4299-9247-E8B6DE9CDAD0_1_105_c.jpeg',
      'photos/4C73F178-3E18-46AC-886F-8F4E766C09BE_1_105_c.jpeg',
      'photos/550AEE3A-8574-402C-B746-D1D295A89075_1_105_c.jpeg',
      'photos/5D19D8A4-517B-4AA7-86ED-6476E8AFD396_1_105_c.jpeg',
      'photos/725E64C6-2070-4CC3-9D94-AC84FF808EA8_1_105_c.jpeg',
      'photos/96D19B38-5130-40F4-94B2-5C3A2ABD3ADE_1_105_c.jpeg',
      'photos/96EF9396-C8FB-4C08-8084-72A970095462_1_105_c.jpeg',
      'photos/A763984F-2840-4435-B931-594EEB729C28_1_105_c.jpeg',
      'photos/B333AE0F-5E42-47DE-8D9F-D94552098A08_1_105_c.jpeg',
      'photos/BCAFDBD2-E7A1-4401-8D46-C97ECE4736C6_1_105_c.jpeg',
      'photos/D5A5C0FB-5245-497E-830E-785B3F574E45_1_105_c.jpeg',
      'photos/E40209A1-2DFF-4AC2-9019-3581589C26FE_1_105_c.jpeg',
      'photos/E59930C4-C580-42AB-8564-D0B61E4F7B3F_1_105_c.jpeg',
      'photos/F691FC77-9DE7-487E-87C8-2F0F49FF70C9_1_105_c.jpeg'
    ];
    
    var wrapper = $('#carousel-wrapper');
    wrapper.empty();
    
    photos.forEach(function(photo) {
      var slide = $('<div class="swiper-slide"><img src="' + photo + '" alt="Virgil Photo"></div>');
      wrapper.append(slide);
    });
  };

  var initCarousel = function() {
    loadPhotos();
    
    photoCarousel = new Swiper('.photo-carousel', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      keyboard: {
        enabled: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  };

  var showCarousel = function() {
    animationPaused = true;
    $('.virgil').stop(true, false);
    $('#photo-carousel-modal').addClass('active');
    if (!photoCarousel) {
      initCarousel();
    }
  };

  var hideCarousel = function() {
    $('#photo-carousel-modal').removeClass('active');
    animationPaused = false;
    recur_virgil();
  };

  // Event listeners
  $('#virgil-name').on('click', showCarousel);
  $('.carousel-close').on('click', hideCarousel);
  
  // Close carousel when clicking outside
  $('#photo-carousel-modal').on('click', function(e) {
    if (e.target === this) {
      hideCarousel();
    }
  });

  // Close carousel with Escape key
  $(document).on('keydown', function(e) {
    if (e.key === 'Escape' && $('#photo-carousel-modal').hasClass('active')) {
      hideCarousel();
    }
  });

  recur_virgil();

});
