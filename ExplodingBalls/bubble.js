class Bubble {
	constructor(origin, diameter, color) {
    this.origin = origin;
    this.diameter = diameter;
    this.dead = false
    this.exploding = false
    this.color = color
    ellipseMode(RADIUS);
  }
	
	draw() {
    if (this.exploding) {
      this.expand();
    }
    
    fill(this.color);
    strokeWeight(2);
    stroke(255,255,200, 150);
		ellipse(this.origin.x,this.origin.y,this.diameter,this.diameter);
  }

	expand() {
    if (this.diameter > 80) {
      this.dead = true
    }else {
      this.diameter = this.diameter + 1
    }
  }

  checkCollisions(objects) {
    for (var i = 0; i<objects.length; i++) {
      if (objects[i] != this ) {
        if (dist(this.origin.x, this.origin.y, objects[i].origin.x, objects[i].origin.y) < (this.diameter + objects[i].diameter)) {
          objects[i].exploding = true;
        }
      }
    }
  }
}