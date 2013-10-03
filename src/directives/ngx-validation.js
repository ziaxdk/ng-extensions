(function() {
  'use strict';
  var module = angular.module('ngxValidate', []);

  module.directive('ngxRemote', ['$http', '$q', '$parse', function ($http, $q,  $parse) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attr, ctrl) {
        var url,
          promise,
          canceler = false,
          callback = $parse(attr.ngxRemoteValidated)
          ;

      
        var validate = function (value) {
          if (canceler) {
            promise.resolve();
          }
          canceler = true;
          promise = $q.defer();
          $http({ url: url, method: 'GET', params: { q: value }, timeout: promise.promise }).success(function (data, status) {
            var res = data === 'true';
            ctrl.$setValidity('ngx-remote', res);
            //element.addClass('ngx-remote-'+ res +'-validated');
            //element.removeClass('ngx-remote-' + !res + ' -validated');
            callback(scope, { res: res });
          })["finally"](function () {
            canceler = false;
          });
          return value;
        };

        attr.$observe('ngxRemote', function (val) {
          url = val;
        });

        ctrl.$setValidity('ngx-remote', false);

        element.on('blur', function () {
          var value = element.val();
          if (!value) return;
          validate(value);
        });
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

  module.directive('ngxSafePlaceholder', [function () {
    return function (scope, element, attr) {
      if ('placeholder' in document.createElement('input')) return; // Browser supports placeholder natively
      element.on('focus', function () {
        var currentValue = $(this).val(),
            placeholderValue = $(this).attr('placeholder');

        if (currentValue === placeholderValue) {
            $(this).val('');
        }
      });
    };
  }]);

  module.directive('ngxLegacyPlaceholder', [function () {
    return function (scope, element) {
      if('placeholder' in document.createElement('input')) return;
      $(element).placeholder();
    };
  }]);

}());