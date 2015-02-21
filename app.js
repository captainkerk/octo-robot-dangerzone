var app = require('express')();
var http = require('http').Server(app);
var aws = require('aws-sdk');
var crypto = require('crypto');
var bodyParser = require('body-parser');

aws.config.loadFromPath('./aws.config');

//parse POSTs as JSON
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/css/custom.css', function(req, res){
	res.sendFile(__dirname + '/css/custom.css');
});

app.get('/hc1', function(req, res){
    	res.setHeader('Content-Type', 'application/json');
    	res.end(JSON.stringify({ a: 1 }));
});

app.get('/hc2', function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ b : 1 }));
});

app.get('/users', function(req, res){

	var users = [];
	var db = new aws.DynamoDB();

	db.scan({ TableName : "Users", Limit : 50 }, function(err, data) {
			if (err) {
					console.log(err);
					res.status(500).json({ error: 'error. try again later.' });
			}
			else {
					for (var ii in data.Items) {

							ii = data.Items[ii];

							var thing = new Object(ii);
							var user = new Object();

							var objKeyLength = Object.keys(thing).length;

							var keyArray = Object.keys(thing);

							for(i = 0; i < objKeyLength; i++)
							{
								user[keyArray[i]] = ii[keyArray[i]].S;
							}

							users.push( { user : user } );
					}
					res.setHeader('Content-Type', 'application/json');
					res.json({users: users, length: users.length} );
			}
	});
});

app.get('/getTables', function(req, res){
		var db = new aws.DynamoDB();
		db.listTables(function(err, data) {
  			console.log(data.TableNames);
		});
});



app.post('/createUser', function (req, res) {

  var username = req.body.username;
	var id = crypto.randomBytes(6).toString('hex');
	var db = new aws.DynamoDB();

	db.putItem({
		"TableName":"Users",
				"Item":{
						"UserID" : {"S": id},
						"Username":{"S": username}
				}
	},
	function(result) {
			res.json({status : "ok"});
	});
});

http.listen(3000, function(){
  	console.log('listening on *:3000');
});
