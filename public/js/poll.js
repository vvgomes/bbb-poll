function makeCandidateSelectable(dom) {
  var avatars = dom.avatars();
  avatars.click(function() {
    avatars.children().removeClass('selected');
    var id = $(this).children().first().addClass('selected').attr('data-id');
    dom.selected().val(id);
    dom.submit().removeAttr('disabled').val('Envie seu voto agora');
  });
}

var dom = {
  avatars: function(){ return $('.selectable'); },
  selected: function(){ return $('input[name="selected_id"]'); },
  submit: function(){ return $('#vote input[type="submit"]'); }
};

$(document).ready(function(){
  makeCandidateSelectable(dom);
});