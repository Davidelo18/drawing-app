window.addEventListener('DOMContentLoaded', () => {
    // initialize the canvas
    const myCanvas = document.getElementById('myCanvas');
    const canvContx = myCanvas.getContext('2d');

    // resizing the canvas 
    myCanvas.height = document.body.clientHeight;
    myCanvas.width = document.body.clientWidth;

    // bool if user is painting now
    let radius = 5;
    let lineWidth = radius * 2;
    let drawing = false;

    canvContx.lineWidth = lineWidth;

    function startDrawing(e){
        drawing = true;
        draw(e);
    }

    function stopDrawing(){
        drawing = false;
        canvContx.beginPath(); // clear the drew lines
    }

    function draw(e){
        if(!drawing) return;
        canvContx.lineTo(e.clientX, e.clientY);
        canvContx.stroke();
        canvContx.beginPath();
        canvContx.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
        canvContx.fill();

        canvContx.beginPath();
        canvContx.moveTo(e.clientX, e.clientY);
    }

    myCanvas.addEventListener('mousedown', startDrawing);
    myCanvas.addEventListener('mousemove', draw);
    myCanvas.addEventListener('mouseup', stopDrawing);
});