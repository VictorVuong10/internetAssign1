let peopleModel = require('../models/peopleData');

exports.getAllPeople = (req,res,next) => {
  let Peoples = peopleModel.getall();
   for(let i=0; i<Peoples.length; i++) {
      Peoples[i]['id'] = 'people/' + i;
    }
   res.render('peoples', { people: Peoples, peoplesCSS: true });
};

exports.getAddPeople = (req,res,next) => {
    res.render('peopleadd' ,{formsCSS: true});
};

exports.getPeople = (req,res,next) => {
    let id = req.params.id;
    let People = peopleModel.getpeople(id);
    res.render('people', {people: People, peopleCSS: true});
}

exports.postAddPeople = (req,res,next) => {
    let p_name = req.body.name;
    let p_about = req.body.about;
    let p_imageURL = req.body.imageURL;
 
    let pOject = {
       name: p_name,
       about: p_about,
       url: p_imageURL
    }
 
    peopleModel.add(pOject);
    res.redirect(301, '/peoples');
}