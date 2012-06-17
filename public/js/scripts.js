$(document).ready(function(){
	var avatars = $('.avatar');
	avatars.click(function() {
		avatars.children().removeClass('selected');
		var id = $(this).children().first().addClass('selected').attr('data-id');
		$('input[name="selected"]').val(id);
	});	


	var canvas = $('canvas')[0];
	var context = canvas.getContext("2d");
	var half = Math.floor(canvas.width/2);
	var currentAngle = 90;

	drawSegment(canvas, context, 216, '60%', "#FF9516");
	drawSegment(canvas, context, 144, '40%', "#C6C6C6");
	drawLabel(216, true);
	drawLabel(144, false);

	function drawSegment(canvas, context, data, label, color) {
    context.save();
    
    var centerX = half;
    var centerY = half;
    
    var start = radians(currentAngle);
    currentAngle += data;
    var size = radians(data);
    var end = start + size;
    
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, half, start, end, false);
    context.closePath();

    context.strokeStyle = 'white';
    context.lineWidth = 4;
    context.fillStyle = color;
    context.stroke();
    context.fill();
    context.restore();
    //drawSegmentLabel(canvas, context, label, data);
	}

	function drawLabel(data, clockwise) {
	  context.save();

	  var x = half; 
   	var y = half;
   	context.translate(x, y);
    
   	//here, check side
   	var start = 90;
   	var padding = clockwise ? (-22) : (-10);
   	var offset = clockwise ? data+padding : -(data+padding);
   	context.rotate(radians(start + offset));
    
   	var dx = half - 30;
   	var dy = Math.floor(canvas.height * 0.05);
   
   	context.translate(dx, dy);
   	context.rotate(radians(90));
   	context.translate(-dx, -dy);

 	  context.textAlign = 'center';
  	var fontSize = Math.floor(canvas.height/25);
   	context.font = 'bold 24px Helvetica';
   	context.fillStyle = 'white';
    
   	var value = Math.floor((data*100)/360);

  	context.fillText(value+'%', dx, dy);
   	context.restore();
	}

	function radians(degrees) {
	  return (degrees * Math.PI)/180;
	}
});
