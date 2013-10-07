describe("ngxBlur", function () {
  beforeEach(module('ngxBlur'));

  it('should add a default className when none is specified', inject(function ($compile, $rootScope) {
    var element = $compile('<input type="text" ng-model="value" ngx-validation-blur />')($rootScope);
    element.trigger('blur');

    $rootScope.$digest();
    var hasClazz = element.hasClass('ngx-blur');
    expect(hasClazz).toBe(true);
  }));

  it('should add a "benny" className when "benny" is specified', inject(function ($compile, $rootScope) {
    var element = $compile('<input type="text" ng-model="value" ngx-validation-blur="benny" />')($rootScope);
    element.trigger('blur');

    $rootScope.$digest();
    var hasClazz = element.hasClass('benny');
    expect(hasClazz).toBe(true);
  }));

});
