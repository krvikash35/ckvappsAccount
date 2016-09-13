var express = require('express');
var app = express();

app.use('node_modules', express.static(__dirname+'/node_modules'));
app.use( express.static(__dirname+'/client'));


app.listen('8082', function(){
  console.log('ckvapps account listening on 8082');
})
