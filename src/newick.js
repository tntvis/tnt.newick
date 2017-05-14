/**
 * Newick and nhx formats parser in JavaScript.
 *
 * Copyright (c) Jason Davies 2010 and Miguel Pignatelli
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * * * * *
 * 
 * This version has been modified by Davi Ortega, no copyrights from my side - just have fun.
 * 
 * Included features:
 * * reads branch labels
 * 
 * * * * *
 * 
 * Reads branch labels - anything after ":" and between 
 * 
 * Example tree ( modified to include branch labels from http://en.wikipedia.org/wiki/Newick_format):
 *
 * +--0.1[40]--A
 * F-----0.2[20]-----B            +-------0.3[95]----C
 * +------------------0.5[75]-----E
 *                                +---------0.4[20]------D
 *
 * Newick format:
 * (A:0.1[40],B:0.2[20],(C:0.3[95],D:0.4[20])E:0.5[75])F;
 *
 * Converted to JSON:
 * {
 *   name: "F",
 *   branchset: [
 *     {name: "A", length: 0.1, bname: "40"},
 *     {name: "B", length: 0.2, bname: "20"},
 *     {
 *       name: "E", length: 0.5, bname: "75",
 *       branchset: [
 *         {name: "C", length: 0.3, bname: "95"},
 *         {name: "D", length: 0.4, bname: "20"}
 *       ]
 *     }
 *   ]
 * }
 *
 * Converted to JSON, but with no names or lengths:
 * {
 *   branchset: [
 *     {}, {}, {
 *       branchset: [{}, {}]
 *     }
 *   ]
 * }
 * 
 * 
 * RAxML IC support
 * 
 * (A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5[0.5,0.6])F;
 * 
 * 
 * 
 */

module.exports = {
    parse_newick : function(s) {
	var ancestors = [];
	var tree = {};
	var tokens = s.split(/\s*(;|\(|\)|,|:|\[|\])\s*/);
	var subtree;
	var not_branch_label = true
	var branch_label = ''
	for (var i=0; i<tokens.length; i++) {
	    var token = tokens[i];
		if (not_branch_label) {
			switch (token) {
				case '(': // new branchset
					subtree = {};
					tree.children = [subtree];
					ancestors.push(tree);
					tree = subtree;
					break;
				case ',': // another branch
					subtree = {};
					ancestors[ancestors.length-1].children.push(subtree);
					tree = subtree;
					break;
				case ')': // optional name next
					tree = ancestors.pop();
					break;
				case ':': // optional length next
					break;
				case '[':
					not_branch_label = false
					break
				default:
					var x = tokens[i-1];
					if (x == ')' || x == '(' || x == ',') {
						tree.name = token;
					} else if (x == ':') {				
						tree.branch_length = parseFloat(token);
					} 
			}
		}
		else {
			if (token === ']') {
				IC_scores = _get_IC_from_RAxML(branch_label)
				if (IC_scores) {
					tree.IC = IC_scores[0]
					tree.ICA = IC_scores[1]
				}
				else {
					tree.branch_label = branch_label
				}
				branch_label = ''
				not_branch_label = true
			}
			else {
				branch_label += token
			}
		}
	}

	function _get_IC_from_RAxML(branch_label) {
		scores = branch_label.split(',')
		scores = scores.map(parseFloat)
		if (scores.length === 2)
			return scores
		else
			return false
	}

	return tree;

    },

    parse_nhx : function (s) {
	var ancestors = [];
	var tree = {};
	var subtree;

	var tokens = s.split( /\s*(;|\(|\)|\[|\]|,|:|=)\s*/ );
	for (var i=0; i<tokens.length; i++) {
	    var token = tokens[i];
	    switch (token) {
            case '(': // new children
		subtree = {};
		tree.children = [subtree];
		ancestors.push(tree);
		tree = subtree;
		break;
            case ',': // another branch
		subtree = {};
		ancestors[ancestors.length-1].children.push(subtree);
		tree = subtree;
		break;
            case ')': // optional name next
		tree = ancestors.pop();
		break;
            case ':': // optional length next
		break;
            default:
		var x = tokens[i-1];
		if (x == ')' || x == '(' || x == ',') {
		    tree.name = token;
		}
		else if (x == ':') {
		    var test_type = typeof token;
		    if(!isNaN(token)){
			tree.branch_length = parseFloat(token);
		    }
		}
		else if (x == '='){
		    var x2 = tokens[i-2];
		    switch(x2){
		    case 'D':
			tree.duplication = token;
			break;
		    case 'G':
			tree.gene_id = token;
			break;
		    case 'T':
			tree.taxon_id = token;
			break;
		    default :
			tree[tokens[i-2]] = token;
		    }
		}
		else {
		    var test;

		}
	    }
	}
	return tree;
    }
};
