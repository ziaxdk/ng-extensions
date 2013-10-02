
// testing controller
describe('ngxClaps', function() {
  beforeEach(module('ngxClaps'));

  describe('Claps', function () {
    var scope,
      html = '<div ngx-claps><h1 class="h1">Hello</h1></div>'
      ;

    beforeEach(inject(function($injector) {
      scope = $injector.get('$rootScope');
    }));
   
    afterEach(function() {
      scope.$destroy();
    });


    it('should have classes', inject(function ($compile) {
      var element = $compile(html)(scope);
      scope.$digest();

      expect(element).toHaveClass('ng-scope'); // New scope
      expect(element.children()).toHaveClass('clapsBody');
    }));

    it('should have clapsOpen class', inject(function ($compile) {
      var element = $compile(html)(scope);
      scope.$digest();

      expect(element.children()).toHaveClass('clapsOpen'); // Open by default
    }));

    it('should have clapsClosed class when clicked', inject(function ($compile) {
      var element = $compile(html)(scope);
      scope.$digest();

      element.children().trigger('click');
      expect(element.children()).toHaveClass('clapsClosed'); // Closed when clicked
    }));

    it('should have clapsClosed class when clicked', inject(function ($compile) {
      var element = $compile(html)(scope);
      scope.$digest();

      expect($('h1', element)).toHaveClass('h1');
    }));
  });
});