function createClock(deadline) {
  var clock = {};
  var left = deadline - (Date.parse(now()) / 1000);

  clock.toString = function() {
    var hours = Math.floor(left / 3600);
    var min = Math.floor((left - (hours * 3600)) / 60);
    var sec = Math.floor((left - (hours * 3600) - (min * 60)));

    hours = (hours < 10) ? ('0' + hours) : hours.toString();
    min = (min < 10) ? ('0' + min) : min.toString();
    sec = (sec < 10) ? ('0' + sec) : sec.toString();
    
    return hours + ':' + min + ':' + sec;
  };

  clock.decrease = function() {
    --left;
  };

  clock.expired = function() {
    return !(left > 0);
  };

  return clock;
}

function now() {
  return new Date();
}

function startCountdown(clock, dom) {
  var loop = setInterval(function() {
    clock.decrease();
    check();
  }, 1000);

  check();

  function check() {
    clock.expired() ? stop() : update();
  }

  function update() {
    dom.clock().html(clock.toString());
  }

  function stop() {
    dom.wrapper().html('<p id="expired">VOTAÇÃO ENCERRADA</p>');
    clearInterval(loop);
  }
}

var countdownDom = {
  clock: function() { return $('#clock'); },
  wrapper: function() { return $('#countdown-wrapper'); },
  deadline: function() { return $('#deadline'); }
};

$(document).ready(function(){
  createChart(chartDom).draw();
  var clock = createClock(countdownDom.deadline().val()); 
  startCountdown(clock, countdownDom);
});
