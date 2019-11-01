const STARTSIZE = 5;

let game = {
}


function startGame()
{
    game.score = 0;
    game.width = 400;
    game.height = 400;
    game.x = STARTSIZE;
    game.y = STARTSIZE;
    game.tiles = 3;
    game.ready = false;
    game.terminate = false;
    document.getElementById('start').style.display = 'none';
    document.getElementById('terminate').style.display = 'block';
    genScore();
    genBoard();
    
    fillBoard();

    setTimeout(startRound,500);
}

function genScore() {
    let score = document.createElement('div');
    score.setAttribute('id',"score");
    let tilesLeft = document.createElement("div");
    tilesLeft.setAttribute('class',"score");
    let currentScore = document.createElement("div");
    currentScore.setAttribute('class',"score");
    
    tilesPara = document.createElement("p");
    tilesPara.textContent = "Tiles Left: " + game.tiles;
    tilesPara.setAttribute('id',"currentTiles");
    scorePara = document.createElement("p")
    scorePara.textContent = "Score: " + 0;
    scorePara.setAttribute('id',"currentScore");

    tilesLeft.appendChild(tilesPara);
    

    currentScore.appendChild(scorePara);

    score.appendChild(currentScore);
    score.appendChild(tilesLeft);
    document.getElementById('mainDiv').appendChild(score);
    
    let cont = document.createElement('div');
    cont.setAttribute('id',"boardContainer");
    document.getElementById('mainDiv').appendChild(cont);

}

function genBoard(){
    let board = document.createElement('div');
    board.setAttribute('id',"board");
    document.getElementById('boardContainer').appendChild(board);
}

function fillBoard() {
    let board = document.getElementById('board');
    for(let i = 0; i < game.x; i++) {
        for(let j = 0; j < game.y; j++) {
            let tile = document.createElement("div");
            let front = document.createElement("div");
            let back = document.createElement("div");
            tile.setAttribute('class', 'tile');
            front.setAttribute('class', 'tileFront');
            back.setAttribute('class', 'tileBackwrong');

            front.setAttribute('onClick', 'flipTile(this)')

            tile.appendChild(front);
            tile.appendChild(back);
            tile.setAttribute('id', i*game.y + j)
            board.appendChild(tile);
        }
    }
    genTiles();
}

function genTiles(){
    let selectedTileID = new Array(game.tiles);

    for(let i = 0; i<game.tiles;i++) {
        
        let curTile = Math.floor(Math.random() * game.x*game.y);
        while(selectedTileID.indexOf(curTile) != -1 ) {
            curTile = Math.floor(Math.random() * game.x*game.y);
        }

        selectedTileID[i] = curTile;
        selTile = document.getElementById(selectedTileID[i]);

        selTile.getElementsByClassName('tileBackwrong')[0].setAttribute('class', 'tileBack');
    }
    game.selectedTileID = selectedTileID;

}

function startRound() {

    game.selectedTiles = 0;
    game.wrong = 1;

    flipSelectedTiles(false);

    setTimeout(flipSelectedTiles,1900,true);

    
    setTimeout(rotateBoard,2650, Math.floor(Math.random() * 2)+1);
    setTimeout(changeGameState,2800);
    
}

function changeGameState() {
    game.ready = !game.ready;
}

function rotateBoard(rotate) {
    switch(rotate) {
    case 1:
        document.getElementById('board').style.webkitTransform = "rotate(90deg)";
        break;
    default:
        document.getElementById('board').style.webkitTransform = "rotate(-90deg)";
    }
    
}

function flipSelectedTiles(flipped) {
    
    for(let i = 0; i < game.selectedTileID.length; i++) {

        tile = document.getElementById(game.selectedTileID[i]);

        if(flipped) {
            tile.style.webkitTransform = "rotateY(0deg)";
        }else {
            tile.style.webkitTransform = "rotateY(180deg)";
        }
    }
}

function flipTile(frontTile) {
    if(game.ready) {
        let tile = frontTile.parentNode;
        tile.style.webkitTransform = "rotateX(180deg)";
        game.selectedTiles++;

        selectedTileIndex = game.selectedTileID.indexOf(parseInt(tile.id));

        if(selectedTileIndex != -1) {
            game.score++;
            game.selectedTileID.splice(game.selectedTileID.indexOf(parseInt(tile.id)),1);
        } else {
            game.score--;
            game.wrong = -1;
        }

        document.getElementById('currentTiles').textContent = "Tiles Left: " + (game.tiles - game.selectedTiles);
        document.getElementById('currentScore').textContent = "Score: " + game.score;        

        if(game.selectedTiles == game.tiles) {
            changeGameState();
            checkScore();
            
        }
    }

}

function checkScore()
{
    
    if(game.score <= 0) {
        endGame();
    } else {
        if(game.wrong==-1) {
        
            setTimeout(flipSelectedTiles,false);   
    
        }
        setTimeout(endRound,2000);
    }

}

function endGame() {
    let form = document.createElement('form');
    form.setAttribute('id','form');
    form.setAttribute('method','POST');
    form.setAttribute('action', 'summary');
    let scoreInput = document.createElement('input');
    scoreInput.setAttribute('type', 'hidden');
    scoreInput.setAttribute('name', 'playerScore');
    scoreInput.value = game.score;
    form.appendChild(scoreInput);
    document.getElementById('mainDiv').appendChild(form);
    form.submit();
}

async function addPlayer() {

    let form = document.getElementById('form');
    let scoreInput = document.createElement('input');
    scoreInput.setAttribute('type', 'hidden');
    scoreInput.textContent = game.score;
    form.appendChild(scoreInput);

    document.getElementById('form').submit();

}

function terminateGamePrompt() {

    if(game.ready&&!game.terminate) {
        game.terminate = true;
        document.getElementById('board').style.display = 'none';
        let popup = document.createElement('div');
    
        popup.setAttribute('id', 'termination');

        let message = document.createElement('p');
        message.textContent = 'Are you sure you want to terminate the game?';

        let yes = document.createElement('button');
        yes.textContent = 'yes';
        yes.setAttribute('onClick', 'terminateGame()');

        let no = document.createElement('button');
        no.textContent = 'no';
        no.setAttribute('onClick', 'closePrompt()');
        
        popup.appendChild(message)
        popup.appendChild(yes);
        popup.appendChild(no);

        document.getElementById('boardContainer').appendChild(popup);
        game.terminate = false;
    }    
}

function closePrompt() {
    
    document.getElementById('board').style.display = 'flex';
    document.getElementById('termination').remove();
}

function terminateGame() {

        endGame();

}

function endRound() {

    
     resetBoard(true);

    if(((game.x == game.y && game.x == 5 && game.wrong==-1) && (game.tiles>=1 && game.wrong==1 || game.tiles>1 && game.wrong==-1))|| (Math.floor(Math.random() * 2)==0 && (game.tiles>=1 && game.wrong==1 || game.tiles>1 && game.wrong==-1))) {
        
        changeTileSize();
    } else {
        if(game.x == game.y && game.x == 5 && game.wrong==-1) {

        } else {
            if((game.x == game.y && game.x > game.tiles && game.wrong==1) || game.x ==game.y < game.tiles && game.wrong==-1) {
                changeTileSize();
            } else {
                changeBoardSize();
            }
        }
    }
    fillBoard();
    document.getElementById('currentTiles').textContent = "Tiles Left: " + (game.tiles - game.selectedTiles);
    setTimeout(startRound,2250);
}

function changeTileSize() {
    game.tiles += game.wrong;
}

function changeBoardSize() {

    let board = document.getElementById('boardContainer');
    if(game.x == game.y) {
        if(Math.floor(Math.random() * 2) == 0) {
            game.x += game.wrong;
            game.width = (game.width + 79*game.wrong);
        } else {
            game.y += game.wrong;
            game.height = (game.height + 79*game.wrong);
        }
    } else if((game.x > game.y && game.wrong == -1) || (game.x < game.y && game.wrong == 1)) {
        game.x += game.wrong;
        game.width = (game.width + 79*game.wrong);
    } else {
        game.y += game.wrong;
        game.height = (game.height + 79*game.wrong);
    }
    board.style.width = game.width.toString() + "px";
    board.style.height = game.height.toString() + "px";
}

function resetBoard(gen) {
    game.selectedTiles=0;
    document.getElementById('board').remove();
    if(gen) {
        genBoard();
    }

}