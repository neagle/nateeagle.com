define(['jquery'],
  function ($) {
    /*!
     * jQuery rhythm plugin v0.1
     * by Nate Eagle
     *
     * Find out how tall something is. Look at the line-height of the first
     * paragraph tag. Add some extra height to the thing to make it a multiple
     * of the line-height. THERE I PRACTICALLY WROTE THIS PLUGIN AGAIN IN PSEUDO
     * CODE.
     */
    'use strict';

    $.fn.rhythm = function () {
      var $this, rUnit, height, extra;

      $this = this;
      rUnit = $('p:first').first().css('line-height');
      rUnit = parseInt(rUnit, 10);

      height = $this.height();
      extra = rUnit - (height % rUnit);

      $this.height(height + extra);

      return $this;
    };
  }
);
