let ghost_afraid = new Image();
ghost_afraid.src = 'assets/img/ghost_afraid.svg';

let ghost_afraidFlash = new Image();
ghost_afraidFlash.src = 'assets/img/ghost_afraidFlash.svg';

let ghost_dead = new Image();
ghost_dead.src = 'assets/img/ghost_dead.svg';

let ghosts = [];

let initGhosts = function()
{
    let ghost =
    {
        name: "",
        display: "normal",
        img: {},
        startAt: 0,
        startPath: [],
        state: "start",
        busy: true,
        afraidFlashTempo: false,
        afraidFlashSwitch: {},
        size: tileSize * 3,
        posY: tileSize * 15,
        posX: tileSize * 19,
        row: 15,
        col: 19,
        path: [],
        movingTempo: null,
        movingSpeedOrigin: tileSize / 8,
        movingSpeed: tileSize / 8,
        alive: 1,
        pointsByGhost: 10,
        pointsByGhostTempo: false,
        displayPointsByGhostPosX: false,
        displayPointsByGhostPosY: false,
        wantDropGarbage: false,
        garbageTime: null,
    };
    // red
    let ghost_red = new Image();
    ghost_red.src = 'assets/img/ghost_red.svg';
    let red = JSON.parse(JSON.stringify(ghost));
    red["img"] = ghost_red;
    red["startAt"] = 0;
    red["posY"] = tileSize * 15;
    red["posX"] = tileSize * 19;
    red["row"] = 15;
    red["col"] = 19;
    red["name"] = "red";
    ghosts.push(red);

    // orange
    let ghost_orange = new Image();
    ghost_orange.src = 'assets/img/ghost_orange.svg';
    let orange = JSON.parse(JSON.stringify(ghost));
    orange["img"] = ghost_orange;
    orange["startAt"] = 3000;
    orange["startPath"] = ["North", "North", "East", "North", "North"];
    orange["posY"] = tileSize * 19;
    orange["posX"] = tileSize * 19;
    orange["row"] = 19;
    orange["col"] = 19;
    orange["name"] = "orange";
    orange["garbageTime"] = setInterval(function()
    {
    	orange["wantDropGarbage"] = true;
    }, 1000)
    ghosts.push(orange);
}

let moveRandomGhost = function(ghost)
{
    let rand = Math.floor((Math.random() * (row4Rand.length - 1)) + 1); 
    calculPath(ghost, Math.ceil(ghost.row/2), Math.ceil(ghost.col/2), row4Rand[rand], col4Rand[rand]);    
}

let searchWayForEscape = function(ghost)
{
    /*if (ghost.row < tileNumberByRow / 2)
    {
        if (ghost.col < tileNumberByCol /2)
        {

        }
    }*/
    moveRandomGhost(ghost);
}

let backAtSpawn = function(ghost)
{
    if (mapBoards[ghost.row][ghost.col].type == 3)
    {
        ghost["state"] = "start";
        ghost["display"] = "normal";
        startGhost(ghost);
        return;
    }
    if (ghost["path"].length == 0)
    {
        ghost["afraidFlashTempo"] = false;
        ghost["movingSpeed"] = tileSize / 4;
        calculPath(ghost, Math.ceil(ghost.row/2), Math.ceil(ghost.col/2), 8, 10);
        ghost["path"].push("South", "South");
    }
}

let givePointsByGhost = function(ghost)
{
    player["pointsByGhost"] *= 2;
    ghost["pointsByGhost"] = player["pointsByGhost"];
    updateScore(player["pointsByGhost"]);
    ghost["displayPointsByGhostPosX"] = ghost["posX"];
    ghost["displayPointsByGhostPosY"] = ghost["posY"];
    ghost["pointsByGhostTempo"] = setTimeout(function()
    {
    	ghost["displayPointsByGhostPosX"] = false;
    	ghost["displayPointsByGhostPosY"] = false;
    }, 1000);
}

let displayPointsByGhost = function()
{
	for (let i = ghosts.length - 1; i >= 0; i--)
	{
		if (ghosts[i]["displayPointsByGhostPosX"] != false && ghosts[i]["displayPointsByGhostPosY"] != false)
		{
			ctxFood.font = "18px Arial";
			ctxFood.fillText(ghosts[i]["pointsByGhost"], ghosts[i]["displayPointsByGhostPosX"], ghosts[i]["displayPointsByGhostPosY"]);
		}
	}
}

let checkCollisionWithPlayer = function(ghost)
{
    if (ghost.posX > player.posX - ghost.size && ghost.posX < player.posX + player.size && ghost.posY > player.posY - player.size && ghost.posY < player.posY + ghost.size)
    {
        if (ghost.state == "afraid" || ghost.state == "afraidFlash")
        {
            ghost["state"] = "dead";
            ghost["display"] = "dead";
            ghost["path"] = [];
            ghost["alive"] = 0;
            givePointsByGhost(ghost);
        	displayPointsByGhost(ghost);
        }
    }
} 

let moveGhost = function(ghost)
{
    ghost["busy"] = true;
    if (typeof ghost["path"][0] != "undefined")
    {
        if (ghost["path"][0] == "North")
        {
            ghost["path"].splice(0, 1);
            ghost.movingTempo = setInterval(function()
            {   
                ghost["posY"] -= ghost["movingSpeed"];
                if (ghost["posY"] / tileSize == ghost["row"] - 2)
                {
                    ghost["row"] -= 2;
                    clearInterval(ghost.movingTempo);
                    ghost["busy"] = false;
                }
            },17);
        }
        else if (ghost["path"][0] == "West")
        {
            ghost["path"].splice(0, 1);
            ghost["movingTempo"] = setInterval(function()
            {   
                ghost["posX"] -= ghost["movingSpeed"];
                if (ghost["posX"] / tileSize == ghost["col"] - 2)
                {
                    ghost["col"] -= 2;
                    clearInterval(ghost.movingTempo);
                    ghost["busy"] = false;
                }
            },17);
        }
        else if (ghost["path"][0] == "East")
        {
            ghost["path"].splice(0, 1);
            ghost["movingTempo"] = setInterval(function()
            {   
                ghost["posX"] += ghost["movingSpeed"];
                if (ghost["posX"] / tileSize == ghost["col"] + 2)
                {
                    ghost["col"] += 2;
                    clearInterval(ghost.movingTempo);
                    ghost["busy"] = false;
                }
            },17);
        }
        else if (ghost["path"][0] == "South")
        {
            ghost["path"].splice(0, 1);
            ghost["movingTempo"] = setInterval(function()
            {   
                ghost["posY"] += ghost["movingSpeed"];
                if (ghost["posY"] / tileSize == ghost["row"] + 2)
                {
                    ghost["row"] += 2;
                    clearInterval(ghost.movingTempo);
                    ghost["busy"] = false;
                }
            },17);
        }
    }
    else
    {
        ghost["busy"] = false;
    }
}

let startGhost = function(ghost)
{
    if (ghost["path"].length == 0)
    {
        ghost["busy"] = true;
        ghost.movingTempo = setTimeout(function()
        {           
            ghost["movingSpeed"] = ghost["movingSpeedOrigin"];
            ghost["path"] = ghost["startPath"];
            ghost["state"] = "hunt";
            ghost["startAt"] = 1000;
            ghost["startPath"] = ["North", "North"];
            ghost["busy"] = false;
            clearTimeout(ghost.movingTempo);
        },ghost["startAt"]);
    }
}

let drawGarbage = function()
{
	let garbagePositionListRow = [7, 7, 27, 27];
	let garbagePositionListCol = [9, 29, 9, 29];	
	for (let i = garbagePositionListRow.length - 1; i >= 0; i--)
	{
		let row = garbagePositionListRow[i];
		let col = garbagePositionListCol[i];
		let garbageIndex = mapBoards[row][col].garbageType;
		if (mapBoards[row][col].garbageType !== false)
		{
			ctxPlayer.drawImage(garbagesImages[garbageIndex], col * tileSize, row * tileSize, tileSize * 3, tileSize * 3);
		}
	}
}

let dropGarbage = function(row, col)
{
	let centerRow = row + 1;
	let centerCol = col + 1;
	let distance = 2;
	let rand = Math.floor((Math.random() * (garbagesList.length - 1)) + 0);
	mapBoards[row][col].garbageType = rand;
	mapBoards[row][col].foodNegatifTime = setInterval(function()
	{
		if (typeof mapBoards[centerRow - distance] != "undefined" && mapBoards[centerRow - distance][centerCol].foodPositif == true && distance <= 6)
		{
			/*mapBoards[centerRow - distance][centerCol].foodPositif = false;
			mapBoards[centerRow + distance][centerCol].foodPositif = false;
			mapBoards[centerRow][centerCol - distance].foodPositif = false;
			mapBoards[centerRow][centerCol + distance].foodPositif = false;
			mapBoards[centerRow - distance][centerCol - distance].foodPositif = false;
			mapBoards[centerRow - distance][centerCol + distance].foodPositif = false;
			mapBoards[centerRow + distance][centerCol + distance].foodPositif = false;
			mapBoards[centerRow + distance][centerCol - distance].foodPositif = false;*/
			let rowToChange = -1*distance;
			let colToChange = -1*distance;
			for (let i = ((distance * 2) * (distance * 3)) - 1; i >= 0; i--)
			{
				if (mapBoards[centerRow + rowToChange][centerCol + colToChange].type == 1)
				{
					mapBoards[centerRow + rowToChange][centerCol + colToChange].foodPositif = false;
				}
				if (colToChange < distance)
				{
					colToChange += 1;
				}
				else
				{
					colToChange = -1*distance;
					rowToChange += 1;
				}
			}
			updateFood();
			distance += 2;
		}
	}, 2000)
}

let chooseGarbagePosition = function(ghost)
{
	let garbagePositionListRow = [7, 7, 27, 27];
	let garbagePositionListCol = [9, 29, 9, 29];
	let garbagePositionListRowFree = [];
	let garbagePositionListColFree = [];
	for (let i = garbagePositionListRow.length - 1; i >= 0; i--)
	{
		let row = garbagePositionListRow[i];
		let col = garbagePositionListCol[i];
		if (mapBoards[row][col].garbageHere == false)
		{
			garbagePositionListRowFree.push(row);
			garbagePositionListColFree.push(col);
		}
	}
	if (garbagePositionListRowFree.length > 0)
	{
		let rand = Math.floor((Math.random() * (garbagePositionListRowFree.length - 1)) + 0);
		let row = garbagePositionListRowFree[rand];
		let col = garbagePositionListColFree[rand];
        calculPath(ghost, Math.ceil(ghost.row/2), Math.ceil(ghost.col/2), Math.ceil(row/2), Math.ceil(col/2));
	}
	else
	{
		ghost["wantDropGarbage"] = false;
		ghost["state"] = "hunt";
	}
}

let manageGhosts = function()
{
    for (let i = ghosts.length - 1; i >= 0; i--)
    {
        let ghost = ghosts[i];
        checkCollisionWithPlayer(ghost);
        // moves
        if (ghost["state"] == "start" && ghost.movingTempo == null)
        {        
            startGhost(ghost);
        }

        if (ghost["busy"] == false)
        {
            if (ghost["path"].length == 0)
            {
             	if (ghost["state"] == "dropGarbage")
            	{
            		let row = ghost["posY"] / tileSize;
            		let col = ghost["posX"] / tileSize;
            		if (mapBoards[row][col].garbageHere == false)
            		{
            			mapBoards[row][col].garbageHere = true;
            			ghost["wantDropGarbage"] = false;
            			ghost["state"] = "hunt";
            			dropGarbage(row, col);
            		}
            		else
            		{
            			chooseGarbagePosition(ghost);
            		}
            	}           	
            	else if (ghost["wantDropGarbage"] == true && ghost["state"] != "start" && ghost["state"] != "afraid" && ghost["state"] != "afraidFlash")
            	{
            		ghost["state"] = "dropGarbage";
            		chooseGarbagePosition(ghost);
            	}
                else if (ghost["state"] == "hunt")
                {
                    if (ghost["name"] == "red")
                    {
                        calculPath(ghost, Math.ceil(ghost.row/2), Math.ceil(ghost.col/2), Math.ceil(player.row/2), Math.ceil(player.col/2));
                    }
                    else if (ghost["name"] == "orange")
                    {
                        moveRandomGhost(ghost);
                    }
                }
                else if (mapBoards[ghost["row"]][ghost["col"]].type != 3 && (ghost["state"] == "afraid" || ghost["state"] == "afraidFlash"))
                {
                    searchWayForEscape(ghost);
                }
                else if (ghost["state"] == "dead")
                {
                    backAtSpawn(ghost);
                }
            }
            moveGhost(ghost);
        }
        // display
        if (ghost["display"] == "afraid")
        {
            ctxGhosts.drawImage(ghost_afraid, ghost.posX, ghost.posY, ghost.size, ghost.size);
        }
        else if (ghost["display"] == "afraidFlash")
        {
            if (ghost.afraidFlashTempo == false)
            {
                ghost["afraidFlashSwitch"] = ghost_afraidFlash
                ghost.afraidFlashTempo = setInterval(function()
                {   
                    ghost["afraidFlashSwitch"] = ghost["afraidFlashSwitch"] == ghost_afraid ? ghost_afraidFlash : ghost_afraid;
                },500);
            }
            ctxGhosts.drawImage(ghost["afraidFlashSwitch"], ghost.posX, ghost.posY, ghost.size, ghost.size);
        }
        else if (ghost["display"] == "dead")
        {
            ctxGhosts.drawImage(ghost_dead, ghost.posX, ghost.posY, ghost.size, ghost.size);
        }
        else 
        {
            ctxGhosts.drawImage(ghost["img"], ghost.posX, ghost.posY, ghost.size, ghost.size);
        }
    }

}