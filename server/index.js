var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();

app.use(express.static(__dirname + '/../client/dist'));
 app.use(bodyParser.json())

// Due to express, when you load the page, it doesnt make a get request to '/', it simply serves up the dist folder
app.post('/', function(req, res) {
  
})
const storage = {
  results : []
}
app.post('/chat/pat', (req, res) => {
  console.log(req.body)
  storage.results.push({user:req.body.user, message: req.body.message})
  res.end(JSON.stringify(storage))
})

app.get('/chat/pat', (req, res) => {
  console.log(req.body)
  res.end(JSON.stringify(storage))
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});