define(['jquery', 'jquery.transit', 'jquery.imagesloaded', 'jquery.rhythm', 'jquery.throttle-debounce'],
  function ($) {
    /**
     * Fetch photos from Flickr's API
     * @param {object} options Options to pass to Flickr's API.
     * @see http://www.flickr.com/services/api/flickr.photos.search.html
     */
    // constants
    var FLICKR_USERNAME, FLICKR_USER_ID,

      // variables
      $flickr,
      flickrTop,
      $images,

      // functions
      fetchFlickrPhotos, flickrFarmUrl, placePhotos, distributePhotos, bindEvents;

    FLICKR_USERNAME = 'neagle';
    FLICKR_USER_ID = '67659742@N00';

    if (!$('#flickr').length) {
      return;
    }

    fetchFlickrPhotos = function (options) {
      var flickrUrl, defaults;

      flickrUrl = 'https://www.flickr.com/services/rest/';

      defaults = {
        api_key: '90f4e9b590be1fded92ba07410e25856',
        format: 'json',
        media: 'photos',
        method: 'flickr.photos.search',
        page: 1,
        per_page: 4,
        tag_mode: 'any',
        tags: null,
        user_id: FLICKR_USER_ID
      };

      options = $.extend({}, defaults, options);

      return $.ajax({
        dataType: 'jsonp',
        jsonpCallback: 'jsonFlickrApi',
        data: options,
        url: flickrUrl
      });
    };

    /**
     * Construct a URL to a Flickr image based on the data from Flickr's API.
     * @param {object} photo A photo object from Flickr's API
     * @param {string} size The size of the photo you want
     * @see http://www.flickr.com/services/api/misc.urls.html
     */
    flickrFarmUrl = function (photo, size) {
      var photoUrl;

      photoUrl = [
        'https://farm', photo.farm,
        '.static.flickr.com/',
        photo.server, '/',
        photo.id, '_',
        photo.secret, '_',
        size || 'm',
        '.jpg'
      ];

      photoUrl = photoUrl.join('');

      return photoUrl;
    };

    placePhotos = function () {
      var per_page;

      // Check the content property of the container to see how many photos we
      // should display. This allows us to set the number of photos in CSS with
      // media queries.
      per_page = $('#flickr').css('content');
      per_page = per_page.substring(1, per_page.length - 1);

      per_page = parseInt(per_page, 10);

      $.when(
        fetchFlickrPhotos({
          per_page: per_page || 6
          //tags: 'cameroon'
        })
      ).done(
        function (data) {
          var photos;

          // Create a container for our Flickr photos
          $flickr = $('<section>', {
            'class': 'flickr',
            html: '<h2><a href="https://www.flickr.com/photos/' + FLICKR_USERNAME + '/">Flickr</a></h2>'
          });

          photos = data.photos.photo;

          $.each(photos, function (i, item) {
            var $image, imageUrl, imageHtml;

            imageUrl = flickrFarmUrl(item, 'q');

            imageHtml = [
              '<a href="https://www.flickr.com/photos/',
              FLICKR_USERNAME,
              '/',
              item.id,
              '" class="image-link"><img src="',
              imageUrl,
              '" /></a>'
            ];

            imageHtml = imageHtml.join('');

            $image = $('<div>', {
              'class': 'image',
              html: imageHtml
            });

            //$image.css('z-index', i + 1);
            $image.css('z-index', photos.length - i);

            $image.appendTo($flickr);
          });

          $images = $flickr.find('.image');

          //$flickr.appendTo($('.col-3'));

          // Once the images have loaded, distribute them evenly
          $flickr.imagesLoaded(function () {
            // Hide the images initially so we can animate them in
            // You know... to be fancy
            //$images.hide();

            // Add the container to the DOM
            $flickr.appendTo($('#flickr'));

            // The images are all position: absolute, so we need to set the
            // height of the container to accomodate them so elements after it
            // aren't jammed up underneath
            $flickr.height($flickr.height() + $images.first().outerHeight());
            $flickr.rhythm();

            // Position the images to the right side of the container
            //$images.css({
              //left: $flickr.width() - $images.first().width()
            //});

            //$images.fadeIn('fast', function () {
              //// Distribute the photos nicely
              //distributePhotos();
            //});

            // Animate each one in
            //$images.each(function (i, item) {
              //$(item).delay(($images.length - (i - 1)) * 50).fadeIn('fast');
            //});

            // Did you know deferreds were baked into jQuery animations this way?
            // I DIDN'T. So awesome.
            // @see http://api.jquery.com/promise/
            $images.promise().done(function () {
              flickrTop = $images.first().position().top;
              $images.css('top', flickrTop);
              distributePhotos();
              bindEvents();
            });

          });
        }
      );
    };

    distributePhotos = function () {
      var spacing;

      spacing = ($flickr.width() - $images.first().width()) / ($images.length - 1);
      spacing = Math.floor(spacing);

      $images.each(function (i, item) {
        var $item, z;

        $item = $(item);
        z = $item.css('z-index');

        $item.transition({
          left: spacing * ($images.length - z),
          rotate: Math.floor((Math.random() * 10) - 5) + 'deg',
          top: flickrTop
        });
      });
    };

    bindEvents = function () {
      $flickr.on('click', '.image a', function (event) {
        var $link, $image, z;

        $link = $(event.target);
        $image = $link.closest('.image');
        z = $image.css('z-index');

        if (z >= $images.length) {
          return;
        } else {
          event.preventDefault();
          $image.trigger('get');
        }
      });

      $flickr.on('get', '.image', function (event) {
        var $image, z1;

        $image = $(event.currentTarget);
        z1 = parseInt($image.css('z-index'), 10);

        $image.transition({
          left: parseInt($image.css('left'), 10) + 120,
          top: 20,
          rotate: '5deg'
        }, 200, function () {
          $image.css('z-index', $images.length);
          $images.not($image).each(function (i, item) {
            var $item, z2;

            $item = $(item);
            z2 = parseInt($item.css('z-index'), 10);

            if (z2 > z1) {
              $item.css('z-index', z2 - 1);
            }
          });
          distributePhotos();
          //$image.transition({
            //'margin-left': 0,
            //'margin-top': 0
          //});
        });
      });

      $(window).on('resize', $.throttle(500, function () {
        distributePhotos();
      }));
    };

    placePhotos();
  }
);
