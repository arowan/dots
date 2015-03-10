$(document).ready(function(){
  var animate = new Animate(500, 250);
  var daycare = new Habitat(10);
  animate.start(daycare.process, daycare);
});
