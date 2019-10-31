let p = [];

function addPlayer(e) {
    p.push(e);
}

function getLeaderBoard() {
    return p;
}

// function getPeople(id) {
//     return p[id];
// }

module.exports = {
    add : addPlayer,
    leaderBoard : getLeaderBoard,
    // getpeople: getPeople 
}