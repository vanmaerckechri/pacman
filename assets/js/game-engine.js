// -- CANVAS --
var canvasBackground = document.getElementById("canvasBackground");
var ctxBackground = canvasBackground.getContext("2d");
var canvasFood = document.getElementById("canvasFood");
var ctxFood = canvasFood.getContext("2d");
var canvasPlayer = document.getElementById("canvasPlayer");
var ctxPlayer = canvasPlayer.getContext("2d");
var canvasGhosts = document.getElementById("canvasGhosts");
var ctxGhosts = canvasGhosts.getContext("2d");

// Canvas Size
(function() {
	canvasBackground.height = tileSize * tileNumberByRow;
	canvasBackground.width = tileSize * tileNumberByCol;
	canvasFood.height = tileSize * tileNumberByRow;
	canvasFood.width = tileSize * tileNumberByCol;
	canvasPlayer.height = tileSize * tileNumberByRow;
	canvasPlayer.width = tileSize * tileNumberByCol;
	canvasGhosts.height = tileSize * tileNumberByRow;
	canvasGhosts.width = tileSize * tileNumberByCol;
})();

// Engine
function engine()
{
    ctxPlayer.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
    ctxGhosts.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
    drawPlayer();
    manageGhosts();
    requestAnimationFrame(engine);
}

// Superimpose Canvas
function placeCanvasOnBackground()
{
	canvasPlayer.style.left = canvasBackground.offsetLeft + "px"
	canvasPlayer.style.top = canvasBackground.offsetTop + "px"
	canvasGhosts.style.left = canvasBackground.offsetLeft + "px"
	canvasGhosts.style.top = canvasBackground.offsetTop + "px"
	canvasFood.style.left = canvasBackground.offsetLeft + "px"
	canvasFood.style.top = canvasBackground.offsetTop + "px"
}

window.addEventListener("resize", placeCanvasOnBackground, false)

// -- LOAD MAP --
genMapBoard();
window.addEventListener("load", function()
{
	placeCanvasOnBackground();
	drawMap();   
	requestAnimationFrame(engine); 
})
