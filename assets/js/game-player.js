let pacmanImg00 = new Image();
pacmanImg00.src = 'assets/img/pacman00.svg';
let pacmanImg01 = new Image();
pacmanImg01.src = 'assets/img/pacman01.svg';

let pacman_bottom00 = new Image();
pacman_bottom00.src = 'assets/img/pacman_bottom00.svg';
let pacman_bottom01 = new Image();
pacman_bottom01.src = 'assets/img/pacman_bottom01.svg';

let pacman_left00 = new Image();
pacman_left00.src = 'assets/img/pacman_left00.svg';
let pacman_left01 = new Image();
pacman_left01.src = 'assets/img/pacman_left01.svg';

let pacman_top00 = new Image();
pacman_top00.src = 'assets/img/pacman_top00.svg';
let pacman_top01 = new Image();
pacman_top01.src = 'assets/img/pacman_top01.svg';

let player =
{
    size: tileSize * 3,
    posX: tileSize,
    posY: tileSize,
    topPressed: false,
    rightPressed: false,
    bottomPressed: false,
    leftPressed: false,
    spacePressed: false,
    spaceStopPressed: true,
    moving: false,
    movingTempo: null,
    animationImg: [pacmanImg00, pacmanImg01, pacman_bottom00, pacman_bottom01, pacman_left00, pacman_left01, pacman_top00, pacman_top01],
    animationIndex: 0,
    alive: 1
};

// -- KEYS --

let keyDownHandler = function(e)
{
    if (player.alive == 1)
    {
        //joueur 1
    	if(e.keyCode == 39)
    	{
    	    player.rightPressed = true;
    	}
    	else if(e.keyCode == 37)
    	{
    	    player.leftPressed = true;
    	}
    	else if(e.keyCode == 40)
    	{
    	    player.bottomPressed = true;
    	}
    	else if(e.keyCode == 38)
    	{
    	    player.topPressed = true;
    	}
    	else if(e.keyCode == 32 && player.spaceStopPressed == true)
    	{
    	    player.spacePressed = true;
    	    player.spaceStopPressed = false;
    	}
    }
}

let keyUpHandler = function(e)
{
    if (player.alive == 1)
    {
        //joueur 1
        if(e.keyCode == 39)
        {
            player.rightPressed = false;
        }
        else if(e.keyCode == 37)
        {
            player.leftPressed = false;
        }
        else if(e.keyCode == 40)
        {
            player.bottomPressed = false;
        }
        else if(e.keyCode == 38)
        {
            player.topPressed = false;
        }
        else if(e.keyCode == 32)
        {
            player.spacePressed = false;
          	player.spaceStopPressed = true;
        }
    }
}

// -- TAKE FOOD --

let takeFood = function(row, col)
{
    if (mapBoards[row][col].type == 1)
    {
        mapBoards[row][col].type = 0;
        let score = document.querySelector("#score");
        score.innerText = parseInt(score.innerText) + 1;
    }
}

// -- MOVES --

let drawPlayer = function()
{
    let playerPosArrayCol = player.posX / tileSize;
    let playerPosArrayRow = player.posY / tileSize;
    let playerMovingSpeed = tileSize / 2;
    // MOVE TOP
    if (player.moving == false && player.topPressed == true)
    {
        if (mapBoards[playerPosArrayRow - 1][playerPosArrayCol].wall < 1 && mapBoards[playerPosArrayRow - 1][playerPosArrayCol + 1].wall < 1 && mapBoards[playerPosArrayRow - 1][playerPosArrayCol + 2].wall < 1)
        {
                let oldPosY = player.posY;
                player.moving = true;
                player.movingTempo = setInterval(function()
                {
                    player.posY -= playerMovingSpeed;
                    if (player.posY == oldPosY - 2 * tileSize)
                    {
                        player.animationIndex = player.animationIndex == 6 ? player.animationIndex + 1 : 6;
                        takeFood(playerPosArrayRow - 1, playerPosArrayCol + 1)
                        player.moving = false;
                        clearInterval(player.movingTempo);
                    }
                },17);
        }
    }
    // MOVE BOTTOM
    if (player.moving == false && player.bottomPressed == true)
    {
        if (mapBoards[playerPosArrayRow + 3][playerPosArrayCol].wall < 1 && mapBoards[playerPosArrayRow + 3][playerPosArrayCol + 1].wall < 1 && mapBoards[playerPosArrayRow + 3][playerPosArrayCol + 2].wall < 1)
        {
                let oldPosY = player.posY;
                player.moving = true;
                player.movingTempo = setInterval(function()
                {   
                    player.posY += playerMovingSpeed;
                    if (player.posY == oldPosY + 2 * tileSize)
                    {
                        player.animationIndex = player.animationIndex == 2 ? player.animationIndex + 1 : 2;
                        takeFood(playerPosArrayRow + 3, playerPosArrayCol + 1)
                        player.moving = false;
                        clearInterval(player.movingTempo);
                    }
                },17);
        }
    }
    // MOVE RIGHT
    if (player.moving == false && player.rightPressed == true)
    {
        if (mapBoards[playerPosArrayRow][playerPosArrayCol + 3] != undefined)
        {
            if (mapBoards[playerPosArrayRow][playerPosArrayCol + 3].wall < 1 && mapBoards[playerPosArrayRow + 1][playerPosArrayCol + 3].wall < 1 && mapBoards[playerPosArrayRow + 2][playerPosArrayCol + 3].wall < 1)
            {
                let oldPosX = player.posX;
                player.moving = true;
                player.movingTempo = setInterval(function()
                {
                    player.posX += playerMovingSpeed;
                    if (player.posX == oldPosX + 2 * tileSize)
                    {
                        player.animationIndex = player.animationIndex == 0 ? player.animationIndex + 1 : 0;
                        takeFood(playerPosArrayRow + 1, playerPosArrayCol + 3)
                        player.moving = false;
                        clearInterval(player.movingTempo);
                    }
                },17);
            }
        }
        else
        {
            player.posX = -1*tileSize;
        }
    }
    // MOVE LEFT
    if (player.moving == false && player.leftPressed == true)
    {        

        if (mapBoards[playerPosArrayRow][playerPosArrayCol - 1] != undefined)
        {
            if (mapBoards[playerPosArrayRow][playerPosArrayCol - 1].wall < 1 && mapBoards[playerPosArrayRow + 1][playerPosArrayCol - 1].wall < 1 && mapBoards[playerPosArrayRow + 2][playerPosArrayCol - 1].wall < 1)
            {
                let oldPosX = player.posX;
                player.moving = true;
                player.movingTempo = setInterval(function()
                {
                    player.posX -= playerMovingSpeed;
                    if (player.posX == oldPosX - 2 * tileSize)
                    {
                        player.animationIndex = player.animationIndex == 4 ? player.animationIndex + 1 : 4;
                        takeFood(playerPosArrayRow + 1, playerPosArrayCol - 1)
                        player.moving = false;
                        clearInterval(player.movingTempo);
                    }
                },17);
            }
        }
        else
        {
            player.posX = (tileNumberByCol * tileSize) - (2 * tileSize);
        }
    }
    ctx.drawImage(player.animationImg[player.animationIndex], player.posX, player.posY, player.size, player.size);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);