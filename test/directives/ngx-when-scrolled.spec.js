describe("ngxWhenScrolled", function () {
  beforeEach(module('ngxWhenScrolled'));

  it('should add a default className when none is specified', inject(function ($compile, $rootScope) {
    var scope = $rootScope;
    scope.model = {};
    scope.model.callback = jasmine.createSpy('callback');

    var element = $compile('<div style="height: 500px" ngx-when-scrolled="model.callback()"></div>')($rootScope);

    scope.$digest();

    console.log(element.scroll())
    //element.scroll(490);

    expect(scope.model.callback).toHaveBeenCalled();


  }));


});
