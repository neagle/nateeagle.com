var NAE = NAE || {};

(function ($) {

  $(document).ready(function () {
    var $swatch = $('#swatch');

    if ($swatch.length) {
      NAE.swatch = [];
      var i, length;

      for (i = 1, length = $swatch.children('b').length; i <= length; i += 1) {
        NAE.swatch.push($swatch.find('b:nth-child(' + i + ')').css('background-color'));
      }
    }
  });
}(jQuery));
