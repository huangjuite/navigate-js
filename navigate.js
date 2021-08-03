var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();
var draw = false;
var frame = 0;
var interval = null;

var resetBtn = document.getElementById("resetBtn");
var clearBtn = document.getElementById("clearBtn");
var execBtn = document.getElementById("execBtn");
var slideBar = document.getElementById("inputSize");
var slideBarStroke = document.getElementById("inputStroke");
var indicator = document.getElementById("indicator");

var map = ctx.getImageData(0, 0, canvas.width, canvas.height);
var agent = null;

document.addEventListener("mousemove", mouseMove);
document.addEventListener("mousedown", mouseDown);
document.addEventListener("mouseup", mouseUp);
document.addEventListener("touchmove", mouseMove);
document.addEventListener("touchstart", mouseDown);
document.addEventListener("touchend", mouseUp);

resetBtn.addEventListener("click", resetAgent);
clearBtn.addEventListener("click", clearCanvas);
execBtn.addEventListener("click", execute);
slideBar.addEventListener("input", changeSize);
slideBarStroke.addEventListener("input", changeStroke);

function resetAgent() {
  if (interval != null) clearInterval(interval);
  execBtn.disabled = false;
  setup();
}

function execute() {
  let agentRect = agent.getRect();
  ctx.clearRect(
    agentRect.left,
    agentRect.top,
    agentRect.width,
    agentRect.height
  );
  map = ctx.getImageData(0, 0, canvas.width, canvas.height);
  interval = setInterval(render, 10);
  execBtn.disabled = true;
}

function changeStroke(e) {
  if (parseFloat(slideBar.value) > parseFloat(slideBarStroke.value)) {
    slideBar.setAttribute("value", slideBarStroke.value.toString());
    console.log('s')
  }
  indicator.setAttribute(
    "stroke-width",
    (slideBarStroke.value - slideBar.value).toString()
  );
  indicator.setAttribute("r", slideBar.value.toString());
}

function changeSize(e) {
  if (parseFloat(slideBar.value) > parseFloat(slideBarStroke.value)) {
    slideBarStroke.setAttribute("value", slideBar.value.toString());
  }
  indicator.setAttribute(
    "stroke-width",
    (slideBarStroke.value - slideBar.value).toString()
  );
  indicator.setAttribute("r", slideBar.value.toString());
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  map = ctx.getImageData(0, 0, canvas.width, canvas.height);
  agent.drawAgent(canvas, ctx);
}

function mouseMove(e) {
  if (execBtn.disabled) return;
  if (draw) {
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  }
}

function mouseDown(e) {
  if (execBtn.disabled) return;
  draw = true;
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.lineWidth = slideBar.value;
  ctx.lineCap = "round";
}
function mouseUp(e) {
  if (execBtn.disabled) return;
  draw = false;
  ctx.closePath();
}

function setup() {
  ctx.putImageData(map, 0, 0);

  // tmp
  path = [];
  for (let i = 10; i < 410; i++) {
    path.push({ x: i, y: i });
  }

  agent = new Agent(10, 10);
  agent.setPath(path);
  agent.drawAgent(canvas, ctx);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //draw map
  ctx.putImageData(map, 0, 0);

  // draw agent
  if (!agent.step()) {
    clearInterval(interval);
    execBtn.disabled = false;
  }
  agent.draw(canvas, ctx);

  // count
  frame++;
  console.log("rendering");
}

setup();
