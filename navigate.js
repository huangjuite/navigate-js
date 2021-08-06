var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();
var draw = false;
var frame = 0;
var interval = null;
var mPos = { x: 0, y: 0 };

var resetBtn = document.getElementById("resetBtn");
var clearBtn = document.getElementById("clearBtn");
var execBtn = document.getElementById("execBtn");
var slideBar = document.getElementById("inputSize");
var slideBarStroke = document.getElementById("inputStroke");
var indicator_out = document.getElementById("indicator_out");
var indicator_in = document.getElementById("indicator_in");

var backColor = "#DDD";
ctx.fillStyle = backColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);
var map = ctx.getImageData(0, 0, canvas.width, canvas.height);
var agent = null;
var drawValue = { in: 0, out: 0 };

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

  gridMap = new GridMap(map);

  console.log(gridMap.getValue(100, 100));
  // interval = setInterval(render, 10);
  // execBtn.disabled = true;
}

function changeStroke() {
  let r = parseFloat(slideBar.value) + parseFloat(slideBarStroke.value);
  indicator_out.setAttribute("r", r.toString());
  drawValue.out = r*2;
}

function changeSize() {
  let r = parseFloat(slideBar.value);
  indicator_in.setAttribute("r", r.toString());
  drawValue.in = r*2;
  changeStroke();
}

function clearCanvas() {
  ctx.fillStyle = backColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  map = ctx.getImageData(0, 0, canvas.width, canvas.height);
  agent.drawAgent(canvas, ctx);
}

function mouseMove(e) {
  if (execBtn.disabled) return;
  if (draw) {
    ctx.lineWidth = drawValue.out;
    ctx.strokeStyle = "gray";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.moveTo(mPos.x, mPos.y);
    ctx.stroke();
    ctx.lineWidth = drawValue.in;
    ctx.strokeStyle = "black";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  }
  mPos.x = e.clientX - rect.left;
  mPos.y = e.clientY - rect.top;
}

function mouseDown(e) {
  if (execBtn.disabled) return;
  draw = true;
  ctx.beginPath();
  ctx.lineCap = "round";

  ctx.lineWidth = drawValue.out;
  ctx.strokeStyle = "gray";
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.moveTo(mPos.x, mPos.y);
  ctx.stroke();
  ctx.lineWidth = drawValue.in;
  ctx.strokeStyle = "black";
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
}
function mouseUp(e) {
  if (execBtn.disabled) return;
  draw = false;
  ctx.closePath();
}

function setup() {
  ctx.fillStyle = backColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(map, 0, 0);
  changeStroke();
  changeSize();

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
  ctx.fillStyle = backColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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
