//the file is used for to upload the file to threekit
/*
change log
1. File created 
2. added new function for Canvas uploadImageCanvas
3. 22Sept- Updated uploadImageTriptych to add URL in fileID

*/
//This need to be changed based on the envionment
var fileurl="https://preview.threekit.com/api/files/";	

//The function is used to upload image for Wall Display
async function uploadImage(filedata){
	
 var u = await imageSize(fileupload.files[0]);
		imgHeight=u.height;
		imgWidth=u.width;
	
if(!finalObj.metadata)	
	finalObj.metadata=playerObj.getConfigurator('panelName').metadata; 

var dimension=(finalObj.metadata[selectNodeName]).split("_");;
var canvasHeight=dimension[0];
var canvasWidth=dimension[1];
var heightRatio= canvasHeight /imgHeight;
var widthRatio= canvasWidth /imgWidth;
finalObj[selectNodeName].ratio=1;
//console.log("canHeight",canvasHeight,"canWidth",canvasWidth,imgHeight,imgWidth);
if(heightRatio>widthRatio)
{
	
	imgHeight=imgHeight*heightRatio;
	imgWidth=imgWidth*heightRatio
	
}
else
{
	imgHeight=imgHeight*widthRatio;
	imgWidth=imgWidth*widthRatio;
	
}
//remove the image;
changeImage("");
//set the canvas and image properties
setCanvasImage(canvasHeight,canvasWidth,Math.round(imgHeight),Math.round(imgWidth));

//This method returns the fileID and AssetID
	$("#uiOverlay").dialog({
	modal: true,
	closeOnEscape: false,
	dialogClass: "dialog-no-close",
	}) 
	var jobID= await uploadFileToThreeKit(filedata);
	var objAsset=await getAssetIDfromJob(jobID);
while(objAsset?.job_status!= "stopped")	
{
	objAsset=await getAssetIDfromJob(jobID); 
	await sleep(3000); 
}//end of while
$("#uiOverlay").dialog("close");
//finalObj[selectNodeName].fileID = objAsset.imagefileId;
finalObj[selectNodeName].fileID = fileurl.concat(objAsset.imagefileId,"/content/");
finalObj[selectNodeName].assetId = objAsset.imageassetId;

return objAsset; 
}
//The function is used to upload image for TripTych Canvas
async function uploadImageTriptych(filedata){
 var u = await imageSize(fileupload.files[0]);
		imgHeight=u.height;
		imgWidth=u.width;


		finalObj.imageHeightOriginal = imgHeight;
		finalObj.imageWidthOriginal = imgWidth;

		//if(!finalObj.metadata)	
		finalObj.metadata=playerObj.getConfigurator('panelName').metadata; 

		//Getting the size from Metadata and setting in imageMagic Object
		var dimension=(finalObj.metadata["_size"]).split("_");;
		/*
		var centerDimension=(finalObj.metadata["Center"]).split("_");
		var sideDimension=(finalObj.metadata["Sides"]).split("_");
			imageMagickObj.canHeight=dimension[0];  
			imageMagickObj.canWidth=dimension[1];
			imageMagickObj.centerHeight=centerDimension[0];
			imageMagickObj.centerWidth=centerDimension[1];
			imageMagickObj.sideHeight=sideDimension[0];
			imageMagickObj.sideWidth=sideDimension[1];
		*/
		
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
		imageMagickObj.verticalMov=0;
		imageMagickObj.horizontalMov=0;
		imageMagickObj.border = 'Blur';

		//remove the image;
		changeImage("");
		//
		var reduceRatio=updatedSize4k(canvasHeight,canvasWidth,imgHeight,imgWidth); //Matching it to 4k size 
		finalObj.reduceRatio=reduceRatio;
		var updatedCanvasHeight=canvasHeight/reduceRatio;
		var updatedCanvasWidth=canvasWidth/reduceRatio;
		var updatedImageHeight=imgHeight/reduceRatio;
		var updatedImageWidth=imgWidth/reduceRatio;

		//set the canvas and image properties
		setCanvasImage(updatedCanvasHeight,updatedCanvasWidth,Math.round(updatedImageHeight),Math.round(updatedImageWidth));


	//This method returns the fileID and AssetID
	$("#uiOverlay").dialog({
	modal: true,
	closeOnEscape: false,
	dialogClass: "dialog-no-close",
	}) 
	var jobID= await uploadFileToThreeKit(filedata);
	var objAsset=await getAssetIDfromJob(jobID);
while(objAsset?.job_status!= "stopped")	
{
	objAsset=await getAssetIDfromJob(jobID); 
	await sleep(3000); 
}//end of while
$("#uiOverlay").dialog("close");

imageMagickObj.fileID = fileurl.concat(objAsset.imagefileId,"/content/");
finalObj.assetId = objAsset.imageassetId;
return objAsset; 
}
//upload file to 3Kit CDN
async function uploadFileToThreeKit(filedata) {

    var myHeaders = new Headers(); //post 
    var jobIdGlobal;
    var formdata = new FormData();
    formdata.append("orgId", orgID);
    formdata.append("files", filedata);

    var requestOptionsUpload = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

   

    await fetch("https://preview.threekit.com/api/catalog/assets/upload?bearer_token=" + authToken, requestOptionsUpload)
        .then(response => response.json())
        .then((result) => {
                //						
                jobIdGlobal = result[0].jobId;
                
               
				
            } //end of then result
        )

    .catch(error => console.log('error', error));
	
return jobIdGlobal;
 }
//This function will return fileID and assetId.
async function  getAssetIDfromJob(jobID){
	 var myHeadersAsset = new Headers(); //get
	 var imageassetId;
	 var imagefileId;
	 var job_status;
	 var requestOptionsAsset = {
        method: 'GET',
        headers: myHeadersAsset,
        redirect: 'follow'
    };
	
	await fetch("https://preview.threekit.com/api/catalog/jobs/" + jobID + "?bearer_token=" + authToken + "&orgId" + orgID, requestOptionsAsset)
                        .then(responseAsset => responseAsset.json())
                        .then((resultAsset) => {
                                job_status = resultAsset.job.status;
                                if (job_status === "stopped") {
                                  								
                                    imageassetId = resultAsset?.output?.texture[0]?.assetId;
									imagefileId = resultAsset?.job?.parameters?.fileId;
							
                                }
                            } //end then resultAsset
                        ) //end then resultAsset
                        .catch(error => console.log('error', error));
						return {job_status,imageassetId, imagefileId};
}
//General Function to wait for imageLaod
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//to resize canvasHeight/canWidth/imageSize upto 4k
function updatedSize4k(canHeight,canWidth,imgHeight,imgWidth){
	//console.log("i am in");
	var maxSide= Math.max(canHeight,canWidth,imgHeight,imgWidth);
	var reduceRatio=maxSide/4096; //this is done to reduce the size upto 4K.
	return reduceRatio;
}
//function to get the imageSize
function imageSize(filedata) {
	
    //const img = document.createElement("img");
var url = URL.createObjectURL(filedata);
var img = new Image;
    const promise = new Promise((resolve, reject) => {
      img.onload = () => {
        // Natural size is the actual image size regardless of rendering.
        // The 'normal' `width`/`height` are for the **rendered** size.
        const width  = img.naturalWidth;
        const height = img.naturalHeight; 

        // Resolve promise with the width and height
        resolve({width, height});
      };

      // Reject promise on error
      img.onerror = reject;
    });

    // Setting the source makes it start downloading and eventually call `onload`
    img.src = url;

    return promise;
}
//The function is used to upload image for Canvas Collage
async function uploadImageCanvas(filedata){
	
 var u = await imageSize(fileupload.files[0]);
		imgHeight=u.height;
		imgWidth=u.width;
	
if(!finalObj.metadata)	
	finalObj.metadata=playerObj.getConfigurator('panelName').metadata; 

var dimension=(finalObj.metadata[selectNodeName]).split("_");;
var canvasHeight=dimension[0];
var canvasWidth=dimension[1];
var heightRatio= canvasHeight /imgHeight;
var widthRatio= canvasWidth /imgWidth;
finalObj[selectNodeName].ratio=1;
//console.log("canHeight",canvasHeight,"canWidth",canvasWidth,imgHeight,imgWidth);
if(heightRatio>widthRatio)
{
	
	imgHeight=imgHeight*heightRatio;
	imgWidth=imgWidth*heightRatio
	
}
else
{
	imgHeight=imgHeight*widthRatio;
	imgWidth=imgWidth*widthRatio;
	
}
//remove the image;
changeImage("");
//set the canvas and image properties
setCanvasImage(canvasHeight,canvasWidth,Math.round(imgHeight),Math.round(imgWidth));

//This method returns the fileID and AssetID
	$("#uiOverlay").dialog({
	modal: true,
	closeOnEscape: false,
	dialogClass: "dialog-no-close",
	}) 
	var jobID= await uploadFileToThreeKit(filedata);
	var objAsset=await getAssetIDfromJob(jobID);
while(objAsset?.job_status!= "stopped")	
{
	objAsset=await getAssetIDfromJob(jobID); 
	await sleep(3000); 
}//end of while
$("#uiOverlay").dialog("close");
//finalObj[selectNodeName].fileID = objAsset.imagefileId;
finalObj[selectNodeName].fileID = fileurl.concat(objAsset.imagefileId,"/content/");
finalObj[selectNodeName].assetId = objAsset.imageassetId;

return objAsset; 
}
