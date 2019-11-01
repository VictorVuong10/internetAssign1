let playerModel = require('../models/playerData');
const uuid = require('uuid/v4');

exports.leaderboard = async(req,res) => {

            let id = uuid();

            await playerModel.add(id,req.body.playerName,req.session.value);

            let data = await playerModel.leaderBoard();

            let player = await playerModel.get(id);

            req.session.value = undefined;

            res.render('leaderBoard', {rest:'Restart',rankSTR:'Rank',nameSTR:'Name',scoreSTR:'Score', pageTitle:'Matrix Mem',leaderboardCSS:true, heading:"Top 5 Scores" ,leaderBoard:'asd', player: data.rows, postPlayer: player.rows[0],post:true})
    
};

exports.getleaderboard = async(req,res) => {
    req.session.value = undefined;

    let data = await playerModel.leaderBoard();

    res.render('leaderBoard', {yourScore:'Your Score is',rest:'Restart',rankSTR:'Rank', nameSTR:'Name', scoreSTR:'Score', pageTitle:'Matrix Mem', player: data.rows, heading:"Top 5 Scores", leaderboardCSS:true});
};

exports.submit = (req,res) => {
    req.session.value = req.body.playerScore;
    res.render('summary', { pageTitle: 'Matrix Mem', subMes: 'Submit Your Score', restart: 'Restart the Game', scoreMes: 'Your Score is ' + req.body.playerScore.toString(), submit: 'Submit', rest: 'Restart', summaryCSS: true});
};