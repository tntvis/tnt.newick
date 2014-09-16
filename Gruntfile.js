module.exports = function (grunt) {
    grunt.initConfig ({
	pkg: grunt.file.readJSON('package.json'),

	jshint : {
	    files : ['Gruntfile.js', 'src/**/*.js','test/**/*.js'],
	},

	mochacov : {
	    coverage : {
		options : {
		    coveralls : true
		}
	    },
	    test : {
		options : {
		    reporter : "spec"
		}
	    },
	    options : {
		files : 'test/**/*.js'
	    }
	},

	mochaTest : {
	    test : {
		options : {
		    reporter : "spec"
		},
		src : ['test/**/*.js']
	    }
	}

    });

    grunt.loadNpmTasks ('grunt-contrib-jshint');
    grunt.loadNpmTasks ('grunt-mocha-test');
    grunt.loadNpmTasks ('grunt-mocha-cov');

//    grunt.registerTask ('coverage', ['mochacov:coverage']);
    grunt.registerTask ('only-test', ['jshint', 'mochaTest']);
    grunt.registerTask ('default', ['jshint', 'mochaTest', 'mochacov']);
    grunt.registerTask ('test', ['jshint', 'mochacov']);
};
