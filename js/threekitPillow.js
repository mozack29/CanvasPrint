//the file is used for Custom Pillow
/*
change log
1. File created 14-April

*/

//function to set the FrameSize,CanvasSize and image size onload. Here canvas is refered to Threekitobject on which image get loaded. And Frame is Canvas Print canvas 
function setCanvasImage(frmH,frmW,cnH,cnW,imgH,imgW){
	//console.log("cnH",cnH,cnW,"imgH",imgH,"imgw",imgW);	
	   configurator.setConfiguration({
                "canvas_horizontal_global": cnW/2, // 
                "canvas_vertical_global": cnH/2,
				"canvas_width_orig": cnW,
				"canvas_height_orig": cnH,
				"image_height":imgH,
				"image_width":imgW,
				"Frame_Width" : frmW,
				"Frame_Height" : frmH
            })


	 imageMagickObj.verticalPos = cnH/2;
     imageMagickObj.horizontalPos = cnW/2;
	 imageMagickObj.imageHeight = imgH;// * finalObj.reduceRatio;
	 imageMagickObj.imageWidth = imgW;// * finalObj.reduceRatio;
	 imageMagickObj.verticalMov = 0;
	 imageMagickObj.horizontalMov = 0;
	imageMagickObj.canHeight=frmH;
	imageMagickObj.canWidth=frmW;
}
//creatng data for cart and imageMagic
function  addtocart(){
    snapShot();
	
	 imageMagickObj.imageHeight = Math.round(imageMagickObj.imageHeight * finalObj.reduceRatio);
	 imageMagickObj.imageWidth = Math.round(imageMagickObj.imageWidth * finalObj.reduceRatio);
	 imageMagickObj.verticalPos = Math.round(imageMagickObj.verticalPos * finalObj.reduceRatio);
	 imageMagickObj.horizontalPos = Math.round(imageMagickObj.horizontalPos * finalObj.reduceRatio);
	
    console.log(imageMagickObj);
	//console.log(finalObj);
	
}

//update the image in canvas	
function changeImage(imageValue) {

        configurator.setConfiguration({
            'sourceImage': {
                assetId: imageValue
            }
        });

    }
//to move image in 4 directions within canvas
function movefourdirection(direction) {
    if(playerObj.configurator===null)
        return;
        var verticalPos = playerObj.configurator.appliedConfiguration["canvas_vertical_global"];
        var horizontalPos = playerObj.configurator.appliedConfiguration["canvas_horizontal_global"];
		var verticalMov=imageMagickObj.verticalMov;
		var horizontalMov=imageMagickObj.horizontalMov;

            
		if (direction == 'Right') {
                horizontalPos = horizontalPos + 10;
				horizontalMov=horizontalMov-10;
            }

            if (direction == 'Left') {
                horizontalPos = horizontalPos - 10;
				horizontalMov=horizontalMov+10;
            }

            if (direction == 'Down') {
                verticalPos = verticalPos + 10;
				verticalMov=verticalMov+10;
            }

            if (direction == 'Up') {
                verticalPos = verticalPos - 10;
				verticalMov=verticalMov-10;
            }
		
		
        finalObj.verticalPos = verticalPos;
        finalObj.horizontalPos = horizontalPos;
		
		imageMagickObj.verticalMov = verticalMov;
		imageMagickObj.horizontalMov = horizontalMov;

        configurator.setConfiguration({
            "canvas_vertical_global": verticalPos,
           "canvas_horizontal_global": horizontalPos
        })

    }
//to change the image balck and white
function blacknwhiteimage() {
	console.log("blackand white");
        if(configurator===null)
        return;

        var bw = playerObj.configurator.appliedConfiguration["blackwhite_global"];
        //default false
        if (bw == false) {
            configurator.setConfiguration({
                "blackwhite_global": true
            })
            imageMagickObj.blacknwhite = true;

        } else {
            configurator.setConfiguration({
                "blackwhite_global": false
            })
            imageMagickObj.blacknwhite = false;

        }
    }

//the function will change the size of the canvas and reset the image
function changeLayout(){
	
	//console.log("changeLayout");
	
	var canvasWidth = document.getElementById("canWidth").value;
	var canvasHeight= document.getElementById("canHeight").value;
	if(canvasWidth<8 || canvasWidth >26 || canvasHeight<8 || canvasHeight >26)
		return;
	canvasHeight=canvasHeight * 96;
	canvasWidth = canvasWidth * 96;
	
	var imgHeight=finalObj.imageHeightOriginal;
	var imgWidth=finalObj.imageWidthOriginal;
	console.log("changeLayout >>original",imgHeight,imgWidth)
	var heightRatio= canvasHeight /imgHeight;
	var widthRatio= canvasWidth /imgWidth;

	if(heightRatio>widthRatio)
		{
			
			imgHeight=imgHeight*heightRatio;
			imgWidth=imgWidth*heightRatio;
			
		}
		else
		{
			imgHeight=imgHeight*widthRatio;
			imgWidth=imgWidth*widthRatio;
			
		}


		var reduceRatio=updatedSize4k(canvasHeight,canvasWidth,imgHeight,imgWidth); //Matching it to 4k size 
		
		finalObj.reduceRatio=reduceRatio;
		var updatedCanvasHeight=canvasHeight/reduceRatio;
		var updatedCanvasWidth=canvasWidth/reduceRatio;
		var updatedImageHeight=imgHeight/reduceRatio;
		var updatedImageWidth=imgWidth/reduceRatio;


		//set the canvas and image properties -- Passing Frame height and width. Threekit- Canvas height and width , Image height and width 
		setCanvasImage(canvasHeight,canvasWidth,updatedCanvasHeight,updatedCanvasWidth,Math.round(updatedImageHeight),Math.round(updatedImageWidth));

	
	
	//reset rotation
	   var rotate = 0;
           
            imageMagickObj.rotate = rotate;
            configurator.setConfiguration({
                "canvas_rotation_global": rotate
            })
	//reset imageratio
	finalObj.ratio=1;
}
//to rotate image
function rotateimage() {
if(playerObj.configurator===null)
        return;
	
	
            var rotate = playerObj.configurator.appliedConfiguration["canvas_rotation_global"];
            rotate = rotate + 5;
			if(rotate>=360)
				rotate=0;
            imageMagickObj.rotate = rotate;
            configurator.setConfiguration({
                "canvas_rotation_global": rotate
            })

        }
//zoom in zoom out
function zoominoutimage(scale) {
			if(playerObj.configurator===null)
        return;

			var imageRatio=finalObj.ratio;
			var height = imageMagickObj.imageHeight;
            var width = imageMagickObj.imageWidth;
			if(imageRatio===0)
			return;

            if (scale == 'Plus') 
			{
				imageRatio = imageRatio + .1;
				height=height + height * .1;
				width=width + width * .1;
                
			}
            if (scale == 'Minus') 
			{
				imageRatio = imageRatio - .1;
				height=height - height * .1;
				width=width - width * .1;
			}
			
			
			
			
			finalObj.ratio=imageRatio;
            imageMagickObj.imageHeight = height;
            imageMagickObj.imageWidth = width;
			configurator.setConfiguration({
                "image_height": height,
                "image_width": width
            })

        }
//snapshot code
async function snapShot() {

  playerObj.api.selectionSet.clear();
  let resultimage = await getSnapShotUrl(assetId,orgID);
  imageMagickObj.resultimage = resultimage;

}

