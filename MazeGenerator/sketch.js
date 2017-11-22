var mazeSize = 10
var cellW = 50

var grid = []
var stack = []
var currentCell

function setup() {
    frameRate(10)
    createCanvas(cellW * mazeSize, cellW * mazeSize);

    //Create cells
    for (y = 0; y < mazeSize; y++) {
        grid[y] = []

        for (x = 0; x < mazeSize; x++) {
            var cell = new Cell(x, y);
            grid[y].push(cell);
        }
    }
    currentCell = grid[0][0];
    // currentCell.left = false;
    // grid[mazeSize-1][mazeSize-1].bottom = false

}

function draw() {
    background(0)
    // Show cells
    for (y = 0; y < mazeSize; y++) {
        for (x = 0; x < mazeSize; x++) {
            grid[y][x].show();
        }
    }

    currentCell.visited = true;
    currentCell.mark()
    var n = currentCell.nextCell()
    if (n) {
        stack.push(currentCell);
        currentCell = n;
    } else if (stack.length > 0) {
        currentCell = stack.pop();
    } else {
        consol.log("finito");
    }

}

function Cell(x, y) {
    this.x = x;
    this.y = y;

    this.visited = false;

    this.top = true;
    this.right = true;
    this.bottom = true;
    this.left = true;

    this.show = function() {
    	stroke(255);

    	var topLeft     = { x: this.x * cellW, y: this.y * cellW }
    	var topRight    = { x: this.x * cellW + cellW, y: this.y * cellW }
    	var bottomLeft  = { x: this.x * cellW, y: this.y * cellW  + cellW}
    	var bottomRight = { x: this.x * cellW + cellW, y: this.y * cellW  + cellW}


        if (this.top) {
            line(topLeft.x, topLeft.y, topRight.x, topRight.y);
        }
        if (this.right) {
            line(topRight.x, topRight.y, bottomRight.x, bottomRight.y);
        }
        if (this.bottom) {
        	line(bottomLeft.x, bottomLeft.y, bottomRight.x, bottomRight.y);
        }
        if (this.left) {
            line(topLeft.x, topLeft.y, bottomLeft.x, bottomLeft.y);
        }

        if (this.visited) {
            noStroke();
            fill(255, 0, 0, 100);
            rect(this.x * cellW, this.y * cellW, cellW, cellW);
        }
        
        
    }

    this.mark = function() {
        fill(255, 0, 0, 255);
        rect(this.x * cellW, this.y * cellW, cellW, cellW);
    }

    this.nextCell = function() {
        var adiacenti = []

        var topCell
        var rightCell
        var bottomCell
        var leftCell

        if (this.y > 0) {
            topCell = grid[this.y - 1][this.x];
            if (!topCell.visited) {
                adiacenti.push(topCell)
            }
        }


        if (this.x < mazeSize - 1) {
            rightCell = grid[this.y][this.x + 1];
            if (!rightCell.visited) {
                adiacenti.push(rightCell)
            }
        }


        if (this.y < mazeSize - 1) {
            bottomCell = grid[this.y + 1][this.x];
            if (!bottomCell.visited) {
                adiacenti.push(bottomCell)
            }
        }


        if (this.x > 0) {
            leftCell = grid[this.y][this.x - 1];
            if (!leftCell.visited) {
                adiacenti.push(leftCell)
            }
        }

        var result
        if (adiacenti.length > 0) {
            var index = floor(random(0, adiacenti.length));
            result = adiacenti[index];
        } else {
            return undefined;
        }

        if (result === topCell) {
            this.top = false;
            result.bottom = false;
        } else if (result === rightCell) {
            this.right = false;
            result.left = false;
        } else if (result === bottomCell) {
            this.bottom = false;
            result.top = false;
        } else if (result === leftCell) {
            this.left = false;
            result.right = false;
        }

        return result
    }

}