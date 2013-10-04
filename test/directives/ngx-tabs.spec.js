
// testing controller
describe('ngxTabs', function() {
  beforeEach(module('ngxTabsModule'));

  describe('Tabs', function () {
    var scope,
      html = '<ngx-tabs>' +
          '<ngx-pane title="Tab1"><h1 class="ctn1">ctn1</h1></ngx-pane>' +
          '<ngx-pane title="Tab2"><h1 class="ctn2">ctn2</h1></ngx-pane>' +
        '</ngx-tabs>'
      ;

    beforeEach(inject(function($injector) {
      scope = $injector.get('$rootScope');
    }));
   
    afterEach(function() {
      scope.$destroy();
    });

    it("should have 2 tabs and tab 1 should be selected", inject(function ($compile) {
      var element = $compile(html)(scope);
      scope.$digest();

      expect(element).toHaveClass('ngx-tabs');
      expect($('li', element).size()).toEqual(2);
      expect($('li:first', element)).toHaveClass('ngx-tabs-active');
      expect($('li:first a', element).html()).toEqual('Tab1');
    }));

    it("should contain ctn1 in content when tab 1 is active", inject(function ($compile) {
      var element = $compile(html)(scope);
      scope.$digest();

      expect(element).toHaveClass('ngx-tabs');
      expect($('li', element).size()).toEqual(2);
      expect($('li:first', element)).toHaveClass('ngx-tabs-active');
      expect($('li:first a', element).html()).toEqual('Tab1');
      expect($('.ngx-pane-content h1', element)).toHaveClass('ctn1');
    }));

    it("should contain ctn2 in content when tab2 is clicked and tab 2 is active", inject(function ($compile) {
      var element = $compile(html)(scope);
      scope.$digest();

      $('li:last a', element).trigger('click');

      expect(element).toHaveClass('ngx-tabs');
      expect($('li', element).size()).toEqual(2);
      expect($('li:last', element)).toHaveClass('ngx-tabs-active');
      expect($('li:last a', element).html()).toEqual('Tab2');
      expect($('.ngx-pane-content h1', element)).toHaveClass('ctn2');
    }));
  });
});