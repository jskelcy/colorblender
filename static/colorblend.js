$(document).ready(function(){
    $('#submit').click(function(){
                 
       //image init 
        var userPic = $('#userPic');
        var image = new Image();
        userPic = userPic[0];
        //canvas init 
        var reader = new FileReader();
        var canvasWidth;
        var canvasHeight;

        reader.onload = function(e){
                image.src = e.target.result;
                canvasWidth = image.width;
                canvasHeight = image.height;
            }
        
        reader.readAsDataURL(userPic.files[0]);

        image.onload = function(){
            //this looks stupid but so is jquery
            var newCanvas = $('<canvas/>',{'id': 'dataCanvas', 'wiDth': canvasWidth, 'hEight': canvasHeight});
            $('#canvases').append(newCanvas)
            var ctx = newCanvas[0].getContext('2d');
            ctx.drawImage(image, 0, 0);
            var colorData = getGrid(50,50,ctx);
            //finishes the data collection 
            render(colorData, canvasWidth, canvasHeight);
        }
    });
});


//this function  will take in specified grid infomation form user
//It will then draw the grid onto the canvas  and return the color values 
//the next thing that needs to happen is to take the numRows and numColumns and make that come from user input
function getGrid(squareWidth,squareHeight, ctx){
    var gridValues =[];
    var yPosition = 0;
    //these lines need to be arugents
    var numRows = 38;
    var numColumns = 21; 
    //vertical
    for(var row = 0; row < numRows; ++row){
        xPosition =0;
        var gridRow =[];
        //horizontal
        for(var column = 0; column < numColumns; ++column){
            var pixelData = ctx.getImageData(xPosition, yPosition, 1, 1).data;
            gridRow.push({'R':pixelData[0], 'G':pixelData[1], 'B': pixelData[2]});
            xPosition += squareWidth;
        }
        yPosition += squareHeight;
        gridValues.push(gridRow);
    }
    return gridValues;
}

//This function creates a new canvas after all the data has been collected from the 'getGrid' function 
//It well then draw a rectangles with the color in the colorData array.
//right now we are multiplying things by 50. I dont know why. But at some point we will need to take in the 
//numRows and numColumns data and use that tell the ctx where to print
function render(colorData,canvasWidth,canvasHeight){
    var squareSize = 50;
    var newCanvas = $('<canvas/>',{'id': 'printCanvas', 'wiDth': canvasWidth, 'hEight': canvasHeight});
    $('#canvases').append(newCanvas)
    var ctx = newCanvas[0].getContext('2d');
    //DONT FORGET: the yPos and xPos are relative to the array, not to the position where the rectangle is being printed on the canvas
   for(var yPos = 0, yLen = colorData.length; yPos < yLen; yPos++){
        for(var xPos = 0, xLen = colorData[yPos].length; xPos < xLen; xPos++){
            console.log(xPos, yPos)
            ctx.fillStyle ='rgb(' + colorData[xPos][yPos].R +',' + colorData[xPos][yPos].G +',' + colorData[xPos][yPos].B+')';
            ctx.fillRect(yPos*squareSize,xPos*squareSize,squareSize,squareSize);
       }
    }
}


function commonFactors(value1, value2){
    var min = Math.min(value1, value2);
    var commonArray = _.filter(_.range(1, min+1),function(x){
        if(value1%x === 0 && value2%x === 0){
            return true
        }
    })
    return commonArray
}