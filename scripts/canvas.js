window.addEventListener('DOMContentLoaded', () => {
    // initialize the canvas
    const myCanvas = document.getElementById('myCanvas');
    const backgroundCanvas = document.getElementById('background');

    const canvContx = myCanvas.getContext('2d');
    const bgContx = backgroundCanvas.getContext('2d');

    // resizing the canvas 
    myCanvas.height = backgroundCanvas.height = document.body.clientHeight;
    myCanvas.width = backgroundCanvas.width = document.body.clientWidth;

    bgContx.fillStyle = '#1b4589';
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

    // catch the option buttons and sections
    const optionBtns = document.querySelectorAll('.option-btn');
    const sections = document.querySelectorAll('.option');
    const visible = [false, false, false];

    optionBtns.forEach((option, i, optionArray) => {
        option.addEventListener('click', () => {
            visible.forEach((value, j, theArray) => {
                if (theArray[j] == true && j != i) {
                    optionArray[j].classList.remove('option-active');
                    theArray[j] = false;
                    sections[j].style.transform = "scale(1, 0)";
                }
            });

            option.classList.toggle('option-active');

            if (!visible[i]) {
                visible[i] = true;
                sections[i].style.transform = "scale(1, 1)";
                console.log(visible);
            } else {
                visible[i] = false;
                sections[i].style.transform = "scale(1, 0)";
                console.log(visible);
            }
        });
    });

    // option 1 - change background color

    const bgColorRanges = document.querySelectorAll('.bg-color-range'); // ranges
    const resultDiv = document.getElementById('resultColor');
    const chColorBtn = document.getElementById('chColor'); // submit btn

    bgColorRanges.forEach((range, i, theArray) => {
        range.addEventListener('input', () => {
            let red = theArray[0].value;
            let green = theArray[1].value;
            let blue = theArray[2].value;

            let color = `rgb(${red}, ${green}, ${blue})`;
            resultDiv.style.backgroundColor = color;
        });
    });

    chColorBtn.addEventListener('click', () => {
        const style = window.getComputedStyle(resultDiv);
        bgContx.fillStyle = style.getPropertyValue('background-color');
        bgContx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
        canvContx.drawImage(backgroundCanvas, 0, 0);
    });    

    /* 
    **  ----- OTHER -----
    */
});