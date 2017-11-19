
var nodes = []

function setup() {
	createCanvas(500, 500);
	frameRate(1);
	background(0);
	for (i = 0; i < 5; i++) {
        nodes[i] = new Node(0,0);;
    }
}

function draw() {
	background(0);

	for (i = 0; i < nodes.length; i++) {
        nodes[i].move(500);
        nodes[i].draw()
        if (i > 0) {
        	nodes[i].connect(nodes[i-1]);
        }
    }
}

function Node(x,y) {
	this.x = x;
	this.y = y;
	this.radius = 25;

	this.draw = function() {
		fill(120,0,100, 255);
        noStroke();
        ellipse(this.x, this.y, this.radius * 2);
        stroke(255,0,0);
	}

	this.move = function(max) {
		this.x = random(0,max);
		this.y = random(0,max);

	}

	this.connect = function(node) {
		noFill();
		stroke(125);
		strokeWeight(4);
		midPoint = this.x + ((node.x - this.x) / 2)
		bezier(this.x,this.y,midPoint,this.y, midPoint,node.y, node.x, node.y);
	}
}