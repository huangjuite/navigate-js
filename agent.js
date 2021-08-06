
class Agent {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.path = [];
    this.size = 10;
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  setPath(path) {
    this.path = path;
  }

  getRect() {
    return {
      left: this.x - this.size,
      top: this.y - this.size,
      height: this.size*2,
      width: this.size*2,
    };
  }

  step() {
    if (this.path.length == 0) return false;
    this.x = this.path[0].x;
    this.y = this.path[0].y;
    this.path.shift();
    return true;
  }

  drawAgent(canvas, ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
  }

  drawPath(canvas, ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    for (let i = 0; i < this.path.length; i++) {
      ctx.lineTo(this.path[i].x, this.path[i].y);
    }

    ctx.lineWidth = 5;
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.closePath();
  }

  draw(canvas, ctx) {
    // draw path
    this.drawPath(canvas, ctx);

    // draw agent
    this.drawAgent(canvas, ctx);
  }
}
