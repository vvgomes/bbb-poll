describe('chart', function() {
  describe('plot data', function() {
    var data;

    beforeEach(function() {
      data = createPlotData([60, 40]);
    });

    it('should calculate degrees', function() {
      expect(data[0].degrees).toBe(216);
      expect(data[1].degrees).toBe(144);
    });

    it('should calculate percentages', function() {
      expect(data[0].percentage).toBe('60%');
      expect(data[1].percentage).toBe('40%');
    });

    it('should set colors', function() {
      expect(data[0].color).toBe('#FF9516');
      expect(data[1].color).toBe('#C6C6C6');
    });

    it('should limit angle from 80 to 280', function() {
      data = createPlotData([0, 1]); // 0% x 100%
      expect(data[0].degrees).toBe(80);
      expect(data[1].degrees).toBe(280);
    })

    it('should work for 0 votes', function() {
      data = createPlotData([0, 0]);
      expect(data[0].degrees).toBe(180);
      expect(data[1].degrees).toBe(180);
      expect(data[0].percentage).toBe('50%');
      expect(data[1].percentage).toBe('50%');
    });
  });

  describe('pointer', function() {
    var regular;
    var reverse;

    beforeEach(function() {
      regular = createPointer(true);
      reverse = createPointer(false);
    });
    
    it('should point to 90 degrees by default', function() {
      expect(regular.degrees()).toBe(90);
      expect(reverse.degrees()).toBe(90);
    });

    it('should tell me its orientaion', function() {
      expect(regular.clockwise()).toBeTruthy();
      expect(reverse.clockwise()).toBeFalsy();
    });

    it('should move clockwise', function() {
      regular.move(50);
      expect(regular.degrees()).toBe(140);
    });

    it('should move counterclockwise', function() {
      reverse.move(50);
      expect(reverse.degrees()).toBe(40);
    });

    it('should reset', function() {
      regular.reset();
      expect(regular.degrees()).toBe(90);
      reverse.reset();
      expect(reverse.degrees()).toBe(90);
    });    
  });
});
