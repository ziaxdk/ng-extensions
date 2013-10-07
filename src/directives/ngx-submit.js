(function() {
  'use strict';
  var module = angular.module('ngxSubmit', []);

  module.directive('ngxSubmit', ['$parse', function ($parse) {
    return function (scope, element, attr) {
      var fn = $parse(attr.ngxSubmit);
      element.on('submit', function (event) {
        element.addClass('ngx-attempt');
        scope.$apply(function () {
          fn(scope, { $event: event });
        });
      });
    };
  }]);

}());