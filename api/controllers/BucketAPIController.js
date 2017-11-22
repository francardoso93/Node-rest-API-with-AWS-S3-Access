'use strict';

var jsonFormatter = require('../classes/JsonFormatter');
var config = require('../config/config.json');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var listParams = {
  Bucket: config.bucket,
};

exports.list_all_objects = function (req, res) {
  console.log('GET /s3/objects');
  s3.listObjects(listParams, function (err, data) {
    console.log('Trying to get full list of objects from bucket');
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
    else {
      var returnList = function (listOfObjects) {
        res.json(listOfObjects);
      }
      jsonFormatter.ReadFilesAndCreateListOfObjectsJson(data, returnList, s3, res)
    }
  });
};





