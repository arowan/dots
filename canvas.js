function Animate (width, height) {
  this.canvas = document.getElementById("canvas");
  this.context = canvas.getContext("2d");
  this.canvas.height = height;
  this.canvas.width = width;

  this.interval = 50;
  this.running = true;
}

Animate.prototype = {
  start: function (callback, proxy){
    this.running = true;
    this.animate(callback, proxy);
  },
  stop: function () {
    this.running = false;
  },
  animate: function (callback, proxy) {
    var process = setInterval(function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.context.beginPath();
      this.context.rect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = 'yellow';
      this.context.fill();


      if (callback) {
        callback(this.context, proxy)
      } else {
        this.running = false;
        console.error('Render missing');
      }
      if (!this.running) clearInterval(process);
    }.bind(this), this.interval);
  }
};
