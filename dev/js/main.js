requirejs.config({
  paths: {
    'jquery': 'lib/jquery/jquery-1.8.2',
    'jquery.transit': 'lib/jquery/jquery.transit',
    'jquery.imagesloaded': 'lib/jquery/jquery.imagesloaded',
    'jquery.rhythm': 'lib/jquery/jquery.rhythm',
    'jquery.throttle-debounce': 'lib/jquery/jquery.ba-throttle-debounce'
  }
});

requirejs([
    'nae/flickr',
    'nae/jsfiddles',
    'nae/stackoverflow'
  ], function ($) {
    console.log('js is a go!');
  }
);
