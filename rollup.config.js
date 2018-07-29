import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import flow from 'rollup-plugin-flow';

import pkg from './package.json';

const plugins = [resolve(), flow({ pretty: true }), commonjs()];

const external = Object.keys(Object.assign({}, pkg.peerDependencies, pkg.dependencies));

const output = [{ file: pkg.main, format: 'cjs' }];

export default [
  /**
   * Node.js Build
   */
  {
    input: 'src/index.js',
    output,
    plugins,
    external,
  },
];
