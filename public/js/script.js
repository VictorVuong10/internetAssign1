const STARTSIZE = 5;

let game = {
    // x: number, 
    // y:
}


function startGame()
{
    game.score = 0;
    game.width = 400;
    game.height = 400;
    game.x = STARTSIZE;
    game.y = STARTSIZE;
    game.tiles = 1;
    game.ready = false;
    document.getElementById('start').style.display = 'none';
    document.getElementById('terminate').style.display = 'block';
    genScore();
    genBoard();
    
    fillBoard();

    setTimeout(startRound,500);

    // document.getElementById('board').style.width = (document.getElementById('board').offsetHeight + 1000).toString() + "px";

    

    
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
    document.getElementById('homePage').appendChild(score);
}

function genBoard(){
    let board = document.createElement('div');
    board.setAttribute('id',"board");
    document.getElementById('homePage').appendChild(board);
}

function fillBoard() {
    let board = document.getElementById('board');
    for(let i = 0; i < game.x; i++) {
        for(let j = 0; j < game.y; j++) {
            let tile = document.createElement("div");
            let front = document.createElement("div");
            let back = document.createElement("div");
            tile.setAttribute('class', 'thecard');
            front.setAttribute('class', 'thefront');
            back.setAttribute('class', 'thebackwrong');

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
        // console.log(selectedTileID);
        // console.log("itme");
        // console.log(i);
        // console.log("enditme");

        selTile = document.getElementById(selectedTileID[i]);

        selTile.getElementsByClassName('thebackwrong')[0].setAttribute('class', 'theback');
    }
    game.selectedTileID = selectedTileID;

}

//rotates the board and should set state of board to ready
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
    // console.log("look at me")
    // console.log(rotate);
    // console.log("me look at")
    switch(rotate) {
    case 1:
        document.getElementById('board').style.webkitTransform = "rotate(90deg)";
        break;
    case 2:
        document.getElementById('board').style.webkitTransform = "rotate(-90deg)";
        break;
    default:      
        document.getElementById('board').style.webkitTransform = "rotate(0deg)"
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
        // console.log(tile);
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
        console.log("AAAA")
        resetBoard(false);
        console.log("BBBBB")
        endGame();
        console.log("CCCCC")
    } else {
        resetBoard(true);
        setTimeout(endRound,2000);
    }

}


function endGame() {
    if(game.wrong==-1) {
        setTimeout(flipSelectedTiles,1000,false);   
    }

    document.getElementById('start').style.display = 'none';
    document.getElementById('terminate').style.display = 'none';

    let endScore = document.createElement('div');
    endScore.setAttribute('id', 'endScore')
    let messagep = document.createElement('h3');
    messagep.textContent = "You Score is ";
    let scorep = document.createElement('h1');
    scorep.textContent = game.score;
    endScore.appendChild(messagep);
    endScore.appendChild(scorep);
    document.getElementById('homePage').appendChild(endScore);
    // score.setAttribute('id',"score");

    

}

function terminateGame() {

    if(game.ready) {

        resetBoard(false);
        endGame();
    }

}

function endRound() {
    
    
    if((game.x == game.y && game.x == 5 && game.wrong==-1) || Math.floor(Math.random() * 2)==0) {
        // changeTileSize();
        
        changeBoardSize();
    } else {
        // console.log("hello")
        changeBoardSize();
    }
    fillBoard();
    document.getElementById('currentTiles').textContent = "Tiles Left: " + (game.tiles - game.selectedTiles);
    setTimeout(startRound,2250);
}

function changeTileSize() {
    game.tiles += game.wrong;
}

function changeBoardSize() {

    let board = document.getElementById('board');


    console.log(game.width)
    
    console.log(game.height)
    console.log("asd")
    console.log(board.style.width);
    console.log(board.style.height);
    console.log('bas')



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

    console.log(game.width);
    
    console.log(game.height);


    
}

function resetBoard(gen) {
    game.selectedTiles=0;
    document.getElementById('board').remove();
    if(gen) {
        genBoard();
    }

}