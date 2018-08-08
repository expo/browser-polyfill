#!/usr/bin/env node

var rimraf = require('rimraf');
rimraf('../../../gl-matrix/.babelrc', err => {
  if (err != null) {
    console.log(err);
  } else {
    console.log('completed');
  }
});
