var app = require('express')();
var http = require('http').Server(app);
var aws = require('aws-sdk');
var crypto = require('crypto');
var bodyParser = require('body-parser');

aws.config.loadFromPath('/code/awsconfig/aws.config');

//parse POSTs as JSON
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/css/custom.css', function(req, res){
	res.sendFile(__dirname + '/css/custom.css');
});

app.get('/js/actions.js', function(req, res){
	res.sendFile(__dirname + '/js/actions.js');
});

app.get('/js/ui-controller.js', function(req, res){
	res.sendFile(__dirname + '/js/ui-controller.js');
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
	var bio = req.body.bio;
	var quote = req.body.quote;
	var id = crypto.randomBytes(8).toString('hex');
	var db = new aws.DynamoDB();

	db.putItem({
		"TableName":"Users",
				"Item":{
						"UserID" : {"S": id},
						"Username":{"S": username},
						"Bio":{"S": bio},
						"Quote":{"S": quote}
				}
	},
	function(result) {
			res.json({status : "ok"});
	});
});

app.post('/updateUser', function(req, res) {
	var db = new aws.DynamoDB();
 	var userID = req.body.userID;
	var username = req.body.username;
	var quote = req.body.quote;
	var bio = req.body.bio;

	db.updateItem({
		'TableName': 'Users',
		'Key': 	{
				'UserID': {
					'S': userID
				}
		},
		'UpdateExpression': 'set Bio = :val1, Username = :val2, Quote = :val3',
		'ExpressionAttributeValues': {
			':val1': {'S': bio},
			':val2': {'S': username},
			':val3': {'S': quote}
		},
		'ReturnValues': 'ALL_NEW'
	},
	function(result) {
		console.log('ok');
		res.json({status : 'ok'});
	});
});

http.listen(3000, function(){
  	console.log('listening on *:3000');
});
