
// testing controller
describe('ngxValidate', function() {
  beforeEach(module('ngxValidate'));

  describe('Remote', function () {
    var hb,
      html = '<input type="text" ng-model="model.value" ngx-remote="{{model.url}}" ngx-remote-validated="model.callback(res);" />',
      scope;

    beforeEach(inject(function($injector) {
      hb = $injector.get('$httpBackend');
      scope = $injector.get('$rootScope');
      scope.model = {};
      scope.model.url = '/dummy';
      scope.model.callback = jasmine.createSpy('callback');
    }));
   
    afterEach(function() {
      hb.verifyNoOutstandingExpectation();
      hb.verifyNoOutstandingRequest();
      expect(scope.model.callback).toHaveBeenCalled();
      scope.$destroy();
    });


     // Single element
    it('should have ng-invalid-ngx-remote when getting false', inject(function ($compile) {
      // Element
      scope.model.value = 'false';
      var element = $compile(html)(scope);
      hb.whenGET('/dummy?q=false').respond('false');

      scope.$digest();
      // Execute
      element.trigger('blur');
      hb.flush();
      // Expect
      expect(element).toHaveClass('ng-invalid-ngx-remote');
    }));

    it('should have ng-valid-ngx-remote when getting true', inject(function ($compile) {
      // Element
      scope.model.value = 'true';
      var element = $compile(html)(scope);
      hb.whenGET('/dummy?q=true').respond('true');

      scope.$digest();
      // Execute
      element.trigger('blur');
      hb.flush();
      // Expect
      expect(element).toHaveClass('ng-valid-ngx-remote');
    }));

    // Multiple blur on events
    it('should only issue one server request, when multiple blur events occur', inject(function ($compile) {
      
      scope.model.value = 'false';
      var element = $compile(html)(scope);
      hb.whenGET('/dummy?q=true').respond('true');
      hb.whenGET('/dummy?q=false').respond('false');

      scope.$digest();
      element.trigger('blur');
      scope.model.value = 'true';
      scope.$digest();
      element.trigger('blur');

      hb.flush();

      expect(element).toHaveClass('ng-valid-ngx-remote');
    }));


  });

  describe("Blur", function () {

    it('should add a default className when none is specified', inject(function ($compile, $rootScope) {
      var element = $compile('<input type="text" ng-model="value" ngx-validation-blur />')($rootScope);
      element.trigger('blur');

      var hasClazz = element.hasClass('ngx-blur');
      expect(hasClazz).toBe(true);
    }));

    it('should add a "benny" className when "benny" is specified', inject(function ($compile, $rootScope) {
      var element = $compile('<input type="text" ng-model="value" ngx-validation-blur="benny" />')($rootScope);
      element.trigger('blur');

      var hasClazz = element.hasClass('benny');
      expect(hasClazz).toBe(true);
    }));

  });

  describe("Submit", function () {

    it('should add the class ngx-attempt when form is submitting', inject(function ($compile, $rootScope) {
      var scope = $rootScope;
      scope.submitFn = jasmine.createSpy();
      var element = $compile('<form ngx-submit="submitFn()" action=""><input type="submit" /></form>')(scope);
      scope.$digest();

      element.trigger('submit');
      var hasClazz = element.hasClass('ngx-attempt');
      expect(hasClazz).toBe(true);
      expect(scope.submitFn).toHaveBeenCalled();
    }));

  });

});