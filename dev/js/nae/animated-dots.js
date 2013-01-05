(function ($) {
  console.log('Background canvas is live.');
  var $win = $(window),
    $doc = $(document),
    $header = $('header'),
    $canvas = $('<canvas />'),
    canvas = $canvas[0],
    context = canvas.getContext('2d'),
    offsetFromBottom = $win.height() / 2,
    lines = [],

    // Functions
    createCanvas,
    placeLines,
    drawSpot,
    jitter;


  createCanvas = function () {
    canvas.height = $doc.height();
    canvas.width = $header.width();
    $canvas.css('left', $header.position().left);
    //console.log($header.position());

    $canvas.prependTo($('body'));
  };

  placeLines = function (num, colors) {
    var i,
      line,
      distance = $canvas.width() / (num + 1),
      lines = [];

    colors = colors || [];

    for (i = 0; i < num; i += 1) {
      line = [];
      line.push((i + 1) * distance);
      line.push(colors[i] || 'black');
      lines.push(line);
    }

    return lines;
  };

  drawSpot = function (x, y, size, color) {
    //console.log('drawing spot', x, y, color);
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, size || 2, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
  };

  jitter = function (input, intensity) {
    var jitteredInput;

    intensity = intensity || 1;

    jitteredInput  = input + (Math.random() * intensity) - (intensity / 2);
    jitteredInput = Math.round(jitteredInput);

    return jitteredInput;
  };

  createCanvas();
  lines = placeLines(5, [
    10,
    30,
    50,
    80,
    120
  ]);

  var $brush = $('<div />', { id: 'brush' }).css({
    'position': 'absolute',
    'top': 0,
    'left': 0
  }).appendTo($('body'));

  $brush.on('brush', function (event) {
    $brush.stop().animate({
      top: $win.height() - offsetFromBottom + $win.scrollTop()
      //top: $doc.height()
    }, {
      duration: 10000,
      easing: 'easeOutElastic',
      step: function (y) {
        var i, length;

        y = Math.floor(y);
        for (i = 0, length = lines.length; i < length; i += 1) {
          drawSpot(
            // x
            jitter(lines[i][0], 5),
            y,
            // size
            //jitter(5, 5),
            1,
            // color
            'hsl(' + jitter(lines[i][1], 20) + ', ' + jitter(50, 50) + '%, ' + jitter(50, 10) + '%)'
          );
        }
      }
    });
  });

  //$brush.trigger('brush');

  //$win.on('scroll', function (event) {
    //$brush.trigger('brush');
  //});

}(jQuery));
