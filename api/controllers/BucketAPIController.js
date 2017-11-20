'use strict';

var jsonFormatter = require('../classes/JsonFormatter');
var config = require('../config/config.json');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var listParams = {
  Bucket: config.bucket,
};

exports.list_all_objects = function (req, res) {
  s3.listObjects(listParams, function (err, data) {
    if (err) throw err;
    console.log('Tentando buscar objects do buckets');
    console.log(data);

    var returnList = function (listOfObjects) {
      res.json(listOfObjects);
    }

    jsonFormatter.ReadFilesAndCreateListOfObjectsJson(data, returnList, s3)
  });
};





