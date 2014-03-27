$(document).ready(function(){
    $('#submit').click(function(){
                 
       //image init 
        var userPic = $('#userPic');
        console.log(userPic);
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
            console.log(ctx.getImageData(0,0,100,100));
        }
    });
});




function GridElem(x,y){
    this.size = 10;
    this.x = x;
    this.y = y;
    this.color = function(){
        
    }
    
}

