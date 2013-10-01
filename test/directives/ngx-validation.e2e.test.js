describe("index.html", function() {

  it('should contain a "title" with ngx-remote-validate, just for the fun of it', function() {
    browser().navigateTo("/index.html");
    expect(element('title').text()).toBe("ngx-validation e2e tests");
  });


  it('test', function() {
    browser().navigateTo("/index.html");
    input('c.value').enter('true');
    //element(':submit').click();
    //console.log(element('input:type'));
    //console.log(element('input:type').count());

  });


});