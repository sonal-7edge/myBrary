if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const app = express();

const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index')

// Set the view engine ejs and check for the views dir for the views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Will contain the basic structure so that each file need no write the HTML
app.set('layout', 'layouts/layout');
app.use(expressLayouts);

// Public dir which has HTML
app.use(express.static('public'));


const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection
db.on('error',error => console.log(error))
db.once('open',() => console.log('Connected to Mongoose!!'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000), () =>{
    console.log(`Server is running on http://localhost:${port}`);
};
