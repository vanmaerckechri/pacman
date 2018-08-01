let tileSize = 16;
let tileSizeHalf = tileSize / 2;
let tileNumberByRow = 43;
let tileNumberByCol = 41;
let mapBoards = [];
let bonusTempo;
// 43 / 41
let map01 = [
	9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
	9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 9, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9,
    9, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 0, 9,
    9, 0, 2, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 2, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 9, 0, 1, 0, 1, 0, 1, 0, 9, 0, 1, 0, 1, 0, 1, 0, 9, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9,
    3, 3, 3, 3, 3, 3, 3, 3, 9, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 9, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 9, 0, 1, 0, 9, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 9, 0, 1, 0, 9, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 9, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 9, 3, 3, 3, 3, 3, 3, 3, 3,
    9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 3, 3, 3, 3, 3, 3, 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 9, 3, 3, 3, 3, 3, 3, 3, 9, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 3, 3, 3, 3, 3, 3, 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9,
    3, 3, 3, 3, 3, 3, 3, 3, 9, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 9, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 9, 0, 1, 0, 9, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 9, 0, 1, 0, 9, 3, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3, 3, 3, 3, 9, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 9, 3, 3, 3, 3, 3, 3, 3, 3,
    9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 9, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 2, 0, 1, 0, 1, 0, 9, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 9, 0, 1, 0, 1, 0, 2, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 9, 0, 1, 0, 1, 0, 1, 0, 9, 0, 1, 0, 1, 0, 1, 0, 9, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 1, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 1, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9
	];
let floor1 = new Image();
floor1.src = 'assets/img/normal1.svg';
let floor2 = new Image();
floor2.src = 'assets/img/normal2.svg';
let unbreakBlock = new Image();
unbreakBlock.src = 'assets/img/unbreak.svg';
let box = new Image();
box.src = 'assets/img/box1.svg';
// transforme les tableaux map de dimension unique en tableau à deux dimensions (row / col)
let row4Rand = [];
let col4Rand = [];
function genMapBoard()
{
	let mapIndex = 0;
    let boxRow = [];
    let boxCol = [];
	for(let r = 0; r < tileNumberByRow; r++)
	{
		mapBoards[r] = [];
        for(let c = 0; c < tileNumberByCol; c++)
        {
			mapBoards[r][c] = {wall: 0, type: 0, bonus: undefined};
            //murs.
			if (map01[mapIndex] == 9)
			{
				mapBoards[r][c].wall = 2;
			}
			mapBoards[r][c].type = map01[mapIndex];
			mapIndex++;
		}
    }
}

function drawMap()
{
	let tile;
	let tileX;
    let tileY;
    let switchTemp;
    let switchImg = [floor1, floor2];
	for(let r = 0; r < tileNumberByRow; r++)
    {
        for(let c = 0; c < tileNumberByCol; c++)
        {
            tileBonus = mapBoards[r][c].bonus;
            tileType = mapBoards[r][c].type;
           	tileX = c  * tileSize;
    		tileY = r  * tileSize;
            switchTemp = switchImg[0];
            switchImg[0] = switchImg[1];
            switchImg[1] = switchTemp;
            //sol.
            if(tileType <= 3)
            {
                ctxBackground.drawImage(switchImg[0], tileX, tileY, tileSize, tileSize);
            }
            //gommes.
            if(tileType == 1)
            {
                ctxFood.beginPath();
                ctxFood.arc(tileX + (tileSize / 2), tileY + (tileSize / 2), tileSize / 4, 0, 2*Math.PI);
                ctxFood.fillStyle = "white";
                ctxFood.fill();
            }
            //bonus
            if(tileType == 2)
            {
                ctxFood.beginPath();
                ctxFood.arc(tileX + (tileSize / 2), tileY + (tileSize / 2), tileSize / 2, 0, 2*Math.PI);
                ctxFood.fillStyle = "white";
                ctxFood.fill();
            }           
            //murs.
            if(tileType == 9)
            {
                ctxBackground.drawImage(unbreakBlock, tileX, tileY, tileSize, tileSize);
            }
            if (mapBoards[r][c].wall == 3)
            {
                mapBoards[r][c].wall = 0;
            }
            //coord for random pathfinder
            if (r % 2 != 0 && c % 2 != 0 && mapBoards[r][c].wall != 2 && r < tileNumberByRow - 3 && c < tileNumberByCol - 3)//(r < tileNumberByRow -3 => size of ghost 3/3)
            {
                if (mapBoards[r][c].type == 0 && mapBoards[r+1][c].type == 0 && mapBoards[r+2][c].type == 0 && mapBoards[r][c+1].type == 0 && mapBoards[r+1][c+1].type == 0 && mapBoards[r+2][c+1].type == 0)
                {
                    row4Rand.push(Math.ceil(r / 2));
                    col4Rand.push(Math.ceil(c / 2));
                }
            }
        }
    }
}

// -- FOOD --

function updateFood()
{
    let tile;
    let tileX;
    let tileY;
    for(let r = 0; r < tileNumberByRow; r++)
    {
        for(let c = 0; c < tileNumberByCol; c++)
        {
            tileType = mapBoards[r][c].type;
            tileX = c  * tileSize;
            tileY = r  * tileSize;
            //gommes.
            if(tileType == 1)
            {
                ctxFood.beginPath();
                ctxFood.arc(tileX + (tileSize / 2), tileY + (tileSize / 2), tileSize / 4, 0, 2*Math.PI);
                ctxFood.fillStyle = "white";
                ctxFood.fill();
            }
            else if(tileType == 2)
            {
                ctxFood.beginPath();
                ctxFood.arc(tileX + (tileSize / 2), tileY + (tileSize / 2), tileSize / 2, 0, 2*Math.PI);
                ctxFood.fillStyle = "white";
                ctxFood.fill();
            }
        }
    }   
}