var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var Dino = {
    x : 10, y : 200,
    width : 50, height : 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
Dino.draw();

class Cactus {
    constructor(){
        this.x = 500; this.y = 200;
        this.width = 50; this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
var cactus = new Cactus();
cactus.draw();

// Frame Functions
var frameTimer = 0;
var obstacle = [];
var jumpTimer = 0;
var frameRunFunction;
var score = 0;

function frameRun() {
    frameRunFunction = requestAnimationFrame(frameRun)
    frameTimer ++;

    ctx.clearRect(0,0, canvas.width,canvas.height)

    if (frameTimer % 120 === 0) {
        var cactus = new Cactus();
        obstacle.push(cactus)
    }

    obstacle.forEach((cactus, i, o) => {
        if  (cactus.x < -50) {
            o.splice(i, 1)
        }
        cactus.x -= 2;

        crashBoth(Dino, cactus);

        cactus.draw();
    })

    // Jump
    if (jumping == true) {
        Dino.y -= 5;
        jumpTimer ++;
    } else if (jumping == false) {
        if (Dino.y < 200) {
            Dino.y += 2;
        } else {
            jumpingNow = false;
        }     
    }

    // Jump Timer
    if (jumpTimer > 30) {   
        jumping = false;
        jumpTimer = 0;
    }
 
    // Draw 
    Dino.draw();

    // Score
    score ++;
    document.getElementById('textScore').innerHTML = `Score: ${score}`
}

frameRun();


// Key ( Jump ) 
var jumping = false;
var jumpingNow = false;

document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        if (jumpingNow == false) {
            jumping = true;
            jumpingNow = true;
        }
    }
})

// Crash Check
function crashBoth (Dino, cactus) {
    var xDiff = cactus.x - (Dino.x + Dino.width)
    var yDiff = cactus.y - (Dino.y + Dino.height)

    if (xDiff < 0 && yDiff < 0) {
        ctx.clearRect(0,0, canvas.width,canvas.height)
        cancelAnimationFrame(frameRunFunction)
        document.getElementById('textStatue').innerHTML = `Game Over :: Score: ${score}`
    }
}