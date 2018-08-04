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
    posY: tileSize * 39,
    posX: tileSize * 19,
    row: 39,
    col: 19,
    topPressed: false,
    rightPressed: false,
    bottomPressed: false,
    leftPressed: false,
    spacePressed: false,
    spaceStopPressed: true,
    moving: false,
    movingTempo: null,
    movingSpeed: tileSize / 4,
    animationImg: [pacmanImg00, pacmanImg01, pacman_bottom00, pacman_bottom01, pacman_left00, pacman_left01, pacman_top00, pacman_top01],
    animationIndex: 0,
    alive: 1,
    pointsByGhost: 100,
    haveGarbage: false,
    garbageType: false,
};

let launchBonus = function()
{
    player["pointsByGhost"] = 10;
    clearTimeout(bonusTempo);
    for (let i = ghosts.length - 1; i >= 0; i--)
    {
        ghosts[i]["alive"] = 1; 
        if (ghosts[i]["state"] != "start" && ghosts[i]["state"] != "dead")
        {        
            ghosts[i].state = "afraid";
            ghosts[i]["display"] = "afraid"
            ghosts[i]["path"] = [];
        }
    }
    bonusTempo = setTimeout(function()
    {
        clearTimeout(bonusTempo);   
        for (let i = ghosts.length - 1; i >= 0; i--)
        {
            if (ghosts[i]["alive"] == 1 && ghosts[i]["state"] == "afraid")
            {     
                ghosts[i].state = "afraidFlash";
                ghosts[i]["display"] = "afraidFlash"
            }
        } 
        bonusTempo = setTimeout(function()
        {
            clearTimeout(bonusTempo);
            for (let i = ghosts.length - 1; i >= 0; i--)
            {    
                clearInterval(ghosts[i].afraidFlashTempo);
                if (ghosts[i]["state"] != "start")
                {
                    ghosts[i]["path"] = [];
                }
                if (ghosts[i]["state"] != "dead")
                {   
                    ghosts[i]["display"] = "normal"
                    ghosts[i].state = "hunt";
                    ghosts[i].afraidFlashTempo = false;
                }
            }
        },3000);

    },5000);
}

let cleanFood = function(row, col)
{
    if (player["haveGarbage"] == false)
    {
        clearInterval(mapBoards[row][col].foodNegatifTime);
        player["haveGarbage"] = true;
        mapBoards[player["row"]][player["col"]].garbageHere = false;
        mapBoards[player["row"]][player["col"]].garbageType = false;
        let centerRow = row + 1;
        let centerCol = col + 1;
        let distance = 2;
        mapBoards[row][col].foodNegatifTime = setInterval(function()
        {
            if (typeof mapBoards[centerRow - distance] != "undefined" && mapBoards[centerRow - distance][centerCol].foodPositif == false && distance <= 8)
            {
                let rowToChange = -1*distance;
                let colToChange = -1*distance;
                for (let i = ((distance+1) * (distance+1)) - 1; i >= 0; i--)
                {
                    if (mapBoards[centerRow + rowToChange][centerCol + colToChange].type == 1)
                    {
                        mapBoards[centerRow + rowToChange][centerCol + colToChange].foodPositif = true;
                    }
                    if (colToChange < distance)
                    {
                        colToChange += 2;
                    }
                    else
                    {
                        colToChange = -1*distance;
                        rowToChange += 2;
                    }
                }
                updateFood();
                distance += 2;
                if (distance > 8)
                {
                    clearInterval(mapBoards[row][col].foodNegatifTime);
                    distance = 2;
                }
            }
        }, 2000)
    }
}

let takeGarbage = function(row, col)
{
    if (player["haveGarbage"] == false)
    {
        let garbagesListIndex = mapBoards[row][col]["garbageType"];
        if (garbagesList[garbagesListIndex].includes("carton") == true)
        {
            player["garbageType"] = "carton";
        }
        else if (garbagesList[garbagesListIndex].includes("pmc") == true)
        {
            player["garbageType"] = "pmc";
        }
        else if (garbagesList[garbagesListIndex].includes("incolore") == true)
        {
            player["garbageType"] = "incolore";
        }
        else if (garbagesList[garbagesListIndex].includes("colore") == true)
        {
            player["garbageType"] = "colore";
        }
    }
    cleanFood(row, col);
}

let updateScore = function(points, foodPositif)
{
    let score = document.querySelector("#score");
    if (foodPositif == true)
    {
        score.innerText = parseInt(score.innerText) + points;    
    }
    else if (foodPositif == false && parseInt(score.innerText) > 0)
    {
        score.innerText = parseInt(score.innerText) - points;           
    }
}

let takeFood = function(row, col)
{
    if (mapBoards[row][col].type == 1 && mapBoards[row][col].foodTime == false)
    {
        mapBoards[row][col].foodTime =  setTimeout(function()
        {
            mapBoards[row][col].foodTime = false;
            updateFood();
        }, 10000);
        ctxFood.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
        updateFood();
        updateScore(1, mapBoards[row][col].foodPositif);
    }
    else if (mapBoards[row][col].type == 2)
    {
        mapBoards[row][col].type = 0;
        ctxFood.clearRect(0, 0, canvasPlayer.width, canvasPlayer.height);
        updateFood();
        updateScore(5);
        launchBonus();
    }
}

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

// -- MOVES --

let drawPlayer = function()
{
    let playerPosArrayCol = player.posX / tileSize;
    let playerPosArrayRow = player.posY / tileSize;
    // MOVE TOP
    if (player.moving == false && player.topPressed == true)
    {
        if (typeof mapBoards[playerPosArrayRow - 1][playerPosArrayCol] != "undefined")
        {
            if (mapBoards[playerPosArrayRow - 1][playerPosArrayCol].wall < 1 && mapBoards[playerPosArrayRow - 1][playerPosArrayCol + 1].wall < 1 && mapBoards[playerPosArrayRow - 1][playerPosArrayCol + 2].wall < 1)
            {
                    let oldPosY = player.posY;
                    player.moving = true;
                    player.movingTempo = setInterval(function()
                    {
                        player.posY -= player.movingSpeed;
                        if (player.posY == oldPosY - 2 * tileSize)
                        {
                            player.animationIndex = player.animationIndex == 6 ? player.animationIndex + 1 : 6;
                            takeFood(playerPosArrayRow - 1, playerPosArrayCol + 1)
                            player.moving = false;
                            player.row = player.posY / tileSize;
                            player.col = player.posX / tileSize;
                            clearInterval(player.movingTempo);
                        }
                    },17);
            }
        }
    }
    // MOVE BOTTOM
    if (player.moving == false && player.bottomPressed == true)
    {
        if (typeof mapBoards[playerPosArrayRow + 3][playerPosArrayCol] != "undefined")
        {
            if (mapBoards[playerPosArrayRow + 3][playerPosArrayCol].wall < 1 && mapBoards[playerPosArrayRow + 3][playerPosArrayCol + 1].wall < 1 && mapBoards[playerPosArrayRow + 3][playerPosArrayCol + 2].wall < 1)
            {
                    let oldPosY = player.posY;
                    player.moving = true;
                    player.movingTempo = setInterval(function()
                    {   
                        player.posY += player.movingSpeed;
                        if (player.posY == oldPosY + 2 * tileSize)
                        {
                            player.animationIndex = player.animationIndex == 2 ? player.animationIndex + 1 : 2;
                            takeFood(playerPosArrayRow + 3, playerPosArrayCol + 1)
                            player.moving = false;
                            player.row = player.posY / tileSize;
                            player.col = player.posX / tileSize;
                            clearInterval(player.movingTempo);
                        }
                    },17);
            }
        }
    }
    // MOVE RIGHT
    if (player.moving == false && player.rightPressed == true)
    {
        if (typeof mapBoards[playerPosArrayRow][playerPosArrayCol + 3] != "undefined")
        {
            if (mapBoards[playerPosArrayRow][playerPosArrayCol + 3].wall < 1 && mapBoards[playerPosArrayRow + 1][playerPosArrayCol + 3].wall < 1 && mapBoards[playerPosArrayRow + 2][playerPosArrayCol + 3].wall < 1)
            {
                let oldPosX = player.posX;
                player.moving = true;
                player.movingTempo = setInterval(function()
                {
                    player.posX += player.movingSpeed;
                    if (player.posX == oldPosX + 2 * tileSize)
                    {
                        player.animationIndex = player.animationIndex == 0 ? player.animationIndex + 1 : 0;
                        takeFood(playerPosArrayRow + 1, playerPosArrayCol + 3)
                        player.moving = false;
                        player.row = player.posY / tileSize;
                        player.col = player.posX / tileSize;
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

        if (typeof mapBoards[playerPosArrayRow][playerPosArrayCol - 1] != "undefined")
        {
            if (mapBoards[playerPosArrayRow][playerPosArrayCol - 1].wall < 1 && mapBoards[playerPosArrayRow + 1][playerPosArrayCol - 1].wall < 1 && mapBoards[playerPosArrayRow + 2][playerPosArrayCol - 1].wall < 1)
            {
                let oldPosX = player.posX;
                player.moving = true;
                player.movingTempo = setInterval(function()
                {
                    player.posX -= player.movingSpeed;
                    if (player.posX == oldPosX - 2 * tileSize)
                    {
                        player.animationIndex = player.animationIndex == 4 ? player.animationIndex + 1 : 4;
                        takeFood(playerPosArrayRow + 1, playerPosArrayCol - 1)
                        player.moving = false;
                        player.row = player.posY / tileSize;
                        player.col = player.posX / tileSize;
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
    if (mapBoards[player["row"]][player["col"]].garbageHere == true)
    {
        takeGarbage(player["row"], player["col"]);
    }
    ctxPlayer.drawImage(player.animationImg[player.animationIndex], player.posX, player.posY, player.size, player.size);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);