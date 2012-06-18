function createPointer(clockwise) {
  var pointer = {};
  var degrees = 90;

  pointer.degrees = function() {
    return degrees;
  };

  pointer.move = function(amount) {
    degrees += (clockwise ? amount : -amount);
    return degrees;
  };

  pointer.reset = function() {
    degrees = 90;
    return degrees;
  };

  pointer.clockwise = function() {
    return clockwise;
  };

  return pointer;
}

function createPlotData(votes) {
  var colors = ['#FF9516','#C6C6C6'];
  
  var total = votes.reduce(function(s, e) { 
    return parseInt(s) + parseInt(e); 
  });

  return $(votes).map(function(i, v) {
    return {
      degrees: Math.floor((v * 360) / total),
      percentage: Math.round((v * 100) / total).toString()+'%',
      color: colors[i]
    };
  });
}

createChart = function(canvas) {
  var chart = {};
  var context = canvas.getContext('2d');      
  
  var center = {
    x: Math.floor(canvas.width / 2),
    y: Math.floor(canvas.height / 2)
  };
  
  var radius = center.x;

  chart.draw = function(votes) {
    var data = createPlotData(votes);

    var pointer = createPointer(true);
    var labelPointers = [createPointer(true), createPointer(false)];

    $(data).each(function(i, item) {
      plot(item, pointer, labelPointers[i]);
    });
  };

  function plot(item, pointer, labelPointer) {
    context.save();
    var start = radians(pointer.degrees());
    var end = radians(pointer.move(item.degrees));

    context.beginPath();
    context.moveTo(center.x, center.y);
    context.arc(center.x, center.y, radius, start, end, false);
    context.closePath();

    context.strokeStyle = 'white';
    context.lineWidth = 4;
    context.fillStyle = item.color;
    context.stroke();
    context.fill();
    context.restore();

    plotLabel(item, labelPointer);
  }

  function plotLabel(item, pointer) {
    context.save();
    context.translate(center.x, center.y);
    
    var padding = (-20);
    context.rotate(radians(pointer.move(item.degrees + padding)));
    
    var dx = center.x - 30;
    var dy = Math.floor(center.y * 0.05);
   
    context.translate(dx, dy);
    context.rotate(radians(pointer.reset()));
    context.translate(-dx, -dy);

    context.textAlign = 'center';
    var fontSize = Math.floor(radius / 25);
    context.font = 'bold 24px Helvetica';
    context.fillStyle = 'white';
    
    context.fillText(item.percentage, dx, dy);
    context.restore();
  }

  function radians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  return chart;
}

$(document).ready(function(){
  var votes = [
    $('#first-candidate-votes').val(), 
    $('#second-candidate-votes').val()
  ];

  createChart($('canvas')[0]).draw(votes);
});
