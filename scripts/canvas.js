window.addEventListener('DOMContentLoaded', () => {
    // initialize the canvas
    const myCanvas = document.getElementById('myCanvas');
    const canvContx = myCanvas.getContext('2d');

    // resizing the canvas and adding responsibility to this 
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    
});

function resizeCanvas() {
    myCanvas.height = window.innerHeight;
    myCanvas.width = window.innerWidth;
}