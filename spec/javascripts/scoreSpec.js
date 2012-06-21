describe('countdown', function() {
  describe('clock', function() {
    var clock;

    beforeEach(function() {
      now = function() {
        var d = new Date();
        d.setTime(1340027088000);
        return d;
      };
      clock = createClock(1340030688);
    });

    it('should display time nicely', function() {
      expect(clock.toString()).toBe('01:00:00');
    });

    it('should decrease a second', function() {
      clock.decrease();
      expect(clock.toString()).toBe('00:59:59');
    });

    it('should not be expired by default', function() {
      expect(clock.expired()).toBeFalsy();
    });

    it('should not be expired when deadline is not reached', function() {
      clock.decrease();
      expect(clock.expired()).toBeFalsy();
    });

    it('should be expired when deadline is reached', function() {
      clock = createClock(1340027088);
      clock.decrease();
      expect(clock.expired()).toBeTruthy();
    });
  });

  describe('after started', function() {
    var dom;

    beforeEach(function() {
      dom = fakeDom();
      setInterval = function(c){ c(); }
    });

    it('should update clock', function() {
      startCountdown(fakeClock(false), dom);
      expect(dom.clock().html()).toBe('01:00:00');
    });

    it('should stop the clock when deadline is reached', function() {
      startCountdown(fakeClock(true), dom);
      expect(dom.wrapper().html()).toBe('<p id="expired">VOTAÇÃO ENCERRADA</p>')
    });

    function fakeDom() {
      var clockUI = $('<p></p>');
      var wrapper = $('<div></div>');
      var deadline = $('<input value="123"/>');
      return {
        clock: function() { return clockUI; },
        wrapper: function() { return wrapper; },
        deadline: function() { return deadline; }
      };
    }

    function fakeClock(expired) {
      return {
        toString: function(){ return '01:00:00'; },
        expired: function(){ return expired; },
        decrease: function(){}
      };
    }
  });
});
