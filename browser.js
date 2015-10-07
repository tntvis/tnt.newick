if (typeof tnt === "undefined") {
    module.exports = tnt = {};
}
if (tnt.tree === "undefined") {
    tnt.tree = {};
}
tnt.tree.newick = require('./index');
