define(['jquery'], function ($) {
  //console.log('eidogo custom');
  var $player;
  $('body').on('click', '.eidogo-player', function (event) {
    $player = $(event.currentTarget);
  });

  $(document).on('keyup', function (event) {
    if ($player) {
      switch (event.which) {
      case 37:
        $player.find('.back').trigger('click');
        break;
      case 39:
        $player.find('.forward').trigger('click');
        break;
      }
    }
  });

    //window.eidogoConfig = {
      //enableShortcuts: true
    //};
});
