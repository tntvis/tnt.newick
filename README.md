[![Build Status](https://travis-ci.org/emepyc/tnt.newick.svg?branch=master)](https://travis-ci.org/emepyc/tnt.newick)
[![NPM version](https://badge-me.herokuapp.com/api/npm/tnt.newick.png)](http://badges.enytc.com/for/npm/tnt.newick)


# tnt.newick


Newick and nhx input functions for [TnT](http://tntvis.github.io/tnt)

## Installation

- npm:

```
npm install tnt.newick
```

- github:

```
git clone https://github.com/tntvis/tnt.newick
cd tnt.newick
npm install
gulp build-browser
```

## Branch label support and IC/ICA score

Anything in front of the branch length and in between `[]` will be interpreted as branch label and it will be passed to the JSON format in with the `branch_label` key.

### IC/ICA scores from RAxML.

RAxML passes the Internode Certainty (IC) and the IC All (ICA) scores for each node as `float, float` formated branch labels<sup>1</sup>.

Here, branch labels with this format specific will be automatically annotated in the JSON tree with the keys `IC` and `ICA` respectively. Unless explicitly passed `false` to the option `IC_ICA` of the `parse_newick` function (`IC_ICA` is default to `true`):

```javascript
var tree = newick.parse_newick('((human:0.2, chimp:0.3)primates:0.1[0.30,0.45], mouse:0.5)vertebrates:0.7[0.75,0.79]', IC_ICA = false)
``` 

#### Reference

1 - [Leonidas Salichos, Alexandros Stamatakis, Antonis Rokas; Novel Information Theory-Based Measures for Quantifying Incongruence among Phylogenetic Trees. Mol Biol Evol 2014; 31 (5): 1261-1271. doi: 10.1093/molbev/msu061](https://academic.oup.com/mbe/article-lookup/doi/10.1093/molbev/msu061)

## Feedback
Please, send any feedback to emepyc@gmail.com.
Bug reports and feature requests are welcome in the [issue tracker](https://github.com/tntvis/tnt.newick/issues/new)
