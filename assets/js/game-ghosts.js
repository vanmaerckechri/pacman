let ghost_red = new Image();
ghost_red.src = 'assets/img/ghost_red.svg';

let ghost =
{
    size: tileSize * 3,
    posX: tileSize * 25,
    posY: tileSize * 27,
    row: 27,
    col: 25,
    path: [],
    topPressed: false,
    rightPressed: false,
    bottomPressed: false,
    leftPressed: false,
    spacePressed: false,
    spaceStopPressed: true,
    busy: false,
    movingTempo: null,
    movingSpeed: tileSize / 4,
    alive: 1
};

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
    if (ghost["busy"] == false && !(ghost.row == player.row && ghost.col == player.col))
    {
        if (ghost["path"].length == 0)
        {
            calculPath(ghost);
        }
        else
        {
            moveGhost(ghost);
        }
    }
    ctxGhosts.drawImage(ghost_red, ghost.posX, ghost.posY, ghost.size, ghost.size);
}