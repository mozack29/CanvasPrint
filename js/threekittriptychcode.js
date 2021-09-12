//the file is used for Triptych Canvas
/*
change log
1. File created 
2. 12-sept added new function setCAnvas and removed whihch were not required for Triptych
3. 

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

	
	 /*finalObj[selectNodeName].verticalPos = cnH/2;
     finalObj[selectNodeName].horizontalPos = cnW/2;
	 finalObj[selectNodeName].canvasHeight = cnH;
	 finalObj[selectNodeName].canvasWidth = cnW;
	 finalObj[selectNodeName].imageHeight = imgH;
	 finalObj[selectNodeName].imageWidth = imgW;
	 finalObj[selectNodeName].verticalMov = 0;
	 finalObj[selectNodeName].horizontalMov = 0;
	 finalObj[selectNodeName].rotate = 0;
*/
}
//creatng data for cart and imageMagic
function addtocart(){
    //console.log(playerObj.getConfigurator('panelName').metadata);
    finalObj.metadata=playerObj.getConfigurator('panelName').metadata;   
    console.log(finalObj);
}
//update the border
function setBorder(colorVal){
    var borderAssetID;
    finalObj.border = colorVal;

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

        if (direction == 'Right') {
            horizontalPos = horizontalPos + 20;
        }

        if (direction == 'Left') {
            horizontalPos = horizontalPos - 20;
        }

        if (direction == 'Down') {
            verticalPos = verticalPos + 20;
        }

        if (direction == 'Up') {
            verticalPos = verticalPos - 20;
        }
        finalObj.verticalPos = verticalPos;
        finalObj.horizontalPos = horizontalPos;

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
            finalObj.blacknwhite = true;

        } else {
            configurator.setConfiguration({
                "blackwhite_global": false
            })
            finalObj.blacknwhite = false;

        }
    }
//to get the assetID mapped to Triptych Model
function getAssetIDforVariant(variantid)    {
    const mapWD = new Map();

    




        //tripytch models

        mapWD.set('32365183828055', "f1633cfa-f462-49f1-9793-b484a5f80f3a");//Classic Triptych
        mapWD.set('32366536327255', "bd7167ba-af06-4ea3-82ed-8577f50f13a7");//Classic Flow Triptych
        mapWD.set('32365179535447', "93faf5a0-098b-4409-95dd-072dbe2ca3ca");//Cozy Triptych
        mapWD.set('32366542258263', "727fc1b0-75cf-43e2-9089-535eb9aae8de");//Cozy Flow Triptych
        
        
        return mapWD.get(variantid);

    }