// -- CANVAS --
var canvasBackground;
var ctxBackground;
var canvasFood;
var ctxFood;
var canvasPlayer;
var ctxPlayer;
var canvasGhosts;
var ctxGhosts;
let canvasAnimation


function initCanvas()
{
	canvasBackground = document.getElementById("canvasBackground");
	ctxBackground = canvasBackground.getContext("2d");
	canvasFood = document.getElementById("canvasFood");
	ctxFood = canvasFood.getContext("2d");
	canvasPlayer = document.getElementById("canvasPlayer");
	ctxPlayer = canvasPlayer.getContext("2d");
	canvasGhosts = document.getElementById("canvasGhosts");
	ctxGhosts = canvasGhosts.getContext("2d");	
}
// Engine
function engine()
{
    ctxPlayer.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
    ctxGhosts.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
    drawGarbage();
    drawPlayer();
    manageGhosts();
    displayPointsByGhost();
    canvasAnimation = requestAnimationFrame(engine);
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

// -- ADAPT SIZE TO SCREEN --
function adaptGameSizeToScreen()
{
    let canvasContainer = document.getElementById("canvasContainer");
    let maxSize = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
    let gameSize = window.innerWidth < window.innerHeight ? tileNumberByCol * tileSize : tileNumberByRow * tileSize;
    if (gameSize > maxSize)
    {   
        let scalePercent = maxSize / gameSize;
        scalePercent = (scalePercent * 10) / 10;
        tileSize = Math.floor(tileSize * scalePercent);
        /*canvasContainer.style.transformOrigin = "left top";
        canvasContainer.style.transform = "scale("+scalePercent+", "+scalePercent+")";*/
    }
    // Canvas Size
		canvasBackground.height = tileSize * tileNumberByRow;
		canvasBackground.width = tileSize * tileNumberByCol;
		canvasFood.height = tileSize * tileNumberByRow;
		canvasFood.width = tileSize * tileNumberByCol;
		canvasPlayer.height = tileSize * tileNumberByRow;
		canvasPlayer.width = tileSize * tileNumberByCol;
		canvasGhosts.height = tileSize * tileNumberByRow;
		canvasGhosts.width = tileSize * tileNumberByCol;
}

function adaptToMobileLandscape()
{
    let landscape = window.innerWidth > window.innerHeight ? true : false;	
    if (landscape == true)
    {
    	document.getElementById("pacmanContainer").classList.add("pacmanLandscape");
    }
}
// -- LOAD MAP --

let createHtml = function()
{
	let pacmanContainer = document.getElementById("pacmanContainer");

	let ui = document.createElement("div");
	ui.setAttribute("class", "ui");
	let scoreContainer = document.createElement("div");
	scoreContainer.setAttribute("class", "scoreContainer");
	scoreContainer.innerText = "score: ";
	let score = document.createElement("span");
	score.setAttribute("id", "score");
	score.innerText = "0";
	let gameOverDiv = document.createElement("div");
	gameOverDiv.setAttribute("id", "gameOver");
	gameOverDiv.setAttribute("class", "gameOver");
	gameOverDiv.innerText = "GameOver";
	scoreContainer.appendChild(score);
	ui.appendChild(scoreContainer);
	ui.appendChild(gameOverDiv);
	pacmanContainer.appendChild(ui);

	let canvasContainer = document.createElement("div");
	canvasContainer.setAttribute("id", "canvasContainer");
	canvasContainer.setAttribute("class", "canvasContainer");
	let canvasBackground = document.createElement("canvas");
	canvasBackground.setAttribute("id", "canvasBackground");
	canvasBackground.setAttribute("class", "canvasBackground");
	let canvasFood = document.createElement("canvas");
	canvasFood.setAttribute("id", "canvasFood");
	canvasFood.setAttribute("class", "canvasFood");
	let canvasPlayer = document.createElement("canvas");
	canvasPlayer.setAttribute("id", "canvasPlayer");
	canvasPlayer.setAttribute("class", "canvasPlayer");
	let canvasGhosts = document.createElement("canvas");
	canvasGhosts.setAttribute("id", "canvasGhosts");
	canvasGhosts.setAttribute("class", "canvasGhosts");
	canvasContainer.appendChild(canvasBackground);
	canvasContainer.appendChild(canvasFood);
	canvasContainer.appendChild(canvasPlayer);
	canvasContainer.appendChild(canvasGhosts);
	pacmanContainer.appendChild(canvasContainer);

	let mobilePad = document.createElement("div");
	mobilePad.setAttribute("id", "mobilePad");
	mobilePad.setAttribute("class", "mobilePad");
	let mobilePadTop = document.createElement("div");
	mobilePadTop.setAttribute("class", "mobilePadTop");
	let mobilePadRight = document.createElement("div");
	mobilePadRight.setAttribute("class", "mobilePadRight");
	let mobilePadBottom = document.createElement("div");
	mobilePadBottom.setAttribute("class", "mobilePadBottom");
	let mobilePadLeft = document.createElement("div");
	mobilePadLeft.setAttribute("class", "mobilePadLeft");

	mobilePad.appendChild(mobilePadTop);
	mobilePad.appendChild(mobilePadRight);
	mobilePad.appendChild(mobilePadBottom);
	mobilePad.appendChild(mobilePadLeft);
	pacmanContainer.appendChild(mobilePad);
}

let pacmanGameLaunched = false
let launchPacmanGame = function()
{
	if (pacmanGameLaunched == false)
	{
		createHtml();
		initCanvas();
		initMap();
		adaptGameSizeToScreen();
		genMapBoard();
		drawMap();
		initGrid();
		initPlayer();
		initGhosts();
		if (typeof window.orientation !== 'undefined')
		{
			adaptToMobileLandscape();
		    loadPadMobiles();
		}
		placeCanvasOnBackground();
		window.requestAnimationFrame(engine); 
		pacmanGameLaunched = true;
	}
}

function closeGame()
{
	let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	cancelAnimationFrame(canvasAnimation);

    for(let r = 0; r < tileNumberByRow; r++)
    {
        for(let c = 0; c < tileNumberByCol; c++)
        {
        	clearInterval(mapBoards[r][c].foodNegatifTime);
        }
    }
    clearTimeout(bonusTempo);
	canvasAnimation = null;
	tileSize = null;
	tileSizeHalf = null;
	tileNumberByRow = null;
	tileNumberByCol = null;
	mapBoards = null;
	bonusTempo = null;
	map01 = null;
	garbagesList = null
	garbagesImages = null;
	row4Rand = null;
	col4Rand = null;

	player = null;

	for (let i = ghosts.length - 1; i >= 0; i--)
	{
		clearInterval(ghosts[i].movingTempo);
		clearInterval(ghosts[i].garbageTime);
		clearTimeout(ghosts[i].pointsByGhostTempo);
	}
	ghosts = null;

	canvasBackground = null;
	ctxBackground = null;
	canvasFood = null;
	ctxFood = null;
	canvasPlayer = null;
	ctxPlayer = null;
	canvasGhosts = null;
	ctxGhosts = null;
	let pacmanContainerChilds = document.querySelectorAll("#pacmanContainer div");
	for (let i = pacmanContainerChilds.length - 1; i >= 0; i--)
	{
		pacmanContainerChilds[i].remove();
	}
}

window.addEventListener("load", function()
{
	launchPacmanGame();
});