//load express module                               
let express = require('express'),
   path = require('path'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   mongoose = require('mongoose'),
   dbConfig = require('./database/db');

const jwt = require('jsonwebtoken');

//call function loaded to "express" variable to get express object
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
      console.log('Database sucessfully connected')
  },
  error => {
      console.log('Database could not connected: ' + error)
  }
)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));

var passport = require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(session({
  name:'myname.sid',
  resave:false,
  saveUninitialized:false,
  secret:'secret',
  cookie:{
    maxAge: 36000000,
    httpOnly: false,
    secure: false
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());
require('./passport-config');


app.use(cors()); 

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
  next();
});

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  next();
});

const multer  = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });



var api = require('./routes/api.js');
app.use(express.static(path.join(__dirname, '../dist/testproj')));
app.use('/', express.static(path.join(__dirname, '../dist/testproj')));

app.use('/api', api);




const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
            

module.exports = app;
