//the file is used for Collage Canvas
/*
change log
1. 21-09-2021 File created - Updated getMaterialConfigurator,addToolToScene
2. 29-9-2021 Funciton updated to change the canvas size
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
		function changeLayout(size)
{
	var sizeAssetid= getAssetIDforVariant(size);
	configurator.setConfiguration({"Collage Size" : {assetId :sizeAssetid}});
	showHideDepth(size);
	
}
		function changeDepth(size)
{
	var sizeAssetid= getAssetIDforVariant(size);
	
	configurator.setConfiguration({"Depth" : {assetId :sizeAssetid}});
	
	
}

//to get the assetID mapped to Wall Display Model
function getAssetIDforVariant(variantid)    {
    const mapCollage = new Map();

    //Collage models

        mapCollage.set('32379468283991', "0026dc28-906b-4ff7-9577-c26abf5b5012");// 3 prints
		mapCollage.set('32387976626263', "89d18ffe-2bc9-41cc-a730-5db518d04bd6");// 3 prints alternative
		mapCollage.set('32387976822871', "23418be9-6028-486e-9482-54b4e9768e87");// 4 prints
		
		mapCollage.set('32387976953943', "1a881a8c-aa32-4faf-a5ae-0e9a6187ca12");// 5 prints
		mapCollage.set('32387977609303', "75db2a4f-cb21-4ca8-9ba9-fe262a2c69ce");// 6 prints
		mapCollage.set('32387977740375', "ca94dda9-b60c-49e2-9156-eadb24c6897a");// 9 prints
		
		
		mapCollage.set('32387977936983', "d9d1fa72-4ead-4ac6-b9c7-1033bc6b651f");//13 prints
		mapCollage.set('32387978068055', "f7f23c05-6619-475a-b7bf-b7af11243e21");// 16 prints
		
		//collageSize
		mapCollage.set('12', "170d0959-eee1-4b95-a75a-ce71ee678415");
		mapCollage.set('18', "14126c12-9e2c-4cb3-9761-13af08fa27a0");
		mapCollage.set('24', "30dacebf-c090-49e1-bccd-ee1ca3d105ec");
		mapCollage.set('30', "5629515c-cae0-49ca-9ec0-c581c63d3fe9");
		//depth size options
		mapCollage.set('1', "952577cd-b9b3-4986-9704-6a21b576feca");
		mapCollage.set('2', "b9b5fa33-d723-4606-a31e-44680a5ca372");
		
		        
        return mapCollage.get(variantid);

    }

//to show hide options for canvas depth
function showHideDepth(size){

	var x = document.getElementById("CanvasDepth");
	if(size==12)
		 x.style.display = "block";
	 else
	 x.style.display = "none";
	}
	