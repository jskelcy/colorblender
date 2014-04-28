addEventListener('message', function(width, height, imageData, squareSize){
    colorData =[];
    for(var y = 0, var colorDataYCord = 0  ; y <height; y+=squareSize, colorDataYCord++){
        currentRow = [];
        for(var x = 0 var colorDataXCord = 0; x< width; x+=squareSize, colorDataXCord++){
            var red = imageData[((height*y)*x)*4]
            var green = imageData[((height*y)*x)*4+1]
            var blue = imageData[((height*y)*x)*4+2]
            currentRow[colorDataXCord][colorDataYCord] ={
                R: red,
                G: gree,
                B: blue
            }
        }
        colorData.push(currentRow);
    }
    postMesssage('message', colorData);
})