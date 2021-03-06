/* config-overrides.js */
const { solidityLoader } = require('./config/webpack');
const WorkerPlugin = require('worker-plugin');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.plugins.push(new WorkerPlugin());

  // allow importing from outside of app/src folder, ModuleScopePlugin prevents this.
  const scope = config.resolve.plugins.findIndex(o => o.constructor.name === 'ModuleScopePlugin');
  if (scope > -1) {
    config.resolve.plugins.splice(scope, 1);
  }

  // add solidity loader support
  // have to insert before last loader, because CRA user 'file-loader' as default one
  config.module.rules.splice(config.module.rules - 2, 0, solidityLoader);

  return config;
};
