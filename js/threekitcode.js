//the file is used for Wall Display Canvas
/*
change log
1. File created 
2. 
3. Update Rotate function to 0 after it reach 360

*/
//function to set the CanvasSize and image size onload
function setCanvasImage(cnH,cnW,imgH,imgW){
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
                    name: selectNodeName
                }),
                name: 'FrontFace',
                plug: 'Material',
                property: 'reference'
            })
        }
//add select to scene	
function addToolToScene() {

		finalObj.border = 'Blur';//default value is Blur 
		
		
            api.tools.addTool({
                    key: 'CanvasPrint',
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

                            var canvas = hierarchy.find(el => el.type === "Null");
                            var panel = hierarchy.find(el => el.type === "PolyMesh" && el.name === "FrontFace");

                            if (panel) {
                                api.selectionSet.add(panel.nodeId);
                                selectNodeName = canvas.name;
                                
                                if (!finalObj[selectNodeName])
                                    finalObj[selectNodeName] = {}; //creating object
                                
                                //node.setStyle({ outlineColor: '#00ff00', outlineThinkness: 5, color: '#ff0000', opacity: 0.5 });
                                getMaterialConfigurator().then();
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
    const mapWD = new Map();

    //walldisplay models

        mapWD.set('32358157451351', "b565ec2e-edcf-4e99-9f46-a0ff18f51776");//shunkawauken
        mapWD.set('32357570314327', "fba16900-7b86-410f-a48d-111b23592e9e");//linville
        mapWD.set('32357576671319', "3f90f102-6c2b-48af-a34f-0f6575c4057c");//sunbrust
        
        
        mapWD.set('32358153814103', "c1432278-c532-4633-a1ec-a042d20d71d5");//mingo
        mapWD.set('32358156206167', "d5f10893-b22c-4502-ae5a-6ddb32006122");//
        
        
        mapWD.set('32357575655511', "aa63869e-e278-4790-a93b-58d33c017486");//glass
        mapWD.set('32357571723351', "a58f8ef4-bf0d-44e1-816c-3dcbfe594bbe");//Cullasaja
        mapWD.set('32357548130391', "517abdb1-41af-437b-be89-9f630880c429");//hickory
        mapWD.set('32357577785431', "9ed3c5c9-e973-4a3f-af96-f6e0094c1a87");//setrock
        
        mapWD.set('32358148046935', "e5bc80f9-762e-46a2-b21d-1521c897d4a5");//silver
        mapWD.set('32361519939671', "205ee8eb-8881-4d46-82f7-2d65c99200ea");//rainbow
        mapWD.set('32358152568919', "62a9089a-5bd8-4f97-ae3d-a292858ef1b4");//stairway
        
        mapWD.set('32361518301271', "ba3bd1b9-4e39-4739-84b5-eb8f09e197be");//wildcat
        mapWD.set('32361520463959', "0f6db45c-fe2b-480a-a158-b71489e55aaa");//catabwa

        return mapWD.get(variantid);

    }