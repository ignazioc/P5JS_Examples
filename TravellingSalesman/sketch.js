var balls = []
var minimumDistance = 0
var bestOrder = []

function setup() {
    createCanvas(400, 400);
    frameRate(2);
    for (i = 0; i < 20; i++) {
        balls[i] = new Point(random(0,400),random(0,400));
    }
    minimumDistance = distance(balls)
    bestOrder = balls.slice()
    
}

function draw() {
    background(0);
    balls = shuffle(balls)
    d = distance(balls)
    if (d < minimumDistance) {
        minimumDistance = d
        console.log("Result " + d)
        bestOrder = balls.slice()

    }
    for (i = 0; i < balls.length; i++) {
        balls[i].drawBall()
    }
    for (i = 0; i < bestOrder.length - 1; i++) {
        b1 = bestOrder[i]
        b2 = bestOrder[i + 1]
        stroke(120,120,0)
        strokeWeight(6);
        line(b1.x, b1.y, b2.x, b2.y)
    }
    for (i = 0; i < balls.length - 1; i++) {
        b1 = balls[i]
        b2 = balls[i + 1]
        stroke(255,255,255,120)
        strokeWeight(2);
        line(b1.x, b1.y, b2.x, b2.y)
    }
}

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    
    this.color = { r:255, g: 255, b: 255 }
    
    this.drawBall = function() {
        stroke(this.color.r, this.color.g, this.color.b, 150);
        noFill();
        ellipse(this.x, this.y, this.radius * 2);
        stroke(255);
    }
}

function distance(a) {
    var result = 0
    for (i = 0; i < balls.length - 1; i++) {
        b1 = balls[i]
        b2 = balls[i + 1]
        result += dist(b1.x, b1.y, b2.x, b2.y);
    }
    return result
}