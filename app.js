const crud = require('./crud.js');
////////
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let db = crud.openDB();

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/new', function(req, res){
    res.sendFile(__dirname+'/new.html');
});

app.get('/api/clients', function(req, res){
    let serialize = crud.serialize(db);
    serialize.then(function(data){
        res.send(data);
    });
});

app.post('/api/edit_client', function(req, res){
    data = {
        company : req.body.company,
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone
    };
    crud.edit_client(db,data);
    res.send("SUCCESS");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))





