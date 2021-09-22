//the file is used for Collage Canvas
/*
change log
1. 21-09-2021 File created - Updated getMaterialConfigurator,addToolToScene
2. 
3. 

*/
//function to set the CanvasSize and image size onload
function setCanvasImage(cnH,cnW,imgH,imgW){
	console.log("canHW",cnH,cnW,"imageHW",imgH,imgW);
	   configuratorobj.setConfiguration({
                "canvas_vertical_global": cnH/2,
                "canvas_horizontal_global": cnW/2,
				"canvas_width_orig": cnW,
				"canvas_height_orig": cnH,
				"image_height":imgH,
				"image_width":imgW

            })

	
	 finalObj[selectNodeName].verticalPos = cnH/2;
     finalObj[selectNodeName].horizontalPos = cnW/2;
	 finalObj[selectNodeName].canvasHeight = cnH;
	 finalObj[selectNodeName].canvasWidth = cnW;
	 finalObj[selectNodeName].imageHeight = imgH;
	 finalObj[selectNodeName].imageWidth = imgW;
	 finalObj[selectNodeName].verticalMov = 0;
	 finalObj[selectNodeName].horizontalMov = 0;
	 finalObj[selectNodeName].rotate = 0;

}   
//creatng data for cart and imageMagic
function addtocart(){
		
		console.log(finalObj);
	}
//update the border
function setBorder(colorVal)	{
		
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
  
    configurator.setConfiguration({"Border" : {assetId :borderAssetID}}); 
	}
//update the image in canvas	
function changeImage(imageValue) {

            configuratorobj.setConfiguration({
                'sourceImage': {
                    assetId: imageValue
                }
            });

        }
//getting material Configurator	
async function getMaterialConfigurator() {
            const panelid = playerObj.configurator.appliedConfiguration["panelName"]
            var assetInstance = await playerObj.getAssetInstance({
                id: panelid,
                plug: "Proxy",
                property: "asset"
            })
            configuratorobj = await playerObj.getConfiguratorInstance({
                from: api.scene.findNode({
                    from: assetInstance,
                    name: 'Root' // this is name of the Root object. In 3Kit always the start node name should be Root
                }),
                name: selectNodeName, //this is frame1,frame2
                plug: 'Material',
                property: 'reference'
            })
        }
//add select to scene	
function addToolToScene() {

		finalObj.border = 'Black';//default value is Blur 
		
		
            api.tools.addTool({
                    key: 'CanvasPrintCollage',
                    label: 'Select',
                    active: true,
                    enabled: true,
                    handlers: {

                        mousedown: e => {
							//when nothing is selected 
                            api.selectionSet.clear(); // clear the selection
							configuratorobj=null; //remove the config Object
							selectNodeName=""; //remove the Selected node
							
                            const hits = e.hitNodes;
                            if (!hits.length) return;

                            var id = hits.length - 1;
                            var selectMeshID;
                            var selectCanvasName;
                            var selectCanvasID;
                            const hierarchy = [...hits[id].hierarchy];
                            hierarchy.reverse();
							//console.log(hierarchy);
                            //var canvas = hierarchy.find(el => el.type === "Null");
                            var panel = hierarchy.find(el => el.type === "PolyMesh" && el.name.includes("frame"));

                            if (panel) {
                                api.selectionSet.add(panel.nodeId);
                                selectNodeName = panel.name;
                                
                                if (!finalObj[selectNodeName])
                                    finalObj[selectNodeName] = {}; //creating object
                                
                                //node.setStyle({ outlineColor: '#00ff00', outlineThinkness: 5, color: '#ff0000', opacity: 0.5 });
                                getMaterialConfigurator().then();
								console.log(selectNodeName);
                            }

                        }, //end of mouse event


                    }, //end of handelers
                } //end fo add tool

            );
		
        } //end of function 
//to move image in 4 directions within canvas
function movefourdirection(direction) {
		if(configuratorobj===null)
			return;
            var verticalPos = configuratorobj.appliedConfiguration["canvas_vertical_global"];
            var horizontalPos = configuratorobj.appliedConfiguration["canvas_horizontal_global"];
			var verticalMov=finalObj[selectNodeName].verticalMov;
			var horizontalMov=finalObj[selectNodeName].horizontalMov;

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
            finalObj[selectNodeName].verticalPos = verticalPos;
            finalObj[selectNodeName].horizontalPos = horizontalPos;
			
			finalObj[selectNodeName].verticalMov = verticalMov;
			finalObj[selectNodeName].horizontalMov = horizontalMov;
			

            configuratorobj.setConfiguration({
                "canvas_vertical_global": verticalPos,
                "canvas_horizontal_global": horizontalPos
            })

        }
//to rotate image
function rotateimage() {
if(configuratorobj===null)
			return;
            var rotate = configuratorobj.appliedConfiguration["canvas_rotation_global"];
            rotate = rotate + 5;
			if(rotate>=360)
				rotate=0;
            finalObj[selectNodeName].rotate = rotate;
            configuratorobj.setConfiguration({
                "canvas_rotation_global": rotate
            })

        }
//to change the image balck and white
function blacknwhiteimage() {
			if(configuratorobj===null)
			return;

            var bw = configuratorobj.appliedConfiguration["blackwhite_global"];
            //default false
            if (bw == false) {
                configuratorobj.setConfiguration({
                    "blackwhite_global": true
                })
				finalObj[selectNodeName].blacknwhite = true;

            } else {
                configuratorobj.setConfiguration({
                    "blackwhite_global": false
                })
				finalObj[selectNodeName].blacknwhite = false;

            }
        }
//zoom in zoom out
function zoominoutimage(scale) {
			if(configuratorobj===null)
			return;

			var imageRatio=finalObj[selectNodeName].ratio;
			var height = finalObj[selectNodeName].imageHeight;
            var width = finalObj[selectNodeName].imageWidth;
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
			
			
			console.log(imageRatio,height,width);
			
			finalObj[selectNodeName].ratio=imageRatio;
            finalObj[selectNodeName].imageHeight = height;
            finalObj[selectNodeName].imageWidth = width;

            configuratorobj.setConfiguration({
                "image_height": height,
                "image_width": width
            })

        }
//to get the assetID mapped to Wall Display Model
function getAssetIDforVariant(variantid)    {
    const mapCollage = new Map();

    //walldisplay models

        mapCollage.set('32358157451351', "b565ec2e-edcf-4e99-9f46-a0ff18f51776");//shunkawauken
        
        return mapCollage.get(variantid);

    }