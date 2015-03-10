function Habitat (dots) {
  this.dots = [];

  var newDot = function () {
    var dot = new Dot(_.random(0, 500), _.random(0, 250));
    dot.setBaby(newDot);
    this.dots.push(dot);
  }.bind(this);

  _.times(dots, function() {
    newDot();
  }.bind(this));
}

Habitat.prototype = {
  process: function (context, _this) {
    _.each(_this.dots, function (dot) {
      if (dot.alive) dot.process(context);
    });
  }
};
