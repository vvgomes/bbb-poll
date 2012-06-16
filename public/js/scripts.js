$(document).ready(function(){
	var avatars = $('.avatar');
	avatars.click(function() {
		avatars.children().removeClass('selected');
		var id = $(this).children().first().addClass('selected').attr('data-id');
		$('input[name="selected"]').val(id);
	});	
});
