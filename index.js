let express = require('express')
const session = require('express-session')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');

const expressHbs = require('express-handlebars');
app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(session({
  secret: 'afsdsadkgjkdlfsjs2u4293'
}));

let playerRoutes = require('./routes/player');
app.get('/', function (req,res) {
    res.render('home', { pageTitle: 'Matrix Mem', heading: 'Greetings', parastart: 'Click Play to Begin the Game', paraterm: 'Click Terminate to End Game', start: 'Play', term: 'Terminate', homeCSS: true});
});

app.use(playerRoutes);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'public')));



app.listen(PORT, () => console.log('Server ready'))



