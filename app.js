const express = require ('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 5000;

/* conexion a la base de datos */

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'socka'
})

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('base de datos conectada');
});

global.db = db;


// cfg de middleware 

app.set ('port', process.env.port || port);
app.set ('views', __dirname + '/views');
app.set ('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// definicion de rutas 

const {getHomePage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');

// rutas para la app

app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id',editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);





// iniciar servidor



app.listen(port, ()=>{
    console.log(`server en puerto: ${port}`);
});