let peopleModel = require('../models/playerData');

// exports.getMatrix = (req,res,next) => {
//   let Peoples = peopleModel.getall();
//    for(let i=0; i<Peoples.length; i++) {
//       Peoples[i]['id'] = 'people/' + i;
//     }
//    res.render('peoples', { people: Peoples, peoplesCSS: true });
// };

// exports.getMatrix = (req,res,next) => {

//     let matrix;

//     switch(req.body.status) {
//         case -1:
//         break;
//         case 1:
//         break;
//         default:

//     }

//    res.render('peoples', { people: Peoples, peoplesCSS: true });
// };

exports.leaderboard = (req,res) => {
    
    console.log(req.session.playerScore);
    res.render('leaderBoard', {pageTitle:'Matrix Mem'})
};

exports.submit = (req,res) => {
    req.session.value = req.body.playerScore
    res.render('summary', { pageTitle: 'Matrix Mem', subMes: 'Submit Your Score', restart: 'Restart the Game', scoreMes: 'Your Score is ' + req.body.playerScore.toString(), submit: 'Submit', rest: 'Restart', summaryCSS: true});

};


// exports.getPeople = (req,res,next) => {
//     let id = req.params.id;
//     let People = peopleModel.getpeople(id);
//     res.render('people', {people: People, peopleCSS: true});
// }

// exports.postAddPeople = (req,res,next) => {
//     let p_name = req.body.name;
//     let p_about = req.body.about;
//     let p_imageURL = req.body.imageURL;
 
//     let pOject = {
//        name: p_name,
//        about: p_about,
//        url: p_imageURL
//     }
 
//     peopleModel.add(pOject);
//     res.redirect(301, '/peoples');
// }