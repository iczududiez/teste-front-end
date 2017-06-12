var express = require('express');
var path = require('path');

var app = express();

app.use(express.static('./client'));

app.use('*', function(req, res){
    res.sendFile(path.resolve('client/index.html'));
});

var port = 3000;

app.listen(port, function(error){
    if(error) throw error;
    console.log("It´s OK!");
});