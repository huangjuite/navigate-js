var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var frame = 0;
var rect = canvas.getBoundingClientRect();
var draw = false;
var clearBtn = document.getElementById("clearBtn");
var slideBar = document.getElementById("myRange");
var indicator = document.getElementsByClassName("dot")[0];
var map = ctx.getImageData(0, 0, canvas.width, canvas.height);

document.addEventListener("mousemove", mouseMove);
document.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
document.addEventListener("touchmove", mouseMove);
document.addEventListener("touchstart", mouseDown);
document.addEventListener("touchend", mouseUp);

clearBtn.addEventListener("click", clearCanvas);
slideBar.addEventListener("input", changeSize);

function changeSize(e) {
  indicator.style.setProperty("height", slideBar.value.toString() * 2 + "px");
  indicator.style.setProperty("width", slideBar.value.toString() * 2 + "px");
}

function clearCanvas() {
  map = ctx.getImageData(0, 0, canvas.width, canvas.height);
  console.log(map);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawOnce(e, fillSize) {
  let mx = e.clientX - rect.left;
  let my = e.clientY - rect.top;
  ctx.beginPath();
  ctx.arc(mx, my, fillSize, 0, Math.PI * 2);
  ctx.fillStyle = "rgb(25,25,25)";
  ctx.fill();
  ctx.closePath();
}
function mouseMove(e) {
  if (draw) {
    drawOnce(e, slideBar.value);
  }
}

function mouseDown(e) {
  draw = true;
  drawOnce(e, slideBar.value);
}
function mouseUp(e) {
  draw = false;
}

function setup() {}

// function render() {
//   // count
//   frame++;
// }

setup();
// var interval = setInterval(render, 10);
