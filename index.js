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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

app.use(session({
  secret: 'afsdsadkgjkdlfsjs2u4293'
}));

let playerRoutes = require('./routes/player');
app.get('/', function (req,res) {
    res.render('home', { pageTitle: 'Matrix Mem', heading: 'Greetings', parastart: 'Click Play to Start', paraterm: 'Click Terminate to End Game', start: 'Start', term: 'Terminate', homeCSS: true});
});

app.use(playerRoutes);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'public')));

const { Client } = require('pg');

console.log(process.env.DATABASE_URL);
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});


app.listen(PORT, () => console.log('Server ready'))



