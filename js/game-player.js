let player =
{
    posX: tileSize,
    posY: tileSize,
    topPressed: false,
    rightPressed: false,
    bottomPressed: false,
    leftPressed: false,
    spacePressed: false,
    spaceStopPressed: true,
    alive: 1
};

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
    	else if(e.keyCode == 32 && players[playerIndex].spaceStopPressed == true)
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

let drawPlayer = function()
{
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
