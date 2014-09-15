module.exports = function (grunt) {
    grunt.initConfig ({
	pkg: grunt.file.readJSON('package.json'),
	jshint : {
	    files : ['Gruntfile.js', 'src/**/*.js','test/**/*.js'],
	},
	watch : {
	    files : ['<%= jshint.files %>'],
	    tasks : ['jshint']
	},
	mochaTest : {
	    test : {
		options: {
		    reporter: 'spec',
		    require : 'coverage/blanket'
		},
		src: ['test/**/*.js']
	    },
	    'html-cov' : {
		options : {
		    reporter : 'html-cov',
		    quiet : true,
		    captureFile : 'coverage/coverage.html'
		},
		src : ['test/**/*.js']
	    },
	    'travis-cov' : {
		options : {
		    reporter : 'travis-cov',
		},
		src : ['test/**/*.js']
	    }
	}
    });

    grunt.loadNpmTasks ('grunt-contrib-jshint');
    grunt.loadNpmTasks ('grunt-contrib-watch');
    grunt.loadNpmTasks ('grunt-mocha-test');

    grunt.registerTask ('default', ['jshint', 'mochaTest']);
    grunt.registerTask ('test', ['jshint', 'mochaTest']);
};
