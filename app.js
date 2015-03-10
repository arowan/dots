$(document).ready(function(){
  var animate = new Animate(500, 250);
  var habitat = new Habitat(10);
  animate.start(habitat.process, habitat);
});
