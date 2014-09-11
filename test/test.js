var assert = require("chai").assert;
var newick = require ("../src/newick.js");

describe ("parse_newick", function () {
    it ('exists', function () {
	assert.isNotNull (newick.parse_newick);
    });
    it ('is a function', function () {
	assert.isFunction (newick.parse_newick);
    });
});

