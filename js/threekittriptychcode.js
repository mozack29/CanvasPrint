function addtocart(){
    //console.log(playerObj.getConfigurator('panelName').metadata);
    finalObj.metadata=playerObj.getConfigurator('panelName').metadata;   
    console.log(finalObj);
}
function setBorder(colorVal)
{
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

function changeImage(imageValue) {

        configurator.setConfiguration({
            'sourceImage': {
                assetId: imageValue
            }
        });

    }
    
 

function movefourdirection(direction) {
    if(playerObj.configurator===null)
        return;
        var verticalPos = playerObj.configurator.appliedConfiguration["canvas_vertical_global"];
        var horizontalPos = playerObj.configurator.appliedConfiguration["canvas_horizontal_global"];

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
            "canvas_vertical_global": verticalPos,
            "canvas_horizontal_global": horizontalPos
        })

    }

    function rotateimage() {
if(configurator===null)
        return;
        var rotate = playerObj.configurator.appliedConfiguration["canvas_rotation_global"];
        rotate = rotate + 5;
        finalObj.rotate = rotate;
        configurator.setConfiguration({
            "canvas_rotation_global": rotate
        })

    }

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


    function zoominoutimage(scale) {
        if(configurator===null)
        return;

        var height = playerObj.configurator.appliedConfiguration["canvas_height_global"];
        var width = playerObj.configurator.appliedConfiguration["canvas_width_global"];

        if (scale == 'Plus') {
            height = height + .1;
            width = width + .1;
        }

        if (scale == 'Minus') {
            height = height - .1;
            width = width - .1;
        }
        finalObj.height = height;
        finalObj.width = width;

        configurator.setConfiguration({
            "canvas_height_global": height,
            "canvas_width_global": width
        })

    }
    function getAssetIDforVariant(variantid)
    {
    const mapWD = new Map();

    




        //tripytch models

        mapWD.set('32365183828055', "f1633cfa-f462-49f1-9793-b484a5f80f3a");//Classic Triptych
        mapWD.set('32366536327255', "bd7167ba-af06-4ea3-82ed-8577f50f13a7");//Classic Flow Triptych
        mapWD.set('32365179535447', "93faf5a0-098b-4409-95dd-072dbe2ca3ca");//Cozy Triptych
        mapWD.set('32366542258263', "727fc1b0-75cf-43e2-9089-535eb9aae8de");//Cozy Flow Triptych
        
        
        return mapWD.get(variantid);

    }