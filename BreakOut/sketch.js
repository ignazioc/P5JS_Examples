var balls = [];
var paddle;
var score = 0;

function setup() {
    createCanvas(600, 600);
    for (i = 0; i < 1; i++) {
        balls[i] = new Ball(random(40, 100), random(40, 100));
    }
    paddle = new Paddle;
    fill(255);
    noStroke();

}

function draw() {
    
    background(0);
    
    paddle.checkCollisionWithWalls();
    paddle.draw()
    for (i = 0; i < balls.length; i++) {
        balls[i].checkCollision(paddle);
        balls[i].draw()
    }
    rectMode(CENTER)
    
    textSize(30);
    textAlign(CENTER);
    text("Score: " + score, width / 2, 50);

    rectMode(CORNER)
}


function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        paddle.direction(-1);
    } else if (keyCode === RIGHT_ARROW) {
        paddle.direction(1);
    }
}

function keyReleased() {
    this.paddle.direction(0);
    return false;

}

function Paddle(w) {
    this.w = 100;
    this.x = width / 2 - this.w / 2;
    this.y = height - 25;
    
    this.speed = 0 //Only horizontal speed

    this.direction = function (d) {
        this.speed = d
    }
    this.draw = function () {
        this.x += this.speed * 5;
        fill(255);
        noStroke();
        rect(this.x, this.y, 100, 20);
    }
    this.checkCollisionWithWalls = function () {
        //Left | Right margin
        if (this.x <= 0 && this.speed === -1 ||
            this.x + this.w >= width && this.speed === 1) {
            this.speed = 0;
        }
    }
}

function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.speed = {
        x: random(1, 8),
        y: random(1, 10)
    };
    

    this.draw = function () {
        this.x += this.speed.x;
        this.y += this.speed.y
        ellipse(this.x, this.y, this.radius * 2);
    }

    this.checkCollision = function (paddle) {
        //Check the collision with the paddle.
        if (this.y + this.radius >= paddle.y &&
           this.x > paddle.x &&
           this.x < paddle.x + paddle.w) {
            score += 1;
            this.speed.y = -this.speed.y;
        }
        
        //Right|Left margin
        if (this.x + this.radius > width ||
            this.x - this.radius <= 0) {
            this.speed.x = -this.speed.x;
        }


        //Top
        if (this.y - this.radius <= 0) {
            this.speed.y = -this.speed.y;
        }
        
        //Bottom, you loose.
        if (this.y + this.radius >= height) {
            
            this.speed.x = 0;
            this.speed.y = 0;
            rectMode(CENTER);
            textAlign(CENTER);
            textSize(50);
            text("Game Over", width / 2,width / 2);
            
        }
    }
}