(function () {
  'use strict';
  var module = angular.module('ngxClaps', []);

  module.directive("ngxClaps", function() {
    return {
      restrict: "A",
      template: "<div>" +
        "<div ng-click='toggle()' class='clapsTitle' ng-class='{clapsOpen: isOpen, clapsClosed: !isOpen}'>{{claps}}</div>" +
        "<div ng-show='isOpen' class='clapsBody' ng-transclude></div>" +
        "</div>",
      replace: true,
      transclude: true,
      scope: {
        claps: "@",
        isOpen: "@clapsIsOpen"
      },
      link: function(scope, elm, attrs) {
        attrs.$observe('clapsIsOpen', function(value) {
          if (!value) {
            scope.isOpen = true;
            return;
          }
          scope.isOpen = value === "true";
        });
        scope.toggle = function() {
          scope.isOpen = !scope.isOpen;
        };
      }
    };
  });

}());