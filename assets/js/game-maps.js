let tileSize = 16;
let tileSizeHalf = tileSize / 2;
let tileNumberByRow = 43;
let tileNumberByCol = 41;
let mapBoards = [];
let bonusTempo;
// 43 / 41
let map01 = [
	9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
	9, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 9,
    9, 6, 6, 6, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 9, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 5, 5, 5, 9,
    9, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 9,
    9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9, 9, 9, 9, 9, 0, 1, 0, 9,
    9, 0, 0, 0, 9, 3, 3, 3, 9, 0, 0, 0, 9, 3, 3, 3, 9, 0, 0, 0, 9, 0, 0, 0, 9, 3, 3, 3, 9, 0, 0, 0, 9, 3, 3, 3, 9, 0, 0, 0, 9,
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
    9, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 9,
    9, 4, 4, 4, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 7, 7, 7, 9,
    9, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 9,
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
let pmc = new Image();
pmc.src = 'assets/img/pmc.svg';
let verre_colore = new Image();
verre_colore.src = 'assets/img/verre_colore.svg';
let verre_incolore = new Image();
verre_incolore.src = 'assets/img/verre_incolore.svg';
let carton = new Image();
carton.src = 'assets/img/carton.svg';
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
			mapBoards[r][c] = {wall: 0, type: 0, foodTime: false, foodPositif: true, garbageHere: false};
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
            else if(tileType == 2)
            {
                ctxFood.beginPath();
                ctxFood.arc(tileX + (tileSize / 2), tileY + (tileSize / 2), tileSize / 2, 0, 2*Math.PI);
                ctxFood.fillStyle = "white";
                ctxFood.fill();
            }
            else if(tileType == 4 && typeof mapBoards[r-2] != "undefined" && typeof mapBoards[r-2][c-2] != "undefined" && mapBoards[r-2][c-2].type == 4)
            {
                ctxBackground.drawImage(pmc, tileX - (tileSize * 2), tileY - (tileSize * 2), tileSize * 3, tileSize * 3);
            } 
            else if(tileType == 5 && typeof mapBoards[r-2] != "undefined" && typeof mapBoards[r-2][c-2] != "undefined" && mapBoards[r-2][c-2].type == 5)
            {
                ctxBackground.drawImage(verre_colore, tileX - (tileSize * 2), tileY - (tileSize * 2), tileSize * 3, tileSize * 3);
            }
            else if(tileType == 6 && typeof mapBoards[r-2] != "undefined" && typeof mapBoards[r-2][c-2] != "undefined" && mapBoards[r-2][c-2].type == 6)
            {
                ctxBackground.drawImage(verre_incolore, tileX - (tileSize * 2), tileY - (tileSize * 2), tileSize * 3, tileSize * 3);
            } 
            else if(tileType == 7 && typeof mapBoards[r-2] != "undefined" && typeof mapBoards[r-2][c-2] != "undefined" && mapBoards[r-2][c-2].type == 7)
            {
                ctxBackground.drawImage(carton, tileX - (tileSize * 2), tileY - (tileSize * 2), tileSize * 3, tileSize * 3);
            }               
            //murs.
            else if(tileType == 9)
            {
                ctxBackground.drawImage(unbreakBlock, tileX, tileY, tileSize, tileSize);
            }
            //coord for random pathfinder
            if (r % 2 != 0 && c % 2 != 0 && mapBoards[r][c].wall != 2 && r < tileNumberByRow - 3 && c < tileNumberByCol - 3)//(r < tileNumberByRow -3 => size of ghost 3/3)
            {
                if (mapBoards[r][c].type == 0 && mapBoards[r+1][c].type <= 1 && mapBoards[r+2][c].type <= 1 && mapBoards[r][c+1].type <= 1 && mapBoards[r+1][c+1].type <= 1 && mapBoards[r+2][c+1].type <= 1)
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
            let tileType = mapBoards[r][c].type;
            let foodTime = mapBoards[r][c].foodTime;
            tileX = c  * tileSize;
            tileY = r  * tileSize;
            //gommes.
            if(tileType == 1 && foodTime == false)
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