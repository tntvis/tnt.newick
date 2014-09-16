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
	    // options : {
	    // 	reporter : 'html-cov',
	    // 	require :  ['assert']
	    // },
	    // all : 'test/**/*.js'
	},

	mochaTest : {
	    test : {
		options : {
		    reporter : "spec"
		},
		src : ['test/**/*.js']
	    }
	}

	// mochacov : {
	//     test : {
	// 	options: {
	// 	    reporter: 'html-cov',
	// 	    require : ['assert']
	// 	},
	// 	src: ['test/**/*.js']
	//     },
	//     'html-cov' : {
	// 	options : {
	// 	    reporter : 'html-cov',
	// 	    quiet : true,
	// 	    captureFile : 'coverage/coverage.html'
	// 	},
	// 	src : ['test/**/*.js']
	//     },
	//     'travis-cov' : {
	// 	options : {
	// 	    reporter : 'travis-cov',
	// 	},
	// 	src : ['test/**/*.js']
	//     }
	// }
    });

    grunt.loadNpmTasks ('grunt-contrib-jshint');
    grunt.loadNpmTasks ('grunt-mocha-test');
    grunt.loadNpmTasks ('grunt-mocha-cov');

    grunt.registerTask ('coverage', ['mochacov:coverage']);
    grunt.registerTask ('default', ['jshint', 'mochaTest', 'mochacov']);
    grunt.registerTask ('test', ['jshint', 'mochaTest', 'mochacov']);
};
