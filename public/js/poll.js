function createCandidateSelector(dom) {
  var avatars = dom.avatars();
  avatars.click(function() {
    avatars.children().removeClass('selected');
    var id = $(this).children().first().addClass('selected').attr('data-id');
    dom.selected().val(id);
  });
}

function createDom() {
  return {
    avatars: function(){ return $('.avatars'); },
    selected: function(){ return $('input[name="selected"]'); }
  };
}

$(document).ready(function(){
  createCandidateSelector(createDom());
});