var config = require('../config/config.json');

var objParams = {
  Bucket: config.bucket,
  Key: ""
};

exports.ReadFilesAndCreateListOfObjectsJson = function (data, returnList, s3, res) {
  var listOfObjects = [];
  var contents = data.Contents;
  var requestCount = 0;

  for (var i = 0; i < contents.length; i++) {
    if (contents[i].Key.endsWith(".json")) {
      requestCount++;
      objParams.Key = contents[i].Key; //Check if this really works that way
      s3.getObject(objParams, function (err, file) {
        console.log('Trying to get object from bucket. Key: ' + objParams.Key);
        if (err) {
          console.log(err, err.stack); // an error occurred
          res.status(500).send(err.message);
        }
        else {
          var bodyString = file.Body.toString();
          try {
            listOfObjects.push(JSON.parse(bodyString));           // successful response
          }
          catch (err){
            var errMsg= "Invalid JSON Format. Details:" + err.message;
            res.status(500).send(errMsg);          
          }
          objParams.Key = ""; //Check if this really works that way
          if (requestCount == listOfObjects.length) {
            returnList(listOfObjects); //Return only of all requests to JSON File are already processed into array
          }
        }
      });
    }
  };
};