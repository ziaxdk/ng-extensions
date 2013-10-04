(function () {
  'use strict';
  var module = angular.module('ngxTabsModule', []);

  var supports_html5_storage = function () {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  };

  module.directive("ngxTabs", ['$window', function ($window) {
    return {
      controllerAs: 'pc',
      restrict: 'E',
      template: '<div class="ngx-tabs"><ul>' +
      '<li ng-repeat="p in pc.panes" ng-class="{\'ngx-tabs-active\': p.active}">' +
      '<a href="#" ng-click="pc.select(p)">{{p.title}}</a>' +
      '</li></ul>' +
      '<div class="ngx-tabs-content" ng-transclude></div></div>',
      replace: true,
      transclude: true,
      controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
        var shouldRemeber = function () {
          return $attrs.rememberKey && supports_html5_storage();
        };

        var storePane = function (pane) {
          //$window.localStorage[$attrs.rememberKey] = pane.title;
          $window.localStorage.setItem($attrs.rememberKey, pane.title);
        };
        var getPane = function () {
          if (!shouldRemeber()) return;
          return $window.localStorage[$attrs.rememberKey];
        };

        this.panes = [];

        this.addPane = function (ngxPane) {
          this.panes.push(ngxPane);
          if (this.panes.length == 1) ngxPane.active = true;
          if (shouldRemeber()) this.select({ title: getPane() });
        };

        this.select = function (pane) {
          angular.forEach(this.panes, function (p) {
            p.active = p.title == pane.title;
          });
          if (shouldRemeber()) storePane(pane);
        };
      }]
    };
  }]);

  module.directive("ngxPane", [function () {
    return {
      restrict: 'E',
      replace: true,
      require: '^ngxTabs',
      scope: { title: '@' },
      template: '<div class="ngx-pane-content" style="clear: both" ng-class="{\'ngx-pane-content-active\': active}" ng-transclude></div>',
      transclude: true,
      link: function (scope, element, attr, ngxTabs) {
        ngxTabs.addPane(scope);
      }
    };
  }]);


}());