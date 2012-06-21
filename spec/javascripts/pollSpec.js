describe('poll form', function() {
  var dom;

  beforeEach(function() {
    dom = fakeDom();
    makeCandidateSelectable(dom);
  });

  it('should allow candidate selection', function() {
    dom.avatars().trigger('click');
    expect(dom.selected().val()).toBe('99');
  });

  it('should keep the submit button disabled by default', function() {
    expect(dom.submit().attr('disabled')).toBeTruthy();
    expect(dom.submit().val()).toBe('Escolha um candidato');
  });

  it('should enable the submit button after selection', function() {
    dom.avatars().trigger('click');
    expect(dom.submit().attr('disabled')).toBeFalsy();
    expect(dom.submit().val()).toBe('Envie seu voto agora');
  });

  function fakeDom() {
    var avatars = $('<div><div data-id="99"></div></div>');
    var selected = $('<input value="">');
    var submit = $('<input disabled value="Escolha um candidato">');
    return {
      avatars: function(){ return avatars; },
      selected: function(){ return selected; },
      submit: function(){ return submit; }
    };
  }
});
