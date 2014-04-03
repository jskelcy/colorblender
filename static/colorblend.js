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



function getGrid(squareWidth,squareHeight, ctx){
    var gridValues =[];
    var yPosition = 0;
    var numRows = 10;
    var numColumns = 10; 
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


function render(colorData,canvasWidth,canvasHeight){
    var newCanvas = $('<canvas/>',{'id': 'printCanvas', 'wiDth': canvasWidth, 'hEight': canvasHeight});
    $('#canvases').append(newCanvas)
    var ctx = newCanvas[0].getContext('2d');
     
   for(var yPos = 0, yLen = colorData.length; yPos < yLen; yPos++){
        for(var xPos = 0, xLen = colorData[yPos].length; xPos < xLen; xPos++){
            ctx.fillStyle ='rgb(' + colorData[xPos][yPos].R +',' + colorData[xPos][yPos].G +',' + colorData[xPos][yPos].B+')';
            ctx.fillRect(yPos*50,xPos*50,50,50);
       }
    }
}
