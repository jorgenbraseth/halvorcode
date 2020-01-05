const canvas = document.getElementById("screen");
const screen = canvas.getContext("2d");

function makeShape(x, y) {
    return {
        x, y,
        size: 5+Math.random()*20,
        xSpeed: 5-Math.random()*10,
        ySpeed: -10 - Math.random()*10,
        fillStyle: `rgb(${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)})`
    }
}

let squares = [];

function logic() {
    squares.forEach((s)=>{
        s.y += s.ySpeed; //Move in y-direction
        s.x += s.xSpeed; //Move in x-direction
        s.ySpeed += 1; //Accelerate downwards

        //Bounce at bottom
        if(s.y > 600-s.size){
            s.ySpeed = -parseInt(s.ySpeed - 1) / 2;
            s.xSpeed = parseInt(s.xSpeed/2);
            s.y = 600-s.size;
        }
    });

}

function draw() {
    screen.clearRect(0,0,800,600); //Clear canvas

    squares.forEach((s)=>{
        screen.fillStyle = s.fillStyle; //Set fill color
        screen.strokeStyle = s.fillStyle; //Set outline color
        screen.beginPath(); //Start defining a shape
        screen.arc(s.x,s.y,s.size,0,2*Math.PI); //Define a circle
        screen.stroke(); //Draw the circle
    });

}

function gameLoop() {
    requestAnimationFrame(gameLoop); //Call this method again before next screen update    
    logic();
    draw();    
}

//When mouse moves across the canvas, add a new shape
canvas.onmousemove = (mouseEvent) => {
    squares.push(
        makeShape(mouseEvent.offsetX, mouseEvent.offsetY)
    )
};
gameLoop();

