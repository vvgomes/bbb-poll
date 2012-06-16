$(document).ready(function(){
	var avatars = $('.avatar');
	avatars.click(function() {
		avatars.children().removeClass('selected');
		$(this).children().first().addClass('selected');
	});	
});
