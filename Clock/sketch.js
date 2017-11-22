function setup() {
	background(0);
	canvasSize = 1000
	createCanvas(canvasSize, canvasSize);
	
	
}

function draw() {
	box = 90
	background(0);
	textSize(box / 1.5);
	textAlign(RIGHT);
	for (var i = 1; i <= 6; i++) {
		for (var j = 1; j <= 10; j++) {
			
			counter = (i - 1) * 10 + j
			if (counter == second()) {
				fill(255, 0, 125, 255);
			} else {
				fill(145, 145, 145, 80);
			}
			text(counter, box * j, box * i);
		}	
	}

	fill(200, 200);
	textSize(400);
	textAlign(RIGHT);
	text(hour(), 400, canvasSize - 50);
	if (millis() % 700 > 350) {
		text(":", 500, canvasSize - 50);	
	}
	
	text(minute(), 950, canvasSize - 50);
}

