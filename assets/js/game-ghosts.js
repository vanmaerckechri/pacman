/*let ghost_red = new Image();
ghost_red.src = 'assets/img/ghost_red.svg';

let ghost =
{
    size: tileSize * 3,
    posX: tileSize * 9,
    posY: tileSize * 25,
    directionV: null,
    directionH: null,
    directionPrior: [],
    topPressed: false,
    rightPressed: false,
    bottomPressed: false,
    leftPressed: false,
    spacePressed: false,
    spaceStopPressed: true,
    busy: false,
    movingTempo: null,
    movingSpeed: tileSize / 2,
    alive: 1
};

let moveGhost = function(ghost)
{
    let top, bottom, left, right;
    let directionH;
    let ghostPosArrayCol = ghost.posX / tileSize;
    let ghostPosArrayRow = ghost.posY / tileSize;
    // GIVER PRIORITY DIRECTION ORDER
    // top
    if (ghost.posY < 0)
    {
        top = 1;
        bottom = 2;
    }
    // bottom
    else if (ghost.posY > 0)
    {
        bottom = 1;
        top = 2;
    }
    else
    {
        bottom = 0;
        top = 0;
    }
    // left
    if (ghost.posX < 0)
    {
        left = 1;
        right = 2;
    }
    // right
    else if (ghost.posY > 0)
    {
        right = 1;
        left = 2;
    }
    else
    {
        right = 0;
        left = 0;
    }
    // priority
    ghost.directionPrior = [];
    ghost.directionPrior.push[]

    if (ghost.busy == false)
    {
        ghost.busy = true;
        // Top
        // check if there is no wall
        if (mapBoards[ghostPosArrayRow - 1][ghostPosArrayCol].wall < 1)
        {
            let oldPosY = ghost.posY;
            ghost.movingTempo = setInterval(function()
            {
                ghost.posY -= ghost.movingSpeed;
                if (ghost.posY == oldPosY - 2 * tileSize)
                {
                    ghost.busy = false;
                    clearInterval(ghost.movingTempo);
                }
                
            },17);
        }
    }    
}

let followPlayer = function(ghost)
{
    if (ghost.busy == false)
    {
        if (player.posY != ghost.posY)
        {
            ghost.directionV = player.posY - ghost.posY;
        }
        else
        {
            ghost.directionV = 0;
        }
        if (player.posX != ghost.posX)
        {
            ghost.directionH = player.posX - ghost.posX;
        }
        else
        {
            ghost.directionH = 0;
        }
    }
}

let manageGhosts = function()
{
    followPlayer(ghost);
    moveGhost(ghost);
    ctxGhosts.drawImage(ghost_red, ghost.posX, ghost.posY, ghost.size, ghost.size);
}*/