'use strict';
module.exports = function(app) {
  var bucket = require('../controllers/BucketAPIController');

  // bucket Routes
  app.route('/s3/objects')
    .get(bucket.list_all_objects)
    //.post(todoList.create_a_task); //Useful for updating photos and description through admin portal

    // app.route('/tasks/:taskId')
    //   .get(todoList.read_a_task)
    //   .put(todoList.update_a_task)
    //   .delete(todoList.delete_a_task);
};