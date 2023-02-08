const express = require('express');
// const bcrypt = require('bcrypt')
const session = require('express-session');
const exphbs = require('express-handlebars')
const sql = require('mysql2') 
//add sequelize store ->configure in session options
const path =require('path');
const sequelize = require('./config/connection');
const routes = require('./controllers')
const hbs = exphbs.create({})


const PORT = 3001 || process.env.PORT

const app = express()

app.use(routes);

const sess = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    //create store stuff here
  }

//Handle Bar boiler plate
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('main');
});

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

  // app.get('/', (req, res)=>{
  //   res.json({message: "Hello"})
  // })


  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
  });