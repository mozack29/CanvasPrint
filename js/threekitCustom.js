//the file is used for Custom Canvas
/*
change log
1. File created 18-oct
2. Function added for snapshot
3. Function updated for snapshot from base64 to URL
*/

//function to set the CanvasSize and image size onload
function setCanvasImage(cnH,cnW,imgH,imgW){
	
	   configurator.setConfiguration({
                "canvas_horizontal_global": cnW/2, // this is exception done. Because the current setup using image position and not canvas for Horizintal 
                "canvas_vertical_global": cnH/2,
				"canvas_width_orig": cnW,
				"canvas_height_orig": cnH,
				"image_height":imgH,
				"image_width":imgW

            })

	
	 imageMagickObj.verticalPos = cnH/2;
     imageMagickObj.horizontalPos = cnW/2;
	 imageMagickObj.imageHeight = imgH;
	 imageMagickObj.imageWidth = imgW;
	 imageMagickObj.verticalMov = 0;
	 imageMagickObj.horizontalMov = 0;
	imageMagickObj.canHeight=cnH;
	imageMagickObj.canWidth=cnW;
}
//creatng data for cart and imageMagic
function  addtocart(){
    snapShot();
    console.log(imageMagickObj);
}
//update the border
function setBorder(colorVal){
    var borderAssetID;
    imageMagickObj.border = colorVal;

    if (colorVal==='Black'){
    borderAssetID="63ccea68-4d3b-4637-9fca-962147956e89";
    }
    else if (colorVal==='Grey'){
    borderAssetID="43b9d81e-1d81-4b67-9b7b-83737fcbcc53";
    }
    else if (colorVal==='White'){
    borderAssetID="1f779f81-c495-4c40-b186-9b82aedc2a7a";
    }
    else if (colorVal==='Mirror'){
    borderAssetID="efdd80a1-6e0e-4a5e-9666-7352769432a3";
   
    }
    else {
    borderAssetID="35baefef-b860-434a-a1e3-4a8569507149"; //blur
    
    }
    configurator.setConfiguration({"Border" : {assetId :borderAssetID}}); 
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
//to get the assetID mapped to custom model
function getAssetIDforVariant(variantid)    {
    const mapWD = new Map();

    




        
	
        
        return mapWD.get(variantid);

    }
//the function will change the size of the canvas and reset the image
function changeLayout(){
	var canWidth = document.getElementById("canWidth").value;
	var canHeight= document.getElementById("canHeight").value;
	if(canWidth<8 || canWidth >40 || canHeight<8 || canHeight >40)
		return;
	canHeight=canHeight * 96;
	canWidth = canWidth * 96;
	
	var imgHeight=finalObj.imageHeightOriginal;
	var imgWidth=finalObj.imageWidthOriginal;
	
	var heightRatio= canHeight /imgHeight;
	var widthRatio= canWidth /imgWidth;

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


	setCanvasImage(canHeight ,canWidth,imgHeight,imgWidth);//cnH,cnW,imgH,imgW
	
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