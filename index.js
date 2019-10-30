let express = require('express')
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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

let playerRoutes = require('./routes/player');

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req,res) {
    res.render('home', { pageTitle: 'Matrix Mem', heading: 'Greetings', parastart: 'Click Play to Start', paraterm: 'Click Terminate to End Game', start: 'Start', term: 'Terminate', homeCSS: true});
});

app.use(playerRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server ready'))



