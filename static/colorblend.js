;(function() {
    $(document).ready(function(){
	
	function SelectMenu(selector, options) {
	    var selected = 0;
	
	    _.map(options, function(opt) {
                $(selector).append("<option value='" + opt.id + "'>" +
                                          opt.label + "</option>");
	    });
	    
	    $(selector).change(function() {
		selected = $("select option:selected").val();
	    });

	    return {
		 getSelected: function() {
		    return parseInt(selected);
		}
	    };
	}

	function Slider(selector, options) {
	    var selected = 0;
	    
	    $(selector).slider({
                    min:0,
                    max: options.length-1,
                    value: Math.floor(options.length/2),
                    slide: function(event, ui){
                        console.log(options[ui.value]);
                        var numRows = canvasWidth/options[ui.value];
                        var numColumns = canvasHeight/options[ui.value];
                        var colorData = getGrid(numRows, numColumns, ctx, canvasWidth/numRows);
                        console.log(canvasWidth);
                        render(colorData, canvasWidth, canvasHeight, canvasWidth/numRows);
                    }
                });
	};
	
	var resMenu = new SelectMenu("#sizeselector", [{id: 0,
						   res: {width: 640, height: 960},
						   label: "iPhone (4-inch)", make: "Apple"},
						  {id: 1,
						   res: {width: 640, height: 1120}, 
						   label: "iPhone (5-inch)", make: "Apple"},
						  {id: 2,
						   res: {width: 768, height: 1024}, 
						   label: "iPad (old)", make: "Apple"},
						  {id: 3,
						   res: {width: 1536, height: 2048}, 
						   label: "iPad (new)", make: "Apple"},
						  {id: 4,
						   res: {width: 720, height: 1280}, 
						   label: "Galaxy SIII", make: "Android"},
						  {id: 5,
						   res: {width: 1080, height: 1920}, 
						   label: "Galaxy S4, S5, and Nexus 5", make: "Android"}]);
	
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
            };

            reader.readAsDataURL(userPic.files[0]);

            image.onload = function(){
                //adjusts slider ratio to fit canvas size
                //this looks stupid but so is jquery
                var sliderOptions = commonFactors(canvasHeight, canvasWidth);
                console.log(sliderOptions);
		var newCanvas = $('<canvas/>').attr({'id': 'input-canvas', 'wiDth': canvasWidth, 'hEight': canvasHeight,});
		var ctx = newCanvas[0].getContext('2d');
		$("#input-canvas").replaceWith(newCanvas);
	//      off for testing
	//	$(newCanvas).css('display','none');
		ctx.drawImage(image, 0, 0);
                $("#slider").slider({
                    min:0,
                    max: sliderOptions.length-1,
                    value: Math.floor(sliderOptions.length/2),
                    slide: function(event, ui){
                        console.log(sliderOptions[ui.value]);
                        var numRows = canvasWidth/sliderOptions[ui.value];
                        var numColumns = canvasHeight/sliderOptions[ui.value];
                        var colorData = getGrid(numRows, numColumns, ctx, canvasWidth/numRows);
                        console.log(canvasWidth);
                        render(colorData, canvasWidth, canvasHeight, canvasWidth/numRows);
                    }
                });
            };
        });

        //this function  will take in specified grid infomation form user
        //It will then draw the grid onto the canvas  and return the color values
        //the next thing that needs to happen is to take the numRows and numColumns and make that come from user input
        function getGrid(numRows, numColumns, ctx, squareSize){
            var gridValues =[];
            var yPosition = 0;
            //vertical
            for(var row = 0; row < numRows; ++row){
                xPosition =0;
                var gridRow =[];
                //horizontal
                for(var column = 0; column < numColumns; ++column){
                    var pixelData = ctx.getImageData(xPosition, yPosition, 1, 1).data;
                    gridRow.push({'R':pixelData[0], 'G':pixelData[1], 'B': pixelData[2]});
                    xPosition += squareSize;
                }
                yPosition += squareSize;
                gridValues.push(gridRow);
            }
            return gridValues;
        }

        //This function creates a new canvas after all the data has been collected from the 'getGrid' function 
        //It well then draw a rectangles with the color in the colorData array.
        //right now we are multiplying things by 50. I dont know why. But at some point we will need to take in the 
        //numRows and numColumns data and use that tell the ctx where to print
        function render(colorData,canvasWidth,canvasHeight, squareSize){
            var newCanvas = $('#output-canvas');
            //draws a new canvas on top of the old one 
            if( newCanvas[0] === undefined){
                // lyndsey wrote this jquery hack but does not remember why six months later
                newCanvas = $('<canvas/>').attr({'id': 'output-canvas', 'wiDth': canvasWidth, 'hEight': canvasHeight});
                $("#output-canvas").replaceWith(newCanvas);
            }
            console.log(colorData);
            var ctx = newCanvas[0].getContext('2d');
            //DONT FORGET: the yPos and xPos are relative to the array, not to the position where the rectangle is being printed on the canvas
            for(var yPos = 0, yLen = colorData[0].length-1; yPos <= yLen; yPos++){
                for(var xPos = 0, xLen = colorData.length-1; xPos <= xLen; xPos++){
                    ctx.fillStyle ='rgb(' + colorData[xPos][yPos].R +',' + colorData[xPos][yPos].G +',' + colorData[xPos][yPos].B+')';
                    ctx.fillRect(yPos*squareSize,xPos*squareSize,squareSize,squareSize);
                }
            }
        }


        function commonFactors(value1, value2){
            var min = Math.min(value1, value2);
            var commonArray = _.filter(_.range(1, min+1),function(x){
                if(value1%x === 0 && value2%x === 0){
                    return true;
                }
            });
            return commonArray;
        }
    });
})();
