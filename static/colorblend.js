$(document).ready(function(){
    $('#submit').click(function(){
                 
       //image init 
        var userPic = $('#userPic');
        var image = new Image();
        userPic = userPic[0];
        //canvas init 
        var canvas = $('#dataCanvas');
        var ctx = canvas[0].getContext('2d');
        var reader = new FileReader();
        
        reader.onload = function(e){
                image.src = e.target.result; 
            }
        
        reader.readAsDataURL(userPic.files[0]);

        image.onload = function(){
            ctx.drawImage(image, 0, 0, 500, 500);
            var data = drawGrid(10,10,ctx);
            console.log(data);
        }
    });
});



function drawGrid(squareWidth,squareHeight, ctx){
    var gridValues =[];
    var yPosition = 0;
    var numRows = 50;
    var numColumns = 50; //vertical
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

