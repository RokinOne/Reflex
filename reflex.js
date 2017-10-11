var button = document.getElementById("button");
var mapBg = document.getElementById("mapBg");
var game = document.getElementById("game");
var map = document.getElementById("map");
var body = document.body;

var speed = 5000;
var clicks = 0;
var hits = 0, noMissed = 0, noLate = 0;
var width = map.offsetWidth;
var height = map.offsetHeight;
var gameInt = setInterval (move, speed);
var buttonInt;
var time = 0;

mapBg.onclick = miss;
body.onresize = function(){resize();}
button.onclick = hit;
update();

function move () {
  clearInterval(buttonInt);
  var x = Math.floor(Math.random() * (width - 60));
  var y = 60 + Math.floor(Math.random() * (height - 120));
  button.style.left = x + "px";
  button.style.top = y + "px";
  time = 0;
  buttonInt = setInterval (tick, 1);
  noLate++;
  update();
}

function hit () {
  clicks++; hits++;
  clearInterval(gameInt);
  speed /= 1.1;
  gameInt = setInterval (move, speed);
  noLate--; move();
}

function resize () {
  width = map.offsetWidth;
  height = map.offsetHeight;
  update();
}

function update () {
  document.getElementById("stat-hits").innerHTML = hits;
  document.getElementById("stat-speed").innerHTML = Math.floor(speed);
  document.getElementById("stat-late").innerHTML = noLate;
  document.getElementById("stat-clicks").innerHTML = clicks;
  document.getElementById("stat-missed").innerHTML = noMissed;
  document.getElementById("stat-size").innerHTML = width + "x" + height;
}

function miss () {
  clicks++; noMissed++;
  clearInterval(gameInt);
  speed *= 1.1;
  gameInt = setInterval (move, speed);
  update();
}

function tick () {
  time++; document.getElementById("stat-time").innerHTML = time;
  var perc = Math.floor(time * 100 / speed) * 4; // zasto *4 ?
  console.log(perc);
  button.style.background = "radial-gradient(red " + perc + "%, white " + perc + "%)"; //FIXME
}
