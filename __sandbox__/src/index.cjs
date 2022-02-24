const ESM_MODULE_OPTS = {
  cjs: {
    cache: false,
    esModule: true,
    extensions: true,
    mutableNamespace: true,
    namedExports: true,
    paths: true,
    vars: true,
    dedefault: false,
    topLevelReturn: true
  },
  mode: 'auto',
  await: true,
  force: true,
  sourceMap: true	
}

// require = require('esm')(module, {...ESM_MODULE_OPTS})

// module.exports = require('./main.js')


module.exports = import('./main.js')
