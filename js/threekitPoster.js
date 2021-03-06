//the file is used for Custom Canvas
/*
change log
1. File created 18-oct
2. Function added for snapshot
3. Function updated for snapshot from base64 to URL
4. Function added to change the depth
5. Need to update the code for frames more than 4K, update zoom function
*/

//function to set the FrameSize,CanvasSize and image size onload. Here canvas is refered to Threekitobject on which image get loaded. And Frame is Canvas Print canvas 
function setCanvasImage(frmH,frmW,cnH,cnW,imgH,imgW){
	//console.log("hello");
	//console.log("frmH W",frmH,frmW, "cnH",cnH,cnW,"imgH",imgH,"imgw",imgW);	
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
//update the border
function setBorder(){
	//console.log("inside setborder");
    var borderSize = document.getElementById("canBorder").value;
    imageMagickObj.border = borderSize;
	
	var frmHeight=finalObj.frmH;
	var frmWidth=finalObj.frmW;
    
	if (borderSize==='0'){
    borderAssetID="76e75bde-1ca8-4e84-849a-948feb91bcb4";//Full bleed
    }
    else if (borderSize==='1'){
    borderAssetID="384129b0-b205-4ecc-b9a0-a7d5ed46671e";
    frmHeight=frmHeight-192;
	frmWidth=frmWidth-192;
	}
    else if (borderSize==='0.5'){
    borderAssetID="065f5ead-6e35-4016-9f91-fc452444ac7f";
	frmHeight=frmHeight-96;
	frmWidth=frmWidth-96;
    }
   
    else {
    borderAssetID="76e75bde-1ca8-4e84-849a-948feb91bcb4"; //Full Bleed
    
    }
	changeCanHeiWid(frmHeight,frmWidth);
    configurator.setConfiguration({"Poster_Border" : {assetId :borderAssetID}}); 
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
	
	//console.log("changeLayout");
	
	var canvasWidth = document.getElementById("canWidth").value;
	var canvasHeight= document.getElementById("canHeight").value;
	if(canvasWidth<8 || canvasWidth >60 || canvasHeight<8 || canvasHeight >60)
		return;
	canvasHeight=canvasHeight * 96;
	canvasWidth = canvasWidth * 96;
	finalObj.frmH=canvasHeight;
	finalObj.frmW=canvasWidth;
	changeCanHeiWid(canvasHeight,canvasWidth);
}
//the function will change the size of the canvas and reset the image
function changeCanHeiWid(canvasHeight,canvasWidth)
{	
	var imgHeight=finalObj.imageHeightOriginal;
	var imgWidth=finalObj.imageWidthOriginal;
	
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

function setFinish(colorVal){
    var borderAssetID;
    imageMagickObj.Finish = colorVal;

    if (colorVal==='Satin'){
    borderAssetID="87397c36-36e8-4c65-88b8-a51d7dce4edd";
    }
    else if (colorVal==='Glossy'){
    borderAssetID="71346312-d1ae-4649-9940-72d6ab672d60";
    }
    else if (colorVal==='Matte'){
    borderAssetID="50eb0c8e-b89c-4af8-8ff2-e91552630982";
    }
   
    else {
    borderAssetID="71346312-d1ae-4649-9940-72d6ab672d60"; //Glossy
    
    }
    configurator.setConfiguration({"PosterFinish" : {assetId :borderAssetID}}); 
}