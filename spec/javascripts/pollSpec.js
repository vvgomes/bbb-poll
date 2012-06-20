describe('candidate avatar', function() {
  it('should be selectable', function() {
    var dom = fakeDom();
    makeCandidateSelectable(dom);
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