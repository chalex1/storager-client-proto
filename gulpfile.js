var gulp = require ('gulp');

var nodemon = require('gulp-nodemon');

gulp.task ('deploy-express', function (cb) {
	
	var started = false;
	
	return nodemon ({

		script: 'backend.dev/server.js'
	}).on ('start', function () {

		if (!started) {
			cb ();
			started = true; 
		} 
	});
});

/*
var connect = require ('gulp-connect');

gulp.task ('deploy', function () {

  connect.server({
    root: 'src',
    port: 8080
  });
});
*/
