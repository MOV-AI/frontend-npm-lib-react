/**
 * Class implementing ILoadingScreen interface from Babylon
 *  https://doc.babylonjs.com/typedoc/interfaces/babylon.iloadingscreen
 *
 * @param {String} text : Sets the text to display while loading
 * @param {String} backgroundColor : Sets the color to use for the background
 */
function LoadingScreen(text = "Loading...", backgroundColor = "black") {
  // init the loader
  this.loadingUIText = text;
  this.loadingUIBackgroundColor = backgroundColor;
}

/**
 * Function called to display the loading screen
 */
LoadingScreen.prototype.displayLoadingUI = function () {
  document.getElementById("loading-scene").style.display = "block";
};

/**
 * Function called to hide the loading screen
 */
LoadingScreen.prototype.hideLoadingUI = function () {
  document.getElementById("loading-scene").style.display = "none";
};

export default LoadingScreen;
