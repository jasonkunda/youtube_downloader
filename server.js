const express = require("express");
const { stringify } = require("qs");
const app = express();
const fs = require('fs');
const ytdl = require('ytdl-core');


app.use(express.static(__dirname + '/views'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({extended: false})); //Parse URL-encoded bodies


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render("index");

});

app.post('/', function (req, res) {
    res.render('index', { name: req.body.name });
    console.log(req.body.url);

});

app.listen(8000, () => {
    console.log("server running on port 8000")
});


