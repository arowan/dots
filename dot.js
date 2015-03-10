function Dot (x, y, radius){
  this.x = x || 0;
  this.y = y || 0;
  this.radius = radius || 3;
  var colours = ['ff0000', '0000ff'];
  this.colour = _.sample(colours);

  this.born = Date.now();
  this.alive = true;
  this.matingCount = 0;

  this.age = function () {
    var a = (Date.now() - this.born) / 1000;
    this.radius = this.radius + (a / 100);
    if (a > 30) this.alive = false;
    return a;
  };

  this.canMate = function (colour) {
    return colours.indexOf(colour) > -1 && colour !== this.colour;
  };

}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

Dot.prototype = {
  setBaby: function (callback) {
    this.babyCallback = callback;
  },
  vision: function (context) {
    var points=[];
    var v = 10;
    for(var degree=0;degree<360;degree+=20){
        var radians = degree * Math.PI/180;
        var x = this.x + this.radius * Math.cos(radians);
        var y = this.y + this.radius * Math.sin(radians);

        if (context !== undefined) {
          var p = context.getImageData(x, y, 1, 1).data;
          var hex = ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
          points.push({x:x,y:y,colour: hex});
        }
    }
    return points;
  },

  walk: function (points) {
    var something = [];
    var mating = [];
    var idx = 0;
    var result = null;

    _.each(points, function (cord, index) {
      if (this.canMate(cord.colour)){
        mating.push(index);
      }

      if (cord.colour === 'ffff00') {
        if (!something[idx]) {
          something[idx] = [];
        }
        something[idx].push(index);
      } else {
        idx++;
      }
    }.bind(this));

    if (mating.length > 0) {
      if (this.colour === '0000ff') {
        this.matingCount++;
        if (this.matingCount == 40) {
          this.matingCount = 0;
          this.babyCallback();
        }
      }

      result = points[_.sample(mating)];
    } else {
      var winningGroup = [];
      _.each(something, function(items) {
        if (items && winningGroup.length < items.length) winningGroup = items;
      });

      result = points[_.sample(winningGroup)];
    }

    if (result) {
      this.x = result.x;
      this.y = result.y;
    }
  },
  process: function (context) {
    this.walk(this.vision(context));
    this.draw(context);
  },
  draw: function (context) {
    this.age();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = '#' + this.colour;
    context.fill();
  }
};
