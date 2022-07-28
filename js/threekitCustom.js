//the file is used for Custom Canvas
/*
change log
1. File created 18-oct
2. Function added for snapshot
3. Function updated for snapshot from base64 to URL
4. Function added to change the depth
5. Need to update the code for frames more than 4K, update zoom function
6. Function added to show Frame
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
	console.log(imageValue);

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
	
	var imgHeight=finalObj.imageHeightOriginal;
	var imgWidth=finalObj.imageWidthOriginal;
	//console.log("changeLayout >>original",imgHeight,imgWidth)
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
			
			console.log("imahe height,width",height,width);
			
			
			finalObj.ratio=imageRatio;
            imageMagickObj.imageHeight = height;
            imageMagickObj.imageWidth = width;
			configurator.setConfiguration({
                "image_height": height,
                "image_width": width
            })

        }
//change depth
function changedepth(val)
{
	if(val == "0.75" || val=="1.5")
	playerObj.configurator.setConfiguration({"BorderSize" : val});
else 
	console.log("not valid value");
}
//snapshot code
async function snapShot() {

  playerObj.api.selectionSet.clear();
  let resultimage = await getSnapShotUrl(assetId,orgID);
  imageMagickObj.resultimage = resultimage;

}

//Show Frame
function ShowFrame(val) {

  configurator.setConfiguration({
                "Show_Frame": val
            })

}
//set Frame Color
function setFrame(colorVal){
    var borderAssetID;
    imageMagickObj.FrameCol = colorVal;

    if (colorVal==='White'){
    borderAssetID="f43bced3-f475-4cc3-891d-dc831a928152";
    }
    else if (colorVal==='Natural'){
    borderAssetID="c7b8cefc-eea1-477c-a563-0b6ce8d61bb7";
    }
    else if (colorVal==='Gold'){
    borderAssetID="c4975285-a10d-457f-a5ab-d1dc5bb521f3";
    }
    else if (colorVal==='Expresso'){
    borderAssetID="bb94b433-e39f-4105-b250-2e503de94092";
   
    }
	 else if (colorVal==='Black'){
    borderAssetID="b4ed77ee-44ec-4f54-b115-93a2b99c8eda";
   
    }
    else {
    borderAssetID="b4ed77ee-44ec-4f54-b115-93a2b99c8eda"; //black
    
    }
    configurator.setConfiguration({"Custom_Frame_Color" : {assetId :borderAssetID}}); 
}
