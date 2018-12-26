var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-east-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing fortunes into DynamoDB. Please wait.");

var allMovies = JSON.parse(fs.readFileSync('fortunedata.json', 'utf8'));
allMovies.forEach(function(fortune) {
    var params = {
        TableName: "Fortunes",
        Item: {
            "quote":  fortune.quote,
            "category": fortune.category
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add fortune", fortune.quote, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", fortune.quote);
       }
    });
});
