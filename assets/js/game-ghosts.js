let ghost_afraid = new Image();
ghost_afraid.src = 'assets/img/ghost_afraid.svg';

let ghost_afraidFlash = new Image();
ghost_afraidFlash.src = 'assets/img/ghost_afraidFlash.svg';

let ghosts = [];

let initGhosts = function()
{
    let ghost =
    {
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
        topPressed: false,
        rightPressed: false,
        bottomPressed: false,
        leftPressed: false,
        spacePressed: false,
        spaceStopPressed: true,
        movingTempo: null,
        movingSpeed: tileSize / 4,
        alive: 1
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
    ghosts.push(orange);
}

let searchWayForEscape = function(ghost)
{
    /*if (ghost.row < tileNumberByRow / 2)
    {
        if (ghost.col < tileNumberByCol /2)
        {

        }
    }*/
    let rand = Math.floor((Math.random() * row4Rand.length - 1) + 1); 
    calculPath(ghost, Math.ceil(ghost.row/2), Math.ceil(ghost.col/2), row4Rand[rand], col4Rand[rand]);
}

/*let backAtSpawn = function(ghost)
{
    let pathInverseLength = (ghost.pathInverse.length - ghost.path.length) + 1;
    ghost.pathInverse.reverse();
    ghost.pathInverse = pathInverse.slice(0, pathInverseLength)
}*/

let checkCollisionWithPlayer = function(ghost)
{
    if (ghost.posX > player.posX - ghost.size && ghost.posX < player.posX + player.size && ghost.posY > player.posY - player.size && ghost.posY < player.posY + ghost.size)
    {
        if (ghost.state == "afraid")
        {
            //backAtSpawn(ghost);
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


let manageGhosts = function()
{
    for (let i = ghosts.length - 1; i >= 0; i--)
    {
        let ghost = ghosts[i];
        checkCollisionWithPlayer(ghost);
        // moves
        if (ghost["state"] == "start")
        {        
            ghost.movingTempo = setTimeout(function()
            {   
                ghost["busy"] = false
                clearTimeout(ghost.movingTempo);

            },ghost["startAt"]);

            ghost["path"] = ghost["startPath"];
            ghost["state"] = "hunt";
        }

        if (ghost["busy"] == false)
        {
            if (ghost["path"].length == 0)
            {
                if (ghost["state"] == "hunt")
                {
                    calculPath(ghost, Math.ceil(ghost.row/2), Math.ceil(ghost.col/2), Math.ceil(player.row/2), Math.ceil(player.col/2));
                }
                else if (ghost["state"] == "afraid" || ghost["state"] == "afraidFlash")
                {
                    searchWayForEscape(ghost);
                }
            }
            moveGhost(ghost);
        }
        // display
        if (ghost.state == "afraid")
        {
            ctxGhosts.drawImage(ghost_afraid, ghost.posX, ghost.posY, ghost.size, ghost.size);
        }
        else if (ghost.state == "afraidFlash")
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
        else 
        {
            ctxGhosts.drawImage(ghost["img"], ghost.posX, ghost.posY, ghost.size, ghost.size);
        }
    }

}