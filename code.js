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

function draw() {
    screen.clearRect(0,0,800,600);
    squares.forEach((s)=>{
        screen.fillStyle = s.fillStyle;
        s.y += s.ySpeed;
        s.x += s.xSpeed;
        s.ySpeed += 1;
        screen.beginPath();
        screen.arc(s.x,s.y,s.size,0,2*Math.PI);
        screen.fill();

        if(s.y > 600-s.size){
            s.ySpeed = -parseInt(s.ySpeed - 1) / 2;
            s.xSpeed = parseInt(s.xSpeed/2);
            s.y = 600-s.size;
        }
    });

    requestAnimationFrame(draw)
}

canvas.onmousemove = (evt) => {
    squares.push(
        makeShape(evt.offsetX, evt.offsetY)
    )
};
draw();

