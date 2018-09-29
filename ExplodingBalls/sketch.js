Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
};


var bubbles = []
var explodingBubbles = []
var reactionStarted = false

function setup() {
  let w = 800
  createCanvas(w, w);
	for (i = 0; i<100; i++) {
    let c = color(random(0,255), random(0,255),random(0,255), 150);
		var v = createVector(random(0,w), random(0,w));
		bubbles[i] = new Bubble(v, 20, c);
	}
}

function draw() {
  background(0);

  bubbles.forEach( function(bubble, index, array) {
    bubble.draw();
  }); // end forEach

  let newExplodedBubbles = [];
  let newDeadBubbles = [];
  explodingBubbles.forEach( function(explodingBubble, index, explodingArray) {

    bubbles.forEach( function( bubble, bubbleIndex, bubbleArray ){
      if (dist(explodingBubble.origin.x, explodingBubble.origin.y, bubble.origin.x, bubble.origin.y) < (explodingBubble.diameter + bubble.diameter)) {
        bubble.exploding = true
        bubbleArray.splice(bubbleIndex,1);
        newExplodedBubbles.push(bubble);
      }
    });

    explodingBubble.draw();
    if (explodingBubble.dead) {
      newDeadBubbles.push(explodingBubble)
    }
  }); // end forEach

  explodingBubbles = explodingBubbles.concat(newExplodedBubbles);
  explodingBubbles = explodingBubbles.diff(newDeadBubbles);

}


function mousePressed() {
  reactionStarted = true;
  let v = createVector(mouseX, mouseY)
  let c = color(255, 0,0, 150);
  let mouseCircle = new Bubble(v,40, c);
  mouseCircle.exploding = true;
  explodingBubbles.push(mouseCircle)
}