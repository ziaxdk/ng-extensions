(function() {
  'use strict';
  var module = angular.module('ngxValidate', []);

  module.directive('ngxRemote', ['$http', '$q', function ($http, $q) {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        ngxRemote: '@',
        ngxRemoteValidated: '&',
        ngModel: '='
      },
      link: function (scope, element, attr, ctrl) {
        var url,
          value,
          promise,
          canceler = false;
      
        var validate = function (value) {
          if (canceler) {
            promise.resolve();
          }
          canceler = true;
          promise = $q.defer();
          $http({ url: url, method: 'GET', params: { q: value }, timeout: promise.promise }).success(function (data, status) {
            var res = data === 'true';
            ctrl.$setValidity('ngx-remote', res);
            scope.ngxRemoteValidated({ res: res });
          })["finally"](function () {
            canceler = false;
          });
          return value;
        };

        scope.$watch('ngModel', function (n, o) {
          value = n;
        });

        scope.$watch('ngxRemote', function (val) {
          url = val;
        });

        ctrl.$setValidity('ngx-remote', false);

        element.on('blur', function () {
          if (!value) return;
          validate(value);
        });

        /*var listener = function() {
          var value = element.val();

          if (ctrl.$viewValue !== value) {
            scope.$apply(function() {
              ctrl.$setViewValue(value);
            });
          }
        };*/


        /*ctrl.$render = function() {
          console.log('render', ctrl.$viewValue);
          //element.val(isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
        };*/
        //ctrl.$formatters.push(validate2);
        //ctrl.$parsers.push(validate2);
        //ctrl.$setValidity('ngx-remote', false);
      }
    };
  }]);

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