var draw = (function() {

    //Get the height and width of the main we will use this set canvas to the full
    //size of the main element.
    var mWidth = document.querySelector('main').offsetWidth,
    mHeight = document.querySelector('main').offsetHeight,

    //Create the canvas
    canvas = document.createElement("canvas"),

    //Create the context
    ctx = canvas.getContext("2d"),

    //Create the initial bounding rectangle
    rect = canvas.getBoundingClientRect(),

    //current x,y
    x=0,
    y=0,

    //starting x,y
    x1=0,
    y1=0,

    //ending x,y
    x2=0,
    y2=0,

    //Tracks the last x,y state
    lx = false,
    ly = false,

    //What shape are we drawing?
    shape='',

    isDrawing=false;

    return {
        //Set the x,y coords based on current event data
        setXY: function(evt) {
            //Track the last x,y position before setting the current position.
            lx=x;
            ly=y;

            //Set the current x,y position
            x = (evt.clientX - rect.left) - canvas.offsetLeft;
            y = (evt.clientY - rect.top) - canvas.offsetTop;
        },

        //Write the x,y coods to the target div
        writeXY: function() {
            document.getElementById('trackX').innerHTML = 'X: ' + x;
            document.getElementById('trackY').innerHTML = 'Y: ' + y;
        },

        getCanvas: function(){
            return canvas;
        },

        getShape: function() {
            return shape;
        },

        getIsDrawing: function() {
            return isDrawing;
        },

        setStart: function() {
            x1=x;
            y1=y;
        },

        setEnd: function() {
            x2=x;
            y2=y;
        },

        //Sets the shape to be drawn
        setShape: function(shp) {
            shape = shp;
        },

        setIsDrawing: function(bool) {
            isDrawing = bool;
        },

        //Draws the selected shape
        draw: function() {
            ctx.restore();
            if(shape==='rectangle')
            {
                this.drawRect();
            } else if( shape==='line' ) {
                this.drawLine();
            } else if( shape==='path' ) {
                this.drawPath();
            } else if( shape==='circle' ) {
                this.drawCircle();
            } else if( shape==='triangle' ) {
                this.drawTriangle();
            } else if( shape==='r_triangle' ) {
                this.drawRightTriangle();
            } else if( shape==='text' ) {
                this.drawText();
            } else {
                alert('Please choose a shape');
            }
            ctx.save();
        },

        //Draw a line
        drawLine: function() {
            if(document.getElementById("rndColor").checked) {
                ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
            }
            else {
                ctx.strokeStyle = document.getElementById("colorBox").value;
            }
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        },

        //Draw a path
        drawPath: function() {
            //console.log({x1:x,y1:y,x2:x2,y2:y2});
            if(document.getElementById("rndColor").checked) {
                ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
            }
            else {
                ctx.strokeStyle = document.getElementById("colorBox").value;
            }
            ctx.beginPath();
            ctx.moveTo(lx, ly);
            ctx.lineTo(x, y);
            ctx.stroke();
        },

        //Draw a rectangle
        drawRect: function(x,y,h,w) {
            if(document.getElementById("rndColor").checked) {
                ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
            }
            else {
                ctx.fillStyle = document.getElementById("colorBox").value;
            }
            ctx.fillRect (x1,y1,(x2-x1),(y2-y1));
        },

        //Draw a circle
        drawCircle: function() {
            if(document.getElementById("rndColor").checked) {
                ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
                ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
            }
            else {
                ctx.strokeStyle = document.getElementById("colorBox").value;
                ctx.fillStyle = document.getElementById("colorBox").value;
            }

            let a = (x1-x2)
            let b = (y1-y2)
            let radius = Math.sqrt( a*a + b*b );

            ctx.beginPath();
            ctx.arc(x1, y1, radius, 0, 2*Math.PI);
            ctx.stroke();
            ctx.fill();
        },

        //Draw a triangle
        drawTriangle: function() {
            if(document.getElementById("rndColor").checked) {
                ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
            }
            else {
                ctx.fillStyle = document.getElementById("colorBox").value;
            }

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y1);
            ctx.lineTo((x1+x2)/2, y2);
            ctx.fill();
        },

        //Draw a right triangle
        drawRightTriangle: function() {
            if(document.getElementById("rndColor").checked) {
                ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
            }
            else {
                ctx.fillStyle = document.getElementById("colorBox").value;
            }

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x1, y2);
            ctx.fill();
        },

        //Draw text
        drawText: function() {
            if(document.getElementById("rndColor").checked) {
                ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
            }
            else {
                ctx.fillStyle = document.getElementById("colorBox").value;
            }

            ctx.font = '48px arial';
            ctx.fillText(document.getElementById('textBox').value, x2, y2);
        },

        //Initialize the object, this must be called before anything else
        init: function() {
            canvas.width = mWidth;
            canvas.height = mHeight;
            document.querySelector('main').appendChild(canvas);
            this.writeXY();
        }
    };
})();

//Initialize draw
draw.init();

//Add a mousemove listener to the canvas
//When the mouse reports a change of position use the event data to
//set and report the x,y position on the mouse.
draw.getCanvas().addEventListener('mousemove', function(evt) {
    draw.setXY(evt);
    draw.writeXY();
    if(draw.getShape()=='path' && draw.getIsDrawing()===true) {
        draw.draw();
    }
}, false);

//Set the starting position
draw.getCanvas().addEventListener('mousedown', function() {
    draw.setStart();
    draw.setIsDrawing(true);
}, false);

draw.getCanvas().addEventListener('mouseup', function() {
    draw.setEnd();
    draw.draw();
    draw.setIsDrawing(false);
}, false);

document.getElementById('btnLine').addEventListener('click',function(){
    draw.setShape('line');
}, false);

document.getElementById('btnPath').addEventListener('click', function(){
    draw.setShape('path');
}, false);

document.getElementById('btnRect').addEventListener('click',function(){
    draw.setShape('rectangle');
}, false);

document.getElementById('btnCircle').addEventListener('click', function(){
    draw.setShape('circle');
}, false);

document.getElementById('btnTriangle').addEventListener('click', function(){
    draw.setShape('triangle');
}, false);

document.getElementById('btnRTriangle').addEventListener('click', function(){
    draw.setShape('r_triangle');
}, false);

document.getElementById('btnText').addEventListener('click', function(){
    draw.setShape('text');
}, false);