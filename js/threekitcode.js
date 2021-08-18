    function addtocart(){
		console.log(finalObj);
	}
	function setBorder(colorVal)
	{
		var borderAssetID="63ccea68-4d3b-4637-9fca-962147956e89"; //default black 
		if (colorVal==='Black')
		borderAssetID="63ccea68-4d3b-4637-9fca-962147956e89";
		if (colorVal==='Grey')
		borderAssetID="43b9d81e-1d81-4b67-9b7b-83737fcbcc53";
		if (colorVal==='White')
		borderAssetID="1f779f81-c495-4c40-b186-9b82aedc2a7a";
		if (colorVal==='Mirror')
		borderAssetID="efdd80a1-6e0e-4a5e-9666-7352769432a3";
		if (colorVal==='Blur')
		borderAssetID="35baefef-b860-434a-a1e3-4a8569507149";
		configurator.setConfiguration({"Border" : {assetId :borderAssetID}});
	}
	
	function changeImage(imageValue) {

            configuratorobj.setConfiguration({
                'sourceImage': {
                    assetId: imageValue
                }
            });

        }
		
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
		
	function addToolToScene() {

            api.tools.addTool({
                    key: 'CanvasPrint',
                    label: 'Select',
                    active: true,
                    enabled: true,
                    handlers: {

                        mousedown: e => {

                            api.selectionSet.clear();

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
                                //console.log(selectNodeName);
                                if (!finalObj[selectNodeName])
                                    finalObj[selectNodeName] = {}; //creating object
                                //console.log(finalObj);
                                //node.setStyle({ outlineColor: '#00ff00', outlineThinkness: 5, color: '#ff0000', opacity: 0.5 });
                                getMaterialConfigurator().then();
                            }

                        }, //end of mouse event


                    }, //end of handelers
                } //end fo add tool

            );

        } //end of function 

	function movefourdirection(direction) {
            var verticalPos = configuratorobj.appliedConfiguration["canvas_vertical_global"];
            var horizontalPos = configuratorobj.appliedConfiguration["canvas_horizontal_global"];

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
            finalObj[selectNodeName].verticalPos = verticalPos;
            finalObj[selectNodeName].horizontalPos = horizontalPos;

            configuratorobj.setConfiguration({
                "canvas_vertical_global": verticalPos,
                "canvas_horizontal_global": horizontalPos
            })

        }

        function rotateimage() {

            var rotate = configuratorobj.appliedConfiguration["canvas_rotation_global"];
            rotate = rotate + 5;
            finalObj[selectNodeName].rotate = rotate;
            configuratorobj.setConfiguration({
                "canvas_rotation_global": rotate
            })

        }

        function blacknwhiteimage() {

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


        function zoominoutimage(scale) {

            var height = configuratorobj.appliedConfiguration["canvas_height_global"];
            var width = configuratorobj.appliedConfiguration["canvas_width_global"];

            if (scale == 'Plus') {
                height = height + .1;
                width = width + .1;
            }

            if (scale == 'Minus') {
                height = height - .1;
                width = width - .1;
            }
            finalObj[selectNodeName].height = height;
            finalObj[selectNodeName].width = width;

            configuratorobj.setConfiguration({
                "canvas_height_global": height,
                "canvas_width_global": width
            })

        }
		function getAssetIDforVariant(variantid)
		{
		const mapWD = new Map();

			mapWD.set('32358157451351', "b565ec2e-edcf-4e99-9f46-a0ff18f51776");//shunkawauken
			mapWD.set('32358153814103', "c1432278-c532-4633-a1ec-a042d20d71d5");//mingo
			mapWD.set('32357571723351', "a58f8ef4-bf0d-44e1-816c-3dcbfe594bbe");//Cullasaja
			return mapWD.get(variantid);
	
		}