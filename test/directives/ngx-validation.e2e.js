describe("ngx-validation.e2e.html", function() {

  it('should contain a "title" with ngx-remote-validate, just for the fun of it', function() {
    browser().navigateTo("/e2e/ngx-validation.e2e.html");
    expect(element('title').text()).toBe("ngx-validation e2e tests");
  });

});