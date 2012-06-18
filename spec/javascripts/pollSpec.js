describe('candidate selector', function() {
  it('should save the selected id in the dom', function() {
    var dom = fakeDom();
    createCandidateSelector(dom);
    dom.avatars().trigger('click');
    expect(dom.selected().val()).toBe('99');
  });

  function fakeDom() {
    var avatars = $('<div><div data-id="99"></div></div>');
    var selected = $('<input value="">');
    return {
      avatars: function(){ return avatars; },
      selected: function(){ return selected; }
    };
  }
});