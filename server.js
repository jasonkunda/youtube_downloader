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



function get_title(url){
    ytdl.getInfo(url)
.then(info => {
    return info.videoDetails.title;});
};

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/download', (req, res) => { 
    res.render("download");
});



app.post('/', (req, res) => {
    
    console.log(req.body.url);
        console.log('valid url')
    let v_id = req.body.url.split('/')[3];

    
    // console.log(get_title());
    if (ytdl.validateURL(req.body.url))
    {
        ytdl(req.body.url, {quality:"highest"})
        .pipe(fs.createWriteStream(__dirname + `/views/videos/video.mp4`), function(){
            res.render("loader")
        })
        .on("close", function(){
            console.log("done downlaoding");
            res.render('download', { url: req.body.url });
        })
    }
    else{
        res.render('index')
    }


});

app.listen(8000, () => {
    console.log("server running on port 8000")
});


