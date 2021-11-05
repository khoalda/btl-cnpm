const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const route = require('./routes');

const db = require('./config/db')


app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
app.use(morgan("combined"));

db.connect() // jquery, ajax post form handler

app.use(express.urlencoded(
  {
    extended: true    
  }
)) 

app.use(flash())
app.use(express.json()) // js post form handler
app.use(cookieParser())
app.use(bodyParser())

app.use(methodOverride('_method'))
// use sesssion

app.use(session({
  secret:'secret',
  resave: true,
  saveUninitialized: true
}))

// use passport

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname,'public')))


//template engine
app.engine('hbs', handlebars({
  extname:'.hbs',
  helpers:{
    sum: (a, b) => a + b,
    mul: (a, b) => a*b,
  }
}))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
