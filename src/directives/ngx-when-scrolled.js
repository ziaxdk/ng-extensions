(function() {
  'use strict';
  var module = angular.module('ngxWhenScrolled', []);

  module.directive('ngxWhenScrolled', function() {
    return function(scope, elm, attr) {
      window.onscroll = function (evt) {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 350) {
          scope.$apply(attr.windowWhenScrolled);
        }
      };
    };
  });

}());