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
        state: "start",
        busy: false,
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
    red["row"] = tileSize * 15;
    red["col"] = tileSize * 19;
    ghosts.push(red);

    // orange
    let ghost_orange = new Image();
    ghost_orange.src = 'assets/img/ghost_orange.svg';
    let orange = JSON.parse(JSON.stringify(ghost));
    orange["img"] = ghost_orange;
    orange["startAt"] = 0;
    orange["posY"] = tileSize * 19;
    orange["posX"] = tileSize * 19;
    orange["row"] = tileSize * 19;
    orange["col"] = tileSize * 19;
    ghosts.push(orange);
}

let moveGhost = function(ghost)
{
    ghost["busy"] = true;
    if (ghost["path"][0] == "North")
    {
        ghost["path"].splice(0, 1);
        ghost["row"] -= 2;
        ghost.movingTempo = setInterval(function()
        {   
            ghost["posY"] -= ghost["movingSpeed"];
            if (ghost["posY"] / tileSize == ghost["row"])
            {
                clearInterval(ghost.movingTempo);
                if (ghost["path"].length != 0)
                {
                    moveGhost(ghost);
                }
                else
                {
                    ghost["busy"] = false;
                }
            }
        },17);
    }
    else if (ghost["path"][0] == "West")
    {
        ghost["path"].splice(0, 1);
        ghost["col"] -= 2;
        ghost["movingTempo"] = setInterval(function()
        {   
            ghost["posX"] -= ghost["movingSpeed"];
            if (ghost["posX"] / tileSize == ghost["col"])
            {
                clearInterval(ghost.movingTempo);
                if (ghost["path"].length != 0)
                {
                    moveGhost(ghost);
                }
                else
                {
                    ghost["busy"] = false;
                }
            }
        },17);
    }
    else if (ghost["path"][0] == "East")
    {
        ghost["path"].splice(0, 1);
        ghost["col"] += 2;
        ghost["movingTempo"] = setInterval(function()
        {   
            ghost["posX"] += ghost["movingSpeed"];
            if (ghost["posX"] / tileSize == ghost["col"])
            {
                clearInterval(ghost.movingTempo);
                if (ghost["path"].length != 0)
                {
                    moveGhost(ghost);
                }
                else
                {
                    ghost["busy"] = false;
                }
            }
        },17);
    }
    else if (ghost["path"][0] == "South")
    {
        ghost["path"].splice(0, 1);
        ghost["row"] += 2;
        ghost["movingTempo"] = setInterval(function()
        {   
            ghost["posY"] += ghost["movingSpeed"];
            if (ghost["posY"] / tileSize == ghost["row"])
            {
                clearInterval(ghost.movingTempo);
                if (ghost["path"].length != 0)
                {
                    moveGhost(ghost);
                }
                else
                {
                    ghost["busy"] = false;
                }
            }
        },17);
    }
}


let manageGhosts = function()
{
    for (let i = ghosts.length - 1; i >= 0; i--)
    {
        let ghost = ghosts[i];
        // moves
        if (ghost["busy"] == false && !(ghost.row == player.row && ghost.col == player.col))
        {
            if (ghost["path"].length == 0)
            {
                //calculPath(ghost);
            }
            else
            {
                //moveGhost(ghost);
            }
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