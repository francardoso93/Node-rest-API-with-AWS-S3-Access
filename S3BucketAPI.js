var express = require('express')
var cors = require('cors')

app = express();
app.use(cors());

port = process.env.PORT || 3011;
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/BucketAPIRoutes'); //importing route
routes(app); //register the route

app.listen(port);
console.log('S3 RESTful API server started on: ' + port);