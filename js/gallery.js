// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {

	if(mCurrentIndex >= mImages.length){
		mCurrentIndex = 0;
	}
	else if(mCurrentIndex < 0){
		mCurrentIndex = (mImages.length - 1);
	}


	//Add code here to access the #slideShow element.
	const imageHTML = document.getElementById("photo");
	//Access the img element and replace its source
	imageHTML.src = mImages[mCurrentIndex].img;

	//with a new image from your images array which is loaded 
	mLastFrameTime = 0;
	mCurrentIndex += 1;
}


// Counter for the mImages array
var mCurrentIndex = 0;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Holds the retrived JSON information
var mJson;

mRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
            mJson = JSON.parse(mRequest.responseText);
			iterateThrough();
    }
};
checkJSON();
mRequest.open("GET", mUrl, true);
console.log(mRequest.open("GET", mUrl, true));
mRequest.send();

// Array holding GalleryImage objects (see below).
var mImages = [];

//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {

	// Call the Check Function For JSON Files
	checkJSON();

	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage() {

	let location = "";
	let description = "";
	let date = "";
	let img = "";

}
function iterateThrough()
{
	for (const currentIndex in mJson.images){
		mImages[currentIndex] = new GalleryImage();
		mImages[currentIndex].img = mJson.images[currentIndex].imgPath;
		mImages[currentIndex].description = mJson.images[currentIndex].description;
		mImages[currentIndex].location = mJson.images[currentIndex].imgLocation;
		mImages[currentIndex].date = mJson.images[currentIndex].date;
	}
}

// This function checks the rotate/position of the class: moreIndicator

function rotatePositionCheck(){

	let htmlObject = document.querySelector(".moreIndicator");

	if(htmlObject.classList.contains("rot90") == true){
		htmlObject.classList.remove("rot90");
		htmlObject.classList.add("rot270");

		console.log("1LAUNCH")
	}
	else{
		htmlObject.classList.remove("rot270");
		htmlObject.classList.add("rot90");

		console.log("2LAUNCH")
	}
}

// This function reveils and hids the info tab below the image
function reveil(){
	$('.details').fadeToggle();
}

// Check the URL for different JSON File
function checkJSON(){

	// var httpLocation = location.href;
	// if(httpLocation == "http://localhost/Sandor-p2/index.html?json=images-short.json"){
	// 	mUrl = "images-short.json";
	// 	console.log("images-short.json launched");
	// 	console.log(mUrl);
	// }
	// else{
	// 	mUrl = 'images.json';
	// 	console.log("images.json launched");
	// 	console.log(mUrl);
	// }


	const urlParams = new URLSearchParams(window.location.search);

	console.log(urlParams);
	for (const [key, value] of urlParams) {
	console.log(`${key}:${value}`);
	mUrl = value;
	}
	
	if(mUrl == undefined){
	mUrl = 'images.json';
	}
	console.log(mUrl);

}