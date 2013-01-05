define(['jquery'],
  function ($) {
    var $fiddles, fetchFiddles, placeFiddles;

    $fiddles = $('<section>', {
      'class': 'jsfiddles',
      html: '<h2><a href="http://jsfiddle.net/user/nate/fiddles/">Fiddles</a></h2><p>Examples of idle coding on <a href="http://jsfiddle.net">jsFiddle</a>.</p>'
    });

    if (!$('#jsfiddles').length) {
      return;
    }

    fetchFiddles = function () {
      return $.ajax({
        dataType: 'jsonp',
        data: {
          limit: 5
        },
        url: 'http://jsfiddle.net/api/user/nate/demo/list.json'
      });
    };

    placeFiddles = function (data) {
      //console.log(data);
      var fiddles, $fiddleList;

      fiddles = data.list;
      $fiddleList = $('<ul>');

      $.each(fiddles, function (i, fiddle) {
        var $fiddle, fiddleHtml;

        fiddleHtml = [
          '<a href="',
          fiddle.url,
          '">',
          fiddle.title,
          '</a>'
        ];

        if (fiddle.description) {
          fiddleHtml.push(
            ': ',
            fiddle.description
          );
        }

        fiddleHtml = fiddleHtml.join('');

        $fiddle = $('<li>', {
          html: fiddleHtml
        }).appendTo($fiddleList);
      });

      $fiddleList.appendTo($fiddles);

      $fiddles.appendTo('#jsfiddles');
    };

    $.when(fetchFiddles()).done(placeFiddles);

  }
);
