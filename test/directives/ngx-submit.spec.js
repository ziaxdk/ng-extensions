describe("ngxBlur", function () {
  beforeEach(module('ngxSubmit'));
  describe("Submit", function () {

    //TODO: Causes "full page reload!"
    it('should add the class ngx-attempt when form is submitting', inject(function ($compile, $rootScope) {
      $rootScope.submitFn = jasmine.createSpy();

      var element = $compile('<form ngx-submit="submitFn()" onsubmit="return false;"><input type="submit" /></form>')($rootScope);
      $rootScope.$digest();

      element.trigger('submit');
      var hasClazz = element.hasClass('ngx-attempt');
      expect(hasClazz).toBe(true);
      expect($rootScope.submitFn).toHaveBeenCalled();
    }));

  });
});
