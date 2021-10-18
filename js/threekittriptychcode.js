//the file is used for Triptych Canvas
/*
change log
1. File created 
2. 12-sept added new function setCAnvas and removed whihch were not required for Triptych
3. 22- Sept Added new funciton change Layout, updated add to cart function 

*/

//function to set the CanvasSize and image size onload
function setCanvasImage(cnH,cnW,imgH,imgW){
	
	   configurator.setConfiguration({
                "imageposHorizontal": imgW/2, // this is exception done. Because the current setup using image position and not canvas for Horizintal 
                "imageposVertical": cnH/2,
				"canvas_width_orig": cnW,
				"canvas_height_orig": Math.round(cnH),
				"image_height":imgH,
				"image_width":imgW

            })

	
	 finalObj.verticalPos = cnH/2;
     finalObj.horizontalPos = imgW/2;
	 finalObj.imageHeight = imgH;
	 finalObj.imageWidth = imgW;
	 finalObj.verticalMov = 0;
	 finalObj.horizontalMov = 0;
	
}
//creatng data for cart and imageMagic
function  addtocart(){
    //console.log(playerObj.getConfigurator('panelName').metadata);
	
	//Need to reclculate ImageSize and update object
	var imgHeight=finalObj.imageHeightOriginal;
	var imgWidth=finalObj.imageWidthOriginal;
		
	finalObj.metadata=playerObj.getConfigurator('panelName').metadata; 

		var dimension=(finalObj.metadata["_size"]).split("_");
		var centerDimension=(finalObj.metadata["Center"]).split("_");
		var sideDimension=(finalObj.metadata["Sides"]).split("_");
		
			imageMagickObj.canHeight=dimension[0];  
			imageMagickObj.canWidth=dimension[1];
			imageMagickObj.centerHeight=centerDimension[0];
			imageMagickObj.centerWidth=centerDimension[1];
			imageMagickObj.sideHeight=sideDimension[0];
			imageMagickObj.sideWidth=sideDimension[1];

		
		var canvasHeight=dimension[0];
		var canvasWidth=dimension[1];
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
	// storing Calculated values for final output
	imageMagickObj.imageHeightCal = imgHeight;
	imageMagickObj.imageWidthCal = imgWidth;
	
	
	result=  getSnaphot();
	
	
	promiseB = result.then(function(resulta) {
 imageMagickObj.snapshot=resulta;
});
	
  //console.log(getSnaphot,"snapshot"); 	
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
        var verticalPos = playerObj.configurator.appliedConfiguration["imageposVertical"];
        var horizontalPos = playerObj.configurator.appliedConfiguration["imageposHorizontal"];
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
            "imageposVertical": verticalPos,
           "imageposHorizontal": horizontalPos
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
//to get the assetID mapped to Triptych Model
function getAssetIDforVariant(variantid)    {
    const mapWD = new Map();

    




        //tripytch models
		//mapping with  Production Variant ID
        mapWD.set('32365183828055', "f1633cfa-f462-49f1-9793-b484a5f80f3a");//Classic Triptych
        mapWD.set('32366536327255', "bd7167ba-af06-4ea3-82ed-8577f50f13a7");//Classic Flow Triptych
        mapWD.set('32365179535447', "93faf5a0-098b-4409-95dd-072dbe2ca3ca");//Cozy Triptych
        mapWD.set('32366542258263', "727fc1b0-75cf-43e2-9089-535eb9aae8de");//Cozy Flow Triptych
        //mapping with SKU
		mapWD.set('CP-TRIP-CLAS-0000-001', "f1633cfa-f462-49f1-9793-b484a5f80f3a");//Classic Triptych
        mapWD.set('CP-TRIP-CLFL-0000-001', "bd7167ba-af06-4ea3-82ed-8577f50f13a7");//Classic Flow Triptych
        mapWD.set('CP-TRIP-COZ-0000-001', "93faf5a0-098b-4409-95dd-072dbe2ca3ca");//Cozy Triptych
        mapWD.set('CP-TRIP-CZFL-0000-001', "727fc1b0-75cf-43e2-9089-535eb9aae8de");//Cozy Flow Triptych
		//mapping with  Staging Variant ID
        mapWD.set('41012112556213', "f1633cfa-f462-49f1-9793-b484a5f80f3a");//Classic Triptych
        mapWD.set('41012112031925', "bd7167ba-af06-4ea3-82ed-8577f50f13a7");//Classic Flow Triptych
        mapWD.set('41012113113269', "93faf5a0-098b-4409-95dd-072dbe2ca3ca");//Cozy Triptych
        mapWD.set('41012111835317', "727fc1b0-75cf-43e2-9089-535eb9aae8de");//Cozy Flow Triptych
	
        
        return mapWD.get(variantid);

    }

function changeLayout(variantid)
{
	var panelAssetid= getAssetIDforVariant(variantid);
	
	configurator.setConfiguration({"panelName" : {assetId :panelAssetid}});
	
	
}

function getSnaphot() {
	

   // const promise = new Promise((resolve, reject) => {
     
            

     return (playerObj.snapshot());

     //  });

    //return promise;
}