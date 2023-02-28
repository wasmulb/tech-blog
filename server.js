const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars')
const path =require('path');
const sequelize = require('./config/connection');
const routes = require('./controllers')
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const PORT = 3001 || process.env.PORT

const app = express()

const hbs = exphbs.create({})
//Session setup
const sess = {
    secret: 'keyboard cat',
    cookie: {
      maxAge: 1000*60*20,
    },
    resave: false,
    saveUninitialized: true,
    //create store stuff here
     store: new SequelizeStore({
    db: sequelize
  })
  }

app.use(session(sess));

//Handle Bar boiler plate
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);




  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
  });