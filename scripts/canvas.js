window.addEventListener('DOMContentLoaded', () => {
    // initialize the canvas
    const myCanvas = document.getElementById('myCanvas');
    const backgroundCanvas = document.getElementById('background');
    
    const canvContx = myCanvas.getContext('2d');
    const bgContx = backgroundCanvas.getContext('2d');

    // resizing the canvas 
    myCanvas.height = backgroundCanvas.height = document.body.clientHeight;
    myCanvas.width = backgroundCanvas.width = document.body.clientWidth;

    bgContx.fillStyle = '#ffffff';
    bgContx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

    canvContx.drawImage(backgroundCanvas, 0, 0);

    /* 
    **  ----- BASIC DRAWING SECTION -----
    */

    // bool if user is painting now
    let radius = 5;
    let lineWidth = radius * 2;
    let paintColor = '#000000';
    let drawing = false;

    canvContx.lineWidth = lineWidth;

    function startDrawing(e) {
        drawing = true;
        draw(e);
    }

    function stopDrawing() {
        drawing = false;
        canvContx.beginPath(); // clear the drew lines
    }

    function draw(e) {
        if (!drawing) return;
        canvContx.fillStyle = paintColor;
        canvContx.lineTo(e.clientX, e.clientY);
        canvContx.stroke();
        canvContx.beginPath();        
        canvContx.arc(e.clientX, e.clientY, radius, 0, Math.PI * 2);
        canvContx.fill();

        canvContx.beginPath();
        canvContx.moveTo(e.clientX, e.clientY);
    }

    myCanvas.addEventListener('mousedown', startDrawing);
    myCanvas.addEventListener('mousemove', draw);
    myCanvas.addEventListener('mouseup', stopDrawing);

    /* 
    **  ----- MENU OPTIONS SECTION -----
    */

    const colorToChange = document.getElementById('paintColorChange');
    const chColorBtn = document.getElementById('chColor');
    chColorBtn.addEventListener('click', () => {
        let value = colorToChange.value;
        if(value.length < 6) return;
        else if(value.length == 6){
            bgContx.fillStyle = `#${value}`;
            bgContx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);

            canvContx.drawImage(backgroundCanvas, 0, 0);
        }
    });
});