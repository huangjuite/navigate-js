class GridMap {
  constructor(rawMap) {
    this.data = rawMap.data;
    this.width = rawMap.width;
    this.height = rawMap.height;
  }

  getValue(x, y) {
    // r position
    let indx = y * this.width * 4 + x * 4;
    return 255 - this.data[indx];
  }
}

class Node {
  constructor(x, y) {
    this.is_obstacle = false;
    this.visited = false;
    this.global_goal = Infinity;
    this.local_goal = Infinity;
    this.x = x;
    this.y = y;
    this.neighbors = [];
    this.parent = null;
  }
}

class Astar {
  constructor() {
    this.initialized = false;
    this.path = [];
    this.nodes = [];
    this.ns = null;
    this.ne = null;
    this.gridMap = null;
  }

  distance(a, b) {}

  heuristic(a, b) {}

  initialize(start, end, gridMap) {
    this.ns.x = start.x;
    this.ns.y = start.y;
    this.ne.x = end.x;
    this.ne.y = end.y;

    this.gridMap = gridMap;
    this.nodes
  }
}
