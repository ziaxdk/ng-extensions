(function() {
  'use strict';
  var module = angular.module('ngxBlur', []);

  module.directive('ngxValidationBlur', [function () {
    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        var clazz = attr["ngxValidationBlur"] || 'ngx-blur';
        element.on('blur', function () {
          if (element.hasClass(clazz)) return;
          element.addClass(clazz);
        });
      }
    };
  }]);

}());
