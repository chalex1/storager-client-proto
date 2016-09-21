(function () {

  'use strict';

  // NOTE: require external dependencies
  var gulp = require('gulp');
  var nodemon = require('gulp-nodemon');

  // NOTE: build configuration
  var configuration = {

    paths: {

      backendMock: './backend-mock/server.js',

      staticAssets: './src/'
    }
  };

  // NOTE: backend mock startup task
  gulp.task('backend-mock-deploy', function (callback) {

    var started = false;

    return nodemon({
             script: configuration.paths.backendMock
           })
           .on('start', function () {
             if (!started) {
               callback();
               started = true; 
             } 
           });
   });
})();
