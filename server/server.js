var express    = require('express');     
var app        = express();                
var bodyParser = require('body-parser');
var path       = require('path');
var request    = require('request');
var fs         = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const key = 'd99372bfae3951c8b1aad85327ca39aa67a7fa24dedf90e4b598a743c05e565b'; //cryptocompare developer key

var port = process.env.PORT || 8080;      

var router = express.Router();              

router.get('/hello', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/single', function(req,res){
    const {name, convertTo} = req.query;

    var url = 'https://min-api.cryptocompare.com/data/price';
    var propertiesObject = { fsym: name, tsyms: convertTo, api_key: key};

    request({url:url, qs:propertiesObject}, function(err, response, body) {
        if(err) { console.log(err); return; }
        res.json(JSON.parse(response.body));
    });
})

router.get('/multiple', function(req,res){
    const {name, convertTo} = req.query;

    var url = 'https://min-api.cryptocompare.com/data/pricemulti';
    var propertiesObject = { fsyms: name, tsyms: convertTo, api_key: key};

    request({url:url, qs:propertiesObject}, function(err, response, body) {
        if(err) { console.log(err); return; }
        res.json(JSON.parse(response.body));
    });
})

router.get('/multiplefull', function(req,res){
    console.log("Multi Full API hit");
    const {name, convertTo} = req.query;
    console.log("Name: ",name)
    console.log("Convert: ",convertTo)

    // var multipleFullData = require('./multiplefulldata.json');

    var url = 'https://min-api.cryptocompare.com/data/pricemultifull';
    var propertiesObject = { fsyms: name, tsyms: convertTo, api_key: key};

    request({url:url, qs:propertiesObject}, function(err, response, body) {
        if(err) { console.log(err); return; }
        if(response.body != null)
        {
            // multipleFullData.push(JSON.parse(response.body))
            // fs.writeFile("multiplefulldata.json", JSON.stringify(multipleFullData), err => {
     
            //     // Checking for errors
            //     if (err) throw err; 
               
            //     console.log("Done writing"); // Success
            // });
            res.json(JSON.parse(response.body));
        }
    });
})

app.use('/api', router);

// All other GET requests not handled before will return our React app
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
//   }
// );

app.listen(port);
console.log('Magic happens on port ' + port);
