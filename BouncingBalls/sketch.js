var balls = []

function setup() {
    createCanvas(400, 400);
    for (i = 0; i < 50; i++) {
        balls[i] = new Ball(random(40,100),random(40,100));
    }
    
}

function draw() {
    background(0);
    for (i = 0; i < balls.length; i++) {
        balls[i].checkCollision();
        balls[i].draw()
    }
    
}

function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.speed = {
        x: random(1,5),
        y: random(1,5)
    };
    this.color = { r: random(0,255), g: random(0,255), b: random(0,255) }
    
    this.draw = function() {
        this.x += this.speed.x;
        this.y += this.speed.y
        fill(this.color.r, this.color.g, this.color.b, 150);
        noStroke();
        ellipse(this.x, this.y, this.radius * 2);
        stroke(255,0,0);
    }
    
    this.checkCollision = function() {
        //Right|Left margin
        if (this.x + this.radius > width ||
           this.x - this.radius <= 0) {
            this.speed.x = - this.speed.x;
        }
        
        
        //Top|Bottom Margin
        if (this.y - this.radius <= 0 ||
           this.y + this.radius >= height) {
            this.speed.y = - this.speed.y;
        }
    }
}