function makeCandidateSelectable(dom) {
  var avatars = dom.avatars();
  avatars.click(function() {
    avatars.children().removeClass('selected');
    var id = $(this).children().first().addClass('selected').attr('data-id');
    dom.selected().val(id);
  });
}

var dom = {
  avatars: function(){ return $('.selectable'); },
  selected: function(){ return $('input[name="selected_id"]'); }
};

$(document).ready(function(){
  makeCandidateSelectable(dom);
});